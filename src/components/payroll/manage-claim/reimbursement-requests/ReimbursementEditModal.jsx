import React, { useState } from 'react';
import { FaDownload } from 'react-icons/fa';

export default function ReimbursementEditModal({ request, onClose, onProcess }) {
  if (!request) return null;

  const [remarks, setRemarks] = useState('');

  const handleAction = (newStatus) => {
    if (onProcess) {
      onProcess({
        ...request,
        remarks: remarks.trim(),
        status: newStatus,
      });
    }
    onClose();
  };

  // Destructure dynamic values from request without static fallbacks
  const { empId, name, requestedAt, amount, status, description, attachment } = request;

  const renderStatusDot = () => {
    let dotColor = 'bg-yellow-500';
    if (status === 'Approved') dotColor = 'bg-green-500';
    if (status === 'Rejected') dotColor = 'bg-red-500';
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
          &times;
        </button>

        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          Reimbursement Request of {name} ({empId})
        </h2>

        {/* Requested At */}
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Requested At</p>
          <p className="text-sm">{new Date(requestedAt).toLocaleString()}</p>
        </div>

        {/* Amount */}
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Amount</p>
          <p className="text-sm">{amount}</p>
        </div>

        {/* Status */}
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
          <div className="text-sm">{renderStatusDot()}</div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</p>
          <p className="text-sm mt-1">{description}</p>
        </div>

        {/* Attachment */}
        {attachment && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">View Attachment</p>
            <div className="mt-2 inline-flex items-center gap-2 rounded-md border border-gray-200 dark:border-gray-600 px-3 py-2">
              <div className="text-sm">
                <p className="font-semibold">{attachment.fileName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{attachment.size}</p>
              </div>
              <a
                href={attachment.url}
                download
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              >
                <FaDownload />
              </a>
            </div>
          </div>
        )}

        {/* Process Request */}
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
            className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 text-sm focus:outline-none dark:bg-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
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
