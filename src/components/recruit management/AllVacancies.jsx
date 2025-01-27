// import React, { useState } from 'react';
// import { Tab } from '@headlessui/react';   // Optional if you want "Tabs"
// import { toast } from 'react-hot-toast';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';

// // Register the Chart.js components
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
//   // Hard-coded vacancy data
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

//   // State for the selected tab
//   const [selectedTab, setSelectedTab] = useState('ALL'); 

//   // For demonstration, track selected filters (department, position type, etc.)
//   const [filters, setFilters] = useState({
//     department: 'All Department',
//     positionType: 'All Positions',
//     workExperience: 'Any',
//     location: 'Any Location',
//   });

//   // Function to handle filter changes (for demonstration)
//   const handleFilterClick = (type, value) => {
//     setFilters(prev => ({
//       ...prev,
//       [type]: value,
//     }));
//     toast.success(`Filter updated: ${type} -> ${value}`);
//   };

//   // Filter the data based on the selected tab
//   const filteredVacancies = vacanciesData.filter((vacancy) => {
//     if (selectedTab === 'ALL') return true;
//     if (selectedTab === 'OPEN') return vacancy.status === 'OPEN';
//     if (selectedTab === 'COMPLETED') return vacancy.status === 'COMPLETED';
//     if (selectedTab === 'IN PROGRESS') return vacancy.status === 'IN PROGRESS';
//     return true;
//   });

//   return (
//     <div className="flex min-h-screen bg-gray-50 text-gray-800">
//       {/* Left Section: Main Vacancies List */}
//       <div className="flex-1 px-6 py-4">
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-2xl font-semibold">Vacancies</h1>
//           <div>
//             {/* Example: Import + Add Vacancy Buttons */}
//             <button className="mr-2 px-4 py-2 bg-white border rounded hover:bg-gray-100">
//               Import
//             </button>
//             <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//               + Add Vacancy
//             </button>
//           </div>
//         </div>

//         {/* Tabs: All, Open, Completed, In Progress */}
//         <div className="flex space-x-4 mb-6">
//           {['ALL','OPEN','COMPLETED','IN PROGRESS'].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setSelectedTab(tab)}
//               className={`${
//                 selectedTab === tab ? 'bg-blue-200 text-blue-800' : 'bg-white'
//               } px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-100 transition`}
//             >
//               {tab === 'ALL'
//                 ? 'All Vacancies'
//                 : tab.charAt(0).toUpperCase() + tab.slice(1).toLowerCase()}
//             </button>
//           ))}
//         </div>

//         {/* Vacancies Table */}
//         <div className="bg-white rounded-md shadow overflow-hidden">
//           <table className="min-w-full">
//             <thead className="bg-gray-100 text-gray-700">
//               <tr>
//                 <th className="p-4 w-12">
//                   <input type="checkbox" />
//                 </th>
//                 <th className="p-4 text-left">Position Title</th>
//                 <th className="p-4 text-left">Location</th>
//                 <th className="p-4 text-left">Applicants</th>
//                 <th className="p-4 text-left">Status</th>
//                 <th className="p-4 text-left">Publication</th>
//                 <th className="p-4 text-left">Last 7 days</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredVacancies.map((vacancy) => (
//                 <tr key={vacancy.id} className="border-b last:border-none">
//                   <td className="p-4">
//                     <input type="checkbox" />
//                   </td>
//                   <td className="p-4 whitespace-nowrap">
//                     {vacancy.title}
//                   </td>
//                   <td className="p-4">
//                     {vacancy.location}
//                   </td>
//                   <td className="p-4">
//                     <span className="font-medium">{vacancy.applicants}</span>
//                     <span className="ml-1 text-sm text-green-500">
//                       ({vacancy.newApplicants} new)
//                     </span>
//                   </td>
//                   <td className="p-4">
//                     {/* Tailwind styling for status labels */}
//                     <span
//                       className={`
//                         inline-block px-2 py-1 text-xs rounded
//                         ${
//                           vacancy.status === 'OPEN'
//                             ? 'bg-green-100 text-green-700'
//                             : vacancy.status === 'COMPLETED'
//                             ? 'bg-orange-100 text-orange-700'
//                             : 'bg-purple-100 text-purple-700'
//                         }
//                       `}
//                     >
//                       {vacancy.status}
//                     </span>
//                   </td>
//                   <td className="p-4 whitespace-nowrap">
//                     {vacancy.publication}
//                   </td>
//                   <td className="p-4">
//                     <MiniSparkline data={vacancy.chartData} />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Pagination footer (example) */}
//           <div className="p-4 flex items-center justify-between">
//             <div className="text-sm text-gray-500">
//               Showing 1 to {filteredVacancies.length} of {vacanciesData.length} entries
//             </div>
//             <div className="flex space-x-2">
//               <button className="px-3 py-1 border rounded hover:bg-gray-100"> &lt; </button>
//               <button className="px-3 py-1 border rounded hover:bg-gray-100"> &gt; </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Section: Filters */}
//       <div className="w-72 border-l bg-white p-4">
//         <h2 className="font-semibold text-lg mb-4">Vacancies Filter</h2>
//         {/* Clear All Button */}
//         <button
//           onClick={() => {
//             setFilters({
//               department: 'All Department',
//               positionType: 'All Positions',
//               workExperience: 'Any',
//               location: 'Any Location',
//             });
//             toast.success('All filters cleared!');
//           }}
//           className="text-blue-500 text-sm underline mb-4"
//         >
//           CLEAR ALL
//         </button>

