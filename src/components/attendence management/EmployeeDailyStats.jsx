// import { useEffect, useMemo } from "react";
// import { useParams } from "react-router-dom";
// import {
//   FiClock,
//   FiCoffee,
//   FiActivity,
//   FiMonitor,
//   FiGlobe,
//   FiTrendingUp,
//   FiInfo,
//   FiEye,
//   FiEyeOff,
//   FiDownload,
//   FiShare2,
//   FiCalendar,
//   FiUser,
//   FiBarChart,
//   FiPieChart,
//   FiZap,
//   FiRefreshCw,
// } from "react-icons/fi";
// import useUsageStatsStore from "../../store/useUsageStore";
// import useFullAttendanceStore from "../../store/useFullAttendanceStore";
// import CustomTooltip from "./CustomToolTip";
// import {
//   ResponsiveContainer,
//   BarChart,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   Bar,
// } from "recharts";

// export default function EmployeeDailyStats() {
//   const { attendanceData } = useFullAttendanceStore();
//   const { empID, date } = useParams();
//   const [expandedWebsites, setExpandedWebsites] = useState({});
//   const [expandedApps, setExpandedApps] = useState({});
//   const [activeTab, setActiveTab] = useState("overview");

//   const {
//     dailyStats,
//     fetchDailyStats,
//     fetchDeptCategories,
//     deptCategories,
//     loading,
//     error,
//     timeline,
//     fetchTimeline,
//     fetchGraphData,
//     graphData,
//   } = useUsageStatsStore();

//   const attendanceRecord = useMemo(() => {
//     return attendanceData.find((rec) => rec.date === date);
//   }, [attendanceData, date]);

//   useEffect(() => {
//     fetchDailyStats(empID, date).then((data) => {
//       if (data?.department) {
//         fetchDeptCategories(data.department);
//       }
//     });
//     fetchTimeline(empID, date);
//     fetchGraphData(empID, date);
//   }, [empID, date]);

//   const { productiveTime, unproductiveTime } = useMemo(() => {
//     if (!dailyStats || !deptCategories)
//       return { productiveTime: 0, unproductiveTime: 0 };

//     const prodSet = new Set(
//       deptCategories.productive.map((d) => d.name.toLowerCase())
//     );
//     const unprodSet = new Set(
//       deptCategories.unproductive.map((d) => d.name.toLowerCase())
//     );

//     let productiveTime = 0;
//     let unproductiveTime = 0;

//     dailyStats.appsUsed.forEach((app) => {
//       const appName = app.appName.toLowerCase();
//       if (prodSet.has(appName)) productiveTime += app.minutesUsed;
//       else if (unprodSet.has(appName)) unproductiveTime += app.minutesUsed;
//     });

//     dailyStats.websitesVisited.forEach((site) => {
//       const url = site.url.toLowerCase();
//       if (prodSet.has(url)) productiveTime += site.minutesVisited;
//       else if (unprodSet.has(url)) unproductiveTime += site.minutesVisited;
//     });

//     return { productiveTime, unproductiveTime };
//   }, [dailyStats, deptCategories]);

//   const combinedTimeline = useMemo(() => {
//     const baseTimeline = (timeline || []).map((item, idx) => ({
//       startTime: item.startTime,
//       endTime: item.endTime,
//       name: item.name,
//       type: item.type || "app",
//       duration:
//         item.duration ||
//         Math.round(
//           (new Date(`2000-01-01T${item.endTime}`) -
//             new Date(`2000-01-01T${item.startTime}`)) /
//             60000
//         ),
//       id: `activity-${idx}-${item.startTime}`,
//     }));

//     const breaksTimeline = (attendanceRecord?.breaks || [])
//       .filter((br) => {
//         const breakDate = new Date(br.start).toISOString().split("T")[0];
//         return breakDate === date;
//       })
//       .map((br, idx) => {
//         const start = new Date(br.start);
//         let end = new Date(br.end);
//         if (end <= start) end.setDate(end.getDate() + 1);

//         const duration = Math.round((end - start) / 60000);
//         return {
//           startTime: start.toTimeString().slice(0, 5),
//           endTime: end.toTimeString().slice(0, 5),
//           name: "Break",
//           type: "break",
//           duration: duration > 0 ? duration : 0,
//           id: `break-${idx}-${start.getTime()}`,
//         };
//       });

//     return [...baseTimeline, ...breaksTimeline].sort((a, b) => {
//       const aDate = new Date(`2000-01-01T${a.startTime}`);
//       const bDate = new Date(`2000-01-01T${b.startTime}`);
//       return aDate - bDate;
//     });
//   }, [timeline, attendanceRecord, date]);

//   const toggleWebsiteExpansion = (index) => {
//     setExpandedWebsites((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }));
//   };

//   const toggleAppExpansion = (index) => {
//     setExpandedApps((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }));
//   };

//   const formatUrl = (url) => {
//     return url.replace(/^https?:\/\/(www\.)?/, "");
//   };

//   const shouldShowExpandButton = (text, maxLength = 25) => {
//     return text && text.length > maxLength;
//   };

//   const truncateText = (text, maxLength = 25) => {
//     if (!text) return "";
//     return text.length > maxLength
//       ? text.substring(0, maxLength) + "..."
//       : text;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 flex items-center justify-center">
//         <div className="relative">
//           <div className="w-20 h-20 border-4 border-indigo-200 dark:border-indigo-800 rounded-full animate-spin">
//             <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-indigo-500 rounded-full animate-spin"></div>
//           </div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <FiBarChart className="w-8 h-8 text-indigo-500 animate-pulse" />
//           </div>
//         </div>
//         <div className="ml-6">
//           <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
//             Loading Analytics
//           </h3>
//           <p className="text-gray-500 dark:text-gray-400 mt-1">
//             Fetching daily statistics...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-950 dark:to-rose-950 flex items-center justify-center p-4">
//         <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center">
//           <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
//             <FiInfo className="w-10 h-10 text-red-500" />
//           </div>
//           <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
//             Oops! Something went wrong
//           </h3>
//           <p className="text-gray-600 dark:text-gray-400 mb-8">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-rose-600 transition-all duration-200 shadow-lg hover:shadow-xl"
//           >
//             <FiRefreshCw className="mr-2" />
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!dailyStats) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 flex items-center justify-center p-4">
//         <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center">
//           <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
//             <FiBarChart className="w-10 h-10 text-blue-500" />
//           </div>
//           <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
//             No Data Available
//           </h3>
//           <p className="text-gray-600 dark:text-gray-400">
//             No statistics found for the selected date.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const totalTime = productiveTime + unproductiveTime;
//   const productivityPercentage =
//     totalTime > 0 ? Math.round((productiveTime / totalTime) * 100) : 0;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
//       {/* Enhanced Header */}
//       <div className="relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
//         <div className="absolute inset-0 bg-black/20"></div>
//         <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10"></div>

//         <div className="relative px-6 py-12">
//           <div className="max-w-7xl mx-auto">
//             <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
//               <div className="text-white mb-6 lg:mb-0">
//                 <div className="flex items-center mb-4">
//                   <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 mr-4">
//                     <FiUser className="w-8 h-8" />
//                   </div>
//                   <div>
//                     <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
//                       Daily Analytics
//                     </h1>
//                     <p className="text-blue-100 text-lg mt-2">
//                       Employee Performance Dashboard
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex flex-wrap items-center gap-4 text-white/90">
//                   <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
//                     <FiCalendar className="mr-2" />
//                     <span className="font-medium">
//                       {new Date(date).toLocaleDateString("en-US", {
//                         weekday: "long",
//                         year: "numeric",
//                         month: "long",
//                         day: "numeric",
//                       })}
//                     </span>
//                   </div>
//                   <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
//                     <FiUser className="mr-2" />
//                     <span className="font-medium">Employee #{empID}</span>
//                   </div>
//                 </div>
//               </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
//           <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
//             <FiActivity className="mr-2 text-indigo-500" />
//             Productivity Overview
//           </h2>

//           <div className="flex items-center justify-between mb-6">
//             <div className="text-center">
//               <div className="text-3xl font-bold text-emerald-500">{productivityPercentage}%</div>
//               <div className="text-sm text-gray-500 dark:text-gray-400">Productivity</div>
//             </div>

//             <div className="w-36 h-36 relative">
//               <div className="absolute inset-0 rounded-full bg-gray-200 dark:bg-gray-700"></div>
//               <div
//                 className="absolute inset-0 rounded-full border-[12px] border-emerald-500"
//                 style={{
//                   clipPath: `inset(0 0 0 ${100 - productivityPercentage}%)`
//                 }}
//               ></div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="text-center">
//                   <div className="text-xl font-bold text-gray-800 dark:text-white">{productiveTime + unproductiveTime}m</div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-900/10 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
//               <div className="flex items-center">
//                 <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300 p-2 rounded-lg mr-3">
//                   <FiTrendingUp className="w-5 h-5" />
//                 </div>
//                 <div>
//                   <div className="text-sm text-gray-600 dark:text-gray-300">Productive</div>
//                   <div className="text-xl font-bold text-emerald-600 dark:text-emerald-300">{productiveTime}m</div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-900/10 p-4 rounded-xl border border-rose-100 dark:border-rose-900/30">
//               <div className="flex items-center">
//                 <div className="bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-300 p-2 rounded-lg mr-3">
//                   <FiCoffee className="w-5 h-5" />
//                 </div>
//                 <div>
//                   <div className="text-sm text-gray-600 dark:text-gray-300">Unproductive</div>
//                   <div className="text-xl font-bold text-rose-600 dark:text-rose-300">{unproductiveTime}m</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
//           <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
//             <FiClock className="mr-2 text-indigo-500" />
//             Attendance Summary
//           </h2>

//           {attendanceRecord ? (
//             <>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//                 <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30">
//                   <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Login Time</div>
//                   <div className="text-xl font-bold text-blue-600 dark:text-blue-300">
//                     {attendanceRecord.login}
//                   </div>
//                 </div>

//                 <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 p-4 rounded-xl border border-purple-100 dark:border-purple-900/30">
//                   <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Logout Time</div>
//                   <div className="text-xl font-bold text-purple-600 dark:text-purple-300">
//                     {attendanceRecord.logout || "Still active"}
//                   </div>
//                 </div>
//               </div>

//               {attendanceRecord.breaks && attendanceRecord.breaks.length > 0 && (
//                 <div>
//                   <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Breaks Taken</h3>
//                   <div className="space-y-2">
//                     {attendanceRecord.breaks.map((br, i) => (
//                       <div key={i} className="flex items-center bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg">
//                         <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300 p-2 rounded-lg mr-3">
//                           <FiCoffee className="w-4 h-4" />
//                         </div>
//                         <div>
//                           <div className="font-medium text-gray-800 dark:text-gray-200">
//                             {new Date(br.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
//                             {" → "}
//                             {new Date(br.end).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
//                           </div>
//                           <div className="text-xs text-gray-500 dark:text-gray-400">
//                             {Math.round((new Date(br.end) - new Date(br.start)) / 60000)} minutes
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </>
//           ) : (
//             <div className="text-center py-8">
//               <div className="bg-gray-100 dark:bg-gray-700/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <FiInfo className="w-8 h-8 text-gray-400" />
//               </div>
//               <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">
//                 No attendance record
//               </h3>
//               <p className="text-gray-500 dark:text-gray-400">
//                 No attendance data available for this date
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
//           <div className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 px-6 py-4 flex items-center">
//             <div className="mr-3 text-white bg-indigo-400/20 p-2 rounded-lg">
//               <FiMonitor className="w-5 h-5" />
//             </div>
//             <h3 className="text-white text-lg font-semibold">Apps Used</h3>
//           </div>
//           <div className="p-4">
//             <ul className="divide-y divide-gray-100 dark:divide-gray-700">
//               {dailyStats.appsUsed.length > 0 ? (
//                 dailyStats.appsUsed.map((app, i) => (
//                   <li key={i} className="py-3 flex items-center justify-between">
//                     <div className="flex items-center">
//                       <div className="bg-gray-100 dark:bg-gray-700 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
//                         <FiMonitor className="text-indigo-500" />
//                       </div>
//                       <div>
//                         <div className="font-medium text-gray-800 dark:text-gray-200">{app.appName}</div>
//                         <div className="text-xs text-gray-500 dark:text-gray-400">{app.category || "Uncategorized"}</div>
//                       </div>
//                     </div>
//                     <div className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-medium">
//                       {app.minutesUsed}m
//                     </div>
//                   </li>
//                 ))
//               ) : (
//                 <li className="py-8 text-center text-gray-500 dark:text-gray-400">
//                   <div className="flex flex-col items-center">
//                     <FiInfo className="w-8 h-8 text-gray-400 mb-2" />
//                     No apps used
//                   </div>
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>

