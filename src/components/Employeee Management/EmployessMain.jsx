

// import React, { useState } from "react";
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
//   // Tabs for Active / Inactive employees
//   const [activeTab, setActiveTab] = useState("active");

//   // Range filter for line chart (Monthly / Weekly / Yearly)
//   const [chartRange, setChartRange] = useState("Monthly");

//   // Range filter for Employee Overview donut (Today / This Week / This Month)
//   const [overviewRange, setOverviewRange] = useState("Today");

//   // 1) LINE CHART DATA + LABELS

//   // Separate label sets for each range
//   const lineChartLabels = {
//     Monthly: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//               "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//     Weekly:  ["W1", "W2", "W3", "W4", "W5", "W6",
//               "W7", "W8", "W9", "W10", "W11", "W12"],
//     Yearly:  ["2017", "2018", "2019", "2020", "2021", "2022",
//               "2023", "2024", "2025", "2026", "2027", "2028"],
//   };

//   // Separate data sets for each range
//   const lineChartDataSets = {
//     Monthly: [10, 20, 15, 30, 25, 60, 40, 35, 20, 25, 15, 30],
//     Weekly:  [3, 5, 6, 2, 4, 8, 2, 9, 4, 3, 2, 1],
//     Yearly:  [40, 50, 45, 80, 60, 120, 70, 140, 100, 110, 90, 100],
//   };

//   // Build dynamic line chart config
//   const dynamicLineChartData = {
//     labels: lineChartLabels[chartRange],
//     datasets: [
//       {
//         label: "Employees Added",
//         data: lineChartDataSets[chartRange],
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
//     plugins: {
//       legend: { display: false },
//       tooltip: { enabled: true },
//     },
//   };

//   // 2) DOUGHNUT (EMPLOYEE OVERVIEW) DATA

//   // Different data sets for "Today" / "This Week" / "This Month"
//   const overviewDataSets = {
//     Today:      [100, 60],   // e.g., 100 active, 60 inactive
//     "This Week": [300, 120], // e.g., 300 active, 120 inactive
//     "This Month": [500, 300],// e.g., 500 active, 300 inactive
//   };

//   // Active/inactive counts to show in label
//   const [activeCount, inactiveCount] = overviewDataSets[overviewRange];

//   const dynamicDoughnutData = {
//     labels: ["Active", "Inactive"],
//     datasets: [
//       {
//         data: overviewDataSets[overviewRange],
//         backgroundColor: ["#3b82f6", "#f97316"],
//         hoverBackgroundColor: ["#1d4ed8", "#c2410c"],
//         borderWidth: 0, // remove stroke between segments
//       },
//     ],
//   };

//   const doughnutOptions = {
//     responsive: true,
//     cutout: "65%", // or "70%" to match the reference's thickness
//     animation: { duration: 800 },
//     plugins: {
//       legend: { display: false },
//       tooltip: { enabled: true },
//     },
//   };

//   // 3) EMPLOYEE TABLE DATA

//   const activeEmployees = [
//     {
//       name: "Dianne Russell",
//       email: "redaniel@gmail.com",
//       date: "27 Mar 2024",
//       empID: "RI0456",
//       department: "IT",
//       status: "Active",
//     },
//     {
//       name: "Wade Warren",
//       email: "xterris@gmail.com",
//       date: "27 Mar 2024",
//       empID: "RI0456",
//       department: "Sales",
//       status: "Active",
//     },
//     {
//       name: "Albert Flores",
//       email: "seanand@mail.ru",
//       date: "27 Mar 2024",
//       empID: "RI0456",
//       department: "Finance",
//       status: "Active",
//     },
//     {
//       name: "Bessie Cooper",
//       email: "jgerrin@gmail.com",
//       date: "27 Mar 2024",
//       empID: "RI0456",
//       department: "Marketing",
//       status: "Active",
//     },
//     {
//       name: "Arlene McCoy",
//       email: "feilora@mail.ru",
//       date: "27 Mar 2024",
//       empID: "RI0456",
//       department: "Designing",
//       status: "Active",
//     },
//   ];