//         {/* Department Filter */}
//         <div className="mb-6">
//           <h3 className="font-medium mb-2">Department</h3>
//           <div className="flex flex-wrap gap-2">
//             {[
//               'All Department',
//               'Development',
//               'Sales & Marketing',
//               'Project Management',
//               'Support',
//               'Analytics & Data',
//             ].map((dept) => (
//               <FilterChip
//                 key={dept}
//                 label={dept}
//                 selected={filters.department === dept}
//                 onClick={() => handleFilterClick('department', dept)}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Position Type */}
//         <div className="mb-6">
//           <h3 className="font-medium mb-2">Position Type</h3>
//           <div className="flex flex-wrap gap-2">
//             {[
//               'All Positions',
//               'UX/UI Designer',
//               'PM',
//               'React Developer',
//               'QA',
//               'Data Analyst',
//               'Backend Java Developer',
//               'DevOps',
//               'Python Django Developer',
//             ].map((posType) => (
//               <FilterChip
//                 key={posType}
//                 label={posType}
//                 selected={filters.positionType === posType}
//                 onClick={() => handleFilterClick('positionType', posType)}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Work Experience */}
//         <div className="mb-6">
//           <h3 className="font-medium mb-2">Work Experience</h3>
//           <div className="flex flex-wrap gap-2">
//             {[
//               'Any',
//               'Less than 1 year',
//               '1-2 years',
//               '2-3 years',
//               '3-5 years',
//               'More than 5 years',
//             ].map((we) => (
//               <FilterChip
//                 key={we}
//                 label={we}
//                 selected={filters.workExperience === we}
//                 onClick={() => handleFilterClick('workExperience', we)}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Location */}
//         <div className="mb-6">
//           <h3 className="font-medium mb-2">Location</h3>
//           <div className="flex flex-wrap gap-2">
//             {[
//               'Any Location',
//               'United States',
//               'Ukraine',
//               'Germany',
//               'France',
//               'Remote',
//             ].map((loc) => (
//               <FilterChip
//                 key={loc}
//                 label={loc}
//                 selected={filters.location === loc}
//                 onClick={() => handleFilterClick('location', loc)}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

   
//     </div>
//   );
// };

// // Mini sparkline component
// const MiniSparkline = ({ data }) => {
//   // Minimal chart options for a tiny sparkline
//   const options = {
//     responsive: true,
//     scales: {
//       x: {
//         display: false,
//       },
//       y: {
//         display: false,
//       },
//     },
//     plugins: {
//       legend: { display: false },
//       tooltip: { enabled: false },
//     },
//   };

//   const chartData = {
//     labels: data.map((_, idx) => idx),
//     datasets: [
//       {
//         data,
//         borderColor: 'rgb(59,130,246)', // Tailwind's 'blue-500'
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

