

// import React, { useState, useMemo } from "react";
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

// import IssueDetailsModal from "./IssueDetailsModal";
// import EditStatusModal from "./EditStatusModal"; // <-- NEW

// // === DUMMY DATA (as in your example)
// const TICKETS_DATA = [
//   {
//     id: 1,
//     reporterId: "#526534",
//     reporterName: "Kathryn Murphy",
//     accusedId: "#526534",
//     accusedName: "Sameer Hameed",
//     incidentDate: "2024-01-25",
//     status: "Resolved",
//   },
//   {
//     id: 2,
//     reporterId: "#696589",
//     reporterName: "Annette Black",
//     accusedId: "#696589",
//     accusedName: "Kyser Shah",
//     incidentDate: "2024-01-25",
//     status: "Pending",
//   },
//   {
//     id: 3,
//     reporterId: "#256584",
//     reporterName: "Ronald Richards",
//     accusedId: "#256584",
//     accusedName: "Nikunj Gupta",
//     incidentDate: "2024-02-10",
//     status: "Resolved",
//   },
//   {
//     id: 4,
//     reporterId: "#525587",
//     reporterName: "Eleanor Pena",
//     accusedId: "#525587",
//     accusedName: "Anand Sharma",
//     incidentDate: "2024-02-10",
//     status: "Resolved",
//   },
//   {
//     id: 5,
//     reporterId: "#105986",
//     reporterName: "Leslie Alexander",
//     accusedId: "#105986",
//     accusedName: "Yash Tandon",
//     incidentDate: "2024-03-15",
//     status: "Under Review",
//   },
//   {
//     id: 6,
//     reporterId: "#525689",
//     reporterName: "Albert Flores",
//     accusedId: "#525689",
//     accusedName: "Rishi Kumar",
//     incidentDate: "2024-03-15",
//     status: "Resolved",
//   },
//   {
//     id: 7,
//     reporterId: "#525520",
//     reporterName: "Jacob Jones",
//     accusedId: "#525520",
//     accusedName: "Akhilesh Sharma",
//     incidentDate: "2024-04-27",
//     status: "Resolved",
//   },
//   {
//     id: 8,
//     reporterId: "#525684",
//     reporterName: "Jerome Bell",
//     accusedId: "#525684",
//     accusedName: "Kyser Shah",
//     incidentDate: "2024-04-27",
//     status: "Under Review",
//   },
//   {
//     id: 9,
//     reporterId: "#200257",
//     reporterName: "Marvin McKinney",
//     accusedId: "#200257",
//     accusedName: "Nishant Tandon",
//     incidentDate: "2024-04-30",
//     status: "Resolved",
//   },
//   {
//     id: 10,
//     reporterId: "#526525",
//     reporterName: "Cameron Williamson",
//     accusedId: "#526525",
//     accusedName: "Nikunj Gupta",
//     incidentDate: "2024-04-30",
//     status: "Resolved",
//   },
// ];

// export default function POSHIssuesTable() {
//   const [searchText, setSearchText] = useState("");
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [pageSize, setPageSize] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   // For the modals
//   const [viewModalOpen, setViewModalOpen] = useState(false);
//   const [commentModalOpen, setCommentModalOpen] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

//   const [selectedItem, setSelectedItem] = useState(null);

//   // *** Click Handlers ***
//   const handleView = (ticket) => {
//     // Transform data for IssueDetailsModal
//     const transformedIssue = {
//       reporter: `${ticket.reporterName} (${ticket.reporterId})`,
//       accused: `${ticket.accusedName} (${ticket.accusedId})`,
//       incidentDate: ticket.incidentDate,
//       type: "N/A",
//       status: ticket.status,
//       attachment: "Transcend.zip",
//       description: "Lorem ipsum placeholder text for the issue...",
//     };
//     setSelectedItem(transformedIssue);
//     setViewModalOpen(true);
//   };

//   const handleComment = (ticket) => {
//     setSelectedItem(ticket);
//     setCommentModalOpen(true);
//   };

//   // *** When user clicks "Edit" icon => show EditStatusModal ***
//   const handleEdit = (ticket) => {
//     setSelectedItem(ticket);
//     setEditModalOpen(true);
//   };

//   //   const handleDelete = (ticket) => {
//   //     setSelectedItem(ticket);
//   //     setDeleteDialogOpen(true);
//   //   };

//   //   const handleConfirmDelete = () => {
//   //     console.log("Deleting:", selectedItem);
//   //     setDeleteDialogOpen(false);
//   //   };

