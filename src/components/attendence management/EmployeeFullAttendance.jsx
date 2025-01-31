// // src/pages/EmployeeFullAttendance.jsx

// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiPrinter,
//   FiDownload,
//   FiFileText,
//   FiSettings,
//   FiSearch,
// } from "react-icons/fi";
// import { useParams } from "react-router-dom";
// import { toast } from "react-hot-toast";

// // <-- Our Zustand store with the logic
// import useAttendanceStore from "../../store/useFullAttendanceStore";

// export default function EmployeeFullAttendance() {
//   const { empID } = useParams(); 
//   // If you want to pass empID from route, e.g. /employee/:empID
//   // If not, you can define a placeholder.

//   const {
//     dummyAttendanceData,
//     hasRealData,
//     fetchAllData,
//     // Example store calculation methods:
//     calculateTotalShifts,
//     calculateTotalHalfDays,
//     calculateNotEvenHalfDays,
//     calculateNotLoggedOut,
//     calculateTotalCompletedDays,
//     calculateTotalLates,
//     approvedLeaves,
//     // ... or anything else from the store
//   } = useAttendanceStore();

//   // We keep your existing local UI states for searching, pagination, etc.
//   const [searchText, setSearchText] = useState("");
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedMonth, setSelectedMonth] = useState("2025-01"); // default

//   // On mount, attempt to fetch real data from your server
//   useEffect(() => {
//     if (empID) {
//       fetchAllData(empID);
//     } else {
//       // fallback: if there's no param or something
//       // you can skip the fetch, or use a dummy ID
//       fetchAllData("RI0546"); // example
//     }
//   }, [empID, fetchAllData]);

//   // -----------
//   // If data is available from store, transform it
//   // If not, fallback to your original dummy data
//   // -----------
//   // store-based attendanceData might differ in structure from your dummy structure
//   // so adjust as needed
//   // For now, let's keep your old approach:
//   const storeAttendance = useAttendanceStore((state) => state.attendanceData);

//   // We want everything in the "YYYY-MM-DD" + "day" + "status" shape
//   // The dummy data is "sl, date, day, logInTime, logOutTime, totalBreak, status"
//   // The store data is "date, day, login, logout, breaks, status"
//   // We'll do a small mapping to unify them:
//   function mapStoreDataToNewUIFormat(record, index) {
//     return {
//       sl: index + 1,
//       date: record.date || "",
//       day: record.day || "",
//       logInTime: record.login || "------",
//       logOutTime: record.logout || "------",
//       totalBreak: "--", // store might have array of breaks
//       status: record.status || "Absent",
//     };
//   }

//   const realAttendanceData = storeAttendance.map(mapStoreDataToNewUIFormat);

//   // final array for UI:
//   const allAttendanceData = hasRealData && realAttendanceData.length
//     ? realAttendanceData
//     : dummyAttendanceData;

//   // ---------------------------------------
//   // Now we do your same filtering by selectedMonth + search
//   // (unchanged from your new UI code)
//   // ---------------------------------------
//   const filteredByMonth = allAttendanceData.filter((item) => {
//     return item.date.startsWith(selectedMonth);
//   });

//   const fullyFilteredData = filteredByMonth.filter((item) => {
//     const combinedString = `${item.date} ${item.day} ${item.status}`.toLowerCase();
//     return combinedString.includes(searchText.toLowerCase());
//   });

//   const totalEntries = fullyFilteredData.length;
//   const totalPages = Math.ceil(totalEntries / rowsPerPage);
//   const safeCurrentPage =
//     currentPage > totalPages ? totalPages : currentPage < 1 ? 1 : currentPage;

//   const startIndex = (safeCurrentPage - 1) * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const displayedData = fullyFilteredData.slice(startIndex, endIndex);

//   function handleMonthChange(e) {
//     setSelectedMonth(e.target.value);
//     setCurrentPage(1);
//   }

//   function handleSearch(e) {
//     setSearchText(e.target.value);
//     setCurrentPage(1);
//   }

//   function handleRowsPerPage(e) {
//     setRowsPerPage(Number(e.target.value));
//     setCurrentPage(1);
//   }

//   function goToPage(pageNum) {
//     if (pageNum >= 1 && pageNum <= totalPages) {
//       setCurrentPage(pageNum);
//     }
//   }

//   // ---------------------------------------
//   // Overview Data
//   // We can get real values from store, or show placeholders
//   // Just an example of how you might do it:
//   // ---------------------------------------
//   const year = parseInt(selectedMonth.split("-")[0], 10);
//   const month = parseInt(selectedMonth.split("-")[1], 10);

//   const presentCount = displayedData.filter((item) =>
//     item.status.toLowerCase().includes("present")
//   ).length;
//   const absentCount = displayedData.filter((item) =>
//     item.status.toLowerCase().includes("absent")
//   ).length;
//   const holidayCount = displayedData.filter((item) =>
//     item.status.toLowerCase().includes("holiday")
//   ).length;
//   const halfDayCount = displayedData.filter((item) =>
//     item.status.toLowerCase().includes("half")
//   ).length;
//   const notEvenHalfDay = displayedData.filter((item) =>
//     item.status.toLowerCase().includes("not even half day")
//   ).length;

//   // If you want to map them to actual store-based calculations:
//   const totalShifts = calculateTotalShifts(year, month);
//   const totalCompletedShifts = calculateTotalCompletedDays(year, month);
//   const totalPaidLeaves = 3; // or from store if you want
//   const totalLeaves = 4; // or from store
//   const totalLates = calculateTotalLates(year, month);
//   const regularization = "--"; // store can hold the real calculation
//   const notLoggedOut = calculateNotLoggedOut(year, month);
//   const overTime = "--";

