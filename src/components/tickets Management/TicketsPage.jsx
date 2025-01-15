

// import React, { useState, useMemo } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// // Import your TicketFormModal component
// import TicketFormModal from "./TicketFormModal";
// import CommentModal from "./CommentModal"; 
// import TicketViewModal from "./TicketViewModal";

// // React Icons
// import {
//   FaEye,
//   FaEdit,
//   FaTrash,
//   FaPrint,
//   FaFilePdf,
//   FaComment,
// } from "react-icons/fa";
// import { MdOutlineFileDownload } from "react-icons/md";
// import { motion } from "framer-motion";

// const initialTickets = [
//   {
//     id: "#526534",
//     employeeId: "#526534",
//     empName: "john",
//     title: "Kathryn Murphy",
//     date: "2024-01-25",
//     priority: "Low",
//     status: "Done",
//     department: "Finance",
//     EmployeeDesignation: "Full Stack Web Developer",
//     AssignedTo: "HR",
//   },
//   {
//     id: "#696589",
//     employeeId: "#696589",
//     empName: "hulk",
//     title: "Annette Black",
//     date: "2024-01-25",
//     priority: "Medium",
//     status: "On Hold",
//     department: "Marketing",
//     EmployeeDesignation: "Full Stack Web Developer",
//     AssignedTo: "IT",
//   },
//   // ... more dummy data ...
//   {
//     id: "#101010",
//     employeeId: "#101010",
//     empName: "roman",
//     title: "Clark Kent",
//     date: "2024-11-01",
//     priority: "High",
//     status: "Pending",
//     department: "Finance",
//     EmployeeDesignation: "Full Stack Web Developer",
//     AssignedTo: "FINANCE",
//   },
//   {
//     id: "#101010",
//     employeeId: "#101010",
//     empName: "roman",
//     title: "Clark Kent",
//     date: "2024-11-01",
//     priority: "High",
//     status: "Pending",
//     department: "Finance",
//     EmployeeDesignation: "Full Stack Web Developer",
//     AssignedTo: "FINANCE",
//   },
//   {
//     id: "#101010",
//     employeeId: "#101010",
//     empName: "roman",
//     title: "Clark Kent",
//     date: "2024-11-01",
//     priority: "High",
//     status: "Pending",
//     department: "Finance",
//     EmployeeDesignation: "Full Stack Web Developer",
//     AssignedTo: "FINANCE",
//   },
// ];

// const departmentOptions = ["All Departments", "Finance", "HR", "IT", "Marketing"];
// const statusOptions = ["All Statuses", "Done", "Pending", "On Hold"];

// export default function TicketsPage() {
//   // Tickets data (If you need to edit tickets in state, store them here)
//   const [tickets, setTickets] = useState(initialTickets);

//   // --- Modal Controls ---
//   const [isModalOpen, setIsModalOpen] = useState(false); // controls open/close
//   const [modalMode, setModalMode] = useState("create"); // "create" or "edit"
//   const [selectedTicket, setSelectedTicket] = useState(null);

//   // --- Filters ---
//   const [pageSize, setPageSize] = useState(10);
//   const [searchText, setSearchText] = useState("");
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [department, setDepartment] = useState("All Departments");
//   const [status, setStatus] = useState("All Statuses");
//   const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
//   const [comments, setComments] = useState([
//     {
//       userName: "Riya Mishra",
//       userId: "R10023",
//       text: "It is a long established fact that a reader will be distracted...",
//       timestamp: "6:30 pm",
//     },
//   ]);
//   // --- Pagination ---
//   const [currentPage, setCurrentPage] = useState(1);

//   // View modal
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);

//   // Handle create (Raise Ticket) button
//   const handleRaiseTicket = () => {
//     setModalMode("create");
//     setSelectedTicket(null); // no ticket to edit
//     setIsModalOpen(true);
//   };

//   // View ticket details
//   const handleView = (ticket) => {
//     setSelectedTicket(ticket);
//     setIsViewModalOpen(true);
//   };

