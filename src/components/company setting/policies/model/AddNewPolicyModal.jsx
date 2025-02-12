import React from "react";

const AddNewPolicyModal = ({
  isOpen,
  onClose,
  policyTitle,
  setPolicyTitle,
  policyCategory,
  setPolicyCategory,
  department,
  setDepartment,
  description,
  setDescription,
  coverImage,
  setCoverImage,
  pdfFile,
  setPdfFile,
  effectiveDate,
  setEffectiveDate,
  reviewDate,
  setReviewDate,
  policyNumber,
  setPolicyNumber,
  handleUpload,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Add New Policy
        </h2>
        <form className="space-y-4">
          {/* Policy Title */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Policy Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={policyTitle}
              onChange={(e) => setPolicyTitle(e.target.value)}
              placeholder="Enter policy title"
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          {/* Policy Number */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Policy Number
            </label>
            <input
              type="text"
              value={policyNumber}
              onChange={(e) => setPolicyNumber(e.target.value)}
              placeholder="Enter policy number"
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          {/* Category */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={policyCategory}
              onChange={(e) => setPolicyCategory(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select category</option>
              <option value="Attendance">Attendance</option>
              <option value="Sales">Sales</option>
              <option value="HR">HR</option>
              <option value="IT">IT</option>
              <option value="Compliance">Compliance</option>
            </select>
          </div>
          {/* Department */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Department <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Enter department"
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          {/* Description */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter policy description"
              rows="3"
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring focus:ring-blue-300"
            ></textarea>
          </div>
          {/* Cover Image Upload */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImage(e.target.files[0])}
              className="w-full text-gray-900 dark:text-gray-100"
            />
          </div>
          {/* PDF Document Upload */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Policy Document (PDF) <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdfFile(e.target.files[0])}
              required
              className="w-full text-gray-900 dark:text-gray-100"
            />
          </div>
          {/* Effective Date & Review Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Effective Date
              </label>
              <input
                type="date"
                value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Review Date
              </label>
              <input
                type="date"
                value={reviewDate}
                onChange={(e) => setReviewDate(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>
          {/* Modal Actions */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleUpload();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Upload Policy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewPolicyModal;
