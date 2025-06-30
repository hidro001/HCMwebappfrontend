import React, { useMemo } from "react";
import BaseModal from "../../common/BaseModal";
import { AnimatePresence, motion } from "framer-motion";
import { useDashboardStore } from "../../../store/useDashboardStore";
import { HiOutlineUsers } from "react-icons/hi";

export default function LocationModal({ isOpen, onRequestClose, loading }) {
  const { attendanceDetails } = useDashboardStore();

  const grouped = useMemo(
    () =>
      attendanceDetails.reduce((acc, cur) => {
        const key = cur.office || "Unknown";
        acc[key] = acc[key] ? [...acc[key], cur] : [cur];
        return acc;
      }, {}),
    [attendanceDetails]
  );

  const fx = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, scale: 0.85, transition: { duration: 0.2 } },
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
            className="w-[90vw] max-w-3xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl dark:shadow-gray-900/20 flex flex-col overflow-hidden border border-gray-100 dark:border-gray-800"
          >
            <header className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
              <div className="flex items-center gap-3">
                <HiOutlineUsers className="text-xl text-lime-600 dark:text-lime-400" />
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Employees by Office
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
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-lime-600 border-t-transparent"></div>
                  <span>Loading office locations...</span>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-gray-50/30 dark:bg-gray-900/50">
                {Object.entries(grouped).map(([office, list]) => (
                  <section key={office}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-base">
                        {office}
                      </h3>
                      <span className="text-sm text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full font-medium">
                        {list.length}
                      </span>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm dark:shadow-gray-900/10 border border-gray-200 dark:border-gray-700">
                      <ul className="divide-y divide-gray-100 dark:divide-gray-700 text-sm max-h-60 overflow-y-auto">
                        {list.map((u) => (
                          <li
                            key={u._id}
                            className="px-4 py-3 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 flex items-center justify-between"
                          >
                            <span>
                              {u.first_Name} {u.last_Name}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {u.department || "N/A"}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>
                ))}
              </div>
            )}
          </motion.div>
        </BaseModal>
      )}
    </AnimatePresence>
  );
}
