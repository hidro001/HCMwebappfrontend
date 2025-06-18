// import React, { useEffect, useState } from "react";
// import BaseModal from "../../../common/BaseModal";
// import useDepartmentStore from "../../../../store/departmentStore";
// import useCategoryStore from "../../../../store/useCategoryStore";
// import usePolicyStore from "../../../../store/usePolicyStore";

// // Import your loader
// import FullScreenLoader from "../../../common/FullScreenLoader";

// const PolicyModal = ({ isOpen, onClose, policy }) => {
//   // Zustand stores
//   const { createPolicy, updatePolicy, loading: storeLoading } = usePolicyStore();
//   const { departments, fetchDepartments } = useDepartmentStore();
//   const { categories, fetchCategories } = useCategoryStore();

//   // Local state for form fields
//   const [title, setTitle] = useState("");
//   const [policyNumber, setPolicyNumber] = useState("");
//   const [category, setCategory] = useState("");
//   const [department, setDepartment] = useState("");
//   const [description, setDescription] = useState("");
//   const [coverImage, setCoverImage] = useState(null);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [effectiveDate, setEffectiveDate] = useState("");
//   const [reviewDate, setReviewDate] = useState("");

//   // Load departments/categories when the modal opens
//   useEffect(() => {
//     if (isOpen) {
//       fetchDepartments();
//       fetchCategories();
//     }
//   }, [isOpen, fetchDepartments, fetchCategories]);

//   // Decide if editing or creating
//   const isEditMode = Boolean(policy && policy._id);

//   // When "policy" changes, populate or clear fields
//   useEffect(() => {
//     if (policy) {
//       // Edit mode => populate fields
//       setTitle(policy.title || "");
//       setPolicyNumber(policy.policyNumber || "");
//       setCategory(policy.category || "");
//       setDepartment(policy.department || "");
//       setDescription(policy.description || "");
//       setEffectiveDate(
//         policy.effectiveDate ? policy.effectiveDate.substring(0, 10) : ""
//       );
//       setReviewDate(
//         policy.reviewDate ? policy.reviewDate.substring(0, 10) : ""
//       );
//       setCoverImage(null);
//       setPdfFile(null);
//     } else {
//       // Add mode => clear fields
//       setTitle("");
//       setPolicyNumber("");
//       setCategory("");
//       setDepartment("");
//       setDescription("");
//       setCoverImage(null);
//       setPdfFile(null);
//       setEffectiveDate("");
//       setReviewDate("");
//     }
//   }, [policy]);

//   if (!isOpen) return null;

//   // On form submit, create or update
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const dataToSend = {
//       title,
//       policyNumber,
//       category,
//       department,
//       description,
//       effectiveDate,
//       reviewDate,
//     };
//     if (coverImage) dataToSend.coverImage = coverImage;
//     if (pdfFile) dataToSend.pdfFile = pdfFile;

//     if (isEditMode) {
//       await updatePolicy(policy._id, dataToSend);
//     } else {
//       await createPolicy(dataToSend);
//     }

//     onClose();
//   };

//   return (
//     <>
//       {/* If the store is loading, show the full-screen loader */}
//       {storeLoading && <FullScreenLoader />}

//       <BaseModal isOpen={isOpen} onClose={onClose}>
//         <div
//           className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg h-[90vh] overflow-y-auto
//             [&::-webkit-scrollbar]:w-2
//             [&::-webkit-scrollbar-track]:rounded-full
//             [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
//             [&::-webkit-scrollbar-thumb]:rounded-full
//             [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
//           "
//         >
//           <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
//             {isEditMode ? "Edit Policy" : "Add New Policy"}
//           </h2>

//           <form className="space-y-4" onSubmit={handleSubmit}>
//             {/* Title */}
//             <div>
//               <label className="block text-gray-700 dark:text-gray-300 mb-1">
//                 Policy Title <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//                 className="w-full border border-gray-300 dark:border-gray-600 
//                            rounded px-3 py-2 bg-white dark:bg-gray-700 
//                            text-gray-900 dark:text-gray-100"
//               />
//             </div>

//             {/* Policy Number */}
//             <div>
//               <label className="block text-gray-700 dark:text-gray-300 mb-1">
//                 Policy Number
//               </label>
//               <input
//                 type="text"
//                 value={policyNumber}
//                 onChange={(e) => setPolicyNumber(e.target.value)}
//                 className="w-full border border-gray-300 dark:border-gray-600 
//                            rounded px-3 py-2 bg-white dark:bg-gray-700 
//                            text-gray-900 dark:text-gray-100"
//               />
//             </div>

//             {/* Category */}
//             <div>
//               <label className="block text-gray-700 dark:text-gray-300 mb-1">
//                 Category <span className="text-red-500">*</span>
//               </label>
//               <select
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 required
//                 className="w-full border border-gray-300 dark:border-gray-600 
//                            rounded px-3 py-2 bg-white dark:bg-gray-700 
//                            text-gray-900 dark:text-gray-100"
//               >
//                 <option value="">Select category</option>
//                 {categories.map((cat) => (
//                   <option key={cat._id} value={cat.name}>
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Department */}
//             {/* <div>
//               <label className="block text-gray-700 dark:text-gray-300 mb-1">
//                 Department <span className="text-red-500">*</span>
//               </label>
//               <select
//                 value={department}
//                 onChange={(e) => setDepartment(e.target.value)}
//                 required
//                 className="w-full border border-gray-300 dark:border-gray-600 
//                            rounded px-3 py-2 bg-white dark:bg-gray-700 
//                            text-gray-900 dark:text-gray-100"
//               >
//                 <option value="">Select department</option>
//                 {departments.map((dep) => (
//                   <option key={dep._id} value={dep.department}>
//                     {dep.department}
//                   </option>
//                 ))}
//               </select>
//             </div> */}

