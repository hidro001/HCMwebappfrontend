// import { useState, useMemo, useEffect } from "react";
// import { motion } from "framer-motion";
// import {
//   FaEye,
//   FaComment,
//   FaEdit,
//   FaTrash,
//   FaPrint,
//   FaFilePdf,
// } from "react-icons/fa";
// import { MdOutlineFileDownload } from "react-icons/md";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { Skeleton } from "@mui/material";
// import IssueDetailsModal from "./model/IssueDetailsModal";
// import EditStatusModal from "./model/EditStatusModal";
// import ConfirmationDialog from "../../common/ConfirmationDialog";
// import { usePoshStore } from "../../../store/poshStore";
// import ExportButtons from "../../common/PdfExcel"; // Adjust path if needed

// export default function PoshManage() {
//   const { poshActs, fetchPoshActs, loading } = usePoshStore();

//   // State
//   const [searchText, setSearchText] = useState("");
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [pageSize, setPageSize] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [viewModalOpen, setViewModalOpen] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);

//   // Fetch data on mount
//   useEffect(() => {
//     fetchPoshActs();
//   }, [fetchPoshActs]);

//   // Handlers
//   const handleView = (ticket) => {
//     setSelectedItem(ticket);
//     setViewModalOpen(true);
//   };

//   const handleEdit = (ticket) => {
//     setSelectedItem(ticket);
//     setEditModalOpen(true);
//   };

//   const handleDelete = (ticket) => {
//     setSelectedItem(ticket);
//     setDeleteDialogOpen(true);
//   };

//   // Filtering
//   const filteredData = useMemo(() => {
//     return poshActs.filter((ticket) => {
//       // Search text
//       if (searchText) {
//         const rId = ticket.reporterId.toLowerCase();
//         const rName = ticket.reporterName.toLowerCase();
//         const aId = ticket.accusedId.toLowerCase();
//         const aName = ticket.accusedName.toLowerCase();
//         const searchLower = searchText.toLowerCase();
//         if (
//           !rId.includes(searchLower) &&
//           !rName.includes(searchLower) &&
//           !aId.includes(searchLower) &&
//           !aName.includes(searchLower)
//         ) {
//           return false;
//         }
//       }
//       // Status filter
//       if (statusFilter !== "All" && ticket.status !== statusFilter)
//         return false;
//       // Date filter
//       if (selectedDate) {
//         const ticketDate = new Date(ticket.incidentDate).setHours(0, 0, 0, 0);
//         const filterDate = selectedDate.setHours(0, 0, 0, 0);
//         if (ticketDate !== filterDate) return false;
//       }
//       return true;
//     });
//   }, [searchText, statusFilter, selectedDate, poshActs]);

//   // Pagination
//   const totalPages = Math.ceil(filteredData.length / pageSize);
//   const paginatedData = useMemo(() => {
//     const startIndex = (currentPage - 1) * pageSize;
//     return filteredData.slice(startIndex, startIndex + pageSize);
//   }, [filteredData, currentPage, pageSize]);

//   const handlePageChange = (page) => setCurrentPage(page);

//   // Container variants for top-level fade-in (toolbar)
//   const containerVariants = {
//     hidden: { opacity: 0, y: -10 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
//   };

//   // Table container variants for fade-in + staggered rows
//   const tableContainerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 0.2,
//         when: "beforeChildren",
//         staggerChildren: 0.05,
//       },
//     },
//   };

//   // Row variants for each row animation
//   const tableRowVariants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.1,
//         ease: "easeOut",
//       },
//     },
//   };

//   // Flatten paginatedData for exporting
//   const exportData = paginatedData.map((ticket, index) => {
//     const slIndex = (currentPage - 1) * pageSize + (index + 1);
//     return {
//       sl: String(slIndex).padStart(2, "0"),
//       reporterId: ticket.reporterId,
//       reporterName: ticket.reporterName,
//       accusedId: ticket.accusedId,
//       accusedName: ticket.accusedName,
//       incidentDate: ticket.incidentDate
//         ? new Date(ticket.incidentDate).toLocaleDateString("en-GB")
//         : "N/A",
//       status: ticket.status,
//     };
//   });

