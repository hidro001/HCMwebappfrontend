import React, { useState } from 'react';

// This modal is triggered when user clicks "Post Top Performer"
const PostPerformerModal = ({
  isOpen,
  onClose,
  employeeOptions = [],
  onSubmit,
}) => {
  // Local state for the form fields
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('');
  const [avgRating, setAvgRating] = useState('');
  const [comments, setComments] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [files, setFiles] = useState([]);

  // If not open, don't render anything
  if (!isOpen) return null;

  // Handle user picking an employee from the dropdown
  const handleSelectEmployee = (employeeId) => {
    setSelectedEmployee(employeeId);

    // If you want to auto‐populate other fields:
    const found = employeeOptions.find((e) => e.id === employeeId);
    if (found) {
      setDesignation(found.designation || '');
      setDepartment(found.department || '');
      setAvgRating(found.avgRating?.toString() || '');
    }
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      selectedEmployee,
      designation,
      department,
      avgRating,
      comments,
      month,
      year,
      files,
    };
    onSubmit(payload);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 dark:bg-black dark:bg-opacity-50 z-40"
        onClick={onClose}
      />
      {/* Modal content */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className="
            bg-white dark:bg-gray-800
            rounded-lg w-full max-w-md mx-4 p-6 relative
            text-gray-900 dark:text-gray-100
            border border-gray-200 dark:border-gray-600
          "
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Close Button */}
          <div className="
            flex justify-between items-center border-b pb-2 mb-4
            border-gray-200 dark:border-gray-600
          ">
            <h2 className="text-xl font-semibold">Post Performer of the Month</h2>
            <button
              onClick={onClose}
              className="
                text-gray-500 hover:text-gray-700
                dark:text-gray-400 dark:hover:text-gray-300
              "
            >
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Select Employee */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Select Employee
              </label>
              <select
                className="
                  border border-gray-300 dark:border-gray-600
                  rounded-md w-full p-2 text-sm
                  bg-white dark:bg-gray-700
                  text-gray-900 dark:text-gray-100
                "
                value={selectedEmployee}
                onChange={(e) => handleSelectEmployee(e.target.value)}
              >
                <option value="">-- Select Employee --</option>
                {employeeOptions.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} (ID: {emp.id})
                  </option>
                ))}
              </select>
            </div>

            {/* Designation */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Designation
              </label>
              <input
                type="text"
                className="
                  border border-gray-300 dark:border-gray-600
                  rounded-md w-full p-2 text-sm
                  bg-gray-100 dark:bg-gray-700
                  text-gray-900 dark:text-gray-100
                "
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                readOnly
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium mb-1">Department</label>
              <input
                type="text"
                className="
                  border border-gray-300 dark:border-gray-600
                  rounded-md w-full p-2 text-sm
                  bg-gray-100 dark:bg-gray-700
                  text-gray-900 dark:text-gray-100
                "
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                readOnly
              />
            </div>

            {/* Average Rating */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Average Rating
              </label>
              <input
                type="number"
                step="0.1"
                className="
                  border border-gray-300 dark:border-gray-600
                  rounded-md w-full p-2 text-sm
                  bg-white dark:bg-gray-700
                  text-gray-900 dark:text-gray-100
                "
                value={avgRating}
                onChange={(e) => setAvgRating(e.target.value)}
              />
            </div>

            {/* Comments */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Comments <span className="text-gray-400">(optional)</span>
              </label>
              <textarea
                className="
                  border border-gray-300 dark:border-gray-600
                  rounded-md w-full p-2 text-sm
                  bg-white dark:bg-gray-700
                  text-gray-900 dark:text-gray-100
                "
                rows={3}
                placeholder="Enter comments (optional)"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>

            {/* Month */}
            <div>
              <label className="block text-sm font-medium mb-1">Month</label>
              <select
                className="
                  border border-gray-300 dark:border-gray-600
                  rounded-md w-full p-2 text-sm
                  bg-white dark:bg-gray-700
                  text-gray-900 dark:text-gray-100
                "
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                <option value="">Select Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                {/* Add more months as needed */}
              </select>
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium mb-1">Year</label>
              <input
                type="text"
                className="
                  border border-gray-300 dark:border-gray-600
                  rounded-md w-full p-2 text-sm
                  bg-white dark:bg-gray-700
                  text-gray-900 dark:text-gray-100
                "
                placeholder="Enter Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>

            {/* Upload Media */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Upload Media
              </label>
              <input
                type="file"
                multiple
                className="
                  border border-gray-300 dark:border-gray-600
                  rounded-md w-full p-2 text-sm
                  bg-white dark:bg-gray-700
                  text-gray-900 dark:text-gray-100
                "
                onChange={handleFileChange}
              />
              <p className="text-xs text-gray-400 mt-1">
                You can upload multiple files. Allowed types: JPEG, PNG, GIF, PDF, DOC, DOCX.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="
                w-full bg-blue-600 hover:bg-blue-700 text-white
                dark:bg-blue-600 dark:hover:bg-blue-700
                py-2 px-4 rounded-md
              "
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostPerformerModal;
