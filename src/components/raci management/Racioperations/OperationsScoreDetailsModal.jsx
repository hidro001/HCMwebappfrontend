
// import React from "react";
// import BaseModal from "../../common/BaseModal";

// // 1) Import Chart.js and react-chartjs-2:
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// // 2) Register Chart.js components:
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Legend);

// const ScoreDetailsModal = ({ selectedScore, onClose }) => {
//   if (!selectedScore) return null;

//   // Convert key success factors into data for Chart.js
//   // ksfData = [{ name: 'factorName', score: numericValue }, ... ]
//   const ksfData = Object.keys(selectedScore.keySuccessFactors).map((factor) => ({
//     name: factor,
//     // Round to nearest integer on a 0-100 scale:
//     score: Math.round(selectedScore.keySuccessFactors[factor] * 10),
//   }));

//   // Build Chart.js data
//   const chartJsData = {
//     labels: ksfData.map((item) => item.name),
//     datasets: [
//       {
//         label: "Score",
//         data: ksfData.map((item) => item.score),
//         backgroundColor: "#8cc01d",
//       },
//     ],
//   };

//   // Chart.js options
//   const chartJsOptions = {
//     responsive: true,
//     scales: {
//       y: {
//         min: 0,
//         max: 100, // same domain as Recharts: [0, 100]
//         ticks: {
//           // Force integer labels on the y-axis
//           callback: function (value) {
//             return value.toFixed(0);
//           },
//         },
//       },
//       x: {
//         ticks: {
//           maxRotation: 45,
//           minRotation: 45,
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: true,
//       },
//       tooltip: {
//         // If you want to ensure tooltips also show integers only:
//         callbacks: {
//           label: function (context) {
//             const label = context.dataset.label || "";
//             const value = context.parsed.y; // This is already an integer
//             return `${label}: ${value}`;
//           },
//         },
//       },
//       title: {
//         display: false,
//       },
//     },
//   };

//   return (
//     <BaseModal isOpen={true} onClose={onClose}>
//       <div
//         className="bg-white dark:bg-gray-800 text-black dark:text-white
//                    p-4 rounded shadow max-w-xl w-full relative max-h-[80%]
//                    overflow-y-auto [&::-webkit-scrollbar]:w-2
//                 [&::-webkit-scrollbar-track]:rounded-full
//                 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
//                 [&::-webkit-scrollbar-thumb]:rounded-full
//                 [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600"
//       >
//         {/* Close Button */}
//         <button
//           className="absolute top-2 right-2 mt-4 px-4 py-2 bg-red-500 text-white rounded"
//           onClick={onClose}
//         >
//           Close
//         </button>

//         <h4 className="text-xl font-bold mb-2">Score Details</h4>

//         <p>
//           <strong>Date: </strong>
//           {new Date(selectedScore.date).toLocaleDateString()}
//         </p>
//         <p>
//           <strong>Overall Score: </strong>
//           {(selectedScore.overallScore * 10).toFixed(2)}%
//         </p>

//         {/* Metrics Table */}
//         <h5 className="text-lg mt-3 mb-2 font-semibold">Metrics</h5>
//         <table className="w-full border-collapse text-left mb-4">
//           <thead>
//             <tr className="border-b">
//               <th className="p-2">Metric</th>
//               <th className="p-2">Score</th>
//             </tr>
//           </thead>
//           <tbody>
//             {selectedScore.metrics.map((metric, index) => (
//               <tr key={index} className="border-b last:border-none">
//                 <td className="p-2">{metric.metric}</td>
//                 <td className="p-2">{metric.score}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Key Success Factors */}
//         <h5 className="text-lg mt-3 mb-2 font-semibold">Key Success Factors</h5>
//         <ul className="list-disc list-inside mb-4">
//           {Object.keys(selectedScore.keySuccessFactors).map((factor, idx) => (
//             <li key={idx}>
//               <strong>{factor}:</strong>{" "}
//               {selectedScore.keySuccessFactors[factor].toFixed(2)}
//             </li>
//           ))}
//         </ul>

//         {/* Chart.js Bar Chart for KSF */}
//         <div className="p-2 border rounded dark:border-gray-700 dark:bg-gray-900">
//           <h2 className="text-lg font-semibold mb-2">
//             Key Success Factors Graph
//           </h2>
//           {/* Provide a fixed height for the chart container */}
//           <div style={{ width: "100%", height: 400 }}>
//             <Bar data={chartJsData} options={chartJsOptions} />
//           </div>
//         </div>

//         {/* Optional close button at bottom */}
//         <button
//           className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
//           onClick={onClose}
//         >
//           Close
//         </button>
//       </div>
//     </BaseModal>
//   );
// };

// export default ScoreDetailsModal;



