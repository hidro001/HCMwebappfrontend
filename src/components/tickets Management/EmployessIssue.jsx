


// import React, { useState, useEffect, useMemo } from "react";
// import { motion } from "framer-motion";
// import { FaEye, FaEdit, FaTrash, FaPrint, FaFilePdf, FaComment } from "react-icons/fa";
// import { MdOutlineFileDownload } from "react-icons/md";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { toast } from "react-hot-toast";

// // Our custom modals & dialogs
// import TicketFormModal from "./EmployessIssueModel";
// import CommentModal from "./CommentModal";
// import TicketViewModal from "./TicketViewModal";
// import ConfirmationDialog from "../common/ConfirmationDialog";

// // Zustand stores
// import useIssuesStore from "../../store/useIssuesStore";
// import useDepartmentStore from "../../store/departmentStore";

// export default function EmployessIssue() {
//   // ---------- Issues Store ----------
//   const {
//     issues,
//     fetchOwnIssues,
//     createIssue,
//     editIssue,
//     removeIssue,
//     fetchComments,
//     postComment,
//     loading,
//   } = useIssuesStore();

//   // ---------- Departments Store (for department filter) ----------
//   // const { departments, fetchDepartments } = useDepartmentStore();

//   // ---------- Local UI State ----------
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState("create"); // "create" or "edit"
//   const [selectedIssue, setSelectedIssue] = useState(null);

//   // For Comments
//   const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

//   // For View Modal
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);

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
//   const [priorityFilter, setPriorityFilter] = useState("All"); // "All", "High", "Medium", "Low"
//   const [currentPage, setCurrentPage] = useState(1);

//   // ---------- Lifecycle ----------
//   useEffect(() => {
//     // Fetch issues & departments on mount
//     fetchOwnIssues();
//     // fetchDepartments();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // ---------- Handlers ----------
//   const handleRaiseTicket = () => {
//     setModalMode("create");
//     setSelectedIssue(null);
//     setIsModalOpen(true);
//   };

//   const handleView = (issue) => {
//     setSelectedIssue(issue);
//     setIsViewModalOpen(true);
//   };

//   const handleComment = async (issue) => {
//     setSelectedIssue(issue);
//     setIsCommentModalOpen(true);
//     await fetchComments(issue._id);
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

//   // const handleFormSubmit = async (formData) => {
//   //   if (modalMode === "create") {
//   //     await createIssue({
//   //       issueTitle: formData.ticketTitle,
//   //       issueDescription: formData.description,
//   //       priority: formData.priority,
//   //       assignedTo: formData.department !== "All" ? formData.department : "",
//   //       issueStatus: formData.status,
//   //     });
//   //   } else if (selectedIssue) {
//   //     await editIssue(selectedIssue._id, {
//   //       issueTitle: formData.ticketTitle,
//   //       issueDescription: formData.description,
//   //       priority: formData.priority,
//   //       assignedTo: formData.department !== "All" ? formData.department : "",
//   //       issueStatus: formData.status,
//   //     });
//   //   }
//   //   setIsModalOpen(false);
//   // };

//   const handleFormSubmit = async (formData) => {
//     // formData = {
//     //   ticketTitle, department, priority, status, description, attachment, ...
//     // }
//     if (modalMode === "create") {
//       await createIssue({
//         issueTitle: formData.ticketTitle,
//         issueDescription: formData.description,
//         priority: formData.priority,
//         assignedTo: formData.department !== "All" ? formData.department : "",
//         issueStatus: formData.status,
//         attachment: formData.attachment, // <-- Add this
//       });
//     } else if (selectedIssue) {
//       await editIssue(selectedIssue._id, {
//         issueTitle: formData.ticketTitle,
//         issueDescription: formData.description,
//         priority: formData.priority,
//         assignedTo: formData.department !== "All" ? formData.department : "",
//         issueStatus: formData.status,
//         attachment: formData.attachment, // <-- Add this
//       });
//     }
//     setIsModalOpen(false);
//   };

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
//       className=" mx-auto px-4  space-y-2
//                  bg-gray-50 dark:bg-gray-900
//                  text-gray-800 dark:text-gray-100
//                   transition-colors"
//     >
//       <h1 className="text-2xl font-bold">Previous Tickets</h1>

