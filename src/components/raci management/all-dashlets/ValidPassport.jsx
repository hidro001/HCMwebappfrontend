
// import React from "react";
// import { Doughnut } from "react-chartjs-2";
// import "chart.js/auto";
// import { FiChevronDown } from "react-icons/fi";

// const PassportValidityCard = () => {
//   // Dummy data
//   const data = {
//     labels: ["Pending", "Complete"],
//     datasets: [
//       {
//         label: "Valid Passport",
//         data: [20000, 25000], // Values for each slice
//         backgroundColor: ["#3B82F6", "#F59E0B"], // Blue, Orange
//         hoverBackgroundColor: ["#2563EB", "#D97706"],
//         borderWidth: 0,
//       },
//     ],
//   };

//   // Donut Chart options
//   const options = {
//     cutout: "70%", // thickness of donut ring
//     rotation: -90, // start angle
//     circumference: 360, // full circle (adjust if you want a semi-circle)
//     plugins: {
//       legend: {
//         display: false, // hide default Chart.js legend
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
//                  text-gray-900 dark:text-gray-100 h-[405px] "
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="font-semibold text-lg">Valid Passport </h2>
//         {/* Dropdown */}
//         <div className="relative">
//           {/* A real dropdown menu can go here if needed */}
//         </div>
//       </div>

//       {/* Chart Container (relative to position bubbles) */}
//       <div className="relative flex items-center justify-center">
//         <div className="w-48 h-48">
//           <Doughnut data={data} options={options} />
//         </div>
//       </div>

//       {/* Custom Legend */}
//       <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
//         {/* Expired */}
//         <div className="flex items-center space-x-2">
//           <span
//             className="inline-block w-3 h-3 rounded-full"
//             style={{ backgroundColor: "#3B82F6" }}
//           />
//           <span>Pending</span>
//           <span className="font-semibold">20,000</span>
//         </div>

//         {/* Active */}
//         <div className="flex items-center space-x-2">
//           <span
//             className="inline-block w-3 h-3 rounded-full"
//             style={{ backgroundColor: "#F59E0B" }}
//           />
//           <span>Complete</span>
//           <span className="font-semibold">25,000</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PassportValidityCard;


import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { FiChevronDown } from "react-icons/fi";
import usePassportStore from "../../../store/analytics dashboards cards/usePassportStore"; // Path to your Zustand store

const PassportValidityCard = () => {
  // 1) Get store data and action
  const { data, loading, error, fetchPassportValidity } = usePassportStore();

  // 2) Fetch on mount
  useEffect(() => {
    fetchPassportValidity();
  }, [fetchPassportValidity]);

  // 3) Handle loading or error
  if (loading) return <div>Loading passport data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  // 4) Extract counts & percentages
  const { completeCount, pendingCount, completePercentage, pendingPercentage } = data;

  // Build chart data
  const chartData = {
    labels: ["Pending", "Complete"],
    datasets: [
      {
        label: "Valid Passport",
        data: [pendingCount, completeCount],
        backgroundColor: ["#3B82F6", "#F59E0B"],
        hoverBackgroundColor: ["#2563EB", "#D97706"],
        borderWidth: 0,
      },
    ],
  };

  // Donut options
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
                 text-gray-900 dark:text-gray-100 h-[405px]"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Valid Passport</h2>
        <div className="relative">{/* dropdown placeholder */}</div>
      </div>

      {/* Donut Chart */}
      <div className="relative flex items-center justify-center">
        <div className="w-48 h-48">
          <Doughnut data={chartData} options={options} />
        </div>
      </div>

      {/* Custom Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
        {/* Pending */}
        <div className="flex items-center space-x-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: "#3B82F6" }}
          />
          <span>Pending</span>
          <span className="font-semibold">
            {pendingCount} ({pendingPercentage}%)
          </span>
        </div>

        {/* Complete */}
        <div className="flex items-center space-x-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: "#F59E0B" }}
          />
          <span>Complete</span>
          <span className="font-semibold">
            {completeCount} ({completePercentage}%)
          </span>
        </div>
      </div>
    </div>
  );
};

export default PassportValidityCard;
