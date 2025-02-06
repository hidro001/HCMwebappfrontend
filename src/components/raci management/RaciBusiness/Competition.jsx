import React, { useState, useEffect } from "react";
import { calculatePerformance, getColorFromValue } from "../../../utils/helpers";
import KeyPerformanceMetrics from "./KeyPerformanceMetrics";

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
      <h1 className="text-xl font-semibold mb-4">Competition Assessment</h1>
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
            category: "COMPETITION",
            percentage: +averagePercentage,
          },
        ]}
      />
    </div>
  );
};

export default Competition;
