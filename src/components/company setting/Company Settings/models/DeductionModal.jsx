// import React from "react";
// import BaseModal from "../../../common/BaseModal";

// export default function DeductionModal({
//   isOpen,
//   editId,
//   deductionName,
//   percentage,
//   onDeductionNameChange,
//   onPercentageChange,
//   onClose,
//   onSave,
// }) {
//   if (!isOpen) return null;

//   return (
//     <BaseModal isOpen={isOpen} onClose={onClose}>
//       <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md max-w-sm w-full">
//         <h2 className="text-xl font-semibold mb-4">
//           {editId ? "Edit Deduction" : "Add Deduction"}
//         </h2>
//         <div className="mb-3">
//           <label className="block mb-1">Deduction Name</label>
//           <input
//             type="text"
//             value={deductionName}
//             onChange={onDeductionNameChange}
//             className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1">Percentage (%)</label>
//           <input
//             type="number"
//             value={percentage}
//             onChange={onPercentageChange}
//             className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
//             placeholder="0 - 100"
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
  FaMoneyBill,
  FaPercent,
  FaEdit,
  FaCalculator,
  FaDollarSign,
  FaInfoCircle,
  FaExclamationTriangle
} from "react-icons/fa";
import {
  HiCash,
  HiX,
  HiCheck,
  HiPlus,
  HiCalculator,
  HiCurrencyDollar
} from "react-icons/hi";
import BaseModal from "../../../common/BaseModal";

export default function DeductionModal({
  isOpen,
  editId,
  deductionName,
  percentage,
  onDeductionNameChange,
  onPercentageChange,
  onClose,
  onSave,
}) {
  if (!isOpen) return null;

  const calculateSampleDeduction = (percent, salary = 50000) => {
    if (!percent || isNaN(percent)) return "0";
    const numericPercent = parseFloat(percent);
    return (salary * numericPercent / 100).toLocaleString();
  };

  const getValidationMessage = () => {
    if (!deductionName && !percentage) return null;
    if (!deductionName) return "Deduction name is required";
    if (!percentage) return "Percentage is required";
    
    const numericPercent = parseFloat(percentage);
    if (isNaN(numericPercent)) return "Please enter a valid percentage";
    if (numericPercent < 0) return "Percentage cannot be negative";
    if (numericPercent > 100) return "Percentage cannot exceed 100%";
    if (numericPercent === 0) return "Percentage should be greater than 0";
    
    return null;
  };

  const isFormValid = () => {
    if (!deductionName || !percentage) return false;
    const numericPercent = parseFloat(percentage);
    return !isNaN(numericPercent) && numericPercent >= 0 && numericPercent <= 100;
  };

  const getDeductionCategory = (name) => {
    if (!name) return { icon: FaMoneyBill, color: 'gray', category: 'General' };
    
    const lowercaseName = name.toLowerCase();
    if (lowercaseName.includes('tax') || lowercaseName.includes('income')) 
      return { icon: FaCalculator, color: 'red', category: 'Tax Deduction' };
    if (lowercaseName.includes('provident') || lowercaseName.includes('pf')) 
      return { icon: HiCash, color: 'blue', category: 'Provident Fund' };
    if (lowercaseName.includes('insurance') || lowercaseName.includes('medical')) 
      return { icon: FaDollarSign, color: 'green', category: 'Insurance' };
    if (lowercaseName.includes('loan') || lowercaseName.includes('advance')) 
      return { icon: HiCurrencyDollar, color: 'orange', category: 'Loan/Advance' };
    
    return { icon: FaMoneyBill, color: 'purple', category: 'Other Deduction' };
  };

  const category = getDeductionCategory(deductionName);
  const validationMessage = getValidationMessage();

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
              <div className="bg-red-50 dark:bg-red-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                      {editId ? (
                        <FaEdit className="text-red-600 dark:text-red-400 text-xl" />
                      ) : (
                        <HiPlus className="text-red-600 dark:text-red-400 text-xl" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {editId ? "Edit Deduction" : "Add Salary Deduction"}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {editId ? "Update deduction details" : "Create a new payroll deduction"}
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
                {/* Deduction Name */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-2"
                >
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div className={`p-1.5 bg-${category.color}-100 dark:bg-${category.color}-900/20 rounded-md`}>
                      <category.icon className={`text-${category.color}-600 dark:text-${category.color}-400 text-sm`} />
                    </div>
                    <span>Deduction Name</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={deductionName}
                    onChange={onDeductionNameChange}
                    placeholder="e.g., Income Tax, PF, Medical Insurance"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  />
                  {deductionName && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`bg-${category.color}-50 dark:bg-${category.color}-900/10 p-3 rounded-lg border border-${category.color}-200 dark:border-${category.color}-800`}
                    >
                      <p className={`text-sm text-${category.color}-700 dark:text-${category.color}-300`}>
                        <category.icon className="inline mr-2" />
                        Detected as: {category.category}
                      </p>
                    </motion.div>
                  )}
                </motion.div>

                {/* Percentage Input */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div className="p-1.5 bg-orange-100 dark:bg-orange-900/20 rounded-md">
                      <FaPercent className="text-orange-600 dark:text-orange-400 text-sm" />
                    </div>
                    <span>Deduction Percentage</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={percentage}
                      onChange={onPercentageChange}
                      placeholder="0.00"
                      min="0"
                      max="100"
                      step="0.01"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FaPercent className="text-gray-400" />
                    </div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start space-x-2">
                      <FaInfoCircle className="text-blue-500 text-sm mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-blue-700 dark:text-blue-300">
                        Enter percentage between 0 and 100. This will be deducted from the employee's gross salary.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Sample Calculations */}
                {percentage && !isNaN(parseFloat(percentage)) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                        <HiCalculator className="text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Sample Deduction Calculations
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400">$30K</p>
                        <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                          ${calculateSampleDeduction(percentage, 30000)}
                        </p>
                      </div>
                      <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400">$50K</p>
                        <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                          ${calculateSampleDeduction(percentage, 50000)}
                        </p>
                      </div>
                      <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400">$100K</p>
                        <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                          ${calculateSampleDeduction(percentage, 100000)}
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
                    transition={{ delay: 0.4 }}
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
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {editId ? (
                      <>
                        <FaSave className="text-sm" />
                        <span>Update Deduction</span>
                      </>
                    ) : (
                      <>
                        <HiPlus className="text-sm" />
                        <span>Add Deduction</span>
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