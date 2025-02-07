
// import React, { useState } from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// import { motion, AnimatePresence } from "framer-motion";
// import toast, { Toaster } from "react-hot-toast";
// import { FaChevronDown } from "react-icons/fa";

// // Register chart components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// // Example chart labels & data
// const labels = [
//   "BUSINESS PERFORMANCE",
//   "BUSINESS RISK",
//   "MANAGEMENT INFORMATION SYSTEMS",
//   "CUSTOMERS AND MARKET DEMAND",
//   "SUCCESSION AND ESTATE PLANNING",
//   "STAFF",
// ];

// // Example dataset (blue wavy line)
// const dataValues = [10, 25, 60, 45, 80, 40];

// // Custom tooltip config: show "Continuous Improvement" as the title, and then "Score : <value>"
// const chartOptions = {
//   responsive: true,
//   maintainAspectRatio: false,
//   scales: {
//     x: {
//       ticks: {
//         // You can rotate or style the x-axis labels here
//         // maxRotation: 90,
//         // minRotation: 45,
//         color: "#6B7280", // Tailwind gray-500
//       },
//       grid: {
//         display: false,
//       },
//     },
//     y: {
//       ticks: {
//         color: "#6B7280", // Tailwind gray-500
//       },
//       grid: {
//         color: "#E5E7EB", // Tailwind gray-200 (light dotted lines)
//         // For dark mode you might conditionally set a darker color
//       },
//     },
//   },
//   plugins: {
//     tooltip: {
//       callbacks: {
//         title: () => "Continuous Improvement",
//         label: (context) => `Score  : ${context.parsed.y}`,
//       },
//     },
//     legend: {
//       display: false, // hide default legend
//     },
//   },
// };

// const chartData = {
//   labels,
//   datasets: [
//     {
//       label: "Score",
//       data: dataValues,
//       borderColor: "#3B82F6", // Tailwind blue-500
//       backgroundColor: "#3B82F6",
//       pointRadius: 5,
//       pointHoverRadius: 7,
//       fill: false,
//       tension: 0.3, // smooth line
//     },
//   ],
// };

// export default function RACIChart() {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="p-4 w-full mx-auto dark:bg-gray-900 dark:text-gray-100 border rounded-2xl mt-2 ">
//       {/* react-hot-toast container */}

//       <div className="flex items-center justify-between mb-4">
//         {/* Left side: Title + Overall Score Pill */}
//         <div className="flex flex-col">
//           <h1 className="text-xl font-semibold">RACI Business</h1>
//           <div className="mt-2">
//             <span className="inline-block bg-green-100 text-green-600 rounded px-2 py-1 text-sm">
//               Overall Score : 80%
//             </span>
//           </div>
//         </div>

//         {/* Right side: date dropdown */}
//         <div className="relative">
//           <button
//             className="inline-flex items-center border dark:border-gray-700
//                        px-3 py-2 rounded bg-white dark:bg-gray-800
//                        hover:bg-gray-50 dark:hover:bg-gray-700 transition"
//           >
//             DD-MM-YY
//             <FaChevronDown className="ml-2" />
//           </button>
//           <AnimatePresence>
//             {open && (
//               <motion.div
//                 className="absolute right-0 mt-1 w-32 bg-white dark:bg-gray-800
//                            border dark:border-gray-700 rounded shadow z-10"
//                 initial={{ opacity: 0, y: -4 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -4 }}
//               >
//                 {/* Just sample items for illustration */}
//                 <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
//                   01-01-2025
//                 </div>
//                 <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
//                   02-12-2024
//                 </div>
//                 <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
//                   10-11-2023
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>

//       {/* Chart container, a bit of height for clarity */}
//       <div
//         className="bg-white dark:bg-gray-800 rounded p-4 shadow"
//         style={{ height: "400px" }}
//       >
//         <Line data={chartData} options={chartOptions} />
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// import { motion, AnimatePresence } from "framer-motion";
// import toast, { Toaster } from "react-hot-toast";
// import { FaChevronDown } from "react-icons/fa";

// // Register chart components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const labels = [
//   "BUSINESS PERFORMANCE",
//   "BUSINESS RISK",
//   "MANAGEMENT INFORMATION SYSTEMS",
//   "CUSTOMERS AND MARKET DEMAND",
//   "SUCCESSION AND ESTATE PLANNING",
//   "STAFF",
// ];

// const dataValues = [10, 25, 60, 45, 80, 40];

// const chartOptions = {
//   responsive: true,
//   maintainAspectRatio: false,
//   scales: {
//     x: {
//       ticks: {
//         color: "#6B7280",
//       },
//       grid: {
//         display: false,
//       },
//     },
//     y: {
//       ticks: {
//         color: "#6B7280",
//       },
//       grid: {
//         color: "#E5E7EB",
//       },
//     },
//   },
//   plugins: {
//     tooltip: {
//       callbacks: {
//         title: () => "Continuous Improvement",
//         label: (context) => `Score  : ${context.parsed.y}`,
//       },
//     },
//     legend: {
//       display: false,
//     },
//   },
// };

// // To make the chart an "Area Chart," we enable fill and use a semi-transparent background color.
// const chartData = {
//   labels,
//   datasets: [
//     {
//       label: "Score",
//       data: dataValues,
//       borderColor: "#3B82F6",
//       // Use a semi-transparent fill color for the area
//       backgroundColor: "rgba(59, 130, 246, 0.2)",
//       pointRadius: 5,
//       pointHoverRadius: 7,
//       tension: 0.3,
//       fill: true, // This makes the line chart display as an area chart
//     },
//   ],
// };

