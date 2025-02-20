
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import useDepartmentStore from "../../../../store/departmentStore"; 
import BaseModal from "../../../common/BaseModal"; // Adjust the path as needed

const InductionPPTModal = ({
  isOpen,
  onClose,
  pptName,
  setPptName,
  department,
  setDepartment,
  file,
  setFile,
  coverImage,
  setCoverImage,
  handleSubmit,
}) => {
  // Fetch departments dynamically
  const { departments, fetchDepartments, loading } = useDepartmentStore();

  useEffect(() => {
    if (isOpen) {
      fetchDepartments();
    }
  }, [isOpen, fetchDepartments]);

  if (!isOpen) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <AnimatePresence>
        <motion.div
          key="modalContent"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6 relative">
            {/* Close Icon */}
            <button
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900"
              onClick={onClose}
            >
              <FiX size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              Add Induction PPT
            </h2>
            <form onSubmit={handleSubmit}>
              {/* PPT Name */}
              <div className="mb-4">
                <label
                  htmlFor="pptName"
                  className="block text-gray-700 dark:text-gray-200 mb-1"
                >
                  Induction PPT Name
                </label>
                <input
                  id="pptName"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter Induction PPT Name"
                  value={pptName}
                  onChange={(e) => setPptName(e.target.value)}
                  required
                />
              </div>

              {/* Select Department (Dynamic) */}
              <div className="mb-4">
                <label
                  htmlFor="department"
                  className="block text-gray-700 dark:text-gray-200 mb-1"
                >
                  Select Department
                </label>
                {loading ? (
                  <p>Loading departments...</p>
                ) : (
                  <select
                    id="department"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                  >
                    <option value="">Select Option</option>
                    {departments.map((dep) => (
                      <option key={dep._id} value={dep.department}>
                        {dep.department}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* File Upload for PPT */}
              <div className="mb-4">
                <label
                  htmlFor="pptFile"
                  className="block text-gray-700 dark:text-gray-200 mb-1"
                >
                  Choose PPT File
                </label>
                <input
                  id="pptFile"
                  type="file"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:text-gray-200 dark:bg-gray-700 dark:file:bg-gray-600 dark:file:text-gray-100"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
              </div>

              {/* File Upload for Cover Image */}
              <div className="mb-4">
                <label
                  htmlFor="coverImage"
                  className="block text-gray-700 dark:text-gray-200 mb-1"
                >
                  Choose Cover Image (optional)
                </label>
                <input
                  id="coverImage"
                  type="file"
                  accept="image/*"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:text-gray-200 dark:bg-gray-700 dark:file:bg-gray-600 dark:file:text-gray-100"
                  onChange={(e) => setCoverImage(e.target.files[0])}
                />
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  className="mr-3 px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50 dark:hover:bg-gray-700"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-400 dark:text-gray-900"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </AnimatePresence>
    </BaseModal>
  );
};

export default InductionPPTModal;
