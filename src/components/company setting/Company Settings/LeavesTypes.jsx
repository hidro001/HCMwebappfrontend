import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaUsers, FaFileAlt, FaClock, FaCheckCircle, FaExclamationCircle, FaPlus, FaSearch, FaUmbrellaBeach,} from 'react-icons/fa';
import { HiPlus, HiPencil, HiTrash, HiSearch, HiEye, HiEyeOff} from 'react-icons/hi';
import LeaveType from "./models/LeaveTypeModel";
import leaveTypeStore from "../../../store/leaveTypeStore";
import ConfirmationDialog from "../../common/ConfirmationDialog.jsx";

export default function LeavesTypes() {
  const { leaveTypes, isLoading, error, fetchLeaveTypes, deleteLeaveType, toggleLeaveTypeStatus, clearError} = leaveTypeStore();

  const [expandedLeave, setExpandedLeave] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLeaveType, setEditingLeaveType] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);
  const [isToggling, setIsToggling] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [leaveToDelete, setLeaveToDelete] = useState(null);

  useEffect(() => {
    fetchLeaveTypes();
  }, [fetchLeaveTypes]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleAdd = () => {
    setEditingLeaveType(null);
    setIsModalOpen(true);
  };

  const handleEdit = (leaveType) => {
    setEditingLeaveType(leaveType);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingLeaveType(null);
    fetchLeaveTypes();
  };

  const handleDelete = (id, name) => {
    setLeaveToDelete({ id, name });
    setOpenConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (leaveToDelete) {
      setIsDeleting(leaveToDelete.id);
      try {
        const success = await deleteLeaveType(leaveToDelete.id);
        if (success) {
          await fetchLeaveTypes();
          toast.success('Leave type deleted successfully');
        }
      } catch (error) {
        console.error('Delete error:', error);
      } finally {
        setIsDeleting(null);
        setOpenConfirm(false);
        setLeaveToDelete(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setOpenConfirm(false);
    setLeaveToDelete(null);
  };

  const handleToggleStatus = async (id, currentStatus, name) => {
    setIsToggling(id);
    try {
      const result = await toggleLeaveTypeStatus(id);
      if (result) {
        await fetchLeaveTypes();
        const action = currentStatus ? 'deactivated' : 'activated';
        toast.success(`"${name}" has been ${action}`);
      }
    } catch (error) {
      console.error('Toggle error:', error);
    } finally {
      setIsToggling(null);
    }
  };

  const categories = [
    { key: 'all', label: 'All Leave Types', count: leaveTypes.length, color: 'blue' },
    { key: 'paid', label: 'Paid Leave', count: leaveTypes.filter(l => l.category === 'paid').length, color: 'green' },
    { key: 'unpaid', label: 'Unpaid Leave', count: leaveTypes.filter(l => l.category === 'unpaid').length, color: 'red' },
    { key: 'mixed', label: 'Mixed Benefits', count: leaveTypes.filter(l => l.category === 'mixed').length, color: 'purple' }
  ];

  const filteredLeaves = leaveTypes.filter(leave => {
    const matchesCategory = selectedCategory === 'all' || leave.category === selectedCategory;
    const matchesSearch = leave.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         leave.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (leaveId) => {
    setExpandedLeave(expandedLeave === leaveId ? null : leaveId);
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'paid': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20';
      case 'unpaid': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20';
      case 'mixed': return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/20';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getStatusColor = (isActive) => {
    return isActive 
      ? 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20' 
      : 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20';
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

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4"
          >
            <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
          </motion.div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-gray-600 dark:text-gray-300 text-lg font-medium">Loading leave types...</span>
            </div>
          </div>
        )}

        {!isLoading && (
          <>
            {/* Stats Cards */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-4 gap-6"
            >
              {categories.map(category => (
                <motion.button
                  key={category.key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    selectedCategory === category.key
                      ? `border-${category.color}-500 bg-${category.color}-50 dark:bg-${category.color}-900/20 text-${category.color}-600 dark:text-${category.color}-400 shadow-lg`
                      : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-md'
                  }`}
                >
                  <div className="text-3xl font-bold mb-2">{category.count}</div>
                  <div className="text-sm font-medium">{category.label}</div>
                </motion.button>
              ))}
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
                    placeholder="Search leave types..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Add Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdd}
                  disabled={isLoading}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <HiPlus className="text-lg" />
                  <span className="hidden sm:inline">Add Leave Type</span>
                  <span className="sm:hidden">Add</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Empty State */}
            {leaveTypes.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <FaUmbrellaBeach className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  No Leave Types Found
                </h3>
                <p className="text-gray-500 dark:text-gray-500 mb-6">
                  Get started by creating your first leave type and begin managing your organization's leave policies
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdd}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200"
                >
                  <FaPlus />
                  <span>Create First Leave Type</span>
                </motion.button>
              </motion.div>
            )}

            {/* No Results for Filter */}
            {leaveTypes.length > 0 && filteredLeaves.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <FaSearch className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  No Leave Types Found
                </h3>
                <p className="text-gray-500 dark:text-gray-500 mb-6">
                  No leave types match your current search and filter criteria
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
                  >
                    Clear Search
                  </button>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
                  >
                    Show All Categories
                  </button>
                </div>
              </motion.div>
            )}

            {/* Leave Types Cards Display */}
            {filteredLeaves.length > 0 && (
              <motion.div variants={itemVariants}>
                <div className="grid gap-6">
                  <AnimatePresence>
                    {filteredLeaves.map(leave => (
                      <motion.div
                        key={leave._id}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        whileHover="hover"
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                      >
                        {/* Leave Header */}
                        <div className="p-6 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
                          <div className="flex items-center justify-between">
                            <div 
                              className="flex items-center space-x-4 cursor-pointer flex-1"
                              onClick={() => toggleExpand(leave._id)}
                            >
                              <div className={`w-4 h-4 rounded-full ${leave.color || 'bg-blue-500'} shadow-lg`}></div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{leave.name}</h3>
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${getStatusColor(leave.isActive)}`}>
                                    {leave.isActive ? 'Active' : 'Inactive'}
                                  </span>
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getCategoryColor(leave.category)}`}>
                                    {leave.category}
                                  </span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">{leave.description}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                              <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-3 shadow border border-gray-200 dark:border-gray-600">
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">{leave.maxDays}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Max Days</div>
                              </div>
                              
                              {/* Action Buttons */}
                              <div className="flex items-center gap-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleToggleStatus(leave._id, leave.isActive, leave.name)}
                                  disabled={isToggling === leave._id}
                                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                                  title={leave.isActive ? 'Deactivate' : 'Activate'}
                                >
                                  {isToggling === leave._id ? (
                                    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                  ) : leave.isActive ? (
                                    <HiEye className="w-5 h-5 text-green-500" />
                                  ) : (
                                    <HiEyeOff className="w-5 h-5 text-red-500" />
                                  )}
                                </motion.button>
                                
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleEdit(leave._id)}
                                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                                  title="Edit"
                                >
                                  <HiPencil className="w-5 h-5" />
                                </motion.button>
                                
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleDelete(leave._id, leave.name)}
                                  disabled={isDeleting === leave._id}
                                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                                  title="Delete"
                                >
                                  {isDeleting === leave._id ? (
                                    <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                                  ) : (
                                    <HiTrash className="w-5 h-5" />
                                  )}
                                </motion.button>
                              </div>
                              
                              <motion.button 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => toggleExpand(leave._id)}
                                className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                {expandedLeave === leave._id ? (
                                  <FaChevronUp className="w-5 h-5" />
                                ) : (
                                  <FaChevronDown className="w-5 h-5" />
                                )}
                              </motion.button>
                            </div>
                          </div>
                        </div>

                        {/* Expanded Details */}
                        <AnimatePresence>
                          {expandedLeave === leave._id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="p-6 bg-gray-50 dark:bg-gray-700/30">
                                <div className="grid md:grid-cols-2 gap-6">
                                  {/* Left Column */}
                                  <div className="space-y-6">
                                    {/* Quick Info */}
                                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow border border-gray-200 dark:border-gray-600">
                                      <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                                        <FaClock className="w-4 h-4 text-blue-500 mr-2" />
                                        Quick Information
                                      </h4>
                                      <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                          <span className="text-gray-600 dark:text-gray-400">Approver:</span>
                                          <span className="font-medium text-gray-900 dark:text-white">{leave.approver}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                          <span className="text-gray-600 dark:text-gray-400">Advance Notice:</span>
                                          <span className="font-medium text-gray-900 dark:text-white">{leave.advanceNotice}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                          <span className="text-gray-600 dark:text-gray-400">Documents:</span>
                                          <div className="flex items-center">
                                            {leave.documentsRequired && leave.documentsRequired !== 'Not Required' ? (
                                              <>
                                                <FaFileAlt className="w-4 h-4 text-orange-500 mr-1" />
                                                <span className="text-sm text-orange-600 dark:text-orange-400">{leave.documentsRequired}</span>
                                              </>
                                            ) : (
                                              <>
                                                <FaCheckCircle className="w-4 h-4 text-green-500 mr-1" />
                                                <span className="text-sm text-green-600 dark:text-green-400">Not Required</span>
                                              </>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Eligibility */}
                                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow border border-gray-200 dark:border-gray-600">
                                      <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                                        <FaUsers className="w-4 h-4 text-green-500 mr-2" />
                                        Eligibility
                                      </h4>
                                      <p className="text-gray-700 dark:text-gray-300">{leave.eligibility}</p>
                                    </div>
                                  </div>

                                  {/* Right Column */}
                                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow border border-gray-200 dark:border-gray-600">
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                                      <FaExclamationCircle className="w-4 h-4 text-purple-500 mr-2" />
                                      Policies & Guidelines
                                    </h4>
                                    {leave.policies && leave.policies.length > 0 ? (
                                      <ul className="space-y-2">
                                        {leave.policies.map((policy, index) => (
                                          <li key={index} className="flex items-start">
                                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                            <span className="text-gray-700 dark:text-gray-300 text-sm">{policy}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    ) : (
                                      <p className="text-gray-500 dark:text-gray-400 text-sm">No specific policies defined.</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
      
      <LeaveType 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        editingLeaveType={editingLeaveType}
      />

      <ConfirmationDialog
        open={openConfirm}
        title="Confirm Deletion"
        message="Are you sure you want to delete this leave type? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="Yes, delete it!"
        cancelText="Cancel"
      />
    </motion.div>
  );
}