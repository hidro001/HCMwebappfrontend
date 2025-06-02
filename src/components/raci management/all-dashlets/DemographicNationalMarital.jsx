


// import React, { useEffect } from 'react';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Doughnut } from 'react-chartjs-2';

// // Register Chart.js components once
// ChartJS.register(ArcElement, Tooltip, Legend);

// import useNationalityMaritalStore from '../../../store/analytics dashboards cards/useNationalityMaritalStore'; // Adjust path

// export default function DemographicNationalMarital() {
//   // 1) Get store state & actions
//   const { data, loading, error, fetchNationalityMarital } = useNationalityMaritalStore();

//   // 2) Fetch data on mount
//   useEffect(() => {
//     fetchNationalityMarital();
//   }, [fetchNationalityMarital]);

//   // 3) Handle loading/error states
//   if (loading) return <div>Loading Nationality &amp; Marital data...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!data) return null; // No data yet

//   // 4) Extract the data from the store
//   const { totalUsers, nationality, maritalDistribution } = data;
//   // nationality = { Indian, US, Other }
//   // maritalDistribution = { Single, Married, Divorced }

//   // ===== NATIONALITY =====
//   const totalNationality = nationality.Indian + nationality.US + nationality.Other;

//   const nationalityLabels = ['Indian', 'US', 'Other'];
//   const nationalityData = [
//     nationality.Indian,
//     nationality.US,
//     nationality.Other,
//   ];

//   const donutData = {
//     labels: nationalityLabels,
//     datasets: [
//       {
//         label: 'Nationality',
//         data: nationalityData,
//         backgroundColor: ['#F97316', '#FB923C', '#FED7AA'],
//         hoverOffset: 4,
//       },
//     ],
//   };

//   const donutOptions = {
//     plugins: {
//       legend: {
//         display: false, // We'll build a custom legend
//       },
//     },
//     cutout: '70%',
//     responsive: true,
//     maintainAspectRatio: false,
//   };

//   // ===== MARITAL DISTRIBUTION =====
//   const barData = [
//     { status: 'Single', count: maritalDistribution.Single || 0, color: '#EF4444' },
//     { status: 'Married', count: maritalDistribution.Married || 0, color: '#3B82F6' },
//     { status: 'Divorced', count: maritalDistribution.Divorced || 0, color: '#10B981' },
//   ];

//   const totalMarital = barData.reduce((acc, item) => acc + item.count, 0);

//   const maritalDistributionWithPct = barData.map((item) => {
//     const pct = totalMarital ? ((item.count / totalMarital) * 100).toFixed(1) : 0;
//     return { ...item, percentage: pct };
//   });

//   return (
//     <div className="flex flex-col w-full rounded-xl bg-white dark:bg-gray-800 shadow-2xl p-4">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2">
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/04e2c0393cad454a54528e4c4e0b761111425899cb401763f96db1c0c89a3249"
//             alt="Demographic Icon"
//             className="h-8 w-8 object-contain"
//           />
//           <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
//             Demographic (Nationality, Marital)
//           </h2>
//         </div>
//       </div>

//       {/* Donut Chart (Nationality) */}
//       <div className="relative flex flex-col items-center h-48">
//         <Doughnut data={donutData} options={donutOptions} />
//         {/* Center text overlay */}
//         <div className="absolute flex flex-col items-center justify-center top-1/2 -translate-y-1/2">
//           <span className="text-xl font-bold text-gray-700 dark:text-gray-100">
//             {totalNationality}{/* remove "k" if your data isn't in thousands */}
//           </span>
//           <span className="text-sm text-gray-500 dark:text-gray-300">
//           Employees
//           </span>
//         </div>
//       </div>

//       {/* Nationality Custom Legend */}
//       <div className="mt-2 flex flex-wrap gap-2 justify-center">
//         {nationalityLabels.map((label, i) => {
//           const val = nationalityData[i];
//           const sum = nationalityData.reduce((a, b) => a + b, 0);
//           const pct = sum ? ((val / sum) * 100).toFixed(1) : 0;

//           return (
//             <div
//               key={i}
//               className="flex items-center gap-2 rounded-full px-2 py-1 bg-gray-50 border border-gray-200 dark:bg-gray-700 dark:border-gray-600 text-sm"
//             >
//               <span
//                 className="w-3 h-3 inline-block rounded-full"
//                 style={{ backgroundColor: donutData.datasets[0].backgroundColor[i] }}
//               />
//               <span className="text-gray-700 dark:text-gray-200">
//                 {label} ({pct}%)
//               </span>
//             </div>
//           );
//         })}
//       </div>

