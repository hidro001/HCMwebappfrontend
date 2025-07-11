import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCheck } from 'react-icons/fa';
import BaseModal from '../../common/BaseModal.jsx';

const StatusBadge = ({ status }) => {
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(status)}`}>
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  );
};

const LeaveDetailsModal = ({ 
  isOpen, 
  onClose, 
  selectedLeave, 
  onApprovalAction = ''
}) => {
  if (!selectedLeave) return null;

  console.log('das')
  return (
    <AnimatePresence>
      {isOpen && (
        <BaseModal isOpen={isOpen} onClose={onClose}>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-colors"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 transition-colors">
                  Leave Request Details
                </h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-500 transition-colors">Employee</label>
                    <p className="text-gray-900 dark:text-gray-100 transition-colors">
                      {selectedLeave.employee?.first_Name || ''} {selectedLeave.employee?.last_Name || ''}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
                      ID: {selectedLeave.employee?.employee_Id || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-500 transition-colors">Leave Type</label>
                    <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                      selectedLeave.leaveType?.color?.replace('500', '100') || 'bg-gray-100'
                    } ${selectedLeave.leaveType?.color?.replace('bg-', 'text-').replace('500', '800') || 'text-gray-800'}`}>
                      {selectedLeave.leaveType?.name || 'N/A'} {selectedLeave.is_Half_Day ? '(Half Day)' : '(Full Day)'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-500 transition-colors">From Date</label>
                    <p className="text-gray-900 dark:text-gray-100 transition-colors">
                      {selectedLeave.leave_From ? new Date(selectedLeave.leave_From).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-500 transition-colors">To Date</label>
                    <p className="text-gray-900 dark:text-gray-100 transition-colors">
                      {selectedLeave.leave_To ? new Date(selectedLeave.leave_To).toLocaleDateString() : "Same day"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-500 transition-colors">Duration</label>
                    <p className="text-gray-900 dark:text-gray-100 transition-colors">
                      {selectedLeave.no_Of_Days || 1} day{(selectedLeave.no_Of_Days || 1) !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-500 transition-colors">Payment Status</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      selectedLeave.is_Paid
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      {selectedLeave.is_Paid ? 'Paid' : 'Unpaid'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-500 transition-colors">Reason for Leave</label>
                  <p className="mt-1 text-gray-900 dark:text-gray-100 transition-colors">
                    {selectedLeave.reason_For_Leave || 'No reason provided'}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-500 transition-colors">Emergency Contact</label>
                  <p className="mt-1 text-gray-900 dark:text-gray-100 transition-colors">
                    {selectedLeave.emergencyContact || '-'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-500 transition-colors">Work Handover</label>
                  <p className="mt-1 text-gray-900 dark:text-gray-100 transition-colors">
                    {selectedLeave.workHandover || ''}
                  </p>
                </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-500 transition-colors">Status</label>
                    <StatusBadge status={selectedLeave.leave_Status} />
                  </div>
               
                </div>
                {selectedLeave.leave_document && selectedLeave.leave_document.length > 0 && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-500 transition-colors">Uploaded Document</label>
                              
                          {selectedLeave.leave_document.endsWith('.jpg') || selectedLeave.leave_document.endsWith('.jpeg') || selectedLeave.leave_document.endsWith('.png') ? (
                            <a href={selectedLeave.leave_document} target="_blank" rel="noopener noreferrer">
                              <img
                                src={selectedLeave.leave_document}
                                alt="Leave Document"
                                className="mt-2 w-40 h-40 object-cover rounded-md cursor-pointer"
                              />
                            </a>
                          ) : selectedLeave.leave_document.endsWith('.pdf') ? (
                    
                      <a
                        href={selectedLeave.leave_document}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 text-blue-600 dark:text-blue-400"
                      >
                        <FaFileAlt className="inline-block mr-2" />
                        Download PDF
                      </a>
                    ) : (
                     
                      <div className="mt-2">
                        <span className="text-gray-800 dark:text-gray-100">
                          {selectedLeave.leave_document.split('/').pop()} 
                        </span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {(selectedLeave.leave_document.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {selectedLeave.leave_Status === "pending" && (
                  <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 transition-colors">
                    <button
                      onClick={() => onApprovalAction(selectedLeave, "approve")}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <FaCheck />
                      Approve Leave
                    </button>
                    <button
                      onClick={() => onApprovalAction(selectedLeave, "reject")}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <FaTimes />
                      Reject Leave
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </BaseModal>
      )}
    </AnimatePresence>
  );
};

export default LeaveDetailsModal;