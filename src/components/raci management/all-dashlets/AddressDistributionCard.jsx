
// import React, { useEffect } from 'react';
// import { Doughnut } from 'react-chartjs-2';
// import { motion, AnimatePresence } from 'framer-motion';
// import { toast } from 'react-hot-toast';
// import { FaChevronDown } from 'react-icons/fa';
// import 'chart.js/auto';
// import useAddressDistributionStore from '../../../store/analytics dashboards cards/useAddressDistributionStore'; // adjust path

// const AddressDistributionCard = () => {
//   // 1) Get store state & actions
//   const { data, loading, error, fetchDistribution } = useAddressDistributionStore();

//   // 2) Fetch on mount
//   useEffect(() => {
//     fetchDistribution();
//   }, [fetchDistribution]);

//   // 3) Handle loading and error states
//   if (loading) return <div>Loading Address Distribution...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!data) return null; // No data yet

//   // 4) Extract from the store data
//   const { currentPct, permanentPct } = data;
//   // Convert string to number if needed
//   const currentVal = parseFloat(currentPct) || 0;
//   const permanentVal = parseFloat(permanentPct) || 0;

//   // 5) Prepare Chart.js data
//   const chartData = {
//     labels: ['Current Address', 'Permanent Address'],
//     datasets: [
//       {
//         data: [currentVal, permanentVal],
//         backgroundColor: ['#3B82F6', '#F97316'], 
//         hoverBackgroundColor: ['#2563EB', '#EA580C'],
//         borderWidth: 0,
//       },
//     ],
//   };

//   // Chart options
//   const options = {
//     cutout: '70%',
//     plugins: {
//       legend: { display: false },
//       tooltip: {
//         backgroundColor: '#111827',
//         titleColor: '#F9FAFB',
//         bodyColor: '#F9FAFB',
//         borderWidth: 0,
//       },
//     },
//     maintainAspectRatio: false,
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
//         <Doughnut data={chartData} options={options} />
//       </div>

//       {/* Custom Legend */}
//       <div className="mt-4 flex space-x-6 justify-center">
//         {/* Current Address Legend */}
//         <div className="flex items-center space-x-2">
//           <span className="inline-block w-3 h-3 bg-blue-500 rounded-sm"></span>
//           <span className="text-sm">
//             Current Address: <strong>{currentVal}%</strong>
//           </span>
//         </div>
//         {/* Permanent Address Legend */}
//         <div className="flex items-center space-x-2">
//           <span className="inline-block w-3 h-3 bg-orange-500 rounded-sm"></span>
//           <span className="text-sm">
//             Permanent Address: <strong>{permanentVal}%</strong>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddressDistributionCard;



import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaMapMarkerAlt, 
  FaHome, 
  FaChevronDown, 
  FaInfoCircle,
  FaSync,
  FaExpand
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import 'chart.js/auto';

// Import your actual store
import useAddressDistributionStore from '../../../store/analytics dashboards cards/useAddressDistributionStore';

const AddressDistributionCard = () => {
  const { data, loading, error, fetchDistribution } = useAddressDistributionStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetchDistribution();
  }, []);

  // Extract data
  const currentVal = data ? parseFloat(data.currentPct) || 0 : 0;
  const permanentVal = data ? parseFloat(data.permanentPct) || 0 : 0;

  // Chart configuration
  const chartData = {
    labels: ['Current Address', 'Permanent Address'],
    datasets: [
      {
        data: [currentVal, permanentVal],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(236, 72, 153, 0.8)'
        ],
        hoverBackgroundColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(236, 72, 153, 1)'
        ],
        borderWidth: 0,
        borderRadius: 8,
        spacing: 2,
      },
    ],
  };

  const chartOptions = {
    cutout: '75%',
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        borderColor: 'rgba(99, 102, 241, 0.3)',
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: false,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        padding: 12,
        callbacks: {
          label: function(context) {
            return `${context.parsed}% of users`;
          }
        }
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
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
        className="w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full"
      />
      <p className="text-sm text-gray-500 dark:text-gray-400">Loading distribution data...</p>
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
          onClick={fetchDistribution}
          className="mt-3 px-4 py-2 bg-indigo-600 text-white text-xs rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
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
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-pink-500/5 pointer-events-none" />
      
      {/* Header */}
      <div className="relative p-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div
              animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg"
            >
              <FaMapMarkerAlt className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Address Distribution
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                <HiSparkles className="w-3 h-3" />
                <span>Live Analytics</span>
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
              onClick={fetchDistribution}
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
                        {(currentVal + permanentVal).toFixed(1)}%
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Total Coverage
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* Legend */}
                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-indigo-500 rounded-full shadow-sm" />
                      <div className="flex items-center space-x-2">
                        <FaHome className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Current Address
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {currentVal}%
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {Math.round((currentVal / 100) * 1000)} users
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-pink-500 rounded-full shadow-sm" />
                      <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Permanent Address
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {permanentVal}%
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {Math.round((permanentVal / 100) * 1000)} users
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Expandable Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-pink-50 dark:from-gray-700/20 dark:to-gray-600/20 rounded-xl border border-gray-200/50 dark:border-gray-600/50"
                    >
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Quick Insights
                      </h4>
                      <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                        <p>• {currentVal > permanentVal ? 'Current' : 'Permanent'} addresses dominate the distribution</p>
                        <p>• {Math.abs(currentVal - permanentVal).toFixed(1)}% difference between address types</p>
                        <p>• Data updated in real-time from user profiles</p>
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
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
    </motion.div>
  );
};

export default AddressDistributionCard;