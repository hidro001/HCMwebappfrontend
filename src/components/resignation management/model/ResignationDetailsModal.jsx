

import React from "react";
import BaseModal from "../../common/BaseModal";

export default function ResignationDetailsModal({ isOpen, onClose, data }) {
  if (!isOpen) return null;
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl shadow-lg p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition-colors"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">Resignation Details</h2>
        {data ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p>
                <strong>Employee:</strong> {data.empNameAndId || "N/A"}
              </p>
              <p>
                <strong>Resignation Date:</strong> {data.resignationDate || "N/A"}
              </p>
              <p>
                <strong>Last Working Day:</strong> {data.lastWorkingDay || "N/A"}
              </p>
              <p>
                <strong>Reason:</strong> {data.reason || "N/A"}
              </p>
            </div>
            <div>
              <p>
                <strong>Department:</strong> {data.department || "N/A"}
              </p>
              <p>
                <strong>Designation:</strong> {data.designation || "N/A"}
              </p>
              <p>
                <strong>Status:</strong> {data.status || "N/A"}
              </p>
              <p>
                <strong>Submitted At:</strong> {data.submittedAt || "N/A"}
              </p>
            </div>
          </div>
        ) : (
          <p>No details available</p>
        )}
      </div>
    </BaseModal>
  );
}
