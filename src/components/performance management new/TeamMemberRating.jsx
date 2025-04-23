import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useRatingStore from "../../store/useRatingNewStore";
import { getWeeksInMonth } from "./calendarUtils";
import {
  FiCalendar,
  FiUsers,
  FiStar,
  FiFilter,
  FiArrowRight,
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
  {
    value: "daily",
    label: "Daily",
    icon: <MdOutlineDateRange className="text-lg" />,
  },
  {
    value: "weekly",
    label: "Weekly",
    icon: <BsCalendar3Week className="text-lg" />,
  },
  {
    value: "monthly",
    label: "Monthly",
    icon: <BsCalendar2Month className="text-lg" />,
  },
  {
    value: "yearly",
    label: "Yearly",
    icon: <BsCalendar2Range className="text-lg" />,
  },
];

const months = [
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

function TeamRatingsAdvanced() {
  const { getTeamRatingsAdvanced, loading, error } = useRatingStore();
  const navigate = useNavigate();

  const [frequency, setFrequency] = useState("daily");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [startWeek, setStartWeek] = useState("");
  const [endWeek, setEndWeek] = useState("");
  const [startAvailableWeeks, setStartAvailableWeeks] = useState([]);
  const [endAvailableWeeks, setEndAvailableWeeks] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);

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
        setStartAvailableWeeks([]);
        setEndAvailableWeeks([]);
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
        setStartAvailableWeeks([]);
        setEndAvailableWeeks([]);
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
        setStartAvailableWeeks([]);
        setEndAvailableWeeks([]);
        break;
      default:
        break;
    }
  }, [frequency]);

  // Handle weeks for "weekly" frequency
  useEffect(() => {
    if (frequency === "weekly" && startYear && startMonth) {
      const year = parseInt(startYear, 10);
      const month = parseInt(startMonth, 10) - 1;
      if (year >= 0 && month >= 0) {
        const weeks = getWeeksInMonth(year, month);
        setStartAvailableWeeks(weeks);
        if (!startWeek || !weeks.find((w) => w.value === startWeek)) {
          const found = weeks.find(
            (w) => new Date() >= w.startDate && new Date() <= w.endDate
          );
          setStartWeek(found ? found.value : weeks[0]?.value || "");
        }
      } else {
        setStartAvailableWeeks([]);
      }
    } else {
      setStartAvailableWeeks([]);
    }
  }, [frequency, startYear, startMonth, startWeek]);

  useEffect(() => {
    if (frequency === "weekly" && endYear && endMonth) {
      const year = parseInt(endYear, 10);
      const month = parseInt(endMonth, 10) - 1;
      if (year >= 0 && month >= 0) {
        const weeks = getWeeksInMonth(year, month);
        setEndAvailableWeeks(weeks);
        if (!endWeek || !weeks.find((w) => w.value === endWeek)) {
          const found = weeks.find(
            (w) => new Date() >= w.startDate && new Date() <= w.endDate
          );
          setEndWeek(found ? found.value : weeks[0]?.value || "");
        }
      } else {
        setEndAvailableWeeks([]);
      }
    } else {
      setEndAvailableWeeks([]);
    }
  }, [frequency, endYear, endMonth, endWeek]);

  const handleFetchRatings = async () => {
    try {
      const params = { frequency };

      // Daily
      if (frequency === "daily" && startDate && endDate) {
        params.startDate = startDate;
        params.endDate = endDate;
      }

      // Weekly
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

      // Monthly
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

      // Yearly
      if (frequency === "yearly" && startYear && endYear) {
        params.startYear = startYear;
        params.endYear = endYear;
      }

      const res = await getTeamRatingsAdvanced(params);
      if (res.success) {
        setTeamData(res.data);
      } else {
        toast.error(res.message || "Could not fetch data");
      }
    } catch (err) {
      toast.error(err.message || "Error fetching advanced ratings");
    }
  };

  const handleViewFullRating = (employeeId) => {
    navigate(`/dashboard/employee-advanced/${employeeId}`);
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

        {/* Filters Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-90 transition-all duration-300">
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
                className={`w-5 h-5 transform ${
                  isFiltersOpen ? "rotate-180" : ""
                }`}
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
            <div className="p-5">
              {/* Frequency Selection */}
              <div className="mb-6">
                <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Analysis Frequency
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {FREQUENCIES.map((freq) => (
                    <button
                      key={freq.value}
                      className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all duration-200 ${
                        frequency === freq.value
                          ? "border-indigo-600 bg-indigo-50 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-900/30 dark:text-indigo-300"
                          : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                      }`}
                      onClick={() => setFrequency(freq.value)}
                    >
                      <span>{freq.icon}</span>
                      <span>{freq.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Filters Based on Frequency */}
              <div className="space-y-6">
                {/* DAILY */}
                {frequency === "daily" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                        <FiCalendar className="mr-2" />
                        Start Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 transition-all duration-200"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                        <FiCalendar className="mr-2" />
                        End Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 transition-all duration-200"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* WEEKLY */}
                {frequency === "weekly" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Start Year
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 transition-all duration-200"
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
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 transition-all duration-200"
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
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 transition-all duration-200"
                          value={startWeek}
                          onChange={(e) => setStartWeek(e.target.value)}
                        >
                          <option value="">Select Week</option>
                          {startAvailableWeeks.map((wObj) => (
                            <option key={wObj.value} value={wObj.value}>
                              {wObj.label}
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
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 transition-all duration-200"
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
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 transition-all duration-200"
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
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 transition-all duration-200"
                          value={endWeek}
                          onChange={(e) => setEndWeek(e.target.value)}
                        >
                          <option value="">Select Week</option>
                          {endAvailableWeeks.map((wObj) => (
                            <option key={wObj.value} value={wObj.value}>
                              {wObj.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* MONTHLY */}
                {frequency === "monthly" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Start Year
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 transition-all duration-200"
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
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 transition-all duration-200"
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
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 transition-all duration-200"
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
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 transition-all duration-200"
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

                {/* YEARLY */}
                {frequency === "yearly" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Start Year
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 transition-all duration-200"
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
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 transition-all duration-200"
                        value={endYear}
                        onChange={(e) => setEndYear(e.target.value)}
                        placeholder="2025"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <button
                  onClick={handleFetchRatings}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
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
              <h3 className="font-semibold text-lg">Performance Analytics</h3>
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
                  <FiUsers className="text-4xl text-gray-400 dark:text-gray-500" />
                </div>
                <p className="text-lg text-gray-500 dark:text-gray-400 mb-2">
                  No performance data available
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 max-w-md">
                  Select a time period and generate a report to view team
                  performance analytics
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
                      <th className="px-6 py-4">Performance Score</th>
                      <th className="px-6 py-4 rounded-r-lg text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {teamData.map(
                      ({ employee, averageRating, ratingCount }) => (
                        <tr
                          key={employee._id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors duration-150"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="relative">
                                <img
                                  src={
                                    employee.user_Avatar ||
                                    "/placeholder-avatar.jpg"
                                  }
                                  alt="avatar"
                                  className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                      "https://via.placeholder.com/40";
                                  }}
                                />
                                {averageRating >= 4.5 && (
                                  <div className="absolute -top-1 -right-1 bg-yellow-400 text-white text-xs px-1 py-0.5 rounded-full font-bold">
                                    TOP
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="font-semibold">
                                  {employee.first_Name} {employee.last_Name} (
                                  {employee.employee_Id})
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {employee.department || "No department"}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {employee.designation || "N/A"}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {ratingCount || 0}
                          </td>
                          {/* Replaced stars with a numeric average rating */}
                          <td className="px-6 py-4">
                            {averageRating ? averageRating.toFixed(2) : "N/A"}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => handleViewFullRating(employee._id)}
                              className="inline-flex items-center px-3 py-2 text-sm bg-green-500 hover:bg-green-600 text-white rounded transition-colors duration-200"
                            >
                              <FiEye className="mr-1" />
                              View Full Rating
                            </button>
                          </td>
                        </tr>
                      )
                    )}
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