//       {/* Separator */}
//       <div className="my-4 h-px bg-gray-200 dark:bg-gray-600"></div>

//       {/* Marital Distribution */}
//       <div>
//         <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
//           Employee Marital Status
//         </h3>

//         {/* Segmented Bar */}
//         <div className="mt-4 mb-3 flex h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
//           {maritalDistributionWithPct.map((item, idx) => (
//             <div
//               key={idx}
//               style={{
//                 width: `${item.percentage}%`,
//                 backgroundColor: item.color,
//               }}
//             />
//           ))}
//         </div>

//         {/* Legend & Counts */}
//         <div className="flex flex-col md:flex-row justify-between gap-4">
//           {/* Legend with labels */}
//           <div>
//             {maritalDistributionWithPct.map((item, idx) => (
//               <div key={idx} className="flex items-center gap-2 mb-3 last:mb-0">
//                 <span
//                   className="w-3 h-3 rounded-full"
//                   style={{ backgroundColor: item.color }}
//                 />
//                 <span className="text-gray-700 dark:text-gray-200 text-sm">
//                   {item.status}
//                 </span>
//               </div>
//             ))}
//           </div>

//           {/* Counts & Percentages */}
//           <div className="flex gap-6">
//             {/* Column of counts */}
//             <div className="flex flex-col gap-3">
//               {maritalDistributionWithPct.map((item, idx) => (
//                 <div
//                   key={idx}
//                   className="text-right text-gray-800 dark:text-gray-100 text-sm font-semibold"
//                 >
//                   {item.count} {/* remove "K" if your data isn’t in thousands */}
//                 </div>
//               ))}
//             </div>
//             {/* Column of percentages */}
//             <div className="flex flex-col gap-3">
//               {maritalDistributionWithPct.map((item, idx) => (
//                 <div
//                   key={idx}
//                   className="text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-800 rounded-full w-10 flex items-center justify-center text-sm font-semibold"
//                 >
//                   {item.percentage}%
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// import React, { useEffect } from 'react';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Doughnut } from 'react-chartjs-2';
// import { motion } from 'framer-motion';
// import { 
//   FiUsers, 
//   FiGlobe, 
//   FiHeart,
//   FiTrendingUp,
//   FiUser,
//   FiUserCheck,
//   FiUserX
// } from 'react-icons/fi';
// import { 
//   HiOutlineUserGroup,
//   HiOutlineGlobeAlt 
// } from 'react-icons/hi';

// // Register Chart.js components once
// ChartJS.register(ArcElement, Tooltip, Legend);

// import useNationalityMaritalStore from '../../../store/analytics dashboards cards/useNationalityMaritalStore'; // Adjust path

// export default function DemographicNationalMarital() {
//   const { data, loading, error, fetchNationalityMarital } = useNationalityMaritalStore();

//   useEffect(() => {
//     fetchNationalityMarital();
//   }, [fetchNationalityMarital]);

//   if (loading) {
//     return (
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="flex flex-col w-full rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl border border-gray-100 dark:border-gray-700 p-6"
//       >
//         <div className="flex items-center justify-center h-64">
//           <div className="relative">
//             <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
//             <div className="mt-4 text-gray-500 dark:text-gray-400 text-sm font-medium">
//               Loading demographic data...
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     );
//   }

//   if (error) {
//     return (
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="flex flex-col w-full rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6"
//       >
//         <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
//           <FiUserX className="w-6 h-6" />
//           <span className="font-medium">Error loading data: {error}</span>
//         </div>
//       </motion.div>
//     );
//   }

//   if (!data) return null;

//   const { totalUsers, nationality, maritalDistribution } = data;
//   const totalNationality = nationality.Indian + nationality.US + nationality.Other;

//   // Nationality Chart Data
//   const nationalityLabels = ['Indian', 'US', 'Other'];
//   const nationalityData = [nationality.Indian, nationality.US, nationality.Other];
  
//   const donutData = {
//     labels: nationalityLabels,
//     datasets: [
//       {
//         label: 'Nationality',
//         data: nationalityData,
//         backgroundColor: [
//           'rgba(59, 130, 246, 0.8)',
//           'rgba(16, 185, 129, 0.8)', 
//           'rgba(245, 158, 11, 0.8)'
//         ],
//         borderColor: [
//           'rgb(59, 130, 246)',
//           'rgb(16, 185, 129)',
//           'rgb(245, 158, 11)'
//         ],
//         borderWidth: 2,
//         hoverBackgroundColor: [
//           'rgba(59, 130, 246, 1)',
//           'rgba(16, 185, 129, 1)',
//           'rgba(245, 158, 11, 1)'
//         ],
//         hoverOffset: 8,
//       },
//     ],
//   };

