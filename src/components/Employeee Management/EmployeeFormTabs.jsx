// import React, { useState, useEffect, useCallback } from "react";
// import { useForm, Controller, useFieldArray } from "react-hook-form";
// import { AnimatePresence, motion, useAnimate } from "framer-motion";
// import { FaCloudUploadAlt } from "react-icons/fa";

// /**
//  * Main reusable form component for both Add and Update Employee.
//  * Three tabs: Employee Details, Qualifications & Experience, Personal Details
//  */
// export default function EmployeeFormTabs({
//   formTitle = "Employee Form",
//   defaultValues = {},
//   onComplete = () => {}
// }) {
//   const [activeTab, setActiveTab] = useState(0);

//   return (
//     <div className="employee-form bg-bg-primary text-text-primary py-2">
//       <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="bg-bg-secondary dark:text-gray-100 rounded-md shadow p-6">
//           <h1 className="text-2xl font-bold text-center mb-6">{formTitle}</h1>

//           {/* Tabs Header */}
//           <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
//             <TabButton
//               label="Employee Details"
//               isActive={activeTab === 0}
//               onClick={() => setActiveTab(0)}
//             />
//             <TabButton
//               label="Qualifications & Experience"
//               isActive={activeTab === 1}
//               onClick={() => setActiveTab(1)}
//             />
//             <TabButton
//               label="Personal Details"
//               isActive={activeTab === 2}
//               onClick={() => setActiveTab(2)}
//             />
//           </div>

//           {/* Tabs Content (wrapped by AnimatePresence) */}
//           <div className="mt-4">
//             <AnimatePresence mode="wait">
//               {activeTab === 0 && (
//                 <motion.div
//                   key="tab-employee"
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                   transition={{ duration: 0.4, ease: "easeOut" }}
//                 >
//                   <EmployeeDetails
//                     goNext={() => setActiveTab(1)}
//                     defaultValues={defaultValues}
//                   />
//                 </motion.div>
//               )}

//               {activeTab === 1 && (
//                 <motion.div
//                   key="tab-qualifications"
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                   transition={{ duration: 0.4, ease: "easeOut" }}
//                 >
//                   <QualificationsExperience
//                     goNext={() => setActiveTab(2)}
//                     defaultValues={defaultValues}
//                   />
//                 </motion.div>
//               )}

//               {activeTab === 2 && (
//                 <motion.div
//                   key="tab-personal"
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                   transition={{ duration: 0.4, ease: "easeOut" }}
//                 >
//                   <PersonalDetails
//                     defaultValues={defaultValues}
//                     onComplete={onComplete}
//                   />
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /** Reusable tab button for the header */
// function TabButton({ label, isActive, onClick }) {
//   return (
//     <button
//       className={`px-4 py-2 text-sm font-medium
//         ${
//           isActive
//             ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
//             : "text-gray-600 dark:text-gray-300 hover:text-blue-600"
//         }
//       `}
//       onClick={onClick}
//     >
//       {label}
//     </button>
//   );
// }

// /** TAB 1: Employee Details */
// function EmployeeDetails({ goNext, defaultValues }) {
//   const [scope, animate] = useAnimate();
//   const [profilePreview, setProfilePreview] = useState(null);

//   // Use form with initial data
//   const { control, handleSubmit } = useForm({
//     defaultValues: {
//       firstName: defaultValues.firstName || "",
//       lastName: defaultValues.lastName || "",
//       phone: defaultValues.phone || "",
//       gender: defaultValues.gender || "",
//       personalEmail: defaultValues.personalEmail || "",
//       dob: defaultValues.dob || "",
//       permanentAddress: defaultValues.permanentAddress || "",
//       workEmail: defaultValues.workEmail || "",
//       doj: defaultValues.doj || "",
//       department: defaultValues.department || "",
//       role: defaultValues.role || "",
//       assignManager: defaultValues.assignManager || "",
//       designation: defaultValues.designation || "",
//       employeeId: defaultValues.employeeId || "",
//       employeeLocation: defaultValues.employeeLocation || "",
//       officeLocation: defaultValues.officeLocation || "",
//       latitude: defaultValues.latitude || "",
//       longitude: defaultValues.longitude || "",
//       shiftTiming: defaultValues.shiftTiming || "",
//       salary: defaultValues.salary || "",
//       otp: defaultValues.otp || "",
//       permissions: defaultValues.permissions || ""
//     }
//   });

//   useEffect(() => {
//     // Animate the inputs in a stagger sequence
//     animate([
//       [".animatable-input", { opacity: 0, x: 20 }, { duration: 0 }],
//       [".animatable-input", { opacity: 1, x: 0 }, { duration: 0.3, stagger: 0.05 }]
//     ]);
//   }, [animate]);

//   const onSubmit = (data) => {
//     console.log("Employee Details:", data);
//     // You can store or pass data around here if needed
//     goNext();
//   };

//   const handleProfileImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfilePreview(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <form ref={scope} onSubmit={handleSubmit(onSubmit)}>
//       {/* Top section: Profile Image + (First & Last Name, Phone & Gender) */}
//       <div className="grid grid-cols-12 gap-6">
//         {/* Profile Image */}
//         <div className="col-span-12 md:col-span-3 flex flex-col items-center">
//           <label className="block font-medium mb-2">Profile Image</label>
//           <div
//             className="w-32 h-32 rounded-full border relative cursor-pointer mb-2"
//             onClick={() => document.getElementById("profileImageInput")?.click()}
//           >
//             {profilePreview ? (
//               <img
//                 src={profilePreview}
//                 alt="Profile"
//                 className="object-cover w-full h-full rounded-full"
//               />
//             ) : (
//               <span
//                 className="text-gray-400 text-sm absolute top-1/2 left-1/2
//                 transform -translate-x-1/2 -translate-y-1/2"
//               >
//                 No Image
//               </span>
//             )}
//           </div>
//           <input
//             type="file"
//             id="profileImageInput"
//             accept="image/*"
//             onChange={handleProfileImageChange}
//             style={{ display: "none" }}
//           />
//         </div>

//         {/* Name, Phone, Gender */}
//         <div className="col-span-12 md:col-span-9">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//             <FormField label="First Name" name="firstName" control={control} placeholder="Enter Full Name" />
//             <FormField label="Last Name" name="lastName" control={control} placeholder="Enter Last address" />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <FormField label="Phone" name="phone" control={control} placeholder="Enter phone number" />
//             <FormSelect
//               label="Gender"
//               name="gender"
//               control={control}
//               options={[
//                 { value: "", label: "Select" },
//                 { value: "Male", label: "Male" },
//                 { value: "Female", label: "Female" },
//                 { value: "Other", label: "Other" }
//               ]}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Personal Email, DOB, Address */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormField
//           label="Personal Email ID"
//           name="personalEmail"
//           control={control}
//           placeholder="test@gmail.com"
//           type="email"
//         />
//         <FormField label="DOB" name="dob" control={control} type="date" />
//         <FormTextArea label="Permanent Address" name="permanentAddress" control={control} placeholder="Write Address..." />
//       </div>

//       {/* Work Email, DOJ, Department */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormField
//           label="Work Email ID"
//           name="workEmail"
//           control={control}
//           placeholder="test@gmail.com"
//           type="email"
//         />
//         <FormField label="DOJ" name="doj" control={control} type="date" />
//         <FormSelect
//           label="Department"
//           name="department"
//           control={control}
//           options={[
//             { value: "", label: "Select" },
//             { value: "HR", label: "HR" },
//             { value: "IT", label: "IT" },
//             { value: "Finance", label: "Finance" }
//           ]}
//         />
//       </div>

//       {/* Role, Assign Manager, Designation */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormField label="Role" name="role" control={control} placeholder="Enter Role" />
//         <FormSelect
//           label="Assign Manager"
//           name="assignManager"
//           control={control}
//           options={[
//             { value: "", label: "Select" },
//             { value: "Manager1", label: "Manager 1" },
//             { value: "Manager2", label: "Manager 2" }
//           ]}
//         />
//         <FormSelect
//           label="Designation"
//           name="designation"
//           control={control}
//           options={[
//             { value: "", label: "Select" },
//             { value: "Junior", label: "Junior" },
//             { value: "Senior", label: "Senior" }
//           ]}
//         />
//       </div>

//       {/* Employee ID, Employee Location, Office Location */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormField label="Employee ID" name="employeeId" control={control} placeholder="R10004" />
//         <FormSelect
//           label="Employee Location"
//           name="employeeLocation"
//           control={control}
//           options={[
//             { value: "", label: "Select" },
//             { value: "Location A", label: "Location A" },
//             { value: "Location B", label: "Location B" }
//           ]}
//         />
//         <FormSelect
//           label="Office Location"
//           name="officeLocation"
//           control={control}
//           options={[
//             { value: "", label: "Select" },
//             { value: "Location X", label: "Location X" },
//             { value: "Location Y", label: "Location Y" }
//           ]}
//         />
//       </div>

//       {/* Latitude, Longitude, Shift Timing */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormField label="Latitude" name="latitude" control={control} placeholder="Latitude" />
//         <FormField label="Longitude" name="longitude" control={control} placeholder="Longitude" />
//         <FormSelect
//           label="Shift Timing"
//           name="shiftTiming"
//           control={control}
//           options={[
//             { value: "", label: "Select" },
//             { value: "Day Shift", label: "Day Shift" },
//             { value: "Night Shift", label: "Night Shift" }
//           ]}
//         />
//       </div>

//       {/* Salary, OTP */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         <FormField label="Salary" name="salary" control={control} placeholder="3LPA" />
//         <FormField label="OTP" name="otp" control={control} placeholder="OTP" />
//       </div>

//       {/* Permissions */}
//       <div className="mt-6">
//         <FormTextArea label="Permissions" name="permissions" control={control} placeholder="No Permission Selected" />
//       </div>

//       {/* Buttons */}
//       <div className="flex items-center space-x-3 mt-6">
//         <button type="button" className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-gray-100 rounded">
//           Cancel
//         </button>
//         <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//           Next
//         </button>
//       </div>
//     </form>
//   );
// }

// /** TAB 2: Qualifications & Experience */
// function QualificationsExperience({ goNext, defaultValues }) {
//   const [scope, animate] = useAnimate();

//   useEffect(() => {
//     animate([
//       [".animatable-input", { opacity: 0, x: 20 }, { duration: 0 }],
//       [".animatable-input", { opacity: 1, x: 0 }, { duration: 0.3, stagger: 0.05 }]
//     ]);
//   }, [animate]);

//   const { control, handleSubmit } = useForm({
//     defaultValues: {
//       qualifications: defaultValues.qualifications || [
//         {
//           qualificationName: "",
//           universityBoard: "",
//           totalMarks: "",
//           passingYear: "",
//           percentageCgpa: ""
//         }
//       ],
//       experiences: defaultValues.experiences || [
//         {
//           companyName: "",
//           experienceDesignation: "",
//           totalExperience: "",
//           startDate: "",
//           endDate: ""
//         }
//       ]
//     }
//   });

//   const {
//     fields: qualificationFields,
//     append: addQualification,
//     remove: removeQualification
//   } = useFieldArray({
//     control,
//     name: "qualifications"
//   });

//   const {
//     fields: experienceFields,
//     append: addExperience,
//     remove: removeExperience
//   } = useFieldArray({
//     control,
//     name: "experiences"
//   });

//   const onSubmit = (data) => {
//     console.log("Qualifications & Experience:", data);
//     goNext();
//   };

//   return (
//     <form ref={scope} onSubmit={handleSubmit(onSubmit)}>
//       {/* Qualifications Section */}
//       <h2 className="text-xl font-semibold mb-4">Qualifications</h2>
//       {qualificationFields.map((item, index) => (
//         <div key={item.id} className="border rounded-md p-4 mb-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
//             <FormField
//               label="Qualification Name"
//               name={`qualifications.${index}.qualificationName`}
//               control={control}
//               placeholder="Enter Qualification Name"
//             />
//             <FormField
//               label="University/Board"
//               name={`qualifications.${index}.universityBoard`}
//               control={control}
//               placeholder="Enter University/Board"
//             />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <FormField
//               label="Total Marks"
//               name={`qualifications.${index}.totalMarks`}
//               control={control}
//               placeholder="Total Marks"
//             />
//             <FormField
//               label="Passing Year"
//               name={`qualifications.${index}.passingYear`}
//               control={control}
//               placeholder="yy"
//             />
//             <FormField
//               label="Percentage/CGPA"
//               name={`qualifications.${index}.percentageCgpa`}
//               control={control}
//               placeholder="Percentage/CGPA"
//             />
//           </div>
//           {/* Add More / Remove Buttons */}
//           <div className="flex items-center space-x-3 mt-4">
//             <button
//               type="button"
//               onClick={() => removeQualification(index)}
//               className="px-4 py-2 bg-red-500 text-white rounded"
//             >
//               Remove
//             </button>
//             {index === qualificationFields.length - 1 && (
//               <button
//                 type="button"
//                 onClick={() =>
//                   addQualification({
//                     qualificationName: "",
//                     universityBoard: "",
//                     totalMarks: "",
//                     passingYear: "",
//                     percentageCgpa: ""
//                   })
//                 }
//                 className="px-4 py-2 bg-blue-600 text-white rounded"
//               >
//                 Add More Details
//               </button>
//             )}
//           </div>
//         </div>
//       ))}

//       {/* Experience Section */}
//       <h2 className="text-xl font-semibold mb-4">Experience</h2>
//       {experienceFields.map((item, index) => (
//         <div key={item.id} className="border rounded-md p-4 mb-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
//             <FormField
//               label="Company Name"
//               name={`experiences.${index}.companyName`}
//               control={control}
//               placeholder="Enter Company Name"
//             />
//             <FormField
//               label="Designation"
//               name={`experiences.${index}.experienceDesignation`}
//               control={control}
//               placeholder="Enter Designation"
//             />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <FormField
//               label="Total Years of Experience"
//               name={`experiences.${index}.totalExperience`}
//               control={control}
//               placeholder="e.g. 3"
//             />
//             <FormField
//               label="Start Date"
//               name={`experiences.${index}.startDate`}
//               control={control}
//               type="date"
//             />
//             <FormField
//               label="End Date"
//               name={`experiences.${index}.endDate`}
//               control={control}
//               type="date"
//             />
//           </div>
//           {/* Add More / Remove Buttons */}
//           <div className="flex items-center space-x-3 mt-4">
//             <button
//               type="button"
//               onClick={() => removeExperience(index)}
//               className="px-4 py-2 bg-red-500 text-white rounded"
//             >
//               Remove
//             </button>
//             {index === experienceFields.length - 1 && (
//               <button
//                 type="button"
//                 onClick={() =>
//                   addExperience({
//                     companyName: "",
//                     experienceDesignation: "",
//                     totalExperience: "",
//                     startDate: "",
//                     endDate: ""
//                   })
//                 }
//                 className="px-4 py-2 bg-blue-600 text-white rounded"
//               >
//                 Add More Details
//               </button>
//             )}
//           </div>
//         </div>
//       ))}

//       {/* Footer Buttons */}
//       <div className="flex items-center space-x-3 mt-6">
//         <button
//           type="button"
//           className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-gray-100 rounded"
//         >
//           Cancel
//         </button>
//         <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//           Next
//         </button>
//       </div>
//     </form>
//   );
// }

// /** TAB 3: Personal Details */
// function PersonalDetails({ defaultValues, onComplete }) {
//   const [scope, animate] = useAnimate();
//   const [filesList, setFilesList] = useState([]);

//   useEffect(() => {
//     animate([
//       [".animatable-input", { opacity: 0, x: 20 }, { duration: 0 }],
//       [".animatable-input", { opacity: 1, x: 0 }, { duration: 0.3, stagger: 0.05 }]
//     ]);
//   }, [animate]);

//   // Final tab has the "Save" button => calls onComplete
//   const { control, handleSubmit } = useForm({
//     defaultValues: {
//       panNumber: defaultValues.panNumber || "",
//       aadhaarNumber: defaultValues.aadhaarNumber || "",
//       bankHolderName: defaultValues.bankHolderName || "",
//       bankName: defaultValues.bankName || "",
//       bankAccountNo: defaultValues.bankAccountNo || "",
//       confirmBankAccountNo: defaultValues.confirmBankAccountNo || "",
//       ifscCode: defaultValues.ifscCode || "",
//       documents: defaultValues.documents || []
//     }
//   });

//   const handleDragOver = useCallback((e) => {
//     e.preventDefault();
//     e.stopPropagation();
//   }, []);

//   const handleDrop = useCallback(
//     (e, fieldOnChange) => {
//       e.preventDefault();
//       e.stopPropagation();
//       const droppedFiles = Array.from(e.dataTransfer.files);
//       if (droppedFiles.length > 0) {
//         fieldOnChange(droppedFiles);
//         setFilesList((prev) => [...prev, ...droppedFiles]);
//       }
//     },
//     []
//   );

//   const triggerFileSelect = () => {
//     document.getElementById("uploadDocumentsInput")?.click();
//   };

//   const onSubmit = (data) => {
//     console.log("Personal Details:", data);
//     // The final step => call onComplete with all data
//     onComplete(data);
//   };

//   return (
//     <form ref={scope} onSubmit={handleSubmit(onSubmit)}>
//       {/* PAN & Aadhaar */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <FormField
//           label="PAN Number"
//           name="panNumber"
//           control={control}
//           placeholder="PAN Number"
//         />
//         <FormField
//           label="Aadhaar Number"
//           name="aadhaarNumber"
//           control={control}
//           placeholder="Aadhaar Number"
//         />
//       </div>

//       {/* Bank Details */}
//       <h2 className="text-xl font-semibold mt-8 mb-4">Bank Details</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <FormField
//           label="Bank Holder Name"
//           name="bankHolderName"
//           control={control}
//           placeholder="Enter Account Holder Name"
//         />
//         <FormField
//           label="Bank Name"
//           name="bankName"
//           control={control}
//           placeholder="e.g. State Bank"
//         />
//         <FormField
//           label="Bank Account No."
//           name="bankAccountNo"
//           control={control}
//           placeholder="1234567890"
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormField
//           label="Confirm Bank Account No."
//           name="confirmBankAccountNo"
//           control={control}
//           placeholder="Re-enter Account No."
//         />
//         <FormField label="IFSC Code" name="ifscCode" control={control} placeholder="e.g. ABCD0123456" />

//         {/* Upload Documents */}
//         <div>
//           <label className="block font-medium mb-1">Upload Documents</label>
//           <Controller
//             name="documents"
//             control={control}
//             render={({ field }) => {
//               const { value, onChange } = field;
//               return (
//                 <>
//                   <input
//                     type="file"
//                     id="uploadDocumentsInput"
//                     multiple
//                     accept="image/*,.pdf,.doc,.docx"
//                     className="hidden"
//                     onChange={(e) => {
//                       const files = Array.from(e.target.files || []);
//                       onChange(files);
//                       setFilesList((prev) => [...prev, ...files]);
//                     }}
//                   />
//                   <div
//                     className="relative flex flex-col items-center justify-center
//                       w-full h-24 border-2 border-dashed border-blue-400
//                       rounded text-center cursor-pointer
//                       hover:bg-blue-50 dark:hover:bg-gray-800"
//                     onDragOver={handleDragOver}
//                     onDrop={(e) => handleDrop(e, onChange)}
//                     onClick={triggerFileSelect}
//                   >
//                     <FaCloudUploadAlt className="text-blue-400 text-2xl mb-2" />
//                     <p className="text-sm text-gray-500 dark:text-gray-300">
//                       Drag &amp; drop or <span className="text-blue-400 underline">click</span> to upload
//                     </p>
//                   </div>
//                   {/* List chosen files */}
//                   {value && value.length > 0 && (
//                     <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300">
//                       {value.map((file, idx) => (
//                         <li key={idx} className="flex items-center space-x-2">
//                           <span>{file.name}</span>
//                           <span className="text-xs text-gray-400">
//                             ({Math.round(file.size / 1024)} KB)
//                           </span>
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </>
//               );
//             }}
//           />
//         </div>
//       </div>

//       {/* (Optional) Add More Documents button */}
//       <div className="mt-4">
//         <button
//           type="button"
//           onClick={triggerFileSelect}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Add More Documents
//         </button>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex items-center space-x-3 mt-6">
//         <button
//           type="button"
//           className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-gray-100 rounded"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="px-4 py-2 bg-green-600 text-white
//             rounded hover:bg-green-700"
//         >
//           Save
//         </button>
//       </div>
//     </form>
//   );
// }

// /** Reusable input field component */
// function FormField({ label, name, control, placeholder, type = "text" }) {
//   return (
//     <div>
//       <label className="block font-medium mb-1">{label}</label>
//       <Controller
//         name={name}
//         control={control}
//         render={({ field }) => (
//           <input
//             {...field}
//             type={type}
//             placeholder={placeholder}
//             className="animatable-input w-full px-3 py-2 border border-gray-300
//               dark:border-gray-700 rounded focus:outline-none
//               focus:ring-2 focus:ring-blue-400 dark:bg-gray-800"
//           />
//         )}
//       />
//     </div>
//   );
// }

// /** Reusable FormSelect component */
// function FormSelect({ label, name, control, options }) {
//   return (
//     <div>
//       <label className="block font-medium mb-1">{label}</label>
//       <Controller
//         name={name}
//         control={control}
//         render={({ field }) => (
//           <select
//             {...field}
//             className="animatable-input w-full px-3 py-2 border border-gray-300
//               dark:border-gray-700 rounded focus:outline-none
//               focus:ring-2 focus:ring-blue-400 dark:bg-gray-800"
//           >
//             {options.map((opt) => (
//               <option key={opt.value} value={opt.value}>
//                 {opt.label}
//               </option>
//             ))}
//           </select>
//         )}
//       />
//     </div>
//   );
// }

// /** Reusable FormTextArea component */
// function FormTextArea({ label, name, control, placeholder }) {
//   return (
//     <div>
//       <label className="block font-medium mb-1">{label}</label>
//       <Controller
//         name={name}
//         control={control}
//         render={({ field }) => (
//           <textarea
//             {...field}
//             rows={3}
//             placeholder={placeholder}
//             className="animatable-input w-full px-3 py-2 border border-gray-300
//               dark:border-gray-700 rounded focus:outline-none
//               focus:ring-2 focus:ring-blue-400 dark:bg-gray-800"
//           />
//         )}
//       />
//     </div>
//   );
// }

// // src/components/EmployeeFormTabs.jsx
// import React, { useState, useEffect, useCallback } from "react";
// import { AnimatePresence, motion, useAnimate } from "framer-motion";
// import { useForm, useFieldArray, Controller, FormProvider } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";
// import * as Yup from "yup";
// import { toast } from "react-hot-toast";

// // import your store and service
// import useEmployeeStore from "../../store/useEmployeeStore.js";
// import { createEmployee } from "../../service/employeeService.js";

// // For your custom ConfirmationDialog
// import ConfirmationDialog from "../common/ConfirmationDialog";

// // A subset of your "availablePermission" array or load from store?
// // (If you want dynamic from store, you can do that as well.)
// import { availablePermission } from "./AvailablePermissions.jsx";
// // Or replicate it inside your project

// /********************************************
//   YUP VALIDATION SCHEMA
// *********************************************/

// const lettersOnlyRegex = /^(?=.*[A-Za-z])[A-Za-z\s]+$/;
// const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB
// const todayISO = new Date().toISOString().split("T")[0];

// const validationSchema = Yup.object().shape({
//   // Step 1
//   firstName: Yup.string()
//     .matches(lettersOnlyRegex, "First Name can only contain letters and spaces")
//     .required("First Name is required"),
//   lastName: Yup.string().matches(lettersOnlyRegex, "Last Name can only contain letters and spaces"),
//   gender: Yup.string()
//     .required("Gender is required")
//     .oneOf(["Male", "Female", "Other"], "Invalid Gender selection"),
//   phone: Yup.string()
//     .matches(/^\d{10}$/, "Phone Number must be exactly 10 digits")
//     .required("Phone Number is required"),
//   personalEmail: Yup.string().email("Invalid Email").required("Personal Email is required"),
//   dob: Yup.date()
//     .required("Date of Birth is required")
//     .test("age", "Must be at least 14 years old", function (value) {
//       if (!value) return false;
//       const today = new Date();
//       const dobDate = new Date(value);
//       const age = today.getFullYear() - dobDate.getFullYear();
//       const m = today.getMonth() - dobDate.getMonth();
//       if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
//         return age - 1 >= 14;
//       }
//       return age >= 14;
//     }),
//   permanentAddress: Yup.string().required("Address is required"),
//   workEmail: Yup.string().email("Invalid Email").required("Work Email is required"),
//   doj: Yup.date()
//     .max(new Date(), "Date of Joining cannot be in the future")
//     .required("Date of Joining is required"),
//   department: Yup.string().required("Department is required"),
//   role: Yup.string().required("Role Name is required"),
//   // If we want them to pick at least one permission from the role
//   permissions: Yup.array().min(1, "At least one permission must be selected"),
//   assignManager: Yup.array().min(1, "At least one manager must be assigned"),
//   designation: Yup.string().required("Designation is required"),
//   employeeId: Yup.string().required("Employee ID is required"),
//   employeeLocation: Yup.string().notRequired(), // optional
//   officeLocation: Yup.string().required("Office Address is required"),
//   latitude: Yup.string().required("Latitude is required"),
//   longitude: Yup.string().required("Longitude is required"),
//   shiftTiming: Yup.string().required("Shift Timings are required"),
//   salary: Yup.number()
//     .typeError("Salary must be a number")
//     .min(0, "Salary cannot be negative")
//     .required("Salary is required"),
//   otp: Yup.string().oneOf(["yes", "no"], "Invalid OTP selection").required("OTP selection is required"),

//   // Step 2
//   qualifications: Yup.array().of(
//     Yup.object().shape({
//       qualificationName: Yup.string().nullable(),
//       universityBoard: Yup.string().nullable(),
//       totalMarks: Yup.number().typeError("Total marks must be a number").nullable().min(0),
//       passingYear: Yup.number().typeError("Year must be a number").nullable().min(0),
//       percentageCgpa: Yup.string().nullable(),
//     })
//   ),
//   experiences: Yup.array().of(
//     Yup.object().shape({
//       companyName: Yup.string().nullable(),
//       experienceDesignation: Yup.string()
//         .matches(lettersOnlyRegex, "Designation can only contain letters and spaces")
//         .nullable(),
//       totalExperience: Yup.number().typeError("Experience must be a number").nullable().min(0),
//       startDate: Yup.date().nullable(),
//       endDate: Yup.date().nullable(),
//     })
//   ),

//   // Step 3
//   panNumber: Yup.string()
//     .required("PAN number is required")
//     .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "PAN must be e.g. ABCDE1234F"),
//   aadhaarNumber: Yup.string()
//     .required("Aadhaar no. is required")
//     .matches(/^\d{12}$/, "Aadhaar must be a 12-digit number"),
//   bankHolderName: Yup.string()
//     .matches(lettersOnlyRegex, "Bank Holder Name can only contain letters and spaces")
//     .required("Bank Holder Name is required"),
//   bankName: Yup.string()
//     .matches(lettersOnlyRegex, "Bank Name can only contain letters and spaces")
//     .required("Bank Name is required"),
//   bankAccountNo: Yup.string()
//     .matches(/^[0-9]{9,18}$/, "Bank account must be 9 to 18 digits")
//     .required("Account Number is required"),
//   confirmBankAccountNo: Yup.string()
//     .oneOf([Yup.ref("bankAccountNo"), null], "Bank Account Numbers must match")
//     .required("Please confirm your Bank Account Number"),
//   ifscCode: Yup.string()
//     .required("IFSC Code is required")
//     .matches(/^[A-Z0-9]{11}$/, "IFSC must be 11 chars (letters/numbers)"),

//   documents: Yup.array()
//     .max(20, "Maximum of 20 documents allowed")
//     .of(
//       Yup.object().shape({
//         name: Yup.string().required("Document name is required"),
//         file: Yup.mixed()
//           .test("fileSize", "File too large (Max 5MB)", (file) => {
//             if (!file) return true; // no file is allowed if name is filled but let's keep consistent
//             return file.size <= FILE_SIZE_LIMIT;
//           })
//           .test("fileType", "Unsupported File Format", (file) => {
//             if (!file) return true;
//             return ["image/jpeg", "image/png", "application/pdf"].includes(file.type);
//           }),
//       })
//     ),
// });

// /********************************************
//   MAIN COMPONENT
// *********************************************/
// export default function EmployeeFormTabs({ formTitle = "Employee Form", onComplete = () => {} }) {
//   // Zustand store usage for fetching data
//   const {
//     shiftTimings,
//     employmentTypes,
//     departments,
//     allEmployees,
//     permissionRoles,
//     addressOptions,
//     designations,

//     loadingShiftTimings,
//     loadingEmploymentTypes,
//     loadingDepartments,
//     loadingAllEmployees,
//     loadingPermissionRoles,
//     loadingAddresses,
//     loadingDesignations,

//     loadShiftTimings,
//     loadEmploymentTypes,
//     loadDepartments,
//     loadAllEmployees,
//     loadPermissionRoles,
//     loadCompanyAddresses,
//     loadDesignations,
//   } = useEmployeeStore();

//   const [activeTab, setActiveTab] = useState(0);
//   const [confirmationOpen, setConfirmationOpen] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   // Load all data on mount
//   useEffect(() => {
//     loadShiftTimings();
//     loadEmploymentTypes();
//     loadDepartments();
//     loadAllEmployees();
//     loadPermissionRoles();
//     loadCompanyAddresses();
//     loadDesignations();
//     // eslint-disable-next-line
//   }, []);

//   /********************************************
//     REACT-HOOK-FORM SETUP
//   *********************************************/
//   const methods = useForm({
//     resolver: yupResolver(validationSchema),
//     mode: "onBlur",
//     defaultValues: {
//       // Step 1
//       firstName: "",
//       lastName: "",
//       phone: "",
//       gender: "",
//       personalEmail: "",
//       dob: "",
//       permanentAddress: "",
//       workEmail: "",
//       doj: "",
//       department: "",
//       role: "",
//       permissions: [], // multi
//       assignManager: [], // multi
//       designation: "",
//       employeeId: "",
//       employeeLocation: "", // optional
//       officeLocation: "", // will store the address label
//       latitude: "",
//       longitude: "",
//       shiftTiming: "",
//       salary: "",
//       otp: "no",

//       // Step 2
//       qualifications: [
//         {
//           qualificationName: "",
//           universityBoard: "",
//           totalMarks: "",
//           passingYear: "",
//           percentageCgpa: "",
//         },
//       ],
//       experiences: [
//         {
//           companyName: "",
//           experienceDesignation: "",
//           totalExperience: "",
//           startDate: "",
//           endDate: "",
//         },
//       ],

//       // Step 3
//       panNumber: "",
//       aadhaarNumber: "",
//       bankHolderName: "",
//       bankName: "",
//       bankAccountNo: "",
//       confirmBankAccountNo: "",
//       ifscCode: "",
//       documents: [
//         {
//           name: "",
//           file: null,
//         },
//       ],
//     },
//   });

//   const {
//     handleSubmit,
//     watch,
//     setValue,
//     getValues,
//     control,
//     formState: { isValid },
//   } = methods;

//   // Field Arrays for qualifications, experiences, documents
//   const {
//     fields: qualificationFields,
//     append: appendQualification,
//     remove: removeQualification,
//   } = useFieldArray({
//     control,
//     name: "qualifications",
//   });

//   const {
//     fields: experienceFields,
//     append: appendExperience,
//     remove: removeExperience,
//   } = useFieldArray({
//     control,
//     name: "experiences",
//   });

//   const {
//     fields: documentFields,
//     append: appendDocument,
//     remove: removeDocument,
//   } = useFieldArray({
//     control,
//     name: "documents",
//   });

//   /********************************************
//     MULTI-STEP NAVIGATION
//   *********************************************/
//   const onSubmitStep = (data) => {
//     // If we are not on the last step, just go next
//     if (activeTab < 2) {
//       setActiveTab(activeTab + 1);
//     } else {
//       // Last step => open confirmation
//       setConfirmationOpen(true);
//     }
//   };

//   const handleConfirmSubmit = async () => {
//     // Actually submit the form (final) to server
//     setConfirmationOpen(false);
//     setSubmitting(true);

//     try {
//       const formValues = getValues();
//       // Convert to FormData
//       const formDataObj = new FormData();

//       // 1) Basic string/number fields
//       // Grab everything except arrays that need special handling
//       const omitKeys = [
//         "permissions",
//         "assignManager",
//         "qualifications",
//         "experiences",
//         "documents",
//         "confirmBankAccountNo",
//       ];

//       Object.keys(formValues).forEach((key) => {
//         if (!omitKeys.includes(key)) {
//           if (formValues[key] !== null && formValues[key] !== "") {
//             formDataObj.append(key, formValues[key]);
//           }
//         }
//       });

//       // 2) permissions array
//       formValues.permissions.forEach((permission, index) => {
//         formDataObj.append(`permission[${index}]`, permission);
//       });

//       // 3) assigned_to array
//       formValues.assignManager.forEach((managerId, index) => {
//         formDataObj.append(`assigned_to[${index}]`, managerId);
//       });

//       // 4) documents array
//       formValues.documents.forEach((doc, index) => {
//         if (doc.name && doc.file) {
//           formDataObj.append(`documents[${index}][name]`, doc.name);
//           formDataObj.append(`documents[${index}][file]`, doc.file);
//         }
//       });

//       // 5) qualifications
//       formValues.qualifications.forEach((qual, index) => {
//         formDataObj.append(`qualifications[${index}][qualificationName]`, qual.qualificationName || "");
//         formDataObj.append(`qualifications[${index}][universityBoard]`, qual.universityBoard || "");
//         formDataObj.append(`qualifications[${index}][totalMarks]`, qual.totalMarks || "");
//         formDataObj.append(`qualifications[${index}][year]`, qual.passingYear || "");
//         formDataObj.append(`qualifications[${index}][percentageCgpa]`, qual.percentageCgpa || "");
//       });

