

// import * as React from "react";

// function RaciOperationsChart() {
//   return (
//     <div
//       className="
//         mt-7 w-full
//         rounded-xl bg-white dark:bg-gray-800
//         shadow-2xl
//         p-4
//       "
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-600">
//         <h2 className="text-lime-600 dark:text-lime-400 text-base font-semibold">
//           RACI Operations
//         </h2>
//         {/* Ellipsis / Menu Icon */}
//         <button
//           type="button"
//           className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//           aria-label="Menu"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <circle cx="5" cy="12" r="1"></circle>
//             <circle cx="12" cy="12" r="1"></circle>
//             <circle cx="19" cy="12" r="1"></circle>
//           </svg>
//         </button>
//       </div>

//       {/* Chart Container */}
//       <div className="relative flex flex-col md:flex-row items-center justify-start py-6">
//         {/* Y-Axis Labels */}
//         <div className="hidden md:flex flex-col items-center mr-2 text-sm text-gray-500 dark:text-gray-300">
//           <div className="mb-4">200</div>
//           <div className="mb-4">150</div>
//           <div className="mb-4">100</div>
//           <div className="mb-4">50</div>
//           <div>0</div>
//         </div>

//         {/* Chart Image */}
//         <div className="flex-1 w-full">
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/825148de-4ccf-4f6f-a0c6-f92146b7cdf2"
//             alt="RACI operations chart"
//             className="h-auto w-full object-contain"
//           />
//         </div>
//       </div>

//       {/* X-Axis Labels */}
//       <div className="mt-2 px-2 flex justify-between text-gray-500 text-sm dark:text-gray-300">
//         {["01", "05", "09", "13", "17", "21", "25", "29"].map((day) => (
//           <span key={day}>{day}</span>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default RaciOperationsChart;


// import { motion } from 'framer-motion';
// import { Line } from 'react-chartjs-2';
// import 'chart.js/auto'; // Auto‐register Chart.js components
// import { AiOutlineMore } from 'react-icons/ai';

// const RaciOperationsChart = () => {
//   // Sample chart data
//   const data = {
//     labels: [
//       '01', '03', '05', '07', '09', '11', '13',
//       '15', '17', '19', '21', '23', '25', '27', '29',
//     ],
//     datasets: [
//       {
//         label: 'Operations',
//         data: [200, 150, 100, 180, 160, 80, 55, 120, 95, 130, 70, 60, 90, 50, 75],
//         borderColor: '#84CC16', // Light green
//         backgroundColor: 'transparent',
//         tension: 0.4, // Curve the line
//         borderWidth: 2,
//         pointRadius: 0, // Hide individual points
//       },
//     ],
//   };

//   // Chart.js options for styling
//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         // Example for dotted horizontal lines
//         grid: {
//           drawBorder: false,
//           borderDash: [2, 2],
//           color: '#E2E8F0',
//         },
//         ticks: { color: '#64748B' }, // Tailwind slate-500
//       },
//       x: {
//         grid: { display: false },
//         ticks: { color: '#64748B' },
//       },
//     },
//     plugins: {
//       legend: { display: false },  // Hide legend
//       tooltip: { enabled: true },  // Show tooltips on hover
//     },
//   };

//   return (
//     <motion.div
//       // Framer Motion fade/slide animation
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       // Card container
//       className="p-4 rounded-lg shadow bg-white dark:bg-slate-800 
//                  text-gray-800 dark:text-gray-100  w-full"
//     >
//       {/* Top bar */}
//       <div className="flex items-center justify-between mb-2">
//         <h2 className="text-lg font-semibold">
//           RACI <span className="text-green-600 dark:text-green-400">Operations</span>
//         </h2>
//         <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600">
//           <AiOutlineMore className="w-5 h-5" />
//         </button>
//       </div>

//       {/* Chart Container */}
//       <div className="relative w-full h-80">
//         <Line data={data} options={options} />
//       </div>
//     </motion.div>
//   );
// };

// export default RaciOperationsChart;





import  { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Auto‐register Chart.js components
import { AiOutlineMore } from 'react-icons/ai';

import { getRaciScores } from '../../../service/dashboardService'; // Adjust path as needed

const RaciOperationsChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // 1) On mount, fetch the RACI data from your GET endpoint
  useEffect(() => {
    setLoading(true);
    setErrorMsg('');

    // Example: fetch for current month or entire range
    // getRaciScores('2025-02-01', '2025-02-28')
    getRaciScores()
      .then((res) => {
        if (res.success) {
          // 2) Transform the data into arrays for labels & values
          // e.g. res.data = [
          //   { date: "2025-02-01T00:00:00.000Z", overallScore: 200 },
          //   { date: "2025-02-03T00:00:00.000Z", overallScore: 150 },
          //   ...
          // ]
          const scores = res.data;

          // Sort by date ascending (if not already sorted on server)
          scores.sort((a, b) => new Date(a.date) - new Date(b.date));

          const labels = scores.map((item) => {
            // Convert date to "DD" format (01, 03, 05, etc.)
            const d = new Date(item.date);
            return String(d.getDate()).padStart(2, '0');
          });

          const values = scores.map((item) => item.overallScore);

          // 3) Build the Chart.js data object
          const chartDataObject = {
            labels,
            datasets: [
              {
                label: 'Operations',
                data: values,
                borderColor: '#84CC16', // Light green
                backgroundColor: 'transparent',
                tension: 0.4, // Curve the line
                borderWidth: 2,
                pointRadius: 0, // Hide individual points
              },
            ],
          };

          setChartData(chartDataObject);
        } else {
          setErrorMsg(res.message || 'Failed to fetch RACI scores');
        }
      })
      .catch((err) => {
        setErrorMsg(err.message || 'Network error');
      })
      .finally(() => setLoading(false));
  }, []);

  // 4) Define the Chart.js options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
          borderDash: [2, 2],
          color: '#E2E8F0',
        },
        ticks: { color: '#64748B' },
      },
      x: {
        grid: { display: false },
        ticks: { color: '#64748B' },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  // 5) Render states: loading, error, or chart
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 rounded-lg shadow bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 w-full"
      >
        <div>Loading RACI data...</div>
      </motion.div>
    );
  }

  if (errorMsg) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 rounded-lg shadow bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 w-full"
      >
        <div className="text-red-500">{errorMsg}</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      // Framer Motion fade/slide animation
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      // Card container
      className="p-4 rounded-lg shadow bg-white dark:bg-slate-800 
                 text-gray-800 dark:text-gray-100 w-full"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">
          RACI <span className="text-green-600 dark:text-green-400">Operations</span>
        </h2>
        <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600">
          <AiOutlineMore className="w-5 h-5" />
        </button>
      </div>

      {/* Chart Container */}
      <div className="relative w-full h-80">
        {/* Only render chart if chartData is ready */}
        {chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="text-gray-500 text-center mt-10">No data available</div>
        )}
      </div>
    </motion.div>
  );
};

export default RaciOperationsChart;
