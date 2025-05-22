// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Toaster } from "react-hot-toast";
// import { FaArrowLeft } from "react-icons/fa";
// import useEmployeeDetailsStore from "../../store/useAllEmployeesStore";

// function ViewEmployee() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { employee, loading, error, fetchEmployeeById } = useEmployeeDetailsStore();

//   const [activeTab, setActiveTab] = useState("personal");
//   const [showPermissionsModal, setShowPermissionsModal] = useState(false);

//   useEffect(() => {
//     fetchEmployeeById(id);
//   }, [id, fetchEmployeeById]);

//   // Helper functions for safe rendering
//   const formatDate = (str) => (str ? new Date(str).toLocaleDateString() : "N/A");
//   const orNA = (value) => (value ? value : "N/A");
//   const boolToYesNo = (val) => (val ? "Yes" : "No");
//   const arrayToCommaList = (arr) => (arr && arr.length > 0 ? arr.join(", ") : "N/A");

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
//         <Toaster />
//         <div className="animate-pulse">
//           <div className="flex justify-between mb-6">
//             <div className="w-24 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
//             <div className="w-48 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
//           </div>
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <div className="col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
//               <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
//               <div className="w-24 h-24 -mt-12 mx-auto rounded-full bg-gray-200 dark:bg-gray-700 border-4 border-white dark:border-gray-800"></div>
//               <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mt-4"></div>
//               <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto mt-2"></div>
//             </div>
//             <div className="col-span-1 lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
//               <div className="flex space-x-4 mb-4">
//                 <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
//                 <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
//                 <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
//               </div>
//               <div className="space-y-2">
//                 {Array.from({ length: 10 }).map((_, idx) => (
//                   <div
//                     key={idx}
//                     className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
//                   ></div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-red-500">{error}</p>
//       </div>
//     );
//   }

//   if (!employee) {
//     return null;
//   }

//   const fullName = `${orNA(employee.first_Name)} ${orNA(employee.last_Name)}`.trim();

//   return (
//     <div className=" bg-gray-50 dark:bg-gray-900 p-4 ">
//       <Toaster />
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           onClick={() => navigate(-1)}
//           className="inline-flex items-center space-x-2 px-4 py-2 rounded bg-gray-200
//             dark:bg-gray-700 text-gray-700 dark:text-gray-200
//             hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
//         >
//           <FaArrowLeft />
//           <span>Back</span>
//         </motion.button>

//         <h1 className="text-xl font-bold text-gray-800 dark:text-white">
//           Employee Details of
//           <span className="text-blue-600 dark:text-blue-400">{fullName}</span>
//         </h1>
//       </div>

//       {/* Main Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
//         {/* Left Sidebar - Basic Info and Profile Pic */}
//         <div className="col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-md">
//           {/* Top section with background and avatar */}
//           <div className="relative h-20 bg-gray-100 dark:bg-gray-700 rounded-t-lg">
//             <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
//               <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden border-4 border-white dark:border-gray-800">
//                 {employee.user_Avatar ? (
//                   <img
//                     src={employee.user_Avatar}
//                     alt="User Avatar"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="flex items-center justify-center h-full text-gray-500">
//                     No Image
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Basic Info */}
//           <div className="text-center pt-16 px-4 pb-4">
//             <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
//               {fullName || "N/A"}
//             </h2>
//             <p className="text-sm text-gray-500 dark:text-gray-300">
//               {orNA(employee.designation)}
//             </p>
//           </div>
//           <hr className="border-gray-200 dark:border-gray-700" />

