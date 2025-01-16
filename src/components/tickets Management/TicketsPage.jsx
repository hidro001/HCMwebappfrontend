
// // TicketsPage.jsx
// import React, { useState, useEffect, useMemo } from "react";
// import { motion } from "framer-motion";
// import { FaEye, FaEdit, FaTrash, FaPrint, FaFilePdf, FaComment } from "react-icons/fa";
// import { MdOutlineFileDownload } from "react-icons/md";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { toast } from "react-hot-toast";

// // Our custom modals & dialogs
// import TicketFormModal from "./TicketFormModal";
// // import CommentModal from "./CommentModal";  // <-- Remove this
// // import TicketViewModal from "./TicketViewModal"; // <-- We'll replace with a single unified modal
// import TicketDetailsModal from "./TicketDetailsModal"; // <-- The new merged modal
// import ConfirmationDialog from "../common/ConfirmationDialog";

// // Zustand stores
// import useIssuesStore from "../../store/useIssuesStore";
// // import useDepartmentStore from "../../store/departmentStore";

// export default function TicketsPage() {
//   // ---------- Issues Store ----------
//   const {
//     issues,
//     fetchDeptIssues,
//     createIssue,
//     editIssue,
//     removeIssue,
//     fetchComments,
//     postComment,
//     loading,
//     // comments,         // You can read directly from the store in TicketDetailsModal, or pass them as props
//     // isCommentLoading, // likewise
//   } = useIssuesStore();

//   // ---------- Local UI State ----------
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState("create"); // "create" or "edit"
//   const [selectedIssue, setSelectedIssue] = useState(null);

//   // For the new combined "Details + Comments" modal
//   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

//   // For ConfirmationDialog
//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [confirmTitle, setConfirmTitle] = useState("");
//   const [confirmMessage, setConfirmMessage] = useState("");
//   const [confirmAction, setConfirmAction] = useState(() => {});

//   // Filters
//   const [pageSize, setPageSize] = useState(10);
//   const [searchText, setSearchText] = useState("");
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [department, setDepartment] = useState("All");
//   const [status, setStatus] = useState("All");
//   const [priorityFilter, setPriorityFilter] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);

//   // ---------- Lifecycle ----------
//   useEffect(() => {
//     fetchDeptIssues();
//   }, [fetchDeptIssues]);

//   // ---------- Handlers ----------
//   const handleRaiseTicket = () => {
//     setModalMode("create");
//     setSelectedIssue(null);
//     setIsModalOpen(true);
//   };

//   // Replace handleView & handleComment with a single method
//   const handleViewDetails = async (issue) => {
//     setSelectedIssue(issue);
//     // Fetch comments for the selected issue
//     await fetchComments(issue._id);
//     // Now open the unified details+comments modal
//     setIsDetailsModalOpen(true);
//   };

//   const handleEdit = (issue) => {
//     setModalMode("edit");
//     setSelectedIssue(issue);
//     setIsModalOpen(true);
//   };

//   const handleDelete = (issue) => {
//     setConfirmTitle("Delete Issue");
//     setConfirmMessage(`Are you sure you want to delete issue "${issue.issueTitle}"?`);
//     setConfirmAction(() => async () => {
//       setConfirmOpen(false);
//       await removeIssue(issue._id);
//     });
//     setConfirmOpen(true);
//   };

//   const handleFormSubmit = async (formData) => {
//     if (modalMode === "create") {
//       await createIssue({
//         issueTitle: formData.ticketTitle,
//         issueDescription: formData.description,
//         priority: formData.priority,
//         assignedTo: formData.department !== "All" ? formData.department : "",
//         issueStatus: formData.status,
//         attachment: formData.attachment,
//       });
//     } else if (selectedIssue) {
//       await editIssue(selectedIssue._id, {
//         issueTitle: formData.ticketTitle,
//         issueDescription: formData.description,
//         priority: formData.priority,
//         assignedTo: formData.department !== "All" ? formData.department : "",
//         issueStatus: formData.status,
//         attachment: formData.attachment,
//       });
//     }
//     setIsModalOpen(false);
//   };

//   // If you want to add new comment from the new combined modal,
//   // you can do it in that modal itself (calling `postComment`).
//   // Or you can keep a handler here and pass it down:
//   const handleAddComment = async (commentText) => {
//     if (!selectedIssue) return;
//     await postComment(selectedIssue._id, commentText);
//   };

//   // ---------- Filtering & Pagination ----------
//   const filteredIssues = useMemo(() => {
//     return issues.filter((issue) => {
//       // Search filter
//       if (searchText) {
//         const matchTitle = issue.issueTitle?.toLowerCase().includes(searchText.toLowerCase());
//         const matchEmployeeId = issue.createdBy?.employee_Id
//           ?.toLowerCase()
//           .includes(searchText.toLowerCase());
//         if (!matchTitle && !matchEmployeeId) return false;
//       }
//       // Department filter
//       if (department !== "All" && issue.assignedTo !== department) {
//         return false;
//       }
//       // Status filter
//       if (status !== "All" && issue.issueStatus !== status) {
//         return false;
//       }
//       // Priority filter
//       if (priorityFilter !== "All" && issue.priority !== priorityFilter) {
//         return false;
//       }
//       // Date filter
//       if (selectedDate) {
//         const issueDate = new Date(issue.createdAt).setHours(0, 0, 0, 0);
//         const filterDate = selectedDate.setHours(0, 0, 0, 0);
//         if (issueDate !== filterDate) return false;
//       }
//       return true;
//     });
//   }, [issues, searchText, department, status, priorityFilter, selectedDate]);

//   const totalPages = Math.ceil(filteredIssues.length / pageSize);
//   const paginatedIssues = useMemo(() => {
//     const startIndex = (currentPage - 1) * pageSize;
//     return filteredIssues.slice(startIndex, startIndex + pageSize);
//   }, [filteredIssues, currentPage, pageSize]);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   // Animation variants (optional)
//   const containerVariants = {
//     hidden: { opacity: 0, y: -10 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
//   };

