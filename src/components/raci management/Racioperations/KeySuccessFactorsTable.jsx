// import React from "react";

// const KeySuccessFactorsTable = ({ keySuccessFactors }) => {
//   return (
//     <div className="border rounded p-4 dark:border-gray-700 dark:bg-gray-800">
//       <h2 className="text-lg font-semibold mb-4">Key Success Factors</h2>
//       <table className="w-full border-collapse text-left">
//         <thead>
//           <tr className="border-b dark:border-gray-600">
//             <th className="p-2">Factor</th>
//             <th className="p-2">Score</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Object.keys(keySuccessFactors).map((factor) => (
//             <tr key={factor} className="border-b last:border-none dark:border-gray-600">
//               <td className="p-2">{factor}</td>
//               <td className="p-2">{keySuccessFactors[factor].toFixed(2)}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default KeySuccessFactorsTable;



import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaClipboardList,
  FaUsers,
  FaDollarSign,
  FaBullseye,
  FaGraduationCap,
  FaRocket,
  FaChartLine,
  FaHandshake,
  FaCog,
  FaTrophy,
  FaArrowUp,
  FaArrowDown,
  FaEquals,
  FaSortAmountUp,
  FaSortAmountDown,
  FaPercentage,
  FaEye,
  FaChevronRight,
  FaAward,
  FaExclamationTriangle
} from "react-icons/fa";
import {
  HiTrendingUp,
  HiTrendingDown,
  HiMinusCircle,
  HiChartBar,
  HiSortAscending,
  HiSortDescending
} from "react-icons/hi";