//   // Now build your same overview data array:
//   const overviewData = [
//     {
//       label: "Total Present",
//       short: "P",
//       value: presentCount,
//       bg: "bg-green-100 dark:bg-green-900",
//       text: "text-green-700 dark:text-green-100",
//     },
//     {
//       label: "Total Absent",
//       short: "A",
//       value: absentCount,
//       bg: "bg-red-100 dark:bg-red-900",
//       text: "text-red-700 dark:text-red-100",
//     },
//     {
//       label: "Total Shifts",
//       short: "TS",
//       value: totalShifts,
//       bg: "bg-purple-100 dark:bg-purple-900",
//       text: "text-purple-700 dark:text-purple-100",
//     },
//     {
//       label: "Completed Shifts",
//       short: "CS",
//       value: totalCompletedShifts,
//       bg: "bg-orange-100 dark:bg-orange-900",
//       text: "text-orange-700 dark:text-orange-100",
//     },
//     {
//       label: "Total Paid Leave",
//       short: "PL",
//       value: totalPaidLeaves,
//       bg: "bg-yellow-100 dark:bg-yellow-700",
//       text: "text-yellow-700 dark:text-yellow-100",
//     },
//     {
//       label: "Total Leave",
//       short: "TL",
//       value: totalLeaves,
//       bg: "bg-green-50 dark:bg-green-900",
//       text: "text-green-700 dark:text-green-100",
//     },
//     {
//       label: "Total Lates",
//       short: "L",
//       value: totalLates,
//       bg: "bg-blue-100 dark:bg-blue-900",
//       text: "text-blue-700 dark:text-blue-100",
//     },
//     {
//       label: "Half Day",
//       short: "H",
//       value: halfDayCount,
//       bg: "bg-pink-100 dark:bg-pink-900",
//       text: "text-pink-700 dark:text-pink-100",
//     },
//     {
//       label: "Not Even Half Day",
//       short: "?",
//       value: notEvenHalfDay,
//       bg: "bg-gray-100 dark:bg-gray-800",
//       text: "text-gray-700 dark:text-gray-200",
//     },
//     {
//       label: "Regularization",
//       short: "R",
//       value: regularization,
//       bg: "bg-cyan-100 dark:bg-cyan-900",
//       text: "text-cyan-700 dark:text-cyan-100",
//     },
//     {
//       label: "Not Logged Out",
//       short: "NO",
//       value: notLoggedOut,
//       bg: "bg-stone-100 dark:bg-stone-900",
//       text: "text-stone-700 dark:text-stone-100",
//     },
//     {
//       label: "Total Holiday",
//       short: "TH",
//       value: holidayCount,
//       bg: "bg-black",
//       text: "text-white",
//     },
//     {
//       label: "Overtime",
//       short: "O",
//       value: overTime,
//       bg: "bg-indigo-100 dark:bg-indigo-900",
//       text: "text-indigo-700 dark:text-indigo-100",
//     },
//   ];

//   // -------------------------------------------
//   // The rest is your original UI, unchanged
//   // -------------------------------------------
//   return (
//     <motion.div
//       className="p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       {/* Page Heading */}
//       <motion.h1
//         className="text-xl md:text-2xl font-bold mb-6"
//         initial={{ opacity: 0, x: -50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         Attendance Of January 2025 (Riya Mishra (RI0023))
//       </motion.h1>

//       {/* Top controls row */}
//       <motion.div
//         className="flex flex-col md:flex-row items-start md:items-center justify-between 
//                    bg-white dark:bg-gray-800 rounded-md shadow px-4 py-3 mb-6 gap-4"
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         {/* Left group */}
//         <div className="flex flex-wrap items-center gap-4">
//           {/* Rows Per Page */}
//           <div className="flex items-center space-x-2">
//             <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
//               Show
//             </label>
//             <select
//               className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200 rounded-md py-1 px-2 text-sm focus:outline-none"
//               value={rowsPerPage}
//               onChange={handleRowsPerPage}
//             >
//               <option value={7}>7</option>
//               <option value={10}>10</option>
//               <option value={30}>30</option>
//               <option value={31}>31</option>
//             </select>
//           </div>

//           {/* Month-Year input */}
//           <div>
//             <input
//               type="month"
//               value={selectedMonth}
//               onChange={handleMonthChange}
//               className="border border-gray-300 dark:border-gray-600 rounded-md py-1 px-2 text-sm 
//                          text-gray-700 dark:text-gray-200
//                          bg-white dark:bg-gray-700 focus:outline-none"
//             />
//           </div>

//           {/* Example filter dropdown */}
//           <div>
//             <select
//               className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700
//                          dark:text-gray-200 rounded-md py-1 px-2 text-sm focus:outline-none"
//             >
//               <option>Select</option>
//               <option>Late</option>
//               <option>Early Out</option>
//             </select>
//           </div>
//         </div>

//         {/* Right group: Search + icons */}
//         <div className="flex items-center gap-2">
//           {/* Search box */}
//           <div className="relative">
//             <input
//               type="text"
//               value={searchText}
//               onChange={handleSearch}
//               placeholder="Search"
//               className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200
//                          rounded-md py-1 px-3 pr-8 text-sm focus:outline-none"
//             />
//             <FiSearch
//               className="absolute right-2 top-1/2 -translate-y-1/2 
//                          text-gray-400 dark:text-gray-400"
//               size={16}
//             />
//           </div>

//           {/* Action icons */}
//           <button className="p-2 rounded bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800">
//             <FiPrinter className="text-green-600 dark:text-green-100" size={16} />
//           </button>
//           <button className="p-2 rounded bg-pink-100 dark:bg-pink-900 hover:bg-pink-200 dark:hover:bg-pink-800">
//             <FiDownload className="text-pink-600 dark:text-pink-100" size={16} />
//           </button>
//           <button className="p-2 rounded bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800">
//             <FiFileText className="text-purple-600 dark:text-purple-100" size={16} />
//           </button>
//           <button className="p-2 rounded bg-orange-100 dark:bg-orange-900 hover:bg-orange-200 dark:hover:bg-orange-800">
//             <FiSettings className="text-orange-600 dark:text-orange-100" size={16} />
//           </button>
//         </div>
//       </motion.div>

