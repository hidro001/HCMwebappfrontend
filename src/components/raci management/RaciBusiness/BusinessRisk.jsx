// import React, { useState, useEffect } from "react";
// import { calculatePerformance, getColorFromValue } from "../../../utils/helpers";
// import KeyPerformanceMetrics from "./KeyPerformanceMetrics";

// const BusinessRisk = ({ setScore }) => {
//   const questions = [
//     "Cost of supplies is subject to inflationary pressure.",
//     "Customers are located in depressed geographical areas.",
//     "Does Government legislation protect the supply chain?",
//     "Products/services threatened by imports.",
//     "Insurance management – policies are adequate and cover the main risks.",
//     "Products/services threatened by new technology.",
//     "Last 5 years: number of legal claims > 1% of turnover.",
//     "Premises – where location is important, tenure is secure.",
//     "How many times has input supply disruption negatively impacted operations?",
//     "Supply is concentrated to a small number of suppliers.",
//     "How reliant is the business on its major supplier(s)?",
//     "Do suppliers determine what products and services are offered?",
//   ];

//   const options = [
//     ["High", "Medium", "Low", "Not Applicable"],
//     ["Yes", "No", "Partially", "Not Applicable"],
//     ["Yes", "No", "Partially"],
//     ["Yes", "No", "Not Applicable"],
//     ["Adequate", "Inadequate", "Not Applicable"],
//     ["Yes", "No", "Not Applicable"],
//     ["> 1%", "≤ 1%", "Not Applicable"],
//     ["Secure", "Not secure", "Not applicable"],
//     ["Many times", "Few times", "Never"],
//     ["Yes", "No", "Not Applicable"],
//     ["Highly reliant", "Somewhat reliant", "Not reliant"],
//     ["Yes", "No", "Partially"],
//   ];

//   const mapping = {
//     High: 1,
//     Medium: 3,
//     Low: 5,
//     Yes: 2,
//     No: 4,
//     Partially: 3,
//     Adequate: 5,
//     Inadequate: 1,
//     "> 1%": 1,
//     "≤ 1%": 4,
//     Secure: 5,
//     "Not secure": 1,
//     "Many times": 1,
//     "Few times": 3,
//     Never: 5,
//     "Highly reliant": 1,
//     "Somewhat reliant": 3,
//     "Not reliant": 5,
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
//       <h1 className="text-xl font-semibold mb-4">Business Risk Assessment</h1>
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
//             category: "BUSINESS RISK",
//             percentage: +averagePercentage,
//           },
//         ]}
//       />
//     </div>
//   );
// };

// export default BusinessRisk;



import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShieldAlt,
  FaExclamationTriangle,
  FaDollarSign,
  FaMapMarkerAlt,
  FaGavel,
  FaGlobe,
  FaFileContract,
  FaMicrochip,
  FaBuilding,
  FaTruck,
  FaHandshake,
  FaCogs,
  FaQuestionCircle,
  FaCheckCircle,
  FaTimes,
  FaExclamationCircle,
  FaChartLine
} from "react-icons/fa";
import {
  HiExclamation,
  HiCheck,
  HiX,
  HiInformationCircle
} from "react-icons/hi";
import { calculatePerformance, getColorFromValue } from "../../../utils/helpers";
import KeyPerformanceMetrics from "./KeyPerformanceMetrics";

