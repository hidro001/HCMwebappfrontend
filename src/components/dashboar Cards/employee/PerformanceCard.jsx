import React from 'react';
import { motion } from 'framer-motion';
import { FiDownloadCloud } from 'react-icons/fi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register the components we need in ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const PerformanceCard = () => {
  // Example chart data
  const data = {
    labels: ['09. Mo.', '10. Tue.', '11. Wed'],
    datasets: [
      {
        label: 'Performance',
        data: [3000, 10000, 16000], // Adjust values as needed
        borderColor: '#3B82F6',     // Tailwind's "blue-500"
        backgroundColor: 'rgba(59,130,246,0.2)', // Slightly transparent fill
        pointBackgroundColor: '#3B82F6',
        pointRadius: 5,
        fill: true,
        tension: 0.4, // Bezier curve
      },
    ],
  };

  // Example chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#6B7280', // text-gray-500
        },
        grid: {
          color: '#E5E7EB', // gray-200
        },
      },
      x: {
        ticks: {
          color: '#6B7280', // text-gray-500
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend if you only have one dataset
      },
      tooltip: {
        // Custom tooltip styling if desired
      },
    },
  };

  return (
    <motion.div
      // Framer Motion props for a simple fade-in and slide-up
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl bg-white dark:bg-gray-800 shadow p-4 w-full max-w-md"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Performance Statistics
        </h2>
        <button
          type="button"
          className="text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200"
        >
          <FiDownloadCloud className="w-5 h-5" />
        </button>
      </div>

      {/* Chart Container */}
      <div className="h-48"> 
        <Line data={data} options={options} />
      </div>
    </motion.div>
  );
};

export default PerformanceCard;
