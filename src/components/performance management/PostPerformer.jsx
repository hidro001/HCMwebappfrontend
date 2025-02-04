

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineEye } from 'react-icons/ai';

import EmployeeRatingModal from './model/EmployeeRatingModal';    // Updated KPI modal
import PostPerformerModal from './model/PostPerformerModal';      // New "Post of the Month" modal

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

const PostPerformer = ({
  monthSelect,
  yearSelect,
  designationSelect,
  handleFetch,
  handleReset,
  handlePost,
}) => {
  // State for controlling which employee is selected (for KPI modal)
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // State for controlling the "Post Performer of the Month" modal
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // Example employees for the "Post Performer" modal dropdown
  const employeeOptions = [
    {
      id: 'RI0043434',
      name: 'dummy Doe',
      designation: 'Designer',
      department: 'IT',
      avgRating: 4.5,
    },
    {
      id: 'RI0055555',
      name: 'Jane Roe',
      designation: 'Project Manager',
      department: 'Operations',
      avgRating: 4.2,
    },
  ];

  // Dummy data for the table (matches the screenshot placeholders)
  const topPerformersData = [
    {
      sl: '01',
      empId: 'Saket',
      name: 'Saket',
      designation: 'Saket',
      avgRating: 'Saket',
      totalRatings: 'Saket',
    },
    {
      sl: '02',
      empId: 'Noida',
      name: 'Noida',
      designation: 'Noida',
      avgRating: 'Noida',
      totalRatings: 'Noida',
    },
    // ...
    {
      sl: '10',
      empId: 'Noida',
      name: 'Noida',
      designation: 'Noida',
      avgRating: 'Noida',
      totalRatings: 'Noida',
    },
  ];

  // Opens the KPI "View" modal for an employee
  const handleView = (employee) => {
    setSelectedEmployee(employee);
  };
  const handleCloseModal = () => {
    setSelectedEmployee(null);
  };

  // === "Post Performer of the Month" modal actions ===
  const openPostModal = () => {
    setIsPostModalOpen(true);
  };
  const closePostModal = () => {
    setIsPostModalOpen(false);
  };
  const handleSubmitPostModal = (formData) => {
    console.log('Post Performer form data:', formData);
    // E.g. call your API to save the "Performer of the Month"
    // fetch('/api/performers', { method: 'POST', body: ... })
    // Then close the modal
    setIsPostModalOpen(false);
  };

  return (
    <motion.div
      key="postForm"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      {/* ===== Post Performer FORM ===== */}
      <div className="border-2 border-green-200 rounded-md p-4">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 dark:text-blue-200">
          Post Top Performer
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
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
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">No. Of Top Emp</label>
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
          {/* 
            You had a handlePost prop before—now we can simply
            open our new PostPerformerModal here instead:
          */}
          <button
            onClick={openPostModal}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Post Performer
          </button>
        </div>
      </div>

      {/* ===== Post Performer TABLE ===== */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <h3 className="font-semibold text-lg mb-4">Top 10 Rated Performer</h3>
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
                  AVG Rating
                </th>
                <th className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs font-bold">
                  Total Ratings
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
                    {row.avgRating}
                  </td>
                  <td className="px-4 py-3 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    {row.totalRatings}
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

      {/* 
        ===== The EmployeeRatingModal (KPI details) =====
        Opens when user clicks "View" in the table
      */}
      <EmployeeRatingModal employee={selectedEmployee} onClose={handleCloseModal} />

      {/*
        ===== The PostPerformerModal (create new "Performer of the Month") =====
        Opens when user clicks "Post Performer" button
      */}
      <PostPerformerModal
        isOpen={isPostModalOpen}
        onClose={closePostModal}
        employeeOptions={employeeOptions}
        onSubmit={handleSubmitPostModal}
      />
    </motion.div>
  );
};

export default PostPerformer;

