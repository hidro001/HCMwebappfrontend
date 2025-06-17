// import BaseModal from "../../../common/BaseModal";

// const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// export default function WorkingDaySystemModal({
//   isOpen,
//   editId,
//   sysName,
//   workingDays,
//   monthlyLeaves,
//   onSysNameChange,
//   onWorkingDaysChange,
//   onMonthlyLeavesChange,
//   onClose,
//   onSave,
// }) {
//   if (!isOpen) return null;

//   const toggleDay = (day) => {
//     if (workingDays.includes(day)) {
//       onWorkingDaysChange(workingDays.filter((d) => d !== day));
//     } else {
//       onWorkingDaysChange([...workingDays, day]);
//     }
//   };

//   return (
//     <BaseModal isOpen={isOpen} onClose={onClose}>
//       <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-lg w-full max-w-sm p-6">
//         <h3 className="text-xl font-bold mb-4">
//           {editId ? "Edit Leave System" : "Add Leave System"}
//         </h3>

//         <div className="mb-4">
//           <label className="block mb-1 font-semibold">Name</label>
//           <input
//             type="text"
//             value={sysName}
//             onChange={onSysNameChange}
//             className="w-full p-2 border dark:border-gray-700 rounded dark:bg-gray-800"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-1 font-semibold">Working Days</label>
//           <div className="flex flex-wrap gap-2">
//             {daysOfWeek.map((day) => (
//               <button
//                 key={day}
//                 type="button"
//                 onClick={() => toggleDay(day)}
//                 className={`px-3 py-1 rounded border ${
//                   workingDays.includes(day)
//                     ? "bg-blue-600 text-white border-blue-700"
//                     : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
//                 }`}
//               >
//                 {day}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="mb-4">
//           <label className="block mb-1 font-semibold">Monthly Paid Leaves</label>
//           <input
//             type="number"
//             step="0.5"
//             value={monthlyLeaves}
//             onChange={onMonthlyLeavesChange}
//             className="w-full p-2 border dark:border-gray-700 rounded dark:bg-gray-800"
//           />
//         </div>

//         <div className="flex justify-end space-x-2">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onSave}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             {editId ? "Save" : "Add"}
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
  FaCalendarWeek,
  FaEdit,
  FaCalendarDay,
  FaInfoCircle,
  FaExclamationTriangle,
  FaBusinessTime,
  FaUmbrellaBeach,
  FaCalendarCheck,
  FaSun,
  FaMoon,
  FaRegCalendarAlt
} from "react-icons/fa";
import {
  HiSun,
  HiX,
  HiCheck,
  HiPlus,
  HiCalendar,
  HiClock,
  HiUsers
} from "react-icons/hi";
import BaseModal from "../../../common/BaseModal";

const daysOfWeek = [
  { short: "Mon", full: "Monday", icon: "☀️" },
  { short: "Tue", full: "Tuesday", icon: "🌅" },
  { short: "Wed", full: "Wednesday", icon: "⛅" },
  { short: "Thu", full: "Thursday", icon: "🌤️" },
  { short: "Fri", full: "Friday", icon: "🎉" },
  { short: "Sat", full: "Saturday", icon: "🌙" },
  { short: "Sun", full: "Sunday", icon: "🌟" }
];

