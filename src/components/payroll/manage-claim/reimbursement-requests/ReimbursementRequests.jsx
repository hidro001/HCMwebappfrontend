import { useState } from 'react';
import {
  FaRegEye,
  FaPen,
  FaTrash,
  FaFileExcel,
  FaFilePdf,
  FaPrint,
  FaSearch,
  FaCalendarAlt,
  FaFileAlt,
} from 'react-icons/fa';

// Import your custom modals
import ConfirmationDialog from '../../../common/ConfirmationDialog';
import ReimbursementViewModal from './ReimbursementViewModal';
import ReimbursementEditModal from './ReimbursementEditModal';

export default function ReimbursementRequests() {
  // Example data
  const [requests, setRequests] = useState([
    {
      sl: '01',
      empId: '#567890',
      name: 'Cody Fisher',
      requestedAt: '05 Feb 2025, 10:30AM',
      amount: 300,
      status: 'Approve',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor...',
      attachment: {
        fileName: 'Transcend.zip',
        size: '1.8MB',
        url: '/path/to/Transcend.zip',
      },
    },
    {
      sl: '02',
      empId: '#345678',
      name: 'Jane Cooper',
      requestedAt: '10 Feb 2025, 3:15PM',
      amount: 150,
      status: 'Pending',
      description: 'Short description for a pending reimbursement.',
      attachment: null,
    },
    // Add more items...
  ]);

  // State for modals
  const [viewRequest, setViewRequest] = useState(null); // "View" modal
  const [editRequest, setEditRequest] = useState(null); // "Edit/Process" modal

  // State for delete confirmation
  const [deleteRequest, setDeleteRequest] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // View button
  const handleViewClick = (req) => {
    setViewRequest(req);
  };

  // Edit button
  const handleEditClick = (req) => {
    setEditRequest(req);
  };

  // Delete button
  const handleDeleteClick = (req) => {
    setDeleteRequest(req);
    setIsDeleteDialogOpen(true);
  };

  // Confirm / Cancel Delete
  const handleConfirmDelete = () => {
    if (deleteRequest) {
      setRequests((prev) => prev.filter((r) => r.sl !== deleteRequest.sl));
    }
    setDeleteRequest(null);
    setIsDeleteDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteRequest(null);
    setIsDeleteDialogOpen(false);
  };

  // If user processes (Accept/Reject) in the edit modal
  const handleProcess = (updated) => {
    // updated contains new status, remarks, etc.
    // For demonstration, we’ll just update local state
    setRequests((prev) =>
      prev.map((r) => (r.sl === updated.sl ? { ...r, ...updated } : r))
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900  text-gray-800 dark:text-gray-100 flex flex-col">
      {/* Heading */}
      <div className="px-4 mb-2">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
          Reimbursement Requests for February 2025
        </h1>
      </div>

      {/* Filters row */}
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 px-4 mb-4">
        {/* Show: 10 */}
        <div className="flex items-center">
          <label
            htmlFor="pageSize"
            className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Show
          </label>
          <select
            id="pageSize"
            className="
              border border-gray-300 dark:border-gray-700
              rounded-md px-2 py-1 text-sm
              focus:outline-none
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
            "
          >
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>

        {/* Search box */}
        <div
          className="
            flex items-center w-full md:w-auto
            border border-gray-300 dark:border-gray-700
            rounded-md px-2 py-1 text-sm
          "
        >
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="w-full focus:outline-none dark:bg-gray-900"
          />
        </div>

        {/* Month + Department */}
        <div className="flex items-center gap-2 ml-auto">
          <div className="relative flex items-center">
            <FaCalendarAlt className="absolute left-2 text-gray-400" />
            <input
              type="month"
              defaultValue="2025-02"
              className="
                border border-gray-300 dark:border-gray-700
                rounded-md pl-8 pr-2 py-1 text-sm focus:outline-none
                dark:bg-gray-900
              "
            />
          </div>
          <select
            className="
              border border-gray-300 dark:border-gray-700
              rounded-md px-2 py-1 text-sm
              focus:outline-none
              dark:bg-gray-900
            "
          >
            <option>Department</option>
            <option>IT</option>
            <option>Finance</option>
            <option>HR</option>
          </select>
        </div>

        {/* Export Icons */}
        <div className="flex items-center gap-2">
          <button
            title="Export CSV"
            className="
              w-10 h-10
              flex items-center justify-center
              rounded-md
              bg-green-100 text-green-600
              hover:bg-green-200
              dark:bg-green-900 dark:text-green-200
              dark:hover:bg-green-800
            "
          >
            <FaFileAlt className="w-4 h-4" />
          </button>
          <button
            title="Export Excel"
            className="
              w-10 h-10
              flex items-center justify-center
              rounded-md
              bg-purple-100 text-purple-600
              hover:bg-purple-200
              dark:bg-purple-900 dark:text-purple-200
              dark:hover:bg-purple-800
            "
          >
            <FaFileExcel className="w-4 h-4" />
          </button>
          <button
            title="Export PDF"
            className="
              w-10 h-10
              flex items-center justify-center
              rounded-md
              bg-red-100 text-red-600
              hover:bg-red-200
              dark:bg-red-900 dark:text-red-200
              dark:hover:bg-red-800
            "
          >
            <FaFilePdf className="w-4 h-4" />
          </button>
          <button
            title="Print"
            className="
              w-10 h-10
              flex items-center justify-center
              rounded-md
              bg-orange-100 text-orange-600
              hover:bg-orange-200
              dark:bg-orange-900 dark:text-orange-200
              dark:hover:bg-orange-800
            "
          >
            <FaPrint className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto px-4">
        <table className="min-w-full bg-white border border-gray-200 text-sm rounded-md overflow-hidden dark:bg-gray-800 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">S.L</th>
              <th className="px-4 py-2 text-left font-semibold">Emp ID</th>
              <th className="px-4 py-2 text-left font-semibold">Name</th>
              <th className="px-4 py-2 text-left font-semibold">Requested At</th>
              <th className="px-4 py-2 text-left font-semibold">Amount</th>
              <th className="px-4 py-2 text-left font-semibold">Status</th>
              <th className="px-4 py-2 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr
                key={req.sl}
                className="border-b last:border-0 dark:border-gray-700"
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 text-blue-600 dark:text-blue-400 font-medium">
                  {req.empId}
                </td>
                <td className="px-4 py-2">{req.name}</td>
                <td className="px-4 py-2">{req.requestedAt}</td>
                <td className="px-4 py-2">{req.amount}</td>
                <td className="px-4 py-2">
                  {req.status === 'Approve' ? (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-md dark:bg-green-900 dark:text-green-100">
                      Approve
                    </span>
                  ) : req.status === 'Pending' ? (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-orange-800 bg-orange-100 rounded-md dark:bg-orange-900 dark:text-orange-100">
                      Pending
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-md dark:bg-red-900 dark:text-red-100">
                      Reject
                    </span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2 text-lg">
                    <button
                      title="View"
                      onClick={() => handleViewClick(req)}
                      className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <FaRegEye />
                    </button>
                    <button
                      title="Edit"
                      onClick={() => handleEditClick(req)}
                      className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                    >
                      <FaPen />
                    </button>
                    <button
                      title="Delete"
                      onClick={() => handleDeleteClick(req)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {requests.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-4 text-center text-gray-500">
                  No reimbursement requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* VIEW MODAL */}
      <ReimbursementViewModal
        request={viewRequest}
        onClose={() => setViewRequest(null)}
      />

      {/* EDIT MODAL */}
      <ReimbursementEditModal
        request={editRequest}
        onClose={() => setEditRequest(null)}
        onProcess={handleProcess}
      />

      {/* DELETE CONFIRMATION */}
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        title="Delete Confirmation"
        message={
          deleteRequest
            ? `Are you sure you want to delete the reimbursement request of ${deleteRequest.name} (ID: ${deleteRequest.empId})?`
            : 'Are you sure you want to delete this request?'
        }
        confirmText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
