// import React from "react";
// import { motion } from "framer-motion";
// import BaseModal from "../../common/BaseModal";

// export default function ViewVacancyModal({ vacancy, onClose }) {
//   if (!vacancy) return null;

//   return (
//     <BaseModal isOpen={Boolean(vacancy)} onClose={onClose}>
//       <motion.div
//         className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-lg w-full max-w-lg p-4 relative"
//         initial={{ scale: 0.95 }}
//         animate={{ scale: 1 }}
//         exit={{ scale: 0.95 }}
//       >
//         <button
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200"
//           onClick={onClose}
//         >
//           &times;
//         </button>
//         <h2 className="text-lg font-semibold mb-4">
//           Vacancy: {vacancy.jobTitle}
//         </h2>
//         <div className="flex gap-4 text-sm">
//           <div className="flex-1 space-y-2">
//             <div>
//               <strong>Job Title:</strong> {vacancy.jobTitle}
//             </div>
//             <div>
//               <strong>Department:</strong> {vacancy.jobDepartment}
//             </div>
//             <div>
//               <strong>Status:</strong>{" "}
//               <span
//                 className={
//                   vacancy.vacancyStatus === "Open"
//                     ? "text-green-500"
//                     : vacancy.vacancyStatus === "Closed"
//                     ? "text-red-500"
//                     : "text-gray-500"
//                 }
//               >
//                 {vacancy.vacancyStatus}
//               </span>
//             </div>
//             <div>
//               <strong>Salary:</strong> {vacancy.salary} ({vacancy.currency})
//             </div>
//             <div>
//               <strong>Created At:</strong>{" "}
//               {new Date(vacancy.createdAt).toLocaleDateString()}
//             </div>
//             <div>
//               <strong>Description:</strong>{" "}
//               {vacancy.jobDescription || "No description"}
//             </div>
//           </div>
//           <div className="flex-1 flex items-center justify-center">
//             <svg
//               width="80"
//               height="80"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1"
//               viewBox="0 0 24 24"
//               className="text-green-200"
//             >
//               <circle cx="8" cy="12" r="3"></circle>
//               <circle cx="16" cy="12" r="3"></circle>
//               <line x1="10.5" y1="12" x2="13.5" y2="12"></line>
//             </svg>
//           </div>
//         </div>
//         <div className="mt-4 text-right">
//           <button
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             onClick={onClose}
//           >
//             OK
//           </button>
//         </div>
//       </motion.div>
//     </BaseModal>
//   );
// }



import React from "react";
import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaBuilding,
  FaDollarSign,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaTimes,
  FaCheckCircle,
  FaClock,
  FaFileAlt,
  FaEdit,
  FaEye,
  FaUser,
  FaGraduationCap,
  FaTasks
} from "react-icons/fa";
import {
  HiBriefcase,
  HiOfficeBuilding,
  HiCurrencyDollar,
  HiCalendar,
  HiLocationMarker,
  HiUsers,
  HiX,
  HiDocument,
  HiUser,
  HiAcademicCap,
  HiClipboardList
} from "react-icons/hi";
import BaseModal from "../../common/BaseModal";

