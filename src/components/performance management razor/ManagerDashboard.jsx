


// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   FiFilter, 
//   FiCalendar, 
//   FiUsers, 
//   FiBriefcase, 
//   FiRefreshCw,
//   FiChevronDown,
//   FiChevronUp,
//   FiAlertCircle
// } from "react-icons/fi";
// import useRatingStore from "../../store/useRatingNewStore";
// import PerformanceAnalytics from "./Analytics/TeamPerformanceAnalytics";
// import useDepartmentStore from "../../store/departmentStore";
// import useDesignationStore from "../../store/designationStore";
// import {
//   startOfMonth,
//   endOfMonth,
//   eachWeekOfInterval,
//   addDays,
//   format,
//   getISOWeek,
// } from "date-fns";

// /* Utility: Month options */
// const MONTHS = [
//   { value: "1", label: "January" },
//   { value: "2", label: "February" },
//   { value: "3", label: "March" },
//   { value: "4", label: "April" },
//   { value: "5", label: "May" },
//   { value: "6", label: "June" },
//   { value: "7", label: "July" },
//   { value: "8", label: "August" },
//   { value: "9", label: "September" },
//   { value: "10", label: "October" },
//   { value: "11", label: "November" },
//   { value: "12", label: "December" },
// ];

// const FREQUENCIES = [
//   { value: "daily", label: "Daily", icon: <FiCalendar className="mr-2" /> },
//   { value: "weekly", label: "Weekly", icon: <FiCalendar className="mr-2" /> },
//   { value: "monthly", label: "Monthly", icon: <FiCalendar className="mr-2" /> },
//   { value: "yearly", label: "Yearly", icon: <FiCalendar className="mr-2" /> },
// ];

// /* ──────────────────────────────────────────────────────────
//  * Build a Monday-to-Sunday week list for a given month/year
//  * ────────────────────────────────────────────────────────── */
// function getWeeksInMonth(year, monthIndex) {
//   const start = startOfMonth(new Date(year, monthIndex, 1));
//   const end = endOfMonth(start);
//   return eachWeekOfInterval({ start, end }, { weekStartsOn: 1 }).map(
//     (weekStart, idx) => {
//       const weekEnd = addDays(weekStart, 6);
//       return {
//         value: getISOWeek(weekStart).toString(),
//         label: `Week ${idx + 1} (${format(weekStart, "MMM d")} – ${format(
//           weekEnd,
//           "MMM d"
//         )})`,
//         startDate: weekStart,
//         endDate: weekEnd,
//       };
//     }
//   );
// }

// const FilterSection = ({ title, icon, children, isOpen = true }) => {
//   const [open, setOpen] = useState(isOpen);
  
//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
//       <button 
//         onClick={() => setOpen(!open)}
//         className="w-full flex items-center justify-between p-4 focus:outline-none"
//       >
//         <div className="flex items-center">
//           {icon}
//           <h3 className="ml-2 text-lg font-medium text-gray-800 dark:text-gray-200">
//             {title}
//           </h3>
//         </div>
//         {open ? <FiChevronUp /> : <FiChevronDown />}
//       </button>
      
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.2 }}
//             className="px-4 pb-4"
//           >
//             {children}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// const SelectInput = ({ label, value, onChange, options, icon, className = "" }) => (
//   <div className={`mb-4 ${className}`}>
//     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//       {label}
//     </label>
//     <div className="relative">
//       {icon && (
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           {icon}
//         </div>
//       )}
//       <select
//         className={`w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${icon ? 'pl-10' : 'pl-3'}`}
//         value={value}
//         onChange={onChange}
//       >
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//     </div>
//   </div>
// );

// const DateInput = ({ label, value, onChange, className = "" }) => (
//   <div className={`mb-4 ${className}`}>
//     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//       {label}
//     </label>
//     <div className="relative">
//       <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//       <input
//         type="date"
//         className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//         value={value}
//         onChange={onChange}
//       />
//     </div>
//   </div>
// );

