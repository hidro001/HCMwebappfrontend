


// import React, { useState, useEffect, useMemo } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Select from "react-select";
// import { motion, AnimatePresence } from "framer-motion";
// import { usePoshStore } from "../../../../store/poshStore";
// import BaseModal from "../../../common/BaseModal";
// import FullScreenLoader from "../../../common/FullScreenLoader";

// export default function FilePoshModal({ isOpen, onClose, ticket, onSave }) {
//   const [accusedId, setAccusedId] = useState("");
//   const [complaintType, setComplaintType] = useState("");
//   const [incidentDate, setIncidentDate] = useState(null);
//   const [description, setDescription] = useState("");
//   const [fileAttachment, setFileAttachment] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false); // <-- NEW state

//   const { employees, fetchAllEmployees, createPoshAct, updatePoshAct } = usePoshStore();
//   const isEdit = Boolean(ticket && ticket.id);

//   useEffect(() => {
//     if (isOpen) {
//       fetchAllEmployees();
//     }
//   }, [isOpen, fetchAllEmployees]);

//   useEffect(() => {
//     if (ticket) {
//       const foundEmp = employees.find(
//         (emp) => emp._id === ticket.accusedId || emp.employee_Id === ticket.accusedId
//       );
//       setAccusedId(foundEmp ? foundEmp._id : ticket.accusedId || "");
//       setComplaintType(ticket.type || "");
//       setIncidentDate(ticket.incidentDate ? new Date(ticket.incidentDate) : null);
//       setDescription(ticket.description || "");
//       setFileAttachment(null);
//     } else {
//       setAccusedId("");
//       setComplaintType("");
//       setIncidentDate(null);
//       setDescription("");
//       setFileAttachment(null);
//     }
//   }, [ticket, employees]);

//   const isDarkMode =
//     typeof document !== "undefined" && document.documentElement.classList.contains("dark");

//   const customSelectStyles = {
//     control: (base) => ({
//       ...base,
//       borderColor: "#d1d5db",
//       backgroundColor: isDarkMode ? "#1f2937" : base.backgroundColor,
//       color: isDarkMode ? "#fff" : "#000",
//     }),
//     menu: (base) => ({
//       ...base,
//       backgroundColor: isDarkMode ? "#1f2937" : "#fff",
//       zIndex: 9999,
//     }),
//     menuList: (base) => ({
//       ...base,
//       backgroundColor: isDarkMode ? "#1f2937" : "#fff",
//     }),
//     option: (base, state) => ({
//       ...base,
//       backgroundColor: state.isFocused
//         ? isDarkMode
//           ? "#374151"
//           : "#f5f5f5"
//         : isDarkMode
//         ? "#1f2937"
//         : "#fff",
//       color: isDarkMode ? "#fff" : "#000",
//     }),
//     singleValue: (base) => ({
//       ...base,
//       color: isDarkMode ? "#fff" : "#000",
//     }),
//   };

//   const employeeOptions = useMemo(
//     () =>
//       employees.map((emp) => ({
//         value: emp._id,
//         label: `${emp.first_Name} ${emp.last_Name} (${emp.employee_Id})`,
//       })),
//     [employees]
//   );

//   const selectedEmployeeOption = useMemo(
//     () => employeeOptions.find((option) => option.value === accusedId) || null,
//     [accusedId, employeeOptions]
//   );

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true); // Start loading spinner
//     try {
//       const formData = new FormData();
//       formData.append("accusedId", accusedId);
//       formData.append("type", complaintType);

//       if (incidentDate) {
//         formData.append("dateOfIncident", incidentDate.toISOString().split("T")[0]);
//       }
//       formData.append("description", description);

//       if (fileAttachment) {
//         formData.append("attachments", fileAttachment);
//       }

//       if (isEdit && ticket?.id) {
//         await updatePoshAct(ticket.id, formData);
//       } else {
//         await createPoshAct(formData);
//       }

//       if (onSave) onSave();
//       onClose();
//     } catch (err) {
//       console.error("Error saving POSH Act:", err);
//       // You might show an error message in your UI here
//     } finally {
//       setIsSubmitting(false); // End loading spinner
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <BaseModal isOpen={isOpen} onClose={onClose}>
//       {/* Show fullscreen loader when isSubmitting */}
//       {isSubmitting && <FullScreenLoader />}

