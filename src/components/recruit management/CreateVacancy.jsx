import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBriefcase,
  FaGraduationCap,
  FaPhone,
  FaEdit,
  FaCheck,
  FaTimes,
  FaExclamationTriangle,
} from "react-icons/fa";
import {
  HiBriefcase,
  HiOfficeBuilding,
  HiUpload,
  HiCurrencyDollar,
  HiCalendar,
  HiAcademicCap,
  HiPhone,
  HiCheck,
  HiUser,
  HiLocationMarker,
  HiSave,
  HiX,
  HiDocument,
  HiClipboardList
} from "react-icons/hi";
import useJobStore from "../../store/useJobStore";
import { toast } from "react-hot-toast";
import FullScreenLoader from "../common/FullScreenLoader";
import useEmployeeStore from "../../store/useEmployeeStore.js";
import useAuthStore from "../../store/store";
import BaseModal from "../common/BaseModal.jsx";

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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};

const stepVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 }
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


  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

export default function CreateVacancy( { show, onClose  }) {
  const { register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm();
  const {
    loadAllEmployees,
  } = useEmployeeStore();

  const currentUser = useAuthStore();
  
  const departments = currentUser?.department;
 
  useEffect(() => {
      loadAllEmployees("HR");
  }, []);

  const { createJob, loading, error, successMessage } = useJobStore();
  const allEmployees = useEmployeeStore((state) => state.allEmployees);
  const loadingAllEmployees = useEmployeeStore((state) => state.loadingAllEmployees);
  const [workExperienceOther, setWorkExperienceOther] = useState(false);
  const [educationOther, setEducationOther] = useState(false);
  const [suitableForOther, setSuitableForOther] = useState(false);
  // const [departments, setDepartments] = useState([]);
  const [deptError, setDeptError] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const watchedFields = watch();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

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
      setUploadedFile(file);
      setValue("jobDescriptionFile", [file]);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };


const onSubmit = async (data) => {
  try{
    const formData = new FormData();
    formData.append("jobTitle", data.jobTitle);
    formData.append("jobDepartment", data.jobDepartment);
    formData.append("jobDescription", data.jobDescription ?? "");

    (data.employmentType || []).forEach((val) => formData.append("employmentType", val));
    (data.suitableFor || []).forEach((val) => formData.append("suitableFor", val));
    (data.interviewPanel || []).forEach((val) => formData.append("interviewPanel", val)); 

    const skills = typeof data.requiredSkills === "string"
  ? data.requiredSkills.split(",").map(s => s.trim())
  : [];

   skills.forEach((val) => formData.append("requiredSkills", val));

    formData.append("jobLocations", data.jobLocations ?? "");
    formData.append("payPeriod", data.payPeriod ?? "");
    formData.append("multipleCandidates", data.multipleCandidates ? "true" : "false");
    formData.append("vacancyStatus", "Open");
    formData.append("openingDate", data.openingDate ?? "");
    formData.append("closingDate", data.closingDate ?? "");
    // formData.append("workExperience", data.workExperience ?? "");
    // formData.append("education", data.education ?? "");
    formData.append("responsibilities", data.responsibilities ?? "");
    // Check for dynamic fields
    if (data.workExperience === "Other" && data.workExperienceOther) {
      formData.append("workExperience", data.workExperienceOther);
    } else {
      formData.append("workExperience", data.workExperience);
    }

    if (data.education === "Other" && data.educationOther) {
      formData.append("education", data.educationOther);
    } else {
      formData.append("education", data.education);
    }

    if (data.suitableFor.includes("Other") && data.suitableForOther) {
      formData.append("suitableFor", data.suitableForOther);
    } else {
      data.suitableFor.forEach((value) => formData.append("suitableFor", value));
    }

    formData.append("duties", data.duties ?? "");
    formData.append("isPromotionOpportunity", data.isPromotionOpportunity ? "true" : "false");  
    formData.append("eligibilityCriteria", data.eligibilityCriteria ?? ""); 
    formData.append("approvalStatus", data.approvalStatus ?? ""); 
    formData.append("hiringManager", data.hiringManager ?? "");  
    formData.append("contactPerson", data.contactPerson ?? "");
    formData.append("contactPhone", data.contactPhone ?? "");
    formData.append("additionalContact", data.additionalContact ?? "");
    formData.append("showContacts", data.showContacts ? "true" : "false");

    if (data.salaryRange && data.salaryRange[0]) formData.append("salaryRange", data.salaryRange[0]);  
    if (data.salaryRange && data.salaryRange[1]) formData.append("salaryRange", data.salaryRange[1]); 

    await createJob(formData);
    reset();
    setUploadedFile(null);
    setCurrentStep(1);
    }catch (err) {}
  };

  const steps = [
    {
      title: "Basic Information",
      description: "Job title, department, and description",
      icon: HiBriefcase,
      fields: ['jobTitle', 'jobDepartment', 'jobDescription']
    },
    {
      title: "Employment Details",
      description: "Type, location, and compensation",
      icon: HiOfficeBuilding,
      fields: ['employmentType', 'suitableFor', 'jobLocations',  'payPeriod']
    },
    {
      title: "Requirements",
      description: "Experience and qualifications",
      icon: HiAcademicCap,
      fields: ['workExperience','requiredSkills', 'education', 'responsibilities']
    },
    {
      title: "Contact & Status",
      description: "Contact info and vacancy status",
      icon: HiPhone,
      fields: ['contactPerson']
    }
  ];

  const validateStep = (stepNumber) => {
    const requiredFields = {
      1: ['jobTitle', 'jobDepartment'],
      2: [],
      3: [],
      4: []
    };

    const currentRequiredFields = requiredFields[stepNumber] || [];
    return currentRequiredFields.every(field => watchedFields[field]);
  };

  const getCompletionPercentage = () => {
    const allFields = ['jobTitle', 'jobDepartment', 'jobDescription', 'employmentType', 'jobLocations'];
    const completedFields = allFields.filter(field => watchedFields[field]);
    return Math.round((completedFields.length / allFields.length) * 100);
  };

  const handleCancel = () => {
    reset();      
    setUploadedFile(null);
    setCurrentStep(1);
    onClose();
  };

  return (
    <BaseModal isOpen={show} onClose={handleCancel}>
      {loading && <FullScreenLoader />}
      <AnimatePresence>
                    
                      <motion.div
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="w-full flex items-center justify-center p-4 "
                        onClick={onClose}
                      >

       <motion.div
             variants={modalVariants}
             initial="hidden"
             animate="visible"
             exit="exit"
             onClick={(e) => e.stopPropagation()}
             className="bg-white dark:bg-gray-800 w-full max-w-4xl rounded-2xl shadow-2xl relative max-h-[94vh] overflow-y-scroll"
           >
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <motion.div
            variants={cardVariants}
            className="text-center space-y-4"
          >
            <div className="flex items-center justify-center space-x-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
                <HiBriefcase className="text-blue-600 dark:text-blue-400 text-2xl" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                Create New Vacancy
              </h1>

              <button
                                  onClick={handleCancel}
                                  className="p-2 rounded-full transition-all duration-200 hover:bg-gray-200 text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-400 dark:hover:bg-gray-700 dark:text-gray-300 dark:hover:text-white dark:border-gray-600 dark:hover:border-gray-500"
                                >
                                  <FaTimes size={20} />
                                </button>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Post a new job opening and find the perfect candidates
            </p>
            
            {/* Progress Bar */}
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Form Completion
                </span>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {getCompletionPercentage()}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-blue-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${getCompletionPercentage()}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Step Navigation */}
          <motion.div
            variants={cardVariants}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between overflow-x-auto pb-2">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center min-w-0">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentStep(index + 1)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      currentStep === index + 1
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                        : validateStep(index + 1)
                        ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                        : "bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      currentStep === index + 1
                        ? "bg-blue-100 dark:bg-blue-800"
                        : validateStep(index + 1)
                        ? "bg-green-100 dark:bg-green-800"
                        : "bg-gray-200 dark:bg-gray-600"
                    }`}>
                      {validateStep(index + 1) && currentStep !== index + 1 ? (
                        <FaCheck className="text-sm" />
                      ) : (
                        <step.icon className="text-sm" />
                      )}
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-sm">{step.title}</div>
                      <div className="text-xs opacity-75">{step.description}</div>
                    </div>
                  </motion.button>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-1 mx-2 rounded-full transition-all duration-200 ${
                      validateStep(index + 1) ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Error Display */}
          {deptError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 text-center"
            >
              <p className="text-red-600 dark:text-red-400 font-medium">{deptError}</p>
            </motion.div>
          )}

          {/* Form Content */}
          <form  className="space-y-6">
            <AnimatePresence mode="wait">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                        <HiBriefcase className="text-blue-500" />
                        <span>Basic Information</span>
                      </h2>
                      
                      {/* File Upload */}
                      <div
                        className={`relative border-2 border-dashed rounded-xl p-4 transition-all duration-200 ${
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
                          {...register("jobDescriptionFile")}
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          accept=".pdf,.doc,.docx"
                        />
                        {uploadedFile ? (
                          <div className="flex items-center space-x-2">
                            <HiDocument className="text-green-500" />
                            <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                              {uploadedFile.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setUploadedFile(null);
                                setValue("jobDescriptionFile", null);
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              <HiX />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <HiUpload className="text-blue-500" />
                            <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                              Upload JD
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Job Title */}
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <HiBriefcase className="text-blue-500" />
                          <span>Job Title <span className="text-red-500">*</span></span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Senior React Developer"
                          {...register("jobTitle", { required: true })}
                          className={`w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                            errors.jobTitle ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                        />
                        {errors.jobTitle && (
                          <p className="text-red-500 text-xs flex items-center space-x-1">
                            <FaExclamationTriangle />
                            <span>Job title is required</span>
                          </p>
                        )}
                      </div>

                      {/* Department */}
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <HiOfficeBuilding className="text-blue-500" />
                          <span>Department <span className="text-red-500">*</span></span>
                        </label>
                        {/* <select
                          {...register("jobDepartment", { required: true })}
                          className={`w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                            errors.jobDepartment ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                          disabled={!departments.length}
                        >
                          <option value="">Choose Department</option>
                          {departments.map((dept) => (
                            <option key={dept} value={dept}>
                              {dept}
                            </option>
                          ))}
                        </select> */}
                        <input
                        type="text"
                        {...register("jobDepartment", { required: true })}
                        value={departments}
                        disabled={true}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                        {errors.jobDepartment && (
                          <p className="text-red-500 text-xs flex items-center space-x-1">
                            <FaExclamationTriangle />
                            <span>Department is required</span>
                          </p>
                        )}
                      </div>
                    </div>

                    
                    {/* Job Description */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <HiClipboardList className="text-blue-500" />
                        <span>Job Description</span>
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Provide a comprehensive description for effective candidate selection
                      </p>
                      <textarea
                        placeholder="Describe the role, responsibilities, and what makes this position exciting..."
                        rows={6}
                        {...register("jobDescription")}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                      />
                    </div>

                    {/* Employment Type */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <FaBriefcase className="text-blue-500" />
                        <span>Employment Type</span>
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Select one or multiple employment types
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                        {["Full Time", "Part Time", "Contract", "Freelance", "Remote"].map((type) => (
                          <motion.label
                            key={type}
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center space-x-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-all duration-200"
                          >
                            <input
                              type="checkbox"
                              value={type}
                              {...register("employmentType")}
                              className="form-checkbox h-4 w-4 text-blue-600 rounded"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{type}</span>
                          </motion.label>
                        ))}
                      </div>
                    </div>

                    {/* Required Skills */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <HiUser className="text-blue-500" />
                        <span>Required Skills</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. React, Node.js"
                        {...register("requiredSkills")}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>

                  </div>
                </motion.div>
              )}

              {/* Step 2: Employment Details */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                      <HiOfficeBuilding className="text-blue-500" />
                      <span>Employment Details</span>
                    </h2>

                    {/* Job Locations */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <HiLocationMarker className="text-blue-500" />
                        <span>Job Locations</span>
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Enter multiple locations separated by commas
                      </p>
                      <input
                        type="text"
                        placeholder="e.g. New Delhi, Mumbai, Remote"
                        {...register("jobLocations")}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    {/* Multiple Candidates */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-200 dark:border-blue-800"
                    >
                      <input
                        type="checkbox"
                        id="multipleCandidates"
                        {...register("multipleCandidates")}
                        className="form-checkbox h-5 w-5 text-blue-600 rounded"
                      />
                      <label htmlFor="multipleCandidates" className="text-sm font-medium text-gray-900 dark:text-white">
                        I am hiring multiple candidates for this position
                      </label>
                    </motion.div>

                    {/* Dates and Status */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Important Dates</h3>
                        <div className="space-y-3">
                          <div>
                            <label className="text-xs text-gray-500 dark:text-gray-400">Opening Date</label>
                            <input
                              type="date"
                              {...register("openingDate")}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 dark:text-gray-400">Closing Date</label>
                            <input
                              type="date"
                              {...register("closingDate")}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Requirements */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                      <HiAcademicCap className="text-blue-500" />
                      <span>Applicant Requirements</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Work Experience */}
                      {/* <div className="space-y-2">
                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <FaGraduationCap className="text-blue-500" />
                          <span>Work Experience</span>
                        </label>
                        <select
                          {...register("workExperience")}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="no experience required">No experience required</option>
                          <option value="1-2 years">1-2 years</option>
                          <option value="3-5 years">3-5 years</option>
                          <option value="5+ years">5+ years</option>
                        </select>
                      </div> */}
                       <div className="space-y-2">
                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <FaGraduationCap className="text-blue-500" />
                          <span>Work Experience</span>
                        </label>
                        <select
                          {...register("workExperience")}
                          onChange={(e) => setWorkExperienceOther(e.target.value === "Other")}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="no experience required">No experience required</option>
                          <option value="1-2 years">1-2 years</option>
                          <option value="3-5 years">3-5 years</option>
                          <option value="5+ years">5+ years</option>
                          <option value="Other">Other</option>
                        </select>
                        {workExperienceOther && (
                          <input
                            type="text"
                            placeholder="Enter your work experience"
                            className="w-full mt-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            {...register("workExperienceOther")}
                          />
                        )}
                      </div>

                      {/* Education */}
                      {/* <div className="space-y-2">
                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <HiAcademicCap className="text-blue-500" />
                          <span>Education Level</span>
                        </label>
                        <select
                          {...register("education")}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="Higher">Higher Secondary</option>
                          <option value="Graduate">Graduate</option>
                          <option value="Postgraduate">Postgraduate</option>
                        </select>
                      </div> */}
                       <div className="space-y-2">
                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <HiAcademicCap className="text-blue-500" />
                          <span>Education Level</span>
                        </label>
                        <select
                          {...register("education")}
                          onChange={(e) => setEducationOther(e.target.value === "Other")}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="Higher">Higher Secondary</option>
                          <option value="Graduate">Graduate</option>
                          <option value="Postgraduate">Postgraduate</option>
                          <option value="Other">Other</option>
                        </select>
                        {educationOther && (
                          <input
                            type="text"
                            placeholder="Enter your education level"
                            className="w-full mt-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            {...register("educationOther")}
                          />
                        )}
                      </div>

                    </div>

                    {/* Suitable For */}
                    {/* <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <HiUser className="text-blue-500" />
                        <span>Position Suitable For</span>
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Select who this position is most suitable for
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {["Fresher", "Internship", "Freelancer"].map((role) => (
                          <motion.label
                            key={role}
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center space-x-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-all duration-200"
                          >
                            <input
                              type="checkbox"
                              value={role}
                              {...register("suitableFor")}
                              className="form-checkbox h-4 w-4 text-blue-600 rounded"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{role}</span>
                          </motion.label>
                        ))}
                      </div>
                    </div> */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <HiUser className="text-blue-500" />
                      <span>Position Suitable For</span>
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Select who this position is most suitable for
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {["Fresher", "Internship", "Freelancer"].map((role) => (
                        <motion.label
                          key={role}
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center space-x-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-all duration-200"
                        >
                          <input
                            type="checkbox"
                            value={role}
                            {...register("suitableFor")}
                            className="form-checkbox h-4 w-4 text-blue-600 rounded"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{role}</span>
                        </motion.label>
                      ))}
                      <motion.label
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center space-x-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-all duration-200"
                      >
                        <input
                          type="checkbox"
                          value="Other"
                          {...register("suitableFor")}
                          className="form-checkbox h-4 w-4 text-blue-600 rounded"
                          onChange={(e) => setSuitableForOther(e.target.checked)}
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Other</span>
                      </motion.label>
                      {suitableForOther && (
                        <input
                          type="text"
                          placeholder="Enter suitable position"
                          className="w-full mt-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          {...register("suitableForOther")}
                        />
                      )}
                    </div>
                  </div>

                    {/* Responsibilities */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <HiClipboardList className="text-blue-500" />
                        <span>Key Responsibilities</span>
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Main tasks and accountabilities for this role
                      </p>
                      <textarea
                        rows={4}
                        placeholder="• Lead project development initiatives&#10;• Collaborate with cross-functional teams&#10;• Mentor junior team members..."
                        {...register("responsibilities")}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                      />
                    </div>

                    {/* Duties */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <FaEdit className="text-blue-500" />
                        <span>Daily Duties</span>
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Specific day-to-day tasks and activities
                      </p>
                      <textarea
                        rows={4}
                        placeholder="• Review and approve code submissions&#10;• Participate in daily standup meetings&#10;• Conduct technical interviews..."
                        {...register("duties")}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                      />
                    </div>

                      {/* Promotion Opportunity */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <HiCheck className="text-blue-500" />
                        <span>Is this a promotion opportunity?</span>
                      </label>
                      <input
                        type="checkbox"
                        {...register("isPromotionOpportunity")}
                        className="form-checkbox h-5 w-5 text-blue-600 rounded"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Select this option if the job opening is intended as a promotion opportunity for existing employees.
                      </p>
                    </div>

                    {/* Eligibility Criteria */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <HiClipboardList className="text-blue-500" />
                        <span>Eligibility Criteria</span>
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Describe eligibility criteria for this role"
                        {...register("eligibilityCriteria")}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Contact & Status */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                      <HiPhone className="text-blue-500" />
                      <span>Contact Information</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      {/* Hiring Manager (Employee Selector) */}
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <HiUser className="text-blue-500" />
                          <span>Hiring Manager</span>
                        </label>
                        <select
                          {...register("hiringManager")}
                          className="w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          disabled={loadingAllEmployees}
                        >
                          <option value="">Choose Hiring Manager</option>
                          {loadingAllEmployees ? (
                            <option value="" disabled>Loading employees...</option>
                          ) : (
                            allEmployees.map((employee) => (
                              <option key={employee.value} value={employee.value}>
                                {employee.label}
                              </option>
                            ))
                          )}
                        </select>
                      </div>

                      {/* Contact Person */}
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <HiUser className="text-blue-500" />
                          <span>Contact Person</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Name of hiring manager or HR contact"
                          {...register("contactPerson")}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>

                      {/* Contact Phone */}
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <HiPhone className="text-blue-500" />
                          <span>Contact Phone</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          {...register("contactPhone")}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Additional Contact */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <FaPhone className="text-blue-500" />
                        <span>Additional Contact Methods</span>
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Skype, WhatsApp, LinkedIn, or other contact methods
                      </p>
                      <input
                        type="text"
                        placeholder="e.g. Skype: john.doe, WhatsApp: +1234567890"
                        {...register("additionalContact")}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    {/* Show Contacts */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="flex items-start space-x-3 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-200 dark:border-blue-800"
                    >
                      <input
                        type="checkbox"
                        id="showContacts"
                        {...register("showContacts")}
                        className="form-checkbox h-5 w-5 text-blue-600 rounded mt-0.5"
                      />
                      <div>
                        <label htmlFor="showContacts" className="text-sm font-medium text-gray-900 dark:text-white block">
                          Display contact information publicly
                        </label>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          Show the contact person's name and phone number on the job listing page
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation and Actions */}
            <motion.div
              variants={cardVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex space-x-3">
                  {currentStep > 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="flex items-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
                    >
                      <span>← Previous</span>
                    </motion.button>
                  )}
                </div>

                <div className="flex space-x-3">
                  {currentStep < 4 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                    >
                      <span>Next</span>
                      <span>→</span>
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                       type="button"
                      disabled={loading}
                      onClick={handleSubmit(onSubmit)} 
                      className="flex items-center space-x-2 px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                    >
                      <HiSave />
                      <span>{loading ? 'Creating...' : 'Create Vacancy'}</span>
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </form>
        </div>
      </motion.div>
      </motion.div>
      </AnimatePresence>
    </BaseModal>
  );
}

