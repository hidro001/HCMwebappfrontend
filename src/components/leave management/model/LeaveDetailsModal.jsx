


import React from 'react';
import BaseModal from '../../common/BaseModal';

export default function LeaveDetailsModal({ leave, onClose }) {
  if (!leave) return null;
  return (
    <BaseModal isOpen={!!leave} onClose={onClose}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-11/12 md:w-1/2 relative">
        <h3 className="text-xl font-bold mb-4">Leave Details</h3>
        <p><strong>Leave Type:</strong> {leave.leave_Type}</p>
        <p>
          <strong>From:</strong> {new Date(leave.leave_From).toLocaleDateString()}
        </p>
        <p>
          <strong>To:</strong> {new Date(leave.leave_To).toLocaleDateString()}
        </p>
        <p><strong>Days:</strong> {leave.no_Of_Days}</p>
        <p><strong>Reason for Leave:</strong> {leave.reason_For_Leave}</p>
        <p>
          <strong>Status:</strong> {leave.leave_Status.charAt(0).toUpperCase() + leave.leave_Status.slice(1)}
        </p>
        <div className="mt-4 text-right">
          <button onClick={onClose} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
            Close
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