// export default function RACIChart() {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="p-4 w-full mx-auto dark:bg-gray-900 dark:text-gray-100 border rounded-2xl mt-2 ">
//       {/* react-hot-toast container */}
//       <Toaster />

//       <div className="flex items-center justify-between mb-4">
//         {/* Left side: Title + Overall Score Pill */}
//         <div className="flex flex-col">
//           <h1 className="text-xl font-semibold">RACI Business</h1>
//           <div className="mt-2">
//             <span className="inline-block bg-green-100 text-green-600 rounded px-2 py-1 text-sm">
//               Overall Score : 80%
//             </span>
//           </div>
//         </div>

//         {/* Right side: date dropdown */}
//         <div className="relative">
//           <button
//             className="inline-flex items-center border dark:border-gray-700
//                        px-3 py-2 rounded bg-white dark:bg-gray-800
//                        hover:bg-gray-50 dark:hover:bg-gray-700 transition"
//             onClick={() => setOpen(!open)}
//           >
//             DD-MM-YY
//             <FaChevronDown className="ml-2" />
//           </button>
//           <AnimatePresence>
//             {open && (
//               <motion.div
//                 className="absolute right-0 mt-1 w-32 bg-white dark:bg-gray-800
//                            border dark:border-gray-700 rounded shadow z-10"
//                 initial={{ opacity: 0, y: -4 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -4 }}
//               >
//                 <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
//                   01-01-2025
//                 </div>
//                 <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
//                   02-12-2024
//                 </div>
//                 <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
//                   10-11-2023
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>

//       {/* Chart container */}
//       <div
//         className="bg-white dark:bg-gray-800 rounded p-4 shadow"
//         style={{ height: "400px" }}
//       >
//         <Line data={chartData} options={chartOptions} />
//       </div>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// import { motion, AnimatePresence } from "framer-motion";
// import toast, { Toaster } from "react-hot-toast";
// import { FaChevronDown } from "react-icons/fa";

// // Register chart components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const labels = [
//   "BUSINESS PERFORMANCE",
//   "BUSINESS RISK",
//   "MANAGEMENT INFORMATION SYSTEMS",
//   "CUSTOMERS AND MARKET DEMAND",
//   "SUCCESSION AND ESTATE PLANNING",
//   "STAFF",
// ];

// const dataValues = [10, 25, 60, 45, 80, 40];

// const chartOptions = {
//   responsive: true,
//   maintainAspectRatio: false,
//   scales: {
//     x: {
//       ticks: {
//         color: "#6B7280",
//       },
//       grid: {
//         display: false,
//       },
//     },
//     y: {
//       beginAtZero: true, // Start the fill at y = 0
//       ticks: {
//         color: "#6B7280",
//       },
//       grid: {
//         color: "#E5E7EB",
//       },
//     },
//   },
//   plugins: {
//     title: {
//       display: true,
//       text: "Chart.js Line Chart", // Chart title
//     },
//     tooltip: {
//       callbacks: {
//         title: () => "Continuous Improvement",
//         label: (context) => `Score : ${context.parsed.y}`,
//       },
//     },
//     legend: {
//       display: true, // Show legend so it looks more like the classic example
//     },
//   },
// };

// // Updated dataset for area fill
// const chartData = {
//   labels,
//   datasets: [
//     {
//       label: "Score",
//       data: dataValues,
//       // Semi-transparent fill color for the area
//       backgroundColor: "rgba(59, 130, 246, 0.2)",
//       borderColor: "rgba(59, 130, 246, 1)",
//       fill: true,
//       borderWidth: 2,
//       tension: 0.4,
//       pointRadius: 5,
//       pointHoverRadius: 7,
//     },
//   ],
// };

// export default function RACIChart() {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="p-4 w-full mx-auto dark:bg-gray-900 dark:text-gray-100 border rounded-2xl mt-2 ">
//       <Toaster />

//       <div className="flex items-center justify-between mb-4">
//         <div className="flex flex-col">
//           <h1 className="text-xl font-semibold">RACI Business</h1>
//           <div className="mt-2">
//             <span className="inline-block bg-green-100 text-green-600 rounded px-2 py-1 text-sm">
//               Overall Score : 80%
//             </span>
//           </div>
//         </div>

//         <div className="relative">
//           <button
//             className="inline-flex items-center border dark:border-gray-700
//                        px-3 py-2 rounded bg-white dark:bg-gray-800
//                        hover:bg-gray-50 dark:hover:bg-gray-700 transition"
//             onClick={() => setOpen(!open)}
//           >
//             DD-MM-YY
//             <FaChevronDown className="ml-2" />
//           </button>
//           <AnimatePresence>
//             {open && (
//               <motion.div
//                 className="absolute right-0 mt-1 w-32 bg-white dark:bg-gray-800
//                            border dark:border-gray-700 rounded shadow z-10"
//                 initial={{ opacity: 0, y: -4 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -4 }}
//               >
//                 <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
//                   01-01-2025
//                 </div>
//                 <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
//                   02-12-2024
//                 </div>
//                 <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
//                   10-11-2023
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>

//       {/* Chart container */}
//       <div
//         className="bg-white dark:bg-gray-800 rounded p-4 shadow"
//         style={{ height: "400px" }}
//       >
//         <Line data={chartData} options={chartOptions} />
//       </div>
//     </div>
//   );
// }