//       <AnimatePresence>
//         {isOpen && !isSubmitting && (
//           <motion.div
//             className="w-full max-w-md p-6 rounded bg-white dark:bg-gray-800 shadow-lg"
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//           >
//             <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
//               {isEdit ? "Edit POSH Issue" : "File a POSH Issue"}
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block font-medium text-sm mb-1 dark:text-gray-100">
//                   Accused Employee
//                 </label>
//                 <Select
//                   options={employeeOptions}
//                   value={selectedEmployeeOption}
//                   onChange={(selected) => setAccusedId(selected?.value || "")}
//                   isDisabled={isEdit}
//                   isSearchable={!isEdit}
//                   placeholder="Select or search an employee..."
//                   styles={customSelectStyles}
//                 />
//               </div>

//               <div>
//                 <label className="block font-medium text-sm mb-1 dark:text-gray-100">
//                   Type of Complaint
//                 </label>
//                 <select
//                   className="w-full border rounded px-3 py-1 focus:outline-none dark:bg-gray-700 dark:text-gray-100"
//                   value={complaintType}
//                   onChange={(e) => setComplaintType(e.target.value)}
//                   required
//                 >
//                   <option value="">Select Type</option>
//                   <option value="Sexual Harassment">Sexual Harassment</option>
//                   <option value="Abuse">Abuse</option>
//                   <option value="Discrimination">Discrimination</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block font-medium text-sm mb-1 dark:text-gray-100">
//                   Incident Date
//                 </label>
//                 <DatePicker
//                   selected={incidentDate}
//                   onChange={(date) => setIncidentDate(date)}
//                   dateFormat="dd/MM/yyyy"
//                   className="w-full border rounded px-3 py-1 dark:bg-gray-700 dark:text-gray-100 focus:outline-none"
//                   placeholderText="DD/MM/YYYY"
//                 />
//               </div>

//               <div>
//                 <label className="block font-medium text-sm mb-1 dark:text-gray-100">
//                   Description
//                 </label>
//                 <textarea
//                   className="w-full border rounded px-3 py-1 h-24 dark:bg-gray-700 dark:text-gray-100 focus:outline-none"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block font-medium text-sm mb-1 dark:text-gray-100">
//                   Proof / Attachment
//                 </label>
//                 <input
//                   type="file"
//                   className="block w-full text-sm text-gray-900
//                              file:mr-4 file:py-2 file:px-4 file:rounded 
//                              file:border-0 file:text-sm file:font-semibold
//                              file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100
//                              dark:bg-gray-700 dark:text-gray-100 dark:file:bg-gray-600 
//                              dark:file:text-gray-100"
//                   onChange={(e) => setFileAttachment(e.target.files?.[0] || null)}
//                 />
//               </div>

//               <div className="flex justify-end space-x-3">
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-sm font-semibold hover:bg-gray-400 dark:hover:bg-gray-500"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 rounded bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
//                 >
//                   {isEdit ? "Update Posh" : "Submit Posh"}
//                 </button>
//               </div>
//             </form>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </BaseModal>
//   );
// }


import React, { useState, useEffect, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaShieldAlt, FaUser, FaCalendarAlt, FaFileAlt, FaPaperclip, 
  FaExclamationTriangle, FaTimes, FaCheck, FaSpinner, FaEdit,
  FaPlus, FaUserTie, FaClipboardList, FaUpload
} from "react-icons/fa";
import { 
  MdSecurity, MdPerson, MdCalendarToday, MdDescription, 
  MdAttachFile, MdClose, MdSave, MdEdit, MdAdd, MdReport,
  MdVerifiedUser, MdAssignment, MdUploadFile, MdPersonSearch
} from "react-icons/md";
import {
   HiOutlineUser, HiOutlineCalendar, 
  HiOutlineDocument, HiOutlinePaperClip, HiOutlineX,
  HiOutlineCheck, HiOutlinePlus, 
  HiOutlineUserGroup, HiOutlineClipboardList, HiOutlineUpload,
  HiOutlinePencil, HiOutlineIdentification, HiOutlineDocumentText
} from "react-icons/hi";

import { HiExclamationTriangle  } from 'react-icons/hi2';

import { usePoshStore } from "../../../../store/poshStore";
import BaseModal from "../../../common/BaseModal";
import FullScreenLoader from "../../../common/FullScreenLoader";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    y: 50,
    transition: { duration: 0.2 }
  }
};

const fieldVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 }
  }
};

