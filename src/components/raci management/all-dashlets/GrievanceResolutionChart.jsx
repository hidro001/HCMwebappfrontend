

// import React, { useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
// import 'chart.js/auto';
// import useGrievanceResolutionStore from '../../../store/analytics dashboards cards/useGrievanceResolutionStore';

// function GrievanceResolutionChart() {
//   // Extract store states & actions
//   const {
//     data,
//     loading,
//     error,
//     period,
//     year,
//     month,
//     setPeriod,
//     setYear,
//     setMonth,
//     fetchGrievanceData,
//   } = useGrievanceResolutionStore();

//   // On mount or whenever period/year/month changes, fetch data
//   useEffect(() => {
//     fetchGrievanceData();
//   }, [period, year, month, fetchGrievanceData]);

//   if (loading) {
//     return (
//       <div className="text-center p-4 text-gray-700 dark:text-gray-200">
//         Loading...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center p-4 text-red-600 dark:text-red-400">
//         Error: {error}
//       </div>
//     );
//   }

//   if (!data) {
//     return (
//       <div className="text-center p-4 text-gray-700 dark:text-gray-200">
//         No Data
//       </div>
//     );
//   }

//   // If period=monthly => data.monthlyAverages
//   // If period=weekly => data.results
//   let chartData;
//   if (period === 'monthly') {
//     const monthly = data.monthlyAverages || []; // [10,15,22,...]
//     chartData = {
//       labels: [
//         'Jan','Feb','Mar','Apr','May','Jun',
//         'Jul','Aug','Sep','Oct','Nov','Dec'
//       ],
//       datasets: [
//         {
//           label: 'Hours to Resolve',
//           data: monthly,
//           backgroundColor: monthly.map((val) => {
//             if (val > 30) return '#B91C1C';  // red
//             if (val < 15) return '#10B981';  // green
//             return '#F59E0B';               // orange
//           }),
//         },
//       ],
//     };
//   } else {
//     // period=weekly => data.results
//     const weeks = data.results || []; // fallback to empty array
//     const labels = [];
//     const values = [];

//     weeks.forEach((w) => {
//       labels.push(`Week ${w._id.week}`);
//       values.push(Math.round(w.avgResolutionHours));
//     });

//     chartData = {
//       labels,
//       datasets: [
//         {
//           label: 'Hours to Resolve (weekly)',
//           data: values,
//           backgroundColor: values.map((val) => {
//             if (val > 30) return '#B91C1C';
//             if (val < 15) return '#10B981';
//             return '#F59E0B';
//           }),
//         },
//       ],
//     };
//   }

//   const options = { responsive: true };

//   return (
//     <div className="w-full max-w-3xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
//       {/* Header */}
//       <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
//         Grievance Resolution Time
//       </h2>

//       {/* Controls */}
//       <div className="flex flex-wrap items-center gap-4 mb-4">
//         {/* Period Buttons */}
//         <div className="flex flex-wrap gap-2">
//           <button
//             onClick={() => setPeriod('monthly')}
//             className={`px-4 py-2 rounded transition-colors 
//               ${period === 'monthly' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100'} 
//             `}
//           >
//             Monthly
//           </button>
//           <button
//             onClick={() => setPeriod('weekly')}
//             className={`px-4 py-2 rounded transition-colors 
//               ${period === 'weekly' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100'} 
//             `}
//           >
//             Weekly
//           </button>
//         </div>

//         {/* Year Selector */}
//         <div className="flex items-center">
//           <label htmlFor="yearSelect" className="mr-2 text-gray-700 dark:text-gray-200">
//             Year:
//           </label>
//           <select
//             id="yearSelect"
//             value={year}
//             onChange={(e) => setYear(parseInt(e.target.value, 10))}
//             className="rounded border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 px-2 py-1"
//           >
//             <option value={2024}>2024</option>
//             <option value={2025}>2025</option>
//           </select>
//         </div>

