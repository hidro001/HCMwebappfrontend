

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Line, Doughnut } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   ArcElement,
//   Legend,
// } from "chart.js";
// import { FaSpinner } from "react-icons/fa";

// import useDashboardStore from "../../store/useDashboardEmpStore"; 
// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   ArcElement,
//   Legend
// );

// const EmployeesMain = () => {
//   // 1) Read from the Zustand store
//   const {
//     lineChartData, // { monthly, weekly, yearly: { labels, counts } }
//     overviewData, // { Today, "This Week", "This Month" }
//     activeEmployees, // array
//     inactiveEmployees, // array
//     loading,
//     error,
//     fetchDashboardData,
//   } = useDashboardStore();

//   // 2) Local UI state
//   const [activeTab, setActiveTab] = useState("active");
//   const [chartRange, setChartRange] = useState("Monthly");
//   const [overviewRange, setOverviewRange] = useState("Today");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [manualPage, setManualPage] = useState(1);
//   const employeesPerPage = 10;

//   // Reset page when switching between active and inactive
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [activeTab]);

//   // Sync manualPage with currentPage whenever currentPage changes
//   useEffect(() => {
//     setManualPage(currentPage);
//   }, [currentPage]);

//   // 3) Fetch data on component mount
//   useEffect(() => {
//     fetchDashboardData();
//   }, [fetchDashboardData]);

//   // 4) Handle loading/error with Framer Motion animations
//   if (loading) {
//     return (
//       <motion.div
//       className="p-8 flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg shadow-xl"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: 20 }}
//       transition={{ duration: 0.5 }}
//     >
//       <FaSpinner className="text-white text-4xl animate-spin mb-4" />
//       <p className="text-white text-xl font-bold">Please wait...</p>
//     </motion.div>
//     );
//   }
//   if (error) {
//     return (
//       <motion.div
//         className="p-4 text-red-600 flex justify-center items-center"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <p>Error: {error}</p>
//       </motion.div>
//     );
//   }
//   if (!lineChartData || !overviewData) {
//     return <p className="p-4">No data available.</p>;
//   }

//   // ---------------------------------------------
//   // LINE CHART (Monthly/Weekly/Yearly)
//   // ---------------------------------------------
//   let chartLabels = [];
//   let chartCounts = [];

//   if (chartRange === "Monthly") {
//     chartLabels = [
//       "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
//     ];
//     chartCounts = lineChartData.monthly || [];
//   } else if (chartRange === "Weekly") {
//     chartLabels = [
//       "W1", "W2", "W3", "W4", "W5", "W6",
//       "W7", "W8", "W9", "W10", "W11", "W12",
//     ];
//     chartCounts = lineChartData.weekly || [];
//   } else {
//     chartLabels = (lineChartData.yearly.labels || []).map(String);
//     chartCounts = lineChartData.yearly.counts || [];
//   }

//   const dynamicLineChartData = {
//     labels: chartLabels,
//     datasets: [
//       {
//         label: "Employees Added",
//         data: chartCounts,
//         borderColor: "#3b82f6",
//         backgroundColor: "rgba(59,130,246,0.1)",
//         fill: true,
//         tension: 0.4,
//       },
//     ],
//   };

//   const lineChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     animation: { duration: 800 },
//     scales: { y: { beginAtZero: true } },
//     plugins: { legend: { display: false }, tooltip: { enabled: true } },
//   };

//   // ---------------------------------------------
//   // DOUGHNUT (EMPLOYEE OVERVIEW)
//   // ---------------------------------------------
//   const [activeCount, inactiveCount] = overviewData[overviewRange] || [0, 0];

//   const dynamicDoughnutData = {
//     labels: ["Active", "Inactive"],
//     datasets: [
//       {
//         data: [activeCount, inactiveCount],
//         backgroundColor: ["#3b82f6", "#f97316"],
//         hoverBackgroundColor: ["#1d4ed8", "#c2410c"],
//         borderWidth: 0,
//       },
//     ],
//   };

//   const doughnutOptions = {
//     responsive: true,
//     cutout: "65%",
//     animation: { duration: 800 },
//     plugins: { legend: { display: false }, tooltip: { enabled: true } },
//   };