export default function ViewVacancyModal({ vacancy, onClose }) {
  if (!vacancy) return null;

  const getStatusConfig = (status) => {
    switch (status) {
      case "Open":
        return {
          color: "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800",
          icon: FaCheckCircle,
          iconColor: "text-green-600 dark:text-green-400"
        };
      case "Closed":
        return {
          color: "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800",
          icon: FaTimes,
          iconColor: "text-red-600 dark:text-red-400"
        };
      case "Draft":
        return {
          color: "bg-gray-100 dark:bg-gray-700/50 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600",
          icon: FaFileAlt,
          iconColor: "text-gray-600 dark:text-gray-400"
        };
      default:
        return {
          color: "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800",
          icon: FaClock,
          iconColor: "text-blue-600 dark:text-blue-400"
        };
    }
  };

  const formatSalary = (salary, currency = 'USD') => {
    if (!salary || salary === 0) return "Not specified";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(salary);
  };

  const statusConfig = getStatusConfig(vacancy.vacancyStatus);

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

  const jobDetails = [
    {
      icon: HiOfficeBuilding,
      label: "Department",
      value: vacancy.jobDepartment,
      color: "blue"
    },
    {
      icon: HiLocationMarker,
      label: "Location",
      value: vacancy.jobLocations || "Not specified",
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
      label: "Posted Date",
      value: new Date(vacancy.createdAt).toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      color: "purple"
    },
    {
      icon: HiBriefcase,
      label: "Employment Type",
      value: vacancy.employmentType ? vacancy.employmentType.join(", ") : "Not specified",
      color: "indigo"
    },
    {
      icon: HiAcademicCap,
      label: "Experience Required",
      value: vacancy.workExperience || "Not specified",
      color: "pink"
    }
  ];

  const additionalInfo = [
    {
      icon: HiDocument,
      label: "Education",
      value: vacancy.education || "Not specified"
    },
    {
      icon: HiUsers,
      label: "Suitable For",
      value: vacancy.suitableFor ? vacancy.suitableFor.join(", ") : "Not specified"
    },
    {
      icon: HiCalendar,
      label: "Opening Date",
      value: vacancy.openingDate ? new Date(vacancy.openingDate).toLocaleDateString() : "Not specified"
    },
    {
      icon: HiCalendar,
      label: "Closing Date",
      value: vacancy.closingDate ? new Date(vacancy.closingDate).toLocaleDateString() : "Not specified"
    }
  ];

  return (
    <BaseModal isOpen={Boolean(vacancy)} onClose={onClose}>
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
              <HiBriefcase className="text-blue-600 dark:text-blue-400 text-2xl" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {vacancy.jobTitle}
              </h2>
              <div className="flex items-center space-x-3">
                <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${statusConfig.color}`}>
                  <statusConfig.icon className={`text-sm ${statusConfig.iconColor}`} />
                  <span>{vacancy.vacancyStatus}</span>
                </span>
                <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                  <HiOfficeBuilding className="text-sm" />
                  <span className="text-sm">{vacancy.jobDepartment}</span>
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
          <div className="space-y-8">
            {/* Job Details Grid */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <HiDocument className="text-blue-500" />
                <span>Job Details</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    {vacancy.jobDescription || "No description provided for this position."}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Additional Information */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <HiClipboardList className="text-blue-500" />
                <span>Additional Information</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {additionalInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-200 dark:border-blue-800"
                  >
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <info.icon className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-blue-700 dark:text-blue-300 uppercase tracking-wide">
                        {info.label}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {info.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Responsibilities & Duties */}
            {(vacancy.responsibilities || vacancy.duties) && (
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <FaTasks className="text-blue-500" />
                  <span>Responsibilities & Duties</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {vacancy.responsibilities && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                        <HiClipboardList className="text-green-500" />
                        <span>Key Responsibilities</span>
                      </h4>
                      <div className="bg-green-50 dark:bg-green-900/10 rounded-xl p-4 border border-green-200 dark:border-green-800">
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-sm">
                          {vacancy.responsibilities}
                        </p>
                      </div>
                    </div>
                  )}
                  {vacancy.duties && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                        <FaTasks className="text-purple-500" />
                        <span>Daily Duties</span>
                      </h4>
                      <div className="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-sm">
                          {vacancy.duties}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Contact Information */}
            {(vacancy.contactPerson || vacancy.contactPhone) && (
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <HiUser className="text-blue-500" />
                  <span>Contact Information</span>
                </h3>
                <div className="bg-orange-50 dark:bg-orange-900/10 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {vacancy.contactPerson && (
                      <div>
                        <h4 className="font-medium text-orange-700 dark:text-orange-300 mb-1">Contact Person</h4>
                        <p className="text-gray-900 dark:text-white">{vacancy.contactPerson}</p>
                      </div>
                    )}
                    {vacancy.contactPhone && (
                      <div>
                        <h4 className="font-medium text-orange-700 dark:text-orange-300 mb-1">Phone Number</h4>
                        <p className="text-gray-900 dark:text-white">{vacancy.contactPhone}</p>
                      </div>
                    )}
                    {vacancy.additionalContact && (
                      <div className="md:col-span-2">
                        <h4 className="font-medium text-orange-700 dark:text-orange-300 mb-1">Additional Contact</h4>
                        <p className="text-gray-900 dark:text-white">{vacancy.additionalContact}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Posted By Information */}
            {vacancy.createdBy && (
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <HiUser className="text-blue-500" />
                  <span>Posted By</span>
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gray-200 dark:bg-gray-600 rounded-full">
                      <HiUser className="text-gray-600 dark:text-gray-300 text-xl" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {vacancy.createdBy.first_Name} {vacancy.createdBy.last_Name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Employee ID: {vacancy.createdBy.employee_Id}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-700/50 p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <HiCalendar />
              <span>Posted on {new Date(vacancy.createdAt).toLocaleDateString("en-US", {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 font-medium"
            >
              Close
            </motion.button>
          </div>
        </div>
      </motion.div>
    </BaseModal>
  );
}