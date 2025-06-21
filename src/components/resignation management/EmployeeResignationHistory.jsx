// import React, { useState, useEffect, useMemo, useRef } from "react";
// import { motion } from "framer-motion";
// import {
//   FaEye,
//   FaPrint,
//   FaFilePdf,
//   FaArrowUp,
//   FaArrowDown,
// } from "react-icons/fa";
// import { MdOutlineFileDownload } from "react-icons/md";
// import { Skeleton } from "@mui/material";
// import useResignationStore from "../../store/useResignationStore";
// import ResignationDetailsModal from "./model/ResignationDetailsModal";
// import { Bar, Line } from "react-chartjs-2";
// import ExportButtons from "../common/PdfExcel"; // Adjust path as needed

// const tableContainerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { when: "beforeChildren", staggerChildren: 0.05 },
//   },
// };

// const tableRowVariants = {
//   hidden: { opacity: 0, y: 10 },
//   visible: { opacity: 1, y: 0 },
// };

// export default function EmployeeResignationHistory() {
//   // Destructure required values from the store.
//   const {
//     resignations,
//     chartData,
//     loading,
//     totalPages,
//     totalResignations,
//     currentPage,
//     filters,
//     fetchSuperadminResignations,
//     setFilters,
//     setCurrentPage,
//   } = useResignationStore();

//   // Local state for filter inputs.
//   const [searchText, setSearchText] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   // Chart period: "Yearly" (group by month) or "Monthly" (group by day).
//   const [chartPeriod, setChartPeriod] = useState("Yearly");
//   const [selectedYear, setSelectedYear] = useState(""); // e.g. "2025"
//   const [selectedMonth, setSelectedMonth] = useState(""); // e.g. "2" for February
//   // Chart type: "bar" or "line".
//   const [selectedChart, setSelectedChart] = useState("bar");

//   // Modal state.
//   const [showModal, setShowModal] = useState(false);
//   const [selectedResignation, setSelectedResignation] = useState(null);
//   const chartRef = useRef(null);

//   // Update store filters when local inputs change.
//   useEffect(() => {
//     const newFilters = {
//       search: searchText,
//       status: statusFilter === "All" ? "" : statusFilter,
//       year: selectedYear,
//       month: chartPeriod === "Monthly" ? selectedMonth : "",
//     };
//     setFilters(newFilters);
//     setCurrentPage(1);
//   }, [
//     searchText,
//     statusFilter,
//     selectedYear,
//     selectedMonth,
//     chartPeriod,
//     setFilters,
//     setCurrentPage,
//   ]);

//   // Fetch data whenever filters or currentPage change.
//   useEffect(() => {
//     fetchSuperadminResignations();
//   }, [filters, currentPage, fetchSuperadminResignations]);

//   // Prepare chart data.
//   const preparedChartData = useMemo(() => {
//     if (!chartData) return null;
//     let labels = [];
//     let counts = [];
//     if (chartPeriod === "Monthly") {
//       // Group by day.
//       const sorted = chartData.sort((a, b) => a._id.day - b._id.day);
//       labels = sorted.map((item) => `Day ${item._id.day}`);
//       counts = sorted.map((item) => item.count);
//     } else {
//       // Yearly view: group by month.
//       const sorted = chartData.sort((a, b) => a._id.month - b._id.month);
//       labels = sorted.map((item) => {
//         const date = new Date(0, item._id.month - 1);
//         return date.toLocaleString("default", { month: "short" });
//       });
//       counts = sorted.map((item) => item.count);
//     }
//     return {
//       labels,
//       datasets: [
//         {
//           label: "Number of Resignations",
//           data: counts,
//           backgroundColor:
//             selectedChart === "bar"
//               ? "rgba(54, 162, 235, 0.6)"
//               : "rgba(255, 99, 132, 0.2)",
//           borderColor:
//             selectedChart === "bar"
//               ? "rgba(54, 162, 235, 1)"
//               : "rgba(255, 99, 132, 1)",
//           borderWidth: 1,
//           fill: selectedChart === "line",
//           tension: selectedChart === "line" ? 0.4 : 0,
//         },
//       ],
//     };
//   }, [chartData, chartPeriod, selectedChart]);