//   // ---------------------------------------------
//   // TABLE DATA (Active / Inactive Employees) with Pagination
//   // ---------------------------------------------
//   const displayedEmployees = activeTab === "active" ? activeEmployees : inactiveEmployees;
//   const totalEmployees = displayedEmployees.length;
//   const totalPages = Math.ceil(totalEmployees / employeesPerPage);
//   const indexOfLastEmployee = currentPage * employeesPerPage;
//   const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
//   const currentEmployees = displayedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

//   // Handle manual "Go to page" navigation
//   const handleGoToPage = () => {
//     const page = Number(manualPage);
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-100">Dashboard</h1>
//       </div>

//       {/* Top Row: LEFT (Line Chart) + RIGHT (Doughnut) */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
//         {/* LEFT Card: New Employee Added + Chart */}
//         <motion.div
//           className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-5"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <div className="flex items-center space-x-2">
//                 <p className="text-2xl font-bold text-gray-700 dark:text-gray-100">
//                   {chartCounts.reduce((acc, val) => acc + val, 0)}
//                 </p>
//               </div>
//               <h2 className="text-base text-gray-500 dark:text-gray-300 mt-1">New Employee Added</h2>
//             </div>
//             <div>
//               <select
//                 value={chartRange}
//                 onChange={(e) => setChartRange(e.target.value)}
//                 className="border text-sm rounded px-2 py-1 bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
//               >
//                 <option>Monthly</option>
//                 <option>Weekly</option>
//                 <option>Yearly</option>
//               </select>
//             </div>
//           </div>
//           <div className="h-60">
//             <Line data={dynamicLineChartData} options={lineChartOptions} />
//           </div>
//         </motion.div>

//         {/* RIGHT Card: Employee Overview + Doughnut */}
//         <motion.div
//           className="bg-white dark:bg-gray-800 rounded-lg shadow p-5"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//         >
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-base font-semibold text-gray-700 dark:text-gray-100">Employee Overview</h3>
//             <select
//               value={overviewRange}
//               onChange={(e) => setOverviewRange(e.target.value)}
//               className="border text-sm rounded px-2 py-1 bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
//             >
//               <option>Today</option>
//               <option>This Week</option>
//               <option>This Month</option>
//             </select>
//           </div>
//           <div className="flex flex-col items-center justify-center relative mt-20">
//             <div className="w-36 h-36">
//               <Doughnut data={dynamicDoughnutData} options={doughnutOptions} />
//             </div>
//           </div>
//           <div className="mt-10 flex justify-between space-x-6 text-lg">
//             <div className="flex items-center space-x-1">
//               <span
//                 className="inline-block w-3 h-3 rounded-full"
//                 style={{ backgroundColor: "#3b82f6" }}
//               />
//               <span className="text-gray-600 dark:text-gray-200">Active: {activeCount}</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <span
//                 className="inline-block w-3 h-3 rounded-full"
//                 style={{ backgroundColor: "#f97316" }}
//               />
//               <span className="text-gray-600 dark:text-gray-200">Inactive: {inactiveCount}</span>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Bottom Section: Table with tabs (Active / Inactive) */}
//       <motion.div
//         className="bg-white dark:bg-gray-800 rounded-lg shadow p-5"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//       >
//         {/* Tabs header */}
//         <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
//           <div className="space-x-6">
//             <button
//               onClick={() => setActiveTab("active")}
//               className={
//                 activeTab === "active"
//                   ? "text-blue-600 border-b-2 border-blue-600 pb-1 font-semibold"
//                   : "text-gray-500 dark:text-gray-300 pb-1"
//               }
//             >
//               Active Employee ({activeEmployees.length})
//             </button>
//             <button
//               onClick={() => setActiveTab("inactive")}
//               className={
//                 activeTab === "inactive"
//                   ? "text-blue-600 border-b-2 border-blue-600 pb-1 font-semibold"
//                   : "text-gray-500 dark:text-gray-300 pb-1"
//               }
//             >
//               Inactive Emp ({inactiveEmployees.length})
//             </button>
//           </div>
//         </div>

