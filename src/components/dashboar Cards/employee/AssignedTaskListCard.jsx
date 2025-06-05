// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import {
//   FiTrash2,
//   FiEdit,
//   FiPlus,
//   FiChevronLeft,
//   FiChevronRight,
// } from "react-icons/fi";
// import toast from "react-hot-toast";

// // Import your API service functions
// import {
//   getTasks,
//   createTask,
//   updateTask,
//   deleteTask,
//   updateTaskStatus,
// } from "../../../service/todoService";

// // Map priority to CSS background colors
// const priorityColors = {
//   High: "bg-red-500",
//   Medium: "bg-yellow-500",
//   Low: "bg-green-500",
// };

// const AssignedTaskListCard = () => {
//   // -------------------
//   // STATES
//   // -------------------
//   const [tasks, setTasks] = useState([]);

//   // New Task Form Fields
//   const [newTitle, setNewTitle] = useState("");
//   const [newDeadline, setNewDeadline] = useState("");
//   const [newPriority, setNewPriority] = useState("Medium");
//   const [newStatus, setNewStatus] = useState("Not Started");

//   // For editing an existing task
//   const [editId, setEditId] = useState(null);

//   // Date filter & pagination
//   const [filterDate, setFilterDate] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   // -------------------
//   // USE EFFECT
//   // -------------------
//   useEffect(() => {
//     fetchTasks();
//   }, [filterDate]);

//   // -------------------
//   // API CALLS
//   // -------------------
//   const fetchTasks = async () => {
//     try {
//       const response = await getTasks(filterDate);
//       if (response?.success) {
//         setTasks(response.data);
//       } else {
//         toast.error(response.message || "Failed to fetch tasks");
//       }
//     } catch (error) {
//       toast.error("Failed to fetch tasks");
//     }
//   };

//   const handleAddTask = async () => {
//     // Basic validation
//     if (!newTitle.trim() || !newDeadline.trim()) return;

//     // Prepare data for backend
//     const taskData = {
//       title: newTitle,
//       deadline: newDeadline, // "YYYY-MM-DDTHH:mm" from datetime-local input
//       priority: newPriority,
//       status: newStatus,
//     };

//     try {
//       const response = await createTask(taskData);
//       if (response?.success) {
//         toast.success("Task added successfully!");
//         fetchTasks();
//         resetForm();
//       } else {
//         toast.error(response?.message || "Error creating task.");
//       }
//     } catch (error) {
//       toast.error("Error creating task.");
//     }
//   };

//   const handleEditTask = (task) => {
//     // Save task ID and pre-fill form fields
//     setEditId(task._id);
//     setNewTitle(task.title);
//     setNewDeadline(task.deadline); // e.g. "2025-03-19 22:58" (we'll adjust input format below)
//     setNewPriority(task.priority);
//     setNewStatus(task.status);
//   };

//   const handleUpdateTask = async () => {
//     if (!editId || !newTitle.trim() || !newDeadline.trim()) return;

//     const updatedData = {
//       title: newTitle,
//       deadline: newDeadline,
//       priority: newPriority,
//       status: newStatus,
//     };

//     try {
//       const response = await updateTask(editId, updatedData);
//       if (response?.success) {
//         toast.success("Task updated successfully!");
//         fetchTasks();
//         resetForm();
//       } else {
//         toast.error(response?.message || "Failed to update task.");
//       }
//     } catch (error) {
//       toast.error("Failed to update task.");
//     }
//   };

//   const handleDeleteTask = async (id) => {
//     try {
//       const response = await deleteTask(id);
//       if (response?.success) {
//         toast.success("Task deleted successfully!");
//         fetchTasks();
//       } else {
//         toast.error(response?.message || "Failed to delete task.");
//       }
//     } catch (error) {
//       toast.error("Failed to delete task.");
//     }
//   };

//   const handleCheckboxChange = async (id, currentStatus) => {
//     // This toggles the `isComplete` field
//     try {
//       await updateTaskStatus(id, { isComplete: !currentStatus });
//       toast.success("Task status updated!");
//       fetchTasks();
//     } catch (error) {
//       toast.error("Failed to update task status.");
//     }
//   };

//   // -------------------
//   // HELPERS
//   // -------------------
//   const resetForm = () => {
//     setEditId(null);
//     setNewTitle("");
//     setNewDeadline("");
//     setNewPriority("Medium");
//     setNewStatus("Not Started");
//   };

//   const isDisabled = !newTitle.trim() || !newDeadline.trim();

//   // Format "deadline" to match <input type="datetime-local">
//   const formatDeadlineToInput = (deadlineStr) => {
//     // If the deadline is stored as "2025-03-19 22:58" on the server,
//     // we need to convert it to "2025-03-19T22:58" for the datetime-local input.
//     // This is a simple approach assuming the string is always valid.
//     if (!deadlineStr.includes("T")) {
//       return deadlineStr.replace(" ", "T");
//     }
//     return deadlineStr;
//   };

//   // If user is editing an existing task, we format the deadline so it displays in the datetime-local input:
//   const editingDeadlineValue = editId
//     ? formatDeadlineToInput(newDeadline)
//     : newDeadline;

//   // -------------------
//   // PAGINATION
//   // -------------------
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentTasks = tasks.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(tasks.length / itemsPerPage);

