// import React, { useState, useEffect, useMemo, useRef } from "react";
// import { motion } from "framer-motion";
// import { FaEye, FaPrint, FaFilePdf, FaArrowUp, FaArrowDown } from "react-icons/fa";
// import { MdOutlineFileDownload } from "react-icons/md";
// import { Skeleton } from "@mui/material";
// import useResignationStore from "../../store/useResignationStore";
// import ResignationDetailsModal from "./model/ResignationDetailsModal";
// import { Bar, Line } from "react-chartjs-2";

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
//   // Destructure all required values from the store, including currentPage.
//   const {
//     resignations,
//     chartData,
//     loading,
//     totalPages,
//     totalResignations,
//     currentPage,
//     filters,
//     fetchResignations,
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

//   // Update store filters whenever local filter values change.
//   useEffect(() => {
//     const newFilters = {
//       search: searchText,
//       status: statusFilter === "All" ? "" : statusFilter,
//       year: selectedYear,
//       month: chartPeriod === "Monthly" ? selectedMonth : "",
//     };
//     setFilters(newFilters);
//     setCurrentPage(1);
//   }, [searchText, statusFilter, selectedYear, selectedMonth, chartPeriod, setFilters, setCurrentPage]);

//   // Fetch data whenever filters or currentPage change.
//   useEffect(() => {
//     fetchResignations();
//   }, [filters, currentPage, fetchResignations]);

//   // Prepare chart data for Bar/Line chart.
//   const preparedChartData = useMemo(() => {
//     if (!chartData) return null;
//     let labels = [];
//     let counts = [];
//     if (chartPeriod === "Monthly") {
//       // Group by day (chartData has _id.day).
//       const sorted = chartData.sort((a, b) => a._id.day - b._id.day);
//       labels = sorted.map((item) => `Day ${item._id.day}`);
//       counts = sorted.map((item) => item.count);
//     } else {
//       // Yearly view: group by month (chartData has _id.month).
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
//           backgroundColor: selectedChart === "bar" ? "rgba(54, 162, 235, 0.6)" : "rgba(255, 99, 132, 0.2)",
//           borderColor: selectedChart === "bar" ? "rgba(54, 162, 235, 1)" : "rgba(255, 99, 132, 1)",
//           borderWidth: 1,
//           fill: selectedChart === "line",
//           tension: selectedChart === "line" ? 0.4 : 0,
//         },
//       ],
//     };
//   }, [chartData, chartPeriod, selectedChart]);

//   // Transform resignation records for display in the table.
//   const transformedResignations = useMemo(() => {
//     return resignations.map((r) => ({
//       id: r._id,
//       empNameAndId: r.employee
//         ? `${r.employee.first_Name} ${r.employee.last_Name} (${r.employee.employee_Id})`
//         : "N/A",
//       resignationDate: r.resignationDate ? new Date(r.resignationDate).toLocaleDateString() : "N/A",
//       lastWorkingDay: r.lastWorkingDay ? new Date(r.lastWorkingDay).toLocaleDateString() : "N/A",
//       reason: r.comments || "N/A",
//       department: r.employee?.department || "N/A",
//       designation: r.employee?.designation || "N/A",
//       status: r.status || "N/A",
//       submittedAt: r.createdAt ? new Date(r.createdAt).toLocaleString() : "N/A",
//     }));
//   }, [resignations]);

