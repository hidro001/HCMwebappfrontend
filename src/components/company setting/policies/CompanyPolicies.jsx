

// import React, { useState, useEffect } from "react";
// import { toast } from "react-hot-toast";
// import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
// import usePolicyStore from "../../../store/usePolicyStore";
// import useCategoryStore from "../../../store/useCategoryStore";
// import PolicyModal from "./model/PolicyModal";
// import ConfirmationDialog from "../../common/ConfirmationDialog";
// import CategoryManagementModal from "./model/CategoryManagementModal";

// export default function CompanyPolicies() {
//   // Zustand store hooks
//   const { policies, fetchPolicies, deletePolicy, loading } = usePolicyStore();
//   const { categories, fetchCategories } = useCategoryStore();

//   // For controlling which tab is active (All, or a specific category)
//   const [selectedTab, setSelectedTab] = useState("All");

//   // For showing/hiding the PolicyModal & whether in "create" or "edit" mode
//   const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
//   const [policyForEdit, setPolicyForEdit] = useState(null);

//   // For the delete confirmation dialog
//   const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
//   const [policyToDelete, setPolicyToDelete] = useState(null);

//   // For Category Management Modal
//   const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

//   useEffect(() => {
//     fetchPolicies();
//     fetchCategories();
//   }, [fetchPolicies, fetchCategories]);

//   // Build dynamic TABS: Prepend "All" to the list of category names.
//   const dynamicTabs = ["All", ...categories.map((cat) => cat.name)];

//   // Filter policies by the selected category
//   const filteredPolicies =
//     selectedTab === "All"
//       ? policies
//       : policies.filter((item) => item.category === selectedTab);

//   // ----------- CREATE / EDIT MODAL -----------
//   // "Add New Policy" button => open the modal in "create" mode
//   const handleOpenCreatePolicy = () => {
//     setPolicyForEdit(null); // no policy => new
//     setIsPolicyModalOpen(true);
//   };

//   // "Edit" button on card => open the modal in "edit" mode
//   const handleOpenEditPolicy = (policy) => {
//     setPolicyForEdit(policy);
//     setIsPolicyModalOpen(true);
//   };

//   // Close the policy modal
//   const handleClosePolicyModal = () => {
//     setIsPolicyModalOpen(false);
//     setPolicyForEdit(null);
//   };

//   // ----------- DELETE CONFIRMATION -----------
//   const onDeletePolicy = (policy) => {
//     setPolicyToDelete(policy);
//     setDeleteConfirmDialogOpen(true);
//   };

//   const handleConfirmDelete = async () => {
//     if (policyToDelete) {
//       await deletePolicy(policyToDelete._id);
//       setPolicyToDelete(null);
//       setDeleteConfirmDialogOpen(false);
//     }
//   };

//   const handleCancelDelete = () => {
//     setPolicyToDelete(null);
//     setDeleteConfirmDialogOpen(false);
//   };

//   return (
//     <div className="p-4 dark:bg-gray-900 dark:text-white min-h-screen">
//       {/* Top Bar */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Company Policies</h1>
//         <div className="flex gap-4">
//           <button
//             className="flex items-center gap-2 bg-green-600 hover:bg-green-700 
//                        dark:bg-green-700 text-white px-4 py-2 rounded-md"
//             onClick={() => setIsCategoryModalOpen(true)}
//           >
//             <FaPlus />
//             Manage Categories
//           </button>
//           <button
//             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 
//                        dark:bg-blue-700 text-white px-4 py-2 rounded-md"
//             onClick={handleOpenCreatePolicy}
//           >
//             <FaPlus />
//             Add New Policy
//           </button>
//         </div>
//       </div>

//       {/* Tabs for filtering */}
//       <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700 pb-2 mb-6 overflow-x-auto">
//         {dynamicTabs.map((tab) => (
//           <button
//             key={tab}
//             className={`py-1 px-3 whitespace-nowrap focus:outline-none ${
//               selectedTab === tab
//                 ? "border-b-2 border-blue-600 dark:border-blue-500 font-semibold"
//                 : "text-gray-600 dark:text-gray-400"
//             }`}
//             onClick={() => setSelectedTab(tab)}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Policy Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {filteredPolicies.map((policy) => (
//           <div
//             key={policy._id}
//             className="border border-gray-200 dark:border-gray-700 
//                        rounded-lg shadow-sm bg-white dark:bg-gray-800 overflow-hidden"
//           >
//             <img
//               src={policy.coverImage}
//               alt={policy.title}
//               className="w-full h-40 object-cover"
//             />
//             <div className="p-4">
//               <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
//                 {policy.title}
//               </h2>
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 {policy.category} 
//                 {/* | {policy.department} */}
//               </p>
//               <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
//                 {policy.description}
//               </p>

