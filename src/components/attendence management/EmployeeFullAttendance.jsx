import React, { useEffect, useState, useMemo } from "react";
import { motion,AnimatePresence } from "framer-motion";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useParams } from "react-router-dom";
import axiosInstance from "../../service/axiosInstance";
import useAttendanceStore from "../../store/useFullAttendanceStore";
import ExportButtons from "../../components/common/PdfExcel";
import toast from "react-hot-toast";

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
      {status || "----"}
    </span>
  );
}

export default function EmployeeFullAttendance() {
  const [managerApprovalLoading, setManagerApprovalLoading] = useState(false);
  
  const { empID } = useParams();

  const {
    userProfileData,
    fetchAllData,
    getMonthlyAttendanceView,
    calculateTotalShifts,
    calculateTotalCompletedDays,
    calculateTotalLates,
    calculateTotalHalfDays,
    calculateNotEvenHalfDays,
    calculateNotLoggedOut,
    error,
    isLoading,
  } = useAttendanceStore();

  useEffect(() => {
    if (empID) {
      fetchAllData(empID);
    } else {
      fetchAllData(""); 
    }
  }, [empID, fetchAllData]);

  const today = new Date();
  const defaultMonthString = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}`;
  const [selectedMonth, setSelectedMonth] = useState(defaultMonthString);
  const [searchText, setSearchText] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

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

  const [yearStr, monthStr] = selectedMonth.split("-");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);

  const finalTableData = useMemo(() => {
    if (!year || !month || isLoading) return [];

    return getMonthlyAttendanceView(year, month);
  }, [year, month, isLoading, getMonthlyAttendanceView]);

  // Filter by search
  const filteredData = useMemo(() => {
    const txt = searchText.toLowerCase().trim();
    if (!txt) return finalTableData;

    return finalTableData.filter((row) => {
      const combined = `${row.date} ${row.day} ${row.status}`.toLowerCase();
      return combined.includes(txt);
    });
  }, [searchText, finalTableData]);

  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage);
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages || 1);
  const startIndex = (safeCurrentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedData = filteredData.slice(startIndex, endIndex);


  const parsedYear = parseInt(year, 10);
  const parsedMonth = parseInt(month, 10);
  const totalShifts = calculateTotalShifts(parsedYear, parsedMonth);
  const completedShifts = calculateTotalCompletedDays(parsedYear, parsedMonth);
  const totalLates = calculateTotalLates(parsedYear, parsedMonth);
  const halfDayCount = calculateTotalHalfDays(parsedYear, parsedMonth);
  const notEvenHalfDay = calculateNotEvenHalfDays(parsedYear, parsedMonth);
  const notLoggedOut = calculateNotLoggedOut(parsedYear, parsedMonth);

  // Basic present/absent/holiday stats from displayed data
  const presentCount = displayedData.filter((item) =>
    item.status.toLowerCase().includes("present")
  ).length;
  const absentCount = displayedData.filter((item) =>
    item.status.toLowerCase().includes("absent")
  ).length;
  const holidayCount = displayedData.filter((item) =>
    item.status.toLowerCase().includes("holiday")
  ).length;

  async function handleApprovePunch(item) {
   try {
     setManagerApprovalLoading(true);
     // Suppose item holds a requestId, or some identifier for the request
     await axiosInstance.patch(`/attendance-user/missed-punch-request/${item.requestId}`, {
       action: "approve"
     });
     toast.success("Punch request approved.");
     // e.g. re-fetch attendance or missed-punch requests
   } catch (err) {
     toast.error("Failed to approve: " + (err?.message || "Error"));
   } finally {
     setManagerApprovalLoading(false);
   }
 }
 async function handleRejectPunch(item) {
   try {
     setManagerApprovalLoading(true);
     await axiosInstance.patch(`/attendance-user/missed-punch-request/${item.requestId}`, {
       action: "reject"
     });
     toast.success("Punch request rejected.");
     // e.g. re-fetch attendance or missed-punch requests
   } catch (err) {
     toast.error("Failed to reject: " + (err?.message || "Error"));
   } finally {
     setManagerApprovalLoading(false);
   }
 }

  // Example placeholders
  const totalPaidLeaves = 3;
  const totalLeaves = 4;
  const overTime = "--";
  const regularization = "--";

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

  // Convert "YYYY-MM" to "Month YYYY"
  const dateObj = new Date(parsedYear, parsedMonth - 1, 1);
  const monthName = dateObj.toLocaleString("default", { month: "long" });

  // Employee name and code
  const employeeName =
    `${userProfileData?.first_Name || ""} ${
      userProfileData?.last_Name || ""
    }`.trim() || "Unknown Name";
  const employeeCode = userProfileData?.employee_Id || "Unknown Code";

  // If there's an error or isLoading
  if (error) {
    return (
      <div className="p-6 text-center text-red-600 dark:text-red-300">
        <p>Error: {error}</p>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Loading ...</p>
      </div>
    );
  }

  // Prepare columns for export
  const columns = [
    { header: "S.L", dataKey: "sl" },
    { header: "Date", dataKey: "date" },
    { header: "Day", dataKey: "day" },
    { header: "Log In Time", dataKey: "logInTime" },
    { header: "Log Out Time", dataKey: "logOutTime" },
    { header: "Total Break", dataKey: "totalBreak" },
    { header: "Status", dataKey: "status" },
  ];

  return (
    <motion.div
      className="p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Heading */}
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
        </div>

        {/* Right group: Search + Export */}
        <div className="flex items-center gap-2">
          {/* Search */}
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

          {/* ExportButtons */}
          <ExportButtons
  data={filteredData}  // <-- Replace displayedData with filteredData
  columns={columns}
  filename={`Attendance_${employeeCode}_${selectedMonth}`}
/>

        </div>
      </motion.div>

      {/* Table + Overview */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Table (3/4) */}
        <div className="lg:col-span-3">
  {/* Attendance Table */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
  >
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
          <tr>
            {["S.L", "Date", "Day", "Log In Time", "Log Out Time", "Total Break", "Status"].map((header, index) => (
              <th
                key={header}
                className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          <AnimatePresence>
            {displayedData.map((item, index) => (
              <motion.tr
                key={item.sl}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300">
                    {String(item.sl).padStart(2, "0")}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600 dark:text-gray-400">{item.day}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-blue-600 dark:text-blue-400">{item.logInTime}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-red-600 dark:text-red-400">{item.logOutTime}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item.totalBreak}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {renderStatusBadge(item.status)}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {userProfileData?.permission?.includes("attendance-view-subordinate") && item.requestId && (
                      <div className="inline-flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 border border-green-300 dark:border-green-600 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 rounded-lg text-xs font-medium transition-colors"
                          onClick={() => handleApprovePunch(item)}
                          disabled={managerApprovalLoading}
                        >
                          <FiCheck className="w-3 h-3" />
                          Approve
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 border border-red-300 dark:border-red-600 text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg text-xs font-medium transition-colors"
                          onClick={() => handleRejectPunch(item)}
                          disabled={managerApprovalLoading}
                        >
                          <FiX className="w-3 h-3" />
                          Reject
                        </motion.button>
                      </div>
                    )}
                  </div>
                </td> */}
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>

      {displayedData.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiSearch className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">No records found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
        </div>
      )}
    </div>

    {/* Pagination */}
    {totalPages > 1 && (
      <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Showing {startIndex + 1}-{Math.min(endIndex, totalEntries)} of {totalEntries} results
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => goToPage(safeCurrentPage - 1)}
            disabled={safeCurrentPage === 1}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FiChevronLeft className="w-4 h-4" />
          </motion.button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <motion.button
                  key={page}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    page === safeCurrentPage
                      ? "bg-blue-600 dark:bg-blue-500 text-white"
                      : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600"
                  }`}
                >
                  {page}
                </motion.button>
              );
            })}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => goToPage(safeCurrentPage + 1)}
            disabled={safeCurrentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FiChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    )}
  </motion.div>
</div>

        {/* Side panel: Employee Overview (1/4) */}
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
