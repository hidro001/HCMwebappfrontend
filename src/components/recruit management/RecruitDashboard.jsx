// import React from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register needed Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const RecruitDashboard = () => {
//   // Sample data for the bar chart
//   const topHiringData = {
//     labels: ["01/09", "02/09", "03/09", "04/09", "05/09", "06/09", "07/09"],
//     datasets: [
//       {
//         label: "Referral",
//         data: [25, 60, 15, 40, 30, 55, 10],
//         backgroundColor: "#9B59B6", // Purple
//       },
//       {
//         label: "Indeed",
//         data: [10, 20, 50, 25, 45, 20, 15],
//         backgroundColor: "#2ECC71", // Green
//       },
//       {
//         label: "LinkedIn",
//         data: [40, 30, 35, 55, 70, 65, 35],
//         backgroundColor: "#F39C12", // Orange
//       },
//     ],
//   };

//   // Chart display options
//   const topHiringOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       x: {
//         beginAtZero: true,
//       },
//       y: {
//         beginAtZero: true,
//         max: 100,
//       },
//     },
//     plugins: {
//       legend: {
//         position: "bottom",
//       },
//     },
//   };

//   // Mock data for vacancies table
//   const vacancies = [
//     { title: "UX Designer", location: "Dayton", applicants: 122, newApplicants: 33 },
//     { title: "iOS App Developer", location: "Remote", applicants: 34, newApplicants: 5 },
//     { title: "Network Administrator", location: "Phoenix", applicants: 45, newApplicants: 13 },
//     { title: "JavaScript Developer", location: "Remote", applicants: 57, newApplicants: 5 },
//     { title: "Graphic Designer", location: "Gothenburg", applicants: 74, newApplicants: 22 },
//     { title: "Python Django Developer", location: "Remote", applicants: 44, newApplicants: 12 },
//   ];

//   // Departments data
//   const departments = [
//     { name: "Development", newCount: 2, color: "bg-purple-100 dark:bg-purple-900" },
//     { name: "Sales & Marketing", newCount: 2, color: "bg-yellow-100 dark:bg-yellow-900" },
//     { name: "Project Management", newCount: 2, color: "bg-green-100 dark:bg-green-900" },
//     { name: "Analytics & Data", newCount: 0, color: "bg-blue-100 dark:bg-blue-900" },
//     { name: "Finance", newCount: 0, color: "bg-pink-100 dark:bg-pink-900" },
//   ];

//   return (
//     <div className="min-h-screen bg-[#F8F9FD] text-gray-800 p-6 dark:bg-gray-900 dark:text-gray-100">
//       {/* Page Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold">Recruitment Dashboard</h1>
//       </div>

//       {/* Top Stats (pastel boxes) */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         {/* Open Positions */}
//         <div className="rounded-lg p-4 shadow-md bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200">
//           <div className="text-3xl font-bold">79</div>
//           <div className="text-sm">Open Positions</div>
//         </div>

//         {/* Applicants */}
//         <div className="rounded-lg p-4 shadow-md bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
//           <div className="text-3xl font-bold">160</div>
//           <div className="text-sm">Applicants</div>
//         </div>

//         {/* Outstanding Offers */}
//         <div className="rounded-lg p-4 shadow-md bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
//           <div className="text-3xl font-bold">7</div>
//           <div className="text-sm">Outstanding Offers</div>
//         </div>

//         {/* Onboarding */}
//         <div className="rounded-lg p-4 shadow-md bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
//           <div className="text-3xl font-bold">18</div>
//           <div className="text-sm">Onboarding</div>
//         </div>
//       </div>

//       {/* Main Content Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left 2/3: Chart + Table */}
//         <div className="col-span-2 space-y-6">
//           {/* Top Hiring Sources: Chart */}
//           <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold">Top Hiring Sources</h2>
//               <span className="text-sm text-gray-500 dark:text-gray-400">Nov. 01 ‐ 07</span>
//             </div>
//             <div className="h-72">
//               <Bar data={topHiringData} options={topHiringOptions} />
//             </div>
//           </div>

