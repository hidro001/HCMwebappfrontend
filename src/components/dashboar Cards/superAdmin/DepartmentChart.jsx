// import * as React from "react";

// function DepartmentChart() {
//   return (
//     <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full
// ">
//       <div className="flex flex-col grow max-md:mt-9 max-md:max-w-full">
//         <div className="flex flex-col items-center px-2 pt-5 pb-20 w-full bg-white rounded-2xl shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)] max-md:max-w-full">
//           <div className="flex gap-10 max-w-full text-lg font-semibold text-lime-600 w-[393px]">
//             <div className="flex-auto w-[290px]">Employee Count By Department</div>
//             <img
//               loading="lazy"
//               src="https://cdn.builder.io/api/v1/image/assets/TEMP/7b5bc67910b4e920e038a3adc4384a1bb238d4c3421020f99bc5b1d675f3c954?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
//               alt=""
//               className="object-contain shrink-0 self-start w-10 aspect-[2.86]"
//             />
//           </div>
//           <div className="flex shrink-0 self-stretch mt-2.5 h-px rounded-md bg-zinc-200 shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)]" />
//           <div className="flex gap-3.5 mt-14 max-w-full w-[369px] max-md:mt-10">
//             <div className="flex flex-col my-auto text-sm text-right whitespace-nowrap text-neutral-800">
//               <div className="flex flex-col pl-2.5">
//                 <div className="self-end">IT</div>
//                 <div className="self-start mt-10 max-md:mt-10">Sales</div>
//               </div>
//               <div className="mt-10 max-md:mt-10">Finance</div>
//               <div className="self-end mt-10 max-md:mt-10">HR</div>
//             </div>
//             <div className="flex flex-auto">
//               <div className="flex flex-col bg-stone-300">
//                 <div className="flex shrink-0 bg-zinc-800 h-[247px]" />
//               </div>
//               <div className="flex flex-col grow shrink-0 items-start my-auto basis-0 w-fit">
//                 <div className="flex shrink-0 self-stretch bg-blue-600 h-[38px]" />
//                 <div className="flex shrink-0 mt-6 bg-blue-600 h-[38px] w-[92px]" />
//                 <div className="flex shrink-0 mt-6 bg-blue-600 h-[38px] w-[45px]" />
//                 <div className="flex shrink-0 mt-6 bg-blue-600 h-[38px] w-[22px]" />
//               </div>
//             </div>
//           </div>
//           <div className="flex gap-5 justify-between mt-1.5 w-72 max-w-full text-sm text-center whitespace-nowrap text-neutral-700">
//             <div>0</div>
//             <div>20</div>
//             <div>40</div>
//             <div>60</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DepartmentChart;

// import * as React from "react";

// function DepartmentChart() {
//   return (
//     <div className="flex flex-col w-full md:w-1/2 mt-5 md:mt-0">
//       <div className="flex flex-col grow">
//         <div className="
//           flex flex-col items-center p-5 w-full
//           bg-white dark:bg-gray-800
//           text-gray-800 dark:text-gray-100
//           rounded-2xl shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)]
//         ">
//           <div className="flex gap-10 w-full max-w-md text-lg font-semibold text-lime-600 dark:text-lime-400">
//             <div className="flex-auto">Employee Count By Department</div>
//             <img
//               loading="lazy"
//               src="https://cdn.builder.io/api/v1/image/assets/TEMP/7b5bc67910b4e920e038a3adc4384a1bb238d4c3421020f99bc5b1d675f3c954"
//               alt=""
//               className="object-contain w-10 h-auto"
//             />
//           </div>

//           <div className="w-full mt-2.5 h-px rounded-md bg-zinc-200 dark:bg-zinc-600" />

