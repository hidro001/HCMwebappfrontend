import React from "react";
import BaseModal from "../../common/BaseModal";
import { AnimatePresence, motion } from "framer-motion";
import { HiTrendingUp } from "react-icons/hi";

export default function HiringModal({
  isOpen,
  onRequestClose,
  loading,
  hires,
  month,
  year,
}) {
  const fx = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <BaseModal isOpen={isOpen} onClose={onRequestClose}>
          <motion.div
            variants={fx}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="w-[90vw] max-w-2xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl dark:shadow-gray-900/20 flex flex-col overflow-hidden border border-gray-100 dark:border-gray-800"
          >
            {/* Header */}
            <header className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
              <div className="flex items-center gap-3">
                <HiTrendingUp className="text-xl text-emerald-600 dark:text-emerald-400" />
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Hires – {month}/{year}
                </h2>
              </div>
              <button
                onClick={onRequestClose}
                className="text-xl leading-none text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center"
                aria-label="Close modal"
              >
                &times;
              </button>
            </header>

            {loading ? (
              <div className="flex-1 flex items-center justify-center bg-gray-50/30 dark:bg-gray-800/30">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-emerald-600 border-t-transparent"></div>
                  <span>Loading hires...</span>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30 dark:bg-gray-900/50">
                {hires.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-4 mb-4">
                      <HiTrendingUp className="text-3xl text-gray-400 dark:text-gray-500" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-base font-medium">
                      No hires recorded for this month.
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                      Check back later or try a different month.
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        New Employees
                      </h3>
                      <span className="text-sm text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full font-medium">
                        {hires.length} hire{hires.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm dark:shadow-gray-900/10 border border-gray-200 dark:border-gray-700">
                      <ul className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
                        <ul className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
                          {hires.map((u) => (
                            <li
                              key={u._id}
                              className="flex justify-between items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                            >
                              {/* left: name */}
                              <span className="font-medium text-gray-900 dark:text-white">
                                {u.first_Name} {u.last_Name}
                              </span>

                              {/* right: join-date + department */}
                              <div className="flex items-center gap-2 shrink-0">
                                {u.date_of_Joining && (
                                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                                    {new Date(
                                      u.date_of_Joining
                                    ).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    })}
                                  </span>
                                )}
                                <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                                  {u.department || "Unassigned"}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </BaseModal>
      )}
    </AnimatePresence>
  );
}