//           {/* Recent Vacancies Table */}
//           <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
//             <div className="flex items-center justify-between mb-3">
//               <h2 className="text-lg font-semibold">Recent Vacancies</h2>
//               <button className="text-sm font-medium text-blue-600 dark:text-blue-400">
//                 All Vacancies
//               </button>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm">
//                 <thead>
//                   <tr className="text-left border-b border-gray-200 dark:border-gray-700">
//                     <th className="py-2 font-semibold text-gray-600 dark:text-gray-300">Job Title</th>
//                     <th className="py-2 font-semibold text-gray-600 dark:text-gray-300">Location</th>
//                     <th className="py-2 font-semibold text-gray-600 dark:text-gray-300">Applicants</th>
//                     <th className="py-2 font-semibold text-gray-600 dark:text-gray-300">Trend</th>
//                     <th className="py-2"></th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {vacancies.map((vac, idx) => (
//                     <tr
//                       key={idx}
//                       className="border-b border-gray-200 last:border-0 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
//                     >
//                       <td className="py-2 font-medium">{vac.title}</td>
//                       <td className="py-2">{vac.location}</td>
//                       <td className="py-2">
//                         {vac.applicants}
//                         <span className="ml-2 text-xs text-green-600 dark:text-green-400">
//                           {vac.newApplicants} new
//                         </span>
//                       </td>
//                       {/* Trend placeholder bar */}
//                       <td className="py-2">
//                         <div className="w-24 h-3 bg-gray-300 dark:bg-gray-600 rounded-full">
//                           {/* Example 'progress' bar inside */}
//                           <div
//                             className="h-3 bg-gray-600 dark:bg-gray-300 rounded-full"
//                             style={{ width: "60%" }}
//                           />
//                         </div>
//                       </td>
//                       <td className="py-2 text-right">
//                         <button
//                           className="px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
//                           title="More actions"
//                         >
//                           •••
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         {/* Right 1/3: Departments */}
//         <div className="space-y-6">
//           <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
//             <div className="flex items-center justify-between mb-2">
//               <h2 className="text-lg font-semibold">Departments</h2>
//               <span className="text-sm text-gray-500 dark:text-gray-400">Sep. 01 ‐ 07</span>
//             </div>
//             <div className="space-y-2">
//               {departments.map((dept, i) => (
//                 <div
//                   key={i}
//                   className={`flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${dept.color}`}
//                 >
//                   <div className="flex items-center space-x-2">
//                     {/* The small color indicator (could also be done via a ring, etc.) */}
//                     <span>{dept.name}</span>
//                   </div>
//                   {dept.newCount > 0 && (
//                     <span className="text-xs text-green-600 dark:text-green-400">
//                       +{dept.newCount} new
//                     </span>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecruitDashboard;

// import React from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const RecruitDashboard = () => {
//   // Sample data for the bar chart
//   const topHiringData = {
//     labels: ["01/09", "02/09", "03/09", "04/09", "05/09", "06/09", "07/09"],
//     datasets: [
//       {
//         label: "Referral",
//         data: [25, 60, 15, 40, 30, 55, 10],
//         backgroundColor: "#8B5CF6", // Purple-ish
//       },
//       {
//         label: "Indeed",
//         data: [10, 20, 50, 25, 45, 20, 15],
//         backgroundColor: "#22C55E", // Green
//       },
//       {
//         label: "LinkedIn",
//         data: [40, 30, 35, 55, 70, 65, 35],
//         backgroundColor: "#F59E0B", // Orange
//       },
//     ],
//   };

//   // Chart display options
//   const topHiringOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       x: { beginAtZero: true, grid: { display: false } },
//       y: { beginAtZero: true, max: 100 },
//     },
//     plugins: {
//       legend: {
//         position: "bottom",
//       },
//     },
//   };

//   const vacancies = [
//     { title: "UX Designer", location: "Dayton", applicants: 122, newApplicants: 33 },
//     { title: "iOS App Developer", location: "Remote", applicants: 34, newApplicants: 5 },
//     { title: "Network Administrator", location: "Phoenix", applicants: 45, newApplicants: 13 },
//     { title: "JavaScript Developer", location: "Remote", applicants: 57, newApplicants: 5 },
//     { title: "Graphic Designer", location: "Gothenburg", applicants: 74, newApplicants: 22 },
//     { title: "Python Django Developer", location: "Remote", applicants: 44, newApplicants: 12 },
//   ];

