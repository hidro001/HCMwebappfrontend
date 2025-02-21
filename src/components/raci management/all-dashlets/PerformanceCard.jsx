// import React from 'react';
// import { motion } from 'framer-motion';
// import { toast } from 'react-hot-toast';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { FiTrendingUp } from 'react-icons/fi';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const PerformanceCard = () => {
//   // Dummy line-chart data
//   const data = {
//     labels: ['IT', 'Sales', 'Ops', 'Marketing', 'Designing', 'Finance'],
//     datasets: [
//       {
//         label: 'Performance Score',
//         data: [22000, 35000, 2500, 30000, 40000, 28000],
//         fill: true,
//         borderColor: '#3B82F6', // Tailwind's blue-500
//         backgroundColor: 'rgba(59, 130, 246, 0.15)', // semi-transparent
//         pointBackgroundColor: '#3B82F6',
//         pointBorderColor: '#fff',
//         tension: 0.4, // makes the line smoother
//       },
//     ],
//   };

//   // Chart display options
//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           color: '#a1a1aa', // text-gray-400 (light mode), override with dark
//         },
//       },
//       x: {
//         ticks: {
//           color: '#a1a1aa',
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         intersect: false,
//         mode: 'index',
//         // Example custom color or styling here
//       },
//     },
//   };

//   return (
//     <motion.div
//       className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md w-full mx-auto "
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       {/* Header / Title */}
//       <div className="flex items-center justify-between mb-3">
//         <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
//           Tenure Analysis (Performance Scores by Dept.)
//         </h2>
//         <FiTrendingUp className="text-gray-600 dark:text-gray-300" size={20} />
//       </div>

//       {/* Chart Container */}
//       <div className="relative h-60">
//         <Line data={data} options={options} />
//       </div>
//     </motion.div>
//   );
// };

// export default PerformanceCard;

// import React from "react";
// // 1) React Chart.js 2
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// // 2) Chart.js Zoom Plugin
// import zoomPlugin from "chartjs-plugin-zoom";

// // 3) Register Chart.js components + plugins
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   zoomPlugin
// );

// const PerformanceCard = () => {
//   // Example: 20 departments
//   const departmentLabels = [
//     "Dept A",
//     "Dept B",
//     "Dept C",
//     "Dept D",
//     "Dept E",
//     "Dept F",
//     "Dept G",
//     "Dept H",
//     "Dept I",
//     "Dept J",
//     "Dept K",
//     "Dept L",
//     "Dept M",
//     "Dept N",
//     "Dept O",
//     "Dept P",
//     "Dept Q",
//     "Dept R",
//     "Dept S",
//     "Dept T",
//   ];

//   // Sample data (Performance Scores or any metric)
//   const departmentData = [
//     3.1, 3.8, 4.0, 2.9, 4.4,
//     3.2, 4.2, 3.9, 4.1, 3.5,
//     3.6, 2.8, 4.3, 4.0, 3.7,
//     3.9, 3.3, 4.6, 4.1, 3.0,
//   ];

//   // Define a color for each bar (20 items)
//   const barColors = [
//     "rgba(255, 99, 132, 0.7)",
//     "rgba(54, 162, 235, 0.7)",
//     "rgba(255, 206, 86, 0.7)",
//     "rgba(75, 192, 192, 0.7)",
//     "rgba(153, 102, 255, 0.7)",
//     "rgba(255, 159, 64, 0.7)",
//     "rgba(199, 199, 199, 0.7)",
//     "rgba(255, 99, 255, 0.7)",
//     "rgba(54, 235, 162, 0.7)",
//     "rgba(235, 162, 54, 0.7)",
//     "rgba(102, 255, 153, 0.7)",
//     "rgba(159, 64, 255, 0.7)",
//     "rgba(99, 255, 132, 0.7)",
//     "rgba(192, 75, 192, 0.7)",
//     "rgba(206, 255, 86, 0.7)",
//     "rgba(102, 153, 255, 0.7)",
//     "rgba(255, 199, 199, 0.7)",
//     "rgba(86, 255, 206, 0.7)",
//     "rgba(64, 159, 255, 0.7)",
//     "rgba(255, 255, 99, 0.7)",
//   ];

