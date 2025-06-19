// import React from "react";
// import { FaTimes } from "react-icons/fa";
// import { availablePermission } from "../../../../service/availablePermissions";
// import BaseModal from "../../../common/BaseModal";

// export default function RolePermissionModal({
//   show,
//   onClose,
//   isEditing,
//   roleName,
//   setRoleName,
//   permissions,
//   onTogglePerm,
//   onSave,
// }) {
//   if (!show) return null;

//   return (
//     <BaseModal isOpen={show} onClose={onClose}>
//       <div className="relative w-96 max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
//         >
//           <FaTimes />
//         </button>
//         <h2 className="text-lg font-semibold mb-4">
//           {isEditing ? `Edit Role (${roleName})` : `View Role (${roleName})`}
//         </h2>
//         {isEditing && (
//           <>
//             <label className="block mb-2 font-medium" htmlFor="editRoleName">
//               Role Name
//             </label>
//             <input
//               id="editRoleName"
//               type="text"
//               placeholder="Enter Role Name"
//               value={roleName}
//               onChange={(e) => setRoleName(e.target.value)}
//               className="w-full mb-4 px-3 py-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
//             />
//           </>
//         )}
//         <p className="font-medium mb-2">Permissions</p>
//         <div className="space-y-2 mb-4">
//           {availablePermission.map((perm) => {
//             const isChecked = permissions.some(
//               (p) => p.value === perm.permission
//             );
//             return (
//               <label key={perm.permission} className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   className="w-4 h-4 accent-blue-500"
//                   checked={isChecked}
//                   onChange={() => {
//                     if (isEditing) {
//                       onTogglePerm(perm);
//                     }
//                   }}
//                   disabled={!isEditing}
//                 />
//                 <span className="dark:text-gray-100 text-gray-800">{perm.name}</span>
//               </label>
//             );
//           })}
//         </div>
//         <div className="flex justify-end space-x-4">
//           <button
//             onClick={onClose}
//             className="border border-orange-500 text-orange-500 px-4 py-2 rounded hover:bg-orange-50 dark:hover:bg-gray-700"
//           >
//             {isEditing ? "Cancel" : "Close"}
//           </button>
//           {isEditing && (
//             <button
//               onClick={onSave}
//               className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//             >
//               Save
//             </button>
//           )}
//         </div>
//       </div>
//     </BaseModal>
//   );
// }



import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaTimes, 
  FaEdit, 
  FaEye, 
  FaSave,
  FaCheck,
  FaExclamationTriangle,
  FaShieldAlt,
  FaKey,
  FaLock,
  FaUnlock,
  FaSearch,
  FaFilter
} from "react-icons/fa";
import { 
  HiShieldCheck,
  HiX,
  HiPlus,
  HiPencil,
  HiCheck,
  HiEye,
  HiKey,
  HiLockClosed,
  HiLockOpen
} from "react-icons/hi";
import { availablePermission } from "../../../../service/availablePermissions";
import BaseModal from "../../../common/BaseModal";

