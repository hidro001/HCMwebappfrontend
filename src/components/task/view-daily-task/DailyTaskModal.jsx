// // DailyTaskModal.jsx
// import React, { useEffect } from "react";
// import { FaTimes, FaFileAlt } from "react-icons/fa";

// const DailyTaskModal = ({ task, onClose }) => {
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
//       {/* Dark Transparent Background */}
//       <div
//         className="absolute inset-0 bg-black bg-opacity-50"
//         onClick={onClose}
//       ></div>

//       {/* Slide-in Panel */}
//       <div className="bg-white dark:bg-gray-800 w-full max-w-md h-full shadow-lg transform transition-transform duration-300 p-6 relative z-50">
//         {/* Header */}
//         <div className="flex justify-between items-center border-b pb-3">
//           <h2 className="text-lg font-bold text-gray-900 dark:text-white">
//             Task of The Day
//           </h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-red-600">
//             <FaTimes size={18} />
//           </button>
//         </div>

//         {/* Task Info */}
//         <div className="mt-4 space-y-2 text-sm">
//           {/* Task Boxes */}
//           <div>
//             <span className="font-semibold">Today Task:</span>
//             <div className="mt-1 flex flex-wrap gap-2">
//               {Array.isArray(task.task)
//                 ? task.task.map((item, index) => (
//                     <span
//                       key={index}
//                       className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs"
//                     >
//                       {item}
//                     </span>
//                   ))
//                 : (
//                     <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs">
//                       {task.task}
//                     </span>
//                   )}
//             </div>
//           </div>
//           <p>
//             <span className="font-semibold">Task Date:</span>{" "}
//             {task.task_Date}
//           </p>
//           <p>
//             <span className="font-semibold">Department:</span>{" "}
//             {task.department}
//           </p>
//           <p>
//             <span className="font-semibold">Designation:</span>{" "}
//             {task.designation}
//           </p>
//           <p>
//             <span className="font-semibold">Employee ID:</span>{" "}
//             {task.employee_Id}
//           </p>
//           <p>
//             <span className="font-semibold">Full Name:</span>{" "}
//             {task.full_Name}
//           </p>
//           {/* <p>
//             <span className="font-semibold">Created At:</span>{" "}
//             {new Date(task.createdAt).toLocaleString("en-IN", {
//               timeZone: "Asia/Kolkata",
//             })}
//           </p> */}
//           {task.teams && task.teams.trim() !== "" && (
//             <p>
//               <span className="font-semibold">Teams:</span> {task.teams}
//             </p>
//           )}
//         </div>

//         {/* Optional Description */}
//         {task.description && (
//           <div className="mt-4 border p-3 rounded-md bg-gray-100 dark:bg-gray-700">
//             <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
//               Description
//             </h3>
//             <p className="text-gray-600 dark:text-gray-300 mt-1">
//               {task.description}
//             </p>
//           </div>
//         )}

//         {/* Optional Attachment */}
//         {task.attachment && (
//           <div className="mt-4">
//             <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
//               Attachment
//             </h3>
//             <div className="mt-2 flex items-center gap-2 bg-gray-200 dark:bg-gray-700 p-2 rounded">
//               <FaFileAlt className="text-gray-500 dark:text-gray-300" />
//               <span className="text-gray-700 dark:text-white text-sm cursor-pointer">
//                 {task.attachment.name} ({task.attachment.size})
//               </span>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DailyTaskModal;


// src/components/DailyTaskModal.jsx

// import React, { useEffect } from "react";
// import BaseModal from "../../common/BaseModal"; // adjust the import path as needed
// import { FaTimes, FaFileAlt } from "react-icons/fa";

// export default function DailyTaskModal({ task, onClose }) {
//   // Don’t render if there’s no task
//   if (!task) return null;

