

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaEdit, FaTrash, FaPrint, FaFilePdf } from 'react-icons/fa';
import { MdOutlineFileDownload } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Skeleton } from '@mui/material';
import ViewReferralModal from './ViewReferralModal';
import UpdateStatusModal from './UpdateStatusModal';

// ================== Framer Motion Variants ==================
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

// ================== Dummy Data ==================
const DUMMY_REFERRALS = [
  {
    id: 1,
    designation: 'UI/UX Designer',
    department: 'IT',
    referredBy: 'Riya Mishra (RI0023)',
    candidateName: 'Nikhil Verma',
    candidateEmail: 'razor@razor.com',
    candidateLocation: 'New Delhi',
    status: 'Onboard',
  },
  {
    id: 2,
    designation: 'UI/UX Designer',
    department: 'Marketing',
    referredBy: 'Riya Mishra (RI0023)',
    candidateName: 'Nikhil Verma',
    candidateEmail: 'razor@razor.com',
    candidateLocation: 'New Delhi',
    status: 'In Review',
  },
  {
    id: 3,
    designation: 'UI/UX Designer',
    department: 'Marketing',
    referredBy: 'Riya Mishra (RI0023)',
    candidateName: 'Nikhil Verma',
    candidateEmail: 'razor@razor.com',
    candidateLocation: 'New Delhi',
    status: 'Rejected',
  },
  {
    id: 4,
    designation: 'UI/UX Designer',
    department: 'Marketing',
    referredBy: 'Riya Mishra (RI0023)',
    candidateName: 'Nikhil Verma',
    candidateEmail: 'razor@razor.com',
    candidateLocation: 'New Delhi',
    status: 'Onboard',
  },
  {
    id: 5,
    designation: 'UI/UX Designer',
    department: 'Marketing',
    referredBy: 'Riya Mishra (RI0023)',
    candidateName: 'Nikhil Verma',
    candidateEmail: 'razor@razor.com',
    candidateLocation: 'New Delhi',
    status: 'Pending',
  },
  {
    id: 6,
    designation: 'UI/UX Designer',
    department: 'Marketing',
    referredBy: 'Riya Mishra (RI0023)',
    candidateName: 'Nikhil Verma',
    candidateEmail: 'razor@razor.com',
    candidateLocation: 'New Delhi',
    status: 'Onboard',
  },
  {
    id: 7,
    designation: 'UI/UX Designer',
    department: 'Marketing',
    referredBy: 'Riya Mishra (RI0023)',
    candidateName: 'Nikhil Verma',
    candidateEmail: 'razor@razor.com',
    candidateLocation: 'New Delhi',
    status: 'Onboard',
  },
  {
    id: 8,
    designation: 'UI/UX Designer',
    department: 'Marketing',
    referredBy: 'Riya Mishra (RI0023)',
    candidateName: 'Nikhil Verma',
    candidateEmail: 'razor@razor.com',
    candidateLocation: 'New Delhi',
    status: 'Pending',
  },
  {
    id: 9,
    designation: 'UI/UX Designer',
    department: 'Marketing',
    referredBy: 'Riya Mishra (RI0023)',
    candidateName: 'Nikhil Verma',
    candidateEmail: 'razor@razor.com',
    candidateLocation: 'New Delhi',
    status: 'Onboard',
  },
  {
    id: 10,
    designation: 'UI/UX Designer',
    department: 'Marketing',
    referredBy: 'Riya Mishra (RI0023)',
    candidateName: 'Nikhil Verma',
    candidateEmail: 'razor@razor.com',
    candidateLocation: 'New Delhi',
    status: 'Pending',
  },
  {
    id: 11,
    designation: 'UI/UX Designer',
    department: 'Marketing',
    referredBy: 'Riya Mishra (RI0023)',
    candidateName: 'Nikhil Verma',
    candidateEmail: 'razor@razor.com',
    candidateLocation: 'New Delhi',
    status: 'Onboard',
  },
  {
    id: 12,
    designation: 'UI/UX Designer',
    department: 'Marketing',
    referredBy: 'Riya Mishra (RI0023)',
    candidateName: 'Nikhil Verma',
    candidateEmail: 'razor@razor.com',
    candidateLocation: 'New Delhi',
    status: 'In Review',
  },
];

