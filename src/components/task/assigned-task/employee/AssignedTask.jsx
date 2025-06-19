// import { useState, useEffect } from "react";
// import { FaEye, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
// import AssignedTaskModal from "./AssignedTaskModal";
// import { fetchTasksEmp, updateAcknowledgeStatus } from "../../../../service/taskService";
// // Using react-hot-toast for notifications
// import { toast } from "react-hot-toast";
// // SweetAlert2 for confirmation
// import Swal from "sweetalert2";

// const AssignedTask = () => {
//   const [isViewOpen, setIsViewOpen] = useState(false);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     refreshTasks();
//   }, []);

//   const refreshTasks = async () => {
//     try {
//       const fetchedTasks = await fetchTasksEmp();
//       setTasks(fetchedTasks);
//     } catch (error) {
//       console.error("Failed to fetch tasks:", error);
//       toast.error("Failed to fetch tasks");
//     }
//   };

//   const handleViewTask = (task) => {
//     setSelectedTask(task);
//     setIsViewOpen(true);
//   };

//   // Call API to set "acknowledge" = "Acknowledged"
//   const handleAcknowledge = async (task) => {
//     try {
//       const responseData = await updateAcknowledgeStatus(task._id, "Acknowledged");
//       // If it succeeds, show success message from server or fallback text
//       toast.success(responseData.message || "Task acknowledged successfully!");
//       refreshTasks();
//     } catch (error) {
//       console.error("Failed to acknowledge task:", error);
//       // Attempt to read the message from error.data.message
//       const errMsg = error?.data?.message || "Failed to acknowledge the task.";
//       toast.error(errMsg);
//     }
//   };

//   // SweetAlert2 confirmation before acknowledging
//   const confirmAcknowledge = (task) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "Once acknowledged, you won't be able to revert this action easily.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, acknowledge!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         handleAcknowledge(task);
//       }
//       // If user cancels, do nothing
//     });
//   };

//   return (
//     <div className="p-6 w-full max-w-6xl mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-semibold">Assigned Task</h2>
//       </div>

//       <div className="overflow-x-auto shadow-md rounded-lg bg-white dark:bg-gray-800">
//         <table className="w-full border-collapse">
//           <thead className="bg-gray-100 dark:bg-gray-700">
//             <tr>
//               <th className="p-3 border dark:border-gray-700">S.L</th>
//               <th className="p-3 border dark:border-gray-700">Emp ID</th>
//               <th className="p-3 border dark:border-gray-700">Assigned By</th>
//               <th className="p-3 border dark:border-gray-700">Assigned Date</th>
//               <th className="p-3 border dark:border-gray-700">Due Date</th>
//               <th className="p-3 border dark:border-gray-700">Priority</th>
//               <th className="p-3 border dark:border-gray-700">Status</th>
//               <th className="p-3 border dark:border-gray-700">Acknowledge</th>

