

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// A simple fade-and-scale animation for the overlay and modal content
const overlayAnimation = {
  layout: true,
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2 },
};

export default function AssetGroupModal({ isOpen, onClose, onSubmit }) {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  // 1) Prevent body scrolling when the modal is open
  useEffect(() => {
    if (isOpen) {
      // Store the current overflow style to restore it later
      const originalStyle = window.getComputedStyle(document.body).overflow;
      // Prevent scrolling
      document.body.style.overflow = "hidden";

      // Cleanup: restore original body overflow
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the data to the parent (or do your own API call here)
    onSubmit({ groupName, groupDescription });
    // Close the modal
    onClose();
  };

  // If not open, render nothing
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        // 2) Modal Overlay with glass (blur) effect
        <motion.div
          // backdrop-blur-sm => small blur
          // bg-black/60 => semi-transparent black
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          {...overlayAnimation}
        >
          {/* Modal Content */}
          <motion.div
            layout
            className="bg-white dark:bg-gray-800 rounded-md p-6 w-full max-w-md shadow-lg"
            {...overlayAnimation}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Add New Asset Group</h2>
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Group Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Group Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter Group Name"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none bg-white dark:bg-gray-700 dark:text-white"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>

              {/* Group Description */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Group Description
                </label>
                <textarea
                  placeholder="Write description about Asset"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 h-24 focus:outline-none bg-white dark:bg-gray-700 dark:text-white"
                  value={groupDescription}
                  onChange={(e) => setGroupDescription(e.target.value)}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded border border-orange-400 text-orange-500 hover:bg-orange-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Add group
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
