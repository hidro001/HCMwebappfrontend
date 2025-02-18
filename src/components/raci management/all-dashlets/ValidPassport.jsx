// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Doughnut } from 'react-chartjs-2';

// // Register Chart.js elements
// ChartJS.register(ArcElement, Tooltip, Legend);

// export default function ValidPassport() {
//   // Example data: Expired=20,000 / Active=25,000
//   const dataValues = [20000, 25000];
//   const labels = ['Expired', 'Active'];

//   const chartData = {
//     labels,
//     datasets: [
//       {
//         data: dataValues,
//         backgroundColor: ['#F97316', '#3B82F6'], // orange, blue
//         hoverOffset: 4,
//       },
//     ],
//   };

//   // Chart total
//   const total = dataValues.reduce((acc, val) => acc + val, 0); // 45000

//   // Full donut
//   const chartOptions = {
//     plugins: {
//       legend: { display: false },
//     },
//     cutout: '70%',
//     responsive: true,
//     maintainAspectRatio: false,
//   };

//   return (
//     <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-2">
//         <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
//           Passport validity
//         </h3>
//         <button className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
//           Monthly
//           <svg
//             className="w-4 h-4"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//           >
//             <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.58l3.71-3.35a.75.75 0 111.04 1.08l-4.24 3.82a.75.75 0 01-1.04 0L5.21 8.29a.75.75 0 01.02-1.08z" />
//           </svg>
//         </button>
//       </div>

//       {/* Donut Chart */}
//       <div className="relative h-36 flex justify-center items-center">
//         <Doughnut data={chartData} options={chartOptions} />

//         {/* Overlays for growth percentages (example) */}
//         <div className="absolute flex items-center justify-center">
//           {/* Orange slice overlay */}
//           <div
//             className="absolute text-white bg-orange-500 rounded-full text-xs px-2 py-1"
//             style={{ top: '15%', left: '60%' }}
//           >
//             +25%
//           </div>
//           {/* Blue slice overlay */}
//           <div
//             className="absolute text-white bg-blue-500 rounded-full text-xs px-2 py-1"
//             style={{ bottom: '15%', right: '60%' }}
//           >
//             +30%
//           </div>
//         </div>
//       </div>

//       {/* Legend */}
//       <div className="mt-3 space-y-1 text-sm">
//         {labels.map((label, i) => {
//           const value = dataValues[i];
//           const pct = ((value / total) * 100).toFixed(1);
//           return (
//             <div key={i} className="flex items-center gap-2">
//               <span
//                 className="inline-block w-3 h-3 rounded-full"
//                 style={{ backgroundColor: chartData.datasets[0].backgroundColor[i] }}
//               />
//               <span className="text-gray-700 dark:text-gray-200">
//                 {label}: {value.toLocaleString()}
//               </span>
//               <span className="text-gray-400">
//                 ({pct}%)
//               </span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { FiChevronDown } from "react-icons/fi";

const PassportValidityCard = () => {
  // Dummy data
  const data = {
    labels: ["Expired", "Active"],
    datasets: [
      {
        label: "Passport Validity",
        data: [20000, 25000], // Values for each slice
        backgroundColor: ["#3B82F6", "#F59E0B"], // Blue, Orange
        hoverBackgroundColor: ["#2563EB", "#D97706"],
        borderWidth: 0,
      },
    ],
  };

  // Donut Chart options
  const options = {
    cutout: "70%", // thickness of donut ring
    rotation: -90, // start angle
    circumference: 360, // full circle (adjust if you want a semi-circle)
    plugins: {
      legend: {
        display: false, // hide default Chart.js legend
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
                 text-gray-900 dark:text-gray-100 h-[405px] "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Passport validity</h2>
        {/* Dropdown */}
        <div className="relative">
        
          {/* A real dropdown menu can go here if needed */}
        </div>
      </div>

      {/* Chart Container (relative to position bubbles) */}
      <div className="relative flex items-center justify-center">
        <div className="w-48 h-48">
          <Doughnut data={data} options={options} />
        </div>
      </div>

      {/* Custom Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
        {/* Expired */}
        <div className="flex items-center space-x-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: "#3B82F6" }}
          />
          <span>Expired :</span>
          <span className="font-semibold">20,000</span>
        </div>

        {/* Active */}
        <div className="flex items-center space-x-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: "#F59E0B" }}
          />
          <span>Active :</span>
          <span className="font-semibold">25,000</span>
        </div>
      </div>
  
    </div>
  );
};

export default PassportValidityCard;
