// import React from "react";

// const AssessmentForm = ({
//   metrics,
//   scoreOptions,
//   handleDropdownChange,
//   selectedFactor,
//   keySuccessFactorsMapping,
// }) => {
//   return (
//     <div className="border rounded p-4 mb-4 dark:border-gray-700 dark:bg-gray-800">
//       <h2 className="text-lg font-semibold mb-4">Assessment Form</h2>
//       <table className="w-full border-collapse text-left">
//         <thead>
//           <tr className="border-b dark:border-gray-600">
//             <th className="p-2">Metric</th>
//             <th className="p-2">Rating</th>
//           </tr>
//         </thead>
//         <tbody>
//           {metrics.map((metric, idx) => {
//             const isHighlighted =
//               selectedFactor &&
//               keySuccessFactorsMapping[selectedFactor]?.includes(metric.id);

//             return (
//               <tr
//                 key={metric.id}
//                 className={`border-b last:border-none dark:border-gray-600 ${
//                   isHighlighted ? "bg-yellow-100 dark:bg-yellow-900" : ""
//                 }`}
//               >
//                 <td className="p-2">{metric.metric}</td>
//                 <td className="p-2">
//                   <select
//                     value={metric.score}
//                     onChange={(e) =>
//                       handleDropdownChange(metric.id, Number(e.target.value))
//                     }
//                     className="border rounded px-2 py-1 dark:bg-gray-700"
//                   >
//                     {scoreOptions.map((option, i) => (
//                       <option key={i} value={option.value}>
//                         {option.label}
//                       </option>
//                     ))}
//                   </select>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AssessmentForm;



// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaClipboardList,
//   FaStar,
//   FaStarHalfAlt,
//   FaRegStar,
//   FaSearch,
//   FaFilter,
//   FaCheckCircle,
//   FaExclamationTriangle,
//   FaInfoCircle,
//   FaChevronDown,
//   FaChevronUp,
//   FaEye,
//   FaEyeSlash
// } from "react-icons/fa";
// import {
//   HiClipboardList,
//   HiStar,
//   HiSearch,
//   HiFilter,
//   HiCheck,
//   HiExclamation,
//   HiInformationCircle
// } from "react-icons/hi";

// const AssessmentForm = ({
//   metrics,
//   scoreOptions,
//   handleDropdownChange,
//   selectedFactor,
//   keySuccessFactorsMapping,
// }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showCompleted, setShowCompleted] = useState(true);
//   const [showIncomplete, setShowIncomplete] = useState(true);
//   const [expandedCards, setExpandedCards] = useState(new Set());
//   const [viewMode, setViewMode] = useState("cards"); // cards or table

//   // Filter metrics based on search and completion status
//   const filteredMetrics = metrics.filter((metric) => {
//     const matchesSearch = metric.metric.toLowerCase().includes(searchTerm.toLowerCase());
//     const isCompleted = metric.score > 0;
//     const matchesFilter = (showCompleted && isCompleted) || (showIncomplete && !isCompleted);
//     return matchesSearch && matchesFilter;
//   });

//   // Get completion stats
//   const completedCount = metrics.filter(m => m.score > 0).length;
//   const totalCount = metrics.length;
//   const completionPercentage = Math.round((completedCount / totalCount) * 100);

