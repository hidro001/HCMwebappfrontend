// import React, { useEffect } from "react";
// import { FaTimes } from "react-icons/fa";
// import BaseModal from "../../common/BaseModal";
// import Comment from "./Comment";
// import { updateTask } from '../../../service/taskService';
// import { useState } from "react";
// const AssignedTaskModal = ({ task, onClose }) => {


//   const [status, setStatus] = useState(task.status);
//   const [taskUpdate, settaskUpdate] = useState("");


//   const handleStatusChange = (event) => {
//     setStatus(event.target.value);
//   };

//   const handleUpdateClick = async () => {
//     // Prepare data to send to backend
//     const taskData = { status };

//     try {
//       const updatedTask = await updateTask(task._id, taskData);

//       if (updatedTask) {
//         console.log('Task updated:', updatedTask);
//         settaskUpdate("Task Status updated Success")
//         // Optionally set the new status from the response
//         // setStatus(updatedTask.status);


//         setTimeout(() => {
//           settaskUpdate("");
//         }, 3000);
//       } else {
//         console.log('Failed to update task or server returned no data.');
//       }
//     } catch (error) {
//       console.error('Failed to update task:', error);
//     }
//   };








//   if (!task) return null;

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);





//   return (
//     <BaseModal isOpen={true} onClose={onClose}>
//       <div className="flex justify-end">
//         {/*
//           - w-[70vw] -> 70% of viewport width 
//           - h-[70vh] -> 70% of viewport height
//           - overflow-auto for scrolling if content is too tall
//           - Added a gradient background, extra shadow, and rounded corners
//         */}
//         <div className="w-[70vw] h-[70vh] overflow-auto bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900
//           shadow-xl transform transition-transform duration-300 p-6 relative z-50 rounded-lg"
//         >
//           <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3">
//             <h2 className="text-lg font-bold text-gray-900 dark:text-white">
//               View Task Details
//             </h2>
//             <button
//               onClick={onClose}
//               className="text-gray-500 hover:text-red-600 transition-transform hover:scale-110"
//             >
//               <FaTimes size={18} />
//             </button>
//           </div>

//           {/* Main Content */}
//           <div className="flex flex-col md:flex-row gap-4 mt-4">
//             {/* Left Column */}
//             <div className="md:w-1/2 space-y-4">
//               <div className="space-y-2 text-sm p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
//                 <p>
//                   <span className="font-semibold">Task:</span> {task.assignTaskDesc}
//                 </p>
//                 <p>
//                   <span className="font-semibold">Assigned Date:</span>{" "}
//                   {new Date(task.createdAt).toLocaleDateString("en-IN", {
//                     timeZone: "Asia/Kolkata",
//                   })}
//                 </p>
//                 <p>
//                   <span className="font-semibold">Due Date:</span>{" "}
//                   {new Date(task.dueDate).toLocaleDateString("en-IN", {
//                     timeZone: "Asia/Kolkata",
//                   })}
//                 </p>
//                 <p>
//                   <span className="font-semibold">Priority:</span>
//                   <span
//                     className={`ml-2 px-2 py-1 rounded text-white text-xs ${
//                       task.priority === "High"
//                         ? "bg-red-500"
//                         : task.priority === "Medium"
//                         ? "bg-yellow-500"
//                         : "bg-green-500"
//                     }`}
//                   >
//                     {task.priority}
//                   </span>
//                 </p>
//                 <p>
//                   <span className="font-semibold">Assign To:</span>{" "}
//                   <span className="text-blue-600 cursor-pointer">
//                     {task.assignedToEmployeeId} - {task.assignedToName}
//                   </span>
//                 </p>
//               </div>

//               <div className="border p-3 rounded-md bg-gray-100 dark:bg-gray-700 shadow-sm">
//                 <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
//                   Description
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-300 mt-1">
//                   {task.updatesComments}
//                 </p>
//               </div>

// {/*  task status */}
// <div>
//     <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
//       Task Status
//     </h3>
    
//     <select
//       value={status}
//       onChange={handleStatusChange}
//       className="block w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 rounded 
//                  bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 
//                  focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
//     >
//       {/* Make sure you don't use the same option twice in a row */}
//       <option value="Not Started">Not Started</option>
//       <option value="In Progress">In-Progress</option>
//       <option value="Completed">Completed</option>
//     </select>

//     <button
//       onClick={handleUpdateClick}
//       className="px-4 py-2 text-white bg-blue-500 rounded 
//                  hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 
//                  transition-colors duration-200"
//     >
//       Update Status
//     </button>

