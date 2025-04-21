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
// }
import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import useUsageStatsStore from '../../store/useUsageStore';
import useFullAttendanceStore from '../../store/useFullAttendanceStore';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function EmployeeStatistics() {
  const { empID } = useParams();
  const navigate = useNavigate();

  // ——— USAGE STATS (overview) —————————————————————
  const {
    stats,
    fetchStats,
    dailyStats,
    fetchDailyStats,
    fetchDeptCategories,
    deptCategories,
    loading: usageLoading,
    error: usageError,
  } = useUsageStatsStore();

  // ——— ATTENDANCE STATS —————————————————————————
  const {
    attendanceData,
    fetchAllData,
    isLoading: attendanceLoading,
    error: attendanceError,
  } = useFullAttendanceStore();

  // Today's date for daily stats
  const todayDate = new Date().toISOString().split('T')[0];

  // Fetch overall usage & attendance on mount
  useEffect(() => {
    fetchStats(empID);
    fetchAllData(empID);
  }, [empID, fetchStats, fetchAllData]);

  // Fetch today's daily usage + department categories
  useEffect(() => {
    fetchDailyStats(empID, todayDate).then((data) => {
      if (data?.department) {
        fetchDeptCategories(data.department);
      }
    });
  }, [empID, todayDate, fetchDailyStats, fetchDeptCategories]);

  // ——— AGGREGATE TOTALS —————————————————————————
  const totalUsageStats = useMemo(() => {
    return stats.reduce(
      (acc, curr) => {
        acc.keyboardMinutes += curr.keyboardMinutes;
        acc.mouseMinutes    += curr.mouseMinutes;
        acc.keyboardPresses += curr.keyboardPressCount;
        acc.mouseClicks     += curr.mouseClickCount;
        return acc;
      },
      { keyboardMinutes: 0, mouseMinutes: 0, keyboardPresses: 0, mouseClicks: 0 }
    );
  }, [stats]);

  const attendanceTotals = useMemo(() => {
    let totalWorkingMinutes = 0;
    let totalBreakMinutes   = 0;

    attendanceData.forEach((rec) => {
      if (rec.login && rec.logout) {
        const inT  = new Date(`1970-01-01T${convertTo24Hour(rec.login)}`);
        const outT = new Date(`1970-01-01T${convertTo24Hour(rec.logout)}`);
        totalWorkingMinutes += (outT - inT) / 60000;
      }
      rec.breaks?.forEach((br) => {
        if (br.start && br.end) {
          const s = new Date(br.start), e = new Date(br.end);
          totalBreakMinutes += Math.floor((e - s) / 60000);
        }
      });
    });

    return {
      totalWorkingHours: (totalWorkingMinutes / 60).toFixed(2),
      totalBreakTaken: totalBreakMinutes,
    };
  }, [attendanceData]);

  // ——— DAILY PRODUCTIVITY ————————————————————————
  const { productiveTime, unproductiveTime } = useMemo(() => {
    if (!dailyStats || !deptCategories) return { productiveTime: 0, unproductiveTime: 0 };

    const prodSet   = new Set(deptCategories.productive.map((d) => d.name.toLowerCase()));
    const unprodSet = new Set(deptCategories.unproductive.map((d) => d.name.toLowerCase()));
    let p = 0, u = 0;

    dailyStats.appsUsed.forEach(({ appName, minutesUsed }) => {
      const name = appName.toLowerCase();
      prodSet.has(name)   ? (p += minutesUsed)
      : unprodSet.has(name) && (u += minutesUsed);
    });
    dailyStats.websitesVisited.forEach(({ url, minutesVisited }) => {
      const uName = url.toLowerCase();
      prodSet.has(uName)   ? (p += minutesVisited)
      : unprodSet.has(uName) && (u += minutesVisited);
    });

    return { productiveTime: p, unproductiveTime: u };
  }, [dailyStats, deptCategories]);

  // ——— DOUGHNUT CONFIG —————————————————————————
  const doughnutData = {
    labels: ['Productive Time', 'Unproductive Time'],
    datasets: [{
      data: [productiveTime, unproductiveTime],
      backgroundColor: ['#2563EB', '#F97316'],
      hoverBackgroundColor: ['#1E40AF', '#EA580C'],
      borderColor: '#FFF', borderWidth: 4,
    }],
  };
  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom', labels: { font: { size: 14 } } },
    },
  };

  // ——— LOADING & ERROR ————————————————————————
  if (usageLoading || attendanceLoading)
    return <p className="text-center py-6 text-gray-500">Loading...</p>;
  if (usageError || attendanceError)
    return <p className="text-center py-6 text-red-500">{usageError || attendanceError}</p>;

  return (
    <div className="p-10 bg-gray-100 min-h-screen space-y-10">
      
      {/* top metrics + chart */}
      <div className="grid md:grid-cols-4 gap-4">
        {/* 6 Boxes */}
        <div className="md:col-span-3 grid grid-cols-3 gap-4">
        {[
  { bg: 'green',  label: 'Total Working Hours', value: attendanceTotals.totalWorkingHours },
  { bg: 'yellow', label: 'Total Break Taken',   value: `${attendanceTotals.totalBreakTaken} mins` },
  { bg: 'blue',   label: 'Keyboard Minutes',    value: totalUsageStats.keyboardMinutes },
  { bg: 'purple', label: 'Mouse Minutes',       value: totalUsageStats.mouseMinutes },
  { bg: 'pink',   label: 'Keyboard Presses',    value: totalUsageStats.keyboardPresses },
  { bg: 'red',    label: 'Mouse Clicks',        value: totalUsageStats.mouseClicks },
].map(({ bg, label, value }) => (
  <div key={label} className={`bg-${bg}-100 p-6 rounded-xl shadow text-center`}>
    <h3 className="text-lg font-semibold">{label}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </div>
))}

        </div>

        {/* chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Productivity Insights</h3>
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      </div>

      {/* usage stats table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600">
          <h2 className="text-2xl font-semibold text-white">
            Employee Usage Statistics ({empID})
          </h2>
        </div>
        <div className="overflow-x-auto p-4">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-gray-50">
              <tr>
                {['Date','Keyboard Minutes','Mouse Minutes','Keyboard Presses','Mouse Clicks','Details'].map((h) => (
                  <th
                    key={h}
                    className="py-3 px-4 text-center font-semibold border-b"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stats.map((stat) => (
                <tr key={stat._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-center border-b">{stat.date}</td>
                  <td className="py-3 px-4 text-center border-b">{stat.keyboardMinutes}</td>
                  <td className="py-3 px-4 text-center border-b">{stat.mouseMinutes}</td>
                  <td className="py-3 px-4 text-center border-b">{stat.keyboardPressCount}</td>
                  <td className="py-3 px-4 text-center border-b">{stat.mouseClickCount}</td>
                  <td className="py-3 px-4 text-center border-b">
                    <button
                      className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-3 py-1 text-sm"
                      onClick={() => navigate(`/dashboard/statistics/${empID}/${stat.date}`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// utility parser
function convertTo24Hour(timeStr) {
  if (!timeStr) return timeStr;
  const [time, ampm] = timeStr.split(' ');
  if (!ampm) return timeStr;
  let [h, m, s] = time.split(':').map(Number);
  if (ampm === 'PM' && h !== 12) h += 12;
  if (ampm === 'AM' && h === 12) h = 0;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}
