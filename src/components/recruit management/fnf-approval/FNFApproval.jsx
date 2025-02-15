import React from 'react';
import { FaUpload, FaCheck, FaTimes, FaSearch } from 'react-icons/fa';

export default function FNFApproval() {
  return (
    <div className="p-4 space-y-4">
      {/* Title and "Import" button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          FNF Approvals
        </h1>
       <button className="px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors inline-flex items-center space-x-1">
                <FaUpload className="w-4 h-4" />
                <span>Import</span>
              </button>
      </div>

      {/* Header Section (Filters) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 md:space-x-4">
        
        {/* Left controls: Show entries */}
        <div className="flex items-center space-x-2">
          <label htmlFor="showEntriesFNF" className="text-gray-700 dark:text-gray-200">
            Show
          </label>
          <select
            id="showEntriesFNF"
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded px-2 py-1"
          >
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>

        {/* Right controls: Month, Department, Status, Search & Import */}
        <div className="flex flex-wrap items-center space-x-2">
          <select className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded px-2 py-1">
            <option>JAN 2025</option>
          </select>
          <select className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded px-2 py-1">
            <option>Department</option>
            <option>IT</option>
            <option>Marketing</option>
          </select>
          <select className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded px-2 py-1">
            <option>Status</option>
            <option>Pending</option>
            <option>Reject</option>
            <option>Approve</option>
          </select>

          {/* Search Input */}
          <div className="relative">
            <FaSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-8 pr-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none"
            />
          </div>

          {/* Import Button (if needed) */}
          {/* <button className="bg-blue-600 text-white rounded px-3 py-1 hover:bg-blue-700 inline-flex items-center space-x-1">
            <FaUpload className="w-4 h-4" />
            <span>Import</span>
          </button> */}
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto border border-gray-200 dark:border-gray-600 rounded">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <th className="py-3 px-4 font-semibold">S.L</th>
              <th className="py-3 px-4 font-semibold">Employee Name</th>
              <th className="py-3 px-4 font-semibold">Employee ID</th>
              <th className="py-3 px-4 font-semibold">Resignation Date</th>
              <th className="py-3 px-4 font-semibold">Last Working Day</th>
              <th className="py-3 px-4 font-semibold">Responded At</th>
              <th className="py-3 px-4 font-semibold">Created At</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-200">
            {/* Example row 1 */}
            <tr className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="py-3 px-4">1</td>
              <td className="py-3 px-4">UI/UX Designer</td>
              <td className="py-3 px-4">IT</td>
              <td className="py-3 px-4">3 LPA</td>
              <td className="py-3 px-4">Riya Mishra (R0023)</td>
              <td className="py-3 px-4">25 Jan 2025</td>
              <td className="py-3 px-4">25 Jan 2025</td>
              <td className="py-3 px-4">
                <span className="inline-block px-2 py-1 text-sm rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100">
                  Pending
                </span>
              </td>
              <td className="py-3 px-4 space-x-2">
                <button className="inline-flex items-center text-green-600 dark:text-green-400 hover:underline space-x-1">
                  <FaCheck className="w-4 h-4" />
                  <span>Approve</span>
                </button>
                <button className="inline-flex items-center text-red-600 dark:text-red-400 hover:underline space-x-1">
                  <FaTimes className="w-4 h-4" />
                  <span>Reject</span>
                </button>
              </td>
            </tr>

            {/* Example row 2 */}
            <tr className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="py-3 px-4">2</td>
              <td className="py-3 px-4">UI/UX Designer</td>
              <td className="py-3 px-4">Marketing</td>
              <td className="py-3 px-4">3 LPA</td>
              <td className="py-3 px-4">Riya Mishra (R0023)</td>
              <td className="py-3 px-4">25 Jan 2025</td>
              <td className="py-3 px-4">25 Jan 2025</td>
              <td className="py-3 px-4">
                <span className="inline-block px-2 py-1 text-sm rounded bg-red-100 text-red-800 dark:bg-red-600 dark:text-red-100">
                  Reject
                </span>
              </td>
              <td className="py-3 px-4 space-x-2">
                <button className="inline-flex items-center text-green-600 dark:text-green-400 hover:underline space-x-1">
                  <FaCheck className="w-4 h-4" />
                  <span>Approve</span>
                </button>
                <button className="inline-flex items-center text-red-600 dark:text-red-400 hover:underline space-x-1">
                  <FaTimes className="w-4 h-4" />
                  <span>Reject</span>
                </button>
              </td>
            </tr>

            {/* Example row 3 */}
            <tr className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="py-3 px-4">3</td>
              <td className="py-3 px-4">UI/UX Designer</td>
              <td className="py-3 px-4">Marketing</td>
              <td className="py-3 px-4">3 LPA</td>
              <td className="py-3 px-4">Riya Mishra (R0023)</td>
              <td className="py-3 px-4">25 Jan 2025</td>
              <td className="py-3 px-4">25 Jan 2025</td>
              <td className="py-3 px-4">
                <span className="inline-block px-2 py-1 text-sm rounded bg-green-100 text-green-800 dark:bg-green-600 dark:text-green-100">
                  Approve
                </span>
              </td>
              <td className="py-3 px-4 space-x-2">
                <button className="inline-flex items-center text-green-600 dark:text-green-400 hover:underline space-x-1">
                  <FaCheck className="w-4 h-4" />
                  <span>Approve</span>
                </button>
                <button className="inline-flex items-center text-red-600 dark:text-red-400 hover:underline space-x-1">
                  <FaTimes className="w-4 h-4" />
                  <span>Reject</span>
                </button>
              </td>
            </tr>
            {/* ... add more rows as needed ... */}
          </tbody>
        </table>
      </div>

      {/* Pagination & Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 md:mb-0">
          Showing 1 to 10 of 10 entries
        </p>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded">
            1
          </button>
          <button className="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded">
            2
          </button>
          <button className="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded">
            3
          </button>
          <button className="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded">
            4
          </button>
          <button className="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded">
            5
          </button>
        </div>
      </div>
    </div>
  );
}
