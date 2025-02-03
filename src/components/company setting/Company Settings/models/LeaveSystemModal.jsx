import React from "react";
import BaseModal from "../../../common/BaseModal";

export default function LeaveSystemModal({
  isOpen,
  editId,
  sysName,
  workingDays,
  monthlyLeaves,
  onSysNameChange,
  onWorkingDaysChange,
  onMonthlyLeavesChange,
  onClose,
  onSave,
}) {
  if (!isOpen) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-lg w-full max-w-sm p-6">
        <h3 className="text-xl font-bold mb-4">
          {editId ? "Edit Leave System" : "Add Leave System"}
        </h3>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            value={sysName}
            onChange={onSysNameChange}
            className="w-full p-2 border dark:border-gray-700 rounded dark:bg-gray-800"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Working Days</label>
          <input
            type="text"
            value={workingDays}
            onChange={onWorkingDaysChange}
            placeholder="e.g. Mon-Fri"
            className="w-full p-2 border dark:border-gray-700 rounded dark:bg-gray-800"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Monthly Paid Leaves</label>
          <input
            type="number"
            step="0.5"
            value={monthlyLeaves}
            onChange={onMonthlyLeavesChange}
            className="w-full p-2 border dark:border-gray-700 rounded dark:bg-gray-800"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {editId ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
