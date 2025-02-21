

// import React, { useState } from 'react';
// import { Doughnut } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { motion, AnimatePresence } from 'framer-motion';
// import { toast } from 'react-hot-toast';
// import { FaChevronDown } from 'react-icons/fa';

// // Register Chart.js components
// ChartJS.register(ArcElement, Tooltip, Legend);

// const AddressDistributionCard = () => {
//   // For the time range dropdown (Monthly, Weekly, etc.)
//   const [showDropdown, setShowDropdown] = useState(false);

//   // Dummy data for the donut chart
//   const data = {
//     labels: ['Current Address', 'Permanent Address'],
//     datasets: [
//       {
//         data: [80, 20],
//         backgroundColor: ['#3B82F6', '#F97316'], // Tailwind "blue-500" and "orange-500"
//         hoverBackgroundColor: ['#2563EB', '#EA580C'], // Tailwind "blue-600" and "orange-600"
//         borderWidth: 0,
//       },
//     ],
//   };

//   // Chart options
//   const options = {
//     cutout: '70%', // Creates the donut “hole”
//     plugins: {
//       legend: {
//         display: false, // We’ll show a custom legend below
//       },
//       tooltip: {
//         backgroundColor: '#111827', // dark BG
//         titleColor: '#F9FAFB', // light text
//         bodyColor: '#F9FAFB',
//         borderWidth: 0,
//       },
//     },
//     maintainAspectRatio: false,
//   };

//   // Toggle the dropdown
//   const handleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   // Handle changing time range
//   const handleTimeRangeChange = (range) => {
//     setTimeRange(range);
//     setShowDropdown(false);
//     // Example: show a toast when the range changes
//     toast.success(`Changed range to ${range}`);
//   };

//   return (
//     <div
//       className="
//         w-full 
//         max-w-xs
//         p-4
//         bg-white 
//         dark:bg-slate-800
//         rounded-lg
//         shadow
//         text-gray-800 
//         dark:text-gray-200
        
//       "
//     >
//       {/* Header Row */}
//       <div className="flex items-center justify-between mb-2">
//         <h2 className="font-semibold text-lg">Address Distribution</h2>
      
//       </div>

//       {/* Donut Chart */}
//       <div className="relative w-full h-40">
//         <Doughnut data={data} options={options} />
//       </div>

//       {/* Custom Legend */}
//       <div className="mt-4 flex space-x-6 justify-center">
//         {/* Current Address Legend */}
//         <div className="flex items-center space-x-2">
//           <span className="inline-block w-3 h-3 bg-blue-500 rounded-sm"></span>
//           <span className="text-sm">
//             Current Address: <strong>80%</strong>
//           </span>
//         </div>
//         {/* Permanent Address Legend */}
//         <div className="flex items-center space-x-2">
//           <span className="inline-block w-3 h-3 bg-orange-500 rounded-sm"></span>
//           <span className="text-sm">
//             Permanent Address: <strong>20%</strong>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddressDistributionCard;


// AddressDistributionCard.jsx
import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FaChevronDown } from 'react-icons/fa';
import 'chart.js/auto';
import useAddressDistributionStore from '../../../store/analytics dashboards cards/useAddressDistributionStore'; // adjust path

const AddressDistributionCard = () => {
  // 1) Get store state & actions
  const { data, loading, error, fetchDistribution } = useAddressDistributionStore();

  // 2) Fetch on mount
  useEffect(() => {
    fetchDistribution();
  }, [fetchDistribution]);

  // 3) Handle loading and error states
  if (loading) return <div>Loading Address Distribution...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null; // No data yet

  // 4) Extract from the store data
  const { currentPct, permanentPct } = data;
  // Convert string to number if needed
  const currentVal = parseFloat(currentPct) || 0;
  const permanentVal = parseFloat(permanentPct) || 0;

  // 5) Prepare Chart.js data
  const chartData = {
    labels: ['Current Address', 'Permanent Address'],
    datasets: [
      {
        data: [currentVal, permanentVal],
        backgroundColor: ['#3B82F6', '#F97316'], 
        hoverBackgroundColor: ['#2563EB', '#EA580C'],
        borderWidth: 0,
      },
    ],
  };

  // Chart options
  const options = {
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#111827',
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        borderWidth: 0,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div
      className="
        w-full 
        max-w-xs
        p-4
        bg-white 
        dark:bg-slate-800
        rounded-lg
        shadow
        text-gray-800 
        dark:text-gray-200
      "
    >
      {/* Header Row */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold text-lg">Address Distribution</h2>
      </div>

      {/* Donut Chart */}
      <div className="relative w-full h-40">
        <Doughnut data={chartData} options={options} />
      </div>

      {/* Custom Legend */}
      <div className="mt-4 flex space-x-6 justify-center">
        {/* Current Address Legend */}
        <div className="flex items-center space-x-2">
          <span className="inline-block w-3 h-3 bg-blue-500 rounded-sm"></span>
          <span className="text-sm">
            Current Address: <strong>{currentVal}%</strong>
          </span>
        </div>
        {/* Permanent Address Legend */}
        <div className="flex items-center space-x-2">
          <span className="inline-block w-3 h-3 bg-orange-500 rounded-sm"></span>
          <span className="text-sm">
            Permanent Address: <strong>{permanentVal}%</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AddressDistributionCard;
