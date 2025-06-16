// import { useState, useEffect, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   addTask,
//   fetchAllTasks,
//   deleteTask,
//   updateTaskdaily,
// } from "../../../service/taskService";
// import { toast } from "react-hot-toast";
// import {
//   FiPlus,
//   FiTrash2,
//   FiEdit2,
//   FiCalendar,
//   FiX,
//   FiChevronLeft,
//   FiChevronRight,
//   FiCheck,
//   FiList,
//   FiRefreshCw,
//   FiAlertCircle,
//   FiSearch,
// } from "react-icons/fi";
// import TaskModal from "./TaskModal";

// export default function UpdateTask() {
//   /* ---------- state ---------- */
//   const todayString = new Date().toISOString().substring(0, 10);

//   const [taskList, setTaskList] = useState([""]);
//   const [taskDate, setTaskDate] = useState("");

//   const [fetchedTasks, setFetchedTasks] = useState([]);
//   const [filteredTasks, setFilteredTasks] = useState([]);

//   const [filterDate, setFilterDate] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [loadingId, setLoadingId] = useState(null);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [manualPage, setManualPage] = useState(1);
//   const tasksPerPage = 10;

//   const [editMode, setEditMode] = useState(false);
//   const [editTaskId, setEditTaskId] = useState(null);

//   /* ---------- fetch ---------- */
//   const fetchTasks = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await fetchAllTasks();
//       if (res?.success) setFetchedTasks(res.data);
//       else toast.error(res?.message || "Failed to fetch tasks.");
//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong fetching tasks.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchTasks();
//   }, [fetchTasks]);

//   /* ---------- filter ---------- */
//   useEffect(() => {
//     let list = fetchedTasks;
//     if (filterDate) list = list.filter((t) => t.task_Date === filterDate);
//     if (searchTerm)
//       list = list.filter((t) =>
//         t.task.some((x) =>
//           x.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     setFilteredTasks(list);
//     setCurrentPage(1);
//     setManualPage(1);
//   }, [fetchedTasks, filterDate, searchTerm]);

//   /* ---------- pagination ---------- */
//   const indexOfLastTask = currentPage * tasksPerPage;
//   const indexOfFirstTask = indexOfLastTask - tasksPerPage;
//   const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
//   const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
//   const totalItems = filteredTasks.length;
//   const startIndex = indexOfFirstTask;

//   const goToPage = (p) => {
//     if (p < 1 || p > totalPages) return;
//     setCurrentPage(p);
//     setManualPage(p);
//   };

//   /* ---------- modal handlers ---------- */
//   const openAddTaskModal = () => {
//     setTaskList([""]);
//     setTaskDate(todayString);
//     setEditMode(false);
//     setEditTaskId(null);
//     setIsModalOpen(true);
//   };

//   const handleCancelEdit = () => {
//     setTaskList([""]);
//     setTaskDate("");
//     setEditMode(false);
//     setEditTaskId(null);
//     setIsModalOpen(false);
//     toast("Task operation cancelled", {
//       icon: "🔄",
//       style: { borderRadius: "12px", background: "#333", color: "#fff" },
//     });
//   };

//   const handleAddTaskInput = () => setTaskList((prev) => [...prev, ""]);
//   const handleDeleteTaskInput = (idx) =>
//     setTaskList((prev) => prev.filter((_, i) => i !== idx));
//   const handleChange = (idx, val) =>
//     setTaskList((prev) => prev.map((t, i) => (i === idx ? val : t)));

//   /* ---------- submit ---------- */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const nonEmpty = taskList.filter((t) => t.trim().length);
//     if (!nonEmpty.length) return toast.error("Please enter at least one task.");
//     if (!taskDate) return toast.error("Please select a date for this task.");

//     const payload = { task: nonEmpty, task_Date: taskDate };
//     setLoading(true);
//     try {
//       const res = editMode
//         ? await updateTaskdaily(editTaskId, payload)
//         : await addTask(payload);
//       if (res?.success) {
//         toast.success(res.message || "Operation successful!");
//         setTaskList([""]);
//         setTaskDate("");
//         setEditMode(false);
//         setEditTaskId(null);
//         setIsModalOpen(false);
//         fetchTasks();
//       } else toast.error(res?.message || "Operation failed.");
//     } catch (err) {
//       console.error(err);
//       toast.error("Submission failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------- delete ---------- */
//   const handleDeleteTask = async (id) => {
//     setLoadingId(id);
//     try {
//       const res = await deleteTask(id);
//       if (res?.success) {
//         toast.success(res.message || "Task deleted!");
//         fetchTasks();
//       } else toast.error(res?.message || "Delete failed.");
//     } catch (err) {
//       console.error(err);
//       toast.error("Delete failed. Please try again.");
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   /* ---------- edit ---------- */
//   const handleUpdateClick = (item) => {
//     setTaskList(item.task);
//     setTaskDate(item.task_Date || todayString);
//     setEditTaskId(item._id);
//     setEditMode(true);
//     setIsModalOpen(true);
//   };

//   const clearFilters = () => {
//     setFilterDate("");
//     setSearchTerm("");
//   };

//   /* ---------- UI ---------- */
//   return (
//     <div className="bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 transition-all duration-300">
//       {/* HEADER */}
//       <div className="bg-white/90 dark:bg-gray-950/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 shadow-sm">
//         <div className="mx-auto py-4 px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="bg-gradient-to-br from-indigo-500 to-violet-500 rounded-lg p-2 shadow-lg">
//                 <FiList className="h-6 w-6 text-white" />
//               </div>
//               <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
//                 Daily Task Manager
//               </h1>
//             </div>
//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={fetchTasks}
//                 className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-indigo-600 dark:text-indigo-400"
//                 title="Refresh tasks"
//               >
//                 <FiRefreshCw
//                   className={loading ? "h-5 w-5 animate-spin" : "h-5 w-5"}
//                 />
//               </button>
//               <button
//                 onClick={openAddTaskModal}
//                 className="inline-flex items-center px-4 py-2 rounded-full shadow-sm text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-sm font-medium transition-all"
//               >
//                 <FiPlus className="mr-2 -ml-1 h-5 w-5" />
//                 Add Task
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* FILTER / SEARCH */}
//       <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
//           <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
//             {/* search */}
//             <div className="relative flex-grow">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FiSearch className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search tasks..."
//                 className="block w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
//               />
//             </div>
//             {/* date filter */}
//             <div className="flex items-center space-x-2">
//               <div className="relative">
//                 <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="date"
//                   value={filterDate}
//                   onChange={(e) => setFilterDate(e.target.value)}
//                   className="pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-auto"
//                 />
//               </div>
//               {(filterDate || searchTerm) && (
//                 <button
//                   onClick={clearFilters}
//                   className="inline-flex items-center px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//                 >
//                   <FiX className="mr-1 h-4 w-4" />
//                   Clear
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* TASKS TABLE */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg">
//           <div className="bg-gradient-to-r from-indigo-600 to-violet-600 py-4 px-6">
//             <h2 className="text-xl font-bold text-white flex items-center">
//               <FiList className="mr-2" /> Your Tasks
//               {(filterDate || searchTerm) && (
//                 <span className="ml-2 text-sm font-normal bg-white/20 px-2 py-0.5 rounded-full">
//                   {filterDate && searchTerm
//                     ? "Filtered & Searched"
//                     : filterDate
//                     ? "Date Filtered"
//                     : "Searched"}
//                 </span>
//               )}
//             </h2>
//           </div>

//           <div className="p-0">
//             {loading && !loadingId ? (
//               <div className="py-20 flex flex-col items-center justify-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
//                 <p className="mt-4 text-gray-500 dark:text-gray-400">
//                   Loading your tasks...
//                 </p>
//               </div>
//             ) : (
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={`page-${currentPage}`}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   {currentTasks.length ? (
//                     <div className="overflow-x-auto">
//                       <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                         <thead className="bg-gray-50 dark:bg-gray-700">
//                           <tr>
//                             {["No.", "Task Details", "Date", "Actions"].map(
//                               (h) => (
//                                 <th
//                                   key={h}
//                                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
//                                 >
//                                   {h}
//                                 </th>
//                               )
//                             )}
//                           </tr>
//                         </thead>
//                         <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                           {currentTasks.map((item, idx) => (
//                             <motion.tr
//                               key={item._id}
//                               initial={{ opacity: 0 }}
//                               animate={{ opacity: 1 }}
//                               transition={{ delay: idx * 0.05 }}
//                               className="hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-colors"
//                             >
//                               <td className="px-6 py-4 font-medium">
//                                 <span className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
//                                   {idx + 1 + startIndex}
//                                 </span>
//                               </td>
//                               <td className="px-6 py-4">
//                                 <div className="space-y-1">
//                                   {item.task.map((t, n) => (
//                                     <div
//                                       key={n}
//                                       className="flex items-start text-sm text-gray-700 dark:text-gray-300"
//                                     >
//                                       <span className="h-5 w-5 mr-2 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs text-indigo-600 dark:text-indigo-300 shrink-0 mt-0.5">
//                                         {n + 1}
//                                       </span>
//                                       <span>{t}</span>
//                                     </div>
//                                   ))}
//                                 </div>
//                               </td>
//                               <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
//                                 {item.task_Date ? (
//                                   <span className="flex items-center">
//                                     <FiCalendar className="mr-1 text-indigo-500 dark:text-indigo-400" />
//                                     {item.task_Date}
//                                   </span>
//                                 ) : (
//                                   <span className="flex items-center text-gray-400 dark:text-gray-500 italic">
//                                     <FiAlertCircle className="mr-1" /> No date
//                                     set
//                                   </span>
//                                 )}
//                               </td>
//                               <td className="px-6 py-4 text-right text-sm font-medium">
//                                 <div className="flex items-center justify-end space-x-2">
//                                   <button
//                                     type="button"
//                                     onClick={() => handleUpdateClick(item)}
//                                     className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-800/40 transition-colors"
//                                   >
//                                     <FiEdit2 className="mr-1" /> Edit
//                                   </button>
//                                   <button
//                                     type="button"
//                                     disabled={loadingId === item._id}
//                                     onClick={() => handleDeleteTask(item._id)}
//                                     className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800/40 transition-colors disabled:opacity-50"
//                                   >
//                                     {loadingId === item._id ? (
//                                       <FiRefreshCw className="mr-1 animate-spin" />
//                                     ) : (
//                                       <FiTrash2 className="mr-1" />
//                                     )}
//                                     Delete
//                                   </button>
//                                 </div>
//                               </td>
//                             </motion.tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   ) : (
//                     /* empty state */
//                     <div className="py-20 flex flex-col items-center">
//                       <div className="h-24 w-24 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-500 dark:text-indigo-400 mb-4">
//                         <FiList className="h-12 w-12" />
//                       </div>
//                       <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-1">
//                         No tasks found
//                       </h3>
//                       <p className="text-gray-500 dark:text-gray-400">
//                         {filterDate || searchTerm
//                           ? "Try clearing filters or "
//                           : ""}
//                         add your first task using the button above!
//                       </p>
//                     </div>
//                   )}
//                 </motion.div>
//               </AnimatePresence>
//             )}

//             {/* PAGINATION */}
//             {totalItems > 0 && (
//               <div className="border-t border-gray-200 dark:border-gray-700">
//                 <div className="py-4 px-6 flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
//                   <div className="text-sm text-gray-500 dark:text-gray-400">
//                     Showing{" "}
//                     <span className="font-medium text-gray-700 dark:text-gray-300">
//                       {startIndex + 1}
//                     </span>{" "}
//                     to{" "}
//                     <span className="font-medium text-gray-700 dark:text-gray-300">
//                       {Math.min(indexOfLastTask, totalItems)}
//                     </span>{" "}
//                     of{" "}
//                     <span className="font-medium text-gray-700 dark:text-gray-300">
//                       {totalItems}
//                     </span>{" "}
//                     tasks
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={() => goToPage(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className="inline-flex items-center px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//                     >
//                       <FiChevronLeft className="mr-1" /> Prev
//                     </button>

//                     <div className="flex items-center rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
//                       <input
//                         type="number"
//                         min="1"
//                         max={totalPages}
//                         value={manualPage}
//                         onChange={(e) =>
//                           setManualPage(parseInt(e.target.value, 10) || "")
//                         }
//                         onKeyDown={(e) => {
//                           if (e.key === "Enter") goToPage(Number(manualPage));
//                         }}
//                         onBlur={() => goToPage(Number(manualPage))}
//                         className="w-12 text-center border-none py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
//                       />
//                       <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1.5 text-gray-500 dark:text-gray-400 text-sm">
//                         / {totalPages}
//                       </span>
//                     </div>

//                     <button
//                       onClick={() => goToPage(currentPage + 1)}
//                       disabled={currentPage === totalPages || totalPages === 0}
//                       className="inline-flex items-center px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//                     >
//                       Next <FiChevronRight className="ml-1" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ADD / EDIT MODAL */}
//       <TaskModal
//         isOpen={isModalOpen}
//         onClose={handleCancelEdit}
//         taskList={taskList}
//         taskDate={taskDate}
//         setTaskDate={setTaskDate}
//         handleAddTaskInput={handleAddTaskInput}
//         handleDeleteTaskInput={handleDeleteTaskInput}
//         handleChange={handleChange}
//         handleSubmit={handleSubmit}
//         loading={loading}
//         editMode={editMode}
//       />
//     </div>
//   );
// }

// import { useState, useEffect, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   addTask,
//   fetchAllTasks,
//   deleteTask,
//   updateTaskdaily,
// } from "../../../service/taskService";
// import { toast } from "react-hot-toast";
// import {
//   FiPlus,
//   FiTrash2,
//   FiEdit2,
//   FiCalendar,
//   FiX,
//   FiChevronLeft,
//   FiChevronRight,
//   FiCheck,
//   FiList,
//   FiRefreshCw,
//   FiAlertCircle,
//   FiSearch,
//   FiGrid,
//   FiFilter,
//   FiChevronDown,
//   FiClock,
//   FiTarget,
//   FiTrendingUp,
//   FiLayout,
//   FiMenu,
//   FiZap,
//   FiStar,
//   FiBookmark,
//   FiMoreVertical,
// } from "react-icons/fi";
// import TaskModal from "./TaskModal";

// export default function UpdateTask() {
//   /* ---------- state ---------- */
//   const todayString = new Date().toISOString().substring(0, 10);

//   const [taskList, setTaskList] = useState([""]);
//   const [taskDate, setTaskDate] = useState("");

//   const [fetchedTasks, setFetchedTasks] = useState([]);
//   const [filteredTasks, setFilteredTasks] = useState([]);

//   const [filterDate, setFilterDate] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [loadingId, setLoadingId] = useState(null);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [manualPage, setManualPage] = useState(1);
//   const tasksPerPage = 10;

//   const [editMode, setEditMode] = useState(false);
//   const [editTaskId, setEditTaskId] = useState(null);
//   const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
//   const [showFilters, setShowFilters] = useState(false);

//   /* ---------- fetch ---------- */
//   const fetchTasks = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await fetchAllTasks();
//       if (res?.success) setFetchedTasks(res.data);
//       else toast.error(res?.message || "Failed to fetch tasks.");
//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong fetching tasks.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchTasks();
//   }, [fetchTasks]);

//   /* ---------- filter ---------- */
//   useEffect(() => {
//     let list = fetchedTasks;
//     if (filterDate) list = list.filter((t) => t.task_Date === filterDate);
//     if (searchTerm)
//       list = list.filter((t) =>
//         t.task.some((x) =>
//           x.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     setFilteredTasks(list);
//     setCurrentPage(1);
//     setManualPage(1);
//   }, [fetchedTasks, filterDate, searchTerm]);

//   /* ---------- pagination ---------- */
//   const indexOfLastTask = currentPage * tasksPerPage;
//   const indexOfFirstTask = indexOfLastTask - tasksPerPage;
//   const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
//   const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
//   const totalItems = filteredTasks.length;
//   const startIndex = indexOfFirstTask;

//   const goToPage = (p) => {
//     if (p < 1 || p > totalPages) return;
//     setCurrentPage(p);
//     setManualPage(p);
//   };

//   /* ---------- modal handlers ---------- */
//   const openAddTaskModal = () => {
//     setTaskList([""]);
//     setTaskDate(todayString);
//     setEditMode(false);
//     setEditTaskId(null);
//     setIsModalOpen(true);
//   };

//   const handleCancelEdit = () => {
//     setTaskList([""]);
//     setTaskDate("");
//     setEditMode(false);
//     setEditTaskId(null);
//     setIsModalOpen(false);
//     toast("Task operation cancelled", {
//       icon: "🔄",
//       style: { borderRadius: "16px", background: "#333", color: "#fff" },
//     });
//   };

//   const handleAddTaskInput = () => setTaskList((prev) => [...prev, ""]);
//   const handleDeleteTaskInput = (idx) =>
//     setTaskList((prev) => prev.filter((_, i) => i !== idx));
//   const handleChange = (idx, val) =>
//     setTaskList((prev) => prev.map((t, i) => (i === idx ? val : t)));

//   /* ---------- submit ---------- */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const nonEmpty = taskList.filter((t) => t.trim().length);
//     if (!nonEmpty.length) return toast.error("Please enter at least one task.");
//     if (!taskDate) return toast.error("Please select a date for this task.");

//     const payload = { task: nonEmpty, task_Date: taskDate };
//     setLoading(true);
//     try {
//       const res = editMode
//         ? await updateTaskdaily(editTaskId, payload)
//         : await addTask(payload);
//       if (res?.success) {
//         toast.success(res.message || "Operation successful!");
//         setTaskList([""]);
//         setTaskDate("");
//         setEditMode(false);
//         setEditTaskId(null);
//         setIsModalOpen(false);
//         fetchTasks();
//       } else toast.error(res?.message || "Operation failed.");
//     } catch (err) {
//       console.error(err);
//       toast.error("Submission failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------- delete ---------- */
//   const handleDeleteTask = async (id) => {
//     setLoadingId(id);
//     try {
//       const res = await deleteTask(id);
//       if (res?.success) {
//         toast.success(res.message || "Task deleted!");
//         fetchTasks();
//       } else toast.error(res?.message || "Delete failed.");
//     } catch (err) {
//       console.error(err);
//       toast.error("Delete failed. Please try again.");
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   /* ---------- edit ---------- */
//   const handleUpdateClick = (item) => {
//     setTaskList(item.task);
//     setTaskDate(item.task_Date || todayString);
//     setEditTaskId(item._id);
//     setEditMode(true);
//     setIsModalOpen(true);
//   };

//   const clearFilters = () => {
//     setFilterDate("");
//     setSearchTerm("");
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "No date";
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   const isToday = (dateString) => {
//     return dateString === todayString;
//   };

//   const isPastDue = (dateString) => {
//     return dateString && dateString < todayString;
//   };

//   /* ---------- UI ---------- */
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 text-gray-800 dark:text-gray-100 transition-all duration-500">
//       {/* HEADER */}
//       <motion.div
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 z-30 shadow-lg shadow-slate-900/5 dark:shadow-black/20"
//       >
//         <div className="mx-auto py-4 px-4 sm:px-6 lg:px-8 max-w-7xl">
//           <div className="flex items-center justify-between">
//             <motion.div
//               className="flex items-center space-x-3"
//               whileHover={{ scale: 1.02 }}
//               transition={{ type: "spring", stiffness: 400, damping: 17 }}
//             >
//               <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-3 shadow-lg shadow-indigo-500/25 dark:shadow-indigo-500/20">
//                 <FiZap className="h-6 w-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
//                   TaskFlow Pro
//                 </h1>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
//                   Organize • Execute • Achieve
//                 </p>
//               </div>
//             </motion.div>

//             <div className="flex items-center space-x-2 sm:space-x-3">
//               {/* View Toggle - Hidden on mobile */}
//               <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1 border border-gray-200 dark:border-gray-700">
//                 <button
//                   onClick={() => setViewMode('cards')}
//                   className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                     viewMode === 'cards'
//                       ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
//                       : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
//                   }`}
//                 >
//                   <FiGrid className="h-4 w-4 mr-1" />
//                   Cards
//                 </button>
//                 <button
//                   onClick={() => setViewMode('table')}
//                   className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                     viewMode === 'table'
//                       ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
//                       : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
//                   }`}
//                 >
//                   <FiList className="h-4 w-4 mr-1" />
//                   Table
//                 </button>
//               </div>

//               <motion.button
//                 onClick={fetchTasks}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 text-indigo-600 dark:text-indigo-400 border border-gray-200 dark:border-gray-700"
//                 title="Refresh tasks"
//               >
//                 <FiRefreshCw
//                   className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`}
//                 />
//               </motion.button>

//               <motion.button
//                 onClick={openAddTaskModal}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="inline-flex items-center px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-500/25 text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-sm font-semibold transition-all duration-200 border border-indigo-500/20"
//               >
//                 <FiPlus className="mr-2 h-5 w-5" />
//                 <span className="hidden sm:inline">Add Task</span>
//                 <span className="sm:hidden">Add</span>
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* MAIN CONTENT */}
//       <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-7xl">

//         {/* STATS CARDS */}
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.1 }}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8"
//         >
//           <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 lg:p-6 rounded-2xl text-white shadow-lg shadow-blue-500/25">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-blue-100 text-sm font-medium">Total Tasks</p>
//                 <p className="text-2xl lg:text-3xl font-bold">{fetchedTasks.length}</p>
//               </div>
//               <FiTarget className="h-8 w-8 text-blue-200" />
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 lg:p-6 rounded-2xl text-white shadow-lg shadow-emerald-500/25">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-emerald-100 text-sm font-medium">Today's Tasks</p>
//                 <p className="text-2xl lg:text-3xl font-bold">
//                   {fetchedTasks.filter(task => isToday(task.task_Date)).length}
//                 </p>
//               </div>
//               <FiClock className="h-8 w-8 text-emerald-200" />
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-4 lg:p-6 rounded-2xl text-white shadow-lg shadow-amber-500/25">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-amber-100 text-sm font-medium">Overdue</p>
//                 <p className="text-2xl lg:text-3xl font-bold">
//                   {fetchedTasks.filter(task => isPastDue(task.task_Date)).length}
//                 </p>
//               </div>
//               <FiAlertCircle className="h-8 w-8 text-amber-200" />
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 lg:p-6 rounded-2xl text-white shadow-lg shadow-purple-500/25">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-purple-100 text-sm font-medium">Filtered</p>
//                 <p className="text-2xl lg:text-3xl font-bold">{filteredTasks.length}</p>
//               </div>
//               <FiTrendingUp className="h-8 w-8 text-purple-200" />
//             </div>
//           </div>
//         </motion.div>

//         {/* FILTER / SEARCH */}
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="mb-6 lg:mb-8"
//         >
//           <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/5 dark:shadow-black/20 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
//             {/* Mobile Filter Toggle */}
//             <div className="md:hidden bg-gradient-to-r from-indigo-500 to-purple-500 p-4">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center justify-between w-full text-white"
//               >
//                 <span className="flex items-center text-sm font-semibold">
//                   <FiFilter className="mr-2 h-4 w-4" />
//                   Filters & Search
//                 </span>
//                 <FiChevronDown className={`h-5 w-5 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
//               </button>
//             </div>

//             {/* Filter Content */}
//             <div className={`p-4 lg:p-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
//               <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
//                 {/* Search */}
//                 <div className="relative flex-grow lg:max-w-md">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <FiSearch className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     placeholder="Search your tasks..."
//                     className="block w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
//                   />
//                 </div>

//                 {/* Date Filter & Actions */}
//                 <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
//                   <div className="relative">
//                     <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
//                     <input
//                       type="date"
//                       value={filterDate}
//                       onChange={(e) => setFilterDate(e.target.value)}
//                       className="pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 w-full sm:w-auto"
//                     />
//                   </div>

//                   {(filterDate || searchTerm) && (
//                     <motion.button
//                       initial={{ scale: 0, opacity: 0 }}
//                       animate={{ scale: 1, opacity: 1 }}
//                       onClick={clearFilters}
//                       className="inline-flex items-center justify-center px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white/80 dark:bg-gray-700/80 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 backdrop-blur-sm"
//                     >
//                       <FiX className="mr-2 h-4 w-4" />
//                       Clear All
//                     </motion.button>
//                   )}
//                 </div>
//               </div>

//               {/* Active Filters */}
//               {(filterDate || searchTerm) && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: 'auto', opacity: 1 }}
//                   className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
//                 >
//                   <div className="flex flex-wrap gap-2">
//                     {searchTerm && (
//                       <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700">
//                         <FiSearch className="mr-1 h-3 w-3" />
//                         "{searchTerm}"
//                       </span>
//                     )}
//                     {filterDate && (
//                       <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700">
//                         <FiCalendar className="mr-1 h-3 w-3" />
//                         {formatDate(filterDate)}
//                       </span>
//                     )}
//                   </div>
//                 </motion.div>
//               )}
//             </div>
//           </div>
//         </motion.div>

//         {/* TASKS CONTENT */}
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           {loading && !loadingId ? (
//             <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-12 lg:p-20 text-center shadow-xl shadow-slate-900/5 dark:shadow-black/20 border border-gray-200/50 dark:border-gray-700/50">
//               <div className="flex flex-col items-center">
//                 <div className="relative">
//                   <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 dark:border-indigo-800"></div>
//                   <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-indigo-500 absolute top-0"></div>
//                 </div>
//                 <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 font-medium">
//                   Loading your tasks...
//                 </p>
//                 <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
//                   This won't take long
//                 </p>
//               </div>
//             </div>
//           ) : (
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={`${viewMode}-${currentPage}`}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.4, ease: "easeInOut" }}
//               >
//                 {currentTasks.length ? (
//                   <>
//                     {/* Mobile & Tablet Card View */}
//                     <div className={`${viewMode === 'table' ? 'hidden lg:block' : 'block lg:hidden'}`}>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
//                         {currentTasks.map((item, idx) => (
//                           <motion.div
//                             key={item._id}
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: idx * 0.1 }}
//                             className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg shadow-slate-900/5 dark:shadow-black/20 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:shadow-slate-900/10 dark:hover:shadow-black/30 transition-all duration-300 hover:-translate-y-1"
//                           >
//                             {/* Card Header */}
//                             <div className="flex items-start justify-between mb-4">
//                               <div className="flex items-center space-x-3">
//                                 <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-bold text-sm shadow-lg">
//                                   #{idx + 1 + startIndex}
//                                 </div>
//                                 <div>
//                                   <div className="flex items-center space-x-2">
//                                     {item.task_Date && (
//                                       <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//                                         isToday(item.task_Date)
//                                           ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700'
//                                           : isPastDue(item.task_Date)
//                                           ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700'
//                                           : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700'
//                                       }`}>
//                                         <FiCalendar className="mr-1 h-3 w-3" />
//                                         {formatDate(item.task_Date)}
//                                       </span>
//                                     )}
//                                   </div>
//                                 </div>
//                               </div>

