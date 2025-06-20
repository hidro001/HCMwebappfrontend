// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { MdFileUpload } from "react-icons/md";
// import { motion } from "framer-motion";
// import useJobStore from "../../store/useJobStore";
// import axiosInstance from "../../service/axiosInstance";
// import { toast } from "react-hot-toast";
// import FullScreenLoader from "../common/FullScreenLoader";

// const containerVariants = {
//   hidden: { opacity: 0, y: -10 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { type: "tween", duration: 0.2, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.05 },
//   },
// };

// const cardVariants = {
//   hidden: { opacity: 0, x: -10 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: { type: "tween", duration: 0.2, ease: "easeOut" },
//   },
// };

// export default function CreateVacancy() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const { createJob, loading, error, successMessage } = useJobStore();

//   const [departments, setDepartments] = useState([]);
//   const [deptError, setDeptError] = useState(null);

//   useEffect(() => {
//     const employeeId = localStorage.getItem("employeeId");
//     const fetchDepartments = async () => {
//       try {
//         const response = await axiosInstance.get(`/department-allocations/users/${employeeId}`);
//         const validDepartments = response.data.departmentAlocated.filter(
//           (dept) => !dept.includes("[") && !dept.includes("]")
//         );
//         setDepartments(validDepartments);
//       } catch (err) {
//         setDeptError("Failed to fetch departments.");
//       }
//     };

//     if (employeeId) {
//       fetchDepartments();
//     } else {
//       setDeptError("No employeeId found in localStorage.");
//     }
//   }, []);

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//     }
//   }, [error]);

//   useEffect(() => {
//     if (successMessage) {
//       toast.success(successMessage);
//     }
//   }, [successMessage]);

//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();
//       formData.append("jobTitle", data.jobTitle);
//       formData.append("jobDepartment", data.jobDepartment);
//       formData.append("jobDescription", data.jobDescription ?? "");
//       if (data.employmentType) {
//         data.employmentType.forEach((type) => {
//           formData.append("employmentType", type);
//         });
//       }
//       formData.append("jobLocations", data.jobLocations ?? "");
//       formData.append("currency", data.currency ?? "");
//       formData.append("salary", data.salary ?? "");
//       formData.append("payPeriod", data.payPeriod ?? "");
//       formData.append("multipleCandidates", data.multipleCandidates ? "true" : "false");
//       formData.append("vacancyStatus", data.vacancyStatus ?? "");
//       formData.append("openingDate", data.openingDate ?? "");
//       formData.append("closingDate", data.closingDate ?? "");
//       formData.append("workExperience", data.workExperience ?? "");
//       formData.append("education", data.education ?? "");
//       if (data.suitableFor) {
//         data.suitableFor.forEach((sf) => {
//           formData.append("suitableFor", sf);
//         });
//       }
//       formData.append("responsibilities", data.responsibilities ?? "");
//       formData.append("duties", data.duties ?? "");
//       formData.append("contactPerson", data.contactPerson ?? "");
//       formData.append("contactPhone", data.contactPhone ?? "");
//       formData.append("additionalContact", data.additionalContact ?? "");
//       formData.append("showContacts", data.showContacts ? "true" : "false");
//       if (data.jobDescriptionFile && data.jobDescriptionFile.length > 0) {
//         formData.append("jobDescriptionFile", data.jobDescriptionFile[0]);
//       }
//       await createJob(formData);
//     } catch (err) {}
//   };

