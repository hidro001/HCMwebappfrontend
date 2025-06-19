


// import React, { useState, useEffect } from "react";
// import useCategoryStore from "../../../../store/useCategoryStore";
// import ConfirmationDialog from "../../../common/ConfirmationDialog"; // Import the custom dialog
// import BaseModal from "../../../common/BaseModal"; // Adjust the path as needed

// const CategoryManagementModal = ({ isOpen, onClose }) => {
//   const { categories, fetchCategories, createCategory, deleteCategory, loading } =
//     useCategoryStore();
//   const [newCategoryName, setNewCategoryName] = useState("");
//   const [confirmationOpen, setConfirmationOpen] = useState(false);
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null);

//   useEffect(() => {
//     if (isOpen) {
//       fetchCategories();
//     }
//   }, [isOpen, fetchCategories]);

//   if (!isOpen) return null;

//   const handleAddCategory = async (e) => {
//     e.preventDefault();
//     if (!newCategoryName.trim()) return;
//     await createCategory(newCategoryName.trim());
//     setNewCategoryName("");
//   };

//   const confirmDelete = (id) => {
//     setSelectedCategoryId(id);
//     setConfirmationOpen(true);
//   };

//   const handleDelete = async () => {
//     if (selectedCategoryId) {
//       await deleteCategory(selectedCategoryId);
//       setConfirmationOpen(false);
//       setSelectedCategoryId(null);
//     }
//   };

//   return (
//     <BaseModal isOpen={isOpen} onClose={onClose}>
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
//         <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
//           Manage Categories
//         </h2>
//         <form onSubmit={handleAddCategory} className="mb-4">
//           <input
//             type="text"
//             value={newCategoryName}
//             onChange={(e) => setNewCategoryName(e.target.value)}
//             placeholder="New category name"
//             className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mb-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring focus:ring-blue-300"
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
//           >
//             Add Category
//           </button>
//         </form>
//         {loading ? (
//           <p>Loading categories...</p>
//         ) : (
//           <ul className="space-y-2 max-h-60 overflow-y-auto">
//             {categories.map((cat) => (
//               <li
//                 key={cat._id}
//                 className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-1"
//               >
//                 <span className="text-gray-800 dark:text-gray-100">{cat.name}</span>
//                 <button
//                   onClick={() => confirmDelete(cat._id)}
//                   className="text-red-500 hover:text-red-600"
//                 >
//                   Delete
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//         <div className="flex justify-end mt-4">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//       {/* Custom Confirmation Dialog */}
//       <ConfirmationDialog
//         open={confirmationOpen}
//         title="Confirm Deletion"
//         message="Are you sure you want to delete this category?"
//         onConfirm={handleDelete}
//         onCancel={() => setConfirmationOpen(false)}
//         confirmText="Delete"
//         cancelText="Cancel"
//       />
//     </BaseModal>
//   );
// };

// export default CategoryManagementModal;


import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaPlus,
  FaTrash,
  FaTags,
  FaSearch,
  FaEdit,
  FaCheckCircle,
  FaExclamationTriangle,
  FaFolder,
  FaFolderOpen
} from "react-icons/fa";
import {
  HiTag,
  HiX,
  HiPlus,
  HiTrash,
  HiSearch,
  HiPencil,
  HiCheck,
  HiExclamation
} from "react-icons/hi";
import useCategoryStore from "../../../../store/useCategoryStore";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import BaseModal from "../../../common/BaseModal";

