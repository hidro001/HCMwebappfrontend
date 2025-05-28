

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



import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiTrash,
  HiPencilAlt,
  HiPlus,
  HiChevronLeft,
  HiChevronRight,
  HiCalendar,
  HiClock,
  HiFlag,
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
} from "react-icons/ri";

// Mock API service functions for demo
const mockApiDelay = () => new Promise(resolve => setTimeout(resolve, 500));

const getTasks = async (filterDate) => {
  await mockApiDelay();
  return {
    success: true,
    data: [
      {
        _id: "1",
        title: "Design new landing page",
        deadline: "2025-05-29T14:30",
        priority: "High",
        status: "In Progress",
        isComplete: false
      },
      {
        _id: "2", 
        title: "Review project proposals",
        deadline: "2025-05-29T16:00",
        priority: "Medium",
        status: "Not Started",
        isComplete: false
      },
      {
        _id: "3",
        title: "Team standup meeting",
        deadline: "2025-05-29T10:00",
        priority: "Low",
        status: "Completed",
        isComplete: true
      }
    ]
  };
};

const createTask = async (taskData) => {
  await mockApiDelay();
  return { success: true };
};

const updateTask = async (id, updatedData) => {
  await mockApiDelay();
  return { success: true };
};

const deleteTask = async (id) => {
  await mockApiDelay();
  return { success: true };
};

const updateTaskStatus = async (id, status) => {
  await mockApiDelay();
  return { success: true };
};

// Priority configurations with modern styling
const priorityConfig = {
  High: {
    color: "from-red-500 to-pink-500",
    icon: RiFireLine,
    badge: "bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-400 border-red-500/30",
    glow: "shadow-red-500/25"
  },
  Medium: {
    color: "from-amber-500 to-orange-500",
    icon: RiRocketLine,
    badge: "bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30",
    glow: "shadow-amber-500/25"
  },
  Low: {
    color: "from-emerald-500 to-teal-500",
    icon: RiLeafLine,
    badge: "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
    glow: "shadow-emerald-500/25"
  },
};

const statusConfig = {
  "Not Started": {
    color: "text-slate-400 dark:text-slate-500",
    bg: "bg-slate-100/50 dark:bg-slate-800/50",
    icon: HiXCircle
  },
  "In Progress": {
    color: "text-blue-500 dark:text-blue-400",
    bg: "bg-blue-100/50 dark:bg-blue-900/30",
    icon: HiLightningBolt
  },
  "Completed": {
    color: "text-emerald-500 dark:text-emerald-400",
    bg: "bg-emerald-100/50 dark:bg-emerald-900/30",
    icon: HiCheckCircle
  }
};

