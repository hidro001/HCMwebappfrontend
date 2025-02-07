import React, { useState, useEffect } from "react";
import { calculatePerformance, getColorFromValue } from "../../../utils/helpers";
import KeyPerformanceMetrics from "./KeyPerformanceMetrics";

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

  const handleDropdownChange = (index, e) => {
    const newVals = [...values];
    newVals[index] = e.target.value;
    setValues(newVals);
  };

  const { averagePercentage } = calculatePerformance(values, mapping);

  useEffect(() => {
    setScore(averagePercentage);
  }, [averagePercentage, setScore]);

  return (
    <div className="p-4 border rounded shadow my-4 dark:bg-gray-800 dark:text-white dark:border-gray-700">
      <h1 className="text-xl font-semibold mb-4">Staff Assessment</h1>
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
                  {options[index].map((option, i) => (
                    <option key={i} value={option}>
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
            category: "STAFF",
            percentage: +averagePercentage,
          },
        ]}
      />
    </div>
  );
};

export default Staff;