// const NumberInput = ({ label, value, onChange, placeholder, icon, className = "" }) => (
//   <div className={`mb-4 ${className}`}>
//     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//       {label}
//     </label>
//     <div className="relative">
//       {icon && (
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           {icon}
//         </div>
//       )}
//       <input
//         type="number"
//         placeholder={placeholder}
//         className={`w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
//         value={value}
//         onChange={onChange}
//       />
//     </div>
//   </div>
// );

// export default function ManagerDashboard() {
//   /* ── Store hooks ───────────────────────────────────────── */
//   const { getManagerTeamAggregated, loading, error } = useRatingStore();
//   const { departments, fetchDepartments } = useDepartmentStore();
//   const { designations, fetchDesignations } = useDesignationStore();

//   /* ── Filter state ──────────────────────────────────────── */
//   const [department, setDepartment] = useState("");
//   const [designation, setDesignation] = useState("");
//   const [frequency, setFrequency] = useState("weekly");
//   const [filtersOpen, setFiltersOpen] = useState(true);

//   /* daily */
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   /* weekly / monthly / yearly */
//   const [startYear, setStartYear] = useState("");
//   const [startMonth, setStartMonth] = useState("");
//   const [startWeek, setStartWeek] = useState("");
//   const [endYear, setEndYear] = useState("");
//   const [endMonth, setEndMonth] = useState("");
//   const [endWeek, setEndWeek] = useState("");

//   const [startWeeksOptions, setStartWeeksOptions] = useState([]);
//   const [endWeeksOptions, setEndWeeksOptions] = useState([]);

//   /* ── API response → analytics state ───────────────────── */
//   const [analyticsData, setAnalyticsData] = useState(null);

//   /* ── Load departments & designations on mount ─────────── */
//   useEffect(() => {
//     fetchDepartments();
//     fetchDesignations();
//   }, []);

//   /* ── Recompute week dropdowns when month/year changes ───── */
//   useEffect(() => {
//     if (frequency !== "weekly") return;
//     if (startYear && startMonth) {
//       const opts = getWeeksInMonth(+startYear, +startMonth - 1);
//       setStartWeeksOptions(opts);
//       if (!opts.some((w) => w.value === startWeek)) {
//         setStartWeek(opts[0]?.value || "");
//       }
//     } else {
//       setStartWeeksOptions([]);
//       setStartWeek("");
//     }
//   }, [frequency, startYear, startMonth, startWeek]);

//   useEffect(() => {
//     if (frequency !== "weekly") return;
//     if (endYear && endMonth) {
//       const opts = getWeeksInMonth(+endYear, +endMonth - 1);
//       setEndWeeksOptions(opts);
//       if (!opts.some((w) => w.value === endWeek)) {
//         setEndWeek(opts[0]?.value || "");
//       }
//     } else {
//       setEndWeeksOptions([]);
//       setEndWeek("");
//     }
//   }, [frequency, endYear, endMonth, endWeek]);

//   /* ── Build query & hit API ─────────────────────────────── */
//   const handleFetch = async () => {
//     const params = {
//       frequency,
//       ...(department && { department }),
//       ...(designation && { designation }),
//     };

//     if (frequency === "daily") {
//       Object.assign(params, { startDate, endDate });
//     }
//     if (frequency === "weekly") {
//       Object.assign(params, {
//         startYear,
//         startMonth,
//         startWeek,
//         endYear,
//         endMonth,
//         endWeek,
//       });
//     }
//     if (frequency === "monthly") {
//       Object.assign(params, { startYear, startMonth, endYear, endMonth });
//     }
//     if (frequency === "yearly") {
//       Object.assign(params, { startYear, endYear });
//     }

//     try {
//       const res = await getManagerTeamAggregated(params);
//       if (res.success) {
//         setAnalyticsData(res.data);
//       }
//     } catch {
//       // error is surfaced via store
//     }
//   };

//   /* ────────────────────────── MARKUP ─────────────────────────── */
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3 }}
//         className="max-w-7xl mx-auto"
//       >
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
//             Team Performance Dashboard
//           </h1>
//           <button
//             onClick={() => setFiltersOpen(!filtersOpen)}
//             className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//           >
//             <FiFilter className="mr-2" />
//             {filtersOpen ? "Hide Filters" : "Show Filters"}
//           </button>
//         </div>