//                               <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                                 <motion.button
//                                   whileHover={{ scale: 1.1 }}
//                                   whileTap={{ scale: 0.9 }}
//                                   onClick={() => handleUpdateClick(item)}
//                                   className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-800/50 transition-colors"
//                                 >
//                                   <FiEdit2 className="h-4 w-4" />
//                                 </motion.button>
//                                 <motion.button
//                                   whileHover={{ scale: 1.1 }}
//                                   whileTap={{ scale: 0.9 }}
//                                   disabled={loadingId === item._id}
//                                   onClick={() => handleDeleteTask(item._id)}
//                                   className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors disabled:opacity-50"
//                                 >
//                                   {loadingId === item._id ? (
//                                     <FiRefreshCw className="h-4 w-4 animate-spin" />
//                                   ) : (
//                                     <FiTrash2 className="h-4 w-4" />
//                                   )}
//                                 </motion.button>
//                               </div>
//                             </div>

//                             {/* Task List */}
//                             <div className="space-y-3">
//                               {item.task.map((task, taskIdx) => (
//                                 <motion.div
//                                   key={taskIdx}
//                                   initial={{ opacity: 0, x: -20 }}
//                                   animate={{ opacity: 1, x: 0 }}
//                                   transition={{ delay: (idx * 0.1) + (taskIdx * 0.05) }}
//                                   className="flex items-start space-x-3 p-3 rounded-xl bg-gray-50/80 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50"
//                                 >
//                                   <div className="flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mt-0.5 flex-shrink-0">
//                                     {taskIdx + 1}
//                                   </div>
//                                   <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">
//                                     {task}
//                                   </p>
//                                 </motion.div>
//                               ))}
//                             </div>

//                             {/* Card Footer */}
//                             <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-600/50 flex items-center justify-between">
//                               <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
//                                 <FiBookmark className="h-3 w-3" />
//                                 <span>{item.task.length} task{item.task.length !== 1 ? 's' : ''}</span>
//                               </div>

//                               {!item.task_Date && (
//                                 <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600">
//                                   <FiAlertCircle className="mr-1 h-3 w-3" />
//                                   No date
//                                 </span>
//                               )}
//                             </div>
//                           </motion.div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Desktop Table View */}
//                     <div className={`${viewMode === 'cards' ? 'hidden lg:block' : 'hidden lg:block'}`}>
//                       <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl shadow-slate-900/5 dark:shadow-black/20 border border-gray-200/50 dark:border-gray-700/50">
//                         <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-6 px-8">
//                           <h2 className="text-2xl font-bold text-white flex items-center">
//                             <FiList className="mr-3 h-6 w-6" />
//                             Your Tasks
//                             {(filterDate || searchTerm) && (
//                               <span className="ml-3 text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
//                                 {filterDate && searchTerm
//                                   ? "Filtered & Searched"
//                                   : filterDate
//                                   ? "Date Filtered"
//                                   : "Searched"}
//                               </span>
//                             )}
//                           </h2>
//                         </div>

//                         <div className="overflow-x-auto">
//                           <table className="min-w-full divide-y divide-gray-200/50 dark:divide-gray-700/50">
//                             <thead className="bg-gray-50/80 dark:bg-gray-700/50 backdrop-blur-sm">
//                               <tr>
//                                 {["#", "Task Details", "Date", "Status", "Actions"].map((header) => (
//                                   <th
//                                     key={header}
//                                     className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
//                                   >
//                                     {header}
//                                   </th>
//                                 ))}
//                               </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
//                               {currentTasks.map((item, idx) => (
//                                 <motion.tr
//                                   key={item._id}
//                                   initial={{ opacity: 0, y: 10 }}
//                                   animate={{ opacity: 1, y: 0 }}
//                                   transition={{ delay: idx * 0.05 }}
//                                   className="group hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 dark:hover:from-indigo-900/10 dark:hover:to-purple-900/10 transition-all duration-200"
//                                 >
//                                   <td className="px-6 py-4">
//                                     <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-bold text-sm shadow-lg">
//                                       {idx + 1 + startIndex}
//                                     </div>
//                                   </td>
//                                   <td className="px-6 py-4">
//                                     <div className="space-y-2 max-w-md">
//                                       {item.task.map((task, taskIdx) => (
//                                         <div
//                                           key={taskIdx}
//                                           className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50/80 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50"
//                                         >
//                                           <span className="flex items-center justify-center h-5 w-5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold flex-shrink-0 mt-0.5">
//                                             {taskIdx + 1}
//                                           </span>
//                                           <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
//                                             {task}
//                                           </span>
//                                         </div>
//                                       ))}
//                                     </div>
//                                   </td>
//                                   <td className="px-6 py-4">
//                                     {item.task_Date ? (
//                                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
//                                         isToday(item.task_Date)
//                                           ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700'
//                                           : isPastDue(item.task_Date)
//                                           ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700'
//                                           : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700'
//                                       }`}>
//                                         <FiCalendar className="mr-2 h-4 w-4" />
//                                         {formatDate(item.task_Date)}
//                                       </span>
//                                     ) : (
//                                       <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600">
//                                         <FiAlertCircle className="mr-2 h-4 w-4" />
//                                         No date set
//                                       </span>
//                                     )}
//                                   </td>
//                                   <td className="px-6 py-4">
//                                     {item.task_Date && (
//                                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
//                                         isToday(item.task_Date)
//                                           ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
//                                           : isPastDue(item.task_Date)
//                                           ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
//                                           : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
//                                       }`}>
//                                         {isToday(item.task_Date) ? (
//                                           <>
//                                             <FiClock className="mr-1 h-3 w-3" />
//                                             Today
//                                           </>
//                                         ) : isPastDue(item.task_Date) ? (
//                                           <>
//                                             <FiAlertCircle className="mr-1 h-3 w-3" />
//                                             Overdue
//                                           </>
//                                         ) : (
//                                           <>
//                                             <FiBookmark className="mr-1 h-3 w-3" />
//                                             Scheduled
//                                           </>
//                                         )}
//                                       </span>
//                                     )}
//                                   </td>
//                                   <td className="px-6 py-4">
//                                     <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                                       <motion.button
//                                         whileHover={{ scale: 1.1 }}
//                                         whileTap={{ scale: 0.9 }}
//                                         onClick={() => handleUpdateClick(item)}
//                                         className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-800/40 transition-all duration-200 border border-amber-200 dark:border-amber-700"
//                                       >
//                                         <FiEdit2 className="mr-1 h-4 w-4" />
//                                         Edit
//                                       </motion.button>
//                                       <motion.button
//                                         whileHover={{ scale: 1.1 }}
//                                         whileTap={{ scale: 0.9 }}
//                                         disabled={loadingId === item._id}
//                                         onClick={() => handleDeleteTask(item._id)}
//                                         className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800/40 transition-all duration-200 disabled:opacity-50 border border-red-200 dark:border-red-700"
//                                       >
//                                         {loadingId === item._id ? (
//                                           <FiRefreshCw className="mr-1 h-4 w-4 animate-spin" />
//                                         ) : (
//                                           <FiTrash2 className="mr-1 h-4 w-4" />
//                                         )}
//                                         Delete
//                                       </motion.button>
//                                     </div>
//                                   </td>
//                                 </motion.tr>
//                               ))}
//                             </tbody>
//                           </table>
//                         </div>
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   /* Empty State */
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-12 lg:p-20 text-center shadow-xl shadow-slate-900/5 dark:shadow-black/20 border border-gray-200/50 dark:border-gray-700/50"
//                   >
//                     <motion.div
//                       initial={{ y: 20 }}
//                       animate={{ y: 0 }}
//                       transition={{ delay: 0.2 }}
//                       className="flex flex-col items-center"
//                     >
//                       <div className="h-24 w-24 lg:h-32 lg:w-32 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center text-indigo-500 dark:text-indigo-400 mb-6 shadow-lg">
//                         <FiLayout className="h-12 w-12 lg:h-16 lg:w-16" />
//                       </div>
//                       <h3 className="text-2xl lg:text-3xl font-bold text-gray-700 dark:text-gray-200 mb-2">
//                         No tasks found
//                       </h3>
//                       <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md leading-relaxed">
//                         {filterDate || searchTerm
//                           ? "No tasks match your current filters. Try adjusting your search criteria or "
//                           : "Ready to boost your productivity? "}
//                         <span className="font-semibold text-indigo-600 dark:text-indigo-400">
//                           Create your first task to get started!
//                         </span>
//                       </p>
//                       <div className="flex flex-col sm:flex-row gap-3">
//                         {(filterDate || searchTerm) && (
//                           <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={clearFilters}
//                             className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 border border-gray-200 dark:border-gray-600"
//                           >
//                             <FiX className="mr-2 h-4 w-4" />
//                             Clear Filters
//                           </motion.button>
//                         )}
//                         <motion.button
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={openAddTaskModal}
//                           className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg shadow-indigo-500/25"
//                         >
//                           <FiPlus className="mr-2 h-4 w-4" />
//                           Add Your First Task
//                         </motion.button>
//                       </div>
//                     </motion.div>
//                   </motion.div>
//                 )}
//               </motion.div>
//             </AnimatePresence>
//           )}

//           {/* PAGINATION */}
//           {totalItems > 0 && (
//             <motion.div
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.4 }}
//               className="mt-8"
//             >
//               <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/5 dark:shadow-black/20 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
//                 <div className="py-4 px-6 flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
//                   <div className="text-sm text-gray-500 dark:text-gray-400 text-center lg:text-left">
//                     Showing{" "}
//                     <span className="font-semibold text-gray-700 dark:text-gray-300">
//                       {startIndex + 1}
//                     </span>{" "}
//                     to{" "}
//                     <span className="font-semibold text-gray-700 dark:text-gray-300">
//                       {Math.min(indexOfLastTask, totalItems)}
//                     </span>{" "}
//                     of{" "}
//                     <span className="font-semibold text-gray-700 dark:text-gray-300">
//                       {totalItems}
//                     </span>{" "}
//                     tasks
//                   </div>

