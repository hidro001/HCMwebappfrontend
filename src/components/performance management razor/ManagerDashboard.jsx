import React, { useState, useEffect } from "react";
import useRatingStore from "../../store/useRatingNewStore";
import PerformanceAnalytics from "./Analytics/TeamPerformanceAnalytics";
import useDepartmentStore from "../../store/departmentStore";
import useDesignationStore from "../../store/designationStore";
import {
  startOfMonth,
  endOfMonth,
  eachWeekOfInterval,
  addDays,
  format,
  getISOWeek,
} from "date-fns";

/* Utility: Month options */
const MONTHS = [
  { value: "1", label: "Jan" },
  { value: "2", label: "Feb" },
  { value: "3", label: "Mar" },
  { value: "4", label: "Apr" },
  { value: "5", label: "May" },
  { value: "6", label: "Jun" },
  { value: "7", label: "Jul" },
  { value: "8", label: "Aug" },
  { value: "9", label: "Sep" },
  { value: "10", label: "Oct" },
  { value: "11", label: "Nov" },
  { value: "12", label: "Dec" },
];

/* ──────────────────────────────────────────────────────────
 * Build a Monday-to-Sunday week list for a given month/year
 * ────────────────────────────────────────────────────────── */
function getWeeksInMonth(year, monthIndex) {
  const start = startOfMonth(new Date(year, monthIndex, 1));
  const end = endOfMonth(start);
  return eachWeekOfInterval({ start, end }, { weekStartsOn: 1 }).map(
    (weekStart, idx) => {
      const weekEnd = addDays(weekStart, 6);
      return {
        value: getISOWeek(weekStart).toString(),
        label: `Week ${idx + 1} (${format(weekStart, "MMM d")} – ${format(
          weekEnd,
          "MMM d"
        )})`,
        startDate: weekStart,
        endDate: weekEnd,
      };
    }
  );
}

const FREQUENCIES = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