//       // total_experience is optional in your old code. We can store the sum if we want, or skip
//       // For now, let's keep it if needed:
//       // formDataObj.append("total_experience", ???);

//       // 6) experiences
//       formValues.experiences.forEach((exp, index) => {
//         formDataObj.append(`experiences[${index}][companyName]`, exp.companyName || "");
//         formDataObj.append(`experiences[${index}][designation]`, exp.experienceDesignation || "");
//         formDataObj.append(`experiences[${index}][startDate]`, exp.startDate || "");
//         formDataObj.append(`experiences[${index}][endDate]`, exp.endDate || "");
//       });

//       // 7) If there's a userAvatar field, you can do similarly.
//       // But in this new UI, we only do profile preview in Step 1.
//       // If you want to upload, replicate the doc approach.

//       // Final POST
//       const response = await createEmployee(formDataObj);
//       if (response.success) {
//         toast.success("User registered successfully");
//         onComplete(response);
//       } else {
//         toast.error("Registration failed: " + response.message);
//       }
//     } catch (error) {
//       // Show specific error
//       if (error.response?.data?.details) {
//         error.response.data.details.forEach((detail) => {
//           toast.error(detail.message);
//         });
//       } else if (error.response?.data?.message) {
//         toast.error("Registration failed: " + error.response.data.message);
//       } else {
//         toast.error("Registration failed: " + error.message);
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleCancelSubmit = () => {
//     setConfirmationOpen(false);
//   };

//   /********************************************
//     RENDER
//   *********************************************/
//   return (
//     <FormProvider {...methods}>
//       <div className="employee-form bg-bg-primary text-text-primary py-2">
//         <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-bg-secondary dark:text-gray-100 rounded-md shadow p-6">
//             <h1 className="text-2xl font-bold text-center mb-6">{formTitle}</h1>

//             {/* Tabs Header */}
//             <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
//               <TabButton
//                 label="Employee Details"
//                 isActive={activeTab === 0}
//                 onClick={() => setActiveTab(0)}
//               />
//               <TabButton
//                 label="Qualifications & Experience"
//                 isActive={activeTab === 1}
//                 onClick={() => setActiveTab(1)}
//               />
//               <TabButton
//                 label="Personal Details"
//                 isActive={activeTab === 2}
//                 onClick={() => setActiveTab(2)}
//               />
//             </div>

//             {/* Tabs Content (wrapped by AnimatePresence) */}
//             <div className="mt-4">
//               <AnimatePresence mode="wait">
//                 {activeTab === 0 && (
//                   <motion.div
//                     key="tab-employee"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ duration: 0.4, ease: "easeOut" }}
//                   >
//                     <Step1EmployeeDetails onSubmitStep={onSubmitStep} submitting={submitting} />
//                   </motion.div>
//                 )}

//                 {activeTab === 1 && (
//                   <motion.div
//                     key="tab-qualifications"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ duration: 0.4, ease: "easeOut" }}
//                   >
//                     <Step2QualificationsExperience
//                       onSubmitStep={onSubmitStep}
//                       submitting={submitting}
//                       qualificationFields={qualificationFields}
//                       removeQualification={removeQualification}
//                       appendQualification={appendQualification}
//                       experienceFields={experienceFields}
//                       removeExperience={removeExperience}
//                       appendExperience={appendExperience}
//                     />
//                   </motion.div>
//                 )}

//                 {activeTab === 2 && (
//                   <motion.div
//                     key="tab-personal"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ duration: 0.4, ease: "easeOut" }}
//                   >
//                     <Step3PersonalDetails
//                       onSubmitStep={onSubmitStep}
//                       submitting={submitting}
//                       documentFields={documentFields}
//                       removeDocument={removeDocument}
//                       appendDocument={appendDocument}
//                     />
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Confirmation Dialog for final submission */}
//       <ConfirmationDialog
//         open={confirmationOpen}
//         title="Are you sure?"
//         message="Do you want to add this user?"
//         confirmText="Yes"
//         cancelText="No, cancel!"
//         onConfirm={handleConfirmSubmit}
//         onCancel={handleCancelSubmit}
//       />
//     </FormProvider>
//   );
// }

// /********************************************
//   Reusable Tab Button
// *********************************************/
// function TabButton({ label, isActive, onClick }) {
//   return (
//     <button
//       className={`px-4 py-2 text-sm font-medium
//         ${
//           isActive
//             ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
//             : "text-gray-600 dark:text-gray-300 hover:text-blue-600"
//         }
//       `}
//       onClick={onClick}
//     >
//       {label}
//     </button>
//   );
// }

// /********************************************
//   STEP 1: Employee Details
// *********************************************/
// function Step1EmployeeDetails({ onSubmitStep, submitting }) {
//   const [scope, animate] = useAnimate();
//   const { register, handleSubmit, control, watch, setValue } = useFormContext();

//   // Animate on mount
//   useEffect(() => {
//     animate([
//       [".animatable-input", { opacity: 0, x: 20 }, { duration: 0 }],
//       [".animatable-input", { opacity: 1, x: 0 }, { duration: 0.3, stagger: 0.05 }],
//     ]);
//   }, [animate]);

//   // We want to handle updates to addresses, latitude, longitude etc.
//   const addressOptions = useEmployeeStore((state) => state.addressOptions);
//   const loadingAddresses = useEmployeeStore((state) => state.loadingAddresses);

//   const departments = useEmployeeStore((state) => state.departments);
//   const loadingDepartments = useEmployeeStore((state) => state.loadingDepartments);

//   const shiftTimings = useEmployeeStore((state) => state.shiftTimings);
//   const loadingShiftTimings = useEmployeeStore((state) => state.loadingShiftTimings);

//   const employmentTypes = useEmployeeStore((state) => state.employmentTypes); // if needed
//   const loadingEmploymentTypes = useEmployeeStore((state) => state.loadingEmploymentTypes);

//   const permissionRoles = useEmployeeStore((state) => state.permissionRoles);
//   const loadingPermissionRoles = useEmployeeStore((state) => state.loadingPermissionRoles);

//   const designations = useEmployeeStore((state) => state.designations);
//   const loadingDesignations = useEmployeeStore((state) => state.loadingDesignations);

//   const allEmployees = useEmployeeStore((state) => state.allEmployees);
//   const loadingAllEmployees = useEmployeeStore((state) => state.loadingAllEmployees);

//   // Watch for changes in "officeLocation" to set lat/long automatically
//   const watchOfficeLocation = watch("officeLocation");

//   useEffect(() => {
//     // Whenever officeLocation changes, set lat/long from the found address
//     const selected = addressOptions.find((opt) => opt.value === watchOfficeLocation);
//     if (selected) {
//       setValue("latitude", selected.latitude);
//       setValue("longitude", selected.longitude);
//     }
//   }, [watchOfficeLocation, addressOptions, setValue]);

//   // If you want to auto-set permissions based on selected role (like old code)
//   const watchRole = watch("role");
//   useEffect(() => {
//     const foundRole = permissionRoles.find((r) => r.role_name === watchRole);
//     if (foundRole?.permission) {
//       // automatically set "permissions" to the array of foundRole.permission[*].permission
//       const perms = foundRole.permission.map((p) => p.permission);
//       setValue("permissions", perms);
//     } else {
//       setValue("permissions", []);
//     }
//   }, [watchRole, permissionRoles, setValue]);

//   // Render
//   return (
//     <form ref={scope} onSubmit={handleSubmit(onSubmitStep)}>
//       {/* Example fields from old + new combined */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* First Name */}
//         <FormField
//           label="First Name"
//           name="firstName"
//           placeholder="Enter First Name"
//           required
//         />
//         {/* Last Name */}
//         <FormField label="Last Name" name="lastName" placeholder="Enter Last Name" />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         {/* Phone */}
//         <FormField label="Phone" name="phone" placeholder="Enter phone number" />
//         {/* Gender */}
//         <FormSelect
//           label="Gender"
//           name="gender"
//           options={[
//             { value: "", label: "Select" },
//             { value: "Male", label: "Male" },
//             { value: "Female", label: "Female" },
//             { value: "Other", label: "Other" },
//           ]}
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         {/* Personal Email */}
//         <FormField label="Personal Email" name="personalEmail" placeholder="test@gmail.com" />
//         {/* DOB */}
//         <FormField label="DOB" name="dob" type="date" />
//         {/* Permanent Address */}
//         <FormTextArea
//           label="Permanent Address"
//           name="permanentAddress"
//           placeholder="Write Address..."
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         {/* Work Email */}
//         <FormField label="Work Email" name="workEmail" placeholder="test@company.com" />
//         {/* DOJ */}
//         <FormField label="DOJ" name="doj" type="date" />
//         {/* Department */}
//         <FormSelect
//           label="Department"
//           name="department"
//           options={[
//             { value: "", label: "Select Department" },
//             ...departments,
//           ]}
//           loading={loadingDepartments}
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         {/* Role (Permission Role) */}
//         <FormSelect
//           label="Role"
//           name="role"
//           options={[
//             { value: "", label: "Select Role" },
//             ...(permissionRoles?.map((r) => ({ value: r.role_name, label: r.role_name })) || []),
//           ]}
//           loading={loadingPermissionRoles}
//         />
//         {/* Assign Manager (Multi-Select) */}
//         <FormMultiSelect
//           label="Assign Manager"
//           name="assignManager"
//           options={allEmployees}
//           loading={loadingAllEmployees}
//         />
//         {/* Designation */}
//         <FormSelect
//           label="Designation"
//           name="designation"
//           options={[
//             { value: "", label: "Select Designation" },
//             ...designations,
//           ]}
//           loading={loadingDesignations}
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         {/* Employee ID */}
//         <FormField label="Employee ID" name="employeeId" placeholder="R10004" />
//         {/* Salary */}
//         <FormField label="Salary" name="salary" placeholder="Salary" />
//         {/* OTP */}
//         <FormSelect
//           label="OTP Required"
//           name="otp"
//           options={[
//             { value: "", label: "Select" },
//             { value: "no", label: "No" },
//             { value: "yes", label: "Yes" },
//           ]}
//         />
//       </div>

//       {/* Address, lat/long, shift */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormSelect
//           label="Office Address"
//           name="officeLocation"
//           options={[
//             { value: "", label: "Select Office Address" },
//             ...addressOptions,
//           ]}
//           loading={loadingAddresses}
//         />
//         <FormField label="Latitude" name="latitude" placeholder="Latitude" />
//         <FormField label="Longitude" name="longitude" placeholder="Longitude" />
//       </div>

//       {/* Shift Timings */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormSelect
//           label="Shift Timing"
//           name="shiftTiming"
//           options={[
//             { value: "", label: "Select Shift Timings" },
//             ...shiftTimings,
//           ]}
//           loading={loadingShiftTimings}
//         />
//         {/* If you want to add EmployeeType from old code, do that here */}
//         {/* <FormSelect ... employmentTypes ... /> */}
//       </div>

//       {/* Permissions (Multi-Select) */}
//       <div className="mt-6">
//         <FormMultiSelect
//           label="Permissions"
//           name="permissions"
//           options={availablePermission.map((p) => ({
//             value: p.permission,
//             label: p.name,
//           }))}
//         />
//       </div>

//       {/* Step Controls */}
//       <div className="flex items-center space-x-3 mt-6">
//         <button
//           type="button"
//           className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-gray-100 rounded"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           disabled={submitting}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           {submitting ? "Submitting..." : "Next"}
//         </button>
//       </div>
//     </form>
//   );
// }

// /********************************************
//   STEP 2: Qualifications & Experience
// *********************************************/
// function Step2QualificationsExperience({
//   onSubmitStep,
//   submitting,
//   qualificationFields,
//   removeQualification,
//   appendQualification,
//   experienceFields,
//   removeExperience,
//   appendExperience,
// }) {
//   const [scope, animate] = useAnimate();
//   const { register, handleSubmit, control } = useFormContext();

//   useEffect(() => {
//     animate([
//       [".animatable-input", { opacity: 0, x: 20 }, { duration: 0 }],
//       [".animatable-input", { opacity: 1, x: 0 }, { duration: 0.3, stagger: 0.05 }],
//     ]);
//   }, [animate]);

//   return (
//     <form ref={scope} onSubmit={handleSubmit(onSubmitStep)}>
//       {/* Qualifications */}
//       <h2 className="text-xl font-semibold mb-4">Qualifications</h2>
//       {qualificationFields.map((item, index) => (
//         <div key={item.id} className="border rounded-md p-4 mb-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
//             <FormField
//               label="Qualification Name"
//               name={`qualifications.${index}.qualificationName`}
//               placeholder="Enter Qualification Name"
//             />
//             <FormField
//               label="University/Board"
//               name={`qualifications.${index}.universityBoard`}
//               placeholder="Enter University/Board"
//             />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <FormField
//               label="Total Marks"
//               name={`qualifications.${index}.totalMarks`}
//               placeholder="Total Marks"
//             />
//             <FormField
//               label="Passing Year"
//               name={`qualifications.${index}.passingYear`}
//               placeholder="YYYY"
//             />
//             <FormField
//               label="Percentage/CGPA"
//               name={`qualifications.${index}.percentageCgpa`}
//               placeholder="e.g. 80% or 8.0"
//             />
//           </div>
//           {/* Buttons */}
//           <div className="flex items-center space-x-3 mt-4">
//             {qualificationFields.length > 1 && (
//               <button
//                 type="button"
//                 className="px-4 py-2 bg-red-500 text-white rounded"
//                 onClick={() => removeQualification(index)}
//               >
//                 Remove
//               </button>
//             )}
//             {index === qualificationFields.length - 1 && qualificationFields.length < 20 && (
//               <button
//                 type="button"
//                 onClick={() =>
//                   appendQualification({
//                     qualificationName: "",
//                     universityBoard: "",
//                     totalMarks: "",
//                     passingYear: "",
//                     percentageCgpa: "",
//                   })
//                 }
//                 className="px-4 py-2 bg-blue-600 text-white rounded"
//               >
//                 Add More
//               </button>
//             )}
//           </div>
//         </div>
//       ))}

//       {/* Experience */}
//       <h2 className="text-xl font-semibold mb-4">Experience</h2>
//       {experienceFields.map((item, index) => (
//         <div key={item.id} className="border rounded-md p-4 mb-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
//             <FormField
//               label="Company Name"
//               name={`experiences.${index}.companyName`}
//               placeholder="Enter Company Name"
//             />
//             <FormField
//               label="Designation"
//               name={`experiences.${index}.experienceDesignation`}
//               placeholder="Enter Designation"
//             />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <FormField
//               label="Total Years of Experience"
//               name={`experiences.${index}.totalExperience`}
//               placeholder="e.g. 3"
//             />
//             <FormField
//               label="Start Date"
//               name={`experiences.${index}.startDate`}
//               type="date"
//             />
//             <FormField
//               label="End Date"
//               name={`experiences.${index}.endDate`}
//               type="date"
//             />
//           </div>
//           {/* Buttons */}
//           <div className="flex items-center space-x-3 mt-4">
//             {experienceFields.length > 1 && (
//               <button
//                 type="button"
//                 className="px-4 py-2 bg-red-500 text-white rounded"
//                 onClick={() => removeExperience(index)}
//               >
//                 Remove
//               </button>
//             )}
//             {index === experienceFields.length - 1 && experienceFields.length < 20 && (
//               <button
//                 type="button"
//                 onClick={() =>
//                   appendExperience({
//                     companyName: "",
//                     experienceDesignation: "",
//                     totalExperience: "",
//                     startDate: "",
//                     endDate: "",
//                   })
//                 }
//                 className="px-4 py-2 bg-blue-600 text-white rounded"
//               >
//                 Add More
//               </button>
//             )}
//           </div>
//         </div>
//       ))}

//       {/* Step Controls */}
//       <div className="flex items-center space-x-3 mt-6">
//         <button
//           type="button"
//           className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-gray-100 rounded"
//           onClick={() => {
//             // go back
//           }}
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           disabled={submitting}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           {submitting ? "Submitting..." : "Next"}
//         </button>
//       </div>
//     </form>
//   );
// }

// /********************************************
//   STEP 3: Personal Details
// *********************************************/
// function Step3PersonalDetails({
//   onSubmitStep,
//   submitting,
//   documentFields,
//   removeDocument,
//   appendDocument,
// }) {
//   const [scope, animate] = useAnimate();
//   const { handleSubmit, control } = useFormContext();

//   useEffect(() => {
//     animate([
//       [".animatable-input", { opacity: 0, x: 20 }, { duration: 0 }],
//       [".animatable-input", { opacity: 1, x: 0 }, { duration: 0.3, stagger: 0.05 }],
//     ]);
//   }, [animate]);

//   return (
//     <form ref={scope} onSubmit={handleSubmit(onSubmitStep)}>
//       {/* PAN & Aadhaar */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <FormField label="PAN Number" name="panNumber" placeholder="ABCDE1234F" />
//         <FormField label="Aadhaar Number" name="aadhaarNumber" placeholder="12-digit Aadhaar" />
//       </div>

//       {/* Bank Details */}
//       <h2 className="text-xl font-semibold mt-8 mb-4">Bank Details</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <FormField label="Bank Holder Name" name="bankHolderName" placeholder="Account Holder Name" />
//         <FormField label="Bank Name" name="bankName" placeholder="State Bank" />
//         <FormField label="Bank Account No." name="bankAccountNo" placeholder="1234567890" />
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormField
//           label="Confirm Bank Account No."
//           name="confirmBankAccountNo"
//           placeholder="Re-enter Account No."
//         />
//         <FormField label="IFSC Code" name="ifscCode" placeholder="ABCD0123456" />

//         {/* Documents */}
//         <div>
//           <label className="block font-medium mb-1">Upload Documents</label>
//           {documentFields.map((item, index) => (
//             <DocumentUploader
//               key={item.id}
//               index={index}
//               removeDocument={removeDocument}
//               totalDocs={documentFields.length}
//             />
//           ))}
//           {documentFields.length < 20 && (
//             <button
//               type="button"
//               onClick={() => appendDocument({ name: "", file: null })}
//               className="px-4 py-2 bg-blue-600 text-white rounded mt-2"
//             >
//               Add More Documents
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex items-center space-x-3 mt-6">
//         <button
//           type="button"
//           className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-gray-100 rounded"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           disabled={submitting}
//           className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//         >
//           {submitting ? "Saving..." : "Save"}
//         </button>
//       </div>
//     </form>
//   );
// }

// /********************************************
//   Document Uploader Sub-Component
// *********************************************/
// function DocumentUploader({ index, removeDocument, totalDocs }) {
//   const { register, setValue, watch } = useFormContext();
//   const docName = watch(`documents.${index}.name`);
//   const docFile = watch(`documents.${index}.file`);

//   // If we want to handle the file input with a hidden input,
//   // or we can just do a normal input type="file"
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setValue(`documents.${index}.file`, file, { shouldValidate: true });
//     }
//   };

//   return (
//     <div className="border rounded p-3 mb-2">
//       <label className="block text-sm font-medium mb-1">
//         Document Name <span className="text-red-500">*</span>
//       </label>
//       <input
//         className="animatable-input w-full px-3 py-2 border border-gray-300 rounded mb-2"
//         placeholder="Enter Document Name"
//         {...register(`documents.${index}.name`)}
//       />
//       <label className="block text-sm font-medium mb-1">File</label>
//       <input
//         type="file"
//         accept=".png,.jpg,.jpeg,.pdf"
//         onChange={handleFileChange}
//       />

//       {/* Display chosen file */}
//       {docFile && (
//         <div className="mt-2 flex items-center space-x-2">
//           <FaTrash
//             className="cursor-pointer text-red-500"
//             onClick={() => setValue(`documents.${index}.file`, null)}
//           />
//           <span className="text-sm">{docFile.name}</span>
//         </div>
//       )}

//       {/* Remove Document button */}
//       {totalDocs > 1 && (
//         <button
//           type="button"
//           onClick={() => removeDocument(index)}
//           className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded flex items-center"
//         >
//           <FaTrash className="mr-1" />
//           Remove Document
//         </button>
//       )}
//     </div>
//   );
// }

// /********************************************
//   REUSABLE FORM COMPONENTS
// *********************************************/
// import { useFormContext } from "react-hook-form";

// // Basic <input> field
// function FormField({ label, name, placeholder, type = "text" }) {
//   const { register, formState: { errors } } = useFormContext();
//   const error = errors?.[name]?.message;

//   return (
//     <div>
//       <label className="block font-medium mb-1">{label}</label>
//       <input
//         type={type}
//         {...register(name)}
//         placeholder={placeholder}
//         className={`animatable-input w-full px-3 py-2 border ${
//           error ? "border-red-500" : "border-gray-300"
//         } rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
//       />
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// }

// // <select>
// function FormSelect({ label, name, options = [], loading = false }) {
//   const { register, formState: { errors } } = useFormContext();
//   const error = errors?.[name]?.message;

//   return (
//     <div>
//       <label className="block font-medium mb-1">{label}</label>
//       <select
//         {...register(name)}
//         className={`animatable-input w-full px-3 py-2 border ${
//           error ? "border-red-500" : "border-gray-300"
//         } rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
//       >
//         {loading && <option value="">Loading...</option>}
//         {!loading &&
//           options.map((opt, idx) => (
//             <option key={idx} value={opt.value}>
//               {opt.label}
//             </option>
//           ))}
//       </select>
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// }

// // <textarea>
// function FormTextArea({ label, name, placeholder }) {
//   const { register, formState: { errors } } = useFormContext();
//   const error = errors?.[name]?.message;

//   return (
//     <div>
//       <label className="block font-medium mb-1">{label}</label>
//       <textarea
//         {...register(name)}
//         rows={3}
//         placeholder={placeholder}
//         className={`animatable-input w-full px-3 py-2 border ${
//           error ? "border-red-500" : "border-gray-300"
//         } rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
//       ></textarea>
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// }

// // Multi-Select
// import Select from "react-select";
// function FormMultiSelect({ label, name, options = [], loading = false }) {
//   const { control, setValue, formState: { errors } } = useFormContext();
//   const error = errors?.[name]?.message;

//   return (
//     <div>
//       <label className="block font-medium mb-1">{label}</label>
//       <Controller
//         name={name}
//         control={control}
//         render={({ field }) => {
//           const { onChange, value } = field;
//           const selected = options.filter((opt) => (value || []).includes(opt.value));

//           return (
//             <Select
//               isMulti
//               options={options}
//               isLoading={loading}
//               onChange={(selectedOptions) => {
//                 onChange(selectedOptions.map((o) => o.value));
//               }}
//               value={selected}
//               className="animatable-input"
//               styles={{
//                 control: (base, state) => ({
//                   ...base,
//                   borderColor: error ? "red" : base.borderColor,
//                 }),
//               }}
//             />
//           );
//         }}
//       />
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// }

/**
 * EmployeeFormTabs.jsx
 * Combine old + new code logic into the new multi-step form approach.
 * Includes:
 *  - Profile Image upload + preview in Step 1 (userAvatar)
 *  - Additional fields from old code (e.g., no_of_Paid_Leave, employee_Type)
 *  - Final submission with FormData (including userAvatar & documents)
 *  - Confirmation dialog & toasts
 */

// import React, { useState, useEffect } from "react";
// import { AnimatePresence, motion, useAnimate } from "framer-motion";
// import {
//   useForm,
//   FormProvider,
//   useFieldArray,
//   useFormContext,
//   Controller,
// } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
// import { toast } from "react-hot-toast";
// import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";

// // For multi-select
// import Select from "react-select";

// // Your Zustand store for fetching data
// import useEmployeeStore from "../../store/useEmployeeStore.js";

// // The service that does final POST
// import { createEmployee } from "../../service/employeeService.js";

// // Confirmation dialog
// import ConfirmationDialog from "../common/ConfirmationDialog";

// // If you want some static or local permission array:
// import { availablePermission } from "./AvailablePermissions.jsx";

// // ----- Step 1: We want to add an optional file input for userAvatar (Profile Image) ----

// // Max file size for images
// const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB
// const lettersOnlyRegex = /^(?=.*[A-Za-z])[A-Za-z\s]+$/;
// const todayISO = new Date().toISOString().split("T")[0];

// /*****************************************************************
//  * Yup Validation Schema
//  * Incorporates "userAvatar", "no_of_Paid_Leave", "employee_Type", etc.
//  *****************************************************************/
// const validationSchema = Yup.object().shape({
//   // Step 1 Fields
//   firstName: Yup.string()
//     .matches(lettersOnlyRegex, "First Name can only contain letters and spaces")
//     .required("First Name is required"),
//   lastName: Yup.string().matches(
//     lettersOnlyRegex,
//     "Last Name can only contain letters and spaces"
//   ),
//   gender: Yup.string()
//     .required("Gender is required")
//     .oneOf(["Male", "Female", "Other"], "Invalid Gender selection"),
//   phone: Yup.string()
//     .matches(/^\d{10}$/, "Phone Number must be exactly 10 digits")
//     .required("Phone Number is required"),
//   personalEmail: Yup.string()
//     .email("Invalid Email")
//     .required("Personal Email is required"),
//   dob: Yup.date()
//     .required("Date of Birth is required")
//     .test("age", "Must be at least 14 years old", function (value) {
//       if (!value) return false;
//       const today = new Date();
//       const dobDate = new Date(value);
//       const age = today.getFullYear() - dobDate.getFullYear();
//       const m = today.getMonth() - dobDate.getMonth();
//       if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
//         return age - 1 >= 14;
//       }
//       return age >= 14;
//     }),
//   permanentAddress: Yup.string().required("Address is required"),
//   workEmail: Yup.string()
//     .email("Invalid Email")
//     .required("Work Email is required"),
//   doj: Yup.date()
//     .max(new Date(), "Date of Joining cannot be in the future")
//     .required("Date of Joining is required"),
//   department: Yup.string().required("Department is required"),
//   role: Yup.string().required("Role Name is required"),
//   permissions: Yup.array().min(1, "At least one permission must be selected"),
//   assignManager: Yup.array().min(1, "At least one manager must be assigned"),
//   designation: Yup.string().required("Designation is required"),
//   employeeId: Yup.string().required("Employee ID is required"),
//   employeeLocation: Yup.string().notRequired(),
//   officeLocation: Yup.string().required("Office Address is required"),
//   latitude: Yup.string().required("Latitude is required"),
//   longitude: Yup.string().required("Longitude is required"),
//   shiftTiming: Yup.string().required("Shift Timings are required"),
//   salary: Yup.number()
//     .typeError("Salary must be a number")
//     .min(0, "Salary cannot be negative")
//     .required("Salary is required"),
//   otp: Yup.string()
//     .oneOf(["yes", "no"], "Invalid OTP selection")
//     .required("OTP selection is required"),

//   // Additional from old code:
//   no_of_Paid_Leave: Yup.number()
//     .typeError("Number of Paid Leaves must be a number")
//     .min(0, "Cannot be negative")
//     .required("No. of Paid Leaves is required"),

//   // optional but from old code
//   employee_Type: Yup.string().required("Employee Type is required"),

//   // userAvatar (profile image) - optional or required, up to you
//   userAvatar: Yup.mixed()
//     .test("fileSize", "Profile image too large (max 5MB)", (file) => {
//       if (!file) return true; // not required
//       return file.size <= FILE_SIZE_LIMIT;
//     })
//     .test("fileType", "Unsupported format. Only JPG/PNG", (file) => {
//       if (!file) return true;
//       return ["image/jpeg", "image/png"].includes(file.type);
//     }),

//   // Step 2 Fields
//   qualifications: Yup.array().of(
//     Yup.object().shape({
//       qualificationName: Yup.string().nullable(),
//       universityBoard: Yup.string().nullable(),
//       totalMarks: Yup.number().nullable().min(0),
//       passingYear: Yup.number().nullable().min(0),
//       percentageCgpa: Yup.string().nullable(),
//     })
//   ),
//   experiences: Yup.array().of(
//     Yup.object().shape({
//       companyName: Yup.string().nullable(),
//       experienceDesignation: Yup.string()
//         .matches(
//           lettersOnlyRegex,
//           "Designation can only contain letters and spaces"
//         )
//         .nullable(),
//       totalExperience: Yup.number().nullable().min(0),
//       startDate: Yup.date().nullable(),
//       endDate: Yup.date().nullable(),
//     })
//   ),

//   // Step 3 Fields
//   panNumber: Yup.string()
//     .required("PAN number is required")
//     .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "PAN must be e.g. ABCDE1234F"),
//   aadhaarNumber: Yup.string()
//     .required("Aadhaar no. is required")
//     .matches(/^\d{12}$/, "Aadhaar must be a 12-digit number"),
//   bankHolderName: Yup.string()
//     .matches(
//       lettersOnlyRegex,
//       "Bank Holder Name can only contain letters and spaces"
//     )
//     .required("Bank Holder Name is required"),
//   bankName: Yup.string()
//     .matches(lettersOnlyRegex, "Bank Name can only contain letters and spaces")
//     .required("Bank Name is required"),
//   bankAccountNo: Yup.string()
//     .matches(/^[0-9]{9,18}$/, "Bank account must be 9 to 18 digits")
//     .required("Account Number is required"),
//   confirmBankAccountNo: Yup.string()
//     .oneOf([Yup.ref("bankAccountNo"), null], "Bank Account Numbers must match")
//     .required("Please confirm your Bank Account Number"),
//   ifscCode: Yup.string()
//     .required("IFSC Code is required")
//     .matches(
//       /^[A-Z0-9]{11}$/,
//       "IFSC must be 11 chars (letters/numbers) e.g. ABCD0123456"
//     ),
//   documents: Yup.array()
//     .max(20, "Maximum of 20 documents allowed")
//     .of(
//       Yup.object().shape({
//         name: Yup.string().required("Document name is required"),
//         file: Yup.mixed()
//           .test("fileSize", "File too large (Max 5MB)", (file) => {
//             if (!file) return true; // file is optional
//             return file.size <= FILE_SIZE_LIMIT;
//           })
//           .test("fileType", "Unsupported File Format", (file) => {
//             if (!file) return true;
//             return ["image/jpeg", "image/png", "application/pdf"].includes(
//               file.type
//             );
//           }),
//       })
//     ),
// });

// /*****************************************************
//  * MAIN COMPONENT
//  *****************************************************/
// export default function EmployeeFormTabs({
//   formTitle = "Employee Form",
//   onComplete = () => {},
// }) {
//   // Zustand store usage for fetching data
//   const {
//     shiftTimings,
//     employmentTypes,
//     departments,
//     allEmployees,
//     permissionRoles,
//     addressOptions,
//     designations,

//     loadingShiftTimings,
//     loadingEmploymentTypes,
//     loadingDepartments,
//     loadingAllEmployees,
//     loadingPermissionRoles,
//     loadingAddresses,
//     loadingDesignations,

//     loadShiftTimings,
//     loadEmploymentTypes,
//     loadDepartments,
//     loadAllEmployees,
//     loadPermissionRoles,
//     loadCompanyAddresses,
//     loadDesignations,
//   } = useEmployeeStore();

//   const [activeTab, setActiveTab] = useState(0);
//   const [confirmationOpen, setConfirmationOpen] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   // Load data on mount
//   useEffect(() => {
//     loadShiftTimings();
//     loadEmploymentTypes();
//     loadDepartments();
//     loadAllEmployees();
//     loadPermissionRoles();
//     loadCompanyAddresses();
//     loadDesignations();
//     // eslint-disable-next-line
//   }, []);

//   // Setup React Hook Form
//   const methods = useForm({
//     resolver: yupResolver(validationSchema),
//     mode: "onBlur",
//     defaultValues: {
//       // Step 1
//       firstName: "",
//       lastName: "",
//       gender: "",
//       phone: "",
//       personalEmail: "",
//       dob: "",
//       permanentAddress: "",
//       workEmail: "",
//       doj: "",
//       department: "",
//       role: "",
//       permissions: [],
//       assignManager: [],
//       designation: "",
//       employeeId: "",
//       employeeLocation: "", // optional
//       officeLocation: "",
//       latitude: "",
//       longitude: "",
//       shiftTiming: "",
//       salary: "",
//       otp: "no",
//       no_of_Paid_Leave: 0, // from old code
//       employee_Type: "", // from old code
//       userAvatar: null, // new field for profile image

//       // Step 2
//       qualifications: [
//         {
//           qualificationName: "",
//           universityBoard: "",
//           totalMarks: "",
//           passingYear: "",
//           percentageCgpa: "",
//         },
//       ],
//       experiences: [
//         {
//           companyName: "",
//           experienceDesignation: "",
//           totalExperience: "",
//           startDate: "",
//           endDate: "",
//         },
//       ],

//       // Step 3
//       panNumber: "",
//       aadhaarNumber: "",
//       bankHolderName: "",
//       bankName: "",
//       bankAccountNo: "",
//       confirmBankAccountNo: "",
//       ifscCode: "",
//       documents: [
//         {
//           name: "",
//           file: null,
//         },
//       ],
//     },
//   });

//   const {
//     handleSubmit,
//     getValues,
//     formState: { isValid },
//   } = methods;

//   // Field arrays for Step 2 & 3
//   const {
//     fields: qualificationFields,
//     append: appendQualification,
//     remove: removeQualification,
//   } = useFieldArray({
//     control: methods.control,
//     name: "qualifications",
//   });

//   const {
//     fields: experienceFields,
//     append: appendExperience,
//     remove: removeExperience,
//   } = useFieldArray({
//     control: methods.control,
//     name: "experiences",
//   });

//   const {
//     fields: documentFields,
//     append: appendDocument,
//     remove: removeDocument,
//   } = useFieldArray({
//     control: methods.control,
//     name: "documents",
//   });

//   // Step Navigation
//   const onSubmitStep = (data) => {
//     // If not the last step, move to next
//     if (activeTab < 2) {
//       setActiveTab(activeTab + 1);
//     } else {
//       // final step => show confirmation
//       setConfirmationOpen(true);
//     }
//   };

