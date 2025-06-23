


// import React from "react";
// import { getColorFromPercentage } from "../../../utils/helpers";

// const KeyPerformanceMetrics = ({ performanceData }) => {
//   // Calculate the overall performance score
//   const totalScore = performanceData.reduce(
//     (acc, item) => acc + item.percentage,
//     0
//   );
//   const overallPerformanceScore = performanceData.length
//     ? (totalScore / performanceData.length).toFixed(2)
//     : 0;

//   return (
//     <div className="mt-4 p-4 border rounded shadow dark:bg-gray-800 dark:border-gray-700 dark:text-white">
//       <h2 className="font-semibold text-xl mb-2">Key Performance Metrics</h2>
//       <table className="w-full border-collapse text-left">
//         <thead className="border-b">
//           <tr>
//             <th className="p-2">Category</th>
//             <th className="p-2">Performance</th>
//             <th className="p-2">Score (%)</th>
//           </tr>
//         </thead>
//         <tbody>
//           {performanceData.map((item, index) => (
//             <tr key={index} className="border-b last:border-none">
//               <td className="p-2">{item.category}</td>
//               <td className="p-2">
//                 <div
//                   className={`inline-block px-2 py-1 text-sm rounded text-black ${
//                     getColorFromPercentage(item.percentage)
//                   }`}
//                 >
//                   {item.percentage > 0 ? `${item.percentage}%` : "0%"}
//                 </div>
//               </td>
//               <td className="p-2">{item.percentage}%</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <h3 className="mt-3 font-medium">
//         Overall Performance Score: {overallPerformanceScore}%
//       </h3>
//     </div>
//   );
// };

// export default KeyPerformanceMetrics;



import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTrophy,
  FaChartLine,
  FaPercentage,
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimes,
  FaAward,
  FaChartBar,
  FaBullseye
} from "react-icons/fa";
import {
  HiTrendingUp,
  HiTrendingDown,
  HiCheck,
  HiExclamation,
  HiX
} from "react-icons/hi";

// Enhanced helper functions with modern color schemes
const getColorFromPercentage = (percentage) => {
  if (percentage >= 80) return "bg-emerald-500";
  if (percentage >= 60) return "bg-blue-500";
  if (percentage >= 40) return "bg-amber-500";
  if (percentage >= 20) return "bg-orange-500";
  return "bg-red-500";
};

const getTextColorFromPercentage = (percentage) => {
  if (percentage >= 80) return "text-emerald-600 dark:text-emerald-400";
  if (percentage >= 60) return "text-blue-600 dark:text-blue-400";
  if (percentage >= 40) return "text-amber-600 dark:text-amber-400";
  if (percentage >= 20) return "text-orange-600 dark:text-orange-400";
  return "text-red-600 dark:text-red-400";
};

const getBgColorFromPercentage = (percentage) => {
  if (percentage >= 80) return "bg-emerald-100 dark:bg-emerald-900/20";
  if (percentage >= 60) return "bg-blue-100 dark:bg-blue-900/20";
  if (percentage >= 40) return "bg-amber-100 dark:bg-amber-900/20";
  if (percentage >= 20) return "bg-orange-100 dark:bg-orange-900/20";
  return "bg-red-100 dark:bg-red-900/20";
};

const getPerformanceLevel = (percentage) => {
  if (percentage >= 90) return { level: "Exceptional", icon: FaTrophy, emoji: "🏆" };
  if (percentage >= 80) return { level: "Excellent", icon: FaAward, emoji: "🥇" };
  if (percentage >= 70) return { level: "Good", icon: FaCheckCircle, emoji: "✅" };
  if (percentage >= 60) return { level: "Satisfactory", icon: HiCheck, emoji: "👍" };
  if (percentage >= 40) return { level: "Needs Improvement", icon: HiExclamation, emoji: "⚠️" };
  if (percentage >= 20) return { level: "Poor", icon: FaExclamationTriangle, emoji: "⚡" };
  return { level: "Critical", icon: FaTimes, emoji: "❌" };
};

const getTrendIcon = (percentage) => {
  if (percentage >= 70) return HiTrendingUp;
  if (percentage >= 40) return FaMinus;
  return HiTrendingDown;
};