// // Generic filter chip
// const FilterChip = ({ label, selected, onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={`px-3 py-1 text-sm rounded-full border ${
//         selected
//           ? 'bg-blue-100 border-blue-400 text-blue-700'
//           : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
//       }`}
//     >
//       {label}
//     </button>
//   );
// };

// export default AllVacancies;

// import React, { useState } from 'react';
// import { toast } from 'react-hot-toast';
// import { BsThreeDotsVertical, BsSunFill, BsMoonFill } from 'react-icons/bs';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';

// // Register Chart.js components
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
//   // Vacancy data
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

//   // Demo filters
//   const [filters, setFilters] = useState({
//     department: 'All Department',
//     positionType: 'All Positions',
//     workExperience: 'Any Experience',
//     location: 'Any Location',
//   });

//   // Toggles for dark mode & filter panel
 
//   const [showFilters, setShowFilters] = useState(false);

//   // Handle changing filters
//   const handleFilterClick = (type, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [type]: value,
//     }));
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
//     <div
//       className={` min-h-screen transition-colors duration-200`}
//     >
//       <div
//         className={`flex flex-col md:flex-row min-h-screen
//          bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100
//         `}
//       >
//         {/* Left Section: main content */}
//         <div className="flex-1 px-4 sm:px-6 py-4 sm:py-6 order-2 md:order-1">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-6">
//             <h1 className="text-xl sm:text-2xl font-semibold">Vacancies</h1>
//             <div className="flex items-center space-x-2">
//               {/* Dark-mode toggle */}
          

//               {/* Show/hide filters on smaller screens */}
//               <button
//                 className="p-2 rounded border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 md:hidden"
//                 onClick={() => setShowFilters(!showFilters)}
//               >
//                 Filter
//               </button>

//               <button className="px-4 py-2 bg-white dark:bg-gray-800 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">
//                 Import
//               </button>
//               <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//                 + Add Vacancy
//               </button>
//             </div>
//           </div>

//           {/* Tabs */}
//           <div className="flex space-x-4 mb-6 overflow-x-auto">
//             {['ALL', 'OPEN', 'COMPLETED', 'IN PROGRESS'].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setSelectedTab(tab)}
//                 className={`px-4 py-2 rounded-full border transition whitespace-nowrap
//                   ${
//                     selectedTab === tab
//                       ? 'bg-blue-100 border-blue-200 text-blue-700 font-medium dark:bg-blue-200 dark:text-blue-800'
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

//           {/* Vacancies Table */}
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
//             <div className="overflow-x-auto">
//               <table className="min-w-full table-auto">
//                 <thead>
//                   <tr
//                     className={`border-b
//                     bg-gray-50 dark:bg-gray-700 text-left text-gray-600 dark:text-gray-300
//                     text-sm
//                   `}
//                   >
//                     <th className="px-6 py-3 w-10">
//                       <input
//                         type="checkbox"
//                         className="rounded focus:ring-offset-0"
//                       />
//                     </th>
//                     {/* Purple bullet */}
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
//                         <input
//                           type="checkbox"
//                           className="rounded focus:ring-offset-0"
//                         />
//                       </td>
//                       {/* The purple bullet */}
//                       <td className="px-6 py-4">
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
//                           ${
//                             vacancy.status === 'OPEN'
//                               ? 'bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-800'
//                               : vacancy.status === 'COMPLETED'
//                               ? 'bg-orange-100 text-orange-700 dark:bg-orange-200 dark:text-orange-800'
//                               : 'bg-purple-100 text-purple-700 dark:bg-purple-200 dark:text-purple-800'
//                           }`}
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
//                       {/* 3-dot menu using react-icon */}
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

//             {/* Pagination footer */}
//             <div className="p-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
//               <div>
//                 Showing 1 to {filteredVacancies.length} of {vacanciesData.length}{' '}
//                 entries
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
//         </div>

