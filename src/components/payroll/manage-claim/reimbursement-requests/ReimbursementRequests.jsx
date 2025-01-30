import { useState, useEffect } from 'react';
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
import toast from "react-hot-toast";
import { deleteRequests } from '../../../../service/payrollService';
import ConfirmationDialog from '../../../common/ConfirmationDialog';
import ReimbursementViewModal from './ReimbursementViewModal';
import ReimbursementEditModal from './ReimbursementEditModal';

export default function ReimbursementRequests({ requests: parentRequests = [], onSaveRequest }) {
  // Local state to manage requests independently
  const [requests, setRequests] = useState(parentRequests);

  // Sync local state when parent state updates
  useEffect(() => {
    setRequests(parentRequests);
  }, [parentRequests]);

  const [viewRequest, setViewRequest] = useState(null);
  const [editRequest, setEditRequest] = useState(null);
  const [deleteRequest, setDeleteRequest] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Handle delete action
  const handleDeleteClick = (req) => {
    setDeleteRequest(req);
    setIsDeleteDialogOpen(true);
  };

  // Confirm delete and update state
  const handleConfirmDelete = async () => {
    if (!deleteRequest) return;

    try {
      await deleteRequests(deleteRequest._id);

      // Update local state
      const updatedRequests = requests.filter(req => req._id !== deleteRequest._id);
      setRequests(updatedRequests);
      toast.success("Reimbursement request deleted successfully!");

      // Notify parent to update its state
      if (onSaveRequest) {
        onSaveRequest(updatedRequests);
      }
    } catch (error) {
      toast.error("Failed to delete request.");
      console.error("Error deleting request:", error);
    } finally {
      setIsDeleteDialogOpen(false);
      setDeleteRequest(null);
    }
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setDeleteRequest(null);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col">


    
      {/* Table */}
      <div className="overflow-x-auto px-4">
        <table className="min-w-full bg-white border text-sm rounded-md overflow-hidden dark:bg-gray-800">
          <thead className="bg-gray-100 dark:bg-gray-700 ">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">#</th>
              <th className="px-4 py-2 text-left font-semibold">Emp ID</th>
              <th className="px-4 py-2 text-left font-semibold">Requested At</th>
              <th className="px-4 py-2 text-left font-semibold">Amount</th>
              <th className="px-4 py-2 text-left font-semibold">Status</th>
              <th className="px-4 py-2 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, idx) => (
              <tr key={req._id} >
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2 text-blue-600">{req.employeeId}</td>
                <td className="px-4 py-2">{new Date(req.requestedAt).toLocaleString()}</td>
                <td className="px-4 py-2">{req.amount ? req.amount.toLocaleString() : '--'}</td>
                <td className="px-4 py-2">
                  {req.status === 'Approved' ? (
                    <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-md">Approved</span>
                  ) : req.status === 'Pending' ? (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-orange-800 bg-orange-100 rounded-md dark:bg-orange-900 dark:text-orange-100">Pending</span>
                  ) : req.status === 'Rejected' ? (
                    <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-md">Rejected</span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-100 rounded-md">{req.status}</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2 text-lg">
                    <button title="View" onClick={() => setViewRequest(req)} className="text-blue-500 hover:text-blue-700">
                      <FaRegEye />
                    </button>
                    <button title="Edit" onClick={() => setEditRequest(req)} className="text-green-500 hover:text-green-700">
                      <FaPen />
                    </button>
                    <button title="Delete" onClick={() => handleDeleteClick(req)} className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-4 text-center text-gray-500">No reimbursement requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      <ReimbursementViewModal request={viewRequest} onClose={() => setViewRequest(null)} />

      {/* Edit Modal */}
      <ReimbursementEditModal request={editRequest} onClose={() => setEditRequest(null)} />

      {/* Delete Confirmation */}
      <ConfirmationDialog open={isDeleteDialogOpen} title="Delete Confirmation" 
        message={`Delete reimbursement request for Employee: ${deleteRequest?.employeeId}?`}
        confirmText="Yes, Delete" cancelText="Cancel" onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
    </div>
  );
}
