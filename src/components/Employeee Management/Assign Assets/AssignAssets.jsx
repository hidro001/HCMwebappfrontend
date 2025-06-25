// import React, { useState, useEffect } from "react";
// import { FaFilePdf, FaFileCsv, FaPrint, FaSearch, FaEye } from "react-icons/fa";
// import { MdOutlineFileDownload } from "react-icons/md";
// import { AiOutlinePlus } from "react-icons/ai";
// import { motion } from "framer-motion";
// import useAssetStore from "../../../store/useAssetStore";
// import useAuthStore from "../../../store/store";

// import AssetGroupModal from "./AssetGroupModal";
// import ViewAssetGroupsModal from "./ViewAssetGroupsModal";
// import AssignAssetModal from "./AssignAssetModal";
// import ViewAssignedAssetsModal from "./ViewAssignedAssetsModal";

// // Framer Motion Variants
// const tableContainerVariants = {
//   hidden: { opacity: 0, y: 10 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { staggerChildren: 0.1, delayChildren: 0.2 },
//   },
// };

// const tableRowVariants = {
//   hidden: { opacity: 0, y: 5 },
//   visible: { opacity: 1, y: 0 },
// };

// // Skeleton component for table rows
// function TableBodySkeleton({ rowCount, colCount }) {
//   return (
//     <>
//       {Array.from({ length: rowCount }).map((_, rowIndex) => (
//         <tr key={rowIndex} className="animate-pulse">
//           {Array.from({ length: colCount }).map((_, colIndex) => (
//             <td key={colIndex} className="py-3 px-4">
//               <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
//             </td>
//           ))}
//         </tr>
//       ))}
//     </>
//   );
// }

// export default function AssignAssetsPage() {
//   const [searchValue, setSearchValue] = useState("");
//   const [selectedDepartment, setSelectedDepartment] = useState("All");
//   const [pageSize, setPageSize] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [assignModalOpen, setAssignModalOpen] = useState(false);
//   const [viewAssignedModalOpen, setViewAssignedModalOpen] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);

//   const {
//     subordinates,
//     getSubordinates,
//     loadingSubordinates,
//     errorSubordinates,
//   } = useAssetStore();

//   const userId = useAuthStore((state) => state._id);

//   useEffect(() => {
//     if (userId) {
//       getSubordinates(userId);
//     }
//   }, [userId, getSubordinates]);

//   if (errorSubordinates) {
//     return (
//       <div className="p-4 text-red-600">
//         Failed to fetch subordinates: {errorSubordinates}
//       </div>
//     );
//   }

//   // Filter Logic
//   const filtered = subordinates.filter((emp) => {
//     const matchesSearch =
//       searchValue === "" ||
//       `${emp.first_Name} ${emp.last_Name}`
//         .toLowerCase()
//         .includes(searchValue.toLowerCase()) ||
//       emp.employee_Id.toLowerCase().includes(searchValue.toLowerCase());

//     const matchesDept =
//       selectedDepartment === "All" ||
//       (emp.department &&
//         emp.department.toLowerCase() === selectedDepartment.toLowerCase());

//     return matchesSearch && matchesDept;
//   });

//   // Department List
//   const departmentsList = Array.from(
//     new Set(subordinates.map((s) => s.department || ""))
//   ).filter(Boolean);

//   // Pagination
//   const totalPages = Math.ceil(filtered.length / pageSize);
//   const startIndex = (currentPage - 1) * pageSize;
//   const paginatedData = filtered.slice(startIndex, startIndex + pageSize);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   // Modals
//   const handleOpenAssignModal = (employee) => {
//     setSelectedEmployee(employee);
//     setAssignModalOpen(true);
//   };

//   const handleOpenViewAssignedModal = (employee) => {
//     setSelectedEmployee(employee);
//     setViewAssignedModalOpen(true);
//   };

//   return (
//     <div className="bg-gray-50 dark:bg-gray-900 dark:text-gray-100 p-4">
//       <div className="mb-4 flex items-center justify-between">
//         <h1 className="text-xl font-semibold">Assign Assets</h1>
//       </div>

//       <div className="w-full bg-white dark:bg-gray-800 rounded-md shadow px-4 py-3 mb-6 transition-colors">
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//           {/* Filters and Search */}
//           <div className="flex flex-wrap items-center gap-4">
//             <div className="flex items-center space-x-2">
//               <label className="text-sm font-medium">Show</label>
//               <select
//                 value={pageSize}
//                 onChange={(e) => {
//                   setPageSize(Number(e.target.value));
//                   setCurrentPage(1);
//                 }}
//                 className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-sm focus:outline-none bg-white dark:bg-gray-900"
//               >
//                 <option value={5}>5</option>
//                 <option value={10}>10</option>
//                 <option value={20}>20</option>
//               </select>
//             </div>