//   // *** The function that gets called from <EditStatusModal> on "Save" ***
//   const handleUpdateStatus = (item, newStatus) => {
//     console.log("Updated status for item:", item, " => ", newStatus);
//     setEditModalOpen(false);
//   };

//   // === Filtering / Searching / Date filtering ===
//   const filteredData = useMemo(() => {
//     return TICKETS_DATA.filter((ticket) => {
//       // Search filter
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
//       if (statusFilter !== "All" && ticket.status !== statusFilter) {
//         return false;
//       }

//       // Incident date filter
//       if (selectedDate) {
//         const ticketDate = new Date(ticket.incidentDate).setHours(0, 0, 0, 0);
//         const filterDate = selectedDate.setHours(0, 0, 0, 0);
//         if (ticketDate !== filterDate) return false;
//       }

//       return true;
//     });
//   }, [searchText, statusFilter, selectedDate]);

//   // === Pagination ===
//   const totalPages = Math.ceil(filteredData.length / pageSize);
//   const paginatedData = useMemo(() => {
//     const startIndex = (currentPage - 1) * pageSize;
//     return filteredData.slice(startIndex, startIndex + pageSize);
//   }, [filteredData, currentPage, pageSize]);

//   const handlePageChange = (page) => setCurrentPage(page);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0, y: -10 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
//   };

//   return (
//     <div className="mx-auto px-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors min-h-screen">
//       <h1 className="text-2xl font-bold my-3">POSH Issues</h1>

//       <motion.div
//         className="flex flex-wrap items-center justify-between gap-4
//                    bg-white dark:bg-gray-800 
//                    p-4 rounded-md shadow
//                    transition-colors mb-3"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         {/* Left: Show & Search */}
//         <div className="flex flex-wrap items-center gap-4">
//           {/* Show entries */}
//           <div className="flex items-center gap-2">
//             <label className="text-sm font-semibold whitespace-nowrap">Show</label>
//             <select
//               className="border rounded px-2 py-1 text-sm
//                          bg-white dark:bg-gray-700
//                          text-gray-700 dark:text-gray-100
//                          focus:outline-none"
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
//               className="border rounded px-3 py-1 text-sm
//                          bg-white dark:bg-gray-700
//                          text-gray-700 dark:text-gray-100
//                          focus:outline-none"
//               value={searchText}
//               onChange={(e) => {
//                 setSearchText(e.target.value);
//                 setCurrentPage(1);
//               }}
//             />
//           </div>
//         </div>

//         {/* Right: Date, Status, Export icons */}
//         <div className="flex flex-wrap items-center gap-4">
//           {/* Date Filter */}
//           <DatePicker
//             selected={selectedDate}
//             onChange={(date) => {
//               setSelectedDate(date);
//               setCurrentPage(1);
//             }}
//             dateFormat="dd/MM/yyyy"
//             placeholderText="DD/MM/YYYY"
//             className="border rounded px-3 py-1 text-sm
//                        bg-white dark:bg-gray-700
//                        text-gray-700 dark:text-gray-100
//                        focus:outline-none"
//           />

//           {/* Status Filter */}
//           <select
//             className="border rounded px-2 py-1 text-sm
//                        bg-white dark:bg-gray-700
//                        text-gray-700 dark:text-gray-100
//                        focus:outline-none"
//             value={statusFilter}
//             onChange={(e) => {
//               setStatusFilter(e.target.value);
//               setCurrentPage(1);
//             }}
//           >
//             <option value="All">All Statuses</option>
//             <option value="Pending">Pending</option>
//             <option value="Resolved">Resolved</option>
//             <option value="Under Review">Under Review</option>
//           </select>

//           {/* Export Icons */}
//           <div className="flex items-center gap-4 text-gray-500 dark:text-gray-300">
//             <button
//               className="hover:text-gray-700 dark:hover:text-gray-100 transition-colors"
//               title="Print"
//             >
//               <FaPrint size={18} />
//             </button>
//             <button
//               className="hover:text-gray-700 dark:hover:text-gray-100 transition-colors"
//               title="Export to PDF"
//             >
//               <FaFilePdf size={18} />
//             </button>
//             <button
//               className="hover:text-gray-700 dark:hover:text-gray-100 transition-colors"
//               title="Export CSV/Excel"
//             >
//               <MdOutlineFileDownload size={20} />
//             </button>
//           </div>
//         </div>
//       </motion.div>