const CategoryManagementModal = ({ isOpen, onClose }) => {
  const { categories, fetchCategories, createCategory, deleteCategory, loading } =
    useCategoryStore();
  
  const [newCategoryName, setNewCategoryName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen, fetchCategories]);

  if (!isOpen) return null;

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    
    setIsSubmitting(true);
    try {
      await createCategory(newCategoryName.trim());
      setNewCategoryName("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = (id, name) => {
    setSelectedCategoryId(id);
    setConfirmationOpen(true);
  };

  const handleDelete = async () => {
    if (selectedCategoryId) {
      await deleteCategory(selectedCategoryId);
      setConfirmationOpen(false);
      setSelectedCategoryId(null);
    }
  };

  const startEditing = (category) => {
    setEditingCategory(category._id);
    setEditName(category.name);
  };

  const cancelEditing = () => {
    setEditingCategory(null);
    setEditName("");
  };

  const saveEdit = async (id) => {
    if (!editName.trim()) return;
    // Assuming there's an updateCategory function in the store
    // await updateCategory(id, editName.trim());
    setEditingCategory(null);
    setEditName("");
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
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
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl max-h-[80vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-green-50 dark:bg-green-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <HiTag className="text-green-600 dark:text-green-400 text-xl" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Manage Categories
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Add, edit, and organize your policy categories
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
              <div className="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
                {/* Add New Category Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-200 dark:border-blue-800"
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <HiPlus className="text-blue-600 dark:text-blue-400" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">Add New Category</h3>
                  </div>
                  <form onSubmit={handleAddCategory} className="space-y-3">
                    <div className="flex space-x-3">
                      <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="Enter category name..."
                        className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        disabled={isSubmitting}
                      />
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={!newCategoryName.trim() || isSubmitting}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Adding...</span>
                          </>
                        ) : (
                          <>
                            <HiPlus className="text-sm" />
                            <span>Add</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                </motion.div>

                {/* Search and Stats */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search categories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  {/* Stats */}
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <FaFolder className="text-blue-500" />
                      <span>{categories.length} total</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaFolderOpen className="text-green-500" />
                      <span>{filteredCategories.length} showing</span>
                    </div>
                  </div>
                </div>

                {/* Categories List */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <FaTags className="text-green-600 dark:text-green-400" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Existing Categories
                    </h3>
                  </div>

                  {loading ? (
                    <div className="text-center py-8">
                      <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                      <p className="text-gray-600 dark:text-gray-400">Loading categories...</p>
                    </div>
                  ) : filteredCategories.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                    >
                      <FaTags className="mx-auto text-4xl text-gray-300 dark:text-gray-600 mb-3" />
                      <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-1">
                        {searchTerm ? "No categories found" : "No Categories Yet"}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-500">
                        {searchTerm 
                          ? "Try adjusting your search terms" 
                          : "Create your first category to get started"}
                      </p>
                    </motion.div>
                  ) : (
                    <div className="bg-white dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden">
                      <AnimatePresence>
                        {filteredCategories.map((category, index) => (
                          <motion.div
                            key={category._id}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ delay: index * 0.05 }}
                            className={`flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-600/50 transition-colors duration-200 ${
                              index !== filteredCategories.length - 1 ? 'border-b border-gray-200 dark:border-gray-600' : ''
                            }`}
                          >
                            <div className="flex items-center space-x-3 flex-1">
                              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                                <HiTag className="text-green-600 dark:text-green-400" />
                              </div>
                              
                              {editingCategory === category._id ? (
                                <div className="flex-1 flex items-center space-x-2">
                                  <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    autoFocus
                                  />
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => saveEdit(category._id)}
                                    className="p-2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200"
                                  >
                                    <HiCheck className="h-4 w-4" />
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={cancelEditing}
                                    className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                                  >
                                    <HiX className="h-4 w-4" />
                                  </motion.button>
                                </div>
                              ) : (
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-900 dark:text-white">
                                    {category.name}
                                  </h4>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Category ID: {category._id.slice(-8)}
                                  </p>
                                </div>
                              )}
                            </div>

                            {editingCategory !== category._id && (
                              <div className="flex items-center space-x-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => startEditing(category)}
                                  className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                                  title="Edit category"
                                >
                                  <HiPencil className="h-4 w-4" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => confirmDelete(category._id, category.name)}
                                  className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                                  title="Delete category"
                                >
                                  <HiTrash className="h-4 w-4" />
                                </motion.button>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <FaCheckCircle className="inline mr-1 text-green-500" />
                    Changes are saved automatically
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-medium transition-all duration-200"
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={confirmationOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this category? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setConfirmationOpen(false)}
        confirmText="Delete Category"
        cancelText="Cancel"
      />
    </BaseModal>
  );
};

export default CategoryManagementModal;