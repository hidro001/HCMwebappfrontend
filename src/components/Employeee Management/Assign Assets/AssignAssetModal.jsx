
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import DatePicker from "react-datepicker";
// import { FaCalendarAlt } from "react-icons/fa";
// import "react-datepicker/dist/react-datepicker.css";
// import useAssetStore from "../../../store/useAssetStore";
// import BaseModal from "../../common/BaseModal";
// import FullScreenLoader from "../../common/FullScreenLoader";

// const overlayAnimation = {
//   layout: true,
//   initial: { opacity: 0, scale: 0.95 },
//   animate: { opacity: 1, scale: 1 },
//   exit: { opacity: 0, scale: 0.95 },
//   transition: { duration: 0.2 },
// };

// export default function AssignAssetModal({
//   isOpen,
//   onClose,
//   employeeId,
//   employeeName = "",
// }) {
//   const { assetGroups, getAssetGroups, assignAsset } = useAssetStore();

//   // New loading state
//   const [loading, setLoading] = useState(false);

//   // form fields
//   const [assetNo, setAssetNo] = useState("");
//   const [assetGroup, setAssetGroup] = useState("");
//   const [brand, setBrand] = useState("");
//   const [model, setModel] = useState("");
//   const [valueInRupee, setValueInRupee] = useState("");
//   const [status, setStatus] = useState("");
//   const [assignDate, setAssignDate] = useState(new Date());
//   const [invoice, setInvoice] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState(null);
//   const [warranty, setWarranty] = useState(false);

//   useEffect(() => {
//     if (isOpen) {
//       // fetch asset groups
//       getAssetGroups();

