// import * as React from "react";

// function StatCard({ icon, count, label, chart }) {
//   return (
//     <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)] rounded-lg">
//       <div className="flex flex-col w-full max-md:mt-3.5">
//         <div className="flex gap-2 items-center self-end p-1.5 text-lg font-semibold text-lime-600 min-h-[44px]">
//           <button className="flex gap-2 items-center">
//             <span className="self-stretch my-auto">See Detail</span>
//             <img
//               loading="lazy"
//               src="https://cdn.builder.io/api/v1/image/assets/TEMP/baea41120183e81adf765959b6f2f010618aff6cf5d0209108aa47f2644fa065?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
//               alt=""
//               className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
//             />
//           </button>
//         </div>
//         <div
//           className="flex  flex-col pt-5 mt-0 rounded-lg max-md:mr-2 "
//         >
//           <div className="flex flex-col items-start ml-6 max-w-full w-[114px] max-md:ml-2.5">
//             <div className="flex relative flex-col justify-center px-2.5 py-2.5 aspect-[1.044] w-[47px]">
//               <img
//                 loading="lazy"
//                 src={icon}
//                 alt=""
//                 className="object-cover absolute inset-0 size-full"
//               />
//             </div>
//             <div className="mt-4 text-2xl font-bold text-zinc-800">{count}</div>
//             <div className="self-stretch mt-4 text-sm leading-3 text-zinc-800">
//               {label}
//             </div>
//           </div>
//           <img
//             loading="lazy"
//             src={chart}
//             alt={`${label} trend chart`}
//             className="object-contain mt-7 aspect-[4.55] "
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default StatCard;


// import * as React from "react";

// function StatCard({ icon, count, label, chart }) {
//   return (
//     <div className="
//       flex flex-col w-full md:w-1/3
//       bg-white dark:bg-gray-800
//       text-gray-800 dark:text-gray-100
//       rounded-lg shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)]
//     ">
//       {/* Top Right Button */}
//       <div className="flex justify-end p-2 text-lime-600 dark:text-lime-400">
//         <button className="flex gap-2 items-center text-sm font-semibold">
//           <span>See Detail</span>
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/baea41120183e81adf765959b6f2f010618aff6cf5d0209108aa47f2644fa065"
//             alt=""
//             className="object-contain w-6 h-6"
//           />
//         </button>
//       </div>

//       {/* Content */}
//       <div className="flex flex-col px-4 pb-4">
//         <div className="flex flex-col items-start">
//           {/* Icon */}
//           <div className="relative w-12 h-12">
//             <img
//               loading="lazy"
//               src={icon}
//               alt=""
//               className="object-cover absolute inset-0 w-full h-full"
//             />
//           </div>
//           {/* Count/Label */}
//           <div className="mt-4 text-2xl font-bold">{count}</div>
//           <div className="mt-1 text-sm leading-3">{label}</div>
//         </div>

//         {/* Chart Image */}
//         <img
//           loading="lazy"
//           src={chart}
//           alt={`${label} trend chart`}
//           className="object-contain mt-5 w-full h-auto"
//         />
//       </div>
//     </div>
//   );
// }

// export default StatCard;


// import * as React from "react";

// function StatCard({ icon, count, label, chart }) {
//   return (
//     <div
//       className="
//         flex flex-col 
//         w-full sm:w-1/2 md:w-1/3
//         p-4 sm:p-5 md:p-6

//         bg-white dark:bg-gray-800
//         text-gray-800 dark:text-gray-100
        
//         rounded-lg
//         shadow-sm sm:shadow-2xl md:shadow-lg
//         border border-red-500
//       "
//     >
//       {/* Top Right Button */}
//       <div className="flex justify-end">
//         <button
//           className="
//             flex items-center gap-2
//             text-sm sm:text-base md:text-lg
//             font-semibold
//             text-lime-600 dark:text-lime-400
//           "
//         >
//           <span>See Detail</span>
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/baea41120183e81adf765959b6f2f010618aff6cf5d0209108aa47f2644fa065"
//             alt=""
//             className="object-contain w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
//           />
//         </button>
//       </div>