// ================== Main Component ==================
export default function ReferralList() {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Table state
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filters
  const [searchText, setSearchText] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [department, setDepartment] = useState('All');

  // ============ New State for the Two Modals ============
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState(null);

  // Simulate data fetching (no dummy timer)
  useEffect(() => {
    setReferrals(DUMMY_REFERRALS);
    setLoading(false);
  }, []);

  // ================== Filtering logic ==================
  const filteredReferrals = useMemo(() => {
    return referrals.filter((item) => {
      // Filter by search text (designation or candidateName)
      if (searchText) {
        const matchesDesignation = item.designation
          .toLowerCase()
          .includes(searchText.toLowerCase());
        const matchesCandidate = item.candidateName
          .toLowerCase()
          .includes(searchText.toLowerCase());
        if (!matchesDesignation && !matchesCandidate) {
          return false;
        }
      }
      // Filter by department
      if (department !== 'All' && item.department !== department) {
        return false;
      }
      // Filter by date (demo: we assume a fixed date for each row)
      if (selectedDate) {
        const itemDate = new Date(2025, 0, 1).setHours(0, 0, 0, 0);
        const filterDate = selectedDate.setHours(0, 0, 0, 0);
        if (itemDate !== filterDate) {
          return false;
        }
      }
      return true;
    });
  }, [referrals, searchText, department, selectedDate]);

  // ================== Pagination ==================
  const totalPages = Math.ceil(filteredReferrals.length / pageSize);
  const currentTableData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredReferrals.slice(startIndex, startIndex + pageSize);
  }, [filteredReferrals, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // ============ Handlers for opening/closing modals ============
  const handleOpenViewModal = (referral) => {
    setSelectedReferral(referral);
    setIsViewModalOpen(true);
  };

  const handleOpenUpdateModal = (referral) => {
    setSelectedReferral(referral);
    setIsUpdateModalOpen(true);
  };

  // Example callback for updating status
  const handleUpdateStatus = (newStatus, feedback) => {
    alert(`Status updated to '${newStatus}' with feedback: '${feedback}'`);
    setIsUpdateModalOpen(false);
  };

  
  return (
    <div className=" px-4 py-6 bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-100 transition-colors ">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Referral List</h1>
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
          {/* Date picker */}
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setCurrentPage(1);
            }}
            dateFormat="MMM yyyy"
            showMonthYearPicker
            placeholderText="JAN 2025"
            className="border rounded px-3 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
          />

          {/* Department dropdown */}
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

      {/* Table & skeleton loading */}
      {loading ? (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow transition-colors">
          {Array.from({ length: pageSize }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              height={40}
              className="mb-2"
            />
          ))}
        </div>
      ) : (
        <>
          {filteredReferrals.length > 0 ? (
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
                    <th className="p-3 text-sm font-semibold">Referred By</th>
                    <th className="p-3 text-sm font-semibold">Candidate Name</th>
                    <th className="p-3 text-sm font-semibold">Candidate Email</th>
                    <th className="p-3 text-sm font-semibold">Candidate Location</th>
                    <th className="p-3 text-sm font-semibold">Status</th>
                    <th className="p-3 text-sm font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTableData.map((item, index) => {
                    const rowIndex = (currentPage - 1) * pageSize + (index + 1);

                    // Color‐coding the status in both light & dark mode
                    let statusClasses =
                      'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-100 border border-gray-200 dark:border-gray-500 px-2 py-1 rounded text-xs font-semibold';
                    if (item.status === 'Onboard') {
                      statusClasses =
                        'bg-green-50 dark:bg-green-700 text-green-600 dark:text-green-100 border border-green-200 dark:border-green-600 px-2 py-1 rounded text-xs font-semibold';
                    } else if (item.status === 'In Review') {
                      statusClasses =
                        'bg-yellow-50 dark:bg-yellow-700 text-yellow-600 dark:text-yellow-100 border border-yellow-200 dark:border-yellow-600 px-2 py-1 rounded text-xs font-semibold';
                    } else if (item.status === 'Rejected') {
                      statusClasses =
                        'bg-red-50 dark:bg-red-700 text-red-600 dark:text-red-100 border border-red-200 dark:border-red-600 px-2 py-1 rounded text-xs font-semibold';
                    } else if (item.status === 'Pending') {
                      statusClasses =
                        'bg-orange-50 dark:bg-orange-700 text-orange-600 dark:text-orange-100 border border-orange-200 dark:border-orange-600 px-2 py-1 rounded text-xs font-semibold';
                    }

                    return (
                      <motion.tr
                        key={item.id}
                        variants={tableRowVariants}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                      >
                        <td className="p-3 text-sm">{String(rowIndex).padStart(2, '0')}</td>
                        <td className="p-3 text-sm">{item.designation}</td>
                        <td className="p-3 text-sm">{item.department}</td>
                        <td className="p-3 text-sm">{item.referredBy}</td>
                        <td className="p-3 text-sm">{item.candidateName}</td>
                        <td className="p-3 text-sm">{item.candidateEmail}</td>
                        <td className="p-3 text-sm">{item.candidateLocation}</td>
                        <td className="p-3 text-sm">
                          <span className={statusClasses}>{item.status}</span>
                        </td>
                        <td className="p-3 text-sm">
                          <div className="flex items-center gap-2">
                            {/* View modal */}
                            <button
                              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                              onClick={() => handleOpenViewModal(item)}
                            >
                              <FaEye size={14} />
                            </button>
                            {/* Update status modal */}
                            <button
                              className="text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                              onClick={() => handleOpenUpdateModal(item)}
                            >
                              <FaEdit size={14} />
                            </button>
                            {/* Delete (demo) */}
                            <button
                              className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                              onClick={() => alert(`Delete item ${item.id}`)}
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
                  Showing {currentTableData.length} of {filteredReferrals.length} entries
                </div>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => (
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

      {/* AnimatePresence handles fade in/out of modals */}
      <AnimatePresence>
        {isViewModalOpen && selectedReferral && (
          <ViewReferralModal
            referral={selectedReferral}
            onClose={() => setIsViewModalOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isUpdateModalOpen && selectedReferral && (
          <UpdateStatusModal
            referral={selectedReferral}
            onClose={() => setIsUpdateModalOpen(false)}
            onSubmit={handleUpdateStatus}
          />
        )}
      </AnimatePresence>
    </div>
  );
}



