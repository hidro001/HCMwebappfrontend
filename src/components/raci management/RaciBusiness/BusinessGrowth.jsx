// import React, { useState, useEffect } from "react";
// import { calculatePerformance, getColorFromValue } from "../../../utils/helpers";
// import KeyPerformanceMetrics from "./KeyPerformanceMetrics";

// const BusinessGrowth = ({ setScore }) => {
//   const questions = [
//     "Opportunities for business growth exist – existing products/services.",
//     "Opportunities for business growth exist – new products/services.",
//     "Opportunities for business growth exist – new markets.",
//     "Business has continually invested in research and development (R&D).",
//     "Plant & equipment in good working order and able to support growth.",
//     "Premises – ability to support growth.",
//     "Formal business plans (including SWOT, growth, budgets) are in place.",
//   ];

//   const options = [
//     ["Excellent", "Good", "Moderate", "Poor"],
//     ["Excellent", "Good", "Moderate", "Poor"],
//     ["Excellent", "Good", "Moderate", "Poor"],
//     ["Excellent", "Good", "Moderate", "Poor"],
//     ["Excellent", "Good", "Moderate", "Poor"],
//     ["Excellent", "Good", "Moderate", "Poor"],
//     ["Excellent", "Good", "Moderate", "Poor"],
//   ];

//   const mapping = {
//     Excellent: 5,
//     Good: 4,
//     Moderate: 3,
//     Poor: 1,
//   };

//   const [values, setValues] = useState(Array(questions.length).fill(""));

//   const handleDropdownChange = (index, e) => {
//     const newVals = [...values];
//     newVals[index] = e.target.value;
//     setValues(newVals);
//   };

//   const { averagePercentage } = calculatePerformance(values, mapping);

//   useEffect(() => {
//     setScore(averagePercentage);
//   }, [averagePercentage, setScore]);

//   return (
//     <div className="p-4 border rounded shadow my-4 dark:bg-gray-800 dark:text-white dark:border-gray-700">
//       <h1 className="text-xl font-semibold mb-4">Business Growth Assessment</h1>
//       <table className="w-full border-collapse text-left">
//         <thead className="border-b">
//           <tr>
//             <th className="p-2">Question</th>
//             <th className="p-2">Response</th>
//             <th className="p-2">Performance Review</th>
//           </tr>
//         </thead>
//         <tbody>
//           {questions.map((question, index) => (
//             <tr key={index} className="border-b last:border-none">
//               <td className="p-2">{question}</td>
//               <td className="p-2">
//                 <select
//                   value={values[index]}
//                   onChange={(e) => handleDropdownChange(index, e)}
//                   className="border px-2 py-1 rounded dark:bg-gray-700"
//                 >
//                   <option value="">Select an option</option>
//                   {options[index].map((option, i) => (
//                     <option key={i} value={option}>
//                       {option}
//                     </option>
//                   ))}
//                 </select>
//               </td>
//               <td className="p-2">
//                 <div
//                   className={`inline-block px-2 py-1 text-sm rounded dark:bg-slate-600 ${
//                     getColorFromValue(values[index])
//                   }`}
//                 >
//                   {values[index] === "" ? "No response" : values[index]}
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <KeyPerformanceMetrics
//         performanceData={[
//           {
//             category: "BUSINESS GROWTH",
//             percentage: +averagePercentage,
//           },
//         ]}
//       />
//     </div>
//   );
// };

// export default BusinessGrowth;


import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRocket,
  FaLightbulb,
  FaGlobe,
  FaFlask,
  FaCogs,
  FaBuilding,
  FaClipboardList,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimes,
  FaQuestionCircle,
  FaSeedling,
  FaExpand,
  FaTools,
  FaMapMarkedAlt,
  FaChartBar
} from "react-icons/fa";
import {
  HiTrendingUp,
  HiLightBulb,
  HiGlobe,
  HiCheck,
  HiExclamation,
  HiX,
  HiOfficeBuilding,
  HiClipboardList
} from "react-icons/hi";
import { calculatePerformance, getColorFromValue } from "../../../utils/helpers";
import KeyPerformanceMetrics from "./KeyPerformanceMetrics";

