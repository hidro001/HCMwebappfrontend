// import React, { useEffect, useState } from 'react';
// import { Doughnut } from 'react-chartjs-2';
// import { motion } from 'framer-motion';
// import 'chart.js/auto';
// import { getAttendanceStats } from '../../../service/dashboardService';

// const AttendanceCard = () => {
//   const [present, setPresent] = useState(0);
//   const [absent, setAbsent] = useState(0);
//   const [leaves, setLeaves] = useState(0);
//   const [attendancePercent, setAttendancePercent] = useState(0);
//   const [changePercent, setChangePercent] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     fetchAttendanceData();
//   }, []);

//   const fetchAttendanceData = async () => {
//     try {
//       setIsLoading(true);
//       const res = await getAttendanceStats();
//       if (res.success) {
//         const { present, absent, leaves, attendancePercent } = res.data;
//         setPresent(present);
//         setAbsent(absent);
//         setLeaves(leaves);
//         setAttendancePercent(attendancePercent);
        
//         // If you track daily/weekly changes, compute or fetch real data here:
//         setChangePercent(-15); 
//       } else {
//         console.error('API responded with success=false:', res.message);
//       }
//     } catch (error) {
//       console.error('Failed to fetch attendance stats:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Edge-case handling: clamp attendancePercent to [0, 100]
//   const clampedPercent = Math.min(100, Math.max(0, attendancePercent));
//   const doughnutData = [clampedPercent, 100 - clampedPercent];

//   const data = {
//     labels: ['Attendance', 'Remaining'],
//     datasets: [
//       {
//         data: doughnutData,
//         backgroundColor: ['#10B981', '#D1FAE5'], 
//         hoverBackgroundColor: ['#10B981', '#D1FAE5'],
//         borderWidth: 0,
//         cutout: '80%',
//       },
//     ],
//   };

//   const options = {
//     plugins: {
//       legend: { display: false },
//       tooltip: { enabled: false },
//     },
//     maintainAspectRatio: false,
//   };

//   // Conditionally show an "up arrow" if changePercent >= 0 or "down arrow" if < 0
//   const isNegativeChange = changePercent < 0;
//   const changeColor = isNegativeChange ? 'text-red-500' : 'text-green-500';
//   const arrowPath = isNegativeChange
//     ? 'M10 7.414l4.293 4.293 1.414-1.414L10 4.586l-5.707 5.707 1.414 1.414z'
//     : 'M10 12.586l4.293-4.293 1.414 1.414L10 15.414l-5.707-5.707 1.414-1.414z';

//   if (isLoading) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-sm w-full p-4 rounded-lg shadow-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 flex items-center justify-center h-48"
//       >
//         <span className="text-sm text-gray-500 dark:text-gray-300">Loading...</span>
//       </motion.div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-sm w-full p-4 rounded-lg shadow-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100"
//     >
//       <div className="flex justify-between items-start">
//         <h2 className="text-lg font-semibold">Attendance</h2>
//         {/* <div className={`flex items-center text-sm ${changeColor}`}>
//           <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 20 20">
//             <path d={arrowPath} />
//           </svg>
//           <span>{Math.abs(changePercent)}%</span>
//         </div> */}
//       </div>

//       <div className="relative w-32 h-32 mx-auto my-4">
//         <Doughnut data={data} options={options} />
//         <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
//           <span className="text-xl font-semibold">{clampedPercent}%</span>
//           <span className="text-xs text-gray-500 dark:text-gray-400">
//             Attendance
//           </span>
//         </div>
//       </div>