//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
//           <div className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 px-6 py-4 flex items-center">
//             <div className="mr-3 text-white bg-indigo-400/20 p-2 rounded-lg">
//               <FiGlobe className="w-5 h-5" />
//             </div>
//             <h3 className="text-white text-lg font-semibold">Websites Visited</h3>
//           </div>
//           <div className="p-4">
//             <ul className="divide-y divide-gray-100 dark:divide-gray-700">
//               {dailyStats.websitesVisited.length > 0 ? (
//                 dailyStats.websitesVisited.map((site, i) => (
//                   <li key={i} className="py-3 flex items-center justify-between">
//                     <div className="flex items-center">
//                       <div className="bg-gray-100 dark:bg-gray-700 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
//                         <FiGlobe className="text-indigo-500" />
//                       </div>
//                       <div>
//                         <div className="font-medium text-gray-800 dark:text-gray-200 truncate max-w-[160px]">
//                           {site.url.replace(/^https?:\/\/(www\.)?/, "")}
//                         </div>
//                         <div className="text-xs text-gray-500 dark:text-gray-400">{site.category || "Uncategorized"}</div>
//                       </div>
//                     </div>
//                     <div className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-medium">
//                       {site.minutesVisited}m
//                     </div>
//                   </li>
//                 ))
//               ) : (
//                 <li className="py-8 text-center text-gray-500 dark:text-gray-400">
//                   <div className="flex flex-col items-center">
//                     <FiInfo className="w-8 h-8 text-gray-400 mb-2" />
//                     No websites visited
//                   </div>
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 mb-8">
//         <div className="flex flex-wrap justify-between items-center mb-6">
//           <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
//             <FiClock className="mr-2 text-indigo-500" />
//             Activity Timeline
//           </h2>
//           <div className="flex space-x-2 mt-2 sm:mt-0">
//             <span className="flex items-center text-sm">
//               <span className="block w-3 h-3 rounded-full mr-2 bg-indigo-500"></span>
//               App/Website
//             </span>
//             <span className="flex items-center text-sm">
//               <span className="block w-3 h-3 rounded-full mr-2 bg-amber-500"></span>
//               Break
//             </span>
//           </div>
//         </div>

//         {combinedTimeline.length > 0 ? (
//           <div className="relative pl-4">
//             {/* Timeline track */}
//             <div className="absolute left-[18px] top-0 w-1 h-full bg-gradient-to-b from-indigo-200 via-purple-200 to-pink-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full"></div>

//             <div className="space-y-8">
//               {combinedTimeline.map((block, idx) => {
//                 const isBreak = block.type === "break";
//                 const start24h = new Date(
//                   `2000-01-01 ${block.startTime}`
//                 ).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 });
//                 const end24h = new Date(
//                   `2000-01-01 ${block.endTime}`
//                 ).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 });

//                 return (
//                   <div key={idx} className="relative flex group">
//                     <div className="absolute left-[-9px] top-1/2 transform -translate-y-1/2 z-20">
//                       <div className={`w-5 h-5 rounded-full ${
//                         isBreak ? "bg-amber-500" : "bg-indigo-500"
//                       } border-4 border-white dark:border-gray-800`}></div>
//                     </div>

//                     <div className="ml-6 flex-1">
//                       <div className={`p-4 rounded-xl shadow-sm transition-all duration-300 group-hover:shadow-md ${
//                         isBreak
//                           ? "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/10 border border-amber-100 dark:border-amber-900/30"
//                           : "bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30"
//                       }`}>
//                         <div className="flex flex-wrap justify-between items-start">
//                           <div>
//                             <h3 className={`font-bold ${
//                               isBreak ? "text-amber-600 dark:text-amber-300" : "text-indigo-600 dark:text-indigo-300"
//                             }`}>
//                               {block.name}
//                             </h3>
//                             <div className="flex items-center mt-1">
//                               <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
//                                 {start24h} - {end24h}
//                               </span>
//                               {block.duration > 0 && (
//                                 <span className="ml-2 text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
//                                   {block.duration} min
//                                 </span>
//                               )}
//                             </div>
//                           </div>
//                           <div className="mt-2 sm:mt-0">
//                             <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
//                               isBreak
//                                 ? "bg-amber-100 text-amber-700 dark:bg-amber-700/30 dark:text-amber-200"
//                                 : "bg-indigo-100 text-indigo-700 dark:bg-indigo-700/30 dark:text-indigo-200"
//                             }`}>
//                               {block.type.toUpperCase()}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         ) : (
//           <div className="text-center py-8">
//             <div className="bg-gray-100 dark:bg-gray-700/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//               <FiInfo className="w-8 h-8 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">
//               No activity recorded
//             </h3>
//             <p className="text-gray-500 dark:text-gray-400">
//               No timeline data available for this date
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Summary Footer */}
//       <div className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 rounded-2xl shadow-xl p-6 text-white">
//         <div className="flex flex-col sm:flex-row justify-between items-center">
//           <div className="text-center sm:text-left mb-4 sm:mb-0">
//             <h3 className="text-lg font-bold">Daily Summary</h3>
//             <p className="text-indigo-100">
//               {productiveTime}m productive • {unproductiveTime}m unproductive
//             </p>
//           </div>
//           <div className="flex space-x-3">
//             <button className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
//               Export Report
//             </button>
//             <button className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
//               Share
//             </button>
//           </div>
//         </div>
//       </div>
//       {/* Productivity Graph Section */}
// <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 mb-8">
//   <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
//     <FiTrendingUp className="mr-2 text-indigo-500" />
//     Productivity Graph
//   </h2>

//             {graphData &&
//             graphData.length > 0 &&
//             graphData[0].Productivity > 0 ? (
//               <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-600/30">
//                 <ResponsiveContainer width="100%" height={400}>
//                   <BarChart
//                     data={graphData}
//                     margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                     <XAxis
//                       dataKey="time"
//                       stroke="#6b7280"
//                       fontSize={12}
//                       tickLine={false}
//                       axisLine={false}
//                     />
//                     <YAxis
//                       stroke="#6b7280"
//                       fontSize={12}
//                       tickLine={false}
//                       axisLine={false}
//                     />
//                     <Tooltip content={<CustomTooltip />} />
//                     <Legend />
//                     <Bar
//                       dataKey="Productivity"
//                       stackId="a"
//                       fill="url(#productiveGradient)"
//                       radius={[0, 0, 4, 4]}
//                     />
//                     <Bar
//                       dataKey="Unproductivity"
//                       stackId="a"
//                       fill="url(#unproductiveGradient)"
//                       radius={[0, 0, 0, 0]}
//                     />
//                     <Bar
//                       dataKey="BreakTime"
//                       stackId="a"
//                       fill="url(#breakGradient)"
//                       radius={[4, 4, 0, 0]}
//                     />
//                     <defs>
//                       <linearGradient
//                         id="productiveGradient"
//                         x1="0"
//                         y1="0"
//                         x2="0"
//                         y2="1"
//                       >
//                         <stop
//                           offset="5%"
//                           stopColor="#10b981"
//                           stopOpacity={0.8}
//                         />
//                         <stop
//                           offset="95%"
//                           stopColor="#10b981"
//                           stopOpacity={0.6}
//                         />
//                       </linearGradient>
//                       <linearGradient
//                         id="unproductiveGradient"
//                         x1="0"
//                         y1="0"
//                         x2="0"
//                         y2="1"
//                       >
//                         <stop
//                           offset="5%"
//                           stopColor="#ef4444"
//                           stopOpacity={0.8}
//                         />
//                         <stop
//                           offset="95%"
//                           stopColor="#ef4444"
//                           stopOpacity={0.6}
//                         />
//                       </linearGradient>
//                       <linearGradient
//                         id="breakGradient"
//                         x1="0"
//                         y1="0"
//                         x2="0"
//                         y2="1"
//                       >
//                         <stop
//                           offset="5%"
//                           stopColor="#a855f7"
//                           stopOpacity={0.8}
//                         />
//                         <stop
//                           offset="95%"
//                           stopColor="#a855f7"
//                           stopOpacity={0.6}
//                         />
//                       </linearGradient>
//                     </defs>
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             ) : (
//               <div className="text-center py-16">
//                 <div className="bg-gray-100 dark:bg-gray-700/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <FiTrendingUp className="w-10 h-10 text-gray-400" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
//                   No Analytics Data
//                 </h3>
//                 <p className="text-gray-500 dark:text-gray-400">
//                   No graph data available for analysis
//                 </p>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Enhanced Action Footer */}
//         <div className="mt-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
//           <div className="absolute inset-0 bg-black/10"></div>
//           <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10"></div>

//           <div className="relative flex flex-col lg:flex-row justify-between items-center">
//             <div className="text-center lg:text-left mb-6 lg:mb-0">
//               <h3 className="text-2xl font-bold mb-2">
//                 Daily Performance Summary
//               </h3>
//               <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-indigo-100">
//                 <span className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
//                   <FiZap className="mr-2" />
//                   {productiveTime}m productive
//                 </span>
//                 <span className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
//                   <FiCoffee className="mr-2" />
//                   {unproductiveTime}m unproductive
//                 </span>
//                 <span className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
//                   <FiTrendingUp className="mr-2" />
//                   {productivityPercentage}% efficiency
//                 </span>
//               </div>
//             </div>

//             <div className="flex flex-wrap gap-4">
//               <button className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-200 font-semibold">
//                 <FiDownload className="mr-2" />
//                 Export Report
//               </button>
//               <button className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg">
//                 <FiShare2 className="mr-2" />
//                 Share Analytics
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import  { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import useUsageStatsStore from '../../store/useUsageStore';

// export default function EmployeeDailyStats() {
//   const { empID, date } = useParams();
//   const { dailyStats, fetchDailyStats, loading, error } = useUsageStatsStore();

//   useEffect(() => {
//     fetchDailyStats(empID, date);
//   }, [empID, date, fetchDailyStats]);

//   if (loading) return <p className="text-center">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;
//   if (!dailyStats) return <p className="text-center">No data available.</p>;

//   return (
//     <div className="p-6 bg-gray-100">
//       <h2 className="text-xl font-bold">Usage Stats for {date}</h2>

//       <div className="mt-4 grid grid-cols-2 gap-4">
//         <div>
//           <h3 className="font-semibold">Apps Used</h3>
//           <ul className="list-disc pl-4">
//             {dailyStats.appsUsed.map((app, i) => (
//               <li key={i}>
//                 {app.appName}: {app.minutesUsed} min
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <h3 className="font-semibold">Websites Visited</h3>
//           <ul className="list-disc pl-4">
//             {dailyStats.websitesVisited.map((site, i) => (
//               <li key={i}>
//                 {site.url}: {site.minutesVisited} min
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useMemo } from 'react';
// import { useParams } from 'react-router-dom';
// import useUsageStatsStore from '../../store/useUsageStore';

// export default function EmployeeDailyStats() {
//   const { empID, date } = useParams();
//   const {
//     dailyStats,
//     fetchDailyStats,
//     fetchDeptCategories,
//     deptCategories,
//     loading,
//     error,
//   } = useUsageStatsStore();

//   useEffect(() => {
//     fetchDailyStats(empID, date).then((data) => {
//       if (data?.department) {
//         fetchDeptCategories(data.department);
//       }
//     });
//   }, [empID, date, fetchDailyStats, fetchDeptCategories]);

//   const { productiveTime, unproductiveTime } = useMemo(() => {
//     if (!dailyStats || !deptCategories) return { productiveTime: 0, unproductiveTime: 0 };

//     const prodSet = new Set(deptCategories.productive.map((d) => d.name.toLowerCase()));
//     const unprodSet = new Set(deptCategories.unproductive.map((d) => d.name.toLowerCase()));

//     let productiveTime = 0;
//     let unproductiveTime = 0;

//     dailyStats.appsUsed.forEach((app) => {
//       const appName = app.appName.toLowerCase();
//       if (prodSet.has(appName)) productiveTime += app.minutesUsed;
//       else if (unprodSet.has(appName)) unproductiveTime += app.minutesUsed;
//     });

//     dailyStats.websitesVisited.forEach((site) => {
//       const url = site.url.toLowerCase();
//       if (prodSet.has(url)) productiveTime += site.minutesVisited;
//       else if (unprodSet.has(url)) unproductiveTime += site.minutesVisited;
//     });

//     return { productiveTime, unproductiveTime };
//   }, [dailyStats, deptCategories]);

//   if (loading) return <p className="text-center">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;
//   if (!dailyStats) return <p className="text-center">No data available.</p>;

//   return (
//     <div className="p-6 bg-gray-100">
//       <h2 className="text-xl font-bold">Usage Stats for {date}</h2>

//       <div className="my-4 grid grid-cols-2 gap-4">
//         <div className="p-4 rounded bg-green-100">
//           <h3 className="font-semibold text-green-800">Productive Time</h3>
//           <p className="text-2xl">{productiveTime} min</p>
//         </div>
//         <div className="p-4 rounded bg-red-100">
//           <h3 className="font-semibold text-red-800">Unproductive Time</h3>
//           <p className="text-2xl">{unproductiveTime} min</p>
//         </div>
//       </div>

//       <div className="mt-4 grid grid-cols-2 gap-4">
//         <div>
//           <h3 className="font-semibold">Apps Used</h3>
//           <ul className="list-disc pl-4">
//             {dailyStats.appsUsed.map((app, i) => (
//               <li key={i}>
//                 {app.appName}: {app.minutesUsed} min
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <h3 className="font-semibold">Websites Visited</h3>
//           <ul className="list-disc pl-4">
//             {dailyStats.websitesVisited.map((site, i) => (
//               <li key={i}>
//                 {site.url}: {site.minutesVisited} min
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useMemo } from 'react';
// import { useParams } from 'react-router-dom';
// import useUsageStatsStore from '../../store/useUsageStore';

