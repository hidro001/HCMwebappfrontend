import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
  HiOutlineUsers,
  HiOutlineDotsHorizontal,
  HiOutlineRefresh,
  HiOutlineChartBar,
} from "react-icons/hi";
import { useDashboardStore } from "../../../store/useDashboardStore";
import LocationModal from "./LocationModal"; 

function EmployeeStatusChart({ totalUsers, employeesPerEmployeeType = [],}) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    fetchDashboardStats,
    attendanceDetails,
    attendanceDetailsLoading,
    fetchAttendanceDetails,
  } = useDashboardStore();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchDashboardStats();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const [openModal, setOpenModal] = useState(false); 

  useEffect(() => {
    if (openModal && attendanceDetails.length === 0) {
      fetchAttendanceDetails();
    }
  }, [openModal]);

  const labels = employeesPerEmployeeType.map(
    (item) => item.employee_Type || "Unknown"
  );
  const dataValues = employeesPerEmployeeType.map((item) => item.count);

  
  const colors = [
    "#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#06B6D4", "#84CC16",
  ];
  const backgroundColors = dataValues.map((_, i) => colors[i % colors.length]);

  const data = {
    labels,
    datasets: [
      {
        label: "Employees",
        data: dataValues,
        backgroundColor: backgroundColors,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  // Responsive chart options
  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index",
    },
    scales: {
      x: {
        beginAtZero: true,
        max: totalUsers > 0 ? totalUsers : undefined,
        grid: {
          color: "rgba(156, 163, 175, 0.2)",
        },
        ticks: {
          color: "rgba(107, 114, 128, 0.8)",
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgba(107, 114, 128, 0.8)",
          font: {
            size: 11,
          },
          maxTicksLimit: 6,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.9)",
        titleColor: "#F9FAFB",
        bodyColor: "#F9FAFB",
        borderColor: "rgba(156, 163, 175, 0.2)",
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
      },
    },
  };

  // Animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
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
      y: -2,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const iconVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
      },
    },
  };

  const refreshVariants = {
    spin: {
      rotate: 360,
      transition: {
        duration: 1,
        ease: "linear",
        repeat: isRefreshing ? Infinity : 0,
      },
    },
  };

  return (
    <motion.div
      className="w-full"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={() => setOpenModal(true)}
    >
      <div
        className="
        flex flex-col
        rounded-xl lg:rounded-2xl
        bg-white dark:bg-gray-800
        shadow-lg hover:shadow-xl
        border border-gray-200 dark:border-gray-700
        p-4 sm:p-5 lg:p-6
        text-gray-800 dark:text-gray-100
        transition-all duration-200
        h-full
      "
      >
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.div
              className="p-2 rounded-lg bg-lime-100 dark:bg-lime-900/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HiOutlineUsers className="h-5 w-5 sm:h-6 sm:w-6 text-lime-600 dark:text-lime-400" />
            </motion.div>
            <div>
              <h2 className="text-lime-600 dark:text-lime-400 font-semibold text-sm sm:text-base lg:text-lg">
                Employees By Office Location
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Distribution overview
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Total count badge */}
            <motion.div
              className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <HiOutlineChartBar className="h-3 w-3" />
              {totalUsers || 0}
            </motion.div>

            {/* Refresh button */}
            <motion.button
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <motion.div
                variants={refreshVariants}
                animate={isRefreshing ? "spin" : ""}
              >
                <HiOutlineRefresh className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.div>
            </motion.button>

            {/* Menu button */}
            <motion.button
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <HiOutlineDotsHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-600 to-transparent mb-4"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        />

        {/* Chart Container - Responsive height */}
        <motion.div
          className="w-full flex-1 min-h-[200px] sm:min-h-[240px] lg:min-h-[280px] relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {employeesPerEmployeeType.length > 0 ? (
            <Bar data={data} options={options} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
              <div className="text-center">
                <HiOutlineChartBar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No data available</p>
              </div>
            </div>
          )}

          {/* Loading overlay */}
          {isRefreshing && (
            <motion.div
              className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-white dark:bg-gray-700 shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <HiOutlineRefresh className="h-4 w-4 text-lime-600" />
                </motion.div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Updating...
                </span>
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Summary stats footer */}
        <motion.div
          className="flex items-center justify-between pt-3 mt-3 border-t border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {employeesPerEmployeeType.length} location
            {employeesPerEmployeeType.length !== 1 ? "s" : ""}
          </div>
          <div className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
            Total: {totalUsers || 0} employees
          </div>
        </motion.div>
      </div>
      <LocationModal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        loading={attendanceDetailsLoading}
      />
    </motion.div>
  );
}

export default EmployeeStatusChart;
