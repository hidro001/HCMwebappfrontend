import  { useState, useEffect } from 'react';
import {
  FaRegEye,
  FaTrash,
  FaFileExcel,
  FaFilePdf,
  FaPrint,
  FaSearch,
  FaCalendarAlt,
  FaFileAlt,
} from 'react-icons/fa';
import toast from "react-hot-toast";
import ConfirmationDialog from '../../../common/ConfirmationDialog';
import AdvanceRequestViewModal from './AdvanceRequestViewModal';
import { deleteRequests } from '../../../../service/payrollService';

export default function AdvanceRequests({ requests: parentRequests = [] }) {
  // If you want local changes (delete) to reflect only here, store them in state:
  const [requests, setRequests] = useState(parentRequests);

  // If the parent data changes, sync them:
  useEffect(() => {
    setRequests(parentRequests);
  }, [parentRequests]);

  const [viewRequest, setViewRequest] = useState(null);

  // For delete
  const [deleteRequest, setDeleteRequest] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // "View" button
  const handleViewClick = (req) => {
    setViewRequest(req);
  };

  // "Delete" button => open confirmation
  const handleDeleteClick = (req) => {
    setDeleteRequest(req);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteRequest) {
      try {
        // Call API to delete request
        await deleteRequests(deleteRequest._id);
  
        // Remove from local state only if API call is successful
        setRequests((prev) => prev.filter((r) => r._id !== deleteRequest._id));
  
        toast.success("Advance request deleted successfully!");
      } catch (error) {
        console.error("Failed to delete request:", error);
        
        // Show error toast
        toast.error("Failed to delete the request. Please try again.");
      }
    }
    setDeleteRequest(null);
    setIsDeleteDialogOpen(false);
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setDeleteRequest(null);
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col">
      

    
      {/* Main Table */}
      <div className="overflow-x-auto px-4">
        <table className="min-w-full bg-white border border-gray-200 text-sm rounded-md overflow-hidden dark:bg-gray-800 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">#</th>
              <th className="px-4 py-2 text-left font-semibold">Emp ID</th>
              <th className="px-4 py-2 text-left font-semibold">Requested At</th>
              <th className="px-4 py-2 text-left font-semibold">Advance Amount</th>
              <th className="px-4 py-2 text-left font-semibold">Status</th>
              <th className="px-4 py-2 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr key={req._id} className="border-b last:border-0 dark:border-gray-700">
                <td className="px-4 py-2">{index + 1}</td>

                {/* "employeeId" from JSON */}
                <td className="px-4 py-2 text-blue-600 dark:text-blue-400 font-medium">
                  {req.employeeId}
                </td>

                {/* "requestedAt" => format date */}
                <td className="px-4 py-2">
                  {new Date(req.requestedAt).toLocaleString()}
                </td>

                {/* "amount" => display as currency? e.g. 12,000 */}
                <td className="px-4 py-2">
                  {req.amount?.toLocaleString() ?? '--'}
                </td>

                <td className="px-4 py-2">
                  {req.status === 'Approved' ? (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-md dark:bg-green-900 dark:text-green-100">
                      Approved
                    </span>
                  ) : req.status === 'Pending' ? (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-orange-800 bg-orange-100 rounded-md dark:bg-orange-900 dark:text-orange-100">
                      Pending
                    </span>
                  ) : req.status === 'Rejected' ? (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-md dark:bg-red-900 dark:text-red-100">
                      Rejected
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 rounded-md dark:bg-gray-700 dark:text-gray-200">
                      {req.status}
                    </span>
                  )}
                </td>

                {/* Action: "View" and "Delete" in this example */}
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

            {/* If no data */}
            {requests.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                  No advance requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      <AdvanceRequestViewModal
        request={viewRequest}
        onClose={() => setViewRequest(null)}
      />

      {/* Delete Confirmation */}
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        title="Delete Confirmation"
        message={
          deleteRequest
            ? `Are you sure you want to delete the Advance Request for employee ${deleteRequest.employeeId}?`
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
