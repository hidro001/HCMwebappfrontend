// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { FaTimes } from "react-icons/fa";
// import BaseModal from "../../common/BaseModal";

// export default function UpdateStatusModal({ referral, onClose, onSubmit }) {
//   const [status, setStatus] = useState(referral.status || "Pending");
//   const [feedback, setFeedback] = useState("");

//   const handleUpdate = () => {
//     onSubmit(status, feedback);
//   };

//   if (!referral) return null;

//   return (
//     <BaseModal isOpen={Boolean(referral)} onClose={onClose}>
//       <motion.div
//         className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-lg w-full max-w-md p-4 relative"
//         initial={{ scale: 0.95 }}
//         animate={{ scale: 1 }}
//         exit={{ scale: 0.95 }}
//       >
//         <button
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//           onClick={onClose}
//         >
//           <FaTimes />
//         </button>
//         <h2 className="text-lg font-semibold mb-3">
//           Update Status for {referral.candidateName}
//         </h2>
//         <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
//           Please select the new status and provide any necessary feedback.
//         </p>
//         <div className="mb-4">
//           <label className="block text-sm mb-1">Status</label>
//           <select
//             className="w-full border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//           >
//             <option value="Pending">Pending</option>
//             <option value="In Review">In Review</option>
//             <option value="Interview">Interview</option>
//             <option value="Accepted">Accepted</option>
//             <option value="Rejected">Rejected</option>
//             <option value="Onboard">Onboard</option>
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm mb-1">Feedback</label>
//           <textarea
//             rows={3}
//             className="w-full border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
//             placeholder="Provide feedback or note"
//             value={feedback}
//             onChange={(e) => setFeedback(e.target.value)}
//           />
//         </div>
//         <div className="flex justify-end gap-2">
//           <button
//             className="px-4 py-2 border border-gray-300 dark:border-gray-500 rounded text-sm text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//           <button
//             className="px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
//             onClick={handleUpdate}
//           >
//             Update
//           </button>
//         </div>
//       </motion.div>
//     </BaseModal>
//   );
// }


import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaUser,
  FaCheckCircle,
  FaClock,
  FaEye,
  FaHandshake,
  FaTimesCircle,
  FaUserCheck,
  FaExclamationTriangle,
  FaSave,
  FaEdit
} from "react-icons/fa";
import {
  HiX,
  HiUser,
  HiCheck,
  HiClock,
  HiEye,
  HiUserAdd,
  HiXCircle,
  HiSave,
  HiPencil
} from "react-icons/hi";
import BaseModal from "../../common/BaseModal";

