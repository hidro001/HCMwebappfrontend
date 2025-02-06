import React, { useState, useEffect } from "react";
import { calculatePerformance, getColorFromValue } from "../../../utils/helpers";
import KeyPerformanceMetrics from "./KeyPerformanceMetrics";

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
      <h1 className="text-xl font-semibold mb-4">Customers & Market Demand Assessment</h1>
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
            category: "CUSTOMERS AND MARKET DEMAND",
            percentage: +averagePercentage,
          },
        ]}
      />
    </div>
  );
};

export default CustomersMarketDemand;