//   // Get score configuration
//   const getScoreConfig = (score) => {
//     if (score === 0) return { 
//       color: "text-gray-400 dark:text-gray-500", 
//       bg: "bg-gray-100 dark:bg-gray-700", 
//       icon: FaRegStar,
//       label: "Not Rated",
//       description: "Please provide a rating"
//     };
//     if (score <= 3) return { 
//       color: "text-red-600 dark:text-red-400", 
//       bg: "bg-red-100 dark:bg-red-900/20", 
//       icon: FaExclamationTriangle,
//       label: "Needs Improvement",
//       description: "Significant improvement required"
//     };
//     if (score <= 6) return { 
//       color: "text-yellow-600 dark:text-yellow-400", 
//       bg: "bg-yellow-100 dark:bg-yellow-900/20", 
//       icon: FaInfoCircle,
//       label: "Average",
//       description: "Meeting basic expectations"
//     };
//     if (score <= 8) return { 
//       color: "text-blue-600 dark:text-blue-400", 
//       bg: "bg-blue-100 dark:bg-blue-900/20", 
//       icon: FaStar,
//       label: "Good",
//       description: "Above average performance"
//     };
//     return { 
//       color: "text-green-600 dark:text-green-400", 
//       bg: "bg-green-100 dark:bg-green-900/20", 
//       icon: FaCheckCircle,
//       label: "Excellent",
//       description: "Outstanding performance"
//     };
//   };

//   // Render star rating
//   const renderStars = (score) => {
//     const stars = [];
//     const fullStars = Math.floor(score);
//     const hasHalfStar = score % 1 !== 0;

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<FaStar key={i} className="text-yellow-400" />);
//     }
    
//     if (hasHalfStar) {
//       stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
//     }
    
//     const remainingStars = 10 - Math.ceil(score);
//     for (let i = 0; i < remainingStars; i++) {
//       stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300 dark:text-gray-600" />);
//     }
    
//     return stars.slice(0, 5); // Show only 5 stars for visual clarity
//   };

//   const toggleCardExpansion = (metricId) => {
//     const newExpanded = new Set(expandedCards);
//     if (newExpanded.has(metricId)) {
//       newExpanded.delete(metricId);
//     } else {
//       newExpanded.add(metricId);
//     }
//     setExpandedCards(newExpanded);
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 0.6,
//         staggerChildren: 0.05
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.4 }
//     }
//   };

//   return (
//     <motion.div
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//       className="space-y-6"
//     >
//       {/* Header Controls */}
//       <div className="space-y-4">
//         {/* Progress Bar */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//               Assessment Progress
//             </span>
//             <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
//               {completedCount}/{totalCount} ({completionPercentage}%)
//             </span>
//           </div>
//           <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
//             <motion.div
//               initial={{ width: 0 }}
//               animate={{ width: `${completionPercentage}%` }}
//               transition={{ duration: 1, ease: "easeOut" }}
//               className="bg-blue-600 h-2 rounded-full"
//             />
//           </div>
//         </div>

//         {/* Search and Filters */}
//         <div className="flex flex-col md:flex-row gap-4">
//           {/* Search Bar */}
//           <div className="relative flex-1">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <HiSearch className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search metrics..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//             />
//           </div>

//           {/* Filter Controls */}
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="showCompleted"
//                 checked={showCompleted}
//                 onChange={(e) => setShowCompleted(e.target.checked)}
//                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               />
//               <label htmlFor="showCompleted" className="text-sm text-gray-700 dark:text-gray-300">
//                 Completed
//               </label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="showIncomplete"
//                 checked={showIncomplete}
//                 onChange={(e) => setShowIncomplete(e.target.checked)}
//                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               />
//               <label htmlFor="showIncomplete" className="text-sm text-gray-700 dark:text-gray-300">
//                 Pending
//               </label>
//             </div>

