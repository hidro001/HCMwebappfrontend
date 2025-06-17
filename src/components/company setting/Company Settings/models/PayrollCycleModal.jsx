// import React from "react";
// import BaseModal from "../../../common/BaseModal";

// export default function PayrollCycleModal({
//   isOpen,
//   editId,
//   cycleName,
//   processingDate,
//   onCycleNameChange,
//   onProcessingDateChange,
//   onClose,
//   onSave,
// }) {
//   if (!isOpen) return null;

//   return (
//     <BaseModal isOpen={isOpen} onClose={onClose}>
//       <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md max-w-sm w-full">
//         <h2 className="text-xl font-semibold mb-4">
//           {editId ? "Edit Payroll Cycle" : "Add Payroll Cycle"}
//         </h2>
//         <div className="mb-3">
//           <label className="block mb-1">Cycle Name</label>
//           <input
//             type="text"
//             value={cycleName}
//             onChange={onCycleNameChange}
//             className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1">Processing Date</label>
//           <input
//             type="text"
//             value={processingDate}
//             onChange={onProcessingDateChange}
//             className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
//             placeholder="e.g. 1st Date or numeric day"
//           />
//         </div>
//         <div className="flex justify-end space-x-2">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 dark:text-gray-200 hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onSave}
//             className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
//           >
//             {editId ? "Save" : "Add"}
//           </button>
//         </div>
//       </div>
//     </BaseModal>
//   );
// }



// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaTimes,
//   FaSave,
//   FaPlus,
//   FaCalendarAlt,
//   FaClock,
//   FaEdit,
//   FaCalendarDay,
//   FaInfoCircle,
//   FaExclamationTriangle,
//   FaSync,
//   FaRegCalendarCheck,
//   FaBusinessTime
// } from "react-icons/fa";
// import {
//   HiCash,
//   HiX,
//   HiCheck,
//   HiPlus,
//   HiCalendar,
//   HiClock,
//   HiRefresh
// } from "react-icons/hi";
// import BaseModal from "../../../common/BaseModal";

// export default function PayrollCycleModal({
//   isOpen,
//   editId,
//   cycleName,
//   processingDate,
//   onCycleNameChange,
//   onProcessingDateChange,
//   onClose,
//   onSave,
// }) {
//   if (!isOpen) return null;

//   const getCycleFrequency = (name) => {
//     if (!name) return { icon: HiCash, color: 'gray', frequency: 'Custom Cycle' };
    
//     const lowercaseName = name.toLowerCase();
//     if (lowercaseName.includes('weekly')) return { icon: FaClock, color: 'blue', frequency: 'Weekly Cycle' };
//     if (lowercaseName.includes('biweekly') || lowercaseName.includes('bi-weekly')) return { icon: HiClock, color: 'green', frequency: 'Bi-weekly Cycle' };
//     if (lowercaseName.includes('monthly')) return { icon: FaCalendarAlt, color: 'purple', frequency: 'Monthly Cycle' };
//     if (lowercaseName.includes('quarterly')) return { icon: FaBusinessTime, color: 'orange', frequency: 'Quarterly Cycle' };
//     if (lowercaseName.includes('annual') || lowercaseName.includes('yearly')) return { icon: HiRefresh, color: 'red', frequency: 'Annual Cycle' };
//     return { icon: HiCash, color: 'indigo', frequency: 'Custom Cycle' };
//   };

//   const getNextProcessingDate = () => {
//     if (!processingDate) return null;
//     try {
//       const today = new Date();
//       const currentMonth = today.getMonth();
//       const currentYear = today.getFullYear();
      
//       // Try to parse as day number
//       const dayNumber = parseInt(processingDate);
//       if (!isNaN(dayNumber) && dayNumber >= 1 && dayNumber <= 31) {
//         let nextDate = new Date(currentYear, currentMonth, dayNumber);
//         if (nextDate < today) {
//           nextDate = new Date(currentYear, currentMonth + 1, dayNumber);
//         }
//         return nextDate.toLocaleDateString('en-US', {
//           month: 'long',
//           day: 'numeric',
//           year: 'numeric'
//         });
//       }
      
