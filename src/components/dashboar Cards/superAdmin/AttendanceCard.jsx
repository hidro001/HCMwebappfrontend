// import * as React from "react";

// function AttendanceCard() {
//   const attendanceData = [
//     { label: "Reported Employers", value: "230" },
//     { label: "On Leave", value: "12" },
//     { label: "Not yet Reported", value: "5" }
//   ];

//   return (
//     <div className="flex overflow-hidden flex-col justify-center self-center px-7 py-6 mt-9 max-w-full bg-white rounded-xl border border-gray-200 border-solid shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)] w-full max-md:px-5   
//     ">
//       <div className="flex flex-col w-full">
//         <div className="flex gap-9 items-center w-full">
//           <div className="self-stretch my-auto text-2xl font-extrabold tracking-tighter leading-10 text-lime-600">
//             Attendance Today
//           </div>
//           <div className="flex relative flex-col self-stretch my-auto rounded-none aspect-[1.41] w-[55px]">
//             <img
//               loading="lazy"
//               src="https://cdn.builder.io/api/v1/image/assets/TEMP/528a542c-af6c-4fa2-96d0-9cdc63e77401?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
//               alt=""
//               className="object-cover absolute inset-0 size-full"
//             />
//             <div className="flex relative shrink-0 rounded-xl bg-lime-600 bg-opacity-10 h-[39px]" />
//           </div>
//         </div>
//         <div className="flex flex-col self-center mt-5 max-w-full tracking-tighter text-center whitespace-nowrap text-stone-500 w-[200px]">
//           <div className="flex relative flex-col justify-center px-5 py-12 w-full aspect-[0.994] max-md:px-5">
//             <img
//               loading="lazy"
//               src="https://cdn.builder.io/api/v1/image/assets/TEMP/8bbd34f7c738cf63be661ac0d268660afa245d83c5fbe4933ddc7e9decf2edbf?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
//               alt="Attendance chart"
//               className="object-cover absolute inset-0 size-full"
//             />
//             <div className="flex relative flex-col justify-center">
//               <div className="text-3xl font-extrabold leading-loose">85%</div>
//               <div className="text-xl font-medium leading-10">Attendance</div>
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col mt-5 w-full text-xl tracking-tighter leading-10 text-stone-500">
//           {attendanceData.map((item, index) => (
//             <div key={index} className="flex gap-10 justify-between items-center w-full">
//               <div className="self-stretch my-auto font-medium">{item.label}</div>
//               <div className="self-stretch my-auto font-bold text-right w-[35px]">
//                 {item.value}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AttendanceCard;

// import * as React from "react";

// function AttendanceCard() {
//   const attendanceData = [
//     { label: "Reported Employers", value: "230" },
//     { label: "On Leave", value: "12" },
//     { label: "Not yet Reported", value: "5" },
//   ];

//   return (
//     <div className="
//       flex flex-col justify-center px-7 py-6 mt-9 w-full max-w-full
//       bg-white dark:bg-gray-800
//       text-gray-800 dark:text-gray-100
//       rounded-xl border border-gray-200 dark:border-gray-600
//       shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)]
//     ">
//       <div className="w-full">
//         {/* Header */}
//         <div className="flex gap-9 items-center w-full">
//           <div className="text-2xl font-extrabold tracking-tighter leading-10 text-lime-600 dark:text-lime-400">
//             Attendance Today
//           </div>
//           <div className="relative w-[55px] aspect-[1.41]">
//             <img
//               loading="lazy"
//               src="https://cdn.builder.io/api/v1/image/assets/TEMP/528a542c-af6c-4fa2-96d0-9cdc63e77401"
//               alt=""
//               className="object-cover absolute inset-0 w-full h-full"
//             />
//             <div className="relative bg-lime-600 dark:bg-lime-500 bg-opacity-10 h-[39px]" />
//           </div>
//         </div>

//         {/* Chart */}
//         <div className="flex flex-col items-center mt-5 text-stone-500 dark:text-stone-300">
//           <div className="relative flex flex-col items-center justify-center px-5 py-12 w-full max-w-[200px] aspect-square">
//             <img
//               loading="lazy"
//               src="https://cdn.builder.io/api/v1/image/assets/TEMP/8bbd34f7c738cf63be661ac0d268660afa245d83c5fbe4933ddc7e9decf2edbf"
//               alt="Attendance chart"
//               className="object-cover absolute inset-0 w-full h-full"
//             />
//             <div className="relative flex flex-col justify-center items-center">
//               <div className="text-3xl font-extrabold leading-loose">85%</div>
//               <div className="text-xl font-medium leading-10">Attendance</div>
//             </div>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="flex flex-col mt-5 w-full text-xl tracking-tighter leading-10 text-stone-500 dark:text-stone-300">
//           {attendanceData.map((item, index) => (
//             <div
//               key={index}
//               className="flex gap-10 justify-between items-center w-full"
//             >
//               <div className="font-medium">{item.label}</div>
//               <div className="font-bold text-right">{item.value}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AttendanceCard;

