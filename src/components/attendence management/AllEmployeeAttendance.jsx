import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaFilePdf, FaFileCsv, FaPrint, FaSearch } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// Zustand store
import useAttendanceStore from "../../store/useAttendanceStore";

// Loading skeleton
function SkeletonTableRows({ rows = 5 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr
          key={i}
          className="border-b last:border-0 border-gray-200 dark:border-gray-700"
        >
          <td className="py-3 px-4">
            <div className="w-6 h-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </td>
          <td className="py-3 px-4">
            <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </td>
          <td className="py-3 px-4">
            <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </td>
          <td className="py-3 px-4">
            <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </td>
          <td className="py-3 px-4">
            <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </td>
          <td className="py-3 px-4">
            <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </td>
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

// Helper to format "YYYY-MM" -> "Month Year" (e.g., "2025-02" -> "February 2025")
function formatMonthYear(monthValue) {
  if (!monthValue) return "";
  const [year, month] = monthValue.split("-");
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const monthIndex = parseInt(month, 10) - 1;
  return `${monthNames[monthIndex]} ${year}`;
}

export default function AllEmployeeAttendance() {
  const navigate = useNavigate();

  const {
    subordinates,
    fetchAllUser,
    departments,
    fetchDepartments,
    stats,
    fetchStats,
    loading,
    error,
  } = useAttendanceStore();

  // Get userId from localStorage (adjust key if needed)
  const userId = localStorage.getItem("mongo_id");

  // Set default month to the current month/year
  const currentDate = new Date();
  const defaultMonth = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}`;

  // Local state for filters/search/pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("Department");
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth); // default to current month
  const [showCount, setShowCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchAllUser();
    fetchDepartments();
    fetchStats();
  }, [fetchAllUser, fetchDepartments, fetchStats]);

  // Transform subordinates data into shape for the table
  const employeesData = subordinates
    ? subordinates.map((sub, i) => ({
        id: sub._id ?? i,
        empID: sub.employee_Id,
        name: `${sub.first_Name} ${sub.last_Name}`,
        department: sub.department,
        email: sub.working_Email_Id,
        // If your API provides an attendance date, use it here
        attendanceDate: sub.attendanceDate || "",
        userAvatar: sub.user_Avatar,
      }))
    : [];

  // Filter + search
  const filteredEmployees = employeesData.filter((emp) => {
    // Department filter
    if (
      selectedDepartment !== "Department" &&
      emp.department !== selectedDepartment
    ) {
      return false;
    }
    // Month filter
    if (selectedMonth && emp.attendanceDate) {
      const [filterYear, filterMonth] = selectedMonth.split("-");
      const empYear = emp.attendanceDate.slice(0, 4);
      const empMonth = emp.attendanceDate.slice(5, 7);
      if (empYear !== filterYear || empMonth !== filterMonth) {
        return false;
      }
    }
    // Search filter
    const lowerSearch = searchTerm.toLowerCase();
    if (
      !emp.name.toLowerCase().includes(lowerSearch) &&
      !emp.email.toLowerCase().includes(lowerSearch) &&
      !String(emp.empID).toLowerCase().includes(lowerSearch)
    ) {
      return false;
    }
    return true;
  });

  // Pagination
  const totalEntries = filteredEmployees.length;
  const totalPages = Math.ceil(totalEntries / showCount) || 1;
  const validPage = Math.min(currentPage, totalPages);
  const startIndex = (validPage - 1) * showCount;
  const endIndex = startIndex + showCount;
  const currentPageData = filteredEmployees.slice(startIndex, endIndex);

  const fromIndex = startIndex + 1;
  const toIndex = startIndex + currentPageData.length;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Handlers
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

  // Generate the heading based on the selectedMonth
  const headingText = `Attendance view for ${formatMonthYear(selectedMonth)}`;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 dark:text-gray-100 p-6">
    

      {/* Title (Dynamically shows the selected month/year) */}
      <h1 className="text-xl md:text-2xl font-bold mb-4">
        {headingText}
      </h1>

      {/* Filters + Export Icons */}
      <div className="bg-white dark:bg-gray-800 rounded-md shadow px-4 py-3 mb-6 transition-colors">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left side: Show X, Search, Month, Dept */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Show X */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Show</label>
              <select
                value={showCount}
                onChange={handleShowCountChange}
                className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-sm focus:outline-none bg-white dark:bg-gray-900"
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
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                className="border border-gray-300 dark:border-gray-700 rounded pl-8 pr-3 py-1 text-sm focus:outline-none bg-white dark:bg-gray-900 w-36 sm:w-48"
              />
            </div>

            {/* Month (defaults to current month) */}
            <div>
              <input
                type="month"
                value={selectedMonth}
                onChange={handleMonthChange}
                className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-sm focus:outline-none bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-100"
              />
            </div>

            {/* Department Dropdown */}
            <div>
              <select
                value={selectedDepartment}
                onChange={handleDepartmentChange}
                className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-sm focus:outline-none bg-white dark:bg-gray-900"
              >
                <option>Department</option>
                {departments && departments.length > 0 ? (
                  departments.map((dept) => (
                    <option key={dept._id} value={dept.department}>
                      {dept.department}
                    </option>
                  ))
                ) : (
                  <option disabled>No Departments Found</option>
                )}
              </select>
            </div>
          </div>

          {/* Right side: Export Icons */}
          
        </div>
      </div>

      {/* Table */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-md shadow overflow-x-auto transition-colors"
        variants={tableContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <table className="w-full text-left min-w-max">
          <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
            <tr className="text-sm font-medium text-gray-600 dark:text-gray-200">
              <th className="py-3 px-4">S.L</th>
              <th className="py-3 px-4">Emp ID</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4">Email Account</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>

          {/* Use skeleton rows if loading, otherwise real data */}
          {loading ? (
            <tbody>
              <SkeletonTableRows rows={10} />
            </tbody>
          ) : (
            <tbody>
              {currentPageData.map((emp, index) => {
                const serialNumber = startIndex + index + 1;
                return (
                  <motion.tr
                    key={emp.id}
                    variants={tableRowVariants}
                    className="border-b last:border-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-sm"
                  >
                    <td className="py-3 px-4">
                      {String(serialNumber).padStart(2, "0")}
                    </td>
                    <td className="py-3 px-4 text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                      {emp.empID}
                    </td>
                    {/* Name + Profile Image/Fallback Emoji */}
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        {emp.userAvatar ? (
                          <img
                            src={emp.userAvatar}
                            alt="Profile"
                            className="w-8 h-8 rounded-full mr-2 object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full mr-2 flex items-center justify-center bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                            👤
                          </div>
                        )}
                        <span>{emp.name}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4">{emp.department}</td>
                    <td className="py-3 px-4">{emp.email}</td>
                    <td className="py-3 px-4">
                      <button
                        className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded transition-colors"
                        onClick={() =>
                          navigate(`/dashboard/attendance/${emp.empID}`)
                        }
                      >
                        View Attendance
                      </button>
                    </td>
                  </motion.tr>
                );
              })}

              {currentPageData.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-sm text-gray-500">
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
                  className={`px-3 py-1 rounded border transition-colors ${
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
