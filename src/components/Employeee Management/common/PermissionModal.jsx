
import React, { useState, useEffect } from "react";

export default function PermissionModal({
  isOpen,
  onClose,
  availablePermissions,
  defaultSelected = [],
  onSave,
}) {
  const [selectedPerms, setSelectedPerms] = useState([]);

  // Sync local state when the modal (re)opens
  useEffect(() => {
    if (isOpen) {
      setSelectedPerms(defaultSelected);
    }
  }, [isOpen, defaultSelected]);

  // Prevent body scroll when modal is open
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

  // Toggle a permission in local state
  const handleToggle = (permValue) => {
    setSelectedPerms((prev) => {
      if (prev.includes(permValue)) {
        return prev.filter((p) => p !== permValue);
      }
      return [...prev, permValue];
    });
  };

  // Don’t render if closed
  if (!isOpen) return null;

  return (
    // Outer container with padding to avoid touching screen edges on small devices
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black opacity-40"
        onClick={onClose}
      ></div>

      {/* MODAL CONTENT */}
      <div
        className="
          relative
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-white
          p-5 sm:p-6
          rounded-md shadow-md
          w-full max-w-md mx-auto
        "
      >
        <h2 className="text-xl font-semibold mb-4">Permission List</h2>

        {/* Scrollable container with responsive max-height */}
        <div
          id="scrollableDiv"
          className={`
            flex-1
            w-full
            mb-4
            pr-1
            overflow-y-auto
            max-h-[70vh]
            [scrollbar-width:thin]  /* For Firefox */
            [&::-webkit-scrollbar]:w-2  /* For Chrome, Safari, Edge */
            [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-track]:bg-gray-100
            dark:[&::-webkit-scrollbar-track]:bg-neutral-800
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-gray-400
            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
            transition-colors duration-300
          `}
        >
          {availablePermissions.map((perm) => (
            <label
              key={perm.permission}
              className="flex items-center space-x-2 mb-3 cursor-pointer"
            >
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

        {/* ACTION BUTTONS */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="
              px-4 py-2 rounded border border-gray-300
              bg-gray-100 text-gray-700
              hover:bg-gray-200 dark:border-gray-600
              dark:bg-gray-700 dark:text-white
              dark:hover:bg-gray-600
            "
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(selectedPerms)}
            className="
              px-4 py-2 rounded
              bg-blue-600 text-white
              hover:bg-blue-700
            "
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