//   // Actually confirm & submit final form to server
//   const handleConfirmSubmit = async () => {
//     setConfirmationOpen(false);
//     setSubmitting(true);
//     try {
//       const formValues = getValues();
//       // Convert to FormData
//       const formData = new FormData();

//       // 1) Simple fields (omit arrays needing special handling)
//       const omitKeys = [
//         "permissions",
//         "assignManager",
//         "qualifications",
//         "experiences",
//         "documents",
//         "confirmBankAccountNo",
//         "userAvatar",
//       ];
//       Object.keys(formValues).forEach((key) => {
//         if (!omitKeys.includes(key)) {
//           const val = formValues[key];
//           if (val !== null && val !== "") {
//             formData.append(key, val);
//           }
//         }
//       });

//       // 2) permissions
//       formValues.permissions.forEach((permission, index) => {
//         formData.append(`permission[${index}]`, permission);
//       });

//       // 3) assigned_to
//       formValues.assignManager.forEach((managerId, index) => {
//         formData.append(`assigned_to[${index}]`, managerId);
//       });

//       // 4) userAvatar
//       if (formValues.userAvatar) {
//         formData.append("user_Avatar", formValues.userAvatar); // match the old code's "user_Avatar"
//       }

//       // 5) documents array
//       formValues.documents.forEach((doc, index) => {
//         if (doc.name && doc.file) {
//           formData.append(`documents[${index}][name]`, doc.name);
//           formData.append(`documents[${index}][file]`, doc.file);
//         }
//       });

//       // 6) qualifications
//       formValues.qualifications.forEach((qual, index) => {
//         formData.append(
//           `qualifications[${index}][qualificationName]`,
//           qual.qualificationName || ""
//         );
//         formData.append(
//           `qualifications[${index}][universityBoard]`,
//           qual.universityBoard || ""
//         );
//         formData.append(
//           `qualifications[${index}][totalMarks]`,
//           qual.totalMarks || ""
//         );
//         formData.append(`qualifications[${index}][year]`, qual.passingYear || "");
//         formData.append(
//           `qualifications[${index}][percentageCgpa]`,
//           qual.percentageCgpa || ""
//         );
//       });

//       // 7) experiences
//       formValues.experiences.forEach((exp, index) => {
//         formData.append(
//           `experiences[${index}][companyName]`,
//           exp.companyName || ""
//         );
//         formData.append(
//           `experiences[${index}][designation]`,
//           exp.experienceDesignation || ""
//         );
//         formData.append(`experiences[${index}][startDate]`, exp.startDate || "");
//         formData.append(`experiences[${index}][endDate]`, exp.endDate || "");
//       });

//       // Finally call createEmployee
//       const response = await createEmployee(formData);
//       if (response.success) {
//         toast.success("User registered successfully!");
//         onComplete(response);
//       } else {
//         toast.error("Registration failed: " + response.message);
//       }
//     } catch (error) {
//       if (error.response?.data?.details) {
//         error.response.data.details.forEach((detail) => {
//           toast.error(detail.message);
//         });
//       } else if (error.response?.data?.message) {
//         toast.error("Registration failed: " + error.response.data.message);
//       } else {
//         toast.error("Registration failed: " + error.message);
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleCancelSubmit = () => {
//     setConfirmationOpen(false);
//   };

//   return (
//     <FormProvider {...methods}>
//       <div className="employee-form bg-bg-primary text-text-primary py-2">
//         <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-bg-secondary dark:text-gray-100 rounded-md shadow p-6">
//             <h1 className="text-2xl font-bold text-center mb-6">{formTitle}</h1>

//             {/* Tab Header */}
//             <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
//               <TabButton
//                 label="Employee Details"
//                 isActive={activeTab === 0}
//                 onClick={() => setActiveTab(0)}
//               />
//               <TabButton
//                 label="Qualifications & Experience"
//                 isActive={activeTab === 1}
//                 onClick={() => setActiveTab(1)}
//               />
//               <TabButton
//                 label="Personal Details"
//                 isActive={activeTab === 2}
//                 onClick={() => setActiveTab(2)}
//               />
//             </div>

//             {/* Tabs Content */}
//             <div className="mt-4">
//               <AnimatePresence mode="wait">
//                 {activeTab === 0 && (
//                   <motion.div
//                     key="tab-employee"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ duration: 0.4, ease: "easeOut" }}
//                   >
//                     <Step1EmployeeDetails
//                       onSubmitStep={onSubmitStep}
//                       submitting={submitting}
//                     />
//                   </motion.div>
//                 )}

//                 {activeTab === 1 && (
//                   <motion.div
//                     key="tab-qualifications"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ duration: 0.4, ease: "easeOut" }}
//                   >
//                     <Step2QualificationsExperience
//                       onSubmitStep={onSubmitStep}
//                       submitting={submitting}
//                       qualificationFields={qualificationFields}
//                       removeQualification={removeQualification}
//                       appendQualification={appendQualification}
//                       experienceFields={experienceFields}
//                       removeExperience={removeExperience}
//                       appendExperience={appendExperience}
//                     />
//                   </motion.div>
//                 )}

//                 {activeTab === 2 && (
//                   <motion.div
//                     key="tab-personal"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ duration: 0.4, ease: "easeOut" }}
//                   >
//                     <Step3PersonalDetails
//                       onSubmitStep={onSubmitStep}
//                       submitting={submitting}
//                       documentFields={documentFields}
//                       removeDocument={removeDocument}
//                       appendDocument={appendDocument}
//                     />
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Confirmation Dialog */}
//       <ConfirmationDialog
//         open={confirmationOpen}
//         title="Are you sure?"
//         message="Do you want to add this user?"
//         confirmText="Yes"
//         cancelText="No, cancel!"
//         onConfirm={handleConfirmSubmit}
//         onCancel={handleCancelSubmit}
//       />
//     </FormProvider>
//   );
// }

// /*****************************************************
//  * Tab Button
//  *****************************************************/
// function TabButton({ label, isActive, onClick }) {
//   return (
//     <button
//       className={`px-4 py-2 text-sm font-medium
//         ${
//           isActive
//             ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
//             : "text-gray-600 dark:text-gray-300 hover:text-blue-600"
//         }
//       `}
//       onClick={onClick}
//     >
//       {label}
//     </button>
//   );
// }

// /*****************************************************
//  * STEP 1: Employee Details (with Profile Image, Paid Leaves, etc.)
//  *****************************************************/
// function Step1EmployeeDetails({ onSubmitStep, submitting }) {
//   const [scope, animate] = useAnimate();
//   const { handleSubmit, watch, setValue } = useFormContext();
//   const [avatarPreview, setAvatarPreview] = useState(null);

//   // For dynamically loaded data from Zustand
//   const addressOptions = useEmployeeStore((state) => state.addressOptions);
//   const loadingAddresses = useEmployeeStore((state) => state.loadingAddresses);

//   const departments = useEmployeeStore((state) => state.departments);
//   const loadingDepartments = useEmployeeStore((state) => state.loadingDepartments);

//   const shiftTimings = useEmployeeStore((state) => state.shiftTimings);
//   const loadingShiftTimings = useEmployeeStore((state) => state.loadingShiftTimings);

//   const employmentTypes = useEmployeeStore((state) => state.employmentTypes);
//   const loadingEmploymentTypes = useEmployeeStore((state) => state.loadingEmploymentTypes);

//   const permissionRoles = useEmployeeStore((state) => state.permissionRoles);
//   const loadingPermissionRoles = useEmployeeStore((state) => state.loadingPermissionRoles);

//   const designations = useEmployeeStore((state) => state.designations);
//   const loadingDesignations = useEmployeeStore((state) => state.loadingDesignations);

//   const allEmployees = useEmployeeStore((state) => state.allEmployees);
//   const loadingAllEmployees = useEmployeeStore((state) => state.loadingAllEmployees);

//   // Animate on mount
//   useEffect(() => {
//     animate([
//       [".animatable-input", { opacity: 0, x: 20 }, { duration: 0 }],
//       [".animatable-input", { opacity: 1, x: 0 }, { duration: 0.3, stagger: 0.05 }],
//     ]);
//   }, [animate]);

//   // Office Location => auto set lat/long
//   const watchOfficeLocation = watch("officeLocation");
//   useEffect(() => {
//     const selected = addressOptions.find((opt) => opt.value === watchOfficeLocation);
//     if (selected) {
//       setValue("latitude", selected.latitude);
//       setValue("longitude", selected.longitude);
//     }
//   }, [watchOfficeLocation, addressOptions, setValue]);

//   // Auto-set permissions if role selected
//   const watchRole = watch("role");
//   useEffect(() => {
//     const foundRole = permissionRoles.find((r) => r.role_name === watchRole);
//     if (foundRole?.permission) {
//       const perms = foundRole.permission.map((p) => p.permission);
//       setValue("permissions", perms);
//     } else {
//       setValue("permissions", []);
//     }
//   }, [watchRole, permissionRoles, setValue]);

//   // Profile image
//   const handleProfileImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setValue("userAvatar", file, { shouldValidate: true });
//       setAvatarPreview(URL.createObjectURL(file));
//     } else {
//       setValue("userAvatar", null);
//       setAvatarPreview(null);
//     }
//   };

//   return (
//     <form ref={scope} onSubmit={handleSubmit(onSubmitStep)}>
//       {/* Row: Profile Image + Basic Info? */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Profile Image Upload */}
//         <div className="flex flex-col items-center">
//           <label className="block font-medium mb-2">Profile Image</label>
//           <div
//             className="w-32 h-32 rounded-full border relative mb-2 flex items-center justify-center overflow-hidden"
//             title="Click to upload"
//             onClick={() => document.getElementById("avatarInput")?.click()}
//             style={{ cursor: "pointer" }}
//           >
//             {avatarPreview ? (
//               <img
//                 src={avatarPreview}
//                 alt="Profile"
//                 className="object-cover w-full h-full"
//               />
//             ) : (
//               <span className="text-gray-400 text-sm">No Image</span>
//             )}
//           </div>
//           <input
//             id="avatarInput"
//             type="file"
//             accept="image/png, image/jpeg"
//             style={{ display: "none" }}
//             onChange={handleProfileImageChange}
//           />
//         </div>

//         {/* "no_of_Paid_Leave" + "employee_Type" in same row */}
//         <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
//           <FormField
//             label="No. of Paid Leaves"
//             name="no_of_Paid_Leave"
//             placeholder="e.g. 12"
//             type="number"
//           />
//           <FormSelect
//             label="Employee Type"
//             name="employee_Type"
//             loading={loadingEmploymentTypes}
//             options={[
//               { value: "", label: "Select Employee Type" },
//               ...employmentTypes,
//             ]}
//           />
//         </div>
//       </div>

//       {/* Next row: (First & Last Name) */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         <FormField
//           label="First Name"
//           name="firstName"
//           placeholder="Enter First Name"
//         />
//         <FormField label="Last Name" name="lastName" placeholder="Enter Last Name" />
//       </div>

//       {/* Next row: (Phone, Gender) */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         <FormField label="Phone" name="phone" placeholder="Enter phone number" />
//         <FormSelect
//           label="Gender"
//           name="gender"
//           options={[
//             { value: "", label: "Select" },
//             { value: "Male", label: "Male" },
//             { value: "Female", label: "Female" },
//             { value: "Other", label: "Other" },
//           ]}
//         />
//       </div>

//       {/* Next row: (Personal Email, DOB, Permanent Address) */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormField
//           label="Personal Email"
//           name="personalEmail"
//           placeholder="test@gmail.com"
//         />
//         <FormField label="DOB" name="dob" type="date" />
//         <FormTextArea
//           label="Permanent Address"
//           name="permanentAddress"
//           placeholder="Write Address..."
//         />
//       </div>

//       {/* Next row: (Work Email, DOJ, Department) */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormField
//           label="Work Email"
//           name="workEmail"
//           placeholder="test@company.com"
//         />
//         <FormField label="DOJ" name="doj" type="date" />
//         <FormSelect
//           label="Department"
//           name="department"
//           loading={loadingDepartments}
//           options={[
//             { value: "", label: "Select Department" },
//             ...departments,
//           ]}
//         />
//       </div>

//       {/* Next row: (Role, Assign Manager, Designation) */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormSelect
//           label="Role"
//           name="role"
//           loading={loadingPermissionRoles}
//           options={[
//             { value: "", label: "Select Role" },
//             ...(permissionRoles?.map((r) => ({
//               value: r.role_name,
//               label: r.role_name,
//             })) || []),
//           ]}
//         />
//         <FormMultiSelect
//           label="Assign Manager"
//           name="assignManager"
//           loading={loadingAllEmployees}
//           options={allEmployees}
//         />
//         <FormSelect
//           label="Designation"
//           name="designation"
//           loading={loadingDesignations}
//           options={[
//             { value: "", label: "Select Designation" },
//             ...designations,
//           ]}
//         />
//       </div>

//       {/* Next row: (Employee ID, Salary, OTP) */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormField label="Employee ID" name="employeeId" placeholder="R10004" />
//         <FormField label="Salary" name="salary" placeholder="Salary" />
//         <FormSelect
//           label="OTP Required"
//           name="otp"
//           options={[
//             { value: "", label: "Select" },
//             { value: "no", label: "No" },
//             { value: "yes", label: "Yes" },
//           ]}
//         />
//       </div>

//       {/* Next row: (Office Address, lat/long) */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormSelect
//           label="Office Address"
//           name="officeLocation"
//           loading={loadingAddresses}
//           options={[
//             { value: "", label: "Select Office Address" },
//             ...addressOptions,
//           ]}
//         />
//         <FormField label="Latitude" name="latitude" placeholder="Latitude" />
//         <FormField label="Longitude" name="longitude" placeholder="Longitude" />
//       </div>

//       {/* Shift Timings + (Optional) Additional if you want */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormSelect
//           label="Shift Timing"
//           name="shiftTiming"
//           loading={loadingShiftTimings}
//           options={[
//             { value: "", label: "Select Shift Timings" },
//             ...shiftTimings,
//           ]}
//         />
//         {/* (Optional) other fields here */}
//       </div>

//       {/* Permissions (Multi) */}
//       <div className="mt-6">
//         <FormMultiSelect
//           label="Permissions"
//           name="permissions"
//           options={availablePermission.map((p) => ({
//             value: p.permission,
//             label: p.name,
//           }))}
//         />
//       </div>

//       {/* Step Controls */}
//       <div className="flex items-center space-x-3 mt-6">
//         <button
//           type="button"
//           className="px-4 py-2 bg-gray-300 text-black rounded"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           disabled={submitting}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           {submitting ? "Submitting..." : "Next"}
//         </button>
//       </div>
//     </form>
//   );
// }

// /*****************************************************
//  * STEP 2: Qualifications & Experience
//  *****************************************************/
// function Step2QualificationsExperience({
//   onSubmitStep,
//   submitting,
//   qualificationFields,
//   removeQualification,
//   appendQualification,
//   experienceFields,
//   removeExperience,
//   appendExperience,
// }) {
//   const [scope, animate] = useAnimate();
//   const { handleSubmit } = useFormContext();

//   useEffect(() => {
//     animate([
//       [".animatable-input", { opacity: 0, x: 20 }, { duration: 0 }],
//       [".animatable-input", { opacity: 1, x: 0 }, { duration: 0.3, stagger: 0.05 }],
//     ]);
//   }, [animate]);

//   return (
//     <form ref={scope} onSubmit={handleSubmit(onSubmitStep)}>
//       {/* Qualifications */}
//       <h2 className="text-xl font-semibold mb-4">Qualifications</h2>
//       {qualificationFields.map((item, index) => (
//         <div key={item.id} className="border rounded-md p-4 mb-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
//             <FormField
//               label="Qualification Name"
//               name={`qualifications.${index}.qualificationName`}
//               placeholder="Enter Qualification Name"
//             />
//             <FormField
//               label="University/Board"
//               name={`qualifications.${index}.universityBoard`}
//               placeholder="Enter University/Board"
//             />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <FormField
//               label="Total Marks"
//               name={`qualifications.${index}.totalMarks`}
//               placeholder="Total Marks"
//               type="number"
//             />
//             <FormField
//               label="Passing Year"
//               name={`qualifications.${index}.passingYear`}
//               placeholder="YYYY"
//               type="number"
//             />
//             <FormField
//               label="Percentage/CGPA"
//               name={`qualifications.${index}.percentageCgpa`}
//               placeholder="e.g. 80% or 8.0"
//             />
//           </div>
//           {/* Remove / Add More */}
//           <div className="flex items-center space-x-3 mt-4">
//             {qualificationFields.length > 1 && (
//               <button
//                 type="button"
//                 className="px-4 py-2 bg-red-500 text-white rounded"
//                 onClick={() => removeQualification(index)}
//               >
//                 Remove
//               </button>
//             )}
//             {index === qualificationFields.length - 1 &&
//               qualificationFields.length < 20 && (
//                 <button
//                   type="button"
//                   onClick={() =>
//                     appendQualification({
//                       qualificationName: "",
//                       universityBoard: "",
//                       totalMarks: "",
//                       passingYear: "",
//                       percentageCgpa: "",
//                     })
//                   }
//                   className="px-4 py-2 bg-blue-600 text-white rounded"
//                 >
//                   Add More
//                 </button>
//               )}
//           </div>
//         </div>
//       ))}

//       {/* Experience */}
//       <h2 className="text-xl font-semibold mb-4">Experience</h2>
//       {experienceFields.map((item, index) => (
//         <div key={item.id} className="border rounded-md p-4 mb-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
//             <FormField
//               label="Company Name"
//               name={`experiences.${index}.companyName`}
//               placeholder="Enter Company Name"
//             />
//             <FormField
//               label="Designation"
//               name={`experiences.${index}.experienceDesignation`}
//               placeholder="Enter Designation"
//             />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <FormField
//               label="Total Years of Experience"
//               name={`experiences.${index}.totalExperience`}
//               placeholder="e.g. 3"
//               type="number"
//             />
//             <FormField
//               label="Start Date"
//               name={`experiences.${index}.startDate`}
//               type="date"
//             />
//             <FormField
//               label="End Date"
//               name={`experiences.${index}.endDate`}
//               type="date"
//             />
//           </div>
//           {/* Remove / Add More */}
//           <div className="flex items-center space-x-3 mt-4">
//             {experienceFields.length > 1 && (
//               <button
//                 type="button"
//                 className="px-4 py-2 bg-red-500 text-white rounded"
//                 onClick={() => removeExperience(index)}
//               >
//                 Remove
//               </button>
//             )}
//             {index === experienceFields.length - 1 &&
//               experienceFields.length < 20 && (
//                 <button
//                   type="button"
//                   onClick={() =>
//                     appendExperience({
//                       companyName: "",
//                       experienceDesignation: "",
//                       totalExperience: "",
//                       startDate: "",
//                       endDate: "",
//                     })
//                   }
//                   className="px-4 py-2 bg-blue-600 text-white rounded"
//                 >
//                   Add More
//                 </button>
//               )}
//           </div>
//         </div>
//       ))}

//       {/* Controls */}
//       <div className="flex items-center space-x-3 mt-6">
//         <button
//           type="button"
//           className="px-4 py-2 bg-gray-300 text-black rounded"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           disabled={submitting}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           {submitting ? "Submitting..." : "Next"}
//         </button>
//       </div>
//     </form>
//   );
// }

// /*****************************************************
//  * STEP 3: Personal Details (Bank Info, Documents, etc.)
//  *****************************************************/
// function Step3PersonalDetails({
//   onSubmitStep,
//   submitting,
//   documentFields,
//   removeDocument,
//   appendDocument,
// }) {
//   const [scope, animate] = useAnimate();
//   const { handleSubmit } = useFormContext();

//   useEffect(() => {
//     animate([
//       [".animatable-input", { opacity: 0, x: 20 }, { duration: 0 }],
//       [".animatable-input", { opacity: 1, x: 0 }, { duration: 0.3, stagger: 0.05 }],
//     ]);
//   }, [animate]);

//   return (
//     <form ref={scope} onSubmit={handleSubmit(onSubmitStep)}>
//       {/* PAN & Aadhaar */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <FormField label="PAN Number" name="panNumber" placeholder="ABCDE1234F" />
//         <FormField
//           label="Aadhaar Number"
//           name="aadhaarNumber"
//           placeholder="12-digit Aadhaar"
//         />
//       </div>

//       {/* Bank Details */}
//       <h2 className="text-xl font-semibold mt-8 mb-4">Bank Details</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <FormField
//           label="Bank Holder Name"
//           name="bankHolderName"
//           placeholder="Account Holder Name"
//         />
//         <FormField label="Bank Name" name="bankName" placeholder="e.g. State Bank" />
//         <FormField
//           label="Bank Account No."
//           name="bankAccountNo"
//           placeholder="1234567890"
//         />
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormField
//           label="Confirm Bank Account No."
//           name="confirmBankAccountNo"
//           placeholder="Re-enter Account No."
//         />
//         <FormField label="IFSC Code" name="ifscCode" placeholder="ABCD0123456" />

//         {/* Documents */}
//         <div>
//           <label className="block font-medium mb-1">Upload Documents</label>
//           {documentFields.map((item, index) => (
//             <DocumentUploader
//               key={item.id}
//               index={index}
//               removeDocument={removeDocument}
//               totalDocs={documentFields.length}
//             />
//           ))}
//           {documentFields.length < 20 && (
//             <button
//               type="button"
//               onClick={() => appendDocument({ name: "", file: null })}
//               className="px-4 py-2 bg-blue-600 text-white rounded mt-2"
//             >
//               Add More Documents
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Step Controls */}
//       <div className="flex items-center space-x-3 mt-6">
//         <button
//           type="button"
//           className="px-4 py-2 bg-gray-300 text-black rounded"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           disabled={submitting}
//           className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//         >
//           {submitting ? "Saving..." : "Save"}
//         </button>
//       </div>
//     </form>
//   );
// }

// /*****************************************************
//  * Document Uploader Sub-component
//  *****************************************************/
// function DocumentUploader({ index, removeDocument, totalDocs }) {
//   const { register, setValue, watch } = useFormContext();
//   const docName = watch(`documents.${index}.name`);
//   const docFile = watch(`documents.${index}.file`);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setValue(`documents.${index}.file`, file, { shouldValidate: true });
//     }
//   };

//   return (
//     <div className="border rounded p-3 mb-2">
//       <label className="block text-sm font-medium mb-1">
//         Document Name <span className="text-red-500">*</span>
//       </label>
//       <input
//         className="animatable-input w-full px-3 py-2 border border-gray-300 rounded mb-2"
//         placeholder="Enter Document Name"
//         {...register(`documents.${index}.name`)}
//       />
//       <label className="block text-sm font-medium mb-1">File</label>
//       <input
//         type="file"
//         accept=".png,.jpg,.jpeg,.pdf"
//         onChange={handleFileChange}
//       />

//       {/* If we have a file chosen, show a small preview or remove icon */}
//       {docFile && (
//         <div className="mt-2 flex items-center space-x-2">
//           <FaTrash
//             className="cursor-pointer text-red-500"
//             onClick={() => setValue(`documents.${index}.file`, null)}
//           />
//           <span className="text-sm">{docFile.name}</span>
//         </div>
//       )}

//       {/* Remove Document button */}
//       {totalDocs > 1 && (
//         <button
//           type="button"
//           onClick={() => removeDocument(index)}
//           className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded flex items-center"
//         >
//           <FaTrash className="mr-1" />
//           Remove Document
//         </button>
//       )}
//     </div>
//   );
// }

// /*****************************************************
//  * REUSABLE FORM COMPONENTS (TextField, Select, TextArea, MultiSelect)
//  *****************************************************/
// function FormField({ label, name, placeholder, type = "text" }) {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();
//   const error = errors?.[name]?.message;

//   return (
//     <div>
//       <label className="block font-medium mb-1">{label}</label>
//       <input
//         type={type}
//         placeholder={placeholder}
//         {...register(name)}
//         className={`animatable-input w-full px-3 py-2 border ${
//           error ? "border-red-500" : "border-gray-300"
//         } rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
//       />
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// }

// function FormSelect({ label, name, options = [], loading = false }) {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();
//   const error = errors?.[name]?.message;

//   return (
//     <div>
//       <label className="block font-medium mb-1">{label}</label>
//       <select
//         {...register(name)}
//         className={`animatable-input w-full px-3 py-2 border ${
//           error ? "border-red-500" : "border-gray-300"
//         } rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
//       >
//         {loading && <option value="">Loading...</option>}
//         {!loading &&
//           options.map((opt, idx) => (
//             <option key={idx} value={opt.value}>
//               {opt.label}
//             </option>
//           ))}
//       </select>
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// }

// function FormTextArea({ label, name, placeholder }) {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();
//   const error = errors?.[name]?.message;

//   return (
//     <div>
//       <label className="block font-medium mb-1">{label}</label>
//       <textarea
//         rows={3}
//         placeholder={placeholder}
//         {...register(name)}
//         className={`animatable-input w-full px-3 py-2 border ${
//           error ? "border-red-500" : "border-gray-300"
//         } rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
//       />
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// }

// function FormMultiSelect({ label, name, options = [], loading = false }) {
//   const {
//     control,
//     formState: { errors },
//   } = useFormContext();
//   const error = errors?.[name]?.message;

//   return (
//     <div>
//       <label className="block font-medium mb-1">{label}</label>
//       <Controller
//         name={name}
//         control={control}
//         render={({ field }) => {
//           const { onChange, value } = field;
//           const selected = options.filter((opt) =>
//             (value || []).includes(opt.value)
//           );
//           return (
//             <Select
//               isMulti
//               options={options}
//               isLoading={loading}
//               onChange={(selectedOptions) =>
//                 onChange(selectedOptions.map((o) => o.value))
//               }
//               value={selected}
//               className="animatable-input"
//               styles={{
//                 control: (base) => ({
//                   ...base,
//                   borderColor: error ? "red" : base.borderColor,
//                 }),
//               }}
//             />
//           );
//         }}
//       />
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// }

// import React, { useState, useEffect, useCallback } from "react";
// import { AnimatePresence, motion, useAnimate } from "framer-motion";
// import {
//   useForm,
//   FormProvider,
//   useFieldArray,
//   useFormContext,
//   Controller,
// } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
// import { toast } from "react-hot-toast";
// import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";
// import Select from "react-select";

// // Zustand store & createEmployee service
// import useEmployeeStore from "../../store/useEmployeeStore.js";
// import { createEmployee } from "../../service/employeeService.js";

// // Your ConfirmationDialog
// import ConfirmationDialog from "../common/ConfirmationDialog";

// // The old "availablePermission" array or dynamic from store
// import { availablePermission } from "./AvailablePermissions.jsx";

// // -------------- YUP SCHEMA --------------
// const FILE_SIZE_LIMIT = 5 * 1024 * 1024;
// const lettersOnlyRegex = /^(?=.*[A-Za-z])[A-Za-z\s]+$/;

// /**
//  * The schema uses the backend’s field names:
//  *   - first_Name
//  *   - last_Name
//  *   - personal_Email_Id
//  *   - working_Email_Id
//  *   - date_of_Joining
//  *   - departmentAllocated
//  *   - permission_role
//  *   - no_of_Paid_Leave
//  *   - employee_Type
//  *   - mobile_No
//  *   - ...
//  */
// const validationSchema = Yup.object().shape({
//   first_Name: Yup.string()
//     .matches(lettersOnlyRegex, "First Name can only contain letters and spaces")
//     .required("First Name is required"),
//   last_Name: Yup.string().matches(
//     lettersOnlyRegex,
//     "Last Name can only contain letters and spaces"
//   ),
//   mobile_No: Yup.string()
//     .matches(/^\d{10}$/, "Phone Number must be exactly 10 digits")
//     .required("Phone Number is required"),
//   gender: Yup.string()
//     .required("Gender is required")
//     .oneOf(["Male", "Female", "Other"], "Invalid Gender selection"),
//   personal_Email_Id: Yup.string()
//     .email("Invalid Email")
//     .required("Personal Email is required"),
//   dob: Yup.date().required("Date of Birth is required"),
//   office_Address: Yup.string().required("Office address is required"),
//   working_Email_Id: Yup.string()
//     .email("Invalid Email")
//     .required("Working Email is required"),
//   date_of_Joining: Yup.date()
//     .max(new Date(), "Date of Joining cannot be in the future")
//     .required("Date of Joining is required"),
//   departmentAllocated: Yup.string().required("Department is required"),
//   permission_role: Yup.string().required("Role Name is required"),
//   no_of_Paid_Leave: Yup.number()
//     .typeError("No. of Paid Leave must be a number")
//     .min(0, "Cannot be negative")
//     .required("No. of Paid Leaves is required"),
//   employee_Type: Yup.string().required("Employee Type is required"),
//   employee_Id: Yup.string().required("Employee ID is required"),
//   salary: Yup.number()
//     .typeError("Salary must be a number")
//     .min(0, "Cannot be negative")
//     .required("Salary is required"),
//   otp: Yup.string()
//     .oneOf(["yes", "no"], "Invalid OTP selection")
//     .required("OTP selection is required"),
//   latitude: Yup.string().required("Latitude is required"),
//   longitude: Yup.string().required("Longitude is required"),
//   shift_Timing: Yup.string().required("Shift Timing is required"),
//   assigned_to: Yup.array()
//     .of(Yup.string())
//     .min(1, "At least one Manager must be assigned"),
//   // user_Avatar is optional but has size/type checks
//   user_Avatar: Yup.mixed()
//     .test("fileSize", "Profile image too large (max 5MB)", (file) => {
//       if (!file) return true;
//       return file.size <= FILE_SIZE_LIMIT;
//     })
//     .test("fileType", "Only JPEG/PNG allowed", (file) => {
//       if (!file) return true;
//       return ["image/jpeg", "image/png"].includes(file.type);
//     }),
//   // permissions array
//   permission: Yup.array().min(1, "At least one permission must be selected"),

//   // Step 2
//   qualifications: Yup.array().of(
//     Yup.object().shape({
//       qualificationName: Yup.string().nullable(),
//       universityBoard: Yup.string().nullable(),
//       totalMarks: Yup.number().nullable().min(0),
//       passingYear: Yup.number().nullable().min(0),
//       percentageCgpa: Yup.string().nullable(),
//     })
//   ),
//   experiences: Yup.array().of(
//     Yup.object().shape({
//       companyName: Yup.string().nullable(),
//       designation: Yup.string()
//         .matches(lettersOnlyRegex, "Designation can only contain letters/spaces")
//         .nullable(),
//       startDate: Yup.date().nullable(),
//       endDate: Yup.date().nullable(),
//     })
//   ),

//   // Step 3
//   pan_No: Yup.string()
//     .required("PAN is required")
//     .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid format e.g. ABCDE1234F"),
//   adhaar_Number: Yup.string()
//     .required("Aadhaar is required")
//     .matches(/^\d{12}$/, "Must be exactly 12 digits"),
//   bank_Holder_Name: Yup.string()
//     .matches(lettersOnlyRegex, "Holder Name can only contain letters/spaces")
//     .required("Bank Holder Name is required"),
//   bank_Name: Yup.string()
//     .matches(lettersOnlyRegex, "Bank Name can only contain letters/spaces")
//     .required("Bank Name is required"),
//   bank_Account_No: Yup.string()
//     .matches(/^[0-9]{9,18}$/, "Must be 9 to 18 digits")
//     .required("Bank Account No is required"),
//   ifsc_Code: Yup.string()
//     .required("IFSC code is required")
//     .matches(/^[A-Z0-9]{11}$/, "Must be 11 chars (letters/numbers)"),
//   documents: Yup.array().of(
//     Yup.object().shape({
//       name: Yup.string().required("Document name is required"),
//       file: Yup.mixed()
//         .test("fileSize", "Max 5MB", (f) => {
//           if (!f) return true;
//           return f.size <= FILE_SIZE_LIMIT;
//         })
//         .test("fileType", "Only JPG/PNG/PDF allowed", (f) => {
//           if (!f) return true;
//           return ["image/jpeg", "image/png", "application/pdf"].includes(f.type);
//         }),
//     })
//   ),
// });

// export default function EmployeeFormTabs({ formTitle = "Employee Form" }) {
//   const {
//     shiftTimings,
//     employmentTypes,
//     departments,
//     allEmployees,
//     permissionRoles,
//     addressOptions,
//     designations,

//     loadingShiftTimings,
//     loadingEmploymentTypes,
//     loadingDepartments,
//     loadingAllEmployees,
//     loadingPermissionRoles,
//     loadingAddresses,
//     loadingDesignations,

//     loadShiftTimings,
//     loadEmploymentTypes,
//     loadDepartments,
//     loadAllEmployees,
//     loadPermissionRoles,
//     loadCompanyAddresses,
//     loadDesignations,
//   } = useEmployeeStore();

//   const [activeTab, setActiveTab] = useState(0);
//   const [confirmationOpen, setConfirmationOpen] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     // Load all data from APIs
//     loadShiftTimings();
//     loadEmploymentTypes();
//     loadDepartments();
//     loadAllEmployees();
//     loadPermissionRoles();
//     loadCompanyAddresses();
//     loadDesignations();
//     // eslint-disable-next-line
//   }, []);

//   const methods = useForm({
//     resolver: yupResolver(validationSchema),
//     defaultValues: {
//       // Step 1
//       first_Name: "",
//       last_Name: "",
//       mobile_No: "",
//       gender: "",
//       personal_Email_Id: "",
//       dob: "",
//       office_Address: "",
//       working_Email_Id: "",
//       date_of_Joining: "",
//       departmentAllocated: "",
//       permission_role: "",
//       no_of_Paid_Leave: 0,
//       employee_Type: "",
//       employee_Id: "",
//       salary: "",
//       otp: "no",
//       latitude: "",
//       longitude: "",
//       shift_Timing: "",
//       assigned_to: [],
//       user_Avatar: null,
//       // permission must match "permission" in backend
//       permission: [],

