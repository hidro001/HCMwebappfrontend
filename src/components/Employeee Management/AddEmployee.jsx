// import React, { useState, useCallback } from "react";
// import { useForm, Controller, useFieldArray } from "react-hook-form";

// export default function AddEmployee() {
//   const [activeTab, setActiveTab] = useState(0);

//   return (
//     <div className="employee-form  bg-bg-primary text-text-primary  py-2 border border-red-900">
//       <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="bg-bg-secondary dark:text-gray-100 rounded-md shadow p-6">
//           <h1 className="text-2xl font-bold text-center mb-6">Add Employee</h1>

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

//           {/* Tabs Content */}
//           <div className="mt-4">
//             {activeTab === 0 && (
//               <EmployeeDetails goNext={() => setActiveTab(1)} />
//             )}
//             {activeTab === 1 && (
//               <QualificationsExperience goNext={() => setActiveTab(2)} />
//             )}
//             {activeTab === 2 && <PersonalDetails />}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /**
//  * Reusable tab button for the header
//  */
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

// /**
//  * TAB 1: Employee Details
//  */
// function EmployeeDetails({ goNext }) {
//   // Local state to store image preview URL
//   const [profilePreview, setProfilePreview] = useState(null);
//   const { control, handleSubmit } = useForm({
//     defaultValues: {
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
//       assignManager: "",
//       designation: "",
//       employeeId: "",
//       employeeLocation: "",
//       officeLocation: "",
//       latitude: "",
//       longitude: "",
//       shiftTiming: "",
//       salary: "",
//       otp: "",
//       permissions: "",
//     },
//   });

//   const onSubmit = (data) => {
//     console.log("Employee Details:", data);
//     // Go to next tab
//     goNext();
//   };

//   // Handler to capture the file and generate a preview URL
//   const handleProfileImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfilePreview(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {/* Top section: Profile Image + (First & Last Name, Phone & Gender) */}
//       <div className="grid grid-cols-12 gap-6">
//         {/* Left column: Profile Image */}
//         {/* <div className="col-span-12 md:col-span-3 flex flex-col items-center">
//           <label className="block font-medium mb-1">Profile Image</label>
//           <div className="w-24 h-24 rounded-full border flex items-center justify-center mb-2">
         
//             <span className="text-gray-400 text-sm">No Image</span>
//           </div>
//           <input type="file" className="text-sm" />
//         </div> */}

//         {/* Left column: Profile Image */}
//         <div className="col-span-12 md:col-span-3 flex flex-col items-center">
//           <label className="block font-medium mb-2">Profile Image</label>

//           {/* Circle container */}
//           <div
//             className="w-32 h-32 rounded-full border relative cursor-pointer mb-2"
//             onClick={() =>
//               document.getElementById("profileImageInput")?.click()
//             }
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

//           {/* Hidden file input */}
//           <input
//             type="file"
//             id="profileImageInput"
//             accept="image/*"
//             onChange={handleProfileImageChange}
//             style={{ display: "none" }} // or use className="hidden"
//           />
//         </div>

//         {/* Right column: Name, Phone, Gender */}
//         <div className="col-span-12 md:col-span-9">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//             <FormField
//               label="First Name"
//               name="firstName"
//               control={control}
//               placeholder="Enter Full Name"
//             />
//             <FormField
//               label="Last Name"
//               name="lastName"
//               control={control}
//               placeholder="Enter Last address"
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <FormField
//               label="Phone"
//               name="phone"
//               control={control}
//               placeholder="Enter phone number"
//             />
//             <FormSelect
//               label="Gender"
//               name="gender"
//               control={control}
//               options={[
//                 { value: "", label: "Select" },
//                 { value: "Male", label: "Male" },
//                 { value: "Female", label: "Female" },
//                 { value: "Other", label: "Other" },
//               ]}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Next rows: Personal Email, DOB, Address */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormField
//           label="Personal Email ID"
//           name="personalEmail"
//           control={control}
//           placeholder="test@gmail.com"
//           type="email"
//         />
//         <FormField label="DOB" name="dob" control={control} type="date" />
//         <FormTextArea
//           label="Permanent Address"
//           name="permanentAddress"
//           control={control}
//           placeholder="Write Address..."
//         />
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
//             { value: "Finance", label: "Finance" },
//           ]}
//         />
//       </div>

