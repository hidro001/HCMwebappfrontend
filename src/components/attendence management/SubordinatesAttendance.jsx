
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// // Example icon imports
// import { FaFilePdf, FaFileCsv, FaPrint, FaSearch } from "react-icons/fa";
// import { MdOutlineFileDownload } from "react-icons/md";
// import { useNavigate } from "react-router-dom";

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

// // Skeleton for loading
// function SkeletonTableRows({ rows = 5 }) {
//   return (
//     <>
//       {Array.from({ length: rows }).map((_, i) => (
//         <tr
//           key={i}
//           className="border-b last:border-0 border-gray-200 dark:border-gray-700"
//         >
//           <td className="py-3 px-4">
//             <div className="w-6 h-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
//           </td>
//           <td className="py-3 px-4">
//             <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
//           </td>
//           <td className="py-3 px-4">
//             <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
//           </td>
//           <td className="py-3 px-4">
//             <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
//           </td>
//           <td className="py-3 px-4">
//             <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
//           </td>
//           <td className="py-3 px-4">
//             <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
//           </td>
//         </tr>
//       ))}
//     </>
//   );
// }

// export default function SubordinatesAttendance() {
//   // Remove all use of setTimeout; no more simulated loading.
//   const [isLoading] = useState(false);
//   const navigate = useNavigate();

//   // Sample data
//   const employeesData = [
//     {
//       id: 1,
//       empID: "526534",
//       name: "Kathryn Murphy",
//       department: "IT",
//       email: "Test@gmail.com",
//       attendanceDate: "2025-01-05",
//     },
//     {
//       id: 2,
//       empID: "698589",
//       name: "Annette Black",
//       department: "Finance",
//       email: "Test@gmail.com",
//       attendanceDate: "2025-01-10",
//     },
//     {
//       id: 3,
//       empID: "256584",
//       name: "Ronald Richards",
//       department: "Marketing",
//       email: "Test@gmail.com",
//       attendanceDate: "2025-01-15",
//     },
//     {
//       id: 4,
//       empID: "526587",
//       name: "Eleanor Pena",
//       department: "Sales",
//       email: "Test@gmail.com",
//       attendanceDate: "2025-02-02",
//     },
//     {
//       id: 5,
//       empID: "105986",
//       name: "Leslie Alexander",
//       department: "Operations",
//       email: "Test@gmail.com",
//       attendanceDate: "2025-02-10",
//     },
//     {
//       id: 6,
//       empID: "526589",
//       name: "Albert Flores",
//       department: "Marketing",
//       email: "Test@gmail.com",
//       attendanceDate: "2025-01-20",
//     },
//     {
//       id: 7,
//       empID: "526520",
//       name: "Jacob Jones",
//       department: "IT",
//       email: "Test@gmail.com",
//       attendanceDate: "2025-01-12",
//     },
//     {
//       id: 8,
//       empID: "256584",
//       name: "Jerome Bell",
//       department: "HR",
//       email: "Test@gmail.com",
//       attendanceDate: "2025-02-22",
//     },
//     {
//       id: 9,
//       empID: "200257",
//       name: "Marvin McKinney",
//       department: "HR",
//       email: "Test@gmail.com",
//       attendanceDate: "2025-01-25",
//     },
//     {
//       id: 10,
//       empID: "526525",
//       name: "Cameron Williamson",
//       department: "Finance",
//       email: "Test@gmail.com",
//       attendanceDate: "2025-01-29",
//     },
//   ];

//   // Filtering, search, pagination
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedDepartment, setSelectedDepartment] = useState("Department");
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [showCount, setShowCount] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   // Filter + search
//   const filteredEmployees = employeesData.filter((emp) => {
//     // Department filter
//     if (
//       selectedDepartment !== "Department" &&
//       emp.department !== selectedDepartment
//     ) {
//       return false;
//     }
//     // Month filter
//     if (selectedMonth) {
//       const [filterYear, filterMonth] = selectedMonth.split("-");
//       const empYear = emp.attendanceDate.slice(0, 4);
//       const empMonth = emp.attendanceDate.slice(5, 7);
//       if (empYear !== filterYear || empMonth !== filterMonth) {
//         return false;
//       }
//     }
//     // Search
//     const lowerSearch = searchTerm.toLowerCase();
//     if (
//       !emp.name.toLowerCase().includes(lowerSearch) &&
//       !emp.email.toLowerCase().includes(lowerSearch) &&
//       !emp.empID.toLowerCase().includes(lowerSearch)
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

