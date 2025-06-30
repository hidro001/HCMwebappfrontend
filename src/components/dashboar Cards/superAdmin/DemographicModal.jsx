import React, { useMemo } from "react";
import BaseModal from "../../common/BaseModal";
import { AnimatePresence, motion } from "framer-motion";
import { useDashboardStore } from "../../../store/useDashboardStore";
import { HiUsers } from "react-icons/hi2";

const groupBy = (arr, key) =>
  arr.reduce((acc, cur) => {
    const k = cur[key] || "Unknown";
    acc[k] = acc[k] ? [...acc[k], cur] : [cur];
    return acc;
  }, {});

export default function DemographicModal({ isOpen, onRequestClose, loading }) {
  const { attendanceDetails } = useDashboardStore();

  const genderGroups = useMemo(
    () => groupBy(attendanceDetails, "gender"),
    [attendanceDetails]
  );
  const ageGroups = useMemo(
    () => groupBy(attendanceDetails, "ageRange"),
    [attendanceDetails]
  );

  const modalFx = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, scale: 0.85, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <BaseModal isOpen={isOpen} onClose={onRequestClose}>
          <motion.div
            variants={modalFx}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="w-[90vw] max-w-3xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl dark:shadow-gray-900/20 flex flex-col overflow-hidden border border-gray-100 dark:border-gray-800"
          >
            {/* Header */}
            <header className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
              <div className="flex items-center gap-3">
                <HiUsers className="text-xl text-blue-600 dark:text-blue-400" />
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Employee Demographics
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

            {/* Body */}
            {loading ? (
              <div className="flex-1 flex items-center justify-center bg-gray-50/30 dark:bg-gray-800/30">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
                  <span>Loading demographics...</span>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-6 space-y-10 bg-gray-50/30 dark:bg-gray-900/50">
                <DemographicSection title="By Gender" data={genderGroups} />
                <DemographicSection title="By Age Range" data={ageGroups} />
              </div>
            )}
          </motion.div>
        </BaseModal>
      )}
    </AnimatePresence>
  );
}

function DemographicSection({ title, data }) {
  return (
    <section>
      <h3 className="font-semibold mb-4 text-gray-900 dark:text-white text-base">
        {title}
      </h3>
      <div className="space-y-3">
        {Object.entries(data).map(([bucket, list]) => (
          <div
            key={bucket}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm dark:shadow-gray-900/10 border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-gray-900/20 transition-shadow duration-200"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <span className="font-medium text-gray-900 dark:text-white">
                {bucket}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full font-medium">
                {list.length}
              </span>
            </div>
            <ul className="max-h-40 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700 text-sm">
              {list.map((u) => (
                <li
                  key={u._id}
                  className="px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 flex justify-between"
                >
                  <span>
                    {u.first_Name} {u.last_Name}
                  </span>
                  {/* DOB – formatted DD‑MMM‑YYYY */}
                  {u.dob && (
                    <span className="text-xs text-blue-600 dark:text-blue-400 whitespace-nowrap">
                      {new Date(u.dob).toLocaleDateString(undefined, {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  )}
                  {u.age !== null && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {u.age} yrs
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
