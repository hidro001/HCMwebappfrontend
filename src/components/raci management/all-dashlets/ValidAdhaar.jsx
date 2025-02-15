import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ValidAdhaar() {
  // Same structure as PAN; just different colors or data if desired
  const dataValues = [60, 50, 40]; 
  const labels = ['Invalid', 'Pending', 'Complete'];

  const chartData = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: ['#F59E0B', '#FB7185', '#10B981'], // amber, pink, green
        hoverOffset: 4,
      },
    ],
  };

  const total = dataValues.reduce((acc, val) => acc + val, 0);

  const chartOptions = {
    plugins: {
      legend: { display: false },
    },
    cutout: '70%',
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="flex flex-col w-full rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          Valid Aadhaar Card
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
        <div className="absolute flex flex-col items-center">
          <span className="text-base font-bold text-gray-800 dark:text-gray-100">
            Aadhaar Card
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 space-y-1 text-sm">
        {labels.map((label, i) => {
          const value = dataValues[i];
          const pct = ((value / total) * 100).toFixed(0);
          return (
            <div key={i} className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: chartData.datasets[0].backgroundColor[i] }}
              />
              <span className="text-gray-600 dark:text-gray-200">
                {label}: {value}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
