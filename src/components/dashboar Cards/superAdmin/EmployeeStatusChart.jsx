// import * as React from "react";

// function EmployeeStatusChart() {
//   return (
//     <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full ">
//       <div className="flex flex-col grow max-md:mt-9 max-md:max-w-full ">
//         <div className="flex flex-col px-2 pt-5 pb-24 w-full bg-white rounded-2xl  max-md:pb-24 max-md:max-w-full shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)]">
//           <div className="flex gap-5 justify-between self-center max-w-full text-lg font-semibold text-lime-600 w-[393px]">
//             <div>Employees By Status</div>
//             <img
//               loading="lazy"
//               src="https://cdn.builder.io/api/v1/image/assets/TEMP/ab64c258abde065bbaca6eceb4d17db16b0e0ee3293871d0f9ca2a99efc73889?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
//               alt=""
//               className="object-contain shrink-0 self-start w-10 aspect-[2.86]"
//             />
//           </div>
//           <div className="flex shrink-0 mt-2.5 h-px rounded-md bg-zinc-200 shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)]" />
//           <div className="flex gap-3.5 mt-14 max-w-full w-[382px] max-md:mt-10 max-md:ml-1">
//             <div className="flex flex-col my-auto text-sm text-right whitespace-nowrap text-neutral-800">
//               <div>Confirmed</div>
//               <div className="mt-10 max-md:mt-10">Probation</div>
//               <div className="flex flex-col items-start pl-2.5 mt-10 max-md:mt-10">
//                 <div>Trainee</div>
//                 <div className="mt-10 max-md:mt-10">Contract</div>
//               </div>
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
//           <div className="flex gap-5 justify-between self-center mt-1.5 -mb-5 w-72 max-w-full text-sm text-center whitespace-nowrap text-neutral-700 max-md:mb-2.5">
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

// export default EmployeeStatusChart;

// import * as React from "react";

// function EmployeeStatusChart() {
//   return (
//     <div className="flex flex-col w-full md:w-1/2 mt-5 md:mt-0">
//       <div className="flex flex-col grow">
//         <div className="
//           flex flex-col p-5 w-full
//           bg-white dark:bg-gray-800
//           text-gray-800 dark:text-gray-100
//           rounded-2xl shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)]
//         ">
//           <div className="flex gap-5 justify-between w-full max-w-md text-lg font-semibold text-lime-600 dark:text-lime-400">
//             <div>Employees By Status</div>
//             <img
//               loading="lazy"
//               src="https://cdn.builder.io/api/v1/image/assets/TEMP/ab64c258abde065bbaca6eceb4d17db16b0e0ee3293871d0f9ca2a99efc73889"
//               alt=""
//               className="object-contain w-10 h-auto"
//             />
//           </div>

//           <div className="w-full mt-2.5 h-px rounded-md bg-zinc-200 dark:bg-zinc-600" />

//           {/* Bar Chart */}
//           <div className="flex gap-3.5 mt-14 w-full max-w-sm">
//             {/* Labels */}
//             <div className="flex flex-col my-auto text-sm text-right text-neutral-800 dark:text-neutral-300">
//               <div>Confirmed</div>
//               <div className="mt-10">Probation</div>
//               <div className="mt-10">Trainee</div>
//               <div className="mt-10">Contract</div>
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

// export default EmployeeStatusChart;

// import * as React from "react";

// function EmployeeStatusChart() {
//   return (
//     // Outer container: full width by default, half width at md breakpoint
//     <div className="mt-5 w-full flex flex-col md:w-1/2 md:mt-0">
//       <div className="flex flex-col grow">
//         <div
//           className="
//             flex flex-col w-full p-4 sm:p-5 md:p-6
//             bg-white dark:bg-gray-800
//             text-gray-800 dark:text-gray-100
//             rounded-2xl
//             shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)]
//           "
//         >
//           {/* Header row */}
//           <div
//             className="
//               flex items-center justify-between w-full
//               text-base sm:text-lg font-semibold
//               text-lime-600 dark:text-lime-400
//             "
//           >
//             <div>Employees By Status</div>
//             <img
//               loading="lazy"
//               src="https://cdn.builder.io/api/v1/image/assets/TEMP/ab64c258abde065bbaca6eceb4d17db16b0e0ee3293871d0f9ca2a99efc73889"
//               alt=""
//               className="w-8 h-auto sm:w-10"
//             />
//           </div>

//           {/* Divider */}
//           <div className="mt-2.5 h-px w-full rounded-md bg-zinc-200 dark:bg-zinc-600" />

//           {/* Chart area */}
//           <div
//             className="
//               mt-6 sm:mt-10 md:mt-12
//               flex flex-col gap-5
//               sm:flex-row
//               w-full
//             "
//           >
//             {/* Left column: Labels */}
//             <div
//               className="
//                 flex flex-row sm:flex-col sm:items-end
//                 text-sm sm:text-base
//                 text-neutral-800 dark:text-neutral-300
//                 gap-2 sm:gap-10
//               "
//             >
//               <div>Confirmed</div>
//               <div>Probation</div>
//               <div>Trainee</div>
//               <div>Contract</div>
//             </div>