//   return (
//     <div className="mx-auto p-4 dark:bg-gray-900 dark:text-gray-100 transition-colors">
//       {/* FILTERS AND CHART PERIOD SELECTION */}
//       <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-md shadow mb-4 transition-colors">
//         <div className="flex items-center gap-4">
//           <input
//             type="text"
//             placeholder="Search by Employee Name or ID"
//             className="border rounded px-3 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//           />
//           <select
//             className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
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
//             className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
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
//             className="border rounded px-3 py-1 text-sm w-32 bg-white dark:bg-gray-700 dark:text-gray-100"
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(e.target.value)}
//           />
//           {chartPeriod === "Monthly" && (
//             <select
//               className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
//               value={selectedMonth}
//               onChange={(e) => setSelectedMonth(e.target.value)}
//             >
//               <option value="">Select Month</option>
//               {[
//                 "January", "February", "March", "April", "May", "June",
//                 "July", "August", "September", "October", "November", "December"
//               ].map((m, idx) => (
//                 <option key={idx + 1} value={idx + 1}>
//                   {m}
//                 </option>
//               ))}
//             </select>
//           )}
//         </div>
//         <div className="flex items-center gap-4">
//           <button className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors" title="Print">
//             <FaPrint size={16} />
//           </button>
//           <button className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors" title="Export PDF">
//             <FaFilePdf size={16} />
//           </button>
//           <button className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors" title="Export CSV/Excel">
//             <MdOutlineFileDownload size={18} />
//           </button>
//         </div>
//       </div>

