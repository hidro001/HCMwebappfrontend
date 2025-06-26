// import React, { useEffect, useState, useMemo } from "react";
// import { motion } from "framer-motion";
// import {
//   FaEdit,
//   FaEye,
//   FaTrash,
//   FaUsers,
//   FaUserCheck,
//   FaUserSlash,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import useEmployeesStore from "../../store/useAllEmployeesStore";
// import ConfirmationDialog from "../common/ConfirmationDialog";

// import departmentStore from "../../store/departmentStore";

// const tableContainerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       when: "beforeChildren",
//       staggerChildren: 0.05,
//     },
//   },
// };

// const tableRowVariants = {
//   hidden: { opacity: 0, y: 10 },
//   visible: { opacity: 1, y: 0 },
// };

// // Skeleton row
// function TableRowSkeleton({ colCount }) {
//   return (
//     <motion.tr
//       className="animate-pulse border-b last:border-b-0 border-gray-200 dark:border-gray-600"
//       variants={tableRowVariants}
//     >
//       {Array.from({ length: colCount }).map((_, idx) => (
//         <td key={idx} className="p-3">
//           <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
//         </td>
//       ))}
//     </motion.tr>
//   );
// }

// // Skeleton for the tbody
// function TableBodySkeleton({ rowCount, colCount }) {
//   return (
//     <>
//       {Array.from({ length: rowCount }).map((_, idx) => (
//         <TableRowSkeleton key={idx} colCount={colCount} />
//       ))}
//     </>
//   );
// }

// export default function EmployeeList() {
//   const {
//     getAllEmployeesApi,
//     filteredEmployees,
//     handleSearchChange,
//     totalEmployeeCount,
//     loading,
//     deleteEmployee,
//     toggleEmployeeStatus,
//   } = useEmployeesStore();

//   const { departments } = departmentStore();

//   console.log("asfasf", departments);

//   const [pageSize, setPageSize] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [departmentFilter, setDepartmentFilter] = useState("");
//   const [searchText, setSearchText] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     getAllEmployeesApi();
//   }, [getAllEmployeesApi]);

//   useEffect(() => {
//     handleSearchChange(searchText);
//     setCurrentPage(1);
//   }, [searchText, handleSearchChange]);

//   const departmentFilteredData = useMemo(() => {
//     if (!departmentFilter || departmentFilter === "All") {
//       return filteredEmployees;
//     }
//     return filteredEmployees.filter(
//       (emp) => emp.department === departmentFilter
//     );
//   }, [filteredEmployees, departmentFilter]);

//   const totalPages = Math.ceil(departmentFilteredData.length / pageSize);

//   const paginatedEmployees = useMemo(() => {
//     const startIndex = (currentPage - 1) * pageSize;
//     return departmentFilteredData.slice(startIndex, startIndex + pageSize);
//   }, [departmentFilteredData, currentPage, pageSize]);

//   const totalActive = filteredEmployees.filter((emp) => emp.isActive).length;
//   const totalInactive = filteredEmployees.filter((emp) => !emp.isActive).length;
//   // ---- State for ConfirmationDialog
//   const [isConfirmOpen, setIsConfirmOpen] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);

//   // -- New Confirmation for Toggle Status
//   const [isToggleConfirmOpen, setIsToggleConfirmOpen] = useState(false);
//   const [toggleUserId, setToggleUserId] = useState(null);
//   const [toggleUserStatus, setToggleUserStatus] = useState(false);

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
//   // 1) Open the dialog with user info
//   const openToggleDialog = (userId, currentStatus) => {
//     setToggleUserId(userId);
//     setToggleUserStatus(currentStatus); // e.g. true/false
//     setIsToggleConfirmOpen(true);
//   };

//   // 2) Close without action
//   const handleCancelToggle = () => {
//     setToggleUserId(null);
//     setToggleUserStatus(false);
//     setIsToggleConfirmOpen(false);
//   };

//   // 3) Confirm status change
//   const handleConfirmToggle = async () => {
//     if (!toggleUserId) return;
//     await toggleEmployeeStatus(toggleUserId, toggleUserStatus);
//     setIsToggleConfirmOpen(false);
//     setToggleUserId(null);
//     setToggleUserStatus(false);
//   };

