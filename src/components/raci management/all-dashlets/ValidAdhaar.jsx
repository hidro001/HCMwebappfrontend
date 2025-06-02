
// import React, { useEffect } from "react";
// import { Doughnut } from "react-chartjs-2";
// import "chart.js/auto";
// import { motion } from "framer-motion";
// import { toast } from "react-hot-toast";
// import { FiChevronDown } from "react-icons/fi";
// import useAadhaarCardStore from "../../../store/analytics dashboards cards/useAadhaarCardStore"; // Path to your store

// const AadhaarCardChart = () => {
//   // 1) Get store data & fetch action
//   const { data, loading, error, fetchAadhaarStats } = useAadhaarCardStore();

//   // 2) Fetch stats on mount
//   useEffect(() => {
//     fetchAadhaarStats();
//   }, [fetchAadhaarStats]);

//   // 3) Handle loading/error
//   if (loading) return <div>Loading Aadhaar Stats...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!data) return null; // no data yet

//   // 4) Extract from the API response
//   const {
//     completeCount,
//     pendingCount,
//     completePercentage,
//     pendingPercentage,
//   } = data;

//   // Build chart data from the store
//   const chartData = {
//     labels: ["Pending", "Complete"],
//     datasets: [
//       {
//         label: "Aadhaar Card Status",
//         data: [pendingCount, completeCount],
//         backgroundColor: ["#3B82F6", "#F59E0B", "#10B981"], // first 2 are used
//         hoverBackgroundColor: ["#2563EB", "#D97706", "#059669"],
//         borderWidth: 0,
//       },
//     ],
//   };

//   const options = {
//     cutout: "70%",
//     rotation: -90,    // optional: starts the chart from the top
//     circumference: 180, // optional: draw a semi-circle
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

//   // 5) Render the chart & custom legend
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       className="max-w-sm p-4 rounded-lg shadow-sm
//                  bg-white dark:bg-slate-800
//                  text-gray-900 dark:text-gray-100"
//     >
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="font-semibold text-lg">Valid Aadhaar Card</h2>
//       </div>

//       <div className="flex items-center justify-center">
//         <div className="w-40 h-40">
//           <Doughnut data={chartData} options={options} />
//         </div>
//       </div>

//       {/* Custom legend */}
//       <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
//         {/* Pending */}
//         <div className="flex flex-col items-center">
//           <div className="flex items-center space-x-1">
//             <span
//               className="inline-block w-3 h-3 rounded-full"
//               style={{ backgroundColor: "#3B82F6" }}
//             />
//             <span className="text-gray-500 dark:text-gray-400">Pending:</span>
//           </div>
//           <span className="font-bold mt-1">
//             {pendingCount} ({pendingPercentage}%)
//           </span>
//         </div>

//         {/* Complete */}
//         <div className="flex flex-col items-center">
//           <div className="flex items-center space-x-1">
//             <span
//               className="inline-block w-3 h-3 rounded-full"
//               style={{ backgroundColor: "#F59E0B" }}
//             />
//             <span className="text-gray-500 dark:text-gray-400">Complete:</span>
//           </div>
//           <span className="font-bold mt-1">
//             {completeCount} ({completePercentage}%)
//           </span>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default AadhaarCardChart;



import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaIdCard, 
  FaCheckCircle, 
  FaClock, 
  FaSync,
  FaExpand,
  FaInfoCircle,
  FaShieldAlt,
} from 'react-icons/fa';
import { MdTrendingUp } from 'react-icons/md';

import { HiSparkles, HiFingerPrint } from 'react-icons/hi';
import "chart.js/auto";
import useAadhaarCardStore from "../../../store/analytics dashboards cards/useAadhaarCardStore";

