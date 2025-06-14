// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { fetchDailyTasksByEmployeeId } from "../../../service/taskService";
// import { toast, Toaster } from "react-hot-toast";

// const EmployeeDailyTaskDetail = () => {
//   const { employeeId } = useParams();
//   const [tasks, setTasks] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 10;

//   useEffect(() => {
//     const loadEmployeeDailyTasks = async () => {
//       try {
//         const fetchedTasks = await fetchDailyTasksByEmployeeId(employeeId);
//         setTasks(fetchedTasks);
//       } catch (error) {
//         console.error("Error fetching employee daily tasks:", error);
//         toast.error("Failed to fetch daily tasks.");
//       }
//     };

//     loadEmployeeDailyTasks();
//   }, [employeeId]);

//   // Pagination logic
//   const totalPages = Math.ceil(tasks.length / pageSize) || 1;
//   const startIndex = (currentPage - 1) * pageSize;
//   const paginatedTasks = tasks.slice(startIndex, startIndex + pageSize);

//   return (
//     <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen text-black dark:text-white">
//       <Toaster />

//       <h2 className="text-xl font-bold mb-4">
//         Daily Tasks for Employee ID: {employeeId}
//       </h2>

//       <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
//         <table className="w-full text-sm border-collapse">
//           <thead>
//             <tr className="bg-gray-100 dark:bg-gray-700 text-left">
//               <th className="p-3">S.L</th>
//               <th className="p-3">Tasks</th>
//               <th className="p-3">Task Date</th>           
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedTasks.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className="p-3 text-center">
//                   No daily tasks available.
//                 </td>
//               </tr>
//             ) : (
//               paginatedTasks.map((task, index) => (
//                 <tr key={task.task_Id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
//                   <td className="p-3">{startIndex + index + 1}</td>
//                   <td className="p-3">
//                     <ul>
//                       {task.task.map((taskItem, idx) => (
//                         <li key={idx}>• {taskItem}</li>
//                       ))}
//                     </ul>
//                   </td>
//                   <td className="p-3">{task.task_Date}</td>          
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       {tasks.length > pageSize && (
//         <div className="flex items-center justify-between mt-4">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-3 py-1 border rounded disabled:opacity-50"
//           >
//             Prev
//           </button>
//           <span className="text-sm">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="px-3 py-1 border rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmployeeDailyTaskDetail;



// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { fetchDailyTasksByEmployeeId } from "../../../service/taskService";
// import { toast, Toaster } from "react-hot-toast";
// import {
//   FaArrowLeft,
//   FaCalendarAlt,
//   FaTasks,
//   FaUser,
//   FaChevronLeft,
//   FaChevronRight,
//   FaSpinner,
//   FaSearch,
//   FaClock,
//   FaClipboardList,
//   FaFileAlt,
//   FaEye,
// } from "react-icons/fa";

// const EmployeeDailyTaskDetail = () => {
//   const { employeeId } = useParams();
//   const navigate = useNavigate();
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedTask, setSelectedTask] = useState(null);
//   const pageSize = 10;

//   useEffect(() => {
//     const loadEmployeeDailyTasks = async () => {
//       setLoading(true);
//       try {
//         const fetchedTasks = await fetchDailyTasksByEmployeeId(employeeId);
//         setTasks(fetchedTasks);
//       } catch (error) {
//         console.error("Error fetching employee daily tasks:", error);
//         toast.error("Failed to fetch daily tasks.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadEmployeeDailyTasks();
//   }, [employeeId]);

//   // Filter tasks based on search
//   const filteredTasks = tasks.filter((task) =>
//     task.task.some(taskItem => 
//       taskItem.toLowerCase().includes(searchTerm.toLowerCase())
//     ) || task.task_Date.includes(searchTerm)
//   );

//   // Pagination logic
//   const totalPages = Math.ceil(filteredTasks.length / pageSize) || 1;
//   const startIndex = (currentPage - 1) * pageSize;
//   const paginatedTasks = filteredTasks.slice(startIndex, startIndex + pageSize);

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

//   const employeeName = tasks.length > 0 ? tasks[0].full_Name : "Employee";

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <Toaster position="top-right" />

//       {/* Modern Header */}
//       <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-20">
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => navigate(-1)}
//                 className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
//               >
//                 <FaArrowLeft className="w-5 h-5" />
//               </button>
//               <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
//                 <FaUser className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//                   {employeeName}'s Daily Tasks
//                 </h1>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   Employee ID: {employeeId} • {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''} found
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="hidden sm:flex items-center px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 rounded-full">
//                 <span className="text-sm font-medium text-indigo-700 dark:text-indigo-400">
//                   {filteredTasks.length} Total Tasks
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Search Bar */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
//           <div className="p-6">
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="flex-1 relative">
//                 <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search tasks by content or date..."
//                   value={searchTerm}
//                   onChange={(e) => {
//                     setSearchTerm(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
//                 />
//               </div>
//               {searchTerm && (
//                 <button
//                   onClick={() => {
//                     setSearchTerm("");
//                     setCurrentPage(1);
//                   }}
//                   className="px-6 py-3 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors font-medium"
//                 >
//                   Clear Search
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-12">
//             <div className="flex flex-col items-center justify-center">
//               <FaSpinner className="w-8 h-8 text-indigo-600 dark:text-indigo-400 animate-spin mb-4" />
//               <p className="text-gray-600 dark:text-gray-400">Loading tasks...</p>
//             </div>
//           </div>
//         )}