export default function FilePoshModal({ isOpen, onClose, ticket, onSave }) {
  const [accusedId, setAccusedId] = useState("");
  const [complaintType, setComplaintType] = useState("");
  const [incidentDate, setIncidentDate] = useState(null);
  const [description, setDescription] = useState("");
  const [fileAttachment, setFileAttachment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const { employees, fetchAllEmployees, createPoshAct, updatePoshAct } = usePoshStore();
  const isEdit = Boolean(ticket && ticket.id);

  useEffect(() => {
    if (isOpen) {
      fetchAllEmployees();
    }
  }, [isOpen, fetchAllEmployees]);

  useEffect(() => {
    if (ticket) {
      const foundEmp = employees.find(
        (emp) => emp._id === ticket.accusedId || emp.employee_Id === ticket.accusedId
      );
      setAccusedId(foundEmp ? foundEmp._id : ticket.accusedId || "");
      setComplaintType(ticket.type || "");
      setIncidentDate(ticket.incidentDate ? new Date(ticket.incidentDate) : null);
      setDescription(ticket.description || "");
      setFileAttachment(null);
    } else {
      setAccusedId("");
      setComplaintType("");
      setIncidentDate(null);
      setDescription("");
      setFileAttachment(null);
    }
  }, [ticket, employees]);

  const isDarkMode =
    typeof document !== "undefined" && document.documentElement.classList.contains("dark");

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? "#ef4444" : "#d1d5db",
      backgroundColor: isDarkMode ? "#374151" : "#ffffff",
      color: isDarkMode ? "#ffffff" : "#000000",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(239, 68, 68, 0.2)" : "none",
      "&:hover": {
        borderColor: "#ef4444"
      },
      minHeight: "42px",
      borderRadius: "8px"
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: isDarkMode ? "#374151" : "#ffffff",
      zIndex: 9999,
      borderRadius: "8px",
      border: `1px solid ${isDarkMode ? "#4b5563" : "#e5e7eb"}`,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    }),
    menuList: (base) => ({
      ...base,
      backgroundColor: isDarkMode ? "#374151" : "#ffffff",
      borderRadius: "8px"
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? isDarkMode ? "#4b5563" : "#fef2f2"
        : isDarkMode ? "#374151" : "#ffffff",
      color: isDarkMode ? "#ffffff" : "#000000",
      "&:hover": {
        backgroundColor: isDarkMode ? "#4b5563" : "#fef2f2"
      }
    }),
    singleValue: (base) => ({
      ...base,
      color: isDarkMode ? "#ffffff" : "#000000"
    }),
    placeholder: (base) => ({
      ...base,
      color: isDarkMode ? "#9ca3af" : "#6b7280"
    })
  };

  const employeeOptions = useMemo(
    () =>
      employees.map((emp) => ({
        value: emp._id,
        label: `${emp.first_Name} ${emp.last_Name} (${emp.employee_Id})`,
      })),
    [employees]
  );

  const selectedEmployeeOption = useMemo(
    () => employeeOptions.find((option) => option.value === accusedId) || null,
    [accusedId, employeeOptions]
  );

  const complaintTypes = [
    { value: "Sexual Harassment", icon: HiExclamationTriangle, color: "text-red-500" },
    { value: "Abuse", icon: FaShieldAlt, color: "text-orange-500" },
    { value: "Discrimination", icon: HiOutlineUserGroup, color: "text-purple-500" },
    { value: "Other", icon: HiOutlineClipboardList, color: "text-gray-500" }
  ];

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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileAttachment(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("accusedId", accusedId);
      formData.append("type", complaintType);

      if (incidentDate) {
        formData.append("dateOfIncident", incidentDate.toISOString().split("T")[0]);
      }
      formData.append("description", description);

      if (fileAttachment) {
        formData.append("attachments", fileAttachment);
      }

      if (isEdit && ticket?.id) {
        await updatePoshAct(ticket.id, formData);
      } else {
        await createPoshAct(formData);
      }

      if (onSave) onSave();
      onClose();
    } catch (err) {
      console.error("Error saving POSH Act:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      {isSubmitting && <FullScreenLoader />}

      <AnimatePresence>
        {isOpen && !isSubmitting && (
          <motion.div
            className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border h-[90%] max-h-[90vh] relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-orange-600 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                    {isEdit ? (
                      <HiOutlinePencil className="text-white text-2xl" />
                    ) : (
                      <FaShieldAlt className="text-white text-2xl" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {isEdit ? "Edit POSH Case" : "File POSH Complaint"}
                    </h2>
                    <p className="text-red-100">
                      {isEdit ? "Update case information" : "Report workplace harassment or discrimination"}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all"
                >
                  <HiOutlineX size={24} />
                </motion.button>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-6">
              
              {/* Accused Employee Selection */}
              <motion.div
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-3">
                  <HiOutlineIdentification className="text-red-500 text-xl" />
                  <label className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Accused Employee
                  </label>
                  {isEdit && (
                    <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs rounded-full">
                      Cannot be changed
                    </span>
                  )}
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                  <Select
                    options={employeeOptions}
                    value={selectedEmployeeOption}
                    onChange={(selected) => setAccusedId(selected?.value || "")}
                    isDisabled={isEdit}
                    isSearchable={!isEdit}
                    placeholder="Search and select an employee..."
                    styles={customSelectStyles}
                    className="text-sm"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {isEdit ? "Employee selection is locked for existing cases" : "Type to search by name or employee ID"}
                  </p>
                </div>
              </motion.div>

              {/* Complaint Type */}
              <motion.div
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-3">
                  <HiExclamationTriangle className="text-red-500 text-xl" />
                  <label className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Type of Complaint
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {complaintTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <motion.label
                        key={type.value}
                        className={`relative flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          complaintType === type.value
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-600'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <input
                          type="radio"
                          name="complaintType"
                          value={type.value}
                          checked={complaintType === type.value}
                          onChange={(e) => setComplaintType(e.target.value)}
                          className="sr-only"
                        />
                        <Icon className={`text-xl ${complaintType === type.value ? 'text-red-500' : type.color}`} />
                        <span className={`font-medium text-sm ${
                          complaintType === type.value 
                            ? 'text-red-700 dark:text-red-300' 
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {type.value}
                        </span>
                        {complaintType === type.value && (
                          <HiOutlineCheck className="absolute top-2 right-2 text-red-500" />
                        )}
                      </motion.label>
                    );
                  })}
                </div>
              </motion.div>

              {/* Incident Date */}
              <motion.div
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-3">
                  <HiOutlineCalendar className="text-red-500 text-xl" />
                  <label className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Incident Date
                  </label>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                  <DatePicker
                    selected={incidentDate}
                    onChange={(date) => setIncidentDate(date)}
                    dateFormat="dd/MM/yyyy"
                    maxDate={new Date()}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholderText="Select incident date"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Select the date when the incident occurred
                  </p>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-3">
                  <HiOutlineDocumentText className="text-red-500 text-xl" />
                  <label className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Detailed Description
                  </label>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide a detailed description of the incident..."
                    required
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Please provide as much detail as possible
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {description.length}/1000
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* File Attachment */}
              <motion.div
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-3">
                  <HiOutlinePaperClip className="text-red-500 text-xl" />
                  <label className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Supporting Evidence
                  </label>
                </div>
                <div 
                  className={`relative border-2 border-dashed rounded-xl p-6 transition-all ${
                    dragActive 
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                      : 'border-gray-300 dark:border-gray-600 hover:border-red-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="file-upload"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => setFileAttachment(e.target.files?.[0] || null)}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                  />
                  <div className="text-center">
                    {fileAttachment ? (
                      <div className="flex items-center justify-center gap-3">
                        <HiOutlineDocument className="text-green-500 text-3xl" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            {fileAttachment.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {(fileAttachment.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <motion.button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setFileAttachment(null);
                          }}
                          className="text-red-500 hover:text-red-700"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <HiOutlineX />
                        </motion.button>
                      </div>
                    ) : (
                      <div>
                        <HiOutlineUpload className="mx-auto text-4xl text-gray-400 mb-3" />
                        <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
                          Drop files here or click to upload
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Supports: PDF, DOC, DOCX, JPG, PNG, GIF (Max 10MB)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!accusedId || !complaintType || !description}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                    accusedId && complaintType && description
                      ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                  }`}
                  whileHover={accusedId && complaintType && description ? { scale: 1.02 } : {}}
                  whileTap={accusedId && complaintType && description ? { scale: 0.98 } : {}}
                >
                  {isEdit ? (
                    <>
                      <MdSave />
                      Update Case
                    </>
                  ) : (
                    <>
                      <MdAdd />
                      Submit Complaint
                    </>
                  )}
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </BaseModal>
  );
}