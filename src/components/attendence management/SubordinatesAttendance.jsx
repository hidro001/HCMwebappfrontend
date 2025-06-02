

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FaFilePdf, FaFileCsv, FaPrint, FaSearch } from "react-icons/fa";
// import { MdOutlineFileDownload } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import useAuthStore from "../../store/store";  // ⬅️ Import Zustand Auth Store
// // Icons for the new cards
// import { FaUserFriends } from "react-icons/fa";
// import { GiSandsOfTime } from "react-icons/gi";
// import { MdOutlinePersonOff } from "react-icons/md"; // etc.

// // Zustand store
// import useAttendanceStore from "../../store/useAttendanceStore";

// // Loading skeleton
// function SkeletonTableRows({ rows = 5 }) {
//   // ...unchanged...
// }

// const tableContainerVariants = {
//   hidden: { opacity: 0, y: 10 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       staggerChildren: 0.1,
//       delayChildren: 0.2,
//     },
//   },
// };

// const tableRowVariants = {
//   hidden: { opacity: 0, y: 5 },
//   visible: { opacity: 1, y: 0 },
// };

// // Helper to format "YYYY-MM" -> "Month Year"
// function formatMonthYear(monthValue) {
//   if (!monthValue) return "";
//   const [year, month] = monthValue.split("-");
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
//   const monthIndex = parseInt(month, 10) - 1;
//   return `${monthNames[monthIndex]} ${year}`;
// }

// export default function SubordinatesAttendance() {
//   const navigate = useNavigate();

//   const {
//     subordinates,
//     fetchSubordinates,
//     departments,
//     fetchDepartments,
//     // old stats usage (remove or keep if you want them)
//     // stats,
//     // fetchStats,

//     // NEW subordinate stats
//     subordinateStats,
//     fetchSubordinateStats,

//     loading,
//     error,
//   } = useAttendanceStore();

//   // We'll fetch your subordinate stats + subordinates + departments
//   const { _id: userId } = useAuthStore(); // ⬅️ use Zustand's _id directly
//   useEffect(() => {
//     // If you had a userId
    
//     // const userId = localStorage.getItem("_id");
//     if (userId) {
//       fetchSubordinates(userId);
//     }
//     fetchDepartments();

//     // 1) fetch subordinate stats from your new endpoint
//     fetchSubordinateStats();

//     // If you still want old stats: fetchStats();
//   }, [fetchSubordinates, fetchDepartments, fetchSubordinateStats]);
//   // If you want to handle errors, you can do so here
//   // The rest is your existing code...
//   const currentDate = new Date();
//   const defaultMonth = `${currentDate.getFullYear()}-${String(
//     currentDate.getMonth() + 1
//   ).padStart(2, "0")}`;

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedDepartment, setSelectedDepartment] = useState("Department");
//   const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
//   const [showCount, setShowCount] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   // Transform subordinates data into shape for the table
//   const employeesData = subordinates
//     ? subordinates.map((sub, i) => ({
//         id: sub._id ?? i,
//         empID: sub.employee_Id,
//         name: `${sub.first_Name} ${sub.last_Name}`,
//         department: sub.department,
//         email: sub.working_Email_Id,
//         attendanceDate: sub.attendanceDate || "",
//         userAvatar: sub.user_Avatar,
//       }))
//     : [];

//   // Filtering logic...
//   const filteredEmployees = employeesData.filter((emp) => {
//     // Department filter
//     if (
//       selectedDepartment !== "Department" &&
//       emp.department !== selectedDepartment
//     ) {
//       return false;
//     }
//     // Month filter
//     if (selectedMonth && emp.attendanceDate) {
//       const [filterYear, filterMonth] = selectedMonth.split("-");
//       const empYear = emp.attendanceDate.slice(0, 4);
//       const empMonth = emp.attendanceDate.slice(5, 7);
//       if (empYear !== filterYear || empMonth !== filterMonth) {
//         return false;
//       }
//     }
//     // Search filter
//     const lowerSearch = searchTerm.toLowerCase();
//     if (
//       !emp.name.toLowerCase().includes(lowerSearch) &&
//       !emp.email.toLowerCase().includes(lowerSearch) &&
//       !String(emp.empID).toLowerCase().includes(lowerSearch)
//     ) {
//       return false;
//     }
//     return true;
//   });