//               <div className="flex items-center gap-2 justify-between mt-4">
//                 {/* View Policy */}
//                 <button
//                   onClick={() => window.open(policy.pdfUrl, "_blank")}
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 
//                              rounded-md"
//                 >
//                   View
//                 </button>

//                 {/* EDIT Button (In Red) */}
//                 <button
//                   onClick={() => handleOpenEditPolicy(policy)}
//                   className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 
//                              rounded-md flex items-center gap-1"
//                 >
//                   <FaEdit />
//                   Edit
//                 </button>

//                 {/* DELETE Button */}
//                 <button
//                   onClick={() => onDeletePolicy(policy)}
//                   className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 
//                              rounded-md flex items-center gap-1"
//                 >
//                   <FaTrash />
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal for Adding/Editing Policy */}
//       <PolicyModal
//         isOpen={isPolicyModalOpen}
//         onClose={handleClosePolicyModal}
//         policy={policyForEdit} // if null => "create mode"; if not null => "edit mode"
//       />

//       {/* Confirmation Dialog for Delete */}
//       <ConfirmationDialog
//         open={deleteConfirmDialogOpen}
//         title="Confirm Delete"
//         message="Are you sure you want to delete this policy?"
//         onConfirm={handleConfirmDelete}
//         onCancel={handleCancelDelete}
//         confirmText="Yes, Delete"
//         cancelText="Cancel"
//       />

//       {/* Modal for Managing Categories */}
//       <CategoryManagementModal
//         isOpen={isCategoryModalOpen}
//         onClose={() => setIsCategoryModalOpen(false)}
//       />
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaEye,
  FaFileAlt,
  FaTags,
  FaSearch,
  FaFilter,
  FaDownload,
  FaShare,
  FaCog,
  FaFolder,
  FaCalendarAlt,
  FaUser,
  FaGlobe
} from "react-icons/fa";
import {
  HiDocumentText,
  HiPlus,
  HiPencil,
  HiTrash,
  HiEye,
  HiTag,
  HiSearch,
  HiFilter,
  HiCog
} from "react-icons/hi";
import usePolicyStore from "../../../store/usePolicyStore";
import useCategoryStore from "../../../store/useCategoryStore";
import PolicyModal from "./model/PolicyModal";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import CategoryManagementModal from "./model/CategoryManagementModal";