//       {/* Main area: Table and side overview */}
//       <motion.div
//         className="grid grid-cols-1 lg:grid-cols-4 gap-4"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.6 }}
//       >
//         {/* Table (3/4) */}
//         <div className="lg:col-span-3">
//           <motion.div
//             className="overflow-x-auto bg-white dark:bg-gray-800 rounded-md shadow"
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <table className="w-full text-left min-w-max">
//               <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
//                 <tr className="text-sm font-medium text-gray-600 dark:text-gray-300">
//                   <th className="py-3 px-4">S.L</th>
//                   <th className="py-3 px-4">Date</th>
//                   <th className="py-3 px-4">Day</th>
//                   <th className="py-3 px-4">Log In Time</th>
//                   <th className="py-3 px-4">Log Out Time</th>
//                   <th className="py-3 px-4">Total Break</th>
//                   <th className="py-3 px-4">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <AnimatePresence>
//                   {displayedData.map((item) => (
//                     <motion.tr
//                       key={item.sl}
//                       className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm"
//                       initial={{ opacity: 0, x: -30 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: 30 }}
//                       transition={{ duration: 0.3 }}
//                       layout
//                     >
//                       <td className="py-3 px-4">
//                         {String(item.sl).padStart(2, "0")}
//                       </td>
//                       <td className="py-3 px-4">{item.date}</td>
//                       <td className="py-3 px-4">{item.day}</td>
//                       <td className="py-3 px-4">{item.logInTime}</td>
//                       <td className="py-3 px-4">{item.logOutTime}</td>
//                       <td className="py-3 px-4">{item.totalBreak}</td>
//                       <td className="py-3 px-4">{renderStatusBadge(item.status)}</td>
//                     </motion.tr>
//                   ))}

//                   {displayedData.length === 0 && (
//                     <motion.tr
//                       key="no-records"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                     >
//                       <td
//                         colSpan={7}
//                         className="py-4 text-center text-gray-500 dark:text-gray-400"
//                       >
//                         No records found.
//                       </td>
//                     </motion.tr>
//                   )}
//                 </AnimatePresence>
//               </tbody>
//             </table>
//           </motion.div>

//           {/* Pagination */}
//           <motion.div
//             className="flex flex-col sm:flex-row items-center justify-between mt-3 text-sm 
//                        text-gray-500 dark:text-gray-400"
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//           >
//             <p className="mb-2 sm:mb-0">
//               Showing {startIndex + 1} to {Math.min(endIndex, totalEntries)} of{" "}
//               {totalEntries} entries
//             </p>
//             <div className="space-x-1">
//               <button
//                 onClick={() => goToPage(safeCurrentPage - 1)}
//                 className="py-1 px-2 border border-gray-300 dark:border-gray-600 rounded 
//                            text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//               >
//                 &lt;
//               </button>
//               {Array.from({ length: totalPages }).map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => goToPage(i + 1)}
//                   className={`py-1 px-2 border border-gray-300 dark:border-gray-600 rounded 
//                     ${
//                       safeCurrentPage === i + 1
//                         ? "bg-blue-500 text-white"
//                         : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//                     }`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//               <button
//                 onClick={() => goToPage(safeCurrentPage + 1)}
//                 className="py-1 px-2 border border-gray-300 dark:border-gray-600 rounded 
//                            text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//               >
//                 &gt;
//               </button>
//             </div>
//           </motion.div>
//         </div>

//         {/* Side panel: Employee Overview */}
//         <motion.div
//           className="bg-white dark:bg-gray-800 rounded-md shadow p-4"
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-3 text-lg">
//             Employee Overview
//           </h2>
//           <div className="space-y-3">
//             {overviewData.map((item, idx) => (
//               <motion.div
//                 key={idx}
//                 className="flex items-center justify-between border-b border-gray-200 dark:border-gray-600 last:border-b-0 py-1"
//                 initial={{ opacity: 0, y: 10 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3, delay: idx * 0.05 }}
//               >
//                 <div className="flex items-center space-x-2">
//                   <span
//                     className={`inline-flex items-center justify-center 
//                       w-6 h-6 text-xs font-bold rounded-full 
//                       ${item.bg} ${item.text}`}
//                   >
//                     {item.short}
//                   </span>
//                   <span className="text-gray-600 dark:text-gray-300 text-sm">
//                     {item.label}
//                   </span>
//                 </div>
//                 <span className="text-gray-700 dark:text-gray-200 font-medium">
//                   {item.value}
//                 </span>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   );
// }

// // Same as your new UI code’s renderStatusBadge
// function renderStatusBadge(status) {
//   let bgColor = "bg-gray-100 dark:bg-gray-700";
//   let textColor = "text-gray-600 dark:text-gray-200";

//   switch (status.toLowerCase()) {
//     case "present":
//       bgColor = "bg-green-100 dark:bg-green-900";
//       textColor = "text-green-700 dark:text-green-100";
//       break;
//     case "absent":
//       bgColor = "bg-red-100 dark:bg-red-900";
//       textColor = "text-red-700 dark:text-red-100";
//       break;
//     case "holiday":
//       bgColor = "bg-black";
//       textColor = "text-white";
//       break;
//     case "half day":
//       bgColor = "bg-pink-100 dark:bg-pink-900";
//       textColor = "text-pink-700 dark:text-pink-100";
//       break;
//     default:
//       bgColor = "bg-gray-100 dark:bg-gray-700";
//       textColor = "text-gray-600 dark:text-gray-200";
//   }

//   return (
//     <span
//       className={`px-2 py-1 text-sm rounded-md font-medium ${bgColor} ${textColor}`}
//     >
//       {status}
//     </span>
//   );
// }




// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiPrinter,
//   FiDownload,
//   FiFileText,
//   FiSettings,
//   FiSearch,
// } from "react-icons/fi";
// import { useParams } from "react-router-dom";
// import { toast } from "react-hot-toast";

// // <-- Our Zustand store with all logic
// import useAttendanceStore from "../../store/useFullAttendanceStore";

// // Optional utility to color-code the status badge
// function renderStatusBadge(status) {
//   let bgColor = "bg-gray-100 dark:bg-gray-700";
//   let textColor = "text-gray-600 dark:text-gray-200";