//         {/* Right Section: Filters */}
//         <div
//           className={`order-1 md:order-2 w-full md:w-80 border-l dark:border-gray-700 bg-white dark:bg-gray-800
//             p-6 transform transition-transform duration-300
//             ${
//               showFilters
//                 ? 'block'
//                 : 'hidden md:block'
//             }
//           `}
//         >
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="font-semibold text-lg">Vacancies Filter</h2>
//             <button onClick={handleClearAll} className="text-blue-500 text-sm underline">
//               CLEAR ALL
//             </button>
//           </div>

//           {/* Department */}
//           <div className="mb-6">
//             <h3 className="font-medium mb-2">Department</h3>
//             <div className="flex flex-wrap gap-2">
//               {[
//                 'All Department',
//                 'Development',
//                 'Sales & Marketing',
//                 'Project Management',
//                 'Support',
//                 'Analytics & Data',
//               ].map((dept) => (
//                 <FilterChip
//                   key={dept}
//                   label={dept}
//                   selected={filters.department === dept}
//                   onClick={() => handleFilterClick('department', dept)}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Position Type */}
//           <div className="mb-6">
//             <h3 className="font-medium mb-2">Position Type</h3>
//             <div className="flex flex-wrap gap-2">
//               {[
//                 'All Positions',
//                 'UX/UI Designer',
//                 'PM',
//                 'React Developer',
//                 'QA',
//                 'Data Analyst',
//                 'Backend Java Developer',
//                 'DevOps',
//                 'Python Django Developer',
//               ].map((posType) => (
//                 <FilterChip
//                   key={posType}
//                   label={posType}
//                   selected={filters.positionType === posType}
//                   onClick={() => handleFilterClick('positionType', posType)}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Work Experience */}
//           <div className="mb-6">
//             <h3 className="font-medium mb-2">Work Experience</h3>
//             <div className="flex flex-wrap gap-2">
//               {[
//                 'Any Experience',
//                 'Less than 1 year',
//                 '1-2 years',
//                 '2-3 years',
//                 '3-5 years',
//                 'More than 5 years',
//               ].map((we) => (
//                 <FilterChip
//                   key={we}
//                   label={we}
//                   selected={filters.workExperience === we}
//                   onClick={() => handleFilterClick('workExperience', we)}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Location */}
//           <div className="mb-6">
//             <h3 className="font-medium mb-2">Location</h3>
//             <div className="flex flex-wrap gap-2">
//               {[
//                 'Any Location',
//                 'United States',
//                 'Ukraine',
//                 'Germany',
//                 'France',
//                 'Remote',
//               ].map((loc) => (
//                 <FilterChip
//                   key={loc}
//                   label={loc}
//                   selected={filters.location === loc}
//                   onClick={() => handleFilterClick('location', loc)}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Mini Sparkline
// const MiniSparkline = ({ data }) => {
//   const options = {
//     responsive: true,
//     scales: {
//       x: { display: false },
//       y: { display: false },
//     },
//     plugins: {
//       legend: { display: false },
//       tooltip: { enabled: false },
//     },
//   };

//   const chartData = {
//     labels: data.map((_, i) => i),
//     datasets: [
//       {
//         data,
//         borderColor: 'rgb(59,130,246)',
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

// // Reusable FilterChip
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
//   // Sample vacancies data
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
//     <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
//       {/* Top bar: "Vacancies" + action buttons */}
//       <div className="flex items-center justify-between px-4 py-4 border-b dark:border-gray-700">
//         <h1 className="text-xl sm:text-2xl font-semibold">Vacancies</h1>
//         <div className="flex items-center space-x-2">
//           <button className="px-4 py-2 bg-white dark:bg-gray-800 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">
//             Import
//           </button>
//           <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//             + Add Vacancy
//           </button>
//         </div>
//       </div>

//       {/* Tab buttons */}
//       <div className="flex space-x-4 p-4 border-b dark:border-gray-700 overflow-x-auto">
//         {['ALL', 'OPEN', 'COMPLETED', 'IN PROGRESS'].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setSelectedTab(tab)}
//             className={`px-4 py-2 rounded-full border whitespace-nowrap transition
//               ${
//                 selectedTab === tab
//                   ? 'bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-200 dark:text-blue-800'
//                   : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300'
//               }
//             `}
//           >
//             {tab === 'ALL'
//               ? 'All Vacancies'
//               : tab.charAt(0).toUpperCase() + tab.slice(1).toLowerCase()}
//           </button>
//         ))}
//       </div>