//   // -------------------
//   // RENDER
//   // -------------------
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="w-full  mx-auto p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800"
//     >
//       {/* Title & Date Filter Side by Side */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-bold">📌 Daily To-Do List</h2>
//         <input
//           type="date"
//           value={filterDate}
//           onChange={(e) => setFilterDate(e.target.value)}
//           className="p-2 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
//         />
//       </div>

//       {/* Input Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-4">
//         {/* Title */}
//         <input
//           type="text"
//           placeholder="Task title..."
//           value={newTitle}
//           onChange={(e) => setNewTitle(e.target.value)}
//           className="p-2 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 w-full col-span-2"
//         />

//         {/* Deadline (Date & Time) */}
//         <input
//           type="datetime-local"
//           value={editingDeadlineValue}
//           onChange={(e) => setNewDeadline(e.target.value)}
//           className="p-2 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 w-full"
//         />

//         {/* Priority */}
//         <select
//           value={newPriority}
//           onChange={(e) => setNewPriority(e.target.value)}
//           className="p-2 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 w-full"
//         >
//           <option value="High">🔥 High</option>
//           <option value="Medium">⚡ Medium</option>
//           <option value="Low">✅ Low</option>
//         </select>

//         {/* Status */}
//         <select
//           value={newStatus}
//           onChange={(e) => setNewStatus(e.target.value)}
//           className="p-2 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 w-full"
//         >
//           <option value="Not Started">Not Started</option>
//           <option value="In Progress">In Progress</option>
//           <option value="Completed">Completed</option>
//         </select>

//         {/* Create/Update Button */}
//         <button
//           onClick={editId ? handleUpdateTask : handleAddTask}
//           disabled={isDisabled}
//           className={`p-2 rounded-md text-white transition w-full flex items-center justify-center ${
//             isDisabled
//               ? "bg-gray-400 cursor-not-allowed"
//               : editId
//               ? "bg-green-500 hover:bg-green-600"
//               : "bg-blue-500 hover:bg-blue-600"
//           }`}
//         >
//           {editId ? "Update" : <FiPlus size={20} />}
//         </button>
//       </div>

//       {/* Task List */}
//       <div className="divide-y divide-gray-200 dark:divide-gray-600">
//         {currentTasks.length === 0 ? (
//           <p className="text-center text-gray-500 dark:text-gray-400 py-4">
//             🎉 No tasks for this date!
//           </p>
//         ) : (
//           currentTasks.map((task, index) => (
//             <motion.div
//               key={task._id}
//               className="flex items-center py-3 space-x-3"
//             >
//               {/* isComplete checkbox */}
//               {/* <input
//                 type="checkbox"
//                 checked={task.isComplete}
//                 onChange={() => handleCheckboxChange(task._id, task.isComplete)}
//                 className="cursor-pointer"
//               /> */}

//               {/* Index */}
//               <span className="text-gray-500 dark:text-gray-400 w-6">
//                 {index + 1 + indexOfFirstItem}.
//               </span>

//               {/* Title */}
//               <span
//                 className={`text-lg flex-1 break-words ${
//                   task.isComplete ? "line-through text-gray-400" : ""
//                 }`}
//               >
//                 {task.title}
//               </span>

//               {/* Priority Label */}
//               <span
//                 className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${
//                   priorityColors[task.priority]
//                 }`}
//               >
//                 {task.priority}
//               </span>

//               {/* Deadline */}
//               <span className="text-sm text-gray-500 dark:text-gray-400">
//                 {task.deadline}
//               </span>

//               {/* Status */}
//               <span className="text-sm text-gray-700 dark:text-gray-300">
//                 {task.status}
//               </span>

//               {/* Edit & Delete Buttons */}
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => handleEditTask(task)}
//                   className="text-blue-500 hover:text-blue-700 transition"
//                 >
//                   <FiEdit size={18} />
//                 </button>
//                 <button
//                   onClick={() => handleDeleteTask(task._id)}
//                   className="text-red-500 hover:text-red-700 transition"
//                 >
//                   <FiTrash2 size={18} />
//                 </button>
//               </div>
//             </motion.div>
//           ))
//         )}
//       </div>

//       {/* Pagination Controls (Hide if fewer items than itemsPerPage) */}
//       {tasks.length > itemsPerPage && (
//         <div className="flex justify-center mt-4 space-x-4">
//           <button
//             onClick={() => setCurrentPage(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="p-2 bg-gray-300 rounded disabled:opacity-50"
//           >
//             <FiChevronLeft />
//           </button>
//           <span>
//             {currentPage} / {totalPages}
//           </span>
//           <button
//             onClick={() => setCurrentPage(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="p-2 bg-gray-300 rounded disabled:opacity-50"
//           >
//             <FiChevronRight />
//           </button>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// export default AssignedTaskListCard;

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   HiTrash,
//   HiPencilAlt,
//   HiPlus,
//   HiChevronLeft,
//   HiChevronRight,
//   HiCalendar,
//   HiClock,
//   HiFlag,
//   HiCheckCircle,
//   HiXCircle,
//   HiLightningBolt,
//   HiSparkles,
//   HiSearch,
//   HiFilter,
// } from "react-icons/hi";
// import {
//   RiRocketLine,
//   RiFireLine,
//   RiLeafLine,
//   RiStarLine,
// } from "react-icons/ri";

