// import React from "react";

// const PreviousScoresTable = ({ previousScores, setSelectedScore }) => {
//   return (
//     <div className="border rounded p-4 dark:border-gray-700 dark:bg-gray-800">
//       <h3 className="text-lg font-semibold mb-2">Previous Scores</h3>
//       <table className="w-full border-collapse text-left">
//         <thead>
//           <tr className="border-b dark:border-gray-600">
//             <th className="p-2">Date</th>
//             <th className="p-2">Overall Score</th>
//             <th className="p-2">Details</th>
//           </tr>
//         </thead>
//         <tbody>
//           {previousScores.length > 0 ? (
//             previousScores.map((score, index) => (
//               <tr key={index} className="border-b last:border-none dark:border-gray-600">
//                 <td className="p-2">
//                   {new Date(score.date).toLocaleDateString()}
//                 </td>
//                 <td className="p-2">
//                   {(score.overallScore * 10).toFixed(2)}%
//                 </td>
//                 <td className="p-2">
//                   <button
//                     onClick={() => setSelectedScore(score)}
//                     className="px-3 py-1 bg-blue-500 text-white rounded"
//                   >
//                     View Details
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="3" className="p-2 text-center">
//                 No previous scores found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PreviousScoresTable;


import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHistory,
  FaEye,
  FaCalendarAlt,
  FaChartLine,
 
  
  FaEquals,
  FaArrowUp,
  FaArrowDown,
  FaSortAmountUp,
  FaSortAmountDown,
  FaFilter,
  FaSearch,
  FaDownload,
  FaPercentage,
  FaAward,
  FaClock,
  FaExclamationTriangle,
  FaCheckCircle
} from "react-icons/fa";
import {
  HiEye,
  HiCalendar,
  HiTrendingUp,
  HiTrendingDown,
  HiSortAscending,
  HiSortDescending,
  HiSearch,
  HiDownload,
  HiClock
} from "react-icons/hi";