//   switch (status?.toLowerCase()) {
//     case "present":
//       bgColor = "bg-green-100 dark:bg-green-900";
//       textColor = "text-green-700 dark:text-green-100";
//       break;
//     case "absent":
//       bgColor = "bg-red-100 dark:bg-red-900";
//       textColor = "text-red-700 dark:text-red-100";
//       break;
//     case "holiday":
//       bgColor = "bg-black";
//       textColor = "text-white";
//       break;
//     case "half day":
//       bgColor = "bg-pink-100 dark:bg-pink-900";
//       textColor = "text-pink-700 dark:text-pink-100";
//       break;
//     case "not even half day":
//       // If you want a special color for "not even half day":
//       bgColor = "bg-gray-300 dark:bg-gray-800";
//       textColor = "text-gray-700 dark:text-gray-200";
//       break;
//     default:
//       bgColor = "bg-gray-100 dark:bg-gray-700";
//       textColor = "text-gray-600 dark:text-gray-200";
//   }

//   return (
//     <span
//       className={`px-2 py-1 text-sm rounded-md font-medium ${bgColor} ${textColor}`}
//     >
//       {status}
//     </span>
//   );
// }

// export default function EmployeeFullAttendance() {
//   const { empID } = useParams(); // If your route is /employee/:empID

//   // --------- Zustand store states and actions -----------
//   const {
//     // Fetched store data:
//     userProfileData,
//     attendanceData,
//     dummyAttendanceData,
//     hasRealData,
//     // Async method to fetch everything:
//     fetchAllData,
//     // Calculation methods:
//     calculateTotalShifts,
//     calculateTotalCompletedDays,
//     calculateTotalLates,
//     calculateTotalHalfDays,
//     calculateNotEvenHalfDays,
//     calculateNotLoggedOut,
//     // ...and any others you want
//   } = useAttendanceStore();

//   // --------- Local UI states -----------
//   const [selectedMonth, setSelectedMonth] = useState("2025-01");
//   const [searchText, setSearchText] = useState("");
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   // --------- On mount, fetch data -----------
//   useEffect(() => {
//     if (empID) {
//       fetchAllData(empID);
//     } else {
//       // If there's no param, you could skip or use a default
//       fetchAllData("RI0546"); // example fallback
//     }
//   }, [empID, fetchAllData]);

//   // --------- Prepare data for the table -----------
//   // Store-based attendance might differ in shape from your dummy data
//   // Let's map store's "attendanceData" to the same shape your UI needs
//   const realAttendanceData = attendanceData.map((record, index) => ({
//     sl: index + 1,
//     date: record.date || "",
//     day: record.day || "",
//     logInTime: record.login || "------",
//     logOutTime: record.logout || "------",
//     totalBreak: "--", // If you have break data, replace with real calculation
//     status: record.status || "Absent",
//   }));

//   // If we do have real data, use it, else fallback to dummy
//   const allAttendanceData =
//     hasRealData && realAttendanceData.length
//       ? realAttendanceData
//       : dummyAttendanceData;

//   // ---------- Filter by month + search ----------
//   const filteredByMonth = allAttendanceData.filter((item) =>
//     item.date.startsWith(selectedMonth)
//   );

//   const fullyFilteredData = filteredByMonth.filter((item) => {
//     const combined = `${item.date} ${item.day} ${item.status}`.toLowerCase();
//     return combined.includes(searchText.toLowerCase());
//   });

//   // Pagination
//   const totalEntries = fullyFilteredData.length;
//   const totalPages = Math.ceil(totalEntries / rowsPerPage);
//   const safeCurrentPage =
//     currentPage > totalPages ? totalPages : currentPage < 1 ? 1 : currentPage;
//   const startIndex = (safeCurrentPage - 1) * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const displayedData = fullyFilteredData.slice(startIndex, endIndex);

//   // ---------- Convert "YYYY-MM" to "Month YYYY" for heading ----------
//   const [year, month] = selectedMonth.split("-");
//   const dateObj = new Date(year, parseInt(month, 10) - 1, 1);
//   const monthName = dateObj.toLocaleString("default", { month: "long" });

//   // Employee name/code from userProfileData
//   // const employeeName = userProfileData?.`first_Name`+last_Name || "Unknown Name";
//   const employeeName = `${userProfileData?.first_Name || ""} ${userProfileData?.last_Name || ""}`.trim() || "Unknown Name";

//   const employeeCode = userProfileData?.employee_Id || "Unknown Code";


//   // ---------- Some dynamic calculations for the side overview ----------
//   const parsedYear = parseInt(year, 10);
//   const parsedMonth = parseInt(month, 10);

//   const totalShifts = calculateTotalShifts(parsedYear, parsedMonth);
//   const completedShifts = calculateTotalCompletedDays(parsedYear, parsedMonth);
//   const totalLates = calculateTotalLates(parsedYear, parsedMonth);
//   const halfDayCount = calculateTotalHalfDays(parsedYear, parsedMonth);
//   const notEvenHalfDay = calculateNotEvenHalfDays(parsedYear, parsedMonth);
//   const notLoggedOut = calculateNotLoggedOut(parsedYear, parsedMonth);

//   // Example for present/absent/holiday counts from displayedData
//   const presentCount = displayedData.filter((item) =>
//     item.status.toLowerCase().includes("present")
//   ).length;
//   const absentCount = displayedData.filter((item) =>
//     item.status.toLowerCase().includes("absent")
//   ).length;
//   const holidayCount = displayedData.filter((item) =>
//     item.status.toLowerCase().includes("holiday")
//   ).length;

//   // Custom placeholders or real logic for totalPaidLeave, totalLeave, etc.
//   const totalPaidLeaves = 3; // or from store if you want
//   const totalLeaves = 4; // or from store
//   const overTime = "--"; // or from store
//   const regularization = "--"; // or from store