//     {/* Conditionally render the taskUpdate message */}
//     {taskUpdate && <h1>{taskUpdate}</h1>}
//   </div>

//             </div>

//             {/* Right Column (Comments) */}
//             <div className="md:w-1/2">
//               <Comment taskId={task._id} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </BaseModal>
//   );
// };

// export default AssignedTaskModal;



import React, { useEffect, useState } from "react";
import { 
  FaTimes, 
  FaCalendarAlt, 
  FaFlag, 
  FaUser, 
  FaIdCard, 
  FaFileAlt, 
  FaCheckCircle,
  FaClock,
  FaPlay,
  FaPause,
  FaExclamationTriangle,
  FaEdit,
  FaCheck,
  FaSpinner,
  FaUserTie
} from "react-icons/fa";
import BaseModal from "../../common/BaseModal";
import Comment from "./Comment";
import { updateTask } from '../../../service/taskService';

const AssignedTaskModal = ({ task, onClose }) => {
  const [status, setStatus] = useState(task?.status || "");
  const [taskUpdate, settaskUpdate] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  if (!task) return null;

  useEffect(() => {
    if (task) {
      setStatus(task.status);
    }
  }, [task]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleUpdateClick = async () => {
    // Prepare data to send to backend
    const taskData = { status };
    setIsUpdating(true);

    try {
      const updatedTask = await updateTask(task._id, taskData);

      if (updatedTask) {
        console.log('Task updated:', updatedTask);
        settaskUpdate("Task Status updated successfully!")
        // Optionally set the new status from the response
        // setStatus(updatedTask.status);

        setTimeout(() => {
          settaskUpdate("");
        }, 3000);
      } else {
        console.log('Failed to update task or server returned no data.');
        settaskUpdate("Failed to update task status");
      }
    } catch (error) {
      console.error('Failed to update task:', error);
      settaskUpdate("Error updating task status");
    } finally {
      setIsUpdating(false);
    }
  };

  // Get status configuration
  const getStatusConfig = (status) => {
    switch (status) {
      case "Completed":
        return {
          bgColor: "bg-green-500/10 dark:bg-green-500/20",
          textColor: "text-green-700 dark:text-green-300",
          borderColor: "border-green-500/30",
          icon: FaCheckCircle
        };
      case "In Progress":
        return {
          bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
          textColor: "text-blue-700 dark:text-blue-300",
          borderColor: "border-blue-500/30",
          icon: FaPlay
        };
      case "Not Started":
        return {
          bgColor: "bg-orange-500/10 dark:bg-orange-500/20",
          textColor: "text-orange-700 dark:text-orange-300",
          borderColor: "border-orange-500/30",
          icon: FaPause
        };
      default:
        return {
          bgColor: "bg-gray-500/10 dark:bg-gray-500/20",
          textColor: "text-gray-700 dark:text-gray-300",
          borderColor: "border-gray-500/30",
          icon: FaClock
        };
    }
  };

  // Get priority configuration
  const getPriorityConfig = (priority) => {
    switch (priority) {
      case "High":
        return {
          bgColor: "bg-red-500/10 dark:bg-red-500/20",
          textColor: "text-red-700 dark:text-red-300",
          borderColor: "border-red-500/30"
        };
      case "Medium":
        return {
          bgColor: "bg-yellow-500/10 dark:bg-yellow-500/20",
          textColor: "text-yellow-700 dark:text-yellow-300",
          borderColor: "border-yellow-500/30"
        };
      default:
        return {
          bgColor: "bg-green-500/10 dark:bg-green-500/20",
          textColor: "text-green-700 dark:text-green-300",
          borderColor: "border-green-500/30"
        };
    }
  };

  const statusConfig = getStatusConfig(status);
  const priorityConfig = getPriorityConfig(task.priority);
  const StatusIcon = statusConfig.icon;

  return (
    <BaseModal isOpen={true} onClose={onClose}>
      <div className="w-full max-w-7xl max-h-[90vh] bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 lg:p-8 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-gray-800/50 dark:to-gray-700/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg">
              <FaFileAlt className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                Task Management
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Monitor and manage task progress</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 hover:border-red-500/50 transition-all duration-300 hover:scale-110"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6 lg:p-8">
          {/* Content: two columns on lg+ screens, stacked otherwise */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            
            {/* Left Column */}
            <div className="lg:w-1/2 space-y-6">
              
              {/* Task Info Card */}
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <FaFileAlt className="text-indigo-500" />
                  Task Information
                </h3>
                
                <div className="space-y-4">
                  {/* Task Description */}
                  <div className="p-4 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl border border-gray-200/30 dark:border-gray-600/30">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Task Description</h4>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {task.assignTaskDesc}
                    </p>
                  </div>

                  {/* Date Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-blue-50/50 dark:bg-blue-900/20 rounded-xl border border-blue-200/30 dark:border-blue-700/30">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <FaCalendarAlt className="text-blue-600 dark:text-blue-400 text-sm" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">Assigned Date</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {new Date(task.createdAt).toLocaleDateString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-red-50/50 dark:bg-red-900/20 rounded-xl border border-red-200/30 dark:border-red-700/30">
                      <div className="p-2 bg-red-500/20 rounded-lg">
                        <FaCalendarAlt className="text-red-600 dark:text-red-400 text-sm" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">Due Date</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {new Date(task.dueDate).toLocaleDateString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Priority and Assignment Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <FaFlag className="text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Priority:</span>
                      <div className={`inline-flex items-center px-3 py-2 rounded-lg ${priorityConfig.bgColor} ${priorityConfig.borderColor} border`}>
                        <span className={`${priorityConfig.textColor} text-sm font-semibold`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FaUserTie className="text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Assigned To:</span>
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-lg">
                          <FaIdCard className="text-indigo-600 dark:text-indigo-400 text-sm" />
                        </div>
                        <span className="text-indigo-600 dark:text-indigo-400 font-semibold cursor-pointer hover:underline">
                          {task.assignedToEmployeeId} - {task.assignedToName}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Card */}
              {task.updatesComments && (
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <FaEdit className="text-purple-500" />
                    Additional Notes
                  </h3>
                  <div className="p-4 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl border border-gray-200/30 dark:border-gray-600/30">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {task.updatesComments}
                    </p>
                  </div>
                </div>
              )}

              {/* Task Status Management Card */}
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <StatusIcon className={statusConfig.textColor} />
                  Task Status Management
                </h3>

                <div className="space-y-4">
                  {/* Current Status Display */}
                  <div className="flex items-center gap-3 p-3 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl border border-gray-200/30 dark:border-gray-600/30">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Current Status:</span>
                    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${statusConfig.bgColor} ${statusConfig.borderColor} border`}>
                      <StatusIcon className={`${statusConfig.textColor} text-sm`} />
                      <span className={`${statusConfig.textColor} text-sm font-semibold`}>
                        {task.status}
                      </span>
                    </div>
                  </div>

                  {/* Status Selector */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Update Status
                    </label>
                    <select
                      value={status}
                      onChange={handleStatusChange}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      disabled={isUpdating}
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  {/* Update Button */}
                  <button
                    onClick={handleUpdateClick}
                    disabled={isUpdating || status === task.status}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                  >
                    {isUpdating ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <FaCheck />
                        Update Task Status
                      </>
                    )}
                  </button>

                  {/* Success/Error Message */}
                  {taskUpdate && (
                    <div className={`p-3 rounded-xl border ${
                      taskUpdate.includes("successfully") 
                        ? "bg-green-50/50 dark:bg-green-900/20 border-green-200/30 dark:border-green-700/30 text-green-700 dark:text-green-300"
                        : "bg-red-50/50 dark:bg-red-900/20 border-red-200/30 dark:border-red-700/30 text-red-700 dark:text-red-300"
                    }`}>
                      <div className="flex items-center gap-2">
                        {taskUpdate.includes("successfully") ? (
                          <FaCheckCircle className="text-green-600 dark:text-green-400" />
                        ) : (
                          <FaExclamationTriangle className="text-red-600 dark:text-red-400" />
                        )}
                        <span className="font-medium">{taskUpdate}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Comments */}
            <div className="lg:w-1/2">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <Comment taskId={task._id} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from { 
            opacity: 0; 
            transform: scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        
        /* Custom scrollbar styling */
        div::-webkit-scrollbar {
          width: 6px;
        }
        
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        
        div::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 3px;
        }
        
        div::-webkit-scrollbar-thumb:hover {
          background: #a0aec0;
        }
        
        .dark div::-webkit-scrollbar-thumb {
          background: #4a5568;
        }
        
        .dark div::-webkit-scrollbar-thumb:hover {
          background: #2d3748;
        }
      `}</style>
    </BaseModal>
  );
};

export default AssignedTaskModal;