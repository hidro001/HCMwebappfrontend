

// import React, { useState, useMemo } from "react";
// import { motion } from "framer-motion";
// import {
//   FaPrint,
//   FaFilePdf,
//   FaUserAlt,
//   FaCalendarAlt,
//   FaFileCsv,
//   FaFileExcel,
//   FaCheckCircle,
// } from "react-icons/fa";

// // Import the separate modal components
// import ApplyLeaveModal from "./model/ApplyLeaveModal";
// import LeaveDetailsModal from "./model/LeaveDetailsModal";

// // Framer Motion variants
// const tableContainerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       when: "beforeChildren",
//       staggerChildren: 0.05,
//     },
//   },
// };

// const tableRowVariants = {
//   hidden: { opacity: 0, y: 10 },
//   visible: { opacity: 1, y: 0 },
// };

// const dummyData =
// [
//   {
//     "id": 1,
//     "leaveType": "Vacation",
//     "from": "05 Feb 2025",
//     "to": "07 Feb 2025",
//     "days": 2,
//     "reasonForLeave": "Possible style role appear.",
//     "leaveCategory": "compensatory",
//     "processedBy": "Luke Underwood",
//     "reasonForReject": "Far small ready break Congress ok.",
//     "status": "Pending"
//   },
//   {
//     "id": 2,
//     "leaveType": "Sick Leave",
//     "from": "09 Feb 2025",
//     "to": "25 Jan 2025",
//     "days": 1,
//     "reasonForLeave": "Through out house apply star.",
//     "leaveCategory": "half-day",
//     "processedBy": "Michelle Brown",
//     "reasonForReject": "Painting face process parent everything eviden...",
//     "status": "Rejected"
//   },
//   {
//     "id": 3,
//     "leaveType": "Vacation",
//     "from": "23 Jan 2025",
//     "to": "09 Feb 2025",
//     "days": 2,
//     "reasonForLeave": "Particular shoulder country.",
//     "leaveCategory": "compensatory",
//     "processedBy": "Darryl Bryant",
//     "reasonForReject": "",
//     "status": "Approved"
//   },
//   {
//     "id": 4,
//     "leaveType": "Paid Leave",
//     "from": "16 Jan 2025",
//     "to": "31 Jan 2025",
//     "days": 6,
//     "reasonForLeave": "Line specific sport world somebody rate mean.",
//     "leaveCategory": "paid",
//     "processedBy": "Jessica Kline",
//     "reasonForReject": "",
//     "status": "Rejected"
//   },
//   {
//     "id": 5,
//     "leaveType": "Vacation",
//     "from": "25 Jan 2025",
//     "to": "08 Jan 2025",
//     "days": 4,
//     "reasonForLeave": "Weight score family across safe lawyer consumer.",
//     "leaveCategory": "paid",
//     "processedBy": "Bridget Sims",
//     "reasonForReject": "",
//     "status": "Pending"
//   },
//   {
//     "id": 6,
//     "leaveType": "Sick Leave",
//     "from": "18 Feb 2025",
//     "to": "20 Feb 2025",
//     "days": 2,
//     "reasonForLeave": "Severe headache and fever.",
//     "leaveCategory": "paid",
//     "processedBy": "John Doe",
//     "reasonForReject": "",
//     "status": "Approved"
//   },
//   {
//     "id": 7,
//     "leaveType": "Paid Leave",
//     "from": "12 Mar 2025",
//     "to": "16 Mar 2025",
//     "days": 4,
//     "reasonForLeave": "Family wedding.",
//     "leaveCategory": "paid",
//     "processedBy": "Jane Smith",
//     "reasonForReject": "",
//     "status": "Approved"
//   },
//   {
//     "id": 8,
//     "leaveType": "Unpaid Leave",
//     "from": "02 Apr 2025",
//     "to": "07 Apr 2025",
//     "days": 5,
//     "reasonForLeave": "Personal matters.",
//     "leaveCategory": "unpaid",
//     "processedBy": "Alice Johnson",
//     "reasonForReject": "",
//     "status": "Pending"
//   },
//   {
//     "id": 9,
//     "leaveType": "Vacation",
//     "from": "21 May 2025",
//     "to": "25 May 2025",
//     "days": 4,
//     "reasonForLeave": "Travel plans.",
//     "leaveCategory": "paid",
//     "processedBy": "Michael Clark",
//     "reasonForReject": "",
//     "status": "Approved"
//   },
//   {
//     "id": 10,
//     "leaveType": "Casual Leave",
//     "from": "17 Jun 2025",
//     "to": "17 Jun 2025",
//     "days": 1,
//     "reasonForLeave": "Urgent family work.",
//     "leaveCategory": "unpaid",
//     "processedBy": "Emily Taylor",
//     "reasonForReject": "Critical business meetings.",
//     "status": "Rejected"
//   }
// ]


// export default function EmployeeLeaveHistory() {
//   const [searchText, setSearchText] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [pageSize, setPageSize] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   // For "Leave Details" modal
//   const [selectedLeave, setSelectedLeave] = useState(null);

//   // For "Apply Leave" modal
//   const [showApplyModal, setShowApplyModal] = useState(false);

//   // Filter data
//   const filteredData = useMemo(() => {
//     return dummyData.filter((item) => {
//       const matchSearch =
//         item.leaveType.toLowerCase().includes(searchText.toLowerCase()) ||
//         item.from.toLowerCase().includes(searchText.toLowerCase()) ||
//         item.to.toLowerCase().includes(searchText.toLowerCase());

//       const matchStatus = selectedStatus
//         ? item.status.toLowerCase() === selectedStatus.toLowerCase()
//         : true;

