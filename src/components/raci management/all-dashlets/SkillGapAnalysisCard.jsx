import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
// Auto-register Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FiBarChart2 } from "react-icons/fi";

// Register Chart.js plugins 
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Dummy data for the chart
const chartData = {
  labels: ["Diploma", "Bachelor", "Master", "PhD"],
  datasets: [
    {
      label: "Required skill proficiency",
      data: [20, 15, 18, 30],
      backgroundColor: "#3B82F6", // Tailwind's 'blue-500'
      borderRadius: 4,
      barThickness: 30,
    },
    {
      label: "Current skill proficiency",
      data: [12, 10, 14, 22],
      backgroundColor: "#F59E0B", // Tailwind's 'amber-500'
      borderRadius: 4,
      barThickness: 30,
    },
  ],
};

// Chart.js options
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      labels: {
        color: "#4B5563", // tailwind gray-700 for light mode
      },
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#4B5563",
      },
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        color: "#4B5563",
      },
      grid: {
        color: "#E5E7EB",
      },
    },
  },
};

function SkillGapAnalysisCard() {
 

  return (
    <motion.div
      // Framer Motion entrance animation
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      // Card container styles, supporting dark mode
      className="max-w-lg mx-auto p-4 rounded-lg shadow-sm 
                 bg-white text-gray-900 
                 dark:bg-gray-800 dark:text-gray-100"
    >
      {/* Card Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">
          Skill Gap Analysis
        </h2>

        {/* Example button, can be replaced with your own UI */}
        <button
          className="inline-flex items-center gap-2 px-3 py-2 
                     text-sm font-medium rounded 
                     bg-blue-500 text-white 
                     hover:bg-blue-600
                     dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <FiBarChart2 className="text-lg" />
          <span>Yearly</span>
        </button>
      </div>

      {/* The chart */}
      <div className="overflow-hidden">
        <Bar
          data={chartData}
          options={chartOptions}
        />
      </div>
    </motion.div>
  );
}

export default SkillGapAnalysisCard;
