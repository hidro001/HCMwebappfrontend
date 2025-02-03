import React from "react";
import { FaTimes } from "react-icons/fa";
import { availablePermission } from "../../../../service/availablePermissions";

// 1) Import your BaseModal
import BaseModal from "../../../common/BaseModal"; // adjust path as needed

export default function RoleAddModal({
  show,
  onClose,
  roleName,
  setRoleName,
  selectedPerms,
  onTogglePerm,
  onSubmit,
}) {
  // If not showing, return null
  if (!show) return null;

  return (
    // 2) Wrap content in <BaseModal>
    <BaseModal isOpen={show} onClose={onClose}>
      {/* 3) Keep the "white box" container with your existing layout */}
      <div className="relative w-96 max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 
                     dark:text-gray-300 dark:hover:text-gray-100"
        >
          <FaTimes />
        </button>

        <h2 className="text-lg font-semibold mb-4">Add New Role</h2>

        <label className="block mb-2 font-medium" htmlFor="addRoleName">
          Role Name
        </label>
        <input
          id="addRoleName"
          type="text"
          placeholder="Enter Role Name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded 
                     dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        />

        <p className="font-medium mb-2">Select Permissions</p>
        <div className="space-y-2 mb-4">
          {availablePermission.map((perm) => {
            const isChecked = selectedPerms.some(
              (p) => p.value === perm.permission
            );
            return (
              <label
                key={perm.permission}
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-blue-500"
                  checked={isChecked}
                  onChange={() => onTogglePerm(perm)}
                />
                <span className="dark:text-gray-100 text-gray-800">
                  {perm.name}
                </span>
              </label>
            );
          })}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="border border-orange-500 text-orange-500 px-4 py-2 rounded 
                       hover:bg-orange-50 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
