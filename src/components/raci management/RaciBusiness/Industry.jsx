import React, { useState, useEffect } from "react";
import { calculatePerformance, getColorFromValue } from "../../../utils/helpers";
import KeyPerformanceMetrics from "./KeyPerformanceMetrics";

const Industry = ({ setScore }) => {
  const questions = [
    "Business operates in a well-established, stable industry",
    "The industry / market is growing",
    "Business likely to be negatively influenced by industry restructuring",
    "Business likely to be influenced by negative global trends",
    "Future industry trends will positively affect the business",
  ];

  // Map numeric values to a 1-5 scale, then *20 = 100% scale
  const mapping = {
    "1": 5, // Definitely
    "2": 4, // Probably
    "3": 3, // No - Will change slightly
    "4": 2, // No - Will change moderately
    "5": 1, // No - Will change significantly
  };

  const [values, setValuesState] = useState(Array(questions.length).fill("0"));

  const handleDropdownChange = (index, event) => {
    const newValues = [...values];
    newValues[index] = event.target.value;
    setValuesState(newValues);
  };

  const { averagePercentage } = calculatePerformance(values, mapping);

  useEffect(() => {
    setScore(averagePercentage);
  }, [averagePercentage, setScore]);

  return (
    <div className="p-4 border rounded shadow my-4 dark:bg-gray-800 dark:text-white dark:border-gray-700">
      <h1 className="text-xl font-semibold mb-4">Industry Performance Assessment</h1>
      <table className="w-full border-collapse text-left">
        <thead className="border-b">
          <tr>
            <th className="p-2">Question</th>
            <th className="p-2">Response</th>
            <th className="p-2">Performance Review</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => {
            const value = values[index];
            return (
              <tr key={index} className="border-b last:border-none">
                <td className="p-2">{question}</td>
                <td className="p-2">
                  <select
                    value={value}
                    onChange={(e) => handleDropdownChange(index, e)}
                    className="border px-2 py-1 rounded dark:bg-gray-700"
                  >
                    <option value="0">No response</option>
                    <option value="1">Definitely</option>
                    <option value="2">Probably</option>
                    <option value="3">No - Will change slightly</option>
                    <option value="4">No - Will change moderately</option>
                    <option value="5">No - Will change significantly</option>
                  </select>
                </td>
                <td className="p-2">
                  <div
                    className={`inline-block px-2 py-1 text-sm rounded dark:bg-slate-600 ${
                      getColorFromValue(value)
                    }`}
                  >
                    {value === "0" ? "No response" : value}
                  </div>
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
            percentage: +averagePercentage,
          },
        ]}
      />
    </div>
  );
};

export default Industry;