//   // Define columns
//   const columns = [
//     { header: "S.L", dataKey: "sl" },
//     { header: "Reporter Emp ID", dataKey: "reporterId" },
//     { header: "Reporter Name", dataKey: "reporterName" },
//     { header: "Accused Emp ID", dataKey: "accusedId" },
//     { header: "Accused Name", dataKey: "accusedName" },
//     { header: "Incident Date", dataKey: "incidentDate" },
//     { header: "Status", dataKey: "status" },
//   ];

//   return (
//     <div className="mx-auto px-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors ">
//       <h1 className="text-2xl font-bold mb-2">POSH Issues</h1>

//       {/* Toolbar */}
//       <motion.div
//         className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-md shadow transition-colors mb-3"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <div className="flex flex-wrap items-center gap-4">
//           <div className="flex items-center gap-2">
//             <label className="text-sm font-semibold whitespace-nowrap">
//               Show
//             </label>
//             <select
//               className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:outline-none"
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
//           <div>
//             <input
//               type="text"
//               placeholder="Search"
//               className="border rounded px-3 py-1 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:outline-none"
//               value={searchText}
//               onChange={(e) => {
//                 setSearchText(e.target.value);
//                 setCurrentPage(1);
//               }}
//             />
//           </div>
//         </div>
//         <div className="flex flex-wrap items-center gap-4">
//           <DatePicker
//             selected={selectedDate}
//             onChange={(date) => {
//               setSelectedDate(date);
//               setCurrentPage(1);
//             }}
//             dateFormat="dd/MM/yyyy"
//             placeholderText="DD/MM/YYYY"
//             className="border rounded px-3 py-1 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:outline-none"
//           />
//           <select
//             className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:outline-none"
//             value={statusFilter}
//             onChange={(e) => {
//               setStatusFilter(e.target.value);
//               setCurrentPage(1);
//             }}
//           >
//             <option value="All">All Status</option>
//             <option value="Pending">Pending</option>
//             <option value="Resolved">Resolved</option>
//             <option value="Under Review">Under Review</option>
//           </select>
//           <div className="flex items-center gap-4 text-gray-500 dark:text-gray-300">
//             <ExportButtons
//               data={exportData}
//               columns={columns}
//               filename="PoshIssues"
//             />
//           </div>
//         </div>
//       </motion.div>

//       {/* Loading or Table */}
//       {loading ? (
//         <div className="bg-white dark:bg-gray-800 rounded-md shadow p-4 transition-colors">
//           {Array.from({ length: 10 }).map((_, i) => (
//             <Skeleton
//               key={i}
//               variant="rectangular"
//               height={40}
//               className="mb-2"
//             />
//           ))}
//         </div>
//       ) : (
//         <motion.div
//           className="bg-white dark:bg-gray-800 rounded-md shadow overflow-x-auto transition-colors"
//           variants={tableContainerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <motion.table className="w-full text-left border-collapse min-w-max">
//             <thead className="bg-gray-50 dark:bg-gray-700">
//               <tr>
//                 <th className="p-3 text-sm font-semibold">S.L</th>
//                 <th className="p-3 text-sm font-semibold">Reporter Emp ID</th>
//                 <th className="p-3 text-sm font-semibold">Reporter Name</th>
//                 <th className="p-3 text-sm font-semibold">Accused Emp ID</th>
//                 <th className="p-3 text-sm font-semibold">Accused Name</th>
//                 <th className="p-3 text-sm font-semibold">Incident Date</th>
//                 <th className="p-3 text-sm font-semibold">Status</th>
//                 <th className="p-3 text-sm font-semibold">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedData.map((ticket, index) => {
//                 const slIndex = (currentPage - 1) * pageSize + (index + 1);