//             {/* Description */}
//             <div>
//               <label className="block text-gray-700 dark:text-gray-300 mb-1">
//                 Description
//               </label>
//               <textarea
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 rows="3"
//                 className="w-full border border-gray-300 dark:border-gray-600 
//                            rounded px-3 py-2 bg-white dark:bg-gray-700 
//                            text-gray-900 dark:text-gray-100"
//               ></textarea>
//             </div>

//             {/* Cover Image */}
//             <div>
//               <label className="block text-gray-700 dark:text-gray-300 mb-1">
//                 Cover Image {isEditMode && "(upload new to replace existing)"}
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => setCoverImage(e.target.files[0])}
//                 className="w-full text-gray-900 dark:text-gray-100"
//               />
//               {isEditMode && policy.coverImage && !coverImage && (
//                 <div className="text-xs text-gray-500 mt-1">
//                   Current:{" "}
//                   <a href={policy.coverImage} target="_blank" rel="noreferrer">
//                     {policy.coverImage}
//                   </a>
//                 </div>
//               )}
//             </div>

//             {/* PDF File */}
//             <div>
//               <label className="block text-gray-700 dark:text-gray-300 mb-1">
//                 Policy Document (PDF)
//                 {isEditMode && " (upload new to replace)"}
//                 <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="file"
//                 accept="application/pdf"
//                 onChange={(e) => setPdfFile(e.target.files[0])}
//                 className="w-full text-gray-900 dark:text-gray-100"
//                 required={!isEditMode} 
//                 // only required in create mode
//               />
//               {isEditMode && policy.pdfUrl && !pdfFile && (
//                 <div className="text-xs text-gray-500 mt-1">
//                   Current PDF:{" "}
//                   <a href={policy.pdfUrl} target="_blank" rel="noreferrer">
//                     {policy.pdfUrl}
//                   </a>
//                 </div>
//               )}
//             </div>

//             {/* Dates */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-gray-700 dark:text-gray-300 mb-1">
//                   Effective Date
//                 </label>
//                 <input
//                   type="date"
//                   value={effectiveDate}
//                   onChange={(e) => setEffectiveDate(e.target.value)}
//                   className="w-full border border-gray-300 dark:border-gray-600 
//                              rounded px-3 py-2 bg-white dark:bg-gray-700 
//                              text-gray-900 dark:text-gray-100"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 dark:text-gray-300 mb-1">
//                   Review Date
//                 </label>
//                 <input
//                   type="date"
//                   value={reviewDate}
//                   onChange={(e) => setReviewDate(e.target.value)}
//                   className="w-full border border-gray-300 dark:border-gray-600 
//                              rounded px-3 py-2 bg-white dark:bg-gray-700 
//                              text-gray-900 dark:text-gray-100"
//                 />
//               </div>
//             </div>

//             {/* Modal Actions */}
//             <div className="flex justify-end space-x-3 mt-6">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 bg-gray-300 dark:bg-gray-600 
//                            text-gray-700 dark:text-gray-200 
//                            rounded hover:bg-gray-400 dark:hover:bg-gray-500"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//               >
//                 {isEditMode ? "Save Changes" : "Upload Policy"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </BaseModal>
//     </>
//   );
// };

// export default PolicyModal;



import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaSave,
  FaPlus,
  FaEdit,
  FaFileAlt,
  FaImage,
  FaCalendarAlt,
  FaTags,
  FaBuilding,
  FaInfoCircle,
  FaUpload,
  FaLink,
  FaCheckCircle
} from "react-icons/fa";
import {
  HiDocumentText,
  HiX,
  HiCheck,
  HiPlus,
  HiPhotograph,
  HiCalendar,
  HiTag,
  HiOfficeBuilding,
  HiInformationCircle,
  HiUpload
} from "react-icons/hi";
import BaseModal from "../../../common/BaseModal";
import useDepartmentStore from "../../../../store/departmentStore";
import useCategoryStore from "../../../../store/useCategoryStore";
import usePolicyStore from "../../../../store/usePolicyStore";
import FullScreenLoader from "../../../common/FullScreenLoader";

