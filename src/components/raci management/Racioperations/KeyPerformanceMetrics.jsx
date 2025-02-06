

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSave } from 'react-icons/fa';

export default function KeyPerformanceMetrics() {
  // Example data matching your screenshot:
  const scoreData = [
    {
      category: 'INDUSTRY',
      overallScore: '80%',
      overallScoreColor: 'bg-green-100 text-green-600',
      scorePercent: '60.00%',
      scorePercentColor: 'text-green-600',
    },
    {
      category: 'BUSINESS PERFORMANCE',
      overallScore: '100%',
      overallScoreColor: 'bg-green-100 text-green-600',
      scorePercent: '60.00%',
      scorePercentColor: 'text-green-600',
    },
    {
      category: 'BUSINESS GROWTH',
      overallScore: '10%',
      overallScoreColor: 'bg-red-100 text-red-600',
      scorePercent: '60.00%',
      scorePercentColor: 'text-green-600',
    },
    {
      category: 'BUSINESS RISK',
      overallScore: '40%',
      overallScoreColor: 'bg-orange-100 text-orange-600',
      scorePercent: '60.00%',
      scorePercentColor: 'text-green-600',
    },
    {
      category: 'COMPETITION',
      overallScore: '80%',
      overallScoreColor: 'bg-green-100 text-green-600',
      scorePercent: '60.00%',
      scorePercentColor: 'text-green-600',
    },
    {
      category: 'MANAGEMENT INFORMATION SYSTEMS',
      overallScore: '80%',
      overallScoreColor: 'bg-green-100 text-green-600',
      scorePercent: '60.00%',
      scorePercentColor: 'text-green-600',
    },
    {
      category: 'OWNERS',
      overallScore: '80%',
      overallScoreColor: 'bg-green-100 text-green-600',
      scorePercent: '60.00%',
      scorePercentColor: 'text-green-600',
    },
    {
      category: 'CUSTOMERS AND MARKET DEMAND',
      overallScore: '80%',
      overallScoreColor: 'bg-green-100 text-green-600',
      scorePercent: '60.00%',
      scorePercentColor: 'text-green-600',
    },
    {
      category: 'STAFF',
      overallScore: '80%',
      overallScoreColor: 'bg-green-100 text-green-600',
      scorePercent: '60.00%',
      scorePercentColor: 'text-green-600',
    },
    {
      category: 'SUCCESSION AND ESTATE PLANNING',
      overallScore: '80%',
      overallScoreColor: 'bg-green-100 text-green-600',
      scorePercent: '60.00%',
      scorePercentColor: 'text-green-600',
    },
  ];



  return (
    <div className=" mx-auto w-full p-6 dark:bg-gray-900 dark:text-gray-100 border rounded-2xl mt-2 ">
      {/* Hot Toast container */}
 

      {/* Header row with Title + Button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Key Performance Metrics</h1>
        <button
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600
                     text-white px-4 py-2 rounded shadow"
        >
          <FaSave />
          <span>Save Score</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto hide-scrollbar hide-horizontal-scrollbar">
        <table className="w-full border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="py-2 px-4 border-r border-b border-gray-300 dark:border-gray-700 w-1/2">
                Category
              </th>
              <th className="py-2 px-4 border-r border-b border-gray-300 dark:border-gray-700">
                Overall Score
              </th>
              <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
                Score (%)
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {scoreData.map((item, idx) => (
                <motion.tr
                  key={item.category}
                  // A little fade/slide in animation for each row
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, delay: idx * 0.03 }}
                  className="border-b border-gray-300 dark:border-gray-700"
                >
                  <td className="py-2 px-4 border-r border-gray-300 dark:border-gray-700">
                    {item.category}
                  </td>
                  <td className="py-2 px-4 border-r border-gray-300 dark:border-gray-700">
                    {/* Pill with color-coded background */}
                    <span
                      className={`inline-block px-2 py-1 rounded text-sm font-medium ${item.overallScoreColor}`}
                    >
                      {item.overallScore}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    {/* Colored text for the Score (%) */}
                    <span className={item.scorePercentColor}>{item.scorePercent}</span>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