//       {/* Main Table */}
//       <div className="bg-white dark:bg-gray-800 rounded-md shadow overflow-x-auto transition-colors">
//         <table className="w-full text-left border-collapse min-w-max">
//           <thead className="bg-gray-50 dark:bg-gray-700">
//             <tr>
//               <th className="p-3 text-sm font-semibold">S.L</th>
//               <th className="p-3 text-sm font-semibold">Reporter Emp ID</th>
//               <th className="p-3 text-sm font-semibold">Reporter Name</th>
//               <th className="p-3 text-sm font-semibold">Accused Emp ID</th>
//               <th className="p-3 text-sm font-semibold">Accused Name</th>
//               <th className="p-3 text-sm font-semibold">Incident Date</th>
//               <th className="p-3 text-sm font-semibold">Status</th>
//               <th className="p-3 text-sm font-semibold">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((ticket, index) => {
//               const slIndex = (currentPage - 1) * pageSize + (index + 1);

//               let statusClasses =
//                 "bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-500";
//               if (ticket.status === "Pending") {
//                 statusClasses =
//                   "bg-orange-50 dark:bg-orange-700 text-orange-600 dark:text-orange-100 border border-orange-200 dark:border-orange-600";
//               } else if (ticket.status === "Resolved") {
//                 statusClasses =
//                   "bg-green-50 dark:bg-green-700 text-green-600 dark:text-green-100 border border-green-200 dark:border-green-600";
//               } else if (ticket.status === "Under Review") {
//                 statusClasses =
//                   "bg-purple-50 dark:bg-purple-700 text-purple-600 dark:text-purple-100 border border-purple-200 dark:border-purple-600";
//               }

//               return (
//                 <tr
//                   key={ticket.id}
//                   className="border-b last:border-b-0 
//                              border-gray-200 dark:border-gray-700 
//                              hover:bg-gray-50 dark:hover:bg-gray-600
//                              transition-colors"
//                 >
//                   <td className="p-3 text-sm">{String(slIndex).padStart(2, "0")}</td>
//                   <td className="p-3 text-sm text-blue-600 dark:text-blue-400">
//                     {ticket.reporterId}
//                   </td>
//                   <td className="p-3 text-sm">{ticket.reporterName}</td>
//                   <td className="p-3 text-sm text-blue-600 dark:text-blue-400">
//                     {ticket.accusedId}
//                   </td>
//                   <td className="p-3 text-sm">{ticket.accusedName}</td>
//                   <td className="p-3 text-sm">
//                     {new Date(ticket.incidentDate).toLocaleDateString("en-GB", {
//                       day: "2-digit",
//                       month: "short",
//                       year: "numeric",
//                     })}
//                   </td>
//                   <td className="p-3 text-sm">
//                     <span
//                       className={`inline-block px-2 py-1 text-xs font-semibold rounded-md ${statusClasses}`}
//                     >
//                       {ticket.status}
//                     </span>
//                   </td>
//                   <td className="p-3 text-sm space-x-3">
//                     {/* View */}
//                     <button
//                       title="View"
//                       onClick={() => handleView(ticket)}
//                       className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
//                     >
//                       <FaEye size={16} />
//                     </button>

//                     {/* Edit -> Opens EditStatusModal */}
//                     <button
//                       title="Edit"
//                       onClick={() => handleEdit(ticket)}
//                       className="text-green-500 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 transition-colors"
//                     >
//                       <FaEdit size={16} />
//                     </button>

