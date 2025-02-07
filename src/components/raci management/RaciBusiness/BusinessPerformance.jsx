import React, { useState, useEffect } from "react";
import { calculatePerformance, getColorFromValue } from "../../../utils/helpers";
import KeyPerformanceMetrics from "./KeyPerformanceMetrics";

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
      <h1 className="text-xl font-semibold mb-4">Business Performance Assessment</h1>
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
                  className={`inline-block px-2 py-1 text-sm rounded dark:bg-slate-600 ${
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
            category: "BUSINESS PERFORMANCE",
            percentage: +averagePercentage,
          },
        ]}
      />
    </div>
  );
};

export default BusinessPerformance;