//   // Chart.js dataset object
//   const data = {
//     labels: departmentLabels,
//     datasets: [
//       {
//         label: "Performance Score",
//         data: departmentData,
//         backgroundColor: barColors,
//         borderColor: "rgba(0, 0, 0, 0.1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Chart options (zoom & pan, etc.)
//   const options = {
//     responsive: false, // We'll control width/height via Tailwind + scroll
//     plugins: {
//       title: {
//         display: true,
//         text: "Performance Scores by Department (20+)",
//         color: "#fff", // for dark mode, or dynamically switch
//       },
//       legend: {
//         display: true,
//         position: "bottom",
//         labels: {
//           color: "#fff", // legend text color in dark mode
//         },
//       },
//       zoom: {
//         zoom: {
//           wheel: {
//             enabled: true, // mouse wheel to zoom
//           },
//           pinch: {
//             enabled: true, // touch trackpad pinch
//           },
//           mode: "x",
//         },
//         pan: {
//           enabled: true,
//           mode: "x",
//         },
//       },
//     },
//     scales: {
//       x: {
//         ticks: { color: "#fff" },
//         title: {
//           display: true,
//           text: "Departments",
//           color: "#fff",
//         },
//       },
//       y: {
//         beginAtZero: true,
//         ticks: { color: "#fff" },
//         title: {
//           display: true,
//           text: "Performance Score",
//           color: "#fff",
//         },
//       },
//     },
//   };

//   return (
//     <div className="dark:bg-gray-900 text-white min-h-screen p-4">
//       <h1 className="text-2xl font-bold mb-4">Wide Chart with Zoom &amp; Pan</h1>

//       {/* 
//         Container that is wide, scrollable horizontally, 
//         so you can fit all 20 bars. 
//       */}
//       <div className="border border-gray-300 p-2 max-w-[95vw] overflow-x-auto">
//         {/* 
//           The actual width of chart is 1800px 
//           (You can adjust as needed). 
//           `relative` -> so chart doesn't shrink.
//         */}
//         <div className="w-[1800px] h-[500px] relative">
//           {/* Bar chart from react-chartjs-2 */}
//           <Bar data={data} options={options} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PerformanceCard;





// import React from "react";
// // 1) React Chart.js 2
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// // 2) Chart.js Zoom Plugin
// import zoomPlugin from "chartjs-plugin-zoom";

// // 3) Register Chart.js components + plugins
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   zoomPlugin
// );

// const PerformanceCard = () => {
//   // Example: 20 departments
//   const departmentLabels = [
//     "Dept A", "Dept B", "Dept C", "Dept D", "Dept E",
//     "Dept F", "Dept G", "Dept H", "Dept I", "Dept J",
 
//   ];

//   // Sample data (Performance Scores or any metric)
//   const departmentData = [
//     3.1, 3.8, 4.0, 2.9, 4.4,
//     3.2, 4.2, 3.9, 4.1, 3.5,
//     3.6, 2.8, 4.3, 4.0, 3.7,
//     3.9, 3.3, 4.6, 4.1, 3.0,
//   ];

//   // Define a color for each bar (20 items)
//   const barColors = [
//     "rgba(255, 99, 132, 0.7)",
//     "rgba(54, 162, 235, 0.7)",
//     "rgba(255, 206, 86, 0.7)",
//     "rgba(75, 192, 192, 0.7)",
//     "rgba(153, 102, 255, 0.7)",
//     "rgba(255, 159, 64, 0.7)",
//     "rgba(199, 199, 199, 0.7)",
//     "rgba(255, 99, 255, 0.7)",
//     "rgba(54, 235, 162, 0.7)",
//     "rgba(235, 162, 54, 0.7)",
//     "rgba(102, 255, 153, 0.7)",
//     "rgba(159, 64, 255, 0.7)",
//     "rgba(99, 255, 132, 0.7)",
//     "rgba(192, 75, 192, 0.7)",

//   ];

