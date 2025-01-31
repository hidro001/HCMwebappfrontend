



// import React, { useState } from 'react';
// import { toast } from 'react-hot-toast';
// import { BsThreeDotsVertical } from 'react-icons/bs';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const AllVacancies = () => {
//   // Sample data
//   const vacanciesData = [
//     {
//       id: 1,
//       title: 'Ruby on Rails Deve',
//       location: 'Rem',
//       applicants: 34,
//       newApplicants: 3,
//       status: 'OPEN',
//       publication: 'Sep 12 2023',
//       chartData: [10, 15, 5, 18, 13],
//     },
//     {
//       id: 2,
//       title: 'iOS App Developer',
//       location: 'Dayt',
//       applicants: 122,
//       newApplicants: 33,
//       status: 'COMPLETED',
//       publication: 'Aug 02 2023',
//       chartData: [2, 5, 6, 7, 5],
//     },
//     {
//       id: 3,
//       title: 'Network Administrator',
//       location: 'Phox',
//       applicants: 45,
//       newApplicants: 13,
//       status: 'IN PROGRESS',
//       publication: 'Aug 22 2023',
//       chartData: [4, 8, 10, 9, 12],
//     },
//     {
//       id: 4,
//       title: 'JavaScript Develop',
//       location: 'Rem',
//       applicants: 57,
//       newApplicants: 5,
//       status: 'OPEN',
//       publication: 'Sep 6 2023',
//       chartData: [6, 4, 9, 11, 8],
//     },
//     {
//       id: 5,
//       title: 'Graphic Designer',
//       location: 'Gotl',
//       applicants: 74,
//       newApplicants: 22,
//       status: 'OPEN',
//       publication: 'Aug 24 2023',
//       chartData: [10, 12, 15, 11, 13],
//     },
//     {
//       id: 6,
//       title: 'C++ Game Develop',
//       location: 'Mun',
//       applicants: 44,
//       newApplicants: 12,
//       status: 'IN PROGRESS',
//       publication: 'Jul 14 2023',
//       chartData: [3, 8, 8, 10, 9],
//     },
//     {
//       id: 7,
//       title: 'Python Django Dev',
//       location: 'Rem',
//       applicants: 24,
//       newApplicants: 12,
//       status: 'IN PROGRESS',
//       publication: 'Jul 30 2023',
//       chartData: [0, 2, 5, 2, 4],
//     },
//     {
//       id: 8,
//       title: 'iOS App Developer',
//       location: 'Kath',
//       applicants: 126,
//       newApplicants: 12,
//       status: 'COMPLETED',
//       publication: 'Jun 21 2023',
//       chartData: [5, 5, 3, 5, 2],
//     },
//   ];

//   // Tabs (All, Open, Completed, In Progress)
//   const [selectedTab, setSelectedTab] = useState('ALL');

//   // Filters
//   const [filters, setFilters] = useState({
//     department: 'All Department',
//     positionType: 'All Positions',
//     workExperience: 'Any Experience',
//     location: 'Any Location',
//   });

//   // Toggles the filter drawer on mobile
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   // Handle a filter click
//   const handleFilterClick = (type, value) => {
//     setFilters((prev) => ({ ...prev, [type]: value }));
//     toast.success(`Filter updated: ${type} -> ${value}`);
//   };

//   // Clear all filters
//   const handleClearAll = () => {
//     setFilters({
//       department: 'All Department',
//       positionType: 'All Positions',
//       workExperience: 'Any Experience',
//       location: 'Any Location',
//     });
//     toast.success('All filters cleared!');
//   };

//   // Filter data by tab
//   const filteredVacancies = vacanciesData.filter((vacancy) => {
//     if (selectedTab === 'ALL') return true;
//     if (selectedTab === 'OPEN') return vacancy.status === 'OPEN';
//     if (selectedTab === 'COMPLETED') return vacancy.status === 'COMPLETED';
//     if (selectedTab === 'IN PROGRESS') return vacancy.status === 'IN PROGRESS';
//     return true;
//   });

//   return (
//     <div className=" bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
//       {/* Top bar */}
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-4 py-4 border-b dark:border-gray-700 gap-2">
//         <h1 className="text-xl sm:text-2xl font-semibold">Vacancies</h1>
//         <div className="flex items-center flex-wrap gap-2">
//           <button className="px-4 py-2 bg-white dark:bg-gray-800 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">
//             Import
//           </button>
//           <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//             + Add Vacancy
//           </button>
//         </div>
//       </div>

//       {/* Tabs + Mobile Filter Button */}
//       <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
//         {/* Tab buttons */}
//         <div className="flex space-x-2 overflow-x-auto">
//           {['ALL', 'OPEN', 'COMPLETED', 'IN PROGRESS'].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setSelectedTab(tab)}
//               className={`px-4 py-2 rounded-full border whitespace-nowrap transition
//                 ${
//                   selectedTab === tab
//                     ? 'bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-200 dark:text-blue-800'
//                     : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300'
//                 }
//               `}
//             >
//               {tab === 'ALL'
//                 ? 'All Vacancies'
//                 : tab.charAt(0).toUpperCase() + tab.slice(1).toLowerCase()}
//             </button>
//           ))}
//         </div>

//         {/* Show Filter button for smaller devices (hidden on lg and above) */}
//         <button
//           onClick={() => setIsFilterOpen(true)}
//           className="px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 block lg:hidden"
//         >
//           Show Filter
//         </button>
//       </div>

