

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import useRatingStore from "../../store/useRatingNewStore";
import { getWeeksInMonth } from "./calendarUtils"; // your helper

const FREQUENCIES = ["daily", "weekly", "monthly", "yearly"];

function EmployeeRatingAdvanced() {
  const { employeeId } = useParams();

  // from Zustand
  const { getEmployeeRatingsAdvanced, loading, error } = useRatingStore();

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

  // ---- NEW: KPI Detail Modal state ----
  const [showModal, setShowModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);

  // a small date helper
  const today = new Date();
  const isoToday = today.toISOString().split("T")[0];
  const currentYear = today.getFullYear();
  const currentMonth = String(today.getMonth() + 1).padStart(2, "0");

  // reset frequency defaults
  useEffect(() => {
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
  }, [frequency]);

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
          averageRating,
          ratingCount,
        });
        setFilteredRatings(filteredRatings);
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

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRating(null);
  };

  return (
    <div className="p-4 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <h1 className="text-2xl font-bold mb-4">Employee Rating (Advanced)</h1>

      {loading && <p className="text-blue-500 mb-2">Loading...</p>}
      {error && <p className="text-red-500 mb-2">Error: {error}</p>}

      {/* Filter Panel */}
      <div className="bg-white dark:bg-gray-800 rounded p-4 mb-6 shadow">
        <label className="block font-medium mb-1">Frequency</label>
        <select
          className="border p-2 rounded w-48 dark:bg-gray-700 dark:border-gray-600"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          {FREQUENCIES.map((freq) => (
            <option key={freq} value={freq}>
              {freq}
            </option>
          ))}
        </select>

        {/* daily => date range */}
        {frequency === "daily" && (
          <div className="mt-4 flex space-x-4">
            <div>
              <label className="block font-medium mb-1">Start Date</label>
              <input
                type="date"
                className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">End Date</label>
              <input
                type="date"
                className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* weekly => start Year/Month/Week + end Year/Month/Week */}
        {frequency === "weekly" && (
          <>
            {/* START weekly */}
            <div className="mt-4 flex space-x-4">
              <div>
                <label className="block font-medium mb-1">Start Year</label>
                <input
                  type="number"
                  className="border p-2 rounded w-20 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="2025"
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Start Month</label>
                <input
                  type="number"
                  className="border p-2 rounded w-16 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="1-12"
                  value={startMonth}
                  onChange={(e) => setStartMonth(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Start Week</label>
                <select
                  className="border p-2 rounded w-24 dark:bg-gray-700 dark:border-gray-600"
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

            {/* END weekly */}
            <div className="mt-4 flex space-x-4">
              <div>
                <label className="block font-medium mb-1">End Year</label>
                <input
                  type="number"
                  className="border p-2 rounded w-20 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="2025"
                  value={endYear}
                  onChange={(e) => setEndYear(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-medium mb-1">End Month</label>
                <input
                  type="number"
                  className="border p-2 rounded w-16 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="1-12"
                  value={endMonth}
                  onChange={(e) => setEndMonth(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-medium mb-1">End Week</label>
                <select
                  className="border p-2 rounded w-24 dark:bg-gray-700 dark:border-gray-600"
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
          </>
        )}

        {/* monthly => startYear/Month + endYear/Month */}
        {frequency === "monthly" && (
          <div className="mt-4 flex space-x-4">
            <div>
              <label className="block font-medium mb-1">Start Year</label>
              <input
                type="number"
                className="border p-2 rounded w-20 dark:bg-gray-700 dark:border-gray-600"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                placeholder="2024"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Start Month</label>
              <input
                type="number"
                className="border p-2 rounded w-16 dark:bg-gray-700 dark:border-gray-600"
                value={startMonth}
                onChange={(e) => setStartMonth(e.target.value)}
                placeholder="1-12"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">End Year</label>
              <input
                type="number"
                className="border p-2 rounded w-20 dark:bg-gray-700 dark:border-gray-600"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                placeholder="2025"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">End Month</label>
              <input
                type="number"
                className="border p-2 rounded w-16 dark:bg-gray-700 dark:border-gray-600"
                value={endMonth}
                onChange={(e) => setEndMonth(e.target.value)}
                placeholder="1-12"
              />
            </div>
          </div>
        )}

        {/* yearly => startYear + endYear */}
        {frequency === "yearly" && (
          <div className="mt-4 flex space-x-4">
            <div>
              <label className="block font-medium mb-1">Start Year</label>
              <input
                type="number"
                className="border p-2 rounded w-20 dark:bg-gray-700 dark:border-gray-600"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                placeholder="2023"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">End Year</label>
              <input
                type="number"
                className="border p-2 rounded w-20 dark:bg-gray-700 dark:border-gray-600"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                placeholder="2025"
              />
            </div>
          </div>
        )}

        <button
          onClick={handleFetchRatings}
          className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
        >
          Fetch Ratings
        </button>
      </div>

      {/* Employee Info + Ratings */}
      {employeeData ? (
        <div className="bg-white dark:bg-gray-800 rounded p-4 shadow">
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={employeeData.user_Avatar}
              alt="avatar"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold">
                {employeeData.first_Name} {employeeData.last_Name} (
                {employeeData.employee_Id})
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {employeeData.designation}
              </p>
              {employeeData.department && (
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Dept: {employeeData.department}
                </p>
              )}
            </div>
            <div className="ml-auto text-right">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Ratings Found: {employeeData.ratingCount}
              </p>
              <p className="font-bold">
                Avg Rating: {employeeData.averageRating.toFixed(2)}
              </p>
            </div>
          </div>

          {filteredRatings.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No rating docs match your filters.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                  <tr>
                    <th className="px-4 py-2 text-left">Frequency</th>
                    <th className="px-4 py-2 text-left">Period</th>
                    <th className="px-4 py-2 text-left">TotalScore</th>
                    <th className="px-4 py-2 text-left"># of KPIs</th>
                    <th className="px-4 py-2 text-left">Comment</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredRatings.map((rdoc) => (
                    <tr key={rdoc._id}>
                      <td className="px-4 py-2">{rdoc.frequency}</td>
                      <td className="px-4 py-2">{renderPeriod(rdoc)}</td>
                      <td className="px-4 py-2">{rdoc.totalScore}</td>
                      <td className="px-4 py-2">{rdoc.kpis?.length || 0}</td>
                      <td className="px-4 py-2">{rdoc.comment || "—"}</td>
                      <td className="px-4 py-2">
                        <button
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                          onClick={() => handleOpenModal(rdoc)}
                        >
                          View KPIs
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          No employee data loaded yet. Choose filters and click "Fetch Ratings."
        </p>
      )}

      {/* ------- MODAL for KPI detail ------- */}
      {showModal && selectedRating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg relative w-full max-w-md">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-700 dark:text-gray-300"
            >
              &times;
            </button>
            <h3 className="text-lg font-semibold mb-3">
              KPI Details: {renderPeriod(selectedRating)} 
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
              Frequency: {selectedRating.frequency} | 
              Score: {selectedRating.totalScore}
            </p>
            <div className="max-h-64 overflow-auto space-y-2 pr-2">
              {selectedRating.kpis.map((k, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 dark:border-gray-600 rounded p-3 bg-gray-50 dark:bg-gray-700"
                >
                  <p className="font-medium">{k.kpiName}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Type: {k.type} | Score: {k.score}
                  </p>
                  {k.comment && (
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      Comment: {k.comment}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={handleCloseModal}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Helper to render the date/period
 */
function renderPeriod(rdoc) {
  if (rdoc.frequency === "daily") {
    if (!rdoc.date) return "No date";
    const d = new Date(rdoc.date);
    return d.toLocaleDateString();
  } else if (rdoc.frequency === "weekly") {
    return `Yr${rdoc.year}-M${rdoc.month}-Wk${rdoc.week}`;
  } else if (rdoc.frequency === "monthly") {
    return `${rdoc.year}-${rdoc.month}`;
  } else if (rdoc.frequency === "yearly") {
    return rdoc.year || "??";
  }
  return "??";
}

export default EmployeeRatingAdvanced;
