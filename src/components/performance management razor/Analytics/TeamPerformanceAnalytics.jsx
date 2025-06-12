// import React, { useMemo, useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   AreaChart,
//   Area,
//   LabelList,
//   ScatterChart,
//   Scatter,
// } from "recharts";
// import {
//   FiTrendingUp,
//   FiTarget,
//   FiActivity,
//   FiPieChart,
//   FiCalendar,
//   FiMaximize2,
//   FiMinimize2,
//   FiFilter,
//   FiRefreshCw,
//   FiUsers,
//   FiBarChart2,
//   FiTrendingDown,
//   FiEye,
//   FiEyeOff,
//   FiSettings,
//   FiDownload,
//   FiShare2,
//   FiSearch,
//   FiGrid,
//   FiList,
//   FiArrowUp,
//   FiArrowDown,
//   FiMinus,
//   FiChevronRight,
//   FiChevronDown,
// } from "react-icons/fi";
// import {
//   HiOutlineChartBar,
//   HiOutlineChartPie,
//   HiOutlineChartSquareBar,
//   HiOutlineTrendingUp,
//   HiOutlineTrendingDown,
//   HiOutlineViewGrid,
//   HiOutlineViewList,
// } from "react-icons/hi";
// import {
//   RiLineChartLine,
//   RiBarChartLine,
//   RiPieChartLine,
// } from "react-icons/ri";

// // Enhanced color palette with gradients
// const COLORS = [
//   "#6366F1",
//   "#10B981",
//   "#F59E0B",
//   "#EF4444",
//   "#8B5CF6",
//   "#06B6D4",
//   "#F97316",
//   "#84CC16",
//   "#EC4899",
//   "#14B8A6",
//   "#3B82F6",
//   "#F43F5E",
//   "#8B5CF6",
//   "#10B981",
//   "#F59E0B",
// ];

// const GRADIENTS = {
//   primary: "from-indigo-500 via-purple-500 to-pink-500",
//   success: "from-emerald-400 via-cyan-400 to-blue-500",
//   warning: "from-amber-400 via-orange-400 to-red-500",
//   info: "from-blue-400 via-purple-400 to-indigo-500",
//   danger: "from-red-400 via-pink-400 to-rose-500",
//   dark: "from-gray-700 via-gray-800 to-black",
// };

// // Enhanced animation variants
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//       delayChildren: 0.2,
//     },
//   },
// };

// const cardVariants = {
//   hidden: {
//     opacity: 0,
//     y: 30,
//     scale: 0.95,
//     rotateX: -10,
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     rotateX: 0,
//     transition: {
//       type: "spring",
//       damping: 20,
//       stiffness: 100,
//     },
//   },
//   hover: {
//     y: -8,
//     scale: 1.02,
//     rotateX: 2,
//     boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
//     transition: {
//       type: "spring",
//       damping: 15,
//       stiffness: 200,
//     },
//   },
// };

// const iconVariants = {
//   initial: { scale: 1, rotate: 0 },
//   hover: {
//     scale: 1.2,
//     rotate: 360,
//     transition: {
//       type: "spring",
//       damping: 15,
//       stiffness: 200,
//     },
//   },
//   tap: { scale: 0.9 },
// };

// const buttonVariants = {
//   hover: {
//     scale: 1.05,
//     boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
//   },
//   tap: { scale: 0.95 },
// };

// // Enhanced reusable components
// const CustomTooltip = ({ active, payload, label }) => {
//   if (!active || !payload?.length) return null;

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.8, y: 10 }}
//       animate={{ opacity: 1, scale: 1, y: 0 }}
//       exit={{ opacity: 0, scale: 0.8, y: 10 }}
//       className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 text-sm max-w-xs"
//     >
//       <p className="font-semibold mb-3 text-gray-900 dark:text-white">
//         {label}
//       </p>
//       <div className="space-y-2">
//         {payload.map((p, i) => (
//           <div key={i} className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <div
//                 className="w-3 h-3 rounded-full"
//                 style={{ backgroundColor: p.color }}
//               />
//               <span className="text-gray-700 dark:text-gray-300">
//                 {p.name}:
//               </span>
//             </div>
//             <span className="font-medium text-gray-900 dark:text-white">
//               {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
//               {p.unit || ""}
//             </span>
//           </div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// const ScatterTooltip = ({ active, payload }) => {
//   if (!active || !payload?.length) return null;
//   const { period, target, achieved } = payload[0].payload;

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 text-sm"
//     >
//       <p className="font-semibold mb-2 text-gray-900 dark:text-white">
//         {period}
//       </p>
//       <div className="space-y-1">
//         <p className="text-gray-700 dark:text-gray-300">
//           Target: <span className="font-medium">{target}</span>
//         </p>
//         <p className="text-gray-700 dark:text-gray-300">
//           Achieved: <span className="font-medium">{achieved}</span>
//         </p>
//       </div>
//     </motion.div>
//   );
// };

// const EmptyState = ({
//   icon: Icon,
//   title = "No data available",
//   description = "Data will appear here once available",
// }) => (
//   <motion.div
//     initial={{ opacity: 0, scale: 0.9 }}
//     animate={{ opacity: 1, scale: 1 }}
//     className="flex flex-col items-center justify-center h-full min-h-[200px] text-gray-400 dark:text-gray-500"
//   >
//     <motion.div
//       animate={{
//         scale: [1, 1.1, 1],
//         rotate: [0, 5, -5, 0],
//       }}
//       transition={{
//         duration: 3,
//         repeat: Infinity,
//         repeatType: "reverse",
//       }}
//       className="p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl mb-4"
//     >
//       <Icon className="w-12 h-12" />
//     </motion.div>
//     <h3 className="font-medium text-lg mb-2">{title}</h3>
//     <p className="text-sm text-center max-w-xs">{description}</p>
//   </motion.div>
// );

// const LoadingSpinner = () => (
//   <motion.div
//     animate={{ rotate: 360 }}
//     transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//     className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
//   />
// );

// const ChartCard = ({
//   title,
//   icon: Icon,
//   isExpanded,
//   onToggle,
//   children,
//   actions,
//   className = "",
//   isLoading = false,
// }) => (
//   <motion.div
//     variants={cardVariants}
//     initial="hidden"
//     animate="visible"
//     whileHover="hover"
//     className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden ${
//       isExpanded ? "col-span-full" : ""
//     } ${className}`}
//   >
//     <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-800">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center space-x-3">
//           <motion.div
//             variants={iconVariants}
//             whileHover="hover"
//             whileTap="tap"
//             className="p-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-lg"
//           >
//             <Icon className="w-5 h-5 text-white" />
//           </motion.div>
//           <div>
//             <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
//               {title}
//             </h4>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Interactive analytics
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center space-x-2">
//           {actions}
//           <motion.button
//             variants={buttonVariants}
//             whileHover="hover"
//             whileTap="tap"
//             onClick={onToggle}
//             className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//           >
//             {isExpanded ? <FiMinimize2 size={20} /> : <FiMaximize2 size={20} />}
//           </motion.button>
//         </div>
//       </div>
//     </div>
//     <div
//       className="p-4 sm:p-6"
//       style={{ height: isExpanded ? "32rem" : "24rem" }}
//     >
//       <AnimatePresence mode="wait">
//         {isLoading ? (
//           <motion.div
//             key="loading"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="flex items-center justify-center h-full"
//           >
//             <LoadingSpinner />
//           </motion.div>
//         ) : (
//           <motion.div
//             key="content"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="h-full"
//           >
//             {children}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   </motion.div>
// );

