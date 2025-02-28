// // src/RaciDashboard.js
// import React, { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
// import { motion } from "framer-motion";
// import { toast, Toaster } from "react-hot-toast";
// import { FaEye } from "react-icons/fa";

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

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// // Import service functions from the API file
// import {
//   fetchOperationsScore,
//   fetchBusinessScore,
//   fetchOperationsTable,
//   fetchBusinessTable,
// } from "../../service/reciService";

// export default function RaciDashboard() {

//   // Date states for the two dashboards.
//   const [operationsDate, setOperationsDate] = useState("");
//   const [businessDate, setBusinessDate] = useState("");

//   // Chart data states for Operations.
//   const [operationsChartData, setOperationsChartData] = useState({
//     labels: [],
//     datasets: [
//       {
//         label: "Operations Score",
//         data: [],
//         borderColor: "#6366F1",
//         tension: 0.4,
//       },
//     ],
//   });
//   const [operationsOverall, setOperationsOverall] = useState(0);

//   // Chart data states for Business.
//   const [businessChartData, setBusinessChartData] = useState({
//     labels: [],
//     datasets: [
//       {
//         label: "Business Score",
//         data: [],
//         borderColor: "#6366F1",
//         tension: 0.4,
//       },
//     ],
//   });
//   const [businessOverall, setBusinessOverall] = useState(0);

//   // Table data states.
//   const [operationsTable, setOperationsTable] = useState([]);
//   const [businessTable, setBusinessTable] = useState([]);

//   // On mount, load both tables.
//   useEffect(() => {
//     loadTables();
//   }, []);

//   const loadTables = async () => {
//     try {
//       const opTableData = await fetchOperationsTable();
//       setOperationsTable(opTableData);
//     } catch (err) {
//       console.error("Error fetching operations table:", err);
//       toast.error("Failed to fetch operations table");
//     }

//     try {
//       const busTableData = await fetchBusinessTable();
//       setBusinessTable(busTableData);
//     } catch (err) {
//       console.error("Error fetching business table:", err);
//       toast.error("Failed to fetch business table");
//     }
//   };

//   // Handler: When user selects a date for Operations (RACI1).
//   const handleOperationsDateChange = async (e) => {
//     const newDate = e.target.value;
//     setOperationsDate(newDate);

//     if (!newDate) {
//       // Clear chart if no date is selected.
//       setOperationsChartData({
//         labels: [],
//         datasets: [{ label: "Operations Score", data: [] }],
//       });
//       setOperationsOverall(0);
//       return;
//     }
//     try {
//       const doc = await fetchOperationsScore(newDate);
//       if (doc) {
//         // Assume doc.metrics is an array like [{ name, score }, ...]
//         // and doc.overallScore is the overall score (e.g., 80).
//         const labels = doc.metrics.map((m) => m.name);
//         const scores = doc.metrics.map((m) => m.score);

//         setOperationsChartData({
//           labels,
//           datasets: [
//             {
//               label: "Operations Score",
//               data: scores,
//               borderColor: "#6366F1",
//               tension: 0.4,
//             },
//           ],
//         });
//         setOperationsOverall(doc.overallScore || 0);
//       }
//     } catch (err) {
//       console.error("Error fetching Operations data:", err);
//       toast.error(
//         err.response?.data?.message || "No operations data found for that date"
//       );
//       setOperationsChartData({
//         labels: [],
//         datasets: [{ label: "Operations Score", data: [] }],
//       });
//       setOperationsOverall(0);
//     }
//   };

//   // Handler: When user selects a date for Business (RACI2).
//   const handleBusinessDateChange = async (e) => {
//     const newDate = e.target.value;
//     setBusinessDate(newDate);

//     if (!newDate) {
//       // Clear chart if no date is selected.
//       setBusinessChartData({
//         labels: [],
//         datasets: [{ label: "Business Score", data: [] }],
//       });
//       setBusinessOverall(0);
//       return;
//     }
//     try {
//       const doc = await fetchBusinessScore(newDate);
//       if (doc) {
//         const labels = doc.metrics.map((m) => m.name);
//         const scores = doc.metrics.map((m) => m.score);

