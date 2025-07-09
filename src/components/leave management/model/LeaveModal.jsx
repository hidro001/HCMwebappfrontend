import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import BaseModal from '../../common/BaseModal.jsx';

const LeaveApprovalModal = ({ 
  isOpen, 
  onClose, 
  selectedLeave, 
  approvalAction,
  onApprovalSubmit 
}) => {
  const [rejectionReason, setRejectionReason] = useState("");

  const handleSubmit = () => {
    onApprovalSubmit(approvalAction, rejectionReason);
    setRejectionReason("");
  };

  if (!selectedLeave) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <BaseModal isOpen={isOpen} onClose={onClose}>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full transition-colors"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 transition-colors">
                  {approvalAction === "approve" ? "Approve" : "Reject"} Leave Request
                </h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 dark:text-gray-300 transition-colors">
                  Are you sure you want to {approvalAction} the leave request for{" "}
                  <span className="font-medium">
                    {selectedLeave?.employee?.first_Name || ''} {selectedLeave?.employee?.last_Name || ''}
                  </span>
                  ?
                </p>
              </div>

              {approvalAction === "reject" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 transition-colors">
                    Reason for Rejection <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
                    rows="3"
                    placeholder="Please provide a reason for rejection..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                  />
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 border px-4 py-2 rounded-lg font-medium transition-colors border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={approvalAction === "reject" && !rejectionReason.trim()}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    approvalAction === "approve"
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-red-600 hover:bg-red-700 text-white"
                  }`}
                >
                  {approvalAction === "approve" ? "Approve" : "Reject"}
                </button>
              </div>
            </div>
          </motion.div>
        </BaseModal>
      )}
    </AnimatePresence>
  );
};

export default LeaveApprovalModal;