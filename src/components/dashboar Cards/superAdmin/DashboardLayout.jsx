// import * as React from "react";
// import StatCard from "./StatCard";
// import PerformanceChart from "./PerformanceChart";
// import DemographicCard from "./DemographicCard";
// import AttendanceCard from "./AttendanceCard";
// import AnnouncementCard from "./AnnouncementCard";
// import EmployeeStatusChart from "./EmployeeStatusChart";
// import DepartmentChart from "./DepartmentChart";
// import MonthlyHiringChart from "./MonthlyHiringChart";
// import RaciOperationsChart from "./RaciOperationsChart";
// import WhoIsInCard from "./WhoIsInCard";
// import Heading from "./Heading";

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

// function DashboardLayout() {
//   return (
//     <div className="flex w-full flex-col p-3.5 bg-white    ">

//       <main className="flex  flex-wrap gap-7 mt-1.5 w-full ">
//               <Heading />
//         <div className="flex-auto self-end mt-5 max-md:mt-10 max-md:max-w-full">
//           <div className="flex gap-5 max-md:flex-col">
//             <div className="flex flex-col w-[70%] max-md:ml-0 max-md:w-full">
//               <div className="flex flex-col w-full max-md:mt-3.5 max-md:max-w-full">
//                 <div className="max-md:mr-1.5 max-md:max-w-full">
//                   <div className="flex gap-5 max-md:flex-col rounded-lg">
//                     {statCardsData.map((card, index) => (
//                       <StatCard key={index} {...card} />
//                     ))}
//                   </div>
//                 </div>

//                 <div className="mt-14 max-md:mt-10 max-md:max-w-full
// ">
//                   <div className="flex gap-5 max-md:flex-col ">
//                     <EmployeeStatusChart />
//                     <DepartmentChart />
//                   </div>
//                 </div>

//                 <div className="mt-7 max-md:max-w-full">
//                   <div className="flex gap-5 max-md:flex-col">
//                     <WhoIsInCard />
//                     <PerformanceChart />
//                   </div>
//                 </div>

//                 <MonthlyHiringChart />
//                 <RaciOperationsChart />

//                 <div className="flex flex-col items-center px-4 pt-4 pb-28 mt-12 ml-3.5 max-w-full text-lg font-semibold text-lime-600 bg-white rounded-2xl shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)] w-[434px] max-md:pb-24 max-md:mt-10">
//                   <div className="self-start ml-3.5 max-md:ml-2.5">
//                     ADD Dashlets
//                   </div>
//                   <div className="flex shrink-0 mt-3 h-px rounded-md bg-zinc-200 shadow-[4px_4px_10px_rgba(0,0,0,0.12)]" />
//                   <img
//                     loading="lazy"
//                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b8216147e226d6bf40672622c22aee63b73c3a9d4e3baa8eb128c3cd21b8e9b?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
//                     alt="Add dashlet illustration"
//                     className="object-contain self-center mt-16 mb-0 max-w-full aspect-square w-[154px] max-md:mt-10 max-md:mb-2.5"
//                   />
//                 </div>
//               </div>
//             </div>

//             <aside className="flex flex-col ml-5 w-[30%] max-md:ml-0 max-md:w-full">
//               <div className="flex flex-col mt-2 max-md:mt-5">
//                 <DemographicCard />
//                 <AttendanceCard />
//                 <AnnouncementCard />
//                 <div className="shrink-0 mx-6 max-w-full h-px border border-solid border-zinc-300 w-[350px] max-md:mx-2.5" />
//               </div>
//             </aside>
//           </div>
//         </div>
//       </main>

//       <div className="flex w-full min-h-[101px] max-md:max-w-full" />
//     </div>
//   );
// }

// export default DashboardLayout;

// import * as React from "react";
// import StatCard from "./StatCard";
// import PerformanceChart from "./PerformanceChart";
// import DemographicCard from "./DemographicCard";
// import AttendanceCard from "./AttendanceCard";
// import AnnouncementCard from "./AnnouncementCard";
// import EmployeeStatusChart from "./EmployeeStatusChart";
// import DepartmentChart from "./DepartmentChart";
// import MonthlyHiringChart from "./MonthlyHiringChart";
// import RaciOperationsChart from "./RaciOperationsChart";
// import WhoIsInCard from "./WhoIsInCard";
// import Heading from "./Heading";

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