const PreviousScoresTable = ({ previousScores, setSelectedScore }) => {
  const [sortBy, setSortBy] = useState("date"); // "date" or "score"
  const [sortOrder, setSortOrder] = useState("desc"); // "asc" or "desc"
  const [viewMode, setViewMode] = useState("cards"); // "cards" or "table"
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all"); // "all", "week", "month", "quarter", "year"

  // Filter and sort scores
  const filteredAndSortedScores = useMemo(() => {
    let filtered = [...previousScores];

    // Apply date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case "week":
          filterDate.setDate(now.getDate() - 7);
          break;
        case "month":
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case "quarter":
          filterDate.setMonth(now.getMonth() - 3);
          break;
        case "year":
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      filtered = filtered.filter(score => new Date(score.date) >= filterDate);
    }

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(score => 
        new Date(score.date).toLocaleDateString().toLowerCase().includes(searchLower) ||
        (score.overallScore * 10).toFixed(2).includes(searchTerm)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "date") {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      } else {
        return sortOrder === "asc" ? a.overallScore - b.overallScore : b.overallScore - a.overallScore;
      }
    });

    return filtered;
  }, [previousScores, sortBy, sortOrder, searchTerm, dateFilter]);

  // Calculate statistics
  const statistics = useMemo(() => {
    if (previousScores.length === 0) return null;

    const scores = previousScores.map(s => s.overallScore * 10);
    const latest = previousScores[0]?.overallScore * 10 || 0;
    const previous = previousScores[1]?.overallScore * 10 || latest;
    const trend = latest - previous;
    
    return {
      total: previousScores.length,
      latest: latest,
      highest: Math.max(...scores),
      lowest: Math.min(...scores),
      average: scores.reduce((sum, score) => sum + score, 0) / scores.length,
      trend: trend,
      trendDirection: trend > 0 ? "up" : trend < 0 ? "down" : "same"
    };
  }, [previousScores]);

  // Get score status
  const getScoreStatus = (score) => {
    const percentage = score * 10;
    if (percentage >= 80) return { 
      icon: FaCheckCircle, 
      color: "text-green-600 dark:text-green-400", 
      bg: "bg-green-100 dark:bg-green-900/20",
      label: "Excellent",
      gradient: "from-green-500 to-emerald-500"
    };
    if (percentage >= 60) return { 
      icon: FaArrowUp, 
      color: "text-blue-600 dark:text-blue-400", 
      bg: "bg-blue-100 dark:bg-blue-900/20",
      label: "Good",
      gradient: "from-blue-500 to-cyan-500"
    };
    if (percentage >= 40) return { 
      icon: FaEquals, 
      color: "text-yellow-600 dark:text-yellow-400", 
      bg: "bg-yellow-100 dark:bg-yellow-900/20",
      label: "Average",
      gradient: "from-yellow-500 to-orange-500"
    };
    return { 
      icon: FaExclamationTriangle, 
      color: "text-red-600 dark:text-red-400", 
      bg: "bg-red-100 dark:bg-red-900/20",
      label: "Needs Focus",
      gradient: "from-red-500 to-pink-500"
    };
  };

  // Get trend icon and color
  const getTrendConfig = (trend) => {
    if (trend > 0) return { 
      icon: HiTrendingUp, 
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-100 dark:bg-green-900/20"
    };
    if (trend < 0) return { 
      icon: HiTrendingDown, 
      color: "text-red-600 dark:text-red-400",
      bg: "bg-red-100 dark:bg-red-900/20"
    };
    return { 
      icon: FaEquals, 
      color: "text-gray-600 dark:text-gray-400",
      bg: "bg-gray-100 dark:bg-gray-700"
    };
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      short: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      full: date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
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
      {/* Statistics Cards */}
      {statistics && (
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center space-x-2">
              <HiClock className="text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {statistics.total}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">assessments</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center space-x-2">
              <FaPercentage className="text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Latest</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {statistics.latest.toFixed(1)}%
            </p>
            <div className="flex items-center space-x-1 mt-1">
              {(() => {
                const trendConfig = getTrendConfig(statistics.trend);
                return (
                  <>
                    <div className={`p-0.5 rounded ${trendConfig.bg}`}>
                      <trendConfig.icon className={`${trendConfig.color} text-xs`} />
                    </div>
                    <span className={`text-xs font-medium ${trendConfig.color}`}>
                      {Math.abs(statistics.trend).toFixed(1)}%
                    </span>
                  </>
                );
              })()}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center space-x-2">
              <FaAward className="text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Highest</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {statistics.highest.toFixed(1)}%
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">peak score</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center space-x-2">
              <FaChartLine className="text-orange-600 dark:text-orange-400" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Average</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {statistics.average.toFixed(1)}%
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">overall</p>
          </div>
        </motion.div>
      )}

      {/* Controls */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 flex-1">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiSearch className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search scores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
            </div>

            {/* Date Filter */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
            >
              <option value="all">All Time</option>
              <option value="week">Past Week</option>
              <option value="month">Past Month</option>
              <option value="quarter">Past Quarter</option>
              <option value="year">Past Year</option>
            </select>
          </div>

          {/* Sort and View Controls */}
          <div className="flex items-center space-x-4">
            {/* Sort Controls */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort:</span>
              <button
                onClick={() => toggleSort("date")}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  sortBy === "date"
                    ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                <span>Date</span>
                {sortBy === "date" && (
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

            {/* Export Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-200 text-sm"
            >
              <HiDownload className="text-sm" />
              <span className="hidden sm:inline">Export</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      {filteredAndSortedScores.length === 0 ? (
        <motion.div
          variants={itemVariants}
          className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
        >
          <FaHistory className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
            {previousScores.length === 0 ? "No Assessment History" : "No Results Found"}
          </h3>
          <p className="text-gray-500 dark:text-gray-500">
            {previousScores.length === 0 
              ? "Complete your first assessment to see your progress history"
              : "Try adjusting your search or filter criteria"
            }
          </p>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          {viewMode === "cards" ? (
            <motion.div
              key="cards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredAndSortedScores.map((score, index) => {
                const scoreStatus = getScoreStatus(score.overallScore);
                const dateInfo = formatDate(score.date);
                const percentage = score.overallScore * 10;

                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-200"
                  >
                    {/* Card Header */}
                    <div className={`bg-gradient-to-r ${scoreStatus.gradient} p-4 text-white`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <scoreStatus.icon className="text-xl" />
                          <span className="font-semibold">{scoreStatus.label}</span>
                        </div>
                        <span className="text-2xl font-bold">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 space-y-4">
                      {/* Date Info */}
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                          <HiCalendar className="text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {dateInfo.short}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {dateInfo.time}
                          </p>
                        </div>
                      </div>

                      {/* Score Details */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Raw Score:</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {score.overallScore.toFixed(3)}/10
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className={`bg-gradient-to-r ${scoreStatus.gradient} h-2 rounded-full`}
                          />
                        </div>
                      </div>

                      {/* Action Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedScore(score)}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        <HiEye />
                        <span>View Details</span>
                      </motion.button>
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
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Progress
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <AnimatePresence>
                      {filteredAndSortedScores.map((score, index) => {
                        const scoreStatus = getScoreStatus(score.overallScore);
                        const dateInfo = formatDate(score.date);
                        const percentage = score.overallScore * 10;

                        return (
                          <motion.tr
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                                  <HiCalendar className="text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {dateInfo.full}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {dateInfo.time}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex flex-col">
                                <span className="text-lg font-bold text-gray-900 dark:text-white">
                                  {percentage.toFixed(1)}%
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  ({score.overallScore.toFixed(3)}/10)
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <div className={`p-1 rounded ${scoreStatus.bg}`}>
                                  <scoreStatus.icon className={`${scoreStatus.color} text-sm`} />
                                </div>
                                <span className={`text-sm font-medium ${scoreStatus.color}`}>
                                  {scoreStatus.label}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="w-32">
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    className={`bg-gradient-to-r ${scoreStatus.gradient} h-2 rounded-full`}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedScore(score)}
                                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg text-sm"
                              >
                                <HiEye />
                                <span>Details</span>
                              </motion.button>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default PreviousScoresTable;