//         {/* Month selector if weekly */}
//         {period === 'weekly' && (
//           <div className="flex items-center">
//             <label htmlFor="monthSelect" className="mr-2 text-gray-700 dark:text-gray-200">
//               Month:
//             </label>
//             <select
//               id="monthSelect"
//               value={month || ''}
//               onChange={(e) => setMonth(parseInt(e.target.value, 10))}
//               className="rounded border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 px-2 py-1"
//             >
//               <option value="">--Select--</option>
//               <option value={1}>Jan</option>
//               <option value={2}>Feb</option>
//               <option value={3}>Mar</option>
//               <option value={4}>Apr</option>
//               <option value={5}>May</option>
//               <option value={6}>Jun</option>
//               <option value={7}>Jul</option>
//               <option value={8}>Aug</option>
//               <option value={9}>Sep</option>
//               <option value={10}>Oct</option>
//               <option value={11}>Nov</option>
//               <option value={12}>Dec</option>
//             </select>
//           </div>
//         )}
//       </div>

//       {/* Chart */}
//       <div className="w-full">
//         <Bar data={chartData} options={options} />
//       </div>
//     </div>
//   );
// }

// export default GrievanceResolutionChart;



import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineClipboardDocumentList, 
  HiOutlineClock, 
  HiOutlineChartBarSquare,
  HiOutlineCalendarDays,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineExclamationTriangle,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineArrowTrendingUp,
  HiOutlineArrowTrendingDown
} from 'react-icons/hi2';
import useGrievanceResolutionStore from '../../../store/analytics dashboards cards/useGrievanceResolutionStore';