// const StatCard = ({
//   title,
//   value,
//   icon: Icon,
//   gradient,
//   trend,
//   trendValue,
//   subtitle,
//   onClick,
// }) => (
//   <motion.div
//     variants={cardVariants}
//     whileHover="hover"
//     whileTap={onClick ? "tap" : undefined}
//     onClick={onClick}
//     className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 ${
//       onClick ? "cursor-pointer" : ""
//     }`}
//   >
//     <div className="flex justify-between items-start mb-4">
//       <div className="flex-1">
//         <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
//           {title}
//         </p>
//         <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
//           {value}
//         </p>
//         {subtitle && (
//           <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
//         )}
//       </div>
//       <motion.div
//         variants={iconVariants}
//         whileHover="hover"
//         className={`p-4 bg-gradient-to-r ${gradient} rounded-2xl shadow-lg`}
//       >
//         <Icon className="w-6 h-6 text-white" />
//       </motion.div>
//     </div>

//     {trend && (
//       <div className="flex items-center space-x-2">
//         <div
//           className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
//             trend === "up"
//               ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400"
//               : trend === "down"
//               ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400"
//               : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
//           }`}
//         >
//           {trend === "up" && <FiArrowUp className="w-3 h-3" />}
//           {trend === "down" && <FiArrowDown className="w-3 h-3" />}
//           {trend === "stable" && <FiMinus className="w-3 h-3" />}
//           <span>{trendValue}</span>
//         </div>
//         <span className="text-xs text-gray-500 dark:text-gray-400">
//           vs last period
//         </span>
//       </div>
//     )}
//   </motion.div>
// );

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

// export default function PerformanceAnalytics({ data, onRefresh }) {
//   const {
//     chart = [],
//     aggregatedTeam = [],
//     categories = [],
//     avgKpi = [],
//     scatter = [],
//     avgDailyKpi = [],
//     buckets = [],
//     employees = [],
//     top = [],
//     bottom = [],
//     heatmap = [],
//     movingAverage = [],
//     periodChange = [],
//   } = data || {};

//   const [expanded, setExpanded] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [viewMode, setViewMode] = useState("dashboard");
//   const [selectedMetric, setSelectedMetric] = useState("all");

//   const toggle = (id) => setExpanded(expanded === id ? null : id);

//   const handleRefresh = async () => {
//     setIsLoading(true);
//     try {
//       await onRefresh?.();
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Enhanced data processing
//   const categoryMap = useMemo(() => {
//     const map = {};
//     aggregatedTeam.forEach((p) => {
//       const cat = p.summary?.category;
//       if (cat) {
//         if (!map[cat]) map[cat] = [];
//         map[cat].push(p.periodLabel);
//       }
//     });
//     return map;
//   }, [aggregatedTeam]);

//   const categoriesWithPeriods = useMemo(() => {
//     return categories.map((cat) => ({
//       ...cat,
//       periods: categoryMap[cat.category] || [],
//     }));
//   }, [categories, categoryMap]);

//   const mvData = useMemo(
//     () =>
//       chart.map((c, i) => ({
//         period: c.period,
//         movingAverage: movingAverage[i] ?? 0,
//         periodChange: periodChange[i] ?? 0,
//       })),
//     [chart, movingAverage, periodChange]
//   );

//   const bucketsWithPeriods = useMemo(() => {
//     const b = buckets.map((bkt) => ({
//       ...bkt,
//       periods: [],
//     }));
//     chart.forEach((d) => {
//       const idx = Math.min(
//         Math.floor((d.normalizedScore || 0) / 10),
//         buckets.length - 1
//       );
//       if (idx >= 0 && b[idx]) {
//         b[idx].periods.push(d.period);
//       }
//     });
//     return b;
//   }, [buckets, chart]);

//   // Enhanced summary calculations
//   const totalScore = chart.reduce((s, c) => s + (c.totalScore || 0), 0);
//   const avgPerf = chart.length
//     ? Math.round(
//         chart.reduce((s, c) => s + (c.percentOfTarget || 0), 0) / chart.length
//       )
//     : 0;
//   const best = chart.reduce(
//     (b, c) => (c.percentOfTarget > (b.percentOfTarget || 0) ? c : b),
//     {}
//   );

//   const performanceTrend =
//     chart.length >= 2
//       ? chart[chart.length - 1].percentOfTarget -
//         chart[chart.length - 2].percentOfTarget
//       : 0;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="space-y-6 p-4 sm:p-6 lg:p-8"
//       >
  

//         {/* Enhanced Summary Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//           <StatCard
//             title="Total Score"
//             value={totalScore.toLocaleString()}
//             icon={FiTrendingUp}
//             gradient={GRADIENTS.primary}
//             trend={
//               performanceTrend > 0
//                 ? "up"
//                 : performanceTrend < 0
//                 ? "down"
//                 : "stable"
//             }
//             trendValue={`${Math.abs(performanceTrend).toFixed(1)}%`}
//             subtitle="Cumulative performance"
//           />
//           <StatCard
//             title="Average Performance"
//             value={`${avgPerf}%`}
//             icon={FiTarget}
//             gradient={GRADIENTS.success}
//             trend={avgPerf >= 80 ? "up" : avgPerf >= 60 ? "stable" : "down"}
//             trendValue={`${
//               avgPerf >= 80
//                 ? "Excellent"
//                 : avgPerf >= 60
//                 ? "Good"
//                 : "Needs Improvement"
//             }`}
//             subtitle="Of target achieved"
//           />
//           <StatCard
//             title="Best Period"
//             value={best.period || "—"}
//             icon={FiActivity}
//             gradient={GRADIENTS.warning}
//             trend="up"
//             trendValue={`${best.percentOfTarget || 0}%`}
//             subtitle="Peak performance"
//           />
//           <StatCard
//             title="Team Members"
//             value={employees.length}
//             icon={FiUsers}
//             gradient={GRADIENTS.info}
//             subtitle="Active employees"
//           />
//         </div>

