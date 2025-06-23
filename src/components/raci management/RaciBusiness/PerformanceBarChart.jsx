// import React from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// // Define unique colors for each category
// const categoryColors = {
//   INDUSTRY: "#4682B4", 
//   "BUSINESS PERFORMANCE": "#FF4500", 
//   "BUSINESS GROWTH": "#32CD32", 
//   "BUSINESS RISK": "#9400D3", 
//   COMPETITION: "#800080", 
//   "MANAGEMENT INFORMATION SYSTEMS": "#FFA500", 
//   OWNERS: "#FFD700", 
//   "CUSTOMERS AND MARKET DEMAND": "#20B2AA",
//   STAFF: "#FF6347", 
//   "SUCCESSION AND ESTATE PLANNING": "#ADFF2F"
// };

// const PerformanceBarChart = ({ performanceData }) => {
//   const labels = performanceData.map((entry) => entry.category);
//   const dataValues = performanceData.map((entry) => entry.percentage);
//   const backgroundColors = performanceData.map(
//     (entry) => categoryColors[entry.category] || "#8884d8"
//   );

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: "Performance (%)",
//         data: dataValues,
//         backgroundColor: backgroundColors,
//       },
//     ],
//   };

//   const options = {
//     indexAxis: "y",
//     scales: {
//       x: { min: 0, max: 120 }, 
//       y: {
//         ticks: { autoSkip: false },
//       },
//     },
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Performance Overview",
//       },
//     },
//   };

//   // Calculate Overall Score for display
//   const calculateOverallPerformance = () => {
//     if (!performanceData.length) return 0;
//     const totalScore = performanceData.reduce(
//       (sum, entry) => sum + entry.percentage,
//       0
//     );
//     return (totalScore / performanceData.length).toFixed(2);
//   };

//   return (
//     <div className="p-4 border rounded shadow mt-4 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
//       <div className="h-96">
//         <Bar data={data} options={options} />
//       </div>
//       <h3 className="mt-3 font-medium">
//         Overall Performance Score: {calculateOverallPerformance()}%
//       </h3>
//     </div>
//   );
// };

// export default PerformanceBarChart;


import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  FaChartBar,
  FaExpand,
  FaCompress,
  FaDownload,
  FaEye,
  FaEyeSlash,
  FaTrophy,
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaFilter,
  FaSortAmountUp,
  FaSortAmountDown
} from "react-icons/fa";
import {
  HiChartBar,
  HiTrendingUp,
  HiTrendingDown
} from "react-icons/hi";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Enhanced color palette with modern gradients
const categoryColors = {
  INDUSTRY: {
    primary: "#3B82F6",
    gradient: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    bg: "bg-blue-100 dark:bg-blue-900/20",
    text: "text-blue-600 dark:text-blue-400",
    emoji: "🏭"
  },
  "BUSINESS PERFORMANCE": {
    primary: "#EF4444", 
    gradient: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
    bg: "bg-red-100 dark:bg-red-900/20",
    text: "text-red-600 dark:text-red-400",
    emoji: "📈"
  },
  "BUSINESS GROWTH": {
    primary: "#10B981", 
    gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
    bg: "bg-green-100 dark:bg-green-900/20",
    text: "text-green-600 dark:text-green-400",
    emoji: "🌱"
  },
  "BUSINESS RISK": {
    primary: "#8B5CF6", 
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
    bg: "bg-purple-100 dark:bg-purple-900/20",
    text: "text-purple-600 dark:text-purple-400",
    emoji: "⚠️"
  },
  COMPETITION: {
    primary: "#F59E0B", 
    gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
    bg: "bg-amber-100 dark:bg-amber-900/20",
    text: "text-amber-600 dark:text-amber-400",
    emoji: "⚔️"
  },
  "MANAGEMENT INFORMATION SYSTEMS": {
    primary: "#6366F1", 
    gradient: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
    bg: "bg-indigo-100 dark:bg-indigo-900/20",
    text: "text-indigo-600 dark:text-indigo-400",
    emoji: "💻"
  },
  OWNERS: {
    primary: "#EC4899", 
    gradient: "linear-gradient(135deg, #EC4899 0%, #DB2777 100%)",
    bg: "bg-pink-100 dark:bg-pink-900/20",
    text: "text-pink-600 dark:text-pink-400",
    emoji: "👥"
  },
  "CUSTOMERS AND MARKET DEMAND": {
    primary: "#06B6D4", 
    gradient: "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)",
    bg: "bg-cyan-100 dark:bg-cyan-900/20",
    text: "text-cyan-600 dark:text-cyan-400",
    emoji: "🎯"
  },
  STAFF: {
    primary: "#84CC16", 
    gradient: "linear-gradient(135deg, #84CC16 0%, #65A30D 100%)",
    bg: "bg-lime-100 dark:bg-lime-900/20",
    text: "text-lime-600 dark:text-lime-400",
    emoji: "👨‍💼"
  },
  "SUCCESSION AND ESTATE PLANNING": {
    primary: "#F97316", 
    gradient: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
    bg: "bg-orange-100 dark:bg-orange-900/20",
    text: "text-orange-600 dark:text-orange-400",
    emoji: "🏛️"
  }
};