//             <div className="relative w-64">
//               <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">
//                 <FaSearch />
//               </span>
//               <input
//                 type="text"
//                 placeholder="Search"
//                 className="border border-gray-300 dark:border-gray-700 rounded pl-8 pr-3 py-1 text-sm focus:outline-none bg-white dark:bg-gray-900 w-full"
//                 value={searchValue}
//                 onChange={(e) => {
//                   setSearchValue(e.target.value);
//                   setCurrentPage(1);
//                 }}
//               />
//             </div>

//             <div>
//               <select
//                 className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-sm focus:outline-none bg-white dark:bg-gray-900"
//                 value={selectedDepartment}
//                 onChange={(e) => {
//                   setSelectedDepartment(e.target.value);
//                   setCurrentPage(1);
//                 }}
//               >
//                 <option value="All">All Departments</option>
//                 {departmentsList.map((dept) => (
//                   <option key={dept} value={dept}>
//                     {dept}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex flex-wrap items-center gap-4">
//             <div className="flex items-center gap-2">
//               <button
//                 className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-600 text-blue-600 dark:text-white rounded shadow-sm text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors"
//                 onClick={() => setIsViewModalOpen(true)}
//               >
//                 <FaEye className="mr-2" size={16} />
//                 View Assets Group
//               </button>
//               <button
//                 className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-600 text-white rounded shadow-sm text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors"
//                 onClick={() => setIsModalOpen(true)}
//               >
//                 <AiOutlinePlus className="mr-2" size={16} />
//                 Add Asset Group
//               </button>
//             </div>
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
//               <th className="py-3 px-4">Employee ID</th>
//               <th className="py-3 px-4">Employee Name</th>
//               <th className="py-3 px-4">Department</th>
//               <th className="py-3 px-4 text-center">Assign Asset</th>
//               <th className="py-3 px-4 text-center">View Assigned Assets</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* If loading, show skeleton. Otherwise, show data or "No records." */}
//             {loadingSubordinates ? (
//               <TableBodySkeleton rowCount={pageSize} colCount={6} />
//             ) : paginatedData.length > 0 ? (
//               paginatedData.map((emp, idx) => {
//                 const serialNumber = (currentPage - 1) * pageSize + (idx + 1);
//                 return (
//                   <motion.tr
//                     key={emp._id}
//                     variants={tableRowVariants}
//                     className="border-b last:border-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-sm"
//                   >
//                     <td className="py-3 px-4">
//                       {String(serialNumber).padStart(2, "0")}
//                     </td>
//                     <td className="py-3 px-4 text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
//                       #{emp.employee_Id}
//                     </td>
//                     <td className="py-3 px-4 text-gray-700 dark:text-gray-100">
//                       {emp.first_Name} {emp.last_Name}
//                     </td>
//                     <td className="py-3 px-4 text-gray-700 dark:text-gray-100">
//                       {emp.department || "—"}
//                     </td>
//                     <td className="py-3 px-4 text-center">
//                       <button
//                         className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded transition-colors"
//                         onClick={() => handleOpenAssignModal(emp)}
//                       >
//                         <AiOutlinePlus className="mr-1" size={14} />
//                         Assign Asset
//                       </button>
//                     </td>
//                     <td className="py-3 px-4 text-center">
//                       <button
//                         className="inline-flex items-center bg-green-100 dark:bg-green-700 text-green-600 dark:text-green-100 hover:bg-blue-900 text-xs font-semibold px-3 py-1 rounded transition-colors"
//                         onClick={() => handleOpenViewAssignedModal(emp)}
//                       >
//                         <FaEye className="mr-1" size={14} />
//                         View Assigned
//                       </button>
//                     </td>
//                   </motion.tr>
//                 );
//               })
//             ) : (
//               <tr>
//                 <td
//                   colSpan={6}
//                   className="py-4 px-4 text-center text-sm text-gray-500"
//                 >
//                   No matching records found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>

//         {/* Pagination Footer */}
//         {!loadingSubordinates && paginatedData.length > 0 && (
//           <div className="flex flex-col md:flex-row items-center justify-between p-4 text-sm text-gray-600 dark:text-gray-300">
//             <div>
//               Showing {paginatedData.length} of {filtered.length} entries
//             </div>
//             <div className="flex items-center space-x-1 mt-2 md:mt-0">
//               {Array.from({ length: totalPages }, (_, i) => (
//                 <button
//                   key={i}
//                   className={`px-3 py-1 rounded border transition-colors ${
//                     currentPage === i + 1
//                       ? "bg-blue-600 text-white border-blue-600"
//                       : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
//                   }`}
//                   onClick={() => handlePageChange(i + 1)}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}
//       </motion.div>