const BusinessGrowth = ({ setScore }) => {
  const questions = [
    {
      id: 1,
      text: "Opportunities for business growth exist – existing products/services.",
      icon: FaRocket,
      category: "Product Growth",
      description: "Potential to expand current offerings and market share",
      type: "expansion"
    },
    {
      id: 2,
      text: "Opportunities for business growth exist – new products/services.",
      icon: HiLightBulb,
      category: "Innovation",
      description: "Capability to develop and launch new offerings",
      type: "innovation"
    },
    {
      id: 3,
      text: "Opportunities for business growth exist – new markets.",
      icon: HiGlobe,
      category: "Market Expansion",
      description: "Potential to enter new geographical or demographic markets",
      type: "markets"
    },
    {
      id: 4,
      text: "Business has continually invested in research and development (R&D).",
      icon: FaFlask,
      category: "R&D Investment",
      description: "Commitment to innovation and future product development",
      type: "investment"
    },
    {
      id: 5,
      text: "Plant & equipment in good working order and able to support growth.",
      icon: FaCogs,
      category: "Infrastructure",
      description: "Physical assets capability to handle increased production",
      type: "infrastructure"
    },
    {
      id: 6,
      text: "Premises – ability to support growth.",
      icon: HiOfficeBuilding,
      category: "Facilities",
      description: "Physical space adequacy for business expansion",
      type: "facilities"
    },
    {
      id: 7,
      text: "Formal business plans (including SWOT, growth, budgets) are in place.",
      icon: HiClipboardList,
      category: "Strategic Planning",
      description: "Structured approach to growth planning and execution",
      type: "planning"
    }
  ];

  const options = [
    ["Excellent", "Good", "Moderate", "Poor"],
    ["Excellent", "Good", "Moderate", "Poor"],
    ["Excellent", "Good", "Moderate", "Poor"],
    ["Excellent", "Good", "Moderate", "Poor"],
    ["Excellent", "Good", "Moderate", "Poor"],
    ["Excellent", "Good", "Moderate", "Poor"],
    ["Excellent", "Good", "Moderate", "Poor"],
  ];

  const mapping = {
    Excellent: 5,
    Good: 4,
    Moderate: 3,
    Poor: 1,
  };

  const responseColors = {
    "Excellent": "green",
    "Good": "blue",
    "Moderate": "yellow",
    "Poor": "red"
  };

  const responseIcons = {
    "Excellent": FaCheckCircle,
    "Good": HiCheck,
    "Moderate": HiExclamation,
    "Poor": HiX
  };

  const [values, setValues] = useState(Array(questions.length).fill(""));
  const [completedQuestions, setCompletedQuestions] = useState(0);

  const handleDropdownChange = (index, e) => {
    const newVals = [...values];
    newVals[index] = e.target.value;
    setValues(newVals);

    // Update completed questions count
    const completed = newVals.filter(val => val !== "").length;
    setCompletedQuestions(completed);
  };

  const { averagePercentage } = calculatePerformance(values, mapping);

  useEffect(() => {
    setScore(averagePercentage);
  }, [averagePercentage, setScore]);

  const getResponseColor = (value) => {
    return responseColors[value] || "gray";
  };

  const getResponseIcon = (value) => {
    return responseIcons[value] || FaQuestionCircle;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
    if (score >= 40) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Product Growth": "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
      "Innovation": "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300",
      "Market Expansion": "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300",
      "R&D Investment": "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300",
      "Infrastructure": "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300",
      "Facilities": "bg-teal-100 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300",
      "Strategic Planning": "bg-pink-100 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300"
    };
    return colors[category] || "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
  };

  const getCategoryIconColor = (category) => {
    const colors = {
      "Product Growth": "bg-blue-100 dark:bg-blue-900/20",
      "Innovation": "bg-purple-100 dark:bg-purple-900/20",
      "Market Expansion": "bg-green-100 dark:bg-green-900/20",
      "R&D Investment": "bg-indigo-100 dark:bg-indigo-900/20",
      "Infrastructure": "bg-orange-100 dark:bg-orange-900/20",
      "Facilities": "bg-teal-100 dark:bg-teal-900/20",
      "Strategic Planning": "bg-pink-100 dark:bg-pink-900/20"
    };
    return colors[category] || "bg-gray-100 dark:bg-gray-700";
  };

  const getCategoryIconTextColor = (category) => {
    const colors = {
      "Product Growth": "text-blue-600 dark:text-blue-400",
      "Innovation": "text-purple-600 dark:text-purple-400",
      "Market Expansion": "text-green-600 dark:text-green-400",
      "R&D Investment": "text-indigo-600 dark:text-indigo-400",
      "Infrastructure": "text-orange-600 dark:text-orange-400",
      "Facilities": "text-teal-600 dark:text-teal-400",
      "Strategic Planning": "text-pink-600 dark:text-pink-400"
    };
    return colors[category] || "text-gray-600 dark:text-gray-400";
  };

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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  const progressPercentage = (completedQuestions / questions.length) * 100;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Header Section */}
      <div className="bg-blue-50 dark:bg-blue-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
              <HiTrendingUp className="text-blue-600 dark:text-blue-400 text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Business Growth Assessment
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Evaluate growth opportunities and organizational readiness
              </p>
            </div>
          </div>
          
          {/* Score Display */}
          <div className="text-right">
            <div className="text-sm text-gray-500 dark:text-gray-400">Current Score</div>
            <div className={`text-3xl font-bold ${getScoreColor(averagePercentage)}`}>
              {averagePercentage.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">
              Progress: {completedQuestions}/{questions.length} questions
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {progressPercentage.toFixed(0)}% complete
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Desktop Table View */}
        <div className="hidden xl:block overflow-x-auto">
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="w-2/5 text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Growth Factor
                </th>
                <th className="w-1/4 text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Assessment
                </th>
                <th className="w-1/3 text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <AnimatePresence>
                {questions.map((question, index) => {
                  const value = values[index];
                  const ResponseIcon = getResponseIcon(value);
                  const QuestionIcon = question.icon;
                  
                  return (
                    <motion.tr
                      key={question.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                    >
                      <td className="py-4 px-4 align-top">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg flex-shrink-0 ${getCategoryIconColor(question.category)}`}>
                            <QuestionIcon className={`w-4 h-4 ${getCategoryIconTextColor(question.category)}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col space-y-2 mb-2">
                              <span className="text-sm font-medium text-gray-900 dark:text-white break-words">
                                {question.text}
                              </span>
                              <span className={`inline-flex px-2 py-1 text-xs rounded-full w-fit ${getCategoryColor(question.category)}`}>
                                {question.category}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 break-words">
                              {question.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 align-top">
                        <select
                          value={value}
                          onChange={(e) => handleDropdownChange(index, e)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                        >
                          <option value="">Select an option</option>
                          {options[index].map((option, i) => (
                            <option key={i} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-4 px-4 align-top">
                        <div className="flex items-start space-x-2">
                          <div className={`p-2 rounded-lg flex-shrink-0 ${
                            getResponseColor(value) === "green" ? "bg-green-100 dark:bg-green-900/20" :
                            getResponseColor(value) === "blue" ? "bg-blue-100 dark:bg-blue-900/20" :
                            getResponseColor(value) === "yellow" ? "bg-yellow-100 dark:bg-yellow-900/20" :
                            getResponseColor(value) === "red" ? "bg-red-100 dark:bg-red-900/20" :
                            "bg-gray-100 dark:bg-gray-700"
                          }`}>
                            <ResponseIcon className={`w-4 h-4 ${
                              getResponseColor(value) === "green" ? "text-green-600 dark:text-green-400" :
                              getResponseColor(value) === "blue" ? "text-blue-600 dark:text-blue-400" :
                              getResponseColor(value) === "yellow" ? "text-yellow-600 dark:text-yellow-400" :
                              getResponseColor(value) === "red" ? "text-red-600 dark:text-red-400" :
                              "text-gray-500 dark:text-gray-400"
                            }`} />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 break-words">
                            {value === "" ? "No response" : value}
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

        {/* Mobile/Tablet Card View */}
        <div className="xl:hidden space-y-6">
          <AnimatePresence>
            {questions.map((question, index) => {
              const value = values[index];
              const ResponseIcon = getResponseIcon(value);
              const QuestionIcon = question.icon;
              
              return (
                <motion.div
                  key={question.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600"
                >
                  {/* Question Header */}
                  <div className="flex items-start space-x-3 mb-4">
                    <div className={`p-2 rounded-lg ${getCategoryIconColor(question.category)}`}>
                      <QuestionIcon className={`${getCategoryIconTextColor(question.category)}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(question.category)}`}>
                          {question.category}
                        </span>
                      </div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                        {question.text}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {question.description}
                      </p>
                    </div>
                  </div>

                  {/* Response Section */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Your Assessment
                    </label>
                    <select
                      value={value}
                      onChange={(e) => handleDropdownChange(index, e)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select an option</option>
                      {options[index].map((option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    {/* Status Display */}
                    {value !== "" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-2 pt-2"
                      >
                        <div className={`p-2 rounded-lg ${
                          getResponseColor(value) === "green" ? "bg-green-100 dark:bg-green-900/20" :
                          getResponseColor(value) === "blue" ? "bg-blue-100 dark:bg-blue-900/20" :
                          getResponseColor(value) === "yellow" ? "bg-yellow-100 dark:bg-yellow-900/20" :
                          getResponseColor(value) === "red" ? "bg-red-100 dark:bg-red-900/20" :
                          "bg-gray-100 dark:bg-gray-700"
                        }`}>
                          <ResponseIcon className={`${
                            getResponseColor(value) === "green" ? "text-green-600 dark:text-green-400" :
                            getResponseColor(value) === "blue" ? "text-blue-600 dark:text-blue-400" :
                            getResponseColor(value) === "yellow" ? "text-yellow-600 dark:text-yellow-400" :
                            getResponseColor(value) === "red" ? "text-red-600 dark:text-red-400" :
                            "text-gray-500 dark:text-gray-400"
                          }`} />
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {value}
                        </span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Performance Metrics */}
        <motion.div
          variants={itemVariants}
          className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-xl p-6 border border-blue-200 dark:border-blue-800"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <FaChartBar className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Growth Readiness Summary
            </h3>
          </div>
          
          <KeyPerformanceMetrics
            performanceData={[
              {
                category: "BUSINESS GROWTH",
                percentage: +averagePercentage,
              },
            ]}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BusinessGrowth;