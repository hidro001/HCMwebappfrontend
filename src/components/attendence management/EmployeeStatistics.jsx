// import React, { useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import useUsageStatsStore from '../../store/useUsageStore';
// import useFullAttendanceStore from '../../store/useFullAttendanceStore';

// export default function EmployeeStatistics() {
//   const { empID } = useParams();
//   const navigate = useNavigate();
//   const { stats, fetchStats, loading, error } = useUsageStatsStore();

//   const fetchAllData = useFullAttendanceStore((state) => state.fetchAllData);
//   const getMonthlyAttendanceView = useFullAttendanceStore(
//     (state) => state.getMonthlyAttendanceView
//   );
//   const attendanceLoading = useFullAttendanceStore((state) => state.isLoading);

//   useEffect(() => {
//     fetchStats(empID);
//     fetchAllData(empID);
//   }, [empID, fetchStats, fetchAllData]);

//   if (loading || attendanceLoading)
//     return <p className="text-center py-6 text-gray-500">Loading...</p>;
//   if (error)
//     return <p className="text-center py-6 text-red-500">{error}</p>;

//   const monthlyAttendance = getMonthlyAttendanceView(2025, 4);

//   return (
//     <div className="p-10 bg-gray-100 min-h-screen space-y-10">
//       <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//         <div className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600">
//           <h2 className="text-2xl font-semibold text-white">Employee Usage Statistics ({empID})</h2>
//         </div>
//         <div className="overflow-x-auto p-4">
//           <table className="w-full text-sm text-gray-700">
//             <thead className="bg-gray-50">
//               <tr>
//                 {['Date', 'Keyboard Minutes', 'Mouse Minutes', 'Keyboard Presses', 'Mouse Clicks', 'Details'].map((head) => (
//                   <th key={head} className="py-3 px-4 text-center font-semibold border-b">
//                     {head}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {stats.map((stat) => (
//                 <tr key={stat._id} className="hover:bg-gray-50">
//                   <td className="py-3 px-4 text-center border-b">{stat.date}</td>
//                   <td className="py-3 px-4 text-center border-b">{stat.keyboardMinutes}</td>
//                   <td className="py-3 px-4 text-center border-b">{stat.mouseMinutes}</td>
//                   <td className="py-3 px-4 text-center border-b">{stat.keyboardPressCount}</td>
//                   <td className="py-3 px-4 text-center border-b">{stat.mouseClickCount}</td>
//                   <td className="py-3 px-4 text-center border-b">
//                     <button
//                       className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-3 py-1 text-sm"
//                       onClick={() => navigate(`/dashboard/statistics/${empID}/${stat.date}`)}
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//         <div className="px-6 py-4 bg-gradient-to-r from-teal-500 to-green-500">
//           <h2 className="text-2xl font-semibold text-white">Monthly Attendance (Break Minutes)</h2>
//         </div>
//         <div className="overflow-x-auto p-4">
//           <table className="w-full text-sm text-gray-700">
//             <thead className="bg-gray-50">
//               <tr>
//                 {['SL', 'Date', 'Day', 'Total Break', 'Status'].map((head) => (
//                   <th key={head} className="py-3 px-4 text-center font-semibold border-b">
//                     {head}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {monthlyAttendance.map((row) => (
//                 <tr key={row.date} className="hover:bg-gray-50">
//                   <td className="py-3 px-4 text-center border-b">{row.sl}</td>
//                   <td className="py-3 px-4 text-center border-b">{row.date}</td>
//                   <td className="py-3 px-4 text-center border-b">{row.day}</td>
//                   <td className="py-3 px-4 text-center border-b">{row.totalBreak}</td>
//                   <td className="py-3 px-4 text-center border-b">{row.status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// // }
// import React, { useEffect, useMemo } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// import useUsageStatsStore from '../../store/useUsageStore';
// import useFullAttendanceStore from '../../store/useFullAttendanceStore';

// ChartJS.register(ArcElement, Tooltip, Legend);

// export default function EmployeeStatistics() {
//   const { empID } = useParams();
//   const navigate = useNavigate();

//   // ——— USAGE STATS (overview) —————————————————————
//   const {
//     stats,
//     fetchStats,
//     dailyStats,
//     fetchDailyStats,
//     fetchDeptCategories,
//     deptCategories,
//     loading: usageLoading,
//     error: usageError,
//   } = useUsageStatsStore();

