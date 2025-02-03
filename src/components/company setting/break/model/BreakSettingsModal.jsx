import React from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

import BaseModal from "../../../common/BaseModal"; // Adjust the path as needed

const BreakSettingsModal = ({
  isOpen,
  editingItem,
  breakType,
  setBreakType,
  breakDuration,
  setBreakDuration,
  autoBreakStart,
  setAutoBreakStart,
  detectionType,
  setDetectionType,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    // 2) Use <BaseModal> for the overlay/portal
    <BaseModal isOpen={isOpen} onClose={onClose}>
      {/* 3) Keep your "modal card" in a motion.div for transitions */}
      <motion.div
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        {/* Close icon */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-200"
          onClick={onClose}
        >
          <FiX size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          {editingItem ? "Edit Break Settings" : "Add Break Settings"}
        </h2>

        <form onSubmit={onSubmit}>
          {/* Break Type */}
          <div className="mb-4">
            <label
              htmlFor="breakType"
              className="block text-gray-700 dark:text-gray-200 mb-1"
            >
              Break Type
            </label>
            <input
              id="breakType"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded 
                         focus:outline-none focus:border-blue-500 
                         dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter Break Type"
              value={breakType}
              onChange={(e) => setBreakType(e.target.value)}
              required
            />
          </div>

          {/* Break Duration */}
          <div className="mb-4">
            <label
              htmlFor="breakDuration"
              className="block text-gray-700 dark:text-gray-200 mb-1"
            >
              Break Duration (Hours)
            </label>
            <input
              id="breakDuration"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded 
                         focus:outline-none focus:border-blue-500 
                         dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="e.g., 1.5"
              value={breakDuration}
              onChange={(e) => setBreakDuration(e.target.value)}
              required
            />
          </div>

          {/* Auto Break Start */}
          <div className="mb-4">
            <label
              htmlFor="autoBreakStart"
              className="block text-gray-700 dark:text-gray-200 mb-1"
            >
              Auto Break Start (Min)
            </label>
            <input
              id="autoBreakStart"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded 
                         focus:outline-none focus:border-blue-500 
                         dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="e.g., 1"
              value={autoBreakStart}
              onChange={(e) => setAutoBreakStart(e.target.value)}
              required
            />
          </div>

          {/* Detection Type */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 mb-1">
              Detection Type
            </label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center text-gray-700 dark:text-gray-200">
                <input
                  type="radio"
                  name="detectionType"
                  value="Face Detection"
                  checked={detectionType === "Face Detection"}
                  onChange={(e) => setDetectionType(e.target.value)}
                  className="form-radio h-4 w-4 text-blue-500 mr-2 
                             dark:bg-gray-700 dark:border-gray-600"
                />
                Face Detection
              </label>
              <label className="inline-flex items-center text-gray-700 dark:text-gray-200">
                <input
                  type="radio"
                  name="detectionType"
                  value="Monitor Track"
                  checked={detectionType === "Monitor Track"}
                  onChange={(e) => setDetectionType(e.target.value)}
                  className="form-radio h-4 w-4 text-blue-500 mr-2 
                             dark:bg-gray-700 dark:border-gray-600"
                />
                Monitor Track
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-6">
            <button
              type="button"
              className="mr-3 px-4 py-2 border border-red-500 text-red-500 
                         rounded hover:bg-red-50 dark:hover:bg-gray-700"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded 
                         hover:bg-blue-600 dark:hover:bg-blue-400 
                         dark:text-gray-900"
            >
              {editingItem ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </motion.div>
    </BaseModal>
  );
};

export default BreakSettingsModal;