//   return (
//     <div
//       className="
//         min-h-screen 
//         bg-gray-50 dark:bg-gray-900 
//         text-gray-700 dark:text-gray-100 
//         transition-colors
//       "
//     >
//       {/* Cards for summary */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         {/* Total Employee Card */}
//         <div
//           className="
//             bg-white dark:bg-gray-800 
//             rounded-xl p-4 shadow-sm flex flex-col 
//             transition-colors
//           "
//         >
//           <div className="flex items-center justify-between">
//             <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-200">
//               Total Employee
//             </h2>
//             <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-pink-400 flex items-center justify-center">
//               <FaUsers className="text-white" />
//             </div>
//           </div>
//           <div className="mt-2 text-2xl font-bold text-gray-800 dark:text-gray-100">
//             {totalEmployeeCount}
//           </div>
//           {/* <div className="text-xs text-green-500 mt-1">
//               +5000 Last 30 days Employee
//             </div> */}
//         </div>

//         {/* Total Active Card */}
//         <div
//           className="
//             bg-white dark:bg-gray-800 
//             rounded-xl p-4 shadow-sm flex flex-col 
//             transition-colors
//           "
//         >
//           <div className="flex items-center justify-between">
//             <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-200">
//               Total Active
//             </h2>
//             <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-purple-400 flex items-center justify-center">
//               <FaUserCheck className="text-white" />
//             </div>
//           </div>
//           <div className="mt-2 text-2xl font-bold text-gray-800 dark:text-gray-100">
//             {totalActive}
//           </div>
//           {/* <div className="text-xs text-red-500 mt-1">
//             -800 Last 30 days Active
//           </div> */}
//         </div>

//         {/* Total Inactive Card */}
//         <div
//           className="
//             bg-white dark:bg-gray-800 
//             rounded-xl p-4 shadow-sm flex flex-col 
//             transition-colors
//           "
//         >
//           <div className="flex items-center justify-between">
//             <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-200">
//               Total Inactive
//             </h2>
//             <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-blue-400 flex items-center justify-center">
//               <FaUserSlash className="text-white" />
//             </div>
//           </div>
//           <div className="mt-2 text-2xl font-bold text-gray-800 dark:text-gray-100">
//             {totalInactive}
//           </div>
//           {/* <div className="text-xs text-green-500 mt-1">
//             +200 Last 30 days Inactive
//           </div> */}
//         </div>
//       </div>

//       <h1 className="text-xl font-semibold mb-3">Employee List</h1>

//       {/* Filter Bar */}
//       <div
//         className="
//           flex flex-wrap items-center justify-between 
//           bg-white dark:bg-gray-800 
//           p-4 rounded-md shadow-sm mb-4 
//           transition-colors
//         "
//       >
//         <div className="flex items-center space-x-4">
//           <div className="flex items-center space-x-2">
//             <label className="text-sm font-medium">Show</label>
//             <select
//               value={pageSize}
//               onChange={(e) => {
//                 setPageSize(+e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="
//                 border rounded px-2 py-1 text-sm 
//                 bg-white dark:bg-gray-700 
//                 dark:text-gray-100 
//                 focus:outline-none
//               "
//             >
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={20}>20</option>
//             </select>
//           </div>
//           <div>
//             <input
//               className="
//                 border rounded px-3 py-1 text-sm 
//                 bg-white dark:bg-gray-700 
//                 dark:text-gray-100 
//                 focus:outline-none
//               "
//               placeholder="Search"
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="flex items-center space-x-4 mt-2 md:mt-0">
//           <select
//             value={departmentFilter}
//             onChange={(e) => {
//               setDepartmentFilter(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="
//               border rounded px-2 py-1 text-sm 
//               bg-white dark:bg-gray-700 
//               dark:text-gray-100 
//               focus:outline-none
//             "
//           >
//             {/* <option value="">De (All)</option>
//             <option value="IT">IT</option>
//             <option value="HR">HR</option>
//             <option value="Sales">Sales</option> */}

//             <option value="">All Departments</option>

