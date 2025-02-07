import React, { useState, useEffect } from "react";
import { calculatePerformance, getColorFromValue } from "../../../utils/helpers";
import KeyPerformanceMetrics from "./KeyPerformanceMetrics";

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
      <h1 className="text-xl font-semibold mb-4">Management Information Systems (MIS) Assessment</h1>
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
            category: "MANAGEMENT INFORMATION SYSTEMS",
            percentage: +averagePercentage,
          },
        ]}
      />
    </div>
  );
};

export default MIS;