// function DashboardLayout() {
//   return (
//     <div className="flex w-full flex-col p-3.5 bg-white">
//       <main className="flex flex-wrap gap-7 mt-1.5 w-full">
//         <Heading />
//         {/* Main Content Container */}
//         <div className="flex-auto self-end mt-5 max-md:mt-10 max-md:max-w-full">
//           <div className="flex gap-5 max-md:flex-col">
//             {/* Left Column */}
//             <div className="flex flex-col md:w-2/3 w-full">
//               {/* Stat Cards */}
//               <div className="flex flex-col w-full max-md:mt-3.5">
//                 <div className="max-md:mr-1.5 w-full">
//                   <div className="flex gap-5 max-md:flex-col rounded-lg w-full">
//                     {statCardsData.map((card, index) => (
//                       <StatCard key={index} {...card} />
//                     ))}
//                   </div>
//                 </div>

//                 {/* Employee/Department Charts */}
//                 <div className="mt-14 max-md:mt-10 w-full">
//                   <div className="flex gap-5 max-md:flex-col w-full">
//                     <EmployeeStatusChart />
//                     <DepartmentChart />
//                   </div>
//                 </div>

//                 {/* Who Is In + Performance */}
//                 <div className="mt-7 w-full">
//                   <div className="flex gap-5 max-md:flex-col w-full">
//                     <WhoIsInCard />
//                     <PerformanceChart />
//                   </div>
//                 </div>

//                 {/* Additional Charts */}
//                 <MonthlyHiringChart />
//                 <RaciOperationsChart />

//                 {/* Dashlets Section */}
//                 <div className="flex flex-col items-center px-4 pt-4 pb-28 mt-12 ml-3.5 bg-white
//                                 rounded-2xl shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)]
//                                 text-lg font-semibold text-lime-600
//                                 w-full md:w-[434px] max-w-full max-md:pb-24 max-md:mt-10">
//                   <div className="self-start ml-3.5 max-md:ml-2.5">ADD Dashlets</div>
//                   <div className="flex shrink-0 mt-3 h-px w-full rounded-md bg-zinc-200 shadow-[4px_4px_10px_rgba(0,0,0,0.12)]" />
//                   <img
//                     loading="lazy"
//                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b8216147e226d6bf40672622c22aee63b73c3a9d4e3baa8eb128c3cd21b8e9b?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
//                     alt="Add dashlet illustration"
//                     className="object-contain self-center mt-16 mb-0 max-w-full h-auto aspect-square w-[154px] max-md:mt-10 max-md:mb-2.5"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Right Column (Sidebar) */}
//             <aside className="flex flex-col md:w-1/3 w-full max-md:mt-5">
//               <DemographicCard />
//               <AttendanceCard />
//               <AnnouncementCard />
//               <div className="shrink-0 mx-6 w-full md:w-[350px] max-w-full h-px border border-solid border-zinc-300 max-md:mx-2.5" />
//             </aside>
//           </div>
//         </div>
//       </main>

//       {/* Footer spacing or other content */}
//       <div className="flex w-full min-h-[101px] max-md:max-w-full" />
//     </div>
//   );
// }

// export default DashboardLayout;

// import * as React from "react";
// import StatCard from "./StatCard";
// import PerformanceChart from "./PerformanceChart";
// import DemographicCard from "./DemographicCard";
// import AttendanceCard from "./AttendanceCard";
// import AnnouncementCard from "./AnnouncementCard";
// import EmployeeStatusChart from "./EmployeeStatusChart";
// import DepartmentChart from "./DepartmentChart";
// import MonthlyHiringChart from "./MonthlyHiringChart";
// import RaciOperationsChart from "./RaciOperationsChart";
// import WhoIsInCard from "./WhoIsInCard";
// import Heading from "./Heading";

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

// function DashboardLayout() {
//   return (
//     <div className="flex w-full flex-col bg-white dark:bg-[#121212] p-3.5">
//       <main className="mt-1.5 flex w-full flex-wrap gap-7">
//         <Heading />