//   // ---------- Render ----------
//   return (
//     <div
//       className=" mx-auto px-4  
//                  bg-gray-50 dark:bg-gray-900
//                  text-gray-800 dark:text-gray-100
//                   transition-colors "
//     >
//       <h1 className="text-2xl font-bold">Employees Tickets</h1>

//       {/* Top Toolbar */}
//       <motion.div
//         className="flex flex-wrap items-center justify-between gap-4
//                    bg-white dark:bg-gray-800 
//                    p-4 rounded-md shadow
//                    transition-colors mb-3"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         {/* Left: Page size & Search */}
//         <div className="flex flex-wrap items-center gap-4">
//           {/* Page size */}
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

//         {/* Middle: date, priority, status, export icons */}
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

//           {/* Priority Filter */}
//           <select
//             className="border rounded px-2 py-1 text-sm
//                        bg-white dark:bg-gray-700
//                        text-gray-700 dark:text-gray-100
//                        focus:outline-none"
//             value={priorityFilter}
//             onChange={(e) => {
//               setPriorityFilter(e.target.value);
//               setCurrentPage(1);
//             }}
//           >
//             <option value="All">All Priorities</option>
//             <option value="High">High</option>
//             <option value="Medium">Medium</option>
//             <option value="Low">Low</option>
//           </select>

//           {/* Status Filter */}
//           <select
//             className="border rounded px-2 py-1 text-sm
//                        bg-white dark:bg-gray-700
//                        text-gray-700 dark:text-gray-100
//                        focus:outline-none"
//             value={status}
//             onChange={(e) => {
//               setStatus(e.target.value);
//               setCurrentPage(1);
//             }}
//           >
//             <option value="All">All Statuses</option>
//             <option value="Pending">Pending</option>
//             <option value="In Progress">In Progress</option>
//             <option value="Resolved">Resolved</option>
//           </select>

//           {/* Export Icons */}
//           <div className="flex items-center gap-4 text-gray-500 dark:text-gray-300">
//             <button className="hover:text-gray-700 dark:hover:text-gray-100 transition-colors" title="Print">
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

//       {/* Table of Issues */}
//       <div className="bg-white dark:bg-gray-800 
//                       rounded-md shadow 
//                       overflow-x-auto transition-colors ">
//         {loading ? (
//           <div className="p-4">Loading issues...</div>
//         ) : (
//           <table className="w-full text-left border-collapse min-w-max">
//             <thead className="bg-gray-50 dark:bg-gray-700">
//               <tr>
//                 <th className="p-3 text-sm font-semibold">S.L</th>
//                 <th className="p-3 text-sm font-semibold">Emp ID</th>
//                 <th className="p-3 text-sm font-semibold">Name</th>
//                 <th className="p-3 text-sm font-semibold">Title</th>
//                 <th className="p-3 text-sm font-semibold">Priority</th>
//                 <th className="p-3 text-sm font-semibold">Status</th>
//                 <th className="p-3 text-sm font-semibold">Department</th>
//                 <th className="p-3 text-sm font-semibold">Created On</th>
//                 <th className="p-3 text-sm font-semibold">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedIssues.map((issue, index) => {
//                 const globalIndex = (currentPage - 1) * pageSize + (index + 1);

//                 // Priority pill classes
//                 let priorityClasses =
//                   "bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-500";
//                 if (issue.priority === "High") {
//                   priorityClasses =
//                     "bg-red-50 dark:bg-red-700 text-red-600 dark:text-red-100 border border-red-200 dark:border-red-600";
//                 } else if (issue.priority === "Medium") {
//                   priorityClasses =
//                     "bg-yellow-50 dark:bg-yellow-700 text-yellow-600 dark:text-yellow-100 border border-yellow-200 dark:border-yellow-600";
//                 } else if (issue.priority === "Low") {
//                   priorityClasses =
//                     "bg-green-50 dark:bg-green-700 text-green-600 dark:text-green-100 border border-green-200 dark:border-green-600";
//                 }

//                 // Status pill classes
//                 let statusClasses =
//                   "bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-500";
//                 if (issue.issueStatus === "Pending") {
//                   statusClasses =
//                     "bg-orange-50 dark:bg-orange-700 text-orange-600 dark:text-orange-100 border border-orange-200 dark:border-orange-600";
//                 } else if (issue.issueStatus === "In Progress") {
//                   statusClasses =
//                     "bg-blue-50 dark:bg-blue-700 text-blue-600 dark:text-blue-100 border border-blue-200 dark:border-blue-600";
//                 } else if (issue.issueStatus === "Resolved") {
//                   statusClasses =
//                     "bg-green-50 dark:bg-green-700 text-green-600 dark:text-green-100 border border-green-200 dark:border-green-600";
//                 }

//                 return (
//                   <tr
//                     key={issue._id}
//                     className="border-b last:border-b-0 
//                                border-gray-200 dark:border-gray-700 
//                                hover:bg-gray-50 dark:hover:bg-gray-600
//                                transition-colors"
//                   >
//                     <td className="p-3 text-sm">{String(globalIndex).padStart(2, "0")}</td>
//                     <td className="p-3 text-sm text-blue-600 dark:text-blue-400 cursor-pointer">
//                       {issue.createdBy?.employee_Id || "--"}
//                     </td>
//                     <td className="p-3 text-sm">
//                       {issue.createdBy
//                         ? `${issue.createdBy.first_Name} ${issue.createdBy.last_Name}`
//                         : "Unknown"}
//                     </td>
//                     <td className="p-3 text-sm">{issue.issueTitle}</td>

//                     {/* Priority */}
//                     <td className="p-3 text-sm">
//                       <span
//                         className={`inline-block px-2 py-1 text-xs font-semibold rounded-md ${priorityClasses}`}
//                       >
//                         {issue.priority}
//                       </span>
//                     </td>

//                     {/* Status */}
//                     <td className="p-3 text-sm">
//                       <span
//                         className={`inline-block px-2 py-1 text-xs font-semibold rounded-md ${statusClasses}`}
//                       >
//                         {issue.issueStatus}
//                       </span>
//                     </td>

