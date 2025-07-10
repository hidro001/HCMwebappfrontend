import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {  
  FaMinus, 
  FaSave, 
  FaEye, 
  FaEdit, 
  FaCheckCircle,
  FaUndo,
} from 'react-icons/fa';
import {
  HiX,
  HiCheck,
  HiPlus,
  HiEye,
  HiEyeOff,
  HiCalendar,
  HiClock,
  HiUsers,
  HiDocumentText,
  HiColorSwatch,
  HiInformationCircle,
  HiArrowRight
} from 'react-icons/hi';
import BaseModal from '../../../common/BaseModal';
import leaveTypeStore from '../../../../store/leaveTypeStore.js';

const LeaveType = ({ isOpen, onClose, editingLeaveType = null }) => {
  
  const {
    leaveTypes,
    isLoading,
    error,
    fetchLeaveTypes,
    fetchLeaveTypeById,
    addOrUpdateLeaveType,
    deleteLeaveType,
    toggleLeaveTypeStatus,
    clearError
  } = leaveTypeStore();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'paid',
    maxDays: 0,
    isCarryForward: false, 
    documentsRequired: '',
    advanceNotice: '',
    eligibility: '',
    policies: [''],
    color: 'bg-blue-500',
    isActive: true
  });

  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const colorOptions = [
    { value: 'bg-blue-500', label: 'Blue', color: 'bg-blue-500', ring: 'ring-blue-500' },
    { value: 'bg-green-500', label: 'Green', color: 'bg-green-500', ring: 'ring-green-500' },
    { value: 'bg-red-500', label: 'Red', color: 'bg-red-500', ring: 'ring-red-500' },
    { value: 'bg-purple-500', label: 'Purple', color: 'bg-purple-500', ring: 'ring-purple-500' },
    { value: 'bg-orange-500', label: 'Orange', color: 'bg-orange-500', ring: 'ring-orange-500' },
    { value: 'bg-pink-500', label: 'Pink', color: 'bg-pink-500', ring: 'ring-pink-500' },
    { value: 'bg-indigo-500', label: 'Indigo', color: 'bg-indigo-500', ring: 'ring-indigo-500' },
    { value: 'bg-gray-500', label: 'Gray', color: 'bg-gray-500', ring: 'ring-gray-500' }
  ];

  const steps = [
    { id: 1, name: 'Basic Info', icon: HiInformationCircle },
    { id: 2, name: 'Policies', icon: HiDocumentText },
    { id: 3, name: 'Review', icon: HiCheck }
  ];

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'paid',
      maxDays: 0,
      isCarryForward: false,
      documentsRequired: '',
      advanceNotice: '',
      eligibility: '',
      policies: [''],
      color: 'bg-blue-500',
      isActive: true
    });
    setErrors({});
    setShowPreview(false);
    setEditingId(null);
    setIsLoadingEdit(false);
    setCurrentStep(1);
  };

  useEffect(() => {
    if (isOpen) {
      fetchLeaveTypes();
      clearError();
    }
  }, [isOpen, fetchLeaveTypes, clearError]);

  useEffect(() => {
    const loadEditData = async () => {
      if (editingLeaveType && isOpen) {
        setIsLoadingEdit(true);
        
        try {
            const fullData = await fetchLeaveTypeById(editingLeaveType);
            if (fullData) {
              populateForm(fullData);
            }
          
        } catch (error) {
          console.error(' Error loading edit data:', error);
        } finally {
          setIsLoadingEdit(false);
        }
      } else if (!editingLeaveType && isOpen) {
        resetForm();
      }
    };

    loadEditData();
  }, [editingLeaveType, isOpen, fetchLeaveTypeById]);

  const populateForm = (data) => {
    setFormData({
      name: data.name || '',
      description: data.description || '',
      category: data.category || 'paid',
      maxDays: data.maxDays || 0,
      isCarryForward: data.isCarryForward || false,
      documentsRequired: data.documentsRequired === 'Not Required' ? '' : (data.documentsRequired || ''),
      advanceNotice: data.advanceNotice || '',
      eligibility: data.eligibility || '',
      policies: data.policies && data.policies.length > 0 ? data.policies : [''],
      color: data.color || 'bg-blue-500',
      isActive: data.isActive !== undefined ? data.isActive : true
    });
    setEditingId(data._id);
  };

  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [formData, error, clearError]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
     ...prev,
    [name]:
      type === 'checkbox' ? checked :
      name === 'maxDays' ? parseFloat(value) :
      value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    if (name === 'category' && value !== 'paid') {
      setFormData(prev => ({ ...prev, isCarryForward: false }));
    }
  };

  console.log('isCarryForward:', formData.isCarryForward);


  const handlePolicyChange = (index, value) => {
    const newPolicies = [...formData.policies];
    newPolicies[index] = value;
    setFormData(prev => ({ ...prev, policies: newPolicies }));
  };

  const addPolicy = () => {
    setFormData(prev => ({
      ...prev,
      policies: [...prev.policies, '']
    }));
  };

  const removePolicy = (index) => {
    if (formData.policies.length > 1) {
      const newPolicies = formData.policies.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, policies: newPolicies }));
    }
  };

  const extractDaysFromAdvanceNotice = (advanceNotice) => {
    if (!advanceNotice) return 0;
    
    const lowerNotice = advanceNotice?.toLowerCase();
    
    if (lowerNotice.includes('immediate') || lowerNotice.includes('same day')) {
      return 0;
    }
    const dayMatch = lowerNotice.match(/(\d+)\s*days?/);
    if (dayMatch) {
      return parseInt(dayMatch[1], 10);
    }
    const weekMatch = lowerNotice.match(/(\d+)\s*weeks?/);
    if (weekMatch) {
      return parseInt(weekMatch[1], 10) * 7;
    }
    const monthMatch = lowerNotice.match(/(\d+)\s*months?/);
    if (monthMatch) {
      return parseInt(monthMatch[1], 10) * 30;
    }  
    return 0;
  };

 const validateForm = () => {
  const newErrors = {};
  if (!formData.name.trim()) newErrors.name = 'Leave type name is required';
  if (!formData.description.trim()) newErrors.description = 'Description is required';
  if (!formData.maxDays || formData.maxDays <= 0) newErrors.maxDays = 'Valid maximum days is required';

  // if (!formData.advanceNotice.trim()) newErrors.advanceNotice = 'Advance notice is required';

    if (!formData.advanceNotice.trim()) {
    newErrors.advanceNotice = 'Advance notice is required';
  } else {
    const parsedDays = extractDaysFromAdvanceNotice(formData.advanceNotice);
    if (isNaN(parsedDays)) {
      newErrors.advanceNotice = 'Please enter a valid notice like "2 weeks", "1 month", or "Immediate"';
    }
  }

  if (!formData.eligibility.trim()) newErrors.eligibility = 'Eligibility criteria is required';

  const validPolicies = formData.policies.filter(policy => policy.trim());
  if (validPolicies.length === 0) newErrors.policies = 'At least one policy is required';

  setErrors(newErrors);
  console.log("Validation Errors:", newErrors);
  return Object.keys(newErrors).length === 0;
};


  const handleSubmit = async () => {
    const isValid = validateForm();

  if (!isValid) {
    return;
  }
    setIsSubmitting(true);
    try {
      console.log(formData.maxDays)
      const submitData = {
        ...formData,
        maxDays: parseFloat(formData.maxDays),
        isCarryForward: formData.isCarryForward || false,
        policies: formData.policies.filter(policy => policy.trim()),
        documentsRequired: formData.documentsRequired || 'Not Required'
      };
      if (editingId) {
        submitData._id = editingId;
      }

      const result = await addOrUpdateLeaveType(submitData);
     
      if (result) {
        resetForm();
        await fetchLeaveTypes(); 
        onClose(); 
      }
       onClose(); 
    } catch (error) {
      console.error(' Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const editLeaveType = (leave) => {
    populateForm(leave);
  };

  const handleDeleteLeaveType = async (id) => {
    if (window.confirm('Are you sure you want to delete this leave type?')) {
      const success = await deleteLeaveType(id);
      if (success) {
        await fetchLeaveTypes();
      }
    }
  };

  const handleToggleActiveStatus = async (id) => {
    const success = await toggleLeaveTypeStatus(id);
    if (success) {
      await fetchLeaveTypes();
    }
  };

  const isStepComplete = (step) => {
    switch (step) {
      case 1:
        return formData.name && formData.description && formData.maxDays && formData.advanceNotice && formData.eligibility;
      case 2:
        return formData.policies.filter(p => p.trim()).length > 0;
      case 3:
        return true;
      default:
        return false;
    }
  };

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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 ">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-2"
              >
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <div className="p-1.5 bg-blue-100 dark:bg-blue-900/20 rounded-md">
                    <HiCalendar className="text-blue-600 dark:text-blue-400 text-sm" />
                  </div>
                  <span>Leave Type Name</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isLoadingEdit}
                  className={`w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="e.g., Annual Leave, Sick Leave"
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <div className="p-1.5 bg-green-100 dark:bg-green-900/20 rounded-md">
                    <HiColorSwatch className="text-green-600 dark:text-green-400 text-sm" />
                  </div>
                  <span>Category</span>
                  <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  disabled={isLoadingEdit}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="paid">Paid Leave</option>
                  <option value="unpaid">Unpaid Leave</option>
                  <option value="mixed">Mixed Benefits</option>
                </select>
              </motion.div>

              
            </div>
              {formData.category === 'paid' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="  flex items-center justify-center"
                >
                  <input
                    type="checkbox"
                    name="isCarryForward"
                    value={formData.isCarryForward}
                    onChange={handleInputChange}
                    disabled={isLoadingEdit}
                    className={` mx-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                      errors.isCarryForward ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                   
                  />
                  <label className="w-full flex items-center space-x-2 text-xs  text-gray-700 dark:text-gray-300">
                    {/* <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/20 rounded-md">
                      <HiArrowRight className="text-emerald-600 dark:text-emerald-400 text-sm" />
                    </div> */}
                    <span>Carry Forward (
                    Number of unused days that can be carried forward to next period
                      )</span>
                  </label>
                  
                  
                  {errors.isCarryForward && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm"
                    >
                      {errors.isCarryForward}
                    </motion.p>
                  )}
                </motion.div>
              )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <div className="p-1.5 bg-purple-100 dark:bg-purple-900/20 rounded-md">
                  <HiInformationCircle className="text-purple-600 dark:text-purple-400 text-sm" />
                </div>
                <span>Description</span>
                <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                disabled={isLoadingEdit}
                rows="3"
                className={`w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none ${
                  errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Brief description of the leave type and its purpose..."
              />
              {errors.description && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.description}
                </motion.p>
              )}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <div className="p-1.5 bg-orange-100 dark:bg-orange-900/20 rounded-md">
                    <HiCalendar className="text-orange-600 dark:text-orange-400 text-sm" />
                  </div>
                  <span>Maximum Days</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="maxDays"
                  value={formData.maxDays}
                  onChange={handleInputChange}
                  disabled={isLoadingEdit}
                  min="1"
                  max="365"
                  step="any"
                  className={`w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                    errors.maxDays ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="e.g., 21"
                />
                {errors.maxDays && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.maxDays}
                  </motion.p>
                )}
              </motion.div>

             

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-2"
              >
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/20 rounded-md">
                    <HiColorSwatch className="text-indigo-600 dark:text-indigo-400 text-sm" />
                  </div>
                  <span>Color Theme</span>
                </label>
                <div className="flex gap-3 flex-wrap p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  {colorOptions.map(color => (
                    <motion.button
                      key={color.value}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      disabled={isLoadingEdit}
                      onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                      className={`w-8 h-8 rounded-full ${color.color} disabled:opacity-50 transition-all duration-200 ${
                        formData.color === color.value ? 'ring-4 ring-offset-2 ring-gray-400 dark:ring-gray-500' : ''
                      }`}
                      title={color.label}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-2"
              >
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <div className="p-1.5 bg-yellow-100 dark:bg-yellow-900/20 rounded-md">
                    <HiClock className="text-yellow-600 dark:text-yellow-400 text-sm" />
                  </div>
                  <span>Advance Notice Required</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="advanceNotice"
                  value={formData.advanceNotice}
                  onChange={handleInputChange}
                  disabled={isLoadingEdit}
                  className={`w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 ${
                    errors.advanceNotice ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="e.g., 2 weeks, 1 month, Immediate"
                />
                {formData.advanceNotice && !errors.advanceNotice && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Parsed as <strong>{extractDaysFromAdvanceNotice(formData.advanceNotice)}</strong> day(s) notice
                  </p>
                )}
                {errors.advanceNotice && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.advanceNotice}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-2"
              >
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <div className="p-1.5 bg-pink-100 dark:bg-pink-900/20 rounded-md">
                    <HiDocumentText className="text-pink-600 dark:text-pink-400 text-sm" />
                  </div>
                  <span>Documents Required</span>
                </label>
                <input
                  type="text"
                  name="documentsRequired"
                  value={formData.documentsRequired}
                  onChange={handleInputChange}
                  disabled={isLoadingEdit}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g., Medical certificate (optional)"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-2"
            >
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <div className="p-1.5 bg-teal-100 dark:bg-teal-900/20 rounded-md">
                  <HiUsers className="text-teal-600 dark:text-teal-400 text-sm" />
                </div>
                <span>Eligibility Criteria</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="eligibility"
                value={formData.eligibility}
                onChange={handleInputChange}
                disabled={isLoadingEdit}
                className={`w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${
                  errors.eligibility ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="e.g., All full-time employees after 90 days"
              />
              {errors.eligibility && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.eligibility}
                </motion.p>
              )}
            </motion.div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <div className="p-1.5 bg-blue-100 dark:bg-blue-900/20 rounded-md">
                    <HiDocumentText className="text-blue-600 dark:text-blue-400 text-sm" />
                  </div>
                  <span>Policies & Guidelines</span>
                  <span className="text-red-500">*</span>
                </label>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={addPolicy}
                  disabled={isLoadingEdit}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-200 text-sm"
                >
                  <HiPlus className="text-sm" />
                  <span>Add Policy</span>
                </motion.button>
              </div>
              
              <div className="space-y-3">
                <AnimatePresence>
                  {formData.policies.map((policy, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-3 items-start"
                    >
                      <div className="flex-1">
                        <input
                          type="text"
                          value={policy}
                          onChange={(e) => handlePolicyChange(index, e.target.value)}
                          disabled={isLoadingEdit}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder={`Policy ${index + 1} - e.g., Maximum 2 consecutive weeks`}
                        />
                      </div>
                      {formData.policies.length > 1 && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => removePolicy(index)}
                          disabled={isLoadingEdit}
                          className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200"
                        >
                          <FaMinus className="text-sm" />
                        </motion.button>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              {errors.policies && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.policies}
                </motion.p>
              )}
            </motion.div>

            {/* Active Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-200 dark:border-blue-800"
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="isActive"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  disabled={isLoadingEdit}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isActive" className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <span>Active Status</span>
                </label>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 ml-8">
                When active, employees can apply for this leave type
              </p>
            </motion.div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* Review Summary */}
            <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <FaCheckCircle className="text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Review Leave Type Details
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Leave Type Name</p>
                    <p className="text-gray-900 dark:text-white font-medium">{formData.name || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Category</p>
                    <p className="text-gray-900 dark:text-white capitalize">{formData.category}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Maximum Days</p>
                    <p className="text-gray-900 dark:text-white">{formData.maxDays || "0"} days</p>
                  </div>
                  {formData.category === 'paid' && (
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Carry Forward</p>
                      <p className="text-gray-900 dark:text-white">{formData.isCarryForward || false} </p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Advance Notice</p>
                    <p className="text-gray-900 dark:text-white">{formData.advanceNotice || "Not specified"}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Documents Required</p>
                    <p className="text-gray-900 dark:text-white">{formData.documentsRequired || "Not Required"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Eligibility</p>
                    <p className="text-gray-900 dark:text-white">{formData.eligibility || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</p>
                    <p className="text-gray-900 dark:text-white">{formData.isActive ? "Active" : "Inactive"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Color Theme</p>
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded-full ${formData.color}`}></div>
                      <span className="text-gray-900 dark:text-white">Selected</span>
                    </div>
                  </div>
                </div>
              </div>

              {formData.description && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Description</p>
                  <p className="text-gray-900 dark:text-white">{formData.description}</p>
                </div>
              )}

              {formData.policies.filter(p => p.trim()).length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Policies</p>
                  <ul className="space-y-1">
                    {formData.policies.filter(p => p.trim()).map((policy, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-900 dark:text-white text-sm">{policy}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={handleCancel}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className=" flex items-center justify-center p-4 "
            onClick={handleCancel}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-6xl max-h-[90vh] overflow-y-scroll"
            >
              {/* Modal Header */}
              <div className="bg-blue-50 dark:bg-blue-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      {editingId ? (
                        <FaEdit className="text-blue-600 dark:text-blue-400 text-xl" />
                      ) : (
                        <HiPlus className="text-blue-600 dark:text-blue-400 text-xl" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {editingId ? `Edit Leave Type${formData.name ? ': ' + formData.name : ''}` : 'Create New Leave Type'}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {editingId ? 'Update leave type information' : 'Configure a new leave type for your organization'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowPreview(!showPreview)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200"
                    >
                      {showPreview ? <HiEyeOff /> : <HiEye />}
                      <span className="hidden sm:inline">{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleCancel}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    >
                      <HiX className="text-gray-500 dark:text-gray-400 text-xl" />
                    </motion.button>
                  </div>
                </div>

                {/* Step Indicator */}
                <div className="mt-6">
                  <div className="flex items-center space-x-4">
                    {steps.map((step, index) => (
                      <div key={step.id} className="flex items-center">
                        <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                          currentStep === step.id
                            ? "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                            : isStepComplete(step.id)
                            ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                        }`}>
                          <step.icon className="text-sm" />
                          <span className="text-sm font-medium">{step.name}</span>
                        </div>
                        {index < steps.length - 1 && (
                          <div className="w-8 h-px bg-gray-300 dark:bg-gray-600 mx-2" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">
                  <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Loading Edit Data */}
              {isLoadingEdit && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-blue-600 dark:text-blue-400 text-sm">Loading leave type data...</p>
                  </div>
                </div>
              )}

              {/* Modal Content */}
              <div className="flex flex-col lg:flex-row h-full">
                {/* Main Form Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {renderStepContent()}
                </div>

                {/* Preview Panel */}
                <AnimatePresence>
                  {showPreview && !isLoadingEdit && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "400px", opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 overflow-hidden"
                    >
                      <div className="p-6 h-full overflow-y-auto">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                          <FaEye className="text-blue-600 dark:text-blue-400" />
                          <span>Live Preview</span>
                        </h3>
                        
                        {/* Preview Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                          <div className="p-4 bg-gray-50 dark:bg-gray-700">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`w-4 h-4 rounded-full ${formData.color}`}></div>
                                <div>
                                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                                    {formData.name || 'Leave Type Name'}
                                  </h4>
                                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    {formData.description || 'Description will appear here'}
                                  </p>
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-xl font-bold text-gray-900 dark:text-white">
                                  {formData.maxDays || '0'}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Max Days</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4 space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Category:</span>
                              <span className="font-medium text-gray-900 dark:text-white capitalize">{formData.category}</span>
                            </div>
                            {formData.category === 'paid' && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">Carry Forward:</span>
                                <span className="font-medium text-gray-900 dark:text-white">{formData.isCarryForward || false} </span>
                              </div>
                            )}
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Notice:</span>
                              <span className="font-medium text-gray-900 dark:text-white">{formData.advanceNotice || 'Not specified'}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Documents:</span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {formData.documentsRequired || 'Not Required'}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Status:</span>
                              <span className={`font-medium ${formData.isActive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {formData.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between">
                  <div>
                    {currentStep > 1 && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => setCurrentStep(currentStep - 1)}
                        className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-xl font-medium transition-all duration-200"
                      >
                        Previous
                      </motion.button>
                    )}
                  </div>

                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={resetForm}
                      disabled={isSubmitting || isLoadingEdit}
                      className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-xl font-medium transition-all duration-200"
                    >
                      <FaUndo className="text-sm" />
                      <span>Reset</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCancel}
                      disabled={isSubmitting}
                      className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-xl font-medium transition-all duration-200"
                    >
                      Cancel
                    </motion.button>

                    {currentStep < steps.length ? (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => setCurrentStep(currentStep + 1)}
                        disabled={!isStepComplete(currentStep)}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        Next
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        disabled={isSubmitting || isLoading || isLoadingEdit}
                        className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>{editingId ? 'Updating...' : 'Creating...'}</span>
                          </>
                        ) : (
                          <>
                            <FaSave className="text-sm" />
                            <span>{editingId ? 'Update Leave Type' : 'Create Leave Type'}</span>
                          </>
                        )}
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
};

export default LeaveType;