import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BaseModal from "../../common/BaseModal";
import {
  FaCalendarAlt,
  FaChartBar,
  FaPercentage,
  FaList,
  FaTrophy,
  FaEye,
  FaDownload,
  FaExpand,
  FaCompress,
  FaTimes,
  FaClipboardList,
  FaUsers,
  FaDollarSign,
  FaBullseye,
  FaGraduationCap,
  FaRocket,
  FaChartLine,
  FaHandshake,
  FaCog,
  FaArrowUp,
  FaArrowDown,
  FaEquals,
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
  FaRegStar,
  FaStar,
  FaStarHalfAlt
} from "react-icons/fa";
import {
  HiX,
  HiCalendar,
  HiChartBar,
  HiClipboard,
  HiTrendingUp,
  HiTrendingDown,
  HiDownload,
  HiEye
} from "react-icons/hi";

// Chart.js imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Legend);

const ScoreDetailsModal = ({ selectedScore, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview"); // overview, metrics, factors, chart
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!selectedScore) return null;

  // Factor configuration
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

  // Get score status
  const getScoreStatus = (score) => {
    if (score === 0) return { 
      icon: FaRegStar, 
      color: "text-gray-400 dark:text-gray-500", 
      bg: "bg-gray-100 dark:bg-gray-700", 
      label: "Not Rated"
    };
    if (score <= 3) return { 
      icon: FaExclamationTriangle, 
      color: "text-red-600 dark:text-red-400", 
      bg: "bg-red-100 dark:bg-red-900/20", 
      label: "Needs Improvement"
    };
    if (score <= 6) return { 
      icon: FaInfoCircle, 
      color: "text-yellow-600 dark:text-yellow-400", 
      bg: "bg-yellow-100 dark:bg-yellow-900/20", 
      label: "Average"
    };
    if (score <= 8) return { 
      icon: FaStar, 
      color: "text-blue-600 dark:text-blue-400", 
      bg: "bg-blue-100 dark:bg-blue-900/20", 
      label: "Good"
    };
    return { 
      icon: FaCheckCircle, 
      color: "text-green-600 dark:text-green-400", 
      bg: "bg-green-100 dark:bg-green-900/20", 
      label: "Excellent"
    };
  };

  // Render star rating
  const renderStars = (score) => {
    const stars = [];
    const normalizedScore = score / 2; // Convert 0-10 to 0-5
    const fullStars = Math.floor(normalizedScore);
    const hasHalfStar = normalizedScore % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    
    const remainingStars = 5 - Math.ceil(normalizedScore);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300 dark:text-gray-600" />);
    }
    
    return stars;
  };

  // Calculate statistics
  const metrics = selectedScore.metrics || [];
  const completedMetrics = metrics.filter(m => m.score > 0);
  const averageMetricScore = completedMetrics.length > 0 
    ? completedMetrics.reduce((sum, m) => sum + m.score, 0) / completedMetrics.length 
    : 0;
  
  const keySuccessFactors = selectedScore.keySuccessFactors || {};
  const factorScores = Object.values(keySuccessFactors);
  const highestFactor = Object.entries(keySuccessFactors).reduce(
    (max, [key, value]) => value > max.value ? { key, value } : max,
    { key: '', value: 0 }
  );
  const lowestFactor = Object.entries(keySuccessFactors).reduce(
    (min, [key, value]) => value < min.value ? { key, value } : min,
    { key: '', value: 10 }
  );

  // Convert key success factors into data for Chart.js
  const ksfData = Object.keys(keySuccessFactors).map((factor) => ({
    factor,
    name: getFactorConfig(factor).name,
    score: Math.round(keySuccessFactors[factor] * 10),
    config: getFactorConfig(factor)
  }));

  // Build Chart.js data
  const chartJsData = {
    labels: ksfData.map((item) => item.name),
    datasets: [
      {
        label: "Score (%)",
        data: ksfData.map((item) => item.score),
        backgroundColor: [
          "#3B82F6", "#8B5CF6", "#10B981", "#EF4444", "#6366F1", 
          "#F59E0B", "#14B8A6", "#EC4899", "#EAB308", "#06B6D4"
        ],
        borderColor: [
          "#2563EB", "#7C3AED", "#059669", "#DC2626", "#4F46E5",
          "#D97706", "#0D9488", "#DB2777", "#CA8A04", "#0891B2"
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  // Chart.js options
  const chartJsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 100,
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
          },
          callback: function(value) {
            return value + '%';
          }
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          maxRotation: 45,
          minRotation: 45,
          font: {
            size: 11,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        borderColor: '#374151',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: function(context) {
            return context[0].label;
          },
          label: function(context) {
            return `Score: ${context.parsed.y}%`;
          }
        }
      }
    },
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: HiEye },
    { id: "metrics", label: "Metrics", icon: HiClipboard },
    { id: "factors", label: "Key Factors", icon: HiTrendingUp },
    { id: "chart", label: "Analytics", icon: HiChartBar }
  ];

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <BaseModal isOpen={true} onClose={onClose}>
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 ${
          isFullscreen 
            ? "fixed inset-4 z-50" 
            : "max-w-5xl w-full max-h-[90vh]"
        } flex flex-col overflow-hidden`}
      >
        {/* Header */}
        <div className="bg-blue-50 dark:bg-blue-900/10 p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <HiChartBar className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Assessment Details
                </h2>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <div className="flex items-center space-x-1">
                    <HiCalendar />
                    <span>{new Date(selectedScore.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaPercentage />
                    <span>Overall: {(selectedScore.overallScore * 10).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? <FaCompress /> : <FaExpand />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                title="Download Report"
              >
                <HiDownload />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg transition-colors duration-200"
              >
                <HiX className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex space-x-1 p-1">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <tab.icon className="text-sm" />
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800 p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center space-x-3">
                          <FaPercentage className="text-blue-600 dark:text-blue-400 text-2xl" />
                          <div>
                            <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Overall Score</p>
                            <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                              {(selectedScore.overallScore * 10).toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/10 rounded-xl p-6 border border-green-200 dark:border-green-800">
                        <div className="flex items-center space-x-3">
                          <FaList className="text-green-600 dark:text-green-400 text-2xl" />
                          <div>
                            <p className="text-sm font-medium text-green-800 dark:text-green-200">Completed Metrics</p>
                            <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                              {completedMetrics.length}/{metrics.length}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                        <div className="flex items-center space-x-3">
                          <FaChartBar className="text-purple-600 dark:text-purple-400 text-2xl" />
                          <div>
                            <p className="text-sm font-medium text-purple-800 dark:text-purple-200">Avg Metric Score</p>
                            <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                              {averageMetricScore.toFixed(1)}/10
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Key Insights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Top Performer */}
                      <div className="bg-green-50 dark:bg-green-900/10 rounded-xl p-6 border border-green-200 dark:border-green-800">
                        <div className="flex items-center space-x-3">
                          <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                            <FaTrophy className="text-green-600 dark:text-green-400 text-xl" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-green-800 dark:text-green-200">Top Performing Factor</p>
                            <p className="text-lg font-bold text-green-900 dark:text-green-100">
                              {getFactorConfig(highestFactor.key).name}
                            </p>
                            <p className="text-sm text-green-700 dark:text-green-300">
                              {(highestFactor.value * 10).toFixed(1)}% score
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Needs Attention */}
                      <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-6 border border-red-200 dark:border-red-800">
                        <div className="flex items-center space-x-3">
                          <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                            <FaExclamationTriangle className="text-red-600 dark:text-red-400 text-xl" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-red-800 dark:text-red-200">Needs Attention</p>
                            <p className="text-lg font-bold text-red-900 dark:text-red-100">
                              {getFactorConfig(lowestFactor.key).name}
                            </p>
                            <p className="text-sm text-red-700 dark:text-red-300">
                              {(lowestFactor.value * 10).toFixed(1)}% score
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Metrics Tab */}
                {activeTab === "metrics" && (
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Metric
                              </th>
                              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Score
                              </th>
                              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Rating
                              </th>
                              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Stars
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {metrics.map((metric, index) => {
                              const status = getScoreStatus(metric.score);
                              return (
                                <motion.tr
                                  key={index}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                                >
                                  <td className="px-6 py-4">
                                    <div className="flex items-start space-x-3">
                                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
                                        #{metric.id}
                                      </span>
                                      <p className="text-sm text-gray-900 dark:text-white line-clamp-2">
                                        {metric.metric}
                                      </p>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                                      {metric.score}/10
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-2">
                                      <div className={`p-1 rounded ${status.bg}`}>
                                        <status.icon className={`${status.color} text-sm`} />
                                      </div>
                                      <span className={`text-sm font-medium ${status.color}`}>
                                        {status.label}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-1">
                                      {renderStars(metric.score)}
                                    </div>
                                  </td>
                                </motion.tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* Key Factors Tab */}
                {activeTab === "factors" && (
                  <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800 pr-2">
                    {ksfData.map((item, index) => {
                      const status = getScoreStatus(item.score / 10);
                      return (
                        <motion.div
                          key={item.factor}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className={`p-3 bg-${item.config.color}-100 dark:bg-${item.config.color}-900/20 rounded-lg`}>
                                <item.config.icon className={`text-${item.config.color}-600 dark:text-${item.config.color}-400 text-xl`} />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  {item.name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {item.config.description}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center space-x-2">
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                  {item.score}%
                                </span>
                                <div className={`p-2 rounded-lg ${status.bg}`}>
                                  <status.icon className={`${status.color} text-lg`} />
                                </div>
                              </div>
                              <span className={`text-sm font-medium ${status.color}`}>
                                {status.label}
                              </span>
                            </div>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="mt-4">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.score}%` }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className={`bg-${item.config.color}-500 h-3 rounded-full`}
                              />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {/* Chart Tab */}
                {activeTab === "chart" && (
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Performance Analytics
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Visual representation of your key success factors
                      </p>
                    </div>
                    <div className="h-96">
                      <Bar data={chartJsData} options={chartJsOptions} />
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </BaseModal>
  );
};

export default ScoreDetailsModal;