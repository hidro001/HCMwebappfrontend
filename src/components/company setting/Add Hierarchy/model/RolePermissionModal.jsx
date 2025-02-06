import React from "react";
import { FaTimes } from "react-icons/fa";
import { availablePermission } from "../../../../service/availablePermissions";
import BaseModal from "../../../common/BaseModal";

export default function RolePermissionModal({
  show,
  onClose,
  isEditing,
  roleName,
  setRoleName,
  permissions,
  onTogglePerm,
  onSave,
}) {
  if (!show) return null;

  return (
    <BaseModal isOpen={show} onClose={onClose}>
      <div className="relative w-96 max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
        >
          <FaTimes />
        </button>
        <h2 className="text-lg font-semibold mb-4">
          {isEditing ? `Edit Role (${roleName})` : `View Role (${roleName})`}
        </h2>
        {isEditing && (
          <>
            <label className="block mb-2 font-medium" htmlFor="editRoleName">
              Role Name
            </label>
            <input
              id="editRoleName"
              type="text"
              placeholder="Enter Role Name"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
          </>
        )}
        <p className="font-medium mb-2">Permissions</p>
        <div className="space-y-2 mb-4">
          {availablePermission.map((perm) => {
            const isChecked = permissions.some(
              (p) => p.value === perm.permission
            );
            return (
              <label key={perm.permission} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-blue-500"
                  checked={isChecked}
                  onChange={() => {
                    if (isEditing) {
                      onTogglePerm(perm);
                    }
                  }}
                  disabled={!isEditing}
                />
                <span className="dark:text-gray-100 text-gray-800">{perm.name}</span>
              </label>
            );
          })}
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="border border-orange-500 text-orange-500 px-4 py-2 rounded hover:bg-orange-50 dark:hover:bg-gray-700"
          >
            {isEditing ? "Cancel" : "Close"}
          </button>
          {isEditing && (
            <button
              onClick={onSave}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </BaseModal>
  );
}