//         {/* Main Analytics Grid */}
//         <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
//           {/* Performance Trends */}
//           <ChartCard
//             title="Performance Trends"
//             icon={RiLineChartLine}
//             isExpanded={expanded === "trends"}
//             onToggle={() => toggle("trends")}
//             actions={
//               <motion.button
//                 variants={buttonVariants}
//                 whileHover="hover"
//                 whileTap="tap"
//                 className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
//               >
//                 <FiEye className="w-4 h-4" />
//               </motion.button>
//             }
//           >
//             {chart.length === 0 ? (
//               <EmptyState
//                 icon={RiLineChartLine}
//                 title="No trend data"
//                 description="Performance trends will be displayed here once data is available"
//               />
//             ) : (
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={chart}>
//                   <defs>
//                     <linearGradient
//                       id="scoreGradient"
//                       x1="0"
//                       y1="0"
//                       x2="0"
//                       y2="1"
//                     >
//                       <stop
//                         offset="5%"
//                         stopColor={COLORS[0]}
//                         stopOpacity={0.3}
//                       />
//                       <stop
//                         offset="95%"
//                         stopColor={COLORS[0]}
//                         stopOpacity={0}
//                       />
//                     </linearGradient>
//                     <linearGradient
//                       id="targetGradient"
//                       x1="0"
//                       y1="0"
//                       x2="0"
//                       y2="1"
//                     >
//                       <stop
//                         offset="5%"
//                         stopColor={COLORS[1]}
//                         stopOpacity={0.3}
//                       />
//                       <stop
//                         offset="95%"
//                         stopColor={COLORS[1]}
//                         stopOpacity={0}
//                       />
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     stroke="#E5E7EB"
//                     opacity={0.5}
//                   />
//                   <XAxis
//                     dataKey="period"
//                     tick={{ fontSize: 12 }}
//                     tickLine={false}
//                     axisLine={false}
//                   />
//                   <YAxis
//                     yAxisId="left"
//                     tick={{ fontSize: 12 }}
//                     tickLine={false}
//                     axisLine={false}
//                   />
//                   <YAxis
//                     yAxisId="right"
//                     orientation="right"
//                     tickFormatter={(v) => `${v}%`}
//                     tick={{ fontSize: 12 }}
//                     tickLine={false}
//                     axisLine={false}
//                   />
//                   <Tooltip content={<CustomTooltip />} />
//                   <Legend />
//                   <Area
//                     yAxisId="left"
//                     type="monotone"
//                     dataKey="totalScore"
//                     fill="url(#scoreGradient)"
//                     stroke="none"
//                   />
//                   <Area
//                     yAxisId="right"
//                     type="monotone"
//                     dataKey="percentOfTarget"
//                     fill="url(#targetGradient)"
//                     stroke="none"
//                   />
//                   <Line
//                     yAxisId="left"
//                     dataKey="totalScore"
//                     name="Total Score"
//                     stroke={COLORS[0]}
//                     strokeWidth={3}
//                     dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
//                     activeDot={{ r: 6, strokeWidth: 2 }}
//                   />
//                   <Line
//                     yAxisId="right"
//                     dataKey="percentOfTarget"
//                     name="% of Target"
//                     stroke={COLORS[1]}
//                     strokeWidth={3}
//                     dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
//                     activeDot={{ r: 6, strokeWidth: 2 }}
//                     unit="%"
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             )}
//           </ChartCard>

//           {/* Target vs Achieved */}
//           <ChartCard
//             title="Target vs Achieved"
//             icon={HiOutlineChartSquareBar}
//             isExpanded={expanded === "comparison"}
//             onToggle={() => toggle("comparison")}
//           >
//             {chart.length === 0 ? (
//               <EmptyState
//                 icon={HiOutlineChartSquareBar}
//                 title="No comparison data"
//                 description="Target vs achieved metrics will appear here"
//               />
//             ) : (
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={chart} margin={{ top: 20 }}>
//                   <defs>
//                     <linearGradient id="targetBar" x1="0" y1="0" x2="0" y2="1">
//                       <stop
//                         offset="5%"
//                         stopColor={COLORS[4]}
//                         stopOpacity={0.8}
//                       />
//                       <stop
//                         offset="95%"
//                         stopColor={COLORS[4]}
//                         stopOpacity={0.6}
//                       />
//                     </linearGradient>
//                     <linearGradient
//                       id="achievedBar"
//                       x1="0"
//                       y1="0"
//                       x2="0"
//                       y2="1"
//                     >
//                       <stop
//                         offset="5%"
//                         stopColor={COLORS[3]}
//                         stopOpacity={0.8}
//                       />
//                       <stop
//                         offset="95%"
//                         stopColor={COLORS[3]}
//                         stopOpacity={0.6}
//                       />
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     stroke="#E5E7EB"
//                     opacity={0.5}
//                   />
//                   <XAxis
//                     dataKey="period"
//                     tick={{ fontSize: 12 }}
//                     tickLine={false}
//                     axisLine={false}
//                   />
//                   <YAxis
//                     tick={{ fontSize: 12 }}
//                     tickLine={false}
//                     axisLine={false}
//                   />
//                   <Tooltip content={<CustomTooltip />} />
//                   <Legend />
//                   <Bar
//                     dataKey="totalTarget"
//                     name="Target"
//                     fill="url(#targetBar)"
//                     radius={[4, 4, 0, 0]}
//                   >
//                     <LabelList
//                       dataKey="totalTarget"
//                       position="top"
//                       formatter={(v) => v.toLocaleString()}
//                       fontSize={10}
//                     />
//                   </Bar>
//                   <Bar
//                     dataKey="totalAchieved"
//                     name="Achieved"
//                     fill="url(#achievedBar)"
//                     radius={[4, 4, 0, 0]}
//                   >
//                     <LabelList
//                       dataKey="totalAchieved"
//                       position="top"
//                       formatter={(v) => v.toLocaleString()}
//                       fontSize={10}
//                     />
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             )}
//           </ChartCard>
//         </div>

//         {/* Secondary Analytics Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Performance Distribution */}
//           <ChartCard
//             title="Performance Distribution"
//             icon={RiLineChartLine}
//             isExpanded={expanded === "performance"}
//             onToggle={() => toggle("performance")}
//           >
//             {chart.length === 0 ? (
//               <EmptyState
//                 icon={RiLineChartLine}
//                 title="No distribution data"
//                 description="Performance distribution will be shown here"
//               />
//             ) : (
//               <ResponsiveContainer width="100%" height="100%">
//                 <AreaChart data={chart}>
//                   <defs>
//                     <linearGradient
//                       id="perfGradient"
//                       x1="0"
//                       y1="0"
//                       x2="0"
//                       y2="1"
//                     >
//                       <stop
//                         offset="5%"
//                         stopColor={COLORS[1]}
//                         stopOpacity={0.8}
//                       />
//                       <stop
//                         offset="50%"
//                         stopColor={COLORS[1]}
//                         stopOpacity={0.4}
//                       />
//                       <stop
//                         offset="95%"
//                         stopColor={COLORS[1]}
//                         stopOpacity={0.1}
//                       />
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     stroke="#E5E7EB"
//                     opacity={0.5}
//                   />
//                   <XAxis
//                     dataKey="period"
//                     tick={{ fontSize: 12 }}
//                     tickLine={false}
//                     axisLine={false}
//                   />
//                   <YAxis
//                     tickFormatter={(v) => `${v}%`}
//                     tick={{ fontSize: 12 }}
//                     tickLine={false}
//                     axisLine={false}
//                   />
//                   <Tooltip content={<CustomTooltip />} />
//                   <Area
//                     type="monotone"
//                     dataKey="normalizedScore"
//                     name="Normalized Score"
//                     stroke={COLORS[1]}
//                     strokeWidth={3}
//                     fill="url(#perfGradient)"
//                     dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
//                   />
//                 </AreaChart>
//               </ResponsiveContainer>
//             )}
//           </ChartCard>