//       {/* Role, Assign Manager, Designation */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormField
//           label="Role"
//           name="role"
//           control={control}
//           placeholder="Enter Role"
//         />
//         <FormSelect
//           label="Assign Manager"
//           name="assignManager"
//           control={control}
//           options={[
//             { value: "", label: "Select" },
//             { value: "Manager1", label: "Manager 1" },
//             { value: "Manager2", label: "Manager 2" },
//           ]}
//         />
//         <FormSelect
//           label="Designation"
//           name="designation"
//           control={control}
//           options={[
//             { value: "", label: "Select" },
//             { value: "Junior", label: "Junior" },
//             { value: "Senior", label: "Senior" },
//           ]}
//         />
//       </div>

//       {/* Employee ID, Employee Location, Office Location */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormField
//           label="Employee ID"
//           name="employeeId"
//           control={control}
//           placeholder="R10004"
//         />
//         <FormSelect
//           label="Employee Location"
//           name="employeeLocation"
//           control={control}
//           options={[
//             { value: "", label: "Select" },
//             { value: "Location A", label: "Location A" },
//             { value: "Location B", label: "Location B" },
//           ]}
//         />
//         <FormSelect
//           label="Office Location"
//           name="officeLocation"
//           control={control}
//           options={[
//             { value: "", label: "Select" },
//             { value: "Location X", label: "Location X" },
//             { value: "Location Y", label: "Location Y" },
//           ]}
//         />
//       </div>

//       {/* Latitude, Longitude, Shift Timing */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <FormField
//           label="Latitude"
//           name="latitude"
//           control={control}
//           placeholder="Latitude"
//         />
//         <FormField
//           label="Longitude"
//           name="longitude"
//           control={control}
//           placeholder="Longitude"
//         />
//         <FormSelect
//           label="Shift Timing"
//           name="shiftTiming"
//           control={control}
//           options={[
//             { value: "", label: "Select" },
//             { value: "Day Shift", label: "Day Shift" },
//             { value: "Night Shift", label: "Night Shift" },
//           ]}
//         />
//       </div>

//       {/* Salary, OTP */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         <FormField
//           label="Salary"
//           name="salary"
//           control={control}
//           placeholder="3LPA"
//         />
//         <FormField label="OTP" name="otp" control={control} placeholder="OTP" />
//       </div>

//       {/* Permissions (full width) */}
//       <div className="mt-6">
//         <FormTextArea
//           label="Permissions"
//           name="permissions"
//           control={control}
//           placeholder="No Permission Selected"
//         />
//       </div>

//       {/* Buttons */}
//       <div className="flex items-center space-x-3 mt-6">
//         <button
//           type="button"
//           className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-gray-100 rounded"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Next
//         </button>
//       </div>
//     </form>
//   );
// }

// /**
//  * TAB 2: Qualifications & Experience
//  */
// function QualificationsExperience({ goNext }) {
//   const { control, handleSubmit } = useForm({
//     defaultValues: {
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
//     },
//   });

//   // Qualifications array
//   const {
//     fields: qualificationFields,
//     append: addQualification,
//     remove: removeQualification,
//   } = useFieldArray({
//     control,
//     name: "qualifications",
//   });

//   // Experiences array
//   const {
//     fields: experienceFields,
//     append: addExperience,
//     remove: removeExperience,
//   } = useFieldArray({
//     control,
//     name: "experiences",
//   });

