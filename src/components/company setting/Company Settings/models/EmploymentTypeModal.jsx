// import React from "react";
// import BaseModal from "../../../common/BaseModal";

// export default function EmploymentTypeModal({
//   isOpen,
//   editId,
//   empTypeName,
//   setEmpTypeName,
//   deductionIds,
//   handleCheckboxChange,
//   deductions,
//   payrollCycles,
//   workingDaySystem,
//   selectedPayrollCycleId,
//   setSelectedPayrollCycleId,
//   selectedLeaveSystemId,
//   setSelectedLeaveSystemId,
//   salaryHike,
//   setSalaryHike,
//   onClose,
//   onSave,
// }) {
//   if (!isOpen) return null;

//   return (
//     <BaseModal isOpen={isOpen} onClose={onClose}>
//       <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-lg w-full max-w-md p-6">
//         <h2 className="text-xl font-bold mb-4">
//           {editId ? "Edit Employment Type" : "Add Employment Type"}
//         </h2>
//         <div className="mb-4">
//           <label className="block mb-1 font-semibold">
//             Employment Type Name
//           </label>
//           <input
//             type="text"
//             value={empTypeName}
//             onChange={(e) => setEmpTypeName(e.target.value)}
//             className="w-full p-2 border dark:border-gray-700 rounded dark:bg-gray-800"
//           />
//         </div>
//         <div className="mb-4">
//           <p className="mb-1 font-semibold">Select Deductions</p>
//           <div className="flex items-center flex-wrap gap-4">
//             {deductions.map((ded) => (
//               <label key={ded.id} className="inline-flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={deductionIds.includes(ded.id)}
//                   onChange={() => handleCheckboxChange(ded.id)}
//                   className="accent-blue-600 mr-1"
//                 />
//                 {ded.name}
//               </label>
//             ))}
//           </div>
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 font-semibold">
//             Select Payroll Cycle
//           </label>
//           <select
//             value={selectedPayrollCycleId}
//             onChange={(e) => setSelectedPayrollCycleId(e.target.value)}
//             className="w-full p-2 border dark:border-gray-700 rounded dark:bg-gray-800"
//           >
//             <option value="">Select Cycle</option>
//             {payrollCycles.map((pc) => (
//               <option key={pc.id} value={pc.id}>
//                 {pc.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 font-semibold">
//             Select Working Day System
//           </label>
//           <select
//             value={selectedLeaveSystemId}
//             onChange={(e) => setSelectedLeaveSystemId(e.target.value)}
//             className="w-full p-2 border dark:border-gray-700 rounded dark:bg-gray-800"
//           >
//             <option value="">Select System</option>
//             {workingDaySystem.map((ls) => (
//               <option key={ls.id} value={ls.id}>
//                 {ls.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="mb-6">
//           <label className="block mb-1 font-semibold">
//             Salary Hike Percentage
//           </label>
//           <input
//             type="number"
//             value={salaryHike}
//             onChange={(e) => setSalaryHike(e.target.value)}
//             placeholder="0 - 100"
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
  FaUsers,
  FaEdit,
  FaUserTie,
  FaInfoCircle,
  FaExclamationTriangle,
  FaBriefcase,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaUmbrellaBeach,
  FaPercentage,
  FaChartLine,
  FaUserCircle,
  FaCrown,
  FaGraduationCap,
  FaTools,
  FaBuilding,
  FaCheck
} from "react-icons/fa";
import {
  HiUsers,
  HiX,
  HiCheck,
  HiPlus,
  HiOfficeBuilding,
  HiCash,
  HiCalendar,
  HiTrendingUp
} from "react-icons/hi";
import BaseModal from "../../../common/BaseModal";