//           {/* Category Distribution */}
//           <ChartCard
//             title="Category Distribution"
//             icon={RiPieChartLine}
//             isExpanded={expanded === "categories"}
//             onToggle={() => toggle("categories")}
//           >
//             {categoriesWithPeriods.length === 0 ? (
//               <EmptyState
//                 icon={RiPieChartLine}
//                 title="No category data"
//                 description="Category distribution will be displayed here"
//               />
//             ) : (
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={categoriesWithPeriods}
//                     dataKey="value"
//                     nameKey="category"
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={40}
//                     outerRadius={80}
//                     paddingAngle={2}
//                     label={({ category, value }) => `${category}: ${value}`}
//                   >
//                     {categoriesWithPeriods.map((_, i) => (
//                       <Cell
//                         key={i}
//                         fill={COLORS[i % COLORS.length]}
//                         stroke="#fff"
//                         strokeWidth={2}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip
//                     content={({ payload }) => {
//                       if (!payload?.length) return null;
//                       const { category, value, periods } = payload[0].payload;
//                       return (
//                         <motion.div
//                           initial={{ opacity: 0, scale: 0.8 }}
//                           animate={{ opacity: 1, scale: 1 }}
//                           className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 text-sm max-w-xs"
//                         >
//                           <p className="font-semibold mb-2 text-gray-900 dark:text-white">
//                             {category}
//                           </p>
//                           <p className="text-gray-700 dark:text-gray-300 mb-2">
//                             {value} period{value > 1 ? "s" : ""}
//                           </p>
//                           {periods.length > 0 && (
//                             <>
//                               <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
//                                 Periods:
//                               </p>
//                               <p className="text-xs text-gray-800 dark:text-gray-200 break-words">
//                                 {periods.join(", ")}
//                               </p>
//                             </>
//                           )}
//                         </motion.div>
//                       );
//                     }}
//                   />
//                   <Legend
//                     verticalAlign="bottom"
//                     height={36}
//                     wrapperStyle={{ fontSize: "12px" }}
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//             )}
//           </ChartCard>
//         </div>

//         {/* KPI Performance - Full Width */}
//         <div className="grid grid-cols-1 gap-6">
//           <ChartCard
//             title="KPI Performance Overview"
//             icon={FiBarChart2}
//             isExpanded={expanded === "kpi-overview"}
//             onToggle={() => toggle("kpi-overview")}
//             className="col-span-full"
//           >
//             {avgKpi.length === 0 ? (
//               <EmptyState
//                 icon={FiBarChart2}
//                 title="No KPI data"
//                 description="KPI performance metrics will appear here"
//               />
//             ) : (
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart
//                   layout="vertical"
//                   data={avgKpi.map((k) => ({
//                     kpiName: k.kpiName,
//                     avgPercent: Math.round(k.avgPercent * 10) / 10,
//                   }))}
//                   margin={{ left: 150, right: 30 }}
//                 >
//                   <defs>
//                     <linearGradient id="kpiBar" x1="0" y1="0" x2="1" y2="0">
//                       <stop
//                         offset="5%"
//                         stopColor={COLORS[5]}
//                         stopOpacity={0.8}
//                       />
//                       <stop
//                         offset="95%"
//                         stopColor={COLORS[5]}
//                         stopOpacity={0.6}
//                       />
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     stroke="#E5E7EB"
//                     opacity={0.5}
//                   />
//                   <XAxis
//                     type="number"
//                     domain={[0, 100]}
//                     tickFormatter={(v) => `${v}%`}
//                     tick={{ fontSize: 12 }}
//                     tickLine={false}
//                     axisLine={false}
//                   />
//                   <YAxis
//                     type="category"
//                     dataKey="kpiName"
//                     width={150}
//                     tick={{ fontSize: 12 }}
//                     tickLine={false}
//                     axisLine={false}
//                   />
//                   <Tooltip content={<CustomTooltip />} />
//                   <Bar
//                     dataKey="avgPercent"
//                     name="Average Percentage"
//                     fill="url(#kpiBar)"
//                     radius={[0, 6, 6, 0]}
//                   >
//                     <LabelList
//                       dataKey="avgPercent"
//                       position="right"
//                       formatter={(v) => `${v}%`}
//                       fontSize={12}
//                     />
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             )}
//           </ChartCard>
//         </div>

//         {/* Advanced Analytics */}
//         <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
//           {/* Scatter Plot */}
//           <ChartCard
//             title="Target vs Achievement Analysis"
//             icon={HiOutlineTrendingUp}
//             isExpanded={expanded === "scatter"}
//             onToggle={() => toggle("scatter")}
//           >
//             {scatter.length === 0 ? (
//               <EmptyState
//                 icon={HiOutlineTrendingUp}
//                 title="No scatter data"
//                 description="Target vs achievement analysis will be shown here"
//               />
//             ) : (
//               <ResponsiveContainer width="100%" height="100%">
//                 <ScatterChart
//                   margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
//                 >
//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     stroke="#E5E7EB"
//                     opacity={0.5}
//                   />
//                   <XAxis
//                     dataKey="target"
//                     name="Target"
//                     tick={{ fontSize: 12 }}
//                     tickLine={false}
//                     axisLine={false}
//                   />
//                   <YAxis
//                     dataKey="achieved"
//                     name="Achieved"
//                     tick={{ fontSize: 12 }}
//                     tickLine={false}
//                     axisLine={false}
//                   />
//                   <Tooltip
//                     cursor={{ strokeDasharray: "3 3" }}
//                     content={<ScatterTooltip />}
//                   />
//                   <Scatter
//                     data={scatter}
//                     fill={COLORS[2]}
//                     shape="circle"
//                     r={6}
//                     stroke="#fff"
//                     strokeWidth={2}
//                   />
//                   {/* Add trend line if possible */}
//                   <Line
//                     type="linear"
//                     dataKey="target"
//                     stroke={COLORS[4]}
//                     strokeDasharray="5 5"
//                     dot={false}
//                   />
//                 </ScatterChart>
//               </ResponsiveContainer>
//             )}
//           </ChartCard>