//   const donutOptions = {
//     plugins: {
//       legend: { display: false },
//       tooltip: {
//         backgroundColor: 'rgba(0, 0, 0, 0.8)',
//         titleColor: 'white',
//         bodyColor: 'white',
//         borderColor: 'rgba(255, 255, 255, 0.1)',
//         borderWidth: 1,
//         cornerRadius: 8,
//         displayColors: true,
//         callbacks: {
//           label: function(context) {
//             const percentage = ((context.parsed / totalNationality) * 100).toFixed(1);
//             return `${context.label}: ${context.parsed} (${percentage}%)`;
//           }
//         }
//       }
//     },
//     cutout: '65%',
//     responsive: true,
//     maintainAspectRatio: false,
//     animation: {
//       animateRotate: true,
//       duration: 1500,
//       easing: 'easeInOutQuart'
//     }
//   };

//   // Marital Distribution Data
//   const barData = [
//     { status: 'Single', count: maritalDistribution.Single || 0, color: '#EF4444', icon: FiUser },
//     { status: 'Married', count: maritalDistribution.Married || 0, color: '#3B82F6', icon: FiHeart },
//     { status: 'Divorced', count: maritalDistribution.Divorced || 0, color: '#10B981', icon: FiUserCheck },
//   ];

//   const totalMarital = barData.reduce((acc, item) => acc + item.count, 0);
//   const maritalDistributionWithPct = barData.map((item) => ({
//     ...item,
//     percentage: totalMarital ? ((item.count / totalMarital) * 100).toFixed(1) : 0
//   }));

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="flex flex-col w-full rounded-2xl bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-850 dark:to-gray-900 shadow-xl border border-gray-100 dark:border-gray-700 p-6 hover:shadow-2xl transition-all duration-300"
//     >
//       {/* Header */}
//       <motion.div 
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 0.1 }}
//         className="flex items-center justify-between mb-6"
//       >
//         <div className="flex items-center gap-3">
//           <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
//             <HiOutlineUserGroup className="h-6 w-6 text-white" />
//           </div>
//           <div>
//             <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
//               Demographics
//             </h2>
//             <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
//               Nationality & Marital Status
//             </p>
//           </div>
//         </div>
//         <motion.div 
//           whileHover={{ scale: 1.05 }}
//           className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-700"
//         >
//           <FiTrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
//           <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
//             {totalUsers.toLocaleString()}
//           </span>
//         </motion.div>
//       </motion.div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Nationality Section */}
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.2 }}
//           className="flex flex-col"
//         >
//           {/* Section Header */}
//           <div className="flex items-center gap-2 mb-4">
//             <HiOutlineGlobeAlt className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//             <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
//               Nationality Distribution
//             </h3>
//           </div>

//           {/* Donut Chart */}
//           <div className="relative flex flex-col items-center h-48 mb-4">
//             <Doughnut data={donutData} options={donutOptions} />
//             <motion.div 
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
//               className="absolute flex flex-col items-center justify-center top-1/2 -translate-y-1/2"
//             >
//               <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 {totalNationality.toLocaleString()}
//               </span>
//               <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
//                 Employees
//               </span>
//             </motion.div>
//           </div>

//           {/* Nationality Legend */}
//           <div className="flex flex-wrap gap-2 justify-center">
//             {nationalityLabels.map((label, i) => {
//               const val = nationalityData[i];
//               const sum = nationalityData.reduce((a, b) => a + b, 0);
//               const pct = sum ? ((val / sum) * 100).toFixed(1) : 0;

//               return (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 + (i * 0.1) }}
//                   whileHover={{ scale: 1.05 }}
//                   className="flex items-center gap-2 rounded-full px-3 py-2 bg-white dark:bg-gray-700 shadow-md border border-gray-200 dark:border-gray-600 text-sm hover:shadow-lg transition-all duration-200"
//                 >
//                   <span
//                     className="w-3 h-3 rounded-full shadow-sm"
//                     style={{ backgroundColor: donutData.datasets[0].backgroundColor[i] }}
//                   />
//                   <span className="font-medium text-gray-700 dark:text-gray-200">
//                     {label}
//                   </span>
//                   <span className="text-gray-500 dark:text-gray-400 text-xs">
//                     {pct}%
//                   </span>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </motion.div>

