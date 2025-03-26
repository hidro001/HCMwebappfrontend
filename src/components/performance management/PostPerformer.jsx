


import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { AiOutlineEye } from 'react-icons/ai';

import PostAndViewPerformersStore from '../../store/PostAndViewPerformersStore';
import EmployeeRatingModal from './model/EmployeeRatingModal'; 
import PostPerformerModal from './model/PostPerformerModal';   

// For framer-motion animation
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

const PostPerformer = () => {
  const {
    designations,
    topEmployees,
    loading,
    fetchDesignations,
    fetchTopRatedEmployees,
  } = PostAndViewPerformersStore();

  // For the "View KPI" (EmployeeRatingModal)
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // For the "Post Performer" modal
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // React Hook Form for the filter fields
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      month: '',
      year: '',
      designation: '',
      limit: 5,
    },
  });

  // 1) On mount, fetch designations.
  useEffect(() => {
    fetchDesignations();
  }, [fetchDesignations]);

  // 2) Also on mount, automatically set previous month/current year
  //    and immediately fetch top-rated employees.
  useEffect(() => {
    const now = new Date();
    let defaultYear = now.getFullYear();
    let defaultMonth = now.getMonth() + 1; // JS getMonth() is 0-11, so +1 => 1-12

    // If it's currently January => go to December of the previous year
    if (defaultMonth === 1) {
      defaultMonth = 12;
      defaultYear -= 1;
    } else {
      defaultMonth -= 1;
    }

    // Set our form defaults
    reset({
      month: defaultMonth,
      year: defaultYear,
      designation: '',
      limit: 5,
    });

    // Immediately fetch
    fetchTopRatedEmployees(defaultMonth, defaultYear, '', 5);
  }, [reset, fetchTopRatedEmployees]);

  // Handle "Fetch" top employees
  const onFetch = (data) => {
    const { month, year, designation, limit } = data;
    fetchTopRatedEmployees(month, year, designation, limit);
  };

  // Handle "Reset"
  const onReset = () => {
    reset({ month: '', year: '', designation: '', limit: 5 });
  };

  // Open/close KPI detail modal
  const handleView = (employee) => {
    setSelectedEmployee(employee);
  };
  const handleCloseRatingModal = () => {
    setSelectedEmployee(null);
  };

  // Open/close PostPerformerModal
  const openPostModal = () => setIsPostModalOpen(true);
  const closePostModal = () => setIsPostModalOpen(false);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      {/* ===== FORM for Filters ===== */}
      <div className="border-2 border-green-200 rounded-md p-4">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 dark:text-blue-200">
          Post Top Performer
        </h2>
        <form onSubmit={handleSubmit(onFetch)}>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {/* Month */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">Month</label>
              <input
                type="number"
                placeholder="1-12"
                {...register('month', { required: true })}
                className="border border-gray-300 dark:border-gray-600
                           bg-white dark:bg-gray-700
                           text-gray-800 dark:text-gray-100
                           rounded-md px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Year */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">Year</label>
              <input
                type="number"
                placeholder="e.g. 2025"
                {...register('year', { required: true })}
                className="border border-gray-300 dark:border-gray-600
                           bg-white dark:bg-gray-700
                           text-gray-800 dark:text-gray-100
                           rounded-md px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Designation */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">Designation</label>
              <select
                {...register('designation')}
                className="border border-gray-300 dark:border-gray-600
                           bg-white dark:bg-gray-700
                           text-gray-800 dark:text-gray-100
                           rounded-md px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">--All--</option>
                {designations.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Limit */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">No. of Top Emp</label>
              <input
                type="number"
                min="1"
                max="1000"
                {...register('limit')}
                className="border border-gray-300 dark:border-gray-600
                           bg-white dark:bg-gray-700
                           text-gray-800 dark:text-gray-100
                           rounded-md px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-4 flex gap-4">
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md"
              disabled={loading}
            >
              {loading ? 'Fetching...' : 'Fetch'}
            </button>
            <button
              type="button"
              onClick={onReset}
              className="bg-orange-100 text-orange-600 border border-orange-200 hover:bg-orange-200 px-4 py-2 rounded-md"
              disabled={loading}
            >
              Reset
            </button>
            {/* Post Performer of the Month */}
            <button
              type="button"
              onClick={openPostModal}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              disabled={loading || !topEmployees.length}
            >
              Post Performer
            </button>
          </div>
        </form>
      </div>

      {/* ===== TABLE of Top Rated Employees ===== */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <h3 className="font-semibold text-lg mb-4">Top {topEmployees.length} Rated Performer(s)</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border-collapse border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 border text-xs uppercase font-bold">#</th>
                <th className="px-4 py-3 border text-xs uppercase font-bold">Emp ID</th>
                <th className="px-4 py-3 border text-xs uppercase font-bold">Name</th>
                <th className="px-4 py-3 border text-xs uppercase font-bold">Designation</th>
                <th className="px-4 py-3 border text-xs uppercase font-bold">Avg Rating</th>
                <th className="px-4 py-3 border text-xs uppercase font-bold">Total Ratings</th>
                <th className="px-4 py-3 border text-xs uppercase font-bold">Details</th>
              </tr>
            </thead>
            <tbody>
              {topEmployees.map((emp, idx) => (
                <tr key={emp._id || idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3 border">{idx + 1}</td>
                  <td className="px-4 py-3 border">{emp.employeeId}</td>
                  <td className="px-4 py-3 border">
                    {emp.firstName} {emp.lastName}
                  </td>
                  <td className="px-4 py-3 border">{emp.designation}</td>
                  <td className="px-4 py-3 border">
                    {emp.averageRating} / 5
                  </td>
                  <td className="px-4 py-3 border">{emp.totalRatings}</td>
                  <td className="px-4 py-3 border">
                    <button
                      onClick={() => setSelectedEmployee(emp)}
                      className="inline-flex items-center gap-1 bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm"
                    >
                      <AiOutlineEye />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
              {!topEmployees.length && !loading && (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    No top-rated employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <EmployeeRatingModal employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />
      <PostPerformerModal isOpen={isPostModalOpen} onClose={closePostModal} />
    </motion.div>
  );
};

export default PostPerformer;

