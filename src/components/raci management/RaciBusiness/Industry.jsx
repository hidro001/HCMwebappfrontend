// import React, { useState, useEffect } from "react";
// import { calculatePerformance, getColorFromValue } from "../../../utils/helpers";
// import KeyPerformanceMetrics from "./KeyPerformanceMetrics";

// const Industry = ({ setScore }) => {
//   const questions = [
//     "Business operates in a well-established, stable industry",
//     "The industry / market is growing",
//     "Business likely to be negatively influenced by industry restructuring",
//     "Business likely to be influenced by negative global trends",
//     "Future industry trends will positively affect the business",
//   ];

//   // Map numeric values to a 1-5 scale, then *20 = 100% scale
//   const mapping = {
//     "1": 5, // Definitely
//     "2": 4, // Probably
//     "3": 3, // No - Will change slightly
//     "4": 2, // No - Will change moderately
//     "5": 1, // No - Will change significantly
//   };

//   const [values, setValuesState] = useState(Array(questions.length).fill("0"));

//   const handleDropdownChange = (index, event) => {
//     const newValues = [...values];
//     newValues[index] = event.target.value;
//     setValuesState(newValues);
//   };

//   const { averagePercentage } = calculatePerformance(values, mapping);

//   useEffect(() => {
//     setScore(averagePercentage);
//   }, [averagePercentage, setScore]);

//   return (
//     <div className="p-4 border rounded shadow my-4 dark:bg-gray-800 dark:text-white dark:border-gray-700">
//       <h1 className="text-xl font-semibold mb-4">Industry Performance Assessment</h1>
//       <table className="w-full border-collapse text-left">
//         <thead className="border-b">
//           <tr>
//             <th className="p-2">Question</th>
//             <th className="p-2">Response</th>
//             <th className="p-2">Performance Review</th>
//           </tr>
//         </thead>
//         <tbody>
//           {questions.map((question, index) => {
//             const value = values[index];
//             return (
//               <tr key={index} className="border-b last:border-none">
//                 <td className="p-2">{question}</td>
//                 <td className="p-2">
//                   <select
//                     value={value}
//                     onChange={(e) => handleDropdownChange(index, e)}
//                     className="border px-2 py-1 rounded dark:bg-gray-700"
//                   >
//                     <option value="0">No response</option>
//                     <option value="1">Definitely</option>
//                     <option value="2">Probably</option>
//                     <option value="3">No - Will change slightly</option>
//                     <option value="4">No - Will change moderately</option>
//                     <option value="5">No - Will change significantly</option>
//                   </select>
//                 </td>
//                 <td className="p-2">
//                   <div
//                     className={`inline-block px-2 py-1 text-sm rounded dark:bg-slate-600 ${
//                       getColorFromValue(value)
//                     }`}
//                   >
//                     {value === "0" ? "No response" : value}
//                   </div>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>

//       <KeyPerformanceMetrics
//         performanceData={[
//           {
//             category: "INDUSTRY",
//             percentage: +averagePercentage,
//           },
//         ]}
//       />
//     </div>
//   );
// };

// export default Industry;


import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaIndustry,
  FaQuestionCircle,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimes,
  FaChartLine,
  FaGlobe,
  FaBuilding,
  FaCog,
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaChartBar
} from "react-icons/fa";
import {
  HiInformationCircle,
  HiTrendingUp,
  HiCheck,
  HiExclamation,
  HiX
} from "react-icons/hi";
import { calculatePerformance, getColorFromValue } from "../../../utils/helpers";
import KeyPerformanceMetrics from "./KeyPerformanceMetrics";