//         {/* Marital Status Section */}
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.3 }}
//           className="flex flex-col"
//         >
//           {/* Section Header */}
//           <div className="flex items-center gap-2 mb-4">
//             <FiHeart className="w-5 h-5 text-pink-600 dark:text-pink-400" />
//             <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
//               Marital Status
//             </h3>
//           </div>

//           {/* Segmented Progress Bar */}
//           <motion.div 
//             initial={{ width: 0 }}
//             animate={{ width: '100%' }}
//             transition={{ delay: 0.5, duration: 1 }}
//             className="mb-6 flex h-4 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700 shadow-inner"
//           >
//             {maritalDistributionWithPct.map((item, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ width: 0 }}
//                 animate={{ width: `${item.percentage}%` }}
//                 transition={{ delay: 0.7 + (idx * 0.1), duration: 0.8 }}
//                 style={{ backgroundColor: item.color }}
//                 className="transition-all duration-300 hover:brightness-110"
//               />
//             ))}
//           </motion.div>

//           {/* Status Cards */}
//           <div className="space-y-3">
//             {maritalDistributionWithPct.map((item, idx) => {
//               const IconComponent = item.icon;
//               return (
//                 <motion.div
//                   key={idx}
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.4 + (idx * 0.1) }}
//                   whileHover={{ scale: 1.02, x: 4 }}
//                   className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-all duration-200"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div 
//                       className="p-2 rounded-lg shadow-sm"
//                       style={{ backgroundColor: `${item.color}20` }}
//                     >
//                       <IconComponent 
//                         className="w-4 h-4" 
//                         style={{ color: item.color }}
//                       />
//                     </div>
//                     <span className="font-medium text-gray-700 dark:text-gray-200">
//                       {item.status}
//                     </span>
//                   </div>
                  
//                   <div className="flex items-center gap-3">
//                     <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
//                       {item.count.toLocaleString()}
//                     </span>
//                     <div 
//                       className="px-2 py-1 rounded-full text-xs font-semibold text-white shadow-sm min-w-[3rem] text-center"
//                       style={{ backgroundColor: item.color }}
//                     >
//                       {item.percentage}%
//                     </div>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </motion.div>
//       </div>

//       {/* Footer Stats */}
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.6 }}
//         className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600"
//       >
//         <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
//           <div className="flex items-center gap-1">
//             <FiUsers className="w-4 h-4" />
//             <span>Total: {totalUsers.toLocaleString()}</span>
//           </div>
//           <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
//           <div className="flex items-center gap-1">
//             <FiGlobe className="w-4 h-4" />
//             <span>{nationalityLabels.length} Countries</span>
//           </div>
//           <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
//           <div className="flex items-center gap-1">
//             <FiTrendingUp className="w-4 h-4" />
//             <span>Updated Now</span>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }


import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { 
  FiUsers, 
  FiGlobe, 
  FiHeart,
  FiTrendingUp,
  FiUser,
  FiUserCheck,
  FiUserX
} from 'react-icons/fi';
import { 
  HiOutlineUserGroup,
  HiOutlineGlobeAlt 
} from 'react-icons/hi';

// Register Chart.js components once
ChartJS.register(ArcElement, Tooltip, Legend);

import useNationalityMaritalStore from '../../../store/analytics dashboards cards/useNationalityMaritalStore'; // Adjust path

