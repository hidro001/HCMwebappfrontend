// import React from "react";
// import { motion } from "framer-motion";
// import { FiX } from "react-icons/fi";
// import BaseModal from "../../../common/BaseModal";

// export default function BreakSettingsModal({
//   isOpen,
//   editingItem,
//   breakType,
//   setBreakType,
//   breakDuration,
//   setBreakDuration,
//   autoBreakStart,
//   setAutoBreakStart,
//   detectionType,
//   setDetectionType,
//   onClose,
//   onSubmit,
// }) {
//   if (!isOpen) return null;

//   return (
//     <BaseModal isOpen={isOpen} onClose={onClose}>
//       <motion.div
//         className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6"
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.95 }}
//       >
//         <button
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-200"
//           onClick={onClose}
//         >
//           <FiX size={20} />
//         </button>
//         <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
//           {editingItem ? "Edit Break Settings" : "Add Break Settings"}
//         </h2>
//         <form onSubmit={onSubmit}>
//           <div className="mb-4">
//             <label
//               htmlFor="breakType"
//               className="block text-gray-700 dark:text-gray-200 mb-1"
//             >
//               Break Type
//             </label>
//             <input
//               id="breakType"
//               type="text"
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//               placeholder="Enter Break Type"
//               value={breakType}
//               onChange={(e) => setBreakType(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="breakDuration"
//               className="block text-gray-700 dark:text-gray-200 mb-1"
//             >
//               Break Duration (Hours)
//             </label>
//             <input
//               id="breakDuration"
//               type="text"
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//               placeholder="e.g., 1.5"
//               value={breakDuration}
//               onChange={(e) => setBreakDuration(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="autoBreakStart"
//               className="block text-gray-700 dark:text-gray-200 mb-1"
//             >
//               Auto Break Start (Min)
//             </label>
//             <input
//               id="autoBreakStart"
//               type="text"
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//               placeholder="e.g., 1"
//               value={autoBreakStart}
//               onChange={(e) => setAutoBreakStart(e.target.value)}
//               required
//             />
//           </div>
//           {/* <div className="mb-4">
//             <label className="block text-gray-700 dark:text-gray-200 mb-1">
//               Detection Type
//             </label>
//             <div className="flex items-center space-x-4">
//               <label className="inline-flex items-center text-gray-700 dark:text-gray-200">
//                 <input
//                   type="radio"
//                   name="detectionType"
//                   value="Face Detection"
//                   checked={detectionType === "Face Detection"}
//                   onChange={(e) => setDetectionType(e.target.value)}
//                   className="form-radio h-4 w-4 text-blue-500 mr-2 dark:bg-gray-700 dark:border-gray-600"
//                 />
//                 Face Detection
//               </label>
//               <label className="inline-flex items-center text-gray-700 dark:text-gray-200">
//                 <input
//                   type="radio"
//                   name="detectionType"
//                   value="Monitor Track"
//                   checked={detectionType === "Monitor Track"}
//                   onChange={(e) => setDetectionType(e.target.value)}
//                   className="form-radio h-4 w-4 text-blue-500 mr-2 dark:bg-gray-700 dark:border-gray-600"
//                 />
//                 Monitor Track
//               </label>
//             </div>
//           </div> */}
//           <div className="flex justify-end mt-6">
//             <button
//               type="button"
//               className="mr-3 px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50 dark:hover:bg-gray-700"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-400 dark:text-gray-900"
//             >
//               {editingItem ? "Update" : "Add"}
//             </button>
//           </div>
//         </form>
//       </motion.div>
//     </BaseModal>
//   );
// }



import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiX, 
  FiClock, 
  FiSettings, 
  FiZap,
  FiSave,
  FiEdit3,
  FiPlus
} from "react-icons/fi";
import { 
  HiOutlineSparkles,
  HiOutlineClock,
  HiOutlineAdjustments
} from "react-icons/hi";
import BaseModal from "../../../common/BaseModal";