//       {/* Content */}
//       <div className="flex flex-col pt-2">
//         {/* Icon and Text */}
//         <div className="flex flex-col items-start">
//           {/* Icon */}
//           <div className="relative w-12 h-12">
//             <img
//               loading="lazy"
//               src={icon}
//               alt=""
//               className="absolute inset-0 h-full w-full object-cover"
//             />
//           </div>

//           {/* Count / Label */}
//           <div className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold">
//             {count}
//           </div>
//           <div className="mt-1 text-xs sm:text-sm md:text-base leading-4">
//             {label}
//           </div>
//         </div>

//         {/* Chart Image */}
//         <img
//           loading="lazy"
//           src={chart}
//           alt={`${label} trend chart`}
//           className="mt-5 w-full h-auto object-contain"
//         />
//       </div>
//     </div>
//   );
// }

// export default StatCard;

// import * as React from "react";

// // StatCard component
// function StatCard({ icon, count, label, chart }) {
//   return (
//     <div
//       className="
//         relative
//         flex flex-col
//         w-full max-w-xs
//         p-4
//         rounded-xl
//         bg-white dark:bg-gray-800
//         text-gray-800 dark:text-gray-100
//         shadow-2xl
//         overflow-hidden
//       "
//     >
//       {/* Top Right Button */}
//       <div className="flex justify-end mb-2">
//         <button
//           className="
//             flex items-center gap-1
//             text-sm font-semibold
//             text-gray-400 hover:text-gray-600
//             dark:text-gray-300 dark:hover:text-gray-100
//           "
//         >
//           <span>See Detail</span>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="2"
//             stroke="currentColor"
//             className="w-4 h-4"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//           </svg>
//         </button>
//       </div>

//       {/* Icon + Stats */}
//       <div className="flex flex-col gap-2">
//         {/* Icon in a circular background */}
//         <div className="flex items-center">
//           <div
//             className="
//               flex items-center justify-center
//               w-10 h-10
//               rounded-full
//               bg-gray-100 dark:bg-gray-700
//             "
//           >
//             <img
//               src={icon}
//               alt=""
//               className="h-5 w-5 object-contain"
//               loading="lazy"
//             />
//           </div>
//         </div>

//         {/* Count / Label */}
//         <div className="mt-1">
//           <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
//             {count}
//           </div>
//           <div className="text-sm text-gray-500 dark:text-gray-300">
//             {label}
//           </div>
//         </div>
//       </div>

//       {/* Wave Image at the bottom */}
//       <img
//         src={chart}
//         alt={`${label} trend chart`}
//         className="
//           absolute
//           bottom-0 left-0
//           w-full h-auto
//         "
//         loading="lazy"
//       />
//     </div>
//   );
// }

// // statCardsData array
// const statCardsData = [
//   {
//     icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4d73cdb91a66ea3fe57762a829e650c6ddac8a4018288252468969730f1293ed?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290",
//     count: "650",
//     label: "Total Employees",
//     chart:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/a91cd45b-c76f-4c19-8f57-d0142fc9304c?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290",
//   },
//   {
//     icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/1a6a684a3b7d8ea2804693bc9ae5539df9e05bc49fc37d8c4d5ff26adc4525b9?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290",
//     count: "400",
//     label: "Users Logged In Today",
//     chart:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/14c3fe2b-6284-40fc-a837-4d939737641c?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290",
//   },
//   {
//     icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b47fe46d9188667abcd770764c34962f370e1d47c73d01b7bd82dd60b3368528?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290",
//     count: "10",
//     label: "Employees On Leave Today",
//     chart:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/bcc2ae50-6637-4179-8a2a-a3fceaca0d9f?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290",
//   },
// ];

// // Example usage component
// function DashboardStatCards() {
//   return (
//     <div className="flex flex-col gap-5 md:flex-row">
//       {statCardsData.map((item, index) => (
//         <StatCard key={index} {...item} />
//       ))}
//     </div>
//   );
// }

// // Export default so you can import this file directly
// export default DashboardStatCards;

// import * as React from "react";

