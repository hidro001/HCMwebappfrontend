import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/store";
import useAttendanceStore from "../../store/useAttendanceStore";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { FiSearch, FiCalendar, FiCheckCircle, FiChevronDown, FiChevronLeft, 
  FiChevronRight, FiSliders } from "react-icons/fi";
import { BiBuildings } from "react-icons/bi";
import { HiOutlineChartBar } from "react-icons/hi";
import { TbMoodEmpty } from "react-icons/tb";
import AttendanceCards from "./Card/AttendanceCard";


function formatMonthYear(monthValue) {
  if (!monthValue) return "";
  const [year, month] = monthValue.split("-");
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthIndex = parseInt(month, 10) - 1;
  return `${monthNames[monthIndex]} ${year}`;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const tableContainerVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.05,
    }
  },
};

const tableRowVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export default function SubordinatesAttendance() {

  const navigate = useNavigate();

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

  


  // User ID from Auth Store
  const { _id: userId } = useAuthStore();
  
  // Initialize state variables
  const currentDate = new Date();
  const defaultMonth = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}`;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("Department");
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
  const [showCount, setShowCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid"); 
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Fetch data on component mount
  useEffect(() => {
    if (userId) {
      fetchSubordinates(userId);
    }
    fetchDepartments();
    fetchSubordinateStats();
  }, [fetchSubordinates, fetchDepartments, fetchSubordinateStats, userId]);

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
    if (selectedDepartment !== "Department" && emp.department !== selectedDepartment) {
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
    if (
      !emp.name.toLowerCase().includes(lowerSearch) &&
      !emp.email.toLowerCase().includes(lowerSearch) &&
      !String(emp.empID).toLowerCase().includes(lowerSearch)
    ) {
      return false;
    }
    
    return true;
  });


  const sortedEmployees = useMemo(() => {
  if (!sortConfig.key) return filteredEmployees;

  const sorted = [...filteredEmployees].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
}, [filteredEmployees, sortConfig]);


  // Pagination calculations
  const totalEntries = sortedEmployees.length;
  const totalPages = Math.ceil(totalEntries / showCount) || 1;
  const validPage = Math.min(currentPage, totalPages);
  const startIndex = (validPage - 1) * showCount;
  const endIndex = startIndex + showCount;
  const currentPageData = sortedEmployees.slice(startIndex, endIndex);

  const fromIndex = startIndex + 1;
  const toIndex = startIndex + currentPageData.length;

  // Event handlers
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

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "table" : "grid");
  };

  const toggleFilterMenu = () => {
    setFilterMenuOpen(!filterMenuOpen);
  };

  // Navigation controls for pagination
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Dynamic title
  const pageTitle = `Team Attendance - ${formatMonthYear(selectedMonth)}`;

  // Generate pagination controls
  const generatePaginationControls = () => {
    const maxVisiblePages = 5;
    let pages = [];
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      // Show limited pages with ellipsis
      if (validPage <= 3) {
        pages = [1, 2, 3, 4, '...', totalPages];
      } else if (validPage >= totalPages - 2) {
        pages = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, '...', validPage - 1, validPage, validPage + 1, '...', totalPages];
      }
    }   
    return pages;
  };

  useEffect(() => {
  setSortConfig({ key: 'empID', direction: 'desc' }); 
}, []);

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-200 p-6">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
          {pageTitle}
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Monitor your team's attendance and performance at a glance
        </p>
      </motion.div>

       <AttendanceCards attendanceData={subordinateStats} data='team'/>
      

      {/* Filters Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-6 lg:mb-0"
      >
        <div className="bg-white dark:bg-slate-800 rounded-xl lg:rounded-t-lg lg:rounded-b-none shadow-md p-5">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between "> 
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {/* Department Filter */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <BiBuildings size={18} />
                </div>
                <select
                   value={selectedDepartment}
                   onChange={handleDepartmentChange}
                   className="pl-10 pr-4 py-2.5 w-full rounded-md border-0 ring-1 ring-slate-200 dark:ring-slate-700 bg-[#F3F4F6D6] dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
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
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                  <FiChevronDown size={18} />
                </div>
              </div>

              {/* Month Filter */}
               <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                   <FiCalendar size={18} />
                 </div>
                <input
                  type="month"
                   value={selectedMonth}
                   onChange={handleMonthChange}
                   className="pl-10 pr-4 py-2.5 w-full rounded-md border-0 ring-1 ring-slate-200 dark:ring-slate-700 bg-[#F3F4F6D6] dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                 />
              </div>

               {/* Show Count */}
               <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                   <FiSliders size={18} />
                 </div>
                 <select
                   value={showCount}
                   onChange={handleShowCountChange}
                   className="pl-10 pr-4 py-2.5 w-full rounded-md border-0 ring-1 ring-slate-200 dark:ring-slate-700 bg-[#F3F4F6D6] dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
                 >
                   <option value={10}>Show 10 per page</option>
                   <option value={20}>Show 20 per page</option>
                   <option value={50}>Show 50 per page</option>
                 </select>
                 <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                  <FiChevronDown size={18} />
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              
               {/* Search Bar */}
              <div className="relative w-full ">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <FiSearch size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search Employee"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="pl-10 pr-4 py-3 w-full rounded-lg border-0 ring-1 ring-slate-200 dark:ring-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
            </div>
          </div>

        </div>
      </motion.div>

      {/* Content Area */}
      {loading ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-8">
          <div className="flex items-center justify-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
            />
          </div>
        </div>
      ) :  (
        // Grid View
        <>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:hidden  gap-5"
        >
          {currentPageData.length > 0 ? (
            currentPageData.map((emp, index) => (
              <motion.div
                key={emp.id}
                variants={cardVariants}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="px-6 py-5">
                  <div className="flex flex-col items-center text-center mb-4">
                    {emp.userAvatar ? (
                      <img
                        src={emp.userAvatar}
                        alt="Profile"
                        className="w-20 h-20 rounded-full shadow-md mb-3 object-cover border-4 border-white dark:border-slate-700"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full shadow-md mb-3 flex items-center justify-center bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300 text-3xl border-4 border-white dark:border-slate-600">
                        {emp.name.charAt(0)}
                      </div>
                    )}
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white">
                      {emp.name}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                      {emp.department}
                    </p>
                  </div>
                  
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                      <span className="font-medium mr-2">ID:</span>
                      <span className="text-blue-500 dark:text-blue-400">{emp.empID}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                      <span className="font-medium mr-2">Email:</span>
                      <span className="truncate">{emp.email}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => navigate(`/dashboard/attendance/${emp.empID}`)}
                      className="flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors w-full"
                    >
                      <FiCheckCircle size={16} />
                      <span>Attendance</span>
                    </button>
                    <button
                      onClick={() => navigate(`/dashboard/statistics/${emp.empID}`)}
                      className="flex items-center justify-center gap-2 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white transition-colors w-full"
                    >
                      <HiOutlineChartBar size={16} />
                      <span>Statistics</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              variants={cardVariants}
              className="col-span-full bg-white dark:bg-slate-800 rounded-xl shadow-md p-12 flex flex-col items-center justify-center"
            >
              <TbMoodEmpty size={64} className="text-slate-400 mb-4" />
              <h3 className="text-xl font-medium text-slate-700 dark:text-slate-300 mb-2">No results found</h3>
              <p className="text-slate-500 dark:text-slate-400 text-center max-w-md">
                Try adjusting your search or filter criteria to find what you're looking for.
              </p>
            </motion.div>
          )}
        </motion.div>
   
        {/* Table View */}
        <motion.div
          variants={tableContainerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-slate-800 hidden lg:block rounded-b-lg shadow-md overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#ECF3FD] dark:bg-slate-700/50">
                  <th className="py-4 px-6 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">S.No</th>
                  <th onClick={() => setSortConfig(prev => prev.key === 'empID'
                    ? { key: 'empID', direction: prev.direction === 'asc' ? 'desc' : 'asc' }
                    : { key: 'empID', direction: 'asc' } )} 
                    className="py-4 px-6 flex items-center text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-r border-[#F1F1F1] dark:border-slate-600">
                      Emp ID 
                      {sortConfig.key === 'empID' && (
                        <span className="text-slate-300 cursor-pointer ml-1">{sortConfig.direction === 'asc' ? <FaLongArrowAltUp /> : <FaLongArrowAltDown />}</span>
                      )}           
                   </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-r border-[#F1F1F1] dark:border-slate-600">Name</th>
                  <th className="py-4 px-6 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-r border-[#F1F1F1] dark:border-slate-600">Department</th>
                  <th className="py-4 px-6 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-r border-[#F1F1F1] dark:border-slate-600">Email</th>
                  <th className="py-4 px-6 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y  divide-slate-200 dark:divide-slate-700">
                {currentPageData.length > 0 ? (
                  currentPageData.map((emp, index) => {
                    const serialNumber = startIndex + index + 1;
                    return (
                      <motion.tr
                        key={emp.id}
                        variants={tableRowVariants}
                        className={`${
                  index % 2 ? "bg-[#ECF3FD] dark:bg-gray-500" : "bg-white dark:bg-gray-600"
                } hover:bg-[#f7f7f8] dark:hover:bg-slate-700/30 transition-colors`}
               >
                        <td className="py-2 px-6 whitespace-nowrap text-sm text-slate-500 dark:text-slate-300 border-r border-[#F1F1F1] dark:border-slate-600">
                          {String(serialNumber).padStart(2, "0")}
                        </td>
                        <td className="py-2 px-6 whitespace-nowrap text-sm font-medium text-blue-500 dark:text-blue-400  border-r border-[#F1F1F1] dark:border-slate-600">
                          {emp.empID}
                        </td>
                        <td className="py-2 px-6 whitespace-nowrap  border-r border-[#F1F1F1] dark:border-slate-600">
                          <div className="flex items-center">
                            {emp.userAvatar ? (
                              <img
                                src={emp.userAvatar}
                                alt="Profile"
                                className="w-10 h-10 rounded-full mr-3 object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full mr-3 flex items-center justify-center bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                                {emp.name.charAt(0)}
                              </div>
                            )}
                            <span className="text-sm font-medium text-slate-800 dark:text-white">{emp.name}</span>
                          </div>
                        </td>
                        <td className="py-2 px-6 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300  border-r border-[#F1F1F1] dark:border-slate-600">
                          {emp.department}
                        </td>
                        <td className="py-2 px-6 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400  border-r border-[#F1F1F1] dark:border-slate-600">
                          {emp.email}
                        </td>
                        <td className="py-2 px-6 whitespace-nowrap text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => navigate(`/dashboard/attendance/${emp.empID}`)}
                              className="inline-flex items-center px-3 py-1.5 rounded-md bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-medium transition-colors"
                            >
                              <FiCheckCircle className="mr-1" size={14} />
                              Attendance
                            </button>
                            <button
                              onClick={() => navigate(`/dashboard/statistics/${emp.empID}`)}
                              className="inline-flex items-center px-3 py-1.5 rounded-md bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs font-medium transition-colors"
                            >
                              <HiOutlineChartBar className="mr-1" size={14} />
                              Statistics
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <TbMoodEmpty size={48} className="text-slate-400 mb-3" />
                        <p className="text-slate-500 dark:text-slate-400">No matching records found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {currentPageData.length > 0 && (
            <div className="px-6 py-2 bg-[#F3F4F6] dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Showing <span className="font-medium text-slate-700 dark:text-slate-200">{fromIndex}</span> to{" "}
                  <span className="font-medium text-slate-700 dark:text-slate-200">{toIndex}</span> of{" "}
                  <span className="font-medium text-slate-700 dark:text-slate-200">{totalEntries}</span> entries
                </p>
                
                <div className="flex items-center space-x-1">
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-md border ${
                      currentPage === 1
                        ? "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
                        : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    }`}
                  >
                    <FiChevronLeft size={18} />
                  </button>
                  
                  {generatePaginationControls().map((page, index) => (
                    <React.Fragment key={index}>
                      {page === "..." ? (
                        <span className="px-3 py-2 text-slate-500 dark:text-slate-400">...</span>
                      ) : (
                        <button
                          onClick={() => handlePageChange(page)}
                          className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors ${
                            page === validPage
                              ? "bg-blue-500 text-white"
                              : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                          }`}
                        >
                          {page}
                        </button>
                      )}
                    </React.Fragment>
                  ))}
                  
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-md border ${
                      currentPage === totalPages
                        ? "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
                        : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    }`}
                  >
                    <FiChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
          </>
      )}
      
      {/* Error Message Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
        >
          <div className="flex items-center text-red-600 dark:text-red-400">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        </motion.div>
      
      )}
    </div>
  );
}