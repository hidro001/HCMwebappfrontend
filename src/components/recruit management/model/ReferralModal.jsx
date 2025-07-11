
// import React, { useState } from "react";
// import useVacancyStore from "../../../store/useVacancyStore";
// import BaseModal from "../../common/BaseModal";
// import FullScreenLoader from "../../common/FullScreenLoader";
// // 1) Import toast
// import { toast } from "react-hot-toast";

// export default function ReferralModal({ isOpen, onClose, vacancy }) {
//   const { createReferral } = useVacancyStore();
  
//   const [isLoading, setIsLoading] = useState(false);

//   const [referralData, setReferralData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     location: "",
//     linkedIn: "",
//     resume: null,
//     notes: "",
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "resume") {
//       setReferralData((prev) => ({ ...prev, resume: files[0] }));
//     } else {
//       setReferralData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setIsLoading(true);

//       const formData = new FormData();
//       formData.append("jobId", vacancy.id);
//       formData.append("name", referralData.name);
//       formData.append("email", referralData.email);
//       formData.append("phone", referralData.phone);
//       formData.append("address", referralData.address);
//       formData.append("location", referralData.location);
//       formData.append("linkedIn", referralData.linkedIn);
//       formData.append("notes", referralData.notes);

//       if (referralData.resume) {
//         formData.append("resume", referralData.resume);
//       }

//       const response = await createReferral(formData);
//       console.log("Referral submitted successfully:", response);

//       // 2) Toast success
//       toast.success("Referral submitted successfully!");

//       // Reset form
//       setReferralData({
//         name: "",
//         email: "",
//         phone: "",
//         address: "",
//         location: "",
//         linkedIn: "",
//         resume: null,
//         notes: "",
//       });
//       onClose();
//     } catch (err) {
//       console.error("Error creating referral:", err);
//       // 3) Toast error
//       toast.error("Failed to create referral. Check console.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!isOpen || !vacancy) return null;

//   return (
//     <>
//       {isLoading && <FullScreenLoader />}
//       <BaseModal isOpen={isOpen} onClose={onClose}>
//         <div
//           className="bg-white dark:bg-gray-800 w-full max-w-md rounded shadow-lg p-6 relative max-h-[70vh] overflow-x-auto [&::-webkit-scrollbar]:w-2
//                 [&::-webkit-scrollbar-track]:rounded-full
//                 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
//                 [&::-webkit-scrollbar-thumb]:rounded-full
//                 [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600"
//         >
//           <button
//             onClick={onClose}
//             className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//           >
//             ✕
//           </button>
//           <h2 className="text-xl font-semibold mb-4">
//             Refer Candidate for: {vacancy.title}
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={referralData.name}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={referralData.email}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Phone</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={referralData.phone}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Address</label>
//               <input
//                 type="text"
//                 name="address"
//                 value={referralData.address}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Location</label>
//               <input
//                 type="text"
//                 name="location"
//                 value={referralData.location}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 LinkedIn Profile
//               </label>
//               <input
//                 type="text"
//                 name="linkedIn"
//                 value={referralData.linkedIn}
//                 onChange={handleChange}
//                 placeholder="e.g. https://linkedin.com/in/username"
//                 className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Resume</label>
//               <input
//                 type="file"
//                 name="resume"
//                 onChange={handleChange}
//                 className="block w-full text-sm text-gray-900 border rounded dark:bg-gray-700 dark:border-gray-600"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Additional Notes
//               </label>
//               <textarea
//                 name="notes"
//                 value={referralData.notes}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
//               />
//             </div>
//             <div className="mt-4 flex justify-end">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 mr-2 border rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                 disabled={isLoading}
//               >
//                 Submit Referral
//               </button>
//             </div>
//           </form>
//         </div>
//       </BaseModal>
//     </>
//   );
// }






import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaFileUpload,
  FaStickyNote,
  FaTimes,
  FaUserPlus,
  FaBriefcase,
  FaCheck,
  FaExclamationTriangle,
  FaCloudUploadAlt
} from "react-icons/fa";
import {
  HiUser,
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiDocument,
  HiAnnotation,
  HiX,
  HiUserAdd,
  HiBriefcase,
  HiUpload
} from "react-icons/hi";
import useVacancyStore from "../../../store/useVacancyStore";
import BaseModal from "../../common/BaseModal";
import FullScreenLoader from "../../common/FullScreenLoader";
import { toast } from "react-hot-toast";

