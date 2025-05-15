

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import useRatingStore from "../../../store/useRatingNewStore";
import useDepartmentStore from "../../../store/departmentStore";
import useDesignationStore from "../../../store/designationStore";
import { getWeeksInMonth } from "./calendarUtils";
import { CiUser } from "react-icons/ci";
import { 
  MdOutlineDateRange, 
  MdWorkOutline,
  MdOutlineAutoGraph,
  MdOutlineKeyboardArrowRight
} from "react-icons/md";
import { 
  BsCalendar3Week, 
  BsCalendar2Month, 
  BsCalendar2Range,
  BsStars,
  BsBuilding,
  BsPerson,
  BsCalendarDate,
  BsChevronRight
} from "react-icons/bs";
import { FiFilter, FiSearch, FiAward, FiUser } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";

const FREQUENCIES = [
  { value: "daily",   label: "Daily",   icon: <MdOutlineDateRange className="text-xl" /> },
  { value: "weekly",  label: "Weekly",  icon: <BsCalendar3Week className="text-xl" /> },
  { value: "monthly", label: "Monthly", icon: <BsCalendar2Month className="text-xl" /> },
  { value: "yearly",  label: "Yearly",  icon: <BsCalendar2Range className="text-xl" /> },
];

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

export default function TopPerformerCard() {
  const { getOrganizationTopPerformer, getDesignationTopPerformer, loading, error } = useRatingStore();
  const { departments, fetchDepartments } = useDepartmentStore();
  const { designations, fetchDesignations } = useDesignationStore();

  useEffect(() => {
    fetchDepartments();
    fetchDesignations();
  }, [fetchDepartments, fetchDesignations]);

  // Tab: "org" or "desig"
  const [tab, setTab] = useState("org");
  // Org-only filters
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  // Show/hide filters
  const [showFilters, setShowFilters] = useState(true);

  // Date filters
  const [frequency, setFrequency] = useState("daily");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [startWeek, setStartWeek] = useState("");
  const [endWeek, setEndWeek] = useState("");
  const [startWeeks, setStartWeeks] = useState([]);
  const [endWeeks, setEndWeeks] = useState([]);

  // Results
  const [orgPerformer, setOrgPerformer] = useState(null);
  const [desigPerformer, setDesigPerformer] = useState(null);

  // Reset date fields when frequency changes
  useEffect(() => {
    const today = new Date(),
          iso = today.toISOString().split("T")[0],
          y = today.getFullYear(),
          m = today.getMonth() + 1;

    setStartDate(frequency === "daily" ? iso : "");
    setEndDate(frequency === "daily" ? iso : "");
    setStartYear(frequency !== "daily" ? String(y) : "");
    setEndYear(frequency !== "daily" ? String(y) : "");
    setStartMonth(
      frequency === "weekly" || frequency === "monthly"
        ? String(m).padStart(2, "0")
        : ""
    );
    setEndMonth(
      frequency === "weekly" || frequency === "monthly"
        ? String(m).padStart(2, "0")
        : ""
    );
    setStartWeek(""); setEndWeek("");
    setStartWeeks([]); setEndWeeks([]);
  }, [frequency]);

  // Weekly → populate startWeeks
  useEffect(() => {
    if (frequency !== "weekly") return;
    if (startYear && startMonth) {
      const weeks = getWeeksInMonth(Number(startYear), Number(startMonth) - 1);
      setStartWeeks(weeks);
      if (!startWeek && weeks.length) setStartWeek(weeks[0].value);
    }
  }, [frequency, startYear, startMonth, startWeek]);

  // Weekly → populate endWeeks
  useEffect(() => {
    if (frequency !== "weekly") return;
    if (endYear && endMonth) {
      const weeks = getWeeksInMonth(Number(endYear), Number(endMonth) - 1);
      setEndWeeks(weeks);
      if (!endWeek && weeks.length) setEndWeek(weeks[0].value);
    }
  }, [frequency, endYear, endMonth, endWeek]);

  const handleFetch = async () => {
    const params = { frequency };

    // Org-only filters
    if (tab === "org") {
      if (department) params.department = department;
      if (designation) params.designation = designation;
    }

    // Build date params
    if (frequency === "daily") {
      if (!startDate || !endDate) return toast.error("Pick both start and end date");
      params.startDate = startDate;
      params.endDate = endDate;
    } else if (frequency === "weekly") {
      if (!(startYear && endYear && startMonth && endMonth && startWeek && endWeek)) {
        return toast.error("Complete your week range");
      }
      Object.assign(params, { startYear, endYear, startMonth, endMonth, startWeek, endWeek });
    } else if (frequency === "monthly") {
      if (!(startYear && endYear && startMonth && endMonth)) {
        return toast.error("Pick your month range");
      }
      Object.assign(params, { startYear, endYear, startMonth, endMonth });
    } else if (frequency === "yearly") {
      if (!(startYear && endYear)) {
        return toast.error("Pick your year range");
      }
      Object.assign(params, { startYear, endYear });
    }

    try {
      const res = tab === "org"
        ? await getOrganizationTopPerformer(params)
        : await getDesignationTopPerformer(params);

      if (res.success && res.data) {
        if (tab === "org") setOrgPerformer(res.data);
        else setDesigPerformer(res.data);
      } else {
        toast.error(res.message || "No data found");
      }
    } catch (err) {
      toast.error(err.message || "Fetch error");
    }
  };

  // Pick the right performer and build a label for the period
  const performer = tab === "org" ? orgPerformer : desigPerformer;
  let periodLabel = "";
  if (frequency === "daily") periodLabel = startDate;
  if (frequency === "weekly")
    periodLabel = `Week ${startWeek} of ${MONTHS[Number(startMonth) - 1]} ${startYear}`;
  if (frequency === "monthly")
    periodLabel = `${MONTHS[Number(startMonth) - 1]} ${startYear}`;
  if (frequency === "yearly")
    periodLabel = `${startYear}`;

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800 mt-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FiAward className="text-2xl text-white" />
            <h2 className="text-xl font-bold text-white">Top Performer</h2>
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-1 text-white bg-white/20 hover:bg-white/30 rounded-full px-3 py-1 text-sm transition duration-300"
          >
            <FiFilter className="text-sm" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-4">
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
          <button
            onClick={() => setTab("org")}
            className={`flex-1 flex items-center justify-center py-2 px-4 text-sm font-medium rounded-lg transition-all duration-300 ${
              tab === "org"
                ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700/50"
            }`}
          >
            <BsBuilding className="mr-2" />
            Organization
          </button>
          <button
            onClick={() => setTab("desig")}
            className={`flex-1 flex items-center justify-center py-2 px-4 text-sm font-medium rounded-lg transition-all duration-300 ${
              tab === "desig"
                ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700/50"
            }`}
          >
            <MdWorkOutline className="mr-2" />
            By Designation
          </button>
        </div>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="p-4 space-y-4">
          {/* Org-only: Dept & Desig selects */}
          {tab === "org" && (
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <BsBuilding className="text-gray-400" />
                </div>
                <select
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
                  value={department}
                  onChange={e => setDepartment(e.target.value)}
                >
                  <option value="">All Departments</option>
                  {departments.map(d => (
                    <option key={d._id} value={d.department}>
                      {d.department}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <BsPerson className="text-gray-400" />
                </div>
                <select
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
                  value={designation}
                  onChange={e => setDesignation(e.target.value)}
                >
                  <option value="">All Designations</option>
                  {designations.map(d => (
                    <option key={d.id} value={d.designation}>
                      {d.designation}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Time Period
            </label>
            <div className="grid grid-cols-4 gap-2">
              {FREQUENCIES.map(f => (
                <button
                  key={f.value}
                  onClick={() => setFrequency(f.value)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border ${
                    frequency === f.value
                      ? "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-400"
                      : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  {f.icon}
                  <span className="mt-1 text-xs font-medium">{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date inputs by frequency */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
            {frequency === "daily" && (
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Daily Date
                  </label>
                  <input
                    type="date"
                    className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                  />
                </div>
         
              </div>
            )}

            {frequency === "weekly" && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Year
                    </label>
                    <input
                      type="number"
                      placeholder="Year"
                      className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
                      value={startYear}
                      onChange={e => setStartYear(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Month
                    </label>
                    <select
                      className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
                      value={startMonth}
                      onChange={e => setStartMonth(e.target.value)}
                    >
                      <option value="">Select Month</option>
                      {MONTHS.map((m, i) => (
                        <option key={m} value={String(i + 1).padStart(2, "0")}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Week
                  </label>
                  <select
                    className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
                    value={startWeek}
                    onChange={e => setStartWeek(e.target.value)}
                  >
                    <option value="">Select Week</option>
                    {startWeeks.map(w => (
                      <option key={w.value} value={w.value}>
                        {w.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {frequency === "monthly" && (
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Year
                  </label>
                  <input
                    type="number"
                    placeholder="Year"
                    className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
                    value={startYear}
                    onChange={e => setStartYear(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Month
                  </label>
                  <select
                    className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
                    value={startMonth}
                    onChange={e => setStartMonth(e.target.value)}
                  >
                    <option value="">Select Month</option>
                    {MONTHS.map((m, i) => (
                      <option key={m} value={String(i + 1).padStart(2, "0")}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {frequency === "yearly" && (
              <div className="relative">
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Year
                </label>
                <input
                  type="number"
                  placeholder="Year"
                  className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
                  value={startYear}
                  onChange={e => setStartYear(e.target.value)}
                />
              </div>
            )}
          </div>

          <button
            onClick={handleFetch}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center space-x-2"
          >
            <MdOutlineAutoGraph className="text-lg" />
            <span>Find Top Performer</span>
          </button>
        </div>
      )}

      {/* Results */}
      <div className="p-4">
        {loading && (
          <div className="text-center p-8">
            <div className="w-12 h-12 border-t-2 border-b-2 border-indigo-500 rounded-full animate-spin mx-auto"></div>
            <p className="mt-3 text-gray-500 dark:text-gray-400">Searching for stars...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-center text-red-600 dark:text-red-400">
            Error: {error}
          </div>
        )}
        
        { performer && (
        <div className="bg-indigo-950 text-white rounded-xl shadow-lg overflow-hidden relative">
          {/* Decorative stars */}
          <div className="absolute top-3 right-3">
            {/* <HiOutlineSparkles className="text-yellow-400" /> */}
          </div>
          
          <div className="p-4">
            {/* Top section with name */}
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-bold">{performer.employee.first_Name} {performer.employee.last_Name}</h3>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-bold text-indigo-300">✦ {performer.averageRating.toFixed(1)}</span>
                <span className="text-gray-400 text-sm ml-1">/ 100</span>
              </div>
            </div>
            
            {/* Employee and avatar */}
            <div className="flex items-center mb-3">
              <div className="relative mr-3">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-indigo-900 flex items-center justify-center border-2 border-indigo-800">
                  {performer.employee.user_Avatar ? (
                    <img
                      src={performer.employee.user_Avatar}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiUser className="text-2xl text-gray-400" />
                  )}
                </div>
                {/* Rating badge */}
                <div className="absolute -right-1 -bottom-1 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center border-2 border-indigo-950">
                  <span className="text-xs font-bold">{performer.averageRating.toFixed(0)}</span>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-300">
                  <div className="flex items-center">
                    <BsBuilding className="mr-1 text-xs text-gray-400" />
                    <span>{performer.employee.designation}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <BsBuilding className="mr-1 text-xs text-gray-400" />
                    <span>{performer.employee.department}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Date */}
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <BsCalendarDate className="mr-1" />
              <span>{periodLabel}</span>
            </div>
            
            {/* Action button */}
            <div className="mt-3 pt-3 border-t border-indigo-900 flex justify-end">
              <button className="flex items-center text-xs text-indigo-300 hover:text-indigo-200 transition">
                View Full Profile
                <BsChevronRight className="ml-1" />
              </button>
            </div>
          </div>
          
          {/* Back button */}
    
        </div>
      )}
      </div>
    </div>
  );
}