// export default function EmployeeDailyStats() {
//   const { empID, date } = useParams();
//   const {
//     dailyStats,
//     fetchDailyStats,
//     fetchDeptCategories,
//     deptCategories,
//     loading,
//     error,
//   } = useUsageStatsStore();

//   useEffect(() => {
//     fetchDailyStats(empID, date).then((data) => {
//       if (data?.department) {
//         fetchDeptCategories(data.department);
//       }
//     });
//   }, [empID, date, fetchDailyStats, fetchDeptCategories]);

//   const { productiveTime, unproductiveTime } = useMemo(() => {
//     if (!dailyStats || !deptCategories) return { productiveTime: 0, unproductiveTime: 0 };

//     const prodSet = new Set(deptCategories.productive.map((d) => d.name.toLowerCase()));
//     const unprodSet = new Set(deptCategories.unproductive.map((d) => d.name.toLowerCase()));

//     let productiveTime = 0;
//     let unproductiveTime = 0;

//     dailyStats.appsUsed.forEach((app) => {
//       const appName = app.appName.toLowerCase();
//       if (prodSet.has(appName)) productiveTime += app.minutesUsed;
//       else if (unprodSet.has(appName)) unproductiveTime += app.minutesUsed;
//     });

//     dailyStats.websitesVisited.forEach((site) => {
//       const url = site.url.toLowerCase();
//       if (prodSet.has(url)) productiveTime += site.minutesVisited;
//       else if (unprodSet.has(url)) unproductiveTime += site.minutesVisited;
//     });

//     return { productiveTime, unproductiveTime };
//   }, [dailyStats, deptCategories]);

//   if (loading) return <p className="text-center py-6 text-gray-500">Loading...</p>;
//   if (error) return <p className="text-center py-6 text-red-500">{error}</p>;
//   if (!dailyStats) return <p className="text-center py-6 text-gray-500">No data available.</p>;

//   return (
//     <div className="p-6 sm:p-10 bg-gray-50 min-h-screen space-y-8">
//       <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
//         <h2 className="text-2xl font-bold">Usage Stats for {date}</h2>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="bg-green-100 p-6 rounded-lg shadow">
//           <h3 className="font-semibold text-green-800 mb-2">Productive Time</h3>
//           <p className="text-3xl font-bold text-green-700">{productiveTime} mins</p>
//         </div>
//         <div className="bg-red-100 p-6 rounded-lg shadow">
//           <h3 className="font-semibold text-red-800 mb-2">Unproductive Time</h3>
//           <p className="text-3xl font-bold text-red-700">{unproductiveTime} mins</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h3 className="font-semibold text-gray-700 border-b pb-2 mb-4">Apps Used</h3>
//           <ul className="space-y-2">
//             {dailyStats.appsUsed.map((app, i) => (
//               <li key={i} className="text-gray-600">
//                 <span className="font-medium">{app.appName}</span>
//                 <span className="ml-2 text-sm font-semibold text-gray-500">– {app.minutesUsed} mins</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h3 className="font-semibold text-gray-700 border-b pb-2 mb-4">Websites Visited</h3>
//           <ul className="space-y-2">
//             {dailyStats.websitesVisited.map((site, i) => (
//               <li key={i} className="text-gray-600">
//                 <span className="font-medium">{site.url}</span>
//                 <span className="ml-2 text-sm font-semibold text-gray-500">– {site.minutesVisited} mins</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// // }
// import { useEffect, useMemo } from "react";
// import { useParams } from "react-router-dom";
// import { FiClock, FiCoffee, FiActivity, FiMonitor, FiGlobe, FiTrendingUp, FiInfo } from "react-icons/fi";
// import useUsageStatsStore from "../../store/useUsageStore";
// import useFullAttendanceStore from "../../store/useFullAttendanceStore";
// import CustomTooltip from "./CustomToolTip";
// import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

// export default function EmployeeDailyStats() {
//   const { attendanceData } = useFullAttendanceStore();
//   const { empID, date } = useParams();
//   const {
//     dailyStats,
//     fetchDailyStats,
//     fetchDeptCategories,
//     deptCategories,
//     loading,
//     error,
//     timeline,
//     fetchTimeline,
//     fetchGraphData,   // <-- Added
//     graphData,        // <-- Added
//   } = useUsageStatsStore();

//   const attendanceRecord = useMemo(() => {
//     return attendanceData.find((rec) => rec.date === date);
//   }, [attendanceData, date]);

//  useEffect(() => {
//   fetchDailyStats(empID, date).then((data) => {
//     if (data?.department) {
//       fetchDeptCategories(data.department);
//     }
//   });
//   fetchTimeline(empID, date);
//   fetchGraphData(empID, date);
// }, [empID, date]);

//   const { productiveTime, unproductiveTime } = useMemo(() => {
//     if (!dailyStats || !deptCategories)
//       return { productiveTime: 0, unproductiveTime: 0 };

//     const prodSet = new Set(
//       deptCategories.productive.map((d) => d.name.toLowerCase())
//     );
//     const unprodSet = new Set(
//       deptCategories.unproductive.map((d) => d.name.toLowerCase())
//     );

//     let productiveTime = 0;
//     let unproductiveTime = 0;

//     dailyStats.appsUsed.forEach((app) => {
//       const appName = app.appName.toLowerCase();
//       if (prodSet.has(appName)) productiveTime += app.minutesUsed;
//       else if (unprodSet.has(appName)) unproductiveTime += app.minutesUsed;
//     });

//     dailyStats.websitesVisited.forEach((site) => {
//       const url = site.url.toLowerCase();
//       if (prodSet.has(url)) productiveTime += site.minutesVisited;
//       else if (unprodSet.has(url)) unproductiveTime += site.minutesVisited;
//     });

//     return { productiveTime, unproductiveTime };
//   }, [dailyStats, deptCategories]);

//   const combinedTimeline = useMemo(() => {
//     const baseTimeline = (timeline || []).map((item, idx) => ({
//       startTime: item.startTime,
//       endTime: item.endTime,
//       name: item.name,
//       type: item.type || "app",
//       duration:
//         item.duration ||
//         Math.round(
//           (new Date(`2000-01-01T${item.endTime}`) -
//             new Date(`2000-01-01T${item.startTime}`)) /
//             60000
//         ),
//       id: `activity-${idx}-${item.startTime}`,
//     }));

//     const breaksTimeline = (attendanceRecord?.breaks || [])
//       .filter((br) => {
//         const breakDate = new Date(br.start).toISOString().split("T")[0];
//         return breakDate === date;
//       })
//       .map((br, idx) => {
//         const start = new Date(br.start);
//         let end = new Date(br.end);
//         if (end <= start) end.setDate(end.getDate() + 1);

//         const duration = Math.round((end - start) / 60000);
//         return {
//           startTime: start.toTimeString().slice(0, 5),
//           endTime: end.toTimeString().slice(0, 5),
//           name: "Break",
//           type: "break",
//           duration: duration > 0 ? duration : 0,
//           id: `break-${idx}-${start.getTime()}`,
//         };
//       });

//     // Combine apps/websites and breaks
//     return [...baseTimeline, ...breaksTimeline].sort((a, b) => {
//       const aDate = new Date(`2000-01-01T${a.startTime}`);
//       const bDate = new Date(`2000-01-01T${b.startTime}`);
//       return aDate - bDate;
//     });
//   }, [timeline, attendanceRecord, date]);

//   if (loading)
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
//         <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
//           Loading daily statistics...
//         </p>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="max-w-4xl mx-auto py-12 px-4 text-center">
//         <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 text-red-500 mb-6">
//           <FiInfo className="w-10 h-10" />
//         </div>
//         <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//           Unable to load data
//         </h3>
//         <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
//           {error}
//         </p>
//         <button
//           onClick={() => window.location.reload()}
//           className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity shadow-lg"
//         >
//           Try Again
//         </button>
//       </div>
//     );

//   if (!dailyStats)
//     return (
//       <div className="max-w-4xl mx-auto py-12 px-4 text-center">
//         <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 text-blue-500 mb-6">
//           <FiInfo className="w-10 h-10" />
//         </div>
//         <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//           No data available
//         </h3>
//         <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
//           No statistics found for this date.
//         </p>
//       </div>
//     );

//   // Calculate productivity percentage
//   const totalTime = productiveTime + unproductiveTime;
//   const productivityPercentage = totalTime > 0
//     ? Math.round((productiveTime / totalTime) * 100)
//     : 0;

//   return (
//     <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-6 mb-8 text-white">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold mb-2">Daily Statistics</h1>
//             <p className="text-indigo-100">Detailed activity for {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
//           </div>
//           <div className="mt-4 md:mt-0 bg-indigo-400/30 px-4 py-2 rounded-xl">
//             <p className="font-medium">Employee #{empID}</p>
//           </div>
//         </div>
//       </div>

//       {/* Productivity Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
//           <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
//             <FiActivity className="mr-2 text-indigo-500" />
//             Productivity Overview
//           </h2>

//           <div className="flex items-center justify-between mb-6">
//             <div className="text-center">
//               <div className="text-3xl font-bold text-emerald-500">{productivityPercentage}%</div>
//               <div className="text-sm text-gray-500 dark:text-gray-400">Productivity</div>
//             </div>

//             <div className="w-36 h-36 relative">
//               <div className="absolute inset-0 rounded-full bg-gray-200 dark:bg-gray-700"></div>
//               <div
//                 className="absolute inset-0 rounded-full border-[12px] border-emerald-500"
//                 style={{
//                   clipPath: `inset(0 0 0 ${100 - productivityPercentage}%)`
//                 }}
//               ></div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="text-center">
//                   <div className="text-xl font-bold text-gray-800 dark:text-white">{productiveTime + unproductiveTime}m</div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-900/10 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
//               <div className="flex items-center">
//                 <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300 p-2 rounded-lg mr-3">
//                   <FiTrendingUp className="w-5 h-5" />
//                 </div>
//                 <div>
//                   <div className="text-sm text-gray-600 dark:text-gray-300">Productive</div>
//                   <div className="text-xl font-bold text-emerald-600 dark:text-emerald-300">{productiveTime}m</div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-900/10 p-4 rounded-xl border border-rose-100 dark:border-rose-900/30">
//               <div className="flex items-center">
//                 <div className="bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-300 p-2 rounded-lg mr-3">
//                   <FiCoffee className="w-5 h-5" />
//                 </div>
//                 <div>
//                   <div className="text-sm text-gray-600 dark:text-gray-300">Unproductive</div>
//                   <div className="text-xl font-bold text-rose-600 dark:text-rose-300">{unproductiveTime}m</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Attendance Summary */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
//           <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
//             <FiClock className="mr-2 text-indigo-500" />
//             Attendance Summary
//           </h2>

//           {attendanceRecord ? (
//             <>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//                 <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30">
//                   <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Login Time</div>
//                   <div className="text-xl font-bold text-blue-600 dark:text-blue-300">
//                     {attendanceRecord.login}
//                   </div>
//                 </div>

//                 <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 p-4 rounded-xl border border-purple-100 dark:border-purple-900/30">
//                   <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Logout Time</div>
//                   <div className="text-xl font-bold text-purple-600 dark:text-purple-300">
//                     {attendanceRecord.logout || "Still active"}
//                   </div>
//                 </div>
//               </div>

