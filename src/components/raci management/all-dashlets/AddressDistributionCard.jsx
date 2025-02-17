// import React, { useState } from "react";
// import { Doughnut } from "react-chartjs-2";
// import { motion } from "framer-motion";
// import { toast } from "react-hot-toast";
// import { FaChevronDown } from "react-icons/fa"; // Example icon
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register Chart.js components
// ChartJS.register(ArcElement, Tooltip, Legend);

// const AddressDistributionCard = () => {
//   // Example state for timeframe dropdown
//   const [timeframe, setTimeframe] = useState("Monthly");

//   // Example dark mode toggle from your existing setup:
//   // Here, we just store it in state. Replace with your actual method of toggling.
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const handleToggleTheme = () => {
//     setIsDarkMode((prev) => !prev);
//     toast.success(`Switched to ${!isDarkMode ? "Dark" : "Light"} theme!`);
//   };

//   // Dummy data for the chart
//   const data = {
//     labels: ["Current Address", "Permanent Address"],
//     datasets: [
//       {
//         data: [80, 20],
//         backgroundColor: ["#2563EB", "#F97316"], // Tailwind color classes: (blue-600, orange-500)
//         hoverBackgroundColor: ["#1D4ED8", "#EA580C"], // darker hover colors
//         borderWidth: 0,
//       },
//     ],
//   };

//   // Chart options
//   const options = {
//     cutout: "70%",
//     plugins: {
//       legend: {
//         display: false, // We'll show custom legends
//       },
//       tooltip: {
//         enabled: true,
//       },
//     },
//   };

//   // Example function for handling timeframe change
//   const handleTimeframeChange = (newTimeframe) => {
//     setTimeframe(newTimeframe);
//     toast(`Switched to ${newTimeframe} view!`);
//   };

//   return (
//     <motion.div
//       // Framer Motion for subtle fade-in/zoom effect
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.3 }}
//       // Card Container
//       className={`w-full max-w-sm p-4 rounded-lg shadow 
//         ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}
//       `}
//     >
//       {/* Card Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold">Address Distribution</h2>
//         <div className="relative">
//           {/* Example Dropdown toggle */}
//           <button
//             className="flex items-center gap-1 border px-3 py-1 rounded
//                       hover:bg-gray-200 dark:hover:bg-gray-700 transition"
//             onClick={() => {
//               // cycle through some dummy timeframes
//               if (timeframe === "Monthly") {
//                 handleTimeframeChange("Weekly");
//               } else if (timeframe === "Weekly") {
//                 handleTimeframeChange("Daily");
//               } else {
//                 handleTimeframeChange("Monthly");
//               }
//             }}
//           >
//             {timeframe}
//             <FaChevronDown className="w-3 h-3" />
//           </button>
//         </div>
//       </div>

//       {/* Chart Section */}
//       <div className="flex justify-center items-center">
//         <div className="w-48 h-48 relative">
//           <Doughnut data={data} options={options} />
//           {/* Center percentages or icons if desired */}
//           <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
//             {/* Could display aggregated data here if needed */}
//           </div>
//         </div>
//       </div>

//       {/* Legend / Stats */}
//       <div className="mt-4 flex justify-center space-x-4 text-sm">
//         <div className="flex items-center gap-1">
//           <span className="inline-block w-3 h-3 bg-blue-600 rounded-full" />
//           <p>Current Address: 80%</p>
//         </div>
//         <div className="flex items-center gap-1">
//           <span className="inline-block w-3 h-3 bg-orange-500 rounded-full" />
//           <p>Permanent Address: 20%</p>
//         </div>
//       </div>

//       {/* Example theme toggle button */}
//       <div className="mt-4 flex justify-center">
//         <button
//           className={`px-4 py-2 rounded 
//             ${isDarkMode ? "bg-gray-700" : "bg-gray-200"} 
//             hover:opacity-80 transition
//           `}
//           onClick={handleToggleTheme}
//         >
//           Toggle {isDarkMode ? "Light" : "Dark"} Mode
//         </button>
//       </div>
//     </motion.div>
//   );
// };

// export default AddressDistributionCard;


// import React from 'react'
// import { motion } from 'framer-motion'
// import { Doughnut } from 'react-chartjs-2'
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend
// } from 'chart.js'
// import { FiMoreVertical } from 'react-icons/fi'
// import { toast } from 'react-hot-toast'

// ChartJS.register(ArcElement, Tooltip, Legend)

// const AddressDistributionCard = () => {
//   // Dummy data for the Donut chart
//   const data = {
//     labels: ['Current Address', 'Permanent Address'],
//     datasets: [
//       {
//         label: 'Address Distribution',
//         data: [80, 20],
//         backgroundColor: [
//           '#3b82f6', // Tailwind "blue-500"
//           '#f97316'  // Tailwind "orange-500"
//         ],
//         hoverBackgroundColor: [
//           '#2563eb', // Tailwind "blue-600"
//           '#ea580c'  // Tailwind "orange-600"
//         ],
//         borderWidth: 0
//       }
//     ]
//   }

