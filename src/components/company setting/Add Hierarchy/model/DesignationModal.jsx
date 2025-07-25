// import React from "react";
// import { FaTimes } from "react-icons/fa";
// import BaseModal from "../../../common/BaseModal";

// export default function DesignationModal({
//   show,
//   onClose,
//   onSubmit,
//   register,
//   designationIdToEdit,
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
//           {designationIdToEdit ? "Edit Designation" : "Add Designation"}
//         </h2>
//         <form onSubmit={onSubmit}>
//           <label
//             htmlFor="designationName"
//             className="block mb-2 font-medium"
//           >
//             Designation Name
//           </label>
//           <input
//             id="designationName"
//             type="text"
//             placeholder="Enter Designation Name"
//             {...register("designationName", { required: true })}
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
//               {designationIdToEdit ? "Update" : "Add"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </BaseModal>
//   );
// }


import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaTimes, 
  FaEdit, 
  FaPlus, 
  FaSave,
  FaCheck,
  FaExclamationTriangle,
  FaUserTie,
  FaBriefcase,
  FaInfoCircle
} from "react-icons/fa";
import { 
  HiUserCircle,
  HiX,
  HiPlus,
  HiPencil,
  HiCheck,
  HiBadgeCheck
} from "react-icons/hi";
import BaseModal from "../../../common/BaseModal";

// ... all previous imports remain the same
import { FaClock } from "react-icons/fa"; // import FaClock for the icon