export default function UpdateStatusModal({ referral, onClose, onSubmit }) {
  const [status, setStatus] = useState(referral?.status || "Pending");
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async () => {
    if (!status) return;
    
    setIsLoading(true);
    try {
      await onSubmit(status, feedback);
    } finally {
      setIsLoading(false);
    }
  };

  const statusOptions = [
    {
      value: "Pending",
      label: "Pending Review",
      icon: HiClock,
      color: "orange",
      description: "Waiting for initial review"
    },
    {
      value: "In Review",
      label: "In Review",
      icon: HiEye,
      color: "blue",
      description: "Currently being evaluated"
    },
    {
      value: "Interview",
      label: "Interview Scheduled",
      icon: HiUser,
      color: "purple",
      description: "Candidate scheduled for interview"
    },
    {
      value: "Accepted",
      label: "Accepted",
      icon: HiCheck,
      color: "green",
      description: "Offer accepted by candidate"
    },
    {
      value: "Rejected",
      label: "Rejected",
      icon: HiXCircle,
      color: "red",
      description: "Application not successful"
    },
    {
      value: "Onboard",
      label: "Onboarded",
      icon: HiUserAdd,
      color: "emerald",
      description: "Successfully joined the company"
    }
  ];

  const currentStatusOption = statusOptions.find(option => option.value === status);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      transition: { duration: 0.2 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
   const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  if (!referral) return null;

  return (
    <BaseModal isOpen={Boolean(referral)} onClose={onClose}>

        <AnimatePresence>
              
                <motion.div
                  variants={overlayVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full flex items-center justify-center p-4 "
                  onClick={onClose}
                >

      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-2xl shadow-2xl relative max-h-[90vh]  overflow-y-scroll"
      >
        {/* Header */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 border-b border-gray-200 dark:border-gray-700">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
          >
            <HiX className="h-5 w-5" />
          </motion.button>
          
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <HiPencil className="text-blue-600 dark:text-blue-400 text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Update Referral Status
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Update status for <span className="font-medium text-blue-600 dark:text-blue-400">{referral.candidateName}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="p-6 space-y-6"
        >
          {/* Candidate Info Summary */}
          <motion.div
            variants={itemVariants}
            className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-gray-100 dark:bg-gray-600 rounded-lg">
                <HiUser className="text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Candidate Information
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Position:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">
                  {referral.designation}
                </span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Department:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">
                  {referral.department}
                </span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Email:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">
                  {referral.candidateEmail}
                </span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Current Status:</span>
                <span className={`ml-2 px-2 py-1 text-xs rounded-full font-medium ${
                  currentStatusOption ? `bg-${currentStatusOption.color}-100 dark:bg-${currentStatusOption.color}-900/20 text-${currentStatusOption.color}-800 dark:text-${currentStatusOption.color}-300` : ''
                }`}>
                  {referral.status}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Status Selection */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center space-x-2">
              <HiPencil className="text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Select New Status
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {statusOptions.map((option) => (
                <motion.label
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    status === option.value
                      ? `border-${option.color}-500 bg-${option.color}-50 dark:bg-${option.color}-900/20`
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-700/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value={option.value}
                    checked={status === option.value}
                    onChange={(e) => setStatus(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`p-2 rounded-lg ${
                    status === option.value 
                      ? `bg-${option.color}-100 dark:bg-${option.color}-800` 
                      : 'bg-gray-100 dark:bg-gray-600'
                  }`}>
                    <option.icon className={`text-lg ${
                      status === option.value 
                        ? `text-${option.color}-600 dark:text-${option.color}-400` 
                        : 'text-gray-600 dark:text-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${
                      status === option.value 
                        ? `text-${option.color}-900 dark:text-${option.color}-100` 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {option.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {option.description}
                    </div>
                  </div>
                  {status === option.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`p-1 bg-${option.color}-500 rounded-full`}
                    >
                      <HiCheck className="text-white text-sm" />
                    </motion.div>
                  )}
                </motion.label>
              ))}
            </div>
          </motion.div>

          {/* Feedback Section */}
          <motion.div variants={itemVariants} className="space-y-3">
            <div className="flex items-center space-x-2">
              <FaEdit className="text-blue-500" />
              <label className="text-lg font-semibold text-gray-900 dark:text-white">
                Feedback & Notes
              </label>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Provide additional context or feedback about this status update
            </p>
            <textarea
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Enter your feedback, notes, or next steps..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </motion.div>

          {/* Status Change Preview */}
          {status !== referral.status && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-4"
            >
              <div className="flex items-center space-x-2 mb-2">
                <FaExclamationTriangle className="text-blue-600 dark:text-blue-400" />
                <h4 className="font-medium text-blue-900 dark:text-blue-100">
                  Status Change Summary
                </h4>
              </div>
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <span className="font-medium">{referral.candidateName}</span> will be moved from{" "}
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 rounded font-medium">
                  {referral.status}
                </span>{" "}
                to{" "}
                <span className={`px-2 py-1 rounded font-medium ${
                  currentStatusOption ? `bg-${currentStatusOption.color}-100 dark:bg-${currentStatusOption.color}-800` : 'bg-gray-100'
                }`}>
                  {status}
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-700/50 p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Note:</span> This action will update the candidate's status and notify relevant stakeholders.
            </div>
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 font-medium"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUpdate}
                disabled={isLoading || !status}
                className="flex items-center space-x-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <HiSave />
                    <span>Update Status</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

 </motion.div>
                 
               </AnimatePresence>  


    </BaseModal>
  );
}