//                   <div className="flex items-center space-x-2">
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => goToPage(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className="inline-flex items-center px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-700/80 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 backdrop-blur-sm"
//                     >
//                       <FiChevronLeft className="mr-1 h-4 w-4" />
//                       <span className="hidden sm:inline">Previous</span>
//                       <span className="sm:hidden">Prev</span>
//                     </motion.button>

//                     <div className="flex items-center rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm">
//                       <input
//                         type="number"
//                         min="1"
//                         max={totalPages}
//                         value={manualPage}
//                         onChange={(e) =>
//                           setManualPage(parseInt(e.target.value, 10) || "")
//                         }
//                         onKeyDown={(e) => {
//                           if (e.key === "Enter") goToPage(Number(manualPage));
//                         }}
//                         onBlur={() => goToPage(Number(manualPage))}
//                         className="w-16 text-center border-none py-2 bg-transparent text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                       />
//                       <span className="bg-gray-100 dark:bg-gray-600 px-3 py-2 text-gray-500 dark:text-gray-400 text-sm font-medium">
//                         / {totalPages}
//                       </span>
//                     </div>

//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => goToPage(currentPage + 1)}
//                       disabled={currentPage === totalPages || totalPages === 0}
//                       className="inline-flex items-center px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-700/80 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 backdrop-blur-sm"
//                     >
//                       <span className="hidden sm:inline">Next</span>
//                       <span className="sm:hidden">Next</span>
//                       <FiChevronRight className="ml-1 h-4 w-4" />
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </motion.div>
//       </div>

//       {/* ADD / EDIT MODAL */}
//       <TaskModal
//         isOpen={isModalOpen}
//         onClose={handleCancelEdit}
//         taskList={taskList}
//         taskDate={taskDate}
//         setTaskDate={setTaskDate}
//         handleAddTaskInput={handleAddTaskInput}
//         handleDeleteTaskInput={handleDeleteTaskInput}
//         handleChange={handleChange}
//         handleSubmit={handleSubmit}
//         loading={loading}
//         editMode={editMode}
//       />
//     </div>
//   );
// }

// import { useState, useEffect, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   addTask,
//   fetchAllTasks,
//   deleteTask,
//   updateTaskdaily,
// } from "../../../service/taskService";
// import { toast } from "react-hot-toast";
// import {
//   FiPlus,
//   FiTrash2,
//   FiEdit2,
//   FiCalendar,
//   FiX,
//   FiChevronLeft,
//   FiChevronRight,
//   FiCheck,
//   FiList,
//   FiRefreshCw,
//   FiAlertCircle,
//   FiSearch,
//   FiGrid,
//   FiFilter,
//   FiChevronDown,
//   FiClock,
//   FiTarget,
//   FiTrendingUp,
//   FiLayout,
//   FiMenu,
//   FiZap,
//   FiStar,
//   FiBookmark,
//   FiMoreVertical,
// } from "react-icons/fi";
// import TaskModal from "./TaskModal";

// export default function UpdateTask() {
//   /* ---------- state ---------- */
//   const todayString = new Date().toISOString().substring(0, 10);

//   const [taskList, setTaskList] = useState([""]);
//   const [taskDate, setTaskDate] = useState("");

//   const [fetchedTasks, setFetchedTasks] = useState([]);
//   const [filteredTasks, setFilteredTasks] = useState([]);

//   const [filterDate, setFilterDate] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [loadingId, setLoadingId] = useState(null);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [manualPage, setManualPage] = useState(1);
//   const tasksPerPage = 10;

//   const [editMode, setEditMode] = useState(false);
//   const [editTaskId, setEditTaskId] = useState(null);
//   const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
//   const [showFilters, setShowFilters] = useState(false);
//   const [detailModalOpen, setDetailModalOpen] = useState(false);
//   const [selectedTaskDetails, setSelectedTaskDetails] = useState(null);

//   /* ---------- fetch ---------- */
//   const fetchTasks = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await fetchAllTasks();
//       if (res?.success) setFetchedTasks(res.data);
//       else toast.error(res?.message || "Failed to fetch tasks.");
//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong fetching tasks.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchTasks();
//   }, [fetchTasks]);

//   /* ---------- filter ---------- */
//   useEffect(() => {
//     let list = fetchedTasks;
//     if (filterDate) list = list.filter((t) => t.task_Date === filterDate);
//     if (searchTerm)
//       list = list.filter((t) =>
//         t.task.some((x) =>
//           x.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     setFilteredTasks(list);
//     setCurrentPage(1);
//     setManualPage(1);
//   }, [fetchedTasks, filterDate, searchTerm]);

//   /* ---------- pagination ---------- */
//   const indexOfLastTask = currentPage * tasksPerPage;
//   const indexOfFirstTask = indexOfLastTask - tasksPerPage;
//   const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
//   const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
//   const totalItems = filteredTasks.length;
//   const startIndex = indexOfFirstTask;

//   const goToPage = (p) => {
//     if (p < 1 || p > totalPages) return;
//     setCurrentPage(p);
//     setManualPage(p);
//   };

//   /* ---------- modal handlers ---------- */
//   const openAddTaskModal = () => {
//     setTaskList([""]);
//     setTaskDate(todayString);
//     setEditMode(false);
//     setEditTaskId(null);
//     setIsModalOpen(true);
//   };

//   const handleCancelEdit = () => {
//     setTaskList([""]);
//     setTaskDate("");
//     setEditMode(false);
//     setEditTaskId(null);
//     setIsModalOpen(false);
//     toast("Task operation cancelled", {
//       icon: "🔄",
//       style: { borderRadius: "16px", background: "#333", color: "#fff" },
//     });
//   };

//   const handleAddTaskInput = () => setTaskList((prev) => [...prev, ""]);
//   const handleDeleteTaskInput = (idx) =>
//     setTaskList((prev) => prev.filter((_, i) => i !== idx));
//   const handleChange = (idx, val) =>
//     setTaskList((prev) => prev.map((t, i) => (i === idx ? val : t)));

//   /* ---------- submit ---------- */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const nonEmpty = taskList.filter((t) => t.trim().length);
//     if (!nonEmpty.length) return toast.error("Please enter at least one task.");
//     if (!taskDate) return toast.error("Please select a date for this task.");

//     const payload = { task: nonEmpty, task_Date: taskDate };
//     setLoading(true);
//     try {
//       const res = editMode
//         ? await updateTaskdaily(editTaskId, payload)
//         : await addTask(payload);
//       if (res?.success) {
//         toast.success(res.message || "Operation successful!");
//         setTaskList([""]);
//         setTaskDate("");
//         setEditMode(false);
//         setEditTaskId(null);
//         setIsModalOpen(false);
//         fetchTasks();
//       } else toast.error(res?.message || "Operation failed.");
//     } catch (err) {
//       console.error(err);
//       toast.error("Submission failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------- delete ---------- */
//   const handleDeleteTask = async (id) => {
//     setLoadingId(id);
//     try {
//       const res = await deleteTask(id);
//       if (res?.success) {
//         toast.success(res.message || "Task deleted!");
//         fetchTasks();
//       } else toast.error(res?.message || "Delete failed.");
//     } catch (err) {
//       console.error(err);
//       toast.error("Delete failed. Please try again.");
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   /* ---------- edit ---------- */
//   const handleUpdateClick = (item) => {
//     setTaskList(item.task);
//     setTaskDate(item.task_Date || todayString);
//     setEditTaskId(item._id);
//     setEditMode(true);
//     setIsModalOpen(true);
//   };

//   const clearFilters = () => {
//     setFilterDate("");
//     setSearchTerm("");
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "No date";
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   const isToday = (dateString) => {
//     return dateString === todayString;
//   };

//   const isPastDue = (dateString) => {
//     return dateString && dateString < todayString;
//   };

//   const truncateText = (text, maxLength = 50) => {
//     if (text.length <= maxLength) return text;
//     return text.substring(0, maxLength) + '...';
//   };

//   const openTaskDetailsModal = (task) => {
//     setSelectedTaskDetails(task);
//     setDetailModalOpen(true);
//   };

//   const closeTaskDetailsModal = () => {
//     setSelectedTaskDetails(null);
//     setDetailModalOpen(false);
//   };

//   /* ---------- UI ---------- */
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 text-gray-800 dark:text-gray-100 transition-all duration-500">
//       {/* HEADER */}
//       <motion.div
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 z-30 shadow-lg shadow-slate-900/5 dark:shadow-black/20"
//       >
//         <div className="mx-auto py-4 px-4 sm:px-6 lg:px-8 max-w-7xl">
//           <div className="flex items-center justify-between">
//             <motion.div
//               className="flex items-center space-x-3"
//               whileHover={{ scale: 1.02 }}
//               transition={{ type: "spring", stiffness: 400, damping: 17 }}
//             >
//               <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-3 shadow-lg shadow-indigo-500/25 dark:shadow-indigo-500/20">
//                 <FiZap className="h-6 w-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
//                   TaskFlow Pro
//                 </h1>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
//                   Organize • Execute • Achieve
//                 </p>
//               </div>
//             </motion.div>

//             <div className="flex items-center space-x-2 sm:space-x-3">
//               {/* View Toggle - Hidden on mobile */}
//               <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1 border border-gray-200 dark:border-gray-700">
//                 <button
//                   onClick={() => setViewMode('cards')}
//                   className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                     viewMode === 'cards'
//                       ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
//                       : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
//                   }`}
//                 >
//                   <FiGrid className="h-4 w-4 mr-1" />
//                   Cards
//                 </button>
//                 <button
//                   onClick={() => setViewMode('table')}
//                   className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                     viewMode === 'table'
//                       ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
//                       : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
//                   }`}
//                 >
//                   <FiList className="h-4 w-4 mr-1" />
//                   Table
//                 </button>
//               </div>

//               <motion.button
//                 onClick={fetchTasks}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 text-indigo-600 dark:text-indigo-400 border border-gray-200 dark:border-gray-700"
//                 title="Refresh tasks"
//               >
//                 <FiRefreshCw
//                   className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`}
//                 />
//               </motion.button>

//               <motion.button
//                 onClick={openAddTaskModal}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="inline-flex items-center px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-500/25 text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-sm font-semibold transition-all duration-200 border border-indigo-500/20"
//               >
//                 <FiPlus className="mr-2 h-5 w-5" />
//                 <span className="hidden sm:inline">Add Task</span>
//                 <span className="sm:hidden">Add</span>
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* MAIN CONTENT */}
//       <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-7xl">

//         {/* STATS CARDS */}
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.1 }}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8"
//         >
//           <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 lg:p-6 rounded-2xl text-white shadow-lg shadow-blue-500/25">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-blue-100 text-sm font-medium">Total Tasks</p>
//                 <p className="text-2xl lg:text-3xl font-bold">{fetchedTasks.length}</p>
//               </div>
//               <FiTarget className="h-8 w-8 text-blue-200" />
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 lg:p-6 rounded-2xl text-white shadow-lg shadow-emerald-500/25">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-emerald-100 text-sm font-medium">Today's Tasks</p>
//                 <p className="text-2xl lg:text-3xl font-bold">
//                   {fetchedTasks.filter(task => isToday(task.task_Date)).length}
//                 </p>
//               </div>
//               <FiClock className="h-8 w-8 text-emerald-200" />
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-4 lg:p-6 rounded-2xl text-white shadow-lg shadow-amber-500/25">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-amber-100 text-sm font-medium">Overdue</p>
//                 <p className="text-2xl lg:text-3xl font-bold">
//                   {fetchedTasks.filter(task => isPastDue(task.task_Date)).length}
//                 </p>
//               </div>
//               <FiAlertCircle className="h-8 w-8 text-amber-200" />
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 lg:p-6 rounded-2xl text-white shadow-lg shadow-purple-500/25">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-purple-100 text-sm font-medium">Filtered</p>
//                 <p className="text-2xl lg:text-3xl font-bold">{filteredTasks.length}</p>
//               </div>
//               <FiTrendingUp className="h-8 w-8 text-purple-200" />
//             </div>
//           </div>
//         </motion.div>

//         {/* FILTER / SEARCH */}
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="mb-6 lg:mb-8"
//         >
//           <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/5 dark:shadow-black/20 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
//             {/* Mobile Filter Toggle */}
//             <div className="md:hidden bg-gradient-to-r from-indigo-500 to-purple-500 p-4">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center justify-between w-full text-white"
//               >
//                 <span className="flex items-center text-sm font-semibold">
//                   <FiFilter className="mr-2 h-4 w-4" />
//                   Filters & Search
//                 </span>
//                 <FiChevronDown className={`h-5 w-5 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
//               </button>
//             </div>

//             {/* Filter Content */}
//             <div className={`p-4 lg:p-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
//               <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
//                 {/* Search */}
//                 <div className="relative flex-grow lg:max-w-md">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <FiSearch className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     placeholder="Search your tasks..."
//                     className="block w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
//                   />
//                 </div>

//                 {/* Date Filter & Actions */}
//                 <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
//                   <div className="relative">
//                     <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
//                     <input
//                       type="date"
//                       value={filterDate}
//                       onChange={(e) => setFilterDate(e.target.value)}
//                       className="pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 w-full sm:w-auto"
//                     />
//                   </div>

//                   {(filterDate || searchTerm) && (
//                     <motion.button
//                       initial={{ scale: 0, opacity: 0 }}
//                       animate={{ scale: 1, opacity: 1 }}
//                       onClick={clearFilters}
//                       className="inline-flex items-center justify-center px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white/80 dark:bg-gray-700/80 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 backdrop-blur-sm"
//                     >
//                       <FiX className="mr-2 h-4 w-4" />
//                       Clear All
//                     </motion.button>
//                   )}
//                 </div>
//               </div>

//               {/* Active Filters */}
//               {(filterDate || searchTerm) && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: 'auto', opacity: 1 }}
//                   className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
//                 >
//                   <div className="flex flex-wrap gap-2">
//                     {searchTerm && (
//                       <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700">
//                         <FiSearch className="mr-1 h-3 w-3" />
//                         "{searchTerm}"
//                       </span>
//                     )}
//                     {filterDate && (
//                       <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700">
//                         <FiCalendar className="mr-1 h-3 w-3" />
//                         {formatDate(filterDate)}
//                       </span>
//                     )}
//                   </div>
//                 </motion.div>
//               )}
//             </div>
//           </div>
//         </motion.div>

//         {/* TASKS CONTENT */}
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           {loading && !loadingId ? (
//             <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-12 lg:p-20 text-center shadow-xl shadow-slate-900/5 dark:shadow-black/20 border border-gray-200/50 dark:border-gray-700/50">
//               <div className="flex flex-col items-center">
//                 <div className="relative">
//                   <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 dark:border-indigo-800"></div>
//                   <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-indigo-500 absolute top-0"></div>
//                 </div>
//                 <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 font-medium">
//                   Loading your tasks...
//                 </p>
//                 <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
//                   This won't take long
//                 </p>
//               </div>
//             </div>
//           ) : (
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={`${viewMode}-${currentPage}`}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.4, ease: "easeInOut" }}
//               >
//                 {currentTasks.length ? (
//                   <>
//                     {/* Mobile & Tablet Card View */}
//                     <div className={`${viewMode === 'table' ? 'hidden lg:block' : 'block lg:hidden'}`}>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
//                         {currentTasks.map((item, idx) => (
//                           <motion.div
//                             key={item._id}
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: idx * 0.1 }}
//                             className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg shadow-slate-900/5 dark:shadow-black/20 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:shadow-slate-900/10 dark:hover:shadow-black/30 transition-all duration-300 hover:-translate-y-1"
//                           >
//                             {/* Card Header */}
//                             <div className="flex items-start justify-between mb-4">
//                               <div className="flex items-center space-x-3">
//                                 <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-bold text-sm shadow-lg">
//                                   #{idx + 1 + startIndex}
//                                 </div>
//                                 <div>
//                                   <div className="flex items-center space-x-2">
//                                     {item.task_Date && (
//                                       <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//                                         isToday(item.task_Date)
//                                           ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700'
//                                           : isPastDue(item.task_Date)
//                                           ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700'
//                                           : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700'
//                                       }`}>
//                                         <FiCalendar className="mr-1 h-3 w-3" />
//                                         {formatDate(item.task_Date)}
//                                       </span>
//                                     )}
//                                   </div>
//                                 </div>
//                               </div>

//                               <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                                 <motion.button
//                                   whileHover={{ scale: 1.1 }}
//                                   whileTap={{ scale: 0.9 }}
//                                   onClick={() => handleUpdateClick(item)}
//                                   className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-800/50 transition-colors"
//                                 >
//                                   <FiEdit2 className="h-4 w-4" />
//                                 </motion.button>
//                                 <motion.button
//                                   whileHover={{ scale: 1.1 }}
//                                   whileTap={{ scale: 0.9 }}
//                                   disabled={loadingId === item._id}
//                                   onClick={() => handleDeleteTask(item._id)}
//                                   className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors disabled:opacity-50"
//                                 >
//                                   {loadingId === item._id ? (
//                                     <FiRefreshCw className="h-4 w-4 animate-spin" />
//                                   ) : (
//                                     <FiTrash2 className="h-4 w-4" />
//                                   )}
//                                 </motion.button>
//                               </div>
//                             </div>

//                             {/* Task List */}
//                             <div className="space-y-3">
//                               {item.task.map((task, taskIdx) => (
//                                 <motion.div
//                                   key={taskIdx}
//                                   initial={{ opacity: 0, x: -20 }}
//                                   animate={{ opacity: 1, x: 0 }}
//                                   transition={{ delay: (idx * 0.1) + (taskIdx * 0.05) }}
//                                   className="flex items-start space-x-3 p-3 rounded-xl bg-gray-50/80 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50"
//                                 >
//                                   <div className="flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mt-0.5 flex-shrink-0">
//                                     {taskIdx + 1}
//                                   </div>
//                                   <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">
//                                     {task}
//                                   </p>
//                                 </motion.div>
//                               ))}
//                             </div>

//                             {/* Card Footer */}
//                             <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-600/50 flex items-center justify-between">
//                               <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
//                                 <FiBookmark className="h-3 w-3" />
//                                 <span>{item.task.length} task{item.task.length !== 1 ? 's' : ''}</span>
//                               </div>

//                               {!item.task_Date && (
//                                 <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600">
//                                   <FiAlertCircle className="mr-1 h-3 w-3" />
//                                   No date
//                                 </span>
//                               )}
//                             </div>
//                           </motion.div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Desktop Table View */}
//                     <div className={`${viewMode === 'cards' ? 'hidden lg:block' : 'hidden lg:block'}`}>
//                       <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl shadow-slate-900/5 dark:shadow-black/20 border border-gray-200/50 dark:border-gray-700/50">
//                         <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-6 px-8">
//                           <h2 className="text-2xl font-bold text-white flex items-center">
//                             <FiList className="mr-3 h-6 w-6" />
//                             Your Tasks
//                             {(filterDate || searchTerm) && (
//                               <span className="ml-3 text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
//                                 {filterDate && searchTerm
//                                   ? "Filtered & Searched"
//                                   : filterDate
//                                   ? "Date Filtered"
//                                   : "Searched"}
//                               </span>
//                             )}
//                           </h2>
//                         </div>

//                         <div className="overflow-x-auto">
//                           <table className="min-w-full divide-y divide-gray-200/50 dark:divide-gray-700/50">
//                             <thead className="bg-gray-50/80 dark:bg-gray-700/50 backdrop-blur-sm">
//                               <tr>
//                                 {["#", "First Task", "Total Tasks", "Date", "Status", "Actions"].map((header) => (
//                                   <th
//                                     key={header}
//                                     className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
//                                   >
//                                     {header}
//                                   </th>
//                                 ))}
//                               </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
//                               {currentTasks.map((item, idx) => (
//                                 <motion.tr
//                                   key={item._id}
//                                   initial={{ opacity: 0, y: 10 }}
//                                   animate={{ opacity: 1, y: 0 }}
//                                   transition={{ delay: idx * 0.05 }}
//                                   className="group hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 dark:hover:from-indigo-900/10 dark:hover:to-purple-900/10 transition-all duration-200"
//                                 >
//                                   <td className="px-6 py-4">
//                                     <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-bold text-sm shadow-lg">
//                                       {idx + 1 + startIndex}
//                                     </div>
//                                   </td>
//                                   <td className="px-6 py-4">
//                                     <div className="max-w-xs">
//                                       {item.task.length > 0 && (
//                                         <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50/80 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50">
//                                           <span className="flex items-center justify-center h-5 w-5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold flex-shrink-0 mt-0.5">
//                                             1
//                                           </span>
//                                           <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
//                                             {truncateText(item.task[0])}
//                                           </span>
//                                         </div>
//                                       )}
//                                     </div>
//                                   </td>
//                                   <td className="px-6 py-4">
//                                     <div className="flex items-center space-x-2">
//                                       <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700">
//                                         <FiList className="mr-1 h-3 w-3" />
//                                         {item.task.length} task{item.task.length !== 1 ? 's' : ''}
//                                       </span>
//                                       {item.task.length > 1 && (
//                                         <motion.button
//                                           whileHover={{ scale: 1.05 }}
//                                           whileTap={{ scale: 0.95 }}
//                                           onClick={() => openTaskDetailsModal(item)}
//                                           className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors border border-purple-200 dark:border-purple-700"
//                                         >
//                                           <FiMoreVertical className="mr-1 h-3 w-3" />
//                                           More
//                                         </motion.button>
//                                       )}
//                                     </div>
//                                   </td>
//                                   <td className="px-6 py-4">
//                                     {item.task_Date ? (
//                                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
//                                         isToday(item.task_Date)
//                                           ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700'
//                                           : isPastDue(item.task_Date)
//                                           ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700'
//                                           : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700'
//                                       }`}>
//                                         <FiCalendar className="mr-2 h-4 w-4" />
//                                         {formatDate(item.task_Date)}
//                                       </span>
//                                     ) : (
//                                       <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600">
//                                         <FiAlertCircle className="mr-2 h-4 w-4" />
//                                         No date set
//                                       </span>
//                                     )}
//                                   </td>
//                                   <td className="px-6 py-4">
//                                     {item.task_Date && (
//                                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
//                                         isToday(item.task_Date)
//                                           ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
//                                           : isPastDue(item.task_Date)
//                                           ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
//                                           : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
//                                       }`}>
//                                         {isToday(item.task_Date) ? (
//                                           <>
//                                             <FiClock className="mr-1 h-3 w-3" />
//                                             Today
//                                           </>
//                                         ) : isPastDue(item.task_Date) ? (
//                                           <>
//                                             <FiAlertCircle className="mr-1 h-3 w-3" />
//                                             Overdue
//                                           </>
//                                         ) : (
//                                           <>
//                                             <FiBookmark className="mr-1 h-3 w-3" />
//                                             Scheduled
//                                           </>
//                                         )}
//                                       </span>
//                                     )}
//                                   </td>
//                                   <td className="px-6 py-4">
//                                     <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                                       <motion.button
//                                         whileHover={{ scale: 1.1 }}
//                                         whileTap={{ scale: 0.9 }}
//                                         onClick={() => handleUpdateClick(item)}
//                                         className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-800/40 transition-all duration-200 border border-amber-200 dark:border-amber-700"
//                                       >
//                                         <FiEdit2 className="mr-1 h-4 w-4" />
//                                         Edit
//                                       </motion.button>
//                                       <motion.button
//                                         whileHover={{ scale: 1.1 }}
//                                         whileTap={{ scale: 0.9 }}
//                                         disabled={loadingId === item._id}
//                                         onClick={() => handleDeleteTask(item._id)}
//                                         className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800/40 transition-all duration-200 disabled:opacity-50 border border-red-200 dark:border-red-700"
//                                       >
//                                         {loadingId === item._id ? (
//                                           <FiRefreshCw className="mr-1 h-4 w-4 animate-spin" />
//                                         ) : (
//                                           <FiTrash2 className="mr-1 h-4 w-4" />
//                                         )}
//                                         Delete
//                                       </motion.button>
//                                     </div>
//                                   </td>
//                                 </motion.tr>
//                               ))}
//                             </tbody>
//                           </table>
//                         </div>
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   /* Empty State */
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-12 lg:p-20 text-center shadow-xl shadow-slate-900/5 dark:shadow-black/20 border border-gray-200/50 dark:border-gray-700/50"
//                   >
//                     <motion.div
//                       initial={{ y: 20 }}
//                       animate={{ y: 0 }}
//                       transition={{ delay: 0.2 }}
//                       className="flex flex-col items-center"
//                     >
//                       <div className="h-24 w-24 lg:h-32 lg:w-32 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center text-indigo-500 dark:text-indigo-400 mb-6 shadow-lg">
//                         <FiLayout className="h-12 w-12 lg:h-16 lg:w-16" />
//                       </div>
//                       <h3 className="text-2xl lg:text-3xl font-bold text-gray-700 dark:text-gray-200 mb-2">
//                         No tasks found
//                       </h3>
//                       <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md leading-relaxed">
//                         {filterDate || searchTerm
//                           ? "No tasks match your current filters. Try adjusting your search criteria or "
//                           : "Ready to boost your productivity? "}
//                         <span className="font-semibold text-indigo-600 dark:text-indigo-400">
//                           Create your first task to get started!
//                         </span>
//                       </p>
//                       <div className="flex flex-col sm:flex-row gap-3">
//                         {(filterDate || searchTerm) && (
//                           <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={clearFilters}
//                             className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 border border-gray-200 dark:border-gray-600"
//                           >
//                             <FiX className="mr-2 h-4 w-4" />
//                             Clear Filters
//                           </motion.button>
//                         )}
//                         <motion.button
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={openAddTaskModal}
//                           className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg shadow-indigo-500/25"
//                         >
//                           <FiPlus className="mr-2 h-4 w-4" />
//                           Add Your First Task
//                         </motion.button>
//                       </div>
//                     </motion.div>
//                   </motion.div>
//                 )}
//               </motion.div>
//             </AnimatePresence>
//           )}