//       let matchMonth = true;
//       if (selectedMonth) {
//         const entryDate = new Date(item.from);
//         const selectedDate = new Date(selectedMonth + "-01");
//         matchMonth =
//           entryDate.getFullYear() === selectedDate.getFullYear() &&
//           entryDate.getMonth() === selectedDate.getMonth();
//       }

//       return matchSearch && matchStatus && matchMonth;
//     });
//   }, [searchText, selectedStatus, selectedMonth]);

//   // Paginated data
//   const paginatedData = useMemo(() => {
//     const startIndex = (currentPage - 1) * pageSize;
//     return filteredData.slice(startIndex, startIndex + pageSize);
//   }, [filteredData, currentPage, pageSize]);

//   const totalPages = Math.ceil(filteredData.length / pageSize);

//   const handlePageSizeChange = (e) => {
//     setPageSize(Number(e.target.value));
//     setCurrentPage(1);
//   };

//   const handleStatusChange = (e) => {
//     setSelectedStatus(e.target.value);
//     setCurrentPage(1);
//   };

//   // Helper to shorten text
//   const trimText = (text) => {
//     if (!text) return "";
//     const words = text.split(" ");
//     if (words.length <= 3) return text;
//     return words.slice(0, 3).join(" ") + "...";
//   };

//   return (
//     <div className="mx-auto p-4 bg-bg-primary text-text-primary transition-colors">
//       {/* Top Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow relative overflow-hidden">
//           <div className="flex flex-col">
//             <span className="text-xl font-bold">Remaining Paid Leaves</span>
//             <span className="text-3xl font-extrabold mt-2">400</span>
//             <span className="text-sm text-green-600 mt-1">
//               +5000 Last 30 days Employee
//             </span>
//           </div>
//           <FaUserAlt className="text-4xl text-gray-300 absolute top-4 right-4" />
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow relative overflow-hidden">
//           <div className="flex flex-col">
//             <span className="text-xl font-bold">Total Leaves Taken</span>
//             <span className="text-3xl font-extrabold mt-2">89</span>
//             <span className="text-sm text-red-600 mt-1">
//               -800 Last 30 days Active
//             </span>
//           </div>
//           <FaCalendarAlt className="text-4xl text-gray-300 absolute top-4 right-4" />
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow relative overflow-hidden">
//           <div className="flex flex-col">
//             <span className="text-xl font-bold">Approved Leaves</span>
//             <span className="text-3xl font-extrabold mt-2">212</span>
//             <span className="text-sm text-green-600 mt-1">
//               +200 Last 30 days Inactive
//             </span>
//           </div>
//           <FaCheckCircle className="text-4xl text-gray-300 absolute top-4 right-4" />
//         </div>
//       </div>

//       <h2 className="text-2xl font-bold mb-4">My Leave History</h2>

//       {/* Top Controls */}
//       <div className="flex flex-wrap items-center justify-between gap-4 mb-4 p-4 bg-white dark:bg-gray-800 rounded-md shadow">
//         {/* Show X entries */}
//         <div className="flex items-center gap-2">
//           <span className="text-sm font-medium">Show</span>
//           <select
//             className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700"
//             value={pageSize}
//             onChange={handlePageSizeChange}
//           >
//             {[5, 10, 25, 50].map((size) => (
//               <option key={size} value={size}>
//                 {size}
//               </option>
//             ))}
//           </select>
//           <span className="text-sm font-medium">entries</span>
//         </div>

//         {/* Search box */}
//         <div className="flex-1 max-w-sm">
//           <input
//             type="text"
//             placeholder="Search"
//             className="w-full border rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:outline-none"
//             value={searchText}
//             onChange={(e) => {
//               setSearchText(e.target.value);
//               setCurrentPage(1);
//             }}
//           />
//         </div>

//         {/* Month filter */}
//         <div className="flex items-center gap-2">
//           <div className="relative">
//             <FaCalendarAlt className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-400" />
//             <input
//               type="month"
//               className="pl-8 pr-4 py-1 border rounded text-sm bg-white dark:bg-gray-700"
//               value={selectedMonth}
//               onChange={(e) => {
//                 setSelectedMonth(e.target.value);
//                 setCurrentPage(1);
//               }}
//             />
//           </div>
//         </div>

//         {/* Status dropdown */}
//         <select
//           className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700"
//           value={selectedStatus}
//           onChange={handleStatusChange}
//         >
//           <option value="">Status</option>
//           <option value="Approved">Approved</option>
//           <option value="Pending">Pending</option>
//           <option value="Reject">Reject</option>
//         </select>

//         {/* Export Icons */}
//         <div className="flex items-center gap-2">
//           <button className="text-green-600 hover:text-green-800" title="Export CSV">
//             <FaFileCsv size={18} />
//           </button>
//           <button className="text-pink-600 hover:text-pink-800" title="Export PDF">
//             <FaFilePdf size={18} />
//           </button>
//           <button className="text-orange-500 hover:text-orange-600" title="Print">
//             <FaPrint size={18} />
//           </button>
//           <button className="text-blue-600 hover:text-blue-800" title="Export Excel">
//             <FaFileExcel size={18} />
//           </button>
//         </div>

//         {/* Apply Leaves button */}
//         <button
//           onClick={() => setShowApplyModal(true)}
//           className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-500 transition-colors"
//         >
//           Apply Leaves
//         </button>
//       </div>