//             {/* Dynamically render each department from the store */}
//             {departments.map((dept) => (
//               <option key={dept._id} value={dept.department}>
//                 {dept.department}
//               </option>
//             ))}
//           </select>
//           <button
//             className="
//               bg-blue-600 text-white rounded px-4 py-2 text-sm font-medium 
//               hover:bg-blue-700 transition-colors
//             "
//             onClick={() => navigate(`/dashboard/add-employee`)}
//           >
//             + Add New User
//           </button>
//         </div>
//       </div>

//       {/* TABLE CONTAINER */}
//       <motion.div
//         className="
//           bg-white dark:bg-gray-800 
//           rounded-md shadow-sm 
//           overflow-auto  
//           [&::-webkit-scrollbar]:w-1
//           [&::-webkit-scrollbar-track]:rounded-full
//           [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
//           [&::-webkit-scrollbar-thumb]:rounded-full
//           [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
//           transition-colors duration-300
//         "
//         variants={tableContainerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <motion.table className="w-full text-left border-collapse min-w-max">
//           <thead className="bg-gray-50 dark:bg-gray-700 transition-colors">
//             <tr>
//               <th className="p-3 text-sm font-semibold">S.L</th>
//               <th className="p-3 text-sm font-semibold">Join Date</th>
//               <th className="p-3 text-sm font-semibold">Name</th>
//               <th className="p-3 text-sm font-semibold">Email</th>
//               <th className="p-3 text-sm font-semibold">Department</th>
//               <th className="p-3 text-sm font-semibold">Designation</th>
//               <th className="p-3 text-sm font-semibold text-center">Status</th>
//               <th className="p-3 text-sm font-semibold text-center">Action</th>
//             </tr>
//           </thead>

//           {/* TBODY WITH SKELETON */}
//           <motion.tbody
//             variants={tableContainerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             {loading ? (
//               // Show skeleton if loading
//               <TableBodySkeleton rowCount={pageSize} colCount={8} />
//             ) : (
//               // Otherwise, show real data
//               paginatedEmployees.map((emp, index) => {
//                 const fullName = `${emp.first_Name || ""} ${
//                   emp.last_Name || ""
//                 }`.trim();
//                 const joinDate = emp.date_of_Joining
//                   ? new Date(emp.date_of_Joining).toDateString()
//                   : "-";
//                 const slNumber = (currentPage - 1) * pageSize + (index + 1);

//                 return (
//                   <motion.tr
//                     key={emp._id}
//                     variants={tableRowVariants}
//                     className="
//                       border-b last:border-b-0 
//                       border-gray-200 dark:border-gray-600 
//                       hover:bg-gray-50 dark:hover:bg-gray-600 
//                       transition-colors
//                     "
//                   >
//                     <td className="p-3 text-sm">
//                       {String(slNumber).padStart(2, "0")}
//                     </td>
//                     <td className="p-3 text-sm">{joinDate}</td>
//                     <td className="p-3 text-sm flex items-center gap-2">
//                       <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
//                         {emp.user_Avatar ? (
//                           <img
//                             src={emp.user_Avatar}
//                             alt="avatar"
//                             className="w-10 h-10 object-cover rounded-full"
//                           />
//                         ) : (
//                           <span className="text-gray-600 dark:text-gray-200 text-xs">
//                             No Pic
//                           </span>
//                         )}
//                       </div>
//                       <span>{fullName || "Unnamed"}</span>
//                     </td>
//                     <td className="p-3 text-sm">
//                       {emp.working_Email_Id || emp.personal_Email_Id || "-"}
//                     </td>
//                     <td className="p-3 text-sm">{emp.department || "-"}</td>
//                     <td className="p-3 text-sm">{emp.designation || "-"}</td>
//                     <td className="p-3 text-sm text-center">
//                       <span
//                         className={`
//                           px-3 py-1 text-xs rounded-full font-semibold
//                           ${
//                             emp.isActive
//                               ? "bg-green-100 dark:bg-green-700 text-green-600 dark:text-green-100"
//                               : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-100"
//                           }
//                         `}
//                       >
//                         {emp.isActive ? "Active" : "Inactive"}
//                       </span>
//                     </td>

