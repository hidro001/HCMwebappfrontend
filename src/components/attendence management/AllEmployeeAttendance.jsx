import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch,  FiDownload,  FiEye,  FiChevronRight,  FiChevronLeft, FiFilter, FiClock, 
 FiCalendar, FiGrid, FiMapPin, FiBriefcase, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useAttendanceStore from "../../store/useAttendanceStore";
import useFullAttendanceStore from "../../store/useFullAttendanceStore";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import AttendanceCards from "./Card/AttendanceCard";

const AttendanceCard = ({ employee, onViewClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700 mb-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 mr-3">
            {employee.name?.charAt(0) || "?"}
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">{employee.name}</h3>
            <p className="text-sm text-blue-600 dark:text-blue-400">{employee.empID}</p>
          </div>
        </div>
        <StatusBadge status={employee.status} />
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="text-sm">
          <div className="text-gray-500 dark:text-gray-400 flex items-center">
            <FiBriefcase className="mr-1" size={12} />
            Department
          </div>
          <div className="text-gray-800 dark:text-gray-200">{employee.department || 'N/A'}</div>
        </div>
        
        <div className="text-sm">
          <div className="text-gray-500 dark:text-gray-400 flex items-center">
            <FiClock className="mr-1 text-green-500" size={12} />
            Log In
          </div>
          <div className="text-gray-800 dark:text-gray-200">{employee.login || '--'}</div>
        </div>
        
        <div className="text-sm">
          <div className="text-gray-500 dark:text-gray-400 flex items-center">
            <FiClock className="mr-1 text-red-500" size={12} />
            Log Out
          </div>
          <div className="text-gray-800 dark:text-gray-200">{employee.logout || '--'}</div>
        </div>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onViewClick(employee.empID)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition-all flex items-center justify-center"
      >
        <FiEye className="mr-2" size={14} />
        View Details
      </motion.button>
    </motion.div>
  );
};

