import React, { useRef, useState } from "react";
import { FaTimes, FaPaperclip } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const AssignedTaskEdit = ({ onClose }) => {
  const modalRef = useRef(null);
  const [attachment, setAttachment] = useState(null);

  // Handle file upload
  const handleFileUpload = (e) => {
    if (e.target.files.length > 0) {
      setAttachment(e.target.files[0]);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 dark:bg-opacity-75 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        aria-hidden="true"
      >
        <motion.div
          ref={modalRef}
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl overflow-hidden relative"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-red-600 transition duration-200"
            aria-label="Close form"
          >
            <FaTimes size={20} />
          </button>

          {/* Header */}
          <div className="bg-blue-900 text-white dark:bg-blue-700 p-4 text-lg font-semibold">
            Assigned Task
          </div>

          {/* Form Content */}
          <div className="p-6">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You can assign tasks to team members, set deadlines, and track their progress seamlessly.
            </p>

            <form className="space-y-4">
              {/* Task Name */}
              <div>
                <label className="block text-sm font-medium">Task Name*</label>
                <input
                  type="text"
                  placeholder="Enter Task Name"
                  className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              {/* Assignee & Department */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Assignee</label>
                  <input
                    type="text"
                    value="Riya Mishra (RI0023)"
                    disabled
                    className="w-full p-2 border rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Department</label>
                  <input
                    type="text"
                    value="IT"
                    disabled
                    className="w-full p-2 border rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Employee Name & ID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Employee Name</label>
                  <input
                    type="text"
                    value="Akhilesh"
                    disabled
                    className="w-full p-2 border rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Employee ID</label>
                  <input
                    type="text"
                    value="RI0056"
                    disabled
                    className="w-full p-2 border rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium">Due Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              {/* Priority & Status */}
              <div className="space-y-2">
                <fieldset className="flex space-x-4">
                  <legend className="text-sm font-medium">Priority*</legend>
                  {["High", "Medium", "Low"].map((level) => (
                    <label key={level} className="inline-flex items-center">
                      <input type="radio" name="priority" value={level} className="mr-2" />
                      <span
                        className={
                          level === "High"
                            ? "text-red-500"
                            : level === "Medium"
                            ? "text-yellow-500"
                            : "text-green-500"
                        }
                      >
                        {level}
                      </span>
                    </label>
                  ))}
                </fieldset>
                <fieldset className="flex space-x-4">
                  <legend className="text-sm font-medium">Status*</legend>
                  {["On Hold", "Not Started", "Done"].map((state) => (
                    <label key={state} className="inline-flex items-center">
                      <input type="radio" name="status" value={state} className="mr-2" />
                      <span
                        className={
                          state === "On Hold"
                            ? "text-blue-500"
                            : state === "Not Started"
                            ? "text-orange-500"
                            : "text-green-500"
                        }
                      >
                        {state}
                      </span>
                    </label>
                  ))}
                </fieldset>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  placeholder="Enter a description..."
                  className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Attachment Upload */}
              <div>
                <label className="block text-sm font-medium">Attachment</label>
                <div className="flex items-center space-x-4 border rounded-md p-3 bg-gray-50 dark:bg-gray-700 dark:text-white">
                  <FaPaperclip className="text-gray-600 dark:text-gray-300" />
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="text-sm text-gray-700 dark:text-gray-300"
                  />
                </div>
                {attachment && (
                  <div className="mt-2 flex items-center p-2 border rounded-md bg-gray-100 dark:bg-gray-800">
                    <FaPaperclip className="text-gray-600 dark:text-gray-300 mr-2" />
                    <span className="text-gray-800 dark:text-gray-200 text-sm">{attachment.name}</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-200"
              >
                Submit Change
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AssignedTaskEdit;
