// import React from "react";
// import { useForm } from "react-hook-form";
// import { MdFileUpload } from "react-icons/md";
// import { motion } from "framer-motion";

// // Container slides down from the top with a spring effect
// const containerVariants = {
//     hidden: { opacity: 0, y: -10 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         type: "tween",
//         duration: 0.2,     // quick 0.2s animation
//         ease: "easeOut",
//         when: "beforeChildren",
//         staggerChildren: 0.05,
//       },
//     },
//   };
  
//   const cardVariants = {
//     hidden: { opacity: 0, x: -10 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         type: "tween",
//         duration: 0.2,
//         ease: "easeOut",
//       },
//     },
//   };
  

// export default function CreateVacancy() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     console.log("Form data:", data);
//     // Handle your submit logic...
//   };

//   return (
//     <motion.div
//       className="w-full mx-auto px-4 py-6 bg-bg-secondary mt-5 rounded-xl"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       {/* Header */}
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
//         <h1 className="text-2xl font-semibold mb-4 md:mb-0 dark:text-white">
//           Create Vacancy
//         </h1>
//         <div className="space-x-2">
//           <button
//             type="button"
//             className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             form="createVacancyForm"
//             className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
//           >
//             Save
//           </button>
//         </div>
//       </div>

//       <form
//         id="createVacancyForm"
//         onSubmit={handleSubmit(onSubmit)}
//         className="grid grid-cols-1 md:grid-cols-2 gap-8"
//       >
//         {/* LEFT COLUMN */}
//         <div className="flex flex-col space-y-6">
//           {/* BASIC INFORMATION */}
//           <motion.div
//             className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-6"
//             variants={cardVariants}
//           >
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-lg font-semibold dark:text-gray-100">
//                 Basic Information
//               </h2>
//               {/* Upload JD */}
//               <label
//                 htmlFor="jobDescriptionFile"
//                 className="flex items-center cursor-pointer text-blue-600 hover:text-blue-800 dark:text-blue-400"
//               >
//                 <MdFileUpload className="mr-1 text-xl" />
//                 Upload JD
//               </label>
//               <input
//                 type="file"
//                 id="jobDescriptionFile"
//                 className="hidden"
//                 {...register("jobDescriptionFile")}
//               />
//             </div>

//             {/* JOB TITLE */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 JOB TITLE
//               </label>
//               <input
//                 type="text"
//                 placeholder="Position name"
//                 {...register("jobTitle", { required: true })}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm 
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               />
//               {errors.jobTitle && (
//                 <p className="text-red-600 text-xs mt-1">
//                   Job title is required.
//                 </p>
//               )}
//             </div>

//             {/* JOB DEPARTMENT */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 JOB DEPARTMENT
//               </label>
//               <select
//                 {...register("jobDepartment", { required: true })}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm 
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               >
//                 <option value="">Choose Category</option>
//                 <option value="Engineering">Engineering</option>
//                 <option value="Marketing">Marketing</option>
//                 <option value="Finance">Finance</option>
//               </select>
//               {errors.jobDepartment && (
//                 <p className="text-red-600 text-xs mt-1">
//                   Department is required.
//                 </p>
//               )}
//             </div>

//             {/* JOB DESCRIPTION */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 JOB DESCRIPTION<span className="text-red-500 ml-1">*</span>
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 For effective candidate selection, enhance the job description
//                 with comprehensive details
//               </p>
//               <textarea
//                 placeholder="Enter job description"
//                 rows={4}
//                 {...register("jobDescription")}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm 
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               />
//             </div>

//             {/* EMPLOYMENT TYPE */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 EMPLOYMENT TYPE
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Pick one or multiple options
//               </p>
//               <div className="flex flex-wrap items-center gap-3">
//                 {["Full Time", "Part Time", "Contract", "Freelance", "Remote"].map(
//                   (type) => (
//                     <label
//                       key={type}
//                       className="inline-flex items-center space-x-1 text-sm"
//                     >
//                       <input
//                         type="checkbox"
//                         value={type}
//                         {...register("employmentType")}
//                         className="form-checkbox h-4 w-4 text-blue-600 
//                                    dark:bg-gray-700 dark:border-gray-600"
//                       />
//                       <span className="dark:text-gray-300">{type}</span>
//                     </label>
//                   )
//                 )}
//               </div>
//             </div>

//             {/* JOB LOCATIONS */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 JOB LOCATIONS
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Choose multiple options if available
//               </p>
//               <input
//                 type="text"
//                 placeholder="Search for Location"
//                 {...register("jobLocations")}
//                 className="w-full rounded border border-gray-300 px-3 py-2 mb-2 text-sm 
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               />
//               {/* Example Tags */}
//               <div className="flex flex-wrap gap-2">
//                 {["New Delhi", "Gurugram", "Noida"].map((city) => (
//                   <span
//                     key={city}
//                     className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm 
//                                dark:bg-blue-900 dark:text-blue-200"
//                   >
//                     {city}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* SALARY */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 SALARY
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Choose how you prefer for this job
//               </p>
//               <div className="flex flex-col md:flex-row md:items-center flex-wrap gap-2">
//                 <select
//                   {...register("currency")}
//                   className="rounded border border-gray-300 px-3 py-2 text-sm 
//                              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100
//                              md:w-auto w-full"
//                 >
//                   <option value="INR">INR</option>
//                   <option value="USD">USD</option>
//                   <option value="EUR">EUR</option>
//                 </select>
//                 <input
//                   type="number"
//                   placeholder="Salary"
//                   {...register("salary")}
//                   className="rounded border border-gray-300 px-3 py-2 text-sm 
//                              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100
//                              md:flex-1 w-full"
//                 />
//                 <select
//                   {...register("payPeriod")}
//                   className="rounded border border-gray-300 px-3 py-2 text-sm 
//                              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100
//                              md:w-auto w-full"
//                 >
//                   <option value="Yearly">Yearly</option>
//                   <option value="Monthly">Monthly</option>
//                 </select>
//               </div>
//             </div>

//             {/* MULTIPLE CANDIDATES */}
//             <div className="mb-2">
//               <label className="flex items-center text-sm dark:text-gray-300">
//                 <input
//                   type="checkbox"
//                   id="multipleCandidates"
//                   {...register("multipleCandidates")}
//                   className="form-checkbox h-4 w-4 text-blue-600
//                              dark:bg-gray-700 dark:border-gray-600 mr-2"
//                 />
//                 Yes, I am hiring multiple candidates
//               </label>
//             </div>
//           </motion.div>

//           {/* DATES AND STATUS */}
//           <motion.div
//             className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-6"
//             variants={cardVariants}
//           >
//             <h2 className="text-lg font-semibold mb-2 dark:text-gray-100">
//               Dates and Status
//             </h2>
//             <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
//               This section provides a snapshot of when the vacancy opened, any
//               closing date (if applicable), and its current status in the hiring
//               process
//             </p>

//             {/* VACANCY STATUS */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 VACANCY STATUS
//               </label>
//               <select
//                 {...register("vacancyStatus")}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               >
//                 <option value="">Choose Status</option>
//                 <option value="Draft">Draft</option>
//                 <option value="Open">Open</option>
//                 <option value="Closed">Closed</option>
//               </select>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {/* OPENING DATE */}
//               <div>
//                 <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                   OPENING DATE
//                 </label>
//                 <input
//                   type="date"
//                   placeholder="dd-mm-yyyy"
//                   {...register("openingDate")}
//                   className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//                 />
//               </div>

