// import React from 'react';
// import { Doughnut } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// // Register Chart.js components
// ChartJS.register(ArcElement, Tooltip, Legend);

// const ComplianceTrainingCoverageCard = () => {
//   // Hard-coded data
//   const completedTrainings = 68; // in percentage
//   const pendingTrainings = 32;   // in percentage

//   const data = {
//     labels: ['Completed', 'Pending'],
//     datasets: [
//       {
//         data: [completedTrainings, pendingTrainings],
//         backgroundColor: [
//           '#F97316', // Tailwind Orange-500 for "Completed"
//           '#FFEDD5', // A lighter orange (Tailwind Orange-100) for "Pending"
//         ],
//         borderWidth: 0,
//       },
//     ],
//   };

//   // Make the donut ring thicker and centered
//   const options = {
//     cutout: '70%',
//     plugins: {
//       legend: { display: false }, // We'll show a custom legend below
//       tooltip: {
//         backgroundColor: '#111827', // darker BG
//         titleColor: '#F9FAFB',      // light text
//         bodyColor: '#F9FAFB',
//       },
//     },
//     maintainAspectRatio: false, // So we can control the size easily with CSS
//   };

//   return (
//     <div
//       className="
//         w-full
//         max-w-xs
//         bg-white
//         dark:bg-slate-800
//         rounded-lg
//         shadow
//         text-gray-800
//         dark:text-gray-200
//         p-4
//         border
//       "
//     >
//       {/* Top row: icon + title */}
//       <div className="flex items-center space-x-2 mb-4">
//         {/* Replace this with your actual icon/image */}
//         <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
//           {/* Example icon placeholder */}
//           <svg
//             className="w-4 h-4 text-white"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             viewBox="0 0 24 24"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18M9 9h6m-6 4h6m-6 4h6" />
//           </svg>
//         </div>
//         <h2 className="text-base font-semibold">
//           Compliance Training Coverage
//         </h2>
//       </div>

//       {/* Donut Chart & center text */}
//       <div className="relative w-full h-52">
//         <Doughnut data={data} options={options} />

//         {/* Center text overlay */}
//         <div className="absolute inset-0 flex flex-col items-center justify-center">
//           <span className="text-2xl font-semibold">438k</span>
//           <span className="text-sm text-gray-500 dark:text-gray-400">
//             Nationality
//           </span>
//         </div>
//       </div>

//       {/* Custom Legend */}
//       <div className="mt-4 flex items-center justify-center space-x-4 flex-wrap">
//         {/* Completed */}
//         <div className="flex items-center space-x-2">
//           <span
//             className="inline-block w-3 h-3 rounded-sm"
//             style={{ backgroundColor: '#F97316' }}
//           />
//           <span className="text-sm">
//             Completed Compliance Trainings ({completedTrainings}%)
//           </span>
//         </div>
//         {/* Pending */}
//         <div className="flex items-center space-x-2">
//           <span
//             className="inline-block w-3 h-3 rounded-sm"
//             style={{ backgroundColor: '#FFEDD5' }}
//           />
//           <span className="text-sm">
//             Pending Compliance Trainings ({pendingTrainings}%)
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ComplianceTrainingCoverageCard;


// ComplianceTrainingCoverageCard.jsx
import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import useComplianceCoverageStore from '../../../store/analytics dashboards cards/useComplianceCoverageStore'; // Adjust the path

const ComplianceTrainingCoverageCard = () => {
  // 1) Get store data & actions
  const { data, loading, error, fetchCoverage } = useComplianceCoverageStore();

  // 2) Fetch coverage on mount
  useEffect(() => {
    fetchCoverage();
  }, [fetchCoverage]);

  // 3) Handle loading & error
  if (loading) return <div>Loading compliance coverage...</div>;
  if (error) return <div>Error: {error}</div>;

  // If no data yet, return null or a placeholder
  if (!data) return null;

  // 4) Extract what we need from the store
  const {
    totalUsers,
    completedCount,
    pendingCount,
    completedPercentage,
    pendingPercentage,
  } = data;

  // Convert to numeric if necessary
  const completedVal = parseFloat(completedPercentage) || 0;
  const pendingVal = parseFloat(pendingPercentage) || 0;

  // Build chart data
  const chartData = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        data: [completedVal, pendingVal],
        backgroundColor: ['#F97316', '#FFEDD5'],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#111827',
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div
      className="
        w-full
        max-w-xs
        bg-white
        dark:bg-slate-800
        rounded-lg
        shadow
        text-gray-800
        dark:text-gray-200
        p-4
        border
      "
    >
      {/* Header */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18M9 9h6m-6 4h6m-6 4h6" />
          </svg>
        </div>
        <h2 className="text-base font-semibold">Compliance Training Coverage</h2>
      </div>

      {/* Doughnut Chart */}
      <div className="relative w-full h-52">
        <Doughnut data={chartData} options={chartOptions} />
        {/* Center text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold">{totalUsers} </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
          Employees
          </span>
        </div>
      </div>

      {/* Custom Legend */}
      <div className="mt-4 flex items-center justify-center space-x-4 flex-wrap">
        {/* Completed */}
        <div className="flex items-center space-x-2">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ backgroundColor: '#F97316' }}
          />
          <span className="text-sm">
            Completed Compliance Trainings ({completedVal}%)
          </span>
        </div>

        {/* Pending */}
        <div className="flex items-center space-x-2">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ backgroundColor: '#FFEDD5' }}
          />
          <span className="text-sm">
            Pending Compliance Trainings ({pendingVal}%)
          </span>
        </div>
      </div>
    </div>
  );
};

export default ComplianceTrainingCoverageCard;