//               {attendanceRecord.breaks && attendanceRecord.breaks.length > 0 && (
//                 <div>
//                   <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Breaks Taken</h3>
//                   <div className="space-y-2">
//                     {attendanceRecord.breaks.map((br, i) => (
//                       <div key={i} className="flex items-center bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg">
//                         <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300 p-2 rounded-lg mr-3">
//                           <FiCoffee className="w-4 h-4" />
//                         </div>
//                         <div>
//                           <div className="font-medium text-gray-800 dark:text-gray-200">
//                             {new Date(br.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
//                             {" → "}
//                             {new Date(br.end).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
//                           </div>
//                           <div className="text-xs text-gray-500 dark:text-gray-400">
//                             {Math.round((new Date(br.end) - new Date(br.start)) / 60000)} minutes
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </>
//           ) : (
//             <div className="text-center py-8">
//               <div className="bg-gray-100 dark:bg-gray-700/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <FiInfo className="w-8 h-8 text-gray-400" />
//               </div>
//               <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">
//                 No attendance record
//               </h3>
//               <p className="text-gray-500 dark:text-gray-400">
//                 No attendance data available for this date
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Apps & Websites */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         {/* Apps Used */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
//           <div className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 px-6 py-4 flex items-center">
//             <div className="mr-3 text-white bg-indigo-400/20 p-2 rounded-lg">
//               <FiMonitor className="w-5 h-5" />
//             </div>
//             <h3 className="text-white text-lg font-semibold">Apps Used</h3>
//           </div>
//           <div className="p-4">
//             <ul className="divide-y divide-gray-100 dark:divide-gray-700">
//               {dailyStats.appsUsed.length > 0 ? (
//                 dailyStats.appsUsed.map((app, i) => (
//                   <li key={i} className="py-3 flex items-center justify-between">
//                     <div className="flex items-center">
//                       <div className="bg-gray-100 dark:bg-gray-700 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
//                         <FiMonitor className="text-indigo-500" />
//                       </div>
//                       <div>
//                         <div className="font-medium text-gray-800 dark:text-gray-200">{app.appName}</div>
//                         <div className="text-xs text-gray-500 dark:text-gray-400">{app.category || "Uncategorized"}</div>
//                       </div>
//                     </div>
//                     <div className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-medium">
//                       {app.minutesUsed}m
//                     </div>
//                   </li>
//                 ))
//               ) : (
//                 <li className="py-8 text-center text-gray-500 dark:text-gray-400">
//                   <div className="flex flex-col items-center">
//                     <FiInfo className="w-8 h-8 text-gray-400 mb-2" />
//                     No apps used
//                   </div>
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>

//         {/* Websites Visited */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
//           <div className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 px-6 py-4 flex items-center">
//             <div className="mr-3 text-white bg-indigo-400/20 p-2 rounded-lg">
//               <FiGlobe className="w-5 h-5" />
//             </div>
//             <h3 className="text-white text-lg font-semibold">Websites Visited</h3>
//           </div>
//           <div className="p-4">
//             <ul className="divide-y divide-gray-100 dark:divide-gray-700">
//               {dailyStats.websitesVisited.length > 0 ? (
//                 dailyStats.websitesVisited.map((site, i) => (
//                   <li key={i} className="py-3 flex items-center justify-between">
//                     <div className="flex items-center">
//                       <div className="bg-gray-100 dark:bg-gray-700 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
//                         <FiGlobe className="text-indigo-500" />
//                       </div>
//                       <div>
//                         <div className="font-medium text-gray-800 dark:text-gray-200 truncate max-w-[160px]">
//                           {site.url.replace(/^https?:\/\/(www\.)?/, "")}
//                         </div>
//                         <div className="text-xs text-gray-500 dark:text-gray-400">{site.category || "Uncategorized"}</div>
//                       </div>
//                     </div>
//                     <div className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-medium">
//                       {site.minutesVisited}m
//                     </div>
//                   </li>
//                 ))
//               ) : (
//                 <li className="py-8 text-center text-gray-500 dark:text-gray-400">
//                   <div className="flex flex-col items-center">
//                     <FiInfo className="w-8 h-8 text-gray-400 mb-2" />
//                     No websites visited
//                   </div>
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Timeline Section */}
//       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 mb-8">
//         <div className="flex flex-wrap justify-between items-center mb-6">
//           <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
//             <FiClock className="mr-2 text-indigo-500" />
//             Activity Timeline
//           </h2>
//           <div className="flex space-x-2 mt-2 sm:mt-0">
//             <span className="flex items-center text-sm">
//               <span className="block w-3 h-3 rounded-full mr-2 bg-indigo-500"></span>
//               App/Website
//             </span>
//             <span className="flex items-center text-sm">
//               <span className="block w-3 h-3 rounded-full mr-2 bg-amber-500"></span>
//               Break
//             </span>
//           </div>
//         </div>

//         {combinedTimeline.length > 0 ? (
//           <div className="relative pl-4">
//             {/* Timeline track */}
//             <div className="absolute left-[18px] top-0 w-1 h-full bg-gradient-to-b from-indigo-200 via-purple-200 to-pink-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full"></div>

//             <div className="space-y-8">
//               {combinedTimeline.map((block, idx) => {
//                 const isBreak = block.type === "break";
//                 const start24h = new Date(
//                   `2000-01-01 ${block.startTime}`
//                 ).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 });
//                 const end24h = new Date(
//                   `2000-01-01 ${block.endTime}`
//                 ).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 });

//                 return (
//                   <div key={idx} className="relative flex group">
//                     {/* Timeline marker */}
//                     <div className="absolute left-[-9px] top-1/2 transform -translate-y-1/2 z-20">
//                       <div className={`w-5 h-5 rounded-full ${
//                         isBreak ? "bg-amber-500" : "bg-indigo-500"
//                       } border-4 border-white dark:border-gray-800`}></div>
//                     </div>

//                     {/* Content card */}
//                     <div className="ml-6 flex-1">
//                       <div className={`p-4 rounded-xl shadow-sm transition-all duration-300 group-hover:shadow-md ${
//                         isBreak
//                           ? "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/10 border border-amber-100 dark:border-amber-900/30"
//                           : "bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30"
//                       }`}>
//                         <div className="flex flex-wrap justify-between items-start">
//                           <div>
//                             <h3 className={`font-bold ${
//                               isBreak ? "text-amber-600 dark:text-amber-300" : "text-indigo-600 dark:text-indigo-300"
//                             }`}>
//                               {block.name}
//                             </h3>
//                             <div className="flex items-center mt-1">
//                               <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
//                                 {start24h} - {end24h}
//                               </span>
//                               {block.duration > 0 && (
//                                 <span className="ml-2 text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
//                                   {block.duration} min
//                                 </span>
//                               )}
//                             </div>
//                           </div>
//                           <div className="mt-2 sm:mt-0">
//                             <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
//                               isBreak
//                                 ? "bg-amber-100 text-amber-700 dark:bg-amber-700/30 dark:text-amber-200"
//                                 : "bg-indigo-100 text-indigo-700 dark:bg-indigo-700/30 dark:text-indigo-200"
//                             }`}>
//                               {block.type.toUpperCase()}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         ) : (
//           <div className="text-center py-8">
//             <div className="bg-gray-100 dark:bg-gray-700/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//               <FiInfo className="w-8 h-8 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">
//               No activity recorded
//             </h3>
//             <p className="text-gray-500 dark:text-gray-400">
//               No timeline data available for this date
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Summary Footer */}
//       <div className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 rounded-2xl shadow-xl p-6 text-white">
//         <div className="flex flex-col sm:flex-row justify-between items-center">
//           <div className="text-center sm:text-left mb-4 sm:mb-0">
//             <h3 className="text-lg font-bold">Daily Summary</h3>
//             <p className="text-indigo-100">
//               {productiveTime}m productive • {unproductiveTime}m unproductive
//             </p>
//           </div>
//           <div className="flex space-x-3">
//             <button className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
//               Export Report
//             </button>
//             <button className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
//               Share
//             </button>
//           </div>
//         </div>
//       </div>
//       {/* Productivity Graph Section */}
// <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 mb-8">
//   <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
//     <FiTrendingUp className="mr-2 text-indigo-500" />
//     Productivity Graph
//   </h2>

//   {graphData && graphData.length > 0 && graphData[0].Productivity > 0 ? (
//   <ResponsiveContainer width="100%" height={300}>
//     <BarChart data={graphData}>
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="time" />
//       <YAxis />
//       <Tooltip content={<CustomTooltip />} />
//       <Legend />
//       <Bar dataKey="Productivity" stackId="a" fill="#3b82f6" />
//       <Bar dataKey="Unproductivity" stackId="a" fill="#ef4444" />
//       <Bar dataKey="BreakTime" stackId="a" fill="#a855f7" />
//     </BarChart>
//   </ResponsiveContainer>
// ) : (
//   <div className="text-center py-8 text-gray-500 dark:text-gray-400">
//     No graph data available.
//   </div>
// )}

// </div>

//     </div>
//   );
// }

// import { useEffect, useMemo, useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//   FiClock,
//   FiCoffee,
//   FiActivity,
//   FiMonitor,
//   FiGlobe,
//   FiTrendingUp,
//   FiInfo,
//   FiEye,
//   FiEyeOff,
//   FiDownload,
//   FiShare2,
//   FiCalendar,
//   FiUser,
//   FiBarChart,
//   FiPieChart,
//   FiZap,
//   FiRefreshCw,
// } from "react-icons/fi";
// import useUsageStatsStore from "../../store/useUsageStore";
// import useFullAttendanceStore from "../../store/useFullAttendanceStore";
// import CustomTooltip from "./CustomToolTip";
// import {
//   ResponsiveContainer,
//   BarChart,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   Bar,
//    Brush,    
// } from "recharts";
// import { Bar as SimpleBar } from "recharts"; // <-- we’ll use this for the new graph

// export default function EmployeeDailyStats() {
//   const { attendanceData } = useFullAttendanceStore();
//   const { empID, date } = useParams();
//   const [expandedWebsites, setExpandedWebsites] = useState({});
//   const [expandedApps, setExpandedApps] = useState({});
//   const [activeTab, setActiveTab] = useState("overview");

//   const {
//     dailyStats,
//     fetchDailyStats,
//     fetchDeptCategories,
//     deptCategories,
//     loading,
//     error,
//     timeline,
//     fetchTimeline,
//     fetchGraphData,
//     graphData,
//   } = useUsageStatsStore();

//   const attendanceRecord = useMemo(() => {
//     return attendanceData.find((rec) => rec.date === date);
//   }, [attendanceData, date]);

//   useEffect(() => {
//     fetchDailyStats(empID, date).then((data) => {
//       if (data?.department) {
//         fetchDeptCategories(data.department);
//       }
//     });
//     fetchTimeline(empID, date);
//     fetchGraphData(empID, date);
//   }, [empID, date]);

//   const { productiveTime, unproductiveTime } = useMemo(() => {
//     if (!dailyStats || !deptCategories)
//       return { productiveTime: 0, unproductiveTime: 0 };

//     const prodSet = new Set(
//       deptCategories.productive.map((d) => d.name.toLowerCase())
//     );
//     const unprodSet = new Set(
//       deptCategories.unproductive.map((d) => d.name.toLowerCase())
//     );

//     let productiveTime = 0;
//     let unproductiveTime = 0;

//     dailyStats.appsUsed.forEach((app) => {
//       const appName = app.appName.toLowerCase();
//       if (prodSet.has(appName)) productiveTime += app.minutesUsed;
//       else if (unprodSet.has(appName)) unproductiveTime += app.minutesUsed;
//     });

//     dailyStats.websitesVisited.forEach((site) => {
//       const url = site.url.toLowerCase();
//       if (prodSet.has(url)) productiveTime += site.minutesVisited;
//       else if (unprodSet.has(url)) unproductiveTime += site.minutesVisited;
//     });

//     return { productiveTime, unproductiveTime };
//   }, [dailyStats, deptCategories]);

//   const combinedTimeline = useMemo(() => {
//     const baseTimeline = (timeline || []).map((item, idx) => ({
//       startTime: item.startTime,
//       endTime: item.endTime,
//       name: item.name,
//       type: item.type || "app",
//       duration:
//         item.duration ||
//         Math.round(
//           (new Date(`2000-01-01T${item.endTime}`) -
//             new Date(`2000-01-01T${item.startTime}`)) /
//             60000
//         ),
//       id: `activity-${idx}-${item.startTime}`,
//     }));

//     const breaksTimeline = (attendanceRecord?.breaks || [])
//       .filter((br) => {
//         const breakDate = new Date(br.start).toISOString().split("T")[0];
//         return breakDate === date;
//       })
//       .map((br, idx) => {
//         const start = new Date(br.start);
//         let end = new Date(br.end);
//         if (end <= start) end.setDate(end.getDate() + 1);

//         const duration = Math.round((end - start) / 60000);
//         return {
//           startTime: start.toTimeString().slice(0, 5),
//           endTime: end.toTimeString().slice(0, 5),
//           name: "Break",
//           type: "break",
//           duration: duration > 0 ? duration : 0,
//           id: `break-${idx}-${start.getTime()}`,
//         };
//       });

//     return [...baseTimeline, ...breaksTimeline].sort((a, b) => {
//       const aDate = new Date(`2000-01-01T${a.startTime}`);
//       const bDate = new Date(`2000-01-01T${b.startTime}`);
//       return aDate - bDate;
//     });
//   }, [timeline, attendanceRecord, date]);

//   /* ------------------------------------------------------------------
//      Graph data: one bar per APP session (Chrome, VLC, …)
//      ------------------------------------------------------------------ */
//   const sessionGraphData = useMemo(() => {
//     if (!combinedTimeline.length) return [];

//     const browserRegex = /chrome|edge|firefox|brave|opera/i;
//     const rows = [];

//     for (let i = 0; i < combinedTimeline.length; i++) {
//       const seg = combinedTimeline[i];
//       if (seg.type !== "app") continue; // only apps form bars

//       // duration is already computed earlier
//       const websitesDuringThisApp = new Set();
//       /* include website names **only** if the current app is itself a browser */
//       if (browserRegex.test(seg.name)) {
//         for (let j = i + 1; j < combinedTimeline.length; j++) {
//           const nxt = combinedTimeline[j];
//           if (nxt.type === "app") break;           // next app → stop collecting
//           if (nxt.type === "website") websitesDuringThisApp.add(nxt.name);
//         }
//       }

//       rows.push({
//         name: seg.name, // label on X‑axis
//         minutes: seg.duration, // bar height
//         tooltip: {
//           start: seg.startTime,
//           end: seg.endTime,
//           sites: Array.from(websitesDuringThisApp),
//         },
//       });
//     }
//     return rows;
//   }, [combinedTimeline]);

//   const toggleWebsiteExpansion = (index) => {
//     setExpandedWebsites((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }));
//   };

//   const toggleAppExpansion = (index) => {
//     setExpandedApps((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }));
//   };

//   const formatUrl = (url) => {
//     return url.replace(/^https?:\/\/(www\.)?/, "");
//   };

