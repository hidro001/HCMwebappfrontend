import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ValidPanExact() {
  // 1) CHART DATA
  // The data array = [40, 50, 60] for left→middle→right arcs.
  // The backgroundColor array matches purple→pink→green.
  const chartData = {
    labels: ['Complete', 'Pending', 'Invalid'],
    datasets: [
      {
        data: [40, 50, 60],
        backgroundColor: ['#9B51E0', '#FF00A8', '#C0DFA1'], // purple, pink, green
        hoverOffset: 4,
      },
    ],
  };

  // 2) CHART OPTIONS (for a bottom half-donut)
  const chartOptions = {
    plugins: {
      legend: { display: false }, // Hide default legend; we’ll make our own
    },
    cutout: '70%',       // Donut hole thickness
    rotation: 180,       // Start at 180° (left side)
    circumference: 180,  // Only draw 180° (half circle)
    responsive: true,
    maintainAspectRatio: false,
  };

  // 3) LEGEND DATA
  // The legend order (top to bottom) in the UI:
  //   Invalid: 60% (green)
  //   Pending: 50% (pink)
  //   Complete: 40% (purple)
  const legendItems = [
    { label: 'Invalid', value: 60, color: '#C0DFA1' },  // green
    { label: 'Pending', value: 50, color: '#FF00A8' },  // pink
    { label: 'Complete', value: 40, color: '#9B51E0' }, // purple
  ];

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
      {/* Top row: Title + "Monthly" dropdown */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          Valid PAN Card
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

      {/* Bottom row: Legend on the left, half-donut on the right */}
      <div className="flex">
        {/* Custom Legend */}
        <div className="flex flex-col justify-center text-sm space-y-2 mr-4">
          {legendItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-700 dark:text-gray-200">
                {item.label}: {item.value}%
              </span>
            </div>
          ))}
        </div>

        {/* Half-Donut Chart */}
        <div className="relative flex-1 h-24">
          <Doughnut data={chartData} options={chartOptions} />

          {/* Label below the arc */}
          <div className="absolute inset-x-0 bottom-0 text-center text-sm text-gray-700 dark:text-gray-200">
            PAN Card
          </div>
        </div>
      </div>
    </div>
  );
}