//           {/* PAGINATION */}
//           {totalItems > 0 && (
//             <motion.div
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.4 }}
//               className="mt-8"
//             >
//               <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/5 dark:shadow-black/20 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
//                 <div className="py-4 px-6 flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
//                   <div className="text-sm text-gray-500 dark:text-gray-400 text-center lg:text-left">
//                     Showing{" "}
//                     <span className="font-semibold text-gray-700 dark:text-gray-300">
//                       {startIndex + 1}
//                     </span>{" "}
//                     to{" "}
//                     <span className="font-semibold text-gray-700 dark:text-gray-300">
//                       {Math.min(indexOfLastTask, totalItems)}
//                     </span>{" "}
//                     of{" "}
//                     <span className="font-semibold text-gray-700 dark:text-gray-300">
//                       {totalItems}
//                     </span>{" "}
//                     tasks
//                   </div>

//                   <div className="flex items-center space-x-2">
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => goToPage(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className="inline-flex items-center px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-700/80 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 backdrop-blur-sm"
//                     >
//                       <FiChevronLeft className="mr-1 h-4 w-4" />
//                       <span className="hidden sm:inline">Previous</span>
//                       <span className="sm:hidden">Prev</span>
//                     </motion.button>

//                     <div className="flex items-center rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm">
//                       <input
//                         type="number"
//                         min="1"
//                         max={totalPages}
//                         value={manualPage}
//                         onChange={(e) =>
//                           setManualPage(parseInt(e.target.value, 10) || "")
//                         }
//                         onKeyDown={(e) => {
//                           if (e.key === "Enter") goToPage(Number(manualPage));
//                         }}
//                         onBlur={() => goToPage(Number(manualPage))}
//                         className="w-16 text-center border-none py-2 bg-transparent text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                       />
//                       <span className="bg-gray-100 dark:bg-gray-600 px-3 py-2 text-gray-500 dark:text-gray-400 text-sm font-medium">
//                         / {totalPages}
//                       </span>
//                     </div>

//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => goToPage(currentPage + 1)}
//                       disabled={currentPage === totalPages || totalPages === 0}
//                       className="inline-flex items-center px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-700/80 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 backdrop-blur-sm"
//                     >
//                       <span className="hidden sm:inline">Next</span>
//                       <span className="sm:hidden">Next</span>
//                       <FiChevronRight className="ml-1 h-4 w-4" />
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </motion.div>
//       </div>

//       {/* ADD / EDIT MODAL */}
//       <TaskModal
//         isOpen={isModalOpen}
//         onClose={handleCancelEdit}
//         taskList={taskList}
//         taskDate={taskDate}
//         setTaskDate={setTaskDate}
//         handleAddTaskInput={handleAddTaskInput}
//         handleDeleteTaskInput={handleDeleteTaskInput}
//         handleChange={handleChange}
//         handleSubmit={handleSubmit}
//         loading={loading}
//         editMode={editMode}
//       />

//       {/* TASK DETAILS MODAL */}
//       <AnimatePresence>
//         {detailModalOpen && selectedTaskDetails && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
//             onClick={closeTaskDetailsModal}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: "spring", stiffness: 300, damping: 30 }}
//               className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {/* Modal Header */}
//               <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-4 flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <div className="bg-white/20 p-2 rounded-lg">
//                     <FiList className="h-6 w-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold text-white">Task Details</h3>
//                     <p className="text-white/80 text-sm">
//                       {selectedTaskDetails.task.length} task{selectedTaskDetails.task.length !== 1 ? 's' : ''}
//                       {selectedTaskDetails.task_Date && ` • ${formatDate(selectedTaskDetails.task_Date)}`}
//                     </p>
//                   </div>
//                 </div>
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={closeTaskDetailsModal}
//                   className="p-2 hover:bg-white/20 rounded-lg transition-colors"
//                 >
//                   <FiX className="h-6 w-6 text-white" />
//                 </motion.button>
//               </div>

//               {/* Modal Content */}
//               <div className="p-6 max-h-96 overflow-y-auto">
//                 <div className="space-y-4">
//                   {selectedTaskDetails.task.map((task, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                       className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600"
//                     >
//                       <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-bold text-sm flex-shrink-0">
//                         {index + 1}
//                       </div>
//                       <div className="flex-grow">
//                         <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
//                           Task {index + 1}
//                         </h4>
//                         <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
//                           {task}
//                         </p>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>

//               {/* Modal Footer */}
//               <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 bg-gray-50 dark:bg-gray-750">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
//                     {selectedTaskDetails.task_Date && (
//                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
//                         isToday(selectedTaskDetails.task_Date)
//                           ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
//                           : isPastDue(selectedTaskDetails.task_Date)
//                           ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
//                           : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
//                       }`}>
//                         <FiCalendar className="mr-1 h-3 w-3" />
//                         {formatDate(selectedTaskDetails.task_Date)}
//                       </span>
//                     )}
//                     <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
//                       <FiBookmark className="mr-1 h-3 w-3" />
//                       {selectedTaskDetails.task.length} task{selectedTaskDetails.task.length !== 1 ? 's' : ''}
//                     </span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => {
//                         closeTaskDetailsModal();
//                         handleUpdateClick(selectedTaskDetails);
//                       }}
//                       className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800/50 transition-colors border border-amber-200 dark:border-amber-700"
//                     >
//                       <FiEdit2 className="mr-2 h-4 w-4" />
//                       Edit Tasks
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={closeTaskDetailsModal}
//                       className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
//                     >
//                       Close
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// import { useState, useEffect, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   addTask,
//   fetchAllTasks,
//   deleteTask,
//   updateTaskdaily,
// } from "../../../service/taskService";
// import { toast } from "react-hot-toast";
// import {
//   FiPlus,
//   FiTrash2,
//   FiEdit2,
//   FiCalendar,
//   FiX,
//   FiChevronLeft,
//   FiChevronRight,
//   FiCheck,
//   FiList,
//   FiRefreshCw,
//   FiAlertCircle,
//   FiSearch,
//   FiGrid,
//   FiFilter,
//   FiChevronDown,
//   FiClock,
//   FiTarget,
//   FiTrendingUp,
//   FiLayout,
//   FiMenu,
//   FiZap,
//   FiStar,
//   FiBookmark,
//   FiMoreVertical,
// } from "react-icons/fi";
// import TaskModal from "./TaskModal";

// export default function UpdateTask() {
//   /* ---------- state ---------- */
//   const todayString = new Date().toISOString().substring(0, 10);

//   const [taskList, setTaskList] = useState([""]);
//   const [taskDate, setTaskDate] = useState("");

//   const [fetchedTasks, setFetchedTasks] = useState([]);
//   const [filteredTasks, setFilteredTasks] = useState([]);

//   const [filterDate, setFilterDate] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [loadingId, setLoadingId] = useState(null);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [manualPage, setManualPage] = useState(1);
//   const tasksPerPage = 10;

//   const [editMode, setEditMode] = useState(false);
//   const [editTaskId, setEditTaskId] = useState(null);
//   const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
//   const [showFilters, setShowFilters] = useState(false);
//   const [detailModalOpen, setDetailModalOpen] = useState(false);
//   const [selectedTaskDetails, setSelectedTaskDetails] = useState(null);

//   /* ---------- fetch ---------- */
//   const fetchTasks = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await fetchAllTasks();
//       if (res?.success) setFetchedTasks(res.data);
//       else toast.error(res?.message || "Failed to fetch tasks.");
//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong fetching tasks.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchTasks();
//   }, [fetchTasks]);

//   /* ---------- filter ---------- */
//   useEffect(() => {
//     let list = fetchedTasks;
//     if (filterDate) list = list.filter((t) => t.task_Date === filterDate);
//     if (searchTerm)
//       list = list.filter((t) =>
//         t.task.some((x) =>
//           x.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     setFilteredTasks(list);
//     setCurrentPage(1);
//     setManualPage(1);
//   }, [fetchedTasks, filterDate, searchTerm]);

//   /* ---------- pagination ---------- */
//   const indexOfLastTask = currentPage * tasksPerPage;
//   const indexOfFirstTask = indexOfLastTask - tasksPerPage;
//   const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
//   const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
//   const totalItems = filteredTasks.length;
//   const startIndex = indexOfFirstTask;

//   const goToPage = (p) => {
//     if (p < 1 || p > totalPages) return;
//     setCurrentPage(p);
//     setManualPage(p);
//   };

//   /* ---------- modal handlers ---------- */
//   const openAddTaskModal = () => {
//     setTaskList([""]);
//     setTaskDate(todayString);
//     setEditMode(false);
//     setEditTaskId(null);
//     setIsModalOpen(true);
//   };

//   const handleCancelEdit = () => {
//     setTaskList([""]);
//     setTaskDate("");
//     setEditMode(false);
//     setEditTaskId(null);
//     setIsModalOpen(false);
//     toast("Task operation cancelled", {
//       icon: "🔄",
//       style: { borderRadius: "16px", background: "#333", color: "#fff" },
//     });
//   };

//   const handleAddTaskInput = () => setTaskList((prev) => [...prev, ""]);
//   const handleDeleteTaskInput = (idx) =>
//     setTaskList((prev) => prev.filter((_, i) => i !== idx));
//   const handleChange = (idx, val) =>
//     setTaskList((prev) => prev.map((t, i) => (i === idx ? val : t)));

//   /* ---------- submit ---------- */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const nonEmpty = taskList.filter((t) => t.trim().length);
//     if (!nonEmpty.length) return toast.error("Please enter at least one task.");
//     if (!taskDate) return toast.error("Please select a date for this task.");

//     const payload = { task: nonEmpty, task_Date: taskDate };
//     setLoading(true);
//     try {
//       const res = editMode
//         ? await updateTaskdaily(editTaskId, payload)
//         : await addTask(payload);
//       if (res?.success) {
//         toast.success(res.message || "Operation successful!");
//         setTaskList([""]);
//         setTaskDate("");
//         setEditMode(false);
//         setEditTaskId(null);
//         setIsModalOpen(false);
//         fetchTasks();
//       } else toast.error(res?.message || "Operation failed.");
//     } catch (err) {
//       console.error(err);
//       toast.error("Submission failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------- delete ---------- */
//   const handleDeleteTask = async (id) => {
//     setLoadingId(id);
//     try {
//       const res = await deleteTask(id);
//       if (res?.success) {
//         toast.success(res.message || "Task deleted!");
//         fetchTasks();
//       } else toast.error(res?.message || "Delete failed.");
//     } catch (err) {
//       console.error(err);
//       toast.error("Delete failed. Please try again.");
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   /* ---------- edit ---------- */
//   const handleUpdateClick = (item) => {
//     setTaskList(item.task);
//     setTaskDate(item.task_Date || todayString);
//     setEditTaskId(item._id);
//     setEditMode(true);
//     setIsModalOpen(true);
//   };

//   const clearFilters = () => {
//     setFilterDate("");
//     setSearchTerm("");
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "No date";
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   const isToday = (dateString) => {
//     return dateString === todayString;
//   };

//   const isPastDue = (dateString) => {
//     return dateString && dateString < todayString;
//   };

//   const truncateText = (text, maxLength = 50) => {
//     if (text.length <= maxLength) return text;
//     return text.substring(0, maxLength) + '...';
//   };

//   const openTaskDetailsModal = (task) => {
//     setSelectedTaskDetails(task);
//     setDetailModalOpen(true);
//   };

//   const closeTaskDetailsModal = () => {
//     setSelectedTaskDetails(null);
//     setDetailModalOpen(false);
//   };

//   /* ---------- UI ---------- */
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 text-gray-800 dark:text-gray-100 transition-all duration-500">
//       {/* HEADER */}
//       <motion.div
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 z-30 shadow-lg shadow-slate-900/5 dark:shadow-black/20"
//       >
//         <div className="mx-auto py-4 px-4 sm:px-6 lg:px-8 max-w-7xl">
//           <div className="flex items-center justify-between">
//             <motion.div
//               className="flex items-center space-x-3"
//               whileHover={{ scale: 1.02 }}
//               transition={{ type: "spring", stiffness: 400, damping: 17 }}
//             >
//               <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-3 shadow-lg shadow-indigo-500/25 dark:shadow-indigo-500/20">
//                 <FiZap className="h-6 w-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
//                   TaskFlow Pro
//                 </h1>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
//                   Organize • Execute • Achieve
//                 </p>
//               </div>
//             </motion.div>

//             <div className="flex items-center space-x-2 sm:space-x-3">
//               {/* View Toggle - Hidden on mobile */}
//               <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1 border border-gray-200 dark:border-gray-700">
//                 <button
//                   onClick={() => setViewMode('cards')}
//                   className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                     viewMode === 'cards'
//                       ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
//                       : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
//                   }`}
//                 >
//                   <FiGrid className="h-4 w-4 mr-1" />
//                   Cards
//                 </button>
//                 <button
//                   onClick={() => setViewMode('table')}
//                   className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                     viewMode === 'table'
//                       ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
//                       : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
//                   }`}
//                 >
//                   <FiList className="h-4 w-4 mr-1" />
//                   Table
//                 </button>
//               </div>

//               <motion.button
//                 onClick={fetchTasks}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 text-indigo-600 dark:text-indigo-400 border border-gray-200 dark:border-gray-700"
//                 title="Refresh tasks"
//               >
//                 <FiRefreshCw
//                   className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`}
//                 />
//               </motion.button>

//               <motion.button
//                 onClick={openAddTaskModal}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="inline-flex items-center px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-500/25 text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-sm font-semibold transition-all duration-200 border border-indigo-500/20"
//               >
//                 <FiPlus className="mr-2 h-5 w-5" />
//                 <span className="hidden sm:inline">Add Task</span>
//                 <span className="sm:hidden">Add</span>
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* MAIN CONTENT */}
//       <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-7xl">

//         {/* STATS CARDS */}
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.1 }}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8"
//         >
//           <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 lg:p-6 rounded-2xl text-white shadow-lg shadow-blue-500/25">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-blue-100 text-sm font-medium">Total Tasks</p>
//                 <p className="text-2xl lg:text-3xl font-bold">{fetchedTasks.length}</p>
//               </div>
//               <FiTarget className="h-8 w-8 text-blue-200" />
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 lg:p-6 rounded-2xl text-white shadow-lg shadow-emerald-500/25">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-emerald-100 text-sm font-medium">Today's Tasks</p>
//                 <p className="text-2xl lg:text-3xl font-bold">
//                   {fetchedTasks.filter(task => isToday(task.task_Date)).length}
//                 </p>
//               </div>
//               <FiClock className="h-8 w-8 text-emerald-200" />
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-4 lg:p-6 rounded-2xl text-white shadow-lg shadow-amber-500/25">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-amber-100 text-sm font-medium">Overdue</p>
//                 <p className="text-2xl lg:text-3xl font-bold">
//                   {fetchedTasks.filter(task => isPastDue(task.task_Date)).length}
//                 </p>
//               </div>
//               <FiAlertCircle className="h-8 w-8 text-amber-200" />
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 lg:p-6 rounded-2xl text-white shadow-lg shadow-purple-500/25">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-purple-100 text-sm font-medium">Filtered</p>
//                 <p className="text-2xl lg:text-3xl font-bold">{filteredTasks.length}</p>
//               </div>
//               <FiTrendingUp className="h-8 w-8 text-purple-200" />
//             </div>
//           </div>
//         </motion.div>

//         {/* FILTER / SEARCH */}
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="mb-6 lg:mb-8"
//         >
//           <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/5 dark:shadow-black/20 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
//             {/* Mobile Filter Toggle */}
//             <div className="md:hidden bg-gradient-to-r from-indigo-500 to-purple-500 p-4">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center justify-between w-full text-white"
//               >
//                 <span className="flex items-center text-sm font-semibold">
//                   <FiFilter className="mr-2 h-4 w-4" />
//                   Filters & Search
//                 </span>
//                 <FiChevronDown className={`h-5 w-5 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
//               </button>
//             </div>

//             {/* Filter Content */}
//             <div className={`p-4 lg:p-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
//               <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
//                 {/* Search */}
//                 <div className="relative flex-grow lg:max-w-md">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <FiSearch className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     placeholder="Search your tasks..."
//                     className="block w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
//                   />
//                 </div>

//                 {/* Date Filter & Actions */}
//                 <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
//                   <div className="relative">
//                     <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
//                     <input
//                       type="date"
//                       value={filterDate}
//                       onChange={(e) => setFilterDate(e.target.value)}
//                       className="pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 w-full sm:w-auto"
//                     />
//                   </div>

//                   {(filterDate || searchTerm) && (
//                     <motion.button
//                       initial={{ scale: 0, opacity: 0 }}
//                       animate={{ scale: 1, opacity: 1 }}
//                       onClick={clearFilters}
//                       className="inline-flex items-center justify-center px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white/80 dark:bg-gray-700/80 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 backdrop-blur-sm"
//                     >
//                       <FiX className="mr-2 h-4 w-4" />
//                       Clear All
//                     </motion.button>
//                   )}
//                 </div>
//               </div>

//               {/* Active Filters */}
//               {(filterDate || searchTerm) && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: 'auto', opacity: 1 }}
//                   className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
//                 >
//                   <div className="flex flex-wrap gap-2">
//                     {searchTerm && (
//                       <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700">
//                         <FiSearch className="mr-1 h-3 w-3" />
//                         "{searchTerm}"
//                       </span>
//                     )}
//                     {filterDate && (
//                       <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700">
//                         <FiCalendar className="mr-1 h-3 w-3" />
//                         {formatDate(filterDate)}
//                       </span>
//                     )}
//                   </div>
//                 </motion.div>
//               )}
//             </div>
//           </div>
//         </motion.div>

//         {/* TASKS CONTENT */}
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           {loading && !loadingId ? (
//             <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-12 lg:p-20 text-center shadow-xl shadow-slate-900/5 dark:shadow-black/20 border border-gray-200/50 dark:border-gray-700/50">
//               <div className="flex flex-col items-center">
//                 <div className="relative">
//                   <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 dark:border-indigo-800"></div>
//                   <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-indigo-500 absolute top-0"></div>
//                 </div>
//                 <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 font-medium">
//                   Loading your tasks...
//                 </p>
//                 <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
//                   This won't take long
//                 </p>
//               </div>
//             </div>
//           ) : (
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={`${viewMode}-${currentPage}`}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.4, ease: "easeInOut" }}
//               >
//                 {currentTasks.length ? (
//                   <>
//                     {/* Mobile & Tablet Card View */}
//                     <div className={`${viewMode === 'table' ? 'hidden' : 'block lg:hidden'}`}>
//                       <div className="grid grid-cols-1 gap-4 sm:gap-6">
//                         {currentTasks.map((item, idx) => (
//                           <motion.div
//                             key={item._id}
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: idx * 0.1 }}
//                             className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg shadow-slate-900/5 dark:shadow-black/20 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:shadow-slate-900/10 dark:hover:shadow-black/30 transition-all duration-300 hover:-translate-y-1"
//                           >
//                             {/* Card Header */}
//                             <div className="flex items-start justify-between mb-4">
//                               <div className="flex items-center space-x-3">
//                                 <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-bold text-sm shadow-lg">
//                                   #{idx + 1 + startIndex}
//                                 </div>
//                                 <div>
//                                   <div className="flex items-center space-x-2">
//                                     {item.task_Date && (
//                                       <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//                                         isToday(item.task_Date)
//                                           ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700'
//                                           : isPastDue(item.task_Date)
//                                           ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700'
//                                           : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700'
//                                       }`}>
//                                         <FiCalendar className="mr-1 h-3 w-3" />
//                                         {formatDate(item.task_Date)}
//                                       </span>
//                                     )}
//                                   </div>
//                                 </div>
//                               </div>