//   const shouldShowExpandButton = (text, maxLength = 25) => {
//     return text && text.length > maxLength;
//   };

//   const truncateText = (text, maxLength = 25) => {
//     if (!text) return "";
//     return text.length > maxLength
//       ? text.substring(0, maxLength) + "..."
//       : text;
//   };

//   /* ---------- little bubble when you hover a bar ------------- */
//   const SessionTooltip = ({ active, payload }) => {
//     if (!active || !payload?.length) return null;
//     const p = payload[0].payload; // our row object

//     return (
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 text-sm">
//         <div className="font-semibold mb-1">{p.name}</div>
//         <div>
//           ⏰ {p.tooltip.start} – {p.tooltip.end}
//         </div>
//         <div>🕒 {p.minutes} minute(s)</div>
//         {p.tooltip.sites.length > 0 && (
//           <>
//             <hr className="my-2" />
//             <div className="font-medium mb-1">Websites inside:</div>
//             <ul className="list-disc list-inside space-y-1">
//               {p.tooltip.sites.map((s, i) => (
//                 <li key={i}>{s}</li>
//               ))}
//             </ul>
//           </>
//         )}
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 flex items-center justify-center">
//         <div className="relative">
//           <div className="w-20 h-20 border-4 border-indigo-200 dark:border-indigo-800 rounded-full animate-spin">
//             <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-indigo-500 rounded-full animate-spin"></div>
//           </div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <FiBarChart className="w-8 h-8 text-indigo-500 animate-pulse" />
//           </div>
//         </div>
//         <div className="ml-6">
//           <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
//             Loading Analytics
//           </h3>
//           <p className="text-gray-500 dark:text-gray-400 mt-1">
//             Fetching daily statistics...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-950 dark:to-rose-950 flex items-center justify-center p-4">
//         <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center">
//           <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
//             <FiInfo className="w-10 h-10 text-red-500" />
//           </div>
//           <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
//             Oops! Something went wrong
//           </h3>
//           <p className="text-gray-600 dark:text-gray-400 mb-8">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-rose-600 transition-all duration-200 shadow-lg hover:shadow-xl"
//           >
//             <FiRefreshCw className="mr-2" />
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!dailyStats) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 flex items-center justify-center p-4">
//         <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center">
//           <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
//             <FiBarChart className="w-10 h-10 text-blue-500" />
//           </div>
//           <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
//             No Data Available
//           </h3>
//           <p className="text-gray-600 dark:text-gray-400">
//             No statistics found for the selected date.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const totalTime = productiveTime + unproductiveTime;
//   const productivityPercentage =
//     totalTime > 0 ? Math.round((productiveTime / totalTime) * 100) : 0;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
//       <div className="relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
//         <div className="absolute inset-0 bg-black/20"></div>
//         <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10"></div>

//         <div className="relative px-6 py-12">
//           <div className="max-w-7xl mx-auto">
//             <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
//               <div className="text-white mb-6 lg:mb-0">
//                 <div className="flex items-center mb-4">
//                   <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 mr-4">
//                     <FiUser className="w-8 h-8" />
//                   </div>
//                   <div>
//                     <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
//                       Daily Analytics
//                     </h1>
//                     <p className="text-blue-100 text-lg mt-2">
//                       Employee Performance Dashboard
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex flex-wrap items-center gap-4 text-white/90">
//                   <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
//                     <FiCalendar className="mr-2" />
//                     <span className="font-medium">
//                       {new Date(date).toLocaleDateString("en-US", {
//                         weekday: "long",
//                         year: "numeric",
//                         month: "long",
//                         day: "numeric",
//                       })}
//                     </span>
//                   </div>
//                   <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
//                     <FiUser className="mr-2" />
//                     <span className="font-medium">Employee #{empID}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-4">
//                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
//                   <div className="text-3xl font-bold text-white">
//                     {productivityPercentage}%
//                   </div>
//                   <div className="text-white/80 text-sm">
//                     Productivity Score
//                   </div>
//                 </div>
//                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
//                   <div className="text-3xl font-bold text-white">
//                     {totalTime}
//                   </div>
//                   <div className="text-white/80 text-sm">Total Minutes</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-8">
//         <div className="mb-8">
//           <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-2 shadow-xl border border-white/20">
//             <div className="flex flex-wrap gap-2">
//               {[
//                 { id: "overview", label: "Overview", icon: FiPieChart },
//                 { id: "activity", label: "Activity", icon: FiActivity },
//                 { id: "timeline", label: "Timeline", icon: FiClock },
//                 { id: "analytics", label: "Analytics", icon: FiTrendingUp },
//               ].map(({ id, label, icon: Icon }) => (
//                 <button
//                   key={id}
//                   onClick={() => setActiveTab(id)}
//                   className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
//                     activeTab === id
//                       ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
//                       : "text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700/50"
//                   }`}
//                 >
//                   <Icon className="mr-2 w-5 h-5" />
//                   {label}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {activeTab === "overview" && (
//           <div className="space-y-8">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
//                 <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
//                   <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-3 mr-4">
//                     <FiZap className="w-6 h-6 text-white" />
//                   </div>
//                   Productivity Metrics
//                 </h2>

//                 <div className="flex items-center justify-between mb-8">
//                   <div className="text-center">
//                     <div className="text-4xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
//                       {productivityPercentage}%
//                     </div>
//                     <div className="text-gray-600 dark:text-gray-400 font-medium">
//                       Productivity Score
//                     </div>
//                   </div>

//                   <div className="relative w-32 h-32">
//                     <svg
//                       className="w-32 h-32 transform -rotate-90"
//                       viewBox="0 0 36 36"
//                     >
//                       <path
//                         d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         className="text-gray-200 dark:text-gray-700"
//                       />
//                       <path
//                         d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//                         fill="none"
//                         stroke="url(#gradient)"
//                         strokeWidth="3"
//                         strokeDasharray={`${productivityPercentage}, 100`}
//                         className="transition-all duration-1000 ease-out"
//                       />
//                       <defs>
//                         <linearGradient
//                           id="gradient"
//                           x1="0%"
//                           y1="0%"
//                           x2="100%"
//                           y2="0%"
//                         >
//                           <stop offset="0%" stopColor="#10b981" />
//                           <stop offset="100%" stopColor="#14b8a6" />
//                         </linearGradient>
//                       </defs>
//                     </svg>
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <div className="text-center">
//                         <div className="text-xl font-bold text-gray-800 dark:text-white">
//                           {totalTime}m
//                         </div>
//                         <div className="text-xs text-gray-500 dark:text-gray-400">
//                           Total
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
//                     <div className="flex items-center">
//                       <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300 p-3 rounded-xl mr-4">
//                         <FiTrendingUp className="w-6 h-6" />
//                       </div>
//                       <div>
//                         <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
//                           Productive Time
//                         </div>
//                         <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-300">
//                           {productiveTime}m
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 p-6 rounded-2xl border border-rose-100 dark:border-rose-900/30">
//                     <div className="flex items-center">
//                       <div className="bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-300 p-3 rounded-xl mr-4">
//                         <FiCoffee className="w-6 h-6" />
//                       </div>
//                       <div>
//                         <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
//                           Unproductive Time
//                         </div>
//                         <div className="text-2xl font-bold text-rose-600 dark:text-rose-300">
//                           {unproductiveTime}m
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
//                 <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
//                   <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-3 mr-4">
//                     <FiClock className="w-6 h-6 text-white" />
//                   </div>
//                   Attendance Summary
//                 </h2>

//                 {attendanceRecord ? (
//                   <div className="space-y-6">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30">
//                         <div className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
//                           Check In
//                         </div>
//                         <div className="text-2xl font-bold text-blue-600 dark:text-blue-300">
//                           {attendanceRecord.login}
//                         </div>
//                       </div>

//                       <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl border border-purple-100 dark:border-purple-900/30">
//                         <div className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
//                           Check Out
//                         </div>
//                         <div className="text-2xl font-bold text-purple-600 dark:text-purple-300">
//                           {attendanceRecord.logout || "Active"}
//                         </div>
//                       </div>
//                     </div>