//                     <td className="p-3 text-sm">{issue.assignedTo || "--"}</td>
//                     <td className="p-3 text-sm">
//                       {new Date(issue.createdAt).toLocaleDateString("en-GB", {
//                         day: "2-digit",
//                         month: "short",
//                         year: "numeric",
//                       })}
//                     </td>

//                     <td className="p-3 text-sm space-x-3">
//                       {/* Combined View+Comment Button */}
//                       <button
//                         className="text-blue-500 dark:text-blue-400 hover:text-blue-600 
//                                    dark:hover:text-blue-300 transition-colors"
//                         title="View & Comment"
//                         onClick={() => handleViewDetails(issue)}
//                       >
//                         <FaEye size={16} />
//                       </button>

//                       {/* Edit */}
//                       <button
//                         onClick={() => handleEdit(issue)}
//                         className="text-green-500 dark:text-green-400 hover:text-green-600 
//                                    dark:hover:text-green-300 transition-colors"
//                         title="Edit"
//                       >
//                         <FaEdit size={16} />
//                       </button>

//                       {/* Delete */}
//                       <button
//                         onClick={() => handleDelete(issue)}
//                         className="text-red-500 dark:text-red-400 hover:text-red-600 
//                                    dark:hover:text-red-300 transition-colors"
//                         title="Delete"
//                       >
//                         <FaTrash size={16} />
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         )}

//         {/* Pagination */}
//         {!loading && filteredIssues.length > 0 && (
//           <div className="flex flex-col md:flex-row justify-between items-center p-3 gap-2 text-sm">
//             <div>
//               Showing {paginatedIssues.length} of {filteredIssues.length} entries
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

//         {/* If no issues match filters */}
//         {!loading && filteredIssues.length === 0 && (
//           <div className="p-4 text-sm text-center text-gray-500 dark:text-gray-400">
//             No matching records found
//           </div>
//         )}
//       </div>

//       {/* Confirmation Dialog */}
//       <ConfirmationDialog
//         open={confirmOpen}
//         title={confirmTitle}
//         message={confirmMessage}
//         onConfirm={confirmAction}
//         onCancel={() => setConfirmOpen(false)}
//       />

//       {/* Create/Edit Modal */}
//       <TicketFormModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         mode={modalMode}
//         initialData={selectedIssue}
//         onSubmit={handleFormSubmit}
//       />

//       {/* Combined Ticket Details + Comment Modal */}
//       <TicketDetailsModal
//         isOpen={isDetailsModalOpen}
//         onClose={() => setIsDetailsModalOpen(false)}
//         ticket={selectedIssue}
//         onAddComment={handleAddComment}
//       />
//     </div>
//   );
// }


// TicketsPage.jsx

// import React, { useState, useEffect, useMemo } from "react";
// import { motion } from "framer-motion";
// import { FaEye, FaEdit, FaTrash, FaPrint, FaFilePdf } from "react-icons/fa";
// import { MdOutlineFileDownload } from "react-icons/md";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { Skeleton } from "@mui/material";
// import TicketFormModal from "./TicketFormModal";
// import TicketDetailsModal from "./TicketDetailsModal";
// import ConfirmationDialog from "../common/ConfirmationDialog";
// import useIssuesStore from "../../store/useIssuesStore";

// export default function TicketsPage() {
//   const {
//     issues,
//     fetchDeptIssues,
//     createIssue,
//     editIssue,
//     removeIssue,
//     fetchComments,
//     postComment,
//     loading,
//   } = useIssuesStore();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState("create");
//   const [selectedIssue, setSelectedIssue] = useState(null);
//   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [confirmTitle, setConfirmTitle] = useState("");
//   const [confirmMessage, setConfirmMessage] = useState("");
//   const [confirmAction, setConfirmAction] = useState(() => {});
//   const [pageSize, setPageSize] = useState(10);
//   const [searchText, setSearchText] = useState("");
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [department, setDepartment] = useState("All");
//   const [status, setStatus] = useState("All");
//   const [priorityFilter, setPriorityFilter] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);

//   // Minimal fade-in animation
//   const fadeVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 0.3 } },
//   };

//   useEffect(() => {
//     fetchDeptIssues();
//   }, [fetchDeptIssues]);

//   const handleViewDetails = async (issue) => {
//     setSelectedIssue(issue);
//     await fetchComments(issue._id);
//     setIsDetailsModalOpen(true);
//   };

//   const handleEdit = (issue) => {
//     setModalMode("edit");
//     setSelectedIssue(issue);
//     setIsModalOpen(true);
//   };

//   const handleDelete = (issue) => {
//     setConfirmTitle("Delete Issue");
//     setConfirmMessage(`Are you sure you want to delete issue "${issue.issueTitle}"?`);
//     setConfirmAction(() => async () => {
//       setConfirmOpen(false);
//       await removeIssue(issue._id);
//     });
//     setConfirmOpen(true);
//   };

//   const handleFormSubmit = async (formData) => {
//     if (modalMode === "create") {
//       await createIssue({
//         issueTitle: formData.ticketTitle,
//         issueDescription: formData.description,
//         priority: formData.priority,
//         assignedTo: formData.department !== "All" ? formData.department : "",
//         issueStatus: formData.status,
//         attachment: formData.attachment,
//       });
//     } else if (selectedIssue) {
//       await editIssue(selectedIssue._id, {
//         issueTitle: formData.ticketTitle,
//         issueDescription: formData.description,
//         priority: formData.priority,
//         assignedTo: formData.department !== "All" ? formData.department : "",
//         issueStatus: formData.status,
//         attachment: formData.attachment,
//       });
//     }
//     setIsModalOpen(false);
//   };

//   const handleAddComment = async (commentText) => {
//     if (!selectedIssue) return;
//     await postComment(selectedIssue._id, commentText);
//   };

