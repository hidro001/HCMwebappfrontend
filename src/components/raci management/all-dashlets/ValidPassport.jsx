
// import React, { useEffect } from "react";
// import { Doughnut } from "react-chartjs-2";
// import "chart.js/auto";
// import { FiChevronDown } from "react-icons/fi";
// import usePassportStore from "../../../store/analytics dashboards cards/usePassportStore"; // Path to your Zustand store

// const PassportValidityCard = () => {
//   // 1) Get store data and action
//   const { data, loading, error, fetchPassportValidity } = usePassportStore();

//   // 2) Fetch on mount
//   useEffect(() => {
//     fetchPassportValidity();
//   }, [fetchPassportValidity]);

//   // 3) Handle loading or error
//   if (loading) return <div>Loading passport data...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!data) return null;

//   // 4) Extract counts & percentages
//   const { completeCount, pendingCount, completePercentage, pendingPercentage } = data;

//   // Build chart data
//   const chartData = {
//     labels: ["Pending", "Complete"],
//     datasets: [
//       {
//         label: "Valid Passport",
//         data: [pendingCount, completeCount],
//         backgroundColor: ["#3B82F6", "#F59E0B"],
//         hoverBackgroundColor: ["#2563EB", "#D97706"],
//         borderWidth: 0,
//       },
//     ],
//   };

//   // Donut options
//   const options = {
//     cutout: "70%",
//     rotation: -90,
//     circumference: 360,
//     plugins: {
//       legend: { display: false },
//       tooltip: {
//         bodyColor: "#fff",
//         backgroundColor: "#111827",
//         titleColor: "#F9FAFB",
//         displayColors: false,
//       },
//     },
//   };

//   return (
//     <div
//       className="max-w-xs p-4 rounded-lg shadow-sm
//                  bg-white dark:bg-slate-800
//                  text-gray-900 dark:text-gray-100 h-[405px]"
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="font-semibold text-lg">Valid Passport</h2>
//         <div className="relative">{/* dropdown placeholder */}</div>
//       </div>

//       {/* Donut Chart */}
//       <div className="relative flex items-center justify-center">
//         <div className="w-48 h-48">
//           <Doughnut data={chartData} options={options} />
//         </div>
//       </div>

//       {/* Custom Legend */}
//       <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
//         {/* Pending */}
//         <div className="flex items-center space-x-2">
//           <span
//             className="inline-block w-3 h-3 rounded-full"
//             style={{ backgroundColor: "#3B82F6" }}
//           />
//           <span>Pending</span>
//           <span className="font-semibold">
//             {pendingCount} ({pendingPercentage}%)
//           </span>
//         </div>

//         {/* Complete */}
//         <div className="flex items-center space-x-2">
//           <span
//             className="inline-block w-3 h-3 rounded-full"
//             style={{ backgroundColor: "#F59E0B" }}
//           />
//           <span>Complete</span>
//           <span className="font-semibold">
//             {completeCount} ({completePercentage}%)
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PassportValidityCard;


import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiOutlineDocumentCheck, 
  HiOutlineClock, 
  HiOutlineChevronDown,
  HiOutlineExclamationTriangle
} from "react-icons/hi2";


import { FaSync } from 'react-icons/fa';


import usePassportStore from "../../../store/analytics dashboards cards/usePassportStore"; // Path to your Zustand store

