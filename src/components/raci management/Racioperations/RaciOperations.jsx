


// import { useState, useEffect } from "react";
// import axiosInstance from "../../../service/axiosInstance";

// // CHART.JS and react-chartjs-2
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// // Sub-components
// import AssessmentForm from "./AssessmentForm";
// import KeySuccessFactorsTable from "./KeySuccessFactorsTable";
// import PreviousScoresTable from "./PreviousScoresTable";
// import ScoreDetailsModal from "./OperationsScoreDetailsModal";

// function RaciOperations() {
//   // Optional dark mode
//   const employeeIdFromRedux = localStorage.getItem("employeeId");

//   // Metrics & Key Success Factors
//   const initialMetrics = [
//     {
//       id: 1,
//       metric: "The level of satisfaction and loyalty of our Customers?",
//       score: 0,
//     },
//     {
//       id: 2,
//       metric: "Our knowledge of our costs, particularly our product costs?",
//       score: 0,
//     },
//     { id: 3, metric: "The reward system we use for our sales team?", score: 0 },
//     {
//       id: 4,
//       metric: "The contact program we have for Customers and Prospects?",
//       score: 0,
//     },
//     {
//       id: 5,
//       metric: "Our understanding of our cash at bank, debtors and creditors?",
//       score: 0,
//     },
//     { id: 6, metric: "The morale of our staff?", score: 0 },
//     {
//       id: 7,
//       metric:
//         "Our sales and marketing documentation (brochures, web sites)?",
//       score: 0,
//     },
//     {
//       id: 8,
//       metric:
//         "The quality and frequency of the feedback we provide our staff on their performance?",
//       score: 0,
//     },
//     {
//       id: 9,
//       metric: "The level of cooperation and trust between departments?",
//       score: 0,
//     },
//     {
//       id: 10,
//       metric: "The documentation and understanding of our sales process?",
//       score: 0,
//     },
//     {
//       id: 11,
//       metric:
//         "The quality of the documentation of our standard operating procedures?",
//       score: 0,
//     },
//     {
//       id: 12,
//       metric: "Our processes for setting and maintaining our prices?",
//       score: 0,
//     },
//     {
//       id: 13,
//       metric: "Our ability to grow the business through existing Customers?",
//       score: 0,
//     },
//     { id: 14, metric: "The control of business inefficiencies?", score: 0 },
//     {
//       id: 15,
//       metric:
//         "Our ability to check at any time profit, sales, expenses and cash flow?",
//       score: 0,
//     },
//     {
//       id: 16,
//       metric:
//         "Our understanding of the needs and perceptions of our Customers?",
//       score: 0,
//     },
//     { id: 17, metric: "Our database of customers and prospects?", score: 0 },
//     {
//       id: 18,
//       metric: "The amount and quality of training we provide for our staff?",
//       score: 0,
//     },
//     {
//       id: 19,
//       metric:
//         "Our ability to deliver on time, on budget and with specified quality?",
//       score: 0,
//     },
//     {
//       id: 20,
//       metric:
//         "Our documentation of a clear vision and competitive advantage for the business?",
//       score: 0,
//     },
//     {
//       id: 21,
//       metric:
//         "Our mechanism for benchmarking our systems against best practice?",
//       score: 0,
//     },
//     {
//       id: 22,
//       metric:
//         "Our ability to record our sales per product, per market segment?",
//       score: 0,
//     },
//     {
//       id: 23,
//       metric: "Our continuous improvement of our internal processes?",
//       score: 0,
//     },
//     {
//       id: 24,
//       metric: "Our ability to attract and retain high quality staff?",
//       score: 0,
//     },
//     {
//       id: 25,
//       metric: "The quality and capability of our sales force?",
//       score: 0,
//     },
//   ];

//   const [metrics, setMetrics] = useState(initialMetrics);

//   const [keySuccessFactors, setKeySuccessFactors] = useState({
//     businessPlanning: 0,
//     leadership: 0,
//     profitability: 0,
//     marketing: 0,
//     personalDevelopment: 0,
//     continuousImprovement: 0,
//     revenueSales: 0,
//     employeeEngagement: 0,
//     reductionInInefficiencies: 0,
//     customerService: 0,
//   });

//   const [overallScore, setOverallScore] = useState(0);

//   const [selectedFactor, setSelectedFactor] = useState("");
//   const [previousScores, setPreviousScores] = useState([]);
//   const [selectedScore, setSelectedScore] = useState(null);

