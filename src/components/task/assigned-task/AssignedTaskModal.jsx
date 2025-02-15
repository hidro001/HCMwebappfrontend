// import React, { useEffect } from "react";
// import { FaTimes, FaFileAlt } from "react-icons/fa";

// const AssignedTaskModal = ({ task, onClose }) => {
//   if (!task) return null;

//   // Prevent scrolling when modal is open
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   return (
//     <div className="fixed inset-0 flex justify-end z-50">
//       {/* Dark Transparent Background (No Blur) */}
//       <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

//       {/* Slide-in Panel */}
//       <div className="bg-white dark:bg-gray-800 w-full max-w-md h-full shadow-lg transform transition-transform duration-300 p-6 relative z-50">
//         {/* Header */}
//         <div className="flex justify-between items-center border-b pb-3">
//           <h2 className="text-lg font-bold text-gray-900 dark:text-white">View Task Details</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-red-600">
//             <FaTimes size={18} />
//           </button>
//         </div>

//         {/* Task Info */}
//         <div className="mt-4 space-y-2 text-sm">
//           <p>
//             <span className="font-semibold">Description:</span> {task.assignTaskDesc}
//           </p>
//           <p>
//             <span className="font-semibold">Assigned Date:</span>  {new Date(task.createdAt).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })}
//           </p>
//           <p>
//             <span className="font-semibold">Due Date:</span>  {new Date(task.dueDate).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })}
//           </p>
//           {/* <p>
//             <span className="font-semibold">Department:</span> {task.department}
//           </p> */}
//           <p>
//             <span className="font-semibold">Priority:</span>
//             <span
//               className={`ml-2 px-2 py-1 rounded text-white text-xs ${
//                 task.priority === "High"
//                   ? "bg-red-500"
//                   : task.priority === "Medium"
//                   ? "bg-yellow-500"
//                   : "bg-green-500"
//               }`}
//             >
//               {task.priority}
//             </span>
//           </p>
//           <p>
//             <span className="font-semibold">Assign To:</span>{" "}
//             <span className="text-blue-600 cursor-pointer">{task.assignedToEmployeeId} <span>- {task.assignedToName}</span></span>

       
//           </p>
//         </div>

//         {/* Description */}
//         <div className="mt-4 border p-3 rounded-md bg-gray-100 dark:bg-gray-700">
//           <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Comments</h3>
//           <p className="text-gray-600 dark:text-gray-300 mt-1">{task.updatesComments}</p>
//         </div>

//         {/* Attachment */}
//         {/* <div className="mt-4">
//           <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Attachment</h3>
//           <div className="mt-2 flex items-center gap-2 bg-gray-200 dark:bg-gray-700 p-2 rounded">
//             <FaFileAlt className="text-gray-500 dark:text-gray-300" />
//             <span className="text-gray-700 dark:text-white text-sm cursor-pointer">
//               Transcend.zip (1.2MB)
//             </span>
//           </div>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default AssignedTaskModal;


import React, { useEffect } from "react";
import { FaTimes, FaFileAlt } from "react-icons/fa";
import BaseModal from "../../common/BaseModal"; // Adjust the path as needed

const AssignedTaskModal = ({ task, onClose }) => {
  if (!task) return null;

  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <BaseModal isOpen={true} onClose={onClose}>
      <div className="flex justify-end">
        {/* Slide-in Panel */}
        <div className="bg-white dark:bg-gray-800 w-full max-w-md h-full shadow-lg transform transition-transform duration-300 p-6 relative z-50">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              View Task Details
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-red-600">
              <FaTimes size={18} />
            </button>
          </div>

          {/* Task Info */}
          <div className="mt-4 space-y-2 text-sm">
            <p>
              <span className="font-semibold">Description:</span> {task.assignTaskDesc}
            </p>
            <p>
              <span className="font-semibold">Assigned Date:</span>{" "}
              {new Date(task.createdAt).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })}
            </p>
            <p>
              <span className="font-semibold">Due Date:</span>{" "}
              {new Date(task.dueDate).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })}
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
                {task.assignedToEmployeeId} <span>- {task.assignedToName}</span>
              </span>
            </p>
          </div>

          {/* Comments */}
          <div className="mt-4 border p-3 rounded-md bg-gray-100 dark:bg-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Comments
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-1">{task.updatesComments}</p>
          </div>

          {/* Uncomment Attachment Section if needed */}
          {/*
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Attachment</h3>
            <div className="mt-2 flex items-center gap-2 bg-gray-200 dark:bg-gray-700 p-2 rounded">
              <FaFileAlt className="text-gray-500 dark:text-gray-300" />
              <span className="text-gray-700 dark:text-white text-sm cursor-pointer">
                Transcend.zip (1.2MB)
              </span>
            </div>
          </div>
          */}
        </div>
      </div>
    </BaseModal>
  );
};

export default AssignedTaskModal;

