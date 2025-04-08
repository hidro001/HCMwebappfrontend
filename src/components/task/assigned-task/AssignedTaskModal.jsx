import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import BaseModal from "../../common/BaseModal";
import Comment from "./Comment";
import { updateTask } from '../../../service/taskService';
import { useState } from "react";
const AssignedTaskModal = ({ task, onClose }) => {


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








  if (!task) return null;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);





  return (
    <BaseModal isOpen={true} onClose={onClose}>
      <div className="flex justify-end">
        {/*
          - w-[70vw] -> 70% of viewport width 
          - h-[70vh] -> 70% of viewport height
          - overflow-auto for scrolling if content is too tall
          - Added a gradient background, extra shadow, and rounded corners
        */}
        <div className="w-[70vw] h-[70vh] overflow-auto bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900
          shadow-xl transform transition-transform duration-300 p-6 relative z-50 rounded-lg"
        >
          <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3">
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

          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            {/* Left Column */}
            <div className="md:w-1/2 space-y-4">
              <div className="space-y-2 text-sm p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <p>
                  <span className="font-semibold">Task:</span> {task.assignTaskDesc}
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
                    className={`ml-2 px-2 py-1 rounded text-white text-xs ${
                      task.priority === "High"
                        ? "bg-red-500"
                        : task.priority === "Medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
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

              <div className="border p-3 rounded-md bg-gray-100 dark:bg-gray-700 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Description
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {task.updatesComments}
                </p>
              </div>

{/*  task status */}
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

            {/* Right Column (Comments) */}
            <div className="md:w-1/2">
              <Comment taskId={task._id} />
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default AssignedTaskModal;