//       {/* Modals */}
//       <AssetGroupModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//       />
//       <ViewAssetGroupsModal
//         isOpen={isViewModalOpen}
//         onClose={() => setIsViewModalOpen(false)}
//       />
//       {selectedEmployee && (
//         <AssignAssetModal
//           isOpen={assignModalOpen}
//           onClose={() => setAssignModalOpen(false)}
//           employeeId={selectedEmployee._id}
//           employeeName={`${selectedEmployee.first_Name} ${selectedEmployee.last_Name}`}
//         />
//       )}
//       {selectedEmployee && (
//         <ViewAssignedAssetsModal
//           isOpen={viewAssignedModalOpen}
//           onClose={() => setViewAssignedModalOpen(false)}
//           employeeId={selectedEmployee._id}
//           employeeName={`${selectedEmployee.first_Name} ${selectedEmployee.last_Name}`}
//         />
//       )}
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { 
  FaFilePdf, 
  FaFileCsv, 
  FaPrint, 
  FaSearch, 
  FaEye,
  FaUsers,
  FaBoxOpen,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
  FaUser,
  FaIdCard,
  FaBuilding,
  FaClipboardList
} from "react-icons/fa";
import { 
  HiViewGrid, 
  HiViewList,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiFilter,
  HiDownload
} from "react-icons/hi";
import { MdOutlineFileDownload } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import useAssetStore from "../../../store/useAssetStore";
import useAuthStore from "../../../store/store";

import AssetGroupModal from "./AssetGroupModal";
import ViewAssetGroupsModal from "./ViewAssetGroupsModal";
import AssignAssetModal from "./AssignAssetModal";
import ViewAssignedAssetsModal from "./ViewAssignedAssetsModal";

// Skeleton Components
const StatCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
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
          <div className="w-8 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="flex-1 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="flex space-x-2">
            <div className="w-20 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="w-20 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
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
    </div>
    <div className="space-y-3">
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
    </div>
    <div className="mt-4 flex space-x-2">
      <div className="flex-1 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
      <div className="flex-1 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
    </div>
  </div>
);

