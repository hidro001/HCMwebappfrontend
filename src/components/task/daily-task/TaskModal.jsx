

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
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
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
            className="w-full max-w-2xl max-h-[90vh] mx-auto flex flex-col rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 transition-colors duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Fixed height */}
            <div className="flex-shrink-0 bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                {editMode ? (
                  <>
                    <FiEdit2 className="mr-2" /> Edit Task
                  </>
                ) : (
                  <>
                    <FiPlus className="mr-2" /> Add New Task
                  </>
                )}
              </h3>
            </div>

            {/* Form content - Scrollable */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
              <div className="flex-1 overflow-y-auto p-6 space-y-6
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
              ">
                {/* Date input */}
                <div className="space-y-2">
                  <label
                    htmlFor="taskDate"
                    className="block font-medium text-gray-700 dark:text-gray-300"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="taskDate"
                    value={taskDate || todayString}
                    onChange={(e) => setTaskDate(e.target.value)}
                    required
                    className="block w-full max-w-xs rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>

                {/* Task list inputs */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300">
                    Tasks
                  </h4>
                  <AnimatePresence>
                    {taskList.map((task, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="relative bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600 group hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-sm font-medium text-indigo-600 dark:text-indigo-300 mr-3">
                              {idx + 1}
                            </div>
                            <label
                              htmlFor={`task-${idx}`}
                              className="font-medium text-gray-700 dark:text-gray-300"
                            >
                              Task {idx + 1}
                            </label>
                          </div>
                          {taskList.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleDeleteTaskInput(idx)}
                              className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-200 p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
                              title="Delete this task input"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          )}
                        </div>
                        <textarea
                          id={`task-${idx}`}
                          value={task}
                          onChange={(e) => handleChange(idx, e.target.value)}
                          placeholder="What needs to be done?"
                          rows={3}
                          className="block w-full rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-3 py-2.5 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none shadow-sm transition-all placeholder-gray-400 dark:placeholder-gray-500"
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Footer - Fixed height */}
              <div className="flex-shrink-0 bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between gap-3">
                  {/* Add Another Task - Left side */}
                  <button
                    type="button"
                    onClick={handleAddTaskInput}
                    className="flex items-center px-4 py-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium"
                  >
                    <FiPlus className="mr-2" size={16} /> Add Another Task
                  </button>

                  {/* Action buttons - Right side */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex items-center px-6 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 font-medium"
                    >
                      <FiX className="mr-2" size={16} /> Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center px-6 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <FiRefreshCw className="animate-spin mr-2" size={16} />
                      ) : editMode ? (
                        <FiCheck className="mr-2" size={16} />
                      ) : (
                        <FiPlus className="mr-2" size={16} />
                      )}
                      {editMode ? "Update Task" : "Add Task"}
                    </button>
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
