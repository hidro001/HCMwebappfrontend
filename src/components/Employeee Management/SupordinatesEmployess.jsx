// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { FaEdit, FaTrash, FaSearch, FaArrowRight } from "react-icons/fa";
// import useEmployeesStore from "../../store/useAllEmployeesStore";
// import ConfirmationDialog from "../common/ConfirmationDialog";
// import useAuthStore from "../../store/store"; 

// const statusColors = {
//   ACTIVE: "bg-green-500 text-white dark:bg-green-600",
//   Inactive: "bg-red-500 text-white dark:bg-red-600",
//   REMOTE: "bg-purple-500 text-white dark:bg-purple-600",
//   "ON LEAVE": "bg-yellow-400 text-black dark:bg-yellow-500 dark:text-black",
// };

// const cardVariants = {
//   hidden: { opacity: 0, y: 10 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.3 },
//   },
// };

// const SkeletonCard = () => (
//   <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl shadow-sm flex flex-col animate-pulse">
//     <div className="relative h-20 bg-gray-300 dark:bg-gray-700">
//       <span className="absolute top-2 left-2 w-16 h-5 bg-gray-200 dark:bg-gray-600 rounded-full" />
//       <div className="absolute top-2 right-2 flex space-x-2">
//         <span className="w-5 h-5 bg-gray-200 dark:bg-gray-600 rounded" />
//         <span className="w-5 h-5 bg-gray-200 dark:bg-gray-600 rounded" />
//       </div>
//       <div className="absolute w-full flex justify-center -bottom-8">
//         <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-600 border-white dark:border-gray-800 overflow-hidden" />
//       </div>
//     </div>
//     <div className="pt-10 px-4 pb-4 flex flex-col flex-grow justify-between text-center">
//       <div>
//         <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 mx-auto mb-2" />
//         <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto" />
//         <div className="flex justify-between items-center mt-4 bg-gray-50 dark:bg-gray-600 rounded-lg p-2">
//           <div className="w-1/2 text-center border-r border-gray-200 dark:border-gray-700">
//             <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12 mx-auto mb-1" />
//             <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-8 mx-auto" />
//           </div>
//           <div className="w-1/2 text-center">
//             <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12 mx-auto mb-1" />
//             <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-8 mx-auto" />
//           </div>
//         </div>
//       </div>
//       <div className="mt-4 w-full h-8 bg-blue-300 dark:bg-blue-700 rounded" />
//     </div>
//   </div>
// );

// function SupordinatesEmployess() {
//   const {
//     employees,
//     filteredEmployees,
//     totalEmployeeCount,
//     searchTerm,
//     sortOrder,
//     loading,
//     error,
//     fetchEmployees,
//     handleSearchChange,
//     handleSortOrderChange,
//     deleteEmployee,
//     toggleEmployeeStatus,
//   } = useEmployeesStore();

//   // Auth store to get "permissions"
//   const { permissions } = useAuthStore((state) => state);

//   // Derive helpful booleans
//   const canDeleteEmployee = permissions?.includes("employee-delete-subordinate");
//   const canToggleStatus = permissions?.includes("employee-status-subordinate");
//   const canViewProfile = permissions?.includes("employee-view-only");
//   const canEditEmployee = permissions?.includes("employee-update-subordinate");

//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   // ---- State for ConfirmationDialog
//   const [isConfirmOpen, setIsConfirmOpen] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);

//   // -- New Confirmation for Toggle Status
//   const [isToggleConfirmOpen, setIsToggleConfirmOpen] = useState(false);
//   const [toggleUserId, setToggleUserId] = useState(null);
//   const [toggleUserStatus, setToggleUserStatus] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchEmployees();
//   }, [fetchEmployees]);

//   // ---- Confirm delete logic
//   const openDeleteDialog = (empId) => {
//     setSelectedEmployee(empId);
//     setIsConfirmOpen(true);
//   };

//   const handleCancelDelete = () => {
//     setSelectedEmployee(null);
//     setIsConfirmOpen(false);
//   };

//   const handleConfirmDelete = async () => {
//     if (!selectedEmployee) return;
//     await deleteEmployee(selectedEmployee);
//     setSelectedEmployee(null);
//     setIsConfirmOpen(false);
//   };

//   // ------------------------------ Toggle Status Logic ------------------------------
//   const openToggleDialog = (userId, currentStatus) => {
//     setToggleUserId(userId);
//     setToggleUserStatus(currentStatus);
//     setIsToggleConfirmOpen(true);
//   };

//   const handleCancelToggle = () => {
//     setToggleUserId(null);
//     setToggleUserStatus(false);
//     setIsToggleConfirmOpen(false);
//   };

//   const handleConfirmToggle = async () => {
//     if (!toggleUserId) return;
//     await toggleEmployeeStatus(toggleUserId, toggleUserStatus);
//     setIsToggleConfirmOpen(false);
//     setToggleUserId(null);
//     setToggleUserStatus(false);
//   };

//   const totalData = filteredEmployees.length;
//   const totalPages = Math.ceil(totalData / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentUsers = filteredEmployees.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

