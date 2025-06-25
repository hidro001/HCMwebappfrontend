

// import React from "react";
// import PerformanceBarChart from "./PerformanceBarChart";
// import BaseModal from "../../common/BaseModal"; // Adjust your path to where BaseModal is

// const ScoreDetailModal = ({ selectedScore, onClose }) => {
//   if (!selectedScore) return null;

//   return (
//     <BaseModal isOpen={true} onClose={onClose}>
//       <div className="bg-white dark:bg-gray-800 text-black dark:text-white
//                    p-4 rounded shadow max-w-xl w-full relative max-h-[80%]
//                    overflow-y-auto [&::-webkit-scrollbar]:w-2
//                 [&::-webkit-scrollbar-track]:rounded-full
//                 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
//                 [&::-webkit-scrollbar-thumb]:rounded-full
//                 [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600">
//         {/* Close Button */}
//         <button
//           className="absolute top-1 right-8 mt-4 px-10 py-2 bg-red-500 text-white rounded "
//           onClick={onClose}
//         >
//        Close
//         </button>

//         {/* Scrollable content container */}
//         <div className=" pr-2 [&::-webkit-scrollbar]:w-2
//                 [&::-webkit-scrollbar-track]:rounded-full
//                 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
//                 [&::-webkit-scrollbar-thumb]:rounded-full
//                 [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600"> 
//           {/* Header */}
//           <h4 className="text-xl font-bold mb-2 text-black dark:text-white">
//             Score Details
//           </h4>

//           {/* Date */}
//           <p className="dark:text-white">
//             <strong>Date:</strong>{" "}
//             {new Date(selectedScore.date).toLocaleDateString()}
//           </p>

//           {/* Overall Score */}
//           <p className="dark:text-white">
//             <strong>Overall Score:</strong>{" "}
//             {(+selectedScore.overallScore).toFixed(2)}%
//           </p>

//           {/* Metrics Table */}
//           <h5 className="text-lg mt-3 mb-2 font-semibold dark:text-white">
//             Metrics
//           </h5>
//           <table className="w-full border-collapse text-left mb-4">
//             <thead className="border-b">
//               <tr>
//                 <th className="p-2">Metric</th>
//                 <th className="p-2">Score (%)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {selectedScore.metrics.map((metric, idx) => (
//                 <tr key={idx} className="border-b last:border-none">
//                   <td className="p-2">{metric.category}</td>
//                   <td className="p-2">{metric.percentage}%</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Chart for Selected Score */}
//           <div className="h-96">
//             <PerformanceBarChart performanceData={selectedScore.metrics} />
//           </div>
//         </div>
//       </div>
//     </BaseModal>
//   );
// };

// export default ScoreDetailModal;


// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaTimes,
//   FaCalendarAlt,
//   FaTrophy,
//   FaChartLine,
//   FaTable,
//   FaExpand,
//   FaCompress,
//   FaDownload,
//   FaEye,
//   FaArrowUp,
//   FaArrowDown,
//   FaMinus,
//   FaCheckCircle,
//   FaExclamationTriangle,
//   FaFileExport
// } from "react-icons/fa";
// import {
//   HiX,
//   HiCalendar,
//   HiChartBar,
//   HiTrendingUp,
//   HiTrendingDown
// } from "react-icons/hi";
// import PerformanceBarChart from "./PerformanceBarChart";
// import BaseModal from "../../common/BaseModal";

// const ScoreDetailModal = ({ selectedScore, onClose }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [activeTab, setActiveTab] = useState('overview'); // overview, metrics, chart

//   if (!selectedScore) return null;

//   // Calculate performance statistics
//   const calculateStats = () => {
//     if (!selectedScore.metrics?.length) return { highest: null, lowest: null, average: 0 };
    
//     const values = selectedScore.metrics.map(metric => metric.percentage);
//     const average = values.reduce((sum, val) => sum + val, 0) / values.length;
    
//     const highest = selectedScore.metrics.find(metric => 
//       metric.percentage === Math.max(...values)
//     );
//     const lowest = selectedScore.metrics.find(metric => 
//       metric.percentage === Math.min(...values)
//     );
    