//         {/* Filter panel */}
//         <AnimatePresence>
//           {filtersOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="mb-6"
//             >
//               <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
//                 <div className="p-4 md:p-6 space-y-6">
//                   {/* Basic Filters */}
//                   <FilterSection 
//                     title="Team Filters" 
//                     icon={<FiUsers className="text-blue-500" />}
//                   >
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <SelectInput
//                         label="Department"
//                         value={department}
//                         onChange={(e) => setDepartment(e.target.value)}
//                         options={[
//                           { value: "", label: "All Departments" },
//                           ...departments.map((d) => ({
//                             value: d.department,
//                             label: d.department,
//                           })),
//                         ]}
//                         icon={<FiBriefcase className="text-gray-400" />}
//                       />
//                       <SelectInput
//                         label="Designation"
//                         value={designation}
//                         onChange={(e) => setDesignation(e.target.value)}
//                         options={[
//                           { value: "", label: "All Designations" },
//                           ...designations.map((d) => ({
//                             value: d.designation,
//                             label: d.designation,
//                           })),
//                         ]}
//                         icon={<FiUsers className="text-gray-400" />}
//                       />
//                     </div>
//                   </FilterSection>

//                   {/* Time Filters */}
//                   <FilterSection 
//                     title="Time Range" 
//                     icon={<FiCalendar className="text-blue-500" />}
//                   >
//                     <div className="mb-4">
//                       <SelectInput
//                         label="Frequency"
//                         value={frequency}
//                         onChange={(e) => setFrequency(e.target.value)}
//                         options={FREQUENCIES}
//                       />
//                     </div>

//                     {/* Dynamic filters based on frequency */}
//                     {frequency === "daily" && (
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <DateInput
//                           label="Start Date"
//                           value={startDate}
//                           onChange={(e) => setStartDate(e.target.value)}
//                         />
//                         <DateInput
//                           label="End Date"
//                           value={endDate}
//                           onChange={(e) => setEndDate(e.target.value)}
//                         />
//                       </div>
//                     )}

//                     {frequency === "weekly" && (
//                       <div className="space-y-6">
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                           <NumberInput
//                             label="Start Year"
//                             value={startYear}
//                             onChange={(e) => setStartYear(e.target.value)}
//                             placeholder="2023"
//                           />
//                           <SelectInput
//                             label="Start Month"
//                             value={startMonth}
//                             onChange={(e) => setStartMonth(e.target.value)}
//                             options={[
//                               { value: "", label: "Select Month" },
//                               ...MONTHS,
//                             ]}
//                           />
//                           <SelectInput
//                             label="Start Week"
//                             value={startWeek}
//                             onChange={(e) => setStartWeek(e.target.value)}
//                             options={startWeeksOptions}
//                             disabled={!startYear || !startMonth}
//                           />
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                           <NumberInput
//                             label="End Year"
//                             value={endYear}
//                             onChange={(e) => setEndYear(e.target.value)}
//                             placeholder="2023"
//                           />
//                           <SelectInput
//                             label="End Month"
//                             value={endMonth}
//                             onChange={(e) => setEndMonth(e.target.value)}
//                             options={[
//                               { value: "", label: "Select Month" },
//                               ...MONTHS,
//                             ]}
//                           />
//                           <SelectInput
//                             label="End Week"
//                             value={endWeek}
//                             onChange={(e) => setEndWeek(e.target.value)}
//                             options={endWeeksOptions}
//                             disabled={!endYear || !endMonth}
//                           />
//                         </div>
//                       </div>
//                     )}