//   // Pagination
//   const totalEntries = filteredEmployees.length;
//   const totalPages = Math.ceil(totalEntries / showCount) || 1;
//   const validPage = Math.min(currentPage, totalPages);
//   const startIndex = (validPage - 1) * showCount;
//   const endIndex = startIndex + showCount;
//   const currentPageData = filteredEmployees.slice(startIndex, endIndex);

//   const fromIndex = startIndex + 1;
//   const toIndex = startIndex + currentPageData.length;

//   const pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   // Handlers
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1);
//   };
//   const handleDepartmentChange = (e) => {
//     setSelectedDepartment(e.target.value);
//     setCurrentPage(1);
//   };
//   const handleMonthChange = (e) => {
//     setSelectedMonth(e.target.value);
//     setCurrentPage(1);
//   };
//   const handleShowCountChange = (e) => {
//     setShowCount(Number(e.target.value));
//     setCurrentPage(1);
//   };
//   const handlePageChange = (pageNum) => {
//     setCurrentPage(pageNum);
//   };

//   // Dynamic heading
//   const headingText = `Attendance view for ${formatMonthYear(selectedMonth)}`;

//   return (
//     <div className="bg-gray-50 dark:bg-gray-900 dark:text-gray-100 p-6">
//       {/* TOP CARDS: show subordinate stats */}
//       {/* If subordinateStats is null or undefined, handle gracefully */}
//       <motion.div
//         className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         {/* 1) TOTAL SUBORDINATES */}
//         <div className="rounded-md p-4 flex items-center justify-between bg-white dark:bg-gray-800 shadow">
//           <div>
//             <h2 className="text-sm font-medium mb-1">Total Subordinates</h2>
//             <p className="text-2xl font-semibold">
//               {subordinateStats?.totalSubordinates ?? 0}
//             </p>
//           </div>
//           <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-500 text-white text-xl">
//             <FaUserFriends />
//           </div>
//         </div>

//         {/* 2) PRESENT */}
//         <div className="rounded-md p-4 flex items-center justify-between bg-white dark:bg-gray-800 shadow">
//           <div>
//             <h2 className="text-sm font-medium mb-1">Present</h2>
//             <p className="text-2xl font-semibold">
//               {subordinateStats?.presentCount ?? 0}
//             </p>
//           </div>
//           <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-500 text-white text-xl">
//             ✅
//           </div>
//         </div>

//         {/* 3) LATE */}
//         <div className="rounded-md p-4 flex items-center justify-between bg-white dark:bg-gray-800 shadow">
//           <div>
//             <h2 className="text-sm font-medium mb-1">Late</h2>
//             <p className="text-2xl font-semibold">
//               {subordinateStats?.lateCount ?? 0}
//             </p>
//           </div>
//           <div className="h-10 w-10 flex items-center justify-center rounded-full bg-yellow-500 text-white text-xl">
//             <GiSandsOfTime />
//           </div>
//         </div>

//         {/* 4) ON LEAVE */}
//         <div className="rounded-md p-4 flex items-center justify-between bg-white dark:bg-gray-800 shadow">
//           <div>
//             <h2 className="text-sm font-medium mb-1">On Leave</h2>
//             <p className="text-2xl font-semibold">
//               {subordinateStats?.onLeaveCount ?? 0}
//             </p>
//           </div>
//           <div className="h-10 w-10 flex items-center justify-center rounded-full bg-pink-500 text-white text-xl">
//             <MdOutlinePersonOff />
//           </div>
//         </div>
//       </motion.div>

//       {/* Title (month/year) */}
//       <h1 className="text-xl md:text-2xl font-bold mb-4">{headingText}</h1>

//       {/* Filters + Export Icons */}
//       <div className="bg-white dark:bg-gray-800 rounded-md shadow px-4 py-3 mb-6 transition-colors">
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//           <div className="flex flex-wrap items-center gap-4">
//             {/* Show X */}
//             <div className="flex items-center space-x-2">
//               <label className="text-sm font-medium">Show</label>
//               <select
//                 value={showCount}
//                 onChange={handleShowCountChange}
//                 className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-sm focus:outline-none bg-white dark:bg-gray-900"
//               >
//                 <option value={10}>10</option>
//                 <option value={20}>20</option>
//                 <option value={50}>50</option>
//               </select>
//             </div>

