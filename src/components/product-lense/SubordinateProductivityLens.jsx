import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaFilePdf,
  FaFileCsv,
  FaPrint,
  FaSearch,
  FaUserFriends,
  FaUserCheck,
  FaUserClock,
  FaUserTimes,
  FaFilter,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";

import { MdOutlineFileDownload, MdOutlineDashboard } from "react-icons/md";
import { GiSandsOfTime } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/store";
import useAttendanceStore from "../../store/useAttendanceStore";

// Loading skeleton
function SkeletonTableRows({ rows = 5 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr
          key={i}
          className="border-b last:border-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          {Array.from({ length: 6 }).map((__, cellIdx) => (
            <td key={cellIdx} className="py-4 px-6">
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

const tableContainerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const tableRowVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0 },
};

function formatMonthYear(monthValue) {
  if (!monthValue) return "";
  const [year, month] = monthValue.split("-");
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
  const monthIndex = parseInt(month, 10) - 1;
  return `${monthNames[monthIndex]} ${year}`;
}

export default function SubordinateProductivityLens() {
  const navigate = useNavigate();
  const { _id: userId } = useAuthStore();

  const {
    subordinates,
    fetchSubordinates,
    departments,
    fetchDepartments,
    subordinateStats,
    fetchSubordinateStats,
    loading,
    error,
  } = useAttendanceStore();

  const currentDate = new Date();
  const defaultMonth = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}`;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
  const [showCount, setShowCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedFilters, setExpandedFilters] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchSubordinates(userId);
    }
    fetchDepartments();
    fetchSubordinateStats();
  }, [fetchSubordinates, fetchDepartments, fetchSubordinateStats]);

  const employeesData = subordinates
    ? subordinates.map((sub, i) => ({
        id: sub._id ?? i,
        empID: sub.employee_Id,
        name: `${sub.first_Name} ${sub.last_Name}`,
        department: sub.department,
        email: sub.working_Email_Id,
        attendanceDate: sub.attendanceDate || "",
        userAvatar: sub.user_Avatar,
      }))
    : [];

  const filteredEmployees = employeesData.filter((emp) => {
    if (
      selectedDepartment !== "All Departments" &&
      emp.department !== selectedDepartment
    ) {
      return false;
    }
    if (selectedMonth && emp.attendanceDate) {
      const [filterYear, filterMonth] = selectedMonth.split("-");
      const empYear = emp.attendanceDate.slice(0, 4);
      const empMonth = emp.attendanceDate.slice(5, 7);
      if (empYear !== filterYear || empMonth !== filterMonth) {
        return false;
      }
    }
    const lowerSearch = searchTerm.toLowerCase();
    return (
      emp.name.toLowerCase().includes(lowerSearch) ||
      emp.email.toLowerCase().includes(lowerSearch) ||
      String(emp.empID).toLowerCase().includes(lowerSearch)
    );
  });

  const totalEntries = filteredEmployees.length;
  const totalPages = Math.ceil(totalEntries / showCount) || 1;
  const validPage = Math.min(currentPage, totalPages);
  const startIndex = (validPage - 1) * showCount;
  const endIndex = startIndex + showCount;
  const currentPageData = filteredEmployees.slice(startIndex, endIndex);
  const fromIndex = startIndex + 1;
  const toIndex = startIndex + currentPageData.length;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    setCurrentPage(1);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setCurrentPage(1);
  };

  const handleShowCountChange = (e) => {
    setShowCount(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const headingText = `Attendance view for ${formatMonthYear(selectedMonth)}`;

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
              <MdOutlineDashboard className="mr-3 text-indigo-500" />
              Subordinate Productivity Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Monitor and analyze your team's attendance and productivity
            </p>
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-lg">
              <FaFilePdf className="text-lg" />
              Export PDF
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 w-12 h-12 rounded-lg flex items-center justify-center mr-3">
                <FaUserFriends className="text-indigo-500 text-xl" />
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Total Subordinates
                </div>
                <div className="text-xl font-bold text-indigo-600 dark:text-indigo-300">
                  {subordinateStats?.totalSubordinates ?? 0}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-lg flex items-center justify-center mr-3">
                <FaUserCheck className="text-green-500 text-xl" />
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Present Today
                </div>
                <div className="text-xl font-bold text-green-600 dark:text-green-300">
                  {subordinateStats?.presentCount ?? 0}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <div className="bg-amber-100 dark:bg-amber-900/30 w-12 h-12 rounded-lg flex items-center justify-center mr-3">
                <GiSandsOfTime className="text-amber-500 text-xl" />
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Late Arrivals
                </div>
                <div className="text-xl font-bold text-amber-600 dark:text-amber-300">
                  {subordinateStats?.lateCount ?? 0}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <div className="bg-rose-100 dark:bg-rose-900/30 w-12 h-12 rounded-lg flex items-center justify-center mr-3">
                <FaUserTimes className="text-rose-500 text-xl" />
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  On Leave
                </div>
                <div className="text-xl font-bold text-rose-600 dark:text-rose-300">
                  {subordinateStats?.onLeaveCount ?? 0}
                </div>
              </div>
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
                placeholder="Search (Name/ID/Email)"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg pl-10 pr-3 py-2.5 text-sm bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Department Filter */}
            <div>
              <select
                value={selectedDepartment}
                onChange={handleDepartmentChange}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>All Departments</option>
                {departments.map((dept) => (
                  <option key={dept._id}>{dept.department}</option>
                ))}
              </select>
            </div>

            {/* Month Filter */}
            <div>
              <input
                type="month"
                value={selectedMonth}
                onChange={handleMonthChange}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Show count */}
            <div>
              <select
                value={showCount}
                onChange={handleShowCountChange}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={10}>Show 10 entries</option>
                <option value={20}>Show 20 entries</option>
                <option value={50}>Show 50 entries</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Table Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2 md:mb-0">
          {headingText}
        </h2>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {fromIndex} to {toIndex} of {totalEntries} entries
        </div>
      </div>

      {/* Attendance Table */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors"
        variants={tableContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 text-white">
              <tr className="text-sm font-medium">
                <th className="py-4 px-6">S.L</th>
                <th className="py-4 px-6">Employee</th>
                <th className="py-4 px-6">Department</th>
                <th className="py-4 px-6">Email</th>
                <th className="py-4 px-6">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <SkeletonTableRows rows={showCount} />
              ) : currentPageData.length > 0 ? (
                currentPageData.map((emp, idx) => (
                  <motion.tr
                    key={emp.id}
                    variants={tableRowVariants}
                    className="border-b last:border-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-sm"
                  >
                    <td className="py-4 px-6 font-medium">
                      {startIndex + idx + 1}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="bg-indigo-100 dark:bg-indigo-900/30 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                          {emp.userAvatar ? (
                            <img
                              src={emp.userAvatar}
                              alt="Profile"
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          ) : (
                            <FaUserFriends className="text-indigo-500" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 dark:text-gray-200">
                            {emp.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            ID: {emp.empID}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded-full text-xs">
                        {emp.department}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-gray-600 dark:text-gray-300 truncate max-w-[200px]">
                        {emp.email}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-opacity"
                        onClick={() =>
                          navigate(`/dashboard/statistics/${emp.empID}`)
                        }
                      >
                        View Statistics
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-12">
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
        {!loading && filteredEmployees.length > 0 && (
          <div className="flex flex-col md:flex-row items-center justify-between p-6 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
            <div className="mb-4 md:mb-0">
              Page <span className="font-medium">{validPage}</span> of{" "}
              <span className="font-medium">{totalPages}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(validPage - 1)}
                disabled={validPage === 1}
                className={`px-4 py-2 rounded-lg border ${
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
                className={`px-4 py-2 rounded-lg border ${
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
        <p>Showing productivity data for {formatMonthYear(selectedMonth)}</p>
      </div>
    </div>
  );
}