//   const filteredIssues = useMemo(() => {
//     return issues.filter((issue) => {
//       if (searchText) {
//         const matchTitle = issue.issueTitle?.toLowerCase().includes(searchText.toLowerCase());
//         const matchEmployeeId = issue.createdBy?.employee_Id
//           ?.toLowerCase()
//           .includes(searchText.toLowerCase());
//         if (!matchTitle && !matchEmployeeId) return false;
//       }
//       if (department !== "All" && issue.assignedTo !== department) return false;
//       if (status !== "All" && issue.issueStatus !== status) return false;
//       if (priorityFilter !== "All" && issue.priority !== priorityFilter) return false;
//       if (selectedDate) {
//         const issueDate = new Date(issue.createdAt).setHours(0, 0, 0, 0);
//         const filterDate = selectedDate.setHours(0, 0, 0, 0);
//         if (issueDate !== filterDate) return false;
//       }
//       return true;
//     });
//   }, [issues, searchText, department, status, priorityFilter, selectedDate]);

//   const totalPages = Math.ceil(filteredIssues.length / pageSize);
//   const paginatedIssues = useMemo(() => {
//     const startIndex = (currentPage - 1) * pageSize;
//     return filteredIssues.slice(startIndex, startIndex + pageSize);
//   }, [filteredIssues, currentPage, pageSize]);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <motion.div
//       className="mx-auto px-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors"
//       variants={fadeVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       <h1 className="text-2xl font-bold">Employees Tickets</h1>

//       <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-md shadow transition-colors mb-3">
//         <div className="flex flex-wrap items-center gap-4">
//           <div className="flex items-center gap-2">
//             <label className="text-sm font-semibold whitespace-nowrap">Show</label>
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
//             value={priorityFilter}
//             onChange={(e) => {
//               setPriorityFilter(e.target.value);
//               setCurrentPage(1);
//             }}
//           >
//             <option value="All">All Priorities</option>
//             <option value="High">High</option>
//             <option value="Medium">Medium</option>
//             <option value="Low">Low</option>
//           </select>
//           <select
//             className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:outline-none"
//             value={status}
//             onChange={(e) => {
//               setStatus(e.target.value);
//               setCurrentPage(1);
//             }}
//           >
//             <option value="All">All Statuses</option>
//             <option value="Pending">Pending</option>
//             <option value="In Progress">In Progress</option>
//             <option value="Resolved">Resolved</option>
//           </select>
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
//       </div>

//       <div className="bg-white dark:bg-gray-800 rounded-md shadow overflow-x-auto transition-colors">
//         {loading ? (
//           <div className="p-4">
//             {Array.from({ length: 5 }).map((_, i) => (
//               <Skeleton key={i} variant="rectangular" height={40} className="mb-2" />
//             ))}
//           </div>
//         ) : (
//           <table className="w-full text-left border-collapse min-w-max">
//             <thead className="bg-gray-50 dark:bg-gray-700">
//               <tr>
//                 <th className="p-3 text-sm font-semibold">S.L</th>
//                 <th className="p-3 text-sm font-semibold">Emp ID</th>
//                 <th className="p-3 text-sm font-semibold">Name</th>
//                 <th className="p-3 text-sm font-semibold">Title</th>
//                 <th className="p-3 text-sm font-semibold">Priority</th>
//                 <th className="p-3 text-sm font-semibold">Status</th>
//                 <th className="p-3 text-sm font-semibold">Department</th>
//                 <th className="p-3 text-sm font-semibold">Created On</th>
//                 <th className="p-3 text-sm font-semibold">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedIssues.map((issue, index) => {
//                 const globalIndex = (currentPage - 1) * pageSize + (index + 1);
//                 let priorityClasses =
//                   "bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-500";
//                 if (issue.priority === "High") {
//                   priorityClasses =
//                     "bg-red-50 dark:bg-red-700 text-red-600 dark:text-red-100 border border-red-200 dark:border-red-600";
//                 } else if (issue.priority === "Medium") {
//                   priorityClasses =
//                     "bg-yellow-50 dark:bg-yellow-700 text-yellow-600 dark:text-yellow-100 border border-yellow-200 dark:border-yellow-600";
//                 } else if (issue.priority === "Low") {
//                   priorityClasses =
//                     "bg-green-50 dark:bg-green-700 text-green-600 dark:text-green-100 border border-green-200 dark:border-green-600";
//                 }

//                 let statusClasses =
//                   "bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-500";
//                 if (issue.issueStatus === "Pending") {
//                   statusClasses =
//                     "bg-orange-50 dark:bg-orange-700 text-orange-600 dark:text-orange-100 border border-orange-200 dark:border-orange-600";
//                 } else if (issue.issueStatus === "In Progress") {
//                   statusClasses =
//                     "bg-blue-50 dark:bg-blue-700 text-blue-600 dark:text-blue-100 border border-blue-200 dark:border-blue-600";
//                 } else if (issue.issueStatus === "Resolved") {
//                   statusClasses =
//                     "bg-green-50 dark:bg-green-700 text-green-600 dark:text-green-100 border border-green-200 dark:border-green-600";
//                 }

//                 return (
//                   <tr
//                     key={issue._id}
//                     className="border-b last:border-b-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//                   >
//                     <td className="p-3 text-sm">{String(globalIndex).padStart(2, "0")}</td>
//                     <td className="p-3 text-sm text-blue-600 dark:text-blue-400 cursor-pointer">
//                       {issue.createdBy?.employee_Id || "--"}
//                     </td>
//                     <td className="p-3 text-sm">
//                       {issue.createdBy
//                         ? `${issue.createdBy.first_Name} ${issue.createdBy.last_Name}`
//                         : "Unknown"}
//                     </td>
//                     <td className="p-3 text-sm">{issue.issueTitle}</td>
//                     <td className="p-3 text-sm">
//                       <span
//                         className={`inline-block px-2 py-1 text-xs font-semibold rounded-md ${priorityClasses}`}
//                       >
//                         {issue.priority}
//                       </span>
//                     </td>
//                     <td className="p-3 text-sm">
//                       <span
//                         className={`inline-block px-2 py-1 text-xs font-semibold rounded-md ${statusClasses}`}
//                       >
//                         {issue.issueStatus}
//                       </span>
//                     </td>
//                     <td className="p-3 text-sm">{issue.assignedTo || "--"}</td>
//                     <td className="p-3 text-sm">
//                       {new Date(issue.createdAt).toLocaleDateString("en-GB", {
//                         day: "2-digit",
//                         month: "short",
//                         year: "numeric",
//                       })}
//                     </td>
//                     <td className="p-3 text-sm space-x-3">
//                       <button
//                         className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
//                         onClick={() => handleViewDetails(issue)}
//                       >
//                         <FaEye size={16} />
//                       </button>
//                       <button
//                         onClick={() => handleEdit(issue)}
//                         className="text-green-500 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 transition-colors"
//                       >
//                         <FaEdit size={16} />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(issue)}
//                         className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
//                       >
//                         <FaTrash size={16} />
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         )}
//         {!loading && filteredIssues.length > 0 && (
//           <div className="flex flex-col md:flex-row justify-between items-center p-3 gap-2 text-sm">
//             <div>
//               Showing {paginatedIssues.length} of {filteredIssues.length} entries
//             </div>
//             <div className="flex items-center space-x-1">
//               {Array.from({ length: totalPages }, (_, i) => (
//                 <button
//                   key={i}
//                   className={`px-3 py-1 rounded border transition-colors ${
//                     currentPage === i + 1
//                       ? "bg-blue-600 text-white border-blue-600"
//                       : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
//                   }`}
//                   onClick={() => handlePageChange(i + 1)}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}
//         {!loading && filteredIssues.length === 0 && (
//           <div className="p-4 text-sm text-center text-gray-500 dark:text-gray-400">
//             No matching records found
//           </div>
//         )}
//       </div>

