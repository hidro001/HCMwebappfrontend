import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineAcademicCap,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineChevronDown,
  HiOutlineExclamationTriangle,
  HiOutlineUsers,
} from "react-icons/hi2";
import DetailModal from "./BaseModal"; // ① add
import { useDrilldown } from "./useDrilldown"; // ① add
import { FaSync } from "react-icons/fa";

import useComplianceCoverageStore from "../../../store/analytics dashboards cards/useComplianceCoverageStore"; // Adjust the path

const ComplianceTrainingCoverageCard = () => {
  // 1) Get store data & actions
  const { data, loading, error, fetchCoverage } = useComplianceCoverageStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");
  const drill = useDrilldown();
  // 2) Fetch coverage on mount
  useEffect(() => {
    fetchCoverage();
  }, [fetchCoverage]);

  const handleRefresh = () => {
    fetchCoverage();
  };
  const handleCardClick = () => {
    if (drill.open || drill.loading) return; // <- key line
    drill.fetch("compliance");
  };

  const periods = ["This Week", "This Month", "Last 3 Months", "This Year"];

  // Loading Component
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm mx-auto p-6 rounded-2xl shadow-lg border
                   bg-gradient-to-br from-white to-gray-50 
                   dark:from-slate-800 dark:to-slate-900
                   dark:border-slate-700/50 border-gray-200/50
                   backdrop-blur-sm h-[420px] sm:h-[450px]"
      >
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-6">
            <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded-lg w-48"></div>
            <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded-lg w-8"></div>
          </div>
          <div className="flex items-center justify-center mb-6">
            <div className="w-40 h-40 sm:w-48 sm:h-48 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Error Component
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm mx-auto p-6 rounded-2xl shadow-lg border
                   bg-gradient-to-br from-red-50 to-red-100 
                   dark:from-red-900/20 dark:to-red-800/20
                   border-red-200 dark:border-red-700/50
                   text-red-800 dark:text-red-200 h-[420px] sm:h-[450px]"
      >
        <div className="flex flex-col items-center justify-center h-full text-center">
          <HiOutlineExclamationTriangle className="w-12 h-12 mb-4 text-red-500" />
          <h3 className="font-semibold text-lg mb-2">Unable to load data</h3>
          <p className="text-sm opacity-80 mb-4">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 
                       transition-colors duration-200 flex items-center gap-2"
          >
            <FaSync className="w-4 h-4" />
            Try Again
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // If no data yet, return null or a placeholder
  if (!data) return null;

  // 4) Extract what we need from the store
  const {
    totalUsers,
    completedCount,
    pendingCount,
    completedPercentage,
    pendingPercentage,
  } = data;

  // Convert to numeric if necessary
  const completedVal = parseFloat(completedPercentage) || 0;
  const pendingVal = parseFloat(pendingPercentage) || 0;

  // Enhanced chart data with gradients
  const chartData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Training Coverage",
        data: [completedVal, pendingVal],
        backgroundColor: [
          "rgba(249, 115, 22, 0.8)", // orange-500
          "rgba(255, 237, 213, 0.8)", // orange-100
        ],
        borderColor: ["rgba(249, 115, 22, 1)", "rgba(255, 237, 213, 1)"],
        borderWidth: 2,
        hoverBackgroundColor: [
          "rgba(249, 115, 22, 0.9)",
          "rgba(255, 237, 213, 0.9)",
        ],
        hoverBorderWidth: 3,
      },
    ],
  };

  const chartOptions = {
    cutout: "75%",
    rotation: -90,
    circumference: 360,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.95)",
        titleColor: "#F9FAFB",
        bodyColor: "#F9FAFB",
        borderColor: "rgba(75, 85, 99, 0.5)",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: (context) => {
            return `${context.label}: ${context.raw}%`;
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1200,
      easing: "easeOutQuart",
    },
  };

  return (
    <motion.div
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-sm mx-auto p-6 rounded-2xl shadow-lg border
                 bg-gradient-to-br from-white via-white to-gray-50/50
                 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900/80
                 border-gray-200/50 dark:border-slate-700/50
                 text-gray-900 dark:text-gray-100 
                 backdrop-blur-sm hover:shadow-xl
                 transition-all duration-300 ease-out
                 h-[420px] sm:h-[450px] relative overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-500 to-yellow-500 rounded-full blur-2xl"></div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-500/10 
                          dark:from-orange-400/20 dark:to-red-400/20"
          >
            <HiOutlineAcademicCap className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h2
              className="font-bold text-base sm:text-lg bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
                           dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent"
            >
              Compliance Training Coverage
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <HiOutlineUsers className="w-3 h-3 text-gray-500 dark:text-gray-400" />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {totalUsers} Employees
              </span>
            </div>
          </div>
        </div>

        {/* Dropdown */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-2 rounded-xl border border-gray-200 dark:border-slate-600
                       bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm
                       hover:bg-gray-50 dark:hover:bg-slate-600/50
                       transition-all duration-200 flex items-center gap-1"
          >
            <HiOutlineChevronDown
              className={`w-4 h-4 transition-transform duration-200 
                                             ${
                                               isDropdownOpen
                                                 ? "rotate-180"
                                                 : ""
                                             }`}
            />
          </motion.button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-40 py-2 
                           bg-white dark:bg-slate-800 rounded-xl shadow-xl border
                           border-gray-200 dark:border-slate-700 z-50 backdrop-blur-sm"
              >
                {periods.map((period) => (
                  <motion.button
                    key={period}
                    whileHover={{ backgroundColor: "rgba(249, 115, 22, 0.1)" }}
                    onClick={() => {
                      setSelectedPeriod(period);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors
                               ${
                                 selectedPeriod === period
                                   ? "text-orange-600 dark:text-orange-400 font-medium"
                                   : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
                               }`}
                  >
                    {period}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative flex items-center justify-center mb-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative w-40 h-40 sm:w-48 sm:h-48"
        >
          <Doughnut data={chartData} options={chartOptions} />

          {/* Center Stats */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
              className="text-center"
            >
              <div
                className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 
                              dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent"
              >
                {completedVal}%
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Completed
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="space-y-3"
      >
        {/* Completed */}
        <div
          className="flex items-center justify-between p-3 rounded-xl
                        bg-gradient-to-r from-orange-50 to-orange-100/50
                        dark:from-orange-900/20 dark:to-orange-800/10
                        border border-orange-200/50 dark:border-orange-700/30"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600"></div>
              <HiOutlineCheckCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="font-medium text-orange-700 dark:text-orange-300 text-sm">
              Completed Training
            </span>
          </div>
          <div className="text-right">
            <div className="font-bold text-orange-800 dark:text-orange-200">
              {completedCount?.toLocaleString() || 0}
            </div>
            <div className="text-xs text-orange-600 dark:text-orange-400">
              {completedVal}%
            </div>
          </div>
        </div>

        {/* Pending */}
        <div
          className="flex items-center justify-between p-3 rounded-xl
                        bg-gradient-to-r from-orange-50/50 to-orange-100/30
                        dark:from-orange-900/10 dark:to-orange-800/5
                        border border-orange-200/30 dark:border-orange-700/20"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-200 to-orange-300"></div>
              <HiOutlineClock className="w-4 h-4 text-orange-400 dark:text-orange-300" />
            </div>
            <span className="font-medium text-orange-600 dark:text-orange-200 text-sm">
              Pending Training
            </span>
          </div>
          <div className="text-right">
            <div className="font-bold text-orange-700 dark:text-orange-100">
              {pendingCount?.toLocaleString() || 0}
            </div>
            <div className="text-xs text-orange-500 dark:text-orange-300">
              {pendingVal}%
            </div>
          </div>
        </div>
      </motion.div>

      {/* Click overlay to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
      <DetailModal
        open={drill.open}
        loading={drill.loading}
        rows={drill.rows}
        onClose={drill.close}
        title="Compliance Training Coverage– User List"
      />
    </motion.div>
  );
};

export default ComplianceTrainingCoverageCard;