//   // ——— ATTENDANCE STATS —————————————————————————
//   const {
//     attendanceData,
//     fetchAllData,
//     isLoading: attendanceLoading,
//     error: attendanceError,
//   } = useFullAttendanceStore();

//   // Today's date for daily stats
//   const todayDate = new Date().toISOString().split('T')[0];

//   // Fetch overall usage & attendance on mount
//   useEffect(() => {
//     fetchStats(empID);
//     fetchAllData(empID);
//   }, [empID, fetchStats, fetchAllData]);

//   // Fetch today's daily usage + department categories
//   useEffect(() => {
//     fetchDailyStats(empID, todayDate).then((data) => {
//       if (data?.department) {
//         fetchDeptCategories(data.department);
//       }
//     });
//   }, [empID, todayDate, fetchDailyStats, fetchDeptCategories]);

//   // ——— AGGREGATE TOTALS —————————————————————————
//   const totalUsageStats = useMemo(() => {
//     return stats.reduce(
//       (acc, curr) => {
//         acc.keyboardMinutes += curr.keyboardMinutes;
//         acc.mouseMinutes    += curr.mouseMinutes;
//         acc.keyboardPresses += curr.keyboardPressCount;
//         acc.mouseClicks     += curr.mouseClickCount;
//         return acc;
//       },
//       { keyboardMinutes: 0, mouseMinutes: 0, keyboardPresses: 0, mouseClicks: 0 }
//     );
//   }, [stats]);

//   const attendanceTotals = useMemo(() => {
//     let totalWorkingMinutes = 0;
//     let totalBreakMinutes   = 0;

//     attendanceData.forEach((rec) => {
//       if (rec.login && rec.logout) {
//         const inT  = new Date(`1970-01-01T${convertTo24Hour(rec.login)}`);
//         const outT = new Date(`1970-01-01T${convertTo24Hour(rec.logout)}`);
//         totalWorkingMinutes += (outT - inT) / 60000;
//       }
//       rec.breaks?.forEach((br) => {
//         if (br.start && br.end) {
//           const s = new Date(br.start), e = new Date(br.end);
//           totalBreakMinutes += Math.floor((e - s) / 60000);
//         }
//       });
//     });

//     return {
//       totalWorkingHours: (totalWorkingMinutes / 60).toFixed(2),
//       totalBreakTaken: totalBreakMinutes,
//     };
//   }, [attendanceData]);

//   // ——— DAILY PRODUCTIVITY ————————————————————————
//   const { productiveTime, unproductiveTime } = useMemo(() => {
//     if (!dailyStats || !deptCategories) return { productiveTime: 0, unproductiveTime: 0 };

//     const prodSet   = new Set(deptCategories.productive.map((d) => d.name.toLowerCase()));
//     const unprodSet = new Set(deptCategories.unproductive.map((d) => d.name.toLowerCase()));
//     let p = 0, u = 0;

//     dailyStats.appsUsed.forEach(({ appName, minutesUsed }) => {
//       const name = appName.toLowerCase();
//       prodSet.has(name)   ? (p += minutesUsed)
//       : unprodSet.has(name) && (u += minutesUsed);
//     });
//     dailyStats.websitesVisited.forEach(({ url, minutesVisited }) => {
//       const uName = url.toLowerCase();
//       prodSet.has(uName)   ? (p += minutesVisited)
//       : unprodSet.has(uName) && (u += minutesVisited);
//     });

//     return { productiveTime: p, unproductiveTime: u };
//   }, [dailyStats, deptCategories]);

//   // ——— DOUGHNUT CONFIG —————————————————————————
//   const doughnutData = {
//     labels: ['Productive Time', 'Unproductive Time'],
//     datasets: [{
//       data: [productiveTime, unproductiveTime],
//       backgroundColor: ['#2563EB', '#F97316'],
//       hoverBackgroundColor: ['#1E40AF', '#EA580C'],
//       borderColor: '#FFF', borderWidth: 4,
//     }],
//   };
//   const doughnutOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: 'bottom', labels: { font: { size: 14 } } },
//     },
//   };

//   // ——— LOADING & ERROR ————————————————————————
//   if (usageLoading || attendanceLoading)
//     return <p className="text-center py-6 text-gray-500">Loading...</p>;
//   if (usageError || attendanceError)
//     return <p className="text-center py-6 text-red-500">{usageError || attendanceError}</p>;