//       {/* Top Toolbar */}
//       <motion.div
//         className="flex flex-wrap items-center justify-between gap-4
//                    bg-white dark:bg-gray-800 
//                    p-4 rounded-md shadow
//                    transition-colors "
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

//         {/* Middle: date, dept, priority, status, export icons */}
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

//           {/* Department Filter */}
//           {/* <select
//             className="border rounded px-2 py-1 text-sm
//                        bg-white dark:bg-gray-700
//                        text-gray-700 dark:text-gray-100
//                        focus:outline-none"
//             value={department}
//             onChange={(e) => {
//               setDepartment(e.target.value);
//               setCurrentPage(1);
//             }}
//           >
//             <option value="All">All Depts</option>
//             {departments.map((dep) => (
//               <option key={dep._id} value={dep.department}>
//                 {dep.department}
//               </option>
//             ))}
//           </select> */}

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

//         {/* Right: Raise Ticket */}
//         <button
//           onClick={handleRaiseTicket}
//           className="ml-auto bg-blue-600 text-white px-4 py-2 rounded shadow 
//                      hover:bg-blue-700 text-sm transition-colors"
//         >
//           + Raise Ticket
//         </button>
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
//                       {/* View */}
//                       <button
//                         className="text-blue-500 dark:text-blue-400 hover:text-blue-600 
//                                    dark:hover:text-blue-300 transition-colors"
//                         title="View"
//                         onClick={() => handleView(issue)}
//                       >
//                         <FaEye size={16} />
//                       </button>

//                       {/* Comment */}
//                       <button
//                         className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 
//                                    dark:hover:text-indigo-300 transition-colors"
//                         title="Comment"
//                         onClick={() => handleComment(issue)}
//                       >
//                         <FaComment size={16} />
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

//       {/* View Modal */}
//       <TicketViewModal
//         isOpen={isViewModalOpen}
//         onClose={() => setIsViewModalOpen(false)}
//         ticket={selectedIssue}
//       />

//       {/* Create/Edit Modal */}
//       <TicketFormModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         mode={modalMode}
//         initialData={selectedIssue}
//         onSubmit={handleFormSubmit}
//       />

//       {/* Comment Modal */}
//       <CommentModal
//         isOpen={isCommentModalOpen}
//         onClose={() => setIsCommentModalOpen(false)}
//         ticket={selectedIssue}
//         onAddComment={handleAddComment}
//       />
//     </div>
//   );
// }


// import React, { useState, useEffect, useMemo } from "react";
// import { motion } from "framer-motion";
// import { FaEye, FaEdit, FaTrash, FaPrint, FaFilePdf } from "react-icons/fa"; // <-- REMOVED FaComment
// import { MdOutlineFileDownload } from "react-icons/md";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { toast } from "react-hot-toast";

// // Our custom modals & dialogs
// import EmployessIssueModel from "./EmployessIssueModel";
// import ConfirmationDialog from "../common/ConfirmationDialog";
// import TicketDetailsModal from "./TicketDetailsModal"; // <-- The NEW single modal

// // Zustand stores
// import useIssuesStore from "../../store/useIssuesStore";
// import useDepartmentStore from "../../store/departmentStore";

// export default function AllTickets() {
//   // ---------- Issues Store ----------
//   const {
//     issues,
//     fetchAllIssues,
//     createIssue,
//     editIssue,
//     removeIssue,
//     fetchComments,   // We'll fetch comments here on "View"
//     postComment,
//     loading,
//   } = useIssuesStore();

//   // ---------- Departments Store (for department filter) ----------
//   const { departments, fetchDepartments } = useDepartmentStore();

//   // ---------- Local UI State ----------
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState("create"); // "create" or "edit"
//   const [selectedIssue, setSelectedIssue] = useState(null);

//   // Single modal for ticket details + comments
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
//     // Fetch all issues & departments on mount
//     fetchAllIssues();
//     fetchDepartments();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // ---------- Handlers ----------

