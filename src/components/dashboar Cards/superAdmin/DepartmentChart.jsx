import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
  HiOutlineOfficeBuilding,
  HiOutlineDotsHorizontal,
  HiOutlineRefresh,
  HiOutlineChartBar,
  HiOutlineBriefcase,
} from "react-icons/hi";
import { useDashboardStore } from "../../../store/useDashboardStore";
import DepartmentModal from "./DepartmentModal";

function DepartmentChart() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [openModal, setOpenModal] = useState(false); // NEW
  // Pull state + method from Zustand
  const {
    totalUsers,
    employeesPerDepartment = [],
    fetchDashboardStats,
    attendanceDetails,
    attendanceDetailsLoading,
    fetchAttendanceDetails,
  } = useDashboardStore();

  // Fetch data on mount
  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  useEffect(() => {
    if (openModal && attendanceDetails.length === 0) {
      fetchAttendanceDetails();
    }
  }, [openModal]);

  // Handle refresh with animation
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchDashboardStats();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Build the labels and data
  const labels = employeesPerDepartment.map(
    (dept) => dept.department || "Unassigned"
  );
  const dataValues = employeesPerDepartment.map((dept) => dept.count);

  // Enhanced color palette for departments
  const colors = [
    "#3B82F6", // blue-500
    "#EF4444", // red-500
    "#10B981", // emerald-500
    "#F59E0B", // amber-500
    "#8B5CF6", // violet-500
    "#EC4899", // pink-500
    "#06B6D4", // cyan-500
    "#84CC16", // lime-500
    "#F97316", // orange-500
    "#6366F1", // indigo-500
  ];

  const backgroundColors = dataValues.map((_, i) => colors[i % colors.length]);

  // Chart data object
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
          maxTicksLimit: 8,
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
        callbacks: {
          title: function (context) {
            return `Department: ${context[0].label}`;
          },
          label: function (context) {
            const percentage =
              totalUsers > 0
                ? ((context.parsed.x / totalUsers) * 100).toFixed(1)
                : 0;
            return `${context.parsed.x} employees (${percentage}%)`;
          },
        },
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

  // Calculate department stats
  const activeDepartments = employeesPerDepartment.length;
  const largestDept = employeesPerDepartment.reduce(
    (max, dept) => (dept.count > max.count ? dept : max),
    { count: 0, department: "" }
  );

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
              className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HiOutlineOfficeBuilding className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
            </motion.div>
            <div>
              <h2 className="text-blue-600 dark:text-blue-400 font-semibold text-sm sm:text-base lg:text-lg">
                Employee Count By Department
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Department distribution
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Department count badge */}
            <motion.div
              className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <HiOutlineBriefcase className="h-3 w-3" />
              {activeDepartments} dept{activeDepartments !== 1 ? "s" : ""}
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
          {employeesPerDepartment.length > 0 ? (
            <Bar data={data} options={options} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
              <div className="text-center">
                <HiOutlineChartBar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No department data available</p>
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
                  <HiOutlineRefresh className="h-4 w-4 text-blue-600" />
                </motion.div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Updating...
                </span>
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Enhanced summary stats footer */}
        <motion.div
          className="pt-3 mt-3 border-t border-gray-200 dark:border-gray-700 space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {activeDepartments} active department
              {activeDepartments !== 1 ? "s" : ""}
            </div>
            <div className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
              Total: {totalUsers || 0} employees
            </div>
          </div>
        </motion.div>
      </div>
      <DepartmentModal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        loading={attendanceDetailsLoading}
      />
    </motion.div>
  );
}

export default DepartmentChart;
