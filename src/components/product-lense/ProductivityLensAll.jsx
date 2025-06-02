import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaFileExcel,
  FaChartBar,
  FaUser,
  FaFilter,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAttendanceStore from "../../store/useAttendanceStore";
import useFullAttendanceStore from "../../store/useFullAttendanceStore";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Loading skeleton rows
function SkeletonTableRows({ rows = 5 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr
          key={i}
          className="border-b last:border-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          {Array.from({ length: 8 }).map((__, cellIdx) => (
            <td key={cellIdx} className="py-4 px-4">
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export default function ProductivityLensAll() {
  const navigate = useNavigate();

  // Zustand store for punch times & departments
  const {
    todayPunches,
    fetchTodaysPunchTimes,
    departments,
    fetchDepartments,
    loading,
  } = useAttendanceStore();

  // Zustand store for full attendance per employee
  const { fetchAllData, getMonthlyAttendanceView } = useFullAttendanceStore();

  // UI state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");
  const [showCount, setShowCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [exporting, setExporting] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState(false);

  // Fetch initial data
  useEffect(() => {
    fetchTodaysPunchTimes();
    fetchDepartments();
  }, [fetchTodaysPunchTimes, fetchDepartments]);

  // Build a flat array of employees from today's punches
  const employeesData = todayPunches.map((punch, i) => ({
    id: i,
    empID: punch.employee_Id,
    name: punch.empName,
    department: punch.department,
    login: punch.login,
    logout: punch.logout,
    status: punch.status,
  }));

  // Filter by department & search term
  const filteredData = employeesData.filter((emp) => {
    if (
      selectedDepartment !== "All Departments" &&
      emp.department !== selectedDepartment
    ) {
      return false;
    }
    const q = searchTerm.toLowerCase().trim();
    const name = (emp.name || "").toLowerCase();
    const id = (emp.empID || "").toLowerCase();
    return name.includes(q) || id.includes(q);
  });

  // Pagination calculations
  const totalEntries = filteredData.length;
  const totalPages = Math.max(Math.ceil(totalEntries / showCount), 1);
  const validPage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (validPage - 1) * showCount;
  const endIndex = startIndex + showCount;
  const currentPageData = filteredData.slice(startIndex, endIndex);
  const fromIndex = totalEntries === 0 ? 0 : startIndex + 1;
  const toIndex = Math.min(endIndex, totalEntries);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Pagination handler
  const handlePageChange = (pageNum) => setCurrentPage(pageNum);

  // Export all attendance for current month, one sheet per employee
  const handleExportAllAttendance = async () => {
    setExporting(true);
    const workbook = XLSX.utils.book_new();
    const now = new Date();
    const selectedMonth = now.getMonth() + 1;
    const selectedYear = now.getFullYear();

    // Loop through every *filtered* employee (not just current page)
    for (const emp of filteredData) {
      await fetchAllData(emp.empID);
      const attendanceRows = getMonthlyAttendanceView(
        selectedYear,
        selectedMonth
      );

      const sheetData = attendanceRows.map((row) => ({
        "S.L": row.sl,
        Date: row.date,
        Day: row.day,
        "Log In Time": row.logInTime,
        "Log Out Time": row.logOutTime,
        "Total Break": row.totalBreak,
        Status: row.status,
      }));

      const ws = XLSX.utils.json_to_sheet(sheetData);
      const sheetName = `${emp.name}_${emp.empID}`.slice(0, 31); // Excel sheet name max 31 chars
      XLSX.utils.book_append_sheet(workbook, ws, sheetName);
    }

    const wbout = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([wbout], {
      type: "application/octet-stream",
    });
    saveAs(
      blob,
      `All_Employees_Attendance_${selectedYear}_${selectedMonth}.xlsx`
    );
    setExporting(false);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Absent":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "Late":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "Half Day":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 dark:text-gray-100 p-4 sm:p-6 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white flex items-center">
              <FaChartBar className="mr-3 text-indigo-500" />
              Employee Productivity Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Monitor and analyze employee attendance and productivity
            </p>
          </div>
          <button
            onClick={handleExportAllAttendance}
            disabled={exporting || filteredData.length === 0}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-90 text-white px-4 py-3 rounded-xl text-sm font-medium transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaFileExcel className="text-lg" />
            {exporting ? "Exporting..." : "Export Data"}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-100 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Total Employees
            </div>
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">
              {employeesData.length}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-100 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Present Today
            </div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-300">
              {employeesData.filter((e) => e.status === "Present").length}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-100 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Departments
            </div>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-300">
              {departments.length}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-100 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Filtered Results
            </div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-300">
              {filteredData.length}
            </div>
          </div>
        </div>
      </div>

      {/* Filters Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6 border border-gray-100 dark:border-gray-700">
        <div
          className="flex items-center justify-between cursor-pointer mb-2"
          onClick={() => setExpandedFilters(!expandedFilters)}
        >
          <div className="flex items-center">
            <FaFilter className="mr-2 text-indigo-500" />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Filters
            </h2>
          </div>
          <div className="text-gray-500">
            {expandedFilters ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>

        {expandedFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <FaSearch />
              </span>
              <input
                type="text"
                placeholder="Search (Name/ID)"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg pl-10 pr-3 py-2.5 text-sm bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Department Filter */}
            <div>
              <select
                value={selectedDepartment}
                onChange={(e) => {
                  setSelectedDepartment(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>All Departments</option>
                {departments.map((dept) => (
                  <option key={dept._id}>{dept.department}</option>
                ))}
              </select>
            </div>

            {/* Show count */}
            <div>
              <select
                value={showCount}
                onChange={(e) => {
                  setShowCount(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={10}>Show 10 entries</option>
                <option value={20}>Show 20 entries</option>
                <option value={50}>Show 50 entries</option>
              </select>
            </div>

            {/* Reset Filters */}
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedDepartment("All Departments");
                setCurrentPage(1);
              }}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Attendance Table */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 text-white">
              <tr className="text-sm font-medium">
                <th className="py-4 px-6">S.L</th>
                <th className="py-4 px-6">Employee</th>
                <th className="py-4 px-6">Department</th>
                <th className="py-4 px-6">Log In</th>
                <th className="py-4 px-6">Log Out</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <SkeletonTableRows rows={showCount} />
              ) : currentPageData.length > 0 ? (
                currentPageData.map((emp, idx) => (
                  <tr
                    key={emp.id}
                    className="border-b last:border-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-sm"
                  >
                    <td className="py-4 px-6 font-medium">
                      {startIndex + idx + 1}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="bg-indigo-100 dark:bg-indigo-900/30 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                          <FaUser className="text-indigo-500" />
                        </div>
                        <div>
                          <div
                            className="font-medium text-indigo-600 dark:text-indigo-300 hover:underline cursor-pointer"
                            onClick={() =>
                              navigate(`/dashboard/attendance/${emp.empID}`)
                            }
                          >
                            {emp.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            ID: {emp.empID}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">{emp.department}</td>
                    <td className="py-4 px-6">{emp.login || "--:--"}</td>
                    <td className="py-4 px-6">{emp.logout || "--:--"}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          emp.status
                        )}`}
                      >
                        {emp.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-opacity"
                          onClick={() =>
                            navigate(`/dashboard/statistics/${emp.empID}`)
                          }
                        >
                          View Stats
                        </button>
                        <button
                          className="border border-gray-300 dark:border-gray-600 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                          onClick={() =>
                            navigate(`/dashboard/attendance/${emp.empID}`)
                          }
                        >
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    <div className="flex flex-col items-center justify-center">
                      <div className="bg-gray-200 dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                        <FaSearch className="text-gray-500 text-xl" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                        No matching records found
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 max-w-md">
                        Try adjusting your search or filter criteria to find
                        what you're looking for.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && filteredData.length > 0 && (
          <div className="flex flex-col md:flex-row items-center justify-between p-6 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
            <div className="mb-4 md:mb-0">
              Showing <span className="font-medium">{fromIndex}</span> to{" "}
              <span className="font-medium">{toIndex}</span> of{" "}
              <span className="font-medium">{totalEntries}</span> entries
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(validPage - 1)}
                disabled={validPage === 1}
                className={`px-3 py-1.5 rounded-lg border ${
                  validPage === 1
                    ? "text-gray-400 dark:text-gray-500 cursor-not-allowed"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Previous
              </button>

              {pageNumbers.map((num) => (
                <button
                  key={num}
                  onClick={() => handlePageChange(num)}
                  className={`px-3 py-1.5 rounded-lg border min-w-[40px] ${
                    num === validPage
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-transparent"
                      : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(validPage + 1)}
                disabled={validPage === totalPages}
                className={`px-3 py-1.5 rounded-lg border ${
                  validPage === totalPages
                    ? "text-gray-400 dark:text-gray-500 cursor-not-allowed"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Summary Footer */}
      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          Showing productivity data for{" "}
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
