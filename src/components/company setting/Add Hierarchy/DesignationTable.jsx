import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {  
  FaPlus,
  FaUserTie,
  FaBriefcase,
  FaAward, FaClock
} from "react-icons/fa";
import { 
  HiUserCircle,
  HiPlus,
  HiPencil,
  HiTrash,
  HiSearch,

} from "react-icons/hi";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import SkeletonRows from "./SkeletonRows";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import FullScreenLoader from "../../common/FullScreenLoader";
import DesignationModal from "./model/DesignationModal";
import { useHierarchyStore } from "../../../store/useHierarchyStore";

export default function DesignationTable({ isLoading }) {
  const {
    designations,
    loading,
    error,
    fetchDesignations,
    addDesignation,
    updateDesignation,
    deleteDesignation,
  } = useHierarchyStore();

  const [showModal, setShowModal] = useState(false);
  const [designationIdToEdit, setDesignationIdToEdit] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [deleteData, setDeleteData] = useState({
    open: false,
    id: null,
    name: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("table"); 

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      designationName: "",
      noticePeriod: "",
    },
  });

  useEffect(() => {
    fetchDesignations();
  }, [fetchDesignations]);

  function handleOpenModal() {
    setShowModal(true);
    setDesignationIdToEdit(null);
    reset({ designationName: "", noticePeriod: "" });
  }

  function handleCloseModal() {
    setShowModal(false);
    setDesignationIdToEdit(null);
    reset({ designationName: "" });
  }

  function handleEdit(des) {
    setDesignationIdToEdit(des._id);
    reset({ designationName: des.designation,
      noticePeriod: des.notice_period || 0,
     });
    setShowModal(true);
  }

  function handleConfirmDelete(des) {
    setDeleteData({ open: true, id: des._id, name: des.designation });
  }

  async function onDeleteConfirm() {
    setActionLoading(true);
    try {
      await deleteDesignation(deleteData.id);
      toast.success("Designation deleted!");
    } catch (err) {
      toast.error(err?.message || "Failed to delete designation");
    } finally {
      setActionLoading(false);
      setDeleteData({ open: false, id: null, name: "" });
    }
  }

  function onDeleteCancel() {
    setDeleteData({ open: false, id: null, name: "" });
  }

  const onSubmit = async (data) => {
    const { designationName, noticePeriod } = data;
    setActionLoading(true);
    try {
      if (designationIdToEdit) {
        await updateDesignation(designationIdToEdit, designationName, Number(noticePeriod));
        toast.success("Designation updated successfully!");
      } else {
        await addDesignation(designationName, Number(noticePeriod));
        toast.success("Designation added successfully!");
      }
      handleCloseModal();
    } catch (err) {
      toast.error(err?.message || "Something went wrong!");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredDesignations = designations.filter(des =>
    des.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.02,
      y: -4,
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
      {actionLoading && <FullScreenLoader />}
      
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-xl">
              <HiUserCircle className="text-purple-600 dark:text-purple-400 text-2xl" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Designations
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Manage job roles and positions in your organization
          </p>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <FaUserTie className="text-purple-600 dark:text-purple-400 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {designations.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Designations
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <FaBriefcase className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {filteredDesignations.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Active Positions
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <FaAward className="text-green-600 dark:text-green-400 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {searchTerm ? 'Filtered' : 'All'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  View Mode
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Controls Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search designations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* View Toggle & Add Button */}
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle - Desktop only */}
              <div className="hidden lg:flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === "table"
                      ? "bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode("cards")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === "cards"
                      ? "bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  Cards
                </button>
              </div>

              {/* Add Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenModal}
                className="flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <HiPlus className="text-lg" />
                <span className="hidden sm:inline">Add Designation</span>
                <span className="sm:hidden">Add</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div variants={itemVariants}>
          {loading ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="animate-pulse space-y-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div key={idx} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : filteredDesignations.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUserTie className="text-3xl text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {searchTerm ? "No designations found" : "No designations yet"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                {searchTerm 
                  ? "Try adjusting your search criteria" 
                  : "Get started by creating your first designation"}
              </p>
              {!searchTerm && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenModal}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all duration-200"
                >
                  <FaPlus />
                  <span>Add First Designation</span>
                </motion.button>
              )}
            </motion.div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className={`hidden lg:${viewMode === "table" ? "block" : "hidden"}`}>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            #
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Designation Name
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Notice Period
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <AnimatePresence>
                          {filteredDesignations.map((des, idx) => (
                            <motion.tr
                              key={des._id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                              className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-full">
                                  {String(idx + 1).padStart(2, "0")}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-3">
                                  <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                                    <FaUserTie className="text-purple-600 dark:text-purple-400" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                      {des.designation}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {Number(des.notice_period) || 0} days
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex items-center justify-end space-x-2">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleEdit(des)}
                                    className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                                    title="Edit Designation"
                                  >
                                    <HiPencil className="h-4 w-4" />
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleConfirmDelete(des)}
                                    className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                                    title="Delete Designation"
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

              {/* Cards View - Mobile/Tablet and Desktop when selected */}
              <div className={`block lg:${viewMode === "cards" ? "block" : "hidden"}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {filteredDesignations.map((des, idx) => (
                      <motion.div
                        key={des._id}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        whileHover="hover"
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                      >
                        {/* Card Header */}
                        <div className="bg-purple-50 dark:bg-purple-900/10 p-6 border-b border-gray-100 dark:border-gray-700">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                              <FaUserTie className="text-purple-600 dark:text-purple-400 text-xl" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                {des.designation}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Position #{String(idx + 1).padStart(2, "0")}
                              </p>
                            </div>
                          </div>
                        </div>


                        {/* Card Content */}
                        <div className="p-6">
                          <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                              <FaClock className="text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Notice Period</p>
                              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                {Number(des.notice_period) || 0} days
                              </p>
                            </div>
                          </div>
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                                <FaBriefcase className="text-blue-600 dark:text-blue-400" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
                                <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                                  Active
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                                <FaAward className="text-green-600 dark:text-green-400" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Role Type</p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                  Professional
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex space-x-3 pt-6 border-t border-gray-100 dark:border-gray-700">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleEdit(des)}
                              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                              <HiPencil className="text-sm" />
                              <span>Edit</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleConfirmDelete(des)}
                              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                              <HiTrash className="text-sm" />
                              <span>Delete</span>
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Modals */}
      <DesignationModal
        show={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        designationIdToEdit={designationIdToEdit}
      />
      
      <ConfirmationDialog
        open={deleteData.open}
        title="Delete Designation"
        message={`Are you sure you want to delete "${deleteData.name}"? This action cannot be undone.`}
        onConfirm={onDeleteConfirm}
        onCancel={onDeleteCancel}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </motion.div>
  );
}