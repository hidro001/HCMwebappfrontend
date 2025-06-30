import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronDown,
  FiShield,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiRefreshCw,
  FiMaximize2,
  FiFilter,
} from "react-icons/fi";
import { HiOutlineShieldCheck, HiOutlineDocumentCheck } from "react-icons/hi2";
import useVerificationStatsStore from "../../../store/analytics dashboards cards/useVerificationStatsStore";

const StreamliningVerificationChart = () => {
  const { data, loading, error, fetchVerificationStats } =
    useVerificationStatsStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [showDeptDropdown, setShowDeptDropdown] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchVerificationStats();
  }, [fetchVerificationStats]);

  // Set first department as default when data loads
  useEffect(() => {
    if (data && data.length > 0 && !selectedDepartment) {
      setSelectedDepartment(data[0].department || "Unknown");
    }
  }, [data, selectedDepartment]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchVerificationStats();
    setTimeout(() => setRefreshing(false), 1000);
  };

  // Department color mapping
  const getDepartmentColor = (department) => {
    const colors = {
      HR: {
        primary: "#3B82F6",
        secondary: "#60A5FA",
        gradient: "from-blue-500 to-blue-600",
      },
      IT: {
        primary: "#10B981",
        secondary: "#34D399",
        gradient: "from-emerald-500 to-emerald-600",
      },
      Finance: {
        primary: "#F59E0B",
        secondary: "#FBBF24",
        gradient: "from-amber-500 to-amber-600",
      },
      Operations: {
        primary: "#8B5CF6",
        secondary: "#A78BFA",
        gradient: "from-violet-500 to-violet-600",
      },
      Marketing: {
        primary: "#EF4444",
        secondary: "#F87171",
        gradient: "from-red-500 to-red-600",
      },
      Sales: {
        primary: "#06B6D4",
        secondary: "#22D3EE",
        gradient: "from-cyan-500 to-cyan-600",
      },
      Legal: {
        primary: "#84CC16",
        secondary: "#A3E635",
        gradient: "from-lime-500 to-lime-600",
      },
      Security: {
        primary: "#F97316",
        secondary: "#FB923C",
        gradient: "from-orange-500 to-orange-600",
      },
      Admin: {
        primary: "#EC4899",
        secondary: "#F472B6",
        gradient: "from-pink-500 to-pink-600",
      },
      Production: {
        primary: "#6366F1",
        secondary: "#818CF8",
        gradient: "from-indigo-500 to-indigo-600",
      },
    };

    const hash = department.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);

    const colorKeys = Object.keys(colors);
    const colorIndex = Math.abs(hash) % colorKeys.length;

    return colors[colorKeys[colorIndex]] || colors["HR"];
  };

  // Calculate stats for selected department
  const calculateStats = () => {
    if (!data || data.length === 0 || !selectedDepartment)
      return { total: 0, cleared: 0, pending: 0, efficiency: 0 };

    const dept = data.find((d) => d.department === selectedDepartment);
    if (!dept) return { total: 0, cleared: 0, pending: 0, efficiency: 0 };

    const total =
      dept.backgroundCleared +
      dept.backgroundPending +
      dept.policeCleared +
      dept.policePending;
    const cleared = dept.backgroundCleared + dept.policeCleared;
    const pending = dept.backgroundPending + dept.policePending;
    const efficiency = total > 0 ? ((cleared / total) * 100).toFixed(1) : 0;

    return { total, cleared, pending, efficiency };
  };

  const stats = calculateStats();

  // Get data for selected department
  const getSelectedDepartmentData = () => {
    if (!data || !selectedDepartment) return null;

    const dept = data.find((d) => d.department === selectedDepartment);
    if (!dept) return null;

    return {
      department: dept.department,
      backgroundCleared: dept.backgroundCleared,
      backgroundPending: dept.backgroundPending,
      policeCleared: dept.policeCleared,
      policePending: dept.policePending,
    };
  };

  const selectedDeptData = getSelectedDepartmentData();

  // Create chart data for selected department
  const getChartData = () => {
    if (!selectedDeptData) return { labels: [], datasets: [] };

    const deptColor = getDepartmentColor(selectedDeptData.department);

    return {
      labels: ["Background Verification", "Police Verification"],
      datasets: [
        {
          label: "Cleared",
          data: [
            selectedDeptData.backgroundCleared,
            selectedDeptData.policeCleared,
          ],
          backgroundColor: `${deptColor.primary}CC`, // 80% opacity
          borderColor: deptColor.primary,
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        },
        {
          label: "Pending",
          data: [
            selectedDeptData.backgroundPending,
            selectedDeptData.policePending,
          ],
          backgroundColor: `${deptColor.secondary}80`, // 50% opacity
          borderColor: deptColor.secondary,
          borderWidth: 1,
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    };
  };

  const chartData = getChartData();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index",
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.95)",
        titleColor: "#F1F5F9",
        bodyColor: "#CBD5E1",
        borderColor: "#334155",
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: true,
        usePointStyle: true,
        padding: 12,
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 13 },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#64748B",
          font: { size: 11, weight: "500" },
          maxRotation: 45,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "rgba(148, 163, 184, 0.1)",
          drawBorder: false,
        },
        ticks: {
          color: "#64748B",
          font: { size: 11, weight: "500" },
          padding: 8,
        },
        border: {
          display: false,
        },
      },
    },
  };

  const filterOptions = [
    { value: "all", label: "All Departments", icon: FiFilter },
    {
      value: "high-performance",
      label: "High Performance",
      icon: FiTrendingUp,
    },
    { value: "needs-attention", label: "Needs Attention", icon: FiClock },
  ];

  if (loading) {
    return (
      <motion.div
        className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900/50 dark:to-blue-900/10 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-2xl p-6 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center space-y-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-3 border-blue-500/30 border-t-blue-500 rounded-full"
            />
            <p className="text-slate-600 dark:text-slate-400 font-medium">
              Loading verification insights...
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="relative overflow-hidden bg-gradient-to-br from-red-50 to-orange-50/30 dark:from-red-900/20 dark:to-orange-900/10 backdrop-blur-sm border border-red-200/60 dark:border-red-700/60 rounded-2xl p-6 shadow-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <FiShield className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 dark:text-red-400 font-semibold">
              Unable to load verification data
            </p>
            <p className="text-red-500 dark:text-red-500 text-sm mt-2">
              {error}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
            >
              Try Again
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <motion.div
        className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900/50 dark:to-blue-900/10 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-2xl p-6 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <HiOutlineDocumentCheck className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400 font-medium">
              No verification data available
            </p>
            <p className="text-slate-500 dark:text-slate-500 text-sm mt-2">
              Data will appear here once available
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900/50 dark:to-blue-900/10 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -2 }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-emerald-600/5 animate-pulse" />

      {/* Header Section */}
      <div className="relative p-6 pb-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <motion.div
              className="p-2.5 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <HiOutlineShieldCheck className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                Verification Intelligence
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Real-time verification analytics
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Department Selector Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDeptDropdown(!showDeptDropdown)}
                className="flex items-center space-x-2 px-4 py-2.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-600 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 shadow-sm min-w-[180px]"
              >
                <div
                  className="w-3 h-3 rounded-full shadow-sm"
                  style={{
                    backgroundColor: selectedDepartment
                      ? getDepartmentColor(selectedDepartment).primary
                      : "#64748B",
                  }}
                />
                <span className="flex-1 text-left truncate">
                  {selectedDepartment || "Select Department"}
                </span>
                <motion.div
                  animate={{ rotate: showDeptDropdown ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiChevronDown className="w-4 h-4" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {showDeptDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 backdrop-blur-xl border border-slate-200 dark:border-slate-600 rounded-xl shadow-xl z-10 overflow-hidden max-h-60 overflow-y-auto"
                  >
                    {data?.map((dept, index) => (
                      <motion.button
                        key={dept.department}
                        onClick={() => {
                          setSelectedDepartment(dept.department || "Unknown");
                          setShowDeptDropdown(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-sm text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${
                          selectedDepartment === dept.department
                            ? "bg-blue-50 dark:bg-blue-900/20"
                            : ""
                        }`}
                        whileHover={{ x: 4 }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div
                          className="w-3 h-3 rounded-full shadow-sm"
                          style={{
                            backgroundColor: getDepartmentColor(dept.department)
                              .primary,
                          }}
                        />
                        <div className="flex-1">
                          <span
                            className={`font-medium ${
                              selectedDepartment === dept.department
                                ? "text-blue-700 dark:text-blue-300"
                                : "text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            {dept.department || "Unknown"}
                          </span>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {dept.backgroundCleared +
                              dept.policeCleared +
                              dept.backgroundPending +
                              dept.policePending}{" "}
                            total cases
                          </div>
                        </div>
                        {selectedDepartment === dept.department && (
                          <FiCheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Refresh Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-600 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 shadow-sm disabled:opacity-50"
            >
              <motion.div
                animate={{ rotate: refreshing ? 360 : 0 }}
                transition={{
                  duration: 1,
                  repeat: refreshing ? Infinity : 0,
                  ease: "linear",
                }}
              >
                <FiRefreshCw className="w-4 h-4" />
              </motion.div>
            </motion.button>

            {/* Expand Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-600 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 shadow-sm"
            >
              <FiMaximize2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"
        >
          {[
            {
              label: "Total Cases",
              value: stats.total,
              icon: FiShield,
              color: "from-blue-500 to-blue-600",
            },
            {
              label: "Cleared",
              value: stats.cleared,
              icon: FiCheckCircle,
              color: "from-emerald-500 to-emerald-600",
            },
            {
              label: "Pending",
              value: stats.pending,
              icon: FiClock,
              color: "from-amber-500 to-amber-600",
            },
            {
              label: "Efficiency",
              value: `${stats.efficiency}%`,
              icon: FiTrendingUp,
              color: "from-purple-500 to-purple-600",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 dark:border-slate-600/50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    {stat.label}
                  </p>
                  <motion.p
                    key={stat.value}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-1"
                  >
                    {stat.value}
                  </motion.p>
                </div>
                <div
                  className={`p-2 bg-gradient-to-br ${stat.color} rounded-lg shadow-sm`}
                >
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Legend */}
      <div className="px-6 pb-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap items-center gap-6 text-sm"
        >
          {[
            {
              label: "Background (Cleared)",
              color: "#3B82F6",
              bgColor: "rgba(59, 130, 246, 0.1)",
            },
            {
              label: "Background (Pending)",
              color: "#60A5FA",
              bgColor: "rgba(96, 165, 250, 0.1)",
            },
            {
              label: "Police (Cleared)",
              color: "#10B981",
              bgColor: "rgba(16, 185, 129, 0.1)",
            },
            {
              label: "Police (Pending)",
              color: "#22C55E",
              bgColor: "rgba(34, 197, 94, 0.1)",
            },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg backdrop-blur-sm"
              style={{ backgroundColor: item.bgColor }}
            >
              <motion.div
                className="w-3 h-3 rounded-full shadow-sm"
                style={{ backgroundColor: item.color }}
                whileHover={{ scale: 1.2 }}
              />
              <span className="font-medium text-slate-700 dark:text-slate-300 text-xs">
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Chart Container */}
      <motion.div
        layout
        className="px-6 pb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div
          className={`relative bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-600/50 p-4 transition-all duration-500 ${
            isExpanded ? "h-96" : "h-72"
          }`}
        >
          <Bar data={chartData} options={chartOptions} />
        </div>
      </motion.div>

      {/* Ambient lighting effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-emerald-600/20 rounded-2xl blur-xl opacity-30 -z-10" />
    </motion.div>
  );
};

export default StreamliningVerificationChart;