//                 // Status classes
//                 let statusClasses =
//                   "bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-500";
//                 if (ticket.status === "Pending") {
//                   statusClasses =
//                     "bg-orange-50 dark:bg-orange-700 text-orange-600 dark:text-orange-100 border border-orange-200 dark:border-orange-600";
//                 } else if (ticket.status === "Resolved") {
//                   statusClasses =
//                     "bg-green-50 dark:bg-green-700 text-green-600 dark:text-green-100 border border-green-200 dark:border-green-600";
//                 } else if (ticket.status === "Under Review") {
//                   statusClasses =
//                     "bg-purple-50 dark:bg-purple-700 text-purple-600 dark:text-purple-100 border border-purple-200 dark:border-purple-600";
//                 }

//                 return (
//                   <motion.tr
//                     key={ticket.id}
//                     variants={tableRowVariants}
//                     className="border-b last:border-b-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//                   >
//                     <td className="p-3 text-sm">
//                       {String(slIndex).padStart(2, "0")}
//                     </td>
//                     <td className="p-3 text-sm text-blue-600 dark:text-blue-400">
//                       {ticket.reporterId}
//                     </td>
//                     <td className="p-3 text-sm">{ticket.reporterName}</td>
//                     <td className="p-3 text-sm text-blue-600 dark:text-blue-400">
//                       {ticket.accusedId}
//                     </td>
//                     <td className="p-3 text-sm">{ticket.accusedName}</td>
//                     <td className="p-3 text-sm">
//                       {ticket.incidentDate
//                         ? new Date(ticket.incidentDate).toLocaleDateString(
//                             "en-GB",
//                             {
//                               day: "2-digit",
//                               month: "short",
//                               year: "numeric",
//                             }
//                           )
//                         : "N/A"}
//                     </td>
//                     <td className="p-3 text-sm">
//                       <span
//                         className={`inline-block px-2 py-1 text-xs font-semibold rounded-md ${statusClasses}`}
//                       >
//                         {ticket.status}
//                       </span>
//                     </td>
//                     <td className="p-3 text-sm space-x-3">
//                       <button
//                         title="View"
//                         onClick={() => handleView(ticket)}
//                         className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
//                       >
//                         <FaEye size={16} />
//                       </button>
//                       <button
//                         title="Edit"
//                         onClick={() => handleEdit(ticket)}
//                         className="text-green-500 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 transition-colors"
//                       >
//                         <FaEdit size={16} />
//                       </button>
//                       <button
//                         title="Delete"
//                         onClick={() => handleDelete(ticket)}
//                         className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
//                       >
//                         <FaTrash size={16} />
//                       </button>
//                     </td>
//                   </motion.tr>
//                 );
//               })}
//             </tbody>
//           </motion.table>

//           {/* Pagination + No records handling */}
//           {filteredData.length > 0 && (
//             <div className="flex flex-col md:flex-row justify-between items-center p-3 gap-2 text-sm">
//               <div>
//                 Showing {paginatedData.length} of {filteredData.length} entries
//               </div>
//               <div className="flex items-center space-x-1">
//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <button
//                     key={i}
//                     className={`px-3 py-1 rounded border transition-colors ${
//                       currentPage === i + 1
//                         ? "bg-blue-600 text-white border-blue-600"
//                         : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
//                     }`}
//                     onClick={() => handlePageChange(i + 1)}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//           {filteredData.length === 0 && (
//             <div className="p-4 text-sm text-center text-gray-500 dark:text-gray-400">
//               No matching records found
//             </div>
//           )}
//         </motion.div>
//       )}

//       {/* Confirmation Dialog */}
//       <ConfirmationDialog
//         open={deleteDialogOpen}
//         title="Delete POSH Act"
//         message="Are you sure you want to delete this record?"
//         onConfirm={() => {
//           const { deletePoshAct } = usePoshStore.getState();
//           if (selectedItem) {
//             deletePoshAct(selectedItem.id);
//           }
//           setDeleteDialogOpen(false);
//         }}
//         onCancel={() => setDeleteDialogOpen(false)}
//       />

//       {/* Modals */}
//       <IssueDetailsModal
//         isOpen={viewModalOpen}
//         onClose={() => setViewModalOpen(false)}
//         issue={selectedItem}
//       />
//       <EditStatusModal
//         isOpen={editModalOpen}
//         onClose={() => setEditModalOpen(false)}
//         item={selectedItem}
//         onUpdateStatus={() => {}}
//       />
//     </div>
//   );
// }