//               {/* CLOSING DATE */}
//               <div>
//                 <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                   CLOSING DATE
//                 </label>
//                 <input
//                   type="date"
//                   placeholder="dd-mm-yyyy"
//                   {...register("closingDate")}
//                   className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//                 />
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* RIGHT COLUMN */}
//         <div className="flex flex-col space-y-6">
//           {/* APPLICANT REQUIREMENT */}
//           <motion.div
//             className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-6"
//             variants={cardVariants}
//           >
//             <h2 className="text-lg font-semibold mb-2 dark:text-gray-100">
//               Applicant requirements
//             </h2>

//             {/* WORK EXPERIENCE */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 WORK EXPERIENCE<span className="text-red-500 ml-1">*</span>
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Provide details about experience
//               </p>
//               <select
//                 {...register("workExperience")}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm 
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               >
//                 <option value="no experience required">no experience required</option>
//                 <option value="1-2 years">1-2 years</option>
//                 <option value="3-5 years">3-5 years</option>
//                 <option value="5+ years">5+ years</option>
//               </select>
//             </div>

//             {/* EDUCATION */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 EDUCATION
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Select Education
//               </p>
//               <select
//                 {...register("education")}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm 
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               >
//                 <option value="Higher">Higher</option>
//                 <option value="Graduate">Graduate</option>
//                 <option value="Postgraduate">Postgraduate</option>
//               </select>
//             </div>

//             {/* THE JOB IS SUITABLE FOR */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 THE JOB IS SUITABLE FOR:
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Pick one or multiple options
//               </p>
//               <div className="flex flex-wrap items-center gap-4">
//                 {["Fresher", "Internship", "Freelancer"].map((role) => (
//                   <label
//                     key={role}
//                     className="inline-flex items-center space-x-1 text-sm"
//                   >
//                     <input
//                       type="checkbox"
//                       value={role}
//                       {...register("suitableFor")}
//                       className="form-checkbox h-4 w-4 text-blue-600 
//                                  dark:bg-gray-700 dark:border-gray-600"
//                     />
//                     <span className="dark:text-gray-300">{role}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* RESPONSIBILITIES */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 RESPONSIBILITIES
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Main tasks that the candidate will be accountable for
//               </p>
//               <textarea
//                 rows={3}
//                 placeholder="Performing tasks related to..."
//                 {...register("responsibilities")}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm 
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               />
//             </div>

//             {/* DUTIES */}
//             <div>
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 DUTIES
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Specific tasks and actions that the candidate will be responsible
//                 for on a day-to-day basis
//               </p>
//               <textarea
//                 rows={3}
//                 placeholder="Planning and executing..."
//                 {...register("duties")}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm 
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               />
//             </div>
//           </motion.div>

//           {/* CONTACT INFORMATION */}
//           <motion.div
//             className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-6"
//             variants={cardVariants}
//           >
//             <h2 className="text-lg font-semibold mb-2 dark:text-gray-100">
//               Contact information
//             </h2>

//             {/* CONTACT PERSON */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 CONTACT PERSON
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Person to contact for inquiries
//               </p>
//               <input
//                 type="text"
//                 placeholder="Position name"
//                 {...register("contactPerson")}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm 
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               />
//             </div>

//             {/* CONTACT PHONE */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 CONTACT PHONE
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Phone for inquiries
//               </p>
//               <input
//                 type="text"
//                 placeholder="Phone number"
//                 {...register("contactPhone")}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm 
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               />
//             </div>

//             {/* ADDITIONAL CONTACT */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 ADDITIONAL CONTACT
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Extra contact info if needed
//               </p>
//               <input
//                 type="text"
//                 placeholder="Skype, whatsapp, etc."
//                 {...register("additionalContact")}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm 
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               />
//             </div>

//             {/* SHOW CONTACTS */}
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="showContacts"
//                 {...register("showContacts")}
//                 className="form-checkbox h-4 w-4 text-blue-600 dark:bg-gray-700
//                            dark:border-gray-600 mr-2"
//               />
//               <label
//                 htmlFor="showContacts"
//                 className="text-sm font-medium dark:text-gray-300"
//               >
//                 Show the name and phone number on this job page
//               </label>
//             </div>
//           </motion.div>
//         </div>
//       </form>
//     </motion.div>
//   );
// }

// import React from "react";
// import { useForm } from "react-hook-form";
// import { MdFileUpload } from "react-icons/md";
// import { motion } from "framer-motion";

// // Container slides down from the top with a quick tween
// const containerVariants = {
//   hidden: { opacity: 0, y: -10 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       type: "tween",
//       duration: 0.2,
//       ease: "easeOut",
//       when: "beforeChildren",
//       staggerChildren: 0.05,
//     },
//   },
// };

// const cardVariants = {
//   hidden: { opacity: 0, x: -10 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: {
//       type: "tween",
//       duration: 0.2,
//       ease: "easeOut",
//     },
//   },
// };

// export default function CreateVacancy() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   // Optional state to display success/error messages
//   const [serverMessage, setServerMessage] = React.useState(null);
//   const [serverError, setServerError] = React.useState(null);

//   // Updated onSubmit to use FormData for file & text fields
//   const onSubmit = async (data) => {
//     try {
//       // Create a FormData object to handle file + text
//       const formData = new FormData();

//       // Append text fields
//       formData.append("jobTitle", data.jobTitle);
//       formData.append("jobDepartment", data.jobDepartment);
//       formData.append("jobDescription", data.jobDescription ?? "");

//       // Checkboxes for employmentType
//       // If the user checks multiple boxes (Full Time, Part Time...), 
//       // react-hook-form will give you an array in data.employmentType
//       if (data.employmentType) {
//         data.employmentType.forEach((type) => {
//           formData.append("employmentType", type);
//         });
//       }

//       // For jobLocations, user might type a single string (e.g., "New Delhi")
//       // or multiple comma-separated. We'll just pass the raw string.
//       formData.append("jobLocations", data.jobLocations ?? "");

//       // SALARY FIELDS
//       formData.append("currency", data.currency ?? "");
//       formData.append("salary", data.salary ?? "");
//       formData.append("payPeriod", data.payPeriod ?? "");

//       // Check if hiring multiple candidates
//       formData.append(
//         "multipleCandidates",
//         data.multipleCandidates ? "true" : "false"
//       );

//       // DATES & STATUS
//       formData.append("vacancyStatus", data.vacancyStatus ?? "");
//       formData.append("openingDate", data.openingDate ?? "");
//       formData.append("closingDate", data.closingDate ?? "");

//       // APPLICANT REQUIREMENTS
//       formData.append("workExperience", data.workExperience ?? "");
//       formData.append("education", data.education ?? "");

//       // Another multi-checkbox field
//       if (data.suitableFor) {
//         data.suitableFor.forEach((sf) => {
//           formData.append("suitableFor", sf);
//         });
//       }

//       formData.append("responsibilities", data.responsibilities ?? "");
//       formData.append("duties", data.duties ?? "");