// import * as React from "react";

// function AttendanceCard() {
//   const attendanceData = [
//     { label: "Reported Employers", value: "230" },
//     { label: "On Leave", value: "12" },
//     { label: "Not yet Reported", value: "5" },
//   ];

//   return (
//     <div
//       className="
//         flex flex-col
//         w-full max-w-sm
//         rounded-xl
//         bg-white dark:bg-gray-800
//         shadow-2xl
//         p-4
//         text-gray-800 dark:text-gray-100
//         mt-14
//       "
//     >
//       {/* Header: Title + % drop indicator */}
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-lg font-bold text-green-700 dark:text-green-400">
//           Attendance Today
//         </h2>
//         <div
//           className="
//             flex items-center gap-1
//             text-xs font-semibold
//             px-2 py-1
//             rounded-md
//             bg-gray-50 dark:bg-gray-700
//             text-gray-600 dark:text-gray-200
//           "
//         >
//           {/* Down arrow icon */}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="2"
//             stroke="currentColor"
//             className="w-3 h-3"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//           </svg>
//           <span>15%</span>
//         </div>
//       </div>

//       {/* Donut Chart */}
//       <div className="flex justify-center mb-5">
//         <div className="relative w-32 h-32">
//           {/* Placeholder donut chart image */}
//           <img
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/8bbd34f7c738cf63be661ac0d268660afa245d83c5fbe4933ddc7e9decf2edbf"
//             alt="Attendance chart"
//             className="absolute inset-0 w-full h-full object-cover"
//           />
//           {/* Center text */}
//           <div className="absolute inset-0 flex flex-col items-center justify-center">
//             <span className="text-2xl font-extrabold text-gray-800 dark:text-gray-100">
//               85%
//             </span>
//             <span className="text-sm text-gray-500 dark:text-gray-300">
//               Attendance
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Stats: Reported Employers, On Leave, Not Yet Reported */}
//       <div className="space-y-2 text-sm">
//         {attendanceData.map((item) => (
//           <div key={item.label} className="flex justify-between">
//             <span className="font-medium">{item.label}</span>
//             <span className="font-bold">{item.value}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default AttendanceCard;

// import  { useEffect } from "react";
// import { useDashboardStore } from "../../../store/useDashboardStore"; // adjust path as needed

// function AttendanceCard() {
//   // 1) Pull the required data from your Zustand store
//   const {
//     totalUsers,
//     usersLoggedInToday,
//     employeesOnLeaveToday,
//     fetchDashboardStats,
//   } = useDashboardStore();

//   // 2) Fetch the dashboard stats on component mount
//   useEffect(() => {
//     fetchDashboardStats();
//   }, [fetchDashboardStats]);

//   // 3) Calculate the needed values
//   const reportedEmployers = usersLoggedInToday; // how many have logged in today
//   const onLeave = employeesOnLeaveToday;
//   const notYetReported = totalUsers - reportedEmployers;

//   // Attendance percentage (avoid divide-by-zero if totalUsers is 0)
//   const attendancePct =
//     totalUsers > 0 ? (reportedEmployers / totalUsers) * 100 : 0;

//   // (Optional) If you want to show a "15% down" or some comparison, you can decide how to compute that.
//   // Right now, we'll just keep the UI structure the same and remove the dummy 15%.

//   return (
//     <div
//       className="
//         flex flex-col
//         w-full max-w-sm
//         rounded-xl
//         bg-white dark:bg-gray-800
//         shadow-2xl
//         p-4
//         text-gray-800 dark:text-gray-100
//         mt-14
//       "
//     >
//       {/* Header: Title + % drop indicator (optional) */}
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-lg font-bold text-green-700 dark:text-green-400">
//           Attendance Today
//         </h2>

//         {/* Example: We'll hide the arrow or you can dynamically calculate a difference */}
//         <div
//           className="
//             flex items-center gap-1
//             text-xs font-semibold
//             px-2 py-1
//             rounded-md
//             bg-gray-50 dark:bg-gray-700
//             text-gray-600 dark:text-gray-200
//           "
//         >
//           {/* Down arrow icon */}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="2"
//             stroke="currentColor"
//             className="w-3 h-3"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//           </svg>
//           <span>15%</span>
//           {/* You could replace "15%" with dynamic logic if you have some 'yesterday' or 'last week' data */}
//         </div>
//       </div>

