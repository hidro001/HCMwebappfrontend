import React from "react";
import BaseModal from "../../common/BaseModal"; // adjust path if needed
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineEye, HiOutlineX } from "react-icons/hi";

export default function SectionDetailModal({ isOpen, onClose, section }) {
  if (!section) return null;

  const fx = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.25, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <BaseModal isOpen={isOpen} onClose={onClose}>
          <motion.div
            variants={fx}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="w-[90vw] max-w-md max-h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <header className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-600 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-750">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <HiOutlineEye className="text-lg text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {section.title}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {section.users.length}{" "}
                    {section.users.length === 1 ? "person" : "people"}
                  </p>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Close modal"
              >
                <HiOutlineX className="text-xl" />
              </motion.button>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50 dark:bg-gray-900/50">
              {section.users.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="mb-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <HiOutlineEye className="text-2xl text-gray-400 dark:text-gray-500" />
                    </div>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">
                    No records found
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                    There are no users in this category
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  {section.users.map((u, index) => (
                    <motion.div
                      key={u.name || index}
                      custom={index}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex items-center gap-4 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg transition-all duration-200 hover:border-purple-200 dark:hover:border-purple-700"
                    >
                      {/* Avatar */}
                      <div className="relative">
                        {u.img ? (
                          <img
                            src={u.img}
                            alt={u.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-600 shadow-sm"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500 flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                            {u.initials}
                          </div>
                        )}
                        {/* Online indicator (optional) */}
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 dark:bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                      </div>

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                          {u.name}
                        </p>
                        {u.login && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            Login: {u.login}
                          </p>
                        )}
                        {u.logout && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            Logout: {u.logout}
                          </p>
                        )}
                        {u.department && (
                          <p className="text-xs text-purple-600 dark:text-purple-400 truncate">
                            {u.department}
                          </p>
                        )}
                      </div>

                      {/* Status Badge (optional) */}
                      <div className="flex-shrink-0">
                        <span
                          className={`
                          inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                          ${
                            section.title === "On Time"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                          }
                        `}
                        >
                          {section.title === "On Time"
                            ? "Present"
                            : section.title === "Late Arrival"
                            ? "Late"
                            : "Absent"}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Show More Section */}
              {section.more > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-700"
                >
                  <div className="text-center">
                    <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                      +{section.more} more{" "}
                      {section.more === 1 ? "person" : "people"}
                    </p>
                    <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                      Total: {section.users.length + section.more} users
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer (optional) */}
            <footer className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Last updated: Just now</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </footer>
          </motion.div>
        </BaseModal>
      )}
    </AnimatePresence>
  );
}