//       // CONTACT INFORMATION
//       formData.append("contactPerson", data.contactPerson ?? "");
//       formData.append("contactPhone", data.contactPhone ?? "");
//       formData.append("additionalContact", data.additionalContact ?? "");
//       formData.append("showContacts", data.showContacts ? "true" : "false");

//       // If a file is selected, append it
//       if (data.jobDescriptionFile && data.jobDescriptionFile.length > 0) {
//         formData.append("jobDescriptionFile", data.jobDescriptionFile[0]);
//       }

//       // Send the request
//       const response = await fetch("/api/jobs", {
//         method: "POST",
//         body: formData,
//       });

//       const result = await response.json();
//       if (response.ok) {
//         setServerError(null);
//         setServerMessage("Job created successfully!");
//         console.log("Success:", result.data);
//       } else {
//         setServerMessage(null);
//         setServerError(result.message || "Something went wrong!");
//         console.error("Error:", result.message);
//       }
//     } catch (error) {
//       setServerMessage(null);
//       setServerError("Error submitting form: " + error.message);
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <motion.div
//       className="w-full mx-auto px-4 py-6 bg-bg-secondary mt-5 rounded-xl"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       {/* Header */}
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
//         <h1 className="text-2xl font-semibold mb-4 md:mb-0 dark:text-white">
//           Create Vacancy
//         </h1>
//         <div className="space-x-2">
//           <button
//             type="button"
//             className="px-4 py-2 rounded border border-gray-300 text-gray-700
//                        hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200
//                        dark:hover:bg-gray-800"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             form="createVacancyForm"
//             className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
//           >
//             Save
//           </button>
//         </div>
//       </div>

//       {/* Server feedback messages */}
//       {serverMessage && (
//         <div className="bg-green-100 text-green-800 p-3 mb-4 rounded">
//           {serverMessage}
//         </div>
//       )}
//       {serverError && (
//         <div className="bg-red-100 text-red-800 p-3 mb-4 rounded">
//           {serverError}
//         </div>
//       )}

//       <form
//         id="createVacancyForm"
//         onSubmit={handleSubmit(onSubmit)}
//         className="grid grid-cols-1 md:grid-cols-2 gap-8"
//       >
//         {/* LEFT COLUMN */}
//         <div className="flex flex-col space-y-6">
//           {/* BASIC INFORMATION */}
//           <motion.div
//             className="bg-white dark:bg-gray-800 border border-gray-200
//                        dark:border-gray-700 rounded p-6"
//             variants={cardVariants}
//           >
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-lg font-semibold dark:text-gray-100">
//                 Basic Information
//               </h2>
//               {/* Upload JD */}
//               <label
//                 htmlFor="jobDescriptionFile"
//                 className="flex items-center cursor-pointer text-blue-600
//                            hover:text-blue-800 dark:text-blue-400"
//               >
//                 <MdFileUpload className="mr-1 text-xl" />
//                 Upload JD
//               </label>
//               <input
//                 type="file"
//                 id="jobDescriptionFile"
//                 className="hidden"
//                 {...register("jobDescriptionFile")}
//               />
//             </div>

//             {/* JOB TITLE */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 JOB TITLE
//               </label>
//               <input
//                 type="text"
//                 placeholder="Position name"
//                 {...register("jobTitle", { required: true })}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               />
//               {errors.jobTitle && (
//                 <p className="text-red-600 text-xs mt-1">
//                   Job title is required.
//                 </p>
//               )}
//             </div>

//             {/* JOB DEPARTMENT */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 JOB DEPARTMENT
//               </label>
//               <select
//                 {...register("jobDepartment", { required: true })}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               >
//                 <option value="">Choose Department</option>
//                 <option value="Engineering">Engineering</option>
//                 <option value="Marketing">Marketing</option>
//                 <option value="Finance">Finance</option>
//               </select>
//               {errors.jobDepartment && (
//                 <p className="text-red-600 text-xs mt-1">
//                   Department is required.
//                 </p>
//               )}
//             </div>

//             {/* JOB DESCRIPTION */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 JOB DESCRIPTION<span className="text-red-500 ml-1">*</span>
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 For effective candidate selection, enhance the job description
//                 with comprehensive details
//               </p>
//               <textarea
//                 placeholder="Enter job description"
//                 rows={4}
//                 {...register("jobDescription")}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               />
//             </div>

//             {/* EMPLOYMENT TYPE (multiple checkboxes) */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 EMPLOYMENT TYPE
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Pick one or multiple options
//               </p>
//               <div className="flex flex-wrap items-center gap-3">
//                 {["Full Time", "Part Time", "Contract", "Freelance", "Remote"].map(
//                   (type) => (
//                     <label
//                       key={type}
//                       className="inline-flex items-center space-x-1 text-sm"
//                     >
//                       <input
//                         type="checkbox"
//                         value={type}
//                         {...register("employmentType")}
//                         className="form-checkbox h-4 w-4 text-blue-600
//                                    dark:bg-gray-700 dark:border-gray-600"
//                       />
//                       <span className="dark:text-gray-300">{type}</span>
//                     </label>
//                   )
//                 )}
//               </div>
//             </div>

//             {/* JOB LOCATIONS */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 JOB LOCATIONS
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Choose multiple options if available (comma-separated or single)
//               </p>
//               <input
//                 type="text"
//                 placeholder="e.g. New Delhi, Gurugram, Noida"
//                 {...register("jobLocations")}
//                 className="w-full rounded border border-gray-300 px-3 py-2 mb-2 text-sm
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               />
//             </div>

//             {/* SALARY */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 SALARY
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Choose how you prefer for this job
//               </p>
//               <div className="flex flex-col md:flex-row md:items-center flex-wrap gap-2">
//                 <select
//                   {...register("currency")}
//                   className="rounded border border-gray-300 px-3 py-2 text-sm
//                              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100
//                              md:w-auto w-full"
//                 >
//                   <option value="INR">INR</option>
//                   <option value="USD">USD</option>
//                   <option value="EUR">EUR</option>
//                 </select>
//                 <input
//                   type="number"
//                   placeholder="Salary"
//                   {...register("salary")}
//                   className="rounded border border-gray-300 px-3 py-2 text-sm
//                              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100
//                              md:flex-1 w-full"
//                 />
//                 <select
//                   {...register("payPeriod")}
//                   className="rounded border border-gray-300 px-3 py-2 text-sm
//                              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100
//                              md:w-auto w-full"
//                 >
//                   <option value="Yearly">Yearly</option>
//                   <option value="Monthly">Monthly</option>
//                 </select>
//               </div>
//             </div>

//             {/* MULTIPLE CANDIDATES */}
//             <div className="mb-2">
//               <label className="flex items-center text-sm dark:text-gray-300">
//                 <input
//                   type="checkbox"
//                   id="multipleCandidates"
//                   {...register("multipleCandidates")}
//                   className="form-checkbox h-4 w-4 text-blue-600
//                              dark:bg-gray-700 dark:border-gray-600 mr-2"
//                 />
//                 Yes, I am hiring multiple candidates
//               </label>
//             </div>
//           </motion.div>

