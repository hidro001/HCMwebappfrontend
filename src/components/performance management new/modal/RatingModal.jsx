

import React from "react";
import BaseModal from "../../common/BaseModal";

const FREQUENCIES = ["daily", "weekly", "monthly", "yearly"];

function RatingModal({
  showModal,
  onClose,
  selectedEmployee,

  frequency,
  handleFrequencyChange,
  date,
  setDate,
  year,
  setYear,
  month,
  setMonth,
  week,
  setWeek,
  availableWeeks,

  kpis,
  handleAchievedChange,
  handleScoreChange,
  handleCommentChange,
  comment,
  setComment,
  totalScore,
  handleSubmitRating,
}) {
  if (!showModal || !selectedEmployee) return null;

  return (
    <BaseModal isOpen={showModal} onClose={onClose}>
      {/* Make this parent container relative so the absolutely-positioned close button is anchored here */}
      <div className="relative bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded shadow-lg w-full max-w-2xl h-[90%] overflow-y-scroll">
        {/* Absolute “×” button in the top-right corner */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 z-10"
        >
          &times;
        </button>

        {/* Modal content (scrollable area) */}
        <div className="p-6">
          <h3 className="text-lg font-bold mb-4">
            Rate {selectedEmployee.first_Name} {selectedEmployee.last_Name}
          </h3>

          {/* Frequency */}
          <div className="mb-2">
            <label className="block font-medium mb-1">Frequency</label>
            <select
              className="border border-gray-300 dark:border-gray-600 p-2 w-full rounded bg-white dark:bg-gray-900"
              value={frequency}
              onChange={handleFrequencyChange}
            >
              {FREQUENCIES.map((freq) => (
                <option key={freq} value={freq}>
                  {freq}
                </option>
              ))}
            </select>
          </div>

          {/* DAILY */}
          {frequency === "daily" && (
            <div className="mb-2">
              <label className="block font-medium mb-1">Date</label>
              <input
                type="date"
                className="border border-gray-300 dark:border-gray-600 p-2 w-full rounded bg-white dark:bg-gray-900"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          )}

          {/* WEEKLY */}
          {frequency === "weekly" && (
            <>
              <div className="mb-2">
                <label className="block font-medium mb-1">Year</label>
                <input
                  type="number"
                  className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full bg-white dark:bg-gray-900"
                  placeholder="2025"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label className="block font-medium mb-1">Month</label>
                <select
                  className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full bg-white dark:bg-gray-900"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  <option value="">Select Month</option>
                  {[...Array(12)].map((_, i) => {
                    const m = i + 1;
                    return (
                      <option key={m} value={String(m).padStart(2, "0")}>
                        {m}
                      </option>
                    );
                  })}
                </select>
              </div>

              {year && month && (
                <div className="mb-2">
                  <label className="block font-medium mb-1">
                    Week in {month}/{year}
                  </label>
                  <select
                    className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full bg-white dark:bg-gray-900"
                    value={week}
                    onChange={(e) => setWeek(e.target.value)}
                  >
                    <option value="">Select Week</option>
                    {availableWeeks.map((wObj) => (
                      <option key={wObj.value} value={wObj.value}>
                        {wObj.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </>
          )}

          {/* MONTHLY */}
          {frequency === "monthly" && (
            <div className="flex space-x-2 mb-2">
              <div className="flex-1">
                <label className="block font-medium mb-1">Year</label>
                <input
                  type="number"
                  className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full bg-white dark:bg-gray-900"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="2025"
                />
              </div>
              <div className="flex-1">
                <label className="block font-medium mb-1">Month</label>
                <select
                  className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full bg-white dark:bg-gray-900"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  <option value="">Select Month</option>
                  {[...Array(12)].map((_, i) => {
                    const m = i + 1;
                    return (
                      <option key={m} value={String(m).padStart(2, "0")}>
                        {m}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          )}

          {/* YEARLY */}
          {frequency === "yearly" && (
            <div className="mb-2">
              <label className="block font-medium mb-1">Year</label>
              <input
                type="number"
                className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full bg-white dark:bg-gray-900"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2025"
              />
            </div>
          )}

          {/* KPI Rows */}
          <div className="mt-4">
            {kpis.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No KPIs found for this set.
              </p>
            ) : (
              kpis.map((k, i) => (
                <div
                  key={i}
                  className="flex flex-col space-y-1 my-3 border-b border-gray-200 dark:border-gray-700 pb-2"
                >
                  <div className="font-medium">{k.kpiName}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {k.type === "quantitative" ? (
                      <>
                        Target: {k.target} | Max: {k.marks}
                        {k.target > 0 && (
                          <>
                            {" "}
                            |{" "}
                            <span className="italic">
                              1 unit = {(k.marks / k.target).toFixed(2)} pts
                            </span>
                          </>
                        )}
                      </>
                    ) : (
                      <>Max: {k.marks}</>
                    )}
                  </div>

                  {k.type === "quantitative" && (
                    <>
                      <label className="block text-sm mt-1">
                        Achieved:
                        <input
                          type="number"
                          className="border border-gray-300 dark:border-gray-600 rounded p-1 ml-2 w-24 bg-white dark:bg-gray-900"
                          value={k.achieved || 0}
                          onChange={(e) =>
                            handleAchievedChange(i, e.target.value)
                          }
                        />
                      </label>
                      <label className="block text-sm mt-1">
                        Score:
                        <input
                          type="number"
                          className="border border-gray-300 dark:border-gray-600 rounded p-1 ml-2 w-24 bg-white dark:bg-gray-900"
                          value={k.score || 0}
                          onChange={(e) =>
                            handleScoreChange(i, e.target.value)
                          }
                        />
                      </label>
                      <label className="block text-sm mt-1">
                        Comment:
                        <input
                          type="text"
                          className="border border-gray-300 dark:border-gray-600 rounded p-1 ml-2 w-40 bg-white dark:bg-gray-900"
                          value={k.comment}
                          onChange={(e) =>
                            handleCommentChange(i, e.target.value)
                          }
                        />
                      </label>
                    </>
                  )}

                  {k.type !== "quantitative" && (
                    <>
                      <label className="block text-sm mt-1">
                        Score:
                        <input
                          type="number"
                          className="border border-gray-300 dark:border-gray-600 rounded p-1 ml-2 w-24 bg-white dark:bg-gray-900"
                          value={k.score || 0}
                          onChange={(e) =>
                            handleScoreChange(i, e.target.value)
                          }
                        />
                      </label>
                      <label className="block text-sm mt-1">
                        Comment:
                        <input
                          type="text"
                          className="border border-gray-300 dark:border-gray-600 rounded p-1 ml-2 w-40 bg-white dark:bg-gray-900"
                          value={k.comment}
                          onChange={(e) =>
                            handleCommentChange(i, e.target.value)
                          }
                        />
                      </label>
                    </>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Overall comment */}
          <div className="mt-4">
            <label className="block font-medium mb-1">Overall Comment</label>
            <textarea
              className="border border-gray-300 dark:border-gray-600 p-2 w-full rounded bg-white dark:bg-gray-900"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          {/* Submit */}
          <div className="mt-4 flex justify-between items-center">
            <p className="font-semibold">
              Total Score:{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                {totalScore}
              </span>
            </p>
            <button
              onClick={handleSubmitRating}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
            >
              Submit Rating
            </button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}

export default RatingModal;
