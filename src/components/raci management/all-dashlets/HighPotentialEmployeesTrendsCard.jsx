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

const HighPotentialEmployeesTrendsCard = () => {
  // Example line chart data
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Example: $3k', // Label for tooltip/legend
        data: [5, 15, 25, 18, 9, 12, 20], // dummy numbers
        borderColor: '#3B82F6',  // Tailwind Blue-500
        backgroundColor: '#3B82F6',
        fill: false,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 6,
        // Optional: for a dotted forecast from the second-to-last to last point
        segment: {
          borderDash: (ctx) => {
            // If the current segment goes to the last point, make it dotted
            return ctx.p1DataIndex === 6 ? [6, 6] : undefined;
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
          text: 'Number of High-Potential Employees',
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
      legend: { display: false }, // Hides default legend since we have just one dataset
      tooltip: {
        backgroundColor: '#111827', // dark BG
        titleColor: '#F9FAFB',      // light text
        bodyColor: '#F9FAFB',
        borderWidth: 0,
        callbacks: {
          // Optional: customize the tooltip label
          label: function (context) {
            // Ex: "Jun 2024 - Example: $3k"
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
        max-w-2xl
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
        Trends In High-Potential Employees Over Appraisal Cycle
      </h2>

      {/* Chart Container */}
      <div className="w-full h-64">
        <Line data={data} options={options} />
      </div>
    </motion.div>
  );
};

export default HighPotentialEmployeesTrendsCard;
