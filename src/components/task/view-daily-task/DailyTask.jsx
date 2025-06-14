// // DailyTask.jsx
// import React, { useState, useEffect } from "react";
// import {
//   FaSearch,
//   FaEye,
//   FaTrash,
//   FaCommentDots,
// } from "react-icons/fa";
// import CommentModal from "./CommentModal";
// import { useNavigate } from "react-router-dom";  // ADD THIS
// import DailyTaskModal from "./DailyTaskModal";
// import ConfirmationDialog from "../../common/ConfirmationDialog";
// import { fetchManagerTasks, getSubordinateDepartments } from "../../../service/taskService";
// import { fetchDailyTasksByEmployeeId } from "../../../service/taskService";
// import { Toaster, toast } from "react-hot-toast";

// const DailyTask = () => {
//   // State for tasks and modals.
//   const [tasks, setTasks] = useState([]);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [commentTask, setCommentTask] = useState(null);
//   const [deleteTask, setDeleteTask] = useState(null);
//   const navigate = useNavigate();  // ADD THIS
//   // Set default date to today's date in YYYY-MM-DD format.
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  
//   // States for search, department filter and pagination.
//   const [searchTerm, setSearchTerm] = useState("");
//   const [departments, setDepartments] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);

//   // Fetch tasks for the selected date.
//   useEffect(() => {
//     const loadTasks = async () => {
//       const fetchedTasks = await fetchManagerTasks(selectedDate);
//       setTasks(fetchedTasks);
//       setCurrentPage(1); // Reset page on date change.
//     };
//     loadTasks();
//   }, [selectedDate]);

//   // Fetch subordinate departments on component mount.
//   useEffect(() => {
//     const loadDepartments = async () => {
//       const deptData = await getSubordinateDepartments();
//       setDepartments(deptData);
//     };
//     loadDepartments();
//   }, []);

//   // Filter tasks based on search input (by Employee ID, Name) and department.
//   const filteredTasks = tasks.filter((task) => {
//     const matchesSearch =
//       task.employee_Id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       task.full_Name.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesDepartment =
//       selectedDepartment === "All Departments" || task.department === selectedDepartment;
//     return matchesSearch && matchesDepartment;
//   });

//   const totalPages = Math.ceil(filteredTasks.length / pageSize) || 1;
//   const paginatedTasks = filteredTasks.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   // Handle task deletion.
//   const handleDelete = (taskId) => {
//     setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
//     setDeleteTask(null);
//     toast.success("Task deleted successfully!");
//   };

//   return (
//     <div className="p-6 min-h-screen bg-gray-50 text-black dark:bg-gray-900 dark:text-white transition-all">
//       <Toaster /> {/* Global toaster for notifications */}

//       {/* Header */}
//       <div className="mb-4">
//         <h2 className="text-xl font-bold">View Dailyk</h2>
//       </div>

//       {/* Controls */}
//       <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 px-4 mb-4">
//         {/* Data Per Page Select */}
//         <div className="flex items-center">
//           <label className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
//             Show
//           </label>
//           <select
//             value={pageSize}
//             onChange={(e) => {
//               setPageSize(Number(e.target.value));
//               setCurrentPage(1);
//             }}
//             className="border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 text-sm bg-white dark:bg-gray-800"
//           >
//             <option value={5}>5</option>
//             <option value={10}>10</option>
//             <option value={15}>15</option>
//             <option value={20}>20</option>
//             <option value={50}>50</option>
//             <option value={100}>100</option>
//           </select>
//           <span className="ml-1 text-sm text-gray-700 dark:text-gray-300">
//             per page
//           </span>
//         </div>

//         {/* Search */}
//         <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 text-sm">
//           <FaSearch className="text-gray-400 mr-2" />
//           <input
//             type="text"
//             placeholder="Search by Employee ID or Name"
//             className="w-full focus:outline-none dark:bg-gray-900"
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setCurrentPage(1);
//             }}
//           />
//         </div>

//         {/* Date Picker & Department Filter */}
//         <div className="flex items-center gap-2 ml-auto">
//           {/* Date Picker */}
//           <div className="flex items-center">
//             <label className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
//               Select Date
//             </label>
//             <input
//               type="date"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               className="border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 text-sm focus:outline-none dark:bg-gray-900"
//             />
//           </div>
//           {/* Department Filter */}
//           <div className="flex items-center">
//             <label className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
//               Department
//             </label>
//             <select
//               value={selectedDepartment}
//               onChange={(e) => {
//                 setSelectedDepartment(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 text-sm focus:outline-none dark:bg-gray-900"
//             >
//               <option value="All Departments">All Departments</option>
//               {departments.map((dept, index) => (
//                 <option key={index} value={dept}>
//                   {dept}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Task Table */}
//       <div className="shadow-lg rounded-lg p-4 bg-white dark:bg-gray-800 transition-all">
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse text-sm">
//             <thead>
//               <tr className="bg-gray-100 dark:bg-gray-700 text-left text-black dark:text-white">
//                 <th className="p-3">S.L</th>
//                 <th className="p-3">Emp ID</th>
//                 <th className="p-3">Name</th>
//                 <th className="p-3">Assigned Date</th>
//                 <th className="p-3">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedTasks.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="p-3 text-center">
//                     No data available.
//                   </td>
//                 </tr>
//               ) : (
//                 paginatedTasks.map((task, index) => (
//                   <tr
//                     key={task.id}
//                     className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition"
//                   >
//                     <td className="p-3">
//                       {(currentPage - 1) * pageSize + index + 1}
//                     </td>
//                      <td 
//   className="p-3 text-blue-500 cursor-pointer"
//   onClick={async () => {
//     try {
//       const employeeId = task.employee_Id;
//       const dailyTasks = await fetchDailyTasksByEmployeeId(employeeId);

//       // Check if tasks were fetched successfully
//       if (dailyTasks.length > 0) {
//         // You can pass data via state or context. Here, a simple example using state:
//         navigate(`/dashboard/employee-particular-tasks/${employeeId}`, {
//           state: { dailyTasks, employeeName: task.full_Name },
//         });
//       } else {
//         toast.error("No daily tasks found for this employee.");
//       }
//     } catch (error) {
//       console.error("Error fetching employee daily tasks:", error);
//       toast.error("Failed to load daily tasks.");
//     }
//   }}
// >
//   {task.employee_Id}
// </td>
//                     <td className="p-3">{task.full_Name}</td>
//                     <td className="p-3">
//                       {new Date(task.createdAt || "N/A").toLocaleDateString("en-IN", {
//                         timeZone: "Asia/Kolkata",
//                       })}
//                     </td>
//                     <td className="p-3 flex gap-3">
//                       <FaEye
//                         size={20}
//                         className="text-blue-500 cursor-pointer"
//                         onClick={() => setSelectedTask(task)}
//                       />
//                       {/* Uncomment below for additional actions */}
//                       {/* <FaCommentDots
//                         size={20}
//                         className="text-gray-500 cursor-pointer"
//                         onClick={() => setCommentTask(task)}
//                       />
//                       <FaTrash
//                         size={20}
//                         className="text-red-500 cursor-pointer"
//                         onClick={() => setDeleteTask(task)}
//                       /> */}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination Controls */}
//         <div className="flex flex-col md:flex-row items-center justify-between mt-4">
//           <div className="mb-2 md:mb-0">
//             <span className="text-sm text-gray-700 dark:text-gray-300">
//               Page {currentPage} of {totalPages}
//             </span>
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="px-3 py-1 border rounded text-sm text-gray-700 dark:text-gray-300 disabled:opacity-50"
//             >
//               Prev
//             </button>
//             <button
//               onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className="px-3 py-1 border rounded text-sm text-gray-700 dark:text-gray-300 disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//           <div className="flex items-center gap-2">
//             <label className="text-sm text-gray-700 dark:text-gray-300">Go to page:</label>
//             <input
//               type="number"
//               min="1"
//               max={totalPages}
//               value={currentPage}
//               onChange={(e) => {
//                 let page = Number(e.target.value);
//                 if (page > totalPages) page = totalPages;
//                 if (page < 1) page = 1;
//                 setCurrentPage(page);
//               }}
//               className="w-16 border rounded px-2 py-1 text-sm text-gray-700 dark:text-gray-300"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Modals */}
//       <DailyTaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
//       <CommentModal task={commentTask} onClose={() => setCommentTask(null)} />
//       <ConfirmationDialog
//         open={!!deleteTask}
//         title="Delete Task"
//         message="Are you sure you want to delete this task? This action cannot be undone."
//         onConfirm={() => handleDelete(deleteTask?.id)}
//         onCancel={() => setDeleteTask(null)}
//       />
//     </div>
//   );
// };

// export default DailyTask;


// DailyTask.jsx


// import React, { useState, useEffect } from "react";
// import {
//   FaSearch,
//   FaEye,
//   FaTrash,
//   FaCommentDots,
//   FaCalendarAlt,
//   FaFilter,
//   FaUser,
//   FaBuilding,
//   FaChevronLeft,
//   FaChevronRight,
//   FaSpinner,
//   FaTasks,
//   FaUserTie,
//   FaClock,
// } from "react-icons/fa";
// import { BiFilterAlt } from "react-icons/bi";
// import { MdViewList, MdGridView } from "react-icons/md";
// import CommentModal from "./CommentModal";
// import { useNavigate } from "react-router-dom";
// import DailyTaskModal from "./DailyTaskModal";
// import ConfirmationDialog from "../../common/ConfirmationDialog";
// import { fetchManagerTasks, getSubordinateDepartments } from "../../../service/taskService";
// import { fetchDailyTasksByEmployeeId } from "../../../service/taskService";
// import { Toaster, toast } from "react-hot-toast";

// const DailyTask = () => {
//   // State for tasks and modals
//   const [tasks, setTasks] = useState([]);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [commentTask, setCommentTask] = useState(null);
//   const [deleteTask, setDeleteTask] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
  
//   // Set default date to today's date in YYYY-MM-DD format
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  
//   // States for search, department filter and pagination
//   const [searchTerm, setSearchTerm] = useState("");
//   const [departments, setDepartments] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [showFilters, setShowFilters] = useState(false);

