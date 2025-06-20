

// import React, { useState, useEffect, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { Skeleton } from "@mui/material";
// import ViewReferralModal from "./model/ViewReferralModal";
// import UpdateStatusModal from "./model/UpdateStatusModal";
// import useReferralStore from "../../store/useReferralStore";
// import ExportButtons from "../common/PdfExcel"; 

// const tableContainerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { when: "beforeChildren", staggerChildren: 0.05 },
//   },
// };

// const tableRowVariants = {
//   hidden: { opacity: 0, y: 10 },
//   visible: { opacity: 1, y: 0 },
// };

// export default function ReferralList() {
//   const { referrals, loading, error, fetchAllReferrals, updateReferralStatus } =
//     useReferralStore();

//   const [pageSize, setPageSize] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchText, setSearchText] = useState("");
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [department, setDepartment] = useState("All");
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
//   const [selectedReferral, setSelectedReferral] = useState(null);

//   useEffect(() => {
//     fetchAllReferrals();
//   }, [fetchAllReferrals]);

//   // -----------------------------------------
//   // Filter logic to match month-year + search + department
//   // -----------------------------------------
//   const filteredReferrals = useMemo(() => {
//     if (!referrals) return [];
//     return referrals.filter((item) => {
//       // 1) Match search text
//       if (searchText) {
//         const matchDesignation = item.designation
//           .toLowerCase()
//           .includes(searchText.toLowerCase());
//         const matchCandidate = item.candidateName
//           .toLowerCase()
//           .includes(searchText.toLowerCase());
//         // If neither matches, exclude
//         if (!matchDesignation && !matchCandidate) return false;
//       }

//       // 2) Match department
//       if (department !== "All" && item.department !== department) return false;

//       // 3) Match selected month-year from DatePicker
//       //    We'll compare only the month & year of `item.createdAt` to selectedDate
//       if (selectedDate) {
//         const createdAt = new Date(item.createdAt);
//         const selectedMonth = selectedDate.getMonth();
//         const selectedYear = selectedDate.getFullYear();

//         if (
//           createdAt.getMonth() !== selectedMonth ||
//           createdAt.getFullYear() !== selectedYear
//         ) {
//           return false;
//         }
//       }

//       return true;
//     });
//   }, [referrals, searchText, department, selectedDate]);

//   // -----------------------------------------
//   // Pagination
//   // -----------------------------------------
//   const totalPages = Math.ceil(filteredReferrals.length / pageSize);
//   const currentTableData = useMemo(() => {
//     const startIndex = (currentPage - 1) * pageSize;
//     return filteredReferrals.slice(startIndex, startIndex + pageSize);
//   }, [filteredReferrals, currentPage, pageSize]);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   // -----------------------------------------
//   // Modals
//   // -----------------------------------------
//   const handleOpenViewModal = (referral) => {
//     setSelectedReferral(referral);
//     setIsViewModalOpen(true);
//   };

//   const handleOpenUpdateModal = (referral) => {
//     setSelectedReferral(referral);
//     setIsUpdateModalOpen(true);
//   };

//   const handleUpdateStatus = async (newStatus, feedback) => {
//     if (!selectedReferral) return;
//     try {
//       await updateReferralStatus(selectedReferral.id, newStatus, feedback);
//       alert(`Status updated to '${newStatus}'.`);
//       setIsUpdateModalOpen(false);
//     } catch (err) {
//       alert("Error updating referral status.");
//       console.error(err);
//     }
//   };

//   // -----------------------------------------
//   // Data for PDF/Excel/CSV exports
//   // -----------------------------------------
//   const exportData = currentTableData.map((item, index) => {
//     const rowIndex = (currentPage - 1) * pageSize + (index + 1);
//     return {
//       sl: String(rowIndex).padStart(2, "0"),
//       designation: item.designation,
//       department: item.department,
//       referredBy: item.referredBy,
//       candidateName: item.candidateName,
//       candidateEmail: item.candidateEmail,
//       candidateLocation: item.candidateLocation,
//       status: item.status,
//       // If you want to include the date in your export as well:
//       createdAt: new Date(item.createdAt).toLocaleDateString("en-US", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       }),
//     };
//   });