//   const departments = [
//     { name: "Development", newCount: 2 },
//     { name: "Sales & Marketing", newCount: 2 },
//     { name: "Project Management", newCount: 2 },
//     { name: "Analytics & Data", newCount: 0 },
//     { name: "Finance", newCount: 0 },
//   ];

//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Recruitment Dashboard</h1>
     
//       </div>

//       {/* First row: 4 stat cards (2×2) + Chart */}
//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
//         {/* Left side: 2 columns for cards */}
//         <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Card 1 */}
//           <div className="flex items-center p-4 rounded-lg shadow bg-green-50 dark:bg-green-900">
//             <div className="w-1 h-12 bg-green-500 mr-4 rounded" />
//             <div>
//               <div className="text-2xl font-bold text-green-600 dark:text-green-200">79</div>
//               <div className="text-sm text-gray-600 dark:text-gray-300">Open Positions</div>
//             </div>
//           </div>

//           {/* Card 2 */}
//           <div className="flex items-center p-4 rounded-lg shadow bg-yellow-50 dark:bg-yellow-900">
//             <div className="w-1 h-12 bg-yellow-500 mr-4 rounded" />
//             <div>
//               <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-200">160</div>
//               <div className="text-sm text-gray-600 dark:text-gray-300">Applicants</div>
//             </div>
//           </div>

//           {/* Card 3 */}
//           <div className="flex items-center p-4 rounded-lg shadow bg-blue-50 dark:bg-blue-900">
//             <div className="w-1 h-12 bg-blue-500 mr-4 rounded" />
//             <div>
//               <div className="text-2xl font-bold text-blue-600 dark:text-blue-200">7</div>
//               <div className="text-sm text-gray-600 dark:text-gray-300">Outstanding Offers</div>
//             </div>
//           </div>

//           {/* Card 4 */}
//           <div className="flex items-center p-4 rounded-lg shadow bg-purple-50 dark:bg-purple-900">
//             <div className="w-1 h-12 bg-purple-500 mr-4 rounded" />
//             <div>
//               <div className="text-2xl font-bold text-purple-600 dark:text-purple-200">18</div>
//               <div className="text-sm text-gray-600 dark:text-gray-300">Onboarding</div>
//             </div>
//           </div>
//         </div>

//         {/* Right side: Chart */}
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
//           <div className="flex items-center justify-between mb-2">
//             <h2 className="font-semibold">Top Hiring Sources</h2>
//             <span className="text-sm text-gray-500 dark:text-gray-400">Nov. 01 – 07</span>
//           </div>
//           <div className="h-64">
//             <Bar data={topHiringData} options={topHiringOptions} />
//           </div>
//         </div>
//       </div>

