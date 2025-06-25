

// import React, { useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiX } from "react-icons/fi";
// import useDepartmentStore from "../../../../store/departmentStore";
// import useInductionPPTStore from "../../../../store/useInductionPPTStore"; // <-- ADDED
// import BaseModal from "../../../common/BaseModal";
// import FullScreenLoader from "../../../common/FullScreenLoader"; // <-- ADDED

// const InductionPPTModal = ({
//   isOpen,
//   onClose,
//   pptName,
//   setPptName,
//   department,
//   setDepartment,
//   allDepartment,
//   setAllDepartment,
//   file,
//   setFile,
//   coverImage,
//   setCoverImage,
//   handleSubmit,
//   editMode,
// }) => {
//   // If you have a department store:
//   const { departments, fetchDepartments, loading: deptLoading } = useDepartmentStore();

//   // Pull in the "loading" state from your induction PPT store
//   const { loading } = useInductionPPTStore(); // <-- ADDED

//   useEffect(() => {
//     if (isOpen) {
//       fetchDepartments();
//     }
//   }, [isOpen, fetchDepartments]);

//   if (!isOpen) return null;

//   return (
//     <BaseModal isOpen={isOpen} onClose={onClose}>
//       {/* If we're loading, show the FullScreenLoader. Otherwise, show the form. */}
//       {loading ? (
//         <FullScreenLoader />
//       ) : (
//         <AnimatePresence>
//           <motion.div
//             key="modalContent"
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//           >
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6 relative">
//               {/* Close Button */}
//               <button
//                 className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900"
//                 onClick={onClose}
//               >
//                 <FiX size={20} />
//               </button>

//               <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
//                 {editMode ? "Edit Induction PPT" : "Add Induction PPT"}
//               </h2>

//               <form onSubmit={handleSubmit}>
//                 {/* PPT Name */}
//                 <div className="mb-4">
//                   <label
//                     htmlFor="pptName"
//                     className="block text-gray-700 dark:text-gray-200 mb-1"
//                   >
//                     Induction PPT Name
//                   </label>
//                   <input
//                     id="pptName"
//                     type="text"
//                     className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none
//                                focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                     placeholder="Enter PPT Name"
//                     value={pptName}
//                     onChange={(e) => setPptName(e.target.value)}
//                     required
//                   />
//                 </div>

//                 {/* All Departments Checkbox */}
//                 <div className="mb-4">
//                   <label className="inline-flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       checked={allDepartment}
//                       onChange={(e) => setAllDepartment(e.target.checked)}
//                     />
//                     <span className="text-gray-700 dark:text-gray-200">
//                       All Departments
//                     </span>
//                   </label>
//                 </div>

//                 {/* Department Dropdown (disabled if allDepartment=true) */}
//                 <div className="mb-4">
//                   <label
//                     htmlFor="department"
//                     className="block text-gray-700 dark:text-gray-200 mb-1"
//                   >
//                     Select Department
//                   </label>
//                   {deptLoading ? (
//                     <p>Loading departments...</p>
//                   ) : (
//                     <select
//                       id="department"
//                       disabled={allDepartment}
//                       className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none
//                                  focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                       value={department}
//                       onChange={(e) => setDepartment(e.target.value)}
//                       required={!allDepartment}
//                     >
//                       <option value="">Select Option</option>
//                       {departments.map((dep) => (
//                         <option key={dep._id} value={dep.department}>
//                           {dep.department}
//                         </option>
//                       ))}
//                     </select>
//                   )}
//                 </div>

//                 {/* PPT File */}
//                 <div className="mb-4">
//                   <label
//                     htmlFor="pptFile"
//                     className="block text-gray-700 dark:text-gray-200 mb-1"
//                   >
//                     {editMode
//                       ? "Update PPT File (optional)"
//                       : "Choose PPT File"}
//                   </label>
//                   <input
//                     id="pptFile"
//                     type="file"
//                     className="block w-full text-sm text-gray-500 file:mr-4 file:py-2
//                                file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50
//                                file:text-blue-700 hover:file:bg-blue-100 dark:text-gray-200
//                                dark:bg-gray-700 dark:file:bg-gray-600 dark:file:text-gray-100"
//                     onChange={(e) => setFile(e.target.files[0])}
//                     // required only if we are adding
//                     required={!editMode}
//                   />
//                 </div>