//                     {attendanceRecord.breaks &&
//                       attendanceRecord.breaks.length > 0 && (
//                         <div>
//                           <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
//                             <FiCoffee className="mr-2" />
//                             Break Sessions
//                           </h3>
//                           <div className="space-y-3 max-h-48 overflow-y-auto">
//                             {attendanceRecord.breaks.map((br, i) => (
//                               <div
//                                 key={i}
//                                 className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-900/30"
//                               >
//                                 <div className="flex items-center justify-between">
//                                   <div className="flex items-center">
//                                     <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300 p-2 rounded-lg mr-3">
//                                       <FiCoffee className="w-4 h-4" />
//                                     </div>
//                                     <div>
//                                       <div className="font-semibold text-gray-800 dark:text-gray-200">
//                                         {new Date(br.start).toLocaleTimeString(
//                                           [],
//                                           { hour: "2-digit", minute: "2-digit" }
//                                         )}
//                                         {" → "}
//                                         {new Date(br.end).toLocaleTimeString(
//                                           [],
//                                           { hour: "2-digit", minute: "2-digit" }
//                                         )}
//                                       </div>
//                                       <div className="text-sm text-gray-500 dark:text-gray-400">
//                                         Break #{i + 1}
//                                       </div>
//                                     </div>
//                                   </div>
//                                   <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-3 py-1 rounded-full text-sm font-semibold">
//                                     {Math.round(
//                                       (new Date(br.end) - new Date(br.start)) /
//                                         60000
//                                     )}
//                                     m
//                                   </span>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                   </div>
//                 ) : (
//                   <div className="text-center py-12">
//                     <div className="bg-gray-100 dark:bg-gray-700/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
//                       <FiInfo className="w-10 h-10 text-gray-400" />
//                     </div>
//                     <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
//                       No Attendance Record
//                     </h3>
//                     <p className="text-gray-500 dark:text-gray-400">
//                       No attendance data available for this date
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === "activity" && (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
//               <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-8 py-6">
//                 <div className="flex items-center text-white">
//                   <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 mr-4">
//                     <FiMonitor className="w-6 h-6" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold">Applications Used</h3>
//                     <p className="text-indigo-100">Desktop & Mobile Apps</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-6">
//                 {dailyStats.appsUsed.length > 0 ? (
//                   <div className="space-y-4 max-h-96 overflow-y-auto">
//                     {dailyStats.appsUsed.map((app, i) => (
//                       <div
//                         key={i}
//                         className="group bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-600/30 hover:shadow-lg transition-all duration-200"
//                       >
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center flex-1 min-w-0">
//                             <div className="bg-indigo-100 dark:bg-indigo-900/30 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
//                               <FiMonitor className="text-indigo-500 w-6 h-6" />
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <div className="flex items-center">
//                                 <div className="font-semibold text-gray-800 dark:text-gray-200">
//                                   {expandedApps[i] ||
//                                   !shouldShowExpandButton(app.appName)
//                                     ? app.appName
//                                     : truncateText(app.appName)}
//                                 </div>
//                                 {shouldShowExpandButton(app.appName) && (
//                                   <button
//                                     onClick={() => toggleAppExpansion(i)}
//                                     className="ml-2 text-indigo-500 hover:text-indigo-700 transition-colors"
//                                     title={
//                                       expandedApps[i]
//                                         ? "Show less"
//                                         : "Show full name"
//                                     }
//                                   >
//                                     {expandedApps[i] ? (
//                                       <FiEyeOff className="w-4 h-4" />
//                                     ) : (
//                                       <FiEye className="w-4 h-4" />
//                                     )}
//                                   </button>
//                                 )}
//                               </div>
//                               <div className="text-sm text-gray-500 dark:text-gray-400">
//                                 {app.category || "Uncategorized"}
//                               </div>
//                             </div>
//                           </div>
//                           <div className="ml-4">
//                             <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
//                               {app.minutesUsed}m
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-12">
//                     <div className="bg-gray-100 dark:bg-gray-700/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <FiMonitor className="w-8 h-8 text-gray-400" />
//                     </div>
//                     <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-400">
//                       No Apps Used
//                     </h4>
//                     <p className="text-gray-500 dark:text-gray-500">
//                       No application usage recorded
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Enhanced Websites Section */}
//             <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
//               <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-8 py-6">
//                 <div className="flex items-center text-white">
//                   <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 mr-4">
//                     <FiGlobe className="w-6 h-6" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold">Websites Visited</h3>
//                     <p className="text-emerald-100">Browser Activity</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-6">
//                 {dailyStats.websitesVisited.length > 0 ? (
//                   <div className="space-y-4 max-h-96 overflow-y-auto">
//                     {dailyStats.websitesVisited.map((site, i) => (
//                       <div
//                         key={i}
//                         className="group bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-600/30 hover:shadow-lg transition-all duration-200"
//                       >
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center flex-1 min-w-0">
//                             <div className="bg-emerald-100 dark:bg-emerald-900/30 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
//                               <FiGlobe className="text-emerald-500 w-6 h-6" />
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <div className="flex items-center">
//                                 <div className="font-semibold text-gray-800 dark:text-gray-200">
//                                   {expandedWebsites[i] ||
//                                   !shouldShowExpandButton(formatUrl(site.url))
//                                     ? formatUrl(site.url)
//                                     : truncateText(formatUrl(site.url))}
//                                 </div>
//                                 {shouldShowExpandButton(
//                                   formatUrl(site.url)
//                                 ) && (
//                                   <button
//                                     onClick={() => toggleWebsiteExpansion(i)}
//                                     className="ml-2 text-emerald-500 hover:text-emerald-700 transition-colors"
//                                     title={
//                                       expandedWebsites[i]
//                                         ? "Show less"
//                                         : "Show full URL"
//                                     }
//                                   >
//                                     {expandedWebsites[i] ? (
//                                       <FiEyeOff className="w-4 h-4" />
//                                     ) : (
//                                       <FiEye className="w-4 h-4" />
//                                     )}
//                                   </button>
//                                 )}
//                               </div>
//                               <div className="text-sm text-gray-500 dark:text-gray-400">
//                                 {site.category || "Uncategorized"}
//                               </div>
//                             </div>
//                           </div>
//                           <div className="ml-4">
//                             <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
//                               {site.minutesVisited}m
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-12">
//                     <div className="bg-gray-100 dark:bg-gray-700/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <FiGlobe className="w-8 h-8 text-gray-400" />
//                     </div>
//                     <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-400">
//                       No Websites Visited
//                     </h4>
//                     <p className="text-gray-500 dark:text-gray-500">
//                       No web browsing activity recorded
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === "timeline" && (
//           <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
//             <div className="flex flex-wrap justify-between items-center mb-8">
//              {sessionGraphData.length > 0 && (
//                 <div className="mb-10 w-full overflow-x-auto">
//                   <ResponsiveContainer minWidth={600} height={260}>
//                     <BarChart data={sessionGraphData}>
//                       <XAxis dataKey="name" stroke="#6b7280" />
//                       <YAxis stroke="#6b7280" />
//                       <Tooltip content={<SessionTooltip />} />
//                       <SimpleBar dataKey="minutes" radius={[4, 4, 0, 0]} />
//                       <Brush dataKey="name"
//                              height={20}
//                              travellerWidth={8}
//                              stroke="#6366f1" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               )}

//               <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
//                 <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-3 mr-4">
//                   <FiClock className="w-6 h-6 text-white" />
//                 </div>
//                 Activity Timeline
//               </h2>
//               <div className="flex flex-wrap gap-4 mt-4 sm:mt-0">
//                 <div className="flex items-center text-sm bg-indigo-50 dark:bg-indigo-900/20 px-3 py-2 rounded-full">
//                   <span className="block w-3 h-3 rounded-full mr-2 bg-indigo-500"></span>
//                   Applications
//                 </div>
//                 <div className="flex items-center text-sm bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 rounded-full">
//                   <span className="block w-3 h-3 rounded-full mr-2 bg-emerald-500"></span>
//                   Websites
//                 </div>
//                 <div className="flex items-center text-sm bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-full">
//                   <span className="block w-3 h-3 rounded-full mr-2 bg-amber-500"></span>
//                   Breaks
//                 </div>
//               </div>
//             </div>

//             {combinedTimeline.length > 0 ? (
//               <div className="relative pl-8">
//                 <div className="absolute left-[15px] top-0 w-1 h-full bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700 rounded-full"></div>

//                 <div className="space-y-6">
//                   {combinedTimeline.map((block, idx) => {
//                     const isBreak = block.type === "break";
//                     const isWebsite = block.type === "website";
//                     const start24h = new Date(
//                       `2000-01-01 ${block.startTime}`
//                     ).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     });
//                     const end24h = new Date(
//                       `2000-01-01 ${block.endTime}`
//                     ).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     });

//                     return (
//                       <div key={idx} className="relative flex group">
//                         <div className="absolute left-[-23px] top-1/2 transform -translate-y-1/2 z-20">
//                           <div
//                             className={`w-6 h-6 rounded-full border-4 border-white dark:border-gray-800 shadow-lg ${
//                               isBreak
//                                 ? "bg-amber-500"
//                                 : isWebsite
//                                 ? "bg-emerald-500"
//                                 : "bg-indigo-500"
//                             }`}
//                           ></div>
//                         </div>

//                         <div className="ml-4 flex-1">
//                           <div
//                             className={`p-6 rounded-2xl shadow-md transition-all duration-300 group-hover:shadow-xl ${
//                               isBreak
//                                 ? "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-900/30"
//                                 : isWebsite
//                                 ? "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-900/30"
//                                 : "bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-900/30"
//                             }`}
//                           >
//                             <div className="flex flex-wrap justify-between items-start">
//                               <div className="flex-1">
//                                 <h3
//                                   className={`text-lg font-bold mb-2 ${
//                                     isBreak
//                                       ? "text-amber-700 dark:text-amber-300"
//                                       : isWebsite
//                                       ? "text-emerald-700 dark:text-emerald-300"
//                                       : "text-indigo-700 dark:text-indigo-300"
//                                   }`}
//                                 >
//                                   {block.name}
//                                 </h3>
//                                 <div className="flex flex-wrap gap-2">
//                                   <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
//                                     <FiClock className="mr-1 w-3 h-3" />
//                                     {start24h} - {end24h}
//                                   </span>
//                                   {block.duration > 0 && (
//                                     <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
//                                       {block.duration} min
//                                     </span>
//                                   )}
//                                 </div>
//                               </div>
//                               <div className="mt-2 sm:mt-0 ml-4">
//                                 <span
//                                   className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
//                                     isBreak
//                                       ? "bg-amber-100 text-amber-800 dark:bg-amber-700/30 dark:text-amber-200"
//                                       : isWebsite
//                                       ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-700/30 dark:text-emerald-200"
//                                       : "bg-indigo-100 text-indigo-800 dark:bg-indigo-700/30 dark:text-indigo-200"
//                                   }`}
//                                 >
//                                   {block.type}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             ) : (
//               <div className="text-center py-16">
//                 <div className="bg-gray-100 dark:bg-gray-700/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <FiClock className="w-10 h-10 text-gray-400" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
//                   No Activity Timeline
//                 </h3>
//                 <p className="text-gray-500 dark:text-gray-400">
//                   No timeline data available for this date
//                 </p>
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === "analytics" && (
//           <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
//             <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
//               <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-3 mr-4">
//                 <FiTrendingUp className="w-6 h-6 text-white" />
//               </div>
//               Productivity Analytics
//             </h2>

//             {graphData &&
//             graphData.length > 0 &&
//             graphData[0].Productivity > 0 ? (
//               <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-600/30">
//                 <ResponsiveContainer width="100%" height={400}>
//                   <BarChart
//                     data={graphData}
//                     margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                     <XAxis
//                       dataKey="time"
//                       stroke="#6b7280"
//                       fontSize={12}
//                       tickLine={false}
//                       axisLine={false}
//                     />
//                     <YAxis
//                       stroke="#6b7280"
//                       fontSize={12}
//                       tickLine={false}
//                       axisLine={false}
//                     />
//                     <Tooltip content={<CustomTooltip />} />
//                     <Legend />
//                     <Bar
//                       dataKey="Productivity"
//                       stackId="a"
//                       fill="url(#productiveGradient)"
//                       radius={[0, 0, 4, 4]}
//                     />
//                     <Bar
//                       dataKey="Unproductivity"
//                       stackId="a"
//                       fill="url(#unproductiveGradient)"
//                       radius={[0, 0, 0, 0]}
//                     />
//                     <Bar
//                       dataKey="BreakTime"
//                       stackId="a"
//                       fill="url(#breakGradient)"
//                       radius={[4, 4, 0, 0]}
//                     />
//                     <defs>
//                       <linearGradient
//                         id="productiveGradient"
//                         x1="0"
//                         y1="0"
//                         x2="0"
//                         y2="1"
//                       >
//                         <stop
//                           offset="5%"
//                           stopColor="#10b981"
//                           stopOpacity={0.8}
//                         />
//                         <stop
//                           offset="95%"
//                           stopColor="#10b981"
//                           stopOpacity={0.6}
//                         />
//                       </linearGradient>
//                       <linearGradient
//                         id="unproductiveGradient"
//                         x1="0"
//                         y1="0"
//                         x2="0"
//                         y2="1"
//                       >
//                         <stop
//                           offset="5%"
//                           stopColor="#ef4444"
//                           stopOpacity={0.8}
//                         />
//                         <stop
//                           offset="95%"
//                           stopColor="#ef4444"
//                           stopOpacity={0.6}
//                         />
//                       </linearGradient>
//                       <linearGradient
//                         id="breakGradient"
//                         x1="0"
//                         y1="0"
//                         x2="0"
//                         y2="1"
//                       >
//                         <stop
//                           offset="5%"
//                           stopColor="#a855f7"
//                           stopOpacity={0.8}
//                         />
//                         <stop
//                           offset="95%"
//                           stopColor="#a855f7"
//                           stopOpacity={0.6}
//                         />
//                       </linearGradient>
//                     </defs>
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             ) : (
//               <div className="text-center py-16">
//                 <div className="bg-gray-100 dark:bg-gray-700/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <FiTrendingUp className="w-10 h-10 text-gray-400" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
//                   No Analytics Data
//                 </h3>
//                 <p className="text-gray-500 dark:text-gray-400">
//                   No graph data available for analysis
//                 </p>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Enhanced Action Footer */}
//         <div className="mt-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
//           <div className="absolute inset-0 bg-black/10"></div>
//           <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10"></div>

//           <div className="relative flex flex-col lg:flex-row justify-between items-center">
//             <div className="text-center lg:text-left mb-6 lg:mb-0">
//               <h3 className="text-2xl font-bold mb-2">
//                 Daily Performance Summary
//               </h3>
//               <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-indigo-100">
//                 <span className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
//                   <FiZap className="mr-2" />
//                   {productiveTime}m productive
//                 </span>
//                 <span className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
//                   <FiCoffee className="mr-2" />
//                   {unproductiveTime}m unproductive
//                 </span>
//                 <span className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
//                   <FiTrendingUp className="mr-2" />
//                   {productivityPercentage}% efficiency
//                 </span>
//               </div>
//             </div>

//             <div className="flex flex-wrap gap-4">
//               <button className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-200 font-semibold">
//                 <FiDownload className="mr-2" />
//                 Export Report
//               </button>
//               <button className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg">
//                 <FiShare2 className="mr-2" />
//                 Share Analytics
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FiClock,
  FiCoffee,
  FiActivity,
  FiMonitor,
  FiGlobe,
  FiTrendingUp,
  FiInfo,
  FiEye,
  FiEyeOff,
  FiDownload,
  FiShare2,
  FiCalendar,
  FiUser,
  FiBarChart,
  FiPieChart,
  FiZap,
  FiRefreshCw,
  FiChevronRight,
  FiLayers,
  FiTarget,
  FiAward,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
  FiChrome,
  FiCompass,
  FiMaximize2,
  FiMinimize2,
  FiGrid,
  FiList,
} from "react-icons/fi";
import useUsageStatsStore from "../../store/useUsageStore";
import useFullAttendanceStore from "../../store/useFullAttendanceStore";
import CustomTooltip from "./CustomToolTip";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Brush,
  Cell,
  PieChart,
  Pie,
  RadialBarChart,
  RadialBar,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";

// Browser Icons Component
const BrowserIcon = ({ browser, className = "w-6 h-6" }) => {
  const browserName = browser.toLowerCase();
  if (browserName.includes('chrome')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#4285F4"/>
        <circle cx="12" cy="12" r="4" fill="white"/>
        <path d="M12 2C6.48 2 2 6.48 2 12h8l2-3.5L14 12h8c0-5.52-4.48-10-10-10z" fill="#EA4335"/>
        <path d="M12 12l-2 3.5L2 12c0 5.52 4.48 10 10 10l4-7h-4z" fill="#34A853"/>
        <path d="M16 12l-4 7c5.52 0 10-4.48 10-10h-8l2 3z" fill="#FBBC04"/>
      </svg>
    );
  } else if (browserName.includes('firefox')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#FF7139"/>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#FF9500"/>
      </svg>
    );
  } else if (browserName.includes('edge')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#0078D4"/>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#0078D4"/>
        <path d="M9 9c0-1.66 1.34-3 3-3s3 1.34 3 3v6c0 1.66-1.34 3-3 3s-3-1.34-3-3V9z" fill="white"/>
      </svg>
    );
  } else if (browserName.includes('safari')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#006CFF"/>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#006CFF"/>
        <path d="M12 7l1.5 4.5L18 13l-4.5 1.5L12 19l-1.5-4.5L6 13l4.5-1.5L12 7z" fill="white"/>
      </svg>
    );
  }
  return <FiCompass className={className} />;
};