//       // Try to parse as full date
//       const date = new Date(processingDate);
//       if (!isNaN(date)) {
//         return date.toLocaleDateString('en-US', {
//           month: 'long',
//           day: 'numeric',
//           year: 'numeric'
//         });
//       }
//     } catch {
//       // Ignore parsing errors
//     }
//     return null;
//   };

//   const getValidationMessage = () => {
//     if (!cycleName && !processingDate) return null;
//     if (!cycleName) return "Cycle name is required";
//     if (!processingDate) return "Processing date is required";
    
//     // Check if processing date is valid
//     const dayNumber = parseInt(processingDate);
//     if (!isNaN(dayNumber)) {
//       if (dayNumber < 1 || dayNumber > 31) {
//         return "Day number must be between 1 and 31";
//       }
//     } else {
//       // Try to parse as date
//       try {
//         const date = new Date(processingDate);
//         if (isNaN(date)) {
//           return "Please enter a valid date or day number (1-31)";
//         }
//       } catch {
//         return "Please enter a valid date or day number (1-31)";
//       }
//     }
    
//     return null;
//   };

//   const isFormValid = () => {
//     if (!cycleName || !processingDate) return false;
    
//     const dayNumber = parseInt(processingDate);
//     if (!isNaN(dayNumber)) {
//       return dayNumber >= 1 && dayNumber <= 31;
//     }
    
//     try {
//       const date = new Date(processingDate);
//       return !isNaN(date);
//     } catch {
//       return false;
//     }
//   };

//   const category = getCycleFrequency(cycleName);
//   const validationMessage = getValidationMessage();
//   const nextProcessing = getNextProcessingDate();

//   const modalVariants = {
//     hidden: {
//       opacity: 0,
//       scale: 0.8,
//       y: 50
//     },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       y: 0,
//       transition: {
//         type: "spring",
//         stiffness: 300,
//         damping: 30
//       }
//     },
//     exit: {
//       opacity: 0,
//       scale: 0.8,
//       y: 50,
//       transition: {
//         duration: 0.2
//       }
//     }
//   };

//   const overlayVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1 },
//     exit: { opacity: 0 }
//   };

//   const commonCycles = [
//     { name: "Monthly Payroll", date: "1" },
//     { name: "Bi-weekly Payroll", date: "15" },
//     { name: "Weekly Payroll", date: "5" },
//     { name: "Quarterly Bonus", date: "30" }
//   ];