export default function BreakSettingsModal({
  isOpen,
  editingItem,
  breakType,
  setBreakType,
  breakDuration,
  setBreakDuration,
  autoBreakStart,
  setAutoBreakStart,
  detectionType,
  setDetectionType,
  onClose,
  onSubmit,
}) {
  if (!isOpen) return null;

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
        duration: 0.3,
        ease: "easeOut"
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

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.1,
        duration: 0.3
      }
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative h-[82vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg mx-auto overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <button
                  className="absolute top-0 right-0 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  onClick={onClose}
                >
                  <FiX className="w-5 h-5" />
                </button>
                
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    {editingItem ? (
                      <FiEdit3 className="w-6 h-6" />
                    ) : (
                      <FiPlus className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {editingItem ? "Edit Break Settings" : "Add Break Settings"}
                    </h2>
                    <p className="text-white/80 mt-1">
                      Configure break parameters and detection settings
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <motion.div
              variants={contentVariants}
              className="p-6"
            >
              <div className="space-y-6">
                {/* Break Type */}
                <div className="space-y-2">
                  <label
                    htmlFor="breakType"
                    className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    <HiOutlineSparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>Break Type</span>
                  </label>
                  <div className="relative">
                    <input
                      id="breakType"
                      type="text"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                      placeholder="Enter break type (e.g., Lunch Break, Coffee Break)"
                      value={breakType}
                      onChange={(e) => setBreakType(e.target.value)}
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <FiSettings className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Break Duration */}
                <div className="space-y-2">
                  <label
                    htmlFor="breakDuration"
                    className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    <HiOutlineClock className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span>Break Duration (Hours)</span>
                  </label>
                  <div className="relative">
                    <input
                      id="breakDuration"
                      type="number"
                      step="0.1"
                      min="0.1"
                      max="24"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                      placeholder="e.g., 1.5"
                      value={breakDuration}
                      onChange={(e) => setBreakDuration(e.target.value)}
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <FiClock className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Specify the duration in hours (e.g., 0.5 for 30 minutes)
                  </p>
                </div>

                {/* Auto Break Start */}
                <div className="space-y-2">
                  <label
                    htmlFor="autoBreakStart"
                    className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    <FiZap className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    <span>Auto Break Start (Minutes)</span>
                  </label>
                  <div className="relative">
                    <input
                      id="autoBreakStart"
                      type="number"
                      min="1"
                      max="1440"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                      placeholder="e.g., 60"
                      value={autoBreakStart}
                      onChange={(e) => setAutoBreakStart(e.target.value)}
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <HiOutlineAdjustments className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Time in minutes before break starts automatically
                  </p>
                </div>

                {/* Detection Type (commented out in original) */}
                {/* Uncomment if needed
                <div className="space-y-3">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <FiEye className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span>Detection Type</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="relative flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200">
                      <input
                        type="radio"
                        name="detectionType"
                        value="Face Detection"
                        checked={detectionType === "Face Detection"}
                        onChange={(e) => setDetectionType(e.target.value)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        detectionType === "Face Detection" 
                          ? 'border-blue-600 bg-blue-600' 
                          : 'border-gray-300 dark:border-gray-500'
                      }`}>
                        {detectionType === "Face Detection" && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                        )}
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">Face Detection</span>
                    </label>
                    <label className="relative flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200">
                      <input
                        type="radio"
                        name="detectionType"
                        value="Monitor Track"
                        checked={detectionType === "Monitor Track"}
                        onChange={(e) => setDetectionType(e.target.value)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        detectionType === "Monitor Track" 
                          ? 'border-blue-600 bg-blue-600' 
                          : 'border-gray-300 dark:border-gray-500'
                      }`}>
                        {detectionType === "Monitor Track" && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                        )}
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">Monitor Track</span>
                    </label>
                  </div>
                </div>
                */}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 font-medium transition-all duration-200"
                    onClick={onClose}
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <FiX className="w-4 h-4" />
                      <span>Cancel</span>
                    </span>
                  </motion.button>
                  
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                    onClick={onSubmit}
                  >
                    <span className="flex items-center justify-center space-x-2">
                      {editingItem ? (
                        <>
                          <FiSave className="w-4 h-4" />
                          <span>Update Settings</span>
                        </>
                      ) : (
                        <>
                          <FiPlus className="w-4 h-4" />
                          <span>Add Settings</span>
                        </>
                      )}
                    </span>
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