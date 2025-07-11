import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSave,
  FaTimes,
  FaBriefcase,
  FaBuilding,
  FaFileAlt,
  FaDollarSign,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaUpload,
  FaCloudUploadAlt,
  FaExclamationTriangle
} from "react-icons/fa";
import {
  HiBriefcase,
  HiOfficeBuilding,
  HiDocument,
  HiCurrencyDollar,
  HiCheck,
  HiClock,
  HiX,
  HiUpload,
  HiSave
} from "react-icons/hi";
import { toast } from "react-hot-toast";
import useVacancyStore from "../../../store/useVacancyStore";
import BaseModal from "../../common/BaseModal";

export default function UpdateVacancyModal({ vacancy, onClose }) {
  const { updateVacancy } = useVacancyStore();

  const [jobTitle, setJobTitle] = useState(vacancy.jobTitle || "");
  const [jobDepartment, setJobDepartment] = useState(vacancy.jobDepartment || "");
  const [jobDescription, setJobDescription] = useState(vacancy.jobDescription || "");
  const [vacancyStatus, setVacancyStatus] = useState(vacancy.vacancyStatus || "Draft");
  const [approvalStatus, setApprovalStatus] = useState(vacancy.approvalStatus || "Pending");
  const [salaryRange, setSalaryRange] = useState(["", ""]);
  const [currency, setCurrency] = useState(vacancy.currency || "USD");
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};
    
    if (!jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required";
    }
    
    if (!jobDepartment.trim()) {
      newErrors.jobDepartment = "Department is required";
    }
    
    const minSalary = parseFloat(salaryRange[0]);
    const maxSalary = parseFloat(salaryRange[1]);

    if (!salaryRange[0] || isNaN(minSalary)) {
      newErrors.salaryRangeMin = "Minimum salary is required";
    } else if (minSalary < 0) {
      newErrors.salaryRangeMin = "Minimum salary cannot be negative";
    }

    if (!salaryRange[1] || isNaN(maxSalary)) {
      newErrors.salaryRangeMax = "Maximum salary is required";
    } else if (maxSalary < 0) {
      newErrors.salaryRangeMax = "Maximum salary cannot be negative";
    }

    if (!newErrors.salaryRangeMin && !newErrors.salaryRangeMax && minSalary > maxSalary) {
      newErrors.salaryRange = "Minimum salary cannot be greater than maximum salary";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a PDF or Word document');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { 
        alert('File size must be less than 5MB');
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a PDF or Word document');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { 
        alert('File size must be less than 5MB');
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      let payload;
      if (selectedFile) {
        payload = new FormData();
        payload.append("vacancyStatus", vacancyStatus);
        payload.append("salaryRange", salaryRange);
        payload.append("currency", currency);
        payload.append("jobDescription", jobDescription);
        payload.append("jobDepartment", jobDepartment);
        payload.append("jobTitle", jobTitle);
        payload.append("approvalStatus", approvalStatus);
        payload.append("file", selectedFile);
      } else {
        payload = {
          vacancyStatus,
          salaryRange,
          currency,
          jobDescription,
          jobDepartment,
          approvalStatus,
          jobTitle,
        };
      }

      await updateVacancy(vacancy._id, payload);
      
      onClose();
    } catch (err) {
      console.error("Error updating vacancy:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "Open":
        return {
          color: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-100 dark:bg-green-900/20",
          icon: HiCheck
        };
      case "Closed":
        return {
          color: "text-red-600 dark:text-red-400",
          bgColor: "bg-red-100 dark:bg-red-900/20",
          icon: HiX
        };
      case "Draft":
        return {
          color: "text-gray-600 dark:text-gray-400",
          bgColor: "bg-gray-100 dark:bg-gray-700",
          icon: HiDocument
        };
      default:
        return {
          color: "text-blue-600 dark:text-blue-400",
          bgColor: "bg-blue-100 dark:bg-blue-900/20",
          icon: HiClock
        };
    }
  };

  const statusConfig = getStatusConfig(vacancyStatus);

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

  if (!vacancy) return null;

  return (
    <BaseModal isOpen={Boolean(vacancy)} onClose={onClose}>
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className=" m-3 bg-white dark:bg-gray-800  rounded-2xl shadow-2xl relative  overflow-hidden"
      >
        {/* Header */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 border-b border-gray-200 dark:border-gray-700">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
          >
            <HiX className="h-5 w-5" />
          </motion.button>
          
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <HiBriefcase className="text-blue-600 dark:text-blue-400 text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Update Vacancy
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Modify job posting details and settings
              </p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="space-y-6">

            {/* Job Title */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <HiBriefcase className="text-blue-500" />
                <span>Job Title <span className="text-red-500">*</span></span>
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.jobTitle ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Enter job title"
              />
              {errors.jobTitle && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs flex items-center space-x-1"
                >
                  <FaExclamationTriangle className="text-xs" />
                  <span>{errors.jobTitle}</span>
                </motion.p>
              )}
            </div>

            {/* Department */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <HiOfficeBuilding className="text-blue-500" />
                <span>Department <span className="text-red-500">*</span></span>
              </label>
              <input
                type="text"
                value={jobDepartment}
                onChange={(e) => setJobDepartment(e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.jobDepartment ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Enter department"
              />
              {errors.jobDepartment && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs flex items-center space-x-1"
                >
                  <FaExclamationTriangle className="text-xs" />
                  <span>{errors.jobDepartment}</span>
                </motion.p>
              )}
            </div>

            {/* Job Description */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <HiDocument className="text-blue-500" />
                <span>Job Description</span>
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Describe the role, responsibilities, and requirements..."
              />
            </div>

            {/* Salary and Currency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Salary Range */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <HiCurrencyDollar className="text-blue-500" />
                  <span>Salary Range</span>
                </label>
                <div className="grid grid-cols-2 gap-6">
                  <input
                    type="number"
                    placeholder="Min Salary"
                    value={salaryRange[0]}
                    onChange={(e) =>
                      setSalaryRange([e.target.value, salaryRange[1]])
                    }
                    className="w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <input
                    type="number"
                    placeholder="Max Salary"
                    value={salaryRange[1]}
                    onChange={(e) =>
                      setSalaryRange([salaryRange[0], e.target.value])
                    }
                    className="w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <span>Currency</span>
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="INR">INR (₹)</option>
                  <option value="CAD">CAD (C$)</option>
                </select>
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <statusConfig.icon className="text-blue-500" />
                <span>Vacancy Status</span>
              </label>
              <div className="relative">
                <select
                  value={vacancyStatus}
                  onChange={(e) => setVacancyStatus(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
                >
                  <option value="Draft">Draft</option>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
                <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded ${statusConfig.bgColor}`}>
                  <statusConfig.icon className={`${statusConfig.color} text-sm`} />
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Draft: Not visible to candidates • Open: Actively recruiting • Closed: No longer accepting applications
              </p>
            </div>

           {/* Approval Status */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <statusConfig.icon className="text-blue-500" />
                <span>Approval Status</span>
              </label>
              <div className="relative">
                <select
                  value={approvalStatus}
                  onChange={(e) => setApprovalStatus(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded ${statusConfig.bgColor}`}>
                  <statusConfig.icon className={`${statusConfig.color} text-sm`} />
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Draft: Not visible to candidates • Open: Actively recruiting • Closed: No longer accepting applications
              </p>
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <HiUpload className="text-blue-500" />
                <span>Update Job Description File (Optional)</span>
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
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".pdf,.doc,.docx"
                />
                {selectedFile ? (
                  <div className="flex items-center justify-center space-x-2">
                    <HiDocument className="text-green-500 text-xl" />
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      {selectedFile.name}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <HiX />
                    </motion.button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <FaCloudUploadAlt className="mx-auto text-3xl text-gray-400" />
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
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-700/50 p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Last updated: {new Date(vacancy.updatedAt || vacancy.createdAt).toLocaleDateString()}
            </p>
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 font-medium"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center space-x-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <HiSave />
                    <span>Update Vacancy</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </BaseModal>
  );
}