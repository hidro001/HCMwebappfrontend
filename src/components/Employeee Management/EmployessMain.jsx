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
//     overviewData,  // { Overall: [activeCount, inactiveCount] }
//     activeEmployees,
//     inactiveEmployees,
//     loading,
//     error,
//     fetchDashboardData,
//   } = useDashboardStore();

//   // 2) Local UI state
//   const [activeTab, setActiveTab] = useState("active");
//   const [chartRange, setChartRange] = useState("Monthly");

//   // For pagination
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

//   // const lineChartOptions = {
//   //   responsive: true,
//   //   maintainAspectRatio: false,
//   //   animation: { duration: 800 },
//   //   scales: { y: { beginAtZero: true } },
//   //   plugins: { legend: { display: false }, tooltip: { enabled: true } },
//   // };

//   const lineChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     animation: { duration: 800 },
//     scales: {
//       y: {
//         beginAtZero: true,      // Start from 0
//         ticks: {
//           stepSize: 1,         // Only show whole numbers (1, 2, 3, 4...)
//         },
//       },
//     },
//     plugins: {
//       legend: { display: false },
//       tooltip: { enabled: true },
//     },
//   };
//   // ------------------------------------------------
//   // DOUGHNUT (EMPLOYEE OVERVIEW)
//   // ------------------------------------------------
//   // In your updated API response, "overview" has only "Overall": [active, inactive]
//   const [activeCount, inactiveCount] = overviewData.Overall || [0, 0];

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
//             <h3 className="text-base font-semibold text-gray-700 dark:text-gray-100">
//               Employee Overview
//             </h3>
//             {/* Removed the dropdown for Today/ThisWeek/ThisMonth, no longer needed */}
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
//               <span className="text-gray-600 dark:text-gray-200">
//                 Active: {activeCount}
//               </span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <span
//                 className="inline-block w-3 h-3 rounded-full"
//                 style={{ backgroundColor: "#f97316" }}
//               />
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
//                       <p className="font-medium text-gray-800 dark:text-gray-100">
//                         {emp.name}
//                       </p>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         {emp.email}
//                       </p>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
//                   {emp.date}
//                 </td>
//                 <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
//                   {emp.empID}
//                 </td>
//                 <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
//                   {emp.department}
//                 </td>
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
import { 
  FaSpinner, 
  FaTable, 
  FaTh, 
  FaUser, 
  FaCalendarAlt, 
  FaIdCard, 
  FaBuilding,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaArrowUp
} from "react-icons/fa";
import { 
  HiViewGrid, 
  HiViewList,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiSearch,
  HiFilter
} from "react-icons/hi";

