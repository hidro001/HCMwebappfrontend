

// import React from "react";
// import BaseModal from "../../common/BaseModal"; 
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiEdit2,
//   FiPlus,
//   FiX,
//   FiRefreshCw,
//   FiCheck,
//   FiTrash2,
// } from "react-icons/fi";

// export default function TaskModal({
//   isOpen,
//   onClose,
//   taskList,
//   taskDate,
//   setTaskDate,
//   handleAddTaskInput,
//   handleDeleteTaskInput,
//   handleChange,
//   handleSubmit,
//   loading,
//   editMode,
// }) {
//   const todayString = new Date().toISOString().substring(0, 10);

//   const panelVariants = {
//     hidden: { opacity: 0, scale: 0.95, y: 20 },
//     visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
//     exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <BaseModal isOpen={isOpen} onClose={onClose}>
//           <motion.div
//             variants={panelVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             className="w-full max-w-2xl max-h-[90vh] mx-auto flex flex-col rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 transition-colors duration-300"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Header - Fixed height */}
//             <div className="flex-shrink-0 bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-4">
//               <h3 className="text-xl font-bold text-white flex items-center">
//                 {editMode ? (
//                   <>
//                     <FiEdit2 className="mr-2" /> Edit Task
//                   </>
//                 ) : (
//                   <>
//                     <FiPlus className="mr-2" /> Add New Task
//                   </>
//                 )}
//               </h3>
//             </div>

//             {/* Form content - Scrollable */}
//             <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
//               <div className="flex-1 overflow-y-auto p-6 space-y-6
//                 [&::-webkit-scrollbar]:w-2
//                 [&::-webkit-scrollbar-track]:rounded-full
//                 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
//                 [&::-webkit-scrollbar-thumb]:rounded-full
//                 [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
//               ">
//                 {/* Date input */}
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="taskDate"
//                     className="block font-medium text-gray-700 dark:text-gray-300"
//                   >
//                     Date
//                   </label>
//                   <input
//                     type="date"
//                     id="taskDate"
//                     value={taskDate || todayString}
//                     onChange={(e) => setTaskDate(e.target.value)}
//                     required
//                     className="block w-full max-w-xs rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                   />
//                 </div>

//                 {/* Task list inputs */}
//                 <div className="space-y-4">
//                   <h4 className="font-medium text-gray-700 dark:text-gray-300">
//                     Tasks
//                   </h4>
//                   <AnimatePresence>
//                     {taskList.map((task, idx) => (
//                       <motion.div
//                         key={idx}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -10 }}
//                         transition={{ duration: 0.2 }}
//                         className="relative bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600 group hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
//                       >
//                         <div className="flex items-center justify-between mb-3">
//                           <div className="flex items-center">
//                             <div className="h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-sm font-medium text-indigo-600 dark:text-indigo-300 mr-3">
//                               {idx + 1}
//                             </div>
//                             <label
//                               htmlFor={`task-${idx}`}
//                               className="font-medium text-gray-700 dark:text-gray-300"
//                             >
//                               Task {idx + 1}
//                             </label>
//                           </div>
//                           {taskList.length > 1 && (
//                             <button
//                               type="button"
//                               onClick={() => handleDeleteTaskInput(idx)}
//                               className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-200 p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
//                               title="Delete this task input"
//                             >
//                               <FiTrash2 size={16} />
//                             </button>
//                           )}
//                         </div>
//                         <textarea
//                           id={`task-${idx}`}
//                           value={task}
//                           onChange={(e) => handleChange(idx, e.target.value)}
//                           placeholder="What needs to be done?"
//                           rows={3}
//                           className="block w-full rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-3 py-2.5 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none shadow-sm transition-all placeholder-gray-400 dark:placeholder-gray-500"
//                         />
//                       </motion.div>
//                     ))}
//                   </AnimatePresence>
//                 </div>
//               </div>

//               {/* Footer - Fixed height */}
//               <div className="flex-shrink-0 bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
//                 <div className="flex items-center justify-between gap-3">
//                   {/* Add Another Task - Left side */}
//                   <button
//                     type="button"
//                     onClick={handleAddTaskInput}
//                     className="flex items-center px-4 py-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium"
//                   >
//                     <FiPlus className="mr-2" size={16} /> Add Another Task
//                   </button>

//                   {/* Action buttons - Right side */}
//                   <div className="flex items-center gap-3">
//                     <button
//                       type="button"
//                       onClick={onClose}
//                       className="flex items-center px-6 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 font-medium"
//                     >
//                       <FiX className="mr-2" size={16} /> Cancel
//                     </button>

//                     <button
//                       type="submit"
//                       disabled={loading}
//                       className="flex items-center px-6 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed"
//                     >
//                       {loading ? (
//                         <FiRefreshCw className="animate-spin mr-2" size={16} />
//                       ) : editMode ? (
//                         <FiCheck className="mr-2" size={16} />
//                       ) : (
//                         <FiPlus className="mr-2" size={16} />
//                       )}
//                       {editMode ? "Update Task" : "Add Task"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </motion.div>
//         </BaseModal>
//       )}
//     </AnimatePresence>
//   );
// }


import React from "react";
import BaseModal from "../../common/BaseModal"; 
import { motion, AnimatePresence } from "framer-motion";
import {
  FiEdit2,
  FiPlus,
  FiX,
  FiRefreshCw,
  FiCheck,
  FiTrash2,
  FiCalendar,
  FiTarget,
  FiZap,
  FiStar,
} from "react-icons/fi";

