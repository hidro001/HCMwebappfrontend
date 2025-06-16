// import React, { useState } from "react";
// import {
//   format,
//   addMonths,
//   subMonths,
//   startOfMonth,
//   endOfMonth,
//   startOfWeek,
//   endOfWeek,
//   addDays,
//   isSameMonth,
//   isToday
// } from "date-fns";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import { Link } from "react-router-dom";

// export default function DelaytaskCalender({ tasks, loading }) {
//   const [currentMonth, setCurrentMonth] = useState(new Date());

//   // Filter tasks to show only "Not Started" and "In Progress"
//   const delayedTasks = tasks.filter(
//     (task) => task.status === "Not Started" || task.status === "In Progress"
//   );

//   // Functions to navigate months
//   const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
//   const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

//   // Generate calendar days
//   const monthStart = startOfMonth(currentMonth);
//   const monthEnd = endOfMonth(monthStart);
//   const startDate = startOfWeek(monthStart);
//   const endDate = endOfWeek(monthEnd);
//   const days = [];
//   let day = startDate;
//   while (day <= endDate) {
//     days.push(day);
//     day = addDays(day, 1);
//   }

//   return (
//     <div className="flex flex-col md:flex-row gap-6 justify-center items-start p-6">
//       {/* Delayed Tasks Table */}
//       <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-2/3">
//         <h2 className="text-xl font-semibold mb-4">Delayed Tasks</h2>
//         <div className="overflow-x-auto">
//           <table className="w-full border border-gray-300 dark:border-gray-700 rounded-lg">
//             <thead>
//               <tr className="border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700">
//                 <th className="py-3 px-4 text-gray-600 dark:text-gray-300">EMP ID</th>
//                 <th className="px-4">Department</th>
//                 <th className="px-4">Date</th>
//                 <th className="px-4">Status</th>
//                 <th className="px-4">Assigned Manager</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr><td className="px-4 py-3 text-center" colSpan="5">Loading...</td></tr>
//               ) : delayedTasks.length > 0 ? (
//                 delayedTasks.map((task, index) => (
//                   <tr key={task._id} className="border-b border-gray-300 dark:border-gray-700 text-center">
//                     <td className="px-4 py-3">{task.assignedToEmployeeId}</td>
//                     <td className="px-4">{task.selectedDepartment || "-"}</td>
//                     <td className="px-4">{format(new Date(task.dueDate), "dd MMM yyyy")}</td>
//                     <td className="px-4">
//                       <span className={`px-3 py-1 rounded-full text-sm font-semibold 
//                         ${task.status === "Not Started" ? "bg-yellow-100 text-yellow-600" :
//                           task.status === "In Progress" ? "bg-blue-100 text-blue-600" : ""}`}>
//                         {task.status}
//                       </span>
//                     </td>
//                     <td className="px-4">{task.assignedByName}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td className="px-4 py-3" colSpan="5">No delayed tasks available.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//         <div className="flex justify-end mt-4">
//           <Link to="/dashboard/assigned-task" className="text-blue-500 cursor-pointer hover:underline font-medium">
//             See All →
//           </Link>
//         </div>
//       </div>

//       {/* Calendar */}
//       <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-1/3">
//         <div className="flex items-center justify-between mb-4">
//           <button onClick={prevMonth} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
//             <FiChevronLeft size={24} />
//           </button>
//           <h2 className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
//           <button onClick={nextMonth} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
//             <FiChevronRight size={24} />
//           </button>
//         </div>

//         <div className="grid grid-cols-7 text-center text-gray-500 dark:text-gray-400 font-medium mb-2">
//           {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
//             <div key={day} className="p-2">{day}</div>
//           ))}
//         </div>