//     return { highest, lowest, average: average.toFixed(1) };
//   };

//   const stats = calculateStats();

//   const getPerformanceLevel = (score) => {
//     if (score >= 80) return { 
//       level: "Excellent", 
//       color: "text-green-600 dark:text-green-400", 
//       bg: "bg-green-100 dark:bg-green-900/20",
//       icon: FaCheckCircle,
//       emoji: "🏆"
//     };
//     if (score >= 60) return { 
//       level: "Good", 
//       color: "text-blue-600 dark:text-blue-400", 
//       bg: "bg-blue-100 dark:bg-blue-900/20",
//       icon: FaArrowUp,
//       emoji: "👍"
//     };
//     if (score >= 40) return { 
//       level: "Average", 
//       color: "text-yellow-600 dark:text-yellow-400", 
//       bg: "bg-yellow-100 dark:bg-yellow-900/20",
//       icon: FaMinus,
//       emoji: "⚡"
//     };
//     return { 
//       level: "Needs Improvement", 
//       color: "text-red-600 dark:text-red-400", 
//       bg: "bg-red-100 dark:bg-red-900/20",
//       icon: FaExclamationTriangle,
//       emoji: "⚠️"
//     };
//   };

//   const overallLevel = getPerformanceLevel(selectedScore.overallScore);
//   const OverallIcon = overallLevel.icon;

//   const modalVariants = {
//     hidden: { 
//       opacity: 0, 
//       scale: 0.8,
//       y: 50
//     },
//     visible: { 
//       opacity: 1, 
//       scale: 1,
//       y: 0,
//       transition: {
//         duration: 0.3,
//         ease: "easeOut"
//       }
//     },
//     exit: { 
//       opacity: 0, 
//       scale: 0.8,
//       y: 50,
//       transition: {
//         duration: 0.2
//       }
//     }
//   };

//   const contentVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.4,
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.3 }
//     }
//   };

//   return (
//     <BaseModal isOpen={true} onClose={onClose}>
//       <motion.div
//         variants={modalVariants}
//         initial="hidden"
//         animate="visible"
//         exit="exit"
//         className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 ${
//           isExpanded ? 'w-[95vw] h-[95vh]' : 'w-full max-w-4xl max-h-[90vh]'
//         } relative overflow-hidden transition-all duration-300`}
//       >
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/10 dark:via-indigo-900/10 dark:to-purple-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
//                 <FaTrophy className="text-blue-600 dark:text-blue-400 text-2xl" />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//                   Performance Score Details
//                 </h2>
//                 <div className="flex items-center space-x-4 mt-1">
//                   <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
//                     <HiCalendar className="w-4 h-4" />
//                     <span className="text-sm">
//                       {new Date(selectedScore.date).toLocaleDateString('en-US', {
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric'
//                       })}
//                     </span>
//                   </div>
//                   <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${overallLevel.bg}`}>
//                     <span className="text-lg">{overallLevel.emoji}</span>
//                     <span className={`text-sm font-medium ${overallLevel.color}`}>
//                       {overallLevel.level}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center space-x-3">
//               {/* Overall Score Display */}
//               <div className="text-right">
//                 <div className="text-sm text-gray-500 dark:text-gray-400">Overall Score</div>
//                 <div className={`text-3xl font-bold ${overallLevel.color} flex items-center space-x-2`}>
//                   <OverallIcon className="text-xl" />
//                   <span>{(+selectedScore.overallScore).toFixed(1)}%</span>
//                 </div>
//               </div>

//               {/* Control Buttons */}
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => setIsExpanded(!isExpanded)}
//                   className="p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//                   title={isExpanded ? "Compress" : "Expand"}
//                 >
//                   {isExpanded ? <FaCompress /> : <FaExpand />}
//                 </button>
                
