

import React from "react";
import BaseModal from "../../common/BaseModal";
import { FaTimes, FaCalendarAlt, FaChartLine, FaComment } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { BiTargetLock } from "react-icons/bi";
import { IoMdTime } from "react-icons/io";
import { BsCalendarWeek, BsCalendarMonth } from "react-icons/bs";

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
      <div className="relative bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg shadow-2xl w-full max-w-4xl h-[90vh] overflow-hidden flex flex-col transition-all duration-300 ease-in-out border border-gray-200 dark:border-gray-700">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-900 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 bg-black/20 hover:bg-black/30 p-2 rounded-full transition-all duration-200"
            aria-label="Close"
          >
            <FaTimes size={18} />
          </button>
          
          <div className="flex items-center space-x-4">
            {selectedEmployee.user_Avatar ? (
              <img
                src={selectedEmployee.user_Avatar}
                alt="Employee"
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-lg"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-2xl font-bold text-gray-600 dark:text-gray-300">
                {selectedEmployee.first_Name?.[0]}{selectedEmployee.last_Name?.[0]}
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold text-white">
                Rate Performance
              </h3>
              <p className="text-white/80">
                {selectedEmployee.first_Name} {selectedEmployee.last_Name} • {selectedEmployee.designation}
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Time period selection */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 mb-6 shadow-sm">
            <h4 className="text-lg font-medium mb-4 flex items-center">
              <IoMdTime className="mr-2 text-indigo-500 dark:text-indigo-400" />
              Rating Period
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Frequency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rating Frequency</label>
                <div className="relative">
                  <select
                    className="w-full pl-3 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-indigo-500 appearance-none text-sm transition-all duration-200"
                    value={frequency}
                    onChange={handleFrequencyChange}
                  >
                    {FREQUENCIES.map((freq) => (
                      <option key={freq} value={freq} className="py-1">
                        {freq.charAt(0).toUpperCase() + freq.slice(1)}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
                    <HiOutlineDocumentReport size={18} />
                  </div>
                </div>
              </div>

              {/* DAILY */}
              {frequency === "daily" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full pl-3 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-indigo-500 text-sm transition-all duration-200"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
                      <FaCalendarAlt size={16} />
                    </div>
                  </div>
                </div>
              )}

              {/* WEEKLY */}
              {frequency === "weekly" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label>
                    <div className="relative">
                      <input
                        type="number"
                        className="w-full pl-3 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-indigo-500 text-sm transition-all duration-200"
                        placeholder="2025"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
                        <FaCalendarAlt size={16} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Month</label>
                    <div className="relative">
                      <select
                        className="w-full pl-3 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-indigo-500 appearance-none text-sm transition-all duration-200"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                      >
                        <option value="">Select Month</option>
                        {[...Array(12)].map((_, i) => {
                          const m = i + 1;
                          const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                          return (
                            <option key={m} value={String(m).padStart(2, "0")}>
                              {monthNames[i]}
                            </option>
                          );
                        })}
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
                        <BsCalendarMonth size={16} />
                      </div>
                    </div>
                  </div>

                  {year && month && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Week in {month}/{year}
                      </label>
                      <div className="relative">
                        <select
                          className="w-full pl-3 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-indigo-500 appearance-none text-sm transition-all duration-200"
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
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
                          <BsCalendarWeek size={16} />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* MONTHLY */}
              {frequency === "monthly" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label>
                    <div className="relative">
                      <input
                        type="number"
                        className="w-full pl-3 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-indigo-500 text-sm transition-all duration-200"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="2025"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
                        <FaCalendarAlt size={16} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Month</label>
                    <div className="relative">
                      <select
                        className="w-full pl-3 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-indigo-500 appearance-none text-sm transition-all duration-200"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                      >
                        <option value="">Select Month</option>
                        {[...Array(12)].map((_, i) => {
                          const m = i + 1;
                          const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                          return (
                            <option key={m} value={String(m).padStart(2, "0")}>
                              {monthNames[i]}
                            </option>
                          );
                        })}
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
                        <BsCalendarMonth size={16} />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* YEARLY */}
              {frequency === "yearly" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label>
                  <div className="relative">
                    <input
                      type="number"
                      className="w-full pl-3 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-indigo-500 text-sm transition-all duration-200"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="2025"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
                      <FaCalendarAlt size={16} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* KPI Rows */}
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-4 flex items-center">
              <FaChartLine className="mr-2 text-indigo-500 dark:text-indigo-400" />
              Key Performance Indicators
            </h4>
            
            {kpis.length === 0 ? (
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6 text-center">
                <div className="text-gray-400 dark:text-gray-500 mb-2">
                  <BiTargetLock size={40} className="mx-auto" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  No KPIs found for this rating set.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {kpis.map((k, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-900/50 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-800 transition-all hover:shadow-md"
                  >
                    <div className="flex flex-wrap justify-between items-start mb-2">
                      <div className="max-w-[70%]">
                        <h5 className="font-medium text-gray-900 dark:text-gray-100">{k.kpiName}</h5>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {k.type === "quantitative" ? (
                            <div className="flex items-center flex-wrap gap-2">
                              <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 px-2 py-0.5 rounded text-xs">
                                Quantitative
                              </span>
                              <span>
                                Target: <span className="font-medium">{k.target}</span> 
                              </span>
                              <span>
                                Max: <span className="font-medium">{k.marks}</span>
                              </span>
                              {k.target > 0 && (
                                <span className="italic">
                                  1 unit = {(k.marks / k.target).toFixed(2)} pts
                                </span>
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-0.5 rounded text-xs">
                                Qualitative
                              </span>
                              <span>
                                Max: <span className="font-medium">{k.marks}</span>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {k.type === "quantitative" && (
                        <div className="mt-1 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                          Score: {k.score || 0}/{k.marks}
                        </div>
                      )}
                      
                      {k.type !== "quantitative" && (
                        <div className="mt-1 bg-purple-50 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                          Score: {k.score || 0}/{k.marks}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      {k.type === "quantitative" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Achieved</label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-indigo-500 text-sm transition-all duration-200"
                            value={k.achieved || 0}
                            onChange={(e) => handleAchievedChange(i, e.target.value)}
                          />
                        </div>
                      )}
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Score</label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-indigo-500 text-sm transition-all duration-200"
                          value={k.score || 0}
                          onChange={(e) => handleScoreChange(i, e.target.value)}
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Comment</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-indigo-500 text-sm transition-all duration-200"
                          value={k.comment}
                          placeholder="Additional feedback on this KPI..."
                          onChange={(e) => handleCommentChange(i, e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Overall comment */}
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-4 flex items-center">
              <FaComment className="mr-2 text-indigo-500 dark:text-indigo-400" />
              Overall Assessment
            </h4>
            
            <textarea
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-indigo-500 text-sm transition-all duration-200"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="Provide overall feedback about the employee's performance..."
            />
          </div>
        </div>

        {/* Footer with actions */}
        <div className="bg-gray-50 dark:bg-gray-900/50 p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Score</div>
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {totalScore}
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg transition-colors font-medium text-sm"
              >
                Cancel
              </button>
              
              <button
                onClick={handleSubmitRating}
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-medium text-sm flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}

export default RatingModal;