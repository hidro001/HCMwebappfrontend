// import React, { useState, useEffect, useMemo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaEye, FaEdit, FaTrash, FaPrint, FaFilePdf } from 'react-icons/fa';
// import { MdOutlineFileDownload } from 'react-icons/md';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { Skeleton } from '@mui/material';
// import ViewVacancyModal from './ViewVacancyModal';
// import UpdateVacancyModal from './UpdateVacancyModal';

// // ------------------ Framer Motion Variants ------------------
// const tableContainerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { when: 'beforeChildren', staggerChildren: 0.05 },
//   },
// };

// const tableRowVariants = {
//   hidden: { opacity: 0, y: 10 },
//   visible: { opacity: 1, y: 0 },
// };

// // ------------------ Dummy Data for Vacancies ------------------
// const DUMMY_VACANCIES = [
//   {
//     id: 1,
//     designation: 'UI/UX Designer',
//     department: 'IT',
//     budget: '3 LPA',
//     postedBy: 'Riya Mishra (RI0023)',
//     postedDate: '25 Jan 2025',
//     status: 'Filled',
//   },
//   {
//     id: 2,
//     designation: 'UI/UX Designer',
//     department: 'Marketing',
//     budget: '------',
//     postedBy: 'Riya Mishra (RI0023)',
//     postedDate: '25 Jan 2025',
//     status: 'Vacant',
//   },
//   {
//     id: 3,
//     designation: 'UI/UX Designer',
//     department: 'Marketing',
//     budget: '3 LPA',
//     postedBy: 'Riya Mishra (RI0023)',
//     postedDate: '25 Jan 2025',
//     status: 'Vacant',
//   },
//   {
//     id: 4,
//     designation: 'UI/UX Designer',
//     department: 'Marketing',
//     budget: '------',
//     postedBy: 'Riya Mishra (RI0023)',
//     postedDate: '25 Jan 2025',
//     status: 'Filled',
//   },
//   {
//     id: 5,
//     designation: 'UI/UX Designer',
//     department: 'Marketing',
//     budget: '3 LPA',
//     postedBy: 'Riya Mishra (RI0023)',
//     postedDate: '25 Jan 2025',
//     status: 'Vacant',
//   },
//   {
//     id: 6,
//     designation: 'UI/UX Designer',
//     department: 'Marketing',
//     budget: '------',
//     postedBy: 'Riya Mishra (RI0023)',
//     postedDate: '25 Jan 2025',
//     status: 'Filled',
//   },
//   {
//     id: 7,
//     designation: 'UI/UX Designer',
//     department: 'Marketing',
//     budget: '3 LPA',
//     postedBy: 'Riya Mishra (RI0023)',
//     postedDate: '25 Jan 2025',
//     status: 'Filled',
//   },
//   {
//     id: 8,
//     designation: 'UI/UX Designer',
//     department: 'Marketing',
//     budget: '------',
//     postedBy: 'Riya Mishra (RI0023)',
//     postedDate: '25 Jan 2025',
//     status: 'Vacant',
//   },
//   {
//     id: 9,
//     designation: 'UI/UX Designer',
//     department: 'Marketing',
//     budget: '3 LPA',
//     postedBy: 'Riya Mishra (RI0023)',
//     postedDate: '25 Jan 2025',
//     status: 'Filled',
//   },
//   {
//     id: 10,
//     designation: 'UI/UX Designer',
//     department: 'Marketing',
//     budget: '------',
//     postedBy: 'Riya Mishra (RI0023)',
//     postedDate: '25 Jan 2025',
//     status: 'Filled',
//   },
//   {
//     id: 11,
//     designation: 'UI/UX Designer',
//     department: 'Marketing',
//     budget: '3 LPA',
//     postedBy: 'Riya Mishra (RI0023)',
//     postedDate: '25 Jan 2025',
//     status: 'Vacant',
//   },
//   {
//     id: 12,
//     designation: 'UI/UX Designer',
//     department: 'Marketing',
//     budget: '------',
//     postedBy: 'Riya Mishra (RI0023)',
//     postedDate: '25 Jan 2025',
//     status: 'Filled',
//   },
// ];

