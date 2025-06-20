// import React, { useState, useEffect } from "react";
// import axiosInstance from "../../../service/axiosInstance";

// // Individual sections
// import Industry from "./Industry";
// import BusinessPerformance from "./BusinessPerformance";
// import BusinessGrowth from "./BusinessGrowth";
// import BusinessRisk from "./BusinessRisk";
// import Competition from "./Competition";
// import MIS from "./MIS";
// import Owners from "./Owners";
// import CustomersMarketDemand from "./CustomersMarketDemand";
// import Staff from "./Staff";
// import SuccessionEstatePlanning from "./SuccessionEstatePlanning";

// // Metrics and Chart
// import KeyPerformanceMetrics from "./KeyPerformanceMetrics";
// import PerformanceBarChart from "./PerformanceBarChart";

// // Import the new modal component
// import ScoreDetailModal from "./ScoreDetailModal";

// const RaciBusiness = () => {
//   const [previousScores, setPreviousScores] = useState([]);
//   const [selectedScore, setSelectedScore] = useState(null);

//   // Scores from each section
//   const [industryScore, setIndustryScore] = useState(0);
//   const [businessPerformanceScore, setBusinessPerformanceScore] = useState(0);
//   const [businessGrowthScore, setBusinessGrowthScore] = useState(0);
//   const [businessRiskScore, setBusinessRiskScore] = useState(0);
//   const [competitionScore, setCompetitionScore] = useState(0);
//   const [misScore, setMisScore] = useState(0);
//   const [ownersScore, setOwnersScore] = useState(0);
//   const [customersScore, setCustomersScore] = useState(0);
//   const [staffScore, setStaffScore] = useState(0);
//   const [successionScore, setSuccessionScore] = useState(0);

//   // Combine into performanceData for charts/metrics
//   const performanceData = [
//     { category: "INDUSTRY", percentage: industryScore },
//     { category: "BUSINESS PERFORMANCE", percentage: businessPerformanceScore },
//     { category: "BUSINESS GROWTH", percentage: businessGrowthScore },
//     { category: "BUSINESS RISK", percentage: businessRiskScore },
//     { category: "COMPETITION", percentage: competitionScore },
//     { category: "MANAGEMENT INFORMATION SYSTEMS", percentage: misScore },
//     { category: "OWNERS", percentage: ownersScore },
//     { category: "CUSTOMERS AND MARKET DEMAND", percentage: customersScore },
//     { category: "STAFF", percentage: staffScore },
//     {
//       category: "SUCCESSION AND ESTATE PLANNING",
//       percentage: successionScore,
//     },
//   ];

//   // Calculate overall performance
//   const calculateOverallPerformance = (data) => {
//     if (!data.length) return 0;
//     const totalScore = data.reduce((sum, entry) => sum + entry.percentage, 0);
//     return (totalScore / data.length).toFixed(2);
//   };

//   // Save current scores
//   const saveScores = async () => {
//     try {
//       const employee_Id = localStorage.getItem("employeeId");
//       if (!employee_Id) {
//         alert("Employee ID is missing in localStorage.");
//         return;
//       }
//       const payload = {
//         employee_Id,
//         metrics: performanceData,
//         keySuccessFactors: {
//           industryScore,
//           businessPerformanceScore,
//           businessGrowthScore,
//           businessRiskScore,
//           competitionScore,
//           misScore,
//           ownersScore,
//           customersScore,
//           staffScore,
//           successionScore,
//         },
//         overallScore: calculateOverallPerformance(performanceData),
//         date: new Date().toISOString(),
//       };

//       const response = await axiosInstance.post("/raci/business/saveScores", payload);
//       if (response.data?.success) {
//         alert("Scores saved successfully!");
//         fetchPreviousScores(); // Refresh
//       } else {
//         alert("Failed to save scores.");
//       }
//     } catch (error) {
//       console.error("Error saving scores:", error);
//       alert("An error occurred while saving scores.");
//     }
//   };

//   // Fetch previous scores
//   const fetchPreviousScores = async () => {
//     try {
//       const employee_Id = localStorage.getItem("employeeId");
//       if (!employee_Id) {
//         console.error("Employee ID is missing.");
//         return;
//       }

//       const response = await axiosInstance.post("/raci/business/getScores", {
//         employee_Id,
//       });

//       if (response.data?.success) {
//         setPreviousScores(response.data.data);
//       } else {
//         alert("Failed to fetch previous scores.");
//       }
//     } catch (error) {
//       console.error("Error fetching previous scores:", error);
//     }
//   };

//   useEffect(() => {
//     fetchPreviousScores();
//   }, []);