//   // Comment modal
//   const handleComment = (ticket) => {
//     setSelectedTicket(ticket);
//     setIsCommentModalOpen(true);
//   };
//   const handleAddComment = (newCommentText) => {
//     const newComment = {
//       userName: "Current User", // or dynamic user
//       userId: "U12345", // or dynamic user ID
//       text: newCommentText,
//       timestamp: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//     };
//     setComments([...comments, newComment]);
//   };

//   // Edit ticket
//   const handleEdit = (ticket) => {
//     setModalMode("edit");
//     setSelectedTicket(ticket);
//     setIsModalOpen(true);
//   };

//   // *** Delete ticket ***
//   const handleDelete = (ticketId) => {
//     setTickets((prevTickets) => prevTickets.filter((t) => t.id !== ticketId));
//   };

//   // Close the Raise/Edit modal
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   // Handle the form submission from the modal
//   const handleFormSubmit = (formData) => {
//     if (modalMode === "create") {
//       // Add new ticket
//       const newTicket = {
//         id: "TEMP_ID_" + Date.now(), // generate an ID
//         ...formData,
//       };
//       setTickets((prev) => [...prev, newTicket]);
//     } else {
//       // Edit existing ticket
//       setTickets((prev) =>
//         prev.map((t) => (t.id === selectedTicket.id ? { ...t, ...formData } : t))
//       );
//     }
//   };

//   // --- Filtering ---
//   const filteredTickets = useMemo(() => {
//     return tickets.filter((ticket) => {
//       // Search filter
//       if (
//         searchText &&
//         !(
//           ticket.employeeId.toLowerCase().includes(searchText.toLowerCase()) ||
//           (ticket.AssignedTo &&
//             ticket.AssignedTo
//               .toLowerCase()
//               .includes(searchText.toLowerCase())) ||
//           ticket.title.toLowerCase().includes(searchText.toLowerCase())
//         )
//       ) {
//         return false;
//       }
//       // Department filter
//       if (department !== "All Departments" && ticket.department !== department) {
//         return false;
//       }
//       // Status filter
//       if (status !== "All Statuses" && ticket.status !== status) {
//         return false;
//       }
//       // Date filter
//       if (selectedDate) {
//         const ticketDate = new Date(ticket.date).setHours(0, 0, 0, 0);
//         const filterDate = new Date(selectedDate).setHours(0, 0, 0, 0);
//         if (ticketDate !== filterDate) return false;
//       }
//       return true;
//     });
//   }, [tickets, searchText, department, status, selectedDate]);

//   // --- Pagination Logic ---
//   const totalPages = Math.ceil(filteredTickets.length / pageSize);
//   const paginatedTickets = useMemo(() => {
//     const startIndex = (currentPage - 1) * pageSize;
//     return filteredTickets.slice(startIndex, startIndex + pageSize);
//   }, [filteredTickets, currentPage, pageSize]);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   // Framer Motion variants
//   const containerVariants = {
//     hidden: { opacity: 0, y: -10 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.4 },
//     },
//   };

//   return (
//     <div
//       className="max-w-7xl mx-auto px-4 py-6 space-y-6 
//                  bg-gray-50 dark:bg-gray-900
//                  text-gray-800 dark:text-gray-100 
//                  min-h-screen transition-colors"
//     >
//       <h1 className="text-2xl font-bold">Previous Tickets</h1>

//       {/* Top toolbar with filters & icons */}
//       <motion.div
//         className="flex flex-wrap items-center justify-between gap-4 
//                    bg-white dark:bg-gray-800 p-4 rounded shadow
//                    transition-colors"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         {/* Left side: Show X & search */}
//         <div className="flex flex-wrap items-center gap-3">
//           <div className="flex items-center gap-2">
//             <label className="text-sm font-semibold">Show</label>
//             <select
//               className="border rounded px-2 py-1 text-sm 
//                          bg-white dark:bg-gray-700 
//                          text-gray-700 dark:text-gray-100"
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
//               className="border rounded px-3 py-1 text-sm 
//                          focus:outline-none
//                          bg-white dark:bg-gray-700 
//                          text-gray-700 dark:text-gray-100"
//               value={searchText}
//               onChange={(e) => {
//                 setSearchText(e.target.value);
//                 setCurrentPage(1);
//               }}
//             />
//           </div>
//         </div>