//       // Step 2
//       qualifications: [
//         {
//           qualificationName: "",
//           universityBoard: "",
//           totalMarks: "",
//           passingYear: "",
//           percentageCgpa: "",
//         },
//       ],
//       experiences: [
//         {
//           companyName: "",
//           designation: "",
//           startDate: "",
//           endDate: "",
//         },
//       ],

//       // Step 3
//       pan_No: "",
//       adhaar_Number: "",
//       bank_Holder_Name: "",
//       bank_Name: "",
//       bank_Account_No: "",
//       ifsc_Code: "",
//       documents: [
//         {
//           name: "",
//           file: null,
//         },
//       ],
//     },
//   });

//   const {
//     handleSubmit,
//     watch,
//     setValue,
//     getValues,
//     control,
//     formState: { isValid },
//   } = methods;

//   // For Step 2 and Step 3 field arrays
//   const {
//     fields: qualificationFields,
//     append: appendQualification,
//     remove: removeQualification,
//   } = useFieldArray({ control, name: "qualifications" });

//   const {
//     fields: experienceFields,
//     append: appendExperience,
//     remove: removeExperience,
//   } = useFieldArray({ control, name: "experiences" });

//   const {
//     fields: documentFields,
//     append: appendDocument,
//     remove: removeDocument,
//   } = useFieldArray({ control, name: "documents" });

//   // Step handling
//   const onSubmitStep = (data) => {
//     if (activeTab < 2) {
//       setActiveTab(activeTab + 1);
//     } else {
//       setConfirmationOpen(true); // final
//     }
//   };

//   const handleConfirmSubmit = async () => {
//     setConfirmationOpen(false);
//     setSubmitting(true);
//     try {
//       const vals = getValues();
//       // Convert to FormData
//       const formData = new FormData();

//       // Omit arrays for special handling
//       const omitKeys = [
//         "permission",
//         "assigned_to",
//         "qualifications",
//         "experiences",
//         "documents",
//         "user_Avatar",
//       ];
//       Object.keys(vals).forEach((key) => {
//         if (!omitKeys.includes(key)) {
//           const value = vals[key];
//           if (value !== null && value !== "") {
//             formData.append(key, value);
//           }
//         }
//       });

//       // assigned_to => assigned_to[0], assigned_to[1], ...
//       vals.assigned_to.forEach((managerId, idx) => {
//         formData.append(`assigned_to[${idx}]`, managerId);
//       });

//       // permission => permission[0], permission[1], ...
//       vals.permission.forEach((perm, idx) => {
//         formData.append(`permission[${idx}]`, perm);
//       });

//       // user_Avatar
//       if (vals.user_Avatar) {
//         formData.append("user_Avatar", vals.user_Avatar);
//       }

//       // documents => documents[0][name], documents[0][file], ...
//       vals.documents.forEach((doc, idx) => {
//         if (doc.name) {
//           formData.append(`documents[${idx}][name]`, doc.name);
//         }
//         if (doc.file) {
//           formData.append(`documents[${idx}][file]`, doc.file);
//         }
//       });

//       // qualifications => pass them as is
//       vals.qualifications.forEach((qual, index) => {
//         formData.append(
//           `qualifications[${index}][qualificationName]`,
//           qual.qualificationName || ""
//         );
//         formData.append(
//           `qualifications[${index}][universityBoard]`,
//           qual.universityBoard || ""
//         );
//         formData.append(
//           `qualifications[${index}][totalMarks]`,
//           qual.totalMarks || ""
//         );
//         formData.append(`qualifications[${index}][year]`, qual.passingYear || "");
//         formData.append(
//           `qualifications[${index}][percentageCgpa]`,
//           qual.percentageCgpa || ""
//         );
//       });

//       // experiences => pass them as is
//       vals.experiences.forEach((exp, index) => {
//         formData.append(`experiences[${index}][companyName]`, exp.companyName || "");
//         formData.append(
//           `experiences[${index}][designation]`,
//           exp.designation || ""
//         );
//         formData.append(`experiences[${index}][startDate]`, exp.startDate || "");
//         formData.append(`experiences[${index}][endDate]`, exp.endDate || "");
//       });

//       // POST
//       const response = await createEmployee(formData);
//       if (response.success) {
//         toast.success("User registered successfully!");
//       } else {
//         toast.error("Registration failed: " + response.message);
//       }
//     } catch (err) {
//       if (err.response?.data?.message) {
//         toast.error("Registration failed: " + err.response.data.message);
//       } else {
//         toast.error("Registration failed: " + err.message);
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleCancelSubmit = () => {
//     setConfirmationOpen(false);
//   };

//   return (
//     <FormProvider {...methods}>
//       <div className="employee-form">
//         <div className="bg-white rounded-md shadow p-6">
//           <h1 className="text-2xl font-bold text-center mb-6">{formTitle}</h1>

//           {/* Tabs Header */}
//           <div className="flex space-x-2 border-b pb-2">
//             <TabButton
//               label="Employee Details"
//               isActive={activeTab === 0}
//               onClick={() => setActiveTab(0)}
//             />
//             <TabButton
//               label="Qualifications & Experience"
//               isActive={activeTab === 1}
//               onClick={() => setActiveTab(1)}
//             />
//             <TabButton
//               label="Personal Details"
//               isActive={activeTab === 2}
//               onClick={() => setActiveTab(2)}
//             />
//           </div>

//           {/* Content */}
//           <div className="mt-4">
//             <AnimatePresence mode="wait">
//               {activeTab === 0 && (
//                 <motion.div
//                   key="step1"
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                 >
//                   <Step1 onSubmitStep={onSubmitStep} submitting={submitting} />
//                 </motion.div>
//               )}
//               {activeTab === 1 && (
//                 <motion.div
//                   key="step2"
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                 >
//                   <Step2
//                     onSubmitStep={onSubmitStep}
//                     submitting={submitting}
//                     qualificationFields={qualificationFields}
//                     appendQualification={appendQualification}
//                     removeQualification={removeQualification}
//                     experienceFields={experienceFields}
//                     appendExperience={appendExperience}
//                     removeExperience={removeExperience}
//                   />
//                 </motion.div>
//               )}
//               {activeTab === 2 && (
//                 <motion.div
//                   key="step3"
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                 >
//                   <Step3
//                     onSubmitStep={onSubmitStep}
//                     submitting={submitting}
//                     documentFields={documentFields}
//                     appendDocument={appendDocument}
//                     removeDocument={removeDocument}
//                   />
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>

//       {/* Confirmation Dialog */}
//       <ConfirmationDialog
//         open={confirmationOpen}
//         title="Are you sure?"
//         message="Do you want to add this user?"
//         onConfirm={handleConfirmSubmit}
//         onCancel={handleCancelSubmit}
//         confirmText="Yes"
//         cancelText="No"
//       />
//     </FormProvider>
//   );
// }

// /* A simple TabButton */
// function TabButton({ label, isActive, onClick }) {
//   return (
//     <button
//       className={`px-4 py-2 ${
//         isActive ? "border-b-2 border-blue-500" : ""
//       } focus:outline-none`}
//       onClick={onClick}
//     >
//       {label}
//     </button>
//   );
// }

// /* STEP 1 Example */
// function Step1({ onSubmitStep, submitting }) {
//   const [scope, animate] = useAnimate();
//   const { register, handleSubmit, watch, setValue } = useFormContext();
//   const [avatarPreview, setAvatarPreview] = useState(null);

//   // Data from Zustand store
//   const addressOptions = useEmployeeStore((s) => s.addressOptions);
//   const loadingAddresses = useEmployeeStore((s) => s.loadingAddresses);
//   const departments = useEmployeeStore((s) => s.departments);
//   const loadingDepartments = useEmployeeStore((s) => s.loadingDepartments);
//   const shiftTimings = useEmployeeStore((s) => s.shiftTimings);
//   const loadingShiftTimings = useEmployeeStore((s) => s.loadingShiftTimings);
//   const employmentTypes = useEmployeeStore((s) => s.employmentTypes);
//   const loadingEmploymentTypes = useEmployeeStore((s) => s.loadingEmploymentTypes);
//   const permissionRoles = useEmployeeStore((s) => s.permissionRoles);
//   const loadingPermissionRoles = useEmployeeStore((s) => s.loadingPermissionRoles);
//   const designations = useEmployeeStore((s) => s.designations);
//   const loadingDesignations = useEmployeeStore((s) => s.loadingDesignations);
//   const allEmployees = useEmployeeStore((s) => s.allEmployees);
//   const loadingAllEmployees = useEmployeeStore((s) => s.loadingAllEmployees);

//   // Animate
//   useEffect(() => {
//     animate([
//       [".animatable-input", { opacity: 0, x: 20 }, { duration: 0 }],
//       [".animatable-input", { opacity: 1, x: 0 }, { duration: 0.2, stagger: 0.05 }],
//     ]);
//   }, [animate]);

//   // Watch office_Address => set lat/long from addressOptions
//   const watchOfficeAddress = watch("office_Address");
//   useEffect(() => {
//     const found = addressOptions.find((a) => a.value === watchOfficeAddress);
//     if (found) {
//       setValue("latitude", found.latitude || "");
//       setValue("longitude", found.longitude || "");
//     }
//   }, [watchOfficeAddress, addressOptions, setValue]);

//   // Watch permission_role => auto-set permission if needed
//   const watchPermissionRole = watch("permission_role");
//   useEffect(() => {
//     const foundRole = permissionRoles.find((r) => r.role_name === watchPermissionRole);
//     if (foundRole?.permission) {
//       // set permission array
//       const perms = foundRole.permission.map((p) => p.permission);
//       setValue("permission", perms);
//     } else {
//       setValue("permission", []);
//     }
//   }, [watchPermissionRole, permissionRoles, setValue]);

//   // Upload avatar
//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setValue("user_Avatar", file);
//       setAvatarPreview(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <form ref={scope} onSubmit={handleSubmit(onSubmitStep)}>
//       {/* Profile Image + no_of_Paid_Leave + employee_Type in one row */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Avatar */}
//         <div className="flex flex-col items-center">
//           <label className="mb-2 font-semibold">Profile Image</label>
//           <div
//             className="w-32 h-32 border rounded-full overflow-hidden flex items-center justify-center"
//             onClick={() => document.getElementById("avatarInput")?.click()}
//             style={{ cursor: "pointer" }}
//           >
//             {avatarPreview ? (
//               <img src={avatarPreview} alt="avatar" className="object-cover w-full h-full" />
//             ) : (
//               <span className="text-gray-400 text-sm">No Image</span>
//             )}
//           </div>
//           <input
//             type="file"
//             id="avatarInput"
//             style={{ display: "none" }}
//             accept="image/png, image/jpeg"
//             onChange={handleAvatarChange}
//           />
//         </div>

//         {/* no_of_Paid_Leave */}
//         <div>
//           <FormField
//             label="No. of Paid Leaves"
//             name="no_of_Paid_Leave"
//             placeholder="e.g. 12"
//             type="number"
//           />
//         </div>

//         {/* employee_Type */}
//         <div>
//           <label className="block font-medium mb-1">Employee Type</label>
//           <select
//             {...register("employee_Type")}
//             className="animatable-input w-full px-3 py-2 border border-gray-300 rounded"
//           >
//             {loadingEmploymentTypes && <option value="">Loading...</option>}
//             {!loadingEmploymentTypes &&
//               employmentTypes.map((e) => (
//                 <option key={e.value} value={e.value}>
//                   {e.label}
//                 </option>
//               ))}
//           </select>
//         </div>
//       </div>

//       {/* Next row: first_Name, last_Name */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
//         <FormField label="First Name" name="first_Name" placeholder="Enter first name" />
//         <FormField label="Last Name" name="last_Name" placeholder="Enter last name" />
//       </div>

//       {/* Next row: phone => mobile_No, gender */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
//         <FormField label="Phone" name="mobile_No" placeholder="10-digit" />
//         <FormSelect
//           label="Gender"
//           name="gender"
//           options={[
//             { value: "", label: "Select" },
//             { value: "Male", label: "Male" },
//             { value: "Female", label: "Female" },
//             { value: "Other", label: "Other" },
//           ]}
//         />
//       </div>

//       {/* Next row: personal_Email_Id, dob, office_Address */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
//         <FormField
//           label="Personal Email"
//           name="personal_Email_Id"
//           placeholder="example@gmail.com"
//         />
//         <FormField label="DOB" name="dob" type="date" />
//         <FormTextArea label="Office Address" name="office_Address" placeholder="Office address..." />
//       </div>

//       {/* Next row: working_Email_Id, date_of_Joining, departmentAllocated */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
//         <FormField
//           label="Working Email"
//           name="working_Email_Id"
//           placeholder="example@company.com"
//         />
//         <FormField label="Date of Joining" name="date_of_Joining" type="date" />
//         <FormSelect
//           label="Department"
//           name="departmentAllocated"
//           options={[{ value: "", label: "Select" }, ...departments]}
//           loading={loadingDepartments}
//         />
//       </div>

//       {/* Next row: permission_role, assigned_to, designation */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
//         <FormSelect
//           label="Role"
//           name="permission_role"
//           loading={loadingPermissionRoles}
//           options={[
//             { value: "", label: "Select" },
//             ...permissionRoles.map((r) => ({ value: r.role_name, label: r.role_name })),
//           ]}
//         />
//         <FormMultiSelect
//           label="Assign Manager"
//           name="assigned_to"
//           options={allEmployees}
//           loading={loadingAllEmployees}
//         />
//         <FormSelect
//           label="Designation"
//           name="designation"
//           loading={loadingDesignations}
//           options={[
//             { value: "", label: "Select" },
//             ...designations,
//           ]}
//         />
//       </div>

//       {/* Next row: employee_Id, salary, otp */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
//         <FormField
//           label="Employee ID"
//           name="employee_Id"
//           placeholder="e.g. EMP1234"
//         />
//         <FormField label="Salary" name="salary" placeholder="Salary" type="number" />
//         <FormSelect
//           label="OTP Required"
//           name="otp"
//           options={[
//             { value: "", label: "Select" },
//             { value: "no", label: "No" },
//             { value: "yes", label: "Yes" },
//           ]}
//         />
//       </div>

//       {/* Next row: shift_Timing, latitude, longitude */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
//         <FormSelect
//           label="Shift Timing"
//           name="shift_Timing"
//           options={shiftTimings}
//           loading={loadingShiftTimings}
//         />
//         <FormField label="Latitude" name="latitude" placeholder="0.0" />
//         <FormField label="Longitude" name="longitude" placeholder="0.0" />
//       </div>

//       {/* Permissions Multi */}
//       <div className="mt-4">
//         <FormMultiSelect
//           label="Permissions"
//           name="permission"
//           options={availablePermission.map((p) => ({
//             value: p.permission,
//             label: p.name,
//           }))}
//         />
//       </div>

//       {/* Step controls */}
//       <div className="flex space-x-3 mt-6">
//         <button type="button" className="px-4 py-2 bg-gray-300 text-black rounded">
//           Cancel
//         </button>
//         <button
//           type="submit"
//           disabled={submitting}
//           className="px-4 py-2 bg-blue-600 text-white rounded"
//         >
//           {submitting ? "Submitting..." : "Next"}
//         </button>
//       </div>
//     </form>
//   );
// }

// function Step2({
//   onSubmitStep,
//   submitting,
//   qualificationFields,
//   removeQualification,
//   appendQualification,
//   experienceFields,
//   removeExperience,
//   appendExperience,
// }) {
//   const { handleSubmit } = useFormContext();
//   return (
//     <form onSubmit={handleSubmit(onSubmitStep)}>
//       <h2 className="text-lg font-semibold mb-2">Qualifications</h2>
//       {qualificationFields.map((q, idx) => (
//         <div key={q.id} className="border p-4 rounded mb-4">
//           <FormField
//             label="Qualification Name"
//             name={`qualifications.${idx}.qualificationName`}
//             placeholder="e.g. B.Tech"
//           />
//           <FormField
//             label="University/Board"
//             name={`qualifications.${idx}.universityBoard`}
//             placeholder="ABC University"
//           />
//           <FormField
//             label="Total Marks"
//             name={`qualifications.${idx}.totalMarks`}
//             type="number"
//           />
//           <FormField
//             label="Passing Year"
//             name={`qualifications.${idx}.passingYear`}
//             type="number"
//           />
//           <FormField
//             label="Percentage/CGPA"
//             name={`qualifications.${idx}.percentageCgpa`}
//           />
//           <div className="flex space-x-3 mt-2">
//             {qualificationFields.length > 1 && (
//               <button
//                 type="button"
//                 onClick={() => removeQualification(idx)}
//                 className="px-3 py-1 bg-red-500 text-white rounded"
//               >
//                 Remove
//               </button>
//             )}
//             {idx === qualificationFields.length - 1 && (
//               <button
//                 type="button"
//                 onClick={() =>
//                   appendQualification({
//                     qualificationName: "",
//                     universityBoard: "",
//                     totalMarks: "",
//                     passingYear: "",
//                     percentageCgpa: "",
//                   })
//                 }
//                 className="px-3 py-1 bg-blue-500 text-white rounded"
//               >
//                 Add
//               </button>
//             )}
//           </div>
//         </div>
//       ))}

//       <h2 className="text-lg font-semibold mb-2 mt-6">Experiences</h2>
//       {experienceFields.map((exp, idx) => (
//         <div key={exp.id} className="border p-4 rounded mb-4">
//           <FormField
//             label="Company Name"
//             name={`experiences.${idx}.companyName`}
//             placeholder="ABC Corp"
//           />
//           <FormField
//             label="Designation"
//             name={`experiences.${idx}.designation`}
//             placeholder="Software Engineer"
//           />
//           <FormField
//             label="Start Date"
//             name={`experiences.${idx}.startDate`}
//             type="date"
//           />
//           <FormField
//             label="End Date"
//             name={`experiences.${idx}.endDate`}
//             type="date"
//           />
//           <div className="flex space-x-3 mt-2">
//             {experienceFields.length > 1 && (
//               <button
//                 type="button"
//                 onClick={() => removeExperience(idx)}
//                 className="px-3 py-1 bg-red-500 text-white rounded"
//               >
//                 Remove
//               </button>
//             )}
//             {idx === experienceFields.length - 1 && (
//               <button
//                 type="button"
//                 onClick={() =>
//                   appendExperience({
//                     companyName: "",
//                     designation: "",
//                     startDate: "",
//                     endDate: "",
//                   })
//                 }
//                 className="px-3 py-1 bg-blue-500 text-white rounded"
//               >
//                 Add
//               </button>
//             )}
//           </div>
//         </div>
//       ))}

//       <div className="flex space-x-3 mt-6">
//         <button type="button" className="px-4 py-2 bg-gray-300 text-black rounded">
//           Cancel
//         </button>
//         <button type="submit" disabled={submitting} className="px-4 py-2 bg-blue-600 text-white rounded">
//           Next
//         </button>
//       </div>
//     </form>
//   );
// }

// function Step3({
//   onSubmitStep,
//   submitting,
//   documentFields,
//   appendDocument,
//   removeDocument,
// }) {
//   const { handleSubmit } = useFormContext();

//   return (
//     <form onSubmit={handleSubmit(onSubmitStep)}>
//       <h2 className="text-lg font-semibold mb-2">Bank Details</h2>
//       <FormField label="PAN" name="pan_No" placeholder="ABCDE1234F" />
//       <FormField label="Aadhaar" name="adhaar_Number" placeholder="12 digits" />
//       <FormField label="Bank Holder Name" name="bank_Holder_Name" />
//       <FormField label="Bank Name" name="bank_Name" />
//       <FormField label="Bank Acct No" name="bank_Account_No" />
//       <FormField label="IFSC Code" name="ifsc_Code" />

//       <h2 className="text-lg font-semibold mb-2 mt-6">Documents</h2>
//       {documentFields.map((doc, idx) => (
//         <div key={doc.id} className="border p-4 rounded mb-4">
//           <FormField
//             label="Document Name"
//             name={`documents.${idx}.name`}
//             placeholder="Document Name"
//           />
//           <label className="block font-medium mb-1">File</label>
//           <DocumentUploader
//             index={idx}
//             removeDocument={removeDocument}
//             totalDocs={documentFields.length}
//           />
//         </div>
//       ))}
//       {documentFields.length < 20 && (
//         <button
//           type="button"
//           onClick={() => appendDocument({ name: "", file: null })}
//           className="px-3 py-1 bg-blue-500 text-white rounded"
//         >
//           Add Another Document
//         </button>
//       )}

//       <div className="flex space-x-3 mt-6">
//         <button type="button" className="px-4 py-2 bg-gray-300 text-black rounded">
//           Cancel
//         </button>
//         <button type="submit" disabled={submitting} className="px-4 py-2 bg-green-600 text-white rounded">
//           Save
//         </button>
//       </div>
//     </form>
//   );
// }

// function DocumentUploader({ index, removeDocument, totalDocs }) {
//   const { setValue, watch } = useFormContext();
//   const docFile = watch(`documents.${index}.file`);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setValue(`documents.${index}.file`, file);
//     }
//   };

//   return (
//     <>
//       <input type="file" accept=".png,.jpg,.jpeg,.pdf" onChange={handleFileChange} />
//       {docFile && (
//         <div className="mt-2 flex items-center space-x-2">
//           <FaTrash
//             className="cursor-pointer text-red-500"
//             onClick={() => setValue(`documents.${index}.file`, null)}
//           />
//           <span className="text-sm">{docFile.name}</span>
//         </div>
//       )}
//       {totalDocs > 1 && (
//         <button
//           type="button"
//           onClick={() => removeDocument(index)}
//           className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded flex items-center"
//         >
//           <FaTrash className="mr-1" />
//           Remove Document
//         </button>
//       )}
//     </>
//   );
// }

// /** Reusable Field Components */

// function FormField({ label, name, placeholder, type = "text" }) {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();
//   const error = errors?.[name];

//   return (
//     <div className="mb-3">
//       <label className="block font-medium mb-1">{label}</label>
//       <input
//         {...register(name)}
//         type={type}
//         placeholder={placeholder}
//         className={`animatable-input w-full px-3 py-2 border ${
//           error ? "border-red-500" : "border-gray-300"
//         } rounded`}
//       />
//       {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
//     </div>
//   );
// }

// function FormSelect({ label, name, options = [], loading = false }) {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();
//   const error = errors?.[name];

//   return (
//     <div className="mb-3">
//       <label className="block font-medium mb-1">{label}</label>
//       <select
//         {...register(name)}
//         className={`animatable-input w-full px-3 py-2 border ${
//           error ? "border-red-500" : "border-gray-300"
//         } rounded`}
//       >
//         {loading && <option value="">Loading...</option>}
//         {!loading &&
//           options.map((opt, idx) => (
//             <option key={idx} value={opt.value}>
//               {opt.label}
//             </option>
//           ))}
//       </select>
//       {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
//     </div>
//   );
// }

// function FormTextArea({ label, name, placeholder }) {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();
//   const error = errors?.[name];

//   return (
//     <div className="mb-3">
//       <label className="block font-medium mb-1">{label}</label>
//       <textarea
//         {...register(name)}
//         placeholder={placeholder}
//         rows={3}
//         className={`animatable-input w-full px-3 py-2 border ${
//           error ? "border-red-500" : "border-gray-300"
//         } rounded`}
//       ></textarea>
//       {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
//     </div>
//   );
// }

// function FormMultiSelect({ label, name, options = [], loading = false }) {
//   const {
//     control,
//     formState: { errors },
//   } = useFormContext();
//   const error = errors?.[name];

//   return (
//     <div className="mb-3">
//       <label className="block font-medium mb-1">{label}</label>
//       <Controller
//         name={name}
//         control={control}
//         render={({ field }) => {
//           const { onChange, value } = field;
//           const selected = options.filter((opt) => (value || []).includes(opt.value));
//           return (
//             <Select
//               isMulti
//               options={options}
//               isLoading={loading}
//               value={selected}
//               onChange={(selectedOptions) => {
//                 onChange(selectedOptions.map((o) => o.value));
//               }}
//               styles={{
//                 control: (base) => ({
//                   ...base,
//                   borderColor: error ? "red" : base.borderColor,
//                 }),
//               }}
//             />
//           );
//         }}
//       />
//       {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
//     </div>
//   );
// }

// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { AnimatePresence, motion, useAnimate } from "framer-motion";
// import {
//   useForm,
//   FormProvider,
//   useFieldArray,
//   useFormContext,
//   Controller,
// } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
// import { toast } from "react-hot-toast";
// import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";
// import Select from "react-select";

// // Zustand store & createEmployee service
// import useEmployeeStore from "../../store/useEmployeeStore.js";
// import { createEmployee } from "../../service/employeeService.js";

// // Confirmation dialog
// import ConfirmationDialog from "../common/ConfirmationDialog";

// // If you have a static or local permission array:
// import { availablePermission } from "./AvailablePermissions.jsx";

// const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB
// const lettersOnlyRegex = /^(?=.*[A-Za-z])[A-Za-z\s]+$/;
// const todayISO = new Date().toISOString().split("T")[0];

// /*****************************************************************
//  * Yup Validation Schema
//  *  (Renaming fields to match your backend’s code)
//  *****************************************************************/
// const validationSchema = Yup.object().shape({
//   // Step 1
//   first_Name: Yup.string()
//     .matches(lettersOnlyRegex, "First Name can only contain letters and spaces")
//     .required("First Name is required"),
//   last_Name: Yup.string().matches(
//     lettersOnlyRegex,
//     "Last Name can only contain letters and spaces"
//   ),
//   gender: Yup.string()
//     .required("Gender is required")
//     .oneOf(["Male", "Female", "Other"], "Invalid Gender selection"),
//   mobile_No: Yup.string()
//     .matches(/^\d{10}$/, "Phone Number must be exactly 10 digits")
//     .required("Phone Number is required"),
//   personal_Email_Id: Yup.string()
//     .email("Invalid Email")
//     .required("Personal Email is required"),
//   dob: Yup.date()
//     .required("Date of Birth is required")
//     .typeError("Invalid DOB"),
//   office_Address: Yup.string().required("Address is required"),
//   working_Email_Id: Yup.string()
//     .email("Invalid Email")
//     .required("Work Email is required"),
//   date_of_Joining: Yup.date()
//     .max(new Date(), "Date of Joining cannot be in the future")
//     .required("Date of Joining is required")
//     .typeError("Invalid date"),
//   departmentAllocated: Yup.string().required("Department is required"),
//   permission_role: Yup.string().required("Role Name is required"),
//   permission: Yup.array().min(1, "At least one permission must be selected"),
//   assigned_to: Yup.array().min(1, "At least one manager must be assigned"),
//   designation: Yup.string().required("Designation is required"),
//   employee_Id: Yup.string().required("Employee ID is required"),
//   employeeLocation: Yup.string().notRequired(),
//   officeLocation: Yup.string().required("Office Address is required"),
//   latitude: Yup.string().required("Latitude is required"),
//   longitude: Yup.string().required("Longitude is required"),
//   shift_Timing: Yup.string().required("Shift Timings are required"),
//   salary: Yup.number()
//     .typeError("Salary must be a number")
//     .min(0, "Salary cannot be negative")
//     .required("Salary is required"),
//   otp: Yup.string()
//     .oneOf(["yes", "no"], "Invalid OTP selection")
//     .required("OTP selection is required"),

//   // Additional from old code
//   no_of_Paid_Leave: Yup.number()
//     .typeError("Number of Paid Leaves must be a number")
//     .min(0, "Cannot be negative")
//     .required("No. of Paid Leaves is required"),
//   employee_Type: Yup.string().required("Employee Type is required"),

//   // user_Avatar (profile image)
//   user_Avatar: Yup.mixed()
//     .test("fileSize", "Profile image too large (max 5MB)", (file) => {
//       if (!file) return true; // not required
//       return file.size <= FILE_SIZE_LIMIT;
//     })
//     .test("fileType", "Unsupported format. Only JPG/PNG", (file) => {
//       if (!file) return true;
//       return ["image/jpeg", "image/png"].includes(file.type);
//     }),

//   // Step 2
//   qualifications: Yup.array().of(
//     Yup.object().shape({
//       qualificationName: Yup.string().nullable(),
//       universityBoard: Yup.string().nullable(),
//       totalMarks: Yup.number().nullable().min(0),
//       passingYear: Yup.number().nullable().min(0),
//       percentageCgpa: Yup.string().nullable(),
//     })
//   ),
//   experiences: Yup.array().of(
//     Yup.object().shape({
//       companyName: Yup.string().nullable(),
//       designation: Yup.string()
//         .matches(
//           lettersOnlyRegex,
//           "Designation can only contain letters and spaces"
//         )
//         .nullable(),
//       totalExperience: Yup.number().nullable().min(0),
//       startDate: Yup.date().nullable(),
//       endDate: Yup.date().nullable(),
//     })
//   ),

//   // Step 3
//   pan_No: Yup.string()
//     .required("PAN number is required")
//     .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "PAN must be e.g. ABCDE1234F"),
//   adhaar_Number: Yup.string()
//     .required("Aadhaar no. is required")
//     .matches(/^\d{12}$/, "Aadhaar must be a 12-digit number"),
//   bank_Holder_Name: Yup.string()
//     .matches(
//       lettersOnlyRegex,
//       "Bank Holder Name can only contain letters and spaces"
//     )
//     .required("Bank Holder Name is required"),
//   bank_Name: Yup.string()
//     .matches(lettersOnlyRegex, "Bank Name can only contain letters and spaces")
//     .required("Bank Name is required"),
//   bank_Account_No: Yup.string()
//     .matches(/^[0-9]{9,18}$/, "Bank account must be 9 to 18 digits")
//     .required("Account Number is required"),
//   confirmBankAccountNo: Yup.string()
//     .oneOf(
//       [Yup.ref("bank_Account_No"), null],
//       "Bank Account Numbers must match"
//     )
//     .required("Please confirm your Bank Account Number"),
//   ifsc_Code: Yup.string()
//     .required("IFSC Code is required")
//     .matches(
//       /^[A-Z0-9]{11}$/,
//       "IFSC must be 11 chars (letters/numbers) e.g. ABCD0123456"
//     ),
//   documents: Yup.array()
//     .max(20, "Maximum of 20 documents allowed")
//     .of(
//       Yup.object().shape({
//         name: Yup.string().required("Document name is required"),
//         file: Yup.mixed()
//           .test("fileSize", "File too large (Max 5MB)", (file) => {
//             if (!file) return true;
//             return file.size <= FILE_SIZE_LIMIT;
//           })
//           .test("fileType", "Unsupported File Format", (file) => {
//             if (!file) return true;
//             return ["image/jpeg", "image/png", "application/pdf"].includes(
//               file.type
//             );
//           }),
//       })
//     ),
// });

// /*****************************************************
//  * MAIN COMPONENT
//  *****************************************************/
// export default function EmployeeFormTabs({
//   formTitle = "Employee Form",
//   onComplete = () => {},
// }) {
//   const {
//     shiftTimings,
//     employmentTypes,
//     departments,
//     allEmployees,
//     permissionRoles,
//     addressOptions,
//     designations,

//     loadingShiftTimings,
//     loadingEmploymentTypes,
//     loadingDepartments,
//     loadingAllEmployees,
//     loadingPermissionRoles,
//     loadingAddresses,
//     loadingDesignations,

//     loadShiftTimings,
//     loadEmploymentTypes,
//     loadDepartments,
//     loadAllEmployees,
//     loadPermissionRoles,
//     loadCompanyAddresses,
//     loadDesignations,
//   } = useEmployeeStore();

//   const [activeTab, setActiveTab] = useState(0);
//   const [confirmationOpen, setConfirmationOpen] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   // Load data on mount
//   useEffect(() => {
//     loadShiftTimings();
//     loadEmploymentTypes();
//     loadDepartments();
//     loadAllEmployees();
//     loadPermissionRoles();
//     loadCompanyAddresses();
//     loadDesignations();
//     // eslint-disable-next-line
//   }, []);

//   // Setup React Hook Form
//   const methods = useForm({
//     resolver: yupResolver(validationSchema),
//     mode: "onBlur",
//     defaultValues: {
//       // Step 1
//       first_Name: "",
//       last_Name: "",
//       gender: "",
//       mobile_No: "",
//       personal_Email_Id: "",
//       dob: "",
//       office_Address: "", // was "permanentAddress"
//       working_Email_Id: "",
//       date_of_Joining: "",
//       departmentAllocated: "",
//       permission_role: "",
//       permission: [],
//       assigned_to: [],
//       designation: "",
//       employee_Id: "",
//       employeeLocation: "",
//       officeLocation: "",
//       latitude: "",
//       longitude: "",
//       shift_Timing: "",
//       salary: "",
//       otp: "no",
//       no_of_Paid_Leave: 0,
//       employee_Type: "",
//       user_Avatar: null, // profile image

//       // Step 2
//       qualifications: [
//         {
//           qualificationName: "",
//           universityBoard: "",
//           totalMarks: "",
//           passingYear: "",
//           percentageCgpa: "",
//         },
//       ],
//       experiences: [
//         {
//           companyName: "",
//           designation: "", // renamed from experienceDesignation
//           totalExperience: "",
//           startDate: "",
//           endDate: "",
//         },
//       ],

//       // Step 3
//       pan_No: "",
//       adhaar_Number: "",
//       bank_Holder_Name: "",
//       bank_Name: "",
//       bank_Account_No: "",
//       confirmBankAccountNo: "",
//       ifsc_Code: "",
//       documents: [
//         {
//           name: "",
//           file: null,
//         },
//       ],
//     },
//   });

//   const {
//     handleSubmit,
//     getValues,
//     formState: { isValid },
//   } = methods;

//   // Field arrays for Step 2 & 3
//   const {
//     fields: qualificationFields,
//     append: appendQualification,
//     remove: removeQualification,
//   } = useFieldArray({
//     control: methods.control,
//     name: "qualifications",
//   });

//   const {
//     fields: experienceFields,
//     append: appendExperience,
//     remove: removeExperience,
//   } = useFieldArray({
//     control: methods.control,
//     name: "experiences",
//   });

//   const {
//     fields: documentFields,
//     append: appendDocument,
//     remove: removeDocument,
//   } = useFieldArray({
//     control: methods.control,
//     name: "documents",
//   });

//   // Step Navigation
//   const onSubmitStep = (data) => {
//     if (activeTab < 2) {
//       setActiveTab(activeTab + 1);
//     } else {
//       setConfirmationOpen(true);
//     }
//   };

//   // Final form submission => createEmployee
//   const handleConfirmSubmit = async () => {
//     setConfirmationOpen(false);
//     setSubmitting(true);
//     try {
//       const formValues = getValues();
//       // Convert to FormData
//       const formData = new FormData();

//       // Omit arrays for special handling
//       const omitKeys = [
//         "permission",
//         "assigned_to",
//         "qualifications",
//         "experiences",
//         "documents",
//         "confirmBankAccountNo",
//         "user_Avatar",
//       ];
//       Object.keys(formValues).forEach((key) => {
//         if (!omitKeys.includes(key)) {
//           const val = formValues[key];
//           if (val !== null && val !== "") {
//             formData.append(key, val);
//           }
//         }
//       });

//       // permission => permission[0], permission[1], ...
//       formValues.permission.forEach((perm, index) => {
//         formData.append(`permission[${index}]`, perm);
//       });

//       // assigned_to => assigned_to[0], assigned_to[1], ...
//       formValues.assigned_to.forEach((managerId, index) => {
//         formData.append(`assigned_to[${index}]`, managerId);
//       });

//       // user_Avatar
//       if (formValues.user_Avatar) {
//         formData.append("user_Avatar", formValues.user_Avatar);
//       }

//       // documents => documents[0][name], documents[0][file]
//       formValues.documents.forEach((doc, index) => {
//         if (doc.name) {
//           formData.append(`documents[${index}][name]`, doc.name);
//         }
//         if (doc.file) {
//           formData.append(`documents[${index}][file]`, doc.file);
//         }
//       });

//       // qualifications
//       formValues.qualifications.forEach((qual, index) => {
//         formData.append(
//           `qualifications[${index}][qualificationName]`,
//           qual.qualificationName || ""
//         );
//         formData.append(
//           `qualifications[${index}][universityBoard]`,
//           qual.universityBoard || ""
//         );
//         formData.append(
//           `qualifications[${index}][totalMarks]`,
//           qual.totalMarks || ""
//         );
//         formData.append(
//           `qualifications[${index}][year]`,
//           qual.passingYear || ""
//         );
//         formData.append(
//           `qualifications[${index}][percentageCgpa]`,
//           qual.percentageCgpa || ""
//         );
//       });

//       // experiences
//       formValues.experiences.forEach((exp, index) => {
//         formData.append(
//           `experiences[${index}][companyName]`,
//           exp.companyName || ""
//         );
//         formData.append(
//           `experiences[${index}][designation]`,
//           exp.designation || ""
//         );
//         formData.append(
//           `experiences[${index}][startDate]`,
//           exp.startDate || ""
//         );
//         formData.append(`experiences[${index}][endDate]`, exp.endDate || "");
//       });

//       // POST
//       const response = await createEmployee(formData);
//       if (response.success) {
//         toast.success("User registered successfully!");
//         onComplete(response);
//       } else {
//         toast.error("Registration failed: " + response.message);
//       }
//     } catch (error) {
//       if (error.response?.data?.details) {
//         error.response.data.details.forEach((detail) => {
//           toast.error(detail.message);
//         });
//       } else if (error.response?.data?.message) {
//         toast.error("Registration failed: " + error.response.data.message);
//       } else {
//         toast.error("Registration failed: " + error.message);
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleCancelSubmit = () => {
//     setConfirmationOpen(false);
//   };

//   return (
//     <FormProvider {...methods}>
//       <div className="employee-form bg-bg-primary text-text-primary py-2">
//         <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-bg-secondary dark:text-gray-100 rounded-md shadow p-6">
//             <h1 className="text-2xl font-bold text-center mb-6">{formTitle}</h1>

//             {/* Tabs Header */}
//             <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
//               <TabButton
//                 label="Employee Details"
//                 isActive={activeTab === 0}
//                 onClick={() => setActiveTab(0)}
//               />
//               <TabButton
//                 label="Qualifications & Experience"
//                 isActive={activeTab === 1}
//                 onClick={() => setActiveTab(1)}
//               />
//               <TabButton
//                 label="Personal Details"
//                 isActive={activeTab === 2}
//                 onClick={() => setActiveTab(2)}
//               />
//             </div>

//             {/* Tabs Content (wrapped by AnimatePresence) */}
//             <div className="mt-4">
//               <AnimatePresence mode="wait">
//                 {activeTab === 0 && (
//                   <motion.div
//                     key="tab-employee"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ duration: 0.4, ease: "easeOut" }}
//                   >
//                     <Step1EmployeeDetails
//                       onSubmitStep={onSubmitStep}
//                       submitting={submitting}
//                     />
//                   </motion.div>
//                 )}

//                 {activeTab === 1 && (
//                   <motion.div
//                     key="tab-qualifications"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ duration: 0.4, ease: "easeOut" }}
//                   >
//                     <Step2QualificationsExperience
//                       onSubmitStep={onSubmitStep}
//                       submitting={submitting}
//                       qualificationFields={qualificationFields}
//                       removeQualification={removeQualification}
//                       appendQualification={appendQualification}
//                       experienceFields={experienceFields}
//                       removeExperience={removeExperience}
//                       appendExperience={appendExperience}
//                     />
//                   </motion.div>
//                 )}

//                 {activeTab === 2 && (
//                   <motion.div
//                     key="tab-personal"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ duration: 0.4, ease: "easeOut" }}
//                   >
//                     <Step3PersonalDetails
//                       onSubmitStep={onSubmitStep}
//                       submitting={submitting}
//                       documentFields={documentFields}
//                       removeDocument={removeDocument}
//                       appendDocument={appendDocument}
//                     />
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Confirmation Dialog for final submission */}
//       <ConfirmationDialog
//         open={confirmationOpen}
//         title="Are you sure?"
//         message="Do you want to add this user?"
//         confirmText="Yes"
//         cancelText="No, cancel!"
//         onConfirm={handleConfirmSubmit}
//         onCancel={handleCancelSubmit}
//       />
//     </FormProvider>
//   );
// }

// /*****************************************************
//  * Tab Button
//  *****************************************************/
// function TabButton({ label, isActive, onClick }) {
//   return (
//     <button
//       className={`px-4 py-2 text-sm font-medium 
//         ${
//           isActive
//             ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
//             : "text-gray-600 dark:text-gray-300 hover:text-blue-600"
//         }
//       `}
//       onClick={onClick}
//     >
//       {label}
//     </button>
//   );
// }

// /*****************************************************
//  * STEP 1: Employee Details (with Profile Image, Paid Leaves, etc.)
//  *****************************************************/
// function Step1EmployeeDetails({ onSubmitStep, submitting }) {
//   const [scope, animate] = useAnimate();
//   const { handleSubmit, watch, setValue } = useFormContext();
//   const [avatarPreview, setAvatarPreview] = useState(null);

//   // Zustand store data
//   const addressOptions = useEmployeeStore((state) => state.addressOptions);
//   const loadingAddresses = useEmployeeStore((state) => state.loadingAddresses);

//   const departments = useEmployeeStore((state) => state.departments);
//   const loadingDepartments = useEmployeeStore(
//     (state) => state.loadingDepartments
//   );

//   const shiftTimings = useEmployeeStore((state) => state.shiftTimings);
//   const loadingShiftTimings = useEmployeeStore(
//     (state) => state.loadingShiftTimings
//   );

//   const employmentTypes = useEmployeeStore((state) => state.employmentTypes);
//   const loadingEmploymentTypes = useEmployeeStore(
//     (state) => state.loadingEmploymentTypes
//   );

//   const permissionRoles = useEmployeeStore((state) => state.permissionRoles);
//   const loadingPermissionRoles = useEmployeeStore(
//     (state) => state.loadingPermissionRoles
//   );

//   const designations = useEmployeeStore((state) => state.designations);
//   const loadingDesignations = useEmployeeStore(
//     (state) => state.loadingDesignations
//   );

//   const allEmployees = useEmployeeStore((state) => state.allEmployees);
//   const loadingAllEmployees = useEmployeeStore(
//     (state) => state.loadingAllEmployees
//   );

//   // Animate on mount
//   useEffect(() => {
//     animate([
//       [".animatable-input", { opacity: 0, x: 20 }, { duration: 0 }],
//       [
//         ".animatable-input",
//         { opacity: 1, x: 0 },
//         { duration: 0.3, stagger: 0.05 },
//       ],
//     ]);
//   }, [animate]);

//   // Auto set lat/long from address selection
//   const watchOfficeLocation = watch("officeLocation");
//   useEffect(() => {
//     const selected = addressOptions.find(
//       (opt) => opt.value === watchOfficeLocation
//     );
//     if (selected) {
//       setValue("latitude", selected.latitude || "");
//       setValue("longitude", selected.longitude || "");
//     }
//   }, [watchOfficeLocation, addressOptions, setValue]);

//   // Auto-set permissions if role selected
//   const watchRole = watch("permission_role");
//   useEffect(() => {
//     const foundRole = permissionRoles.find((r) => r.role_name === watchRole);
//     if (foundRole?.permission) {
//       const perms = foundRole.permission.map((p) => p.permission);
//       setValue("permission", perms);
//     } else {
//       setValue("permission", []);
//     }
//   }, [watchRole, permissionRoles, setValue]);

//   // Profile image upload
//   const handleProfileImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setValue("user_Avatar", file, { shouldValidate: true });
//       setAvatarPreview(URL.createObjectURL(file));
//     } else {
//       setValue("user_Avatar", null);
//       setAvatarPreview(null);
//     }
//   };

//   return (
//     <form ref={scope} onSubmit={handleSubmit(onSubmitStep)}>
//       {/* Profile Image, no_of_Paid_Leave, employee_Type */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Profile Image */}
//         <div className="flex flex-col items-center">
//           <label className="block font-medium mb-2">Profile Image</label>
//           <div
//             className="w-32 h-32 rounded-full border relative mb-2 flex items-center justify-center overflow-hidden"
//             title="Click to upload"
//             onClick={() => document.getElementById("avatarInput")?.click()}
//             style={{ cursor: "pointer" }}
//           >
//             {avatarPreview ? (
//               <img
//                 src={avatarPreview}
//                 alt="Profile"
//                 className="object-cover w-full h-full"
//               />
//             ) : (
//               <span className="text-gray-400 text-sm">No Image</span>
//             )}
//           </div>
//           <input
//             id="avatarInput"
//             type="file"
//             accept="image/png, image/jpeg"
//             style={{ display: "none" }}
//             onChange={handleProfileImageChange}
//           />
//         </div>

//         {/* (First & Last Name) */}
//         <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
//           <FormField
//             label="First Name"
//             name="first_Name"
//             placeholder="Enter First Name"
//           />
//           <FormField
//             label="Last Name"
//             name="last_Name"
//             placeholder="Enter Last Name"
//           />
//         </div>
//       </div>

//       {/* no_of_Paid_Leave & employee_Type together */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         <FormField
//           label="No. of Paid Leaves"
//           name="no_of_Paid_Leave"
//           placeholder="e.g. 12"
//           type="number"
//         />
//         <FormSelect
//           label="Employee Type"
//           name="employee_Type"
//           loading={loadingEmploymentTypes}
//           options={[
//             { value: "", label: "Select Employee Type" },
//             ...employmentTypes,
//           ]}
//         />
//       </div>

//       {/* (Phone=mobile_No, Gender) */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         <FormField
//           label="Phone"
//           name="mobile_No"
//           placeholder="Enter phone number"
//         />
//         <FormSelect
//           label="Gender"
//           name="gender"
//           options={[
//             { value: "", label: "Select" },
//             { value: "Male", label: "Male" },
//             { value: "Female", label: "Female" },
//             { value: "Other", label: "Other" },
//           ]}
//         />
//       </div>

//       {/* (Personal Email, DOB, Address=office_Address) */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormField
//           label="Personal Email"
//           name="personal_Email_Id"
//           placeholder="test@gmail.com"
//         />
//         <FormField label="DOB" name="dob" type="date" />
//         <FormTextArea
//           label="Permanent Address"
//           name="office_Address"
//           placeholder="Write Address..."
//         />
//       </div>

//       {/* (Work Email=working_Email_Id, date_of_Joining, departmentAllocated) */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormField
//           label="Work Email"
//           name="working_Email_Id"
//           placeholder="test@company.com"
//         />
//         <FormField label="DOJ" name="date_of_Joining" type="date" />
//         <FormSelect
//           label="Department"
//           name="departmentAllocated"
//           loading={loadingDepartments}
//           options={[{ value: "", label: "Select Department" }, ...departments]}
//         />
//       </div>

//       {/* (permission_role, assigned_to, designation) */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormSelect
//           label="Role"
//           name="permission_role"
//           loading={loadingPermissionRoles}
//           options={[
//             { value: "", label: "Select Role" },
//             ...(permissionRoles?.map((r) => ({
//               value: r.role_name,
//               label: r.role_name,
//             })) || []),
//           ]}
//         />
//         <FormMultiSelect
//           label="Assign Manager"
//           name="assigned_to"
//           loading={loadingAllEmployees}
//           options={allEmployees}
//         />
//         <FormSelect
//           label="Designation"
//           name="designation"
//           loading={loadingDesignations}
//           options={[
//             { value: "", label: "Select Designation" },
//             ...designations,
//           ]}
//         />
//       </div>

//       {/* (employee_Id, Salary, OTP) */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormField
//           label="Employee ID"
//           name="employee_Id"
//           placeholder="R10004"
//         />
//         <FormField
//           label="Salary"
//           name="salary"
//           placeholder="Salary"
//           type="number"
//         />
//         <FormSelect
//           label="OTP Required"
//           name="otp"
//           options={[
//             { value: "", label: "Select" },
//             { value: "no", label: "No" },
//             { value: "yes", label: "Yes" },
//           ]}
//         />
//       </div>

//       {/* (officeLocation, lat, long) */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormSelect
//           label="Office Address"
//           name="officeLocation"
//           loading={loadingAddresses}
//           options={[
//             { value: "", label: "Select Office Address" },
//             ...addressOptions,
//           ]}
//         />
//         <FormField label="Latitude" name="latitude" placeholder="Latitude" />
//         <FormField label="Longitude" name="longitude" placeholder="Longitude" />
//       </div>

//       {/* Shift Timing */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormSelect
//           label="Shift Timing"
//           name="shift_Timing"
//           loading={loadingShiftTimings}
//           options={[
//             { value: "", label: "Select Shift Timings" },
//             ...shiftTimings,
//           ]}
//         />
//       </div>

//       {/* permission (Multi) */}
//       <div className="mt-6">
//         <FormMultiSelect
//           label="Permissions"
//           name="permission"
//           options={availablePermission.map((p) => ({
//             value: p.permission,
//             label: p.name,
//           }))}
//         />
//       </div>

//       {/* Step Controls */}
//       <div className="flex items-center space-x-3 mt-6">
//         <button
//           type="button"
//           className="px-4 py-2 bg-gray-300 text-black rounded"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           disabled={submitting}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           {submitting ? "Submitting..." : "Next"}
//         </button>
//       </div>
//     </form>
//   );
// }

// /*****************************************************
//  * STEP 2: Qualifications & Experience
//  *****************************************************/
// function Step2QualificationsExperience({
//   onSubmitStep,
//   submitting,
//   qualificationFields,
//   removeQualification,
//   appendQualification,
//   experienceFields,
//   removeExperience,
//   appendExperience,
// }) {
//   const [scope, animate] = useAnimate();
//   const { handleSubmit } = useFormContext();

//   useEffect(() => {
//     animate([
//       [".animatable-input", { opacity: 0, x: 20 }, { duration: 0 }],
//       [
//         ".animatable-input",
//         { opacity: 1, x: 0 },
//         { duration: 0.3, stagger: 0.05 },
//       ],
//     ]);
//   }, [animate]);

//   return (
//     <form ref={scope} onSubmit={handleSubmit(onSubmitStep)}>
//       <h2 className="text-xl font-semibold mb-4">Qualifications</h2>
//       {qualificationFields.map((item, index) => (
//         <div key={item.id} className="border rounded-md p-4 mb-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
//             <FormField
//               label="Qualification Name"
//               name={`qualifications.${index}.qualificationName`}
//               placeholder="Enter Qualification Name"
//             />
//             <FormField
//               label="University/Board"
//               name={`qualifications.${index}.universityBoard`}
//               placeholder="Enter University/Board"
//             />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <FormField
//               label="Total Marks"
//               name={`qualifications.${index}.totalMarks`}
//               placeholder="Total Marks"
//               type="number"
//             />
//             <FormField
//               label="Passing Year"
//               name={`qualifications.${index}.passingYear`}
//               placeholder="YYYY"
//               type="number"
//             />
//             <FormField
//               label="Percentage/CGPA"
//               name={`qualifications.${index}.percentageCgpa`}
//               placeholder="e.g. 80% or 8.0"
//             />
//           </div>

//           <div className="flex items-center space-x-3 mt-4">
//             {qualificationFields.length > 1 && (
//               <button
//                 type="button"
//                 className="px-4 py-2 bg-red-500 text-white rounded"
//                 onClick={() => removeQualification(index)}
//               >
//                 Remove
//               </button>
//             )}
//             {index === qualificationFields.length - 1 &&
//               qualificationFields.length < 20 && (
//                 <button
//                   type="button"
//                   onClick={() =>
//                     appendQualification({
//                       qualificationName: "",
//                       universityBoard: "",
//                       totalMarks: "",
//                       passingYear: "",
//                       percentageCgpa: "",
//                     })
//                   }
//                   className="px-4 py-2 bg-blue-600 text-white rounded"
//                 >
//                   Add More
//                 </button>
//               )}
//           </div>
//         </div>
//       ))}

//       <h2 className="text-xl font-semibold mb-4">Experience</h2>
//       {experienceFields.map((item, index) => (
//         <div key={item.id} className="border rounded-md p-4 mb-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
//             <FormField
//               label="Company Name"
//               name={`experiences.${index}.companyName`}
//               placeholder="Enter Company Name"
//             />
//             <FormField
//               label="Designation"
//               name={`experiences.${index}.designation`}
//               placeholder="Enter Designation"
//             />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <FormField
//               label="Total Years of Experience"
//               name={`experiences.${index}.totalExperience`}
//               placeholder="e.g. 3"
//               type="number"
//             />
//             <FormField
//               label="Start Date"
//               name={`experiences.${index}.startDate`}
//               type="date"
//             />
//             <FormField
//               label="End Date"
//               name={`experiences.${index}.endDate`}
//               type="date"
//             />
//           </div>

//           <div className="flex items-center space-x-3 mt-4">
//             {experienceFields.length > 1 && (
//               <button
//                 type="button"
//                 className="px-4 py-2 bg-red-500 text-white rounded"
//                 onClick={() => removeExperience(index)}
//               >
//                 Remove
//               </button>
//             )}
//             {index === experienceFields.length - 1 &&
//               experienceFields.length < 20 && (
//                 <button
//                   type="button"
//                   onClick={() =>
//                     appendExperience({
//                       companyName: "",
//                       designation: "",
//                       totalExperience: "",
//                       startDate: "",
//                       endDate: "",
//                     })
//                   }
//                   className="px-4 py-2 bg-blue-600 text-white rounded"
//                 >
//                   Add More
//                 </button>
//               )}
//           </div>
//         </div>
//       ))}

//       <div className="flex items-center space-x-3 mt-6">
//         <button
//           type="button"
//           className="px-4 py-2 bg-gray-300 text-black rounded"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           disabled={submitting}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           {submitting ? "Submitting..." : "Next"}
//         </button>
//       </div>
//     </form>
//   );
// }

// /*****************************************************
//  * STEP 3: Personal Details (Bank Info, Documents, etc.)
//  *****************************************************/
// function Step3PersonalDetails({
//   onSubmitStep,
//   submitting,
//   documentFields,
//   removeDocument,
//   appendDocument,
// }) {
//   const [scope, animate] = useAnimate();
//   const { handleSubmit } = useFormContext();

//   useEffect(() => {
//     animate([
//       [".animatable-input", { opacity: 0, x: 20 }, { duration: 0 }],
//       [
//         ".animatable-input",
//         { opacity: 1, x: 0 },
//         { duration: 0.3, stagger: 0.05 },
//       ],
//     ]);
//   }, [animate]);

//   return (
//     <form ref={scope} onSubmit={handleSubmit(onSubmitStep)}>
//       {/* PAN & Aadhaar */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <FormField label="PAN Number" name="pan_No" placeholder="ABCDE1234F" />
//         <FormField
//           label="Aadhaar Number"
//           name="adhaar_Number"
//           placeholder="12-digit Aadhaar"
//         />
//       </div>

//       {/* Bank Details */}
//       <h2 className="text-xl font-semibold mt-8 mb-4">Bank Details</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <FormField
//           label="Bank Holder Name"
//           name="bank_Holder_Name"
//           placeholder="Account Holder Name"
//         />
//         <FormField
//           label="Bank Name"
//           name="bank_Name"
//           placeholder="e.g. State Bank"
//         />
//         <FormField
//           label="Bank Account No."
//           name="bank_Account_No"
//           placeholder="1234567890"
//         />
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormField
//           label="Confirm Bank Account No."
//           name="confirmBankAccountNo"
//           placeholder="Re-enter Account No."
//         />
//         <FormField
//           label="IFSC Code"
//           name="ifsc_Code"
//           placeholder="ABCD0123456"
//         />

//         {/* Documents */}
//         <div>
//           <label className="block font-medium mb-1">Upload Documents</label>
//           {documentFields.map((item, index) => (
//             <DocumentUploader
//               key={item.id}
//               index={index}
//               removeDocument={removeDocument}
//               totalDocs={documentFields.length}
//             />
//           ))}
//           {documentFields.length < 20 && (
//             <button
//               type="button"
//               onClick={() => appendDocument({ name: "", file: null })}
//               className="px-4 py-2 bg-blue-600 text-white rounded mt-2"
//             >
//               Add More Documents
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Step Controls */}
//       <div className="flex items-center space-x-3 mt-6">
//         <button
//           type="button"
//           className="px-4 py-2 bg-gray-300 text-black rounded"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           disabled={submitting}
//           className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//         >
//           {submitting ? "Saving..." : "Save"}
//         </button>
//       </div>
//     </form>
//   );
// }