//   // Score dropdown options
//   const scoreOptions = [
//     { label: "", value: "" },
//     { label: "No Opinion", value: 0 },
//     { label: "Extremely Low", value: 1 },
//     { label: "Very Low", value: 2 },
//     { label: "Low", value: 3 },
//     { label: "Below Average", value: 4 },
//     { label: "Average", value: 5 },
//     { label: "Above Average", value: 6 },
//     { label: "High", value: 7 },
//     { label: "Very High", value: 8 },
//     { label: "Exceptional", value: 9 },
//     { label: "Perfect", value: 10 },
//   ];

//   // Highlight certain rows if selectedFactor is chosen
//   const keySuccessFactorsMapping = {
//     businessPlanning: [10, 11, 15, 16, 19, 20],
//     leadership: [6, 8, 9, 16, 20, 21, 24],
//     profitability: [1, 2, 3, 5, 12, 14],
//     marketing: [1, 4, 7, 12, 16, 17, 22],
//     personalDevelopment: [6, 8, 18, 23, 24],
//     continuousImprovement: [9, 10, 11, 14, 19, 21, 23],
//     revenueSales: [1, 3, 4, 7, 10, 13, 17, 25],
//     employeeEngagement: [6, 8, 9, 18, 24],
//     reductionInInefficiencies: [2, 5, 11, 14, 21, 23],
//     customerService: [1, 4, 10, 16, 17, 19],
//   };

//   // Build chartData array
//   const chartData = Object.keys(keySuccessFactors).map((factor) => ({
//     name: factor,
//     score: keySuccessFactors[factor] * 10, // convert (0-10) to (0-100)
//   }));

//   // Construct Chart.js data and options
//   const chartJsData = {
//     labels: chartData.map((item) => item.name),
//     datasets: [
//       {
//         label: "Score",
//         data: chartData.map((item) => item.score),
//         backgroundColor: "#8cc01d",
//       },
//     ],
//   };

//   const chartJsOptions = {
//     responsive: true,
//     scales: {
//       y: {
//         min: 0,
//         max: 100,
//       },
//       x: {
//         ticks: {
//           maxRotation: 45,
//           minRotation: 45,
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: true,
//       },
//       title: {
//         display: false,
//       },
//     },
//   };

//   // Handle dropdown changes
//   const handleDropdownChange = (id, newScore) => {
//     setMetrics((prev) =>
//       prev.map((metric) =>
//         metric.id === id ? { ...metric, score: newScore } : metric
//       )
//     );
//   };

//   // Calculate Key Success Factors and overall score
//   const calculateKeySuccessFactors = () => {
//     const scoreById = {};
//     metrics.forEach((m) => {
//       scoreById[m.id] = m.score || 0;
//     });
//     const val = (id) => (scoreById[id] === undefined ? 0 : +scoreById[id]);

//     const calcFactor = (sum, totalWeight) =>
//       totalWeight === 0 ? 0 : sum / totalWeight;

//     // Business Planning
//     const businessPlanningSum =
//       val(10) + val(11) + val(15) + val(16) + val(19) + val(20) * 1.5;
//     const businessPlanningTotalWeight = 6.5;
//     const businessPlanning = calcFactor(
//       businessPlanningSum,
//       businessPlanningTotalWeight
//     );

//     // Leadership
//     const leadershipSum =
//       val(6) + val(8) + val(9) + val(16) + val(20) + val(21) + val(24);
//     const leadershipTotalWeight = 7;
//     const leadership = calcFactor(leadershipSum, leadershipTotalWeight);

//     // Profitability
//     const profitabilitySum =
//       val(1) + val(2) + val(3) + val(5) + val(12) + val(14);
//     const profitabilityTotalWeight = 6;
//     const profitability = calcFactor(
//       profitabilitySum,
//       profitabilityTotalWeight
//     );

//     // Marketing
//     const marketingSum =
//       val(1) + val(4) + val(7) + val(12) + val(16) + val(17) * 1.5 + val(22);
//     const marketingTotalWeight = 7.5;
//     const marketing = calcFactor(marketingSum, marketingTotalWeight);

//     // Personal Development
//     const personalDevelopmentSum =
//       val(6) + val(8) + val(18) * 1.5 + val(23) + val(24);
//     const personalDevelopmentTotalWeight = 5.5;
//     const personalDevelopment = calcFactor(
//       personalDevelopmentSum,
//       personalDevelopmentTotalWeight
//     );