//         {/* Middle: date picker, dept, status, export icons */}
//         <div className="flex flex-wrap items-center gap-3">
//           <DatePicker
//             selected={selectedDate}
//             onChange={(date) => {
//               setSelectedDate(date);
//               setCurrentPage(1);
//             }}
//             dateFormat="dd/MM/yyyy"
//             placeholderText="Select date"
//             className="border rounded px-3 py-1 text-sm 
//                        focus:outline-none
//                        bg-white dark:bg-gray-700 
//                        text-gray-700 dark:text-gray-100"
//           />

//           <select
//             className="border rounded px-2 py-1 text-sm
//                        bg-white dark:bg-gray-700 
//                        text-gray-700 dark:text-gray-100"
//             value={department}
//             onChange={(e) => {
//               setDepartment(e.target.value);
//               setCurrentPage(1);
//             }}
//           >
//             {departmentOptions.map((dep) => (
//               <option key={dep} value={dep}>
//                 {dep}
//               </option>
//             ))}
//           </select>

//           <select
//             className="border rounded px-2 py-1 text-sm
//                        bg-white dark:bg-gray-700 
//                        text-gray-700 dark:text-gray-100"
//             value={status}
//             onChange={(e) => {
//               setStatus(e.target.value);
//               setCurrentPage(1);
//             }}
//           >
//             {statusOptions.map((st) => (
//               <option key={st} value={st}>
//                 {st}
//               </option>
//             ))}
//           </select>

//           <div className="flex items-center gap-2 text-gray-500 dark:text-gray-300">
//             {/* Print */}
//             <button
//               title="Print"
//               className="hover:text-gray-700 dark:hover:text-gray-100 transition-colors"
//             >
//               <FaPrint size={18} />
//             </button>
//             {/* PDF */}
//             <button
//               title="Export to PDF"
//               className="hover:text-gray-700 dark:hover:text-gray-100 transition-colors"
//             >
//               <FaFilePdf size={18} />
//             </button>
//             {/* CSV/Excel */}
//             <button
//               title="Export CSV/Excel"
//               className="hover:text-gray-700 dark:hover:text-gray-100 transition-colors"
//             >
//               <MdOutlineFileDownload size={20} />
//             </button>
//           </div>
//         </div>

//         {/* Right side: Raise Ticket */}
//         <button
//           onClick={handleRaiseTicket}
//           className="ml-auto bg-blue-600 text-white px-4 py-2 rounded shadow 
//                      hover:bg-blue-700 transition-colors
//                      text-sm"
//         >
//           + Raise Ticket
//         </button>
//       </motion.div>