// /*****************************************************
//  * Document Uploader Sub-component
//  *****************************************************/
// function DocumentUploader({ index, removeDocument, totalDocs }) {
//   const { register, setValue, watch } = useFormContext();
//   const docName = watch(`documents.${index}.name`);
//   const docFile = watch(`documents.${index}.file`);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setValue(`documents.${index}.file`, file, { shouldValidate: true });
//     }
//   };

//   return (
//     <div className="border rounded p-3 mb-2">
//       <label className="block text-sm font-medium mb-1">
//         Document Name <span className="text-red-500">*</span>
//       </label>
//       <input
//         className="animatable-input w-full px-3 py-2 border border-gray-300 rounded mb-2"
//         placeholder="Enter Document Name"
//         {...register(`documents.${index}.name`)}
//       />
//       <label className="block text-sm font-medium mb-1">File</label>
//       <input
//         type="file"
//         accept=".png,.jpg,.jpeg,.pdf"
//         onChange={handleFileChange}
//       />

//       {/* If we have a file chosen, show a small preview or remove icon */}
//       {docFile && (
//         <div className="mt-2 flex items-center space-x-2">
//           <FaTrash
//             className="cursor-pointer text-red-500"
//             onClick={() => setValue(`documents.${index}.file`, null)}
//           />
//           <span className="text-sm">{docFile.name}</span>
//         </div>
//       )}

//       {/* Remove Document button */}
//       {totalDocs > 1 && (
//         <button
//           type="button"
//           onClick={() => removeDocument(index)}
//           className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded flex items-center"
//         >
//           <FaTrash className="mr-1" />
//           Remove Document
//         </button>
//       )}
//     </div>
//   );
// }

// /*****************************************************
//  * REUSABLE FORM COMPONENTS (TextField, Select, TextArea, MultiSelect)
//  *****************************************************/
// function FormField({ label, name, placeholder, type = "text" }) {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();
//   const error = errors?.[name]?.message;

//   return (
//     <div>
//       <label className="block font-medium mb-1">{label}</label>
//       <input
//         type={type}
//         placeholder={placeholder}
//         {...register(name)}
//         className={`animatable-input w-full px-3 py-2 border ${
//           error ? "border-red-500" : "border-gray-300"
//         } rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
//       />
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// }

// function FormSelect({ label, name, options = [], loading = false }) {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();
//   const error = errors?.[name]?.message;

//   return (
//     <div>
//       <label className="block font-medium mb-1">{label}</label>
//       <select
//         {...register(name)}
//         className={`animatable-input w-full px-3 py-2 border ${
//           error ? "border-red-500" : "border-gray-300"
//         } rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
//       >
//         {loading && <option value="">Loading...</option>}
//         {!loading &&
//           options.map((opt, idx) => (
//             <option key={idx} value={opt.value}>
//               {opt.label}
//             </option>
//           ))}
//       </select>
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// }

// function FormTextArea({ label, name, placeholder }) {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();
//   const error = errors?.[name]?.message;

//   return (
//     <div>
//       <label className="block font-medium mb-1">{label}</label>
//       <textarea
//         rows={3}
//         placeholder={placeholder}
//         {...register(name)}
//         className={`animatable-input w-full px-3 py-2 border ${
//           error ? "border-red-500" : "border-gray-300"
//         } rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
//       />
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// }

// function FormMultiSelect({ label, name, options = [], loading = false }) {
//   const {
//     control,
//     formState: { errors },
//   } = useFormContext();
//   const error = errors?.[name]?.message;