//         {/* Tasks Content */}
//         {!loading && (
//           <>
//             {/* Desktop View */}
//             <div className="hidden md:block bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
//               {paginatedTasks.length === 0 ? (
//                 <div className="p-12 text-center">
//                   <FaSearch className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
//                   <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No tasks found</h3>
//                   <p className="text-gray-500 dark:text-gray-400">
//                     {searchTerm ? "Try adjusting your search terms." : "No daily tasks available for this employee."}
//                   </p>
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
//                             <FaTasks className="w-4 h-4" />
//                             <span>Tasks</span>
//                           </div>
//                         </th>
//                         <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                           <div className="flex items-center space-x-2">
//                             <FaCalendarAlt className="w-4 h-4" />
//                             <span>Task Date</span>
//                           </div>
//                         </th>
//                         <th className="px-8 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
//                       {paginatedTasks.map((task, index) => (
//                         <tr key={task.task_Id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
//                           <td className="px-8 py-6 whitespace-nowrap">
//                             <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
//                               <span className="text-white text-sm font-bold">
//                                 {startIndex + index + 1}
//                               </span>
//                             </div>
//                           </td>
//                           <td className="px-8 py-6">
//                             <div className="max-w-md">
//                               <div className="flex items-start space-x-3">
//                                 <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
//                                   <FaClipboardList className="w-4 h-4 text-blue-600 dark:text-blue-400" />
//                                 </div>
//                                 <div className="flex-1">
//                                   <div className="space-y-2">
//                                     {task.task.slice(0, 2).map((taskItem, idx) => (
//                                       <div key={idx} className="flex items-start space-x-2">
//                                         <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
//                                         <p className="text-sm text-gray-900 dark:text-white line-clamp-2">
//                                           {taskItem.length > 100 ? `${taskItem.substring(0, 100)}...` : taskItem}
//                                         </p>
//                                       </div>
//                                     ))}
//                                     {task.task.length > 2 && (
//                                       <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
//                                         +{task.task.length - 2} more task{task.task.length - 2 !== 1 ? 's' : ''}
//                                       </p>
//                                     )}
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-8 py-6 whitespace-nowrap">
//                             <div className="flex items-center text-sm text-gray-900 dark:text-white">
//                               <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mr-3">
//                                 <FaClock className="w-4 h-4 text-green-600 dark:text-green-400" />
//                               </div>
//                               <div>
//                                 <div className="font-medium">
//                                   {new Date(task.task_Date).toLocaleDateString("en-IN", {
//                                     day: 'numeric',
//                                     month: 'short',
//                                     year: 'numeric',
//                                     timeZone: "Asia/Kolkata",
//                                   })}
//                                 </div>
//                                 <div className="text-xs text-gray-500 dark:text-gray-400">
//                                   {new Date(task.task_Date).toLocaleDateString("en-IN", {
//                                     weekday: 'short',
//                                     timeZone: "Asia/Kolkata",
//                                   })}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-8 py-6 whitespace-nowrap text-center">
//                             <button
//                               onClick={() => setSelectedTask(task)}
//                               className="p-2 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all duration-200"
//                               title="View Full Tasks"
//                             >
//                               <FaEye className="w-5 h-5" />
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>