// // Mock API service functions for demo
// const mockApiDelay = () => new Promise(resolve => setTimeout(resolve, 500));

// const getTasks = async (filterDate) => {
//   await mockApiDelay();
//   return {
//     success: true,
//     data: [
//       {
//         _id: "1",
//         title: "Design new landing page",
//         deadline: "2025-05-29T14:30",
//         priority: "High",
//         status: "In Progress",
//         isComplete: false
//       },
//       {
//         _id: "2",
//         title: "Review project proposals",
//         deadline: "2025-05-29T16:00",
//         priority: "Medium",
//         status: "Not Started",
//         isComplete: false
//       },
//       {
//         _id: "3",
//         title: "Team standup meeting",
//         deadline: "2025-05-29T10:00",
//         priority: "Low",
//         status: "Completed",
//         isComplete: true
//       }
//     ]
//   };
// };

// const createTask = async (taskData) => {
//   await mockApiDelay();
//   return { success: true };
// };

// const updateTask = async (id, updatedData) => {
//   await mockApiDelay();
//   return { success: true };
// };

// const deleteTask = async (id) => {
//   await mockApiDelay();
//   return { success: true };
// };

// const updateTaskStatus = async (id, status) => {
//   await mockApiDelay();
//   return { success: true };
// };

// // Priority configurations with modern styling
// const priorityConfig = {
//   High: {
//     color: "from-red-500 to-pink-500",
//     icon: RiFireLine,
//     badge: "bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-400 border-red-500/30",
//     glow: "shadow-red-500/25"
//   },
//   Medium: {
//     color: "from-amber-500 to-orange-500",
//     icon: RiRocketLine,
//     badge: "bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30",
//     glow: "shadow-amber-500/25"
//   },
//   Low: {
//     color: "from-emerald-500 to-teal-500",
//     icon: RiLeafLine,
//     badge: "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
//     glow: "shadow-emerald-500/25"
//   },
// };

// const statusConfig = {
//   "Not Started": {
//     color: "text-slate-400 dark:text-slate-500",
//     bg: "bg-slate-100/50 dark:bg-slate-800/50",
//     icon: HiXCircle
//   },
//   "In Progress": {
//     color: "text-blue-500 dark:text-blue-400",
//     bg: "bg-blue-100/50 dark:bg-blue-900/30",
//     icon: HiLightningBolt
//   },
//   "Completed": {
//     color: "text-emerald-500 dark:text-emerald-400",
//     bg: "bg-emerald-100/50 dark:bg-emerald-900/30",
//     icon: HiCheckCircle
//   }
// };

// const AssignedTaskListCard = () => {
//   // States
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [newTitle, setNewTitle] = useState("");
//   const [newDeadline, setNewDeadline] = useState("");
//   const [newPriority, setNewPriority] = useState("Medium");
//   const [newStatus, setNewStatus] = useState("Not Started");
//   const [editId, setEditId] = useState(null);
//   const [filterDate, setFilterDate] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showFilters, setShowFilters] = useState(false);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     fetchTasks();
//   }, [filterDate]);

//   const fetchTasks = async () => {
//     setLoading(true);
//     try {
//       const response = await getTasks(filterDate);
//       if (response?.success) {
//         setTasks(response.data);
//       }
//     } catch (error) {
//       console.error("Failed to fetch tasks");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddTask = async () => {
//     if (!newTitle.trim() || !newDeadline.trim()) return;

//     const taskData = {
//       title: newTitle,
//       deadline: newDeadline,
//       priority: newPriority,
//       status: newStatus,
//     };

//     setLoading(true);
//     try {
//       const response = await createTask(taskData);
//       if (response?.success) {
//         fetchTasks();
//         resetForm();
//       }
//     } catch (error) {
//       console.error("Error creating task");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditTask = (task) => {
//     setEditId(task._id);
//     setNewTitle(task.title);
//     setNewDeadline(task.deadline.replace(" ", "T"));
//     setNewPriority(task.priority);
//     setNewStatus(task.status);
//   };

//   const handleUpdateTask = async () => {
//     if (!editId || !newTitle.trim() || !newDeadline.trim()) return;

//     const updatedData = {
//       title: newTitle,
//       deadline: newDeadline,
//       priority: newPriority,
//       status: newStatus,
//     };

//     setLoading(true);
//     try {
//       const response = await updateTask(editId, updatedData);
//       if (response?.success) {
//         fetchTasks();
//         resetForm();
//       }
//     } catch (error) {
//       console.error("Failed to update task");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteTask = async (id) => {
//     setLoading(true);
//     try {
//       const response = await deleteTask(id);
//       if (response?.success) {
//         fetchTasks();
//       }
//     } catch (error) {
//       console.error("Failed to delete task");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCheckboxChange = async (id, currentStatus) => {
//     try {
//       await updateTaskStatus(id, { isComplete: !currentStatus });
//       fetchTasks();
//     } catch (error) {
//       console.error("Failed to update task status");
//     }
//   };

//   const resetForm = () => {
//     setEditId(null);
//     setNewTitle("");
//     setNewDeadline("");
//     setNewPriority("Medium");
//     setNewStatus("Not Started");
//   };

//   const filteredTasks = tasks.filter(task =>
//     task.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentTasks = filteredTasks.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