const AssignedTaskListCard = () => {
  // States
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");
  const [newStatus, setNewStatus] = useState("Not Started");
  const [editId, setEditId] = useState(null);
  const [filterDate, setFilterDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchTasks();
  }, [filterDate]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await getTasks(filterDate);
      if (response?.success) {
        setTasks(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
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
        fetchTasks();
        resetForm();
      }
    } catch (error) {
      console.error("Error creating task");
    } finally {
      setLoading(false);
    }
  };

  const handleEditTask = (task) => {
    setEditId(task._id);
    setNewTitle(task.title);
    setNewDeadline(task.deadline.replace(" ", "T"));
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
        fetchTasks();
        resetForm();
      }
    } catch (error) {
      console.error("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    setLoading(true);
    try {
      const response = await deleteTask(id);
      if (response?.success) {
        fetchTasks();
      }
    } catch (error) {
      console.error("Failed to delete task");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = async (id, currentStatus) => {
    try {
      await updateTaskStatus(id, { isComplete: !currentStatus });
      fetchTasks();
    } catch (error) {
      console.error("Failed to update task status");
    }
  };

  const resetForm = () => {
    setEditId(null);
    setNewTitle("");
    setNewDeadline("");
    setNewPriority("Medium");
    setNewStatus("Not Started");
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

  const isDisabled = !newTitle.trim() || !newDeadline.trim() || loading;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-7xl mx-auto p-8"
    >
      {/* Glassmorphism Container */}
      <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-3xl border border-white/20 dark:border-gray-700/50 shadow-2xl shadow-black/10 dark:shadow-black/30">
        
        {/* Header Section */}
        <div className="p-8 border-b border-gray-200/50 dark:border-gray-700/50">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
          >
            {/* Title with Gradient */}
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25">
                <HiSparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Task Universe
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your daily missions</p>
              </div>
            </div>

            {/* Search and Filter Controls */}
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative">
                <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 w-64 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all duration-300"
                />
              </div>

              {/* Filter Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`p-3 rounded-xl border transition-all duration-300 ${
                  showFilters 
                    ? 'bg-violet-500 text-white border-violet-500 shadow-lg shadow-violet-500/25' 
                    : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                <HiFilter className="w-5 h-5" />
              </motion.button>

              {/* Date Filter */}
              <div className="relative">
                <HiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all duration-300"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Task Creation Form */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="p-8 bg-gradient-to-r from-violet-50/50 to-purple-50/50 dark:from-violet-900/10 dark:to-purple-900/10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Task Title */}
            <div className="lg:col-span-4">
              <input
                type="text"
                placeholder="What needs to be done?"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all duration-300 placeholder-gray-500"
              />
            </div>

            {/* Deadline */}
            <div className="lg:col-span-3 relative">
              <HiClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <input
                type="datetime-local"
                value={newDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all duration-300"
              />
            </div>

            {/* Priority */}
            <div className="lg:col-span-2">
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all duration-300"
              >
                <option value="High">🔥 High</option>
                <option value="Medium">⚡ Medium</option>
                <option value="Low">🌿 Low</option>
              </select>
            </div>

            {/* Status */}
            <div className="lg:col-span-2">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all duration-300"
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Action Button */}
            <div className="lg:col-span-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={editId ? handleUpdateTask : handleAddTask}
                disabled={isDisabled}
                className={`w-full h-12 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center ${
                  isDisabled
                    ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                    : editId
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
                    : "bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
                }`}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : editId ? (
                  "Update"
                ) : (
                  <HiPlus className="w-5 h-5" />
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
              className="mt-4 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
            >
              Cancel editing
            </motion.button>
          )}
        </motion.div>

        {/* Task List */}
        <div className="p-8">
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
                  <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-gray-600 dark:text-gray-400">Loading tasks...</span>
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
                <div className="w-16 h-16 mx-auto mb-4 p-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                  <RiStarLine className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">All caught up!</p>
                <p className="text-gray-500 dark:text-gray-500">No tasks for this date. Time to add some goals!</p>
              </motion.div>
            ) : (
              <motion.div
                key="tasks"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {currentTasks.map((task, index) => {
                  const PriorityIcon = priorityConfig[task.priority].icon;
                  const StatusIcon = statusConfig[task.status].icon;
                  
                  return (
                    <motion.div
                      key={task._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      layout
                      className={`group relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                        task.isComplete 
                          ? 'bg-gray-50/50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-700' 
                          : 'bg-white/70 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-600'
                      } ${priorityConfig[task.priority].glow}`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Task Number */}
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-sm font-semibold text-gray-600 dark:text-gray-300">
                          {index + 1 + indexOfFirstItem}
                        </div>

                        {/* Task Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className={`text-lg font-semibold truncate ${
                              task.isComplete 
                                ? "line-through text-gray-400 dark:text-gray-500" 
                                : "text-gray-900 dark:text-white"
                            }`}>
                              {task.title}
                            </h3>
                            
                            {/* Priority Badge */}
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border ${priorityConfig[task.priority].badge}`}>
                              <PriorityIcon className="w-3 h-3" />
                              {task.priority}
                            </span>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            {/* Deadline */}
                            <div className="flex items-center gap-1">
                              <HiClock className="w-4 h-4" />
                              {new Date(task.deadline).toLocaleDateString()} at {new Date(task.deadline).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>

                            {/* Status */}
                            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${statusConfig[task.status].bg}`}>
                              <StatusIcon className={`w-4 h-4 ${statusConfig[task.status].color}`} />
                              <span className={statusConfig[task.status].color}>{task.status}</span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEditTask(task)}
                            className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-200"
                          >
                            <HiPencilAlt className="w-4 h-4" />
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeleteTask(task._id)}
                            className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors duration-200"
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

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-4 mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <HiChevronLeft className="w-5 h-5" />
              </motion.button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <motion.button
                    key={page}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-xl font-semibold transition-all duration-200 ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-500/25'
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {page}
                  </motion.button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <HiChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AssignedTaskListCard;