//   const inactiveEmployees = [
//     {
//       name: "Courtney Henry",
//       email: "courtney@example.com",
//       date: "15 Feb 2023",
//       empID: "RI0123",
//       department: "HR",
//       status: "Inactive",
//     },
//     {
//       name: "Devon Lane",
//       email: "devon@example.com",
//       date: "12 Jan 2023",
//       empID: "RI0101",
//       department: "Support",
//       status: "Inactive",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-100">
//           Dashboard
//         </h1>
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
//           {/* Card Header */}
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <div className="flex items-center space-x-2">
//                 <p className="text-2xl font-bold text-gray-700 dark:text-gray-100">
//                   60
//                 </p>
//                 <p className="text-sm text-green-500 font-medium">
//                   +10% Total This Year
//                 </p>
//               </div>
//               <h2 className="text-base text-gray-500 dark:text-gray-300 mt-1">
//                 New Employee Added
//               </h2>
//             </div>
//             {/* Chart Range Selector */}
//             <div>
//               <select
//                 value={chartRange}
//                 onChange={(e) => setChartRange(e.target.value)}
//                 className="border text-sm rounded px-2 py-1 bg-gray-50 
//                            dark:bg-gray-700 dark:text-gray-200"
//               >
//                 <option>Monthly</option>
//                 <option>Weekly</option>
//                 <option>Yearly</option>
//               </select>
//             </div>
//           </div>

//           {/* LINE CHART */}
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
//           {/* Card Header */}
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-base font-semibold text-gray-700 dark:text-gray-100">
//               Employee Overview
//             </h3>
//             {/* Overview Range Selector */}
//             <select
//               value={overviewRange}
//               onChange={(e) => setOverviewRange(e.target.value)}
//               className="border text-sm rounded px-2 py-1 bg-gray-50 
//                          dark:bg-gray-700 dark:text-gray-200"
//             >
//               <option>Today</option>
//               <option>This Week</option>
//               <option>This Month</option>
//             </select>
//           </div>

//           {/* DOUGHNUT CHART - Centered */}
//           <div className="flex flex-col items-center justify-center relative mt-20">
//             <div className="w-36 h-36">
//               <Doughnut data={dynamicDoughnutData} options={doughnutOptions} />
//             </div>
//           </div>

//           {/* Legend / Info */}
//           <div className="mt-10 flex justify-between space-x-6 text-lg  ">
//             <div className="flex items-center space-x-1">
//               <span
//                 className="inline-block w-3 h-3 rounded-full"
//                 style={{ backgroundColor: "#3b82f6" }}
//               ></span>
//               <span className="text-gray-600 dark:text-gray-200">
//                 Active: {activeCount}
//               </span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <span
//                 className="inline-block w-3 h-3 rounded-full"
//                 style={{ backgroundColor: "#f97316" }}
//               ></span>
//               <span className="text-gray-600 dark:text-gray-200">
//                 Inactive: {inactiveCount}
//               </span>
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
//         <div className="flex items-center justify-between border-b 
//                         border-gray-200 dark:border-gray-700 pb-2 mb-4"
//         >
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
//           <div>
//             <a href="#!" className="text-sm text-blue-500 hover:underline">
//               View All &rsaquo;
//             </a>
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
//             <tr className="bg-gray-100 dark:bg-gray-700 text-sm uppercase 
//                            text-gray-600 dark:text-gray-200"
//             >
//               <th className="px-4 py-2">Users</th>
//               <th className="px-4 py-2">Join Date</th>
//               <th className="px-4 py-2">Emp ID</th>
//               <th className="px-4 py-2">Department</th>
//               <th className="px-4 py-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {(activeTab === "active" ? activeEmployees : inactiveEmployees).map(
//               (emp, index) => (
//                 <tr
//                   key={index}
//                   className="border-b last:border-0 border-gray-200 
//                              dark:border-gray-700"
//                 >
//                   <td className="px-4 py-3">
//                     <div className="flex items-center space-x-2">
//                       {/* Placeholder avatar */}
//                       <div className="w-8 h-8 rounded-full bg-gray-300 
//                                      dark:bg-gray-600 flex-shrink-0"
//                       />
//                       <div>
//                         <p className="font-medium text-gray-800 dark:text-gray-100">
//                           {emp.name}
//                         </p>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">
//                           {emp.email}
//                         </p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
//                     {emp.date}
//                   </td>
//                   <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
//                     {emp.empID}
//                   </td>
//                   <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
//                     {emp.department}
//                   </td>
//                   <td className="px-4 py-3">
//                     <span
//                       className={`px-3 py-1 rounded-full text-sm font-medium ${
//                         emp.status === "Active"
//                           ? "bg-green-100 text-green-700 dark:bg-green-200"
//                           : "bg-red-100 text-red-700 dark:bg-red-200"
//                       }`}
//                     >
//                       {emp.status}
//                     </span>
//                   </td>
//                 </tr>
//               )
//             )}
//           </tbody>
//         </motion.table>
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