//           {/* Bar Chart */}
//           <div className="flex gap-3.5 mt-14 w-full max-w-sm justify-center">
//             {/* Labels */}
//             <div className="flex flex-col my-auto text-sm text-right text-neutral-800 dark:text-neutral-300">
//               <div>IT</div>
//               <div className="mt-10">Sales</div>
//               <div className="mt-10">Finance</div>
//               <div className="mt-10">HR</div>
//             </div>
//             {/* Bars */}
//             <div className="flex flex-auto">
//               <div className="flex flex-col bg-stone-300 dark:bg-stone-700">
//                 <div className="flex shrink-0 bg-zinc-800 dark:bg-zinc-200 h-[247px]" />
//               </div>
//               <div className="flex flex-col grow items-start my-auto">
//                 <div className="bg-blue-600 dark:bg-blue-400 h-[38px] w-[120px]" />
//                 <div className="bg-blue-600 dark:bg-blue-400 h-[38px] w-[92px] mt-6" />
//                 <div className="bg-blue-600 dark:bg-blue-400 h-[38px] w-[45px] mt-6" />
//                 <div className="bg-blue-600 dark:bg-blue-400 h-[38px] w-[22px] mt-6" />
//               </div>
//             </div>
//           </div>

//           {/* X-Axis */}
//           <div className="flex gap-5 justify-between mt-1.5 w-72 text-sm text-center text-neutral-700 dark:text-neutral-400">
//             <div>0</div>
//             <div>20</div>
//             <div>40</div>
//             <div>60</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DepartmentChart;

// import * as React from "react";

// function DepartmentChart() {
//   return (
//     <div className="mt-5 w-full md:w-1/2 md:mt-0">
//       <div
//         className="
//           flex flex-col
//           rounded-xl
//           bg-white dark:bg-gray-800
//           shadow-2xl
//           p-4
//           text-gray-800 dark:text-gray-100
//         "
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <h2 className="text-lime-600 dark:text-lime-400 font-semibold text-base sm:text-lg">
//             Employee Count By Department
//           </h2>
//           {/* Ellipsis Icon */}
//           <button className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 sm:h-6 sm:w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <circle cx="5" cy="12" r="1"></circle>
//               <circle cx="12" cy="12" r="1"></circle>
//               <circle cx="19" cy="12" r="1"></circle>
//             </svg>
//           </button>
//         </div>

//         {/* Divider */}
//         <div className="h-px bg-gray-200 dark:bg-gray-600 my-3" />

//         {/* Chart Area */}
//         <div className="flex flex-col gap-5 mt-4">
//           {/* Department Labels & Bars */}
//           <div className="flex flex-col gap-4">
//             {/* 1) IT */}
//             <div className="flex items-center">
//               <span className="w-24 text-sm text-gray-700 dark:text-gray-300">
//                 IT
//               </span>
//               <div className="relative w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-md ml-2">
//                 <div
//                   className="absolute left-0 top-0 h-3 bg-blue-600 dark:bg-blue-400 rounded-md"
//                   style={{ width: "70%" }}
//                 ></div>
//               </div>
//             </div>

//             {/* 2) Sales */}
//             <div className="flex items-center">
//               <span className="w-24 text-sm text-gray-700 dark:text-gray-300">
//                 Sales
//               </span>
//               <div className="relative w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-md ml-2">
//                 <div
//                   className="absolute left-0 top-0 h-3 bg-blue-600 dark:bg-blue-400 rounded-md"
//                   style={{ width: "40%" }}
//                 ></div>
//               </div>
//             </div>

//             {/* 3) Finance */}
//             <div className="flex items-center">
//               <span className="w-24 text-sm text-gray-700 dark:text-gray-300">
//                 Finance
//               </span>
//               <div className="relative w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-md ml-2">
//                 <div
//                   className="absolute left-0 top-0 h-3 bg-blue-600 dark:bg-blue-400 rounded-md"
//                   style={{ width: "25%" }}
//                 ></div>
//               </div>
//             </div>

