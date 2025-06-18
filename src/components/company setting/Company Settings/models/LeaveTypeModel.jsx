import React, { useState, useEffect } from 'react';
import { 
  FaPlus, 
  FaMinus, 
  FaSave, 
  FaEye, 
  FaEdit, 
  FaTrash,
  FaSpinner
} from 'react-icons/fa';
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
    maxDays: '',
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

  const colorOptions = [
    { value: 'bg-blue-500', label: 'Blue', color: 'bg-blue-500' },
    { value: 'bg-green-500', label: 'Green', color: 'bg-green-500' },
    { value: 'bg-red-500', label: 'Red', color: 'bg-red-500' },
    { value: 'bg-purple-500', label: 'Purple', color: 'bg-purple-500' },
    { value: 'bg-orange-500', label: 'Orange', color: 'bg-orange-500' },
    { value: 'bg-pink-500', label: 'Pink', color: 'bg-pink-500' },
    { value: 'bg-indigo-500', label: 'Indigo', color: 'bg-indigo-500' },
    { value: 'bg-gray-500', label: 'Gray', color: 'bg-gray-500' }
  ];

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'paid',
      maxDays: '',
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

  // Populate form with data
  const populateForm = (data) => {
    setFormData({
      name: data.name || '',
      description: data.description || '',
      category: data.category || 'paid',
      maxDays: data.maxDays?.toString() || '',
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
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Leave type name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.maxDays || formData.maxDays <= 0) newErrors.maxDays = 'Valid maximum days is required';
    if (!formData.advanceNotice.trim()) newErrors.advanceNotice = 'Advance notice is required';
    if (!formData.eligibility.trim()) newErrors.eligibility = 'Eligibility criteria is required';
    
    const validPolicies = formData.policies.filter(policy => policy.trim());
    if (validPolicies.length === 0) newErrors.policies = 'At least one policy is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    try {
      const submitData = {
        ...formData,
        maxDays: parseInt(formData.maxDays),
        policies: formData.policies.filter(policy => policy.trim()),
        documentsRequired: formData.documentsRequired || 'Not Required'
      };
      if (editingId) {
        submitData._id = editingId;
      } else {
        console.log(' Submitting new leave type');
      }

      const result = await addOrUpdateLeaveType(submitData);
      
      if (result) {
        resetForm();
        await fetchLeaveTypes(); 
        onClose(); 
      } else {
        console.log(' Submit failed');
      }
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

  if (!isOpen) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={handleCancel}>
      <div className="w-[90vw] max-w-7xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Leave Type Management</h1>
          <p className="text-gray-600 dark:text-gray-300 text-base">Create and manage leave types with policies and requirements</p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg">
            <p className="text-red-600 dark:text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Loading Edit Data */}
        {isLoadingEdit && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2">
              <FaSpinner className="w-4 h-4 animate-spin text-blue-500" />
              <p className="text-blue-600 text-sm">Loading leave type data...</p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Form Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                {editingId ? `Edit Leave Type${formData.name ? ': ' + formData.name : ''}` : 'Create New Leave Type'}
              </h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 text-sm"
                >
                  <FaEye className="w-4 h-4" />
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Leave Type Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={isLoadingEdit}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Annual Leave"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    disabled={isLoadingEdit}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50"
                  >
                    <option value="paid">Paid Leave</option>
                    <option value="unpaid">Unpaid Leave</option>
                    <option value="mixed">Mixed Benefits</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  disabled={isLoadingEdit}
                  rows="2"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50 ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Brief description of the leave type"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              {/* Leave Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Maximum Days *
                  </label>
                  <input
                    type="number"
                    name="maxDays"
                    value={formData.maxDays}
                    onChange={handleInputChange}
                    disabled={isLoadingEdit}
                    min="1"
                    max="365"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50 ${
                      errors.maxDays ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., 21"
                  />
                  {errors.maxDays && <p className="text-red-500 text-sm mt-1">{errors.maxDays}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Color Theme
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {colorOptions.map(color => (
                      <button
                        key={color.value}
                        type="button"
                        disabled={isLoadingEdit}
                        onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                        className={`w-6 h-6 rounded-full ${color.color} disabled:opacity-50 ${
                          formData.color === color.value ? 'ring-2 ring-gray-400 ring-offset-2' : ''
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/*  Requirements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Advance Notice Required *
                  </label>
                  <input
                    type="text"
                    name="advanceNotice"
                    value={formData.advanceNotice}
                    onChange={handleInputChange}
                    disabled={isLoadingEdit}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50 ${
                      errors.advanceNotice ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., 2 weeks, 1 month, Immediate"
                  />
                  {errors.advanceNotice && <p className="text-red-500 text-sm mt-1">{errors.advanceNotice}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Documents Required
                  </label>
                  <input
                    type="text"
                    name="documentsRequired"
                    value={formData.documentsRequired}
                    onChange={handleInputChange}
                    disabled={isLoadingEdit}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50"
                    placeholder="e.g., Medical certificate (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Eligibility Criteria *
                  </label>
                  <input
                    type="text"
                    name="eligibility"
                    value={formData.eligibility}
                    onChange={handleInputChange}
                    disabled={isLoadingEdit}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50 ${
                      errors.eligibility ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., All full-time employees after 90 days"
                  />
                  {errors.eligibility && <p className="text-red-500 text-sm mt-1">{errors.eligibility}</p>}
                </div>
              </div>

              {/* Policies */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Policies & Guidelines *
                  </label>
                  <button
                    type="button"
                    onClick={addPolicy}
                    disabled={isLoadingEdit}
                    className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-1 text-sm disabled:opacity-50"
                  >
                    <FaPlus className="w-3 h-3" />
                    Add Policy
                  </button>
                </div>
                
                <div className="space-y-2">
                  {formData.policies.map((policy, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={policy}
                        onChange={(e) => handlePolicyChange(index, e.target.value)}
                        disabled={isLoadingEdit}
                        className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm disabled:opacity-50"
                        placeholder={`Policy ${index + 1}`}
                      />
                      {formData.policies.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePolicy(index)}
                          disabled={isLoadingEdit}
                          className="px-2 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                        >
                          <FaMinus className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {errors.policies && <p className="text-red-500 text-sm mt-1">{errors.policies}</p>}
              </div>

              {/* Active Status */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  disabled={isLoadingEdit}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                />
                <label htmlFor="isActive" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Active (employees can apply for this leave type)
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting || isLoading || isLoadingEdit}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="w-4 h-4 animate-spin" />
                      {editingId ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      <FaSave className="w-4 h-4" />
                      {editingId ? 'Update Leave Type' : 'Create Leave Type'}
                    </>
                  )}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-400 dark:hover:bg-gray-500 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={isSubmitting || isLoadingEdit}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium text-sm disabled:opacity-50"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Preview Card */}
          {showPreview && !isLoadingEdit && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Preview</h3>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-50 dark:bg-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${formData.color}`}></div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                          {formData.name || 'Leave Type Name'}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {formData.description || 'Description will appear here'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-800 dark:text-gray-100">
                        {formData.maxDays || '0'}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Max Days</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 space-y-2">
                 
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Notice:</span>
                    <span className="font-medium text-gray-800 dark:text-gray-100">{formData.advanceNotice || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Documents:</span>
                    <span className="font-medium text-gray-800 dark:text-gray-100">
                      {formData.documentsRequired || 'Not Required'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Existing Leave Types */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                Existing Leave Types ({leaveTypes.length})
              </h3>
              {isLoading && (
                <FaSpinner className="w-4 h-4 animate-spin text-blue-500" />
              )}
            </div>
            
            {leaveTypes.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                {isLoading ? 'Loading leave types...' : 'No leave types found. Create your first leave type above.'}
              </div>
            ) : (
              <div className="space-y-3">
                {leaveTypes.map(leave => (
                  <div key={leave._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${leave.color || 'bg-blue-500'}`}></div>
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100 text-sm">{leave.name}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-300">{leave.maxDays} days max • {leave.category}</p>
                        </div>
                        {!leave.isActive && (
                          <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs">
                            Inactive
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleToggleActiveStatus(leave._id)}
                          disabled={isLoading}
                          className={`px-2 py-1 rounded text-xs font-medium transition-colors disabled:opacity-50 ${
                            leave.isActive 
                              ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                              : 'bg-green-100 text-green-600 hover:bg-green-200'
                          }`}
                        >
                          {leave.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => editLeaveType(leave)}
                          disabled={isLoading}
                          className="p-1 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 rounded transition-colors disabled:opacity-50"
                        >
                          <FaEdit className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteLeaveType(leave._id)}
                          disabled={isLoading}
                          className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900 rounded transition-colors disabled:opacity-50"
                        >
                          <FaTrash className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default LeaveType;