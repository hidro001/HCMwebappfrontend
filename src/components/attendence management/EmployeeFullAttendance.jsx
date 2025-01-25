import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPrinter,
  FiDownload,
  FiFileText,
  FiSettings,
  FiSearch,
} from "react-icons/fi";

export default function EmployeeFullAttendance() {
  const empName = "Riya Mishra";
  const empCode = "RI0023";

  const allAttendanceData = [
    {
      sl: 1,
      date: "2025-01-01",
      day: "Wednesday",
      logInTime: "10:39:45",
      logOutTime: "19:07:56",
      totalBreak: "45min 20sec",
      status: "Present",
    },
    {
      sl: 2,
      date: "2025-01-02",
      day: "Thursday",
      logInTime: "------",
      logOutTime: "------",
      totalBreak: "------",
      status: "Absent",
    },
    {
      sl: 3,
      date: "2025-01-03",
      day: "Friday",
      logInTime: "10:39:45",
      logOutTime: "19:27:42",
      totalBreak: "45min 20sec",
      status: "Present",
    },
    {
      sl: 4,
      date: "2025-01-04",
      day: "Saturday",
      logInTime: "10:39:45",
      logOutTime: "19:27:42",
      totalBreak: "45min 20sec",
      status: "Present",
    },
    {
      sl: 5,
      date: "2025-01-05",
      day: "Sunday",
      logInTime: "------",
      logOutTime: "------",
      totalBreak: "------",
      status: "Holiday",
    },
    {
      sl: 6,
      date: "2025-01-06",
      day: "Monday",
      logInTime: "10:39:45",
      logOutTime: "15:00:00",
      totalBreak: "30min 00sec",
      status: "Half Day",
    },
    {
      sl: 7,
      date: "2025-01-07",
      day: "Tuesday",
      logInTime: "10:39:45",
      logOutTime: "19:07:56",
      totalBreak: "45min 20sec",
      status: "Present",
    },
    {
      sl: 8,
      date: "2025-01-08",
      day: "Wednesday",
      logInTime: "10:39:45",
      logOutTime: "19:07:56",
      totalBreak: "45min 20sec",
      status: "Present",
    },
    {
      sl: 9,
      date: "2025-01-09",
      day: "Thursday",
      logInTime: "------",
      logOutTime: "------",
      totalBreak: "------",
      status: "Absent",
    },
    {
      sl: 10,
      date: "2025-01-10",
      day: "Friday",
      logInTime: "10:39:45",
      logOutTime: "19:27:42",
      totalBreak: "45min 20sec",
      status: "Present",
    },
    {
      sl: 11,
      date: "2025-01-11",
      day: "Saturday",
      logInTime: "10:39:45",
      logOutTime: "19:27:42",
      totalBreak: "45min 20sec",
      status: "Present",
    },
    {
      sl: 12,
      date: "2025-01-12",
      day: "Sunday",
      logInTime: "------",
      logOutTime: "------",
      totalBreak: "------",
      status: "Holiday",
    },
    {
      sl: 13,
      date: "2025-01-13",
      day: "Monday",
      logInTime: "10:39:45",
      logOutTime: "15:00:00",
      totalBreak: "30min 00sec",
      status: "Half Day",
    },
    {
      sl: 14,
      date: "2025-01-14",
      day: "Tuesday",
      logInTime: "10:39:45",
      logOutTime: "19:07:56",
      totalBreak: "45min 20sec",
      status: "Present",
    },
    {
      sl: 15,
      date: "2025-01-15",
      day: "Wednesday",
      logInTime: "10:39:45",
      logOutTime: "19:07:56",
      totalBreak: "45min 20sec",
      status: "Present",
    },
    {
      sl: 16,
      date: "2025-01-16",
      day: "Thursday",
      logInTime: "------",
      logOutTime: "------",
      totalBreak: "------",
      status: "Absent",
    },
    {
      sl: 17,
      date: "2025-01-17",
      day: "Friday",
      logInTime: "10:39:45",
      logOutTime: "19:27:42",
      totalBreak: "45min 20sec",
      status: "Present",
    },
    {
      sl: 18,
      date: "2025-01-18",
      day: "Saturday",
      logInTime: "10:39:45",
      logOutTime: "19:27:42",
      totalBreak: "45min 20sec",
      status: "Present",
    },
    {
      sl: 19,
      date: "2025-01-19",
      day: "Sunday",
      logInTime: "------",
      logOutTime: "------",
      totalBreak: "------",
      status: "Holiday",
    },
    {
      sl: 20,
      date: "2025-01-20",
      day: "Monday",
      logInTime: "10:39:45",
      logOutTime: "15:00:00",
      totalBreak: "30min 00sec",
      status: "Half Day",
    },
    {
      sl: 21,
      date: "2025-01-21",
      day: "Tuesday",
      logInTime: "10:39:45",
      logOutTime: "19:07:56",
      totalBreak: "45min 20sec",
      status: "Present",
    },
    {
      sl: 22,
      date: "2025-01-22",
      day: "Wednesday",
      logInTime: "10:39:45",
      logOutTime: "19:07:56",
      totalBreak: "45min 20sec",
      status: "Present",
    },
    {
      sl: 23,
      date: "2025-01-23",
      day: "Thursday",
      logInTime: "------",
      logOutTime: "------",
      totalBreak: "------",
      status: "Absent",
    },
    {
      sl: 24,
      date: "2025-01-24",
      day: "Friday",
      logInTime: "10:39:45",
      logOutTime: "19:27:42",
      totalBreak: "45min 20sec",
      status: "Present",
    },
    {
      sl: 25,
      date: "2025-01-25",
      day: "Saturday",
      logInTime: "10:39:45",
      logOutTime: "19:27:42",
      totalBreak: "45min 20sec",
      status: "Present",
    },
    {
      sl: 26,
      date: "2025-01-26",
      day: "Sunday",
      logInTime: "------",
      logOutTime: "------",
      totalBreak: "------",
      status: "Holiday",
    },
    {
      sl: 27,
      date: "2025-01-27",
      day: "Monday",
      logInTime: "10:39:45",
      logOutTime: "15:00:00",
      totalBreak: "30min 00sec",
      status: "Half Day",
    },
    {
      sl: 28,
      date: "2025-01-28",
      day: "Tuesday",
      logInTime: "10:39:45",
      logOutTime: "19:07:56",
      totalBreak: "45min 20sec",
      status: "Present",
    },
    {
      sl: 29,
      date: "2025-01-29",
      day: "Wednesday",
      logInTime: "10:39:45",
      logOutTime: "19:07:56",
      totalBreak: "45min 20sec",
      status: "Present",
    },
    {
      sl: 30,
      date: "2025-01-30",
      day: "Thursday",
      logInTime: "------",
      logOutTime: "------",
      totalBreak: "------",
      status: "Absent",
    },
    {
      sl: 31,
      date: "2025-01-31",
      day: "Friday",
      logInTime: "10:39:45",
      logOutTime: "19:27:42",
      totalBreak: "45min 20sec",
      status: "Present",
    },
  ];

  const overviewData = [
    {
      label: "Total Present",
      short: "P",
      value: 25,
      bg: "bg-green-100 dark:bg-green-900",
      text: "text-green-700 dark:text-green-100",
    },
    {
      label: "Total Absent",
      short: "A",
      value: 3,
      bg: "bg-red-100 dark:bg-red-900",
      text: "text-red-700 dark:text-red-100",
    },
    {
      label: "Total Shifts",
      short: "TS",
      value: 27,
      bg: "bg-purple-100 dark:bg-purple-900",
      text: "text-purple-700 dark:text-purple-100",
    },
    {
      label: "Completed Shifts",
      short: "CS",
      value: 27,
      bg: "bg-orange-100 dark:bg-orange-900",
      text: "text-orange-700 dark:text-orange-100",
    },
    {
      label: "Total Paid Leave",
      short: "PL",
      value: 3,
      bg: "bg-yellow-100 dark:bg-yellow-700",
      text: "text-yellow-700 dark:text-yellow-100",
    },
    {
      label: "Total Leave",
      short: "TL",
      value: 4,
      bg: "bg-green-50 dark:bg-green-900",
      text: "text-green-700 dark:text-green-100",
    },
    {
      label: "Total Lates",
      short: "L",
      value: "--",
      bg: "bg-blue-100 dark:bg-blue-900",
      text: "text-blue-700 dark:text-blue-100",
    },
    {
      label: "Half Day",
      short: "H",
      value: "--",
      bg: "bg-pink-100 dark:bg-pink-900",
      text: "text-pink-700 dark:text-pink-100",
    },
    {
      label: "Not Even Half Day",
      short: "?",
      value: 2,
      bg: "bg-gray-100 dark:bg-gray-800",
      text: "text-gray-700 dark:text-gray-200",
    },
    {
      label: "Regularization",
      short: "R",
      value: "--",
      bg: "bg-cyan-100 dark:bg-cyan-900",
      text: "text-cyan-700 dark:text-cyan-100",
    },
    {
      label: "Not Logged Out",
      short: "NO",
      value: 4,
      bg: "bg-stone-100 dark:bg-stone-900",
      text: "text-stone-700 dark:text-stone-100",
    },
    {
      label: "Total Holiday",
      short: "TH",
      value: 5,
      bg: "bg-black",
      text: "text-white",
    },
    {
      label: "Overtime",
      short: "O",
      value: "--",
      bg: "bg-indigo-100 dark:bg-indigo-900",
      text: "text-indigo-700 dark:text-indigo-100",
    },
  ];

  const [selectedMonth, setSelectedMonth] = useState("2025-01");
  const [searchText, setSearchText] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredByMonth = allAttendanceData.filter((item) => {
    return item.date.startsWith(selectedMonth);
  });

  const fullyFilteredData = filteredByMonth.filter((item) => {
    const combinedString = `${item.date} ${item.day} ${item.status}`.toLowerCase();
    return combinedString.includes(searchText.toLowerCase());
  });

  const totalEntries = fullyFilteredData.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage);

  const safeCurrentPage =
    currentPage > totalPages ? totalPages : currentPage < 1 ? 1 : currentPage;

  const startIndex = (safeCurrentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedData = fullyFilteredData.slice(startIndex, endIndex);

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
        Attendance Of January 2025 ({empName} ({empCode}))
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
                <AnimatePresence>
                  {displayedData.map((item) => (
                    <motion.tr
                      key={item.sl}
                      className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{ duration: 0.3 }}
                      layout
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
                    </motion.tr>
                  ))}

                  {displayedData.length === 0 && (
                    <motion.tr
                      key="no-records"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <td
                        colSpan={7}
                        className="py-4 text-center text-gray-500 dark:text-gray-400"
                      >
                        No records found.
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
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

// Render a color-coded badge for status
function renderStatusBadge(status) {
  let bgColor = "bg-gray-100 dark:bg-gray-700";
  let textColor = "text-gray-600 dark:text-gray-200";

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
      // Keeping holiday black in both modes (as in screenshot)
      bgColor = "bg-black";
      textColor = "text-white";
      break;
    case "half day":
      bgColor = "bg-pink-100 dark:bg-pink-900";
      textColor = "text-pink-700 dark:text-pink-100";
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