//           {/* Quick Personal Info Overview */}
//           <div className="px-4 py-4">
//             <h3 className="text-gray-800 dark:text-gray-100 font-semibold mb-3">
//               Personal Info
//             </h3>
//             <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
//               <li>
//                 <strong className="text-blue-600 dark:text-blue-400">
//                   Full Name:
//                 </strong>
//                 {fullName}
//               </li>
//               <li>
//                 <strong className="text-blue-600 dark:text-blue-400">
//                   Email:
//                 </strong>
//                 {orNA(employee.personal_Email_Id)}
//               </li>
//               <li>
//                 <strong className="text-blue-600 dark:text-blue-400">
//                   Phone Number:
//                 </strong>
//                 {orNA(employee.mobile_No)}
//               </li>
//               <li>
//                 <strong className="text-blue-600 dark:text-blue-400">
//                   Department:
//                 </strong>
//                 {orNA(employee.department)}
//               </li>
//               <li>
//                 <strong className="text-blue-600 dark:text-blue-400">
//                   Designation:
//                 </strong>
//                 {orNA(employee.designation)}
//               </li>
//               <li>
//                 <strong className="text-blue-600 dark:text-blue-400">
//                   Date of Joining:
//                 </strong>
//                 {formatDate(employee.date_of_Joining)}
//               </li>
//               <li>
//                 <strong className="text-blue-600 dark:text-blue-400">
//                   Employee ID:
//                 </strong>
//                 {orNA(employee.employee_Id)}
//               </li>
//               <li>
//                 <strong className="text-blue-600 dark:text-blue-400">
//                   Salary:
//                 </strong>
//                 ₹{employee.salary ?? 0}
//               </li>
//               <li>
//                 <strong className="text-blue-600 dark:text-blue-400">
//                   Personal Address:
//                 </strong>
//                 {orNA(employee.user_Address)}
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Right Side - Tabbed Content */}
//         <div className="col-span-1 lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4  h-[700px] overflow-scroll  [&::-webkit-scrollbar]:w-2
//                 [&::-webkit-scrollbar-track]:rounded-full
//                 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
//                 [&::-webkit-scrollbar-thumb]:rounded-full
//                 [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600 transition-colors duration-300  scroll-stabilize">
//           {/* Tabs */}
//           <div className="flex flex-wrap gap-4 border-b border-gray-200 dark:border-gray-700 mb-4">
//             <button
//               onClick={() => setActiveTab("personal")}
//               className={`pb-2 text-sm font-medium transition-colors ${
//                 activeTab === "personal"
//                   ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
//                   : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
//               }`}
//             >
//               Personal Details
//             </button>
//             <button
//               onClick={() => setActiveTab("employment")}
//               className={`pb-2 text-sm font-medium transition-colors ${
//                 activeTab === "employment"
//                   ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
//                   : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
//               }`}
//             >
//               Employment Info
//             </button>
//             <button
//               onClick={() => setActiveTab("bankpf")}
//               className={`pb-2 text-sm font-medium transition-colors ${
//                 activeTab === "bankpf"
//                   ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
//                   : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
//               }`}
//             >
//               Bank & PF Details
//             </button>
//             <button
//               onClick={() => setActiveTab("experience_qualifications")}
//               className={`pb-2 text-sm font-medium transition-colors ${
//                 activeTab === "experience_qualifications"
//                   ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
//                   : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
//               }`}
//             >
//               Experience & Education
//             </button>
//             <button
//               onClick={() => setActiveTab("documents")}
//               className={`pb-2 text-sm font-medium transition-colors ${
//                 activeTab === "documents"
//                   ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
//                   : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
//               }`}
//             >
//               Documents
//             </button>
//             <button
//               onClick={() => setActiveTab("additional")}
//               className={`pb-2 text-sm font-medium transition-colors ${
//                 activeTab === "additional"
//                   ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
//                   : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
//               }`}
//             >
//               Additional Info
//             </button>
//             <button
//               onClick={() => setActiveTab("notifications")}
//               className={`pb-2 text-sm font-medium transition-colors ${
//                 activeTab === "notifications"
//                   ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
//                   : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
//               }`}
//             >
//               Notifications
//             </button>
//             <button
//               onClick={() => setActiveTab("engagement")}
//               className={`pb-2 text-sm font-medium transition-colors ${
//                 activeTab === "engagement"
//                   ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
//                   : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
//               }`}
//             >
//               Engagement Permissions
//             </button>
//           </div>

//           {/* TAB CONTENT: PERSONAL */}
//           {activeTab === "personal" && (
//             <div className="leading-6 text-gray-700 dark:text-gray-300 text-sm space-y-3">
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Full Name
//                 </span>
//                 : {fullName}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Personal Email
//                 </span>
//                 : {orNA(employee.personal_Email_Id)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Personal Contact Number
//                 </span>
//                 : {orNA(employee.mobile_No)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Date of Birth
//                 </span>
//                 : {formatDate(employee.dob)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Gender
//                 </span>
//                 : {orNA(employee.gender)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Marital Status
//                 </span>
//                 : {orNA(employee.marital_Status)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Nationality
//                 </span>
//                 : {orNA(employee.nationality)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Permanent Residential Address
//                 </span>
//                 : {orNA(employee.user_Address)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Current Residential Address
//                 </span>
//                 : {orNA(employee.current_Address)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Disability Status
//                 </span>
//                 : {orNA(employee.disability_Status)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Emergency Contact Person
//                 </span>
//                 : {orNA(employee.emergency_Contact_Person)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Emergency Contact Number
//                 </span>
//                 : {orNA(employee.emergency_Contact_Number)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Emergency Contact Blood Group
//                 </span>
//                 : {orNA(employee.emergency_Contact_Blood_Group)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   PAN Number
//                 </span>
//                 : {orNA(employee.pan_No)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Aadhaar Number
//                 </span>
//                 : {orNA(employee.adhaar_Number)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Passport Number
//                 </span>
//                 : {orNA(employee.passport_Number)}
//               </p>
//             </div>
//           )}

