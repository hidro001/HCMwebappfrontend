// import { useState, useMemo, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Skeleton } from "@mui/material";
// import { FaEye, FaEdit, FaTrash, FaPrint, FaFilePdf } from "react-icons/fa";
// import { MdOutlineFileDownload } from "react-icons/md";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// import IssueDetailsModal from "./model/IssueDetailsModal";
// import FilePoshModal from "./model/FilePoshModal";
// import ConfirmationDialog from "../../common/ConfirmationDialog";
// import { usePoshStore } from "../../../store/poshStore";

// export default function FilePosh() {
//   const { poshActs, fetchAllUserPoshActs, loading } = usePoshStore();

//   const [searchText, setSearchText] = useState("");
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [pageSize, setPageSize] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   const [viewModalOpen, setViewModalOpen] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);

//   useEffect(() => {
//     fetchAllUserPoshActs();
//   }, [fetchAllUserPoshActs]);

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
//       if (searchText) {
//         const rId = ticket.reporterId?.toLowerCase() || "";
//         const rName = ticket.reporterName?.toLowerCase() || "";
//         const aId = ticket.accusedId?.toLowerCase() || "";
//         const aName = ticket.accusedName?.toLowerCase() || "";
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
//       if (statusFilter !== "All" && ticket.status !== statusFilter)
//         return false;
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

//   // Container variants (top-level fade + stagger)
//   const containerVariants = {
//     hidden: { opacity: 0, y: -10 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
//   };

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

//   // Row variants (each row slides up & fades in)
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

//   return (
//     <div className="mx-auto px-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors  ">
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
//           <button
//             onClick={handleEdit}
//             className="ml-auto bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 text-sm transition-colors"
//           >
//             + File Posh
//           </button>
//         </div>
//       </motion.div>

//       {/* Main table container (with staggering) */}
//       <motion.div
//         className="bg-white dark:bg-gray-800 rounded-md shadow overflow-x-auto transition-colors"
//         variants={tableContainerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         {loading ? (
//           <div className="p-4">
//             {Array.from({ length: 10 }).map((_, i) => (
//               <Skeleton
//                 key={i}
//                 variant="rectangular"
//                 height={40}
//                 className="mb-2"
//               />
//             ))}
//           </div>
//         ) : (
//           <table className="w-full text-left border-collapse min-w-max">
//             <thead className="bg-gray-50 dark:bg-gray-700">
//               <tr>
//                 <th className="p-3 text-sm font-semibold">S.L</th>
//                 <th className="p-3 text-sm font-semibold">Type</th>
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

//                 // Status color classes
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
//                       {ticket.type}
//                     </td>
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
//           </table>
//         )}

//         {/* Pagination & No Records */}
//         {!loading && filteredData.length > 0 && (
//           <div className="flex flex-col md:flex-row justify-between items-center p-3 gap-2 text-sm">
//             <div>
//               Showing {paginatedData.length} of {filteredData.length} entries
//             </div>
//             <div className="flex items-center space-x-1">
//               {Array.from({ length: totalPages }, (_, i) => (
//                 <button
//                   key={i}
//                   className={`px-3 py-1 rounded border transition-colors ${
//                     currentPage === i + 1
//                       ? "bg-blue-600 text-white border-blue-600"
//                       : `bg-white dark:bg-gray-700 
//                          text-gray-700 dark:text-gray-100 
//                          border-gray-200 dark:border-gray-600 
//                          hover:bg-gray-50 dark:hover:bg-gray-600`
//                   }`}
//                   onClick={() => handlePageChange(i + 1)}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {!loading && filteredData.length === 0 && (
//           <div className="p-4 text-sm text-center text-gray-500 dark:text-gray-400">
//             No matching records found
//           </div>
//         )}
//       </motion.div>

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

//       {/* View Issue Modal */}
//       <IssueDetailsModal
//         isOpen={viewModalOpen}
//         onClose={() => setViewModalOpen(false)}
//         issue={selectedItem}
//       />

//       {/* File Posh (Edit/Create) Modal */}
//       <FilePoshModal
//         isOpen={editModalOpen}
//         onClose={() => setEditModalOpen(false)}
//         ticket={selectedItem}
//         onSave={(formData) => {
//           setEditModalOpen(false);
//           // Optionally handle saving logic here
//         }}
//       />
//     </div>
//   );
// }