//       <ConfirmationDialog
//         open={confirmOpen}
//         title={confirmTitle}
//         message={confirmMessage}
//         onConfirm={confirmAction}
//         onCancel={() => setConfirmOpen(false)}
//       />

//       <TicketFormModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         mode={modalMode}
//         initialData={selectedIssue}
//         onSubmit={handleFormSubmit}
//       />

//       <TicketDetailsModal
//         isOpen={isDetailsModalOpen}
//         onClose={() => setIsDetailsModalOpen(false)}
//         ticket={selectedIssue}
//         onAddComment={handleAddComment}
//       />
//     </motion.div>
//   );
// }


// import React, { useState, useEffect, useMemo } from "react";
// import { motion, AnimatePresence, useAnimation } from "framer-motion";
// import { FaEye, FaEdit, FaTrash, FaPrint, FaFilePdf } from "react-icons/fa";
// import { MdOutlineFileDownload } from "react-icons/md";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { Skeleton } from "@mui/material";

// import TicketFormModal from "./TicketFormModal";
// import TicketDetailsModal from "./TicketDetailsModal";
// import ConfirmationDialog from "../common/ConfirmationDialog";
// import useIssuesStore from "../../store/useIssuesStore";

// export default function TicketsPage() {
//   const {
//     issues,
//     fetchDeptIssues,
//     createIssue,
//     editIssue,
//     removeIssue,
//     fetchComments,
//     postComment,
//     loading,
//   } = useIssuesStore();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState("create");
//   const [selectedIssue, setSelectedIssue] = useState(null);
//   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [confirmTitle, setConfirmTitle] = useState("");
//   const [confirmMessage, setConfirmMessage] = useState("");
//   const [confirmAction, setConfirmAction] = useState(() => {});
//   const [pageSize, setPageSize] = useState(10);
//   const [searchText, setSearchText] = useState("");
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [department, setDepartment] = useState("All");
//   const [status, setStatus] = useState("All");
//   const [priorityFilter, setPriorityFilter] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);

//   // Framer Motion control for table "timeline" effect
//   const tableControls = useAnimation();

//   // Fetch data on mount and trigger table animation
//   useEffect(() => {
//     fetchDeptIssues().then(() => {
//       tableControls.start("visible");
//     });
//   }, [fetchDeptIssues, tableControls]);

//   const handleViewDetails = async (issue) => {
//     setSelectedIssue(issue);
//     await fetchComments(issue._id);
//     setIsDetailsModalOpen(true);
//   };

//   const handleEdit = (issue) => {
//     setModalMode("edit");
//     setSelectedIssue(issue);
//     setIsModalOpen(true);
//   };

//   const handleDelete = (issue) => {
//     setConfirmTitle("Delete Issue");
//     setConfirmMessage(`Are you sure you want to delete issue "${issue.issueTitle}"?`);
//     setConfirmAction(() => async () => {
//       setConfirmOpen(false);
//       await removeIssue(issue._id);
//     });
//     setConfirmOpen(true);
//   };

//   const handleFormSubmit = async (formData) => {
//     if (modalMode === "create") {
//       await createIssue({
//         issueTitle: formData.ticketTitle,
//         issueDescription: formData.description,
//         priority: formData.priority,
//         assignedTo: formData.department !== "All" ? formData.department : "",
//         issueStatus: formData.status,
//         attachment: formData.attachment,
//       });
//     } else if (selectedIssue) {
//       await editIssue(selectedIssue._id, {
//         issueTitle: formData.ticketTitle,
//         issueDescription: formData.description,
//         priority: formData.priority,
//         assignedTo: formData.department !== "All" ? formData.department : "",
//         issueStatus: formData.status,
//         attachment: formData.attachment,
//       });
//     }
//     setIsModalOpen(false);
//   };

//   const handleAddComment = async (commentText) => {
//     if (!selectedIssue) return;
//     await postComment(selectedIssue._id, commentText);
//   };

//   // Filtering
//   const filteredIssues = useMemo(() => {
//     return issues.filter((issue) => {
//       if (searchText) {
//         const matchTitle = issue.issueTitle?.toLowerCase().includes(searchText.toLowerCase());
//         const matchEmployeeId = issue.createdBy?.employee_Id
//           ?.toLowerCase()
//           .includes(searchText.toLowerCase());
//         if (!matchTitle && !matchEmployeeId) return false;
//       }
//       if (department !== "All" && issue.assignedTo !== department) return false;
//       if (status !== "All" && issue.issueStatus !== status) return false;
//       if (priorityFilter !== "All" && issue.priority !== priorityFilter) return false;
//       if (selectedDate) {
//         const issueDate = new Date(issue.createdAt).setHours(0, 0, 0, 0);
//         const filterDate = selectedDate.setHours(0, 0, 0, 0);
//         if (issueDate !== filterDate) return false;
//       }
//       return true;
//     });
//   }, [issues, searchText, department, status, priorityFilter, selectedDate]);