//   // Build your overviewData array
//   const overviewData = [
//     {
//       label: "Total Present",
//       short: "P",
//       value: presentCount,
//       bg: "bg-green-100 dark:bg-green-900",
//       text: "text-green-700 dark:text-green-100",
//     },
//     {
//       label: "Total Absent",
//       short: "A",
//       value: absentCount,
//       bg: "bg-red-100 dark:bg-red-900",
//       text: "text-red-700 dark:text-red-100",
//     },
//     {
//       label: "Total Shifts",
//       short: "TS",
//       value: totalShifts,
//       bg: "bg-purple-100 dark:bg-purple-900",
//       text: "text-purple-700 dark:text-purple-100",
//     },
//     {
//       label: "Completed Shifts",
//       short: "CS",
//       value: completedShifts,
//       bg: "bg-orange-100 dark:bg-orange-900",
//       text: "text-orange-700 dark:text-orange-100",
//     },
//     {
//       label: "Total Paid Leave",
//       short: "PL",
//       value: totalPaidLeaves,
//       bg: "bg-yellow-100 dark:bg-yellow-700",
//       text: "text-yellow-700 dark:text-yellow-100",
//     },
//     {
//       label: "Total Leave",
//       short: "TL",
//       value: totalLeaves,
//       bg: "bg-green-50 dark:bg-green-900",
//       text: "text-green-700 dark:text-green-100",
//     },
//     {
//       label: "Total Lates",
//       short: "L",
//       value: totalLates,
//       bg: "bg-blue-100 dark:bg-blue-900",
//       text: "text-blue-700 dark:text-blue-100",
//     },
//     {
//       label: "Half Day",
//       short: "H",
//       value: halfDayCount,
//       bg: "bg-pink-100 dark:bg-pink-900",
//       text: "text-pink-700 dark:text-pink-100",
//     },
//     {
//       label: "Not Even Half Day",
//       short: "?",
//       value: notEvenHalfDay,
//       bg: "bg-gray-100 dark:bg-gray-800",
//       text: "text-gray-700 dark:text-gray-200",
//     },
//     {
//       label: "Regularization",
//       short: "R",
//       value: regularization,
//       bg: "bg-cyan-100 dark:bg-cyan-900",
//       text: "text-cyan-700 dark:text-cyan-100",
//     },
//     {
//       label: "Not Logged Out",
//       short: "NO",
//       value: notLoggedOut,
//       bg: "bg-stone-100 dark:bg-stone-900",
//       text: "text-stone-700 dark:text-stone-100",
//     },
//     {
//       label: "Total Holiday",
//       short: "TH",
//       value: holidayCount,
//       bg: "bg-black",
//       text: "text-white",
//     },
//     {
//       label: "Overtime",
//       short: "O",
//       value: overTime,
//       bg: "bg-indigo-100 dark:bg-indigo-900",
//       text: "text-indigo-700 dark:text-indigo-100",
//     },
//   ];

//   // ---------- Handlers for user actions ----------
//   function handleMonthChange(e) {
//     setSelectedMonth(e.target.value);
//     setCurrentPage(1);
//   }

//   function handleSearch(e) {
//     setSearchText(e.target.value);
//     setCurrentPage(1);
//   }

//   function handleRowsPerPage(e) {
//     setRowsPerPage(Number(e.target.value));
//     setCurrentPage(1);
//   }

//   function goToPage(pageNum) {
//     if (pageNum >= 1 && pageNum <= totalPages) {
//       setCurrentPage(pageNum);
//     }
//   }

//   // ---------- Render -----------
//   return (
//     <motion.div
//       className="p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       {/* Page Heading - dynamically use month/year and employee name */}
//       <motion.h1
//         className="text-xl md:text-2xl font-bold mb-6"
//         initial={{ opacity: 0, x: -50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         Attendance Of {monthName} {year} ({employeeName} ({employeeCode}))
//       </motion.h1>

//       {/* Top controls row */}
//       <motion.div
//         className="flex flex-col md:flex-row items-start md:items-center justify-between 
//                    bg-white dark:bg-gray-800 rounded-md shadow px-4 py-3 mb-6 gap-4"
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         {/* Left group */}
//         <div className="flex flex-wrap items-center gap-4">
//           {/* Rows Per Page */}
//           <div className="flex items-center space-x-2">
//             <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
//               Show
//             </label>
//             <select
//               className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200 rounded-md py-1 px-2 text-sm focus:outline-none"
//               value={rowsPerPage}
//               onChange={handleRowsPerPage}
//             >
//               <option value={7}>7</option>
//               <option value={10}>10</option>
//               <option value={30}>30</option>
//               <option value={31}>31</option>
//             </select>
//           </div>

//           {/* Month-Year input */}
//           <div>
//             <input
//               type="month"
//               value={selectedMonth}
//               onChange={handleMonthChange}
//               className="border border-gray-300 dark:border-gray-600 rounded-md py-1 px-2 text-sm 
//                          text-gray-700 dark:text-gray-200
//                          bg-white dark:bg-gray-700 focus:outline-none"
//             />
//           </div>

//           {/* Example filter dropdown */}
//           <div>
//             <select
//               className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700
//                          dark:text-gray-200 rounded-md py-1 px-2 text-sm focus:outline-none"
//             >
//               <option>Select</option>
//               <option>Late</option>
//               <option>Early Out</option>
//             </select>
//           </div>
//         </div>

//         {/* Right group: Search + icons */}
//         <div className="flex items-center gap-2">
//           {/* Search box */}
//           <div className="relative">
//             <input
//               type="text"
//               value={searchText}
//               onChange={handleSearch}
//               placeholder="Search"
//               className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200
//                          rounded-md py-1 px-3 pr-8 text-sm focus:outline-none"
//             />
//             <FiSearch
//               className="absolute right-2 top-1/2 -translate-y-1/2 
//                          text-gray-400 dark:text-gray-400"
//               size={16}
//             />
//           </div>

//           {/* Action icons */}
//           <button className="p-2 rounded bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800">
//             <FiPrinter className="text-green-600 dark:text-green-100" size={16} />
//           </button>
//           <button className="p-2 rounded bg-pink-100 dark:bg-pink-900 hover:bg-pink-200 dark:hover:bg-pink-800">
//             <FiDownload className="text-pink-600 dark:text-pink-100" size={16} />
//           </button>
//           <button className="p-2 rounded bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800">
//             <FiFileText className="text-purple-600 dark:text-purple-100" size={16} />
//           </button>
//           <button className="p-2 rounded bg-orange-100 dark:bg-orange-900 hover:bg-orange-200 dark:hover:bg-orange-800">
//             <FiSettings className="text-orange-600 dark:text-orange-100" size={16} />
//           </button>
//         </div>
//       </motion.div>