//                     {frequency === "monthly" && (
//                       <div className="space-y-6">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                           <NumberInput
//                             label="Start Year"
//                             value={startYear}
//                             onChange={(e) => setStartYear(e.target.value)}
//                             placeholder="2023"
//                           />
//                           <SelectInput
//                             label="Start Month"
//                             value={startMonth}
//                             onChange={(e) => setStartMonth(e.target.value)}
//                             options={[
//                               { value: "", label: "Select Month" },
//                               ...MONTHS,
//                             ]}
//                           />
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                           <NumberInput
//                             label="End Year"
//                             value={endYear}
//                             onChange={(e) => setEndYear(e.target.value)}
//                             placeholder="2023"
//                           />
//                           <SelectInput
//                             label="End Month"
//                             value={endMonth}
//                             onChange={(e) => setEndMonth(e.target.value)}
//                             options={[
//                               { value: "", label: "Select Month" },
//                               ...MONTHS,
//                             ]}
//                           />
//                         </div>
//                       </div>
//                     )}

//                     {frequency === "yearly" && (
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <NumberInput
//                           label="Start Year"
//                           value={startYear}
//                           onChange={(e) => setStartYear(e.target.value)}
//                           placeholder="2020"
//                         />
//                         <NumberInput
//                           label="End Year"
//                           value={endYear}
//                           onChange={(e) => setEndYear(e.target.value)}
//                           placeholder="2023"
//                         />
//                       </div>
//                     )}
//                   </FilterSection>

//                   {/* Action Buttons */}
//                   <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
//                     {error && (
//                       <div className="flex items-center text-red-500 mb-4 sm:mb-0">
//                         <FiAlertCircle className="mr-2" />
//                         <span>{error}</span>
//                       </div>
//                     )}
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handleFetch}
//                       disabled={loading}
//                       className={`px-6 py-3 rounded-lg font-medium flex items-center ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors shadow-md`}
//                     >
//                       {loading ? (
//                         <>
//                           <FiRefreshCw className="animate-spin mr-2" />
//                           Loading...
//                         </>
//                       ) : (
//                         <>
//                           <FiFilter className="mr-2" />
//                           Apply Filters
//                         </>
//                       )}
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Analytics */}
//         <AnimatePresence>
//           {analyticsData && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 20 }}
//               transition={{ duration: 0.3 }}
//             >
//               <PerformanceAnalytics data={analyticsData} />
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </div>
//   );
// }

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
  FiTarget
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
    icon: <FiCalendar className="w-4 h-4" />,
    description: "Day-by-day analysis",
    gradient: "from-blue-500 to-cyan-500"
  },
  { 
    value: "weekly", 
    label: "Weekly", 
    icon: <FiBarChart className="w-4 h-4" />,
    description: "Week-by-week trends",
    gradient: "from-green-500 to-emerald-500"
  },
  { 
    value: "monthly", 
    label: "Monthly", 
    icon: <FiTrendingUp className="w-4 h-4" />,
    description: "Month-over-month growth",
    gradient: "from-purple-500 to-indigo-500"
  },
  { 
    value: "yearly", 
    label: "Yearly", 
    icon: <FiTarget className="w-4 h-4" />,
    description: "Annual performance",
    gradient: "from-orange-500 to-red-500"
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
    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
  />
);

const FilterSection = ({ title, icon, children, isOpen = true, description }) => {
  const [open, setOpen] = useState(isOpen);
  
  return (
    <motion.div 
      variants={cardVariants}
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
    >
      <motion.button 
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 focus:outline-none group"
      >
        <div className="flex items-center space-x-4">
          <motion.div
            variants={iconVariants}
            whileHover="hover"
            className="p-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-lg"
          >
            {icon}
          </motion.div>
          <div className="text-left">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {description}
              </p>
            )}
          </div>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700"
        >
          <FiChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </motion.div>
      </motion.button>
      
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="px-6 pb-6"
          >
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SelectInput = ({ label, value, onChange, options, icon, className = "", disabled = false }) => (
  <div className={`mb-6 ${className}`}>
    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
      {label}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <div className="text-gray-400 dark:text-gray-500">
            {icon}
          </div>
        </div>
      )}
      <select
        disabled={disabled}
        className={`w-full ${icon ? 'pl-12' : 'pl-4'} pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-300 dark:hover:border-gray-600'}`}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);

