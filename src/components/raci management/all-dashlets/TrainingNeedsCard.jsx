

// import React from "react";
// import { Doughnut } from "react-chartjs-2";
// import "chart.js/auto";
// import { FiChevronDown } from "react-icons/fi";

// const TrainingNeedsAssessmentCard = () => {
//   // Chart data for 3 slices
//   const data = {
//     labels: ["Up-to-date", "Needs Refresh", "Needs Certification"],
//     datasets: [
//       {
//         label: "Training Needs Assessment",
//         data: [40, 35, 25], // dummy percentages
//         backgroundColor: ["#F59E0B", "#10B981", "#1E3A8A"],
//         // You can use #1E40AF or another navy/blue if you prefer
//         hoverBackgroundColor: ["#D97706", "#059669", "#1E40AF"],
//         borderWidth: 0,
//       },
//     ],
//   };

//   // Donut Chart options
//   const options = {
//     cutout: "70%", // thickness of the donut ring
//     rotation: -90,
//     circumference: 360, // full circle; tweak if you want a semi-circle
//     plugins: {
//       legend: {
//         display: false, // we use our own custom legend below
//       },
//       tooltip: {
//         bodyColor: "#fff",
//         backgroundColor: "#111827",
//         titleColor: "#F9FAFB",
//         displayColors: false,
//       },
//     },
//   };

//   return (
//     <div
//       className="max-w-xs p-4 rounded-lg shadow-sm
//                  bg-white dark:bg-slate-800
//                  text-gray-900 dark:text-gray-100"
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="font-semibold text-lg">Training Needs Assessment</h2>
//         {/* Dropdown */}
//         <div className="relative">
//           <button
//             className="inline-flex items-center px-2 py-1 text-sm font-medium
//                        bg-gray-100 dark:bg-slate-700 rounded-md 
//                        hover:bg-gray-200 dark:hover:bg-slate-600
//                        transition-colors"
//           >
//             This Month,year,week
//             <FiChevronDown className="ml-1" />
//           </button>
//           {/* If you want a real dropdown, you can place it here */}
//         </div>
//       </div>

//       {/* Chart with floating bubbles */}
//       <div className="relative flex items-center justify-center">
//         <div className="w-48 h-48">
//           <Doughnut data={data} options={options} />
//         </div>
//       </div>

//       {/* Custom Legend */}
//       <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
//         {/* Up-to-date */}
//         <div className="flex items-center space-x-1">
//           <span
//             className="inline-block w-3 h-3 rounded-full"
//             style={{ backgroundColor: "#F59E0B" }}
//           />
//           <span>Up-to-date :</span>
//           <span className="font-semibold">40%</span>
//         </div>

//         {/* Needs Refresh */}
//         <div className="flex items-center space-x-1">
//           <span
//             className="inline-block w-3 h-3 rounded-full"
//             style={{ backgroundColor: "#10B981" }}
//           />
//           <span>Needs Refresh :</span>
//           <span className="font-semibold">35%</span>
//         </div>

//         {/* Needs Certification */}
//         <div className="flex items-center space-x-1">
//           <span
//             className="inline-block w-3 h-3 rounded-full"
//             style={{ backgroundColor: "#1E3A8A" }}
//           />
//           <span>Needs Certification :</span>
//           <span className="font-semibold">25%</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrainingNeedsAssessmentCard;


// TrainingNeedsAssessmentCard.jsx
import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { FiChevronDown } from 'react-icons/fi';

// Import the zustand store
import useTrainingNeedsStore from '../../../store/analytics dashboards cards/useTrainingNeedsStore'; // adjust path

const TrainingNeedsAssessmentCard = () => {
  // 1) Get relevant states and action from the store
  const { data, loading, error, fetchTrainingNeeds } = useTrainingNeedsStore();

  // 2) Fetch data on component mount
  useEffect(() => {
    fetchTrainingNeeds();
  }, [fetchTrainingNeeds]);

  // 3) Handle loading / error states
  if (loading) return <div>Loading Training Needs...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null; // No data yet

  // 4) Extract percentages from the store's data
  const { upToDatePct, needsRefreshPct, needsCertificationPct } = data;
  // Convert string to number if needed
  const upToDateVal = parseFloat(upToDatePct) || 0;
  const needsRefreshVal = parseFloat(needsRefreshPct) || 0;
  const needsCertificationVal = parseFloat(needsCertificationPct) || 0;

  // Build the chart data object
  const chartData = {
    labels: ["Up-to-date", "Needs Refresh", "Needs Certification"],
    datasets: [
      {
        label: "Training Needs Assessment",
        data: [upToDateVal, needsRefreshVal, needsCertificationVal],
        backgroundColor: ["#F59E0B", "#10B981", "#1E3A8A"],
        hoverBackgroundColor: ["#D97706", "#059669", "#1E40AF"],
        borderWidth: 0,
      },
    ],
  };

  // Chart options
  const options = {
    cutout: "70%",
    rotation: -90,
    circumference: 360,
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

  return (
    <div
      className="max-w-xs p-4 rounded-lg shadow-sm
                 bg-white dark:bg-slate-800
                 text-gray-900 dark:text-gray-100"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Training Needs Assessment</h2>
        {/* If you have a dropdown, place it here */}
    
      </div>

      {/* Donut Chart */}
      <div className="relative flex items-center justify-center">
        <div className="w-48 h-48">
          <Doughnut data={chartData} options={options} />
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
          <span>Up-to-date:</span>
          <span className="font-semibold">{upToDateVal}%</span>
        </div>

        {/* Needs Refresh */}
        <div className="flex items-center space-x-1">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: "#10B981" }}
          />
          <span>Needs Refresh:</span>
          <span className="font-semibold">{needsRefreshVal}%</span>
        </div>

        {/* Needs Certification */}
        <div className="flex items-center space-x-1">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: "#1E3A8A" }}
          />
          <span>Needs Certification:</span>
          <span className="font-semibold">{needsCertificationVal}%</span>
        </div>
      </div>
    </div>
  );
};

export default TrainingNeedsAssessmentCard;
