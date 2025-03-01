import React from 'react';
import { FaTimes, FaDownload } from 'react-icons/fa';

export default function LoanRequestViewModal({ request, onClose }) {
  if (!request) return null;

  // Destructure dynamic values using proper key names
  const { employeeId, full_Name, requestedAt, amount, tenure, interestRate, status, reason, attachment } = request;

  const renderStatusDot = () => {
    let dotColor = 'bg-yellow-500'; // default "Pending"
    if (status === 'Approved') dotColor = 'bg-green-500';
    if (status === 'Rejected') dotColor = 'bg-red-500';
    return (
      <div className="flex items-center gap-2">
        <span className={`inline-block w-2 h-2 rounded-full ${dotColor}`} />
        <span>{status}</span>
      </div>
    );
  };

  const formattedRequestedAt = new Date(requestedAt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal container */}
      <div className="relative w-full max-w-lg mx-2 bg-white dark:bg-gray-800 rounded-md shadow-lg p-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold"
        >
          <FaTimes />
        </button>

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          Loan Request of {full_Name} ({employeeId})
        </h2>

        {/* Requested At */}
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Requested At</p>
          <p className="text-sm">{formattedRequestedAt}</p>
        </div>

        {/* Amount */}
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Amount</p>
          <p className="text-sm">{amount}</p>
        </div>

        {/* Tenure */}
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tenure (months)</p>
          <p className="text-sm">{tenure}</p>
        </div>

        {/* Interest Rate */}
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Interest Rate (%)</p>
          <p className="text-sm">{interestRate}</p>
        </div>

        {/* Status */}
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
          <div className="text-sm">{renderStatusDot()}</div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</p>
          <p className="text-sm mt-1">{reason}</p>
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
      </div>
    </div>
  );
}
