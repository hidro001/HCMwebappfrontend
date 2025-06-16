// import { useState, useEffect } from "react";
// import { Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { getTaskStatusSummary } from "../../../service/taskService"; // Import service file
// import PerformanceChart from "./PerformanceChart";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const ChartStatistics = () => {
//   const [taskData, setTaskData] = useState({
//     Done: 0,
//     Pending: 0,
//     Delay: 0,
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);


//   const employeeId=localStorage.getItem("employeeId")
 

//   useEffect(() => {
//     const fetchTaskData = async () => {
//       try {
//         setLoading(true);
//         const response = await getTaskStatusSummary(employeeId);
//         if (response.success) {
//           setTaskData(response.data);
//         }
//       } catch (err) {
//         setError("Failed to fetch task data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTaskData();
//   }, [employeeId]);

//   // Doughnut Chart Configuration
//   const doughnutData = {
//     labels: ["Done", "Pending", "Delay"],
//     datasets: [
//       {
//         data: [taskData.Done, taskData.Pending, taskData.Delay], // Dynamically fetched data
//         backgroundColor: ["#16a34a", "#3b82f6", "#ec4899"], // Colors for task status
//         borderWidth: 0,
//       },
//     ],
//   };

//   const doughnutOptions = {
//     cutout: "70%", // Creates space in the middle
//     plugins: { legend: { display: false } },
//   };

//   return (
//     <div className="flex flex-col md:flex-row gap-6 p-6 justify-center items-start">
//       {/* Task Status Chart */}
//       <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-2/3">
//         <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
//           Task Status Overview
//         </h2>

//         {loading ? (
//           <p className="text-gray-700 dark:text-gray-200">Loading...</p>
//         ) : error ? (
//           <p className="text-red-500">{error}</p>
//         ) : (
//           <div className="flex flex-col md:flex-row items-center gap-6">
//             {/* Doughnut Chart */}
//             <div className="relative w-full max-w-xs">
//               <Doughnut data={doughnutData} options={doughnutOptions} />
//               {/* Centered Text */}
//               <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-900 dark:text-gray-100 font-semibold">
//                 <span className="text-lg">Total Tasks</span>
//                 <span className="text-3xl">{taskData.Done + taskData.Pending + taskData.Delay}</span>
//               </div>
//             </div>

//             {/* Task Status Table (Status & No. of Tasks) */}
//             <div className="text-gray-700 dark:text-gray-200">
//               <table className="w-full text-left">
//                 <thead>
//                   <tr>
//                     <th className="pb-2">Status</th>
//                     <th className="pb-2 text-center">No. of Tasks</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {[
//                     { name: "Done", count: taskData.Done, color: "bg-green-500" },
//                     { name: "Pending", count: taskData.Pending, color: "bg-blue-500" },
//                     { name: "Delay", count: taskData.Delay, color: "bg-pink-500" },
//                   ].map((task, index) => (
//                     <tr key={index}>
//                       <td className="py-1 flex items-center gap-2">
//                         <span className={`w-3 h-3 rounded-full ${task.color}`}></span>
//                         {task.name}
//                       </td>
//                       <td className="text-center">{task.count}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Performance Statistics */}
//       <div className="bg-green-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-1/3">
//         <PerformanceChart />
//       </div>
//     </div>
//   );
// };

// export default ChartStatistics;