//   // Pagination
//   const totalPages = Math.ceil(filteredIssues.length / pageSize);
//   const paginatedIssues = useMemo(() => {
//     const startIndex = (currentPage - 1) * pageSize;
//     return filteredIssues.slice(startIndex, startIndex + pageSize);
//   }, [filteredIssues, currentPage, pageSize]);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   // Framer Motion variants
//   const tableContainerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         when: "beforeChildren",
//         staggerChildren: 0.05,
//       },
//     },
//   };

//   const tableRowVariants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: { opacity: 1, y: 0 },
//   };

//   return (
//     <div className="mx-auto px-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors min-h-screen">
//       <h1 className="text-2xl font-bold py-4">Employees Tickets</h1>

//       <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-md shadow transition-colors mb-3">
//         <div className="flex flex-wrap items-center gap-4">
//           <div className="flex items-center gap-2">
//             <label className="text-sm font-semibold whitespace-nowrap">Show</label>
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
//             value={priorityFilter}
//             onChange={(e) => {
//               setPriorityFilter(e.target.value);
//               setCurrentPage(1);
//             }}
//           >
//             <option value="All">All Priorities</option>
//             <option value="High">High</option>
//             <option value="Medium">Medium</option>
//             <option value="Low">Low</option>
//           </select>
//           <select
//             className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:outline-none"
//             value={status}
//             onChange={(e) => {
//               setStatus(e.target.value);
//               setCurrentPage(1);
//             }}
//           >
//             <option value="All">All Statuses</option>
//             <option value="Pending">Pending</option>
//             <option value="In Progress">In Progress</option>
//             <option value="Resolved">Resolved</option>
//           </select>
//           <div className="flex items-center gap-4 text-gray-500 dark:text-gray-300">
//             <button className="hover:text-gray-700 dark:hover:text-gray-100 transition-colors" title="Print">
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
//       </div>

//       <motion.div
//         className="bg-white dark:bg-gray-800 rounded-md shadow overflow-x-auto transition-colors"
//         variants={tableContainerVariants}
//         initial="hidden"
//         animate={tableControls}
//       >
//         {loading ? (
//           <div className="p-4">
//             {Array.from({ length: 10 }).map((_, i) => (
//               <Skeleton key={i} variant="rectangular" height={40} className="mb-2" />
//             ))}
//           </div>
//         ) : (
//           <table className="w-full text-left border-collapse min-w-max">
//             <thead className="bg-gray-50 dark:bg-gray-700">
//               <tr>
//                 <th className="p-3 text-sm font-semibold">S.L</th>
//                 <th className="p-3 text-sm font-semibold">Emp ID</th>
//                 <th className="p-3 text-sm font-semibold">Name</th>
//                 <th className="p-3 text-sm font-semibold">Title</th>
//                 <th className="p-3 text-sm font-semibold">Priority</th>
//                 <th className="p-3 text-sm font-semibold">Status</th>
//                 <th className="p-3 text-sm font-semibold">Department</th>
//                 <th className="p-3 text-sm font-semibold">Created On</th>
//                 <th className="p-3 text-sm font-semibold">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedIssues.map((issue, index) => {
//                 const globalIndex = (currentPage - 1) * pageSize + (index + 1);
//                 let priorityClasses =
//                   "bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-500";
//                 if (issue.priority === "High") {
//                   priorityClasses =
//                     "bg-red-50 dark:bg-red-700 text-red-600 dark:text-red-100 border border-red-200 dark:border-red-600";
//                 } else if (issue.priority === "Medium") {
//                   priorityClasses =
//                     "bg-yellow-50 dark:bg-yellow-700 text-yellow-600 dark:text-yellow-100 border border-yellow-200 dark:border-yellow-600";
//                 } else if (issue.priority === "Low") {
//                   priorityClasses =
//                     "bg-green-50 dark:bg-green-700 text-green-600 dark:text-green-100 border border-green-200 dark:border-green-600";
//                 }

//                 let statusClasses =
//                   "bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-500";
//                 if (issue.issueStatus === "Pending") {
//                   statusClasses =
//                     "bg-orange-50 dark:bg-orange-700 text-orange-600 dark:text-orange-100 border border-orange-200 dark:border-orange-600";
//                 } else if (issue.issueStatus === "In Progress") {
//                   statusClasses =
//                     "bg-blue-50 dark:bg-blue-700 text-blue-600 dark:text-blue-100 border border-blue-200 dark:border-blue-600";
//                 } else if (issue.issueStatus === "Resolved") {
//                   statusClasses =
//                     "bg-green-50 dark:bg-green-700 text-green-600 dark:text-green-100 border border-green-200 dark:border-green-600";
//                 }

