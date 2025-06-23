// import React, { useState, useEffect } from "react";
// import { calculatePerformance, getColorFromValue } from "../../../utils/helpers";
// import KeyPerformanceMetrics from "./KeyPerformanceMetrics";

// const SuccessionEstatePlanning = ({ setScore }) => {
//   const questions = [
//     "Risk insurance (Life, TPD, Key Person etc.) for key stakeholders exists.",
//     "Documented business life plan.",
//     "Documented succession plan.",
//     "Documented estate plan.",
//     "Surplus capital exists for future growth and succession.",
//     "Strategies in place to protect, grow, and realize wealth.",
//     "Business is easy to sell.",
//   ];

//   const options = [
//     ["Yes", "No", "Partially", "Not Applicable"],
//     ["Yes", "No", "Partially", "Not Applicable"],
//     ["Yes", "No", "Partially", "Not Applicable"],
//     ["Yes", "No", "Partially", "Not Applicable"],
//     ["Yes", "No", "Partially", "Not Applicable"],
//     ["Yes", "No", "Partially", "Not Applicable"],
//     ["Yes", "No", "Partially", "Not Applicable"],
//   ];

//   const mapping = {
//     Yes: 5,
//     Partially: 3,
//     No: 1,
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
//       <h1 className="text-xl font-semibold mb-4">Succession & Estate Planning Assessment</h1>
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
//             category: "SUCCESSION AND ESTATE PLANNING",
//             percentage: +averagePercentage,
//           },
//         ]}
//       />
//     </div>
//   );
// };

// export default SuccessionEstatePlanning;



import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShieldAlt,
  FaRoute,
  FaUsers,
  FaFileContract,
  FaPiggyBank,
  FaHandshake,
  FaQuestionCircle,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimes,
  FaChartLine,
  FaUmbrella,
  FaMap,
  FaCrown,
  FaCoins,
  FaGem,
  FaStore
} from "react-icons/fa";
import {
  HiExclamation,
  HiCheck,
  HiX,
  HiInformationCircle,
  HiDocumentText,
  HiCash
} from "react-icons/hi";
import { calculatePerformance, getColorFromValue } from "../../../utils/helpers";
import KeyPerformanceMetrics from "./KeyPerformanceMetrics";