//                 <button
//                   onClick={onClose}
//                   className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
//                   title="Close"
//                 >
//                   <HiX className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Tab Navigation */}
//           <div className="flex space-x-1 mt-6 bg-white dark:bg-gray-700 rounded-lg p-1">
//             {[
//               { id: 'overview', label: 'Overview', icon: FaEye },
//               { id: 'metrics', label: 'Metrics', icon: FaTable },
//               { id: 'chart', label: 'Chart', icon: FaChartLine }
//             ].map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
//                   activeTab === tab.id
//                     ? 'bg-blue-600 text-white shadow-md'
//                     : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
//                 }`}
//               >
//                 <tab.icon className="w-4 h-4" />
//                 <span className="text-sm font-medium">{tab.label}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Content */}
//         <motion.div
//           variants={contentVariants}
//           initial="hidden"
//           animate="visible"
//           className="p-6 overflow-y-auto flex-1 max-h-[calc(90vh-200px)] custom-scrollbar"
//           style={{
//             scrollbarWidth: 'thin',
//             scrollbarColor: '#CBD5E0 #F7FAFC'
//           }}
//         >
//           <AnimatePresence mode="wait">
//             {activeTab === 'overview' && (
//               <motion.div
//                 key="overview"
//                 variants={contentVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="hidden"
//                 className="space-y-6"
//               >
//                 {/* Performance Summary Cards */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   {/* Overall Performance */}
//                   <motion.div
//                     variants={itemVariants}
//                     className={`rounded-xl p-6 ${overallLevel.bg} border border-gray-200 dark:border-gray-600`}
//                   >
//                     <div className="flex items-center space-x-4">
//                       <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
//                         <OverallIcon className={`w-6 h-6 ${overallLevel.color}`} />
//                       </div>
//                       <div>
//                         <div className="text-sm text-gray-600 dark:text-gray-400">Overall Performance</div>
//                         <div className="text-2xl font-bold text-gray-900 dark:text-white">
//                           {(+selectedScore.overallScore).toFixed(1)}%
//                         </div>
//                         <div className={`text-sm font-medium ${overallLevel.color}`}>
//                           {overallLevel.level}
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>

//                   {/* Best Performer */}
//                   {stats.highest && (
//                     <motion.div
//                       variants={itemVariants}
//                       className="bg-green-50 dark:bg-green-900/10 rounded-xl p-6 border border-green-200 dark:border-green-800"
//                     >
//                       <div className="flex items-center space-x-4">
//                         <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
//                           <FaTrophy className="w-6 h-6 text-green-600 dark:text-green-400" />
//                         </div>
//                         <div>
//                           <div className="text-sm text-gray-600 dark:text-gray-400">Best Performer</div>
//                           <div className="text-lg font-bold text-gray-900 dark:text-white">
//                             {stats.highest.category}
//                           </div>
//                           <div className="text-sm font-medium text-green-600 dark:text-green-400">
//                             {stats.highest.percentage}%
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}

//                   {/* Needs Attention */}
//                   {stats.lowest && (
//                     <motion.div
//                       variants={itemVariants}
//                       className="bg-orange-50 dark:bg-orange-900/10 rounded-xl p-6 border border-orange-200 dark:border-orange-800"
//                     >
//                       <div className="flex items-center space-x-4">
//                         <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
//                           <FaExclamationTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
//                         </div>
//                         <div>
//                           <div className="text-sm text-gray-600 dark:text-gray-400">Needs Attention</div>
//                           <div className="text-lg font-bold text-gray-900 dark:text-white">
//                             {stats.lowest.category}
//                           </div>
//                           <div className="text-sm font-medium text-orange-600 dark:text-orange-400">
//                             {stats.lowest.percentage}%
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}
//                 </div>

//                 {/* Key Success Factors */}
//                 {selectedScore.keySuccessFactors && (
//                   <motion.div
//                     variants={itemVariants}
//                     className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6"
//                   >
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
//                       <FaChartLine className="text-blue-600 dark:text-blue-400" />
//                       <span>Key Success Factors</span>
//                     </h3>
//                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//                       {Object.entries(selectedScore.keySuccessFactors).map(([key, value]) => (
//                         <div key={key} className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
//                           <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
//                             {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
//                           </div>
//                           <div className={`text-lg font-bold ${getPerformanceLevel(value * 20).color}`}>
//                             {(value * 20).toFixed(0)}%
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </motion.div>
//                 )}
//               </motion.div>
//             )}

