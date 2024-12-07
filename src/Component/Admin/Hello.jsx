import { useState, useEffect } from "react";
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
import axios from "axios"; // Import axios for API requests
import { useDispatch, useSelector } from "react-redux";

function Hello() {
  const [selectedFactor, setSelectedFactor] = useState("");
  const [previousScores, setPreviousScores] = useState([]); // State to store fetched scores
  const empId = useSelector((state) => state.auth.employeeId);
  const [selectedScore, setSelectedScore] = useState(null);

  // Function to save the current scores
  const saveScores = async () => {
    try {
      const employeeId = empId;
      const accessToken = localStorage.getItem("accessToken");

      if (!employeeId || !accessToken) {
        alert("Employee ID or access token is missing.");
        return;
      }

      const payload = {
        employee_Id: employeeId,
        metrics,
        keySuccessFactors,
        overallScore,
        date: new Date().toISOString(),
      };

      const response = await axios.post(
        "https://apiv2.humanmaximizer.com/api/v1/raci/saveScores",
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        alert("Scores saved successfully!");
        fetchPreviousScores(); // Refresh the list of previous scores
      } else {
        alert("Failed to save scores.");
      }
    } catch (error) {
      console.error("Error saving scores:", error);
      alert("An error occurred while saving scores.");
    }
  };

  // Function to fetch the previous scores
  // Function to fetch the previous scores
  const fetchPreviousScores = async () => {
    try {
      const employeeId = localStorage.getItem("employeeId"); // Retrieve employeeId from localStorage
      const accessToken = localStorage.getItem("accessToken");

      if (!employeeId || !accessToken) {
        console.error("Employee ID or access token is missing.");
        return;
      }

      // Make a POST request to the backend
      const response = await axios.post(
        "https://apiv2.humanmaximizer.com/api/v1/raci/getScores",
        {
          employee_Id: employeeId, // Send the employee_Id in the request body
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Add authorization header
          },
        }
      );

      // Check if the response is successful
      if (response.data.success) {
        setPreviousScores(response.data.data); // Update the state with fetched scores
      } else {
        alert("Failed to fetch previous scores.");
      }
    } catch (error) {
      console.error("Error fetching previous scores:", error);
      // alert("No previous scores found.");
    }
  };

  useEffect(() => {
    fetchPreviousScores(); // Fetch previous scores on component mount
  }, []);

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

  const handleDropdownChange = (id, newScore) => {
    setMetrics(
      metrics.map((metric) =>
        metric.id === id ? { ...metric, score: newScore } : metric
      )
    );
  };

  const calculateKeySuccessFactors = () => {
    const scoreById = {};
    metrics.forEach((metric) => {
      scoreById[metric.id] = metric.score || 0;
    });

    const adjustedScore = (id) => {
      const score = scoreById[id];
      if (score === undefined || score === "") {
        return 0; // default to 0 if no score
      }
      return score - 0;
    };

    const calculateFactor = (sum, totalWeight) => {
      return totalWeight === 0 ? 0 : sum / totalWeight;
    };

    // Business Planning
    const businessPlanningSum =
      adjustedScore(10) +
      adjustedScore(11) +
      adjustedScore(15) +
      adjustedScore(16) +
      adjustedScore(19) +
      adjustedScore(20) * 1.5;

    const businessPlanningTotalWeight = 6.5;

    const businessPlanning = calculateFactor(
      businessPlanningSum,
      businessPlanningTotalWeight
    );

    // Leadership
    const leadershipSum =
      adjustedScore(6) +
      adjustedScore(8) +
      adjustedScore(9) +
      adjustedScore(16) +
      adjustedScore(20) +
      adjustedScore(21) +
      adjustedScore(24);

    const leadershipTotalWeight = 7;

    const leadership = calculateFactor(leadershipSum, leadershipTotalWeight);

    // Profitability
    const profitabilitySum =
      adjustedScore(1) +
      adjustedScore(2) +
      adjustedScore(3) +
      adjustedScore(5) +
      adjustedScore(12) +
      adjustedScore(14);

    const profitabilityTotalWeight = 6;

    const profitability = calculateFactor(
      profitabilitySum,
      profitabilityTotalWeight
    );

    // Marketing
    const marketingSum =
      adjustedScore(1) +
      adjustedScore(4) +
      adjustedScore(7) +
      adjustedScore(12) +
      adjustedScore(16) +
      adjustedScore(17) * 1.5 +
      adjustedScore(22);

    const marketingTotalWeight = 7.5;

    const marketing = calculateFactor(marketingSum, marketingTotalWeight);

    // Personal Development
    const personalDevelopmentSum =
      adjustedScore(6) +
      adjustedScore(8) +
      adjustedScore(18) * 1.5 +
      adjustedScore(23) +
      adjustedScore(24);

    const personalDevelopmentTotalWeight = 5.5;

    const personalDevelopment = calculateFactor(
      personalDevelopmentSum,
      personalDevelopmentTotalWeight
    );

    // Continuous Improvement
    const continuousImprovementSum =
      adjustedScore(9) +
      adjustedScore(10) +
      adjustedScore(11) +
      adjustedScore(14) +
      adjustedScore(19) +
      adjustedScore(21) +
      adjustedScore(23);

    const continuousImprovementTotalWeight = 7;

    const continuousImprovement = calculateFactor(
      continuousImprovementSum,
      continuousImprovementTotalWeight
    );

    // Revenue Sales
    const revenueSalesSum =
      adjustedScore(1) +
      adjustedScore(3) +
      adjustedScore(4) +
      adjustedScore(7) +
      adjustedScore(10) +
      adjustedScore(13) +
      adjustedScore(17) * 1.5 +
      adjustedScore(25) * 1.5;

    const revenueSalesTotalWeight = 9;

    const revenueSales = calculateFactor(
      revenueSalesSum,
      revenueSalesTotalWeight
    );

    // Employee Engagement
    const employeeEngagementSum =
      adjustedScore(6) * 1.5 +
      adjustedScore(8) +
      adjustedScore(9) +
      adjustedScore(18) +
      adjustedScore(24);

    const employeeEngagementTotalWeight = 5.5;

    const employeeEngagement = calculateFactor(
      employeeEngagementSum,
      employeeEngagementTotalWeight
    );

    // Reduction in Inefficiencies
    const reductionInInefficienciesSum =
      adjustedScore(2) +
      adjustedScore(5) +
      adjustedScore(11) +
      adjustedScore(14) * 1.5 +
      adjustedScore(21) +
      adjustedScore(23) * 1.5;

    const reductionInInefficienciesTotalWeight = 7;

    const reductionInInefficiencies = calculateFactor(
      reductionInInefficienciesSum,
      reductionInInefficienciesTotalWeight
    );

    // Customer Service
    const customerServiceSum =
      adjustedScore(1) +
      adjustedScore(4) +
      adjustedScore(10) +
      adjustedScore(16) * 1.5 +
      adjustedScore(17) +
      adjustedScore(19) * 1.5;

    const customerServiceTotalWeight = 7;

    const customerService = calculateFactor(
      customerServiceSum,
      customerServiceTotalWeight
    );

    setKeySuccessFactors({
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
    });

    const totalScore =
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

    setOverallScore(totalScore);
  };

  useEffect(() => {
    calculateKeySuccessFactors();
  }, [metrics]);

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

  const chartData = Object.keys(keySuccessFactors).map((factor) => ({
    name: factor,
    score: keySuccessFactors[factor] * 10, // Convert to percentage
  }));

  return (
    <div className="main">
      <div className="ems-content">
        <div className="container">
          <div className="rzr-hm-sueradmin-RACI1 App">
            <div className="d-flex justify-content-center p-4 hm-raci-title">
              <h4>
                <b>RACI Operational KPI Assessment</b>
              </h4>
            </div>

            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-12">
                <div className="rzr-hm-raci1-af">
                  <h2 className="rzr-hm-raci1-af-title">Assessment Form</h2>
                  <table className="rzr-hm-raci1-af-table">
                    <thead>
                      <tr>
                        <th>Metric</th>
                        <th>Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {metrics.map((metric, index) => {
                        const isHighlighted =
                          selectedFactor &&
                          keySuccessFactorsMapping[selectedFactor].includes(
                            metric.id
                          );
                        return (
                          <tr
                            key={metric.id}
                            className={`rzr-hm-raci1-af-row row-color-${
                              index % 5
                            } ${isHighlighted ? "highlighted-factor" : ""}`}
                          >
                            <td>{metric.metric}</td>
                            <td>
                              <select
                                value={metric.score}
                                onChange={(e) =>
                                  handleDropdownChange(
                                    metric.id,
                                    Number(e.target.value)
                                  )
                                }
                                className="rzr-hm-raci1-af-select"
                              >
                                {scoreOptions.map((option, index) => (
                                  <option key={index} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-lg-3 col-md-3 col-sm-12">
                <div className="rzr-hm-raci-ops">
                  <h2 className="rzr-hm-raci-ops-title">Key Success Factors</h2>
                  <div className="rzr-hm-raci-ops-table-container">
                    <table className="rzr-hm-raci-ops-table">
                      <thead>
                        <tr>
                          <th>Success Factor</th>
                          <th>Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(keySuccessFactors).map((factor, index) => (
                          <tr key={index}>
                            <td>{factor}</td>
                            <td>{keySuccessFactors[factor].toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="rzr-hm-raci2-buss">
              <div className="rzr-hm-raci2-buss-card">
                <h2 className="rzr-hm-raci-oops-scoring-title">
                  Assessment Form
                </h2>
                <div className="rzr-hm-raci2-buss-select-container">
                  <select
                    value={selectedFactor}
                    onChange={(e) => setSelectedFactor(e.target.value)}
                    className="rzr-hm-raci2-buss-select"
                  >
                    <option value="">--Select a Key Success Factor--</option>
                    {Object.keys(keySuccessFactors).map((factor) => (
                      <option key={factor} value={factor}>
                        {factor}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="rzr-hm-raci2-buss-chart-container">
                  <h2 className="rzr-hm-raci2-buss-chart-title">
                    Key Success Factors Graph
                  </h2>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={chartData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 100,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        interval={0}
                        angle={-45}
                        textAnchor="end"
                      />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend className="hm-raci-score" />
                      <Bar dataKey="score" fill="#8cc01d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <h2 className="highlighted-score">
              Overall Score: {(overallScore * 10).toFixed(2)}%
            </h2>

            <div className="rzr-hm-raci-ops-save">
              {/* Save Scores Button */}
              <div className="save-scores-container">
                <button onClick={saveScores} className="save-scores-button">
                  Save Scores
                </button>
              </div>

              {/* Display Fetched Scores Table */}
              <div className="previous-scores-table">
                <h3>Previous Scores</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Overall Score</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previousScores.length > 0 ? (
                      previousScores.map((score, index) => (
                        <tr key={index}>
                          <td>{new Date(score.date).toLocaleDateString()}</td>
                          <td>{(score.overallScore * 10).toFixed(2)}%</td>
                          <td>
                            <button onClick={() => setSelectedScore(score)}>
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3">No previous scores found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Display the selected score in a popup */}
                {selectedScore && (
                  <div className="modal-overlay">
                    <div className="modal-content">
                      {/* Close button to close the modal */}
                      <button
                        className="close-button"
                        onClick={() => setSelectedScore(null)}
                      >
                        &times;
                      </button>

                      <h4>Score Details</h4>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(selectedScore.date).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Overall Score:</strong>{" "}
                        {(selectedScore.overallScore * 10).toFixed(2)}%
                      </p>

                      <h5>Metrics</h5>
                      <table>
                        <thead>
                          <tr>
                            <th>Metric</th>
                            <th>Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedScore.metrics.map((metric, index) => (
                            <tr key={index}>
                              <td>{metric.metric}</td>
                              <td>{metric.score}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <h5>Key Success Factors</h5>
                      <ul>
                        {Object.keys(selectedScore.keySuccessFactors).map(
                          (factor, index) => (
                            <li key={index}>
                              {factor}:{" "}
                              {selectedScore.keySuccessFactors[factor].toFixed(
                                2
                              )}
                            </li>
                          )
                        )}
                      </ul>

                      {/* Chart for Key Success Factors */}
                      <div className="rzr-hm-raci2-buss-chart-container">
                        <h2 className="rzr-hm-raci2-buss-chart-title">
                          Key Success Factors Graph
                        </h2>
                        <ResponsiveContainer width="100%" height={400}>
                          <BarChart
                            data={Object.keys(
                              selectedScore.keySuccessFactors
                            ).map((factor) => ({
                              name: factor,
                              score:
                                selectedScore.keySuccessFactors[factor] * 10, // Convert to percentage
                            }))}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 100,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="name"
                              interval={0}
                              angle={-45}
                              textAnchor="end"
                            />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Legend className="hm-raci-score" />
                            <Bar dataKey="score" fill="#8cc01d" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Optional: Close button at the bottom */}
                      <button
                        className="close-button-bottom"
                        onClick={() => setSelectedScore(null)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx="true">{`
        /* Add these styles in your CSS file */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 80%;
          max-width: 600px;
          max-height: 80%;
          overflow-y: auto;
          position: relative;
        }

        .close-button {
          position: absolute;
          top: 30px;
          right: 10px;
          background: red;
          border: none;
          font-size: 20px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export default Hello;
