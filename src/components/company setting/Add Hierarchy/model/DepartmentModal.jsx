// import React from "react";
// import { FaTimes } from "react-icons/fa";
// import BaseModal from "../../../common/BaseModal";

// export default function DepartmentModal({
//   show,
//   onClose,
//   onSubmit,
//   register,
//   departmentIdToEdit,
// }) {
//   if (!show) return null;

//   return (
//     <BaseModal isOpen={show} onClose={onClose}>
//       <div className="relative w-96 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
//         >
//           <FaTimes />
//         </button>
//         <h2 className="text-lg font-semibold mb-4">
//           {departmentIdToEdit ? "Edit Department" : "Add Department"}
//         </h2>
//         <form onSubmit={onSubmit}>
//           <label className="block mb-2 font-medium" htmlFor="departmentName">
//             Department Name
//           </label>
//           <input
//             id="departmentName"
//             type="text"
//             placeholder="Enter Department Name"
//             {...register("departmentName", { required: true })}
//             className="w-full mb-4 px-3 py-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
//           />
//           <div className="flex justify-end space-x-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="border border-orange-500 text-orange-500 px-4 py-2 rounded hover:bg-orange-50 dark:hover:bg-gray-700"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//             >
//               {departmentIdToEdit ? "Update" : "Add"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </BaseModal>
//   );
// }



// import React from "react";
// import { FaTimes, FaBuilding, FaPlus, FaEdit } from "react-icons/fa";
// import BaseModal from "../../../common/BaseModal";

// export default function DepartmentModal({
//   show,
//   onClose,
//   onSubmit,
//   register,
//   departmentIdToEdit,
// }) {
//   if (!show) return null;

//   const isEdit = departmentIdToEdit;

//   return (
//     <BaseModal isOpen={show} onClose={onClose}>
//       <div className="relative w-full max-w-md mx-4 sm:mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in">
//         {/* Header */}
//         <div className="relative bg-gray-50 dark:bg-gray-900 px-6 py-8 border-b border-gray-200 dark:border-gray-700">
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700 rounded-xl transition-all duration-200 hover:scale-110"
//             aria-label="Close modal"
//           >
//             <FaTimes className="text-lg" />
//           </button>
          
//           <div className="flex items-center gap-4">
//             <div className={`p-4 rounded-2xl ${isEdit ? 'bg-orange-100 dark:bg-orange-900/30' : 'bg-blue-100 dark:bg-blue-900/30'}`}>
//               {isEdit ? (
//                 <FaEdit className="text-2xl text-orange-600 dark:text-orange-400" />
//               ) : (
//                 <FaPlus className="text-2xl text-blue-600 dark:text-blue-400" />
//               )}
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//                 {isEdit ? "Edit Department" : "Add Department"}
//               </h2>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//                 {isEdit ? "Update department information" : "Create a new department"}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Form Content */}
//         <div className="p-6">
//           <div onSubmit={onSubmit} className="space-y-6">
//             {/* Department Name Input */}
//             <div className="space-y-2">
//               <label 
//                 className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300" 
//                 htmlFor="departmentName"
//               >
//                 <FaBuilding className="text-blue-500 dark:text-blue-400" />
//                 Department Name
//               </label>
//               <div className="relative">
//                 <input
//                   id="departmentName"
//                   type="text"
//                   placeholder="Enter department name..."
//                   {...register("departmentName", { required: true })}
//                   className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
//                 />
//                 <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                   <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full opacity-50"></div>
//                 </div>
//               </div>
//               <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
//                 <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
//                 This field is required
//               </p>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-3 pt-4">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 onClick={onSubmit}
//                 className={`flex-1 px-6 py-3 font-medium rounded-xl text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl ${
//                   isEdit
//                     ? 'bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-500'
//                     : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500'
//                 }`}
//               >
//                 {isEdit ? "Update Department" : "Add Department"}
//               </button>
//             </div>
//           </div>
//         </div>

//       </div>
//     </BaseModal>
//   );
// }


import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaTimes, 
  FaBuilding, 
  FaPlus, 
  FaEdit, 
  FaSave,
  FaCheck,
  FaExclamationTriangle
} from "react-icons/fa";
import { 
  HiOfficeBuilding,
  HiX,
  HiPlus,
  HiPencil,
  HiCheck
} from "react-icons/hi";
import BaseModal from "../../../common/BaseModal";

export default function DepartmentModal({
  show,
  onClose,
  onSubmit,
  register,
  departmentIdToEdit,
}) {
  if (!show) return null;

  const isEdit = departmentIdToEdit;

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
    <BaseModal isOpen={show} onClose={onClose}>
      <AnimatePresence>
        {show && (
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
              <div className={`p-6 border-b border-gray-200 dark:border-gray-700 ${
                isEdit 
                  ? 'bg-orange-50 dark:bg-orange-900/10' 
                  : 'bg-blue-50 dark:bg-blue-900/10'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      isEdit 
                        ? 'bg-orange-100 dark:bg-orange-900/20' 
                        : 'bg-blue-100 dark:bg-blue-900/20'
                    }`}>
                      {isEdit ? (
                        <HiPencil className={`text-xl ${
                          isEdit 
                            ? 'text-orange-600 dark:text-orange-400' 
                            : 'text-blue-600 dark:text-blue-400'
                        }`} />
                      ) : (
                        <HiPlus className="text-blue-600 dark:text-blue-400 text-xl" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {isEdit ? "Edit Department" : "Create Department"}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {isEdit ? "Update department details" : "Add a new department to your organization"}
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
              <form onSubmit={onSubmit} className="p-6 space-y-6">
                
                {/* Department Name Input */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-2"
                >
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div className="p-1.5 bg-blue-100 dark:bg-blue-900/20 rounded-md">
                      <HiOfficeBuilding className="text-blue-600 dark:text-blue-400 text-sm" />
                    </div>
                    <span>Department Name</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g., Human Resources, Engineering, Sales"
                      {...register("departmentName", { required: true })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </motion.div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                    <FaExclamationTriangle className="text-yellow-500" />
                    <span>Department name is required</span>
                  </p>
                </motion.div>

                {/* Info Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-200 dark:border-blue-800"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <FaBuilding className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                        Department Guidelines
                      </h3>
                      <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                        <li>• Use clear, descriptive names</li>
                        <li>• Avoid abbreviations when possible</li>
                        <li>• Keep names consistent with company structure</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl font-medium transition-all duration-200"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className={`w-full sm:flex-1 flex items-center justify-center space-x-2 px-6 py-3 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl ${
                      isEdit
                        ? 'bg-orange-600 hover:bg-orange-700'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isEdit ? (
                      <>
                        <FaSave className="text-sm" />
                        <span>Update Department</span>
                      </>
                    ) : (
                      <>
                        <HiCheck className="text-sm" />
                        <span>Create Department</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </BaseModal>
  );
}