//         {/* Main Content Container */}
//         <div className="mt-5 flex-auto self-end md:mt-0 md:max-w-full">
//           {/* Outer Columns: becomes column on small, row at md */}
//           <div className="flex flex-col gap-5 md:flex-row">
//             {/* Left Column */}
//             <div className="flex w-full flex-col md:w-2/3">
//               {/* Stat Cards */}
//               <div className="mt-3.5 w-full md:mt-0">
//                 <div className="w-full">
//                   <div className="flex w-full gap-5 flex-col md:flex-row rounded-lg">
//                     {statCardsData.map((card, index) => (
//                       <StatCard key={index} {...card} />
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Employee/Department Charts */}
//               <div className="mt-10 w-full md:mt-14">
//                 <div className="flex w-full flex-col gap-5 md:flex-row">
//                   <EmployeeStatusChart />
//                   <DepartmentChart />
//                 </div>
//               </div>

//               {/* Who Is In + Performance */}
//               <div className="mt-7 w-full">
//                 <div className="flex w-full flex-col gap-5 md:flex-row">
//                   <WhoIsInCard />
//                   <PerformanceChart />
//                 </div>
//               </div>

//               {/* Additional Charts */}
//               <MonthlyHiringChart />
//               <RaciOperationsChart />

//               {/* Dashlets Section */}
//               <div
//                 className="mt-10 ml-0 md:ml-3.5 flex w-full flex-col items-center
//                            rounded-2xl bg-white px-4 pt-4 pb-24
//                            text-lg font-semibold text-lime-600
//                            shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)]
//                            md:mt-12 md:w-[434px]"
//               >
//                 <div className="self-start ml-2.5 md:ml-3.5">ADD Dashlets</div>
//                 <div className="mt-3 h-px w-full shrink-0 rounded-md bg-zinc-200 shadow-[4px_4px_10px_rgba(0,0,0,0.12)]" />
//                 <img
//                   loading="lazy"
//                   src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b8216147e226d6bf40672622c22aee63b73c3a9d4e3baa8eb128c3cd21b8e9b?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
//                   alt="Add dashlet illustration"
//                   className="mt-10 mb-2.5 h-auto w-[154px] aspect-square max-w-full object-contain
//                              md:mt-16 md:mb-0"
//                 />
//               </div>
//             </div>

//             {/* Right Column (Sidebar) */}
//             <aside className="mt-5 flex w-full flex-col md:mt-0 md:w-1/3">
//               <DemographicCard />
//               <AttendanceCard />
//               <AnnouncementCard />
//               <div className="mx-2.5 my-4 h-px w-full shrink-0 border border-solid border-zinc-300 md:mx-6 md:w-[350px]" />
//             </aside>
//           </div>
//         </div>
//       </main>

//       {/* Footer spacing or other content */}
//       <div className="flex w-full min-h-[101px]" />
//       <h1>New Grid</h1>

//     </div>
//   );
// }

// export default DashboardLayout;

// import * as React from "react";
// import DashboardStatCards from "./DashboardStatCards";
// import PerformanceChart from "./PerformanceChart";
// import DemographicCard from "./DemographicCard";
// import AttendanceCard from "./AttendanceCard";
// import AnnouncementCard from "./AnnouncementCard";
// import EmployeeStatusChart from "./EmployeeStatusChart";
// import DepartmentChart from "./DepartmentChart";
// import MonthlyHiringChart from "./MonthlyHiringChart";
// import RaciOperationsChart from "./RaciOperationsChart";
// import WhoIsInCard from "./WhoIsInCard";
// import Heading from "./Heading";

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

// function DashboardLayout() {
//   return (
//     <div className="flex w-full flex-col bg-white dark:bg-[#121212] p-3.5">
//       <main className="mt-1.5 flex w-full flex-wrap gap-7">
//         <Heading />

//         {/* Main Content Container */}
//         <div className="mt-5 flex-auto self-end md:mt-0 md:max-w-full">
//           {/* Outer Columns: becomes column on small, row at md */}
//           <div className="flex flex-col gap-5 md:flex-row">
//             {/* Left Column */}
//             <div className="flex w-full flex-col md:w-2/3">
//               {/* Stat Cards */}
//               <div className="mt-3.5 w-full md:mt-0">
//                 <div className="w-full">
//                   <div className="flex w-full flex-col gap-5 rounded-lg md:flex-row">
//               <DashboardStatCards />
//                   </div>
//                 </div>
//               </div>

