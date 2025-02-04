

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineEye } from 'react-icons/ai';
import PerformerDetailsModal from './model/PerformerDetailsModal';

// Animation variants for Framer Motion
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
};

const ViewPerformer = ({
  monthSelect,
  yearSelect,
  designationSelect,
  handleFetch,
  handleReset,
}) => {
  // State for the selected performer (for the modal)
  const [selectedPerformer, setSelectedPerformer] = useState(null);

  // Example "placeholder" data to mimic your reference image
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
      empId: 'Delhi',
      name: 'Delhi',
      designation: 'Delhi',
      department: 'Delhi',
      avgRating: 'Delhi',
      monthYear: 'Delhi',
    },
    {
      sl: '04',
      empId: 'Saket',
      name: 'Saket',
      designation: 'Saket',
      department: 'Saket',
      avgRating: 'Saket',
      monthYear: 'Saket',
    },
    {
      sl: '05',
      empId: 'Noida',
      name: 'Noida',
      designation: 'Noida',
      department: 'Noida',
      avgRating: 'Noida',
      monthYear: 'Noida',
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
  ];

  // Handler to open the modal
  const handleView = (performer) => {
    setSelectedPerformer(performer);
  };
  // Handler to close the modal
  const handleCloseModal = () => {
    setSelectedPerformer(null);
  };

  return (
    <motion.div
      key="viewForm"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      {/* ===== View Performer FORM ===== */}
      <div className="border-2 border-green-200 rounded-md p-4">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 dark:text-blue-200">
          View Top Performer
        </h2>

        {/* Form Controls: Month, Year, Designation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Month</label>
            {monthSelect}
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Year</label>
            {yearSelect}
          </div>
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
      </div>

      {/* ===== View Performer TABLE ===== */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-100">
          Top Performers (View Side)
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border-collapse border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs font-bold">
                  S.L
                </th>
                <th className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs font-bold">
                  Emp ID
                </th>
                <th className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs font-bold">
                  Name
                </th>
                <th className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs font-bold">
                  Designation
                </th>
                <th className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs font-bold">
                  Department
                </th>
                <th className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs font-bold">
                  AVG Rating
                </th>
                <th className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs font-bold">
                  Month/Year
                </th>
                <th className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs font-bold">
                  Details
                </th>
              </tr>
            </thead>

            <tbody>
              {topPerformersData.map((row) => (
                <tr
                  key={row.sl}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-3 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    {row.sl}
                  </td>
                  <td className="px-4 py-3 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    {row.empId}
                  </td>
                  <td className="px-4 py-3 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    {row.name}
                  </td>
                  <td className="px-4 py-3 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    {row.designation}
                  </td>
                  <td className="px-4 py-3 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    {row.department}
                  </td>
                  <td className="px-4 py-3 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    {row.avgRating}
                  </td>
                  <td className="px-4 py-3 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    {row.monthYear}
                  </td>
                  <td className="px-4 py-3 border border-gray-300 dark:border-gray-700">
                    <button
                      onClick={() => handleView(row)}
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
      </div>

      {/* ===== The separate PerformerDetailsModal component ===== */}
      <PerformerDetailsModal performer={selectedPerformer} onClose={handleCloseModal} />
    </motion.div>
  );
};

export default ViewPerformer;