//   return (
//     <div>
//       <label className="block font-medium mb-1">{label}</label>
//       <Controller
//         name={name}
//         control={control}
//         render={({ field }) => {
//           const { onChange, value } = field;
//           const selected = options.filter((opt) =>
//             (value || []).includes(opt.value)
//           );
//           return (
//             <Select
//               isMulti
//               options={options}
//               isLoading={loading}
//               value={selected}
//               onChange={(selectedOptions) =>
//                 onChange(selectedOptions.map((o) => o.value))
//               }
//               className="animatable-input"
//               styles={{
//                 control: (base) => ({
//                   ...base,
//                   borderColor: error ? "red" : base.borderColor,
//                 }),
//               }}
//             />
//           );
//         }}
//       />
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import {
//   useForm,
//   FormProvider,
//   useFieldArray,
//   useFormContext,
//   Controller,
// } from "react-hook-form";
// import { AnimatePresence, motion, useAnimate } from "framer-motion";
// import Select from "react-select";
// import { toast } from "react-hot-toast";
// import { FaTrash } from "react-icons/fa";

// import useEmployeeStore from "../../store/useEmployeeStore.js";
// import { createEmployee } from "../../service/employeeService.js";
// import ConfirmationDialog from "../common/ConfirmationDialog";
// import { availablePermission } from "./AvailablePermissions.jsx";

// const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB
// const lettersOnlyRegex = /^[A-Za-z\s]+$/;

// export default function EmployeeFormTabs({
//   formTitle = "Employee Form",
//   onComplete = () => {},
// }) {
//   const {
//     shiftTimings,
//     employmentTypes,
//     departments,
//     allEmployees,
//     permissionRoles,
//     addressOptions,
//     designations,
//     loadingShiftTimings,
//     loadingEmploymentTypes,
//     loadingDepartments,
//     loadingAllEmployees,
//     loadingPermissionRoles,
//     loadingAddresses,
//     loadingDesignations,
//     loadShiftTimings,
//     loadEmploymentTypes,
//     loadDepartments,
//     loadAllEmployees,
//     loadPermissionRoles,
//     loadCompanyAddresses,
//     loadDesignations,
//   } = useEmployeeStore();

//   const [activeTab, setActiveTab] = useState(0);
//   const [confirmationOpen, setConfirmationOpen] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     loadShiftTimings();
//     loadEmploymentTypes();
//     loadDepartments();
//     loadAllEmployees();
//     loadPermissionRoles();
//     loadCompanyAddresses();
//     loadDesignations();
//     // eslint-disable-next-line
//   }, []);

//   const methods = useForm({
//     mode: "onBlur",
//     defaultValues: {
//       first_Name: "",
//       last_Name: "",
//       gender: "",
//       mobile_No: "",
//       personal_Email_Id: "",
//       dob: "",
//       permanent_Address: "",
//       working_Email_Id: "",
//       date_of_Joining: "",
//       departmentAllocated: "",
//       permission_role: "",
//       permission: [],
//       assigned_to: [],
//       designation: "",
//       employee_Id: "",
//       officeLocation: "",
//       latitude: "",
//       longitude: "",
//       shift_Timing: "",
//       salary: "",
//       otp: "no",
//       no_of_Paid_Leave: 0,
//       employee_Type: "",
//       user_Avatar: null,
//       qualifications: [
//         {
//           qualificationName: "",
//           universityBoard: "",
//           totalMarks: "",
//           passingYear: "",
//           percentageCgpa: "",
//         },
//       ],
//       experiences: [
//         {
//           companyName: "",
//           designation: "",
//           totalExperience: "",
//           startDate: "",
//           endDate: "",
//         },
//       ],
//       pan_No: "",
//       adhaar_Number: "",
//       bank_Holder_Name: "",
//       bank_Name: "",
//       bank_Account_No: "",
//       confirmBankAccountNo: "",
//       ifsc_Code: "",
//       documents: [{ name: "", file: null }],
//     },
//   });

//   const {
//     handleSubmit,
//     getValues,
//     control,
//   } = methods;

//   const {
//     fields: qualificationFields,
//     append: appendQualification,
//     remove: removeQualification,
//   } = useFieldArray({
//     control,
//     name: "qualifications",
//   });

//   const {
//     fields: experienceFields,
//     append: appendExperience,
//     remove: removeExperience,
//   } = useFieldArray({
//     control,
//     name: "experiences",
//   });

//   const {
//     fields: documentFields,
//     append: appendDocument,
//     remove: removeDocument,
//   } = useFieldArray({
//     control,
//     name: "documents",
//   });

//   const onSubmitStep = () => {
//     if (activeTab < 2) {
//       setActiveTab((prev) => prev + 1);
//     } else {
//       setConfirmationOpen(true);
//     }
//   };

//   const handleConfirmSubmit = async () => {
//     setConfirmationOpen(false);
//     setSubmitting(true);
//     try {
//       const formValues = getValues();
//       const formData = new FormData();

//       const omitKeys = [
//         "permission",
//         "assigned_to",
//         "qualifications",
//         "experiences",
//         "documents",
//         "confirmBankAccountNo",
//         "user_Avatar",
//       ];

//       Object.keys(formValues).forEach((key) => {
//         if (!omitKeys.includes(key)) {
//           const val = formValues[key];
//           if (val !== null && val !== "") {
//             formData.append(key, val);
//           }
//         }
//       });

//       formValues.permission.forEach((perm, index) => {
//         formData.append(`permission[${index}]`, perm);
//       });

//       formValues.assigned_to.forEach((mgr, index) => {
//         formData.append(`assigned_to[${index}]`, mgr);
//       });

//       if (formValues.user_Avatar) {
//         formData.append("user_Avatar", formValues.user_Avatar);
//       }

//       formValues.documents.forEach((doc, index) => {
//         if (doc.name) formData.append(`documents[${index}][name]`, doc.name);
//         if (doc.file) formData.append(`documents[${index}][file]`, doc.file);
//       });

//       formValues.qualifications.forEach((qual, index) => {
//         formData.append(
//           `qualifications[${index}][qualificationName]`,
//           qual.qualificationName || ""
//         );
//         formData.append(
//           `qualifications[${index}][universityBoard]`,
//           qual.universityBoard || ""
//         );
//         formData.append(
//           `qualifications[${index}][totalMarks]`,
//           qual.totalMarks || ""
//         );
//         formData.append(
//           `qualifications[${index}][year]`,
//           qual.passingYear || ""
//         );
//         formData.append(
//           `qualifications[${index}][percentageCgpa]`,
//           qual.percentageCgpa || ""
//         );
//       });

//       formValues.experiences.forEach((exp, index) => {
//         formData.append(
//           `experiences[${index}][companyName]`,
//           exp.companyName || ""
//         );
//         formData.append(
//           `experiences[${index}][designation]`,
//           exp.designation || ""
//         );
//         formData.append(
//           `experiences[${index}][startDate]`,
//           exp.startDate || ""
//         );
//         formData.append(`experiences[${index}][endDate]`, exp.endDate || "");
//         formData.append(
//           `experiences[${index}][totalExperience]`,
//           exp.totalExperience || ""
//         );
//       });

//       const response = await createEmployee(formData);
//       if (response.success) {
//         toast.success("User registered successfully!");
//         onComplete(response);
//       } else {
//         toast.error("Registration failed: " + response.message);
//       }
//     } catch (error) {
//       if (error.response?.data?.details) {
//         error.response.data.details.forEach((detail) => {
//           toast.error(detail.message);
//         });
//       } else if (error.response?.data?.message) {
//         toast.error("Registration failed: " + error.response.data.message);
//       } else {
//         toast.error("Registration failed: " + error.message);
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleCancelSubmit = () => {
//     setConfirmationOpen(false);
//   };

//   return (
//     <FormProvider {...methods}>
//       <div className="employee-form bg-bg-primary text-text-primary py-2">
//         <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-bg-secondary rounded-md shadow p-6 dark:bg-gray-800">
//             <h1 className="text-2xl font-bold text-center mb-6">{formTitle}</h1>

//             <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
//               <TabButton
//                 label="Employee Details"
//                 isActive={activeTab === 0}
//                 onClick={() => setActiveTab(0)}
//               />
//               <TabButton
//                 label="Qualifications & Experience"
//                 isActive={activeTab === 1}
//                 onClick={() => setActiveTab(1)}
//               />
//               <TabButton
//                 label="Personal Details"
//                 isActive={activeTab === 2}
//                 onClick={() => setActiveTab(2)}
//               />
//             </div>

//             <div className="mt-4">
//               <AnimatePresence mode="wait">
//                 {activeTab === 0 && (
//                   <motion.div
//                     key="tab-employee"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ duration: 0.4, ease: "easeOut" }}
//                   >
//                     <Step1EmployeeDetails
//                       onSubmitStep={onSubmitStep}
//                       submitting={submitting}
//                     />
//                   </motion.div>
//                 )}

//                 {activeTab === 1 && (
//                   <motion.div
//                     key="tab-qualifications"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ duration: 0.4, ease: "easeOut" }}
//                   >
//                     <Step2QualificationsExperience
//                       onSubmitStep={onSubmitStep}
//                       submitting={submitting}
//                       qualificationFields={qualificationFields}
//                       removeQualification={removeQualification}
//                       appendQualification={appendQualification}
//                       experienceFields={experienceFields}
//                       removeExperience={removeExperience}
//                       appendExperience={appendExperience}
//                     />
//                   </motion.div>
//                 )}

//                 {activeTab === 2 && (
//                   <motion.div
//                     key="tab-personal"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ duration: 0.4, ease: "easeOut" }}
//                   >
//                     <Step3PersonalDetails
//                       onSubmitStep={onSubmitStep}
//                       submitting={submitting}
//                       documentFields={documentFields}
//                       removeDocument={removeDocument}
//                       appendDocument={appendDocument}
//                     />
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>
//         </div>
//       </div>

//       <ConfirmationDialog
//         open={confirmationOpen}
//         title="Are you sure?"
//         message="Do you want to add this user?"
//         confirmText="Yes"
//         cancelText="No, cancel!"
//         onConfirm={handleConfirmSubmit}
//         onCancel={handleCancelSubmit}
//       />
//     </FormProvider>
//   );
// }

// function TabButton({ label, isActive, onClick }) {
//   return (
//     <button
//       className={`px-4 py-2 text-sm font-medium 
//         ${
//           isActive
//             ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
//             : "text-gray-600 dark:text-gray-300 hover:text-blue-600"
//         }
//       `}
//       onClick={onClick}
//     >
//       {label}
//     </button>
//   );
// }

// function Step1EmployeeDetails({ onSubmitStep, submitting }) {
//   const [scope, animate] = useAnimate();
//   const { handleSubmit, register, watch, setValue, formState } = useFormContext();
//   const { errors } = formState;
//   const [avatarPreview, setAvatarPreview] = useState(null);

//   const addressOptions = useEmployeeStore((state) => state.addressOptions);
//   const departments = useEmployeeStore((state) => state.departments);
//   const shiftTimings = useEmployeeStore((state) => state.shiftTimings);
//   const employmentTypes = useEmployeeStore((state) => state.employmentTypes);
//   const permissionRoles = useEmployeeStore((state) => state.permissionRoles);
//   const designations = useEmployeeStore((state) => state.designations);
//   const allEmployees = useEmployeeStore((state) => state.allEmployees);

//   const loadingAddresses = useEmployeeStore((state) => state.loadingAddresses);
//   const loadingDepartments = useEmployeeStore((state) => state.loadingDepartments);
//   const loadingShiftTimings = useEmployeeStore((state) => state.loadingShiftTimings);
//   const loadingEmploymentTypes = useEmployeeStore((state) => state.loadingEmploymentTypes);
//   const loadingPermissionRoles = useEmployeeStore((state) => state.loadingPermissionRoles);
//   const loadingDesignations = useEmployeeStore((state) => state.loadingDesignations);
//   const loadingAllEmployees = useEmployeeStore((state) => state.loadingAllEmployees);

//   useEffect(() => {
//     animate([
//       [".animatable-input", { opacity: 0, x: 20 }, { duration: 0 }],
//       [
//         ".animatable-input",
//         { opacity: 1, x: 0 },
//         { duration: 0.3, stagger: 0.05 },
//       ],
//     ]);
//   }, [animate]);

//   const watchOfficeLocation = watch("officeLocation");
//   useEffect(() => {
//     const selected = addressOptions?.find(
//       (opt) => opt.value === watchOfficeLocation
//     );
//     if (selected) {
//       setValue("latitude", selected.latitude || "");
//       setValue("longitude", selected.longitude || "");
//     } else {
//       setValue("latitude", "");
//       setValue("longitude", "");
//     }
//   }, [watchOfficeLocation, addressOptions, setValue]);

//   const watchRole = watch("permission_role");
//   useEffect(() => {
//     const foundRole = permissionRoles?.find((r) => r.role_name === watchRole);
//     if (foundRole?.permission) {
//       const perms = foundRole.permission.map((p) => p.permission);
//       setValue("permission", perms);
//     } else {
//       setValue("permission", []);
//     }
//   }, [watchRole, permissionRoles, setValue]);

//   const handleProfileImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > FILE_SIZE_LIMIT) {
//         alert("Profile image must be <= 5MB");
//         return;
//       }
//       if (!["image/png", "image/jpeg"].includes(file.type)) {
//         alert("Unsupported file format. Only PNG/JPEG");
//         return;
//       }
//       setValue("user_Avatar", file);
//       setAvatarPreview(URL.createObjectURL(file));
//     } else {
//       setValue("user_Avatar", null);
//       setAvatarPreview(null);
//     }
//   };

//   return (
//     <form ref={scope} onSubmit={handleSubmit(onSubmitStep)}>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="flex flex-col items-center">
//           <label className="block font-medium mb-2">Profile Image</label>
//           <div
//             className="w-32 h-32 rounded-full border relative mb-2 flex items-center justify-center overflow-hidden cursor-pointer dark:border-gray-600"
//             onClick={() => document.getElementById("avatarInput")?.click()}
//           >
//             {avatarPreview ? (
//               <img
//                 src={avatarPreview}
//                 alt="Profile"
//                 className="object-cover w-full h-full"
//               />
//             ) : (
//               <span className="text-gray-400 text-sm dark:text-gray-500">
//                 No Image
//               </span>
//             )}
//           </div>
//           <input
//             id="avatarInput"
//             type="file"
//             accept="image/png, image/jpeg"
//             style={{ display: "none" }}
//             onChange={handleProfileImageChange}
//           />
//           {errors.user_Avatar && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.user_Avatar.message}
//             </p>
//           )}
//         </div>

//         <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
//           <FormField
//             label="First Name"
//             name="first_Name"
//             placeholder="Enter First Name"
//             registerOptions={{
//               required: "First Name is required",
//               pattern: {
//                 value: lettersOnlyRegex,
//                 message: "Can only contain letters and spaces",
//               },
//             }}
//           />
//           <FormField
//             label="Last Name"
//             name="last_Name"
//             placeholder="Enter Last Name"
//             registerOptions={{
//               pattern: {
//                 value: lettersOnlyRegex,
//                 message: "Can only contain letters and spaces",
//               },
//             }}
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         <FormField
//           label="No. of Paid Leaves"
//           name="no_of_Paid_Leave"
//           placeholder="e.g. 12"
//           type="number"
//           registerOptions={{
//             required: "No. of Paid Leaves is required",
//             min: { value: 0, message: "Cannot be negative" },
//           }}
//         />
//         <FormSelect
//           label="Employee Type"
//           name="employee_Type"
//           loading={loadingEmploymentTypes}
//           options={[
//             { value: "", label: "Select Employee Type" },
//             ...employmentTypes,
//           ]}
//           registerOptions={{ required: "Employee Type is required" }}
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         <FormField
//           label="Phone"
//           name="mobile_No"
//           placeholder="Enter phone number"
//           registerOptions={{
//             required: "Phone Number is required",
//             pattern: {
//               value: /^\d{10}$/,
//               message: "Must be exactly 10 digits",
//             },
//           }}
//         />
//         <FormSelect
//           label="Gender"
//           name="gender"
//           options={[
//             { value: "", label: "Select" },
//             { value: "Male", label: "Male" },
//             { value: "Female", label: "Female" },
//             { value: "Other", label: "Other" },
//           ]}
//           registerOptions={{ required: "Gender is required" }}
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormField
//           label="Personal Email"
//           name="personal_Email_Id"
//           placeholder="test@gmail.com"
//           type="email"
//           registerOptions={{
//             required: "Personal Email is required",
//             pattern: {
//               value: /\S+@\S+\.\S+/,
//               message: "Invalid Email",
//             },
//           }}
//         />
//         <FormField
//           label="DOB"
//           name="dob"
//           type="date"
//           registerOptions={{
//             required: "Date of Birth is required",
//             validate: {
//               isAdult: (value) => {
//                 if (!value) return true;
//                 const inputDate = new Date(value);
//                 const today = new Date();
//                 const eighteenYearsAgo = new Date(
//                   today.getFullYear() - 18,
//                   today.getMonth(),
//                   today.getDate()
//                 );
//                 return (
//                   inputDate <= eighteenYearsAgo ||
//                   "You must be at least 18 years old"
//                 );
//               },
//             },
//           }}
//         />
//         <FormTextArea
//           label="Permanent Address"
//           name="permanent_Address"
//           placeholder="Write Address..."
//           registerOptions={{ required: "Permanent Address is required" }}
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormField
//           label="Work Email"
//           name="working_Email_Id"
//           placeholder="test@company.com"
//           type="email"
//           registerOptions={{
//             required: "Work Email is required",
//             pattern: {
//               value: /\S+@\S+\.\S+/,
//               message: "Invalid Work Email",
//             },
//           }}
//         />
//         <FormField
//           label="DOJ"
//           name="date_of_Joining"
//           type="date"
//           registerOptions={{
//             required: "Date of Joining is required",
//           }}
//         />
//         <FormSelect
//           label="Department"
//           name="departmentAllocated"
//           loading={loadingDepartments}
//           options={[{ value: "", label: "Select Department" }, ...departments]}
//           registerOptions={{ required: "Department is required" }}
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormSelect
//           label="Role"
//           name="permission_role"
//           loading={loadingPermissionRoles}
//           options={[
//             { value: "", label: "Select Role" },
//             ...(permissionRoles || []).map((r) => ({
//               value: r.role_name,
//               label: r.role_name,
//             })),
//           ]}
//           registerOptions={{ required: "Role is required" }}
//         />
//         <FormMultiSelect
//           label="Assign Manager"
//           name="assigned_to"
//           loading={loadingAllEmployees}
//           options={allEmployees}
//           requiredMessage="At least one manager must be assigned"
//         />
//         <FormSelect
//           label="Designation"
//           name="designation"
//           loading={loadingDesignations}
//           options={[
//             { value: "", label: "Select Designation" },
//             ...designations,
//           ]}
//           registerOptions={{ required: "Designation is required" }}
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormField
//           label="Employee ID"
//           name="employee_Id"
//           placeholder="R10004"
//           registerOptions={{
//             required: "Employee ID is required",
//           }}
//         />
//         <FormField
//           label="Salary"
//           name="salary"
//           placeholder="Salary"
//           type="number"
//           registerOptions={{
//             required: "Salary is required",
//             min: { value: 0, message: "Salary cannot be negative" },
//           }}
//         />
//         <FormSelect
//           label="OTP Required"
//           name="otp"
//           options={[
//             { value: "", label: "Select" },
//             { value: "no", label: "No" },
//             { value: "yes", label: "Yes" },
//           ]}
//           registerOptions={{ required: "OTP selection is required" }}
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormSelect
//           label="Office Location"
//           name="officeLocation"
//           loading={loadingAddresses}
//           options={[{ value: "", label: "Select Office" }, ...addressOptions]}
//           registerOptions={{ required: "Office Location is required" }}
//         />
//         <FormField
//           label="Latitude"
//           name="latitude"
//           placeholder="Latitude"
//           registerOptions={{
//             required: "Latitude is required",
//             pattern: {
//               value: /^-?\d+(\.\d+)?$/,
//               message: "Must be a valid number",
//             },
//           }}
//         />
//         <FormField
//           label="Longitude"
//           name="longitude"
//           placeholder="Longitude"
//           registerOptions={{
//             required: "Longitude is required",
//             pattern: {
//               value: /^-?\d+(\.\d+)?$/,
//               message: "Must be a valid number",
//             },
//           }}
//         />
//       </div>

//       <div className="mt-6">
//         <FormSelect
//           label="Shift Timing"
//           name="shift_Timing"
//           loading={loadingShiftTimings}
//           options={[{ value: "", label: "Select Shift Timings" }, ...shiftTimings]}
//           registerOptions={{ required: "Shift Timing is required" }}
//         />
//       </div>

//       <div className="mt-6">
//         <FormMultiSelect
//           label="Permissions"
//           name="permission"
//           options={availablePermission.map((p) => ({
//             value: p.permission,
//             label: p.name,
//           }))}
//           requiredMessage="At least one permission must be selected"
//         />
//       </div>

//       <div className="flex items-center space-x-3 mt-6">
//         <button
//           type="button"
//           className="px-4 py-2 bg-gray-300 text-black rounded dark:bg-gray-700 dark:text-white"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           disabled={submitting}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           {submitting ? "Submitting..." : "Next"}
//         </button>
//       </div>
//     </form>
//   );
// }

// function Step2QualificationsExperience({
//   onSubmitStep,
//   submitting,
//   qualificationFields,
//   removeQualification,
//   appendQualification,
//   experienceFields,
//   removeExperience,
//   appendExperience,
// }) {
//   const [scope, animate] = useAnimate();
//   const { handleSubmit } = useFormContext();

//   useEffect(() => {
//     animate([
//       [".animatable-input", { opacity: 0, x: 20 }, { duration: 0 }],
//       [
//         ".animatable-input",
//         { opacity: 1, x: 0 },
//         { duration: 0.3, stagger: 0.05 },
//       ],
//     ]);
//   }, [animate]);

//   return (
//     <form ref={scope} onSubmit={handleSubmit(onSubmitStep)}>
//       <h2 className="text-xl font-semibold mb-4">Qualifications</h2>
//       {qualificationFields.map((item, index) => (
//         <div
//           key={item.id}
//           className="border rounded-md p-4 mb-6 dark:border-gray-700"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
//             <FormField
//               label="Qualification Name"
//               name={`qualifications.${index}.qualificationName`}
//               placeholder="Enter Qualification Name"
//             />
//             <FormField
//               label="University/Board"
//               name={`qualifications.${index}.universityBoard`}
//               placeholder="Enter University/Board"
//             />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <FormField
//               label="Total Marks"
//               name={`qualifications.${index}.totalMarks`}
//               placeholder="Total Marks"
//               type="number"
//               registerOptions={{
//                 min: { value: 0, message: "Cannot be negative" },
//               }}
//             />
//             <FormField
//               label="Passing Year"
//               name={`qualifications.${index}.passingYear`}
//               placeholder="YYYY"
//               type="number"
//               registerOptions={{
//                 min: { value: 0, message: "Cannot be negative" },
//               }}
//             />
//             <FormField
//               label="Percentage/CGPA"
//               name={`qualifications.${index}.percentageCgpa`}
//               placeholder="e.g. 80% or 8.0"
//               registerOptions={{
//                 pattern: {
//                   value: /^(\d+(\.\d+)?%?)?$/,
//                   message: "Enter a valid percentage or decimal (e.g. 80, 80%, 8.0)",
//                 },
//               }}
//             />
//           </div>
//           <div className="flex items-center space-x-3 mt-4">
//             {qualificationFields.length > 1 && (
//               <button
//                 type="button"
//                 className="px-4 py-2 bg-red-500 text-white rounded"
//                 onClick={() => removeQualification(index)}
//               >
//                 Remove
//               </button>
//             )}
//             {index === qualificationFields.length - 1 &&
//               qualificationFields.length < 20 && (
//                 <button
//                   type="button"
//                   onClick={() =>
//                     appendQualification({
//                       qualificationName: "",
//                       universityBoard: "",
//                       totalMarks: "",
//                       passingYear: "",
//                       percentageCgpa: "",
//                     })
//                   }
//                   className="px-4 py-2 bg-blue-600 text-white rounded"
//                 >
//                   Add More
//                 </button>
//               )}
//           </div>
//         </div>
//       ))}

//       <h2 className="text-xl font-semibold mb-4">Experience</h2>
//       {experienceFields.map((item, index) => (
//         <div
//           key={item.id}
//           className="border rounded-md p-4 mb-6 dark:border-gray-700"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
//             <FormField
//               label="Company Name"
//               name={`experiences.${index}.companyName`}
//               placeholder="Enter Company Name"
//             />
//             <FormField
//               label="Designation"
//               name={`experiences.${index}.designation`}
//               placeholder="Enter Designation"
//               registerOptions={{
//                 pattern: {
//                   value: lettersOnlyRegex,
//                   message: "Can only contain letters and spaces",
//                 },
//               }}
//             />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <FormField
//               label="Total Years of Experience"
//               name={`experiences.${index}.totalExperience`}
//               placeholder="e.g. 3"
//               type="number"
//               registerOptions={{
//                 min: { value: 0, message: "Cannot be negative" },
//               }}
//             />
//             <FormField
//               label="Start Date"
//               name={`experiences.${index}.startDate`}
//               type="date"
//             />
//             <FormField
//               label="End Date"
//               name={`experiences.${index}.endDate`}
//               type="date"
//             />
//           </div>
//           <div className="flex items-center space-x-3 mt-4">
//             {experienceFields.length > 1 && (
//               <button
//                 type="button"
//                 className="px-4 py-2 bg-red-500 text-white rounded"
//                 onClick={() => removeExperience(index)}
//               >
//                 Remove
//               </button>
//             )}
//             {index === experienceFields.length - 1 &&
//               experienceFields.length < 20 && (
//                 <button
//                   type="button"
//                   onClick={() =>
//                     appendExperience({
//                       companyName: "",
//                       designation: "",
//                       totalExperience: "",
//                       startDate: "",
//                       endDate: "",
//                     })
//                   }
//                   className="px-4 py-2 bg-blue-600 text-white rounded"
//                 >
//                   Add More
//                 </button>
//               )}
//           </div>
//         </div>
//       ))}

//       <div className="flex items-center space-x-3 mt-6">
//         <button
//           type="button"
//           className="px-4 py-2 bg-gray-300 text-black rounded dark:bg-gray-700 dark:text-white"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           disabled={submitting}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           {submitting ? "Submitting..." : "Next"}
//         </button>
//       </div>
//     </form>
//   );
// }

// function Step3PersonalDetails({
//   onSubmitStep,
//   submitting,
//   documentFields,
//   removeDocument,
//   appendDocument,
// }) {
//   const [scope, animate] = useAnimate();
//   const { handleSubmit } = useFormContext();

//   useEffect(() => {
//     animate([
//       [".animatable-input", { opacity: 0, x: 20 }, { duration: 0 }],
//       [
//         ".animatable-input",
//         { opacity: 1, x: 0 },
//         { duration: 0.3, stagger: 0.05 },
//       ],
//     ]);
//   }, [animate]);

//   return (
//     <form ref={scope} onSubmit={handleSubmit(onSubmitStep)}>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <FormField
//           label="PAN Number"
//           name="pan_No"
//           placeholder="ABCDE1234F"
//           registerOptions={{
//             required: "PAN is required",
//             pattern: {
//               value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
//               message: "Format: ABCDE1234F",
//             },
//           }}
//         />
//         <FormField
//           label="Aadhaar Number"
//           name="adhaar_Number"
//           placeholder="12-digit Aadhaar"
//           registerOptions={{
//             required: "Aadhaar is required",
//             pattern: {
//               value: /^\d{12}$/,
//               message: "Aadhaar must be 12 digits",
//             },
//           }}
//         />
//       </div>

//       <h2 className="text-xl font-semibold mt-8 mb-4">Bank Details</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <FormField
//           label="Bank Holder Name"
//           name="bank_Holder_Name"
//           placeholder="Account Holder Name"
//           registerOptions={{
//             required: "Bank Holder Name is required",
//             pattern: {
//               value: lettersOnlyRegex,
//               message: "Can only contain letters and spaces",
//             },
//           }}
//         />
//         <FormField
//           label="Bank Name"
//           name="bank_Name"
//           placeholder="e.g. State Bank"
//           registerOptions={{
//             required: "Bank Name is required",
//             pattern: {
//               value: lettersOnlyRegex,
//               message: "Can only contain letters and spaces",
//             },
//           }}
//         />
//         <FormField
//           label="Bank Account No."
//           name="bank_Account_No"
//           placeholder="1234567890"
//           registerOptions={{
//             required: "Account No. is required",
//             pattern: {
//               value: /^[0-9]{9,18}$/,
//               message: "Account must be 9 to 18 digits",
//             },
//           }}
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormField
//           label="Confirm Bank Account No."
//           name="confirmBankAccountNo"
//           placeholder="Re-enter Account No."
//           registerOptions={{
//             required: "Please confirm Bank Account No.",
//             validate: (val, { bank_Account_No }) =>
//               val === bank_Account_No || "Account numbers do not match",
//           }}
//         />
//         <FormField
//           label="IFSC Code"
//           name="ifsc_Code"
//           placeholder="ABCD0123456"
//           registerOptions={{
//             required: "IFSC Code is required",
//             pattern: {
//               value: /^[A-Z0-9]{11}$/,
//               message: "Must be 11 chars (letters/numbers)",
//             },
//           }}
//         />

//         <div>
//           <label className="block font-medium mb-1">Upload Documents</label>
//           {documentFields.map((item, index) => (
//             <DocumentUploader
//               key={item.id}
//               index={index}
//               removeDocument={removeDocument}
//               totalDocs={documentFields.length}
//             />
//           ))}
//           {documentFields.length < 20 && (
//             <button
//               type="button"
//               onClick={() => appendDocument({ name: "", file: null })}
//               className="px-4 py-2 bg-blue-600 text-white rounded mt-2"
//             >
//               Add More Documents
//             </button>
//           )}
//         </div>
//       </div>

//       <div className="flex items-center space-x-3 mt-6">
//         <button
//           type="button"
//           className="px-4 py-2 bg-gray-300 text-black rounded dark:bg-gray-700 dark:text-white"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           disabled={submitting}
//           className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//         >
//           {submitting ? "Saving..." : "Save"}
//         </button>
//       </div>
//     </form>
//   );
// }

// function DocumentUploader({ index, removeDocument, totalDocs }) {
//   const { register, setValue, watch, formState } = useFormContext();
//   const docFile = watch(`documents.${index}.file`);
//   const docNameError = formState.errors?.documents?.[index]?.name?.message;
//   const docFileError = formState.errors?.documents?.[index]?.file?.message;

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > FILE_SIZE_LIMIT) {
//         alert("File must be <= 5MB");
//         return;
//       }
//       const allowed = ["image/png", "image/jpeg", "application/pdf"];
//       if (!allowed.includes(file.type)) {
//         alert("Only JPG/PNG/PDF allowed");
//         return;
//       }
//       setValue(`documents.${index}.file`, file);
//     }
//   };

//   return (
//     <div className="border rounded p-3 mb-2 dark:border-gray-700 dark:bg-gray-800">
//       <label className="block text-sm font-medium mb-1">
//         Document Name <span className="text-red-500">*</span>
//       </label>
//       <input
//         className="animatable-input w-full px-3 py-2 border border-gray-300 rounded mb-2 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
//         placeholder="Enter Document Name"
//         {...register(`documents.${index}.name`, {
//           required: "Document name is required",
//         })}
//       />
//       {docNameError && <p className="text-red-500 text-sm">{docNameError}</p>}

//       <label className="block text-sm font-medium mb-1">File</label>
//       <input type="file" accept=".png,.jpg,.jpeg,.pdf" onChange={handleFileChange} />
//       {docFile && (
//         <div className="mt-2 flex items-center space-x-2">
//           <FaTrash
//             className="cursor-pointer text-red-500"
//             onClick={() => setValue(`documents.${index}.file`, null)}
//           />
//           <span className="text-sm dark:text-gray-200">{docFile.name}</span>
//         </div>
//       )}
//       {docFileError && <p className="text-red-500 text-sm">{docFileError}</p>}

//       {totalDocs > 1 && (
//         <button
//           type="button"
//           onClick={() => removeDocument(index)}
//           className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded flex items-center"
//         >
//           <FaTrash className="mr-1" />
//           Remove Document
//         </button>
//       )}
//     </div>
//   );
// }

// function FormField({ label, name, placeholder, type = "text", registerOptions }) {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();
//   const errorMsg = errors?.[name]?.message;

//   return (
//     <div>
//       <label className="block font-medium mb-1">{label}</label>
//       <input
//         type={type}
//         placeholder={placeholder}
//         {...register(name, registerOptions)}
//         className={`animatable-input w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400
//           ${
//             errorMsg
//               ? "border-red-500"
//               : "border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
//           }
//         `}
//       />
//       {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
//     </div>
//   );
// }

// function FormSelect({ label, name, options = [], loading = false, registerOptions }) {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();
//   const errorMsg = errors?.[name]?.message;

//   return (
//     <div>
//       <label className="block font-medium mb-1">{label}</label>
//       <select
//         {...register(name, registerOptions)}
//         className={`animatable-input w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 
//           ${
//             errorMsg
//               ? "border-red-500"
//               : "border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
//           }
//         `}
//       >
//         {loading && <option value="">Loading...</option>}
//         {!loading &&
//           options.map((opt, idx) => (
//             <option key={idx} value={opt.value}>
//               {opt.label}
//             </option>
//           ))}
//       </select>
//       {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
//     </div>
//   );
// }

// function FormTextArea({ label, name, placeholder, registerOptions, rows = 3 }) {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();
//   const errorMsg = errors?.[name]?.message;

//   return (
//     <div>
//       <label className="block font-medium mb-1">{label}</label>
//       <textarea
//         rows={rows}
//         placeholder={placeholder}
//         {...register(name, registerOptions)}
//         className={`
//           animatable-input w-full px-3 py-2 rounded
//           border dark:border-gray-600 focus:outline-none focus:ring-2
//           placeholder-gray-400 dark:placeholder-gray-500
//           ${
//             errorMsg
//               ? "border-red-600 focus:ring-red-600"
//               : "border-gray-300 dark:border-gray-600  focus:ring-blue-400"
//           }
//           dark:bg-gray-800 dark:text-gray-100
//         `}
//       />
//       {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
//     </div>
//   );
// }

// /**
//  * Custom React Select with full dark mode support
//  */
// function FormMultiSelect({ label, name, options = [], loading = false, requiredMessage }) {
//   const {
//     control,
//     formState: { errors },
//   } = useFormContext();
//   const errorMsg = errors?.[name]?.message;

//   // Check if Tailwind dark class is applied
//   const isDarkMode = typeof document !== "undefined"
//     ? document.documentElement.classList.contains("dark")
//     : false;

//   const customStyles = {
//     control: (base, state) => ({
//       ...base,
//       borderColor: errorMsg ? "red" : base.borderColor,
//       backgroundColor: isDarkMode ? "#374151" : "#fff",
//       // text color for placeholders, selected, etc.
//       color: isDarkMode ? "#fff" : "#000",
//       "&:hover": {
//         borderColor: errorMsg ? "red" : base.borderColor,
//       },
//     }),
//     menu: (base) => ({
//       ...base,
//       backgroundColor: isDarkMode ? "#374151" : "#fff",
//       color: isDarkMode ? "#fff" : "#000",
//     }),
//     option: (base, state) => ({
//       ...base,
//       backgroundColor: state.isFocused
//         ? isDarkMode
//           ? "#4B5563"
//           : "#f5f5f5"
//         : isDarkMode
//         ? "#374151"
//         : "#fff",
//       color: isDarkMode ? "#fff" : "#000",
//     }),
//     singleValue: (base) => ({
//       ...base,
//       color: isDarkMode ? "#fff" : "#000",
//     }),
//     multiValue: (base) => ({
//       ...base,
//       backgroundColor: isDarkMode ? "#4B5563" : "#e2e8f0",
//       color: isDarkMode ? "#fff" : "#000",
//     }),
//     multiValueLabel: (base) => ({
//       ...base,
//       color: isDarkMode ? "#fff" : "#000",
//     }),
//     multiValueRemove: (base) => ({
//       ...base,
//       color: isDarkMode ? "#fff" : "#000",
//       ":hover": {
//         backgroundColor: isDarkMode ? "#6B7280" : "#cbd5e0",
//         color: isDarkMode ? "#fff" : "#000",
//       },
//     }),
//   };

//   return (
//     <div>
//       <label className="block font-medium mb-1">{label}</label>
//       <Controller
//         name={name}
//         control={control}
//         rules={{
//           validate: (value) => {
//             if (requiredMessage && (!value || value.length === 0)) {
//               return requiredMessage;
//             }
//             return true;
//           },
//         }}
//         render={({ field }) => {
//           const { onChange, value } = field;
//           const selected = options.filter((opt) => (value || []).includes(opt.value));

//           return (
//             <Select
//               isMulti
//               options={options}
//               isLoading={loading}
//               value={selected}
//               onChange={(selectedOptions) => {
//                 onChange(selectedOptions.map((o) => o.value));
//               }}
//               styles={customStyles}
//             />
//           );
//         }}
//       />
//       {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import {
//   useForm,
//   FormProvider,
//   useFieldArray,
//   useFormContext,
//   Controller,
// } from "react-hook-form";
// import { AnimatePresence, motion, useAnimate } from "framer-motion";

// import Select from "react-select";
// import { toast } from "react-hot-toast";
// import { FaTrash ,FaUpload} from "react-icons/fa";

// import useEmployeeStore from "../../store/useEmployeeStore.js";
// import { createEmployee } from "../../service/employeeService.js";
// import ConfirmationDialog from "../common/ConfirmationDialog";
// import { availablePermission } from "./AvailablePermissions.jsx";

// const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB
// const lettersOnlyRegex = /^[A-Za-z\s]+$/;

// export default function EmployeeFormTabs({
//   formTitle = "Employee Form",
//   onComplete = () => {},
// }) {
//   const {
//     shiftTimings,
//     employmentTypes,
//     departments,
//     allEmployees,
//     permissionRoles,
//     addressOptions,
//     designations,
//     loadingShiftTimings,
//     loadingEmploymentTypes,
//     loadingDepartments,
//     loadingAllEmployees,
//     loadingPermissionRoles,
//     loadingAddresses,
//     loadingDesignations,
//     loadShiftTimings,
//     loadEmploymentTypes,
//     loadDepartments,
//     loadAllEmployees,
//     loadPermissionRoles,
//     loadCompanyAddresses,
//     loadDesignations,
//   } = useEmployeeStore();

//   const [activeTab, setActiveTab] = useState(0);
//   const [confirmationOpen, setConfirmationOpen] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     loadShiftTimings();
//     loadEmploymentTypes();
//     loadDepartments();
//     loadAllEmployees();
//     loadPermissionRoles();
//     loadCompanyAddresses();
//     loadDesignations();
//     // eslint-disable-next-line
//   }, []);

//   const methods = useForm({
//     mode: "onBlur",
//     defaultValues: {
//       first_Name: "",
//       last_Name: "",
//       gender: "",
//       mobile_No: "",
//       personal_Email_Id: "",
//       dob: "",
//       permanent_Address: "",
//       working_Email_Id: "",
//       date_of_Joining: "",
//       departmentAllocated: "",
//       permission_role: "",
//       permission: [],
//       assigned_to: [],
//       designation: "",
//       employee_Id: "",
//       officeLocation: "",
//       latitude: "",
//       longitude: "",
//       shift_Timing: "",
//       salary: "",
//       otp: "no",
//       no_of_Paid_Leave: 0,
//       employee_Type: "",
//       user_Avatar: null,
//       qualifications: [
//         {
//           qualificationName: "",
//           universityBoard: "",
//           totalMarks: "",
//           passingYear: "",
//           percentageCgpa: "",
//         },
//       ],
//       experiences: [
//         {
//           companyName: "",
//           designation: "",
//           totalExperience: "",
//           startDate: "",
//           endDate: "",
//         },
//       ],
//       pan_No: "",
//       adhaar_Number: "",
//       bank_Holder_Name: "",
//       bank_Name: "",
//       bank_Account_No: "",
//       confirmBankAccountNo: "",
//       ifsc_Code: "",
//       documents: [{ name: "", file: null }],
//     },
//   });

//   const { handleSubmit, getValues, control } = methods;

//   const {
//     fields: qualificationFields,
//     append: appendQualification,
//     remove: removeQualification,
//   } = useFieldArray({
//     control,
//     name: "qualifications",
//   });

//   const {
//     fields: experienceFields,
//     append: appendExperience,
//     remove: removeExperience,
//   } = useFieldArray({
//     control,
//     name: "experiences",
//   });

//   const {
//     fields: documentFields,
//     append: appendDocument,
//     remove: removeDocument,
//   } = useFieldArray({
//     control,
//     name: "documents",
//   });

//   const onSubmitStep = () => {
//     if (activeTab < 2) {
//       setActiveTab((prev) => prev + 1);
//     } else {
//       setConfirmationOpen(true);
//     }
//   };

//   const handleConfirmSubmit = async () => {
//     setConfirmationOpen(false);
//     setSubmitting(true);
//     try {
//       const formValues = getValues();
//       const formData = new FormData();

//       const omitKeys = [
//         "permission",
//         "assigned_to",
//         "qualifications",
//         "experiences",
//         "documents",
//         "confirmBankAccountNo",
//         "user_Avatar",
//       ];

//       // Append all normal fields
//       Object.keys(formValues).forEach((key) => {
//         if (!omitKeys.includes(key)) {
//           const val = formValues[key];
//           if (val !== null && val !== "") {
//             formData.append(key, val);
//           }
//         }
//       });

//       // Now arrays & files
//       formValues.permission.forEach((perm, index) => {
//         formData.append(`permission[${index}]`, perm);
//       });
//       formValues.assigned_to.forEach((mgr, index) => {
//         formData.append(`assigned_to[${index}]`, mgr);
//       });
//       if (formValues.user_Avatar) {
//         formData.append("user_Avatar", formValues.user_Avatar);
//       }
//       formValues.documents.forEach((doc, index) => {
//         if (doc.name) formData.append(`documents[${index}][name]`, doc.name);
//         if (doc.file) formData.append(`documents[${index}][file]`, doc.file);
//       });
//       formValues.qualifications.forEach((qual, index) => {
//         formData.append(
//           `qualifications[${index}][qualificationName]`,
//           qual.qualificationName || ""
//         );
//         formData.append(
//           `qualifications[${index}][universityBoard]`,
//           qual.universityBoard || ""
//         );
//         formData.append(
//           `qualifications[${index}][totalMarks]`,
//           qual.totalMarks || ""
//         );
//         formData.append(
//           `qualifications[${index}][year]`,
//           qual.passingYear || ""
//         );
//         formData.append(
//           `qualifications[${index}][percentageCgpa]`,
//           qual.percentageCgpa || ""
//         );
//       });
//       formValues.experiences.forEach((exp, index) => {
//         formData.append(
//           `experiences[${index}][companyName]`,
//           exp.companyName || ""
//         );
//         formData.append(
//           `experiences[${index}][designation]`,
//           exp.designation || ""
//         );
//         formData.append(
//           `experiences[${index}][startDate]`,
//           exp.startDate || ""
//         );
//         formData.append(`experiences[${index}][endDate]`, exp.endDate || "");
//         formData.append(
//           `experiences[${index}][totalExperience]`,
//           exp.totalExperience || ""
//         );
//       });

//       const response = await createEmployee(formData);
//       if (response.success) {
//         toast.success("User registered successfully!");
//         onComplete(response);
//       } else {
//         toast.error("Registration failed: " + response.message);
//       }
//     } catch (error) {
//       if (error.response?.data?.details) {
//         error.response.data.details.forEach((detail) => {
//           toast.error(detail.message);
//         });
//       } else if (error.response?.data?.message) {
//         toast.error("Registration failed: " + error.response.data.message);
//       } else {
//         toast.error("Registration failed: " + error.message);
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleCancelSubmit = () => {
//     setConfirmationOpen(false);
//   };

//   return (
//     <FormProvider {...methods}>
//       <div className="employee-form bg-bg-primary text-text-primary py-2 ">
//         <div className=" ">
//           <div className="bg-bg-secondary rounded-md shadow p-6 dark:bg-gray-800 ">
//             <h1 className="text-2xl font-bold text-center mb-6">{formTitle}</h1>

//             <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
//               <TabButton
//                 label="Employee Details"
//                 isActive={activeTab === 0}
//                 onClick={() => setActiveTab(0)}
//               />
//               <TabButton
//                 label="Qualifications & Experience"
//                 isActive={activeTab === 1}
//                 onClick={() => setActiveTab(1)}
//               />
//               <TabButton
//                 label="Personal Details"
//                 isActive={activeTab === 2}
//                 onClick={() => setActiveTab(2)}
//               />
//             </div>

//             <div className="mt-4">
//               <AnimatePresence mode="wait">
//                 {activeTab === 0 && (
//                   <motion.div
//                     key="tab-employee"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ duration: 0.4, ease: "easeOut" }}
//                   >
//                     <Step1EmployeeDetails
//                       onSubmitStep={onSubmitStep}
//                       submitting={submitting}
//                     />
//                   </motion.div>
//                 )}

//                 {activeTab === 1 && (
//                   <motion.div
//                     key="tab-qualifications"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ duration: 0.4, ease: "easeOut" }}
//                   >
//                     <Step2QualificationsExperience
//                       onSubmitStep={onSubmitStep}
//                       submitting={submitting}
//                       qualificationFields={qualificationFields}
//                       removeQualification={removeQualification}
//                       appendQualification={appendQualification}
//                       experienceFields={experienceFields}
//                       removeExperience={removeExperience}
//                       appendExperience={appendExperience}
//                     />
//                   </motion.div>
//                 )}

//                 {activeTab === 2 && (
//                   <motion.div
//                     key="tab-personal"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ duration: 0.4, ease: "easeOut" }}
//                   >
//                     <Step3PersonalDetails
//                       onSubmitStep={onSubmitStep}
//                       submitting={submitting}
//                       documentFields={documentFields}
//                       removeDocument={removeDocument}
//                       appendDocument={appendDocument}
//                     />
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>
//         </div>
//       </div>

//       <ConfirmationDialog
//         open={confirmationOpen}
//         title="Are you sure?"
//         message="Do you want to add this user?"
//         confirmText="Yes"
//         cancelText="No, cancel!"
//         onConfirm={handleConfirmSubmit}
//         onCancel={handleCancelSubmit}
//       />
//     </FormProvider>
//   );
// }

// function TabButton({ label, isActive, onClick }) {
//   return (
//     <button
//       className={`px-4 py-2 text-sm font-medium 
//         ${
//           isActive
//             ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
//             : "text-gray-600 dark:text-gray-300 hover:text-blue-600"
//         }
//       `}
//       onClick={onClick}
//     >
//       {label}
//     </button>
//   );
// }

// /** Step 1: Employee Details */
// function Step1EmployeeDetails({ onSubmitStep, submitting }) {
//   const [scope, animate] = useAnimate();
//   const { handleSubmit, register, watch, setValue, formState } = useFormContext();
//   const { errors } = formState;
//   const [avatarPreview, setAvatarPreview] = useState(null);

//   const addressOptions = useEmployeeStore((state) => state.addressOptions);
//   const departments = useEmployeeStore((state) => state.departments);
//   const shiftTimings = useEmployeeStore((state) => state.shiftTimings);
//   const employmentTypes = useEmployeeStore((state) => state.employmentTypes);
//   const permissionRoles = useEmployeeStore((state) => state.permissionRoles);
//   const designations = useEmployeeStore((state) => state.designations);
//   const allEmployees = useEmployeeStore((state) => state.allEmployees);

//   const loadingAddresses = useEmployeeStore((state) => state.loadingAddresses);
//   const loadingDepartments = useEmployeeStore((state) => state.loadingDepartments);
//   const loadingShiftTimings = useEmployeeStore((state) => state.loadingShiftTimings);
//   const loadingEmploymentTypes = useEmployeeStore((state) => state.loadingEmploymentTypes);
//   const loadingPermissionRoles = useEmployeeStore((state) => state.loadingPermissionRoles);
//   const loadingDesignations = useEmployeeStore((state) => state.loadingDesignations);
//   const loadingAllEmployees = useEmployeeStore((state) => state.loadingAllEmployees);

//   useEffect(() => {
//     // Animate inputs in
//     animate([
//       [".animatable-input", { opacity: 0, x: 20 }, { duration: 0 }],
//       [
//         ".animatable-input",
//         { opacity: 1, x: 0 },
//         { duration: 0.3, stagger: 0.05 },
//       ],
//     ]);
//   }, [animate]);

//   // Auto-fill lat/long when Office Location changes
//   const watchOfficeLocation = watch("officeLocation");
//   useEffect(() => {
//     const selected = addressOptions?.find(
//       (opt) => opt.value === watchOfficeLocation
//     );
//     if (selected) {
//       setValue("latitude", selected.latitude || "");
//       setValue("longitude", selected.longitude || "");
//     } else {
//       setValue("latitude", "");
//       setValue("longitude", "");
//     }
//   }, [watchOfficeLocation, addressOptions, setValue]);

//   // If Role changes, automatically set the relevant permissions
//   const watchRole = watch("permission_role");
//   useEffect(() => {
//     const foundRole = permissionRoles?.find((r) => r.role_name === watchRole);
//     if (foundRole?.permission) {
//       const perms = foundRole.permission.map((p) => p.permission);
//       setValue("permission", perms);
//     } else {
//       setValue("permission", []);
//     }
//   }, [watchRole, permissionRoles, setValue]);

//   // Handle avatar preview
//   const handleProfileImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > FILE_SIZE_LIMIT) {
//         alert("Profile image must be <= 5MB");
//         return;
//       }
//       if (!["image/png", "image/jpeg"].includes(file.type)) {
//         alert("Unsupported file format. Only PNG/JPEG");
//         return;
//       }
//       setValue("user_Avatar", file);
//       setAvatarPreview(URL.createObjectURL(file));
//     } else {
//       setValue("user_Avatar", null);
//       setAvatarPreview(null);
//     }
//   };

//   return (
//     <form ref={scope} onSubmit={handleSubmit(onSubmitStep)}>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Profile Image */}
//         <div className="flex flex-col items-center">
//           <label className="block font-medium mb-2">Profile Image</label>
//           <div
//             className="w-32 h-32 rounded-full border relative mb-2 flex items-center justify-center overflow-hidden cursor-pointer dark:border-gray-600"
//             onClick={() => document.getElementById("avatarInput")?.click()}
//           >
//             {avatarPreview ? (
//               <img
//                 src={avatarPreview}
//                 alt="Profile"
//                 className="object-cover w-full h-full"
//               />
//             ) : (
//               <span className="text-gray-400 text-sm dark:text-gray-500">
//                 No Image
//               </span>
//             )}
//           </div>
//           <input
//             id="avatarInput"
//             type="file"
//             accept="image/png, image/jpeg"
//             style={{ display: "none" }}
//             onChange={handleProfileImageChange}
//           />
//           {errors.user_Avatar && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.user_Avatar.message}
//             </p>
//           )}
//         </div>

//         {/* First Name / Last Name */}
//         <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
//           <FormField
//             label="First Name"
//             name="first_Name"
//             placeholder="Enter First Name"
//             registerOptions={{
//               required: "First Name is required",
//               pattern: {
//                 value: lettersOnlyRegex,
//                 message: "Can only contain letters and spaces",
//               },
//             }}
//           />
//           <FormField
//             label="Last Name"
//             name="last_Name"
//             placeholder="Enter Last Name"
//             registerOptions={{
//               pattern: {
//                 value: lettersOnlyRegex,
//                 message: "Can only contain letters and spaces",
//               },
//             }}
//           />
//         </div>
//       </div>

//       {/* Paid Leaves / Employee Type */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         <FormField
//           label="No. of Paid Leaves"
//           name="no_of_Paid_Leave"
//           placeholder="e.g. 12"
//           type="number"
//           registerOptions={{
//             required: "No. of Paid Leaves is required",
//             min: { value: 0, message: "Cannot be negative" },
//           }}
//         />
//         <FormSelect
//           label="Employee Type"
//           name="employee_Type"
//           loading={loadingEmploymentTypes}
//           options={[
//             { value: "", label: "Select Employee Type" },
//             ...employmentTypes,
//           ]}
//           registerOptions={{ required: "Employee Type is required" }}
//         />
//       </div>

//       {/* Phone / Gender */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         <FormField
//           label="Phone"
//           name="mobile_No"
//           placeholder="Enter phone number"
//           registerOptions={{
//             required: "Phone Number is required",
//             pattern: {
//               value: /^\d{10}$/,
//               message: "Must be exactly 10 digits",
//             },
//           }}
//         />
//         <FormSelect
//           label="Gender"
//           name="gender"
//           options={[
//             { value: "", label: "Select" },
//             { value: "Male", label: "Male" },
//             { value: "Female", label: "Female" },
//             { value: "Other", label: "Other" },
//           ]}
//           registerOptions={{ required: "Gender is required" }}
//         />
//       </div>

//       {/* Personal Email / DOB / Permanent Address */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormField
//           label="Personal Email"
//           name="personal_Email_Id"
//           placeholder="test@gmail.com"
//           type="email"
//           registerOptions={{
//             required: "Personal Email is required",
//             pattern: {
//               value: /\S+@\S+\.\S+/,
//               message: "Invalid Email",
//             },
//           }}
//         />
//         <FormField
//           label="DOB"
//           name="dob"
//           type="date"
//           registerOptions={{
//             required: "Date of Birth is required",
//             validate: {
//               isAdult: (value) => {
//                 if (!value) return true;
//                 const inputDate = new Date(value);
//                 const today = new Date();
//                 const eighteenYearsAgo = new Date(
//                   today.getFullYear() - 18,
//                   today.getMonth(),
//                   today.getDate()
//                 );
//                 return (
//                   inputDate <= eighteenYearsAgo ||
//                   "You must be at least 18 years old"
//                 );
//               },
//             },
//           }}
//         />
//         <FormTextArea
//           label="Permanent Address"
//           name="permanent_Address"
//           placeholder="Write Address..."
//           registerOptions={{ required: "Permanent Address is required" }}
//         />
//       </div>

//       {/* Work Email / DOJ / Department */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormField
//           label="Work Email"
//           name="working_Email_Id"
//           placeholder="test@company.com"
//           type="email"
//           registerOptions={{
//             required: "Work Email is required",
//             pattern: {
//               value: /\S+@\S+\.\S+/,
//               message: "Invalid Work Email",
//             },
//           }}
//         />
//         <FormField
//           label="DOJ"
//           name="date_of_Joining"
//           type="date"
//           registerOptions={{
//             required: "Date of Joining is required",
//           }}
//         />
//         <FormSelect
//           label="Department"
//           name="departmentAllocated"
//           loading={loadingDepartments}
//           options={[{ value: "", label: "Select Department" }, ...departments]}
//           registerOptions={{ required: "Department is required" }}
//         />
//       </div>

//       {/* Role / Manager / Designation */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormSelect
//           label="Role"
//           name="permission_role"
//           loading={loadingPermissionRoles}
//           options={[
//             { value: "", label: "Select Role" },
//             ...(permissionRoles || []).map((r) => ({
//               value: r.role_name,
//               label: r.role_name,
//             })),
//           ]}
//           registerOptions={{ required: "Role is required" }}
//         />
//         <FormMultiSelect
//           label="Assign Manager"
//           name="assigned_to"
//           loading={loadingAllEmployees}
//           options={allEmployees}
//           requiredMessage="At least one manager must be assigned"
//         />
//         <FormSelect
//           label="Designation"
//           name="designation"
//           loading={loadingDesignations}
//           options={[
//             { value: "", label: "Select Designation" },
//             ...designations,
//           ]}
//           registerOptions={{ required: "Designation is required" }}
//         />
//       </div>

//       {/* Employee ID / Salary / OTP */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormField
//           label="Employee ID"
//           name="employee_Id"
//           placeholder="R10004"
//           registerOptions={{
//             required: "Employee ID is required",
//           }}
//         />
//         <FormField
//           label="Salary"
//           name="salary"
//           placeholder="Salary"
//           type="number"
//           registerOptions={{
//             required: "Salary is required",
//             min: { value: 0, message: "Salary cannot be negative" },
//           }}
//         />
//         <FormSelect
//           label="OTP Required"
//           name="otp"
//           options={[
//             { value: "", label: "Select" },
//             { value: "no", label: "No" },
//             { value: "yes", label: "Yes" },
//           ]}
//           registerOptions={{ required: "OTP selection is required" }}
//         />
//       </div>

//       {/* Office Location / Latitude / Longitude */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormSelect
//           label="Office Location"
//           name="officeLocation"
//           loading={loadingAddresses}
//           options={[{ value: "", label: "Select Office" }, ...addressOptions]}
//           registerOptions={{ required: "Office Location is required" }}
//         />
//         <FormField
//           label="Latitude"
//           name="latitude"
//           placeholder="Latitude"
//           registerOptions={{
//             required: "Latitude is required",
//             pattern: {
//               value: /^-?\d+(\.\d+)?$/,
//               message: "Must be a valid number",
//             },
//           }}
//         />
//         <FormField
//           label="Longitude"
//           name="longitude"
//           placeholder="Longitude"
//           registerOptions={{
//             required: "Longitude is required",
//             pattern: {
//               value: /^-?\d+(\.\d+)?$/,
//               message: "Must be a valid number",
//             },
//           }}
//         />
//       </div>

//       {/* Shift Timing / Permissions */}
//       <div className="mt-6">
//         <FormSelect
//           label="Shift Timing"
//           name="shift_Timing"
//           loading={loadingShiftTimings}
//           options={[
//             { value: "", label: "Select Shift Timings" },
//             ...shiftTimings,
//           ]}
//           registerOptions={{ required: "Shift Timing is required" }}
//         />
//       </div>

//       <div className="mt-6">
//         <FormMultiSelect
//           label="Permissions"
//           name="permission"
//           options={availablePermission.map((p) => ({
//             value: p.permission,
//             label: p.name,
//           }))}
//           requiredMessage="At least one permission must be selected"
//         />
//       </div>

//       {/* Submit / Cancel */}
//       <div className="flex items-center space-x-3 mt-6">
//         <button
//           type="button"
//           className="px-4 py-2 bg-gray-300 text-black rounded dark:bg-gray-700 dark:text-white"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           disabled={submitting}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           {submitting ? "Submitting..." : "Next"}
//         </button>
//       </div>
//     </form>
//   );
// }

// /** Step 2: Qualifications & Experience */
// function Step2QualificationsExperience({
//   onSubmitStep,
//   submitting,
//   qualificationFields,
//   removeQualification,
//   appendQualification,
//   experienceFields,
//   removeExperience,
//   appendExperience,
// }) {
//   const [scope, animate] = useAnimate();
//   const { handleSubmit } = useFormContext();

//   useEffect(() => {
//     animate([
//       [".animatable-input", { opacity: 0, x: 20 }, { duration: 0 }],
//       [
//         ".animatable-input",
//         { opacity: 1, x: 0 },
//         { duration: 0.3, stagger: 0.05 },
//       ],
//     ]);
//   }, [animate]);

//   return (
//     <form ref={scope} onSubmit={handleSubmit(onSubmitStep)}>
//       <h2 className="text-xl font-semibold mb-4">Qualifications</h2>
//       {qualificationFields.map((item, index) => (
//         <div
//           key={item.id}
//           className="border rounded-md p-4 mb-6 dark:border-gray-700"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
//             <FormField
//               label="Qualification Name"
//               name={`qualifications.${index}.qualificationName`}
//               placeholder="Enter Qualification Name"
//             />
//             <FormField
//               label="University/Board"
//               name={`qualifications.${index}.universityBoard`}
//               placeholder="Enter University/Board"
//             />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <FormField
//               label="Total Marks"
//               name={`qualifications.${index}.totalMarks`}
//               placeholder="Total Marks"
//               type="number"
//               registerOptions={{
//                 min: { value: 0, message: "Cannot be negative" },
//               }}
//             />
//             <FormField
//               label="Passing Year"
//               name={`qualifications.${index}.passingYear`}
//               placeholder="YYYY"
//               type="number"
//               registerOptions={{
//                 min: { value: 0, message: "Cannot be negative" },
//               }}
//             />
//             <FormField
//               label="Percentage/CGPA"
//               name={`qualifications.${index}.percentageCgpa`}
//               placeholder="e.g. 80% or 8.0"
//               registerOptions={{
//                 pattern: {
//                   value: /^(\d+(\.\d+)?%?)?$/,
//                   message:
//                     "Enter a valid percentage or decimal (e.g. 80, 80%, 8.0)",
//                 },
//               }}
//             />
//           </div>
//           <div className="flex items-center space-x-3 mt-4">
//             {qualificationFields.length > 1 && (
//               <button
//                 type="button"
//                 className="px-4 py-2 bg-red-500 text-white rounded"
//                 onClick={() => removeQualification(index)}
//               >
//                 Remove
//               </button>
//             )}
//             {index === qualificationFields.length - 1 &&
//               qualificationFields.length < 20 && (
//                 <button
//                   type="button"
//                   onClick={() =>
//                     appendQualification({
//                       qualificationName: "",
//                       universityBoard: "",
//                       totalMarks: "",
//                       passingYear: "",
//                       percentageCgpa: "",
//                     })
//                   }
//                   className="px-4 py-2 bg-blue-600 text-white rounded"
//                 >
//                   Add More
//                 </button>
//               )}
//           </div>
//         </div>
//       ))}

//       <h2 className="text-xl font-semibold mb-4">Experience</h2>
//       {experienceFields.map((item, index) => (
//         <div
//           key={item.id}
//           className="border rounded-md p-4 mb-6 dark:border-gray-700"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
//             <FormField
//               label="Company Name"
//               name={`experiences.${index}.companyName`}
//               placeholder="Enter Company Name"
//             />
//             <FormField
//               label="Designation"
//               name={`experiences.${index}.designation`}
//               placeholder="Enter Designation"
//               registerOptions={{
//                 pattern: {
//                   value: lettersOnlyRegex,
//                   message: "Can only contain letters and spaces",
//                 },
//               }}
//             />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <FormField
//               label="Total Years of Experience"
//               name={`experiences.${index}.totalExperience`}
//               placeholder="e.g. 3"
//               type="number"
//               registerOptions={{
//                 min: { value: 0, message: "Cannot be negative" },
//               }}
//             />
//             <FormField
//               label="Start Date"
//               name={`experiences.${index}.startDate`}
//               type="date"
//             />
//             <FormField
//               label="End Date"
//               name={`experiences.${index}.endDate`}
//               type="date"
//             />
//           </div>
//           <div className="flex items-center space-x-3 mt-4">
//             {experienceFields.length > 1 && (
//               <button
//                 type="button"
//                 className="px-4 py-2 bg-red-500 text-white rounded"
//                 onClick={() => removeExperience(index)}
//               >
//                 Remove
//               </button>
//             )}
//             {index === experienceFields.length - 1 &&
//               experienceFields.length < 20 && (
//                 <button
//                   type="button"
//                   onClick={() =>
//                     appendExperience({
//                       companyName: "",
//                       designation: "",
//                       totalExperience: "",
//                       startDate: "",
//                       endDate: "",
//                     })
//                   }
//                   className="px-4 py-2 bg-blue-600 text-white rounded"
//                 >
//                   Add More
//                 </button>
//               )}
//           </div>
//         </div>
//       ))}

//       <div className="flex items-center space-x-3 mt-6">
//         <button
//           type="button"
//           className="px-4 py-2 bg-gray-300 text-black rounded dark:bg-gray-700 dark:text-white"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           disabled={submitting}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           {submitting ? "Submitting..." : "Next"}
//         </button>
//       </div>
//     </form>
//   );
// }



// function Step3PersonalDetails({
//   onSubmitStep,
//   submitting,
//   documentFields,
//   removeDocument,
//   appendDocument,
// }) {
//   const [scope, animate] = useAnimate();
//   const { handleSubmit } = useFormContext();

//   useEffect(() => {
//     animate([
//       [".animatable-input", { opacity: 0, x: 20 }, { duration: 0 }],
//       [
//         ".animatable-input",
//         { opacity: 1, x: 0 },
//         { duration: 0.3, stagger: 0.05 },
//       ],
//     ]);
//   }, [animate]);

//   return (
//     <form ref={scope} onSubmit={handleSubmit(onSubmitStep)}>
//       {/* PAN / Aadhaar */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <FormField
//           label="PAN Number"
//           name="pan_No"
//           placeholder="ABCDE1234F"
//           registerOptions={{
//             required: "PAN is required",
//             pattern: {
//               value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
//               message: "Format: ABCDE1234F",
//             },
//           }}
//         />
//         <FormField
//           label="Aadhaar Number"
//           name="adhaar_Number"
//           placeholder="12-digit Aadhaar"
//           registerOptions={{
//             required: "Aadhaar is required",
//             pattern: {
//               value: /^\d{12}$/,
//               message: "Aadhaar must be 12 digits",
//             },
//           }}
//         />
//       </div>

//       {/* Bank Details */}
//       <h2 className="text-xl font-semibold mt-8 mb-4">Bank Details</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <FormField
//           label="Bank Holder Name"
//           name="bank_Holder_Name"
//           placeholder="Account Holder Name"
//           registerOptions={{
//             required: "Bank Holder Name is required",
//             pattern: {
//               value: lettersOnlyRegex,
//               message: "Can only contain letters and spaces",
//             },
//           }}
//         />
//         <FormField
//           label="Bank Name"
//           name="bank_Name"
//           placeholder="e.g. State Bank"
//           registerOptions={{
//             required: "Bank Name is required",
//             pattern: {
//               value: lettersOnlyRegex,
//               message: "Can only contain letters and spaces",
//             },
//           }}
//         />
//         <FormField
//           label="Bank Account No."
//           name="bank_Account_No"
//           placeholder="1234567890"
//           registerOptions={{
//             required: "Account No. is required",
//             pattern: {
//               value: /^[0-9]{9,18}$/,
//               message: "Account must be 9 to 18 digits",
//             },
//           }}
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormField
//           label="Confirm Bank Account No."
//           name="confirmBankAccountNo"
//           placeholder="Re-enter Account No."
//           registerOptions={{
//             required: "Please confirm Bank Account No.",
//             validate: (val, formValues) =>
//               val === formValues.bank_Account_No ||
//               "Account numbers do not match",
//           }}
//         />
//         <FormField
//           label="IFSC Code"
//           name="ifsc_Code"
//           placeholder="ABCD0123456"
//           registerOptions={{
//             required: "IFSC Code is required",
//             pattern: {
//               value: /^[A-Z0-9]{11}$/,
//               message: "Must be 11 chars (letters/numbers)",
//             },
//           }}
//         />

//         {/* Upload Documents Section */}
//         <div className="col-span-1 md:col-span-2">
//           <label className="block font-medium mb-1">
//             Upload Documents <span className="text-red-500">*</span>
//           </label>

//           {/* If no documents, show a “no documents found” box */}
//           {documentFields.length === 0 && (
//             <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded p-4 text-center text-gray-500">
//               <FaUpload className="text-2xl mb-2" />
//               <span>No document found</span>
//             </div>
//           )}

//           {/* Otherwise, list out each document uploader */}
//           {documentFields.map((item, index) => (
//             <DocumentUploader
//               key={item.id}
//               index={index}
//               removeDocument={removeDocument}
//               totalDocs={documentFields.length}
//             />
//           ))}

//           {/* Button to add more documents */}
//           {documentFields.length < 20 && (
//             <button
//               type="button"
//               onClick={() => appendDocument({ name: "", file: null })}
//               className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Add More Documents
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex items-center space-x-3 mt-6">
//         <button
//           type="button"
//           className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           disabled={submitting}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           {submitting ? "Saving..." : "Save"}
//         </button>
//       </div>
//     </form>
//   );
// }


// /** Document Uploader */
// function DocumentUploader({ index, removeDocument, totalDocs }) {
//   const { register, setValue, watch, formState } = useFormContext();
//   const docFile = watch(`documents.${index}.file`);
//   const docNameError = formState.errors?.documents?.[index]?.name?.message;
//   const docFileError = formState.errors?.documents?.[index]?.file?.message;

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > FILE_SIZE_LIMIT) {
//         alert("File must be <= 5MB");
//         return;
//       }
//       const allowed = ["image/png", "image/jpeg", "application/pdf"];
//       if (!allowed.includes(file.type)) {
//         alert("Only JPG/PNG/PDF allowed");
//         return;
//       }
//       setValue(`documents.${index}.file`, file);
//     }
//   };

//   return (
//     <div className="border rounded p-3 mb-2 dark:border-gray-700 dark:bg-gray-800">
//       <label className="block text-sm font-medium mb-1">
//         Document Name <span className="text-red-500">*</span>
//       </label>
//       <input
//         className={`
//           animatable-input w-full px-3 py-2 rounded mb-2
//           focus:outline-none focus:ring-2
//           dark:bg-gray-700 dark:text-gray-100
//           ${
//             docNameError
//               ? "border border-red-500 focus:ring-red-500 dark:border-red-500"
//               : "border border-gray-300 dark:border-gray-700 focus:ring-blue-400"
//           }
//         `}
//         placeholder="Enter Document Name"
//         {...register(`documents.${index}.name`, {
//           required: "Document name is required",
//         })}
//       />
//       {docNameError && <p className="text-red-500 text-sm">{docNameError}</p>}

//       <label className="block text-sm font-medium mb-1">File</label>
//       <input
//         type="file"
//         accept=".png,.jpg,.jpeg,.pdf"
//         onChange={handleFileChange}
//         className="mb-2"
//       />
//       {docFile && (
//         <div className="mt-2 flex items-center space-x-2">
//           <FaTrash
//             className="cursor-pointer text-red-500"
//             onClick={() => setValue(`documents.${index}.file`, null)}
//           />
//           <span className="text-sm dark:text-gray-200">{docFile.name}</span>
//         </div>
//       )}
//       {docFileError && <p className="text-red-500 text-sm">{docFileError}</p>}

//       {totalDocs > 1 && (
//         <button
//           type="button"
//           onClick={() => removeDocument(index)}
//           className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded flex items-center"
//         >
//           <FaTrash className="mr-1" />
//           Remove Document
//         </button>
//       )}
//     </div>
//   );
// }

// /** Common FormField */
// function FormField({ label, name, placeholder, type = "text", registerOptions }) {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();
//   const errorMsg = errors?.[name]?.message;

//   return (
//     <div>
//       <label className="block font-medium mb-1">{label}</label>
//       <input
//         type={type}
//         placeholder={placeholder}
//         {...register(name, registerOptions)}
//         className={`
//           animatable-input w-full px-3 py-2 rounded focus:outline-none focus:ring-2
//           placeholder-gray-400 dark:placeholder-gray-500
//           ${
//             errorMsg
//               ? // Error state: always show a border, color it red
//                 "border border-red-500 focus:ring-red-500 dark:border-red-500"
//               : // Normal state: show a border, color it gray/dark gray
//                 "border border-gray-300 dark:border-gray-700 focus:ring-blue-400"
//           }
//           dark:bg-gray-800 dark:text-gray-100
//         `}
//       />
//       {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
//     </div>
//   );
// }

// /** Common FormSelect */
// function FormSelect({ label, name, options = [], loading = false, registerOptions }) {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();
//   const errorMsg = errors?.[name]?.message;

//   return (
//     <div>
//       <label className="block font-medium mb-1">{label}</label>
//       <select
//         {...register(name, registerOptions)}
//         className={`
//           animatable-input w-full px-3 py-2 rounded focus:outline-none focus:ring-2
//           ${
//             errorMsg
//               ? "border border-red-500 focus:ring-red-500 dark:border-red-500"
//               : "border border-gray-300 dark:border-gray-700 focus:ring-blue-400"
//           }
//           dark:bg-gray-800 dark:text-gray-100
//         `}
//       >
//         {loading && <option value="">Loading...</option>}
//         {!loading &&
//           options.map((opt, idx) => (
//             <option key={idx} value={opt.value}>
//               {opt.label}
//             </option>
//           ))}
//       </select>
//       {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
//     </div>
//   );
// }

// /** Common FormTextArea */
// function FormTextArea({ label, name, placeholder, registerOptions, rows = 3 }) {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();
//   const errorMsg = errors?.[name]?.message;

//   return (
//     <div>
//       <label className="block font-medium mb-1">{label}</label>
//       <textarea
//         rows={rows}
//         placeholder={placeholder}
//         {...register(name, registerOptions)}
//         className={`
//           animatable-input w-full px-3 py-2 rounded
//           focus:outline-none focus:ring-2
//           placeholder-gray-400 dark:placeholder-gray-500
//           ${
//             errorMsg
//               ? "border border-red-600 focus:ring-red-600 dark:border-red-600"
//               : "border border-gray-300 dark:border-gray-600 focus:ring-blue-400"
//           }
//           dark:bg-gray-800 dark:text-gray-100
//         `}
//       />
//       {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
//     </div>
//   );
// }

// /** Multi-select using react-select (with dark-mode) */
// function FormMultiSelect({ label, name, options = [], loading = false, requiredMessage }) {
//   const {
//     control,
//     formState: { errors },
//   } = useFormContext();
//   const errorMsg = errors?.[name]?.message;

//   const isDarkMode =
//     typeof document !== "undefined"
//       ? document.documentElement.classList.contains("dark")
//       : false;

//   const customStyles = {
//     control: (base, state) => ({
//       ...base,
//       borderColor: errorMsg ? "red" : base.borderColor,
//       borderWidth: 1,
//       backgroundColor: isDarkMode ? "#374151" : "#fff",
//       color: isDarkMode ? "#fff" : "#000",
//       "&:hover": {
//         borderColor: errorMsg ? "red" : base.borderColor,
//       },
//     }),
//     menu: (base) => ({
//       ...base,
//       backgroundColor: isDarkMode ? "#374151" : "#fff",
//       color: isDarkMode ? "#fff" : "#000",
//     }),
//     option: (base, state) => ({
//       ...base,
//       backgroundColor: state.isFocused
//         ? isDarkMode
//           ? "#4B5563"
//           : "#f5f5f5"
//         : isDarkMode
//         ? "#374151"
//         : "#fff",
//       color: isDarkMode ? "#fff" : "#000",
//     }),
//     singleValue: (base) => ({
//       ...base,
//       color: isDarkMode ? "#fff" : "#000",
//     }),
//     multiValue: (base) => ({
//       ...base,
//       backgroundColor: isDarkMode ? "#4B5563" : "#e2e8f0",
//       color: isDarkMode ? "#fff" : "#000",
//     }),
//     multiValueLabel: (base) => ({
//       ...base,
//       color: isDarkMode ? "#fff" : "#000",
//     }),
//     multiValueRemove: (base) => ({
//       ...base,
//       color: isDarkMode ? "#fff" : "#000",
//       ":hover": {
//         backgroundColor: isDarkMode ? "#6B7280" : "#cbd5e0",
//         color: isDarkMode ? "#fff" : "#000",
//       },
//     }),
//   };

//   return (
//     <div>
//       <label className="block font-medium mb-1">{label}</label>
//       <Controller
//         name={name}
//         control={control}
//         rules={{
//           validate: (value) => {
//             if (requiredMessage && (!value || value.length === 0)) {
//               return requiredMessage;
//             }
//             return true;
//           },
//         }}
//         render={({ field }) => {
//           const { onChange, value } = field;
//           // Convert stored values into a valid "selected" array
//           const selected = options.filter((opt) =>
//             (value || []).includes(opt.value)
//           );

//           return (
//             <Select
//               isMulti
//               options={options}
//               isLoading={loading}
//               value={selected}
//               onChange={(selectedOptions) => {
//                 onChange(selectedOptions.map((o) => o.value));
//               }}
//               styles={customStyles}
//             />
//           );
//         }}
//       />
//       {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import {
  useForm,
  FormProvider,
  useFieldArray,
  useFormContext,
  Controller,
} from "react-hook-form";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import Select from "react-select";
import { toast } from "react-hot-toast";
import { FaTrash, FaUpload, FaFilePdf } from "react-icons/fa";

import useEmployeeStore from "../../store/useEmployeeStore.js";
import { createEmployee } from "../../service/employeeService.js";
import ConfirmationDialog from "../common/ConfirmationDialog";
import { availablePermission } from "./AvailablePermissions.jsx";

const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB
const lettersOnlyRegex = /^[A-Za-z\s]+$/;

export default function EmployeeFormTabs({
  formTitle = "Employee Form",
  onComplete = () => {},
}) {
  const {
    shiftTimings,
    employmentTypes,
    departments,
    allEmployees,
    permissionRoles,
    addressOptions,
    designations,
    loadingShiftTimings,
    loadingEmploymentTypes,
    loadingDepartments,
    loadingAllEmployees,
    loadingPermissionRoles,
    loadingAddresses,
    loadingDesignations,
    loadShiftTimings,
    loadEmploymentTypes,
    loadDepartments,
    loadAllEmployees,
    loadPermissionRoles,
    loadCompanyAddresses,
    loadDesignations,
  } = useEmployeeStore();

  const [activeTab, setActiveTab] = useState(0);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadShiftTimings();
    loadEmploymentTypes();
    loadDepartments();
    loadAllEmployees();
    loadPermissionRoles();
    loadCompanyAddresses();
    loadDesignations();
    // eslint-disable-next-line
  }, []);

  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      first_Name: "",
      last_Name: "",
      gender: "",
      mobile_No: "",
      personal_Email_Id: "",
      dob: "",
      permanent_Address: "",
      working_Email_Id: "",
      date_of_Joining: "",
      departmentAllocated: "",
      permission_role: "",
      permission: [],
      assigned_to: [],
      designation: "",
      employee_Id: "",
      officeLocation: "",
      latitude: "",
      longitude: "",
      shift_Timing: "",
      salary: "",
      otp: "no",
      no_of_Paid_Leave: 0,
      employee_Type: "",
      user_Avatar: null,
      qualifications: [
        {
          qualificationName: "",
          universityBoard: "",
          totalMarks: "",
          passingYear: "",
          percentageCgpa: "",
        },
      ],
      experiences: [
        {
          companyName: "",
          designation: "",
          totalExperience: "",
          startDate: "",
          endDate: "",
        },
      ],
      pan_No: "",
      adhaar_Number: "",
      bank_Holder_Name: "",
      bank_Name: "",
      bank_Account_No: "",
      confirmBankAccountNo: "",
      ifsc_Code: "",
      documents: [{ name: "", file: null }],
    },
  });

  const { handleSubmit, getValues, control } = methods;

  const {
    fields: qualificationFields,
    append: appendQualification,
    remove: removeQualification,
  } = useFieldArray({
    control,
    name: "qualifications",
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "experiences",
  });

  const {
    fields: documentFields,
    append: appendDocument,
    remove: removeDocument,
  } = useFieldArray({
    control,
    name: "documents",
  });

  const onSubmitStep = () => {
    if (activeTab < 2) {
      setActiveTab((prev) => prev + 1);
    } else {
      setConfirmationOpen(true);
    }
  };

  const handleConfirmSubmit = async () => {
    setConfirmationOpen(false);
    setSubmitting(true);
    try {
      const formValues = getValues();
      const formData = new FormData();

      const omitKeys = [
        "permission",
        "assigned_to",
        "qualifications",
        "experiences",
        "documents",
        "confirmBankAccountNo",
        "user_Avatar",
      ];

      // Append normal form fields
      Object.keys(formValues).forEach((key) => {
        if (!omitKeys.includes(key)) {
          const val = formValues[key];
          if (val !== null && val !== "") {
            formData.append(key, val);
          }
        }
      });

      // Arrays & file fields
      formValues.permission.forEach((perm, index) => {
        formData.append(`permission[${index}]`, perm);
      });
      formValues.assigned_to.forEach((mgr, index) => {
        formData.append(`assigned_to[${index}]`, mgr);
      });
      if (formValues.user_Avatar) {
        formData.append("user_Avatar", formValues.user_Avatar);
      }
      formValues.documents.forEach((doc, index) => {
        if (doc.name) formData.append(`documents[${index}][name]`, doc.name);
        if (doc.file) formData.append(`documents[${index}][file]`, doc.file);
      });
      formValues.qualifications.forEach((qual, index) => {
        formData.append(
          `qualifications[${index}][qualificationName]`,
          qual.qualificationName || ""
        );
        formData.append(
          `qualifications[${index}][universityBoard]`,
          qual.universityBoard || ""
        );
        formData.append(
          `qualifications[${index}][totalMarks]`,
          qual.totalMarks || ""
        );
        formData.append(`qualifications[${index}][year]`, qual.passingYear || "");
        formData.append(
          `qualifications[${index}][percentageCgpa]`,
          qual.percentageCgpa || ""
        );
      });
      formValues.experiences.forEach((exp, index) => {
        formData.append(
          `experiences[${index}][companyName]`,
          exp.companyName || ""
        );
        formData.append(
          `experiences[${index}][designation]`,
          exp.designation || ""
        );
        formData.append(`experiences[${index}][startDate]`, exp.startDate || "");
        formData.append(`experiences[${index}][endDate]`, exp.endDate || "");
        formData.append(
          `experiences[${index}][totalExperience]`,
          exp.totalExperience || ""
        );
      });

      const response = await createEmployee(formData);
      if (response.success) {
        toast.success("User registered successfully!");
        onComplete(response);
      } else {
        toast.error("Registration failed: " + response.message);
      }
    } catch (error) {
      if (error.response?.data?.details) {
        error.response.data.details.forEach((detail) => {
          toast.error(detail.message);
        });
      } else if (error.response?.data?.message) {
        toast.error("Registration failed: " + error.response.data.message);
      } else {
        toast.error("Registration failed: " + error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelSubmit = () => {
    setConfirmationOpen(false);
  };

  return (
    <FormProvider {...methods}>
      <div className="employee-form bg-bg-primary text-text-primary py-2">
        <div className="">
          <div className="bg-bg-secondary rounded-md shadow p-6">
            <h1 className="text-2xl font-bold text-center mb-6">{formTitle}</h1>

            {/* Tabs */}
            <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
              <TabButton
                label="Employee Details"
                isActive={activeTab === 0}
                onClick={() => setActiveTab(0)}
              />
              <TabButton
                label="Qualifications & Experience"
                isActive={activeTab === 1}
                onClick={() => setActiveTab(1)}
              />
              <TabButton
                label="Personal Details"
                isActive={activeTab === 2}
                onClick={() => setActiveTab(2)}
              />
            </div>

            <div className="mt-4">
              <AnimatePresence mode="wait">
                {activeTab === 0 && (
                  <motion.div
                    key="tab-employee"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Step1EmployeeDetails
                      onSubmitStep={onSubmitStep}
                      submitting={submitting}
                    />
                  </motion.div>
                )}

                {activeTab === 1 && (
                  <motion.div
                    key="tab-qualifications"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Step2QualificationsExperience
                      onSubmitStep={onSubmitStep}
                      submitting={submitting}
                      qualificationFields={qualificationFields}
                      removeQualification={removeQualification}
                      appendQualification={appendQualification}
                      experienceFields={experienceFields}
                      removeExperience={removeExperience}
                      appendExperience={appendExperience}
                    />
                  </motion.div>
                )}

                {activeTab === 2 && (
                  <motion.div
                    key="tab-personal"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Step3PersonalDetails
                      onSubmitStep={onSubmitStep}
                      submitting={submitting}
                      documentFields={documentFields}
                      removeDocument={removeDocument}
                      appendDocument={appendDocument}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation dialog for final submit */}
      <ConfirmationDialog
        open={confirmationOpen}
        title="Are you sure?"
        message="Do you want to add this user?"
        confirmText="Yes"
        cancelText="No, cancel!"
        onConfirm={handleConfirmSubmit}
        onCancel={handleCancelSubmit}
      />
    </FormProvider>
  );
}

/** Simple tab switch button */
function TabButton({ label, isActive, onClick }) {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium 
        ${
          isActive
            ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
            : "text-gray-600 dark:text-gray-300 hover:text-blue-600"
        }
      `}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

/** Step 1: Employee Details */
function Step1EmployeeDetails({ onSubmitStep, submitting }) {
  const [scope, animate] = useAnimate();
  const { handleSubmit, register, watch, setValue, formState } =
    useFormContext();
  const { errors } = formState;
  const [avatarPreview, setAvatarPreview] = useState(null);

  const addressOptions = useEmployeeStore((state) => state.addressOptions);
  const departments = useEmployeeStore((state) => state.departments);
  const shiftTimings = useEmployeeStore((state) => state.shiftTimings);
  const employmentTypes = useEmployeeStore((state) => state.employmentTypes);
  const permissionRoles = useEmployeeStore((state) => state.permissionRoles);
  const designations = useEmployeeStore((state) => state.designations);
  const allEmployees = useEmployeeStore((state) => state.allEmployees);

  const loadingAddresses = useEmployeeStore((state) => state.loadingAddresses);
  const loadingDepartments = useEmployeeStore((state) => state.loadingDepartments);
  const loadingShiftTimings = useEmployeeStore((state) => state.loadingShiftTimings);
  const loadingEmploymentTypes = useEmployeeStore((state) => state.loadingEmploymentTypes);
  const loadingPermissionRoles = useEmployeeStore((state) => state.loadingPermissionRoles);
  const loadingDesignations = useEmployeeStore((state) => state.loadingDesignations);
  const loadingAllEmployees = useEmployeeStore((state) => state.loadingAllEmployees);

  useEffect(() => {
    animate([
      [".animatable-input", { opacity: 0, x: 20 }, { duration: 0 }],
      [
        ".animatable-input",
        { opacity: 1, x: 0 },
        { duration: 0.3, stagger: 0.05 },
      ],
    ]);
  }, [animate]);

  // If office location changes, auto-fill lat/long
  const watchOfficeLocation = watch("officeLocation");
  useEffect(() => {
    const selected = addressOptions?.find(
      (opt) => opt.value === watchOfficeLocation
    );
    if (selected) {
      setValue("latitude", selected.latitude || "");
      setValue("longitude", selected.longitude || "");
    } else {
      setValue("latitude", "");
      setValue("longitude", "");
    }
  }, [watchOfficeLocation, addressOptions, setValue]);

  // If role changes, auto-fill the role’s permissions
  const watchRole = watch("permission_role");
  useEffect(() => {
    const foundRole = permissionRoles?.find((r) => r.role_name === watchRole);
    if (foundRole?.permission) {
      const perms = foundRole.permission.map((p) => p.permission);
      setValue("permission", perms);
    } else {
      setValue("permission", []);
    }
  }, [watchRole, permissionRoles, setValue]);

  // Handle profile avatar
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > FILE_SIZE_LIMIT) {
        alert("Profile image must be <= 5MB");
        return;
      }
      if (!["image/png", "image/jpeg"].includes(file.type)) {
        alert("Unsupported file format. Only PNG/JPEG");
        return;
      }
      setValue("user_Avatar", file);
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setValue("user_Avatar", null);
      setAvatarPreview(null);
    }
  };

  return (
    <form ref={scope} onSubmit={handleSubmit(onSubmitStep)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile image */}
        <div className="flex flex-col items-center">
          <label className="block font-medium mb-2">Profile Image</label>
          <div
            className="w-32 h-32 rounded-full border relative mb-2 flex items-center justify-center overflow-hidden cursor-pointer dark:border-gray-600"
            onClick={() => document.getElementById("avatarInput")?.click()}
          >
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-400 text-sm dark:text-gray-500">
                No Image
              </span>
            )}
          </div>
          <input
            id="avatarInput"
            type="file"
            accept="image/png, image/jpeg"
            style={{ display: "none" }}
            onChange={handleProfileImageChange}
          />
          {errors.user_Avatar && (
            <p className="text-red-500 text-sm mt-1">
              {errors.user_Avatar.message}
            </p>
          )}
        </div>

        {/* First & Last Name */}
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="First Name"
            name="first_Name"
            placeholder="Enter First Name"
            registerOptions={{
              required: "First Name is required",
              pattern: {
                value: lettersOnlyRegex,
                message: "Can only contain letters and spaces",
              },
            }}
          />
          <FormField
            label="Last Name"
            name="last_Name"
            placeholder="Enter Last Name"
            registerOptions={{
              pattern: {
                value: lettersOnlyRegex,
                message: "Can only contain letters and spaces",
              },
            }}
          />
        </div>
      </div>

      {/* Paid leaves / Employee Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <FormField
          label="No. of Paid Leaves"
          name="no_of_Paid_Leave"
          placeholder="e.g. 12"
          type="number"
          registerOptions={{
            required: "No. of Paid Leaves is required",
            min: { value: 0, message: "Cannot be negative" },
          }}
        />
        <FormSelect
          label="Employee Type"
          name="employee_Type"
          loading={loadingEmploymentTypes}
          options={[
            { value: "", label: "Select Employee Type" },
            ...employmentTypes,
          ]}
          registerOptions={{ required: "Employee Type is required" }}
        />
      </div>

      {/* Phone / Gender */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <FormField
          label="Phone"
          name="mobile_No"
          placeholder="Enter phone number"
          registerOptions={{
            required: "Phone Number is required",
            pattern: {
              value: /^\d{10}$/,
              message: "Must be exactly 10 digits",
            },
          }}
        />
        <FormSelect
          label="Gender"
          name="gender"
          options={[
            { value: "", label: "Select" },
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
            { value: "Other", label: "Other" },
          ]}
          registerOptions={{ required: "Gender is required" }}
        />
      </div>

      {/* Personal Email / DOB / Permanent Address */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <FormField
          label="Personal Email"
          name="personal_Email_Id"
          placeholder="test@gmail.com"
          type="email"
          registerOptions={{
            required: "Personal Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid Email",
            },
          }}
        />
        <FormField
          label="DOB"
          name="dob"
          type="date"
          registerOptions={{
            required: "Date of Birth is required",
            validate: {
              isAdult: (value) => {
                if (!value) return true;
                const inputDate = new Date(value);
                const today = new Date();
                const eighteenYearsAgo = new Date(
                  today.getFullYear() - 18,
                  today.getMonth(),
                  today.getDate()
                );
                return (
                  inputDate <= eighteenYearsAgo ||
                  "You must be at least 18 years old"
                );
              },
            },
          }}
        />
        <FormTextArea
          label="Permanent Address"
          name="permanent_Address"
          placeholder="Write Address..."
          registerOptions={{ required: "Permanent Address is required" }}
        />
      </div>

      {/* Work Email / DOJ / Department */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <FormField
          label="Work Email"
          name="working_Email_Id"
          placeholder="test@company.com"
          type="email"
          registerOptions={{
            required: "Work Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid Work Email",
            },
          }}
        />
        <FormField
          label="DOJ"
          name="date_of_Joining"
          type="date"
          registerOptions={{
            required: "Date of Joining is required",
          }}
        />
        <FormSelect
          label="Department"
          name="departmentAllocated"
          loading={loadingDepartments}
          options={[{ value: "", label: "Select Department" }, ...departments]}
          registerOptions={{ required: "Department is required" }}
        />
      </div>

      {/* Role / Manager / Designation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <FormSelect
          label="Role"
          name="permission_role"
          loading={loadingPermissionRoles}
          options={[
            { value: "", label: "Select Role" },
            ...(permissionRoles || []).map((r) => ({
              value: r.role_name,
              label: r.role_name,
            })),
          ]}
          registerOptions={{ required: "Role is required" }}
        />
        <FormMultiSelect
          label="Assign Manager"
          name="assigned_to"
          loading={loadingAllEmployees}
          options={allEmployees}
          requiredMessage="At least one manager must be assigned"
        />
        <FormSelect
          label="Designation"
          name="designation"
          loading={loadingDesignations}
          options={[
            { value: "", label: "Select Designation" },
            ...designations,
          ]}
          registerOptions={{ required: "Designation is required" }}
        />
      </div>

      {/* Employee ID / Salary / OTP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <FormField
          label="Employee ID"
          name="employee_Id"
          placeholder="R10004"
          registerOptions={{
            required: "Employee ID is required",
          }}
        />
        <FormField
          label="Salary"
          name="salary"
          placeholder="Salary"
          type="number"
          registerOptions={{
            required: "Salary is required",
            min: { value: 0, message: "Salary cannot be negative" },
          }}
        />
        <FormSelect
          label="OTP Required"
          name="otp"
          options={[
            { value: "", label: "Select" },
            { value: "no", label: "No" },
            { value: "yes", label: "Yes" },
          ]}
          registerOptions={{ required: "OTP selection is required" }}
        />
      </div>

      {/* Office Location / Latitude / Longitude */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <FormSelect
          label="Office Location"
          name="officeLocation"
          loading={loadingAddresses}
          options={[{ value: "", label: "Select Office" }, ...addressOptions]}
          registerOptions={{ required: "Office Location is required" }}
        />
        <FormField
          label="Latitude"
          name="latitude"
          placeholder="Latitude"
          registerOptions={{
            required: "Latitude is required",
            pattern: {
              value: /^-?\d+(\.\d+)?$/,
              message: "Must be a valid number",
            },
          }}
        />
        <FormField
          label="Longitude"
          name="longitude"
          placeholder="Longitude"
          registerOptions={{
            required: "Longitude is required",
            pattern: {
              value: /^-?\d+(\.\d+)?$/,
              message: "Must be a valid number",
            },
          }}
        />
      </div>

      {/* Shift Timing / Permissions */}
      <div className="mt-6">
        <FormSelect
          label="Shift Timing"
          name="shift_Timing"
          loading={loadingShiftTimings}
          options={[
            { value: "", label: "Select Shift Timings" },
            ...shiftTimings,
          ]}
          registerOptions={{ required: "Shift Timing is required" }}
        />
      </div>

      <div className="mt-6">
        <FormMultiSelect
          label="Permissions"
          name="permission"
          options={availablePermission.map((p) => ({
            value: p.permission,
            label: p.name,
          }))}
          requiredMessage="At least one permission must be selected"
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center space-x-3 mt-6">
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 text-black rounded dark:bg-gray-700 dark:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {submitting ? "Submitting..." : "Next"}
        </button>
      </div>
    </form>
  );
}

/** Step 2: Qualifications & Experience */
function Step2QualificationsExperience({
  onSubmitStep,
  submitting,
  qualificationFields,
  removeQualification,
  appendQualification,
  experienceFields,
  removeExperience,
  appendExperience,
}) {
  const [scope, animate] = useAnimate();
  const { handleSubmit } = useFormContext();

  useEffect(() => {
    animate([
      [".animatable-input", { opacity: 0, x: 20 }, { duration: 0 }],
      [
        ".animatable-input",
        { opacity: 1, x: 0 },
        { duration: 0.3, stagger: 0.05 },
      ],
    ]);
  }, [animate]);

  return (
    <form ref={scope} onSubmit={handleSubmit(onSubmitStep)}>
      <h2 className="text-xl font-semibold mb-4">Qualifications</h2>
      {qualificationFields.map((item, index) => (
        <div
          key={item.id}
          className="border rounded-md p-4 mb-6 dark:border-gray-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <FormField
              label="Qualification Name"
              name={`qualifications.${index}.qualificationName`}
              placeholder="Enter Qualification Name"
            />
            <FormField
              label="University/Board"
              name={`qualifications.${index}.universityBoard`}
              placeholder="Enter University/Board"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              label="Total Marks"
              name={`qualifications.${index}.totalMarks`}
              placeholder="Total Marks"
              type="number"
              registerOptions={{
                min: { value: 0, message: "Cannot be negative" },
              }}
            />
            <FormField
              label="Passing Year"
              name={`qualifications.${index}.passingYear`}
              placeholder="YYYY"
              type="number"
              registerOptions={{
                min: { value: 0, message: "Cannot be negative" },
              }}
            />
            <FormField
              label="Percentage/CGPA"
              name={`qualifications.${index}.percentageCgpa`}
              placeholder="e.g. 80% or 8.0"
              registerOptions={{
                pattern: {
                  value: /^(\d+(\.\d+)?%?)?$/,
                  message: "Enter a valid percentage or decimal (e.g. 80, 80%, 8.0)",
                },
              }}
            />
          </div>
          <div className="flex items-center space-x-3 mt-4">
            {qualificationFields.length > 1 && (
              <button
                type="button"
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => removeQualification(index)}
              >
                Remove
              </button>
            )}
            {index === qualificationFields.length - 1 &&
              qualificationFields.length < 20 && (
                <button
                  type="button"
                  onClick={() =>
                    appendQualification({
                      qualificationName: "",
                      universityBoard: "",
                      totalMarks: "",
                      passingYear: "",
                      percentageCgpa: "",
                    })
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Add More
                </button>
              )}
          </div>
        </div>
      ))}

      <h2 className="text-xl font-semibold mb-4">Experience</h2>
      {experienceFields.map((item, index) => (
        <div
          key={item.id}
          className="border rounded-md p-4 mb-6 dark:border-gray-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <FormField
              label="Company Name"
              name={`experiences.${index}.companyName`}
              placeholder="Enter Company Name"
            />
            <FormField
              label="Designation"
              name={`experiences.${index}.designation`}
              placeholder="Enter Designation"
              registerOptions={{
                pattern: {
                  value: lettersOnlyRegex,
                  message: "Can only contain letters and spaces",
                },
              }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              label="Total Years of Experience"
              name={`experiences.${index}.totalExperience`}
              placeholder="e.g. 3"
              type="number"
              registerOptions={{
                min: { value: 0, message: "Cannot be negative" },
              }}
            />
            <FormField
              label="Start Date"
              name={`experiences.${index}.startDate`}
              type="date"
            />
            <FormField
              label="End Date"
              name={`experiences.${index}.endDate`}
              type="date"
            />
          </div>
          <div className="flex items-center space-x-3 mt-4">
            {experienceFields.length > 1 && (
              <button
                type="button"
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => removeExperience(index)}
              >
                Remove
              </button>
            )}
            {index === experienceFields.length - 1 &&
              experienceFields.length < 20 && (
                <button
                  type="button"
                  onClick={() =>
                    appendExperience({
                      companyName: "",
                      designation: "",
                      totalExperience: "",
                      startDate: "",
                      endDate: "",
                    })
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Add More
                </button>
              )}
          </div>
        </div>
      ))}

      <div className="flex items-center space-x-3 mt-6">
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 text-black rounded dark:bg-gray-700 dark:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {submitting ? "Submitting..." : "Next"}
        </button>
      </div>
    </form>
  );
}

/** Step 3: Personal Details + Document Upload with Previews & Hidden input */
function Step3PersonalDetails({
  onSubmitStep,
  submitting,
  documentFields,
  removeDocument,
  appendDocument,
}) {
  const [scope, animate] = useAnimate();
  const { handleSubmit } = useFormContext();

  useEffect(() => {
    animate([
      [".animatable-input", { opacity: 0, x: 20 }, { duration: 0 }],
      [
        ".animatable-input",
        { opacity: 1, x: 0 },
        { duration: 0.3, stagger: 0.05 },
      ],
    ]);
  }, [animate]);

  return (
    <form ref={scope} onSubmit={handleSubmit(onSubmitStep)}>
      {/* PAN / Aadhaar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="PAN Number"
          name="pan_No"
          placeholder="ABCDE1234F"
          registerOptions={{
            required: "PAN is required",
            pattern: {
              value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
              message: "Format: ABCDE1234F",
            },
          }}
        />
        <FormField
          label="Aadhaar Number"
          name="adhaar_Number"
          placeholder="12-digit Aadhaar"
          registerOptions={{
            required: "Aadhaar is required",
            pattern: {
              value: /^\d{12}$/,
              message: "Aadhaar must be 12 digits",
            },
          }}
        />
      </div>

      {/* Bank Details */}
      <h2 className="text-xl font-semibold mt-8 mb-4">Bank Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          label="Bank Holder Name"
          name="bank_Holder_Name"
          placeholder="Account Holder Name"
          registerOptions={{
            required: "Bank Holder Name is required",
            pattern: {
              value: lettersOnlyRegex,
              message: "Can only contain letters and spaces",
            },
          }}
        />
        <FormField
          label="Bank Name"
          name="bank_Name"
          placeholder="e.g. State Bank"
          registerOptions={{
            required: "Bank Name is required",
            pattern: {
              value: lettersOnlyRegex,
              message: "Can only contain letters and spaces",
            },
          }}
        />
        <FormField
          label="Bank Account No."
          name="bank_Account_No"
          placeholder="1234567890"
          registerOptions={{
            required: "Account No. is required",
            pattern: {
              value: /^[0-9]{9,18}$/,
              message: "Account must be 9 to 18 digits",
            },
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <FormField
          label="Confirm Bank Account No."
          name="confirmBankAccountNo"
          placeholder="Re-enter Account No."
          registerOptions={{
            required: "Please confirm Bank Account No.",
            validate: (val, formValues) =>
              val === formValues.bank_Account_No ||
              "Account numbers do not match",
          }}
        />
        <FormField
          label="IFSC Code"
          name="ifsc_Code"
          placeholder="ABCD0123456"
          registerOptions={{
            required: "IFSC Code is required",
            pattern: {
              value: /^[A-Z0-9]{11}$/,
              message: "Must be 11 chars (letters/numbers)",
            },
          }}
        />

        {/* Upload Documents Section */}
        <div className="col-span-1 md:col-span-2">
          <label className="block font-medium mb-1">
            Upload Documents <span className="text-red-500">*</span>
          </label>

          {/* If no documents, show a “no documents found” box */}
          {documentFields.length === 0 && (
            <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded p-4 text-center text-gray-500">
              <FaUpload className="text-2xl mb-2" />
              <span>No document found</span>
            </div>
          )}

          {/* Otherwise, list out each DocumentUploader */}
          {documentFields.map((item, index) => (
            <DocumentUploader
              key={item.id}
              index={index}
              removeDocument={removeDocument}
              totalDocs={documentFields.length}
            />
          ))}

          {/* Button: add new document */}
          {documentFields.length < 20 && (
            <button
              type="button"
              onClick={() => appendDocument({ name: "", file: null })}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add More Documents
            </button>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-3 mt-6">
        <button
          type="button"
          className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {submitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
function DocumentUploader({ index, removeDocument, totalDocs }) {
  const { register, setValue, watch, formState } = useFormContext();
  const docFile = watch(`documents.${index}.file`);
  const docNameError = formState.errors?.documents?.[index]?.name?.message;
  const docFileError = formState.errors?.documents?.[index]?.file?.message;

  const [previewURL, setPreviewURL] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (docFile && docFile.type?.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(docFile);
      setPreviewURL(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    setPreviewURL(null);
  }, [docFile]);

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > FILE_SIZE_LIMIT) {
        alert("File must be <= 5MB");
        return;
      }
      const allowed = ["image/png", "image/jpeg", "application/pdf"];
      if (!allowed.includes(file.type)) {
        alert("Only JPG/PNG/PDF allowed");
        return;
      }
      setValue(`documents.${index}.file`, file);
    }
  };

  return (
    <div
      className={`
        border border-gray-300 dark:border-gray-600
        rounded p-3 mt-4 mb-4 relative
      `}
    >
      <label className="block text-sm font-medium mb-1">
        Document Name <span className="text-red-500">*</span>
      </label>
      <input
        className={`
          w-full px-3 py-2 rounded border mb-2 
          focus:outline-none focus:ring-2 bg-bg-secondary
          ${
            docNameError
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-600 focus:ring-blue-400"
          }
        `}
        placeholder="Enter Document Name"
        {...register(`documents.${index}.name`, {
          required: "Document name is required",
        })}
      />
      {docNameError && <p className="text-red-500 text-sm">{docNameError}</p>}

      <label className="block text-sm font-medium mb-1">Choose File</label>
      <input
        type="file"
        accept=".png,.jpg,.jpeg,.pdf"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Custom "Upload" button + chosen filename */}
      <div className="flex items-center space-x-3 mb-2">
        <button
          type="button"
          onClick={handleFileClick}
          className={`
            px-3 py-1 bg-gray-200 rounded hover:bg-gray-300
            dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600
          `}
        >
          <FaUpload className="inline mr-1" />
          Upload
        </button>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {docFile ? docFile.name : "No file chosen"}
        </span>
      </div>

      {/* Preview or icon */}
      {docFile && (
        <div className="mt-2">
          {previewURL ? (
            <img
              src={previewURL}
              alt="preview"
              className="w-24 h-auto border rounded mb-2"
            />
          ) : null}

          {!previewURL && docFile.type === "application/pdf" && (
            <div className="flex items-center space-x-2 text-sm">
              <FaFilePdf className="text-red-500" />
              <span>{docFile.name}</span>
            </div>
          )}

          {!previewURL &&
            docFile.type !== "application/pdf" &&
            !docFile.type?.startsWith("image/") && (
              <p className="text-sm">{docFile.name}</p>
            )}
        </div>
      )}
      {docFileError && <p className="text-red-500 text-sm">{docFileError}</p>}

      {/* Remove file button */}
      {docFile && (
        <button
          type="button"
          onClick={() => setValue(`documents.${index}.file`, null)}
          className="absolute top-3 right-3 text-red-500 hover:text-red-700"
          title="Remove File"
        >
          <FaTrash />
        </button>
      )}

      {totalDocs > 1 && (
        <button
          type="button"
          onClick={() => removeDocument(index)}
          className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded flex items-center"
        >
          <FaTrash className="mr-1" />
          Remove Document
        </button>
      )}
    </div>
  );
}

/** Common FormField (single-line input) */
function FormField({ label, name, placeholder, type = "text", registerOptions }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const errorMsg = errors?.[name]?.message;

  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, registerOptions)}
        className={`
          animatable-input w-full px-3 py-2 rounded focus:outline-none focus:ring-2
          placeholder-gray-400 dark:placeholder-gray-500
          ${
            errorMsg
              ? "border border-red-500 focus:ring-red-500 dark:border-red-500"
              : "border border-gray-300 dark:border-gray-700 focus:ring-blue-400"
          }
          dark:bg-gray-800 dark:text-gray-100
        `}
      />
      {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
    </div>
  );
}

/** Common FormSelect (single select) */
function FormSelect({ label, name, options = [], loading = false, registerOptions }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const errorMsg = errors?.[name]?.message;

  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <select
        {...register(name, registerOptions)}
        className={`
          animatable-input w-full px-3 py-2 rounded focus:outline-none focus:ring-2
          ${
            errorMsg
              ? "border border-red-500 focus:ring-red-500 dark:border-red-500"
              : "border border-gray-300 dark:border-gray-700 focus:ring-blue-400"
          }
          dark:bg-gray-800 dark:text-gray-100
        `}
      >
        {loading && <option value="">Loading...</option>}
        {!loading &&
          options.map((opt, idx) => (
            <option key={idx} value={opt.value}>
              {opt.label}
            </option>
          ))}
      </select>
      {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
    </div>
  );
}

/** Common FormTextArea */
function FormTextArea({ label, name, placeholder, registerOptions, rows = 3 }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const errorMsg = errors?.[name]?.message;

  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <textarea
        rows={rows}
        placeholder={placeholder}
        {...register(name, registerOptions)}
        className={`
          animatable-input w-full px-3 py-2 rounded
          focus:outline-none focus:ring-2
          placeholder-gray-400 dark:placeholder-gray-500
          ${
            errorMsg
              ? "border border-red-600 focus:ring-red-600 dark:border-red-600"
              : "border border-gray-300 dark:border-gray-600 focus:ring-blue-400"
          }
          dark:bg-gray-800 dark:text-gray-100
        `}
      />
      {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
    </div>
  );
}

/** Multi-Select (react-select) with dark-mode support */
function FormMultiSelect({ label, name, options = [], loading = false, requiredMessage }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMsg = errors?.[name]?.message;

  const isDarkMode =
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false;

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: errorMsg ? "red" : base.borderColor,
      borderWidth: 1,
      backgroundColor: isDarkMode ? "#374151" : "#fff",
      color: isDarkMode ? "#fff" : "#000",
      "&:hover": {
        borderColor: errorMsg ? "red" : base.borderColor,
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: isDarkMode ? "#374151" : "#fff",
      color: isDarkMode ? "#fff" : "#000",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? isDarkMode
          ? "#4B5563"
          : "#f5f5f5"
        : isDarkMode
        ? "#374151"
        : "#fff",
      color: isDarkMode ? "#fff" : "#000",
    }),
    singleValue: (base) => ({
      ...base,
      color: isDarkMode ? "#fff" : "#000",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: isDarkMode ? "#4B5563" : "#e2e8f0",
      color: isDarkMode ? "#fff" : "#000",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: isDarkMode ? "#fff" : "#000",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: isDarkMode ? "#fff" : "#000",
      ":hover": {
        backgroundColor: isDarkMode ? "#6B7280" : "#cbd5e0",
        color: isDarkMode ? "#fff" : "#000",
      },
    }),
  };

  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <Controller
        name={name}
        control={control}
        rules={{
          validate: (value) => {
            if (requiredMessage && (!value || value.length === 0)) {
              return requiredMessage;
            }
            return true;
          },
        }}
        render={({ field }) => {
          const { onChange, value } = field;
          const selected = options.filter((opt) => (value || []).includes(opt.value));

          return (
            <Select
              isMulti
              options={options}
              isLoading={loading}
              value={selected}
              onChange={(selectedOptions) => {
                onChange(selectedOptions.map((o) => o.value));
              }}
              styles={customStyles}
            />
          );
        }}
      />
      {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
    </div>
  );
}


