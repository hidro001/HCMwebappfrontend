

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
        // Updated to match your API response structure
        const { presentDays, halfDays, absentDays } = res.data;
        
        setPresent(presentDays);
        setAbsent(absentDays);
        setLeaves(halfDays);
        
        // Calculate attendance percentage
        const totalDays = presentDays + absentDays + halfDays;
        const calculatedPercent = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
        setAttendancePercent(calculatedPercent);
        
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
        className="w-full h-full min-h-[280px] sm:min-h-[300px] md:min-h-[320px] lg:min-h-[280px] xl:min-h-[300px] 2xl:min-h-[320px] p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl backdrop-blur-sm flex items-center justify-center"
      >
        <div className="flex flex-col items-center space-y-3 sm:space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <FiLoader className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-indigo-500" />
          </motion.div>
          <span className="text-xs sm:text-sm md:text-base lg:text-sm xl:text-base font-medium text-slate-500 dark:text-slate-400 text-center px-2">
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
      className="w-full h-full min-h-[280px] sm:min-h-[300px] md:min-h-[320px] lg:min-h-[280px] xl:min-h-[300px] 2xl:min-h-[320px] p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm relative overflow-hidden"
    >
      {/* Background Decoration - Responsive */}
      <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-gradient-to-bl from-indigo-100 to-transparent dark:from-indigo-900/20 rounded-full -translate-y-8 translate-x-8 sm:-translate-y-12 sm:translate-x-12 md:-translate-y-14 md:translate-x-14 lg:-translate-y-16 lg:translate-x-16" />
      <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gradient-to-tr from-purple-100 to-transparent dark:from-purple-900/20 rounded-full translate-y-6 -translate-x-6 sm:translate-y-8 sm:-translate-x-8 md:translate-y-10 md:-translate-x-10 lg:translate-y-12 lg:-translate-x-12" />
      
      {/* Header - Fully Responsive */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-4 sm:mb-5 md:mb-6 relative z-10 space-y-2 xs:space-y-0"
      >
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
            <FiUsers className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100">
              Attendance
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-500 dark:text-slate-400">
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
          <TrendIcon className={`w-3 h-3 sm:w-4 sm:h-4 ${changeColor}`} />
          <span className={`text-xs sm:text-sm font-semibold ${changeColor}`}>
            {Math.abs(changePercent)}%
          </span>
        </motion.div>
      </motion.div>

      {/* Chart Section - Adaptive Layout */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row items-center justify-between mb-4 sm:mb-5 md:mb-6 space-y-4 lg:space-y-0"
      >
        {/* Chart Container - Responsive Size */}
        <div className="relative flex-shrink-0">
          <motion.div 
            variants={pulseVariants}
            animate="pulse"
            className="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-28 lg:h-28 xl:w-32 xl:h-32 2xl:w-36 2xl:h-36"
          >
            <Doughnut data={data} options={options} />
          </motion.div>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
              className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-slate-800 dark:text-slate-100"
            >
              {clampedPercent}%
            </motion.span>
          </div>
        </div>

        {/* Stats Grid - Fully Responsive */}
        <div className="grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-1 gap-2 sm:gap-3 md:gap-4 lg:gap-2 xl:gap-3 w-full lg:w-auto lg:ml-4 xl:ml-6 2xl:ml-8">
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col xs:flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row items-center lg:items-center space-y-1 lg:space-y-0 lg:space-x-2 xl:space-x-3 p-2 sm:p-3 md:p-4 lg:p-2 xl:p-3 rounded-lg sm:rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800"
          >
            <div className="flex items-center justify-center">
              <FiUserCheck className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-4 lg:h-4 xl:w-5 xl:h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-center lg:text-left xl:text-left">
              <p className="text-xs sm:text-sm md:text-base lg:text-xs xl:text-sm font-medium text-emerald-700 dark:text-emerald-300">
                Present
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-sm xl:text-base 2xl:text-lg font-bold text-emerald-800 dark:text-emerald-200">
                {present}
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col xs:flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row items-center lg:items-center space-y-1 lg:space-y-0 lg:space-x-2 xl:space-x-3 p-2 sm:p-3 md:p-4 lg:p-2 xl:p-3 rounded-lg sm:rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
          >
            <div className="flex items-center justify-center">
              <FiUserX className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-4 lg:h-4 xl:w-5 xl:h-5 text-red-600 dark:text-red-400" />
            </div>
            <div className="text-center lg:text-left xl:text-left">
              <p className="text-xs sm:text-sm md:text-base lg:text-xs xl:text-sm font-medium text-red-700 dark:text-red-300">
                Absent
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-sm xl:text-base 2xl:text-lg font-bold text-red-800 dark:text-red-200">
                {absent}
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col xs:flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row items-center lg:items-center space-y-1 lg:space-y-0 lg:space-x-2 xl:space-x-3 p-2 sm:p-3 md:p-4 lg:p-2 xl:p-3 rounded-lg sm:rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
          >
            <div className="flex items-center justify-center">
              <FiCalendar className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-4 lg:h-4 xl:w-5 xl:h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="text-center lg:text-left xl:text-left">
              <p className="text-xs sm:text-sm md:text-base lg:text-xs xl:text-sm font-medium text-amber-700 dark:text-amber-300">
                Half Day
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-sm xl:text-base 2xl:text-lg font-bold text-amber-800 dark:text-amber-200">
                {leaves}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Progress Bar - Responsive */}
      <motion.div 
        variants={itemVariants}
        className="relative z-10"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs sm:text-sm md:text-base lg:text-sm xl:text-base font-medium text-slate-600 dark:text-slate-400">
            Overall Performance
          </span>
          <span className="text-xs sm:text-sm md:text-base lg:text-sm xl:text-base font-bold text-indigo-600 dark:text-indigo-400">
            {clampedPercent}%
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 sm:h-2 md:h-2.5 lg:h-2 xl:h-2.5 overflow-hidden">
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