const PerformanceBarChart = ({ performanceData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLegend, setShowLegend] = useState(true);
  const [sortOrder, setSortOrder] = useState('default'); // default, asc, desc
  const [viewMode, setViewMode] = useState('horizontal'); // horizontal, vertical

  // Sort data based on selected order
  const getSortedData = () => {
    const filtered = performanceData.filter(entry => entry.percentage > 0);
    
    switch (sortOrder) {
      case 'asc':
        return [...filtered].sort((a, b) => a.percentage - b.percentage);
      case 'desc':
        return [...filtered].sort((a, b) => b.percentage - a.percentage);
      default:
        return filtered;
    }
  };

  const sortedData = getSortedData();
  const labels = sortedData.map((entry) => entry.category);
  const dataValues = sortedData.map((entry) => entry.percentage);
  const backgroundColors = sortedData.map(
    (entry) => categoryColors[entry.category]?.primary || "#6B7280"
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Performance (%)",
        data: dataValues,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors.map(color => color),
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const baseOptions = {
    indexAxis: viewMode === 'horizontal' ? "y" : "x",
    scales: {
      [viewMode === 'horizontal' ? 'x' : 'y']: { 
        min: 0, 
        max: 100,
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      },
      [viewMode === 'horizontal' ? 'y' : 'x']: {
        ticks: { 
          autoSkip: false,
          maxRotation: viewMode === 'vertical' ? 45 : 0,
        },
        grid: {
          display: false,
        }
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          }
        }
      },
      title: {
        display: true,
        text: "Performance Overview by Category",
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: 20
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            const category = context.label;
            const value = context.parsed[viewMode === 'horizontal' ? 'x' : 'y'];
            const emoji = categoryColors[category]?.emoji || '📊';
            return `${emoji} ${category}: ${value}%`;
          }
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    }
  };

  // Calculate performance statistics
  const calculateStats = () => {
    if (!sortedData.length) return { overall: 0, highest: null, lowest: null, average: 0 };
    
    const values = sortedData.map(entry => entry.percentage);
    const totalScore = values.reduce((sum, value) => sum + value, 0);
    const average = totalScore / values.length;
    
    const highest = sortedData.find(entry => entry.percentage === Math.max(...values));
    const lowest = sortedData.find(entry => entry.percentage === Math.min(...values));
    
    return {
      overall: average.toFixed(1),
      highest,
      lowest,
      average: average.toFixed(1)
    };
  };

  const stats = calculateStats();

  const getPerformanceLevel = (score) => {
    if (score >= 80) return { level: "Excellent", color: "text-green-600 dark:text-green-400", icon: FaTrophy };
    if (score >= 60) return { level: "Good", color: "text-blue-600 dark:text-blue-400", icon: FaArrowUp };
    if (score >= 40) return { level: "Average", color: "text-yellow-600 dark:text-yellow-400", icon: FaMinus };
    return { level: "Needs Improvement", color: "text-red-600 dark:text-red-400", icon: FaArrowDown };
  };

  const overallLevel = getPerformanceLevel(stats.overall);

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
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/10 dark:via-indigo-900/10 dark:to-purple-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
              <HiChartBar className="text-blue-600 dark:text-blue-400 text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Performance Analytics Dashboard
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive performance visualization across all business areas
              </p>
            </div>
          </div>
          
          {/* Overall Score Display */}
          <div className="text-right">
            <div className="text-sm text-gray-500 dark:text-gray-400">Overall Performance</div>
            <div className={`text-3xl font-bold ${overallLevel.color} flex items-center space-x-2`}>
              <overallLevel.icon className="text-xl" />
              <span>{stats.overall}%</span>
            </div>
            <div className={`text-sm font-medium ${overallLevel.color}`}>
              {overallLevel.level}
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            {/* Sort Controls */}
            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="flex items-center space-x-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              {sortOrder === 'desc' ? <FaSortAmountDown /> : <FaSortAmountUp />}
              <span className="text-sm">Sort</span>
            </button>

            {/* View Mode Toggle */}
            <button
              onClick={() => setViewMode(viewMode === 'horizontal' ? 'vertical' : 'horizontal')}
              className="flex items-center space-x-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <FaChartBar className={viewMode === 'horizontal' ? 'rotate-90' : ''} />
              <span className="text-sm">{viewMode === 'horizontal' ? 'Horizontal' : 'Vertical'}</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {/* Legend Toggle */}
            <button
              onClick={() => setShowLegend(!showLegend)}
              className="flex items-center space-x-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              {showLegend ? <FaEyeSlash /> : <FaEye />}
              <span className="text-sm">Legend</span>
            </button>

            {/* Expand Toggle */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {isExpanded ? <FaCompress /> : <FaExpand />}
              <span className="text-sm">{isExpanded ? 'Compress' : 'Expand'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <motion.div
        variants={itemVariants}
        className="p-6"
      >
        <div className={`transition-all duration-300 ${isExpanded ? 'h-[600px]' : 'h-96'}`}>
          <Bar data={data} options={baseOptions} />
        </div>
      </motion.div>

      {/* Statistics Section */}
      <motion.div
        variants={itemVariants}
        className="p-6 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <FaTrophy className="text-yellow-500" />
          <span>Performance Insights</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Best Performer */}
          {stats.highest && (
            <div className={`rounded-xl p-4 ${categoryColors[stats.highest.category]?.bg} border border-gray-200 dark:border-gray-600`}>
              <div className="flex items-center space-x-3">
                <div className="text-2xl">
                  {categoryColors[stats.highest.category]?.emoji}
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Top Performer</div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">
                    {stats.highest.category}
                  </div>
                  <div className={`font-bold ${categoryColors[stats.highest.category]?.text}`}>
                    {stats.highest.percentage}%
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Lowest Performer */}
          {stats.lowest && (
            <div className={`rounded-xl p-4 ${categoryColors[stats.lowest.category]?.bg} border border-gray-200 dark:border-gray-600`}>
              <div className="flex items-center space-x-3">
                <div className="text-2xl">
                  {categoryColors[stats.lowest.category]?.emoji}
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Needs Focus</div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">
                    {stats.lowest.category}
                  </div>
                  <div className={`font-bold ${categoryColors[stats.lowest.category]?.text}`}>
                    {stats.lowest.percentage}%
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Overall Summary */}
          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-indigo-200 dark:border-indigo-800">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                <overallLevel.icon className={`${overallLevel.color}`} />
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Overall Average</div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm">
                  {overallLevel.level}
                </div>
                <div className={`font-bold ${overallLevel.color}`}>
                  {stats.overall}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Performance List */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Category Breakdown ({sortedData.length} areas assessed)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {sortedData.map((entry, index) => {
              const categoryInfo = categoryColors[entry.category];
              const level = getPerformanceLevel(entry.percentage);
              
              return (
                <div key={index} className="flex items-center space-x-2 p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                  <span className="text-lg">{categoryInfo?.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-gray-900 dark:text-white truncate">
                      {entry.category}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`text-sm font-bold ${level.color}`}>
                        {entry.percentage}%
                      </div>
                      <level.icon className={`w-3 h-3 ${level.color}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PerformanceBarChart;