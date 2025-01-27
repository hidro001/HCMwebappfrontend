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
  FaFileAlt
} from 'react-icons/fa';

// Import the separate modal components
import HikeRequestViewModal from './HikeRequestViewModal';
import HikeRequestEditModal from './HikeRequestEditModal';

// Import your ConfirmationDialog component
import ConfirmationDialog from '../../../common/ConfirmationDialog';

export default function HikeRequests() {
  // Example data for Hike Requests
  const [requests, setRequests] = useState([
    {
      sl: '01',
      empId: 'RI0023',
      name: 'Riya Mishra',
      requestedAt: '25 Jan 2024, 10:30AM',
      salaryHike: '10%',
      reason: 'Testing',
      status: 'Pending',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa...',
    },
    {
      sl: '02',
      empId: '#526534',
      name: 'Kathryn Murphy',
      requestedAt: '26 Jan 2024, 2:00PM',
      salaryHike: '15%',
      reason: 'Performance Reward',
      status: 'Approve',
      description:
        'Short description of the request here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    // ... more data ...
  ]);

  // For viewing
  const [viewRequest, setViewRequest] = useState(null);
  // For editing/processing
  const [editRequest, setEditRequest] = useState(null);

  // State for Delete Confirmation
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);

  // Example "onSave" callback for the edit modal:
  const handleSave = (updatedRequest) => {
    console.log('Saving changes:', updatedRequest);
    // For demonstration, we’ll just update the local state
    setRequests((prev) =>
      prev.map((r) =>
        r.sl === updatedRequest.sl ? { ...r, ...updatedRequest } : r
      )
    );
  };

  // When user clicks "Delete" icon
  const handleDeleteClick = (req) => {
    setRequestToDelete(req);
    setIsDeleteDialogOpen(true);
  };

  // If user confirms delete
  const handleConfirmDelete = () => {
    if (requestToDelete) {
      setRequests((prev) =>
        prev.filter((item) => item.sl !== requestToDelete.sl)
      );
    }
    setIsDeleteDialogOpen(false);
    setRequestToDelete(null);
  };

  // If user cancels delete
  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setRequestToDelete(null);
  };

  return (
    <div>
      {/* Heading */}
      <div className="px-4 mb-2">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
          Hike Requests for January 2025
        </h1>
      </div>

      {/* Filters row */}
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 px-4 mb-4">
        {/* Show: 10 */}
        <div className="flex items-center">
          <label htmlFor="pageSize" className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
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
              defaultValue="2025-01"
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
              <th className="px-4 py-2 text-left font-semibold">Salary Hike (%)</th>
              <th className="px-4 py-2 text-left font-semibold">Reason</th>
              <th className="px-4 py-2 text-left font-semibold">Status</th>
              <th className="px-4 py-2 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.sl} className="border-b last:border-0 dark:border-gray-700">
                <td className="px-4 py-2">{req.sl}</td>
                <td className="px-4 py-2 text-blue-600 dark:text-blue-400 font-medium">
                  {req.empId}
                </td>
                <td className="px-4 py-2">{req.name}</td>
                <td className="px-4 py-2">{req.requestedAt}</td>
                <td className="px-4 py-2">{req.salaryHike}</td>
                <td className="px-4 py-2">{req.reason}</td>
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
                    {/* VIEW Button */}
                    <button
                      title="View"
                      onClick={() => setViewRequest(req)}
                      className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <FaRegEye />
                    </button>
                    {/* EDIT Button */}
                    <button
                      title="Edit"
                      onClick={() => setEditRequest(req)}
                      className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                    >
                      <FaPen />
                    </button>
                    {/* DELETE Button */}
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
                <td colSpan={8} className="px-4 py-4 text-center text-gray-500">
                  No hike requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* VIEW MODAL */}
      <HikeRequestViewModal
        request={viewRequest}
        onClose={() => setViewRequest(null)}
      />

      {/* EDIT / PROCESS MODAL */}
      <HikeRequestEditModal
        request={editRequest}
        onClose={() => setEditRequest(null)}
        onSave={handleSave}
      />

      {/* DELETE Confirmation Dialog */}
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        title="Delete Confirmation"
        message={
          requestToDelete
            ? `Are you sure you want to delete the request for ${requestToDelete.name} (ID: ${requestToDelete.empId})?`
            : 'Are you sure you want to delete this request?'
        }
        confirmText="Yes, Delete"
        cancelText="No"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
