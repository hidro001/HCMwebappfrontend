// import React, { useState, useEffect } from "react";
// import { calculatePerformance, getColorFromValue } from "../../../utils/helpers";
// import KeyPerformanceMetrics from "./KeyPerformanceMetrics";

// const CustomersMarketDemand = ({ setScore }) => {
//   const questions = [
//     "Top 10 Customers: % of Total Income.",
//     "Degree of customer loyalty.",
//     "Percentage of customers that generate 80% of profits.",
//     "Substitutes exist for your products/services.",
//     "Effect on income if key customers sold their business.",
//     "How would a 10% increase in your prices affect customer demand?",
//   ];

//   const options = [
//     ["High", "Medium", "Low", "Not Applicable"],
//     ["High", "Medium", "Low", "Not Applicable"],
//     ["High", "Medium", "Low", "Not Applicable"],
//     ["Yes", "No", "Partially"],
//     ["High", "Medium", "Low", "Not Applicable"],
//     ["High", "Medium", "Low", "Not Applicable"],
//   ];

//   const mapping = {
//     High: 1,
//     Medium: 3,
//     Low: 5,
//     Yes: 1,
//     No: 5,
//     Partially: 3,
//     Good: 5,
//     Moderate: 3,
//     Poor: 1,
//   };

//   const [values, setValues] = useState(Array(questions.length).fill(""));

//   const handleDropdownChange = (index, e) => {
//     const newValues = [...values];
//     newValues[index] = e.target.value;
//     setValues(newValues);
//   };

//   const { averagePercentage } = calculatePerformance(values, mapping);

//   useEffect(() => {
//     setScore(averagePercentage);
//   }, [averagePercentage, setScore]);

//   return (
//     <div className="p-4 border rounded shadow my-4 dark:bg-gray-800 dark:text-white dark:border-gray-700">
//       <h1 className="text-xl font-semibold mb-4">Customers & Market Demand Assessment</h1>
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
//                   {options[index].map((option, optIndex) => (
//                     <option key={optIndex} value={option}>
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
//             category: "CUSTOMERS AND MARKET DEMAND",
//             percentage: +averagePercentage,
//           },
//         ]}
//       />
//     </div>
//   );
// };

// export default CustomersMarketDemand;


import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUsers,
  FaHeart,
  FaPercentage,
  FaExchangeAlt,
  FaHandshake,
  FaDollarSign,
  FaQuestionCircle,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimes,
  FaChartLine,
  FaUserFriends,
  FaShoppingCart,
  FaPiggyBank,
  FaBalanceScale,
  FaTags
} from "react-icons/fa";
import {
  HiExclamation,
  HiCheck,
  HiX,
  HiInformationCircle,
  HiUserGroup,
  HiShoppingCart
} from "react-icons/hi";
import { calculatePerformance, getColorFromValue } from "../../../utils/helpers";
import KeyPerformanceMetrics from "./KeyPerformanceMetrics";