//             {/* Search */}
//             <div className="relative">
//               <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">
//                 <FaSearch />
//               </span>
//               <input
//                 type="text"
//                 placeholder="Search"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 className="border border-gray-300 dark:border-gray-700 rounded pl-8 pr-3 py-1 text-sm focus:outline-none bg-white dark:bg-gray-900 w-36 sm:w-48"
//               />
//             </div>

//             {/* Month */}
//             <div>
//               <input
//                 type="month"
//                 value={selectedMonth}
//                 onChange={handleMonthChange}
//                 className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-sm focus:outline-none bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-100"
//               />
//             </div>

//             {/* Department */}
//             <div>
//               <select
//                 value={selectedDepartment}
//                 onChange={handleDepartmentChange}
//                 className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-sm focus:outline-none bg-white dark:bg-gray-900"
//               >
//                 <option>Department</option>
//                 {departments && departments.length > 0 ? (
//                   departments.map((dept) => (
//                     <option key={dept._id} value={dept.department}>
//                       {dept.department}
//                     </option>
//                   ))
//                 ) : (
//                   <option disabled>No Departments Found</option>
//                 )}
//               </select>
//             </div>
//           </div>

//           {/* Right side: Export Icons */}
//         </div>
//       </div>

//       {/* TABLE */}
//       <motion.div
//         className="bg-white dark:bg-gray-800 rounded-md shadow overflow-x-auto transition-colors"
//         variants={tableContainerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <table className="w-full text-left min-w-max">
//           <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
//             <tr className="text-sm font-medium text-gray-600 dark:text-gray-200">
//               <th className="py-3 px-4">S.L</th>
//               <th className="py-3 px-4">Emp ID</th>
//               <th className="py-3 px-4">Name</th>
//               <th className="py-3 px-4">Department</th>
//               <th className="py-3 px-4">Email Account</th>
//               <th className="py-3 px-4">Status</th>
//             </tr>
//           </thead>

//           {loading ? (
//             <tbody>
//               <SkeletonTableRows rows={10} />
//             </tbody>
//           ) : (
//             <tbody>
//               {currentPageData.map((emp, index) => {
//                 const serialNumber = startIndex + index + 1;
//                 return (
//                   <motion.tr
//                     key={emp.id}
//                     variants={tableRowVariants}
//                     className="border-b last:border-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-sm"
//                   >
//                     <td className="py-3 px-4">
//                       {String(serialNumber).padStart(2, "0")}
//                     </td>
//                     <td className="py-3 px-4 text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
//                       {emp.empID}
//                     </td>
//                     <td className="py-3 px-4">
//                       <div className="flex items-center">
//                         {emp.userAvatar ? (
//                           <img
//                             src={emp.userAvatar}
//                             alt="Profile"
//                             className="w-8 h-8 rounded-full mr-2 object-cover"
//                           />
//                         ) : (
//                           <div className="w-8 h-8 rounded-full mr-2 flex items-center justify-center bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                             👤
//                           </div>
//                         )}
//                         <span>{emp.name}</span>
//                       </div>
//                     </td>
//                     <td className="py-3 px-4">{emp.department}</td>
//                     <td className="py-3 px-4">{emp.email}</td>
//                     <td className="py-3 px-4">
//                       <button
//                         className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded transition-colors"
//                         onClick={() =>
//                           navigate(`/dashboard/attendance/${emp.empID}`)
//                         }
//                       >
//                         View Attendance
//                       </button>
//                       <button
//                         className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded transition-colors"
//                         onClick={() =>
//                           navigate(`/dashboard/statistics/${emp.empID}`)
//                         }
//                       >
//                         View Statistics
//                       </button>
//                     </td>
//                   </motion.tr>
//                 );
//               })}
//               {currentPageData.length === 0 && (
//                 <tr>
//                   <td
//                     colSpan={6}
//                     className="text-center py-4 text-sm text-gray-500"
//                   >
//                     No matching records found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           )}
//         </table>