//           {/* Performance Buckets */}
//           <ChartCard
//             title="Performance Range Distribution"
//             icon={RiPieChartLine}
//             isExpanded={expanded === "buckets"}
//             onToggle={() => toggle("buckets")}
//           >
//             {bucketsWithPeriods.length === 0 ? (
//               <EmptyState
//                 icon={RiPieChartLine}
//                 title="No bucket data"
//                 description="Performance range distribution will be displayed here"
//               />
//             ) : (
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={bucketsWithPeriods}
//                     dataKey="count"
//                     nameKey="range"
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={50}
//                     outerRadius={90}
//                     paddingAngle={3}
//                     label={({ range, count }) => `${range}: ${count}`}
//                   >
//                     {bucketsWithPeriods.map((_, i) => (
//                       <Cell
//                         key={i}
//                         fill={COLORS[i % COLORS.length]}
//                         stroke="#fff"
//                         strokeWidth={2}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip
//                     content={({ payload }) => {
//                       if (!payload?.length) return null;
//                       const { range, count, periods } = payload[0].payload;
//                       return (
//                         <motion.div
//                           initial={{ opacity: 0, scale: 0.8 }}
//                           animate={{ opacity: 1, scale: 1 }}
//                           className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 text-sm max-w-xs"
//                         >
//                           <p className="font-semibold mb-2 text-gray-900 dark:text-white">
//                             {range}
//                           </p>
//                           <p className="text-gray-700 dark:text-gray-300 mb-2">
//                             {count} period{count > 1 ? "s" : ""}
//                           </p>
//                           {periods.length > 0 && (
//                             <>
//                               <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
//                                 Periods:
//                               </p>
//                               <p className="text-xs text-gray-800 dark:text-gray-200 break-words">
//                                 {periods.join(", ")}
//                               </p>
//                             </>
//                           )}
//                         </motion.div>
//                       );
//                     }}
//                   />
//                   <Legend
//                     verticalAlign="bottom"
//                     height={36}
//                     wrapperStyle={{ fontSize: "12px" }}
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//             )}
//           </ChartCard>
//         </div>

//         {/* Trend Analysis */}
//         <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
//           {/* Moving Average */}
//           <ChartCard
//             title="Moving Average Trend"
//             icon={HiOutlineTrendingUp}
//             isExpanded={expanded === "movingAvg"}
//             onToggle={() => toggle("movingAvg")}
//           >
//             {mvData.length === 0 ? (
//               <EmptyState
//                 icon={HiOutlineTrendingUp}
//                 title="No trend data"
//                 description="Moving average trends will be displayed here"
//               />
//             ) : (
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={mvData}>
//                   <defs>
//                     <linearGradient
//                       id="movingAvgGradient"
//                       x1="0"
//                       y1="0"
//                       x2="0"
//                       y2="1"
//                     >
//                       <stop
//                         offset="5%"
//                         stopColor={COLORS[1]}
//                         stopOpacity={0.3}
//                       />
//                       <stop
//                         offset="95%"
//                         stopColor={COLORS[1]}
//                         stopOpacity={0}
//                       />
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     stroke="#E5E7EB"
//                     opacity={0.5}
//                   />
//                   <XAxis
//                     dataKey="period"
//                     tick={{ fontSize: 12 }}
//                     tickLine={false}
//                     axisLine={false}
//                   />
//                   <YAxis
//                     tick={{ fontSize: 12 }}
//                     tickLine={false}
//                     axisLine={false}
//                   />
//                   <Tooltip content={<CustomTooltip />} />
//                   <Area
//                     type="monotone"
//                     dataKey="movingAverage"
//                     fill="url(#movingAvgGradient)"
//                     stroke="none"
//                   />
//                   <Line
//                     dataKey="movingAverage"
//                     name="Moving Average"
//                     stroke={COLORS[1]}
//                     strokeWidth={3}
//                     dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
//                     activeDot={{ r: 6, strokeWidth: 2 }}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             )}
//           </ChartCard>

//           {/* Period Change */}
//           <ChartCard
//             title="Period-to-Period Change"
//             icon={HiOutlineTrendingDown}
//             isExpanded={expanded === "periodChange"}
//             onToggle={() => toggle("periodChange")}
//           >
//             {mvData.length === 0 ? (
//               <EmptyState
//                 icon={HiOutlineTrendingDown}
//                 title="No change data"
//                 description="Period-to-period changes will be shown here"
//               />
//             ) : (
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={mvData}>
//                   <defs>
//                     <linearGradient
//                       id="changeBarPositive"
//                       x1="0"
//                       y1="0"
//                       x2="0"
//                       y2="1"
//                     >
//                       <stop
//                         offset="5%"
//                         stopColor={COLORS[2]}
//                         stopOpacity={0.8}
//                       />
//                       <stop
//                         offset="95%"
//                         stopColor={COLORS[2]}
//                         stopOpacity={0.6}
//                       />
//                     </linearGradient>
//                     <linearGradient
//                       id="changeBarNegative"
//                       x1="0"
//                       y1="0"
//                       x2="0"
//                       y2="1"
//                     >
//                       <stop
//                         offset="5%"
//                         stopColor={COLORS[3]}
//                         stopOpacity={0.8}
//                       />
//                       <stop
//                         offset="95%"
//                         stopColor={COLORS[3]}
//                         stopOpacity={0.6}
//                       />
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     stroke="#E5E7EB"
//                     opacity={0.5}
//                   />
//                   <XAxis
//                     dataKey="period"
//                     tick={{ fontSize: 12 }}
//                     tickLine={false}
//                     axisLine={false}
//                   />
//                   <YAxis
//                     tickFormatter={(v) => `${v}%`}
//                     tick={{ fontSize: 12 }}
//                     tickLine={false}
//                     axisLine={false}
//                   />
//                   <Tooltip content={<CustomTooltip />} />
//                   <Bar
//                     dataKey="periodChange"
//                     name="% Change"
//                     fill={(entry) =>
//                       entry > 0
//                         ? "url(#changeBarPositive)"
//                         : "url(#changeBarNegative)"
//                     }
//                     radius={[4, 4, 0, 0]}
//                   >
//                     <LabelList
//                       dataKey="periodChange"
//                       position="top"
//                       formatter={(v) => (v != null ? `${v}%` : "")}
//                       fontSize={10}
//                     />
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             )}
//           </ChartCard>
//         </div>

