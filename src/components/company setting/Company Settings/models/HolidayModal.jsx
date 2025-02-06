import React from "react";
import BaseModal from "../../../common/BaseModal";

export default function HolidayModal({
  isOpen,
  editId,
  holidayName,
  holidayDate,
  recurring,
  onHolidayNameChange,
  onHolidayDateChange,
  onRecurringChange,
  onClose,
  onSave,
}) {
  if (!isOpen) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">
          {editId ? "Edit Holiday" : "Declare Holiday"}
        </h2>
        <div className="mb-3">
          <label className="block mb-1">Holiday Name</label>
          <input
            type="text"
            value={holidayName}
            onChange={onHolidayNameChange}
            className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Date</label>
          <input
            type="date"
            value={holidayDate}
            onChange={onHolidayDateChange}
            className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Recurring</label>
          <select
            value={recurring ? "true" : "false"}
            onChange={onRecurringChange}
            className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
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
            {editId ? "Save" : "Declare"}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