export default function WorkingDaySystemModal({
  isOpen,
  editId,
  sysName,
  workingDays,
  monthlyLeaves,
  onSysNameChange,
  onWorkingDaysChange,
  onMonthlyLeavesChange,
  onClose,
  onSave,
}) {
  if (!isOpen) return null;

  const toggleDay = (day) => {
    if (workingDays.includes(day)) {
      onWorkingDaysChange(workingDays.filter((d) => d !== day));
    } else {
      onWorkingDaysChange([...workingDays, day]);
    }
  };

  const getScheduleType = () => {
    const dayCount = workingDays.length;
    if (dayCount === 7) return { type: '7-Day Schedule', color: 'red', icon: FaSun };
    if (dayCount === 6) return { type: '6-Day Schedule', color: 'orange', icon: FaBusinessTime };
    if (dayCount === 5) return { type: '5-Day Schedule', color: 'green', icon: FaCalendarWeek };
    if (dayCount === 4) return { type: '4-Day Schedule', color: 'blue', icon: FaUmbrellaBeach };
    if (dayCount === 0) return { type: 'No Days Selected', color: 'gray', icon: FaCalendarDay };
    return { type: 'Custom Schedule', color: 'purple', icon: FaCalendarCheck };
  };

  const calculateMonthlyWorkingDays = () => {
    const daysPerWeek = workingDays.length;
    const averageWeeksPerMonth = 4.33;
    return Math.round(daysPerWeek * averageWeeksPerMonth);
  };

  const getValidationMessage = () => {
    if (!sysName && workingDays.length === 0 && !monthlyLeaves) return null;
    if (!sysName) return "System name is required";
    if (workingDays.length === 0) return "Please select at least one working day";
    if (!monthlyLeaves) return "Monthly paid leaves is required";
    
    const leaves = parseFloat(monthlyLeaves);
    if (isNaN(leaves) || leaves < 0) return "Monthly leaves must be a positive number";
    if (leaves > 31) return "Monthly leaves cannot exceed 31 days";
    
    return null;
  };

  const isFormValid = () => {
    if (!sysName || workingDays.length === 0 || !monthlyLeaves) return false;
    const leaves = parseFloat(monthlyLeaves);
    return !isNaN(leaves) && leaves >= 0 && leaves <= 31;
  };

  const scheduleInfo = getScheduleType();
  const validationMessage = getValidationMessage();
  const monthlyWorkingDays = calculateMonthlyWorkingDays();

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

  const quickPresets = [
    { name: "Standard Week", days: ["Mon", "Tue", "Wed", "Thu", "Fri"], leaves: "2" },
    { name: "6-Day Week", days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], leaves: "1" },
    { name: "4-Day Week", days: ["Mon", "Tue", "Wed", "Thu"], leaves: "3" },
    { name: "Weekend Work", days: ["Sat", "Sun"], leaves: "1" }
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
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-lg overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-orange-50 dark:bg-orange-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                      {editId ? (
                        <FaEdit className="text-orange-600 dark:text-orange-400 text-xl" />
                      ) : (
                        <HiPlus className="text-orange-600 dark:text-orange-400 text-xl" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {editId ? "Edit Working Day System" : "Create Working Day System"}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {editId ? "Update work schedule and leave policy" : "Set up a new work schedule and leave policy"}
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
              <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
                {/* Quick Presets */}
                {!editId && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-3"
                  >
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Quick Presets
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {quickPresets.map((preset, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            onSysNameChange({ target: { value: preset.name } });
                            onWorkingDaysChange(preset.days);
                            onMonthlyLeavesChange({ target: { value: preset.leaves } });
                          }}
                          className="p-2 text-xs border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-center"
                        >
                          <div className="font-medium">{preset.name}</div>
                          <div className="text-gray-500 dark:text-gray-400">
                            {preset.days.length} days
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* System Name */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div className={`p-1.5 bg-${scheduleInfo.color}-100 dark:bg-${scheduleInfo.color}-900/20 rounded-md`}>
                      <scheduleInfo.icon className={`text-${scheduleInfo.color}-600 dark:text-${scheduleInfo.color}-400 text-sm`} />
                    </div>
                    <span>System Name</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={sysName}
                    onChange={onSysNameChange}
                    placeholder="e.g., Standard Week, Flexible Hours"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  />
                  {sysName && workingDays.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`bg-${scheduleInfo.color}-50 dark:bg-${scheduleInfo.color}-900/10 p-3 rounded-lg border border-${scheduleInfo.color}-200 dark:border-${scheduleInfo.color}-800`}
                    >
                      <p className={`text-sm text-${scheduleInfo.color}-700 dark:text-${scheduleInfo.color}-300`}>
                        <scheduleInfo.icon className="inline mr-2" />
                        Detected as: {scheduleInfo.type}
                      </p>
                    </motion.div>
                  )}
                </motion.div>

                {/* Working Days Selection */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3"
                >
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div className="p-1.5 bg-blue-100 dark:bg-blue-900/20 rounded-md">
                      <FaCalendarWeek className="text-blue-600 dark:text-blue-400 text-sm" />
                    </div>
                    <span>Working Days</span>
                    <span className="text-red-500">*</span>
                    {workingDays.length > 0 && (
                      <span className="text-blue-600 dark:text-blue-400 text-xs">
                        ({workingDays.length} selected)
                      </span>
                    )}
                  </label>
                  
                  <div className="grid grid-cols-7 gap-2">
                    {daysOfWeek.map((day) => {
                      const isSelected = workingDays.includes(day.short);
                      return (
                        <motion.button
                          key={day.short}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleDay(day.short)}
                          className={`relative p-3 rounded-lg border-2 transition-all duration-200 ${
                            isSelected
                              ? "bg-blue-600 border-blue-600 text-white shadow-lg"
                              : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-500"
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-lg mb-1">{day.icon}</div>
                            <div className="text-xs font-medium">{day.short}</div>
                          </div>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
                            >
                              <HiCheck className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start space-x-2">
                      <FaInfoCircle className="text-blue-500 text-sm mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-blue-700 dark:text-blue-300">
                        Select the days when employees are expected to work. You can choose any combination of days.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Monthly Paid Leaves */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div className="p-1.5 bg-purple-100 dark:bg-purple-900/20 rounded-md">
                      <FaUmbrellaBeach className="text-purple-600 dark:text-purple-400 text-sm" />
                    </div>
                    <span>Monthly Paid Leaves</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="31"
                    value={monthlyLeaves}
                    onChange={onMonthlyLeavesChange}
                    placeholder="2.5"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                  <div className="bg-purple-50 dark:bg-purple-900/10 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="flex items-start space-x-2">
                      <FaInfoCircle className="text-purple-500 text-sm mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-purple-700 dark:text-purple-300">
                        Number of paid leave days employees get per month. You can use decimals (e.g., 2.5 days).
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Summary Card */}
                {workingDays.length > 0 && monthlyLeaves && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                        <FaCalendarCheck className="text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Schedule Summary
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-white dark:bg-gray-700 p-2 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Working Days</p>
                        <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                          {workingDays.length}/week
                        </p>
                      </div>
                      <div className="bg-white dark:bg-gray-700 p-2 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Monthly Work</p>
                        <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                          ~{monthlyWorkingDays} days
                        </p>
                      </div>
                      <div className="bg-white dark:bg-gray-700 p-2 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Paid Leaves</p>
                        <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                          {monthlyLeaves}/month
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
                    transition={{ delay: 0.6 }}
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
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {editId ? (
                      <>
                        <FaSave className="text-sm" />
                        <span>Update System</span>
                      </>
                    ) : (
                      <>
                        <HiPlus className="text-sm" />
                        <span>Create System</span>
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