//           {/* DATES AND STATUS */}
//           <motion.div
//             className="bg-white dark:bg-gray-800 border border-gray-200
//                        dark:border-gray-700 rounded p-6"
//             variants={cardVariants}
//           >
//             <h2 className="text-lg font-semibold mb-2 dark:text-gray-100">
//               Dates and Status
//             </h2>
//             <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
//               This section provides a snapshot of when the vacancy opened,
//               any closing date (if applicable), and its current status
//             </p>

//             {/* VACANCY STATUS */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 VACANCY STATUS
//               </label>
//               <select
//                 {...register("vacancyStatus")}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               >
//                 <option value="">Choose Status</option>
//                 <option value="Draft">Draft</option>
//                 <option value="Open">Open</option>
//                 <option value="Closed">Closed</option>
//               </select>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {/* OPENING DATE */}
//               <div>
//                 <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                   OPENING DATE
//                 </label>
//                 <input
//                   type="date"
//                   placeholder="dd-mm-yyyy"
//                   {...register("openingDate")}
//                   className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//                 />
//               </div>

//               {/* CLOSING DATE */}
//               <div>
//                 <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                   CLOSING DATE
//                 </label>
//                 <input
//                   type="date"
//                   placeholder="dd-mm-yyyy"
//                   {...register("closingDate")}
//                   className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//                 />
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* RIGHT COLUMN */}
//         <div className="flex flex-col space-y-6">
//           {/* APPLICANT REQUIREMENT */}
//           <motion.div
//             className="bg-white dark:bg-gray-800 border border-gray-200
//                        dark:border-gray-700 rounded p-6"
//             variants={cardVariants}
//           >
//             <h2 className="text-lg font-semibold mb-2 dark:text-gray-100">
//               Applicant requirements
//             </h2>

//             {/* WORK EXPERIENCE */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 WORK EXPERIENCE<span className="text-red-500 ml-1">*</span>
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Provide details about experience
//               </p>
//               <select
//                 {...register("workExperience")}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               >
//                 <option value="no experience required">
//                   no experience required
//                 </option>
//                 <option value="1-2 years">1-2 years</option>
//                 <option value="3-5 years">3-5 years</option>
//                 <option value="5+ years">5+ years</option>
//               </select>
//             </div>

//             {/* EDUCATION */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 EDUCATION
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Select Education
//               </p>
//               <select
//                 {...register("education")}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               >
//                 <option value="Higher">Higher</option>
//                 <option value="Graduate">Graduate</option>
//                 <option value="Postgraduate">Postgraduate</option>
//               </select>
//             </div>

//             {/* THE JOB IS SUITABLE FOR */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 THE JOB IS SUITABLE FOR:
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Pick one or multiple options
//               </p>
//               <div className="flex flex-wrap items-center gap-4">
//                 {["Fresher", "Internship", "Freelancer"].map((role) => (
//                   <label
//                     key={role}
//                     className="inline-flex items-center space-x-1 text-sm"
//                   >
//                     <input
//                       type="checkbox"
//                       value={role}
//                       {...register("suitableFor")}
//                       className="form-checkbox h-4 w-4 text-blue-600
//                                  dark:bg-gray-700 dark:border-gray-600"
//                     />
//                     <span className="dark:text-gray-300">{role}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* RESPONSIBILITIES */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 RESPONSIBILITIES
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Main tasks that the candidate will be accountable for
//               </p>
//               <textarea
//                 rows={3}
//                 placeholder="Performing tasks related to..."
//                 {...register("responsibilities")}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               />
//             </div>

//             {/* DUTIES */}
//             <div>
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 DUTIES
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Specific tasks and actions that the candidate will be responsible
//                 for on a day-to-day basis
//               </p>
//               <textarea
//                 rows={3}
//                 placeholder="Planning and executing..."
//                 {...register("duties")}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               />
//             </div>
//           </motion.div>

//           {/* CONTACT INFORMATION */}
//           <motion.div
//             className="bg-white dark:bg-gray-800 border border-gray-200
//                        dark:border-gray-700 rounded p-6"
//             variants={cardVariants}
//           >
//             <h2 className="text-lg font-semibold mb-2 dark:text-gray-100">
//               Contact information
//             </h2>

//             {/* CONTACT PERSON */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 CONTACT PERSON
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Person to contact for inquiries
//               </p>
//               <input
//                 type="text"
//                 placeholder="Name of contact person"
//                 {...register("contactPerson")}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               />
//             </div>

//             {/* CONTACT PHONE */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 CONTACT PHONE
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Phone for inquiries
//               </p>
//               <input
//                 type="text"
//                 placeholder="Phone number"
//                 {...register("contactPhone")}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               />
//             </div>

//             {/* ADDITIONAL CONTACT */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 ADDITIONAL CONTACT
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Extra contact info (Skype, WhatsApp, etc.)
//               </p>
//               <input
//                 type="text"
//                 placeholder="Skype, WhatsApp, etc."
//                 {...register("additionalContact")}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               />
//             </div>

//             {/* SHOW CONTACTS */}
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="showContacts"
//                 {...register("showContacts")}
//                 className="form-checkbox h-4 w-4 text-blue-600 dark:bg-gray-700
//                            dark:border-gray-600 mr-2"
//               />
//               <label
//                 htmlFor="showContacts"
//                 className="text-sm font-medium dark:text-gray-300"
//               >
//                 Show the name and phone number on this job page
//               </label>
//             </div>
//           </motion.div>
//         </div>
//       </form>
//     </motion.div>
//   );
// }


// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { MdFileUpload } from 'react-icons/md';
// import { motion } from 'framer-motion';
// import useJobStore from '../../store/useJobStore';  // Zustand store
// import axiosInstance from '../../service/axiosInstance';  // Our custom axios setup

// const containerVariants = {
//   hidden: { opacity: 0, y: -10 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       type: 'tween',
//       duration: 0.2,
//       ease: 'easeOut',
//       when: 'beforeChildren',
//       staggerChildren: 0.05,
//     },
//   },
// };

// const cardVariants = {
//   hidden: { opacity: 0, x: -10 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: {
//       type: 'tween',
//       duration: 0.2,
//       ease: 'easeOut',
//     },
//   },
// };

// export default function CreateVacancy() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   // Zustand store for creating a job
//   const { createJob, loading, error, successMessage } = useJobStore();

//   // Local states for additional feedback
//   const [serverMessage, setServerMessage] = useState(null);
//   const [serverError, setServerError] = useState(null);

//   // State for fetched departments
//   const [departments, setDepartments] = useState([]);
//   const [deptError, setDeptError] = useState(null); // Optional for fetch error

//   // Fetch dynamic department list
//   useEffect(() => {
//     const employeeId = localStorage.getItem('employeeId');
//     const fetchDepartments = async () => {
//       try {
//         // Because we're using axiosInstance, the Authorization header
//         // is automatically attached if you store the token in localStorage
//         const response = await axiosInstance.get(
//           `/superadmin/departmentAlocated/${employeeId}`
//         );

//         // Example response structure:
//         // {
//         //   "success": true,
//         //   "message": "Alocated department fetched successfully",
//         //   "totalCount": 1,
//         //   "departmentAlocated": ["IT"]
//         // }

//         console.log('API Response for departments:', response.data);