const DateInput = ({ label, value, onChange, className = "" }) => (
  <div className={`mb-6 ${className}`}>
    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
      {label}
    </label>
    <div className="relative">
      <FiCalendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
      <input
        type="date"
        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

const NumberInput = ({ label, value, onChange, placeholder, icon, className = "" }) => (
  <div className={`mb-6 ${className}`}>
    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
      {label}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <div className="text-gray-400 dark:text-gray-500">
            {icon}
          </div>
        </div>
      )}
      <input
        type="number"
        placeholder={placeholder}
        className={`w-full ${icon ? 'pl-12' : 'pl-4'} pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600`}
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

const FrequencySelector = ({ frequency, setFrequency }) => (
  <div className="mb-6">
    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
      Analysis Frequency
    </label>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {FREQUENCIES.map((freq) => (
        <motion.button
          key={freq.value}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => setFrequency(freq.value)}
          className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
            frequency === freq.value
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
              : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:border-gray-300 dark:hover:border-gray-600'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${freq.gradient}`}>
              <div className="text-white">
                {freq.icon}
              </div>
            </div>
            <div className="text-left">
              <div className={`font-medium ${frequency === freq.value ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-900 dark:text-gray-100'}`}>
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
              className="absolute top-2 right-2 w-3 h-3 bg-indigo-500 rounded-full"
            />
          )}
        </motion.button>
      ))}
    </div>
  </div>
);