//                 {/* Cover Image */}
//                 <div className="mb-4">
//                   <label
//                     htmlFor="coverImage"
//                     className="block text-gray-700 dark:text-gray-200 mb-1"
//                   >
//                     {editMode
//                       ? "Update Cover Image (optional)"
//                       : "Choose Cover Image (optional)"}
//                   </label>
//                   <input
//                     id="coverImage"
//                     type="file"
//                     accept="image/*"
//                     className="block w-full text-sm text-gray-500 file:mr-4 file:py-2
//                                file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50
//                                file:text-blue-700 hover:file:bg-blue-100 dark:text-gray-200
//                                dark:bg-gray-700 dark:file:bg-gray-600 dark:file:text-gray-100"
//                     onChange={(e) => setCoverImage(e.target.files[0])}
//                   />
//                 </div>

//                 <div className="flex justify-end mt-6">
//                   <button
//                     type="button"
//                     className="mr-3 px-4 py-2 border border-red-500 text-red-500 rounded
//                                hover:bg-red-50 dark:hover:bg-gray-700"
//                     onClick={onClose}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600
//                                dark:hover:bg-blue-400 dark:text-gray-900"
//                   >
//                     {editMode ? "Update" : "Upload"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       )}
//     </BaseModal>
//   );
// };

// export default InductionPPTModal;



import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiX, 
  FiUpload, 
  FiImage, 
  FiFile, 
  FiUsers, 
  FiEdit3,
  FiPlus,
  FiCheck,
  FiAlertCircle
} from "react-icons/fi";
import {
  HiX,
  HiUpload,
  HiPhotograph,
  HiDocumentText,
  HiOfficeBuilding,
  HiUsers,
  HiCheck,
  HiExclamation,
  HiInformationCircle
} from "react-icons/hi";
import useDepartmentStore from "../../../../store/departmentStore";
import useInductionPPTStore from "../../../../store/useInductionPPTStore";
import BaseModal from "../../../common/BaseModal";
import FullScreenLoader from "../../../common/FullScreenLoader";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    y: 20,
    transition: { duration: 0.2 }
  }
};

const stepVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0, 
    x: -20,
    transition: { duration: 0.2 }
  }
};

