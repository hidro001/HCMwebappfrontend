import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

export default function UpdateStatusModal({ referral, onClose, onSubmit }) {
  const [status, setStatus] = useState(referral.status || 'Pending');
  const [feedback, setFeedback] = useState('');

  // Prevent body scroll when modal mounts
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  

  const handleUpdate = () => {
    // Pass the data back to parent
    onSubmit(status, feedback);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Modal Card */}
      <motion.div
        className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-lg w-full max-w-md p-4 relative"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        <h2 className="text-lg font-semibold mb-3">
          Update Status for {referral.referredBy}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Please select the new status and provide any necessary feedback.
        </p>

        <div className="mb-4">
          <label className="block text-sm mb-1">Status</label>
          <select
            className="w-full border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In Review">In Review</option>
            <option value="Rejected">Rejected</option>
            <option value="Onboard">Onboard</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Feedback</label>
          <textarea
            rows={3}
            className="w-full border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
            placeholder="Provide feedback or note"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 border border-gray-300 dark:border-gray-500 rounded text-sm text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