//   const onSubmit = (data) => {
//     console.log("Qualifications & Experience:", data);
//     goNext();
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
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
//             {/* Only show "Add More Details" on the last row */}
//             {index === qualificationFields.length - 1 && (
//               <button
//                 type="button"
//                 onClick={() =>
//                   addQualification({
//                     qualificationName: "",
//                     universityBoard: "",
//                     totalMarks: "",
//                     passingYear: "",
//                     percentageCgpa: "",
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
//                     endDate: "",
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
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Next
//         </button>
//       </div>
//     </form>
//   );
// }

// /**
//  * TAB 3: Personal Details
//  */
// // function PersonalDetails() {
// //   const { control, handleSubmit } = useForm({
// //     defaultValues: {
// //       panNumber: '',
// //       aadhaarNumber: '',
// //       bankHolderName: '',
// //       bankName: '',
// //       bankAccountNo: '',
// //       confirmBankAccountNo: '',
// //       ifscCode: '',
// //       documents: []
// //     }
// //   });

// //   const onSubmit = (data) => {
// //     console.log('Personal Details:', data);
// //     alert('Form complete! Check the console for details.');
// //   };

// //   return (
// //     <form onSubmit={handleSubmit(onSubmit)}>
// //       {/* Row for PAN Number & Aadhaar Number */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         <FormField
// //           label="PAN Number"
// //           name="panNumber"
// //           control={control}
// //           placeholder="PAN Number"
// //         />
// //         <FormField
// //           label="Aadhaar Number"
// //           name="aadhaarNumber"
// //           control={control}
// //           placeholder="Aadhaar Number"
// //         />
// //       </div>

// //       {/* Heading: Bank Details */}
// //       <h2 className="text-xl font-semibold mt-8 mb-4">Bank Details</h2>

// //       {/* Bank Details Rows */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //         <FormField
// //           label="Bank Holder Name"
// //           name="bankHolderName"
// //           control={control}
// //           placeholder="Enter Account Holder Name"
// //         />
// //         <FormField
// //           label="Bank Name"
// //           name="bankName"
// //           control={control}
// //           placeholder="e.g. State Bank"
// //         />
// //         <FormField
// //           label="Bank Account No."
// //           name="bankAccountNo"
// //           control={control}
// //           placeholder="1234567890"
// //         />
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
// //         <FormField
// //           label="Confirm Bank Account No."
// //           name="confirmBankAccountNo"
// //           control={control}
// //           placeholder="Re-enter Account No."
// //         />
// //         <FormField
// //           label="IFSC Code"
// //           name="ifscCode"
// //           control={control}
// //           placeholder="e.g. ABCD0123456"
// //         />

// //         {/* Upload Documents */}
// //         <div>
// //           <label className="block font-medium mb-1">Upload Documents</label>
// //           <Controller
// //             name="documents"
// //             control={control}
// //             render={({ field }) => (
// //               <input
// //                 type="file"
// //                 multiple
// //                 className="block w-full text-sm border
// //                   border-gray-300 dark:border-gray-700 rounded
// //                   focus:outline-none focus:ring-2
// //                   focus:ring-blue-400 dark:bg-gray-800"
// //                 onChange={(e) => {
// //                   const files = Array.from(e.target.files || []);
// //                   field.onChange(files);
// //                 }}
// //               />
// //             )}
// //           />
// //         </div>
// //       </div>

// //       {/* (Optional) Add More Documents button */}
// //       <div className="mt-4">
// //         <button
// //           type="button"
// //           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
// //         >
// //           Add More Documents
// //         </button>
// //       </div>

// //       {/* Action Buttons: Cancel & Save */}
// //       <div className="flex items-center space-x-3 mt-6">
// //         <button
// //           type="button"
// //           className="px-4 py-2 bg-gray-300 dark:bg-gray-700
// //             text-black dark:text-gray-100 rounded"
// //         >
// //           Cancel
// //         </button>
// //         <button
// //           type="submit"
// //           className="px-4 py-2 bg-green-600 text-white
// //             rounded hover:bg-green-700"
// //         >
// //           Save
// //         </button>
// //       </div>
// //     </form>
// //   );
// // }