//   // Fetch tasks for the selected date
//   useEffect(() => {
//     const loadTasks = async () => {
//       setLoading(true);
//       try {
//         const fetchedTasks = await fetchManagerTasks(selectedDate);
//         setTasks(fetchedTasks);
//         setCurrentPage(1);
//       } catch (error) {
//         toast.error("Failed to load tasks");
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadTasks();
//   }, [selectedDate]);

//   // Fetch subordinate departments on component mount
//   useEffect(() => {
//     const loadDepartments = async () => {
//       try {
//         const deptData = await getSubordinateDepartments();
//         setDepartments(deptData);
//       } catch (error) {
//         toast.error("Failed to load departments");
//       }
//     };
//     loadDepartments();
//   }, []);

//   // Filter tasks based on search input and department
//   const filteredTasks = tasks.filter((task) => {
//     const matchesSearch =
//       task.employee_Id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       task.full_Name.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesDepartment =
//       selectedDepartment === "All Departments" || task.department === selectedDepartment;
//     return matchesSearch && matchesDepartment;
//   });

//   const totalPages = Math.ceil(filteredTasks.length / pageSize) || 1;
//   const paginatedTasks = filteredTasks.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   // Handle task deletion
//   const handleDelete = (taskId) => {
//     setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
//     setDeleteTask(null);
//     toast.success("Task deleted successfully!");
//   };

//   // Handle employee ID click
//   const handleEmployeeClick = async (task) => {
//     try {
//       setLoading(true);
//       const employeeId = task.employee_Id;
//       const dailyTasks = await fetchDailyTasksByEmployeeId(employeeId);

//       if (dailyTasks.length > 0) {
//         navigate(`/dashboard/employee-particular-tasks/${employeeId}`, {
//           state: { dailyTasks, employeeName: task.full_Name },
//         });
//       } else {
//         toast.error("No daily tasks found for this employee.");
//       }
//     } catch (error) {
//       console.error("Error fetching employee daily tasks:", error);
//       toast.error("Failed to load daily tasks.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Generate page numbers for pagination
//   const getPageNumbers = () => {
//     const delta = 2;
//     const range = [];
//     const rangeWithDots = [];

//     for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
//       range.push(i);
//     }

//     if (currentPage - delta > 2) {
//       rangeWithDots.push(1, '...');
//     } else {
//       rangeWithDots.push(1);
//     }

//     rangeWithDots.push(...range);

//     if (currentPage + delta < totalPages - 1) {
//       rangeWithDots.push('...', totalPages);
//     } else {
//       rangeWithDots.push(totalPages);
//     }

//     return rangeWithDots;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 rounded-2xl ">
//       <Toaster position="top-right" />

//       {/* Modern Header */}
//       <div className="bg-white dark:bg-gray-800 shadow-sm  rounded-2xl">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center space-x-4">
//               <div className="flex-shrink-0">
//                 <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
//                   <FaTasks className="w-5 h-5 text-white" />
//                 </div>
//               </div>
//               <div>
//                 <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Daily Tasks</h1>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Manage daily task assignments</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="hidden sm:flex items-center px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full">
//                 <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
//                   {filteredTasks.length} Tasks
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Search and Filters */}
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
//           <div className="p-6">
//             {/* Search Bar */}
//             <div className="flex flex-col sm:flex-row gap-4 mb-6">
//               <div className="flex-1 relative">
//                 <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <input
//                   type="text"
//                   placeholder="Search by employee ID or name..."
//                   value={searchTerm}
//                   onChange={(e) => {
//                     setSearchTerm(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
//                 />
//               </div>
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className={`flex items-center justify-center px-4 py-2.5 border rounded-lg transition-colors ${
//                   showFilters
//                     ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400'
//                     : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
//                 }`}
//               >
//                 <BiFilterAlt className="w-4 h-4 mr-2" />
//                 Filters
//               </button>
//             </div>

//             {/* Filters */}
//             {showFilters && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Items per page
//                   </label>
//                   <select
//                     value={pageSize}
//                     onChange={(e) => {
//                       setPageSize(Number(e.target.value));
//                       setCurrentPage(1);
//                     }}
//                     className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value={5}>5 per page</option>
//                     <option value={10}>10 per page</option>
//                     <option value={15}>15 per page</option>
//                     <option value={20}>20 per page</option>
//                     <option value={50}>50 per page</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Date
//                   </label>
//                   <input
//                     type="date"
//                     value={selectedDate}
//                     onChange={(e) => setSelectedDate(e.target.value)}
//                     className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Department
//                   </label>
//                   <select
//                     value={selectedDepartment}
//                     onChange={(e) => {
//                       setSelectedDepartment(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                     className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="All Departments">All Departments</option>
//                     {departments.map((dept, index) => (
//                       <option key={index} value={dept}>
//                         {dept}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="flex items-end">
//                   <button
//                     onClick={() => {
//                       setSearchTerm("");
//                       setSelectedDepartment("All Departments");
//                       setCurrentPage(1);
//                     }}
//                     className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
//                   >
//                     Clear Filters
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12">
//             <div className="flex flex-col items-center justify-center">
//               <FaSpinner className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin mb-4" />
//               <p className="text-gray-600 dark:text-gray-400">Loading tasks...</p>
//             </div>
//           </div>
//         )}