export default function ReferralModal({ isOpen, onClose, vacancy }) {
  const { createReferral } = useVacancyStore();
  
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [dragActive, setDragActive] = useState(false);

  const [referralData, setReferralData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    location: "",
    linkedIn: "",
    resume: null,
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Name is required';
        } else if (value.trim().length < 2) {
          newErrors.name = 'Name must be at least 2 characters';
        } else {
          delete newErrors.name;
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          newErrors.email = 'Email is required';
        } else if (!emailRegex.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;
      case 'phone':
        if (value && !/^\+?[\d\s\-\(\)]{10,}$/.test(value)) {
          newErrors.phone = 'Please enter a valid phone number';
        } else {
          delete newErrors.phone;
        }
        break;
      case 'linkedIn':
        if (value && !value.includes('linkedin.com')) {
          newErrors.linkedIn = 'Please enter a valid LinkedIn URL';
        } else {
          delete newErrors.linkedIn;
        }
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      const file = files[0];
      if (file) {
        // Validate file type and size
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        const maxSize = 5 * 1024 * 1024; // 5MB
        
        if (!allowedTypes.includes(file.type)) {
          toast.error('Please upload a PDF or Word document');
          return;
        }
        
        if (file.size > maxSize) {
          toast.error('File size must be less than 5MB');
          return;
        }
      }
      setReferralData((prev) => ({ ...prev, resume: file }));
    } else {
      setReferralData((prev) => ({ ...prev, [name]: value }));
      validateField(name, value);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload a PDF or Word document');
        return;
      }
      
      if (file.size > maxSize) {
        toast.error('File size must be less than 5MB');
        return;
      }
      
      setReferralData((prev) => ({ ...prev, resume: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = ['name', 'email'];
    const newErrors = {};
    
    requiredFields.forEach(field => {
      if (!referralData[field].trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("jobId", vacancy.id);
      formData.append("name", referralData.name);
      formData.append("email", referralData.email);
      formData.append("phone", referralData.phone);
      formData.append("address", referralData.address);
      formData.append("location", referralData.location);
      formData.append("linkedIn", referralData.linkedIn);
      formData.append("notes", referralData.notes);

      if (referralData.resume) {
        formData.append("resume", referralData.resume);
      }

      const response = await createReferral(formData);
      console.log("Referral submitted successfully:", response);

      toast.success("Referral submitted successfully!");

      // Reset form
      setReferralData({
        name: "",
        email: "",
        phone: "",
        address: "",
        location: "",
        linkedIn: "",
        resume: null,
        notes: "",
      });
      setErrors({});
      setCurrentStep(1);
      onClose();
    } catch (err) {
      console.error("Error creating referral:", err);
      toast.error("Failed to create referral. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setReferralData({
      name: "",
      email: "",
      phone: "",
      address: "",
      location: "",
      linkedIn: "",
      resume: null,
      notes: "",
    });
    setErrors({});
    setCurrentStep(1);
    onClose();
  };

   const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };


  const steps = [
    {
      title: "Personal Information",
      description: "Basic details about the candidate",
      fields: ['name', 'email', 'phone']
    },
    {
      title: "Location & Profile",
      description: "Location and professional profile",
      fields: ['address', 'location', 'linkedIn']
    },
    {
      title: "Documents & Notes",
      description: "Resume and additional information",
      fields: ['resume', 'notes']
    }
  ];

  const canProceedToNextStep = () => {
    const currentStepFields = steps[currentStep - 1].fields;
    const requiredFields = currentStep === 1 ? ['name', 'email'] : [];
    
    return requiredFields.every(field => 
      referralData[field] && referralData[field].trim() && !errors[field]
    );
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      transition: { duration: 0.2 }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  if (!isOpen || !vacancy) return null;

  return (
    <>
      {isLoading && <FullScreenLoader />}
      <BaseModal isOpen={isOpen} onClose={handleClose}>
       <AnimatePresence>
              {isOpen && (
                <motion.div
                  variants={overlayVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full flex items-center justify-center p-4 "
                  onClick={handleClose}
                >
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-2xl shadow-2xl relative max-h-[90vh] overflow-y-scroll"
              >
                {/* Header */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 border-b border-gray-200 dark:border-gray-700">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                  >
                    <HiX className="h-5 w-5" />
                  </motion.button>
                  
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                      <HiUserAdd className="text-blue-600 dark:text-blue-400 text-2xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Refer a Candidate
                      </h2>
                      <div className="flex items-center space-x-2 mt-1">
                        <HiBriefcase className="text-gray-500 dark:text-gray-400" />
                        <p className="text-gray-600 dark:text-gray-400">
                          {vacancy.title} • {vacancy.department}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Steps */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between">
                      {steps.map((step, index) => (
                        <div key={index} className="flex items-center">
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                            currentStep > index + 1
                              ? "bg-green-500 border-green-500 text-white"
                              : currentStep === index + 1
                              ? "bg-blue-500 border-blue-500 text-white"
                              : "bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400"
                          }`}>
                            {currentStep > index + 1 ? (
                              <FaCheck className="text-xs" />
                            ) : (
                              <span className="text-sm font-medium">{index + 1}</span>
                            )}
                          </div>
                          {index < steps.length - 1 && (
                            <div className={`w-16 h-1 mx-2 rounded-full transition-all duration-200 ${
                              currentStep > index + 1
                                ? "bg-green-500"
                                : "bg-gray-200 dark:bg-gray-700"
                            }`} />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {steps[currentStep - 1].title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {steps[currentStep - 1].description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Content */}
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                  <form onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                      {/* Step 1: Personal Information */}
                      {currentStep === 1 && (
                        <motion.div
                          key="step1"
                          variants={stepVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="space-y-6"
                        >
                          {/* Name */}
                          <div>
                            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              <HiUser className="text-blue-500" />
                              <span>Full Name <span className="text-red-500">*</span></span>
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={referralData.name}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                                errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'
                              }`}
                              placeholder="Enter candidate's full name"
                              required
                            />
                            {errors.name && (
                              <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center space-x-1"
                              >
                                <FaExclamationTriangle className="text-xs" />
                                <span>{errors.name}</span>
                              </motion.p>
                            )}
                          </div>

                          {/* Email */}
                          <div>
                            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              <HiMail className="text-blue-500" />
                              <span>Email Address <span className="text-red-500">*</span></span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={referralData.email}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'
                              }`}
                              placeholder="candidate@example.com"
                              required
                            />
                            {errors.email && (
                              <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center space-x-1"
                              >
                                <FaExclamationTriangle className="text-xs" />
                                <span>{errors.email}</span>
                              </motion.p>
                            )}
                          </div>

                          {/* Phone */}
                          <div>
                            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              <HiPhone className="text-blue-500" />
                              <span>Phone Number</span>
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={referralData.phone}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                                errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'
                              }`}
                              placeholder="+1 (555) 123-4567"
                            />
                            {errors.phone && (
                              <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center space-x-1"
                              >
                                <FaExclamationTriangle className="text-xs" />
                                <span>{errors.phone}</span>
                              </motion.p>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {/* Step 2: Location & Profile */}
                      {currentStep === 2 && (
                        <motion.div
                          key="step2"
                          variants={stepVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="space-y-6"
                        >
                          {/* Address */}
                          <div>
                            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              <HiLocationMarker className="text-blue-500" />
                              <span>Address</span>
                            </label>
                            <input
                              type="text"
                              name="address"
                              value={referralData.address}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                              placeholder="123 Main Street, City, State"
                            />
                          </div>

                          {/* Location */}
                          <div>
                            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              <FaMapMarkerAlt className="text-blue-500" />
                              <span>Preferred Location</span>
                            </label>
                            <input
                              type="text"
                              name="location"
                              value={referralData.location}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                              placeholder="Remote, San Francisco, New York..."
                            />
                          </div>

                          {/* LinkedIn */}
                          <div>
                            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              <FaLinkedin className="text-blue-500" />
                              <span>LinkedIn Profile</span>
                            </label>
                            <input
                              type="url"
                              name="linkedIn"
                              value={referralData.linkedIn}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                                errors.linkedIn ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'
                              }`}
                              placeholder="https://linkedin.com/in/username"
                            />
                            {errors.linkedIn && (
                              <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center space-x-1"
                              >
                                <FaExclamationTriangle className="text-xs" />
                                <span>{errors.linkedIn}</span>
                              </motion.p>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {/* Step 3: Documents & Notes */}
                      {currentStep === 3 && (
                        <motion.div
                          key="step3"
                          variants={stepVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="space-y-6"
                        >
                          {/* Resume Upload */}
                          <div>
                            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              <HiDocument className="text-blue-500" />
                              <span>Resume/CV</span>
                            </label>
                            <div
                              className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 ${
                                dragActive
                                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10'
                                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                              }`}
                              onDragEnter={handleDrag}
                              onDragLeave={handleDrag}
                              onDragOver={handleDrag}
                              onDrop={handleDrop}
                            >
                              <input
                                type="file"
                                name="resume"
                                onChange={handleChange}
                                accept=".pdf,.doc,.docx"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              />
                              {referralData.resume ? (
                                <div className="flex items-center justify-center space-x-2">
                                  <HiDocument className="text-green-500 text-xl" />
                                  <span className="text-green-600 dark:text-green-400 font-medium">
                                    {referralData.resume.name}
                                  </span>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    type="button"
                                    onClick={() => setReferralData(prev => ({ ...prev, resume: null }))}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <HiX />
                                  </motion.button>
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  <HiUpload className="mx-auto text-3xl text-gray-400" />
                                  <p className="text-gray-600 dark:text-gray-400">
                                    <span className="font-medium text-blue-600 dark:text-blue-400">Click to upload</span> or drag and drop
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    PDF, DOC, DOCX up to 5MB
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Notes */}
                          <div>
                            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              <HiAnnotation className="text-blue-500" />
                              <span>Additional Notes</span>
                            </label>
                            <textarea
                              name="notes"
                              value={referralData.notes}
                              onChange={handleChange}
                              rows={4}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                              placeholder="Any additional information about the candidate..."
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-3">
                      {currentStep > 1 && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => setCurrentStep(currentStep - 1)}
                          className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 font-medium"
                        >
                          Previous
                        </motion.button>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={handleClose}
                        className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 font-medium"
                      >
                        Cancel
                      </motion.button>
                    </div>

                    <div className="flex space-x-3">
                      {currentStep < 3 ? (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => setCurrentStep(currentStep + 1)}
                          disabled={!canProceedToNextStep()}
                          className="flex items-center space-x-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-xl transition-all duration-200 font-medium disabled:cursor-not-allowed"
                        >
                          <span>Next</span>
                          <motion.div
                            animate={{ x: canProceedToNextStep() ? 0 : -5 }}
                            transition={{ duration: 0.2 }}
                          >
                            →
                          </motion.div>
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={handleSubmit}
                          disabled={isLoading || Object.keys(errors).length > 0}
                          className="flex items-center space-x-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-xl transition-all duration-200 font-medium disabled:cursor-not-allowed"
                        >
                          <HiUserAdd />
                          <span>{isLoading ? 'Submitting...' : 'Submit Referral'}</span>
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
    </>
  );
}