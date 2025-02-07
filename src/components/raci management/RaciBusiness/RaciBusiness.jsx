// import React from "react";
// import { motion } from "framer-motion";
// import IndustryPerformanceTable from "./IndustryPerformanceTable";
// import BusinessPerformanceTable from "./BusinessPerformanceTable";
// import KeyPerformanceMetrics from "./KeyPerformanceMetrics";
// import RaciBusinessChart from "./RACIChart";
// import PreviousScores from "./PreviousScores";

// const RaciBusiness = () => {
//   return (
//     <div className="bg-gray-100 dark:bg-gray-900 p-4">
//       <h1 className="font-black text-3xl py-2">
//       Key Performance Metrics
//       </h1>

//       {/* Animate page fade-in using Framer Motion */}
//       <motion.div
//         className="container mx-auto 
//                    grid grid-cols-1 gap-4 
//                    sm:grid-cols-2 
//                    lg:grid-cols-3"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         <div className="col-span-1 sm:col-span-2 lg:col-span-2 space-y-4">
//           <div className="overflow-x-auto">
//             <IndustryPerformanceTable />
//           </div>

//           <div className="overflow-x-auto">
//             <BusinessPerformanceTable />
//           </div>

//           <div className="overflow-x-auto">
//             <RaciBusinessChart />
//           </div>
//         </div>

//         <div className="sm:col-span-2 lg:col-span-1 space-y-4">
//           <div className="overflow-x-auto">
//             <KeyPerformanceMetrics />
//           </div>

//           <div className="overflow-x-auto">
//             <PreviousScores />
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default RaciBusiness;


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

// import KeyPerformanceMetrics from "./KeyPerformanceMetrics";
// import PerformanceBarChart from "./PerformanceBarChart";

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

//   // Optional dark mode toggle
//   const [isDarkMode, setIsDarkMode] = useState(false);

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

//       const response = await axiosInstance.post("/raci2/saveScores", payload);
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

//       const response = await axiosInstance.post("/raci2/getScores", {
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
//     <div >
//       <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
     

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

//           {/* Performance Bar Chart */}
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

//           {/* Modal for displaying selected score details */}
//           {selectedScore && (
//             <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//               <div className="bg-white dark:bg-gray-800 p-4 rounded shadow max-w-xl w-full relative">
//                 <button
//                   className="absolute top-2 right-2 text-red-500"
//                   onClick={() => setSelectedScore(null)}
//                 >
//                   &times;
//                 </button>
//                 <h4 className="text-xl font-bold mb-2 text-black dark:text-white">
//                   Score Details
//                 </h4>
//                 <p className="dark:text-white">
//                   <strong>Date:</strong>{" "}
//                   {new Date(selectedScore.date).toLocaleDateString()}
//                 </p>
//                 <p className="dark:text-white">
//                   <strong>Overall Score:</strong>{" "}
//                   {(+selectedScore.overallScore).toFixed(2)}%
//                 </p>

//                 <h5 className="text-lg mt-3 mb-2 font-semibold dark:text-white">
//                   Metrics
//                 </h5>
//                 <table className="w-full border-collapse text-left mb-4">
//                   <thead className="border-b">
//                     <tr>
//                       <th className="p-2">Metric</th>
//                       <th className="p-2">Score (%)</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {selectedScore.metrics.map((metric, idx) => (
//                       <tr key={idx} className="border-b last:border-none">
//                         <td className="p-2">{metric.category}</td>
//                         <td className="p-2">{metric.percentage}%</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 {/* Optionally reuse PerformanceBarChart here for selectedScore.metrics */}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RaciBusiness;

import React, { useState, useEffect } from "react";
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

      const response = await axiosInstance.post("/raci2/saveScores", payload);
      if (response.data?.success) {
        alert("Scores saved successfully!");
        fetchPreviousScores(); // Refresh
      } else {
        alert("Failed to save scores.");
      }
    } catch (error) {
      console.error("Error saving scores:", error);
      alert("An error occurred while saving scores.");
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

      const response = await axiosInstance.post("/raci2/getScores", {
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

  return (
    <div>
      <div className=" bg-gray-100 dark:bg-gray-900 dark:text-white">
        <div className="p-4 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">
            Key Performance Metrics RaciBusiness
          </h1>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left side - 2/3 width */}
            <div className="col-span-2">
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

            {/* Right side - 1/3 width */}
            <div className="space-y-4">
              <div className="sticky top-4">
                <KeyPerformanceMetrics performanceData={performanceData} />
              </div>
            </div>
          </div>

          {/* Performance Bar Chart (Current Data) */}
          <PerformanceBarChart performanceData={performanceData} />

          {/* Save Scores Button */}
          <div className="my-4">
            <button
              onClick={saveScores}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Save Scores
            </button>
          </div>

          {/* Previous Scores Table */}
          <div className="my-4 p-4 border rounded shadow dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-2">Previous Scores</h3>
            <table className="w-full border-collapse text-left">
              <thead className="border-b">
                <tr>
                  <th className="p-2">Date</th>
                  <th className="p-2">Overall Score</th>
                  <th className="p-2">Details</th>
                </tr>
              </thead>
              <tbody>
                {previousScores.length > 0 ? (
                  previousScores.map((score, index) => (
                    <tr key={index} className="border-b last:border-none">
                      <td className="p-2">
                        {new Date(score.date).toLocaleDateString()}
                      </td>
                      <td className="p-2">{(+score.overallScore).toFixed(2)}%</td>
                      <td className="p-2">
                        <button
                          onClick={() => setSelectedScore(score)}
                          className="px-3 py-1 bg-blue-500 text-white rounded"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-2 text-center">
                      No previous scores found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Use the separate ScoreDetailModal component */}
          <ScoreDetailModal
            selectedScore={selectedScore}
            onClose={() => setSelectedScore(null)}
          />
        </div>
      </div>
    </div>
  );
};

export default RaciBusiness;