//         {/* Daily KPI Performance */}
//         <ChartCard
//           title="Daily KPI Performance"
//           icon={FiCalendar}
//           isExpanded={expanded === "daily-kpi"}
//           onToggle={() => toggle("daily-kpi")}
//           className="col-span-full"
//         >
//           {avgDailyKpi.length === 0 ? (
//             <EmptyState
//               icon={FiCalendar}
//               title="No daily KPI data"
//               description="Daily KPI performance metrics will be displayed here"
//             />
//           ) : (
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart
//                 data={avgDailyKpi.map((k) => ({
//                   kpiName: k.kpiName,
//                   avgDailyScore: Math.round(k.avgDailyScore * 10) / 10,
//                 }))}
//                 margin={{ bottom: 60 }}
//               >
//                 <defs>
//                   <linearGradient id="dailyKpiBar" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor={COLORS[6]} stopOpacity={0.8} />
//                     <stop
//                       offset="95%"
//                       stopColor={COLORS[6]}
//                       stopOpacity={0.6}
//                     />
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   stroke="#E5E7EB"
//                   opacity={0.5}
//                 />
//                 <XAxis
//                   dataKey="kpiName"
//                   angle={-45}
//                   textAnchor="end"
//                   height={80}
//                   tick={{ fontSize: 11 }}
//                   tickLine={false}
//                   axisLine={false}
//                 />
//                 <YAxis
//                   tick={{ fontSize: 12 }}
//                   tickLine={false}
//                   axisLine={false}
//                 />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Bar
//                   dataKey="avgDailyScore"
//                   name="Avg Daily Score"
//                   fill="url(#dailyKpiBar)"
//                   radius={[4, 4, 0, 0]}
//                 >
//                   <LabelList
//                     dataKey="avgDailyScore"
//                     position="top"
//                     fontSize={11}
//                   />
//                 </Bar>
//               </BarChart>
//             </ResponsiveContainer>
//           )}
//         </ChartCard>

//         {/* Data Tables Section */}
//         <div className="space-y-6">
//           {/* Employee Performance Table */}
//           <motion.div
//             variants={cardVariants}
//             className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
//           >
//             <div className="p-6 border-b border-gray-100 dark:border-gray-800">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <motion.div
//                     variants={iconVariants}
//                     whileHover="hover"
//                     className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg"
//                   >
//                     <FiUsers className="w-5 h-5 text-white" />
//                   </motion.div>
//                   <div>
//                     <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                       Employee Performance
//                     </h3>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       Comprehensive employee metrics
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="p-6">
//               <ResponsiveTable
//                 headers={["Employee", "Avg Rating", "Rating Count", "Category"]}
//                 rows={employees}
//                 rowRenderer={(e) => [
//                   <div className="flex items-center space-x-3">
//                     <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
//                       {e.employee?.first_Name?.[0]}
//                       {e.employee?.last_Name?.[0]}
//                     </div>
//                     <span className="font-medium">{`${
//                       e.employee?.first_Name || ""
//                     } ${e.employee?.last_Name || ""}`}</span>
//                   </div>,
//                   <div className="flex items-center space-x-2">
//                     <span className="font-medium">{e.averageRating}</span>
//                     <div
//                       className={`px-2 py-1 rounded-full text-xs ${
//                         e.averageRating >= 4
//                           ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400"
//                           : e.averageRating >= 3
//                           ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400"
//                           : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400"
//                       }`}
//                     >
//                       {e.averageRating >= 4
//                         ? "Excellent"
//                         : e.averageRating >= 3
//                         ? "Good"
//                         : "Needs Improvement"}
//                     </div>
//                   </div>,
//                   e.ratingCount,
//                   <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-medium">
//                     {e.category}
//                   </span>,
//                 ]}
//                 searchable={true}
//               />
//             </div>
//           </motion.div>

//           {/* Top and Bottom Performers */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Top Performers */}
//             <motion.div
//               variants={cardVariants}
//               className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
//             >
//               <div className="p-6 border-b border-gray-100 dark:border-gray-800">
//                 <div className="flex items-center space-x-3">
//                   <motion.div
//                     variants={iconVariants}
//                     whileHover="hover"
//                     className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg"
//                   >
//                     <FiTrendingUp className="w-5 h-5 text-white" />
//                   </motion.div>
//                   <div>
//                     <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                       Top Performers
//                     </h3>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       Highest rated team members
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <ResponsiveTable
//                   headers={["Employee", "Rating", "Category"]}
//                   rows={top}
//                   rowRenderer={(p) => [
//                     <div className="flex items-center space-x-3">
//                       <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
//                         {p.employee?.first_Name?.[0]}
//                         {p.employee?.last_Name?.[0]}
//                       </div>
//                       <div>
//                         <div className="font-medium">{`${
//                           p.employee?.first_Name || ""
//                         } ${p.employee?.last_Name || ""}`}</div>
//                         <div className="text-xs text-gray-500 dark:text-gray-400">
//                           Top performer
//                         </div>
//                       </div>
//                     </div>,
//                     <div className="flex items-center space-x-2">
//                       <span className="text-2xl font-bold text-green-600 dark:text-green-400">
//                         {p.averageRating}
//                       </span>
//                       <FiTrendingUp className="w-4 h-4 text-green-500" />
//                     </div>,
//                     <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
//                       {p.category}
//                     </span>,
//                   ]}
//                 />
//               </div>
//             </motion.div>

//             {/* Bottom Performers */}
//             <motion.div
//               variants={cardVariants}
//               className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
//             >
//               <div className="p-6 border-b border-gray-100 dark:border-gray-800">
//                 <div className="flex items-center space-x-3">
//                   <motion.div
//                     variants={iconVariants}
//                     whileHover="hover"
//                     className="p-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl shadow-lg"
//                   >
//                     <FiTrendingDown className="w-5 h-5 text-white" />
//                   </motion.div>
//                   <div>
//                     <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                       Needs Improvement
//                     </h3>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       Focus areas for development
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <ResponsiveTable
//                   headers={["Employee", "Rating", "Category"]}
//                   rows={bottom}
//                   rowRenderer={(p) => [
//                     <div className="flex items-center space-x-3">
//                       <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
//                         {p.employee?.first_Name?.[0]}
//                         {p.employee?.last_Name?.[0]}
//                       </div>
//                       <div>
//                         <div className="font-medium">{`${
//                           p.employee?.first_Name || ""
//                         } ${p.employee?.last_Name || ""}`}</div>
//                         <div className="text-xs text-gray-500 dark:text-gray-400">
//                           Development focus
//                         </div>
//                       </div>
//                     </div>,
//                     <div className="flex items-center space-x-2">
//                       <span className="text-2xl font-bold text-red-600 dark:text-red-400">
//                         {p.averageRating}
//                       </span>
//                       <FiTrendingDown className="w-4 h-4 text-red-500" />
//                     </div>,
//                     <span className="px-3 py-1 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-full text-xs font-medium">
//                       {p.category}
//                     </span>,
//                   ]}
//                 />
//               </div>
//             </motion.div>
//           </div>