const InductionPPTModal = ({
  isOpen,
  onClose,
  pptName,
  setPptName,
  department,
  setDepartment,
  allDepartment,
  setAllDepartment,
  file,
  setFile,
  coverImage,
  setCoverImage,
  handleSubmit,
  editMode,
}) => {
  const { departments, fetchDepartments, loading: deptLoading } = useDepartmentStore();
  const { loading } = useInductionPPTStore();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [filePreview, setFilePreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      fetchDepartments();
      setCurrentStep(1);
      setErrors({});
      setFilePreview(null);
      setImagePreview(null);
    }
  }, [isOpen, fetchDepartments]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    
    if (selectedFile) {
      setFilePreview({
        name: selectedFile.name,
        size: (selectedFile.size / 1024 / 1024).toFixed(2) + ' MB',
        type: selectedFile.type
      });
    } else {
      setFilePreview(null);
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setCoverImage(selectedImage);
    
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(selectedImage);
    } else {
      setImagePreview(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!pptName.trim()) {
      newErrors.pptName = 'PPT name is required';
    }
    
    if (!allDepartment && !department) {
      newErrors.department = 'Please select a department or choose All Departments';
    }
    
    if (!editMode && !file) {
      newErrors.file = 'Please select a PPT file';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(e);
    }
  };

  const steps = [
    {
      id: 1,
      title: "Basic Information",
      icon: HiInformationCircle,
      description: "Enter PPT details"
    },
    {
      id: 2,
      title: "Department Selection",
      icon: HiOfficeBuilding,
      description: "Choose target department"
    },
    {
      id: 3,
      title: "File Upload",
      icon: HiUpload,
      description: "Upload PPT and cover image"
    }
  ];

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center">
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                currentStep >= step.id
                  ? 'bg-indigo-600 border-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-400'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {currentStep > step.id ? (
                <HiCheck className="w-5 h-5" />
              ) : (
                <step.icon className="w-5 h-5" />
              )}
            </motion.div>
            <div className="mt-2 text-center">
              <p className={`text-xs font-medium ${
                currentStep >= step.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500'
              }`}>
                {step.title}
              </p>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-4 ${
              currentStep > step.id ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <HiInformationCircle className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Basic Information
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enter the name and details for your induction presentation
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Induction PPT Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                    errors.pptName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Enter presentation name"
                  value={pptName}
                  onChange={(e) => {
                    setPptName(e.target.value);
                    if (errors.pptName) {
                      setErrors(prev => ({ ...prev, pptName: null }));
                    }
                  }}
                />
                {errors.pptName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-600 flex items-center"
                  >
                    <HiExclamation className="w-4 h-4 mr-1" />
                    {errors.pptName}
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <HiOfficeBuilding className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Department Selection
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Choose which department(s) this presentation is for
              </p>
            </div>

            <div className="space-y-6">
              {/* All Departments Toggle */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <HiUsers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        All Departments
                      </span>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Make this presentation available to all departments
                      </p>
                    </div>
                  </div>
                  <motion.div
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      allDepartment ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                    onClick={() => {
                      setAllDepartment(!allDepartment);
                      if (errors.department) {
                        setErrors(prev => ({ ...prev, department: null }));
                      }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span
                      className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                        allDepartment ? 'translate-x-6' : 'translate-x-1'
                      }`}
                      animate={{ x: allDepartment ? 24 : 4 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                </label>
              </div>

              {/* Department Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Specific Department {!allDepartment && <span className="text-red-500">*</span>}
                </label>
                {deptLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600" />
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Loading departments...</span>
                  </div>
                ) : (
                  <select
                    disabled={allDepartment}
                    className={`w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                      allDepartment ? 'opacity-50 cursor-not-allowed' : ''
                    } ${
                      errors.department ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    value={department}
                    onChange={(e) => {
                      setDepartment(e.target.value);
                      if (errors.department) {
                        setErrors(prev => ({ ...prev, department: null }));
                      }
                    }}
                  >
                    <option value="">Choose a department</option>
                    {departments.map((dep) => (
                      <option key={dep._id} value={dep.department}>
                        {dep.department}
                      </option>
                    ))}
                  </select>
                )}
                {errors.department && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-600 flex items-center"
                  >
                    <HiExclamation className="w-4 h-4 mr-1" />
                    {errors.department}
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <HiUpload className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                File Upload
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Upload your presentation file and cover image
              </p>
            </div>

            <div className="space-y-6">
              {/* PPT File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {editMode ? "Update PPT File (optional)" : "PPT File"} 
                  {!editMode && <span className="text-red-500">*</span>}
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".ppt,.pptx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="ppt-upload"
                  />
                  <label
                    htmlFor="ppt-upload"
                    className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
                      filePreview 
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                        : errors.file
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    {filePreview ? (
                      <div className="text-center">
                        <HiDocumentText className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                        <p className="text-sm font-medium text-green-700 dark:text-green-300">
                          {filePreview.name}
                        </p>
                        <p className="text-xs text-green-600 dark:text-green-400">
                          {filePreview.size}
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <HiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Click to upload PPT file
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          .ppt, .pptx files only
                        </p>
                      </div>
                    )}
                  </label>
                </div>
                {errors.file && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-600 flex items-center"
                  >
                    <HiExclamation className="w-4 h-4 mr-1" />
                    {errors.file}
                  </motion.p>
                )}
              </div>

              {/* Cover Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cover Image (optional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200"
                  >
                    {imagePreview ? (
                      <div className="text-center">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-16 h-12 object-cover rounded mx-auto mb-2"
                        />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Cover image selected
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <HiPhotograph className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Click to upload cover image
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      {loading ? (
        <FullScreenLoader />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key="modalContent"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                  <HiDocumentText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {editMode ? "Edit Induction PPT" : "Add Induction PPT"}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {editMode ? "Update your presentation details" : "Create a new induction presentation"}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <HiX className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-6">
              <form onSubmit={handleFormSubmit}>
                {/* Step Indicator */}
                {!editMode && renderStepIndicator()}

                {/* Step Content */}
                <div className="min-h-[400px]">
                  <AnimatePresence mode="wait">
                    {editMode ? (
                      // Edit mode - show all fields at once
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                      >
                        {/* PPT Name */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Induction PPT Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            className={`w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                              errors.pptName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                            placeholder="Enter presentation name"
                            value={pptName}
                            onChange={(e) => {
                              setPptName(e.target.value);
                              if (errors.pptName) {
                                setErrors(prev => ({ ...prev, pptName: null }));
                              }
                            }}
                          />
                          {errors.pptName && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                              <HiExclamation className="w-4 h-4 mr-1" />
                              {errors.pptName}
                            </p>
                          )}
                        </div>

                        {/* All Departments Toggle */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                          <label className="flex items-center justify-between cursor-pointer">
                            <div className="flex items-center space-x-3">
                              <HiUsers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                              <div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                  All Departments
                                </span>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  Make this presentation available to all departments
                                </p>
                              </div>
                            </div>
                            <div
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                                allDepartment ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                              }`}
                              onClick={() => {
                                setAllDepartment(!allDepartment);
                                if (errors.department) {
                                  setErrors(prev => ({ ...prev, department: null }));
                                }
                              }}
                            >
                              <span
                                className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                                  allDepartment ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </div>
                          </label>
                        </div>

                        {/* Department Selection */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Select Department {!allDepartment && <span className="text-red-500">*</span>}
                          </label>
                          <select
                            disabled={allDepartment}
                            className={`w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                              allDepartment ? 'opacity-50 cursor-not-allowed' : ''
                            } ${
                              errors.department ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                            value={department}
                            onChange={(e) => {
                              setDepartment(e.target.value);
                              if (errors.department) {
                                setErrors(prev => ({ ...prev, department: null }));
                              }
                            }}
                          >
                            <option value="">Choose a department</option>
                            {departments.map((dep) => (
                              <option key={dep._id} value={dep.department}>
                                {dep.department}
                              </option>
                            ))}
                          </select>
                          {errors.department && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                              <HiExclamation className="w-4 h-4 mr-1" />
                              {errors.department}
                            </p>
                          )}
                        </div>

                        {/* File Uploads */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* PPT File */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Update PPT File (optional)
                            </label>
                            <input
                              type="file"
                              accept=".ppt,.pptx"
                              onChange={handleFileChange}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                            />
                          </div>

                          {/* Cover Image */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Update Cover Image (optional)
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                            />
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      // Add mode - step by step
                      renderStepContent()
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    {!editMode && currentStep > 1 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => setCurrentStep(prev => prev - 1)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                      >
                        Previous
                      </motion.button>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={onClose}
                      className="px-6 py-2 border border-red-300 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                    >
                      Cancel
                    </motion.button>

                    {editMode || currentStep === 3 ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                      >
                        <HiCheck className="w-4 h-4" />
                        <span>{editMode ? "Update PPT" : "Create PPT"}</span>
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => {
                          if (currentStep === 1 && !pptName.trim()) {
                            setErrors({ pptName: 'PPT name is required' });
                            return;
                          }
                          if (currentStep === 2 && !allDepartment && !department) {
                            setErrors({ department: 'Please select a department or choose All Departments' });
                            return;
                          }
                          setCurrentStep(prev => prev + 1);
                          setErrors({});
                        }}
                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
                      >
                        <span>Next</span>
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          →
                        </motion.div>
                      </motion.button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </BaseModal>
  );
};

export default InductionPPTModal;