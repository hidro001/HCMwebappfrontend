// import React, { useState, useEffect } from "react";
// import { calculatePerformance, getColorFromValue } from "../../../utils/helpers";
// import KeyPerformanceMetrics from "./KeyPerformanceMetrics";

// const Staff = ({ setScore }) => {
//   const questions = [
//     "The industry is losing staff to other industries.",
//     "Staff appraisals confirm commitment to organizational goals.",
//     "Key staff experience and industry knowledge.",
//     "Formal strategies for staff recruitment, retention, and training.",
//     "Staff retention history.",
//     "Formal communication within the business.",
//   ];

//   const options = [
//     ["High", "Medium", "Low", "Not Applicable"],
//     ["High", "Medium", "Low", "Not Applicable"],
//     ["High", "Medium", "Low", "Not Applicable"],
//     ["Yes", "No", "Partially"],
//     ["Good", "Moderate", "Poor"],
//     ["Yes", "No", "Partially"],
//   ];

//   const mapping = {
//     High: 1,
//     Medium: 3,
//     Low: 5,
//     Yes: 5,
//     No: 1,
//     Partially: 3,
//     Good: 5,
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
//       <h1 className="text-xl font-semibold mb-4">Staff Assessment</h1>
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
//             category: "STAFF",
//             percentage: +averagePercentage,
//           },
//         ]}
//       />
//     </div>
//   );
// };

// export default Staff;



import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUsers,
  FaUserCheck,
  FaBrain,
  FaGraduationCap,
  FaHandHoldingHeart,
  FaComments,
  FaQuestionCircle,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimes,
  FaChartLine,
  FaUserTie,
  FaAward,
  FaChalkboardTeacher,
  FaUserFriends,
  FaBullhorn,
  FaTrophy
} from "react-icons/fa";
import {
  HiExclamation,
  HiCheck,
  HiX,
  HiInformationCircle,
  HiUserGroup,
  HiStar
} from "react-icons/hi";
import { calculatePerformance, getColorFromValue } from "../../../utils/helpers";
import KeyPerformanceMetrics from "./KeyPerformanceMetrics";

