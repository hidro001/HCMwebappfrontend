import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ValidPassport() {
  // Two segments: Expired, Active
  // For example, 20k vs 25k
  const dataValues = [20000, 25000];
  const labels = ['Expired', 'Active'];

  const chartData = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: ['#F97316', '#3B82F6'], // orange, blue
        hoverOffset: 4,
      },
    ],
  };

  // Chart total
  const total = dataValues.reduce((acc, val) => acc + val, 0); // 45000

  const chartOptions = {
    plugins: {
      legend: { display: false },
    },
    cutout: '70%',
    responsive: true,
    maintainAspectRatio: false,
  };

  // Example "growth" overlays in the screenshot: +25%, +30%
  // We'll absolutely position them near each donut segment.
  // Adjust 'top'/'right' as needed.
  return (
    <div className="flex flex-col w-full rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          Passport validity
        </h3>
        <button className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
          Monthly
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.58l3.71-3.35a.75.75 0 111.04 1.08l-4.24 3.82a.75.75 0 01-1.04 0L5.21 8.29a.75.75 0 01.02-1.08z" />
          </svg>
        </button>
      </div>

      {/* Donut chart */}
      <div className="relative h-36 flex justify-center items-center">
        <Doughnut data={chartData} options={chartOptions} />

        {/* Overlay text for each segment's growth or difference */}
        <div className="absolute flex items-center justify-center">
          {/* Example: Position near orange slice */}
          <div className="absolute text-white bg-orange-500 rounded-full text-xs px-2 py-1"
               style={{ top: '15%', left: '60%' }}>
            +25%
          </div>
          {/* Position near blue slice */}
          <div className="absolute text-white bg-blue-500 rounded-full text-xs px-2 py-1"
               style={{ bottom: '15%', right: '60%' }}>
            +30%
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 space-y-1 text-sm">
        {labels.map((label, i) => {
          const value = dataValues[i];
          const pct = ((value / total) * 100).toFixed(1);
          return (
            <div key={i} className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: chartData.datasets[0].backgroundColor[i] }}
              />
              <span className="text-gray-600 dark:text-gray-200">
                {label}: {value.toLocaleString()}
              </span>
              <span className="text-gray-400">
                ({pct}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