const SuccessionEstatePlanning = ({ setScore }) => {
  const questions = [
    {
      id: 1,
      text: "Risk insurance (Life, TPD, Key Person etc.) for key stakeholders exists.",
      icon: FaUmbrella,
      category: "Risk Protection",
      description: "Insurance coverage protecting key business stakeholders and operations",
      planningType: "protection"
    },
    {
      id: 2,
      text: "Documented business life plan.",
      icon: FaMap,
      category: "Strategic Planning",
      description: "Comprehensive business lifecycle and strategic roadmap documentation",
      planningType: "strategic"
    },
    {
      id: 3,
      text: "Documented succession plan.",
      icon: FaCrown,
      category: "Leadership Transition",
      description: "Formal succession planning for leadership and ownership transfer",
      planningType: "succession"
    },
    {
      id: 4,
      text: "Documented estate plan.",
      icon: HiDocumentText,
      category: "Estate Management",
      description: "Legal estate planning documentation and wealth transfer strategies",
      planningType: "estate"
    },
    {
      id: 5,
      text: "Surplus capital exists for future growth and succession.",
      icon: FaCoins,
      category: "Financial Readiness",
      description: "Capital reserves available for business expansion and succession funding",
      planningType: "financial"
    },
    {
      id: 6,
      text: "Strategies in place to protect, grow, and realize wealth.",
      icon: FaGem,
      category: "Wealth Management",
      description: "Comprehensive wealth protection, growth, and realization strategies",
      planningType: "wealth"
    },
    {
      id: 7,
      text: "Business is easy to sell.",
      icon: FaStore,
      category: "Exit Readiness",
      description: "Business structure and documentation supporting easy transferability",
      planningType: "exit"
    }
  ];

  const options = [
    ["Yes", "No", "Partially", "Not Applicable"],
    ["Yes", "No", "Partially", "Not Applicable"],
    ["Yes", "No", "Partially", "Not Applicable"],
    ["Yes", "No", "Partially", "Not Applicable"],
    ["Yes", "No", "Partially", "Not Applicable"],
    ["Yes", "No", "Partially", "Not Applicable"],
    ["Yes", "No", "Partially", "Not Applicable"],
  ];

  const mapping = {
    Yes: 5,
    Partially: 3,
    No: 1,
  };

  const responseColors = {
    "Yes": "green",
    "Partially": "yellow", 
    "No": "red",
    "Not Applicable": "gray"
  };

  const responseIcons = {
    "Yes": FaCheckCircle,
    "Partially": HiExclamation,
    "No": FaTimes,
    "Not Applicable": FaQuestionCircle
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

  const getPlanningTypeColor = (type) => {
    const colors = {
      "protection": "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
      "strategic": "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300",
      "succession": "bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300",
      "estate": "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300",
      "financial": "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300",
      "wealth": "bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300",
      "exit": "bg-rose-100 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300"
    };
    return colors[type] || "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Risk Protection": "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
      "Strategic Planning": "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300",
      "Leadership Transition": "bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300",
      "Estate Management": "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300",
      "Financial Readiness": "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300",
      "Wealth Management": "bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300",
      "Exit Readiness": "bg-rose-100 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300"
    };
    return colors[category] || "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
  };

  const getCategoryIconColor = (category) => {
    const colors = {
      "Risk Protection": "bg-blue-100 dark:bg-blue-900/20",
      "Strategic Planning": "bg-purple-100 dark:bg-purple-900/20",
      "Leadership Transition": "bg-amber-100 dark:bg-amber-900/20",
      "Estate Management": "bg-green-100 dark:bg-green-900/20",
      "Financial Readiness": "bg-emerald-100 dark:bg-emerald-900/20",
      "Wealth Management": "bg-violet-100 dark:bg-violet-900/20",
      "Exit Readiness": "bg-rose-100 dark:bg-rose-900/20"
    };
    return colors[category] || "bg-gray-100 dark:bg-gray-700";
  };

  const getCategoryIconTextColor = (category) => {
    const colors = {
      "Risk Protection": "text-blue-600 dark:text-blue-400",
      "Strategic Planning": "text-purple-600 dark:text-purple-400",
      "Leadership Transition": "text-amber-600 dark:text-amber-400",
      "Estate Management": "text-green-600 dark:text-green-400",
      "Financial Readiness": "text-emerald-600 dark:text-emerald-400",
      "Wealth Management": "text-violet-600 dark:text-violet-400",
      "Exit Readiness": "text-rose-600 dark:text-rose-400"
    };
    return colors[category] || "text-gray-600 dark:text-gray-400";
  };

  const getPlanningReadiness = (score) => {
    if (score >= 90) return { level: "Fully Prepared", color: "text-green-600 dark:text-green-400", icon: "🎯" };
    if (score >= 75) return { level: "Well Planned", color: "text-blue-600 dark:text-blue-400", icon: "📋" };
    if (score >= 50) return { level: "In Progress", color: "text-yellow-600 dark:text-yellow-400", icon: "🔄" };
    if (score >= 25) return { level: "Basic Planning", color: "text-orange-600 dark:text-orange-400", icon: "⚠️" };
    return { level: "Needs Attention", color: "text-red-600 dark:text-red-400", icon: "🚨" };
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
  const readinessLevel = getPlanningReadiness(averagePercentage);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Header Section */}
      <div className="bg-violet-50 dark:bg-violet-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-violet-100 dark:bg-violet-900/20 rounded-xl">
              <FaRoute className="text-violet-600 dark:text-violet-400 text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Succession & Estate Planning
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Assess business continuity and wealth transfer preparedness
              </p>
            </div>
          </div>
          
          {/* Score Display */}
          <div className="text-right">
            <div className="text-sm text-gray-500 dark:text-gray-400">Planning Readiness</div>
            <div className={`text-3xl font-bold ${getScoreColor(averagePercentage)}`}>
              {averagePercentage.toFixed(1)}%
            </div>
            <div className={`text-xs flex items-center justify-end space-x-1 ${readinessLevel.color}`}>
              <span>{readinessLevel.icon}</span>
              <span>{readinessLevel.level}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">
              Planning Progress: {completedQuestions}/{questions.length} areas
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {progressPercentage.toFixed(0)}% complete
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-violet-600 h-2 rounded-full transition-all duration-500"
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
                  Planning Area
                </th>
                <th className="w-1/4 text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="w-1/3 text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Readiness
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
                              <div className="flex flex-wrap gap-2">
                                <span className={`inline-flex px-2 py-1 text-xs rounded-full w-fit ${getCategoryColor(question.category)}`}>
                                  {question.category}
                                </span>
                                <span className={`inline-flex px-2 py-1 text-xs rounded-full w-fit ${getPlanningTypeColor(question.planningType)}`}>
                                  {question.planningType === "protection" ? "Protection" :
                                   question.planningType === "strategic" ? "Strategic" :
                                   question.planningType === "succession" ? "Succession" :
                                   question.planningType === "estate" ? "Estate" :
                                   question.planningType === "financial" ? "Financial" :
                                   question.planningType === "wealth" ? "Wealth" :
                                   "Exit Planning"}
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
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 text-sm"
                        >
                          <option value="">Select status</option>
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
                            getResponseColor(value) === "yellow" ? "bg-yellow-100 dark:bg-yellow-900/20" :
                            getResponseColor(value) === "red" ? "bg-red-100 dark:bg-red-900/20" :
                            "bg-gray-100 dark:bg-gray-700"
                          }`}>
                            <ResponseIcon className={`w-4 h-4 ${
                              getResponseColor(value) === "green" ? "text-green-600 dark:text-green-400" :
                              getResponseColor(value) === "yellow" ? "text-yellow-600 dark:text-yellow-400" :
                              getResponseColor(value) === "red" ? "text-red-600 dark:text-red-400" :
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
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(question.category)}`}>
                          {question.category}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getPlanningTypeColor(question.planningType)}`}>
                          {question.planningType === "protection" ? "Protection" :
                           question.planningType === "strategic" ? "Strategic" :
                           question.planningType === "succession" ? "Succession" :
                           question.planningType === "estate" ? "Estate" :
                           question.planningType === "financial" ? "Financial" :
                           question.planningType === "wealth" ? "Wealth" :
                           "Exit Planning"}
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
                      Implementation Status
                    </label>
                    <select
                      value={value}
                      onChange={(e) => handleDropdownChange(index, e)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select status</option>
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
                          getResponseColor(value) === "yellow" ? "bg-yellow-100 dark:bg-yellow-900/20" :
                          getResponseColor(value) === "red" ? "bg-red-100 dark:bg-red-900/20" :
                          "bg-gray-100 dark:bg-gray-700"
                        }`}>
                          <ResponseIcon className={`${
                            getResponseColor(value) === "green" ? "text-green-600 dark:text-green-400" :
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

    
      </div>
    </motion.div>
  );
};

export default SuccessionEstatePlanning;