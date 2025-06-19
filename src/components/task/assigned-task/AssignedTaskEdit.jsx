
// import React, { useRef, useEffect } from "react";
// import { FaTimes } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { updateTask } from "../../../service/taskService";
// import BaseModal from "../../common/BaseModal"; 

// const AssignedTaskEdit = ({ task, onClose, onEditSuccess }) => {
//   // If task is not provided, don't render the modal.
//   if (!task) return null;

//   const modalRef = useRef(null);

//   // Lock the background scroll when the modal is open.
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   // Submit handler that collects form data and calls updateTask.
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     // Convert FormData to a plain object.
//     const updatedTaskData = Object.fromEntries(formData.entries());
//     const result = await updateTask(task._id, updatedTaskData);
//     if (result) {
//       // Call onEditSuccess to refresh the tasks list.
//       if (onEditSuccess) {
//         onEditSuccess();
//       }
//       onClose(); // Close modal on successful update.
//     } else {
//       console.error("Task update failed.");
//     }
//   };

//   return (
//     <BaseModal isOpen={true} onClose={onClose}>
//       <motion.div
//         ref={modalRef}
//         className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl overflow-auto relative h-3/4"
//         initial={{ scale: 0.9 }}
//         animate={{ scale: 1 }}
//         exit={{ scale: 0.9 }}
//         transition={{ type: "spring", stiffness: 300, damping: 20 }}
//       >
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-red-600 transition duration-200"
//           aria-label="Close form"
//         >
//           <FaTimes size={20} />
//         </button>

//         {/* Header */}
//         <div className="bg-blue-900 dark:bg-blue-700 p-4 text-lg font-semibold text-white">
//           Edit Assigned Task
//         </div>

//         {/* Form Content */}
//         <div className="p-6">
       

//           <form className="space-y-4" onSubmit={handleSubmit}>
//             {/* Task Description */}
//             <div>
//               <label className="block text-sm font-medium mb-1" htmlFor="taskDesc">
//                 Task Name*
//               </label>
//               <input
//                 id="taskDesc"
//                 name="assignTaskDesc"
//                 type="text"
//                 placeholder="Enter Task Description"
//                 defaultValue={task.assignTaskDesc || ""}
//                 className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                 required
//               />
//             </div>

//             {/* Assignee & Department */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="assignee">
//                   Assignee
//                 </label>
//                 <input
//                   id="assignee"
//                   type="text"
//                   value={`${task.assignedToName || ""} (${task.assignedToEmployeeId || ""})`}
//                   disabled
//                   className="w-full p-2 border rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="department">
//                   Department
//                 </label>
//                 <input
//                   id="department"
//                   type="text"
//                   value={task.selectedDepartment || task.assignedToDepartment || ""}
//                   disabled
//                   className="w-full p-2 border rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white"
//                 />
//               </div>
//             </div>

//             {/* Assigned By & Designation */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="assignedBy">
//                   Assigned By
//                 </label>
//                 <input
//                   id="assignedBy"
//                   type="text"
//                   value={task.assignedByName || ""}
//                   disabled
//                   className="w-full p-2 border rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="designation">
//                   Designation
//                 </label>
//                 <input
//                   id="designation"
//                   type="text"
//                   value={task.assignedToDesignation || ""}
//                   disabled
//                   className="w-full p-2 border rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white"
//                 />
//               </div>
//             </div>

//             {/* Due Date */}
//             <div>
//               <label className="block text-sm font-medium mb-1" htmlFor="dueDate">
//                 Due Date
//               </label>
//               <input
//                 id="dueDate"
//                 name="dueDate"
//                 type="date"
//                 defaultValue={
//                   task.dueDate
//                     ? new Date(task.dueDate).toISOString().substr(0, 10)
//                     : ""
//                 }
//                 className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//               />
//             </div>

//             {/* Priority & Status */}
//             <div className="space-y-2">
//               <fieldset>
//                 <legend className="text-sm font-medium mb-1">Priority*</legend>
//                 <div className="flex space-x-4">
//                   {["Low", "Medium", "High"].map((level) => (
//                     <label key={level} className="inline-flex items-center">
//                       <input
//                         type="radio"
//                         name="priority"
//                         value={level}
//                         defaultChecked={task.priority === level}
//                         className="mr-2"
//                       />
//                       <span
//                         className={
//                           level === "Low"
//                             ? "text-green-500"
//                             : level === "Medium"
//                             ? "text-yellow-500"
//                             : "text-red-500"
//                         }
//                       >
//                         {level}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </fieldset>
//               <fieldset>
//                 <legend className="text-sm font-medium mb-1">Status*</legend>
//                 <div className="flex space-x-4">
//                   {["Not Started", "In Progress", "Completed"].map((state) => (
//                     <label key={state} className="inline-flex items-center">
//                       <input
//                         type="radio"
//                         name="status"
//                         value={state}
//                         defaultChecked={task.status === state}
//                         className="mr-2"
//                       />
//                       <span
//                         className={
//                           state === "Not Started"
//                             ? "text-orange-500"
//                             : state === "In Progress"
//                             ? "text-blue-500"
//                             : "text-green-500"
//                         }
//                       >
//                         {state}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </fieldset>
//             </div>