const KeyPerformanceMetrics = ({ performanceData }) => {
  // Calculate the overall performance score
  const totalScore = performanceData.reduce(
    (acc, item) => acc + item.percentage,
    0
  );
  const overallPerformanceScore = performanceData.length
    ? (totalScore / performanceData.length).toFixed(1)
    : 0;

  const overallLevel = getPerformanceLevel(overallPerformanceScore);
  const OverallIcon = overallLevel.icon;

  // Animation variants
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
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (percentage) => ({
      width: `${percentage}%`,
      transition: { duration: 1, delay: 0.2, ease: "easeOut" }
    })
  };

  // Sort data by performance for better visualization
  const sortedData = [...performanceData].sort((a, b) => b.percentage - a.percentage);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden max-w-2xl"
    >
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/10 dark:via-purple-900/10 dark:to-pink-900/10 p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
              <FaChartLine className="text-indigo-600 dark:text-indigo-400 text-xl" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Performance Metrics
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Analysis across all categories
              </p>
            </div>
          </div>
          
          {/* Overall Score Display */}
          <div className="text-right">
            <div className="text-xs text-gray-500 dark:text-gray-400">Overall Score</div>
            <div className={`text-2xl font-bold ${getTextColorFromPercentage(overallPerformanceScore)} flex items-center space-x-1`}>
              <span className="text-lg">{overallLevel.emoji}</span>
              <span>{overallPerformanceScore}%</span>
            </div>
            <div className={`text-xs font-medium ${getTextColorFromPercentage(overallPerformanceScore)}`}>
              {overallLevel.level}
            </div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-gray-600 dark:text-gray-400">Progress</span>
            <span className="text-gray-600 dark:text-gray-400">{overallPerformanceScore}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${getColorFromPercentage(overallPerformanceScore)}`}
              variants={progressVariants}
              custom={overallPerformanceScore}
              initial="hidden"
              animate="visible"
            />
          </div>
        </div>
      </div>

      {/* Performance Categories */}
      <div className="p-4">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Performance
                </th>
                <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Level
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <AnimatePresence>
                {sortedData.map((item, index) => {
                  const level = getPerformanceLevel(item.percentage);
                  const TrendIcon = getTrendIcon(item.percentage);
                  const LevelIcon = level.icon;
                  
                  return (
                    <motion.tr
                      key={index}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                    >
                      <td className="py-3 px-2">
                        <div className="flex items-center space-x-2">
                          <div className={`p-1 rounded ${getBgColorFromPercentage(item.percentage)}`}>
                            <FaBullseye className={`w-3 h-3 ${getTextColorFromPercentage(item.percentage)}`} />
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {item.category}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="w-full">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className={`font-medium ${getTextColorFromPercentage(item.percentage)}`}>
                              {item.percentage}%
                            </span>
                            <TrendIcon className={`w-3 h-3 ${getTextColorFromPercentage(item.percentage)}`} />
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                            <motion.div
                              className={`h-full rounded-full ${getColorFromPercentage(item.percentage)}`}
                              variants={progressVariants}
                              custom={item.percentage}
                              initial="hidden"
                              animate="visible"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center space-x-1">
                          <LevelIcon className={`w-3 h-3 ${getTextColorFromPercentage(item.percentage)}`} />
                          <span className={`text-xs font-medium ${getTextColorFromPercentage(item.percentage)}`}>
                            {level.level}
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          <AnimatePresence>
            {sortedData.map((item, index) => {
              const level = getPerformanceLevel(item.percentage);
              const TrendIcon = getTrendIcon(item.percentage);
              const LevelIcon = level.icon;
              
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className={`rounded-lg p-3 border ${getBgColorFromPercentage(item.percentage)} border-gray-200 dark:border-gray-600`}
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm`}>
                        <FaBullseye className={`w-4 h-4 ${getTextColorFromPercentage(item.percentage)}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {item.category}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Category #{index + 1}
                        </p>
                      </div>
                    </div>
                    <TrendIcon className={`w-5 h-5 ${getTextColorFromPercentage(item.percentage)}`} />
                  </div>

                  {/* Performance Display */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Performance Score</span>
                      <span className={`text-2xl font-bold ${getTextColorFromPercentage(item.percentage)}`}>
                        {item.percentage}%
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <motion.div
                        className={`h-full rounded-full ${getColorFromPercentage(item.percentage)}`}
                        variants={progressVariants}
                        custom={item.percentage}
                        initial="hidden"
                        animate="visible"
                      />
                    </div>

                    {/* Level Display */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <LevelIcon className={`w-4 h-4 ${getTextColorFromPercentage(item.percentage)}`} />
                        <span className={`text-sm font-medium ${getTextColorFromPercentage(item.percentage)}`}>
                          {level.level}
                        </span>
                      </div>
                      <span className="text-lg">{level.emoji}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Performance Summary Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Best Performer */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-lg p-3 border border-green-200 dark:border-green-800"
          >
            <div className="flex items-center space-x-2">
              <div className="p-1 bg-green-100 dark:bg-green-900/20 rounded">
                <FaTrophy className="text-green-600 dark:text-green-400 w-3 h-3" />
              </div>
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Best</div>
                <div className="font-semibold text-gray-900 dark:text-white text-xs truncate">
                  {sortedData[0]?.category || "N/A"}
                </div>
                <div className="text-green-600 dark:text-green-400 font-bold text-sm">
                  {sortedData[0]?.percentage || 0}%
                </div>
              </div>
            </div>
          </motion.div>

          {/* Categories Count */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-lg p-3 border border-blue-200 dark:border-blue-800"
          >
            <div className="flex items-center space-x-2">
              <div className="p-1 bg-blue-100 dark:bg-blue-900/20 rounded">
                <FaChartBar className="text-blue-600 dark:text-blue-400 w-3 h-3" />
              </div>
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Total</div>
                <div className="font-semibold text-gray-900 dark:text-white text-xs">
                  Categories
                </div>
                <div className="text-blue-600 dark:text-blue-400 font-bold text-sm">
                  {performanceData.length}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Overall Rating */}
          <motion.div
            variants={itemVariants}
            className={`rounded-lg p-3 border ${getBgColorFromPercentage(overallPerformanceScore)} border-gray-200 dark:border-gray-600`}
          >
            <div className="flex items-center space-x-2">
              <div className="p-1 bg-white dark:bg-gray-800 rounded shadow-sm">
                <OverallIcon className={`w-3 h-3 ${getTextColorFromPercentage(overallPerformanceScore)}`} />
              </div>
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Rating</div>
                <div className="font-semibold text-gray-900 dark:text-white text-xs">
                  {overallLevel.level}
                </div>
                <div className={`font-bold text-sm ${getTextColorFromPercentage(overallPerformanceScore)}`}>
                  {overallPerformanceScore}%
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default KeyPerformanceMetrics;