//       {/* Table */}
//       {filteredData.length > 0 ? (
//         <motion.div
//           className="bg-bg-secondary rounded-md shadow overflow-x-auto transition-colors"
//           variants={tableContainerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <motion.table className="w-full text-left border-collapse min-w-max">
//             <thead className="bg-gray-50 dark:bg-gray-700">
//               <tr>
//                 <th className="p-3 text-sm font-semibold">S.L</th>
//                 <th className="p-3 text-sm font-semibold">Leave Type</th>
//                 <th className="p-3 text-sm font-semibold">From</th>
//                 <th className="p-3 text-sm font-semibold">To</th>
//                 <th className="p-3 text-sm font-semibold">Days</th>
//                 <th className="p-3 text-sm font-semibold">Reason for Leave</th>
//                 <th className="p-3 text-sm font-semibold">Leave Category</th>
//                 <th className="p-3 text-sm font-semibold">Processed By</th>
//                 <th className="p-3 text-sm font-semibold">Reason For Reject</th>
//                 <th className="p-3 text-sm font-semibold">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedData.map((entry, index) => (
//                 <motion.tr
//                   key={entry.id}
//                   variants={tableRowVariants}
//                   onClick={() => setSelectedLeave(entry)} // Show "Leave Details" modal
//                   className="cursor-pointer border-b last:border-b-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//                 >
//                   <td className="p-3 text-sm">
//                     {(currentPage - 1) * pageSize + index + 1}
//                   </td>
//                   <td className="p-3 text-sm">{entry.leaveType}</td>
//                   <td className="p-3 text-sm">{entry.from}</td>
//                   <td className="p-3 text-sm">{entry.to}</td>
//                   <td className="p-3 text-sm">{entry.days}</td>
//                   <td className="p-3 text-sm">{trimText(entry.reasonForLeave)}</td>
//                   <td className="p-3 text-sm">{entry.leaveCategory}</td>
//                   <td className="p-3 text-sm">{entry.processedBy}</td>
//                   <td className="p-3 text-sm">
//                     {entry.reasonForReject ? trimText(entry.reasonForReject) : ""}
//                   </td>
//                   <td className="p-3 text-sm">
//                     <span
//                       className={`px-2 py-1 text-xs font-semibold rounded
//                         ${
//                           entry.status === "Approved"
//                             ? "bg-green-50 text-green-700"
//                             : entry.status === "Pending"
//                             ? "bg-yellow-50 text-yellow-700"
//                             : "bg-red-50 text-red-700"
//                         }
//                       `}
//                     >
//                       {entry.status}
//                     </span>
//                   </td>
//                 </motion.tr>
//               ))}
//             </tbody>
//           </motion.table>

//           {/* Pagination */}
//           <div className="flex justify-between items-center p-3 gap-2 text-sm">
//             <div>
//               Showing {paginatedData.length} of {filteredData.length} entries
//             </div>
//             <div className="flex items-center space-x-1">
//               {Array.from({ length: totalPages }, (_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentPage(i + 1)}
//                   className={`px-3 py-1 rounded border transition-colors
//                     ${
//                       currentPage === i + 1
//                         ? "bg-blue-600 text-white border-blue-600"
//                         : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
//                     }
//                   `}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </motion.div>
//       ) : (
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow text-center text-gray-500 dark:text-gray-400">
//           No matching records found
//         </div>
//       )}

//       {/* Modals */}
//       <LeaveDetailsModal
//         leave={selectedLeave}
//         onClose={() => setSelectedLeave(null)}
//       />
//       <ApplyLeaveModal
//         show={showApplyModal}
//         onClose={() => setShowApplyModal(false)}
//       />
//     </div>
//   );
// }


// import React, { useState, useEffect, useMemo } from "react";
// import { motion } from "framer-motion";
// import {
//   FaPrint,
//   FaFilePdf,
//   FaUserAlt,
//   FaCalendarAlt,
//   FaFileCsv,
//   FaFileExcel,
//   FaCheckCircle,
// } from "react-icons/fa";
// import ApplyLeaveModal from "./model/ApplyLeaveModal";
// import LeaveDetailsModal from "./model/LeaveDetailsModal";
// import useLeaveStore from "../../store/leaveStore.js";

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

// export default function EmployeeLeaveHistory() {
//   const {
//     leaves,
//     isLoading,
//     fetchLeaves,
//     activeStatus,
//     setActiveStatus,
//     initializeData,
//     userProfile,
//   } = useLeaveStore();

//   const [searchText, setSearchText] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [pageSize, setPageSize] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedLeave, setSelectedLeave] = useState(null);
//   const [showApplyModal, setShowApplyModal] = useState(false);

//   // On mount initialize data and fetch leaves
//   useEffect(() => {
//     initializeData();
//     fetchLeaves(activeStatus);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [activeStatus]);

//   // Client-side filtering
//   const filteredData = useMemo(() => {
//     return leaves.filter((item) => {
//       const matchSearch =
//         item.leave_Type.toLowerCase().includes(searchText.toLowerCase()) ||
//         new Date(item.leave_From)
//           .toLocaleDateString()
//           .toLowerCase()
//           .includes(searchText.toLowerCase()) ||
//         new Date(item.leave_To)
//           .toLocaleDateString()
//           .toLowerCase()
//           .includes(searchText.toLowerCase());

//       const matchStatus = selectedStatus
//         ? item.leave_Status.toLowerCase() === selectedStatus.toLowerCase()
//         : true;

//       let matchMonth = true;
//       if (selectedMonth) {
//         const entryDate = new Date(item.leave_From);
//         const [year, month] = selectedMonth.split("-");
//         matchMonth =
//           entryDate.getFullYear() === parseInt(year) &&
//           entryDate.getMonth() + 1 === parseInt(month);
//       }

//       return matchSearch && matchStatus && matchMonth;
//     });
//   }, [leaves, searchText, selectedStatus, selectedMonth]);

//   const paginatedData = useMemo(() => {
//     const startIndex = (currentPage - 1) * pageSize;
//     return filteredData.slice(startIndex, startIndex + pageSize);
//   }, [filteredData, currentPage, pageSize]);

