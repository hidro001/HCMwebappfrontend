// import React from "react";
// import { Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { motion } from "framer-motion";
// import { FaEllipsisH } from "react-icons/fa";
// import { toast } from "react-hot-toast";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const TrainingNeedsCard = () => {
//   // Dummy data for the Donut chart
//   const data = {
//     labels: ["Up-to-date", "Needs Refresh", "Needs Certification"],
//     datasets: [
//       {
//         data: [40, 35, 25],
//         backgroundColor: ["#F59E0B", "#10B981", "#1E3A8A"], // orange, green, dark blue
//         hoverBackgroundColor: ["#FBBF24", "#34D399", "#1E40AF"],
//         borderWidth: 0,
//       },
//     ],
//   };

//   // Optional chart configuration
//   const options = {
//     cutout: "70%", // controls donut thickness
//     plugins: {
//       legend: {
//         display: false, // We'll display our own legend below
//       },
//       tooltip: {
//         backgroundColor: "#1F2937", // dark gray
//         titleColor: "#F9FAFB",       // light text
//         bodyColor: "#F9FAFB",
//       },
//     },
//     maintainAspectRatio: false,
//   };

//   // Sample toast trigger
 
//   return (
//     <motion.div
//       // A simple fade-in animation using Framer Motion
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="w-full rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md text-gray-800 dark:text-gray-100 "
//     >
//       {/* Header */}
//       <div className="flex justify-between items-start mb-4">
//         <div>
//           <h2 className="text-lg font-semibold">Training Needs Assessment</h2>
//           <p className="text-sm text-gray-500 dark:text-gray-400">This Month</p>
//         </div>
//         <button
//           className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
//         >
//           <FaEllipsisH size={18} />
//         </button>
//       </div>

//       {/* Chart Container */}
//       <div className="relative h-48 w-full mb-4">
//         <Doughnut data={data} options={options} />
//         {/* You can place absolute elements over the chart if desired */}
//       </div>

//       {/* Legend / Breakdown */}
//       <div className="flex justify-around text-sm mt-4">
//         <div className="flex items-center gap-1">
//           <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>
//           <span>Up-to-date</span>
//           <span className="font-bold ml-1">40%</span>
//         </div>
//         <div className="flex items-center gap-1">
//           <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
//           <span>Needs Refresh</span>
//           <span className="font-bold ml-1">35%</span>
//         </div>
//         <div className="flex items-center gap-1">
//           <span className="inline-block w-3 h-3 rounded-full bg-blue-900"></span>
//           <span>Needs Certification</span>
//           <span className="font-bold ml-1">25%</span>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default TrainingNeedsCard;


import React from "react";
import { Doughnut } from "react-chartjs-2";
import 'chart.js/auto';
import { FiChevronDown } from "react-icons/fi";

const TrainingNeedsAssessmentCard = () => {
  // Chart data for 3 slices
  const data = {
    labels: ["Up-to-date", "Needs Refresh", "Needs Certification"],
    datasets: [
      {
        label: "Training Needs Assessment",
        data: [40, 35, 25], // dummy percentages
        backgroundColor: ["#F59E0B", "#10B981", "#1E3A8A"], 
        // You can use #1E40AF or another navy/blue if you prefer
        hoverBackgroundColor: ["#D97706", "#059669", "#1E40AF"],
        borderWidth: 0,
      },
    ],
  };

  // Donut Chart options
  const options = {
    cutout: "70%", // thickness of the donut ring
    rotation: -90, 
    circumference: 360, // full circle; tweak if you want a semi-circle
    plugins: {
      legend: {
        display: false, // we use our own custom legend below
      },
      tooltip: {
        bodyColor: "#fff",
        backgroundColor: "#111827",
        titleColor: "#F9FAFB",
        displayColors: false,
      },
    },
  };

  return (
    <div
      className="max-w-xs p-4 rounded-lg shadow-sm
                 bg-white dark:bg-slate-800
                 text-gray-900 dark:text-gray-100"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Training Needs Assessment</h2>
        {/* Dropdown */}
        <div className="relative">
          <button
            className="inline-flex items-center px-2 py-1 text-sm font-medium
                       bg-gray-100 dark:bg-slate-700 rounded-md 
                       hover:bg-gray-200 dark:hover:bg-slate-600
                       transition-colors"
          >
            This Month
            <FiChevronDown className="ml-1" />
          </button>
          {/* If you want a real dropdown, you can place it here */}
        </div>
      </div>

      {/* Chart with floating bubbles */}
      <div className="relative flex items-center justify-center">
        <div className="w-48 h-48">
          <Doughnut data={data} options={options} />
        </div>

     

    
      </div>

      {/* Custom Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
        {/* Up-to-date */}
        <div className="flex items-center space-x-1">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: "#F59E0B" }}
          />
          <span>Up-to-date :</span>
          <span className="font-semibold">40%</span>
        </div>

        {/* Needs Refresh */}
        <div className="flex items-center space-x-1">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: "#10B981" }}
          />
          <span>Needs Refresh :</span>
          <span className="font-semibold">35%</span>
        </div>

        {/* Needs Certification */}
        <div className="flex items-center space-x-1">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: "#1E3A8A" }}
          />
          <span>Needs Certification :</span>
          <span className="font-semibold">25%</span>
        </div>
      </div>
    </div>
  );
};

export default TrainingNeedsAssessmentCard;