//         {/* Content */}
//         {!loading && (
//           <>
//             {/* Desktop Table */}
//             <div className="hidden md:block bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
//               {paginatedTasks.length === 0 ? (
//                 <div className="p-12 text-center">
//                   <FaSearch className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                   <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No tasks found</h3>
//                   <p className="text-gray-500 dark:text-gray-400">Try adjusting your search criteria or filters.</p>
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                     <thead className="bg-gray-50 dark:bg-gray-700">
//                       <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                           #
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                           Employee
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                           Department
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                           Task Date
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                       {paginatedTasks.map((task, index) => (
//                         <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
//                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
//                             {(currentPage - 1) * pageSize + index + 1}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="flex items-center">
//                               <div className="flex-shrink-0 h-10 w-10">
//                                 {task.user_Avatar ? (
//                                   <img
//                                     className="h-10 w-10 rounded-full object-cover"
//                                     src={task.user_Avatar}
//                                     alt={task.full_Name}
//                                     onError={(e) => {
//                                       e.target.style.display = 'none';
//                                       e.target.nextSibling.style.display = 'flex';
//                                     }}
//                                   />
//                                 ) : null}
//                                 <div className={`h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center ${task.user_Avatar ? 'hidden' : ''}`}>
//                                   <FaUserTie className="w-4 h-4 text-white" />
//                                 </div>
//                               </div>
//                               <div className="ml-4">
//                                 <div className="text-sm font-medium text-gray-900 dark:text-white">
//                                   {task.full_Name}
//                                 </div>
//                                 <button
//                                   onClick={() => handleEmployeeClick(task)}
//                                   className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
//                                 >
//                                   ID: {task.employee_Id}
//                                 </button>
//                                 {task.designation && (
//                                   <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                                     {task.designation}
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
//                               <FaBuilding className="w-3 h-3 mr-1" />
//                               {task.department || 'N/A'}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="flex items-center text-sm text-gray-900 dark:text-white">
//                               <FaClock className="w-4 h-4 mr-2 text-gray-400" />
//                               {new Date(task.task_Date || "N/A").toLocaleDateString("en-IN", {
//                                 timeZone: "Asia/Kolkata",
//                               })}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                             <div className="flex items-center space-x-3">
//                               <button
//                                 onClick={() => setSelectedTask(task)}
//                                 className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
//                                 title="View Details"
//                               >
//                                 <FaEye className="w-4 h-4" />
//                               </button>
//                               {/* Uncomment for additional actions */}
//                               {/* <button
//                                 onClick={() => setCommentTask(task)}
//                                 className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
//                                 title="Comments"
//                               >
//                                 <FaCommentDots className="w-4 h-4" />
//                               </button>
//                               <button
//                                 onClick={() => setDeleteTask(task)}
//                                 className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
//                                 title="Delete"
//                               >
//                                 <FaTrash className="w-4 h-4" />
//                               </button> */}
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>

//             {/* Mobile Cards */}
//             <div className="md:hidden">
//               {paginatedTasks.length === 0 ? (
//                 <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
//                   <FaSearch className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                   <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No tasks found</h3>
//                   <p className="text-gray-500 dark:text-gray-400">Try adjusting your search criteria or filters.</p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {paginatedTasks.map((task, index) => (
//                     <div
//                       key={task.id}
//                       className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow"
//                     >
//                       <div className="flex items-start justify-between mb-3">
//                         <div className="flex items-center space-x-3">
//                           <div className="flex-shrink-0">
//                             {task.user_Avatar ? (
//                               <div className="relative">
//                                 <img
//                                   className="w-12 h-12 rounded-full object-cover"
//                                   src={task.user_Avatar}
//                                   alt={task.full_Name}
//                                   onError={(e) => {
//                                     e.target.style.display = 'none';
//                                     e.target.nextSibling.style.display = 'flex';
//                                   }}
//                                 />
//                                 <div className="hidden w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
//                                   <span className="text-white text-sm font-medium">
//                                     {(currentPage - 1) * pageSize + index + 1}
//                                   </span>
//                                 </div>
//                                 <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
//                                   <span className="text-white text-xs font-bold">
//                                     {(currentPage - 1) * pageSize + index + 1}
//                                   </span>
//                                 </div>
//                               </div>
//                             ) : (
//                               <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
//                                 <span className="text-white text-sm font-medium">
//                                   {(currentPage - 1) * pageSize + index + 1}
//                                 </span>
//                               </div>
//                             )}
//                           </div>
//                           <div>
//                             <h3 className="text-lg font-medium text-gray-900 dark:text-white">
//                               {task.full_Name}
//                             </h3>
//                             <button
//                               onClick={() => handleEmployeeClick(task)}
//                               className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
//                             >
//                               ID: {task.employee_Id}
//                             </button>
//                             {task.designation && (
//                               <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                                 {task.designation}
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                       </div>

//                       <div className="space-y-2 mb-4">
//                         {task.department && (
//                           <div className="flex items-center">
//                             <FaBuilding className="w-4 h-4 text-gray-400 mr-2" />
//                             <span className="text-sm text-gray-600 dark:text-gray-400">{task.department}</span>
//                           </div>
//                         )}
//                         <div className="flex items-center">
//                           <FaClock className="w-4 h-4 text-gray-400 mr-2" />
//                           <span className="text-sm text-gray-600 dark:text-gray-400">
//                             Task Date: {new Date(task.task_Date || "N/A").toLocaleDateString("en-IN", {
//                               timeZone: "Asia/Kolkata",
//                             })}
//                           </span>
//                         </div>
//                         {task.teams && (
//                           <div className="flex items-center">
//                             <FaUser className="w-4 h-4 text-gray-400 mr-2" />
//                             <span className="text-sm text-gray-600 dark:text-gray-400">Team: {task.teams}</span>
//                           </div>
//                         )}
//                       </div>

//                       <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
//                         <button
//                           onClick={() => handleEmployeeClick(task)}
//                           className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
//                         >
//                           <FaUser className="w-4 h-4" />
//                           <span>View Tasks</span>
//                         </button>
                        
//                         <div className="flex items-center space-x-2">
//                           <button
//                             onClick={() => setSelectedTask(task)}
//                             className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
//                             title="View Details"
//                           >
//                             <FaEye className="w-4 h-4" />
//                           </button>
//                           {/* Uncomment for additional actions */}
//                           {/* <button
//                             onClick={() => setCommentTask(task)}
//                             className="p-2 text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg transition-colors"
//                             title="Comments"
//                           >
//                             <FaCommentDots className="w-4 h-4" />
//                           </button>
//                           <button
//                             onClick={() => setDeleteTask(task)}
//                             className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors"
//                             title="Delete"
//                           >
//                             <FaTrash className="w-4 h-4" />
//                           </button> */}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </>
//         )}

//         {/* Modern Pagination */}
//         {!loading && paginatedTasks.length > 0 && (
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 px-6 py-4 mt-6">
//             <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
//               {/* Results Info */}
//               <div className="text-sm text-gray-700 dark:text-gray-300">
//                 Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to{' '}
//                 <span className="font-medium">
//                   {Math.min(currentPage * pageSize, filteredTasks.length)}
//                 </span>{' '}
//                 of <span className="font-medium">{filteredTasks.length}</span> results
//               </div>

//               {/* Pagination Controls */}
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                   className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <FaChevronLeft className="w-3 h-3 mr-1" />
//                   Previous
//                 </button>

//                 <div className="hidden sm:flex items-center space-x-1">
//                   {getPageNumbers().map((pageNum, index) => (
//                     <React.Fragment key={index}>
//                       {pageNum === '...' ? (
//                         <span className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">...</span>
//                       ) : (
//                         <button
//                           onClick={() => setCurrentPage(pageNum)}
//                           className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
//                             currentPage === pageNum
//                               ? 'bg-blue-600 text-white'
//                               : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
//                           }`}
//                         >
//                           {pageNum}
//                         </button>
//                       )}
//                     </React.Fragment>
//                   ))}
//                 </div>

//                 <button
//                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                   disabled={currentPage === totalPages}
//                   className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   Next
//                   <FaChevronRight className="w-3 h-3 ml-1" />
//                 </button>
//               </div>

//               {/* Go to page input */}
//               <div className="flex items-center space-x-2 text-sm">
//                 <label className="text-gray-700 dark:text-gray-300">Go to:</label>
//                 <input
//                   type="number"
//                   min="1"
//                   max={totalPages}
//                   value={currentPage}
//                   onChange={(e) => {
//                     const page = Math.max(1, Math.min(totalPages, Number(e.target.value) || 1));
//                     setCurrentPage(page);
//                   }}
//                   className="w-16 px-2 py-1 text-center border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Modals */}
//       <DailyTaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
//       <CommentModal task={commentTask} onClose={() => setCommentTask(null)} />
//       <ConfirmationDialog
//         open={!!deleteTask}
//         title="Delete Task"
//         message="Are you sure you want to delete this task? This action cannot be undone."
//         onConfirm={() => handleDelete(deleteTask?.id)}
//         onCancel={() => setDeleteTask(null)}
//       />
//     </div>
//   );
// };

// export default DailyTask;


// // DailyTask.jsx
// import React, { useState, useEffect } from "react";
// import {
//   FaSearch,
//   FaEye,
//   FaTrash,
//   FaCommentDots,
//   FaCalendarAlt,
//   FaFilter,
//   FaUser,
//   FaBuilding,
//   FaChevronLeft,
//   FaChevronRight,
//   FaSpinner,
//   FaTasks,
//   FaUserTie,
//   FaClock,
//   FaUsers,
//   FaCheckCircle,
//   FaExclamationTriangle,
//   FaChartLine,
// } from "react-icons/fa";
// import { BiFilterAlt } from "react-icons/bi";
// import { MdViewList, MdGridView } from "react-icons/md";
// import CommentModal from "./CommentModal";
// import { useNavigate } from "react-router-dom";
// import DailyTaskModal from "./DailyTaskModal";
// import ConfirmationDialog from "../../common/ConfirmationDialog";
// import { fetchManagerTasks, getSubordinateDepartments } from "../../../service/taskService";
// import { fetchDailyTasksByEmployeeId } from "../../../service/taskService";
// import { Toaster, toast } from "react-hot-toast";

// const DailyTask = () => {
//   // State for tasks and modals
//   const [tasks, setTasks] = useState([]);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [commentTask, setCommentTask] = useState(null);
//   const [deleteTask, setDeleteTask] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
  
//   // Set default date to today's date in YYYY-MM-DD format
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  
//   // States for search, department filter and pagination
//   const [searchTerm, setSearchTerm] = useState("");
//   const [departments, setDepartments] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [showFilters, setShowFilters] = useState(false);

//   // Fetch tasks for the selected date
//   useEffect(() => {
//     const loadTasks = async () => {
//       setLoading(true);
//       try {
//         const fetchedTasks = await fetchManagerTasks(selectedDate);
//         setTasks(fetchedTasks);
//         setCurrentPage(1);
//       } catch (error) {
//         toast.error("Failed to load tasks");
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadTasks();
//   }, [selectedDate]);

//   // Fetch subordinate departments on component mount
//   useEffect(() => {
//     const loadDepartments = async () => {
//       try {
//         const deptData = await getSubordinateDepartments();
//         setDepartments(deptData);
//       } catch (error) {
//         toast.error("Failed to load departments");
//       }
//     };
//     loadDepartments();
//   }, []);

//   // Filter tasks based on search input and department
//   const filteredTasks = tasks.filter((task) => {
//     const matchesSearch =
//       task.employee_Id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       task.full_Name.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesDepartment =
//       selectedDepartment === "All Departments" || task.department === selectedDepartment;
//     return matchesSearch && matchesDepartment;
//   });

//   const totalPages = Math.ceil(filteredTasks.length / pageSize) || 1;
//   const paginatedTasks = filteredTasks.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   // Calculate statistics
//   const totalTasks = filteredTasks.length;
//   const totalEmployees = new Set(filteredTasks.map(task => task.employee_Id)).size;
//   const totalDepartments = new Set(filteredTasks.map(task => task.department)).size;
//   const tasksByDepartment = filteredTasks.reduce((acc, task) => {
//     acc[task.department] = (acc[task.department] || 0) + 1;
//     return acc;
//   }, {});

//   // Handle task deletion
//   const handleDelete = (taskId) => {
//     setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
//     setDeleteTask(null);
//     toast.success("Task deleted successfully!");
//   };

//   // Handle employee ID click
//   const handleEmployeeClick = async (task) => {
//     try {
//       setLoading(true);
//       const employeeId = task.employee_Id;
//       const dailyTasks = await fetchDailyTasksByEmployeeId(employeeId);

//       if (dailyTasks.length > 0) {
//         navigate(`/dashboard/employee-particular-tasks/${employeeId}`, {
//           state: { dailyTasks, employeeName: task.full_Name },
//         });
//       } else {
//         toast.error("No daily tasks found for this employee.");
//       }
//     } catch (error) {
//       console.error("Error fetching employee daily tasks:", error);
//       toast.error("Failed to load daily tasks.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Generate page numbers for pagination
//   const getPageNumbers = () => {
//     const delta = 2;
//     const range = [];
//     const rangeWithDots = [];

//     for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
//       range.push(i);
//     }

//     if (currentPage - delta > 2) {
//       rangeWithDots.push(1, '...');
//     } else {
//       rangeWithDots.push(1);
//     }

//     rangeWithDots.push(...range);

//     if (currentPage + delta < totalPages - 1) {
//       rangeWithDots.push('...', totalPages);
//     } else {
//       rangeWithDots.push(totalPages);
//     }

//     return rangeWithDots;
//   };

//   // Statistics Cards Component
//   const StatCard = ({ title, value, icon: Icon, color, bgColor, textColor }) => (
//     <div className={`${bgColor} rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group`}>
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{title}</p>
//           <p className={`text-3xl font-bold ${textColor} group-hover:scale-110 transition-transform duration-300`}>
//             {value}
//           </p>
//         </div>
//         <div className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-transform duration-300`}>
//           <Icon className="w-6 h-6 text-white" />
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <Toaster position="top-right" />

//       {/* Modern Header */}
//       <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-20">
//             <div className="flex items-center space-x-4">
//               <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
//                 <FaTasks className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Daily Tasks</h1>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   {new Date(selectedDate).toLocaleDateString("en-IN", {
//                     weekday: 'long',
//                     year: 'numeric',
//                     month: 'long',
//                     day: 'numeric',
//                     timeZone: "Asia/Kolkata"
//                   })}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Statistics Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <StatCard
//             title="Total Tasks"
//             value={totalTasks}
//             icon={FaTasks}
//             color="bg-gradient-to-r from-blue-500 to-blue-600"
//             bgColor="bg-white dark:bg-gray-800"
//             textColor="text-blue-600 dark:text-blue-400"
//           />
//           <StatCard
//             title="Active Employees"
//             value={totalEmployees}
//             icon={FaUsers}
//             color="bg-gradient-to-r from-green-500 to-green-600"
//             bgColor="bg-white dark:bg-gray-800"
//             textColor="text-green-600 dark:text-green-400"
//           />
//           <StatCard
//             title="Departments"
//             value={totalDepartments}
//             icon={FaBuilding}
//             color="bg-gradient-to-r from-purple-500 to-purple-600"
//             bgColor="bg-white dark:bg-gray-800"
//             textColor="text-purple-600 dark:text-purple-400"
//           />
//           <StatCard
//             title="Completion Rate"
//             value="85%"
//             icon={FaChartLine}
//             color="bg-gradient-to-r from-orange-500 to-orange-600"
//             bgColor="bg-white dark:bg-gray-800"
//             textColor="text-orange-600 dark:text-orange-400"
//           />
//         </div>

//         {/* Search and Filters */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
//           <div className="p-6">
//             {/* Search Bar */}
//             <div className="flex flex-col sm:flex-row gap-4 mb-6">
//               <div className="flex-1 relative">
//                 <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search by employee ID or name..."
//                   value={searchTerm}
//                   onChange={(e) => {
//                     setSearchTerm(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
//                 />
//               </div>
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className={`flex items-center justify-center px-6 py-3 border rounded-xl transition-all duration-200 font-medium ${
//                   showFilters
//                     ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400'
//                     : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
//                 }`}
//               >
//                 <BiFilterAlt className="w-5 h-5 mr-2" />
//                 Filters
//               </button>
//             </div>

//             {/* Filters */}
//             {showFilters && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Items per page
//                   </label>
//                   <select
//                     value={pageSize}
//                     onChange={(e) => {
//                       setPageSize(Number(e.target.value));
//                       setCurrentPage(1);
//                     }}
//                     className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value={5}>5 per page</option>
//                     <option value={10}>10 per page</option>
//                     <option value={15}>15 per page</option>
//                     <option value={20}>20 per page</option>
//                     <option value={50}>50 per page</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Date
//                   </label>
//                   <input
//                     type="date"
//                     value={selectedDate}
//                     onChange={(e) => setSelectedDate(e.target.value)}
//                     className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Department
//                   </label>
//                   <select
//                     value={selectedDepartment}
//                     onChange={(e) => {
//                       setSelectedDepartment(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                     className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="All Departments">All Departments</option>
//                     {departments.map((dept, index) => (
//                       <option key={index} value={dept}>
//                         {dept}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="flex items-end">
//                   <button
//                     onClick={() => {
//                       setSearchTerm("");
//                       setSelectedDepartment("All Departments");
//                       setCurrentPage(1);
//                     }}
//                     className="w-full px-6 py-3 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors font-medium"
//                   >
//                     Clear Filters
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-12">
//             <div className="flex flex-col items-center justify-center">
//               <FaSpinner className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin mb-4" />
//               <p className="text-gray-600 dark:text-gray-400">Loading tasks...</p>
//             </div>
//           </div>
//         )}

//         {/* Content */}
//         {!loading && (
//           <>
//             {/* Desktop Table */}
//             <div className="hidden md:block bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
//               {paginatedTasks.length === 0 ? (
//                 <div className="p-12 text-center">
//                   <FaSearch className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
//                   <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No tasks found</h3>
//                   <p className="text-gray-500 dark:text-gray-400">Try adjusting your search criteria or filters.</p>
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full">
//                     <thead>
//                       <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-b border-gray-200 dark:border-gray-600">
//                         <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                           <div className="flex items-center space-x-2">
//                             <span>#</span>
//                           </div>
//                         </th>
//                         <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                           <div className="flex items-center space-x-2">
//                             <FaUser className="w-4 h-4" />
//                             <span>Employee</span>
//                           </div>
//                         </th>
//                         <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                           <div className="flex items-center space-x-2">
//                             <FaBuilding className="w-4 h-4" />
//                             <span>Department</span>
//                           </div>
//                         </th>
//                         <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                           <div className="flex items-center space-x-2">
//                             <FaCalendarAlt className="w-4 h-4" />
//                             <span>Task Date</span>
//                           </div>
//                         </th>
//                         <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                           <div className="flex items-center space-x-2">
//                             <FaTasks className="w-4 h-4" />
//                             <span>Tasks</span>
//                           </div>
//                         </th>
//                         <th className="px-8 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
//                       {paginatedTasks.map((task, index) => (
//                         <tr key={task._id || task.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
//                           <td className="px-8 py-6 whitespace-nowrap">
//                             <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
//                               <span className="text-white text-sm font-bold">
//                                 {(currentPage - 1) * pageSize + index + 1}
//                               </span>
//                             </div>
//                           </td>
//                           <td className="px-8 py-6 whitespace-nowrap">
//                             <div className="flex items-center space-x-4">
//                               <div className="flex-shrink-0">
//                                 {task.user_Avatar ? (
//                                   <img
//                                     className="h-12 w-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600 shadow-sm"
//                                     src={task.user_Avatar}
//                                     alt={task.full_Name}
//                                     onError={(e) => {
//                                       e.target.style.display = 'none';
//                                       e.target.nextSibling.style.display = 'flex';
//                                     }}
//                                   />
//                                 ) : null}
//                                 <div className={`h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm ${task.user_Avatar ? 'hidden' : ''}`}>
//                                   <FaUserTie className="w-5 h-5 text-white" />
//                                 </div>
//                               </div>
//                               <div>
//                                 <div className="text-base font-semibold text-gray-900 dark:text-white">
//                                   {task.full_Name}
//                                 </div>
//                                 <button
//                                   onClick={() => handleEmployeeClick(task)}
//                                   className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
//                                 >
//                                   ID: {task.employee_Id}
//                                 </button>
//                                 {task.designation && (
//                                   <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
//                                     {task.designation}
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-8 py-6 whitespace-nowrap">
//                             <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-900/20 dark:to-emerald-900/20 dark:text-green-400 border border-green-200 dark:border-green-800">
//                               <FaBuilding className="w-3 h-3 mr-2" />
//                               {task.department || 'N/A'}
//                             </span>
//                           </td>
//                           <td className="px-8 py-6 whitespace-nowrap">
//                             <div className="flex items-center text-sm text-gray-900 dark:text-white">
//                               <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mr-3">
//                                 <FaClock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
//                               </div>
//                               <div>
//                                 <div className="font-medium">
//                                   {new Date(task.task_Date || "N/A").toLocaleDateString("en-IN", {
//                                     day: 'numeric',
//                                     month: 'short',
//                                     timeZone: "Asia/Kolkata",
//                                   })}
//                                 </div>
//                                 <div className="text-xs text-gray-500 dark:text-gray-400">
//                                   {new Date(task.task_Date || "N/A").toLocaleDateString("en-IN", {
//                                     year: 'numeric',
//                                     timeZone: "Asia/Kolkata",
//                                   })}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-8 py-6 whitespace-nowrap">
//                             <div className="flex items-center">
//                               <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mr-3">
//                                 <FaTasks className="w-4 h-4 text-purple-600 dark:text-purple-400" />
//                               </div>
//                               <div>
//                                 <div className="text-sm font-medium text-gray-900 dark:text-white">
//                                   {Array.isArray(task.task) ? task.task.length : 1} Task{Array.isArray(task.task) && task.task.length !== 1 ? 's' : ''}
//                                 </div>
//                                 <div className="text-xs text-gray-500 dark:text-gray-400">
//                                   Updated
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-8 py-6 whitespace-nowrap text-center">
//                             <div className="flex items-center justify-center space-x-3">
//                               <button
//                                 onClick={() => setSelectedTask(task)}
//                                 className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
//                                 title="View Details"
//                               >
//                                 <FaEye className="w-5 h-5" />
//                               </button>
//                               {/* Uncomment for additional actions */}
//                               {/* <button
//                                 onClick={() => setCommentTask(task)}
//                                 className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
//                                 title="Comments"
//                               >
//                                 <FaCommentDots className="w-5 h-5" />
//                               </button>
//                               <button
//                                 onClick={() => setDeleteTask(task)}
//                                 className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
//                                 title="Delete"
//                               >
//                                 <FaTrash className="w-5 h-5" />
//                               </button> */}
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>

//             {/* Mobile Cards */}
//             <div className="md:hidden mb-8">
//               {paginatedTasks.length === 0 ? (
//                 <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
//                   <FaSearch className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
//                   <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No tasks found</h3>
//                   <p className="text-gray-500 dark:text-gray-400">Try adjusting your search criteria or filters.</p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {paginatedTasks.map((task, index) => (
//                     <div
//                       key={task._id || task.id}
//                       className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300"
//                     >
//                       <div className="flex items-start justify-between mb-4">
//                         <div className="flex items-center space-x-4">
//                           <div className="flex-shrink-0">
//                             {task.user_Avatar ? (
//                               <div className="relative">
//                                 <img
//                                   className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
//                                   src={task.user_Avatar}
//                                   alt={task.full_Name}
//                                   onError={(e) => {
//                                     e.target.style.display = 'none';
//                                     e.target.nextSibling.style.display = 'flex';
//                                   }}
//                                 />
//                                 <div className="hidden w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
//                                   <span className="text-white text-sm font-medium">
//                                     {(currentPage - 1) * pageSize + index + 1}
//                                   </span>
//                                 </div>
//                                 <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
//                                   <span className="text-white text-xs font-bold">
//                                     {(currentPage - 1) * pageSize + index + 1}
//                                   </span>
//                                 </div>
//                               </div>
//                             ) : (
//                               <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
//                                 <span className="text-white text-sm font-medium">
//                                   {(currentPage - 1) * pageSize + index + 1}
//                                 </span>
//                               </div>
//                             )}
//                           </div>
//                           <div>
//                             <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                               {task.full_Name}
//                             </h3>
//                             <button
//                               onClick={() => handleEmployeeClick(task)}
//                               className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
//                             >
//                               ID: {task.employee_Id}
//                             </button>
//                             {task.designation && (
//                               <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
//                                 {task.designation}
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-2 gap-4 mb-6">
//                         {task.department && (
//                           <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
//                             <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
//                               <FaBuilding className="w-4 h-4 text-green-600 dark:text-green-400" />
//                             </div>
//                             <div>
//                               <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Department</p>
//                               <p className="text-sm font-semibold text-gray-900 dark:text-white">{task.department}</p>
//                             </div>
//                           </div>
//                         )}
                        
//                         <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
//                           <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
//                             <FaCalendarAlt className="w-4 h-4 text-blue-600 dark:text-blue-400" />
//                           </div>
//                           <div>
//                             <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Task Date</p>
//                             <p className="text-sm font-semibold text-gray-900 dark:text-white">
//                               {new Date(task.task_Date || "N/A").toLocaleDateString("en-IN", {
//                                 day: 'numeric',
//                                 month: 'short',
//                                 year: 'numeric',
//                                 timeZone: "Asia/Kolkata",
//                               })}
//                             </p>
//                           </div>
//                         </div>

//                         {task.teams && (
//                           <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 rounded-xl p-3 col-span-2">
//                             <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
//                               <FaUsers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
//                             </div>
//                             <div>
//                               <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Team</p>
//                               <p className="text-sm font-semibold text-gray-900 dark:text-white">{task.teams}</p>
//                             </div>
//                           </div>
//                         )}

//                         <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 rounded-xl p-3 col-span-2">
//                           <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
//                             <FaTasks className="w-4 h-4 text-orange-600 dark:text-orange-400" />
//                           </div>
//                           <div>
//                             <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Tasks</p>
//                             <p className="text-sm font-semibold text-gray-900 dark:text-white">
//                               {Array.isArray(task.task) ? task.task.length : 1} Task{Array.isArray(task.task) && task.task.length !== 1 ? 's' : ''} Assigned
//                             </p>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
//                         <button
//                           onClick={() => handleEmployeeClick(task)}
//                           className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
//                         >
//                           <FaUser className="w-4 h-4" />
//                           <span>View Tasks</span>
//                         </button>
                        
//                         <div className="flex items-center space-x-2">
//                           <button
//                             onClick={() => setSelectedTask(task)}
//                             className="p-3 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded-xl transition-colors"
//                             title="View Details"
//                           >
//                             <FaEye className="w-5 h-5" />
//                           </button>
//                           {/* Uncomment for additional actions */}
//                           {/* <button
//                             onClick={() => setCommentTask(task)}
//                             className="p-3 text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700 rounded-xl transition-colors"
//                             title="Comments"
//                           >
//                             <FaCommentDots className="w-5 h-5" />
//                           </button>
//                           <button
//                             onClick={() => setDeleteTask(task)}
//                             className="p-3 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-xl transition-colors"
//                             title="Delete"
//                           >
//                             <FaTrash className="w-5 h-5" />
//                           </button> */}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </>
//         )}

//         {/* Modern Pagination */}
//         {!loading && paginatedTasks.length > 0 && (
//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 px-8 py-6">
//             <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
//               {/* Results Info */}
//               <div className="text-sm text-gray-700 dark:text-gray-300">
//                 Showing <span className="font-semibold text-gray-900 dark:text-white">{(currentPage - 1) * pageSize + 1}</span> to{' '}
//                 <span className="font-semibold text-gray-900 dark:text-white">
//                   {Math.min(currentPage * pageSize, filteredTasks.length)}
//                 </span>{' '}
//                 of <span className="font-semibold text-gray-900 dark:text-white">{filteredTasks.length}</span> results
//               </div>

//               {/* Pagination Controls */}
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                   className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
//                 >
//                   <FaChevronLeft className="w-4 h-4 mr-1" />
//                   Previous
//                 </button>

//                 <div className="hidden sm:flex items-center space-x-1">
//                   {getPageNumbers().map((pageNum, index) => (
//                     <React.Fragment key={index}>
//                       {pageNum === '...' ? (
//                         <span className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">...</span>
//                       ) : (
//                         <button
//                           onClick={() => setCurrentPage(pageNum)}
//                           className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 shadow-sm ${
//                             currentPage === pageNum
//                               ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105'
//                               : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
//                           }`}
//                         >
//                           {pageNum}
//                         </button>
//                       )}
//                     </React.Fragment>
//                   ))}
//                 </div>

//                 <button
//                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                   disabled={currentPage === totalPages}
//                   className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
//                 >
//                   Next
//                   <FaChevronRight className="w-4 h-4 ml-1" />
//                 </button>
//               </div>

//               {/* Go to page input */}
//               <div className="flex items-center space-x-3 text-sm">
//                 <label className="text-gray-700 dark:text-gray-300 font-medium">Go to:</label>
//                 <input
//                   type="number"
//                   min="1"
//                   max={totalPages}
//                   value={currentPage}
//                   onChange={(e) => {
//                     const page = Math.max(1, Math.min(totalPages, Number(e.target.value) || 1));
//                     setCurrentPage(page);
//                   }}
//                   className="w-20 px-3 py-2 text-center border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
//                 />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Modals */}
//       <DailyTaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
//       <CommentModal task={commentTask} onClose={() => setCommentTask(null)} />
//       <ConfirmationDialog
//         open={!!deleteTask}
//         title="Delete Task"
//         message="Are you sure you want to delete this task? This action cannot be undone."
//         onConfirm={() => handleDelete(deleteTask?.id)}
//         onCancel={() => setDeleteTask(null)}
//       />
//     </div>
//   );
// };

// export default DailyTask;


// // DailyTask.jsx
// import React, { useState, useEffect } from "react";
// import {
//   FaSearch,
//   FaEye,
//   FaTrash,
//   FaCommentDots,
//   FaCalendarAlt,
//   FaFilter,
//   FaUser,
//   FaBuilding,
//   FaChevronLeft,
//   FaChevronRight,
//   FaSpinner,
//   FaTasks,
//   FaUserTie,
//   FaClock,
//   FaUsers,
//   FaCheckCircle,
//   FaExclamationTriangle,
//   FaChartLine,
// } from "react-icons/fa";
// import { BiFilterAlt } from "react-icons/bi";
// import { MdViewList, MdGridView } from "react-icons/md";
// import CommentModal from "./CommentModal";
// import { useNavigate } from "react-router-dom";
// import DailyTaskModal from "./DailyTaskModal";
// import ConfirmationDialog from "../../common/ConfirmationDialog";
// import { fetchManagerTasks, getSubordinateDepartments } from "../../../service/taskService";
// import { fetchDailyTasksByEmployeeId } from "../../../service/taskService";
// import { Toaster, toast } from "react-hot-toast";

// const DailyTask = () => {
//   // State for tasks and modals
//   const [tasks, setTasks] = useState([]);
//   const [stats, setStats] = useState({
//     totalTeamMembers: 0,
//     reportedCount: 0,
//     notReportedCount: 0,
//     completionRate: "0%"
//   });
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [commentTask, setCommentTask] = useState(null);
//   const [deleteTask, setDeleteTask] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
  
//   // Set default date to today's date in YYYY-MM-DD format
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  
//   // States for search, department filter and pagination
//   const [searchTerm, setSearchTerm] = useState("");
//   const [departments, setDepartments] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [showFilters, setShowFilters] = useState(false);

//   // Fetch tasks for the selected date
//   useEffect(() => {
//     const loadTasks = async () => {
//       setLoading(true);
//       try {
//         const response = await fetchManagerTasks(selectedDate);
//         // Assuming the API returns the structure you provided
//         if (response.success) {
//           setTasks(response.data || []);
//           setStats(response.stats || {
//             totalTeamMembers: 0,
//             reportedCount: 0,
//             notReportedCount: 0,
//             completionRate: "0%"
//           });
//         } else {
//           // Fallback for different API response structure
//           setTasks(Array.isArray(response) ? response : []);
//         }
//         setCurrentPage(1);
//       } catch (error) {
//         toast.error("Failed to load tasks");
//         setTasks([]);
//         setStats({
//           totalTeamMembers: 0,
//           reportedCount: 0,
//           notReportedCount: 0,
//           completionRate: "0%"
//         });
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadTasks();
//   }, [selectedDate]);

//   // Fetch subordinate departments on component mount
//   useEffect(() => {
//     const loadDepartments = async () => {
//       try {
//         const deptData = await getSubordinateDepartments();
//         setDepartments(deptData);
//       } catch (error) {
//         toast.error("Failed to load departments");
//       }
//     };
//     loadDepartments();
//   }, []);

//   // Filter tasks based on search input and department
//   const filteredTasks = tasks.filter((task) => {
//     const matchesSearch =
//       task.employee_Id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       task.full_Name.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesDepartment =
//       selectedDepartment === "All Departments" || task.department === selectedDepartment;
//     return matchesSearch && matchesDepartment;
//   });

//   const totalPages = Math.ceil(filteredTasks.length / pageSize) || 1;
//   const paginatedTasks = filteredTasks.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   // Handle task deletion
//   const handleDelete = (taskId) => {
//     setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
//     setDeleteTask(null);
//     toast.success("Task deleted successfully!");
//   };

//   // Handle employee ID click
//   const handleEmployeeClick = async (task) => {
//     try {
//       setLoading(true);
//       const employeeId = task.employee_Id;
//       const dailyTasks = await fetchDailyTasksByEmployeeId(employeeId);

//       if (dailyTasks.length > 0) {
//         navigate(`/dashboard/employee-particular-tasks/${employeeId}`, {
//           state: { dailyTasks, employeeName: task.full_Name },
//         });
//       } else {
//         toast.error("No daily tasks found for this employee.");
//       }
//     } catch (error) {
//       console.error("Error fetching employee daily tasks:", error);
//       toast.error("Failed to load daily tasks.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Generate page numbers for pagination
//   const getPageNumbers = () => {
//     const delta = 2;
//     const range = [];
//     const rangeWithDots = [];

//     for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
//       range.push(i);
//     }

//     if (currentPage - delta > 2) {
//       rangeWithDots.push(1, '...');
//     } else {
//       rangeWithDots.push(1);
//     }

//     rangeWithDots.push(...range);

//     if (currentPage + delta < totalPages - 1) {
//       rangeWithDots.push('...', totalPages);
//     } else {
//       rangeWithDots.push(totalPages);
//     }

//     return rangeWithDots;
//   };

//   // Statistics Cards Component
//   const StatCard = ({ title, value, icon: Icon, color, bgColor, textColor }) => (
//     <div className={`${bgColor} rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group`}>
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{title}</p>
//           <p className={`text-3xl font-bold ${textColor} group-hover:scale-110 transition-transform duration-300`}>
//             {value}
//           </p>
//         </div>
//         <div className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-transform duration-300`}>
//           <Icon className="w-6 h-6 text-white" />
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <Toaster position="top-right" />

//       {/* Modern Header */}
//       <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-20">
//             <div className="flex items-center space-x-4">
//               <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
//                 <FaTasks className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Daily Tasks</h1>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   {new Date(selectedDate).toLocaleDateString("en-IN", {
//                     weekday: 'long',
//                     year: 'numeric',
//                     month: 'long',
//                     day: 'numeric',
//                     timeZone: "Asia/Kolkata"
//                   })}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Statistics Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <StatCard
//             title="Total Team Members"
//             value={stats.totalTeamMembers}
//             icon={FaUsers}
//             color="bg-gradient-to-r from-blue-500 to-blue-600"
//             bgColor="bg-white dark:bg-gray-800"
//             textColor="text-blue-600 dark:text-blue-400"
//           />
//           <StatCard
//             title="Updated Tasks"
//             value={stats.reportedCount}
//             icon={FaTasks}
//             color="bg-gradient-to-r from-green-500 to-green-600"
//             bgColor="bg-white dark:bg-gray-800"
//             textColor="text-green-600 dark:text-green-400"
//           />
//           <StatCard
//             title="Not Updated Tasks"
//             value={stats.notReportedCount}
//             icon={FaTasks}
//             color="bg-gradient-to-r from-red-500 to-red-600"
//             bgColor="bg-white dark:bg-gray-800"
//             textColor="text-red-600 dark:text-red-400"
//           />


//           <StatCard
//             title="Completion Rate"
//             value={`${stats.completionRate}%`}
//             icon={FaChartLine}
//             color="bg-gradient-to-r from-orange-500 to-orange-600"
//             bgColor="bg-white dark:bg-gray-800"
//             textColor="text-orange-600 dark:text-orange-400"
//           />
//         </div>

//         {/* Search and Filters */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
//           <div className="p-6">
//             {/* Search Bar */}
//             <div className="flex flex-col sm:flex-row gap-4 mb-6">
//               <div className="flex-1 relative">
//                 <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search by employee ID or name..."
//                   value={searchTerm}
//                   onChange={(e) => {
//                     setSearchTerm(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
//                 />
//               </div>
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className={`flex items-center justify-center px-6 py-3 border rounded-xl transition-all duration-200 font-medium ${
//                   showFilters
//                     ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400'
//                     : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
//                 }`}
//               >
//                 <BiFilterAlt className="w-5 h-5 mr-2" />
//                 Filters
//               </button>
//             </div>

//             {/* Filters */}
//             {showFilters && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Items per page
//                   </label>
//                   <select
//                     value={pageSize}
//                     onChange={(e) => {
//                       setPageSize(Number(e.target.value));
//                       setCurrentPage(1);
//                     }}
//                     className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value={5}>5 per page</option>
//                     <option value={10}>10 per page</option>
//                     <option value={15}>15 per page</option>
//                     <option value={20}>20 per page</option>
//                     <option value={50}>50 per page</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Date
//                   </label>
//                   <input
//                     type="date"
//                     value={selectedDate}
//                     onChange={(e) => setSelectedDate(e.target.value)}
//                     className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Department
//                   </label>
//                   <select
//                     value={selectedDepartment}
//                     onChange={(e) => {
//                       setSelectedDepartment(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                     className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="All Departments">All Departments</option>
//                     {departments.map((dept, index) => (
//                       <option key={index} value={dept}>
//                         {dept}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="flex items-end">
//                   <button
//                     onClick={() => {
//                       setSearchTerm("");
//                       setSelectedDepartment("All Departments");
//                       setCurrentPage(1);
//                     }}
//                     className="w-full px-6 py-3 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors font-medium"
//                   >
//                     Clear Filters
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-12">
//             <div className="flex flex-col items-center justify-center">
//               <FaSpinner className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin mb-4" />
//               <p className="text-gray-600 dark:text-gray-400">Loading tasks...</p>
//             </div>
//           </div>
//         )}

//         {/* Content */}
//         {!loading && (
//           <>
//             {/* Desktop Table */}
//             <div className="hidden md:block bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
//               {paginatedTasks.length === 0 ? (
//                 <div className="p-12 text-center">
//                   <FaSearch className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
//                   <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No tasks found</h3>
//                   <p className="text-gray-500 dark:text-gray-400">Try adjusting your search criteria or filters.</p>
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full">
//                     <thead>
//                       <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-b border-gray-200 dark:border-gray-600">
//                         <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                           <div className="flex items-center space-x-2">
//                             <span>#</span>
//                           </div>
//                         </th>
//                         <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                           <div className="flex items-center space-x-2">
//                             <FaUser className="w-4 h-4" />
//                             <span>Employee</span>
//                           </div>
//                         </th>
//                         <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                           <div className="flex items-center space-x-2">
//                             <FaBuilding className="w-4 h-4" />
//                             <span>Department</span>
//                           </div>
//                         </th>
//                         <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                           <div className="flex items-center space-x-2">
//                             <FaCalendarAlt className="w-4 h-4" />
//                             <span>Task Date</span>
//                           </div>
//                         </th>
//                         <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                           <div className="flex items-center space-x-2">
//                             <FaTasks className="w-4 h-4" />
//                             <span>Tasks</span>
//                           </div>
//                         </th>
//                         <th className="px-8 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
//                       {paginatedTasks.map((task, index) => (
//                         <tr key={task._id || task.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
//                           <td className="px-8 py-6 whitespace-nowrap">
//                             <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
//                               <span className="text-white text-sm font-bold">
//                                 {(currentPage - 1) * pageSize + index + 1}
//                               </span>
//                             </div>
//                           </td>
//                           <td className="px-8 py-6 whitespace-nowrap">
//                             <div className="flex items-center space-x-4">
//                               <div className="flex-shrink-0">
//                                 {task.user_Avatar ? (
//                                   <img
//                                     className="h-12 w-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600 shadow-sm"
//                                     src={task.user_Avatar}
//                                     alt={task.full_Name}
//                                     onError={(e) => {
//                                       e.target.style.display = 'none';
//                                       e.target.nextSibling.style.display = 'flex';
//                                     }}
//                                   />
//                                 ) : null}
//                                 <div className={`h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm ${task.user_Avatar ? 'hidden' : ''}`}>
//                                   <FaUserTie className="w-5 h-5 text-white" />
//                                 </div>
//                               </div>
//                               <div>
//                                 <div className="text-base font-semibold text-gray-900 dark:text-white">
//                                   {task.full_Name}
//                                 </div>
//                                 <button
//                                   onClick={() => handleEmployeeClick(task)}
//                                   className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
//                                 >
//                                   ID: {task.employee_Id}
//                                 </button>
//                                 {task.designation && (
//                                   <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
//                                     {task.designation}
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-8 py-6 whitespace-nowrap">
//                             <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-900/20 dark:to-emerald-900/20 dark:text-green-400 border border-green-200 dark:border-green-800">
//                               <FaBuilding className="w-3 h-3 mr-2" />
//                               {task.department || 'N/A'}
//                             </span>
//                           </td>
//                           <td className="px-8 py-6 whitespace-nowrap">
//                             <div className="flex items-center text-sm text-gray-900 dark:text-white">
//                               <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mr-3">
//                                 <FaClock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
//                               </div>
//                               <div>
//                                 <div className="font-medium">
//                                   {new Date(task.task_Date || "N/A").toLocaleDateString("en-IN", {
//                                     day: 'numeric',
//                                     month: 'short',
//                                     timeZone: "Asia/Kolkata",
//                                   })}
//                                 </div>
//                                 <div className="text-xs text-gray-500 dark:text-gray-400">
//                                   {new Date(task.task_Date || "N/A").toLocaleDateString("en-IN", {
//                                     year: 'numeric',
//                                     timeZone: "Asia/Kolkata",
//                                   })}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-8 py-6 whitespace-nowrap">
//                             <div className="flex items-center">
//                               <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mr-3">
//                                 <FaTasks className="w-4 h-4 text-purple-600 dark:text-purple-400" />
//                               </div>
//                               <div>
//                                 <div className="text-sm font-medium text-gray-900 dark:text-white">
//                                   {Array.isArray(task.task) ? task.task.length : 1} Task{Array.isArray(task.task) && task.task.length !== 1 ? 's' : ''}
//                                 </div>
//                                 <div className="text-xs text-gray-500 dark:text-gray-400">
//                                   Assigned
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-8 py-6 whitespace-nowrap text-center">
//                             <div className="flex items-center justify-center space-x-3">
//                               <button
//                                 onClick={() => setSelectedTask(task)}
//                                 className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
//                                 title="View Details"
//                               >
//                                 <FaEye className="w-5 h-5" />
//                               </button>
//                               {/* Uncomment for additional actions */}
//                               {/* <button
//                                 onClick={() => setCommentTask(task)}
//                                 className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
//                                 title="Comments"
//                               >
//                                 <FaCommentDots className="w-5 h-5" />
//                               </button>
//                               <button
//                                 onClick={() => setDeleteTask(task)}
//                                 className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
//                                 title="Delete"
//                               >
//                                 <FaTrash className="w-5 h-5" />
//                               </button> */}
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>

//             {/* Mobile Cards */}
//             <div className="md:hidden mb-8">
//               {paginatedTasks.length === 0 ? (
//                 <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
//                   <FaSearch className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
//                   <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No tasks found</h3>
//                   <p className="text-gray-500 dark:text-gray-400">Try adjusting your search criteria or filters.</p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {paginatedTasks.map((task, index) => (
//                     <div
//                       key={task._id || task.id}
//                       className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300"
//                     >
//                       <div className="flex items-start justify-between mb-4">
//                         <div className="flex items-center space-x-4">
//                           <div className="flex-shrink-0">
//                             {task.user_Avatar ? (
//                               <div className="relative">
//                                 <img
//                                   className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
//                                   src={task.user_Avatar}
//                                   alt={task.full_Name}
//                                   onError={(e) => {
//                                     e.target.style.display = 'none';
//                                     e.target.nextSibling.style.display = 'flex';
//                                   }}
//                                 />
//                                 <div className="hidden w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
//                                   <span className="text-white text-sm font-medium">
//                                     {(currentPage - 1) * pageSize + index + 1}
//                                   </span>
//                                 </div>
//                                 <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
//                                   <span className="text-white text-xs font-bold">
//                                     {(currentPage - 1) * pageSize + index + 1}
//                                   </span>
//                                 </div>
//                               </div>
//                             ) : (
//                               <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
//                                 <span className="text-white text-sm font-medium">
//                                   {(currentPage - 1) * pageSize + index + 1}
//                                 </span>
//                               </div>
//                             )}
//                           </div>
//                           <div>
//                             <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                               {task.full_Name}
//                             </h3>
//                             <button
//                               onClick={() => handleEmployeeClick(task)}
//                               className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
//                             >
//                               ID: {task.employee_Id}
//                             </button>
//                             {task.designation && (
//                               <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
//                                 {task.designation}
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-2 gap-4 mb-6">
//                         {task.department && (
//                           <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
//                             <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
//                               <FaBuilding className="w-4 h-4 text-green-600 dark:text-green-400" />
//                             </div>
//                             <div>
//                               <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Department</p>
//                               <p className="text-sm font-semibold text-gray-900 dark:text-white">{task.department}</p>
//                             </div>
//                           </div>
//                         )}
                        
//                         <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
//                           <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
//                             <FaCalendarAlt className="w-4 h-4 text-blue-600 dark:text-blue-400" />
//                           </div>
//                           <div>
//                             <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Task Date</p>
//                             <p className="text-sm font-semibold text-gray-900 dark:text-white">
//                               {new Date(task.task_Date || "N/A").toLocaleDateString("en-IN", {
//                                 day: 'numeric',
//                                 month: 'short',
//                                 year: 'numeric',
//                                 timeZone: "Asia/Kolkata",
//                               })}
//                             </p>
//                           </div>
//                         </div>

//                         {task.teams && (
//                           <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 rounded-xl p-3 col-span-2">
//                             <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
//                               <FaUsers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
//                             </div>
//                             <div>
//                               <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Team</p>
//                               <p className="text-sm font-semibold text-gray-900 dark:text-white">{task.teams}</p>
//                             </div>
//                           </div>
//                         )}

//                         <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 rounded-xl p-3 col-span-2">
//                           <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
//                             <FaTasks className="w-4 h-4 text-orange-600 dark:text-orange-400" />
//                           </div>
//                           <div>
//                             <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Tasks</p>
//                             <p className="text-sm font-semibold text-gray-900 dark:text-white">
//                               {Array.isArray(task.task) ? task.task.length : 1} Task{Array.isArray(task.task) && task.task.length !== 1 ? 's' : ''} Assigned
//                             </p>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
//                         <button
//                           onClick={() => handleEmployeeClick(task)}
//                           className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
//                         >
//                           <FaUser className="w-4 h-4" />
//                           <span>View Tasks</span>
//                         </button>
                        
//                         <div className="flex items-center space-x-2">
//                           <button
//                             onClick={() => setSelectedTask(task)}
//                             className="p-3 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded-xl transition-colors"
//                             title="View Details"
//                           >
//                             <FaEye className="w-5 h-5" />
//                           </button>
//                           {/* Uncomment for additional actions */}
//                           {/* <button
//                             onClick={() => setCommentTask(task)}
//                             className="p-3 text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700 rounded-xl transition-colors"
//                             title="Comments"
//                           >
//                             <FaCommentDots className="w-5 h-5" />
//                           </button>
//                           <button
//                             onClick={() => setDeleteTask(task)}
//                             className="p-3 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-xl transition-colors"
//                             title="Delete"
//                           >
//                             <FaTrash className="w-5 h-5" />
//                           </button> */}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </>
//         )}

//         {/* Modern Pagination */}
//         {!loading && paginatedTasks.length > 0 && (
//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 px-8 py-6">
//             <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
//               {/* Results Info */}
//               <div className="text-sm text-gray-700 dark:text-gray-300">
//                 Showing <span className="font-semibold text-gray-900 dark:text-white">{(currentPage - 1) * pageSize + 1}</span> to{' '}
//                 <span className="font-semibold text-gray-900 dark:text-white">
//                   {Math.min(currentPage * pageSize, filteredTasks.length)}
//                 </span>{' '}
//                 of <span className="font-semibold text-gray-900 dark:text-white">{filteredTasks.length}</span> results
//               </div>

//               {/* Pagination Controls */}
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                   className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
//                 >
//                   <FaChevronLeft className="w-4 h-4 mr-1" />
//                   Previous
//                 </button>

//                 <div className="hidden sm:flex items-center space-x-1">
//                   {getPageNumbers().map((pageNum, index) => (
//                     <React.Fragment key={index}>
//                       {pageNum === '...' ? (
//                         <span className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">...</span>
//                       ) : (
//                         <button
//                           onClick={() => setCurrentPage(pageNum)}
//                           className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 shadow-sm ${
//                             currentPage === pageNum
//                               ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105'
//                               : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
//                           }`}
//                         >
//                           {pageNum}
//                         </button>
//                       )}
//                     </React.Fragment>
//                   ))}
//                 </div>

//                 <button
//                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                   disabled={currentPage === totalPages}
//                   className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
//                 >
//                   Next
//                   <FaChevronRight className="w-4 h-4 ml-1" />
//                 </button>
//               </div>

//               {/* Go to page input */}
//               <div className="flex items-center space-x-3 text-sm">
//                 <label className="text-gray-700 dark:text-gray-300 font-medium">Go to:</label>
//                 <input
//                   type="number"
//                   min="1"
//                   max={totalPages}
//                   value={currentPage}
//                   onChange={(e) => {
//                     const page = Math.max(1, Math.min(totalPages, Number(e.target.value) || 1));
//                     setCurrentPage(page);
//                   }}
//                   className="w-20 px-3 py-2 text-center border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
//                 />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Modals */}
//       <DailyTaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
//       <CommentModal task={commentTask} onClose={() => setCommentTask(null)} />
//       <ConfirmationDialog
//         open={!!deleteTask}
//         title="Delete Task"
//         message="Are you sure you want to delete this task? This action cannot be undone."
//         onConfirm={() => handleDelete(deleteTask?.id)}
//         onCancel={() => setDeleteTask(null)}
//       />
//     </div>
//   );
// };

// export default DailyTask;


// DailyTask.jsx
import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaEye,
  FaTrash,
  FaCommentDots,
  FaCalendarAlt,
  FaFilter,
  FaUser,
  FaBuilding,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
  FaTasks,
  FaUserTie,
  FaClock,
  FaUsers,
  FaCheckCircle,
  FaExclamationTriangle,
  FaChartLine,
} from "react-icons/fa";
import { BiFilterAlt } from "react-icons/bi";
import { MdViewList, MdGridView } from "react-icons/md";
import CommentModal from "./CommentModal";
import { useNavigate } from "react-router-dom";
import DailyTaskModal from "./DailyTaskModal";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import { fetchManagerTasks, getSubordinateDepartments } from "../../../service/taskService";
import { fetchDailyTasksByEmployeeId } from "../../../service/taskService";
import { Toaster, toast } from "react-hot-toast";

const DailyTask = () => {
  // State for tasks and modals
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    totalTeamMembers: 0,
    reportedCount: 0,
    notReportedCount: 0,
    completionRate: "0%"
  });
  const [selectedTask, setSelectedTask] = useState(null);
  const [commentTask, setCommentTask] = useState(null);
  const [deleteTask, setDeleteTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Set default date to today's date in YYYY-MM-DD format
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  
  // States for search, department filter and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch tasks for the selected date
  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      try {
        const response = await fetchManagerTasks(selectedDate);
        
        // Debug: Log the response to see what we're actually getting
        console.log('API Response:', response);
        
        // Your API returns exactly this structure, so let's use it directly
        if (response && response.success && response.stats) {
          console.log('Stats from API:', response.stats);
          setTasks(response.data || []);
          setStats({
            totalTeamMembers: response.stats.totalTeamMembers || 0,
            reportedCount: response.stats.reportedCount || 0,
            notReportedCount: response.stats.notReportedCount || 0,
            completionRate: response.stats.completionRate || "0%"
          });
        } else {
          // Only if the API response is completely different
          console.log('Unexpected response format:', response);
          setTasks([]);
          setStats({
            totalTeamMembers: 0,
            reportedCount: 0,
            notReportedCount: 0,
            completionRate: "0%"
          });
        }
        setCurrentPage(1);
      } catch (error) {
        console.error('API Error:', error);
        toast.error("Failed to load tasks");
        setTasks([]);
        setStats({
          totalTeamMembers: 0,
          reportedCount: 0,
          notReportedCount: 0,
          completionRate: "0%"
        });
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, [selectedDate]);

  // Fetch subordinate departments on component mount
  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const deptData = await getSubordinateDepartments();
        setDepartments(deptData);
      } catch (error) {
        toast.error("Failed to load departments");
      }
    };
    loadDepartments();
  }, []);

  // Filter tasks based on search input and department
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.employee_Id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.full_Name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "All Departments" || task.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const totalPages = Math.ceil(filteredTasks.length / pageSize) || 1;
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handle task deletion
  const handleDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setDeleteTask(null);
    toast.success("Task deleted successfully!");
  };

  // Handle employee ID click
  const handleEmployeeClick = async (task) => {
    try {
      setLoading(true);
      const employeeId = task.employee_Id;
      const dailyTasks = await fetchDailyTasksByEmployeeId(employeeId);

      if (dailyTasks.length > 0) {
        navigate(`/dashboard/employee-particular-tasks/${employeeId}`, {
          state: { dailyTasks, employeeName: task.full_Name },
        });
      } else {
        toast.error("No daily tasks found for this employee.");
      }
    } catch (error) {
      console.error("Error fetching employee daily tasks:", error);
      toast.error("Failed to load daily tasks.");
    } finally {
      setLoading(false);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  // Statistics Cards Component
  const StatCard = ({ title, value, icon: Icon, color, bgColor, textColor }) => (
    <div className={`${bgColor} rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{title}</p>
          <p className={`text-3xl font-bold ${textColor} group-hover:scale-110 transition-transform duration-300`}>
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 rounded-2xl ">
      <Toaster position="top-right" />

      {/* Modern Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FaTasks className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Daily Tasks</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(selectedDate).toLocaleDateString("en-IN", {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    timeZone: "Asia/Kolkata"
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Team Members"
            value={stats.totalTeamMembers}
            icon={FaUsers}
            color="bg-gradient-to-r from-blue-500 to-blue-600"
            bgColor="bg-white dark:bg-gray-800"
            textColor="text-blue-600 dark:text-blue-400"
          />
          <StatCard
            title="Reported Today"
            value={stats.reportedCount}
            icon={FaCheckCircle}
            color="bg-gradient-to-r from-green-500 to-green-600"
            bgColor="bg-white dark:bg-gray-800"
            textColor="text-green-600 dark:text-green-400"
          />
          <StatCard
            title="Not Reported"
            value={stats.notReportedCount}
            icon={FaExclamationTriangle}
            color="bg-gradient-to-r from-red-500 to-red-600"
            bgColor="bg-white dark:bg-gray-800"
            textColor="text-red-600 dark:text-red-400"
          />
          <StatCard
            title="Completion Rate"
            value={stats.completionRate}
            icon={FaChartLine}
            color="bg-gradient-to-r from-orange-500 to-orange-600"
            bgColor="bg-white dark:bg-gray-800"
            textColor="text-orange-600 dark:text-orange-400"
          />
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <div className="p-6">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by employee ID or name..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center justify-center px-6 py-3 border rounded-xl transition-all duration-200 font-medium ${
                  showFilters
                    ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <BiFilterAlt className="w-5 h-5 mr-2" />
                Filters
              </button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Items per page
                  </label>
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={15}>15 per page</option>
                    <option value={20}>20 per page</option>
                    <option value={50}>50 per page</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Department
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => {
                      setSelectedDepartment(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="All Departments">All Departments</option>
                    {departments.map((dept, index) => (
                      <option key={index} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedDepartment("All Departments");
                      setCurrentPage(1);
                    }}
                    className="w-full px-6 py-3 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors font-medium"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-12">
            <div className="flex flex-col items-center justify-center">
              <FaSpinner className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Loading tasks...</p>
            </div>
          </div>
        )}

        {/* Content */}
        {!loading && (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
              {paginatedTasks.length === 0 ? (
                <div className="p-12 text-center">
                  <FaSearch className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No tasks found</h3>
                  <p className="text-gray-500 dark:text-gray-400">Try adjusting your search criteria or filters.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-b border-gray-200 dark:border-gray-600">
                        <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                          <div className="flex items-center space-x-2">
                            <span>#</span>
                          </div>
                        </th>
                        <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                          <div className="flex items-center space-x-2">
                            <FaUser className="w-4 h-4" />
                            <span>Employee</span>
                          </div>
                        </th>
                        <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                          <div className="flex items-center space-x-2">
                            <FaBuilding className="w-4 h-4" />
                            <span>Department</span>
                          </div>
                        </th>
                        <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                          <div className="flex items-center space-x-2">
                            <FaCalendarAlt className="w-4 h-4" />
                            <span>Task Date</span>
                          </div>
                        </th>
                        <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                          <div className="flex items-center space-x-2">
                            <FaTasks className="w-4 h-4" />
                            <span>Tasks</span>
                          </div>
                        </th>
                        <th className="px-8 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {paginatedTasks.map((task, index) => (
                        <tr key={task._id || task.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                          <td className="px-8 py-6 whitespace-nowrap">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                              <span className="text-white text-sm font-bold">
                                {(currentPage - 1) * pageSize + index + 1}
                              </span>
                            </div>
                          </td>
                          <td className="px-8 py-6 whitespace-nowrap">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                {task.user_Avatar ? (
                                  <img
                                    className="h-12 w-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600 shadow-sm"
                                    src={task.user_Avatar}
                                    alt={task.full_Name}
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                      e.target.nextSibling.style.display = 'flex';
                                    }}
                                  />
                                ) : null}
                                <div className={`h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm ${task.user_Avatar ? 'hidden' : ''}`}>
                                  <FaUserTie className="w-5 h-5 text-white" />
                                </div>
                              </div>
                              <div>
                                <div className="text-base font-semibold text-gray-900 dark:text-white">
                                  {task.full_Name}
                                </div>
                                <button
                                  onClick={() => handleEmployeeClick(task)}
                                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
                                >
                                  ID: {task.employee_Id}
                                </button>
                                {task.designation && (
                                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                                    {task.designation}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 whitespace-nowrap">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-900/20 dark:to-emerald-900/20 dark:text-green-400 border border-green-200 dark:border-green-800">
                              <FaBuilding className="w-3 h-3 mr-2" />
                              {task.department || 'N/A'}
                            </span>
                          </td>
                          <td className="px-8 py-6 whitespace-nowrap">
                            <div className="flex items-center text-sm text-gray-900 dark:text-white">
                              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mr-3">
                                <FaClock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <div className="font-medium">
                                  {new Date(task.task_Date || "N/A").toLocaleDateString("en-IN", {
                                    day: 'numeric',
                                    month: 'short',
                                    timeZone: "Asia/Kolkata",
                                  })}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  {new Date(task.task_Date || "N/A").toLocaleDateString("en-IN", {
                                    year: 'numeric',
                                    timeZone: "Asia/Kolkata",
                                  })}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mr-3">
                                <FaTasks className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {Array.isArray(task.task) ? task.task.length : 1} Task{Array.isArray(task.task) && task.task.length !== 1 ? 's' : ''}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  Assigned
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 whitespace-nowrap text-center">
                            <div className="flex items-center justify-center space-x-3">
                              <button
                                onClick={() => setSelectedTask(task)}
                                className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                                title="View Details"
                              >
                                <FaEye className="w-5 h-5" />
                              </button>
                              {/* Uncomment for additional actions */}
                              {/* <button
                                onClick={() => setCommentTask(task)}
                                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                                title="Comments"
                              >
                                <FaCommentDots className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => setDeleteTask(task)}
                                className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                                title="Delete"
                              >
                                <FaTrash className="w-5 h-5" />
                              </button> */}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden mb-8">
              {paginatedTasks.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
                  <FaSearch className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No tasks found</h3>
                  <p className="text-gray-500 dark:text-gray-400">Try adjusting your search criteria or filters.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {paginatedTasks.map((task, index) => (
                    <div
                      key={task._id || task.id}
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            {task.user_Avatar ? (
                              <div className="relative">
                                <img
                                  className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                                  src={task.user_Avatar}
                                  alt={task.full_Name}
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                  }}
                                />
                                <div className="hidden w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                                  <span className="text-white text-sm font-medium">
                                    {(currentPage - 1) * pageSize + index + 1}
                                  </span>
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                                  <span className="text-white text-xs font-bold">
                                    {(currentPage - 1) * pageSize + index + 1}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                                <span className="text-white text-sm font-medium">
                                  {(currentPage - 1) * pageSize + index + 1}
                                </span>
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {task.full_Name}
                            </h3>
                            <button
                              onClick={() => handleEmployeeClick(task)}
                              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                            >
                              ID: {task.employee_Id}
                            </button>
                            {task.designation && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                                {task.designation}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {task.department && (
                          <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
                            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                              <FaBuilding className="w-4 h-4 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Department</p>
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">{task.department}</p>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                            <FaCalendarAlt className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Task Date</p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                              {new Date(task.task_Date || "N/A").toLocaleDateString("en-IN", {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                timeZone: "Asia/Kolkata",
                              })}
                            </p>
                          </div>
                        </div>

                        {task.teams && (
                          <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 rounded-xl p-3 col-span-2">
                            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                              <FaUsers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Team</p>
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">{task.teams}</p>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 rounded-xl p-3 col-span-2">
                          <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                            <FaTasks className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Tasks</p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                              {Array.isArray(task.task) ? task.task.length : 1} Task{Array.isArray(task.task) && task.task.length !== 1 ? 's' : ''} Assigned
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button
                          onClick={() => handleEmployeeClick(task)}
                          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          <FaUser className="w-4 h-4" />
                          <span>View Tasks</span>
                        </button>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedTask(task)}
                            className="p-3 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded-xl transition-colors"
                            title="View Details"
                          >
                            <FaEye className="w-5 h-5" />
                          </button>
                          {/* Uncomment for additional actions */}
                          {/* <button
                            onClick={() => setCommentTask(task)}
                            className="p-3 text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700 rounded-xl transition-colors"
                            title="Comments"
                          >
                            <FaCommentDots className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => setDeleteTask(task)}
                            className="p-3 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                            title="Delete"
                          >
                            <FaTrash className="w-5 h-5" />
                          </button> */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Modern Pagination */}
        {!loading && paginatedTasks.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              {/* Results Info */}
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-semibold text-gray-900 dark:text-white">{(currentPage - 1) * pageSize + 1}</span> to{' '}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {Math.min(currentPage * pageSize, filteredTasks.length)}
                </span>{' '}
                of <span className="font-semibold text-gray-900 dark:text-white">{filteredTasks.length}</span> results
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
                >
                  <FaChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>

                <div className="hidden sm:flex items-center space-x-1">
                  {getPageNumbers().map((pageNum, index) => (
                    <React.Fragment key={index}>
                      {pageNum === '...' ? (
                        <span className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">...</span>
                      ) : (
                        <button
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 shadow-sm ${
                            currentPage === pageNum
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105'
                              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                          }`}
                        >
                          {pageNum}
                        </button>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
                >
                  Next
                  <FaChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              {/* Go to page input */}
              <div className="flex items-center space-x-3 text-sm">
                <label className="text-gray-700 dark:text-gray-300 font-medium">Go to:</label>
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => {
                    const page = Math.max(1, Math.min(totalPages, Number(e.target.value) || 1));
                    setCurrentPage(page);
                  }}
                  className="w-20 px-3 py-2 text-center border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <DailyTaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      <CommentModal task={commentTask} onClose={() => setCommentTask(null)} />
      <ConfirmationDialog
        open={!!deleteTask}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        onConfirm={() => handleDelete(deleteTask?.id)}
        onCancel={() => setDeleteTask(null)}
      />
    </div>
  );
};

export default DailyTask;