//     // ---------- Handlers ----------
//   const handleRaiseTicket = () => {
//     setModalMode("create");
//     setSelectedIssue(null);
//     setIsModalOpen(true);
//   };

//   // View the ticket details (and comments) in one modal
//   const handleViewDetails = async (issue) => {
//     setSelectedIssue(issue);
//     // fetch comments for the selected issue
//     await fetchComments(issue._id);
//     // open the single modal
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

//   // Handler for posting a new comment from the single modal
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
//       className="mx-auto px-4 
//                  bg-gray-50 dark:bg-gray-900
//                  text-gray-800 dark:text-gray-100
//                  transition-colors"
//     >
//       <h1 className="text-2xl font-bold">ALL Tickets</h1>

//       {/* Top Toolbar */}
//       <motion.div
//         className="flex flex-wrap items-center justify-between gap-4
//                    bg-white dark:bg-gray-800 
//                    p-4 rounded-md shadow
//                    transition-colors mb-4"
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

//         {/* Middle: date, dept, priority, status, export icons */}
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

//           {/* Department Filter */}
//           <select
//             className="border rounded px-2 py-1 text-sm
//                        bg-white dark:bg-gray-700
//                        text-gray-700 dark:text-gray-100
//                        focus:outline-none"
//             value={department}
//             onChange={(e) => {
//               setDepartment(e.target.value);
//               setCurrentPage(1);
//             }}
//           >
//             <option value="All">All Depts</option>
//             {departments.map((dep) => (
//               <option key={dep._id} value={dep.department}>
//                 {dep.department}
//               </option>
//             ))}
//           </select>

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
//             <button
//           onClick={handleRaiseTicket}
//           className="ml-auto bg-blue-600 text-white px-4 py-2 rounded shadow 
//                      hover:bg-blue-700 text-sm transition-colors"
//         >
//           + Raise Ticket
//         </button>
//       </motion.div>

//       {/* Table of Issues */}
//       <div
//         className="bg-white dark:bg-gray-800 
//                    rounded-md shadow 
//                    overflow-x-auto transition-colors"
//       >
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
//                       {/* Single "View Details" button (replaces both view + comment) */}
//                       <button
//                         className="text-blue-500 dark:text-blue-400 hover:text-blue-600 
//                                    dark:hover:text-blue-300 transition-colors"
//                         title="View Details"
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

//       {/* The single "Details" modal (TicketDetailsModal) */}
//       <TicketDetailsModal
//         isOpen={isDetailsModalOpen}
//         onClose={() => setIsDetailsModalOpen(false)}
//         ticket={selectedIssue}
//         onAddComment={handleAddComment}
//       />

//       {/* Create/Edit Ticket Modal */}
//       <EmployessIssueModel
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         mode={modalMode}
//         initialData={selectedIssue}
//         onSubmit={handleFormSubmit}
//       />
//     </div>
//   );
// }

// import React, { useState, useEffect, useMemo } from "react";
// import { motion, useAnimation } from "framer-motion";
// import { FaEye, FaEdit, FaTrash, FaPrint, FaFilePdf } from "react-icons/fa";
// import { MdOutlineFileDownload } from "react-icons/md";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { Skeleton } from "@mui/material";
// import { toast } from "react-hot-toast";
// import EmployessIssueModel from "./EmployessIssueModel";
// import ConfirmationDialog from "../common/ConfirmationDialog";
// import TicketDetailsModal from "./TicketDetailsModal";
// import useIssuesStore from "../../store/useIssuesStore";
// import useDepartmentStore from "../../store/departmentStore";

// export default function AllTickets() {
//   const {
//     issues,
//     fetchAllIssues,
//     createIssue,
//     editIssue,
//     removeIssue,
//     fetchComments,
//     postComment,
//     loading,
//   } = useIssuesStore();
//   const { departments, fetchDepartments } = useDepartmentStore();
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
//   const tableControls = useAnimation();

//   useEffect(() => {
//     fetchAllIssues().then(() => tableControls.start("visible"));
//     fetchDepartments();
//   }, [fetchAllIssues, fetchDepartments, tableControls]);

