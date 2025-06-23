

// import { useEffect, useState } from "react";
// import { useParams} from "react-router-dom";
// import { motion } from "framer-motion";
// import { Toaster } from "react-hot-toast";
// import { FaArrowLeft } from "react-icons/fa";
// import useEmployeeDetailsStore from "../../store/useAllEmployeesStore";
// import { useNavigate, Link } from "react-router-dom";
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
//   const boolToYesNo = (val) => (val && val !== "No" ? "Yes" : "No");
//   const arrayToCommaList = (arr) => (arr && arr.length > 0 ? arr.join(", ") : "N/A");

//   // Safely render the assigned_to objects
//   const renderAssignedTo = (assignedArr) => {
//     if (!assignedArr || assignedArr.length === 0) return "N/A";
//     // Example: show "John Cena (EMP123)", or just employee_Id, or whatever you prefer
//     return assignedArr
//       .map(
//         (person) =>
//           `${person.first_Name ?? ""} ${person.last_Name ?? ""} (${person.employee_Id ?? "No ID"})`
//       )
//       .join(", ");
//   };

//   // If shift_Timing_Array is really just a string "[object Object]" from the server,
//   // you might want to parse it if it's valid JSON, or else just show the raw string.
//   const renderShiftTimingArray = (shiftData) => {
//     if (!shiftData) return "N/A";
//     // Try to parse as JSON if possible:
//     try {
//       const parsed = JSON.parse(shiftData);
//       // If it’s an array, join it; if object, show as JSON string
//       if (Array.isArray(parsed)) {
//         return parsed.join(", ");
//       }
//       if (typeof parsed === "object") {
//         return JSON.stringify(parsed, null, 2);
//       }
//       return parsed; // maybe a plain string/number
//     } catch (err) {
//       // If it fails, just return the string
//       return shiftData;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
//         <Toaster />
//         <div className="animate-pulse">
//           {/* Loading skeleton here */}
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
//     <div className="bg-gray-50 dark:bg-gray-900 p-4">
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
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
//             <div className="flex flex-col space-y-2 mt-4 px-4">
//   {/* View Payroll (using Link) */}
//   <Link
//     to={`/dashboard/payroll/employee/${employee.employee_Id}`}
//     className="text-center px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
//   >
//     View Payroll
//   </Link>

//   {/* View Daily Task */}
//   <button
//     onClick={() => navigate(`/dashboard/employee-particular-tasks/${employee.employee_Id}`)}
//     className="text-center px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
//   >
//     View Daily Task
//   </button>

//   {/* View Assigned Task */}
//   <button
//     onClick={() => navigate(`/dashboard/employee-tasks/${employee.employee_Id}`)}
//     className="text-center px-4 py-2 rounded bg-yellow-600 text-white hover:bg-yellow-700 transition"
//   >
//     View Assigned Task
//   </button>
//    <button
//           onClick={() => navigate(`/dashboard/employee/${employee._id}/ratings`)}
//           className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
//         >
//           View Performance
//         </button>
//    <button
//           onClick={() => navigate(`/dashboard/attendance/${employee.employee_Id}`)}
//           className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
//         >
//           View Attendance
//         </button>

//   {/* View Tickets Raised */}
//   <button
//     onClick={() => navigate(`/dashboard/employee-tickets/${employee.employee_Id}`)}
//     className="text-center px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
//   >
//     View Tickets Raised
//   </button>
// </div>
//           </div>

          

//         </div>

//         {/* Right Side - Tabbed Content */}
//         <div
//           className="col-span-1 lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4
//             h-[700px] overflow-scroll
//             [&::-webkit-scrollbar]:w-2
//             [&::-webkit-scrollbar-track]:rounded-full
//             [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
//             [&::-webkit-scrollbar-thumb]:rounded-full
//             [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
//             transition-colors duration-300 scroll-stabilize"
//         >
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
             

//               {/* Assigned To: fix to show properly */}
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Assigned Manager
//                 </span>
//                 : {renderAssignedTo(employee.assigned_to)}
//               </p>

//               {/* Work Shift Array: fix to show properly */}
            
        