import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEye,
  FaComment,
  FaEdit,
  FaTrash,
  FaPrint,
  FaFilePdf,
  FaShieldAlt,
  FaExclamationTriangle,
  FaUserShield,
  FaBalanceScale,
  FaCalendarAlt,
  FaFilter,
  FaUsers,
  FaClipboardList,
  FaGavel,
  FaCheckCircle,
  FaClock,
  FaSearch,
  FaDownload,
  FaFileAlt,
  FaUserTie,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner
} from "react-icons/fa";
import { 
  MdOutlineFileDownload, MdSecurity, MdReportProblem, MdGavel, MdAccessTime,
  MdCheckCircle, MdPending, MdFilterList, MdRefresh, MdViewModule,
  MdCalendarToday, MdSearch, MdClose, MdPerson, MdAssignment, MdVerifiedUser,
  MdAdminPanelSettings, MdManageAccounts, MdSupervisorAccount
} from "react-icons/md";
import {
 HiOutlineUserGroup, HiOutlineScale,
  HiOutlineCalendar, HiOutlineFilter, HiOutlineEye, HiOutlinePencil, HiOutlineTrash,
  HiOutlineRefresh, HiOutlineDownload, HiOutlineClipboardList,
  HiOutlineDocument, HiOutlineUser, HiOutlineClock, HiOutlineCheckCircle,
  HiOutlineBadgeCheck, HiOutlineCollection, HiOutlineViewGrid
} from "react-icons/hi";

import { HiOutlineExclamationTriangle, } from 'react-icons/hi2';
// import { MdSecurity } from 'react-icons/md'; // shield-like security icon

import { BiShield, BiCalendar, BiFilter, BiSearch, BiUser } from "react-icons/bi";
import {  AiOutlineCalendar, AiOutlineFilter, AiOutlineSearch } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Skeleton } from "@mui/material";
import IssueDetailsModal from "./model/IssueDetailsModal";
import EditStatusModal from "./model/EditStatusModal";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import { usePoshStore } from "../../../store/poshStore";
import ExportButtons from "../../common/PdfExcel";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
};

const tableContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
};

const tableRowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { duration: 0.4 }
  },
};

const filterVariants = {
  hidden: { opacity: 0, height: 0, y: -10 },
  visible: { 
    opacity: 1, 
    height: "auto",
    y: 0,
    transition: { duration: 0.3 }
  },
  exit: {
    opacity: 0,
    height: 0,
    y: -10,
    transition: { duration: 0.2 }
  }
};