//   return (
//     <div className=" bg-gray-50 dark:bg-gray-900 dark:text-gray-100 p-6 ">
//       {/* Top Stats Cards (Optional) */}
//       <motion.div
//         className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <div className="rounded-md p-4 flex items-center justify-between bg-white dark:bg-gray-800 shadow">
//           <div>
//             <h2 className="text-sm font-medium mb-1">Total Logged In</h2>
//             <p className="text-2xl font-semibold">400</p>
//             <p className="text-xs text-green-600 dark:text-green-400 mt-1">
//               +5000 Last 30 days Employee
//             </p>
//           </div>
//           <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-500 text-white text-xl font-bold">
//             👤
//           </div>
//         </div>

//         <div className="rounded-md p-4 flex items-center justify-between bg-white dark:bg-gray-800 shadow">
//           <div>
//             <h2 className="text-sm font-medium mb-1">Total On Leave</h2>
//             <p className="text-2xl font-semibold">89</p>
//             <p className="text-xs text-red-500 dark:text-red-400 mt-1">
//               -800 Last 30 days Active
//             </p>
//           </div>
//           <div className="h-10 w-10 flex items-center justify-center rounded-full bg-pink-500 text-white text-xl font-bold">
//             🏷
//           </div>
//         </div>

//         <div className="rounded-md p-4 flex items-center justify-between bg-white dark:bg-gray-800 shadow">
//           <div>
//             <h2 className="text-sm font-medium mb-1">Total In Late</h2>
//             <p className="text-2xl font-semibold">212</p>
//             <p className="text-xs text-green-600 dark:text-green-400 mt-1">
//               +200 Last 30 days Inactive
//             </p>
//           </div>
//           <div className="h-10 w-10 flex items-center justify-center rounded-full bg-purple-600 text-white text-xl font-bold">
//             ⏰
//           </div>
//         </div>
//       </motion.div>

//       {/* Title */}
//       <h1 className="text-xl md:text-2xl font-bold mb-4">
//         Attendance Of January 2025
//       </h1>

//       {/* Filters + Export Icons */}
//       <div className="bg-white dark:bg-gray-800 rounded-md shadow px-4 py-3 mb-6 transition-colors">
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//           {/* Left side: Show X, Search, Month, Dept */}
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
//                 <option>IT</option>
//                 <option>Finance</option>
//                 <option>Marketing</option>
//                 <option>Sales</option>
//                 <option>HR</option>
//                 <option>Operations</option>
//               </select>
//             </div>
//           </div>

//           {/* Right side: Export Icons */}
//           <div className="flex items-center gap-3">
//             <button className="hover:opacity-75 transition">
//               <FaPrint size={16} className="text-teal-500" />
//             </button>
//             <button className="hover:opacity-75 transition">
//               <FaFilePdf size={16} className="text-red-500" />
//             </button>
//             <button className="hover:opacity-75 transition">
//               <FaFileCsv size={16} className="text-green-600" />
//             </button>
//             <button className="hover:opacity-75 transition">
//               <MdOutlineFileDownload size={16} className="text-blue-500" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
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

//           {isLoading ? (
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

//                     {/* Name + Profile Image */}
//                     <td className="py-3 px-4">
//                       <div className="flex items-center">
//                         <img
//                           src="https://res.cloudinary.com/du40x9sao/image/upload/v1734324245/ems-user-avatars/ems-user-avatars/REIGNS-1024x640.jpg"
//                           alt="Profile"
//                           className="w-8 h-8 rounded-full mr-2 object-cover"
//                         />
//                         <span>{emp.name}</span>
//                       </div>
//                     </td>

//                     <td className="py-3 px-4">{emp.department}</td>
//                     <td className="py-3 px-4">{emp.email}</td>
//                     <td className="py-3 px-4">
//                       <button
//                         className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded transition-colors"
//                         onClick={() => navigate(`/dashboard/attendance/${emp.empID}`)}
//                       >
//                         View Attendance
//                       </button>
//                     </td>
//                   </motion.tr>
//                 );
//               })}

//               {currentPageData.length === 0 && (
//                 <tr>
//                   <td colSpan={6} className="text-center py-4 text-sm text-gray-500">
//                     No matching records found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           )}
//         </table>

//         {/* Pagination */}
//         {!isLoading && (
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

// SubordinatesAttendance.jsx

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// // Example icon imports
// import { FaFilePdf, FaFileCsv, FaPrint, FaSearch } from "react-icons/fa";
// import { MdOutlineFileDownload } from "react-icons/md";
// import { useNavigate } from "react-router-dom";

// // Zustand store
// import useAttendanceStore from "../../store/useAttendanceStore";

