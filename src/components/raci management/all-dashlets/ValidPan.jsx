// import React from 'react';
// import ReactApexChart from 'react-apexcharts';

// export default function ValidPanArc() {
//   // Chart configuration + data
//   const [chartConfig] = React.useState({
//     series: [40, 50, 60], // arcs: left=40 (purple), middle=50 (pink), right=60 (green)
//     options: {
//       chart: {
//         type: 'donut',
//       },
//       labels: ['Complete', 'Pending', 'Invalid'],
//       // We'll draw a TOP half-donut (∩ shape) by setting startAngle=-90, endAngle=90
//       plotOptions: {
//         pie: {
//           startAngle: -90,
//           endAngle: 90,
//           offsetY: 0, // Adjust if needed to move the arc up/down
//           donut: {
//             size: '70%', // thickness of the donut hole
//           },
//         },
//       },
//       // Remove stroke so arcs appear seamlessly joined
//       stroke: {
//         show: true,
//         width: 0,
//       },
//       // Hide default legend (we'll build a custom one)
//       legend: {
//         show: false,
//       },
//       // Colors: purple, pink, green
//       colors: ['#9B51E0', '#FF00A8', '#C0DFA1'],
//       dataLabels: {
//         enabled: false, // Hide slice labels
//       },
//       // Slight negative bottom padding to snug the arc upward
//       grid: {
//         padding: {
//           bottom: -20,
//         },
//       },
//       responsive: [
//         {
//           breakpoint: 480,
//           options: {
//             chart: { width: 200 },
//           },
//         },
//       ],
//     },
//   });

//   // Custom legend items (top to bottom)
//   const legendItems = [
//     { label: 'Invalid', value: 60, color: '#C0DFA1' },  // green
//     { label: 'Pending', value: 50, color: '#FF00A8' },  // pink
//     { label: 'Complete', value: 40, color: '#9B51E0' }, // purple
//   ];

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md w-full ">
//       {/* Header: Title + "Monthly" dropdown */}
//       <div className="flex items-center justify-between mb-2">
//         <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
//           Valid PAN Card
//         </h3>
//         <button className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
//           Monthly
//           <svg
//             className="w-4 h-4"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//           >
//             <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.58l3.71-3.35a.75.75 0 111.04 1.08l-4.24 3.82a.75.75 0 01-1.04 0L5.21 8.29a.75.75 0 01.02-1.08z" />
//           </svg>
//         </button>
//       </div>

//       {/* Body: Custom legend on the left, top-half donut on the right */}
//       <div className="flex">
//         {/* Custom Legend */}
//         <div className="flex flex-col justify-center text-sm space-y-2 mr-4">
//           {legendItems.map((item, idx) => (
//             <div key={idx} className="flex items-center gap-2">
//               <span
//                 className="inline-block w-3 h-3 rounded-full"
//                 style={{ backgroundColor: item.color }}
//               />
//               <span className="text-gray-700 dark:text-gray-200">
//                 {item.label}: {item.value}%
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* ApexCharts half-donut (∩ shape) */}
//         <div className="relative flex-1">
//           <ReactApexChart
//             options={chartConfig.options}
//             series={chartConfig.series}
//             type="donut"
//             height={200}
//           />

//           {/* Label under the arc */}
//           <div className="absolute inset-x-0 bottom-0 text-center text-sm text-gray-700 dark:text-gray-200">
//             PAN Card
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { Doughnut } from "react-chartjs-2";
import 'chart.js/auto'; // This ensures Chart.js registers necessary chart components
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { FiChevronDown } from "react-icons/fi";

const PanCardChart = () => {
  // Dummy chart data
  const data = {
    labels: ["Invalid", "Pending", "Complete"],
    datasets: [
      {
        label: "PAN Card Status",
        data: [60, 50, 40],
        // Colors match the custom legend bullets:
        backgroundColor: ["#A3E635", "#F472B6", "#8B5CF6"],
        hoverBackgroundColor: ["#84CC16", "#EC4899", "#7C3AED"],
        borderWidth: 0,
      },
    ],
  };

  // Chart.js options
  const options = {
    cutout: "70%", // Creates a donut-hole effect
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        bodyColor: "#fff",
        backgroundColor: "#111827",
        titleColor: "#F9FAFB",
        displayColors: false,
      },
    },
  };

  const handleShowToast = () => {
    toast.success("This is a sample toast!");
  };

  return (
    <motion.div
      // Framer Motion props for entry animation
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className=" w-full max-w-sm p-4 rounded-lg shadow-sm
                 bg-white dark:bg-slate-800
                 text-gray-900 dark:text-gray-100 "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Valid PAN Card</h2>
        
        {/* Example dropdown for “Monthly” */}
        <div className="relative">
          <button
            className="inline-flex items-center px-2 py-1 text-sm font-medium 
                       bg-gray-100 dark:bg-slate-700 rounded-md 
                       hover:bg-gray-200 dark:hover:bg-slate-600
                       transition-colors"
          >
            Monthly
            <FiChevronDown className="ml-1" />
          </button>
          {/* If needed, a real dropdown can go here */}
        </div>
      </div>

      {/* Donut Chart */}
      <div className="flex items-center justify-center">
        <div className="w-40 h-40">
          <Doughnut data={data} options={options} />
        </div>
      </div>

      {/* Custom legend with color badges */}
      <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
        {/* Invalid */}
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-1">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: "#A3E635" }}
            />
            <span className="text-gray-500 dark:text-gray-400">Invalid:</span>
          </div>
          <span className="font-bold mt-1">60%</span>
        </div>

        {/* Pending */}
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-1">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: "#F472B6" }}
            />
            <span className="text-gray-500 dark:text-gray-400">Pending:</span>
          </div>
          <span className="font-bold mt-1">50%</span>
        </div>

        {/* Complete */}
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-1">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: "#8B5CF6" }}
            />
            <span className="text-gray-500 dark:text-gray-400">Complete:</span>
          </div>
          <span className="font-bold mt-1">40%</span>
        </div>
      </div>

  
    </motion.div>
  );
};

export default PanCardChart;