//           {/* TAB CONTENT: EMPLOYMENT */}
//           {activeTab === "employment" && (
//             <div className="leading-6 text-gray-700 dark:text-gray-300 text-sm space-y-2">
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Employee ID
//                 </span>
//                 : {orNA(employee.employee_Id)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Employment Type
//                 </span>
//                 : {orNA(employee.employee_Type)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   User Role
//                 </span>
//                 : {orNA(employee.user_Role)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Permission Role
//                 </span>
//                 : {orNA(employee.permission_role)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Date of Joining
//                 </span>
//                 : {formatDate(employee.date_of_Joining)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Date of Confirmation
//                 </span>
//                 : {formatDate(employee.date_of_Conformation)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Employment Status
//                 </span>
//                 : {boolToYesNo(employee.isActive)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Designation / Role
//                 </span>
//                 : {orNA(employee.designation)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Department
//                 </span>
//                 : {orNA(employee.department)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Department Allocated
//                 </span>
//                 : {arrayToCommaList(employee.departmentAlocated)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Assigned To (IDs)
//                 </span>
//                 : {arrayToCommaList(employee.assigned_to)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Office Address
//                 </span>
//                 : {orNA(employee.office_address)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Work Shift (ID)
//                 </span>
//                 : {orNA(employee.shift_Timing)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Work Shift Array
//                 </span>
//                 : {orNA(employee.shift_Timing_Array)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Total Work Experience (Years)
//                 </span>
//                 : {orNA(employee.total_Experience)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Current Salary
//                 </span>
//                 : ₹{employee.salary ?? 0}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Paid Leaves
//                 </span>
//                 : {employee.no_of_Paid_Leave ?? 0}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Latitude & Longitude
//                 </span>
//                 : {orNA(employee.latitude)}, {orNA(employee.longitude)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   OTP Required
//                 </span>
//                 : {employee.otp === "no" ? "NO" : "YES"}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Working Email
//                 </span>
//                 : {orNA(employee.working_Email_Id)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Months Already Credited
//                 </span>
//                 : {orNA(employee.monthsAlreadyCredited)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Overtime Allowed
//                 </span>
//                 : {boolToYesNo(employee.overtime_allowed)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Overtime Hours
//                 </span>
//                 : {orNA(employee.overtime_hours)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Police Verification
//                 </span>
//                 : {orNA(employee.police_Verification)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Background Verification Status
//                 </span>
//                 : {orNA(employee.background_Verification_Status)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Compliance Training Status
//                 </span>
//                 : {orNA(employee.complianceTrainingStatus)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Training Status
//                 </span>
//                 : {orNA(employee.trainingStatus)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Allowances Provided
//                 </span>
//                 : {arrayToCommaList(employee.allowances_Provided)}
//               </p>
//               {/* Permissions link */}
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Permissions
//                 </span>
//                 :
//                 <button
//                   onClick={() => setShowPermissionsModal(true)}
//                   className="text-blue-600 dark:text-blue-400 underline ml-1"
//                 >
//                   View all
//                 </button>
//               </p>
//             </div>
//           )}

//           {/* TAB CONTENT: BANK & PF DETAILS */}
//           {activeTab === "bankpf" && (
//             <div className="leading-6 text-gray-700 dark:text-gray-300 text-sm space-y-2">
//               <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
//                 Bank Details
//               </h2>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Bank Holder Name
//                 </span>
//                 : {orNA(employee.bank_Holder_Name)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Bank Name
//                 </span>
//                 : {orNA(employee.bank_Name)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Bank Account No
//                 </span>
//                 : {orNA(employee.bank_Account_No)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   IFSC Code
//                 </span>
//                 : {orNA(employee.ifsc_Code)}
//               </p>
//               <hr className="my-4 border-gray-200 dark:border-gray-700" />
//               <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
//                 PF/ESI Details
//               </h2>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   PF Details
//                 </span>
//                 : {orNA(employee.pf_Details)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   ESI Details
//                 </span>
//                 : {orNA(employee.esi_Details)}
//               </p>
//             </div>
//           )}

//           {/* TAB CONTENT: EXPERIENCE & QUALIFICATIONS */}
//           {activeTab === "experience_qualifications" && (
//             <div className="leading-6 text-gray-700 dark:text-gray-300 text-sm space-y-4">
//               {/* Experiences */}
//               <div>
//                 <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
//                   Past Experiences
//                 </h2>
//                 {employee.experiences && employee.experiences.length > 0 ? (
//                   employee.experiences.map((exp) => (
//                     <div
//                       key={exp._id}
//                       className="border border-gray-200 dark:border-gray-700 p-3 rounded mb-3"
//                     >
//                       <p>
//                         <strong className="text-blue-600 dark:text-blue-400">
//                           Company Name:
//                         </strong>
//                         {orNA(exp.companyName)}
//                       </p>
//                       <p>
//                         <strong className="text-blue-600 dark:text-blue-400">
//                           Start Date:
//                         </strong>
//                         {formatDate(exp.startDate)}
//                       </p>
//                       <p>
//                         <strong className="text-blue-600 dark:text-blue-400">
//                           End Date:
//                         </strong>
//                         {formatDate(exp.endDate)}
//                       </p>
//                       <p>
//                         <strong className="text-blue-600 dark:text-blue-400">
//                           Designation:
//                         </strong>
//                         {orNA(exp.designation)}
//                       </p>
//                       <p>
//                         <strong className="text-blue-600 dark:text-blue-400">
//                           Grade/Band/Level:
//                         </strong>
//                         {orNA(exp.grade_Band_Level)}
//                       </p>
//                       <p>
//                         <strong className="text-blue-600 dark:text-blue-400">
//                           Previous Positions:
//                         </strong>
//                         {orNA(exp.previous_Positions)}
//                       </p>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No prior experience records found.</p>
//                 )}
//               </div>

