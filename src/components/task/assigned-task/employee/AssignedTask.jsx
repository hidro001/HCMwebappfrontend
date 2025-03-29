import { useState, useEffect } from "react";
import { FaEye, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import AssignedTaskModal from "./AssignedTaskModal";
import { fetchTasksEmp, updateAcknowledgeStatus } from "../../../../service/taskService";
// Using react-hot-toast for notifications
import { toast } from "react-hot-toast";
// SweetAlert2 for confirmation
import Swal from "sweetalert2";

const AssignedTask = () => {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    refreshTasks();
  }, []);

  const refreshTasks = async () => {
    try {
      const fetchedTasks = await fetchTasksEmp();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      toast.error("Failed to fetch tasks");
    }
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setIsViewOpen(true);
  };

  // Call API to set "acknowledge" = "Acknowledged"
  const handleAcknowledge = async (task) => {
    try {
      const responseData = await updateAcknowledgeStatus(task._id, "Acknowledged");
      // If it succeeds, show success message from server or fallback text
      toast.success(responseData.message || "Task acknowledged successfully!");
      refreshTasks();
    } catch (error) {
      console.error("Failed to acknowledge task:", error);
      // Attempt to read the message from error.data.message
      const errMsg = error?.data?.message || "Failed to acknowledge the task.";
      toast.error(errMsg);
    }
  };

  // SweetAlert2 confirmation before acknowledging
  const confirmAcknowledge = (task) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once acknowledged, you won't be able to revert this action easily.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, acknowledge!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleAcknowledge(task);
      }
      // If user cancels, do nothing
    });
  };

  return (
    <div className="p-6 w-full max-w-6xl mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Assigned Task</h2>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg bg-white dark:bg-gray-800">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-3 border dark:border-gray-700">S.L</th>
              <th className="p-3 border dark:border-gray-700">Emp ID</th>
              <th className="p-3 border dark:border-gray-700">Assigned By</th>
              <th className="p-3 border dark:border-gray-700">Assigned Date</th>
              <th className="p-3 border dark:border-gray-700">Due Date</th>
              <th className="p-3 border dark:border-gray-700">Priority</th>
              <th className="p-3 border dark:border-gray-700">Status</th>
              <th className="p-3 border dark:border-gray-700">Acknowledge</th>

              <th className="p-3 border dark:border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-3 text-center">
                  No data available.
                </td>
              </tr>
            ) : (
              tasks.map((task, index) => (
                <tr
                  key={task._id}
                  className="text-center hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-3 border dark:border-gray-700">{index + 1}</td>
                  <td className="p-3 border text-blue-600 dark:border-gray-700">
                    {task.assignedToEmployeeId}
                  </td>
                  <td className="p-3 border dark:border-gray-700">
                    {task.assignedByName}
                  </td>
                  <td className="p-3 border dark:border-gray-700">
                    {new Date(task.createdAt).toLocaleDateString("en-IN", {
                      timeZone: "Asia/Kolkata",
                    })}
                  </td>
                  <td className="p-3 border dark:border-gray-700">
                    {new Date(task.dueDate).toLocaleDateString("en-IN", {
                      timeZone: "Asia/Kolkata",
                    })}
                  </td>
                  <td
                    className={`p-3 border dark:border-gray-700 font-semibold ${
                      task.priority === "High"
                        ? "text-red-600"
                        : task.priority === "Medium"
                        ? "text-orange-500"
                        : "text-green-600"
                    }`}
                  >
                    {task.priority}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded text-xs font-semibold ${
                        task.status === "Completed"
                          ? "bg-green-100 dark:bg-green-700 text-green-600 dark:text-green-200"
                          : task.status === "In Progress"
                          ? "bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-200"
                          : "bg-orange-100 dark:bg-orange-700 text-orange-600 dark:text-orange-200"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="p-3">
                  <span
    className={`px-3 py-1 rounded text-xs font-semibold ${
      task.acknowledge === "Not Acknowledge"
        ? "bg-yellow-100 dark:bg-yellow-700 text-yellow-600 dark:text-yellow-200"
        : task.acknowledge === "Acknowledged"
        ? "bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-200"
        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200"
    }`}
  >
    {task.acknowledge}
  </span>
                  </td>


                  <td className="p-3 border dark:border-gray-700 flex justify-center gap-2">
                    {/* View Task Button */}
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:scale-105"
                      onClick={() => handleViewTask(task)}
                    >
                      <FaEye />
                    </button>

                    {/* Acknowledge Button */}
                    <button
  className={`${
    task.acknowledge === "Acknowledged"
      ? "bg-green-500"
      : "bg-red-500"
  } text-white px-2 py-1 rounded-lg hover:scale-105`}
  onClick={() => {
    if (task.acknowledge === "Not Acknowledge") {
      confirmAcknowledge(task); // Prompt confirmation, then acknowledge
    } else {
      toast("Task is already acknowledged.");
    }
  }}
>
  {task.acknowledge === "Acknowledged" ? <FaThumbsUp /> : <FaThumbsDown />}
</button>

                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* View Task Modal */}
      {isViewOpen && (
        <AssignedTaskModal
          task={selectedTask}
          onClose={() => setIsViewOpen(false)}
        />
      )}
    </div>
  );
};

export default AssignedTask;