//                               <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                                 <motion.button
//                                   whileHover={{ scale: 1.1 }}
//                                   whileTap={{ scale: 0.9 }}
//                                   onClick={() => handleUpdateClick(item)}
//                                   className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-800/50 transition-colors"
//                                 >
//                                   <FiEdit2 className="h-4 w-4" />
//                                 </motion.button>
//                                 <motion.button
//                                   whileHover={{ scale: 1.1 }}
//                                   whileTap={{ scale: 0.9 }}
//                                   disabled={loadingId === item._id}
//                                   onClick={() => handleDeleteTask(item._id)}
//                                   className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors disabled:opacity-50"
//                                 >
//                                   {loadingId === item._id ? (
//                                     <FiRefreshCw className="h-4 w-4 animate-spin" />
//                                   ) : (
//                                     <FiTrash2 className="h-4 w-4" />
//                                   )}
//                                 </motion.button>
//                               </div>
//                             </div>

//                             {/* Task List */}
//                             <div className="space-y-3">
//                               {item.task.map((task, taskIdx) => (
//                                 <motion.div
//                                   key={taskIdx}
//                                   initial={{ opacity: 0, x: -20 }}
//                                   animate={{ opacity: 1, x: 0 }}
//                                   transition={{ delay: (idx * 0.1) + (taskIdx * 0.05) }}
//                                   className="flex items-start space-x-3 p-3 rounded-xl bg-gray-50/80 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50"
//                                 >
//                                   <div className="flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mt-0.5 flex-shrink-0">
//                                     {taskIdx + 1}
//                                   </div>
//                                   <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">
//                                     {task}
//                                   </p>
//                                 </motion.div>
//                               ))}
//                             </div>

//                             {/* Card Footer */}
//                             <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-600/50 flex items-center justify-between">
//                               <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
//                                 <FiBookmark className="h-3 w-3" />
//                                 <span>{item.task.length} task{item.task.length !== 1 ? 's' : ''}</span>
//                               </div>

//                               {!item.task_Date && (
//                                 <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600">
//                                   <FiAlertCircle className="mr-1 h-3 w-3" />
//                                   No date
//                                 </span>
//                               )}
//                             </div>
//                           </motion.div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Desktop View Toggle */}
//                     <div className={`${viewMode === 'cards' ? 'hidden lg:block' : 'hidden'}`}>
//                       <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
//                         {currentTasks.map((item, idx) => (
//                           <motion.div
//                             key={item._id}
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: idx * 0.1 }}
//                             className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl shadow-slate-900/10 dark:shadow-black/30 border border-gray-200/60 dark:border-gray-700/60 hover:shadow-2xl hover:shadow-slate-900/20 dark:hover:shadow-black/40 transition-all duration-300 hover:-translate-y-1"
//                           >
//                             {/* Card Header */}
//                             <div className="flex items-start justify-between mb-6">
//                               <div className="flex items-center space-x-4">
//                                 <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-lg shadow-lg shadow-indigo-500/25">
//                                   #{idx + 1 + startIndex}
//                                 </div>
//                                 <div className="flex flex-col">
//                                   {item.task_Date && (
//                                     <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-semibold mb-2 ${
//                                       isToday(item.task_Date)
//                                         ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700'
//                                         : isPastDue(item.task_Date)
//                                         ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700'
//                                         : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700'
//                                     }`}>
//                                       <FiCalendar className="mr-2 h-4 w-4" />
//                                       {formatDate(item.task_Date)}
//                                     </span>
//                                   )}
//                                   <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700">
//                                     <FiList className="mr-1 h-3 w-3" />
//                                     {item.task.length} task{item.task.length !== 1 ? 's' : ''}
//                                   </span>
//                                 </div>
//                               </div>

//                               <div className="flex items-center space-x-2">
//                                 <motion.button
//                                   whileHover={{ scale: 1.1 }}
//                                   whileTap={{ scale: 0.9 }}
//                                   onClick={() => handleUpdateClick(item)}
//                                   className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-800/50 transition-all duration-200 border border-amber-200 dark:border-amber-700 shadow-lg shadow-amber-500/10"
//                                 >
//                                   <FiEdit2 className="h-5 w-5" />
//                                 </motion.button>
//                                 <motion.button
//                                   whileHover={{ scale: 1.1 }}
//                                   whileTap={{ scale: 0.9 }}
//                                   disabled={loadingId === item._id}
//                                   onClick={() => handleDeleteTask(item._id)}
//                                   className="p-3 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/50 transition-all duration-200 disabled:opacity-50 border border-red-200 dark:border-red-700 shadow-lg shadow-red-500/10"
//                                 >
//                                   {loadingId === item._id ? (
//                                     <FiRefreshCw className="h-5 w-5 animate-spin" />
//                                   ) : (
//                                     <FiTrash2 className="h-5 w-5" />
//                                   )}
//                                 </motion.button>
//                               </div>
//                             </div>

//                             {/* Task List */}
//                             <div className="space-y-3 mb-6">
//                               {item.task.slice(0, 3).map((task, taskIdx) => (
//                                 <motion.div
//                                   key={taskIdx}
//                                   initial={{ opacity: 0, x: -20 }}
//                                   animate={{ opacity: 1, x: 0 }}
//                                   transition={{ delay: (idx * 0.1) + (taskIdx * 0.05) }}
//                                   className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-700/50 dark:to-gray-700/30 border border-gray-200/60 dark:border-gray-600/40 backdrop-blur-sm"
//                                 >
//                                   <div className="flex items-center justify-center h-7 w-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-sm font-bold flex-shrink-0 mt-0.5 shadow-lg">
//                                     {taskIdx + 1}
//                                   </div>
//                                   <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-grow font-medium">
//                                     {task}
//                                   </p>
//                                 </motion.div>
//                               ))}

//                               {item.task.length > 3 && (
//                                 <motion.button
//                                   whileHover={{ scale: 1.02 }}
//                                   whileTap={{ scale: 0.98 }}
//                                   onClick={() => openTaskDetailsModal(item)}
//                                   className="w-full p-4 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:from-purple-100 hover:to-indigo-100 dark:hover:from-purple-800/30 dark:hover:to-indigo-800/30 transition-all duration-200 font-medium"
//                                 >
//                                   <div className="flex items-center justify-center space-x-2">
//                                     <FiMoreVertical className="h-4 w-4" />
//                                     <span>View {item.task.length - 3} more task{item.task.length - 3 !== 1 ? 's' : ''}</span>
//                                   </div>
//                                 </motion.button>
//                               )}
//                             </div>

//                             {/* Card Footer */}
//                             <div className="pt-4 border-t border-gray-200/60 dark:border-gray-600/40 flex items-center justify-between">
//                               <div className="flex items-center space-x-3">
//                                 {!item.task_Date && (
//                                   <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600">
//                                     <FiAlertCircle className="mr-1.5 h-3 w-3" />
//                                     No date set
//                                   </span>
//                                 )}
//                                 {item.task_Date && (
//                                   <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
//                                     isToday(item.task_Date)
//                                       ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
//                                       : isPastDue(item.task_Date)
//                                       ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
//                                       : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
//                                   }`}>
//                                     {isToday(item.task_Date) ? (
//                                       <>
//                                         <FiClock className="mr-1.5 h-3 w-3" />
//                                         Due Today
//                                       </>
//                                     ) : isPastDue(item.task_Date) ? (
//                                       <>
//                                         <FiAlertCircle className="mr-1.5 h-3 w-3" />
//                                         Overdue
//                                       </>
//                                     ) : (
//                                       <>
//                                         <FiBookmark className="mr-1.5 h-3 w-3" />
//                                         Scheduled
//                                       </>
//                                     )}
//                                   </span>
//                                 )}
//                               </div>
//                             </div>
//                           </motion.div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Desktop Table View */}
//                     <div className={`${viewMode === 'table' ? 'hidden lg:block' : 'hidden'}`}>
//                       <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl shadow-slate-900/5 dark:shadow-black/20 border border-gray-200/50 dark:border-gray-700/50">
//                         <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-6 px-8">
//                           <h2 className="text-2xl font-bold text-white flex items-center">
//                             <FiList className="mr-3 h-6 w-6" />
//                             Your Tasks
//                             {(filterDate || searchTerm) && (
//                               <span className="ml-3 text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
//                                 {filterDate && searchTerm
//                                   ? "Filtered & Searched"
//                                   : filterDate
//                                   ? "Date Filtered"
//                                   : "Searched"}
//                               </span>
//                             )}
//                           </h2>
//                         </div>

//                         <div className="overflow-x-auto">
//                           <table className="min-w-full divide-y divide-gray-200/50 dark:divide-gray-700/50">
//                             <thead className="bg-gray-50/80 dark:bg-gray-700/50 backdrop-blur-sm">
//                               <tr>
//                                 {["#", "First Task", "Total Tasks", "Date", "Status", "Actions"].map((header) => (
//                                   <th
//                                     key={header}
//                                     className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
//                                   >
//                                     {header}
//                                   </th>
//                                 ))}
//                               </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
//                               {currentTasks.map((item, idx) => (
//                                 <motion.tr
//                                   key={item._id}
//                                   initial={{ opacity: 0, y: 10 }}
//                                   animate={{ opacity: 1, y: 0 }}
//                                   transition={{ delay: idx * 0.05 }}
//                                   className="group hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 dark:hover:from-indigo-900/10 dark:hover:to-purple-900/10 transition-all duration-200"
//                                 >
//                                   <td className="px-6 py-4">
//                                     <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-bold text-sm shadow-lg">
//                                       {idx + 1 + startIndex}
//                                     </div>
//                                   </td>
//                                   <td className="px-6 py-4">
//                                     <div className="max-w-xs">
//                                       {item.task.length > 0 && (
//                                         <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50/80 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50">
//                                           <span className="flex items-center justify-center h-5 w-5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold flex-shrink-0 mt-0.5">
//                                             1
//                                           </span>
//                                           <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
//                                             {truncateText(item.task[0])}
//                                           </span>
//                                         </div>
//                                       )}
//                                     </div>
//                                   </td>
//                                   <td className="px-6 py-4">
//                                     <div className="flex items-center space-x-2">
//                                       <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700">
//                                         <FiList className="mr-1 h-3 w-3" />
//                                         {item.task.length} task{item.task.length !== 1 ? 's' : ''}
//                                       </span>
//                                       {item.task.length > 1 && (
//                                         <motion.button
//                                           whileHover={{ scale: 1.05 }}
//                                           whileTap={{ scale: 0.95 }}
//                                           onClick={() => openTaskDetailsModal(item)}
//                                           className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors border border-purple-200 dark:border-purple-700"
//                                         >
//                                           <FiMoreVertical className="mr-1 h-3 w-3" />
//                                           More
//                                         </motion.button>
//                                       )}
//                                     </div>
//                                   </td>
//                                   <td className="px-6 py-4">
//                                     {item.task_Date ? (
//                                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
//                                         isToday(item.task_Date)
//                                           ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700'
//                                           : isPastDue(item.task_Date)
//                                           ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700'
//                                           : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700'
//                                       }`}>
//                                         <FiCalendar className="mr-2 h-4 w-4" />
//                                         {formatDate(item.task_Date)}
//                                       </span>
//                                     ) : (
//                                       <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600">
//                                         <FiAlertCircle className="mr-2 h-4 w-4" />
//                                         No date set
//                                       </span>
//                                     )}
//                                   </td>
//                                   <td className="px-6 py-4">
//                                     {item.task_Date && (
//                                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
//                                         isToday(item.task_Date)
//                                           ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
//                                           : isPastDue(item.task_Date)
//                                           ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
//                                           : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
//                                       }`}>
//                                         {isToday(item.task_Date) ? (
//                                           <>
//                                             <FiClock className="mr-1 h-3 w-3" />
//                                             Today
//                                           </>
//                                         ) : isPastDue(item.task_Date) ? (
//                                           <>
//                                             <FiAlertCircle className="mr-1 h-3 w-3" />
//                                             Overdue
//                                           </>
//                                         ) : (
//                                           <>
//                                             <FiBookmark className="mr-1 h-3 w-3" />
//                                             Scheduled
//                                           </>
//                                         )}
//                                       </span>
//                                     )}
//                                   </td>
//                                   <td className="px-6 py-4">
//                                     <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                                       <motion.button
//                                         whileHover={{ scale: 1.1 }}
//                                         whileTap={{ scale: 0.9 }}
//                                         onClick={() => handleUpdateClick(item)}
//                                         className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-800/40 transition-all duration-200 border border-amber-200 dark:border-amber-700"
//                                       >
//                                         <FiEdit2 className="mr-1 h-4 w-4" />
//                                         Edit
//                                       </motion.button>
//                                       <motion.button
//                                         whileHover={{ scale: 1.1 }}
//                                         whileTap={{ scale: 0.9 }}
//                                         disabled={loadingId === item._id}
//                                         onClick={() => handleDeleteTask(item._id)}
//                                         className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800/40 transition-all duration-200 disabled:opacity-50 border border-red-200 dark:border-red-700"
//                                       >
//                                         {loadingId === item._id ? (
//                                           <FiRefreshCw className="mr-1 h-4 w-4 animate-spin" />
//                                         ) : (
//                                           <FiTrash2 className="mr-1 h-4 w-4" />
//                                         )}
//                                         Delete
//                                       </motion.button>
//                                     </div>
//                                   </td>
//                                 </motion.tr>
//                               ))}
//                             </tbody>
//                           </table>
//                         </div>
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   /* Empty State */
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-12 lg:p-20 text-center shadow-xl shadow-slate-900/5 dark:shadow-black/20 border border-gray-200/50 dark:border-gray-700/50"
//                   >
//                     <motion.div
//                       initial={{ y: 20 }}
//                       animate={{ y: 0 }}
//                       transition={{ delay: 0.2 }}
//                       className="flex flex-col items-center"
//                     >
//                       <div className="h-24 w-24 lg:h-32 lg:w-32 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center text-indigo-500 dark:text-indigo-400 mb-6 shadow-lg">
//                         <FiLayout className="h-12 w-12 lg:h-16 lg:w-16" />
//                       </div>
//                       <h3 className="text-2xl lg:text-3xl font-bold text-gray-700 dark:text-gray-200 mb-2">
//                         No tasks found
//                       </h3>
//                       <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md leading-relaxed">
//                         {filterDate || searchTerm
//                           ? "No tasks match your current filters. Try adjusting your search criteria or "
//                           : "Ready to boost your productivity? "}
//                         <span className="font-semibold text-indigo-600 dark:text-indigo-400">
//                           Create your first task to get started!
//                         </span>
//                       </p>
//                       <div className="flex flex-col sm:flex-row gap-3">
//                         {(filterDate || searchTerm) && (
//                           <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={clearFilters}
//                             className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 border border-gray-200 dark:border-gray-600"
//                           >
//                             <FiX className="mr-2 h-4 w-4" />
//                             Clear Filters
//                           </motion.button>
//                         )}
//                         <motion.button
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={openAddTaskModal}
//                           className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg shadow-indigo-500/25"
//                         >
//                           <FiPlus className="mr-2 h-4 w-4" />
//                           Add Your First Task
//                         </motion.button>
//                       </div>
//                     </motion.div>
//                   </motion.div>
//                 )}
//               </motion.div>
//             </AnimatePresence>
//           )}

//           {/* PAGINATION */}
//           {totalItems > 0 && (
//             <motion.div
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.4 }}
//               className="mt-8"
//             >
//               <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/5 dark:shadow-black/20 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
//                 <div className="py-4 px-6 flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
//                   <div className="text-sm text-gray-500 dark:text-gray-400 text-center lg:text-left">
//                     Showing{" "}
//                     <span className="font-semibold text-gray-700 dark:text-gray-300">
//                       {startIndex + 1}
//                     </span>{" "}
//                     to{" "}
//                     <span className="font-semibold text-gray-700 dark:text-gray-300">
//                       {Math.min(indexOfLastTask, totalItems)}
//                     </span>{" "}
//                     of{" "}
//                     <span className="font-semibold text-gray-700 dark:text-gray-300">
//                       {totalItems}
//                     </span>{" "}
//                     tasks
//                   </div>

