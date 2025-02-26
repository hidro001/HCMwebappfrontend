
import React, { useEffect, useState } from "react";
import BaseModal from "../../common/BaseModal";
export default function PermissionModal({ isOpen, onClose, availablePermissions, defaultSelected = [], onSave }) {
  const [selectedPerms, setSelectedPerms] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setSelectedPerms(defaultSelected);
    }
  }, [isOpen, defaultSelected]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleToggle = (permValue) => {
    setSelectedPerms(prev =>
      prev.includes(permValue)
        ? prev.filter(p => p !== permValue)
        : [...prev, permValue]
    );
  };

  if (!isOpen) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="relative bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-5 rounded-md shadow-md w-full max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Permission List</h2>
        <div className="flex-1 mb-4 pr-1 overflow-y-auto max-h-[70vh]">
          {availablePermissions.map((perm) => (
            <label key={perm.permission} className="flex items-center space-x-2 mb-3 cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600 dark:text-blue-400"
                checked={selectedPerms.includes(perm.permission)}
                onChange={() => handleToggle(perm.permission)}
              />
              <span>{perm.name}</span>
            </label>
          ))}
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border bg-gray-100 text-gray-700 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(selectedPerms)}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </BaseModal>
  );
}