//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Total Work Experience (Years)
//                 </span>
//                 : {orNA(employee.total_Experience)}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Salary at Joining
//                 </span>
//                 : ₹{employee.salary ?? 0}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Current Salary
//                 </span>
//                 : ₹{employee.current_Base_Salary ?? 0}
//               </p>
//               <p>
//                 <span className="font-semibold text-blue-600 dark:text-blue-400">
//                   Paid Leaves
//                 </span>
//                 : {employee.no_of_Paid_Leave ?? 0}
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
//                       {/* If doc.url is stored, you could link to it here */}
//                       <p>
//                         <span className="underline cursor-pointer text-blue-600 dark:text-blue-400">
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
//                   Break Type
//                 </span>
//                 :
//                 {employee.break_Type
//                   ? `${employee.break_Type.breakType} (${employee.break_Type.breakHours} hr)`
//                   : "N/A"}
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
import { Toaster } from "react-hot-toast";
import { 
  FaArrowLeft, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaBuilding, 
  FaCalendarAlt, 
  FaIdCard,
  FaDollarSign,
  FaMapMarkerAlt,
  FaEye,
  FaTasks,
  FaClipboardList,
  FaTrophy,
  FaUserClock,
  FaTicketAlt,
  FaTimes,
  FaFileAlt,
  FaGraduationCap,
  FaBriefcase,
  FaBank,
  FaShieldAlt,
  FaLanguage,
  FaLinkedin,
  FaGithub,
  FaCoffee,
  FaMedkit,
  FaUserShield,
  FaChevronRight
} from "react-icons/fa";
import useEmployeeDetailsStore from "../../store/useAllEmployeesStore";
import ConfirmationDialog from "../common/ConfirmationDialog";

// Mock navigation and params functions (replace with actual useNavigate and useParams in your app)
const navigate = (path) => {
  console.log(`Navigate to: ${path}`);
};

const useParams = () => ({ id: "sample-employee-id" });

