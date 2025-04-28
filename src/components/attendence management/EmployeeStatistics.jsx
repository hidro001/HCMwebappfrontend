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
    return {
      totalWorkingHours: (workMin/60).toFixed(2),
      totalBreakTaken  : breakMin
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
<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mt-10">
  <div className="px-6 py-4 bg-gradient-to-r from-green-500 to-teal-500">
    <h2 className="text-xl sm:text-2xl font-semibold text-white">
      Productivity Insights ({mode.charAt(0).toUpperCase() + mode.slice(1)})
    </h2>
  </div>

  {prodStatsLoading ? (
    <p className="text-center py-6 text-gray-500 dark:text-gray-300">
      Loading Productivity Stats...
    </p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      {[{
          title: 'Top Productive Apps',
          data: topProductivityStats?.topApps,
        }, {
          title: 'Top Productive Websites',
          data: topProductivityStats?.topWebsites,
        }, {
          title: 'Least Productive Apps',
          data: topProductivityStats?.leastApps,
        }, {
          title: 'Least Productive Websites',
          data: topProductivityStats?.leastWebsites,
        }].map(({ title, data }) => (
          <div key={title} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-inner">
            <h3 className="font-semibold text-md border-b border-gray-200 dark:border-gray-600 pb-2 mb-2 text-gray-800 dark:text-gray-100">
              {title}
            </h3>

            {data?.length ? (
              <ul className="space-y-1">
                {data.map((item) => (
                  <li key={item.appName || item.url} className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium text-gray-700 dark:text-gray-200">
                      {item.appName || item.url}
                    </span>
                    <span className="ml-2 text-sm font-semibold text-teal-600 dark:text-teal-400">
                      – {item.minutesUsed || item.minutesVisited} mins
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                No data available.
              </p>
            )}
          </div>
      ))}
    </div>
  )}
</div>

      </div>
      
    </div>
  );
}
