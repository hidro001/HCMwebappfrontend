import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTasks } from "../../../service/taskService";
import { FaArrowLeft } from "react-icons/fa";

const IndividualAssignedTasks = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const allTasks = await fetchTasks();
      const employeeTasks = allTasks.filter(
        (task) => task.assignedToEmployeeId === employeeId
      );
      setTasks(employeeTasks);
    };
    getTasks();
  }, [employeeId]);

  return (
    <div className="p-6 w-full max-w-6xl mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2 bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded"
      >
        <FaArrowLeft /> Back
      </button>
      <h2 className="text-2xl font-semibold mb-4">
        Tasks for Employee ID: {employeeId}
      </h2>
      <div className="overflow-x-auto shadow-md rounded-lg bg-white dark:bg-gray-800">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-3 border dark:border-gray-700">Task</th>
              <th className="p-3 border dark:border-gray-700">Assigned Date</th>
              <th className="p-3 border dark:border-gray-700">Due Date</th>
              <th className="p-3 border dark:border-gray-700">Priority</th>
              <th className="p-3 border dark:border-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-3 text-center">
                  No tasks found for this employee.
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr
                  key={task._id}
                  className="text-center hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-3 border dark:border-gray-700">
                    {task.assignTaskDesc}
                  </td>
                  <td className="p-3 border dark:border-gray-700">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 border dark:border-gray-700">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </td>
                  <td
                    className={`p-3 border dark:border-gray-700 ${
                      task.priority === "High"
                        ? "text-red-500"
                        : task.priority === "Medium"
                        ? "text-orange-500"
                        : "text-green-500"
                    }`}
                  >
                    {task.priority}
                  </td>
                  <td className="p-3 border dark:border-gray-700">
                    {task.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IndividualAssignedTasks;