//               {/* Qualifications */}
//               <div>
//                 <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
//                   Qualifications
//                 </h2>
//                 {employee.qualifications && employee.qualifications.length > 0 ? (
//                   employee.qualifications.map((qual) => (
//                     <div
//                       key={qual._id}
//                       className="border border-gray-200 dark:border-gray-700 p-3 rounded mb-3"
//                     >
//                       <p>
//                         <strong className="text-blue-600 dark:text-blue-400">
//                           Qualification Name:
//                         </strong>
//                         {orNA(qual.qualificationName)}
//                       </p>
//                       <p>
//                         <strong className="text-blue-600 dark:text-blue-400">
//                           University/Board:
//                         </strong>
//                         {orNA(qual.universityBoard)}
//                       </p>
//                       <p>
//                         <strong className="text-blue-600 dark:text-blue-400">
//                           Specialization:
//                         </strong>
//                         {orNA(qual.specialization)}
//                       </p>
//                       <p>
//                         <strong className="text-blue-600 dark:text-blue-400">
//                           Certifications:
//                         </strong>
//                         {orNA(qual.certifications)}
//                       </p>
//                       <p>
//                         <strong className="text-blue-600 dark:text-blue-400">
//                           Total Marks:
//                         </strong>
//                         {orNA(qual.totalMarks)}
//                       </p>
//                       <p>
//                         <strong className="text-blue-600 dark:text-blue-400">
//                           Year:
//                         </strong>
//                         {orNA(qual.year)}
//                       </p>
//                       <p>
//                         <strong className="text-blue-600 dark:text-blue-400">
//                           Percentage/CGPA:
//                         </strong>
//                         {orNA(qual.percentageCgpa)}
//                       </p>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No qualification details found.</p>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* TAB CONTENT: DOCUMENTS */}
//           {activeTab === "documents" && (
//             <div className="leading-6 text-gray-700 dark:text-gray-300 text-sm space-y-4">
//               <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mt-2">
//                 Documents
//               </h3>
//               {employee.documents && employee.documents.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
//                   {employee.documents.map((doc) => (
//                     <div key={doc._id} className="space-y-1 border p-3 rounded">
//                       <p className="font-semibold text-blue-600 dark:text-blue-400">
//                         {doc.name}
//                       </p>
//                       {/* Assuming doc URL might be included if you store it */}
//                       <p>
//                         <span className="underline cursor-pointer text-blue-600 dark:text-blue-400">
//                           {/* If you have doc.url, use that. If not, remove anchor. */}
//                           <a
//                             href={doc.url ? doc.url : "#"}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                           >
//                             {doc.name || "Document Link"}
//                           </a>
//                         </span>
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p>No documents found.</p>
//               )}
//             </div>
//           )}

//           {/* TAB CONTENT: ADDITIONAL INFO */}
//           {activeTab === "additional" && (
//             <div className="leading-6 text-gray-700 dark:text-gray-300 text-sm space-y-3">
//               <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
//                 Additional Information
//               </h2>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Health Benefits
//                 </span>
//                 : {boolToYesNo(employee.health_benefits)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Languages Known
//                 </span>
//                 : {arrayToCommaList(employee.languages_Known)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Role ID
//                 </span>
//                 : {orNA(employee.roleId)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Break Type
//                 </span>
//                 :
//                 {employee.break_Type
//                   ? `${employee.break_Type.breakType} (${employee.break_Type.breakHours} hr)`
//                   : "N/A"}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Engagement Permission (ID)
//                 </span>
//                 : {employee.engagement_permission?._id || "N/A"}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   LinkedIn Profile
//                 </span>
//                 :
//                 <a
//                   href={orNA(employee.linkedin_Profile_URL)}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 dark:text-blue-400 underline"
//                 >
//                   {orNA(employee.linkedin_Profile_URL)}
//                 </a>
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   GitHub Portfolio
//                 </span>
//                 :
//                 <a
//                   href={orNA(employee.github_Portfolio_URL)}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 dark:text-blue-400 underline"
//                 >
//                   {orNA(employee.github_Portfolio_URL)}
//                 </a>
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Created At
//                 </span>
//                 : {formatDate(employee.createdAt)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Updated At
//                 </span>
//                 : {formatDate(employee.updatedAt)}
//               </p>
//             </div>
//           )}

//           {/* TAB CONTENT: NOTIFICATIONS */}
//           {activeTab === "notifications" && (
//             <div className="leading-6 text-gray-700 dark:text-gray-300 text-sm space-y-3">
//               <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
//                 Notifications
//               </h2>
//               {employee.notifications && employee.notifications.length > 0 ? (
//                 <div className="space-y-2">
//                   {employee.notifications.map((noti) => (
//                     <div
//                       key={noti._id}
//                       className="border p-3 rounded flex justify-between items-center"
//                     >
//                       <div>
//                         <p>
//                           <strong className="text-blue-600 dark:text-blue-400">
//                             Notification ID:
//                           </strong>
//                           {orNA(noti.notification)}
//                         </p>
//                         <p>
//                           <strong className="text-blue-600 dark:text-blue-400">
//                             Received At:
//                           </strong>
//                           {formatDate(noti.receivedAt)}
//                         </p>
//                       </div>
//                       <span
//                         className={`text-sm font-semibold px-2 py-1 rounded ${
//                           noti.isRead
//                             ? "bg-green-100 text-green-700"
//                             : "bg-red-100 text-red-700"
//                         }`}
//                       >
//                         {noti.isRead ? "Read" : "Unread"}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p>No notifications available.</p>
//               )}
//             </div>
//           )}

