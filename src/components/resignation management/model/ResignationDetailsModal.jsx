

// import React from "react";
// import BaseModal from "../../common/BaseModal";

// export default function ResignationDetailsModal({ isOpen, onClose, data }) {
//   if (!isOpen) return null;
//   return (
//     <BaseModal isOpen={isOpen} onClose={onClose}>
//       <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl shadow-lg p-6">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition-colors"
//         >
//           ✕
//         </button>
//         <h2 className="text-xl font-semibold mb-4">Resignation Details</h2>
//         {data ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//             <div>
//               <p>
//                 <strong>Employee:</strong> {data.empNameAndId || "N/A"}
//               </p>
//               <p>
//                 <strong>Resignation Date:</strong> {data.resignationDate || "N/A"}
//               </p>
//               <p>
//                 <strong>Last Working Day:</strong> {data.lastWorkingDay || "N/A"}
//               </p>
//               <p>
//                 <strong>Reason:</strong> {data.reason || "N/A"}
//               </p>
//             </div>
//             <div>
//               <p>
//                 <strong>Department:</strong> {data.department || "N/A"}
//               </p>
//               <p>
//                 <strong>Designation:</strong> {data.designation || "N/A"}
//               </p>
//               <p>
//                 <strong>Status:</strong> {data.status || "N/A"}
//               </p>
//               <p>
//                 <strong>Submitted At:</strong> {data.submittedAt || "N/A"}
//               </p>
//             </div>
//           </div>
//         ) : (
//           <p>No details available</p>
//         )}
//       </div>
//     </BaseModal>
//   );
// }


import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiUser,
  FiCalendar,
  FiHome,
  FiBriefcase,
  FiMessageSquare,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
} from "react-icons/fi";
import BaseModal from "../../common/BaseModal";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 20,
    transition: { 
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export default function ResignationDetailsModal({ isOpen, onClose, data }) {
  if (!isOpen) return null;

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <FiClock className="w-5 h-5 text-amber-500" />;
      case "Approved":
        return <FiCheckCircle className="w-5 h-5 text-green-500" />;
      case "Rejected":
        return <FiXCircle className="w-5 h-5 text-red-500" />;
      default:
        return <FiAlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800";
      case "Approved":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
    }
  };

  const DetailItem = ({ icon: Icon, label, value, className = "" }) => (
    <motion.div
      variants={itemVariants}
      className={`flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 ${className}`}
    >
      <div className="flex-shrink-0 mt-0.5">
        <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
          {label}
        </p>
        <p className="text-base text-gray-900 dark:text-white break-words">
          {value || "N/A"}
        </p>
      </div>
    </motion.div>
  );

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-4xl h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-auto border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Resignation Details
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Complete information about the resignation request
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {data ? (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                  className="space-y-6"
                >
                  {/* Employee Info Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <FiUser className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                      Employee Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <DetailItem
                        icon={FiUser}
                        label="Employee Name & ID"
                        value={data.empNameAndId}
                      />
                      <DetailItem
                        icon={FiHome}
                        label="Department"
                        value={data.department}
                      />
                      <DetailItem
                        icon={FiBriefcase}
                        label="Designation"
                        value={data.designation}
                        className="md:col-span-2"
                      />
                    </div>
                  </div>

                  {/* Resignation Info Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <FiCalendar className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                      Resignation Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <DetailItem
                        icon={FiCalendar}
                        label="Resignation Date"
                        value={data.resignationDate}
                      />
                      <DetailItem
                        icon={FiCalendar}
                        label="Last Working Day"
                        value={data.lastWorkingDay}
                      />
                      <motion.div
                        variants={itemVariants}
                        className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {getStatusIcon(data.status)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                            Current Status
                          </p>
                          <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium border ${getStatusStyles(data.status)}`}>
                            {getStatusIcon(data.status)}
                            <span>{data.status || "N/A"}</span>
                          </div>
                        </div>
                      </motion.div>
                      <DetailItem
                        icon={FiClock}
                        label="Submitted At"
                        value={data.submittedAt}
                      />
                    </div>
                  </div>

                  {/* Reason Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <FiMessageSquare className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                      Reason for Resignation
                    </h3>
                    <motion.div
                      variants={itemVariants}
                      className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex items-start space-x-3">
                        <FiMessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-base text-gray-900 dark:text-white leading-relaxed">
                            {data.reason || "No reason provided"}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiAlertCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No Details Available
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Unable to load resignation details at this time.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </BaseModal>
  );
}