// // react-hot-toast is used in the store, but you can import here if needed
// // import { toast } from "react-hot-toast";

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

// // For loading skeleton rows
// function SkeletonTableRows({ rows = 5 }) {
//   return (
//     <>
//       {Array.from({ length: rows }).map((_, i) => (
//         <tr
//           key={i}
//           className="border-b last:border-0 border-gray-200 dark:border-gray-700"
//         >
//           <td className="py-3 px-4">
//             <div className="w-6 h-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
//           </td>
//           <td className="py-3 px-4">
//             <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
//           </td>
//           <td className="py-3 px-4">
//             <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
//           </td>
//           <td className="py-3 px-4">
//             <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
//           </td>
//           <td className="py-3 px-4">
//             <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
//           </td>
//           <td className="py-3 px-4">
//             <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
//           </td>
//         </tr>
//       ))}
//     </>
//   );
// }

// export default function SubordinatesAttendance() {
//   const navigate = useNavigate();

//   // Pull data and actions from Zustand store
//   const {
//     subordinates,
//     fetchSubordinates,
//     departments,
//     fetchDepartments,
//     stats,
//     fetchStats,
//     loading,
//     error,
//   } = useAttendanceStore();

//   // If you need userId from localStorage:
//   const userId = localStorage.getItem("mongo_id");

//   // On mount, fetch data
//   useEffect(() => {
//     if (userId) {
//       fetchSubordinates(userId);
//     }
//     fetchDepartments();
//     fetchStats();
//   }, [fetchSubordinates, fetchDepartments, fetchStats, userId]);

//   // If subordinates is available, transform them into the shape your table expects
//   // Otherwise, use your "dummy" data
//   const employeesData =
//     subordinates && subordinates.length > 0
//       ? subordinates.map((sub, i) => ({
//           id: sub._id ?? i,
//           empID: sub.employee_Id,
//           name: `${sub.first_Name} ${sub.last_Name}`,
//           department: sub.department,
//           email: sub.working_Email_Id,
//           // If there's no attendanceDate from the API, use a placeholder
//           attendanceDate: "2025-01-01", 
//         }))
//       : [
//           // DUMMY data if no subordinates returned
//           {
//             id: 1,
//             empID: "526534",
//             name: "Kathryn Murphy",
//             department: "IT",
//             email: "Test@gmail.com",
//             attendanceDate: "2025-01-05",
//           },
//           {
//             id: 2,
//             empID: "698589",
//             name: "Annette Black",
//             department: "Finance",
//             email: "Test@gmail.com",
//             attendanceDate: "2025-01-10",
//           },
//           {
//             id: 3,
//             empID: "256584",
//             name: "Ronald Richards",
//             department: "Marketing",
//             email: "Test@gmail.com",
//             attendanceDate: "2025-01-15",
//           },
//           {
//             id: 4,
//             empID: "526587",
//             name: "Eleanor Pena",
//             department: "Sales",
//             email: "Test@gmail.com",
//             attendanceDate: "2025-02-02",
//           },
//           {
//             id: 5,
//             empID: "105986",
//             name: "Leslie Alexander",
//             department: "Operations",
//             email: "Test@gmail.com",
//             attendanceDate: "2025-02-10",
//           },
//           {
//             id: 6,
//             empID: "526589",
//             name: "Albert Flores",
//             department: "Marketing",
//             email: "Test@gmail.com",
//             attendanceDate: "2025-01-20",
//           },
//           {
//             id: 7,
//             empID: "526520",
//             name: "Jacob Jones",
//             department: "IT",
//             email: "Test@gmail.com",
//             attendanceDate: "2025-01-12",
//           },
//           {
//             id: 8,
//             empID: "256584",
//             name: "Jerome Bell",
//             department: "HR",
//             email: "Test@gmail.com",
//             attendanceDate: "2025-02-22",
//           },
//           {
//             id: 9,
//             empID: "200257",
//             name: "Marvin McKinney",
//             department: "HR",
//             email: "Test@gmail.com",
//             attendanceDate: "2025-01-25",
//           },
//           {
//             id: 10,
//             empID: "526525",
//             name: "Cameron Williamson",
//             department: "Finance",
//             email: "Test@gmail.com",
//             attendanceDate: "2025-01-29",
//           },
//         ];