const PolicyModal = ({ isOpen, onClose, policy }) => {
  // Zustand stores
  const { createPolicy, updatePolicy, loading: storeLoading } = usePolicyStore();
  const { departments, fetchDepartments } = useDepartmentStore();
  const { categories, fetchCategories } = useCategoryStore();

  // Local state for form fields
  const [title, setTitle] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [category, setCategory] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [effectiveDate, setEffectiveDate] = useState("");
  const [reviewDate, setReviewDate] = useState("");
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  // Load departments/categories when the modal opens
  useEffect(() => {
    if (isOpen) {
      fetchDepartments();
      fetchCategories();
    }
  }, [isOpen, fetchDepartments, fetchCategories]);

  // Decide if editing or creating
  const isEditMode = Boolean(policy && policy._id);

  // When "policy" changes, populate or clear fields
  useEffect(() => {
    if (policy) {
      // Edit mode => populate fields
      setTitle(policy.title || "");
      setPolicyNumber(policy.policyNumber || "");
      setCategory(policy.category || "");
      setDepartment(policy.department || "");
      setDescription(policy.description || "");
      setEffectiveDate(
        policy.effectiveDate ? policy.effectiveDate.substring(0, 10) : ""
      );
      setReviewDate(
        policy.reviewDate ? policy.reviewDate.substring(0, 10) : ""
      );
      setCoverImage(null);
      setPdfFile(null);
      setCoverImagePreview(policy.coverImage || null);
    } else {
      // Add mode => clear fields
      setTitle("");
      setPolicyNumber("");
      setCategory("");
      setDepartment("");
      setDescription("");
      setCoverImage(null);
      setPdfFile(null);
      setEffectiveDate("");
      setReviewDate("");
      setCoverImagePreview(null);
    }
    setCurrentStep(1);
  }, [policy]);

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setCoverImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  // On form submit, create or update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      title,
      policyNumber,
      category,
      department,
      description,
      effectiveDate,
      reviewDate,
    };
    if (coverImage) dataToSend.coverImage = coverImage;
    if (pdfFile) dataToSend.pdfFile = pdfFile;

    if (isEditMode) {
      await updatePolicy(policy._id, dataToSend);
    } else {
      await createPolicy(dataToSend);
    }

    onClose();
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

  const steps = [
    { id: 1, name: "Basic Info", icon: HiInformationCircle },
    { id: 2, name: "Media & Dates", icon: HiPhotograph },
    { id: 3, name: "Review", icon: HiCheck }
  ];

  const isStepComplete = (step) => {
    switch (step) {
      case 1:
        return title && category;
      case 2:
        return true; // Media and dates are optional
      case 3:
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-2"
            >
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <div className="p-1.5 bg-blue-100 dark:bg-blue-900/20 rounded-md">
                  <HiDocumentText className="text-blue-600 dark:text-blue-400 text-sm" />
                </div>
                <span>Policy Title</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Remote Work Policy, Code of Conduct"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </motion.div>

            {/* Policy Number */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <div className="p-1.5 bg-green-100 dark:bg-green-900/20 rounded-md">
                  <HiTag className="text-green-600 dark:text-green-400 text-sm" />
                </div>
                <span>Policy Number</span>
              </label>
              <input
                type="text"
                value={policyNumber}
                onChange={(e) => setPolicyNumber(e.target.value)}
                placeholder="e.g., POL-001, HR-2024-001"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
            </motion.div>

            {/* Category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <div className="p-1.5 bg-purple-100 dark:bg-purple-900/20 rounded-md">
                  <FaTags className="text-purple-600 dark:text-purple-400 text-sm" />
                </div>
                <span>Category</span>
                <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <div className="p-1.5 bg-orange-100 dark:bg-orange-900/20 rounded-md">
                  <HiInformationCircle className="text-orange-600 dark:text-orange-400 text-sm" />
                </div>
                <span>Description</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                placeholder="Brief description of the policy and its purpose..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
              />
            </motion.div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Cover Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-2"
            >
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/20 rounded-md">
                  <HiPhotograph className="text-indigo-600 dark:text-indigo-400 text-sm" />
                </div>
                <span>Cover Image</span>
                {isEditMode && <span className="text-xs text-gray-500">(upload new to replace)</span>}
              </label>
              
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center">
                {coverImagePreview ? (
                  <div className="space-y-3">
                    <img
                      src={coverImagePreview}
                      alt="Cover preview"
                      className="mx-auto h-32 w-auto object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setCoverImage(null);
                        setCoverImagePreview(null);
                      }}
                      className="text-sm text-red-600 hover:text-red-800 dark:text-red-400"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <HiPhotograph className="mx-auto h-12 w-12 text-gray-400" />
                    <div>
                      <label className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-500 font-medium">
                          Click to upload
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCoverImageChange}
                          className="hidden"
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                )}
              </div>

              {isEditMode && policy.coverImage && !coverImage && (
                <div className="text-xs text-gray-500 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <span>Current image: </span>
                  <a 
                    href={policy.coverImage} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                  >
                    View current
                  </a>
                </div>
              )}
            </motion.div>

            {/* PDF File */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <div className="p-1.5 bg-red-100 dark:bg-red-900/20 rounded-md">
                  <FaFileAlt className="text-red-600 dark:text-red-400 text-sm" />
                </div>
                <span>Policy Document (PDF)</span>
                {!isEditMode && <span className="text-red-500">*</span>}
                {isEditMode && <span className="text-xs text-gray-500">(upload new to replace)</span>}
              </label>
              
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center">
                {pdfFile ? (
                  <div className="space-y-3">
                    <FaFileAlt className="mx-auto h-12 w-12 text-red-600" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{pdfFile.name}</p>
                      <p className="text-sm text-gray-500">{(pdfFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPdfFile(null)}
                      className="text-sm text-red-600 hover:text-red-800 dark:text-red-400"
                    >
                      Remove File
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <HiUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <div>
                      <label className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-500 font-medium">
                          Click to upload PDF
                        </span>
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={(e) => setPdfFile(e.target.files[0])}
                          className="hidden"
                          required={!isEditMode}
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-1">PDF files only, up to 50MB</p>
                    </div>
                  </div>
                )}
              </div>

              {isEditMode && policy.pdfUrl && !pdfFile && (
                <div className="text-xs text-gray-500 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <span>Current PDF: </span>
                  <a 
                    href={policy.pdfUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                  >
                    View current document
                  </a>
                </div>
              )}
            </motion.div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <div className="p-1.5 bg-blue-100 dark:bg-blue-900/20 rounded-md">
                    <HiCalendar className="text-blue-600 dark:text-blue-400 text-sm" />
                  </div>
                  <span>Effective Date</span>
                </label>
                <input
                  type="date"
                  value={effectiveDate}
                  onChange={(e) => setEffectiveDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <div className="p-1.5 bg-green-100 dark:bg-green-900/20 rounded-md">
                    <HiCalendar className="text-green-600 dark:text-green-400 text-sm" />
                  </div>
                  <span>Review Date</span>
                </label>
                <input
                  type="date"
                  value={reviewDate}
                  onChange={(e) => setReviewDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
              </motion.div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <FaCheckCircle className="text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Review Policy Details
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Title</p>
                    <p className="text-gray-900 dark:text-white">{title || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Policy Number</p>
                    <p className="text-gray-900 dark:text-white">{policyNumber || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Category</p>
                    <p className="text-gray-900 dark:text-white">{category || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Effective Date</p>
                    <p className="text-gray-900 dark:text-white">{effectiveDate || "Not specified"}</p>
                  </div>
                </div>
                
                {description && (
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Description</p>
                    <p className="text-gray-900 dark:text-white">{description}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Cover Image</p>
                    <p className="text-gray-900 dark:text-white">
                      {coverImage ? "New image selected" : coverImagePreview ? "Current image" : "No image"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">PDF Document</p>
                    <p className="text-gray-900 dark:text-white">
                      {pdfFile ? "New document selected" : isEditMode ? "Existing document" : "No document"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {storeLoading && <FullScreenLoader />}

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
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-hidden"
              >
                {/* Modal Header */}
                <div className="bg-blue-50 dark:bg-blue-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                        {isEditMode ? (
                          <FaEdit className="text-blue-600 dark:text-blue-400 text-xl" />
                        ) : (
                          <HiPlus className="text-blue-600 dark:text-blue-400 text-xl" />
                        )}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                          {isEditMode ? "Edit Policy" : "Add New Policy"}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {isEditMode ? "Update policy information" : "Create a new company policy"}
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

                {/* Modal Content */}
                <form onSubmit={handleSubmit} className="flex flex-col h-full">
                  <div className="flex-1 overflow-y-auto p-6">
                    {renderStepContent()}
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
                          type="button"
                          onClick={onClose}
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
                            type="submit"
                            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                          >
                            {isEditMode ? (
                              <>
                                <FaSave className="text-sm" />
                                <span>Save Changes</span>
                              </>
                            ) : (
                              <>
                                <HiUpload className="text-sm" />
                                <span>Upload Policy</span>
                              </>
                            )}
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </BaseModal>
    </>
  );
};

export default PolicyModal;