//       {/* Second row: Recent Vacancies (left) + Departments (right) */}
//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
//         {/* Recent Vacancies: span 2 columns */}
//         <div className="col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
//           <div className="flex items-center justify-between mb-3">
//             <h2 className="text-lg font-semibold">Recent Vacancies</h2>
//             <button className="text-sm font-medium text-blue-600 dark:text-blue-400">
//               All Vacancies
//             </button>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left border-b border-gray-200 dark:border-gray-700">
//                   <th className="py-2 font-semibold text-gray-600 dark:text-gray-300">Job Title</th>
//                   <th className="py-2 font-semibold text-gray-600 dark:text-gray-300">Location</th>
//                   <th className="py-2 font-semibold text-gray-600 dark:text-gray-300">Applicants</th>
//                   <th className="py-2 font-semibold text-gray-600 dark:text-gray-300">Trend</th>
//                   <th className="py-2"></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {vacancies.map((vac, idx) => (
//                   <tr
//                     key={idx}
//                     className="border-b border-gray-200 last:border-0 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
//                   >
//                     <td className="py-2 font-medium">{vac.title}</td>
//                     <td className="py-2">{vac.location}</td>
//                     <td className="py-2">
//                       {vac.applicants}
//                       <span className="ml-2 text-xs text-green-600 dark:text-green-400">
//                         {vac.newApplicants} new
//                       </span>
//                     </td>
//                     <td className="py-2">
//                       {/* Trend placeholder bar */}
//                       <div className="w-24 h-3 bg-gray-300 dark:bg-gray-600 rounded-full">
//                         <div
//                           className="h-3 bg-gray-600 dark:bg-gray-300 rounded-full"
//                           style={{ width: "60%" }}
//                         />
//                       </div>
//                     </td>
//                     <td className="py-2 text-right">
//                       <button
//                         className="px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
//                         title="More actions"
//                       >
//                         •••
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Departments */}
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
//           <div className="flex items-center justify-between mb-2">
//             <h2 className="font-semibold">Departments</h2>
//             <span className="text-sm text-gray-500 dark:text-gray-400">Sep. 01 – 07</span>
//           </div>
//           <div className="space-y-2">
//             {departments.map((dept, i) => (
//               <div
//                 key={i}
//                 className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
//               >
//                 <span>{dept.name}</span>
//                 {dept.newCount > 0 && (
//                   <span className="text-xs text-green-600 dark:text-green-400">
//                     +{dept.newCount} new
//                   </span>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecruitDashboard;

// import React from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const RecruitDashboard = () => {
//   // Sample data for the bar chart
//   const topHiringData = {
//     labels: ["01/09", "02/09", "03/09", "04/09", "05/09", "06/09", "07/09"],
//     datasets: [
//       {
//         label: "Referral",
//         data: [25, 60, 15, 40, 30, 55, 10],
//         backgroundColor: "#8B5CF6", // Purple-ish
//       },
//       {
//         label: "Indeed",
//         data: [10, 20, 50, 25, 45, 20, 15],
//         backgroundColor: "#22C55E", // Green
//       },
//       {
//         label: "LinkedIn",
//         data: [40, 30, 35, 55, 70, 65, 35],
//         backgroundColor: "#F59E0B", // Orange
//       },
//     ],
//   };

//   // Chart display options
//   const topHiringOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       x: { beginAtZero: true, grid: { display: false } },
//       y: { beginAtZero: true, max: 100 },
//     },
//     plugins: {
//       legend: {
//         position: "bottom",
//       },
//     },
//   };

//   const vacancies = [
//     { title: "UX Designer", location: "Dayton", applicants: 122, newApplicants: 33 },
//     { title: "iOS App Developer", location: "Remote", applicants: 34, newApplicants: 5 },
//     { title: "Network Administrator", location: "Phoenix", applicants: 45, newApplicants: 13 },
//     { title: "JavaScript Developer", location: "Remote", applicants: 57, newApplicants: 5 },
//     { title: "Graphic Designer", location: "Gothenburg", applicants: 74, newApplicants: 22 },
//     { title: "Python Django Developer", location: "Remote", applicants: 44, newApplicants: 12 },
//   ];

//   const departments = [
//     { name: "Development", newCount: 2 },
//     { name: "Sales & Marketing", newCount: 2 },
//     { name: "Project Management", newCount: 2 },
//     { name: "Analytics & Data", newCount: 0 },
//     { name: "Finance", newCount: 0 },
//   ];

//   // Define pastel background/text/pill styles for each department
//   const colorStyles = {
//     Development: {
//       bg: "bg-purple-50",
//       text: "text-purple-800",
//       pill: "bg-purple-500 text-white",
//     },
//     "Sales & Marketing": {
//       bg: "bg-orange-50",
//       text: "text-orange-800",
//       pill: "bg-green-500 text-white",
//     },
//     "Project Management": {
//       bg: "bg-green-50",
//       text: "text-green-800",
//       pill: "bg-blue-500 text-white",
//     },
//     "Analytics & Data": {
//       bg: "bg-blue-50",
//       text: "text-blue-800",
//       pill: "bg-gray-500 text-white",
//     },
//     Finance: {
//       bg: "bg-pink-50",
//       text: "text-pink-800",
//       pill: "bg-pink-500 text-white",
//     },
//   };