//       {/* Table */}
//       <div className="bg-white dark:bg-gray-800 rounded shadow overflow-x-auto transition-colors">
//         <table className="w-full text-left border-collapse min-w-max">
//           <thead className="bg-gray-100 dark:bg-gray-700">
//             <tr>
//               <th className="p-3 text-sm font-semibold">S.L</th>
//               <th className="p-3 text-sm font-semibold">Emp ID</th>
//               <th className="p-3 text-sm font-semibold">Full Name</th>
//               <th className="p-3 text-sm font-semibold">Employee Designation</th>
//               <th className="p-3 text-sm font-semibold">Title</th>
//               <th className="p-3 text-sm font-semibold">Assigned To</th>
//               <th className="p-3 text-sm font-semibold">Date</th>
//               <th className="p-3 text-sm font-semibold">Priority</th>
//               <th className="p-3 text-sm font-semibold">Status</th>
//               <th className="p-3 text-sm font-semibold">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedTickets.map((ticket, index) => {
//               const globalIndex = (currentPage - 1) * pageSize + (index + 1);
//               return (
//                 <tr
//                   key={ticket.id}
//                   className="border-b border-gray-200 dark:border-gray-700 
//                              hover:bg-gray-50 dark:hover:bg-gray-600 
//                              transition-colors"
//                 >
//                   <td className="p-3 text-sm">
//                     {String(globalIndex).padStart(2, "0")}
//                   </td>
//                   <td className="p-3 text-sm text-blue-600 dark:text-blue-400">
//                     {ticket.employeeId}
//                   </td>
//                   <td className="p-3 text-sm">{ticket.empName}</td>
//                   <td className="p-3 text-sm">{ticket.EmployeeDesignation}</td>
//                   <td className="p-3 text-sm">{ticket.title}</td>
//                   <td className="p-3 text-sm">{ticket.AssignedTo}</td>
//                   <td className="p-3 text-sm">
//                     {new Date(ticket.date).toLocaleDateString("en-GB", {
//                       day: "2-digit",
//                       month: "short",
//                       year: "numeric",
//                     })}
//                   </td>
//                   <td className="p-3 text-sm">
//                     <span
//                       className={
//                         ticket.priority === "High"
//                           ? "text-red-600 dark:text-red-500 font-semibold"
//                           : ticket.priority === "Medium"
//                           ? "text-yellow-600 dark:text-yellow-500 font-semibold"
//                           : "text-green-600 dark:text-green-500 font-semibold"
//                       }
//                     >
//                       {ticket.priority}
//                     </span>
//                   </td>
//                   <td className="p-3 text-sm">
//                     <span
//                       className={
//                         ticket.status === "Done"
//                           ? "bg-green-100 dark:bg-green-700 text-green-600 dark:text-green-100 px-2 py-1 rounded text-xs"
//                           : ticket.status === "On Hold"
//                           ? "bg-yellow-100 dark:bg-yellow-700 text-yellow-600 dark:text-yellow-100 px-2 py-1 rounded text-xs"
//                           : "bg-red-100 dark:bg-red-700 text-red-600 dark:text-red-100 px-2 py-1 rounded text-xs"
//                       }
//                     >
//                       {ticket.status}
//                     </span>
//                   </td>
//                   <td className="p-3 text-sm space-x-3">
//                     {/* View button */}
//                     <button
//                       className="text-blue-500 dark:text-blue-400 hover:text-blue-600 
//                                  dark:hover:text-blue-300 transition-colors"
//                       title="View"
//                       onClick={() => handleView(ticket)}
//                     >
//                       <FaEye size={16} />
//                     </button>

//                     {/* Comment button */}
//                     <button
//                       className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 
//                                  dark:hover:text-indigo-300 transition-colors"
//                       title="Comment"
//                       onClick={() => handleComment(ticket)}
//                     >
//                       <FaComment size={16} />
//                     </button>

//                     {/* Edit button */}
//                     <button
//                       onClick={() => handleEdit(ticket)}
//                       className="text-green-500 dark:text-green-400 hover:text-green-600 
//                                  dark:hover:text-green-300 transition-colors"
//                       title="Edit"
//                     >
//                       <FaEdit size={16} />
//                     </button>

//                     {/* Delete button */}
//                     <button
//                       onClick={() => handleDelete(ticket.id)}
//                       className="text-red-500 dark:text-red-400 hover:text-red-600 
//                                  dark:hover:text-red-300 transition-colors"
//                       title="Delete"
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
//         <div className="flex flex-col md:flex-row justify-between items-center p-3 gap-2 text-sm">
//           <div>
//             Showing {paginatedTickets.length} of {filteredTickets.length} entries
//           </div>
//           <div className="flex items-center space-x-1">
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i}
//                 className={`px-3 py-1 rounded border transition-colors ${
//                   currentPage === i + 1
//                     ? "bg-blue-600 text-white border-blue-600"
//                     : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
//                 }`}
//                 onClick={() => handlePageChange(i + 1)}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* View Ticket Modal */}
//       <TicketViewModal
//         isOpen={isViewModalOpen}
//         onClose={() => setIsViewModalOpen(false)}
//         ticket={selectedTicket}
//       />

//       {/* Modal for Raise/Edit Ticket */}
//       <TicketFormModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         mode={modalMode}
//         initialData={selectedTicket}
//         onSubmit={handleFormSubmit}
//       />

//       {/* Comment Modal */}
//       <CommentModal
//         isOpen={isCommentModalOpen}
//         onClose={() => setIsCommentModalOpen(false)}
//         ticket={selectedTicket}
//         comments={comments}
//         onAddComment={handleAddComment}
//       />
//     </div>
//   );
// }