const StatusBadge = ({ status }) => {
  const getStatusColor = () => {
    switch (status?.toLowerCase()) {
      case "present":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "absent":
        return "bg-red-100 text-red-700 border-red-200";
      case "late":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "wfh":
      case "work from home":
        return "bg-indigo-100 text-indigo-700 border-indigo-200";
      case "half day":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = () => {
    switch (status?.toLowerCase()) {
      case "present":
        return <FiCheckCircle className="mr-1" size={12} />;
      case "absent":
        return <FiXCircle className="mr-1" size={12} />;
      case "late":
        return <FiClock className="mr-1" size={12} />;
      case "wfh":
      case "work from home":
        return <FiMapPin className="mr-1" size={12} />;
      default:
        return null;
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()} border flex items-center`}>
      {getStatusIcon()}
      {status || "Unknown"}
    </span>
  );
};

const SkeletonTableRows = ({ rows = 5 }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <motion.tr
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: i * 0.05 }}
          className="border-b last:border-0 border-gray-200 dark:border-gray-700"
        >
          {Array.from({ length: 8 }).map((__, cellIdx) => (
            <td key={cellIdx} className="py-4 px-6">
              <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            </td>
          ))}
        </motion.tr>
      ))}
    </>
  );
};

const SkeletonCards = ({ count = 5 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: i * 0.05 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700 mb-4"
        >
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse mr-3"></div>
            <div className="flex-1">
              <div className="w-2/3 h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse mb-2"></div>
              <div className="w-1/3 h-3 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx}>
                <div className="w-1/2 h-3 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse mb-2"></div>
                <div className="w-2/3 h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              </div>
            ))}
          </div>
          <div className="w-full h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        </motion.div>
      ))}
    </>
  );
};

export default function AllEmployeeAttendance() {
  const navigate = useNavigate();

  const {
    todayPunches,
    fetchTodaysPunchTimes,
    departments,
    fetchDepartments,
    todayAttendance,
    fetchTodaysAttendanceStatus,
    loading,
  } = useAttendanceStore();

  const { fetchAllData, getMonthlyAttendanceView } = useFullAttendanceStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("Department");
  const [showCount, setShowCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [exporting, setExporting] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchTodaysPunchTimes();
    fetchDepartments();
    fetchTodaysAttendanceStatus()
  }, [fetchTodaysPunchTimes, fetchDepartments, fetchTodaysAttendanceStatus]);

  const employeesData = todayPunches.map((punch, i) => ({
    id: i,
    empID: punch.employee_Id,
    name: punch.empName,
    department: punch.department,
    login: punch.login,
    logout: punch.logout,
    status: punch.status,
  }));

  const filteredData = employeesData.filter((emp) => {
    if (
      selectedDepartment !== "Department" &&
      emp.department !== selectedDepartment
    ) {
      return false;
    }
    const q = searchTerm.toLowerCase().trim();
    const name = (emp.name || "").toLowerCase();
    const id = (emp.empID || "").toLowerCase();
    return name.includes(q) || id.includes(q);
  });

  const totalEntries = filteredData.length;
  const totalPages = Math.max(Math.ceil(totalEntries / showCount), 1);
  const validPage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (validPage - 1) * showCount;
  const endIndex = startIndex + showCount;
  const currentPageData = filteredData.slice(startIndex, endIndex);
  const fromIndex = totalEntries === 0 ? 0 : startIndex + 1;
  const toIndex = Math.min(endIndex, totalEntries);
  
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= validPage - delta && i <= validPage + delta)
      ) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const handlePageChange = (pageNum) => setCurrentPage(pageNum);

  const handleExportAllAttendance = async () => {
    setExporting(true);
    const workbook = XLSX.utils.book_new();
    const now = new Date();
    const selectedMonth = now.getMonth() + 1;
    const selectedYear = now.getFullYear();

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
      const sheetName = `${emp.name}_${emp.empID}`.slice(0, 31); 
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

  const handleViewDetails = (empID) => {
    navigate(`/dashboard/attendance/${empID}`);
  };

  const today = new Date();
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString(undefined, dateOptions);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black min-h-screen p-4 md:p-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 md:mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Attendance Dashboard</h1>
        <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
          <FiCalendar className="mr-2" />
          <span>{formattedDate}</span>
        </div>
      </motion.div>

       <AttendanceCards attendanceData={todayAttendance} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 md:p-5 mb-6 border border-gray-100 dark:border-gray-700"
      >
        <div className="flex justify-between items-center">
          {/* Search */}
         <div className="flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 transition-all"
            >
              <FiFilter />
              Filters
            </motion.button>

            {/* Show count */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Show</label>
              <select
                value={showCount}
                onChange={(e) => {
                  setShowCount(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
        </div>
          <div className="flex flex-wrap gap-3">
            <div className="relative ">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
              <FiSearch />
            </span>
            <input
              type="text"
              placeholder="Search employee name or ID"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
           
            {/* Department Filter */}
            <div className="flex-grow items-center">
              <select
                value={selectedDepartment}
                onChange={(e) => {
                  setSelectedDepartment(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-3 text-sm bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>Department</option>
                {departments.map((dept) => (
                  <option key={dept._id}>{dept.department}</option>
                ))}
              </select>
            </div>
            <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExportAllAttendance}
            disabled={exporting}
            className="flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-2 md:px-3 py-2 md:py-2 rounded-md text-xs md:text-xs font-medium transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FiDownload />
            {exporting ? "Exporting..." : "Export"}
          </motion.button>
          </div>
        </div>

        {/* Expanded Filters - will add more filters here in the future */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Additional filters can be added here */}
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Status:</label>
                  <select className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>All Statuses</option>
                    <option>Present</option>
                    <option>Absent</option>
                    <option>Late</option>
                    <option>Work From Home</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-6"
      >
        <div className="hidden md:block bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-max">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900/50 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <th className="py-3 px-6 border-b border-gray-200 dark:border-gray-700">S.L</th>
                  <th className="py-3 px-6 border-b border-gray-200 dark:border-gray-700">Emp ID</th>
                  <th className="py-3 px-6 border-b border-gray-200 dark:border-gray-700">Name</th>
                  <th className="py-3 px-6 border-b border-gray-200 dark:border-gray-700">Department</th>
                  <th className="py-3 px-6 border-b border-gray-200 dark:border-gray-700">Log In</th>
                  <th className="py-3 px-6 border-b border-gray-200 dark:border-gray-700">Log Out</th>
                  <th className="py-3 px-6 border-b border-gray-200 dark:border-gray-700">Status</th>
                  <th className="py-3 px-6 border-b border-gray-200 dark:border-gray-700">Action</th>
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
                      <motion.tr
                        key={emp.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className="hover:bg-blue-50 dark:hover:bg-gray-700/50 text-sm border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                      >
                        <td className="py-4 px-6 font-medium text-gray-900 dark:text-gray-100">
                          {startIndex + idx + 1}
                        </td>
                        <td 
                          className="py-4 px-6 font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer"
                          onClick={() => handleViewDetails(emp.empID)}
                        >
                          {emp.empID}
                        </td>
                        <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 mr-3">
                              {emp.name?.charAt(0) || "?"}
                            </div>
                            {emp.name}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-500 dark:text-gray-400">{emp.department}</td>
                        <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                          {emp.login ? (
                            <div className="flex items-center">
                              <FiClock className="mr-2 text-green-500" />
                              {emp.login}
                            </div>
                          ) : "--"}
                        </td>
                        <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                          {emp.logout ? (
                            <div className="flex items-center">
                              <FiClock className="mr-2 text-red-500" />
                              {emp.logout}
                            </div>
                          ) : "--"}
                        </td>
                        <td className="py-4 px-6">
                          <StatusBadge status={emp.status} />
                        </td>
                        <td className="py-4 px-6">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-2 rounded-lg transition-all"
                            onClick={() => handleViewDetails(emp.empID)}
                          >
                            <FiEye className="text-xs" />
                            View
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="text-center py-12 text-gray-500 dark:text-gray-400">
                        <FiGrid className="mx-auto text-4xl mb-3 text-gray-300 dark:text-gray-600" />
                        <p>No matching records found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              )}
            </table>
          </div>
        </div>

        {/* Card view for smaller screens */}
        <div className="md:hidden">
          {loading ? (
            <SkeletonCards count={showCount} />
          ) : (
            currentPageData.length > 0 ? (
              currentPageData.map((emp) => (
                <AttendanceCard 
                  key={emp.id} 
                  employee={emp} 
                  onViewClick={handleViewDetails} 
                />
              ))
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-200 dark:border-gray-700 text-center">
                <FiGrid className="mx-auto text-4xl mb-3 text-gray-300 dark:text-gray-600" />
                <p className="text-gray-500 dark:text-gray-400">No matching records found</p>
              </div>
            )
          )}
        </div>
        
        {/* Pagination control for both views */}
        {!loading && totalEntries > 0 && (
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="px-4 py-3 md:px-6 md:py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
                Showing {fromIndex} to {toIndex} of {totalEntries} entries
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(validPage - 1)}
                  disabled={validPage === 1}
                  className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiChevronLeft />
                </motion.button>
                
                {getPageNumbers().map((num, idx) => (
                  <React.Fragment key={idx}>
                    {num === '...' ? (
                      <span className="text-gray-600 dark:text-gray-400">...</span>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handlePageChange(num)}
                        className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg border ${
                          num === validPage
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        {num}
                      </motion.button>
                    )}
                  </React.Fragment>
                ))}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(validPage + 1)}
                  disabled={validPage === totalPages}
                  className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiChevronRight />
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );

}