//   // Local state for filters/search/pagination
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedDepartment, setSelectedDepartment] = useState("Department");
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [showCount, setShowCount] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   // Filtering, searching
//   const filteredEmployees = employeesData.filter((emp) => {
//     // Department filter
//     if (
//       selectedDepartment !== "Department" &&
//       emp.department !== selectedDepartment
//     ) {
//       return false;
//     }
//     // Month filter
//     if (selectedMonth) {
//       const [filterYear, filterMonth] = selectedMonth.split("-");
//       const empYear = emp.attendanceDate.slice(0, 4);
//       const empMonth = emp.attendanceDate.slice(5, 7);
//       if (empYear !== filterYear || empMonth !== filterMonth) {
//         return false;
//       }
//     }
//     // Search
//     const lowerSearch = searchTerm.toLowerCase();
//     if (
//       !emp.name.toLowerCase().includes(lowerSearch) &&
//       !emp.email.toLowerCase().includes(lowerSearch) &&
//       !emp.empID.toLowerCase().includes(lowerSearch)
//     ) {
//       return false;
//     }
//     return true;
//   });

//   // Pagination logic
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

//   return (
//     <div className=" bg-gray-50 dark:bg-gray-900 dark:text-gray-100 p-6 ">
//       {/* Top Stats Cards */}
//       <motion.div
//         className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <div className="rounded-md p-4 flex items-center justify-between bg-white dark:bg-gray-800 shadow">
//           <div>
//             <h2 className="text-sm font-medium mb-1">Total Logged In</h2>
//             <p className="text-2xl font-semibold">
//               {/* Use stats if available, else fallback */}
//               {stats?.numberOfUsersLoggedInToday ?? 400}
//             </p>
//             <p className="text-xs text-green-600 dark:text-green-400 mt-1">
//               +5000 Last 30 days Employee
//             </p>
//           </div>
//           <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-500 text-white text-xl font-bold">
//             👤
//           </div>
//         </div>

//         <div className="rounded-md p-4 flex items-center justify-between bg-white dark:bg-gray-800 shadow">
//           <div>
//             <h2 className="text-sm font-medium mb-1">Total On Leave</h2>
//             <p className="text-2xl font-semibold">
//               {stats?.numberOfEmployeesOnLeaveToday ?? 89}
//             </p>
//             <p className="text-xs text-red-500 dark:text-red-400 mt-1">
//               -800 Last 30 days Active
//             </p>
//           </div>
//           <div className="h-10 w-10 flex items-center justify-center rounded-full bg-pink-500 text-white text-xl font-bold">
//             🏷
//           </div>
//         </div>

//         <div className="rounded-md p-4 flex items-center justify-between bg-white dark:bg-gray-800 shadow">
//           <div>
//             <h2 className="text-sm font-medium mb-1">Total In Late</h2>
//             <p className="text-2xl font-semibold">212</p>
//             <p className="text-xs text-green-600 dark:text-green-400 mt-1">
//               +200 Last 30 days Inactive
//             </p>
//           </div>
//           <div className="h-10 w-10 flex items-center justify-center rounded-full bg-purple-600 text-white text-xl font-bold">
//             ⏰
//           </div>
//         </div>
//       </motion.div>

//       {/* Title */}
//       <h1 className="text-xl md:text-2xl font-bold mb-4">
//         Attendance Of January 2025
//       </h1>

//       {/* Filters + Export Icons */}
//       <div className="bg-white dark:bg-gray-800 rounded-md shadow px-4 py-3 mb-6 transition-colors">
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//           {/* Left side: Show X, Search, Month, Dept */}
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

//             {/* Department Dropdown: Dynamically fetched */}
//             <div>
//               <select
//                 value={selectedDepartment}
//                 onChange={handleDepartmentChange}
//                 className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-sm focus:outline-none bg-white dark:bg-gray-900"
//               >
//                 <option>Department</option>
//                 {/* If 'departments' array is loaded, map them */}
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
//           <div className="flex items-center gap-3">
//             <button className="hover:opacity-75 transition">
//               <FaPrint size={16} className="text-teal-500" />
//             </button>
//             <button className="hover:opacity-75 transition">
//               <FaFilePdf size={16} className="text-red-500" />
//             </button>
//             <button className="hover:opacity-75 transition">
//               <FaFileCsv size={16} className="text-green-600" />
//             </button>
//             <button className="hover:opacity-75 transition">
//               <MdOutlineFileDownload size={16} className="text-blue-500" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
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

//                     {/* Name + Profile Image */}
//                     <td className="py-3 px-4">
//                       <div className="flex items-center">
//                         <img
//                           src={emp.user_Avatar }
//                           alt="Profile"
//                           className="w-8 h-8 rounded-full mr-2 object-cover"
//                         />
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
//                     </td>
//                   </motion.tr>
//                 );
//               })}

//               {currentPageData.length === 0 && (
//                 <tr>
//                   <td colSpan={6} className="text-center py-4 text-sm text-gray-500">
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