// src/components/TicketsPage.jsx

// import React, { useState, useEffect, useMemo } from "react";
// import { motion } from "framer-motion";
// import { FaEye, FaEdit, FaTrash, FaPrint, FaFilePdf, FaComment } from "react-icons/fa";
// import { MdOutlineFileDownload } from "react-icons/md";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { toast } from "react-hot-toast";

// // Our custom modals & dialogs
// import TicketFormModal from "./TicketFormModal";
// import CommentModal from "./CommentModal";
// import TicketViewModal from "./TicketViewModal";
// import ConfirmationDialog from "../common/ConfirmationDialog";

// // Zustand stores
// import useIssuesStore from "../../store/useIssuesStore";
// import useDepartmentStore from "../../store/departmentStore";

// export default function TicketsPage() {
//   // ---------- Issues Store ----------
//   const {
//     issues,
//     fetchDeptIssues,  // loads the department issues from backend
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
//     fetchDeptIssues();
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
//       className=" mx-auto px-4  
//                  bg-gray-50 dark:bg-gray-900
//                  text-gray-800 dark:text-gray-100
//                   transition-colors "
//     >
//       <h1 className="text-2xl font-bold">Employess Tickets</h1>

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


// TicketsPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEdit, FaTrash, FaPrint, FaFilePdf, FaComment } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-hot-toast";

// Our custom modals & dialogs
import TicketFormModal from "./TicketFormModal";
// import CommentModal from "./CommentModal";  // <-- Remove this
// import TicketViewModal from "./TicketViewModal"; // <-- We'll replace with a single unified modal
import TicketDetailsModal from "./TicketDetailsModal"; // <-- The new merged modal
import ConfirmationDialog from "../common/ConfirmationDialog";

// Zustand stores
import useIssuesStore from "../../store/useIssuesStore";
// import useDepartmentStore from "../../store/departmentStore";

