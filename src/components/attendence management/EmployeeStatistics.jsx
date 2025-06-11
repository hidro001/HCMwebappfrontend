// import React, { useEffect, useMemo, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import dayjs from "dayjs";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip as RechartsTooltip,
//   ResponsiveContainer,
//   Cell,
// } from "recharts";
// import useUsageStatsStore from "../../store/useUsageStore";
// import useFullAttendanceStore from "../../store/useFullAttendanceStore";
// import ActivityTrendChart from "./ActivityTrendChart";
// import {
//   FiClock,
//   FiCoffee,
//   FiCalendar,
//   FiTrendingUp,
//   FiActivity,
//   FiMonitor,
//   FiGlobe,
//   FiMousePointer,
//   FiType,
//   FiInfo,
//   FiBarChart2,
//   FiUser,
//   FiTarget,
//   FiAward,
//   FiZap,
//   FiCpu,
// } from "react-icons/fi";

// ChartJS.register(ArcElement, Tooltip, Legend);

// // ────────────────────────────────────────────────────────────────────────────
// //  Utilities
// // ────────────────────────────────────────────────────────────────────────────
// const isSameISO = (d1, d2) =>
//   dayjs(d1).format("YYYY-MM-DD") === dayjs(d2).format("YYYY-MM-DD");

// const isBetween = (date, start, end) =>
//   dayjs(date).isAfter(dayjs(start).subtract(1, "day")) &&
//   dayjs(date).isBefore(dayjs(end).add(1, "day"));

// function convertTo24Hour(timeStr) {
//   if (!timeStr) return timeStr;
//   const [time, ampm] = timeStr.split(" ");
//   if (!ampm) return timeStr;
//   let [h, m, s] = time.split(":").map(Number);
//   if (ampm === "PM" && h !== 12) h += 12;
//   if (ampm === "AM" && h === 12) h = 0;
//   return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(
//     s
//   ).padStart(2, "0")}`;
// }

// // App icon mapping
// const appIconMap = {
//   "google chrome": "https://img.icons8.com/color/48/chrome--v1.png",
//   slack: "https://img.icons8.com/color/48/slack-new-logo.png",
//   excel: "https://img.icons8.com/color/48/microsoft-excel-2019--v1.png",
//   word: "https://img.icons8.com/color/48/ms-word.png",
//   anydesk: "https://img.icons8.com/color/48/anydesk.png",
//   calculator: "https://img.icons8.com/color/48/calculator.png",
//   "docker desktop": "https://img.icons8.com/color/48/docker.png",
//   electron: "https://img.icons8.com/color/48/electron.png",
//   "lockapp.exe": "https://img.icons8.com/color/48/lock-2.png",
//   "microsoft 365 copilot app":
//     "https://img.icons8.com/color/48/microsoft-365.png",
//   "microsoft copilot": "https://img.icons8.com/color/48/microsoft-365.png",
//   "microsoft edge": "https://img.icons8.com/color/48/ms-edge-new.png",
//   mongodbcompass: "https://img.icons8.com/color/48/mongodb.png",
//   notepad: "https://img.icons8.com/color/48/notepad.png",
//   "photos.exe": "https://img.icons8.com/color/48/windows-photos.png",
//   postman: "https://img.icons8.com/color/48/postman-api.png",
//   "python 3.13.3 (64-bit)": "https://img.icons8.com/color/48/python.png",
//   "screenclippinghost.exe": "https://img.icons8.com/color/48/screenshot.png",
//   "search application": "https://img.icons8.com/color/48/search--v1.png",
//   settings: "https://img.icons8.com/color/48/settings--v1.png",
//   "setup/uninstall": "https://img.icons8.com/color/48/uninstalling-updates.png",
//   "ssh, telnet, rlogin, and supdup client":
//     "https://img.icons8.com/color/48/console.png",
//   "task manager": "https://img.icons8.com/color/48/task-manager.png",
//   "tcp/ip ping command": "https://img.icons8.com/color/48/console.png",
//   "visual studio code":
//     "https://img.icons8.com/color/48/visual-studio-code-2019.png",
//   "whatsapp.exe": "https://img.icons8.com/color/48/whatsapp--v1.png",
//   "windows command processor":
//     "https://img.icons8.com/color/48/command-line.png",
//   "windows explorer": "https://img.icons8.com/color/48/windows-explorer.png",
//   "windows shell experience host":
//     "https://img.icons8.com/color/48/windows-10.png",
//   "windows® installer": "https://img.icons8.com/color/48/windows-installer.png",
//   "winscp: sftp, ftp, webdav, s3 and scp client":
//     "https://img.icons8.com/color/48/ftp.png",
//   "wps office": "https://img.icons8.com/color/48/wps-office.png",
//   "wps spreadsheets": "https://img.icons8.com/color/48/wps-office.png",
//   "x-lite.exe": "https://img.icons8.com/color/48/phone-office.png",
//   "a desktop app for humanmaximizer":
//     "https://img.icons8.com/color/48/monitor--v1.png",
// };

// const getFavicon = (url) =>
//   `https://www.google.com/s2/favicons?domain=${url}&sz=64`;

// const getAppIcon = (appName) => {
//   const key = appName.toLowerCase();
//   return (
//     appIconMap[key] ||
//     "https://img.icons8.com/fluency-systems-regular/48/application-window.png"
//   );
// };

// // ────────────────────────────────────────────────────────────────────────────
// //  Main component
// // ────────────────────────────────────────────────────────────────────────────
// export default function EmployeeStatistics() {
//   const { empID } = useParams();
//   const navigate = useNavigate();
//   const today = dayjs();
//   const [selectedDate, setSelectedDate] = useState(today.format("YYYY-MM-DD"));

//   // Stores
//   const {
//     stats,
//     dailyStats,
//     deptCategories,
//     fetchStats,
//     fetchDailyStats,
//     fetchDeptCategories,
//     fetchTopProductivityStats,
//     topProductivityStats,
//     loading: prodStatsLoading,
//     fetchMostUsedStats,
//     mostUsedStats,
//     loading: usageLoading,
//     error: usageError,
//     fetchActivityTrend,
//     fetchStatsForSpecificDate,
//     fetchFilteredStats
//   } = useUsageStatsStore();

//   const attendanceData = useFullAttendanceStore(
//     (state) => state.attendanceData
//   );
//   const fetchAllData = useFullAttendanceStore((state) => state.fetchAllData);
//   const fetchInsights = useFullAttendanceStore((state) => state.fetchInsights);
//   const insights = useFullAttendanceStore((state) => state.insights);
//   const attendanceLoading = useFullAttendanceStore((state) => state.isLoading);
//   const attendanceError = useFullAttendanceStore((state) => state.error);

//   // State
//   const [mode, setMode] = useState("daily");
//   const [month, setMonth] = useState(today.month() + 1);
//   const [year, setYear] = useState(today.year());

//   // Initial data fetch
//   useEffect(() => {
//     fetchStats(empID);
//     fetchAllData(empID);
//   }, [empID]);

//   useEffect(() => {
//     fetchDailyStats(empID, today.format("YYYY-MM-DD")).then((d) => {
//       if (d?.department) fetchDeptCategories(d.department);
//     });
//   }, [empID]);

//   useEffect(() => {
//     if (mode === "daily") {
//       const dateStr = today.format("YYYY-MM-DD");
//       fetchActivityTrend(empID, dateStr);
//     }
//   }, [empID, mode]);

//   useEffect(() => {
//     fetchTopProductivityStats(empID, mode);
//   }, [empID, mode]);