// // ================== Main VacanciesList Component ==================
// export default function VacanciesList() {
//   const [vacancies, setVacancies] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Table / Filter states
//   const [pageSize, setPageSize] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchText, setSearchText] = useState('');
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [department, setDepartment] = useState('All');
//   const [status, setStatus] = useState('All');

//   // Modal states
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
//   const [selectedVacancy, setSelectedVacancy] = useState(null);

//   // Simulate data load
//   useEffect(() => {
//     setTimeout(() => {
//       setVacancies(DUMMY_VACANCIES);
//       setLoading(false);
//     }, 1200);
//   }, []);

//   // ------- Filter logic -------
//   const filteredVacancies = useMemo(() => {
//     return vacancies.filter((item) => {
//       // Search
//       if (searchText) {
//         const matchDesignation = item.designation
//           .toLowerCase()
//           .includes(searchText.toLowerCase());
//         const matchDept = item.department
//           .toLowerCase()
//           .includes(searchText.toLowerCase());
//         if (!matchDesignation && !matchDept) return false;
//       }
//       // Department
//       if (department !== 'All' && item.department !== department) {
//         return false;
//       }
//       // Status
//       if (status !== 'All' && item.status !== status) {
//         return false;
//       }
//       // Date: for demo, assume all posted on 25 Jan 2025, or skip
//       if (selectedDate) {
//         const itemDate = new Date(2025, 0, 25).setHours(0, 0, 0, 0);
//         const filterDate = selectedDate.setHours(0, 0, 0, 0);
//         if (itemDate !== filterDate) {
//           return false;
//         }
//       }
//       return true;
//     });
//   }, [vacancies, searchText, department, status, selectedDate]);

//   // ------- Pagination -------
//   const totalPages = Math.ceil(filteredVacancies.length / pageSize);
//   const currentTableData = useMemo(() => {
//     const startIndex = (currentPage - 1) * pageSize;
//     return filteredVacancies.slice(startIndex, startIndex + pageSize);
//   }, [filteredVacancies, currentPage, pageSize]);

//   const handlePageChange = (page) => setCurrentPage(page);

//   // ------- Open/Close Modals -------
//   const handleViewModal = (vac) => {
//     setSelectedVacancy(vac);
//     setIsViewModalOpen(true);
//   };

//   const handleUpdateModal = (vac) => {
//     setSelectedVacancy(vac);
//     setIsUpdateModalOpen(true);
//   };

//   // Example callback for saving updated vacancy data
//   const handleSaveVacancy = (newStatus, newBudget) => {
//     alert(`Status updated to "${newStatus}", Budget: "${newBudget}"`);
//     setIsUpdateModalOpen(false);
//   };

//   return (
//     <div className="mx-auto px-4 py-6 bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-100 transition-colors">
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-2xl font-bold">Vacancies Management</h1>
//         <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600 transition-colors">
//           Import
//         </button>
//       </div>

//       {/* Top filters row */}
//       <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-md shadow mb-4 transition-colors">
//         <div className="flex items-center gap-4">
//           {/* Page size */}
//           <div className="flex items-center gap-2">
//             <label className="text-sm font-semibold whitespace-nowrap">Show</label>
//             <select
//               className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
//               value={pageSize}
//               onChange={(e) => {
//                 setPageSize(Number(e.target.value));
//                 setCurrentPage(1);
//               }}
//             >
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={20}>20</option>
//             </select>
//           </div>

//           {/* Search */}
//           <div>
//             <input
//               type="text"
//               placeholder="Search"
//               className="border rounded px-3 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
//               value={searchText}
//               onChange={(e) => {
//                 setSearchText(e.target.value);
//                 setCurrentPage(1);
//               }}
//             />
//           </div>
//         </div>

//         <div className="flex flex-wrap items-center gap-4">
//           {/* Date */}
//           <DatePicker
//             selected={selectedDate}
//             onChange={(date) => {
//               setSelectedDate(date);
//               setCurrentPage(1);
//             }}
//             dateFormat="dd MMM yyyy"
//             placeholderText="JAN 2025"
//             className="border rounded px-3 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
//           />