//       {/* Main content & Filters side by side */}
//       <div className="flex   gap-2">
//         {/* LEFT: Vacancies Table */}
//         <div className="flex-1   ">
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
//             <div className="overflow-x-auto">
//               <table className="min-w-full table-auto ">
//                 {/* Table header */}
//                 <thead>
//                   <tr className="border-b bg-gray-50 dark:bg-gray-700 text-left text-gray-600 dark:text-gray-300 text-sm ">
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
//             <div className="p-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
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
//         </div>

//         {/* RIGHT: Filter Panel */}
//         <div className="w-80 border-l p-6 dark:border-gray-700 bg-white dark:bg-gray-800  ">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="font-semibold text-lg">Vacancies Filter</h2>
//             <button
//               onClick={handleClearAll}
//               className="text-blue-500 text-sm underline"
//             >
//               CLEAR ALL
//             </button>
//           </div>

//           {/* Department */}
//           <div className="mb-6">
//             <h3 className="font-medium mb-2">Department</h3>
//             <div className="flex flex-wrap gap-2">
//               {[
//                 'All Department',
//                 'Development',
//                 'Sales & Marketing',
//                 'Project Management',
//                 'Support',
//                 'Analytics & Data',
//               ].map((dept) => (
//                 <FilterChip
//                   key={dept}
//                   label={dept}
//                   selected={filters.department === dept}
//                   onClick={() => handleFilterClick('department', dept)}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Position Type */}
//           <div className="mb-6">
//             <h3 className="font-medium mb-2">Position Type</h3>
//             <div className="flex flex-wrap gap-2">
//               {[
//                 'All Positions',
//                 'UX/UI Designer',
//                 'PM',
//                 'React Developer',
//                 'QA',
//                 'Data Analyst',
//                 'Backend Java Developer',
//                 'DevOps',
//                 'Python Django Developer',
//               ].map((posType) => (
//                 <FilterChip
//                   key={posType}
//                   label={posType}
//                   selected={filters.positionType === posType}
//                   onClick={() => handleFilterClick('positionType', posType)}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Work Experience */}
//           <div className="mb-6">
//             <h3 className="font-medium mb-2">Work Experience</h3>
//             <div className="flex flex-wrap gap-2">
//               {[
//                 'Any Experience',
//                 'Less than 1 year',
//                 '1-2 years',
//                 '2-3 years',
//                 '3-5 years',
//                 'More than 5 years',
//               ].map((we) => (
//                 <FilterChip
//                   key={we}
//                   label={we}
//                   selected={filters.workExperience === we}
//                   onClick={() => handleFilterClick('workExperience', we)}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Location */}
//           <div className="mb-6">
//             <h3 className="font-medium mb-2">Location</h3>
//             <div className="flex flex-wrap gap-2">
//               {[
//                 'Any Location',
//                 'United States',
//                 'Ukraine',
//                 'Germany',
//                 'France',
//                 'Remote',
//               ].map((loc) => (
//                 <FilterChip
//                   key={loc}
//                   label={loc}
//                   selected={filters.location === loc}
//                   onClick={() => handleFilterClick('location', loc)}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
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
  // Sample vacancies data
  const vacanciesData = [
    {
      id: 1,
      title: 'Ruby on Rails Deve',
      location: 'Rem',
      applicants: 34,
      newApplicants: 3,
      status: 'OPEN',
      publication: 'Sep 12 2023',
      chartData: [10, 15, 5, 18, 13],
    },
    {
      id: 2,
      title: 'iOS App Developer',
      location: 'Dayt',
      applicants: 122,
      newApplicants: 33,
      status: 'COMPLETED',
      publication: 'Aug 02 2023',
      chartData: [2, 5, 6, 7, 5],
    },
    {
      id: 3,
      title: 'Network Administrator',
      location: 'Phox',
      applicants: 45,
      newApplicants: 13,
      status: 'IN PROGRESS',
      publication: 'Aug 22 2023',
      chartData: [4, 8, 10, 9, 12],
    },
    {
      id: 4,
      title: 'JavaScript Develop',
      location: 'Rem',
      applicants: 57,
      newApplicants: 5,
      status: 'OPEN',
      publication: 'Sep 6 2023',
      chartData: [6, 4, 9, 11, 8],
    },
    {
      id: 5,
      title: 'Graphic Designer',
      location: 'Gotl',
      applicants: 74,
      newApplicants: 22,
      status: 'OPEN',
      publication: 'Aug 24 2023',
      chartData: [10, 12, 15, 11, 13],
    },
    {
      id: 6,
      title: 'C++ Game Develop',
      location: 'Mun',
      applicants: 44,
      newApplicants: 12,
      status: 'IN PROGRESS',
      publication: 'Jul 14 2023',
      chartData: [3, 8, 8, 10, 9],
    },
    {
      id: 7,
      title: 'Python Django Dev',
      location: 'Rem',
      applicants: 24,
      newApplicants: 12,
      status: 'IN PROGRESS',
      publication: 'Jul 30 2023',
      chartData: [0, 2, 5, 2, 4],
    },
    {
      id: 8,
      title: 'iOS App Developer',
      location: 'Kath',
      applicants: 126,
      newApplicants: 12,
      status: 'COMPLETED',
      publication: 'Jun 21 2023',
      chartData: [5, 5, 3, 5, 2],
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

  // NEW: State for opening/closing filter panel (for small screens)
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

  // Filter data by tab
  const filteredVacancies = vacanciesData.filter((vacancy) => {
    if (selectedTab === 'ALL') return true;
    if (selectedTab === 'OPEN') return vacancy.status === 'OPEN';
    if (selectedTab === 'COMPLETED') return vacancy.status === 'COMPLETED';
    if (selectedTab === 'IN PROGRESS') return vacancy.status === 'IN PROGRESS';
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      {/* Top bar: "Vacancies" + action buttons */}
      <div className="flex items-center justify-between px-4 py-4 border-b dark:border-gray-700">
        <h1 className="text-xl sm:text-2xl font-semibold">Vacancies</h1>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            Import
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            + Add Vacancy
          </button>
        </div>
      </div>

      {/* Tab buttons */}
      <div className="flex space-x-4 p-4 border-b dark:border-gray-700 overflow-x-auto">
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

      {/* 
        Add a button to toggle the filter panel on small screens. 
        This button is hidden on medium+ screens and only shown on smaller screens (e.g., md:hidden).
      */}
      <div className="flex justify-center my-4 md:hidden">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isFilterOpen ? 'Hide Vacancies Filter' : 'Show Vacancies Filter'}
        </button>
      </div>

      {/* Main content & Filters side by side */}
      <div className="flex flex-col md:flex-row gap-2">
        {/* LEFT: Vacancies Table */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                {/* Table header */}
                <thead>
                  <tr className="border-b bg-gray-50 dark:bg-gray-700 text-left text-gray-600 dark:text-gray-300 text-sm">
                    <th className="px-6 py-3 w-10">
                      <input type="checkbox" className="rounded focus:ring-offset-0" />
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
            <div className="p-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
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
        </div>

        {/* 
          RIGHT: Filter Panel 
          Use conditional classes to show/hide based on `isFilterOpen` and screen size. 
          - `hidden md:block` => hidden on small screens, visible on md+ by default
          - If isFilterOpen is true on small screens, we can override to `block`.
        */}
        <div
          className={`
            ${isFilterOpen ? 'block' : 'hidden'} 
            md:block w-full md:w-80 border-l p-6 dark:border-gray-700 
            bg-white dark:bg-gray-800
          `}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Vacancies Filter</h2>
            <button
              onClick={handleClearAll}
              className="text-blue-500 text-sm underline"
            >
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
              {[
                'Any Location',
                'United States',
                'Ukraine',
                'Germany',
                'France',
                'Remote',
              ].map((loc) => (
                <FilterChip
                  key={loc}
                  label={loc}
                  selected={filters.location === loc}
                  onClick={() => handleFilterClick('location', loc)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mini Sparkline Chart
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

// FilterChip component
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