const KeySuccessFactorsTable = ({ keySuccessFactors }) => {
  const [sortBy, setSortBy] = useState("score"); // "name" or "score"
  const [sortOrder, setSortOrder] = useState("desc"); // "asc" or "desc"
  const [viewMode, setViewMode] = useState("cards"); // "cards" or "table"

  // Factor configuration with icons, colors, and names
  const getFactorConfig = (factor) => {
    const configs = {
      businessPlanning: { 
        icon: FaClipboardList, 
        color: "blue", 
        name: "Business Planning",
        description: "Strategic planning and documentation"
      },
      leadership: { 
        icon: FaUsers, 
        color: "purple", 
        name: "Leadership",
        description: "Team management and guidance"
      },
      profitability: { 
        icon: FaDollarSign, 
        color: "green", 
        name: "Profitability",
        description: "Financial performance and margins"
      },
      marketing: { 
        icon: FaBullseye, 
        color: "red", 
        name: "Marketing",
        description: "Customer acquisition and branding"
      },
      personalDevelopment: { 
        icon: FaGraduationCap, 
        color: "indigo", 
        name: "Personal Development",
        description: "Employee growth and training"
      },
      continuousImprovement: { 
        icon: FaRocket, 
        color: "orange", 
        name: "Continuous Improvement",
        description: "Process optimization and innovation"
      },
      revenueSales: { 
        icon: FaChartLine, 
        color: "teal", 
        name: "Revenue & Sales",
        description: "Sales performance and growth"
      },
      employeeEngagement: { 
        icon: FaHandshake, 
        color: "pink", 
        name: "Employee Engagement",
        description: "Staff satisfaction and retention"
      },
      reductionInInefficiencies: { 
        icon: FaCog, 
        color: "yellow", 
        name: "Efficiency Improvement",
        description: "Process streamlining and cost reduction"
      },
      customerService: { 
        icon: FaTrophy, 
        color: "cyan", 
        name: "Customer Service",
        description: "Customer satisfaction and support"
      }
    };
    return configs[factor] || { 
      icon: FaChartBar, 
      color: "gray", 
      name: factor,
      description: "Performance metric"
    };
  };

  // Get score status and styling
  const getScoreStatus = (score) => {
    const percentage = score * 10; // Convert 0-10 to 0-100
    if (percentage >= 80) return { 
      icon: FaArrowUp, 
      color: "text-green-600 dark:text-green-400", 
      bg: "bg-green-100 dark:bg-green-900/20",
      gradient: "from-green-500 to-emerald-500",
      label: "Excellent",
      textColor: "text-green-800 dark:text-green-200"
    };
    if (percentage >= 60) return { 
      icon: HiTrendingUp, 
      color: "text-blue-600 dark:text-blue-400", 
      bg: "bg-blue-100 dark:bg-blue-900/20",
      gradient: "from-blue-500 to-cyan-500",
      label: "Good",
      textColor: "text-blue-800 dark:text-blue-200"
    };
    if (percentage >= 40) return { 
      icon: FaEquals, 
      color: "text-yellow-600 dark:text-yellow-400", 
      bg: "bg-yellow-100 dark:bg-yellow-900/20",
      gradient: "from-yellow-500 to-orange-500",
      label: "Average",
      textColor: "text-yellow-800 dark:text-yellow-200"
    };
    return { 
      icon: FaArrowDown, 
      color: "text-red-600 dark:text-red-400", 
      bg: "bg-red-100 dark:bg-red-900/20",
      gradient: "from-red-500 to-pink-500",
      label: "Needs Focus",
      textColor: "text-red-800 dark:text-red-200"
    };
  };

  // Sort factors
  const sortedFactors = Object.entries(keySuccessFactors).sort((a, b) => {
    if (sortBy === "score") {
      return sortOrder === "asc" ? a[1] - b[1] : b[1] - a[1];
    } else {
      const nameA = getFactorConfig(a[0]).name;
      const nameB = getFactorConfig(b[0]).name;
      return sortOrder === "asc" 
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    }
  });

  // Calculate statistics
  const scores = Object.values(keySuccessFactors);
  const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  const highestScore = Math.max(...scores);
  const lowestScore = Math.min(...scores);
  const topPerformer = Object.entries(keySuccessFactors).find(([_, score]) => score === highestScore);
  const needsAttention = Object.entries(keySuccessFactors).find(([_, score]) => score === lowestScore);

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      {/* Summary Statistics */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 gap-4"
      >
        <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-2">
            <HiChartBar className="text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Average</span>
          </div>
          <p className="text-2xl font-bold text-blue-900 dark:text-blue-100 mt-1">
            {(averageScore * 10).toFixed(1)}%
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/10 rounded-xl p-4 border border-green-200 dark:border-green-800">
          <div className="flex items-center space-x-2">
            <FaAward className="text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-800 dark:text-green-200">Highest</span>
          </div>
          <p className="text-2xl font-bold text-green-900 dark:text-green-100 mt-1">
            {(highestScore * 10).toFixed(1)}%
          </p>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0"
      >
        {/* Sort Controls */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</span>
          <button
            onClick={() => toggleSort("name")}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              sortBy === "name"
                ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <span>Name</span>
            {sortBy === "name" && (
              sortOrder === "asc" ? <HiSortAscending /> : <HiSortDescending />
            )}
          </button>
          <button
            onClick={() => toggleSort("score")}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              sortBy === "score"
                ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <span>Score</span>
            {sortBy === "score" && (
              sortOrder === "asc" ? <HiSortAscending /> : <HiSortDescending />
            )}
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setViewMode("cards")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
              viewMode === "cards"
                ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            Cards
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
              viewMode === "table"
                ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            Table
          </button>
        </div>
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {viewMode === "cards" ? (
          <motion.div
            key="cards"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {sortedFactors.map(([factor, score], index) => {
              const config = getFactorConfig(factor);
              const status = getScoreStatus(score);
              const percentage = score * 10;

              return (
                <motion.div
                  key={factor}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-200"
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      {/* Factor Info */}
                      <div className="flex items-center space-x-3 flex-1">
                        <div className={`p-2 bg-${config.color}-100 dark:bg-${config.color}-900/20 rounded-lg`}>
                          <config.icon className={`text-${config.color}-600 dark:text-${config.color}-400 text-lg`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                            {config.name}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {config.description}
                          </p>
                        </div>
                      </div>

                      {/* Score Display */}
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                              {percentage.toFixed(1)}%
                            </span>
                            <div className={`p-1 rounded ${status.bg}`}>
                              <status.icon className={`${status.color} text-sm`} />
                            </div>
                          </div>
                          <span className={`text-xs font-medium ${status.textColor}`}>
                            {status.label}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          className={`bg-gradient-to-r ${status.gradient} h-2 rounded-full`}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Factor
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Progress
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {sortedFactors.map(([factor, score], index) => {
                    const config = getFactorConfig(factor);
                    const status = getScoreStatus(score);
                    const percentage = score * 10;

                    return (
                      <motion.tr
                        key={factor}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 bg-${config.color}-100 dark:bg-${config.color}-900/20 rounded-lg`}>
                              <config.icon className={`text-${config.color}-600 dark:text-${config.color}-400`} />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {config.name}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {config.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                              {percentage.toFixed(1)}%
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              ({score.toFixed(2)}/10)
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <div className={`p-1 rounded ${status.bg}`}>
                              <status.icon className={`${status.color} text-sm`} />
                            </div>
                            <span className={`text-sm font-medium ${status.textColor}`}>
                              {status.label}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="w-24">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className={`bg-gradient-to-r ${status.gradient} h-2 rounded-full`}
                              />
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Performer & Needs Attention */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Top Performer */}
        <div className="bg-green-50 dark:bg-green-900/10 rounded-xl p-4 border border-green-200 dark:border-green-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <FaTrophy className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-200">Top Performer</p>
              <p className="text-lg font-bold text-green-900 dark:text-green-100">
                {getFactorConfig(topPerformer[0]).name}
              </p>
              <p className="text-sm text-green-700 dark:text-green-300">
                {(topPerformer[1] * 10).toFixed(1)}% score
              </p>
            </div>
          </div>
        </div>

        {/* Needs Attention */}
        <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-4 border border-red-200 dark:border-red-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <FaExclamationTriangle className="text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-red-800 dark:text-red-200">Needs Focus</p>
              <p className="text-lg font-bold text-red-900 dark:text-red-100">
                {getFactorConfig(needsAttention[0]).name}
              </p>
              <p className="text-sm text-red-700 dark:text-red-300">
                {(needsAttention[1] * 10).toFixed(1)}% score
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default KeySuccessFactorsTable;