const CustomersMarketDemand = ({ setScore }) => {
  const questions = [
    {
      id: 1,
      text: "Top 10 Customers: % of Total Income.",
      icon: FaUsers,
      category: "Customer Concentration",
      description: "Revenue dependency on largest customer accounts",
      riskType: "concentration"
    },
    {
      id: 2,
      text: "Degree of customer loyalty.",
      icon: FaHeart,
      category: "Customer Retention",
      description: "Customer loyalty and retention strength assessment",
      riskType: "loyalty"
    },
    {
      id: 3,
      text: "Percentage of customers that generate 80% of profits.",
      icon: FaPercentage,
      category: "Profit Concentration",
      description: "Customer base profitability distribution analysis",
      riskType: "profitability"
    },
    {
      id: 4,
      text: "Substitutes exist for your products/services.",
      icon: FaExchangeAlt,
      category: "Market Competition",
      description: "Availability of alternative solutions in the market",
      riskType: "substitution"
    },
    {
      id: 5,
      text: "Effect on income if key customers sold their business.",
      icon: FaHandshake,
      category: "Customer Stability",
      description: "Impact of major customer business changes on revenue",
      riskType: "stability"
    },
    {
      id: 6,
      text: "How would a 10% increase in your prices affect customer demand?",
      icon: FaDollarSign,
      category: "Price Sensitivity",
      description: "Customer price elasticity and demand response",
      riskType: "pricing"
    }
  ];

  const options = [
    ["High", "Medium", "Low", "Not Applicable"],
    ["High", "Medium", "Low", "Not Applicable"],
    ["High", "Medium", "Low", "Not Applicable"],
    ["Yes", "No", "Partially"],
    ["High", "Medium", "Low", "Not Applicable"],
    ["High", "Medium", "Low", "Not Applicable"],
  ];

  const mapping = {
    High: 1,
    Medium: 3,
    Low: 5,
    Yes: 1,
    No: 5,
    Partially: 3,
    Good: 5,
    Moderate: 3,
    Poor: 1,
  };

  // Context-aware scoring for customer questions
  const getContextualScore = (questionIndex, value) => {
    // Questions 0, 2, 4, 5: High concentration/impact is bad (risk)
    // Question 1: High loyalty is good
    // Question 3: Yes (substitutes exist) is bad
    
    if (questionIndex === 1) { // Customer loyalty - High is good
      if (value === "High") return 5;
      if (value === "Medium") return 3;
      if (value === "Low") return 1;
    } else if (questionIndex === 3) { // Substitutes exist - Yes is bad
      if (value === "Yes") return 1;
      if (value === "No") return 5;
      if (value === "Partially") return 3;
    } else { // Other questions - High concentration/impact is risky
      return mapping[value] || 0;
    }
    return mapping[value] || 0;
  };

  const responseColors = {
    "High": "red", // Generally risky except for loyalty
    "Medium": "yellow",
    "Low": "green", // Generally safer
    "Yes": "red", // Bad for substitutes question
    "No": "green", // Good for substitutes question
    "Partially": "yellow",
    "Not Applicable": "gray"
  };

  const responseIcons = {
    "High": FaExclamationTriangle,
    "Medium": HiExclamation,
    "Low": HiCheck,
    "Yes": FaTimes,
    "No": FaCheckCircle,
    "Partially": HiExclamation,
    "Not Applicable": FaQuestionCircle
  };

  const [values, setValues] = useState(Array(questions.length).fill(""));
  const [completedQuestions, setCompletedQuestions] = useState(0);

  const handleDropdownChange = (index, e) => {
    const newValues = [...values];
    newValues[index] = e.target.value;
    setValues(newValues);

    // Update completed questions count
    const completed = newValues.filter(val => val !== "").length;
    setCompletedQuestions(completed);
  };

  const { averagePercentage } = calculatePerformance(values, mapping);

  useEffect(() => {
    setScore(averagePercentage);
  }, [averagePercentage, setScore]);

  const getResponseColor = (value, questionIndex) => {
    // Context-aware coloring
    if (questionIndex === 1) { // Customer loyalty - inverse colors
      if (value === "High") return "green";
      if (value === "Medium") return "yellow";
      if (value === "Low") return "red";
    }
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

  const getRiskTypeColor = (type) => {
    const colors = {
      "concentration": "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300",
      "loyalty": "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300",
      "profitability": "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
      "substitution": "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300",
      "stability": "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300",
      "pricing": "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300"
    };
    return colors[type] || "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Customer Concentration": "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300",
      "Customer Retention": "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300",
      "Profit Concentration": "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
      "Market Competition": "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300",
      "Customer Stability": "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300",
      "Price Sensitivity": "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300"
    };
    return colors[category] || "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
  };

  const getCategoryIconColor = (category) => {
    const colors = {
      "Customer Concentration": "bg-red-100 dark:bg-red-900/20",
      "Customer Retention": "bg-green-100 dark:bg-green-900/20",
      "Profit Concentration": "bg-blue-100 dark:bg-blue-900/20",
      "Market Competition": "bg-orange-100 dark:bg-orange-900/20",
      "Customer Stability": "bg-purple-100 dark:bg-purple-900/20",
      "Price Sensitivity": "bg-yellow-100 dark:bg-yellow-900/20"
    };
    return colors[category] || "bg-gray-100 dark:bg-gray-700";
  };

  const getCategoryIconTextColor = (category) => {
    const colors = {
      "Customer Concentration": "text-red-600 dark:text-red-400",
      "Customer Retention": "text-green-600 dark:text-green-400",
      "Profit Concentration": "text-blue-600 dark:text-blue-400",
      "Market Competition": "text-orange-600 dark:text-orange-400",
      "Customer Stability": "text-purple-600 dark:text-purple-400",
      "Price Sensitivity": "text-yellow-600 dark:text-yellow-400"
    };
    return colors[category] || "text-gray-600 dark:text-gray-400";
  };

  const getMarketStrength = (score) => {
    if (score >= 80) return { level: "Strong Market Position", color: "text-green-600 dark:text-green-400", icon: "💪" };
    if (score >= 60) return { level: "Stable Customer Base", color: "text-blue-600 dark:text-blue-400", icon: "👥" };
    if (score >= 40) return { level: "Moderate Risks", color: "text-yellow-600 dark:text-yellow-400", icon: "⚠️" };
    return { level: "High Customer Risk", color: "text-red-600 dark:text-red-400", icon: "🚨" };
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
  const marketStrength = getMarketStrength(averagePercentage);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Header Section */}
      <div className="bg-teal-50 dark:bg-teal-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-teal-100 dark:bg-teal-900/20 rounded-xl">
              <HiUserGroup className="text-teal-600 dark:text-teal-400 text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Customers & Market Demand
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Analyze customer relationships, market position, and demand stability
              </p>
            </div>
          </div>
          
          {/* Score Display */}
          <div className="text-right">
            <div className="text-sm text-gray-500 dark:text-gray-400">Market Strength</div>
            <div className={`text-3xl font-bold ${getScoreColor(averagePercentage)}`}>
              {averagePercentage.toFixed(1)}%
            </div>
            <div className={`text-xs flex items-center justify-end space-x-1 ${marketStrength.color}`}>
              <span>{marketStrength.icon}</span>
              <span>{marketStrength.level}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">
              Assessment Progress: {completedQuestions}/{questions.length} factors
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {progressPercentage.toFixed(0)}% complete
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-teal-600 h-2 rounded-full transition-all duration-500"
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
                  Customer Factor
                </th>
                <th className="w-1/4 text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Assessment
                </th>
                <th className="w-1/3 text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Impact
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
                                <span className={`inline-flex px-2 py-1 text-xs rounded-full w-fit ${getRiskTypeColor(question.riskType)}`}>
                                  {question.riskType === "concentration" ? "Concentration Risk" :
                                   question.riskType === "loyalty" ? "Loyalty Factor" :
                                   question.riskType === "profitability" ? "Profit Analysis" :
                                   question.riskType === "substitution" ? "Competition Risk" :
                                   question.riskType === "stability" ? "Stability Risk" :
                                   "Price Risk"}
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
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-sm"
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
                            getResponseColor(value, index) === "green" ? "bg-green-100 dark:bg-green-900/20" :
                            getResponseColor(value, index) === "yellow" ? "bg-yellow-100 dark:bg-yellow-900/20" :
                            getResponseColor(value, index) === "red" ? "bg-red-100 dark:bg-red-900/20" :
                            "bg-gray-100 dark:bg-gray-700"
                          }`}>
                            <ResponseIcon className={`w-4 h-4 ${
                              getResponseColor(value, index) === "green" ? "text-green-600 dark:text-green-400" :
                              getResponseColor(value, index) === "yellow" ? "text-yellow-600 dark:text-yellow-400" :
                              getResponseColor(value, index) === "red" ? "text-red-600 dark:text-red-400" :
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
                        <span className={`px-2 py-1 text-xs rounded-full ${getRiskTypeColor(question.riskType)}`}>
                          {question.riskType === "concentration" ? "Concentration Risk" :
                           question.riskType === "loyalty" ? "Loyalty Factor" :
                           question.riskType === "profitability" ? "Profit Analysis" :
                           question.riskType === "substitution" ? "Competition Risk" :
                           question.riskType === "stability" ? "Stability Risk" :
                           "Price Risk"}
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
                      Market Assessment
                    </label>
                    <select
                      value={value}
                      onChange={(e) => handleDropdownChange(index, e)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
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
                          getResponseColor(value, index) === "green" ? "bg-green-100 dark:bg-green-900/20" :
                          getResponseColor(value, index) === "yellow" ? "bg-yellow-100 dark:bg-yellow-900/20" :
                          getResponseColor(value, index) === "red" ? "bg-red-100 dark:bg-red-900/20" :
                          "bg-gray-100 dark:bg-gray-700"
                        }`}>
                          <ResponseIcon className={`${
                            getResponseColor(value, index) === "green" ? "text-green-600 dark:text-green-400" :
                            getResponseColor(value, index) === "yellow" ? "text-yellow-600 dark:text-yellow-400" :
                            getResponseColor(value, index) === "red" ? "text-red-600 dark:text-red-400" :
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

export default CustomersMarketDemand;