// // 1. Reusable StatCard component
// function StatCard({ icon, count, label, chart }) {
//   return (
//     <div
//       className="
//         relative
//         flex flex-col
//         w-full max-w-lg
//         p-4
//         rounded-xl
//         bg-white dark:bg-gray-800
//         text-gray-800 dark:text-gray-100
//         shadow-2xl
        
//         overflow-hidden
//       "
//     >
//       {/* Top Right Button */}
//       <div className="flex justify-end mb-2">
//         <button
//           className="
//             flex items-center gap-1
//             text-sm font-semibold
//             text-gray-400 hover:text-gray-600
//             dark:text-gray-300 dark:hover:text-gray-100
//           "
//         >
//           <span>See Detail</span>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="2"
//             stroke="currentColor"
//             className="w-4 h-4"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M9 5l7 7-7 7"
//             />
//           </svg>
//         </button>
//       </div>

//       {/* Icon + Stats */}
//       <div className="flex flex-col gap-2">
//         {/* Icon in a circular background */}
//         <div className="flex items-center">
//           <div
//             className="
//               flex items-center justify-center
//               w-10 h-10
//               rounded-full
//               bg-gray-100 dark:bg-gray-700
//             "
//           >
//             <img
//               src={icon}
//               alt=""
//               className="h-5 w-5 object-contain"
//               loading="lazy"
//             />
//           </div>
//         </div>

//         {/* Count / Label */}
//         <div className="mt-1">
//           <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
//             {count}
//           </div>
//           <div className="text-sm text-gray-500 dark:text-gray-300">
//             {label}
//           </div>
//         </div>
//       </div>

//       {/* Wave Image at the bottom */}
//       <img
//         src={chart}
//         alt={`${label} trend chart`}
//         className="
    
//           w-full h-auto
//         "
//         loading="lazy"
//       />
//     </div>
//   );
// }

// // 2. Data array for the cards
// const statCardsData = [
//   {
//     icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4d73cdb91a66ea3fe57762a829e650c6ddac8a4018288252468969730f1293ed?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290",
//     count: "650",
//     label: "Total Employees",
//     chart:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/a91cd45b-c76f-4c19-8f57-d0142fc9304c?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290",
//   },
//   {
//     icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/1a6a684a3b7d8ea2804693bc9ae5539df9e05bc49fc37d8c4d5ff26adc4525b9?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290",
//     count: "400",
//     label: "Users Logged In Today",
//     chart:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/14c3fe2b-6284-40fc-a837-4d939737641c?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290",
//   },
//   {
//     icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b47fe46d9188667abcd770764c34962f370e1d47c73d01b7bd82dd60b3368528?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290",
//     count: "10",
//     label: "Employees On Leave Today",
//     chart:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/bcc2ae50-6637-4179-8a2a-a3fceaca0d9f?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290",
//   },
// ];

// // 3. Example usage in a DashboardStatCards component
// function DashboardStatCards() {
//   return (
//     <div className="flex flex-col gap-5 md:flex-row">
//       {statCardsData.map((item, index) => (
//         <StatCard key={index} {...item} />
//       ))}
//     </div>
//   );
// }

// // 4. Export the component so it can be used anywhere
// export default DashboardStatCards;


// src/components/DashboardStatCards.jsx

// import  { useEffect } from "react";
// import StatCard from "./StatCard";
// import {
//   useDashboardStore,
// } from "../../../store/useDashboardStore"; // your zustand store

// // If using a React Icon library (e.g. react-icons), import them here
// import { FaUsers, FaUserCheck, FaUserTimes } from "react-icons/fa";

// function DashboardStatCards() {
//   // 1. Pull everything we need from the store
//   const {
//     totalUsers,
//     usersLoggedInToday,
//     employeesOnLeaveToday,
//     fetchDashboardStats,
//     fetchAttendanceDetails,
//     fetchLeaveDetails,
//   } = useDashboardStore();

//   // 2. On mount, fetch stats
//   useEffect(() => {
//     fetchDashboardStats();
//   }, [fetchDashboardStats]);