import useDashboardStore from "../../store/useDashboardEmpStore"; // <-- import the Zustand store

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
    lineChartData,      // { monthly, weekly, yearly: { labels, counts } }
    overviewData,       // { Today, "This Week", "This Month" }
    activeEmployees,    // array
    inactiveEmployees,  // array
    loading,
    error,
    fetchDashboardData
  } = useDashboardStore();

  // 2) Local UI state
  const [activeTab, setActiveTab] = useState("active");
  const [chartRange, setChartRange] = useState("Monthly");
  const [overviewRange, setOverviewRange] = useState("Today");

  // 3) Fetch data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // 4) Handle loading/error
  if (loading) {
    return <p className="p-4">Loading dashboard data...</p>;
  }
  if (error) {
    return <p className="p-4 text-red-600">Error: {error}</p>;
  }

  // If the store hasn't fetched or returned data yet
  if (!lineChartData || !overviewData) {
    return <p className="p-4">No data available.</p>;
  }

  // ---------------------------------------------
  // LINE CHART (Monthly/Weekly/Yearly)
  // ---------------------------------------------
  let chartLabels = [];
  let chartCounts = [];

  if (chartRange === "Monthly") {
    // The API gives an array of 12 numbers in lineChartData.monthly
    chartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    chartCounts = lineChartData.monthly || [];
  } else if (chartRange === "Weekly") {
    // The API gives an array of 12 numbers in lineChartData.weekly
    chartLabels = ["W1", "W2", "W3", "W4", "W5", "W6", 
                   "W7", "W8", "W9", "W10", "W11", "W12"];
    chartCounts = lineChartData.weekly || [];
  } else {
    // Yearly
    // Our API returns { labels: [...], counts: [...] } for yearly
    chartLabels = (lineChartData.yearly.labels || []).map(String); // convert years to strings
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

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 800 },
    scales: { y: { beginAtZero: true } },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  // ---------------------------------------------
  // DOUGHNUT (EMPLOYEE OVERVIEW)
  // ---------------------------------------------
  // The API returns something like overviewData = {
  //   Today: [activeCount, inactiveCount],
  //   "This Week": [...],
  //   "This Month": [...]
  // }
  const [activeCount, inactiveCount] = overviewData[overviewRange] || [0, 0];

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
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  // ---------------------------------------------
  // TABLE DATA (Active / Inactive Employees)
  // ---------------------------------------------
  // We already have two arrays from the API:
  // - activeEmployees
  // - inactiveEmployees
  const displayedEmployees = activeTab === "active" 
    ? activeEmployees 
    : inactiveEmployees;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-100">
          Dashboard
        </h1>
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
          {/* Card Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center space-x-2">
                {/* Example: total employees or some statistic */}
                <p className="text-2xl font-bold text-gray-700 dark:text-gray-100">
                  {chartCounts.reduce((acc, val) => acc + val, 0)}
                </p>
                <p className="text-sm text-green-500 font-medium">
                  +10% Total This Year
                </p>
              </div>
              <h2 className="text-base text-gray-500 dark:text-gray-300 mt-1">
                New Employee Added
              </h2>
            </div>
            {/* Chart Range Selector */}
            <div>
              <select
                value={chartRange}
                onChange={(e) => setChartRange(e.target.value)}
                className="border text-sm rounded px-2 py-1 bg-gray-50 
                           dark:bg-gray-700 dark:text-gray-200"
              >
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Yearly</option>
              </select>
            </div>
          </div>

          {/* LINE CHART */}
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
          {/* Card Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-700 dark:text-gray-100">
              Employee Overview
            </h3>
            {/* Overview Range Selector */}
            <select
              value={overviewRange}
              onChange={(e) => setOverviewRange(e.target.value)}
              className="border text-sm rounded px-2 py-1 bg-gray-50 
                         dark:bg-gray-700 dark:text-gray-200"
            >
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>

          {/* DOUGHNUT CHART - Centered */}
          <div className="flex flex-col items-center justify-center relative mt-20">
            <div className="w-36 h-36">
              <Doughnut data={dynamicDoughnutData} options={doughnutOptions} />
            </div>
          </div>

          {/* Legend / Info */}
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
        <div
          className="flex items-center justify-between border-b 
                     border-gray-200 dark:border-gray-700 pb-2 mb-4"
        >
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
          <div>
            <a href="#!" className="text-sm text-blue-500 hover:underline">
              View All &rsaquo;
            </a>
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
            <tr
              className="bg-gray-100 dark:bg-gray-700 text-sm uppercase 
                         text-gray-600 dark:text-gray-200"
            >
              <th className="px-4 py-2">Users</th>
              <th className="px-4 py-2">Join Date</th>
              <th className="px-4 py-2">Emp ID</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {displayedEmployees.map((emp, index) => (
              <tr
                key={index}
                className="border-b last:border-0 border-gray-200 
                           dark:border-gray-700"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    {/* Placeholder avatar */}
                    <div
                      className="w-8 h-8 rounded-full bg-gray-300 
                                 dark:bg-gray-600 flex-shrink-0"
                    />
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
      </motion.div>
    </div>
  );
};

export default EmployeesMain;