//         <div className="grid grid-cols-7 text-center">
//           {days.map((day, index) => (
//             <div key={index} className={`p-2 rounded-full ${isSameMonth(day, monthStart) ? "text-gray-900 dark:text-gray-100" : "text-gray-400"} 
//               ${isToday(day) ? "bg-blue-500 text-white font-bold" : "hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"}`}>
//               {format(day, "d")}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isToday
} from "date-fns";
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaCalendarAlt,
  FaClock,
  FaExclamationTriangle,
  FaUser,
  FaBuilding,
  FaArrowRight,
  FaSpinner,
  FaTasks,
  FaPlay,
  FaPause
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function DelaytaskCalender({ tasks, loading }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Filter tasks to show only "Not Started" and "In Progress"
  const delayedTasks = tasks.filter(
    (task) => task.status === "Not Started" || task.status === "In Progress"
  );

  // Functions to navigate months
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  // Generate calendar days
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const days = [];
  let day = startDate;
  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  // Get status configuration
  const getStatusConfig = (status) => {
    switch (status) {
      case "Not Started":
        return {
          color: "from-yellow-400 to-amber-500",
          bgColor: "bg-yellow-500/10 dark:bg-yellow-500/20",
          textColor: "text-yellow-700 dark:text-yellow-300",
          borderColor: "border-yellow-500/30",
          icon: FaPause
        };
      case "In Progress":
        return {
          color: "from-blue-400 to-blue-600",
          bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
          textColor: "text-blue-700 dark:text-blue-300",
          borderColor: "border-blue-500/30",
          icon: FaPlay
        };
      default:
        return {
          color: "from-gray-400 to-gray-600",
          bgColor: "bg-gray-500/10 dark:bg-gray-500/20",
          textColor: "text-gray-700 dark:text-gray-300",
          borderColor: "border-gray-500/30",
          icon: FaClock
        };
    }
  };

  return (
    <div className="  p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
          {/* Delayed Tasks Section */}
          <div className="flex-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 lg:p-8 animate-fade-in">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 lg:mb-8">
              <div className="p-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl shadow-lg">
                <FaExclamationTriangle className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent">
                  Delayed Tasks
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Tasks requiring immediate attention</p>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <FaSpinner className="text-4xl text-red-500 animate-spin" />
                <p className="text-gray-700 dark:text-gray-300 text-lg animate-pulse">Loading delayed tasks...</p>
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-hidden rounded-xl border border-gray-200/50 dark:border-gray-700/50 mb-6">
                  <div className="overflow-x-auto">
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
                              <FaBuilding className="text-xs" />
                              Department
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
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                            Manager
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                        {delayedTasks.length > 0 ? (
                          delayedTasks.map((task, index) => {
                            const statusConfig = getStatusConfig(task.status);
                            const StatusIcon = statusConfig.icon;
                            
                            return (
                              <tr 
                                key={task._id} 
                                className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-all duration-300 animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                              >
                                <td className="px-6 py-4">
                                  <div className="font-medium text-gray-900 dark:text-gray-100">
                                    {task.assignedToEmployeeId}
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <span className="text-gray-700 dark:text-gray-300">
                                    {task.selectedDepartment || "-"}
                                  </span>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="text-gray-400 text-xs" />
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                                      {format(new Date(task.dueDate), "dd MMM yyyy")}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex justify-center">
                                    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${statusConfig.bgColor} ${statusConfig.borderColor} border`}>
                                      <StatusIcon className={`${statusConfig.textColor} text-xs`} />
                                      <span className={`${statusConfig.textColor} text-sm font-semibold`}>
                                        {task.status}
                                      </span>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <span className="text-gray-700 dark:text-gray-300">
                                    {task.assignedByName}
                                  </span>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="5" className="px-6 py-16 text-center">
                              <div className="flex flex-col items-center space-y-4">
                                <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
                                  <FaTasks className="text-2xl text-green-600 dark:text-green-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                                  No Delayed Tasks
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  All tasks are on track!
                                </p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mobile/Tablet Card View */}
                <div className="lg:hidden space-y-4 mb-6">
                  {delayedTasks.length > 0 ? (
                    delayedTasks.map((task, index) => {
                      const statusConfig = getStatusConfig(task.status);
                      const StatusIcon = statusConfig.icon;
                      
                      return (
                        <div 
                          key={task._id}
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
                                  {task.assignedToEmployeeId}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {task.selectedDepartment || "No Department"}
                                </p>
                              </div>
                            </div>
                            
                            <div className={`px-3 py-2 rounded-lg ${statusConfig.bgColor} ${statusConfig.borderColor} border`}>
                              <span className={`${statusConfig.textColor} text-sm font-semibold`}>
                                {task.status}
                              </span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <FaCalendarAlt className="text-gray-400" />
                              <span className="text-gray-600 dark:text-gray-400">Due:</span>
                              <span className="font-medium text-gray-900 dark:text-gray-100">
                                {format(new Date(task.dueDate), "dd MMM yyyy")}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <FaUser className="text-gray-400" />
                              <span className="text-gray-600 dark:text-gray-400">Manager:</span>
                              <span className="font-medium text-gray-900 dark:text-gray-100">
                                {task.assignedByName}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 space-y-4">
                      <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
                        <FaTasks className="text-2xl text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                        No Delayed Tasks
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                        All tasks are on track!
                      </p>
                    </div>
                  )}
                </div>

                {/* See All Link */}
                <div className="flex justify-end">
                  <Link 
                    to="/dashboard/assigned-task" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <span>View All Tasks</span>
                    <FaArrowRight className="text-sm" />
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Calendar Section */}
          <div className="xl:w-96 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 animate-fade-in-right">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={prevMonth} 
                className="p-2 rounded-xl bg-gray-100/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 transition-all duration-300 hover:scale-110"
              >
                <FaChevronLeft size={18} />
              </button>
              
              <div className="text-center">
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  {format(currentMonth, "MMMM yyyy")}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Task Calendar</p>
              </div>
              
              <button 
                onClick={nextMonth} 
                className="p-2 rounded-xl bg-gray-100/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 transition-all duration-300 hover:scale-110"
              >
                <FaChevronRight size={18} />
              </button>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 text-center text-gray-500 dark:text-gray-400 font-semibold mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="p-3 text-xs uppercase tracking-wider">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                const isCurrentMonth = isSameMonth(day, monthStart);
                const isCurrentDay = isToday(day);
                
                return (
                  <div 
                    key={index} 
                    className={`
                      relative p-3 rounded-lg text-center text-sm font-medium transition-all duration-300 cursor-pointer
                      ${isCurrentMonth 
                        ? "text-gray-900 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-blue-900/30" 
                        : "text-gray-400 dark:text-gray-600"
                      }
                      ${isCurrentDay 
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold shadow-lg scale-110" 
                        : ""
                      }
                      hover:scale-105
                    `}
                  >
                    {format(day, "d")}
                    {isCurrentDay && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Calendar Footer */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700/50 dark:to-gray-600/50 rounded-xl border border-blue-100 dark:border-gray-600">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">Today</span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
        
        @keyframes fade-in-right {
          from { 
            opacity: 0; 
            transform: translateX(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}