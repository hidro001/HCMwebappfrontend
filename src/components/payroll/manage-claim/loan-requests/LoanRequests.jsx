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
import LoanRequestViewModal from './LoanRequestViewModal';
import LoanRequestEditModal from './LoanRequestEditModal';

export default function LoanRequests({ requests: parentRequests = [], onSaveRequest }) {
  // Ensure the local state is an array
  const [requests, setRequests] = useState(Array.isArray(parentRequests) ? parentRequests : []);

  // Sync local state when parent state updates
  useEffect(() => {
    setRequests(Array.isArray(parentRequests) ? parentRequests : []);
  }, [parentRequests]);

  const [viewRequest, setViewRequest] = useState(null);
  const [editRequest, setEditRequest] = useState(null);
  const [deleteRequest, setDeleteRequest] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Update handler: update the loan request in the local state array
  const handleUpdateRequest = (updatedRequest) => {
    setRequests(prev =>
      prev.map(req => (req._id === updatedRequest._id ? updatedRequest : req))
    );
    if (onSaveRequest) {
      onSaveRequest(requests);
    }
  };

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
      const updatedRequests = requests.filter(req => req._id !== deleteRequest._id);
      setRequests(updatedRequests);
      toast.success("Loan request deleted successfully!");
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
              <th className="px-4 py-2 text-left font-semibold">Tenure (mo)</th>
              <th className="px-4 py-2 text-left font-semibold">Interest Rate</th>
              <th className="px-4 py-2 text-left font-semibold">Monthly Pay</th>
              <th className="px-4 py-2 text-left font-semibold">Status</th>
              <th className="px-4 py-2 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((loan, idx) => (
              <tr key={loan._id}>
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2 text-blue-600">{loan.employeeId}</td>
                <td className="px-4 py-2">{new Date(loan.requestedAt).toLocaleString()}</td>
                <td className="px-4 py-2">{loan.amount?.toLocaleString() ?? '--'}</td>
                <td className="px-4 py-2">{loan.tenure ?? '--'}</td>
                <td className="px-4 py-2">
                  {loan.interestRate ? `${loan.interestRate}%` : '--'}
                </td>
                <td className="px-4 py-2">{loan.monthlyRepayment?.toLocaleString() ?? '--'}</td>
                <td className="px-4 py-2">
                  {loan.status === 'Approved' ? (
                    <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-md">
                      Approved
                    </span>
                  ) : loan.status === 'Pending' ? (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-orange-800 bg-orange-100 rounded-md dark:bg-orange-900 dark:text-orange-100">
                      Pending
                    </span>
                  ) : loan.status === 'Rejected' ? (
                    <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-md">
                      Rejected
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-100 rounded-md">
                      {loan.status}
                    </span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2 text-lg">
                    <button
                      title="View"
                      onClick={() => setViewRequest(loan)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaRegEye />
                    </button>
                    <button
                      title="Edit"
                      onClick={() => setEditRequest(loan)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <FaPen />
                    </button>
                    <button
                      title="Delete"
                      onClick={() => handleDeleteClick(loan)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-4 text-center text-gray-500">
                  No loan requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      <LoanRequestViewModal request={viewRequest} onClose={() => setViewRequest(null)} />

      {/* Edit Modal */}
      <LoanRequestEditModal request={editRequest} onClose={() => setEditRequest(null)} onProcess={handleUpdateRequest} />

      {/* Delete Confirmation */}
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        title="Delete Confirmation"
        message={`Delete loan request for Employee: ${deleteRequest?.employeeId}?`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
