import React from 'react';
import { FaTimes } from 'react-icons/fa';

export default function AdvanceRequestViewModal({ request, onClose }) {
  if (!request) return null;

  // Destructure values from request using keys from your sample object
  const { employeeId, requestedAt, amount, status, reason } = request;

  // Render status with a colored bullet
  const renderStatus = () => {
    let dotColor = 'bg-yellow-500'; // default "Pending"
    if (status === 'Approved') dotColor = 'bg-green-500';
    else if (status === 'Rejected') dotColor = 'bg-red-500';
    return (
      <div className="flex items-center gap-2">
        <span className={`inline-block w-2 h-2 rounded-full ${dotColor}`} />
        <span>{status}</span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md mx-2 bg-white dark:bg-gray-800 rounded-md shadow-lg p-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          Advance Request of {employeeId}
        </h2>

        {/* Requested At */}
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Requested At
          </p>
          <p className="text-sm">
            {new Date(requestedAt).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        {/* Advance Amount */}
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Advance Amount
          </p>
          <p className="text-sm">{amount?.toLocaleString() ?? '--'}</p>
        </div>

        {/* Status */}
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Status
          </p>
          <div className="text-sm">{renderStatus()}</div>
        </div>

        {/* Reason */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Reason
          </p>
          <p className="text-sm mt-1">{reason}</p>
        </div>
      </div>
    </div>
  );
}