//   // Prevent background scrolling when open
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   return (
//     <BaseModal isOpen={true} onClose={onClose}>
//       <div className="bg-white dark:bg-gray-800 w-full max-w-md h-[90vh] shadow-lg transform transition-transform duration-300 p-6 relative rounded-2xl">
//         {/* Header */}
//         <div className="flex justify-between items-center border-b pb-3">
//           <h2 className="text-lg font-bold text-gray-900 dark:text-white">
//             Task of The Day
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-red-600"
//             aria-label="Close"
//           >
//             <FaTimes size={18} />
//           </button>
//         </div>

//         {/* Task Info */}
//         <div className="mt-4 space-y-2 text-sm">
//           <div>
//             <span className="font-semibold">Today Task:</span>
//             <div className="mt-1 flex flex-wrap gap-2">
//               {(Array.isArray(task.task) ? task.task : [task.task]).map((item, i) => (
//                 <span
//                   key={i}
//                   className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs"
//                 >
//                   {item}
//                 </span>
//               ))}
//             </div>
//           </div>
//           <p>
//             <span className="font-semibold">Task Date:</span> {task.task_Date}
//           </p>
//           <p>
//             <span className="font-semibold">Department:</span> {task.department}
//           </p>
//           <p>
//             <span className="font-semibold">Designation:</span> {task.designation}
//           </p>
//           <p>
//             <span className="font-semibold">Employee ID:</span> {task.employee_Id}
//           </p>
//           <p>
//             <span className="font-semibold">Full Name:</span> {task.full_Name}
//           </p>
//           {task.teams && task.teams.trim() !== "" && (
//             <p>
//               <span className="font-semibold">Teams:</span> {task.teams}
//             </p>
//           )}
//         </div>

//         {/* Optional Description */}
//         {task.description && (
//           <div className="mt-4 border p-3 rounded-md bg-gray-100 dark:bg-gray-700">
//             <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
//               Description
//             </h3>
//             <p className="text-gray-600 dark:text-gray-300 mt-1">
//               {task.description}
//             </p>
//           </div>
//         )}

//         {/* Optional Attachment */}
//         {task.attachment && (
//           <div className="mt-4">
//             <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
//               Attachment
//             </h3>
//             <div className="mt-2 flex items-center gap-2 bg-gray-200 dark:bg-gray-700 p-2 rounded">
//               <FaFileAlt className="text-gray-500 dark:text-gray-300" />
//               <span className="text-gray-700 dark:text-white text-sm cursor-pointer">
//                 {task.attachment.name} ({task.attachment.size})
//               </span>
//             </div>
//           </div>
//         )}
//       </div>
//     </BaseModal>
//   );
// }


import React, { useEffect } from "react";
import BaseModal from "../../common/BaseModal"; // adjust the import path as needed
import { 
  FaTimes, 
  FaFileAlt, 
  FaUser, 
  FaBuilding, 
  FaCalendarAlt, 
  FaIdCard, 
  FaUserTie, 
  FaUsers, 
  FaTasks,
  FaClipboardList
} from "react-icons/fa";

export default function DailyTaskModal({ task, onClose }) {
  // Don't render if there's no task
  if (!task) return null;

  // Prevent background scrolling when open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <BaseModal isOpen={true} onClose={onClose}>
      <div className="bg-white dark:bg-gray-800 w-full max-w-2xl max-h-[98vh] shadow-2xl transform transition-all duration-300 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <FaTasks className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Daily Task Details
                </h2>
                <p className="text-blue-100 text-sm">
                  Task information and details
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-colors duration-200"
              aria-label="Close"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(95vh-120px)]  [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
                transition-colors duration-300">
          {/* Employee Info Card */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-6">
            <div className="flex items-center space-x-4 mb-4">
              {task.user_Avatar ? (
                <img
                  src={task.user_Avatar}
                  alt={task.full_Name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-gray-600 shadow-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className={`w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg ${task.user_Avatar ? 'hidden' : ''}`}>
                <FaUserTie className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {task.full_Name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium">
                  {task.designation}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                    <FaBuilding className="w-3 h-3 mr-1" />
                    {task.department}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                    <FaIdCard className="w-3 h-3 mr-1" />
                    {task.employee_Id}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Task Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Task Date */}
            <div className="bg-white dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <FaCalendarAlt className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Task Date</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {new Date(task.task_Date).toLocaleDateString("en-IN", {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      timeZone: "Asia/Kolkata"
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Teams */}
            {task.teams && task.teams.trim() !== "" && (
              <div className="bg-white dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                    <FaUsers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Team</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {task.teams}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tasks Section */}
          <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <FaClipboardList className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Today's Tasks
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {Array.isArray(task.task) ? task.task.length : 1} task(s) assigned
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              {(Array.isArray(task.task) ? task.task : [task.task]).map((item, i) => (
                <div
                  key={i}
                  className="bg-gray-50 dark:bg-gray-600 rounded-lg p-4 border-l-4 border-blue-500"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                        {i + 1}
                      </span>
                    </div>
                    <p className="text-gray-900 dark:text-white font-medium leading-relaxed">
                      {item}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Optional Description */}
          {task.description && (
            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600 mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                <FaFileAlt className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-2" />
                Description
              </h3>
              <div className="bg-gray-50 dark:bg-gray-600 rounded-lg p-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {task.description}
                </p>
              </div>
            </div>
          )}

          {/* Optional Attachment */}
          {task.attachment && (
            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                <FaFileAlt className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-2" />
                Attachment
              </h3>
              <div className="bg-gray-50 dark:bg-gray-600 rounded-lg p-4 border-2 border-dashed border-gray-300 dark:border-gray-500">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <FaFileAlt className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {task.attachment.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {task.attachment.size}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Task ID: {task.task_Id || 'N/A'}
            </div>
            <button
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}