//   const totalPages = Math.ceil(filteredData.length / pageSize);

//   return (
//     <div className="mx-auto p-4 bg-bg-primary text-text-primary transition-colors">
//       {/* Top Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow relative overflow-hidden">
//           <div className="flex flex-col">
//             <span className="text-xl font-bold">Remaining Paid Leaves</span>
//             <span className="text-3xl font-extrabold mt-2">
//               {userProfile ? userProfile.no_of_Paid_Leave : 0}
//             </span>
//             <span className="text-sm text-green-600 mt-1">
//               +5000 Last 30 days Employee
//             </span>
//           </div>
//           <FaUserAlt className="text-4xl text-gray-300 absolute top-4 right-4" />
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow relative overflow-hidden">
//           <div className="flex flex-col">
//             <span className="text-xl font-bold">Total Leaves Taken</span>
//             <span className="text-3xl font-extrabold mt-2">89</span>
//             <span className="text-sm text-red-600 mt-1">
//               -800 Last 30 days Active
//             </span>
//           </div>
//           <FaCalendarAlt className="text-4xl text-gray-300 absolute top-4 right-4" />
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow relative overflow-hidden">
//           <div className="flex flex-col">
//             <span className="text-xl font-bold">Approved Leaves</span>
//             <span className="text-3xl font-extrabold mt-2">212</span>
//             <span className="text-sm text-green-600 mt-1">
//               +200 Last 30 days Inactive
//             </span>
//           </div>
//           <FaCheckCircle className="text-4xl text-gray-300 absolute top-4 right-4" />
//         </div>
//       </div>

//       <h2 className="text-2xl font-bold mb-4">My Leave History</h2>

//       {/* Controls */}
//       <div className="flex flex-wrap items-center justify-between gap-4 mb-4 p-4 bg-white dark:bg-gray-800 rounded-md shadow">
//         <div className="flex items-center gap-2">
//           <span className="text-sm font-medium">Show</span>
//           <select
//             className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700"
//             value={pageSize}
//             onChange={(e) => {
//               setPageSize(Number(e.target.value));
//               setCurrentPage(1);
//             }}
//           >
//             {[5, 10, 25, 50].map((size) => (
//               <option key={size} value={size}>
//                 {size}
//               </option>
//             ))}
//           </select>
//           <span className="text-sm font-medium">entries</span>
//         </div>

//         <div className="flex-1 max-w-sm">
//           <input
//             type="text"
//             placeholder="Search"
//             className="w-full border rounded px-3 py-2 text-sm bg-white dark:bg-gray-700"
//             value={searchText}
//             onChange={(e) => {
//               setSearchText(e.target.value);
//               setCurrentPage(1);
//             }}
//           />
//         </div>

//         <div className="flex items-center gap-2">
//           <div className="relative">
//             <FaCalendarAlt className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-400" />
//             <input
//               type="month"
//               className="pl-8 pr-4 py-1 border rounded text-sm bg-white dark:bg-gray-700"
//               value={selectedMonth}
//               onChange={(e) => {
//                 setSelectedMonth(e.target.value);
//                 setCurrentPage(1);
//               }}
//             />
//           </div>
//         </div>

//         <select
//           className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700"
//           value={selectedStatus}
//           onChange={(e) => {
//             setSelectedStatus(e.target.value);
//             setCurrentPage(1);
//           }}
//         >
//           <option value="">Status</option>
//           <option value="Approved">Approved</option>
//           <option value="Pending">Pending</option>
//           <option value="Rejected">Rejected</option>
//         </select>

//         <div className="flex items-center gap-2">
//           <button className="text-green-600 hover:text-green-800" title="Export CSV">
//             <FaFileCsv size={18} />
//           </button>
//           <button className="text-pink-600 hover:text-pink-800" title="Export PDF">
//             <FaFilePdf size={18} />
//           </button>
//           <button className="text-orange-500 hover:text-orange-600" title="Print">
//             <FaPrint size={18} />
//           </button>
//           <button className="text-blue-600 hover:text-blue-800" title="Export Excel">
//             <FaFileExcel size={18} />
//           </button>
//         </div>

//         <button
//           onClick={() => setShowApplyModal(true)}
//           className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-500 transition-colors"
//         >
//           Apply Leaves
//         </button>
//       </div>

