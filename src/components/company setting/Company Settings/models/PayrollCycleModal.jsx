import React from "react";
import BaseModal from "../../../common/BaseModal";

export default function PayrollCycleModal({
  isOpen,
  editId,
  cycleName,
  processingDate,
  onCycleNameChange,
  onProcessingDateChange,
  onClose,
  onSave,
}) {
  if (!isOpen) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">
          {editId ? "Edit Payroll Cycle" : "Add Payroll Cycle"}
        </h2>
        <div className="mb-3">
          <label className="block mb-1">Cycle Name</label>
          <input
            type="text"
            value={cycleName}
            onChange={onCycleNameChange}
            className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Processing Date</label>
          <input
            type="text"
            value={processingDate}
            onChange={onProcessingDateChange}
            className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
            placeholder="e.g. 1st Date or numeric day"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 dark:text-gray-200 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            {editId ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
