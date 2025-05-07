


import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRequestsStore } from "../../../store/useRequestsStore";
import BaseModal from "../../../components/common/BaseModal";
import FullScreenLoader from "../../../components/common/FullScreenLoader";
import { 
  FaTimes, 
  FaFileUpload, 
  FaMoneyBillWave, 
  FaHandHoldingUsd, 
  FaChartLine,
  FaPercentage,
  FaRegCalendarAlt,
  FaRegFileAlt,
  FaPaperPlane,
  FaTags
} from "react-icons/fa";

// Define request types with their icons for consistency
const requestTypes = [
  { value: "Advance", label: "Advance", icon: <FaMoneyBillWave /> },
  { value: "Reimbursement", label: "Reimbursement", icon: <FaHandHoldingUsd /> },
  { value: "Loan", label: "Loan", icon: <FaChartLine /> },
];

const RequestModal = ({ isOpen, onClose }) => {
  const { submitRequest } = useRequestsStore();
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [documents, setDocuments] = useState([]);
  const [tenure, setTenure] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileNames, setFileNames] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Reset errors when fields change
    if (type) setFormErrors(prev => ({ ...prev, type: "" }));
    if (amount) setFormErrors(prev => ({ ...prev, amount: "" }));
    if (reason) setFormErrors(prev => ({ ...prev, reason: "" }));
    if (tenure) setFormErrors(prev => ({ ...prev, tenure: "" }));
    if (interestRate) setFormErrors(prev => ({ ...prev, interestRate: "" }));
    if (documents.length > 0) setFormErrors(prev => ({ ...prev, documents: "" }));
  }, [type, amount, reason, tenure, interestRate, documents]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 5) {
      setFormErrors(prev => ({ ...prev, documents: "Maximum 5 files allowed" }));
      return;
    }
    
    setDocuments(files);
    
    // Create an array of file names for display
    const names = [];
    for (let i = 0; i < files.length; i++) {
      names.push(files[i].name);
    }
    setFileNames(names);
  };

  const resetForm = () => {
    setType("");
    setAmount("");
    setReason("");
    setDocuments([]);
    setFileNames([]);
    setTenure("");
    setInterestRate("");
    setFormErrors({});
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!type) {
      errors.type = "Please select a request type";
      isValid = false;
    }

    if ((type === "Advance" || type === "Reimbursement" || type === "Loan") && (!amount || amount <= 0)) {
      errors.amount = "Please enter a valid amount";
      isValid = false;
    }

    if (!reason.trim()) {
      errors.reason = "Please provide a reason";
      isValid = false;
    }

    if (type === "Loan") {
      if (!tenure || tenure <= 0) {
        errors.tenure = "Please enter a valid tenure";
        isValid = false;
      }
      if (!interestRate || interestRate < 0) {
        errors.interestRate = "Please enter a valid interest rate";
        isValid = false;
      }
    }

    if (type === "Reimbursement" && documents.length === 0) {
      errors.documents = "Please upload at least one document";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);

    const employeeId = localStorage.getItem("employeeId");
    if (!employeeId) {
      setFormErrors(prev => ({ ...prev, general: "Employee ID not found. Please log in again." }));
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("employeeId", employeeId);
    formData.append("type", type);
    
    if (type !== "Hike") {
      formData.append("amount", amount);
    }
    
    formData.append("reason", reason);

    if (type === "Loan") {
      formData.append("tenure", tenure);
      formData.append("interestRate", interestRate);
    }

    if (type === "Reimbursement" && documents.length > 0) {
      for (let i = 0; i < documents.length; i++) {
        formData.append("documents", documents[i]);
      }
    }

    try {
      const success = await submitRequest(formData);
      setIsSubmitting(false);

      if (success) {
        handleClose();
      } else {
        setFormErrors(prev => ({ ...prev, general: "Failed to submit request. Please try again." }));
      }
    } catch (error) {
      setIsSubmitting(false);
      setFormErrors(prev => ({ ...prev, general: "An error occurred. Please try again." }));
    }
  };

  return (
    <>
      {isSubmitting && <FullScreenLoader />}

      <AnimatePresence>
        {isOpen && (
          <BaseModal isOpen={isOpen} onClose={handleClose}>
            <motion.div
              className="relative bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-xl w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 p-6 border border-gray-100 dark:border-slate-700"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Close Button */}
              <motion.button
                className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-slate-700 p-2 rounded-full"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                disabled={isSubmitting}
              >
                <FaTimes />
              </motion.button>

              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  New Request
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Fill the form below to submit your request
                </p>
              </div>

              {/* General error message */}
              {formErrors.general && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-200 rounded-lg">
                  {formErrors.general}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Request Type */}
                <div>
                  <label
                    htmlFor="type"
                    className=" mb-2 font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2"
                  >
                    <FaTags className="text-blue-600 dark:text-blue-400" />
                    Request Type <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {requestTypes.map((reqType) => (
                      <motion.button
                        key={reqType.value}
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setType(reqType.value)}
                        className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg border ${
                          type === reqType.value
                            ? "bg-blue-600 text-white border-blue-700 dark:bg-blue-700 dark:border-blue-800"
                            : "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200"
                        } hover:shadow-md transition-all`}
                      >
                        <span className="text-lg">{reqType.icon}</span>
                        <span>{reqType.label}</span>
                      </motion.button>
                    ))}
                  </div>
                  {formErrors.type && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.type}</p>
                  )}
                </div>

                {/* Amount */}
                {(type === "Advance" || type === "Reimbursement" || type === "Loan") && (
                  <div>
                    <label
                      htmlFor="amount"
                      className=" mb-2 font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2"
                    >
                      <FaMoneyBillWave className="text-blue-600 dark:text-blue-400" />
                      Amount <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                        ₹
                      </span>
                      <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className={`w-full pl-8 pr-4 py-3 rounded-lg border ${
                          formErrors.amount
                            ? "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20"
                            : "border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800"
                        } focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent outline-none transition-colors dark:text-white`}
                        placeholder="Enter amount"
                        min="1"
                      />
                    </div>
                    {formErrors.amount && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.amount}</p>
                    )}
                  </div>
                )}

                {/* Loan Fields */}
                {type === "Loan" && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-5"
                  >
                    <div>
                      <label
                        htmlFor="tenure"
                        className=" mb-2 font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2"
                      >
                        <FaRegCalendarAlt className="text-blue-600 dark:text-blue-400" />
                        Tenure (months) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="tenure"
                        value={tenure}
                        onChange={(e) => setTenure(e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          formErrors.tenure
                            ? "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20"
                            : "border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800"
                        } focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent outline-none transition-colors dark:text-white`}
                        min="1"
                        placeholder="Enter tenure in months"
                      />
                      {formErrors.tenure && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.tenure}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="interestRate"
                        className=" mb-2 font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2"
                      >
                        <FaPercentage className="text-blue-600 dark:text-blue-400" />
                        Interest Rate <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          id="interestRate"
                          value={interestRate}
                          onChange={(e) => setInterestRate(e.target.value)}
                          className={`w-full pr-8 pl-4 py-3 rounded-lg border ${
                            formErrors.interestRate
                              ? "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20"
                              : "border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800"
                          } focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent outline-none transition-colors dark:text-white`}
                          min="0"
                          step="0.01"
                          placeholder="Enter interest rate"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                          %
                        </span>
                      </div>
                      {formErrors.interestRate && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.interestRate}</p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Reason */}
                <div>
                  <label
                    htmlFor="reason"
                    className=" mb-2 font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2"
                  >
                    <FaRegFileAlt className="text-blue-600 dark:text-blue-400" />
                    Reason <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      formErrors.reason
                        ? "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20"
                        : "border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800"
                    } focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent outline-none transition-colors dark:text-white`}
                    rows={3}
                    placeholder="Enter reason for the request"
                  ></textarea>
                  {formErrors.reason && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.reason}</p>
                  )}
                </div>

                {/* Documents Upload (Reimbursement) */}
                {type === "Reimbursement" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label
                      htmlFor="documents"
                      className=" mb-2 font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2"
                    >
                      <FaFileUpload className="text-blue-600 dark:text-blue-400" />
                      Upload Documents <span className="text-red-500">*</span>
                    </label>
                    
                    <div className={`border-2 border-dashed rounded-lg p-4 ${
                      formErrors.documents
                        ? "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20"
                        : "border-gray-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-500"
                    } transition-colors cursor-pointer`}>
                      <input
                        type="file"
                        id="documents"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.pdf"
                      />
                      <label htmlFor="documents" className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                        <FaFileUpload className="text-4xl mb-2 text-blue-600 dark:text-blue-400" />
                        <span className="text-gray-700 dark:text-gray-200 text-center font-medium">
                          Drop files here or click to browse
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">
                          JPG, JPEG, PNG, PDF (max 5 files)
                        </span>
                      </label>
                    </div>
                    
                    {/* Display selected files */}
                    {fileNames.length > 0 && (
                      <div className="mt-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                        <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">Selected Files:</h4>
                        <ul className="space-y-1">
                          {fileNames.map((name, index) => (
                            <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                              <FaRegFileAlt className="text-blue-600 dark:text-blue-400" />
                              {name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {formErrors.documents && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.documents}</p>
                    )}
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-3">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleClose}
                    className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors font-medium"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </motion.button>
                  
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg font-medium flex items-center gap-2"
                    disabled={isSubmitting}
                  >
                    <FaPaperPlane />
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </BaseModal>
        )}
      </AnimatePresence>
    </>
  );
};

export default RequestModal;