//                 return (
//                   <motion.tr
//                     key={issue._id}
//                     variants={tableRowVariants}
//                     className="border-b last:border-b-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//                   >
//                     <td className="p-3 text-sm">{String(globalIndex).padStart(2, "0")}</td>
//                     <td className="p-3 text-sm text-blue-600 dark:text-blue-400 cursor-pointer">
//                       {issue.createdBy?.employee_Id || "--"}
//                     </td>
//                     <td className="p-3 text-sm">
//                       {issue.createdBy
//                         ? `${issue.createdBy.first_Name} ${issue.createdBy.last_Name}`
//                         : "Unknown"}
//                     </td>
//                     <td className="p-3 text-sm">{issue.issueTitle}</td>
//                     <td className="p-3 text-sm">
//                       <span
//                         className={`inline-block px-2 py-1 text-xs font-semibold rounded-md ${priorityClasses}`}
//                       >
//                         {issue.priority}
//                       </span>
//                     </td>
//                     <td className="p-3 text-sm">
//                       <span
//                         className={`inline-block px-2 py-1 text-xs font-semibold rounded-md ${statusClasses}`}
//                       >
//                         {issue.issueStatus}
//                       </span>
//                     </td>
//                     <td className="p-3 text-sm">{issue.assignedTo || "--"}</td>
//                     <td className="p-3 text-sm">
//                       {new Date(issue.createdAt).toLocaleDateString("en-GB", {
//                         day: "2-digit",
//                         month: "short",
//                         year: "numeric",
//                       })}
//                     </td>
//                     <td className="p-3 text-sm space-x-3">
//                       <button
//                         className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
//                         onClick={() => handleViewDetails(issue)}
//                       >
//                         <FaEye size={16} />
//                       </button>
//                       <button
//                         onClick={() => handleEdit(issue)}
//                         className="text-green-500 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 transition-colors"
//                       >
//                         <FaEdit size={16} />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(issue)}
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
//         {!loading && filteredIssues.length > 0 && (
//           <div className="flex flex-col md:flex-row justify-between items-center p-3 gap-2 text-sm">
//             <div>
//               Showing {paginatedIssues.length} of {filteredIssues.length} entries
//             </div>
//             <div className="flex items-center space-x-1">
//               {Array.from({ length: totalPages }, (_, i) => (
//                 <button
//                   key={i}
//                   className={`px-3 py-1 rounded border transition-colors ${
//                     currentPage === i + 1
//                       ? "bg-blue-600 text-white border-blue-600"
//                       : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
//                   }`}
//                   onClick={() => handlePageChange(i + 1)}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}
//         {!loading && filteredIssues.length === 0 && (
//           <div className="p-4 text-sm text-center text-gray-500 dark:text-gray-400">
//             No matching records found
//           </div>
//         )}
//       </motion.div>

//       <ConfirmationDialog
//         open={confirmOpen}
//         title={confirmTitle}
//         message={confirmMessage}
//         onConfirm={confirmAction}
//         onCancel={() => setConfirmOpen(false)}
//       />

//       {/* AnimatePresence for modals */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <motion.div
//             layout
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             transition={{ duration: 0.2 }}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
//           >
//             <motion.div layout className="bg-white dark:bg-gray-800 rounded-md p-4 max-w-lg w-full">
//               <TicketFormModal
//                 isOpen={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//                 mode={modalMode}
//                 initialData={selectedIssue}
//                 onSubmit={handleFormSubmit}
//               />
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {isDetailsModalOpen && (
//           <motion.div
//             layout
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             transition={{ duration: 0.2 }}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
//           >
//             <motion.div layout className="bg-white dark:bg-gray-800 rounded-md p-4 max-w-xl w-full">
//               <TicketDetailsModal
//                 isOpen={isDetailsModalOpen}
//                 onClose={() => setIsDetailsModalOpen(false)}
//                 ticket={selectedIssue}
//                 onAddComment={handleAddComment}
//               />
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }


import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { FaEye, FaEdit, FaTrash, FaPrint, FaFilePdf } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Skeleton } from "@mui/material";

import TicketFormModal from "./TicketFormModal";
import TicketDetailsModal from "./TicketDetailsModal";
import ConfirmationDialog from "../common/ConfirmationDialog";
import useIssuesStore from "../../store/useIssuesStore";