function GrievanceResolutionChart() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Extract store states & actions
  const {
    data,
    loading,
    error,
    period,
    year,
    month,
    setPeriod,
    setYear,
    setMonth,
    fetchGrievanceData,
  } = useGrievanceResolutionStore();

  // On mount or whenever period/year/month changes, fetch data
  useEffect(() => {
    fetchGrievanceData();
  }, [period, year, month, fetchGrievanceData]);

  // Calculate stats from data
  const getStats = () => {
    if (!data) return { avgTime: 0, total: 0, trend: 0, status: 'neutral' };
    
    let values = [];
    if (period === 'monthly') {
      values = data.monthlyAverages || [];
    } else {
      values = (data.results || []).map(w => w.avgResolutionHours);
    }
    
    const avgTime = values.length ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0;
    const total = values.length;
    const trend = values.length >= 2 ? values[values.length - 1] - values[values.length - 2] : 0;
    const status = avgTime <= 15 ? 'good' : avgTime <= 30 ? 'warning' : 'critical';
    
    return { avgTime, total, trend, status };
  };

  const stats = getStats();

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm p-6"
      >
        <div className="flex items-center justify-center h-64">
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <HiOutlineClipboardDocumentList className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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
        className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-2xl shadow-xl border border-red-200/50 dark:border-red-700/50 backdrop-blur-sm p-6"
      >
        <div className="flex items-center justify-center h-64 text-center">
          <div className="space-y-4">
            <HiOutlineXCircle className="w-16 h-16 text-red-500 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Error Loading Data</h3>
              <p className="text-red-600 dark:text-red-300">{error}</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!data) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm p-6"
      >
        <div className="flex items-center justify-center h-64 text-center">
          <div className="space-y-4">
            <HiOutlineExclamationTriangle className="w-16 h-16 text-gray-400 mx-auto" />
            <p className="text-gray-600 dark:text-gray-400 text-lg">No data available</p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Prepare chart data
  let chartData;
  if (period === 'monthly') {
    const monthly = data.monthlyAverages || [];
    chartData = {
      labels: [
        'Jan','Feb','Mar','Apr','May','Jun',
        'Jul','Aug','Sep','Oct','Nov','Dec'
      ],
      datasets: [
        {
          label: 'Hours to Resolve',
          data: monthly,
          backgroundColor: monthly.map((val) => {
            if (val > 30) return 'rgba(239, 68, 68, 0.8)';
            if (val < 15) return 'rgba(34, 197, 94, 0.8)';
            return 'rgba(245, 158, 11, 0.8)';
          }),
          borderColor: monthly.map((val) => {
            if (val > 30) return 'rgb(239, 68, 68)';
            if (val < 15) return 'rgb(34, 197, 94)';
            return 'rgb(245, 158, 11)';
          }),
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    };
  } else {
    const weeks = data.results || [];
    const labels = [];
    const values = [];

    weeks.forEach((w) => {
      labels.push(`Week ${w._id.week}`);
      values.push(Math.round(w.avgResolutionHours));
    });

    chartData = {
      labels,
      datasets: [
        {
          label: 'Hours to Resolve (weekly)',
          data: values,
          backgroundColor: values.map((val) => {
            if (val > 30) return 'rgba(239, 68, 68, 0.8)';
            if (val < 15) return 'rgba(34, 197, 94, 0.8)';
            return 'rgba(245, 158, 11, 0.8)';
          }),
          borderColor: values.map((val) => {
            if (val > 30) return 'rgb(239, 68, 68)';
            if (val < 15) return 'rgb(34, 197, 94)';
            return 'rgb(245, 158, 11)';
          }),
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    };
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        cornerRadius: 8,
        padding: 12,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const statusConfig = {
    good: { color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30', icon: HiOutlineCheckCircle },
    warning: { color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/30', icon: HiOutlineExclamationTriangle },
    critical: { color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30', icon: HiOutlineXCircle }
  };

  const StatusIcon = statusConfig[stats.status].icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl hover:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <HiOutlineClipboardDocumentList className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Grievance Resolution
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Average resolution time analysis
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <HiOutlineAdjustmentsHorizontal className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </motion.button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
          >
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <HiOutlineClock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {stats.avgTime}h
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Avg Time</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className={`flex items-center space-x-3 p-3 ${statusConfig[stats.status].bg} rounded-xl`}
          >
            <div className="p-2 bg-white/50 dark:bg-black/20 rounded-lg">
              <StatusIcon className={`w-5 h-5 ${statusConfig[stats.status].color}`} />
            </div>
            <div>
              <p className={`text-lg font-bold ${statusConfig[stats.status].color}`}>
                {stats.status.toUpperCase()}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
          >
            <div className="p-2 bg-gray-100 dark:bg-gray-600 rounded-lg">
              {stats.trend >= 0 ? (
                <HiOutlineArrowTrendingUp className="w-5 h-5 text-red-500" />
              ) : (
                <HiOutlineArrowTrendingDown className="w-5 h-5 text-green-500" />
              )}
            </div>
            <div>
              <p className={`text-lg font-bold ${stats.trend >= 0 ? 'text-red-500' : 'text-green-500'}`}>
                {stats.trend >= 0 ? '+' : ''}{Math.round(stats.trend)}h
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Trend</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-4 border-b border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="flex flex-wrap items-center gap-4">
              {/* Period Buttons */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPeriod('monthly')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2
                    ${period === 'monthly' 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
                    }`}
                >
                  <HiOutlineCalendarDays className="w-4 h-4" />
                  <span>Monthly</span>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPeriod('weekly')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2
                    ${period === 'weekly' 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
                    }`}
                >
                  <HiOutlineChartBarSquare className="w-4 h-4" />
                  <span>Weekly</span>
                </motion.button>
              </div>

              {/* Year Selector */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Year:
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value, 10))}
                  className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={2024}>2024</option>
                  <option value={2025}>2025</option>
                </select>
              </div>

              {/* Month Selector */}
              {period === 'weekly' && (
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Month:
                  </label>
                  <select
                    value={month || ''}
                    onChange={(e) => setMonth(parseInt(e.target.value, 10))}
                    className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Months</option>
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
                      <option key={i} value={i + 1}>{m}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chart */}
      <div className="p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="h-64 w-full"
        >
          <Bar data={chartData} options={chartOptions} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default GrievanceResolutionChart;