//         // If you need to filter out bracketed items (like "[something]")
//         // you can apply your filter logic:
//         const validDepartments = response.data.departmentAlocated.filter(
//           (dept) => !dept.includes('[') && !dept.includes(']')
//         );

//         setDepartments(validDepartments);
//       } catch (err) {
//         console.error('Error fetching departments:', err);
//         setDeptError('Failed to fetch departments.');
//       }
//     };

//     if (employeeId) {
//       fetchDepartments();
//     } else {
//       setDeptError('No employeeId found in localStorage.');
//     }
//   }, []);

//   // Form submission
//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();
//       formData.append('jobTitle', data.jobTitle);
//       formData.append('jobDepartment', data.jobDepartment);
//       formData.append('jobDescription', data.jobDescription ?? '');

//       // Employment Type checkboxes
//       if (data.employmentType) {
//         data.employmentType.forEach((type) => {
//           formData.append('employmentType', type);
//         });
//       }

//       formData.append('jobLocations', data.jobLocations ?? '');
//       formData.append('currency', data.currency ?? '');
//       formData.append('salary', data.salary ?? '');
//       formData.append('payPeriod', data.payPeriod ?? '');
//       formData.append(
//         'multipleCandidates',
//         data.multipleCandidates ? 'true' : 'false'
//       );
//       formData.append('vacancyStatus', data.vacancyStatus ?? '');
//       formData.append('openingDate', data.openingDate ?? '');
//       formData.append('closingDate', data.closingDate ?? '');
//       formData.append('workExperience', data.workExperience ?? '');
//       formData.append('education', data.education ?? '');

//       // Suitable For checkboxes
//       if (data.suitableFor) {
//         data.suitableFor.forEach((sf) => {
//           formData.append('suitableFor', sf);
//         });
//       }

//       formData.append('responsibilities', data.responsibilities ?? '');
//       formData.append('duties', data.duties ?? '');
//       formData.append('contactPerson', data.contactPerson ?? '');
//       formData.append('contactPhone', data.contactPhone ?? '');
//       formData.append('additionalContact', data.additionalContact ?? '');
//       formData.append('showContacts', data.showContacts ? 'true' : 'false');

//       // File upload
//       if (data.jobDescriptionFile && data.jobDescriptionFile.length > 0) {
//         formData.append('jobDescriptionFile', data.jobDescriptionFile[0]);
//       }

//       // Call Zustand store action
//       await createJob(formData);

//       // Local success message
//       setServerMessage('Job created successfully!');
//       setServerError(null);
//     } catch (err) {
//       setServerMessage(null);
//       setServerError(err?.response?.data?.message || 'Something went wrong!');
//     }
//   };

//   return (
//     <motion.div
//       className="w-full mx-auto px-4 py-6 bg-bg-secondary mt-5 rounded-xl"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       {/* Header */}
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
//         <h1 className="text-2xl font-semibold mb-4 md:mb-0 dark:text-white">
//           Create Vacancy
//         </h1>
//         <div className="space-x-2">
//           <button
//             type="button"
//             className="px-4 py-2 rounded border border-gray-300 text-gray-700
//                        hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200
//                        dark:hover:bg-gray-800"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             form="createVacancyForm"
//             className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
//             disabled={loading}
//           >
//             {loading ? 'Saving...' : 'Save'}
//           </button>
//         </div>
//       </div>



//       {/* Department fetch error */}
//       {deptError && (
//         <div className="bg-red-100 text-red-800 p-3 mb-4 rounded">
//           {deptError}
//         </div>
//       )}

//       <form
//         id="createVacancyForm"
//         onSubmit={handleSubmit(onSubmit)}
//         className="grid grid-cols-1 md:grid-cols-2 gap-8"
//       >
//         {/* LEFT COLUMN */}
//         <div className="flex flex-col space-y-6">
//           {/* BASIC INFORMATION */}
//           <motion.div
//             className="bg-white dark:bg-gray-800 border border-gray-200
//                        dark:border-gray-700 rounded p-6"
//             variants={cardVariants}
//           >
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-lg font-semibold dark:text-gray-100">
//                 Basic Information
//               </h2>
//               {/* Upload JD */}
//               <label
//                 htmlFor="jobDescriptionFile"
//                 className="flex items-center cursor-pointer text-blue-600
//                            hover:text-blue-800 dark:text-blue-400"
//               >
//                 <MdFileUpload className="mr-1 text-xl" />
//                 Upload JD
//               </label>
//               <input
//                 type="file"
//                 id="jobDescriptionFile"
//                 className="hidden"
//                 {...register('jobDescriptionFile')}
//               />
//             </div>

//             {/* JOB TITLE */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 JOB TITLE
//               </label>
//               <input
//                 type="text"
//                 placeholder="Position name"
//                 {...register('jobTitle', { required: true })}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               />
//               {errors.jobTitle && (
//                 <p className="text-red-600 text-xs mt-1">
//                   Job title is required.
//                 </p>
//               )}
//             </div>

//             {/* JOB DEPARTMENT (Dynamic) */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 JOB DEPARTMENT
//               </label>
//               <select
//                 {...register('jobDepartment', { required: true })}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//                 disabled={!departments.length} // optionally disable if no departments
//               >
//                 <option value="">Choose Department</option>
//                 {/* Render dynamic departments */}
//                 {departments.map((dept) => (
//                   <option key={dept} value={dept}>
//                     {dept}
//                   </option>
//                 ))}
//               </select>
//               {errors.jobDepartment && (
//                 <p className="text-red-600 text-xs mt-1">
//                   Department is required.
//                 </p>
//               )}
//             </div>

//             {/* JOB DESCRIPTION */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 JOB DESCRIPTION<span className="text-red-500 ml-1">*</span>
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 For effective candidate selection, add comprehensive details
//               </p>
//               <textarea
//                 placeholder="Enter job description"
//                 rows={4}
//                 {...register('jobDescription')}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               />
//             </div>

//             {/* EMPLOYMENT TYPE (multiple checkboxes) */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 EMPLOYMENT TYPE
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Pick one or multiple options
//               </p>
//               <div className="flex flex-wrap items-center gap-3">
//                 {[
//                   'Full Time',
//                   'Part Time',
//                   'Contract',
//                   'Freelance',
//                   'Remote',
//                 ].map((type) => (
//                   <label
//                     key={type}
//                     className="inline-flex items-center space-x-1 text-sm"
//                   >
//                     <input
//                       type="checkbox"
//                       value={type}
//                       {...register('employmentType')}
//                       className="form-checkbox h-4 w-4 text-blue-600
//                                  dark:bg-gray-700 dark:border-gray-600"
//                     />
//                     <span className="dark:text-gray-300">{type}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* JOB LOCATIONS */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 JOB LOCATIONS
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Choose multiple (comma-separated) or a single location
//               </p>
//               <input
//                 type="text"
//                 placeholder="e.g. New Delhi, Gurugram, Noida"
//                 {...register('jobLocations')}
//                 className="w-full rounded border border-gray-300 px-3 py-2 mb-2 text-sm
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               />
//             </div>

