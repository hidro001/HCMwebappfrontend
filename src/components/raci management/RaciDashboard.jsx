// import React, { useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import { motion } from 'framer-motion';
// import { toast, Toaster } from 'react-hot-toast';
// import { FaEye } from 'react-icons/fa';

// // Import & register Chart.js components
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function App() {
//   // State to track theme (light/dark)
//   const [darkMode, setDarkMode] = useState(false);

//   // Dummy line chart data (Operations)
//   const dataOperations = {
//     labels: [
//       'Business Planning',
//       'Leadership',
//       'Productivity',
//       'Marketing',
//       'Personal Dev.',
//       'Continuous Improvement',
//       'Revenue/Sales',
//       'Employee Engagement',
//       'Reduction in Inefficiencies',
//       'Customer Service',
//     ],
//     datasets: [
//       {
//         label: 'Operations Score',
//         data: [10, 30, 50, 40, 90, 17, 55, 45, 30, 20],
//         fill: false,
//         borderColor: '#4F46E5',
//         tension: 0.4,
//       },
//     ],
//   };

//   // Dummy line chart data (Business)
//   const dataBusiness = {
//     labels: [
//       'Business Performance',
//       'Business Risk',
//       'Mgmt Info Systems',
//       'Continuous Improvement',
//       'Customers & Demand',
//       'Succession Planning',
//     ],
//     datasets: [
//       {
//         label: 'Business Score',
//         data: [15, 60, 95, 17, 45, 30],
//         fill: false,
//         borderColor: '#4F46E5',
//         tension: 0.4,
//       },
//     ],
//   };

//   // Shared chart options
//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: { display: false },
//       title: { display: false },
//       tooltip: { enabled: true },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 100,
//       },
//     },
//   };

//   // Dummy table data
//   const tableData = [
//     { id: 1, date: '02-12-2024', score: '60.00%' },
//     { id: 2, date: '02-12-2024', score: '60.00%' },
//     { id: 3, date: '02-12-2024', score: '60.00%' },
//     { id: 4, date: '02-12-2024', score: '60.00%' },
//     { id: 5, date: '02-12-2024', score: '60.00%' },
//   ];

//   // Example "View" click handler
//   const handleViewDetails = (id) => {
//     toast.success(`Viewing details for row #${id}`);
//   };

//   // Toggle theme
//   const toggleTheme = () => {
//     setDarkMode((prev) => !prev);
//   };

//   return (
//     // We conditionally apply the 'dark' class at the top level
//     <div className={darkMode ? 'dark min-h-screen' : 'min-h-screen'}>
//       {/* The inner container handles background + text color for each theme */}
//       <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 p-4">
//         <Toaster position="top-right" />

//         {/* Theme toggle button */}
//         <div className="flex justify-end mb-4">
//           <button
//             onClick={toggleTheme}
//             className="border rounded px-3 py-1 
//                        bg-gray-200 text-gray-800 
//                        dark:bg-gray-800 dark:text-gray-200 
//                        transition-colors"
//           >
//             {darkMode ? 'Light Mode' : 'Dark Mode'}
//           </button>
//         </div>

//         {/* Page Title */}
//         <motion.h1
//           className="text-3xl font-bold mb-6 text-center"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           RACI Dashboard
//         </motion.h1>

//         {/* Charts Row */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* RACI Operations */}
//           <motion.div
//             className="dark:bg-gray-800 bg-gray-100 p-4 rounded shadow"
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//           >
//             <div className="flex items-center justify-between mb-2">
//               <h2 className="text-lg font-semibold">RACI Operations</h2>
//               <p className="text-green-500 dark:text-green-400">Overall Score : 80%</p>
//             </div>

//             <div className="flex items-center justify-end mb-4">
//               <select className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
//                 <option value="dd-mm-yy">DD-MM-YY</option>
//                 <option value="mm-dd-yy">MM-DD-YY</option>
//               </select>
//             </div>

//             <div className="h-64">
//               <Line data={dataOperations} options={chartOptions} />
//             </div>
//           </motion.div>

//           {/* RACI Business */}
//           <motion.div
//             className="dark:bg-gray-800 bg-gray-100 p-4 rounded shadow"
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//           >
//             <div className="flex items-center justify-between mb-2">
//               <h2 className="text-lg font-semibold">RACI Business</h2>
//               <p className="text-green-500 dark:text-green-400">Overall Score : 80%</p>
//             </div>

//             <div className="flex items-center justify-end mb-4">
//               <select className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
//                 <option value="dd-mm-yy">DD-MM-YY</option>
//                 <option value="mm-dd-yy">MM-DD-YY</option>
//               </select>
//             </div>

//             <div className="h-64">
//               <Line data={dataBusiness} options={chartOptions} />
//             </div>
//           </motion.div>
//         </div>

//         {/* Tables Row */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
//           {/* RACI Operations Table */}
//           <motion.div
//             className="dark:bg-gray-800 bg-gray-100 p-4 rounded shadow"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//           >
//             <h3 className="text-lg font-semibold mb-4">RACI Operations</h3>
//             <div className="overflow-x-auto">
//               <table className="min-w-full text-left">
//                 <thead>
//                   <tr className="border-b border-gray-300 dark:border-gray-700">
//                     <th className="py-2">SNO.</th>
//                     <th className="py-2">Date</th>
//                     <th className="py-2">Overall Score</th>
//                     <th className="py-2">Details</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {tableData.map((row) => (
//                     <tr key={row.id} className="border-b border-gray-200 dark:border-gray-700">
//                       <td className="py-2">{row.id}</td>
//                       <td className="py-2">{row.date}</td>
//                       <td className="py-2">{row.score}</td>
//                       <td className="py-2">
//                         <button
//                           onClick={() => handleViewDetails(row.id)}
//                           className="text-blue-500 dark:text-blue-400 hover:underline flex items-center gap-1"
//                         >
//                           <FaEye />
//                           View
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <div className="mt-2 text-right">
//               <button className="text-blue-500 dark:text-blue-400 hover:underline">
//                 See All
//               </button>
//             </div>
//           </motion.div>

//           {/* RACI Business Table */}
//           <motion.div
//             className="dark:bg-gray-800 bg-gray-100 p-4 rounded shadow"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//           >
//             <h3 className="text-lg font-semibold mb-4">RACI Business</h3>
//             <div className="overflow-x-auto">
//               <table className="min-w-full text-left">
//                 <thead>
//                   <tr className="border-b border-gray-300 dark:border-gray-700">
//                     <th className="py-2">SNO.</th>
//                     <th className="py-2">Date</th>
//                     <th className="py-2">Overall Score</th>
//                     <th className="py-2">Details</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {tableData.map((row) => (
//                     <tr key={row.id} className="border-b border-gray-200 dark:border-gray-700">
//                       <td className="py-2">{row.id}</td>
//                       <td className="py-2">{row.date}</td>
//                       <td className="py-2">{row.score}</td>
//                       <td className="py-2">
//                         <button
//                           onClick={() => handleViewDetails(row.id)}
//                           className="text-blue-500 dark:text-blue-400 hover:underline flex items-center gap-1"
//                         >
//                           <FaEye />
//                           View
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <div className="mt-2 text-right">
//               <button className="text-blue-500 dark:text-blue-400 hover:underline">
//                 See All
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import { motion } from 'framer-motion';
// import { toast, Toaster } from 'react-hot-toast';
// import { FaEye } from 'react-icons/fa';

// // Chart.js modules
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function RaciDashboard() {
//   // Sample chart data (Operations)
//   const dataOperations = {
//     labels: [
//       'Business Planning',
//       'Leadership',
//       'Productivity',
//       'Marketing',
//       'Personal Dev.',
//       'Continuous Improvement',
//       'Revenue/Sales',
//       'Employee Engagement',
//       'Reduction in Inefficiencies',
//       'Customer Service',
//     ],
//     datasets: [
//       {
//         label: 'Operations Score',
//         data: [10, 40, 60, 30, 90, 50, 55, 35, 25, 70],
//         fill: false,
//         borderColor: '#6366F1', // Indigo-500
//         tension: 0.4,
//       },
//     ],
//   };

//   // Sample chart data (Business)
//   const dataBusiness = {
//     labels: [
//       'Business Performance',
//       'Business Risk',
//       'Mgmt Info Systems',
//       'Continuous Improvement',
//       'Customers & Demand',
//       'Succession Planning',
//     ],
//     datasets: [
//       {
//         label: 'Business Score',
//         data: [15, 70, 95, 40, 45, 30],
//         fill: false,
//         borderColor: '#6366F1',
//         tension: 0.4,
//       },
//     ],
//   };

//   // Chart options
//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false, // allows custom height
//     plugins: {
//       legend: { display: false },
//       title: { display: false },
//       tooltip: { enabled: true },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 100,
//         // Provide a light-mode and dark-mode color
//         grid: { color: '#E5E7EB', dark: { color: '#374151' } }, 
//         ticks: { color: '#4B5563', dark: { color: '#9CA3AF' } },
//       },
//       x: {
//         grid: { color: '#E5E7EB', dark: { color: '#374151' } },
//         ticks: { color: '#4B5563', dark: { color: '#9CA3AF' } },
//       },
//     },
//   };

//   // Dummy table data
//   const tableData = [
//     { id: 1, date: '02-12-2024', score: '60.00%' },
//     { id: 2, date: '02-12-2024', score: '60.00%' },
//     { id: 3, date: '02-12-2024', score: '60.00%' },
//     { id: 4, date: '02-12-2024', score: '60.00%' },
//     { id: 5, date: '02-12-2024', score: '60.00%' },
//   ];

//   // Toast on "View"
//   const handleViewDetails = (id) => {
//     toast.success(`Viewing details for row #${id}`);
//   };

//   return (
  
//     <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 p-6">
   

//       <motion.h1
//         className="text-3xl font-bold mb-8 text-center"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         RACI Dashboard
//       </motion.h1>

//       {/* Top row: two charts */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
// {/*         
//         <motion.div
//           className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md "
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//         >
//           <div className="flex items-center justify-between">
//             <h2 className="text-lg font-semibold">RACI Operations</h2>
//             <p className="text-green-600 dark:text-green-400">Overall Score : 80%</p>
//           </div>

//           <div className="flex items-center justify-end mt-2 mb-4">
//             <select className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm">
//               <option value="dd-mm-yy">DD-MM-YY</option>
//               <option value="mm-dd-yy">MM-DD-YY</option>
//             </select>
//           </div>

//           <div className="w-full h-60 ">
//             <Line data={dataOperations} options={chartOptions} />
//           </div>
//         </motion.div> */}

// <motion.div
//   className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md"
//   initial={{ opacity: 0, x: -20 }}
//   animate={{ opacity: 1, x: 0 }}
// >
//   {/* Top row: Title (left) and date dropdown (right) */}
//   <div className="flex items-center justify-between mb-2">
//     <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
//       RACI Operations
//     </h2>
//     <div>
//       <select className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
//                          text-sm px-3 py-1 rounded text-gray-700 dark:text-gray-300">
//         <option value="dd-mm-yy">DD-MM-YY</option>
//         <option value="mm-dd-yy">MM-DD-YY</option>
//       </select>
//     </div>
//   </div>

//   {/* Overall Score badge */}
//   <div className="mb-4">
//     <span className="inline-block bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 
//                      px-3 py-1 rounded-full text-sm">
//       Overall Score : 80%
//     </span>
//   </div>

//   {/* Chart area */}
//   <div className="w-full h-60">
//     <Line data={dataOperations} options={chartOptions} />
//   </div>
// </motion.div>


//         <motion.div
//           className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md"
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//         >
//           <div className="flex items-center justify-between">
//             <h2 className="text-lg font-semibold">RACI Business</h2>
//             <p className="text-green-600 dark:text-green-400">Overall Score : 80%</p>
//           </div>

//           <div className="flex items-center justify-end mt-2 mb-4">
//             <select className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm">
//               <option value="dd-mm-yy">DD-MM-YY</option>
//               <option value="mm-dd-yy">MM-DD-YY</option>
//             </select>
//           </div>

//           <div className="w-full h-60">
//             <Line data={dataBusiness} options={chartOptions} />
//           </div>
//         </motion.div>
//       </div>

//       {/* Bottom row: two tables */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* RACI Operations Table */}
//         <motion.div
//   className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md"
//   initial={{ opacity: 0, y: 20 }}
//   whileInView={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.5 }}
//   viewport={{ once: true }}
// >
//   <h3 className="text-lg font-semibold mb-4">RACI Operations</h3>

//   <div className="overflow-x-auto">
//     {/* Add border and use border-collapse for a grid-like table. */}
//     <table className="w-full table-auto border border-gray-300 dark:border-gray-700 border-collapse">
//       <thead>
//         <tr>
//           {/* Each cell (th, td) gets its own border. */}
//           <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">SNO.</th>
//           <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">Date</th>
//           <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">Overall Score</th>
//           <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">Details</th>
//         </tr>
//       </thead>
//       <tbody>
//         {tableData.map((row) => (
//           <tr
//             key={row.id}
//             className="hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
//           >
//             <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">{row.id}</td>
//             <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">{row.date}</td>
//             <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">{row.score}</td>
//             <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">
//               <button
//                 onClick={() => handleViewDetails(row.id)}
//                 className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
//               >
//                 <FaEye />
//                 <span>View</span>
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>

//   <div className="mt-2 text-right">
//     <button className="text-blue-600 dark:text-blue-400 hover:underline">See All</button>
//   </div>
// </motion.div>


//         {/* RACI Business Table */}
//         <motion.div
//   className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md"
//   initial={{ opacity: 0, y: 20 }}
//   whileInView={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.5 }}
//   viewport={{ once: true }}
// >
//   <h3 className="text-lg font-semibold mb-4">RACI Business</h3>

//   <div className="overflow-x-auto">
//     {/* Add border on the table and use border-collapse. */}
//     <table className="w-full table-auto border border-gray-300 dark:border-gray-700 border-collapse">
//       <thead>
//         <tr>
//           {/* Each header cell gets a border. */}
//           <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">SNO.</th>
//           <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">Date</th>
//           <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">Overall Score</th>
//           <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">Details</th>
//         </tr>
//       </thead>
//       <tbody>
//         {tableData.map((row) => (
//           <tr
//             key={row.id}
//             className="hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
//           >
//             {/* Each cell gets a border. */}
//             <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">{row.id}</td>
//             <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">{row.date}</td>
//             <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">{row.score}</td>
//             <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">
//               <button
//                 onClick={() => handleViewDetails(row.id)}
//                 className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
//               >
//                 <FaEye />
//                 <span>View</span>
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>

//   <div className="mt-2 text-right">
//     <button className="text-blue-600 dark:text-blue-400 hover:underline">See All</button>
//   </div>
// </motion.div>

//       </div>
//     </div>
//   );
// }

// export default RaciDashboard;

// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import { motion } from 'framer-motion';
// import { toast, Toaster } from 'react-hot-toast';
// import { FaEye } from 'react-icons/fa';

// // Chart.js modules
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function RaciDashboard() {
//   // Sample chart data (Operations)
//   const dataOperations = {
//     labels: [
//       'Business Planning',
//       'Leadership',
//       'Productivity',
//       'Marketing',
//       'Personal Dev.',
//       'Continuous Improvement',
//       'Revenue/Sales',
//       'Employee Engagement',
//       'Reduction in Inefficiencies',
//       'Customer Service',
//     ],
//     datasets: [
//       {
//         label: 'Operations Score',
//         data: [10, 40, 60, 30, 90, 50, 55, 35, 25, 70],
//         fill: false,
//         borderColor: '#6366F1', // Indigo-500
//         tension: 0.4,
//       },
//     ],
//   };

//   // Sample chart data (Business)
//   const dataBusiness = {
//     labels: [
//       'Business Performance',
//       'Business Risk',
//       'Mgmt Info Systems',
//       'Continuous Improvement',
//       'Customers & Demand',
//       'Succession Planning',
//     ],
//     datasets: [
//       {
//         label: 'Business Score',
//         data: [15, 70, 95, 40, 45, 30],
//         fill: false,
//         borderColor: '#6366F1',
//         tension: 0.4,
//       },
//     ],
//   };

//   // Chart options
//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     layout: {
//       // Remove default padding to avoid extra gaps
//       padding: {
//         left: 0,
//         right: 0,
//         top: 0,
//         bottom: 0,
//       },
//     },
//     plugins: {
//       legend: { display: false },
//       title: { display: false },
//       tooltip: { enabled: true },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 100,
//         // Provide light-mode and dark-mode colors
//         grid: { color: '#E5E7EB', dark: { color: '#374151' } },
//         ticks: { color: '#4B5563', dark: { color: '#9CA3AF' } },
//       },
//       x: {
//         // Disables the initial offset
//         offset: false,
//         grid: { color: '#E5E7EB', dark: { color: '#374151' } },
//         ticks: { color: '#4B5563', dark: { color: '#9CA3AF' } },
//       },
//     },
//   };

//   // Dummy table data
//   const tableData = [
//     { id: 1, date: '02-12-2024', score: '60.00%' },
//     { id: 2, date: '02-12-2024', score: '60.00%' },
//     { id: 3, date: '02-12-2024', score: '60.00%' },
//     { id: 4, date: '02-12-2024', score: '60.00%' },
//     { id: 5, date: '02-12-2024', score: '60.00%' },
//   ];

//   // Toast on "View"
//   const handleViewDetails = (id) => {
//     toast.success(`Viewing details for row #${id}`);
//   };

//   return (
//     <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 p-6">
//       <motion.h1
//         className="text-3xl font-bold mb-8 text-center"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         RACI Dashboard
//       </motion.h1>

//       {/* Top row: two charts */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         {/* RACI Operations Chart */}
//         <motion.div
//           className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md"
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//         >
//           {/* Title & Dropdown */}
//           <div className="flex items-center justify-between mb-2">
//             <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
//               RACI Operations
//             </h2>
//             <div>
//               <select className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
//                                  text-sm px-3 py-1 rounded text-gray-700 dark:text-gray-300">
//                 <option value="dd-mm-yy">DD-MM-YY</option>
//                 <option value="mm-dd-yy">MM-DD-YY</option>
//               </select>
//             </div>
//           </div>

//           {/* Overall Score badge */}
//           <div className="mb-4">
//             <span className="inline-block bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 
//                              px-3 py-1 rounded-full text-sm">
//               Overall Score : 80%
//             </span>
//           </div>

//           {/* Chart area */}
//           <div className="w-full h-60">
//             <Line data={dataOperations} options={chartOptions} />
//           </div>
//         </motion.div>

//         {/* RACI Business Chart */}
//         <motion.div
//           className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md"
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//         >
//           <div className="flex items-center justify-between">
//             <h2 className="text-lg font-semibold">RACI Business</h2>
//             <p className="text-green-600 dark:text-green-400">Overall Score : 80%</p>
//           </div>

//           <div className="flex items-center justify-end mt-2 mb-4">
//             <select className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm">
//               <option value="dd-mm-yy">DD-MM-YY</option>
//               <option value="mm-dd-yy">MM-DD-YY</option>
//             </select>
//           </div>

//           <div className="w-full h-60">
//             <Line data={dataBusiness} options={chartOptions} />
//           </div>
//         </motion.div>
//       </div>

//       {/* Bottom row: two tables */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* RACI Operations Table */}
//         <motion.div
//           className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true }}
//         >
//           <h3 className="text-lg font-semibold mb-4">RACI Operations</h3>

//           <div className="overflow-x-auto">
//             <table className="w-full table-auto border border-gray-300 dark:border-gray-700 border-collapse">
//               <thead>
//                 <tr>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">SNO.</th>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">Date</th>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">Overall Score</th>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">Details</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tableData.map((row) => (
//                   <tr
//                     key={row.id}
//                     className="hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
//                   >
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">{row.id}</td>
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">{row.date}</td>
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">{row.score}</td>
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">
//                       <button
//                         onClick={() => handleViewDetails(row.id)}
//                         className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
//                       >
//                         <FaEye />
//                         <span>View</span>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="mt-2 text-right">
//             <button className="text-blue-600 dark:text-blue-400 hover:underline">See All</button>
//           </div>
//         </motion.div>

//         {/* RACI Business Table */}
//         <motion.div
//           className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true }}
//         >
//           <h3 className="text-lg font-semibold mb-4">RACI Business</h3>

//           <div className="overflow-x-auto">
//             <table className="w-full table-auto border border-gray-300 dark:border-gray-700 border-collapse">
//               <thead>
//                 <tr>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">SNO.</th>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">Date</th>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">Overall Score</th>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">Details</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tableData.map((row) => (
//                   <tr
//                     key={row.id}
//                     className="hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
//                   >
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">{row.id}</td>
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">{row.date}</td>
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">{row.score}</td>
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">
//                       <button
//                         onClick={() => handleViewDetails(row.id)}
//                         className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
//                       >
//                         <FaEye />
//                         <span>View</span>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="mt-2 text-right">
//             <button className="text-blue-600 dark:text-blue-400 hover:underline">See All</button>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// export default RaciDashboard;

// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import { motion } from 'framer-motion';
// import { toast, Toaster } from 'react-hot-toast';
// import { FaEye } from 'react-icons/fa';

// // Chart.js modules
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function RaciDashboard() {
//   // Use the SAME labels and data in both charts:
//   const sharedLabels = [
//     'Business Planning',
//     'Leadership',
//     'Productivity',
//     'Marketing',
//     'Personal Dev.',
//     'Continuous Improvement',
//     'Revenue/Sales',
//     'Employee Engagement',
//     'Reduction in Inefficiencies',
//     'Customer Service',
//   ];

//   const sharedData = [10, 40, 60, 30, 90, 50, 55, 35, 25, 70];

//   // Chart data (Operations) — now identical to Business
//   const dataOperations = {
//     labels: sharedLabels,
//     datasets: [
//       {
//         label: 'Operations Score',
//         data: sharedData,
//         fill: false,
//         borderColor: '#6366F1', // Indigo-500
//         tension: 0.4,
//       },
//     ],
//   };

//   // Chart data (Business) — now identical to Operations
//   const dataBusiness = {
//     labels: sharedLabels,
//     datasets: [
//       {
//         label: 'Business Score',
//         data: sharedData,
//         fill: false,
//         borderColor: '#6366F1',
//         tension: 0.4,
//       },
//     ],
//   };

//   // Chart options
//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     layout: {
//       padding: {
//         left: 0,
//         right: 0,
//         top: 0,
//         bottom: 0,
//       },
//     },
//     plugins: {
//       legend: { display: false },
//       title: { display: false },
//       tooltip: { enabled: true },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 100,
//         grid: { color: '#E5E7EB' },
//         ticks: { color: '#4B5563' },
//       },
//       x: {
//         offset: false,
//         grid: { color: '#E5E7EB' },
//         ticks: { color: '#4B5563' },
//       },
//     },
//   };

//   // Dummy table data
//   const tableData = [
//     { id: 1, date: '02-12-2024', score: '60.00%' },
//     { id: 2, date: '02-12-2024', score: '60.00%' },
//     { id: 3, date: '02-12-2024', score: '60.00%' },
//     { id: 4, date: '02-12-2024', score: '60.00%' },
//     { id: 5, date: '02-12-2024', score: '60.00%' },
//   ];

//   // Toast on "View"
//   const handleViewDetails = (id) => {
//     toast.success(`Viewing details for row #${id}`);
//   };

//   return (
//     <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 p-6">
//       <motion.h1
//         className="text-3xl font-bold mb-8 text-center"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         RACI Dashboard
//       </motion.h1>

//       {/* Top row: two charts */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         {/* RACI Operations Chart */}
//         <motion.div
//           className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md"
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//         >
//           {/* Title & Dropdown */}
//           <div className="flex items-center justify-between mb-2">
//             <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
//               RACI Operations
//             </h2>
//             <div>
//               <select className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
//                                  text-sm px-3 py-1 rounded text-gray-700 dark:text-gray-300">
//                 <option value="dd-mm-yy">DD-MM-YY</option>
//                 <option value="mm-dd-yy">MM-DD-YY</option>
//               </select>
//             </div>
//           </div>

//           {/* Overall Score badge */}
//           <div className="mb-4">
//             <span className="inline-block bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 
//                              px-3 py-1 rounded-full text-sm">
//               Overall Score : 80%
//             </span>
//           </div>

//           {/* Chart area */}
//           <div className="w-full h-60">
//             <Line data={dataOperations} options={chartOptions} />
//           </div>
//         </motion.div>

//         {/* RACI Business Chart */}
//         <motion.div
//           className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md"
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//         >
//           <div className="flex items-center justify-between">
//             <h2 className="text-lg font-semibold">RACI Business</h2>
//             <p className="text-green-600 dark:text-green-400">Overall Score : 80%</p>
//           </div>

//           <div className="flex items-center justify-end mt-2 mb-4">
//             <select className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm">
//               <option value="dd-mm-yy">DD-MM-YY</option>
//               <option value="mm-dd-yy">MM-DD-YY</option>
//             </select>
//           </div>

//           <div className="w-full h-60">
//             <Line data={dataBusiness} options={chartOptions} />
//           </div>
//         </motion.div>
//       </div>

//       {/* Bottom row: two tables */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* RACI Operations Table */}
//         <motion.div
//           className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true }}
//         >
//           <h3 className="text-lg font-semibold mb-4">RACI Operations</h3>

//           <div className="overflow-x-auto">
//             <table className="w-full table-auto border border-gray-300 dark:border-gray-700 border-collapse">
//               <thead>
//                 <tr>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">SNO.</th>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">Date</th>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">Overall Score</th>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">Details</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tableData.map((row) => (
//                   <tr
//                     key={row.id}
//                     className="hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
//                   >
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">{row.id}</td>
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">{row.date}</td>
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">{row.score}</td>
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">
//                       <button
//                         onClick={() => handleViewDetails(row.id)}
//                         className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
//                       >
//                         <FaEye />
//                         <span>View</span>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="mt-2 text-right">
//             <button className="text-blue-600 dark:text-blue-400 hover:underline">See All</button>
//           </div>
//         </motion.div>

//         {/* RACI Business Table */}
//         <motion.div
//           className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true }}
//         >
//           <h3 className="text-lg font-semibold mb-4">RACI Business</h3>

//           <div className="overflow-x-auto">
//             <table className="w-full table-auto border border-gray-300 dark:border-gray-700 border-collapse">
//               <thead>
//                 <tr>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">SNO.</th>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">Date</th>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">Overall Score</th>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">Details</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tableData.map((row) => (
//                   <tr
//                     key={row.id}
//                     className="hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
//                   >
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">{row.id}</td>
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">{row.date}</td>
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">{row.score}</td>
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">
//                       <button
//                         onClick={() => handleViewDetails(row.id)}
//                         className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
//                       >
//                         <FaEye />
//                         <span>View</span>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="mt-2 text-right">
//             <button className="text-blue-600 dark:text-blue-400 hover:underline">See All</button>
//           </div>
//         </motion.div>
//       </div>

//       <Toaster position="bottom-right" />
//     </div>
//   );
// }

// export default RaciDashboard;

// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import { motion } from 'framer-motion';
// import { toast, Toaster } from 'react-hot-toast';
// import { FaEye } from 'react-icons/fa';


// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function RaciDashboard() {
//   const dataOperations = {
//     labels: [
//       'Business Planning',
//       'Leadership',
//       'Profitability',
//       'Marketing',
//       'Personal Development',
//       'Continuous Improvement',
//       'Revenue/Sales',
//       'Employee Engagement',
//       'Reduction in Inefficiencies',
//       'Customer Service',
//     ],
//     datasets: [
//       {
//         label: 'Operations Score',
//         data: [5, 25, 40, 35, 60, 17, 45, 28, 13, 55],
//         fill: false,
//         borderColor: '#6366F1',
//         tension: 0.4,
//       },
//     ],
//   };

//   const dataBusiness = {
//     labels: [
//       'Business Performance',
//       'Business Risk',
//       'Management Information Systems',
//       'Continuous Improvement',
//       'Customers and Market Demand',
//       'Succession and Estate Planning',
//     ],
//     datasets: [
//       {
//         label: 'Business Score',
//         data: [10, 30, 80, 17, 47, 25], 
//         fill: false,
//         borderColor: '#6366F1',
//         tension: 0.4,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     layout: {
//       padding: {
//         left: 0,
//         right: 0,
//         top: 0,
//         bottom: 0,
//       },
//     },
//     plugins: {
//       legend: { display: false },
//       title: { display: false },
//       tooltip: { enabled: true },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 100,
//         grid: { color: '#E5E7EB' },
//         ticks: { color: '#4B5563' },
//       },
//       x: {
//         offset: false,
//         grid: { color: '#E5E7EB' },
//         ticks: { color: '#4B5563' },
//       },
//     },
//   };

//   const tableData = [
//     { id: 1, date: '02-12-2024', score: '60.00%' },
//     { id: 2, date: '02-12-2024', score: '60.00%' },
//     { id: 3, date: '02-12-2024', score: '60.00%' },
//     { id: 4, date: '02-12-2024', score: '60.00%' },
//     { id: 5, date: '02-12-2024', score: '60.00%' },
//   ];

 

//   return (
//     <div className=" bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100 p-2 rounded-lg ">
//       <motion.h1
//         className="text-3xl font-bold mb-8 text-center"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         RACI Dashboard
//       </motion.h1>

//       {/* Top row: two charts */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         {/* RACI Operations Chart */}
//         <motion.div
//           className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md"
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//         >
//           {/* Title & Dropdown */}
//           <div className="flex items-center justify-between mb-2">
//             <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
//               RACI Operations
//             </h2>
//             <div>
//               <select className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
//                                  text-sm px-3 py-1 rounded text-gray-700 dark:text-gray-300">
//                 <option value="dd-mm-yy">DD-MM-YY</option>
//                 <option value="mm-dd-yy">MM-DD-YY</option>
//               </select>
//             </div>
//           </div>

//           {/* Overall Score badge */}
//           <div className="mb-4">
//             <span className="inline-block bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 
//                              px-3 py-1 rounded-full text-sm">
//               Overall Score : 80%
//             </span>
//           </div>

//           {/* Chart area */}
//           <div className="w-full h-60">
//             <Line data={dataOperations} options={chartOptions} />
//           </div>
//         </motion.div>

//         {/* RACI Business Chart */}
//         <motion.div
//           className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md"
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//         >
//           {/* Title & Dropdown */}
//           <div className="flex items-center justify-between mb-2">
//             <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
//               RACI Operations
//             </h2>
//             <div>
//               <select className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
//                                  text-sm px-3 py-1 rounded text-gray-700 dark:text-gray-300">
//                 <option value="dd-mm-yy">DD-MM-YY</option>
//                 <option value="mm-dd-yy">MM-DD-YY</option>
//               </select>
//             </div>
//           </div>

//           {/* Overall Score badge */}
//           <div className="mb-4">
//             <span className="inline-block bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 
//                              px-3 py-1 rounded-full text-sm">
//               Overall Score : 80%
//             </span>
//           </div>

//           {/* Chart area */}
//           <div className="w-full h-60">
//           <Line data={dataBusiness} options={chartOptions} />
//           </div>
//         </motion.div>
//       </div>





//       {/* Bottom row: two tables */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* RACI Operations Table */}
//         <motion.div
//           className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true }}
//         >
//           <h3 className="text-lg font-semibold mb-4">RACI Operations</h3>

//           <div className="overflow-x-auto">
//             <table className="w-full table-auto border border-gray-300 dark:border-gray-700 border-collapse">
//               <thead>
//                 <tr>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">SNO.</th>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">Date</th>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">Overall Score</th>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">Details</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tableData.map((row) => (
//                   <tr
//                     key={row.id}
//                     className="hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
//                   >
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">{row.id}</td>
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">{row.date}</td>
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">{row.score}</td>
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">
//                       <button
//                         className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
//                       >
//                         <FaEye />
//                         <span>View</span>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="mt-2 text-right">
//             <button className="text-blue-600 dark:text-blue-400 hover:underline">See All</button>
//           </div>
//         </motion.div>

//         {/* RACI Business Table */}
//         <motion.div
//           className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true }}
//         >
//           <h3 className="text-lg font-semibold mb-4">RACI Business</h3>

//           <div className="overflow-x-auto">
//             <table className="w-full table-auto border border-gray-300 dark:border-gray-700 border-collapse">
//               <thead>
//                 <tr>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">SNO.</th>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">Date</th>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">Overall Score</th>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">Details</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tableData.map((row) => (
//                   <tr
//                     key={row.id}
//                     className="hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
//                   >
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">{row.id}</td>
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">{row.date}</td>
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">{row.score}</td>
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">
//                       <button
//                         className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
//                       >
//                         <FaEye />
//                         <span>View</span>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="mt-2 text-right">
//             <button className="text-blue-600 dark:text-blue-400 hover:underline">See All</button>
//           </div>
//         </motion.div>
//       </div>

//       <Toaster position="bottom-right" />
//     </div>
//   );
// }

// export default RaciDashboard;


import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import { FaEye } from 'react-icons/fa';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function RaciDashboard() {
  // Original default data sets
  const dataOperationsDefault = {
    labels: [
      'Business Planning',
      'Leadership',
      'Profitability',
      'Marketing',
      'Personal Development',
      'Continuous Improvement',
      'Revenue/Sales',
      'Employee Engagement',
      'Reduction in Inefficiencies',
      'Customer Service',
    ],
    datasets: [
      {
        label: 'Operations Score',
        data: [5, 25, 40, 35, 60, 17, 45, 28, 13, 55],
        fill: false,
        borderColor: '#6366F1',
        tension: 0.4,
      },
    ],
  };

  const dataOperationsAlternate = {
    labels: [
      'Business Planning',
      'Leadership',
      'Profitability',
      'Marketing',
      'Personal Development',
      'Continuous Improvement',
      'Revenue/Sales',
      'Employee Engagement',
      'Reduction in Inefficiencies',
      'Customer Service',
    ],
    datasets: [
      {
        label: 'Operations Score',
        data: [30, 40, 10, 60, 25, 45, 65, 20, 30, 75],
        fill: false,
        borderColor: '#EF4444',
        tension: 0.4,
      },
    ],
  };

  const dataBusinessDefault = {
    labels: [
      'Business Performance',
      'Business Risk',
      'Management Information Systems',
      'Continuous Improvement',
      'Customers and Market Demand',
      'Succession and Estate Planning',
    ],
    datasets: [
      {
        label: 'Business Score',
        data: [10, 30, 80, 17, 47, 25],
        fill: false,
        borderColor: '#6366F1',
        tension: 0.4,
      },
    ],
  };

  const dataBusinessAlternate = {
    labels: [
      'Business Performance',
      'Business Risk',
      'Management Information Systems',
      'Continuous Improvement',
      'Customers and Market Demand',
      'Succession and Estate Planning',
    ],
    datasets: [
      {
        label: 'Business Score',
        data: [60, 20, 55, 35, 70, 45],
        fill: false,
        borderColor: '#EF4444',
        tension: 0.4,
      },
    ],
  };

  // Chart state
  const [operationsDate, setOperationsDate] = useState('');
  const [operationsData, setOperationsData] = useState(dataOperationsDefault);

  const [businessDate, setBusinessDate] = useState('');
  const [businessData, setBusinessData] = useState(dataBusinessDefault);

  // Handlers that swap in different dummy data based on date
  const handleOperationsDateChange = (e) => {
    const newDate = e.target.value;
    setOperationsDate(newDate);

    // Example dummy logic:
    // If user selects 2025-01-01 => show alternate data, otherwise default data
    if (newDate === '2025-01-01') {
      setOperationsData(dataOperationsAlternate);
    } else {
      setOperationsData(dataOperationsDefault);
    }
  };

  const handleBusinessDateChange = (e) => {
    const newDate = e.target.value;
    setBusinessDate(newDate);

    // Example dummy logic:
    // If user selects 2025-02-01 => show alternate data, otherwise default data
    if (newDate === '2025-02-01') {
      setBusinessData(dataBusinessAlternate);
    } else {
      setBusinessData(dataBusinessDefault);
    }
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: { color: '#E5E7EB' },
        ticks: { color: '#4B5563' },
      },
      x: {
        offset: false,
        grid: { color: '#E5E7EB' },
        ticks: { color: '#4B5563' },
      },
    },
  };

  // Table dummy data
  const tableData = [
    { id: 1, date: '02-12-2024', score: '60.00%' },
    { id: 2, date: '02-12-2024', score: '60.00%' },
    { id: 3, date: '02-12-2024', score: '60.00%' },
    { id: 4, date: '02-12-2024', score: '60.00%' },
    { id: 5, date: '02-12-2024', score: '60.00%' },
  ];

  return (
    <div className=" bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100 p-2 rounded-lg ">
      <motion.h1
        className="text-3xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        RACI Dashboard
      </motion.h1>

      {/* Top row: two charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* RACI Operations Chart */}
        <motion.div
          className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {/* Title & Date Picker */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              RACI Operations
            </h2>
            {/* Date input to trigger chart data changes */}
            <div>
              <label className="mr-2 text-sm">Select Date:</label>
              <input
                className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                  text-sm px-2 py-1 rounded text-gray-700 dark:text-gray-300"
                type="date"
                value={operationsDate}
                onChange={handleOperationsDateChange}
              />
            </div>
          </div>

          {/* Overall Score badge */}
          <div className="mb-4">
            <span
              className="inline-block bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 
            px-3 py-1 rounded-full text-sm"
            >
              Overall Score : 80%
            </span>
          </div>

          {/* Chart area */}
          <div className="w-full h-60">
            <Line data={operationsData} options={chartOptions} />
          </div>
        </motion.div>

        {/* RACI Business Chart */}
        <motion.div
          className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {/* Title & Date Picker */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              RACI Business
            </h2>
            {/* Date input to trigger chart data changes */}
            <div>
              <label className="mr-2 text-sm">Select Date:</label>
              <input
                className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                  text-sm px-2 py-1 rounded text-gray-700 dark:text-gray-300"
                type="date"
                value={businessDate}
                onChange={handleBusinessDateChange}
              />
            </div>
          </div>

          {/* Overall Score badge */}
          <div className="mb-4">
            <span
              className="inline-block bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 
            px-3 py-1 rounded-full text-sm"
            >
              Overall Score : 80%
            </span>
          </div>

          {/* Chart area */}
          <div className="w-full h-60">
            <Line data={businessData} options={chartOptions} />
          </div>
        </motion.div>
      </div>

      {/* Bottom row: two tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* RACI Operations Table */}
        <motion.div
          className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-4">RACI Operations</h3>

          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-300 dark:border-gray-700 border-collapse">
              <thead>
                <tr>
                  <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">SNO.</th>
                  <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">Date</th>
                  <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">
                    Overall Score
                  </th>
                  <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
                  >
                    <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">{row.id}</td>
                    <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">{row.date}</td>
                    <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">{row.score}</td>
                    <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">
                      <button className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                        <FaEye />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-2 text-right">
            <button className="text-blue-600 dark:text-blue-400 hover:underline">
              See All
            </button>
          </div>
        </motion.div>

        {/* RACI Business Table */}
        <motion.div
          className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-4">RACI Business</h3>

          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-300 dark:border-gray-700 border-collapse">
              <thead>
                <tr>
                  <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">SNO.</th>
                  <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">Date</th>
                  <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">
                    Overall Score
                  </th>
                  <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
                  >
                    <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">{row.id}</td>
                    <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">{row.date}</td>
                    <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">{row.score}</td>
                    <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">
                      <button className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                        <FaEye />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-2 text-right">
            <button className="text-blue-600 dark:text-blue-400 hover:underline">
              See All
            </button>
          </div>
        </motion.div>
      </div>

      <Toaster position="bottom-right" />
    </div>
  );
}

export default RaciDashboard;