const Staff = ({ setScore }) => {
  const questions = [
    {
      id: 1,
      text: "The industry is losing staff to other industries.",
      icon: FaUsers,
      category: "Industry Retention",
      description: "External talent drain affecting the broader industry sector",
      hrArea: "talent_market",
      isReverse: true // High is bad for this question
    },
    {
      id: 2,
      text: "Staff appraisals confirm commitment to organizational goals.",
      icon: FaUserCheck,
      category: "Employee Engagement",
      description: "Team alignment and commitment to company objectives",
      hrArea: "engagement",
      isReverse: false
    },
    {
      id: 3,
      text: "Key staff experience and industry knowledge.",
      icon: FaBrain,
      category: "Expertise Level",
      description: "Critical knowledge and experience within the organization",
      hrArea: "competency",
      isReverse: false
    },
    {
      id: 4,
      text: "Formal strategies for staff recruitment, retention, and training.",
      icon: FaGraduationCap,
      category: "HR Strategy",
      description: "Structured approach to talent management and development",
      hrArea: "strategy",
      isReverse: false
    },
    {
      id: 5,
      text: "Staff retention history.",
      icon: FaHandHoldingHeart,
      category: "Retention Success",
      description: "Historical performance in keeping valuable employees",
      hrArea: "retention",
      isReverse: false
    },
    {
      id: 6,
      text: "Formal communication within the business.",
      icon: FaComments,
      category: "Internal Communication",
      description: "Structured communication systems and processes",
      hrArea: "communication",
      isReverse: false
    }
  ];

  const options = [
    ["High", "Medium", "Low", "Not Applicable"],
    ["High", "Medium", "Low", "Not Applicable"],
    ["High", "Medium", "Low", "Not Applicable"],
    ["Yes", "No", "Partially"],
    ["Good", "Moderate", "Poor"],
    ["Yes", "No", "Partially"],
  ];

  // Context-aware mapping based on question type
  const getContextualMapping = (questionIndex, value) => {
    const question = questions[questionIndex];
    
    if (question.isReverse) {
      // For negative questions (like industry losing staff), reverse the scoring
      const reverseMapping = {
        High: 1,    // High staff loss is bad
        Medium: 3,  // Medium staff loss is moderate concern
        Low: 5,     // Low staff loss is good
        "Not Applicable": 3
      };
      return reverseMapping[value] || 0;
    }
    
    // Standard mapping for positive questions
    const standardMapping = {
      High: 5,        // High engagement/expertise is good
      Medium: 3,      // Medium is moderate
      Low: 1,         // Low is bad
      Yes: 5,         // Yes to formal strategies is good
      No: 1,          // No formal strategies is bad
      Partially: 3,   // Partial implementation is moderate
      Good: 5,        // Good retention is excellent
      Moderate: 3,    // Moderate retention is okay
      Poor: 1,        // Poor retention is bad
      "Not Applicable": 3
    };
    
    return standardMapping[value] || 0;
  };

  const responseColors = {
    "High": "green",     // Context dependent
    "Medium": "yellow", 
    "Low": "red",       // Context dependent
    "Yes": "green",
    "No": "red",
    "Partially": "yellow",
    "Good": "green",
    "Moderate": "yellow",
    "Poor": "red",
    "Not Applicable": "gray"
  };

  const getContextualColor = (questionIndex, value) => {
    const question = questions[questionIndex];
    
    if (question.isReverse && (value === "High" || value === "Low")) {
      // Reverse colors for negative questions
      return value === "High" ? "red" : "green";
    }
    
    return responseColors[value] || "gray";
  };

  const responseIcons = {
    "High": HiStar,
    "Medium": HiExclamation,
    "Low": HiCheck,
    "Yes": FaCheckCircle,
    "No": FaTimes,
    "Partially": HiExclamation,
    "Good": FaTrophy,
    "Moderate": HiExclamation,
    "Poor": FaTimes,
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

  // Calculate performance using contextual mapping
  const calculateContextualPerformance = () => {
    const scores = values.map((value, index) => {
      if (value === "") return 0;
      return getContextualMapping(index, value);
    });
    
    const validScores = scores.filter(score => score > 0);
    if (validScores.length === 0) return 0;
    
    const average = validScores.reduce((sum, score) => sum + score, 0) / validScores.length;
    return (average * 20); // Convert to percentage
  };

  const averagePercentage = calculateContextualPerformance();

  useEffect(() => {
    setScore(averagePercentage);
  }, [averagePercentage, setScore]);

  const getResponseColor = (questionIndex, value) => {
    return getContextualColor(questionIndex, value);
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

  const getHrAreaColor = (area) => {
    const colors = {
      "talent_market": "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300",
      "engagement": "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
      "competency": "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300",
      "strategy": "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300",
      "retention": "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300",
      "communication": "bg-teal-100 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300"
    };
    return colors[area] || "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Industry Retention": "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300",
      "Employee Engagement": "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
      "Expertise Level": "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300",
      "HR Strategy": "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300",
      "Retention Success": "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300",
      "Internal Communication": "bg-teal-100 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300"
    };
    return colors[category] || "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
  };

  const getCategoryIconColor = (category) => {
    const colors = {
      "Industry Retention": "bg-red-100 dark:bg-red-900/20",
      "Employee Engagement": "bg-blue-100 dark:bg-blue-900/20",
      "Expertise Level": "bg-purple-100 dark:bg-purple-900/20",
      "HR Strategy": "bg-green-100 dark:bg-green-900/20",
      "Retention Success": "bg-orange-100 dark:bg-orange-900/20",
      "Internal Communication": "bg-teal-100 dark:bg-teal-900/20"
    };
    return colors[category] || "bg-gray-100 dark:bg-gray-700";
  };

  const getCategoryIconTextColor = (category) => {
    const colors = {
      "Industry Retention": "text-red-600 dark:text-red-400",
      "Employee Engagement": "text-blue-600 dark:text-blue-400",
      "Expertise Level": "text-purple-600 dark:text-purple-400",
      "HR Strategy": "text-green-600 dark:text-green-400",
      "Retention Success": "text-orange-600 dark:text-orange-400",
      "Internal Communication": "text-teal-600 dark:text-teal-400"
    };
    return colors[category] || "text-gray-600 dark:text-gray-400";
  };

  const getHrMaturityLevel = (score) => {
    if (score >= 90) return { level: "Excellence", color: "text-green-600 dark:text-green-400", icon: "🏆" };
    if (score >= 75) return { level: "Strong", color: "text-blue-600 dark:text-blue-400", icon: "⭐" };
    if (score >= 60) return { level: "Developing", color: "text-yellow-600 dark:text-yellow-400", icon: "📈" };
    if (score >= 40) return { level: "Basic", color: "text-orange-600 dark:text-orange-400", icon: "⚠️" };
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
  const maturityLevel = getHrMaturityLevel(averagePercentage);

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
                Staff Assessment
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Evaluate human resources capabilities and organizational talent
              </p>
            </div>
          </div>
          
          {/* Score Display */}
          <div className="text-right">
            <div className="text-sm text-gray-500 dark:text-gray-400">HR Excellence</div>
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
                  HR Factor
                </th>
                <th className="w-1/4 text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Assessment
                </th>
                <th className="w-1/3 text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Performance
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
                                <span className={`inline-flex px-2 py-1 text-xs rounded-full w-fit ${getHrAreaColor(question.hrArea)}`}>
                                  {question.hrArea === "talent_market" ? "Market Risk" :
                                   question.hrArea === "engagement" ? "Engagement" :
                                   question.hrArea === "competency" ? "Competency" :
                                   question.hrArea === "strategy" ? "Strategy" :
                                   question.hrArea === "retention" ? "Retention" :
                                   "Communication"}
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
                          <option value="">Select assessment</option>
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
                            getResponseColor(index, value) === "green" ? "bg-green-100 dark:bg-green-900/20" :
                            getResponseColor(index, value) === "yellow" ? "bg-yellow-100 dark:bg-yellow-900/20" :
                            getResponseColor(index, value) === "red" ? "bg-red-100 dark:bg-red-900/20" :
                            "bg-gray-100 dark:bg-gray-700"
                          }`}>
                            <ResponseIcon className={`w-4 h-4 ${
                              getResponseColor(index, value) === "green" ? "text-green-600 dark:text-green-400" :
                              getResponseColor(index, value) === "yellow" ? "text-yellow-600 dark:text-yellow-400" :
                              getResponseColor(index, value) === "red" ? "text-red-600 dark:text-red-400" :
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
                        <span className={`px-2 py-1 text-xs rounded-full ${getHrAreaColor(question.hrArea)}`}>
                          {question.hrArea === "talent_market" ? "Market Risk" :
                           question.hrArea === "engagement" ? "Engagement" :
                           question.hrArea === "competency" ? "Competency" :
                           question.hrArea === "strategy" ? "Strategy" :
                           question.hrArea === "retention" ? "Retention" :
                           "Communication"}
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
                      HR Assessment
                    </label>
                    <select
                      value={value}
                      onChange={(e) => handleDropdownChange(index, e)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select assessment</option>
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
                          getResponseColor(index, value) === "green" ? "bg-green-100 dark:bg-green-900/20" :
                          getResponseColor(index, value) === "yellow" ? "bg-yellow-100 dark:bg-yellow-900/20" :
                          getResponseColor(index, value) === "red" ? "bg-red-100 dark:bg-red-900/20" :
                          "bg-gray-100 dark:bg-gray-700"
                        }`}>
                          <ResponseIcon className={`${
                            getResponseColor(index, value) === "green" ? "text-green-600 dark:text-green-400" :
                            getResponseColor(index, value) === "yellow" ? "text-yellow-600 dark:text-yellow-400" :
                            getResponseColor(index, value) === "red" ? "text-red-600 dark:text-red-400" :
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

export default Staff;