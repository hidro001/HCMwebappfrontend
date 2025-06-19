// import React from "react";
// import BaseModal from "../../../common/BaseModal";

// export default function HolidayModal({
//   isOpen,
//   editId,
//   holidayName,
//   holidayDate,
//   recurring,
//   onHolidayNameChange,
//   onHolidayDateChange,
//   onRecurringChange,
//   onClose,
//   onSave,
// }) {
//   if (!isOpen) return null;

//   return (
//     <BaseModal isOpen={isOpen} onClose={onClose}>
//       <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md max-w-sm w-full">
//         <h2 className="text-xl font-semibold mb-4">
//           {editId ? "Edit Holiday" : "Declare Holiday"}
//         </h2>
//         <div className="mb-3">
//           <label className="block mb-1">Holiday Name</label>
//           <input
//             type="text"
//             value={holidayName}
//             onChange={onHolidayNameChange}
//             className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
//           />
//         </div>
//         <div className="mb-3">
//           <label className="block mb-1">Date</label>
//           <input
//             type="date"
//             value={holidayDate}
//             onChange={onHolidayDateChange}
//             className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1">Recurring</label>
//           <select
//             value={recurring ? "true" : "false"}
//             onChange={onRecurringChange}
//             className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
//           >
//             <option value="false">No</option>
//             <option value="true">Yes</option>
//           </select>
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
//             {editId ? "Save" : "Declare"}
//           </button>
//         </div>
//       </div>
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
  FaGift,
  FaSync,
  FaEdit,
  FaCalendarDay,
  FaRegCalendarAlt,
  FaInfoCircle
} from "react-icons/fa";
import {
  HiCalendar,
  HiX,
  HiCheck,
  HiPlus,
  HiGift,
  HiRefresh
} from "react-icons/hi";
import BaseModal from "../../../common/BaseModal";

export default function HolidayModal({
  isOpen,
  editId,
  holidayName,
  holidayDate,
  recurring,
  onHolidayNameChange,
  onHolidayDateChange,
  onRecurringChange,
  onClose,
  onSave,
}) {
  if (!isOpen) return null;

  const formatDatePreview = (dateString) => {
    if (!dateString) return "Select a date to see preview";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return "Invalid date";
    }
  };

  const getNextOccurrence = (dateString, isRecurring) => {
    if (!dateString || !isRecurring) return null;
    try {
      const today = new Date();
      const holidayDate = new Date(dateString);
      const currentYear = today.getFullYear();
      
      // Set the holiday to current year
      holidayDate.setFullYear(currentYear);
      
      // If the holiday has passed this year, check next year
      if (holidayDate < today) {
        holidayDate.setFullYear(currentYear + 1);
      }
      
      return holidayDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return null;
    }
  };

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

  const nextOccurrence = getNextOccurrence(holidayDate, recurring);

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
              <div className="bg-green-50 dark:bg-green-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      {editId ? (
                        <FaEdit className="text-green-600 dark:text-green-400 text-xl" />
                      ) : (
                        <HiPlus className="text-green-600 dark:text-green-400 text-xl" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {editId ? "Edit Holiday" : "Declare Holiday"}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {editId ? "Update holiday information" : "Add a new company holiday"}
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
                {/* Holiday Name */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-2"
                >
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div className="p-1.5 bg-blue-100 dark:bg-blue-900/20 rounded-md">
                      <HiGift className="text-blue-600 dark:text-blue-400 text-sm" />
                    </div>
                    <span>Holiday Name</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={holidayName}
                    onChange={onHolidayNameChange}
                    placeholder="e.g., Christmas Day, New Year's Day"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  />
                </motion.div>

                {/* Holiday Date */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div className="p-1.5 bg-purple-100 dark:bg-purple-900/20 rounded-md">
                      <HiCalendar className="text-purple-600 dark:text-purple-400 text-sm" />
                    </div>
                    <span>Holiday Date</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={holidayDate}
                    onChange={onHolidayDateChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                  {holidayDate && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-purple-50 dark:bg-purple-900/10 p-3 rounded-lg border border-purple-200 dark:border-purple-800"
                    >
                      <p className="text-sm text-purple-700 dark:text-purple-300">
                        <FaCalendarDay className="inline mr-2" />
                        {formatDatePreview(holidayDate)}
                      </p>
                    </motion.div>
                  )}
                </motion.div>

                {/* Recurring Setting */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div className="p-1.5 bg-orange-100 dark:bg-orange-900/20 rounded-md">
                      <HiRefresh className="text-orange-600 dark:text-orange-400 text-sm" />
                    </div>
                    <span>Holiday Type</span>
                  </label>
                  <select
                    value={recurring ? "true" : "false"}
                    onChange={onRecurringChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="false">Single Event</option>
                    <option value="true">Recurring Annually</option>
                  </select>
                  <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start space-x-2">
                      <FaInfoCircle className="text-blue-500 text-sm mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-blue-700 dark:text-blue-300">
                        {recurring 
                          ? "This holiday will repeat every year on the same date" 
                          : "This is a one-time holiday event"
                        }
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Next Occurrence for Recurring Holidays */}
                {recurring && nextOccurrence && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                        <FaRegCalendarAlt className="text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Next Occurrence
                        </p>
                        <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                          {nextOccurrence}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Validation Message */}
                {(!holidayName || !holidayDate) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800"
                  >
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      Please fill in all required fields to declare the holiday.
                    </p>
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
                    disabled={!holidayName || !holidayDate}
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {editId ? (
                      <>
                        <FaSave className="text-sm" />
                        <span>Update Holiday</span>
                      </>
                    ) : (
                      <>
                        <HiGift className="text-sm" />
                        <span>Declare Holiday</span>
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