//             {/* Mobile View */}
//             <div className="md:hidden mb-8">
//               {paginatedTasks.length === 0 ? (
//                 <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
//                   <FaSearch className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
//                   <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No tasks found</h3>
//                   <p className="text-gray-500 dark:text-gray-400">
//                     {searchTerm ? "Try adjusting your search terms." : "No daily tasks available for this employee."}
//                   </p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {paginatedTasks.map((task, index) => (
//                     <div
//                       key={task.task_Id}
//                       className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300"
//                     >
//                       <div className="flex items-start justify-between mb-4">
//                         <div className="flex items-center space-x-3">
//                           <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
//                             <span className="text-white text-sm font-bold">
//                               {startIndex + index + 1}
//                             </span>
//                           </div>
//                           <div>
//                             <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                               Daily Task
//                             </h3>
//                             <p className="text-sm text-gray-500 dark:text-gray-400">
//                               {new Date(task.task_Date).toLocaleDateString("en-IN", {
//                                 weekday: 'long',
//                                 year: 'numeric',
//                                 month: 'long',
//                                 day: 'numeric',
//                                 timeZone: "Asia/Kolkata",
//                               })}
//                             </p>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="space-y-3 mb-4">
//                         <div className="flex items-center space-x-2">
//                           <FaTasks className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
//                           <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                             {task.task.length} Task{task.task.length !== 1 ? 's' : ''}
//                           </span>
//                         </div>
//                         <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
//                           <div className="space-y-2">
//                             {task.task.slice(0, 2).map((taskItem, idx) => (
//                               <div key={idx} className="flex items-start space-x-2">
//                                 <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
//                                 <p className="text-sm text-gray-900 dark:text-white">
//                                   {taskItem.length > 80 ? `${taskItem.substring(0, 80)}...` : taskItem}
//                                 </p>
//                               </div>
//                             ))}
//                             {task.task.length > 2 && (
//                               <p className="text-xs text-gray-500 dark:text-gray-400 font-medium pl-4">
//                                 +{task.task.length - 2} more task{task.task.length - 2 !== 1 ? 's' : ''}
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                       </div>

//                       <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
//                         <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
//                           <FaCalendarAlt className="w-4 h-4" />
//                           <span>{task.task_Date}</span>
//                         </div>
//                         <button
//                           onClick={() => setSelectedTask(task)}
//                           className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
//                         >
//                           <FaEye className="w-4 h-4" />
//                           <span>View All</span>
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </>
//         )}

