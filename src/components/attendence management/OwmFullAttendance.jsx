

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   FiPrinter,
//   FiDownload,
//   FiFileText,
//   FiSettings,
//   FiSearch,
// } from "react-icons/fi";
// import { toast } from "react-hot-toast";
// import ConfirmationDialog from "../common/ConfirmationDialog";

// // 1) Pull in relevant parts of your Zustand store:
// import { useOwnFullAttendanceStore } from "../../store/useOwnFullAttendanceStore";

// /* 
//   2) Local helper: getAllDaysInMonth pinned to midday to avoid time-zone drift.
//      This returns an array of Date objects for every day in the specified year-month.
// */
// function getAllDaysInMonth(year, month) {
//   const days = [];
//   // Pin date to midday to avoid time shift.
//   let date = new Date(year, month - 1, 1, 12);
//   while (date.getMonth() === month - 1) {
//     days.push(new Date(date));
//     date.setDate(date.getDate() + 1);
//   }
//   return days;
// }

// /* 
//   3) Local helpers for converting 12-hour times and calculating hours worked.
// */
// function convertTo24Hour(timeString) {
//   if (!timeString) return null;
//   const [timePart, ampm] = timeString.split(" ");
//   if (!timePart || !ampm) return null;

//   let [hours, minutes, seconds] = timePart.split(":").map(Number);
//   hours = hours || 0;
//   minutes = minutes || 0;
//   seconds = seconds || 0;

//   if (ampm.toUpperCase() === "PM" && hours !== 12) {
//     hours += 12;
//   }
//   if (ampm.toUpperCase() === "AM" && hours === 12) {
//     hours = 0;
//   }
//   return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
//     2,
//     "0"
//   )}:${String(seconds).padStart(2, "0")}`;
// }

// function getHoursWorked(login, logout) {
//   if (!login || !logout) return 0;
//   const login24 = convertTo24Hour(login);
//   const logout24 = convertTo24Hour(logout);
//   if (!login24 || !logout24) return 0;

//   const loginDate = new Date(`1970-01-01T${login24}`);
//   const logoutDate = new Date(`1970-01-01T${logout24}`);
//   const diffMs = logoutDate - loginDate;
//   return diffMs > 0 ? diffMs / (1000 * 60 * 60) : 0;
// }

// export default function OwmFullAttendance() {
//   // ----------------------------------------------------
//   // 4) Grab needed data/actions from the store:
//   // ----------------------------------------------------
//   const fetchAttendanceData = useOwnFullAttendanceStore((s) => s.fetchAttendanceData);
//   const attendanceData = useOwnFullAttendanceStore((s) => s.attendanceData);
//   const approvedLeaves = useOwnFullAttendanceStore((s) => s.approvedLeaves);
//   const companySettings = useOwnFullAttendanceStore((s) => s.companySettings);
//   const leaveSystemDetails = useOwnFullAttendanceStore((s) => s.leaveSystemDetails);

//   // For the side panel:
//   const getSummaryStats = useOwnFullAttendanceStore((s) => s.getSummaryStats);

//   // PDF generation:
//   const generatePDF = useOwnFullAttendanceStore((s) => s.generatePDF);

//   // For user info & errors:
//   const userProfileData = useOwnFullAttendanceStore((s) => s.userProfileData);
//   const attendanceError = useOwnFullAttendanceStore((s) => s.error);

//   // Confirmation dialog for PDF:
//   const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

//   // ----------------------------------------------------
//   // 5) Default the month to the current month:
//   // ----------------------------------------------------
//   const today = new Date();
//   const defaultMonthString = `${today.getFullYear()}-${String(
//     today.getMonth() + 1
//   ).padStart(2, "0")}`;
//   const [selectedMonth, setSelectedMonth] = useState(defaultMonthString);

//   // ----------------------------------------------------
//   // 6) Search & Pagination states:
//   // ----------------------------------------------------
//   const [searchText, setSearchText] = useState("");
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   // ----------------------------------------------------
//   // 7) On mount, fetch attendance data:
//   // ----------------------------------------------------
//   useEffect(() => {
//     fetchAttendanceData();
//   }, [fetchAttendanceData]);