//   // Chart options
//   const options = {
//     cutout: '65%',
//     plugins: {
//       legend: { display: false }, // We'll use custom labels instead of the built-in legend
//       tooltip: {
//         backgroundColor: '#111827', // dark gray for tooltip
//         titleColor: '#ffffff',
//         bodyColor: '#ffffff',
//         displayColors: false
//       }
//     },
//     maintainAspectRatio: false,
//     responsive: true
//   }

//   // Example function to show a toast when user selects something
//   const handleSelection = () => {
//     toast.success('Monthly selected!')
//   }

//   return (
//     <motion.div
//       // Simple fade‐in + scale animation
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.3 }}
//       className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 w-full max-w-sm"
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
//           Address Distribution
//         </h2>
//         <div className="relative inline-block">
//           <button
//             onClick={() => toast('More options...')}
//             className="p-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
//           >
//             <FiMoreVertical size={18} />
//           </button>
//         </div>
//       </div>

//       {/* Dropdown (just a sample) */}
//       <div className="mb-4">
//         <select
//           onChange={handleSelection}
//           className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200 rounded p-1"
//         >
//           <option value="monthly">Monthly</option>
//           <option value="weekly">Weekly</option>
//           <option value="yearly">Yearly</option>
//         </select>
//       </div>

//       {/* Chart Container */}
//       <div className="relative w-full h-52 flex justify-center items-center">
//         <Doughnut data={data} options={options} />
//         {/* Center text could go here if desired */}
//       </div>

//       {/* Custom Legend Below (80%/20% labels) */}
//       <div className="mt-4 flex justify-evenly">
//         <div className="flex items-center space-x-2 text-sm">
//           <span className="block w-3 h-3 rounded-full bg-blue-500" />
//           <span className="text-gray-700 dark:text-gray-200">
//             Current Address: 80%
//           </span>
//         </div>
//         <div className="flex items-center space-x-2 text-sm">
//           <span className="block w-3 h-3 rounded-full bg-orange-500" />
//           <span className="text-gray-700 dark:text-gray-200">
//             Permanent Address: 20%
//           </span>
//         </div>
//       </div>
//     </motion.div>
//   )
// }

// export default AddressDistributionCard


import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FaChevronDown } from 'react-icons/fa';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const AddressDistributionCard = () => {
  // For the time range dropdown (Monthly, Weekly, etc.)
  const [timeRange, setTimeRange] = useState('Monthly');
  const [showDropdown, setShowDropdown] = useState(false);

  // Dummy data for the donut chart
  const data = {
    labels: ['Current Address', 'Permanent Address'],
    datasets: [
      {
        data: [80, 20],
        backgroundColor: ['#3B82F6', '#F97316'], // Tailwind "blue-500" and "orange-500"
        hoverBackgroundColor: ['#2563EB', '#EA580C'], // Tailwind "blue-600" and "orange-600"
        borderWidth: 0,
      },
    ],
  };

  // Chart options
  const options = {
    cutout: '70%', // Creates the donut “hole”
    plugins: {
      legend: {
        display: false, // We’ll show a custom legend below
      },
      tooltip: {
        backgroundColor: '#111827', // dark BG
        titleColor: '#F9FAFB', // light text
        bodyColor: '#F9FAFB',
        borderWidth: 0,
      },
    },
    maintainAspectRatio: false,
  };

  // Toggle the dropdown
  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Handle changing time range
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    setShowDropdown(false);
    // Example: show a toast when the range changes
    toast.success(`Changed range to ${range}`);
  };

  return (
    <div
      className="
        w-full max-w-sm
        p-4
        bg-white 
        dark:bg-slate-800
        rounded-lg
        shadow
        text-gray-800 
        dark:text-gray-200
      "
    >
      {/* Header Row */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold text-lg">Address Distribution</h2>
        {/* Time Range Dropdown */}
        <div className="relative">
          <button
            onClick={handleDropdown}
            className="
              flex items-center 
              px-2 py-1
              bg-gray-100 dark:bg-slate-700
              rounded
              hover:bg-gray-200 dark:hover:bg-slate-600
              transition
            "
          >
            <span className="mr-1">{timeRange}</span>
            <FaChevronDown className="w-3 h-3" />
          </button>
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                className="
                  absolute
                  right-0
                  mt-2 
                  w-28
                  bg-white
                  dark:bg-slate-700
                  shadow
                  rounded
                  z-20
                "
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                {['Monthly', 'Weekly', 'Yearly'].map((range) => (
                  <button
                    key={range}
                    onClick={() => handleTimeRangeChange(range)}
                    className="
                      w-full
                      text-left
                      px-3 py-2 
                      hover:bg-gray-100 
                      dark:hover:bg-slate-600
                      transition
                    "
                  >
                    {range}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="relative w-full h-40">
        <Doughnut data={data} options={options} />
      </div>

      {/* Custom Legend */}
      <div className="mt-4 flex space-x-6 justify-center">
        {/* Current Address Legend */}
        <div className="flex items-center space-x-2">
          <span className="inline-block w-3 h-3 bg-blue-500 rounded-sm"></span>
          <span className="text-sm">
            Current Address: <strong>80%</strong>
          </span>
        </div>
        {/* Permanent Address Legend */}
        <div className="flex items-center space-x-2">
          <span className="inline-block w-3 h-3 bg-orange-500 rounded-sm"></span>
          <span className="text-sm">
            Permanent Address: <strong>20%</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AddressDistributionCard;
