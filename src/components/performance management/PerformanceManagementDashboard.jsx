// import React from 'react'
// import { Line } from 'react-chartjs-2'
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js'

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// )

// export default function PerformanceManagementDashboard() {
//   // Dummy stats data
//   const statsData = [
//     {
//       title: 'Top Performer',
//       value: 20,
//       increment: +200,
//       colorClass: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100',
//     },
//     {
//       title: 'Average Performer',
//       value: 12,
//       increment: -200,
//       colorClass: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-100',
//     },
//     {
//       title: 'Below Average Performer',
//       value: 3,
//       increment: +200,
//       colorClass: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100',
//     },
//   ]

//   // Dummy chart data
//   const lineLabels = [
//     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//   ]

//   // Example line data (blue) and bar data (gray) to match the chart style from the screenshot
//   const lineChartData = {
//     labels: lineLabels,
//     datasets: [
//       {
//         type: 'bar',
//         label: 'Revenue / Some Metric',
//         data: [50000, 30000, 20000, 25000, 55000, 40000, 28000, 10000, 60000, 35000, 45000, 50000],
//         backgroundColor: 'rgba(156, 163, 175, 0.3)', // Gray
//         borderWidth: 0,
//         yAxisID: 'y',
//       },
//       {
//         type: 'line',
//         label: 'Performance',
//         data: [40, 20, 25, 30, 35, 30, 25, 20, 15, 25, 18, 28],
//         borderColor: 'rgba(59, 130, 246, 1)', // Blue-500
//         backgroundColor: 'rgba(59, 130, 246, 0.2)',
//         tension: 0.4,
//         yAxisID: 'y2',
//       },
//     ],
//   }

//   // Chart config
//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         intersect: false,
//       },
//     },
//     scales: {
//       y: {
//         type: 'linear',
//         display: true,
//         position: 'left',
//         ticks: {
//           color: '#6B7280', // Gray-500 text
//         },
//         grid: {
//           color: 'rgba(107,114,128,0.1)', // Lighter grid color
//         },
//       },
//       y2: {
//         type: 'linear',
//         display: true,
//         position: 'right',
//         grid: {
//           drawOnChartArea: false,
//         },
//         ticks: {
//           color: '#3B82F6', // Blue-500
//         },
//       },
//       x: {
//         ticks: {
//           color: '#6B7280', // Gray-500
//         },
//         grid: {
//           color: 'rgba(107,114,128,0.05)',
//         },
//       },
//     },
//   }

//   // Dummy table data
//   const topPerformerList = [
//     {
//       empId: 'Ri0001',
//       department: 'IT-Development',
//       date: '27 Mar 2024',
//       time: '11:35:45',
//       assignedManager: 'Nikunj',
//     },
//     {
//       empId: 'Ri0002',
//       department: 'Marketing',
//       date: '27 Mar 2024',
//       time: '1:30:50',
//       assignedManager: 'Amit',
//     },
//     {
//       empId: 'Ri0003',
//       department: 'Sales',
//       date: '27 Mar 2024',
//       time: '10:30:34',
//       assignedManager: 'Akhilesh',
//     },
//     {
//       empId: 'Ri0004',
//       department: 'IT-Designing',
//       date: '27 Mar 2024',
//       time: 'Pending',
//       assignedManager: 'Sapna',
//     },
//   ]