import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaEye, FaEdit, FaTrash, FaPrint, FaFilePdf, FaShieldAlt, FaExclamationTriangle,
  FaUserShield, FaBalanceScale, FaCalendarAlt, FaFilter, FaPlus, FaUsers,
  FaClipboardList, FaGavel, FaCheckCircle, FaClock, FaSearch, FaDownload,
  FaFileAlt, FaUserTie, FaChevronLeft, FaChevronRight
} from "react-icons/fa";
import { 
  MdOutlineFileDownload, MdSecurity, MdReportProblem, MdGavel, MdAccessTime,
  MdCheckCircle, MdPending, MdFilterList, MdAdd, MdRefresh, MdViewModule,
  MdCalendarToday, MdSearch, MdClose, MdPerson, MdAssignment, MdVerifiedUser
} from "react-icons/md";
import {
   HiOutlineUserGroup, HiOutlineScale,
  HiOutlineCalendar, HiOutlineFilter, HiOutlineEye, HiOutlinePencil, HiOutlineTrash,
  HiOutlinePlus, HiOutlineRefresh, HiOutlineDownload, HiOutlineClipboardList,
  HiOutlineDocument, HiOutlineUser, HiOutlineClock, HiOutlineCheckCircle,
  HiOutlineBadgeCheck, HiOutlineCollection
} from "react-icons/hi";
import { HiOutlineExclamationTriangle , HiShieldCheck ,} from 'react-icons/hi2'
import { BiShield, BiCalendar, BiFilter, BiSearch, BiUser } from "react-icons/bi";
import {  AiOutlineCalendar, AiOutlineFilter, AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Skeleton Component
const Skeleton = ({ height = 40, className = "" }) => (
  <div 
    className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
    style={{ height: `${height}px` }}
  />
);

// Import your actual components and store
import IssueDetailsModal from "./model/IssueDetailsModal";
import FilePoshModal from "./model/FilePoshModal";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import { usePoshStore } from "../../../store/poshStore";

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

export default function FilePosh() {
  const { poshActs, fetchAllUserPoshActs, loading } = usePoshStore();

  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchAllUserPoshActs();
  }, [fetchAllUserPoshActs]);

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

  const handleCreateNew = () => {
    setSelectedItem(null);
    setEditModalOpen(true);
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
      if (statusFilter !== "All" && ticket.status !== statusFilter) return false;
      if (typeFilter !== "All" && ticket.type !== typeFilter) return false;
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
      default: return <HiShieldCheck  className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-900 dark:via-orange-900 dark:to-yellow-900 transition-all duration-500">
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
                className="p-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl shadow-lg"
              >
                <HiShieldCheck  className="text-white text-2xl" />
              </motion.div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  POSH Issues Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Prevention of Sexual Harassment - Case Management System
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCreateNew}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
              >
                <HiOutlinePlus />
                <span className="hidden sm:inline">File POSH Case</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fetchAllUserPoshActs()}
                className="p-3 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <MdRefresh className="text-xl" />
              </motion.button>
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
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-red-200 dark:border-red-700"
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
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-red-200 dark:border-red-700 mb-6 overflow-hidden"
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
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
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
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all w-full lg:w-80"
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
                      ? 'bg-red-500 text-white shadow-lg' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <HiOutlineFilter />
                  <span className="hidden sm:inline">Filters</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {/* Export functionality */}}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all font-medium"
                >
                  <HiOutlineDownload />
                  <span className="hidden sm:inline">Export</span>
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
                        className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all w-full"
                      />
                    </div>

                    <select
                      className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
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
                      className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
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
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
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

        {/* Main Table */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-red-200 dark:border-red-700"
          >
            <div className="space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton
                  key={i}
                  height={60}
                  className="rounded-lg"
                />
              ))}
            </div>
          </motion.div>
        ) : filteredData.length > 0 ? (
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-red-200 dark:border-red-700"
            variants={tableContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-red-50 to-orange-100 dark:from-red-900 dark:to-orange-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">S.L</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Accused</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Reporter</th>
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
                        className="hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                          {String(slIndex).padStart(2, "0")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(ticket.type)}
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {ticket.type}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
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
                              <div className="text-sm text-red-600 dark:text-red-400">
                                {ticket.accusedId}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
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
                              <div className="text-sm text-blue-600 dark:text-blue-400">
                                {ticket.reporterId}
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
                              title="Edit Case"
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
            <div className="bg-red-50 dark:bg-red-900/50 px-6 py-4 border-t border-red-200 dark:border-red-700">
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
                              ? "bg-red-600 text-white border-red-600 shadow-lg"
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
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-red-200 dark:border-red-700 p-12 text-center"
          >
            <div className="max-w-md mx-auto">
              <div className="p-6 bg-red-100 dark:bg-red-900/30 rounded-2xl mb-6 inline-block">
                <HiShieldCheck  className="text-4xl text-red-500 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No POSH cases found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                No cases match your current filters. Try adjusting your search criteria or file a new POSH case.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCreateNew}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium mx-auto"
              >
                <HiOutlinePlus />
                File New POSH Case
              </motion.button>
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

        <FilePoshModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          ticket={selectedItem}
          onSave={(formData) => {
            setEditModalOpen(false);
            // The modal will handle the actual save logic through your store
          }}
        />
      </div>

      {/* Additional Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(239, 68, 68, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(239, 68, 68, 0.8);
        }
      `}</style>
    </div>
  );
}