//   const columns = [
//     { header: "S.L", dataKey: "sl" },
//     { header: "Designation", dataKey: "designation" },
//     { header: "Department", dataKey: "department" },
//     { header: "Referred By", dataKey: "referredBy" },
//     { header: "Candidate Name", dataKey: "candidateName" },
//     { header: "Candidate Email", dataKey: "candidateEmail" },
//     { header: "Candidate Location", dataKey: "candidateLocation" },
//     { header: "Status", dataKey: "status" },
//     { header: "Created On", dataKey: "createdAt" }, // optional in your export
//   ];

//   return (
//     <div className="px-4 py-6 bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-100 transition-colors">
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-xl font-semibold">Referral List</h1>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-md shadow mb-4 transition-colors">
//         <div className="flex items-center gap-4">
//           {/* Page Size */}
//           <div className="flex items-center gap-2">
//             <label className="text-sm font-semibold whitespace-nowrap">Show</label>
//             <select
//               className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
//               value={pageSize}
//               onChange={(e) => {
//                 setPageSize(Number(e.target.value));
//                 setCurrentPage(1);
//               }}
//             >
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={20}>20</option>
//             </select>
//           </div>

//           {/* Search */}
//           <div>
//             <input
//               type="text"
//               placeholder="Search"
//               className="border rounded px-3 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
//               value={searchText}
//               onChange={(e) => {
//                 setSearchText(e.target.value);
//                 setCurrentPage(1);
//               }}
//             />
//           </div>
//         </div>

//         {/* Date + Dept + Export */}
//         <div className="flex flex-wrap items-center gap-4">
//           {/* Month-Year Picker */}
//           <DatePicker
//             selected={selectedDate}
//             onChange={(date) => {
//               setSelectedDate(date);
//               setCurrentPage(1);
//             }}
//             dateFormat="MMM yyyy"
//             showMonthYearPicker
//             placeholderText="Select Month, Year"
//             className="border rounded px-3 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
//           />

//           {/* Department */}
//           <select
//             className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
//             value={department}
//             onChange={(e) => {
//               setDepartment(e.target.value);
//               setCurrentPage(1);
//             }}
//           >
//             <option value="All">Department</option>
//             <option value="IT">IT</option>
//             <option value="Marketing">Marketing</option>
//           </select>

//           {/* Export Buttons (PDF, CSV, Excel) */}
//           <div className="flex items-center gap-2 text-gray-500 dark:text-gray-300">
//             <ExportButtons
//               data={exportData}
//               columns={columns}
//               filename="ReferralList"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Error handling */}
//       {error && (
//         <div className="bg-red-100 text-red-800 p-3 rounded mb-4">{error}</div>
//       )}

//       {/* Table */}
//       {loading ? (
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow transition-colors">
//           {Array.from({ length: pageSize }).map((_, index) => (
//             <Skeleton
//               key={index}
//               variant="rectangular"
//               height={40}
//               className="mb-2"
//             />
//           ))}
//         </div>
//       ) : (
//         <>
//           {filteredReferrals.length > 0 ? (
//             <motion.div
//               className="bg-white dark:bg-gray-800 rounded-md shadow overflow-auto transition-colors"
//               variants={tableContainerVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               <motion.table className="w-full text-left border-collapse">
//                 <thead className="bg-gray-100 dark:bg-gray-700 transition-colors">
//                   <tr>
//                     <th className="p-3 text-sm font-semibold">S.L</th>
//                     <th className="p-3 text-sm font-semibold">Designation</th>
//                     <th className="p-3 text-sm font-semibold">Department</th>

//                     {/* NEW COLUMN: "Referral Date" */}
//                     <th className="p-3 text-sm font-semibold">Created On</th>

