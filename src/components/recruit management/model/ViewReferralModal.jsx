// import React from "react";
// import { motion } from "framer-motion";
// import { FaTimes } from "react-icons/fa";
// import BaseModal from "../../common/BaseModal";

// export default function ViewReferralModal({ referral, onClose }) {
//   if (!referral) return null;

//   return (
//     <BaseModal isOpen={Boolean(referral)} onClose={onClose}>
//       <motion.div
//         className="bg-white dark:bg-gray-800 dark:text-gray-100
//                    rounded-lg shadow-lg w-full max-w-lg p-4 relative "
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
//         <h2 className="text-lg font-semibold mb-4">
//           Referral Of {referral.referredBy} For {referral.designation}
//         </h2>
//         <div className="flex gap-4">
//           <div className="flex-1 space-y-2 text-sm">
//             <div>
//               <strong>Job Designation:</strong> {referral.designation}
//             </div>
//             <div>
//               <strong>Department:</strong> {referral.department}
//             </div>
//             <div>
//               <strong>Referred By:</strong> {referral.referredBy}
//             </div>
//             <div>
//               <strong>Candidate Name:</strong> {referral.candidateName}
//             </div>
//             <div>
//               <strong>Candidate Email:</strong> {referral.candidateEmail}
//             </div>
//             <div>
//               <strong>Candidate Phone Number:</strong> {referral.candidatephone}
//             </div>

//             <div>
//               <strong>Candidate Location:</strong> {referral.candidateLocation}
//             </div>

//             <div>
//               <strong>Status:</strong> {referral.status}
//             </div>
//             <div>
//               <strong>Candidate Resume:</strong>{" "}
//               <span className="text-blue-600 cursor-pointer">
//                 <a
//                   href={referral.resume}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <button>View</button>
//                 </a>
//               </span>
//             </div>

//             <div>
//               <strong>Candidate Linkdin Profile:</strong>{" "}
//               <span className="text-blue-600 cursor-pointer">
//                 <a
//                   href={referral.candidatelinkedIn}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <button>View</button>
//                 </a>
//               </span>
//             </div>
//           </div>
//         </div>
//         <div className="mt-4 text-right">
//           <button
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             onClick={onClose}
//           >
//             Close
//           </button>
//         </div>
//       </motion.div>
//     </BaseModal>
//   );
// }



import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaLinkedin,
  FaCheckCircle,
  FaClock,
  FaUserPlus,
} from "react-icons/fa";
import {
  HiUser,
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiDocument,
  HiBriefcase,
  HiOfficeBuilding,
  HiX,
  HiExternalLink,
  HiCalendar,
  HiUserAdd
} from "react-icons/hi";
import BaseModal from "../../common/BaseModal";

export default function ViewReferralModal({ referral, onClose }) {
  if (!referral) return null;

  const getStatusConfig = (status) => {
    switch (status) {
      case "Onboard":
        return {
          color: "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800",
          icon: FaCheckCircle,
          iconColor: "text-green-600 dark:text-green-400"
        };
      case "In Review":
        return {
          color: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
          icon: FaClock,
          iconColor: "text-yellow-600 dark:text-yellow-400"
        };
      case "Rejected":
        return {
          color: "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800",
          icon: FaTimes,
          iconColor: "text-red-600 dark:text-red-400"
        };
      case "Pending":
        return {
          color: "bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-800",
          icon: FaClock,
          iconColor: "text-orange-600 dark:text-orange-400"
        };
      default:
        return {
          color: "bg-gray-100 dark:bg-gray-700/50 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600",
          icon: FaClock,
          iconColor: "text-gray-600 dark:text-gray-400"
        };
    }
  };

  const statusConfig = getStatusConfig(referral.status);

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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return "N/A";
    }
  };

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
        className="bg-white dark:bg-gray-800 w-full max-w-4xl rounded-2xl shadow-2xl relative max-h-[94vh] overflow-hidden"
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
          
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <HiUserAdd className="text-blue-600 dark:text-blue-400 text-2xl" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Referral Details
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <HiBriefcase className="text-gray-600 dark:text-gray-400 text-sm" />
                  <span className="text-gray-600 dark:text-gray-400">{referral.designation}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <HiOfficeBuilding className="text-gray-600 dark:text-gray-400 text-sm" />
                  <span className="text-gray-600 dark:text-gray-400">{referral.department}</span>
                </div>
                <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${statusConfig.color}`}>
                  <statusConfig.icon className={`text-sm ${statusConfig.iconColor}`} />
                  <span>{referral.status}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="p-6 overflow-y-auto max-h-[70vh]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Candidate Information */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <HiUser className="text-blue-500" />
                <span>Candidate Information</span>
              </h3>
              <div className="space-y-4">
                {/* Candidate Name */}
                <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <HiUser className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Full Name
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {referral.candidateName || "Not provided"}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                    <HiMail className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Email Address
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {referral.candidateEmail || "Not provided"}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <HiPhone className="text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Phone Number
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {referral.candidatephone || "Not provided"}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                  <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                    <HiLocationMarker className="text-red-600 dark:text-red-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Location
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {referral.candidateLocation || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Referral Information */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <FaUserPlus className="text-blue-500" />
                <span>Referral Information</span>
              </h3>
              <div className="space-y-4">
                {/* Referred By */}
                <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                    <HiUser className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Referred By
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {referral.referredBy || "Not provided"}
                    </p>
                  </div>
                </div>

                {/* Position */}
                <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <HiBriefcase className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Position
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {referral.designation || "Not provided"}
                    </p>
                  </div>
                </div>

                {/* Department */}
                <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                    <HiOfficeBuilding className="text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Department
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {referral.department || "Not provided"}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                  <div className={`p-2 rounded-lg ${statusConfig.color.includes('green') ? 'bg-green-100 dark:bg-green-900/20' : 
                    statusConfig.color.includes('yellow') ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                    statusConfig.color.includes('red') ? 'bg-red-100 dark:bg-red-900/20' :
                    statusConfig.color.includes('orange') ? 'bg-orange-100 dark:bg-orange-900/20' :
                    'bg-gray-100 dark:bg-gray-700'}`}>
                    <statusConfig.icon className={statusConfig.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Current Status
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {referral.status || "Pending"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Documents & Links Section */}
          <motion.div variants={itemVariants} className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <HiDocument className="text-blue-500" />
              <span>Documents & Links</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Resume */}
              {referral.resume && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-200 dark:border-blue-800"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <HiDocument className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Resume/CV
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Candidate's resume document
                      </p>
                    </div>
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={referral.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200"
                  >
                    <HiExternalLink className="text-sm" />
                    <span>View</span>
                  </motion.a>
                </motion.div>
              )}

              {/* LinkedIn */}
              {referral.candidatelinkedIn && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-200 dark:border-blue-800"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <FaLinkedin className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        LinkedIn Profile
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Professional profile
                      </p>
                    </div>
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={referral.candidatelinkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200"
                  >
                    <HiExternalLink className="text-sm" />
                    <span>View</span>
                  </motion.a>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Submission Details */}
          <motion.div variants={itemVariants} className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <HiCalendar className="text-blue-500" />
              <span>Submission Details</span>
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Submitted On
                  </p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {formatDate(referral.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Referral ID
                  </p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white font-mono">
                    {referral.id || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-700/50 p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <HiCalendar />
              <span>Last updated: {formatDate(referral.updatedAt || referral.createdAt)}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Close
            </motion.button>
          </div>
        </div>
      </motion.div>

  </motion.div>
                
               </AnimatePresence> 

    </BaseModal>
  );
}