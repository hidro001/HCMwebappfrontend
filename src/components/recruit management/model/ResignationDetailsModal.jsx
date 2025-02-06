import React from "react";
import BaseModal from "../../common/BaseModal";

export default function ResignationDetailsModal({ isOpen, onClose, data }) {
  if (!isOpen) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
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
        <h2 className="text-xl font-semibold mb-4">Resignation Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="mb-1">
              <strong>Employee Name &amp; ID:</strong> {data?.empNameAndId || "N/A"}
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
              {data?.comment || "Lorem ipsum dolor sit amet..."}
            </p>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