//   useEffect(() => {
//     fetchMostUsedStats(empID, mode);
//   }, [empID, mode]);

//   useEffect(() => {
//     fetchStatsForSpecificDate(empID, selectedDate);
//   }, [selectedDate, empID]);

//   // Time period calculation
//   const period = useMemo(() => {
//     if (mode === "yesterday") {
//       return {
//         start: today.subtract(1, "day").startOf("day"),
//         end: today.subtract(1, "day").endOf("day"),
//       };
//     }
//     if (mode === "daily") {
//       return { start: today.startOf("day"), end: today.endOf("day") };
//     }
//     if (mode === "weekly") {
//       const end = today.endOf("day");
//       const start = today.subtract(6, "day").startOf("day");
//       return { start, end };
//     }
//     if (mode === "monthly") {
//       const start = dayjs(
//         `${year}-${String(month).padStart(2, "0")}-01`
//       ).startOf("month");
//       const end = start.endOf("month");
//       return { start, end };
//     }
//     const start = dayjs(`${year}-01-01`).startOf("year");
//     const end = start.endOf("year");
//     return { start, end };
//   }, [mode, month, year]);

//   const filteredStats = useMemo(() => {
//     return Array.isArray(stats)
//       ? stats.filter((s) => isSameISO(s.date, selectedDate))
//       : [];
//   }, [stats, selectedDate]);

//   const filteredAttendance = useMemo(() => {
//     return Array.isArray(attendanceData)
//       ? attendanceData.filter((a) => isSameISO(a.date, selectedDate))
//       : [];
//   }, [attendanceData, selectedDate]);

//   // Usage totals
//   const totalUsage = useMemo(() => {
//     return filteredStats.reduce(
//       (acc, cur) => ({
//         keyboardMinutes: acc.keyboardMinutes + cur.keyboardMinutes,
//         mouseMinutes: acc.mouseMinutes + cur.mouseMinutes,
//         keyboardPresses: acc.keyboardPresses + cur.keyboardPressCount,
//         mouseClicks: acc.mouseClicks + cur.mouseClickCount,
//       }),
//       {
//         keyboardMinutes: 0,
//         mouseMinutes: 0,
//         keyboardPresses: 0,
//         mouseClicks: 0,
//       }
//     );
//   }, [filteredStats]);

//   // Attendance totals
//   const attendanceTotals = useMemo(() => {
//     const SHIFT_START = "10:00:00";
//     const SHIFT_END = "19:00:00";

//     let totalWorkMinutes = 0;
//     let totalBreakMinutes = 0;

//     filteredAttendance.forEach((rec) => {
//       if (!rec.login) return;

//       const date = rec.date;
//       const shiftStart = dayjs(`${date} ${SHIFT_START}`, "YYYY-MM-DD HH:mm:ss");
//       const shiftEnd = dayjs(`${date} ${SHIFT_END}`, "YYYY-MM-DD HH:mm:ss");
//       const loginTime = dayjs(
//         `${date} ${convertTo24Hour(rec.login)}`,
//         "YYYY-MM-DD HH:mm:ss"
//       );

//       let logoutTime = null;
//       if (rec.logout && rec.logout !== rec.login) {
//         logoutTime = dayjs(
//           `${date} ${convertTo24Hour(rec.logout)}`,
//           "YYYY-MM-DD HH:mm:ss"
//         );
//       }

//       const now = dayjs();
//       let effectiveEndTime;

//       if (dayjs(date).isSame(now, "day")) {
//         if (now.isBefore(shiftEnd)) {
//           effectiveEndTime = now;
//         } else if (logoutTime && logoutTime.isAfter(shiftEnd)) {
//           effectiveEndTime = logoutTime;
//         } else {
//           effectiveEndTime = shiftEnd;
//         }
//       } else {
//         effectiveEndTime = logoutTime ? logoutTime : shiftEnd;
//       }

//       if (effectiveEndTime.isAfter(loginTime)) {
//         totalWorkMinutes += effectiveEndTime.diff(loginTime, "minute");
//       }

//       rec.breaks?.forEach((br) => {
//         if (br.start && br.end) {
//           let breakStart = dayjs(br.start);
//           let breakEnd = dayjs(br.end);

//           if (breakEnd.isBefore(shiftStart) || breakStart.isAfter(shiftEnd))
//             return;

//           breakStart = breakStart.isBefore(shiftStart)
//             ? shiftStart
//             : breakStart;

//           breakEnd = [breakEnd, effectiveEndTime, shiftEnd].reduce((min, cur) =>
//             cur.isBefore(min) ? cur : min
//           );

//           if (breakEnd.isAfter(breakStart)) {
//             totalBreakMinutes += breakEnd.diff(breakStart, "minute");
//           }
//         }
//       });
//     });

//     const netWorkMinutes = Math.max(totalWorkMinutes - totalBreakMinutes, 0);
//     const hours = Math.floor(netWorkMinutes / 60);
//     const minutes = netWorkMinutes % 60;

//     return {
//       totalWorkingHours:
//         netWorkMinutes > 0 ? `${hours} hrs ${minutes} mins` : "0 hrs 0 mins",
//       totalBreakTaken: totalBreakMinutes,
//     };
//   }, [filteredAttendance]);

//   useEffect(() => {
//     const date =
//       mode === "daily"
//         ? today.format("YYYY-MM-DD")
//         : mode === "monthly"
//         ? `${year}-${String(month).padStart(2, "0")}`
//         : mode === "yearly"
//         ? String(year)
//         : today.format("YYYY-MM-DD");

//     fetchInsights(empID, mode, date);
//   }, [empID, mode, month, year]);

//   useEffect(() => {
//     fetchFilteredStats(empID, selectedDate, selectedDate);
//   }, [selectedDate, empID]);

//   // Productivity calculations (daily only)
//   const showProductivity = mode === "daily";
//   const { productiveTime, unproductiveTime } = useMemo(() => {
//     if (!showProductivity || !dailyStats || !deptCategories) {
//       return { productiveTime: 0, unproductiveTime: 0 };
//     }
//     const prodSet = new Set(
//       deptCategories.productive.map((d) => d.name.toLowerCase())
//     );
//     const unprodSet = new Set(
//       deptCategories.unproductive.map((d) => d.name.toLowerCase())
//     );
//     let p = 0,
//       u = 0;
//     dailyStats.appsUsed.forEach(({ appName, minutesUsed }) => {
//       const n = appName.toLowerCase();
//       prodSet.has(n)
//         ? (p += minutesUsed)
//         : unprodSet.has(n) && (u += minutesUsed);
//     });
//     dailyStats.websitesVisited.forEach(({ url, minutesVisited }) => {
//       const n = url.toLowerCase();
//       prodSet.has(n)
//         ? (p += minutesVisited)
//         : unprodSet.has(n) && (u += minutesVisited);
//     });
//     return { productiveTime: p, unproductiveTime: u };
//   }, [dailyStats, deptCategories, showProductivity]);

//   // Doughnut chart config
//   const doughnutData = {
//     labels: ["Productive", "Unproductive"],
//     datasets: [
//       {
//         data: [productiveTime, unproductiveTime],
//         backgroundColor: ["#2563EB", "#F97316"],
//         hoverBackgroundColor: ["#1E40AF", "#EA580C"],
//         borderColor: "#FFF",
//         borderWidth: 4,
//       },
//     ],
//   };
//   const doughnutOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "bottom",
//         labels: {
//           boxWidth: 10,
//           padding: 15,
//           font: {
//             size: 14,
//           },
//           color: "#6B7280",
//         },
//       },
//     },
//   };

