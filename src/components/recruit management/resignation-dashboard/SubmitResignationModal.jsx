import { useState } from "react";
import { submitResignation } from "../../../service/recruitService";

export default function SubmitResignationModal({ isOpen, onClose }) {
  const [resignationDate, setResignationDate] = useState("");
  const [lastWorkingDay, setLastWorkingDay] = useState("");
  const [comments, setComments] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setMessage(null);
    setError(null);

    if (!resignationDate || !lastWorkingDay) {
      setError("Please select both resignation date and last working day.");
      return;
    }

    try {
      const response = await submitResignation({
        resignationDate,
        lastWorkingDay,
        comments,
      });

      setMessage(response.message);
      setTimeout(() => {
        onClose(); // Close modal after success
      }, 1000);
    } catch (error) {
      setError(error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal Container */}
      <div className="bg-white dark:bg-gray-800 w-full max-w-md mx-4 p-6 rounded-lg shadow-lg relative">
        <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
          Submit Resignation
        </h2>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
        >
          ✕
        </button>

        {/* Success / Error Messages */}
        {message && (
          <p className="text-green-600 bg-green-100 dark:bg-green-800 dark:text-green-300 p-2 rounded-md text-sm">
            {message}
          </p>
        )}
        {error && (
          <p className="text-red-600 bg-red-100 dark:bg-red-800 dark:text-red-300 p-2 rounded-md text-sm">
            {error}
          </p>
        )}

        <div className="space-y-4 mt-2">
          {/* Resignation Date Picker */}
          <div>
            <label htmlFor="resignationDate" className="block font-semibold mb-1">
              Resignation Date
            </label>
            <input
              id="resignationDate"
              type="date"
              value={resignationDate}
              onChange={(e) => setResignationDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Last Working Day Picker */}
          <div>
            <label htmlFor="lastWorkingDay" className="block font-semibold mb-1">
              Last Working Day
            </label>
            <input
              id="lastWorkingDay"
              type="date"
              value={lastWorkingDay}
              onChange={(e) => setLastWorkingDay(e.target.value)}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Comments Field */}
          <div>
            <label htmlFor="comments" className="block font-semibold mb-1">
              Comments
            </label>
            <textarea
              id="comments"
              placeholder="Write Comment..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-800"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