export default function EmployeeDailyStats() {
  const { attendanceData } = useFullAttendanceStore();
  const { empID, date } = useParams();
  const [expandedWebsites, setExpandedWebsites] = useState({});
  const [expandedApps, setExpandedApps] = useState({});
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedBrowser, setSelectedBrowser] = useState(null);
  const [timelineView, setTimelineView] = useState("enhanced"); // enhanced or classic
  const [hoveredSegment, setHoveredSegment] = useState(null);

  const {
    dailyStats,
    fetchDailyStats,
    fetchDeptCategories,
    deptCategories,
    loading,
    error,
    timeline,
    fetchTimeline,
    fetchGraphData,
    graphData,
  } = useUsageStatsStore();

  const attendanceRecord = useMemo(() => {
    return attendanceData.find((rec) => rec.date === date);
  }, [attendanceData, date]);

  useEffect(() => {
    fetchDailyStats(empID, date).then((data) => {
      if (data?.department) {
        fetchDeptCategories(data.department);
      }
    });
    fetchTimeline(empID, date);
    fetchGraphData(empID, date);
  }, [empID, date]);

  const { productiveTime, unproductiveTime, neutralTime } = useMemo(() => {
    if (!dailyStats || !deptCategories)
      return { productiveTime: 0, unproductiveTime: 0, neutralTime: 0 };

    const prodSet = new Set(
      deptCategories.productive.map((d) => d.name.toLowerCase())
    );
    const unprodSet = new Set(
      deptCategories.unproductive.map((d) => d.name.toLowerCase())
    );

    let productiveTime = 0;
    let unproductiveTime = 0;
    let neutralTime = 0;

    dailyStats.appsUsed.forEach((app) => {
      const appName = app.appName.toLowerCase();
      if (prodSet.has(appName)) productiveTime += app.minutesUsed;
      else if (unprodSet.has(appName)) unproductiveTime += app.minutesUsed;
      else neutralTime += app.minutesUsed;
    });

    dailyStats.websitesVisited.forEach((site) => {
      const url = site.url.toLowerCase();
      if (prodSet.has(url)) productiveTime += site.minutesVisited;
      else if (unprodSet.has(url)) unproductiveTime += site.minutesVisited;
      else neutralTime += site.minutesVisited;
    });

    return { productiveTime, unproductiveTime, neutralTime };
  }, [dailyStats, deptCategories]);

  const combinedTimeline = useMemo(() => {
    const baseTimeline = (timeline || []).map((item, idx) => ({
      startTime: item.startTime,
      endTime: item.endTime,
      name: item.name,
      type: item.type || "app",
      duration:
        item.duration ||
        Math.round(
          (new Date(`2000-01-01T${item.endTime}`) -
            new Date(`2000-01-01T${item.startTime}`)) /
            60000
        ),
      id: `activity-${idx}-${item.startTime}`,
    }));

    const breaksTimeline = (attendanceRecord?.breaks || [])
      .filter((br) => {
        const breakDate = new Date(br.start).toISOString().split("T")[0];
        return breakDate === date;
      })
      .map((br, idx) => {
        const start = new Date(br.start);
        let end = new Date(br.end);
        if (end <= start) end.setDate(end.getDate() + 1);

        const duration = Math.round((end - start) / 60000);
        return {
          startTime: start.toTimeString().slice(0, 5),
          endTime: end.toTimeString().slice(0, 5),
          name: "Break",
          type: "break",
          duration: duration > 0 ? duration : 0,
          id: `break-${idx}-${start.getTime()}`,
        };
      });

    return [...baseTimeline, ...breaksTimeline].sort((a, b) => {
      const aDate = new Date(`2000-01-01T${a.startTime}`);
      const bDate = new Date(`2000-01-01T${b.startTime}`);
      return aDate - bDate;
    });
  }, [timeline, attendanceRecord, date]);

  // Enhanced timeline visualization data
 /* ────────────────────────────────────────────────────────────
   Enhanced timeline – split into app sessions + browser sessions
   ──────────────────────────────────────────────────────────── */
const enhancedTimelineData = useMemo(() => {
  if (!combinedTimeline.length) return [];

  const browserRegex = /chrome|edge|firefox|brave|opera|safari/i;
  const segments     = [];

  let currentBrowser     = null;
  let browserStartTime   = null;
  let websitesInBrowser  = [];

 combinedTimeline.forEach((item, idx) => {
  /* ─────────────────────────────────────────────
     1. rows that are tagged as an APP **or** BROWSER
     ───────────────────────────────────────────── */
  if (item.type === "app" || item.type === "browser") {
    /* close a running browser‑session first */
    if (currentBrowser) {
      segments.push({
        type     : "browser-session",
        browser  : currentBrowser,
        startTime: browserStartTime,
        endTime  : combinedTimeline[idx - 1].endTime,
        websites : [...websitesInBrowser],
        duration : Math.round(
          (new Date(`2000-01-01T${combinedTimeline[idx - 1].endTime}`) -
           new Date(`2000-01-01T${browserStartTime}`)) / 60000
        )
      });
      currentBrowser    = null;
      websitesInBrowser = [];
    }

    /* does this APP row itself represent a browser window?          */
    if (browserRegex.test(item.name)) {
      currentBrowser   = item.name;          // start new browser‑session
      browserStartTime = item.startTime;
    } else {
      segments.push({                         // ordinary native app
        type     : "app",
        name     : item.name,
        startTime: item.startTime,
        endTime  : item.endTime,
        duration : item.duration
      });
    }
    return;                                   // next timeline row
  }

  /* ─────────────────────────────────────────────
     2. WEBSITE rows – always belong to a browser
     (the back‑end often emits only website rows,
      never the parent browser window)
     ───────────────────────────────────────────── */
  if (item.type === "website") {
    if (!currentBrowser) {                    // start a generic session
      currentBrowser   = "Browser";           // fallback label
      browserStartTime = item.startTime;
    }
    websitesInBrowser.push({
      name     : item.name,
      startTime: item.startTime,
      endTime  : item.endTime,
      duration : item.duration
    });
    return;
  }

  /* ─────────────────────────────────────────────
     3. BREAK *or* NO‑ACTIVITY rows
     close any running browser‑session first
     ───────────────────────────────────────────── */
  if (item.type === "break" || item.type === "noActivity") {
    if (currentBrowser) {
      segments.push({
        type     : "browser-session",
        browser  : currentBrowser,
        startTime: browserStartTime,
        endTime  : combinedTimeline[idx - 1].endTime,
        websites : [...websitesInBrowser],
        duration : Math.round(
          (new Date(`2000-01-01T${combinedTimeline[idx - 1].endTime}`) -
           new Date(`2000-01-01T${browserStartTime}`)) / 60000
        )
      });
      currentBrowser    = null;
      websitesInBrowser = [];
    }
    segments.push({ ...item, type: "break" });  // treat no‑activity as break
  }
});

/* tail – day ended while a browser was open */
if (currentBrowser) {
  segments.push({
    type     : "browser-session",
    browser  : currentBrowser,
    startTime: browserStartTime,
    endTime  : combinedTimeline[combinedTimeline.length - 1].endTime,
    websites : [...websitesInBrowser],
    duration : Math.round(
      (new Date(`2000-01-01T${combinedTimeline[combinedTimeline.length - 1].endTime}`) -
       new Date(`2000-01-01T${browserStartTime}`)) / 60000
    )
  });
}


  return segments;
}, [combinedTimeline]);


  // Browser Sessions Graph Data
 /*────────────────  PER‑SESSION BAR‑CHART DATA  ────────────────*/
