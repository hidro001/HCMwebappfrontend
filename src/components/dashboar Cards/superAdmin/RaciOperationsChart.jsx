// import React from 'react';
// import { motion } from 'framer-motion';
// import { Line } from 'react-chartjs-2';
// import 'chart.js/auto'; // Auto‐register Chart.js components
// import { AiOutlineMore } from 'react-icons/ai';

// const RaciOperationsChart = () => {
//   // Sample chart data
//   const data = {
//     labels: [
//       '01', '03', '05', '07', '09', '11', '13',
//       '15', '17', '19', '21', '23', '25', '27', '29',
//     ],
//     datasets: [
//       {
//         label: 'Operations',
//         data: [200, 150, 100, 180, 160, 80, 55, 120, 95, 130, 70, 60, 90, 50, 75],
//         borderColor: '#84CC16', // Light green
//         backgroundColor: 'transparent',
//         tension: 0.4, // Curve the line
//         borderWidth: 2,
//         pointRadius: 0, // Hide individual points
//       },
//     ],
//   };

//   // Chart.js options for styling
//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         // Example for dotted horizontal lines
//         grid: {
//           drawBorder: false,
//           borderDash: [2, 2],
//           color: '#E2E8F0',
//         },
//         ticks: { color: '#64748B' }, // Tailwind slate-500
//       },
//       x: {
//         grid: { display: false },
//         ticks: { color: '#64748B' },
//       },
//     },
//     plugins: {
//       legend: { display: false },  // Hide legend
//       tooltip: { enabled: true },  // Show tooltips on hover
//     },
//   };

//   return (
//     <motion.div
//       // Framer Motion fade/slide animation
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       // Card container
//       className="p-4 rounded-lg shadow bg-white dark:bg-slate-800
//                  text-gray-800 dark:text-gray-100  w-full"
//     >
//       {/* Top bar */}
//       <div className="flex items-center justify-between mb-2">
//         <h2 className="text-lg font-semibold">
//           RACI <span className="text-green-600 dark:text-green-400">Operations</span>
//         </h2>
//         <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600">
//           <AiOutlineMore className="w-5 h-5" />
//         </button>
//       </div>

//       {/* Chart Container */}
//       <div className="relative w-full h-80">
//         <Line data={data} options={options} />
//       </div>
//     </motion.div>
//   );
// };

// export default RaciOperationsChart;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Line, Bar } from "react-chartjs-2";
import "chart.js/auto"; // Auto‐register Chart.js components
import { AiOutlineMore } from "react-icons/ai";

const RaciOperationsChart = () => {
  // State to toggle chart type
  const [isLineChart, setIsLineChart] = useState(true);

  // Define your color palette for bars (make sure it matches your data length)
  const barColors = [
    "#F87171", // Red
    "#FBBF24", // Amber
    "#34D399", // Green
    "#60A5FA", // Blue
    "#A78BFA", // Purple
    "#F472B6", // Pink
    "#F97316", // Orange
    "#22D3EE", // Cyan
    "#A3E635", // Lime
    "#FB7185", // Rose
    "#E879F9", // Fuchsia
    "#FACC15", // Yellow
    "#4ADE80", // Light Green
    "#38BDF8", // Sky
    "#C084FC", // Violet
  ];

  // Sample chart data
  const data = {
    labels: [
      "01",
      "03",
      "05",
      "07",
      "09",
      "11",
      "13",
      "15",
      "17",
      "19",
      "21",
      "23",
      "25",
      "27",
      "29",
    ],
    datasets: [
      {
        label: "Operations",
        data: [
          200, 150, 100, 180, 160, 80, 55, 120, 95, 130, 70, 60, 90, 50, 75,
        ],
        // Conditionally use multiple colors for bar or a single color for line
        backgroundColor: isLineChart ? "transparent" : barColors,
        borderColor: "#84CC16",
        borderWidth: 2,
        tension: 0.4, // Curve the line (applies only to line chart)
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
        grid: {
          drawBorder: false,
          borderDash: [2, 2],
          color: "#E2E8F0",
        },
        ticks: { color: "#64748B" }, // Tailwind slate-500
      },
      x: {
        grid: { display: false },
        ticks: { color: "#64748B" },
      },
    },
    plugins: {
      legend: { display: false }, // Hide legend
      tooltip: { enabled: true }, // Show tooltips on hover
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
                 text-gray-800 dark:text-gray-100 w-full"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          RACI{" "}
          <span className="text-green-600 dark:text-green-400">Operations</span>
        </h2>
        {/* <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600">
          <AiOutlineMore className="w-5 h-5" />
        </button> */}
        <button
          onClick={() => setIsLineChart(!isLineChart)}
          className="px-4 py-1 rounded-md bg-green-500 text-white 
                     hover:bg-green-600 transition-colors"
        >
          {isLineChart ? "Show Bar Chart" : "Show Line Chart"}
        </button>
      </div>

    

      {/* Chart Container */}
      <div className="relative w-full h-80">
        {isLineChart ? (
          <Line data={data} options={options} />
        ) : (
          <Bar data={data} options={options} />
        )}
      </div>
    </motion.div>
  );
};

export default RaciOperationsChart;