//             {/* SALARY */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 SALARY
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Choose how you prefer for this job
//               </p>
//               <div className="flex flex-col md:flex-row md:items-center flex-wrap gap-2">
//                 <select
//                   {...register('currency')}
//                   className="rounded border border-gray-300 px-3 py-2 text-sm
//                              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100
//                              md:w-auto w-full"
//                 >
//                   <option value="INR">INR</option>
//                   <option value="USD">USD</option>
//                   <option value="EUR">EUR</option>
//                 </select>
//                 <input
//                   type="number"
//                   placeholder="Salary"
//                   {...register('salary')}
//                   className="rounded border border-gray-300 px-3 py-2 text-sm
//                              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100
//                              md:flex-1 w-full"
//                 />
//                 <select
//                   {...register('payPeriod')}
//                   className="rounded border border-gray-300 px-3 py-2 text-sm
//                              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100
//                              md:w-auto w-full"
//                 >
//                   <option value="Yearly">Yearly</option>
//                   <option value="Monthly">Monthly</option>
//                 </select>
//               </div>
//             </div>

//             {/* MULTIPLE CANDIDATES */}
//             <div className="mb-2">
//               <label className="flex items-center text-sm dark:text-gray-300">
//                 <input
//                   type="checkbox"
//                   id="multipleCandidates"
//                   {...register('multipleCandidates')}
//                   className="form-checkbox h-4 w-4 text-blue-600
//                              dark:bg-gray-700 dark:border-gray-600 mr-2"
//                 />
//                 Yes, I am hiring multiple candidates
//               </label>
//             </div>
//           </motion.div>

//           {/* DATES AND STATUS */}
//           <motion.div
//             className="bg-white dark:bg-gray-800 border border-gray-200
//                        dark:border-gray-700 rounded p-6"
//             variants={cardVariants}
//           >
//             <h2 className="text-lg font-semibold mb-2 dark:text-gray-100">
//               Dates and Status
//             </h2>
//             <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
//               This section provides a snapshot of when the vacancy opened,
//               any closing date (if applicable), and its current status
//             </p>

//             {/* VACANCY STATUS */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 VACANCY STATUS
//               </label>
//               <select
//                 {...register('vacancyStatus')}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               >
//                 <option value="">Choose Status</option>
//                 <option value="Draft">Draft</option>
//                 <option value="Open">Open</option>
//                 <option value="Closed">Closed</option>
//               </select>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {/* OPENING DATE */}
//               <div>
//                 <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                   OPENING DATE
//                 </label>
//                 <input
//                   type="date"
//                   placeholder="dd-mm-yyyy"
//                   {...register('openingDate')}
//                   className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//                 />
//               </div>

//               {/* CLOSING DATE */}
//               <div>
//                 <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                   CLOSING DATE
//                 </label>
//                 <input
//                   type="date"
//                   placeholder="dd-mm-yyyy"
//                   {...register('closingDate')}
//                   className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//                 />
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* RIGHT COLUMN */}
//         <div className="flex flex-col space-y-6">
//           {/* APPLICANT REQUIREMENT */}
//           <motion.div
//             className="bg-white dark:bg-gray-800 border border-gray-200
//                        dark:border-gray-700 rounded p-6"
//             variants={cardVariants}
//           >
//             <h2 className="text-lg font-semibold mb-2 dark:text-gray-100">
//               Applicant requirements
//             </h2>

//             {/* WORK EXPERIENCE */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 WORK EXPERIENCE<span className="text-red-500 ml-1">*</span>
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Provide details about experience
//               </p>
//               <select
//                 {...register('workExperience')}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               >
//                 <option value="no experience required">
//                   no experience required
//                 </option>
//                 <option value="1-2 years">1-2 years</option>
//                 <option value="3-5 years">3-5 years</option>
//                 <option value="5+ years">5+ years</option>
//               </select>
//             </div>

//             {/* EDUCATION */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 EDUCATION
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Select Education
//               </p>
//               <select
//                 {...register('education')}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               >
//                 <option value="Higher">Higher</option>
//                 <option value="Graduate">Graduate</option>
//                 <option value="Postgraduate">Postgraduate</option>
//               </select>
//             </div>

//             {/* THE JOB IS SUITABLE FOR */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 THE JOB IS SUITABLE FOR:
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Pick one or multiple options
//               </p>
//               <div className="flex flex-wrap items-center gap-4">
//                 {['Fresher', 'Internship', 'Freelancer'].map((role) => (
//                   <label
//                     key={role}
//                     className="inline-flex items-center space-x-1 text-sm"
//                   >
//                     <input
//                       type="checkbox"
//                       value={role}
//                       {...register('suitableFor')}
//                       className="form-checkbox h-4 w-4 text-blue-600
//                                  dark:bg-gray-700 dark:border-gray-600"
//                     />
//                     <span className="dark:text-gray-300">{role}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* RESPONSIBILITIES */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 RESPONSIBILITIES
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Main tasks that the candidate will be accountable for
//               </p>
//               <textarea
//                 rows={3}
//                 placeholder="Performing tasks related to..."
//                 {...register('responsibilities')}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               />
//             </div>

//             {/* DUTIES */}
//             <div>
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 DUTIES
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Specific tasks and actions on a day-to-day basis
//               </p>
//               <textarea
//                 rows={3}
//                 placeholder="Planning and executing..."
//                 {...register('duties')}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               />
//             </div>
//           </motion.div>

//           {/* CONTACT INFORMATION */}
//           <motion.div
//             className="bg-white dark:bg-gray-800 border border-gray-200
//                        dark:border-gray-700 rounded p-6"
//             variants={cardVariants}
//           >
//             <h2 className="text-lg font-semibold mb-2 dark:text-gray-100">
//               Contact information
//             </h2>

//             {/* CONTACT PERSON */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 CONTACT PERSON
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Person to contact for inquiries
//               </p>
//               <input
//                 type="text"
//                 placeholder="Name of contact person"
//                 {...register('contactPerson')}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               />
//             </div>

//             {/* CONTACT PHONE */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 CONTACT PHONE
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Phone for inquiries
//               </p>
//               <input
//                 type="text"
//                 placeholder="Phone number"
//                 {...register('contactPhone')}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               />
//             </div>

//             {/* ADDITIONAL CONTACT */}
//             <div className="mb-4">
//               <label className="text-sm font-medium block mb-1 dark:text-gray-300">
//                 ADDITIONAL CONTACT
//               </label>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 Extra contact info (Skype, WhatsApp, etc.)
//               </p>
//               <input
//                 type="text"
//                 placeholder="Skype, WhatsApp, etc."
//                 {...register('additionalContact')}
//                 className="w-full rounded border border-gray-300 px-3 py-2 text-sm
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               />
//             </div>

//             {/* SHOW CONTACTS */}
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="showContacts"
//                 {...register('showContacts')}
//                 className="form-checkbox h-4 w-4 text-blue-600 dark:bg-gray-700
//                            dark:border-gray-600 mr-2"
//               />
//               <label
//                 htmlFor="showContacts"
//                 className="text-sm font-medium dark:text-gray-300"
//               >
//                 Show the name and phone number on this job page
//               </label>
//             </div>
//           </motion.div>
//         </div>
//       </form>
//     </motion.div>
//   );
// }