export default function PoshManage() {
  const { poshActs, fetchPoshActs, loading } = usePoshStore();

  // State
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('table');

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    fetchPoshActs();
  }, [fetchPoshActs]);

  // Handlers
  const handleView = (ticket) => {
    setSelectedItem(ticket);
    setViewModalOpen(true);
  };

  const handleEdit = (ticket) => {
    setSelectedItem(ticket);
    setEditModalOpen(true);
  };

  const handleDelete = (ticket) => {
    setSelectedItem(ticket);
    setDeleteDialogOpen(true);
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const total = poshActs.length;
    const pending = poshActs.filter(p => p.status === 'Pending').length;
    const underReview = poshActs.filter(p => p.status === 'Under Review').length;
    const resolved = poshActs.filter(p => p.status === 'Resolved').length;
    const harassment = poshActs.filter(p => p.type === 'Harassment').length;
    const discrimination = poshActs.filter(p => p.type === 'Discrimination').length;

    return { total, pending, underReview, resolved, harassment, discrimination };
  }, [poshActs]);

  // Filtering
  const filteredData = useMemo(() => {
    return poshActs.filter((ticket) => {
      // Search text
      if (searchText) {
        const rId = ticket.reporterId?.toLowerCase() || "";
        const rName = ticket.reporterName?.toLowerCase() || "";
        const aId = ticket.accusedId?.toLowerCase() || "";
        const aName = ticket.accusedName?.toLowerCase() || "";
        const searchLower = searchText.toLowerCase();
        if (
          !rId.includes(searchLower) &&
          !rName.includes(searchLower) &&
          !aId.includes(searchLower) &&
          !aName.includes(searchLower)
        ) {
          return false;
        }
      }
      // Status filter
      if (statusFilter !== "All" && ticket.status !== statusFilter) return false;
      // Type filter
      if (typeFilter !== "All" && ticket.type !== typeFilter) return false;
      // Date filter
      if (selectedDate) {
        const ticketDate = new Date(ticket.incidentDate).setHours(0, 0, 0, 0);
        const filterDate = selectedDate.setHours(0, 0, 0, 0);
        if (ticketDate !== filterDate) return false;
      }
      return true;
    });
  }, [searchText, statusFilter, typeFilter, selectedDate, poshActs]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const handlePageChange = (page) => setCurrentPage(page);

  // Flatten paginatedData for exporting
  const exportData = paginatedData.map((ticket, index) => {
    const slIndex = (currentPage - 1) * pageSize + (index + 1);
    return {
      sl: String(slIndex).padStart(2, "0"),
      reporterId: ticket.reporterId,
      reporterName: ticket.reporterName,
      accusedId: ticket.accusedId,
      accusedName: ticket.accusedName,
      incidentDate: ticket.incidentDate
        ? new Date(ticket.incidentDate).toLocaleDateString("en-GB")
        : "N/A",
      status: ticket.status,
    };
  });

  // Define columns
  const columns = [
    { header: "S.L", dataKey: "sl" },
    { header: "Reporter Emp ID", dataKey: "reporterId" },
    { header: "Reporter Name", dataKey: "reporterName" },
    { header: "Accused Emp ID", dataKey: "accusedId" },
    { header: "Accused Name", dataKey: "accusedName" },
    { header: "Incident Date", dataKey: "incidentDate" },
    { header: "Status", dataKey: "status" },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <HiOutlineClock className="text-orange-500" />;
      case 'Under Review': return <HiOutlineBadgeCheck className="text-blue-500" />;
      case 'Resolved': return <HiOutlineCheckCircle className="text-green-500" />;
      default: return <HiOutlineClock className="text-gray-500" />;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Harassment': return <HiOutlineExclamationTriangle className="text-red-500" />;
      case 'Discrimination': return <HiOutlineScale className="text-purple-500" />;
      default: return <MdSecurity className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-indigo-900 dark:via-purple-900 dark:to-blue-900 transition-all duration-500">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg"
              >
                <MdSupervisorAccount className="text-white text-2xl" />
              </motion.div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  POSH Management Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Administrative Panel - Case Review & Management System
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fetchPoshActs()}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 font-medium"
              >
                <MdRefresh />
                <span className="hidden sm:inline">Refresh</span>
              </motion.button>
              
              <ExportButtons
                data={exportData}
                columns={columns}
                filename="PoshManagement"
              />
            </div>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8"
        >
          {[
            { label: 'Total Cases', value: stats.total, icon: HiOutlineClipboardList, color: 'from-blue-500 to-blue-600' },
            { label: 'Pending', value: stats.pending, icon: HiOutlineClock, color: 'from-orange-500 to-orange-600' },
            { label: 'Under Review', value: stats.underReview, icon: HiOutlineBadgeCheck, color: 'from-blue-500 to-blue-600' },
            { label: 'Resolved', value: stats.resolved, icon: HiOutlineCheckCircle, color: 'from-green-500 to-green-600' },
            { label: 'Harassment', value: stats.harassment, icon: HiOutlineExclamationTriangle, color: 'from-red-500 to-red-600' },
            { label: 'Discrimination', value: stats.discrimination, icon: HiOutlineScale, color: 'from-purple-500 to-purple-600' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-200 dark:border-indigo-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="text-white text-xl" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-indigo-200 dark:border-indigo-700 mb-6 overflow-hidden"
        >
          <div className="p-6">
            {/* Top Row Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    Show
                  </label>
                  <select
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>

                <div className="relative">
                  <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search cases, employees..."
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all w-full lg:w-80"
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    showFilters 
                      ? 'bg-indigo-500 text-white shadow-lg' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <HiOutlineFilter />
                  <span className="hidden sm:inline">Filters</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode(viewMode === 'table' ? 'cards' : 'table')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all font-medium"
                >
                  <HiOutlineViewGrid />
                  <span className="hidden sm:inline">{viewMode === 'table' ? 'Cards' : 'Table'}</span>
                </motion.button>
              </div>
            </div>

            {/* Expandable Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  variants={filterVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="border-t border-gray-200 dark:border-gray-700 pt-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="relative">
                      <AiOutlineCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => {
                          setSelectedDate(date);
                          setCurrentPage(1);
                        }}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Incident Date"
                        className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all w-full"
                      />
                    </div>

                    <select
                      className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      value={typeFilter}
                      onChange={(e) => {
                        setTypeFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                    >
                      <option value="All">All Types</option>
                      <option value="Harassment">Harassment</option>
                      <option value="Discrimination">Discrimination</option>
                    </select>

                    <select
                      className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      value={statusFilter}
                      onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                    >
                      <option value="All">All Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Resolved">Resolved</option>
                    </select>

                    <div className="flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSearchText('');
                          setSelectedDate(null);
                          setTypeFilter('All');
                          setStatusFilter('All');
                          setCurrentPage(1);
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        <MdClose />
                        Clear Filters
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Content Area */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-indigo-200 dark:border-indigo-700"
          >
            <div className="space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  height={60}
                  className="rounded-lg"
                  sx={{ bgcolor: 'grey.100' }}
                />
              ))}
            </div>
          </motion.div>
        ) : filteredData.length > 0 ? (
          viewMode === 'table' ? (
            /* Table View */
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-indigo-200 dark:border-indigo-700"
              variants={tableContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-indigo-50 to-purple-100 dark:from-indigo-900 dark:to-purple-900">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">S.L</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Reporter</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Accused</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Incident Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {paginatedData.map((ticket, index) => {
                      const slIndex = (currentPage - 1) * pageSize + (index + 1);

                      let statusClasses = "bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200";
                      if (ticket.status === "Pending") {
                        statusClasses = "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400";
                      } else if (ticket.status === "Resolved") {
                        statusClasses = "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400";
                      } else if (ticket.status === "Under Review") {
                        statusClasses = "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400";
                      }

                      return (
                        <motion.tr
                          key={ticket.id}
                          variants={tableRowVariants}
                          className="hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                            {String(slIndex).padStart(2, "0")}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">
                                  {ticket.reporterName?.charAt(0) || 'R'}
                                </span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                  {ticket.reporterName}
                                </div>
                                <div className="text-sm text-blue-600 dark:text-blue-400">
                                  {ticket.reporterId}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">
                                  {ticket.accusedName?.charAt(0) || 'A'}
                                </span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                  {ticket.accusedName}
                                </div>
                                <div className="text-sm text-red-600 dark:text-red-400">
                                  {ticket.accusedId}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                            {ticket.incidentDate
                              ? new Date(ticket.incidentDate).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })
                              : "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(ticket.status)}
                              <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${statusClasses}`}>
                                {ticket.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-3">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                title="View Details"
                                onClick={() => handleView(ticket)}
                                className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all"
                              >
                                <HiOutlineEye size={18} />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                title="Edit Status"
                                onClick={() => handleEdit(ticket)}
                                className="p-2 text-green-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-all"
                              >
                                <HiOutlinePencil size={18} />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                title="Delete Case"
                                onClick={() => handleDelete(ticket)}
                                className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all"
                              >
                                <HiOutlineTrash size={18} />
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Enhanced Pagination */}
              <div className="bg-indigo-50 dark:bg-indigo-900/50 px-6 py-4 border-t border-indigo-200 dark:border-indigo-700">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    Showing <span className="font-semibold">{paginatedData.length}</span> of{" "}
                    <span className="font-semibold">{filteredData.length}</span> entries
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                    >
                      <FaChevronLeft />
                    </motion.button>
                    
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }

                        return (
                          <motion.button
                            key={pageNum}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`px-3 py-2 rounded-lg border transition-all ${
                              currentPage === pageNum
                                ? "bg-indigo-600 text-white border-indigo-600 shadow-lg"
                                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                            }`}
                            onClick={() => handlePageChange(pageNum)}
                          >
                            {pageNum}
                          </motion.button>
                        );
                      })}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                    >
                      <FaChevronRight />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Card View */
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={tableContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {paginatedData.map((ticket, index) => {
                const slIndex = (currentPage - 1) * pageSize + (index + 1);

                let statusColor = "gray";
                if (ticket.status === "Pending") statusColor = "orange";
                else if (ticket.status === "Under Review") statusColor = "blue";
                else if (ticket.status === "Resolved") statusColor = "green";

                return (
                  <motion.div
                    key={ticket.id}
                    variants={cardVariants}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-200 dark:border-indigo-700 overflow-hidden"
                  >
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                            <MdSecurity className="text-white text-xl" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">Case #{String(slIndex).padStart(2, "0")}</h3>
                            <p className="text-indigo-100 text-sm">{ticket.type || 'POSH Case'}</p>
                          </div>
                        </div>
                        {getStatusIcon(ticket.status)}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Reporter</h4>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-xs">
                                {ticket.reporterName?.charAt(0) || 'R'}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {ticket.reporterName}
                              </div>
                              <div className="text-xs text-blue-600 dark:text-blue-400">
                                {ticket.reporterId}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Accused</h4>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-xs">
                                {ticket.accusedName?.charAt(0) || 'A'}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {ticket.accusedName}
                              </div>
                              <div className="text-xs text-red-600 dark:text-red-400">
                                {ticket.accusedId}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Status</span>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(ticket.status)}
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-${statusColor}-100 dark:bg-${statusColor}-900/30 text-${statusColor}-600 dark:text-${statusColor}-400`}>
                              {ticket.status}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Incident Date</span>
                          <div className="flex items-center gap-2">
                            <HiOutlineCalendar className="text-indigo-500" />
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {ticket.incidentDate
                                ? new Date(ticket.incidentDate).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  })
                                : "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all text-sm font-medium"
                          onClick={() => handleView(ticket)}
                        >
                          <HiOutlineEye />
                          View
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleEdit(ticket)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-all text-sm font-medium"
                        >
                          <HiOutlinePencil />
                          Edit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(ticket)}
                          className="p-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-all"
                        >
                          <HiOutlineTrash />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Pagination for Card View */}
              <div className="col-span-full">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-indigo-200 dark:border-indigo-700 p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      Showing <span className="font-semibold">{paginatedData.length}</span> of{" "}
                      <span className="font-semibold">{filteredData.length}</span> entries
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                      >
                        <FaChevronLeft />
                      </motion.button>
                      
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <motion.button
                              key={pageNum}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className={`px-3 py-2 rounded-lg border transition-all ${
                                currentPage === pageNum
                                  ? "bg-indigo-600 text-white border-indigo-600 shadow-lg"
                                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                              }`}
                              onClick={() => handlePageChange(pageNum)}
                            >
                              {pageNum}
                            </motion.button>
                          );
                        })}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                      >
                        <FaChevronRight />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-indigo-200 dark:border-indigo-700 p-12 text-center"
          >
            <div className="max-w-md mx-auto">
              <div className="p-6 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl mb-6 inline-block">
                <MdSecurity className="text-4xl text-indigo-500 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No POSH cases found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                No cases match your current filters. Adjust your search criteria to view cases.
              </p>
            </div>
          </motion.div>
        )}

        {/* Modals */}
        <ConfirmationDialog
          open={deleteDialogOpen}
          title="Delete POSH Case"
          message="Are you sure you want to delete this POSH case? This action cannot be undone."
          onConfirm={() => {
            const { deletePoshAct } = usePoshStore.getState();
            if (selectedItem) {
              deletePoshAct(selectedItem.id);
            }
            setDeleteDialogOpen(false);
          }}
          onCancel={() => setDeleteDialogOpen(false)}
        />

        <IssueDetailsModal
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          issue={selectedItem}
        />

        <EditStatusModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          item={selectedItem}
          onUpdateStatus={() => {
            // Modal will handle the status update through the store
            setEditModalOpen(false);
          }}
        />
      </div>
    </div>
  );
}