//         setBusinessChartData({
//           labels,
//           datasets: [
//             {
//               label: "Business Score",
//               data: scores,
//               borderColor: "#6366F1",
//               tension: 0.4,
//             },
//           ],
//         });
//         setBusinessOverall(doc.overallScore || 0);
//       }
//     } catch (err) {
//       console.error("Error fetching Business data:", err);
//       toast.error(
//         err.response?.data?.message || "No business data found for that date"
//       );
//       setBusinessChartData({
//         labels: [],
//         datasets: [{ label: "Business Score", data: [] }],
//       });
//       setBusinessOverall(0);
//     }
//   };

//   // Chart configuration options.
//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: false },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 100,
//       },
//     },
//   };

//   return (
//     <div className="bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100 p-2 rounded-lg">
//       <motion.h1
//         className="text-3xl font-bold mb-8 text-center"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         RACI Dashboard
//       </motion.h1>

//       {/* Bottom row: two tables */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Operations Table */}
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
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">
//                     SNO.
//                   </th>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">
//                     Date
//                   </th>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">
//                     Overall Score
//                   </th>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">
//                     Details
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {operationsTable.map((row, idx) => (
//                   <tr
//                     key={row._id}
//                     className="hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
//                   >
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">
//                       {idx + 1}
//                     </td>
//                     <td>
//                       {new Date(row.date).toLocaleDateString("en-GB", {
//                         day: "2-digit",
//                         month: "2-digit",
//                         year: "numeric",
//                       })}
//                     </td>
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">
//                       {row.overallScore}%
//                     </td>
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">
//                       <button className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
//                         <FaEye />
//                         <span>View</span>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//                 {operationsTable.length === 0 && (
//                   <tr>
//                     <td colSpan={4} className="text-center py-3 text-gray-500">
//                       No data found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//           <div className="mt-2 text-right">
//             <button className="text-blue-600 dark:text-blue-400 hover:underline">
//               See All
//             </button>
//           </div>
//         </motion.div>

//         {/* Business Table */}
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
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">
//                     SNO.
//                   </th>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">
//                     Date
//                   </th>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">
//                     Overall Score
//                   </th>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">
//                     Details
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {businessTable.map((row, idx) => (
//                   <tr
//                     key={row._id}
//                     className="hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
//                   >
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">
//                       {idx + 1}
//                     </td>
//                     <td>
//                       {new Date(row.date).toLocaleDateString("en-GB", {
//                         day: "2-digit",
//                         month: "2-digit",
//                         year: "numeric",
//                       })}
//                     </td>
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">
//                       {row.overallScore}%
//                     </td>
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">
//                       <button className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
//                         <FaEye />
//                         <span>View</span>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//                 {businessTable.length === 0 && (
//                   <tr>
//                     <td colSpan={4} className="text-center py-3 text-gray-500">
//                       No data found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//           <div className="mt-2 text-right">
//             <button className="text-blue-600 dark:text-blue-400 hover:underline">
//               See All
//             </button>
//           </div>
//         </motion.div>
//       </div>

//       <Toaster position="bottom-right" />
//     </div>
//   );
// }

// src/pages/RaciDashboard.js

// import React, { useState, useEffect } from "react";
// import { toast, Toaster } from "react-hot-toast";
// import { FaEye } from "react-icons/fa";
// import { motion } from "framer-motion";

// // Import your service functions:
// import {
//   fetchOperationsTable,
//   fetchBusinessTable,
// } from "../../service/reciService";

// // Import the two distinct modals:
// import RaciOperationsModal from "./Racioperations/OperationsScoreDetailsModal";
// import RaciBusinessModal from "./RaciBusiness/ScoreDetailModal";

// export default function RaciDashboard() {
//   // State: Table data for Operations & Business
//   const [operationsTable, setOperationsTable] = useState([]);
//   const [businessTable, setBusinessTable] = useState([]);

//   // State: Which row is selected for each table (to open modals)
//   const [selectedOperationsScore, setSelectedOperationsScore] = useState(null);
//   const [selectedBusinessScore, setSelectedBusinessScore] = useState(null);

//   // On component mount, load both tables
//   useEffect(() => {
//     loadTables();
//   }, []);

//   const loadTables = async () => {
//     // 1) Operations
//     try {
//       const opTableData = await fetchOperationsTable();
//       setOperationsTable(opTableData); // e.g. array of objects
//     } catch (err) {
//       console.error("Error fetching operations table:", err);
//       toast.error("Failed to fetch operations table");
//     }

//     // 2) Business
//     try {
//       const busTableData = await fetchBusinessTable();
//       setBusinessTable(busTableData); // e.g. array of objects
//     } catch (err) {
//       console.error("Error fetching business table:", err);
//       toast.error("Failed to fetch business table");
//     }
//   };

//   // Render
//   return (
//     <div className="bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100 p-4 min-h-screen">
//       <motion.h1
//         className="text-3xl font-bold mb-8 text-center"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         RACI Dashboard
//       </motion.h1>

//       {/* === TABLES LAYOUT === */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* ====== RACI OPERATIONS TABLE ====== */}
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
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">
//                     SNO.
//                   </th>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">
//                     Date
//                   </th>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">
//                     Overall Score
//                   </th>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">
//                     Details
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {operationsTable.map((row, idx) => (
//                   <tr
//                     key={row._id || idx}
//                     className="hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
//                   >
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">
//                       {idx + 1}
//                     </td>
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">
//                       {new Date(row.date).toLocaleDateString("en-GB", {
//                         day: "2-digit",
//                         month: "2-digit",
//                         year: "numeric",
//                       })}
//                     </td>
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">
//                       {/* 
//                         Some APIs store overallScore as 0–10 or 0–1 or 0–100.
//                         Adjust as needed. Example: if it's 0–10, multiply by 10.
//                       */}
//                       {(row.overallScore * 10).toFixed(2)}%
//                     </td>
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">
//                       <button
//                         className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
//                         onClick={() => setSelectedOperationsScore(row)}
//                       >
//                         <FaEye />
//                         <span>View</span>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//                 {operationsTable.length === 0 && (
//                   <tr>
//                     <td colSpan={4} className="text-center py-3 text-gray-500">
//                       No operations data found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </motion.div>

//         {/* ====== RACI BUSINESS TABLE ====== */}
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
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">
//                     SNO.
//                   </th>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">
//                     Date
//                   </th>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">
//                     Overall Score
//                   </th>
//                   <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">
//                     Details
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {businessTable.map((row, idx) => (
//                   <tr
//                     key={row._id || idx}
//                     className="hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
//                   >
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">
//                       {idx + 1}
//                     </td>
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">
//                       {new Date(row.date).toLocaleDateString("en-GB", {
//                         day: "2-digit",
//                         month: "2-digit",
//                         year: "numeric",
//                       })}
//                     </td>
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">
//                       {/* 
//                         If Business uses 0–100 scale already:
//                       */}
//                       {row.overallScore.toFixed(2)}%
//                     </td>
//                     <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">
//                       <button
//                         className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
//                         onClick={() => setSelectedBusinessScore(row)}
//                       >
//                         <FaEye />
//                         <span>View</span>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//                 {businessTable.length === 0 && (
//                   <tr>
//                     <td colSpan={4} className="text-center py-3 text-gray-500">
//                       No business data found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </motion.div>
//       </div>

//       {/* === RACI Operations Modal === */}
//       {selectedOperationsScore && (
//         <RaciOperationsModal
//           selectedScore={selectedOperationsScore}
//           onClose={() => setSelectedOperationsScore(null)}
//         />
//       )}

//       {/* === RACI Business Modal === */}
//       {selectedBusinessScore && (
//         <RaciBusinessModal
//           selectedScore={selectedBusinessScore}
//           onClose={() => setSelectedBusinessScore(null)}
//         />
//       )}

//       <Toaster position="bottom-right" />
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { toast, Toaster } from "react-hot-toast";
// import { FaEye } from "react-icons/fa";
// import { motion } from "framer-motion";

// // Service functions
// import {
//   fetchOperationsTable,
//   fetchBusinessTable,
// } from "../../service/reciService";

// // Modals
// import RaciOperationsModal from "./Racioperations/OperationsScoreDetailsModal";
// import RaciBusinessModal from "./RaciBusiness/ScoreDetailModal";

// export default function RaciDashboard() {
//   const [operationsTable, setOperationsTable] = useState([]);
//   const [businessTable, setBusinessTable] = useState([]);

//   const [selectedOperationsScore, setSelectedOperationsScore] = useState(null);
//   const [selectedBusinessScore, setSelectedBusinessScore] = useState(null);

//   // Load data on mount
//   useEffect(() => {
//     loadTables();
//   }, []);

//   const loadTables = async () => {
//     try {
//       const opTableData = await fetchOperationsTable();
//       setOperationsTable(opTableData);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch operations table");
//     }

//     try {
//       const busTableData = await fetchBusinessTable();
//       setBusinessTable(busTableData);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch business table");
//     }
//   };

//   // Optional: color-code the score text based on value
//   const scoreColor = (score) => {
//     if (score < 30) return "text-red-400";
//     if (score < 70) return "text-yellow-400";
//     return "text-green-400";
//   };

//   return (
//     /** 
//      * Container with a full-height dark background 
//      * + text color that adapts to dark mode
//      **/
//     <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-black to-gray-900 text-gray-200 p-6 md:p-10">
//       {/* Outer “card” wrapper, to set any desired max-width */}
//       <div className="max-w-7xl mx-auto">
//         <motion.h1
//           className="text-center text-3xl sm:text-4xl font-extrabold mb-8 
//                      text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400"
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           RACI Dashboard
//         </motion.h1>

//         {/* Grid: two columns (stack on mobile) */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* ----- RACI OPERATIONS CARD ----- */}
//           <motion.div
//             className="rounded-xl bg-gray-800/60 shadow-xl p-5 
//                        dark:bg-gray-800 dark:border dark:border-gray-700"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
//               <span className="inline-block w-2 h-2 rounded-full bg-cyan-400" />
//               <span className="text-cyan-400">RACI Operations</span>
//             </h2>

//             {/* Table Container */}
//             <div className="overflow-x-auto">
//               <table className="w-full table-auto text-sm">
//                 <thead>
//                   <tr className="uppercase tracking-wider bg-gray-700/50 text-gray-300">
//                     <th className="px-4 py-3 text-left rounded-l-lg">S.NO</th>
//                     <th className="px-4 py-3 text-left">Date</th>
//                     <th className="px-4 py-3 text-left">Overall Score</th>
//                     <th className="px-4 py-3 text-left rounded-r-lg">Details</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {operationsTable.length === 0 && (
//                     <tr>
//                       <td
//                         colSpan={4}
//                         className="text-center p-4 text-gray-400 italic"
//                       >
//                         No operations data found.
//                       </td>
//                     </tr>
//                   )}
//                   {operationsTable.map((item, idx) => {
//                     // Adjust the number scale as needed
//                     const numericScore = (item.overallScore * 10).toFixed(2);
//                     return (
//                       <tr
//                         key={item._id || idx}
//                         className="border-b border-gray-700 hover:bg-gray-700/40 transition-colors"
//                       >
//                         <td className="px-4 py-3 font-medium">{idx + 1}</td>
//                         <td className="px-4 py-3">
//                           {new Date(item.date).toLocaleDateString("en-GB", {
//                             day: "2-digit",
//                             month: "2-digit",
//                             year: "numeric",
//                           })}
//                         </td>
//                         <td
//                           className={`px-4 py-3 font-semibold ${scoreColor(
//                             numericScore
//                           )}`}
//                         >
//                           {numericScore}%
//                         </td>
//                         <td className="px-4 py-3">
//                           <button
//                             className="flex items-center gap-1 text-blue-400 hover:underline"
//                             onClick={() => setSelectedOperationsScore(item)}
//                           >
//                             <FaEye />
//                             View
//                           </button>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           </motion.div>

//           {/* ----- RACI BUSINESS CARD ----- */}
//           <motion.div
//             className="rounded-xl bg-gray-800/60 shadow-xl p-5 
//                        dark:bg-gray-800 dark:border dark:border-gray-700"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
//               <span className="inline-block w-2 h-2 rounded-full bg-pink-400" />
//               <span className="text-pink-400">RACI Business</span>
//             </h2>

//             <div className="overflow-x-auto">
//               <table className="w-full table-auto text-sm">
//                 <thead>
//                   <tr className="uppercase tracking-wider bg-gray-700/50 text-gray-300">
//                     <th className="px-4 py-3 text-left rounded-l-lg">S.NO</th>
//                     <th className="px-4 py-3 text-left">Date</th>
//                     <th className="px-4 py-3 text-left">Overall Score</th>
//                     <th className="px-4 py-3 text-left rounded-r-lg">Details</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {businessTable.length === 0 && (
//                     <tr>
//                       <td
//                         colSpan={4}
//                         className="text-center p-4 text-gray-400 italic"
//                       >
//                         No business data found.
//                       </td>
//                     </tr>
//                   )}
//                   {businessTable.map((item, idx) => {
//                     // If business uses 0–100 scale, we can keep it as is:
//                     const numericScore = item.overallScore.toFixed(2);
//                     return (
//                       <tr
//                         key={item._id || idx}
//                         className="border-b border-gray-700 hover:bg-gray-700/40 transition-colors"
//                       >
//                         <td className="px-4 py-3 font-medium">{idx + 1}</td>
//                         <td className="px-4 py-3">
//                           {new Date(item.date).toLocaleDateString("en-GB", {
//                             day: "2-digit",
//                             month: "2-digit",
//                             year: "numeric",
//                           })}
//                         </td>
//                         <td
//                           className={`px-4 py-3 font-semibold ${scoreColor(
//                             numericScore
//                           )}`}
//                         >
//                           {numericScore}%
//                         </td>
//                         <td className="px-4 py-3">
//                           <button
//                             className="flex items-center gap-1 text-blue-400 hover:underline"
//                             onClick={() => setSelectedBusinessScore(item)}
//                           >
//                             <FaEye />
//                             View
//                           </button>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           </motion.div>
//         </div>

//         {/* Modals */}
//         {selectedOperationsScore && (
//           <RaciOperationsModal
//             selectedScore={selectedOperationsScore}
//             onClose={() => setSelectedOperationsScore(null)}
//           />
//         )}
//         {selectedBusinessScore && (
//           <RaciBusinessModal
//             selectedScore={selectedBusinessScore}
//             onClose={() => setSelectedBusinessScore(null)}
//           />
//         )}
//       </div>
//       <Toaster position="bottom-right" />
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { motion } from "framer-motion";

// Service functions
import {
  fetchOperationsTable,
  fetchBusinessTable,
} from "../../service/reciService";

// Modals
import RaciOperationsModal from "./Racioperations/OperationsScoreDetailsModal";
import RaciBusinessModal from "./RaciBusiness/ScoreDetailModal";

export default function RaciDashboard() {
  const [operationsTable, setOperationsTable] = useState([]);
  const [businessTable, setBusinessTable] = useState([]);

  const [selectedOperationsScore, setSelectedOperationsScore] = useState(null);
  const [selectedBusinessScore, setSelectedBusinessScore] = useState(null);

  useEffect(() => {
    loadTables();
  }, []);

  const loadTables = async () => {
    // Fetch operations
    try {
      const opTableData = await fetchOperationsTable();
      setOperationsTable(opTableData);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch operations table");
    }
    // Fetch business
    try {
      const busTableData = await fetchBusinessTable();
      setBusinessTable(busTableData);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch business table");
    }
  };

  // Color-code the score text based on value (optional)
  const scoreColor = (score) => {
    if (score < 30) return "text-red-500 dark:text-red-400";
    if (score < 70) return "text-yellow-500 dark:text-yellow-400";
    return "text-green-600 dark:text-green-400";
  };

  return (
    <>
      {/** 
       * 1) Main Container: 
       *    Light mode => white background, gray text
       *    Dark mode  => gradient background, light text
       */}
      <div
        className="
          min-h-screen
          bg-white text-gray-800
          dark:bg-gradient-to-tr dark:from-gray-900 dark:via-gray-950 dark:to-gray-900
          dark:text-gray-200
          p-6 md:p-10
        "
      >
        {/* Outer container to limit width and center content */}
        <div className="max-w-7xl mx-auto">
          {/**
           * 2) Heading:
           *    Light mode => gradient text from blue to purple
           *    Dark mode  => gradient text from cyan to fuchsia
           */}
          <motion.h1
            className="
              text-center text-3xl sm:text-4xl font-extrabold mb-8
              bg-clip-text text-transparent
              bg-gradient-to-r from-blue-500 to-purple-500
              dark:from-cyan-400 dark:to-fuchsia-400
            "
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            RACI Dashboard
          </motion.h1>

          {/* 3) Two Columns for Operations & Business (stack on small screens) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/** 
             * === RACI OPERATIONS CARD ===
             * Light: white card, gray text, subtle border
             * Dark: nearly black card, white text, darker border 
             */}
            <motion.div
              className="
                rounded-xl
                bg-gray-100 text-gray-900 border border-gray-200
                shadow-xl p-5
                dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700
              "
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-cyan-600 dark:text-cyan-400">
                  RACI Operations
                </span>
              </h2>

              {/* Table for Operations */}
              <div className="overflow-x-auto">
                <table className="w-full table-auto text-sm">
                  {/* Table Head */}
                  <thead>
                    <tr
                      className="
                        uppercase tracking-wider
                        bg-gray-200 text-gray-700
                        dark:bg-gray-700/50 dark:text-gray-300
                      "
                    >
                      <th className="px-4 py-3 text-left rounded-l-lg">S.NO</th>
                      <th className="px-4 py-3 text-left">Date</th>
                      <th className="px-4 py-3 text-left">Overall Score</th>
                      <th className="px-4 py-3 text-left rounded-r-lg">Details</th>
                    </tr>
                  </thead>

                  <tbody>
                    {operationsTable.length === 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className="
                            text-center p-4
                            text-gray-500 italic
                            dark:text-gray-400
                          "
                        >
                          No operations data found.
                        </td>
                      </tr>
                    )}
                    {operationsTable.map((item, idx) => {
                      // If storing ops score as 0–1, multiply by 10:
                      const numericScore = (item.overallScore * 10).toFixed(2);
                      return (
                        <tr
                          key={item._id || idx}
                          className="
                            border-b border-gray-200
                            hover:bg-gray-100 dark:hover:bg-gray-700/40
                            dark:border-gray-700
                            transition-colors
                          "
                        >
                          <td className="px-4 py-3 font-medium">
                            {idx + 1}
                          </td>
                          <td className="px-4 py-3">
                            {new Date(item.date).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </td>
                          <td
                            className={`px-4 py-3 font-semibold ${scoreColor(
                              numericScore
                            )}`}
                          >
                            {numericScore}%
                          </td>
                          <td className="px-4 py-3">
                            <button
                              className="
                                flex items-center gap-1
                                text-blue-600 hover:underline
                                dark:text-blue-400
                              "
                              onClick={() => setSelectedOperationsScore(item)}
                            >
                              <FaEye />
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/**
             * === RACI BUSINESS CARD ===
             * Light: white card, gray text, subtle border
             * Dark: nearly black card, white text, darker border 
             */}
            <motion.div
              className="
                rounded-xl
                bg-gray-100 text-gray-900 border border-gray-200
                shadow-xl p-5
                dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700
              "
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-pink-400" />
                <span className="text-pink-600 dark:text-pink-400">
                  RACI Business
                </span>
              </h2>

              {/* Table for Business */}
              <div className="overflow-x-auto">
                <table className="w-full table-auto text-sm">
                  <thead>
                    <tr
                      className="
                        uppercase tracking-wider
                        bg-gray-200 text-gray-700
                        dark:bg-gray-700/50 dark:text-gray-300
                      "
                    >
                      <th className="px-4 py-3 text-left rounded-l-lg">S.NO</th>
                      <th className="px-4 py-3 text-left">Date</th>
                      <th className="px-4 py-3 text-left">Overall Score</th>
                      <th className="px-4 py-3 text-left rounded-r-lg">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {businessTable.length === 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className="
                            text-center p-4
                            text-gray-500 italic
                            dark:text-gray-400
                          "
                        >
                          No business data found.
                        </td>
                      </tr>
                    )}
                    {businessTable.map((item, idx) => {
                      // If business uses 0–100 scale as is:
                      const numericScore = item.overallScore.toFixed(2);
                      return (
                        <tr
                          key={item._id || idx}
                          className="
                            border-b border-gray-200
                            hover:bg-gray-100 dark:hover:bg-gray-700/40
                            dark:border-gray-700
                            transition-colors
                          "
                        >
                          <td className="px-4 py-3 font-medium">
                            {idx + 1}
                          </td>
                          <td className="px-4 py-3">
                            {new Date(item.date).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </td>
                          <td
                            className={`px-4 py-3 font-semibold ${scoreColor(
                              numericScore
                            )}`}
                          >
                            {numericScore}%
                          </td>
                          <td className="px-4 py-3">
                            <button
                              className="
                                flex items-center gap-1
                                text-blue-600 hover:underline
                                dark:text-blue-400
                              "
                              onClick={() => setSelectedBusinessScore(item)}
                            >
                              <FaEye />
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Modals for detailed score view */}
          {selectedOperationsScore && (
            <RaciOperationsModal
              selectedScore={selectedOperationsScore}
              onClose={() => setSelectedOperationsScore(null)}
            />
          )}
          {selectedBusinessScore && (
            <RaciBusinessModal
              selectedScore={selectedBusinessScore}
              onClose={() => setSelectedBusinessScore(null)}
            />
          )}
        </div>
      </div>

      <Toaster position="bottom-right" />
    </>
  );
}