export default function TaskModal({
  isOpen,
  onClose,
  taskList,
  taskDate,
  setTaskDate,
  handleAddTaskInput,
  handleDeleteTaskInput,
  handleChange,
  handleSubmit,
  loading,
  editMode,
}) {
  const todayString = new Date().toISOString().substring(0, 10);

  const panelVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        duration: 0.4 
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      y: 50, 
      transition: { duration: 0.3 } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <BaseModal isOpen={isOpen} onClose={onClose}>
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-3xl max-h-[90vh] mx-auto flex flex-col rounded-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Enhanced Header with Gradient and Icons */}
            <div className="flex-shrink-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-8 py-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    {editMode ? (
                      <FiEdit2 className="h-6 w-6 text-white" />
                    ) : (
                      <FiZap className="h-6 w-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {editMode ? "Edit Task" : "Create New Task"}
                    </h3>
                    <p className="text-white/80 text-sm mt-1">
                      {editMode ? "Update your task details" : "What would you like to accomplish?"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <FiX className="h-6 w-6 text-white" />
                </button>
              </div>
            </div>

            {/* Enhanced Form Content */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
              <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-gradient-to-br from-gray-50/80 via-white to-indigo-50/30 dark:from-gray-800/80 dark:via-gray-800 dark:to-indigo-900/20
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100/50 dark:[&::-webkit-scrollbar-track]:bg-gray-700/50
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-indigo-300 dark:[&::-webkit-scrollbar-thumb]:bg-indigo-600
                [&::-webkit-scrollbar-thumb:hover]:bg-indigo-400 dark:[&::-webkit-scrollbar-thumb:hover]:bg-indigo-500
              ">
                {/* Enhanced Date Input */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-3"
                >
                  <label
                    htmlFor="taskDate"
                    className="flex items-center font-semibold text-gray-700 dark:text-gray-200 text-lg"
                  >
                    <FiCalendar className="mr-2 h-5 w-5 text-indigo-500" />
                    Due Date
                  </label>
                  <div className="relative max-w-xs">
                    <input
                      type="date"
                      id="taskDate"
                      value={taskDate || todayString}
                      onChange={(e) => setTaskDate(e.target.value)}
                      required
                      className="block w-full rounded-xl border-2 border-gray-200 dark:border-gray-600 px-4 py-3 bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 backdrop-blur-sm shadow-sm hover:shadow-md"
                    />
                  </div>
                </motion.div>

                {/* Enhanced Task List */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="flex items-center font-semibold text-gray-700 dark:text-gray-200 text-lg">
                      <FiTarget className="mr-2 h-5 w-5 text-purple-500" />
                      Task Details
                    </h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <FiStar className="h-4 w-4" />
                      <span>{taskList.length} task{taskList.length !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <AnimatePresence>
                      {taskList.map((task, idx) => (
                        <motion.div
                          key={idx}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                          className="relative bg-white/80 dark:bg-gray-700/80 rounded-2xl p-6 border border-gray-200/60 dark:border-gray-600/60 group hover:border-indigo-300/60 dark:hover:border-indigo-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 backdrop-blur-sm"
                        >
                          {/* Task Header */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
                                {idx + 1}
                              </div>
                              <div>
                                <label
                                  htmlFor={`task-${idx}`}
                                  className="font-semibold text-gray-800 dark:text-gray-200 text-lg"
                                >
                                  Task {idx + 1}
                                </label>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {task.length > 0 ? `${task.length} characters` : 'Enter task description'}
                                </p>
                              </div>
                            </div>
                            {taskList.length > 1 && (
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                type="button"
                                onClick={() => handleDeleteTaskInput(idx)}
                                className="p-2.5 text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 border border-transparent hover:border-red-200 dark:hover:border-red-700"
                                title="Delete this task"
                              >
                                <FiTrash2 className="h-5 w-5" />
                              </motion.button>
                            )}
                          </div>

                          {/* Enhanced Textarea */}
                          <div className="relative">
                            <textarea
                              id={`task-${idx}`}
                              value={task}
                              onChange={(e) => handleChange(idx, e.target.value)}
                              placeholder="Describe what needs to be accomplished..."
                              rows={4}
                              className="block w-full rounded-xl bg-gray-50/80 dark:bg-gray-800/80 border-2 border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 backdrop-blur-sm"
                            />
                            {task.length > 0 && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute bottom-3 right-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded-full text-xs font-medium"
                              >
                                {task.length} chars
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>

              {/* Enhanced Footer */}
              <div className="flex-shrink-0 bg-gradient-to-r from-gray-50/95 via-white/95 to-indigo-50/95 dark:from-gray-800/95 dark:via-gray-800/95 dark:to-indigo-900/95 px-8 py-6 border-t border-gray-200/50 dark:border-gray-600/50 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4">
                  {/* Add Another Task Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleAddTaskInput}
                    className="flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-600 dark:text-indigo-400 hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-800/50 dark:hover:to-purple-800/50 transition-all duration-200 font-semibold border border-indigo-200 dark:border-indigo-700 shadow-sm hover:shadow-md"
                  >
                    <FiPlus className="mr-2 h-5 w-5" />
                    Add Another Task
                  </motion.button>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={onClose}
                      className="flex items-center px-6 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-semibold backdrop-blur-sm"
                    >
                      <FiX className="mr-2 h-5 w-5" />
                      Cancel
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={loading}
                      className="flex items-center px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold shadow-lg shadow-indigo-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border border-indigo-500/20"
                    >
                      {loading ? (
                        <FiRefreshCw className="animate-spin mr-2 h-5 w-5" />
                      ) : editMode ? (
                        <FiCheck className="mr-2 h-5 w-5" />
                      ) : (
                        <FiZap className="mr-2 h-5 w-5" />
                      )}
                      {loading ? 'Processing...' : editMode ? "Update Task" : "Create Task"}
                    </motion.button>
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        </BaseModal>
      )}
    </AnimatePresence>
  );
}