//       {/* Donut Chart */}
//       <div className="flex justify-center mb-5">
//         <div className="relative w-32 h-32">
//           {/* Placeholder donut chart image */}
//           <img
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/8bbd34f7c738cf63be661ac0d268660afa245d83c5fbe4933ddc7e9decf2edbf"
//             alt="Attendance chart"
//             className="absolute inset-0 w-full h-full object-cover"
//           />
//           {/* Center text: dynamic attendance percentage */}
//           <div className="absolute inset-0 flex flex-col items-center justify-center">
//             <span className="text-2xl font-extrabold text-gray-800 dark:text-gray-100">
//               {attendancePct.toFixed(0)}%
//             </span>
//             <span className="text-sm text-gray-500 dark:text-gray-300">
//               Attendance
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Stats: Reported Employers, On Leave, Not Yet Reported */}
//       <div className="space-y-2 text-sm">
//         <div className="flex justify-between">
//           <span className="font-medium">Reported Employers</span>
//           <span className="font-bold">{reportedEmployers}</span>
//         </div>
//         <div className="flex justify-between">
//           <span className="font-medium">On Leave</span>
//           <span className="font-bold">{onLeave}</span>
//         </div>
//         <div className="flex justify-between">
//           <span className="font-medium">Not yet Reported</span>
//           <span className="font-bold">{notYetReported}</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AttendanceCard;


import  { useEffect } from 'react';
import { useDashboardStore } from '../../../store/useDashboardStore';
import { Doughnut } from 'react-chartjs-2';

function AttendanceCard() {
  // 1) Pull data from Zustand
  const {
    totalUsers,
    usersLoggedInToday,
    employeesOnLeaveToday,
    fetchDashboardStats,
  } = useDashboardStore();

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  // 2) Compute derived values
  const reportedEmployers = usersLoggedInToday;        // numberOfUsersLoggedInToday
  const onLeave = employeesOnLeaveToday;               // numberOfEmployeesOnLeaveToday
  const notYetReported = totalUsers - reportedEmployers;
  const attendancePct = totalUsers > 0
    ? (reportedEmployers / totalUsers) * 100
    : 0;

  // 3) Chart.js data
  // We create a dataset for the donut with 3 segments
  // You can use any colors you like.
  const data = {
    labels: ['Reported', 'On Leave', 'Not Yet Reported'],
    datasets: [
      {
        label: 'Attendance Breakdown',
        data: [reportedEmployers, onLeave, notYetReported],
        backgroundColor: [
          '#34D399', // green-400
          '#F87171', // red-400
          '#60A5FA', // blue-400
        ],
        hoverOffset: 4,
      },
    ],
  };

  // 4) Chart.js options
  // `cutout` controls how "thick" the donut is
  const options = {
    responsive: true,
    cutout: '60%',
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          // e.g. "Reported: 2"
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  // 5) Plugin for center text
  const centerTextPlugin = {
    id: 'attendanceCenterTextPlugin',
    afterDraw: (chart) => {
      const { ctx, chartArea: { width, height } } = chart;
      ctx.save();

      // Draw the percentage in the center
      ctx.fillStyle = '#1F2937'; // text-gray-800
      ctx.textAlign = 'center';
      ctx.font = 'bold 16px sans-serif';

      // X = center of chart area, Y = center
      ctx.fillText(
        `${Math.round(attendancePct)}%`,
        width / 2,
        height / 2 + 8 // adjust +8 so it's vertically centered
      );

      // Optional smaller text "Attendance" beneath or above
      // ctx.font = '12px sans-serif';
      // ctx.fillText(
      //   'Attendance',
      //   width / 2,
      //   height / 2 + 28
      // );

      ctx.restore();
    },
  };

  return (
    <div
      className="
        flex flex-col
        w-full max-w-sm
        rounded-xl
        bg-white dark:bg-gray-800
        shadow-2xl
        p-4
        text-gray-800 dark:text-gray-100
        mt-14
      "
    >
      {/* Header: Title + optional change indicator */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-green-700 dark:text-green-400">
          Attendance Today
        </h2>
    
      </div>

      {/* 6) The Donut Chart */}
      <div className="flex justify-center mb-5">
        <div className="relative w-40 h-40"> 
          {/* Make the chart a bit bigger than before */}
          <Doughnut
            data={data}
            options={options}
            plugins={[centerTextPlugin]} // register our custom plugin
          />
        </div>
      </div>

      {/* 7) Stats: Reported Employers, On Leave, Not Yet Reported */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="font-medium">Reported Employers</span>
          <span className="font-bold">{reportedEmployers}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">On Leave</span>
          <span className="font-bold">{onLeave}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Not yet Reported</span>
          <span className="font-bold">{notYetReported}</span>
        </div>
      </div>
    </div>
  );
}

export default AttendanceCard;


