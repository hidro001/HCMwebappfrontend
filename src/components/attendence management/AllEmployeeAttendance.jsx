import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaFileExcel } from "react-icons/fa";
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
          className="border-b last:border-0 border-gray-200 dark:border-gray-700"
        >
          {Array.from({ length: 8 }).map((__, cellIdx) => (
            <td key={cellIdx} className="py-3 px-4">
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export default function AllEmployeeAttendance() {
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
  const [selectedDepartment, setSelectedDepartment] = useState("Department");
  const [showCount, setShowCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [exporting, setExporting] = useState(false);

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
      selectedDepartment !== "Department" &&
      emp.department !== selectedDepartment
    ) {
      return false;
    }
    const q = searchTerm.toLowerCase().trim();
  // make name/ID safe strings before lowercasing
  const name = (emp.name || "").toLowerCase();
  const id   = (emp.empID  || "").toLowerCase();
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

  return (
    <div className="bg-gray-50 dark:bg-gray-900 dark:text-gray-100 p-6 min-h-screen">
      {/* Filters + Export */}
      <div className="bg-white dark:bg-gray-800 rounded-md shadow px-4 py-3 mb-6 transition-colors">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Show count */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Show</label>
            <select
              value={showCount}
              onChange={(e) => {
                setShowCount(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-sm bg-white dark:bg-gray-900"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          {/* Search */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">
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
              className="border border-gray-300 dark:border-gray-700 rounded pl-8 pr-3 py-1 text-sm bg-white dark:bg-gray-900 w-48"
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
              className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-sm bg-white dark:bg-gray-900"
            >
              <option>Department</option>
              {departments.map((dept) => (
                <option key={dept._id}>{dept.department}</option>
              ))}
            </select>
          </div>

          {/* Export Button */}
          <button
            onClick={handleExportAllAttendance}
            disabled={exporting}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm transition-colors disabled:opacity-60"
          >
            <FaFileExcel />
            {exporting ? "Exporting..." : "Export All Attendance"}
          </button>
        </div>
      </div>

      {/* Attendance Table */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-md shadow overflow-x-auto transition-colors"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <table className="w-full text-left min-w-max">
          <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
            <tr className="text-sm font-medium text-gray-600 dark:text-gray-200">
              <th className="py-3 px-4">S.L</th>
              <th className="py-3 px-4">Emp ID</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4">Log In</th>
              <th className="py-3 px-4">Log Out</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>

          {loading ? (
            <tbody>
              <SkeletonTableRows rows={showCount} />
            </tbody>
          ) : (
            <tbody>
              {currentPageData.length > 0 ? (
                currentPageData.map((emp, idx) => (
                  <tr
                    key={emp.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm"
                  >
                    <td className="py-3 px-4">{startIndex + idx + 1}</td>
                    <td
                      className="py-3 px-4 text-blue-500 hover:underline cursor-pointer"
                      onClick={() =>
                        navigate(`/dashboard/attendance/${emp.empID}`)
                      }
                    >
                      {emp.empID}
                    </td>
                    <td className="py-3 px-4">{emp.name}</td>
                    <td className="py-3 px-4">{emp.department}</td>
                    <td className="py-3 px-4">{emp.login || "--"}</td>
                    <td className="py-3 px-4">{emp.logout || "--"}</td>
                    <td className="py-3 px-4">{emp.status}</td>
                    <td className="py-3 px-4 space-x-2">
                    <button
                      className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded transition-colors"
                      onClick={() => navigate(`/dashboard/attendance/${emp.empID}`)}
                    >
                      View Attendance
                    </button>
                      {/* <button
                        className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded"
                        onClick={() =>
                          navigate(`/dashboard/statistics/${emp.empID}`)
                        }
                      >
                        View Stats
                      </button> */}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center py-4 text-sm text-gray-500"
                  >
                    No matching records found
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>

        {/* Pagination */}
        {!loading && (
          <div className="flex flex-col md:flex-row items-center justify-between p-4 text-sm text-gray-600 dark:text-gray-300">
            <div>
              {totalEntries > 0
                ? `Showing ${fromIndex} to ${toIndex} of ${totalEntries} entries`
                : `Showing 0 to 0 of 0 entries`}
            </div>
            <div className="flex items-center space-x-1 mt-2 md:mt-0">
              {pageNumbers.map((num) => (
                <button
                  key={num}
                  onClick={() => handlePageChange(num)}
                  className={`px-3 py-1 rounded border ${
                    num === validPage
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