//   const isDisabled = !newTitle.trim() || !newDeadline.trim() || loading;

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//       className="w-full max-w-7xl mx-auto p-8"
//     >
//       {/* Glassmorphism Container */}
//       <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-3xl border border-white/20 dark:border-gray-700/50 shadow-2xl shadow-black/10 dark:shadow-black/30">

//         {/* Header Section */}
//         <div className="p-8 border-b border-gray-200/50 dark:border-gray-700/50">
//           <motion.div
//             initial={{ y: -20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.2, duration: 0.5 }}
//             className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
//           >
//             {/* Title with Gradient */}
//             <div className="flex items-center gap-4">
//               <div className="p-3 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25">
//                 <HiSparkles className="w-8 h-8 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
//                   Task Universe
//                 </h1>
//                 <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your daily missions</p>
//               </div>
//             </div>

//             {/* Search and Filter Controls */}
//             <div className="flex items-center gap-4">
//               {/* Search Bar */}
//               <div className="relative">
//                 <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search tasks..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 pr-4 py-3 w-64 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all duration-300"
//                 />
//               </div>

//               {/* Filter Toggle */}
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setShowFilters(!showFilters)}
//                 className={`p-3 rounded-xl border transition-all duration-300 ${
//                   showFilters
//                     ? 'bg-violet-500 text-white border-violet-500 shadow-lg shadow-violet-500/25'
//                     : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
//                 }`}
//               >
//                 <HiFilter className="w-5 h-5" />
//               </motion.button>

//               {/* Date Filter */}
//               <div className="relative">
//                 <HiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="date"
//                   value={filterDate}
//                   onChange={(e) => setFilterDate(e.target.value)}
//                   className="pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all duration-300"
//                 />
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Task Creation Form */}
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.3, duration: 0.5 }}
//           className="p-8 bg-gradient-to-r from-violet-50/50 to-purple-50/50 dark:from-violet-900/10 dark:to-purple-900/10"
//         >
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
//             {/* Task Title */}
//             <div className="lg:col-span-4">
//               <input
//                 type="text"
//                 placeholder="What needs to be done?"
//                 value={newTitle}
//                 onChange={(e) => setNewTitle(e.target.value)}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all duration-300 placeholder-gray-500"
//               />
//             </div>

//             {/* Deadline */}
//             <div className="lg:col-span-3 relative">
//               <HiClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//               <input
//                 type="datetime-local"
//                 value={newDeadline}
//                 onChange={(e) => setNewDeadline(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all duration-300"
//               />
//             </div>

//             {/* Priority */}
//             <div className="lg:col-span-2">
//               <select
//                 value={newPriority}
//                 onChange={(e) => setNewPriority(e.target.value)}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all duration-300"
//               >
//                 <option value="High">🔥 High</option>
//                 <option value="Medium">⚡ Medium</option>
//                 <option value="Low">🌿 Low</option>
//               </select>
//             </div>

//             {/* Status */}
//             <div className="lg:col-span-2">
//               <select
//                 value={newStatus}
//                 onChange={(e) => setNewStatus(e.target.value)}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all duration-300"
//               >
//                 <option value="Not Started">Not Started</option>
//                 <option value="In Progress">In Progress</option>
//                 <option value="Completed">Completed</option>
//               </select>
//             </div>

//             {/* Action Button */}
//             <div className="lg:col-span-1">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={editId ? handleUpdateTask : handleAddTask}
//                 disabled={isDisabled}
//                 className={`w-full h-12 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center ${
//                   isDisabled
//                     ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
//                     : editId
//                     ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
//                     : "bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
//                 }`}
//               >
//                 {loading ? (
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 ) : editId ? (
//                   "Update"
//                 ) : (
//                   <HiPlus className="w-5 h-5" />
//                 )}
//               </motion.button>
//             </div>
//           </div>

//           {/* Cancel Edit Button */}
//           {editId && (
//             <motion.button
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               onClick={resetForm}
//               className="mt-4 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
//             >
//               Cancel editing
//             </motion.button>
//           )}
//         </motion.div>

//         {/* Task List */}
//         <div className="p-8">
//           <AnimatePresence mode="wait">
//             {loading ? (
//               <motion.div
//                 key="loading"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="flex items-center justify-center py-12"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
//                   <span className="text-gray-600 dark:text-gray-400">Loading tasks...</span>
//                 </div>
//               </motion.div>
//             ) : currentTasks.length === 0 ? (
//               <motion.div
//                 key="empty"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 className="text-center py-12"
//               >
//                 <div className="w-16 h-16 mx-auto mb-4 p-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
//                   <RiStarLine className="w-8 h-8 text-gray-400" />
//                 </div>
//                 <p className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">All caught up!</p>
//                 <p className="text-gray-500 dark:text-gray-500">No tasks for this date. Time to add some goals!</p>
//               </motion.div>
//             ) : (
//               <motion.div
//                 key="tasks"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="space-y-4"
//               >
//                 {currentTasks.map((task, index) => {
//                   const PriorityIcon = priorityConfig[task.priority].icon;
//                   const StatusIcon = statusConfig[task.status].icon;

//                   return (
//                     <motion.div
//                       key={task._id}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                       layout
//                       className={`group relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
//                         task.isComplete
//                           ? 'bg-gray-50/50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-700'
//                           : 'bg-white/70 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-600'
//                       } ${priorityConfig[task.priority].glow}`}
//                     >
//                       <div className="flex items-center gap-4">
//                         {/* Task Number */}
//                         <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-sm font-semibold text-gray-600 dark:text-gray-300">
//                           {index + 1 + indexOfFirstItem}
//                         </div>

//                         {/* Task Content */}
//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-center gap-3 mb-2">
//                             <h3 className={`text-lg font-semibold truncate ${
//                               task.isComplete
//                                 ? "line-through text-gray-400 dark:text-gray-500"
//                                 : "text-gray-900 dark:text-white"
//                             }`}>
//                               {task.title}
//                             </h3>

//                             {/* Priority Badge */}
//                             <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border ${priorityConfig[task.priority].badge}`}>
//                               <PriorityIcon className="w-3 h-3" />
//                               {task.priority}
//                             </span>
//                           </div>

//                           <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
//                             {/* Deadline */}
//                             <div className="flex items-center gap-1">
//                               <HiClock className="w-4 h-4" />
//                               {new Date(task.deadline).toLocaleDateString()} at {new Date(task.deadline).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
//                             </div>

//                             {/* Status */}
//                             <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${statusConfig[task.status].bg}`}>
//                               <StatusIcon className={`w-4 h-4 ${statusConfig[task.status].color}`} />
//                               <span className={statusConfig[task.status].color}>{task.status}</span>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Action Buttons */}
//                         <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                           <motion.button
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.9 }}
//                             onClick={() => handleEditTask(task)}
//                             className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-200"
//                           >
//                             <HiPencilAlt className="w-4 h-4" />
//                           </motion.button>