// import { FaCloudUploadAlt } from "react-icons/fa";

// function PersonalDetails() {
//   const { control, handleSubmit } = useForm({
//     defaultValues: {
//       panNumber: "",
//       aadhaarNumber: "",
//       bankHolderName: "",
//       bankName: "",
//       bankAccountNo: "",
//       confirmBankAccountNo: "",
//       ifscCode: "",
//       documents: [],
//     },
//   });

//   // We use local state to hold file references for UI preview (optional).
//   const [filesList, setFilesList] = useState([]);

//   const onSubmit = (data) => {
//     console.log("Personal Details:", data);
//     alert("Form complete! Check the console for details.");
//   };

//   // Drag & drop handlers
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
//         // Update react-hook-form state
//         fieldOnChange(droppedFiles);
//         // Also update local display
//         setFilesList([...filesList, ...droppedFiles]);
//       }
//     },
//     [filesList]
//   );

//   // Programmatically click hidden file input
//   const triggerFileSelect = () => {
//     document.getElementById("uploadDocumentsInput")?.click();
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {/* Row for PAN Number & Aadhaar Number */}
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

//       {/* Heading: Bank Details */}
//       <h2 className="text-xl font-semibold mt-8 mb-4">Bank Details</h2>

//       {/* Bank Details Rows */}
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
//         <FormField
//           label="IFSC Code"
//           name="ifscCode"
//           control={control}
//           placeholder="e.g. ABCD0123456"
//         />

//         {/* Upload Documents (custom design) */}
//         <div>
//           <label className="block font-medium mb-1">Upload Documents</label>
//           <Controller
//             name="documents"
//             control={control}
//             render={({ field }) => {
//               const { value, onChange } = field;

//               return (
//                 <>
//                   {/* Hidden file input */}
//                   <input
//                     type="file"
//                     id="uploadDocumentsInput"
//                     multiple
//                     accept="image/*,.pdf,.doc,.docx"
//                     className="hidden"
//                     onChange={(e) => {
//                       const files = Array.from(e.target.files || []);
//                       onChange(files);
//                       setFilesList([...filesList, ...files]);
//                     }}
//                   />

//                   {/* Custom upload area */}
//                   <div
//                     className="relative flex flex-col items-center justify-center
//                       w-full h-24 border-2 border-dashed border-blue-400 rounded 
//                       text-center cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-800"
//                     onDragOver={handleDragOver}
//                     onDrop={(e) => handleDrop(e, onChange)}
//                     onClick={triggerFileSelect}
//                   >
//                     <FaCloudUploadAlt className="text-blue-400 text-2xl mb-2" />
//                     <p className="text-sm text-gray-500 dark:text-gray-300">
//                       Drag &amp; drop or{" "}
//                       <span className="text-blue-400 underline">click</span> to
//                       upload
//                     </p>
//                   </div>

//                   {/* Show chosen files below (optional) */}
//                   {value && value.length > 0 && (
//                     <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300">
//                       {value.map((file, idx) => (
//                         <li key={idx} className="flex items-center space-x-2">
//                           {/* If images, you could even display a small thumb */}
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

//       {/* Action Buttons: Cancel & Save */}
//       <div className="flex items-center space-x-3 mt-6">
//         <button
//           type="button"
//           className="px-4 py-2 bg-gray-300 dark:bg-gray-700 
//             text-black dark:text-gray-100 rounded"
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

// /**
//  * Reusable input field component
//  */
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
//             className="w-full px-3 py-2 border border-gray-300 
//               dark:border-gray-700 rounded focus:outline-none 
//               focus:ring-2 focus:ring-blue-400 dark:bg-gray-800"
//           />
//         )}
//       />
//     </div>
//   );
// }

// /**
//  * Reusable FormSelect component (dropdown)
//  */
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
//             className="w-full px-3 py-2 border border-gray-300 
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