export default function EmploymentTypeModal({
  isOpen,
  editId,
  empTypeName,
  setEmpTypeName,
  deductionIds,
  handleCheckboxChange,
  deductions,
  payrollCycles,
  workingDaySystem,
  selectedPayrollCycleId,
  setSelectedPayrollCycleId,
  selectedLeaveSystemId,
  setSelectedLeaveSystemId,
  salaryHike,
  setSalaryHike,
  onClose,
  onSave,
}) {
  if (!isOpen) return null;

  const getEmploymentTypeCategory = (name) => {
    if (!name) return { icon: HiUsers, color: 'gray', category: 'General Employment' };
    
    const lowercaseName = name.toLowerCase();
    if (lowercaseName.includes('manager') || lowercaseName.includes('director') || lowercaseName.includes('executive')) 
      return { icon: FaCrown, color: 'purple', category: 'Management Role' };
    if (lowercaseName.includes('developer') || lowercaseName.includes('engineer') || lowercaseName.includes('technical')) 
      return { icon: FaTools, color: 'blue', category: 'Technical Role' };
    if (lowercaseName.includes('intern') || lowercaseName.includes('trainee') || lowercaseName.includes('junior')) 
      return { icon: FaGraduationCap, color: 'green', category: 'Entry Level' };
    if (lowercaseName.includes('contract') || lowercaseName.includes('freelance') || lowercaseName.includes('temporary')) 
      return { icon: FaBriefcase, color: 'orange', category: 'Contract Position' };
    if (lowercaseName.includes('full') || lowercaseName.includes('permanent')) 
      return { icon: FaBuilding, color: 'indigo', category: 'Permanent Position' };
    return { icon: FaUserTie, color: 'indigo', category: 'Standard Employment' };
  };

  const getTotalDeductionPercentage = () => {
    return deductionIds.reduce((total, dedId) => {
      const deduction = deductions.find(d => d.id === dedId);
      return total + (deduction ? deduction.percentage : 0);
    }, 0);
  };

  const getValidationMessage = () => {
    if (!empTypeName && !selectedPayrollCycleId && !selectedLeaveSystemId && !salaryHike) return null;
    if (!empTypeName) return "Employment type name is required";
    if (!selectedPayrollCycleId) return "Please select a payroll cycle";
    if (!selectedLeaveSystemId) return "Please select a working day system";
    if (!salaryHike) return "Salary hike percentage is required";
    
    const hike = parseFloat(salaryHike);
    if (isNaN(hike) || hike < 0) return "Salary hike must be a positive number";
    if (hike > 100) return "Salary hike cannot exceed 100%";
    
    return null;
  };

  const isFormValid = () => {
    if (!empTypeName || !selectedPayrollCycleId || !selectedLeaveSystemId || !salaryHike) return false;
    const hike = parseFloat(salaryHike);
    return !isNaN(hike) && hike >= 0 && hike <= 100;
  };

  const category = getEmploymentTypeCategory(empTypeName);
  const validationMessage = getValidationMessage();
  const totalDeductionPercentage = getTotalDeductionPercentage();

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

  const quickTemplates = [
    { name: "Full-time Employee", payrollCycle: payrollCycles[0]?.id || "", leaveSystem: workingDaySystem[0]?.id || "", hike: "5" },
    { name: "Contract Developer", payrollCycle: payrollCycles[0]?.id || "", leaveSystem: workingDaySystem[0]?.id || "", hike: "3" },
    { name: "Senior Manager", payrollCycle: payrollCycles[0]?.id || "", leaveSystem: workingDaySystem[0]?.id || "", hike: "8" },
    { name: "Intern", payrollCycle: payrollCycles[0]?.id || "", leaveSystem: workingDaySystem[0]?.id || "", hike: "2" }
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
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                      {editId ? (
                        <FaEdit className="text-indigo-600 dark:text-indigo-400 text-xl" />
                      ) : (
                        <HiPlus className="text-indigo-600 dark:text-indigo-400 text-xl" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {editId ? "Edit Employment Type" : "Create Employment Type"}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {editId ? "Update employment type configuration" : "Set up a new employment category with policies"}
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
              <div className="p-6 space-y-6 max-h-96 overflow-y-auto  [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
                transition-colors duration-300">
                {/* Quick Templates */}
         

                {/* Employment Type Name */}
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
                    <span>Employment Type Name</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={empTypeName}
                    onChange={(e) => setEmpTypeName(e.target.value)}
                    placeholder="e.g., Full-time Developer, Contract Manager"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  />
                  {empTypeName && (
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

                {/* Deductions Selection */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3"
                >
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div className="p-1.5 bg-red-100 dark:bg-red-900/20 rounded-md">
                      <FaMoneyBillWave className="text-red-600 dark:text-red-400 text-sm" />
                    </div>
                    <span>Select Deductions</span>
                    {deductionIds.length > 0 && (
                      <span className="text-red-600 dark:text-red-400 text-xs">
                        ({deductionIds.length} selected, {totalDeductionPercentage.toFixed(1)}% total)
                      </span>
                    )}
                  </label>
                  
                  {deductions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto  [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
                transition-colors duration-300">
                      {deductions.map((deduction) => (
                        <motion.label
                          key={deduction.id}
                          whileHover={{ scale: 1.001 }}
                          className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                            deductionIds.includes(deduction.id)
                              ? "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800"
                              : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-500"
                          }`}
                        >
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={deductionIds.includes(deduction.id)}
                              onChange={() => handleCheckboxChange(deduction.id)}
                              className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            {deductionIds.includes(deduction.id) && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center"
                              >
                                <HiCheck className="w-2 h-2 text-white" />
                              </motion.div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {deduction.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {deduction.percentage}% deduction
                            </div>
                          </div>
                        </motion.label>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                      No deductions available. Create deductions first.
                    </div>
                  )}
                </motion.div>

                {/* Payroll Cycle */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div className="p-1.5 bg-blue-100 dark:bg-blue-900/20 rounded-md">
                      <FaCalendarAlt className="text-blue-600 dark:text-blue-400 text-sm" />
                    </div>
                    <span>Payroll Cycle</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedPayrollCycleId}
                    onChange={(e) => setSelectedPayrollCycleId(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select Payroll Cycle</option>
                    {payrollCycles.map((cycle) => (
                      <option key={cycle.id} value={cycle.id}>
                        {cycle.name}
                      </option>
                    ))}
                  </select>
                </motion.div>

                {/* Working Day System */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div className="p-1.5 bg-purple-100 dark:bg-purple-900/20 rounded-md">
                      <FaUmbrellaBeach className="text-purple-600 dark:text-purple-400 text-sm" />
                    </div>
                    <span>Working Day System</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedLeaveSystemId}
                    onChange={(e) => setSelectedLeaveSystemId(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select Working Day System</option>
                    {workingDaySystem.map((system) => (
                      <option key={system.id} value={system.id}>
                        {system.name}
                      </option>
                    ))}
                  </select>
                </motion.div>

                {/* Salary Hike */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-2"
                >
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div className="p-1.5 bg-green-100 dark:bg-green-900/20 rounded-md">
                      <FaPercentage className="text-green-600 dark:text-green-400 text-sm" />
                    </div>
                    <span>Salary Hike Percentage</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={salaryHike}
                      onChange={(e) => setSalaryHike(e.target.value)}
                      placeholder="5.0"
                      min="0"
                      max="100"
                      step="0.1"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FaPercentage className="text-gray-400" />
                    </div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-start space-x-2">
                      <FaInfoCircle className="text-green-500 text-sm mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-green-700 dark:text-green-300">
                        Annual salary increase percentage for this employment type. Typical ranges: Entry level (2-5%), Mid-level (5-8%), Senior (8-15%).
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Summary Card */}
                {empTypeName && selectedPayrollCycleId && selectedLeaveSystemId && salaryHike && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-indigo-50 dark:bg-indigo-900/10 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                        <FaChartLine className="text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Configuration Summary
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                      <div className="bg-white dark:bg-gray-700 p-2 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Deductions</p>
                        <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                          {deductionIds.length} ({totalDeductionPercentage.toFixed(1)}%)
                        </p>
                      </div>
                      <div className="bg-white dark:bg-gray-700 p-2 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Salary Hike</p>
                        <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                          {salaryHike}%
                        </p>
                      </div>
                      <div className="bg-white dark:bg-gray-700 p-2 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Payroll</p>
                        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                          {payrollCycles.find(p => p.id === selectedPayrollCycleId)?.name || "Selected"}
                        </p>
                      </div>
                      <div className="bg-white dark:bg-gray-700 p-2 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Work System</p>
                        <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                          {workingDaySystem.find(w => w.id === selectedLeaveSystemId)?.name || "Selected"}
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
                    transition={{ delay: 0.8 }}
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
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {editId ? (
                      <>
                        <FaSave className="text-sm" />
                        <span>Update Employment Type</span>
                      </>
                    ) : (
                      <>
                        <HiPlus className="text-sm" />
                        <span>Create Employment Type</span>
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