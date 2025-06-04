

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import useRatingStore from "../../store/useRatingNewStore";

// If you have department & designation store
import useDepartmentStore from "../../store/departmentStore";
import useDesignationStore from "../../store/designationStore";

import { getWeeksInMonth } from "./calendarUtils";
import {
  FiFilter,
  FiSearch,
  FiBarChart2,
  FiEye,
} from "react-icons/fi";
import { IoAnalyticsOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import {
  BsCalendar3Week,
  BsCalendar2Month,
  BsCalendar2Range,
} from "react-icons/bs";

const FREQUENCIES = [
  { value: "daily",   label: "Daily",   icon: <MdOutlineDateRange className="text-lg" /> },
  { value: "weekly",  label: "Weekly",  icon: <BsCalendar3Week   className="text-lg" /> },
  { value: "monthly", label: "Monthly", icon: <BsCalendar2Month  className="text-lg" /> },
  { value: "yearly",  label: "Yearly",  icon: <BsCalendar2Range  className="text-lg" /> },
];

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

function TeamRatingsAdvanced() {
  const { getTeamRatingsAdvancedAggregated, loading, error } = useRatingStore();

  // If you have additional stores for departments/designations:
  const { departments, fetchDepartments, loading: deptLoading, error: deptError } = useDepartmentStore();
  const { designations, fetchDesignations, loading: desigLoading, error: desigError } = useDesignationStore();

  // Frequency-based states
  const [frequency,    setFrequency]    = useState("daily");
  const [startDate,    setStartDate]    = useState("");
  const [endDate,      setEndDate]      = useState("");
  const [startYear,    setStartYear]    = useState("");
  const [endYear,      setEndYear]      = useState("");
  const [startMonth,   setStartMonth]   = useState("");
  const [endMonth,     setEndMonth]     = useState("");
  const [startWeek,    setStartWeek]    = useState("");
  const [endWeek,      setEndWeek]      = useState("");
  const [startWeeks,   setStartWeeks]   = useState([]);
  const [endWeeks,     setEndWeeks]     = useState([]);

  // Additional filters
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [sortBy,   setSortBy]   = useState("scoreDesc");  // "scoreAsc","nameAsc","nameDesc", etc.
  const [limit,    setLimit]    = useState("");           // optional numeric

  const [teamData, setTeamData] = useState([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);

  //========================
  // Load data for department/designation
  //========================
  useEffect(() => {
    fetchDepartments();
    fetchDesignations();
  }, [fetchDepartments, fetchDesignations]);

  //========================
  // On frequency change, reset date fields
  //========================
  useEffect(() => {
    const today = new Date();
    const isoToday = today.toISOString().split("T")[0];
    const y = today.getFullYear();
    const m = today.getMonth() + 1;

    switch (frequency) {
      case "daily":
        setStartDate(isoToday);
        setEndDate(isoToday);
        setStartYear("");
        setEndYear("");
        setStartMonth("");
        setEndMonth("");
        setStartWeek("");
        setEndWeek("");
        setStartWeeks([]);
        setEndWeeks([]);
        break;
      case "weekly":
        setStartYear(String(y));
        setEndYear(String(y));
        setStartMonth(String(m).padStart(2, "0"));
        setEndMonth(String(m).padStart(2, "0"));
        setStartWeek("");
        setEndWeek("");
        setStartDate("");
        setEndDate("");
        break;
      case "monthly":
        setStartYear(String(y));
        setEndYear(String(y));
        setStartMonth(String(m).padStart(2, "0"));
        setEndMonth(String(m).padStart(2, "0"));
        setStartWeek("");
        setEndWeek("");
        setStartDate("");
        setEndDate("");
        setStartWeeks([]);
        setEndWeeks([]);
        break;
      case "yearly":
        setStartYear(String(y));
        setEndYear(String(y));
        setStartMonth("");
        setEndMonth("");
        setStartWeek("");
        setEndWeek("");
        setStartDate("");
        setEndDate("");
        setStartWeeks([]);
        setEndWeeks([]);
        break;
      default:
        break;
    }
  }, [frequency]);

  //========================
  // Recalc startWeeks if weekly
  //========================
  useEffect(() => {
    if (frequency !== "weekly") return;
    if (startYear && startMonth) {
      const yy = parseInt(startYear, 10);
      const mm = parseInt(startMonth, 10) - 1;
      if (yy >= 0 && mm >= 0) {
        const weeksArr = getWeeksInMonth(yy, mm);
        setStartWeeks(weeksArr);
        // If current startWeek is invalid or empty => pick first
        if (!startWeek || !weeksArr.find((x) => x.value === startWeek)) {
          setStartWeek(weeksArr[0]?.value || "");
        }
      } else {
        setStartWeeks([]);
      }
    } else {
      setStartWeeks([]);
    }
  }, [frequency, startYear, startMonth, startWeek]);

  //========================
  // Recalc endWeeks if weekly
  //========================
  useEffect(() => {
    if (frequency !== "weekly") return;
    if (endYear && endMonth) {
      const yy = parseInt(endYear, 10);
      const mm = parseInt(endMonth, 10) - 1;
      if (yy >= 0 && mm >= 0) {
        const weeksArr = getWeeksInMonth(yy, mm);
        setEndWeeks(weeksArr);
        if (!endWeek || !weeksArr.find((x) => x.value === endWeek)) {
          setEndWeek(weeksArr[0]?.value || "");
        }
      } else {
        setEndWeeks([]);
      }
    } else {
      setEndWeeks([]);
    }
  }, [frequency, endYear, endMonth, endWeek]);

  //========================
  // Fetch data
  //========================
  const handleFetchRatings = async () => {
    try {
      const params = { frequency };

      // if department/designation filters
      if (department)   params.department  = department;
      if (designation)  params.designation = designation;

      // if sortBy / limit
      if (sortBy)   params.sortBy = sortBy;
      if (limit)    params.limit  = limit;

      // daily
      if (frequency === "daily" && startDate && endDate) {
        params.startDate = startDate;
        params.endDate   = endDate;
      }
      // weekly
      if (
        frequency === "weekly" &&
        startYear && endYear && startMonth && endMonth &&
        startWeek && endWeek
      ) {
        params.startYear  = startYear;
        params.endYear    = endYear;
        params.startMonth = startMonth;
        params.endMonth   = endMonth;
        params.startWeek  = startWeek;
        params.endWeek    = endWeek;
      }
      // monthly
      if (
        frequency === "monthly" &&
        startYear && endYear && startMonth && endMonth
      ) {
        params.startYear  = startYear;
        params.endYear    = endYear;
        params.startMonth = startMonth;
        params.endMonth   = endMonth;
      }
      // yearly
      if (frequency === "yearly" && startYear && endYear) {
        params.startYear = startYear;
        params.endYear   = endYear;
      }

      const res = await getTeamRatingsAdvancedAggregated(params);
      if (res.success) {
        setTeamData(res.data);
      } else {
        toast.error(res.message || "Could not fetch data");
      }
    } catch (err) {
      toast.error(err.message || "Error fetching advanced ratings");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <IoAnalyticsOutline className="text-2xl text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Team Performance Analytics
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            {loading && (
              <div className="flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full"></div>
                Loading...
              </div>
            )}
            {error && (
              <div className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
                Error: {error}
              </div>
            )}
          </div>
        </div>

        {/* Filters Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <FiFilter className="text-indigo-600 dark:text-indigo-400" />
              <h3 className="font-semibold text-lg">Filter Options</h3>
            </div>
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none transition-transform duration-300"
            >
              <svg
                className={`w-5 h-5 transform ${isFiltersOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {isFiltersOpen && (
            <div className="p-5 space-y-6">
              {/* 1) Dept & Designation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Department */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Department (optional)
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option value="">-- All --</option>
                    {/* If you have a department array, map them here */}
                    {departments.map((d) => (
                      <option key={d._id} value={d.department}>
                        {d.department}
                      </option>
                    ))}
                    {/* <option value="Sales">Sales</option>
                    <option value="IT">IT</option> */}
                  </select>
                </div>

                {/* Designation */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Designation (optional)
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                  >
                    <option value="">-- All --</option>
                    {/* If you have a designation array, map them here */}
                    {designations.map((dg) => (
                      <option key={dg.id} value={dg.designation}>
                        {dg.designation}
                      </option>
                    ))}
                    {/* <option value="Manager">Manager</option>
                    <option value="Engineer">Engineer</option> */}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Sort By
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="scoreDesc">Score (desc)</option>
                    <option value="scoreAsc">Score (asc)</option>
                    <option value="nameAsc">Name (A-Z)</option>
                    <option value="nameDesc">Name (Z-A)</option>
                  </select>
                </div>
              </div>

              {/* 2) Limit (top 5, top 10, etc.) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Limit (optional)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="5 for top 5"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                  />
                </div>
              </div>

              {/* 3) Frequency Buttons */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Frequency
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {FREQUENCIES.map((freq) => (
                    <button
                      key={freq.value}
                      className={`
                        flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition
                        ${
                          frequency === freq.value
                            ? "border-indigo-600 bg-indigo-50 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-900/30 dark:text-indigo-300"
                            : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                        }
                      `}
                      onClick={() => setFrequency(freq.value)}
                    >
                      {freq.icon}
                      <span>{freq.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4) Frequency-specific date controls */}
              <div className="space-y-4">
                {/* daily */}
                {frequency === "daily" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {frequency === "weekly" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Start Year
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                          placeholder="2025"
                          value={startYear}
                          onChange={(e) => setStartYear(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Start Month
                        </label>
                        <select
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                          value={startMonth}
                          onChange={(e) => setStartMonth(e.target.value)}
                        >
                          <option value="">--</option>
                          {MONTHS.map((mName, idx) => {
                            const val = String(idx + 1).padStart(2, "0");
                            return (
                              <option key={val} value={val}>
                                {mName}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div>
                        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Start Week
                        </label>
                        <select
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                          value={startWeek}
                          onChange={(e) => setStartWeek(e.target.value)}
                        >
                          <option value="">Select Week</option>
                          {startWeeks.map((w) => (
                            <option key={w.value} value={w.value}>
                              {w.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                          End Year
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                          placeholder="2025"
                          value={endYear}
                          onChange={(e) => setEndYear(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                          End Month
                        </label>
                        <select
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                          value={endMonth}
                          onChange={(e) => setEndMonth(e.target.value)}
                        >
                          <option value="">--</option>
                          {MONTHS.map((mName, idx) => {
                            const val = String(idx + 1).padStart(2, "0");
                            return (
                              <option key={val} value={val}>
                                {mName}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div>
                        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                          End Week
                        </label>
                        <select
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                          value={endWeek}
                          onChange={(e) => setEndWeek(e.target.value)}
                        >
                          <option value="">Select Week</option>
                          {endWeeks.map((w) => (
                            <option key={w.value} value={w.value}>
                              {w.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {frequency === "monthly" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Start Year
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                          placeholder="2024"
                          value={startYear}
                          onChange={(e) => setStartYear(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Start Month
                        </label>
                        <select
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                          value={startMonth}
                          onChange={(e) => setStartMonth(e.target.value)}
                        >
                          <option value="">--</option>
                          {MONTHS.map((mName, idx) => {
                            const val = String(idx + 1).padStart(2, "0");
                            return (
                              <option key={val} value={val}>
                                {mName}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                          End Year
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                          placeholder="2025"
                          value={endYear}
                          onChange={(e) => setEndYear(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                          End Month
                        </label>
                        <select
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                          value={endMonth}
                          onChange={(e) => setEndMonth(e.target.value)}
                        >
                          <option value="">--</option>
                          {MONTHS.map((mName, idx) => {
                            const val = String(idx + 1).padStart(2, "0");
                            return (
                              <option key={val} value={val}>
                                {mName}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {frequency === "yearly" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Start Year
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                        placeholder="2023"
                        value={startYear}
                        onChange={(e) => setStartYear(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                        End Year
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                        placeholder="2025"
                        value={endYear}
                        onChange={(e) => setEndYear(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={handleFetchRatings}
                  className="flex items-center justify-center space-x-2 px-6 py-3 mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <FiSearch className="text-lg" />
                  <span>Generate Report</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden backdrop-blur-sm bg-opacity-95 dark:bg-opacity-90 transition-all duration-300">
          <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FiBarChart2 className="text-indigo-600 dark:text-indigo-400" />
              <h3 className="font-semibold text-lg">Team Performance</h3>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {teamData.length > 0
                ? `${teamData.length} team members found`
                : "No data available"}
            </div>
          </div>

          <div className="p-5">
            {teamData.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="p-6 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                  <FiBarChart2 className="text-4xl text-gray-400 dark:text-gray-500" />
                </div>
                <p className="text-lg text-gray-500 dark:text-gray-400 mb-2">
                  No performance data
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 max-w-md">
                  Select frequency and date range above to generate a performance report.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700/30 text-left text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">
                      <th className="px-6 py-4 rounded-l-lg">Employee</th>
                      <th className="px-6 py-4">Designation</th>
                      <th className="px-6 py-4 text-center">Rating Count</th>
                      <th className="px-6 py-4"> Avrage Score</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4 rounded-r-lg text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {teamData.map(({ employee, score, ratingCount, category }) => {
                      // Build query params for linking to their advanced page
                      const queryParams = new URLSearchParams({
                        frequency,
                        startDate,
                        endDate,
                        startYear,
                        endYear,
                        startMonth,
                        endMonth,
                        startWeek,
                        endWeek,
                      }).toString();

                      return (
                        <tr
                          key={employee._id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors duration-150"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <img
                                src={employee.user_Avatar || "/placeholder-avatar.jpg"}
                                alt={`${employee.first_Name} ${employee.last_Name}`}
                                className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow"
                                onError={(e) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src = "https://via.placeholder.com/40";
                                }}
                              />
                              <div>
                                <p className="font-semibold">{employee.first_Name} {employee.last_Name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {employee.employee_Id}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {employee.designation || "—"}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {ratingCount || 0}
                          </td>
                          <td className="px-6 py-4">
                            {score ? score.toFixed(2) : "0.00"}
                          </td>
                          <td className="px-6 py-4">
                            {category || "—"}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <Link
                              to={`/dashboard/employee-advanced-aggregate/${employee._id}?${queryParams}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center px-3 py-2 text-sm bg-green-500 hover:bg-green-600 text-white rounded transition-colors duration-200"
                            >
                              <FiEye className="mr-1" />
                              View
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamRatingsAdvanced;
