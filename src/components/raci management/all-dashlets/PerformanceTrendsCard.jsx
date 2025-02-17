import React from 'react';
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
import { motion } from 'framer-motion';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PerformanceTrendsCard = () => {
  // Dummy data for the line chart
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Example: $3k', // Just a label for the tooltip legend
        data: [5, 15, 25, 18, 9, 12, 20],
        borderColor: '#3B82F6',      // Tailwind blue-500
        backgroundColor: '#3B82F6',
        tension: 0.3,                // curve the line
        pointRadius: 5,
        pointHoverRadius: 6,
        fill: false,
        // Optional: dotted forecast for the last segment
        segment: {
          borderDash: (ctx) => {
            return ctx.p1DataIndex === data.labels.length - 1 ? [6, 6] : undefined;
          },
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        title: {
          display: true,
          text: 'Average Performance Score',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Appraisal Cycle',
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide default legend since there's only one dataset
      },
      tooltip: {
        backgroundColor: '#111827', // dark background
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        borderWidth: 0,
        callbacks: {
          // Custom tooltip text, e.g., "Jun 2024 – Example: $3k"
          label: (context) => {
            return `${context.label} 2024 – ${context.dataset.label}`;
          },
        },
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <motion.div
      className="
        w-full
       
        bg-white
        dark:bg-slate-800
        rounded-lg
        p-4
        shadow
        text-gray-800
        dark:text-gray-200
        
      "
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Card Header */}
      <h2 className="text-lg font-semibold mb-2">
        Performance Trends Over Time
      </h2>

      {/* Chart Container */}
      <div className="w-full  ">
        <Line data={data} options={options} />
      </div>
    </motion.div>
  );
};

export default PerformanceTrendsCard;