//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Recruitment Dashboard</h1>
//       </div>

//       {/* First row: 4 stat cards + Chart */}
//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
//         {/* Left side: stat cards (2 cols) */}
//         <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Card 1 */}
//           <div className="flex items-center p-4 rounded-lg shadow bg-green-50 dark:bg-green-900">
//             <div className="w-1 h-12 bg-green-500 mr-4 rounded" />
//             <div>
//               <div className="text-2xl font-bold text-green-600 dark:text-green-200">79</div>
//               <div className="text-sm text-gray-600 dark:text-gray-300">Open Positions</div>
//             </div>
//           </div>

//           {/* Card 2 */}
//           <div className="flex items-center p-4 rounded-lg shadow bg-yellow-50 dark:bg-yellow-900">
//             <div className="w-1 h-12 bg-yellow-500 mr-4 rounded" />
//             <div>
//               <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-200">160</div>
//               <div className="text-sm text-gray-600 dark:text-gray-300">Applicants</div>
//             </div>
//           </div>

//           {/* Card 3 */}
//           <div className="flex items-center p-4 rounded-lg shadow bg-blue-50 dark:bg-blue-900">
//             <div className="w-1 h-12 bg-blue-500 mr-4 rounded" />
//             <div>
//               <div className="text-2xl font-bold text-blue-600 dark:text-blue-200">7</div>
//               <div className="text-sm text-gray-600 dark:text-gray-300">Outstanding Offers</div>
//             </div>
//           </div>

//           {/* Card 4 */}
//           <div className="flex items-center p-4 rounded-lg shadow bg-purple-50 dark:bg-purple-900">
//             <div className="w-1 h-12 bg-purple-500 mr-4 rounded" />
//             <div>
//               <div className="text-2xl font-bold text-purple-600 dark:text-purple-200">18</div>
//               <div className="text-sm text-gray-600 dark:text-gray-300">Onboarding</div>
//             </div>
//           </div>
//         </div>

//         {/* Right side: Chart */}
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
//           <div className="flex items-center justify-between mb-2">
//             <h2 className="font-semibold">Top Hiring Sources</h2>
//             <span className="text-sm text-gray-500 dark:text-gray-400">Nov. 01 – 07</span>
//           </div>
//           <div className="h-64">
//             <Bar data={topHiringData} options={topHiringOptions} />
//           </div>
//         </div>
//       </div>

//       {/* Second row: Recent Vacancies (left) + Departments (right) */}
//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
//         {/* Recent Vacancies: span 2 columns */}
//         <div className="col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
//           <div className="flex items-center justify-between mb-3">
//             <h2 className="text-lg font-semibold">Recent Vacancies</h2>
//             <button className="text-sm font-medium text-blue-600 dark:text-blue-400">
//               All Vacancies
//             </button>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left border-b border-gray-200 dark:border-gray-700">
//                   <th className="py-2 font-semibold text-gray-600 dark:text-gray-300">Job Title</th>
//                   <th className="py-2 font-semibold text-gray-600 dark:text-gray-300">Location</th>
//                   <th className="py-2 font-semibold text-gray-600 dark:text-gray-300">Applicants</th>
//                   <th className="py-2 font-semibold text-gray-600 dark:text-gray-300">Trend</th>
//                   <th className="py-2"></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {vacancies.map((vac, idx) => (
//                   <tr
//                     key={idx}
//                     className="border-b border-gray-200 last:border-0 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
//                   >
//                     <td className="py-2 font-medium">{vac.title}</td>
//                     <td className="py-2">{vac.location}</td>
//                     <td className="py-2">
//                       {vac.applicants}
//                       <span className="ml-2 text-xs text-green-600 dark:text-green-400">
//                         {vac.newApplicants} new
//                       </span>
//                     </td>
//                     <td className="py-2">
//                       {/* Trend placeholder bar */}
//                       <div className="w-24 h-3 bg-gray-300 dark:bg-gray-600 rounded-full">
//                         <div
//                           className="h-3 bg-gray-600 dark:bg-gray-300 rounded-full"
//                           style={{ width: "60%" }}
//                         />
//                       </div>
//                     </td>
//                     <td className="py-2 text-right">
//                       <button
//                         className="px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
//                         title="More actions"
//                       >
//                         •••
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Departments */}
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
//           <div className="flex items-center justify-between mb-2">
//             <h2 className="font-semibold">Departments</h2>
//             <span className="text-sm text-gray-500 dark:text-gray-400">Sep. 01 – 07</span>
//           </div>
//           <div className="space-y-2">
//             {departments.map((dept, i) => {
//               // Get the style object for this dept or fallback to grays
//               const styles = colorStyles[dept.name] || {
//                 bg: "bg-gray-100",
//                 text: "text-gray-800",
//                 pill: "bg-gray-200 text-gray-700",
//               };

