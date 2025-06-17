import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ResponsiveTable from "./ResponsiveTable";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  LabelList,
  ScatterChart,
  Scatter,
} from "recharts";
import {
  FiTrendingUp,
  FiTarget,
  FiActivity,
  FiPieChart,
  FiCalendar,
  FiMaximize2,
  FiMinimize2,
  FiFilter,
  FiRefreshCw,
  FiUsers,
  FiBarChart2,
  FiTrendingDown,
  FiEye,
  FiEyeOff,
  FiSettings,
  FiDownload,
  FiShare2,
  FiSearch,
  FiGrid,
  FiList,
  FiArrowUp,
  FiArrowDown,
  FiMinus,
  FiChevronRight,
  FiChevronDown,
} from "react-icons/fi";
import {
  HiOutlineChartBar,
  HiOutlineChartPie,
  HiOutlineChartSquareBar,
  HiOutlineTrendingUp,
  HiOutlineTrendingDown,
  HiOutlineViewGrid,
  HiOutlineViewList,
} from "react-icons/hi";
import {
  RiLineChartLine,
  RiBarChartLine,
  RiPieChartLine,
} from "react-icons/ri";

// Enhanced color palette with better contrast
const COLORS = [
  "#6366F1", // Indigo
  "#10B981", // Emerald  
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#8B5CF6", // Violet
  "#06B6D4", // Cyan
  "#F97316", // Orange
  "#84CC16", // Lime
  "#EC4899", // Pink
  "#14B8A6", // Teal
  "#3B82F6", // Blue
  "#F43F5E", // Rose
  "#A855F7", // Purple
  "#22C55E", // Green
  "#EAB308", // Yellow
];

// Improved gradients for better visibility
const GRADIENTS = {
  primary: "from-indigo-500 via-purple-500 to-pink-500",
  success: "from-emerald-400 via-cyan-400 to-blue-500",
  warning: "from-amber-400 via-orange-400 to-red-500",
  info: "from-blue-400 via-purple-400 to-indigo-500",
  danger: "from-red-400 via-pink-400 to-rose-500",
  dark: "from-gray-700 via-gray-800 to-black",
};

// Enhanced animation variants
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
    rotateX: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    rotateX: 2,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 200,
    },
  },
};

const iconVariants = {
  initial: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.2,
    rotate: 360,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 200,
    },
  },
  tap: { scale: 0.9 },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
  },
  tap: { scale: 0.95 },
};

// Helper function to detect period type from period label
const detectPeriodType = (periodLabel) => {
  if (!periodLabel) return 'Unknown';
  if (periodLabel.includes('W')) return 'Weekly';
  if (periodLabel.includes('-') && periodLabel.length === 10) return 'Daily';
  if (periodLabel.length === 7) return 'Monthly';
  if (periodLabel.length === 4) return 'Yearly';
  return 'Custom';
};

// Helper function to format period labels for better readability
const formatPeriodLabel = (period, type) => {
  if (type === 'Weekly' && period.includes('W')) {
    const [year, week] = period.split('-W');
    return `Week ${week}, ${year}`;
  }
  if (type === 'Daily') {
    try {
      return new Date(period).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return period;
    }
  }
  if (type === 'Monthly') {
    try {
      const [year, month] = period.split('-');
      const date = new Date(year, month - 1);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      });
    } catch {
      return period;
    }
  }
  return period;
};

