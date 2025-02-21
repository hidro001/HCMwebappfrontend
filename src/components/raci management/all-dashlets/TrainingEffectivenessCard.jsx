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

const TrainingEffectivenessCard = () => {
  // Example data with 9 points
  const data = {
    labels: [
      'Low (0-40)',
      '',
      '',
      'Medium (40-70)',
      '',
      '',
      'High (70-100)',
      '',
      '',
    ],
    datasets: [
      {
        label: 'Avg. Performance Score',
        data: [8000, 12000, 10000, 50000, 30000, 25000, 70000, 40000, 60000],
        borderColor: '#3B82F6', // Tailwind blue-500
        backgroundColor: '#3B82F6',
        tension: 0.4,           // curvy lines
        pointRadius: 5,
        pointHoverRadius: 6,
        fill: false,
        segment: {
          // Make last segment dotted
          borderDash: (ctx) =>
            ctx.p1DataIndex === data.labels.length - 1 ? [6, 6] : undefined,
        },
      },
      {
        label: 'Avg. Training Programs',
        data: [10000, 8000, 15000, 25000, 20000, 10000, 40000, 15000, 30000],
        borderColor: '#F97316', // Tailwind orange-500
        backgroundColor: '#F97316',
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 6,
        fill: false,
        segment: {
          borderDash: (ctx) =>
            ctx.p1DataIndex === data.labels.length - 1 ? [6, 6] : undefined,
        },
      },
    ],
  };

  // Chart configuration
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 100000,
        title: {
          display: true,
          text: 'Value',
        },
        ticks: {
          callback: function (value) {
            // Show $10k, $25k, $50k, etc.
            if (value >= 1000) {
              return `$${(value / 1000).toFixed(0)}k`;
            }
            return `$${value}`;
          },
        },
      },
      x: {
        title: {
          display: true,
          text: 'Training Assessments And score range',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: '#111827', // Dark BG
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        borderWidth: 0,
        callbacks: {
          // E.g. "Jun 2024 — Example: $3k"
          label: (context) => {
            // You can customize your tooltip text here
            return `${context.dataset.label} — $${(context.parsed.y / 1000).toFixed(1)}k`;
          },
        },
      },
      title: { display: false },
    },
  };

  return (
    <motion.div
      className="
        w-full
        max-w-3xl
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
      {/* Card header */}
      <h2 className="text-lg font-semibold mb-4">
        Training Effectiveness and Performance Outcomes
      </h2>

      {/* Chart container */}
      <div className="w-full h-64">
        <Line data={data} options={options} />
      </div>
    </motion.div>
  );
};

export default TrainingEffectivenessCard;
