import React, { useEffect,useState } from "react";
import { FaTimes } from "react-icons/fa";
import Comment from "../Comment";
import { updateTask } from '../../../../service/taskService';
const AssignedTaskModal = ({ task, onClose }) => {
  if (!task) return null;





  const [status, setStatus] = useState(task.status);
  const [taskUpdate, settaskUpdate] = useState("");


  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleUpdateClick = async () => {
    // Prepare data to send to backend
    const taskData = { status };

    try {
      const updatedTask = await updateTask(task._id, taskData);

      if (updatedTask) {
        console.log('Task updated:', updatedTask);
        settaskUpdate("Task Status updated Success")
        // Optionally set the new status from the response
        // setStatus(updatedTask.status);


        setTimeout(() => {
          settaskUpdate("");
        }, 3000);
      } else {
        console.log('Failed to update task or server returned no data.');
      }
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };







  useEffect(() => {
    // Prevent background (body) scrolling when modal is open
    document.body.style.overflow = "hidden";

    // Restore scrolling when modal closes
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    // Outer container ensures screen is overlaid, with the modal centered
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dark transparent background that also closes the modal on click */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Main container with uniform spacing from all edges (m-4) */}
      <div
        className="
          relative z-50
          w-full max-w-4xl
          max-h-[80vh]
          m-4 p-6
          bg-white dark:bg-gray-800
          rounded-md shadow-lg
          overflow-y-auto
        "
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3 mb-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            View Task Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 transition-transform hover:scale-110"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Content: two columns on md+ screens, stacked otherwise */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column */}
          <div className="md:w-1/2 space-y-6">
            {/* Task Info */}
            <div className="space-y-2 text-sm bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
              <p>
                <span className="font-semibold">Task:</span>{" "}
                {task.assignTaskDesc}
              </p>
              <p>
                <span className="font-semibold">Assigned Date:</span>{" "}
                {new Date(task.createdAt).toLocaleDateString("en-IN", {
                  timeZone: "Asia/Kolkata",
                })}
              </p>
              <p>
                <span className="font-semibold">Due Date:</span>{" "}
                {new Date(task.dueDate).toLocaleDateString("en-IN", {
                  timeZone: "Asia/Kolkata",
                })}
              </p>
              <p>
                <span className="font-semibold">Priority:</span>
                <span
                  className={`
                    ml-2 px-2 py-1 rounded text-white text-xs 
                    ${
                      task.priority === "High"
                        ? "bg-red-500"
                        : task.priority === "Medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }
                  `}
                >
                  {task.priority}
                </span>
              </p>
              <p>
                <span className="font-semibold">Assign To:</span>{" "}
                <span className="text-blue-600 cursor-pointer">
                  {task.assignedToEmployeeId} - {task.assignedToName}
                </span>
              </p>
            </div>

            {/* Description */}
            <div className="border border-gray-200 dark:border-gray-700 p-3 rounded-md bg-gray-100 dark:bg-gray-700">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Description
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {task.updatesComments}
              </p>
            </div>

            <div>
    <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
      Task Status
    </h3>
    
    <select
      value={status}
      onChange={handleStatusChange}
      className="block w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 rounded 
                 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 
                 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
    >
      {/* Make sure you don't use the same option twice in a row */}
      <option value="Not Started">Not Started</option>
      <option value="In Progress">In-Progress</option>
      <option value="Completed">Completed</option>
    </select>

    <button
      onClick={handleUpdateClick}
      className="px-4 py-2 text-white bg-blue-500 rounded 
                 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 
                 transition-colors duration-200"
    >
      Update Status
    </button>

    {/* Conditionally render the taskUpdate message */}
    {taskUpdate && <h1>{taskUpdate}</h1>}
  </div>

          </div>

          {/* Right Column */}
          <div className="md:w-1/2">
            <Comment taskId={task._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignedTaskModal;