//   return (
//     <BaseModal isOpen={isOpen} onClose={onClose}>
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             variants={overlayVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
//             onClick={onClose}
//           >
//             <motion.div
//               variants={modalVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               onClick={(e) => e.stopPropagation()}
//               className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md overflow-hidden"
//             >
//               {/* Modal Header */}
//               <div className="bg-yellow-50 dark:bg-yellow-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
//                       {editId ? (
//                         <FaEdit className="text-yellow-600 dark:text-yellow-400 text-xl" />
//                       ) : (
//                         <HiPlus className="text-yellow-600 dark:text-yellow-400 text-xl" />
//                       )}
//                     </div>
//                     <div>
//                       <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//                         {editId ? "Edit Payroll Cycle" : "Create Payroll Cycle"}
//                       </h2>
//                       <p className="text-sm text-gray-600 dark:text-gray-400">
//                         {editId ? "Update payroll cycle details" : "Set up a new payroll processing schedule"}
//                       </p>
//                     </div>
//                   </div>
//                   <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={onClose}
//                     className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
//                   >
//                     <HiX className="text-gray-500 dark:text-gray-400 text-xl" />
//                   </motion.button>
//                 </div>
//               </div>

//               {/* Modal Content */}
//               <div className="p-6 space-y-6">
//                 {/* Quick Templates */}
//                 {!editId && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.1 }}
//                     className="space-y-2"
//                   >
//                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                       Quick Templates
//                     </label>
//                     <div className="grid grid-cols-2 gap-2">
//                       {commonCycles.map((template, index) => (
//                         <motion.button
//                           key={index}
//                           whileHover={{ scale: 1.02 }}
//                           whileTap={{ scale: 0.98 }}
//                           onClick={() => {
//                             onCycleNameChange({ target: { value: template.name } });
//                             onProcessingDateChange({ target: { value: template.date } });
//                           }}
//                           className="p-2 text-xs border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
//                         >
//                           {template.name}
//                         </motion.button>
//                       ))}
//                     </div>
//                   </motion.div>
//                 )}

//                 {/* Cycle Name */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.2 }}
//                   className="space-y-2"
//                 >
//                   <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
//                     <div className={`p-1.5 bg-${category.color}-100 dark:bg-${category.color}-900/20 rounded-md`}>
//                       <category.icon className={`text-${category.color}-600 dark:text-${category.color}-400 text-sm`} />
//                     </div>
//                     <span>Cycle Name</span>
//                     <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={cycleName}
//                     onChange={onCycleNameChange}
//                     placeholder="e.g., Monthly Payroll, Bi-weekly Salary"
//                     className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
//                   />
//                   {cycleName && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className={`bg-${category.color}-50 dark:bg-${category.color}-900/10 p-3 rounded-lg border border-${category.color}-200 dark:border-${category.color}-800`}
//                     >
//                       <p className={`text-sm text-${category.color}-700 dark:text-${category.color}-300`}>
//                         <category.icon className="inline mr-2" />
//                         Detected as: {category.frequency}
//                       </p>
//                     </motion.div>
//                   )}
//                 </motion.div>

//                 {/* Processing Date */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 }}
//                   className="space-y-2"
//                 >
//                   <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
//                     <div className="p-1.5 bg-blue-100 dark:bg-blue-900/20 rounded-md">
//                       <HiCalendar className="text-blue-600 dark:text-blue-400 text-sm" />
//                     </div>
//                     <span>Processing Date</span>
//                     <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={processingDate}
//                     onChange={onProcessingDateChange}
//                     placeholder="Enter day number (1-31) or full date"
//                     className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                   />
//                   <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
//                     <div className="flex items-start space-x-2">
//                       <FaInfoCircle className="text-blue-500 text-sm mt-0.5 flex-shrink-0" />
//                       <div className="text-xs text-blue-700 dark:text-blue-300">
//                         <p className="mb-1">Examples:</p>
//                         <ul className="space-y-1 ml-2">
//                           <li>• "1" for 1st of every month</li>
//                           <li>• "15" for 15th of every month</li>
//                           <li>• "2024-12-25" for specific date</li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>

//                 {/* Next Processing Preview */}
//                 {nextProcessing && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.4 }}
//                     className="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800"
//                   >
//                     <div className="flex items-center space-x-3">
//                       <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
//                         <FaRegCalendarCheck className="text-green-600 dark:text-green-400" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                           Next Processing Date
//                         </p>
//                         <p className="text-lg font-semibold text-green-600 dark:text-green-400">
//                           {nextProcessing}
//                         </p>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}

//                 {/* Validation Message */}
//                 {validationMessage && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.5 }}
//                     className="bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800"
//                   >
//                     <div className="flex items-center space-x-2">
//                       <FaExclamationTriangle className="text-yellow-600 dark:text-yellow-400 text-sm" />
//                       <p className="text-sm text-yellow-800 dark:text-yellow-200">
//                         {validationMessage}
//                       </p>
//                     </div>
//                   </motion.div>
//                 )}
//               </div>

//               {/* Modal Footer */}
//               <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
//                 <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 sm:justify-end">
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={onClose}
//                     className="w-full sm:w-auto px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-xl font-medium transition-all duration-200"
//                   >
//                     Cancel
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={onSave}
//                     disabled={!isFormValid()}
//                     className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-400 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
//                   >
//                     {editId ? (
//                       <>
//                         <FaSave className="text-sm" />
//                         <span>Update Cycle</span>
//                       </>
//                     ) : (
//                       <>
//                         <HiPlus className="text-sm" />
//                         <span>Create Cycle</span>
//                       </>
//                     )}
//                   </motion.button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </BaseModal>
//   );
// }


import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaSave,
  FaPlus,
  FaCalendarAlt,
  FaClock,
  FaEdit,
  FaCalendarDay,
  FaInfoCircle,
  FaExclamationTriangle,
  FaSync,
  FaRegCalendarCheck,
  FaBusinessTime
} from "react-icons/fa";
import {
  HiCash,
  HiX,
  HiCheck,
  HiPlus,
  HiCalendar,
  HiClock,
  HiRefresh
} from "react-icons/hi";
import BaseModal from "../../../common/BaseModal";