//             {activeTab === 'metrics' && (
//               <motion.div
//                 key="metrics"
//                 variants={contentVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="hidden"
//                 className="space-y-6"
//               >
//                 {/* Metrics Table */}
//                 <motion.div
//                   variants={itemVariants}
//                   className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
//                 >
//                   <div className="bg-gray-50 dark:bg-gray-700 p-4 border-b border-gray-200 dark:border-gray-600">
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
//                       <FaTable className="text-blue-600 dark:text-blue-400" />
//                       <span>Detailed Metrics ({selectedScore.metrics?.length || 0})</span>
//                     </h3>
//                   </div>
                  
//                   <div className="overflow-x-auto">
//                     <table className="w-full">
//                       <thead className="bg-gray-50 dark:bg-gray-700">
//                         <tr>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                             Category
//                           </th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                             Score
//                           </th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                             Performance
//                           </th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                             Level
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                         {selectedScore.metrics?.map((metric, idx) => {
//                           const level = getPerformanceLevel(metric.percentage);
//                           const LevelIcon = level.icon;
                          
//                           return (
//                             <motion.tr
//                               key={idx}
//                               variants={itemVariants}
//                               className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
//                             >
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <div className="text-sm font-medium text-gray-900 dark:text-white">
//                                   {metric.category}
//                                 </div>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <div className={`text-lg font-bold ${level.color}`}>
//                                   {metric.percentage}%
//                                 </div>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
//                                   <div
//                                     className={`h-2 rounded-full transition-all duration-500 ${
//                                       metric.percentage >= 80 ? 'bg-green-500' :
//                                       metric.percentage >= 60 ? 'bg-blue-500' :
//                                       metric.percentage >= 40 ? 'bg-yellow-500' :
//                                       'bg-red-500'
//                                     }`}
//                                     style={{ width: `${metric.percentage}%` }}
//                                   />
//                                 </div>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <div className="flex items-center space-x-2">
//                                   <LevelIcon className={`w-4 h-4 ${level.color}`} />
//                                   <span className={`text-sm font-medium ${level.color}`}>
//                                     {level.level}
//                                   </span>
//                                 </div>
//                               </td>
//                             </motion.tr>
//                           );
//                         })}
//                       </tbody>
//                     </table>
//                   </div>
//                 </motion.div>
//               </motion.div>
//             )}

//             {activeTab === 'chart' && (
//               <motion.div
//                 key="chart"
//                 variants={contentVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="hidden"
//                 className="space-y-6"
//               >
//                 {/* Chart Section */}
//                 <motion.div
//                   variants={itemVariants}
//                   className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
//                 >
//                   <div className="bg-gray-50 dark:bg-gray-700 p-4 border-b border-gray-200 dark:border-gray-600">
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
//                       <HiChartBar className="text-blue-600 dark:text-blue-400" />
//                       <span>Performance Visualization</span>
//                     </h3>
//                     <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//                       Interactive chart showing performance across all categories
//                     </p>
//                   </div>
                  
//                   <div className="p-6">
//                     <div className={`${isExpanded ? 'h-[500px]' : 'h-96'}`}>
//                       <PerformanceBarChart performanceData={selectedScore.metrics || []} />
//                     </div>
//                   </div>
//                 </motion.div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>
//       </motion.div>

//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 8px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #f1f5f9;
//           border-radius: 4px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #cbd5e1;
//           border-radius: 4px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #94a3b8;
//         }
//         .dark .custom-scrollbar::-webkit-scrollbar-track {
//           background: #374151;
//         }
//         .dark .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #6b7280;
//         }
//         .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #9ca3af;
//         }
//       `}</style>
//     </BaseModal>
//   );
// };

// export default ScoreDetailModal;


import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaCalendarAlt,
  FaTrophy,
  FaChartLine,
  FaTable,
  FaExpand,
  FaCompress,
  FaDownload,
  FaEye,
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaCheckCircle,
  FaExclamationTriangle,
  FaFileExport,
  FaSync
} from "react-icons/fa";
import {
  HiX,
  HiCalendar,
  HiChartBar,
  HiTrendingUp,
  HiTrendingDown
} from "react-icons/hi";
import PerformanceBarChart from "./PerformanceBarChart";
import BaseModal from "../../common/BaseModal";

const ScoreDetailModal = ({ selectedScore, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // overview, metrics, chart

  if (!selectedScore) return null;

  // Calculate performance statistics
  const calculateStats = () => {
    if (!selectedScore.metrics?.length) return { highest: null, lowest: null, average: 0 };
    
    const values = selectedScore.metrics.map(metric => metric.percentage);
    const average = values.reduce((sum, val) => sum + val, 0) / values.length;
    
    const highest = selectedScore.metrics.find(metric => 
      metric.percentage === Math.max(...values)
    );
    const lowest = selectedScore.metrics.find(metric => 
      metric.percentage === Math.min(...values)
    );
    
    return { highest, lowest, average: average.toFixed(1) };
  };

  const stats = calculateStats();

  const getPerformanceLevel = (score) => {
    if (score >= 80) return { 
      level: "Excellent", 
      color: "text-green-600 dark:text-green-400", 
      bg: "bg-green-100 dark:bg-green-900/20",
      icon: FaCheckCircle,
      emoji: "🏆"
    };
    if (score >= 60) return { 
      level: "Good", 
      color: "text-blue-600 dark:text-blue-400", 
      bg: "bg-blue-100 dark:bg-blue-900/20",
      icon: FaArrowUp,
      emoji: "👍"
    };
    if (score >= 40) return { 
      level: "Average", 
      color: "text-yellow-600 dark:text-yellow-400", 
      bg: "bg-yellow-100 dark:bg-yellow-900/20",
      icon: FaMinus,
      emoji: "⚡"
    };
    return { 
      level: "Needs Improvement", 
      color: "text-red-600 dark:text-red-400", 
      bg: "bg-red-100 dark:bg-red-900/20",
      icon: FaExclamationTriangle,
      emoji: "⚠️"
    };
  };

  const overallLevel = getPerformanceLevel(selectedScore.overallScore);
  const OverallIcon = overallLevel.icon;

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
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
          isExpanded ? 'w-[95vw] h-[95vh]' : 'w-full max-w-4xl max-h-[90vh]'
        } relative overflow-hidden transition-all duration-300`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/10 dark:via-indigo-900/10 dark:to-purple-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
                <FaTrophy className="text-blue-600 dark:text-blue-400 text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Performance Score Details
                </h2>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <HiCalendar className="w-4 h-4" />
                    <span className="text-sm">
                      {new Date(selectedScore.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${overallLevel.bg}`}>
                    <span className="text-lg">{overallLevel.emoji}</span>
                    <span className={`text-sm font-medium ${overallLevel.color}`}>
                      {overallLevel.level}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Overall Score Display */}
              <div className="text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400">Overall Score</div>
                <div className={`text-3xl font-bold ${overallLevel.color} flex items-center space-x-2`}>
                  <OverallIcon className="text-xl" />
                  <span>{(+selectedScore.overallScore).toFixed(1)}%</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  title={isExpanded ? "Compress" : "Expand"}
                >
                  {isExpanded ? <FaCompress /> : <FaExpand />}
                </button>
                
                <button
                  onClick={onClose}
                  className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                  title="Close"
                >
                  <HiX className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mt-6 bg-white dark:bg-gray-700 rounded-lg p-1">
            {[
              { id: 'overview', label: 'Overview', icon: FaEye },
              { id: 'metrics', label: 'Metrics', icon: FaTable },
              { id: 'chart', label: 'Chart', icon: FaChartLine }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="p-6 overflow-y-auto flex-1 max-h-[calc(90vh-200px)] custom-scrollbar"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#CBD5E0 #F7FAFC'
          }}
        >
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-6"
              >
                {/* Performance Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Overall Performance */}
                  <motion.div
                    variants={itemVariants}
                    className={`rounded-xl p-6 ${overallLevel.bg} border border-gray-200 dark:border-gray-600`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <OverallIcon className={`w-6 h-6 ${overallLevel.color}`} />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Overall Performance</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {(+selectedScore.overallScore).toFixed(1)}%
                        </div>
                        <div className={`text-sm font-medium ${overallLevel.color}`}>
                          {overallLevel.level}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Best Performer */}
                  {stats.highest && (
                    <motion.div
                      variants={itemVariants}
                      className="bg-green-50 dark:bg-green-900/10 rounded-xl p-6 border border-green-200 dark:border-green-800"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                          <FaTrophy className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Best Performer</div>
                          <div className="text-lg font-bold text-gray-900 dark:text-white">
                            {stats.highest.category}
                          </div>
                          <div className="text-sm font-medium text-green-600 dark:text-green-400">
                            {stats.highest.percentage}%
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Needs Attention */}
                  {stats.lowest && (
                    <motion.div
                      variants={itemVariants}
                      className="bg-orange-50 dark:bg-orange-900/10 rounded-xl p-6 border border-orange-200 dark:border-orange-800"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                          <FaExclamationTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Needs Attention</div>
                          <div className="text-lg font-bold text-gray-900 dark:text-white">
                            {stats.lowest.category}
                          </div>
                          <div className="text-sm font-medium text-orange-600 dark:text-orange-400">
                            {stats.lowest.percentage}%
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Key Success Factors */}
                {selectedScore.keySuccessFactors && (
                  <motion.div
                    variants={itemVariants}
                    className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                      <FaChartLine className="text-blue-600 dark:text-blue-400" />
                      <span>Key Success Factors</span>
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {Object.entries(selectedScore.keySuccessFactors).map(([key, value]) => (
                        <div key={key} className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </div>
                          <div className={`text-lg font-bold ${getPerformanceLevel(value * 20).color}`}>
                            {(value * 20).toFixed(0)}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === 'metrics' && (
              <motion.div
                key="metrics"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-6"
              >
                {/* Metrics Table */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 border-b border-gray-200 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                      <FaTable className="text-blue-600 dark:text-blue-400" />
                      <span>Detailed Metrics ({selectedScore.metrics?.length || 0})</span>
                    </h3>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Score
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Performance
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Level
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {selectedScore.metrics?.map((metric, idx) => {
                          const level = getPerformanceLevel(metric.percentage);
                          const LevelIcon = level.icon;
                          
                          return (
                            <motion.tr
                              key={idx}
                              variants={itemVariants}
                              className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {metric.category}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className={`text-lg font-bold ${level.color}`}>
                                  {metric.percentage}%
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full transition-all duration-500 ${
                                      metric.percentage >= 80 ? 'bg-green-500' :
                                      metric.percentage >= 60 ? 'bg-blue-500' :
                                      metric.percentage >= 40 ? 'bg-yellow-500' :
                                      'bg-red-500'
                                    }`}
                                    style={{ width: `${metric.percentage}%` }}
                                  />
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-2">
                                  <LevelIcon className={`w-4 h-4 ${level.color}`} />
                                  <span className={`text-sm font-medium ${level.color}`}>
                                    {level.level}
                                  </span>
                                </div>
                              </td>
                            </motion.tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'chart' && (
              <motion.div
                key="chart"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-6"
              >
                {/* Chart Section */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 border-b border-gray-200 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                      <HiChartBar className="text-blue-600 dark:text-blue-400" />
                      <span>Performance Visualization</span>
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Interactive chart showing performance across all categories
                    </p>
                  </div>
                  
                  <div className="p-6">
                    <div className={`${isExpanded ? 'h-[500px]' : 'h-96'}`}>
                      <PerformanceBarChart performanceData={selectedScore.metrics || []} />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-track {
          background: #374151;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #6b7280;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </BaseModal>
  );
};

export default ScoreDetailModal;