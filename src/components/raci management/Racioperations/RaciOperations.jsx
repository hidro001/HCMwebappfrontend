// import React from "react";
// import { motion } from "framer-motion";
// import IndustryPerformanceTable from "./IndustryPerformanceTable";
// import BusinessPerformanceTable from "./BusinessPerformanceTable";
// import KeyPerformanceMetrics from "./KeyPerformanceMetrics";
// import RaciBusinessChart from "./RACIChart";
// import PreviousScores from "./PreviousScores";

// const RaciOperations = () => {
//   return (
//     <div className="bg-gray-100 dark:bg-gray-900 p-4">
//       <h1 className="font-black text-3xl py-2">RACI Operational KPI Assessment</h1>
   
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

// export default RaciOperations;


import { useState, useEffect } from "react";
import axiosInstance from "../../../service/axiosInstance";

// Recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sub-components
import AssessmentForm from "./AssessmentForm";
import KeySuccessFactorsTable from "./KeySuccessFactorsTable";
import PreviousScoresTable from "./PreviousScoresTable";
import ScoreDetailsModal from "./ScoreDetailsModal";

// Tailwind classes for table & modal are in separate CSS or index.css
// We'll inline a bit at the bottom.

function RaciOperations() {
  // Optional dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // If you have Redux storing employeeId:
  const employeeIdFromRedux = localStorage.getItem("employeeId")

  // We store metrics and key success factors in state
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
      metric: "Our sales and marketing documentation (brochures, web sites)?",
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
      metric: "The quality of the documentation of our standard operating procedures?",
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
      metric: "Our ability to check at any time profit, sales, expenses and cash flow?",
      score: 0,
    },
    {
      id: 16,
      metric: "Our understanding of the needs and perceptions of our Customers?",
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
      metric: "Our ability to deliver on time, on budget and with specified quality?",
      score: 0,
    },
    {
      id: 20,
      metric: "Our documentation of a clear vision and competitive advantage for the business?",
      score: 0,
    },
    {
      id: 21,
      metric: "Our mechanism for benchmarking our systems against best practice?",
      score: 0,
    },
    {
      id: 22,
      metric: "Our ability to record our sales per product, per market segment?",
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

  // For highlighting certain rows if selectedFactor is chosen
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

  // Chart data for the Key Success Factors
  const chartData = Object.keys(keySuccessFactors).map((factor) => ({
    name: factor,
    score: keySuccessFactors[factor] * 10, // convert to a 0-100 scale
  }));

  // Update metrics when user changes a dropdown
  const handleDropdownChange = (id, newScore) => {
    setMetrics((prev) =>
      prev.map((metric) =>
        metric.id === id ? { ...metric, score: newScore } : metric
      )
    );
  };

  // Calculate Key Success Factors whenever metrics change
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
      val(2) +
      val(5) +
      val(11) +
      val(14) * 1.5 +
      val(21) +
      val(23) * 1.5;
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
      const res = await axiosInstance.post("/raci/saveScores", payload);

      if (res.data?.success) {
        alert("Scores saved successfully!");
        fetchPreviousScores();
      } else {
        alert("Failed to save scores.");
      }
    } catch (error) {
      console.error("Error saving scores:", error);
      alert("An error occurred while saving scores.");
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
      const res = await axiosInstance.post("/raci/getScores", {
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

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      {/* Main container with tailwind classes for dark mode support */}
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white p-4">
        {/* Toggle Dark Mode Button */}
        <div className="text-right mb-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Toggle {isDarkMode ? "Light" : "Dark"} Mode
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-6">
          RACI Operational KPI Assessment
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left: AssessmentForm */}
          <div className="col-span-2">
            <AssessmentForm
              metrics={metrics}
              scoreOptions={scoreOptions}
              handleDropdownChange={handleDropdownChange}
              selectedFactor={selectedFactor}
              keySuccessFactorsMapping={keySuccessFactorsMapping}
            />
          </div>

          {/* Right: Key Success Factors */}
          <div>
            <KeySuccessFactorsTable keySuccessFactors={keySuccessFactors} />
          </div>
        </div>

        {/* Chart + Factor Selection */}
        <div className="mt-8 p-4 border rounded dark:border-gray-700 dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4">
            Key Success Factors Graph
          </h2>
          <div className="mb-4">
            <select
              className="border px-2 py-1 rounded dark:bg-gray-700"
              value={selectedFactor}
              onChange={(e) => setSelectedFactor(e.target.value)}
            >
              <option value="">--Select a Key Success Factor--</option>
              {Object.keys(keySuccessFactors).map((factor) => (
                <option key={factor} value={factor}>
                  {factor}
                </option>
              ))}
            </select>
          </div>

          <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer>
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 80 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#8cc01d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Overall Score */}
        <h2 className="mt-6 text-lg font-medium">
          Overall Score: {(overallScore * 10).toFixed(2)}%
        </h2>

        {/* Save Scores Button & Previous Scores */}
        <div className="my-6">
          <button
            onClick={saveScores}
            className="px-4 py-2 bg-green-500 text-white rounded mr-4"
          >
            Save Scores
          </button>
        </div>

        <PreviousScoresTable
          previousScores={previousScores}
          setSelectedScore={setSelectedScore}
        />

        {/* Modal for Score Details */}
        {selectedScore && (
          <ScoreDetailsModal
            selectedScore={selectedScore}
            onClose={() => setSelectedScore(null)}
          />
        )}
      </div>
    </div>
  );
}

export default RaciOperations;