//                           <motion.button
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.9 }}
//                             onClick={() => handleDeleteTask(task._id)}
//                             className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors duration-200"
//                           >
//                             <HiTrash className="w-4 h-4" />
//                           </motion.button>
//                         </div>
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//               className="flex items-center justify-center gap-4 mt-8"
//             >
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setCurrentPage(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
//               >
//                 <HiChevronLeft className="w-5 h-5" />
//               </motion.button>

//               <div className="flex items-center gap-2">
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                   <motion.button
//                     key={page}
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => setCurrentPage(page)}
//                     className={`w-10 h-10 rounded-xl font-semibold transition-all duration-200 ${
//                       currentPage === page
//                         ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-500/25'
//                         : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
//                     }`}
//                   >
//                     {page}
//                   </motion.button>
//                 ))}
//               </div>

//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setCurrentPage(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
//               >
//                 <HiChevronRight className="w-5 h-5" />
//               </motion.button>
//             </motion.div>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default AssignedTaskListCard;

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   HiTrash,
//   HiPencilAlt,
//   HiPlus,
//   HiChevronLeft,
//   HiChevronRight,
//   HiCalendar,
//   HiClock,
//   HiCheckCircle,
//   HiXCircle,
//   HiLightningBolt,
//   HiSparkles,
//   HiSearch,
//   HiFilter,
// } from "react-icons/hi";
// import {
//   RiRocketLine,
//   RiFireLine,
//   RiLeafLine,
//   RiStarLine,
//   RiTaskLine,
//   RiProgress3Line,
//   RiCheckboxCircleLine,
// } from "react-icons/ri";

// // Priority configurations
// const priorityConfig = {
//   High: {
//     gradient: "from-red-500 via-pink-500 to-purple-600",
//     icon: RiFireLine,
//     badge:
//       "bg-gradient-to-r from-red-500/10 to-pink-500/10 text-red-400 border border-red-500/20",
//     glow: "shadow-lg shadow-red-500/20",
//     accent: "bg-red-500",
//   },
//   Medium: {
//     gradient: "from-amber-400 via-orange-500 to-red-500",
//     icon: RiRocketLine,
//     badge:
//       "bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-400 border border-amber-500/20",
//     glow: "shadow-lg shadow-amber-500/20",
//     accent: "bg-amber-500",
//   },
//   Low: {
//     gradient: "from-emerald-400 via-teal-500 to-cyan-500",
//     icon: RiLeafLine,
//     badge:
//       "bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-400 border border-emerald-500/20",
//     glow: "shadow-lg shadow-emerald-500/20",
//     accent: "bg-emerald-500",
//   },
// };

// // Status configurations
// const statusConfig = {
//   "Not Started": {
//     color: "text-slate-400",
//     bg: "bg-slate-500/10 border-slate-500/20",
//     icon: HiXCircle,
//     accent: "bg-slate-500",
//   },
//   "In Progress": {
//     color: "text-blue-400",
//     bg: "bg-blue-500/10 border-blue-500/20",
//     icon: HiLightningBolt,
//     accent: "bg-blue-500",
//   },
//   Completed: {
//     color: "text-emerald-400",
//     bg: "bg-emerald-500/10 border-emerald-500/20",
//     icon: HiCheckCircle,
//     accent: "bg-emerald-500",
//   },
// };

// const AssignedTaskListCard = ({
//   tasks = [],
//   loading = false,
//   onCreateTask,
//   onUpdateTask,
//   onDeleteTask,
//   onUpdateStatus,
//   onFilterChange,
// }) => {
//   const [newTitle, setNewTitle] = useState("");
//   const [newDeadline, setNewDeadline] = useState("");
//   const [newPriority, setNewPriority] = useState("Medium");
//   const [newStatus, setNewStatus] = useState("Not Started");
//   const [editId, setEditId] = useState(null);
//   const [filterDate, setFilterDate] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showFilters, setShowFilters] = useState(false);
//   const [isFormCollapsed, setIsFormCollapsed] = useState(false);