export default function ManagerDashboard() {
  /* ── Store hooks ───────────────────────────────────────── */
  const { getManagerTeamAggregated, loading, error } = useRatingStore();
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8"
      >
        {/* Enhanced Header */}
        <motion.div 
          variants={cardVariants}
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 md:p-8 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                  className="p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-lg"
                >
                  <HiOutlineChartBar className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
                    Team Performance Dashboard
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
                    Advanced analytics and insights for team performance management
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
                  {departments.length} Departments
                </span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                  {designations.length} Designations
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                  Real-time Data
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl text-gray-600 dark:text-gray-400 transition-colors"
                >
                  <FiDownload className="w-5 h-5" />
                </motion.button>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl text-gray-600 dark:text-gray-400 transition-colors"
                >
                  <FiShare2 className="w-5 h-5" />
                </motion.button>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl text-gray-600 dark:text-gray-400 transition-colors"
                >
                  <FiSettings className="w-5 h-5" />
                </motion.button>
              </div>
              
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="flex items-center gap-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition-all duration-200"
              >
                {filtersOpen ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                {filtersOpen ? "Hide Filters" : "Show Filters"}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Filter Panel */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="mb-8 space-y-6"
            >
              {/* Team Filters */}
              <FilterSection 
                title="Team Configuration" 
                icon={<HiOutlineUserGroup className="w-6 h-6 text-white" />}
                description="Filter by department and designation"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    icon={<HiOutlineOfficeBuilding className="w-5 h-5" />}
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
                    icon={<FiUsers className="w-5 h-5" />}
                  />
                </div>
              </FilterSection>

              {/* Time Range Filters */}
              <FilterSection 
                title="Time Range Analysis" 
                icon={<HiOutlineCalendar className="w-6 h-6 text-white" />}
                description="Configure analysis period and frequency"
              >
                <div className="space-y-6">
                  <FrequencySelector frequency={frequency} setFrequency={setFrequency} />

                  {/* Dynamic filters based on frequency */}
                  {frequency === "daily" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                    >
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
                    </motion.div>
                  )}

                  {frequency === "weekly" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                        <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-4">Start Period</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <NumberInput
                            label="Year"
                            value={startYear}
                            onChange={(e) => setStartYear(e.target.value)}
                            placeholder="2024"
                            icon={<FiClock className="w-4 h-4" />}
                          />
                          <SelectInput
                            label="Month"
                            value={startMonth}
                            onChange={(e) => setStartMonth(e.target.value)}
                            options={[
                              { value: "", label: "Select Month" },
                              ...MONTHS,
                            ]}
                            icon={<FiCalendar className="w-4 h-4" />}
                          />
                          <SelectInput
                            label="Week"
                            value={startWeek}
                            onChange={(e) => setStartWeek(e.target.value)}
                            options={[
                              { value: "", label: "Select Week" },
                              ...startWeeksOptions
                            ]}
                            disabled={!startYear || !startMonth}
                            icon={<FiBarChart className="w-4 h-4" />}
                          />
                        </div>
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                        <h4 className="font-medium text-green-800 dark:text-green-200 mb-4">End Period</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <NumberInput
                            label="Year"
                            value={endYear}
                            onChange={(e) => setEndYear(e.target.value)}
                            placeholder="2024"
                            icon={<FiClock className="w-4 h-4" />}
                          />
                          <SelectInput
                            label="Month"
                            value={endMonth}
                            onChange={(e) => setEndMonth(e.target.value)}
                            options={[
                              { value: "", label: "Select Month" },
                              ...MONTHS,
                            ]}
                            icon={<FiCalendar className="w-4 h-4" />}
                          />
                          <SelectInput
                            label="Week"
                            value={endWeek}
                            onChange={(e) => setEndWeek(e.target.value)}
                            options={[
                              { value: "", label: "Select Week" },
                              ...endWeeksOptions
                            ]}
                            disabled={!endYear || !endMonth}
                            icon={<FiBarChart className="w-4 h-4" />}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {frequency === "monthly" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
                        <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-4">Start Period</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <NumberInput
                            label="Year"
                            value={startYear}
                            onChange={(e) => setStartYear(e.target.value)}
                            placeholder="2024"
                            icon={<FiClock className="w-4 h-4" />}
                          />
                          <SelectInput
                            label="Month"
                            value={startMonth}
                            onChange={(e) => setStartMonth(e.target.value)}
                            options={[
                              { value: "", label: "Select Month" },
                              ...MONTHS,
                            ]}
                            icon={<FiCalendar className="w-4 h-4" />}
                          />
                        </div>
                      </div>
                      
                      <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4">
                        <h4 className="font-medium text-indigo-800 dark:text-indigo-200 mb-4">End Period</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <NumberInput
                            label="Year"
                            value={endYear}
                            onChange={(e) => setEndYear(e.target.value)}
                            placeholder="2024"
                            icon={<FiClock className="w-4 h-4" />}
                          />
                          <SelectInput
                            label="Month"
                            value={endMonth}
                            onChange={(e) => setEndMonth(e.target.value)}
                            options={[
                              { value: "", label: "Select Month" },
                              ...MONTHS,
                            ]}
                            icon={<FiCalendar className="w-4 h-4" />}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {frequency === "yearly" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4"
                    >
                      <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-4">Year Range</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <NumberInput
                          label="Start Year"
                          value={startYear}
                          onChange={(e) => setStartYear(e.target.value)}
                          placeholder="2020"
                          icon={<FiClock className="w-4 h-4" />}
                        />
                        <NumberInput
                          label="End Year"
                          value={endYear}
                          onChange={(e) => setEndYear(e.target.value)}
                          placeholder="2024"
                          icon={<FiClock className="w-4 h-4" />}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              </FilterSection>

              {/* Action Panel */}
              <motion.div 
                variants={cardVariants}
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6"
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl border border-red-200 dark:border-red-800"
                    >
                      <FiAlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span className="text-sm font-medium">{error}</span>
                    </motion.div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Configure filters and click analyze to generate insights
                    </div>
                    
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={handleFetch}
                      disabled={loading}
                      className={`flex items-center gap-3 px-8 py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-200 ${
                        loading 
                          ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600'
                      }`}
                    >
                      {loading ? (
                        <>
                          <LoadingSpinner />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <FiTrendingUp className="w-5 h-5" />
                          Generate Analytics
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-12 text-center"
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
              className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center"
            >
              <HiOutlineChartBar className="w-12 h-12 text-white" />
            </motion.div>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Analyze Performance
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Configure your filters above and click "Generate Analytics" to view comprehensive team performance insights and trends.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Real-time data</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Interactive charts</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Advanced analytics</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 text-center"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Last updated: {new Date().toLocaleString()}
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span>© 2025 Team Performance Dashboard</span>
              <span>•</span>
              <span>Advanced Analytics Platform</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}