export default function ManagerDashboard() {
  /* ── Store hooks ───────────────────────────────────────── */
  const { getManagerTeamAggregated, loading, error } = useRatingStore();
  const { departments, fetchDepartments } = useDepartmentStore();
  const { designations, fetchDesignations } = useDesignationStore();

  /* ── Filter state ──────────────────────────────────────── */
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [frequency, setFrequency] = useState("weekly");

  /* daily */
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  /* weekly / monthly / yearly */
  const [startYear, setStartYear] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [startWeek, setStartWeek] = useState("");
  const [endYear, setEndYear] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [endWeek, setEndWeek] = useState("");

  const [startWeeksOptions, setStartWeeksOptions] = useState([]);
  const [endWeeksOptions, setEndWeeksOptions] = useState([]);

  /* ── API response → analytics state ───────────────────── */
  const [analyticsData, setAnalyticsData] = useState(null);

  /* ── Load departments & designations on mount ─────────── */
  useEffect(() => {
    fetchDepartments();
    fetchDesignations();
  }, []);

  /* ── Recompute week dropdowns when month/year changes ───── */
  useEffect(() => {
    if (frequency !== "weekly") return;
    if (startYear && startMonth) {
      const opts = getWeeksInMonth(+startYear, +startMonth - 1);
      setStartWeeksOptions(opts);
      if (!opts.some((w) => w.value === startWeek)) {
        setStartWeek(opts[0]?.value || "");
      }
    } else {
      setStartWeeksOptions([]);
      setStartWeek("");
    }
  }, [frequency, startYear, startMonth, startWeek]);

  useEffect(() => {
    if (frequency !== "weekly") return;
    if (endYear && endMonth) {
      const opts = getWeeksInMonth(+endYear, +endMonth - 1);
      setEndWeeksOptions(opts);
      if (!opts.some((w) => w.value === endWeek)) {
        setEndWeek(opts[0]?.value || "");
      }
    } else {
      setEndWeeksOptions([]);
      setEndWeek("");
    }
  }, [frequency, endYear, endMonth, endWeek]);

  /* ── Build query & hit API ─────────────────────────────── */
  const handleFetch = async () => {
    const params = {
      frequency,
      ...(department && { department }),
      ...(designation && { designation }),
    };

    if (frequency === "daily") {
      Object.assign(params, { startDate, endDate });
    }
    if (frequency === "weekly") {
      Object.assign(params, {
        startYear,
        startMonth,
        startWeek,
        endYear,
        endMonth,
        endWeek,
      });
    }
    if (frequency === "monthly") {
      Object.assign(params, { startYear, startMonth, endYear, endMonth });
    }
    if (frequency === "yearly") {
      Object.assign(params, { startYear, endYear });
    }

    try {
      const res = await getManagerTeamAggregated(params);
      if (res.success) {
        setAnalyticsData(res.data);
      }
    } catch {
      // error is surfaced via store
    }
  };

  /* ────────────────────────── MARKUP ─────────────────────────── */
  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
        Team Performance Dashboard
      </h1>

      {/* Filter panel */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Department */}
          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <select
              className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">All</option>
              {departments.map((d) => (
                <option key={d._id} value={d.department}>
                  {d.department}
                </option>
              ))}
            </select>
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Designation
            </label>
            <select
              className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            >
              <option value="">All</option>
              {designations.map((d) => (
                <option key={d.id} value={d.designation}>
                  {d.designation}
                </option>
              ))}
            </select>
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-sm font-medium mb-1">Frequency</label>
            <select
              className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            >
              {FREQUENCIES.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>

          {/* Dynamic filters */}
          {frequency === "daily" && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </>
          )}

          {frequency === "weekly" && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Start Year
                </label>
                <input
                  type="number"
                  placeholder="2025"
                  className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700"
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Start Month
                </label>
                <select
                  className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700"
                  value={startMonth}
                  onChange={(e) => setStartMonth(e.target.value)}
                >
                  <option value="">Select Month</option>
                  {MONTHS.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Start Week
                </label>
                <select
                  className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700"
                  value={startWeek}
                  onChange={(e) => setStartWeek(e.target.value)}
                >
                  {startWeeksOptions.map((w) => (
                    <option key={w.value} value={w.value}>
                      {w.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  End Year
                </label>
                <input
                  type="number"
                  placeholder="2025"
                  className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700"
                  value={endYear}
                  onChange={(e) => setEndYear(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  End Month
                </label>
                <select
                  className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700"
                  value={endMonth}
                  onChange={(e) => setEndMonth(e.target.value)}
                >
                  <option value="">Select Month</option>
                  {MONTHS.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  End Week
                </label>
                <select
                  className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700"
                  value={endWeek}
                  onChange={(e) => setEndWeek(e.target.value)}
                >
                  {endWeeksOptions.map((w) => (
                    <option key={w.value} value={w.value}>
                      {w.label}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {frequency === "monthly" && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Start Year
                </label>
                <input
                  type="number"
                  placeholder="2025"
                  className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700"
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Start Month
                </label>
                <select
                  className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700"
                  value={startMonth}
                  onChange={(e) => setStartMonth(e.target.value)}
                >
                  <option value="">--</option>
                  {MONTHS.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  End Year
                </label>
                <input
                  type="number"
                  placeholder="2025"
                  className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700"
                  value={endYear}
                  onChange={(e) => setEndYear(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  End Month
                </label>
                <select
                  className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700"
                  value={endMonth}
                  onChange={(e) => setEndMonth(e.target.value)}
                >
                  <option value="">--</option>
                  {MONTHS.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {frequency === "yearly" && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Start Year
                </label>
                <input
                  type="number"
                  placeholder="2025"
                  className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700"
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  End Year
                </label>
                <input
                  type="number"
                  placeholder="2026"
                  className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700"
                  value={endYear}
                  onChange={(e) => setEndYear(e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        {/* Apply Filters */}
        <div className="mt-6 text-right">
          <button
            onClick={handleFetch}
            disabled={loading}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50"
          >
            {loading ? "Loading…" : "Apply Filters"}
          </button>
          {error && (
            <p className="mt-2 text-sm text-red-500 text-left">{error}</p>
          )}
        </div>
      </div>

      {/* Analytics */}
      {analyticsData && <PerformanceAnalytics data={analyticsData} />}
    </div>
  );
}