export default function TicketsPage() {
  // ---------- Issues Store ----------
  const {
    issues,
    fetchDeptIssues,
    createIssue,
    editIssue,
    removeIssue,
    fetchComments,
    postComment,
    loading,
    // comments,         // You can read directly from the store in TicketDetailsModal, or pass them as props
    // isCommentLoading, // likewise
  } = useIssuesStore();

  // ---------- Local UI State ----------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // "create" or "edit"
  const [selectedIssue, setSelectedIssue] = useState(null);

  // For the new combined "Details + Comments" modal
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // For ConfirmationDialog
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(() => {});

  // Filters
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [department, setDepartment] = useState("All");
  const [status, setStatus] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // ---------- Lifecycle ----------
  useEffect(() => {
    fetchDeptIssues();
  }, [fetchDeptIssues]);

  // ---------- Handlers ----------
  const handleRaiseTicket = () => {
    setModalMode("create");
    setSelectedIssue(null);
    setIsModalOpen(true);
  };

  // Replace handleView & handleComment with a single method
  const handleViewDetails = async (issue) => {
    setSelectedIssue(issue);
    // Fetch comments for the selected issue
    await fetchComments(issue._id);
    // Now open the unified details+comments modal
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

  // If you want to add new comment from the new combined modal,
  // you can do it in that modal itself (calling `postComment`).
  // Or you can keep a handler here and pass it down:
  const handleAddComment = async (commentText) => {
    if (!selectedIssue) return;
    await postComment(selectedIssue._id, commentText);
  };

  // ---------- Filtering & Pagination ----------
  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      // Search filter
      if (searchText) {
        const matchTitle = issue.issueTitle?.toLowerCase().includes(searchText.toLowerCase());
        const matchEmployeeId = issue.createdBy?.employee_Id
          ?.toLowerCase()
          .includes(searchText.toLowerCase());
        if (!matchTitle && !matchEmployeeId) return false;
      }
      // Department filter
      if (department !== "All" && issue.assignedTo !== department) {
        return false;
      }
      // Status filter
      if (status !== "All" && issue.issueStatus !== status) {
        return false;
      }
      // Priority filter
      if (priorityFilter !== "All" && issue.priority !== priorityFilter) {
        return false;
      }
      // Date filter
      if (selectedDate) {
        const issueDate = new Date(issue.createdAt).setHours(0, 0, 0, 0);
        const filterDate = selectedDate.setHours(0, 0, 0, 0);
        if (issueDate !== filterDate) return false;
      }
      return true;
    });
  }, [issues, searchText, department, status, priorityFilter, selectedDate]);

  const totalPages = Math.ceil(filteredIssues.length / pageSize);
  const paginatedIssues = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredIssues.slice(startIndex, startIndex + pageSize);
  }, [filteredIssues, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Animation variants (optional)
  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  // ---------- Render ----------
  return (
    <div
      className=" mx-auto px-4  
                 bg-gray-50 dark:bg-gray-900
                 text-gray-800 dark:text-gray-100
                  transition-colors "
    >
      <h1 className="text-2xl font-bold">Employees Tickets</h1>

      {/* Top Toolbar */}
      <motion.div
        className="flex flex-wrap items-center justify-between gap-4
                   bg-white dark:bg-gray-800 
                   p-4 rounded-md shadow
                   transition-colors mb-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left: Page size & Search */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Page size */}
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

        {/* Middle: date, priority, status, export icons */}
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

          {/* Priority Filter */}
          <select
            className="border rounded px-2 py-1 text-sm
                       bg-white dark:bg-gray-700
                       text-gray-700 dark:text-gray-100
                       focus:outline-none"
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

          {/* Status Filter */}
          <select
            className="border rounded px-2 py-1 text-sm
                       bg-white dark:bg-gray-700
                       text-gray-700 dark:text-gray-100
                       focus:outline-none"
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

          {/* Export Icons */}
          <div className="flex items-center gap-4 text-gray-500 dark:text-gray-300">
            <button className="hover:text-gray-700 dark:hover:text-gray-100 transition-colors" title="Print">
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

      {/* Table of Issues */}
      <div className="bg-white dark:bg-gray-800 
                      rounded-md shadow 
                      overflow-x-auto transition-colors ">
        {loading ? (
          <div className="p-4">Loading issues...</div>
        ) : (
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

                // Priority pill classes
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

                // Status pill classes
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
                  <tr
                    key={issue._id}
                    className="border-b last:border-b-0 
                               border-gray-200 dark:border-gray-700 
                               hover:bg-gray-50 dark:hover:bg-gray-600
                               transition-colors"
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

                    {/* Priority */}
                    <td className="p-3 text-sm">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-md ${priorityClasses}`}
                      >
                        {issue.priority}
                      </span>
                    </td>

                    {/* Status */}
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
                      {/* Combined View+Comment Button */}
                      <button
                        className="text-blue-500 dark:text-blue-400 hover:text-blue-600 
                                   dark:hover:text-blue-300 transition-colors"
                        title="View & Comment"
                        onClick={() => handleViewDetails(issue)}
                      >
                        <FaEye size={16} />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => handleEdit(issue)}
                        className="text-green-500 dark:text-green-400 hover:text-green-600 
                                   dark:hover:text-green-300 transition-colors"
                        title="Edit"
                      >
                        <FaEdit size={16} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(issue)}
                        className="text-red-500 dark:text-red-400 hover:text-red-600 
                                   dark:hover:text-red-300 transition-colors"
                        title="Delete"
                      >
                        <FaTrash size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {!loading && filteredIssues.length > 0 && (
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

        {/* If no issues match filters */}
        {!loading && filteredIssues.length === 0 && (
          <div className="p-4 text-sm text-center text-gray-500 dark:text-gray-400">
            No matching records found
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={confirmOpen}
        title={confirmTitle}
        message={confirmMessage}
        onConfirm={confirmAction}
        onCancel={() => setConfirmOpen(false)}
      />

      {/* Create/Edit Modal */}
      <TicketFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        initialData={selectedIssue}
        onSubmit={handleFormSubmit}
      />

      {/* Combined Ticket Details + Comment Modal */}
      <TicketDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        ticket={selectedIssue}
        onAddComment={handleAddComment}
      />
    </div>
  );
}