// /**
//  * Reusable FormTextArea component
//  */
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
//             className="w-full px-3 py-2 border border-gray-300 
//               dark:border-gray-700 rounded focus:outline-none 
//               focus:ring-2 focus:ring-blue-400 dark:bg-gray-800"
//           />
//         )}
//       />
//     </div>
//   );
// }

// import React, { useState, useCallback, useEffect } from "react";
// import { useForm, Controller, useFieldArray } from "react-hook-form";

// // 1) Import AnimatePresence and motion from framer-motion
// import { AnimatePresence, motion, useAnimate } from "framer-motion";

// export default function AddEmployee() {
//   const [activeTab, setActiveTab] = useState(0);

//   return (
//     <div className="employee-form bg-bg-primary text-text-primary py-2">
//       <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="bg-bg-secondary dark:text-gray-100 rounded-md shadow p-6">
//           <h1 className="text-2xl font-bold text-center mb-6">Add Employee</h1>

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
//                   <EmployeeDetails goNext={() => setActiveTab(1)} />
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
//                   <QualificationsExperience goNext={() => setActiveTab(2)} />
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
//                   <PersonalDetails />
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /**
//  * Reusable tab button for the header
//  */
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

// /**
//  * TAB 1: Employee Details
//  */
// function EmployeeDetails({ goNext }) {
//   // We'll still use a timeline to stagger-animate the inputs,
//   // but remove the container "enter" animation so it doesn't conflict with the parent motion.div
//   const [scope, animate] = useAnimate();

//   // On mount, run a timeline that animates each .animatable-input in a staggered sequence
//   useEffect(() => {
//     animate([
//       // Each input in a staggered reveal
//       [".animatable-input", { opacity: 0, x: 20 }, { duration: 0 }],
//       [
//         ".animatable-input",
//         { opacity: 1, x: 0 },
//         { duration: 0.3, stagger: 0.05 }
//       ]
//     ]);
//   }, [animate]);

//   const [profilePreview, setProfilePreview] = useState(null);

//   const { control, handleSubmit } = useForm({
//     defaultValues: {
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
//       assignManager: "",
//       designation: "",
//       employeeId: "",
//       employeeLocation: "",
//       officeLocation: "",
//       latitude: "",
//       longitude: "",
//       shiftTiming: "",
//       salary: "",
//       otp: "",
//       permissions: ""
//     }
//   });

//   const onSubmit = (data) => {
//     console.log("Employee Details:", data);
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
//             onClick={() =>
//               document.getElementById("profileImageInput")?.click()
//             }
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
//             <FormField
//               label="First Name"
//               name="firstName"
//               control={control}
//               placeholder="Enter Full Name"
//             />
//             <FormField
//               label="Last Name"
//               name="lastName"
//               control={control}
//               placeholder="Enter Last address"
//             />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <FormField
//               label="Phone"
//               name="phone"
//               control={control}
//               placeholder="Enter phone number"
//             />
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
//         <FormTextArea
//           label="Permanent Address"
//           name="permanentAddress"
//           control={control}
//           placeholder="Write Address..."
//         />
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
//         <FormField
//           label="Role"
//           name="role"
//           control={control}
//           placeholder="Enter Role"
//         />
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
//         <FormField
//           label="Employee ID"
//           name="employeeId"
//           control={control}
//           placeholder="R10004"
//         />
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
//         <FormField
//           label="Latitude"
//           name="latitude"
//           control={control}
//           placeholder="Latitude"
//         />
//         <FormField
//           label="Longitude"
//           name="longitude"
//           control={control}
//           placeholder="Longitude"
//         />
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
//         <FormField
//           label="Salary"
//           name="salary"
//           control={control}
//           placeholder="3LPA"
//         />
//         <FormField label="OTP" name="otp" control={control} placeholder="OTP" />
//       </div>

//       {/* Permissions */}
//       <div className="mt-6">
//         <FormTextArea
//           label="Permissions"
//           name="permissions"
//           control={control}
//           placeholder="No Permission Selected"
//         />
//       </div>