export default function TicketsPage() {
  const {
    issues,
    fetchDeptIssues,
    createIssue,
    editIssue,
    removeIssue,
    fetchComments,
    postComment,
    loading,
  } = useIssuesStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(() => {});
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [department, setDepartment] = useState("All");
  const [status, setStatus] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Framer Motion control for table "timeline" effect
  const tableControls = useAnimation();

  // Fetch data on mount and trigger table animation
  useEffect(() => {
    fetchDeptIssues().then(() => {
      // Once fetch is done, start the table animation
      tableControls.start("visible");
    });
  }, [fetchDeptIssues, tableControls]);

  const handleViewDetails = async (issue) => {
    setSelectedIssue(issue);
    await fetchComments(issue._id);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = (issue) => {
    setModalMode("edit");
    setSelectedIssue(issue);
    setIsModalOpen(true);
  };

  const handleDelete = (issue) => {
    setConfirmTitle("Delete Issue");
    setConfirmMessage(`Are you sure you want to delete issue "${issue.issueTitle}"?`);
    setConfirmAction(() => async () => {
      setConfirmOpen(false);
      await removeIssue(issue._id);
    });
    setConfirmOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    if (modalMode === "create") {
      await createIssue({
        issueTitle: formData.ticketTitle,
        issueDescription: formData.description,
        priority: formData.priority,
        assignedTo: formData.department !== "All" ? formData.department : "",
        issueStatus: formData.status,
        attachment: formData.attachment,
      });
    } else if (selectedIssue) {
      await editIssue(selectedIssue._id, {
        issueTitle: formData.ticketTitle,
        issueDescription: formData.description,
        priority: formData.priority,
        assignedTo: formData.department !== "All" ? formData.department : "",
        issueStatus: formData.status,
        attachment: formData.attachment,
      });
    }
    setIsModalOpen(false);
  };

  const handleAddComment = async (commentText) => {
    if (!selectedIssue) return;
    await postComment(selectedIssue._id, commentText);
  };

  // Filtering
  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      if (searchText) {
        const matchTitle = issue.issueTitle
          ?.toLowerCase()
          .includes(searchText.toLowerCase());
        const matchEmployeeId = issue.createdBy?.employee_Id
          ?.toLowerCase()
          .includes(searchText.toLowerCase());
        if (!matchTitle && !matchEmployeeId) return false;
      }
      if (department !== "All" && issue.assignedTo !== department) return false;
      if (status !== "All" && issue.issueStatus !== status) return false;
      if (priorityFilter !== "All" && issue.priority !== priorityFilter) return false;
      if (selectedDate) {
        const issueDate = new Date(issue.createdAt).setHours(0, 0, 0, 0);
        const filterDate = selectedDate.setHours(0, 0, 0, 0);
        if (issueDate !== filterDate) return false;
      }
      return true;
    });
  }, [issues, searchText, department, status, priorityFilter, selectedDate]);

  // Pagination
  const totalPages = Math.ceil(filteredIssues.length / pageSize);
  const paginatedIssues = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredIssues.slice(startIndex, startIndex + pageSize);
  }, [filteredIssues, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Framer Motion variants
  const tableContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
  };

  const tableRowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="mx-auto px-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors min-h-screen">
      <h1 className="text-2xl font-bold py-4">Employees Tickets</h1>

      {/* Filters, page size, search, etc. */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-md shadow transition-colors mb-3">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold whitespace-nowrap">Show</label>
            <select
              className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:outline-none"
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
          <div>
            <input
              type="text"
              placeholder="Search"
              className="border rounded px-3 py-1 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:outline-none"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setCurrentPage(1);
            }}
            dateFormat="dd/MM/yyyy"
            placeholderText="DD/MM/YYYY"
            className="border rounded px-3 py-1 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:outline-none"
          />
          <select
            className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:outline-none"
            value={priorityFilter}
            onChange={(e) => {
              setPriorityFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select
            className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:outline-none"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
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
      </div>

      {/* 
        Show Skeletons in a regular div while loading.
        Once loading is false, show the table inside a motion.div.
      */}
      {loading ? (
        <div className="bg-white dark:bg-gray-800 rounded-md shadow p-4 transition-colors">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={40} className="mb-2" />
          ))}
        </div>
      ) : filteredIssues.length > 0 ? (
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-md shadow overflow-x-auto transition-colors"
          variants={tableContainerVariants}
          initial="hidden"
          animate={tableControls}
        >
          <table className="w-full text-left border-collapse min-w-max">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="p-3 text-sm font-semibold">S.L</th>
                <th className="p-3 text-sm font-semibold">Emp ID</th>
                <th className="p-3 text-sm font-semibold">Name</th>
                <th className="p-3 text-sm font-semibold">Title</th>
                <th className="p-3 text-sm font-semibold">Priority</th>
                <th className="p-3 text-sm font-semibold">Status</th>
                <th className="p-3 text-sm font-semibold">Department</th>
                <th className="p-3 text-sm font-semibold">Created On</th>
                <th className="p-3 text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedIssues.map((issue, index) => {
                const globalIndex = (currentPage - 1) * pageSize + (index + 1);

                let priorityClasses =
                  "bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-500";
                if (issue.priority === "High") {
                  priorityClasses =
                    "bg-red-50 dark:bg-red-700 text-red-600 dark:text-red-100 border border-red-200 dark:border-red-600";
                } else if (issue.priority === "Medium") {
                  priorityClasses =
                    "bg-yellow-50 dark:bg-yellow-700 text-yellow-600 dark:text-yellow-100 border border-yellow-200 dark:border-yellow-600";
                } else if (issue.priority === "Low") {
                  priorityClasses =
                    "bg-green-50 dark:bg-green-700 text-green-600 dark:text-green-100 border border-green-200 dark:border-green-600";
                }

                let statusClasses =
                  "bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-500";
                if (issue.issueStatus === "Pending") {
                  statusClasses =
                    "bg-orange-50 dark:bg-orange-700 text-orange-600 dark:text-orange-100 border border-orange-200 dark:border-orange-600";
                } else if (issue.issueStatus === "In Progress") {
                  statusClasses =
                    "bg-blue-50 dark:bg-blue-700 text-blue-600 dark:text-blue-100 border border-blue-200 dark:border-blue-600";
                } else if (issue.issueStatus === "Resolved") {
                  statusClasses =
                    "bg-green-50 dark:bg-green-700 text-green-600 dark:text-green-100 border border-green-200 dark:border-green-600";
                }

                return (
                  <motion.tr
                    key={issue._id}
                    variants={tableRowVariants}
                    className="border-b last:border-b-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    <td className="p-3 text-sm">{String(globalIndex).padStart(2, "0")}</td>
                    <td className="p-3 text-sm text-blue-600 dark:text-blue-400 cursor-pointer">
                      {issue.createdBy?.employee_Id || "--"}
                    </td>
                    <td className="p-3 text-sm">
                      {issue.createdBy
                        ? `${issue.createdBy.first_Name} ${issue.createdBy.last_Name}`
                        : "Unknown"}
                    </td>
                    <td className="p-3 text-sm">{issue.issueTitle}</td>
                    <td className="p-3 text-sm">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-md ${priorityClasses}`}
                      >
                        {issue.priority}
                      </span>
                    </td>
                    <td className="p-3 text-sm">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-md ${statusClasses}`}
                      >
                        {issue.issueStatus}
                      </span>
                    </td>
                    <td className="p-3 text-sm">{issue.assignedTo || "--"}</td>
                    <td className="p-3 text-sm">
                      {new Date(issue.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="p-3 text-sm space-x-3">
                      <button
                        className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                        onClick={() => handleViewDetails(issue)}
                      >
                        <FaEye size={16} />
                      </button>
                      <button
                        onClick={() => handleEdit(issue)}
                        className="text-green-500 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 transition-colors"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(issue)}
                        className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
                      >
                        <FaTrash size={16} />
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex flex-col md:flex-row justify-between items-center p-3 gap-2 text-sm">
            <div>
              Showing {paginatedIssues.length} of {filteredIssues.length} entries
            </div>
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 rounded border transition-colors ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                  }`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        // No matching records (only shows when !loading && filteredIssues.length === 0)
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow text-center text-gray-500 dark:text-gray-400">
          No matching records found
        </div>
      )}

      <ConfirmationDialog
        open={confirmOpen}
        title={confirmTitle}
        message={confirmMessage}
        onConfirm={confirmAction}
        onCancel={() => setConfirmOpen(false)}
      />

      {/* AnimatePresence for the Ticket Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          >
            <motion.div
              layout
              className="bg-white dark:bg-gray-800 rounded-md p-4 max-w-lg w-full"
            >
              <TicketFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mode={modalMode}
                initialData={selectedIssue}
                onSubmit={handleFormSubmit}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AnimatePresence for the Ticket Details Modal */}
      <AnimatePresence>
        {isDetailsModalOpen && (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          >
            <motion.div
              layout
              className="bg-white dark:bg-gray-800 rounded-md p-4 max-w-xl w-full"
            >
              <TicketDetailsModal
                isOpen={isDetailsModalOpen}
                onClose={() => setIsDetailsModalOpen(false)}
                ticket={selectedIssue}
                onAddComment={handleAddComment}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

