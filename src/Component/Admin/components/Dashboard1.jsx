import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import axios from "axios";

// Helper Functions

// Function to get color based on percentage
const getColorFromPercentage = (percentage) => {
  if (percentage >= 75) return "green";
  if (percentage >= 50) return "yellow";
  if (percentage >= 25) return "orange";
  return "red";
};

// Function to get color based on dropdown value for individual selections
const getColorFromValue = (value) => {
  switch (value) {
    case "Excellent":
    case "Good":
    case "Low":
    case "Yes":
    case "Adequate":
    case "Secure":
    case "Never":
    case "Good":
    case "Partially":
      return "green";
    case "Moderate":
    case "Medium":
    case "Somewhat reliant":
    case "Partially":
    case "Moderate":
      return "yellow";
    case "Poor":
    case "High":
    case "No":
    case "> 1%":
    case "Inadequate":
    case "Highly reliant":
      return "red";
    default:
      return "white";
  }
};

// Function to calculate overall performance
const calculatePerformance = (values, mapping) => {
  const numericValues = values.map((value) => {
    return mapping[value] || 0;
  });

  const validValues = numericValues.filter((val) => val > 0);

  if (validValues.length === 0)
    return { averageColor: "white", averagePercentage: 0 };

  const total = validValues.reduce((acc, val) => acc + val, 0);
  const averagePercentage = (total / validValues.length) * 20; // Mapping to 100%

  return {
    averageColor: getColorFromPercentage(averagePercentage),
    averagePercentage: averagePercentage.toFixed(2),
  };
};