//         {/* TABLE */}
//         <motion.table
//           className="w-full text-left"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.6 }}
//         >
//           <thead>
//             <tr className="bg-gray-100 dark:bg-gray-700 text-sm uppercase text-gray-600 dark:text-gray-200">
//               <th className="px-4 py-2">Users</th>
//               <th className="px-4 py-2">Join Date</th>
//               <th className="px-4 py-2">Emp ID</th>
//               <th className="px-4 py-2">Department</th>
//               <th className="px-4 py-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentEmployees.map((emp, index) => (
//               <tr
//                 key={index}
//                 className="border-b last:border-0 border-gray-200 dark:border-gray-700"
//               >
//                 <td className="px-4 py-3">
//                   <div className="flex items-center space-x-2">
//                     <div className="flex-shrink-0">
//                       <img
//                         src={emp.userAvatar}
//                         alt=""
//                         className="w-8 h-8 rounded-full bg-gray-300"
//                       />
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-800 dark:text-gray-100">{emp.name}</p>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">{emp.email}</p>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{emp.date}</td>
//                 <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{emp.empID}</td>
//                 <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{emp.department}</td>
//                 <td className="px-4 py-3">
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm font-medium ${
//                       emp.status === "Active"
//                         ? "bg-green-100 text-green-700 dark:bg-green-200"
//                         : "bg-red-100 text-red-700 dark:bg-red-200"
//                     }`}
//                   >
//                     {emp.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </motion.table>

//         {/* Right-Aligned Decorated Pagination Controls */}
//         <div className="flex items-center justify-end mt-6 text-sm font-light">
//           <button
//             onClick={() => setCurrentPage((prev) => prev - 1)}
//             disabled={currentPage === 1}
//             className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors duration-200 disabled:opacity-50 disabled:bg-gray-400"
//           >
//             Prev
//           </button>
//           <span className="mx-2">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={() => setCurrentPage((prev) => prev + 1)}
//             disabled={currentPage === totalPages}
//             className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors duration-200 disabled:opacity-50 disabled:bg-gray-400"
//           >
//             Next
//           </button>
//           <span className="mx-2">Go to page:</span>
//           <input
//             type="number"
//             min="1"
//             max={totalPages}
//             value={manualPage}
//             onChange={(e) => setManualPage(e.target.value)}
//             className="w-16 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
//           />
//           <button
//             onClick={handleGoToPage}
//             className="ml-2 px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded transition-colors duration-200"
//           >
//             Go
//           </button>
//         </div>

//       </motion.div>
//     </div>
//   );
// };

// export default EmployeesMain;


// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Line, Doughnut } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   ArcElement,
//   Legend,
// } from "chart.js";
// import { FaSpinner } from "react-icons/fa";

// // Import your Zustand store
// import useDashboardStore from "../../store/useDashboardEmpStore";

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   ArcElement,
//   Legend
// );

// const EmployeesMain = () => {
//   // 1) Read from the Zustand store
//   const {
//     lineChartData, // { monthly, weekly, yearly: { labels, counts } }
//     overviewData,  // { Today, "This Week", "This Month" }
//     activeEmployees,
//     inactiveEmployees,
//     loading,
//     error,
//     fetchDashboardData,
//   } = useDashboardStore();

//   // 2) Local UI state
//   const [activeTab, setActiveTab] = useState("active");
//   const [chartRange, setChartRange] = useState("Monthly");
//   const [overviewRange, setOverviewRange] = useState("Today");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [manualPage, setManualPage] = useState(1);
//   const employeesPerPage = 10;

//   // Reset page when switching between active and inactive
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [activeTab]);

//   // Keep manualPage in sync with currentPage
//   useEffect(() => {
//     setManualPage(currentPage);
//   }, [currentPage]);

//   // 3) Fetch data on component mount
//   useEffect(() => {
//     fetchDashboardData();
//   }, [fetchDashboardData]);