export default function SubordinatesAttendance() {
  const navigate = useNavigate();

  // Pull data and actions from Zustand store
  const {
    subordinates,
    fetchSubordinates,
    departments,
    fetchDepartments,
    stats,
    fetchStats,
    loading,
    error,
  } = useAttendanceStore();

  // Get userId from localStorage (adjust key if needed)
  const userId = localStorage.getItem("mongo_id");

  useEffect(() => {
    if (userId) {
      fetchSubordinates(userId);
    }
    fetchDepartments();
    fetchStats();
  }, [fetchSubordinates, fetchDepartments, fetchStats, userId]);

  // Transform subordinates data into shape for the table
  const employeesData = subordinates
    ? subordinates.map((sub, i) => ({
        id: sub._id ?? i,
        empID: sub.employee_Id,
        name: `${sub.first_Name} ${sub.last_Name}`,
        department: sub.department,
        email: sub.working_Email_Id,
        // Use sub.attendanceDate if available from your API
        attendanceDate: sub.attendanceDate || "",
        // Use sub.user_Avatar if available
        userAvatar: sub.user_Avatar,
      }))
    : [];

  // Local state for filters/search/pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("Department");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [showCount, setShowCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filtering + searching
  const filteredEmployees = employeesData.filter((emp) => {
    // Department filter
    if (
      selectedDepartment !== "Department" &&
      emp.department !== selectedDepartment
    ) {
      return false;
    }

    // Month filter (only if sub.attendanceDate is relevant)
    if (selectedMonth && emp.attendanceDate) {
      const [filterYear, filterMonth] = selectedMonth.split("-");
      const empYear = emp.attendanceDate.slice(0, 4);
      const empMonth = emp.attendanceDate.slice(5, 7);
      if (empYear !== filterYear || empMonth !== filterMonth) {
        return false;
      }
    }

    // Search
    const lowerSearch = searchTerm.toLowerCase();
    if (
      !emp.name.toLowerCase().includes(lowerSearch) &&
      !emp.email.toLowerCase().includes(lowerSearch) &&
      !emp.empID.toString().toLowerCase().includes(lowerSearch)
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

  return (
    <div className="bg-gray-50 dark:bg-gray-900 dark:text-gray-100 p-6">
      {/* Top Stats Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Total Logged In */}
        <div className="rounded-md p-4 flex items-center justify-between bg-white dark:bg-gray-800 shadow">
          <div>
            <h2 className="text-sm font-medium mb-1">Total Logged In</h2>
            <p className="text-2xl font-semibold">
              {stats?.numberOfUsersLoggedInToday || 0}
            </p>
          </div>
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-500 text-white text-xl font-bold">
            👤
          </div>
        </div>

        {/* Total On Leave */}
        <div className="rounded-md p-4 flex items-center justify-between bg-white dark:bg-gray-800 shadow">
          <div>
            <h2 className="text-sm font-medium mb-1">Total On Leave</h2>
            <p className="text-2xl font-semibold">
              {stats?.numberOfEmployeesOnLeaveToday || 0}
            </p>
          </div>
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-pink-500 text-white text-xl font-bold">
            🏷
          </div>
        </div>

        {/* Total In Late (Adjust if your API has different fields) */}
        <div className="rounded-md p-4 flex items-center justify-between bg-white dark:bg-gray-800 shadow">
          <div>
            <h2 className="text-sm font-medium mb-1">Total In Late</h2>
            <p className="text-2xl font-semibold">
              {stats?.numberOfEmployeesLateToday || 0}
            </p>
          </div>
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-purple-600 text-white text-xl font-bold">
            ⏰
          </div>
        </div>
      </motion.div>

      {/* Title */}
      <h1 className="text-xl md:text-2xl font-bold mb-4">Attendance</h1>

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

            {/* Month */}
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
          <div className="flex items-center gap-3">
            <button className="hover:opacity-75 transition">
              <FaPrint size={16} className="text-teal-500" />
            </button>
            <button className="hover:opacity-75 transition">
              <FaFilePdf size={16} className="text-red-500" />
            </button>
            <button className="hover:opacity-75 transition">
              <FaFileCsv size={16} className="text-green-600" />
            </button>
            <button className="hover:opacity-75 transition">
              <MdOutlineFileDownload size={16} className="text-blue-500" />
            </button>
          </div>
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

                    {/* Name + Profile Image */}
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <img
                          src={emp.userAvatar || ""}
                          alt="Profile"
                          className="w-8 h-8 rounded-full mr-2 object-cover"
                        />
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
