

import React, { useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Line, Doughnut } from 'react-chartjs-2'
import { motion } from 'framer-motion'
import { FaMedal, FaChartLine, FaMeh } from 'react-icons/fa'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
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
  const [selectedRange, setSelectedRange] = useState('Monthly')

  // Stats data for the top cards
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

  // ------------------
  // MAIN CHART DATA
  // ------------------
  const yearlyData = {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [
      {
        type: 'bar',
        label: 'Revenue',
        data: [100000, 50000, 20000, 35000, 80000, 45000, 30000, 60000, 35000, 90000, 20000, 50000],
        backgroundColor: 'rgba(156, 163, 175, 0.3)', // Gray
        borderWidth: 0,
        yAxisID: 'y',
      },
      {
        type: 'line',
        label: 'Performance',
        data: [25, 15, 10, 20, 30, 28, 18, 20, 25, 15, 8, 20],
        borderColor: 'rgba(59, 130, 246, 1)', // Blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        yAxisID: 'y2',
      },
    ],
  }

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

  function getChartData() {
    switch (selectedRange) {
      case 'Weekly':
        return weeklyData
      case 'Monthly':
        return monthlyData
      case 'Yearly':
      default:
        return yearlyData
    }
  }

  // Chart options
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
          color: '#6B7280', // Gray-500
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

  // ------------------
  // DONUT CHART DATA
  // ------------------

  // Dummy male/female data for each range
  const donutDataMap = {
    Weekly: {
      maleCount: 5000,
      femaleCount: 7000,
      malePercent: '+15%',
      femalePercent: '+20%',
    },
    Monthly: {
      maleCount: 20000,
      femaleCount: 25000,
      malePercent: '+25%',
      femalePercent: '+30%',
    },
    Yearly: {
      maleCount: 240000,
      femaleCount: 300000,
      malePercent: '+30%',
      femalePercent: '+40%',
    },
  }

  // Return a Chart.js data object based on the current `selectedRange`
  function getDonutData() {
    const { maleCount, femaleCount } = donutDataMap[selectedRange] || donutDataMap.Monthly
    return {
      labels: ['Male', 'Female'],
      datasets: [
        {
          data: [maleCount, femaleCount],
          backgroundColor: [
            'rgb(59, 130, 246)', // Blue
            'rgb(245, 158, 11)', // Orange
          ],
          hoverOffset: 4,
        },
      ],
    }
  }

  const donutOptions = {
    cutout: '60%',
    plugins: {
      legend: { display: false },
    },
  }

  // ------------------
  // TABLE DATA
  // ------------------
  const topPerformerList = [
    {
      empId: 'Ri0001',
      name: 'Nikunj',
      department: 'IT-Development',
      date: 'dd-mm-yy',
      designation: 'Web Developer',
    },
    {
      empId: 'Ri0002',
      name: 'Amit',
      department: 'Marketing',
      date: 'dd-mm-yy',
      designation: 'UI/UX Designer',
    },
    {
      empId: 'Ri0003',
      name: 'Akhilesh',
      department: 'Marketing',
      date: 'dd-mm-yy',
      designation: 'Sales Executive',
    },
    {
      empId: 'Ri0004',
      name: 'Sapna',
      department: 'IT-Designing',
      date: 'dd-mm-yy',
      designation: 'Web Developer',
    },
  ]

  return (
    <div className="space-y-6">
      {/* --- Stats Cards (top row) --- */}
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

      {/* --- Chart Section (middle) --- */}
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
            {/* Simple arrow indicator */}
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

      {/* --- Bottom row: Table (2/3) + Donut (1/3) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Top Performer List */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="col-span-2 bg-white dark:bg-gray-800 rounded-lg p-4 shadow"
        >
          <h3 className="font-semibold text-lg mb-4">Top Performer List</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs font-bold">
                <tr>
                  <th className="px-4 py-3">EMP ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Designation</th>
                </tr>
              </thead>
              <tbody>
                {topPerformerList.map((row) => (
                  <tr
                    key={row.empId}
                    className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-3">{row.empId}</td>
                    <td className="px-4 py-3">{row.name}</td>
                    <td className="px-4 py-3">{row.department}</td>
                    <td className="px-4 py-3">{row.date}</td>
                    <td className="px-4 py-3">{row.designation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Donut Chart (Performance) */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Performance</h3>
            {/* Show current selection (Yearly, Monthly, Weekly) */}
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {selectedRange}
            </span>
          </div>

          {/* Donut Chart */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-40 h-40 mb-2">
              <Doughnut data={getDonutData()} options={donutOptions} />
            </div>

            {/* Dynamic labels based on selectedRange */}
            {(() => {
              const {
                maleCount,
                femaleCount,
                malePercent,
                femalePercent,
              } = donutDataMap[selectedRange] || donutDataMap.Monthly

              return (
                <div className="flex space-x-4 mt-2 text-sm font-medium">
                  <div className="flex flex-col items-center">
                    <span className="text-blue-500 dark:text-blue-400">
                      {malePercent}
                    </span>
                    <span className="text-gray-600 dark:text-gray-200">
                      Male: {maleCount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-orange-500 dark:text-orange-300">
                      {femalePercent}
                    </span>
                    <span className="text-gray-600 dark:text-gray-200">
                      Female: {femaleCount.toLocaleString()}
                    </span>
                  </div>
                </div>
              )
            })()}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