//           {/* Department */}
//           <select
//             className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
//             value={department}
//             onChange={(e) => {
//               setDepartment(e.target.value);
//               setCurrentPage(1);
//             }}
//           >
//             <option value="All">Department</option>
//             <option value="IT">IT</option>
//             <option value="Marketing">Marketing</option>
//           </select>

//           {/* Status */}
//           <select
//             className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
//             value={status}
//             onChange={(e) => {
//               setStatus(e.target.value);
//               setCurrentPage(1);
//             }}
//           >
//             <option value="All">Status</option>
//             <option value="Filled">Filled</option>
//             <option value="Vacant">Vacant</option>
//           </select>

//           {/* Export icons */}
//           <div className="flex items-center gap-2 text-gray-500 dark:text-gray-300">
//             <button
//               className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
//               title="Print"
//             >
//               <FaPrint size={16} />
//             </button>
//             <button
//               className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
//               title="Export PDF"
//             >
//               <FaFilePdf size={16} />
//             </button>
//             <button
//               className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
//               title="Export CSV/Excel"
//             >
//               <MdOutlineFileDownload size={18} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Table & skeleton */}
//       {loading ? (
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow transition-colors">
//           {Array.from({ length: pageSize }).map((_, i) => (
//             <Skeleton key={i} variant="rectangular" height={40} className="mb-2" />
//           ))}
//         </div>
//       ) : (
//         <>
//           {filteredVacancies.length > 0 ? (
//             <motion.div
//               className="bg-white dark:bg-gray-800 rounded-md shadow overflow-auto transition-colors"
//               variants={tableContainerVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               <motion.table className="w-full text-left border-collapse">
//                 <thead className="bg-gray-100 dark:bg-gray-700 transition-colors">
//                   <tr>
//                     <th className="p-3 text-sm font-semibold">S.L</th>
//                     <th className="p-3 text-sm font-semibold">Designation</th>
//                     <th className="p-3 text-sm font-semibold">Department</th>
//                     <th className="p-3 text-sm font-semibold">Budget</th>
//                     <th className="p-3 text-sm font-semibold">Posted By</th>
//                     <th className="p-3 text-sm font-semibold">Posted Date</th>
//                     <th className="p-3 text-sm font-semibold">Status</th>
//                     <th className="p-3 text-sm font-semibold">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentTableData.map((vac, idx) => {
//                     const rowIndex = (currentPage - 1) * pageSize + (idx + 1);

//                     // Color-coded status (light & dark)
//                     let statusClasses =
//                       'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-100 border border-gray-200 dark:border-gray-500 px-2 py-1 rounded text-xs font-semibold';
//                     if (vac.status === 'Filled') {
//                       statusClasses =
//                         'bg-green-50 dark:bg-green-700 text-green-600 dark:text-green-100 border border-green-200 dark:border-green-600 px-2 py-1 rounded text-xs font-semibold';
//                     } else if (vac.status === 'Vacant') {
//                       statusClasses =
//                         'bg-red-50 dark:bg-red-700 text-red-600 dark:text-red-100 border border-red-200 dark:border-red-600 px-2 py-1 rounded text-xs font-semibold';
//                     }

//                     return (
//                       <motion.tr
//                         key={vac.id}
//                         variants={tableRowVariants}
//                         className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//                       >
//                         <td className="p-3 text-sm">{String(rowIndex).padStart(2, '0')}</td>
//                         <td className="p-3 text-sm">{vac.designation}</td>
//                         <td className="p-3 text-sm">{vac.department}</td>
//                         <td className="p-3 text-sm">{vac.budget}</td>
//                         <td className="p-3 text-sm">{vac.postedBy}</td>
//                         <td className="p-3 text-sm">{vac.postedDate}</td>
//                         <td className="p-3 text-sm">
//                           <span className={statusClasses}>{vac.status}</span>
//                         </td>
//                         <td className="p-3 text-sm">
//                           <div className="flex items-center gap-2">
//                             <button
//                               className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
//                               onClick={() => handleViewModal(vac)}
//                             >
//                               <FaEye size={14} />
//                             </button>
//                             <button
//                               className="text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 transition-colors"
//                               onClick={() => handleUpdateModal(vac)}
//                             >
//                               <FaEdit size={14} />
//                             </button>
//                             <button
//                               className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
//                               onClick={() => alert(`Delete vacancy ${vac.id}`)}
//                             >
//                               <FaTrash size={14} />
//                             </button>
//                           </div>
//                         </td>
//                       </motion.tr>
//                     );
//                   })}
//                 </tbody>
//               </motion.table>