//   // 4) Handle loading or error
//   if (loading) {
//     return (
//       <motion.div
//         className="p-8 flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg shadow-xl"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 20 }}
//         transition={{ duration: 0.5 }}
//       >
//         <FaSpinner className="text-white text-4xl animate-spin mb-4" />
//         <p className="text-white text-xl font-bold">Please wait...</p>
//       </motion.div>
//     );
//   }
//   if (error) {
//     return (
//       <motion.div
//         className="p-4 text-red-600 flex justify-center items-center"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <p>Error: {error}</p>
//       </motion.div>
//     );
//   }
//   if (!lineChartData || !overviewData) {
//     return <p className="p-4">No data available.</p>;
//   }

//   // ------------------------------------------------
//   // LINE CHART (Monthly/Weekly/Yearly)
//   // ------------------------------------------------
//   let chartLabels = [];
//   let chartCounts = [];

//   if (chartRange === "Monthly") {
//     chartLabels = [
//       "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//     ];
//     chartCounts = lineChartData.monthly || [];
//   } else if (chartRange === "Weekly") {
//     // Only 5 buckets for the current month
//     chartLabels = ["W1", "W2", "W3", "W4", "W5"];
//     chartCounts = lineChartData.weekly || [];
//   } else {
//     // Yearly
//     chartLabels = (lineChartData.yearly.labels || []).map(String);
//     chartCounts = lineChartData.yearly.counts || [];
//   }

//   const dynamicLineChartData = {
//     labels: chartLabels,
//     datasets: [
//       {
//         label: "Employees Added",
//         data: chartCounts,
//         borderColor: "#3b82f6",
//         backgroundColor: "rgba(59,130,246,0.1)",
//         fill: true,
//         tension: 0.4,
//       },
//     ],
//   };

//   const lineChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     animation: { duration: 800 },
//     scales: { y: { beginAtZero: true } },
//     plugins: { legend: { display: false }, tooltip: { enabled: true } },
//   };

//   // ------------------------------------------------
//   // DOUGHNUT (EMPLOYEE OVERVIEW)
//   // ------------------------------------------------
//   const [activeCount, inactiveCount] = overviewData[overviewRange] || [0, 0];

//   const dynamicDoughnutData = {
//     labels: ["Active", "Inactive"],
//     datasets: [
//       {
//         data: [activeCount, inactiveCount],
//         backgroundColor: ["#3b82f6", "#f97316"],
//         hoverBackgroundColor: ["#1d4ed8", "#c2410c"],
//         borderWidth: 0,
//       },
//     ],
//   };

//   const doughnutOptions = {
//     responsive: true,
//     cutout: "65%",
//     animation: { duration: 800 },
//     plugins: { legend: { display: false }, tooltip: { enabled: true } },
//   };

//   // ------------------------------------------------
//   // TABLE DATA (Active / Inactive Employees) + Pagination
//   // ------------------------------------------------
//   const displayedEmployees = activeTab === "active" ? activeEmployees : inactiveEmployees;
//   const totalEmployees = displayedEmployees.length;
//   const totalPages = Math.ceil(totalEmployees / employeesPerPage);
//   const indexOfLastEmployee = currentPage * employeesPerPage;
//   const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
//   const currentEmployees = displayedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

//   // Handle manual "Go to page"
//   const handleGoToPage = () => {
//     const page = Number(manualPage);
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-100">Dashboard</h1>
//       </div>

//       {/* Top Row: LEFT (Line Chart) + RIGHT (Doughnut) */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
//         {/* LEFT Card: New Employee Added + Chart */}
//         <motion.div
//           className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-5"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <div className="flex items-center space-x-2">
//                 <p className="text-2xl font-bold text-gray-700 dark:text-gray-100">
//                   {chartCounts.reduce((acc, val) => acc + val, 0)}
//                 </p>
//               </div>
//               <h2 className="text-base text-gray-500 dark:text-gray-300 mt-1">New Employee Added</h2>
//             </div>
//             <div>
//               <select
//                 value={chartRange}
//                 onChange={(e) => setChartRange(e.target.value)}
//                 className="border text-sm rounded px-2 py-1 bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
//               >
//                 <option>Monthly</option>
//                 <option>Weekly</option>
//                 <option>Yearly</option>
//               </select>
//             </div>
//           </div>
//           <div className="h-60">
//             <Line data={dynamicLineChartData} options={lineChartOptions} />
//           </div>
//         </motion.div>