//       {/* Table */}
//       {isLoading ? (
//         <div className="flex justify-center items-center" style={{ height: "200px" }}>
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       ) : filteredData.length > 0 ? (
//         <motion.div
//           className="bg-bg-secondary rounded-md shadow overflow-x-auto"
//           variants={tableContainerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <motion.table className="w-full text-left border-collapse min-w-max">
//             <thead className="bg-gray-50 dark:bg-gray-700">
//               <tr>
//                 <th className="p-3 text-sm font-semibold">S.L</th>
//                 <th className="p-3 text-sm font-semibold">Leave Type</th>
//                 <th className="p-3 text-sm font-semibold">From</th>
//                 <th className="p-3 text-sm font-semibold">To</th>
//                 <th className="p-3 text-sm font-semibold">Days</th>
//                 <th className="p-3 text-sm font-semibold">Reason for Leave</th>
//                 <th className="p-3 text-sm font-semibold">Leave Category</th>
//                 <th className="p-3 text-sm font-semibold">Processed By</th>
//                 <th className="p-3 text-sm font-semibold">Reason For Reject</th>
//                 <th className="p-3 text-sm font-semibold">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedData.map((entry, index) => (
//                 <motion.tr
//                   key={entry._id || entry.id}
//                   variants={tableRowVariants}
//                   onClick={() => setSelectedLeave(entry)}
//                   className="cursor-pointer border-b last:border-b-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
//                 >
//                   <td className="p-3 text-sm">
//                     {(currentPage - 1) * pageSize + index + 1}
//                   </td>
//                   <td className="p-3 text-sm">{entry.leave_Type}</td>
//                   <td className="p-3 text-sm">
//                     {new Date(entry.leave_From).toLocaleDateString()}
//                   </td>
//                   <td className="p-3 text-sm">
//                     {new Date(entry.leave_To).toLocaleDateString()}
//                   </td>
//                   <td className="p-3 text-sm">{entry.no_Of_Days}</td>
//                   <td className="p-3 text-sm">
//                     {entry.reason_For_Leave && entry.reason_For_Leave.split(" ").length > 3
//                       ? entry.reason_For_Leave.split(" ").slice(0, 3).join(" ") + "..."
//                       : entry.reason_For_Leave}
//                   </td>
//                   <td className="p-3 text-sm">
//                     {entry.is_Paid === null
//                       ? "Pending"
//                       : entry.is_Paid
//                       ? "Paid"
//                       : "Unpaid"}
//                   </td>
//                   <td className="p-3 text-sm">
//                     {entry.leave_Status === "approved" && entry.approved_By
//                       ? `Approved by ${entry.approved_By.first_Name} ${entry.approved_By.last_Name}`
//                       : entry.leave_Status === "rejected" && entry.rejected_By
//                       ? `Rejected by ${entry.rejected_By.first_Name} ${entry.rejected_By.last_Name}`
//                       : "Pending"}
//                   </td>
//                   <td className="p-3 text-sm">
//                     {entry.reason_For_Reject || "N/A"}
//                   </td>
//                   <td className="p-3 text-sm">
//                     <span
//                       className={`px-2 py-1 text-xs font-semibold rounded ${
//                         entry.leave_Status === "approved"
//                           ? "bg-green-50 text-green-700"
//                           : entry.leave_Status === "pending"
//                           ? "bg-yellow-50 text-yellow-700"
//                           : "bg-red-50 text-red-700"
//                       }`}
//                     >
//                       {entry.leave_Status.charAt(0).toUpperCase() +
//                         entry.leave_Status.slice(1)}
//                     </span>
//                   </td>
//                 </motion.tr>
//               ))}
//             </tbody>
//           </motion.table>

//           <div className="flex justify-between items-center p-3 gap-2 text-sm">
//             <div>
//               Showing {paginatedData.length} of {filteredData.length} entries
//             </div>
//             <div className="flex items-center space-x-1">
//               {Array.from({ length: totalPages }, (_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentPage(i + 1)}
//                   className={`px-3 py-1 rounded border transition-colors ${
//                     currentPage === i + 1
//                       ? "bg-blue-600 text-white border-blue-600"
//                       : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
//                   }`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </motion.div>
//       ) : (
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow text-center text-gray-500 dark:text-gray-400">
//           No matching records found
//         </div>
//       )}

//       <LeaveDetailsModal leave={selectedLeave} onClose={() => setSelectedLeave(null)} />
//       <ApplyLeaveModal show={showApplyModal} onClose={() => setShowApplyModal(false)} />
//     </div>
//   );
// }


// import React, { useState, useEffect, useMemo } from "react";
// import { motion } from "framer-motion";
// import {
//   FaPrint,
//   FaFilePdf,
//   FaUserAlt,
//   FaCalendarAlt,
//   FaFileCsv,
//   FaFileExcel,
//   FaCheckCircle,
// } from "react-icons/fa";
// import ApplyLeaveModal from "./model/ApplyLeaveModal";
// import LeaveDetailsModal from "./model/LeaveDetailsModal";
// import useLeaveStore from "../../store/leaveStore.js";

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

// export default function EmployeeLeaveHistory() {
//   const {
//     leaves,
//     isLoading,
//     fetchLeaves,
//     activeStatus,
//     setActiveStatus,
//     initializeData,
//     userProfile,
//   } = useLeaveStore();

//   // Local states for search text, month filter, pagination, etc.
//   const [searchText, setSearchText] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [pageSize, setPageSize] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedLeave, setSelectedLeave] = useState(null);
//   const [showApplyModal, setShowApplyModal] = useState(false);

//   // On mount (and whenever activeStatus changes) initialize and fetch data.
//   useEffect(() => {
//     initializeData();
//     fetchLeaves(activeStatus);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [activeStatus]);

//   // Client-side filtering (search text and month) in addition to the status filter.
//   const filteredData = useMemo(() => {
//     return leaves.filter((item) => {
//       const matchSearch =
//         item.leave_Type.toLowerCase().includes(searchText.toLowerCase()) ||
//         new Date(item.leave_From)
//           .toLocaleDateString()
//           .toLowerCase()
//           .includes(searchText.toLowerCase()) ||
//         new Date(item.leave_To)
//           .toLocaleDateString()
//           .toLowerCase()
//           .includes(searchText.toLowerCase());

//       // Use activeStatus from the store for filtering.
//       const matchStatus = activeStatus
//         ? item.leave_Status.toLowerCase() === activeStatus.toLowerCase()
//         : true;

//       let matchMonth = true;
//       if (selectedMonth) {
//         const entryDate = new Date(item.leave_From);
//         const [year, month] = selectedMonth.split("-");
//         matchMonth =
//           entryDate.getFullYear() === parseInt(year) &&
//           entryDate.getMonth() + 1 === parseInt(month);
//       }

//       return matchSearch && matchStatus && matchMonth;
//     });
//   }, [leaves, searchText, activeStatus, selectedMonth]);

//   const paginatedData = useMemo(() => {
//     const startIndex = (currentPage - 1) * pageSize;
//     return filteredData.slice(startIndex, startIndex + pageSize);
//   }, [filteredData, currentPage, pageSize]);

//   const totalPages = Math.ceil(filteredData.length / pageSize);

//   return (
//     <div className="mx-auto p-4 bg-bg-primary text-text-primary transition-colors">
//       {/* Top Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow relative overflow-hidden">
//           <div className="flex flex-col">
//             <span className="text-xl font-bold">Remaining Paid Leaves</span>
//             <span className="text-3xl font-extrabold mt-2">
//               {userProfile ? userProfile.no_of_Paid_Leave : 0}
//             </span>
//             <span className="text-sm text-green-600 mt-1">
//               +5000 Last 30 days Employee
//             </span>
//           </div>
//           <FaUserAlt className="text-4xl text-gray-300 absolute top-4 right-4" />
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow relative overflow-hidden">
//           <div className="flex flex-col">
//             <span className="text-xl font-bold">Total Leaves Taken</span>
//             <span className="text-3xl font-extrabold mt-2">89</span>
//             <span className="text-sm text-red-600 mt-1">
//               -800 Last 30 days Active
//             </span>
//           </div>
//           <FaCalendarAlt className="text-4xl text-gray-300 absolute top-4 right-4" />
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow relative overflow-hidden">
//           <div className="flex flex-col">
//             <span className="text-xl font-bold">Approved Leaves</span>
//             <span className="text-3xl font-extrabold mt-2">212</span>
//             <span className="text-sm text-green-600 mt-1">
//               +200 Last 30 days Inactive
//             </span>
//           </div>
//           <FaCheckCircle className="text-4xl text-gray-300 absolute top-4 right-4" />
//         </div>
//       </div>

//       <h2 className="text-2xl font-bold mb-4">My Leave History</h2>

//       {/* Controls */}
//       <div className="flex flex-wrap items-center justify-between gap-4 mb-4 p-4 bg-white dark:bg-gray-800 rounded-md shadow">
//         <div className="flex items-center gap-2">
//           <span className="text-sm font-medium">Show</span>
//           <select
//             className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700"
//             value={pageSize}
//             onChange={(e) => {
//               setPageSize(Number(e.target.value));
//               setCurrentPage(1);
//             }}
//           >
//             {[5, 10, 25, 50].map((size) => (
//               <option key={size} value={size}>
//                 {size}
//               </option>
//             ))}
//           </select>
//           <span className="text-sm font-medium">entries</span>
//         </div>

//         <div className="flex-1 max-w-sm">
//           <input
//             type="text"
//             placeholder="Search"
//             className="w-full border rounded px-3 py-2 text-sm bg-white dark:bg-gray-700"
//             value={searchText}
//             onChange={(e) => {
//               setSearchText(e.target.value);
//               setCurrentPage(1);
//             }}
//           />
//         </div>

//         <div className="flex items-center gap-2">
//           <div className="relative">
//             <FaCalendarAlt className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-400" />
//             <input
//               type="month"
//               className="pl-8 pr-4 py-1 border rounded text-sm bg-white dark:bg-gray-700"
//               value={selectedMonth}
//               onChange={(e) => {
//                 setSelectedMonth(e.target.value);
//                 setCurrentPage(1);
//               }}
//             />
//           </div>
//         </div>

//         {/* Status filter now uses the store’s activeStatus */}
//         <select
//           className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700"
//           value={activeStatus}
//           onChange={(e) => {
//             setActiveStatus(e.target.value);
//             setCurrentPage(1);
//           }}
//         >
//           <option value="">Status</option>
//           <option value="all">All</option>
//           <option value="approved">Approved</option>
//           <option value="pending">Pending</option>
//           <option value="rejected">Rejected</option>
//         </select>

//         <div className="flex items-center gap-2">
//           <button className="text-green-600 hover:text-green-800" title="Export CSV">
//             <FaFileCsv size={18} />
//           </button>
//           <button className="text-pink-600 hover:text-pink-800" title="Export PDF">
//             <FaFilePdf size={18} />
//           </button>
//           <button className="text-orange-500 hover:text-orange-600" title="Print">
//             <FaPrint size={18} />
//           </button>
//           <button className="text-blue-600 hover:text-blue-800" title="Export Excel">
//             <FaFileExcel size={18} />
//           </button>
//         </div>

//         <button
//           onClick={() => setShowApplyModal(true)}
//           className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-500 transition-colors"
//         >
//           Apply Leaves
//         </button>
//       </div>

//       {/* Table */}
//       {isLoading ? (
//         <div className="flex justify-center items-center" style={{ height: "200px" }}>
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       ) : filteredData.length > 0 ? (
//         <motion.div
//           className="bg-bg-secondary rounded-md shadow overflow-x-auto"
//           variants={tableContainerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <motion.table className="w-full text-left border-collapse min-w-max">
//             <thead className="bg-gray-50 dark:bg-gray-700">
//               <tr>
//                 <th className="p-3 text-sm font-semibold">S.L</th>
//                 <th className="p-3 text-sm font-semibold">Leave Type</th>
//                 <th className="p-3 text-sm font-semibold">From</th>
//                 <th className="p-3 text-sm font-semibold">To</th>
//                 <th className="p-3 text-sm font-semibold">Days</th>
//                 <th className="p-3 text-sm font-semibold">Reason for Leave</th>
//                 <th className="p-3 text-sm font-semibold">Leave Category</th>
//                 <th className="p-3 text-sm font-semibold">Processed By</th>
//                 <th className="p-3 text-sm font-semibold">Reason For Reject</th>
//                 <th className="p-3 text-sm font-semibold">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedData.map((entry, index) => (
//                 <motion.tr
//                   key={entry._id || entry.id}
//                   variants={tableRowVariants}
//                   onClick={() => setSelectedLeave(entry)}
//                   className="cursor-pointer border-b last:border-b-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
//                 >
//                   <td className="p-3 text-sm">
//                     {(currentPage - 1) * pageSize + index + 1}
//                   </td>
//                   <td className="p-3 text-sm">{entry.leave_Type}</td>
//                   <td className="p-3 text-sm">
//                     {new Date(entry.leave_From).toLocaleDateString()}
//                   </td>
//                   <td className="p-3 text-sm">
//                     {new Date(entry.leave_To).toLocaleDateString()}
//                   </td>
//                   <td className="p-3 text-sm">{entry.no_Of_Days}</td>
//                   <td className="p-3 text-sm">
//                     {entry.reason_For_Leave &&
//                     entry.reason_For_Leave.split(" ").length > 3
//                       ? entry.reason_For_Leave.split(" ").slice(0, 3).join(" ") + "..."
//                       : entry.reason_For_Leave}
//                   </td>
//                   <td className="p-3 text-sm">
//                     {entry.is_Paid === null
//                       ? "Pending"
//                       : entry.is_Paid
//                       ? "Paid"
//                       : "Unpaid"}
//                   </td>
//                   <td className="p-3 text-sm">
//                     {entry.leave_Status === "approved" && entry.approved_By
//                       ? `Approved by ${entry.approved_By.first_Name} ${entry.approved_By.last_Name}`
//                       : entry.leave_Status === "rejected" && entry.rejected_By
//                       ? `Rejected by ${entry.rejected_By.first_Name} ${entry.rejected_By.last_Name}`
//                       : "Pending"}
//                   </td>
//                   <td className="p-3 text-sm">
//                     {entry.reason_For_Reject || "N/A"}
//                   </td>
//                   <td className="p-3 text-sm">
//                     <span
//                       className={`px-2 py-1 text-xs font-semibold rounded ${
//                         entry.leave_Status === "approved"
//                           ? "bg-green-50 text-green-700"
//                           : entry.leave_Status === "pending"
//                           ? "bg-yellow-50 text-yellow-700"
//                           : "bg-red-50 text-red-700"
//                       }`}
//                     >
//                       {entry.leave_Status.charAt(0).toUpperCase() +
//                         entry.leave_Status.slice(1)}
//                     </span>
//                   </td>
//                 </motion.tr>
//               ))}
//             </tbody>
//           </motion.table>

//           <div className="flex justify-between items-center p-3 gap-2 text-sm">
//             <div>
//               Showing {paginatedData.length} of {filteredData.length} entries
//             </div>
//             <div className="flex items-center space-x-1">
//               {Array.from({ length: totalPages }, (_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentPage(i + 1)}
//                   className={`px-3 py-1 rounded border transition-colors ${
//                     currentPage === i + 1
//                       ? "bg-blue-600 text-white border-blue-600"
//                       : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
//                   }`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </motion.div>
//       ) : (
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow text-center text-gray-500 dark:text-gray-400">
//           No matching records found
//         </div>
//       )}

//       <LeaveDetailsModal leave={selectedLeave} onClose={() => setSelectedLeave(null)} />
//       <ApplyLeaveModal show={showApplyModal} onClose={() => setShowApplyModal(false)} />
//     </div>
//   );
// }


import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FaPrint,
  FaFilePdf,
  FaUserAlt,
  FaCalendarAlt,
  FaFileCsv,
  FaFileExcel,
  FaCheckCircle,
} from "react-icons/fa";
import ApplyLeaveModal from "./model/ApplyLeaveModal";
import LeaveDetailsModal from "./model/LeaveDetailsModal";
import useLeaveStore from "../../store/leaveStore.js";

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