//   // ----------------------------------------------------
//   // 8) Convert "YYYY-MM" into numeric year & month:
//   // ----------------------------------------------------
//   const [year, month] = selectedMonth.split("-").map(Number);

//   // ----------------------------------------------------
//   // 9) Build the final table data locally:
//   // ----------------------------------------------------
//   const allDaysInMonth = getAllDaysInMonth(year, month);

//   // Build a Set of all approved leave dates:
//   const approvedLeaveDates = new Set();
//   approvedLeaves?.forEach((leave) => {
//     const fromDate = new Date(leave.leave_From);
//     const toDate = new Date(leave.leave_To);
//     for (let d = new Date(fromDate); d <= toDate; d.setDate(d.getDate() + 1)) {
//       approvedLeaveDates.add(d.toISOString().split("T")[0]);
//     }
//   });

//   const todayObj = new Date();

//   const finalAttendanceData = allDaysInMonth.map((dateObj, idx) => {
//     const formatted = dateObj.toISOString().split("T")[0];
//     const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
//     let row = {
//       sl: idx + 1,
//       date: formatted,
//       day: dayName,
//       logInTime: "------",
//       logOutTime: "------",
//       totalBreak: "N/A",
//       status: "------",
//     };

//     // Check if holiday / off-day / approved leave:
//     const isHoliday = companySettings?.holidays?.some(
//       (h) => new Date(h.date).toISOString().split("T")[0] === formatted
//     );
//     const isWorkingDay = leaveSystemDetails?.workingDays?.includes(dayName) ?? false;
//     const isApprovedLeave = approvedLeaveDates.has(formatted);

//     if (isApprovedLeave) {
//       row.status = "Holiday";
//       return row;
//     }
//     if (!isWorkingDay || isHoliday) {
//       row.status = "Holiday";
//       return row;
//     }

//     // See if there's an attendance record
//     const record = attendanceData.find((r) => r.date === formatted);
//     if (!record) {
//       // Past => Absent, future => "------"
//       row.status = dateObj < todayObj ? "Absent" : "------";
//       return row;
//     }

//     // Fill in times
//     if (record.login) row.logInTime = record.login;
//     if (record.logout) row.logOutTime = record.logout;

//     // If there's breaks, you can also compute them if you like
//     // (Here, we'll just do "N/A" unless you want to replicate getTotalBreakTime logic.)

//     // If no logout in the past => Absent
//     if (!record.logout) {
//       row.status = dateObj < todayObj ? "Absent" : "------";
//       return row;
//     }

//     // If we do have login+logout, check hours worked
//     const hoursWorked = getHoursWorked(record.login, record.logout);
//     if (hoursWorked >= 9) {
//       row.status = "Present";
//     } else if (hoursWorked >= 4.5 && hoursWorked < 9) {
//       row.status = hoursWorked <= 5 ? "Half Day" : "Not Even Half Day";
//     } else if (hoursWorked > 0 && hoursWorked < 4.5) {
//       row.status = "Not Even Half Day";
//     } else {
//       row.status = "Present";
//     }

//     return row;
//   });

//   // ----------------------------------------------------
//   // 10) Filter by search text:
//   // ----------------------------------------------------
//   const filteredData = finalAttendanceData.filter((item) => {
//     const combined = `${item.date} ${item.day} ${item.status}`.toLowerCase().trim();
//     return combined.includes(searchText.toLowerCase().trim());
//   });

//   // ----------------------------------------------------
//   // 11) Pagination:
//   // ----------------------------------------------------
//   const totalEntries = filteredData.length;
//   const totalPages = Math.ceil(totalEntries / rowsPerPage);
//   const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages || 1));
//   const startIndex = (safeCurrentPage - 1) * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const displayedData = filteredData.slice(startIndex, endIndex);

//   // ----------------------------------------------------
//   // 12) Side Panel: Let's still use getSummaryStats from store
//   // ----------------------------------------------------
//   const overviewData = getSummaryStats(year, month);