//   return (
//     <>
//       {loading && <FullScreenLoader />}
//       <motion.div
//         className="w-full mx-auto px-4 py-6 bg-bg-secondary mt-5 rounded-xl"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
//           <h1 className="text-2xl font-semibold mb-4 md:mb-0 dark:text-white">Create Vacancy</h1>
//           <div className="space-x-2">
//             {/* <button
//               type="button"
//               className="px-4 py-2 rounded border border-gray-300 text-gray-700
//                        hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200
//                        dark:hover:bg-gray-800"
//             >
//               Cancel
//             </button> */}
//             <button
//               type="submit"
//               form="createVacancyForm"
//               className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
//               disabled={loading}
//             >
//               {loading ? "Saving..." : "Save"}
//             </button>
//           </div>
//         </div>
//         {deptError && <div className="bg-red-100 text-red-800 p-3 mb-4 rounded">{deptError}</div>}
//         <form id="createVacancyForm" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div className="flex flex-col space-y-6">
//             <motion.div
//               className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-6"
//               variants={cardVariants}
//             >
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-lg font-semibold dark:text-gray-100">Basic Information</h2>
//                 <label
//                   htmlFor="jobDescriptionFile"
//                   className="flex items-center cursor-pointer text-blue-600 hover:text-blue-800 dark:text-blue-400"
//                 >
//                   <MdFileUpload className="mr-1 text-xl" />
//                   Upload JD
//                 </label>
//                 <input type="file" id="jobDescriptionFile" className="hidden" {...register("jobDescriptionFile")} />
//               </div>
//               <div className="mb-4">
//                 <label className="text-sm font-medium block mb-1 dark:text-gray-300">JOB TITLE</label>
//                 <input
//                   type="text"
//                   placeholder="Position name"
//                   {...register("jobTitle", { required: true })}
//                   className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//                 />
//                 {errors.jobTitle && <p className="text-red-600 text-xs mt-1">Job title is required.</p>}
//               </div>
//               <div className="mb-4">
//                 <label className="text-sm font-medium block mb-1 dark:text-gray-300">JOB DEPARTMENT</label>
//                 <select
//                   {...register("jobDepartment", { required: true })}
//                   className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//                   disabled={!departments.length}
//                 >
//                   <option value="">Choose Department</option>
//                   {departments.map((dept) => (
//                     <option key={dept} value={dept}>
//                       {dept}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.jobDepartment && <p className="text-red-600 text-xs mt-1">Department is required.</p>}
//               </div>
//               <div className="mb-4">
//                 <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                   JOB DESCRIPTION<span className="text-red-500 ml-1">*</span>
//                 </label>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                   For effective candidate selection, add comprehensive details
//                 </p>
//                 <textarea
//                   placeholder="Enter job description"
//                   rows={4}
//                   {...register("jobDescription")}
//                   className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="text-sm font-medium block mb-1 dark:text-gray-300">EMPLOYMENT TYPE</label>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Pick one or multiple options</p>
//                 <div className="flex flex-wrap items-center gap-3">
//                   {["Full Time", "Part Time", "Contract", "Freelance", "Remote"].map((type) => (
//                     <label key={type} className="inline-flex items-center space-x-1 text-sm">
//                       <input
//                         type="checkbox"
//                         value={type}
//                         {...register("employmentType")}
//                         className="form-checkbox h-4 w-4 text-blue-600 dark:bg-gray-700 dark:border-gray-600"
//                       />
//                       <span className="dark:text-gray-300">{type}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//               <div className="mb-4">
//                 <label className="text-sm font-medium block mb-1 dark:text-gray-300">JOB LOCATIONS</label>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                   Choose multiple (comma-separated) or a single location
//                 </p>
//                 <input
//                   type="text"
//                   placeholder="e.g. New Delhi, Gurugram, Noida"
//                   {...register("jobLocations")}
//                   className="w-full rounded border border-gray-300 px-3 py-2 mb-2 text-sm
//                              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="text-sm font-medium block mb-1 dark:text-gray-300">SALARY</label>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Choose how you prefer for this job</p>
//                 <div className="flex flex-col md:flex-row md:items-center flex-wrap gap-2">
//                   <select
//                     {...register("currency")}
//                     className="rounded border border-gray-300 px-3 py-2 text-sm
//                                dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100
//                                md:w-auto w-full"
//                   >
//                     <option value="INR">INR</option>
//                     <option value="USD">USD</option>
//                     <option value="EUR">EUR</option>
//                   </select>
//                   <input
//                     type="number"
//                     placeholder="Salary"
//                     {...register("salary")}
//                     className="rounded border border-gray-300 px-3 py-2 text-sm
//                                dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100
//                                md:flex-1 w-full"
//                   />
//                   <select
//                     {...register("payPeriod")}
//                     className="rounded border border-gray-300 px-3 py-2 text-sm
//                                dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100
//                                md:w-auto w-full"
//                   >
//                     <option value="Yearly">Yearly</option>
//                     <option value="Monthly">Monthly</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="mb-2">
//                 <label className="flex items-center text-sm dark:text-gray-300">
//                   <input
//                     type="checkbox"
//                     id="multipleCandidates"
//                     {...register("multipleCandidates")}
//                     className="form-checkbox h-4 w-4 text-blue-600 dark:bg-gray-700 dark:border-gray-600 mr-2"
//                   />
//                   Yes, I am hiring multiple candidates
//                 </label>
//               </div>
//             </motion.div>
//             <motion.div
//               className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-6"
//               variants={cardVariants}
//             >
//               <h2 className="text-lg font-semibold mb-2 dark:text-gray-100">Dates and Status</h2>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
//                 This section provides a snapshot of when the vacancy opened, any closing date (if applicable), and its
//                 current status
//               </p>
//               <div className="mb-4">
//                 <label className="text-sm font-medium block mb-1 dark:text-gray-300">VACANCY STATUS</label>
//                 <select
//                   {...register("vacancyStatus")}
//                   className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//                 >
//                   <option value="">Choose Status</option>
//                   <option value="Draft">Draft</option>
//                   <option value="Open">Open</option>
//                   <option value="Closed">Closed</option>
//                 </select>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm font-medium block mb-1 dark:text-gray-300">OPENING DATE</label>
//                   <input
//                     type="date"
//                     placeholder="dd-mm-yyyy"
//                     {...register("openingDate")}
//                     className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                                dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//                   />
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium block mb-1 dark:text-gray-300">CLOSING DATE</label>
//                   <input
//                     type="date"
//                     placeholder="dd-mm-yyyy"
//                     {...register("closingDate")}
//                     className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                                dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//                   />
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//           <div className="flex flex-col space-y-6">
//             <motion.div
//               className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-6"
//               variants={cardVariants}
//             >
//               <h2 className="text-lg font-semibold mb-2 dark:text-gray-100">Applicant requirements</h2>
//               <div className="mb-4">
//                 <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                   WORK EXPERIENCE<span className="text-red-500 ml-1">*</span>
//                 </label>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Provide details about experience</p>
//                 <select
//                   {...register("workExperience")}
//                   className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//                 >
//                   <option value="no experience required">no experience required</option>
//                   <option value="1-2 years">1-2 years</option>
//                   <option value="3-5 years">3-5 years</option>
//                   <option value="5+ years">5+ years</option>
//                 </select>
//               </div>
//               <div className="mb-4">
//                 <label className="text-sm font-medium block mb-1 dark:text-gray-300">EDUCATION</label>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Select Education</p>
//                 <select
//                   {...register("education")}
//                   className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//                 >
//                   <option value="Higher">Higher</option>
//                   <option value="Graduate">Graduate</option>
//                   <option value="Postgraduate">Postgraduate</option>
//                 </select>
//               </div>
//               <div className="mb-4">
//                 <label className="text-sm font-medium block mb-1 dark:text-gray-300">THE JOB IS SUITABLE FOR:</label>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Pick one or multiple options</p>
//                 <div className="flex flex-wrap items-center gap-4">
//                   {["Fresher", "Internship", "Freelancer"].map((role) => (
//                     <label key={role} className="inline-flex items-center space-x-1 text-sm">
//                       <input
//                         type="checkbox"
//                         value={role}
//                         {...register("suitableFor")}
//                         className="form-checkbox h-4 w-4 text-blue-600 dark:bg-gray-700 dark:border-gray-600"
//                       />
//                       <span className="dark:text-gray-300">{role}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//               <div className="mb-4">
//                 <label className="text-sm font-medium block mb-1 dark:text-gray-300">RESPONSIBILITIES</label>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                   Main tasks that the candidate will be accountable for
//                 </p>
//                 <textarea
//                   rows={3}
//                   placeholder="Performing tasks related to..."
//                   {...register("responsibilities")}
//                   className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//                 />
//               </div>
//               <div>
//                 <label className="text-sm font-medium block mb-1 dark:text-gray-300">DUTIES</label>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                   Specific tasks and actions on a day-to-day basis
//                 </p>
//                 <textarea
//                   rows={3}
//                   placeholder="Planning and executing..."
//                   {...register("duties")}
//                   className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//                 />
//               </div>
//             </motion.div>
//             <motion.div
//               className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-6"
//               variants={cardVariants}
//             >
//               <h2 className="text-lg font-semibold mb-2 dark:text-gray-100">Contact information</h2>
//               <div className="mb-4">
//                 <label className="text-sm font-medium block mb-1 dark:text-gray-300">CONTACT PERSON</label>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Person to contact for inquiries</p>
//                 <input
//                   type="text"
//                   placeholder="Name of contact person"
//                   {...register("contactPerson")}
//                   className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="text-sm font-medium block mb-1 dark:text-gray-300">CONTACT PHONE</label>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Phone for inquiries</p>
//                 <input
//                   type="text"
//                   placeholder="Phone number"
//                   {...register("contactPhone")}
//                   className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="text-sm font-medium block mb-1 dark:text-gray-300">ADDITIONAL CONTACT</label>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Extra contact info (Skype, WhatsApp, etc.)</p>
//                 <input
//                   type="text"
//                   placeholder="Skype, WhatsApp, etc."
//                   {...register("additionalContact")}
//                   className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//                 />
//               </div>
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="showContacts"
//                   {...register("showContacts")}
//                   className="form-checkbox h-4 w-4 text-blue-600 dark:bg-gray-700 dark:border-gray-600 mr-2"
//                 />
//                 <label htmlFor="showContacts" className="text-sm font-medium dark:text-gray-300">
//                   Show the name and phone number on this job page
//                 </label>
//               </div>
//             </motion.div>
//           </div>
//         </form>
//       </motion.div>
//     </>
//   );
// }