//       {/* CHART SECTION */}
//       <div className="bg-white dark:bg-gray-800 rounded-md shadow p-4 mb-6 transition-colors">
//         <div className="flex items-center justify-between mb-2">
//           <h2 className="text-lg font-semibold">Resignations Statistics</h2>
//           <select
//             className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
//             value={selectedChart}
//             onChange={(e) => setSelectedChart(e.target.value)}
//           >
//             <option value="bar">Bar Chart</option>
//             <option value="line">Line Chart</option>
//           </select>
//         </div>
//         <p className="text-sm text-gray-400 dark:text-gray-300 mb-4">Overview of resignations</p>
//         {loading || !preparedChartData ? (
//           <Skeleton variant="rectangular" height={220} />
//         ) : (
//           <div className="h-64">
//             {selectedChart === "bar" ? (
//               <Bar
//                 data={preparedChartData}
//                 options={{
//                   responsive: true,
//                   plugins: {
//                     legend: { position: "top" },
//                     title: {
//                       display: true,
//                       text: chartPeriod === "Monthly" ? "Resignations by Day" : "Resignations by Month",
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
//                       text: chartPeriod === "Monthly" ? "Resignations by Day" : "Resignations by Month",
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
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow transition-colors">
//           {Array.from({ length: 10 }).map((_, i) => (
//             <Skeleton key={i} variant="rectangular" height={40} className="mb-2" />
//           ))}
//         </div>
//       ) : (
//         <>
//           {transformedResignations.length > 0 ? (
//             <motion.div
//               className="bg-white dark:bg-gray-800 rounded-md shadow overflow-x-auto transition-colors"
//               initial="hidden"
//               animate="visible"
//               variants={tableContainerVariants}
//             >
//               <motion.table className="w-full text-left border-collapse">
//                 <thead className="bg-gray-100 dark:bg-gray-700 transition-colors">
//                   <tr>
//                     <th className="p-3 text-sm font-semibold">S.L</th>
//                     <th className="p-3 text-sm font-semibold">Employee</th>
//                     <th className="p-3 text-sm font-semibold">Resignation Date</th>
//                     <th className="p-3 text-sm font-semibold">Last Working Day</th>
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
//                     let statusClasses = "bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-100 border px-2 py-1 rounded text-xs font-semibold";
//                     if (item.status === "Pending") {
//                       statusClasses = "bg-orange-50 dark:bg-orange-700 text-orange-600 dark:text-orange-100 border px-2 py-1 rounded text-xs font-semibold";
//                     } else if (item.status === "Approved") {
//                       statusClasses = "bg-green-50 dark:bg-green-700 text-green-600 dark:text-green-100 border px-2 py-1 rounded text-xs font-semibold";
//                     } else if (item.status === "Rejected") {
//                       statusClasses = "bg-red-50 dark:bg-red-700 text-red-600 dark:text-red-100 border px-2 py-1 rounded text-xs font-semibold";
//                     }
//                     return (
//                       <motion.tr key={item.id} variants={tableRowVariants} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
//                         <td className="p-3 text-sm">{String(rowIndex).padStart(2, "0")}</td>
//                         <td className="p-3 text-sm">{item.empNameAndId}</td>
//                         <td className="p-3 text-sm">{item.resignationDate}</td>
//                         <td className="p-3 text-sm">{item.lastWorkingDay}</td>
//                         <td className="p-3 text-sm">{item.reason}</td>
//                         <td className="p-3 text-sm">{item.department}</td>
//                         <td className="p-3 text-sm">{item.designation}</td>
//                         <td className="p-3 text-sm"><span className={statusClasses}>{item.status}</span></td>
//                         <td className="p-3 text-sm">{item.submittedAt}</td>
//                         <td className="p-3 text-sm">
//                           <button
//                             className="text-blue-500 hover:text-blue-600 transition-colors"
//                             onClick={() => { setSelectedResignation(item); setShowModal(true); }}
//                           >
//                             <FaEye />
//                           </button>
//                         </td>
//                       </motion.tr>
//                     );
//                   })}
//                 </tbody>
//               </motion.table>
//               <div className="flex flex-col md:flex-row justify-between items-center p-3 gap-2 text-sm">
//                 <div>
//                   Showing {transformedResignations.length} of {totalResignations} entries
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   {Array.from({ length: totalPages }, (_, i) => (
//                     <button
//                       key={i}
//                       className={`px-3 py-1 rounded border transition-colors ${currentPage === i + 1 ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border hover:bg-gray-50 dark:hover:bg-gray-600"}`}
//                       onClick={() => setCurrentPage(i + 1)}
//                     >
//                       {i + 1}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           ) : (
//             <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow text-center text-gray-500 dark:text-gray-400">
//               No matching records found
//             </div>
//           )}
//         </>
//       )}

//       <ResignationDetailsModal
//         isOpen={showModal}
//         data={selectedResignation}
//         onClose={() => { setShowModal(false); setSelectedResignation(null); }}
//       />
//     </div>
//   );
// }



// import React, { useState, useEffect, useMemo } from "react";
// import { motion } from "framer-motion";
// import { FaEye, FaPrint, FaFilePdf } from "react-icons/fa";
// import { MdOutlineFileDownload } from "react-icons/md";
// import { Skeleton } from "@mui/material";
// import useResignationStore from "../../store/useResignationStore";
// import ResignationDetailsModal from "./model/ResignationDetailsModal";
// import { Bar, Line } from "react-chartjs-2";

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
//   // Get state and actions from the store.
//   const {
//     resignations,
//     chartData,
//     loading,
//     totalPages,
//     totalResignations,
//     currentPage,
//     filters,
//     fetchResignations,
//     setFilters,
//     setCurrentPage,
//   } = useResignationStore();

//   // Local state for filter inputs.
//   const [searchText, setSearchText] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [chartPeriod, setChartPeriod] = useState("Yearly");
//   const [selectedYear, setSelectedYear] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("");

//   // Modal state.
//   const [showModal, setShowModal] = useState(false);
//   const [selectedResignation, setSelectedResignation] = useState(null);

//   // Update store filters only if the new filters differ from the current ones.
//   useEffect(() => {
//     const newFilters = {
//       search: searchText,
//       status: statusFilter === "All" ? "" : statusFilter,
//       year: selectedYear,
//       month: chartPeriod === "Monthly" ? selectedMonth : "",
//     };

//     // Check each property before updating.
//     if (
//       newFilters.search !== filters.search ||
//       newFilters.status !== filters.status ||
//       newFilters.year !== filters.year ||
//       newFilters.month !== filters.month
//     ) {
//       setFilters(newFilters);
//       setCurrentPage(1);
//     }
//   }, [
//     searchText,
//     statusFilter,
//     selectedYear,
//     selectedMonth,
//     chartPeriod,
//     filters,
//     setFilters,
//     setCurrentPage,
//   ]);

//   // Fetch data whenever the store’s filters or currentPage change.
//   useEffect(() => {
//     fetchResignations();
//   }, [filters, currentPage, fetchResignations]);

//   // Prepare chart data for Bar/Line chart.
//   const preparedChartData = useMemo(() => {
//     if (!chartData) return null;
//     let labels = [];
//     let counts = [];
//     if (chartPeriod === "Monthly") {
//       // Group by day.
//       const sorted = [...chartData].sort((a, b) => a._id.day - b._id.day);
//       labels = sorted.map((item) => `Day ${item._id.day}`);
//       counts = sorted.map((item) => item.count);
//     } else {
//       // Yearly view: group by month.
//       const sorted = [...chartData].sort((a, b) => a._id.month - b._id.month);
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
//             // You can adjust the colors for bar vs. line charts as needed.
//             "rgba(54, 162, 235, 0.6)",
//           borderColor: "rgba(54, 162, 235, 1)",
//           borderWidth: 1,
//           fill: false,
//           tension: 0,
//         },
//       ],
//     };
//   }, [chartData, chartPeriod]);

//   // Transform resignation records for display.
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
//       submittedAt: r.createdAt
//         ? new Date(r.createdAt).toLocaleString()
//         : "N/A",
//     }));
//   }, [resignations]);

//   return (
//     <div className="mx-auto p-4 dark:bg-gray-900 dark:text-gray-100 transition-colors">
//       {/* FILTERS SECTION */}
//       <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-md shadow mb-4 transition-colors">
//         <div className="flex items-center gap-4">
//           <input
//             type="text"
//             placeholder="Search by Employee Name or ID"
//             className="border rounded px-3 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//           />
//           <select
//             className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
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
//             className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
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
//             className="border rounded px-3 py-1 text-sm w-32 bg-white dark:bg-gray-700 dark:text-gray-100"
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(e.target.value)}
//           />
//           {chartPeriod === "Monthly" && (
//             <select
//               className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
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
//           <button className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors" title="Print">
//             <FaPrint size={16} />
//           </button>
//           <button className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors" title="Export PDF">
//             <FaFilePdf size={16} />
//           </button>
//           <button className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors" title="Export CSV/Excel">
//             <MdOutlineFileDownload size={18} />
//           </button>
//         </div>
//       </div>

//       {/* CHART SECTION */}
//       <div className="bg-white dark:bg-gray-800 rounded-md shadow p-4 mb-6 transition-colors">
//         <div className="flex items-center justify-between mb-2">
//           <h2 className="text-lg font-semibold">Resignations Statistics</h2>
//         </div>
//         <p className="text-sm text-gray-400 dark:text-gray-300 mb-4">Overview of resignations</p>
//         {loading || !preparedChartData ? (
//           <Skeleton variant="rectangular" height={220} />
//         ) : (
//           <div className="h-64">
//             {/* Render the chart (using Bar here; you can switch to Line if needed) */}
//             <Bar
//               data={preparedChartData}
//               options={{
//                 responsive: true,
//                 plugins: {
//                   legend: { position: "top" },
//                   title: {
//                     display: true,
//                     text:
//                       chartPeriod === "Monthly"
//                         ? "Resignations by Day"
//                         : "Resignations by Month",
//                   },
//                 },
//               }}
//             />
//           </div>
//         )}
//       </div>

//       {/* TABLE SECTION */}
//       {loading ? (
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow transition-colors">
//           {Array.from({ length: 10 }).map((_, i) => (
//             <Skeleton key={i} variant="rectangular" height={40} className="mb-2" />
//           ))}
//         </div>
//       ) : (
//         <>
//           {transformedResignations.length > 0 ? (
//             <motion.div
//               className="bg-white dark:bg-gray-800 rounded-md shadow overflow-x-auto transition-colors"
//               initial="hidden"
//               animate="visible"
//               variants={tableContainerVariants}
//             >
//               <motion.table className="w-full text-left border-collapse">
//                 <thead className="bg-gray-100 dark:bg-gray-700 transition-colors">
//                   <tr>
//                     <th className="p-3 text-sm font-semibold">S.L</th>
//                     <th className="p-3 text-sm font-semibold">Employee</th>
//                     <th className="p-3 text-sm font-semibold">Resignation Date</th>
//                     <th className="p-3 text-sm font-semibold">Last Working Day</th>
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
//                       "bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-100 border px-2 py-1 rounded text-xs font-semibold";
//                     if (item.status === "Pending") {
//                       statusClasses =
//                         "bg-orange-50 dark:bg-orange-700 text-orange-600 dark:text-orange-100 border px-2 py-1 rounded text-xs font-semibold";
//                     } else if (item.status === "Approved") {
//                       statusClasses =
//                         "bg-green-50 dark:bg-green-700 text-green-600 dark:text-green-100 border px-2 py-1 rounded text-xs font-semibold";
//                     } else if (item.status === "Rejected") {
//                       statusClasses =
//                         "bg-red-50 dark:bg-red-700 text-red-600 dark:text-red-100 border px-2 py-1 rounded text-xs font-semibold";
//                     }
//                     return (
//                       <motion.tr
//                         key={item.id}
//                         variants={tableRowVariants}
//                         className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
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
//               <div className="flex flex-col md:flex-row justify-between items-center p-3 gap-2 text-sm">
//                 <div>
//                   Showing {transformedResignations.length} of {totalResignations} entries
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   {Array.from({ length: totalPages }, (_, i) => (
//                     <button
//                       key={i}
//                       className={`px-3 py-1 rounded border transition-colors ${
//                         currentPage === i + 1
//                           ? "bg-blue-600 text-white border-blue-600"
//                           : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border hover:bg-gray-50 dark:hover:bg-gray-600"
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
//             <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow text-center text-gray-500 dark:text-gray-400">
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
import { motion } from "framer-motion";
import { FaEye, FaPrint, FaFilePdf, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { Skeleton } from "@mui/material";
import useResignationStore from "../../store/useResignationStore";
import ResignationDetailsModal from "./model/ResignationDetailsModal";
import { Bar, Line } from "react-chartjs-2";

const tableContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.05 },
  },
};

const tableRowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function EmployeeResignationHistory() {
  // Destructure required values from the store.
  const {
    resignations,
    chartData,
    loading,
    totalPages,
    totalResignations,
    currentPage,
    filters,
    fetchResignations,
    setFilters,
    setCurrentPage,
  } = useResignationStore();

  // Local state for filter inputs.
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  // Chart period: "Yearly" (group by month) or "Monthly" (group by day).
  const [chartPeriod, setChartPeriod] = useState("Yearly");
  const [selectedYear, setSelectedYear] = useState(""); // e.g. "2025"
  const [selectedMonth, setSelectedMonth] = useState(""); // e.g. "2" for February
  // Chart type: "bar" or "line".
  const [selectedChart, setSelectedChart] = useState("bar");

  // Modal state.
  const [showModal, setShowModal] = useState(false);
  const [selectedResignation, setSelectedResignation] = useState(null);
  const chartRef = useRef(null);

  // Update store filters when local inputs change.
  useEffect(() => {
    const newFilters = {
      search: searchText,
      status: statusFilter === "All" ? "" : statusFilter,
      year: selectedYear,
      month: chartPeriod === "Monthly" ? selectedMonth : "",
    };
    setFilters(newFilters);
    setCurrentPage(1);
  }, [searchText, statusFilter, selectedYear, selectedMonth, chartPeriod, setFilters, setCurrentPage]);

  // Fetch data whenever filters or currentPage change.
  useEffect(() => {
    fetchResignations();
  }, [filters, currentPage, fetchResignations]);

  // Prepare chart data.
  const preparedChartData = useMemo(() => {
    if (!chartData) return null;
    let labels = [];
    let counts = [];
    if (chartPeriod === "Monthly") {
      // Group by day.
      const sorted = chartData.sort((a, b) => a._id.day - b._id.day);
      labels = sorted.map((item) => `Day ${item._id.day}`);
      counts = sorted.map((item) => item.count);
    } else {
      // Yearly view: group by month.
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
          backgroundColor: selectedChart === "bar" ? "rgba(54, 162, 235, 0.6)" : "rgba(255, 99, 132, 0.2)",
          borderColor: selectedChart === "bar" ? "rgba(54, 162, 235, 1)" : "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          fill: selectedChart === "line",
          tension: selectedChart === "line" ? 0.4 : 0,
        },
      ],
    };
  }, [chartData, chartPeriod, selectedChart]);

  // Compute summary statistics.
  const pendingCount = useMemo(() => 
    resignations.filter(r => r.status === "Pending").length, [resignations]
  );
  const approvedCount = useMemo(() => 
    resignations.filter(r => r.status === "Approved").length, [resignations]
  );
  const rejectedCount = useMemo(() => 
    resignations.filter(r => r.status === "Rejected").length, [resignations]
  );

  // Transform resignation records for the table.
  const transformedResignations = useMemo(() => {
    return resignations.map((r) => ({
      id: r._id,
      empNameAndId: r.employee
        ? `${r.employee.first_Name} ${r.employee.last_Name} (${r.employee.employee_Id})`
        : "N/A",
      resignationDate: r.resignationDate ? new Date(r.resignationDate).toLocaleDateString() : "N/A",
      lastWorkingDay: r.lastWorkingDay ? new Date(r.lastWorkingDay).toLocaleDateString() : "N/A",
      reason: r.comments || "N/A",
      department: r.employee?.department || "N/A",
      designation: r.employee?.designation || "N/A",
      status: r.status || "N/A",
      submittedAt: r.createdAt ? new Date(r.createdAt).toLocaleString() : "N/A",
    }));
  }, [resignations]);

  return (
    <div className="mx-auto p-4 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      {/* TOP SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-lg shadow bg-blue-500 text-white">
          <h5>Total Resignations</h5>
          <h3 className="text-2xl font-bold">{totalResignations}</h3>
        </div>
        <div className="p-4 rounded-lg shadow bg-orange-500 text-white">
          <h5>Pending</h5>
          <h3 className="text-2xl font-bold">{pendingCount}</h3>
        </div>
        <div className="p-4 rounded-lg shadow bg-green-500 text-white">
          <h5>Approved</h5>
          <h3 className="text-2xl font-bold">{approvedCount}</h3>
        </div>
        <div className="p-4 rounded-lg shadow bg-red-500 text-white">
          <h5>Rejected</h5>
          <h3 className="text-2xl font-bold">{rejectedCount}</h3>
        </div>
      </div>

      {/* FILTERS AND CHART PERIOD SELECTION */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-md shadow mb-4">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search by Employee Name or ID"
            className="border rounded px-3 py-1 text-sm bg-white dark:bg-gray-700"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <select
            className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700"
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
            className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700"
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
            className="border rounded px-3 py-1 text-sm w-32 bg-white dark:bg-gray-700"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          />
          {chartPeriod === "Monthly" && (
            <select
              className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="">Select Month</option>
              {[
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
              ].map((m, idx) => (
                <option key={idx + 1} value={idx + 1}>
                  {m}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="flex items-center gap-4">
          <button className="hover:text-gray-700" title="Print">
            <FaPrint size={16} />
          </button>
          <button className="hover:text-gray-700" title="Export PDF">
            <FaFilePdf size={16} />
          </button>
          <button className="hover:text-gray-700" title="Export CSV/Excel">
            <MdOutlineFileDownload size={18} />
          </button>
        </div>
      </div>

      {/* CHART SECTION */}
      <div className="bg-white dark:bg-gray-800 rounded-md shadow p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Resignations Statistics</h2>
          <select
            className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700"
            value={selectedChart}
            onChange={(e) => setSelectedChart(e.target.value)}
          >
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
          </select>
        </div>
        <p className="text-sm text-gray-400 mb-4">Overview of resignations</p>
        {loading || !preparedChartData ? (
          <Skeleton variant="rectangular" height={220} />
        ) : (
          <div className="h-auto w-full">
            {selectedChart === "bar" ? (
              <Bar
                data={preparedChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: "top" },
                    title: { display: true, text: chartPeriod === "Monthly" ? "Resignations by Day" : "Resignations by Month" },
                  },
                }}
              />
            ) : (
              <Line
                data={preparedChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: "top" },
                    title: { display: true, text: chartPeriod === "Monthly" ? "Resignations by Day" : "Resignations by Month" },
                  },
                  scales: {
                    y: { beginAtZero: true, ticks: { stepSize: 1 } },
                  },
                }}
              />
            )}
          </div>
        )}
      </div>

      {/* TABLE SECTION */}
      {loading ? (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={40} className="mb-2" />
          ))}
        </div>
      ) : (
        <>
          {transformedResignations.length > 0 ? (
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-md shadow overflow-x-auto"
              initial="hidden"
              animate="visible"
              variants={tableContainerVariants}
            >
              <motion.table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="p-3 text-sm font-semibold">S.L</th>
                    <th className="p-3 text-sm font-semibold">Employee</th>
                    <th className="p-3 text-sm font-semibold">Resignation Date</th>
                    <th className="p-3 text-sm font-semibold">Last Working Day</th>
                    <th className="p-3 text-sm font-semibold">Reason</th>
                    <th className="p-3 text-sm font-semibold">Department</th>
                    <th className="p-3 text-sm font-semibold">Designation</th>
                    <th className="p-3 text-sm font-semibold">Status</th>
                    <th className="p-3 text-sm font-semibold">Submitted At</th>
                    <th className="p-3 text-sm font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {transformedResignations.map((item, index) => {
                    const rowIndex = (currentPage - 1) * 10 + (index + 1);
                    let statusClasses = "bg-gray-100 text-gray-700 border px-2 py-1 rounded text-xs font-semibold";
                    if (item.status === "Pending") {
                      statusClasses = "bg-orange-50 text-orange-600 border px-2 py-1 rounded text-xs font-semibold";
                    } else if (item.status === "Approved") {
                      statusClasses = "bg-green-50 text-green-600 border px-2 py-1 rounded text-xs font-semibold";
                    } else if (item.status === "Rejected") {
                      statusClasses = "bg-red-50 text-red-600 border px-2 py-1 rounded text-xs font-semibold";
                    }
                    return (
                      <motion.tr key={item.id} variants={tableRowVariants} className="border-b hover:bg-gray-50  dark:hover:bg-gray-700 transition-colors">
                        <td className="p-3 text-sm">{String(rowIndex).padStart(2, "0")}</td>
                        <td className="p-3 text-sm">{item.empNameAndId}</td>
                        <td className="p-3 text-sm">{item.resignationDate}</td>
                        <td className="p-3 text-sm">{item.lastWorkingDay}</td>
                        <td className="p-3 text-sm">{item.reason}</td>
                        <td className="p-3 text-sm">{item.department}</td>
                        <td className="p-3 text-sm">{item.designation}</td>
                        <td className="p-3 text-sm"><span className={statusClasses}>{item.status}</span></td>
                        <td className="p-3 text-sm">{item.submittedAt}</td>
                        <td className="p-3 text-sm">
                          <button
                            className="text-blue-500 hover:text-blue-600 transition-colors"
                            onClick={() => { setSelectedResignation(item); setShowModal(true); }}
                          >
                            <FaEye />
                          </button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </motion.table>
              <div className="flex flex-col md:flex-row justify-between items-center p-3 text-sm">
                <div>Showing {transformedResignations.length} of {totalResignations} entries</div>
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      className={`px-3 py-1 rounded border transition-colors ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-700 text-gray-700 hover:bg-gray-50"}`}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow text-center text-gray-500">
              No matching records found
            </div>
          )}
        </>
      )}

      <ResignationDetailsModal
        isOpen={showModal}
        data={selectedResignation}
        onClose={() => { setShowModal(false); setSelectedResignation(null); }}
      />
    </div>
  );
}

