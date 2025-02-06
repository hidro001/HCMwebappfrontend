

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const previousScores = [
  { sno: '01', date: '02-12-2024', overallScore: '60.00%' },
  { sno: '02', date: '02-12-2024', overallScore: '60.00%' },
  { sno: '03', date: '02-12-2024', overallScore: '60.00%' },
  { sno: '04', date: '02-12-2024', overallScore: '60.00%' },
  { sno: '05', date: '02-12-2024', overallScore: '60.00%' },
];

export default function PreviousScores() {
 

  return (
    <div className="max-w-xl mx-auto p-4 dark:bg-gray-900 dark:text-gray-100">

      <h1 className="text-lg font-semibold mb-4">Previous Scores</h1>

      <div className="overflow-x-auto">
        {/* Key change: border-collapse for continuous borders */}
        <table className="w-full border border-gray-300 dark:border-gray-700 border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="py-2 px-4 border border-gray-300 dark:border-gray-700 text-center">
                SNO.
              </th>
              <th className="py-2 px-4 border border-gray-300 dark:border-gray-700 text-center">
                Date
              </th>
              <th className="py-2 px-4 border border-gray-300 dark:border-gray-700 text-center">
                Overall Score
              </th>
              <th className="py-2 px-4 border border-gray-300 dark:border-gray-700 text-center">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {previousScores.map((row, index) => (
                <motion.tr
                  key={row.sno}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  {/* Each cell also has a border to create vertical lines */}
                  <td className="py-2 px-4 border border-gray-300 dark:border-gray-700 text-center">
                    {row.sno}
                  </td>
                  <td className="py-2 px-4 border border-gray-300 dark:border-gray-700 text-center">
                    {row.date}
                  </td>
                  <td className="py-2 px-4 border border-gray-300 dark:border-gray-700 text-center">
                    {row.overallScore}
                  </td>
                  <td className="py-2 px-4 border border-gray-300 dark:border-gray-700 text-center">
                    <button
                      className="bg-orange-100 text-orange-600 px-3 py-1 
                                 rounded hover:bg-orange-200 transition duration-200"
                    >
                      View
                    </button>
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