//           {/* Performance Heatmap */}
//           <motion.div
//             variants={cardVariants}
//             className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
//           >
//             <div className="p-6 border-b border-gray-100 dark:border-gray-800">
//               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                 <div className="flex items-center space-x-3">
//                   <motion.div
//                     variants={iconVariants}
//                     whileHover="hover"
//                     className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl shadow-lg"
//                   >
//                     <FiFilter className="w-5 h-5 text-white" />
//                   </motion.div>
//                   <div>
//                     <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                       Performance Heatmap
//                     </h3>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       Employee performance across periods
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <div className="flex items-center space-x-2 text-sm">
//                     <div className="w-3 h-3 bg-red-100 dark:bg-red-900 rounded"></div>
//                     <span className="text-gray-600 dark:text-gray-400">
//                       0-39%
//                     </span>
//                   </div>
//                   <div className="flex items-center space-x-2 text-sm">
//                     <div className="w-3 h-3 bg-yellow-100 dark:bg-yellow-900 rounded"></div>
//                     <span className="text-gray-600 dark:text-gray-400">
//                       40-59%
//                     </span>
//                   </div>
//                   <div className="flex items-center space-x-2 text-sm">
//                     <div className="w-3 h-3 bg-blue-100 dark:bg-blue-900 rounded"></div>
//                     <span className="text-gray-600 dark:text-gray-400">
//                       60-79%
//                     </span>
//                   </div>
//                   <div className="flex items-center space-x-2 text-sm">
//                     <div className="w-3 h-3 bg-green-100 dark:bg-green-900 rounded"></div>
//                     <span className="text-gray-600 dark:text-gray-400">
//                       80-100%
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="p-6">
//               {heatmap.length === 0 ? (
//                 <EmptyState
//                   icon={FiFilter}
//                   title="No heatmap data"
//                   description="Performance heatmap will be displayed here once data is available"
//                 />
//               ) : (
//                 <div className="overflow-x-auto">
//                   <div className="min-w-full">
//                     <div className="grid grid-cols-[200px_1fr] gap-0 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
//                       {/* Header */}
//                       <div className="bg-gray-50 dark:bg-gray-800 p-4 border-r border-gray-200 dark:border-gray-700">
//                         <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
//                           Employee
//                         </span>
//                       </div>
//                       <div
//                         className="bg-gray-50 dark:bg-gray-800 p-2 grid gap-1"
//                         style={{
//                           gridTemplateColumns: `repeat(${chart.length}, minmax(80px, 1fr))`,
//                         }}
//                       >
//                         {chart.map((c, i) => (
//                           <div key={i} className="text-center p-2">
//                             <span className="text-xs font-medium text-gray-700 dark:text-gray-300 transform -rotate-45 inline-block">
//                               {c.period}
//                             </span>
//                           </div>
//                         ))}
//                       </div>

//                       {/* Data Rows */}
//                       {heatmap.map((row, i) => (
//                         <React.Fragment key={i}>
//                           <div className="p-4 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center">
//                             <div className="flex items-center space-x-3">
//                               <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
//                                 {row.employee
//                                   ?.split(" ")
//                                   .map((n) => n[0])
//                                   .join("")}
//                               </div>
//                               <span className="text-sm font-medium text-gray-900 dark:text-white">
//                                 {row.employee}
//                               </span>
//                             </div>
//                           </div>
//                           <div
//                             className="p-2 bg-white dark:bg-gray-900 grid gap-1"
//                             style={{
//                               gridTemplateColumns: `repeat(${chart.length}, minmax(80px, 1fr))`,
//                             }}
//                           >
//                             {row.data.map((cell, j) => {
//                               const score = cell.normalizedScore || 0;
//                               let bgColorClass = "bg-gray-50 dark:bg-gray-800";
//                               let textColorClass =
//                                 "text-gray-700 dark:text-gray-300";

//                               if (score >= 80) {
//                                 bgColorClass =
//                                   "bg-green-100 dark:bg-green-900/50";
//                                 textColorClass =
//                                   "text-green-800 dark:text-green-300";
//                               } else if (score >= 60) {
//                                 bgColorClass =
//                                   "bg-blue-100 dark:bg-blue-900/50";
//                                 textColorClass =
//                                   "text-blue-800 dark:text-blue-300";
//                               } else if (score >= 40) {
//                                 bgColorClass =
//                                   "bg-yellow-100 dark:bg-yellow-900/50";
//                                 textColorClass =
//                                   "text-yellow-800 dark:text-yellow-300";
//                               } else if (score > 0) {
//                                 bgColorClass = "bg-red-100 dark:bg-red-900/50";
//                                 textColorClass =
//                                   "text-red-800 dark:text-red-300";
//                               }

//                               return (
//                                 <motion.div
//                                   key={j}
//                                   whileHover={{ scale: 1.1, zIndex: 10 }}
//                                   className={`${bgColorClass} ${textColorClass} p-3 rounded-lg text-center text-sm font-medium transition-all duration-200 cursor-pointer`}
//                                 >
//                                   {score || "-"}
//                                 </motion.div>
//                               );
//                             })}
//                           </div>
//                         </React.Fragment>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }



import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

