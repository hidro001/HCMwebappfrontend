

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { AiOutlineEye } from 'react-icons/ai';
// import PerformerDetailsModal from './model/PerformerDetailsModal';

// // Animation variants for Framer Motion
// const containerVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.4, ease: 'easeInOut' },
//   },
//   exit: {
//     opacity: 0,
//     y: -20,
//     transition: { duration: 0.2 },
//   },
// };

// const ViewPerformer = ({
//   monthSelect,
//   yearSelect,
//   designationSelect,
//   handleFetch,
//   handleReset,
// }) => {
//   // State for the selected performer (for the modal)
//   const [selectedPerformer, setSelectedPerformer] = useState(null);

//   // Example "placeholder" data to mimic your reference image
//   const topPerformersData = [
//     {
//       sl: '01',
//       empId: 'Saket',
//       name: 'Saket',
//       designation: 'Saket',
//       department: 'Saket',
//       avgRating: 'Saket',
//       monthYear: 'Saket',
//     },
//     {
//       sl: '02',
//       empId: 'Noida',
//       name: 'Noida',
//       designation: 'Noida',
//       department: 'Noida',
//       avgRating: 'Noida',
//       monthYear: 'Noida',
//     },
//     {
//       sl: '03',
//       empId: 'Delhi',
//       name: 'Delhi',
//       designation: 'Delhi',
//       department: 'Delhi',
//       avgRating: 'Delhi',
//       monthYear: 'Delhi',
//     },
//     {
//       sl: '04',
//       empId: 'Saket',
//       name: 'Saket',
//       designation: 'Saket',
//       department: 'Saket',
//       avgRating: 'Saket',
//       monthYear: 'Saket',
//     },
//     {
//       sl: '05',
//       empId: 'Noida',
//       name: 'Noida',
//       designation: 'Noida',
//       department: 'Noida',
//       avgRating: 'Noida',
//       monthYear: 'Noida',
//     },
//     {
//       sl: '06',
//       empId: 'Delhi',
//       name: 'Delhi',
//       designation: 'Delhi',
//       department: 'Delhi',
//       avgRating: 'Delhi',
//       monthYear: 'Delhi',
//     },
//   ];

//   // Handler to open the modal
//   const handleView = (performer) => {
//     setSelectedPerformer(performer);
//   };
//   // Handler to close the modal
//   const handleCloseModal = () => {
//     setSelectedPerformer(null);
//   };

//   return (
//     <motion.div
//       key="viewForm"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       exit="exit"
//       className="space-y-6"
//     >
//       {/* ===== View Performer FORM ===== */}
//       <div className="border-2 border-green-200 rounded-md p-4">
//         <h2 className="text-2xl font-bold text-blue-800 mb-4 dark:text-blue-200">
//           View Top Performer
//         </h2>

//         {/* Form Controls: Month, Year, Designation */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <div className="flex flex-col">
//             <label className="mb-1 text-sm font-medium">Month</label>
//             {monthSelect}
//           </div>
//           <div className="flex flex-col">
//             <label className="mb-1 text-sm font-medium">Year</label>
//             {yearSelect}
//           </div>
//           <div className="flex flex-col">
//             <label className="mb-1 text-sm font-medium">Designation</label>
//             {designationSelect}
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="mt-4 flex gap-4">
//           <button
//             onClick={handleFetch}
//             className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md"
//           >
//             Fetch
//           </button>
//           <button
//             onClick={handleReset}
//             className="bg-orange-100 text-orange-600 border border-orange-200 hover:bg-orange-200 px-4 py-2 rounded-md"
//           >
//             Reset
//           </button>
//         </div>
//       </div>

