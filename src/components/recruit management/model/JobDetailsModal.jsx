// import React from "react";
// import BaseModal from "../../common/BaseModal";

// export default function JobDetailsModal({ isOpen, onClose, vacancy }) {
//   if (!isOpen || !vacancy) return null;

//   return (
//     <BaseModal isOpen={isOpen} onClose={onClose}>
//       <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded shadow-lg p-6 relative">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//         >
//           ✕
//         </button>
//         <h2 className="text-xl font-semibold mb-3">{vacancy.title}</h2>
//         <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
//           <strong>Department:</strong> {vacancy.department} <br />
//           <strong>Location:</strong> {vacancy.location} <br />
//           <strong>Salary:</strong> ${vacancy.salary.toLocaleString()} <br />
//           <strong>Status:</strong> {vacancy.status} <br />
//           <strong>Publication:</strong> {vacancy.publication} <br />
//           <strong>Position Type:</strong> {vacancy.positionType} <br />
//           <strong>Experience:</strong> {vacancy.workExperience} <br />
//         </p>
//         <div className="mb-4">
//           <h3 className="font-medium text-lg mb-1">Job Description:</h3>
//           <p className="text-gray-700 dark:text-gray-200">{vacancy.description}</p>
//         </div>
//         <div className="flex justify-end">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 border rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </BaseModal>
//   );
// }


import React from "react";
import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaDollarSign,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaBuilding,
  FaTimes,
  FaCheckCircle,
  FaClipboardList,
  FaDraftingCompass,
  FaGraduationCap,
  FaFileAlt,
  FaExternalLinkAlt
} from "react-icons/fa";
import {
  HiBriefcase,
  HiLocationMarker,
  HiCurrencyDollar,
  HiCalendar,
  HiClock,
  HiOfficeBuilding,
  HiX,
  HiAcademicCap,
  HiDocument
} from "react-icons/hi";
import BaseModal from "../../common/BaseModal";

export default function JobDetailsModal({ isOpen, onClose, vacancy }) {
  if (!isOpen || !vacancy) return null;

  const getStatusConfig = (status) => {
    switch (status) {
      case "OPEN":
        return {
          color: "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800",
          icon: FaCheckCircle,
          iconColor: "text-green-600 dark:text-green-400"
        };
      case "COMPLETED":
        return {
          color: "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800",
          icon: FaClipboardList,
          iconColor: "text-blue-600 dark:text-blue-400"
        };
      case "DRAFT":
        return {
          color: "bg-gray-100 dark:bg-gray-700/50 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600",
          icon: FaDraftingCompass,
          iconColor: "text-gray-600 dark:text-gray-400"
        };
      default:
        return {
          color: "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800",
          icon: FaBriefcase,
          iconColor: "text-purple-600 dark:text-purple-400"
        };
    }
  };

  const formatSalary = (salary, currency = 'USD') => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(salary);
  };

  const statusConfig = getStatusConfig(vacancy.status);

  const jobDetails = [
    {
      icon: HiOfficeBuilding,
      label: "Department",
      value: vacancy.department,
      color: "blue"
    },
    {
      icon: HiLocationMarker,
      label: "Location",
      value: vacancy.location,
      color: "green"
    },
    {
      icon: HiCurrencyDollar,
      label: "Salary",
      value: formatSalary(vacancy.salary, vacancy.currency),
      color: "yellow"
    },
    {
      icon: HiCalendar,
      label: "Published",
      value: vacancy.publication,
      color: "purple"
    },
    {
      icon: HiBriefcase,
      label: "Position Type",
      value: vacancy.positionType,
      color: "indigo"
    },
    {
      icon: HiAcademicCap,
      label: "Experience Required",
      value: vacancy.workExperience,
      color: "pink"
    }
  ];

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

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-white dark:bg-gray-800 w-full max-w-3xl rounded-2xl shadow-2xl relative max-h-[92vh] overflow-hidden"
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
              <HiBriefcase className="text-blue-600 dark:text-blue-400 text-2xl" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {vacancy.title}
              </h2>
              <div className="flex items-center space-x-3">
                <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${statusConfig.color}`}>
                  <statusConfig.icon className={`text-sm ${statusConfig.iconColor}`} />
                  <span>{vacancy.status}</span>
                </span>
                <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                  <HiOfficeBuilding className="text-sm" />
                  <span className="text-sm">{vacancy.department}</span>
                </div>
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
          <div className="space-y-6">
            {/* Job Details Grid */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <HiDocument className="text-blue-500" />
                <span>Job Details</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobDetails.map((detail, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-200"
                  >
                    <div className={`p-2 bg-${detail.color}-100 dark:bg-${detail.color}-900/20 rounded-lg`}>
                      <detail.icon className={`text-${detail.color}-600 dark:text-${detail.color}-400`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        {detail.label}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {detail.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Job Description */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <FaFileAlt className="text-blue-500" />
                <span>Job Description</span>
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {vacancy.description || "No description provided for this position."}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Additional Information */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <FaGraduationCap className="text-blue-500" />
                <span>Requirements & Qualifications</span>
              </h3>
              <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Experience Level</h4>
                    <p className="text-gray-700 dark:text-gray-300">{vacancy.workExperience}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Employment Type</h4>
                    <p className="text-gray-700 dark:text-gray-300">{vacancy.positionType}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Department</h4>
                    <p className="text-gray-700 dark:text-gray-300">{vacancy.department}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Work Location</h4>
                    <p className="text-gray-700 dark:text-gray-300">{vacancy.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {formatSalary(vacancy.salary, vacancy.currency)}
                  </div>
                  <div className="text-xs text-green-700 dark:text-green-300 font-medium">
                    Annual Salary
                  </div>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {vacancy.positionType}
                  </div>
                  <div className="text-xs text-blue-700 dark:text-blue-300 font-medium">
                    Position Type
                  </div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {vacancy.department}
                  </div>
                  <div className="text-xs text-purple-700 dark:text-purple-300 font-medium">
                    Department
                  </div>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {vacancy.status}
                  </div>
                  <div className="text-xs text-orange-700 dark:text-orange-300 font-medium">
                    Current Status
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-700/50 p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <HiCalendar />
              <span>Published on {vacancy.publication}</span>
            </div>
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 font-medium"
              >
                Close
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 font-medium"
              >
                <FaExternalLinkAlt className="text-sm" />
                <span>View Full Details</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </BaseModal>
  );
}