/*────────────────  PER‑SESSION BAR‑CHART DATA  ────────────────*/
const sessionGraphData = useMemo(() => {
  if (!enhancedTimelineData.length) return [];

  const labelCount = {};                 // keep labels unique on the X‑axis

  return enhancedTimelineData.flatMap((seg, idx) => {
    if (seg.type === "break") return [];

    const baseLabel = seg.type === "app" ? seg.name : seg.browser;
    const count     = (labelCount[baseLabel] ?? 0) + 1;
    labelCount[baseLabel] = count;

    return [{
      key      : idx,
      label    : count === 1 ? baseLabel : `${baseLabel} #${count}`, // X‑axis value
      rawLabel : baseLabel,                                          // nice name for tooltip
      minutes  : seg.duration,                                       // bar height
      start    : seg.startTime,
      end      : seg.endTime,
      type     : seg.type,                                           // for colouring
      sites    : seg.type === "browser-session"
                   ? Array.from(new Set(seg.websites.map(w => w.name))) // dedup sites
                   : []
    }];
  });
}, [enhancedTimelineData]);


  // Timeline bar chart data for enhanced view
  const timelineBarData = useMemo(() => {
    const hourlyData = {};
    
    // Initialize hours
    for (let i = 0; i < 24; i++) {
      const hour = i.toString().padStart(2, '0');
      hourlyData[hour] = {
        hour: `${hour}:00`,
        browsers: {},
        apps: 0,
        breaks: 0,
      };
    }

    enhancedTimelineData.forEach(segment => {
      const startHour = parseInt(segment.startTime.split(':')[0]);
      const endHour = parseInt(segment.endTime.split(':')[0]);
      
      for (let hour = startHour; hour <= endHour; hour++) {
        const hourKey = hour.toString().padStart(2, '0');
        if (!hourlyData[hourKey]) continue;

        if (segment.type === "browser-session") {
          if (!hourlyData[hourKey].browsers[segment.browser]) {
            hourlyData[hourKey].browsers[segment.browser] = 0;
          }
          hourlyData[hourKey].browsers[segment.browser] += 
            hour === startHour || hour === endHour ? segment.duration / 2 : 60;
        } else if (segment.type === "app") {
          hourlyData[hourKey].apps += 
            hour === startHour || hour === endHour ? segment.duration / 2 : 60;
        } else if (segment.type === "break") {
          hourlyData[hourKey].breaks += 
            hour === startHour || hour === endHour ? segment.duration / 2 : 60;
        }
      }
    });

    return Object.values(hourlyData).filter(h => {
      const hasActivity = Object.keys(h.browsers).length > 0 || h.apps > 0 || h.breaks > 0;
      return hasActivity;
    });
  }, [enhancedTimelineData]);

  const totalTime = productiveTime + unproductiveTime + neutralTime;
  const productivityPercentage =
    totalTime > 0 ? Math.round((productiveTime / totalTime) * 100) : 0;

  const toggleWebsiteExpansion = (index) => {
    setExpandedWebsites((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleAppExpansion = (index) => {
    setExpandedApps((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const formatUrl = (url) => {
    return url.replace(/^https?:\/\/(www\.)?/, "");
  };

  const shouldShowExpandButton = (text, maxLength = 25) => {
    return text && text.length > maxLength;
  };

  const truncateText = (text, maxLength = 25) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

   const browserSessionsData = useMemo(() => {
    const sessions = [];
    
    enhancedTimelineData.forEach((segment, idx) => {
      if (segment.type === "browser-session") {
        sessions.push({
          id: idx,
          browser: segment.browser,
          startTime: segment.startTime,
          endTime: segment.endTime,
          duration: segment.duration,
          websites: segment.websites,
          websiteCount: segment.websites.length,
        });
      }
    });

    return sessions;
  }, [enhancedTimelineData]);

  /*──────────── Tooltip for per‑session bars ───────────*/
const SessionTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 text-sm">
      <div className="font-semibold mb-1">{p.label}</div>
      <div>⏰ {p.start} – {p.end}</div>
      <div>🕒 {p.minutes} min</div>
      {p.sites.length > 0 && (
        <>
          <hr className="my-2" />
          <div className="font-medium mb-1">Websites inside:</div>
          <ul className="list-disc list-inside space-y-1">
            {p.sites.map((s,i)=><li key={i}>{s}</li>)}
          </ul>
        </>
      )}
    </div>
  );
};


  // Enhanced Timeline Tooltip
  const EnhancedTimelineTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    
    const data = payload[0].payload;
    const browsers = Object.entries(data.browsers || {});
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-5 min-w-[320px] border border-gray-100 dark:border-gray-700">
        <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-3">
          {data.hour}
        </h4>
        
        {browsers.length > 0 && (
          <div className="space-y-2 mb-3">
            {browsers.map(([browser, minutes]) => (
              <div key={browser} className="flex items-center justify-between">
                <div className="flex items-center">
                  <BrowserIcon browser={browser} className="w-4 h-4 mr-2" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{browser}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {Math.round(minutes)}m
                </span>
              </div>
            ))}
          </div>
        )}
        
        {data.apps > 0 && (
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">Other Apps</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {Math.round(data.apps)}m
            </span>
          </div>
        )}
        
        {data.breaks > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">Breaks</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {Math.round(data.breaks)}m
            </span>
          </div>
        )}
      </div>
    );
  };

  // Productivity score visual
  const getProductivityColor = (score) => {
    if (score >= 80) return { bg: "bg-green-500", text: "text-green-600", label: "Excellent" };
    if (score >= 60) return { bg: "bg-blue-500", text: "text-blue-600", label: "Good" };
    if (score >= 40) return { bg: "bg-yellow-500", text: "text-yellow-600", label: "Average" };
    return { bg: "bg-red-500", text: "text-red-600", label: "Needs Improvement" };
  };

  const productivityStatus = getProductivityColor(productivityPercentage);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 flex flex-col items-center">
          <div className="relative mb-6">
            <div className="w-20 h-20 border-4 border-gray-200 dark:border-gray-700 rounded-full">
              <div className="w-20 h-20 border-4 border-transparent border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Loading Analytics
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-center">
            Fetching employee performance data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiAlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Error Loading Data
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <FiRefreshCw className="mr-2" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!dailyStats) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiBarChart className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            No Data Available
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            No statistics found for the selected date.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Modern Header with Gradient Background */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mr-5">
                  <FiUser className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    Performance Analytics
                  </h1>
                  <div className="flex items-center text-white/90">
                    <FiCalendar className="mr-2" />
                    <span>
                      {new Date(date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="mx-3 text-white/60">•</span>
                    <span>Employee #{empID}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className={`text-5xl font-bold text-white mb-2`}>
                  {productivityPercentage}%
                </div>
                <div className="text-white/80 text-sm font-medium">
                  Productivity Score
                </div>
                <div className={`text-xs mt-1 text-white/70`}>
                  {productivityStatus.label}
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-5xl font-bold text-white mb-2">
                  {Math.floor(totalTime / 60)}h
                </div>
                <div className="text-white/80 text-sm font-medium">
                  Active Time
                </div>
                <div className="text-xs mt-1 text-white/70">
                  {totalTime % 60}m additional
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mt-8 bg-white/10 backdrop-blur-sm p-1 rounded-2xl">
            <div className="flex space-x-1">
              {[
                { id: "overview", label: "Overview", icon: FiPieChart },
                { id: "activity", label: "Activity", icon: FiActivity },
                { id: "timeline", label: "Timeline", icon: FiClock },
                
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex-1 flex items-center justify-center px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeTab === id
                      ? "bg-white text-indigo-600 shadow-lg"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="mr-2 w-5 h-5" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Productivity Score Card */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Productivity Overview
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Score Visualization */}
                <div className="flex flex-col items-center justify-center">
                  <div className="relative w-48 h-48">
                    <svg className="w-48 h-48 transform -rotate-90">
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        className="text-gray-200 dark:text-gray-700"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${productivityPercentage * 5.52} 552`}
                        className={`${productivityStatus.text} transition-all duration-1000`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-5xl font-bold text-gray-900 dark:text-white">
                        {productivityPercentage}%
                      </div>
                      <div className={`text-sm font-medium ${productivityStatus.text}`}>
                        {productivityStatus.label}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Time Breakdown */}
                <div className="lg:col-span-2">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Productive Time
                        </span>
                        <span className="text-sm font-bold text-green-600 dark:text-green-400">
                          {productiveTime}m ({Math.round((productiveTime / totalTime) * 100)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${(productiveTime / totalTime) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Unproductive Time
                        </span>
                        <span className="text-sm font-bold text-red-600 dark:text-red-400">
                          {unproductiveTime}m ({Math.round((unproductiveTime / totalTime) * 100)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${(unproductiveTime / totalTime) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Neutral Time
                        </span>
                        <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                          {neutralTime}m ({Math.round((neutralTime / totalTime) * 100)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-gray-400 to-gray-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${(neutralTime / totalTime) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                      <FiTrendingUp className="w-6 h-6 text-green-600 dark:text-green-400 mb-2" />
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {Math.floor(productiveTime / 60)}h {productiveTime % 60}m
                      </div>
                      <div className="text-xs text-green-700 dark:text-green-300">Productive</div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
                      <FiCoffee className="w-6 h-6 text-red-600 dark:text-red-400 mb-2" />
                      <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {Math.floor(unproductiveTime / 60)}h {unproductiveTime % 60}m
                      </div>
                      <div className="text-xs text-red-700 dark:text-red-300">Unproductive</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/20 rounded-xl p-4">
                      <FiActivity className="w-6 h-6 text-gray-600 dark:text-gray-400 mb-2" />
                      <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                        {Math.floor(neutralTime / 60)}h {neutralTime % 60}m
                      </div>
                      <div className="text-xs text-gray-700 dark:text-gray-300">Neutral</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Attendance and Browser Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Attendance Card */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <FiClock className="mr-3 text-indigo-600" />
                  Attendance Summary
                </h3>

                {attendanceRecord ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Check In</div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                          {attendanceRecord.login}
                        </div>
                      </div>
                      <FiCheckCircle className="w-8 h-8 text-green-500" />
                    </div>

                    <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Check Out</div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                          {attendanceRecord.logout || "Active"}
                        </div>
                      </div>
                      {attendanceRecord.logout ? (
                        <FiCheckCircle className="w-8 h-8 text-green-500" />
                      ) : (
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">Active</span>
                        </div>
                      )}
                    </div>

                    {attendanceRecord.breaks && attendanceRecord.breaks.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          Break Sessions ({attendanceRecord.breaks.length})
                        </h4>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {attendanceRecord.breaks.map((br, i) => (
                            <div
                              key={i}
                              className="flex justify-between items-center p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg"
                            >
                              <div className="flex items-center">
                                <FiCoffee className="w-4 h-4 text-amber-600 dark:text-amber-400 mr-2" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  {new Date(br.start).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                  {" - "}
                                  {new Date(br.end).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                              <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                                {Math.round((new Date(br.end) - new Date(br.start)) / 60000)}m
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FiInfo className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">No attendance data available</p>
                  </div>
                )}
              </div>

              {/* Browser Activity Summary */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <FiGlobe className="mr-3 text-indigo-600" />
                  Browser Activity Summary
                </h3>

                {browserSessionsData.length > 0 ? (
                  <div className="space-y-4">
                    {Object.entries(
                      browserSessionsData.reduce((acc, session) => {
                        if (!acc[session.browser]) {
                          acc[session.browser] = {
                            totalTime: 0,
                            sessions: 0,
                            websites: new Set(),
                          };
                        }
                        acc[session.browser].totalTime += session.duration;
                        acc[session.browser].sessions += 1;
                        session.websites.forEach(w => acc[session.browser].websites.add(w.name));
                        return acc;
                      }, {})
                    ).map(([browser, data]) => (
                      <div key={browser} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <BrowserIcon browser={browser} className="w-6 h-6 mr-3" />
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {browser}
                            </span>
                          </div>
                          <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                            {data.totalTime}m
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {data.sessions} sessions • {data.websites.size} unique sites
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FiGlobe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">No browser activity recorded</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Applications */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <FiMonitor className="mr-3" />
                  Applications Used
                </h3>
              </div>

              <div className="p-6">
                {dailyStats.appsUsed.length > 0 ? (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {dailyStats.appsUsed.map((app, i) => (
                      <div
                        key={i}
                        className="group p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center flex-1 min-w-0">
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mr-4">
                              <FiMonitor className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center">
                                <div className="font-semibold text-gray-900 dark:text-white">
                                  {expandedApps[i] || !shouldShowExpandButton(app.appName)
                                    ? app.appName
                                    : truncateText(app.appName)}
                                </div>
                                {shouldShowExpandButton(app.appName) && (
                                  <button
                                    onClick={() => toggleAppExpansion(i)}
                                    className="ml-2 text-indigo-600 hover:text-indigo-700"
                                  >
                                    {expandedApps[i] ? <FiEyeOff /> : <FiEye />}
                                  </button>
                                )}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {app.category || "Uncategorized"}
                              </div>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                              {app.minutesUsed}m
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FiMonitor className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">No applications used</p>
                  </div>
                )}
              </div>
            </div>

            {/* Websites */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <FiGlobe className="mr-3" />
                  Websites Visited
                </h3>
              </div>

              <div className="p-6">
                {dailyStats.websitesVisited.length > 0 ? (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {dailyStats.websitesVisited.map((site, i) => (
                      <div
                        key={i}
                        className="group p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center flex-1 min-w-0">
                            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mr-4">
                              <FiGlobe className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center">
                                <div className="font-semibold text-gray-900 dark:text-white">
                                  {expandedWebsites[i] || !shouldShowExpandButton(formatUrl(site.url))
                                    ? formatUrl(site.url)
                                    : truncateText(formatUrl(site.url))}
                                </div>
                                {shouldShowExpandButton(formatUrl(site.url)) && (
                                  <button
                                    onClick={() => toggleWebsiteExpansion(i)}
                                    className="ml-2 text-emerald-600 hover:text-emerald-700"
                                  >
                                    {expandedWebsites[i] ? <FiEyeOff /> : <FiEye />}
                                  </button>
                                )}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {site.category || "Uncategorized"}
                              </div>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                              {site.minutesVisited}m
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FiGlobe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">No websites visited</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "timeline" && (
          <div className="space-y-6">
            {/* Timeline View Toggle */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Activity Timeline
                </h2>
                <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
                  <button
                    onClick={() => setTimelineView("enhanced")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      timelineView === "enhanced"
                        ? "bg-white dark:bg-gray-800 text-indigo-600 shadow-sm"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    <FiGrid className="inline mr-2" />
                    Enhanced
                  </button>
                  <button
                    onClick={() => setTimelineView("classic")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      timelineView === "classic"
                        ? "bg-white dark:bg-gray-800 text-indigo-600 shadow-sm"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    <FiList className="inline mr-2" />
                    Classic
                  </button>
                </div>
              </div>
            </div>

            {timelineView === "enhanced" ? (
              <>
                {/* Browser Sessions Timeline */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Browser Activity Timeline
                  </h3>
                  
                {sessionGraphData.length > 0 ? (
  <div className="overflow-x-auto">
    <ResponsiveContainer minWidth={600} height={260}>
      <BarChart data={sessionGraphData}>
        <XAxis dataKey="label" stroke="#6b7280" />
        <YAxis stroke="#6b7280" />
        <Tooltip content={<SessionTooltip />} />

        {/* one bar per session; browsers coloured differently */}
       <Bar dataKey="minutes" radius={[4, 4, 0, 0]}>
  {sessionGraphData.map(row => (
    <Cell
      key={row.key}
      fill={row.type === "browser-session" ? "#6366f1" /* browsers */ : "#10b981" /* apps */}
    />
  ))}
</Bar>


        {/* pan / zoom when there are many sessions */}
        <Brush dataKey="label" height={20} travellerWidth={8} stroke="#6366f1" />
      </BarChart>
    </ResponsiveContainer>
  </div>
)  : (
                    <div className="text-center py-12">
                      <FiClock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">No timeline data available</p>
                    </div>
                  )}
                </div>

                {/* Browser Sessions Cards */}
                <div className="grid grid-cols-1 gap-4">
                  {browserSessionsData.map((session, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <BrowserIcon browser={session.browser} className="w-8 h-8 mr-3" />
                          <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                              {session.browser} Session
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {session.startTime} - {session.endTime} ({session.duration}m)
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                            {session.websiteCount}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            websites visited
                          </div>
                        </div>
                      </div>

                      {session.websites.length > 0 && (
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {session.websites.map((site, siteIdx) => (
                              <div
                                key={siteIdx}
                                className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center flex-1 min-w-0">
                                    <FiGlobe className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                                      {site.name}
                                    </span>
                                  </div>
                                  <span className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-2">
                                    {site.duration}m
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              /* Classic Timeline View */
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
                {combinedTimeline.length > 0 ? (
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700"></div>

                    <div className="space-y-6">
                      {combinedTimeline.map((block, idx) => {
                        const isBreak = block.type === "break";
                        const isWebsite = block.type === "website";
                        const isApp = block.type === "app";

                        return (
                          <div key={idx} className="relative flex items-start">
                            {/* Timeline dot */}
                            <div className="absolute left-6 w-4 h-4 rounded-full border-4 border-white dark:border-gray-800 shadow-sm z-10"
                              style={{
                                backgroundColor: isBreak ? '#F59E0B' : isWebsite ? '#10B981' : '#6366F1'
                              }}
                            ></div>

                            {/* Content */}
                            <div className="ml-16 flex-1">
                              <div className={`p-6 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg ${
                                isBreak
                                  ? "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30"
                                  : isWebsite
                                  ? "bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-900/30"
                                  : "bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-900/30"
                              }`}>
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h4 className={`text-lg font-bold mb-2 ${
                                      isBreak
                                        ? "text-amber-700 dark:text-amber-300"
                                        : isWebsite
                                        ? "text-emerald-700 dark:text-emerald-300"
                                        : "text-indigo-700 dark:text-indigo-300"
                                    }`}>
                                      {block.name}
                                    </h4>
                                    <div className="flex items-center space-x-4 text-sm">
                                      <span className="flex items-center text-gray-600 dark:text-gray-400">
                                        <FiClock className="mr-1" />
                                        {block.startTime} - {block.endTime}
                                      </span>
                                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                                        {block.duration} minutes
                                      </span>
                                    </div>
                                  </div>
                                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                    isBreak
                                      ? "bg-amber-200 text-amber-800 dark:bg-amber-700/30 dark:text-amber-200"
                                      : isWebsite
                                      ? "bg-emerald-200 text-emerald-800 dark:bg-emerald-700/30 dark:text-emerald-200"
                                      : "bg-indigo-200 text-indigo-800 dark:bg-indigo-700/30 dark:text-indigo-200"
                                  }`}>
                                    {block.type}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <FiClock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">No timeline data available</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      

        {/* Action Footer */}
        <div className="mt-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative flex flex-col lg:flex-row justify-between items-center">
            <div className="text-center lg:text-left mb-6 lg:mb-0">
              <h3 className="text-2xl font-bold mb-3">
                Daily Performance Summary
              </h3>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-5 py-2.5 flex items-center">
                  <FiZap className="mr-2" />
                  <span className="font-medium">{productiveTime}m productive</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-5 py-2.5 flex items-center">
                  <FiCoffee className="mr-2" />
                  <span className="font-medium">{unproductiveTime}m unproductive</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-5 py-2.5 flex items-center">
                  <FiTrendingUp className="mr-2" />
                  <span className="font-medium">{productivityPercentage}% efficiency</span>
                </div>
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
}