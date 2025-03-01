import { useState } from 'react';
import toast from "react-hot-toast";
import { updateHikeRequest } from '../../../../service/payrollService';

export default function HikeRequestEditModal({ request, onClose, onSave }) {
  if (!request) return null;

  // Local state for remarks
  const [remarks, setRemarks] = useState('');

  // Handler for Accept or Reject action that calls the API
  const handleAction = async (newStatus) => {
    try {
      // Create updated object with new status and remarks
      const updatedRequest = {
        ...request,
        status: newStatus,
        remarks: remarks.trim(),
      };
      // Call the API to update the hike request
      const response = await updateHikeRequest(request._id, updatedRequest);
      // Call onSave with the updated request so that the parent can update its array
      onSave(response.data);
      toast.success("Hike request updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating hike request:", error);
      toast.error("Failed to update hike request");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal Content */}
      <div className="bg-white dark:bg-gray-800 rounded-md shadow-lg w-full max-w-md p-6 relative mx-2">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          &times;
        </button>

        <h2 className="text-lg md:text-xl font-semibold mb-3">
          Hike Request of {request.name} ({request.employeeId})
        </h2>
        
        {/* Basic Details */}
        <div className="mb-2">
  <strong>Requested At:</strong>{" "}
  {new Date(request.requestedAt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })}
</div>
<div className="mb-2">
          <strong>Salary Hike (%):</strong> {request.salaryHikePercentage}
        </div>
        <div className="mb-2">
          <strong>Status:</strong> {request.status}
        </div>
        <div className="mb-4">
          <strong>Description:</strong>
          <p className="mt-1">
            {request.reason || 'No description provided.'}
          </p>
        </div>

        {/* Process Request Section */}
        <h3 className="font-semibold mb-2">Process Request</h3>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Remarks
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 mt-1 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
            rows={3}
            placeholder="Enter your remark"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => handleAction('Rejected')}
            className="px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 dark:hover:bg-red-900"
          >
            Reject
          </button>
          <button
            onClick={() => handleAction('Approved')}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
