import React from "react";
import BaseModal from "../../common/BaseModal";

export default function JobDetailsModal({ isOpen, onClose, vacancy }) {
  if (!isOpen || !vacancy) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-3">{vacancy.title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          <strong>Department:</strong> {vacancy.department} <br />
          <strong>Location:</strong> {vacancy.location} <br />
          <strong>Salary:</strong> ${vacancy.salary.toLocaleString()} <br />
          <strong>Status:</strong> {vacancy.status} <br />
          <strong>Publication:</strong> {vacancy.publication} <br />
          <strong>Position Type:</strong> {vacancy.positionType} <br />
          <strong>Experience:</strong> {vacancy.workExperience} <br />
        </p>
        <div className="mb-4">
          <h3 className="font-medium text-lg mb-1">Job Description:</h3>
          <p className="text-gray-700 dark:text-gray-200">{vacancy.description}</p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
