

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiFilter,
  FiCalendar,
  FiUsers,
  FiBriefcase,
  FiRefreshCw,
  FiChevronDown,
  FiChevronUp,
  FiAlertCircle,
  FiSearch,
  FiSettings,
  FiTrendingUp,
  FiBarChart,
  FiEye,
  FiEyeOff,
  FiDownload,
  FiShare2,
  FiClock,
  FiTarget,
} from "react-icons/fi";
import {
  HiOutlineChartBar,
  HiOutlineCalendar,
  HiOutlineOfficeBuilding,
  HiOutlineUserGroup,
} from "react-icons/hi";
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

/* Enhanced animations */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
  hover: {
    y: -4,
    scale: 1.01,
    boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)",
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 200,
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
  },
  tap: { scale: 0.95 },
};

const iconVariants = {
  initial: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.2,
    rotate: 5,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 200,
    },
  },
  tap: { scale: 0.9 },
};

/* Utility: Month options */
const MONTHS = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const FREQUENCIES = [
  {
    value: "daily",
    label: "Daily",
    icon: <FiCalendar className="w-3 h-3" />,
    description: "Day-by-day analysis",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    value: "weekly",
    label: "Weekly",
    icon: <FiBarChart className="w-3 h-3" />,
    description: "Week-by-week trends",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    value: "monthly",
    label: "Monthly",
    icon: <FiTrendingUp className="w-3 h-3" />,
    description: "Month-over-month growth",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    value: "yearly",
    label: "Yearly",
    icon: <FiTarget className="w-3 h-3" />,
    description: "Annual performance",
    gradient: "from-orange-500 to-red-500",
  },
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

const LoadingSpinner = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
  />
);