//               {/* Pagination */}
//               <div className="flex flex-col md:flex-row justify-between items-center p-3 gap-2 text-sm text-gray-600 dark:text-gray-200 transition-colors">
//                 <div>
//                   Showing {currentTableData.length} of {filteredVacancies.length} entries
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   {Array.from({ length: totalPages }).map((_, i) => (
//                     <button
//                       key={i}
//                       className={`px-3 py-1 rounded border transition-colors ${
//                         currentPage === i + 1
//                           ? 'bg-blue-600 text-white border-blue-600'
//                           : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
//                       }`}
//                       onClick={() => handlePageChange(i + 1)}
//                     >
//                       {i + 1}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           ) : (
//             <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow text-center text-gray-500 dark:text-gray-400 transition-colors">
//               No matching records found
//             </div>
//           )}
//         </>
//       )}

//       {/* =========== AnimatePresence for the Modals =========== */}
//       <AnimatePresence>
//         {isViewModalOpen && selectedVacancy && (
//           <ViewVacancyModal
//             vacancy={selectedVacancy}
//             onClose={() => setIsViewModalOpen(false)}
//           />
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {isUpdateModalOpen && selectedVacancy && (
//           <UpdateVacancyModal
//             vacancy={selectedVacancy}
//             onClose={() => setIsUpdateModalOpen(false)}
//             onSave={handleSaveVacancy}
//           />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }


import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaEdit, FaTrash, FaPrint, FaFilePdf } from 'react-icons/fa';
import { MdOutlineFileDownload } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Skeleton } from '@mui/material';
import ViewVacancyModal from './ViewVacancyModal';
import UpdateVacancyModal from './UpdateVacancyModal';

// ------------------ Framer Motion Variants ------------------
const tableContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: 'beforeChildren', staggerChildren: 0.05 },
  },
};

const tableRowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

// ------------------ Dummy Data for Vacancies ------------------
const DUMMY_VACANCIES = [
  {
    id: 1,
    designation: 'UI/UX Designer',
    department: 'IT',
    budget: '3 LPA',
    postedBy: 'Riya Mishra (RI0023)',
    postedDate: '25 Jan 2025',
    status: 'Filled',
  },
  {
    id: 2,
    designation: 'UI/UX Designer',
    department: 'Marketing',
    budget: '------',
    postedBy: 'Riya Mishra (RI0023)',
    postedDate: '25 Jan 2025',
    status: 'Vacant',
  },
  {
    id: 3,
    designation: 'UI/UX Designer',
    department: 'Marketing',
    budget: '3 LPA',
    postedBy: 'Riya Mishra (RI0023)',
    postedDate: '25 Jan 2025',
    status: 'Vacant',
  },
  {
    id: 4,
    designation: 'UI/UX Designer',
    department: 'Marketing',
    budget: '------',
    postedBy: 'Riya Mishra (RI0023)',
    postedDate: '25 Jan 2025',
    status: 'Filled',
  },
  {
    id: 5,
    designation: 'UI/UX Designer',
    department: 'Marketing',
    budget: '3 LPA',
    postedBy: 'Riya Mishra (RI0023)',
    postedDate: '25 Jan 2025',
    status: 'Vacant',
  },
  {
    id: 6,
    designation: 'UI/UX Designer',
    department: 'Marketing',
    budget: '------',
    postedBy: 'Riya Mishra (RI0023)',
    postedDate: '25 Jan 2025',
    status: 'Filled',
  },
  {
    id: 7,
    designation: 'UI/UX Designer',
    department: 'Marketing',
    budget: '3 LPA',
    postedBy: 'Riya Mishra (RI0023)',
    postedDate: '25 Jan 2025',
    status: 'Filled',
  },
  {
    id: 8,
    designation: 'UI/UX Designer',
    department: 'Marketing',
    budget: '------',
    postedBy: 'Riya Mishra (RI0023)',
    postedDate: '25 Jan 2025',
    status: 'Vacant',
  },
  {
    id: 9,
    designation: 'UI/UX Designer',
    department: 'Marketing',
    budget: '3 LPA',
    postedBy: 'Riya Mishra (RI0023)',
    postedDate: '25 Jan 2025',
    status: 'Filled',
  },
  {
    id: 10,
    designation: 'UI/UX Designer',
    department: 'Marketing',
    budget: '------',
    postedBy: 'Riya Mishra (RI0023)',
    postedDate: '25 Jan 2025',
    status: 'Filled',
  },
  {
    id: 11,
    designation: 'UI/UX Designer',
    department: 'Marketing',
    budget: '3 LPA',
    postedBy: 'Riya Mishra (RI0023)',
    postedDate: '25 Jan 2025',
    status: 'Vacant',
  },
  {
    id: 12,
    designation: 'UI/UX Designer',
    department: 'Marketing',
    budget: '------',
    postedBy: 'Riya Mishra (RI0023)',
    postedDate: '25 Jan 2025',
    status: 'Filled',
  },
];

