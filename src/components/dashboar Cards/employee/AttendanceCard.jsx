// import React from 'react';
// import { Doughnut } from 'react-chartjs-2';
// import { motion } from 'framer-motion';
// import 'chart.js/auto'; // Ensure Chart.js is auto‐registered

// const AttendanceCard = () => {
//   // Chart data (example: 85% vs 15%)
//   const data = {
//     labels: ['Attendance', 'Remaining'],
//     datasets: [
//       {
//         data: [85, 15],
//         backgroundColor: ['#10B981', '#D1FAE5'], // Green + light green
//         hoverBackgroundColor: ['#10B981', '#D1FAE5'],
//         borderWidth: 0,
//         cutout: '80%', // Makes it a donut
//       },
//     ],
//   };

//   // Chart options (hide legend/tooltip, etc.)
//   const options = {
//     plugins: {
//       legend: { display: false },
//       tooltip: { enabled: false },
//     },
//     maintainAspectRatio: false,
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-sm w-full p-4 rounded-lg shadow-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100"
//     >
//       {/* Top Row: Title & Decrease Indicator */}
//       <div className="flex justify-between items-start">
//         <h2 className="text-lg font-semibold">Attendance</h2>
//         <div className="flex items-center text-sm text-red-500">
//           {/* Down arrow icon (you can replace with any icon library) */}
//           <svg
//             className="w-4 h-4 mr-1 fill-current"
//             viewBox="0 0 20 20"
//           >
//             <path d="M10 12.586l-4.293-4.293-1.414 1.414L10 15.414l5.707-5.707-1.414-1.414z" />
//           </svg>
//           <span>-15%</span>
//         </div>
//       </div>

//       {/* Donut Chart */}
//       <div className="relative w-32 h-32 mx-auto my-4">
//         <Doughnut data={data} options={options} />
//         {/* Centered Text (e.g., 85% Attendance) */}
//         <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
//           <span className="text-xl font-semibold">85%</span>
//           <span className="text-xs text-gray-500 dark:text-gray-400">
//             Attendance
//           </span>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="flex flex-col space-y-1 text-sm mt-2">
//         <div className="flex justify-between">
//           <span className="font-medium">Present</span>
//           <span>230</span>
//         </div>
//         <div className="flex justify-between">
//           <span className="font-medium">Absent</span>
//           <span>12</span>
//         </div>
//         <div className="flex justify-between">
//           <span className="font-medium">Leaves</span>
//           <span>12</span>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default AttendanceCard;


import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import 'chart.js/auto';
import { getAttendanceStats } from '../../../service/dashboardService';

const AttendanceCard = () => {
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);
  const [leaves, setLeaves] = useState(0);
  const [attendancePercent, setAttendancePercent] = useState(0);
  const [changePercent, setChangePercent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      setIsLoading(true);
      const res = await getAttendanceStats();
      if (res.success) {
        const { present, absent, leaves, attendancePercent } = res.data;
        setPresent(present);
        setAbsent(absent);
        setLeaves(leaves);
        setAttendancePercent(attendancePercent);
        
        // If you track daily/weekly changes, compute or fetch real data here:
        setChangePercent(-15); 
      } else {
        console.error('API responded with success=false:', res.message);
      }
    } catch (error) {
      console.error('Failed to fetch attendance stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Edge-case handling: clamp attendancePercent to [0, 100]
  const clampedPercent = Math.min(100, Math.max(0, attendancePercent));
  const doughnutData = [clampedPercent, 100 - clampedPercent];

  const data = {
    labels: ['Attendance', 'Remaining'],
    datasets: [
      {
        data: doughnutData,
        backgroundColor: ['#10B981', '#D1FAE5'], 
        hoverBackgroundColor: ['#10B981', '#D1FAE5'],
        borderWidth: 0,
        cutout: '80%',
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    maintainAspectRatio: false,
  };

  // Conditionally show an "up arrow" if changePercent >= 0 or "down arrow" if < 0
  const isNegativeChange = changePercent < 0;
  const changeColor = isNegativeChange ? 'text-red-500' : 'text-green-500';
  const arrowPath = isNegativeChange
    ? 'M10 7.414l4.293 4.293 1.414-1.414L10 4.586l-5.707 5.707 1.414 1.414z'
    : 'M10 12.586l4.293-4.293 1.414 1.414L10 15.414l-5.707-5.707 1.414-1.414z';

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-sm w-full p-4 rounded-lg shadow-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 flex items-center justify-center h-48"
      >
        <span className="text-sm text-gray-500 dark:text-gray-300">Loading...</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-sm w-full p-4 rounded-lg shadow-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100"
    >
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold">Attendance</h2>
        {/* <div className={`flex items-center text-sm ${changeColor}`}>
          <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 20 20">
            <path d={arrowPath} />
          </svg>
          <span>{Math.abs(changePercent)}%</span>
        </div> */}
      </div>

      <div className="relative w-32 h-32 mx-auto my-4">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-semibold">{clampedPercent}%</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Attendance
          </span>
        </div>
      </div>

      <div className="flex flex-col space-y-1 text-sm mt-2">
        <div className="flex justify-between">
          <span className="font-medium">Present</span>
          <span>{present}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Absent</span>
          <span>{absent}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Leaves</span>
          <span>{leaves}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default AttendanceCard;