export default function AssignAssetsPage() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [pageSize, setPageSize] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("table"); // table or card
  const [isAutoToggle, setIsAutoToggle] = useState(true);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [viewAssignedModalOpen, setViewAssignedModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const {
    subordinates,
    getSubordinates,
    loadingSubordinates,
    errorSubordinates,
  } = useAssetStore();

  const userId = useAuthStore((state) => state._id);

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
    if (userId) {
      getSubordinates(userId);
    }
  }, [userId, getSubordinates]);

  // Filter Logic
  const filtered = subordinates.filter((emp) => {
    const matchesSearch =
      searchValue === "" ||
      `${emp.first_Name} ${emp.last_Name}`
        .toLowerCase()
        .includes(searchValue.toLowerCase()) ||
      emp.employee_Id.toLowerCase().includes(searchValue.toLowerCase());

    const matchesDept =
      selectedDepartment === "All" ||
      (emp.department &&
        emp.department.toLowerCase() === selectedDepartment.toLowerCase());

    return matchesSearch && matchesDept;
  });

  // Department List
  const departmentsList = Array.from(
    new Set(subordinates.map((s) => s.department || ""))
  ).filter(Boolean);

  // Pagination
  const totalPages = Math.ceil(filtered.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filtered.slice(startIndex, startIndex + pageSize);

  // Modern pagination functions
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

  // Modals
  const handleOpenAssignModal = (employee) => {
    setSelectedEmployee(employee);
    setAssignModalOpen(true);
  };

  const handleOpenViewAssignedModal = (employee) => {
    setSelectedEmployee(employee);
    setViewAssignedModalOpen(true);
  };

  // Employee Card Component
  const EmployeeCard = ({ emp, index }) => {
    const serialNumber = (currentPage - 1) * pageSize + (index + 1);
    const fullName = `${emp.first_Name} ${emp.last_Name}`;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-200 dark:hover:border-blue-700 transform hover:-translate-y-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <FaUser className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></div>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm truncate">
                {fullName}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                #{String(serialNumber).padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-2">
            <FaIdCard className="w-3 h-3 text-blue-500 flex-shrink-0" />
            <span className="text-xs text-gray-600 dark:text-gray-300 truncate">
              ID: {emp.employee_Id}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaBuilding className="w-3 h-3 text-purple-500 flex-shrink-0" />
            <span className="text-xs text-gray-600 dark:text-gray-300 truncate">
              {emp.department || "—"}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => handleOpenAssignModal(emp)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-1"
          >
            <FaPlus className="w-3 h-3" />
            <span>Assign</span>
          </button>
          
          <button
            onClick={() => handleOpenViewAssignedModal(emp)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-1"
          >
            <FaEye className="w-3 h-3" />
            <span>View</span>
          </button>
        </div>
      </div>
    );
  };

  if (errorSubordinates) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl text-red-600 dark:text-red-400">⚠️</div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-red-800 dark:text-red-200">Error Loading Data</h2>
            <p className="text-red-600 dark:text-red-400">Failed to fetch subordinates: {errorSubordinates}</p>
          </div>
        </div>
      </div>
    );
  }

  if (loadingSubordinates) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <StatCardSkeleton key={index} />
          ))}
        </div>
        
        {/* Content Skeleton */}
        <div className=" mx-auto">
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 transition-colors duration-200">
      <div className=" mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
              <FaBoxOpen className="text-blue-600 dark:text-blue-400" />
              <span>Asset Assignment</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage and assign assets to your team members
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Employees</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{subordinates.length}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <FaUsers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Departments</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{departmentsList.length}</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <FaBuilding className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Assets Available</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">0</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <FaBoxOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Assigned</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">0</p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <FaClipboardList className="w-6 h-6 text-orange-600 dark:text-orange-400" />
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
                    setPageSize(Number(e.target.value));
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
                  value={selectedDepartment}
                  onChange={(e) => {
                    setSelectedDepartment(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <option value="All">All Departments</option>
                  {departmentsList.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
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
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
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

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsViewModalOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                >
                  <FaEye className="w-4 h-4" />
                  <span className="hidden sm:inline">View Groups</span>
                </button>
                
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <FaPlus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Group</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {paginatedData.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <FaUsers className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No employees found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchValue || selectedDepartment !== "All" ? "Try adjusting your search or filters" : "No subordinate employees available"}
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
                        <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400 text-sm">Employee ID</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400 text-sm">Employee Name</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400 text-sm">Department</th>
                        <th className="text-center py-4 px-6 font-medium text-gray-600 dark:text-gray-400 text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {paginatedData.map((emp, idx) => {
                        const serialNumber = (currentPage - 1) * pageSize + (idx + 1);
                        return (
                          <tr
                            key={emp._id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                          >
                            <td className="py-4 px-6 text-gray-600 dark:text-gray-300 font-mono text-sm">
                              {String(serialNumber).padStart(2, "0")}
                            </td>
                            <td className="py-4 px-6">
                              <span className="text-blue-600 dark:text-blue-400 font-medium cursor-pointer hover:underline">
                                #{emp.employee_Id}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                  <FaUser className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-medium text-gray-900 dark:text-gray-100">
                                  {emp.first_Name} {emp.last_Name}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-gray-600 dark:text-gray-300">
                              {emp.department || "—"}
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center justify-center space-x-2">
                                <button
                                  onClick={() => handleOpenAssignModal(emp)}
                                  className="inline-flex items-center px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors duration-200"
                                >
                                  <FaPlus className="w-3 h-3 mr-1" />
                                  Assign
                                </button>
                                <button
                                  onClick={() => handleOpenViewAssignedModal(emp)}
                                  className="inline-flex items-center px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg transition-colors duration-200"
                                >
                                  <FaEye className="w-3 h-3 mr-1" />
                                  View
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
                {paginatedData.map((emp, index) => (
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
                  Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(startIndex + pageSize, filtered.length)}
                  </span>{" "}
                  of <span className="font-medium">{filtered.length}</span> results
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

      {/* Modals */}
      <AssetGroupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <ViewAssetGroupsModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
      />
      {selectedEmployee && (
        <AssignAssetModal
          isOpen={assignModalOpen}
          onClose={() => setAssignModalOpen(false)}
          employeeId={selectedEmployee._id}
          employeeName={`${selectedEmployee.first_Name} ${selectedEmployee.last_Name}`}
        />
      )}
      {selectedEmployee && (
        <ViewAssignedAssetsModal
          isOpen={viewAssignedModalOpen}
          onClose={() => setViewAssignedModalOpen(false)}
          employeeId={selectedEmployee._id}
          employeeName={`${selectedEmployee.first_Name} ${selectedEmployee.last_Name}`}
        />
      )}
    </div>
  );
}