//             {/* 4) HR */}
//             <div className="flex items-center">
//               <span className="w-24 text-sm text-gray-700 dark:text-gray-300">
//                 HR
//               </span>
//               <div className="relative w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-md ml-2">
//                 <div
//                   className="absolute left-0 top-0 h-3 bg-blue-600 dark:bg-blue-400 rounded-md"
//                   style={{ width: "10%" }}
//                 ></div>
//               </div>
//             </div>
//           </div>

//           {/* X-axis labels */}
//           <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mx-1 mt-2">
//             <span>0</span>
//             <span>20</span>
//             <span>40</span>
//             <span>60</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DepartmentChart;

// import  { useEffect, useMemo } from 'react';
// import {
//   useDashboardStore,
// } from "../../../store/useDashboardStore"; // your zustand store
// function DepartmentChart() {
//   // Pull state & methods from Zustand
//   const {
//     totalUsers,
//     employeesPerDepartment,
//     fetchDashboardStats,
//   } = useDashboardStore();

//   // Fetch data on mount
//   useEffect(() => {
//     fetchDashboardStats();
//   }, [fetchDashboardStats]);

//   // 1. Generate X-axis labels: 0 -> totalUsers
//   const xAxisLabels = useMemo(() => {
//     if (totalUsers === 0) return [0];
//     const intervals = 4; // number of segments
//     const step = Math.ceil(totalUsers / intervals);
//     const labels = Array.from({ length: intervals + 1 }, (_, i) => i * step);
//     labels[labels.length - 1] = totalUsers; // ensure last label is exactly totalUsers
//     return labels;
//   }, [totalUsers]);

//   // 2. Helper to get bar width
//   const getBarWidthPercent = (deptCount) => {
//     if (totalUsers === 0) return 0;
//     return (deptCount / totalUsers) * 100;
//   };

//   return (
//     <div className="mt-5 w-full md:w-1/2 md:mt-0">
//       <div
//         className="
//           flex flex-col
//           rounded-xl
//           bg-white dark:bg-gray-800
//           shadow-2xl
//           p-4
//           text-gray-800 dark:text-gray-100
//         "
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <h2 className="text-lime-600 dark:text-lime-400 font-semibold text-base sm:text-lg">
//             Employee Count By Department
//           </h2>
//           {/* Ellipsis Icon */}
//           <button className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 sm:h-6 sm:w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <circle cx="5" cy="12" r="1" />
//               <circle cx="12" cy="12" r="1" />
//               <circle cx="19" cy="12" r="1" />
//             </svg>
//           </button>
//         </div>

//         {/* Divider */}
//         <div className="h-px bg-gray-200 dark:bg-gray-600 my-3" />

//         {/* Chart Area */}
//         <div className="flex flex-col gap-5 mt-4">
//           {/* Department Labels & Bars */}
//           <div className="flex flex-col gap-4">
//             {employeesPerDepartment.map((dept) => {
//               const departmentName = dept.department || 'Unassigned';
//               const barWidth = getBarWidthPercent(dept.count);

//               return (
//                 <div className="flex items-center" key={departmentName}>
//                   <span className="w-24 text-sm text-gray-700 dark:text-gray-300">
//                     {departmentName}
//                   </span>
//                   <div className="relative w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-md ml-2">
//                     <div
//                       className="absolute left-0 top-0 h-3 bg-blue-600 dark:bg-blue-400 rounded-md"
//                       style={{ width: `${barWidth}%` }}
//                       title={`${dept.count} employees in ${departmentName}`}
//                     ></div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* X-axis labels (dynamic) */}
//           <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mx-1 mt-2">
//             {xAxisLabels.map((labelValue, idx) => (
//               <span key={idx}>{labelValue}</span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DepartmentChart;

// import  { useEffect } from "react";
// import { Bar } from "react-chartjs-2";
// import { useDashboardStore } from "../../../store/useDashboardStore"; // your zustand store
// function DepartmentChart() {
//   const { totalUsers, employeesPerDepartment, fetchDashboardStats } =
//     useDashboardStore();