//   const handleRaiseTicket = () => {
//     setModalMode("create");
//     setSelectedIssue(null);
//     setIsModalOpen(true);
//   };

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
//         const matchEmployeeId = issue.createdBy?.employee_Id?.toLowerCase().includes(searchText.toLowerCase());
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

//   const toolbarVariants = {
//     hidden: { opacity: 0, y: -10 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
//   };

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
//     <div className="mx-auto px-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors ">
//       <h1 className="text-2xl font-bold mb-2">ALL Tickets</h1>
//       <motion.div
//         className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-md shadow transition-colors mb-4"
//         variants={toolbarVariants}
//         initial="hidden"
//         animate="visible"
//       >
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
//             value={department}
//             onChange={(e) => {
//               setDepartment(e.target.value);
//               setCurrentPage(1);
//             }}
//           >
//             <option value="All">All Depts</option>
//             {departments.map((dep) => (
//               <option key={dep._id} value={dep.department}>
//                 {dep.department}
//               </option>
//             ))}
//           </select>
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
//             <button className="hover:text-gray-700 dark:hover:text-gray-100 transition-colors" title="Export to PDF">
//               <FaFilePdf size={18} />
//             </button>
//             <button className="hover:text-gray-700 dark:hover:text-gray-100 transition-colors" title="Export CSV/Excel">
//               <MdOutlineFileDownload size={20} />
//             </button>
//           </div>
//           <button
//             onClick={handleRaiseTicket}
//             className="ml-auto bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 text-sm transition-colors"
//           >
//             + Raise Ticket
//           </button>
//         </div>
//       </motion.div>
//       {loading ? (
//         <div className="bg-white dark:bg-gray-800 rounded-md shadow p-4 transition-colors">
//           {Array.from({ length: 10 }).map((_, i) => (
//             <Skeleton key={i} variant="rectangular" height={40} className="mb-2" />
//           ))}
//         </div>
//       ) : filteredIssues.length > 0 ? (
//         <motion.div
//           className="bg-white dark:bg-gray-800 rounded-md shadow overflow-x-auto transition-colors"
//           variants={tableContainerVariants}
//           initial="hidden"
//           animate={tableControls}
//         >
//           <motion.table className="w-full text-left border-collapse min-w-max" variants={tableContainerVariants}>
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
//                       <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-md ${priorityClasses}`}>
//                         {issue.priority}
//                       </span>
//                     </td>
//                     <td className="p-3 text-sm">
//                       <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-md ${statusClasses}`}>
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
//                         title="View Details"
//                       >
//                         <FaEye size={16} />
//                       </button>
//                       <button
//                         onClick={() => handleEdit(issue)}
//                         className="text-green-500 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 transition-colors"
//                         title="Edit"
//                       >
//                         <FaEdit size={16} />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(issue)}
//                         className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
//                         title="Delete"
//                       >
//                         <FaTrash size={16} />
//                       </button>
//                     </td>
//                   </motion.tr>
//                 );
//               })}
//             </tbody>
//           </motion.table>
//           <div className="flex flex-col md:flex-row justify-between items-center p-3 gap-2 text-sm">
//             <div>Showing {paginatedIssues.length} of {filteredIssues.length} entries</div>
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
//         </motion.div>
//       ) : (
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow text-center text-gray-500 dark:text-gray-400">
//           No matching records found
//         </div>
//       )}
//       <ConfirmationDialog
//         open={confirmOpen}
//         title={confirmTitle}
//         message={confirmMessage}
//         onConfirm={confirmAction}
//         onCancel={() => setConfirmOpen(false)}
//       />
//       <TicketDetailsModal
//         isOpen={isDetailsModalOpen}
//         onClose={() => setIsDetailsModalOpen(false)}
//         ticket={selectedIssue}
//         onAddComment={handleAddComment}
//       />
//       <EmployessIssueModel
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         mode={modalMode}
//         initialData={selectedIssue}
//         onSubmit={handleFormSubmit}
//       />
//     </div>
//   );
// }


import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEdit, FaTrash, FaPrint, FaFilePdf } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Skeleton } from "@mui/material";
import { toast } from "react-hot-toast";