//       {/* ===== View Performer TABLE ===== */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
//         <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-100">
//           Top Performers (View Side)
//         </h3>
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm text-left border-collapse border border-gray-300 dark:border-gray-700">
//             <thead className="bg-gray-100 dark:bg-gray-700">
//               <tr>
//                 <th className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs font-bold">
//                   S.L
//                 </th>
//                 <th className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs font-bold">
//                   Emp ID
//                 </th>
//                 <th className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs font-bold">
//                   Name
//                 </th>
//                 <th className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs font-bold">
//                   Designation
//                 </th>
//                 <th className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs font-bold">
//                   Department
//                 </th>
//                 <th className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs font-bold">
//                   AVG Rating
//                 </th>
//                 <th className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs font-bold">
//                   Month/Year
//                 </th>
//                 <th className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs font-bold">
//                   Details
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {topPerformersData.map((row) => (
//                 <tr
//                   key={row.sl}
//                   className="hover:bg-gray-50 dark:hover:bg-gray-700"
//                 >
//                   <td className="px-4 py-3 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
//                     {row.sl}
//                   </td>
//                   <td className="px-4 py-3 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
//                     {row.empId}
//                   </td>
//                   <td className="px-4 py-3 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
//                     {row.name}
//                   </td>
//                   <td className="px-4 py-3 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
//                     {row.designation}
//                   </td>
//                   <td className="px-4 py-3 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
//                     {row.department}
//                   </td>
//                   <td className="px-4 py-3 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
//                     {row.avgRating}
//                   </td>
//                   <td className="px-4 py-3 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
//                     {row.monthYear}
//                   </td>
//                   <td className="px-4 py-3 border border-gray-300 dark:border-gray-700">
//                     <button
//                       onClick={() => handleView(row)}
//                       className="
//                         inline-flex items-center gap-1
//                         bg-blue-100 dark:bg-blue-900
//                         text-blue-600 dark:text-blue-200
//                         px-3 py-1 rounded-md text-sm
//                         hover:bg-blue-200 dark:hover:bg-blue-800
//                       "
//                     >
//                       <AiOutlineEye />
//                       <span>View</span>
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ===== The separate PerformerDetailsModal component ===== */}
//       <PerformerDetailsModal performer={selectedPerformer} onClose={handleCloseModal} />
//     </motion.div>
//   );
// };

// export default ViewPerformer;



// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { useForm } from 'react-hook-form';
// import { AiOutlineEye } from 'react-icons/ai';

// import PostAndViewPerformersStore from '../../store/PostAndViewPerformersStore';
// import PerformerDetailsModal from './model/PerformerDetailsModal';

// const containerVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.4, ease: 'easeInOut' },
//   },
//   exit: {
//     opacity: 0,
//     y: -20,
//     transition: { duration: 0.2 },
//   },
// };

// const ViewPerformer = () => {
//   const {
//     designations,
//     topPerformers,
//     loading,
//     fetchDesignations,
//     fetchTopPerformers,
//   } = PostAndViewPerformersStore();

//   const [selectedPerformer, setSelectedPerformer] = useState(null);

//   const { register, handleSubmit, reset } = useForm({
//     defaultValues: {
//       month: '',
//       year: '',
//       designation: '',
//     },
//   });

//   // On mount, fetch designations
//   useEffect(() => {
//     fetchDesignations();
//   }, [fetchDesignations]);

//   // Submit
//   const onFetch = (data) => {
//     const { month, year, designation } = data;
//     fetchTopPerformers(month, year, designation);
//   };

//   // Reset
//   const onReset = () => {
//     reset({ month: '', year: '', designation: '' });
//   };

//   // Handle modal open/close
//   const handleView = (perf) => {
//     setSelectedPerformer(perf);
//   };
//   const handleCloseModal = () => {
//     setSelectedPerformer(null);
//   };

//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       exit="exit"
//       className="space-y-6"
//     >
//       {/* ==== FILTER FORM ==== */}
//       <div className="border-2 border-green-200 rounded-md p-4">
//         <h2 className="text-2xl font-bold text-blue-800 mb-4 dark:text-blue-200">
//           View Top Performer
//         </h2>
//         <form onSubmit={handleSubmit(onFetch)}>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             {/* Month */}
//             <div className="flex flex-col">
//               <label className="mb-1 text-sm font-medium">Month</label>
//               <input
//                 type="number"
//                 placeholder="1-12"
//                 {...register('month')}
//                 className="border border-gray-300 dark:border-gray-600
//                            bg-white dark:bg-gray-700
//                            text-gray-800 dark:text-gray-100
//                            rounded-md px-3 py-2 text-sm
//                            focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             {/* Year */}
//             <div className="flex flex-col">
//               <label className="mb-1 text-sm font-medium">Year</label>
//               <input
//                 type="number"
//                 placeholder="e.g. 2025"
//                 {...register('year')}
//                 className="border border-gray-300 dark:border-gray-600
//                            bg-white dark:bg-gray-700
//                            text-gray-800 dark:text-gray-100
//                            rounded-md px-3 py-2 text-sm
//                            focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             {/* Designation */}
//             <div className="flex flex-col">
//               <label className="mb-1 text-sm font-medium">Designation</label>
//               <select
//                 {...register('designation')}
//                 className="border border-gray-300 dark:border-gray-600
//                            bg-white dark:bg-gray-700
//                            text-gray-800 dark:text-gray-100
//                            rounded-md px-3 py-2 text-sm
//                            focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">--All--</option>
//                 {designations.map((d) => (
//                   <option key={d} value={d}>
//                     {d}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="mt-4 flex gap-4">
//             <button
//               type="submit"
//               className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md"
//               disabled={loading}
//             >
//               {loading ? 'Fetching...' : 'Fetch'}
//             </button>
//             <button
//               type="button"
//               onClick={onReset}
//               className="bg-orange-100 text-orange-600 border border-orange-200 hover:bg-orange-200 px-4 py-2 rounded-md"
//               disabled={loading}
//             >
//               Reset
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* ==== TABLE OF TOP PERFORMERS (POSTED) ==== */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
//         <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-100">
//           Posted Top Performers
//         </h3>
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm text-left border-collapse border border-gray-300 dark:border-gray-700">
//             <thead className="bg-gray-100 dark:bg-gray-700">
//               <tr>
//                 <th className="px-4 py-3 border text-xs uppercase font-bold">#</th>
//                 <th className="px-4 py-3 border text-xs uppercase font-bold">Profile</th>
//                 <th className="px-4 py-3 border text-xs uppercase font-bold">Emp ID</th>
//                 <th className="px-4 py-3 border text-xs uppercase font-bold">Name</th>
//                 <th className="px-4 py-3 border text-xs uppercase font-bold">Designation</th>
//                 <th className="px-4 py-3 border text-xs uppercase font-bold">Department</th>
//                 <th className="px-4 py-3 border text-xs uppercase font-bold">Avg Rating</th>
//                 <th className="px-4 py-3 border text-xs uppercase font-bold">Month/Year</th>
//                 <th className="px-4 py-3 border text-xs uppercase font-bold">Details</th>
//               </tr>
//             </thead>
//             <tbody>
//               {topPerformers.map((perf, index) => (
//                 <tr key={perf._id || index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                   <td className="px-4 py-3 border">{index + 1}</td>
//                   <td className="px-4 py-3 border">
//                     {perf.employee?.user_Avatar ? (
//                       <img
//                         src={perf.employee.user_Avatar}
//                         alt={`${perf.employee?.first_Name ?? ''}`}
//                         className="w-8 h-8 object-cover rounded-full"
//                       />
//                     ) : (
//                       'N/A'
//                     )}
//                   </td>
//                   <td className="px-4 py-3 border">
//                     {perf.employee?.employee_Id || 'N/A'}
//                   </td>
//                   <td className="px-4 py-3 border">
//                     {perf.employee
//                       ? `${perf.employee.first_Name} ${perf.employee.last_Name}`
//                       : 'N/A'}
//                   </td>
//                   <td className="px-4 py-3 border">
//                     {perf.employee?.designation || 'N/A'}
//                   </td>
//                   <td className="px-4 py-3 border">
//                     {perf.employee?.department || 'N/A'}
//                   </td>
//                   <td className="px-4 py-3 border">
//                     {perf.averageRating} / 5
//                   </td>
//                   <td className="px-4 py-3 border">
//                     {perf.month}/{perf.year}
//                   </td>
//                   <td className="px-4 py-3 border">
//                     <button
//                       onClick={() => handleView(perf)}
//                       className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 px-3 py-1 rounded-md text-sm"
//                     >
//                       <AiOutlineEye />
//                       <span>View</span>
//                     </button>
//                   </td>
//                 </tr>
//               ))}

//               {!topPerformers.length && !loading && (
//                 <tr>
//                   <td colSpan={9} className="text-center py-4">
//                     No top performers found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Performer Details Modal */}
//       <PerformerDetailsModal performer={selectedPerformer} onClose={handleCloseModal} />
//     </motion.div>
//   );
// };

// export default ViewPerformer;

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { AiOutlineEye } from 'react-icons/ai';

import PostAndViewPerformersStore from '../../store/PostAndViewPerformersStore';
import PerformerDetailsModal from './model/PerformerDetailsModal';

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

const ViewPerformer = () => {
  const {
    designations,
    topPerformers,
    loading,
    fetchDesignations,
    fetchTopPerformers,
  } = PostAndViewPerformersStore();

  const [selectedPerformer, setSelectedPerformer] = useState(null);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      month: '',
      year: '',
      designation: '',
    },
  });

  // 1) On mount, fetch designations
  useEffect(() => {
    fetchDesignations();
  }, [fetchDesignations]);

  // 2) On mount, set previous month/current year as default, and immediately fetch
  useEffect(() => {
    const now = new Date();
    let defaultYear = now.getFullYear();
    let defaultMonth = now.getMonth() + 1; // JS: 0-based => +1 => 1..12

    // If current month is January => go to December of the previous year
    if (defaultMonth === 1) {
      defaultMonth = 12;
      defaultYear -= 1;
    } else {
      defaultMonth -= 1;
    }

    // Set default form values
    reset({
      month: defaultMonth,
      year: defaultYear,
      designation: '',
    });

    // Fetch performers for that previous month/current year
    fetchTopPerformers(defaultMonth, defaultYear, '');
  }, [reset, fetchTopPerformers]);

  // Handle manual "Fetch"
  const onFetch = (data) => {
    const { month, year, designation } = data;
    fetchTopPerformers(month, year, designation);
  };

  // Handle "Reset"
  const onReset = () => {
    reset({ month: '', year: '', designation: '' });
  };

  // Handle opening/closing the details modal
  const handleView = (perf) => {
    setSelectedPerformer(perf);
  };
  const handleCloseModal = () => {
    setSelectedPerformer(null);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      {/* ==== FILTER FORM ==== */}
      <div className="border-2 border-green-200 rounded-md p-4">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 dark:text-blue-200">
          View Top Performer
        </h2>
        <form onSubmit={handleSubmit(onFetch)}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Month */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">Month</label>
              <input
                type="number"
                placeholder="1-12"
                {...register('month')}
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
                {...register('year')}
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
          </div>
        </form>
      </div>

      {/* ==== TABLE OF TOP PERFORMERS (POSTED) ==== */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-100">
          Posted Top Performers
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border-collapse border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 border text-xs uppercase font-bold">#</th>
                <th className="px-4 py-3 border text-xs uppercase font-bold">Profile</th>
                <th className="px-4 py-3 border text-xs uppercase font-bold">Emp ID</th>
                <th className="px-4 py-3 border text-xs uppercase font-bold">Name</th>
                <th className="px-4 py-3 border text-xs uppercase font-bold">Designation</th>
                <th className="px-4 py-3 border text-xs uppercase font-bold">Department</th>
                <th className="px-4 py-3 border text-xs uppercase font-bold">Avg Rating</th>
                <th className="px-4 py-3 border text-xs uppercase font-bold">Month/Year</th>
                <th className="px-4 py-3 border text-xs uppercase font-bold">Details</th>
              </tr>
            </thead>
            <tbody>
              {topPerformers.map((perf, index) => (
                <tr key={perf._id || index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3 border">{index + 1}</td>
                  <td className="px-4 py-3 border">
                    {perf.employee?.user_Avatar ? (
                      <img
                        src={perf.employee.user_Avatar}
                        alt={`${perf.employee?.first_Name ?? ''}`}
                        className="w-8 h-8 object-cover rounded-full"
                      />
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="px-4 py-3 border">
                    {perf.employee?.employee_Id || 'N/A'}
                  </td>
                  <td className="px-4 py-3 border">
                    {perf.employee
                      ? `${perf.employee.first_Name} ${perf.employee.last_Name}`
                      : 'N/A'}
                  </td>
                  <td className="px-4 py-3 border">
                    {perf.employee?.designation || 'N/A'}
                  </td>
                  <td className="px-4 py-3 border">
                    {perf.employee?.department || 'N/A'}
                  </td>
                  <td className="px-4 py-3 border">
                    {perf.averageRating} / 5
                  </td>
                  <td className="px-4 py-3 border">
                    {perf.month}/{perf.year}
                  </td>
                  <td className="px-4 py-3 border">
                    <button
                      onClick={() => handleView(perf)}
                      className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 px-3 py-1 rounded-md text-sm"
                    >
                      <AiOutlineEye />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}

              {!topPerformers.length && !loading && (
                <tr>
                  <td colSpan={9} className="text-center py-4">
                    No top performers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performer Details Modal */}
      <PerformerDetailsModal performer={selectedPerformer} onClose={handleCloseModal} />
    </motion.div>
  );
};

export default ViewPerformer;