//                     <th className="p-3 text-sm font-semibold">Referred By</th>
//                     <th className="p-3 text-sm font-semibold">
//                       Candidate Name
//                     </th>
//                     <th className="p-3 text-sm font-semibold">
//                       Candidate Email
//                     </th>
//                     <th className="p-3 text-sm font-semibold">
//                       Candidate Location
//                     </th>
//                     <th className="p-3 text-sm font-semibold">Status</th>
//                     <th className="p-3 text-sm font-semibold">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentTableData.map((item, index) => {
//                     const rowIndex = (currentPage - 1) * pageSize + (index + 1);

//                     // Status classes for styling
//                     let statusClasses =
//                       "bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-100 border border-gray-200 dark:border-gray-500 px-2 py-1 rounded text-xs font-semibold";
//                     if (item.status === "Onboard") {
//                       statusClasses =
//                         "bg-green-50 dark:bg-green-700 text-green-600 dark:text-green-100 border border-green-200 dark:border-green-600 px-2 py-1 rounded text-xs font-semibold";
//                     } else if (item.status === "In Review") {
//                       statusClasses =
//                         "bg-yellow-50 dark:bg-yellow-700 text-yellow-600 dark:text-yellow-100 border border-yellow-200 dark:border-yellow-600 px-2 py-1 rounded text-xs font-semibold";
//                     } else if (item.status === "Rejected") {
//                       statusClasses =
//                         "bg-red-50 dark:bg-red-700 text-red-600 dark:text-red-100 border border-red-200 dark:border-red-600 px-2 py-1 rounded text-xs font-semibold";
//                     } else if (item.status === "Pending") {
//                       statusClasses =
//                         "bg-orange-50 dark:bg-orange-700 text-orange-600 dark:text-orange-100 border border-orange-200 dark:border-orange-600 px-2 py-1 rounded text-xs font-semibold";
//                     }

//                     return (
//                       <motion.tr
//                         key={item.id}
//                         variants={tableRowVariants}
//                         className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//                       >
//                         <td className="p-3 text-sm">
//                           {String(rowIndex).padStart(2, "0")}
//                         </td>
//                         <td className="p-3 text-sm">{item.designation}</td>
//                         <td className="p-3 text-sm">{item.department}</td>

//                         {/* SHOW CREATED DATE */}
//                         <td className="p-3 text-sm">
//                           {new Date(item.createdAt).toLocaleDateString("en-US", {
//                             day: "2-digit",
//                             month: "short",
//                             year: "numeric",
//                           })}
//                         </td>

//                         <td className="p-3 text-sm">{item.referredBy}</td>
//                         <td className="p-3 text-sm">{item.candidateName}</td>
//                         <td className="p-3 text-sm">{item.candidateEmail}</td>
//                         <td className="p-3 text-sm">{item.candidateLocation}</td>
//                         <td className="p-3 text-sm">
//                           <span className={statusClasses}>{item.status}</span>
//                         </td>
//                         <td className="p-3 text-sm">
//                           <div className="flex items-center gap-2">
//                             <button
//                               className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
//                               onClick={() => handleOpenViewModal(item)}
//                             >
//                               <FaEye size={14} />
//                             </button>
//                             <button
//                               className="text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 transition-colors"
//                               onClick={() => handleOpenUpdateModal(item)}
//                             >
//                               <FaEdit size={14} />
//                             </button>
//                             <button
//                               className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
//                               onClick={() =>
//                                 alert(`Delete referral ${item.id}`)
//                               }
//                             >
//                               <FaTrash size={14} />
//                             </button>
//                           </div>
//                         </td>
//                       </motion.tr>
//                     );
//                   })}
//                 </tbody>
//               </motion.table>