import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getTaskStatusSummary } from "../../../service/taskService"; // Import service file
import PerformanceChart from "./PerformanceChart";
import { 
  FaCheckCircle, 
  FaClock, 
  FaExclamationTriangle, 
  FaTasks,
  FaChartPie,
  FaSpinner
} from "react-icons/fa";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartStatistics = () => {
  const [taskData, setTaskData] = useState({
    Done: 0,
    Pending: 0,
    Delay: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const employeeId = localStorage.getItem("employeeId");

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        setLoading(true);
        const response = await getTaskStatusSummary(employeeId);
        if (response.success) {
          setTaskData(response.data);
        }
      } catch (err) {
        setError("Failed to fetch task data");
      } finally {
        setLoading(false);
      }
    };

    fetchTaskData();
  }, [employeeId]);

  // Doughnut Chart Configuration with modern gradient effects
  const doughnutData = {
    labels: ["Done", "Pending", "Delay"],
    datasets: [
      {
        data: [taskData.Done, taskData.Pending, taskData.Delay],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",   // Green for Done
          "rgba(59, 130, 246, 0.8)",  // Blue for Pending
          "rgba(236, 72, 153, 0.8)"   // Pink for Delay
        ],
        borderColor: [
          "rgba(34, 197, 94, 1)",
          "rgba(59, 130, 246, 1)",
          "rgba(236, 72, 153, 1)"
        ],
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const doughnutOptions = {
    cutout: "70%",
    plugins: { 
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1500,
      easing: 'easeInOutCubic'
    },
    interaction: {
      intersect: false,
    },
  };

  const taskStatusItems = [
    { 
      name: "Done", 
      count: taskData.Done, 
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-500/10 dark:bg-green-500/20",
      textColor: "text-green-600 dark:text-green-400",
      icon: FaCheckCircle,
      borderColor: "border-green-500/30"
    },
    { 
      name: "Pending", 
      count: taskData.Pending, 
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
      textColor: "text-blue-600 dark:text-blue-400",
      icon: FaClock,
      borderColor: "border-blue-500/30"
    },
    { 
      name: "Delay", 
      count: taskData.Delay, 
      color: "from-pink-400 to-pink-600",
      bgColor: "bg-pink-500/10 dark:bg-pink-500/20",
      textColor: "text-pink-600 dark:text-pink-400",
      icon: FaExclamationTriangle,
      borderColor: "border-pink-500/30"
    },
  ];

  const totalTasks = taskData.Done + taskData.Pending + taskData.Delay;

  return (
    <div className=" sm:p-6 lg:p-8 ">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
          {/* Task Status Chart Section */}
          <div className="flex-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 p-6 lg:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 lg:mb-8">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                <FaChartPie className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Task Status Overview
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Real-time task distribution</p>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <FaSpinner className="text-4xl text-blue-500 animate-spin" />
                <p className="text-gray-700 dark:text-gray-300 text-lg animate-pulse">Loading dashboard...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <FaExclamationTriangle className="text-4xl text-red-500 animate-bounce" />
                <p className="text-red-500 text-lg font-medium">{error}</p>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                {/* Doughnut Chart */}
                <div className="relative w-full max-w-sm lg:max-w-md">
                  <div className="animate-fade-in">
                    <Doughnut data={doughnutData} options={doughnutOptions} />
                  </div>
                  {/* Centered Text with Animation */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-center animate-fade-in-up">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <FaTasks className="text-gray-600 dark:text-gray-400 text-lg animate-pulse" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tasks</span>
                      </div>
                      <span className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
                        {totalTasks}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Task Status - Desktop Table View */}
                <div className="hidden md:block flex-1">
                  <div className="overflow-hidden rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                            Tasks
                          </th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                            Progress
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                        {taskStatusItems.map((task, index) => {
                          const IconComponent = task.icon;
                          const percentage = totalTasks > 0 ? (task.count / totalTasks * 100).toFixed(1) : 0;
                          
                          return (
                            <tr 
                              key={index} 
                              className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-all duration-300 animate-fade-in-up"
                              style={{ animationDelay: `${index * 150}ms` }}
                            >
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className={`p-2 rounded-lg ${task.bgColor} ${task.borderColor} border`}>
                                    <IconComponent className={`${task.textColor} text-lg`} />
                                  </div>
                                  <span className="font-medium text-gray-900 dark:text-gray-100">
                                    {task.name}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-center">
                                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                  {task.count}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center justify-center gap-2">
                                  <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div 
                                      className={`h-2 bg-gradient-to-r ${task.color} rounded-full transition-all duration-1000 ease-out animate-pulse`}
                                      style={{ width: `${percentage}%` }}
                                    />
                                  </div>
                                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 min-w-12">
                                    {percentage}%
                                  </span>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Task Status - Mobile/Tablet Card View */}
                <div className="md:hidden w-full space-y-4">
                  {taskStatusItems.map((task, index) => {
                    const IconComponent = task.icon;
                    const percentage = totalTasks > 0 ? (task.count / totalTasks * 100).toFixed(1) : 0;
                    
                    return (
                      <div 
                        key={index}
                        className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border ${task.borderColor} rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up hover:scale-105`}
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-xl ${task.bgColor} ${task.borderColor} border`}>
                              <IconComponent className={`${task.textColor} text-xl`} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                                {task.name}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {percentage}% of total
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                              {task.count}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              tasks
                            </div>
                          </div>
                        </div>
                        
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <div 
                            className={`h-3 bg-gradient-to-r ${task.color} rounded-full transition-all duration-1000 ease-out animate-pulse`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Performance Statistics */}
          <div className="xl:w-96 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-gray-800/80 dark:to-gray-700/80 backdrop-blur-xl border border-green-200/30 dark:border-gray-700/30 p-6 lg:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 animate-fade-in-right">
            <PerformanceChart />
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
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ChartStatistics;