//   const itemsPerPage = 6;

//   const resetForm = () => {
//     setEditId(null);
//     setNewTitle("");
//     setNewDeadline("");
//     setNewPriority("Medium");
//     setNewStatus("Not Started");
//   };

//   const handleAddTask = async () => {
//     if (!newTitle.trim() || !newDeadline.trim()) return;
//     const taskData = {
//       title: newTitle,
//       deadline: newDeadline,
//       priority: newPriority,
//       status: newStatus,
//     };
//     if (onCreateTask) {
//       await onCreateTask(taskData);
//       resetForm();
//     }
//   };

//   const handleEditTask = (task) => {
//     setEditId(task._id);
//     setNewTitle(task.title);
//     setNewDeadline(new Date(task.deadline).toISOString().slice(0, 16));
//     setNewPriority(task.priority);
//     setNewStatus(task.status);
//     setIsFormCollapsed(false);
//   };

//   const handleUpdateTask = async () => {
//     if (!editId || !newTitle.trim() || !newDeadline.trim()) return;
//     const updatedData = {
//       title: newTitle,
//       deadline: newDeadline,
//       priority: newPriority,
//       status: newStatus,
//     };
//     if (onUpdateTask) {
//       await onUpdateTask(editId, updatedData);
//       resetForm();
//     }
//   };

//   const handleDeleteTask = async (id) => {
//     if (onDeleteTask) await onDeleteTask(id);
//   };

//   const handleCheckboxChange = async (id, currentStatus) => {
//     if (onUpdateStatus) {
//       await onUpdateStatus(id, { isComplete: !currentStatus });
//     }
//   };

//   const filteredTasks = tasks.filter((task) =>
//     task.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentTasks = filteredTasks.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

//   const isDisabled = !newTitle.trim() || !newDeadline.trim() || loading;

//   const statsData = [
//     {
//       label: "Total",
//       value: tasks.length,
//       icon: RiTaskLine,
//       color: "from-violet-500 to-purple-600",
//     },
//     {
//       label: "Active",
//       value: tasks.filter((t) => t.status === "In Progress").length,
//       icon: RiProgress3Line,
//       color: "from-blue-500 to-cyan-500",
//     },
//     {
//       label: "Complete",
//       value: tasks.filter((t) => t.isComplete).length,
//       icon: RiCheckboxCircleLine,
//       color: "from-emerald-500 to-teal-500",
//     },
//   ];

//   return (
//     <div className="w-full h-full">
//       {/* Your header, filters, task form, and task list JSX goes here */}
//       {/* Due to length constraints, you already provided and validated the JSX above */}
//       {/* Just make sure any element using `border-3` is changed to a valid class like `border-4` */}
//       {/* Example fix shown below */}

//       {/* Replace this line: */}
//       {/* <div className="w-6 h-6 border-3 border-violet-500 border-t-transparent rounded-full animate-spin" /> */}

//       {/* With this: */}
//       <div className="w-6 h-6 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />

//       {/* And apply pagination guards */}
//       {/* Example: */}
//       <button
//         onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
//         disabled={currentPage === 1}
//       >
//         Prev
//       </button>

//       <button
//         onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
//         disabled={currentPage === totalPages}
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default AssignedTaskListCard;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import {
  HiTrash,
  HiPencilAlt,
  HiPlus,
  HiChevronLeft,
  HiChevronRight,
  HiCalendar,
  HiClock,
  HiCheckCircle,
  HiXCircle,
  HiLightningBolt,
  HiSparkles,
  HiSearch,
  HiFilter,
} from "react-icons/hi";
import {
  RiRocketLine,
  RiFireLine,
  RiLeafLine,
  RiStarLine,
  RiTaskLine,
  RiProgress3Line,
  RiCheckboxCircleLine,
} from "react-icons/ri";

// Import your API service functions
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
} from "../../../service/todoService"; // Adjust path as needed

// Priority configurations
const priorityConfig = {
  High: {
    gradient: "from-red-500 via-pink-500 to-purple-600",
    icon: RiFireLine,
    badge:
      "bg-gradient-to-r from-red-500/10 to-pink-500/10 text-red-400 border border-red-500/20",
    glow: "shadow-lg shadow-red-500/20",
    accent: "bg-red-500",
  },
  Medium: {
    gradient: "from-amber-400 via-orange-500 to-red-500",
    icon: RiRocketLine,
    badge:
      "bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-400 border border-amber-500/20",
    glow: "shadow-lg shadow-amber-500/20",
    accent: "bg-amber-500",
  },
  Low: {
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    icon: RiLeafLine,
    badge:
      "bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-400 border border-emerald-500/20",
    glow: "shadow-lg shadow-emerald-500/20",
    accent: "bg-emerald-500",
  },
};

// Status configurations
const statusConfig = {
  "Not Started": {
    color: "text-slate-400",
    bg: "bg-slate-500/10 border-slate-500/20",
    icon: HiXCircle,
    accent: "bg-slate-500",
  },
  "In Progress": {
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    icon: HiLightningBolt,
    accent: "bg-blue-500",
  },
  Completed: {
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    icon: HiCheckCircle,
    accent: "bg-emerald-500",
  },
};