//           {/* TAB CONTENT: ENGAGEMENT PERMISSIONS */}
//           {activeTab === "engagement" && (
//             <div className="leading-6 text-gray-700 dark:text-gray-300 text-sm space-y-3">
//               <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
//                 Engagement Permissions
//               </h2>
//               {employee.engagement_permission ? (
//                 <>
//                   <p>
//                     <strong className="text-blue-600 dark:text-blue-400">
//                       ID:
//                     </strong>
//                     {employee.engagement_permission._id}
//                   </p>
//                   <p>
//                     <strong className="text-blue-600 dark:text-blue-400">
//                       Permissions:
//                     </strong>
//                   </p>
//                   {employee.engagement_permission.permissions &&
//                   employee.engagement_permission.permissions.length > 0 ? (
//                     <div className="flex flex-wrap gap-2 mt-2">
//                       {employee.engagement_permission.permissions.map((perm, idx) => (
//                         <span
//                           key={idx}
//                           className="px-2 py-1 text-sm rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 border border-gray-200 dark:border-gray-600"
//                         >
//                           {perm}
//                         </span>
//                       ))}
//                     </div>
//                   ) : (
//                     <p>No engagement permissions found.</p>
//                   )}
//                 </>
//               ) : (
//                 <p>No engagement permission object found.</p>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Permissions Modal */}
//       {showPermissionsModal && (
//         <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
//           <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded shadow-lg relative p-6">
//             <button
//               onClick={() => setShowPermissionsModal(false)}
//               className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
//             >
//               ✕
//             </button>
//             <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
//               All Permission List
//             </h2>
//             {employee.permission && employee.permission.length > 0 ? (
//               <div className="flex flex-wrap gap-2">
//                 {employee.permission.map((perm, idx) => (
//                   <span
//                     key={idx}
//                     className="px-2 py-1 text-sm rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 border border-gray-200 dark:border-gray-600"
//                   >
//                     {perm}
//                   </span>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-sm text-gray-600 dark:text-gray-300">
//                 No permissions assigned.
//               </p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ViewEmployee;


