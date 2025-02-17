import React from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FiTrendingUp } from 'react-icons/fi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PerformanceCard = () => {
  // Dummy line-chart data
  const data = {
    labels: ['IT', 'Sales', 'Ops', 'Marketing', 'Designing', 'Finance'],
    datasets: [
      {
        label: 'Performance Score',
        data: [22000, 35000, 2500, 30000, 40000, 28000],
        fill: true,
        borderColor: '#3B82F6', // Tailwind's blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.15)', // semi-transparent
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#fff',
        tension: 0.4, // makes the line smoother
      },
    ],
  };

  // Chart display options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#a1a1aa', // text-gray-400 (light mode), override with dark
        },
      },
      x: {
        ticks: {
          color: '#a1a1aa',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        intersect: false,
        mode: 'index',
        // Example custom color or styling here
      },
    },
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md w-full mx-auto "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header / Title */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Tenure Analysis (Performance Scores by Dept.)
        </h2>
        <FiTrendingUp className="text-gray-600 dark:text-gray-300" size={20} />
      </div>

      {/* Chart Container */}
      <div className="relative h-60">
        <Line data={data} options={options} />
      </div>
    </motion.div>
  );
};

export default PerformanceCard;