//   // Chart.js dataset object
//   const data = {
//     labels: departmentLabels,
//     datasets: [
//       {
//         label: "Performance Score",
//         data: departmentData,
//         backgroundColor: barColors,
//         borderColor: "rgba(0, 0, 0, 0.1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Chart options (zoom & pan, etc.)
//   const options = {
//     // Make chart fill its container and stay responsive
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       title: {
//         display: true,
//         text: "Performance Scores by Department",
//         color: "#fff", // for dark mode, or dynamically switch
//       },
//       legend: {
//         display: true,
//         position: "bottom",
//         labels: {
//           color: "#fff", // legend text color in dark mode
//         },
//       },
//       zoom: {
//         zoom: {
//           wheel: {
//             enabled: true, // mouse wheel to zoom
//           },
//           pinch: {
//             enabled: true, // touch trackpad pinch
//           },
//           mode: "x",
//         },
//         pan: {
//           enabled: true,
//           mode: "x",
//         },
//       },
//     },
//     scales: {
//       x: {
//         ticks: { color: "#fff" },
//         title: {
//           display: true,
//           text: "Departments",
//           color: "#fff",
//         },
//       },
//       y: {
//         beginAtZero: true,
//         ticks: { color: "#fff" },
//         title: {
//           display: true,
//           text: "Performance Score",
//           color: "#fff",
//         },
//       },
//     },
//   };

//   return (
//     <div className="dark:bg-gray-800 text-white  p-4">
//       <h1 className="text-2xl font-bold mb-4">Wide Chart with Zoom &amp; Pan</h1>

   
//       <div className="border border-gray-300 p-2" style={{ height: "60vh" }}>
//         <Bar data={data} options={options} />
//       </div>
//     </div>
//   );
// };

// export default PerformanceCard;


// import React, { useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
// import 'chart.js/auto'; // ensures Chart.js registers necessary components
// import useTenurePerformanceStore from '../../../store/analytics dashboards cards/useTenurePerformanceStore'; // Adjust path

// const PerformanceCard = () => {
//   // 1) Zustand store
//   const { data, loading, error, fetchTenurePerformance } = useTenurePerformanceStore();

//   // 2) On mount, fetch aggregator data
//   useEffect(() => {
//     fetchTenurePerformance();
//   }, [fetchTenurePerformance]);

//   // 3) Handle loading / error states
//   if (loading) return <div>Loading performance data...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!data) return <div>No data yet</div>;

//   // data = [ { department, tenureRange, averageScore }, ... ]
//   // We want to produce a grouped bar chart:
//   // x-axis => department
//   // multiple bars => "0-1 year", "1-2 years", etc.

//   // 4) Identify unique departments + tenureRanges
//   const departments = [...new Set(data.map(d => d.department))];
//   const ranges = [...new Set(data.map(d => d.tenureRange))];

//   // 5) Build a dataset for each tenureRange
//   const datasets = ranges.map(range => {
//     const scores = departments.map(dep => {
//       const found = data.find(item => item.department === dep && item.tenureRange === range);
//       return found ? found.averageScore : 0;
//     });
//     return {
//       label: range,
//       data: scores,
//       backgroundColor: pickColorForRange(range),
//     };
//   });

//   // 6) Chart data
//   const chartData = {
//     labels: departments,
//     datasets,
//   };

//   // 7) Chart options
//   const options = {
//     responsive: true,
//     plugins: {
//       title: {
//         display: true,
//         text: 'Dept Performance by Tenure Range',
//       },
//       legend: {
//         position: 'bottom',
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 5, // rating is 1..5
//       },
//     },
//   };

//   return (
//     <div >
//       <h2 className="text-xl font-semibold mb-4">Performance by Dept + Tenure Range</h2>
//       <Bar data={chartData} options={options} />
//     </div>
//   );
// };

// // 8) Helper to pick colors for each tenure range
// function pickColorForRange(range) {
//   switch (range) {
//     case '0-1 year':  return 'rgba(54, 162, 235, 0.7)';
//     case '1-2 years': return 'rgba(255, 99, 132, 0.7)';
//     case '2-3 years': return 'rgba(255, 205, 86, 0.7)';
//     case '3-5 years': return 'rgba(75, 192, 192, 0.7)';
//     case '5-10 years': return 'rgba(153, 102, 255, 0.7)';
//     case '10+ years': return 'rgba(255, 159, 64, 0.7)';
//     default: return 'rgba(201, 203, 207, 0.7)';
//   }
// }

// export default PerformanceCard;


// import React, { useEffect } from "react";
// // 1) React Chart.js 2
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// // 2) Chart.js Zoom Plugin
// import zoomPlugin from "chartjs-plugin-zoom";

// // 3) Register Chart.js components + plugins
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   zoomPlugin
// );

// import useTenurePerformanceStore from '../../../store/analytics dashboards cards/useTenurePerformanceStore'; 

// const PerformanceCard = () => {
//   // 4) Zustand store
//   const { data, loading, error, fetchTenurePerformance } = useTenurePerformanceStore();

//   // 5) On mount, fetch aggregator data
//   useEffect(() => {
//     fetchTenurePerformance();
//   }, [fetchTenurePerformance]);

//   if (loading) return <div>Loading performance data...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!data) return <div>No data yet</div>;

//   // data = [ { department, tenureRange, averageScore }, ... ]
//   // We want to group by department on x-axis, multiple bars for each tenure range.

//   // 6) Identify unique departments + tenureRanges
//   const departments = [...new Set(data.map(d => d.department))];
//   const ranges = [...new Set(data.map(d => d.tenureRange))];

//   // 7) Build a dataset for each tenureRange
//   const datasets = ranges.map(range => {
//     // For each department, find the averageScore if any
//     const scores = departments.map(dep => {
//       const found = data.find(item => item.department === dep && item.tenureRange === range);
//       return found ? found.averageScore : 0;
//     });
//     return {
//       label: range,
//       data: scores,
//       backgroundColor: pickColorForRange(range),
//     };
//   });

//   // 8) Prepare chart data
//   const chartData = {
//     labels: departments,
//     datasets,
//   };

//   // 9) Configure chart options + zoom
//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       title: {
//         display: true,
//         text: "Dept Performance by Tenure Range",
//       },
//       legend: {
//         position: "bottom",
//       },
//       zoom: {
//         zoom: {
//           wheel: { enabled: true },    // mouse wheel to zoom
//           pinch: { enabled: true },    // touch pinch to zoom
//           mode: "x",                   // zoom in x-axis
//         },
//         pan: {
//           enabled: true,
//           mode: "x",                   // pan along x-axis
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 5, // rating scale is 1..5
//       },
//     },
//   };

//   return (
//     <div className="dark:bg-gray-800 text-white p-4" style={{ }}>
//       <h2 className="text-2xl font-bold mb-4">Performance by Dept & TenureRange (Zoom & Pan)</h2>
//       <div className="border border-gray-300 p-2 h-full">
//         <Bar data={chartData} options={options} />
//       </div>
//     </div>
//   );
// };

// // A helper function to pick a color for each tenure range
// function pickColorForRange(range) {
//   switch (range) {
//     case "0-1 year":   return "rgba(54, 162, 235, 0.7)";
//     case "1-2 years":  return "rgba(255, 99, 132, 0.7)";
//     case "2-3 years":  return "rgba(255, 205, 86, 0.7)";
//     case "3-5 years":  return "rgba(75, 192, 192, 0.7)";
//     case "5-10 years": return "rgba(153, 102, 255, 0.7)";
//     case "10+ years":  return "rgba(255, 159, 64, 0.7)";
//     default:           return "rgba(201, 203, 207, 0.7)";
//   }
// }

// export default PerformanceCard;


// import React, { useEffect } from "react";
// // 1) React Chart.js 2
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// // 2) Chart.js Zoom Plugin
// import zoomPlugin from "chartjs-plugin-zoom";

// // 3) Register Chart.js components + plugins
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   zoomPlugin
// );

// import useTenurePerformanceStore from "../../../store/analytics dashboards cards/useTenurePerformanceStore";

// const PerformanceCard = () => {
//   // 4) Zustand store
//   const { data, loading, error, fetchTenurePerformance } = useTenurePerformanceStore();

//   // 5) On mount, fetch aggregator data
//   useEffect(() => {
//     fetchTenurePerformance();
//   }, [fetchTenurePerformance]);

//   // 6) Handle states
//   if (loading) {
//     return (
//       <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded shadow">
//         <p className="text-gray-800 dark:text-gray-200">Loading performance data...</p>
//       </div>
//     );
//   }
//   if (error) {
//     return (
//       <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded shadow">
//         <p className="text-red-600 dark:text-red-400">Error: {error}</p>
//       </div>
//     );
//   }
//   if (!data || data.length === 0) {
//     return (
//       <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded shadow">
//         <p className="text-gray-800 dark:text-gray-200">No data available.</p>
//       </div>
//     );
//   }

//   // data = [ { department, tenureRange, averageScore }, ... ]
//   // We want to group by department on x-axis, multiple bars for each tenure range.

//   // 7) Identify unique departments + tenureRanges
//   const departments = [...new Set(data.map((d) => d.department))];
//   const ranges = [...new Set(data.map((d) => d.tenureRange))];

//   // 8) Build a dataset for each tenureRange
//   const datasets = ranges.map((range) => {
//     // For each department, find the averageScore if any
//     const scores = departments.map((dep) => {
//       const found = data.find(
//         (item) => item.department === dep && item.tenureRange === range
//       );
//       return found ? found.averageScore : 0;
//     });
//     return {
//       label: range,
//       data: scores,
//       backgroundColor: pickColorForRange(range),
//       borderColor: "rgba(0,0,0,0.1)",
//       borderWidth: 1,
//     };
//   });

//   // 9) Prepare chart data
//   const chartData = {
//     labels: departments,
//     datasets,
//   };

//   // 10) Configure chart options + custom tooltip
//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       title: {
//         display: true,
//         text: "Dept Performance by Tenure Range",
//       },
//       legend: {
//         position: "bottom",
//       },
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             const rangeLabel = context.dataset.label;
//             const deptLabel = context.label;
//             const score = context.parsed.y;
//             return `Dept: ${deptLabel}, Tenure: ${rangeLabel}, Score: ${score.toFixed(
//               2
//             )}`;
//           },
//         },
//       },
//       zoom: {
//         zoom: {
//           wheel: { enabled: true }, // mouse wheel to zoom
//           pinch: { enabled: true }, // touch pinch to zoom
//           mode: "x", // zoom in x-axis
//         },
//         pan: {
//           enabled: true,
//           mode: "x", // pan along x-axis
//         },
//       },
//     },
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: "Departments",
//         },
//       },
//       y: {
//         beginAtZero: true,
//         max: 5, // rating scale is typically 1..5
//         title: {
//           display: true,
//           text: "Performance Score (1–5)",
//         },
//       },
//     },
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-800 dark:text-white">
//       <div className="max-w-7xl mx-auto">
//         <div className="bg-white dark:bg-gray-800 rounded shadow p-4 mb-6">
//           <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">
//             Department Performance by Tenure
//           </h2>
//           <p className="text-sm text-gray-600 dark:text-gray-300">
//             Use your mouse wheel or touch gestures to zoom/pan horizontally.
//           </p>
//         </div>

//         {/* Chart Container */}
        
//         <div className="bg-white dark:bg-gray-800 rounded shadow p-4" style={{ height: "60vh" }}>

          
//           <Bar data={chartData} options={options} />
//         </div>
//       </div>
//     </div>
//   );
// };

// // A helper function to pick a color for each tenure range
// function pickColorForRange(range) {
//   switch (range) {
//     case "0-1 year":
//       return "rgba(54, 162, 235, 0.7)";
//     case "1-2 years":
//       return "rgba(255, 99, 132, 0.7)";
//     case "2-3 years":
//       return "rgba(255, 205, 86, 0.7)";
//     case "3-5 years":
//       return "rgba(75, 192, 192, 0.7)";
//     case "5-10 years":
//       return "rgba(153, 102, 255, 0.7)";
//     case "10+ years":
//       return "rgba(255, 159, 64, 0.7)";
//     default:
//       return "rgba(201, 203, 207, 0.7)";
//   }
// }

// export default PerformanceCard;


import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

// Register Chart.js components + plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
  zoomPlugin
);