//     // Continuous Improvement
//     const continuousImprovementSum =
//       val(9) + val(10) + val(11) + val(14) + val(19) + val(21) + val(23);
//     const continuousImprovementTotalWeight = 7;
//     const continuousImprovement = calcFactor(
//       continuousImprovementSum,
//       continuousImprovementTotalWeight
//     );

//     // Revenue Sales
//     const revenueSalesSum =
//       val(1) +
//       val(3) +
//       val(4) +
//       val(7) +
//       val(10) +
//       val(13) +
//       val(17) * 1.5 +
//       val(25) * 1.5;
//     const revenueSalesTotalWeight = 9;
//     const revenueSales = calcFactor(revenueSalesSum, revenueSalesTotalWeight);

//     // Employee Engagement
//     const employeeEngagementSum =
//       val(6) * 1.5 + val(8) + val(9) + val(18) + val(24);
//     const employeeEngagementTotalWeight = 5.5;
//     const employeeEngagement = calcFactor(
//       employeeEngagementSum,
//       employeeEngagementTotalWeight
//     );

//     // Reduction in Inefficiencies
//     const reductionInInefficienciesSum =
//       val(2) + val(5) + val(11) + val(14) * 1.5 + val(21) + val(23) * 1.5;
//     const reductionInInefficienciesTotalWeight = 7;
//     const reductionInInefficiencies = calcFactor(
//       reductionInInefficienciesSum,
//       reductionInInefficienciesTotalWeight
//     );

//     // Customer Service
//     const customerServiceSum =
//       val(1) + val(4) + val(10) + val(16) * 1.5 + val(17) + val(19) * 1.5;
//     const customerServiceTotalWeight = 7;
//     const customerService = calcFactor(
//       customerServiceSum,
//       customerServiceTotalWeight
//     );

//     // Update all factors
//     const newFactors = {
//       businessPlanning,
//       leadership,
//       profitability,
//       marketing,
//       personalDevelopment,
//       continuousImprovement,
//       revenueSales,
//       employeeEngagement,
//       reductionInInefficiencies,
//       customerService,
//     };
//     setKeySuccessFactors(newFactors);

//     // overall
//     const total =
//       (businessPlanning +
//         leadership +
//         profitability +
//         marketing +
//         personalDevelopment +
//         continuousImprovement +
//         revenueSales +
//         employeeEngagement +
//         reductionInInefficiencies +
//         customerService) /
//       10;
//     setOverallScore(total);
//   };

//   // Recalculate whenever metrics change
//   useEffect(() => {
//     calculateKeySuccessFactors();
//     // eslint-disable-next-line
//   }, [metrics]);

//   // Save current scores to backend
//   const saveScores = async () => {
//     try {
//       const employeeId = employeeIdFromRedux || localStorage.getItem("employeeId");
//       if (!employeeId) {
//         alert("Employee ID is missing.");
//         return;
//       }
//       const payload = {
//         employee_Id: employeeId,
//         metrics,
//         keySuccessFactors,
//         overallScore,
//         date: new Date().toISOString(),
//       };
//       const res = await axiosInstance.post("/raci/operations/saveScores", payload);

//       if (res.data?.success) {
//         alert("Scores saved successfully!");
//         fetchPreviousScores();
//       } else {
//         alert("Failed to save scores.");
//       }
//     } catch (error) {
//       console.error("Error saving scores:", error);
//       alert("An error occurred while saving scores.");
//     }
//   };

//   // Fetch previous scores from backend
//   const fetchPreviousScores = async () => {
//     try {
//       const employeeId = localStorage.getItem("employeeId") || employeeIdFromRedux;
//       if (!employeeId) {
//         console.error("Employee ID is missing.");
//         return;
//       }
//       const res = await axiosInstance.post("/raci/operations/getScores", {
//         employee_Id: employeeId,
//       });
//       if (res.data?.success) {
//         setPreviousScores(res.data.data);
//       } else {
//         alert("Failed to fetch previous scores.");
//       }
//     } catch (error) {
//       console.error("Error fetching previous scores:", error);
//     }
//   };

//   useEffect(() => {
//     fetchPreviousScores();
//     // eslint-disable-next-line
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white p-4">
//       <h1 className="text-2xl font-bold mb-6">
//         RACI Operational KPI Assessment
//       </h1>

//       {/* Main 3-column layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//         {/* Left/Center: Assessment Form (col-span-2) */}
//         <div className="col-span-2">
//           <AssessmentForm
//             metrics={metrics}
//             scoreOptions={scoreOptions}
//             handleDropdownChange={handleDropdownChange}
//             selectedFactor={selectedFactor}
//             keySuccessFactorsMapping={keySuccessFactorsMapping}
//           />
//         </div>