//   if (loading) {
//     return (
//       <div className="bg-bg-secondary ">
//         <Toaster />
//         <div className="max-w-7xl mx-auto px-4 mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {Array.from({ length: 8 }).map((_, index) => (
//             <SkeletonCard key={index} />
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 text-center text-red-600">
//         <Toaster />
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className=" bg-bg-secondary transition-colors duration-300 pb-4">
//       <Toaster />
//       <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
//         <div className="flex items-center space-x-2">
//           <label className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm">
//             Show
//           </label>
//           <select
//             className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-xs sm:text-sm dark:bg-gray-800 dark:text-gray-200"
//             value={itemsPerPage}
//             onChange={(e) => {
//               setItemsPerPage(parseInt(e.target.value, 10));
//               setCurrentPage(1);
//             }}
//           >
//             <option value="5">5</option>
//             <option value="10">10</option>
//             <option value="15">15</option>
//             <option value="20">20</option>
//           </select>
//         </div>
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search"
//             className="border border-gray-300 dark:border-gray-600 rounded pl-8 py-1 text-xs sm:text-sm dark:bg-gray-800 dark:text-gray-200"
//             value={searchTerm}
//             onChange={(e) => {
//               handleSearchChange(e.target.value);
//               setCurrentPage(1);
//             }}
//           />
//           <span className="absolute left-2 top-1.5 text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
//             <FaSearch />
//           </span>
//         </div>
//         <button
//           className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-xs sm:text-sm"
//           onClick={handleSortOrderChange}
//         >
//           {sortOrder === "asc" ? "Sort: A-Z" : "Sort: Z-A"}
//         </button>
//         {/* Keep this button logic as-is (currently commented out) */}
//         {/* {!hasOnlyEmployeeView && (
//           <button
//             className="bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm px-3 sm:px-4 py-2 rounded"
//             onClick={() => navigate(`/dashboard/add-employee`)}
//           >
//             + Add New User
//           </button>
//         )} */}
//       </div>
//       <div className="max-w-7xl mx-auto px-4 mt-6">
//         <h2 className="mb-4 text-lg font-bold dark:text-white">
//           Supordinates Employees: {totalEmployeeCount}
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {currentUsers.map((user) => {
//             const fullName = `${user.first_Name || ""} ${
//               user.last_Name || ""
//             }`.trim();
//             const status = user.isActive ? "ACTIVE" : "Inactive";

//             return (
//               <motion.div
//                 key={user._id}
//                 variants={cardVariants}
//                 initial="hidden"
//                 animate="visible"
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ duration: 0.2 }}
//                 className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl shadow-sm flex flex-col"
//               >
//                 <div className="relative h-20 bg-[#6D7F9B] dark:bg-gray-700">
//                   <span
//                     className={`absolute top-2 left-2 text-xs font-semibold uppercase px-3 py-1 rounded-full ${
//                       statusColors[status] || ""
//                     }`}
//                   >
//                     {status}
//                   </span>
//                   <div className="absolute top-2 right-2 flex space-x-2 text-text-primary">
//                     {canEditEmployee && (
//                       <button
//                         title="Edit"
//                         className="hover:text-gray-800 dark:hover:text-white"
//                         onClick={() =>
//                           navigate(
//                             `/dashboard/update-employee-manager/${user._id}`
//                           )
//                         }
//                       >
//                         <FaEdit />
//                       </button>
//                     )}
//                     {canDeleteEmployee && (
//                       <button
//                         title="Delete"
//                         className="hover:text-gray-800 dark:hover:text-white"
//                         onClick={() => openDeleteDialog(user.employee_Id)}
//                       >
//                         <FaTrash />
//                       </button>
//                     )}
//                   </div>
//                   <div className="absolute w-full flex justify-center -bottom-8">
//                     <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-600 border-white dark:border-gray-800 overflow-hidden">
//                       {user.user_Avatar ? (
//                         <img
//                           src={user.user_Avatar}
//                           alt="avatar"
//                           className="w-full h-full object-cover rounded-full"
//                         />
//                       ) : null}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="pt-10 px-4 pb-4 flex flex-col flex-grow justify-between text-center">
//                   <div>
//                     <p>{user.employee_Id}</p>
//                     <h2 className="font-semibold text-gray-800 dark:text-gray-50 text-sm sm:text-base md:text-lg">
//                       {fullName || "No Name"}
//                     </h2>
//                     <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-200 line-clamp-1">
//                       {user.working_Email_Id ||
//                         user.personal_Email_Id ||
//                         "N/A"}
//                     </p>
//                     <div className="flex justify-between items-center mt-4 bg-gray-50 dark:bg-gray-600 rounded-lg p-2">
//                       <div className="w-1/2 text-center border-r border-gray-200 dark:border-gray-700">
//                         <p className="font-medium text-xs sm:text-sm text-gray-700 dark:text-gray-200">
//                           {user.department || "N/A"}
//                         </p>
//                         <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-300 line-clamp-1">
//                           Department
//                         </p>
//                       </div>
//                       <div className="w-1/2 text-center">
//                         <p className="font-medium text-xs sm:text-sm text-gray-700 dark:text-gray-200 line-clamp-1">
//                           {user.designation || "N/A"}
//                         </p>
//                         <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-300">
//                           Designation
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                   {canToggleStatus && (
//                     <div className="mt-4 flex items-center justify-center gap-2">
//                       <label
//                         htmlFor={`toggleSwitch-${user._id}`}
//                         className="text-xs sm:text-sm font-semibold"
//                       >
//                         Status:
//                       </label>
//                       <input
//                         id={`toggleSwitch-${user._id}`}
//                         type="checkbox"
//                         className="cursor-pointer h-4 w-4 accent-blue-500"
//                         checked={user.isActive}
//                         onChange={() =>
//                           openToggleDialog(user.employee_Id, user.isActive)
//                         }
//                       />
//                     </div>
//                   )}
//                   {canViewProfile && (
//                     <button
//                       className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center"
//                       onClick={() =>
//                         navigate(`/dashboard/employees/details/${user._id}`)
//                       }
//                     >
//                       View Profile
//                       <FaArrowRight className="ml-2" />
//                     </button>
//                   )}
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//         {totalPages > 1 && (
//           <div className="flex justify-center items-center mt-8 space-x-2">
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//               <button
//                 key={page}
//                 onClick={() => handlePageChange(page)}
//                 className={`px-3 py-1 rounded border text-xs sm:text-sm ${
//                   page === currentPage
//                     ? "bg-blue-600 text-white border-blue-600"
//                     : "bg-white dark:bg-gray-700 dark:text-gray-200 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border-gray-300 dark:border-gray-600"
//                 }`}
//               >
//                 {page}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//       {/* Confirmation Dialog for Delete */}
//       <ConfirmationDialog
//         open={isConfirmOpen}
//         title="Confirm Deletion"
//         message="Are you sure you want to delete this user? This action cannot be undone."
//         onConfirm={handleConfirmDelete}
//         onCancel={handleCancelDelete}
//         confirmText="Delete"
//         cancelText="Cancel"
//       />
//       {/* Confirmation Dialog for Toggle Status */}
//       <ConfirmationDialog
//         open={isToggleConfirmOpen}
//         title="Confirm Status Change"
//         message={`Are you sure you want to ${
//           toggleUserStatus ? "deactivate" : "activate"
//         } this user?`}
//         onConfirm={handleConfirmToggle}
//         onCancel={handleCancelToggle}
//         confirmText={toggleUserStatus ? "Deactivate" : "Activate"}
//         cancelText="Cancel"
//       />
//     </div>
//   );
// }

// export default SupordinatesEmployess;



// import { useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { 
//   FaEdit, 
//   FaTrash, 
//   FaSearch, 
//   FaArrowRight, 
//   FaUsers,
//   FaUserCheck,
//   FaUserTimes,
//   FaChevronLeft,
//   FaChevronRight,
//   FaChevronDown,
//   FaIdCard,
//   FaBuilding,
//   FaUser,
//   FaEnvelope
// } from "react-icons/fa";
// import { 
//   HiViewGrid, 
//   HiViewList,
//   HiChevronDoubleLeft,
//   HiChevronDoubleRight,
//   HiFilter
// } from "react-icons/hi";
// import useEmployeesStore from "../../store/useAllEmployeesStore";
// import ConfirmationDialog from "../common/ConfirmationDialog";
// import useAuthStore from "../../store/store"; 

// const statusColors = {
//   ACTIVE: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
//   Inactive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
//   REMOTE: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
//   "ON LEAVE": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
// };

// const SkeletonCard = () => (
//   <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
//     <div className="flex items-center justify-between mb-4">
//       <div className="flex items-center space-x-3">
//         <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
//         <div className="space-y-2">
//           <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
//           <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
//         </div>
//       </div>
//       <div className="w-16 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
//     </div>
//     <div className="space-y-3">
//       <div className="flex items-center space-x-2">
//         <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
//         <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
//       </div>
//       <div className="flex items-center space-x-2">
//         <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
//         <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
//       </div>
//       <div className="flex items-center space-x-2">
//         <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
//         <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-28"></div>
//       </div>
//     </div>
//     <div className="mt-4 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
//   </div>
// );

// function SubordinatesEmployees() {
//   const {
//     employees,
//     filteredEmployees,
//     totalEmployeeCount,
//     searchTerm,
//     sortOrder,
//     loading,
//     error,
//     fetchEmployees,
//     handleSearchChange,
//     handleSortOrderChange,
//     deleteEmployee,
//     toggleEmployeeStatus,
//   } = useEmployeesStore();

//   // Auth store to get "permissions"
//   const { permissions } = useAuthStore((state) => state);

//   // Derive helpful booleans
//   const canDeleteEmployee = permissions?.includes("employee-delete-subordinate");
//   const canToggleStatus = permissions?.includes("employee-status-subordinate");
//   const canViewProfile = permissions?.includes("employee-view-only");
//   const canEditEmployee = permissions?.includes("employee-update-subordinate");

//   const [itemsPerPage, setItemsPerPage] = useState(12);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [viewMode, setViewMode] = useState("card"); // card or table
//   const [isAutoToggle, setIsAutoToggle] = useState(true);

//   // ---- State for ConfirmationDialog
//   const [isConfirmOpen, setIsConfirmOpen] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);

//   // -- New Confirmation for Toggle Status
//   const [isToggleConfirmOpen, setIsToggleConfirmOpen] = useState(false);
//   const [toggleUserId, setToggleUserId] = useState(null);
//   const [toggleUserStatus, setToggleUserStatus] = useState(false);

//   const navigate = useNavigate();

//   // Auto-toggle based on screen size
//   useEffect(() => {
//     if (isAutoToggle) {
//       const handleResize = () => {
//         setViewMode(window.innerWidth < 768 ? "card" : "card"); // Keep cards as default
//       };
      
//       handleResize();
//       window.addEventListener("resize", handleResize);
      
//       return () => window.removeEventListener("resize", handleResize);
//     }
//   }, [isAutoToggle]);

//   useEffect(() => {
//     fetchEmployees();
//   }, [fetchEmployees]);

//   // ---- Confirm delete logic
//   const openDeleteDialog = (empId) => {
//     setSelectedEmployee(empId);
//     setIsConfirmOpen(true);
//   };

//   const handleCancelDelete = () => {
//     setSelectedEmployee(null);
//     setIsConfirmOpen(false);
//   };

//   const handleConfirmDelete = async () => {
//     if (!selectedEmployee) return;
//     await deleteEmployee(selectedEmployee);
//     setSelectedEmployee(null);
//     setIsConfirmOpen(false);
//   };

//   // Toggle Status Logic
//   const openToggleDialog = (userId, currentStatus) => {
//     setToggleUserId(userId);
//     setToggleUserStatus(currentStatus);
//     setIsToggleConfirmOpen(true);
//   };

//   const handleCancelToggle = () => {
//     setToggleUserId(null);
//     setToggleUserStatus(false);
//     setIsToggleConfirmOpen(false);
//   };

//   const handleConfirmToggle = async () => {
//     if (!toggleUserId) return;
//     await toggleEmployeeStatus(toggleUserId, toggleUserStatus);
//     setIsToggleConfirmOpen(false);
//     setToggleUserId(null);
//     setToggleUserStatus(false);
//   };

//   // Pagination logic
//   const totalData = filteredEmployees.length;
//   const totalPages = Math.ceil(totalData / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentUsers = filteredEmployees.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   // Modern pagination functions
//   const goToFirstPage = () => setCurrentPage(1);
//   const goToLastPage = () => setCurrentPage(totalPages);
//   const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
//   const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
//   const goToPage = (page) => setCurrentPage(page);

//   // Get page numbers for pagination
//   const getPageNumbers = () => {
//     const pages = [];
//     const maxVisible = 5;
//     let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
//     let end = Math.min(totalPages, start + maxVisible - 1);
    
//     if (end - start + 1 < maxVisible) {
//       start = Math.max(1, end - maxVisible + 1);
//     }
    
//     for (let i = start; i <= end; i++) {
//       pages.push(i);
//     }
    
//     return pages;
//   };

//   const handleViewModeToggle = (mode) => {
//     setViewMode(mode);
//     setIsAutoToggle(false);
//   };

//   const handleAutoToggle = () => {
//     setIsAutoToggle(!isAutoToggle);
//     if (!isAutoToggle) {
//       setViewMode("card");
//     }
//   };

//   // Employee Card Component
//   const EmployeeCard = ({ user }) => {
//     const fullName = `${user.first_Name || ""} ${user.last_Name || ""}`.trim();
//     const status = user.isActive ? "ACTIVE" : "Inactive";
//     const email = user.working_Email_Id || user.personal_Email_Id || "N/A";

//     return (
//       <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-200 dark:hover:border-blue-700 transform hover:-translate-y-1">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center space-x-3 min-w-0 flex-1">
//             <div className="relative flex-shrink-0">
//               {user.user_Avatar ? (
//                 <img
//                   src={user.user_Avatar}
//                   alt={fullName}
//                   className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-600"
//                 />
//               ) : (
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
//                   <FaUser className="w-6 h-6 text-white" />
//                 </div>
//               )}
//               <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${
//                 user.isActive ? "bg-green-500" : "bg-red-500"
//               }`}></div>
//             </div>
//             <div className="min-w-0 flex-1">
//               <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm truncate">
//                 {fullName || "No Name"}
//               </h3>
//               <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
//                 {email}
//               </p>
//             </div>
//           </div>
//           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
//             statusColors[status] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
//           }`}>
//             {status}
//           </span>
//         </div>

//         {/* Details */}
//         <div className="space-y-3 mb-4">
//           <div className="flex items-center space-x-2">
//             <FaIdCard className="w-4 h-4 text-blue-500 flex-shrink-0" />
//             <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
//               ID: {user.employee_Id}
//             </span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <FaBuilding className="w-4 h-4 text-purple-500 flex-shrink-0" />
//             <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
//               {user.department || "N/A"}
//             </span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <FaUser className="w-4 h-4 text-orange-500 flex-shrink-0" />
//             <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
//               {user.designation || "N/A"}
//             </span>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="space-y-3">
//           {/* Status Toggle */}
//           {canToggleStatus && (
//             <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
//               <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</span>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   className="sr-only peer"
//                   checked={user.isActive}
//                   onChange={() => openToggleDialog(user.employee_Id, user.isActive)}
//                 />
//                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
//               </label>
//             </div>
//           )}

//           {/* Action Buttons */}
//           <div className="flex space-x-2">
//             {canViewProfile && (
//               <button
//                 className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-1"
//                 onClick={() => navigate(`/dashboard/employees/details/${user._id}`)}
//               >
//                 <span>View Profile</span>
//                 <FaArrowRight className="w-3 h-3" />
//               </button>
//             )}
            
//             <div className="flex space-x-1">
//               {canEditEmployee && (
//                 <button
//                   title="Edit Employee"
//                   className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-all duration-200"
//                   onClick={() => navigate(`/dashboard/update-employee-manager/${user._id}`)}
//                 >
//                   <FaEdit className="w-4 h-4" />
//                 </button>
//               )}
//               {canDeleteEmployee && (
//                 <button
//                   title="Delete Employee"
//                   className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-all duration-200"
//                   onClick={() => openDeleteDialog(user.employee_Id)}
//                 >
//                   <FaTrash className="w-4 h-4" />
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
//         <Toaster />
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {Array.from({ length: 8 }).map((_, index) => (
//               <SkeletonCard key={index} />
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
//         <Toaster />
//         <div className="text-center space-y-4">
//           <div className="text-6xl text-red-600 dark:text-red-400">⚠️</div>
//           <div className="space-y-2">
//             <h2 className="text-2xl font-bold text-red-800 dark:text-red-200">Error Loading Data</h2>
//             <p className="text-red-600 dark:text-red-400">{error}</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 transition-colors duration-200">
//       <Toaster />
      
//       {/* Header */}
//       <div className="max-w-7xl mx-auto mb-8">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-6">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
//               <FaUsers className="text-blue-600 dark:text-blue-400" />
//               <span>Subordinate Employees</span>
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400 mt-1">
//               Total: {totalEmployeeCount} employees
//             </p>
//           </div>
//         </div>

//         {/* Controls */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
//             {/* Left Controls */}
//             <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
//               {/* Items per page */}
//               <div className="flex items-center space-x-2">
//                 <span className="text-sm text-gray-600 dark:text-gray-400">Show:</span>
//                 <select
//                   value={itemsPerPage}
//                   onChange={(e) => {
//                     setItemsPerPage(parseInt(e.target.value, 10));
//                     setCurrentPage(1);
//                   }}
//                   className="border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//                 >
//                   <option value={6}>6</option>
//                   <option value={12}>12</option>
//                   <option value={24}>24</option>
//                   <option value={48}>48</option>
//                 </select>
//               </div>

//               {/* Sort */}
//               <button
//                 onClick={handleSortOrderChange}
//                 className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
//               >
//                 <HiFilter className="w-4 h-4" />
//                 <span className="text-sm">{sortOrder === "asc" ? "A-Z" : "Z-A"}</span>
//               </button>
//             </div>

//             {/* Right Controls */}
//             <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
//               {/* Search */}
//               <div className="relative">
//                 <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search employees..."
//                   value={searchTerm}
//                   onChange={(e) => {
//                     handleSearchChange(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-full sm:w-64 transition-all duration-200"
//                 />
//               </div>

//               {/* View Toggle */}
//               <div className="flex items-center space-x-2">
//                 <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
//                   <button
//                     onClick={() => handleViewModeToggle("table")}
//                     className={`p-2 rounded-md transition-all duration-200 ${
//                       viewMode === "table"
//                         ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm"
//                         : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
//                     }`}
//                     title="Table View"
//                   >
//                     <HiViewList className="w-4 h-4" />
//                   </button>
//                   <button
//                     onClick={() => handleViewModeToggle("card")}
//                     className={`p-2 rounded-md transition-all duration-200 ${
//                       viewMode === "card"
//                         ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm"
//                         : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
//                     }`}
//                     title="Card View"
//                   >
//                     <HiViewGrid className="w-4 h-4" />
//                   </button>
//                 </div>
                
//                 <button
//                   onClick={handleAutoToggle}
//                   className={`px-3 py-2 text-xs font-medium rounded-md transition-all duration-200 ${
//                     isAutoToggle
//                       ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
//                       : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
//                   }`}
//                   title="Auto toggle between views based on screen size"
//                 >
//                   Auto
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         {currentUsers.length === 0 ? (
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
//             <FaUsers className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No employees found</h3>
//             <p className="text-gray-600 dark:text-gray-400">
//               {searchTerm ? "Try adjusting your search terms" : "No subordinate employees available"}
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {currentUsers.map((user) => (
//               <EmployeeCard key={user._id} user={user} />
//             ))}
//           </div>
//         )}

//         {/* Modern Pagination */}
//         {totalPages > 1 && (
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mt-6">
//             <div className="px-6 py-4">
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
//                 {/* Results info */}
//                 <div className="text-sm text-gray-600 dark:text-gray-400">
//                   Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
//                   <span className="font-medium">
//                     {Math.min(startIndex + itemsPerPage, totalData)}
//                   </span>{" "}
//                   of <span className="font-medium">{totalData}</span> results
//                 </div>

//                 {/* Pagination controls */}
//                 <div className="flex items-center space-x-2">
//                   {/* First page */}
//                   <button
//                     onClick={goToFirstPage}
//                     disabled={currentPage === 1}
//                     className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
//                     title="First page"
//                   >
//                     <HiChevronDoubleLeft className="w-4 h-4" />
//                   </button>

//                   {/* Previous page */}
//                   <button
//                     onClick={goToPrevPage}
//                     disabled={currentPage === 1}
//                     className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
//                     title="Previous page"
//                   >
//                     <FaChevronLeft className="w-4 h-4" />
//                   </button>

//                   {/* Page numbers */}
//                   <div className="flex items-center space-x-1">
//                     {getPageNumbers().map((page) => (
//                       <button
//                         key={page}
//                         onClick={() => goToPage(page)}
//                         className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
//                           currentPage === page
//                             ? "bg-blue-600 text-white shadow-sm"
//                             : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//                         }`}
//                       >
//                         {page}
//                       </button>
//                     ))}
//                   </div>

//                   {/* Next page */}
//                   <button
//                     onClick={goToNextPage}
//                     disabled={currentPage === totalPages}
//                     className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
//                     title="Next page"
//                   >
//                     <FaChevronRight className="w-4 h-4" />
//                   </button>

//                   {/* Last page */}
//                   <button
//                     onClick={goToLastPage}
//                     disabled={currentPage === totalPages}
//                     className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
//                     title="Last page"
//                   >
//                     <HiChevronDoubleRight className="w-4 h-4" />
//                   </button>

//                   {/* Jump to page */}
//                   <div className="hidden sm:flex items-center space-x-2 ml-4">
//                     <span className="text-sm text-gray-600 dark:text-gray-400">Go to:</span>
//                     <input
//                       type="number"
//                       min="1"
//                       max={totalPages}
//                       value={currentPage}
//                       onChange={(e) => {
//                         const page = Number(e.target.value);
//                         if (page >= 1 && page <= totalPages) {
//                           goToPage(page);
//                         }
//                       }}
//                       className="w-16 px-2 py-1 text-sm border border-gray-200 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Confirmation Dialog for Delete */}
//       <ConfirmationDialog
//         open={isConfirmOpen}
//         title="Confirm Deletion"
//         message="Are you sure you want to delete this employee? This action cannot be undone."
//         onConfirm={handleConfirmDelete}
//         onCancel={handleCancelDelete}
//         confirmText="Delete"
//         cancelText="Cancel"
//         type="danger"
//         destructive={true}
//       />

//       {/* Confirmation Dialog for Toggle Status */}
//       <ConfirmationDialog
//         open={isToggleConfirmOpen}
//         title="Confirm Status Change"
//         message={`Are you sure you want to ${
//           toggleUserStatus ? "deactivate" : "activate"
//         } this employee?`}
//         onConfirm={handleConfirmToggle}
//         onCancel={handleCancelToggle}
//         confirmText={toggleUserStatus ? "Deactivate" : "Activate"}
//         cancelText="Cancel"
//         type="warning"
//       />
//     </div>
//   );
// }

// export default SubordinatesEmployees;

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";


import { useNavigate } from "react-router-dom";
import { 
  FaEdit, 
  FaTrash, 
  FaSearch, 
  FaArrowRight, 
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaIdCard,
  FaBuilding,
  FaUser,
  FaEnvelope
} from "react-icons/fa";
import { 
  HiViewGrid, 
  HiViewList,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiFilter
} from "react-icons/hi";
import useEmployeesStore from "../../store/useAllEmployeesStore";
import ConfirmationDialog from "../common/ConfirmationDialog";
import useAuthStore from "../../store/store"; 

const statusColors = {
  ACTIVE: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Inactive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  REMOTE: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "ON LEAVE": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
};

const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
        </div>
      </div>
      <div className="w-16 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
    </div>
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-28"></div>
      </div>
    </div>
    <div className="mt-4 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
  </div>
);

function SubordinatesEmployees() {
  const {
    employees,
    filteredEmployees,
    totalEmployeeCount,
    searchTerm,
    sortOrder,
    loading,
    error,
    fetchEmployees,
    handleSearchChange,
    handleSortOrderChange,
    deleteEmployee,
    toggleEmployeeStatus,
  } = useEmployeesStore();

  // Auth store to get "permissions"
  const { permissions } = useAuthStore((state) => state);

  // Derive helpful booleans
  const canDeleteEmployee = permissions?.includes("employee-delete-subordinate");
  const canToggleStatus = permissions?.includes("employee-status-subordinate");
  const canViewProfile = permissions?.includes("employee-view-only");
  const canEditEmployee = permissions?.includes("employee-update-subordinate");

  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("card"); // card or table
  const [isAutoToggle, setIsAutoToggle] = useState(true);

  // ---- State for ConfirmationDialog
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // -- New Confirmation for Toggle Status
  const [isToggleConfirmOpen, setIsToggleConfirmOpen] = useState(false);
  const [toggleUserId, setToggleUserId] = useState(null);
  const [toggleUserStatus, setToggleUserStatus] = useState(false);

  const navigate = useNavigate();

  // Auto-toggle based on screen size
  useEffect(() => {
    if (isAutoToggle) {
      const handleResize = () => {
        setViewMode(window.innerWidth >= 1024 ? "table" : "card"); // Desktop shows table, tablet/mobile shows cards
      };
      
      handleResize();
      window.addEventListener("resize", handleResize);
      
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [isAutoToggle]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // ---- Confirm delete logic
  const openDeleteDialog = (empId) => {
    setSelectedEmployee(empId);
    setIsConfirmOpen(true);
  };

  const handleCancelDelete = () => {
    setSelectedEmployee(null);
    setIsConfirmOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedEmployee) return;
    await deleteEmployee(selectedEmployee);
    setSelectedEmployee(null);
    setIsConfirmOpen(false);
  };

  // Toggle Status Logic
  const openToggleDialog = (userId, currentStatus) => {
    setToggleUserId(userId);
    setToggleUserStatus(currentStatus);
    setIsToggleConfirmOpen(true);
  };

  const handleCancelToggle = () => {
    setToggleUserId(null);
    setToggleUserStatus(false);
    setIsToggleConfirmOpen(false);
  };

  const handleConfirmToggle = async () => {
    if (!toggleUserId) return;
    await toggleEmployeeStatus(toggleUserId, toggleUserStatus);
    setIsToggleConfirmOpen(false);
    setToggleUserId(null);
    setToggleUserStatus(false);
  };

  // Pagination logic
  const totalData = filteredEmployees.length;
  const totalPages = Math.ceil(totalData / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredEmployees.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Modern pagination functions
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPage = (page) => setCurrentPage(page);

  // Get page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const handleViewModeToggle = (mode) => {
    setViewMode(mode);
    setIsAutoToggle(false);
  };

  const handleAutoToggle = () => {
    setIsAutoToggle(!isAutoToggle);
    if (!isAutoToggle) {
      setViewMode(window.innerWidth >= 1024 ? "table" : "card");
    }
  };

  // Employee Card Component
  const EmployeeCard = ({ user }) => {
    const fullName = `${user.first_Name || ""} ${user.last_Name || ""}`.trim();
    const status = user.isActive ? "ACTIVE" : "Inactive";
    const email = user.working_Email_Id || user.personal_Email_Id || "N/A";

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-200 dark:hover:border-blue-700 transform hover:-translate-y-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div className="relative flex-shrink-0">
              {user.user_Avatar ? (
                <img
                  src={user.user_Avatar}
                  alt={fullName}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-600"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <FaUser className="w-6 h-6 text-white" />
                </div>
              )}
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${
                user.isActive ? "bg-green-500" : "bg-red-500"
              }`}></div>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm truncate">
                {fullName || "No Name"}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {email}
              </p>
            </div>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
            statusColors[status] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
          }`}>
            {status}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-2">
            <FaIdCard className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
              ID: {user.employee_Id}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaBuilding className="w-4 h-4 text-purple-500 flex-shrink-0" />
            <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
              {user.department || "N/A"}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaUser className="w-4 h-4 text-orange-500 flex-shrink-0" />
            <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
              {user.designation || "N/A"}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {/* Status Toggle */}
          {canToggleStatus && (
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={user.isActive}
                  onChange={() => openToggleDialog(user.employee_Id, user.isActive)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2">
            {canViewProfile && (
              <button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-1"
                onClick={() => navigate(`/dashboard/employees/details/${user._id}`)}
              >
                <span>View Profile</span>
                <FaArrowRight className="w-3 h-3" />
              </button>
            )}
            
            <div className="flex space-x-1">
              {canEditEmployee && (
                <button
                  title="Edit Employee"
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-all duration-200"
                  onClick={() => navigate(`/dashboard/update-employee-manager/${user._id}`)}
                >
                  <FaEdit className="w-4 h-4" />
                </button>
              )}
              {canDeleteEmployee && (
                <button
                  title="Delete Employee"
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-all duration-200"
                  onClick={() => openDeleteDialog(user.employee_Id)}
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
        <Toaster />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Toaster />
        <div className="text-center space-y-4">
          <div className="text-6xl text-red-600 dark:text-red-400">⚠️</div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-red-800 dark:text-red-200">Error Loading Data</h2>
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 transition-colors duration-200">
      <Toaster />
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
              <FaUsers className="text-blue-600 dark:text-blue-400" />
              <span>Subordinate Employees</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Total: {totalEmployeeCount} employees
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Left Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              {/* Items per page */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Show:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(parseInt(e.target.value, 10));
                    setCurrentPage(1);
                  }}
                  className="border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <option value={6}>6</option>
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={48}>48</option>
                </select>
              </div>

              {/* Sort */}
              <button
                onClick={handleSortOrderChange}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
              >
                <HiFilter className="w-4 h-4" />
                <span className="text-sm">{sortOrder === "asc" ? "A-Z" : "Z-A"}</span>
              </button>
            </div>

            {/* Right Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              {/* Search */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => {
                    handleSearchChange(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-full sm:w-64 transition-all duration-200"
                />
              </div>

              {/* View Toggle */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => handleViewModeToggle("table")}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewMode === "table"
                        ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    }`}
                    title="Table View"
                  >
                    <HiViewList className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleViewModeToggle("card")}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewMode === "card"
                        ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    }`}
                    title="Card View"
                  >
                    <HiViewGrid className="w-4 h-4" />
                  </button>
                </div>
                
                <button
                  onClick={handleAutoToggle}
                  className={`px-3 py-2 text-xs font-medium rounded-md transition-all duration-200 ${
                    isAutoToggle
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  }`}
                  title="Auto toggle between views based on screen size"
                >
                  Auto
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {currentUsers.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <FaUsers className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No employees found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm ? "Try adjusting your search terms" : "No subordinate employees available"}
            </p>
          </div>
        ) : (
          <>
            {/* Table View - Desktop */}
            {viewMode === "table" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400 text-sm">Employee</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400 text-sm">Employee ID</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400 text-sm">Department</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400 text-sm">Designation</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400 text-sm">Status</th>
                        <th className="text-center py-4 px-6 font-medium text-gray-600 dark:text-gray-400 text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {currentUsers.map((user) => {
                        const fullName = `${user.first_Name || ""} ${user.last_Name || ""}`.trim();
                        const status = user.isActive ? "ACTIVE" : "Inactive";
                        const email = user.working_Email_Id || user.personal_Email_Id || "N/A";

                        return (
                          <tr
                            key={user._id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                          >
                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-3">
                                <div className="relative flex-shrink-0">
                                  {user.user_Avatar ? (
                                    <img
                                      src={user.user_Avatar}
                                      alt={fullName}
                                      className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-600"
                                    />
                                  ) : (
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                      <FaUser className="w-5 h-5 text-white" />
                                    </div>
                                  )}
                                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
                                    user.isActive ? "bg-green-500" : "bg-red-500"
                                  }`}></div>
                                </div>
                                <div className="min-w-0">
                                  <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                    {fullName || "No Name"}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                    {email}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-gray-600 dark:text-gray-300 font-mono text-sm">
                              {user.employee_Id}
                            </td>
                            <td className="py-4 px-6 text-gray-600 dark:text-gray-300">
                              {user.department || "N/A"}
                            </td>
                            <td className="py-4 px-6 text-gray-600 dark:text-gray-300">
                              {user.designation || "N/A"}
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-3">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  statusColors[status] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                                }`}>
                                  {status}
                                </span>
                                {canToggleStatus && (
                                  <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                      type="checkbox"
                                      className="sr-only peer"
                                      checked={user.isActive}
                                      onChange={() => openToggleDialog(user.employee_Id, user.isActive)}
                                    />
                                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                  </label>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center justify-center space-x-2">
                                {canViewProfile && (
                                  <button
                                    title="View Profile"
                                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-all duration-200"
                                    onClick={() => navigate(`/dashboard/employees/details/${user._id}`)}
                                  >
                                    <FaArrowRight className="w-4 h-4" />
                                  </button>
                                )}
                                {canEditEmployee && (
                                  <button
                                    title="Edit Employee"
                                    className="p-2 text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900 rounded-lg transition-all duration-200"
                                    onClick={() => navigate(`/dashboard/update-employee-manager/${user._id}`)}
                                  >
                                    <FaEdit className="w-4 h-4" />
                                  </button>
                                )}
                                {canDeleteEmployee && (
                                  <button
                                    title="Delete Employee"
                                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-all duration-200"
                                    onClick={() => openDeleteDialog(user.employee_Id)}
                                  >
                                    <FaTrash className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Card View - Mobile/Tablet */}
            {viewMode === "card" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentUsers.map((user) => (
                  <EmployeeCard key={user._id} user={user} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Modern Pagination */}
        {totalPages > 1 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mt-6">
            <div className="px-6 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                {/* Results info */}
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(startIndex + itemsPerPage, totalData)}
                  </span>{" "}
                  of <span className="font-medium">{totalData}</span> results
                </div>

                {/* Pagination controls */}
                <div className="flex items-center space-x-2">
                  {/* First page */}
                  <button
                    onClick={goToFirstPage}
                    disabled={currentPage === 1}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    title="First page"
                  >
                    <HiChevronDoubleLeft className="w-4 h-4" />
                  </button>

                  {/* Previous page */}
                  <button
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    title="Previous page"
                  >
                    <FaChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Page numbers */}
                  <div className="flex items-center space-x-1">
                    {getPageNumbers().map((page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                          currentPage === page
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  {/* Next page */}
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    title="Next page"
                  >
                    <FaChevronRight className="w-4 h-4" />
                  </button>

                  {/* Last page */}
                  <button
                    onClick={goToLastPage}
                    disabled={currentPage === totalPages}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    title="Last page"
                  >
                    <HiChevronDoubleRight className="w-4 h-4" />
                  </button>

                  {/* Jump to page */}
                  <div className="hidden sm:flex items-center space-x-2 ml-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Go to:</span>
                    <input
                      type="number"
                      min="1"
                      max={totalPages}
                      value={currentPage}
                      onChange={(e) => {
                        const page = Number(e.target.value);
                        if (page >= 1 && page <= totalPages) {
                          goToPage(page);
                        }
                      }}
                      className="w-16 px-2 py-1 text-sm border border-gray-200 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Dialog for Delete */}
      <ConfirmationDialog
        open={isConfirmOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this employee? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        destructive={true}
      />

      {/* Confirmation Dialog for Toggle Status */}
      <ConfirmationDialog
        open={isToggleConfirmOpen}
        title="Confirm Status Change"
        message={`Are you sure you want to ${
          toggleUserStatus ? "deactivate" : "activate"
        } this employee?`}
        onConfirm={handleConfirmToggle}
        onCancel={handleCancelToggle}
        confirmText={toggleUserStatus ? "Deactivate" : "Activate"}
        cancelText="Cancel"
        type="warning"
      />
    </div>
  );
}

export default SubordinatesEmployees;