//   // ----------------------------------------------------
//   // 13) Event Handlers:
//   // ----------------------------------------------------
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

//   // PDF
//   function onRequestPDF() {
//     setConfirmDialogOpen(true);
//   }

//   function onConfirmPDF() {
//     setConfirmDialogOpen(false);
//     generatePDF();
//   }

//   function onCancelPDF() {
//     setConfirmDialogOpen(false);
//     toast("PDF download cancelled", { icon: "❌" });
//   }

//   // ----------------------------------------------------
//   // 14) Render
//   // ----------------------------------------------------
//   if (attendanceError) {
//     return (
//       <div className="p-6 text-center text-red-600 dark:text-red-300">
//         <p>Error: {attendanceError}</p>
//       </div>
//     );
//   }

//   // Employee name / code for heading
//   const empName = `${userProfileData?.first_Name || ""} ${userProfileData?.last_Name || ""}`.trim() || "Unknown Name";
//   const empCode = userProfileData?.employee_Id || "N/A";

//   // Status badge styling
//   function renderStatusBadge(status) {
//     let bgColor = "bg-gray-100 dark:bg-gray-700";
//     let textColor = "text-gray-600 dark:text-gray-200";

//     if (status) {
//       switch (status.toLowerCase()) {
//         case "present":
//           bgColor = "bg-green-100 dark:bg-green-900";
//           textColor = "text-green-700 dark:text-green-100";
//           break;
//         case "absent":
//           bgColor = "bg-red-100 dark:bg-red-900";
//           textColor = "text-red-700 dark:text-red-100";
//           break;
//         case "holiday":
//           bgColor = "bg-black";
//           textColor = "text-white";
//           break;
//         case "half day":
//           bgColor = "bg-pink-100 dark:bg-pink-900";
//           textColor = "text-pink-700 dark:text-pink-100";
//           break;
//         case "not even half day":
//           bgColor = "bg-gray-100 dark:bg-gray-700";
//           textColor = "text-gray-600 dark:text-gray-200";
//           break;
//         default:
//           bgColor = "bg-gray-100 dark:bg-gray-700";
//           textColor = "text-gray-600 dark:text-gray-200";
//       }
//     }
//     return (
//       <span className={`px-2 py-1 text-sm rounded-md font-medium ${bgColor} ${textColor}`}>
//         {status || "------"}
//       </span>
//     );
//   }

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
//         Attendance Of {monthName(month)} {year} ({empName} ({empCode}))
//       </motion.h1>

//       {/* Top controls row */}
//       <motion.div
//         className="flex flex-col md:flex-row items-start md:items-center justify-between 
//                    bg-white dark:bg-gray-800 rounded-md shadow px-4 py-3 mb-6 gap-4"
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
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

//           {/* Example filter dropdown (demo) */}
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
//           <button
//             className="p-2 rounded bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800"
//             onClick={() => window.print()}
//           >
//             <FiPrinter className="text-green-600 dark:text-green-100" size={16} />
//           </button>

//           <button
//             className="p-2 rounded bg-pink-100 dark:bg-pink-900 hover:bg-pink-200 dark:hover:bg-pink-800"
//             onClick={onRequestPDF}
//           >
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
//                 {displayedData.map((item) => (
//                   <tr
//                     key={item.sl}
//                     className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm"
//                   >
//                     <td className="py-3 px-4">{String(item.sl).padStart(2, "0")}</td>
//                     <td className="py-3 px-4">{item.date}</td>
//                     <td className="py-3 px-4">{item.day}</td>
//                     <td className="py-3 px-4">{item.logInTime}</td>
//                     <td className="py-3 px-4">{item.logOutTime}</td>
//                     <td className="py-3 px-4">{item.totalBreak}</td>
//                     <td className="py-3 px-4">{renderStatusBadge(item.status)}</td>
//                   </tr>
//                 ))}
//                 {displayedData.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan={7}
//                       className="py-4 text-center text-gray-500 dark:text-gray-400"
//                     >
//                       No records found.
//                     </td>
//                   </tr>
//                 )}
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