//         {/* Modern Pagination */}
//         {!loading && paginatedTasks.length > 0 && totalPages > 1 && (
//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 px-8 py-6">
//             <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
//               {/* Results Info */}
//               <div className="text-sm text-gray-700 dark:text-gray-300">
//                 Showing <span className="font-semibold text-gray-900 dark:text-white">{startIndex + 1}</span> to{' '}
//                 <span className="font-semibold text-gray-900 dark:text-white">
//                   {Math.min(startIndex + pageSize, filteredTasks.length)}
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
//                               ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105'
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
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Task Detail Modal */}
//       {selectedTask && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
//             <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
//                   <FaFileAlt className="w-5 h-5 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                     Daily Tasks Details
//                   </h3>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     {new Date(selectedTask.task_Date).toLocaleDateString("en-IN", {
//                       weekday: 'long',
//                       year: 'numeric',
//                       month: 'long',
//                       day: 'numeric',
//                       timeZone: "Asia/Kolkata",
//                     })}
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setSelectedTask(null)}
//                 className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
//             <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
//               <div className="space-y-4">
//                 {selectedTask.task.map((taskItem, idx) => (
//                   <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
//                     <div className="flex items-start space-x-3">
//                       <div className="w-6 h-6 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
//                         <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
//                           {idx + 1}
//                         </span>
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-gray-900 dark:text-white whitespace-pre-wrap leading-relaxed">
//                           {taskItem}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
//               <button
//                 onClick={() => setSelectedTask(null)}
//                 className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors font-medium"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmployeeDailyTaskDetail;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDailyTasksByEmployeeId } from "../../../service/taskService";
import { toast, Toaster } from "react-hot-toast";
import BaseModal from "../../common/BaseModal"; // Import the BaseModal
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaTasks,
  FaUser,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
  FaSearch,
  FaClock,
  FaClipboardList,
  FaFileAlt,
  FaEye,
} from "react-icons/fa";