//         {/* RIGHT Card: Employee Overview + Doughnut */}
//         <motion.div
//           className="bg-white dark:bg-gray-800 rounded-lg shadow p-5"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//         >
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-base font-semibold text-gray-700 dark:text-gray-100">Employee Overview</h3>
//             <select
//               value={overviewRange}
//               onChange={(e) => setOverviewRange(e.target.value)}
//               className="border text-sm rounded px-2 py-1 bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
//             >
//               <option>Today</option>
//               <option>This Week</option>
//               <option>This Month</option>
//             </select>
//           </div>
//           <div className="flex flex-col items-center justify-center relative mt-20">
//             <div className="w-36 h-36">
//               <Doughnut data={dynamicDoughnutData} options={doughnutOptions} />
//             </div>
//           </div>
//           <div className="mt-10 flex justify-between space-x-6 text-lg">
//             <div className="flex items-center space-x-1">
//               <span
//                 className="inline-block w-3 h-3 rounded-full"
//                 style={{ backgroundColor: "#3b82f6" }}
//               />
//               <span className="text-gray-600 dark:text-gray-200">Active: {activeCount}</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <span
//                 className="inline-block w-3 h-3 rounded-full"
//                 style={{ backgroundColor: "#f97316" }}
//               />
//               <span className="text-gray-600 dark:text-gray-200">Inactive: {inactiveCount}</span>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Bottom Section: Table with tabs (Active / Inactive) */}
//       <motion.div
//         className="bg-white dark:bg-gray-800 rounded-lg shadow p-5"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//       >
//         {/* Tabs header */}
//         <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
//           <div className="space-x-6">
//             <button
//               onClick={() => setActiveTab("active")}
//               className={
//                 activeTab === "active"
//                   ? "text-blue-600 border-b-2 border-blue-600 pb-1 font-semibold"
//                   : "text-gray-500 dark:text-gray-300 pb-1"
//               }
//             >
//               Active Employee ({activeEmployees.length})
//             </button>
//             <button
//               onClick={() => setActiveTab("inactive")}
//               className={
//                 activeTab === "inactive"
//                   ? "text-blue-600 border-b-2 border-blue-600 pb-1 font-semibold"
//                   : "text-gray-500 dark:text-gray-300 pb-1"
//               }
//             >
//               Inactive Emp ({inactiveEmployees.length})
//             </button>
//           </div>
//         </div>

//         {/* TABLE */}
//         <motion.table
//           className="w-full text-left"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.6 }}
//         >
//           <thead>
//             <tr className="bg-gray-100 dark:bg-gray-700 text-sm uppercase text-gray-600 dark:text-gray-200">
//               <th className="px-4 py-2">Users</th>
//               <th className="px-4 py-2">Join Date</th>
//               <th className="px-4 py-2">Emp ID</th>
//               <th className="px-4 py-2">Department</th>
//               <th className="px-4 py-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentEmployees.map((emp, index) => (
//               <tr
//                 key={index}
//                 className="border-b last:border-0 border-gray-200 dark:border-gray-700"
//               >
//                 <td className="px-4 py-3">
//                   <div className="flex items-center space-x-2">
//                     <div className="flex-shrink-0">
//                       <img
//                         src={emp.userAvatar}
//                         alt=""
//                         className="w-8 h-8 rounded-full bg-gray-300"
//                       />
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-800 dark:text-gray-100">{emp.name}</p>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">{emp.email}</p>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{emp.date}</td>
//                 <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{emp.empID}</td>
//                 <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{emp.department}</td>
//                 <td className="px-4 py-3">
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm font-medium ${
//                       emp.status === "Active"
//                         ? "bg-green-100 text-green-700 dark:bg-green-200"
//                         : "bg-red-100 text-red-700 dark:bg-red-200"
//                     }`}
//                   >
//                     {emp.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </motion.table>

//         {/* Pagination Controls */}
//         <div className="flex items-center justify-end mt-6 text-sm font-light">
//           <button
//             onClick={() => setCurrentPage((prev) => prev - 1)}
//             disabled={currentPage === 1}
//             className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors duration-200 disabled:opacity-50 disabled:bg-gray-400"
//           >
//             Prev
//           </button>
//           <span className="mx-2">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={() => setCurrentPage((prev) => prev + 1)}
//             disabled={currentPage === totalPages}
//             className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors duration-200 disabled:opacity-50 disabled:bg-gray-400"
//           >
//             Next
//           </button>
//           <span className="mx-2">Go to page:</span>
//           <input
//             type="number"
//             min="1"
//             max={totalPages}
//             value={manualPage}
//             onChange={(e) => setManualPage(e.target.value)}
//             className="w-16 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
//           />
//           <button
//             onClick={handleGoToPage}
//             className="ml-2 px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded transition-colors duration-200"
//           >
//             Go
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default EmployeesMain;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from "chart.js";
import { FaSpinner } from "react-icons/fa";

// Import your Zustand store
import useDashboardStore from "../../store/useDashboardEmpStore";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);

