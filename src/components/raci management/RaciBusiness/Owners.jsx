// import React, { useState, useEffect } from "react";
// import { calculatePerformance, getColorFromValue } from "../../../utils/helpers";
// import KeyPerformanceMetrics from "./KeyPerformanceMetrics";

// const Owners = ({ setScore }) => {
//   const questions = [
//     "Degree of principal/owner reliance.",
//     "Easy transfer of business knowledge, IP, systems, etc.",
//     "Principal/owner departure will cause loss of key business functions.",
//   ];

//   const options = [
//     ["High", "Medium", "Low", "Not Applicable"],
//     ["High", "Medium", "Low", "Not Applicable"],
//     ["High", "Medium", "Low", "Not Applicable"],
//   ];

//   const mapping = {
//     High: 1,
//     Medium: 3,
//     Low: 5,
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
//       <h1 className="text-xl font-semibold mb-4">Owners Assessment</h1>
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
//             category: "OWNERS",
//             percentage: +averagePercentage,
//           },
//         ]}
//       />
//     </div>
//   );
// };

// export default Owners;


import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserTie,
  FaExchangeAlt,
  FaExclamationTriangle,
  FaQuestionCircle,
  FaCheckCircle,
  FaTimes,
  FaChartLine,
  FaCrown,
  FaHandsHelping,
  FaLightbulb,
  FaUserCog,
  FaBalanceScale,
  FaArrowRight
} from "react-icons/fa";
import {
  HiExclamation,
  HiCheck,
  HiX,
  HiInformationCircle,
  HiUserGroup,
  HiSwitchHorizontal
} from "react-icons/hi";
import { calculatePerformance, getColorFromValue } from "../../../utils/helpers";
import KeyPerformanceMetrics from "./KeyPerformanceMetrics";

