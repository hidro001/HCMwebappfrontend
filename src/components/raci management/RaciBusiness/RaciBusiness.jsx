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