//                     {/* Delete */}
//                     <button
//                       title="Delete"
//                       onClick={() => handleDelete(ticket)}
//                       className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
//                     >
//                       <FaTrash size={16} />
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         {filteredData.length > 0 && (
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

//         {/* If no matches */}
//         {filteredData.length === 0 && (
//           <div className="p-4 text-sm text-center text-gray-500 dark:text-gray-400">
//             No matching records found
//           </div>
//         )}
//       </div>

//       {/* Delete Dialog */}
//       {/* <DeleteDialog
//         open={deleteDialogOpen}
//         onClose={() => setDeleteDialogOpen(false)}
//         onConfirm={handleConfirmDelete}
//         item={selectedItem}
//       /> */}

//       {/* IssueDetailsModal */}
//       <IssueDetailsModal
//         isOpen={viewModalOpen}
//         onClose={() => setViewModalOpen(false)}
//         issue={selectedItem}
//       />

//       {/* NEW: EditStatusModal -> for "Edit" icon click */}
//       <EditStatusModal
//         isOpen={editModalOpen}
//         onClose={() => setEditModalOpen(false)}
//         item={selectedItem}
//         onUpdateStatus={handleUpdateStatus}
//       />
//     </div>
//   );
// }

// src/components/POSHIssuesTable.jsx



import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaEye,
  FaComment,
  FaEdit,
  FaTrash,
  FaPrint,
  FaFilePdf,
} from 'react-icons/fa';
import { MdOutlineFileDownload } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import IssueDetailsModal from './IssueDetailsModal';
import EditStatusModal from './EditStatusModal';
import ConfirmationDialog from '../../common/ConfirmationDialog';

import { usePoshStore } from '../../../store/poshStore';

/**
 * EXACT SAME UI as your new code, except:
 * - We remove TICKETS_DATA
 * - We fetch real data from the store
 */
export default function POSHIssuesTable() {
  const { poshActs, fetchPoshActs } = usePoshStore();

  const [searchText, setSearchText] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // For the modals
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  // ==== On Mount => fetch the POSH Acts from the server
  useEffect(() => {
    fetchPoshActs();
  }, [fetchPoshActs]);

  // *** Click Handlers ***
  const handleView = (ticket) => {
    setSelectedItem(ticket);
    setViewModalOpen(true);
  };

  // "Edit" => opens EditStatusModal
  const handleEdit = (ticket) => {
    setSelectedItem(ticket);
    setEditModalOpen(true);
  };

  // "Delete" => show ConfirmationDialog
  const handleDelete = (ticket) => {
    setSelectedItem(ticket);
    setDeleteDialogOpen(true);
  };

  // === Filtering / Searching / Date filtering ===
  const filteredData = useMemo(() => {
    return poshActs.filter((ticket) => {
      // Search filter
      if (searchText) {
        const rId = ticket.reporterId.toLowerCase();
        const rName = ticket.reporterName.toLowerCase();
        const aId = ticket.accusedId.toLowerCase();
        const aName = ticket.accusedName.toLowerCase();
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
      if (statusFilter !== 'All' && ticket.status !== statusFilter) {
        return false;
      }

      // Incident date filter
      if (selectedDate) {
        // Compare only date portion
        const ticketDate = new Date(ticket.incidentDate).setHours(0, 0, 0, 0);
        const filterDate = selectedDate.setHours(0, 0, 0, 0);
        if (ticketDate !== filterDate) return false;
      }

      return true;
    });
  }, [searchText, statusFilter, selectedDate, poshActs]);

  // === Pagination ===
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const handlePageChange = (page) => setCurrentPage(page);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="mx-auto px-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors min-h-screen">
      <h1 className="text-2xl font-bold my-3">POSH Issues</h1>

      <motion.div
        className="flex flex-wrap items-center justify-between gap-4
                   bg-white dark:bg-gray-800 
                   p-4 rounded-md shadow
                   transition-colors mb-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left: Show & Search */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Show entries */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold whitespace-nowrap">Show</label>
            <select
              className="border rounded px-2 py-1 text-sm
                         bg-white dark:bg-gray-700
                         text-gray-700 dark:text-gray-100
                         focus:outline-none"
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
          </div>

          {/* Search */}
          <div>
            <input
              type="text"
              placeholder="Search"
              className="border rounded px-3 py-1 text-sm
                         bg-white dark:bg-gray-700
                         text-gray-700 dark:text-gray-100
                         focus:outline-none"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* Right: Date, Status, Export icons */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Date Filter */}
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setCurrentPage(1);
            }}
            dateFormat="dd/MM/yyyy"
            placeholderText="DD/MM/YYYY"
            className="border rounded px-3 py-1 text-sm
                       bg-white dark:bg-gray-700
                       text-gray-700 dark:text-gray-100
                       focus:outline-none"
          />

          {/* Status Filter */}
          <select
            className="border rounded px-2 py-1 text-sm
                       bg-white dark:bg-gray-700
                       text-gray-700 dark:text-gray-100
                       focus:outline-none"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
            <option value="Under Review">Under Review</option>
          </select>

          {/* Export Icons */}
          <div className="flex items-center gap-4 text-gray-500 dark:text-gray-300">
            <button
              className="hover:text-gray-700 dark:hover:text-gray-100 transition-colors"
              title="Print"
            >
              <FaPrint size={18} />
            </button>
            <button
              className="hover:text-gray-700 dark:hover:text-gray-100 transition-colors"
              title="Export to PDF"
            >
              <FaFilePdf size={18} />
            </button>
            <button
              className="hover:text-gray-700 dark:hover:text-gray-100 transition-colors"
              title="Export CSV/Excel"
            >
              <MdOutlineFileDownload size={20} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Table */}
      <div className="bg-white dark:bg-gray-800 rounded-md shadow overflow-x-auto transition-colors">
        <table className="w-full text-left border-collapse min-w-max">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="p-3 text-sm font-semibold">S.L</th>
              <th className="p-3 text-sm font-semibold">Reporter Emp ID</th>
              <th className="p-3 text-sm font-semibold">Reporter Name</th>
              <th className="p-3 text-sm font-semibold">Accused Emp ID</th>
              <th className="p-3 text-sm font-semibold">Accused Name</th>
              <th className="p-3 text-sm font-semibold">Incident Date</th>
              <th className="p-3 text-sm font-semibold">Status</th>
              <th className="p-3 text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((ticket, index) => {
              const slIndex = (currentPage - 1) * pageSize + (index + 1);

              let statusClasses =
                'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-500';
              if (ticket.status === 'Pending') {
                statusClasses =
                  'bg-orange-50 dark:bg-orange-700 text-orange-600 dark:text-orange-100 border border-orange-200 dark:border-orange-600';
              } else if (ticket.status === 'Resolved') {
                statusClasses =
                  'bg-green-50 dark:bg-green-700 text-green-600 dark:text-green-100 border border-green-200 dark:border-green-600';
              } else if (ticket.status === 'Under Review') {
                statusClasses =
                  'bg-purple-50 dark:bg-purple-700 text-purple-600 dark:text-purple-100 border border-purple-200 dark:border-purple-600';
              }

              return (
                <tr
                  key={ticket.id}
                  className="border-b last:border-b-0 
                             border-gray-200 dark:border-gray-700 
                             hover:bg-gray-50 dark:hover:bg-gray-600
                             transition-colors"
                >
                  <td className="p-3 text-sm">{String(slIndex).padStart(2, '0')}</td>
                  <td className="p-3 text-sm text-blue-600 dark:text-blue-400">
                    {ticket.reporterId}
                  </td>
                  <td className="p-3 text-sm">{ticket.reporterName}</td>
                  <td className="p-3 text-sm text-blue-600 dark:text-blue-400">
                    {ticket.accusedId}
                  </td>
                  <td className="p-3 text-sm">{ticket.accusedName}</td>
                  <td className="p-3 text-sm">
                    {ticket.incidentDate
                      ? new Date(ticket.incidentDate).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })
                      : 'N/A'}
                  </td>
                  <td className="p-3 text-sm">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-md ${statusClasses}`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm space-x-3">
                    {/* View */}
                    <button
                      title="View"
                      onClick={() => handleView(ticket)}
                      className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                    >
                      <FaEye size={16} />
                    </button>

                    {/* Edit -> Opens EditStatusModal */}
                    <button
                      title="Edit"
                      onClick={() => handleEdit(ticket)}
                      className="text-green-500 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 transition-colors"
                    >
                      <FaEdit size={16} />
                    </button>

                    {/* Delete */}
                    <button
                      title="Delete"
                      onClick={() => handleDelete(ticket)}
                      className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
                    >
                      <FaTrash size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        {filteredData.length > 0 && (
          <div className="flex flex-col md:flex-row justify-between items-center p-3 gap-2 text-sm">
            <div>
              Showing {paginatedData.length} of {filteredData.length} entries
            </div>
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 rounded border transition-colors ${
                    currentPage === i + 1
                      ? 'bg-blue-600 text-white border-blue-600'
                      : `bg-white dark:bg-gray-700 
                         text-gray-700 dark:text-gray-100 
                         border-gray-200 dark:border-gray-600 
                         hover:bg-gray-50 dark:hover:bg-gray-600`
                  }`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* If no matches */}
        {filteredData.length === 0 && (
          <div className="p-4 text-sm text-center text-gray-500 dark:text-gray-400">
            No matching records found
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={deleteDialogOpen}
        title="Delete POSH Act"
        message={`Are you sure you want to delete this record?`}
        onConfirm={() => {
          // Actually delete in the store
          // We'll call store.deletePoshAct
          const { deletePoshAct } = usePoshStore.getState();
          if (selectedItem) {
            deletePoshAct(selectedItem.id);
          }
          setDeleteDialogOpen(false);
        }}
        onCancel={() => setDeleteDialogOpen(false)}
      />

      {/* IssueDetailsModal */}
      <IssueDetailsModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        issue={selectedItem}
      />

      {/* EditStatusModal */}
      <EditStatusModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        item={selectedItem}
        onUpdateStatus={() => {}}
      />
    </div>
  );
}