//   // Compute summary statistics.
//   const pendingCount = useMemo(
//     () => resignations.filter((r) => r.status === "Pending").length,
//     [resignations]
//   );
//   const approvedCount = useMemo(
//     () => resignations.filter((r) => r.status === "Approved").length,
//     [resignations]
//   );
//   const rejectedCount = useMemo(
//     () => resignations.filter((r) => r.status === "Rejected").length,
//     [resignations]
//   );

//   // Transform resignation records for the table.
//   const transformedResignations = useMemo(() => {
//     return resignations.map((r) => ({
//       id: r._id,
//       empNameAndId: r.employee
//         ? `${r.employee.first_Name} ${r.employee.last_Name} (${r.employee.employee_Id})`
//         : "N/A",
//       resignationDate: r.resignationDate
//         ? new Date(r.resignationDate).toLocaleDateString()
//         : "N/A",
//       lastWorkingDay: r.lastWorkingDay
//         ? new Date(r.lastWorkingDay).toLocaleDateString()
//         : "N/A",
//       reason: r.comments || "N/A",
//       department: r.employee?.department || "N/A",
//       designation: r.employee?.designation || "N/A",
//       status: r.status || "N/A",
//       submittedAt: r.createdAt ? new Date(r.createdAt).toLocaleString() : "N/A",
//     }));
//   }, [resignations]);

//   // Flatten the transformedResignations data for export
//   const exportData = transformedResignations.map((item, index) => ({
//     sl: String((currentPage - 1) * 10 + (index + 1)).padStart(2, "0"),
//     employee: item.empNameAndId,
//     resignationDate: item.resignationDate,
//     lastWorkingDay: item.lastWorkingDay,
//     reason: item.reason,
//     department: item.department,
//     designation: item.designation,
//     status: item.status,
//     submittedAt: item.submittedAt,
//   }));

//   // Define columns for PDF/CSV/Excel
//   const columns = [
//     { header: "S.L", dataKey: "sl" },
//     { header: "Employee", dataKey: "employee" },
//     { header: "Resignation Date", dataKey: "resignationDate" },
//     { header: "Last Working Day", dataKey: "lastWorkingDay" },
//     { header: "Reason", dataKey: "reason" },
//     { header: "Department", dataKey: "department" },
//     { header: "Designation", dataKey: "designation" },
//     { header: "Status", dataKey: "status" },
//     { header: "Submitted At", dataKey: "submittedAt" },
//   ];

//   return (
//     <div className="mx-auto p-4 dark:bg-gray-900 dark:text-gray-100 transition-colors">
//       {/* TOP SUMMARY CARDS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//         <div className="p-4 rounded-lg shadow bg-blue-500 text-white">
//           <h5>Total Resignations</h5>
//           <h3 className="text-2xl font-bold">{totalResignations}</h3>
//         </div>
//         <div className="p-4 rounded-lg shadow bg-orange-500 text-white">
//           <h5>Pending</h5>
//           <h3 className="text-2xl font-bold">{pendingCount}</h3>
//         </div>
//         <div className="p-4 rounded-lg shadow bg-green-500 text-white">
//           <h5>Approved</h5>
//           <h3 className="text-2xl font-bold">{approvedCount}</h3>
//         </div>
//         <div className="p-4 rounded-lg shadow bg-red-500 text-white">
//           <h5>Rejected</h5>
//           <h3 className="text-2xl font-bold">{rejectedCount}</h3>
//         </div>
//       </div>

