

import React from "react";
import PerformanceBarChart from "./PerformanceBarChart";
import BaseModal from "../../common/BaseModal"; // Adjust your path to where BaseModal is

const ScoreDetailModal = ({ selectedScore, onClose }) => {
  if (!selectedScore) return null;

  return (
    <BaseModal isOpen={true} onClose={onClose}>
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white
                   p-4 rounded shadow max-w-xl w-full relative max-h-[80%]
                   overflow-y-auto [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600">
        {/* Close Button */}
        <button
          className="absolute top-1 right-8 mt-4 px-10 py-2 bg-red-500 text-white rounded "
          onClick={onClose}
        >
       Close
        </button>

        {/* Scrollable content container */}
        <div className=" pr-2 [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600"> 
          {/* Header */}
          <h4 className="text-xl font-bold mb-2 text-black dark:text-white">
            Score Details
          </h4>

          {/* Date */}
          <p className="dark:text-white">
            <strong>Date:</strong>{" "}
            {new Date(selectedScore.date).toLocaleDateString()}
          </p>

          {/* Overall Score */}
          <p className="dark:text-white">
            <strong>Overall Score:</strong>{" "}
            {(+selectedScore.overallScore).toFixed(2)}%
          </p>

          {/* Metrics Table */}
          <h5 className="text-lg mt-3 mb-2 font-semibold dark:text-white">
            Metrics
          </h5>
          <table className="w-full border-collapse text-left mb-4">
            <thead className="border-b">
              <tr>
                <th className="p-2">Metric</th>
                <th className="p-2">Score (%)</th>
              </tr>
            </thead>
            <tbody>
              {selectedScore.metrics.map((metric, idx) => (
                <tr key={idx} className="border-b last:border-none">
                  <td className="p-2">{metric.category}</td>
                  <td className="p-2">{metric.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Chart for Selected Score */}
          <div className="h-96">
            <PerformanceBarChart performanceData={selectedScore.metrics} />
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default ScoreDetailModal;