//             {/* View Toggle */}
//             <div className="hidden md:flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
//               <button
//                 onClick={() => setViewMode("cards")}
//                 className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
//                   viewMode === "cards"
//                     ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
//                     : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
//                 }`}
//               >
//                 Cards
//               </button>
//               <button
//                 onClick={() => setViewMode("table")}
//                 className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
//                   viewMode === "table"
//                     ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
//                     : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
//                 }`}
//               >
//                 Table
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       {filteredMetrics.length === 0 ? (
//         <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
//           <HiClipboardList className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
//           <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
//             No metrics found
//           </h3>
//           <p className="text-gray-500 dark:text-gray-500">
//             Try adjusting your search or filter criteria
//           </p>
//         </div>
//       ) : (
//         <>
//           {/* Cards View */}
//           {viewMode === "cards" && (
//             <div className="space-y-4">
//               <AnimatePresence>
//                 {filteredMetrics.map((metric, idx) => {
//                   const isHighlighted =
//                     selectedFactor &&
//                     keySuccessFactorsMapping[selectedFactor]?.includes(metric.id);
//                   const scoreConfig = getScoreConfig(metric.score);
//                   const isExpanded = expandedCards.has(metric.id);

//                   return (
//                     <motion.div
//                       key={metric.id}
//                       variants={itemVariants}
//                       initial="hidden"
//                       animate="visible"
//                       exit="hidden"
//                       transition={{ delay: idx * 0.05 }}
//                       className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border transition-all duration-200 ${
//                         isHighlighted
//                           ? "border-yellow-300 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900/10 ring-2 ring-yellow-200 dark:ring-yellow-800"
//                           : "border-gray-200 dark:border-gray-700 hover:shadow-xl"
//                       }`}
//                     >
//                       {/* Card Header */}
//                       <div className="p-6 border-b border-gray-100 dark:border-gray-700">
//                         <div className="flex items-start justify-between">
//                           <div className="flex-1">
//                             <div className="flex items-center space-x-3 mb-2">
//                               <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
//                                 Metric #{metric.id}
//                               </span>
//                               {isHighlighted && (
//                                 <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300">
//                                   Highlighted
//                                 </span>
//                               )}
//                             </div>
//                             <button
//                               onClick={() => toggleCardExpansion(metric.id)}
//                               className="text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
//                             >
//                               <p className={`font-medium text-gray-900 dark:text-white ${
//                                 isExpanded ? '' : 'line-clamp-2'
//                               }`}>
//                                 {metric.metric}
//                               </p>
//                             </button>
//                           </div>
//                           <div className="ml-4 flex items-center space-x-3">
//                             <button
//                               onClick={() => toggleCardExpansion(metric.id)}
//                               className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
//                             >
//                               {isExpanded ? (
//                                 <FaChevronUp className="h-4 w-4 text-gray-400" />
//                               ) : (
//                                 <FaChevronDown className="h-4 w-4 text-gray-400" />
//                               )}
//                             </button>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Card Content */}
//                       <div className="p-6">
//                         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
//                           {/* Score Display */}
//                           <div className="flex items-center space-x-4">
//                             <div className={`p-2 rounded-lg ${scoreConfig.bg}`}>
//                               <scoreConfig.icon className={`${scoreConfig.color} text-lg`} />
//                             </div>
//                             <div>
//                               <p className="text-sm text-gray-500 dark:text-gray-400">Current Rating</p>
//                               <div className="flex items-center space-x-2">
//                                 <span className="text-lg font-bold text-gray-900 dark:text-white">
//                                   {metric.score}/10
//                                 </span>
//                                 <span className={`text-sm font-medium ${scoreConfig.color}`}>
//                                   {scoreConfig.label}
//                                 </span>
//                               </div>
//                               <div className="flex items-center space-x-1 mt-1">
//                                 {renderStars(metric.score / 2)}
//                               </div>
//                             </div>
//                           </div>

//                           {/* Score Selector */}
//                           <div className="flex-shrink-0">
//                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                               Update Rating
//                             </label>
//                             <select
//                               value={metric.score}
//                               onChange={(e) =>
//                                 handleDropdownChange(metric.id, Number(e.target.value))
//                               }
//                               className="w-full sm:w-48 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                             >
//                               {scoreOptions.map((option, i) => (
//                                 <option key={i} value={option.value}>
//                                   {option.label}
//                                 </option>
//                               ))}
//                             </select>
//                           </div>
//                         </div>

//                         {/* Description */}
//                         {metric.score > 0 && (
//                           <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
//                             <p className="text-sm text-gray-600 dark:text-gray-400">
//                               <span className="font-medium">{scoreConfig.label}:</span> {scoreConfig.description}
//                             </p>
//                           </div>
//                         )}
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//               </AnimatePresence>
//             </div>
//           )}

//           {/* Table View */}
//           {viewMode === "table" && (
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                   <thead className="bg-gray-50 dark:bg-gray-700">
//                     <tr>
//                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                         Metric
//                       </th>
//                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                         Current Score
//                       </th>
//                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                         Rating
//                       </th>
//                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                         Update
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                     <AnimatePresence>
//                       {filteredMetrics.map((metric, idx) => {
//                         const isHighlighted =
//                           selectedFactor &&
//                           keySuccessFactorsMapping[selectedFactor]?.includes(metric.id);
//                         const scoreConfig = getScoreConfig(metric.score);

//                         return (
//                           <motion.tr
//                             key={metric.id}
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: -20 }}
//                             transition={{ duration: 0.3, delay: idx * 0.02 }}
//                             className={`transition-colors duration-200 ${
//                               isHighlighted
//                                 ? "bg-yellow-50 dark:bg-yellow-900/10"
//                                 : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
//                             }`}
//                           >
//                             <td className="px-6 py-4">
//                               <div className="flex items-center space-x-3">
//                                 <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
//                                   #{metric.id}
//                                 </span>
//                                 <div>
//                                   <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
//                                     {metric.metric}
//                                   </p>
//                                   {isHighlighted && (
//                                     <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 mt-1">
//                                       Highlighted
//                                     </span>
//                                   )}
//                                 </div>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="flex items-center space-x-2">
//                                 <div className={`p-1 rounded ${scoreConfig.bg}`}>
//                                   <scoreConfig.icon className={`${scoreConfig.color} text-sm`} />
//                                 </div>
//                                 <span className="text-sm font-bold text-gray-900 dark:text-white">
//                                   {metric.score}/10
//                                 </span>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div>
//                                 <span className={`text-sm font-medium ${scoreConfig.color}`}>
//                                   {scoreConfig.label}
//                                 </span>
//                                 <div className="flex items-center space-x-1 mt-1">
//                                   {renderStars(metric.score / 2)}
//                                 </div>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <select
//                                 value={metric.score}
//                                 onChange={(e) =>
//                                   handleDropdownChange(metric.id, Number(e.target.value))
//                                 }
//                                 className="w-40 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                               >
//                                 {scoreOptions.map((option, i) => (
//                                   <option key={i} value={option.value}>
//                                     {option.label}
//                                   </option>
//                                 ))}
//                               </select>
//                             </td>
//                           </motion.tr>
//                         );
//                       })}
//                     </AnimatePresence>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </motion.div>
//   );
// };