const Industry = ({ setScore }) => {
  const questions = [
    {
      id: 1,
      text: "Business operates in a well-established, stable industry",
      icon: FaBuilding,
      category: "Stability",
      description: "Assesses the stability and maturity of your industry sector"
    },
    {
      id: 2,
      text: "The industry / market is growing",
      icon: HiTrendingUp,
      category: "Growth",
      description: "Evaluates the growth potential and trajectory of your market"
    },
    {
      id: 3,
      text: "Business likely to be negatively influenced by industry restructuring",
      icon: FaCog,
      category: "Risk",
      description: "Identifies potential negative impacts from industry changes"
    },
    {
      id: 4,
      text: "Business likely to be influenced by negative global trends",
      icon: FaGlobe,
      category: "Global Impact",
      description: "Assesses vulnerability to worldwide economic and social trends"
    },
    {
      id: 5,
      text: "Future industry trends will positively affect the business",
      icon: FaChartLine,
      category: "Future Outlook",
      description: "Evaluates potential positive impacts from industry evolution"
    }
  ];

  // Map numeric values to a 1-5 scale, then *20 = 100% scale
  const mapping = {
    "1": 5, // Definitely
    "2": 4, // Probably
    "3": 3, // No - Will change slightly
    "4": 2, // No - Will change moderately
    "5": 1, // No - Will change significantly
  };

  const responseOptions = [
    { value: "0", label: "No response", icon: FaQuestionCircle, color: "gray" },
    { value: "1", label: "Definitely", icon: FaCheckCircle, color: "green" },
    { value: "2", label: "Probably", icon: HiCheck, color: "blue" },
    { value: "3", label: "No - Will change slightly", icon: FaMinus, color: "yellow" },
    { value: "4", label: "No - Will change moderately", icon: HiExclamation, color: "orange" },
    { value: "5", label: "No - Will change significantly", icon: HiX, color: "red" }
  ];

  const [values, setValuesState] = useState(Array(questions.length).fill("0"));
  const [completedQuestions, setCompletedQuestions] = useState(0);

  const handleDropdownChange = (index, event) => {
    const newValues = [...values];
    const oldValue = newValues[index];
    newValues[index] = event.target.value;
    setValuesState(newValues);

    // Update completed questions count
    const completed = newValues.filter(val => val !== "0").length;
    setCompletedQuestions(completed);
  };

  const { averagePercentage } = calculatePerformance(values, mapping);

  useEffect(() => {
    setScore(averagePercentage);
  }, [averagePercentage, setScore]);

  const getResponseColor = (value) => {
    const option = responseOptions.find(opt => opt.value === value);
    return option ? option.color : "gray";
  };

  const getResponseIcon = (value) => {
    const option = responseOptions.find(opt => opt.value === value);
    return option ? option.icon : FaQuestionCircle;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
    if (score >= 40) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBg = (score) => {
    if (score >= 80) return "bg-green-100 dark:bg-green-900/20";
    if (score >= 60) return "bg-yellow-100 dark:bg-yellow-900/20";
    if (score >= 40) return "bg-orange-100 dark:bg-orange-900/20";
    return "bg-red-100 dark:bg-red-900/20";
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
              <FaIndustry className="text-blue-600 dark:text-blue-400 text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Industry Performance Assessment
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Evaluate your business position within the industry landscape
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
                  Question
                </th>
                <th className="w-1/4 text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Response
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
                          <div className={`p-2 rounded-lg flex-shrink-0 ${
                            question.category === "Stability" ? "bg-green-100 dark:bg-green-900/20" :
                            question.category === "Growth" ? "bg-blue-100 dark:bg-blue-900/20" :
                            question.category === "Risk" ? "bg-red-100 dark:bg-red-900/20" :
                            question.category === "Global Impact" ? "bg-purple-100 dark:bg-purple-900/20" :
                            "bg-orange-100 dark:bg-orange-900/20"
                          }`}>
                            <QuestionIcon className={`w-4 h-4 ${
                              question.category === "Stability" ? "text-green-600 dark:text-green-400" :
                              question.category === "Growth" ? "text-blue-600 dark:text-blue-400" :
                              question.category === "Risk" ? "text-red-600 dark:text-red-400" :
                              question.category === "Global Impact" ? "text-purple-600 dark:text-purple-400" :
                              "text-orange-600 dark:text-orange-400"
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col space-y-2 mb-2">
                              <span className="text-sm font-medium text-gray-900 dark:text-white break-words">
                                {question.text}
                              </span>
                              <span className={`inline-flex px-2 py-1 text-xs rounded-full w-fit ${
                                question.category === "Stability" ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300" :
                                question.category === "Growth" ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300" :
                                question.category === "Risk" ? "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300" :
                                question.category === "Global Impact" ? "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300" :
                                "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300"
                              }`}>
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
                          {responseOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
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
                            getResponseColor(value) === "orange" ? "bg-orange-100 dark:bg-orange-900/20" :
                            getResponseColor(value) === "red" ? "bg-red-100 dark:bg-red-900/20" :
                            "bg-gray-100 dark:bg-gray-700"
                          }`}>
                            <ResponseIcon className={`w-4 h-4 ${
                              getResponseColor(value) === "green" ? "text-green-600 dark:text-green-400" :
                              getResponseColor(value) === "blue" ? "text-blue-600 dark:text-blue-400" :
                              getResponseColor(value) === "yellow" ? "text-yellow-600 dark:text-yellow-400" :
                              getResponseColor(value) === "orange" ? "text-orange-600 dark:text-orange-400" :
                              getResponseColor(value) === "red" ? "text-red-600 dark:text-red-400" :
                              "text-gray-500 dark:text-gray-400"
                            }`} />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 break-words">
                            {value === "0" ? "No response" : responseOptions.find(opt => opt.value === value)?.label}
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
        <div className="lg:hidden space-y-4">
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
                    <div className={`p-2 rounded-lg ${
                      question.category === "Stability" ? "bg-green-100 dark:bg-green-900/20" :
                      question.category === "Growth" ? "bg-blue-100 dark:bg-blue-900/20" :
                      question.category === "Risk" ? "bg-red-100 dark:bg-red-900/20" :
                      question.category === "Global Impact" ? "bg-purple-100 dark:bg-purple-900/20" :
                      "bg-orange-100 dark:bg-orange-900/20"
                    }`}>
                      <QuestionIcon className={`${
                        question.category === "Stability" ? "text-green-600 dark:text-green-400" :
                        question.category === "Growth" ? "text-blue-600 dark:text-blue-400" :
                        question.category === "Risk" ? "text-red-600 dark:text-red-400" :
                        question.category === "Global Impact" ? "text-purple-600 dark:text-purple-400" :
                        "text-orange-600 dark:text-orange-400"
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          question.category === "Stability" ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300" :
                          question.category === "Growth" ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300" :
                          question.category === "Risk" ? "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300" :
                          question.category === "Global Impact" ? "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300" :
                          "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300"
                        }`}>
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
                      Your Response
                    </label>
                    <select
                      value={value}
                      onChange={(e) => handleDropdownChange(index, e)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      {responseOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    {/* Status Display */}
                    {value !== "0" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-2 pt-2"
                      >
                        <div className={`p-2 rounded-lg ${
                          getResponseColor(value) === "green" ? "bg-green-100 dark:bg-green-900/20" :
                          getResponseColor(value) === "blue" ? "bg-blue-100 dark:bg-blue-900/20" :
                          getResponseColor(value) === "yellow" ? "bg-yellow-100 dark:bg-yellow-900/20" :
                          getResponseColor(value) === "orange" ? "bg-orange-100 dark:bg-orange-900/20" :
                          "bg-red-100 dark:bg-red-900/20"
                        }`}>
                          <ResponseIcon className={`${
                            getResponseColor(value) === "green" ? "text-green-600 dark:text-green-400" :
                            getResponseColor(value) === "blue" ? "text-blue-600 dark:text-blue-400" :
                            getResponseColor(value) === "yellow" ? "text-yellow-600 dark:text-yellow-400" :
                            getResponseColor(value) === "orange" ? "text-orange-600 dark:text-orange-400" :
                            "text-red-600 dark:text-red-400"
                          }`} />
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {responseOptions.find(opt => opt.value === value)?.label}
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

export default Industry;