// PerformanceBarChart Component
const PerformanceBarChart = ({ performanceData }) => {
  // Define unique colors for each category
  const categoryColors = {
    INDUSTRY: "#4682B4", // Steel Blue
    "BUSINESS PERFORMANCE": "#FF4500", // Orange Red
    "BUSINESS GROWTH": "#32CD32", // Lime Green
    "BUSINESS RISK": "#9400D3", // Dark Violet
    COMPETITION: "#800080", // Purple
    "MANAGEMENT INFORMATION SYSTEMS": "#FFA500", // Orange
    OWNERS: "#FFD700", // Gold
    "CUSTOMERS AND MARKET DEMAND": "#20B2AA", // Light Sea Green
    STAFF: "#FF6347", // Tomato
    "SUCCESSION AND ESTATE PLANNING": "#ADFF2F", // Green Yellow
  };

  // Function to calculate the overall performance score
  const calculateOverallPerformance = (performanceData) => {
    const totalScore = performanceData.reduce(
      (sum, entry) => sum + entry.percentage,
      0
    );
    const numberOfEntries = performanceData.length;
    return (totalScore / numberOfEntries).toFixed(2); // Returns the overall percentage
  };

  return (
    <div className="rz-hm-sa-raci2 performance-overview-container">
      <h2 className="rz-hm-sa-raci2-title">Performance Overview</h2>
      <div className="rz-hm-sa-raci2-chart-container">
        <ResponsiveContainer width="100%" height="80%">
          <BarChart
            data={performanceData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 150, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 120]} />
            <YAxis
              type="category"
              dataKey="category"
              width={200}
              tick={{ fontSize: 14 }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="percentage" barSize={30} name="Performance (%)">
              {performanceData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={categoryColors[entry.category] || "#8884d8"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <h3 className="rz-hm-sa-raci2-overall-score">
        Overall Performance Score:{" "}
        {calculateOverallPerformance(performanceData)}%
      </h3>
    </div>
  );
};

// KeyPerformanceMetrics Component
const KeyPerformanceMetrics = ({ performanceData }) => {
  // Calculate the overall performance score
  const totalScore = performanceData.reduce(
    (acc, item) => acc + item.percentage,
    0
  );
  const overallPerformanceScore = (totalScore / performanceData.length).toFixed(
    2
  );

  return (
    <div className="rz-hm-sa-raci2-keyperf">
      <h2 className="rz-hm-sa-raci2-keyperf-title">Key Performance Metrics</h2>
      <table className="rz-hm-sa-raci2-keyperf-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Performance</th>
            <th>Score (%)</th>
          </tr>
        </thead>
        <tbody>
          {performanceData.map((item, index) => (
            <tr key={index}>
              <td>{item.category}</td>
              <td
                className="performance-cell"
                style={{
                  backgroundColor: getColorFromPercentage(item.percentage),
                }}
              >
                {item.percentage > 0 ? `${item.percentage}%` : "0%"}
              </td>
              <td>{item.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="rz-hm-sa-raci2-keyperf-overall">
        Overall Performance Score: {overallPerformanceScore}%
      </h3>
    </div>
  );
};

// Assessment Components

// 1. Industry Component
const Industry = ({ setScore }) => {
  const questions = [
    "Business operates in a well-established, stable industry",
    "The industry / market is growing",
    "Business likely to be negatively influenced by industry restructuring",
    "Business likely to be influenced by negative global trends",
    "Future industry trends will positively affect the business",
  ];

  const options = [
    ["1", "2", "3", "4", "5"], // Definitely to No - Will change significantly
  ];

  const mapping = {
    1: 5, // Definitely (high positive)
    2: 4, // Probably
    3: 3, // No - Will change slightly
    4: 2, // No - Will change moderately
    5: 1, // No - Will change significantly
  };

  const [values, setValues] = useState(Array(questions.length).fill("0"));

  const handleDropdownChange = (index, event) => {
    const newValues = [...values];
    newValues[index] = event.target.value;
    setValues(newValues);
  };

  const { averageColor, averagePercentage } = calculatePerformance(
    values,
    mapping
  );

  useEffect(() => {
    setScore(parseFloat(averagePercentage));
  }, [averagePercentage, setScore]);

  return (
    <div className="rz-hm-sa-raci2-ind">
      <h1 className="rz-hm-sa-raci2-ind-title">
        Industry Performance Assessment
      </h1>
      <table className="rz-hm-sa-raci2-ind-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Response</th>
            <th>Performance Review</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => {
            const value = values[index];
            const color = getColorFromValue(value);
            return (
              <tr key={index}>
                <td>{question}</td>
                <td>
                  <select
                    value={value}
                    onChange={(event) => handleDropdownChange(index, event)}
                    className="rz-hm-sa-raci2-ind-select"
                  >
                    <option value="0">No response</option>
                    <option value="1">Definitely</option>
                    <option value="2">Probably</option>
                    <option value="3">No - Will change slightly</option>
                    <option value="4">No - Will change moderately</option>
                    <option value="5">No - Will change significantly</option>
                  </select>
                </td>
                <td
                  className="rz-hm-sa-raci2-ind-review"
                  style={{ backgroundColor: color }}
                >
                  {value === "0" ? "No response" : value}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <KeyPerformanceMetrics
        performanceData={[
          {
            category: "INDUSTRY",
            percentage: parseFloat(averagePercentage),
          },
        ]}
      />
    </div>
  );
};

// 2. BusinessPerformance Component
const BusinessPerformance = ({ setScore }) => {
  const questions = [
    "How many years of profitable trading does the business have?",
    "Current year increase in sales (%)",
    "% current year increase in gross margin ($)",
    "Current year increase in wages as % of sales",
    "Current year increase in adjusted EBIT (%)",
    "Current year improvement in liquidity (debtors, creditors, cash)",
  ];

  const options = [
    ["1 to 2", "3 to 5", "6 to 10", "> 10"],
    ["> 20%", "11 – 20%", "6 – 10%", "1 – 5%", "Either N/A"],
    ["> 20%", "11 – 20%", "6 – 10%", "1 – 5%", "Either N/A"],
    ["> 20%", "11 – 20%", "6 – 10%", "1 – 5%", "Either N/A"],
    ["> 20%", "11 – 20%", "6 – 10%", "1 – 5%", "Either N/A"],
    ["Good", "Moderate", "Poor", "No change"],
  ];

  const mapping = {
    "1 to 2": 2,
    "3 to 5": 3,
    "6 to 10": 4,
    "> 10": 5,
    "> 20%": 5,
    "11 – 20%": 4,
    "6 – 10%": 3,
    "1 – 5%": 2,
    "Either N/A": 2,
    Good: 5,
    Moderate: 3,
    Poor: 1,
    "No change": 2,
  };

  const [values, setValues] = useState(Array(questions.length).fill(""));

  const handleDropdownChange = (index, event) => {
    const newValues = [...values];
    newValues[index] = event.target.value;
    setValues(newValues);
  };

  const { averageColor, averagePercentage } = calculatePerformance(
    values,
    mapping
  );

  useEffect(() => {
    setScore(parseFloat(averagePercentage));
  }, [averagePercentage, setScore]);

  return (
    <div className="rz-hm-sa-raci2-ind">
      <h1 className="rz-hm-sa-raci2-ind-title">
        Business Performance Assessment
      </h1>
      <table className="rz-hm-sa-raci2-ind-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Response</th>
            <th>Performance Review</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index}>
              <td>{question}</td>
              <td>
                <select
                  value={values[index]}
                  onChange={(event) => handleDropdownChange(index, event)}
                  className="rz-hm-sa-raci2-ind-select"
                >
                  <option value="">Select an option</option>
                  {options[index].map((option, optIndex) => (
                    <option key={optIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
              <td
                style={{
                  backgroundColor: getColorFromValue(values[index]),
                }}
                className="rz-hm-sa-raci2-ind-review"
              >
                {values[index] === "" ? "No response" : values[index]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <KeyPerformanceMetrics
        performanceData={[
          {
            category: "BUSINESS PERFORMANCE",
            percentage: parseFloat(averagePercentage),
          },
        ]}
      />
    </div>
  );
};

// 3. BusinessRisk Component
const BusinessRisk = ({ setScore }) => {
  const questions = [
    "Cost of supplies is subject to inflationary pressure.",
    "Customers are located in depressed geographical areas.",
    "Does Government legislation protect the supply chain?",
    "Products/services threatened by imports.",
    "Insurance management – policies are adequate and cover the main risks.",
    "Products/services threatened by new technology.",
    "Last 5 years: number of legal claims > 1% of turnover.",
    "Premises – where location is important, tenure is secure.",
    "How many times has input supply disruption negatively impacted operations?",
    "Supply is concentrated to a small number of suppliers.",
    "How reliant is the business on its major supplier(s)?",
    "Do suppliers determine what products and services are offered?",
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

  const [values, setValues] = useState(Array(questions.length).fill(""));

  const handleDropdownChange = (index, event) => {
    const newValues = [...values];
    newValues[index] = event.target.value;
    setValues(newValues);
  };

  const { averageColor, averagePercentage } = calculatePerformance(
    values,
    mapping
  );

  useEffect(() => {
    setScore(parseFloat(averagePercentage));
  }, [averagePercentage, setScore]);

  return (
    <div className="rz-hm-sa-raci2-ind">
      <h1 className="rz-hm-sa-raci2-ind-title">Business Risk Assessment</h1>
      <table className="rz-hm-sa-raci2-ind-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Response</th>
            <th>Performance Review</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index}>
              <td>{question}</td>
              <td>
                <select
                  value={values[index]}
                  onChange={(event) => handleDropdownChange(index, event)}
                  className="rz-hm-sa-raci2-ind-select"
                >
                  <option value="">Select an option</option>
                  {options[index].map((option, optIndex) => (
                    <option key={optIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
              <td
                style={{
                  backgroundColor: getColorFromValue(values[index]),
                }}
                className="rz-hm-sa-raci2-ind-review"
              >
                {values[index] === "" ? "No response" : values[index]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <KeyPerformanceMetrics
        performanceData={[
          {
            category: "BUSINESS RISK",
            percentage: parseFloat(averagePercentage),
          },
        ]}
      />
    </div>
  );
};

// 4. Competition Component
const Competition = ({ setScore }) => {
  const questions = [
    "Existing competitors are aggressive.",
    "Increased competition from national competitors.",
    "Increased competition from overseas competitors.",
    "The market can sustain the current level of competition.",
    "New competitors have high financial start-up costs.",
    "New competitors need special skills/knowledge.",
    "Other barriers to entry exist for new competitors.",
  ];

  const options = [
    ["High", "Medium", "Low", "Not Applicable"],
    ["High", "Medium", "Low", "Not Applicable"],
    ["High", "Medium", "Low", "Not Applicable"],
    ["Yes", "No", "Partially"],
    ["Yes", "No", "Partially"],
    ["Yes", "No", "Partially"],
    ["Yes", "No", "Partially"],
  ];

  const mapping = {
    High: 1,
    Medium: 3,
    Low: 5,
    Yes: 2,
    No: 4,
    Partially: 3,
  };

  const [values, setValues] = useState(Array(questions.length).fill(""));

  const handleDropdownChange = (index, event) => {
    const newValues = [...values];
    newValues[index] = event.target.value;
    setValues(newValues);
  };

  const { averageColor, averagePercentage } = calculatePerformance(
    values,
    mapping
  );

  useEffect(() => {
    setScore(parseFloat(averagePercentage));
  }, [averagePercentage, setScore]);

  return (
    <div className="rz-hm-sa-raci2-ind">
      <h1 className="rz-hm-sa-raci2-ind-title">Competition Assessment</h1>
      <table className="rz-hm-sa-raci2-ind-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Response</th>
            <th>Performance Review</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index}>
              <td>{question}</td>
              <td>
                <select
                  value={values[index]}
                  onChange={(event) => handleDropdownChange(index, event)}
                  className="rz-hm-sa-raci2-ind-select"
                >
                  <option value="">Select an option</option>
                  {options[index].map((option, optIndex) => (
                    <option key={optIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
              <td
                style={{
                  backgroundColor: getColorFromValue(values[index]),
                }}
                className="rz-hm-sa-raci2-ind-review"
              >
                {values[index] === "" ? "No response" : values[index]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <KeyPerformanceMetrics
        performanceData={[
          {
            category: "COMPETITION",
            percentage: parseFloat(averagePercentage),
          },
        ]}
      />
    </div>
  );
};

// 5. CustomersMarketDemand Component
const CustomersMarketDemand = ({ setScore }) => {
  const questions = [
    "Top 10 Customers: % of Total Income.",
    "Degree of customer loyalty.",
    "Percentage of customers that generate 80% of profits.",
    "Substitutes exist for your products/services.",
    "Effect on income if key customers sold their business.",
    "How would a 10% increase in your prices affect customer demand?",
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

  const [values, setValues] = useState(Array(questions.length).fill(""));

  const handleDropdownChange = (index, event) => {
    const newValues = [...values];
    newValues[index] = event.target.value;
    setValues(newValues);
  };

  const { averageColor, averagePercentage } = calculatePerformance(
    values,
    mapping
  );

  useEffect(() => {
    setScore(parseFloat(averagePercentage));
  }, [averagePercentage, setScore]);

  return (
    <div className="rz-hm-sa-raci2-ind">
      <h1 className="rz-hm-sa-raci2-ind-title">
        Customers and Market Demand Assessment
      </h1>
      <table className="rz-hm-sa-raci2-ind-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Response</th>
            <th>Performance Review</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index}>
              <td>{question}</td>
              <td>
                <select
                  value={values[index]}
                  onChange={(event) => handleDropdownChange(index, event)}
                  className="rz-hm-sa-raci2-ind-select"
                >
                  <option value="">Select an option</option>
                  {options[index].map((option, optIndex) => (
                    <option key={optIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
              <td
                style={{
                  backgroundColor: getColorFromValue(values[index]),
                }}
                className="rz-hm-sa-raci2-ind-review"
              >
                {values[index] === "" ? "No response" : values[index]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <KeyPerformanceMetrics
        performanceData={[
          {
            category: "CUSTOMERS AND MARKET DEMAND",
            percentage: parseFloat(averagePercentage),
          },
        ]}
      />
    </div>
  );
};

// 6. MIS Component
const MIS = ({ setScore }) => {
  const questions = [
    "Do you operate modern computer-based accounting and business systems?",
    "Do your systems report on sales, cost of goods, and gross margin?",
    "Policies and procedures exist for at least monthly reporting.",
    "Existence and use of best practice operating systems.",
  ];

  const options = [
    ["Yes", "No", "Partially"],
    ["Yes", "No", "Partially"],
    ["Yes", "No", "Partially"],
    ["Yes", "No", "Partially"],
  ];

  const mapping = {
    Yes: 5,
    Partially: 3,
    No: 1,
  };

  const [values, setValues] = useState(Array(questions.length).fill(""));

  const handleDropdownChange = (index, event) => {
    const newValues = [...values];
    newValues[index] = event.target.value;
    setValues(newValues);
  };

  const { averageColor, averagePercentage } = calculatePerformance(
    values,
    mapping
  );

  useEffect(() => {
    setScore(parseFloat(averagePercentage));
  }, [averagePercentage, setScore]);

  return (
    <div className="rz-hm-sa-raci2-ind">
      <h1 className="rz-hm-sa-raci2-ind-title">
        Management Information Systems (MIS) Assessment
      </h1>
      <table className="rz-hm-sa-raci2-ind-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Response</th>
            <th>Performance Review</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index}>
              <td>{question}</td>
              <td>
                <select
                  value={values[index]}
                  onChange={(event) => handleDropdownChange(index, event)}
                  className="rz-hm-sa-raci2-ind-select"
                >
                  <option value="">Select an option</option>
                  {options[index].map((option, optIndex) => (
                    <option key={optIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
              <td
                style={{
                  backgroundColor: getColorFromValue(values[index]),
                }}
                className="rz-hm-sa-raci2-ind-review"
              >
                {values[index] === "" ? "No response" : values[index]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <KeyPerformanceMetrics
        performanceData={[
          {
            category: "MANAGEMENT INFORMATION SYSTEMS",
            percentage: parseFloat(averagePercentage),
          },
        ]}
      />
    </div>
  );
};

// 7. Owners Component
const Owners = ({ setScore }) => {
  const questions = [
    "Degree of principal/owner reliance.",
    "Easy transfer of business knowledge, IP, systems, etc.",
    "Principal/owner departure will cause loss of key business functions.",
  ];

  const options = [
    ["High", "Medium", "Low", "Not Applicable"],
    ["High", "Medium", "Low", "Not Applicable"],
    ["High", "Medium", "Low", "Not Applicable"],
  ];

  const mapping = {
    High: 1,
    Medium: 3,
    Low: 5,
  };

  const [values, setValues] = useState(Array(questions.length).fill(""));

  const handleDropdownChange = (index, event) => {
    const newValues = [...values];
    newValues[index] = event.target.value;
    setValues(newValues);
  };

  const { averageColor, averagePercentage } = calculatePerformance(
    values,
    mapping
  );

  useEffect(() => {
    setScore(parseFloat(averagePercentage));
  }, [averagePercentage, setScore]);

  return (
    <div className="rz-hm-sa-raci2-ind">
      <h1 className="rz-hm-sa-raci2-ind-title">Owners Assessment</h1>
      <table className="rz-hm-sa-raci2-ind-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Response</th>
            <th>Performance Review</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index}>
              <td>{question}</td>
              <td>
                <select
                  value={values[index]}
                  onChange={(event) => handleDropdownChange(index, event)}
                  className="rz-hm-sa-raci2-ind-select"
                >
                  <option value="">Select an option</option>
                  {options[index].map((option, optIndex) => (
                    <option key={optIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
              <td
                style={{
                  backgroundColor: getColorFromValue(values[index]),
                }}
                className="rz-hm-sa-raci2-ind-review"
              >
                {values[index] === "" ? "No response" : values[index]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <KeyPerformanceMetrics
        performanceData={[
          {
            category: "OWNERS",
            percentage: parseFloat(averagePercentage),
          },
        ]}
      />
    </div>
  );
};

// 8. Staff Component
const Staff = ({ setScore }) => {
  const questions = [
    "The industry is losing staff to other industries.",
    "Staff appraisals confirm commitment to organizational goals.",
    "Key staff experience and industry knowledge.",
    "Formal strategies for staff recruitment, retention, and training.",
    "Staff retention history.",
    "Formal communication within the business.",
  ];

  const options = [
    ["High", "Medium", "Low", "Not Applicable"],
    ["High", "Medium", "Low", "Not Applicable"],
    ["High", "Medium", "Low", "Not Applicable"],
    ["Yes", "No", "Partially"],
    ["Good", "Moderate", "Poor"],
    ["Yes", "No", "Partially"],
  ];

  const mapping = {
    High: 1,
    Medium: 3,
    Low: 5,
    Yes: 5,
    No: 1,
    Partially: 3,
    Good: 5,
    Moderate: 3,
    Poor: 1,
  };

  const [values, setValues] = useState(Array(questions.length).fill(""));

  const handleDropdownChange = (index, event) => {
    const newValues = [...values];
    newValues[index] = event.target.value;
    setValues(newValues);
  };

  const { averageColor, averagePercentage } = calculatePerformance(
    values,
    mapping
  );

  useEffect(() => {
    setScore(parseFloat(averagePercentage));
  }, [averagePercentage, setScore]);

  return (
    <div className="rz-hm-sa-raci2-ind">
      <h1 className="rz-hm-sa-raci2-ind-title">Staff Assessment</h1>
      <table className="rz-hm-sa-raci2-ind-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Response</th>
            <th>Performance Review</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index}>
              <td>{question}</td>
              <td>
                <select
                  value={values[index]}
                  onChange={(event) => handleDropdownChange(index, event)}
                  className="rz-hm-sa-raci2-ind-select"
                >
                  <option value="">Select an option</option>
                  {options[index].map((option, optIndex) => (
                    <option key={optIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
              <td
                style={{
                  backgroundColor: getColorFromValue(values[index]),
                }}
                className="rz-hm-sa-raci2-ind-review"
              >
                {values[index] === "" ? "No response" : values[index]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <KeyPerformanceMetrics
        performanceData={[
          {
            category: "STAFF",
            percentage: parseFloat(averagePercentage),
          },
        ]}
      />
    </div>
  );
};

// 9. SuccessionEstatePlanning Component
const SuccessionEstatePlanning = ({ setScore }) => {
  const questions = [
    "Risk insurance (Life, TPD, Key Person etc.) for key stakeholders exists.",
    "Documented business life plan.",
    "Documented succession plan.",
    "Documented estate plan.",
    "Surplus capital exists for future growth and succession.",
    "Strategies in place to protect, grow, and realize wealth.",
    "Business is easy to sell.",
  ];

  const options = [
    ["Yes", "No", "Partially", "Not Applicable"],
    ["Yes", "No", "Partially", "Not Applicable"],
    ["Yes", "No", "Partially", "Not Applicable"],
    ["Yes", "No", "Partially", "Not Applicable"],
    ["Yes", "No", "Partially", "Not Applicable"],
    ["Yes", "No", "Partially", "Not Applicable"],
    ["Yes", "No", "Partially", "Not Applicable"],
  ];

  const mapping = {
    Yes: 5,
    Partially: 3,
    No: 1,
  };

  const [values, setValues] = useState(Array(questions.length).fill(""));

  const handleDropdownChange = (index, event) => {
    const newValues = [...values];
    newValues[index] = event.target.value;
    setValues(newValues);
  };

  const { averageColor, averagePercentage } = calculatePerformance(
    values,
    mapping
  );

  useEffect(() => {
    setScore(parseFloat(averagePercentage));
  }, [averagePercentage, setScore]);

  return (
    <div className="rz-hm-sa-raci2-ind">
      <h1 className="rz-hm-sa-raci2-ind-title">
        Succession and Estate Planning Assessment
      </h1>
      <table className="rz-hm-sa-raci2-ind-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Response</th>
            <th>Performance Review</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index}>
              <td>{question}</td>
              <td>
                <select
                  value={values[index]}
                  onChange={(event) => handleDropdownChange(index, event)}
                  className="rz-hm-sa-raci2-ind-select"
                >
                  <option value="">Select an option</option>
                  {options[index].map((option, optIndex) => (
                    <option key={optIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
              <td
                style={{
                  backgroundColor: getColorFromValue(values[index]),
                }}
                className="rz-hm-sa-raci2-ind-review"
              >
                {values[index] === "" ? "No response" : values[index]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <KeyPerformanceMetrics
        performanceData={[
          {
            category: "SUCCESSION AND ESTATE PLANNING",
            percentage: parseFloat(averagePercentage),
          },
        ]}
      />
    </div>
  );
};

// 10. BusinessGrowth Component
const BusinessGrowth = ({ setScore }) => {
  const questions = [
    "Opportunities for business growth exist – existing products/services.",
    "Opportunities for business growth exist – new products/services.",
    "Opportunities for business growth exist – new markets.",
    "Business has continually invested in research and development (R&D).",
    "Plant & equipment in good working order and able to support growth.",
    "Premises – ability to support growth.",
    "Formal business plans (including SWOT, growth, budgets) are in place.",
  ];

  const options = [
    ["Excellent", "Good", "Moderate", "Poor"],
    ["Excellent", "Good", "Moderate", "Poor"],
    ["Excellent", "Good", "Moderate", "Poor"],
    ["Excellent", "Good", "Moderate", "Poor"],
    ["Excellent", "Good", "Moderate", "Poor"],
    ["Excellent", "Good", "Moderate", "Poor"],
    ["Excellent", "Good", "Moderate", "Poor"],
  ];

  const mapping = {
    Excellent: 5,
    Good: 4,
    Moderate: 3,
    Poor: 1,
  };

  const [values, setValues] = useState(Array(questions.length).fill(""));

  const handleDropdownChange = (index, event) => {
    const newValues = [...values];
    newValues[index] = event.target.value;
    setValues(newValues);
  };

  const { averageColor, averagePercentage } = calculatePerformance(
    values,
    mapping
  );

  useEffect(() => {
    setScore(parseFloat(averagePercentage));
  }, [averagePercentage, setScore]);

  return (
    <div className="rz-hm-sa-raci2-ind">
      <h1 className="rz-hm-sa-raci2-ind-title">Business Growth Assessment</h1>
      <table className="rz-hm-sa-raci2-ind-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Response</th>
            <th>Performance Review</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index}>
              <td>{question}</td>
              <td>
                <select
                  value={values[index]}
                  onChange={(event) => handleDropdownChange(index, event)}
                  className="rz-hm-sa-raci2-ind-select"
                >
                  <option value="">Select an option</option>
                  {options[index].map((option, optIndex) => (
                    <option key={optIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
              <td
                style={{
                  backgroundColor: getColorFromValue(values[index]),
                }}
                className="rz-hm-sa-raci2-ind-review"
              >
                {values[index] === "" ? "No response" : values[index]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <KeyPerformanceMetrics
        performanceData={[
          {
            category: "BUSINESS GROWTH",
            percentage: parseFloat(averagePercentage),
          },
        ]}
      />
    </div>
  );
};

// 11. Dashboard Component
const Dashboard = () => {
  // Inside the Dashboard component
  const [previousScores, setPreviousScores] = useState([]); // State for fetched previous scores
  const [selectedScore, setSelectedScore] = useState(null); // State for the selected score to view details
  // State for holding the performance percentages for each section
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

  // Collect all the performance scores into one array
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
    { category: "SUCCESSION AND ESTATE PLANNING", percentage: successionScore },
  ];

  const calculateOverallPerformance = (performanceData) => {
    const totalScore = performanceData.reduce(
      (sum, entry) => sum + entry.percentage,
      0
    );
    const numberOfEntries = performanceData.length;
    return (totalScore / numberOfEntries).toFixed(2); // Returns the overall percentage
  };

  // Function to save the current scores
  const saveScores = async () => {
    try {
      const employee_Id = localStorage.getItem("employeeId");
      const accessToken = localStorage.getItem("accessToken");

      if (!employee_Id || !accessToken) {
        alert("Employee ID or access token is missing.");
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

      const response = await axios.post(
        "https://apiv2.humanmaximizer.com/api/v1/raci2/saveScores",
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        alert("Scores saved successfully!");
        fetchPreviousScores(); // Refresh the previous scores
      } else {
        alert("Failed to save scores.");
      }
    } catch (error) {
      console.error("Error saving scores:", error);
      alert("An error occurred while saving scores.");
    }
  };

  // Function to fetch previous scores
  const fetchPreviousScores = async () => {
    try {
      const employee_Id = localStorage.getItem("employeeId");
      const accessToken = localStorage.getItem("accessToken");

      if (!employee_Id || !accessToken) {
        console.error("Employee ID or access token is missing.");
        return;
      }

      const response = await axios.post(
        "https://apiv2.humanmaximizer.com/api/v1/raci2/getScores",

        {
          employee_Id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        setPreviousScores(response.data.data); // Update state with fetched scores
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

  return (
    <div className="main">
      <div className="ems-content">
        {/* Primary Container for Sidebar and Main Content */}
        <div className="container">
          <h1>Key Performance Metrics Dashboard</h1>

          <div className="row">
            {/* Main Content Column */}
            <div className="col-md-8">
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

            {/* Sidebar Column */}
            <div className="col-md-4">
              <div className="sticky-sidebar">
                {/* Display the calculated overall performance */}
                <KeyPerformanceMetrics performanceData={performanceData} />
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Container for Bar Graph and Previous Scores */}
        <div className="container mt-5">
          <div className="row">
            <div className="col-12">
              {/* Render the Performance Bar Chart */}
              <PerformanceBarChart performanceData={performanceData} />

              {/* Save Scores Button */}
              <div className="rzr-hm-raci-ops-save">
                <div className="save-scores-container my-4">
                  <button onClick={saveScores} className="save-scores-button">
                    Save Scores
                  </button>
                </div>

                {/* Previous Scores Table */}
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
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Displaying Selected Score Details */}
        {selectedScore && (
          <div className="rzr-hm-raci-bus-scoreboard modal-overlay">
            <div className="modal-content">
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
              <table className="rzr-hm-raci-bus-scoreboard-table">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Score (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedScore.metrics.map((metric, index) => (
                    <tr key={index}>
                      <td>{metric.category}</td>
                      <td>{metric.percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Render the Performance Bar Chart for the Selected Score */}
              <div className="rzr-hm-raci-bus-chart-container">
                <h2 className="rzr-hm-raci-bus-chart-title">
                  Metrics Score Graph
                </h2>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={selectedScore.metrics}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 100 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis
                      type="category"
                      dataKey="category"
                      width={200}
                      tick={{ fontSize: 14 }}
                    />
                    <Tooltip />
                    <Legend className="hm-raci-score" />
                    <Bar dataKey="percentage" fill="#8cc01d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
      <style jsx="true">{`
        /* Sticky Sidebar */
        .sticky-sidebar {
          position: -webkit-sticky; /* For Safari */
          position: sticky;
          top: 20px; /* Adjust as needed */
        }

        /* Modal Styles (Ensure these styles are defined) */
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

        /* Ensure proper spacing and responsiveness */
        @media (max-width: 768px) {
          .row {
            flex-direction: column;
          }

          .sticky-sidebar {
            position: static;
            margin-top: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
