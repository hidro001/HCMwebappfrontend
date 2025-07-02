


// import React from 'react';
// import BaseModal from '../../common/BaseModal';

// export default function LeaveDetailsModal({ leave, onClose }) {
//   if (!leave) return null;
//   return (
//     <BaseModal isOpen={!!leave} onClose={onClose}>
//       <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-11/12 md:w-1/2 relative">
//         <h3 className="text-xl font-bold mb-4">Leave Details</h3>
//         <p><strong>Leave Type:</strong> {leave.leave_Type}</p>
//         <p>
//           <strong>From:</strong> {new Date(leave.leave_From).toLocaleDateString()}
//         </p>
//         <p>
//           <strong>To:</strong> {new Date(leave.leave_To).toLocaleDateString()}
//         </p>
//         <p><strong>Days:</strong> {leave.no_Of_Days}</p>
//         <p><strong>Reason for Leave:</strong> {leave.reason_For_Leave}</p>
//         <p>
//           <strong>Status:</strong> {leave.leave_Status.charAt(0).toUpperCase() + leave.leave_Status.slice(1)}
//         </p>
//         <div className="mt-4 text-right">
//           <button onClick={onClose} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
//             Close
//           </button>
//         </div>
//       </div>
//     </BaseModal>
//   );
// }



import React from 'react';
import { motion } from 'framer-motion';
import {
  FaTimes,
  FaCalendarAlt,
  FaCalendarCheck,
  FaClock,
  FaUser,
  FaPhone,
  FaBriefcase,
  FaFileAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaUserCheck,
  FaClipboardList
} from 'react-icons/fa';
import BaseModal from '../../common/BaseModal';

export default function LeaveDetailsModal({ leave, onClose }) {
  if (!leave) return null;

  // Status configuration
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return {
          bg: 'bg-green-50 dark:bg-green-900/20',
          text: 'text-green-800 dark:text-green-300',
          border: 'border-green-200 dark:border-green-700',
          icon: FaCheckCircle,
          iconColor: 'text-green-600 dark:text-green-400'
        };
      case 'pending':
        return {
          bg: 'bg-yellow-50 dark:bg-yellow-900/20',
          text: 'text-yellow-800 dark:text-yellow-300',
          border: 'border-yellow-200 dark:border-yellow-700',
          icon: FaHourglassHalf,
          iconColor: 'text-yellow-600 dark:text-yellow-400'
        };
      case 'rejected':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          text: 'text-red-800 dark:text-red-300',
          border: 'border-red-200 dark:border-red-700',
          icon: FaTimesCircle,
          iconColor: 'text-red-600 dark:text-red-400'
        };
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-700',
          text: 'text-gray-800 dark:text-gray-300',
          border: 'border-gray-200 dark:border-gray-600',
          icon: FaExclamationTriangle,
          iconColor: 'text-gray-600 dark:text-gray-400'
        };
    }
  };

  const statusConfig = getStatusConfig(leave.leave_Status);
  const StatusIcon = statusConfig.icon;

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  const InfoRow = ({ icon: Icon, label, value, iconColor = "text-gray-500" }) => {
    if (!value || value === "N/A") return null;
    
    return (
      <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <Icon className={`w-5 h-5 mt-0.5 ${iconColor}`} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 break-words">{value}</p>
        </div>
      </div>
    );
  };

  return (
    <BaseModal isOpen={!!leave} onClose={onClose}>
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="relative p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Leave Details
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Complete information about this leave request
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
            >
              <FaTimes className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Status Badge */}
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full mt-4 ${statusConfig.bg} ${statusConfig.border} border`}>
            <StatusIcon className={`w-4 h-4 ${statusConfig.iconColor}`} />
            <span className={`text-sm font-semibold ${statusConfig.text}`}>
              {leave.leave_Status?.charAt(0).toUpperCase() + leave.leave_Status?.slice(1)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <FaCalendarAlt className="w-5 h-5 text-blue-600" />
                <span>Basic Information</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoRow 
                  icon={FaFileAlt}
                  label="Leave Type"
                  value={leave.leaveType?.name || leave.leave_Type}
                  iconColor="text-blue-600"
                />
                <InfoRow 
                  icon={FaClock}
                  label="Duration"
                  value={`${leave.no_Of_Days} day(s)`}
                  iconColor="text-purple-600"
                />
                <InfoRow 
                  icon={FaCalendarAlt}
                  label="From Date"
                  value={new Date(leave.leave_From).toLocaleDateString()}
                  iconColor="text-green-600"
                />
                <InfoRow 
                  icon={FaCalendarCheck}
                  label="To Date"
                  value={new Date(leave.leave_To).toLocaleDateString()}
                  iconColor="text-green-600"
                />
                <InfoRow 
                  icon={FaClock}
                  label="Half Day"
                  value={leave.is_Half_Day ? "Yes" : "No"}
                  iconColor="text-orange-600"
                />
                <InfoRow 
                  icon={FaFileAlt}
                  label="Leave Category"
                  value={leave.is_Paid === null ? "Pending" : leave.is_Paid ? "Paid" : "Unpaid"}
                  iconColor={leave.is_Paid === null ? "text-yellow-600" : leave.is_Paid ? "text-green-600" : "text-red-600"}
                />
              </div>
            </div>

            {/* Reason for Leave */}
            {leave.reason_For_Leave && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <FaClipboardList className="w-5 h-5 text-indigo-600" />
                  <span>Reason for Leave</span>
                </h3>
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-700">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {leave.reason_For_Leave}
                  </p>
                </div>
              </div>
            )}

            {/* Emergency Contact & Work Handover */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <FaBriefcase className="w-5 h-5 text-cyan-600" />
                <span>Additional Information</span>
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <InfoRow 
                  icon={FaPhone}
                  label="Emergency Contact"
                  value={leave.emergencyContact}
                  iconColor="text-red-600"
                />
                {leave.workHandover && (
                  <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border border-cyan-200 dark:border-cyan-700">
                    <div className="flex items-start space-x-3">
                      <FaBriefcase className="w-5 h-5 mt-0.5 text-cyan-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Work Handover</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {leave.workHandover}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Processing Information */}
            {(leave.approved_By || leave.rejected_By) && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <FaUserCheck className="w-5 h-5 text-teal-600" />
                  <span>Processing Information</span>
                </h3>
                <div className="space-y-4">
                  <InfoRow 
                    icon={FaUser}
                    label="Processed By"
                    value={
                      leave.leave_Status === "approved" && leave.approved_By
                        ? `${leave.approved_By.first_Name} ${leave.approved_By.last_Name}`
                        : leave.leave_Status === "rejected" && leave.rejected_By
                        ? `${leave.rejected_By.first_Name} ${leave.rejected_By.last_Name}`
                        : "Pending"
                    }
                    iconColor="text-teal-600"
                  />
                </div>
              </div>
            )}

            {/* Rejection Reason */}
            {leave.reason_For_Reject && (
              <div>
                <h3 className="text-lg font-semibold text-red-900 dark:text-red-300 mb-4 flex items-center space-x-2">
                  <FaExclamationTriangle className="w-5 h-5 text-red-600" />
                  <span>Rejection Reason</span>
                </h3>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700">
                  <p className="text-red-700 dark:text-red-300 leading-relaxed">
                    {leave.reason_For_Reject}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Close
            </motion.button>
          </div>
        </div>
      </motion.div>
    </BaseModal>
  );
}