//   // 3. Build the data for each StatCard. We no longer use dummy data.
//   const statCardsData = [
//     {
//       icon: <FaUsers className="text-blue-600" />, // or any icon
//       count: totalUsers,
//       label: "Total Employees",
//       chart: "https://cdn.builder.io/api/v1/image/assets/TEMP/a91cd45b-c76f-4c19-8f57-d0142fc9304c", // example chart image
//       onClickDetail: null, // No details function for total employees
//     },
//     {
//       icon: <FaUserCheck className="text-green-600" />,
//       count: usersLoggedInToday,
//       label: "Users Logged In Today",
//       chart: "https://cdn.builder.io/api/v1/image/assets/TEMP/14c3fe2b-6284-40fc-a837-4d939737641c",
//       onClickDetail: fetchAttendanceDetails, // calls store method
//     },
//     {
//       icon: <FaUserTimes className="text-red-600" />,
//       count: employeesOnLeaveToday,
//       label: "Employees On Leave Today",
//       chart: "https://cdn.builder.io/api/v1/image/assets/TEMP/bcc2ae50-6637-4179-8a2a-a3fceaca0d9f",
//       onClickDetail: fetchLeaveDetails, // calls store method
//     },
//   ];

//   // 4. Render the cards
//   return (
//     <div className="flex flex-col gap-5 md:flex-row">
//       {statCardsData.map((item, index) => (
//         <StatCard key={index} {...item} />
//       ))}
//     </div>
//   );
// }

// export default DashboardStatCards;

import  { useEffect } from "react";
import StatCard from "./StatCard";
import { useDashboardStore } from "../../../store/useDashboardStore";

// React Icons
import { FaUsers, FaUserCheck, FaUserTimes } from "react-icons/fa";

function DashboardStatCards() {
  const {
    totalUsers,
    usersLoggedInToday,
    employeesOnLeaveToday,
    fetchDashboardStats,
    fetchAttendanceDetails,
    fetchLeaveDetails,
  } = useDashboardStore();

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  // For demonstration, pretend these are valid URLs to 
  // your “light” and “dark” wave images with transparent background.
  // e.g. .png or .svg 
  const waveLightGreen = "https://cdn.builder.io/api/v1/image/assets/TEMP/a91cd45b-c76f-4c19-8f57-d0142fc9304c"
  const waveDarkGreen = "https://cdn.builder.io/api/v1/image/assets/TEMP/a91cd45b-c76f-4c19-8f57-d0142fc9304c"

  const waveLightYellow = "https://cdn.builder.io/api/v1/image/assets/TEMP/14c3fe2b-6284-40fc-a837-4d939737641c"
  const waveDarkYellow = "https://cdn.builder.io/api/v1/image/assets/TEMP/14c3fe2b-6284-40fc-a837-4d939737641c"

  const waveLightRed = "https://cdn.builder.io/api/v1/image/assets/TEMP/bcc2ae50-6637-4179-8a2a-a3fceaca0d9f"
  const waveDarkRed = "https://cdn.builder.io/api/v1/image/assets/TEMP/bcc2ae50-6637-4179-8a2a-a3fceaca0d9f"

  const statCardsData = [
    {
      icon: <FaUsers className="text-blue-600" />,
      count: totalUsers,
      label: "Total Employees",
      chartLight: waveLightGreen,  // Light version
      chartDark: waveDarkGreen,    // Dark version
      onClickDetail: null,
    },
    {
      icon: <FaUserCheck className="text-green-600" />,
      count: usersLoggedInToday,
      label: "Users Logged In Today",
      chartLight: waveLightYellow,
      chartDark: waveDarkYellow,
      onClickDetail: fetchAttendanceDetails,
    },
    {
      icon: <FaUserTimes className="text-red-600" />,
      count: employeesOnLeaveToday,
      label: "Employees On Leave Today",
      chartLight: waveLightRed,
      chartDark: waveDarkRed,
      onClickDetail: fetchLeaveDetails,
    },
  ];

  return (
    <div className="flex flex-col gap-5 md:flex-row">
      {statCardsData.map((item, index) => (
        <StatCard key={index} {...item} />
      ))}
    </div>
  );
}

export default DashboardStatCards;