// Enhanced reusable components
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  // Detect chart type from payload to customize tooltip
  const hasPercentage = payload.some(p => p.name?.includes('%') || p.name?.includes('Percent'));
  const hasScore = payload.some(p => p.name?.includes('Score'));
  const hasTarget = payload.some(p => p.name?.includes('Target'));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 10 }}
      className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 text-sm max-w-sm"
    >
      {/* Header with period/label */}
      <div className="flex items-center space-x-2 mb-3">
        <div className="p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg">
          <FiCalendar className="w-3 h-3 text-white" />
        </div>
        <p className="font-semibold text-gray-900 dark:text-white">
          {label}
        </p>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 gap-3 mb-3">
        {payload.map((p, i) => {
          const value = typeof p.value === "number" ? p.value.toLocaleString() : p.value;
          const unit = p.unit || (p.name?.includes('%') ? '%' : '');
          
          return (
            <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: p.color }}
                  />
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {p.name}
                  </span>
                </div>
                {/* Performance indicator */}
                {hasPercentage && typeof p.value === "number" && (
                  <div className="flex items-center space-x-1">
                    {p.value >= 80 ? (
                      <FiTrendingUp className="w-3 h-3 text-green-500" />
                    ) : p.value >= 60 ? (
                      <FiTarget className="w-3 h-3 text-blue-500" />
                    ) : (
                      <FiTrendingDown className="w-3 h-3 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-baseline space-x-1">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {value}
                </span>
                {unit && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {unit}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary/insights */}
      {hasTarget && payload.length >= 2 && (
        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {(() => {
              const targetItem = payload.find(p => p.name?.includes('Target'));
              const achievedItem = payload.find(p => p.name?.includes('Achieved'));
              if (targetItem && achievedItem && typeof targetItem.value === 'number' && typeof achievedItem.value === 'number') {
                const percentage = ((achievedItem.value / targetItem.value) * 100).toFixed(1);
                return (
                  <div className="flex items-center justify-between">
                    <span>Achievement Rate:</span>
                    <span className={`font-medium ${
                      parseFloat(percentage) >= 100 ? 'text-green-600 dark:text-green-400' :
                      parseFloat(percentage) >= 80 ? 'text-blue-600 dark:text-blue-400' :
                      'text-red-600 dark:text-red-400'
                    }`}>
                      {percentage}%
                    </span>
                  </div>
                );
              }
              return null;
            })()}
          </div>
        </div>
      )}
    </motion.div>
  );
};

const ScatterTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { period, target, achieved } = payload[0].payload;

  // Calculate achievement rate
  const achievementRate = target > 0 ? ((achieved / target) * 100).toFixed(1) : 0;
  const isOverAchieved = achieved > target;
  const variance = achieved - target;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 10 }}
      className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 text-sm max-w-sm"
    >
      {/* Header */}
      <div className="flex items-center space-x-2 mb-3">
        <div className="p-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-lg">
          <FiTarget className="w-3 h-3 text-white" />
        </div>
        <p className="font-semibold text-gray-900 dark:text-white">
          {period}
        </p>
      </div>

      {/* Target vs Achieved Grid */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
          <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">Target</p>
          <p className="text-lg font-bold text-blue-800 dark:text-blue-200">
            {target?.toLocaleString()}
          </p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
          <p className="text-xs text-green-600 dark:text-green-400 mb-1">Achieved</p>
          <p className="text-lg font-bold text-green-800 dark:text-green-200">
            {achieved?.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Achievement Rate
          </span>
          <div className="flex items-center space-x-1">
            {isOverAchieved ? (
              <FiTrendingUp className="w-3 h-3 text-green-500" />
            ) : (
              <FiTrendingDown className="w-3 h-3 text-red-500" />
            )}
            <span className={`font-bold text-sm ${
              isOverAchieved 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {achievementRate}%
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Variance
          </span>
          <span className={`font-medium text-sm ${
            variance >= 0 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-red-600 dark:text-red-400'
          }`}>
            {variance >= 0 ? '+' : ''}{variance?.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Performance Category */}
      <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            achievementRate >= 100 
              ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
              : achievementRate >= 80
              ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
              : 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'
          }`}>
            {achievementRate >= 100 ? 'Exceeds Target' : 
             achievementRate >= 80 ? 'Near Target' : 'Below Target'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const EmptyState = ({
  icon: Icon,
  title = "No data available",
  description = "Data will appear here once available",
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center h-full min-h-[200px] text-gray-400 dark:text-gray-500"
  >
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl mb-4"
    >
      <Icon className="w-12 h-12" />
    </motion.div>
    <h3 className="font-medium text-lg mb-2">{title}</h3>
    <p className="text-sm text-center max-w-xs">{description}</p>
  </motion.div>
);

const LoadingSpinner = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
  />
);

const ChartCard = ({
  title,
  icon: Icon,
  isExpanded,
  onToggle,
  children,
  actions,
  className = "",
  isLoading = false,
}) => (
  <motion.div
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    whileHover="hover"
    className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden ${
      isExpanded ? "col-span-full" : ""
    } ${className}`}
  >
    <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-800">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <motion.div
            variants={iconVariants}
            whileHover="hover"
            whileTap="tap"
            className="p-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-lg"
          >
            <Icon className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
              {title}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Interactive analytics
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {actions}
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={onToggle}
            className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isExpanded ? <FiMinimize2 size={20} /> : <FiMaximize2 size={20} />}
          </motion.button>
        </div>
      </div>
    </div>
    <div
      className="p-4 sm:p-6"
      style={{ height: isExpanded ? "32rem" : "24rem" }}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center h-full"
          >
            <LoadingSpinner />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </motion.div>
);

const StatCard = ({
  title,
  value,
  icon: Icon,
  gradient,
  trend,
  trendValue,
  subtitle,
  onClick,
}) => (
  <motion.div
    variants={cardVariants}
    whileHover="hover"
    whileTap={onClick ? "tap" : undefined}
    onClick={onClick}
    className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 ${
      onClick ? "cursor-pointer" : ""
    }`}
  >
    <div className="flex justify-between items-start mb-4">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
          {title}
        </p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          {value}
        </p>
        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        )}
      </div>
      <motion.div
        variants={iconVariants}
        whileHover="hover"
        className={`p-4 bg-gradient-to-r ${gradient} rounded-2xl shadow-lg`}
      >
        <Icon className="w-6 h-6 text-white" />
      </motion.div>
    </div>

    {trend && (
      <div className="flex items-center space-x-2">
        <div
          className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            trend === "up"
              ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400"
              : trend === "down"
              ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400"
              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          {trend === "up" && <FiArrowUp className="w-3 h-3" />}
          {trend === "down" && <FiArrowDown className="w-3 h-3" />}
          {trend === "stable" && <FiMinus className="w-3 h-3" />}
          <span>{trendValue}</span>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          vs last period
        </span>
      </div>
    )}
  </motion.div>
);

// const ResponsiveTable = ({
//   headers,
//   rows,
//   rowRenderer,
//   searchable = false,
// }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [viewMode, setViewMode] = useState("table"); // table or cards

//   const filteredRows = useMemo(() => {
//     if (!searchTerm) return rows;
//     return rows.filter((row) =>
//       rowRenderer(row).some((cell) =>
//         String(cell).toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//   }, [rows, searchTerm, rowRenderer]);

//   return (
//     <div className="space-y-4">
//       {searchable && (
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div className="relative flex-1 max-w-md">
//             <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//             />
//           </div>
//           <div className="flex items-center space-x-2">
//             <motion.button
//               variants={buttonVariants}
//               whileHover="hover"
//               whileTap="tap"
//               onClick={() => setViewMode("table")}
//               className={`p-2 rounded-lg ${
//                 viewMode === "table"
//                   ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400"
//                   : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
//               }`}
//             >
//               <HiOutlineViewList className="w-5 h-5" />
//             </motion.button>
//             <motion.button
//               variants={buttonVariants}
//               whileHover="hover"
//               whileTap="tap"
//               onClick={() => setViewMode("cards")}
//               className={`p-2 rounded-lg ${
//                 viewMode === "cards"
//                   ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400"
//                   : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
//               }`}
//             >
//               <HiOutlineViewGrid className="w-5 h-5" />
//             </motion.button>
//           </div>
//         </div>
//       )}

//       {viewMode === "table" ? (
//         <div className="overflow-x-auto rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
//           <table className="min-w-full divide-y divide-gray-200/50 dark:divide-gray-700/50">
//             <thead className="bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm">
//               <tr>
//                 {headers.map((header, idx) => (
//                   <th
//                     key={idx}
//                     className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
//                   >
//                     {header}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm divide-y divide-gray-200/50 dark:divide-gray-700/50">
//               <AnimatePresence>
//                 {filteredRows.map((row, rowIdx) => (
//                   <motion.tr
//                     key={rowIdx}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ delay: rowIdx * 0.05 }}
//                     className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
//                   >
//                     {rowRenderer(row).map((cell, cellIdx) => (
//                       <td
//                         key={cellIdx}
//                         className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
//                       >
//                         {cell}
//                       </td>
//                     ))}
//                   </motion.tr>
//                 ))}
//               </AnimatePresence>
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           <AnimatePresence>
//             {filteredRows.map((row, rowIdx) => {
//               const cells = rowRenderer(row);
//               return (
//                 <motion.div
//                   key={rowIdx}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.9 }}
//                   transition={{ delay: rowIdx * 0.05 }}
//                   className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50"
//                 >
//                   {headers.map((header, idx) => (
//                     <div key={idx} className="mb-2 last:mb-0">
//                       <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                         {header}:
//                       </span>
//                       <div className="text-sm font-medium text-gray-900 dark:text-white mt-1">
//                         {cells[idx]}
//                       </div>
//                     </div>
//                   ))}
//                 </motion.div>
//               );
//             })}
//           </AnimatePresence>
//         </div>
//       )}
//     </div>
//   );
// };




export default function PerformanceAnalytics({ data, onRefresh }) {
  const {
    chart = [],
    aggregatedTeam = [],
    categories = [], // Keep this for backward compatibility
    avgKpi = [],
    scatter = [],
    avgDailyKpi = [],
    buckets = [],
    employees = [],
    top = [],
    bottom = [],
    heatmap = [],
    movingAverage = [],
    periodChange = [],
  } = data || {};

  // Debug logging to check what data we're getting
  console.log('Debug - Full data object:', data);
  console.log('Debug - Categories from destructuring:', categories);

  const [expanded, setExpanded] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState("dashboard");
  const [selectedMetric, setSelectedMetric] = useState("all");

  const toggle = (id) => setExpanded(expanded === id ? null : id);

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await onRefresh?.();
    } finally {
      setIsLoading(false);
    }
  };

  // Sort employees by performance (highest to lowest)
  const sortedEmployees = useMemo(() => {
    return [...employees].sort((a, b) => b.averageRating - a.averageRating);
  }, [employees]);

  // Sort heatmap data by average performance (highest to lowest)
  const sortedHeatmap = useMemo(() => {
    return [...heatmap].sort((a, b) => {
      const avgA = a.data.reduce((sum, d) => sum + (d.normalizedScore || 0), 0) / a.data.length;
      const avgB = b.data.reduce((sum, d) => sum + (d.normalizedScore || 0), 0) / b.data.length;
      return avgB - avgA;
    });
  }, [heatmap]);

  // Enhanced data processing for category distribution
  const categoryDistributionData = useMemo(() => {
    console.log('Debug - Processing categories data:', categories);
    
    return (categories || []).map((cat) => ({
      category: cat.category,
      value: cat.value,
      periods: cat.periods || [],
      // Add additional metadata for better tooltips
      periodCount: cat.periods?.length || 0,
      periodType: detectPeriodType(cat.periods?.[0] || ''),
    }));
  }, [categories]);

  const categoryMap = useMemo(() => {
    const map = {};
    aggregatedTeam.forEach((p) => {
      const cat = p.summary?.category;
      if (cat) {
        if (!map[cat]) map[cat] = [];
        map[cat].push(p.periodLabel);
      }
    });
    return map;
  }, [aggregatedTeam]);

  const mvData = useMemo(
    () =>
      chart.map((c, i) => ({
        period: c.period,
        movingAverage: movingAverage[i] ?? 0,
        periodChange: periodChange[i] ?? 0,
      })),
    [chart, movingAverage, periodChange]
  );

  const bucketsWithPeriods = useMemo(() => {
    const b = buckets.map((bkt) => ({
      ...bkt,
      periods: [],
    }));
    chart.forEach((d) => {
      const idx = Math.min(
        Math.floor((d.normalizedScore || 0) / 10),
        buckets.length - 1
      );
      if (idx >= 0 && b[idx]) {
        b[idx].periods.push(d.period);
      }
    });
    return b;
  }, [buckets, chart]);

  // Enhanced summary calculations
  const totalScore = chart.reduce((s, c) => s + (c.totalScore || 0), 0);
  const avgPerf = chart.length > 0
      ? Math.round(
          (chart.reduce((sum, c) => sum + (c.percentOfTarget || 0), 0) /
            chart.length) *
           10
       ) / 10
      : 0; // average percentOfTarget, rounded to 1 decimal
 
  const best = chart.reduce(
    (b, c) => (c.percentOfTarget > (b.percentOfTarget || 0) ? c : b),
    {}
  );

  const performanceTrend =
    chart.length >= 2
      ? chart[chart.length - 1].percentOfTarget -
        chart[chart.length - 2].percentOfTarget
      : 0;

  return (
    <div className="min-h-screen ">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 p-4 sm:p-6 lg:p-8"
      >
        {/* Enhanced Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard
            title="Total Score"
            value={totalScore.toLocaleString()}
            icon={FiTrendingUp}
            gradient={GRADIENTS.primary}
            trend={
              performanceTrend > 0
                ? "up"
                : performanceTrend < 0
                ? "down"
                : "stable"
            }
            trendValue={`${Math.abs(performanceTrend).toFixed(1)}%`}
            subtitle="Cumulative performance"
          />
          <StatCard
            title="Average Performance"
            value={`${avgPerf}%`}
            icon={FiTarget}
            gradient={GRADIENTS.success}
            trend={avgPerf >= 80 ? "up" : avgPerf >= 60 ? "stable" : "down"}
            trendValue={`${
              avgPerf >= 80
                ? "Excellent"
                : avgPerf >= 60
                ? "Good"
                : "Needs Improvement"
            }`}
            subtitle="Of target achieved"
          />
          <StatCard
            title="Best Period"
            value={best.period || "—"}
            icon={FiActivity}
            gradient={GRADIENTS.warning}
            trend="up"
            trendValue={`${best.percentOfTarget || 0}%`}
            subtitle="Peak performance"
          />
          <StatCard
            title="Team Members"
            value={employees.length}
            icon={FiUsers}
            gradient={GRADIENTS.info}
            subtitle="Active employees"
          />
        </div>

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Performance Trends */}
          <ChartCard
            title="Performance Trends"
            icon={RiLineChartLine}
            isExpanded={expanded === "trends"}
            onToggle={() => toggle("trends")}
            actions={
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {/* <FiEye className="w-4 h-4" /> */}
              </motion.button>
            }
          >
            {chart.length === 0 ? (
              <EmptyState
                icon={RiLineChartLine}
                title="No trend data"
                description="Performance trends will be displayed here once data is available"
              />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chart}>
                  <defs>
                    <linearGradient
                      id="scoreGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={COLORS[0]}
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="50%"
                        stopColor={COLORS[0]}
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="95%"
                        stopColor={COLORS[0]}
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                    <linearGradient
                      id="targetGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={COLORS[1]}
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="50%"
                        stopColor={COLORS[1]}
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="95%"
                        stopColor={COLORS[1]}
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                    {/* Glow effects */}
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    strokeOpacity={0.3}
                  />
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="circle"
                  />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="totalScore"
                    fill="url(#scoreGradient)"
                    stroke="none"
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="percentOfTarget"
                    fill="url(#targetGradient)"
                    stroke="none"
                  />
                  <Line
                    yAxisId="left"
                    dataKey="totalScore"
                    name="Total Score"
                    stroke={COLORS[0]}
                    strokeWidth={4}
                    filter="url(#glow)"
                    dot={{ 
                      r: 6, 
                      strokeWidth: 3, 
                      fill: "#fff",
                      stroke: COLORS[0]
                    }}
                    activeDot={{ 
                      r: 8, 
                      strokeWidth: 3,
                      fill: COLORS[0],
                      stroke: "#fff"
                    }}
                  />
                  <Line
                    yAxisId="right"
                    dataKey="percentOfTarget"
                    name="% of Target"
                    stroke={COLORS[1]}
                    strokeWidth={4}
                    filter="url(#glow)"
                    dot={{ 
                      r: 6, 
                      strokeWidth: 3, 
                      fill: "#fff",
                      stroke: COLORS[1]
                    }}
                    activeDot={{ 
                      r: 8, 
                      strokeWidth: 3,
                      fill: COLORS[1],
                      stroke: "#fff"
                    }}
                    unit="%"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </ChartCard>

          {/* Target vs Achieved */}
          <ChartCard
            title="Target vs Achieved"
            icon={HiOutlineChartSquareBar}
            isExpanded={expanded === "comparison"}
            onToggle={() => toggle("comparison")}
          >
            {chart.length === 0 ? (
              <EmptyState
                icon={HiOutlineChartSquareBar}
                title="No comparison data"
                description="Target vs achieved metrics will appear here"
              />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chart} margin={{ top: 20 }}>
                  <defs>
                    <linearGradient id="targetBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                    <linearGradient id="achievedBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="50%" stopColor="#059669" />
                      <stop offset="100%" stopColor="#047857" />
                    </linearGradient>
                    {/* Shadow effect */}
                    <filter id="dropshadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.1"/>
                    </filter>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    strokeOpacity={0.3}
                  />
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="rect"
                  />
                  <Bar
                    dataKey="totalTarget"
                    name="Target"
                    fill="url(#targetBar)"
                    radius={[6, 6, 0, 0]}
                    filter="url(#dropshadow)"
                  >
                    <LabelList
                      dataKey="totalTarget"
                      position="top"
                      formatter={(v) => v.toLocaleString()}
                      fontSize={10}
                      fill="#6B7280"
                    />
                  </Bar>
                  <Bar
                    dataKey="totalAchieved"
                    name="Achieved"
                    fill="url(#achievedBar)"
                    radius={[6, 6, 0, 0]}
                    filter="url(#dropshadow)"
                  >
                    <LabelList
                      dataKey="totalAchieved"
                      position="top"
                      formatter={(v) => v.toLocaleString()}
                      fontSize={10}
                      fill="#6B7280"
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </div>

        {/* Secondary Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Distribution */}
          <ChartCard
            title="Performance Distribution"
            icon={RiLineChartLine}
            isExpanded={expanded === "performance"}
            onToggle={() => toggle("performance")}
          >
            {chart.length === 0 ? (
              <EmptyState
                icon={RiLineChartLine}
                title="No distribution data"
                description="Performance distribution will be shown here"
              />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chart}>
                  <defs>
                    <linearGradient
                      id="perfGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={COLORS[1]}
                        stopOpacity={0.9}
                      />
                      <stop
                        offset="25%"
                        stopColor={COLORS[1]}
                        stopOpacity={0.7}
                      />
                      <stop
                        offset="50%"
                        stopColor={COLORS[1]}
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="75%"
                        stopColor={COLORS[1]}
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="95%"
                        stopColor={COLORS[1]}
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                    {/* Glow effect for area */}
                    <filter id="areaGlow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    strokeOpacity={0.3}
                  />
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="normalizedScore"
                    name="Normalized Score"
                    stroke={COLORS[1]}
                    strokeWidth={4}
                    fill="url(#perfGradient)"
                    filter="url(#areaGlow)"
                    dot={{ 
                      r: 6, 
                      strokeWidth: 3, 
                      fill: "#fff",
                      stroke: COLORS[1]
                    }}
                    activeDot={{ 
                      r: 8, 
                      strokeWidth: 3,
                      fill: COLORS[1],
                      stroke: "#fff"
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </ChartCard>

          {/* Enhanced Category Distribution */}
          <ChartCard
            title="Category Distribution"
            icon={RiPieChartLine}
            isExpanded={expanded === "categories"}
            onToggle={() => toggle("categories")}
          >
            {categoryDistributionData.length === 0 ? (
              <EmptyState
                icon={RiPieChartLine}
                title="No category data"
                description="Category distribution will be displayed here"
              />
            ) : (
              <ResponsiveContainer>
                <PieChart>
                  <defs>
                    {/* Add subtle gradients for each slice */}
                    {categoryDistributionData.map((_, i) => (
                      <linearGradient key={i} id={`categoryGrad${i}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={COLORS[i % COLORS.length]} stopOpacity={1} />
                        <stop offset="100%" stopColor={COLORS[i % COLORS.length]} stopOpacity={0.8} />
                      </linearGradient>
                    ))}
                    {/* Drop shadow */}
                    <filter id="pieDropShadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000000" floodOpacity="0.15"/>
                    </filter>
                  </defs>
                  <Pie
                    data={categoryDistributionData}
                    dataKey="value"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={100}
                    paddingAngle={3}
                    filter="url(#pieDropShadow)"
                    label={({ category, value, percent }) => `${category}: ${value} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {categoryDistributionData.map((_, i) => (
                      <Cell 
                        key={i} 
                        fill={`url(#categoryGrad${i})`}
                        stroke="#fff"
                        strokeWidth={3}
                      />
                    ))}
                  </Pie>

                  {/* Enhanced custom tooltip */}
                  <Tooltip
                    content={({ payload }) => {
                      if (!payload || !payload.length) return null;
                      const { category, value, periods, periodType } = payload[0].payload;
                      
                      return (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, y: 10 }}
                          className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 text-sm max-w-sm"
                        >
                          {/* Header */}
                          <div className="flex items-center space-x-2 mb-3">
                            <div
                              className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
                              style={{ backgroundColor: COLORS[payload[0].dataKey % COLORS.length] }}
                            />
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {category}
                            </p>
                          </div>

                          {/* Value and Period Type */}
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Count</p>
                              <p className="font-bold text-xl text-gray-900 dark:text-white">
                                {value}
                              </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Frequency</p>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {periodType}
                              </p>
                            </div>
                          </div>

                          {/* Periods List */}
                          {periods && periods.length > 0 && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                  Time Periods:
                                </p>
                                <span className="text-xs bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full">
                                  {periods.length} period{periods.length > 1 ? 's' : ''}
                                </span>
                              </div>
                              
                              <div className="max-h-32 overflow-y-auto space-y-1">
                                {periods.map((period, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2"
                                  >
                                    <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
                                      {formatPeriodLabel(period, periodType)}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                                      {period}
                                    </span>
                                  </div>
                                ))}
                              </div>

                              {/* Period Range Summary */}
                              {periods.length > 1 && (
                                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    <span className="font-medium">Range:</span> {formatPeriodLabel(periods[0], periodType)} → {formatPeriodLabel(periods[periods.length - 1], periodType)}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Performance Indicator */}
                          <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-center">
                              <div className="flex items-center space-x-2">
                                {category.includes('Exceeds') && (
                                  <>
                                    <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                                      <FiTrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                                    </div>
                                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                      Above Target Performance
                                    </span>
                                  </>
                                )}
                                {category.includes('Needs') && (
                                  <>
                                    <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg">
                                      <FiTrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                                    </div>
                                    <span className="text-sm font-medium text-red-600 dark:text-red-400">
                                      Below Target Performance
                                    </span>
                                  </>
                                )}
                                {category.includes('Meets') && (
                                  <>
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                                      <FiTarget className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                      On Target Performance
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    }}
                  />

                  <Legend 
                    verticalAlign="bottom" 
                    height={60}
                    wrapperStyle={{ 
                      fontSize: "12px",
                      paddingTop: "20px"
                    }}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </div>

        {/* Continue with the rest of the charts... */}
        {/* KPI Performance - Full Width */}
        <div className="grid grid-cols-1 gap-6">
          <ChartCard
            title="KPI Performance Overview"
            icon={FiBarChart2}
            isExpanded={expanded === "kpi-overview"}
            onToggle={() => toggle("kpi-overview")}
            className="col-span-full"
          >
            {avgKpi.length === 0 ? (
              <EmptyState
                icon={FiBarChart2}
                title="No KPI data"
                description="KPI performance metrics will appear here"
              />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={avgKpi.map((k) => ({
                    kpiName: k.kpiName,
                    avgPercent: Math.round(k.avgPercent * 10) / 10,
                  }))}
                  margin={{ left: 100, right: 50, top: 20, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="kpiBar" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="50%" stopColor="#0891b2" />
                      <stop offset="100%" stopColor="#0e7490" />
                    </linearGradient>
                    {/* Add shadows */}
                    <filter id="kpiShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.1"/>
                    </filter>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    strokeOpacity={0.3}
                  />
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="kpiName"
                    width={100}
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="avgPercent"
                    name="Average Percentage"
                    fill="url(#kpiBar)"
                    radius={[0, 8, 8, 0]}
                    filter="url(#kpiShadow)"
                  >
                    <LabelList
                      dataKey="avgPercent"
                      position="right"
                      formatter={(v) => `${v}%`}
                      fontSize={12}
                      fill="#6B7280"
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </div>

        {/* Advanced Analytics */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Scatter Plot */}
          <ChartCard
            title="Target vs Achievement Analysis"
            icon={HiOutlineTrendingUp}
            isExpanded={expanded === "scatter"}
            onToggle={() => toggle("scatter")}
          >
            {scatter.length === 0 ? (
              <EmptyState
                icon={HiOutlineTrendingUp}
                title="No scatter data"
                description="Target vs achievement analysis will be shown here"
              />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <defs>
                    {/* Gradient for scatter dots */}
                    <radialGradient id="scatterGradient" cx="30%" cy="30%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity={0.8} />
                      <stop offset="70%" stopColor={COLORS[2]} stopOpacity={1} />
                      <stop offset="100%" stopColor={COLORS[2]} stopOpacity={0.8} />
                    </radialGradient>
                    {/* Glow effect */}
                    <filter id="scatterGlow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    strokeOpacity={0.3}
                  />
                  <XAxis
                    dataKey="target"
                    name="Target"
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    tickLine={false}
                    axisLine={false}
                    label={{ value: 'Target', position: 'insideBottom', offset: -10 }}
                  />
                  <YAxis
                    dataKey="achieved"
                    name="Achieved"
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    tickLine={false}
                    axisLine={false}
                    label={{ value: 'Achieved', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3", stroke: COLORS[2], strokeWidth: 2 }}
                    content={<ScatterTooltip />}
                  />
                  <Scatter
                    data={scatter}
                    fill="url(#scatterGradient)"
                    shape="circle"
                    r={8}
                    stroke={COLORS[2]}
                    strokeWidth={3}
                    filter="url(#scatterGlow)"
                  />
                  {/* Trend line - ideal performance line */}
                  <Line
                    type="linear"
                    dataKey="target"
                    stroke="#94A3B8"
                    strokeDasharray="8 8"
                    strokeWidth={2}
                    dot={false}
                    name="Ideal Performance"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            )}
          </ChartCard>

          {/* Performance Buckets */}
          <ChartCard
            title="Performance Range Distribution"
            icon={RiPieChartLine}
            isExpanded={expanded === "buckets"}
            onToggle={() => toggle("buckets")}
          >
            {bucketsWithPeriods.length === 0 ? (
              <EmptyState
                icon={RiPieChartLine}
                title="No bucket data"
                description="Performance range distribution will be displayed here"
              />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bucketsWithPeriods}
                    dataKey="count"
                    nameKey="range"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={3}
                    label={({ range, count }) => `${range}: ${count}`}
                  >
                    {bucketsWithPeriods.map((_, i) => (
                      <Cell
                        key={i}
                        fill={COLORS[i % COLORS.length]}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ payload }) => {
                      if (!payload?.length) return null;
                      const { range, count, periods } = payload[0].payload;
                      
                      // Extract range percentages for color coding
                      const rangeStart = parseInt(range.split('–')[0] || range.split('-')[0] || '0');
                      
                      return (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, y: 10 }}
                          className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 text-sm max-w-sm"
                        >
                          {/* Header */}
                          <div className="flex items-center space-x-2 mb-3">
                            <div className={`p-2 rounded-lg ${
                              rangeStart >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                              rangeStart >= 60 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                              rangeStart >= 40 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                              'bg-gradient-to-r from-red-500 to-pink-500'
                            }`}>
                              <FiBarChart2 className="w-3 h-3 text-white" />
                            </div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              Performance Range
                            </p>
                          </div>

                          {/* Range and Count */}
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Range</p>
                              <p className="font-bold text-lg text-gray-900 dark:text-white">
                                {range}
                              </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Periods</p>
                              <p className="font-bold text-lg text-gray-900 dark:text-white">
                                {count}
                              </p>
                            </div>
                          </div>

                          {/* Performance Category */}
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                Performance Level
                              </span>
                              <div className="flex items-center space-x-1">
                                {rangeStart >= 80 ? (
                                  <>
                                    <FiTrendingUp className="w-3 h-3 text-green-500" />
                                    <span className="text-xs font-medium text-green-600 dark:text-green-400">
                                      Excellent
                                    </span>
                                  </>
                                ) : rangeStart >= 60 ? (
                                  <>
                                    <FiTarget className="w-3 h-3 text-blue-500" />
                                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                                      Good
                                    </span>
                                  </>
                                ) : rangeStart >= 40 ? (
                                  <>
                                    <FiActivity className="w-3 h-3 text-yellow-500" />
                                    <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">
                                      Average
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <FiTrendingDown className="w-3 h-3 text-red-500" />
                                    <span className="text-xs font-medium text-red-600 dark:text-red-400">
                                      Needs Improvement
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Periods List */}
                          {periods && periods.length > 0 && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                  Time Periods:
                                </p>
                                <span className="text-xs bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full">
                                  {periods.length} period{periods.length > 1 ? 's' : ''}
                                </span>
                              </div>
                              
                              <div className="max-h-24 overflow-y-auto">
                                <div className="text-xs text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                                  {periods.join(", ")}
                                </div>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      );
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    wrapperStyle={{ fontSize: "12px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </div>

        {/* Trend Analysis */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Moving Average */}
          <ChartCard
            title="Moving Average Trend"
            icon={HiOutlineTrendingUp}
            isExpanded={expanded === "movingAvg"}
            onToggle={() => toggle("movingAvg")}
          >
            {mvData.length === 0 ? (
              <EmptyState
                icon={HiOutlineTrendingUp}
                title="No trend data"
                description="Moving average trends will be displayed here"
              />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mvData}>
                  <defs>
                    <linearGradient
                      id="movingAvgGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={COLORS[1]}
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="50%"
                        stopColor={COLORS[1]}
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="95%"
                        stopColor={COLORS[1]}
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                    {/* Line glow effect */}
                    <filter id="movingAvgGlow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    strokeOpacity={0.3}
                  />
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="movingAverage"
                    fill="url(#movingAvgGradient)"
                    stroke="none"
                  />
                  <Line
                    dataKey="movingAverage"
                    name="Moving Average"
                    stroke={COLORS[1]}
                    strokeWidth={4}
                    filter="url(#movingAvgGlow)"
                    dot={{ 
                      r: 6, 
                      strokeWidth: 3, 
                      fill: "#fff",
                      stroke: COLORS[1]
                    }}
                    activeDot={{ 
                      r: 8, 
                      strokeWidth: 3,
                      fill: COLORS[1],
                      stroke: "#fff"
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </ChartCard>

          {/* Period Change */}
          <ChartCard
            title="Period-to-Period Change"
            icon={HiOutlineTrendingDown}
            isExpanded={expanded === "periodChange"}
            onToggle={() => toggle("periodChange")}
          >
            {mvData.length === 0 ? (
              <EmptyState
                icon={HiOutlineTrendingDown}
                title="No change data"
                description="Period-to-period changes will be shown here"
              />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mvData}>
                  <defs>
                    <linearGradient id="changeBarPositive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="50%" stopColor="#059669" />
                      <stop offset="100%" stopColor="#047857" />
                    </linearGradient>
                    <linearGradient id="changeBarNegative" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f87171" />
                      <stop offset="50%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="#dc2626" />
                    </linearGradient>
                    {/* Bar shadows */}
                    <filter id="changeBarShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.1"/>
                    </filter>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    strokeOpacity={0.3}
                  />
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="periodChange"
                    name="% Change"
                    radius={[6, 6, 6, 6]}
                    filter="url(#changeBarShadow)"
                  >
                    {mvData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.periodChange >= 0 ? "url(#changeBarPositive)" : "url(#changeBarNegative)"}
                      />
                    ))}
                    <LabelList
                      dataKey="periodChange"
                      position="top"
                      formatter={(v) => (v != null ? `${v > 0 ? '+' : ''}${v}%` : "")}
                      fontSize={10}
                      fill="#6B7280"
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </div>

        {/* Daily KPI Performance */}
        <ChartCard
          title="Daily KPI Performance"
          icon={FiCalendar}
          isExpanded={expanded === "daily-kpi"}
          onToggle={() => toggle("daily-kpi")}
          className="col-span-full"
        >
          {avgDailyKpi.length === 0 ? (
            <EmptyState
              icon={FiCalendar}
              title="No daily KPI data"
              description="Daily KPI performance metrics will be displayed here"
            />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={avgDailyKpi.map((k) => ({
                  kpiName: k.kpiName,
                  avgDailyScore: Math.round(k.avgDailyScore * 10) / 10,
                }))}
                margin={{ bottom: 40, top: 20, left: 20, right: 20 }}
              >
                <defs>
                  <linearGradient id="dailyKpiBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="50%" stopColor="#ea580c" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>
                  {/* Shadow effect */}
                  <filter id="dailyKpiShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.1"/>
                  </filter>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E5E7EB"
                  strokeOpacity={0.3}
                />
                <XAxis
                  dataKey="kpiName"
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  tickLine={false}
                  axisLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="avgDailyScore"
                  name="Avg Daily Score"
                  fill="url(#dailyKpiBar)"
                  radius={[8, 8, 0, 0]}
                  filter="url(#dailyKpiShadow)"
                >
                  <LabelList
                    dataKey="avgDailyScore"
                    position="top"
                    fontSize={11}
                    fill="#6B7280"
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        {/* Data Tables Section */}
        <div className="space-y-6">
          {/* Employee Performance Table */}
          <motion.div
            variants={cardVariants}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-auto h-[60vh]   [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
                transition-colors duration-300"
          >
            <div className="p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <motion.div
                    variants={iconVariants}
                    whileHover="hover"
                    className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg"
                  >
                    <FiUsers className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Employee Performance
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Comprehensive employee metrics (sorted by performance)
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <ResponsiveTable
  sortable
  headers={[
    { key: "employee",      label: "Employee"     },
    { key: "averageRating", label: "Avg Rating"   },
    { key: "ratingCount",   label: "Rating Count" },
    { key: "category",      label: "Category"     },
  ]}
  rows={sortedEmployees}
                rowRenderer={(e) => [
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {e.employee?.first_Name?.[0]}
                      {e.employee?.last_Name?.[0]}
                    </div>
                    <span className="font-medium">{`${
                      e.employee?.first_Name || ""
                    } ${e.employee?.last_Name || ""}`}</span>
                  </div>,
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{e.averageRating}</span>
                    <div
                      className={`px-2 py-1 rounded-full text-xs ${
                        e.averageRating >= 4
                          ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400"
                          : e.averageRating >= 3
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400"
                      }`}
                    >
                      {e.averageRating >= 4
                        ? "Excellent"
                        : e.averageRating >= 3
                        ? "Good"
                        : "Needs Improvement"}
                    </div>
                  </div>,
                  e.ratingCount,
                  <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-medium">
                    {e.category}
                  </span>,
                ]}
                searchable={true}
              />
            </div>
          </motion.div>

          {/* Top and Bottom Performers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performers */}
            <motion.div
              variants={cardVariants}
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center space-x-3">
                  <motion.div
                    variants={iconVariants}
                    whileHover="hover"
                    className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg"
                  >
                    <FiTrendingUp className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Top Performers
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Highest rated team members
                    </p>
                  </div>
                </div>
              </div>
              <div className=" mt-6 overflow-y-auto overflow-x-hidden h-[45vh]   [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
                transition-colors duration-300">
                <ResponsiveTable
                sortable
  headers={[
    { key: "employee",      label: "Employee" },
    { key: "averageRating", label: "Rating"   },
    { key: "category",      label: "Category" },
  ]}
  rows={top}
                  rowRenderer={(p) => [
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {p.employee?.first_Name?.[0]}
                        {p.employee?.last_Name?.[0]}
                      </div>
                      <div>
                        <div className="font-medium">{`${
                          p.employee?.first_Name || ""
                        } ${p.employee?.last_Name || ""}`}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Top performer
                        </div>
                      </div>
                    </div>,
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {p.averageRating}
                      </span>
                      <FiTrendingUp className="w-4 h-4 text-green-500" />
                    </div>,
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                      {p.category}
                    </span>,
                  ]}
                />
              </div>
            </motion.div>

            {/* Bottom Performers */}
            <motion.div
              variants={cardVariants}
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center space-x-3">
                  <motion.div
                    variants={iconVariants}
                    whileHover="hover"
                    className="p-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl shadow-lg"
                  >
                    <FiTrendingDown className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Needs Improvement
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Focus areas for development
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 overflow-y-auto overflow-x-hidden h-[45vh]   [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
                transition-colors duration-300">
                <ResponsiveTable
                  sortable
  headers={[
    { key: "employee",      label: "Employee" },
    { key: "averageRating", label: "Rating"   },
    { key: "category",      label: "Category" },
  ]}
  rows={bottom}
                  rowRenderer={(p) => [
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {p.employee?.first_Name?.[0]}
                        {p.employee?.last_Name?.[0]}
                      </div>
                      <div>
                        <div className="font-medium">{`${
                          p.employee?.first_Name || ""
                        } ${p.employee?.last_Name || ""}`}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Development focus
                        </div>
                      </div>
                    </div>,
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {p.averageRating}
                      </span>
                      <FiTrendingDown className="w-4 h-4 text-red-500" />
                    </div>,
                    <span className="px-3 py-1 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-full text-xs font-medium">
                      {p.category}
                    </span>,
                  ]}
                />
              </div>
            </motion.div>
          </div>

          {/* Performance Heatmap */}
          <motion.div
            variants={cardVariants}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center space-x-3">
                  <motion.div
                    variants={iconVariants}
                    whileHover="hover"
                    className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl shadow-lg"
                  >
                    <FiFilter className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Performance Heatmap
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Employee performance across periods (sorted by avg performance)
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-3 h-3 bg-red-100 dark:bg-red-900 rounded"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      0-39%
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-3 h-3 bg-yellow-100 dark:bg-yellow-900 rounded"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      40-59%
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-3 h-3 bg-blue-100 dark:bg-blue-900 rounded"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      60-79%
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-3 h-3 bg-green-100 dark:bg-green-900 rounded"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      80-100%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 overflow-y-auto overflow-x-hidden h-[75vh]   [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
                transition-colors duration-300">
              {sortedHeatmap.length === 0 ? (
                <EmptyState
                  icon={FiFilter}
                  title="No heatmap data"
                  description="Performance heatmap will be displayed here once data is available"
                />
              ) : (
                <div className="overflow-x-auto">
                  <div className="min-w-full">
                    <div className="grid grid-cols-[200px_1fr] gap-0 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
                      {/* Header */}
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 border-r border-gray-200 dark:border-gray-700">
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Employee
                        </span>
                      </div>
                      <div
                        className="bg-gray-50 dark:bg-gray-800 p-2 grid gap-1"
                        style={{
                          gridTemplateColumns: `repeat(${chart.length}, minmax(80px, 1fr))`,
                        }}
                      >
                        {chart.map((c, i) => (
                          <div key={i} className="text-center p-2">
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 transform -rotate-45 inline-block">
                              {c.period}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Data Rows */}
                      {sortedHeatmap.map((row, i) => (
                        <React.Fragment key={i}>
                          <div className="p-4 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                {row.employee
                                  ?.split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {row.employee}
                              </span>
                            </div>
                          </div>
                          <div
                            className="p-2 bg-white dark:bg-gray-900 grid gap-1"
                            style={{
                              gridTemplateColumns: `repeat(${chart.length}, minmax(80px, 1fr))`,
                            }}
                          >
                            {row.data.map((cell, j) => {
                              const score = cell.normalizedScore || 0;
                              let bgColorClass = "bg-gray-50 dark:bg-gray-800";
                              let textColorClass =
                                "text-gray-700 dark:text-gray-300";

                              if (score >= 80) {
                                bgColorClass =
                                  "bg-green-100 dark:bg-green-900/50";
                                textColorClass =
                                  "text-green-800 dark:text-green-300";
                              } else if (score >= 60) {
                                bgColorClass =
                                  "bg-blue-100 dark:bg-blue-900/50";
                                textColorClass =
                                  "text-blue-800 dark:text-blue-300";
                              } else if (score >= 40) {
                                bgColorClass =
                                  "bg-yellow-100 dark:bg-yellow-900/50";
                                textColorClass =
                                  "text-yellow-800 dark:text-yellow-300";
                              } else if (score > 0) {
                                bgColorClass = "bg-red-100 dark:bg-red-900/50";
                                textColorClass =
                                  "text-red-800 dark:text-red-300";
                              }

                              return (
                                <motion.div
                                  key={j}
                                  whileHover={{ scale: 1.1, zIndex: 10 }}
                                  className={`${bgColorClass} ${textColorClass} p-3 rounded-lg text-center text-sm font-medium transition-all duration-200 cursor-pointer`}
                                >
                                  {score || "-"}
                                </motion.div>
                              );
                            })}
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}