//       {/* FILTERS AND CHART PERIOD SELECTION */}
//       <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-md shadow mb-4">
//         <div className="flex items-center gap-4">
//           <input
//             type="text"
//             placeholder="Search by Employee Name or ID"
//             className="border rounded px-3 py-1 text-sm bg-white dark:bg-gray-700"
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//           />
//           <select
//             className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700"
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//           >
//             <option value="All">All Status</option>
//             <option value="Pending">Pending</option>
//             <option value="Approved">Approved</option>
//             <option value="Rejected">Rejected</option>
//             <option value="Completed">Completed</option>
//           </select>
//           <select
//             className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700"
//             value={chartPeriod}
//             onChange={(e) => {
//               setChartPeriod(e.target.value);
//               setSelectedYear("");
//               setSelectedMonth("");
//             }}
//           >
//             <option value="Yearly">Yearly</option>
//             <option value="Monthly">Monthly</option>
//           </select>
//           <input
//             type="number"
//             placeholder="Year (e.g. 2025)"
//             className="border rounded px-3 py-1 text-sm w-32 bg-white dark:bg-gray-700"
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(e.target.value)}
//           />
//           {chartPeriod === "Monthly" && (
//             <select
//               className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700"
//               value={selectedMonth}
//               onChange={(e) => setSelectedMonth(e.target.value)}
//             >
//               <option value="">Select Month</option>
//               {[
//                 "January",
//                 "February",
//                 "March",
//                 "April",
//                 "May",
//                 "June",
//                 "July",
//                 "August",
//                 "September",
//                 "October",
//                 "November",
//                 "December",
//               ].map((m, idx) => (
//                 <option key={idx + 1} value={idx + 1}>
//                   {m}
//                 </option>
//               ))}
//             </select>
//           )}
//         </div>
//         <div className="flex items-center gap-4">
//           <ExportButtons
//             data={exportData}
//             columns={columns}
//             filename="EmployeeResignations"
//           />
//         </div>
//       </div>

//       {/* CHART SECTION */}
//       <div className="bg-white dark:bg-gray-800 rounded-md shadow p-4 mb-6">
//         <div className="flex items-center justify-between mb-2">
//           <h2 className="text-lg font-semibold">Resignations Statistics</h2>
//           <select
//             className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700"
//             value={selectedChart}
//             onChange={(e) => setSelectedChart(e.target.value)}
//           >
//             <option value="bar">Bar Chart</option>
//             <option value="line">Line Chart</option>
//           </select>
//         </div>
//         <p className="text-sm text-gray-400 mb-4">Overview of resignations</p>
//         {loading || !preparedChartData ? (
//           <Skeleton variant="rectangular" height={220} />
//         ) : (
//           <div className="h-auto w-full">
//             {selectedChart === "bar" ? (
//               <Bar
//                 data={preparedChartData}
//                 options={{
//                   responsive: true,
//                   plugins: {
//                     legend: { position: "top" },
//                     title: {
//                       display: true,
//                       text:
//                         chartPeriod === "Monthly"
//                           ? "Resignations by Day"
//                           : "Resignations by Month",
//                     },
//                   },
//                 }}
//               />
//             ) : (
//               <Line
//                 data={preparedChartData}
//                 options={{
//                   responsive: true,
//                   plugins: {
//                     legend: { position: "top" },
//                     title: {
//                       display: true,
//                       text:
//                         chartPeriod === "Monthly"
//                           ? "Resignations by Day"
//                           : "Resignations by Month",
//                     },
//                   },
//                   scales: {
//                     y: { beginAtZero: true, ticks: { stepSize: 1 } },
//                   },
//                 }}
//               />
//             )}
//           </div>
//         )}
//       </div>