//   return (
//     <div className="p-10 bg-gray-100 min-h-screen space-y-10">
      
//       {/* top metrics + chart */}
//       <div className="grid md:grid-cols-4 gap-4">
//         {/* 6 Boxes */}
//         <div className="md:col-span-3 grid grid-cols-3 gap-4">
//         {[
//   { bg: 'green',  label: 'Total Working Hours', value: attendanceTotals.totalWorkingHours },
//   { bg: 'yellow', label: 'Total Break Taken',   value: `${attendanceTotals.totalBreakTaken} mins` },
//   { bg: 'blue',   label: 'Keyboard Minutes',    value: totalUsageStats.keyboardMinutes },
//   { bg: 'purple', label: 'Mouse Minutes',       value: totalUsageStats.mouseMinutes },
//   { bg: 'pink',   label: 'Keyboard Presses',    value: totalUsageStats.keyboardPresses },
//   { bg: 'red',    label: 'Mouse Clicks',        value: totalUsageStats.mouseClicks },
// ].map(({ bg, label, value }) => (
//   <div key={label} className={`bg-${bg}-100 p-6 rounded-xl shadow text-center`}>
//     <h3 className="text-lg font-semibold">{label}</h3>
//     <p className="text-3xl font-bold">{value}</p>
//   </div>
// ))}

//         </div>

//         {/* chart */}
//         <div className="bg-white p-6 rounded-xl shadow-lg">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Productivity Insights</h3>
//           <Doughnut data={doughnutData} options={doughnutOptions} />
//         </div>
//       </div>

