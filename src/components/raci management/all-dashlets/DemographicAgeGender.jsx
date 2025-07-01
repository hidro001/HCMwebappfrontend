import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiUser,
  FiUserCheck,
  FiUserX,
  FiTrendingUp,
  FiPieChart,
} from "react-icons/fi";
import { BiMale, BiFemale, BiUser } from "react-icons/bi";
import {
  MdChildCare,
  MdSchool,
  MdWork,
  MdBusinessCenter,
  MdElderly,
} from "react-icons/md";
import useDemographicsStore from "../../../store/analytics dashboards cards/useDemographicsStore"; // adjust path
import DetailModal from "./BaseModal"; // ① add
import { useDrilldown } from "./useDrilldown"; // ① add

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DemographicAgeGender() {
  // Get store data and the fetch action
  const { demographicsData, loading, error, fetchDemographics } =
    useDemographicsStore();
  const drill = useDrilldown();

  // On mount, fetch the data from the API
  useEffect(() => {
    fetchDemographics();
  }, [fetchDemographics]);

  const handleCardClick1 = () => {
    if (drill.open || drill.loading) return; // <- key line
    drill.fetch("demographics");
  };

  const handleCardClick = () => {
    if (drill.open || drill.loading) return; // <- key line
    drill.fetch("compliance");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const chartVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.3,
      },
    },
  };

  // Handle loading state
  if (loading) {
    return (
      <motion.div
        className="flex flex-col w-full rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-3">
            <motion.div
              className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span className="text-gray-600 dark:text-gray-400">
              Loading demographics...
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <motion.div
        className="flex flex-col w-full rounded-2xl bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 shadow-xl border border-red-200 dark:border-red-700 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-3">
            <FiUserX className="w-12 h-12 text-red-500" />
            <span className="text-red-600 dark:text-red-400">
              Error: {error}
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  // Handle no data state
  if (!demographicsData) return null;

  const { totalUsers, maleCount, femaleCount, otherCount, ageDistribution } =
    demographicsData;

  // ====== GENDER DATA ======
  const genderConfig = [
    {
      label: "Male",
      count: maleCount,
      color: "#3B82F6",
      gradient: "from-blue-400 to-blue-600",
      icon: BiMale,
    },
    {
      label: "Female",
      count: femaleCount,
      color: "#EC4899",
      gradient: "from-pink-400 to-pink-600",
      icon: BiFemale,
    },
    {
      label: "Other",
      count: otherCount,
      color: "#8B5CF6",
      gradient: "from-purple-400 to-purple-600",
      icon: BiUser,
    },
  ];

  const genderData = {
    labels: genderConfig.map((g) => g.label),
    datasets: [
      {
        data: genderConfig.map((g) => g.count),
        backgroundColor: genderConfig.map((g) => g.color),
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const genderOptions = {
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#374151",
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.raw / total) * 100).toFixed(1);
            return `${context.label}: ${context.raw} (${percentage}%)`;
          },
        },
      },
    },
    cutout: "75%",
    responsive: true,
    maintainAspectRatio: false,
  };

  // ====== AGE DISTRIBUTION ======
  const ageConfig = [
    {
      range: "Below 18",
      count: ageDistribution.below18,
      color: "#EF4444",
      gradient: "from-red-400 to-red-600",
      icon: MdChildCare,
    },
    {
      range: "18 - 30",
      count: ageDistribution.between18_30,
      color: "#F59E0B",
      gradient: "from-amber-400 to-amber-600",
      icon: MdSchool,
    },
    {
      range: "31 - 40",
      count: ageDistribution.between31_40,
      color: "#10B981",
      gradient: "from-emerald-400 to-emerald-600",
      icon: MdWork,
    },
    {
      range: "41 - 50",
      count: ageDistribution.between41_50,
      color: "#3B82F6",
      gradient: "from-blue-400 to-blue-600",
      icon: MdBusinessCenter,
    },
    {
      range: "51+",
      count: ageDistribution.above51,
      color: "#8B5CF6",
      gradient: "from-purple-400 to-purple-600",
      icon: MdElderly,
    },
  ];

  const ageTotal = ageConfig.reduce((acc, item) => acc + item.count, 0);
  const ageDistributionWithPct = ageConfig.map((item) => {
    const pct = ageTotal ? ((item.count / ageTotal) * 100).toFixed(1) : 0;
    return { ...item, pct: parseFloat(pct) };
  });

  const genderSum = genderConfig.reduce((acc, item) => acc + item.count, 0);
  const genderWithPct = genderConfig.map((item) => {
    const pct = genderSum ? ((item.count / genderSum) * 100).toFixed(1) : 0;
    return { ...item, pct: parseFloat(pct) };
  });

  return (
    <motion.div
      onClick={handleCardClick1}
      className="flex flex-col w-full rounded-2xl bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-900 shadow-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header with Gradient Background */}
      <motion.div
        className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 p-4 sm:p-6 text-white overflow-hidden"
        variants={itemVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm"></div>
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <motion.div
              className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <FiUsers className="h-5 w-5 sm:h-6 sm:w-6" />
            </motion.div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold">
                Demographics Overview
              </h2>
              <p className="text-blue-100 text-xs sm:text-sm mt-0.5">
                Age & Gender Distribution
              </p>
            </div>
          </div>
          <motion.div
            className="flex items-center gap-2 bg-white/15 rounded-full px-3 py-1.5 backdrop-blur-sm"
            whileHover={{ scale: 1.02 }}
          >
            <FiTrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm font-medium">Live Data</span>
          </motion.div>
        </div>
      </motion.div>

      <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
        {/* Gender Distribution Section */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <FiPieChart className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
              Gender Distribution
            </h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Donut Chart */}
            <motion.div
              className="relative flex flex-col items-center"
              variants={chartVariants}
            >
              <div className="relative h-40 w-40 sm:h-48 sm:w-48">
                <Doughnut
                  data={genderData}
                  options={genderOptions}
                  onClick={() => drill.fetch("demographics")}
                />
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  <span className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
                    {totalUsers.toLocaleString()}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    Total Users
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Gender Stats */}
            <div className="space-y-3 sm:space-y-4">
              {genderWithPct.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 border border-gray-200/50 dark:border-gray-600/50"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 sm:p-2.5 rounded-lg bg-gradient-to-r ${item.gradient}`}
                      >
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                      <div>
                        <span className="font-medium text-sm sm:text-base text-gray-800 dark:text-gray-200">
                          {item.label}
                        </span>
                        <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          {item.count.toLocaleString()} users
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100">
                        {item.pct}%
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Divider with Icon */}
        <motion.div
          className="flex items-center justify-center"
          variants={itemVariants}
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
          <div className="mx-4 p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
            <FiUser className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 dark:text-gray-400" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
        </motion.div>

        {/* Age Distribution Section */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <FiUserCheck className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
              Age Distribution
            </h3>
          </div>

          {/* Segmented Progress Bar */}
          <motion.div
            className="mb-4 sm:mb-6 h-3 sm:h-4 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 shadow-inner"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="flex h-full">
              {ageDistributionWithPct.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="h-full transition-all duration-300 hover:brightness-110"
                  style={{
                    width: `${item.pct}%`,
                    background: `linear-gradient(135deg, ${item.color}E6, ${item.color})`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.pct}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.1 + 0.5 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Age Groups Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4">
            {ageDistributionWithPct.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-gradient-to-r from-white to-gray-50 dark:from-gray-800/50 dark:to-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 shadow-sm hover:shadow-md transition-all duration-300"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-r ${item.gradient} shadow-lg`}
                    >
                      <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800 dark:text-gray-200 text-xs sm:text-sm">
                        {item.range}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {item.count.toLocaleString()} people
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="px-2 sm:px-2.5 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-xs font-semibold shadow-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      {item.pct}%
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Summary Stats */}
          <motion.div
            className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
            variants={itemVariants}
          >
            <div className="text-center p-3 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200/50 dark:border-blue-700/50">
              <div className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400">
                {Math.max(...ageDistributionWithPct.map((a) => a.pct)).toFixed(
                  1
                )}
                %
              </div>
              <div className="text-xs text-blue-500 dark:text-blue-300">
                Highest
              </div>
            </div>
            <div className="text-center p-3 rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200/50 dark:border-green-700/50">
              <div className="text-base sm:text-lg font-bold text-green-600 dark:text-green-400">
                {Math.min(...ageDistributionWithPct.map((a) => a.pct)).toFixed(
                  1
                )}
                %
              </div>
              <div className="text-xs text-green-500 dark:text-green-300">
                Lowest
              </div>
            </div>
            <div className="text-center p-3 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200/50 dark:border-purple-700/50">
              <div className="text-base sm:text-lg font-bold text-purple-600 dark:text-purple-400">
                {(
                  ageDistributionWithPct.reduce(
                    (acc, item) => acc + item.pct,
                    0
                  ) / ageDistributionWithPct.length
                ).toFixed(1)}
                %
              </div>
              <div className="text-xs text-purple-500 dark:text-purple-300">
                Average
              </div>
            </div>
            <div className="text-center p-3 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border border-amber-200/50 dark:border-amber-700/50">
              <div className="text-base sm:text-lg font-bold text-amber-600 dark:text-amber-400">
                {ageDistributionWithPct.length}
              </div>
              <div className="text-xs text-amber-500 dark:text-amber-300">
                Groups
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <DetailModal
        open={drill.open}
        onClose={drill.close}
        loading={drill.loading}
        rows={drill.rows}
        title="Demographic Distribution – User List"
      />
    </motion.div>
  );
}