//       {/* Main area: Table and side overview */}
//       <motion.div
//         className="grid grid-cols-1 lg:grid-cols-4 gap-4"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.6 }}
//       >
//         {/* Table (3/4) */}
//         <div className="lg:col-span-3">
//           <motion.div
//             className="overflow-x-auto bg-white dark:bg-gray-800 rounded-md shadow"
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <table className="w-full text-left min-w-max">
//               <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
//                 <tr className="text-sm font-medium text-gray-600 dark:text-gray-300">
//                   <th className="py-3 px-4">S.L</th>
//                   <th className="py-3 px-4">Date</th>
//                   <th className="py-3 px-4">Day</th>
//                   <th className="py-3 px-4">Log In Time</th>
//                   <th className="py-3 px-4">Log Out Time</th>
//                   <th className="py-3 px-4">Total Break</th>
//                   <th className="py-3 px-4">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <AnimatePresence>
//                   {displayedData.map((item) => (
//                     <motion.tr
//                       key={item.sl}
//                       className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm"
//                       initial={{ opacity: 0, x: -30 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: 30 }}
//                       transition={{ duration: 0.3 }}
//                       layout
//                     >
//                       <td className="py-3 px-4">
//                         {String(item.sl).padStart(2, "0")}
//                       </td>
//                       <td className="py-3 px-4">{item.date}</td>
//                       <td className="py-3 px-4">{item.day}</td>
//                       <td className="py-3 px-4">{item.logInTime}</td>
//                       <td className="py-3 px-4">{item.logOutTime}</td>
//                       <td className="py-3 px-4">{item.totalBreak}</td>
//                       <td className="py-3 px-4">{renderStatusBadge(item.status)}</td>
//                     </motion.tr>
//                   ))}

//                   {displayedData.length === 0 && (
//                     <motion.tr
//                       key="no-records"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                     >
//                       <td
//                         colSpan={7}
//                         className="py-4 text-center text-gray-500 dark:text-gray-400"
//                       >
//                         No records found.
//                       </td>
//                     </motion.tr>
//                   )}
//                 </AnimatePresence>
//               </tbody>
//             </table>
//           </motion.div>

//           {/* Pagination */}
//           <motion.div
//             className="flex flex-col sm:flex-row items-center justify-between mt-3 text-sm 
//                        text-gray-500 dark:text-gray-400"
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//           >
//             <p className="mb-2 sm:mb-0">
//               Showing {startIndex + 1} to {Math.min(endIndex, totalEntries)} of{" "}
//               {totalEntries} entries
//             </p>
//             <div className="space-x-1">
//               <button
//                 onClick={() => goToPage(safeCurrentPage - 1)}
//                 className="py-1 px-2 border border-gray-300 dark:border-gray-600 rounded 
//                            text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//               >
//                 &lt;
//               </button>
//               {Array.from({ length: totalPages }).map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => goToPage(i + 1)}
//                   className={`py-1 px-2 border border-gray-300 dark:border-gray-600 rounded 
//                     ${
//                       safeCurrentPage === i + 1
//                         ? "bg-blue-500 text-white"
//                         : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//                     }`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//               <button
//                 onClick={() => goToPage(safeCurrentPage + 1)}
//                 className="py-1 px-2 border border-gray-300 dark:border-gray-600 rounded 
//                            text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//               >
//                 &gt;
//               </button>
//             </div>
//           </motion.div>
//         </div>

//         {/* Side panel: Employee Overview */}
//         <motion.div
//           className="bg-white dark:bg-gray-800 rounded-md shadow p-4"
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-3 text-lg">
//             Employee Overview
//           </h2>
//           <div className="space-y-3">
//             {overviewData.map((item, idx) => (
//               <motion.div
//                 key={idx}
//                 className="flex items-center justify-between border-b border-gray-200 dark:border-gray-600 last:border-b-0 py-1"
//                 initial={{ opacity: 0, y: 10 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3, delay: idx * 0.05 }}
//               >
//                 <div className="flex items-center space-x-2">
//                   <span
//                     className={`inline-flex items-center justify-center 
//                       w-6 h-6 text-xs font-bold rounded-full 
//                       ${item.bg} ${item.text}`}
//                   >
//                     {item.short}
//                   </span>
//                   <span className="text-gray-600 dark:text-gray-300 text-sm">
//                     {item.label}
//                   </span>
//                 </div>
//                 <span className="text-gray-700 dark:text-gray-200 font-medium">
//                   {item.value}
//                 </span>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   );
// }


import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Removed AnimatePresence import
import {
  FiPrinter,
  FiDownload,
  FiFileText,
  FiSettings,
  FiSearch,
} from "react-icons/fi";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

// <-- Our Zustand store with all logic
import useAttendanceStore from "../../store/useFullAttendanceStore";

// Optional utility to color-code the status badge
function renderStatusBadge(status) {
  let bgColor = "bg-gray-100 dark:bg-gray-700";
  let textColor = "text-gray-600 dark:text-gray-200";

  switch (status?.toLowerCase()) {
    case "present":
      bgColor = "bg-green-100 dark:bg-green-900";
      textColor = "text-green-700 dark:text-green-100";
      break;
    case "absent":
      bgColor = "bg-red-100 dark:bg-red-900";
      textColor = "text-red-700 dark:text-red-100";
      break;
    case "holiday":
      bgColor = "bg-black";
      textColor = "text-white";
      break;
    case "half day":
      bgColor = "bg-pink-100 dark:bg-pink-900";
      textColor = "text-pink-700 dark:text-pink-100";
      break;
    case "not even half day":
      bgColor = "bg-gray-300 dark:bg-gray-800";
      textColor = "text-gray-700 dark:text-gray-200";
      break;
    default:
      bgColor = "bg-gray-100 dark:bg-gray-700";
      textColor = "text-gray-600 dark:text-gray-200";
  }

  return (
    <span
      className={`px-2 py-1 text-sm rounded-md font-medium ${bgColor} ${textColor}`}
    >
      {status}
    </span>
  );
}