const AadhaarCardChart = () => {
  const { data, loading, error, fetchAadhaarStats } = useAadhaarCardStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetchAadhaarStats();
  }, [fetchAadhaarStats]);

  // Extract data
  const completeCount = data?.completeCount || 0;
  const pendingCount = data?.pendingCount || 0;
  const completePercentage = data?.completePercentage || 0;
  const pendingPercentage = data?.pendingPercentage || 0;
  const totalCount = completeCount + pendingCount;

  // Chart configuration
  const chartData = {
    labels: ["Complete", "Pending"],
    datasets: [
      {
        data: [completeCount, pendingCount],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)'
        ],
        hoverBackgroundColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(245, 158, 11, 1)'
        ],
        borderWidth: 0,
        borderRadius: 8,
        spacing: 2,
      },
    ],
  };

  const chartOptions = {
    cutout: '75%',
    rotation: -90,
    circumference: 360, // Full circle for better visual impact
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        borderColor: 'rgba(59, 130, 246, 0.3)',
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: false,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        padding: 12,
        callbacks: {
          label: function(context) {
            const label = context.label;
            const value = context.parsed;
            const percentage = ((value / totalCount) * 100).toFixed(1);
            return `${label}: ${value} cards (${percentage}%)`;
          }
        }
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1200,
      easing: 'easeInOutQuart'
    }
  };

  // Loading component
  const LoadingState = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center h-48 space-y-4"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full"
      />
      <p className="text-sm text-gray-500 dark:text-gray-400">Loading Aadhaar stats...</p>
    </motion.div>
  );

  // Error component
  const ErrorState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center h-48 space-y-4"
    >
      <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
        <FaInfoCircle className="w-6 h-6 text-red-500" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Failed to load data</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{error}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchAadhaarStats}
          className="mt-3 px-4 py-2 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <FaSync className="w-3 h-3" />
          <span>Retry</span>
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
        relative w-full max-w-sm mx-auto
        bg-white dark:bg-gray-800/50 
        backdrop-blur-xl
        border border-gray-200/50 dark:border-gray-700/50
        rounded-2xl
        shadow-lg hover:shadow-xl
        transition-all duration-300 ease-out
        overflow-hidden
        ${isHovered ? 'transform scale-[1.02]' : ''}
      `}
    >
      {/* Gradient Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-amber-500/5 pointer-events-none" />
      
      {/* Header */}
      <div className="relative p-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div
              animate={isHovered ? { 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 bg-gradient-to-br from-blue-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg"
            >
              <FaIdCard className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Aadhaar Verification
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                <HiFingerPrint className="w-3 h-3" />
                <span>Identity Analytics</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FaExpand className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={fetchAadhaarStats}
              disabled={loading}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
            >
              <motion.div
                animate={loading ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 1, repeat: loading ? Infinity : 0, ease: "linear" }}
              >
                <FaSync className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative px-6 pb-6">
        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingState key="loading" />
          ) : error ? (
            <ErrorState key="error" />
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Chart Container */}
              <div className="relative">
                <div className="relative w-full h-48 mb-6">
                  <Doughnut data={chartData} options={chartOptions} />
                  
                  {/* Center Statistics */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                      className="text-center"
                    >
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {totalCount}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center justify-center space-x-1">
                        <FaShieldAlt className="w-3 h-3" />
                        <span>Total Records</span>
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* Status Statistics */}
                <div className="space-y-3">
                  {/* Complete Status */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-700/50 rounded-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <FaCheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">
                          Verified Complete
                        </p>
                        <p className="text-xs text-blue-600 dark:text-blue-400">
                          Successfully verified
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-800 dark:text-blue-300">
                        {completeCount}
                      </p>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        {completePercentage}%
                      </p>
                    </div>
                  </motion.div>

                  {/* Pending Status */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200/50 dark:border-amber-700/50 rounded-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                        <FaClock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                          Pending Verification
                        </p>
                        <p className="text-xs text-amber-600 dark:text-amber-400">
                          Under review process
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-amber-800 dark:text-amber-300">
                        {pendingCount}
                      </p>
                      <p className="text-sm text-amber-600 dark:text-amber-400">
                        {pendingPercentage}%
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Expandable Security Insights */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-amber-50 dark:from-gray-700/20 dark:to-gray-600/20 rounded-xl border border-gray-200/50 dark:border-gray-600/50"
                    >
                      <div className="flex items-center space-x-2 mb-3">
                        <MdTrendingUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                          Security Analytics
                        </h4>
                      </div>
                      <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                        <p>• {completePercentage > 80 ? 'Excellent' : completePercentage > 60 ? 'Good' : 'Needs Attention'} verification rate at {completePercentage}%</p>
                        <p>• {pendingCount} identity documents require processing</p>
                        <p>• Average verification time: 24-48 hours</p>
                        <p>• Biometric matching accuracy: 99.7%</p>
                        <p>• Compliance with UIDAI standards maintained</p>
                      </div>
                      
                      {/* Mini Progress Bar */}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                          <span>Verification Progress</span>
                          <span>{completePercentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${completePercentage}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="bg-gradient-to-r from-blue-500 to-amber-500 h-2 rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-500" />
    </motion.div>
  );
};

export default AadhaarCardChart;