//               {/* Pagination Footer */}
//               <div className="flex flex-col md:flex-row justify-between items-center p-3 gap-2 text-sm text-gray-600 dark:text-gray-200 transition-colors">
//                 <div>
//                   Showing {currentTableData.length} of{" "}
//                   {filteredReferrals.length} entries
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   {Array.from({ length: totalPages }, (_, i) => (
//                     <button
//                       key={i}
//                       className={`px-3 py-1 rounded border transition-colors ${
//                         currentPage === i + 1
//                           ? "bg-blue-600 text-white border-blue-600"
//                           : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
//                       }`}
//                       onClick={() => handlePageChange(i + 1)}
//                     >
//                       {i + 1}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           ) : (
//             <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow text-center text-gray-500 dark:text-gray-400 transition-colors">
//               No matching records found
//             </div>
//           )}
//         </>
//       )}

//       {/* Modals */}
//       <AnimatePresence>
//         {isViewModalOpen && selectedReferral && (
//           <ViewReferralModal
//             referral={selectedReferral}
//             onClose={() => setIsViewModalOpen(false)}
//           />
//         )}
//       </AnimatePresence>
//       <AnimatePresence>
//         {isUpdateModalOpen && selectedReferral && (
//           <UpdateStatusModal
//             referral={selectedReferral}
//             onClose={() => setIsUpdateModalOpen(false)}
//             onSubmit={handleUpdateStatus}
//           />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }


import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaBuilding,
  FaDownload,
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaClock,
  FaTimes,
  FaUserPlus
} from "react-icons/fa";
import {
  HiEye,
  HiPencil,
  HiTrash,
  HiSearch,
  HiFilter,
  HiCalendar,
  HiOfficeBuilding,
  HiDownload,
  HiUser,
  HiMail,
  HiLocationMarker,
  HiUsers
} from "react-icons/hi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Skeleton } from "@mui/material";
import ViewReferralModal from "./model/ViewReferralModal";
import UpdateStatusModal from "./model/UpdateStatusModal";
import useReferralStore from "../../store/useReferralStore";
import ExportButtons from "../common/PdfExcel";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 }
  },
  hover: {
    scale: 1.02,
    y: -2,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: { duration: 0.2 }
  }
};

