import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { motion } from "framer-motion";
import { FaEllipsisH } from "react-icons/fa";
import { toast } from "react-hot-toast";

ChartJS.register(ArcElement, Tooltip, Legend);

const TrainingNeedsCard = () => {
  // Dummy data for the Donut chart
  const data = {
    labels: ["Up-to-date", "Needs Refresh", "Needs Certification"],
    datasets: [
      {
        data: [40, 35, 25],
        backgroundColor: ["#F59E0B", "#10B981", "#1E3A8A"], // orange, green, dark blue
        hoverBackgroundColor: ["#FBBF24", "#34D399", "#1E40AF"],
        borderWidth: 0,
      },
    ],
  };

  // Optional chart configuration
  const options = {
    cutout: "70%", // controls donut thickness
    plugins: {
      legend: {
        display: false, // We'll display our own legend below
      },
      tooltip: {
        backgroundColor: "#1F2937", // dark gray
        titleColor: "#F9FAFB",       // light text
        bodyColor: "#F9FAFB",
      },
    },
    maintainAspectRatio: false,
  };

  // Sample toast trigger
 
  return (
    <motion.div
      // A simple fade-in animation using Framer Motion
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-sm rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md text-gray-800 dark:text-gray-100"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-semibold">Training Needs Assessment</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">This Month</p>
        </div>
        <button
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <FaEllipsisH size={18} />
        </button>
      </div>

      {/* Chart Container */}
      <div className="relative h-48 w-full mb-4">
        <Doughnut data={data} options={options} />
        {/* You can place absolute elements over the chart if desired */}
      </div>

      {/* Legend / Breakdown */}
      <div className="flex justify-around text-sm mt-4">
        <div className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>
          <span>Up-to-date</span>
          <span className="font-bold ml-1">40%</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
          <span>Needs Refresh</span>
          <span className="font-bold ml-1">35%</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-blue-900"></span>
          <span>Needs Certification</span>
          <span className="font-bold ml-1">25%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TrainingNeedsCard;