//       {/* TABLE SECTION */}
//       {loading ? (
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow">
//           {Array.from({ length: 10 }).map((_, i) => (
//             <Skeleton
//               key={i}
//               variant="rectangular"
//               height={40}
//               className="mb-2"
//             />
//           ))}
//         </div>
//       ) : (
//         <>
//           {transformedResignations.length > 0 ? (
//             <motion.div
//               className="bg-white dark:bg-gray-800 rounded-md shadow overflow-x-auto"
//               initial="hidden"
//               animate="visible"
//               variants={tableContainerVariants}
//             >
//               <motion.table className="w-full text-left border-collapse">
//                 <thead className="bg-gray-100 dark:bg-gray-700">
//                   <tr>
//                     <th className="p-3 text-sm font-semibold">S.L</th>
//                     <th className="p-3 text-sm font-semibold">Employee</th>
//                     <th className="p-3 text-sm font-semibold">
//                       Resignation Date
//                     </th>
//                     <th className="p-3 text-sm font-semibold">
//                       Last Working Day
//                     </th>
//                     <th className="p-3 text-sm font-semibold">Reason</th>
//                     <th className="p-3 text-sm font-semibold">Department</th>
//                     <th className="p-3 text-sm font-semibold">Designation</th>
//                     <th className="p-3 text-sm font-semibold">Status</th>
//                     <th className="p-3 text-sm font-semibold">Submitted At</th>
//                     <th className="p-3 text-sm font-semibold">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {transformedResignations.map((item, index) => {
//                     const rowIndex = (currentPage - 1) * 10 + (index + 1);
//                     let statusClasses =
//                       "bg-gray-100 text-gray-700 border px-2 py-1 rounded text-xs font-semibold";
//                     if (item.status === "Pending") {
//                       statusClasses =
//                         "bg-orange-50 text-orange-600 border px-2 py-1 rounded text-xs font-semibold";
//                     } else if (item.status === "Approved") {
//                       statusClasses =
//                         "bg-green-50 text-green-600 border px-2 py-1 rounded text-xs font-semibold";
//                     } else if (item.status === "Rejected") {
//                       statusClasses =
//                         "bg-red-50 text-red-600 border px-2 py-1 rounded text-xs font-semibold";
//                     }
//                     return (
//                       <motion.tr
//                         key={item.id}
//                         variants={tableRowVariants}
//                         className="border-b hover:bg-gray-50  dark:hover:bg-gray-700 transition-colors"
//                       >
//                         <td className="p-3 text-sm">
//                           {String(rowIndex).padStart(2, "0")}
//                         </td>
//                         <td className="p-3 text-sm">{item.empNameAndId}</td>
//                         <td className="p-3 text-sm">{item.resignationDate}</td>
//                         <td className="p-3 text-sm">{item.lastWorkingDay}</td>
//                         <td className="p-3 text-sm">{item.reason}</td>
//                         <td className="p-3 text-sm">{item.department}</td>
//                         <td className="p-3 text-sm">{item.designation}</td>
//                         <td className="p-3 text-sm">
//                           <span className={statusClasses}>{item.status}</span>
//                         </td>
//                         <td className="p-3 text-sm">{item.submittedAt}</td>
//                         <td className="p-3 text-sm">
//                           <button
//                             className="text-blue-500 hover:text-blue-600 transition-colors"
//                             onClick={() => {
//                               setSelectedResignation(item);
//                               setShowModal(true);
//                             }}
//                           >
//                             <FaEye />
//                           </button>
//                         </td>
//                       </motion.tr>
//                     );
//                   })}
//                 </tbody>
//               </motion.table>
//               <div className="flex flex-col md:flex-row justify-between items-center p-3 text-sm">
//                 <div>
//                   Showing {transformedResignations.length} of{" "}
//                   {totalResignations} entries
//                 </div>
//                 <div className="flex space-x-1">
//                   {Array.from({ length: totalPages }, (_, i) => (
//                     <button
//                       key={i}
//                       className={`px-3 py-1 rounded border transition-colors ${
//                         currentPage === i + 1
//                           ? "bg-blue-600 text-white"
//                           : "bg-white dark:bg-gray-700 text-gray-700 hover:bg-gray-50"
//                       }`}
//                       onClick={() => setCurrentPage(i + 1)}
//                     >
//                       {i + 1}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           ) : (
//             <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow text-center text-gray-500">
//               No matching records found
//             </div>
//           )}
//         </>
//       )}

//       <ResignationDetailsModal
//         isOpen={showModal}
//         data={selectedResignation}
//         onClose={() => {
//           setShowModal(false);
//           setSelectedResignation(null);
//         }}
//       />
//     </div>
//   );
// }



import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiEye,
  FiPrinter,
  FiDownload,
  FiArrowUp,
  FiArrowDown,
  FiUsers,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiSearch,
  FiFilter,
  FiCalendar,
  FiBarChart2,
  FiTrendingUp,
  FiUser,
  FiHome,
  FiBriefcase,
  FiMessageSquare,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { Skeleton } from "@mui/material";
