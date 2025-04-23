

import React from "react";
import BaseModal from "../../common/BaseModal";
import {
  FiX,
  FiTarget,
  FiCheckCircle,
  FiMessageSquare,
} from "react-icons/fi";
import { motion } from "framer-motion";

function KPIDetailModal({
  showModal,
  selectedRating,
  onClose,
  renderPeriod,
}) {
  if (!showModal || !selectedRating) return null;

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <BaseModal isOpen={showModal} onClose={onClose}>
      <motion.div
        className="relative overflow-hidden bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-xl mx-auto"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Header */}
        <div className="px-8 py-5 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-xl font-semibold tracking-tight text-gray-800 dark:text-white">
            Performance Analysis
          </h3>
          <span className="px-4 py-1.5 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50">
            {renderPeriod(selectedRating)}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200 focus:outline-none"
            aria-label="Close"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8">
          {/* Total Score */}
          <div className="flex items-center justify-between mb-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">TOTAL SCORE</h4>
              <div className="mt-2 flex items-baseline">
                <span
                  className={`text-3xl font-bold ${
                    selectedRating.totalScore >= 80
                      ? "text-emerald-500"
                      : selectedRating.totalScore >= 60
                      ? "text-blue-500"
                      : selectedRating.totalScore >= 40
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {selectedRating.totalScore.toFixed(1)}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-lg ml-2">/ 100</span>
              </div>
            </div>
            <div className="text-right">
              <div
                className={`text-xl font-semibold ${
                  selectedRating.totalScore >= 80
                    ? "text-emerald-500"
                    : selectedRating.totalScore >= 60
                    ? "text-blue-500"
                    : selectedRating.totalScore >= 40
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {selectedRating.totalScore >= 80
                  ? "Excellent"
                  : selectedRating.totalScore >= 60
                  ? "Good"
                  : selectedRating.totalScore >= 40
                  ? "Average"
                  : "Needs Improvement"}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Rating</div>
            </div>
          </div>

          {/* Manager Feedback */}
          {selectedRating.comment && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start">
                <FiMessageSquare className="w-5 h-5 text-blue-500 mr-2" />
                <div className="w-full">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Manager Feedback
                  </h4>
                  <p className="mt-2 max-h-24 overflow-y-auto text-gray-600 dark:text-gray-400 text-sm">
                    {selectedRating.comment}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* KPI List */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h4 className="font-medium text-gray-700 dark:text-gray-300">
                Key Performance Indicators
              </h4>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-3 py-1.5 rounded-md">
                {selectedRating.kpis?.length || 0} KPIs
              </span>
            </div>

            {(!selectedRating.kpis || !selectedRating.kpis.length) ? (
              <div className="flex items-center justify-center p-8 text-gray-500 dark:text-gray-400 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                <p>No KPIs recorded for this period.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-80 overflow-y-auto pr-2 ">
                {selectedRating.kpis.map((kpi, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    {/* KPI Header */}
                    <div className="flex items-center justify-between p-4 ">
                      <div className="flex items-center text-gray-800 dark:text-white font-medium">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-sm mr-4">
                          {idx + 1}
                        </div>
                        {kpi.kpiName || "Unnamed KPI"}
                      </div>
                      <div className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">
                        {typeof kpi.score === "number"
                          ? kpi.score.toFixed(1)
                          : "0"}{" "}
                        / {kpi.marks || "0"}
                      </div>
                    </div>

                    {/* KPI Details */}
                    <div className="p-4 space-y-4 bg-gray-50 dark:bg-gray-800  ">
                      <DetailRow icon={<FiTarget />} label="Type" value={kpi.type} />
                      {kpi.target !== undefined && (
                        <DetailRow icon={<FiTarget />} label="Target" value={kpi.target} />
                      )}
                      {kpi.achieved !== undefined && (
                        <DetailRow icon={<FiCheckCircle />} label="Achieved" value={kpi.achieved} />
                      )}
                    </div>

                    {/* KPI Comment */}
                    {kpi.comment?.trim() && (
                      <div className="p-4 bg-gray-200 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700">
                        <div className="flex items-start">
                          <FiMessageSquare className="w-4 h-4 text-gray-500 mr-2" />
                          <p className="max-h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 dark:scrollbar-thumb-gray-600 text-sm text-gray-600 dark:text-gray-400">
                            {kpi.comment}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-gray-100 dark:bg-gray-800 flex justify-end border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
          >
            Close
          </button>
        </div>
      </motion.div>
    </BaseModal>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-center dark:bg-gray-700 p-2 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex-shrink-0 mr-4">
        <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-700 dark:text-white">
          {icon}
        </div>
      </div>
      <div className="flex gap-3 items-center dark:bg-gray-700 ">
        <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
        <span className="text-gray-500 dark:text-gray-950">:</span>
        <div className="text-base text-gray-800 dark:text-gray-300">{value}</div>
      </div>
    </div>
  );
}

export default KPIDetailModal;