const FilterSection = ({
  title,
  icon,
  children,
  isOpen = true,
  description,
}) => {
  const [open, setOpen] = useState(isOpen);

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-lg shadow-md border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-3 focus:outline-none group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-sm">
            {icon}
          </div>
          <div className="text-left">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            {description && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
        </div>
        <div
          className={`p-1 rounded-md bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-all duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <FiChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </div>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out ${
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="px-3 pb-3">
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
/* ───────────────────────── SelectInput (fixed) ───────────────────────── */
const SelectInput = ({
  label,
  value,
  onChange,
  options,
  icon,
  className = "",
  disabled = false,
}) => (
  <div className={`mb-3 ${className}`}>
    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>

    <div className="relative">
      {/* 1️⃣  control first, sits underneath the icon */}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`relative z-0 w-full ${
          icon ? "pl-10" : "pl-3"
        } pr-3 py-2 text-sm rounded-lg
                   border border-gray-200 dark:border-gray-700
                   bg-white dark:bg-gray-800  /* removed backdrop-blur */
                   text-gray-900 dark:text-gray-100
                   focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                   transition-all duration-200
                   ${
                     disabled
                       ? "opacity-50 cursor-not-allowed"
                       : "hover:border-gray-300 dark:hover:border-gray-600"
                   }`}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      {/* 2️⃣  icon rendered second and lifted with z-10 */}
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
          <div className="text-gray-400 dark:text-gray-500">{icon}</div>
        </div>
      )}
    </div>
  </div>
);

/* ───────────────────────── DateInput (fixed) ───────────────────────── */
const DateInput = ({ label, value, onChange, className = "" }) => (
  <div className={`mb-3 ${className}`}>
    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>

    <div className="relative">
      <input
        type="date"
        value={value}
        onChange={onChange}
        className="relative z-0 w-full pl-10 pr-3 py-2 text-sm rounded-lg
                   border border-gray-200 dark:border-gray-700
                   bg-white dark:bg-gray-800
                   text-gray-900 dark:text-gray-100
                   focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                   transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
      />

      <FiCalendar className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10 w-4 h-4 text-gray-400 dark:text-gray-500" />
    </div>
  </div>
);

/* ───────────────────────── NumberInput (fixed) ───────────────────────── */
const NumberInput = ({
  label,
  value,
  onChange,
  placeholder,
  icon,
  className = "",
}) => (
  <div className={`mb-3 ${className}`}>
    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>

    <div className="relative">
      <input
        type="number"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`relative z-0 w-full ${
          icon ? "pl-10" : "pl-3"
        } pr-3 py-2 text-sm rounded-lg
                   border border-gray-200 dark:border-gray-700
                   bg-white dark:bg-gray-800
                   text-gray-900 dark:text-gray-100
                   focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                   transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600`}
      />

      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
          <div className="text-gray-400 dark:text-gray-500">{icon}</div>
        </div>
      )}
    </div>
  </div>
);


const FrequencySelector = ({ frequency, setFrequency }) => (
  <div className="mb-3">
    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
      Analysis Frequency
    </label>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
      {FREQUENCIES.map((freq) => (
        <motion.button
          key={freq.value}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => setFrequency(freq.value)}
          className={`relative p-2 rounded-lg border-2 transition-all duration-200 ${
            frequency === freq.value
              ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
              : "border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:border-gray-300 dark:hover:border-gray-600"
          }`}
        >
          <div className="flex items-center space-x-2">
            <div className={`p-1 rounded-md bg-gradient-to-r ${freq.gradient}`}>
              <div className="text-white">{freq.icon}</div>
            </div>
            <div className="text-left">
              <div
                className={`text-xs font-medium ${
                  frequency === freq.value
                    ? "text-indigo-700 dark:text-indigo-300"
                    : "text-gray-900 dark:text-gray-100"
                }`}
              >
                {freq.label}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {freq.description}
              </div>
            </div>
          </div>
          {frequency === freq.value && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full"
            />
          )}
        </motion.button>
      ))}
    </div>
  </div>
);

export default function SuperAdminDashboard() {
  /* ── Store hooks ───────────────────────────────────────── */
  const { getSuperAdminOrgAggregated, loading, error } = useRatingStore();
  const { departments, fetchDepartments } = useDepartmentStore();
  const { designations, fetchDesignations } = useDesignationStore();

  /* ── Filter state ──────────────────────────────────────── */
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [frequency, setFrequency] = useState("weekly");
  const [filtersOpen, setFiltersOpen] = useState(true);

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
      const res = await getSuperAdminOrgAggregated(params);
      if (res.success) {
        setAnalyticsData(res.data);
        // Auto-hide filters after successful API response
        setTimeout(() => {
          setFiltersOpen(false);
        }, 500); // Small delay for smooth UX
      }
    } catch {
      // error is surfaced via store
    }
  };

  /* ────────────────────────── MARKUP ─────────────────────────── */
  return (
    <div className="">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto p-2 md:p-3 lg:p-4"
      >
        {/* Enhanced Header */}
        <motion.div
          variants={cardVariants}
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-3 md:p-4 mb-4"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                  className="p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-md"
                >
                  <HiOutlineChartBar className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
                    All Emplopyee Performance Dashboard
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    Advanced analytics and insights for team performance
                    management
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-medium">
                  {departments.length} Departments
                </span>
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                  {designations.length} Designations
                </span>
                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                  Real-time Data
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
         

              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-md transition-all duration-200"
              >
                {filtersOpen ? (
                  <FiEyeOff className="w-4 h-4" />
                ) : (
                  <FiEye className="w-4 h-4" />
                )}
                {filtersOpen ? "Hide Filters" : "Show Filters"}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Filter Panel */}
        {filtersOpen && (
          <div className="mb-4 space-y-3">
            {/* Team Filters */}
            <FilterSection
              title="Employee Configuration"
              icon={<HiOutlineUserGroup className="w-4 h-4 text-white" />}
              description="Filter by department and designation"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <SelectInput
                  label="Department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  options={[
                    { value: "", label: "All Departments" },
                    ...departments.map((d) => ({
                      value: d.department,
                      label: d.department,
                    })),
                  ]}
                  icon={<HiOutlineOfficeBuilding className="w-4 h-4" />}
                />
                <SelectInput
                  label="Designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  options={[
                    { value: "", label: "All Designations" },
                    ...designations.map((d) => ({
                      value: d.designation,
                      label: d.designation,
                    })),
                  ]}
                  icon={<FiUsers className="w-4 h-4" />}
                />
              </div>
            </FilterSection>

            {/* Time Range Filters */}
            <FilterSection
              title="Time Range Analysis"
              icon={<HiOutlineCalendar className="w-4 h-4 text-white" />}
              description="Configure analysis period and frequency"
            >
              <div className="space-y-3">
                <FrequencySelector
                  frequency={frequency}
                  setFrequency={setFrequency}
                />

                {/* Dynamic filters based on frequency */}
                {frequency === "daily" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <DateInput
                      label="Start Date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <DateInput
                      label="End Date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                )}

                {frequency === "weekly" && (
                  <div className="space-y-3">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                      <h4 className="text-xs font-medium text-blue-800 dark:text-blue-200 mb-2">
                        Start Period
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <NumberInput
                          label="Year"
                          value={startYear}
                          onChange={(e) => setStartYear(e.target.value)}
                          placeholder="2024"
                          icon={<FiClock className="w-3 h-3" />}
                        />
                        <SelectInput
                          label="Month"
                          value={startMonth}
                          onChange={(e) => setStartMonth(e.target.value)}
                          options={[
                            { value: "", label: "Select Month" },
                            ...MONTHS,
                          ]}
                          icon={<FiCalendar className="w-3 h-3" />}
                        />
                        <SelectInput
                          label="Week"
                          value={startWeek}
                          onChange={(e) => setStartWeek(e.target.value)}
                          options={[
                            { value: "", label: "Select Week" },
                            ...startWeeksOptions,
                          ]}
                          disabled={!startYear || !startMonth}
                          icon={<FiBarChart className="w-3 h-3" />}
                        />
                      </div>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                      <h4 className="text-xs font-medium text-green-800 dark:text-green-200 mb-2">
                        End Period
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <NumberInput
                          label="Year"
                          value={endYear}
                          onChange={(e) => setEndYear(e.target.value)}
                          placeholder="2024"
                          icon={<FiClock className="w-3 h-3" />}
                        />
                        <SelectInput
                          label="Month"
                          value={endMonth}
                          onChange={(e) => setEndMonth(e.target.value)}
                          options={[
                            { value: "", label: "Select Month" },
                            ...MONTHS,
                          ]}
                          icon={<FiCalendar className="w-3 h-3" />}
                        />
                        <SelectInput
                          label="Week"
                          value={endWeek}
                          onChange={(e) => setEndWeek(e.target.value)}
                          options={[
                            { value: "", label: "Select Week" },
                            ...endWeeksOptions,
                          ]}
                          disabled={!endYear || !endMonth}
                          icon={<FiBarChart className="w-3 h-3" />}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {frequency === "monthly" && (
                  <div className="space-y-3">
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                      <h4 className="text-xs font-medium text-purple-800 dark:text-purple-200 mb-2">
                        Start Period
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <NumberInput
                          label="Year"
                          value={startYear}
                          onChange={(e) => setStartYear(e.target.value)}
                          placeholder="2024"
                          icon={<FiClock className="w-3 h-3" />}
                        />
                        <SelectInput
                          label="Month"
                          value={startMonth}
                          onChange={(e) => setStartMonth(e.target.value)}
                          options={[
                            { value: "", label: "Select Month" },
                            ...MONTHS,
                          ]}
                          icon={<FiCalendar className="w-3 h-3" />}
                        />
                      </div>
                    </div>

                    <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3">
                      <h4 className="text-xs font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                        End Period
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <NumberInput
                          label="Year"
                          value={endYear}
                          onChange={(e) => setEndYear(e.target.value)}
                          placeholder="2024"
                          icon={<FiClock className="w-3 h-3" />}
                        />
                        <SelectInput
                          label="Month"
                          value={endMonth}
                          onChange={(e) => setEndMonth(e.target.value)}
                          options={[
                            { value: "", label: "Select Month" },
                            ...MONTHS,
                          ]}
                          icon={<FiCalendar className="w-3 h-3" />}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {frequency === "yearly" && (
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
                    <h4 className="text-xs font-medium text-orange-800 dark:text-orange-200 mb-2">
                      Year Range
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <NumberInput
                        label="Start Year"
                        value={startYear}
                        onChange={(e) => setStartYear(e.target.value)}
                        placeholder="2020"
                        icon={<FiClock className="w-3 h-3" />}
                      />
                      <NumberInput
                        label="End Year"
                        value={endYear}
                        onChange={(e) => setEndYear(e.target.value)}
                        placeholder="2024"
                        icon={<FiClock className="w-3 h-3" />}
                      />
                    </div>
                  </div>
                )}
              </div>
            </FilterSection>

            {/* Action Panel */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-lg shadow-md border border-gray-200/50 dark:border-gray-700/50 p-3">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
                {error && (
                  <div className="flex items-center bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800">
                    <FiAlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="text-xs font-medium">{error}</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Configure filters and click analyze to generate insights
                  </div>

                  <button
                    onClick={handleFetch}
                    disabled={loading}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white shadow-md transition-all duration-200 ${
                      loading
                        ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 hover:scale-105"
                    }`}
                  >
                    {loading ? (
                      <>
                        <LoadingSpinner />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <FiTrendingUp className="w-4 h-4" />
                        Generate Analytics
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Results */}
        <AnimatePresence mode="wait">
          {analyticsData && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <PerformanceAnalytics
                data={analyticsData}
                frequency={frequency} 
                onRefresh={handleFetch}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!analyticsData && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center"
            >
              <HiOutlineChartBar className="w-8 h-8 text-white" />
            </motion.div>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Ready to Analyze Performance
            </h3>

            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 max-w-md mx-auto">
              Configure your filters above and click "Generate Analytics" to
              view comprehensive team performance insights and trends.
            </p>

            <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>Real-time data</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span>Interactive charts</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                <span>Advanced analytics</span>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