import EmployessIssueModel from "./EmployessIssueModel";
import ConfirmationDialog from "../common/ConfirmationDialog";
import TicketDetailsModal from "./TicketDetailsModal";
import useIssuesStore from "../../store/useIssuesStore";
import useDepartmentStore from "../../store/departmentStore";

const tableContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // Stagger each child (table row) by 0.05s
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
};

const tableRowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function AllTickets() {
  const {
    issues,
    fetchOwnIssues,
    createIssue,
    editIssue,
    removeIssue,
    fetchComments,
    postComment,
    loading,
  } = useIssuesStore();
  const { departments, fetchDepartments } = useDepartmentStore();

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

  useEffect(() => {
    // Fetch issues and department data on mount
    fetchOwnIssues();
    // fetchDepartments();
  }, [fetchOwnIssues]);

  const handleRaiseTicket = () => {
    setModalMode("create");
    setSelectedIssue(null);
    setIsModalOpen(true);
  };

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

  // Filtering logic
  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      if (searchText) {
        const matchTitle = issue.issueTitle?.toLowerCase().includes(searchText.toLowerCase());
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

  // Pagination logic
  const totalPages = Math.ceil(filteredIssues.length / pageSize);
  const paginatedIssues = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredIssues.slice(startIndex, startIndex + pageSize);
  }, [filteredIssues, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Simple fade-in for the toolbar
  const toolbarVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="mx-auto px-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
      <h1 className="text-2xl font-bold mb-2">ALL Tickets</h1>

      {/* Toolbar */}
      <motion.div
        className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-md shadow transition-colors mb-4"
        variants={toolbarVariants}
        initial="hidden"
        animate="visible"
      >
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
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Depts</option>
            {departments.map((dep) => (
              <option key={dep._id} value={dep.department}>
                {dep.department}
              </option>
            ))}
          </select>
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
            <button className="hover:text-gray-700 dark:hover:text-gray-100 transition-colors" title="Print">
              <FaPrint size={18} />
            </button>
            <button className="hover:text-gray-700 dark:hover:text-gray-100 transition-colors" title="Export to PDF">
              <FaFilePdf size={18} />
            </button>
            <button className="hover:text-gray-700 dark:hover:text-gray-100 transition-colors" title="Export CSV/Excel">
              <MdOutlineFileDownload size={20} />
            </button>
          </div>
          <button
            onClick={handleRaiseTicket}
            className="ml-auto bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 text-sm transition-colors"
          >
            + Raise Ticket
          </button>
        </div>
      </motion.div>

      {/* Table / Skeleton / No Records */}
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
          animate="visible"
        >
          <motion.table className="w-full text-left border-collapse min-w-max">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="p-3 text-sm font-semibold">S.L</th>
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

                // Priority classes
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

                // Status classes
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
                
                    <td className="p-3 text-sm">
                      {issue.createdBy
                        ? `${issue.createdBy.first_Name} ${issue.createdBy.last_Name}`
                        : "Unknown"}
                    </td>
                    <td className="p-3 text-sm">{issue.issueTitle}</td>
                    <td className="p-3 text-sm">
                      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-md ${priorityClasses}`}>
                        {issue.priority}
                      </span>
                    </td>
                    <td className="p-3 text-sm">
                      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-md ${statusClasses}`}>
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
                        title="View Details"
                      >
                        <FaEye size={16} />
                      </button>
                      <button
                        onClick={() => handleEdit(issue)}
                        className="text-green-500 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 transition-colors"
                        title="Edit"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(issue)}
                        className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
                        title="Delete"
                      >
                        <FaTrash size={16} />
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </motion.table>

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
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow text-center text-gray-500 dark:text-gray-400">
          No matching records found
        </div>
      )}

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={confirmOpen}
        title={confirmTitle}
        message={confirmMessage}
        onConfirm={confirmAction}
        onCancel={() => setConfirmOpen(false)}
      />

      {/* Ticket Details Modal */}
      <TicketDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        ticket={selectedIssue}
        onAddComment={handleAddComment}
      />

      {/* Create/Edit Issue Modal */}
      <EmployessIssueModel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        initialData={selectedIssue}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}

