// AdvanceRequests.jsx

// 1) Import the new update function and your Edit modal
import { useState, useEffect } from "react";
import {
  FaRegEye,
  FaPen, // <-- ADD
  FaTrash,
  // ...
} from "react-icons/fa";
import toast from "react-hot-toast";
import {
  deleteRequests,
  updateAdvanceRequest, // <-- ADD
} from "../../../../service/payrollService";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import AdvanceRequestViewModal from "./AdvanceRequestViewModal";
// Import your new edit modal
import AdvanceRequestEditModal from "./AdvanceRequestEditModal"; // <-- ADD

export default function AdvanceRequests({ requests: parentRequests = [] }) {
  // Local state
  const [requests, setRequests] = useState(parentRequests);
  useEffect(() => {
    setRequests(parentRequests);
  }, [parentRequests]);

  const [viewRequest, setViewRequest] = useState(null);

  // 2) ADD STATE FOR EDIT
  const [editRequest, setEditRequest] = useState(null);

  // 3) ADD HANDLER to call API & update local state
  const handleProcessAdvance = async (updatedRequest) => {
    try {
      await updateAdvanceRequest(updatedRequest._id, {
        status: updatedRequest.status,
        remarks: updatedRequest.remarks,
      });

      // Update local list
      const updatedList = requests.map((req) =>
        req._id === updatedRequest._id ? { ...req, ...updatedRequest } : req
      );
      setRequests(updatedList);

      toast.success(`Advance request ${updatedRequest.status} successfully!`);
    } catch (error) {
      toast.error("Failed to process advance request.");
      console.error("Error updating advance request:", error);
    }
  };

  // For delete
  const [deleteRequest, setDeleteRequest] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleViewClick = (req) => {
    setViewRequest(req);
  };

  const handleDeleteClick = (req) => {
    setDeleteRequest(req);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteRequest) {
      try {
        await deleteRequests(deleteRequest._id);
        setRequests((prev) => prev.filter((r) => r._id !== deleteRequest._id));
        toast.success("Advance request deleted successfully!");
      } catch (error) {
        console.error("Failed to delete request:", error);
        toast.error("Failed to delete the request. Please try again.");
      }
    }
    setDeleteRequest(null);
    setIsDeleteDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteRequest(null);
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col">
      {/* Table */}
      <div className="overflow-x-auto px-4">
        <table className="min-w-full bg-white border border-gray-200 text-sm rounded-md overflow-hidden dark:bg-gray-800 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">#</th>
              <th className="px-4 py-2 text-left font-semibold">Emp ID</th>
              <th className="px-4 py-2 text-left font-semibold">
                Requested At
              </th>
              <th className="px-4 py-2 text-left font-semibold">
                Advance Amount
              </th>
              <th className="px-4 py-2 text-left font-semibold">Status</th>
              <th className="px-4 py-2 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr
                key={req._id}
                className="border-b last:border-0 dark:border-gray-700"
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 text-blue-600 dark:text-blue-400 font-medium">
                  {req.employeeId}
                </td>
                <td className="px-4 py-2">
                  {new Date(req.requestedAt).toLocaleString()}
                </td>
                <td className="px-4 py-2">
                  {req.amount?.toLocaleString() ?? "--"}
                </td>
                <td className="px-4 py-2">
                  {req.status === "Approved" ? (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-md dark:bg-green-900 dark:text-green-100">
                      Approved
                    </span>
                  ) : req.status === "Pending" ? (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-orange-800 bg-orange-100 rounded-md dark:bg-orange-900 dark:text-orange-100">
                      Pending
                    </span>
                  ) : req.status === "Rejected" ? (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-md dark:bg-red-900 dark:text-red-100">
                      Rejected
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 rounded-md dark:bg-gray-700 dark:text-gray-200">
                      {req.status}
                    </span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2 text-lg">
                    {/* Existing "View" button */}
                    <button
                      title="View"
                      onClick={() => handleViewClick(req)}
                      className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <FaRegEye />
                    </button>

                    {/* 4) ADD "Edit" button */}
                    <button
                      title="Edit"
                      onClick={() => setEditRequest(req)}
                      className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                    >
                      <FaPen />
                    </button>

                    {/* "Delete" button */}
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

      {/* 5) RENDER the Edit Modal */}
      <AdvanceRequestEditModal
        request={editRequest}
        onClose={() => setEditRequest(null)}
        onProcess={handleProcessAdvance} // callback to update status/remarks
      />

      {/* Delete Confirmation */}
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        title="Delete Confirmation"
        message={
          deleteRequest
            ? `Are you sure you want to delete the Advance Request for employee ${deleteRequest.employeeId}?`
            : "Are you sure you want to delete this request?"
        }
        confirmText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