//         {/* Pagination */}
//         {!loading && (
//           <div className="flex flex-col md:flex-row items-center justify-between p-4 text-sm text-gray-600 dark:text-gray-300">
//             <div>
//               {totalEntries > 0
//                 ? `Showing ${fromIndex} to ${toIndex} of ${totalEntries} entries`
//                 : `Showing 0 to 0 of 0 entries`}
//             </div>
//             <div className="flex items-center space-x-1 mt-2 md:mt-0">
//               {pageNumbers.map((num) => (
//                 <button
//                   key={num}
//                   onClick={() => handlePageChange(num)}
//                   className={`px-3 py-1 rounded border transition-colors ${
//                     num === validPage
//                       ? "bg-blue-600 text-white border-blue-600"
//                       : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
//                   }`}
//                 >
//                   {num}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/store";
import useAttendanceStore from "../../store/useAttendanceStore";

// Import React Icons
import { 
  FiSearch, FiCalendar, FiUsers, FiCheckCircle, 
  FiClock, FiClipboard, FiDownload, FiPrinter, 
  FiFilter, FiChevronDown, FiChevronUp, FiChevronLeft, 
  FiChevronRight, FiGrid, FiList, FiSliders
} from "react-icons/fi";
import { BsPersonCheckFill, BsPersonXFill, BsClockHistory } from "react-icons/bs";
import { BiBuildings } from "react-icons/bi";
import { HiOutlineChartBar } from "react-icons/hi";
import { TbMoodEmpty } from "react-icons/tb";

// Helper to format dates
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

// Skeleton loader for table rows
function SkeletonTableRows({ rows = 5 }) {
  return Array(rows)
    .fill(0)
    .map((_, i) => (
      <tr key={i} className="animate-pulse">
        <td className="py-4 px-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-6"></div>
        </td>
        <td className="py-4 px-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
        </td>
        <td className="py-4 px-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full mr-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </div>
        </td>
        <td className="py-4 px-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
        </td>
        <td className="py-4 px-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
        </td>
        <td className="py-4 px-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-28"></div>
        </td>
      </tr>
    ));
}

