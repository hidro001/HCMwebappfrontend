import React, { useState } from 'react';
import { 
  FaPlus, 
  FaMinus, 
  FaSave, 
  FaEye, 
  FaEdit, 
  FaTrash,
  FaFileAlt, 
  FaUsers, 
  FaClock, 
  FaCheckCircle, 
  FaExclamationCircle,
  FaCalendarAlt
} from 'react-icons/fa';
import BaseModal from '../../../common/BaseModal';

const LeaveType = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'paid',
    maxDays: '',
    approver: '',
    documentsRequired: '',
    advanceNotice: '',
    eligibility: '',
    policies: [''],
    color: 'bg-blue-500',
    isActive: true
  });

  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [existingLeaveTypes, setExistingLeaveTypes] = useState([
    {
      id: 1,
      name: "Annual Leave",
      category: "paid",
      maxDays: 21,
      description: "Yearly vacation days for rest and recreation",
      approver: "Direct Manager",
      documentsRequired: "Not Required",
      advanceNotice: "2 weeks",
      eligibility: "All full-time employees after 90 days",
      policies: ["Must be taken within the calendar year", "Cannot exceed 5 consecutive days without manager approval"],
      color: "bg-blue-500",
      isActive: true
    }
  ]);

  const [editingId, setEditingId] = useState(null);

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

  const approverOptions = [
    'Direct Manager',
    'HR Department',
    'Department Head',
    'HR Department + Direct Manager',
    'Department Head + HR',
    'Any Available Manager',
    'Senior Management'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
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
    if (!formData.approver.trim()) newErrors.approver = 'Approver is required';
    if (!formData.advanceNotice.trim()) newErrors.advanceNotice = 'Advance notice is required';
    if (!formData.eligibility.trim()) newErrors.eligibility = 'Eligibility criteria is required';
    
    const validPolicies = formData.policies.filter(policy => policy.trim());
    if (validPolicies.length === 0) newErrors.policies = 'At least one policy is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const newLeaveType = {
      ...formData,
      id: editingId || Date.now(),
      maxDays: parseInt(formData.maxDays),
      policies: formData.policies.filter(policy => policy.trim()),
      documentsRequired: formData.documentsRequired || 'Not Required'
    };

    if (editingId) {
      setExistingLeaveTypes(prev => 
        prev.map(leave => leave.id === editingId ? newLeaveType : leave)
      );
      setEditingId(null);
    } else {
      setExistingLeaveTypes(prev => [...prev, newLeaveType]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'paid',
      maxDays: '',
      approver: '',
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
  };

  const editLeaveType = (leave) => {
    setFormData({
      ...leave,
      maxDays: leave.maxDays.toString(),
      documentsRequired: leave.documentsRequired === 'Not Required' ? '' : leave.documentsRequired
    });
    setEditingId(leave.id);
    setShowPreview(false);
  };

  const deleteLeaveType = (id) => {
    setExistingLeaveTypes(prev => prev.filter(leave => leave.id !== id));
  };

  const toggleActiveStatus = (id) => {
    setExistingLeaveTypes(prev =>
      prev.map(leave =>
        leave.id === id ? { ...leave, isActive: !leave.isActive } : leave
      )
    );
  };

  // Move the early return AFTER all hooks have been declared
  if (!isOpen) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      {/* FIXED: Proper modal content container with max width and height */}
      <div className="w-[90vw] max-w-7xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Leave Type Management</h1>
          <p className="text-gray-600 dark:text-gray-300 text-base">Create and manage leave types with policies and requirements</p>
        </div>

        {/* FIXED: Single column layout for better modal display */}
        <div className="space-y-6">
          {/* Form Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                {editingId ? 'Edit Leave Type' : 'Create New Leave Type'}
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
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
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
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
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
                  rows="2"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
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
                    min="1"
                    max="365"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
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
                        onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                        className={`w-6 h-6 rounded-full ${color.color} ${
                          formData.color === color.value ? 'ring-2 ring-gray-400 ring-offset-2' : ''
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Approval and Requirements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Approver *
                  </label>
                  <select
                    name="approver"
                    value={formData.approver}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.approver ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Approver</option>
                    {approverOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.approver && <p className="text-red-500 text-sm mt-1">{errors.approver}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Advance Notice Required *
                  </label>
                  <input
                    type="text"
                    name="advanceNotice"
                    value={formData.advanceNotice}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
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
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
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
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
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
                    className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-1 text-sm"
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
                        className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                        placeholder={`Policy ${index + 1}`}
                      />
                      {formData.policies.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePolicy(index)}
                          className="px-2 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
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
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 font-medium text-sm"
                >
                  <FaSave className="w-4 h-4" />
                  {editingId ? 'Update Leave Type' : 'Create Leave Type'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium text-sm"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Preview Card */}
          {showPreview && (
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
                    <span className="text-gray-600 dark:text-gray-300">Approver:</span>
                    <span className="font-medium text-gray-800 dark:text-gray-100">{formData.approver || 'Not specified'}</span>
                  </div>
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
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
              Existing Leave Types ({existingLeaveTypes.length})
            </h3>
            
            <div className="space-y-3">
              {existingLeaveTypes.map(leave => (
                <div key={leave.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${leave.color}`}></div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-100 text-sm">{leave.name}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300">{leave.maxDays} days max</p>
                      </div>
                      {!leave.isActive && (
                        <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs">
                          Inactive
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleActiveStatus(leave.id)}
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          leave.isActive 
                            ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                            : 'bg-green-100 text-green-600 hover:bg-green-200'
                        }`}
                      >
                        {leave.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => editLeaveType(leave)}
                        className="p-1 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
                      >
                        <FaEdit className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => deleteLeaveType(leave.id)}
                        className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900 rounded"
                      >
                        <FaTrash className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default LeaveType;