//         {/* Right: Sticky Key Success Factors */}
//         <div className="space-y-4">
//           <div className="sticky top-4">
//             <KeySuccessFactorsTable keySuccessFactors={keySuccessFactors} />
//           </div>
//         </div>
//       </div>

//       {/* Chart + Factor Selection */}
//       <div className="mt-8 p-4 border rounded dark:border-gray-700 dark:bg-gray-800">
//         <h2 className="text-xl font-semibold mb-4">
//           Key Success Factors Graph
//         </h2>
//         <div className="mb-4">
//           <select
//             className="border px-2 py-1 rounded dark:bg-gray-700"
//             value={selectedFactor}
//             onChange={(e) => setSelectedFactor(e.target.value)}
//           >
//             <option value="">--Select a Key Success Factor--</option>
//             {Object.keys(keySuccessFactors).map((factor) => (
//               <option key={factor} value={factor}>
//                 {factor}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* CHART.JS Bar Chart */}
//         <div style={{ width: "100%", height: 400 }}>
//           <Bar data={chartJsData} options={chartJsOptions} />
//         </div>
//       </div>

//       {/* Overall Score */}
//       <h2 className="mt-6 text-lg font-medium">
//         Overall Score: {(overallScore * 10).toFixed(2)}%
//       </h2>

//       {/* Save Scores Button */}
//       <div className="my-6">
//         <button
//           onClick={saveScores}
//           className="px-4 py-2 bg-green-500 text-white rounded mr-4"
//         >
//           Save Scores
//         </button>
//       </div>

//       {/* Previous Scores Table */}
//       <PreviousScoresTable
//         previousScores={previousScores}
//         setSelectedScore={setSelectedScore}
//       />

//       {/* Modal for Score Details */}
//       {selectedScore && (
//         <ScoreDetailsModal
//           selectedScore={selectedScore}
//           onClose={() => setSelectedScore(null)}
//         />
//       )}
//     </div>
//   );
// }

// export default RaciOperations;




import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../../../service/axiosInstance";
import {
  FaChartBar,
  FaSave,
  FaHistory,
  FaEye,
  FaClipboardList,
  FaTrophy,
  FaUsers,
  FaRocket,
  FaChartLine,
  FaBullseye,
  FaCog,
  FaHandshake,
  FaDollarSign,
  FaGraduationCap,
  FaFilter,
  FaDownload,
  FaCalendarAlt,
  FaPercentage,
  FaArrowUp,
  FaArrowDown,
  FaEquals
} from "react-icons/fa";
import {
  HiChartBar,
  HiSave,
  HiEye,
  HiClipboard,
  HiTrendingUp,
  HiUsers,
  HiLightBulb,
  HiCash,
  HiAcademicCap,
  HiX,
  HiCheck
} from "react-icons/hi";

// CHART.JS and react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Sub-components
import AssessmentForm from "./AssessmentForm";
import KeySuccessFactorsTable from "./KeySuccessFactorsTable";
import PreviousScoresTable from "./PreviousScoresTable";
import ScoreDetailsModal from "./OperationsScoreDetailsModal";