export default function ReferralList() {
  const { referrals, loading, error, fetchAllReferrals, updateReferralStatus } =
    useReferralStore();

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [department, setDepartment] = useState("All");
  const [viewMode, setViewMode] = useState("table"); // table or cards
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState(null);

  useEffect(() => {
    fetchAllReferrals();
  }, [fetchAllReferrals]);

  const filteredReferrals = useMemo(() => {
    if (!referrals) return [];
    return referrals.filter((item) => {
      if (searchText) {
        const matchDesignation = item.designation
          .toLowerCase()
          .includes(searchText.toLowerCase());
        const matchCandidate = item.candidateName
          .toLowerCase()
          .includes(searchText.toLowerCase());
        if (!matchDesignation && !matchCandidate) return false;
      }

      if (department !== "All" && item.department !== department) return false;

      if (selectedDate) {
        const createdAt = new Date(item.createdAt);
        const selectedMonth = selectedDate.getMonth();
        const selectedYear = selectedDate.getFullYear();

        if (
          createdAt.getMonth() !== selectedMonth ||
          createdAt.getFullYear() !== selectedYear
        ) {
          return false;
        }
      }

      return true;
    });
  }, [referrals, searchText, department, selectedDate]);

  const totalPages = Math.ceil(filteredReferrals.length / pageSize);
  const currentTableData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredReferrals.slice(startIndex, startIndex + pageSize);
  }, [filteredReferrals, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpenViewModal = (referral) => {
    setSelectedReferral(referral);
    setIsViewModalOpen(true);
  };

  const handleOpenUpdateModal = (referral) => {
    setSelectedReferral(referral);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateStatus = async (newStatus, feedback) => {
    if (!selectedReferral) return;
    try {
      await updateReferralStatus(selectedReferral.id, newStatus, feedback);
      alert(`Status updated to '${newStatus}'.`);
      setIsUpdateModalOpen(false);
    } catch (err) {
      alert("Error updating referral status.");
      console.error(err);
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "Onboard":
        return {
          color: "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800",
          icon: FaCheckCircle,
          iconColor: "text-green-600 dark:text-green-400"
        };
      case "In Review":
        return {
          color: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
          icon: FaClock,
          iconColor: "text-yellow-600 dark:text-yellow-400"
        };
      case "Rejected":
        return {
          color: "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800",
          icon: FaTimes,
          iconColor: "text-red-600 dark:text-red-400"
        };
      case "Pending":
        return {
          color: "bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-800",
          icon: FaClock,
          iconColor: "text-orange-600 dark:text-orange-400"
        };
      default:
        return {
          color: "bg-gray-100 dark:bg-gray-700/50 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600",
          icon: FaClock,
          iconColor: "text-gray-600 dark:text-gray-400"
        };
    }
  };

  const exportData = currentTableData.map((item, index) => {
    const rowIndex = (currentPage - 1) * pageSize + (index + 1);
    return {
      sl: String(rowIndex).padStart(2, "0"),
      designation: item.designation,
      department: item.department,
      referredBy: item.referredBy,
      candidateName: item.candidateName,
      candidateEmail: item.candidateEmail,
      candidateLocation: item.candidateLocation,
      status: item.status,
      createdAt: new Date(item.createdAt).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };
  });

  const columns = [
    { header: "S.L", dataKey: "sl" },
    { header: "Designation", dataKey: "designation" },
    { header: "Department", dataKey: "department" },
    { header: "Referred By", dataKey: "referredBy" },
    { header: "Candidate Name", dataKey: "candidateName" },
    { header: "Candidate Email", dataKey: "candidateEmail" },
    { header: "Candidate Location", dataKey: "candidateLocation" },
    { header: "Status", dataKey: "status" },
    { header: "Created On", dataKey: "createdAt" },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 lg:p-8"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
              <HiUsers className="text-blue-600 dark:text-blue-400 text-2xl" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Referral Management
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Track and manage employee referrals and candidate progress
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Left Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              {/* Page Size */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  Show
                </label>
                <select
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
                <span className="text-sm text-gray-600 dark:text-gray-400">entries</span>
              </div>

              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by designation or candidate..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              {/* Filters */}
              <div className="flex items-center space-x-3">
                {/* Date Picker */}
                <div className="relative">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      setCurrentPage(1);
                    }}
                    dateFormat="MMM yyyy"
                    showMonthYearPicker
                    placeholderText="Select Month"
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Department Filter */}
                <select
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={department}
                  onChange={(e) => {
                    setDepartment(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="All">All Departments</option>
                  <option value="IT">IT</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === "table"
                      ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode("cards")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === "cards"
                      ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  Cards
                </button>
              </div>

              {/* Export */}
              <ExportButtons
                data={exportData}
                columns={columns}
                filename="ReferralList"
              />
            </div>
          </div>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-center"
          >
            <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
          </motion.div>
        )}

        {/* Content */}
        <motion.div variants={itemVariants}>
          {loading ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="space-y-4">
                {Array.from({ length: pageSize }).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    height={60}
                    className="rounded-lg"
                  />
                ))}
              </div>
            </div>
          ) : filteredReferrals.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
              <HiUsers className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No Referrals Found
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                {searchText || selectedDate || department !== "All" 
                  ? "Try adjusting your search or filter criteria"
                  : "No referrals have been submitted yet"}
              </p>
            </div>
          ) : (
            <>
              {/* Table View */}
              {viewMode === "table" && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            #
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Position
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Department
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Candidate
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Referred By
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <AnimatePresence>
                          {currentTableData.map((item, index) => {
                            const rowIndex = (currentPage - 1) * pageSize + (index + 1);
                            const statusConfig = getStatusConfig(item.status);
                            
                            return (
                              <motion.tr
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                  {String(rowIndex).padStart(2, "0")}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {item.designation}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center space-x-2">
                                    <HiOfficeBuilding className="text-gray-400 text-sm" />
                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                      {item.department}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                      {item.candidateName}
                                    </div>
                                    <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                                      <HiMail className="text-xs" />
                                      <span>{item.candidateEmail}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                                      <HiLocationMarker className="text-xs" />
                                      <span>{item.candidateLocation}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center space-x-2">
                                    <HiUser className="text-gray-400 text-sm" />
                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                      {item.referredBy}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                                    <statusConfig.icon className={`text-xs ${statusConfig.iconColor}`} />
                                    <span>{item.status}</span>
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                  <div className="flex items-center justify-end space-x-2">
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => handleOpenViewModal(item)}
                                      className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                                      title="View Details"
                                    >
                                      <HiEye className="h-4 w-4" />
                                    </motion.button>
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => handleOpenUpdateModal(item)}
                                      className="p-2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200"
                                      title="Update Status"
                                    >
                                      <HiPencil className="h-4 w-4" />
                                    </motion.button>
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => alert(`Delete referral ${item.id}`)}
                                      className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                                      title="Delete"
                                    >
                                      <HiTrash className="h-4 w-4" />
                                    </motion.button>
                                  </div>
                                </td>
                              </motion.tr>
                            );
                          })}
                        </AnimatePresence>
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Showing <span className="font-medium">{currentTableData.length}</span> of{" "}
                        <span className="font-medium">{filteredReferrals.length}</span> referrals
                      </div>
                      <div className="flex items-center space-x-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-3 py-2 rounded-lg border transition-all duration-200 ${
                              currentPage === i + 1
                                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                            }`}
                            onClick={() => handlePageChange(i + 1)}
                          >
                            {i + 1}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Cards View */}
              {viewMode === "cards" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {currentTableData.map((item, index) => {
                      const statusConfig = getStatusConfig(item.status);
                      
                      return (
                        <motion.div
                          key={item.id}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          whileHover="hover"
                          transition={{ delay: index * 0.05 }}
                          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                        >
                          {/* Card Header */}
                          <div className="bg-blue-50 dark:bg-blue-900/10 p-6 border-b border-gray-100 dark:border-gray-700">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                                  <FaUserPlus className="text-blue-600 dark:text-blue-400 text-lg" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                    {item.designation}
                                  </h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {item.department}
                                  </p>
                                </div>
                              </div>
                              <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                                <statusConfig.icon className={`text-xs ${statusConfig.iconColor}`} />
                                <span>{item.status}</span>
                              </span>
                            </div>
                          </div>

                          {/* Card Content */}
                          <div className="p-6 space-y-4">
                            {/* Candidate Info */}
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <HiUser className="text-gray-400" />
                                <div>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Candidate</p>
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {item.candidateName}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-3">
                                <HiMail className="text-gray-400" />
                                <div>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                                  <p className="text-sm text-gray-900 dark:text-white truncate">
                                    {item.candidateEmail}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-3">
                                <HiLocationMarker className="text-gray-400" />
                                <div>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                                  <p className="text-sm text-gray-900 dark:text-white">
                                    {item.candidateLocation}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-3">
                                <HiUser className="text-gray-400" />
                                <div>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Referred By</p>
                                  <p className="text-sm text-gray-900 dark:text-white">
                                    {item.referredBy}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-3">
                                <HiCalendar className="text-gray-400" />
                                <div>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Submitted</p>
                                  <p className="text-sm text-gray-900 dark:text-white">
                                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    })}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleOpenViewModal(item)}
                                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                              >
                                <HiEye />
                                <span>View</span>
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleOpenUpdateModal(item)}
                                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                              >
                                <HiPencil />
                                <span>Update</span>
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {isViewModalOpen && selectedReferral && (
          <ViewReferralModal
            referral={selectedReferral}
            onClose={() => setIsViewModalOpen(false)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isUpdateModalOpen && selectedReferral && (
          <UpdateStatusModal
            referral={selectedReferral}
            onClose={() => setIsUpdateModalOpen(false)}
            onSubmit={handleUpdateStatus}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
