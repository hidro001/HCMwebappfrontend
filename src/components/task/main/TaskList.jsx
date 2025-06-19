// import React from "react";
// import { Link } from "react-router-dom";

// export default function TaskList({ tasks = [], loading }) {
//   // Ensure tasks is an array before using .slice()
//   const safeTasks = Array.isArray(tasks) ? tasks.slice(-5) : [];

//   return (
//     <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Task List</h2>
//         <Link to="/dashboard/assigned-task" className="text-blue-500 cursor-pointer hover:underline font-medium">
//           See All →
//         </Link>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg">
//           <thead>
//             <tr className="border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700">
//               <th className="py-3 px-4 text-left">Name</th>
//               <th className="px-4 text-left">Emp ID</th>
//               <th className="px-4 text-left">Due Date</th>
//               <th className="px-4 text-left">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="4" className="p-3 text-center">Loading...</td>
//               </tr>
//             ) : safeTasks.length === 0 ? (
//               <tr>
//                 <td colSpan="4" className="p-3 text-center">No data available.</td>
//               </tr>
//             ) : (
//               safeTasks.map((task, index) => (
//                 <tr key={index} className="border-b border-gray-300 dark:border-gray-700">
//                   <td className="px-4 py-3">{task.assignedToName || "N/A"}</td>
//                   <td className="px-4">{task.assignedToEmployeeId || "N/A"}</td>
                
//                   <td className="px-4">  {new Date(task.dueDate || "N/A").toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
//                   <td className="px-4">
//                     <span className={`px-3 py-1 rounded-full text-sm font-semibold 
//                       ${task.status === "Completed" ? "bg-green-100 text-green-600" :
//                         task.status === "Pending" || task.status === "On Hold" ? "bg-yellow-100 text-yellow-600" :
//                         "bg-red-100 text-red-600"}`}>
//                       {task.status || "Unknown"}
//                     </span>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }



import React from "react";
import { Link } from "react-router-dom";
import {
  FaTasks,
  FaUser,
  FaIdCard,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaPause,
  FaArrowRight,
  FaSpinner,
  FaClipboardList
} from "react-icons/fa";

export default function TaskList({ tasks = [], loading }) {
  // Ensure tasks is an array before using .slice()
  const safeTasks = Array.isArray(tasks) ? tasks.slice(-5) : [];

  // Get status configuration
  const getStatusConfig = (status) => {
    switch (status) {
      case "Completed":
        return {
          color: "from-green-400 to-green-600",
          bgColor: "bg-green-500/10 dark:bg-green-500/20",
          textColor: "text-green-700 dark:text-green-300",
          borderColor: "border-green-500/30",
          icon: FaCheckCircle
        };
      case "Pending":
        return {
          color: "from-yellow-400 to-amber-500",
          bgColor: "bg-yellow-500/10 dark:bg-yellow-500/20",
          textColor: "text-yellow-700 dark:text-yellow-300",
          borderColor: "border-yellow-500/30",
          icon: FaClock
        };
      case "On Hold":
        return {
          color: "from-orange-400 to-orange-600",
          bgColor: "bg-orange-500/10 dark:bg-orange-500/20",
          textColor: "text-orange-700 dark:text-orange-300",
          borderColor: "border-orange-500/30",
          icon: FaPause
        };
      default:
        return {
          color: "from-red-400 to-red-600",
          bgColor: "bg-red-500/10 dark:bg-red-500/20",
          textColor: "text-red-700 dark:text-red-300",
          borderColor: "border-red-500/30",
          icon: FaExclamationTriangle
        };
    }
  };

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 lg:p-8 w-full animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 lg:mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg">
            <FaTasks className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Recent Tasks
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Latest 5 assigned tasks</p>
          </div>
        </div>
        
        <Link 
          to="/dashboard/assigned-task" 
          className="inline-flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm lg:text-base"
        >
          <span className="hidden sm:inline">View All</span>
          <span className="sm:hidden">All</span>
          <FaArrowRight className="text-xs lg:text-sm" />
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <FaSpinner className="text-4xl text-indigo-500 animate-spin" />
          <p className="text-gray-700 dark:text-gray-300 text-lg animate-pulse">Loading tasks...</p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-hidden rounded-xl border border-gray-200/50 dark:border-gray-700/50">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <FaUser className="text-xs" />
                      Employee
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <FaIdCard className="text-xs" />
                      ID
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-xs" />
                      Due Date
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                {safeTasks.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full">
                          <FaClipboardList className="text-2xl text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                          No Tasks Available
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Tasks will appear here once assigned
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  safeTasks.map((task, index) => {
                    const statusConfig = getStatusConfig(task.status);
                    const StatusIcon = statusConfig.icon;
                    
                    return (
                      <tr 
                        key={index} 
                        className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-all duration-300 animate-fade-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {task.assignedToName || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-700 dark:text-gray-300 font-mono text-sm">
                            {task.assignedToEmployeeId || "N/A"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-gray-400 text-xs" />
                            <span className="text-gray-700 dark:text-gray-300 font-medium">
                              {task.dueDate ? 
                                new Date(task.dueDate).toLocaleDateString("en-IN", { 
                                  timeZone: "Asia/Kolkata",
                                  day: "2-digit",
                                  month: "short", 
                                  year: "numeric"
                                }) : "N/A"
                              }
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center">
                            <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${statusConfig.bgColor} ${statusConfig.borderColor} border`}>
                              <StatusIcon className={`${statusConfig.textColor} text-xs`} />
                              <span className={`${statusConfig.textColor} text-sm font-semibold`}>
                                {task.status || "Unknown"}
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile/Tablet Card View */}
          <div className="lg:hidden space-y-4">
            {safeTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full">
                  <FaClipboardList className="text-2xl text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  No Tasks Available
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Tasks will appear here once assigned
                </p>
              </div>
            ) : (
              safeTasks.map((task, index) => {
                const statusConfig = getStatusConfig(task.status);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <div 
                    key={index}
                    className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border ${statusConfig.borderColor} rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up hover:scale-105`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl ${statusConfig.bgColor} ${statusConfig.borderColor} border`}>
                          <StatusIcon className={`${statusConfig.textColor} text-lg`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                            {task.assignedToName || "N/A"}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                            ID: {task.assignedToEmployeeId || "N/A"}
                          </p>
                        </div>
                      </div>
                      
                      <div className={`px-3 py-2 rounded-lg ${statusConfig.bgColor} ${statusConfig.borderColor} border`}>
                        <span className={`${statusConfig.textColor} text-sm font-semibold`}>
                          {task.status || "Unknown"}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <FaCalendarAlt className="text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">Due:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {task.dueDate ? 
                          new Date(task.dueDate).toLocaleDateString("en-IN", { 
                            timeZone: "Asia/Kolkata",
                            day: "2-digit",
                            month: "short", 
                            year: "numeric"
                          }) : "N/A"
                        }
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
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
}