import useTenurePerformanceStore from "../../../store/analytics dashboards cards/useTenurePerformanceStore";

// Optional helper to map a tenure range to a color
function pickColorForRange(range) {
  switch (range) {
    case "0-1 year":
      return "rgba(54, 162, 235, 0.7)";
    case "1-2 years":
      return "rgba(255, 99, 132, 0.7)";
    case "2-3 years":
      return "rgba(255, 205, 86, 0.7)";
    case "3-5 years":
      return "rgba(75, 192, 192, 0.7)";
    case "5-10 years":
      return "rgba(153, 102, 255, 0.7)";
    case "10+ years":
      return "rgba(255, 159, 64, 0.7)";
    default:
      return "rgba(201, 203, 207, 0.7)";
  }
}

const PerformanceCard = () => {
  // Fetch data from Zustand (or any store)
  const { data, loading, error, fetchTenurePerformance } = useTenurePerformanceStore();

  // On mount, fetch aggregator data
  useEffect(() => {
    fetchTenurePerformance();
  }, [fetchTenurePerformance]);

  // Handle store states
  if (loading) {
    return (
      <div className="p-4 bg-white dark:bg-slate-800 rounded shadow text-center">
        <p className="text-gray-700 dark:text-gray-300">Loading performance data...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-4 bg-white dark:bg-slate-800 rounded shadow text-center">
        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
      </div>
    );
  }
  if (!data || data.length === 0) {
    return (
      <div className="p-4 bg-white dark:bg-slate-800 rounded shadow text-center">
        <p className="text-gray-700 dark:text-gray-300">No data available.</p>
      </div>
    );
  }

  // data = [ { department, tenureRange, averageScore }, ... ]
  // Identify unique departments + tenure ranges
  const departments = [...new Set(data.map((d) => d.department))];
  const ranges = [...new Set(data.map((d) => d.tenureRange))];

  // Build a dataset for each tenure range
  const datasets = ranges.map((range) => {
    const scores = departments.map((dep) => {
      const found = data.find(
        (item) => item.department === dep && item.tenureRange === range
      );
      return found ? found.averageScore : 0;
    });
    return {
      label: range,
      data: scores,
      backgroundColor: pickColorForRange(range),
    };
  });

  // Prepare chart data
  const chartData = {
    labels: departments,
    datasets,
  };

  // Chart configuration (zoom, custom tooltips, etc.)
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Dept Performance by Tenure Range",
        color: "#fff",
      },
      legend: {
        display: false, // We'll do our own custom legend below
      },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#F9FAFB",
        bodyColor: "#F9FAFB",
        callbacks: {
          label: function (context) {
            const rangeLabel = context.dataset.label;
            const deptLabel = context.label;
            const score = context.parsed.y.toFixed(2);
            return `Dept: ${deptLabel}, Tenure: ${rangeLabel}, Score: ${score}`;
          },
        },
      },
      zoom: {
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: "x",
        },
        pan: { enabled: true, mode: "x" },
      },
    },
    scales: {
    
      x: {
        
        ticks: { color: "#d1d5db" },
        title: {
          display: true,
          text: "Departments",
          color: "#d1d5db",
        },
      },
      y: {
        beginAtZero: true,
        max: 5,
        ticks: { color: "#d1d5db" },
        title: {
          display: true,
          text: "Performance Score (1–5)",
          color: "#d1d5db",
        },
      },
    },
  };

  return (
    <div
      className="
        w-full
        max-w-4xl
        bg-white
        dark:bg-slate-800
        rounded-lg
        p-6
        shadow
        text-gray-800
        dark:text-gray-200
        text-center
        mx-auto
      "
    >
      {/* Title */}
      <h2 className="text-xl font-bold mb-4">Department Performance by Tenure</h2>

      {/* Custom Legend Row (centered) */}
      <div className="flex items-center justify-center flex-wrap gap-4 mb-4">
        {ranges.map((range) => (
          <div className="flex items-center space-x-2" key={range}>
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ backgroundColor: pickColorForRange(range) }}
            />
            <span className="text-sm">{range}</span>
          </div>
        ))}
      </div>

      {/* Chart container (centered by default, fills width) */}
      <div className="w-full h-64 mx-auto">
        <Bar data={chartData} options={options} />
      </div>

      {/* Optional note on zoom/pan */}
      <p className="text-xs text-gray-600 dark:text-gray-400 mt-4">
        Use mouse wheel or touch gestures to zoom/pan horizontally.
      </p>
    </div>
  );
};

export default PerformanceCard;

