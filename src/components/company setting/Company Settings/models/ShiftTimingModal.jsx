// import React from "react";
// import BaseModal from "../../../common/BaseModal";

// export default function ShiftTimingModal({
//   isOpen,
//   editId,
//   name,
//   start,
//   end,
//   onNameChange,
//   onStartChange,
//   onEndChange,
//   onClose,
//   onSave,
// }) {
//   if (!isOpen) return null;

//   return (
//     <BaseModal isOpen={isOpen} onClose={onClose}>
//       <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md max-w-sm w-full">
//         <h2 className="text-xl font-semibold mb-4">
//           {editId ? "Edit Shift Timing" : "Add Shift Timing"}
//         </h2>
//         <div className="mb-3">
//           <label className="block mb-1">Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={onNameChange}
//             className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
//           />
//         </div>
//         <div className="mb-3">
//           <label className="block mb-1">Start</label>
//           <input
//             type="time"
//             value={start}
//             onChange={onStartChange}
//             step="60"
//             className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700 font-mono"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1">End</label>
//           <input
//             type="time"
//             value={end}
//             onChange={onEndChange}
//             step="60"
//             className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700 font-mono"
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



import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaSave,
  FaPlus,
  FaClock,
  FaBusinessTime,
  FaPlayCircle,
  FaStopCircle,
  FaEdit,
  FaCalendarAlt
} from "react-icons/fa";
import {
  HiClock,
  HiX,
  HiCheck,
  HiPlus
} from "react-icons/hi";
import BaseModal from "../../../common/BaseModal";

export default function ShiftTimingModal({
  isOpen,
  editId,
  name,
  start,
  end,
  onNameChange,
  onStartChange,
  onEndChange,
  onClose,
  onSave,
}) {
  if (!isOpen) return null;

  const formatTimeForDisplay = (time) => {
    if (!time) return "Not set";
    try {
      const [hours, minutes] = time.split(':');
      const hour24 = parseInt(hours, 10);
      const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
      const ampm = hour24 >= 12 ? 'PM' : 'AM';
      return `${hour12}:${minutes} ${ampm}`;
    } catch {
      return time;
    }
  };

  const calculateDuration = () => {
    if (!start || !end) return "Duration will be calculated";
    try {
      const [startHours, startMinutes] = start.split(':').map(Number);
      const [endHours, endMinutes] = end.split(':').map(Number);
      
      let duration = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
      if (duration < 0) duration += 24 * 60; // Handle overnight shifts
      
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      return `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`;
    } catch {
      return "Invalid time format";
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
              <div className="bg-blue-50 dark:bg-blue-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      {editId ? (
                        <FaEdit className="text-blue-600 dark:text-blue-400 text-xl" />
                      ) : (
                        <HiPlus className="text-blue-600 dark:text-blue-400 text-xl" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {editId ? "Edit Shift Timing" : "Add New Shift"}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {editId ? "Update shift timing details" : "Create a new shift timing"}
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
                {/* Shift Name */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-2"
                >
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div className="p-1.5 bg-purple-100 dark:bg-purple-900/20 rounded-md">
                      <FaBusinessTime className="text-purple-600 dark:text-purple-400 text-sm" />
                    </div>
                    <span>Shift Name</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={onNameChange}
                    placeholder="e.g., Morning Shift, Night Shift"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </motion.div>

                {/* Time Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Start Time */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2"
                  >
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <div className="p-1.5 bg-green-100 dark:bg-green-900/20 rounded-md">
                        <FaPlayCircle className="text-green-600 dark:text-green-400 text-sm" />
                      </div>
                      <span>Start Time</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      value={start}
                      onChange={onStartChange}
                      step="60"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 font-mono"
                    />
                    {start && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatTimeForDisplay(start)}
                      </p>
                    )}
                  </motion.div>

                  {/* End Time */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2"
                  >
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <div className="p-1.5 bg-red-100 dark:bg-red-900/20 rounded-md">
                        <FaStopCircle className="text-red-600 dark:text-red-400 text-sm" />
                      </div>
                      <span>End Time</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      value={end}
                      onChange={onEndChange}
                      step="60"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 font-mono"
                    />
                    {end && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatTimeForDisplay(end)}
                      </p>
                    )}
                  </motion.div>
                </div>

                {/* Duration Display */}
                {(start || end) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-200 dark:border-blue-800"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                        <HiClock className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Shift Duration
                        </p>
                        <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                          {calculateDuration()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Validation Message */}
                {(!name || !start || !end) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800"
                  >
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      Please fill in all required fields to save the shift timing.
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
                    disabled={!name || !start || !end}
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {editId ? (
                      <>
                        <FaSave className="text-sm" />
                        <span>Update Shift</span>
                      </>
                    ) : (
                      <>
                        <HiPlus className="text-sm" />
                        <span>Add Shift</span>
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