import React from "react";
import { Doughnut } from "react-chartjs-2";
import 'chart.js/auto'; // This ensures Chart.js registers necessary chart components
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { FiChevronDown } from "react-icons/fi";

const PanCardChart = () => {
  // Dummy chart data
  const data = {
    labels: [ "Pending", "Complete"],
    datasets: [
      {
        label: "PAN Card Status",
        data: [ 50, 40],
        // Colors match the custom legend bullets:
        backgroundColor: ["#A3E635", "#F472B6", "#8B5CF6"],
        hoverBackgroundColor: ["#84CC16", "#EC4899", "#7C3AED"],
        borderWidth: 0,
      },
    ],
  };

  // Chart.js options
  const options = {
    cutout: "70%", // Creates a donut-hole effect
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        bodyColor: "#fff",
        backgroundColor: "#111827",
        titleColor: "#F9FAFB",
        displayColors: false,
      },
    },
  };

  const handleShowToast = () => {
    toast.success("This is a sample toast!");
  };

  return (
    <motion.div
      // Framer Motion props for entry animation
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className=" w-full max-w-sm p-4 rounded-lg shadow-sm
                 bg-white dark:bg-slate-800
                 text-gray-900 dark:text-gray-100 "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Valid PAN Card</h2>
        
        {/* Example dropdown for “Monthly” */}
        <div className="relative">
          
          {/* If needed, a real dropdown can go here */}
        </div>
      </div>

      {/* Donut Chart */}
      <div className="flex items-center justify-center">
        <div className="w-40 h-40">
          <Doughnut data={data} options={options} />
        </div>
      </div>

      {/* Custom legend with color badges */}
      <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
        {/* Invalid */}
       

        {/* Pending */}
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-1">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: "#F472B6" }}
            />
            <span className="text-gray-500 dark:text-gray-400">Pending:</span>
          </div>
          <span className="font-bold mt-1">50%</span>
        </div>

        {/* Complete */}
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-1">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: "#8B5CF6" }}
            />
            <span className="text-gray-500 dark:text-gray-400">Complete:</span>
          </div>
          <span className="font-bold mt-1">40%</span>
        </div>
      </div>

  
    </motion.div>
  );
};

export default PanCardChart;