const BusinessRisk = ({ setScore }) => {
  const questions = [
    {
      id: 1,
      text: "Cost of supplies is subject to inflationary pressure.",
      icon: FaDollarSign,
      category: "Financial Risk",
      description: "Exposure to supply cost volatility and inflation impacts",
      riskLevel: "high"
    },
    {
      id: 2,
      text: "Customers are located in depressed geographical areas.",
      icon: FaMapMarkerAlt,
      category: "Market Risk",
      description: "Geographic concentration and economic dependency risks",
      riskLevel: "medium"
    },
    {
      id: 3,
      text: "Does Government legislation protect the supply chain?",
      icon: FaGavel,
      category: "Regulatory Risk",
      description: "Legal protection and regulatory support for operations",
      riskLevel: "medium"
    },
    {
      id: 4,
      text: "Products/services threatened by imports.",
      icon: FaGlobe,
      category: "Competitive Risk",
      description: "International competition and trade exposure",
      riskLevel: "high"
    },
    {
      id: 5,
      text: "Insurance management – policies are adequate and cover the main risks.",
      icon: FaShieldAlt,
      category: "Insurance Risk",
      description: "Coverage adequacy and risk mitigation strategies",
      riskLevel: "low"
    },
    {
      id: 6,
      text: "Products/services threatened by new technology.",
      icon: FaMicrochip,
      category: "Technology Risk",
      description: "Technological disruption and innovation threats",
      riskLevel: "high"
    },
    {
      id: 7,
      text: "Last 5 years: number of legal claims > 1% of turnover.",
      icon: FaFileContract,
      category: "Legal Risk",
      description: "Historical legal exposure and litigation patterns",
      riskLevel: "medium"
    },
    {
      id: 8,
      text: "Premises – where location is important, tenure is secure.",
      icon: FaBuilding,
      category: "Operational Risk",
      description: "Location security and premises-related risks",
      riskLevel: "medium"
    },
    {
      id: 9,
      text: "How many times has input supply disruption negatively impacted operations?",
      icon: FaTruck,
      category: "Supply Chain Risk",
      description: "Historical supply chain reliability and disruption frequency",
      riskLevel: "high"
    },
    {
      id: 10,
      text: "Supply is concentrated to a small number of suppliers.",
      icon: FaHandshake,
      category: "Supplier Risk",
      description: "Supplier concentration and dependency levels",
      riskLevel: "high"
    },
    {
      id: 11,
      text: "How reliant is the business on its major supplier(s)?",
      icon: FaCogs,
      category: "Dependency Risk",
      description: "Critical supplier dependency and relationship risks",
      riskLevel: "high"
    },
    {
      id: 12,
      text: "Do suppliers determine what products and services are offered?",
      icon: FaHandshake,
      category: "Control Risk",
      description: "Business autonomy and supplier influence on offerings",
      riskLevel: "medium"
    }
  ];

  const options = [
    ["High", "Medium", "Low", "Not Applicable"],
    ["Yes", "No", "Partially", "Not Applicable"],
    ["Yes", "No", "Partially"],
    ["Yes", "No", "Not Applicable"],
    ["Adequate", "Inadequate", "Not Applicable"],
    ["Yes", "No", "Not Applicable"],
    ["> 1%", "≤ 1%", "Not Applicable"],
    ["Secure", "Not secure", "Not applicable"],
    ["Many times", "Few times", "Never"],
    ["Yes", "No", "Not Applicable"],
    ["Highly reliant", "Somewhat reliant", "Not reliant"],
    ["Yes", "No", "Partially"],
  ];

  const mapping = {
    High: 1,
    Medium: 3,
    Low: 5,
    Yes: 2,
    No: 4,
    Partially: 3,
    Adequate: 5,
    Inadequate: 1,
    "> 1%": 1,
    "≤ 1%": 4,
    Secure: 5,
    "Not secure": 1,
    "Many times": 1,
    "Few times": 3,
    Never: 5,
    "Highly reliant": 1,
    "Somewhat reliant": 3,
    "Not reliant": 5,
  };

  const responseColors = {
    "High": "red",
    "Medium": "yellow",
    "Low": "green",
    "Yes": "yellow", // Context dependent
    "No": "green", // Context dependent  
    "Partially": "yellow",
    "Adequate": "green",
    "Inadequate": "red",
    "> 1%": "red",
    "≤ 1%": "green",
    "Secure": "green",
    "Not secure": "red",
    "Many times": "red",
    "Few times": "yellow",
    "Never": "green",
    "Highly reliant": "red",
    "Somewhat reliant": "yellow",
    "Not reliant": "green",
    "Not Applicable": "gray",
    "Not applicable": "gray"
  };

  const responseIcons = {
    "High": FaExclamationTriangle,
    "Medium": HiExclamation,
    "Low": HiCheck,
    "Yes": HiInformationCircle,
    "No": HiCheck,
    "Partially": HiExclamation,
    "Adequate": FaCheckCircle,
    "Inadequate": FaTimes,
    "> 1%": FaExclamationTriangle,
    "≤ 1%": HiCheck,
    "Secure": FaShieldAlt,
    "Not secure": FaExclamationTriangle,
    "Many times": FaTimes,
    "Few times": HiExclamation,
    "Never": FaCheckCircle,
    "Highly reliant": FaExclamationTriangle,
    "Somewhat reliant": HiExclamation,
    "Not reliant": HiCheck,
    "Not Applicable": FaQuestionCircle,
    "Not applicable": FaQuestionCircle
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

  const getRiskLevelColor = (riskLevel) => {
    const colors = {
      "high": "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300",
      "medium": "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300",
      "low": "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300"
    };
    return colors[riskLevel] || "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Financial Risk": "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300",
      "Market Risk": "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
      "Regulatory Risk": "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300",
      "Competitive Risk": "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300",
      "Insurance Risk": "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300",
      "Technology Risk": "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300",
      "Legal Risk": "bg-pink-100 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300",
      "Operational Risk": "bg-teal-100 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300",
      "Supply Chain Risk": "bg-cyan-100 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300",
      "Supplier Risk": "bg-lime-100 dark:bg-lime-900/20 text-lime-700 dark:text-lime-300",
      "Dependency Risk": "bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300",
      "Control Risk": "bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300"
    };
    return colors[category] || "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
  };

  const getCategoryIconColor = (category) => {
    const colors = {
      "Financial Risk": "bg-red-100 dark:bg-red-900/20",
      "Market Risk": "bg-blue-100 dark:bg-blue-900/20",
      "Regulatory Risk": "bg-purple-100 dark:bg-purple-900/20",
      "Competitive Risk": "bg-orange-100 dark:bg-orange-900/20",
      "Insurance Risk": "bg-green-100 dark:bg-green-900/20",
      "Technology Risk": "bg-indigo-100 dark:bg-indigo-900/20",
      "Legal Risk": "bg-pink-100 dark:bg-pink-900/20",
      "Operational Risk": "bg-teal-100 dark:bg-teal-900/20",
      "Supply Chain Risk": "bg-cyan-100 dark:bg-cyan-900/20",
      "Supplier Risk": "bg-lime-100 dark:bg-lime-900/20",
      "Dependency Risk": "bg-amber-100 dark:bg-amber-900/20",
      "Control Risk": "bg-violet-100 dark:bg-violet-900/20"
    };
    return colors[category] || "bg-gray-100 dark:bg-gray-700";
  };

  const getCategoryIconTextColor = (category) => {
    const colors = {
      "Financial Risk": "text-red-600 dark:text-red-400",
      "Market Risk": "text-blue-600 dark:text-blue-400",
      "Regulatory Risk": "text-purple-600 dark:text-purple-400",
      "Competitive Risk": "text-orange-600 dark:text-orange-400",
      "Insurance Risk": "text-green-600 dark:text-green-400",
      "Technology Risk": "text-indigo-600 dark:text-indigo-400",
      "Legal Risk": "text-pink-600 dark:text-pink-400",
      "Operational Risk": "text-teal-600 dark:text-teal-400",
      "Supply Chain Risk": "text-cyan-600 dark:text-cyan-400",
      "Supplier Risk": "text-lime-600 dark:text-lime-400",
      "Dependency Risk": "text-amber-600 dark:text-amber-400",
      "Control Risk": "text-violet-600 dark:text-violet-400"
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
      <div className="bg-red-50 dark:bg-red-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-xl">
              <FaShieldAlt className="text-red-600 dark:text-red-400 text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Business Risk Assessment
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Identify and evaluate potential business risks and vulnerabilities
              </p>
            </div>
          </div>
          
          {/* Score Display */}
          <div className="text-right">
            <div className="text-sm text-gray-500 dark:text-gray-400">Risk Score</div>
            <div className={`text-3xl font-bold ${getScoreColor(averagePercentage)}`}>
              {averagePercentage.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {averagePercentage >= 80 ? "Low Risk" : 
               averagePercentage >= 60 ? "Medium Risk" : 
               averagePercentage >= 40 ? "High Risk" : "Critical Risk"}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">
              Progress: {completedQuestions}/{questions.length} assessments
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {progressPercentage.toFixed(0)}% complete
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-red-600 h-2 rounded-full transition-all duration-500"
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
                  Risk Factor
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
                              <div className="flex flex-wrap gap-2">
                                <span className={`inline-flex px-2 py-1 text-xs rounded-full w-fit ${getCategoryColor(question.category)}`}>
                                  {question.category}
                                </span>
                                <span className={`inline-flex px-2 py-1 text-xs rounded-full w-fit ${getRiskLevelColor(question.riskLevel)}`}>
                                  {question.riskLevel.charAt(0).toUpperCase() + question.riskLevel.slice(1)} Risk
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
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-sm"
                        >
                          <option value="">Select an option</option>
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
                            {value === "" ? "No assessment" : value}
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
                        <span className={`px-2 py-1 text-xs rounded-full ${getRiskLevelColor(question.riskLevel)}`}>
                          {question.riskLevel.charAt(0).toUpperCase() + question.riskLevel.slice(1)} Risk
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
                      Risk Assessment
                    </label>
                    <select
                      value={value}
                      onChange={(e) => handleDropdownChange(index, e)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select an option</option>
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

export default BusinessRisk;