//       {/* Buttons */}
//       <div className="flex items-center space-x-3 mt-6">
//         <button
//           type="button"
//           className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-gray-100 rounded"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Next
//         </button>
//       </div>
//     </form>
//   );
// }

// /**
//  * TAB 2: Qualifications & Experience
//  */
// function QualificationsExperience({ goNext }) {
//   // Keep only the stagger effect for the inputs; no container fade-in for mount
//   const [scope, animate] = useAnimate();

//   useEffect(() => {
//     animate([
//       // Each input in a staggered reveal
//       [".animatable-input", { opacity: 0, x: 20 }, { duration: 0 }],
//       [
//         ".animatable-input",
//         { opacity: 1, x: 0 },
//         { duration: 0.3, stagger: 0.05 }
//       ]
//     ]);
//   }, [animate]);

//   const { control, handleSubmit } = useForm({
//     defaultValues: {
//       qualifications: [
//         {
//           qualificationName: "",
//           universityBoard: "",
//           totalMarks: "",
//           passingYear: "",
//           percentageCgpa: ""
//         }
//       ],
//       experiences: [
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
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Next
//         </button>
//       </div>
//     </form>
//   );
// }

// /**
//  * TAB 3: Personal Details
//  */
// import { FaCloudUploadAlt } from "react-icons/fa";

// function PersonalDetails() {
//   // Stagger the inputs only
//   const [scope, animate] = useAnimate();

//   useEffect(() => {
//     animate([
//       [".animatable-input", { opacity: 0, x: 20 }, { duration: 0 }],
//       [
//         ".animatable-input",
//         { opacity: 1, x: 0 },
//         { duration: 0.3, stagger: 0.05 }
//       ]
//     ]);
//   }, [animate]);

//   const { control, handleSubmit } = useForm({
//     defaultValues: {
//       panNumber: "",
//       aadhaarNumber: "",
//       bankHolderName: "",
//       bankName: "",
//       bankAccountNo: "",
//       confirmBankAccountNo: "",
//       ifscCode: "",
//       documents: []
//     }
//   });

//   const [filesList, setFilesList] = useState([]);

//   const onSubmit = (data) => {
//     console.log("Personal Details:", data);
//     alert("Form complete! Check the console for details.");
//   };

//   const handleDragOver = useCallback((e) => {
//     e.preventDefault();
//     e.stopPropagation();
//   }, []);

//   const handleDrop = useCallback((e, fieldOnChange) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const droppedFiles = Array.from(e.dataTransfer.files);
//     if (droppedFiles.length > 0) {
//       fieldOnChange(droppedFiles);
//       setFilesList((prev) => [...prev, ...droppedFiles]);
//     }
//   }, []);

//   const triggerFileSelect = () => {
//     document.getElementById("uploadDocumentsInput")?.click();
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
//         <FormField
//           label="IFSC Code"
//           name="ifscCode"
//           control={control}
//           placeholder="e.g. ABCD0123456"
//         />

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
//                       Drag &amp; drop or{" "}
//                       <span className="text-blue-400 underline">click</span> to
//                       upload
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
//           className="px-4 py-2 bg-gray-300 dark:bg-gray-700
//             text-black dark:text-gray-100 rounded"
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

// /**
//  * Reusable input field component
//  * We keep the "animatable-input" class so it gets picked up in the timeline.
//  */
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

// /**
//  * Reusable FormSelect component
//  */
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

// /**
//  * Reusable FormTextArea component
//  */
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


import React from "react";
import EmployeeFormTabs from "./EmployeeFormTabs";

export default function AddEmployeePage() {
  const handleComplete = (finalDataFromAllTabs) => {
    console.log("Adding new employee with data:", finalDataFromAllTabs);
    // call your create/add API here, e.g.:
    // await api.createEmployee(finalDataFromAllTabs);
  };

  return (
    <EmployeeFormTabs
      formTitle="Add Employee"
      defaultValues={{}}  // since there's no existing data
      onComplete={handleComplete}
    />
  );
}