//                   <div className="flex items-center space-x-2">
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => goToPage(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className="inline-flex items-center px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-700/80 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 backdrop-blur-sm"
//                     >
//                       <FiChevronLeft className="mr-1 h-4 w-4" />
//                       <span className="hidden sm:inline">Previous</span>
//                       <span className="sm:hidden">Prev</span>
//                     </motion.button>

//                     <div className="flex items-center rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm">
//                       <input
//                         type="number"
//                         min="1"
//                         max={totalPages}
//                         value={manualPage}
//                         onChange={(e) =>
//                           setManualPage(parseInt(e.target.value, 10) || "")
//                         }
//                         onKeyDown={(e) => {
//                           if (e.key === "Enter") goToPage(Number(manualPage));
//                         }}
//                         onBlur={() => goToPage(Number(manualPage))}
//                         className="w-16 text-center border-none py-2 bg-transparent text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                       />
//                       <span className="bg-gray-100 dark:bg-gray-600 px-3 py-2 text-gray-500 dark:text-gray-400 text-sm font-medium">
//                         / {totalPages}
//                       </span>
//                     </div>

//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => goToPage(currentPage + 1)}
//                       disabled={currentPage === totalPages || totalPages === 0}
//                       className="inline-flex items-center px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-700/80 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 backdrop-blur-sm"
//                     >
//                       <span className="hidden sm:inline">Next</span>
//                       <span className="sm:hidden">Next</span>
//                       <FiChevronRight className="ml-1 h-4 w-4" />
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </motion.div>
//       </div>

//       {/* ADD / EDIT MODAL */}
//       <TaskModal
//         isOpen={isModalOpen}
//         onClose={handleCancelEdit}
//         taskList={taskList}
//         taskDate={taskDate}
//         setTaskDate={setTaskDate}
//         handleAddTaskInput={handleAddTaskInput}
//         handleDeleteTaskInput={handleDeleteTaskInput}
//         handleChange={handleChange}
//         handleSubmit={handleSubmit}
//         loading={loading}
//         editMode={editMode}
//       />

//       {/* TASK DETAILS MODAL */}
//       <AnimatePresence>
//         {detailModalOpen && selectedTaskDetails && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
//             onClick={closeTaskDetailsModal}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: "spring", stiffness: 300, damping: 30 }}
//               className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {/* Modal Header */}
//               <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-4 flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <div className="bg-white/20 p-2 rounded-lg">
//                     <FiList className="h-6 w-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold text-white">Task Details</h3>
//                     <p className="text-white/80 text-sm">
//                       {selectedTaskDetails.task.length} task{selectedTaskDetails.task.length !== 1 ? 's' : ''}
//                       {selectedTaskDetails.task_Date && ` • ${formatDate(selectedTaskDetails.task_Date)}`}
//                     </p>
//                   </div>
//                 </div>
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={closeTaskDetailsModal}
//                   className="p-2 hover:bg-white/20 rounded-lg transition-colors"
//                 >
//                   <FiX className="h-6 w-6 text-white" />
//                 </motion.button>
//               </div>

//               {/* Modal Content */}
//               <div className="p-6 max-h-96 overflow-y-auto">
//                 <div className="space-y-4">
//                   {selectedTaskDetails.task.map((task, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                       className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600"
//                     >
//                       <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-bold text-sm flex-shrink-0">
//                         {index + 1}
//                       </div>
//                       <div className="flex-grow">
//                         <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
//                           Task {index + 1}
//                         </h4>
//                         <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
//                           {task}
//                         </p>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>

//               {/* Modal Footer */}
//               <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 bg-gray-50 dark:bg-gray-750">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
//                     {selectedTaskDetails.task_Date && (
//                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
//                         isToday(selectedTaskDetails.task_Date)
//                           ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
//                           : isPastDue(selectedTaskDetails.task_Date)
//                           ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
//                           : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
//                       }`}>
//                         <FiCalendar className="mr-1 h-3 w-3" />
//                         {formatDate(selectedTaskDetails.task_Date)}
//                       </span>
//                     )}
//                     <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
//                       <FiBookmark className="mr-1 h-3 w-3" />
//                       {selectedTaskDetails.task.length} task{selectedTaskDetails.task.length !== 1 ? 's' : ''}
//                     </span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => {
//                         closeTaskDetailsModal();
//                         handleUpdateClick(selectedTaskDetails);
//                       }}
//                       className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800/50 transition-colors border border-amber-200 dark:border-amber-700"
//                     >
//                       <FiEdit2 className="mr-2 h-4 w-4" />
//                       Edit Tasks
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={closeTaskDetailsModal}
//                       className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
//                     >
//                       Close
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// import { useState, useEffect, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   addTask,
//   fetchAllTasks,
//   deleteTask,
//   updateTaskdaily,
// } from "../../../service/taskService";
// import { toast } from "react-hot-toast";
// import {
//   FiPlus,
//   FiTrash2,
//   FiEdit2,
//   FiCalendar,
//   FiX,
//   FiChevronLeft,
//   FiChevronRight,
//   FiCheck,
//   FiList,
//   FiRefreshCw,
//   FiAlertCircle,
//   FiSearch,
//   FiGrid,
//   FiFilter,
//   FiChevronDown,
//   FiClock,
//   FiTarget,
//   FiTrendingUp,
//   FiLayout,
//   FiMenu,
//   FiZap,
//   FiStar,
//   FiBookmark,
//   FiMoreVertical,
// } from "react-icons/fi";
// import TaskModal from "./TaskModal";

// export default function UpdateTask() {
//   /* ---------- state ---------- */
//   const todayString = new Date().toISOString().substring(0, 10);

//   const [taskList, setTaskList] = useState([""]);
//   const [taskDate, setTaskDate] = useState("");

//   const [fetchedTasks, setFetchedTasks] = useState([]);
//   const [filteredTasks, setFilteredTasks] = useState([]);

//   const [filterDate, setFilterDate] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [loadingId, setLoadingId] = useState(null);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [manualPage, setManualPage] = useState(1);
//   const tasksPerPage = 10;

//   const [editMode, setEditMode] = useState(false);
//   const [editTaskId, setEditTaskId] = useState(null);
//   const [viewMode, setViewMode] = useState('table'); // 'cards' or 'table'
//   const [showFilters, setShowFilters] = useState(false);
//   const [detailModalOpen, setDetailModalOpen] = useState(false);
//   const [selectedTaskDetails, setSelectedTaskDetails] = useState(null);

//   /* ---------- fetch ---------- */
//   const fetchTasks = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await fetchAllTasks();
//       if (res?.success) setFetchedTasks(res.data);
//       else toast.error(res?.message || "Failed to fetch tasks.");
//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong fetching tasks.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchTasks();
//   }, [fetchTasks]);

//   /* ---------- filter ---------- */
//   useEffect(() => {
//     let list = fetchedTasks;
//     if (filterDate) list = list.filter((t) => t.task_Date === filterDate);
//     if (searchTerm)
//       list = list.filter((t) =>
//         t.task.some((x) =>
//           x.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     setFilteredTasks(list);
//     setCurrentPage(1);
//     setManualPage(1);
//   }, [fetchedTasks, filterDate, searchTerm]);

//   /* ---------- pagination ---------- */
//   const indexOfLastTask = currentPage * tasksPerPage;
//   const indexOfFirstTask = indexOfLastTask - tasksPerPage;
//   const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
//   const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
//   const totalItems = filteredTasks.length;
//   const startIndex = indexOfFirstTask;

//   const goToPage = (p) => {
//     if (p < 1 || p > totalPages) return;
//     setCurrentPage(p);
//     setManualPage(p);
//   };

//   /* ---------- modal handlers ---------- */
//   const openAddTaskModal = () => {
//     setTaskList([""]);
//     setTaskDate(todayString);
//     setEditMode(false);
//     setEditTaskId(null);
//     setIsModalOpen(true);
//   };

//   const handleCancelEdit = () => {
//     setTaskList([""]);
//     setTaskDate("");
//     setEditMode(false);
//     setEditTaskId(null);
//     setIsModalOpen(false);
//     toast("Task operation cancelled", {
//       icon: "🔄",
//       style: { borderRadius: "16px", background: "#333", color: "#fff" },
//     });
//   };

//   const handleAddTaskInput = () => setTaskList((prev) => [...prev, ""]);
//   const handleDeleteTaskInput = (idx) =>
//     setTaskList((prev) => prev.filter((_, i) => i !== idx));
//   const handleChange = (idx, val) =>
//     setTaskList((prev) => prev.map((t, i) => (i === idx ? val : t)));

//   /* ---------- submit ---------- */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const nonEmpty = taskList.filter((t) => t.trim().length);
//     if (!nonEmpty.length) return toast.error("Please enter at least one task.");
//     if (!taskDate) return toast.error("Please select a date for this task.");

//     const payload = { task: nonEmpty, task_Date: taskDate };
//     setLoading(true);
//     try {
//       const res = editMode
//         ? await updateTaskdaily(editTaskId, payload)
//         : await addTask(payload);
//       if (res?.success) {
//         toast.success(res.message || "Operation successful!");
//         setTaskList([""]);
//         setTaskDate("");
//         setEditMode(false);
//         setEditTaskId(null);
//         setIsModalOpen(false);
//         fetchTasks();
//       } else toast.error(res?.message || "Operation failed.");
//     } catch (err) {
//       console.error(err);
//       toast.error("Submission failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------- delete ---------- */
//   const handleDeleteTask = async (id) => {
//     setLoadingId(id);
//     try {
//       const res = await deleteTask(id);
//       if (res?.success) {
//         toast.success(res.message || "Task deleted!");
//         fetchTasks();
//       } else toast.error(res?.message || "Delete failed.");
//     } catch (err) {
//       console.error(err);
//       toast.error("Delete failed. Please try again.");
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   /* ---------- edit ---------- */
//   const handleUpdateClick = (item) => {
//     setTaskList(item.task);
//     setTaskDate(item.task_Date || todayString);
//     setEditTaskId(item._id);
//     setEditMode(true);
//     setIsModalOpen(true);
//   };

//   const clearFilters = () => {
//     setFilterDate("");
//     setSearchTerm("");
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "No date";
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   const isToday = (dateString) => {
//     return dateString === todayString;
//   };

//   const isPastDue = (dateString) => {
//     return dateString && dateString < todayString;
//   };

//   const truncateText = (text, maxLength = 50) => {
//     if (text.length <= maxLength) return text;
//     return text.substring(0, maxLength) + '...';
//   };

//   const openTaskDetailsModal = (task) => {
//     setSelectedTaskDetails(task);
//     setDetailModalOpen(true);
//   };

//   const closeTaskDetailsModal = () => {
//     setSelectedTaskDetails(null);
//     setDetailModalOpen(false);
//   };

//   /* ---------- UI ---------- */
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 text-gray-800 dark:text-gray-100 transition-all duration-500">
//       {/* HEADER */}
//       <motion.div
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 z-30 shadow-lg shadow-slate-900/5 dark:shadow-black/20"
//       >
//         <div className="mx-auto py-4 px-4 sm:px-6 lg:px-8 max-w-7xl">
//           <div className="flex items-center justify-between">
//             <motion.div
//               className="flex items-center space-x-3"
//               whileHover={{ scale: 1.02 }}
//               transition={{ type: "spring", stiffness: 400, damping: 17 }}
//             >
//               <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-3 shadow-lg shadow-indigo-500/25 dark:shadow-indigo-500/20">
//                 <FiZap className="h-6 w-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
//                   TaskFlow Pro
//                 </h1>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
//                   Organize • Execute • Achieve
//                 </p>
//               </div>
//             </motion.div>

//             <div className="flex items-center space-x-2 sm:space-x-3">
//               {/* View Toggle - Hidden on mobile */}
//               <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1 border border-gray-200 dark:border-gray-700">
//                 <button
//                   onClick={() => setViewMode('cards')}
//                   className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                     viewMode === 'cards'
//                       ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
//                       : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
//                   }`}
//                 >
//                   <FiGrid className="h-4 w-4 mr-1" />
//                   Cards
//                 </button>
//                 <button
//                   onClick={() => setViewMode('table')}
//                   className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                     viewMode === 'table'
//                       ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
//                       : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
//                   }`}
//                 >
//                   <FiList className="h-4 w-4 mr-1" />
//                   Table
//                 </button>
//               </div>

//               <motion.button
//                 onClick={fetchTasks}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 text-indigo-600 dark:text-indigo-400 border border-gray-200 dark:border-gray-700"
//                 title="Refresh tasks"
//               >
//                 <FiRefreshCw
//                   className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`}
//                 />
//               </motion.button>

//               <motion.button
//                 onClick={openAddTaskModal}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="inline-flex items-center px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-500/25 text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-sm font-semibold transition-all duration-200 border border-indigo-500/20"
//               >
//                 <FiPlus className="mr-2 h-5 w-5" />
//                 <span className="hidden sm:inline">Add Task</span>
//                 <span className="sm:hidden">Add</span>
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* MAIN CONTENT */}
//       <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-7xl">

//         {/* STATS CARDS */}
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.1 }}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8"
//         >
//           <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 lg:p-6 rounded-2xl text-white shadow-lg shadow-blue-500/25">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-blue-100 text-sm font-medium">Total Tasks</p>
//                 <p className="text-2xl lg:text-3xl font-bold">{fetchedTasks.length}</p>
//               </div>
//               <FiTarget className="h-8 w-8 text-blue-200" />
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 lg:p-6 rounded-2xl text-white shadow-lg shadow-emerald-500/25">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-emerald-100 text-sm font-medium">Today's Tasks</p>
//                 <p className="text-2xl lg:text-3xl font-bold">
//                   {fetchedTasks.filter(task => isToday(task.task_Date)).length}
//                 </p>
//               </div>
//               <FiClock className="h-8 w-8 text-emerald-200" />
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-4 lg:p-6 rounded-2xl text-white shadow-lg shadow-amber-500/25">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-amber-100 text-sm font-medium">Overdue</p>
//                 <p className="text-2xl lg:text-3xl font-bold">
//                   {fetchedTasks.filter(task => isPastDue(task.task_Date)).length}
//                 </p>
//               </div>
//               <FiAlertCircle className="h-8 w-8 text-amber-200" />
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 lg:p-6 rounded-2xl text-white shadow-lg shadow-purple-500/25">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-purple-100 text-sm font-medium">Filtered</p>
//                 <p className="text-2xl lg:text-3xl font-bold">{filteredTasks.length}</p>
//               </div>
//               <FiTrendingUp className="h-8 w-8 text-purple-200" />
//             </div>
//           </div>
//         </motion.div>

//         {/* FILTER / SEARCH */}
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="mb-6 lg:mb-8"
//         >
//           <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/5 dark:shadow-black/20 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
//             {/* Mobile Filter Toggle */}
//             <div className="md:hidden bg-gradient-to-r from-indigo-500 to-purple-500 p-4">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center justify-between w-full text-white"
//               >
//                 <span className="flex items-center text-sm font-semibold">
//                   <FiFilter className="mr-2 h-4 w-4" />
//                   Filters & Search
//                 </span>
//                 <FiChevronDown className={`h-5 w-5 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
//               </button>
//             </div>

//             {/* Filter Content */}
//             <div className={`p-4 lg:p-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
//               <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
//                 {/* Search */}
//                 <div className="relative flex-grow lg:max-w-md">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <FiSearch className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     placeholder="Search your tasks..."
//                     className="block w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
//                   />
//                 </div>

//                 {/* Date Filter & Actions */}
//                 <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
//                   <div className="relative">
//                     <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
//                     <input
//                       type="date"
//                       value={filterDate}
//                       onChange={(e) => setFilterDate(e.target.value)}
//                       className="pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 w-full sm:w-auto"
//                     />
//                   </div>

//                   {(filterDate || searchTerm) && (
//                     <motion.button
//                       initial={{ scale: 0, opacity: 0 }}
//                       animate={{ scale: 1, opacity: 1 }}
//                       onClick={clearFilters}
//                       className="inline-flex items-center justify-center px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white/80 dark:bg-gray-700/80 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 backdrop-blur-sm"
//                     >
//                       <FiX className="mr-2 h-4 w-4" />
//                       Clear All
//                     </motion.button>
//                   )}
//                 </div>
//               </div>

//               {/* Active Filters */}
//               {(filterDate || searchTerm) && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: 'auto', opacity: 1 }}
//                   className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
//                 >
//                   <div className="flex flex-wrap gap-2">
//                     {searchTerm && (
//                       <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700">
//                         <FiSearch className="mr-1 h-3 w-3" />
//                         "{searchTerm}"
//                       </span>
//                     )}
//                     {filterDate && (
//                       <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700">
//                         <FiCalendar className="mr-1 h-3 w-3" />
//                         {formatDate(filterDate)}
//                       </span>
//                     )}
//                   </div>
//                 </motion.div>
//               )}
//             </div>
//           </div>
//         </motion.div>

//         {/* TASKS CONTENT */}
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           {loading && !loadingId ? (
//             <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-12 lg:p-20 text-center shadow-xl shadow-slate-900/5 dark:shadow-black/20 border border-gray-200/50 dark:border-gray-700/50">
//               <div className="flex flex-col items-center">
//                 <div className="relative">
//                   <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 dark:border-indigo-800"></div>
//                   <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-indigo-500 absolute top-0"></div>
//                 </div>
//                 <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 font-medium">
//                   Loading your tasks...
//                 </p>
//                 <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
//                   This won't take long
//                 </p>
//               </div>
//             </div>
//           ) : (
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={`${viewMode}-${currentPage}`}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.4, ease: "easeInOut" }}
//               >
//                 {currentTasks.length ? (
//                   <>
//                     {/* Mobile & Tablet Card View - Always Cards */}
//                     <div className="block lg:hidden">
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//                         {currentTasks.map((item, idx) => (
//                           <motion.div
//                             key={item._id}
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: idx * 0.1 }}
//                             className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-5 shadow-xl shadow-slate-900/10 dark:shadow-black/30 border border-gray-200/60 dark:border-gray-700/60 hover:shadow-2xl hover:shadow-slate-900/20 dark:hover:shadow-black/40 transition-all duration-300 hover:-translate-y-1"
//                           >
//                             {/* Card Header */}
//                             <div className="flex items-start justify-between mb-4">
//                               <div className="flex items-center space-x-3">
//                                 <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/25">
//                                   #{idx + 1 + startIndex}
//                                 </div>
//                                 <div className="flex flex-col">
//                                   {item.task_Date && (
//                                     <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold mb-1 ${
//                                       isToday(item.task_Date)
//                                         ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700'
//                                         : isPastDue(item.task_Date)
//                                         ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700'
//                                         : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700'
//                                     }`}>
//                                       <FiCalendar className="mr-1 h-3 w-3" />
//                                       {formatDate(item.task_Date)}
//                                     </span>
//                                   )}
//                                   <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700">
//                                     <FiList className="mr-1 h-3 w-3" />
//                                     {item.task.length} task{item.task.length !== 1 ? 's' : ''}
//                                   </span>
//                                 </div>
//                               </div>

//                               <div className="flex items-center space-x-2">
//                                 <motion.button
//                                   whileHover={{ scale: 1.1 }}
//                                   whileTap={{ scale: 0.9 }}
//                                   onClick={() => handleUpdateClick(item)}
//                                   className="p-2.5 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-800/50 transition-all duration-200 border border-amber-200 dark:border-amber-700 shadow-sm"
//                                 >
//                                   <FiEdit2 className="h-4 w-4" />
//                                 </motion.button>
//                                 <motion.button
//                                   whileHover={{ scale: 1.1 }}
//                                   whileTap={{ scale: 0.9 }}
//                                   disabled={loadingId === item._id}
//                                   onClick={() => handleDeleteTask(item._id)}
//                                   className="p-2.5 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/50 transition-all duration-200 disabled:opacity-50 border border-red-200 dark:border-red-700 shadow-sm"
//                                 >
//                                   {loadingId === item._id ? (
//                                     <FiRefreshCw className="h-4 w-4 animate-spin" />
//                                   ) : (
//                                     <FiTrash2 className="h-4 w-4" />
//                                   )}
//                                 </motion.button>
//                               </div>
//                             </div>

//                             {/* Show Only First Task */}
//                             <div className="mb-4">
//                               {item.task.length > 0 && (
//                                 <div className="flex items-start space-x-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-700/50 dark:to-gray-700/30 border border-gray-200/60 dark:border-gray-600/40 backdrop-blur-sm">
//                                   <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-xs font-bold flex-shrink-0 mt-0.5 shadow-lg">
//                                     1
//                                   </div>
//                                   <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-grow font-medium">
//                                     {item.task[0]}
//                                   </p>
//                                 </div>
//                               )}

//                               {item.task.length > 1 && (
//                                 <motion.button
//                                   whileHover={{ scale: 1.02 }}
//                                   whileTap={{ scale: 0.98 }}
//                                   onClick={() => openTaskDetailsModal(item)}
//                                   className="w-full mt-3 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:from-purple-100 hover:to-indigo-100 dark:hover:from-purple-800/30 dark:hover:to-indigo-800/30 transition-all duration-200 font-medium text-sm"
//                                 >
//                                   <div className="flex items-center justify-center space-x-2">
//                                     <FiMoreVertical className="h-4 w-4" />
//                                     <span>View {item.task.length - 1} more task{item.task.length - 1 !== 1 ? 's' : ''}</span>
//                                   </div>
//                                 </motion.button>
//                               )}
//                             </div>

//                             {/* Card Footer */}
//                             <div className="pt-3 border-t border-gray-200/60 dark:border-gray-600/40 flex items-center justify-between">
//                               <div className="flex items-center space-x-2">
//                                 {!item.task_Date && (
//                                   <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600">
//                                     <FiAlertCircle className="mr-1 h-3 w-3" />
//                                     No date
//                                   </span>
//                                 )}
//                                 {item.task_Date && (
//                                   <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
//                                     isToday(item.task_Date)
//                                       ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
//                                       : isPastDue(item.task_Date)
//                                       ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
//                                       : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
//                                   }`}>
//                                     {isToday(item.task_Date) ? (
//                                       <>
//                                         <FiClock className="mr-1 h-3 w-3" />
//                                         Today
//                                       </>
//                                     ) : isPastDue(item.task_Date) ? (
//                                       <>
//                                         <FiAlertCircle className="mr-1 h-3 w-3" />
//                                         Overdue
//                                       </>
//                                     ) : (
//                                       <>
//                                         <FiBookmark className="mr-1 h-3 w-3" />
//                                         Scheduled
//                                       </>
//                                     )}
//                                   </span>
//                                 )}
//                               </div>
//                             </div>
//                           </motion.div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Desktop View Toggle */}
//                     <div className={`${viewMode === 'cards' ? 'hidden lg:block' : 'hidden'}`}>
//                       <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
//                         {currentTasks.map((item, idx) => (
//                           <motion.div
//                             key={item._id}
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: idx * 0.1 }}
//                             className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl shadow-slate-900/10 dark:shadow-black/30 border border-gray-200/60 dark:border-gray-700/60 hover:shadow-2xl hover:shadow-slate-900/20 dark:hover:shadow-black/40 transition-all duration-300 hover:-translate-y-1"
//                           >
//                             {/* Card Header */}
//                             <div className="flex items-start justify-between mb-6">
//                               <div className="flex items-center space-x-4">
//                                 <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-lg shadow-lg shadow-indigo-500/25">
//                                   #{idx + 1 + startIndex}
//                                 </div>
//                                 <div className="flex flex-col">
//                                   {item.task_Date && (
//                                     <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-semibold mb-2 ${
//                                       isToday(item.task_Date)
//                                         ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700'
//                                         : isPastDue(item.task_Date)
//                                         ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700'
//                                         : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700'
//                                     }`}>
//                                       <FiCalendar className="mr-2 h-4 w-4" />
//                                       {formatDate(item.task_Date)}
//                                     </span>
//                                   )}
//                                   <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700">
//                                     <FiList className="mr-1 h-3 w-3" />
//                                     {item.task.length} task{item.task.length !== 1 ? 's' : ''}
//                                   </span>
//                                 </div>
//                               </div>

