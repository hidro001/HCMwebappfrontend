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

import  { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useDashboardStore } from "../../../store/useDashboardStore"; // your zustand store
function DepartmentChart() {
  const { totalUsers, employeesPerDepartment, fetchDashboardStats } =
    useDashboardStore();

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  // 1) Build the labels and data
  const labels = employeesPerDepartment.map(
    (dept) => dept.department || "Unassigned"
  );
  const dataValues = employeesPerDepartment.map((dept) => dept.count);

  // 2) Build an array of colors, one per department.
  //    You can define a preset palette or generate random colors.
  const colors = [
    "#60A5FA", // "blue-400"
    "#F87171", // "red-400"
    "#34D399", // "green-400"
    "#FBBF24", // "yellow-400"
    "#A78BFA", // "indigo-400"
    "#F472B6", // "pink-400"
    "#C084FC", // "purple-400"
    "#4ADE80", // "green-400"
    "#FCD34D", // "yellow-300"
    "#38BDF8", // "sky-400"
  ];

  // Slice or map so each department gets a unique color, cycling if more depts than colors
  const backgroundColors = dataValues.map((_, i) => colors[i % colors.length]);

  // 3) Final data object for Chart.js
  const data = {
    labels,
    datasets: [
      {
        label: "Employees",
        data: dataValues,
        backgroundColor: backgroundColors,
      },
    ],
  };

  // 4) Chart.js options
  const options = {
    indexAxis: "y", // Horizontal bar chart
    responsive: true,
    maintainAspectRatio: false, // So chart fills the fixed container height
    scales: {
      x: {
        beginAtZero: true,
        max: totalUsers > 0 ? totalUsers : undefined,
      },
      y: {
        // Additional customizations here if needed
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="mt-5 w-full md:w-1/2 md:mt-0  ">
      <div
        className="
          flex flex-col
          rounded-xl
          bg-white dark:bg-gray-800
          shadow-2xl
          p-4
          text-gray-800 dark:text-gray-100
       
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lime-600 dark:text-lime-400 font-semibold text-base sm:text-lg">
            Employee Count By Department
          </h2>
          {/* Ellipsis Icon */}
          <button className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="5" cy="12" r="1" />
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 dark:bg-gray-600 my-3" />

        {/* Chart Container (Full width, fixed height) */}
        <div className="w-full h-48">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default DepartmentChart;
