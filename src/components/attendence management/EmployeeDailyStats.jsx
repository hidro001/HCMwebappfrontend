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
} from "recharts";

export default function EmployeeDailyStats() {
  const { attendanceData } = useFullAttendanceStore();
  const { empID, date } = useParams();
  const [expandedWebsites, setExpandedWebsites] = useState({});
  const [expandedApps, setExpandedApps] = useState({});
  const [activeTab, setActiveTab] = useState("overview");

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

  const { productiveTime, unproductiveTime } = useMemo(() => {
    if (!dailyStats || !deptCategories)
      return { productiveTime: 0, unproductiveTime: 0 };

    const prodSet = new Set(
      deptCategories.productive.map((d) => d.name.toLowerCase())
    );
    const unprodSet = new Set(
      deptCategories.unproductive.map((d) => d.name.toLowerCase())
    );

    let productiveTime = 0;
    let unproductiveTime = 0;

    dailyStats.appsUsed.forEach((app) => {
      const appName = app.appName.toLowerCase();
      if (prodSet.has(appName)) productiveTime += app.minutesUsed;
      else if (unprodSet.has(appName)) unproductiveTime += app.minutesUsed;
    });

    dailyStats.websitesVisited.forEach((site) => {
      const url = site.url.toLowerCase();
      if (prodSet.has(url)) productiveTime += site.minutesVisited;
      else if (unprodSet.has(url)) unproductiveTime += site.minutesVisited;
    });

    return { productiveTime, unproductiveTime };
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-indigo-200 dark:border-indigo-800 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-indigo-500 rounded-full animate-spin"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <FiBarChart className="w-8 h-8 text-indigo-500 animate-pulse" />
          </div>
        </div>
        <div className="ml-6">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            Loading Analytics
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Fetching daily statistics...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-950 dark:to-rose-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiInfo className="w-10 h-10 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-rose-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <FiRefreshCw className="mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!dailyStats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiBarChart className="w-10 h-10 text-blue-500" />
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

  const totalTime = productiveTime + unproductiveTime;
  const productivityPercentage =
    totalTime > 0 ? Math.round((productiveTime / totalTime) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10"></div>

        <div className="relative px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
              <div className="text-white mb-6 lg:mb-0">
                <div className="flex items-center mb-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 mr-4">
                    <FiUser className="w-8 h-8" />
                  </div>
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                      Daily Analytics
                    </h1>
                    <p className="text-blue-100 text-lg mt-2">
                      Employee Performance Dashboard
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-white/90">
                  <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    <FiCalendar className="mr-2" />
                    <span className="font-medium">
                      {new Date(date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    <FiUser className="mr-2" />
                    <span className="font-medium">Employee #{empID}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-white">
                    {productivityPercentage}%
                  </div>
                  <div className="text-white/80 text-sm">
                    Productivity Score
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-white">
                    {totalTime}
                  </div>
                  <div className="text-white/80 text-sm">Total Minutes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Tab Navigation */}
        <div className="mb-8">
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-2 shadow-xl border border-white/20">
            <div className="flex flex-wrap gap-2">
              {[
                { id: "overview", label: "Overview", icon: FiPieChart },
                { id: "activity", label: "Activity", icon: FiActivity },
                { id: "timeline", label: "Timeline", icon: FiClock },
                { id: "analytics", label: "Analytics", icon: FiTrendingUp },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    activeTab === id
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                      : "text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <Icon className="mr-2 w-5 h-5" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Content Sections */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Productivity Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-3 mr-4">
                    <FiZap className="w-6 h-6 text-white" />
                  </div>
                  Productivity Metrics
                </h2>

                <div className="flex items-center justify-between mb-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                      {productivityPercentage}%
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 font-medium">
                      Productivity Score
                    </div>
                  </div>

                  <div className="relative w-32 h-32">
                    <svg
                      className="w-32 h-32 transform -rotate-90"
                      viewBox="0 0 36 36"
                    >
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-gray-200 dark:text-gray-700"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="3"
                        strokeDasharray={`${productivityPercentage}, 100`}
                        className="transition-all duration-1000 ease-out"
                      />
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#14b8a6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xl font-bold text-gray-800 dark:text-white">
                          {totalTime}m
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Total
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                    <div className="flex items-center">
                      <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300 p-3 rounded-xl mr-4">
                        <FiTrendingUp className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          Productive Time
                        </div>
                        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-300">
                          {productiveTime}m
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 p-6 rounded-2xl border border-rose-100 dark:border-rose-900/30">
                    <div className="flex items-center">
                      <div className="bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-300 p-3 rounded-xl mr-4">
                        <FiCoffee className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          Unproductive Time
                        </div>
                        <div className="text-2xl font-bold text-rose-600 dark:text-rose-300">
                          {unproductiveTime}m
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Attendance Summary */}
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-3 mr-4">
                    <FiClock className="w-6 h-6 text-white" />
                  </div>
                  Attendance Summary
                </h2>

                {attendanceRecord ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                        <div className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                          Check In
                        </div>
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                          {attendanceRecord.login}
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl border border-purple-100 dark:border-purple-900/30">
                        <div className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                          Check Out
                        </div>
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-300">
                          {attendanceRecord.logout || "Active"}
                        </div>
                      </div>
                    </div>

                    {attendanceRecord.breaks &&
                      attendanceRecord.breaks.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
                            <FiCoffee className="mr-2" />
                            Break Sessions
                          </h3>
                          <div className="space-y-3 max-h-48 overflow-y-auto">
                            {attendanceRecord.breaks.map((br, i) => (
                              <div
                                key={i}
                                className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-900/30"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300 p-2 rounded-lg mr-3">
                                      <FiCoffee className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <div className="font-semibold text-gray-800 dark:text-gray-200">
                                        {new Date(br.start).toLocaleTimeString(
                                          [],
                                          { hour: "2-digit", minute: "2-digit" }
                                        )}
                                        {" → "}
                                        {new Date(br.end).toLocaleTimeString(
                                          [],
                                          { hour: "2-digit", minute: "2-digit" }
                                        )}
                                      </div>
                                      <div className="text-sm text-gray-500 dark:text-gray-400">
                                        Break #{i + 1}
                                      </div>
                                    </div>
                                  </div>
                                  <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-3 py-1 rounded-full text-sm font-semibold">
                                    {Math.round(
                                      (new Date(br.end) - new Date(br.start)) /
                                        60000
                                    )}
                                    m
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-gray-100 dark:bg-gray-700/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FiInfo className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      No Attendance Record
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      No attendance data available for this date
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Enhanced Apps Section */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-8 py-6">
                <div className="flex items-center text-white">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 mr-4">
                    <FiMonitor className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Applications Used</h3>
                    <p className="text-indigo-100">Desktop & Mobile Apps</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {dailyStats.appsUsed.length > 0 ? (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {dailyStats.appsUsed.map((app, i) => (
                      <div
                        key={i}
                        className="group bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-600/30 hover:shadow-lg transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center flex-1 min-w-0">
                            <div className="bg-indigo-100 dark:bg-indigo-900/30 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
                              <FiMonitor className="text-indigo-500 w-6 h-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center">
                                <div className="font-semibold text-gray-800 dark:text-gray-200">
                                  {expandedApps[i] ||
                                  !shouldShowExpandButton(app.appName)
                                    ? app.appName
                                    : truncateText(app.appName)}
                                </div>
                                {shouldShowExpandButton(app.appName) && (
                                  <button
                                    onClick={() => toggleAppExpansion(i)}
                                    className="ml-2 text-indigo-500 hover:text-indigo-700 transition-colors"
                                    title={
                                      expandedApps[i]
                                        ? "Show less"
                                        : "Show full name"
                                    }
                                  >
                                    {expandedApps[i] ? (
                                      <FiEyeOff className="w-4 h-4" />
                                    ) : (
                                      <FiEye className="w-4 h-4" />
                                    )}
                                  </button>
                                )}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {app.category || "Uncategorized"}
                              </div>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                              {app.minutesUsed}m
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-gray-100 dark:bg-gray-700/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiMonitor className="w-8 h-8 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                      No Apps Used
                    </h4>
                    <p className="text-gray-500 dark:text-gray-500">
                      No application usage recorded
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Websites Section */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-8 py-6">
                <div className="flex items-center text-white">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 mr-4">
                    <FiGlobe className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Websites Visited</h3>
                    <p className="text-emerald-100">Browser Activity</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {dailyStats.websitesVisited.length > 0 ? (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {dailyStats.websitesVisited.map((site, i) => (
                      <div
                        key={i}
                        className="group bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-600/30 hover:shadow-lg transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center flex-1 min-w-0">
                            <div className="bg-emerald-100 dark:bg-emerald-900/30 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
                              <FiGlobe className="text-emerald-500 w-6 h-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center">
                                <div className="font-semibold text-gray-800 dark:text-gray-200">
                                  {expandedWebsites[i] ||
                                  !shouldShowExpandButton(formatUrl(site.url))
                                    ? formatUrl(site.url)
                                    : truncateText(formatUrl(site.url))}
                                </div>
                                {shouldShowExpandButton(
                                  formatUrl(site.url)
                                ) && (
                                  <button
                                    onClick={() => toggleWebsiteExpansion(i)}
                                    className="ml-2 text-emerald-500 hover:text-emerald-700 transition-colors"
                                    title={
                                      expandedWebsites[i]
                                        ? "Show less"
                                        : "Show full URL"
                                    }
                                  >
                                    {expandedWebsites[i] ? (
                                      <FiEyeOff className="w-4 h-4" />
                                    ) : (
                                      <FiEye className="w-4 h-4" />
                                    )}
                                  </button>
                                )}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {site.category || "Uncategorized"}
                              </div>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                              {site.minutesVisited}m
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-gray-100 dark:bg-gray-700/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiGlobe className="w-8 h-8 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                      No Websites Visited
                    </h4>
                    <p className="text-gray-500 dark:text-gray-500">
                      No web browsing activity recorded
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "timeline" && (
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="flex flex-wrap justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-3 mr-4">
                  <FiClock className="w-6 h-6 text-white" />
                </div>
                Activity Timeline
              </h2>
              <div className="flex flex-wrap gap-4 mt-4 sm:mt-0">
                <div className="flex items-center text-sm bg-indigo-50 dark:bg-indigo-900/20 px-3 py-2 rounded-full">
                  <span className="block w-3 h-3 rounded-full mr-2 bg-indigo-500"></span>
                  Applications
                </div>
                <div className="flex items-center text-sm bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 rounded-full">
                  <span className="block w-3 h-3 rounded-full mr-2 bg-emerald-500"></span>
                  Websites
                </div>
                <div className="flex items-center text-sm bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-full">
                  <span className="block w-3 h-3 rounded-full mr-2 bg-amber-500"></span>
                  Breaks
                </div>
              </div>
            </div>

            {combinedTimeline.length > 0 ? (
              <div className="relative pl-8">
                <div className="absolute left-[15px] top-0 w-1 h-full bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700 rounded-full"></div>

                <div className="space-y-6">
                  {combinedTimeline.map((block, idx) => {
                    const isBreak = block.type === "break";
                    const isWebsite = block.type === "website";
                    const start24h = new Date(
                      `2000-01-01 ${block.startTime}`
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                    const end24h = new Date(
                      `2000-01-01 ${block.endTime}`
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                    return (
                      <div key={idx} className="relative flex group">
                        <div className="absolute left-[-23px] top-1/2 transform -translate-y-1/2 z-20">
                          <div
                            className={`w-6 h-6 rounded-full border-4 border-white dark:border-gray-800 shadow-lg ${
                              isBreak
                                ? "bg-amber-500"
                                : isWebsite
                                ? "bg-emerald-500"
                                : "bg-indigo-500"
                            }`}
                          ></div>
                        </div>

                        <div className="ml-4 flex-1">
                          <div
                            className={`p-6 rounded-2xl shadow-md transition-all duration-300 group-hover:shadow-xl ${
                              isBreak
                                ? "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-900/30"
                                : isWebsite
                                ? "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-900/30"
                                : "bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-900/30"
                            }`}
                          >
                            <div className="flex flex-wrap justify-between items-start">
                              <div className="flex-1">
                                <h3
                                  className={`text-lg font-bold mb-2 ${
                                    isBreak
                                      ? "text-amber-700 dark:text-amber-300"
                                      : isWebsite
                                      ? "text-emerald-700 dark:text-emerald-300"
                                      : "text-indigo-700 dark:text-indigo-300"
                                  }`}
                                >
                                  {block.name}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                    <FiClock className="mr-1 w-3 h-3" />
                                    {start24h} - {end24h}
                                  </span>
                                  {block.duration > 0 && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                      {block.duration} min
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="mt-2 sm:mt-0 ml-4">
                                <span
                                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                                    isBreak
                                      ? "bg-amber-100 text-amber-800 dark:bg-amber-700/30 dark:text-amber-200"
                                      : isWebsite
                                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-700/30 dark:text-emerald-200"
                                      : "bg-indigo-100 text-indigo-800 dark:bg-indigo-700/30 dark:text-indigo-200"
                                  }`}
                                >
                                  {block.type}
                                </span>
                              </div>
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
                <div className="bg-gray-100 dark:bg-gray-700/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiClock className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  No Activity Timeline
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  No timeline data available for this date
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-3 mr-4">
                <FiTrendingUp className="w-6 h-6 text-white" />
              </div>
              Productivity Analytics
            </h2>

            {graphData &&
            graphData.length > 0 &&
            graphData[0].Productivity > 0 ? (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-600/30">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={graphData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="time"
                      stroke="#6b7280"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#6b7280"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar
                      dataKey="Productivity"
                      stackId="a"
                      fill="url(#productiveGradient)"
                      radius={[0, 0, 4, 4]}
                    />
                    <Bar
                      dataKey="Unproductivity"
                      stackId="a"
                      fill="url(#unproductiveGradient)"
                      radius={[0, 0, 0, 0]}
                    />
                    <Bar
                      dataKey="BreakTime"
                      stackId="a"
                      fill="url(#breakGradient)"
                      radius={[4, 4, 0, 0]}
                    />
                    <defs>
                      <linearGradient
                        id="productiveGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10b981"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10b981"
                          stopOpacity={0.6}
                        />
                      </linearGradient>
                      <linearGradient
                        id="unproductiveGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#ef4444"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#ef4444"
                          stopOpacity={0.6}
                        />
                      </linearGradient>
                      <linearGradient
                        id="breakGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#a855f7"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#a855f7"
                          stopOpacity={0.6}
                        />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-gray-100 dark:bg-gray-700/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiTrendingUp className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  No Analytics Data
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  No graph data available for analysis
                </p>
              </div>
            )}
          </div>
        )}

        {/* Enhanced Action Footer */}
        <div className="mt-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10"></div>

          <div className="relative flex flex-col lg:flex-row justify-between items-center">
            <div className="text-center lg:text-left mb-6 lg:mb-0">
              <h3 className="text-2xl font-bold mb-2">
                Daily Performance Summary
              </h3>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-indigo-100">
                <span className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <FiZap className="mr-2" />
                  {productiveTime}m productive
                </span>
                <span className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <FiCoffee className="mr-2" />
                  {unproductiveTime}m unproductive
                </span>
                <span className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <FiTrendingUp className="mr-2" />
                  {productivityPercentage}% efficiency
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-200 font-semibold">
                <FiDownload className="mr-2" />
                Export Report
              </button>
              <button className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg">
                <FiShare2 className="mr-2" />
                Share Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}