//       {/* usage stats table */}
//       <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//         <div className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600">
//           <h2 className="text-2xl font-semibold text-white">
//             Employee Usage Statistics ({empID})
//           </h2>
//         </div>
//         <div className="overflow-x-auto p-4">
//           <table className="w-full text-sm text-gray-700">
//             <thead className="bg-gray-50">
//               <tr>
//                 {['Date','Keyboard Minutes','Mouse Minutes','Keyboard Presses','Mouse Clicks','Details'].map((h) => (
//                   <th
//                     key={h}
//                     className="py-3 px-4 text-center font-semibold border-b"
//                   >
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {stats.map((stat) => (
//                 <tr key={stat._id} className="hover:bg-gray-50">
//                   <td className="py-3 px-4 text-center border-b">{stat.date}</td>
//                   <td className="py-3 px-4 text-center border-b">{stat.keyboardMinutes}</td>
//                   <td className="py-3 px-4 text-center border-b">{stat.mouseMinutes}</td>
//                   <td className="py-3 px-4 text-center border-b">{stat.keyboardPressCount}</td>
//                   <td className="py-3 px-4 text-center border-b">{stat.mouseClickCount}</td>
//                   <td className="py-3 px-4 text-center border-b">
//                     <button
//                       className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-3 py-1 text-sm"
//                       onClick={() => navigate(`/dashboard/statistics/${empID}/${stat.date}`)}
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// // utility parser
// function convertTo24Hour(timeStr) {
//   if (!timeStr) return timeStr;
//   const [time, ampm] = timeStr.split(' ');
//   if (!ampm) return timeStr;
//   let [h, m, s] = time.split(':').map(Number);
//   if (ampm === 'PM' && h !== 12) h += 12;
//   if (ampm === 'AM' && h === 12) h = 0;
//   return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
// }


/* --------------------------------------------------
 * EmployeeStatistics.jsx
 * -------------------------------------------------- */
import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import dayjs from 'dayjs';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import useUsageStatsStore     from '../../store/useUsageStore';
import useFullAttendanceStore from '../../store/useFullAttendanceStore';

ChartJS.register(ArcElement, Tooltip, Legend);

// ────────────────────────────────────────────────────────────────────────────
//  Utilities
// ────────────────────────────────────────────────────────────────────────────
const isSameISO = (d1, d2) => dayjs(d1).format('YYYY-MM-DD') === dayjs(d2).format('YYYY-MM-DD');

/** Returns true if date lies between (inclusive) start .. end. */
const isBetween = (date, start, end) =>
  dayjs(date).isAfter(dayjs(start).subtract(1, 'day')) &&
  dayjs(date).isBefore(dayjs(end).add(1, 'day'));

/** Parse “hh:mm:ss AM/PM” → “HH:mm:ss” */
function convertTo24Hour(timeStr) {
  if (!timeStr) return timeStr;
  const [time, ampm] = timeStr.split(' ');
  if (!ampm) return timeStr;
  let [h, m, s] = time.split(':').map(Number);
  if (ampm === 'PM' && h !== 12) h += 12;
  if (ampm === 'AM' && h === 12) h = 0;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

// ────────────────────────────────────────────────────────────────────────────
//  Main component
// ────────────────────────────────────────────────────────────────────────────
export default function EmployeeStatistics() {
  const { empID } = useParams();
  const navigate  = useNavigate();

  /* --------------------------------------------------------------------- */
  /*  Stores – pull data + loaders/errors                                   */
  /* --------------------------------------------------------------------- */
  const {
    stats, dailyStats, deptCategories,
    fetchStats, fetchDailyStats, fetchDeptCategories,
    fetchTopProductivityStats,
  topProductivityStats,
  loading: prodStatsLoading,
    loading: usageLoading, error: usageError
  } = useUsageStatsStore();

  const {
    attendanceData, fetchAllData,
    isLoading: attendanceLoading, error: attendanceError
  } = useFullAttendanceStore();

  /* --------------------------------------------------------------------- */
  /*  Initial data fetch                                                    */
  /* --------------------------------------------------------------------- */
  useEffect(() => { fetchStats(empID); fetchAllData(empID); }, [empID]);
  useEffect(() => {
    fetchDailyStats(empID, dayjs().format('YYYY-MM-DD')).then(d => {
      if (d?.department) fetchDeptCategories(d.department);
    });
  }, [empID]);



  /* --------------------------------------------------------------------- */
  /*  FILTER STATE                                                          */
  /* --------------------------------------------------------------------- */
  const today         = dayjs();
  const [mode, setMode] = useState('daily');               // daily | weekly | monthly | yearly
  const [month, setMonth] = useState(today.month()+1);     // 1…12  (only for monthly)
  const [year,  setYear]  = useState(today.year());  
  const getFavicon = (url) => `https://www.google.com/s2/favicons?domain=${url}&sz=64`;
  const appIconMap = {
    'google chrome': 'https://img.icons8.com/color/48/chrome--v1.png',
    'slack': 'https://img.icons8.com/color/48/slack-new-logo.png',
    'excel': 'https://img.icons8.com/color/48/microsoft-excel-2019--v1.png',
    'word': 'https://img.icons8.com/color/48/ms-word.png',
    'anydesk': 'https://img.icons8.com/color/48/anydesk.png',
    'calculator': 'https://img.icons8.com/color/48/calculator.png',
    'docker desktop': 'https://img.icons8.com/color/48/docker.png',
    'electron': 'https://img.icons8.com/color/48/electron.png',
    'lockapp.exe': 'https://img.icons8.com/color/48/lock-2.png',
    'microsoft 365 copilot app': 'https://img.icons8.com/color/48/microsoft-365.png',
    'microsoft copilot': 'https://img.icons8.com/color/48/microsoft-365.png',
    'microsoft edge': 'https://img.icons8.com/color/48/ms-edge-new.png',
    'mongodbcompass': 'https://img.icons8.com/color/48/mongodb.png',
    'notepad': 'https://img.icons8.com/color/48/notepad.png',
    'photos.exe': 'https://img.icons8.com/color/48/windows-photos.png',
    'postman': 'https://img.icons8.com/color/48/postman-api.png',
    'python 3.13.3 (64-bit)': 'https://img.icons8.com/color/48/python.png',
    'screenclippinghost.exe': 'https://img.icons8.com/color/48/screenshot.png',
    'search application': 'https://img.icons8.com/color/48/search--v1.png',
    'settings': 'https://img.icons8.com/color/48/settings--v1.png',
    'setup/uninstall': 'https://img.icons8.com/color/48/uninstalling-updates.png',
    'ssh, telnet, rlogin, and supdup client': 'https://img.icons8.com/color/48/console.png',
    'task manager': 'https://img.icons8.com/color/48/task-manager.png',
    'tcp/ip ping command': 'https://img.icons8.com/color/48/console.png',
    'visual studio code': 'https://img.icons8.com/color/48/visual-studio-code-2019.png',
    'whatsapp.exe': 'https://img.icons8.com/color/48/whatsapp--v1.png',
    'windows command processor': 'https://img.icons8.com/color/48/command-line.png',
    'windows explorer': 'https://img.icons8.com/color/48/windows-explorer.png',
    'windows shell experience host': 'https://img.icons8.com/color/48/windows-10.png',
    'windows® installer': 'https://img.icons8.com/color/48/windows-installer.png',
    'winscp: sftp, ftp, webdav, s3 and scp client': 'https://img.icons8.com/color/48/ftp.png',
    'wps office': 'https://img.icons8.com/color/48/wps-office.png',
    'wps spreadsheets': 'https://img.icons8.com/color/48/wps-office.png',
    'x-lite.exe': 'https://img.icons8.com/color/48/phone-office.png',
    'a desktop app for humanmaximizer': 'https://img.icons8.com/color/48/monitor--v1.png',
  };
  
  const getAppIcon = (appName) => {
    const key = appName.toLowerCase();
    return appIconMap[key] || 'https://img.icons8.com/fluency-systems-regular/48/application-window.png';
  };
  
  useEffect(() => {
    fetchTopProductivityStats(empID, mode);
  }, [empID, mode]);// for monthly & yearly

  /* --------------------------------------------------------------------- */
  /*  Derive time window                                                   */
  /* --------------------------------------------------------------------- */
  const period = useMemo(() => {
    if (mode === 'daily') {
      return { start: today.startOf('day'), end: today.endOf('day') };
    }
    if (mode === 'weekly') {
      const end   = today.endOf('day');
      const start = today.subtract(6, 'day').startOf('day');
      return { start, end };
    }
    if (mode === 'monthly') {
      const start = dayjs(`${year}-${String(month).padStart(2,'0')}-01`).startOf('month');
      const end   = start.endOf('month');
      return { start, end };
    }
    // yearly
    const start = dayjs(`${year}-01-01`).startOf('year');
    const end   = start.endOf('year');
    return { start, end };
  }, [mode, month, year]);

  /* --------------------------------------------------------------------- */
  /*  Filter helpers                                                        */
  /* --------------------------------------------------------------------- */
  const inWindow = dateStr =>
    isBetween(dateStr, period.start, period.end);

  const filteredStats       = useMemo(() => stats.filter(s => inWindow(s.date)),        [stats, period]);
  const filteredAttendance  = useMemo(() => attendanceData.filter(a => inWindow(a.date)),[attendanceData, period]);

  /* --------------------------------------------------------------------- */
  /*  Aggregate Usage totals                                                */
  /* --------------------------------------------------------------------- */
  const totalUsage = useMemo(() => {
    return filteredStats.reduce((acc, cur) => ({
      keyboardMinutes : acc.keyboardMinutes  + cur.keyboardMinutes,
      mouseMinutes    : acc.mouseMinutes     + cur.mouseMinutes,
      keyboardPresses : acc.keyboardPresses  + cur.keyboardPressCount,
      mouseClicks     : acc.mouseClicks      + cur.mouseClickCount,
    }), { keyboardMinutes:0, mouseMinutes:0, keyboardPresses:0, mouseClicks:0 });
  }, [filteredStats]);

  /* --------------------------------------------------------------------- */
  /*  Aggregate Attendance totals                                           */
  /* --------------------------------------------------------------------- */
  const attendanceTotals = useMemo(() => {
    let workMin = 0, breakMin = 0;
  
    filteredAttendance.forEach(rec => {
      if (rec.login && rec.logout) {
        const s = new Date(`1970-01-01T${convertTo24Hour(rec.login)}`);
        const e = new Date(`1970-01-01T${convertTo24Hour(rec.logout)}`);
        workMin += (e - s) / 60000;
      }
      rec.breaks?.forEach(br => {
        if (br.start && br.end) {
          breakMin += Math.floor((new Date(br.end) - new Date(br.start)) / 60000);
        }
      });
    });
  
    const hours = Math.floor(workMin / 60);
    const minutes = Math.round(workMin % 60);
  
    return {
      totalWorkingHours: `${hours} hrs ${minutes} mins`,
      totalBreakTaken: breakMin
    };
  }, [filteredAttendance]);

  /* --------------------------------------------------------------------- */
  /*  Productivity (Daily ONLY) – show doughnut                            */
  /* --------------------------------------------------------------------- */
  const showProductivity = mode === 'daily';
  const { productiveTime, unproductiveTime } = useMemo(() => {
    if (!showProductivity || !dailyStats || !deptCategories) {
      return { productiveTime:0, unproductiveTime:0 };
    }
    const prodSet   = new Set(deptCategories.productive.map(d => d.name.toLowerCase()));
    const unprodSet = new Set(deptCategories.unproductive.map(d => d.name.toLowerCase()));
    let p = 0, u = 0;
    dailyStats.appsUsed.forEach(({ appName, minutesUsed }) => {
      const n = appName.toLowerCase();
      prodSet.has(n) ? p += minutesUsed : unprodSet.has(n) && (u += minutesUsed);
    });
    dailyStats.websitesVisited.forEach(({ url, minutesVisited }) => {
      const n = url.toLowerCase();
      prodSet.has(n) ? p += minutesVisited : unprodSet.has(n) && (u += minutesVisited);
    });
    return { productiveTime: p, unproductiveTime: u };
  }, [dailyStats, deptCategories, showProductivity]);

  /* --------------------------------------------------------------------- */
  /*  Chart Config                                                          */
  /* --------------------------------------------------------------------- */
  const doughnutData = {
    labels: ['Productive', 'Unproductive'],
    datasets: [{
      data: [productiveTime, unproductiveTime],
      backgroundColor     : ['#2563EB', '#F97316'],
      hoverBackgroundColor: ['#1E40AF', '#EA580C'],
      borderColor:'#FFF', borderWidth:4,
    }]
  };
  const doughnutOptions = { responsive:true, plugins:{ legend:{ position:'bottom' } } };

  /* --------------------------------------------------------------------- */
  /*  Load / Error states                                                   */
  /* --------------------------------------------------------------------- */
  if (usageLoading || attendanceLoading)
    return <p className="text-center py-6 text-gray-500">Loading…</p>;
  if (usageError || attendanceError)
    return <p className="text-center py-6 text-red-500">{usageError || attendanceError}</p>;

  /* --------------------------------------------------------------------- */
  /*  RENDER                                                                */
  /* --------------------------------------------------------------------- */

  const StatsTableCard = ({
    title,
    data = [],
    isWebsite = false,
    onSeeAll = () => {},
  }) => {
    const BLUE = "#487FFF";
    const GRAY = "#e2e8f0";
  
    const css = {
      card: {
        border: `1px solid ${GRAY}`,
        borderRadius: 12,
        background: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,.05)",
      },
      header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        borderBottom: `1px solid ${GRAY}`,
      },
      title: { fontWeight: 600, color: "#374151", fontSize: 16 },
      tableWrapper: {
        overflowX: "auto",
        padding: "0",
        border: `1px solid ${BLUE}`,
        borderRadius: 8,
        margin: "16px",
      },
      table: {
        width: "100%",
        borderCollapse: "collapse",
        fontSize: 14,
        color: "#374151",
      },
      thBase: {
        background: "#F0F7FF",
        padding: 10,
        color: "#1f2937",
        fontWeight: 500,
        textAlign: "left",
      },
      tdBase: {
        padding: 10,
        borderBottom: `1px solid ${BLUE}`,
        color: "#374151",
      },
      icon: {
        width: 24,
        height: 24,
        marginRight: 8,
        verticalAlign: "middle",
      },
    };
  
    const renderHeader = () => (
      <thead>
        <tr>
          <th style={{ ...css.thBase, width: 60, textAlign: "center", borderRight: `1px solid ${BLUE}` }}>#</th>
          <th style={{ ...css.thBase, borderRight: `1px solid ${BLUE}` }}>
            {isWebsite ? "Website Name" : "App Name"}
          </th>
          <th style={{ ...css.thBase, width: 160, textAlign: "center" }}>Time (Min)</th>
        </tr>
      </thead>
    );
  
    const renderRows = () =>
      data.length ? (
        data.slice(0, 5).map((row, i) => {
          const name = isWebsite ? row.url : row.appName;
          const icon = isWebsite ? getFavicon(row.url) : getAppIcon(row.appName);
  
          return (
            <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#F9FBFF" }}>
              <td style={{ ...css.tdBase, textAlign: "center", borderRight: `1px solid ${BLUE}` }}>
                {String(i + 1).padStart(2, "0")}
              </td>
              <td style={{ ...css.tdBase, textAlign: "left", borderRight: `1px solid ${BLUE}` }}>
                <img src={icon} alt="" style={css.icon} />
                {name}
              </td>
              <td style={{ ...css.tdBase, textAlign: "center" }}>
                {(row.minutesVisited ?? row.minutesUsed) || 0}
              </td>
            </tr>
          );
        })
      ) : (
        <tr>
          <td colSpan={3} style={{ padding: 12, textAlign: "center", color: "#9ca3af" }}>No data available.</td>
        </tr>
      );
  
    return (
      <div style={css.card}>
        <div style={css.header}>
          <span style={css.title}>{title}</span>
        </div>
  
        <div style={css.tableWrapper}>
          <table style={css.table}>
            {renderHeader()}
            <tbody>{renderRows()}</tbody>
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
      less: '#FF8A80',
      avg: '#90CAF9',
      top: '#B9F6CA',
    };
  
    const formattedData = data.map(app => ({
      name: app.appName,
      productivityLevel: app.productivityLevel,
      productivityValue: productivityMap[app.productivityLevel] || 0,
    }));
  
    return (
      <div className="p-6 bg-white rounded-xl shadow-xl mt-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Productive Websites & Apps
        </h3>
  
        <ResponsiveContainer width="100%" height={formattedData.length * 50 + 50}>
          <BarChart layout="vertical" data={formattedData}>
            <XAxis type="number" hide domain={[0, 3]} />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 12 }}
              width={150}
            />
            <RechartsTooltip
              formatter={(value, name, props) =>
                props?.payload?.productivityLevel
                  ? props.payload.productivityLevel.toUpperCase()
                  : 'N/A'
              }
            />
  
            <Bar dataKey="productivityValue" barSize={25} radius={[0, 10, 10, 0]}>
              {formattedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={productivityColor[entry.productivityLevel]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
  
        <div className="flex justify-around mt-4 text-xs font-semibold">
          <span className="flex items-center">
            <span className="block w-3 h-3 rounded-full mr-1 bg-[#B9F6CA]"></span>Top
          </span>
          <span className="flex items-center">
            <span className="block w-3 h-3 rounded-full mr-1 bg-[#90CAF9]"></span>Avg
          </span>
          <span className="flex items-center">
            <span className="block w-3 h-3 rounded-full mr-1 bg-[#FF8A80]"></span>Less
          </span>
        </div>
      </div>
    );
  };
  
 
  
  return (
    <div className="p-6 sm:p-10 bg-gray-100 min-h-screen space-y-10">

      {/* ─── Filter‑bar ─────────────────────────────────────── */}
      <div className="flex flex-wrap gap-4 items-end">
        {/* Time‑range selector */}
        <label className="flex flex-col">
          <select
            value={mode}
            onChange={e => setMode(e.target.value)}
            className="mt-1 border rounded-lg px-3 py-1.5 bg-white"
          >
            <option value="daily">Today</option>
            <option value="weekly">Weekly (last 7 days)</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </label>

        {/* Month selector */}
        {mode === 'monthly' && (
          <>
            <label className="flex flex-col">
              <span className="text-sm font-medium">Month</span>
              <select
                value={month}
                onChange={e => setMonth(Number(e.target.value))}
                className="mt-1 border rounded-lg px-3 py-1.5 bg-white"
              >
                {Array.from({length:12}).map((_,i)=>
                  <option key={i+1} value={i+1}>{dayjs().month(i).format('MMMM')}</option>
                )}
              </select>
            </label>
            <label className="flex flex-col">
              <span className="text-sm font-medium">Year</span>
              <input
                type="number"
                value={year}
                onChange={e => setYear(Number(e.target.value))}
                className="mt-1 border rounded-lg px-3 py-1.5 w-24 bg-white"
              />
            </label>
          </>
        )}

        {/* Year selector for Yearly mode */}
        {mode === 'yearly' && (
          <label className="flex flex-col">
            <span className="text-sm font-medium">Year</span>
            <input
              type="number"
              value={year}
              onChange={e => setYear(Number(e.target.value))}
              className="mt-1 border rounded-lg px-3 py-1.5 w-24 bg-white"
            />
          </label>
        )}
      </div>

      {/* ─── Metric boxes + (optional) chart ───────────────── */}
      <div className="grid lg:grid-cols-4 gap-4">
        {/* Metrics */}
        <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { color:'green',  label:'Total Working Hours', value: attendanceTotals.totalWorkingHours },
            
            { color:'blue',   label:'Keyboard Minutes',   value: totalUsage.keyboardMinutes },
            { color:'pink',   label:'Keyboard Presses',   value: totalUsage.keyboardPresses },
            { color:'purple', label:'Mouse Minutes',      value: totalUsage.mouseMinutes },
            { color:'red',    label:'Mouse Clicks',       value: totalUsage.mouseClicks },
            
            { color:'yellow', label:'Total Break Taken',  value: `${attendanceTotals.totalBreakTaken} mins` },
            
          ].map(({ color,label,value }) => (
            <div key={label} className={`bg-${color}-100 p-4 sm:p-6 rounded-xl shadow text-center`}>
              <h3 className="text-sm sm:text-base font-semibold">{label}</h3>
              <p className="text-2xl sm:text-3xl font-bold">{value}</p>
            </div>
          ))}
        </div>

        {/* Doughnut (only for daily) */}
        {showProductivity && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Today’s Productivity
            </h3>
            <Doughnut data={doughnutData} options={doughnutOptions}/>
          </div>
        )}
      </div>

      {/* ─── Usage table ───────────────────────────────────── */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">

        <div className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">
            Usage Statistics ({empID})&nbsp;
            <span className="opacity-80 text-sm font-normal">
              {mode === 'daily' && dayjs().format('DD MMM YYYY')}
              {mode === 'weekly' && `${period.start.format('DD MMM')} – ${period.end.format('DD MMM YYYY')}`}
              {mode === 'monthly' && dayjs(`${year}-${month}-01`).format('MMMM YYYY')}
              {mode === 'yearly' && year}
            </span>
          </h2>
        </div>

        <div className="overflow-x-auto p-4">
          <table className="w-full text-xs sm:text-sm text-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">

              <tr>
                {['Date','Keyboard Min.','Mouse Min.','Key Presses','Mouse Clicks','Details'].map(h=>(
                  <th key={h} className="py-3 px-4 text-center font-semibold border-b">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredStats.map(stat => (
                <tr key={stat._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-center border-b">{stat.date}</td>
                  <td className="py-3 px-4 text-center border-b">{stat.keyboardMinutes}</td>
                  <td className="py-3 px-4 text-center border-b">{stat.mouseMinutes}</td>
                  <td className="py-3 px-4 text-center border-b">{stat.keyboardPressCount}</td>
                  <td className="py-3 px-4 text-center border-b">{stat.mouseClickCount}</td>
                  <td className="py-3 px-4 text-center border-b">
                    <button
                      onClick={()=>navigate(`/dashboard/statistics/${empID}/${stat.date}`)}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-3 py-1 text-xs sm:text-sm"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {!filteredStats.length && (
                <tr><td colSpan={6} className="py-6 text-center text-gray-500 dark:text-gray-400">No data</td></tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Productivity Stats Section */}
{/* Productivity Stats Section */}
<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mt-10" style={{marginTop: "100px"}}>
  

  <div className="bg-white rounded-2xl shadow-xl overflow-hidden mt-10">
  <div className="px-6 py-4 bg-gradient-to-r from-green-500 to-teal-500">
    <h2 className="text-xl sm:text-2xl font-semibold text-white">
      Productivity Insights ({mode.charAt(0).toUpperCase() + mode.slice(1)})
    </h2>
  </div>

  {prodStatsLoading ? (
    <p className="text-center py-6 text-gray-500">Loading Productivity Stats...</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <StatsTableCard
        title="Top Productive Websites"
        data={topProductivityStats?.topWebsites || []}
        isWebsite
        onSeeAll={() => navigate('/full-list/productive-websites')}
      />
      <StatsTableCard
        title="Less Productive Websites"
        data={topProductivityStats?.leastWebsites || []}
        isWebsite
        onSeeAll={() => navigate('/full-list/unproductive-websites')}
      />
      <StatsTableCard
        title="Top Apps Used"
        data={topProductivityStats?.topApps || []}
        onSeeAll={() => navigate('/full-list/productive-apps')}
      />
      <StatsTableCard
        title="Less Productive Apps"
        data={topProductivityStats?.leastApps || []}
        onSeeAll={() => navigate('/full-list/unproductive-apps')}
      />
    </div>
  )}
</div>

</div>

      </div>
      {/* {topProductivityStats && topProductivityStats.topApps && (
  <ProductivityBarGraph data={topProductivityStats.topApps} />
)} */}

    </div>
  );
}