const AssignedTaskListCard = () => {
  // States
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form states
  const [newTitle, setNewTitle] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");
  const [newStatus, setNewStatus] = useState("Not Started");
  const [editId, setEditId] = useState(null);

  // Filters and pagination
  const [filterDate, setFilterDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const itemsPerPage = 6;

  // Fetch tasks on mount and whenever filterDate changes
  useEffect(() => {
    fetchTasks();
  }, [filterDate]);

  // API calls
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await getTasks(filterDate);
      if (response?.success) {
        setTasks(response.data);
      } else {
        toast.error(response.message || "Failed to fetch tasks");
      }
    } catch (error) {
      toast.error("Failed to fetch tasks");
    }
    setLoading(false);
  };

  const resetForm = () => {
    setEditId(null);
    setNewTitle("");
    setNewDeadline("");
    setNewPriority("Medium");
    setNewStatus("Not Started");
  };

  const handleAddTask = async () => {
    if (!newTitle.trim() || !newDeadline.trim()) return;

    const taskData = {
      title: newTitle,
      deadline: newDeadline,
      priority: newPriority,
      status: newStatus,
    };

    setLoading(true);
    try {
      const response = await createTask(taskData);
      if (response?.success) {
        toast.success("Task added successfully!");
        fetchTasks();
        resetForm();
      } else {
        toast.error(response?.message || "Error creating task.");
      }
    } catch (error) {
      toast.error("Error creating task.");
    }
    setLoading(false);
  };

  const handleEditTask = (task) => {
    setEditId(task._id);
    setNewTitle(task.title);
    setNewDeadline(
      task.deadline.includes("T")
        ? task.deadline
        : task.deadline.replace(" ", "T")
    );
    setNewPriority(task.priority);
    setNewStatus(task.status);
  };

  const handleUpdateTask = async () => {
    if (!editId || !newTitle.trim() || !newDeadline.trim()) return;

    const updatedData = {
      title: newTitle,
      deadline: newDeadline,
      priority: newPriority,
      status: newStatus,
    };

    setLoading(true);
    try {
      const response = await updateTask(editId, updatedData);
      if (response?.success) {
        toast.success("Task updated successfully!");
        fetchTasks();
        resetForm();
      } else {
        toast.error(response?.message || "Failed to update task.");
      }
    } catch (error) {
      toast.error("Failed to update task.");
    }
    setLoading(false);
  };

  const handleDeleteTask = async (id) => {
    setLoading(true);
    try {
      const response = await deleteTask(id);
      if (response?.success) {
        toast.success("Task deleted successfully!");
        fetchTasks();
      } else {
        toast.error(response?.message || "Failed to delete task.");
      }
    } catch (error) {
      toast.error("Failed to delete task.");
    }
    setLoading(false);
  };

  const handleCheckboxChange = async (id, currentStatus) => {
    setLoading(true);
    try {
      await updateTaskStatus(id, { isComplete: !currentStatus });
      toast.success("Task status updated!");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to update task status.");
    }
    setLoading(false);
  };

  // Filter tasks by search term
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

  const isDisabled = !newTitle.trim() || !newDeadline.trim() || loading;

  // Stats for header
  const statsData = [
    {
      label: "Total",
      value: tasks.length,
      icon: RiTaskLine,
      color: "from-violet-500 to-purple-600",
    },
    {
      label: "Active",
      value: tasks.filter((t) => t.status === "In Progress").length,
      icon: RiProgress3Line,
      color: "from-blue-500 to-cyan-500",
    },
  ];

  // Your original JSX here (unchanged except `loading` and handlers wired)
  return (
    <div className="w-full h-full">
      {/* Modern Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="h-full flex flex-col backdrop-blur-2xl bg-gradient-to-br from-slate-50/90 via-white/80 to-slate-100/90 dark:from-slate-900/90 dark:via-slate-800/80 dark:to-slate-900/90 rounded-3xl border border-white/30 dark:border-slate-700/50 shadow-2xl shadow-black/5 dark:shadow-black/20 overflow-hidden"
      >
        {/* Futuristic Header */}
        <div className="relative p-4 sm:p-6 border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-violet-500/5 via-purple-500/5 to-pink-500/5">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative z-10">
            {/* Title Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                  className="p-3 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25"
                >
                  <HiSparkles className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-900 via-violet-800 to-purple-800 dark:from-white dark:via-violet-200 dark:to-purple-200 bg-clip-text text-transparent">
                    Todo Command Center
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Mission Control Dashboard
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div
                className="flex gap-2 overflow-hidden pb-2 sm:pb-0
              
              "
              >
                {statsData.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur border border-white/30 dark:border-slate-700/50"
                    >
                      <div
                        className={`p-1.5 rounded-lg bg-gradient-to-r ${stat.color}`}
                      >
                        <Icon className="w-3 h-3 text-white" />
                      </div>
                      <div className="text-xs">
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {stat.value}
                        </div>
                        <div className="text-slate-500 dark:text-slate-400">
                          {stat.label}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3"></div>
          </div>
        </div>

        <AnimatePresence>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-gradient-to-r from-violet-50/30 via-purple-50/30 to-pink-50/30 dark:from-violet-950/30 dark:via-purple-950/30 dark:to-pink-950/30"
          >
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
                {/* Task Title */}
                <div className="sm:col-span-2 lg:col-span-4">
                  <input
                    type="text"
                    placeholder="Task objective..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 outline-none transition-all duration-300 text-sm placeholder-slate-500"
                  />
                </div>

                {/* Deadline */}
                <div className="sm:col-span-1 lg:col-span-3 relative">
                  <HiClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                  <input
                    type="datetime-local"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/80  focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 outline-none transition-all duration-300 text-sm "
                  />
                </div>

                {/* Priority */}
                <div className="sm:col-span-1 lg:col-span-2">
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 outline-none transition-all duration-300 text-sm"
                  >
                    <option value="High">Critical</option>
                    <option value="Medium">Standard</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                {/* Status */}
                <div className="sm:col-span-1 lg:col-span-2">
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 outline-none transition-all duration-300 text-sm"
                  >
                    <option value="Not Started">Pending</option>
                    <option value="In Progress">Active</option>
                    <option value="Completed">Complete</option>
                  </select>
                </div>

                {/* Action Button */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={editId ? handleUpdateTask : handleAddTask}
                    disabled={isDisabled}
                    className={`w-full h-10 rounded-xl font-medium transition-all duration-300 flex items-center justify-center text-sm ${
                      isDisabled
                        ? "bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed"
                        : editId
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
                        : "bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
                    }`}
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    ) : editId ? (
                      "Update"
                    ) : (
                      <HiPlus className="w-4 h-4" />
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Cancel Edit Button */}
              {editId && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={resetForm}
                  className="mt-3 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors duration-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel editing
                </motion.button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Task List Container */}
        <div className="flex-1  ">
          <div
            className="h-[500px] overflow-y-auto p-4 sm:p-6 
          
             [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
                transition-colors duration-300
          "
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center py-12"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-slate-600 dark:text-slate-400 text-sm">
                      Loading missions...
                    </span>
                  </div>
                </motion.div>
              ) : currentTasks.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 mx-auto mb-4 p-4 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
                    <RiStarLine className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-2">
                    Mission Clear!
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-500">
                    No active missions. Ready for new objectives!
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="tasks"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  {currentTasks.map((task, index) => {
                    const PriorityIcon =
                      priorityConfig[task.priority]?.icon || RiLeafLine;
                    const StatusIcon =
                      statusConfig[task.status]?.icon || HiXCircle;

                    return (
                      <motion.div
                        key={task._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        layout
                        className={`group relative p-4 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                          task.isComplete
                            ? "bg-slate-50/50 dark:bg-slate-800/30 border-slate-200/50 dark:border-slate-700/50"
                            : "bg-white/70 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50 hover:border-violet-300/50 dark:hover:border-violet-600/50"
                        } ${priorityConfig[task.priority]?.glow || ""}`}
                      >
                        {/* Priority Accent Line */}
                        <div
                          className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${
                            priorityConfig[task.priority]?.accent ||
                            "bg-emerald-500"
                          }`}
                        ></div>

                        <div className="flex items-start gap-3">
                          {/* Task Number & Priority Icon */}
                          <div className="flex-shrink-0 flex flex-col items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">
                              {index + 1 + indexOfFirstItem}
                            </div>
                          </div>

                          {/* Task Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                              <h3
                                className={`text-base font-semibold leading-tight ${
                                  task.isComplete
                                    ? "line-through text-slate-400 dark:text-slate-500"
                                    : "text-slate-900 dark:text-white"
                                }`}
                              >
                                {task.title}
                              </h3>

                              {/* Priority & Status Badges */}
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <span
                                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
                                    priorityConfig[task.priority]?.badge || ""
                                  }`}
                                >
                                  <PriorityIcon className="w-3 h-3" />
                                  {task.priority}
                                </span>

                                <span
                                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border ${
                                    statusConfig[task.status]?.bg || ""
                                  }`}
                                >
                                  <div
                                    className={`w-2 h-2 rounded-full ${
                                      statusConfig[task.status]?.accent || ""
                                    }`}
                                  ></div>
                                  {task.status}
                                </span>
                              </div>
                            </div>

                            {/* Task Meta Info */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-slate-600 dark:text-slate-400 mb-3">
                              <div className="flex items-center gap-1">
                                <HiClock className="w-3 h-3" />
                                <span>
                                  {new Date(task.deadline).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "short",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}
                                </span>
                              </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mb-3">
                              <div
                                className={`h-1.5 rounded-full bg-gradient-to-r ${
                                  priorityConfig[task.priority]?.gradient || ""
                                } transition-all duration-500`}
                                style={{
                                  width:
                                    task.status === "Completed"
                                      ? "100%"
                                      : task.status === "In Progress"
                                      ? "60%"
                                      : "10%",
                                }}
                              ></div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex-shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleEditTask(task)}
                              className="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors duration-200"
                            >
                              <HiPencilAlt className="w-4 h-4" />
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDeleteTask(task._id)}
                              className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors duration-200"
                            >
                              <HiTrash className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 sm:p-6 pt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-2"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200"
              >
                <HiChevronLeft className="w-4 h-4" />
              </motion.button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <motion.button
                      key={page}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-xl font-semibold text-sm transition-all duration-200 ${
                        currentPage === page
                          ? "bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-500/25"
                          : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                      }`}
                    >
                      {page}
                    </motion.button>
                  )
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200"
              >
                <HiChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AssignedTaskListCard;