//               <th className="p-3 border dark:border-gray-700">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.length === 0 ? (
//               <tr>
//                 <td colSpan="8" className="p-3 text-center">
//                   No data available.
//                 </td>
//               </tr>
//             ) : (
//               tasks.map((task, index) => (
//                 <tr
//                   key={task._id}
//                   className="text-center hover:bg-gray-50 dark:hover:bg-gray-600"
//                 >
//                   <td className="p-3 border dark:border-gray-700">{index + 1}</td>
//                   <td className="p-3 border text-blue-600 dark:border-gray-700">
//                     {task.assignedToEmployeeId}
//                   </td>
//                   <td className="p-3 border dark:border-gray-700">
//                     {task.assignedByName}
//                   </td>
//                   <td className="p-3 border dark:border-gray-700">
//                     {new Date(task.createdAt).toLocaleDateString("en-IN", {
//                       timeZone: "Asia/Kolkata",
//                     })}
//                   </td>
//                   <td className="p-3 border dark:border-gray-700">
//                     {new Date(task.dueDate).toLocaleDateString("en-IN", {
//                       timeZone: "Asia/Kolkata",
//                     })}
//                   </td>
//                   <td
//                     className={`p-3 border dark:border-gray-700 font-semibold ${
//                       task.priority === "High"
//                         ? "text-red-600"
//                         : task.priority === "Medium"
//                         ? "text-orange-500"
//                         : "text-green-600"
//                     }`}
//                   >
//                     {task.priority}
//                   </td>
//                   <td className="p-3">
//                     <span
//                       className={`px-3 py-1 rounded text-xs font-semibold ${
//                         task.status === "Completed"
//                           ? "bg-green-100 dark:bg-green-700 text-green-600 dark:text-green-200"
//                           : task.status === "In Progress"
//                           ? "bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-200"
//                           : "bg-orange-100 dark:bg-orange-700 text-orange-600 dark:text-orange-200"
//                       }`}
//                     >
//                       {task.status}
//                     </span>
//                   </td>
//                   <td className="p-3">
//                   <span
//     className={`px-3 py-1 rounded text-xs font-semibold ${
//       task.acknowledge === "Not Acknowledge"
//         ? "bg-yellow-100 dark:bg-yellow-700 text-yellow-600 dark:text-yellow-200"
//         : task.acknowledge === "Acknowledged"
//         ? "bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-200"
//         : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200"
//     }`}
//   >
//     {task.acknowledge}
//   </span>
//                   </td>


//                   <td className="p-3 border dark:border-gray-700 flex justify-center gap-2">
//                     {/* View Task Button */}
//                     <button
//                       className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:scale-105"
//                       onClick={() => handleViewTask(task)}
//                     >
//                       <FaEye />
//                     </button>

//                     {/* Acknowledge Button */}
//                     <button
//   className={`${
//     task.acknowledge === "Acknowledged"
//       ? "bg-green-500"
//       : "bg-red-500"
//   } text-white px-2 py-1 rounded-lg hover:scale-105`}
//   onClick={() => {
//     if (task.acknowledge === "Not Acknowledge") {
//       confirmAcknowledge(task); // Prompt confirmation, then acknowledge
//     } else {
//       toast("Task is already acknowledged.");
//     }
//   }}
// >
//   {task.acknowledge === "Acknowledged" ? <FaThumbsUp /> : <FaThumbsDown />}
// </button>

//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* View Task Modal */}
//       {isViewOpen && (
//         <AssignedTaskModal
//           task={selectedTask}
//           onClose={() => setIsViewOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default AssignedTask;



import { useState, useEffect } from "react";
import { 
  FaEye, 
  FaThumbsDown, 
  FaThumbsUp,
  FaUser,
  FaIdCard,
  FaCalendarAlt,
  FaFlag,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaPlay,
  FaPause,
  FaTasks,
  FaSpinner,
  FaClipboardList,
  FaUserTie,
  FaCheck,
  FaTimes
} from "react-icons/fa";
import AssignedTaskModal from "./AssignedTaskModal";
import { fetchTasksEmp, updateAcknowledgeStatus } from "../../../../service/taskService";
// Using react-hot-toast for notifications
import { toast } from "react-hot-toast";
// SweetAlert2 for confirmation
import Swal from "sweetalert2";

