

import React from "react";

export default function ResignationDetailsModal({ isOpen, onClose, data }) {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-50 
        flex items-center justify-center
               
        backdrop-blur-sm
      "
    >
      {/* MODAL CONTENT */}
      <div
        className="
          relative 
          w-full max-w-2xl
          bg-white dark:bg-gray-800
          text-gray-800 dark:text-gray-100
          rounded-xl
          shadow-lg
          p-6
        "
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="
            absolute top-3 right-3
            text-gray-500 dark:text-gray-300
            hover:text-gray-700 dark:hover:text-gray-100
            transition-colors
          "
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4">Resignation Details</h2>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {/* Column 1 */}
          <div>
            <p className="mb-1">
              <strong>Employee Name & ID:</strong> {data?.empNameAndId || "N/A"}
            </p>
            <p className="mb-1">
              <strong>Designation:</strong> {data?.designation || "N/A"}
            </p>
            <p className="mb-1">
              <strong>Department:</strong> {data?.department || "N/A"}
            </p>
            <p className="mb-1">
              <strong>Submitted At:</strong> {data?.submittedAt || "N/A"}
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <p className="mb-1">
              <strong>Assigned Manager:</strong> {data?.manager || "N/A"}
            </p>
            <p className="mb-1">
              <strong>Status:</strong> {data?.status || "N/A"}
            </p>
            <p className="mb-1">
              <strong>Comments:</strong>
              <br />
              {/* Replace with actual comment field if available */}
              {data?.comment || "Lorem ipsum dolor sit amet..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