import useResignationStore from "../../store/useResignationStore";
import ResignationDetailsModal from "./model/ResignationDetailsModal";
import { Bar, Line } from "react-chartjs-2";
import ExportButtons from "../common/PdfExcel";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

export default function EmployeeResignationHistory() {
  const {
    resignations,
    chartData,
    loading,
    totalPages,
    totalResignations,
    currentPage,
    filters,
    fetchSuperadminResignations,
    setFilters,
    setCurrentPage,
  } = useResignationStore();

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [chartPeriod, setChartPeriod] = useState("Yearly");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedChart, setSelectedChart] = useState("bar");
  const [showFilters, setShowFilters] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedResignation, setSelectedResignation] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const newFilters = {
      search: searchText,
      status: statusFilter === "All" ? "" : statusFilter,
      year: selectedYear,
      month: chartPeriod === "Monthly" ? selectedMonth : "",
    };
    setFilters(newFilters);
    setCurrentPage(1);
  }, [
    searchText,
    statusFilter,
    selectedYear,
    selectedMonth,
    chartPeriod,
    setFilters,
    setCurrentPage,
  ]);

  useEffect(() => {
    fetchSuperadminResignations();
  }, [filters, currentPage, fetchSuperadminResignations]);

  const preparedChartData = useMemo(() => {
    if (!chartData) return null;
    let labels = [];
    let counts = [];
    if (chartPeriod === "Monthly") {
      const sorted = chartData.sort((a, b) => a._id.day - b._id.day);
      labels = sorted.map((item) => `Day ${item._id.day}`);
      counts = sorted.map((item) => item.count);
    } else {
      const sorted = chartData.sort((a, b) => a._id.month - b._id.month);
      labels = sorted.map((item) => {
        const date = new Date(0, item._id.month - 1);
        return date.toLocaleString("default", { month: "short" });
      });
      counts = sorted.map((item) => item.count);
    }
    return {
      labels,
      datasets: [
        {
          label: "Number of Resignations",
          data: counts,
          backgroundColor: selectedChart === "bar" 
            ? "rgba(59, 130, 246, 0.8)" 
            : "rgba(239, 68, 68, 0.1)",
          borderColor: selectedChart === "bar" 
            ? "rgba(59, 130, 246, 1)" 
            : "rgba(239, 68, 68, 1)",
          borderWidth: 2,
          fill: selectedChart === "line",
          tension: selectedChart === "line" ? 0.4 : 0,
        },
      ],
    };
  }, [chartData, chartPeriod, selectedChart]);

  const pendingCount = useMemo(
    () => resignations.filter((r) => r.status === "Pending").length,
    [resignations]
  );
  const approvedCount = useMemo(
    () => resignations.filter((r) => r.status === "Approved").length,
    [resignations]
  );
  const rejectedCount = useMemo(
    () => resignations.filter((r) => r.status === "Rejected").length,
    [resignations]
  );

  const transformedResignations = useMemo(() => {
    return resignations.map((r) => ({
      id: r._id,
      empNameAndId: r.employee
        ? `${r.employee.first_Name} ${r.employee.last_Name} (${r.employee.employee_Id})`
        : "N/A",
      resignationDate: r.resignationDate
        ? new Date(r.resignationDate).toLocaleDateString()
        : "N/A",
      lastWorkingDay: r.lastWorkingDay
        ? new Date(r.lastWorkingDay).toLocaleDateString()
        : "N/A",
      reason: r.comments || "N/A",
      department: r.employee?.department || "N/A",
      designation: r.employee?.designation || "N/A",
      status: r.status || "N/A",
      submittedAt: r.createdAt ? new Date(r.createdAt).toLocaleString() : "N/A",
    }));
  }, [resignations]);

  const exportData = transformedResignations.map((item, index) => ({
    sl: String((currentPage - 1) * 10 + (index + 1)).padStart(2, "0"),
    employee: item.empNameAndId,
    resignationDate: item.resignationDate,
    lastWorkingDay: item.lastWorkingDay,
    reason: item.reason,
    department: item.department,
    designation: item.designation,
    status: item.status,
    submittedAt: item.submittedAt,
  }));

  const columns = [
    { header: "S.L", dataKey: "sl" },
    { header: "Employee", dataKey: "employee" },
    { header: "Resignation Date", dataKey: "resignationDate" },
    { header: "Last Working Day", dataKey: "lastWorkingDay" },
    { header: "Reason", dataKey: "reason" },
    { header: "Department", dataKey: "department" },
    { header: "Designation", dataKey: "designation" },
    { header: "Status", dataKey: "status" },
    { header: "Submitted At", dataKey: "submittedAt" },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <FiClock className="w-4 h-4" />;
      case "Approved":
        return <FiCheckCircle className="w-4 h-4" />;
      case "Rejected":
        return <FiXCircle className="w-4 h-4" />;
      default:
        return <FiClock className="w-4 h-4" />;
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800";
      case "Approved":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
    }
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <motion.div
      variants={itemVariants}
      className={`p-6 rounded-xl shadow-sm border transition-all duration-200 hover:shadow-md ${color} bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );

  const ResignationCard = ({ item, index }) => {
    const rowIndex = (currentPage - 1) * 10 + (index + 1);
    
    return (
      <motion.div
        variants={cardVariants}
        layout
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {String(rowIndex).padStart(2, "0")}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                {item.empNameAndId}
              </h3>
              <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyles(item.status)}`}>
                {getStatusIcon(item.status)}
                <span>{item.status}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setSelectedResignation(item);
              setShowModal(true);
            }}
            className="p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
          >
            <FiEye className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <FiCalendar className="w-4 h-4" />
            <div>
              <span className="font-medium">Resignation:</span>
              <p className="text-gray-900 dark:text-white">{item.resignationDate}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <FiCalendar className="w-4 h-4" />
            <div>
              <span className="font-medium">Last Working:</span>
              <p className="text-gray-900 dark:text-white">{item.lastWorkingDay}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <FiHome className="w-4 h-4" />
            <div>
              <span className="font-medium">Department:</span>
              <p className="text-gray-900 dark:text-white">{item.department}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <FiBriefcase className="w-4 h-4" />
            <div>
              <span className="font-medium">Designation:</span>
              <p className="text-gray-900 dark:text-white">{item.designation}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <FiMessageSquare className="w-4 h-4 mt-0.5" />
            <div className="flex-1">
              <span className="font-medium">Reason:</span>
              <p className="text-gray-900 dark:text-white mt-1">{item.reason}</p>
            </div>
          </div>
        </div>

        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          Submitted: {item.submittedAt}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Employee Resignations
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and track employee resignation requests
          </p>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <StatCard
            title="Total Resignations"
            value={totalResignations}
            icon={FiUsers}
            color="bg-blue-500"
          />
          <StatCard
            title="Pending"
            value={pendingCount}
            icon={FiClock}
            color="bg-amber-500"
          />
          <StatCard
            title="Approved"
            value={approvedCount}
            icon={FiCheckCircle}
            color="bg-green-500"
          />
          <StatCard
            title="Rejected"
            value={rejectedCount}
            icon={FiXCircle}
            color="bg-red-500"
          />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by Employee Name or ID"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <FiFilter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>

            <ExportButtons
              data={exportData}
              columns={columns}
              filename="EmployeeResignations"
            />
          </div>

          <AnimatePresence>
            {(showFilters || window.innerWidth >= 1024) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
              >
                <select
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Completed">Completed</option>
                </select>

                <select
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={chartPeriod}
                  onChange={(e) => {
                    setChartPeriod(e.target.value);
                    setSelectedYear("");
                    setSelectedMonth("");
                  }}
                >
                  <option value="Yearly">Yearly</option>
                  <option value="Monthly">Monthly</option>
                </select>

                <input
                  type="number"
                  placeholder="Year (e.g. 2025)"
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                />

                {chartPeriod === "Monthly" && (
                  <select
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    <option value="">Select Month</option>
                    {[
                      "January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December",
                    ].map((m, idx) => (
                      <option key={idx + 1} value={idx + 1}>
                        {m}
                      </option>
                    ))}
                  </select>
                )}

                <select
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedChart}
                  onChange={(e) => setSelectedChart(e.target.value)}
                >
                  <option value="bar">Bar Chart</option>
                  <option value="line">Line Chart</option>
                </select>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Resignations Statistics
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Overview of resignations over time
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <FiBarChart2 className="w-5 h-5 text-gray-400" />
              <FiTrendingUp className="w-5 h-5 text-green-500" />
            </div>
          </div>

          {loading || !preparedChartData ? (
            <Skeleton variant="rectangular" height={300} className="rounded-lg" />
          ) : (
            <div className="h-80">
              {selectedChart === "bar" ? (
                <Bar
                  data={preparedChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { position: "top" },
                      title: {
                        display: true,
                        text: chartPeriod === "Monthly"
                          ? "Resignations by Day"
                          : "Resignations by Month",
                      },
                    },
                    scales: {
                      y: { beginAtZero: true, ticks: { stepSize: 1 } },
                    },
                  }}
                />
              ) : (
                <Line
                  data={preparedChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { position: "top" },
                      title: {
                        display: true,
                        text: chartPeriod === "Monthly"
                          ? "Resignations by Day"
                          : "Resignations by Month",
                      },
                    },
                    scales: {
                      y: { beginAtZero: true, ticks: { stepSize: 1 } },
                    },
                  }}
                />
              )}
            </div>
          )}
        </motion.div>

        {/* Data Display */}
        {loading ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} variant="rectangular" height={100} className="rounded-lg" />
              ))}
            </div>
          </div>
        ) : (
          <>
            {transformedResignations.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Desktop Table */}
                <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            S.L
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Employee
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Resignation Date
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Last Working Day
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Department
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {transformedResignations.map((item, index) => {
                          const rowIndex = (currentPage - 1) * 10 + (index + 1);
                          return (
                            <motion.tr
                              key={item.id}
                              variants={itemVariants}
                              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {String(rowIndex).padStart(2, "0")}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mr-3">
                                    <FiUser className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                  </div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {item.empNameAndId}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {item.resignationDate}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {item.lastWorkingDay}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {item.department}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyles(item.status)}`}>
                                  {getStatusIcon(item.status)}
                                  <span>{item.status}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <button
                                  onClick={() => {
                                    setSelectedResignation(item);
                                    setShowModal(true);
                                  }}
                                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-2 rounded-lg transition-colors"
                                >
                                  <FiEye className="w-4 h-4" />
                                </button>
                              </td>
                            </motion.tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mobile/Tablet Cards */}
                <div className="lg:hidden space-y-4">
                  <AnimatePresence mode="wait">
                    {transformedResignations.map((item, index) => (
                      <ResignationCard key={item.id} item={item} index={index} />
                    ))}
                  </AnimatePresence>
                </div>

                {/* Pagination */}
                <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 px-6 py-4">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      Showing <span className="font-medium">{transformedResignations.length}</span> of{" "}
                      <span className="font-medium">{totalResignations}</span> entries
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <FiChevronLeft className="w-4 h-4" />
                      </button>
                      
                      <div className="flex space-x-1">
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                          let pageNumber;
                          if (totalPages <= 5) {
                            pageNumber = i + 1;
                          } else if (currentPage <= 3) {
                            pageNumber = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNumber = totalPages - 4 + i;
                          } else {
                            pageNumber = currentPage - 2 + i;
                          }
                          
                          return (
                            <button
                              key={pageNumber}
                              onClick={() => setCurrentPage(pageNumber)}
                              className={`px-3 py-2 rounded-lg border transition-colors ${
                                currentPage === pageNumber
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                              }`}
                            >
                              {pageNumber}
                            </button>
                          );
                        })}
                      </div>
                      
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <FiChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center"
              >
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiUsers className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No resignations found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  No matching records found for the selected filters.
                </p>
              </motion.div>
            )}
          </>
        )}

        {/* Modal */}
        <ResignationDetailsModal
          isOpen={showModal}
          data={selectedResignation}
          onClose={() => {
            setShowModal(false);
            setSelectedResignation(null);
          }}
        />
      </div>
    </div>
  );
}