//   return (
//     <div>
//       <div className=" bg-gray-100 dark:bg-gray-900 dark:text-white">
//         <div className="p-4 max-w-7xl mx-auto">
//           <h1 className="text-2xl font-bold mb-6">
//             Key Performance Metrics RaciBusiness
//           </h1>

//           {/* Main Content Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//             {/* Left side - 2/3 width */}
//             <div className="col-span-2">
//               <Industry setScore={setIndustryScore} />
//               <BusinessPerformance setScore={setBusinessPerformanceScore} />
//               <BusinessGrowth setScore={setBusinessGrowthScore} />
//               <BusinessRisk setScore={setBusinessRiskScore} />
//               <Competition setScore={setCompetitionScore} />
//               <MIS setScore={setMisScore} />
//               <Owners setScore={setOwnersScore} />
//               <CustomersMarketDemand setScore={setCustomersScore} />
//               <Staff setScore={setStaffScore} />
//               <SuccessionEstatePlanning setScore={setSuccessionScore} />
//             </div>

//             {/* Right side - 1/3 width */}
//             <div className="space-y-4">
//               <div className="sticky top-4">
//                 <KeyPerformanceMetrics performanceData={performanceData} />
//               </div>
//             </div>
//           </div>

//           {/* Performance Bar Chart (Current Data) */}
//           <PerformanceBarChart performanceData={performanceData} />

//           {/* Save Scores Button */}
//           <div className="my-4">
//             <button
//               onClick={saveScores}
//               className="px-4 py-2 bg-green-500 text-white rounded"
//             >
//               Save Scores
//             </button>
//           </div>

//           {/* Previous Scores Table */}
//           <div className="my-4 p-4 border rounded shadow dark:bg-gray-800 dark:border-gray-700">
//             <h3 className="text-lg font-bold mb-2">Previous Scores</h3>
//             <table className="w-full border-collapse text-left">
//               <thead className="border-b">
//                 <tr>
//                   <th className="p-2">Date</th>
//                   <th className="p-2">Overall Score</th>
//                   <th className="p-2">Details</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {previousScores.length > 0 ? (
//                   previousScores.map((score, index) => (
//                     <tr key={index} className="border-b last:border-none">
//                       <td className="p-2">
//                         {new Date(score.date).toLocaleDateString()}
//                       </td>
//                       <td className="p-2">{(+score.overallScore).toFixed(2)}%</td>
//                       <td className="p-2">
//                         <button
//                           onClick={() => setSelectedScore(score)}
//                           className="px-3 py-1 bg-blue-500 text-white rounded"
//                         >
//                           View Details
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="3" className="p-2 text-center">
//                       No previous scores found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Use the separate ScoreDetailModal component */}
//           <ScoreDetailModal
//             selectedScore={selectedScore}
//             onClose={() => setSelectedScore(null)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RaciBusiness;




import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSave,
  FaChartLine,
  FaHistory,
  FaEye,
  FaSearch,
  FaFilter,
  FaDownload,
  FaCalendarAlt,
  FaTrophy,
  FaBusinessTime,
 
  FaPercentage,
  FaFileExport,
  
} from "react-icons/fa";
import { FaSync } from 'react-icons/fa';

import {
  HiChartBar,
  HiTrendingUp,
  HiClock,
  HiEye,
  HiDownload,
  HiSave
} from "react-icons/hi";
import axiosInstance from "../../../service/axiosInstance";

// Individual sections
import Industry from "./Industry";
import BusinessPerformance from "./BusinessPerformance";
import BusinessGrowth from "./BusinessGrowth";
import BusinessRisk from "./BusinessRisk";
import Competition from "./Competition";
import MIS from "./MIS";
import Owners from "./Owners";
import CustomersMarketDemand from "./CustomersMarketDemand";
import Staff from "./Staff";
import SuccessionEstatePlanning from "./SuccessionEstatePlanning";

// Metrics and Chart
import KeyPerformanceMetrics from "./KeyPerformanceMetrics";
import PerformanceBarChart from "./PerformanceBarChart";

// Import the new modal component
import ScoreDetailModal from "./ScoreDetailModal";