//         {/* -------------------------------
//             Side panel: Employee Overview
//            ------------------------------- */}
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

//       {/* Confirmation Dialog for PDF */}
//       <ConfirmationDialog
//         open={confirmDialogOpen}
//         title="Download PDF?"
//         message="Are you sure you want to download the payroll PDF?"
//         onConfirm={onConfirmPDF}
//         onCancel={onCancelPDF}
//         confirmText="Yes"
//         cancelText="No"
//       />
//     </motion.div>
//   );
// }

// // Helper to convert numeric month → textual month name
// function monthName(m) {
//   const monthNames = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   return monthNames[m - 1] || "Unknown";
// }



import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiPrinter,
  FiDownload,
  FiFileText,
  FiSettings,
  FiSearch,
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import ConfirmationDialog from "../common/ConfirmationDialog";

// 1) Pull in relevant parts of your Zustand store:
import { useOwnFullAttendanceStore } from "../../store/useOwnFullAttendanceStore";

/* 
  Local helper: getAllDaysInMonth pinned to midday to avoid time-zone drift.
  (Unchanged)
*/
function getAllDaysInMonth(year, month) {
  const days = [];
  let date = new Date(year, month - 1, 1, 12);
  while (date.getMonth() === month - 1) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

/* 
  Local helpers for converting 12-hour times and calculating hours worked.
  (Unchanged)
*/
function convertTo24Hour(timeString) {
  if (!timeString) return null;
  const [timePart, ampm] = timeString.split(" ");
  if (!timePart || !ampm) return null;

  let [hours, minutes, seconds] = timePart.split(":").map(Number);
  hours = hours || 0;
  minutes = minutes || 0;
  seconds = seconds || 0;

  if (ampm.toUpperCase() === "PM" && hours !== 12) {
    hours += 12;
  }
  if (ampm.toUpperCase() === "AM" && hours === 12) {
    hours = 0;
  }
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}

function getHoursWorked(login, logout) {
  if (!login || !logout) return 0;
  const login24 = convertTo24Hour(login);
  const logout24 = convertTo24Hour(logout);
  if (!login24 || !logout24) return 0;

  const loginDate = new Date(`1970-01-01T${login24}`);
  const logoutDate = new Date(`1970-01-01T${logout24}`);
  const diffMs = logoutDate - loginDate;
  return diffMs > 0 ? diffMs / (1000 * 60 * 60) : 0;
}

/*
  --------------- NEW: getTotalBreakTime ---------------
  This function sums up all "breaks[].start/end" or "breaks[].duration" 
  to produce a string like "0h 2m" or "1h 15m"
*/
function getTotalBreakTime(breaks = []) {
  let totalMinutes = 0;

  breaks.forEach((br) => {
    // If the API has a numeric 'duration' in minutes:
    if (typeof br.duration === "number" && br.duration > 0) {
      totalMinutes += br.duration;
    }
    // Otherwise, if we have valid start/end times, calculate from them:
    else if (br.start && br.end) {
      const start = new Date(br.start);
      const end = new Date(br.end);
      const diffMs = end - start;
      const diffMins = diffMs > 0 ? diffMs / (1000 * 60) : 0;
      totalMinutes += diffMins;
    }
  });

  // Convert total minutes → "Xh Ym"
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);
  return `${hours}h ${minutes}m`;
}