//               {/* Employee/Department Charts */}
//               <div className="mt-10 w-full md:mt-14">
//                 <div className="flex w-full flex-col gap-5 md:flex-row">
//                   <EmployeeStatusChart />
//                   <DepartmentChart />
//                 </div>
//               </div>

//               {/* Who Is In + Performance */}
//               <div className="mt-7 w-full">
//                 <div className="flex w-full flex-col gap-5 md:flex-row">
//                   <WhoIsInCard />
//                   <PerformanceChart />
//                 </div>
//               </div>

//               {/* Additional Charts */}
//               <MonthlyHiringChart />
//               <RaciOperationsChart />

//               {/* Dashlets Section */}
//               <div
//                 className="mt-10 ml-0 flex w-full flex-col items-center rounded-2xl bg-white
//                            px-4 pt-4 pb-24 text-lg font-semibold text-lime-600
//                            shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)]
//                            md:mt-12 md:ml-3.5 md:w-[434px]"
//               >
//                 <div className="self-start ml-2.5 md:ml-3.5">ADD Dashlets</div>
//                 <div className="mt-3 h-px w-full shrink-0 rounded-md bg-zinc-200 shadow-[4px_4px_10px_rgba(0,0,0,0.12)]" />
//                 <img
//                   loading="lazy"
//                   src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b8216147e226d6bf40672622c22aee63b73c3a9d4e3baa8eb128c3cd21b8e9b?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
//                   alt="Add dashlet illustration"
//                   className="mt-10 mb-2.5 h-auto w-[154px] max-w-full aspect-square object-contain
//                              md:mt-16 md:mb-0"
//                 />
//               </div>
//             </div>

//             {/* Right Column (Sidebar) */}
//             <aside className="mt-5 flex w-full flex-col md:mt-0 md:w-1/3">
//               <DemographicCard />
//               <AttendanceCard />
//               <AnnouncementCard />
//               <div className="mx-2.5 my-4 h-px w-full shrink-0 border border-solid border-zinc-300 md:mx-6 md:w-[350px]" />
//             </aside>
//           </div>
//         </div>
//       </main>

//       {/* Footer spacing or other content */}
//       <div className="flex w-full min-h-[101px]" />
//       <h1>New Grid</h1>
//     </div>
//   );
// }

// export default DashboardLayout;

import React from "react";

// Import all your individual components
import Heading from "./Heading"; // The big banner at the top
import DashboardStatCards from "./DashboardStatCards"; // 3 stat cards (Total Employees, etc.)
import EmployeeStatusChart from "./EmployeeStatusChart";
import DepartmentChart from "./DepartmentChart";
import WhoIsInCard from "./WhoIsInCard";
import PerformanceChart from "./PerformanceChart";
import MonthlyHiringChart from "./MonthlyHiringChart";
import RaciOperationsChart from "./RaciOperationsChart";
import DemographicCard from "./DemographicCard";
import AttendanceCard from "./AttendanceCard";
import AnnouncementCard from "./AnnouncementCard";

function DashboardLayout() {
  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-[#121212] pt-2 ">
      {/* 1) Top Banner */}

      {/* 2) Main Dashboard Content */}
      <main className="mt-5 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 ">
        <div className="mb-7 ">
          <Heading />
        </div>
        <div className="flex flex-col md:flex-row    justify-around  ">
          {/* Left Column */}
          <div className="flex flex-col w-full md:w-2/3 gap-7 ">
            {/* Row: Stat Cards */}
            <DashboardStatCards />

            {/* Row: Employee Status + Department */}
            <div className="flex flex-col md:flex-row gap-7">
              <EmployeeStatusChart />
              <DepartmentChart />
            </div>

            {/* Row: WhoIsInCard + Performance */}
            <div className="flex flex-col md:flex-row gap-7">
              <WhoIsInCard />
              <PerformanceChart />
            </div>

            {/* Monthly Hiring Chart */}
            <MonthlyHiringChart />

            {/* RACI Operations Chart */}
            <RaciOperationsChart />
          </div>

          {/* Right Column (Sidebar) */}
          <aside className="flex flex-col w-full md:w-1/4   items-center">
            <DemographicCard />
            <AttendanceCard />
            <AnnouncementCard />
          </aside>
        </div>
      </main>

      {/* Bottom padding, or a footer if desired */}
      <div className="h-10" />
    </div>
  );
}

export default DashboardLayout;