//             {/* Right column: Bars + background “axis” */}
//             <div className="flex flex-auto items-center sm:items-start gap-3 sm:gap-5">
//               {/* Background bar (left “axis” fill) */}
//               <div className="hidden sm:flex flex-col bg-stone-300 dark:bg-stone-700">
//                 <div className="shrink-0 h-40 sm:h-48 md:h-60 bg-zinc-800 dark:bg-zinc-200" />
//               </div>

//               {/* Actual bar chart data */}
//               <div className="flex flex-col items-start sm:mt-0">
//                 {/* Confirmed bar (largest) */}
//                 <div className="bg-blue-600 dark:bg-blue-400 h-9 sm:h-10 md:h-12 w-24 sm:w-28 md:w-32" />
//                 {/* Probation bar */}
//                 <div className="bg-blue-600 dark:bg-blue-400 mt-6 h-9 sm:h-10 md:h-12 w-20 sm:w-24 md:w-28" />
//                 {/* Trainee bar */}
//                 <div className="bg-blue-600 dark:bg-blue-400 mt-6 h-9 sm:h-10 md:h-12 w-16 sm:w-20 md:w-24" />
//                 {/* Contract bar */}
//                 <div className="bg-blue-600 dark:bg-blue-400 mt-6 h-9 sm:h-10 md:h-12 w-12 sm:w-16 md:w-20" />
//               </div>
//             </div>
//           </div>

//           {/* X-axis labels (bottom) */}
//           <div
//             className="
//               mt-4 flex justify-between
//               w-full sm:w-64 md:w-72
//               text-xs sm:text-sm
//               text-neutral-700 dark:text-neutral-400
//             "
//           >
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

// export default EmployeeStatusChart;

// import * as React from "react";

// function EmployeeStatusChart() {
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
//             Employees By Status
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
//           {/* Status Labels & Bars */}
//           <div className="flex flex-col gap-4">
//             {/* 1) Confirmed */}
//             <div className="flex items-center">
//               <span className="w-24 text-sm text-gray-700 dark:text-gray-300">
//                 Confirmed
//               </span>
//               <div className="relative w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-md ml-2">
//                 {/* Blue bar */}
//                 <div
//                   className="absolute left-0 top-0 h-3 bg-blue-600 dark:bg-blue-400 rounded-md"
//                   style={{ width: "70%" }}
//                 ></div>
//               </div>
//             </div>

//             {/* 2) Probation */}
//             <div className="flex items-center">
//               <span className="w-24 text-sm text-gray-700 dark:text-gray-300">
//                 Probation
//               </span>
//               <div className="relative w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-md ml-2">
//                 <div
//                   className="absolute left-0 top-0 h-3 bg-blue-600 dark:bg-blue-400 rounded-md"
//                   style={{ width: "30%" }}
//                 ></div>
//               </div>
//             </div>

//             {/* 3) Trainee */}
//             <div className="flex items-center">
//               <span className="w-24 text-sm text-gray-700 dark:text-gray-300">
//                 Trainee
//               </span>
//               <div className="relative w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-md ml-2">
//                 <div
//                   className="absolute left-0 top-0 h-3 bg-blue-600 dark:bg-blue-400 rounded-md"
//                   style={{ width: "20%" }}
//                 ></div>
//               </div>
//             </div>

//             {/* 4) Contract */}
//             <div className="flex items-center">
//               <span className="w-24 text-sm text-gray-700 dark:text-gray-300">
//                 Contract
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

// export default EmployeeStatusChart;

// src/components/EmployeeStatusChart.jsx

import  { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useDashboardStore } from "../../../store/useDashboardStore"; // your zustand store

function EmployeeStatusChart() {
  // 1) Pull state + method from Zustand
  const {
    totalUsers,
    employeesPerEmployeeType = [], // destructure default
    fetchDashboardStats,
  } = useDashboardStore();

  // 2) Fetch data on mount
  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  // 3) Prepare the chart data
  // Convert `employee_Type` to a label, fallback to "Unknown" if null/undefined
  const labels = employeesPerEmployeeType.map(
    (item) => item.employee_Type || 'Unknown'
  );
  const dataValues = employeesPerEmployeeType.map((item) => item.count);

  // Optionally choose different colors for each bar
  const colors = [
    '#60A5FA', // blue
    '#F87171', // red
    '#34D399', // green
    '#FBBF24', // yellow
    '#A78BFA', // purple
    '#F472B6', // pink
    '#4ADE80', // another green
  ];
  const backgroundColors = dataValues.map((_, i) => colors[i % colors.length]);

  // 4) Build the chart.js data object
  const data = {
    labels,
    datasets: [
      {
        label: 'Employees',
        data: dataValues,
        backgroundColor: backgroundColors,
      },
    ],
  };

  // 5) Chart.js options
  //    - horizontal bar (indexAxis: 'y')
  //    - set x-axis max to totalUsers if you want the largest bar to be totalUsers
  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false, // so it fills container's height
    scales: {
      x: {
        beginAtZero: true,
        max: totalUsers > 0 ? totalUsers : undefined,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="mt-5 w-full md:w-1/2 md:mt-0 ">
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
            Employees By Status
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

        {/* Chart Container: full width, fixed height */}
        <div className="w-full h-48">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default EmployeeStatusChart;



