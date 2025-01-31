import React, { useState } from 'react';

export default function AdvanceRequestEditModal({ request, onClose, onProcess }) {
  if (!request) return null;

  // Local state for remarks
  const [remarks, setRemarks] = useState('');

  const handleAction = (newStatus) => {
    if (onProcess) {
      onProcess({
        ...request,
        status: newStatus,
        remarks: remarks.trim(),
      });
    }
    onClose();
  };

  const {
    empId = 'RI0023',
    name = 'Riya Mishra',
    requestedAt = '25 Jan 2024, 10:30AM',
    advanceAmount = 10000,
    status = 'Pending',
    description = 'Lorem ipsum...',
  } = request;

  // Colored bullet for status
  const renderStatus = () => {
    let dotColor = 'bg-yellow-500'; 
    if (status === 'Approve') dotColor = 'bg-green-500';
    if (status === 'Reject') dotColor = 'bg-red-500';
    return (
      <div className="flex items-center gap-2">
        <span className={`inline-block w-2 h-2 rounded-full ${dotColor}`} />
        <span>{status}</span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="
          relative
          w-full
          max-w-md
          mx-2
          bg-white
          dark:bg-gray-800
          rounded-md
          shadow-lg
          p-6
          max-h-[90vh]
          overflow-y-auto
        "
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          Advance Request of {name} ({empId})
        </h2>

        {/* Requested At */}
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Requested At
          </p>
          <p className="text-sm">{requestedAt}</p>
        </div>

        {/* Advance Amount */}
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Advance Amount
          </p>
          <p className="text-sm">{advanceAmount}</p>
        </div>

        {/* Status */}
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Status
          </p>
          <div className="text-sm">{renderStatus()}</div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Description
          </p>
          <p className="text-sm mt-1">{description}</p>
        </div>

        {/* Process Request section */}
        <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-300 mb-3">
          Process Request
        </h3>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Remarks <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Enter Your Remark"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            rows={3}
            className="
              w-full
              border
              border-gray-300
              dark:border-gray-700
              rounded-md
              p-2
              text-sm
              focus:outline-none
              dark:bg-gray-900
              dark:text-gray-100
            "
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => handleAction('Reject')}
            className="px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 dark:hover:bg-red-900"
          >
            Reject
          </button>
          <button
            onClick={() => handleAction('Approve')}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
