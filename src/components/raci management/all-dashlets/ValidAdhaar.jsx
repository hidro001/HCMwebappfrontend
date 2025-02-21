// import React from "react";
// import { Doughnut } from "react-chartjs-2";
// import 'chart.js/auto'; // Ensure Chart.js is properly initialized
// import { motion } from "framer-motion";
// import { toast } from "react-hot-toast";
// import { FiChevronDown } from "react-icons/fi";

// const AadhaarCardChart = () => {
//   // Dummy chart data: 60, 50, 40
//   // Colors: blue, orange, green
//   const data = {
//     labels: [ "Pending", "Complete"],
//     datasets: [
//       {
//         label: "Aadhaar Card Status",
//         data: [ 50, 40],
//         backgroundColor: ["#3B82F6", "#F59E0B", "#10B981"],
//         hoverBackgroundColor: ["#2563EB", "#D97706", "#059669"],
//         borderWidth: 0,
//       },
//     ],
//   };

//   // Chart.js options
//   const options = {
//     cutout: "70%", // donut hole size
//     rotation: -90,  // optional: start from the top
//     circumference: 180, // optional: draw only a semi-circle
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         bodyColor: "#fff",
//         backgroundColor: "#111827",
//         titleColor: "#F9FAFB",
//         displayColors: false,
//       },
//     },
//   };

//   const handleShowToast = () => {
//     toast.success("This is a sample toast!");
//   };

//   return (
//     <motion.div
//       // Fade/slide-in animation
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       className="max-w-sm p-4 rounded-lg shadow-sm
//                  bg-white dark:bg-slate-800
//                  text-gray-900 dark:text-gray-100"
//     >
//       {/* Header Section */}
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="font-semibold text-lg">Valid Aadhaar Card</h2>
//         {/* Example dropdown for “Monthly” */}
//         <div className="relative">
      
//           {/* Real dropdown content (if needed) can go here */}
//         </div>
//       </div>

//       {/* Donut Chart */}
//       <div className="flex items-center justify-center">
//         <div className="w-40 h-40">
//           <Doughnut data={data} options={options} />
//         </div>
//       </div>

//       {/* Custom legend with color-coded labels */}
//       <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
      

//         {/* Pending: Orange */}
//         <div className="flex flex-col items-center">
//           <div className="flex items-center space-x-1">
//             <span
//               className="inline-block w-3 h-3 rounded-full"
//               style={{ backgroundColor: "#F59E0B" }}
//             />
//             <span className="text-gray-500 dark:text-gray-400">
//               Pending:
//             </span>
//           </div>
//           <span className="font-bold mt-1">50%</span>
//         </div>

//         {/* Complete: Green */}
//         <div className="flex flex-col items-center">
//           <div className="flex items-center space-x-1">
//             <span
//               className="inline-block w-3 h-3 rounded-full"
//               style={{ backgroundColor: "#10B981" }}
//             />
//             <span className="text-gray-500 dark:text-gray-400">
//               Complete:
//             </span>
//           </div>
//           <span className="font-bold mt-1">40%</span>
//         </div>
//       </div>

   
//     </motion.div>
//   );
// };

// export default AadhaarCardChart;

import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { FiChevronDown } from "react-icons/fi";
import useAadhaarCardStore from "../../../store/analytics dashboards cards/useAadhaarCardStore"; // Path to your store

const AadhaarCardChart = () => {
  // 1) Get store data & fetch action
  const { data, loading, error, fetchAadhaarStats } = useAadhaarCardStore();

  // 2) Fetch stats on mount
  useEffect(() => {
    fetchAadhaarStats();
  }, [fetchAadhaarStats]);

  // 3) Handle loading/error
  if (loading) return <div>Loading Aadhaar Stats...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null; // no data yet

  // 4) Extract from the API response
  const {
    completeCount,
    pendingCount,
    completePercentage,
    pendingPercentage,
  } = data;

  // Build chart data from the store
  const chartData = {
    labels: ["Pending", "Complete"],
    datasets: [
      {
        label: "Aadhaar Card Status",
        data: [pendingCount, completeCount],
        backgroundColor: ["#3B82F6", "#F59E0B", "#10B981"], // first 2 are used
        hoverBackgroundColor: ["#2563EB", "#D97706", "#059669"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%",
    rotation: -90,    // optional: starts the chart from the top
    circumference: 180, // optional: draw a semi-circle
    plugins: {
      legend: { display: false },
      tooltip: {
        bodyColor: "#fff",
        backgroundColor: "#111827",
        titleColor: "#F9FAFB",
        displayColors: false,
      },
    },
  };

  // 5) Render the chart & custom legend
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-sm p-4 rounded-lg shadow-sm
                 bg-white dark:bg-slate-800
                 text-gray-900 dark:text-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Valid Aadhaar Card</h2>
      </div>

      <div className="flex items-center justify-center">
        <div className="w-40 h-40">
          <Doughnut data={chartData} options={options} />
        </div>
      </div>

      {/* Custom legend */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        {/* Pending */}
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-1">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: "#3B82F6" }}
            />
            <span className="text-gray-500 dark:text-gray-400">Pending:</span>
          </div>
          <span className="font-bold mt-1">
            {pendingCount} ({pendingPercentage}%)
          </span>
        </div>

        {/* Complete */}
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-1">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: "#F59E0B" }}
            />
            <span className="text-gray-500 dark:text-gray-400">Complete:</span>
          </div>
          <span className="font-bold mt-1">
            {completeCount} ({completePercentage}%)
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default AadhaarCardChart;