//             {/* Updates/Comments */}
//             <div>
//               <label className="block text-sm font-medium mb-1" htmlFor="updatesComments">
//                Task Description
//               </label>
//               <textarea
//                 id="updatesComments"
//                 name="updatesComments"
//                 placeholder="Enter updates or comments..."
//                 defaultValue={task.updatesComments || ""}
//                 className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white"
//               />
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-200"
//             >
//               Submit Change
//             </button>
//           </form>
//         </div>
//       </motion.div>
//     </BaseModal>
//   );
// };

// export default AssignedTaskEdit;



import React, { useRef, useEffect, useState } from "react";
import { 
  FaTimes, 
  FaEdit, 
  FaUser, 
  FaBuilding, 
  FaCalendarAlt, 
  FaFlag, 
  FaCheckCircle, 
  FaClock, 
  FaPlay, 
  FaPause,
  FaFileAlt,
  FaUserTie,
  FaIdCard,
  FaSave,
  FaSpinner,
  FaExclamationTriangle
} from "react-icons/fa";
import { motion } from "framer-motion";
import { updateTask } from "../../../service/taskService";
import BaseModal from "../../common/BaseModal";

const AssignedTaskEdit = ({ task, onClose, onEditSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  
  // If task is not provided, don't render the modal.
  if (!task) return null;

  const modalRef = useRef(null);

  // Submit handler that collects form data and calls updateTask.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    
    const formData = new FormData(e.target);
    // Convert FormData to a plain object.
    const updatedTaskData = Object.fromEntries(formData.entries());
    
    try {
      const result = await updateTask(task._id, updatedTaskData);
      if (result) {
        setSubmitMessage("Task updated successfully!");
        // Call onEditSuccess to refresh the tasks list.
        if (onEditSuccess) {
          onEditSuccess();
        }
        setTimeout(() => {
          onClose(); // Close modal on successful update.
        }, 1500);
      } else {
        setSubmitMessage("Task update failed. Please try again.");
        console.error("Task update failed.");
      }
    } catch (error) {
      setSubmitMessage("Error updating task. Please try again.");
      console.error("Task update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get priority configuration
  const getPriorityConfig = (priority) => {
    switch (priority) {
      case "High":
        return {
          bgColor: "bg-red-500/10 dark:bg-red-500/20",
          textColor: "text-red-700 dark:text-red-300",
          borderColor: "border-red-500/30",
          radioColor: "text-red-600 focus:ring-red-500"
        };
      case "Medium":
        return {
          bgColor: "bg-orange-500/10 dark:bg-orange-500/20",
          textColor: "text-orange-700 dark:text-orange-300",
          borderColor: "border-orange-500/30",
          radioColor: "text-orange-600 focus:ring-orange-500"
        };
      default:
        return {
          bgColor: "bg-green-500/10 dark:bg-green-500/20",
          textColor: "text-green-700 dark:text-green-300",
          borderColor: "border-green-500/30",
          radioColor: "text-green-600 focus:ring-green-500"
        };
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
          radioColor: "text-green-600 focus:ring-green-500"
        };
      case "In Progress":
        return {
          bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
          textColor: "text-blue-700 dark:text-blue-300",
          borderColor: "border-blue-500/30",
          radioColor: "text-blue-600 focus:ring-blue-500"
        };
      default:
        return {
          bgColor: "bg-orange-500/10 dark:bg-orange-500/20",
          textColor: "text-orange-700 dark:text-orange-300",
          borderColor: "border-orange-500/30",
          radioColor: "text-orange-600 focus:ring-orange-500"
        };
    }
  };

  return (
    <BaseModal isOpen={true} onClose={onClose}>
      <motion.div
        ref={modalRef}
        className="w-full max-w-4xl max-h-[90vh] bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-2xl overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 lg:p-8 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-gray-800/50 dark:to-gray-700/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl shadow-lg">
              <FaEdit className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                Edit Task
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Modify task details and settings
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 hover:border-red-500/50 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6 lg:p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Task Name */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <FaFileAlt className="text-emerald-500" />
                <label className="text-lg font-semibold text-gray-900 dark:text-white">
                  Task Name <span className="text-red-500">*</span>
                </label>
              </div>
              <input
                id="taskDesc"
                name="assignTaskDesc"
                type="text"
                placeholder="Enter task description..."
                defaultValue={task.assignTaskDesc || ""}
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Assignee Information */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FaUser className="text-blue-500" />
                Assignee Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center gap-2">
                      <FaIdCard className="text-gray-400 text-sm" />
                      Assignee
                    </div>
                  </label>
                  <div className="p-4 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl border border-gray-200/30 dark:border-gray-600/30">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {task.assignedToName || "N/A"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ID: {task.assignedToEmployeeId || "N/A"}
                    </p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center gap-2">
                      <FaBuilding className="text-gray-400 text-sm" />
                      Department
                    </div>
                  </label>
                  <div className="p-4 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl border border-gray-200/30 dark:border-gray-600/30">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {task.selectedDepartment || task.assignedToDepartment || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center gap-2">
                      <FaUserTie className="text-gray-400 text-sm" />
                      Assigned By
                    </div>
                  </label>
                  <div className="p-4 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl border border-gray-200/30 dark:border-gray-600/30">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {task.assignedByName || "N/A"}
                    </p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center gap-2">
                      <FaUser className="text-gray-400 text-sm" />
                      Designation
                    </div>
                  </label>
                  <div className="p-4 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl border border-gray-200/30 dark:border-gray-600/30">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {task.assignedToDesignation || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Due Date */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <FaCalendarAlt className="text-blue-500" />
                <label className="text-lg font-semibold text-gray-900 dark:text-white">
                  Due Date
                </label>
              </div>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                defaultValue={
                  task.dueDate
                    ? new Date(task.dueDate).toISOString().substr(0, 10)
                    : ""
                }
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                disabled={isSubmitting}
              />
            </div>

            {/* Priority and Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Priority */}
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <FaFlag className="text-orange-500" />
                  <label className="text-lg font-semibold text-gray-900 dark:text-white">
                    Priority <span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="space-y-3">
                  {["Low", "Medium", "High"].map((level) => {
                    const priorityConfig = getPriorityConfig(level);
                    return (
                      <label key={level} className={`flex items-center p-3 rounded-xl border ${priorityConfig.borderColor} ${priorityConfig.bgColor} cursor-pointer hover:scale-105 transition-all duration-200`}>
                        <input
                          type="radio"
                          name="priority"
                          value={level}
                          defaultChecked={task.priority === level}
                          className={`mr-3 ${priorityConfig.radioColor}`}
                          disabled={isSubmitting}
                        />
                        <div className="flex items-center gap-2">
                          <FaFlag className={`${priorityConfig.textColor} text-sm`} />
                          <span className={`font-medium ${priorityConfig.textColor}`}>
                            {level} Priority
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Status */}
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <FaClock className="text-indigo-500" />
                  <label className="text-lg font-semibold text-gray-900 dark:text-white">
                    Status <span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="space-y-3">
                  {["Not Started", "In Progress", "Completed"].map((state) => {
                    const statusConfig = getStatusConfig(state);
                    const StatusIcon = state === "Completed" ? FaCheckCircle : state === "In Progress" ? FaPlay : FaPause;
                    return (
                      <label key={state} className={`flex items-center p-3 rounded-xl border ${statusConfig.borderColor} ${statusConfig.bgColor} cursor-pointer hover:scale-105 transition-all duration-200`}>
                        <input
                          type="radio"
                          name="status"
                          value={state}
                          defaultChecked={task.status === state}
                          className={`mr-3 ${statusConfig.radioColor}`}
                          disabled={isSubmitting}
                        />
                        <div className="flex items-center gap-2">
                          <StatusIcon className={`${statusConfig.textColor} text-sm`} />
                          <span className={`font-medium ${statusConfig.textColor}`}>
                            {state}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Task Description */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <FaFileAlt className="text-purple-500" />
                <label className="text-lg font-semibold text-gray-900 dark:text-white">
                  Task Description
                </label>
              </div>
              <textarea
                id="updatesComments"
                name="updatesComments"
                placeholder="Enter detailed task description, updates, or comments..."
                defaultValue={task.updatesComments || ""}
                rows={4}
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                disabled={isSubmitting}
              />
            </div>

            {/* Success/Error Message */}
            {submitMessage && (
              <div className={`p-4 rounded-xl border ${
                submitMessage.includes("successfully") 
                  ? "bg-green-50/50 dark:bg-green-900/20 border-green-200/30 dark:border-green-700/30 text-green-700 dark:text-green-300"
                  : "bg-red-50/50 dark:bg-red-900/20 border-red-200/30 dark:border-red-700/30 text-red-700 dark:text-red-300"
              }`}>
                <div className="flex items-center gap-2">
                  {submitMessage.includes("successfully") ? (
                    <FaCheckCircle className="text-green-600 dark:text-green-400" />
                  ) : (
                    <FaExclamationTriangle className="text-red-600 dark:text-red-400" />
                  )}
                  <span className="font-medium">{submitMessage}</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed text-lg"
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <>
                    <FaSave />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <style jsx>{`
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
      </motion.div>
    </BaseModal>
  );
};

export default AssignedTaskEdit;