//                               <div className="flex items-center space-x-2">
//                                 <motion.button
//                                   whileHover={{ scale: 1.1 }}
//                                   whileTap={{ scale: 0.9 }}
//                                   onClick={() => handleUpdateClick(item)}
//                                   className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-800/50 transition-all duration-200 border border-amber-200 dark:border-amber-700 shadow-lg shadow-amber-500/10"
//                                 >
//                                   <FiEdit2 className="h-5 w-5" />
//                                 </motion.button>
//                                 <motion.button
//                                   whileHover={{ scale: 1.1 }}
//                                   whileTap={{ scale: 0.9 }}
//                                   disabled={loadingId === item._id}
//                                   onClick={() => handleDeleteTask(item._id)}
//                                   className="p-3 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/50 transition-all duration-200 disabled:opacity-50 border border-red-200 dark:border-red-700 shadow-lg shadow-red-500/10"
//                                 >
//                                   {loadingId === item._id ? (
//                                     <FiRefreshCw className="h-5 w-5 animate-spin" />
//                                   ) : (
//                                     <FiTrash2 className="h-5 w-5" />
//                                   )}
//                                 </motion.button>
//                               </div>
//                             </div>

//                             {/* Task List */}
//                             <div className="space-y-3 mb-6">
//                               {item.task.slice(0, 3).map((task, taskIdx) => (
//                                 <motion.div
//                                   key={taskIdx}
//                                   initial={{ opacity: 0, x: -20 }}
//                                   animate={{ opacity: 1, x: 0 }}
//                                   transition={{ delay: (idx * 0.1) + (taskIdx * 0.05) }}
//                                   className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-700/50 dark:to-gray-700/30 border border-gray-200/60 dark:border-gray-600/40 backdrop-blur-sm"
//                                 >
//                                   <div className="flex items-center justify-center h-7 w-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-sm font-bold flex-shrink-0 mt-0.5 shadow-lg">
//                                     {taskIdx + 1}
//                                   </div>
//                                   <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-grow font-medium">
//                                     {task}
//                                   </p>
//                                 </motion.div>
//                               ))}

//                               {item.task.length > 3 && (
//                                 <motion.button
//                                   whileHover={{ scale: 1.02 }}
//                                   whileTap={{ scale: 0.98 }}
//                                   onClick={() => openTaskDetailsModal(item)}
//                                   className="w-full p-4 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:from-purple-100 hover:to-indigo-100 dark:hover:from-purple-800/30 dark:hover:to-indigo-800/30 transition-all duration-200 font-medium"
//                                 >
//                                   <div className="flex items-center justify-center space-x-2">
//                                     <FiMoreVertical className="h-4 w-4" />
//                                     <span>View {item.task.length - 3} more task{item.task.length - 3 !== 1 ? 's' : ''}</span>
//                                   </div>
//                                 </motion.button>
//                               )}
//                             </div>

//                             {/* Card Footer */}
//                             <div className="pt-4 border-t border-gray-200/60 dark:border-gray-600/40 flex items-center justify-between">
//                               <div className="flex items-center space-x-3">
//                                 {!item.task_Date && (
//                                   <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600">
//                                     <FiAlertCircle className="mr-1.5 h-3 w-3" />
//                                     No date set
//                                   </span>
//                                 )}
//                                 {item.task_Date && (
//                                   <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
//                                     isToday(item.task_Date)
//                                       ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
//                                       : isPastDue(item.task_Date)
//                                       ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
//                                       : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
//                                   }`}>
//                                     {isToday(item.task_Date) ? (
//                                       <>
//                                         <FiClock className="mr-1.5 h-3 w-3" />
//                                         Due Today
//                                       </>
//                                     ) : isPastDue(item.task_Date) ? (
//                                       <>
//                                         <FiAlertCircle className="mr-1.5 h-3 w-3" />
//                                         Overdue
//                                       </>
//                                     ) : (
//                                       <>
//                                         <FiBookmark className="mr-1.5 h-3 w-3" />
//                                         Scheduled
//                                       </>
//                                     )}
//                                   </span>
//                                 )}
//                               </div>
//                             </div>
//                           </motion.div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Desktop Table View */}
//                     <div className={`${viewMode === 'table' ? 'hidden lg:block' : 'hidden'}`}>
//                       <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl shadow-slate-900/5 dark:shadow-black/20 border border-gray-200/50 dark:border-gray-700/50">
//                         <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-6 px-8">
//                           <h2 className="text-2xl font-bold text-white flex items-center">
//                             <FiList className="mr-3 h-6 w-6" />
//                             Your Tasks
//                             {(filterDate || searchTerm) && (
//                               <span className="ml-3 text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
//                                 {filterDate && searchTerm
//                                   ? "Filtered & Searched"
//                                   : filterDate
//                                   ? "Date Filtered"
//                                   : "Searched"}
//                               </span>
//                             )}
//                           </h2>
//                         </div>

//                         <div className="overflow-x-auto">
//                           <table className="min-w-full divide-y divide-gray-200/50 dark:divide-gray-700/50">
//                             <thead className="bg-gray-50/80 dark:bg-gray-700/50 backdrop-blur-sm">
//                               <tr>
//                                 {["#", "First Task", "Total Tasks", "Date", "Status", "Actions"].map((header) => (
//                                   <th
//                                     key={header}
//                                     className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
//                                   >
//                                     {header}
//                                   </th>
//                                 ))}
//                               </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
//                               {currentTasks.map((item, idx) => (
//                                 <motion.tr
//                                   key={item._id}
//                                   initial={{ opacity: 0, y: 10 }}
//                                   animate={{ opacity: 1, y: 0 }}
//                                   transition={{ delay: idx * 0.05 }}
//                                   className="group hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 dark:hover:from-indigo-900/10 dark:hover:to-purple-900/10 transition-all duration-200"
//                                 >
//                                   <td className="px-6 py-4">
//                                     <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-bold text-sm shadow-lg">
//                                       {idx + 1 + startIndex}
//                                     </div>
//                                   </td>
//                                   <td className="px-6 py-4">
//                                     <div className="max-w-xs">
//                                       {item.task.length > 0 && (
//                                         <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50/80 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50">
//                                           <span className="flex items-center justify-center h-5 w-5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold flex-shrink-0 mt-0.5">
//                                             1
//                                           </span>
//                                           <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
//                                             {truncateText(item.task[0])}
//                                           </span>
//                                         </div>
//                                       )}
//                                     </div>
//                                   </td>
//                                   <td className="px-6 py-4">
//                                     <div className="flex items-center space-x-2">
//                                       <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700">
//                                         <FiList className="mr-1 h-3 w-3" />
//                                         {item.task.length} task{item.task.length !== 1 ? 's' : ''}
//                                       </span>
//                                       {item.task.length > 1 && (
//                                         <motion.button
//                                           whileHover={{ scale: 1.05 }}
//                                           whileTap={{ scale: 0.95 }}
//                                           onClick={() => openTaskDetailsModal(item)}
//                                           className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors border border-purple-200 dark:border-purple-700"
//                                         >
//                                           <FiMoreVertical className="mr-1 h-3 w-3" />
//                                           More
//                                         </motion.button>
//                                       )}
//                                     </div>
//                                   </td>
//                                   <td className="px-6 py-4">
//                                     {item.task_Date ? (
//                                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
//                                         isToday(item.task_Date)
//                                           ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700'
//                                           : isPastDue(item.task_Date)
//                                           ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700'
//                                           : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700'
//                                       }`}>
//                                         <FiCalendar className="mr-2 h-4 w-4" />
//                                         {formatDate(item.task_Date)}
//                                       </span>
//                                     ) : (
//                                       <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600">
//                                         <FiAlertCircle className="mr-2 h-4 w-4" />
//                                         No date set
//                                       </span>
//                                     )}
//                                   </td>
//                                   <td className="px-6 py-4">
//                                     {item.task_Date && (
//                                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
//                                         isToday(item.task_Date)
//                                           ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
//                                           : isPastDue(item.task_Date)
//                                           ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
//                                           : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
//                                       }`}>
//                                         {isToday(item.task_Date) ? (
//                                           <>
//                                             <FiClock className="mr-1 h-3 w-3" />
//                                             Today
//                                           </>
//                                         ) : isPastDue(item.task_Date) ? (
//                                           <>
//                                             <FiAlertCircle className="mr-1 h-3 w-3" />
//                                             Overdue
//                                           </>
//                                         ) : (
//                                           <>
//                                             <FiBookmark className="mr-1 h-3 w-3" />
//                                             Scheduled
//                                           </>
//                                         )}
//                                       </span>
//                                     )}
//                                   </td>
//                                   <td className="px-6 py-4">
//                                     <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                                       <motion.button
//                                         whileHover={{ scale: 1.1 }}
//                                         whileTap={{ scale: 0.9 }}
//                                         onClick={() => handleUpdateClick(item)}
//                                         className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-800/40 transition-all duration-200 border border-amber-200 dark:border-amber-700"
//                                       >
//                                         <FiEdit2 className="mr-1 h-4 w-4" />
//                                         Edit
//                                       </motion.button>
//                                       <motion.button
//                                         whileHover={{ scale: 1.1 }}
//                                         whileTap={{ scale: 0.9 }}
//                                         disabled={loadingId === item._id}
//                                         onClick={() => handleDeleteTask(item._id)}
//                                         className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800/40 transition-all duration-200 disabled:opacity-50 border border-red-200 dark:border-red-700"
//                                       >
//                                         {loadingId === item._id ? (
//                                           <FiRefreshCw className="mr-1 h-4 w-4 animate-spin" />
//                                         ) : (
//                                           <FiTrash2 className="mr-1 h-4 w-4" />
//                                         )}
//                                         Delete
//                                       </motion.button>
//                                     </div>
//                                   </td>
//                                 </motion.tr>
//                               ))}
//                             </tbody>
//                           </table>
//                         </div>
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   /* Empty State */
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-12 lg:p-20 text-center shadow-xl shadow-slate-900/5 dark:shadow-black/20 border border-gray-200/50 dark:border-gray-700/50"
//                   >
//                     <motion.div
//                       initial={{ y: 20 }}
//                       animate={{ y: 0 }}
//                       transition={{ delay: 0.2 }}
//                       className="flex flex-col items-center"
//                     >
//                       <div className="h-24 w-24 lg:h-32 lg:w-32 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center text-indigo-500 dark:text-indigo-400 mb-6 shadow-lg">
//                         <FiLayout className="h-12 w-12 lg:h-16 lg:w-16" />
//                       </div>
//                       <h3 className="text-2xl lg:text-3xl font-bold text-gray-700 dark:text-gray-200 mb-2">
//                         No tasks found
//                       </h3>
//                       <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md leading-relaxed">
//                         {filterDate || searchTerm
//                           ? "No tasks match your current filters. Try adjusting your search criteria or "
//                           : "Ready to boost your productivity? "}
//                         <span className="font-semibold text-indigo-600 dark:text-indigo-400">
//                           Create your first task to get started!
//                         </span>
//                       </p>
//                       <div className="flex flex-col sm:flex-row gap-3">
//                         {(filterDate || searchTerm) && (
//                           <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={clearFilters}
//                             className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 border border-gray-200 dark:border-gray-600"
//                           >
//                             <FiX className="mr-2 h-4 w-4" />
//                             Clear Filters
//                           </motion.button>
//                         )}
//                         <motion.button
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={openAddTaskModal}
//                           className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg shadow-indigo-500/25"
//                         >
//                           <FiPlus className="mr-2 h-4 w-4" />
//                           Add Your First Task
//                         </motion.button>
//                       </div>
//                     </motion.div>
//                   </motion.div>
//                 )}
//               </motion.div>
//             </AnimatePresence>
//           )}

//           {/* PAGINATION */}
//           {totalItems > 0 && (
//             <motion.div
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.4 }}
//               className="mt-8"
//             >
//               <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/5 dark:shadow-black/20 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
//                 <div className="py-4 px-6 flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
//                   <div className="text-sm text-gray-500 dark:text-gray-400 text-center lg:text-left">
//                     Showing{" "}
//                     <span className="font-semibold text-gray-700 dark:text-gray-300">
//                       {startIndex + 1}
//                     </span>{" "}
//                     to{" "}
//                     <span className="font-semibold text-gray-700 dark:text-gray-300">
//                       {Math.min(indexOfLastTask, totalItems)}
//                     </span>{" "}
//                     of{" "}
//                     <span className="font-semibold text-gray-700 dark:text-gray-300">
//                       {totalItems}
//                     </span>{" "}
//                     tasks
//                   </div>

//                   <div className="flex items-center space-x-2">
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => goToPage(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className="inline-flex items-center px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-700/80 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 backdrop-blur-sm"
//                     >
//                       <FiChevronLeft className="mr-1 h-4 w-4" />
//                       <span className="hidden sm:inline">Previous</span>
//                       <span className="sm:hidden">Prev</span>
//                     </motion.button>

//                     <div className="flex items-center rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm">
//                       <input
//                         type="number"
//                         min="1"
//                         max={totalPages}
//                         value={manualPage}
//                         onChange={(e) =>
//                           setManualPage(parseInt(e.target.value, 10) || "")
//                         }
//                         onKeyDown={(e) => {
//                           if (e.key === "Enter") goToPage(Number(manualPage));
//                         }}
//                         onBlur={() => goToPage(Number(manualPage))}
//                         className="w-16 text-center border-none py-2 bg-transparent text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                       />
//                       <span className="bg-gray-100 dark:bg-gray-600 px-3 py-2 text-gray-500 dark:text-gray-400 text-sm font-medium">
//                         / {totalPages}
//                       </span>
//                     </div>

//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => goToPage(currentPage + 1)}
//                       disabled={currentPage === totalPages || totalPages === 0}
//                       className="inline-flex items-center px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-700/80 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 backdrop-blur-sm"
//                     >
//                       <span className="hidden sm:inline">Next</span>
//                       <span className="sm:hidden">Next</span>
//                       <FiChevronRight className="ml-1 h-4 w-4" />
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </motion.div>
//       </div>

//       {/* ADD / EDIT MODAL */}
//       <TaskModal
//         isOpen={isModalOpen}
//         onClose={handleCancelEdit}
//         taskList={taskList}
//         taskDate={taskDate}
//         setTaskDate={setTaskDate}
//         handleAddTaskInput={handleAddTaskInput}
//         handleDeleteTaskInput={handleDeleteTaskInput}
//         handleChange={handleChange}
//         handleSubmit={handleSubmit}
//         loading={loading}
//         editMode={editMode}
//       />

//       {/* TASK DETAILS MODAL */}
//       <AnimatePresence>
//         {detailModalOpen && selectedTaskDetails && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
//             onClick={closeTaskDetailsModal}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: "spring", stiffness: 300, damping: 30 }}
//               className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {/* Modal Header */}
//               <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-4 flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <div className="bg-white/20 p-2 rounded-lg">
//                     <FiList className="h-6 w-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold text-white">Task Details</h3>
//                     <p className="text-white/80 text-sm">
//                       {selectedTaskDetails.task.length} task{selectedTaskDetails.task.length !== 1 ? 's' : ''}
//                       {selectedTaskDetails.task_Date && ` • ${formatDate(selectedTaskDetails.task_Date)}`}
//                     </p>
//                   </div>
//                 </div>
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={closeTaskDetailsModal}
//                   className="p-2 hover:bg-white/20 rounded-lg transition-colors"
//                 >
//                   <FiX className="h-6 w-6 text-white" />
//                 </motion.button>
//               </div>

//               {/* Modal Content */}
//               <div className="p-6 max-h-96 overflow-y-auto">
//                 <div className="space-y-4">
//                   {selectedTaskDetails.task.map((task, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                       className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600"
//                     >
//                       <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-bold text-sm flex-shrink-0">
//                         {index + 1}
//                       </div>
//                       <div className="flex-grow">
//                         <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
//                           Task {index + 1}
//                         </h4>
//                         <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
//                           {task}
//                         </p>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>

//               {/* Modal Footer */}
//               <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 bg-gray-50 dark:bg-gray-750">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
//                     {selectedTaskDetails.task_Date && (
//                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
//                         isToday(selectedTaskDetails.task_Date)
//                           ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
//                           : isPastDue(selectedTaskDetails.task_Date)
//                           ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
//                           : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
//                       }`}>
//                         <FiCalendar className="mr-1 h-3 w-3" />
//                         {formatDate(selectedTaskDetails.task_Date)}
//                       </span>
//                     )}
//                     <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
//                       <FiBookmark className="mr-1 h-3 w-3" />
//                       {selectedTaskDetails.task.length} task{selectedTaskDetails.task.length !== 1 ? 's' : ''}
//                     </span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => {
//                         closeTaskDetailsModal();
//                         handleUpdateClick(selectedTaskDetails);
//                       }}
//                       className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800/50 transition-colors border border-amber-200 dark:border-amber-700"
//                     >
//                       <FiEdit2 className="mr-2 h-4 w-4" />
//                       Edit Tasks
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={closeTaskDetailsModal}
//                       className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
//                     >
//                       Close
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }



import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  addTask,
  fetchAllTasks,
  deleteTask,
  updateTaskdaily,
} from "../../../service/taskService";
import { toast } from "react-hot-toast";
import {
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiCalendar,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
  FiList,
  FiRefreshCw,
  FiAlertCircle,
  FiSearch,
  FiGrid,
  FiFilter,
  FiChevronDown,
  FiClock,
  FiTarget,
  FiTrendingUp,
  FiLayout,
  FiMenu,
  FiZap,
  FiStar,
  FiBookmark,
  FiMoreVertical,
} from "react-icons/fi";
import TaskModal from "./TaskModal";
import TaskDetailsModal from "./TaskDetailsModal";