export default function RolePermissionModal({
  show,
  onClose,
  isEditing,
  roleName,
  setRoleName,
  permissions,
  onTogglePerm,
  onSave,
}) {
  if (!show) return null;

  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterType, setFilterType] = React.useState("all"); // all, assigned, unassigned

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

  // Filter permissions based on search and filter type
  const filteredPermissions = availablePermission.filter(perm => {
    const matchesSearch = perm.name.toLowerCase().includes(searchTerm.toLowerCase());
    const isAssigned = permissions.some(p => p.value === perm.permission);
    
    if (filterType === "assigned") return matchesSearch && isAssigned;
    if (filterType === "unassigned") return matchesSearch && !isAssigned;
    return matchesSearch;
  });

  const assignedCount = permissions.length;
  const totalCount = availablePermission.length;

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
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className={`p-6 border-b border-gray-200 dark:border-gray-700 ${
                isEditing 
                  ? 'bg-orange-50 dark:bg-orange-900/10' 
                  : 'bg-green-50 dark:bg-green-900/10'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      isEditing 
                        ? 'bg-orange-100 dark:bg-orange-900/20' 
                        : 'bg-green-100 dark:bg-green-900/20'
                    }`}>
                      {isEditing ? (
                        <HiPencil className="text-orange-600 dark:text-orange-400 text-xl" />
                      ) : (
                        <HiEye className="text-green-600 dark:text-green-400 text-xl" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {isEditing ? "Edit Role Permissions" : "View Role Permissions"}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {isEditing ? "Modify role access and permissions" : "Review role access and permissions"}
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
              <div className="flex flex-col h-full max-h-[calc(90vh-200px)]">
                
                {/* Role Name Section */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  {isEditing ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="space-y-2"
                    >
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <div className="p-1.5 bg-orange-100 dark:bg-orange-900/20 rounded-md">
                          <HiShieldCheck className="text-orange-600 dark:text-orange-400 text-sm" />
                        </div>
                        <span>Role Name</span>
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter role name"
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      />
                    </motion.div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                        <HiShieldCheck className="text-green-600 dark:text-green-400 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {roleName}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {assignedCount} of {totalCount} permissions assigned
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Stats and Controls */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 space-y-4">
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {assignedCount}
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        Assigned
                      </p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                        {totalCount - assignedCount}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Available
                      </p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/10 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {Math.round((assignedCount / totalCount) * 100)}%
                      </p>
                      <p className="text-xs text-purple-600 dark:text-purple-400">
                        Coverage
                      </p>
                    </div>
                  </div>

                  {/* Search and Filter */}
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                    {/* Search */}
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search permissions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    {/* Filter */}
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="all">All Permissions</option>
                      <option value="assigned">Assigned Only</option>
                      <option value="unassigned">Available Only</option>
                    </select>
                  </div>
                </div>

                {/* Permissions List */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-3">
                    {filteredPermissions.length === 0 ? (
                      <div className="text-center py-8">
                        <FaKey className="mx-auto text-4xl text-gray-300 dark:text-gray-600 mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">
                          No permissions found matching your criteria
                        </p>
                      </div>
                    ) : (
                      filteredPermissions.map((perm) => {
                        const isChecked = permissions.some(p => p.value === perm.permission);
                        return (
                          <motion.div
                            key={perm.permission}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                              isChecked
                                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                                : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-lg ${
                                isChecked 
                                  ? 'bg-green-100 dark:bg-green-900/30' 
                                  : 'bg-gray-100 dark:bg-gray-600'
                              }`}>
                                {isChecked ? (
                                  <HiLockOpen className="text-green-600 dark:text-green-400" />
                                ) : (
                                  <HiLockClosed className="text-gray-500 dark:text-gray-400" />
                                )}
                              </div>
                              <div>
                                <p className={`font-medium ${
                                  isChecked 
                                    ? 'text-green-900 dark:text-green-100' 
                                    : 'text-gray-900 dark:text-gray-100'
                                }`}>
                                  {perm.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  Permission ID: {perm.permission}
                                </p>
                              </div>
                            </div>
                            
                            {isEditing ? (
                              <motion.label
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative inline-flex items-center cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  className="sr-only peer"
                                  checked={isChecked}
                                  onChange={() => onTogglePerm(perm)}
                                />
                                <div className={`relative w-11 h-6 rounded-full peer transition-colors duration-200 ${
                                  isChecked 
                                    ? 'bg-green-600' 
                                    : 'bg-gray-300 dark:bg-gray-600'
                                }`}>
                                  <div className={`absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                                    isChecked ? 'translate-x-5' : 'translate-x-0'
                                  }`}></div>
                                </div>
                              </motion.label>
                            ) : (
                              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                isChecked
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                                  : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                              }`}>
                                {isChecked ? 'Granted' : 'Denied'}
                              </div>
                            )}
                          </motion.div>
                        );
                      })
                    )}
                  </div>
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
                      {isEditing ? "Cancel" : "Close"}
                    </motion.button>
                    {isEditing && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onSave}
                        className="w-full sm:flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <FaSave className="text-sm" />
                        <span>Save Changes</span>
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </BaseModal>
  );
}