const RaciBusiness = () => {
  const [previousScores, setPreviousScores] = useState([]);
  const [selectedScore, setSelectedScore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPeriod, setFilterPeriod] = useState("all");

  // Scores from each section
  const [industryScore, setIndustryScore] = useState(0);
  const [businessPerformanceScore, setBusinessPerformanceScore] = useState(0);
  const [businessGrowthScore, setBusinessGrowthScore] = useState(0);
  const [businessRiskScore, setBusinessRiskScore] = useState(0);
  const [competitionScore, setCompetitionScore] = useState(0);
  const [misScore, setMisScore] = useState(0);
  const [ownersScore, setOwnersScore] = useState(0);
  const [customersScore, setCustomersScore] = useState(0);
  const [staffScore, setStaffScore] = useState(0);
  const [successionScore, setSuccessionScore] = useState(0);

  // Combine into performanceData for charts/metrics
  const performanceData = [
    { category: "INDUSTRY", percentage: industryScore },
    { category: "BUSINESS PERFORMANCE", percentage: businessPerformanceScore },
    { category: "BUSINESS GROWTH", percentage: businessGrowthScore },
    { category: "BUSINESS RISK", percentage: businessRiskScore },
    { category: "COMPETITION", percentage: competitionScore },
    { category: "MANAGEMENT INFORMATION SYSTEMS", percentage: misScore },
    { category: "OWNERS", percentage: ownersScore },
    { category: "CUSTOMERS AND MARKET DEMAND", percentage: customersScore },
    { category: "STAFF", percentage: staffScore },
    {
      category: "SUCCESSION AND ESTATE PLANNING",
      percentage: successionScore,
    },
  ];

  // Calculate overall performance
  const calculateOverallPerformance = (data) => {
    if (!data.length) return 0;
    const totalScore = data.reduce((sum, entry) => sum + entry.percentage, 0);
    return (totalScore / data.length).toFixed(2);
  };

  // Save current scores
  const saveScores = async () => {
    setIsLoading(true);
    try {
      const employee_Id = localStorage.getItem("employeeId");
      if (!employee_Id) {
        alert("Employee ID is missing in localStorage.");
        return;
      }
      const payload = {
        employee_Id,
        metrics: performanceData,
        keySuccessFactors: {
          industryScore,
          businessPerformanceScore,
          businessGrowthScore,
          businessRiskScore,
          competitionScore,
          misScore,
          ownersScore,
          customersScore,
          staffScore,
          successionScore,
        },
        overallScore: calculateOverallPerformance(performanceData),
        date: new Date().toISOString(),
      };

      const response = await axiosInstance.post("/raci/business/saveScores", payload);
      if (response.data?.success) {
        alert("Scores saved successfully!");
        fetchPreviousScores(); // Refresh
      } else {
        alert("Failed to save scores.");
      }
    } catch (error) {
      console.error("Error saving scores:", error);
      alert("An error occurred while saving scores.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch previous scores
  const fetchPreviousScores = async () => {
    try {
      const employee_Id = localStorage.getItem("employeeId");
      if (!employee_Id) {
        console.error("Employee ID is missing.");
        return;
      }

      const response = await axiosInstance.post("/raci/business/getScores", {
        employee_Id,
      });

      if (response.data?.success) {
        setPreviousScores(response.data.data);
      } else {
        alert("Failed to fetch previous scores.");
      }
    } catch (error) {
      console.error("Error fetching previous scores:", error);
    }
  };

  useEffect(() => {
    fetchPreviousScores();
  }, []);

  // Filter and search logic
  const filteredScores = previousScores.filter(score => {
    const scoreDate = new Date(score.date);
    const now = new Date();
    
    let dateMatch = true;
    if (filterPeriod === "week") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      dateMatch = scoreDate >= weekAgo;
    } else if (filterPeriod === "month") {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      dateMatch = scoreDate >= monthAgo;
    } else if (filterPeriod === "quarter") {
      const quarterAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      dateMatch = scoreDate >= quarterAgo;
    }

    const searchMatch = searchTerm === "" || 
      scoreDate.toLocaleDateString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      score.overallScore.toString().includes(searchTerm);

    return dateMatch && searchMatch;
  });

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBadge = (score) => {
    if (score >= 80) return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200";
    if (score >= 60) return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200";
    return "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200";
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.02,
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 }
    }
  };

  const currentOverallScore = calculateOverallPerformance(performanceData);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
              <FaBusinessTime className="text-blue-600 dark:text-blue-400 text-2xl" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              RaciBusiness Analytics
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
            Comprehensive business performance metrics and key success factor analysis
          </p>
          
          {/* Current Score Display */}
          <div className="flex items-center justify-center space-x-6 mt-6">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Current Overall Score</p>
              <div className={`text-3xl font-bold ${getScoreColor(currentOverallScore)}`}>
                {currentOverallScore}%
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Assessments</p>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {previousScores.length}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left side - Assessment Forms */}
          <motion.div
            variants={itemVariants}
            className="xl:col-span-2 space-y-6"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <HiChartBar className="text-blue-600 dark:text-blue-400 text-2xl" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Business Assessment
                </h2>
              </div>
              
              <div className="space-y-6">
                <Industry setScore={setIndustryScore} />
                <BusinessPerformance setScore={setBusinessPerformanceScore} />
                <BusinessGrowth setScore={setBusinessGrowthScore} />
                <BusinessRisk setScore={setBusinessRiskScore} />
                <Competition setScore={setCompetitionScore} />
                <MIS setScore={setMisScore} />
                <Owners setScore={setOwnersScore} />
                <CustomersMarketDemand setScore={setCustomersScore} />
                <Staff setScore={setStaffScore} />
                <SuccessionEstatePlanning setScore={setSuccessionScore} />
              </div>
            </div>
          </motion.div>

          {/* Right side - Metrics and Actions */}
          <motion.div
            variants={itemVariants}
            className="space-y-6"
          >
            <div className="sticky top-4 space-y-6">
              {/* Key Performance Metrics */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="bg-blue-50 dark:bg-blue-900/10 p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <FaTrophy className="text-blue-600 dark:text-blue-400" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">Live Metrics</h3>
                  </div>
                </div>
                <div className="p-4">
                  <KeyPerformanceMetrics performanceData={performanceData} />
                </div>
              </div>

              {/* Save Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={saveScores}
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <HiSave className="text-lg" />
                    <span>Save Assessment</span>
                  </>
                )}
              </motion.button>

              {/* Quick Stats */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <HiTrendingUp className="text-green-600 dark:text-green-400" />
                  <span>Assessment Stats</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Assessments</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{previousScores.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Best Score</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      {previousScores.length > 0 ? Math.max(...previousScores.map(s => Number(s.overallScore))).toFixed(2) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Latest Score</span>
                    <span className={`font-semibold ${previousScores.length > 0 ? getScoreColor(previousScores[0]?.overallScore) : 'text-gray-500'}`}>
                      {previousScores.length > 0 ? Number(previousScores[0].overallScore).toFixed(2) : 0}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Performance Chart */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="bg-green-50 dark:bg-green-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <HiTrendingUp className="text-green-600 dark:text-green-400 text-2xl" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Performance Overview
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Current assessment breakdown by category
            </p>
          </div>
          <div className="p-6">
            <PerformanceBarChart performanceData={performanceData} />
          </div>
        </motion.div>

        {/* Previous Scores Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="bg-purple-50 dark:bg-purple-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-3">
                <HiClock className="text-purple-600 dark:text-purple-400 text-2xl" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Assessment History
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Track your business performance over time
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                {/* Search */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Filter */}
                <select
                  value={filterPeriod}
                  onChange={(e) => setFilterPeriod(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="all">All Time</option>
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="quarter">Last Quarter</option>
                </select>

                {/* Refresh Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={fetchPreviousScores}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-200 flex items-center space-x-2"
                >
                  <FaSync className="text-sm" />
                  <span className="hidden sm:inline">Refresh</span>
                </motion.button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {filteredScores.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <FaHistory className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  No Assessments Found
                </h3>
                <p className="text-gray-500 dark:text-gray-500">
                  {searchTerm || filterPeriod !== "all" ? "Try adjusting your search or filter" : "Complete your first assessment to see results here"}
                </p>
              </motion.div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Overall Score
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Performance
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      <AnimatePresence>
                        {filteredScores.map((score, index) => (
                          <motion.tr
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                              <div className="flex items-center space-x-2">
                                <FaCalendarAlt className="text-gray-400" />
                                <span>{new Date(score.date).toLocaleDateString()}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className={`text-lg font-bold ${getScoreColor(score.overallScore)}`}>
                                {(+score.overallScore).toFixed(2)}%
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getScoreBadge(score.overallScore)}`}>
                                {score.overallScore >= 80 ? "Excellent" : score.overallScore >= 60 ? "Good" : "Needs Improvement"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedScore(score)}
                                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200"
                              >
                                <HiEye className="text-sm" />
                                <span>Details</span>
                              </motion.button>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                  <AnimatePresence>
                    {filteredScores.map((score, index) => (
                      <motion.div
                        key={index}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        whileHover="hover"
                        className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <FaCalendarAlt className="text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {new Date(score.date).toLocaleDateString()}
                            </span>
                          </div>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getScoreBadge(score.overallScore)}`}>
                            {score.overallScore >= 80 ? "Excellent" : score.overallScore >= 60 ? "Good" : "Needs Improvement"}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Overall Score</p>
                            <p className={`text-2xl font-bold ${getScoreColor(score.overallScore)}`}>
                              {(+score.overallScore).toFixed(2)}%
                            </p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedScore(score)}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200"
                          >
                            <HiEye className="text-sm" />
                            <span>Details</span>
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Score Detail Modal */}
        <ScoreDetailModal
          selectedScore={selectedScore}
          onClose={() => setSelectedScore(null)}
        />
      </div>
    </motion.div>
  );
};

export default RaciBusiness;