//   useEffect(() => {
//     fetchDashboardStats();
//   }, [fetchDashboardStats]);

//   // 1) Build the labels and data
//   const labels = employeesPerDepartment.map(
//     (dept) => dept.department || "Unassigned"
//   );
//   const dataValues = employeesPerDepartment.map((dept) => dept.count);

//   // 2) Build an array of colors, one per department.
//   //    You can define a preset palette or generate random colors.
//   const colors = [
//     "#60A5FA", // "blue-400"
//     "#F87171", // "red-400"
//     "#34D399", // "green-400"
//     "#FBBF24", // "yellow-400"
//     "#A78BFA", // "indigo-400"
//     "#F472B6", // "pink-400"
//     "#C084FC", // "purple-400"
//     "#4ADE80", // "green-400"
//     "#FCD34D", // "yellow-300"
//     "#38BDF8", // "sky-400"
//   ];

//   // Slice or map so each department gets a unique color, cycling if more depts than colors
//   const backgroundColors = dataValues.map((_, i) => colors[i % colors.length]);

//   // 3) Final data object for Chart.js
//   const data = {
//     labels,
//     datasets: [
//       {
//         label: "Employees",
//         data: dataValues,
//         backgroundColor: backgroundColors,
//       },
//     ],
//   };

//   // 4) Chart.js options
//   const options = {
//     indexAxis: "y", // Horizontal bar chart
//     responsive: true,
//     maintainAspectRatio: false, // So chart fills the fixed container height
//     scales: {
//       x: {
//         beginAtZero: true,
//         max: totalUsers > 0 ? totalUsers : undefined,
//       },
//       y: {
//         // Additional customizations here if needed
//       },
//     },
//     plugins: {
//       legend: {
//         position: "top",
//       },
//     },
//   };

//   return (
//     <div className="mt-5 w-full md:w-1/2 md:mt-0  ">
//       <div
//         className="
//           flex flex-col
//           rounded-xl
//           bg-white dark:bg-gray-800
//           shadow-2xl
//           p-4
//           text-gray-800 dark:text-gray-100
       
//         "
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <h2 className="text-lime-600 dark:text-lime-400 font-semibold text-base sm:text-lg">
//             Employee Count By Department
//           </h2>
//           {/* Ellipsis Icon */}
//           {/* <button className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 sm:h-6 sm:w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <circle cx="5" cy="12" r="1" />
//               <circle cx="12" cy="12" r="1" />
//               <circle cx="19" cy="12" r="1" />
//             </svg>
//           </button> */}
//         </div>

//         {/* Divider */}
//         <div className="h-px bg-gray-200 dark:bg-gray-600 my-3" />

//         {/* Chart Container (Full width, fixed height) */}
//         <div className="w-full h-48">
//           <Bar data={data} options={options} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DepartmentChart;



import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { 
  HiOutlineOfficeBuilding, 
  HiOutlineDotsHorizontal, 
  HiOutlineRefresh,
  HiOutlineChartBar,
  HiOutlineBriefcase
} from 'react-icons/hi';
import { useDashboardStore } from "../../../store/useDashboardStore";