const AssignedTask = () => {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshTasks();
  }, []);

  const refreshTasks = async () => {
    setLoading(true);
    try {
      const fetchedTasks = await fetchTasksEmp();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setIsViewOpen(true);
  };

  // Call API to set "acknowledge" = "Acknowledged"
  const handleAcknowledge = async (task) => {
    try {
      const responseData = await updateAcknowledgeStatus(task._id, "Acknowledged");
      // If it succeeds, show success message from server or fallback text
      toast.success(responseData.message || "Task acknowledged successfully!");
      refreshTasks();
    } catch (error) {
      console.error("Failed to acknowledge task:", error);
      // Attempt to read the message from error.data.message
      const errMsg = error?.data?.message || "Failed to acknowledge the task.";
      toast.error(errMsg);
    }
  };

  // SweetAlert2 confirmation before acknowledging
  const confirmAcknowledge = (task) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once acknowledged, you won't be able to revert this action easily.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, acknowledge!",
      background: document.documentElement.classList.contains('dark') ? '#374151' : '#ffffff',
      color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000',
    }).then((result) => {
      if (result.isConfirmed) {
        handleAcknowledge(task);
      }
      // If user cancels, do nothing
    });
  };

  // Get status configuration
  const getStatusConfig = (status) => {
    switch (status) {
      case "Completed":
        return {
          bgColor: "bg-green-500/10 dark:bg-green-500/20",
          textColor: "text-green-700 dark:text-green-300",
          borderColor: "border-green-500/30",
          icon: FaCheckCircle
        };
      case "In Progress":
        return {
          bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
          textColor: "text-blue-700 dark:text-blue-300",
          borderColor: "border-blue-500/30",
          icon: FaPlay
        };
      default:
        return {
          bgColor: "bg-orange-500/10 dark:bg-orange-500/20",
          textColor: "text-orange-700 dark:text-orange-300",
          borderColor: "border-orange-500/30",
          icon: FaPause
        };
    }
  };

  // Get acknowledge configuration
  const getAcknowledgeConfig = (acknowledge) => {
    switch (acknowledge) {
      case "Acknowledged":
        return {
          bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
          textColor: "text-blue-700 dark:text-blue-300",
          borderColor: "border-blue-500/30",
          icon: FaCheck
        };
      case "Not Acknowledge":
        return {
          bgColor: "bg-yellow-500/10 dark:bg-yellow-500/20",
          textColor: "text-yellow-700 dark:text-yellow-300",
          borderColor: "border-yellow-500/30",
          icon: FaTimes
        };
      default:
        return {
          bgColor: "bg-gray-500/10 dark:bg-gray-500/20",
          textColor: "text-gray-700 dark:text-gray-300",
          borderColor: "border-gray-500/30",
          icon: FaClock
        };
    }
  };

  // Get priority configuration
  const getPriorityConfig = (priority) => {
    switch (priority) {
      case "High":
        return {
          textColor: "text-red-600 dark:text-red-400",
          bgColor: "bg-red-500/10 dark:bg-red-500/20",
          borderColor: "border-red-500/30"
        };
      case "Medium":
        return {
          textColor: "text-orange-500 dark:text-orange-400",
          bgColor: "bg-orange-500/10 dark:bg-orange-500/20",
          borderColor: "border-orange-500/30"
        };
      default:
        return {
          textColor: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-500/10 dark:bg-green-500/20",
          borderColor: "border-green-500/30"
        };
    }
  };

  return (
    <div className="">
      <div className="max-w-8xl mx-auto">
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 lg:p-8 animate-fade-in">
          
          {/* Header */}
          <div className="flex items-center gap-3 mb-6 lg:mb-8">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-lg">
              <FaTasks className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                My Assigned Tasks
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Tasks assigned to you</p>
            </div>
          </div>

          {/* Task Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 lg:mb-8">
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-4 rounded-xl border border-purple-200/50 dark:border-purple-700/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <FaTasks className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{tasks.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-4 rounded-xl border border-green-200/50 dark:border-green-700/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <FaCheckCircle className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {tasks.filter(task => task.status === "Completed").length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-4 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <FaCheck className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Acknowledged</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {tasks.filter(task => task.acknowledge === "Acknowledged").length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 p-4 rounded-xl border border-yellow-200/50 dark:border-yellow-700/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <FaExclamationTriangle className="text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pending Ack</p>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {tasks.filter(task => task.acknowledge === "Not Acknowledge").length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <FaSpinner className="text-4xl text-purple-500 animate-spin" />
              <p className="text-gray-700 dark:text-gray-300 text-lg animate-pulse">Loading your tasks...</p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden xl:block overflow-hidden rounded-xl border border-gray-200/50 dark:border-gray-700/50 mb-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                        <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          S.L
                        </th>
                        <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <FaIdCard className="text-xs" />
                            Emp ID
                          </div>
                        </th>
                        <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <FaUserTie className="text-xs" />
                            Assigned By
                          </div>
                        </th>
                        <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-xs" />
                            Assigned
                          </div>
                        </th>
                        <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-xs" />
                            Due Date
                          </div>
                        </th>
                        <th className="px-4 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          <div className="flex items-center justify-center gap-2">
                            <FaFlag className="text-xs" />
                            Priority
                          </div>
                        </th>
                        <th className="px-4 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          Acknowledge
                        </th>
                        <th className="px-4 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                      {tasks.length === 0 ? (
                        <tr>
                          <td colSpan="9" className="px-6 py-16 text-center">
                            <div className="flex flex-col items-center space-y-4">
                              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full">
                                <FaClipboardList className="text-2xl text-gray-400" />
                              </div>
                              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                                No Tasks Assigned
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                You don't have any tasks assigned yet
                              </p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        tasks.map((task, index) => {
                          const statusConfig = getStatusConfig(task.status);
                          const acknowledgeConfig = getAcknowledgeConfig(task.acknowledge);
                          const priorityConfig = getPriorityConfig(task.priority);
                          const StatusIcon = statusConfig.icon;
                          const AckIcon = acknowledgeConfig.icon;
                          
                          return (
                            <tr 
                              key={task._id}
                              className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-all duration-300 animate-fade-in-up"
                              style={{ animationDelay: `${index * 50}ms` }}
                            >
                              <td className="px-4 py-4 text-gray-900 dark:text-gray-100 font-medium">
                                {index + 1}
                              </td>
                              <td className="px-4 py-4 text-blue-600 dark:text-blue-400 font-medium">
                                {task.assignedToEmployeeId}
                              </td>
                              <td className="px-4 py-4 text-gray-900 dark:text-gray-100 font-medium">
                                {task.assignedByName}
                              </td>
                              <td className="px-4 py-4 text-gray-700 dark:text-gray-300">
                                {new Date(task.createdAt).toLocaleDateString("en-IN", {
                                  timeZone: "Asia/Kolkata",
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric"
                                })}
                              </td>
                              <td className="px-4 py-4 text-gray-700 dark:text-gray-300">
                                {new Date(task.dueDate).toLocaleDateString("en-IN", {
                                  timeZone: "Asia/Kolkata",
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric"
                                })}
                              </td>
                              <td className="px-4 py-4">
                                <div className="flex justify-center">
                                  <div className={`inline-flex items-center px-3 py-1 rounded-lg ${priorityConfig.bgColor} ${priorityConfig.borderColor} border`}>
                                    <span className={`${priorityConfig.textColor} text-sm font-semibold`}>
                                      {task.priority}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4">
                                <div className="flex justify-center">
                                  <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${statusConfig.bgColor} ${statusConfig.borderColor} border`}>
                                    <StatusIcon className={`${statusConfig.textColor} text-xs`} />
                                    <span className={`${statusConfig.textColor} text-sm font-semibold`}>
                                      {task.status}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4">
                                <div className="flex justify-center">
                                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${acknowledgeConfig.bgColor} ${acknowledgeConfig.borderColor} border`}>
                                    <AckIcon className={`${acknowledgeConfig.textColor} text-xs`} />
                                    <span className={`${acknowledgeConfig.textColor} text-xs font-semibold`}>
                                      {task.acknowledge}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4">
                                <div className="flex justify-center gap-2">
                                  <button
                                    className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 hover:scale-110"
                                    onClick={() => handleViewTask(task)}
                                  >
                                    <FaEye className="text-sm" />
                                  </button>
                                  
                                  <button
                                    className={`p-2 rounded-lg border transition-all duration-300 hover:scale-110 ${
                                      task.acknowledge === "Acknowledged"
                                        ? "bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30 hover:border-green-500/50"
                                        : "bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30 hover:border-red-500/50"
                                    }`}
                                    onClick={() => {
                                      if (task.acknowledge === "Not Acknowledge") {
                                        confirmAcknowledge(task);
                                      } else {
                                        toast("Task is already acknowledged.");
                                      }
                                    }}
                                  >
                                    {task.acknowledge === "Acknowledged" ? <FaThumbsUp className="text-sm" /> : <FaThumbsDown className="text-sm" />}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile/Tablet Card View */}
              <div className="xl:hidden space-y-4">
                {tasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 space-y-4">
                    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full">
                      <FaClipboardList className="text-2xl text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                      No Tasks Assigned
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                      You don't have any tasks assigned yet
                    </p>
                  </div>
                ) : (
                  tasks.map((task, index) => {
                    const statusConfig = getStatusConfig(task.status);
                    const acknowledgeConfig = getAcknowledgeConfig(task.acknowledge);
                    const priorityConfig = getPriorityConfig(task.priority);
                    const StatusIcon = statusConfig.icon;
                    const AckIcon = acknowledgeConfig.icon;
                    
                    return (
                      <div 
                        key={task._id}
                        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up hover:scale-105"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-bold text-sm">
                              #{index + 1}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg text-blue-600 dark:text-blue-400">
                                {task.assignedToEmployeeId}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                by {task.assignedByName}
                              </p>
                            </div>
                          </div>
                          
                          <div className={`px-3 py-1 rounded-lg ${priorityConfig.bgColor} ${priorityConfig.borderColor} border`}>
                            <span className={`${priorityConfig.textColor} text-sm font-semibold`}>
                              {task.priority}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm">
                              <FaCalendarAlt className="text-gray-400" />
                              <span className="text-gray-600 dark:text-gray-400">Assigned:</span>
                              <span className="font-medium text-gray-900 dark:text-gray-100">
                                {new Date(task.createdAt).toLocaleDateString("en-IN", {
                                  timeZone: "Asia/Kolkata",
                                  day: "2-digit",
                                  month: "short"
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Due:</span>
                              <span className="font-medium text-gray-900 dark:text-gray-100">
                                {new Date(task.dueDate).toLocaleDateString("en-IN", {
                                  timeZone: "Asia/Kolkata",
                                  day: "2-digit",
                                  month: "short"
                                })}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${statusConfig.bgColor} ${statusConfig.borderColor} border`}>
                              <StatusIcon className={`${statusConfig.textColor} text-xs`} />
                              <span className={`${statusConfig.textColor} text-sm font-semibold`}>
                                {task.status}
                              </span>
                            </div>
                            
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${acknowledgeConfig.bgColor} ${acknowledgeConfig.borderColor} border`}>
                              <AckIcon className={`${acknowledgeConfig.textColor} text-xs`} />
                              <span className={`${acknowledgeConfig.textColor} text-xs font-semibold`}>
                                {task.acknowledge}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-2 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                          <button
                            className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 hover:scale-110"
                            onClick={() => handleViewTask(task)}
                          >
                            <FaEye className="text-sm" />
                          </button>
                          
                          <button
                            className={`p-2 rounded-lg border transition-all duration-300 hover:scale-110 ${
                              task.acknowledge === "Acknowledged"
                                ? "bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30 hover:border-green-500/50"
                                : "bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30 hover:border-red-500/50"
                            }`}
                            onClick={() => {
                              if (task.acknowledge === "Not Acknowledge") {
                                confirmAcknowledge(task);
                              } else {
                                toast("Task is already acknowledged.");
                              }
                            }}
                          >
                            {task.acknowledge === "Acknowledged" ? <FaThumbsUp className="text-sm" /> : <FaThumbsDown className="text-sm" />}
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* View Task Modal */}
      {isViewOpen && (
        <AssignedTaskModal
          task={selectedTask}
          onClose={() => setIsViewOpen(false)}
        />
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AssignedTask;