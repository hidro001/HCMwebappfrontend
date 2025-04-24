import React, { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import useRatingStore from "../../store/useRatingNewStore";
import { getWeeksInMonth } from "./calendarUtils";

import {
  FiCalendar,
  FiUser,
  FiFilter,
  FiBarChart2,
  FiEye,
  FiAlertCircle,
  FiSearch,
  FiChevronUp,
  FiChevronDown,
  FiBriefcase,
} from "react-icons/fi";
import { RiDashboardLine } from "react-icons/ri";
import { BsCalendarWeek, BsCalendarMonth, BsCalendar2Range } from "react-icons/bs";

// ===== IMPORT KPIDetailModal HERE =====
import KPIDetailModal from "./modal/KPIDetailModal";

const FREQUENCIES = [
  { value: "daily", label: "Daily", icon: <FiCalendar className="mr-2" /> },
  { value: "weekly", label: "Weekly", icon: <BsCalendarWeek className="mr-2" /> },
  { value: "monthly", label: "Monthly", icon: <BsCalendarMonth className="mr-2" /> },
  { value: "yearly", label: "Yearly", icon: <BsCalendar2Range className="mr-2" /> },
];

/**
 * Returns the text color classes for a 0-100 score.
 * @param {number} scoreOutOf100
 */
function getScoreColor(scoreOutOf100) {
  if (scoreOutOf100 >= 80) return "text-emerald-500";
  if (scoreOutOf100 >= 60) return "text-blue-500";
  if (scoreOutOf100 >= 40) return "text-amber-500";
  return "text-red-500";
}

/**
 * Helper to render the date/period for a rating doc
 * @param {object} rdoc rating doc
 */
function renderPeriod(rdoc) {
  if (rdoc.frequency === "daily") {
    if (!rdoc.date) return "No date";
    const d = new Date(rdoc.date);
    // Format e.g. "Apr 20, 2023"
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } else if (rdoc.frequency === "weekly") {
    return `${rdoc.year} • Month ${rdoc.month} • Week ${rdoc.week}`;
  } else if (rdoc.frequency === "monthly") {
    // Convert month number to month name
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthIndex = parseInt(rdoc.month, 10) - 1;
    const monthName = monthNames[monthIndex] || `Month ${rdoc.month}`;
    return `${monthName} ${rdoc.year}`;
  } else if (rdoc.frequency === "yearly") {
    return rdoc.year || "Unknown Year";
  }
  return "Unknown Period";
}

function EmployeeRatingAdvanced() {
  const { employeeId } = useParams();
  const [searchParams] = useSearchParams(); // to read query params

  // from Zustand
  const { getEmployeeRatingsAdvanced, loading, error } = useRatingStore();

  // UI state
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("ratings"); // 'ratings', 'charts'

  // frequency state
  const [frequency, setFrequency] = useState("daily");

  // daily
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // weekly/monthly/yearly
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [startWeek, setStartWeek] = useState("");
  const [endWeek, setEndWeek] = useState("");
  const [startAvailableWeeks, setStartAvailableWeeks] = useState([]);
  const [endAvailableWeeks, setEndAvailableWeeks] = useState([]);

  // data from API
  const [employeeData, setEmployeeData] = useState(null);
  const [filteredRatings, setFilteredRatings] = useState([]);

  // KPI Detail Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);

  // date/time helpers
  const today = new Date();
  const isoToday = today.toISOString().split("T")[0];
  const currentYear = today.getFullYear();
  const currentMonth = String(today.getMonth() + 1).padStart(2, "0");

  // We only want to parse query params once on initial mount
  const didLoadQueryParams = useRef(false);

  // 1) On mount, parse query parameters and set local state accordingly
  useEffect(() => {
    if (didLoadQueryParams.current) return; // only run once

    let autoFetchNeeded = false;
    // read query params
    const qFrequency = searchParams.get("frequency");
    const qStartDate = searchParams.get("startDate");
    const qEndDate = searchParams.get("endDate");
    const qStartYear = searchParams.get("startYear");
    const qEndYear = searchParams.get("endYear");
    const qStartMonth = searchParams.get("startMonth");
    const qEndMonth = searchParams.get("endMonth");
    const qStartWeek = searchParams.get("startWeek");
    const qEndWeek = searchParams.get("endWeek");

    // if param present => set state
    if (qFrequency) {
      setFrequency(qFrequency);
      autoFetchNeeded = true;
    }
    if (qStartDate) {
      setStartDate(qStartDate);
      autoFetchNeeded = true;
    }
    if (qEndDate) {
      setEndDate(qEndDate);
      autoFetchNeeded = true;
    }
    if (qStartYear) {
      setStartYear(qStartYear);
      autoFetchNeeded = true;
    }
    if (qEndYear) {
      setEndYear(qEndYear);
      autoFetchNeeded = true;
    }
    if (qStartMonth) {
      setStartMonth(qStartMonth);
      autoFetchNeeded = true;
    }
    if (qEndMonth) {
      setEndMonth(qEndMonth);
      autoFetchNeeded = true;
    }
    if (qStartWeek) {
      setStartWeek(qStartWeek);
      autoFetchNeeded = true;
    }
    if (qEndWeek) {
      setEndWeek(qEndWeek);
      autoFetchNeeded = true;
    }

    // Mark we have loaded from query
    didLoadQueryParams.current = true;

    // If we actually got any relevant param, do an initial fetch
    if (autoFetchNeeded && employeeId) {
      // Wait a tick so states can update first
      setTimeout(() => {
        handleFetchRatings();
      }, 0);
    }
  }, [searchParams, employeeId]);

  // 2) Whenever frequency changes, set default states if user didn't load from query
  useEffect(() => {
    // If user is changing frequency from the UI (not from query),
    // we reset to defaults. If it was from query param, it’s already set above.
    // This check helps avoid overwriting if we just loaded from query.
    if (!didLoadQueryParams.current) {
      // brand-new mount, no query params
      handleSetDefaults(frequency);
    }
  }, [frequency]);

  // A small function to set default states for each frequency
  const handleSetDefaults = (freq) => {
    switch (freq) {
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
        setStartYear(String(currentYear));
        setEndYear(String(currentYear));
        setStartMonth(currentMonth);
        setEndMonth(currentMonth);
        setStartWeek("");
        setEndWeek("");
        break;
      case "monthly":
        setStartDate("");
        setEndDate("");
        setStartYear(String(currentYear));
        setEndYear(String(currentYear));
        setStartMonth(currentMonth);
        setEndMonth(currentMonth);
        setStartWeek("");
        setEndWeek("");
        setStartAvailableWeeks([]);
        setEndAvailableWeeks([]);
        break;
      case "yearly":
        setStartDate("");
        setEndDate("");
        setStartYear(String(currentYear));
        setEndYear(String(currentYear));
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
  };

  // if weekly => recalc startWeek
  useEffect(() => {
    if (frequency !== "weekly") return;
    if (startYear && startMonth) {
      const y = parseInt(startYear, 10);
      const m = parseInt(startMonth, 10) - 1;
      if (y >= 0 && m >= 0) {
        const weeksArr = getWeeksInMonth(y, m);
        setStartAvailableWeeks(weeksArr);
        if (!startWeek || !weeksArr.find((w) => w.value === startWeek)) {
          setStartWeek(weeksArr[0]?.value || "");
        }
      } else {
        setStartAvailableWeeks([]);
      }
    } else {
      setStartAvailableWeeks([]);
    }
  }, [frequency, startYear, startMonth, startWeek]);

  // if weekly => recalc endWeek
  useEffect(() => {
    if (frequency !== "weekly") return;
    if (endYear && endMonth) {
      const y = parseInt(endYear, 10);
      const m = parseInt(endMonth, 10) - 1;
      if (y >= 0 && m >= 0) {
        const weeksArr = getWeeksInMonth(y, m);
        setEndAvailableWeeks(weeksArr);
        if (!endWeek || !weeksArr.find((w) => w.value === endWeek)) {
          setEndWeek(weeksArr[0]?.value || "");
        }
      } else {
        setEndAvailableWeeks([]);
      }
    } else {
      setEndAvailableWeeks([]);
    }
  }, [frequency, endYear, endMonth, endWeek]);

  // fetch with advanced filters
  const handleFetchRatings = async () => {
    if (!employeeId) {
      toast.error("No employee selected.");
      return;
    }
    try {
      const params = { frequency };

      // daily
      if (frequency === "daily" && startDate && endDate) {
        params.startDate = startDate;
        params.endDate = endDate;
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
        params.startYear = startYear;
        params.endYear = endYear;
        params.startMonth = startMonth;
        params.endMonth = endMonth;
        params.startWeek = startWeek;
        params.endWeek = endWeek;
      }
      // monthly
      if (
        frequency === "monthly" &&
        startYear &&
        endYear &&
        startMonth &&
        endMonth
      ) {
        params.startYear = startYear;
        params.endYear = endYear;
        params.startMonth = startMonth;
        params.endMonth = endMonth;
      }
      // yearly
      if (frequency === "yearly" && startYear && endYear) {
        params.startYear = startYear;
        params.endYear = endYear;
      }

      const res = await getEmployeeRatingsAdvanced(employeeId, params);
      if (res.success) {
        const { employee, filteredRatings, averageRating, ratingCount } = res.data;

        setEmployeeData({
          ...employee,
          averageRating, // already 0-100 from API
          ratingCount,
        });
        setFilteredRatings(filteredRatings);
        toast.success(`Found ${filteredRatings.length} ratings`);
      } else {
        toast.error(res.message || "Could not fetch data");
      }
    } catch (err) {
      toast.error(err.message || "Error fetching employee advanced ratings");
    }
  };

  // handler to open KPI detail modal
  const handleOpenModal = (ratingDoc) => {
    setSelectedRating(ratingDoc);
    setShowModal(true);
  };

  // handler to close the KPI detail modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRating(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="container mx-auto px-4 py-6 mt-6">
        {/* Dashboard header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700 px-4 rounded-xl">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold mb-1 flex items-center">
              <FiUser className="mr-2 text-blue-500" />
              Employee Performance Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              View and analyze employee performance metrics across different
              time periods
            </p>
          </div>

          {employeeData && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 flex items-center">
              <div className="mr-4">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Average Score
                </div>
                <div className="text-2xl font-bold flex items-center">
                  <span className={getScoreColor(employeeData.averageRating)}>
                    {employeeData.averageRating.toFixed(1)}
                  </span>
                  <span className="text-gray-400 text-sm ml-1">/100</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Total Reviews
                </div>
                <div className="text-lg font-semibold">
                  {employeeData.ratingCount}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filter section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-6 overflow-hidden transition-all duration-300">
          <div
            className="flex items-center justify-between cursor-pointer p-4 border-b border-gray-100 dark:border-gray-700"
            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
          >
            <div className="flex items-center">
              <FiFilter className="text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold">Filter Options</h3>
            </div>
            <div className="flex items-center space-x-2">
              {isFilterExpanded ? (
                <FiChevronUp className="text-gray-500" />
              ) : (
                <FiChevronDown className="text-gray-500" />
              )}
            </div>
          </div>

          {isFilterExpanded && (
            <div className="p-4">
              <div className="mb-6">
                <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Time Period
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {FREQUENCIES.map((freq) => (
                    <button
                      key={freq.value}
                      className={`flex items-center justify-center py-2 px-4 rounded-lg border transition-colors ${
                        frequency === freq.value
                          ? "bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-700 dark:text-blue-300"
                          : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => setFrequency(freq.value)}
                    >
                      {freq.icon}
                      {freq.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time period filters based on frequency */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                {frequency === "daily" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium mb-2 text-sm text-gray-700 dark:text-gray-300">
                        Start Date
                      </label>
                      <div className="relative">
                        <FiCalendar className="absolute left-3 top-3 text-gray-500" />
                        <input
                          type="date"
                          className="pl-9 pr-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-medium mb-2 text-sm text-gray-700 dark:text-gray-300">
                        End Date
                      </label>
                      <div className="relative">
                        <FiCalendar className="absolute left-3 top-3 text-gray-500" />
                        <input
                          type="date"
                          className="pl-9 pr-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {frequency === "weekly" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block font-medium mb-2 text-sm text-gray-700 dark:text-gray-300">
                        Start Period
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="relative">
                          <BsCalendar2Range className="absolute left-3 top-3 text-gray-500" />
                          <input
                            type="number"
                            className="pl-9 pr-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Year"
                            value={startYear}
                            onChange={(e) => setStartYear(e.target.value)}
                          />
                        </div>
                        <div className="relative">
                          <BsCalendarMonth className="absolute left-3 top-3 text-gray-500" />
                          <input
                            type="number"
                            min="1"
                            max="12"
                            className="pl-9 pr-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Month (1-12)"
                            value={startMonth}
                            onChange={(e) => setStartMonth(e.target.value)}
                          />
                        </div>
                        <div className="relative">
                          <BsCalendarWeek className="absolute left-3 top-3 text-gray-500" />
                          <select
                            className="pl-9 pr-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    </div>

                    <div>
                      <label className="block font-medium mb-2 text-sm text-gray-700 dark:text-gray-300">
                        End Period
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="relative">
                          <BsCalendar2Range className="absolute left-3 top-3 text-gray-500" />
                          <input
                            type="number"
                            className="pl-9 pr-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Year"
                            value={endYear}
                            onChange={(e) => setEndYear(e.target.value)}
                          />
                        </div>
                        <div className="relative">
                          <BsCalendarMonth className="absolute left-3 top-3 text-gray-500" />
                          <input
                            type="number"
                            min="1"
                            max="12"
                            className="pl-9 pr-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Month (1-12)"
                            value={endMonth}
                            onChange={(e) => setEndMonth(e.target.value)}
                          />
                        </div>
                        <div className="relative">
                          <BsCalendarWeek className="absolute left-3 top-3 text-gray-500" />
                          <select
                            className="pl-9 pr-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  </div>
                )}

                {frequency === "monthly" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium mb-2 text-sm text-gray-700 dark:text-gray-300">
                        Start Period
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="relative">
                          <BsCalendar2Range className="absolute left-3 top-3 text-gray-500" />
                          <input
                            type="number"
                            className="pl-9 pr-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Year"
                            value={startYear}
                            onChange={(e) => setStartYear(e.target.value)}
                          />
                        </div>
                        <div className="relative">
                          <BsCalendarMonth className="absolute left-3 top-3 text-gray-500" />
                          <input
                            type="number"
                            min="1"
                            max="12"
                            className="pl-9 pr-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Month (1-12)"
                            value={startMonth}
                            onChange={(e) => setStartMonth(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block font-medium mb-2 text-sm text-gray-700 dark:text-gray-300">
                        End Period
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="relative">
                          <BsCalendar2Range className="absolute left-3 top-3 text-gray-500" />
                          <input
                            type="number"
                            className="pl-9 pr-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Year"
                            value={endYear}
                            onChange={(e) => setEndYear(e.target.value)}
                          />
                        </div>
                        <div className="relative">
                          <BsCalendarMonth className="absolute left-3 top-3 text-gray-500" />
                          <input
                            type="number"
                            min="1"
                            max="12"
                            className="pl-9 pr-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Month (1-12)"
                            value={endMonth}
                            onChange={(e) => setEndMonth(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {frequency === "yearly" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium mb-2 text-sm text-gray-700 dark:text-gray-300">
                        Start Year
                      </label>
                      <div className="relative">
                        <BsCalendar2Range className="absolute left-3 top-3 text-gray-500" />
                        <input
                          type="number"
                          className="pl-9 pr-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Year"
                          value={startYear}
                          onChange={(e) => setStartYear(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-medium mb-2 text-sm text-gray-700 dark:text-gray-300">
                        End Year
                      </label>
                      <div className="relative">
                        <BsCalendar2Range className="absolute left-3 top-3 text-gray-500" />
                        <input
                          type="number"
                          className="pl-9 pr-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Year"
                          value={endYear}
                          onChange={(e) => setEndYear(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleFetchRatings}
                    disabled={loading}
                    className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <>
                        <FiSearch className="mr-2" />
                        Apply Filters
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-4 rounded-lg mb-6 flex items-start">
            <FiAlertCircle className="text-red-500 mr-2 mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium">Error</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Employee Data Panel */}
        {employeeData && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-6">
            {/* Employee header */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="flex items-center mb-4 md:mb-0">
                  <img
                    src={employeeData.user_Avatar}
                    alt="Employee"
                    className="w-16 h-16 rounded-full object-cover border-4 border-blue-100 dark:border-blue-900"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/40";
                    }}
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-bold">
                      {employeeData.first_Name} {employeeData.last_Name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <FiBriefcase className="mr-1" />
                      <span>{employeeData.designation}</span>
                      {employeeData.department && (
                        <span className="ml-2 flex items-center">
                          <span className="mx-1">•</span>
                          {employeeData.department}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded inline-block">
                      ID: {employeeData.employee_Id}
                    </div>
                  </div>
                </div>

                <div className="md:ml-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg px-4 py-2">
                    <div className="mr-3">
                      <div className="text-xs text-gray-500 dark:text-gray-400">Average</div>
                      <div className="font-bold text-xl">
                        <span className={getScoreColor(employeeData.averageRating)}>
                          {employeeData.averageRating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg px-4 py-2">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Ratings</div>
                    <div className="font-bold text-xl">{employeeData.ratingCount}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation tabs */}
            <div className="border-b border-gray-100 dark:border-gray-700">
              <div className="flex overflow-x-auto">
                <button
                  onClick={() => setActiveTab("ratings")}
                  className={`px-6 py-3 text-sm font-medium flex items-center border-b-2 transition-colors ${
                    activeTab === "ratings"
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  <FiBarChart2 className="mr-2" />
                  Ratings
                </button>
                <button
                  onClick={() => setActiveTab("charts")}
                  className={`px-6 py-3 text-sm font-medium flex items-center border-b-2 transition-colors ${
                    activeTab === "charts"
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  <RiDashboardLine className="mr-2" />
                  Analytics
                </button>
              </div>
            </div>

            {/* Tab content */}
            <div className="p-4">
              {activeTab === "ratings" && (
                <>
                  {filteredRatings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <svg
                        className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
                        No ratings found
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 max-w-md">
                        No performance rating documents match your selected filters. Try
                        adjusting your filters or selecting a different time period.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead>
                          <tr className="bg-gray-50 dark:bg-gray-800/50">
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Period
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Frequency
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Score (0-100)
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              KPIs
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Comment
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                          {filteredRatings.map((rdoc) => (
                            <tr
                              key={rdoc._id}
                              className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                            >
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="font-medium">{renderPeriod(rdoc)}</div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className="px-2 py-1 text-xs rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 capitalize">
                                  {rdoc.frequency}
                                </span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                  <span className={`font-bold ${getScoreColor(rdoc.totalScore)}`}>
                                    {rdoc.totalScore.toFixed(1)}
                                  </span>
                                  <span className="ml-1 text-gray-400 text-xs">/100</span>
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className="px-2 py-1 text-xs rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                                  {rdoc.kpis?.length || 0} KPIs
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <div className="text-sm text-gray-700 dark:text-gray-300 max-w-xs truncate">
                                  {rdoc.comment || "—"}
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-right">
                                <button
                                  className="inline-flex items-center px-3 py-1 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-md transition-colors text-sm font-medium"
                                  onClick={() => handleOpenModal(rdoc)}
                                >
                                  <FiEye className="mr-1" />
                                  View Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}

              {activeTab === "charts" && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <svg
                    className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 13v-1m4 1v-3m4 3V8M12 21l9-9-9-9-9 9 9 9z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Analytics Coming Soon
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md">
                    Performance analytics visualizations are coming in the next update.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {!employeeData && !loading && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
            <div className="flex flex-col items-center justify-center py-6">
              <svg
                className="w-20 h-20 text-gray-300 dark:text-gray-600 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                No Employee Data
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
                Select a time period using the filters above and click
                &quot;Apply Filters&quot; to view employee performance data.
              </p>
              <button
                onClick={handleFetchRatings}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md"
              >
                <FiSearch className="mr-2" />
                Fetch Employee Data
              </button>
            </div>
          </div>
        )}
      </div>

      {/* === KPI DETAIL MODAL (Imported) === */}
      <KPIDetailModal
        showModal={showModal}
        selectedRating={selectedRating}
        onClose={handleCloseModal}
        renderPeriod={renderPeriod}
        getScoreColor={getScoreColor}
      />
    </div>
  );
}

export default EmployeeRatingAdvanced;