//   // Top used apps/websites
//   const top3Websites = useMemo(() => {
//     if (!mostUsedStats?.topWebsites) return [];
//     return [...mostUsedStats.topWebsites]
//       .sort((a, b) => b.minutesVisited - a.minutesVisited)
//       .slice(0, 3);
//   }, [mostUsedStats]);

//   const top3Apps = useMemo(() => {
//     if (!mostUsedStats?.topApps) return [];
//     return [...mostUsedStats.topApps]
//       .sort((a, b) => b.minutesUsed - a.minutesUsed)
//       .slice(0, 3);
//   }, [mostUsedStats]);

//   // Loading and error states
//   if (usageLoading || attendanceLoading)
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
//         <div className="flex flex-col items-center">
//           <div className="relative">
//             <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-500"></div>
//             <div className="absolute inset-0 animate-pulse rounded-full h-20 w-20 border-t-4 border-b-4 border-purple-300 opacity-25"></div>
//           </div>
//           <div className="mt-6 text-center">
//             <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
//               Loading Statistics
//             </p>
//             <p className="mt-2 text-gray-600 dark:text-gray-400">
//               Fetching employee analytics data...
//             </p>
//           </div>
//         </div>
//       </div>
//     );

//   if (usageError || attendanceError)
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
//         <div className="max-w-md w-full text-center">
//           <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 text-red-500 mb-6">
//             <FiInfo className="w-12 h-12" />
//           </div>
//           <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
//             Unable to Load Data
//           </h3>
//           <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
//             {usageError || attendanceError}
//           </p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );

//   // Enhanced Sub-components
//   const OverallInsightCard = ({ color, icon, label, value, gradient }) => {
//     return (
//       <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} p-6 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300`}>
//         <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -mr-16 -mt-16"></div>
//         <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5 -ml-12 -mb-12"></div>
//         <div className="relative z-10">
//           <div className="flex items-start justify-between mb-4">
//             <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
//               {icon}
//             </div>
//             <div className="w-2 h-2 rounded-full bg-white/40 animate-pulse"></div>
//           </div>
//           <h3 className="text-sm font-medium text-white/80 mb-2">{label}</h3>
//           <p className="text-2xl font-bold text-white leading-tight">{value}</p>
//         </div>
//       </div>
//     );
//   };

