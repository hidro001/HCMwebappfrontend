import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AiOutlineEye } from 'react-icons/ai'

/**
 * Example code for a dual "Post Performer" / "View Performer" UI
 * with forms, tables, dark mode classes, Framer Motion transitions,
 * and React Icons.  Tweak as needed!
 */
export default function PostAndViewPerformers() {
  // Keep track of which tab is active: "post" or "view"
  const [activeTab, setActiveTab] = useState('post')

  // Some dummy data for the table
  const topPerformersData = [
    {
      sl: '01',
      empId: 'Saket',
      name: 'Saket',
      designation: 'Saket',
      department: 'Saket',
      avgRating: 'Saket',
      monthYear: 'Saket',
    },
    {
      sl: '02',
      empId: 'Noida',
      name: 'Noida',
      designation: 'Noida',
      department: 'Noida',
      avgRating: 'Noida',
      monthYear: 'Noida',
    },
    {
      sl: '03',
      empId: 'Noida',
      name: 'Noida',
      designation: 'Noida',
      department: 'Noida',
      avgRating: 'Noida',
      monthYear: 'Noida',
    },
    {
      sl: '04',
      empId: 'Delhi',
      name: 'Delhi',
      designation: 'Delhi',
      department: 'Delhi',
      avgRating: 'Delhi',
      monthYear: 'Delhi',
    },
    {
      sl: '05',
      empId: 'Saket',
      name: 'Saket',
      designation: 'Saket',
      department: 'Saket',
      avgRating: 'Saket',
      monthYear: 'Saket',
    },
    {
      sl: '06',
      empId: 'Delhi',
      name: 'Delhi',
      designation: 'Delhi',
      department: 'Delhi',
      avgRating: 'Delhi',
      monthYear: 'Delhi',
    },
    {
      sl: '07',
      empId: 'Noida',
      name: 'Noida',
      designation: 'Noida',
      department: 'Noida',
      avgRating: 'Noida',
      monthYear: 'Noida',
    },
    {
      sl: '08',
      empId: 'Delhi',
      name: 'Delhi',
      designation: 'Delhi',
      department: 'Delhi',
      avgRating: 'Delhi',
      monthYear: 'Delhi',
    },
    {
      sl: '09',
      empId: 'Saket',
      name: 'Saket',
      designation: 'Saket',
      department: 'Saket',
      avgRating: 'Saket',
      monthYear: 'Saket',
    },
    {
      sl: '10',
      empId: 'Noida',
      name: 'Noida',
      designation: 'Noida',
      department: 'Noida',
      avgRating: 'Noida',
      monthYear: 'Noida',
    },
  ]

  // Simple Framer Motion variants for fade/slide transitions
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 },
    },
  }

  // Handlers for button clicks (dummy for now)
  const handleFetch = () => {
    alert(`Fetch clicked for ${activeTab} performer.`)
  }
  const handleReset = () => {
    alert('Reset clicked!')
  }
  const handlePost = () => {
    alert('Post Performer clicked!')
  }

  // Common form inputs for both Post & View
  const monthSelect = (
    <select
      className="
        border border-gray-300 dark:border-gray-600
        bg-white dark:bg-gray-700
        text-gray-800 dark:text-gray-100
        rounded-md px-3 py-2 text-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500
        appearance-none
      "
      defaultValue=""
    >
      <option value="" disabled>
        Select Month
      </option>
      <option value="Jan">January</option>
      <option value="Feb">February</option>
      <option value="Mar">March</option>
      {/* Add more months as needed */}
    </select>
  )

  const yearSelect = (
    <select
      className="
        border border-gray-300 dark:border-gray-600
        bg-white dark:bg-gray-700
        text-gray-800 dark:text-gray-100
        rounded-md px-3 py-2 text-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500
        appearance-none
      "
      defaultValue=""
    >
      <option value="" disabled>
        Select Year
      </option>
      <option value="2023">2023</option>
      <option value="2024">2024</option>
      {/* Add more years as needed */}
    </select>
  )

  const designationSelect = (
    <select
      className="
        border border-gray-300 dark:border-gray-600
        bg-white dark:bg-gray-700
        text-gray-800 dark:text-gray-100
        rounded-md px-3 py-2 text-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500
        appearance-none
      "
      defaultValue=""
    >
      <option value="" disabled>
        Select Designation
      </option>
      <option value="Saket">Saket</option>
      <option value="Noida">Noida</option>
      <option value="Delhi">Delhi</option>
      {/* Add more designations as needed */}
    </select>
  )

  return (
    <div className="p-4 space-y-8">
      {/* Tab buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setActiveTab('post')}
          className={`
            px-6 py-2 rounded-full 
            border-2 border-purple-400
            text-purple-600
            hover:bg-purple-50 dark:hover:bg-gray-700
            transition-colors
            ${activeTab === 'post' ? 'bg-purple-100 dark:bg-purple-900' : ''}
          `}
        >
          Post Performer
        </button>

        <button
          onClick={() => setActiveTab('view')}
          className={`
            px-6 py-2 rounded-full 
            border-2 border-purple-400
            text-purple-600
            hover:bg-purple-50 dark:hover:bg-gray-700
            transition-colors
            ${activeTab === 'view' ? 'bg-purple-100 dark:bg-purple-900' : ''}
          `}
        >
          View Performer
        </button>
      </div>

      {/* AnimatePresence will mount/unmount the correct form */}
      <AnimatePresence mode="wait">
        {activeTab === 'post' && (
          <motion.div
            key="postForm"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="border-2 border-green-200 rounded-md p-4"
          >
            <h2 className="text-xl font-bold text-blue-800 mb-4 dark:text-blue-200">
              Post Top Performer
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {/* Month */}
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">Month</label>
                {monthSelect}
              </div>
              {/* Year */}
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">Year</label>
                {yearSelect}
              </div>
              {/* Designation */}
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">Designation</label>
                {designationSelect}
              </div>
              {/* Number of Top Emp */}
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">
                  No. Of Top Emp
                </label>
                <input
                  type="text"
                  className="
                    border border-gray-300 dark:border-gray-600
                    bg-white dark:bg-gray-700
                    text-gray-800 dark:text-gray-100
                    rounded-md px-3 py-2 text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                  "
                  defaultValue="05"
                />
              </div>
            </div>
            {/* Action Buttons */}
            <div className="mt-4 flex gap-4">
              <button
                onClick={handleFetch}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md"
              >
                Fetch
              </button>
              <button
                onClick={handleReset}
                className="bg-orange-100 text-orange-600 border border-orange-200 hover:bg-orange-200 px-4 py-2 rounded-md"
              >
                Reset
              </button>
              <button
                onClick={handlePost}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Post Performer
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'view' && (
          <motion.div
            key="viewForm"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="border-2 border-green-200 rounded-md p-4"
          >
            <h2 className="text-xl font-bold text-blue-800 mb-4 dark:text-blue-200">
              View Top Performer
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Month */}
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">Month</label>
                {monthSelect}
              </div>
              {/* Year */}
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">Year</label>
                {yearSelect}
              </div>
              {/* Designation */}
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">Designation</label>
                {designationSelect}
              </div>
            </div>
            {/* Action Buttons */}
            <div className="mt-4 flex gap-4">
              <button
                onClick={handleFetch}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md"
              >
                Fetch
              </button>
              <button
                onClick={handleReset}
                className="bg-orange-100 text-orange-600 border border-orange-200 hover:bg-orange-200 px-4 py-2 rounded-md"
              >
                Reset
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table of Performers */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow"
      >
        <h3 className="font-semibold text-lg mb-4">
          {activeTab === 'post' ? 'Top 10 Rated Performer' : 'Top Performers'}
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs font-bold">
              <tr>
                <th className="px-4 py-3">S.L</th>
                <th className="px-4 py-3">Emp ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Designation</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">AVG Rating</th>
                <th className="px-4 py-3">Month/Year</th>
                <th className="px-4 py-3">Details</th>
              </tr>
            </thead>
            <tbody>
              {topPerformersData.map((row) => (
                <tr
                  key={row.sl}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-3">{row.sl}</td>
                  <td className="px-4 py-3">{row.empId}</td>
                  <td className="px-4 py-3">{row.name}</td>
                  <td className="px-4 py-3">{row.designation}</td>
                  <td className="px-4 py-3">{row.department}</td>
                  <td className="px-4 py-3">{row.avgRating}</td>
                  <td className="px-4 py-3">{row.monthYear}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => alert(`View clicked for ${row.empId}`)}
                      className="
                        inline-flex items-center gap-1
                        bg-blue-100 dark:bg-blue-900
                        text-blue-600 dark:text-blue-200
                        px-3 py-1 rounded-md text-sm
                        hover:bg-blue-200 dark:hover:bg-blue-800
                      "
                    >
                      <AiOutlineEye />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