// Import your Zustand store
import useDashboardStore from "../../store/useDashboardEmpStore";
import ConfirmationDialog from "../common/ConfirmationDialog";

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
    lineChartData,
    overviewData,
    activeEmployees,
    inactiveEmployees,
    loading,
    error,
    fetchDashboardData,
  } = useDashboardStore();

  // 2) Local UI state
  const [activeTab, setActiveTab] = useState("active");
  const [chartRange, setChartRange] = useState("Monthly");
  const [viewMode, setViewMode] = useState("table"); // table or card
  const [isAutoToggle, setIsAutoToggle] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // For pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Auto-toggle based on screen size
  useEffect(() => {
    if (isAutoToggle) {
      const handleResize = () => {
        setViewMode(window.innerWidth < 768 ? "card" : "table");
      };
      
      handleResize(); // Set initial view mode
      window.addEventListener("resize", handleResize);
      
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [isAutoToggle]);

  // Reset page when switching between active and inactive
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // 3) Fetch data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // 4) Handle loading or error
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center space-y-4 animate-pulse">
          <div className="relative">
            <FaSpinner className="text-6xl text-blue-600 dark:text-blue-400 animate-spin mx-auto" />
            <div className="absolute inset-0 bg-blue-600 dark:bg-blue-400 rounded-full animate-ping opacity-20"></div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Loading Dashboard</h2>
            <p className="text-gray-600 dark:text-gray-400">Please wait while we fetch your data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-red-900 flex items-center justify-center">
        <div className="text-center space-y-4 animate-bounce">
          <div className="text-6xl text-red-600 dark:text-red-400">⚠️</div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-red-800 dark:text-red-200">Error Loading Data</h2>
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!lineChartData || !overviewData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">No data available.</p>
      </div>
    );
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
    chartLabels = ["W1", "W2", "W3", "W4", "W5"];
    chartCounts = lineChartData.weekly || [];
  } else {
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
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 800 },
    scales: {
      x: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          color: '#6b7280',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          stepSize: 1,
          color: '#6b7280',
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { 
        enabled: true,
        backgroundColor: 'rgba(17, 24, 39, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#3b82f6',
        borderWidth: 1,
      },
    },
  };

  // ------------------------------------------------
  // DOUGHNUT (EMPLOYEE OVERVIEW)
  // ------------------------------------------------
  const [activeCount, inactiveCount] = overviewData.Overall || [0, 0];
  const totalCount = activeCount + inactiveCount;

  const dynamicDoughnutData = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        data: [activeCount, inactiveCount],
        backgroundColor: ["#10b981", "#ef4444"],
        hoverBackgroundColor: ["#059669", "#dc2626"],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    cutout: "70%",
    animation: { duration: 800 },
    plugins: { 
      legend: { display: false }, 
      tooltip: { 
        enabled: true,
        backgroundColor: 'rgba(17, 24, 39, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
      } 
    },
  };

  // ------------------------------------------------
  // TABLE/CARD DATA + Pagination + Search
  // ------------------------------------------------
  const displayedEmployees = activeTab === "active" ? activeEmployees : inactiveEmployees;
  
  // Filter by search term
  const filteredEmployees = displayedEmployees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.empID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEmployees = filteredEmployees.length;
  const totalPages = Math.ceil(totalEmployees / itemsPerPage);
  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Modern pagination functions
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPage = (page) => setCurrentPage(page);

  // Get page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const handleViewModeToggle = (mode) => {
    setViewMode(mode);
    setIsAutoToggle(false);
  };

  const handleAutoToggle = () => {
    setIsAutoToggle(!isAutoToggle);
    if (!isAutoToggle) {
      setViewMode(window.innerWidth < 768 ? "card" : "table");
    }
  };

  // Card Component - Fixed overflow issues
  const EmployeeCard = ({ emp }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-200 hover:border-blue-200 dark:hover:border-blue-700 w-full min-w-0">
      {/* Header with Avatar and Status */}
      <div className="flex items-start gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="relative flex-shrink-0">
            <img
              src={emp.userAvatar}
              alt={emp.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
              emp.status === "Active" ? "bg-green-500" : "bg-red-500"
            }`}></div>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm leading-tight truncate">
              {emp.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight truncate mt-0.5">
              {emp.email}
            </p>
          </div>
        </div>
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${
          emp.status === "Active"
            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
            : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
        }`}>
          {emp.status}
        </span>
      </div>
      
      {/* Employee Details */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 min-w-0">
          <FaIdCard className="w-3 h-3 text-blue-500 flex-shrink-0" />
          <span className="text-xs text-gray-600 dark:text-gray-300 font-medium truncate">
            ID: {emp.empID}
          </span>
        </div>
        <div className="flex items-center gap-2 min-w-0">
          <FaBuilding className="w-3 h-3 text-purple-500 flex-shrink-0" />
          <span className="text-xs text-gray-600 dark:text-gray-300 truncate">
            {emp.department}
          </span>
        </div>
        <div className="flex items-center gap-2 min-w-0">
          <FaCalendarAlt className="w-3 h-3 text-orange-500 flex-shrink-0" />
          <span className="text-xs text-gray-600 dark:text-gray-300 truncate">
            Joined {emp.date}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 transition-colors duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
            <FaUsers className="text-blue-600 dark:text-blue-400" />
            <span>Employee Dashboard</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and monitor your workforce</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Total: {totalCount} employees
            </span>
          </div>
        </div>
      </div>

      {/* Top Row: Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transform hover:scale-105 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalCount}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <FaUsers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transform hover:scale-105 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{activeCount}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <FaUserCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transform hover:scale-105 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Inactive</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{inactiveCount}</p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
              <FaUserTimes className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transform hover:scale-105 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">New This Period</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {chartCounts.reduce((acc, val) => acc + val, 0)}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <FaArrowUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Line Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transform hover:shadow-lg transition-all duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                <FaArrowUp className="text-blue-600 dark:text-blue-400" />
                <span>Employee Growth</span>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">New employees added over time</p>
            </div>
            <div className="relative">
              <select
                value={chartRange}
                onChange={(e) => setChartRange(e.target.value)}
                className="appearance-none bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Yearly</option>
              </select>
              <FaChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="h-64">
            <Line data={dynamicLineChartData} options={lineChartOptions} />
          </div>
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transform hover:shadow-lg transition-all duration-200">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
              <span>Employee Distribution</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active vs Inactive breakdown</p>
          </div>
          
          <div className="relative flex justify-center mb-6">
            <div className="w-40 h-40 relative">
              <Doughnut data={dynamicDoughnutData} options={doughnutOptions} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalCount}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active</span>
              </div>
              <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{activeCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Inactive</span>
              </div>
              <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{inactiveCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Employee List Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transform hover:shadow-lg transition-all duration-200">
        {/* Header with tabs and controls */}
        <div className="border-b border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("active")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === "active"
                    ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
              >
                Active ({activeEmployees.length})
              </button>
              <button
                onClick={() => setActiveTab("inactive")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === "inactive"
                    ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
              >
                Inactive ({inactiveEmployees.length})
              </button>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              {/* Search */}
              <div className="relative">
                <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-full sm:w-64 transition-all duration-200"
                />
              </div>

              {/* View Toggle */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => handleViewModeToggle("table")}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewMode === "table"
                        ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    }`}
                    title="Table View"
                  >
                    <HiViewList className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleViewModeToggle("card")}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewMode === "card"
                        ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    }`}
                    title="Card View"
                  >
                    <HiViewGrid className="w-4 h-4" />
                  </button>
                </div>
                
                <button
                  onClick={handleAutoToggle}
                  className={`px-3 py-2 text-xs font-medium rounded-md transition-all duration-200 ${
                    isAutoToggle
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  }`}
                  title="Auto toggle between views based on screen size"
                >
                  Auto
                </button>
              </div>

              {/* Items per page */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Show:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border border-gray-200 dark:border-gray-600 rounded-md px-2 py-1 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentEmployees.length === 0 ? (
            <div className="text-center py-12">
              <FaUser className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No employees found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchTerm ? "Try adjusting your search terms" : "No employees in this category"}
              </p>
            </div>
          ) : (
            <>
              {/* Table View */}
              {viewMode === "table" && (
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400 text-sm">Employee</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400 text-sm">Employee ID</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400 text-sm">Department</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400 text-sm">Join Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400 text-sm">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {currentEmployees.map((emp, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="relative">
                                <img
                                  src={emp.userAvatar}
                                  alt={emp.name}
                                  className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-600"
                                />
                                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
                                  emp.status === "Active" ? "bg-green-500" : "bg-red-500"
                                }`}></div>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-gray-100">{emp.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{emp.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-600 dark:text-gray-300 font-mono text-sm">
                            {emp.empID}
                          </td>
                          <td className="py-4 px-4 text-gray-600 dark:text-gray-300">
                            {emp.department}
                          </td>
                          <td className="py-4 px-4 text-gray-600 dark:text-gray-300">
                            {emp.date}
                          </td>
                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              emp.status === "Active"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            }`}>
                              {emp.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Card View */}
              {viewMode === "card" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
                  {currentEmployees.map((emp, index) => (
                    <EmployeeCard key={index} emp={emp} />
                  ))}
                </div>
              )}

              {/* Mobile Table View (Always cards on small screens) */}
              {viewMode === "table" && (
                <div className="md:hidden">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentEmployees.map((emp, index) => (
                      <EmployeeCard key={index} emp={emp} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modern Pagination */}
        {totalPages > 1 && (
          <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              {/* Results info */}
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing <span className="font-medium">{indexOfFirstEmployee + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastEmployee, totalEmployees)}
                </span>{" "}
                of <span className="font-medium">{totalEmployees}</span> results
              </div>

              {/* Pagination controls */}
              <div className="flex items-center space-x-2">
                {/* First page */}
                <button
                  onClick={goToFirstPage}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  title="First page"
                >
                  <HiChevronDoubleLeft className="w-4 h-4" />
                </button>

                {/* Previous page */}
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  title="Previous page"
                >
                  <FaChevronLeft className="w-4 h-4" />
                </button>

                {/* Page numbers */}
                <div className="flex items-center space-x-1">
                  {getPageNumbers().map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                        currentPage === page
                          ? "bg-blue-600 text-white shadow-sm"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                {/* Next page */}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  title="Next page"
                >
                  <FaChevronRight className="w-4 h-4" />
                </button>

                {/* Last page */}
                <button
                  onClick={goToLastPage}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  title="Last page"
                >
                  <HiChevronDoubleRight className="w-4 h-4" />
                </button>

                {/* Jump to page */}
                <div className="hidden sm:flex items-center space-x-2 ml-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Go to:</span>
                  <input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={currentPage}
                    onChange={(e) => {
                      const page = Number(e.target.value);
                      if (page >= 1 && page <= totalPages) {
                        goToPage(page);
                      }
                    }}
                    className="w-16 px-2 py-1 text-sm border border-gray-200 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={showConfirmDialog}
        title="Confirm Action"
        message="Are you sure you want to perform this action?"
        onConfirm={() => {
          setShowConfirmDialog(false);
          // Add your confirm logic here
        }}
        onCancel={() => setShowConfirmDialog(false)}
        type="warning"
        confirmText="Yes, Continue"
        cancelText="Cancel"
      />
    </div>
  );
};

export default EmployeesMain;