//                     <td className="p-3 text-sm text-center">
//                       <div className="flex items-center justify-center space-x-2">
//                         <button
//                           title="View"
//                           className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
//                           onClick={() =>
//                             navigate(`/dashboard/employees/details/${emp._id}`)
//                           }
//                         >
//                           <FaEye size={16} />
//                         </button>
//                         <button
//                           title="Edit"
//                           className="text-green-500 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 transition-colors"
//                           onClick={() =>
//                             navigate(`/dashboard/update-employee/${emp._id}`)
//                           }
//                         >
//                           <FaEdit size={16} />
//                         </button>
//                         <button
//                           title="Delete"
//                           className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
//                           onClick={() => openDeleteDialog(emp.employee_Id)}
//                         >
//                           <FaTrash size={16} />
//                         </button>

//                         <button className=" flex items-center justify-center gap-2">
//                           <input
//                             id={`toggleSwitch-${emp._id}`}
//                             type="checkbox"
//                             className="cursor-pointer h-4 w-4 accent-blue-500"
//                             checked={emp.isActive}
//                             onChange={() =>
//                               openToggleDialog(emp.employee_Id, emp.isActive)
//                             }
//                           />
//                         </button>
//                       </div>
//                     </td>
//                   </motion.tr>
//                 );
//               })
//             )}
//           </motion.tbody>
//         </motion.table>

//         {/* Pagination Footer */}
//         {!loading && (
//           <div className="flex flex-col md:flex-row justify-between items-center p-3 text-sm gap-2">
//             <div>
//               Showing {paginatedEmployees.length} of{" "}
//               {departmentFilteredData.length} entries
//             </div>
//             <div className="flex items-center space-x-1">
//               {Array.from({ length: totalPages }, (_, i) => (
//                 <button
//                   key={i}
//                   className={`
//                     px-3 py-1 rounded border text-sm transition-colors
//                     ${
//                       currentPage === i + 1
//                         ? "bg-blue-600 text-white border-blue-600"
//                         : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
//                     }
//                   `}
//                   onClick={() => setCurrentPage(i + 1)}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}
//       </motion.div>
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



import React, { useEffect, useState, useMemo } from "react";
import {
  FaEdit,
  FaEye,
  FaTrash,
  FaUsers,
  FaUserCheck,
  FaUserSlash,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaUser,
  FaIdCard,
  FaBuilding,
  FaCalendarAlt,
  FaEnvelope,
  FaPlus,
  FaArrowUp
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
import departmentStore from "../../store/departmentStore";
import { useNavigate } from "react-router-dom";
import { renderHelpSection } from "../../config/HelpConfig";



// Skeleton Components
const StatCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
    <div className="flex items-center justify-between mb-4">
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
      </div>
      <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
    </div>
  </div>
);

const TableSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
    <div className="p-6 space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 animate-pulse">
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
          </div>
          <div className="w-20 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <div className="flex space-x-2">
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CardSkeleton = () => (
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
    </div>
    <div className="mt-4 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
  </div>
);