// Animation variants
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
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'table'
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    if (userId) {
      fetchSubordinates(userId);
    }
    fetchDepartments();
    fetchSubordinateStats();
  }, [fetchSubordinates, fetchDepartments, fetchSubordinateStats, userId]);

  // Transform subordinates data for display
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

  // Filter employees based on criteria
  const filteredEmployees = employeesData.filter((emp) => {
    // Department filter
    if (selectedDepartment !== "Department" && emp.department !== selectedDepartment) {
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

  // Pagination calculations
  const totalEntries = filteredEmployees.length;
  const totalPages = Math.ceil(totalEntries / showCount) || 1;
  const validPage = Math.min(currentPage, totalPages);
  const startIndex = (validPage - 1) * showCount;
  const endIndex = startIndex + showCount;
  const currentPageData = filteredEmployees.slice(startIndex, endIndex);

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

      {/* Stats Overview Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
      >
        {/* Total Subordinates Card */}
        <motion.div
          variants={cardVariants}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 shadow-lg text-white relative overflow-hidden"
        >
          <div className="absolute -right-6 -top-6 opacity-20 text-6xl">
            <FiUsers size={80} />
          </div>
          <div className="relative z-10">
            <p className="text-blue-100 text-sm uppercase tracking-wider font-medium mb-1">Total Team Members</p>
            <h3 className="text-4xl font-bold mb-2">
              {subordinateStats?.totalSubordinates ?? 0}
            </h3>
            <p className="text-blue-100 text-sm">Active employees</p>
          </div>
        </motion.div>

        {/* Present Card */}
        <motion.div
          variants={cardVariants}
          className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 shadow-lg text-white relative overflow-hidden"
        >
          <div className="absolute -right-6 -top-6 opacity-20 text-6xl">
            <BsPersonCheckFill size={80} />
          </div>
          <div className="relative z-10">
            <p className="text-emerald-100 text-sm uppercase tracking-wider font-medium mb-1">Present Today</p>
            <h3 className="text-4xl font-bold mb-2">
              {subordinateStats?.presentCount ?? 0}
            </h3>
            <p className="text-emerald-100 text-sm">On time check-ins</p>
          </div>
        </motion.div>

        {/* Late Card */}
        <motion.div
          variants={cardVariants}
          className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 shadow-lg text-white relative overflow-hidden"
        >
          <div className="absolute -right-6 -top-6 opacity-20 text-6xl">
            <BsClockHistory size={80} />
          </div>
          <div className="relative z-10">
            <p className="text-amber-100 text-sm uppercase tracking-wider font-medium mb-1">Late Arrivals</p>
            <h3 className="text-4xl font-bold mb-2">
              {subordinateStats?.lateCount ?? 0}
            </h3>
            <p className="text-amber-100 text-sm">Delayed check-ins</p>
          </div>
        </motion.div>

        {/* On Leave Card */}
        <motion.div
          variants={cardVariants}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 shadow-lg text-white relative overflow-hidden"
        >
          <div className="absolute -right-6 -top-6 opacity-20 text-6xl">
            <BsPersonXFill size={80} />
          </div>
          <div className="relative z-10">
            <p className="text-purple-100 text-sm uppercase tracking-wider font-medium mb-1">On Leave</p>
            <h3 className="text-4xl font-bold mb-2">
              {subordinateStats?.onLeaveCount ?? 0}
            </h3>
            <p className="text-purple-100 text-sm">Approved absences</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Filters Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-6"
      >
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-5">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <FiSearch size={18} />
              </div>
              <input
                type="text"
                placeholder="Search by name, email or ID..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-3 w-full rounded-lg border-0 ring-1 ring-slate-200 dark:ring-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {/* Filter Button */}
              <button 
                onClick={toggleFilterMenu}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-slate-700 dark:text-slate-200"
              >
                <FiFilter size={18} />
                <span>Filters</span>
                {filterMenuOpen ? (
                  <FiChevronUp size={18} />
                ) : (
                  <FiChevronDown size={18} />
                )}
              </button>

              {/* View Toggle */}
              <button
                onClick={toggleViewMode}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-slate-700 dark:text-slate-200"
              >
                {viewMode === "grid" ? (
                  <>
                    <FiList size={18} />
                    <span>List View</span>
                  </>
                ) : (
                  <>
                    <FiGrid size={18} />
                    <span>Grid View</span>
                  </>
                )}
              </button>

              {/* Export Button */}
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors text-white">
                <FiDownload size={18} />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Filter Panel - Expandable */}
          <AnimatePresence>
            {filterMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 border-t border-slate-200 dark:border-slate-700 pt-4">
                  {/* Department Filter */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <BiBuildings size={18} />
                    </div>
                    <select
                      value={selectedDepartment}
                      onChange={handleDepartmentChange}
                      className="pl-10 pr-4 py-2.5 w-full rounded-lg border-0 ring-1 ring-slate-200 dark:ring-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
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
                      className="pl-10 pr-4 py-2.5 w-full rounded-lg border-0 ring-1 ring-slate-200 dark:ring-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
                      className="pl-10 pr-4 py-2.5 w-full rounded-lg border-0 ring-1 ring-slate-200 dark:ring-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
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
              </motion.div>
            )}
          </AnimatePresence>
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
      ) : viewMode === "grid" ? (
        // Grid View
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
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
      ) : (
        // Table View
        <motion.div
          variants={tableContainerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-700/50">
                  <th className="py-4 px-6 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">S.No</th>
                  <th className="py-4 px-6 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Emp ID</th>
                  <th className="py-4 px-6 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Name</th>
                  <th className="py-4 px-6 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Department</th>
                  <th className="py-4 px-6 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Email</th>
                  <th className="py-4 px-6 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {currentPageData.length > 0 ? (
                  currentPageData.map((emp, index) => {
                    const serialNumber = startIndex + index + 1;
                    return (
                      <motion.tr
                        key={emp.id}
                        variants={tableRowVariants}
                        className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                      >
                        <td className="py-4 px-6 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                          {String(serialNumber).padStart(2, "0")}
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-blue-500 dark:text-blue-400">
                          {emp.empID}
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap">
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
                        <td className="py-4 px-6 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                          {emp.department}
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                          {emp.email}
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap text-right">
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
            <div className="px-6 py-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
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