// Enhanced reusable components
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 10 }}
      className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 text-sm max-w-xs"
    >
      <p className="font-semibold mb-3 text-gray-900 dark:text-white">
        {label}
      </p>
      <div className="space-y-2">
        {payload.map((p, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: p.color }}
              />
              <span className="text-gray-700 dark:text-gray-300">
                {p.name}:
              </span>
            </div>
            <span className="font-medium text-gray-900 dark:text-white">
              {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
              {p.unit || ""}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const ScatterTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { period, target, achieved } = payload[0].payload;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 text-sm"
    >
      <p className="font-semibold mb-2 text-gray-900 dark:text-white">
        {period}
      </p>
      <div className="space-y-1">
        <p className="text-gray-700 dark:text-gray-300">
          Target: <span className="font-medium">{target}</span>
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Achieved: <span className="font-medium">{achieved}</span>
        </p>
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

const ResponsiveTable = ({
  headers,
  rows,
  rowRenderer,
  searchable = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("table"); // table or cards

  const filteredRows = useMemo(() => {
    if (!searchTerm) return rows;
    return rows.filter((row) =>
      rowRenderer(row).some((cell) =>
        String(cell).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [rows, searchTerm, rowRenderer]);

  return (
    <div className="space-y-4">
      {searchable && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-lg ${
                viewMode === "table"
                  ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400"
                  : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <HiOutlineViewList className="w-5 h-5" />
            </motion.button>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setViewMode("cards")}
              className={`p-2 rounded-lg ${
                viewMode === "cards"
                  ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400"
                  : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <HiOutlineViewGrid className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      )}

      {viewMode === "table" ? (
        <div className="overflow-x-auto rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
          <table className="min-w-full divide-y divide-gray-200/50 dark:divide-gray-700/50">
            <thead className="bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <tr>
                {headers.map((header, idx) => (
                  <th
                    key={idx}
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm divide-y divide-gray-200/50 dark:divide-gray-700/50">
              <AnimatePresence>
                {filteredRows.map((row, rowIdx) => (
                  <motion.tr
                    key={rowIdx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: rowIdx * 0.05 }}
                    className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    {rowRenderer(row).map((cell, cellIdx) => (
                      <td
                        key={cellIdx}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
                      >
                        {cell}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredRows.map((row, rowIdx) => {
              const cells = rowRenderer(row);
              return (
                <motion.div
                  key={rowIdx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: rowIdx * 0.05 }}
                  className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50"
                >
                  {headers.map((header, idx) => (
                    <div key={idx} className="mb-2 last:mb-0">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {header}:
                      </span>
                      <div className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                        {cells[idx]}
                      </div>
                    </div>
                  ))}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default function PerformanceAnalytics({ data, onRefresh }) {
  const {
    chart = [],
    aggregatedTeam = [],
    categories = [],
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

  // Enhanced data processing
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

  const categoriesWithPeriods = useMemo(() => {
    return categories.map((cat) => ({
      ...cat,
      periods: categoryMap[cat.category] || [],
    }));
  }, [categories, categoryMap]);

  const mvData = useMemo(
    () =>
      chart.map((c, i) => ({
        period: c.period,
        movingAverage: movingAverage[i] ?? 0,
        periodChange: periodChange[i] ?? 0,
      })),
    [chart, movingAverage, periodChange]
  );

  const categoryDistributionData = useMemo(() => {
  return (data?.categoryDist || []).map((cat) => ({
    category: cat.category,
    value: cat.value,
    periods: cat.periods || [],
  }));
}, [data]);


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
  const avgPerf = chart.length
    ? Math.round(
        chart.reduce((s, c) => s + (c.percentOfTarget || 0), 0) / chart.length
      )
    : 0;
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
            title="Team Members dummy"
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
                <FiEye className="w-4 h-4" />
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
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor={COLORS[0]}
                        stopOpacity={0}
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
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor={COLORS[1]}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    opacity={0.5}
                  />
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
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
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                    activeDot={{ r: 6, strokeWidth: 2 }}
                  />
                  <Line
                    yAxisId="right"
                    dataKey="percentOfTarget"
                    name="% of Target"
                    stroke={COLORS[1]}
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                    activeDot={{ r: 6, strokeWidth: 2 }}
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
                      <stop offset="100%" stopColor="#4f46e5" />
                    </linearGradient>
                    <linearGradient id="achievedBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    opacity={0.5}
                  />
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar
                    dataKey="totalTarget"
                    name="Target"
                    fill="url(#targetBar)"
                    radius={[4, 4, 0, 0]}
                  >
                    <LabelList
                      dataKey="totalTarget"
                      position="top"
                      formatter={(v) => v.toLocaleString()}
                      fontSize={10}
                    />
                  </Bar>
                  <Bar
                    dataKey="totalAchieved"
                    name="Achieved"
                    fill="url(#achievedBar)"
                    radius={[4, 4, 0, 0]}
                  >
                    <LabelList
                      dataKey="totalAchieved"
                      position="top"
                      formatter={(v) => v.toLocaleString()}
                      fontSize={10}
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
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="50%"
                        stopColor={COLORS[1]}
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="95%"
                        stopColor={COLORS[1]}
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    opacity={0.5}
                  />
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="normalizedScore"
                    name="Normalized Score"
                    stroke={COLORS[1]}
                    strokeWidth={3}
                    fill="url(#perfGradient)"
                    dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </ChartCard>

          {/* Category Distribution */}
          <ChartCard
            title="Category Distribution"
            icon={RiPieChartLine}
            isExpanded={expanded === "categories"}
            onToggle={() => toggle("categories")}
          >
            {categoriesWithPeriods.length === 0 ? (
              <EmptyState
                icon={RiPieChartLine}
                title="No category data"
                description="Category distribution will be displayed here"
              />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoriesWithPeriods}
                    dataKey="value"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    label={({ category, value }) => `${category}: ${value}`}
                  >
                    {categoriesWithPeriods.map((_, i) => (
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
    const { category, value, periods } = payload[0].payload;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 text-sm max-w-xs"
      >
        <p className="font-semibold mb-2 text-gray-900 dark:text-white">
          {category}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          {value} period{value > 1 ? "s" : ""}
        </p>
        {periods.length > 0 && (
          <>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
              Periods:
            </p>
            <p className="text-xs text-gray-800 dark:text-gray-200 break-words">
              {periods.join(", ")}
            </p>
          </>
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
                  margin={{ left: 80, right: 30, top: 20, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="kpiBar" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#0891b2" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    opacity={0.5}
                  />
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="kpiName"
                    width={80}
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="avgPercent"
                    name="Average Percentage"
                    fill="url(#kpiBar)"
                    radius={[0, 6, 6, 0]}
                  >
                    <LabelList
                      dataKey="avgPercent"
                      position="right"
                      formatter={(v) => `${v}%`}
                      fontSize={12}
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
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    opacity={0.5}
                  />
                  <XAxis
                    dataKey="target"
                    name="Target"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    dataKey="achieved"
                    name="Achieved"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    content={<ScatterTooltip />}
                  />
                  <Scatter
                    data={scatter}
                    fill={COLORS[2]}
                    shape="circle"
                    r={6}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                  {/* Add trend line if possible */}
                  <Line
                    type="linear"
                    dataKey="target"
                    stroke={COLORS[4]}
                    strokeDasharray="5 5"
                    dot={false}
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
                      return (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 text-sm max-w-xs"
                        >
                          <p className="font-semibold mb-2 text-gray-900 dark:text-white">
                            {range}
                          </p>
                          <p className="text-gray-700 dark:text-gray-300 mb-2">
                            {count} period{count > 1 ? "s" : ""}
                          </p>
                          {periods.length > 0 && (
                            <>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                Periods:
                              </p>
                              <p className="text-xs text-gray-800 dark:text-gray-200 break-words">
                                {periods.join(", ")}
                              </p>
                            </>
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
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor={COLORS[1]}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    opacity={0.5}
                  />
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
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
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                    activeDot={{ r: 6, strokeWidth: 2 }}
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
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                    <linearGradient id="changeBarNegative" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f87171" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    opacity={0.5}
                  />
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="periodChange"
                    name="% Change"
                    radius={[4, 4, 0, 0]}
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
                      formatter={(v) => (v != null ? `${v}%` : "")}
                      fontSize={10}
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
                margin={{ bottom: 20 }}
              >
                <defs>
                  <linearGradient id="dailyKpiBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ea580c" />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E5E7EB"
                  opacity={0.5}
                />
                <XAxis
                  dataKey="kpiName"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="avgDailyScore"
                  name="Avg Daily Score"
                  fill="url(#dailyKpiBar)"
                  radius={[4, 4, 0, 0]}
                >
                  <LabelList
                    dataKey="avgDailyScore"
                    position="top"
                    fontSize={11}
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
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
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
                headers={["Employee", "Avg Rating", "Rating Count", "Category"]}
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
              <div className="p-6">
                <ResponsiveTable
                  headers={["Employee", "Rating", "Category"]}
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
              <div className="p-6">
                <ResponsiveTable
                  headers={["Employee", "Rating", "Category"]}
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
            <div className="p-6">
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