//       // prevent body scroll
//       const originalStyle = window.getComputedStyle(document.body).overflow;
//       document.body.style.overflow = "hidden";
//       return () => {
//         document.body.style.overflow = originalStyle;
//       };
//     }
//   }, [isOpen, getAssetGroups]);

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setImage(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const dataToSubmit = {
//       assetNo,
//       assetGroup,
//       brand,
//       model,
//       valueInRupee,
//       status,
//       assignDate: assignDate?.toISOString().split("T")[0] || "",
//       invoice,
//       description,
//       image,
//       warranty,
//     };

//     try {
//       setLoading(true); // Show loader

//       // Note: If your `assignAsset` accepts a success-callback,
//       // feel free to remove that pattern and just use await instead.
//       await assignAsset(employeeId, dataToSubmit);

//       // If successful, close the modal
//       onClose();
//     } catch (error) {
//       // Handle error if needed
//       console.error(error);
//     } finally {
//       setLoading(false); // Hide loader
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//       {/* If loading, show the FullScreenLoader */}
//       {loading && <FullScreenLoader />}

//       <BaseModal isOpen={isOpen} onClose={onClose}>
//         <motion.div
//           layout
//           className="bg-white dark:bg-gray-800 rounded-md p-6 w-full max-w-4xl shadow-lg"
//           {...overlayAnimation}
//         >
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-semibold">
//               Assign Asset to ({employeeName || "Employee"})
//             </h2>
//             <button
//               onClick={onClose}
//               className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 text-2xl leading-none"
//             >
//               &times;
//             </button>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               {/* Asset No */}
//               <div className="flex flex-col">
//                 <label className="mb-1 text-sm font-medium">
//                   Asset Number <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full border border-gray-300 dark:border-gray-600
//                              rounded px-3 py-2 focus:outline-none
//                              bg-white dark:bg-gray-700 dark:text-white"
//                   required
//                   value={assetNo}
//                   onChange={(e) => setAssetNo(e.target.value)}
//                 />
//               </div>

//               {/* Asset Group */}
//               <div className="flex flex-col">
//                 <label className="mb-1 text-sm font-medium">
//                   Asset Group <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   className="w-full border border-gray-300 dark:border-gray-600
//                              rounded px-3 py-2 focus:outline-none
//                              bg-white dark:bg-gray-700 dark:text-white"
//                   required
//                   value={assetGroup}
//                   onChange={(e) => setAssetGroup(e.target.value)}
//                 >
//                   <option value="">Select</option>
//                   {assetGroups.map((group) => (
//                     <option key={group._id} value={group.name}>
//                       {group.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Description */}
//               <div className="flex flex-col">
//                 <label className="mb-1 text-sm font-medium">
//                   Description <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   className="w-full border border-gray-300 dark:border-gray-600
//                              rounded px-3 py-2 focus:outline-none
//                              bg-white dark:bg-gray-700 dark:text-white"
//                   rows={3}
//                   required
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//               </div>

//               {/* Brand */}
//               <div className="flex flex-col">
//                 <label className="mb-1 text-sm font-medium">
//                   Brand <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   className="w-full border border-gray-300 dark:border-gray-600
//                              rounded px-3 py-2 focus:outline-none
//                              bg-white dark:bg-gray-700 dark:text-white"
//                   value={brand}
//                   onChange={(e) => setBrand(e.target.value)}
//                 />
//               </div>

//               {/* Model */}
//               <div className="flex flex-col">
//                 <label className="mb-1 text-sm font-medium">
//                   Model <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   className="w-full border border-gray-300 dark:border-gray-600
//                              rounded px-3 py-2 focus:outline-none
//                              bg-white dark:bg-gray-700 dark:text-white"
//                   value={model}
//                   onChange={(e) => setModel(e.target.value)}
//                 />
//               </div>

//               {/* Invoice */}
//               <div className="flex flex-col">
//                 <label className="mb-1 text-sm font-medium">
//                   Invoice Number <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   className="w-full border border-gray-300 dark:border-gray-600
//                              rounded px-3 py-2 focus:outline-none
//                              bg-white dark:bg-gray-700 dark:text-white"
//                   value={invoice}
//                   onChange={(e) => setInvoice(e.target.value)}
//                 />
//               </div>

//               {/* Value in Rupee */}
//               <div className="flex flex-col">
//                 <label className="mb-1 text-sm font-medium">
//                   Value (in Rupees) <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="number"
//                   min="0"
//                   required
//                   className="w-full border border-gray-300 dark:border-gray-600
//                              rounded px-3 py-2 focus:outline-none
//                              bg-white dark:bg-gray-700 dark:text-white"
//                   value={valueInRupee}
//                   onChange={(e) => setValueInRupee(e.target.value)}
//                 />
//               </div>

//               {/* Warranty */}
//               <div className="flex items-center space-x-2 mt-6">
//                 <input
//                   type="checkbox"
//                   id="warranty"
//                   checked={warranty}
//                   onChange={(e) => setWarranty(e.target.checked)}
//                 />
//                 <label htmlFor="warranty" className="text-sm font-medium">
//                   Under Warranty?
//                 </label>
//               </div>

//               {/* Image */}
//               <div className="flex flex-col">
//                 <label className="mb-1 text-sm font-medium">
//                   Image <span className="text-red-500">*</span>
//                 </label>
//                 <div className="flex items-center space-x-2">
//                   <label
//                     className="flex flex-col items-center px-3 py-2 bg-blue-50 text-blue-600
//                                border border-blue-300 rounded cursor-pointer hover:bg-blue-100
//                                transition-colors text-sm"
//                   >
//                     <span>Click to upload</span>
//                     <input
//                       type="file"
//                       className="hidden"
//                       accept="image/*"
//                       required
//                       onChange={handleFileChange}
//                     />
//                   </label>
//                   <span className="text-sm">
//                     {image ? image.name : "No file chosen"}
//                   </span>
//                 </div>
//               </div>

//               {/* Status */}
//               <div className="flex flex-col">
//                 <label className="mb-1 text-sm font-medium">
//                   Status <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   required
//                   className="w-full border border-gray-300 dark:border-gray-600
//                              rounded px-3 py-2 focus:outline-none
//                              bg-white dark:bg-gray-700 dark:text-white"
//                   value={status}
//                   onChange={(e) => setStatus(e.target.value)}
//                 >
//                   <option value="">Select</option>
//                   <option value="Assigned">Assigned</option>
//                   <option value="Returned">Returned</option>
//                 </select>
//               </div>

//               {/* Assign Date */}
//               <div className="flex flex-col">
//                 <label className="mb-1 text-sm font-medium">
//                   Assign Date <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <DatePicker
//                     selected={assignDate}
//                     onChange={(date) => setAssignDate(date)}
//                     dateFormat="dd/MM/yyyy"
//                     placeholderText="DD/MM/YYYY"
//                     className="w-full border border-gray-300 dark:border-gray-600
//                                rounded px-3 py-2 focus:outline-none
//                                bg-white dark:bg-gray-700 dark:text-white pl-10"
//                   />
//                   <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center justify-end space-x-3 pt-4">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 rounded border border-orange-400
//                            text-orange-500 hover:bg-orange-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 rounded bg-blue-600 text-white
//                            hover:bg-blue-700 transition-colors"
//               >
//                 Assign Asset
//               </button>
//             </div>
//           </form>
//         </motion.div>
//       </BaseModal>
//     </>
//   );
// }




// import { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import { 
//   FaCalendarAlt, 
//   FaTimes, 
//   FaUser, 
//   FaClipboardList,
//   FaBoxOpen,
//   FaTags,
//   FaIndustry,
//   FaCar,
//   FaDollarSign,
//   FaFileInvoiceDollar,
//   FaUpload,
//   FaCheckCircle,
//   FaSpinner,
//   FaImage,
//   FaShieldAlt,
//   FaCheck
// } from "react-icons/fa";
// import "react-datepicker/dist/react-datepicker.css";
// import useAssetStore from "../../../store/useAssetStore";
// import BaseModal from "../../common/BaseModal";
// import FullScreenLoader from "../../common/FullScreenLoader";

// export default function AssignAssetModal({
//   isOpen,
//   onClose,
//   employeeId,
//   employeeName = "",
// }) {
//   const { assetGroups, getAssetGroups, assignAsset } = useAssetStore();

//   // Loading state
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   // Form fields
//   const [assetNo, setAssetNo] = useState("");
//   const [assetGroup, setAssetGroup] = useState("");
//   const [brand, setBrand] = useState("");
//   const [model, setModel] = useState("");
//   const [valueInRupee, setValueInRupee] = useState("");
//   const [status, setStatus] = useState("");
//   const [assignDate, setAssignDate] = useState(new Date());
//   const [invoice, setInvoice] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState(null);
//   const [warranty, setWarranty] = useState(false);

//   useEffect(() => {
//     if (isOpen) {
//       // Reset form when modal opens
//       resetForm();
//       getAssetGroups();
//     }
//   }, [isOpen]);

//   const resetForm = () => {
//     setAssetNo("");
//     setAssetGroup("");
//     setBrand("");
//     setModel("");
//     setValueInRupee("");
//     setStatus("");
//     setAssignDate(new Date());
//     setInvoice("");
//     setDescription("");
//     setImage(null);
//     setWarranty(false);
//     setErrors({});
//     setLoading(false);
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!assetNo.trim()) newErrors.assetNo = "Asset number is required";
//     if (!assetGroup) newErrors.assetGroup = "Asset group is required";
//     if (!brand.trim()) newErrors.brand = "Brand is required";
//     if (!model.trim()) newErrors.model = "Model is required";
//     if (!valueInRupee || parseFloat(valueInRupee) <= 0) newErrors.valueInRupee = "Valid value is required";
//     if (!status) newErrors.status = "Status is required";
//     if (!invoice.trim()) newErrors.invoice = "Invoice number is required";
//     if (!description.trim()) newErrors.description = "Description is required";
//     if (!image) newErrors.image = "Image is required";
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const file = e.target.files[0];
//       // Validate file type
//       if (!file.type.startsWith('image/')) {
//         setErrors(prev => ({ ...prev, image: 'Please select a valid image file' }));
//         return;
//       }
//       // Validate file size (max 5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         setErrors(prev => ({ ...prev, image: 'File size must be less than 5MB' }));
//         return;
//       }
//       setImage(file);
//       setErrors(prev => ({ ...prev, image: '' }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     const dataToSubmit = {
//       assetNo: assetNo.trim(),
//       assetGroup,
//       brand: brand.trim(),
//       model: model.trim(),
//       valueInRupee: parseFloat(valueInRupee),
//       status,
//       assignDate: assignDate?.toISOString().split("T")[0] || "",
//       invoice: invoice.trim(),
//       description: description.trim(),
//       image,
//       warranty,
//     };

//     try {
//       setLoading(true);
//       await assignAsset(employeeId, dataToSubmit);
//       onClose();
//     } catch (error) {
//       console.error(error);
//       setErrors({ submit: 'Failed to assign asset. Please try again.' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const InputField = ({ label, icon: Icon, error, required = false, children }) => (
//     <div className="space-y-2">
//       <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
//         <span className="flex items-center space-x-2">
//           {Icon && <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
//           <span>{label}</span>
//           {required && <span className="text-red-500">*</span>}
//         </span>
//       </label>
//       {children}
//       {error && (
//         <p className="text-sm text-red-600 dark:text-red-400 flex items-center space-x-1">
//           <span>⚠️</span>
//           <span>{error}</span>
//         </p>
//       )}
//     </div>
//   );

//   return (
//     <>
//       {loading && <FullScreenLoader />}

//       <BaseModal isOpen={isOpen} onClose={onClose}>
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-5xl mx-auto overflow-hidden transform transition-all duration-300 scale-100 opacity-100 max-h-[95vh]">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 relative">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-3">
//                 <div className="p-2 bg-white/20 rounded-lg">
//                   <FaClipboardList className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-bold text-white">Assign Asset</h2>
//                   <p className="text-blue-100 text-sm">
//                     Assign asset to {employeeName || "Employee"}
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={onClose}
//                 disabled={loading}
//                 className="p-2 text-white/70 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200 disabled:opacity-50"
//                 aria-label="Close modal"
//               >
//                 <FaTimes className="w-5 h-5" />
//               </button>
//             </div>
            
//             {/* Decorative element */}
//             <div className="absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
//           </div>

//           {/* Form Content */}
//           <div className="p-6 overflow-y-auto max-h-[calc(95vh-100px)]">
//             {errors.submit && (
//               <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
//                 <p className="text-red-600 dark:text-red-400 text-sm flex items-center space-x-2">
//                   <span>⚠️</span>
//                   <span>{errors.submit}</span>
//                 </p>
//               </div>
//             )}

//             <div onSubmit={handleSubmit} className="space-y-6">
//               {/* Asset Information Section */}
//               <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
//                   <FaBoxOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//                   <span>Asset Information</span>
//                 </h3>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <InputField label="Asset Number" icon={FaTags} error={errors.assetNo} required>
//                     <input
//                       type="text"
//                       placeholder="Enter asset number..."
//                       className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
//                         errors.assetNo 
//                           ? 'border-red-500 focus:ring-red-500' 
//                           : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
//                       }`}
//                       value={assetNo}
//                       onChange={(e) => setAssetNo(e.target.value)}
//                       disabled={loading}
//                     />
//                   </InputField>

//                   <InputField label="Asset Group" icon={FaBoxOpen} error={errors.assetGroup} required>
//                     <select
//                       className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
//                         errors.assetGroup 
//                           ? 'border-red-500 focus:ring-red-500' 
//                           : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
//                       }`}
//                       value={assetGroup}
//                       onChange={(e) => setAssetGroup(e.target.value)}
//                       disabled={loading}
//                     >
//                       <option value="">Select asset group...</option>
//                       {assetGroups.map((group) => (
//                         <option key={group._id} value={group.name}>
//                           {group.name}
//                         </option>
//                       ))}
//                     </select>
//                   </InputField>

//                   <InputField label="Brand" icon={FaIndustry} error={errors.brand} required>
//                     <input
//                       type="text"
//                       placeholder="Enter brand name..."
//                       className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
//                         errors.brand 
//                           ? 'border-red-500 focus:ring-red-500' 
//                           : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
//                       }`}
//                       value={brand}
//                       onChange={(e) => setBrand(e.target.value)}
//                       disabled={loading}
//                     />
//                   </InputField>

//                   <InputField label="Model" icon={FaCar} error={errors.model} required>
//                     <input
//                       type="text"
//                       placeholder="Enter model name..."
//                       className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
//                         errors.model 
//                           ? 'border-red-500 focus:ring-red-500' 
//                           : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
//                       }`}
//                       value={model}
//                       onChange={(e) => setModel(e.target.value)}
//                       disabled={loading}
//                     />
//                   </InputField>
//                 </div>

//                 <div className="mt-6">
//                   <InputField label="Description" error={errors.description} required>
//                     <textarea
//                       placeholder="Describe the asset..."
//                       rows={3}
//                       className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 resize-none ${
//                         errors.description 
//                           ? 'border-red-500 focus:ring-red-500' 
//                           : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
//                       }`}
//                       value={description}
//                       onChange={(e) => setDescription(e.target.value)}
//                       disabled={loading}
//                     />
//                   </InputField>
//                 </div>
//               </div>

//               {/* Financial Information Section */}
//               <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
//                   <FaDollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
//                   <span>Financial Information</span>
//                 </h3>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <InputField label="Value (₹)" icon={FaDollarSign} error={errors.valueInRupee} required>
//                     <input
//                       type="number"
//                       min="0"
//                       step="0.01"
//                       placeholder="Enter asset value..."
//                       className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
//                         errors.valueInRupee 
//                           ? 'border-red-500 focus:ring-red-500' 
//                           : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
//                       }`}
//                       value={valueInRupee}
//                       onChange={(e) => setValueInRupee(e.target.value)}
//                       disabled={loading}
//                     />
//                   </InputField>

//                   <InputField label="Invoice Number" icon={FaFileInvoiceDollar} error={errors.invoice} required>
//                     <input
//                       type="text"
//                       placeholder="Enter invoice number..."
//                       className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
//                         errors.invoice 
//                           ? 'border-red-500 focus:ring-red-500' 
//                           : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
//                       }`}
//                       value={invoice}
//                       onChange={(e) => setInvoice(e.target.value)}
//                       disabled={loading}
//                     />
//                   </InputField>
//                 </div>
//               </div>

//               {/* Assignment Information Section */}
//               <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
//                   <FaUser className="w-5 h-5 text-purple-600 dark:text-purple-400" />
//                   <span>Assignment Information</span>
//                 </h3>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <InputField label="Status" error={errors.status} required>
//                     <select
//                       className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
//                         errors.status 
//                           ? 'border-red-500 focus:ring-red-500' 
//                           : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
//                       }`}
//                       value={status}
//                       onChange={(e) => setStatus(e.target.value)}
//                       disabled={loading}
//                     >
//                       <option value="">Select status...</option>
//                       <option value="Assigned">Assigned</option>
//                       <option value="Returned">Returned</option>
//                     </select>
//                   </InputField>

//                   <InputField label="Assignment Date" icon={FaCalendarAlt} required>
//                     <div className="relative">
//                       <DatePicker
//                         selected={assignDate}
//                         onChange={(date) => setAssignDate(date)}
//                         dateFormat="dd/MM/yyyy"
//                         placeholderText="Select date..."
//                         className="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                         disabled={loading}
//                       />
//                       <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                     </div>
//                   </InputField>
//                 </div>

//                 {/* Warranty Checkbox */}
//                 <div className="mt-6">
//                   <label className="flex items-center space-x-3 cursor-pointer">
//                     <div className="relative">
//                       <input
//                         type="checkbox"
//                         checked={warranty}
//                         onChange={(e) => setWarranty(e.target.checked)}
//                         disabled={loading}
//                         className="sr-only peer"
//                       />
//                       <div className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded border-2 border-gray-300 dark:border-gray-600 peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all duration-200 flex items-center justify-center">
//                         {warranty && <FaCheck className="w-3 h-3 text-white" />}
//                       </div>
//                     </div>
//                     <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
//                       <FaShieldAlt className="w-4 h-4 text-green-600 dark:text-green-400" />
//                       <span>Under Warranty</span>
//                     </span>
//                   </label>
//                 </div>
//               </div>

//               {/* Image Upload Section */}
//               <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
//                   <FaImage className="w-5 h-5 text-orange-600 dark:text-orange-400" />
//                   <span>Asset Image</span>
//                 </h3>
                
//                 <InputField error={errors.image} required>
//                   <div className="flex items-center justify-center w-full">
//                     <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
//                       errors.image 
//                         ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
//                         : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
//                     }`}>
//                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                         {image ? (
//                           <>
//                             <FaCheckCircle className="w-8 h-8 text-green-600 mb-2" />
//                             <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">{image.name}</p>
//                             <p className="text-xs text-gray-500">Click to change</p>
//                           </>
//                         ) : (
//                           <>
//                             <FaUpload className="w-8 h-8 text-gray-400 mb-2" />
//                             <p className="text-sm text-gray-600 dark:text-gray-300">
//                               <span className="font-semibold">Click to upload</span> or drag and drop
//                             </p>
//                             <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
//                           </>
//                         )}
//                       </div>
//                       <input
//                         type="file"
//                         className="hidden"
//                         accept="image/*"
//                         onChange={handleFileChange}
//                         disabled={loading}
//                       />
//                     </label>
//                   </div>
//                 </InputField>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-600">
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   disabled={loading}
//                   className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   onClick={handleSubmit}
//                   disabled={loading}
//                   className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
//                 >
//                   {loading ? (
//                     <>
//                       <FaSpinner className="w-4 h-4 animate-spin" />
//                       <span>Assigning...</span>
//                     </>
//                   ) : (
//                     <>
//                       <FaClipboardList className="w-4 h-4" />
//                       <span>Assign Asset</span>
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </BaseModal>
//     </>
//   );
// }


import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { 
  FaCalendarAlt, 
  FaTimes, 
  FaUser, 
  FaClipboardList,
  FaBoxOpen,
  FaTags,
  FaIndustry,
  FaCar,
  FaDollarSign,
  FaFileInvoiceDollar,
  FaUpload,
  FaCheckCircle,
  FaSpinner,
  FaImage,
  FaShieldAlt,
  FaCheck
} from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import useAssetStore from "../../../store/useAssetStore";
import BaseModal from "../../common/BaseModal";
import FullScreenLoader from "../../common/FullScreenLoader";

// Move InputField component outside of the main component
const InputField = ({ label, icon: Icon, error, required = false, children }) => (
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
      <span className="flex items-center space-x-2">
        {Icon && <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
        <span>{label}</span>
        {required && <span className="text-red-500">*</span>}
      </span>
    </label>
    {children}
    {error && (
      <p className="text-sm text-red-600 dark:text-red-400 flex items-center space-x-1">
        <span>⚠️</span>
        <span>{error}</span>
      </p>
    )}
  </div>
);

export default function AssignAssetModal({
  isOpen,
  onClose,
  employeeId,
  employeeName = "",
}) {
  const { assetGroups, getAssetGroups, assignAsset } = useAssetStore();

  // Loading state
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Form fields
  const [assetNo, setAssetNo] = useState("");
  const [assetGroup, setAssetGroup] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [valueInRupee, setValueInRupee] = useState("");
  const [status, setStatus] = useState("");
  const [assignDate, setAssignDate] = useState(new Date());
  const [invoice, setInvoice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [warranty, setWarranty] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      resetForm();
      getAssetGroups();
    }
  }, [isOpen]);

  const resetForm = () => {
    setAssetNo("");
    setAssetGroup("");
    setBrand("");
    setModel("");
    setValueInRupee("");
    setStatus("");
    setAssignDate(new Date());
    setInvoice("");
    setDescription("");
    setImage(null);
    setWarranty(false);
    setErrors({});
    setLoading(false);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!assetNo.trim()) newErrors.assetNo = "Asset number is required";
    if (!assetGroup) newErrors.assetGroup = "Asset group is required";
    if (!brand.trim()) newErrors.brand = "Brand is required";
    if (!model.trim()) newErrors.model = "Model is required";
    if (!valueInRupee || parseFloat(valueInRupee) <= 0) newErrors.valueInRupee = "Valid value is required";
    if (!status) newErrors.status = "Status is required";
    if (!invoice.trim()) newErrors.invoice = "Invoice number is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!image) newErrors.image = "Image is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, image: 'Please select a valid image file' }));
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'File size must be less than 5MB' }));
        return;
      }
      setImage(file);
      setErrors(prev => ({ ...prev, image: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const dataToSubmit = {
      assetNo: assetNo.trim(),
      assetGroup,
      brand: brand.trim(),
      model: model.trim(),
      valueInRupee: parseFloat(valueInRupee),
      status,
      assignDate: assignDate?.toISOString().split("T")[0] || "",
      invoice: invoice.trim(),
      description: description.trim(),
      image,
      warranty,
    };

    try {
      setLoading(true);
      await assignAsset(employeeId, dataToSubmit);
      onClose();
    } catch (error) {
      console.error(error);
      setErrors({ submit: 'Failed to assign asset. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <FullScreenLoader />}

      <BaseModal isOpen={isOpen} onClose={onClose}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-5xl mx-auto overflow-hidden transform transition-all duration-300 scale-100 opacity-100 max-h-[90vh]">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <FaClipboardList className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Assign Asset</h2>
                  <p className="text-blue-100 text-sm">
                    Assign asset to {employeeName || "Employee"}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                disabled={loading}
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
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {errors.submit && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-sm flex items-center space-x-2">
                  <span>⚠️</span>
                  <span>{errors.submit}</span>
                </p>
              </div>
            )}

            <div onSubmit={handleSubmit} className="space-y-6">
              {/* Asset Information Section */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
                  <FaBoxOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>Asset Information</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Asset Number" icon={FaTags} error={errors.assetNo} required>
                    <input
                      type="text"
                      placeholder="Enter asset number..."
                      className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                        errors.assetNo 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                      }`}
                      value={assetNo}
                      onChange={(e) => setAssetNo(e.target.value)}
                      disabled={loading}
                    />
                  </InputField>

                  <InputField label="Asset Group" icon={FaBoxOpen} error={errors.assetGroup} required>
                    <select
                      className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                        errors.assetGroup 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                      }`}
                      value={assetGroup}
                      onChange={(e) => setAssetGroup(e.target.value)}
                      disabled={loading}
                    >
                      <option value="">Select asset group...</option>
                      {assetGroups.map((group) => (
                        <option key={group._id} value={group.name}>
                          {group.name}
                        </option>
                      ))}
                    </select>
                  </InputField>

                  <InputField label="Brand" icon={FaIndustry} error={errors.brand} required>
                    <input
                      type="text"
                      placeholder="Enter brand name..."
                      className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                        errors.brand 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                      }`}
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      disabled={loading}
                    />
                  </InputField>

                  <InputField label="Model" icon={FaCar} error={errors.model} required>
                    <input
                      type="text"
                      placeholder="Enter model name..."
                      className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                        errors.model 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                      }`}
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      disabled={loading}
                    />
                  </InputField>
                </div>

                <div className="mt-6">
                  <InputField label="Description" error={errors.description} required>
                    <textarea
                      placeholder="Describe the asset..."
                      rows={3}
                      className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 resize-none ${
                        errors.description 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                      }`}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      disabled={loading}
                    />
                  </InputField>
                </div>
              </div>

              {/* Financial Information Section */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
                  <FaDollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span>Financial Information</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Value (₹)" icon={FaDollarSign} error={errors.valueInRupee} required>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="Enter asset value..."
                      className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                        errors.valueInRupee 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                      }`}
                      value={valueInRupee}
                      onChange={(e) => setValueInRupee(e.target.value)}
                      disabled={loading}
                    />
                  </InputField>

                  <InputField label="Invoice Number" icon={FaFileInvoiceDollar} error={errors.invoice} required>
                    <input
                      type="text"
                      placeholder="Enter invoice number..."
                      className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                        errors.invoice 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                      }`}
                      value={invoice}
                      onChange={(e) => setInvoice(e.target.value)}
                      disabled={loading}
                    />
                  </InputField>
                </div>
              </div>

              {/* Assignment Information Section */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
                  <FaUser className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span>Assignment Information</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Status" error={errors.status} required>
                    <select
                      className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                        errors.status 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                      }`}
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      disabled={loading}
                    >
                      <option value="">Select status...</option>
                      <option value="Assigned">Assigned</option>
                      <option value="Returned">Returned</option>
                    </select>
                  </InputField>

                  <InputField label="Assignment Date" icon={FaCalendarAlt} required>
                    <div className="relative">
                      <DatePicker
                        selected={assignDate}
                        onChange={(date) => setAssignDate(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select date..."
                        className="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        disabled={loading}
                      />
                      <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                  </InputField>
                </div>

                {/* Warranty Checkbox */}
                <div className="mt-6">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={warranty}
                        onChange={(e) => setWarranty(e.target.checked)}
                        disabled={loading}
                        className="sr-only peer"
                      />
                      <div className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded border-2 border-gray-300 dark:border-gray-600 peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all duration-200 flex items-center justify-center">
                        {warranty && <FaCheck className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                      <FaShieldAlt className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span>Under Warranty</span>
                    </span>
                  </label>
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
                  <FaImage className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  <span>Asset Image</span>
                </h3>
                
                <InputField error={errors.image} required>
                  <div className="flex items-center justify-center w-full">
                    <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
                      errors.image 
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                        : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {image ? (
                          <>
                            <FaCheckCircle className="w-8 h-8 text-green-600 mb-2" />
                            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">{image.name}</p>
                            <p className="text-xs text-gray-500">Click to change</p>
                          </>
                        ) : (
                          <>
                            <FaUpload className="w-8 h-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                          </>
                        )}
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={loading}
                      />
                    </label>
                  </div>
                </InputField>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-600">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="w-4 h-4 animate-spin" />
                      <span>Assigning...</span>
                    </>
                  ) : (
                    <>
                      <FaClipboardList className="w-4 h-4" />
                      <span>Assign Asset</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </BaseModal>
    </>
  );
}