export default function PayrollCycleModal({
  isOpen,
  editId,
  cycleName,
  processingDate,
  onCycleNameChange,
  onProcessingDateChange,
  onClose,
  onSave,
}) {
  if (!isOpen) return null;

  const getCycleFrequency = (name) => {
    if (!name) return { icon: HiCash, color: 'gray', frequency: 'Custom Cycle' };
    
    const lowercaseName = name.toLowerCase();
    if (lowercaseName.includes('weekly')) return { icon: FaClock, color: 'blue', frequency: 'Weekly Cycle' };
    if (lowercaseName.includes('biweekly') || lowercaseName.includes('bi-weekly')) return { icon: HiClock, color: 'green', frequency: 'Bi-weekly Cycle' };
    if (lowercaseName.includes('monthly')) return { icon: FaCalendarAlt, color: 'purple', frequency: 'Monthly Cycle' };
    if (lowercaseName.includes('quarterly')) return { icon: FaBusinessTime, color: 'orange', frequency: 'Quarterly Cycle' };
    if (lowercaseName.includes('annual') || lowercaseName.includes('yearly')) return { icon: HiRefresh, color: 'red', frequency: 'Annual Cycle' };
    return { icon: HiCash, color: 'indigo', frequency: 'Custom Cycle' };
  };

  const getNextProcessingDate = () => {
    if (!processingDate) return null;
    try {
      const today = new Date();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      
      // Try to parse as day number
      const dayNumber = parseInt(processingDate);
      if (!isNaN(dayNumber) && dayNumber >= 1 && dayNumber <= 31) {
        let nextDate = new Date(currentYear, currentMonth, dayNumber);
        if (nextDate < today) {
          nextDate = new Date(currentYear, currentMonth + 1, dayNumber);
        }
        return nextDate.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        });
      }
      
      // Try to parse as full date
      const date = new Date(processingDate);
      if (!isNaN(date)) {
        return date.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        });
      }
    } catch {
      // Ignore parsing errors
    }
    return null;
  };

  const getValidationMessage = () => {
    if (!cycleName && !processingDate) return null;
    if (!cycleName) return "Cycle name is required";
    if (!processingDate) return "Processing date is required";
    
    // Check if processing date is valid
    const dayNumber = parseInt(processingDate);
    if (!isNaN(dayNumber)) {
      if (dayNumber < 1 || dayNumber > 31) {
        return "Day number must be between 1 and 31";
      }
    } else {
      // Try to parse as date
      try {
        const date = new Date(processingDate);
        if (isNaN(date)) {
          return "Please enter a valid date or day number (1-31)";
        }
      } catch {
        return "Please enter a valid date or day number (1-31)";
      }
    }
    
    return null;
  };

  const isFormValid = () => {
    if (!cycleName || !processingDate) return false;
    
    const dayNumber = parseInt(processingDate);
    if (!isNaN(dayNumber)) {
      return dayNumber >= 1 && dayNumber <= 31;
    }
    
    try {
      const date = new Date(processingDate);
      return !isNaN(date);
    } catch {
      return false;
    }
  };

  const category = getCycleFrequency(cycleName);
  const validationMessage = getValidationMessage();
  const nextProcessing = getNextProcessingDate();

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const commonCycles = [
    { name: "Monthly Payroll", date: "1" },
    { name: "Bi-weekly Payroll", date: "15" },
    { name: "Weekly Payroll", date: "5" },
    { name: "Quarterly Bonus", date: "30" },
    { name: "Custom Payroll", date: "" }
  ];

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={onClose}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-yellow-50 dark:bg-yellow-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                      {editId ? (
                        <FaEdit className="text-yellow-600 dark:text-yellow-400 text-xl" />
                      ) : (
                        <HiPlus className="text-yellow-600 dark:text-yellow-400 text-xl" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {editId ? "Edit Payroll Cycle" : "Create Payroll Cycle"}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {editId ? "Update payroll cycle details" : "Set up a new payroll processing schedule"}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  >
                    <HiX className="text-gray-500 dark:text-gray-400 text-xl" />
                  </motion.button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Quick Templates */}
                {!editId && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-3"
                  >
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Quick Templates
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {commonCycles.slice(0, 4).map((template, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            onCycleNameChange({ target: { value: template.name } });
                            onProcessingDateChange({ target: { value: template.date } });
                          }}
                          className="p-2 text-xs border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-center"
                        >
                          {template.name}
                        </motion.button>
                      ))}
                    </div>
                    
                    {/* Custom Payroll Option */}
                    <div className="mt-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          onCycleNameChange({ target: { value: "Custom Payroll" } });
                          onProcessingDateChange({ target: { value: "" } });
                        }}
                        className="w-full p-3 border-2 border-dashed border-yellow-300 dark:border-yellow-600 rounded-xl hover:bg-yellow-50 dark:hover:bg-yellow-900/10 transition-colors duration-200 group"
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg group-hover:bg-yellow-200 dark:group-hover:bg-yellow-900/30 transition-colors duration-200">
                            <FaBusinessTime className="text-yellow-600 dark:text-yellow-400 text-sm" />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Custom Payroll
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Set your own schedule
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Cycle Name */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div className={`p-1.5 bg-${category.color}-100 dark:bg-${category.color}-900/20 rounded-md`}>
                      <category.icon className={`text-${category.color}-600 dark:text-${category.color}-400 text-sm`} />
                    </div>
                    <span>Cycle Name</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={cycleName}
                    onChange={onCycleNameChange}
                    placeholder="e.g., Monthly Payroll, Bi-weekly Salary"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                  />
                  {cycleName && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`bg-${category.color}-50 dark:bg-${category.color}-900/10 p-3 rounded-lg border border-${category.color}-200 dark:border-${category.color}-800`}
                    >
                      <p className={`text-sm text-${category.color}-700 dark:text-${category.color}-300`}>
                        <category.icon className="inline mr-2" />
                        Detected as: {category.frequency}
                      </p>
                    </motion.div>
                  )}
                </motion.div>

                {/* Processing Date */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div className="p-1.5 bg-blue-100 dark:bg-blue-900/20 rounded-md">
                      <HiCalendar className="text-blue-600 dark:text-blue-400 text-sm" />
                    </div>
                    <span>Processing Date</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={processingDate}
                    onChange={onProcessingDateChange}
                    placeholder="Enter day number (1-31) or full date"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start space-x-2">
                      <FaInfoCircle className="text-blue-500 text-sm mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-blue-700 dark:text-blue-300">
                        <p className="mb-1">Examples:</p>
                        <ul className="space-y-1 ml-2">
                          <li>• "1" for 1st of every month</li>
                          <li>• "15" for 15th of every month</li>
                          <li>• "2024-12-25" for specific date</li>
                          <li>• "Last Friday" for custom cycles</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Next Processing Preview */}
                {nextProcessing && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                        <FaRegCalendarCheck className="text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Next Processing Date
                        </p>
                        <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                          {nextProcessing}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Validation Message */}
                {validationMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800"
                  >
                    <div className="flex items-center space-x-2">
                      <FaExclamationTriangle className="text-yellow-600 dark:text-yellow-400 text-sm" />
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        {validationMessage}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 sm:justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="w-full sm:w-auto px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-xl font-medium transition-all duration-200"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onSave}
                    disabled={!isFormValid()}
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-400 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {editId ? (
                      <>
                        <FaSave className="text-sm" />
                        <span>Update Cycle</span>
                      </>
                    ) : (
                      <>
                        <HiPlus className="text-sm" />
                        <span>Create Cycle</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </BaseModal>
  );
}