function DepartmentChart() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Pull state + method from Zustand
  const { 
    totalUsers, 
    employeesPerDepartment = [], 
    fetchDashboardStats 
  } = useDashboardStore();

  // Fetch data on mount
  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  // Handle refresh with animation
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchDashboardStats();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Build the labels and data
  const labels = employeesPerDepartment.map(
    (dept) => dept.department || "Unassigned"
  );
  const dataValues = employeesPerDepartment.map((dept) => dept.count);

  // Enhanced color palette for departments
  const colors = [
    "#3B82F6", // blue-500
    "#EF4444", // red-500
    "#10B981", // emerald-500
    "#F59E0B", // amber-500
    "#8B5CF6", // violet-500
    "#EC4899", // pink-500
    "#06B6D4", // cyan-500
    "#84CC16", // lime-500
    "#F97316", // orange-500
    "#6366F1", // indigo-500
  ];

  const backgroundColors = dataValues.map((_, i) => colors[i % colors.length]);

  // Chart data object
  const data = {
    labels,
    datasets: [
      {
        label: "Employees",
        data: dataValues,
        backgroundColor: backgroundColors,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  // Responsive chart options
  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    scales: {
      x: {
        beginAtZero: true,
        max: totalUsers > 0 ? totalUsers : undefined,
        grid: {
          color: 'rgba(156, 163, 175, 0.2)',
        },
        ticks: {
          color: 'rgba(107, 114, 128, 0.8)',
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(107, 114, 128, 0.8)',
          font: {
            size: 11,
          },
          maxTicksLimit: 8,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        borderColor: 'rgba(156, 163, 175, 0.2)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          title: function(context) {
            return `Department: ${context[0].label}`;
          },
          label: function(context) {
            const percentage = totalUsers > 0 
              ? ((context.parsed.x / totalUsers) * 100).toFixed(1)
              : 0;
            return `${context.parsed.x} employees (${percentage}%)`;
          }
        }
      },
    },
  };

  // Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -2,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const refreshVariants = {
    spin: {
      rotate: 360,
      transition: {
        duration: 1,
        ease: "linear",
        repeat: isRefreshing ? Infinity : 0
      }
    }
  };

  // Calculate department stats
  const activeDepartments = employeesPerDepartment.length;
  const largestDept = employeesPerDepartment.reduce((max, dept) => 
    dept.count > max.count ? dept : max, 
    { count: 0, department: '' }
  );

  return (
    <motion.div 
      className="w-full"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <div className="
        flex flex-col
        rounded-xl lg:rounded-2xl
        bg-white dark:bg-gray-800
        shadow-lg hover:shadow-xl
        border border-gray-200 dark:border-gray-700
        p-4 sm:p-5 lg:p-6
        text-gray-800 dark:text-gray-100
        transition-all duration-200
        h-full
      ">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.div
              className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HiOutlineOfficeBuilding className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
            </motion.div>
            <div>
              <h2 className="text-blue-600 dark:text-blue-400 font-semibold text-sm sm:text-base lg:text-lg">
                Employee Count By Department
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Department distribution
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Department count badge */}
            <motion.div
              className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <HiOutlineBriefcase className="h-3 w-3" />
              {activeDepartments} dept{activeDepartments !== 1 ? 's' : ''}
            </motion.div>
            
            {/* Refresh button */}
            <motion.button
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <motion.div
                variants={refreshVariants}
                animate={isRefreshing ? "spin" : ""}
              >
                <HiOutlineRefresh className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.div>
            </motion.button>
            
            {/* Menu button */}
            <motion.button
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <HiOutlineDotsHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-600 to-transparent mb-4"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        />

        {/* Chart Container - Responsive height */}
        <motion.div 
          className="w-full flex-1 min-h-[200px] sm:min-h-[240px] lg:min-h-[280px] relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {employeesPerDepartment.length > 0 ? (
            <Bar data={data} options={options} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
              <div className="text-center">
                <HiOutlineChartBar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No department data available</p>
              </div>
            </div>
          )}
          
          {/* Loading overlay */}
          {isRefreshing && (
            <motion.div
              className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-white dark:bg-gray-700 shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <HiOutlineRefresh className="h-4 w-4 text-blue-600" />
                </motion.div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Updating...</span>
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Enhanced summary stats footer */}
        <motion.div
          className="pt-3 mt-3 border-t border-gray-200 dark:border-gray-700 space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {activeDepartments} active department{activeDepartments !== 1 ? 's' : ''}
            </div>
            <div className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
              Total: {totalUsers || 0} employees
            </div>
          </div>
          
   
        </motion.div>
      </div>
    </motion.div>
  );
}

export default DepartmentChart;