//   const StatsTableCard = ({ title, icon, data = [], isWebsite = false }) => {
//     return (
//       <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
//         <div className="flex items-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700 px-6 py-5">
//           <div className="mr-4 text-white bg-white/20 p-3 rounded-xl backdrop-blur-sm">
//             {icon}
//           </div>
//           <h3 className="text-white text-lg font-semibold">{title}</h3>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600">
//                 <th className="py-4 px-6 text-center font-semibold text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-600">
//                   Rank
//                 </th>
//                 <th className="py-4 px-6 text-left font-semibold text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-600">
//                   {isWebsite ? "Website" : "Application"}
//                 </th>
//                 <th className="py-4 px-6 text-center font-semibold text-gray-700 dark:text-gray-300">
//                   Time (Minutes)
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.length ? (
//                 data.slice(0, 5).map((row, i) => (
//                   <tr
//                     key={i}
//                     className="border-b border-gray-100 dark:border-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 transition-all duration-200"
//                   >
//                     <td className="py-4 px-6 text-center border-r border-gray-100 dark:border-gray-700">
//                       <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-white ${
//                         i === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
//                         i === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
//                         i === 2 ? 'bg-gradient-to-r from-orange-400 to-red-500' :
//                         'bg-gradient-to-r from-indigo-400 to-purple-500'
//                       }`}>
//                         {i + 1}
//                       </div>
//                     </td>
//                     <td className="py-4 px-6 text-gray-900 dark:text-white border-r border-gray-100 dark:border-gray-700">
//                       <div className="flex items-center">
//                         <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 p-2 mr-3 flex items-center justify-center">
//                           <img
//                             src={
//                               isWebsite
//                                 ? getFavicon(row.url)
//                                 : getAppIcon(row.appName)
//                             }
//                             alt=""
//                             className="w-6 h-6 rounded"
//                           />
//                         </div>
//                         <span className="truncate max-w-[180px] font-medium">
//                           {isWebsite ? row.url : row.appName}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="py-4 px-6 text-center">
//                       <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 font-semibold">
//                         {row.minutesVisited || row.minutesUsed || 0}
//                         <span className="ml-1 text-xs opacity-70">min</span>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="3"
//                     className="py-12 text-center text-gray-500 dark:text-gray-400"
//                   >
//                     <div className="flex flex-col items-center">
//                       <FiInfo className="w-12 h-12 text-gray-300 mb-4" />
//                       <p className="text-lg font-medium">No data available</p>
//                       <p className="text-sm">Check back later for updates</p>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     );
//   };

//   const ProductivityBarGraph = ({ data }) => {
//     const productivityMap = {
//       less: 1,
//       avg: 2,
//       top: 3,
//     };

//     const productivityColor = {
//       less: "#FF6B6B",
//       avg: "#4ECDC4",
//       top: "#45B7D1",
//     };

//     const formattedData = data.map((app) => ({
//       name: app.appName,
//       productivityLevel: app.productivityLevel,
//       productivityValue: productivityMap[app.productivityLevel] || 0,
//     }));

//     return (
//       <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
//         <div className="flex items-center mb-8">
//           <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white mr-4">
//             <FiTarget className="w-6 h-6" />
//           </div>
//           <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
//             Productivity Analysis
//           </h3>
//         </div>

//         <ResponsiveContainer
//           width="100%"
//           height={formattedData.length * 60 + 80}
//         >
//           <BarChart layout="vertical" data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
//             <XAxis type="number" hide domain={[0, 3]} />
//             <YAxis
//               type="category"
//               dataKey="name"
//               tick={{ fontSize: 14, fontWeight: 500 }}
//               width={180}
//             />
//             <RechartsTooltip
//               formatter={(value, name, props) =>
//                 props?.payload?.productivityLevel
//                   ? props.payload.productivityLevel.toUpperCase()
//                   : "N/A"
//               }
//               contentStyle={{
//                 backgroundColor: 'rgba(255, 255, 255, 0.95)',
//                 border: 'none',
//                 borderRadius: '12px',
//                 boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
//               }}
//             />

//             <Bar
//               dataKey="productivityValue"
//               barSize={35}
//               radius={[0, 15, 15, 0]}
//             >
//               {formattedData.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={productivityColor[entry.productivityLevel]}
//                 />
//               ))}
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>

//         <div className="flex justify-center gap-8 mt-8 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl">
//           <div className="flex items-center">
//             <div className="w-4 h-4 rounded-full mr-3 bg-[#45B7D1]"></div>
//             <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">High Performance</span>
//           </div>
//           <div className="flex items-center">
//             <div className="w-4 h-4 rounded-full mr-3 bg-[#4ECDC4]"></div>
//             <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Average</span>
//           </div>
//           <div className="flex items-center">
//             <div className="w-4 h-4 rounded-full mr-3 bg-[#FF6B6B]"></div>
//             <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Needs Improvement</span>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const MetricCard = ({ color, icon, label, value }) => {
//     const colorClasses = {
//       green: {
//         bg: "bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/30",
//         border: "border-l-emerald-500",
//         iconBg: "bg-gradient-to-br from-emerald-500 to-green-600 text-white",
//       },
//       yellow: {
//         bg: "bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-900/20 dark:to-yellow-900/30",
//         border: "border-l-amber-500",
//         iconBg: "bg-gradient-to-br from-amber-500 to-yellow-600 text-white",
//       },
//     };

//     return (
//       <div
//         className={`p-6 rounded-3xl shadow-lg ${colorClasses[color].bg} ${colorClasses[color].border} border-l-4 flex items-start hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
//       >
//         <div className={`mr-4 p-4 rounded-2xl ${colorClasses[color].iconBg}`}>
//           {icon}
//         </div>
//         <div>
//           <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2 uppercase tracking-wide">
//             {label}
//           </h3>
//           <p className="text-2xl font-bold text-gray-900 dark:text-white">
//             {value}
//           </p>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
//       {/* Hero Header Section */}
//       <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800">
//         <div className="absolute inset-0 bg-black/10"></div>
//         <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -mr-48 -mt-48"></div>
//         <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/10 -ml-32 -mb-32"></div>
        
//         <div className="relative z-10 p-6 sm:p-8">
//           <div className="max-w-7xl mx-auto">
//             <div className="flex items-center mb-6">
//               <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl mr-4">
//                 <FiUser className="w-8 h-8 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
//                   Employee Analytics Dashboard
//                 </h1>
//                 <div className="flex items-center text-white/80">
//                   <div className="bg-white/20 backdrop-blur-sm w-10 h-10 rounded-full mr-3 flex items-center justify-center text-sm font-bold text-white">
//                     {empID.slice(0, 2).toUpperCase()}
//                   </div>
//                   <span className="text-lg">Employee ID: #{empID}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Overall Insights Section */}
//             {insights && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
//                 <OverallInsightCard
//                   color="indigo"
//                   icon={<FiClock className="w-6 h-6" />}
//                   label="Average Break Per Day"
//                   value={insights.averageBreakTime || "0 mins"}
//                   gradient="from-indigo-500 to-blue-600"
//                 />
//                 <OverallInsightCard
//                   color="teal"
//                   icon={<FiZap className="w-6 h-6" />}
//                   label="Longest Break Taken"
//                   value={insights.longestBreak || "0 mins"}
//                   gradient="from-teal-500 to-cyan-600"
//                 />
//                 <OverallInsightCard
//                   color="cyan"
//                   icon={<FiCalendar className="w-6 h-6" />}
//                   label="Peak Break Times"
//                   value={insights.mostFrequentBreakTimes?.join(", ") || "N/A"}
//                   gradient="from-cyan-500 to-blue-600"
//                 />
//                 <OverallInsightCard
//                   color="amber"
//                   icon={<FiTrendingUp className="w-6 h-6" />}
//                   label="Average Work Hours"
//                   value={insights.averageWorkingHours || "0 hrs"}
//                   gradient="from-purple-500 to-pink-600"
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto p-6 sm:p-8 space-y-8">
//         {/* Date Filter Controls */}
//         <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
//           <div className="flex items-center mb-6">
//             <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white mr-4">
//               <FiCalendar className="w-6 h-6" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
//               Date-Specific Analysis
//             </h2>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
//                 Select Date
//               </label>
//               <input
//                 type="date"
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//                 className="w-full rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white px-6 py-4 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-lg font-medium"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Daily Metrics for Selected Date */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <MetricCard
//             color="green"
//             icon={<FiClock className="w-6 h-6" />}
//             label="Working Hours Today"
//             value={attendanceTotals.totalWorkingHours}
//           />
//           <MetricCard
//             color="yellow"
//             icon={<FiCoffee className="w-6 h-6" />}
//             label="Break Time Today"
//             value={`${attendanceTotals.totalBreakTaken} mins`}
//           />
//         </div>

//         {/* Charts Section */}
//         <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
//           {/* Productivity Chart */}
//           {showProductivity && (
//             <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
//               <div className="flex items-center mb-8">
//                 <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white mr-4">
//                   <FiActivity className="w-6 h-6" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
//                   Today's Productivity Score
//                 </h3>
//               </div>
//               <div className="flex flex-col items-center">
//                 <div className="w-full max-w-sm mb-6">
//                   <Doughnut data={doughnutData} options={doughnutOptions} />
//                 </div>
//                 <div className="text-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 w-full">
//                   <div className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white mb-4">
//                     <FiAward className="w-5 h-5 mr-2" />
//                     <span className="text-2xl font-bold">
//                       {(
//                         (productiveTime / (productiveTime + unproductiveTime)) *
//                         100
//                       ).toFixed(0)}%
//                     </span>
//                     <span className="ml-2 text-lg">Productive</span>
//                   </div>
//                   <div className="grid grid-cols-2 gap-4 text-sm">
//                     <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl">
//                       <div className="flex items-center justify-center mb-1">
//                         <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
//                         <span className="font-semibold text-blue-700 dark:text-blue-300">Productive</span>
//                       </div>
//                       <span className="text-lg font-bold text-blue-800 dark:text-blue-200">{productiveTime} min</span>
//                     </div>
//                     <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-xl">
//                       <div className="flex items-center justify-center mb-1">
//                         <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
//                         <span className="font-semibold text-orange-700 dark:text-orange-300">Other</span>
//                       </div>
//                       <span className="text-lg font-bold text-orange-800 dark:text-orange-200">{unproductiveTime} min</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Activity Timeline */}
//           {mode === "daily" && (
//             <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
//               <div className="flex items-center mb-8">
//                 <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white mr-4">
//                   <FiTrendingUp className="w-6 h-6" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
//                   Activity Timeline
//                 </h3>
//               </div>
//               <ActivityTrendChart
//                 employeeId={empID}
//                 date={today.format("YYYY-MM-DD")}
//               />
//             </div>
//           )}
//         </div>

//         {/* Usage Statistics Table */}
//         <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
//           <div className="px-8 py-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700">
//             <div className="flex items-center">
//               <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl mr-4">
//                 <FiCpu className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold text-white">Usage Statistics</h2>
//                 <p className="text-white/80 text-lg mt-1">
//                   Activity data for {dayjs(selectedDate).format("DD MMMM YYYY")}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600">
//                 <tr>
//                   <th className="py-4 px-6 text-left font-semibold text-gray-700 dark:text-gray-300">
//                     Date
//                   </th>
//                   <th className="py-4 px-6 text-center font-semibold text-gray-700 dark:text-gray-300">
//                     <div className="flex items-center justify-center">
//                       <FiType className="mr-2" /> Keyboard (min)
//                     </div>
//                   </th>
//                   <th className="py-4 px-6 text-center font-semibold text-gray-700 dark:text-gray-300">
//                     <div className="flex items-center justify-center">
//                       <FiMousePointer className="mr-2" /> Mouse (min)
//                     </div>
//                   </th>
//                   <th className="py-4 px-6 text-center font-semibold text-gray-700 dark:text-gray-300">
//                     Key Presses
//                   </th>
//                   <th className="py-4 px-6 text-center font-semibold text-gray-700 dark:text-gray-300">
//                     Mouse Clicks
//                   </th>
//                   <th className="py-4 px-6 text-center font-semibold text-gray-700 dark:text-gray-300">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
//                 {filteredStats.map((stat) => (
//                   <tr
//                     key={stat._id}
//                     className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 transition-all duration-200"
//                   >
//                     <td className="py-4 px-6 text-gray-900 dark:text-white font-semibold">
//                       {dayjs(stat.date).format("DD MMM YYYY")}
//                     </td>
//                     <td className="py-4 px-6 text-center">
//                       <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-700 dark:text-blue-300 font-semibold">
//                         {stat.keyboardMinutes}
//                       </div>
//                     </td>
//                     <td className="py-4 px-6 text-center">
//                       <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-700 dark:text-purple-300 font-semibold">
//                         {stat.mouseMinutes}
//                       </div>
//                     </td>
//                     <td className="py-4 px-6 text-center text-gray-700 dark:text-gray-300 font-bold">
//                       {stat.keyboardPressCount.toLocaleString()}
//                     </td>
//                     <td className="py-4 px-6 text-center text-gray-700 dark:text-gray-300 font-bold">
//                       {stat.mouseClickCount.toLocaleString()}
//                     </td>
//                     <td className="py-4 px-6 text-center">
//                       <button
//                         onClick={() =>
//                           navigate(`/dashboard/statistics/${empID}/${stat.date}`)
//                         }
//                         className="px-6 py-2 text-sm bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
//                       >
//                         View Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//                 {!filteredStats.length && (
//                   <tr>
//                     <td
//                       colSpan={6}
//                       className="py-12 text-center text-gray-500 dark:text-gray-400"
//                     >
//                       <div className="flex flex-col items-center">
//                         <FiInfo className="w-12 h-12 text-gray-300 mb-4" />
//                         <p className="text-xl font-semibold mb-2">No Data Available</p>
//                         <p className="text-gray-400">No usage statistics found for the selected date</p>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Productivity Insights Section */}
//         <div className="space-y-8">
//           <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-700 dark:via-teal-700 dark:to-cyan-700 rounded-t-3xl px-8 py-6">
//             <div className="flex items-center">
//               <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl mr-4">
//                 <FiTarget className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold text-white">Productivity Insights</h2>
//                 <p className="text-white/80 text-lg mt-1">
//                   Detailed analysis for {mode.charAt(0).toUpperCase() + mode.slice(1)} period
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-b-3xl shadow-xl border-l border-r border-b border-gray-100 dark:border-gray-700">
//             {prodStatsLoading ? (
//               <div className="flex justify-center py-16">
//                 <div className="flex flex-col items-center">
//                   <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-emerald-500"></div>
//                   <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading insights...</p>
//                 </div>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
//                 <StatsTableCard
//                   title="Top Performing Applications"
//                   icon={<FiAward className="w-5 h-5" />}
//                   data={topProductivityStats?.topApps || []}
//                 />
//                 <StatsTableCard
//                   title="Applications Needing Focus"
//                   icon={<FiTarget className="w-5 h-5" />}
//                   data={topProductivityStats?.leastApps || []}
//                 />
//                 <StatsTableCard
//                   title="Most Visited Websites"
//                   icon={<FiGlobe className="w-5 h-5" />}
//                   data={top3Websites}
//                   isWebsite
//                 />
//                 <StatsTableCard
//                   title="Frequently Used Apps"
//                   icon={<FiMonitor className="w-5 h-5" />}
//                   data={top3Apps}
//                 />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Productivity Bar Graph */}
//         {topProductivityStats && topProductivityStats.topApps && (
//           <ProductivityBarGraph data={topProductivityStats.topApps} />
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import dayjs from "dayjs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import useUsageStatsStore from "../../store/useUsageStore";
import useFullAttendanceStore from "../../store/useFullAttendanceStore";
import ActivityTrendChart from "./ActivityTrendChart";
import {
  FiClock,
  FiCoffee,
  FiCalendar,
  FiTrendingUp,
  FiActivity,
  FiMonitor,
  FiGlobe,
  FiMousePointer,
  FiType,
  FiInfo,
  FiBarChart2,
  FiUser,
  FiTarget,
  FiAward,
  FiZap,
  FiCpu,
} from "react-icons/fi";

ChartJS.register(ArcElement, Tooltip, Legend);

// ────────────────────────────────────────────────────────────────────────────
//  Utilities
// ────────────────────────────────────────────────────────────────────────────
const isSameISO = (d1, d2) =>
  dayjs(d1).format("YYYY-MM-DD") === dayjs(d2).format("YYYY-MM-DD");

const isBetween = (date, start, end) =>
  dayjs(date).isAfter(dayjs(start).subtract(1, "day")) &&
  dayjs(date).isBefore(dayjs(end).add(1, "day"));

function convertTo24Hour(timeStr) {
  if (!timeStr) return timeStr;
  const [time, ampm] = timeStr.split(" ");
  if (!ampm) return timeStr;
  let [h, m, s] = time.split(":").map(Number);
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(
    s
  ).padStart(2, "0")}`;
}

// App icon mapping
const appIconMap = {
  "google chrome": "https://img.icons8.com/color/48/chrome--v1.png",
  slack: "https://img.icons8.com/color/48/slack-new-logo.png",
  excel: "https://img.icons8.com/color/48/microsoft-excel-2019--v1.png",
  word: "https://img.icons8.com/color/48/ms-word.png",
  anydesk: "https://img.icons8.com/color/48/anydesk.png",
  calculator: "https://img.icons8.com/color/48/calculator.png",
  "docker desktop": "https://img.icons8.com/color/48/docker.png",
  electron: "https://img.icons8.com/color/48/electron.png",
  "lockapp.exe": "https://img.icons8.com/color/48/lock-2.png",
  "microsoft 365 copilot app":
    "https://img.icons8.com/color/48/microsoft-365.png",
  "microsoft copilot": "https://img.icons8.com/color/48/microsoft-365.png",
  "microsoft edge": "https://img.icons8.com/color/48/ms-edge-new.png",
  mongodbcompass: "https://img.icons8.com/color/48/mongodb.png",
  notepad: "https://img.icons8.com/color/48/notepad.png",
  "photos.exe": "https://img.icons8.com/color/48/windows-photos.png",
  postman: "https://img.icons8.com/color/48/postman-api.png",
  "python 3.13.3 (64-bit)": "https://img.icons8.com/color/48/python.png",
  "screenclippinghost.exe": "https://img.icons8.com/color/48/screenshot.png",
  "search application": "https://img.icons8.com/color/48/search--v1.png",
  settings: "https://img.icons8.com/color/48/settings--v1.png",
  "setup/uninstall": "https://img.icons8.com/color/48/uninstalling-updates.png",
  "ssh, telnet, rlogin, and supdup client":
    "https://img.icons8.com/color/48/console.png",
  "task manager": "https://img.icons8.com/color/48/task-manager.png",
  "tcp/ip ping command": "https://img.icons8.com/color/48/console.png",
  "visual studio code":
    "https://img.icons8.com/color/48/visual-studio-code-2019.png",
  "whatsapp.exe": "https://img.icons8.com/color/48/whatsapp--v1.png",
  "windows command processor":
    "https://img.icons8.com/color/48/command-line.png",
  "windows explorer": "https://img.icons8.com/color/48/windows-explorer.png",
  "windows shell experience host":
    "https://img.icons8.com/color/48/windows-10.png",
  "windows® installer": "https://img.icons8.com/color/48/windows-installer.png",
  "winscp: sftp, ftp, webdav, s3 and scp client":
    "https://img.icons8.com/color/48/ftp.png",
  "wps office": "https://img.icons8.com/color/48/wps-office.png",
  "wps spreadsheets": "https://img.icons8.com/color/48/wps-office.png",
  "x-lite.exe": "https://img.icons8.com/color/48/phone-office.png",
  "a desktop app for humanmaximizer":
    "https://img.icons8.com/color/48/monitor--v1.png",
};

const getFavicon = (url) =>
  `https://www.google.com/s2/favicons?domain=${url}&sz=64`;

const getAppIcon = (appName) => {
  const key = appName.toLowerCase();
  return (
    appIconMap[key] ||
    "https://img.icons8.com/fluency-systems-regular/48/application-window.png"
  );
};

// ────────────────────────────────────────────────────────────────────────────
//  Main component
// ────────────────────────────────────────────────────────────────────────────
export default function EmployeeStatistics() {
  const { empID } = useParams();
  const navigate = useNavigate();
  const today = dayjs();
  const [selectedDate, setSelectedDate] = useState(today.format("YYYY-MM-DD"));

  // Stores
  const {
    stats,
    dailyStats,
    deptCategories,
    fetchStats,
    fetchDailyStats,
    fetchDeptCategories,
    fetchTopProductivityStats,
    topProductivityStats,
    loading: prodStatsLoading,
    fetchMostUsedStats,
    mostUsedStats,
    loading: usageLoading,
    error: usageError,
    fetchActivityTrend,
    fetchStatsForSpecificDate,
    fetchFilteredStats
  } = useUsageStatsStore();

  const attendanceData = useFullAttendanceStore(
    (state) => state.attendanceData
  );
  const fetchAllData = useFullAttendanceStore((state) => state.fetchAllData);
  const fetchInsights = useFullAttendanceStore((state) => state.fetchInsights);
  const insights = useFullAttendanceStore((state) => state.insights);
  const attendanceLoading = useFullAttendanceStore((state) => state.isLoading);
  const attendanceError = useFullAttendanceStore((state) => state.error);

  // State
  const [mode, setMode] = useState("daily");
  const [month, setMonth] = useState(today.month() + 1);
  const [year, setYear] = useState(today.year());

  // Initial data fetch
  useEffect(() => {
    fetchStats(empID);
    fetchAllData(empID);
  }, [empID]);

  useEffect(() => {
    fetchDailyStats(empID, today.format("YYYY-MM-DD")).then((d) => {
      if (d?.department) fetchDeptCategories(d.department);
    });
  }, [empID]);

  useEffect(() => {
    if (mode === "daily") {
      const dateStr = today.format("YYYY-MM-DD");
      fetchActivityTrend(empID, dateStr);
    }
  }, [empID, mode]);

  useEffect(() => {
    fetchTopProductivityStats(empID, selectedDate);
  }, [empID, selectedDate]);

  useEffect(() => {
    fetchMostUsedStats(empID, selectedDate);
  }, [empID, selectedDate]);

  useEffect(() => {
    fetchStatsForSpecificDate(empID, selectedDate);
  }, [selectedDate, empID]);

  // Time period calculation
  const period = useMemo(() => {
    if (mode === "yesterday") {
      return {
        start: today.subtract(1, "day").startOf("day"),
        end: today.subtract(1, "day").endOf("day"),
      };
    }
    if (mode === "daily") {
      return { start: today.startOf("day"), end: today.endOf("day") };
    }
    if (mode === "weekly") {
      const end = today.endOf("day");
      const start = today.subtract(6, "day").startOf("day");
      return { start, end };
    }
    if (mode === "monthly") {
      const start = dayjs(
        `${year}-${String(month).padStart(2, "0")}-01`
      ).startOf("month");
      const end = start.endOf("month");
      return { start, end };
    }
    const start = dayjs(`${year}-01-01`).startOf("year");
    const end = start.endOf("year");
    return { start, end };
  }, [mode, month, year]);

  const filteredStats = useMemo(() => {
    return Array.isArray(stats)
      ? stats.filter((s) => isSameISO(s.date, selectedDate))
      : [];
  }, [stats, selectedDate]);

  const filteredAttendance = useMemo(() => {
    return Array.isArray(attendanceData)
      ? attendanceData.filter((a) => isSameISO(a.date, selectedDate))
      : [];
  }, [attendanceData, selectedDate]);

  // Usage totals
  const totalUsage = useMemo(() => {
    return filteredStats.reduce(
      (acc, cur) => ({
        keyboardMinutes: acc.keyboardMinutes + cur.keyboardMinutes,
        mouseMinutes: acc.mouseMinutes + cur.mouseMinutes,
        keyboardPresses: acc.keyboardPresses + cur.keyboardPressCount,
        mouseClicks: acc.mouseClicks + cur.mouseClickCount,
      }),
      {
        keyboardMinutes: 0,
        mouseMinutes: 0,
        keyboardPresses: 0,
        mouseClicks: 0,
      }
    );
  }, [filteredStats]);

  // Attendance totals
  const attendanceTotals = useMemo(() => {
    const SHIFT_START = "10:00:00";
    const SHIFT_END = "19:00:00";

    let totalWorkMinutes = 0;
    let totalBreakMinutes = 0;

    filteredAttendance.forEach((rec) => {
      if (!rec.login) return;

      const date = rec.date;
      const shiftStart = dayjs(`${date} ${SHIFT_START}`, "YYYY-MM-DD HH:mm:ss");
      const shiftEnd = dayjs(`${date} ${SHIFT_END}`, "YYYY-MM-DD HH:mm:ss");
      const loginTime = dayjs(
        `${date} ${convertTo24Hour(rec.login)}`,
        "YYYY-MM-DD HH:mm:ss"
      );

      let logoutTime = null;
      if (rec.logout && rec.logout !== rec.login) {
        logoutTime = dayjs(
          `${date} ${convertTo24Hour(rec.logout)}`,
          "YYYY-MM-DD HH:mm:ss"
        );
      }

      const now = dayjs();
      let effectiveEndTime;

      if (dayjs(date).isSame(now, "day")) {
        if (now.isBefore(shiftEnd)) {
          effectiveEndTime = now;
        } else if (logoutTime && logoutTime.isAfter(shiftEnd)) {
          effectiveEndTime = logoutTime;
        } else {
          effectiveEndTime = shiftEnd;
        }
      } else {
        effectiveEndTime = logoutTime ? logoutTime : shiftEnd;
      }

      if (effectiveEndTime.isAfter(loginTime)) {
        totalWorkMinutes += effectiveEndTime.diff(loginTime, "minute");
      }

      rec.breaks?.forEach((br) => {
        if (br.start && br.end) {
          let breakStart = dayjs(br.start);
          let breakEnd = dayjs(br.end);

          if (breakEnd.isBefore(shiftStart) || breakStart.isAfter(shiftEnd))
            return;

          breakStart = breakStart.isBefore(shiftStart)
            ? shiftStart
            : breakStart;

          breakEnd = [breakEnd, effectiveEndTime, shiftEnd].reduce((min, cur) =>
            cur.isBefore(min) ? cur : min
          );

          if (breakEnd.isAfter(breakStart)) {
            totalBreakMinutes += breakEnd.diff(breakStart, "minute");
          }
        }
      });
    });

    const netWorkMinutes = Math.max(totalWorkMinutes - totalBreakMinutes, 0);
    const hours = Math.floor(netWorkMinutes / 60);
    const minutes = netWorkMinutes % 60;

    return {
      totalWorkingHours:
        netWorkMinutes > 0 ? `${hours} hrs ${minutes} mins` : "0 hrs 0 mins",
      totalBreakTaken: totalBreakMinutes,
    };
  }, [filteredAttendance]);

  useEffect(() => {
    const date =
      mode === "daily"
        ? today.format("YYYY-MM-DD")
        : mode === "monthly"
        ? `${year}-${String(month).padStart(2, "0")}`
        : mode === "yearly"
        ? String(year)
        : today.format("YYYY-MM-DD");

    fetchInsights(empID, mode, date);
  }, [empID, mode, month, year]);

  useEffect(() => {
    fetchFilteredStats(empID, selectedDate, selectedDate);
  }, [selectedDate, empID]);

  // Productivity calculations (daily only)
  const showProductivity = mode === "daily";
  const { productiveTime, unproductiveTime } = useMemo(() => {
    if (!showProductivity || !dailyStats || !deptCategories) {
      return { productiveTime: 0, unproductiveTime: 0 };
    }
    const prodSet = new Set(
      deptCategories.productive.map((d) => d.name.toLowerCase())
    );
    const unprodSet = new Set(
      deptCategories.unproductive.map((d) => d.name.toLowerCase())
    );
    let p = 0,
      u = 0;
    dailyStats.appsUsed.forEach(({ appName, minutesUsed }) => {
      const n = appName.toLowerCase();
      prodSet.has(n)
        ? (p += minutesUsed)
        : unprodSet.has(n) && (u += minutesUsed);
    });
    dailyStats.websitesVisited.forEach(({ url, minutesVisited }) => {
      const n = url.toLowerCase();
      prodSet.has(n)
        ? (p += minutesVisited)
        : unprodSet.has(n) && (u += minutesVisited);
    });
    return { productiveTime: p, unproductiveTime: u };
  }, [dailyStats, deptCategories, showProductivity]);

  // Doughnut chart config
  const doughnutData = {
    labels: ["Productive", "Unproductive"],
    datasets: [
      {
        data: [productiveTime, unproductiveTime],
        backgroundColor: ["#2563EB", "#F97316"],
        hoverBackgroundColor: ["#1E40AF", "#EA580C"],
        borderColor: "#FFF",
        borderWidth: 4,
      },
    ],
  };
  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 10,
          padding: 15,
          font: {
            size: 14,
          },
          color: "#6B7280",
        },
      },
    },
  };

  // Top used apps/websites
  const top3Websites = useMemo(() => {
    if (!mostUsedStats?.topWebsites) return [];
    return [...mostUsedStats.topWebsites]
      .sort((a, b) => b.minutesVisited - a.minutesVisited)
      .slice(0, 3);
  }, [mostUsedStats]);

  const top3Apps = useMemo(() => {
    if (!mostUsedStats?.topApps) return [];
    return [...mostUsedStats.topApps]
      .sort((a, b) => b.minutesUsed - a.minutesUsed)
      .slice(0, 3);
  }, [mostUsedStats]);

  // Loading and error states
  if (usageLoading || attendanceLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-500"></div>
            <div className="absolute inset-0 animate-pulse rounded-full h-20 w-20 border-t-4 border-b-4 border-purple-300 opacity-25"></div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Loading Statistics
            </p>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Fetching employee analytics data...
            </p>
          </div>
        </div>
      </div>
    );

  if (usageError || attendanceError)
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 text-red-500 mb-6">
            <FiInfo className="w-12 h-12" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Unable to Load Data
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            {usageError || attendanceError}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  // Enhanced Sub-components
  const OverallInsightCard = ({ color, icon, label, value, gradient }) => {
    return (
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} p-6 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300`}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5 -ml-12 -mb-12"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
              {icon}
            </div>
            <div className="w-2 h-2 rounded-full bg-white/40 animate-pulse"></div>
          </div>
          <h3 className="text-sm font-medium text-white/80 mb-2">{label}</h3>
          <p className="text-2xl font-bold text-white leading-tight">{value}</p>
        </div>
      </div>
    );
  };

  const StatsTableCard = ({ title, icon, data = [], isWebsite = false }) => {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700 px-6 py-5">
          <div className="mr-4 text-white bg-white/20 p-3 rounded-xl backdrop-blur-sm">
            {icon}
          </div>
          <h3 className="text-white text-lg font-semibold">{title}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600">
                <th className="py-4 px-6 text-center font-semibold text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-600">
                  Rank
                </th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-600">
                  {isWebsite ? "Website" : "Application"}
                </th>
                <th className="py-4 px-6 text-center font-semibold text-gray-700 dark:text-gray-300">
                  Time (Minutes)
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length ? (
                data.slice(0, 5).map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 transition-all duration-200"
                  >
                    <td className="py-4 px-6 text-center border-r border-gray-100 dark:border-gray-700">
                      <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-white ${
                        i === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                        i === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                        i === 2 ? 'bg-gradient-to-r from-orange-400 to-red-500' :
                        'bg-gradient-to-r from-indigo-400 to-purple-500'
                      }`}>
                        {i + 1}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white border-r border-gray-100 dark:border-gray-700">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 p-2 mr-3 flex items-center justify-center">
                          <img
                            src={
                              isWebsite
                                ? getFavicon(row.url)
                                : getAppIcon(row.appName)
                            }
                            alt=""
                            className="w-6 h-6 rounded"
                          />
                        </div>
                        <span className="truncate max-w-[180px] font-medium">
                          {isWebsite ? row.url : row.appName}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 font-semibold">
                        {row.minutesVisited || row.minutesUsed || 0}
                        <span className="ml-1 text-xs opacity-70">min</span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="py-12 text-center text-gray-500 dark:text-gray-400"
                  >
                    <div className="flex flex-col items-center">
                      <FiInfo className="w-12 h-12 text-gray-300 mb-4" />
                      <p className="text-lg font-medium">No data available</p>
                      <p className="text-sm">Check back later for updates</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const ProductivityBarGraph = ({ data }) => {
    const productivityMap = {
      less: 1,
      avg: 2,
      top: 3,
    };

    const productivityColor = {
      less: "#FF6B6B",
      avg: "#4ECDC4",
      top: "#45B7D1",
    };

    const formattedData = data.map((app) => ({
      name: app.appName,
      productivityLevel: app.productivityLevel,
      productivityValue: productivityMap[app.productivityLevel] || 0,
    }));

    return (
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center mb-8">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white mr-4">
            <FiTarget className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            Productivity Analysis
          </h3>
        </div>

        <ResponsiveContainer
          width="100%"
          height={formattedData.length * 60 + 80}
        >
          <BarChart layout="vertical" data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <XAxis type="number" hide domain={[0, 3]} />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 14, fontWeight: 500 }}
              width={180}
            />
            <RechartsTooltip
              formatter={(value, name, props) =>
                props?.payload?.productivityLevel
                  ? props.payload.productivityLevel.toUpperCase()
                  : "N/A"
              }
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              }}
            />

            <Bar
              dataKey="productivityValue"
              barSize={35}
              radius={[0, 15, 15, 0]}
            >
              {formattedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={productivityColor[entry.productivityLevel]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="flex justify-center gap-8 mt-8 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full mr-3 bg-[#45B7D1]"></div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">High Performance</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full mr-3 bg-[#4ECDC4]"></div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Average</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full mr-3 bg-[#FF6B6B]"></div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Needs Improvement</span>
          </div>
        </div>
      </div>
    );
  };

  const MetricCard = ({ color, icon, label, value }) => {
    const colorClasses = {
      green: {
        bg: "bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/30",
        border: "border-l-emerald-500",
        iconBg: "bg-gradient-to-br from-emerald-500 to-green-600 text-white",
      },
      yellow: {
        bg: "bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-900/20 dark:to-yellow-900/30",
        border: "border-l-amber-500",
        iconBg: "bg-gradient-to-br from-amber-500 to-yellow-600 text-white",
      },
    };

    return (
      <div
        className={`p-6 rounded-3xl shadow-lg ${colorClasses[color].bg} ${colorClasses[color].border} border-l-4 flex items-start hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
      >
        <div className={`mr-4 p-4 rounded-2xl ${colorClasses[color].iconBg}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2 uppercase tracking-wide">
            {label}
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/10 -ml-32 -mb-32"></div>
        
        <div className="relative z-10 p-6 sm:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl mr-4">
                <FiUser className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  Employee Analytics Dashboard
                </h1>
                <div className="flex items-center text-white/80">
                  <div className="bg-white/20 backdrop-blur-sm w-10 h-10 rounded-full mr-3 flex items-center justify-center text-sm font-bold text-white">
                    {empID.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-lg">Employee ID: #{empID}</span>
                </div>
              </div>
            </div>

            {/* Overall Insights Section */}
            {insights && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                <OverallInsightCard
                  color="indigo"
                  icon={<FiClock className="w-6 h-6" />}
                  label="Average Break Per Day"
                  value={insights.averageBreakTime || "0 mins"}
                  gradient="from-indigo-500 to-blue-600"
                />
                <OverallInsightCard
                  color="teal"
                  icon={<FiZap className="w-6 h-6" />}
                  label="Longest Break Taken"
                  value={insights.longestBreak || "0 mins"}
                  gradient="from-teal-500 to-cyan-600"
                />
                <OverallInsightCard
                  color="cyan"
                  icon={<FiCalendar className="w-6 h-6" />}
                  label="Peak Break Times"
                  value={insights.mostFrequentBreakTimes?.join(", ") || "N/A"}
                  gradient="from-cyan-500 to-blue-600"
                />
                <OverallInsightCard
                  color="amber"
                  icon={<FiTrendingUp className="w-6 h-6" />}
                  label="Average Work Hours"
                  value={insights.averageWorkingHours || "0 hrs"}
                  gradient="from-purple-500 to-pink-600"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 sm:p-8 space-y-8">
        {/* Date Filter Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-6">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white mr-4">
              <FiCalendar className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Date-Specific Analysis
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white px-6 py-4 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-lg font-medium"
              />
            </div>
          </div>
        </div>

        {/* Daily Metrics for Selected Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MetricCard
            color="green"
            icon={<FiClock className="w-6 h-6" />}
            label="Working Hours Today"
            value={attendanceTotals.totalWorkingHours}
          />
          <MetricCard
            color="yellow"
            icon={<FiCoffee className="w-6 h-6" />}
            label="Break Time Today"
            value={`${attendanceTotals.totalBreakTaken} mins`}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Productivity Chart */}
          {showProductivity && (
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-8">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white mr-4">
                  <FiActivity className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Today's Productivity Score
                </h3>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-full max-w-sm mb-6">
                  <Doughnut data={doughnutData} options={doughnutOptions} />
                </div>
                <div className="text-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 w-full">
                  <div className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white mb-4">
                    <FiAward className="w-5 h-5 mr-2" />
                    <span className="text-2xl font-bold">
                      {(
                        (productiveTime / (productiveTime + unproductiveTime)) *
                        100
                      ).toFixed(0)}%
                    </span>
                    <span className="ml-2 text-lg">Productive</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl">
                      <div className="flex items-center justify-center mb-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span className="font-semibold text-blue-700 dark:text-blue-300">Productive</span>
                      </div>
                      <span className="text-lg font-bold text-blue-800 dark:text-blue-200">{productiveTime} min</span>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-xl">
                      <div className="flex items-center justify-center mb-1">
                        <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                        <span className="font-semibold text-orange-700 dark:text-orange-300">Other</span>
                      </div>
                      <span className="text-lg font-bold text-orange-800 dark:text-orange-200">{unproductiveTime} min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Activity Timeline */}
          {mode === "daily" && (
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-8">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white mr-4">
                  <FiTrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Activity Timeline
                </h3>
              </div>
              <ActivityTrendChart
                employeeId={empID}
                date={today.format("YYYY-MM-DD")}
              />
            </div>
          )}
        </div>

        {/* Usage Statistics Table */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="px-8 py-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700">
            <div className="flex items-center">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl mr-4">
                <FiCpu className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Usage Statistics</h2>
                <p className="text-white/80 text-lg mt-1">
                  Activity data for {dayjs(selectedDate).format("DD MMMM YYYY")}
                </p>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 dark:text-gray-300">
                    Date
                  </th>
                  <th className="py-4 px-6 text-center font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center justify-center">
                      <FiType className="mr-2" /> Keyboard (min)
                    </div>
                  </th>
                  <th className="py-4 px-6 text-center font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center justify-center">
                      <FiMousePointer className="mr-2" /> Mouse (min)
                    </div>
                  </th>
                  <th className="py-4 px-6 text-center font-semibold text-gray-700 dark:text-gray-300">
                    Key Presses
                  </th>
                  <th className="py-4 px-6 text-center font-semibold text-gray-700 dark:text-gray-300">
                    Mouse Clicks
                  </th>
                  <th className="py-4 px-6 text-center font-semibold text-gray-700 dark:text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filteredStats.map((stat) => (
                  <tr
                    key={stat._id}
                    className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 transition-all duration-200"
                  >
                    <td className="py-4 px-6 text-gray-900 dark:text-white font-semibold">
                      {dayjs(stat.date).format("DD MMM YYYY")}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-700 dark:text-blue-300 font-semibold">
                        {stat.keyboardMinutes}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-700 dark:text-purple-300 font-semibold">
                        {stat.mouseMinutes}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center text-gray-700 dark:text-gray-300 font-bold">
                      {stat.keyboardPressCount.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-center text-gray-700 dark:text-gray-300 font-bold">
                      {stat.mouseClickCount.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() =>
                          navigate(`/dashboard/statistics/${empID}/${stat.date}`)
                        }
                        className="px-6 py-2 text-sm bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
                {!filteredStats.length && (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-12 text-center text-gray-500 dark:text-gray-400"
                    >
                      <div className="flex flex-col items-center">
                        <FiInfo className="w-12 h-12 text-gray-300 mb-4" />
                        <p className="text-xl font-semibold mb-2">No Data Available</p>
                        <p className="text-gray-400">No usage statistics found for the selected date</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Productivity Insights Section */}
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-700 dark:via-teal-700 dark:to-cyan-700 rounded-t-3xl px-8 py-6">
            <div className="flex items-center">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl mr-4">
                <FiTarget className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Productivity Insights</h2>
                <p className="text-white/80 text-lg mt-1">
                  Detailed analysis for {dayjs(selectedDate).format("DD MMMM YYYY")}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-b-3xl shadow-xl border-l border-r border-b border-gray-100 dark:border-gray-700">
            {prodStatsLoading ? (
              <div className="flex justify-center py-16">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-emerald-500"></div>
                  <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading insights...</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                <StatsTableCard
                  title="Top Performing Applications"
                  icon={<FiAward className="w-5 h-5" />}
                  data={topProductivityStats?.topApps || []}
                />
                <StatsTableCard
                  title="Applications Needing Focus"
                  icon={<FiTarget className="w-5 h-5" />}
                  data={topProductivityStats?.leastApps || []}
                />
                <StatsTableCard
                  title="Most Visited Websites"
                  icon={<FiGlobe className="w-5 h-5" />}
                  data={top3Websites}
                  isWebsite
                />
                <StatsTableCard
                  title="Frequently Used Apps"
                  icon={<FiMonitor className="w-5 h-5" />}
                  data={top3Apps}
                />
              </div>
            )}
          </div>
        </div>

        {/* Productivity Bar Graph */}
        {topProductivityStats && topProductivityStats.topApps && (
          <ProductivityBarGraph data={topProductivityStats.topApps} />
        )}
      </div>
    </div>
  );
}