// src/components/CreateVacancy.jsx
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdFileUpload } from 'react-icons/md';
import { motion } from 'framer-motion';
import useJobStore from '../../store/useJobStore';  // Zustand store
import axiosInstance from '../../service/axiosInstance';  // Our custom axios setup

// ===== Hot Toast imports =====
import {  toast } from 'react-hot-toast';

// ===== Loader component =====
import FullScreenLoader from '../common/FullScreenLoader';

const containerVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      duration: 0.2,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'tween',
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

export default function CreateVacancy() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Zustand store for creating a job
  const { createJob, loading, error, successMessage } = useJobStore();

  // State for fetched departments
  const [departments, setDepartments] = useState([]);
  const [deptError, setDeptError] = useState(null); // Optional for fetch error

  // Fetch dynamic department list
  useEffect(() => {
    const employeeId = localStorage.getItem('employeeId');
    const fetchDepartments = async () => {
      try {
        const response = await axiosInstance.get(
          `/superadmin/departmentAlocated/${employeeId}`
        );
        console.log('API Response for departments:', response.data);

        // Filter out bracketed items if needed
        const validDepartments = response.data.departmentAlocated.filter(
          (dept) => !dept.includes('[') && !dept.includes(']')
        );

        setDepartments(validDepartments);
      } catch (err) {
        console.error('Error fetching departments:', err);
        setDeptError('Failed to fetch departments.');
      }
    };

    if (employeeId) {
      fetchDepartments();
    } else {
      setDeptError('No employeeId found in localStorage.');
    }
  }, []);

  // Trigger toasts on error or success
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

  // Form submission
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('jobTitle', data.jobTitle);
      formData.append('jobDepartment', data.jobDepartment);
      formData.append('jobDescription', data.jobDescription ?? '');

      // Employment Type checkboxes
      if (data.employmentType) {
        data.employmentType.forEach((type) => {
          formData.append('employmentType', type);
        });
      }

      formData.append('jobLocations', data.jobLocations ?? '');
      formData.append('currency', data.currency ?? '');
      formData.append('salary', data.salary ?? '');
      formData.append('payPeriod', data.payPeriod ?? '');
      formData.append(
        'multipleCandidates',
        data.multipleCandidates ? 'true' : 'false'
      );
      formData.append('vacancyStatus', data.vacancyStatus ?? '');
      formData.append('openingDate', data.openingDate ?? '');
      formData.append('closingDate', data.closingDate ?? '');
      formData.append('workExperience', data.workExperience ?? '');
      formData.append('education', data.education ?? '');

      // Suitable For checkboxes
      if (data.suitableFor) {
        data.suitableFor.forEach((sf) => {
          formData.append('suitableFor', sf);
        });
      }

      formData.append('responsibilities', data.responsibilities ?? '');
      formData.append('duties', data.duties ?? '');
      formData.append('contactPerson', data.contactPerson ?? '');
      formData.append('contactPhone', data.contactPhone ?? '');
      formData.append('additionalContact', data.additionalContact ?? '');
      formData.append('showContacts', data.showContacts ? 'true' : 'false');

      // File upload
      if (data.jobDescriptionFile && data.jobDescriptionFile.length > 0) {
        formData.append('jobDescriptionFile', data.jobDescriptionFile[0]);
      }

      // Call Zustand store action
      await createJob(formData);

      // If needed, you can do more here on success (e.g. reset form)
      // ...
    } catch (err) {
      // If needed, additional local handling on error
      console.error(err);
    }
  };

  return (
    <>
      {/* React Hot Toast container (can be placed anywhere, top-level is typical) */}
     

      {/* Show loader if loading */}
      {loading && <FullScreenLoader />}

      <motion.div
        className="w-full mx-auto px-4 py-6 bg-bg-secondary mt-5 rounded-xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold mb-4 md:mb-0 dark:text-white">
            Create Vacancy
          </h1>
          <div className="space-x-2">
            <button
              type="button"
              className="px-4 py-2 rounded border border-gray-300 text-gray-700
                       hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200
                       dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="createVacancyForm"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        {/* Department fetch error */}
        {deptError && (
          <div className="bg-red-100 text-red-800 p-3 mb-4 rounded">
            {deptError}
          </div>
        )}

        <form
          id="createVacancyForm"
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* LEFT COLUMN */}
          <div className="flex flex-col space-y-6">
            {/* BASIC INFORMATION */}
            <motion.div
              className="bg-white dark:bg-gray-800 border border-gray-200
                         dark:border-gray-700 rounded p-6"
              variants={cardVariants}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold dark:text-gray-100">
                  Basic Information
                </h2>
                {/* Upload JD */}
                <label
                  htmlFor="jobDescriptionFile"
                  className="flex items-center cursor-pointer text-blue-600
                             hover:text-blue-800 dark:text-blue-400"
                >
                  <MdFileUpload className="mr-1 text-xl" />
                  Upload JD
                </label>
                <input
                  type="file"
                  id="jobDescriptionFile"
                  className="hidden"
                  {...register('jobDescriptionFile')}
                />
              </div>

              {/* JOB TITLE */}
              <div className="mb-4">
                <label className="text-sm font-medium block mb-1 dark:text-gray-300">
                  JOB TITLE
                </label>
                <input
                  type="text"
                  placeholder="Position name"
                  {...register('jobTitle', { required: true })}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                             dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
                {errors.jobTitle && (
                  <p className="text-red-600 text-xs mt-1">
                    Job title is required.
                  </p>
                )}
              </div>

              {/* JOB DEPARTMENT (Dynamic) */}
              <div className="mb-4">
                <label className="text-sm font-medium block mb-1 dark:text-gray-300">
                  JOB DEPARTMENT
                </label>
                <select
                  {...register('jobDepartment', { required: true })}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                             dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  disabled={!departments.length} // optionally disable if no departments
                >
                  <option value="">Choose Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                {errors.jobDepartment && (
                  <p className="text-red-600 text-xs mt-1">
                    Department is required.
                  </p>
                )}
              </div>

              {/* JOB DESCRIPTION */}
              <div className="mb-4">
                <label className="text-sm font-medium block mb-1 dark:text-gray-300">
                  JOB DESCRIPTION<span className="text-red-500 ml-1">*</span>
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  For effective candidate selection, add comprehensive details
                </p>
                <textarea
                  placeholder="Enter job description"
                  rows={4}
                  {...register('jobDescription')}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                             dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>

              {/* EMPLOYMENT TYPE (multiple checkboxes) */}
              <div className="mb-4">
                <label className="text-sm font-medium block mb-1 dark:text-gray-300">
                  EMPLOYMENT TYPE
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Pick one or multiple options
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  {['Full Time', 'Part Time', 'Contract', 'Freelance', 'Remote'].map(
                    (type) => (
                      <label
                        key={type}
                        className="inline-flex items-center space-x-1 text-sm"
                      >
                        <input
                          type="checkbox"
                          value={type}
                          {...register('employmentType')}
                          className="form-checkbox h-4 w-4 text-blue-600
                                     dark:bg-gray-700 dark:border-gray-600"
                        />
                        <span className="dark:text-gray-300">{type}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* JOB LOCATIONS */}
              <div className="mb-4">
                <label className="text-sm font-medium block mb-1 dark:text-gray-300">
                  JOB LOCATIONS
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Choose multiple (comma-separated) or a single location
                </p>
                <input
                  type="text"
                  placeholder="e.g. New Delhi, Gurugram, Noida"
                  {...register('jobLocations')}
                  className="w-full rounded border border-gray-300 px-3 py-2 mb-2 text-sm
                             dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>

              {/* SALARY */}
              <div className="mb-4">
                <label className="text-sm font-medium block mb-1 dark:text-gray-300">
                  SALARY
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Choose how you prefer for this job
                </p>
                <div className="flex flex-col md:flex-row md:items-center flex-wrap gap-2">
                  <select
                    {...register('currency')}
                    className="rounded border border-gray-300 px-3 py-2 text-sm
                               dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100
                               md:w-auto w-full"
                  >
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Salary"
                    {...register('salary')}
                    className="rounded border border-gray-300 px-3 py-2 text-sm
                               dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100
                               md:flex-1 w-full"
                  />
                  <select
                    {...register('payPeriod')}
                    className="rounded border border-gray-300 px-3 py-2 text-sm
                               dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100
                               md:w-auto w-full"
                  >
                    <option value="Yearly">Yearly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
              </div>

              {/* MULTIPLE CANDIDATES */}
              <div className="mb-2">
                <label className="flex items-center text-sm dark:text-gray-300">
                  <input
                    type="checkbox"
                    id="multipleCandidates"
                    {...register('multipleCandidates')}
                    className="form-checkbox h-4 w-4 text-blue-600
                               dark:bg-gray-700 dark:border-gray-600 mr-2"
                  />
                  Yes, I am hiring multiple candidates
                </label>
              </div>
            </motion.div>

            {/* DATES AND STATUS */}
            <motion.div
              className="bg-white dark:bg-gray-800 border border-gray-200
                         dark:border-gray-700 rounded p-6"
              variants={cardVariants}
            >
              <h2 className="text-lg font-semibold mb-2 dark:text-gray-100">
                Dates and Status
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                This section provides a snapshot of when the vacancy opened,
                any closing date (if applicable), and its current status
              </p>

              {/* VACANCY STATUS */}
              <div className="mb-4">
                <label className="text-sm font-medium block mb-1 dark:text-gray-300">
                  VACANCY STATUS
                </label>
                <select
                  {...register('vacancyStatus')}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                             dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                >
                  <option value="">Choose Status</option>
                  <option value="Draft">Draft</option>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* OPENING DATE */}
                <div>
                  <label className="text-sm font-medium block mb-1 dark:text-gray-300">
                    OPENING DATE
                  </label>
                  <input
                    type="date"
                    placeholder="dd-mm-yyyy"
                    {...register('openingDate')}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                               dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  />
                </div>

                {/* CLOSING DATE */}
                <div>
                  <label className="text-sm font-medium block mb-1 dark:text-gray-300">
                    CLOSING DATE
                  </label>
                  <input
                    type="date"
                    placeholder="dd-mm-yyyy"
                    {...register('closingDate')}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                               dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col space-y-6">
            {/* APPLICANT REQUIREMENT */}
            <motion.div
              className="bg-white dark:bg-gray-800 border border-gray-200
                         dark:border-gray-700 rounded p-6"
              variants={cardVariants}
            >
              <h2 className="text-lg font-semibold mb-2 dark:text-gray-100">
                Applicant requirements
              </h2>

              {/* WORK EXPERIENCE */}
              <div className="mb-4">
                <label className="text-sm font-medium block mb-1 dark:text-gray-300">
                  WORK EXPERIENCE<span className="text-red-500 ml-1">*</span>
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Provide details about experience
                </p>
                <select
                  {...register('workExperience')}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                             dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                >
                  <option value="no experience required">no experience required</option>
                  <option value="1-2 years">1-2 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>

              {/* EDUCATION */}
              <div className="mb-4">
                <label className="text-sm font-medium block mb-1 dark:text-gray-300">
                  EDUCATION
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Select Education
                </p>
                <select
                  {...register('education')}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                             dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                >
                  <option value="Higher">Higher</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
              </div>

              {/* THE JOB IS SUITABLE FOR */}
              <div className="mb-4">
                <label className="text-sm font-medium block mb-1 dark:text-gray-300">
                  THE JOB IS SUITABLE FOR:
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Pick one or multiple options
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  {['Fresher', 'Internship', 'Freelancer'].map((role) => (
                    <label
                      key={role}
                      className="inline-flex items-center space-x-1 text-sm"
                    >
                      <input
                        type="checkbox"
                        value={role}
                        {...register('suitableFor')}
                        className="form-checkbox h-4 w-4 text-blue-600
                                   dark:bg-gray-700 dark:border-gray-600"
                      />
                      <span className="dark:text-gray-300">{role}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* RESPONSIBILITIES */}
              <div className="mb-4">
                <label className="text-sm font-medium block mb-1 dark:text-gray-300">
                  RESPONSIBILITIES
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Main tasks that the candidate will be accountable for
                </p>
                <textarea
                  rows={3}
                  placeholder="Performing tasks related to..."
                  {...register('responsibilities')}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                             dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>

              {/* DUTIES */}
              <div>
                <label className="text-sm font-medium block mb-1 dark:text-gray-300">
                  DUTIES
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Specific tasks and actions on a day-to-day basis
                </p>
                <textarea
                  rows={3}
                  placeholder="Planning and executing..."
                  {...register('duties')}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                             dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
            </motion.div>

            {/* CONTACT INFORMATION */}
            <motion.div
              className="bg-white dark:bg-gray-800 border border-gray-200
                         dark:border-gray-700 rounded p-6"
              variants={cardVariants}
            >
              <h2 className="text-lg font-semibold mb-2 dark:text-gray-100">
                Contact information
              </h2>

              {/* CONTACT PERSON */}
              <div className="mb-4">
                <label className="text-sm font-medium block mb-1 dark:text-gray-300">
                  CONTACT PERSON
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Person to contact for inquiries
                </p>
                <input
                  type="text"
                  placeholder="Name of contact person"
                  {...register('contactPerson')}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                             dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>

              {/* CONTACT PHONE */}
              <div className="mb-4">
                <label className="text-sm font-medium block mb-1 dark:text-gray-300">
                  CONTACT PHONE
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Phone for inquiries
                </p>
                <input
                  type="text"
                  placeholder="Phone number"
                  {...register('contactPhone')}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                             dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>

              {/* ADDITIONAL CONTACT */}
              <div className="mb-4">
                <label className="text-sm font-medium block mb-1 dark:text-gray-300">
                  ADDITIONAL CONTACT
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Extra contact info (Skype, WhatsApp, etc.)
                </p>
                <input
                  type="text"
                  placeholder="Skype, WhatsApp, etc."
                  {...register('additionalContact')}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                             dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>

              {/* SHOW CONTACTS */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showContacts"
                  {...register('showContacts')}
                  className="form-checkbox h-4 w-4 text-blue-600 dark:bg-gray-700
                             dark:border-gray-600 mr-2"
                />
                <label
                  htmlFor="showContacts"
                  className="text-sm font-medium dark:text-gray-300"
                >
                  Show the name and phone number on this job page
                </label>
              </div>
            </motion.div>
          </div>
        </form>
      </motion.div>
    </>
  );
}