//               return (
//                 <div
//                   key={i}
//                   className={`flex items-center justify-between p-3 rounded-md ${styles.bg}`}
//                 >
//                   {/* Department Name */}
//                   <span className={`font-medium ${styles.text}`}>{dept.name}</span>

//                   {/* Right-side: overlapping circles + “+X new” pill */}
//                   <div className="flex items-center">
//                     {/* Overlapping “avatar” circles */}
//                     <div className="relative flex -space-x-3 mr-2">
//                       <span className="inline-block h-7 w-7 rounded-full bg-gray-300 border-2 border-white" />
//                       <span className="inline-block h-7 w-7 rounded-full bg-gray-400 border-2 border-white" />
//                     </div>

//                     {/* +X new pill */}
//                     {dept.newCount > 0 && (
//                       <span
//                         className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${styles.pill}`}
//                       >
//                         +{dept.newCount} new
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecruitDashboard;


import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RecruitDashboard = () => {
  const topHiringData = {
    labels: ["01/09", "02/09", "03/09", "04/09", "05/09", "06/09", "07/09"],
    datasets: [
      {
        label: "Referral",
        data: [25, 60, 15, 40, 30, 55, 10],
        backgroundColor: "#8B5CF6",
      },
      {
        label: "Indeed",
        data: [10, 20, 50, 25, 45, 20, 15],
        backgroundColor: "#22C55E",
      },
      {
        label: "LinkedIn",
        data: [40, 30, 35, 55, 70, 65, 35],
        backgroundColor: "#F59E0B",
      },
    ],
  };

  const topHiringOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to resize in its container
    scales: {
      x: { beginAtZero: true, grid: { display: false } },
      y: { beginAtZero: true, max: 100 },
    },
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const vacancies = [
    { title: "UX Designer", location: "Dayton", applicants: 122, newApplicants: 33 },
    { title: "iOS App Developer", location: "Remote", applicants: 34, newApplicants: 5 },
    { title: "Network Administrator", location: "Phoenix", applicants: 45, newApplicants: 13 },
    { title: "JavaScript Developer", location: "Remote", applicants: 57, newApplicants: 5 },
    { title: "Graphic Designer", location: "Gothenburg", applicants: 74, newApplicants: 22 },
    { title: "Python Django Developer", location: "Remote", applicants: 44, newApplicants: 12 },
  ];

  const departments = [
    { name: "Development", newCount: 2 },
    { name: "Sales & Marketing", newCount: 2 },
    { name: "Project Management", newCount: 2 },
    { name: "Analytics & Data", newCount: 0 },
    { name: "Finance", newCount: 0 },
  ];

  const colorStyles = {
    Development: {
      bg: "bg-purple-50",
      text: "text-purple-800",
      pill: "bg-purple-500 text-white",
    },
    "Sales & Marketing": {
      bg: "bg-orange-50",
      text: "text-orange-800",
      pill: "bg-green-500 text-white",
    },
    "Project Management": {
      bg: "bg-green-50",
      text: "text-green-800",
      pill: "bg-blue-500 text-white",
    },
    "Analytics & Data": {
      bg: "bg-blue-50",
      text: "text-blue-800",
      pill: "bg-gray-500 text-white",
    },
    Finance: {
      bg: "bg-pink-50",
      text: "text-pink-800",
      pill: "bg-pink-500 text-white",
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Recruitment Dashboard</h1>
        </div>

        {/* Single grid for the 4 stat cards + Chart */}
        <div className="grid grid-cols-1 xl:grid-cols-6 gap-6 mb-6 items-stretch">
          {/* -- Below are your original stat card classes/colors -- */}
          {/* Card 1 */}
          <div className="flex items-center p-4 rounded-lg shadow bg-green-50 dark:bg-green-900">
            <div className="w-1 h-12 bg-green-500 mr-4 rounded" />
            <div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-200">79</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Open Positions</div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex items-center p-4 rounded-lg shadow bg-yellow-50 dark:bg-yellow-900">
            <div className="w-1 h-12 bg-yellow-500 mr-4 rounded" />
            <div>
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-200">160</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Applicants</div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex items-center p-4 rounded-lg shadow bg-blue-50 dark:bg-blue-900">
            <div className="w-1 h-12 bg-blue-500 mr-4 rounded" />
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-200">7</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Outstanding Offers</div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex items-center p-4 rounded-lg shadow bg-purple-50 dark:bg-purple-900">
            <div className="w-1 h-12 bg-purple-500 mr-4 rounded" />
            <div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-200">18</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Onboarding</div>
            </div>
          </div>

          {/* Chart container: spans 2 columns on XL screens */}
          <div className="col-span-1 xl:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold">Top Hiring Sources</h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">Nov. 01 – 07</span>
            </div>
            <div className="flex-grow relative">
              <Bar data={topHiringData} options={topHiringOptions} />
            </div>
          </div>
        </div>

        {/* Second row: Recent Vacancies + Departments */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Recent Vacancies */}
          <div className="col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Recent Vacancies</h2>
              <button className="text-sm font-medium text-blue-600 dark:text-blue-400">
                All Vacancies
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                    <th className="py-2 font-semibold text-gray-600 dark:text-gray-300">Job Title</th>
                    <th className="py-2 font-semibold text-gray-600 dark:text-gray-300">Location</th>
                    <th className="py-2 font-semibold text-gray-600 dark:text-gray-300">
                      Applicants
                    </th>
                    <th className="py-2 font-semibold text-gray-600 dark:text-gray-300">Trend</th>
                    <th className="py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {vacancies.map((vac, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-200 last:border-0 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="py-2 font-medium">{vac.title}</td>
                      <td className="py-2">{vac.location}</td>
                      <td className="py-2">
                        {vac.applicants}
                        <span className="ml-2 text-xs text-green-600 dark:text-green-400">
                          {vac.newApplicants} new
                        </span>
                      </td>
                      <td className="py-2">
                        <div className="w-24 h-3 bg-gray-300 dark:bg-gray-600 rounded-full">
                          <div
                            className="h-3 bg-gray-600 dark:bg-gray-300 rounded-full"
                            style={{ width: "60%" }}
                          />
                        </div>
                      </td>
                      <td className="py-2 text-right">
                        <button
                          className="px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                          title="More actions"
                        >
                          •••
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Departments */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold">Departments</h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">Sep. 01 – 07</span>
            </div>
            <div className="space-y-2">
              {departments.map((dept, i) => {
                // get style object for this dept or fallback to grays
                const styles = colorStyles[dept.name] || {
                  bg: "bg-gray-100",
                  text: "text-gray-800",
                  pill: "bg-gray-200 text-gray-700",
                };

                return (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-3 rounded-md ${styles.bg}`}
                  >
                    <span className={`font-medium ${styles.text}`}>{dept.name}</span>
                    <div className="flex items-center">
                      <div className="relative flex -space-x-3 mr-2">
                        <span className="inline-block h-7 w-7 rounded-full bg-gray-300 border-2 border-white" />
                        <span className="inline-block h-7 w-7 rounded-full bg-gray-400 border-2 border-white" />
                      </div>
                      {dept.newCount > 0 && (
                        <span
                          className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${styles.pill}`}
                        >
                          +{dept.newCount} new
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitDashboard;


