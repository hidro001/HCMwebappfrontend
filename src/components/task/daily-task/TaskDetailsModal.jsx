// src/components/TaskDetailsModal.jsx

import React from "react";
import BaseModal from "../../common/BaseModal";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCalendar, FiList, FiEdit2, FiBookmark } from "react-icons/fi";

export default function TaskDetailsModal({
  isOpen,
  onClose,
  taskDetails,
  onEdit,
  formatDate,
  isToday,
  isPastDue,
}) {
  if (!taskDetails) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const panelVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: { scale: 0.9, opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <BaseModal isOpen={isOpen} onClose={onClose}>
          {/* optional backdrop animation */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-blue-600 dark:bg-blue-500 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <FiList className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Task Details</h3>
                  <p className="text-white/80 text-sm">
                    {taskDetails.task.length} task
                    {taskDetails.task.length !== 1 ? "s" : ""}
                    {taskDetails.task_Date &&
                      ` • ${formatDate(taskDetails.task_Date)}`}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Close"
              >
                <FiX className="h-6 w-6 text-white" />
              </button>
            </div>

            {/* Content */}
            <div
              className="p-6 max-h-96 overflow-y-auto  [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
                transition-colors duration-300"
            >
              <div className="space-y-4">
                {taskDetails.task.map((task, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 dark:bg-blue-500 text-white font-bold text-sm flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        Task {idx + 1}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {task}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  {taskDetails.task_Date && (
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        isToday(taskDetails.task_Date)
                          ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                          : isPastDue(taskDetails.task_Date)
                          ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                          : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      }`}
                    >
                      <FiCalendar className="mr-1 h-3 w-3" />
                      {formatDate(taskDetails.task_Date)}
                    </span>
                  )}
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    <FiBookmark className="mr-1 h-3 w-3" />
                    {taskDetails.task.length} task
                    {taskDetails.task.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      onClose();
                      onEdit(taskDetails);
                    }}
                    className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800/50 transition-colors border border-amber-200 dark:border-amber-700"
                  >
                    <FiEdit2 className="mr-2 h-4 w-4" />
                    Edit Tasks
                  </button>

                  <button
                    onClick={onClose}
                    className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </BaseModal>
      )}
    </AnimatePresence>
  );
}