export default function CompanyPolicies() {
  // Zustand store hooks
  const { policies, fetchPolicies, deletePolicy, loading } = usePolicyStore();
  const { categories, fetchCategories } = useCategoryStore();

  // For controlling which tab is active (All, or a specific category)
  const [selectedTab, setSelectedTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  // For showing/hiding the PolicyModal & whether in "create" or "edit" mode
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [policyForEdit, setPolicyForEdit] = useState(null);

  // For the delete confirmation dialog
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [policyToDelete, setPolicyToDelete] = useState(null);

  // For Category Management Modal
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  useEffect(() => {
    fetchPolicies();
    fetchCategories();
  }, [fetchPolicies, fetchCategories]);

  // Build dynamic TABS: Prepend "All" to the list of category names.
  const dynamicTabs = ["All", ...categories.map((cat) => cat.name)];

  // Filter policies by the selected category and search term
  const filteredPolicies = policies.filter((policy) => {
    const matchesCategory = selectedTab === "All" || policy.category === selectedTab;
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // ----------- CREATE / EDIT MODAL -----------
  const handleOpenCreatePolicy = () => {
    setPolicyForEdit(null);
    setIsPolicyModalOpen(true);
  };

  const handleOpenEditPolicy = (policy) => {
    setPolicyForEdit(policy);
    setIsPolicyModalOpen(true);
  };

  const handleClosePolicyModal = () => {
    setIsPolicyModalOpen(false);
    setPolicyForEdit(null);
  };

  // ----------- DELETE CONFIRMATION -----------
  const onDeletePolicy = (policy) => {
    setPolicyToDelete(policy);
    setDeleteConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (policyToDelete) {
      await deletePolicy(policyToDelete._id);
      setPolicyToDelete(null);
      setDeleteConfirmDialogOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setPolicyToDelete(null);
    setDeleteConfirmDialogOpen(false);
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Unknown';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.02,
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 lg:p-8"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
              <HiDocumentText className="text-blue-600 dark:text-blue-400 text-2xl" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Company Policies
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Manage and organize your company's policies, procedures, and documentation
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <FaFileAlt className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {policies.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Policies
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <FaTags className="text-green-600 dark:text-green-400 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {categories.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Categories
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <FaFolder className="text-purple-600 dark:text-purple-400 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {filteredPolicies.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Current View
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Controls Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search policies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="hidden md:flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === "list"
                      ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  List
                </button>
              </div>

              {/* Manage Categories Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCategoryModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <HiTag className="text-lg" />
                <span className="hidden sm:inline">Manage Categories</span>
                <span className="sm:hidden">Categories</span>
              </motion.button>

              {/* Add Policy Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenCreatePolicy}
                className="flex items-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <HiPlus className="text-lg" />
                <span className="hidden sm:inline">Add New Policy</span>
                <span className="sm:hidden">Add</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex space-x-1 overflow-x-auto">
            {dynamicTabs.map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedTab(tab)}
                className={`px-6 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                  selectedTab === tab
                    ? "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                {tab}
                {tab !== "All" && (
                  <span className="ml-2 px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 rounded-full">
                    {policies.filter(p => p.category === tab).length}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Policy Content */}
        <motion.div variants={itemVariants}>
          {loading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading policies...</p>
            </div>
          ) : filteredPolicies.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <FaFileAlt className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                {searchTerm ? "No policies found" : "No Policies Available"}
              </h3>
              <p className="text-gray-500 dark:text-gray-500 mb-6">
                {searchTerm 
                  ? "Try adjusting your search terms" 
                  : "Start by creating your first company policy"}
              </p>
              {!searchTerm && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenCreatePolicy}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200"
                >
                  <FaPlus />
                  <span>Create First Policy</span>
                </motion.button>
              )}
            </motion.div>
          ) : (
            <>
              {/* Grid View */}
              <div className={`${viewMode === "list" ? "hidden" : "block"}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {filteredPolicies.map((policy) => (
                      <motion.div
                        key={policy._id}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        whileHover="hover"
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden group"
                      >
                        {/* Policy Image */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={policy.coverImage || "/api/placeholder/400/200"}
                            alt={policy.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute top-4 right-4">
                            <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full">
                              {policy.category}
                            </div>
                          </div>
                        </div>

                        {/* Policy Content */}
                        <div className="p-6 space-y-4">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
                              {policy.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                              {policy.description}
                            </p>
                          </div>

                          {/* Policy Meta */}
                          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-1">
                              <FaCalendarAlt />
                              <span>{formatDate(policy.createdAt)}</span>
                            </div>
                            {policy.department && (
                              <div className="flex items-center space-x-1">
                                <FaUser />
                                <span>{policy.department}</span>
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => window.open(policy.pdfUrl, "_blank")}
                              className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 text-sm"
                            >
                              <HiEye className="text-sm" />
                              <span>View</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleOpenEditPolicy(policy)}
                              className="flex items-center justify-center px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200"
                            >
                              <HiPencil className="text-sm" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => onDeletePolicy(policy)}
                              className="flex items-center justify-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200"
                            >
                              <HiTrash className="text-sm" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* List View */}
              <div className={`${viewMode === "grid" ? "hidden" : "block"}`}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Policy
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Created
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <AnimatePresence>
                          {filteredPolicies.map((policy) => (
                            <motion.tr
                              key={policy._id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                              className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-3">
                                  <img
                                    src={policy.coverImage || "/api/placeholder/60/60"}
                                    alt={policy.title}
                                    className="w-12 h-12 object-cover rounded-lg"
                                  />
                                  <div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                      {policy.title}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                                      {policy.description}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full">
                                  {policy.category}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                {formatDate(policy.createdAt)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex items-center justify-end space-x-2">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => window.open(policy.pdfUrl, "_blank")}
                                    className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                                  >
                                    <HiEye className="h-4 w-4" />
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleOpenEditPolicy(policy)}
                                    className="p-2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200"
                                  >
                                    <HiPencil className="h-4 w-4" />
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => onDeletePolicy(policy)}
                                    className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                                  >
                                    <HiTrash className="h-4 w-4" />
                                  </motion.button>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Modals */}
      <PolicyModal
        isOpen={isPolicyModalOpen}
        onClose={handleClosePolicyModal}
        policy={policyForEdit}
      />

      <ConfirmationDialog
        open={deleteConfirmDialogOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this policy? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="Yes, Delete"
        cancelText="Cancel"
      />

      <CategoryManagementModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      />
    </motion.div>
  );
}