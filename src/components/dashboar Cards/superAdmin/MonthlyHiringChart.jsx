import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  HiTrendingUp,
  HiSwitchHorizontal,
  HiUsers,
  HiChartBar,
} from "react-icons/hi";
import { BsBarChartLine, BsGraphUp } from "react-icons/bs";
import { useDashboardStore } from "../../../store/useDashboardStore";
import { Line, Bar } from "react-chartjs-2";
import HiringModal from "./HiringModal";

function MonthlyHiringChart() {
  const {
    monthlyHiringTrend,
    fetchDashboardStats,
    fetchHiringDetails,
    hiringDetails,
    hiringDetailsLoading,
  } = useDashboardStore();
  const [chartType, setChartType] = useState("line");
  const [isHovered, setIsHovered] = useState(false);
  const [openModal, setOpenModal] = useState(false); // NEW
  const [selectedMY, setSelectedMY] = useState(null); // {month,year}

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  useEffect(() => {
    if (openModal && selectedMY) {
      fetchHiringDetails(selectedMY.month, selectedMY.year);
    }
  }, [openModal, selectedMY]);

  // Prepare labels & data
  const labels = (monthlyHiringTrend || []).map(
    (item) => `${item.month}/${item.year}`
  );
  const dataValues = (monthlyHiringTrend || []).map((item) => item.count);

  // Calculate total hires for display
  const totalHires = dataValues.reduce((sum, count) => sum + count, 0);
  const averageHires =
    totalHires > 0 ? Math.round(totalHires / dataValues.length) : 0;

  // Enhanced color palette for better visual appeal
  const barColors = [
    "#EF4444", // red-500
    "#F59E0B", // amber-500
    "#10B981", // emerald-500
    "#3B82F6", // blue-500
    "#8B5CF6", // violet-500
    "#EC4899", // pink-500
    "#06B6D4", // cyan-500
    "#84CC16", // lime-500
  ];

  // Build the dataset depending on chartType
  const dataset =
    chartType === "line"
      ? {
          label: "Monthly Hires",
          data: dataValues,
          fill: true,
          borderColor: "rgba(16, 185, 129, 1)",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          borderWidth: 3,
          pointBackgroundColor: "rgba(16, 185, 129, 1)",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 8,
          tension: 0.4,
        }
      : {
          label: "Monthly Hires",
          data: dataValues,
          backgroundColor: dataValues.map(
            (_, i) => barColors[i % barColors.length]
          ),
          borderRadius: 8,
          borderWidth: 0,
        };

  // Final chart data object
  const data = {
    labels,
    datasets: [dataset],
  };

  // Enhanced chart options for better responsiveness
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 45,
          minRotation: 0,
          font: {
            size: window.innerWidth < 640 ? 10 : 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          drawBorder: false,
        },
        ticks: {
          font: {
            size: window.innerWidth < 640 ? 10 : 12,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false, // We'll create our own legend
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(16, 185, 129, 1)",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
      },
    },
  };

  const chartRef = useRef(null); // NEW

  const handleChartClick = (evt) => {
    const chart = chartRef.current;
    const points = chart.getElementsAtEventForMode(
      evt,
      "nearest",
      { intersect: true },
      true
    );
    if (!points.length) return;

    const idx = points[0].index;
    const rec = monthlyHiringTrend[idx];
    if (rec) {
      setSelectedMY({ month: rec.month, year: rec.year });
      setOpenModal(true);
    }
  };

  // Render either <Line/> or <Bar/> based on chartType
  const renderChart = () => {
    if (chartType === "line") {
      return (
        <Line
          ref={chartRef}
          data={data}
          options={{ ...options, onClick: handleChartClick }}
        />
      );
    } else {
      return (
        <Bar
          ref={chartRef}
          data={data}
          options={{ ...options, onClick: handleChartClick }}
        />
      );
    }
  };

  const handleToggleChartType = () => {
    setChartType((prev) => (prev === "line" ? "bar" : "line"));
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -5,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: { duration: 0.3 },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { delay: 0.2, duration: 0.5 },
    },
  };

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.4, duration: 0.6 },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.3, duration: 0.5 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="w-full max-w-full rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
    >
      {/* Header Section */}
      <motion.div
        variants={headerVariants}
        className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-700 dark:to-gray-800"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          {/* Title and Icon */}
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.5 }}
              className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30"
            >
              <HiTrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400" />
            </motion.div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
                Monthly Hiring Trend
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Track recruitment progress
              </p>
            </div>
          </div>

          {/* Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleToggleChartType}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 self-start sm:self-auto"
          >
            <motion.div
              animate={{ rotate: chartType === "line" ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            >
              {chartType === "line" ? (
                <HiChartBar className="w-4 h-4" />
              ) : (
                <BsGraphUp className="w-4 h-4" />
              )}
            </motion.div>
            <span className="hidden sm:inline">
              {chartType === "line" ? "Bar View" : "Line View"}
            </span>
            <span className="sm:hidden">
              {chartType === "line" ? "Bar" : "Line"}
            </span>
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        variants={statsVariants}
        className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 ">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <HiUsers className="w-4 h-4 text-blue-500" />
              <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Hires
              </span>
            </div>
            <p className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
              {totalHires}
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <BsBarChartLine className="w-4 h-4 text-emerald-500" />
              <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                Average
              </span>
            </div>
            <p className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
              {averageHires}
            </p>
          </div>
          <div className="text-center col-span-2 sm:col-span-1">
            <div className="flex items-center justify-center gap-1 mb-1">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <HiSwitchHorizontal className="w-4 h-4 text-purple-500" />
              </motion.div>
              <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                View Type
              </span>
            </div>
            <p className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white capitalize">
              {chartType}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Chart Container */}
      <motion.div variants={chartVariants} className="p-4 sm:p-6">
        <div className="relative w-full h-64 sm:h-80 lg:h-96">
          {dataValues.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full"
            >
              {renderChart()}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400"
            >
              <div className="text-center">
                <BsBarChartLine className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No hiring data available</p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Footer with Legend */}
      <div className="px-4 sm:px-6 py-3 bg-gray-50 dark:bg-gray-800 rounded-b-2xl">
        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                chartType === "line"
                  ? "bg-emerald-500"
                  : "bg-gradient-to-r from-red-500 to-lime-500"
              }`}
            ></div>
            <span>Monthly Hires</span>
          </div>
          <span className="hidden sm:inline">
            Last updated: {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>
      <HiringModal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        loading={hiringDetailsLoading}
        hires={hiringDetails}
        month={selectedMY?.month}
        year={selectedMY?.year}
      />
    </motion.div>
  );
}

export default MonthlyHiringChart;