export default function OwmFullAttendance() {
  // ----------------------------------------------------
  // Grab needed data/actions from the store (Unchanged):
  // ----------------------------------------------------
  const fetchAttendanceData = useOwnFullAttendanceStore((s) => s.fetchAttendanceData);
  const attendanceData = useOwnFullAttendanceStore((s) => s.attendanceData);
  const approvedLeaves = useOwnFullAttendanceStore((s) => s.approvedLeaves);
  const companySettings = useOwnFullAttendanceStore((s) => s.companySettings);
  const leaveSystemDetails = useOwnFullAttendanceStore((s) => s.leaveSystemDetails);
  const getSummaryStats = useOwnFullAttendanceStore((s) => s.getSummaryStats);
  const generatePDF = useOwnFullAttendanceStore((s) => s.generatePDF);
  const userProfileData = useOwnFullAttendanceStore((s) => s.userProfileData);
  const attendanceError = useOwnFullAttendanceStore((s) => s.error);

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  // Default month → current month (Unchanged)
  const today = new Date();
  const defaultMonthString = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}`;
  const [selectedMonth, setSelectedMonth] = useState(defaultMonthString);

  // Search & pagination states (Unchanged)
  const [searchText, setSearchText] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data on mount (Unchanged)
  useEffect(() => {
    fetchAttendanceData();
  }, [fetchAttendanceData]);

  // Split selectedMonth (Unchanged)
  const [year, month] = selectedMonth.split("-").map(Number);

  // ----------------------------------------------------
  // Build the final table data (only break logic changed):
  // ----------------------------------------------------
  const allDaysInMonth = getAllDaysInMonth(year, month);

  const approvedLeaveDates = new Set();
  approvedLeaves?.forEach((leave) => {
    const fromDate = new Date(leave.leave_From);
    const toDate = new Date(leave.leave_To);
    for (let d = new Date(fromDate); d <= toDate; d.setDate(d.getDate() + 1)) {
      approvedLeaveDates.add(d.toISOString().split("T")[0]);
    }
  });

  const todayObj = new Date();

  const finalAttendanceData = allDaysInMonth.map((dateObj, idx) => {
    const formatted = dateObj.toISOString().split("T")[0];
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
    let row = {
      sl: idx + 1,
      date: formatted,
      day: dayName,
      logInTime: "------",
      logOutTime: "------",
      totalBreak: "N/A", // default
      status: "------",
    };

    const isHoliday = companySettings?.holidays?.some(
      (h) => new Date(h.date).toISOString().split("T")[0] === formatted
    );
    const isWorkingDay = leaveSystemDetails?.workingDays?.includes(dayName) ?? false;
    const isApprovedLeave = approvedLeaveDates.has(formatted);

    if (isApprovedLeave) {
      row.status = "Holiday";
      return row;
    }
    if (!isWorkingDay || isHoliday) {
      row.status = "Holiday";
      return row;
    }

    const record = attendanceData.find((r) => r.date === formatted);
    if (!record) {
      // Past => Absent, future => "------"
      row.status = dateObj < todayObj ? "Absent" : "------";
      return row;
    }

    // Fill in login/logout
    if (record.login) row.logInTime = record.login;
    if (record.logout) row.logOutTime = record.logout;

    // -------------- ONLY CHANGE HERE --------------
    // If there are breaks, calculate total break time:
    if (record.breaks && record.breaks.length > 0) {
      row.totalBreak = getTotalBreakTime(record.breaks);
    }
    // ----------------------------------------------

    // If no logout & date in the past => Absent
    if (!record.logout) {
      row.status = dateObj < todayObj ? "Absent" : "------";
      return row;
    }

    // If we do have login+logout, compute hours worked
    const hoursWorked = getHoursWorked(record.login, record.logout);
    if (hoursWorked >= 9) {
      row.status = "Present";
    } else if (hoursWorked >= 4.5 && hoursWorked < 9) {
      row.status = hoursWorked <= 5 ? "Half Day" : "Not Even Half Day";
    } else if (hoursWorked > 0 && hoursWorked < 4.5) {
      row.status = "Not Even Half Day";
    } else {
      row.status = "Present";
    }

    return row;
  });

  // Filter by search (Unchanged)
  const filteredData = finalAttendanceData.filter((item) => {
    const combined = `${item.date} ${item.day} ${item.status}`.toLowerCase().trim();
    return combined.includes(searchText.toLowerCase().trim());
  });

  // Pagination (Unchanged)
  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage);
  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages || 1));
  const startIndex = (safeCurrentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedData = filteredData.slice(startIndex, endIndex);

  // Side panel stats (Unchanged)
  const overviewData = getSummaryStats(year, month);

  // Handlers (Unchanged)
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

  // PDF
  function onRequestPDF() {
    setConfirmDialogOpen(true);
  }
  function onConfirmPDF() {
    setConfirmDialogOpen(false);
    generatePDF();
  }
  function onCancelPDF() {
    setConfirmDialogOpen(false);
    toast("PDF download cancelled", { icon: "❌" });
  }

  if (attendanceError) {
    return (
      <div className="p-6 text-center text-red-600 dark:text-red-300">
        <p>Error: {attendanceError}</p>
      </div>
    );
  }

  const empName =
    `${userProfileData?.first_Name || ""} ${userProfileData?.last_Name || ""}`.trim() ||
    "Unknown Name";
  const empCode = userProfileData?.employee_Id || "N/A";

  // Status badge styling (Unchanged)
  function renderStatusBadge(status) {
    let bgColor = "bg-gray-100 dark:bg-gray-700";
    let textColor = "text-gray-600 dark:text-gray-200";

    if (status) {
      switch (status.toLowerCase()) {
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
          bgColor = "bg-gray-100 dark:bg-gray-700";
          textColor = "text-gray-600 dark:text-gray-200";
          break;
        default:
          bgColor = "bg-gray-100 dark:bg-gray-700";
          textColor = "text-gray-600 dark:text-gray-200";
      }
    }
    return (
      <span className={`px-2 py-1 text-sm rounded-md font-medium ${bgColor} ${textColor}`}>
        {status || "------"}
      </span>
    );
  }

  return (
    <motion.div
      className="p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Page Heading */}
      <motion.h1
        className="text-xl md:text-2xl font-bold mb-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Attendance Of {monthName(month)} {year} ({empName} ({empCode}))
      </motion.h1>

      {/* Top controls row */}
      <motion.div
        className="flex flex-col md:flex-row items-start md:items-center justify-between 
                   bg-white dark:bg-gray-800 rounded-md shadow px-4 py-3 mb-6 gap-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
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

          {/* Example filter dropdown (demo) */}
          {/* <div>
            <select
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700
                         dark:text-gray-200 rounded-md py-1 px-2 text-sm focus:outline-none"
            >
              <option>Select</option>
              <option>Late</option>
              <option>Early Out</option>
            </select>
          </div> */}
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
          <button
            className="p-2 rounded bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800"
            onClick={() => window.print()}
          >
            <FiPrinter className="text-green-600 dark:text-green-100" size={16} />
          </button>

          <button
            className="p-2 rounded bg-pink-100 dark:bg-pink-900 hover:bg-pink-200 dark:hover:bg-pink-800"
            onClick={onRequestPDF}
          >
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
                {displayedData.map((item) => (
                  <tr
                    key={item.sl}
                    className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm"
                  >
                    <td className="py-3 px-4">
                      {String(item.sl).padStart(2, "0")}
                    </td>
                    <td className="py-3 px-4">{item.date}</td>
                    <td className="py-3 px-4">{item.day}</td>
                    <td className="py-3 px-4">{item.logInTime}</td>
                    <td className="py-3 px-4">{item.logOutTime}</td>
                    <td className="py-3 px-4">{item.totalBreak}</td>
                    <td className="py-3 px-4">{renderStatusBadge(item.status)}</td>
                  </tr>
                ))}
                {displayedData.length === 0 && (
                  <tr>
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

        {/* Side panel: Employee Overview (unchanged) */}
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

      {/* Confirmation Dialog for PDF */}
      <ConfirmationDialog
        open={confirmDialogOpen}
        title="Download PDF?"
        message="Are you sure you want to download the payroll PDF?"
        onConfirm={onConfirmPDF}
        onCancel={onCancelPDF}
        confirmText="Yes"
        cancelText="No"
      />
    </motion.div>
  );
}

// Helper to convert numeric month → textual month name (Unchanged)
function monthName(m) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[m - 1] || "Unknown";
}