// export default AssessmentForm;


import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaClipboardList,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaSearch,
  FaFilter,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaChevronDown,
  FaChevronUp,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";
import {
  HiClipboardList,
  HiStar,
  HiSearch,
  HiFilter,
  HiCheck,
  HiExclamation,
  HiInformationCircle
} from "react-icons/hi";

const AssessmentForm = ({
  metrics,
  scoreOptions,
  handleDropdownChange,
  selectedFactor,
  keySuccessFactorsMapping,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showCompleted, setShowCompleted] = useState(true);
  const [showIncomplete, setShowIncomplete] = useState(true);
  const [expandedCards, setExpandedCards] = useState(new Set());
  
  // Auto-detect device type and set default view mode
  const getDefaultViewMode = () => {
    if (typeof window !== 'undefined') {
      // Desktop: >= 1024px (lg breakpoint)
      if (window.innerWidth >= 1024) return "table";
      // Tablet and Mobile: < 1024px
      return "cards";
    }
    return "cards";
  };
  
  const [viewMode, setViewMode] = useState(getDefaultViewMode());

  // Update view mode on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setViewMode("table");
      } else {
        setViewMode("cards");
      }
    };

    // Set initial view mode
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter metrics based on search and completion status
  const filteredMetrics = metrics.filter((metric) => {
    const matchesSearch = metric.metric.toLowerCase().includes(searchTerm.toLowerCase());
    const isCompleted = metric.score > 0;
    const matchesFilter = (showCompleted && isCompleted) || (showIncomplete && !isCompleted);
    return matchesSearch && matchesFilter;
  });

  // Get completion stats
  const completedCount = metrics.filter(m => m.score > 0).length;
  const totalCount = metrics.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  // Get score configuration
  const getScoreConfig = (score) => {
    if (score === 0) return { 
      color: "text-gray-400 dark:text-gray-500", 
      bg: "bg-gray-100 dark:bg-gray-700", 
      icon: FaRegStar,
      label: "Not Rated",
      description: "Please provide a rating"
    };
    if (score <= 3) return { 
      color: "text-red-600 dark:text-red-400", 
      bg: "bg-red-100 dark:bg-red-900/20", 
      icon: FaExclamationTriangle,
      label: "Needs Improvement",
      description: "Significant improvement required"
    };
    if (score <= 6) return { 
      color: "text-yellow-600 dark:text-yellow-400", 
      bg: "bg-yellow-100 dark:bg-yellow-900/20", 
      icon: FaInfoCircle,
      label: "Average",
      description: "Meeting basic expectations"
    };
    if (score <= 8) return { 
      color: "text-blue-600 dark:text-blue-400", 
      bg: "bg-blue-100 dark:bg-blue-900/20", 
      icon: FaStar,
      label: "Good",
      description: "Above average performance"
    };
    return { 
      color: "text-green-600 dark:text-green-400", 
      bg: "bg-green-100 dark:bg-green-900/20", 
      icon: FaCheckCircle,
      label: "Excellent",
      description: "Outstanding performance"
    };
  };

  // Render star rating
  const renderStars = (score) => {
    const stars = [];
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    
    const remainingStars = 10 - Math.ceil(score);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300 dark:text-gray-600" />);
    }
    
    return stars.slice(0, 5); // Show only 5 stars for visual clarity
  };

  const toggleCardExpansion = (metricId) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(metricId)) {
      newExpanded.delete(metricId);
    } else {
      newExpanded.add(metricId);
    }
    setExpandedCards(newExpanded);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.05
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
      {/* Header Controls */}
      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Assessment Progress
            </span>
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
              {completedCount}/{totalCount} ({completionPercentage}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-blue-600 h-2 rounded-full"
            />
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search metrics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="showCompleted"
                checked={showCompleted}
                onChange={(e) => setShowCompleted(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="showCompleted" className="text-sm text-gray-700 dark:text-gray-300">
                Completed
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="showIncomplete"
                checked={showIncomplete}
                onChange={(e) => setShowIncomplete(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="showIncomplete" className="text-sm text-gray-700 dark:text-gray-300">
                Pending
              </label>
            </div>

            {/* View Toggle - Show only on desktop */}
            <div className="hidden lg:flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode("table")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  viewMode === "table"
                    ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                Table
              </button>
              <button
                onClick={() => setViewMode("cards")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  viewMode === "cards"
                    ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                Cards
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {filteredMetrics.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <HiClipboardList className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
            No metrics found
          </h3>
          <p className="text-gray-500 dark:text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <>
          {/* Cards View - Always show on mobile/tablet, optional on desktop */}
          <div className={`${viewMode === "table" ? "hidden lg:hidden" : "block lg:block"}`}>
            <div className="space-y-4">
              <AnimatePresence>
                {filteredMetrics.map((metric, idx) => {
                  const isHighlighted =
                    selectedFactor &&
                    keySuccessFactorsMapping[selectedFactor]?.includes(metric.id);
                  const scoreConfig = getScoreConfig(metric.score);
                  const isExpanded = expandedCards.has(metric.id);

                  return (
                    <motion.div
                      key={metric.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      transition={{ delay: idx * 0.05 }}
                      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border transition-all duration-200 ${
                        isHighlighted
                          ? "border-yellow-300 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900/10 ring-2 ring-yellow-200 dark:ring-yellow-800"
                          : "border-gray-200 dark:border-gray-700 hover:shadow-xl"
                      }`}
                    >
                      {/* Card Header */}
                      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Metric #{metric.id}
                              </span>
                              {isHighlighted && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300">
                                  Highlighted
                                </span>
                              )}
                            </div>
                            <button
                              onClick={() => toggleCardExpansion(metric.id)}
                              className="text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                            >
                              <p className={`font-medium text-gray-900 dark:text-white ${
                                isExpanded ? '' : 'line-clamp-2'
                              }`}>
                                {metric.metric}
                              </p>
                            </button>
                          </div>
                          <div className="ml-4 flex items-center space-x-3">
                            <button
                              onClick={() => toggleCardExpansion(metric.id)}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                            >
                              {isExpanded ? (
                                <FaChevronUp className="h-4 w-4 text-gray-400" />
                              ) : (
                                <FaChevronDown className="h-4 w-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                          {/* Score Display */}
                          <div className="flex items-center space-x-4">
                            <div className={`p-2 rounded-lg ${scoreConfig.bg}`}>
                              <scoreConfig.icon className={`${scoreConfig.color} text-lg`} />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Current Rating</p>
                              <div className="flex items-center space-x-2">
                                <span className="text-lg font-bold text-gray-900 dark:text-white">
                                  {metric.score}/10
                                </span>
                                <span className={`text-sm font-medium ${scoreConfig.color}`}>
                                  {scoreConfig.label}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1 mt-1">
                                {renderStars(metric.score / 2)}
                              </div>
                            </div>
                          </div>

                          {/* Score Selector */}
                          <div className="flex-shrink-0">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Update Rating
                            </label>
                            <select
                              value={metric.score}
                              onChange={(e) =>
                                handleDropdownChange(metric.id, Number(e.target.value))
                              }
                              className="w-full sm:w-48 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            >
                              {scoreOptions.map((option, i) => (
                                <option key={i} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Description */}
                        {metric.score > 0 && (
                          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              <span className="font-medium">{scoreConfig.label}:</span> {scoreConfig.description}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Table View - Default on desktop, hidden on mobile/tablet */}
          <div className={`${viewMode === "cards" ? "hidden" : "hidden lg:block"}`}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Metric
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Current Score
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Update
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <AnimatePresence>
                      {filteredMetrics.map((metric, idx) => {
                        const isHighlighted =
                          selectedFactor &&
                          keySuccessFactorsMapping[selectedFactor]?.includes(metric.id);
                        const scoreConfig = getScoreConfig(metric.score);

                        return (
                          <motion.tr
                            key={metric.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, delay: idx * 0.02 }}
                            className={`transition-colors duration-200 ${
                              isHighlighted
                                ? "bg-yellow-50 dark:bg-yellow-900/10"
                                : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                            }`}
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-3">
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                  #{metric.id}
                                </span>
                                <div>
                                  <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                                    {metric.metric}
                                  </p>
                                  {isHighlighted && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 mt-1">
                                      Highlighted
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <div className={`p-1 rounded ${scoreConfig.bg}`}>
                                  <scoreConfig.icon className={`${scoreConfig.color} text-sm`} />
                                </div>
                                <span className="text-sm font-bold text-gray-900 dark:text-white">
                                  {metric.score}/10
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <span className={`text-sm font-medium ${scoreConfig.color}`}>
                                  {scoreConfig.label}
                                </span>
                                <div className="flex items-center space-x-1 mt-1">
                                  {renderStars(metric.score / 2)}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select
                                value={metric.score}
                                onChange={(e) =>
                                  handleDropdownChange(metric.id, Number(e.target.value))
                                }
                                className="w-40 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                              >
                                {scoreOptions.map((option, i) => (
                                  <option key={i} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default AssessmentForm;