export default function EmployeeLeaveHistory() {
  const {
    leaves,
    isLoading,
    fetchLeaves,
    activeStatus,
    setActiveStatus,
    initializeData,
    userProfile,
  } = useLeaveStore();

  // Local states for search text, month filter, pagination, etc.
  const [searchText, setSearchText] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);

  // On mount (and whenever activeStatus changes) initialize and fetch data.
  useEffect(() => {
    initializeData();
    fetchLeaves(activeStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStatus]);

  // Updated client-side filtering logic to correctly handle "all" status
  const filteredData = useMemo(() => {
    return leaves.filter((item) => {
      const matchSearch =
        item.leave_Type.toLowerCase().includes(searchText.toLowerCase()) ||
        new Date(item.leave_From)
          .toLocaleDateString()
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        new Date(item.leave_To)
          .toLocaleDateString()
          .toLowerCase()
          .includes(searchText.toLowerCase());

      // When activeStatus is "all", we want to include all items.
      const matchStatus =
        activeStatus.toLowerCase() === "all"
          ? true
          : item.leave_Status.toLowerCase() === activeStatus.toLowerCase();

      let matchMonth = true;
      if (selectedMonth) {
        const entryDate = new Date(item.leave_From);
        const [year, month] = selectedMonth.split("-");
        matchMonth =
          entryDate.getFullYear() === parseInt(year, 10) &&
          entryDate.getMonth() + 1 === parseInt(month, 10);
      }

      return matchSearch && matchStatus && matchMonth;
    });
  }, [leaves, searchText, activeStatus, selectedMonth]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  return (
    <div className="mx-auto p-4 bg-bg-primary text-text-primary transition-colors">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow relative overflow-hidden">
          <div className="flex flex-col">
            <span className="text-xl font-bold">Remaining Paid Leaves</span>
            <span className="text-3xl font-extrabold mt-2">
              {userProfile ? userProfile.no_of_Paid_Leave : 0}
            </span>
            <span className="text-sm text-green-600 mt-1">
              +5000 Last 30 days Employee
            </span>
          </div>
          <FaUserAlt className="text-4xl text-gray-300 absolute top-4 right-4" />
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow relative overflow-hidden">
          <div className="flex flex-col">
            <span className="text-xl font-bold">Total Leaves Taken</span>
            <span className="text-3xl font-extrabold mt-2">89</span>
            <span className="text-sm text-red-600 mt-1">
              -800 Last 30 days Active
            </span>
          </div>
          <FaCalendarAlt className="text-4xl text-gray-300 absolute top-4 right-4" />
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow relative overflow-hidden">
          <div className="flex flex-col">
            <span className="text-xl font-bold">Approved Leaves</span>
            <span className="text-3xl font-extrabold mt-2">212</span>
            <span className="text-sm text-green-600 mt-1">
              +200 Last 30 days Inactive
            </span>
          </div>
          <FaCheckCircle className="text-4xl text-gray-300 absolute top-4 right-4" />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">My Leave History</h2>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 p-4 bg-white dark:bg-gray-800 rounded-md shadow">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Show</span>
          <select
            className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[5, 10, 25, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="text-sm font-medium">entries</span>
        </div>

        <div className="flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search"
            className="w-full border rounded px-3 py-2 text-sm bg-white dark:bg-gray-700"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <FaCalendarAlt className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-400" />
            <input
              type="month"
              className="pl-8 pr-4 py-1 border rounded text-sm bg-white dark:bg-gray-700"
              value={selectedMonth}
              onChange={(e) => {
                setSelectedMonth(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* Status filter now uses the store’s activeStatus */}
        <select
          className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700"
          value={activeStatus}
          onChange={(e) => {
            setActiveStatus(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Status</option>
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>

        <div className="flex items-center gap-2">
          <button className="text-green-600 hover:text-green-800" title="Export CSV">
            <FaFileCsv size={18} />
          </button>
          <button className="text-pink-600 hover:text-pink-800" title="Export PDF">
            <FaFilePdf size={18} />
          </button>
          <button className="text-orange-500 hover:text-orange-600" title="Print">
            <FaPrint size={18} />
          </button>
          <button className="text-blue-600 hover:text-blue-800" title="Export Excel">
            <FaFileExcel size={18} />
          </button>
        </div>

        <button
          onClick={() => setShowApplyModal(true)}
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-500 transition-colors"
        >
          Apply Leaves
        </button>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center items-center" style={{ height: "200px" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredData.length > 0 ? (
        <motion.div
          className="bg-bg-secondary rounded-md shadow overflow-x-auto"
          variants={tableContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.table className="w-full text-left border-collapse min-w-max">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="p-3 text-sm font-semibold">S.L</th>
                <th className="p-3 text-sm font-semibold">Leave Type</th>
                <th className="p-3 text-sm font-semibold">From</th>
                <th className="p-3 text-sm font-semibold">To</th>
                <th className="p-3 text-sm font-semibold">Days</th>
                <th className="p-3 text-sm font-semibold">Reason for Leave</th>
                <th className="p-3 text-sm font-semibold">Leave Category</th>
                <th className="p-3 text-sm font-semibold">Processed By</th>
                <th className="p-3 text-sm font-semibold">Reason For Reject</th>
                <th className="p-3 text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((entry, index) => (
                <motion.tr
                  key={entry._id || entry.id}
                  variants={tableRowVariants}
                  onClick={() => setSelectedLeave(entry)}
                  className="cursor-pointer border-b last:border-b-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-3 text-sm">
                    {(currentPage - 1) * pageSize + index + 1}
                  </td>
                  <td className="p-3 text-sm">{entry.leave_Type}</td>
                  <td className="p-3 text-sm">
                    {new Date(entry.leave_From).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-sm">
                    {new Date(entry.leave_To).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-sm">{entry.no_Of_Days}</td>
                  <td className="p-3 text-sm">
                    {entry.reason_For_Leave &&
                    entry.reason_For_Leave.split(" ").length > 3
                      ? entry.reason_For_Leave.split(" ").slice(0, 3).join(" ") +
                        "..."
                      : entry.reason_For_Leave}
                  </td>
                  <td className="p-3 text-sm">
                    {entry.is_Paid === null
                      ? "Pending"
                      : entry.is_Paid
                      ? "Paid"
                      : "Unpaid"}
                  </td>
                  <td className="p-3 text-sm">
                    {entry.leave_Status === "approved" && entry.approved_By
                      ? `Approved by ${entry.approved_By.first_Name} ${entry.approved_By.last_Name}`
                      : entry.leave_Status === "rejected" && entry.rejected_By
                      ? `Rejected by ${entry.rejected_By.first_Name} ${entry.rejected_By.last_Name}`
                      : "Pending"}
                  </td>
                  <td className="p-3 text-sm">
                    {entry.reason_For_Reject || "N/A"}
                  </td>
                  <td className="p-3 text-sm">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        entry.leave_Status === "approved"
                          ? "bg-green-50 text-green-700"
                          : entry.leave_Status === "pending"
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {entry.leave_Status.charAt(0).toUpperCase() +
                        entry.leave_Status.slice(1)}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>

          <div className="flex justify-between items-center p-3 gap-2 text-sm">
            <div>
              Showing {paginatedData.length} of {filteredData.length} entries
            </div>
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded border transition-colors ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow text-center text-gray-500 dark:text-gray-400">
          No matching records found
        </div>
      )}

      <LeaveDetailsModal leave={selectedLeave} onClose={() => setSelectedLeave(null)} />
      <ApplyLeaveModal show={showApplyModal} onClose={() => setShowApplyModal(false)} />
    </div>
  );
}