// ================== Main VacanciesList Component ==================
export default function VacanciesList() {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Table / Filter states
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [department, setDepartment] = useState('All');
  const [status, setStatus] = useState('All');

  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState(null);

  // Simulate data load (without dummy timer)
  useEffect(() => {
    setVacancies(DUMMY_VACANCIES);
    setLoading(false);
  }, []);

  // ------- Filter logic -------
  const filteredVacancies = useMemo(() => {
    return vacancies.filter((item) => {
      // Search
      if (searchText) {
        const matchDesignation = item.designation
          .toLowerCase()
          .includes(searchText.toLowerCase());
        const matchDept = item.department
          .toLowerCase()
          .includes(searchText.toLowerCase());
        if (!matchDesignation && !matchDept) return false;
      }
      // Department
      if (department !== 'All' && item.department !== department) {
        return false;
      }
      // Status
      if (status !== 'All' && item.status !== status) {
        return false;
      }
      // Date: for demo, assume all posted on 25 Jan 2025, or skip
      if (selectedDate) {
        const itemDate = new Date(2025, 0, 25).setHours(0, 0, 0, 0);
        const filterDate = selectedDate.setHours(0, 0, 0, 0);
        if (itemDate !== filterDate) {
          return false;
        }
      }
      return true;
    });
  }, [vacancies, searchText, department, status, selectedDate]);

  // ------- Pagination -------
  const totalPages = Math.ceil(filteredVacancies.length / pageSize);
  const currentTableData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredVacancies.slice(startIndex, startIndex + pageSize);
  }, [filteredVacancies, currentPage, pageSize]);

  const handlePageChange = (page) => setCurrentPage(page);

  // ------- Open/Close Modals -------
  const handleViewModal = (vac) => {
    setSelectedVacancy(vac);
    setIsViewModalOpen(true);
  };

  const handleUpdateModal = (vac) => {
    setSelectedVacancy(vac);
    setIsUpdateModalOpen(true);
  };

  // Example callback for saving updated vacancy data
  const handleSaveVacancy = (newStatus, newBudget) => {
    alert(`Status updated to "${newStatus}", Budget: "${newBudget}"`);
    setIsUpdateModalOpen(false);
  };

  return (
    <div className="mx-auto px-4 py-6 bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Vacancies Management</h1>
        <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          Import
        </button>
      </div>

      {/* Top filters row */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-md shadow mb-4 transition-colors">
        <div className="flex items-center gap-4">
          {/* Page size */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold whitespace-nowrap">Show</label>
            <select
              className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          {/* Search */}
          <div>
            <input
              type="text"
              placeholder="Search"
              className="border rounded px-3 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Date */}
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setCurrentPage(1);
            }}
            dateFormat="dd MMM yyyy"
            placeholderText="JAN 2025"
            className="border rounded px-3 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
          />

          {/* Department */}
          <select
            className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">Department</option>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
          </select>

          {/* Status */}
          <select
            className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">Status</option>
            <option value="Filled">Filled</option>
            <option value="Vacant">Vacant</option>
          </select>

          {/* Export icons */}
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-300">
            <button
              className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              title="Print"
            >
              <FaPrint size={16} />
            </button>
            <button
              className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              title="Export PDF"
            >
              <FaFilePdf size={16} />
            </button>
            <button
              className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              title="Export CSV/Excel"
            >
              <MdOutlineFileDownload size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Table & skeleton */}
      {loading ? (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow transition-colors">
          {Array.from({ length: pageSize }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={40} className="mb-2" />
          ))}
        </div>
      ) : (
        <>
          {filteredVacancies.length > 0 ? (
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-md shadow overflow-auto transition-colors"
              variants={tableContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-700 transition-colors">
                  <tr>
                    <th className="p-3 text-sm font-semibold">S.L</th>
                    <th className="p-3 text-sm font-semibold">Designation</th>
                    <th className="p-3 text-sm font-semibold">Department</th>
                    <th className="p-3 text-sm font-semibold">Budget</th>
                    <th className="p-3 text-sm font-semibold">Posted By</th>
                    <th className="p-3 text-sm font-semibold">Posted Date</th>
                    <th className="p-3 text-sm font-semibold">Status</th>
                    <th className="p-3 text-sm font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTableData.map((vac, idx) => {
                    const rowIndex = (currentPage - 1) * pageSize + (idx + 1);

                    // Color-coded status (light & dark)
                    let statusClasses =
                      'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-100 border border-gray-200 dark:border-gray-500 px-2 py-1 rounded text-xs font-semibold';
                    if (vac.status === 'Filled') {
                      statusClasses =
                        'bg-green-50 dark:bg-green-700 text-green-600 dark:text-green-100 border border-green-200 dark:border-green-600 px-2 py-1 rounded text-xs font-semibold';
                    } else if (vac.status === 'Vacant') {
                      statusClasses =
                        'bg-red-50 dark:bg-red-700 text-red-600 dark:text-red-100 border border-red-200 dark:border-red-600 px-2 py-1 rounded text-xs font-semibold';
                    }

                    return (
                      <motion.tr
                        key={vac.id}
                        variants={tableRowVariants}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                      >
                        <td className="p-3 text-sm">{String(rowIndex).padStart(2, '0')}</td>
                        <td className="p-3 text-sm">{vac.designation}</td>
                        <td className="p-3 text-sm">{vac.department}</td>
                        <td className="p-3 text-sm">{vac.budget}</td>
                        <td className="p-3 text-sm">{vac.postedBy}</td>
                        <td className="p-3 text-sm">{vac.postedDate}</td>
                        <td className="p-3 text-sm">
                          <span className={statusClasses}>{vac.status}</span>
                        </td>
                        <td className="p-3 text-sm">
                          <div className="flex items-center gap-2">
                            <button
                              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                              onClick={() => handleViewModal(vac)}
                            >
                              <FaEye size={14} />
                            </button>
                            <button
                              className="text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                              onClick={() => handleUpdateModal(vac)}
                            >
                              <FaEdit size={14} />
                            </button>
                            <button
                              className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                              onClick={() => alert(`Delete vacancy ${vac.id}`)}
                            >
                              <FaTrash size={14} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </motion.table>

              {/* Pagination */}
              <div className="flex flex-col md:flex-row justify-between items-center p-3 gap-2 text-sm text-gray-600 dark:text-gray-200 transition-colors">
                <div>
                  Showing {currentTableData.length} of {filteredVacancies.length} entries
                </div>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      className={`px-3 py-1 rounded border transition-colors ${
                        currentPage === i + 1
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                      }`}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow text-center text-gray-500 dark:text-gray-400 transition-colors">
              No matching records found
            </div>
          )}
        </>
      )}

      {/* =========== AnimatePresence for the Modals =========== */}
      <AnimatePresence>
        {isViewModalOpen && selectedVacancy && (
          <ViewVacancyModal
            vacancy={selectedVacancy}
            onClose={() => setIsViewModalOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isUpdateModalOpen && selectedVacancy && (
          <UpdateVacancyModal
            vacancy={selectedVacancy}
            onClose={() => setIsUpdateModalOpen(false)}
            onSave={handleSaveVacancy}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