const EmployeesMain = () => {
  // 1) Read from the Zustand store
  const {
    lineChartData, // { monthly, weekly, yearly: { labels, counts } }
    overviewData,  // { Overall: [activeCount, inactiveCount] }
    activeEmployees,
    inactiveEmployees,
    loading,
    error,
    fetchDashboardData,
  } = useDashboardStore();

  // 2) Local UI state
  const [activeTab, setActiveTab] = useState("active");
  const [chartRange, setChartRange] = useState("Monthly");

  // For pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [manualPage, setManualPage] = useState(1);
  const employeesPerPage = 10;

  // Reset page when switching between active and inactive
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // Keep manualPage in sync with currentPage
  useEffect(() => {
    setManualPage(currentPage);
  }, [currentPage]);

  // 3) Fetch data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // 4) Handle loading or error
  if (loading) {
    return (
      <motion.div
        className="p-8 flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <FaSpinner className="text-white text-4xl animate-spin mb-4" />
        <p className="text-white text-xl font-bold">Please wait...</p>
      </motion.div>
    );
  }
  if (error) {
    return (
      <motion.div
        className="p-4 text-red-600 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p>Error: {error}</p>
      </motion.div>
    );
  }
  if (!lineChartData || !overviewData) {
    return <p className="p-4">No data available.</p>;
  }

  // ------------------------------------------------
  // LINE CHART (Monthly/Weekly/Yearly)
  // ------------------------------------------------
  let chartLabels = [];
  let chartCounts = [];

  if (chartRange === "Monthly") {
    chartLabels = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    chartCounts = lineChartData.monthly || [];
  } else if (chartRange === "Weekly") {
    // Only 5 buckets for the current month
    chartLabels = ["W1", "W2", "W3", "W4", "W5"];
    chartCounts = lineChartData.weekly || [];
  } else {
    // Yearly
    chartLabels = (lineChartData.yearly.labels || []).map(String);
    chartCounts = lineChartData.yearly.counts || [];
  }

  const dynamicLineChartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Employees Added",
        data: chartCounts,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // const lineChartOptions = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   animation: { duration: 800 },
  //   scales: { y: { beginAtZero: true } },
  //   plugins: { legend: { display: false }, tooltip: { enabled: true } },
  // };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 800 },
    scales: {
      y: {
        beginAtZero: true,      // Start from 0
        ticks: {
          stepSize: 1,         // Only show whole numbers (1, 2, 3, 4...)
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };
  // ------------------------------------------------
  // DOUGHNUT (EMPLOYEE OVERVIEW)
  // ------------------------------------------------
  // In your updated API response, "overview" has only "Overall": [active, inactive]
  const [activeCount, inactiveCount] = overviewData.Overall || [0, 0];

  const dynamicDoughnutData = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        data: [activeCount, inactiveCount],
        backgroundColor: ["#3b82f6", "#f97316"],
        hoverBackgroundColor: ["#1d4ed8", "#c2410c"],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    cutout: "65%",
    animation: { duration: 800 },
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
  };

  // ------------------------------------------------
  // TABLE DATA (Active / Inactive Employees) + Pagination
  // ------------------------------------------------
  const displayedEmployees = activeTab === "active" ? activeEmployees : inactiveEmployees;
  const totalEmployees = displayedEmployees.length;
  const totalPages = Math.ceil(totalEmployees / employeesPerPage);
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = displayedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Handle manual "Go to page"
  const handleGoToPage = () => {
    const page = Number(manualPage);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-100">Dashboard</h1>
      </div>

      {/* Top Row: LEFT (Line Chart) + RIGHT (Doughnut) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* LEFT Card: New Employee Added + Chart */}
        <motion.div
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-2xl font-bold text-gray-700 dark:text-gray-100">
                  {chartCounts.reduce((acc, val) => acc + val, 0)}
                </p>
              </div>
              <h2 className="text-base text-gray-500 dark:text-gray-300 mt-1">New Employee Added</h2>
            </div>
            <div>
              <select
                value={chartRange}
                onChange={(e) => setChartRange(e.target.value)}
                className="border text-sm rounded px-2 py-1 bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
              >
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Yearly</option>
              </select>
            </div>
          </div>
          <div className="h-60">
            <Line data={dynamicLineChartData} options={lineChartOptions} />
          </div>
        </motion.div>

        {/* RIGHT Card: Employee Overview + Doughnut */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-700 dark:text-gray-100">
              Employee Overview
            </h3>
            {/* Removed the dropdown for Today/ThisWeek/ThisMonth, no longer needed */}
          </div>
          <div className="flex flex-col items-center justify-center relative mt-20">
            <div className="w-36 h-36">
              <Doughnut data={dynamicDoughnutData} options={doughnutOptions} />
            </div>
          </div>
          <div className="mt-10 flex justify-between space-x-6 text-lg">
            <div className="flex items-center space-x-1">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: "#3b82f6" }}
              />
              <span className="text-gray-600 dark:text-gray-200">
                Active: {activeCount}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: "#f97316" }}
              />
              <span className="text-gray-600 dark:text-gray-200">
                Inactive: {inactiveCount}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section: Table with tabs (Active / Inactive) */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Tabs header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
          <div className="space-x-6">
            <button
              onClick={() => setActiveTab("active")}
              className={
                activeTab === "active"
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1 font-semibold"
                  : "text-gray-500 dark:text-gray-300 pb-1"
              }
            >
              Active Employee ({activeEmployees.length})
            </button>
            <button
              onClick={() => setActiveTab("inactive")}
              className={
                activeTab === "inactive"
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1 font-semibold"
                  : "text-gray-500 dark:text-gray-300 pb-1"
              }
            >
              Inactive Emp ({inactiveEmployees.length})
            </button>
          </div>
        </div>

        {/* TABLE */}
        <motion.table
          className="w-full text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-sm uppercase text-gray-600 dark:text-gray-200">
              <th className="px-4 py-2">Users</th>
              <th className="px-4 py-2">Join Date</th>
              <th className="px-4 py-2">Emp ID</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((emp, index) => (
              <tr
                key={index}
                className="border-b last:border-0 border-gray-200 dark:border-gray-700"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex-shrink-0">
                      <img
                        src={emp.userAvatar}
                        alt=""
                        className="w-8 h-8 rounded-full bg-gray-300"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-100">
                        {emp.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {emp.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                  {emp.date}
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                  {emp.empID}
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                  {emp.department}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      emp.status === "Active"
                        ? "bg-green-100 text-green-700 dark:bg-green-200"
                        : "bg-red-100 text-red-700 dark:bg-red-200"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </motion.table>

        {/* Pagination Controls */}
        <div className="flex items-center justify-end mt-6 text-sm font-light">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors duration-200 disabled:opacity-50 disabled:bg-gray-400"
          >
            Prev
          </button>
          <span className="mx-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors duration-200 disabled:opacity-50 disabled:bg-gray-400"
          >
            Next
          </button>
          <span className="mx-2">Go to page:</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={manualPage}
            onChange={(e) => setManualPage(e.target.value)}
            className="w-16 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
          />
          <button
            onClick={handleGoToPage}
            className="ml-2 px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded transition-colors duration-200"
          >
            Go
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default EmployeesMain;

