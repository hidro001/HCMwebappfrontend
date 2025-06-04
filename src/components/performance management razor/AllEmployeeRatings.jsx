

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Store calls
import useRatingStore from "../../store/useRatingNewStore";
import useDepartmentStore from "../../store/departmentStore";
import useDesignationStore from "../../store/designationStore";

import { getWeeksInMonth } from "./calendarUtils";
import { CiUser } from "react-icons/ci";
import {
  FiFilter,
  FiSearch,
  FiBarChart2,
  FiEye,
  FiUsers,
} from "react-icons/fi";
import { IoAnalyticsOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { BsCalendar3Week, BsCalendar2Month, BsCalendar2Range } from "react-icons/bs";

// Frequencies array with icons
const FREQUENCIES = [
  { value: "daily",   label: "Daily",   icon: <MdOutlineDateRange className="text-lg" /> },
  { value: "weekly",  label: "Weekly",  icon: <BsCalendar3Week   className="text-lg" /> },
  { value: "monthly", label: "Monthly", icon: <BsCalendar2Month  className="text-lg" /> },
  { value: "yearly",  label: "Yearly",  icon: <BsCalendar2Range  className="text-lg" /> },
];

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

function AllEmployeeRatings() {
  const navigate = useNavigate();

  // ======== STORES & ACTIONS ========
  const { 
    getOrgRatingsAdvancedAggregated, // your updated store method that calls /ratings/organization-advanced
    loading, 
    error 
  } = useRatingStore();
  const {
    departments,
    fetchDepartments,
    loading: deptLoading,
    error: deptError
  } = useDepartmentStore();
  const {
    designations,
    fetchDesignations,
    loading: desigLoading,
    error: desigError
  } = useDesignationStore();

  // ======== FREQUENCY & FILTER STATES ========
  const [frequency, setFrequency] = useState("daily");
  const [startDate, setStartDate] = useState("");
  const [endDate,   setEndDate]   = useState("");

  const [startYear,  setStartYear]  = useState("");
  const [endYear,    setEndYear]    = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [endMonth,   setEndMonth]   = useState("");
  const [startWeek,  setStartWeek]  = useState("");
  const [endWeek,    setEndWeek]    = useState("");

  // For populating start & end weeks in "weekly" frequency
  const [startAvailableWeeks, setStartAvailableWeeks] = useState([]);
  const [endAvailableWeeks,   setEndAvailableWeeks]   = useState([]);

  // ======== Additional filters ========
  const [department,   setDepartment]   = useState("");
  const [designation,  setDesignation]  = useState("");
  const [sortBy,       setSortBy]       = useState("scoreDesc"); // e.g. "scoreAsc", "nameAsc", etc.
  const [limit,        setLimit]        = useState("");          // optional numeric limit

  // ======== RESULT STATE ========
  const [orgData, setOrgData] = useState([]);

  // For toggling filter panel
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);

  // ======== LOAD DEPARTMENTS & DESIGNATIONS ========
  useEffect(() => {
    fetchDepartments();
    fetchDesignations();
  }, [fetchDepartments, fetchDesignations]);

  // ======== FREQUENCY CHANGES => RESET FIELDS ========
  useEffect(() => {
    const today = new Date();
    const isoToday = today.toISOString().split("T")[0];
    const y  = today.getFullYear();
    const mm = today.getMonth() + 1;

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
        setStartAvailableWeeks([]);
        setEndAvailableWeeks([]);
        break;

      case "weekly":
        setStartDate("");
        setEndDate("");
        setStartYear(String(y));
        setEndYear(String(y));
        setStartMonth(String(mm).padStart(2, "0"));
        setEndMonth(String(mm).padStart(2, "0"));
        setStartWeek("");
        setEndWeek("");
        break;

      case "monthly":
        setStartDate("");
        setEndDate("");
        setStartYear(String(y));
        setEndYear(String(y));
        setStartMonth(String(mm).padStart(2, "0"));
        setEndMonth(String(mm).padStart(2, "0"));
        setStartWeek("");
        setEndWeek("");
        setStartAvailableWeeks([]);
        setEndAvailableWeeks([]);
        break;

      case "yearly":
        setStartDate("");
        setEndDate("");
        setStartYear(String(y));
        setEndYear(String(y));
        setStartMonth("");
        setEndMonth("");
        setStartWeek("");
        setEndWeek("");
        setStartAvailableWeeks([]);
        setEndAvailableWeeks([]);
        break;

      default:
        break;
    }
  }, [frequency]);

  // ======== WEEKLY => recalc start weeks ========
  useEffect(() => {
    if (frequency !== "weekly") return;

    if (startYear && startMonth) {
      const y = parseInt(startYear, 10);
      const m = parseInt(startMonth, 10) - 1;
      if (y >= 0 && m >= 0) {
        const weeks = getWeeksInMonth(y, m);
        setStartAvailableWeeks(weeks);
        if (!startWeek || !weeks.find((w) => w.value === startWeek)) {
          setStartWeek(weeks[0]?.value || "");
        }
      } else {
        setStartAvailableWeeks([]);
      }
    } else {
      setStartAvailableWeeks([]);
    }
  }, [frequency, startYear, startMonth, startWeek]);

  // ======== WEEKLY => recalc end weeks ========
  useEffect(() => {
    if (frequency !== "weekly") return;

    if (endYear && endMonth) {
      const y = parseInt(endYear, 10);
      const m = parseInt(endMonth, 10) - 1;
      if (y >= 0 && m >= 0) {
        const weeks = getWeeksInMonth(y, m);
        setEndAvailableWeeks(weeks);
        if (!endWeek || !weeks.find((w) => w.value === endWeek)) {
          setEndWeek(weeks[0]?.value || "");
        }
      } else {
        setEndAvailableWeeks([]);
      }
    } else {
      setEndAvailableWeeks([]);
    }
  }, [frequency, endYear, endMonth, endWeek]);

  // ======== FETCH ORG RATINGS ========
  const handleFetchRatings = async () => {
    try {
      const params = { frequency };

      // Department & designation if present
      if (department)  params.department  = department;
      if (designation) params.designation = designation;

      // If you have sortBy & limit
      if (sortBy) params.sortBy = sortBy;   // e.g. "scoreDesc"
      if (limit)  params.limit  = limit;    // e.g. "5"

      // daily
      if (frequency === "daily" && startDate && endDate) {
        params.startDate = startDate;
        params.endDate   = endDate;
      }
      // weekly
      if (
        frequency === "weekly" &&
        startYear &&
        endYear &&
        startMonth &&
        endMonth &&
        startWeek &&
        endWeek
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
        startYear &&
        endYear &&
        startMonth &&
        endMonth
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

      const res = await getOrgRatingsAdvancedAggregated(params);
      if (res.success) {
        setOrgData(res.data); // array of { employee, filteredRatings, averageRating, ratingCount, category? }
        toast.success(`Found ${res.data.length} employees`);
      } else {
        toast.error(res.message || "Could not fetch organization ratings");
      }
    } catch (err) {
      toast.error(err?.message || "Error fetching org advanced ratings");
    }
  };

  // ======== View detail page (or open in new tab) ========
  const handleViewFullRating = (employeeId) => {
    // If you want to pass the current filters to that route:
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
      // optionally department, designation
    });
    // open new tab:
    window.open(
      `/dashboard/employee-advanced-aggregate/${employeeId}?${queryParams.toString()}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <IoAnalyticsOutline className="text-2xl text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Organization Performance Analytics
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            {loading && (
              <div className="flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
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

        {/* Filters Container */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <FiFilter className="text-indigo-600 dark:text-indigo-400" />
              <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                Filter Options
              </h3>
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
                ></path>
              </svg>
            </button>
          </div>

          {isFiltersOpen && (
            <div className="p-5 space-y-6">
              {/* Department & Designation Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Department */}
                <div>
                  <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Department
                  </label>
                  <select
                    className="
                      w-full px-4 py-3 rounded-lg border
                      border-gray-300 dark:border-gray-600
                      bg-white dark:bg-gray-900
                      text-gray-900 dark:text-gray-300
                      focus:outline-none focus:ring-2 focus:ring-indigo-500
                      dark:focus:ring-indigo-500
                    "
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option value="">-- All Departments --</option>
                    {departments.map((dept) => (
                      <option key={dept._id} value={dept.department}>
                        {dept.department}
                      </option>
                    ))}
                  </select>
                  {deptLoading && (
                    <p className="text-sm text-gray-400 mt-1">
                      Loading departments...
                    </p>
                  )}
                  {deptError && (
                    <p className="text-sm text-red-400 mt-1">
                      {deptError}
                    </p>
                  )}
                </div>

                {/* Designation */}
                <div>
                  <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Designation
                  </label>
                  <select
                    className="
                      w-full px-4 py-3 rounded-lg border
                      border-gray-300 dark:border-gray-600
                      bg-white dark:bg-gray-900
                      text-gray-900 dark:text-gray-300
                      focus:outline-none focus:ring-2 focus:ring-indigo-500
                      dark:focus:ring-indigo-500
                    "
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                  >
                    <option value="">-- All Designations --</option>
                    {designations.map((dsg) => (
                      <option key={dsg.id} value={dsg.designation}>
                        {dsg.designation}
                      </option>
                    ))}
                  </select>
                  {desigLoading && (
                    <p className="text-sm text-gray-400 mt-1">
                      Loading designations...
                    </p>
                  )}
                  {desigError && (
                    <p className="text-sm text-red-400 mt-1">
                      {desigError}
                    </p>
                  )}
                </div>

                {/* Sort By */}
                <div>
                  <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sort By
                  </label>
                  <select
                    className="
                      w-full px-4 py-3 rounded-lg border
                      border-gray-300 dark:border-gray-600
                      bg-white dark:bg-gray-900
                      text-gray-900 dark:text-gray-300
                      focus:outline-none focus:ring-2 focus:ring-indigo-500
                      dark:focus:ring-indigo-500
                    "
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="scoreDesc">Score (high to low)</option>
                    <option value="scoreAsc">Score (low to high)</option>
                    <option value="nameAsc">Name (A-Z)</option>
                    <option value="nameDesc">Name (Z-A)</option>
                  </select>
                </div>
              </div>

              {/* Limit (top 5, top 10, etc.) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Limit (optional)
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="
                      w-full px-4 py-3 rounded-lg border
                      border-gray-300 dark:border-gray-600
                      bg-white dark:bg-gray-900
                      text-gray-900 dark:text-gray-300
                      focus:outline-none focus:ring-2 focus:ring-indigo-500
                      dark:focus:ring-indigo-500
                    "
                    placeholder="e.g. 5 for top 5"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                  />
                </div>
              </div>

              {/* Frequency Buttons */}
              <div>
                <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
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

              {/* Frequency-Specific Inputs */}
              <div className="space-y-4">
                {frequency === "daily" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Start Date
                      </label>
                      <input
                        type="date"
                        className="
                          w-full px-4 py-3 rounded-lg border
                          border-gray-300 dark:border-gray-600
                          bg-white dark:bg-gray-900
                          text-gray-900 dark:text-gray-300
                          focus:outline-none focus:ring-2 focus:ring-indigo-500
                          dark:focus:ring-indigo-500
                        "
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        className="
                          w-full px-4 py-3 rounded-lg border
                          border-gray-300 dark:border-gray-600
                          bg-white dark:bg-gray-900
                          text-gray-900 dark:text-gray-300
                          focus:outline-none focus:ring-2 focus:ring-indigo-500
                          dark:focus:ring-indigo-500
                        "
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
                        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Start Year
                        </label>
                        <input
                          type="number"
                          className="
                            w-full px-4 py-3 rounded-lg border
                            border-gray-300 dark:border-gray-600
                            bg-white dark:bg-gray-900
                            text-gray-900 dark:text-gray-300
                            focus:outline-none focus:ring-2 focus:ring-indigo-500
                            dark:focus:ring-indigo-500
                          "
                          placeholder="2025"
                          value={startYear}
                          onChange={(e) => setStartYear(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Start Month
                        </label>
                        <select
                          className="
                            w-full px-4 py-3 rounded-lg border
                            border-gray-300 dark:border-gray-600
                            bg-white dark:bg-gray-900
                            text-gray-900 dark:text-gray-300
                            focus:outline-none focus:ring-2 focus:ring-indigo-500
                            dark:focus:ring-indigo-500
                          "
                          value={startMonth}
                          onChange={(e) => setStartMonth(e.target.value)}
                        >
                          <option value="">--</option>
                          {months.map((mName, idx) => {
                            const mVal = String(idx + 1).padStart(2, "0");
                            return (
                              <option key={mVal} value={mVal}>
                                {mName}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div>
                        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Start Week
                        </label>
                        <select
                          className="
                            w-full px-4 py-3 rounded-lg border
                            border-gray-300 dark:border-gray-600
                            bg-white dark:bg-gray-900
                            text-gray-900 dark:text-gray-300
                            focus:outline-none focus:ring-2 focus:ring-indigo-500
                            dark:focus:ring-indigo-500
                          "
                          value={startWeek}
                          onChange={(e) => setStartWeek(e.target.value)}
                        >
                          <option value="">Select Week</option>
                          {startAvailableWeeks.map((w) => (
                            <option key={w.value} value={w.value}>
                              {w.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                          End Year
                        </label>
                        <input
                          type="number"
                          className="
                            w-full px-4 py-3 rounded-lg border
                            border-gray-300 dark:border-gray-600
                            bg-white dark:bg-gray-900
                            text-gray-900 dark:text-gray-300
                            focus:outline-none focus:ring-2 focus:ring-indigo-500
                            dark:focus:ring-indigo-500
                          "
                          placeholder="2025"
                          value={endYear}
                          onChange={(e) => setEndYear(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                          End Month
                        </label>
                        <select
                          className="
                            w-full px-4 py-3 rounded-lg border
                            border-gray-300 dark:border-gray-600
                            bg-white dark:bg-gray-900
                            text-gray-900 dark:text-gray-300
                            focus:outline-none focus:ring-2 focus:ring-indigo-500
                            dark:focus:ring-indigo-500
                          "
                          value={endMonth}
                          onChange={(e) => setEndMonth(e.target.value)}
                        >
                          <option value="">--</option>
                          {months.map((mName, idx) => {
                            const mVal = String(idx + 1).padStart(2, "0");
                            return (
                              <option key={mVal} value={mVal}>
                                {mName}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div>
                        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                          End Week
                        </label>
                        <select
                          className="
                            w-full px-4 py-3 rounded-lg border
                            border-gray-300 dark:border-gray-600
                            bg-white dark:bg-gray-900
                            text-gray-900 dark:text-gray-300
                            focus:outline-none focus:ring-2 focus:ring-indigo-500
                            dark:focus:ring-indigo-500
                          "
                          value={endWeek}
                          onChange={(e) => setEndWeek(e.target.value)}
                        >
                          <option value="">Select Week</option>
                          {endAvailableWeeks.map((w) => (
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
                        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Start Year
                        </label>
                        <input
                          type="number"
                          className="
                            w-full px-4 py-3 rounded-lg border
                            border-gray-300 dark:border-gray-600
                            bg-white dark:bg-gray-900
                            text-gray-900 dark:text-gray-300
                            focus:outline-none focus:ring-2 focus:ring-indigo-500
                            dark:focus:ring-indigo-500
                          "
                          value={startYear}
                          onChange={(e) => setStartYear(e.target.value)}
                          placeholder="2024"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Start Month
                        </label>
                        <select
                          className="
                            w-full px-4 py-3 rounded-lg border
                            border-gray-300 dark:border-gray-600
                            bg-white dark:bg-gray-900
                            text-gray-900 dark:text-gray-300
                            focus:outline-none focus:ring-2 focus:ring-indigo-500
                            dark:focus:ring-indigo-500
                          "
                          value={startMonth}
                          onChange={(e) => setStartMonth(e.target.value)}
                        >
                          <option value="">--</option>
                          {months.map((mName, idx) => {
                            const mVal = String(idx + 1).padStart(2, "0");
                            return (
                              <option key={mVal} value={mVal}>
                                {mName}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                          End Year
                        </label>
                        <input
                          type="number"
                          className="
                            w-full px-4 py-3 rounded-lg border
                            border-gray-300 dark:border-gray-600
                            bg-white dark:bg-gray-900
                            text-gray-900 dark:text-gray-300
                            focus:outline-none focus:ring-2 focus:ring-indigo-500
                            dark:focus:ring-indigo-500
                          "
                          value={endYear}
                          onChange={(e) => setEndYear(e.target.value)}
                          placeholder="2025"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                          End Month
                        </label>
                        <select
                          className="
                            w-full px-4 py-3 rounded-lg border
                            border-gray-300 dark:border-gray-600
                            bg-white dark:bg-gray-900
                            text-gray-900 dark:text-gray-300
                            focus:outline-none focus:ring-2 focus:ring-indigo-500
                            dark:focus:ring-indigo-500
                          "
                          value={endMonth}
                          onChange={(e) => setEndMonth(e.target.value)}
                        >
                          <option value="">--</option>
                          {months.map((mName, idx) => {
                            const mVal = String(idx + 1).padStart(2, "0");
                            return (
                              <option key={mVal} value={mVal}>
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
                      <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Start Year
                      </label>
                      <input
                        type="number"
                        className="
                          w-full px-4 py-3 rounded-lg border
                          border-gray-300 dark:border-gray-600
                          bg-white dark:bg-gray-900
                          text-gray-900 dark:text-gray-300
                          focus:outline-none focus:ring-2 focus:ring-indigo-500
                          dark:focus:ring-indigo-500
                        "
                        value={startYear}
                        onChange={(e) => setStartYear(e.target.value)}
                        placeholder="2023"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                        End Year
                      </label>
                      <input
                        type="number"
                        className="
                          w-full px-4 py-3 rounded-lg border
                          border-gray-300 dark:border-gray-600
                          bg-white dark:bg-gray-900
                          text-gray-900 dark:text-gray-300
                          focus:outline-none focus:ring-2 focus:ring-indigo-500
                          dark:focus:ring-indigo-500
                        "
                        value={endYear}
                        onChange={(e) => setEndYear(e.target.value)}
                        placeholder="2025"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  onClick={handleFetchRatings}
                  className="
                    flex items-center justify-center px-6 py-3 space-x-2
                    bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700
                    text-white rounded-lg font-medium transition-all duration-300
                    shadow-md hover:shadow-lg focus:outline-none
                  "
                >
                  <FiSearch className="text-lg" />
                  <span>Generate Report</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FiBarChart2 className="text-indigo-600 dark:text-indigo-400" />
              <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                Organization Performance
              </h3>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {orgData.length > 0
                ? `${orgData.length} employees found`
                : "No data yet"}
            </div>
          </div>

          <div className="p-5">
            {orgData.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="p-6 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                  <FiUsers className="text-4xl text-gray-400 dark:text-gray-500" />
                </div>
                <p className="text-lg text-gray-500 dark:text-gray-400 mb-2">
                  No performance data available
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 max-w-md">
                  Select filters above and click "Generate Report" to view
                  organization-wide performance analytics.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="
                      bg-gray-50 dark:bg-gray-700/30 text-left text-gray-500 dark:text-gray-400
                      text-sm font-medium uppercase tracking-wider
                    ">
                      <th className="px-6 py-4 rounded-l-lg">Employee</th>
                      <th className="px-6 py-4">Department</th>
                      <th className="px-6 py-4">Designation</th>
                      <th className="px-6 py-4">Rating Count</th>
                      <th className="px-6 py-4">Score</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4 text-center rounded-r-lg">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {orgData.map(({ employee, averageRating, ratingCount, category }) => (
                      <tr
                        key={employee._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors duration-150"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={employee.user_Avatar || "/placeholder-avatar.svg"}
                              alt="avatar"
                              className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                // e.currentTarget.src = "fallback.jpg";
                              }}
                            />
                            <div>
                              <p className="font-semibold">
                                {employee.first_Name} {employee.last_Name}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {employee.employee_Id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">{employee.department || "—"}</td>
                        <td className="px-6 py-4">{employee.designation || "—"}</td>
                        <td className="px-6 py-4">{ratingCount || 0}</td>
                        <td className="px-6 py-4">
                          {averageRating ? averageRating.toFixed(2) : "0.00"}
                        </td>
                        <td className="px-6 py-4">
                          {category || "—"} 
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleViewFullRating(employee._id)}
                            className="
                              inline-flex items-center px-3 py-2 text-sm
                              bg-green-500 hover:bg-green-600
                              text-white rounded transition-colors duration-200
                              focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2
                              dark:focus:ring-offset-gray-800
                            "
                          >
                            <FiEye className="mr-1" />
                            Full Details
                          </button>
                        </td>
                      </tr>
                    ))}
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

export default AllEmployeeRatings;