export default function EmployeeList() {
  const {
    getAllEmployeesApi,
    filteredEmployees,
    handleSearchChange,
    totalEmployeeCount,
    loading,
    deleteEmployee,
    toggleEmployeeStatus,
  } = useEmployeesStore();



  const { departments } = departmentStore();

  const [pageSize, setPageSize] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const [viewMode, setViewMode] = useState("table"); // table or card
  const [isAutoToggle, setIsAutoToggle] = useState(true);
  const navigate = useNavigate();
  // State for ConfirmationDialog
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Confirmation for Toggle Status
  const [isToggleConfirmOpen, setIsToggleConfirmOpen] = useState(false);
  const [toggleUserId, setToggleUserId] = useState(null);
  const [toggleUserStatus, setToggleUserStatus] = useState(false);

  // Auto-toggle based on screen size
  useEffect(() => {
    if (isAutoToggle) {
      const handleResize = () => {
        setViewMode(window.innerWidth >= 1024 ? "table" : "card");
      };
      
      handleResize();
      window.addEventListener("resize", handleResize);
      
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [isAutoToggle]);

  useEffect(() => {
    getAllEmployeesApi();
  }, [getAllEmployeesApi]);

  useEffect(() => {
    handleSearchChange(searchText);
    setCurrentPage(1);
  }, [searchText, handleSearchChange]);

  const departmentFilteredData = useMemo(() => {
    if (!departmentFilter || departmentFilter === "All") {
      return filteredEmployees;
    }
    return filteredEmployees.filter(
      (emp) => emp.department === departmentFilter
    );
  }, [filteredEmployees, departmentFilter]);

  const totalPages = Math.ceil(departmentFilteredData.length / pageSize);

  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return departmentFilteredData.slice(startIndex, startIndex + pageSize);
  }, [departmentFilteredData, currentPage, pageSize]);

  const totalActive = filteredEmployees.filter((emp) => emp.isActive).length;
  const totalInactive = filteredEmployees.filter((emp) => !emp.isActive).length;

  // Pagination functions
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPage = (page) => setCurrentPage(page);

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

  // Dialog handlers
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
  const EmployeeCard = ({ emp, index }) => {
    const fullName = `${emp.first_Name || ""} ${emp.last_Name || ""}`.trim();
    const joinDate = emp.date_of_Joining
      ? new Date(emp.date_of_Joining).toLocaleDateString()
      : "-";
    const email = emp.working_Email_Id || emp.personal_Email_Id || "N/A";
    const slNumber = (currentPage - 1) * pageSize + (index + 1);

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-200 dark:hover:border-blue-700 transform hover:-translate-y-1">
       
       
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div className="relative flex-shrink-0">
              {emp.user_Avatar ? (
                <img
                  src={emp.user_Avatar}
                  alt={fullName}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-600"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <FaUser className="w-6 h-6 text-white" />
                </div>
              )}
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${
                emp.isActive ? "bg-green-500" : "bg-red-500"
              }`}></div>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm truncate">
                {fullName || "Unnamed"}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                #{String(slNumber).padStart(2, "0")}
              </p>
            </div>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
            emp.isActive
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}>
            {emp.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-2">
            <FaEnvelope className="w-3 h-3 text-blue-500 flex-shrink-0" />
            <span className="text-xs text-gray-600 dark:text-gray-300 truncate">
              {email}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaBuilding className="w-3 h-3 text-purple-500 flex-shrink-0" />
            <span className="text-xs text-gray-600 dark:text-gray-300 truncate">
              {emp.department || "N/A"}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaUser className="w-3 h-3 text-orange-500 flex-shrink-0" />
            <span className="text-xs text-gray-600 dark:text-gray-300 truncate">
              {emp.designation || "N/A"}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaCalendarAlt className="w-3 h-3 text-green-500 flex-shrink-0" />
            <span className="text-xs text-gray-600 dark:text-gray-300">
              {joinDate}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {/* Status Toggle */}
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={emp.isActive}
                onChange={() => openToggleDialog(emp.employee_Id, emp.isActive)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button
              title="View Details"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-1"
              onClick={() => navigate(`/dashboard/employees/details/${emp._id}`)}
            >
              <FaEye className="w-3 h-3" />
              <span>View</span>
            </button>
            
            <div className="flex space-x-1">
              <button
                title="Edit Employee"
                className="p-2 text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900 rounded-lg transition-all duration-200"
                onClick={() => navigate(`/dashboard/update-employee/${emp._id}`)}
              >
                <FaEdit className="w-4 h-4" />
              </button>
              <button
                title="Delete Employee"
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-all duration-200"
                onClick={() => openDeleteDialog(emp.employee_Id)}
              >
                <FaTrash className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <StatCardSkeleton key={index} />
          ))}
        </div>
        
        {/* Content Skeleton */}
        <div className="max-w-8xl mx-auto">
          {viewMode === "table" ? <TableSkeleton /> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gray-50 dark:bg-gray-900  transition-colors duration-200 rounded-2xl">
       {renderHelpSection("allEmployees")}
      {/* Header */}
      <div className="max-w-8xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
              <FaUsers className="text-blue-600 dark:text-blue-400" />
              <span>Employee Management</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your organization's workforce
            </p>
          </div>
          {/* <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
            onClick={() => navigate('/dashboard/add-employee')}
          >
            <FaPlus className="w-4 h-4" />
            <span>Add Employee</span>
          </button> */}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Employees</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalEmployeeCount}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <FaUsers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{totalActive}</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <FaUserCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Inactive</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{totalInactive}</p>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                <FaUserSlash className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Departments</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{departments.length}</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <FaBuilding className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
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
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(+e.target.value);
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

              {/* Department Filter */}
              <div className="flex items-center space-x-2">
                <HiFilter className="w-4 h-4 text-gray-400" />
                <select
                  value={departmentFilter}
                  onChange={(e) => {
                    setDepartmentFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept._id} value={dept.department}>
                      {dept.department}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              {/* Search */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
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
        {paginatedEmployees.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <FaUsers className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No employees found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchText || departmentFilter ? "Try adjusting your search or filters" : "No employees available"}
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
                        <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400 text-sm">S.L</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400 text-sm">Employee</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400 text-sm">Email</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400 text-sm">Department</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400 text-sm">Designation</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400 text-sm">Join Date</th>
                        <th className="text-center py-4 px-6 font-medium text-gray-600 dark:text-gray-400 text-sm">Status</th>
                        <th className="text-center py-4 px-6 font-medium text-gray-600 dark:text-gray-400 text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {paginatedEmployees.map((emp, index) => {
                        const fullName = `${emp.first_Name || ""} ${emp.last_Name || ""}`.trim();
                        const joinDate = emp.date_of_Joining
                          ? new Date(emp.date_of_Joining).toLocaleDateString()
                          : "-";
                        const email = emp.working_Email_Id || emp.personal_Email_Id || "N/A";
                        const slNumber = (currentPage - 1) * pageSize + (index + 1);

                        return (
                          <tr
                            key={emp._id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                          >
                            <td className="py-4 px-6 text-gray-600 dark:text-gray-300 font-mono text-sm">
                              {String(slNumber).padStart(2, "0")}
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-3">
                                <div className="relative flex-shrink-0">
                                  {emp.user_Avatar ? (
                                    <img
                                      src={emp.user_Avatar}
                                      alt={fullName}
                                      className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-600"
                                    />
                                  ) : (
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                      <FaUser className="w-5 h-5 text-white" />
                                    </div>
                                  )}
                                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
                                    emp.isActive ? "bg-green-500" : "bg-red-500"
                                  }`}></div>
                                </div>
                                <div className="min-w-0">
                                  <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                    {fullName || "Unnamed"}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    ID: {emp.employee_Id || "N/A"}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-gray-600 dark:text-gray-300 text-sm">
                              {email}
                            </td>
                            <td className="py-4 px-6 text-gray-600 dark:text-gray-300">
                              {emp.department || "N/A"}
                            </td>
                            <td className="py-4 px-6 text-gray-600 dark:text-gray-300">
                              {emp.designation || "N/A"}
                            </td>
                            <td className="py-4 px-6 text-gray-600 dark:text-gray-300 text-sm">
                              {joinDate}
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center justify-center space-x-3">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  emp.isActive
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                }`}>
                                  {emp.isActive ? "Active" : "Inactive"}
                                </span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={emp.isActive}
                                    onChange={() => openToggleDialog(emp.employee_Id, emp.isActive)}
                                  />
                                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center justify-center space-x-2">
                                <button
                                  title="View Details"
                                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-all duration-200"
                                  onClick={() => navigate(`/dashboard/employees/details/${emp._id}`)}
                                >
                                  <FaEye className="w-4 h-4" />
                                </button>
                                <button
                                  title="Edit Employee"
                                  className="p-2 text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900 rounded-lg transition-all duration-200"
                                  onClick={() => navigate(`/dashboard/update-employee/${emp._id}`)}
                                >
                                  <FaEdit className="w-4 h-4" />
                                </button>
                                <button
                                  title="Delete Employee"
                                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-all duration-200"
                                  onClick={() => openDeleteDialog(emp.employee_Id)}
                                >
                                  <FaTrash className="w-4 h-4" />
                                </button>
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
                {paginatedEmployees.map((emp, index) => (
                  <EmployeeCard key={emp._id} emp={emp} index={index} />
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
                  Showing <span className="font-medium">{((currentPage - 1) * pageSize) + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * pageSize, departmentFilteredData.length)}
                  </span>{" "}
                  of <span className="font-medium">{departmentFilteredData.length}</span> results
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