export default function DesignationModal({
  show,
  onClose,
  onSubmit,
  register,
  designationIdToEdit,
}) {
  if (!show) return null;

  const isEdit = designationIdToEdit;

  const modalVariants = { /* same */ };
  const overlayVariants = { /* same */ };

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
              {/* Header */}
              <div className={`p-6 border-b ${isEdit ? 'bg-orange-50 dark:bg-orange-900/10' : 'bg-purple-50 dark:bg-purple-900/10'} border-gray-200 dark:border-gray-700`}>
                {/* Same as before */}
              </div>

              {/* Content */}
              <form onSubmit={onSubmit} className="p-6 space-y-6">
                
                {/* Designation Name Input */}
                <motion.div className="space-y-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div className="p-1.5 bg-purple-100 dark:bg-purple-900/20 rounded-md">
                      <HiUserCircle className="text-purple-600 dark:text-purple-400 text-sm" />
                    </div>
                    <span>Designation Name</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Software Engineer"
                    {...register("designationName", { required: true })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                    <FaExclamationTriangle className="text-yellow-500" />
                    <span>Designation name is required</span>
                  </p>
                </motion.div>

                {/* Notice Period Input */}
                <motion.div className="space-y-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div className="p-1.5 bg-yellow-100 dark:bg-yellow-900/20 rounded-md">
                      <FaClock className="text-yellow-600 dark:text-yellow-400 text-sm" />
                    </div>
                    <span>Notice Period (days)</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g., 30"
                    {...register("noticePeriod", { required: true, min: 0 })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                    <FaInfoCircle className="text-blue-500" />
                    <span>Enter the notice period for this role in days</span>
                  </p>
                </motion.div>

                {/* Guidelines + Examples Sections (unchanged) */}

                {/* Buttons */}
                <motion.div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
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
                        : 'bg-purple-600 hover:bg-purple-700'
                    }`}
                  >
                    {isEdit ? (
                      <>
                        <FaSave className="text-sm" />
                        <span>Update Designation</span>
                      </>
                    ) : (
                      <>
                        <HiCheck className="text-sm" />
                        <span>Create Designation</span>
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


// export default function DesignationModal({
//   show,
//   onClose,
//   onSubmit,
//   register,
//   designationIdToEdit,
// }) {
//   if (!show) return null;

//   const isEdit = designationIdToEdit;

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

//   return (
//     <BaseModal isOpen={show} onClose={onClose}>
//       <AnimatePresence>
//         {show && (
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
//               <div className={`p-6 border-b border-gray-200 dark:border-gray-700 ${
//                 isEdit 
//                   ? 'bg-orange-50 dark:bg-orange-900/10' 
//                   : 'bg-purple-50 dark:bg-purple-900/10'
//               }`}>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className={`p-2 rounded-lg ${
//                       isEdit 
//                         ? 'bg-orange-100 dark:bg-orange-900/20' 
//                         : 'bg-purple-100 dark:bg-purple-900/20'
//                     }`}>
//                       {isEdit ? (
//                         <HiPencil className="text-orange-600 dark:text-orange-400 text-xl" />
//                       ) : (
//                         <HiPlus className="text-purple-600 dark:text-purple-400 text-xl" />
//                       )}
//                     </div>
//                     <div>
//                       <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//                         {isEdit ? "Edit Designation" : "Create Designation"}
//                       </h2>
//                       <p className="text-sm text-gray-600 dark:text-gray-400">
//                         {isEdit ? "Update designation details" : "Add a new job position to your organization"}
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
//               <form onSubmit={onSubmit} className="p-6 space-y-6">
                
//                 {/* Designation Name Input */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.1 }}
//                   className="space-y-2"
//                 >
//                   <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
//                     <div className="p-1.5 bg-purple-100 dark:bg-purple-900/20 rounded-md">
//                       <HiUserCircle className="text-purple-600 dark:text-purple-400 text-sm" />
//                     </div>
//                     <span>Designation Name</span>
//                     <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       placeholder="e.g., Software Engineer, HR Manager, Sales Executive"
//                       {...register("designationName", { required: true })}
//                       className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
//                     />
//                     <motion.div
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{ delay: 0.3 }}
//                       className="absolute inset-y-0 right-0 flex items-center pr-3"
//                     >
//                       <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                     </motion.div>
//                   </div>
//                   <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
//                     <FaExclamationTriangle className="text-yellow-500" />
//                     <span>Designation name is required</span>
//                   </p>
//                 </motion.div>

//                 {/* Info Section */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.2 }}
//                   className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-xl border border-purple-200 dark:border-purple-800"
//                 >
//                   <div className="flex items-start space-x-3">
//                     <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
//                       <FaUserTie className="text-purple-600 dark:text-purple-400" />
//                     </div>
//                     <div>
//                       <h3 className="text-sm font-medium text-purple-900 dark:text-purple-100 mb-1">
//                         Designation Guidelines
//                       </h3>
//                       <ul className="text-xs text-purple-700 dark:text-purple-300 space-y-1">
//                         <li>• Use standard job titles when possible</li>
//                         <li>• Be specific about the role and level</li>
//                         <li>• Maintain consistency across similar positions</li>
//                         <li>• Consider future growth and career paths</li>
//                       </ul>
//                     </div>
//                   </div>
//                 </motion.div>

//                 {/* Examples Section */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.25 }}
//                   className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-200 dark:border-blue-800"
//                 >
//                   <div className="flex items-start space-x-3">
//                     <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
//                       <FaBriefcase className="text-blue-600 dark:text-blue-400" />
//                     </div>
//                     <div>
//                       <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
//                         Common Designations
//                       </h3>
//                       <div className="flex flex-wrap gap-2">
//                         {[
//                           "Software Engineer",
//                           "Project Manager", 
//                           "HR Specialist",
//                           "Sales Manager",
//                           "Data Analyst",
//                           "UI/UX Designer"
//                         ].map((example, idx) => (
//                           <span
//                             key={idx}
//                             className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded-md"
//                           >
//                             {example}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>

//                 {/* Action Buttons */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 }}
//                   className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700"
//                 >
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     type="button"
//                     onClick={onClose}
//                     className="w-full sm:w-auto px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl font-medium transition-all duration-200"
//                   >
//                     Cancel
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     type="submit"
//                     className={`w-full sm:flex-1 flex items-center justify-center space-x-2 px-6 py-3 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl ${
//                       isEdit
//                         ? 'bg-orange-600 hover:bg-orange-700'
//                         : 'bg-purple-600 hover:bg-purple-700'
//                     }`}
//                   >
//                     {isEdit ? (
//                       <>
//                         <FaSave className="text-sm" />
//                         <span>Update Designation</span>
//                       </>
//                     ) : (
//                       <>
//                         <HiCheck className="text-sm" />
//                         <span>Create Designation</span>
//                       </>
//                     )}
//                   </motion.button>
//                 </motion.div>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </BaseModal>
//   );
// }