const PassportValidityCard = () => {
  const { data, loading, error, fetchPassportValidity } = usePassportStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");

  useEffect(() => {
    fetchPassportValidity();
  }, [fetchPassportValidity]);

  const handleRefresh = () => {
    fetchPassportValidity();
  };

  const periods = ["This Week", "This Month", "Last 3 Months", "This Year"];

  // Loading Component
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm mx-auto p-6 rounded-2xl shadow-lg border
                   bg-gradient-to-br from-white to-gray-50 
                   dark:from-slate-800 dark:to-slate-900
                   dark:border-slate-700/50 border-gray-200/50
                   backdrop-blur-sm h-[420px] sm:h-[450px]"
      >
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-6">
            <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded-lg w-32"></div>
            <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded-lg w-8"></div>
          </div>
          <div className="flex items-center justify-center mb-6">
            <div className="w-40 h-40 sm:w-48 sm:h-48 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Error Component
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm mx-auto p-6 rounded-2xl shadow-lg border
                   bg-gradient-to-br from-red-50 to-red-100 
                   dark:from-red-900/20 dark:to-red-800/20
                   border-red-200 dark:border-red-700/50
                   text-red-800 dark:text-red-200 h-[420px] sm:h-[450px]"
      >
        <div className="flex flex-col items-center justify-center h-full text-center">
          <HiOutlineExclamationTriangle className="w-12 h-12 mb-4 text-red-500" />
          <h3 className="font-semibold text-lg mb-2">Unable to load data</h3>
          <p className="text-sm opacity-80 mb-4">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 
                       transition-colors duration-200 flex items-center gap-2"
          >
            <FaSync className="w-4 h-4" />
            Try Again
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (!data) return null;

  const { completeCount, pendingCount, completePercentage, pendingPercentage } = data;
  const total = completeCount + pendingCount;

  // Enhanced chart data with gradients
  const chartData = {
    labels: ["Complete", "Pending"],
    datasets: [
      {
        label: "Passport Status",
        data: [completeCount, pendingCount],
        backgroundColor: [
          "rgba(16, 185, 129, 0.8)", // emerald-500
          "rgba(245, 158, 11, 0.8)"  // amber-500
        ],
        borderColor: [
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)"
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          "rgba(16, 185, 129, 0.9)",
          "rgba(245, 158, 11, 0.9)"
        ],
        hoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    cutout: "75%",
    rotation: -90,
    circumference: 360,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.95)",
        titleColor: "#F9FAFB",
        bodyColor: "#F9FAFB",
        borderColor: "rgba(75, 85, 99, 0.5)",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: (context) => {
            const percentage = ((context.raw / total) * 100).toFixed(1);
            return `${context.label}: ${context.raw} (${percentage}%)`;
          }
        }
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1200,
      easing: 'easeOutQuart'
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-sm mx-auto p-6 rounded-2xl shadow-lg border
                 bg-gradient-to-br from-white via-white to-gray-50/50
                 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900/80
                 border-gray-200/50 dark:border-slate-700/50
                 text-gray-900 dark:text-gray-100 
                 backdrop-blur-sm hover:shadow-xl
                 transition-all duration-300 ease-out
                  relative overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-500 to-blue-500 rounded-full blur-2xl"></div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 
                          dark:from-blue-400/20 dark:to-purple-400/20">
            <HiOutlineDocumentCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="font-bold text-lg sm:text-xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
                           dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
              Passport Validity
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Total: {total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        
        {/* Dropdown */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-2 rounded-xl border border-gray-200 dark:border-slate-600
                       bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm
                       hover:bg-gray-50 dark:hover:bg-slate-600/50
                       transition-all duration-200 flex items-center gap-1"
          >
            <HiOutlineChevronDown className={`w-4 h-4 transition-transform duration-200 
                                             ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </motion.button>
          
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-40 py-2 
                           bg-white dark:bg-slate-800 rounded-xl shadow-xl border
                           border-gray-200 dark:border-slate-700 z-50 backdrop-blur-sm"
              >
                {periods.map((period) => (
                  <motion.button
                    key={period}
                    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                    onClick={() => {
                      setSelectedPeriod(period);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors
                               ${selectedPeriod === period 
                                 ? 'text-blue-600 dark:text-blue-400 font-medium' 
                                 : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}`}
                  >
                    {period}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative flex items-center justify-center mb-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative w-40 h-40 sm:w-48 sm:h-48"
        >
          <Doughnut data={chartData} options={options} />
          
          {/* Center Stats */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 
                              dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">
                {completePercentage}%
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Complete
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="space-y-3"
      >
        {/* Complete */}
        <div className="flex items-center justify-between p-3 rounded-xl
                        bg-gradient-to-r from-emerald-50 to-emerald-100/50
                        dark:from-emerald-900/20 dark:to-emerald-800/10
                        border border-emerald-200/50 dark:border-emerald-700/30">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600"></div>
              <HiOutlineDocumentCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="font-medium text-emerald-700 dark:text-emerald-300">Complete</span>
          </div>
          <div className="text-right">
            <div className="font-bold text-emerald-800 dark:text-emerald-200">
              {completeCount.toLocaleString()}
            </div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400">
              {completePercentage}%
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="flex items-center justify-between p-3 rounded-xl
                        bg-gradient-to-r from-amber-50 to-amber-100/50
                        dark:from-amber-900/20 dark:to-amber-800/10
                        border border-amber-200/50 dark:border-amber-700/30">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600"></div>
              <HiOutlineClock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <span className="font-medium text-amber-700 dark:text-amber-300">Pending</span>
          </div>
          <div className="text-right">
            <div className="font-bold text-amber-800 dark:text-amber-200">
              {pendingCount.toLocaleString()}
            </div>
            <div className="text-xs text-amber-600 dark:text-amber-400">
              {pendingPercentage}%
            </div>
          </div>
        </div>
      </motion.div>

      {/* Click overlay to close dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </motion.div>
  );
};

export default PassportValidityCard;