import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBriefcase,
  FaBuilding,
  FaFileUpload,
  FaDollarSign,
  FaCalendarAlt,
  FaGraduationCap,
  FaPhone,
  FaUser,
  FaMapMarkerAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaPlus,
  FaCheck,
  FaExclamationTriangle,
  FaCloudUploadAlt,
  FaFileAlt
} from "react-icons/fa";
import {
  HiBriefcase,
  HiOfficeBuilding,
  HiUpload,
  HiCurrencyDollar,
  HiCalendar,
  HiAcademicCap,
  HiPhone,
  HiUser,
  HiLocationMarker,
  HiSave,
  HiX,
  HiDocument,
  HiClipboardList
} from "react-icons/hi";
import useJobStore from "../../store/useJobStore";
import axiosInstance from "../../service/axiosInstance";
import { toast } from "react-hot-toast";
import FullScreenLoader from "../common/FullScreenLoader";

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

export default function CreateVacancy() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm();

  const { createJob, loading, error, successMessage } = useJobStore();

  const [departments, setDepartments] = useState([]);
  const [deptError, setDeptError] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const watchedFields = watch();

  useEffect(() => {
    const employeeId = localStorage.getItem("employeeId");
    const fetchDepartments = async () => {
      try {
        const response = await axiosInstance.get(`/department-allocations/users/${employeeId}`);
        const validDepartments = response.data.departmentAlocated.filter(
          (dept) => !dept.includes("[") && !dept.includes("]")
        );
        setDepartments(validDepartments);
      } catch (err) {
        setDeptError("Failed to fetch departments.");
      }
    };

    if (employeeId) {
      fetchDepartments();
    } else {
      setDeptError("No employeeId found in localStorage.");
    }
  }, []);

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
    try {
      const formData = new FormData();
      formData.append("jobTitle", data.jobTitle);
      formData.append("jobDepartment", data.jobDepartment);
      formData.append("jobDescription", data.jobDescription ?? "");
      if (data.employmentType) {
        data.employmentType.forEach((type) => {
          formData.append("employmentType", type);
        });
      }
      formData.append("jobLocations", data.jobLocations ?? "");
      formData.append("currency", data.currency ?? "");
      formData.append("salary", data.salary ?? "");
      formData.append("payPeriod", data.payPeriod ?? "");
      formData.append("multipleCandidates", data.multipleCandidates ? "true" : "false");
      formData.append("vacancyStatus", data.vacancyStatus ?? "");
      formData.append("openingDate", data.openingDate ?? "");
      formData.append("closingDate", data.closingDate ?? "");
      formData.append("workExperience", data.workExperience ?? "");
      formData.append("education", data.education ?? "");
      if (data.suitableFor) {
        data.suitableFor.forEach((sf) => {
          formData.append("suitableFor", sf);
        });
      }
      formData.append("responsibilities", data.responsibilities ?? "");
      formData.append("duties", data.duties ?? "");
      formData.append("contactPerson", data.contactPerson ?? "");
      formData.append("contactPhone", data.contactPhone ?? "");
      formData.append("additionalContact", data.additionalContact ?? "");
      formData.append("showContacts", data.showContacts ? "true" : "false");
      if (data.jobDescriptionFile && data.jobDescriptionFile.length > 0) {
        formData.append("jobDescriptionFile", data.jobDescriptionFile[0]);
      }
      await createJob(formData);
    } catch (err) {}
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
      fields: ['employmentType', 'jobLocations', 'salary']
    },
    {
      title: "Requirements",
      description: "Experience and qualifications",
      icon: HiAcademicCap,
      fields: ['workExperience', 'education', 'responsibilities']
    },
    {
      title: "Contact & Status",
      description: "Contact info and vacancy status",
      icon: HiPhone,
      fields: ['contactPerson', 'vacancyStatus']
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
    const allFields = ['jobTitle', 'jobDepartment', 'jobDescription', 'employmentType', 'jobLocations', 'salary'];
    const completedFields = allFields.filter(field => watchedFields[field]);
    return Math.round((completedFields.length / allFields.length) * 100);
  };

  return (
    <>
      {loading && <FullScreenLoader />}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 lg:p-8 rounded-2xl"
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                        <select
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
                        </select>
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

                    {/* Salary */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <HiCurrencyDollar className="text-blue-500" />
                        <span>Salary Information</span>
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Set the compensation for this position
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <select
                          {...register("currency")}
                          className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="INR">INR (₹)</option>
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                        </select>
                        <input
                          type="number"
                          placeholder="Amount"
                          {...register("salary")}
                          className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                        <select
                          {...register("payPeriod")}
                          className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="Yearly">Per Year</option>
                          <option value="Monthly">Per Month</option>
                        </select>
                      </div>
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
                        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                          <HiCalendar className="text-blue-500" />
                          <span>Vacancy Status</span>
                        </h3>
                        <select
                          {...register("vacancyStatus")}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Choose Status</option>
                          <option value="Draft">Draft</option>
                          <option value="Open">Open</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </div>
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
                      <div className="space-y-2">
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
                      </div>

                      {/* Education */}
                      <div className="space-y-2">
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
                      </div>
                    </div>

                    {/* Suitable For */}
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
                      type="submit"
                      disabled={loading}
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
    </>
  );
}