function RaciOperations() {
  const employeeIdFromRedux = localStorage.getItem("employeeId");

  // Metrics & Key Success Factors
  const initialMetrics = [
    {
      id: 1,
      metric: "The level of satisfaction and loyalty of our Customers?",
      score: 0,
    },
    {
      id: 2,
      metric: "Our knowledge of our costs, particularly our product costs?",
      score: 0,
    },
    { id: 3, metric: "The reward system we use for our sales team?", score: 0 },
    {
      id: 4,
      metric: "The contact program we have for Customers and Prospects?",
      score: 0,
    },
    {
      id: 5,
      metric: "Our understanding of our cash at bank, debtors and creditors?",
      score: 0,
    },
    { id: 6, metric: "The morale of our staff?", score: 0 },
    {
      id: 7,
      metric:
        "Our sales and marketing documentation (brochures, web sites)?",
      score: 0,
    },
    {
      id: 8,
      metric:
        "The quality and frequency of the feedback we provide our staff on their performance?",
      score: 0,
    },
    {
      id: 9,
      metric: "The level of cooperation and trust between departments?",
      score: 0,
    },
    {
      id: 10,
      metric: "The documentation and understanding of our sales process?",
      score: 0,
    },
    {
      id: 11,
      metric:
        "The quality of the documentation of our standard operating procedures?",
      score: 0,
    },
    {
      id: 12,
      metric: "Our processes for setting and maintaining our prices?",
      score: 0,
    },
    {
      id: 13,
      metric: "Our ability to grow the business through existing Customers?",
      score: 0,
    },
    { id: 14, metric: "The control of business inefficiencies?", score: 0 },
    {
      id: 15,
      metric:
        "Our ability to check at any time profit, sales, expenses and cash flow?",
      score: 0,
    },
    {
      id: 16,
      metric:
        "Our understanding of the needs and perceptions of our Customers?",
      score: 0,
    },
    { id: 17, metric: "Our database of customers and prospects?", score: 0 },
    {
      id: 18,
      metric: "The amount and quality of training we provide for our staff?",
      score: 0,
    },
    {
      id: 19,
      metric:
        "Our ability to deliver on time, on budget and with specified quality?",
      score: 0,
    },
    {
      id: 20,
      metric:
        "Our documentation of a clear vision and competitive advantage for the business?",
      score: 0,
    },
    {
      id: 21,
      metric:
        "Our mechanism for benchmarking our systems against best practice?",
      score: 0,
    },
    {
      id: 22,
      metric:
        "Our ability to record our sales per product, per market segment?",
      score: 0,
    },
    {
      id: 23,
      metric: "Our continuous improvement of our internal processes?",
      score: 0,
    },
    {
      id: 24,
      metric: "Our ability to attract and retain high quality staff?",
      score: 0,
    },
    {
      id: 25,
      metric: "The quality and capability of our sales force?",
      score: 0,
    },
  ];

  const [metrics, setMetrics] = useState(initialMetrics);
  const [keySuccessFactors, setKeySuccessFactors] = useState({
    businessPlanning: 0,
    leadership: 0,
    profitability: 0,
    marketing: 0,
    personalDevelopment: 0,
    continuousImprovement: 0,
    revenueSales: 0,
    employeeEngagement: 0,
    reductionInInefficiencies: 0,
    customerService: 0,
  });

  const [overallScore, setOverallScore] = useState(0);
  const [selectedFactor, setSelectedFactor] = useState("");
  const [previousScores, setPreviousScores] = useState([]);
  const [selectedScore, setSelectedScore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Score dropdown options
  const scoreOptions = [
    { label: "", value: "" },
    { label: "No Opinion", value: 0 },
    { label: "Extremely Low", value: 1 },
    { label: "Very Low", value: 2 },
    { label: "Low", value: 3 },
    { label: "Below Average", value: 4 },
    { label: "Average", value: 5 },
    { label: "Above Average", value: 6 },
    { label: "High", value: 7 },
    { label: "Very High", value: 8 },
    { label: "Exceptional", value: 9 },
    { label: "Perfect", value: 10 },
  ];

  // Highlight certain rows if selectedFactor is chosen
  const keySuccessFactorsMapping = {
    businessPlanning: [10, 11, 15, 16, 19, 20],
    leadership: [6, 8, 9, 16, 20, 21, 24],
    profitability: [1, 2, 3, 5, 12, 14],
    marketing: [1, 4, 7, 12, 16, 17, 22],
    personalDevelopment: [6, 8, 18, 23, 24],
    continuousImprovement: [9, 10, 11, 14, 19, 21, 23],
    revenueSales: [1, 3, 4, 7, 10, 13, 17, 25],
    employeeEngagement: [6, 8, 9, 18, 24],
    reductionInInefficiencies: [2, 5, 11, 14, 21, 23],
    customerService: [1, 4, 10, 16, 17, 19],
  };

  // Get icon and color for each factor
  const getFactorConfig = (factor) => {
    const configs = {
      businessPlanning: { icon: FaClipboardList, color: "blue", name: "Business Planning" },
      leadership: { icon: FaUsers, color: "purple", name: "Leadership" },
      profitability: { icon: FaDollarSign, color: "green", name: "Profitability" },
      marketing: { icon: FaBullseye, color: "red", name: "Marketing" },
      personalDevelopment: { icon: FaGraduationCap, color: "indigo", name: "Personal Development" },
      continuousImprovement: { icon: FaRocket, color: "orange", name: "Continuous Improvement" },
      revenueSales: { icon: FaChartLine, color: "teal", name: "Revenue & Sales" },
      employeeEngagement: { icon: FaHandshake, color: "pink", name: "Employee Engagement" },
      reductionInInefficiencies: { icon: FaCog, color: "yellow", name: "Efficiency Improvement" },
      customerService: { icon: FaTrophy, color: "cyan", name: "Customer Service" }
    };
    return configs[factor] || { icon: FaChartBar, color: "gray", name: factor };
  };

  // Get score status
  const getScoreStatus = (score) => {
    if (score >= 8) return { icon: FaArrowUp, color: "text-green-600 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/20" };
    if (score >= 5) return { icon: FaEquals, color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-100 dark:bg-yellow-900/20" };
    return { icon: FaArrowDown, color: "text-red-600 dark:text-red-400", bg: "bg-red-100 dark:bg-red-900/20" };
  };

  // Build chartData array
  const chartData = Object.keys(keySuccessFactors).map((factor) => {
    const config = getFactorConfig(factor);
    return {
      name: config.name,
      score: keySuccessFactors[factor] * 10,
      color: config.color
    };
  });

  // Construct Chart.js data and options
  const chartJsData = {
    labels: chartData.map((item) => item.name),
    datasets: [
      {
        label: "Score (%)",
        data: chartData.map((item) => item.score),
        backgroundColor: [
          "#3B82F6", "#8B5CF6", "#10B981", "#EF4444", "#6366F1", 
          "#F59E0B", "#14B8A6", "#EC4899", "#EAB308", "#06B6D4"
        ],
        borderColor: [
          "#2563EB", "#7C3AED", "#059669", "#DC2626", "#4F46E5",
          "#D97706", "#0D9488", "#DB2777", "#CA8A04", "#0891B2"
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const chartJsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 100,
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
          },
          callback: function(value) {
            return value + '%';
          }
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          maxRotation: 45,
          minRotation: 45,
          font: {
            size: 11,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        borderColor: '#374151',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: function(context) {
            return context[0].label;
          },
          label: function(context) {
            return `Score: ${context.parsed.y}%`;
          }
        }
      }
    },
  };

  // Handle dropdown changes
  const handleDropdownChange = (id, newScore) => {
    setMetrics((prev) =>
      prev.map((metric) =>
        metric.id === id ? { ...metric, score: newScore } : metric
      )
    );
  };

  // Calculate Key Success Factors and overall score
  const calculateKeySuccessFactors = () => {
    const scoreById = {};
    metrics.forEach((m) => {
      scoreById[m.id] = m.score || 0;
    });
    const val = (id) => (scoreById[id] === undefined ? 0 : +scoreById[id]);

    const calcFactor = (sum, totalWeight) =>
      totalWeight === 0 ? 0 : sum / totalWeight;

    // Business Planning
    const businessPlanningSum =
      val(10) + val(11) + val(15) + val(16) + val(19) + val(20) * 1.5;
    const businessPlanningTotalWeight = 6.5;
    const businessPlanning = calcFactor(
      businessPlanningSum,
      businessPlanningTotalWeight
    );

    // Leadership
    const leadershipSum =
      val(6) + val(8) + val(9) + val(16) + val(20) + val(21) + val(24);
    const leadershipTotalWeight = 7;
    const leadership = calcFactor(leadershipSum, leadershipTotalWeight);

    // Profitability
    const profitabilitySum =
      val(1) + val(2) + val(3) + val(5) + val(12) + val(14);
    const profitabilityTotalWeight = 6;
    const profitability = calcFactor(
      profitabilitySum,
      profitabilityTotalWeight
    );

    // Marketing
    const marketingSum =
      val(1) + val(4) + val(7) + val(12) + val(16) + val(17) * 1.5 + val(22);
    const marketingTotalWeight = 7.5;
    const marketing = calcFactor(marketingSum, marketingTotalWeight);

    // Personal Development
    const personalDevelopmentSum =
      val(6) + val(8) + val(18) * 1.5 + val(23) + val(24);
    const personalDevelopmentTotalWeight = 5.5;
    const personalDevelopment = calcFactor(
      personalDevelopmentSum,
      personalDevelopmentTotalWeight
    );

    // Continuous Improvement
    const continuousImprovementSum =
      val(9) + val(10) + val(11) + val(14) + val(19) + val(21) + val(23);
    const continuousImprovementTotalWeight = 7;
    const continuousImprovement = calcFactor(
      continuousImprovementSum,
      continuousImprovementTotalWeight
    );

    // Revenue Sales
    const revenueSalesSum =
      val(1) +
      val(3) +
      val(4) +
      val(7) +
      val(10) +
      val(13) +
      val(17) * 1.5 +
      val(25) * 1.5;
    const revenueSalesTotalWeight = 9;
    const revenueSales = calcFactor(revenueSalesSum, revenueSalesTotalWeight);

    // Employee Engagement
    const employeeEngagementSum =
      val(6) * 1.5 + val(8) + val(9) + val(18) + val(24);
    const employeeEngagementTotalWeight = 5.5;
    const employeeEngagement = calcFactor(
      employeeEngagementSum,
      employeeEngagementTotalWeight
    );

    // Reduction in Inefficiencies
    const reductionInInefficienciesSum =
      val(2) + val(5) + val(11) + val(14) * 1.5 + val(21) + val(23) * 1.5;
    const reductionInInefficienciesTotalWeight = 7;
    const reductionInInefficiencies = calcFactor(
      reductionInInefficienciesSum,
      reductionInInefficienciesTotalWeight
    );

    // Customer Service
    const customerServiceSum =
      val(1) + val(4) + val(10) + val(16) * 1.5 + val(17) + val(19) * 1.5;
    const customerServiceTotalWeight = 7;
    const customerService = calcFactor(
      customerServiceSum,
      customerServiceTotalWeight
    );

    // Update all factors
    const newFactors = {
      businessPlanning,
      leadership,
      profitability,
      marketing,
      personalDevelopment,
      continuousImprovement,
      revenueSales,
      employeeEngagement,
      reductionInInefficiencies,
      customerService,
    };
    setKeySuccessFactors(newFactors);

    // overall
    const total =
      (businessPlanning +
        leadership +
        profitability +
        marketing +
        personalDevelopment +
        continuousImprovement +
        revenueSales +
        employeeEngagement +
        reductionInInefficiencies +
        customerService) /
      10;
    setOverallScore(total);
  };

  // Recalculate whenever metrics change
  useEffect(() => {
    calculateKeySuccessFactors();
    // eslint-disable-next-line
  }, [metrics]);

  // Save current scores to backend
  const saveScores = async () => {
    setIsLoading(true);
    try {
      const employeeId = employeeIdFromRedux || localStorage.getItem("employeeId");
      if (!employeeId) {
        alert("Employee ID is missing.");
        return;
      }
      const payload = {
        employee_Id: employeeId,
        metrics,
        keySuccessFactors,
        overallScore,
        date: new Date().toISOString(),
      };
      const res = await axiosInstance.post("/raci/operations/saveScores", payload);

      if (res.data?.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        fetchPreviousScores();
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

  // Fetch previous scores from backend
  const fetchPreviousScores = async () => {
    try {
      const employeeId = localStorage.getItem("employeeId") || employeeIdFromRedux;
      if (!employeeId) {
        console.error("Employee ID is missing.");
        return;
      }
      const res = await axiosInstance.post("/raci/operations/getScores", {
        employee_Id: employeeId,
      });
      if (res.data?.success) {
        setPreviousScores(res.data.data);
      } else {
        alert("Failed to fetch previous scores.");
      }
    } catch (error) {
      console.error("Error fetching previous scores:", error);
    }
  };

  useEffect(() => {
    fetchPreviousScores();
    // eslint-disable-next-line
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
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
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 lg:p-8"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
              <HiChartBar className="text-blue-600 dark:text-blue-400 text-2xl" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              RACI Operational KPI Assessment
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
            Evaluate your organization's operational performance across key success factors and drive continuous improvement
          </p>
        </motion.div>

        {/* Overall Score Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-xl">
                <FaPercentage className="text-purple-600 dark:text-purple-400 text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Overall Assessment Score
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Current performance rating across all factors
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                {(overallScore * 10).toFixed(1)}%
              </div>
              <div className="flex items-center justify-center space-x-2 mt-2">
                {(() => {
                  const status = getScoreStatus(overallScore);
                  return (
                    <>
                      <div className={`p-1 rounded-full ${status.bg}`}>
                        <status.icon className={`${status.color} text-sm`} />
                      </div>
                      <span className={`text-sm font-medium ${status.color}`}>
                        {overallScore >= 8 ? "Excellent" : overallScore >= 5 ? "Good" : "Needs Improvement"}
                      </span>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Assessment Form - Takes 2 columns */}
          <motion.div
            variants={itemVariants}
            className="xl:col-span-2 space-y-6"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-blue-50 dark:bg-blue-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <HiClipboard className="text-blue-600 dark:text-blue-400 text-2xl" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Assessment Metrics
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Rate each operational aspect on a scale of 0-10
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <AssessmentForm
                  metrics={metrics}
                  scoreOptions={scoreOptions}
                  handleDropdownChange={handleDropdownChange}
                  selectedFactor={selectedFactor}
                  keySuccessFactorsMapping={keySuccessFactorsMapping}
                />
              </div>
            </div>
          </motion.div>

          {/* Key Success Factors - Sticky sidebar */}
          <motion.div
            variants={itemVariants}
            className="xl:col-span-1"
          >
            <div className="sticky top-6 space-y-6">
              {/* Key Success Factors Table */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="bg-green-50 dark:bg-green-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <HiTrendingUp className="text-green-600 dark:text-green-400 text-2xl" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Key Success Factors
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Calculated performance metrics
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <KeySuccessFactorsTable keySuccessFactors={keySuccessFactors} />
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

              {/* Success Message */}
              <AnimatePresence>
                {saveSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-center space-x-2 p-3 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                  >
                    <HiCheck className="text-green-600 dark:text-green-400" />
                    <span className="text-green-800 dark:text-green-300 text-sm font-medium">
                      Assessment saved successfully!
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Chart Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="bg-purple-50 dark:bg-purple-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-3">
                <HiChartBar className="text-purple-600 dark:text-purple-400 text-2xl" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Performance Analytics
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Visual representation of your key success factors
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <FaFilter className="text-gray-400" />
                  <select
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    value={selectedFactor}
                    onChange={(e) => setSelectedFactor(e.target.value)}
                  >
                    <option value="">All Factors</option>
                    {Object.keys(keySuccessFactors).map((factor) => {
                      const config = getFactorConfig(factor);
                      return (
                        <option key={factor} value={factor}>
                          {config.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-all duration-200"
                >
                  <FaDownload className="text-sm" />
                  <span className="hidden sm:inline">Export</span>
                </motion.button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="h-96 w-full">
              <Bar data={chartJsData} options={chartJsOptions} />
            </div>
          </div>
        </motion.div>

        {/* Previous Scores Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="bg-orange-50 dark:bg-orange-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FaHistory className="text-orange-600 dark:text-orange-400 text-2xl" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Assessment History
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Track your progress over time
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <FaCalendarAlt />
                <span>{previousScores.length} assessments completed</span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {previousScores.length === 0 ? (
              <div className="text-center py-12">
                <FaHistory className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  No Previous Assessments
                </h3>
                <p className="text-gray-500 dark:text-gray-500">
                  Complete and save your first assessment to see history here
                </p>
              </div>
            ) : (
              <PreviousScoresTable
                previousScores={previousScores}
                setSelectedScore={setSelectedScore}
              />
            )}
          </div>
        </motion.div>

        {/* Quick Stats Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Highest Performing Factor */}
          {(() => {
            const highestFactor = Object.entries(keySuccessFactors).reduce(
              (max, [key, value]) => value > max.value ? { key, value } : max,
              { key: '', value: 0 }
            );
            const config = getFactorConfig(highestFactor.key);
            
            return (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <FaTrophy className="text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Highest Score</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{config.name}</p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">
                      {(highestFactor.value * 10).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Lowest Performing Factor */}
          {(() => {
            const lowestFactor = Object.entries(keySuccessFactors).reduce(
              (min, [key, value]) => value < min.value ? { key, value } : min,
              { key: '', value: 10 }
            );
            const config = getFactorConfig(lowestFactor.key);
            
            return (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                    <FaBullseye className="text-red-600 dark:text-red-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Needs Focus</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{config.name}</p>
                    <p className="text-lg font-bold text-red-600 dark:text-red-400">
                      {(lowestFactor.value * 10).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Average Score */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <FaChartLine className="text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Average Score</p>
                <p className="font-semibold text-gray-900 dark:text-white">All Factors</p>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {(overallScore * 10).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          {/* Completion Rate */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <FaClipboardList className="text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Completion</p>
                <p className="font-semibold text-gray-900 dark:text-white">Assessment</p>
                <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {((metrics.filter(m => m.score > 0).length / metrics.length) * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal for Score Details */}
      <AnimatePresence>
        {selectedScore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedScore(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
              <div className="bg-blue-50 dark:bg-blue-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <HiEye className="text-blue-600 dark:text-blue-400 text-2xl" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Assessment Details
                    </h3>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedScore(null)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  >
                    <HiX className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                  </motion.button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <ScoreDetailsModal
                  selectedScore={selectedScore}
                  onClose={() => setSelectedScore(null)}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default RaciOperations;