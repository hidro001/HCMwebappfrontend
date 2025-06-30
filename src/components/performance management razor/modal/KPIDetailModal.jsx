import React from "react";
import BaseModal from "../../common/BaseModal";
import { FiX, FiTarget, FiCheckCircle, FiMessageSquare } from "react-icons/fi";
import { motion } from "framer-motion";

function KPIDetailModal({
  showModal,
  selectedPeriod,
  rawRating,
  onClose,
  renderPeriod,
  getScoreColor,
}) {
  if (!showModal || !selectedPeriod) return null;

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  // Destructure aggregated summary and maxScore
  const {
    summary: { totalScore, percentOfTarget, category },
    maxScore,
  } = selectedPeriod;

  // If rawRating is an array of aggregated per‐KPI entries (weekly/monthly/yearly)
  const isAggregatedMode =
    Array.isArray(rawRating) &&
    rawRating.every(
      (k) => k.kpiName && (k.targetSum !== undefined || k.marksSum !== undefined)
    );

  // If rawRating is a single daily document (has a date + kpis array)
  const isDailyDoc = rawRating && rawRating.date && rawRating.kpis;

  // Determine the percentage (0-100) based on totalScore/maxScore.
  // Fallback to 0 if maxScore is 0 (shouldn’t happen in valid data).
  const pct = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
  const pctRounded = Math.round(pct * 10) / 10; // e.g. 54.6

  // Determine text color classes and label based on pctRounded
  let performanceColor = "text-red-500";
  let performanceLabel = "Needs Improvement";

  if (pctRounded >= 80) {
    performanceColor = "text-emerald-500";
    performanceLabel = "Excellent";
  } else if (pctRounded >= 60) {
    performanceColor = "text-blue-500";
    performanceLabel = "Good";
  } else if (pctRounded >= 40) {
    performanceColor = "text-yellow-500";
    performanceLabel = "Average";
  } // else stays as "Needs Improvement" / red

  return (
    <BaseModal isOpen={showModal} onClose={onClose}>
      <motion.div
        className="relative overflow-auto bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-xl mx-auto h-[90%]
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
          transition-colors duration-300"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* ――― Header ――― */}
        <div className="px-8 py-5 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-xl font-semibold tracking-tight text-gray-800 dark:text-white">
            Performance Analysis
          </h3>
          <span className="px-4 py-1.5 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
            {renderPeriod(selectedPeriod)}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200 focus:outline-none"
            aria-label="Close"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* ――― Body ――― */}
        <div className="p-8">
          {/* --- 1) Aggregated “Total Score” Panel --- */}
          <div className="flex items-center justify-between mb-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Avg Score (%) out of 100
              </h4>
              {/* <div className="mt-2 flex items-baseline">
                <span
                  className={`text-3xl font-bold ${performanceColor}`}
                >
                  {totalScore.toFixed(1)}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-lg ml-2">
                  / {maxScore}
                </span>

                
              </div> */}

                <div className={`font-semibold ${getScoreColor(pctRounded)}`}>
    {pctRounded.toFixed(1)}%
  </div>
            </div>
            <div className="text-right">
              <div className={`text-xl font-semibold ${performanceColor}`}>
                {performanceLabel}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {category}
              </div>
            </div>
          </div>

          {/* --- 2) Overall “Manager Feedback” (only if it’s a daily doc) --- */}
          {isDailyDoc && rawRating.comment?.trim() && (
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
                  <p
                    className="mt-2 max-h-24 overflow-y-auto text-gray-600 dark:text-gray-400 text-sm p-1
                      [&::-webkit-scrollbar]:w-2
                      [&::-webkit-scrollbar-track]:rounded-full
                      [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                      [&::-webkit-scrollbar-thumb]:rounded-full
                      [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
                      transition-colors duration-300"
                  >
                    {rawRating.comment}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ――― 3) KPI List ――― */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h4 className="font-medium text-gray-700 dark:text-gray-300">
                Key Performance Indicators
              </h4>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-3 py-1.5 rounded-md">
                {isAggregatedMode
                  ? rawRating.length + " KPIs"
                  : isDailyDoc
                  ? rawRating.kpis.length + " KPIs"
                  : "0 KPIs"}
              </span>
            </div>

            {/* ――― Aggregated (weekly/monthly/yearly) mode ――― */}
            {isAggregatedMode ? (
              <div
                className="space-y-4 h-[80%] overflow-y-auto pr-2 
                  [&::-webkit-scrollbar]:w-2
                  [&::-webkit-scrollbar-track]:rounded-full
                  [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                  [&::-webkit-scrollbar-thumb]:rounded-full
                  [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
                  transition-colors duration-300"
              >
                {rawRating.map((aggKpi, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    {/* KPI Header */}
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center text-gray-800 dark:text-white font-medium">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-sm mr-4">
                          {idx + 1}
                        </div>
                        {aggKpi.kpiName || "Unnamed KPI"}
                      </div>
                      <div className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">
                        {aggKpi.type === "quantitative"
                          ? ((aggKpi.targetSum > 0
                              ? (aggKpi.achievedSum / aggKpi.targetSum) * 100
                              : 0
                            ).toFixed(1) +
                            "%")
                          : ((aggKpi.marksSum > 0
                              ? (aggKpi.scoreSum / aggKpi.marksSum) * 100
                              : 0
                            ).toFixed(1) +
                            "%")}
                      </div>
                    </div>

                    {/* KPI Details for aggregated sums */}
                    <div className="p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
                      <DetailRow
                        icon={<FiTarget />}
                        label="Type"
                        value={
                          aggKpi.type === "quantitative"
                            ? "Quantitative"
                            : "Qualitative"
                        }
                      />

                      {aggKpi.type === "quantitative" ? (
                        <>
                          <DetailRow
                            icon={<FiTarget />}
                            label="Total Target"
                            value={aggKpi.targetSum}
                          />
                          <DetailRow
                            icon={<FiCheckCircle />}
                            label="Total Achieved"
                            value={aggKpi.achievedSum}
                          />
                        </>
                      ) : (
                        <>
                          <DetailRow
                            icon={<FiTarget />}
                            label="Total Marks"
                            value={aggKpi.marksSum}
                          />
                          <DetailRow
                            icon={<FiCheckCircle />}
                            label="Total Score"
                            value={aggKpi.scoreSum}
                          />
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* ――― Daily‐doc (non‐aggregated) mode ――― */
              <>
                {!isDailyDoc || rawRating.kpis.length === 0 ? (
                  <div className="flex items-center justify-center p-8 text-gray-500 dark:text-gray-400 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                    <p>No KPIs recorded for this period.</p>
                  </div>
                ) : (
                  <div
                    className="space-y-4 max-h-80 overflow-y-auto pr-2
                      [&::-webkit-scrollbar]:w-2
                      [&::-webkit-scrollbar-track]:rounded-full
                      [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                      [&::-webkit-scrollbar-thumb]:rounded-full
                      [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
                      transition-colors duration-300"
                  >
                    {rawRating.kpis.map((kpi, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        className="bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                      >
                        {/* KPI Header */}
                        <div className="flex items-center justify-between p-4">
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
                        <div className="p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
                          <DetailRow
                            icon={<FiTarget />}
                            label="Type"
                            value={kpi.type || "-"}
                          />
                          {kpi.type === "quantitative" && (
                            <>
                              <DetailRow
                                icon={<FiTarget />}
                                label="Target"
                                value={kpi.target ?? "-"}
                              />
                              <DetailRow
                                icon={<FiCheckCircle />}
                                label="Achieved"
                                value={kpi.achieved ?? "-"}
                              />
                            </>
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
              </>
            )}
          </div>
        </div>

        {/* ――― Footer ――― */}
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
      <div className="flex gap-3 items-center dark:bg-gray-700">
        <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
        <span className="text-gray-500 dark:text-gray-950">:</span>
        <div className="text-base text-gray-800 dark:text-gray-300">{value}</div>
      </div>
    </div>
  );
}

export default KPIDetailModal;
