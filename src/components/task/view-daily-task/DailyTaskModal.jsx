// DailyTaskModal.jsx
import React, { useEffect } from "react";
import { FaTimes, FaFileAlt } from "react-icons/fa";

const DailyTaskModal = ({ task, onClose }) => {
  if (!task) return null;

  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      {/* Dark Transparent Background */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Slide-in Panel */}
      <div className="bg-white dark:bg-gray-800 w-full max-w-md h-full shadow-lg transform transition-transform duration-300 p-6 relative z-50">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Task of The Day
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-600">
            <FaTimes size={18} />
          </button>
        </div>

        {/* Task Info */}
        <div className="mt-4 space-y-2 text-sm">
          {/* Task Boxes */}
          <div>
            <span className="font-semibold">Today Task:</span>
            <div className="mt-1 flex flex-wrap gap-2">
              {Array.isArray(task.task)
                ? task.task.map((item, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs"
                    >
                      {item}
                    </span>
                  ))
                : (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs">
                      {task.task}
                    </span>
                  )}
            </div>
          </div>
          <p>
            <span className="font-semibold">Task Date:</span>{" "}
            {task.task_Date}
          </p>
          <p>
            <span className="font-semibold">Department:</span>{" "}
            {task.department}
          </p>
          <p>
            <span className="font-semibold">Designation:</span>{" "}
            {task.designation}
          </p>
          <p>
            <span className="font-semibold">Employee ID:</span>{" "}
            {task.employee_Id}
          </p>
          <p>
            <span className="font-semibold">Full Name:</span>{" "}
            {task.full_Name}
          </p>
          {/* <p>
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(task.createdAt).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            })}
          </p> */}
          {task.teams && task.teams.trim() !== "" && (
            <p>
              <span className="font-semibold">Teams:</span> {task.teams}
            </p>
          )}
        </div>

        {/* Optional Description */}
        {task.description && (
          <div className="mt-4 border p-3 rounded-md bg-gray-100 dark:bg-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Description
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              {task.description}
            </p>
          </div>
        )}

        {/* Optional Attachment */}
        {task.attachment && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Attachment
            </h3>
            <div className="mt-2 flex items-center gap-2 bg-gray-200 dark:bg-gray-700 p-2 rounded">
              <FaFileAlt className="text-gray-500 dark:text-gray-300" />
              <span className="text-gray-700 dark:text-white text-sm cursor-pointer">
                {task.attachment.name} ({task.attachment.size})
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyTaskModal;
