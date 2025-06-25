
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';  // Keep if you still want motion animations
// import useAssetStore from '../../../store/useAssetStore';

// // Import the BaseModal wrapper
// import BaseModal from '../../common/BaseModal';

// const overlayAnimation = {
//   layout: true,
//   initial: { opacity: 0, scale: 0.95 },
//   animate: { opacity: 1, scale: 1 },
//   exit: { opacity: 0, scale: 0.95 },
//   transition: { duration: 0.2 },
// };

// export default function AssetGroupModal({ isOpen, onClose }) {
//   const [groupName, setGroupName] = useState('');
//   const [groupDescription, setGroupDescription] = useState('');

//   const { createAssetGroup } = useAssetStore();

//   useEffect(() => {
//     if (isOpen) {
//       // prevent body scroll
//       const originalStyle = window.getComputedStyle(document.body).overflow;
//       document.body.style.overflow = 'hidden';
//       return () => {
//         document.body.style.overflow = originalStyle;
//       };
//     }
//   }, [isOpen]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!groupName.trim()) return;
//     await createAssetGroup(groupName, groupDescription);
//     onClose();
//   };

//   // If you prefer, you can remove this if check,
//   // because <BaseModal> won't render if isOpen=false
//   if (!isOpen) return null;

//   return (
//     <BaseModal isOpen={isOpen} onClose={onClose}>
//       {/* 
//         Here we keep your 'white box' design with motion 
//         for the fade/scale effect. The entire form goes inside.
//       */}
//       <motion.div
//         layout
//         className="bg-white dark:bg-gray-800 rounded-md p-6 w-full max-w-md shadow-lg"
//         {...overlayAnimation}
//       >
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-lg font-semibold">Add New Asset Group</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 text-2xl leading-none"
//           >
//             &times;
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Group Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               required
//               placeholder="Enter Group Name"
//               className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 
//                          focus:outline-none bg-white dark:bg-gray-700 dark:text-white"
//               value={groupName}
//               onChange={(e) => setGroupName(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Group Description
//             </label>
//             <textarea
//               placeholder="Write description about Asset"
//               className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 h-24 
//                          focus:outline-none bg-white dark:bg-gray-700 dark:text-white"
//               value={groupDescription}
//               onChange={(e) => setGroupDescription(e.target.value)}
//             />
//           </div>

//           <div className="flex items-center justify-end space-x-3 pt-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 rounded border border-orange-400 text-orange-500 
//                          hover:bg-orange-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 
//                          transition-colors"
//             >
//               Add group
//             </button>
//           </div>
//         </form>
//       </motion.div>
//     </BaseModal>
//   );
// }



import React, { useState, useEffect } from 'react';
import { 
  FaTimes, 
  FaPlus, 
  FaBoxOpen, 
  FaTags, 
  FaFileAlt,
  FaSave,
  FaSpinner
} from 'react-icons/fa';
import useAssetStore from '../../../store/useAssetStore';
import BaseModal from '../../common/BaseModal';

export default function AssetGroupModal({ isOpen, onClose }) {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const { createAssetGroup } = useAssetStore();

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setGroupName('');
      setGroupDescription('');
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!groupName.trim()) {
      newErrors.groupName = 'Group name is required';
    } else if (groupName.trim().length < 3) {
      newErrors.groupName = 'Group name must be at least 3 characters';
    }
    
    if (groupDescription.trim().length > 500) {
      newErrors.groupDescription = 'Description must be less than 500 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await createAssetGroup(groupName.trim(), groupDescription.trim());
      onClose();
    } catch (error) {
      console.error('Error creating asset group:', error);
      setErrors({ submit: 'Failed to create asset group. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    if (field === 'groupName') {
      setGroupName(value);
      if (errors.groupName && value.trim().length >= 3) {
        setErrors(prev => ({ ...prev, groupName: '' }));
      }
    } else if (field === 'groupDescription') {
      setGroupDescription(value);
      if (errors.groupDescription && value.length <= 500) {
        setErrors(prev => ({ ...prev, groupDescription: '' }));
      }
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md mx-auto overflow-hidden transform transition-all duration-300 scale-100 opacity-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <FaBoxOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Create Asset Group</h2>
                <p className="text-blue-100 text-sm">Add a new asset group to organize your assets</p>
              </div>
            </div>
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="p-2 text-white/70 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200 disabled:opacity-50"
              aria-label="Close modal"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
          
          {/* Decorative element */}
          <div className="absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {errors.submit && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-sm flex items-center space-x-2">
                <span>⚠️</span>
                <span>{errors.submit}</span>
              </p>
            </div>
          )}

          <div onSubmit={handleSubmit} className="space-y-5">
            {/* Group Name Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <span className="flex items-center space-x-2">
                  <FaTags className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Group Name</span>
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Enter asset group name..."
                  className={`w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                    errors.groupName 
                      ? 'border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-900/20' 
                      : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                  value={groupName}
                  onChange={(e) => handleInputChange('groupName', e.target.value)}
                  disabled={isSubmitting}
                />
                {groupName && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                )}
              </div>
              {errors.groupName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center space-x-1">
                  <span>⚠️</span>
                  <span>{errors.groupName}</span>
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Choose a descriptive name for easy identification
              </p>
            </div>

            {/* Group Description Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <span className="flex items-center space-x-2">
                  <FaFileAlt className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Description</span>
                  <span className="text-gray-400 text-xs">(Optional)</span>
                </span>
              </label>
              <div className="relative">
                <textarea
                  placeholder="Describe the purpose and contents of this asset group..."
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 resize-none ${
                    errors.groupDescription 
                      ? 'border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-900/20' 
                      : 'border-gray-300 dark:border-gray-600 focus:ring-purple-500 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                  value={groupDescription}
                  onChange={(e) => handleInputChange('groupDescription', e.target.value)}
                  disabled={isSubmitting}
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                  {groupDescription.length}/500
                </div>
              </div>
              {errors.groupDescription && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center space-x-1">
                  <span>⚠️</span>
                  <span>{errors.groupDescription}</span>
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !groupName.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="w-4 h-4 animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <FaSave className="w-4 h-4" />
                    <span>Create Group</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer with helpful tip */}
        <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-start space-x-3">
            <div className="p-1 bg-blue-100 dark:bg-blue-900 rounded">
              <FaBoxOpen className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                <strong className="text-gray-700 dark:text-gray-300">Tip:</strong> Asset groups help you organize and categorize your assets efficiently. You can assign multiple assets to each group for better management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}