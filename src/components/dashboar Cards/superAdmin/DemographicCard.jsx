

import { useEffect } from "react";
import { motion } from "framer-motion";
import { FiUsers, FiTrendingUp, FiEye } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { RiMenLine, RiWomenLine } from "react-icons/ri";
import { useDashboardStore } from "../../../store/useDashboardStore";

function DemographicCard() {
  const {
    totalUsers,
    maleCount,
    femaleCount,
    ageDistribution,
    fetchDashboardStats,
  } = useDashboardStore();

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  const otherCount = totalUsers - maleCount - femaleCount;
  const genderSegments = [
    { label: "Male", count: maleCount, icon: RiMenLine },
    { label: "Female", count: femaleCount, icon: RiWomenLine },
  ];

  const genderData = genderSegments.map((seg) => {
    const pct = totalUsers ? ((seg.count / totalUsers) * 100).toFixed(1) : 0;
    return { ...seg, percentage: pct };
  });

  const colorMap = {
    "Below 18 ": { 
      bg: "from-red-500 to-pink-500", 
      text: "text-red-400",
      glow: "shadow-red-500/20"
    },
    "18 - 30 ": { 
      bg: "from-purple-500 to-pink-500", 
      text: "text-purple-400",
      glow: "shadow-purple-500/20"
    },
    "31 - 40 ": { 
      bg: "from-emerald-500 to-teal-500", 
      text: "text-emerald-400",
      glow: "shadow-emerald-500/20"
    },
    "41 - 50 ": { 
      bg: "from-blue-500 to-cyan-500", 
      text: "text-blue-400",
      glow: "shadow-blue-500/20"
    },
    "51 - 60 ": { 
      bg: "from-violet-500 to-purple-500", 
      text: "text-violet-400",
      glow: "shadow-violet-500/20"
    },
    "61 - 90 ": { 
      bg: "from-gray-500 to-slate-500", 
      text: "text-gray-400",
      glow: "shadow-gray-500/20"
    },
  };

  const ageData = (ageDistribution || []).map((item) => {
    const colorConfig = colorMap[item.range] || { 
      bg: "from-gray-400 to-gray-500", 
      text: "text-gray-400",
      glow: "shadow-gray-500/20"
    };
    return {
      label: item.range,
      ...colorConfig,
      count: `${item.count}`,
      percentage: item.percentage,
    };
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="
        relative overflow-hidden
        w-full h-full
        bg-white/80 dark:bg-gray-900/80
        backdrop-blur-xl
        border border-white/20 dark:border-gray-700/50
        rounded-xl sm:rounded-2xl lg:rounded-3xl
        shadow-lg sm:shadow-xl lg:shadow-2xl shadow-black/10 dark:shadow-black/40
        p-3 sm:p-4 lg:p-6
        
      
        flex flex-col
        min-h-0
      "
    >
      {/* Animated Background Glow */}
      <div className=" rounded-full blur-2xl sm:blur-3xl animate-pulse" />
      <div className=" rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000" />

      {/* Header */}
      <motion.div 
        variants={itemVariants}
        className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8 relative z-10 flex-shrink-0"
      >
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 min-w-0">
          <motion.div 
            // whileHover={{ rotate: 360, scale: 1.1 }}
            // transition={{ duration: 0.8 }}
            className="
              p-2 sm:p-2.5 lg:p-3 rounded-xl sm:rounded-xl lg:rounded-2xl
              bg-gradient-to-br from-blue-500 to-purple-600
              shadow-md sm:shadow-lg shadow-blue-500/25
              flex-shrink-0
            "
          >
            <HiOutlineUserGroup className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
          </motion.div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent truncate">
              Employee Demographics
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hidden sm:block">Real-time insights</p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            p-1.5 sm:p-2 rounded-lg sm:rounded-xl
            bg-gray-100/80 dark:bg-gray-800/80
            hover:bg-gray-200/80 dark:hover:bg-gray-700/80
            border border-gray-200/50 dark:border-gray-600/50
            transition-colors duration-200
            flex-shrink-0
          "
        >
          <FiEye className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600 dark:text-gray-400" />
        </motion.button>
      </motion.div>

      {/* Total Count Display */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col items-center mb-4 sm:mb-6 lg:mb-8 relative z-10 flex-shrink-0"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="
            relative p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-2xl lg:rounded-3xl
            bg-gradient-to-br from-slate-50 to-slate-100
            dark:from-gray-800/50 dark:to-gray-900/50
            border border-slate-200/50 dark:border-gray-700/50
            shadow-lg sm:shadow-xl shadow-slate-900/5 dark:shadow-black/20
            w-full max-w-xs mx-auto
          "
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl sm:rounded-2xl lg:rounded-3xl" />
          <div className="relative flex flex-col items-center">
            <motion.span 
              className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {totalUsers}
            </motion.span>
            <span className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">
              Total Employees
            </span>
          </div>
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* Gender Distribution */}
      <motion.div variants={itemVariants} className="mb-4 sm:mb-6 lg:mb-8 relative z-10 flex-shrink-0">
        <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4 flex items-center gap-2">
          <FiUsers className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
          <span className="truncate">Gender Distribution</span>
        </h3>
        
        <div className="flex gap-2 sm:gap-3">
          {genderData.map((item, index) => {
            const Icon = item.icon;
            const gradients = {
              Male: "from-blue-500 to-cyan-500",
              Female: "from-pink-500 to-rose-500"
            };
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                className="
                  flex-1 p-2 sm:p-3 lg:p-4 rounded-xl sm:rounded-xl lg:rounded-2xl
                  bg-white/50 dark:bg-gray-800/50
                  border border-gray-200/50 dark:border-gray-700/50
                  backdrop-blur-sm
                  hover:shadow-lg transition-all duration-300
                  min-w-0
                "
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br ${gradients[item.label]} shadow-md sm:shadow-lg flex-shrink-0`}>
                    <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                      {item.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {item.percentage}%
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Age Distribution */}
      <motion.div variants={itemVariants} className="relative z-10 flex-1 min-h-0 flex flex-col">
        <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4 flex items-center gap-2 flex-shrink-0">
          <FiTrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500" />
          <span className="truncate">Age Distribution</span>
        </h3>

        {/* Modern Progress Bar */}
        <div className="mb-4 sm:mb-6 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden flex-shrink-0">
          <div className="flex h-3 sm:h-4 rounded-lg sm:rounded-xl overflow-hidden">
            {ageData.map((item, index) => {
              const numeric = parseFloat(item.percentage);
              const barWidth = `${numeric}%`;
              return (
                <motion.div
                  key={index}
                  className={`bg-gradient-to-r ${item.bg} ${item.glow} shadow-sm sm:shadow-lg`}
                  style={{ width: barWidth }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              );
            })}
          </div>
        </div>

        {/* Age Groups - Scrollable on small screens */}
        <div className="space-y-2 sm:space-y-3 flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 dark:scrollbar-track-gray-800 dark:scrollbar-thumb-gray-600">
          {ageData.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ x: 4 }}
              className="
                flex items-center justify-between
                p-2 sm:p-3 rounded-lg sm:rounded-xl
                bg-gray-50/80 dark:bg-gray-800/50
                border border-gray-200/50 dark:border-gray-700/30
                hover:bg-gray-100/80 dark:hover:bg-gray-700/50
                transition-all duration-200
                min-w-0
              "
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <motion.div 
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r ${item.bg} ${item.glow} shadow-sm flex-shrink-0`}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                />
                <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                  {item.label.trim()}
                </span>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                <span className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200">
                  {item.count}
                </span>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`
                    px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold
                    bg-gradient-to-r ${item.bg}
                    text-white shadow-sm
                  `}
                >
                  {item.percentage}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default DemographicCard;
