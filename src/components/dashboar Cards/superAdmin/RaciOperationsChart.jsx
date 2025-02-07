

// import * as React from "react";

// function RaciOperationsChart() {
//   return (
//     <div
//       className="
//         mt-7 w-full
//         rounded-xl bg-white dark:bg-gray-800
//         shadow-2xl
//         p-4
//       "
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-600">
//         <h2 className="text-lime-600 dark:text-lime-400 text-base font-semibold">
//           RACI Operations
//         </h2>
//         {/* Ellipsis / Menu Icon */}
//         <button
//           type="button"
//           className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//           aria-label="Menu"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <circle cx="5" cy="12" r="1"></circle>
//             <circle cx="12" cy="12" r="1"></circle>
//             <circle cx="19" cy="12" r="1"></circle>
//           </svg>
//         </button>
//       </div>

//       {/* Chart Container */}
//       <div className="relative flex flex-col md:flex-row items-center justify-start py-6">
//         {/* Y-Axis Labels */}
//         <div className="hidden md:flex flex-col items-center mr-2 text-sm text-gray-500 dark:text-gray-300">
//           <div className="mb-4">200</div>
//           <div className="mb-4">150</div>
//           <div className="mb-4">100</div>
//           <div className="mb-4">50</div>
//           <div>0</div>
//         </div>

//         {/* Chart Image */}
//         <div className="flex-1 w-full">
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/825148de-4ccf-4f6f-a0c6-f92146b7cdf2"
//             alt="RACI operations chart"
//             className="h-auto w-full object-contain"
//           />
//         </div>
//       </div>

//       {/* X-Axis Labels */}
//       <div className="mt-2 px-2 flex justify-between text-gray-500 text-sm dark:text-gray-300">
//         {["01", "05", "09", "13", "17", "21", "25", "29"].map((day) => (
//           <span key={day}>{day}</span>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default RaciOperationsChart;

import React from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Auto‐register Chart.js components
import { AiOutlineMore } from 'react-icons/ai';

const RaciOperationsChart = () => {
  // Sample chart data
  const data = {
    labels: [
      '01', '03', '05', '07', '09', '11', '13',
      '15', '17', '19', '21', '23', '25', '27', '29',
    ],
    datasets: [
      {
        label: 'Operations',
        data: [200, 150, 100, 180, 160, 80, 55, 120, 95, 130, 70, 60, 90, 50, 75],
        borderColor: '#84CC16', // Light green
        backgroundColor: 'transparent',
        tension: 0.4, // Curve the line
        borderWidth: 2,
        pointRadius: 0, // Hide individual points
      },
    ],
  };

  // Chart.js options for styling
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        // Example for dotted horizontal lines
        grid: {
          drawBorder: false,
          borderDash: [2, 2],
          color: '#E2E8F0',
        },
        ticks: { color: '#64748B' }, // Tailwind slate-500
      },
      x: {
        grid: { display: false },
        ticks: { color: '#64748B' },
      },
    },
    plugins: {
      legend: { display: false },  // Hide legend
      tooltip: { enabled: true },  // Show tooltips on hover
    },
  };

  return (
    <motion.div
      // Framer Motion fade/slide animation
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      // Card container
      className="p-4 rounded-lg shadow bg-white dark:bg-slate-800 
                 text-gray-800 dark:text-gray-100  w-full"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">
          RACI <span className="text-green-600 dark:text-green-400">Operations</span>
        </h2>
        <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600">
          <AiOutlineMore className="w-5 h-5" />
        </button>
      </div>

      {/* Chart Container */}
      <div className="relative w-full h-80">
        <Line data={data} options={options} />
      </div>
    </motion.div>
  );
};

export default RaciOperationsChart;

