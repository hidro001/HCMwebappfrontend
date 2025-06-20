
import React from "react";
import BaseModal from "../../common/BaseModal";

// 1) Import Chart.js and react-chartjs-2:
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// 2) Register Chart.js components:
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Legend);

const ScoreDetailsModal = ({ selectedScore, onClose }) => {
  if (!selectedScore) return null;

  // Convert key success factors into data for Chart.js
  // ksfData = [{ name: 'factorName', score: numericValue }, ... ]
  const ksfData = Object.keys(selectedScore.keySuccessFactors).map((factor) => ({
    name: factor,
    // Round to nearest integer on a 0-100 scale:
    score: Math.round(selectedScore.keySuccessFactors[factor] * 10),
  }));

  // Build Chart.js data
  const chartJsData = {
    labels: ksfData.map((item) => item.name),
    datasets: [
      {
        label: "Score",
        data: ksfData.map((item) => item.score),
        backgroundColor: "#8cc01d",
      },
    ],
  };

  // Chart.js options
  const chartJsOptions = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 100, // same domain as Recharts: [0, 100]
        ticks: {
          // Force integer labels on the y-axis
          callback: function (value) {
            return value.toFixed(0);
          },
        },
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        // If you want to ensure tooltips also show integers only:
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.parsed.y; // This is already an integer
            return `${label}: ${value}`;
          },
        },
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <BaseModal isOpen={true} onClose={onClose}>
      <div
        className="bg-white dark:bg-gray-800 text-black dark:text-white
                   p-4 rounded shadow max-w-xl w-full relative max-h-[80%]
                   overflow-y-auto [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600"
      >
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 mt-4 px-4 py-2 bg-red-500 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>

        <h4 className="text-xl font-bold mb-2">Score Details</h4>

        <p>
          <strong>Date: </strong>
          {new Date(selectedScore.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Overall Score: </strong>
          {(selectedScore.overallScore * 10).toFixed(2)}%
        </p>

        {/* Metrics Table */}
        <h5 className="text-lg mt-3 mb-2 font-semibold">Metrics</h5>
        <table className="w-full border-collapse text-left mb-4">
          <thead>
            <tr className="border-b">
              <th className="p-2">Metric</th>
              <th className="p-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {selectedScore.metrics.map((metric, index) => (
              <tr key={index} className="border-b last:border-none">
                <td className="p-2">{metric.metric}</td>
                <td className="p-2">{metric.score}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Key Success Factors */}
        <h5 className="text-lg mt-3 mb-2 font-semibold">Key Success Factors</h5>
        <ul className="list-disc list-inside mb-4">
          {Object.keys(selectedScore.keySuccessFactors).map((factor, idx) => (
            <li key={idx}>
              <strong>{factor}:</strong>{" "}
              {selectedScore.keySuccessFactors[factor].toFixed(2)}
            </li>
          ))}
        </ul>

        {/* Chart.js Bar Chart for KSF */}
        <div className="p-2 border rounded dark:border-gray-700 dark:bg-gray-900">
          <h2 className="text-lg font-semibold mb-2">
            Key Success Factors Graph
          </h2>
          {/* Provide a fixed height for the chart container */}
          <div style={{ width: "100%", height: 400 }}>
            <Bar data={chartJsData} options={chartJsOptions} />
          </div>
        </div>

        {/* Optional close button at bottom */}
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </BaseModal>
  );
};

export default ScoreDetailsModal;
