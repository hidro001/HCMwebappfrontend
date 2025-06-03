// import React from 'react';
// import { motion } from 'framer-motion';
// import { FiDownloadCloud } from 'react-icons/fi';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Filler,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';

// // Register the components we need in ChartJS
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Filler
// );

// const PerformanceCard = () => {
//   // Example chart data
//   const data = {
//     labels: ['09. Mo.', '10. Tue.', '11. Wed'],
//     datasets: [
//       {
//         label: 'Performance',
//         data: [3000, 10000, 16000], // Adjust values as needed
//         borderColor: '#3B82F6',     // Tailwind's "blue-500"
//         backgroundColor: 'rgba(59,130,246,0.2)', // Slightly transparent fill
//         pointBackgroundColor: '#3B82F6',
//         pointRadius: 5,
//         fill: true,
//         tension: 0.4, // Bezier curve
//       },
//     ],
//   };

//   // Example chart options
//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           color: '#6B7280', // text-gray-500
//         },
//         grid: {
//           color: '#E5E7EB', // gray-200
//         },
//       },
//       x: {
//         ticks: {
//           color: '#6B7280', // text-gray-500
//         },
//         grid: {
//           display: false,
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: false, // Hide the legend if you only have one dataset
//       },
//       tooltip: {
//         // Custom tooltip styling if desired
//       },
//     },
//   };

//   return (
//     <motion.div
//       // Framer Motion props for a simple fade-in and slide-up
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       className="rounded-xl bg-white dark:bg-gray-800 shadow p-4 w-full max-w-md"
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between mb-2">
//         <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
//           Performance Statistics
//         </h2>
//         {/* <button
//           type="button"
//           className="text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200"
//         >
//           <FiDownloadCloud className="w-5 h-5" />
//         </button> */}
//       </div>

//       {/* Chart Container */}
//       <div className="h-48"> 
//         <Line data={data} options={options} />
//       </div>
//     </motion.div>
//   );
// };

// export default PerformanceCard;



import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiTrendingUp, 
  FiActivity, 
  FiBarChart2,
  FiDownloadCloud,
  FiMoreHorizontal 
} from 'react-icons/fi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const PerformanceCard = ({ 
  title = "Performance Statistics",
  data,
  className = "",
  showDownload = true,
  trend = "+12.5%",
  period = "vs last month"
}) => {
  // Fallback chart data structure for when API data isn't available
  const chartData = data || {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Performance',
        data: [3200, 4100, 3800, 5200, 4800, 6100, 5900],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        pointBackgroundColor: '#6366f1',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    scales: {
      y: {
        beginAtZero: true,
        display: false, // Hide y-axis for cleaner look
      },
      x: {
        display: false, // Hide x-axis for cleaner look
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#374151',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        padding: 12,
      },
    },
    elements: {
      line: {
        borderWidth: 3,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -4,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const iconVariants = {
    hover: {
      rotate: 15,
      scale: 1.1,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`
        group relative overflow-hidden
        bg-white dark:bg-gray-900/50 
        backdrop-blur-sm
        border border-gray-200/60 dark:border-gray-700/60
        rounded-2xl shadow-lg dark:shadow-2xl
        hover:shadow-xl dark:hover:shadow-3xl
        transition-all duration-300
        w-full h-full
        ${className}
      `}
    >
      {/* Gradient overlay for modern effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content Container */}
      <div className="relative p-4 sm:p-5 lg:p-6 h-full flex flex-col">
        
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4 sm:mb-5">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 mb-1">
              <motion.div
                variants={iconVariants}
                whileHover="hover"
                className="flex-shrink-0 p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg"
              >
                <FiActivity className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
              </motion.div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                {title}
              </h3>
            </div>
            
            {/* Performance Metrics */}
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full font-medium">
                <FiTrendingUp className="w-3 h-3" />
                {trend}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {period}
              </span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-1 ml-2">
            {showDownload && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                title="Download Report"
              >
                <FiDownloadCloud className="w-4 h-4" />
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
              title="More Options"
            >
              <FiMoreHorizontal className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Chart Section */}
        <div className="flex-1 min-h-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="h-full min-h-[120px] sm:min-h-[140px] lg:min-h-[160px] relative"
          >
            <Line data={chartData} options={chartOptions} />
          </motion.div>
        </div>

        {/* Footer Stats (Optional) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex items-center justify-between pt-3 sm:pt-4 mt-auto border-t border-gray-100 dark:border-gray-800"
        >
          <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            <FiBarChart2 className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Last 7 days</span>
          </div>
          <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100">
            Updated now
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PerformanceCard;