export default function UpdateTask() {
  /* ---------- state ---------- */
  const todayString = new Date().toISOString().substring(0, 10);

  const [taskList, setTaskList] = useState([""]);
  const [taskDate, setTaskDate] = useState("");

  const [fetchedTasks, setFetchedTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const [filterDate, setFilterDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [manualPage, setManualPage] = useState(1);
  const tasksPerPage = 10;

  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [viewMode, setViewMode] = useState("table"); // 'cards' or 'table'
  const [showFilters, setShowFilters] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedTaskDetails, setSelectedTaskDetails] = useState(null);

  /* ---------- fetch ---------- */
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchAllTasks();
      if (res?.success) setFetchedTasks(res.data);
      else toast.error(res?.message || "Failed to fetch tasks.");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong fetching tasks.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  /* ---------- filter ---------- */
  useEffect(() => {
    let list = fetchedTasks;
    if (filterDate) list = list.filter((t) => t.task_Date === filterDate);
    if (searchTerm)
      list = list.filter((t) =>
        t.task.some((x) => x.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    setFilteredTasks(list);
    setCurrentPage(1);
    setManualPage(1);
  }, [fetchedTasks, filterDate, searchTerm]);

  /* ---------- pagination ---------- */
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const totalItems = filteredTasks.length;
  const startIndex = indexOfFirstTask;

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setCurrentPage(p);
    setManualPage(p);
  };

  /* ---------- modal handlers ---------- */
  const openAddTaskModal = () => {
    setTaskList([""]);
    setTaskDate(todayString);
    setEditMode(false);
    setEditTaskId(null);
    setIsModalOpen(true);
  };

  const handleCancelEdit = () => {
    setTaskList([""]);
    setTaskDate("");
    setEditMode(false);
    setEditTaskId(null);
    setIsModalOpen(false);
    toast("Task operation cancelled", {
      icon: "🔄",
      style: { borderRadius: "16px", background: "#333", color: "#fff" },
    });
  };

  const handleAddTaskInput = () => setTaskList((prev) => [...prev, ""]);
  const handleDeleteTaskInput = (idx) =>
    setTaskList((prev) => prev.filter((_, i) => i !== idx));
  const handleChange = (idx, val) =>
    setTaskList((prev) => prev.map((t, i) => (i === idx ? val : t)));

  /* ---------- submit ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const nonEmpty = taskList.filter((t) => t.trim().length);
    if (!nonEmpty.length) return toast.error("Please enter at least one task.");
    if (!taskDate) return toast.error("Please select a date for this task.");

    const payload = { task: nonEmpty, task_Date: taskDate };
    setLoading(true);
    try {
      const res = editMode
        ? await updateTaskdaily(editTaskId, payload)
        : await addTask(payload);
      if (res?.success) {
        toast.success(res.message || "Operation successful!");
        setTaskList([""]);
        setTaskDate("");
        setEditMode(false);
        setEditTaskId(null);
        setIsModalOpen(false);
        fetchTasks();
      } else toast.error(res?.message || "Operation failed.");
    } catch (err) {
      console.error(err);
      toast.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- delete ---------- */
  const handleDeleteTask = async (id) => {
    setLoadingId(id);
    try {
      const res = await deleteTask(id);
      if (res?.success) {
        toast.success(res.message || "Task deleted!");
        fetchTasks();
      } else toast.error(res?.message || "Delete failed.");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  /* ---------- edit ---------- */
  const handleUpdateClick = (item) => {
    setTaskList(item.task);
    setTaskDate(item.task_Date || todayString);
    setEditTaskId(item._id);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const clearFilters = () => {
    setFilterDate("");
    setSearchTerm("");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isToday = (dateString) => {
    return dateString === todayString;
  };

  const isPastDue = (dateString) => {
    return dateString && dateString < todayString;
  };

  const truncateText = (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const openTaskDetailsModal = (task) => {
    setSelectedTaskDetails(task);
    setDetailModalOpen(true);
  };

  const closeTaskDetailsModal = () => {
    setSelectedTaskDetails(null);
    setDetailModalOpen(false);
  };

  /* ---------- UI ---------- */
  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 animate-fade-in">
      {/* HEADER */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 z-30 shadow-lg shadow-slate-900/5 dark:shadow-black/20 rounded-2xl"
      >
        <div className="mx-auto py-4 px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-3 shadow-lg shadow-indigo-500/25 dark:shadow-indigo-500/20">
                <FiZap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  Update Daily Task
                </h1>
              </div>
            </motion.div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* View Toggle - Hidden on mobile */}
              <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1 border border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setViewMode("cards")}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    viewMode === "cards"
                      ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <FiGrid className="h-4 w-4 mr-1" />
                  Cards
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    viewMode === "table"
                      ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <FiList className="h-4 w-4 mr-1" />
                  Table
                </button>
              </div>

              <motion.button
                onClick={fetchTasks}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 text-indigo-600 dark:text-indigo-400 border border-gray-200 dark:border-gray-700"
                title="Refresh tasks"
              >
                <FiRefreshCw
                  className={`h-5 w-5 ${loading ? "animate-spin" : ""}`}
                />
              </motion.button>

              <motion.button
                onClick={openAddTaskModal}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-4 py-2.5 rounded-2xl  text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-sm font-semibold transition-all duration-200  overflow-hidden"
              >
                <FiPlus className="mr-2 h-5 w-5" />
                <span className="hidden sm:inline">Add Task</span>
                <span className="sm:hidden">Add</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* MAIN CONTENT */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-7xl">
        {/* FILTER / SEARCH */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 lg:mb-8"
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/5 dark:shadow-black/20 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            {/* Mobile Filter Toggle */}
            <div className="md:hidden bg-gradient-to-r from-indigo-500 to-purple-500 p-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-between w-full text-white"
              >
                <span className="flex items-center text-sm font-semibold">
                  <FiFilter className="mr-2 h-4 w-4" />
                  Filters & Search
                </span>
                <FiChevronDown
                  className={`h-5 w-5 transition-transform duration-200 ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Filter Content */}
            <div
              className={`p-4 lg:p-6 ${
                showFilters ? "block" : "hidden md:block"
              }`}
            >
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
                {/* Search */}
                <div className="relative flex-grow lg:max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search your tasks..."
                    className="block w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                  />
                </div>

                {/* Date Filter & Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative">
                    <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                    <input
                      type="date"
                      value={filterDate}
                      onChange={(e) => setFilterDate(e.target.value)}
                      className="pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 w-full sm:w-auto"
                    />
                  </div>

                  {(filterDate || searchTerm) && (
                    <motion.button
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      onClick={clearFilters}
                      className="inline-flex items-center justify-center px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white/80 dark:bg-gray-700/80 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 backdrop-blur-sm"
                    >
                      <FiX className="mr-2 h-4 w-4" />
                      Clear All
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Active Filters */}
              {(filterDate || searchTerm) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                >
                  <div className="flex flex-wrap gap-2">
                    {searchTerm && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700">
                        <FiSearch className="mr-1 h-3 w-3" />"{searchTerm}"
                      </span>
                    )}
                    {filterDate && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700">
                        <FiCalendar className="mr-1 h-3 w-3" />
                        {formatDate(filterDate)}
                      </span>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* TASKS CONTENT */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {loading && !loadingId ? (
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-12 lg:p-20 text-center shadow-xl shadow-slate-900/5 dark:shadow-black/20 border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 dark:border-indigo-800"></div>
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-indigo-500 absolute top-0"></div>
                </div>
                <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 font-medium">
                  Loading your tasks...
                </p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  This won't take long
                </p>
              </div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${viewMode}-${currentPage}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {currentTasks.length ? (
                  <>
                    {/* Mobile & Tablet Card View - Always Cards */}
                    <div className="block lg:hidden">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {currentTasks.map((item, idx) => (
                          <motion.div
                            key={item._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-5 shadow-xl shadow-slate-900/10 dark:shadow-black/30 border border-gray-200/60 dark:border-gray-700/60 hover:shadow-2xl hover:shadow-slate-900/20 dark:hover:shadow-black/40 transition-all duration-300 hover:-translate-y-1"
                          >
                            {/* Card Header */}
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/25">
                                  #{idx + 1 + startIndex}
                                </div>
                                <div className="flex flex-col">
                                  {item.task_Date && (
                                    <span
                                      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold mb-1 ${
                                        isToday(item.task_Date)
                                          ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700"
                                          : isPastDue(item.task_Date)
                                          ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700"
                                          : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
                                      }`}
                                    >
                                      <FiCalendar className="mr-1 h-3 w-3" />
                                      {formatDate(item.task_Date)}
                                    </span>
                                  )}
                                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700">
                                    <FiList className="mr-1 h-3 w-3" />
                                    {item.task.length} task
                                    {item.task.length !== 1 ? "s" : ""}
                                  </span>
                                </div>
                              </div>

                              {/* ALWAYS VISIBLE ACTION BUTTONS - NO ANIMATIONS */}
                              <div className="flex items-center space-x-2">
                                <button
                                  type="button"
                                  onClick={() => handleUpdateClick(item)}
                                  className="p-2.5 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-800/50 transition-colors border border-amber-200 dark:border-amber-700 shadow-sm"
                                  style={{ opacity: 1, visibility: "visible" }}
                                >
                                  <FiEdit2 className="h-4 w-4" />
                                </button>
                                <button
                                  type="button"
                                  disabled={loadingId === item._id}
                                  onClick={() => handleDeleteTask(item._id)}
                                  className="p-2.5 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors disabled:opacity-50 border border-red-200 dark:border-red-700 shadow-sm"
                                  style={{ opacity: 1, visibility: "visible" }}
                                >
                                  {loadingId === item._id ? (
                                    <FiRefreshCw className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <FiTrash2 className="h-4 w-4" />
                                  )}
                                </button>
                              </div>
                            </div>

                            {/* Show Only First Task */}
                            <div className="mb-4">
                              {item.task.length > 0 && (
                                <div className="flex items-start space-x-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-700/50 dark:to-gray-700/30 border border-gray-200/60 dark:border-gray-600/40 backdrop-blur-sm">
                                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-xs font-bold flex-shrink-0 mt-0.5 shadow-lg">
                                    1
                                  </div>
                                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-grow font-medium">
                                    {item.task[0]}
                                  </p>
                                </div>
                              )}

                              {item.task.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => openTaskDetailsModal(item)}
                                  className="w-full mt-3 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:from-purple-100 hover:to-indigo-100 dark:hover:from-purple-800/30 dark:hover:to-indigo-800/30 transition-colors font-medium text-sm"
                                >
                                  <div className="flex items-center justify-center space-x-2">
                                    <FiMoreVertical className="h-4 w-4" />
                                    <span>
                                      View {item.task.length - 1} more task
                                      {item.task.length - 1 !== 1 ? "s" : ""}
                                    </span>
                                  </div>
                                </button>
                              )}
                            </div>

                            {/* Card Footer */}
                            <div className="pt-3 border-t border-gray-200/60 dark:border-gray-600/40 flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                {!item.task_Date && (
                                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600">
                                    <FiAlertCircle className="mr-1 h-3 w-3" />
                                    No date
                                  </span>
                                )}
                                {item.task_Date && (
                                  <span
                                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                      isToday(item.task_Date)
                                        ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                                        : isPastDue(item.task_Date)
                                        ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                                        : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                                    }`}
                                  >
                                    {isToday(item.task_Date) ? (
                                      <>
                                        <FiClock className="mr-1 h-3 w-3" />
                                        Today
                                      </>
                                    ) : isPastDue(item.task_Date) ? (
                                      <>
                                        <FiAlertCircle className="mr-1 h-3 w-3" />
                                        Overdue
                                      </>
                                    ) : (
                                      <>
                                        <FiBookmark className="mr-1 h-3 w-3" />
                                        Scheduled
                                      </>
                                    )}
                                  </span>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Desktop View Toggle */}
                    <div
                      className={`${
                        viewMode === "cards" ? "hidden lg:block" : "hidden"
                      }`}
                    >
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {currentTasks.map((item, idx) => (
                          <motion.div
                            key={item._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl shadow-slate-900/10 dark:shadow-black/30 border border-gray-200/60 dark:border-gray-700/60 hover:shadow-2xl hover:shadow-slate-900/20 dark:hover:shadow-black/40 transition-all duration-300 hover:-translate-y-1"
                          >
                            {/* Card Header */}
                            <div className="flex items-start justify-between mb-6">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-lg shadow-lg shadow-indigo-500/25">
                                  #{idx + 1 + startIndex}
                                </div>
                                <div className="flex flex-col">
                                  {item.task_Date && (
                                    <span
                                      className={`inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-semibold mb-2 ${
                                        isToday(item.task_Date)
                                          ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700"
                                          : isPastDue(item.task_Date)
                                          ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700"
                                          : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
                                      }`}
                                    >
                                      <FiCalendar className="mr-2 h-4 w-4" />
                                      {formatDate(item.task_Date)}
                                    </span>
                                  )}
                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700">
                                    <FiList className="mr-1 h-3 w-3" />
                                    {item.task.length} task
                                    {item.task.length !== 1 ? "s" : ""}
                                  </span>
                                </div>
                              </div>

                              {/* ALWAYS VISIBLE ACTION BUTTONS - NO ANIMATIONS */}
                              <div className="flex items-center space-x-3">
                                <button
                                  type="button"
                                  onClick={() => handleUpdateClick(item)}
                                  className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-800/50 transition-colors border border-amber-200 dark:border-amber-700 shadow-lg shadow-amber-500/10"
                                  style={{ opacity: 1, visibility: "visible" }}
                                >
                                  <FiEdit2 className="h-5 w-5" />
                                </button>
                                <button
                                  type="button"
                                  disabled={loadingId === item._id}
                                  onClick={() => handleDeleteTask(item._id)}
                                  className="p-3 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors disabled:opacity-50 border border-red-200 dark:border-red-700 shadow-lg shadow-red-500/10"
                                  style={{ opacity: 1, visibility: "visible" }}
                                >
                                  {loadingId === item._id ? (
                                    <FiRefreshCw className="h-5 w-5 animate-spin" />
                                  ) : (
                                    <FiTrash2 className="h-5 w-5" />
                                  )}
                                </button>
                              </div>
                            </div>

                            {/* Task List */}
                            <div className="space-y-3 mb-6">
                              {item.task.slice(0, 3).map((task, taskIdx) => (
                                <motion.div
                                  key={taskIdx}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    delay: idx * 0.1 + taskIdx * 0.05,
                                  }}
                                  className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-700/50 dark:to-gray-700/30 border border-gray-200/60 dark:border-gray-600/40 backdrop-blur-sm"
                                >
                                  <div className="flex items-center justify-center h-7 w-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-sm font-bold flex-shrink-0 mt-0.5 shadow-lg">
                                    {taskIdx + 1}
                                  </div>
                                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-grow font-medium">
                                    {task}
                                  </p>
                                </motion.div>
                              ))}

                              {item.task.length > 3 && (
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => openTaskDetailsModal(item)}
                                  className="w-full p-4 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:from-purple-100 hover:to-indigo-100 dark:hover:from-purple-800/30 dark:hover:to-indigo-800/30 transition-all duration-200 font-medium"
                                >
                                  <div className="flex items-center justify-center space-x-2">
                                    <FiMoreVertical className="h-4 w-4" />
                                    <span>
                                      View {item.task.length - 3} more task
                                      {item.task.length - 3 !== 1 ? "s" : ""}
                                    </span>
                                  </div>
                                </motion.button>
                              )}
                            </div>

                            {/* Card Footer */}
                            <div className="pt-4 border-t border-gray-200/60 dark:border-gray-600/40 flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                {!item.task_Date && (
                                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600">
                                    <FiAlertCircle className="mr-1.5 h-3 w-3" />
                                    No date set
                                  </span>
                                )}
                                {item.task_Date && (
                                  <span
                                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
                                      isToday(item.task_Date)
                                        ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                                        : isPastDue(item.task_Date)
                                        ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                                        : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                                    }`}
                                  >
                                    {isToday(item.task_Date) ? (
                                      <>
                                        <FiClock className="mr-1.5 h-3 w-3" />
                                        Due Today
                                      </>
                                    ) : isPastDue(item.task_Date) ? (
                                      <>
                                        <FiAlertCircle className="mr-1.5 h-3 w-3" />
                                        Overdue
                                      </>
                                    ) : (
                                      <>
                                        <FiBookmark className="mr-1.5 h-3 w-3" />
                                        Scheduled
                                      </>
                                    )}
                                  </span>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Desktop Table View */}
                    <div
                      className={`${
                        viewMode === "table" ? "hidden lg:block" : "hidden"
                      }`}
                    >
                      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl shadow-slate-900/5 dark:shadow-black/20 border border-gray-200/50 dark:border-gray-700/50">
                        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-6 px-8">
                          <h2 className="text-2xl font-bold text-white flex items-center">
                            <FiList className="mr-3 h-6 w-6" />
                            Your Tasks
                            {(filterDate || searchTerm) && (
                              <span className="ml-3 text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                                {filterDate && searchTerm
                                  ? "Filtered & Searched"
                                  : filterDate
                                  ? "Date Filtered"
                                  : "Searched"}
                              </span>
                            )}
                          </h2>
                        </div>

                        <div
                          className="overflow-x-auto  [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
                transition-colors duration-300"
                        >
                          <table className="min-w-full divide-y divide-gray-200/50 dark:divide-gray-700/50">
                            <thead className="bg-gray-50/80 dark:bg-gray-700/50 backdrop-blur-sm">
                              <tr>
                                {[
                                  "S.L",
                                  "First Task",
                                  "Total Tasks",
                                  "Date",
                               
                                  "Actions",
                                ].map((header) => (
                                  <th
                                    key={header}
                                    className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                                  >
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                              {currentTasks.map((item, idx) => (
                                <motion.tr
                                  key={item._id}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="group hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 dark:hover:from-indigo-900/10 dark:hover:to-purple-900/10 transition-all duration-200"
                                >
                                  <td className="px-6 py-4">
                                    <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-bold text-sm shadow-lg">
                                      {idx + 1 + startIndex}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="max-w-xs">
                                      {item.task.length > 0 && (
                                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50/80 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50">
                                          <span className="flex items-center justify-center h-5 w-5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold flex-shrink-0 mt-0.5">
                                            1
                                          </span>
                                          <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                            {truncateText(item.task[0])}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700">
                                        {/* <FiList className="mr-1 h-3 w-3" /> */}
                                        {item.task.length} task{" "}
                                        {item.task.length !== 1 ? "s" : ""}
                                      </span>
                                      {item.task.length > 1 && (
                                        <motion.button
                                          whileHover={{ scale: 1.05 }}
                                          whileTap={{ scale: 0.95 }}
                                          onClick={() =>
                                            openTaskDetailsModal(item)
                                          }
                                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors border border-purple-200 dark:border-purple-700"
                                        >
                                          <FiMoreVertical className="mr-1 h-3 w-3" />
                                          More
                                        </motion.button>
                                      )}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    {item.task_Date ? (
                                      <span
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                          isToday(item.task_Date)
                                            ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700"
                                            : isPastDue(item.task_Date)
                                            ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700"
                                            : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
                                        }`}
                                      >
                                        <FiCalendar className="mr-2 h-4 w-4" />
                                        {formatDate(item.task_Date)}
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600">
                                        <FiAlertCircle className="mr-2 h-4 w-4" />
                                        No date set
                                      </span>
                                    )}
                                  </td>
                           

                                  <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                      <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => handleUpdateClick(item)}
                                        className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-800/40 transition-all duration-200 border border-amber-200 dark:border-amber-700"
                                      >
                                        <FiEdit2 className="mr-1 h-4 w-4" />
                                        Edit
                                      </motion.button>
                                      <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        disabled={loadingId === item._id}
                                        onClick={() =>
                                          handleDeleteTask(item._id)
                                        }
                                        className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800/40 transition-all duration-200 disabled:opacity-50 border border-red-200 dark:border-red-700"
                                      >
                                        {loadingId === item._id ? (
                                          <FiRefreshCw className="mr-1 h-4 w-4 animate-spin" />
                                        ) : (
                                          <FiTrash2 className="mr-1 h-4 w-4" />
                                        )}
                                        Delete
                                      </motion.button>
                                    </div>
                                  </td>
                                </motion.tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  /* Empty State */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-12 lg:p-20 text-center shadow-xl shadow-slate-900/5 dark:shadow-black/20 border border-gray-200/50 dark:border-gray-700/50"
                  >
                    <motion.div
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex flex-col items-center"
                    >
                      <div className="h-24 w-24 lg:h-32 lg:w-32 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center text-indigo-500 dark:text-indigo-400 mb-6 shadow-lg">
                        <FiLayout className="h-12 w-12 lg:h-16 lg:w-16" />
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-700 dark:text-gray-200 mb-2">
                        No tasks found
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md leading-relaxed">
                        {filterDate || searchTerm
                          ? "No tasks match your current filters. Try adjusting your search criteria or "
                          : "Ready to boost your productivity? "}
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                          Create your first task to get started!
                        </span>
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        {(filterDate || searchTerm) && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={clearFilters}
                            className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 border border-gray-200 dark:border-gray-600"
                          >
                            <FiX className="mr-2 h-4 w-4" />
                            Clear Filters
                          </motion.button>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={openAddTaskModal}
                          className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg shadow-indigo-500/25"
                        >
                          <FiPlus className="mr-2 h-4 w-4" />
                          Add Your First Task
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {/* PAGINATION */}
          {totalItems > 0 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/5 dark:shadow-black/20 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                <div className="py-4 px-6 flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
                  <div className="text-sm text-gray-500 dark:text-gray-400 text-center lg:text-left">
                    Showing{" "}
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      {startIndex + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      {Math.min(indexOfLastTask, totalItems)}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      {totalItems}
                    </span>{" "}
                    tasks
                  </div>

                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="inline-flex items-center px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-700/80 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 backdrop-blur-sm"
                    >
                      <FiChevronLeft className="mr-1 h-4 w-4" />
                      <span className="hidden sm:inline">Previous</span>
                      <span className="sm:hidden">Prev</span>
                    </motion.button>

                    <div className="flex items-center rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm">
                      <input
                        type="number"
                        min="1"
                        max={totalPages}
                        value={manualPage}
                        onChange={(e) =>
                          setManualPage(parseInt(e.target.value, 10) || "")
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") goToPage(Number(manualPage));
                        }}
                        onBlur={() => goToPage(Number(manualPage))}
                        className="w-16 text-center border-none py-2 bg-transparent text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <span className="bg-gray-100 dark:bg-gray-600 px-3 py-2 text-gray-500 dark:text-gray-400 text-sm font-medium">
                        / {totalPages}
                      </span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages || totalPages === 0}
                      className="inline-flex items-center px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-700/80 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 backdrop-blur-sm"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <span className="sm:hidden">Next</span>
                      <FiChevronRight className="ml-1 h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* ADD / EDIT MODAL */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCancelEdit}
        taskList={taskList}
        taskDate={taskDate}
        setTaskDate={setTaskDate}
        handleAddTaskInput={handleAddTaskInput}
        handleDeleteTaskInput={handleDeleteTaskInput}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
        editMode={editMode}
      />

      {/* TASK DETAILS MODAL */}
      <TaskDetailsModal
        isOpen={detailModalOpen}
        onClose={closeTaskDetailsModal}
        taskDetails={selectedTaskDetails}
        onEdit={handleUpdateClick}
        formatDate={formatDate}
        isToday={isToday}
        isPastDue={isPastDue}
      />
    </div>
  );
}