//       {/* Main content & Filter (always visible on lg+, hidden behind drawer on smaller) */}
//       <div className="flex flex-col lg:flex-row gap-2 px-4 py-4">
//         {/* Vacancies Table: Make it scrollable horizontally */}
//         <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow">
//           <div className="overflow-x-auto w-full">
//             <table className="min-w-full table-auto">
//               {/* Table header */}
//               <thead>
//                 <tr className="border-b bg-gray-50 dark:bg-gray-700 text-left text-gray-600 dark:text-gray-300 text-sm">
//                   <th className="px-6 py-3 w-10">
//                     <input type="checkbox" className="rounded focus:ring-offset-0" />
//                   </th>
//                   <th className="px-6 py-3 w-4" />
//                   <th className="px-6 py-3 font-semibold">Position Title</th>
//                   <th className="px-6 py-3 font-semibold">Location</th>
//                   <th className="px-6 py-3 font-semibold">Applicants</th>
//                   <th className="px-6 py-3 font-semibold">Status</th>
//                   <th className="px-6 py-3 font-semibold">Publication</th>
//                   <th className="px-6 py-3 font-semibold">Last 7 days</th>
//                   <th className="px-6 py-3" />
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredVacancies.map((vacancy) => (
//                   <tr
//                     key={vacancy.id}
//                     className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
//                   >
//                     <td className="px-6 py-4">
//                       <input type="checkbox" className="rounded focus:ring-offset-0" />
//                     </td>
//                     <td className="px-6 py-4">
//                       {/* Purple dot */}
//                       <div className="w-3 h-3 bg-purple-600 rounded-full" />
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap font-medium">
//                       {vacancy.title}
//                     </td>
//                     <td className="px-6 py-4">{vacancy.location}</td>
//                     <td className="px-6 py-4">
//                       <span className="font-semibold">{vacancy.applicants}</span>
//                       {vacancy.newApplicants > 0 && (
//                         <span className="ml-2 text-xs text-green-600 dark:text-green-400">
//                           ({vacancy.newApplicants} new)
//                         </span>
//                       )}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`text-xs font-medium px-2 py-1 rounded
//                           ${
//                             vacancy.status === 'OPEN'
//                               ? 'bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-800'
//                               : vacancy.status === 'COMPLETED'
//                               ? 'bg-orange-100 text-orange-700 dark:bg-orange-200 dark:text-orange-800'
//                               : 'bg-purple-100 text-purple-700 dark:bg-purple-200 dark:text-purple-800'
//                           }
//                         `}
//                       >
//                         {vacancy.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {vacancy.publication}
//                     </td>
//                     <td className="px-6 py-4">
//                       <MiniSparkline data={vacancy.chartData} />
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
//                         <BsThreeDotsVertical size={18} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="p-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400 gap-2">
//             <div>
//               Showing 1 to {filteredVacancies.length} of {vacanciesData.length} entries
//             </div>
//             <div className="flex space-x-3">
//               <button className="px-2 py-1 border rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
//                 &lt;
//               </button>
//               <button className="px-2 py-1 border rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
//                 &gt;
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* FILTER PANEL */}
//         {/* Always visible on lg+; hidden as a “drawer” on smaller screens */}
//         <div className="hidden lg:block lg:w-80 border-l dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
//           <FilterPanel
//             filters={filters}
//             handleFilterClick={handleFilterClick}
//             handleClearAll={handleClearAll}
//           />
//         </div>
//       </div>

//       {/* MOBILE DRAWER OVERLAY for FILTER (only on smaller devices) */}
//       {/*
//         1) Dark semi-transparent backdrop that covers the screen.
//         2) Slide-out panel from the right.
//       */}
//       <div
//         className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity ${
//           isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
//         } lg:hidden`}
//         onClick={() => setIsFilterOpen(false)}
//       />
//       <div
//         className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 dark:border-gray-700 border-l z-50 transform transition-transform duration-300
//           ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}
//           lg:hidden
//         `}
//       >
//         {/* Close button at the top-right inside the drawer */}
//         <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
//           <h2 className="font-semibold text-lg">Vacancies Filter</h2>
//           <button
//             onClick={() => setIsFilterOpen(false)}
//             className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded"
//           >
//             Close
//           </button>
//         </div>
//         {/* Filter content */}
//         <div className="p-4 overflow-y-auto h-full">
//           <FilterPanel
//             filters={filters}
//             handleFilterClick={handleFilterClick}
//             handleClearAll={handleClearAll}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// // Separate out the filter panel contents for clarity
// const FilterPanel = ({ filters, handleFilterClick, handleClearAll }) => {
//   return (
//     <>
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="font-semibold text-lg">Vacancies Filter</h2>
//         <button
//           onClick={handleClearAll}
//           className="text-blue-500 text-sm underline"
//         >
//           CLEAR ALL
//         </button>
//       </div>

//       {/* Department */}
//       <div className="mb-6">
//         <h3 className="font-medium mb-2">Department</h3>
//         <div className="flex flex-wrap gap-2">
//           {[
//             'All Department',
//             'Development',
//             'Sales & Marketing',
//             'Project Management',
//             'Support',
//             'Analytics & Data',
//           ].map((dept) => (
//             <FilterChip
//               key={dept}
//               label={dept}
//               selected={filters.department === dept}
//               onClick={() => handleFilterClick('department', dept)}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Position Type */}
//       <div className="mb-6">
//         <h3 className="font-medium mb-2">Position Type</h3>
//         <div className="flex flex-wrap gap-2">
//           {[
//             'All Positions',
//             'UX/UI Designer',
//             'PM',
//             'React Developer',
//             'QA',
//             'Data Analyst',
//             'Backend Java Developer',
//             'DevOps',
//             'Python Django Developer',
//           ].map((posType) => (
//             <FilterChip
//               key={posType}
//               label={posType}
//               selected={filters.positionType === posType}
//               onClick={() => handleFilterClick('positionType', posType)}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Work Experience */}
//       <div className="mb-6">
//         <h3 className="font-medium mb-2">Work Experience</h3>
//         <div className="flex flex-wrap gap-2">
//           {[
//             'Any Experience',
//             'Less than 1 year',
//             '1-2 years',
//             '2-3 years',
//             '3-5 years',
//             'More than 5 years',
//           ].map((we) => (
//             <FilterChip
//               key={we}
//               label={we}
//               selected={filters.workExperience === we}
//               onClick={() => handleFilterClick('workExperience', we)}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Location */}
//       <div className="mb-6">
//         <h3 className="font-medium mb-2">Location</h3>
//         <div className="flex flex-wrap gap-2">
//           {[
//             'Any Location',
//             'United States',
//             'Ukraine',
//             'Germany',
//             'France',
//             'Remote',
//           ].map((loc) => (
//             <FilterChip
//               key={loc}
//               label={loc}
//               selected={filters.location === loc}
//               onClick={() => handleFilterClick('location', loc)}
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// // Mini Sparkline Chart
// const MiniSparkline = ({ data }) => {
//   const options = {
//     responsive: true,
//     scales: { x: { display: false }, y: { display: false } },
//     plugins: { legend: { display: false }, tooltip: { enabled: false } },
//   };

//   const chartData = {
//     labels: data.map((_, i) => i),
//     datasets: [
//       {
//         data,
//         borderColor: 'rgb(59,130,246)', // Tailwind "blue-500"
//         fill: false,
//         tension: 0.3,
//       },
//     ],
//   };

//   return (
//     <div className="w-20 h-8">
//       <Line options={options} data={chartData} />
//     </div>
//   );
// };

// // FilterChip component
// const FilterChip = ({ label, selected, onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={`px-3 py-1 text-sm rounded-full border transition
//         ${
//           selected
//             ? 'bg-blue-100 border-blue-300 text-blue-700 dark:bg-blue-200 dark:text-blue-900'
//             : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:text-gray-200'
//         }
//       `}
//     >
//       {label}
//     </button>
//   );
// };

// export default AllVacancies;


// import React, { useState } from 'react';
// import { toast } from 'react-hot-toast';
// import { BsThreeDotsVertical } from 'react-icons/bs';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const AllVacancies = () => {
//   // Sample data
//   const vacanciesData = [
//     {
//       id: 1,
//       title: 'Ruby on Rails Deve',
//       location: 'Rem',
//       applicants: 34,
//       newApplicants: 3,
//       status: 'OPEN',
//       publication: 'Sep 12 2023',
//       chartData: [10, 15, 5, 18, 13],
//     },
//     {
//       id: 2,
//       title: 'iOS App Developer',
//       location: 'Dayt',
//       applicants: 122,
//       newApplicants: 33,
//       status: 'COMPLETED',
//       publication: 'Aug 02 2023',
//       chartData: [2, 5, 6, 7, 5],
//     },
//     {
//       id: 3,
//       title: 'Network Administrator',
//       location: 'Phox',
//       applicants: 45,
//       newApplicants: 13,
//       status: 'IN PROGRESS',
//       publication: 'Aug 22 2023',
//       chartData: [4, 8, 10, 9, 12],
//     },
//     {
//       id: 4,
//       title: 'JavaScript Develop',
//       location: 'Rem',
//       applicants: 57,
//       newApplicants: 5,
//       status: 'OPEN',
//       publication: 'Sep 6 2023',
//       chartData: [6, 4, 9, 11, 8],
//     },
//     {
//       id: 5,
//       title: 'Graphic Designer',
//       location: 'Gotl',
//       applicants: 74,
//       newApplicants: 22,
//       status: 'OPEN',
//       publication: 'Aug 24 2023',
//       chartData: [10, 12, 15, 11, 13],
//     },
//     {
//       id: 6,
//       title: 'C++ Game Develop',
//       location: 'Mun',
//       applicants: 44,
//       newApplicants: 12,
//       status: 'IN PROGRESS',
//       publication: 'Jul 14 2023',
//       chartData: [3, 8, 8, 10, 9],
//     },
//     {
//       id: 7,
//       title: 'Python Django Dev',
//       location: 'Rem',
//       applicants: 24,
//       newApplicants: 12,
//       status: 'IN PROGRESS',
//       publication: 'Jul 30 2023',
//       chartData: [0, 2, 5, 2, 4],
//     },
//     {
//       id: 8,
//       title: 'iOS App Developer',
//       location: 'Kath',
//       applicants: 126,
//       newApplicants: 12,
//       status: 'COMPLETED',
//       publication: 'Jun 21 2023',
//       chartData: [5, 5, 3, 5, 2],
//     },
//   ];

//   // Tabs (All, Open, Completed, In Progress)
//   const [selectedTab, setSelectedTab] = useState('ALL');

//   // Filters
//   const [filters, setFilters] = useState({
//     department: 'All Department',
//     positionType: 'All Positions',
//     workExperience: 'Any Experience',
//     location: 'Any Location',
//   });

//   // Toggles the filter drawer on mobile
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   // Handle a filter click
//   const handleFilterClick = (type, value) => {
//     setFilters((prev) => ({ ...prev, [type]: value }));
//     toast.success(`Filter updated: ${type} -> ${value}`);
//   };

//   // Clear all filters
//   const handleClearAll = () => {
//     setFilters({
//       department: 'All Department',
//       positionType: 'All Positions',
//       workExperience: 'Any Experience',
//       location: 'Any Location',
//     });
//     toast.success('All filters cleared!');
//   };

//   // Filter data by tab
//   const filteredVacancies = vacanciesData.filter((vacancy) => {
//     if (selectedTab === 'ALL') return true;
//     if (selectedTab === 'OPEN') return vacancy.status === 'OPEN';
//     if (selectedTab === 'COMPLETED') return vacancy.status === 'COMPLETED';
//     if (selectedTab === 'IN PROGRESS') return vacancy.status === 'IN PROGRESS';
//     return true;
//   });

//   return (
//     <div className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 border border-white">
//       {/* Top bar */}
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-4 py-4 border-b dark:border-gray-700 gap-2">
//         <h1 className="text-xl sm:text-2xl font-semibold">Vacancies</h1>
//         <div className="flex items-center flex-wrap gap-2">
//           <button className="px-4 py-2 bg-white dark:bg-gray-800 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">
//             Import
//           </button>
//           <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//             + Add Vacancy
//           </button>
//         </div>
//       </div>

//       {/* Tabs + Mobile Filter Button */}
//       <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
//         {/* Tab buttons */}
//         <div className="flex space-x-2 overflow-x-auto">
//           {['ALL', 'OPEN', 'COMPLETED', 'IN PROGRESS'].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setSelectedTab(tab)}
//               className={`px-4 py-2 rounded-full border whitespace-nowrap transition
//                 ${
//                   selectedTab === tab
//                     ? 'bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-200 dark:text-blue-800'
//                     : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300'
//                 }
//               `}
//             >
//               {tab === 'ALL'
//                 ? 'All Vacancies'
//                 : tab.charAt(0).toUpperCase() + tab.slice(1).toLowerCase()}
//             </button>
//           ))}
//         </div>

//         {/* Show Filter button for xl and below (hidden on screens > 1280px) */}
//         <button
//           onClick={() => setIsFilterOpen(true)}
//           className="px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 block xl:hidden"
//         >
//           Show Filter
//         </button>
//       </div>

//       {/* Main content & Filter */}
//       <div className="flex flex-col xl:flex-row gap-2 px-4 py-4">
//         {/* Vacancies Table */}
//         <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow">
//           <div className="overflow-x-auto w-full">
//             <table className="min-w-full table-auto">
//               <thead>
//                 <tr className="border-b bg-gray-50 dark:bg-gray-700 text-left text-gray-600 dark:text-gray-300 text-sm">
//                   <th className="px-6 py-3 w-10">
//                     <input type="checkbox" className="rounded focus:ring-offset-0" />
//                   </th>
//                   <th className="px-6 py-3 w-4" />
//                   <th className="px-6 py-3 font-semibold">Position Title</th>
//                   <th className="px-6 py-3 font-semibold">Location</th>
//                   <th className="px-6 py-3 font-semibold">Applicants</th>
//                   <th className="px-6 py-3 font-semibold">Status</th>
//                   <th className="px-6 py-3 font-semibold">Publication</th>
//                   <th className="px-6 py-3 font-semibold">Last 7 days</th>
//                   <th className="px-6 py-3" />
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredVacancies.map((vacancy) => (
//                   <tr
//                     key={vacancy.id}
//                     className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
//                   >
//                     <td className="px-6 py-4">
//                       <input type="checkbox" className="rounded focus:ring-offset-0" />
//                     </td>
//                     <td className="px-6 py-4">
//                       {/* Purple dot */}
//                       <div className="w-3 h-3 bg-purple-600 rounded-full" />
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap font-medium">
//                       {vacancy.title}
//                     </td>
//                     <td className="px-6 py-4">{vacancy.location}</td>
//                     <td className="px-6 py-4">
//                       <span className="font-semibold">{vacancy.applicants}</span>
//                       {vacancy.newApplicants > 0 && (
//                         <span className="ml-2 text-xs text-green-600 dark:text-green-400">
//                           ({vacancy.newApplicants} new)
//                         </span>
//                       )}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`text-xs font-medium px-2 py-1 rounded
//                           ${
//                             vacancy.status === 'OPEN'
//                               ? 'bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-800'
//                               : vacancy.status === 'COMPLETED'
//                               ? 'bg-orange-100 text-orange-700 dark:bg-orange-200 dark:text-orange-800'
//                               : 'bg-purple-100 text-purple-700 dark:bg-purple-200 dark:text-purple-800'
//                           }
//                         `}
//                       >
//                         {vacancy.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {vacancy.publication}
//                     </td>
//                     <td className="px-6 py-4">
//                       <MiniSparkline data={vacancy.chartData} />
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
//                         <BsThreeDotsVertical size={18} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="p-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400 gap-2">
//             <div>
//               Showing 1 to {filteredVacancies.length} of {vacanciesData.length} entries
//             </div>
//             <div className="flex space-x-3">
//               <button className="px-2 py-1 border rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
//                 &lt;
//               </button>
//               <button className="px-2 py-1 border rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
//                 &gt;
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* FILTER PANEL (shown only on >1280px) */}
//         <div className="hidden xl:block xl:w-80 border-l dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
//           <FilterPanel
//             filters={filters}
//             handleFilterClick={handleFilterClick}
//             handleClearAll={handleClearAll}
//           />
//         </div>
//       </div>

//       {/* MOBILE DRAWER OVERLAY for FILTER (only on xl and below) */}
//       <div
//         className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity ${
//           isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
//         } xl:hidden`}
//         onClick={() => setIsFilterOpen(false)}
//       />
//       <div
//         className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 dark:border-gray-700 border-l z-50 transform transition-transform duration-300
//           ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}
//           xl:hidden
//         `}
//       >
//         {/* Close button */}
//         <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
//           <h2 className="font-semibold text-lg">Vacancies Filter</h2>
//           <button
//             onClick={() => setIsFilterOpen(false)}
//             className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded"
//           >
//             Close
//           </button>
//         </div>
//         {/* Filter content */}
//         <div className="p-4 overflow-y-auto h-full">
//           <FilterPanel
//             filters={filters}
//             handleFilterClick={handleFilterClick}
//             handleClearAll={handleClearAll}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// // The rest of your components remain unchanged
// const FilterPanel = ({ filters, handleFilterClick, handleClearAll }) => {
//   return (
//     <>
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="font-semibold text-lg">Vacancies Filter</h2>
//         <button
//           onClick={handleClearAll}
//           className="text-blue-500 text-sm underline"
//         >
//           CLEAR ALL
//         </button>
//       </div>
//       {/* Department */}
//       <div className="mb-6">
//         <h3 className="font-medium mb-2">Department</h3>
//         <div className="flex flex-wrap gap-2">
//           {[
//             'All Department',
//             'Development',
//             'Sales & Marketing',
//             'Project Management',
//             'Support',
//             'Analytics & Data',
//           ].map((dept) => (
//             <FilterChip
//               key={dept}
//               label={dept}
//               selected={filters.department === dept}
//               onClick={() => handleFilterClick('department', dept)}
//             />
//           ))}
//         </div>
//       </div>
//       {/* Position Type */}
//       <div className="mb-6">
//         <h3 className="font-medium mb-2">Position Type</h3>
//         <div className="flex flex-wrap gap-2">
//           {[
//             'All Positions',
//             'UX/UI Designer',
//             'PM',
//             'React Developer',
//             'QA',
//             'Data Analyst',
//             'Backend Java Developer',
//             'DevOps',
//             'Python Django Developer',
//           ].map((posType) => (
//             <FilterChip
//               key={posType}
//               label={posType}
//               selected={filters.positionType === posType}
//               onClick={() => handleFilterClick('positionType', posType)}
//             />
//           ))}
//         </div>
//       </div>
//       {/* Work Experience */}
//       <div className="mb-6">
//         <h3 className="font-medium mb-2">Work Experience</h3>
//         <div className="flex flex-wrap gap-2">
//           {[
//             'Any Experience',
//             'Less than 1 year',
//             '1-2 years',
//             '2-3 years',
//             '3-5 years',
//             'More than 5 years',
//           ].map((we) => (
//             <FilterChip
//               key={we}
//               label={we}
//               selected={filters.workExperience === we}
//               onClick={() => handleFilterClick('workExperience', we)}
//             />
//           ))}
//         </div>
//       </div>
//       {/* Location */}
//       <div className="mb-6">
//         <h3 className="font-medium mb-2">Location</h3>
//         <div className="flex flex-wrap gap-2">
//           {[
//             'Any Location',
//             'United States',
//             'Ukraine',
//             'Germany',
//             'France',
//             'Remote',
//           ].map((loc) => (
//             <FilterChip
//               key={loc}
//               label={loc}
//               selected={filters.location === loc}
//               onClick={() => handleFilterClick('location', loc)}
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// const MiniSparkline = ({ data }) => {
//   const options = {
//     responsive: true,
//     scales: { x: { display: false }, y: { display: false } },
//     plugins: { legend: { display: false }, tooltip: { enabled: false } },
//   };

//   const chartData = {
//     labels: data.map((_, i) => i),
//     datasets: [
//       {
//         data,
//         borderColor: 'rgb(59,130,246)', // Tailwind "blue-500"
//         fill: false,
//         tension: 0.3,
//       },
//     ],
//   };

//   return (
//     <div className="w-20 h-8">
//       <Line options={options} data={chartData} />
//     </div>
//   );
// };

// const FilterChip = ({ label, selected, onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={`px-3 py-1 text-sm rounded-full border transition
//         ${
//           selected
//             ? 'bg-blue-100 border-blue-300 text-blue-700 dark:bg-blue-200 dark:text-blue-900'
//             : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:text-gray-200'
//         }
//       `}
//     >
//       {label}
//     </button>
//   );
// };

// export default AllVacancies;


// import React, { useState } from 'react';
// import { toast } from 'react-hot-toast';
// import { BsThreeDotsVertical } from 'react-icons/bs';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const AllVacancies = () => {
//   // Sample data
//   const vacanciesData = [
//     {
//       id: 1,
//       title: 'Ruby on Rails Deve',
//       location: 'Remote',
//       applicants: 34,
//       newApplicants: 3,
//       status: 'OPEN',
//       publication: 'Sep 12 2023',
//       chartData: [10, 15, 5, 18, 13],
//       department: 'Development', // ADDED for demo filtering
//       positionType: 'Backend Java Developer', // ADDED for demo filtering
//       workExperience: '1-2 years', // ADDED for demo filtering
//     },
//     {
//       id: 2,
//       title: 'iOS App Developer',
//       location: 'Dayton',
//       applicants: 122,
//       newApplicants: 33,
//       status: 'COMPLETED',
//       publication: 'Aug 02 2023',
//       chartData: [2, 5, 6, 7, 5],
//       department: 'Sales & Marketing',
//       positionType: 'UX/UI Designer',
//       workExperience: 'More than 5 years',
//     },
//     {
//       id: 3,
//       title: 'Network Administrator',
//       location: 'Phoenix',
//       applicants: 45,
//       newApplicants: 13,
//       status: 'IN PROGRESS',
//       publication: 'Aug 22 2023',
//       chartData: [4, 8, 10, 9, 12],
//       department: 'Development',
//       positionType: 'React Developer',
//       workExperience: '3-5 years',
//     },
//     {
//       id: 4,
//       title: 'JavaScript Develop',
//       location: 'Remote',
//       applicants: 57,
//       newApplicants: 5,
//       status: 'OPEN',
//       publication: 'Sep 6 2023',
//       chartData: [6, 4, 9, 11, 8],
//       department: 'Development',
//       positionType: 'React Developer',
//       workExperience: '2-3 years',
//     },
//     {
//       id: 5,
//       title: 'Graphic Designer',
//       location: 'Gotland',
//       applicants: 74,
//       newApplicants: 22,
//       status: 'OPEN',
//       publication: 'Aug 24 2023',
//       chartData: [10, 12, 15, 11, 13],
//       department: 'Sales & Marketing',
//       positionType: 'UX/UI Designer',
//       workExperience: 'Less than 1 year',
//     },
//     {
//       id: 6,
//       title: 'C++ Game Develop',
//       location: 'Munich',
//       applicants: 44,
//       newApplicants: 12,
//       status: 'IN PROGRESS',
//       publication: 'Jul 14 2023',
//       chartData: [3, 8, 8, 10, 9],
//       department: 'Development',
//       positionType: 'Backend Java Developer',
//       workExperience: '1-2 years',
//     },
//     {
//       id: 7,
//       title: 'Python Django Dev',
//       location: 'Remote',
//       applicants: 24,
//       newApplicants: 12,
//       status: 'IN PROGRESS',
//       publication: 'Jul 30 2023',
//       chartData: [0, 2, 5, 2, 4],
//       department: 'Analytics & Data',
//       positionType: 'Python Django Developer',
//       workExperience: '2-3 years',
//     },
//     {
//       id: 8,
//       title: 'iOS App Developer',
//       location: 'Kathmandu',
//       applicants: 126,
//       newApplicants: 12,
//       status: 'COMPLETED',
//       publication: 'Jun 21 2023',
//       chartData: [5, 5, 3, 5, 2],
//       department: 'Sales & Marketing',
//       positionType: 'UX/UI Designer',
//       workExperience: 'Any Experience',
//     },
//   ];

//   // Tabs (All, Open, Completed, In Progress)
//   const [selectedTab, setSelectedTab] = useState('ALL');

//   // Filters
//   const [filters, setFilters] = useState({
//     department: 'All Department',
//     positionType: 'All Positions',
//     workExperience: 'Any Experience',
//     location: 'Any Location',
//   });

//   // Toggles the filter drawer on mobile
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   // Handle a filter click
//   const handleFilterClick = (type, value) => {
//     setFilters((prev) => ({ ...prev, [type]: value }));
//     toast.success(`Filter updated: ${type} -> ${value}`);
//   };

//   // Clear all filters
//   const handleClearAll = () => {
//     setFilters({
//       department: 'All Department',
//       positionType: 'All Positions',
//       workExperience: 'Any Experience',
//       location: 'Any Location',
//     });
//     toast.success('All filters cleared!');
//   };

//   // Filter data by tab AND the other filters
//   const filteredVacancies = vacanciesData.filter((vacancy) => {
//     // 1) Filter by tab:
//     if (selectedTab === 'OPEN' && vacancy.status !== 'OPEN') return false;
//     if (selectedTab === 'COMPLETED' && vacancy.status !== 'COMPLETED') return false;
//     if (selectedTab === 'IN PROGRESS' && vacancy.status !== 'IN PROGRESS') return false;
//     // 2) Filter by department:
//     if (
//       filters.department !== 'All Department' &&
//       vacancy.department !== filters.department
//     ) {
//       return false;
//     }
//     // 3) Filter by position type:
//     if (
//       filters.positionType !== 'All Positions' &&
//       vacancy.positionType !== filters.positionType
//     ) {
//       return false;
//     }
//     // 4) Filter by work experience:
//     if (
//       filters.workExperience !== 'Any Experience' &&
//       vacancy.workExperience !== filters.workExperience
//     ) {
//       return false;
//     }
//     // 5) Filter by location:
//     // Because your sample data’s location is not just country names,
//     // we might do partial matching OR just exact matching:
//     if (
//       filters.location !== 'Any Location' &&
//       !vacancy.location.toLowerCase().includes(filters.location.toLowerCase())
//     ) {
//       return false;
//     }

//     return true;
//   });

//   return (
//     <div className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 relative border border-white ">
//       {/* Top bar */}
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-4 py-4 border-b dark:border-gray-700 gap-2">
//         <h1 className="text-xl sm:text-2xl font-semibold">Vacancies</h1>
//         <div className="flex items-center flex-wrap gap-2">
//           <button className="px-4 py-2 bg-white dark:bg-gray-800 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">
//             Import
//           </button>
//           <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//             + Add Vacancy
//           </button>
//         </div>
//       </div>

//       {/* Tabs + Mobile Filter Button */}
//       <div className="flex items-center justify-between p-4 border-b dark:border-gray-700 border border-red-700">
//         {/* Tab buttons */}
//         <div className="flex space-x-2 overflow-x-auto">
//           {['ALL', 'OPEN', 'COMPLETED', 'IN PROGRESS'].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setSelectedTab(tab)}
//               className={`px-4 py-2 rounded-full border whitespace-nowrap transition
//                 ${
//                   selectedTab === tab
//                     ? 'bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-200 dark:text-blue-800'
//                     : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300'
//                 }
//               `}
//             >
//               {tab === 'ALL'
//                 ? 'All Vacancies'
//                 : tab.charAt(0).toUpperCase() + tab.slice(1).toLowerCase()}
//             </button>
//           ))}
//         </div>

//         {/* Show Filter button on mobile (xl:hidden) */}
//         <button
//           onClick={() => setIsFilterOpen(true)}
//           className="px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 xl:hidden"
//         >
//           Show Filter
//         </button>
//       </div>

//       {/* Main content & Filter */}
//       <div className="flex flex-col xl:flex-row gap-2 px-4 py-4">
//         {/* Vacancies Table */}
//         <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow border border-red-700">
//           <div className="overflow-x-auto w-full">
//             <table className="min-w-full table-auto">
//               <thead>
//                 <tr className="border-b bg-gray-50 dark:bg-gray-700 text-left text-gray-600 dark:text-gray-300 text-sm">
//                   <th className="px-6 py-3 w-10">
//                     <input type="checkbox" className="rounded focus:ring-offset-0" />
//                   </th>
//                   <th className="px-6 py-3 w-4" />
//                   <th className="px-6 py-3 font-semibold">Position Title</th>
//                   <th className="px-6 py-3 font-semibold">Location</th>
//                   <th className="px-6 py-3 font-semibold">Applicants</th>
//                   <th className="px-6 py-3 font-semibold">Status</th>
//                   <th className="px-6 py-3 font-semibold">Publication</th>
//                   <th className="px-6 py-3 font-semibold">Last 7 days</th>
//                   <th className="px-6 py-3" />
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredVacancies.map((vacancy) => (
//                   <tr
//                     key={vacancy.id}
//                     className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
//                   >
//                     <td className="px-6 py-4">
//                       <input type="checkbox" className="rounded focus:ring-offset-0" />
//                     </td>
//                     <td className="px-6 py-4">
//                       {/* Purple dot */}
//                       <div className="w-3 h-3 bg-purple-600 rounded-full" />
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap font-medium">
//                       {vacancy.title}
//                     </td>
//                     <td className="px-6 py-4">{vacancy.location}</td>
//                     <td className="px-6 py-4">
//                       <span className="font-semibold">{vacancy.applicants}</span>
//                       {vacancy.newApplicants > 0 && (
//                         <span className="ml-2 text-xs text-green-600 dark:text-green-400">
//                           ({vacancy.newApplicants} new)
//                         </span>
//                       )}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`text-xs font-medium px-2 py-1 rounded
//                           ${
//                             vacancy.status === 'OPEN'
//                               ? 'bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-800'
//                               : vacancy.status === 'COMPLETED'
//                               ? 'bg-orange-100 text-orange-700 dark:bg-orange-200 dark:text-orange-800'
//                               : 'bg-purple-100 text-purple-700 dark:bg-purple-200 dark:text-purple-800'
//                           }
//                         `}
//                       >
//                         {vacancy.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {vacancy.publication}
//                     </td>
//                     <td className="px-6 py-4">
//                       <MiniSparkline data={vacancy.chartData} />
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
//                         <BsThreeDotsVertical size={18} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="p-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400 gap-2">
//             <div>
//               Showing 1 to {filteredVacancies.length} of {vacanciesData.length} entries
//             </div>
//             <div className="flex space-x-3">
//               <button className="px-2 py-1 border rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
//                 &lt;
//               </button>
//               <button className="px-2 py-1 border rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
//                 &gt;
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* FILTER PANEL (shown only on >1280px) */}
//         <div className="hidden xl:block xl:w-80 border-l dark:border-gray-700 bg-white dark:bg-gray-800 p-6 ">
//           <FilterPanel
//             filters={filters}
//             handleFilterClick={handleFilterClick}
//             handleClearAll={handleClearAll}
//           />
//         </div>
//       </div>

//       {/* MOBILE DRAWER OVERLAY for FILTER (use FIXED so it covers entire screen) */}
//       <div
//         className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity ${
//           isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
//         } xl:hidden`}
//         onClick={() => setIsFilterOpen(false)}
//       />
//       <div
//         className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 dark:border-gray-700 border-l z-50 transform transition-transform duration-300
//           ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}
//           xl:hidden
//         `}
//       >
//         {/* Close button */}
//         <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
//           <h2 className="font-semibold text-lg">Vacancies Filter</h2>
//           <button
//             onClick={() => setIsFilterOpen(false)}
//             className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded"
//           >
//             Close
//           </button>
//         </div>
//         {/* Filter content */}
//         <div className="p-4 overflow-y-auto h-full">
//           <FilterPanel
//             filters={filters}
//             handleFilterClick={handleFilterClick}
//             handleClearAll={handleClearAll}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// // ----------------------------
// // SUPPORTING COMPONENTS
// // ----------------------------

// const FilterPanel = ({ filters, handleFilterClick, handleClearAll }) => {
//   return (
//     <>
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="font-semibold text-lg">Vacancies Filter</h2>
//         <button
//           onClick={handleClearAll}
//           className="text-blue-500 text-sm underline"
//         >
//           CLEAR ALL
//         </button>
//       </div>

//       {/* Department */}
//       <div className="mb-6">
//         <h3 className="font-medium mb-2">Department</h3>
//         <div className="flex flex-wrap gap-2">
//           {[
//             'All Department',
//             'Development',
//             'Sales & Marketing',
//             'Project Management',
//             'Support',
//             'Analytics & Data',
//           ].map((dept) => (
//             <FilterChip
//               key={dept}
//               label={dept}
//               selected={filters.department === dept}
//               onClick={() => handleFilterClick('department', dept)}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Position Type */}
//       <div className="mb-6">
//         <h3 className="font-medium mb-2">Position Type</h3>
//         <div className="flex flex-wrap gap-2">
//           {[
//             'All Positions',
//             'UX/UI Designer',
//             'PM',
//             'React Developer',
//             'QA',
//             'Data Analyst',
//             'Backend Java Developer',
//             'DevOps',
//             'Python Django Developer',
//           ].map((posType) => (
//             <FilterChip
//               key={posType}
//               label={posType}
//               selected={filters.positionType === posType}
//               onClick={() => handleFilterClick('positionType', posType)}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Work Experience */}
//       <div className="mb-6">
//         <h3 className="font-medium mb-2">Work Experience</h3>
//         <div className="flex flex-wrap gap-2">
//           {[
//             'Any Experience',
//             'Less than 1 year',
//             '1-2 years',
//             '2-3 years',
//             '3-5 years',
//             'More than 5 years',
//           ].map((we) => (
//             <FilterChip
//               key={we}
//               label={we}
//               selected={filters.workExperience === we}
//               onClick={() => handleFilterClick('workExperience', we)}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Location */}
//       <div className="mb-6">
//         <h3 className="font-medium mb-2">Location</h3>
//         <div className="flex flex-wrap gap-2">
//           {[
//             'Any Location',
//             'United States',
//             'Ukraine',
//             'Germany',
//             'France',
//             'Remote',
//           ].map((loc) => (
//             <FilterChip
//               key={loc}
//               label={loc}
//               selected={filters.location === loc}
//               onClick={() => handleFilterClick('location', loc)}
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// const MiniSparkline = ({ data }) => {
//   const options = {
//     responsive: true,
//     scales: { x: { display: false }, y: { display: false } },
//     plugins: { legend: { display: false }, tooltip: { enabled: false } },
//   };

//   const chartData = {
//     labels: data.map((_, i) => i),
//     datasets: [
//       {
//         data,
//         borderColor: 'rgb(59,130,246)', // Tailwind "blue-500"
//         fill: false,
//         tension: 0.3,
//       },
//     ],
//   };

//   return (
//     <div className="w-20 h-8">
//       <Line options={options} data={chartData} />
//     </div>
//   );
// };

// const FilterChip = ({ label, selected, onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={`px-3 py-1 text-sm rounded-full border transition
//         ${
//           selected
//             ? 'bg-blue-100 border-blue-300 text-blue-700 dark:bg-blue-200 dark:text-blue-900'
//             : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:text-gray-200'
//         }
//       `}
//     >
//       {label}
//     </button>
//   );
// };

// export default AllVacancies;



// import React, { useState } from 'react';
// import { toast } from 'react-hot-toast';
// import { BsThreeDotsVertical } from 'react-icons/bs';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const AllVacancies = () => {
//   // Sample data
//   const vacanciesData = [
//     {
//       id: 1,
//       title: 'Ruby on Rails Deve',
//       location: 'Remote',
//       applicants: 34,
//       newApplicants: 3,
//       status: 'OPEN',
//       publication: 'Sep 12 2023',
//       chartData: [10, 15, 5, 18, 13],
//       department: 'Development',
//       positionType: 'Backend Java Developer',
//       workExperience: '1-2 years',
//     },
//     {
//       id: 2,
//       title: 'iOS App Developer',
//       location: 'Dayton',
//       applicants: 122,
//       newApplicants: 33,
//       status: 'COMPLETED',
//       publication: 'Aug 02 2023',
//       chartData: [2, 5, 6, 7, 5],
//       department: 'Sales & Marketing',
//       positionType: 'UX/UI Designer',
//       workExperience: 'More than 5 years',
//     },
//     {
//       id: 3,
//       title: 'Network Administrator',
//       location: 'Phoenix',
//       applicants: 45,
//       newApplicants: 13,
//       status: 'IN PROGRESS',
//       publication: 'Aug 22 2023',
//       chartData: [4, 8, 10, 9, 12],
//       department: 'Development',
//       positionType: 'React Developer',
//       workExperience: '3-5 years',
//     },
//     {
//       id: 4,
//       title: 'JavaScript Develop',
//       location: 'Remote',
//       applicants: 57,
//       newApplicants: 5,
//       status: 'OPEN',
//       publication: 'Sep 6 2023',
//       chartData: [6, 4, 9, 11, 8],
//       department: 'Development',
//       positionType: 'React Developer',
//       workExperience: '2-3 years',
//     },
//     {
//       id: 5,
//       title: 'Graphic Designer',
//       location: 'Gotland',
//       applicants: 74,
//       newApplicants: 22,
//       status: 'OPEN',
//       publication: 'Aug 24 2023',
//       chartData: [10, 12, 15, 11, 13],
//       department: 'Sales & Marketing',
//       positionType: 'UX/UI Designer',
//       workExperience: 'Less than 1 year',
//     },
//     {
//       id: 6,
//       title: 'C++ Game Develop',
//       location: 'Munich',
//       applicants: 44,
//       newApplicants: 12,
//       status: 'IN PROGRESS',
//       publication: 'Jul 14 2023',
//       chartData: [3, 8, 8, 10, 9],
//       department: 'Development',
//       positionType: 'Backend Java Developer',
//       workExperience: '1-2 years',
//     },
//     {
//       id: 7,
//       title: 'Python Django Dev',
//       location: 'Remote',
//       applicants: 24,
//       newApplicants: 12,
//       status: 'IN PROGRESS',
//       publication: 'Jul 30 2023',
//       chartData: [0, 2, 5, 2, 4],
//       department: 'Analytics & Data',
//       positionType: 'Python Django Developer',
//       workExperience: '2-3 years',
//     },
//     {
//       id: 8,
//       title: 'iOS App Developer',
//       location: 'Kathmandu',
//       applicants: 126,
//       newApplicants: 12,
//       status: 'COMPLETED',
//       publication: 'Jun 21 2023',
//       chartData: [5, 5, 3, 5, 2],
//       department: 'Sales & Marketing',
//       positionType: 'UX/UI Designer',
//       workExperience: 'Any Experience',
//     },
//   ];

//   // Tabs (All, Open, Completed, In Progress)
//   const [selectedTab, setSelectedTab] = useState('ALL');

//   // Filters
//   const [filters, setFilters] = useState({
//     department: 'All Department',
//     positionType: 'All Positions',
//     workExperience: 'Any Experience',
//     location: 'Any Location',
//   });

//   // Toggles the filter drawer on mobile
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   // Handle a filter click
//   const handleFilterClick = (type, value) => {
//     setFilters((prev) => ({ ...prev, [type]: value }));
//     toast.success(`Filter updated: ${type} -> ${value}`);
//   };

//   // Clear all filters
//   const handleClearAll = () => {
//     setFilters({
//       department: 'All Department',
//       positionType: 'All Positions',
//       workExperience: 'Any Experience',
//       location: 'Any Location',
//     });
//     toast.success('All filters cleared!');
//   };

//   // Filter data by tab AND the other filters
//   const filteredVacancies = vacanciesData.filter((vacancy) => {
//     // 1) Filter by tab:
//     if (selectedTab === 'OPEN' && vacancy.status !== 'OPEN') return false;
//     if (selectedTab === 'COMPLETED' && vacancy.status !== 'COMPLETED') return false;
//     if (selectedTab === 'IN PROGRESS' && vacancy.status !== 'IN PROGRESS') return false;
//     // 2) Filter by department:
//     if (
//       filters.department !== 'All Department' &&
//       vacancy.department !== filters.department
//     ) {
//       return false;
//     }
//     // 3) Filter by position type:
//     if (
//       filters.positionType !== 'All Positions' &&
//       vacancy.positionType !== filters.positionType
//     ) {
//       return false;
//     }
//     // 4) Filter by work experience:
//     if (
//       filters.workExperience !== 'Any Experience' &&
//       vacancy.workExperience !== filters.workExperience
//     ) {
//       return false;
//     }
//     // 5) Filter by location:
//     if (
//       filters.location !== 'Any Location' &&
//       !vacancy.location.toLowerCase().includes(filters.location.toLowerCase())
//     ) {
//       return false;
//     }
//     return true;
//   });

//   return (
//     <div className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
//       {/* Use a custom wrapper that doesn’t impose a strict max-width */}
//       <div className="mx-auto px-4 py-4 max-w-full">
//         {/* Top bar */}
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 border-b dark:border-gray-700 gap-2">
//           <h1 className="text-xl sm:text-2xl font-semibold">Vacancies</h1>
//           <div className="flex items-center flex-wrap gap-2">
//             <button className="px-4 py-2 bg-white dark:bg-gray-800 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">
//               Import
//             </button>
//             <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//               + Add Vacancy
//             </button>
//           </div>
//         </div>

//         {/* Tabs + Mobile Filter Button */}
//         <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
//           {/* Tab buttons */}
//           <div className="flex space-x-2 overflow-x-auto">
//             {['ALL', 'OPEN', 'COMPLETED', 'IN PROGRESS'].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setSelectedTab(tab)}
//                 className={`px-4 py-2 rounded-full border whitespace-nowrap transition
//                   ${
//                     selectedTab === tab
//                       ? 'bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-200 dark:text-blue-800'
//                       : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300'
//                   }
//                 `}
//               >
//                 {tab === 'ALL'
//                   ? 'All Vacancies'
//                   : tab.charAt(0).toUpperCase() + tab.slice(1).toLowerCase()}
//               </button>
//             ))}
//           </div>

//           {/* Show Filter button on mobile (xl:hidden) */}
//           <button
//             onClick={() => setIsFilterOpen(true)}
//             className="px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 xl:hidden"
//           >
//             Show Filter
//           </button>
//         </div>

//         {/* Main content & Filter */}
//         <div className="flex flex-col xl:flex-row gap-4 py-4">
//           {/* Vacancies Table */}
//           <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow">
//             <div className="overflow-x-auto w-full">
//               <table className="min-w-full table-auto">
//                 <thead>
//                   <tr className="border-b bg-gray-50 dark:bg-gray-700 text-left text-gray-600 dark:text-gray-300 text-sm">
//                     <th className="px-6 py-3 w-10">
//                       <input type="checkbox" className="rounded focus:ring-offset-0" />
//                     </th>
//                     <th className="px-6 py-3 w-4" />
//                     <th className="px-6 py-3 font-semibold">Position Title</th>
//                     <th className="px-6 py-3 font-semibold">Location</th>
//                     <th className="px-6 py-3 font-semibold">Applicants</th>
//                     <th className="px-6 py-3 font-semibold">Status</th>
//                     <th className="px-6 py-3 font-semibold">Publication</th>
//                     <th className="px-6 py-3 font-semibold">Last 7 days</th>
//                     <th className="px-6 py-3" />
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredVacancies.map((vacancy) => (
//                     <tr
//                       key={vacancy.id}
//                       className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
//                     >
//                       <td className="px-6 py-4">
//                         <input type="checkbox" className="rounded focus:ring-offset-0" />
//                       </td>
//                       <td className="px-6 py-4">
//                         {/* Purple dot */}
//                         <div className="w-3 h-3 bg-purple-600 rounded-full" />
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap font-medium">
//                         {vacancy.title}
//                       </td>
//                       <td className="px-6 py-4">{vacancy.location}</td>
//                       <td className="px-6 py-4">
//                         <span className="font-semibold">{vacancy.applicants}</span>
//                         {vacancy.newApplicants > 0 && (
//                           <span className="ml-2 text-xs text-green-600 dark:text-green-400">
//                             ({vacancy.newApplicants} new)
//                           </span>
//                         )}
//                       </td>
//                       <td className="px-6 py-4">
//                         <span
//                           className={`text-xs font-medium px-2 py-1 rounded
//                             ${
//                               vacancy.status === 'OPEN'
//                                 ? 'bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-800'
//                                 : vacancy.status === 'COMPLETED'
//                                 ? 'bg-orange-100 text-orange-700 dark:bg-orange-200 dark:text-orange-800'
//                                 : 'bg-purple-100 text-purple-700 dark:bg-purple-200 dark:text-purple-800'
//                             }
//                           `}
//                         >
//                           {vacancy.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {vacancy.publication}
//                       </td>
//                       <td className="px-6 py-4">
//                         <MiniSparkline data={vacancy.chartData} />
//                       </td>
//                       <td className="px-6 py-4 text-right">
//                         <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
//                           <BsThreeDotsVertical size={18} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             <div className="p-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400 gap-2">
//               <div>
//                 Showing 1 to {filteredVacancies.length} of {vacanciesData.length} entries
//               </div>
//               <div className="flex space-x-3">
//                 <button className="px-2 py-1 border rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
//                   &lt;
//                 </button>
//                 <button className="px-2 py-1 border rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
//                   &gt;
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* FILTER PANEL (shown only on >1280px) */}
//           <div className="hidden xl:block xl:w-80 border-l dark:border-gray-700 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
//             <FilterPanel
//               filters={filters}
//               handleFilterClick={handleFilterClick}
//               handleClearAll={handleClearAll}
//             />
//           </div>
//         </div>
//       </div>

//       {/* MOBILE DRAWER OVERLAY for FILTER */}
//       <div
//         className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity ${
//           isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
//         } xl:hidden`}
//         onClick={() => setIsFilterOpen(false)}
//       />
//       <div
//         className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 dark:border-gray-700 border-l z-50 transform transition-transform duration-300
//           ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}
//           xl:hidden
//         `}
//       >
//         {/* Close button */}
//         <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
//           <h2 className="font-semibold text-lg">Vacancies Filter</h2>
//           <button
//             onClick={() => setIsFilterOpen(false)}
//             className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded"
//           >
//             Close
//           </button>
//         </div>
//         {/* Filter content */}
//         <div className="p-4 overflow-y-auto h-full">
//           <FilterPanel
//             filters={filters}
//             handleFilterClick={handleFilterClick}
//             handleClearAll={handleClearAll}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// // ----------------------------
// // SUPPORTING COMPONENTS
// // ----------------------------
// const FilterPanel = ({ filters, handleFilterClick, handleClearAll }) => {
//   return (
//     <>
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="font-semibold text-lg">Vacancies Filter</h2>
//         <button onClick={handleClearAll} className="text-blue-500 text-sm underline">
//           CLEAR ALL
//         </button>
//       </div>

//       {/* Department */}
//       <div className="mb-6">
//         <h3 className="font-medium mb-2">Department</h3>
//         <div className="flex flex-wrap gap-2">
//           {[
//             'All Department',
//             'Development',
//             'Sales & Marketing',
//             'Project Management',
//             'Support',
//             'Analytics & Data',
//           ].map((dept) => (
//             <FilterChip
//               key={dept}
//               label={dept}
//               selected={filters.department === dept}
//               onClick={() => handleFilterClick('department', dept)}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Position Type */}
//       <div className="mb-6">
//         <h3 className="font-medium mb-2">Position Type</h3>
//         <div className="flex flex-wrap gap-2">
//           {[
//             'All Positions',
//             'UX/UI Designer',
//             'PM',
//             'React Developer',
//             'QA',
//             'Data Analyst',
//             'Backend Java Developer',
//             'DevOps',
//             'Python Django Developer',
//           ].map((posType) => (
//             <FilterChip
//               key={posType}
//               label={posType}
//               selected={filters.positionType === posType}
//               onClick={() => handleFilterClick('positionType', posType)}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Work Experience */}
//       <div className="mb-6">
//         <h3 className="font-medium mb-2">Work Experience</h3>
//         <div className="flex flex-wrap gap-2">
//           {[
//             'Any Experience',
//             'Less than 1 year',
//             '1-2 years',
//             '2-3 years',
//             '3-5 years',
//             'More than 5 years',
//           ].map((we) => (
//             <FilterChip
//               key={we}
//               label={we}
//               selected={filters.workExperience === we}
//               onClick={() => handleFilterClick('workExperience', we)}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Location */}
//       <div className="mb-6">
//         <h3 className="font-medium mb-2">Location</h3>
//         <div className="flex flex-wrap gap-2">
//           {[
//             'Any Location',
//             'United States',
//             'Ukraine',
//             'Germany',
//             'France',
//             'Remote',
//           ].map((loc) => (
//             <FilterChip
//               key={loc}
//               label={loc}
//               selected={filters.location === loc}
//               onClick={() => handleFilterClick('location', loc)}
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// const MiniSparkline = ({ data }) => {
//   const options = {
//     responsive: true,
//     scales: { x: { display: false }, y: { display: false } },
//     plugins: { legend: { display: false }, tooltip: { enabled: false } },
//   };

//   const chartData = {
//     labels: data.map((_, i) => i),
//     datasets: [
//       {
//         data,
//         borderColor: 'rgb(59,130,246)', // Tailwind "blue-500"
//         fill: false,
//         tension: 0.3,
//       },
//     ],
//   };

//   return (
//     <div className="w-20 h-8">
//       <Line options={options} data={chartData} />
//     </div>
//   );
// };

// const FilterChip = ({ label, selected, onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={`px-3 py-1 text-sm rounded-full border transition
//         ${
//           selected
//             ? 'bg-blue-100 border-blue-300 text-blue-700 dark:bg-blue-200 dark:text-blue-900'
//             : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:text-gray-200'
//         }
//       `}
//     >
//       {label}
//     </button>
//   );
// };

// export default AllVacancies;


import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AllVacancies = () => {
  // Sample data
  const vacanciesData = [
    {
      id: 1,
      title: 'Ruby on Rails Deve',
      location: 'Remote',
      applicants: 34,
      newApplicants: 3,
      status: 'OPEN',
      publication: 'Sep 12 2023',
      chartData: [10, 15, 5, 18, 13],
      department: 'Development',
      positionType: 'Backend Java Developer',
      workExperience: '1-2 years',
    },
    {
      id: 2,
      title: 'iOS App Developer',
      location: 'Dayton',
      applicants: 122,
      newApplicants: 33,
      status: 'COMPLETED',
      publication: 'Aug 02 2023',
      chartData: [2, 5, 6, 7, 5],
      department: 'Sales & Marketing',
      positionType: 'UX/UI Designer',
      workExperience: 'More than 5 years',
    },
    {
      id: 3,
      title: 'Network Administrator',
      location: 'Phoenix',
      applicants: 45,
      newApplicants: 13,
      status: 'IN PROGRESS',
      publication: 'Aug 22 2023',
      chartData: [4, 8, 10, 9, 12],
      department: 'Development',
      positionType: 'React Developer',
      workExperience: '3-5 years',
    },
    {
      id: 4,
      title: 'JavaScript Develop',
      location: 'Remote',
      applicants: 57,
      newApplicants: 5,
      status: 'OPEN',
      publication: 'Sep 6 2023',
      chartData: [6, 4, 9, 11, 8],
      department: 'Development',
      positionType: 'React Developer',
      workExperience: '2-3 years',
    },
    {
      id: 5,
      title: 'Graphic Designer',
      location: 'Gotland',
      applicants: 74,
      newApplicants: 22,
      status: 'OPEN',
      publication: 'Aug 24 2023',
      chartData: [10, 12, 15, 11, 13],
      department: 'Sales & Marketing',
      positionType: 'UX/UI Designer',
      workExperience: 'Less than 1 year',
    },
    {
      id: 6,
      title: 'C++ Game Develop',
      location: 'Munich',
      applicants: 44,
      newApplicants: 12,
      status: 'IN PROGRESS',
      publication: 'Jul 14 2023',
      chartData: [3, 8, 8, 10, 9],
      department: 'Development',
      positionType: 'Backend Java Developer',
      workExperience: '1-2 years',
    },
    {
      id: 7,
      title: 'Python Django Dev',
      location: 'Remote',
      applicants: 24,
      newApplicants: 12,
      status: 'IN PROGRESS',
      publication: 'Jul 30 2023',
      chartData: [0, 2, 5, 2, 4],
      department: 'Analytics & Data',
      positionType: 'Python Django Developer',
      workExperience: '2-3 years',
    },
    {
      id: 8,
      title: 'iOS App Developer',
      location: 'Kathmandu',
      applicants: 126,
      newApplicants: 12,
      status: 'COMPLETED',
      publication: 'Jun 21 2023',
      chartData: [5, 5, 3, 5, 2],
      department: 'Sales & Marketing',
      positionType: 'UX/UI Designer',
      workExperience: 'Any Experience',
    },
  ];

  // Tabs (All, Open, Completed, In Progress)
  const [selectedTab, setSelectedTab] = useState('ALL');

  // Filters
  const [filters, setFilters] = useState({
    department: 'All Department',
    positionType: 'All Positions',
    workExperience: 'Any Experience',
    location: 'Any Location',
  });

  // Toggles the filter drawer on mobile
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Handle a filter click
  const handleFilterClick = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
    toast.success(`Filter updated: ${type} -> ${value}`);
  };

  // Clear all filters
  const handleClearAll = () => {
    setFilters({
      department: 'All Department',
      positionType: 'All Positions',
      workExperience: 'Any Experience',
      location: 'Any Location',
    });
    toast.success('All filters cleared!');
  };

  // Filter data by tab AND the other filters
  const filteredVacancies = vacanciesData.filter((vacancy) => {
    // 1) Filter by tab:
    if (selectedTab === 'OPEN' && vacancy.status !== 'OPEN') return false;
    if (selectedTab === 'COMPLETED' && vacancy.status !== 'COMPLETED') return false;
    if (selectedTab === 'IN PROGRESS' && vacancy.status !== 'IN PROGRESS') return false;
    // 2) Filter by department:
    if (
      filters.department !== 'All Department' &&
      vacancy.department !== filters.department
    ) {
      return false;
    }
    // 3) Filter by position type:
    if (
      filters.positionType !== 'All Positions' &&
      vacancy.positionType !== filters.positionType
    ) {
      return false;
    }
    // 4) Filter by work experience:
    if (
      filters.workExperience !== 'Any Experience' &&
      vacancy.workExperience !== filters.workExperience
    ) {
      return false;
    }
    // 5) Filter by location:
    if (
      filters.location !== 'Any Location' &&
      !vacancy.location.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      {/* Use a custom wrapper that doesn’t impose a strict max-width */}
      <div className="mx-auto px-4 py-4 max-w-full">
        {/* Top bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 border-b dark:border-gray-700 gap-2">
          <h1 className="text-xl sm:text-2xl font-semibold">Vacancies</h1>
          <div className="flex items-center flex-wrap gap-2">
            <button className="px-4 py-2 bg-white dark:bg-gray-800 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              Import
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              + Add Vacancy
            </button>
          </div>
        </div>

        {/* Tabs + Mobile Filter Button */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          {/* Tab buttons */}
          <div className="flex space-x-2 overflow-x-auto">
            {['ALL', 'OPEN', 'COMPLETED', 'IN PROGRESS'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 rounded-full border whitespace-nowrap transition
                  ${
                    selectedTab === tab
                      ? 'bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-200 dark:text-blue-800'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300'
                  }
                `}
              >
                {tab === 'ALL'
                  ? 'All Vacancies'
                  : tab.charAt(0).toUpperCase() + tab.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          {/* Show Filter button on screens < 2xl */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 2xl:hidden"
          >
            Show Filter
          </button>
        </div>

        {/* Main content & Filter */}
        <div className="flex flex-col 2xl:flex-row gap-4 py-4">
          {/* Vacancies Table */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="overflow-x-auto w-full">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="border-b bg-gray-50 dark:bg-gray-700 text-left text-gray-600 dark:text-gray-300 text-sm">
                    <th className="px-6 py-3 w-10">
                      {/* <input type="checkbox" className="rounded focus:ring-offset-0" /> */}
                    </th>
                    <th className="px-6 py-3 w-4" />
                    <th className="px-6 py-3 font-semibold">Position Title</th>
                    <th className="px-6 py-3 font-semibold">Location</th>
                    <th className="px-6 py-3 font-semibold">Applicants</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                    <th className="px-6 py-3 font-semibold">Publication</th>
                    <th className="px-6 py-3 font-semibold">Last 7 days</th>
                    <th className="px-6 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {filteredVacancies.map((vacancy) => (
                    <tr
                      key={vacancy.id}
                      className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4">
                        <input type="checkbox" className="rounded focus:ring-offset-0" />
                      </td>
                      <td className="px-6 py-4">
                        {/* Purple dot */}
                        <div className="w-3 h-3 bg-purple-600 rounded-full" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">
                        {vacancy.title}
                      </td>
                      <td className="px-6 py-4">{vacancy.location}</td>
                      <td className="px-6 py-4">
                        <span className="font-semibold">{vacancy.applicants}</span>
                        {vacancy.newApplicants > 0 && (
                          <span className="ml-2 text-xs text-green-600 dark:text-green-400">
                            ({vacancy.newApplicants} new)
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded
                            ${
                              vacancy.status === 'OPEN'
                                ? 'bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-800'
                                : vacancy.status === 'COMPLETED'
                                ? 'bg-orange-100 text-orange-700 dark:bg-orange-200 dark:text-orange-800'
                                : 'bg-purple-100 text-purple-700 dark:bg-purple-200 dark:text-purple-800'
                            }
                          `}
                        >
                          {vacancy.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {vacancy.publication}
                      </td>
                      <td className="px-6 py-4">
                        <MiniSparkline data={vacancy.chartData} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <BsThreeDotsVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400 gap-2">
              <div>
                Showing 1 to {filteredVacancies.length} of {vacanciesData.length} entries
              </div>
              <div className="flex space-x-3">
                <button className="px-2 py-1 border rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
                  &lt;
                </button>
                <button className="px-2 py-1 border rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
                  &gt;
                </button>
              </div>
            </div>
          </div>

          {/* FILTER PANEL (shown only on ≥2xl) */}
          <div className="hidden 2xl:block 2xl:w-80 border-l dark:border-gray-700 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <FilterPanel
              filters={filters}
              handleFilterClick={handleFilterClick}
              handleClearAll={handleClearAll}
            />
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER OVERLAY for FILTER (hidden on ≥2xl) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity ${
          isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } 2xl:hidden`}
        onClick={() => setIsFilterOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 dark:border-gray-700 border-l z-50 transform transition-transform duration-300
          ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}
          2xl:hidden
        `}
      >
        {/* Close button */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="font-semibold text-lg">Vacancies Filter</h2>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded"
          >
            Close
          </button>
        </div>
        {/* Filter content */}
        <div className="p-4 overflow-y-auto h-full">
          <FilterPanel
            filters={filters}
            handleFilterClick={handleFilterClick}
            handleClearAll={handleClearAll}
          />
        </div>
      </div>
    </div>
  );
};

// ----------------------------
// SUPPORTING COMPONENTS
// ----------------------------
const FilterPanel = ({ filters, handleFilterClick, handleClearAll }) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Vacancies Filter</h2>
        <button onClick={handleClearAll} className="text-blue-500 text-sm underline">
          CLEAR ALL
        </button>
      </div>

      {/* Department */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Department</h3>
        <div className="flex flex-wrap gap-2">
          {[
            'All Department',
            'Development',
            'Sales & Marketing',
            'Project Management',
            'Support',
            'Analytics & Data',
          ].map((dept) => (
            <FilterChip
              key={dept}
              label={dept}
              selected={filters.department === dept}
              onClick={() => handleFilterClick('department', dept)}
            />
          ))}
        </div>
      </div>

      {/* Position Type */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Position Type</h3>
        <div className="flex flex-wrap gap-2">
          {[
            'All Positions',
            'UX/UI Designer',
            'PM',
            'React Developer',
            'QA',
            'Data Analyst',
            'Backend Java Developer',
            'DevOps',
            'Python Django Developer',
          ].map((posType) => (
            <FilterChip
              key={posType}
              label={posType}
              selected={filters.positionType === posType}
              onClick={() => handleFilterClick('positionType', posType)}
            />
          ))}
        </div>
      </div>

      {/* Work Experience */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Work Experience</h3>
        <div className="flex flex-wrap gap-2">
          {[
            'Any Experience',
            'Less than 1 year',
            '1-2 years',
            '2-3 years',
            '3-5 years',
            'More than 5 years',
          ].map((we) => (
            <FilterChip
              key={we}
              label={we}
              selected={filters.workExperience === we}
              onClick={() => handleFilterClick('workExperience', we)}
            />
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Location</h3>
        <div className="flex flex-wrap gap-2">
          {['Any Location', 'United States', 'Ukraine', 'Germany', 'France', 'Remote'].map(
            (loc) => (
              <FilterChip
                key={loc}
                label={loc}
                selected={filters.location === loc}
                onClick={() => handleFilterClick('location', loc)}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

const MiniSparkline = ({ data }) => {
  const options = {
    responsive: true,
    scales: { x: { display: false }, y: { display: false } },
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
  };

  const chartData = {
    labels: data.map((_, i) => i),
    datasets: [
      {
        data,
        borderColor: 'rgb(59,130,246)', // Tailwind "blue-500"
        fill: false,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="w-20 h-8">
      <Line options={options} data={chartData} />
    </div>
  );
};

const FilterChip = ({ label, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-sm rounded-full border transition
        ${
          selected
            ? 'bg-blue-100 border-blue-300 text-blue-700 dark:bg-blue-200 dark:text-blue-900'
            : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:text-gray-200'
        }
      `}
    >
      {label}
    </button>
  );
};

export default AllVacancies;