//       <div className="flex flex-col space-y-1 text-sm mt-2">
//         <div className="flex justify-between">
//           <span className="font-medium">Present</span>
//           <span>{present}</span>
//         </div>
//         <div className="flex justify-between">
//           <span className="font-medium">Absent</span>
//           <span>{absent}</span>
//         </div>
//         <div className="flex justify-between">
//           <span className="font-medium">Leaves</span>
//           <span>{leaves}</span>
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
import { 
  FiUsers, 
  FiUserCheck, 
  FiUserX, 
  FiCalendar,
  FiTrendingUp,
  FiTrendingDown,
  FiLoader
} from 'react-icons/fi';
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
        backgroundColor: ['#6366f1', '#f1f5f9'], 
        hoverBackgroundColor: ['#4f46e5', '#e2e8f0'],
        borderWidth: 0,
        cutout: '75%',
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  const isNegativeChange = changePercent < 0;
  const changeColor = isNegativeChange ? 'text-red-400' : 'text-emerald-400';
  const TrendIcon = isNegativeChange ? FiTrendingDown : FiTrendingUp;

  const containerVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-full min-h-[320px] lg:min-h-[280px] p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl backdrop-blur-sm flex items-center justify-center"
      >
        <div className="flex flex-col items-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <FiLoader className="w-8 h-8 text-indigo-500" />
          </motion.div>
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Loading attendance data...
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="w-full h-full min-h-[320px] lg:min-h-[280px] p-6 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-100 to-transparent dark:from-indigo-900/20 rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100 to-transparent dark:from-purple-900/20 rounded-full translate-y-12 -translate-x-12" />
      
      {/* Header */}
      <motion.div 
        variants={itemVariants}
        className="flex justify-between items-start mb-6 relative z-10"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
            <FiUsers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              Attendance
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Monthly Overview
            </p>
          </div>
        </div>
        
        <motion.div 
          variants={itemVariants}
          className={`flex items-center space-x-1 px-2 py-1 rounded-lg bg-opacity-10 ${
            isNegativeChange ? 'bg-red-100 dark:bg-red-900/20' : 'bg-emerald-100 dark:bg-emerald-900/20'
          }`}
        >
          <TrendIcon className={`w-3 h-3 ${changeColor}`} />
          <span className={`text-xs font-semibold ${changeColor}`}>
            {Math.abs(changePercent)}%
          </span>
        </motion.div>
      </motion.div>

      {/* Chart Section */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col lg:flex-row items-center justify-between mb-6 space-y-4 lg:space-y-0"
      >
        <div className="relative">
          <motion.div 
            variants={pulseVariants}
            animate="pulse"
            className="w-24 h-24 lg:w-28 lg:h-28"
          >
            <Doughnut data={data} options={options} />
          </motion.div>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
              className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-100"
            >
              {clampedPercent}%
            </motion.span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 lg:grid-cols-1 gap-3 lg:gap-2 w-full lg:w-auto lg:ml-6">
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col lg:flex-row lg:items-center space-y-1 lg:space-y-0 lg:space-x-3 p-3 lg:p-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800"
          >
            <div className="flex items-center justify-center lg:justify-start">
              <FiUserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-center lg:text-left">
              <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                Present
              </p>
              <p className="text-lg lg:text-base font-bold text-emerald-800 dark:text-emerald-200">
                {present}
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col lg:flex-row lg:items-center space-y-1 lg:space-y-0 lg:space-x-3 p-3 lg:p-2 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
          >
            <div className="flex items-center justify-center lg:justify-start">
              <FiUserX className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
            <div className="text-center lg:text-left">
              <p className="text-xs font-medium text-red-700 dark:text-red-300">
                Absent
              </p>
              <p className="text-lg lg:text-base font-bold text-red-800 dark:text-red-200">
                {absent}
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col lg:flex-row lg:items-center space-y-1 lg:space-y-0 lg:space-x-3 p-3 lg:p-2 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
          >
            <div className="flex items-center justify-center lg:justify-start">
              <FiCalendar className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="text-center lg:text-left">
              <p className="text-xs font-medium text-amber-700 dark:text-amber-300">
                Leaves
              </p>
              <p className="text-lg lg:text-base font-bold text-amber-800 dark:text-amber-200">
                {leaves}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div 
        variants={itemVariants}
        className="relative z-10"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
            Overall Performance
          </span>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
            {clampedPercent}%
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${clampedPercent}%` }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full relative"
          >
            <div className="absolute inset-0 bg-white opacity-30 animate-pulse rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AttendanceCard;