function ViewEmployee() {
  const { id } = useParams();
 
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

  const renderAssignedTo = (assignedArr) => {
    if (!assignedArr || assignedArr.length === 0) return "N/A";
    return assignedArr
      .map(
        (person) =>
          `${person.first_Name ?? ""} ${person.last_Name ?? ""} (${person.employee_Id ?? "No ID"})`
      )
      .join(", ");
  };

  const renderShiftTimingArray = (shiftData) => {
    if (!shiftData) return "N/A";
    try {
      const parsed = JSON.parse(shiftData);
      if (Array.isArray(parsed)) {
        return parsed.join(", ");
      }
      if (typeof parsed === "object") {
        return JSON.stringify(parsed, null, 2);
      }
      return parsed;
    } catch (err) {
      return shiftData;
    }
  };

  // Loading Skeleton
  const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="w-24 h-10 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"></div>
          <div className="w-64 h-8 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
        </div>
        
        {/* Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse">
              <div className="h-24 bg-gray-300 dark:bg-gray-600"></div>
              <div className="p-6 pt-12">
                <div className="w-24 h-24 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto -mt-12 mb-4"></div>
                <div className="space-y-3">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
              <div className="flex space-x-4 mb-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
                ))}
              </div>
              <div className="space-y-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl text-red-600 dark:text-red-400">⚠️</div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-red-800 dark:text-red-200">Error Loading Employee</h2>
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <FaUser className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Employee not found</h3>
          <p className="text-gray-600 dark:text-gray-400">The requested employee could not be found.</p>
        </div>
      </div>
    );
  }

  const fullName = `${orNA(employee.first_Name)} ${orNA(employee.last_Name)}`.trim();

  const tabs = [
    { id: "personal", label: "Personal Details", icon: FaUser },
    { id: "employment", label: "Employment Info", icon: FaBriefcase },
    { id: "bankpf", label: "Bank & PF Details", icon: FaBank },
    { id: "experience_qualifications", label: "Experience & Education", icon: FaGraduationCap },
    { id: "documents", label: "Documents", icon: FaFileAlt },
    { id: "additional", label: "Additional Info", icon: FaShieldAlt },
  ];

  const ActionButton = ({ onClick, icon: Icon, children, className = "", variant = "primary" }) => {
    const variants = {
      primary: "bg-blue-600 hover:bg-blue-700 text-white",
      success: "bg-green-600 hover:bg-green-700 text-white", 
      warning: "bg-yellow-600 hover:bg-yellow-700 text-white",
      purple: "bg-purple-600 hover:bg-purple-700 text-white",
      indigo: "bg-indigo-600 hover:bg-indigo-700 text-white"
    };

    return (
      <button
        onClick={onClick}
        className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl ${variants[variant]} ${className}`}
      >
        <Icon className="w-4 h-4" />
        <span>{children}</span>
      </button>
    );
  };

  const InfoRow = ({ label, value, icon: Icon }) => (
    <div className="flex items-start space-x-3 py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
      {Icon && <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />}
      <div className="flex-1 min-w-0">
        <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</dt>
        <dd className="text-sm text-gray-900 dark:text-gray-100 mt-1 break-words">{value}</dd>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 transition-colors duration-200">
      <Toaster />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 w-fit"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="text-center sm:text-right">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              Employee Details
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {fullName || "Unknown Employee"}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Employee Profile */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200">
              {/* Header Background */}
              <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                <div className="absolute inset-0 bg-black/20"></div>
              </div>

              {/* Profile Content */}
              <div className="relative px-6 pb-6">
                {/* Avatar */}
                <div className="flex justify-center -mt-12 mb-4">
                  <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-700 p-1 shadow-lg">
                    {employee.user_Avatar ? (
                      <img
                        src={employee.user_Avatar}
                        alt={fullName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <FaUser className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Basic Info */}
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {fullName || "N/A"}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {orNA(employee.designation)}
                  </p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    employee.isActive 
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}>
                    {employee.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Quick Info */}
                <div className="space-y-3 mb-6">
                  <InfoRow 
                    icon={FaIdCard}
                    label="Employee ID"
                    value={orNA(employee.employee_Id)}
                  />
                  <InfoRow 
                    icon={FaEnvelope}
                    label="Email"
                    value={orNA(employee.personal_Email_Id)}
                  />
                  <InfoRow 
                    icon={FaPhone}
                    label="Phone"
                    value={orNA(employee.mobile_No)}
                  />
                  <InfoRow 
                    icon={FaBuilding}
                    label="Department"
                    value={orNA(employee.department)}
                  />
                  <InfoRow 
                    icon={FaCalendarAlt}
                    label="Join Date"
                    value={formatDate(employee.date_of_Joining)}
                  />
                  <InfoRow 
                    icon={FaDollarSign}
                    label="Salary"
                    value={`₹${employee.salary ?? 0}`}
                  />
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <ActionButton
                    onClick={() => navigate(`/dashboard/payroll/employee/${employee.employee_Id}`)}
                    icon={FaDollarSign}
                    variant="primary"
                  >
                    View Payroll
                  </ActionButton>
                  
                  <ActionButton
                    onClick={() => navigate(`/dashboard/employee-particular-tasks/${employee.employee_Id}`)}
                    icon={FaTasks}
                    variant="success"
                  >
                    Daily Tasks
                  </ActionButton>
                  
                  <ActionButton
                    onClick={() => navigate(`/dashboard/employee-tasks/${employee.employee_Id}`)}
                    icon={FaClipboardList}
                    variant="warning"
                  >
                    Assigned Tasks
                  </ActionButton>
                  
                  <ActionButton
                    onClick={() => navigate(`/dashboard/employee/${employee._id}/ratings`)}
                    icon={FaTrophy}
                    variant="purple"
                  >
                    Performance
                  </ActionButton>
                  
                  <ActionButton
                    onClick={() => navigate(`/dashboard/attendance/${employee.employee_Id}`)}
                    icon={FaUserClock}
                    variant="indigo"
                  >
                    Attendance
                  </ActionButton>
                  
                  <ActionButton
                    onClick={() => navigate(`/dashboard/employee-tickets/${employee.employee_Id}`)}
                    icon={FaTicketAlt}
                    variant="purple"
                  >
                    Support Tickets
                  </ActionButton>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Tabbed Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-200">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200 dark:border-gray-700 p-6">
                <div className="flex flex-wrap gap-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          activeTab === tab.id
                            ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-sm"
                            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6 max-h-[600px] overflow-y-auto">
                {/* Personal Details Tab */}
                {activeTab === "personal" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
                      <FaUser className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span>Personal Information</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InfoRow label="Full Name" value={fullName} />
                      <InfoRow label="Personal Email" value={orNA(employee.personal_Email_Id)} />
                      <InfoRow label="Mobile Number" value={orNA(employee.mobile_No)} />
                      <InfoRow label="Date of Birth" value={formatDate(employee.dob)} />
                      <InfoRow label="Gender" value={orNA(employee.gender)} />
                      <InfoRow label="Marital Status" value={orNA(employee.marital_Status)} />
                      <InfoRow label="Nationality" value={orNA(employee.nationality)} />
                      <InfoRow label="Permanent Address" value={orNA(employee.user_Address)} />
                      <InfoRow label="Current Address" value={orNA(employee.current_Address)} />
                      <InfoRow label="Disability Status" value={orNA(employee.disability_Status)} />
                      <InfoRow label="Emergency Contact Person" value={orNA(employee.emergency_Contact_Person)} />
                      <InfoRow label="Emergency Contact Number" value={orNA(employee.emergency_Contact_Number)} />
                      <InfoRow label="Blood Group" value={orNA(employee.emergency_Contact_Blood_Group)} />
                      <InfoRow label="PAN Number" value={orNA(employee.pan_No)} />
                      <InfoRow label="Aadhaar Number" value={orNA(employee.adhaar_Number)} />
                      <InfoRow label="Passport Number" value={orNA(employee.passport_Number)} />
                    </div>
                  </div>
                )}

                {/* Employment Details Tab */}
                {activeTab === "employment" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
                      <FaBriefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span>Employment Information</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InfoRow label="Employee ID" value={orNA(employee.employee_Id)} />
                      <InfoRow label="Employment Type" value={orNA(employee.employee_Type)} />
                      <InfoRow label="User Role" value={orNA(employee.user_Role)} />
                      <InfoRow label="Permission Role" value={orNA(employee.permission_role)} />
                      <InfoRow label="Date of Joining" value={formatDate(employee.date_of_Joining)} />
                      <InfoRow label="Date of Confirmation" value={formatDate(employee.date_of_Conformation)} />
                      <InfoRow label="Employment Status" value={boolToYesNo(employee.isActive)} />
                      <InfoRow label="Designation" value={orNA(employee.designation)} />
                      <InfoRow label="Department" value={orNA(employee.department)} />
                      <InfoRow label="Assigned Manager" value={renderAssignedTo(employee.assigned_to)} />
                      <InfoRow label="Total Experience" value={`${orNA(employee.total_Experience)} years`} />
                      <InfoRow label="Salary at Joining" value={`₹${employee.salary ?? 0}`} />
                      <InfoRow label="Current Salary" value={`₹${employee.current_Base_Salary ?? 0}`} />
                      <InfoRow label="Paid Leaves" value={`${employee.no_of_Paid_Leave ?? 0} days`} />
                      <InfoRow label="OTP Required" value={employee.otp === "no" ? "NO" : "YES"} />
                      <InfoRow label="Working Email" value={orNA(employee.working_Email_Id)} />
                      <InfoRow label="Overtime Allowed" value={boolToYesNo(employee.overtime_allowed)} />
                      <InfoRow label="Overtime Hours" value={orNA(employee.overtime_hours)} />
                      <InfoRow label="Police Verification" value={orNA(employee.police_Verification)} />
                      <InfoRow label="Background Verification" value={orNA(employee.background_Verification_Status)} />
                      <InfoRow label="Compliance Training" value={orNA(employee.complianceTrainingStatus)} />
                      <InfoRow label="Training Status" value={orNA(employee.trainingStatus)} />
                      <InfoRow label="Allowances" value={arrayToCommaList(employee.allowances_Provided)} />
                    </div>
                    
                    {/* Permissions */}
                    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 dark:text-gray-100">Permissions</span>
                        <button
                          onClick={() => setShowPermissionsModal(true)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-200 flex items-center space-x-1"
                        >
                          <span>View All</span>
                          <FaChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bank & PF Details Tab */}
                {activeTab === "bankpf" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
                        <FaBank className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span>Bank Details</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InfoRow label="Bank Holder Name" value={orNA(employee.bank_Holder_Name)} />
                        <InfoRow label="Bank Name" value={orNA(employee.bank_Name)} />
                        <InfoRow label="Account Number" value={orNA(employee.bank_Account_No)} />
                        <InfoRow label="IFSC Code" value={orNA(employee.ifsc_Code)} />
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
                        <FaShieldAlt className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span>PF/ESI Details</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InfoRow label="PF Details" value={orNA(employee.pf_Details)} />
                        <InfoRow label="ESI Details" value={orNA(employee.esi_Details)} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Experience & Education Tab */}
                {activeTab === "experience_qualifications" && (
                  <div className="space-y-6">
                    {/* Experience Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
                        <FaBriefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span>Past Experience</span>
                      </h3>
                      {employee.experiences && employee.experiences.length > 0 ? (
                        <div className="space-y-4">
                          {employee.experiences.map((exp) => (
                            <div
                              key={exp._id}
                              className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
                            >
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <InfoRow label="Company Name" value={orNA(exp.companyName)} />
                                <InfoRow label="Designation" value={orNA(exp.designation)} />
                                <InfoRow label="Start Date" value={formatDate(exp.startDate)} />
                                <InfoRow label="End Date" value={formatDate(exp.endDate)} />
                                <InfoRow label="Grade/Band/Level" value={orNA(exp.grade_Band_Level)} />
                                <InfoRow label="Previous Positions" value={orNA(exp.previous_Positions)} />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400 italic">No prior experience records found.</p>
                      )}
                    </div>

                    {/* Education Section */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
                        <FaGraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span>Qualifications</span>
                      </h3>
                      {employee.qualifications && employee.qualifications.length > 0 ? (
                        <div className="space-y-4">
                          {employee.qualifications.map((qual) => (
                            <div
                              key={qual._id}
                              className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
                            >
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <InfoRow label="Qualification" value={orNA(qual.qualificationName)} />
                                <InfoRow label="University/Board" value={orNA(qual.universityBoard)} />
                                <InfoRow label="Specialization" value={orNA(qual.specialization)} />
                                <InfoRow label="Certifications" value={orNA(qual.certifications)} />
                                <InfoRow label="Total Marks" value={orNA(qual.totalMarks)} />
                                <InfoRow label="Year" value={orNA(qual.year)} />
                                <InfoRow label="Percentage/CGPA" value={orNA(qual.percentageCgpa)} />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400 italic">No qualification details found.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Documents Tab */}
                {activeTab === "documents" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
                      <FaFileAlt className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span>Documents</span>
                    </h3>
                    {employee.documents && employee.documents.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {employee.documents.map((doc) => (
                          <div key={doc._id} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                            <div className="flex items-center space-x-3">
                              <FaFileAlt className="w-8 h-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                  {doc.name}
                                </h4>
                                {doc.url && (
                                  <a
                                    href={doc.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm transition-colors duration-200 flex items-center space-x-1 mt-1"
                                  >
                                    <FaEye className="w-3 h-3" />
                                    <span>View Document</span>
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400 italic">No documents found.</p>
                    )}
                  </div>
                )}

                {/* Additional Info Tab */}
                {activeTab === "additional" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
                      <FaShieldAlt className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span>Additional Information</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InfoRow 
                        icon={FaMedkit}
                        label="Health Benefits" 
                        value={boolToYesNo(employee.health_benefits)} 
                      />
                      <InfoRow 
                        icon={FaLanguage}
                        label="Languages Known" 
                        value={arrayToCommaList(employee.languages_Known)} 
                      />
                      <InfoRow 
                        icon={FaCoffee}
                        label="Break Type" 
                        value={employee.break_Type ? `${employee.break_Type.breakType} (${employee.break_Type.breakHours} hr)` : "N/A"} 
                      />
                      <div className="sm:col-span-2">
                        <InfoRow 
                          icon={FaLinkedin}
                          label="LinkedIn Profile" 
                          value={
                            employee.linkedin_Profile_URL && employee.linkedin_Profile_URL !== "N/A" ? (
                              <a
                                href={employee.linkedin_Profile_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                              >
                                {employee.linkedin_Profile_URL}
                              </a>
                            ) : "N/A"
                          } 
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <InfoRow 
                          icon={FaGithub}
                          label="GitHub Portfolio" 
                          value={
                            employee.github_Portfolio_URL && employee.github_Portfolio_URL !== "N/A" ? (
                              <a
                                href={employee.github_Portfolio_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                              >
                                {employee.github_Portfolio_URL}
                              </a>
                            ) : "N/A"
                          } 
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Permissions Modal */}
      {showPermissionsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                <FaUserShield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Employee Permissions</span>
              </h2>
              <button
                onClick={() => setShowPermissionsModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-96">
              {employee.permission && employee.permission.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {employee.permission.map((perm, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border border-blue-200 dark:border-blue-700"
                    >
                      {perm}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaUserShield className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">No permissions assigned to this employee.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewEmployee;