export default function DemographicNationalMarital() {
  const { data, loading, error, fetchNationalityMarital } = useNationalityMaritalStore();

  useEffect(() => {
    fetchNationalityMarital();
  }, [fetchNationalityMarital]);

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col w-full rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl border border-gray-100 dark:border-gray-700 p-6"
      >
        <div className="flex items-center justify-center h-64">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="mt-4 text-gray-500 dark:text-gray-400 text-sm font-medium">
              Loading demographic data...
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col w-full rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6"
      >
        <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
          <FiUserX className="w-6 h-6" />
          <span className="font-medium">Error loading data: {error}</span>
        </div>
      </motion.div>
    );
  }

  if (!data) return null;

  const { totalUsers, nationality, maritalDistribution } = data;
  const totalNationality = nationality.Indian + nationality.US + nationality.Other;

  // Nationality Chart Data
  const nationalityLabels = ['Indian', 'US', 'Other'];
  const nationalityData = [nationality.Indian, nationality.US, nationality.Other];
  
  const donutData = {
    labels: nationalityLabels,
    datasets: [
      {
        label: 'Nationality',
        data: nationalityData,
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)', 
          'rgba(245, 158, 11, 0.8)'
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)'
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)'
        ],
        hoverOffset: 8,
      },
    ],
  };

  const donutOptions = {
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            const percentage = ((context.parsed / totalNationality) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '65%',
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      animateRotate: true,
      duration: 1500,
      easing: 'easeInOutQuart'
    }
  };

  // Marital Distribution Data
  const barData = [
    { status: 'Single', count: maritalDistribution.Single || 0, color: '#EF4444', icon: FiUser },
    { status: 'Married', count: maritalDistribution.Married || 0, color: '#3B82F6', icon: FiHeart },
    { status: 'Divorced', count: maritalDistribution.Divorced || 0, color: '#10B981', icon: FiUserCheck },
  ];

  const totalMarital = barData.reduce((acc, item) => acc + item.count, 0);
  const maritalDistributionWithPct = barData.map((item) => ({
    ...item,
    percentage: totalMarital ? ((item.count / totalMarital) * 100).toFixed(1) : 0
  }));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col w-full max-w-full rounded-2xl bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-850 dark:to-gray-900 shadow-xl border border-gray-100 dark:border-gray-700 p-4 sm:p-6 hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
            <HiOutlineUserGroup className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
              Demographics
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Nationality & Marital Status
            </p>
          </div>
        </div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-700"
        >
          <FiTrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
            {totalUsers.toLocaleString()}
          </span>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* Nationality Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col order-1 xl:order-1"
        >
          {/* Section Header */}
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <HiOutlineGlobeAlt className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
              Nationality Distribution
            </h3>
          </div>

          {/* Donut Chart */}
          <div className="relative flex flex-col items-center h-40 sm:h-48 lg:h-52 mb-3 sm:mb-4">
            <Doughnut data={donutData} options={donutOptions} />
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="absolute flex flex-col items-center justify-center top-1/2 -translate-y-1/2"
            >
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {totalNationality.toLocaleString()}
              </span>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                Employees
              </span>
            </motion.div>
          </div>

          {/* Nationality Legend */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
            {nationalityLabels.map((label, i) => {
              const val = nationalityData[i];
              const sum = nationalityData.reduce((a, b) => a + b, 0);
              const pct = sum ? ((val / sum) * 100).toFixed(1) : 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-1.5 sm:gap-2 rounded-full px-2 sm:px-3 py-1.5 sm:py-2 bg-white dark:bg-gray-700 shadow-md border border-gray-200 dark:border-gray-600 text-xs sm:text-sm hover:shadow-lg transition-all duration-200"
                >
                  <span
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shadow-sm flex-shrink-0"
                    style={{ backgroundColor: donutData.datasets[0].backgroundColor[i] }}
                  />
                  <span className="font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                    {label}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs whitespace-nowrap">
                    {pct}%
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Marital Status Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col order-2 xl:order-2"
        >
          {/* Section Header */}
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <FiHeart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600 dark:text-pink-400" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
              Marital Status
            </h3>
          </div>

          {/* Segmented Progress Bar */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mb-4 sm:mb-6 flex h-3 sm:h-4 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700 shadow-inner"
          >
            {maritalDistributionWithPct.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{ delay: 0.7 + (idx * 0.1), duration: 0.8 }}
                style={{ backgroundColor: item.color }}
                className="transition-all duration-300 hover:brightness-110"
              />
            ))}
          </motion.div>

          {/* Status Cards */}
          <div className="space-y-2 sm:space-y-3">
            {maritalDistributionWithPct.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (idx * 0.1) }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <div 
                      className="p-1.5 sm:p-2 rounded-lg shadow-sm flex-shrink-0"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <IconComponent 
                        className="w-3 h-3 sm:w-4 sm:h-4" 
                        style={{ color: item.color }}
                      />
                    </div>
                    <span className="font-medium text-gray-700 dark:text-gray-200 text-sm sm:text-base truncate">
                      {item.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    <span className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100">
                      {item.count.toLocaleString()}
                    </span>
                    <div 
                      className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-semibold text-white shadow-sm min-w-[2.5rem] sm:min-w-[3rem] text-center"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.percentage}%
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Footer Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-600"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <FiUsers className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Total: {totalUsers.toLocaleString()}</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
          <div className="flex items-center gap-1">
            <FiGlobe className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{nationalityLabels.length} Countries</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
          <div className="flex items-center gap-1">
            <FiTrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Updated Now</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}