//   return (
//     <div className="space-y-6">
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         {statsData.map((stat, idx) => (
//           <div
//             key={idx}
//             className={`flex flex-col rounded-lg p-4 ${stat.colorClass}`}
//           >
//             <h2 className="text-lg font-semibold">{stat.title}</h2>
//             <p className="text-2xl font-bold my-2">{stat.value}</p>
//             <p className={`text-sm font-medium ${stat.increment >= 0 ? 'text-green-600 dark:text-green-300' : 'text-red-600 dark:text-red-300'}`}>
//               {stat.increment >= 0 ? 'Increase' : 'Decrease'} by {stat.increment} this Month
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Chart Section */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="font-semibold text-lg">Top Performer</h3>
//           <select
//             className="border dark:border-gray-700 bg-transparent rounded-md px-3 py-2 text-sm focus:outline-none"
//             defaultValue="Yearly"
//           >
//             <option value="Yearly">Yearly</option>
//             <option value="Monthly">Monthly</option>
//             <option value="Weekly">Weekly</option>
//           </select>
//         </div>

//         {/* ChartJS */}
//         <div className="w-full">
//           <Line data={lineChartData} options={chartOptions} />
//         </div>
//       </div>

//       {/* Top Performer List */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
//         <h3 className="font-semibold text-lg mb-4">Top Performer List</h3>
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm text-left">
//             <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs font-bold">
//               <tr>
//                 <th className="px-4 py-3">EMP ID</th>
//                 <th className="px-4 py-3">Department</th>
//                 <th className="px-4 py-3">Date</th>
//                 <th className="px-4 py-3">Time</th>
//                 <th className="px-4 py-3">Assigned Manager</th>
//               </tr>
//             </thead>
//             <tbody>
//               {topPerformerList.map((row, idx) => (
//                 <tr
//                   key={row.empId}
//                   className={`border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700`}
//                 >
//                   <td className="px-4 py-3">{row.empId}</td>
//                   <td className="px-4 py-3">{row.department}</td>
//                   <td className="px-4 py-3">{row.date}</td>
//                   <td className="px-4 py-3">
//                     {row.time === 'Pending' ? (
//                       <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
//                         Pending
//                       </span>
//                     ) : (
//                       row.time
//                     )}
//                   </td>
//                   <td className="px-4 py-3">{row.assignedManager}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }

import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Framer Motion
import { motion } from 'framer-motion'

// React Icons (example icons)
import { FaMedal, FaChartLine, FaMeh } from 'react-icons/fa'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function PerformanceManagementDashboard() {
  // Framer Motion variants for a simple fade/slide effect
  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: 'easeInOut',
      },
    }),
  }

  // State to control which range (Yearly, Monthly, Weekly) is selected
  const [selectedRange, setSelectedRange] = useState('Yearly')

  // Stats data for the cards
  const statsData = [
    {
      title: 'Top Performer',
      value: 20,
      increment: +200,
      icon: <FaMedal className="text-blue-600 dark:text-blue-200" size={24} />,
      colorClass:
        'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100',
    },
    {
      title: 'Average Performer',
      value: 12,
      increment: -200,
      icon: <FaChartLine className="text-purple-600 dark:text-purple-200" size={24} />,
      colorClass:
        'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-100',
    },
    {
      title: 'Below Average Performer',
      value: 3,
      increment: +200,
      icon: <FaMeh className="text-red-600 dark:text-red-200" size={24} />,
      colorClass:
        'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100',
    },
  ]

  /**
   * Dummy chart datasets for each range selection
   */
  const yearlyData = {
    labels: [
      'Jan','Feb','Mar','Apr','May','Jun',
      'Jul','Aug','Sep','Oct','Nov','Dec'
    ],
    datasets: [
      {
        type: 'bar',
        label: 'Revenue',
        data: [50000, 30000, 20000, 25000, 55000, 40000, 28000, 10000, 60000, 35000, 45000, 50000],
        backgroundColor: 'rgba(156, 163, 175, 0.3)', // Gray
        borderWidth: 0,
        yAxisID: 'y',
      },
      {
        type: 'line',
        label: 'Performance',
        data: [40, 20, 25, 30, 35, 30, 25, 20, 15, 25, 18, 28],
        borderColor: 'rgba(59, 130, 246, 1)', // Blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        yAxisID: 'y2',
      },
    ],
  }

  // E.g. 5 data points for "monthly" (like 5 weeks)
  const monthlyData = {
    labels: ['Week 1','Week 2','Week 3','Week 4','Week 5'],
    datasets: [
      {
        type: 'bar',
        label: 'Revenue',
        data: [18000, 12000, 25000, 22000, 30000],
        backgroundColor: 'rgba(156, 163, 175, 0.3)',
        borderWidth: 0,
        yAxisID: 'y',
      },
      {
        type: 'line',
        label: 'Performance',
        data: [15, 20, 28, 22, 30],
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        yAxisID: 'y2',
      },
    ],
  }

  // E.g. 7 data points for "weekly"
  const weeklyData = {
    labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    datasets: [
      {
        type: 'bar',
        label: 'Revenue',
        data: [3500, 2800, 4200, 1500, 5600, 6200, 2000],
        backgroundColor: 'rgba(156, 163, 175, 0.3)',
        borderWidth: 0,
        yAxisID: 'y',
      },
      {
        type: 'line',
        label: 'Performance',
        data: [10, 14, 18, 9, 20, 24, 12],
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        yAxisID: 'y2',
      },
    ],
  }

  // Pick correct dataset based on selection
  const getChartData = () => {
    switch (selectedRange) {
      case 'Monthly':
        return monthlyData
      case 'Weekly':
        return weeklyData
      default:
        return yearlyData
    }
  }

  // Reusable chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { intersect: false },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        ticks: {
          color: '#6B7280', // Gray-500 text
        },
        grid: {
          color: 'rgba(107,114,128,0.1)',
        },
      },
      y2: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: '#3B82F6', // Blue-500
        },
      },
      x: {
        ticks: {
          color: '#6B7280',
        },
        grid: {
          color: 'rgba(107,114,128,0.05)',
        },
      },
    },
  }

  // Dummy table data
  const topPerformerList = [
    {
      empId: 'Ri0001',
      department: 'IT-Development',
      date: '27 Mar 2024',
      time: '11:35:45',
      assignedManager: 'Nikunj',
    },
    {
      empId: 'Ri0002',
      department: 'Marketing',
      date: '27 Mar 2024',
      time: '1:30:50',
      assignedManager: 'Amit',
    },
    {
      empId: 'Ri0003',
      department: 'Sales',
      date: '27 Mar 2024',
      time: '10:30:34',
      assignedManager: 'Akhilesh',
    },
    {
      empId: 'Ri0004',
      department: 'IT-Designing',
      date: '27 Mar 2024',
      time: 'Pending',
      assignedManager: 'Sapna',
    },
  ]

  return (
    <div className="space-y-6">
      {/* --- Stats Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statsData.map((stat, idx) => (
          <motion.div
            key={stat.title}
            custom={idx}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className={`flex flex-col rounded-lg p-4 shadow ${stat.colorClass}`}
          >
            <div className="flex items-center gap-2">
              {stat.icon}
              <h2 className="text-md font-semibold">{stat.title}</h2>
            </div>
            <p className="text-2xl font-bold my-3">{stat.value}</p>
            <p
              className={`text-sm font-medium ${
                stat.increment >= 0
                  ? 'text-green-600 dark:text-green-300'
                  : 'text-red-600 dark:text-red-300'
              }`}
            >
              {stat.increment >= 0 ? 'Increase' : 'Decrease'} by {stat.increment}{' '}
              this Month
            </p>
          </motion.div>
        ))}
      </div>

      {/* --- Chart Section --- */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Top Performer</h3>

          {/* Range Selector */}
          <div className="relative">
            <select
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
              className="
                border border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-700
                text-gray-800 dark:text-gray-100
                rounded-md px-3 py-2 text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500
                appearance-none
              "
            >
              <option value="Yearly">Yearly</option>
              <option value="Monthly">Monthly</option>
              <option value="Weekly">Weekly</option>
            </select>
            {/* Custom arrow icon (optional) */}
            <div className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              ▼
            </div>
          </div>
        </div>

        {/* Chart Container */}
        <div className="w-full h-64">
          <Line data={getChartData()} options={chartOptions} />
        </div>
      </motion.div>

      {/* --- Top Performer List --- */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow"
      >
        <h3 className="font-semibold text-lg mb-4">Top Performer List</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs font-bold">
              <tr>
                <th className="px-4 py-3">EMP ID</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Assigned Manager</th>
              </tr>
            </thead>
            <tbody>
              {topPerformerList.map((row) => (
                <tr
                  key={row.empId}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-3">{row.empId}</td>
                  <td className="px-4 py-3">{row.department}</td>
                  <td className="px-4 py-3">{row.date}</td>
                  <td className="px-4 py-3">
                    {row.time === 'Pending' ? (
                      <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                        Pending
                      </span>
                    ) : (
                      row.time
                    )}
                  </td>
                  <td className="px-4 py-3">{row.assignedManager}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