const EmployeeDailyTaskDetail = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const pageSize = 10;

  useEffect(() => {
    const loadEmployeeDailyTasks = async () => {
      setLoading(true);
      try {
        const fetchedTasks = await fetchDailyTasksByEmployeeId(employeeId);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching employee daily tasks:", error);
        toast.error("Failed to fetch daily tasks.");
      } finally {
        setLoading(false);
      }
    };

    loadEmployeeDailyTasks();
  }, [employeeId]);

  // Filter tasks based on search
  const filteredTasks = tasks.filter((task) =>
    task.task.some(taskItem => 
      taskItem.toLowerCase().includes(searchTerm.toLowerCase())
    ) || task.task_Date.includes(searchTerm)
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredTasks.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedTasks = filteredTasks.slice(startIndex, startIndex + pageSize);

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

  const employeeName = tasks.length > 0 ? tasks[0].full_Name : "Employee";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Toaster position="top-right" />

      {/* Modern Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FaArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FaUser className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {employeeName}'s Daily Tasks
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Employee ID: {employeeId} • {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''} found
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 rounded-full">
                <span className="text-sm font-medium text-indigo-700 dark:text-indigo-400">
                  {filteredTasks.length} Total Tasks
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search tasks by content or date..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                />
              </div>
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setCurrentPage(1);
                  }}
                  className="px-6 py-3 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors font-medium"
                >
                  Clear Search
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-12">
            <div className="flex flex-col items-center justify-center">
              <FaSpinner className="w-8 h-8 text-indigo-600 dark:text-indigo-400 animate-spin mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Loading tasks...</p>
            </div>
          </div>
        )}

        {/* Tasks Content */}
        {!loading && (
          <>
            {/* Desktop View */}
            <div className="hidden md:block bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
              {paginatedTasks.length === 0 ? (
                <div className="p-12 text-center">
                  <FaSearch className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No tasks found</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {searchTerm ? "Try adjusting your search terms." : "No daily tasks available for this employee."}
                  </p>
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
                            <FaTasks className="w-4 h-4" />
                            <span>Tasks</span>
                          </div>
                        </th>
                        <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                          <div className="flex items-center space-x-2">
                            <FaCalendarAlt className="w-4 h-4" />
                            <span>Task Date</span>
                          </div>
                        </th>
                        <th className="px-8 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {paginatedTasks.map((task, index) => (
                        <tr key={task.task_Id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                          <td className="px-8 py-6 whitespace-nowrap">
                            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
                              <span className="text-white text-sm font-bold">
                                {startIndex + index + 1}
                              </span>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="max-w-md">
                              <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                                  <FaClipboardList className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="flex-1">
                                  <div className="space-y-2">
                                    {task.task.slice(0, 2).map((taskItem, idx) => (
                                      <div key={idx} className="flex items-start space-x-2">
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-sm text-gray-900 dark:text-white line-clamp-2">
                                          {taskItem.length > 100 ? `${taskItem.substring(0, 100)}...` : taskItem}
                                        </p>
                                      </div>
                                    ))}
                                    {task.task.length > 2 && (
                                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                        +{task.task.length - 2} more task{task.task.length - 2 !== 1 ? 's' : ''}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 whitespace-nowrap">
                            <div className="flex items-center text-sm text-gray-900 dark:text-white">
                              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mr-3">
                                <FaClock className="w-4 h-4 text-green-600 dark:text-green-400" />
                              </div>
                              <div>
                                <div className="font-medium">
                                  {new Date(task.task_Date).toLocaleDateString("en-IN", {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                    timeZone: "Asia/Kolkata",
                                  })}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  {new Date(task.task_Date).toLocaleDateString("en-IN", {
                                    weekday: 'short',
                                    timeZone: "Asia/Kolkata",
                                  })}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 whitespace-nowrap text-center">
                            <button
                              onClick={() => setSelectedTask(task)}
                              className="p-2 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all duration-200"
                              title="View Full Tasks"
                            >
                              <FaEye className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Mobile View */}
            <div className="md:hidden mb-8">
              {paginatedTasks.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
                  <FaSearch className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No tasks found</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {searchTerm ? "Try adjusting your search terms." : "No daily tasks available for this employee."}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {paginatedTasks.map((task, index) => (
                    <div
                      key={task.task_Id}
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
                            <span className="text-white text-sm font-bold">
                              {startIndex + index + 1}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              Daily Task
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(task.task_Date).toLocaleDateString("en-IN", {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                timeZone: "Asia/Kolkata",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center space-x-2">
                          <FaTasks className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {task.task.length} Task{task.task.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
                          <div className="space-y-2">
                            {task.task.slice(0, 2).map((taskItem, idx) => (
                              <div key={idx} className="flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-sm text-gray-900 dark:text-white">
                                  {taskItem.length > 80 ? `${taskItem.substring(0, 80)}...` : taskItem}
                                </p>
                              </div>
                            ))}
                            {task.task.length > 2 && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium pl-4">
                                +{task.task.length - 2} more task{task.task.length - 2 !== 1 ? 's' : ''}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                          <FaCalendarAlt className="w-4 h-4" />
                          <span>{task.task_Date}</span>
                        </div>
                        <button
                          onClick={() => setSelectedTask(task)}
                          className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          <FaEye className="w-4 h-4" />
                          <span>View All</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Modern Pagination */}
        {!loading && paginatedTasks.length > 0 && totalPages > 1 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              {/* Results Info */}
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-semibold text-gray-900 dark:text-white">{startIndex + 1}</span> to{' '}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {Math.min(startIndex + pageSize, filteredTasks.length)}
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
                              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105'
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
            </div>
          </div>
        )}
      </div>

      {/* Task Detail Modal */}
      <BaseModal
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden mx-4">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <FaFileAlt className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Daily Tasks Details
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedTask && new Date(selectedTask.task_Date).toLocaleDateString("en-IN", {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    timeZone: "Asia/Kolkata",
                  })}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedTask(null)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-160px)]">
            <div className="space-y-4">
              {selectedTask && selectedTask.task.map((taskItem, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                        {idx + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 dark:text-white whitespace-pre-wrap leading-relaxed">
                        {taskItem}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
            <button
              onClick={() => setSelectedTask(null)}
              className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </BaseModal>
    </div>
  );
};

export default EmployeeDailyTaskDetail;