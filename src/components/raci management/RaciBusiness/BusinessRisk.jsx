import React, { useState, useEffect } from "react";
import { calculatePerformance, getColorFromValue } from "../../../utils/helpers";
import KeyPerformanceMetrics from "./KeyPerformanceMetrics";

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

  const handleDropdownChange = (index, e) => {
    const newValues = [...values];
    newValues[index] = e.target.value;
    setValues(newValues);
  };

  const { averagePercentage } = calculatePerformance(values, mapping);

  useEffect(() => {
    setScore(averagePercentage);
  }, [averagePercentage, setScore]);

  return (
    <div className="p-4 border rounded shadow my-4 dark:bg-gray-800 dark:text-white dark:border-gray-700">
      <h1 className="text-xl font-semibold mb-4">Business Risk Assessment</h1>
      <table className="w-full border-collapse text-left">
        <thead className="border-b">
          <tr>
            <th className="p-2">Question</th>
            <th className="p-2">Response</th>
            <th className="p-2">Performance Review</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index} className="border-b last:border-none">
              <td className="p-2">{question}</td>
              <td className="p-2">
                <select
                  value={values[index]}
                  onChange={(e) => handleDropdownChange(index, e)}
                  className="border px-2 py-1 rounded dark:bg-gray-700"
                >
                  <option value="">Select an option</option>
                  {options[index].map((option, optIndex) => (
                    <option key={optIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
              <td className="p-2">
                <div
                  className={`inline-block px-2 py-1 text-sm rounded ${
                    getColorFromValue(values[index])
                  }`}
                >
                  {values[index] === "" ? "No response" : values[index]}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <KeyPerformanceMetrics
        performanceData={[
          {
            category: "BUSINESS RISK",
            percentage: +averagePercentage,
          },
        ]}
      />
    </div>
  );
};

export default BusinessRisk;
