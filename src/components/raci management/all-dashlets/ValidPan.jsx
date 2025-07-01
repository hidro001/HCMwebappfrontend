import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCreditCard,
  FaCheckCircle,
  FaClock,
  FaSync,
  FaExpand,
  FaInfoCircle,
} from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";

import { HiSparkles, HiLightningBolt } from "react-icons/hi";
import "chart.js/auto";
import usePanCardStatsStore from "../../../store/analytics dashboards cards/usePanCardStatsStore";
import DetailModal from "./BaseModal"; // ① add
import { useDrilldown } from "./useDrilldown"; // ① add

const PanCardChart = () => {
  const { data, loading, error, fetchPanCardStats } = usePanCardStatsStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const drill = useDrilldown();

  useEffect(() => {
    fetchPanCardStats();
  }, [fetchPanCardStats]);

  // Extract data
  const completeCount = data?.completeCount || 0;
  const pendingCount = data?.pendingCount || 0;
  const completePercentage = data?.completePercentage || 0;
  const pendingPercentage = data?.pendingPercentage || 0;
  const totalCount = completeCount + pendingCount;

  // Chart configuration
  const chartData = {
    labels: ["Complete", "Pending"],
    datasets: [
      {
        data: [completeCount, pendingCount],
        backgroundColor: ["rgba(34, 197, 94, 0.8)", "rgba(251, 146, 60, 0.8)"],
        hoverBackgroundColor: ["rgba(34, 197, 94, 1)", "rgba(251, 146, 60, 1)"],
        borderWidth: 0,
        borderRadius: 8,
        spacing: 2,
      },
    ],
  };

  const chartOptions = {
    cutout: "75%",
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(17, 24, 39, 0.95)",
        titleColor: "#F9FAFB",
        bodyColor: "#F9FAFB",
        borderColor: "rgba(34, 197, 94, 0.3)",
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: false,
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 13 },
        padding: 12,
        callbacks: {
          label: function (context) {
            const label = context.label;
            const value = context.parsed;
            const percentage = ((value / totalCount) * 100).toFixed(1);
            return `${label}: ${value} cards (${percentage}%)`;
          },
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1200,
      easing: "easeInOutQuart",
    },
  };

  // Loading component
  const LoadingState = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center h-48 space-y-4"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-3 border-green-500 border-t-transparent rounded-full"
      />
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Loading PAN Card stats...
      </p>
    </motion.div>
  );

  // Error component
  const ErrorState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center h-48 space-y-4"
    >
      <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
        <FaInfoCircle className="w-6 h-6 text-red-500" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Failed to load data
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{error}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchPanCardStats}
          className="mt-3 px-4 py-2 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <FaSync className="w-3 h-3" />
          <span>Retry</span>
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
        relative w-full max-w-sm mx-auto
        bg-white dark:bg-gray-800/50 
        backdrop-blur-xl
        border border-gray-200/50 dark:border-gray-700/50
        rounded-2xl
        shadow-lg hover:shadow-xl
        transition-all duration-300 ease-out
        overflow-hidden
        ${isHovered ? "transform scale-[1.02]" : ""}
      `}
    >
      {/* Gradient Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-orange-500/5 pointer-events-none" />

      {/* Header */}
      <div className="relative p-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div
              animate={isHovered ? { rotate: [0, -10, 10, 0] } : { rotate: 0 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-gradient-to-br from-green-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg"
            >
              <FaCreditCard className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                PAN Card Status
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                <HiLightningBolt className="w-3 h-3" />
                <span>Verification Analytics</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FaExpand className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={fetchPanCardStats}
              disabled={loading}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
            >
              <motion.div
                animate={loading ? { rotate: 360 } : { rotate: 0 }}
                transition={{
                  duration: 1,
                  repeat: loading ? Infinity : 0,
                  ease: "linear",
                }}
              >
                <FaSync className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative px-6 pb-6">
        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingState key="loading" />
          ) : error ? (
            <ErrorState key="error" />
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Chart Container */}
              <div className="relative" onClick={() => drill.fetch("pancard")}>
                <div className="relative w-full h-48 mb-6">
                  <Doughnut data={chartData} options={chartOptions} />

                  {/* Center Statistics */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.5,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="text-center"
                    >
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {totalCount}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Total Cards
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* Statistics Cards */}
                <div className="space-y-3">
                  {/* Complete Status */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200/50 dark:border-green-700/50 rounded-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <FaCheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-green-800 dark:text-green-300">
                          Complete Verification
                        </p>
                        <p className="text-xs text-green-600 dark:text-green-400">
                          Fully verified cards
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-800 dark:text-green-300">
                        {completeCount}
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        {completePercentage}%
                      </p>
                    </div>
                  </motion.div>

                  {/* Pending Status */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200/50 dark:border-orange-700/50 rounded-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        <FaClock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-orange-800 dark:text-orange-300">
                          Pending Verification
                        </p>
                        <p className="text-xs text-orange-600 dark:text-orange-400">
                          Awaiting verification
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-orange-800 dark:text-orange-300">
                        {pendingCount}
                      </p>
                      <p className="text-sm text-orange-600 dark:text-orange-400">
                        {pendingPercentage}%
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Expandable Insights */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 p-4 bg-gradient-to-r from-green-50 to-orange-50 dark:from-gray-700/20 dark:to-gray-600/20 rounded-xl border border-gray-200/50 dark:border-gray-600/50"
                    >
                      <div className="flex items-center space-x-2 mb-3">
                        <MdTrendingUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                          Verification Insights
                        </h4>
                      </div>
                      <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                        <p>
                          •{" "}
                          {completePercentage > 70
                            ? "High"
                            : completePercentage > 50
                            ? "Good"
                            : "Low"}{" "}
                          completion rate at {completePercentage}%
                        </p>
                        <p>
                          • {pendingCount} cards require immediate attention
                        </p>
                        <p>• Average processing time: 2-3 business days</p>
                        <p>
                          • {Math.round((completeCount / totalCount) * 100)}%
                          verification success rate
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-yellow-500 to-orange-500" />
      <DetailModal
        open={drill.open}
        onClose={drill.close}
        loading={drill.loading}
        rows={drill.rows}
        title="Valid Pan – User List"
      />
    </motion.div>
  );
};

export default PanCardChart;