export default function EmployeeFullAttendance() {
  const { empID } = useParams(); // If your route is /employee/:empID

  // --------- Zustand store states and actions -----------
  const {
    // Fetched store data:
    userProfileData,
    attendanceData,
    dummyAttendanceData,
    hasRealData,
    // Async method to fetch everything:
    fetchAllData,
    // Calculation methods:
    calculateTotalShifts,
    calculateTotalCompletedDays,
    calculateTotalLates,
    calculateTotalHalfDays,
    calculateNotEvenHalfDays,
    calculateNotLoggedOut,
  } = useAttendanceStore();

  // --------- Local UI states -----------
  const [selectedMonth, setSelectedMonth] = useState("2025-01");
  const [searchText, setSearchText] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // --------- On mount, fetch data -----------
  useEffect(() => {
    if (empID) {
      fetchAllData(empID);
    } else {
      // If there's no param, you could skip or use a default
      fetchAllData("RI0546"); // example fallback
    }
  }, [empID, fetchAllData]);

  // --------- Prepare data for the table -----------
  const realAttendanceData = attendanceData.map((record, index) => ({
    sl: index + 1,
    date: record.date || "",
    day: record.day || "",
    logInTime: record.login || "------",
    logOutTime: record.logout || "------",
    totalBreak: "--", // Replace with real calculation if available
    status: record.status || "Absent",
  }));

  const allAttendanceData =
    hasRealData && realAttendanceData.length
      ? realAttendanceData
      : dummyAttendanceData;

  // ---------- Filter by month + search ----------
  const filteredByMonth = allAttendanceData.filter((item) =>
    item.date.startsWith(selectedMonth)
  );

  const fullyFilteredData = filteredByMonth.filter((item) => {
    const combined = `${item.date} ${item.day} ${item.status}`.toLowerCase();
    return combined.includes(searchText.toLowerCase());
  });

  // Pagination
  const totalEntries = fullyFilteredData.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage);
  const safeCurrentPage =
    currentPage > totalPages ? totalPages : currentPage < 1 ? 1 : currentPage;
  const startIndex = (safeCurrentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedData = fullyFilteredData.slice(startIndex, endIndex);

  // ---------- Convert "YYYY-MM" to "Month YYYY" for heading ----------
  const [year, month] = selectedMonth.split("-");
  const dateObj = new Date(year, parseInt(month, 10) - 1, 1);
  const monthName = dateObj.toLocaleString("default", { month: "long" });

  // Employee name/code from userProfileData
  const employeeName = `${userProfileData?.first_Name || ""} ${
    userProfileData?.last_Name || ""
  }`.trim() || "Unknown Name";
  const employeeCode = userProfileData?.employee_Id || "Unknown Code";

  // ---------- Some dynamic calculations for the side overview ----------
  const parsedYear = parseInt(year, 10);
  const parsedMonth = parseInt(month, 10);

  const totalShifts = calculateTotalShifts(parsedYear, parsedMonth);
  const completedShifts = calculateTotalCompletedDays(parsedYear, parsedMonth);
  const totalLates = calculateTotalLates(parsedYear, parsedMonth);
  const halfDayCount = calculateTotalHalfDays(parsedYear, parsedMonth);
  const notEvenHalfDay = calculateNotEvenHalfDays(parsedYear, parsedMonth);
  const notLoggedOut = calculateNotLoggedOut(parsedYear, parsedMonth);

  // Example for present/absent/holiday counts from displayedData
  const presentCount = displayedData.filter((item) =>
    item.status.toLowerCase().includes("present")
  ).length;
  const absentCount = displayedData.filter((item) =>
    item.status.toLowerCase().includes("absent")
  ).length;
  const holidayCount = displayedData.filter((item) =>
    item.status.toLowerCase().includes("holiday")
  ).length;

  // Custom placeholders or real logic for totalPaidLeave, totalLeave, etc.
  const totalPaidLeaves = 3; // or from store if needed
  const totalLeaves = 4; // or from store
  const overTime = "--"; // or from store
  const regularization = "--"; // or from store

  // Build your overviewData array
  const overviewData = [
    {
      label: "Total Present",
      short: "P",
      value: presentCount,
      bg: "bg-green-100 dark:bg-green-900",
      text: "text-green-700 dark:text-green-100",
    },
    {
      label: "Total Absent",
      short: "A",
      value: absentCount,
      bg: "bg-red-100 dark:bg-red-900",
      text: "text-red-700 dark:text-red-100",
    },
    {
      label: "Total Shifts",
      short: "TS",
      value: totalShifts,
      bg: "bg-purple-100 dark:bg-purple-900",
      text: "text-purple-700 dark:text-purple-100",
    },
    {
      label: "Completed Shifts",
      short: "CS",
      value: completedShifts,
      bg: "bg-orange-100 dark:bg-orange-900",
      text: "text-orange-700 dark:text-orange-100",
    },
    {
      label: "Total Paid Leave",
      short: "PL",
      value: totalPaidLeaves,
      bg: "bg-yellow-100 dark:bg-yellow-700",
      text: "text-yellow-700 dark:text-yellow-100",
    },
    {
      label: "Total Leave",
      short: "TL",
      value: totalLeaves,
      bg: "bg-green-50 dark:bg-green-900",
      text: "text-green-700 dark:text-green-100",
    },
    {
      label: "Total Lates",
      short: "L",
      value: totalLates,
      bg: "bg-blue-100 dark:bg-blue-900",
      text: "text-blue-700 dark:text-blue-100",
    },
    {
      label: "Half Day",
      short: "H",
      value: halfDayCount,
      bg: "bg-pink-100 dark:bg-pink-900",
      text: "text-pink-700 dark:text-pink-100",
    },
    {
      label: "Not Even Half Day",
      short: "?",
      value: notEvenHalfDay,
      bg: "bg-gray-100 dark:bg-gray-800",
      text: "text-gray-700 dark:text-gray-200",
    },
    {
      label: "Regularization",
      short: "R",
      value: regularization,
      bg: "bg-cyan-100 dark:bg-cyan-900",
      text: "text-cyan-700 dark:text-cyan-100",
    },
    {
      label: "Not Logged Out",
      short: "NO",
      value: notLoggedOut,
      bg: "bg-stone-100 dark:bg-stone-900",
      text: "text-stone-700 dark:text-stone-100",
    },
    {
      label: "Total Holiday",
      short: "TH",
      value: holidayCount,
      bg: "bg-black",
      text: "text-white",
    },
    {
      label: "Overtime",
      short: "O",
      value: overTime,
      bg: "bg-indigo-100 dark:bg-indigo-900",
      text: "text-indigo-700 dark:text-indigo-100",
    },
  ];

  // ---------- Handlers for user actions ----------
  function handleMonthChange(e) {
    setSelectedMonth(e.target.value);
    setCurrentPage(1);
  }

  function handleSearch(e) {
    setSearchText(e.target.value);
    setCurrentPage(1);
  }

  function handleRowsPerPage(e) {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  }

  function goToPage(pageNum) {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  }

  // ---------- Render -----------
  return (
    <motion.div
      className="p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Page Heading - dynamically use month/year and employee name */}
      <motion.h1
        className="text-xl md:text-2xl font-bold mb-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Attendance Of {monthName} {year} ({employeeName} ({employeeCode}))
      </motion.h1>

      {/* Top controls row */}
      <motion.div
        className="flex flex-col md:flex-row items-start md:items-center justify-between 
                   bg-white dark:bg-gray-800 rounded-md shadow px-4 py-3 mb-6 gap-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left group */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Rows Per Page */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Show
            </label>
            <select
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200 rounded-md py-1 px-2 text-sm focus:outline-none"
              value={rowsPerPage}
              onChange={handleRowsPerPage}
            >
              <option value={7}>7</option>
              <option value={10}>10</option>
              <option value={30}>30</option>
              <option value={31}>31</option>
            </select>
          </div>

          {/* Month-Year input */}
          <div>
            <input
              type="month"
              value={selectedMonth}
              onChange={handleMonthChange}
              className="border border-gray-300 dark:border-gray-600 rounded-md py-1 px-2 text-sm 
                         text-gray-700 dark:text-gray-200
                         bg-white dark:bg-gray-700 focus:outline-none"
            />
          </div>

          {/* Example filter dropdown */}
          <div>
            <select
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700
                         dark:text-gray-200 rounded-md py-1 px-2 text-sm focus:outline-none"
            >
              <option>Select</option>
              <option>Late</option>
              <option>Early Out</option>
            </select>
          </div>
        </div>

        {/* Right group: Search + icons */}
        <div className="flex items-center gap-2">
          {/* Search box */}
          <div className="relative">
            <input
              type="text"
              value={searchText}
              onChange={handleSearch}
              placeholder="Search"
              className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200
                         rounded-md py-1 px-3 pr-8 text-sm focus:outline-none"
            />
            <FiSearch
              className="absolute right-2 top-1/2 -translate-y-1/2 
                         text-gray-400 dark:text-gray-400"
              size={16}
            />
          </div>

          {/* Action icons */}
          <button className="p-2 rounded bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800">
            <FiPrinter className="text-green-600 dark:text-green-100" size={16} />
          </button>
          <button className="p-2 rounded bg-pink-100 dark:bg-pink-900 hover:bg-pink-200 dark:hover:bg-pink-800">
            <FiDownload className="text-pink-600 dark:text-pink-100" size={16} />
          </button>
          <button className="p-2 rounded bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800">
            <FiFileText className="text-purple-600 dark:text-purple-100" size={16} />
          </button>
          <button className="p-2 rounded bg-orange-100 dark:bg-orange-900 hover:bg-orange-200 dark:hover:bg-orange-800">
            <FiSettings className="text-orange-600 dark:text-orange-100" size={16} />
          </button>
        </div>
      </motion.div>

      {/* Main area: Table and side overview */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Table (3/4) */}
        <div className="lg:col-span-3">
          <motion.div
            className="overflow-x-auto bg-white dark:bg-gray-800 rounded-md shadow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <table className="w-full text-left min-w-max">
              <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  <th className="py-3 px-4">S.L</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Day</th>
                  <th className="py-3 px-4">Log In Time</th>
                  <th className="py-3 px-4">Log Out Time</th>
                  <th className="py-3 px-4">Total Break</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Removed AnimatePresence and replaced motion.tr with standard tr */}
                {displayedData.map((item) => (
                  <tr
                    key={item.sl}
                    className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm"
                  >
                    <td className="py-3 px-4">{String(item.sl).padStart(2, "0")}</td>
                    <td className="py-3 px-4">{item.date}</td>
                    <td className="py-3 px-4">{item.day}</td>
                    <td className="py-3 px-4">{item.logInTime}</td>
                    <td className="py-3 px-4">{item.logOutTime}</td>
                    <td className="py-3 px-4">{item.totalBreak}</td>
                    <td className="py-3 px-4">{renderStatusBadge(item.status)}</td>
                  </tr>
                ))}

                {displayedData.length === 0 && (
                  <tr key="no-records">
                    <td
                      colSpan={7}
                      className="py-4 text-center text-gray-500 dark:text-gray-400"
                    >
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </motion.div>

          {/* Pagination */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-between mt-3 text-sm 
                       text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="mb-2 sm:mb-0">
              Showing {startIndex + 1} to {Math.min(endIndex, totalEntries)} of{" "}
              {totalEntries} entries
            </p>
            <div className="space-x-1">
              <button
                onClick={() => goToPage(safeCurrentPage - 1)}
                className="py-1 px-2 border border-gray-300 dark:border-gray-600 rounded 
                           text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i + 1)}
                  className={`py-1 px-2 border border-gray-300 dark:border-gray-600 rounded 
                    ${
                      safeCurrentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => goToPage(safeCurrentPage + 1)}
                className="py-1 px-2 border border-gray-300 dark:border-gray-600 rounded 
                           text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                &gt;
              </button>
            </div>
          </motion.div>
        </div>

        {/* Side panel: Employee Overview */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-md shadow p-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-3 text-lg">
            Employee Overview
          </h2>
          <div className="space-y-3">
            {overviewData.map((item, idx) => (
              <motion.div
                key={idx}
                className="flex items-center justify-between border-b border-gray-200 dark:border-gray-600 last:border-b-0 py-1"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <div className="flex items-center space-x-2">
                  <span
                    className={`inline-flex items-center justify-center 
                      w-6 h-6 text-xs font-bold rounded-full 
                      ${item.bg} ${item.text}`}
                  >
                    {item.short}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 text-sm">
                    {item.label}
                  </span>
                </div>
                <span className="text-gray-700 dark:text-gray-200 font-medium">
                  {item.value}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