const Owners = ({ setScore }) => {
  const questions = [
    {
      id: 1,
      text: "Degree of principal/owner reliance.",
      icon: FaCrown,
      category: "Leadership Dependency",
      description: "How much the business depends on the owner/principal for daily operations",
      riskType: "dependency"
    },
    {
      id: 2,
      text: "Easy transfer of business knowledge, IP, systems, etc.",
      icon: HiSwitchHorizontal,
      category: "Knowledge Transfer",
      description: "Ability to effectively transfer critical business assets and knowledge",
      riskType: "transfer"
    },
    {
      id: 3,
      text: "Principal/owner departure will cause loss of key business functions.",
      icon: FaExclamationTriangle,
      category: "Succession Risk",
      description: "Impact of owner/principal departure on business operations",
      riskType: "succession"
    }
  ];

  const options = [
    ["High", "Medium", "Low", "Not Applicable"],
    ["High", "Medium", "Low", "Not Applicable"],
    ["High", "Medium", "Low", "Not Applicable"],
  ];

  const mapping = {
    High: 1,
    Medium: 3,
    Low: 5,
  };

  // Context-aware scoring for owners assessment
  const getContextualScore = (questionIndex, value) => {
    if (questionIndex === 0) {
      // Question 1: High reliance = bad (1), Low reliance = good (5)
      return mapping[value] || 0;
    } else if (questionIndex === 1) {
      // Question 2: High transfer ease = good (5), Low transfer ease = bad (1)
      if (value === "High") return 5;
      if (value === "Medium") return 3;
      if (value === "Low") return 1;
      return 0;
    } else if (questionIndex === 2) {
      // Question 3: High loss = bad (1), Low loss = good (5)
      return mapping[value] || 0;
    }
    return mapping[value] || 0;
  };

  const responseColors = {
    "High": "red", // Context dependent
    "Medium": "yellow", 
    "Low": "green", // Context dependent
    "Not Applicable": "gray"
  };

  const getContextualResponseColor = (questionIndex, value) => {
    if (questionIndex === 1) {
      // For knowledge transfer: High = good, Low = bad
      if (value === "High") return "green";
      if (value === "Medium") return "yellow";
      if (value === "Low") return "red";
    }
    return responseColors[value] || "gray";
  };

  const responseIcons = {
    "High": FaExclamationTriangle,
    "Medium": HiExclamation,
    "Low": HiCheck,
    "Not Applicable": FaQuestionCircle
  };

  const getContextualResponseIcon = (questionIndex, value) => {
    if (questionIndex === 1) {
      // For knowledge transfer: High = good, Low = bad
      if (value === "High") return FaCheckCircle;
      if (value === "Medium") return HiExclamation;
      if (value === "Low") return FaTimes;
    }
    return responseIcons[value] || FaQuestionCircle;
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

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
    if (score >= 40) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  const getRiskTypeColor = (type) => {
    const colors = {
      "dependency": "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300",
      "transfer": "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
      "succession": "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300"
    };
    return colors[type] || "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Leadership Dependency": "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300",
      "Knowledge Transfer": "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
      "Succession Risk": "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300"
    };
    return colors[category] || "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
  };

  const getCategoryIconColor = (category) => {
    const colors = {
      "Leadership Dependency": "bg-red-100 dark:bg-red-900/20",
      "Knowledge Transfer": "bg-blue-100 dark:bg-blue-900/20",
      "Succession Risk": "bg-orange-100 dark:bg-orange-900/20"
    };
    return colors[category] || "bg-gray-100 dark:bg-gray-700";
  };

  const getCategoryIconTextColor = (category) => {
    const colors = {
      "Leadership Dependency": "text-red-600 dark:text-red-400",
      "Knowledge Transfer": "text-blue-600 dark:text-blue-400",
      "Succession Risk": "text-orange-600 dark:text-orange-400"
    };
    return colors[category] || "text-gray-600 dark:text-gray-400";
  };

  const getOwnershipMaturityLevel = (score) => {
    if (score >= 85) return { level: "Independent", color: "text-green-600 dark:text-green-400", icon: "🌟", description: "Business operates independently" };
    if (score >= 70) return { level: "Resilient", color: "text-blue-600 dark:text-blue-400", icon: "💪", description: "Strong organizational structure" };
    if (score >= 50) return { level: "Developing", color: "text-yellow-600 dark:text-yellow-400", icon: "🔧", description: "Building independence" };
    if (score >= 30) return { level: "Dependent", color: "text-orange-600 dark:text-orange-400", icon: "⚠️", description: "High owner dependency" };
    return { level: "Critical", color: "text-red-600 dark:text-red-400", icon: "🚨", description: "Critical owner reliance" };
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
  const maturityLevel = getOwnershipMaturityLevel(averagePercentage);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Header Section */}
      <div className="bg-purple-50 dark:bg-purple-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-xl">
              <HiUserGroup className="text-purple-600 dark:text-purple-400 text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Ownership & Leadership Assessment
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Evaluate business independence and succession readiness
              </p>
            </div>
          </div>
          
          {/* Score Display */}
          <div className="text-right">
            <div className="text-sm text-gray-500 dark:text-gray-400">Independence Score</div>
            <div className={`text-3xl font-bold ${getScoreColor(averagePercentage)}`}>
              {averagePercentage.toFixed(1)}%
            </div>
            <div className={`text-xs flex items-center justify-end space-x-1 ${maturityLevel.color}`}>
              <span>{maturityLevel.icon}</span>
              <span>{maturityLevel.level}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">
              Assessment Progress: {completedQuestions}/{questions.length} areas
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {progressPercentage.toFixed(0)}% complete
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-purple-600 h-2 rounded-full transition-all duration-500"
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
                  Leadership Factor
                </th>
                <th className="w-1/4 text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Assessment
                </th>
                <th className="w-1/3 text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Independence Level
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <AnimatePresence>
                {questions.map((question, index) => {
                  const value = values[index];
                  const ResponseIcon = getContextualResponseIcon(index, value);
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
                              <div className="flex flex-wrap gap-2">
                                <span className={`inline-flex px-2 py-1 text-xs rounded-full w-fit ${getCategoryColor(question.category)}`}>
                                  {question.category}
                                </span>
                                <span className={`inline-flex px-2 py-1 text-xs rounded-full w-fit ${getRiskTypeColor(question.riskType)}`}>
                                  {question.riskType === "dependency" ? "Dependency Risk" :
                                   question.riskType === "transfer" ? "Transfer Capability" :
                                   "Succession Planning"}
                                </span>
                              </div>
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
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm"
                        >
                          <option value="">Select level</option>
                          {options[index].map((option, optIndex) => (
                            <option key={optIndex} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-4 px-4 align-top">
                        <div className="flex items-start space-x-2">
                          <div className={`p-2 rounded-lg flex-shrink-0 ${
                            getContextualResponseColor(index, value) === "green" ? "bg-green-100 dark:bg-green-900/20" :
                            getContextualResponseColor(index, value) === "yellow" ? "bg-yellow-100 dark:bg-yellow-900/20" :
                            getContextualResponseColor(index, value) === "red" ? "bg-red-100 dark:bg-red-900/20" :
                            "bg-gray-100 dark:bg-gray-700"
                          }`}>
                            <ResponseIcon className={`w-4 h-4 ${
                              getContextualResponseColor(index, value) === "green" ? "text-green-600 dark:text-green-400" :
                              getContextualResponseColor(index, value) === "yellow" ? "text-yellow-600 dark:text-yellow-400" :
                              getContextualResponseColor(index, value) === "red" ? "text-red-600 dark:text-red-400" :
                              "text-gray-500 dark:text-gray-400"
                            }`} />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 break-words">
                            {value === "" ? "Not assessed" : value}
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
              const ResponseIcon = getContextualResponseIcon(index, value);
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
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(question.category)}`}>
                          {question.category}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getRiskTypeColor(question.riskType)}`}>
                          {question.riskType === "dependency" ? "Dependency Risk" :
                           question.riskType === "transfer" ? "Transfer Capability" :
                           "Succession Planning"}
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
                      Leadership Assessment
                    </label>
                    <select
                      value={value}
                      onChange={(e) => handleDropdownChange(index, e)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select level</option>
                      {options[index].map((option, optIndex) => (
                        <option key={optIndex} value={option}>
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
                          getContextualResponseColor(index, value) === "green" ? "bg-green-100 dark:bg-green-900/20" :
                          getContextualResponseColor(index, value) === "yellow" ? "bg-yellow-100 dark:bg-yellow-900/20" :
                          getContextualResponseColor(index, value) === "red" ? "bg-red-100 dark:bg-red-900/20" :
                          "bg-gray-100 dark:bg-gray-700"
                        }`}>
                          <ResponseIcon className={`${
                            getContextualResponseColor(index, value) === "green" ? "text-green-600 dark:text-green-400" :
                            getContextualResponseColor(index, value) === "yellow" ? "text-yellow-600 dark:text-yellow-400" :
                            getContextualResponseColor(index, value) === "red" ? "text-red-600 dark:text-red-400" :
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

      </div>
    </motion.div>
  );
};

export default Owners;