import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import useEmployeeDetailsStore from "../../store/useAllEmployeesStore";
import { useNavigate, Link } from "react-router-dom";
function ViewEmployee() {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { employee, loading, error, fetchEmployeeById } = useEmployeeDetailsStore();

  const [activeTab, setActiveTab] = useState("personal");
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);

  useEffect(() => {
    fetchEmployeeById(id);
  }, [id, fetchEmployeeById]);

  // Helper functions for safe rendering
  const formatDate = (str) => (str ? new Date(str).toLocaleDateString() : "N/A");
  const orNA = (value) => (value ? value : "N/A");
  const boolToYesNo = (val) => (val && val !== "No" ? "Yes" : "No");
  const arrayToCommaList = (arr) => (arr && arr.length > 0 ? arr.join(", ") : "N/A");

  // Safely render the assigned_to objects
  const renderAssignedTo = (assignedArr) => {
    if (!assignedArr || assignedArr.length === 0) return "N/A";
    // Example: show "John Cena (EMP123)", or just employee_Id, or whatever you prefer
    return assignedArr
      .map(
        (person) =>
          `${person.first_Name ?? ""} ${person.last_Name ?? ""} (${person.employee_Id ?? "No ID"})`
      )
      .join(", ");
  };

  // If shift_Timing_Array is really just a string "[object Object]" from the server,
  // you might want to parse it if it's valid JSON, or else just show the raw string.
  const renderShiftTimingArray = (shiftData) => {
    if (!shiftData) return "N/A";
    // Try to parse as JSON if possible:
    try {
      const parsed = JSON.parse(shiftData);
      // If it’s an array, join it; if object, show as JSON string
      if (Array.isArray(parsed)) {
        return parsed.join(", ");
      }
      if (typeof parsed === "object") {
        return JSON.stringify(parsed, null, 2);
      }
      return parsed; // maybe a plain string/number
    } catch (err) {
      // If it fails, just return the string
      return shiftData;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <Toaster />
        <div className="animate-pulse">
          {/* Loading skeleton here */}
          <div className="flex justify-between mb-6">
            <div className="w-24 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="w-48 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="w-24 h-24 -mt-12 mx-auto rounded-full bg-gray-200 dark:bg-gray-700 border-4 border-white dark:border-gray-800"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mt-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto mt-2"></div>
            </div>
            <div className="col-span-1 lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <div className="flex space-x-4 mb-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              </div>
              <div className="space-y-2">
                {Array.from({ length: 10 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!employee) {
    return null;
  }

  const fullName = `${orNA(employee.first_Name)} ${orNA(employee.last_Name)}`.trim();

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-4">
      <Toaster />
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded bg-gray-200
            dark:bg-gray-700 text-gray-700 dark:text-gray-200
            hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <FaArrowLeft />
          <span>Back</span>
        </motion.button>

        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          Employee Details of
          <span className="text-blue-600 dark:text-blue-400">{fullName}</span>
        </h1>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar - Basic Info and Profile Pic */}
        <div className="col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          {/* Top section with background and avatar */}
          <div className="relative h-20 bg-gray-100 dark:bg-gray-700 rounded-t-lg">
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
              <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden border-4 border-white dark:border-gray-800">
                {employee.user_Avatar ? (
                  <img
                    src={employee.user_Avatar}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No Image
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="text-center pt-16 px-4 pb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {fullName || "N/A"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {orNA(employee.designation)}
            </p>
          </div>
          <hr className="border-gray-200 dark:border-gray-700" />

          {/* Quick Personal Info Overview */}
          <div className="px-4 py-4">
            <h3 className="text-gray-800 dark:text-gray-100 font-semibold mb-3">
              Personal Info
            </h3>
            <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <li>
                <strong className="text-blue-600 dark:text-blue-400">
                  Full Name:
                </strong>
                {fullName}
              </li>
              <li>
                <strong className="text-blue-600 dark:text-blue-400">
                  Email:
                </strong>
                {orNA(employee.personal_Email_Id)}
              </li>
              <li>
                <strong className="text-blue-600 dark:text-blue-400">
                  Phone Number:
                </strong>
                {orNA(employee.mobile_No)}
              </li>
              <li>
                <strong className="text-blue-600 dark:text-blue-400">
                  Department:
                </strong>
                {orNA(employee.department)}
              </li>
              <li>
                <strong className="text-blue-600 dark:text-blue-400">
                  Designation:
                </strong>
                {orNA(employee.designation)}
              </li>
              <li>
                <strong className="text-blue-600 dark:text-blue-400">
                  Date of Joining:
                </strong>
                {formatDate(employee.date_of_Joining)}
              </li>
              <li>
                <strong className="text-blue-600 dark:text-blue-400">
                  Employee ID:
                </strong>
                {orNA(employee.employee_Id)}
              </li>
              <li>
                <strong className="text-blue-600 dark:text-blue-400">
                  Salary:
                </strong>
                ₹{employee.salary ?? 0}
              </li>
              <li>
                <strong className="text-blue-600 dark:text-blue-400">
                  Personal Address:
                </strong>
                {orNA(employee.user_Address)}
              </li>
            </ul>
          </div>

          <div className="flex flex-col space-y-2 mt-4 px-4">
  {/* View Payroll (using Link) */}
  <Link
    to={`/dashboard/payroll/employee/${employee.employee_Id}`}
    className="text-center px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
  >
    View Payroll
  </Link>

  {/* View Daily Task */}
  <button
    onClick={() => navigate(`/dashboard/employee-particular-tasks/${employee.employee_Id}`)}
    className="text-center px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
  >
    View Daily Task
  </button>

  {/* View Assigned Task */}
  <button
    onClick={() => navigate(`/dashboard/employee-tasks/${employee.employee_Id}`)}
    className="text-center px-4 py-2 rounded bg-yellow-600 text-white hover:bg-yellow-700 transition"
  >
    View Assigned Task
  </button>
   <button
          onClick={() => navigate(`/dashboard/employee/${employee._id}/ratings`)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          View Performance
        </button>

  {/* View Tickets Raised */}
  <button
    onClick={() => navigate(`/dashboard/employee-tickets/${employee.employee_Id}`)}
    className="text-center px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
  >
    View Tickets Raised
  </button>
</div>

        </div>

        {/* Right Side - Tabbed Content */}
        <div
          className="col-span-1 lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4
            h-[700px] overflow-scroll
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
            transition-colors duration-300 scroll-stabilize"
        >
          {/* Tabs */}
          <div className="flex flex-wrap gap-4 border-b border-gray-200 dark:border-gray-700 mb-4">
            <button
              onClick={() => setActiveTab("personal")}
              className={`pb-2 text-sm font-medium transition-colors ${
                activeTab === "personal"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              Personal Details
            </button>
            <button
              onClick={() => setActiveTab("employment")}
              className={`pb-2 text-sm font-medium transition-colors ${
                activeTab === "employment"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              Employment Info
            </button>
            <button
              onClick={() => setActiveTab("bankpf")}
              className={`pb-2 text-sm font-medium transition-colors ${
                activeTab === "bankpf"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              Bank & PF Details
            </button>
            <button
              onClick={() => setActiveTab("experience_qualifications")}
              className={`pb-2 text-sm font-medium transition-colors ${
                activeTab === "experience_qualifications"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              Experience & Education
            </button>
            <button
              onClick={() => setActiveTab("documents")}
              className={`pb-2 text-sm font-medium transition-colors ${
                activeTab === "documents"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              Documents
            </button>
            <button
              onClick={() => setActiveTab("additional")}
              className={`pb-2 text-sm font-medium transition-colors ${
                activeTab === "additional"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              Additional Info
            </button>
         
         
          </div>

          {/* TAB CONTENT: PERSONAL */}
          {activeTab === "personal" && (
            <div className="leading-6 text-gray-700 dark:text-gray-300 text-sm space-y-3">
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Full Name
                </span>
                : {fullName}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Personal Email
                </span>
                : {orNA(employee.personal_Email_Id)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Personal Contact Number
                </span>
                : {orNA(employee.mobile_No)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Date of Birth
                </span>
                : {formatDate(employee.dob)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Gender
                </span>
                : {orNA(employee.gender)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Marital Status
                </span>
                : {orNA(employee.marital_Status)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Nationality
                </span>
                : {orNA(employee.nationality)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Permanent Residential Address
                </span>
                : {orNA(employee.user_Address)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Current Residential Address
                </span>
                : {orNA(employee.current_Address)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Disability Status
                </span>
                : {orNA(employee.disability_Status)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Emergency Contact Person
                </span>
                : {orNA(employee.emergency_Contact_Person)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Emergency Contact Number
                </span>
                : {orNA(employee.emergency_Contact_Number)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Emergency Contact Blood Group
                </span>
                : {orNA(employee.emergency_Contact_Blood_Group)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  PAN Number
                </span>
                : {orNA(employee.pan_No)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Aadhaar Number
                </span>
                : {orNA(employee.adhaar_Number)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Passport Number
                </span>
                : {orNA(employee.passport_Number)}
              </p>
            </div>
          )}

          {/* TAB CONTENT: EMPLOYMENT */}
          {activeTab === "employment" && (
            <div className="leading-6 text-gray-700 dark:text-gray-300 text-sm space-y-2">
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Employee ID
                </span>
                : {orNA(employee.employee_Id)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Employment Type
                </span>
                : {orNA(employee.employee_Type)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  User Role
                </span>
                : {orNA(employee.user_Role)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Permission Role
                </span>
                : {orNA(employee.permission_role)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Date of Joining
                </span>
                : {formatDate(employee.date_of_Joining)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Date of Confirmation
                </span>
                : {formatDate(employee.date_of_Conformation)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Employment Status
                </span>
                : {boolToYesNo(employee.isActive)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Designation / Role
                </span>
                : {orNA(employee.designation)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Department
                </span>
                : {orNA(employee.department)}
              </p>
             

              {/* Assigned To: fix to show properly */}
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Assigned Manager
                </span>
                : {renderAssignedTo(employee.assigned_to)}
              </p>

              {/* Work Shift Array: fix to show properly */}
            
        

              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Total Work Experience (Years)
                </span>
                : {orNA(employee.total_Experience)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Salary at Joining
                </span>
                : ₹{employee.salary ?? 0}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Current Salary
                </span>
                : ₹{employee.current_Base_Salary ?? 0}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Paid Leaves
                </span>
                : {employee.no_of_Paid_Leave ?? 0}
              </p>
          
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  OTP Required
                </span>
                : {employee.otp === "no" ? "NO" : "YES"}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Working Email
                </span>
                : {orNA(employee.working_Email_Id)}
              </p>
        
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Overtime Allowed
                </span>
                : {boolToYesNo(employee.overtime_allowed)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Overtime Hours
                </span>
                : {orNA(employee.overtime_hours)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Police Verification
                </span>
                : {orNA(employee.police_Verification)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Background Verification Status
                </span>
                : {orNA(employee.background_Verification_Status)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Compliance Training Status
                </span>
                : {orNA(employee.complianceTrainingStatus)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Training Status
                </span>
                : {orNA(employee.trainingStatus)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Allowances Provided
                </span>
                : {arrayToCommaList(employee.allowances_Provided)}
              </p>
              {/* Permissions link */}
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Permissions
                </span>
                :
                <button
                  onClick={() => setShowPermissionsModal(true)}
                  className="text-blue-600 dark:text-blue-400 underline ml-1"
                >
                  View all
                </button>
              </p>
            </div>
          )}

          {/* TAB CONTENT: BANK & PF DETAILS */}
          {activeTab === "bankpf" && (
            <div className="leading-6 text-gray-700 dark:text-gray-300 text-sm space-y-2">
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
                Bank Details
              </h2>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Bank Holder Name
                </span>
                : {orNA(employee.bank_Holder_Name)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Bank Name
                </span>
                : {orNA(employee.bank_Name)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Bank Account No
                </span>
                : {orNA(employee.bank_Account_No)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  IFSC Code
                </span>
                : {orNA(employee.ifsc_Code)}
              </p>
              <hr className="my-4 border-gray-200 dark:border-gray-700" />
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
                PF/ESI Details
              </h2>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  PF Details
                </span>
                : {orNA(employee.pf_Details)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  ESI Details
                </span>
                : {orNA(employee.esi_Details)}
              </p>
            </div>
          )}

          {/* TAB CONTENT: EXPERIENCE & QUALIFICATIONS */}
          {activeTab === "experience_qualifications" && (
            <div className="leading-6 text-gray-700 dark:text-gray-300 text-sm space-y-4">
              {/* Experiences */}
              <div>
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
                  Past Experiences
                </h2>
                {employee.experiences && employee.experiences.length > 0 ? (
                  employee.experiences.map((exp) => (
                    <div
                      key={exp._id}
                      className="border border-gray-200 dark:border-gray-700 p-3 rounded mb-3"
                    >
                      <p>
                        <strong className="text-blue-600 dark:text-blue-400">
                          Company Name:
                        </strong>
                        {orNA(exp.companyName)}
                      </p>
                      <p>
                        <strong className="text-blue-600 dark:text-blue-400">
                          Start Date:
                        </strong>
                        {formatDate(exp.startDate)}
                      </p>
                      <p>
                        <strong className="text-blue-600 dark:text-blue-400">
                          End Date:
                        </strong>
                        {formatDate(exp.endDate)}
                      </p>
                      <p>
                        <strong className="text-blue-600 dark:text-blue-400">
                          Designation:
                        </strong>
                        {orNA(exp.designation)}
                      </p>
                      <p>
                        <strong className="text-blue-600 dark:text-blue-400">
                          Grade/Band/Level:
                        </strong>
                        {orNA(exp.grade_Band_Level)}
                      </p>
                      <p>
                        <strong className="text-blue-600 dark:text-blue-400">
                          Previous Positions:
                        </strong>
                        {orNA(exp.previous_Positions)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No prior experience records found.</p>
                )}
              </div>

              {/* Qualifications */}
              <div>
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
                  Qualifications
                </h2>
                {employee.qualifications && employee.qualifications.length > 0 ? (
                  employee.qualifications.map((qual) => (
                    <div
                      key={qual._id}
                      className="border border-gray-200 dark:border-gray-700 p-3 rounded mb-3"
                    >
                      <p>
                        <strong className="text-blue-600 dark:text-blue-400">
                          Qualification Name:
                        </strong>
                        {orNA(qual.qualificationName)}
                      </p>
                      <p>
                        <strong className="text-blue-600 dark:text-blue-400">
                          University/Board:
                        </strong>
                        {orNA(qual.universityBoard)}
                      </p>
                      <p>
                        <strong className="text-blue-600 dark:text-blue-400">
                          Specialization:
                        </strong>
                        {orNA(qual.specialization)}
                      </p>
                      <p>
                        <strong className="text-blue-600 dark:text-blue-400">
                          Certifications:
                        </strong>
                        {orNA(qual.certifications)}
                      </p>
                      <p>
                        <strong className="text-blue-600 dark:text-blue-400">
                          Total Marks:
                        </strong>
                        {orNA(qual.totalMarks)}
                      </p>
                      <p>
                        <strong className="text-blue-600 dark:text-blue-400">
                          Year:
                        </strong>
                        {orNA(qual.year)}
                      </p>
                      <p>
                        <strong className="text-blue-600 dark:text-blue-400">
                          Percentage/CGPA:
                        </strong>
                        {orNA(qual.percentageCgpa)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No qualification details found.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB CONTENT: DOCUMENTS */}
          {activeTab === "documents" && (
            <div className="leading-6 text-gray-700 dark:text-gray-300 text-sm space-y-4">
              <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mt-2">
                Documents
              </h3>
              {employee.documents && employee.documents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                  {employee.documents.map((doc) => (
                    <div key={doc._id} className="space-y-1 border p-3 rounded">
                      <p className="font-semibold text-blue-600 dark:text-blue-400">
                        {doc.name}
                      </p>
                      {/* If doc.url is stored, you could link to it here */}
                      <p>
                        <span className="underline cursor-pointer text-blue-600 dark:text-blue-400">
                          <a
                            href={doc.url ? doc.url : "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {doc.name || "Document Link"}
                          </a>
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No documents found.</p>
              )}
            </div>
          )}

          {/* TAB CONTENT: ADDITIONAL INFO */}
          {activeTab === "additional" && (
            <div className="leading-6 text-gray-700 dark:text-gray-300 text-sm space-y-3">
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
                Additional Information
              </h2>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Health Benefits
                </span>
                : {boolToYesNo(employee.health_benefits)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Languages Known
                </span>
                : {arrayToCommaList(employee.languages_Known)}
              </p>
             
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Break Type
                </span>
                :
                {employee.break_Type
                  ? `${employee.break_Type.breakType} (${employee.break_Type.breakHours} hr)`
                  : "N/A"}
              </p>
        
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  LinkedIn Profile
                </span>
                :
                <a
                  href={orNA(employee.linkedin_Profile_URL)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 underline"
                >
                  {orNA(employee.linkedin_Profile_URL)}
                </a>
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  GitHub Portfolio
                </span>
                :
                <a
                  href={orNA(employee.github_Portfolio_URL)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 underline"
                >
                  {orNA(employee.github_Portfolio_URL)}
                </a>
              </p>
         
            </div>
          )}

   

   
        </div>
      </div>

      {/* Permissions Modal */}
      {showPermissionsModal && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded shadow-lg relative p-6">
            <button
              onClick={() => setShowPermissionsModal(false)}
              className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            >
              ✕
            </button>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
              All Permission List
            </h2>
            {employee.permission && employee.permission.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {employee.permission.map((perm, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-sm rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 border border-gray-200 dark:border-gray-600"
                  >
                    {perm}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-300">
                No permissions assigned.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewEmployee;

