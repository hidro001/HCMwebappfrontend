


// import React, { useState, useEffect, useMemo } from "react";
// import { toast } from "react-hot-toast";
// import useRatingStore from "../../store/useRatingNewStore"; 
// import {
//   FiCalendar as CalendarIcon,
//   FiDownload as Download,
//   FiUpload as Upload,
//   FiChevronDown as ChevronDown,
//   FiArrowUpCircle as ArrowUpCircle,
//   FiClock as Clock,
// } from "react-icons/fi";
// import { FaFileExcel as FileSpreadsheet } from "react-icons/fa";

// function BulkUploadPast() {
//   const {
//     generatePastRatingsTemplate,
//     uploadPastRatings,
//     fetchSubordinates,
//     subordinates: employees,
//     loading,
//     error,
//   } = useRatingStore();

//   // Defaults and state
//   const today = useMemo(() => new Date(), []);
//   const defaultDate = today.toISOString().split("T")[0];
//   const defaultYear = String(today.getFullYear());
//   const defaultMonth = String(today.getMonth() + 1).padStart(2, "0");

//   const [employeeId, setEmployeeId] = useState("");
//   const [frequency, setFrequency] = useState("daily");

//   const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
//   const [weekRange, setWeekRange] = useState({
//     startYear: "",
//     startWeek: "",
//     endYear: "",
//     endWeek: "",
//   });
//   const [monthRange, setMonthRange] = useState({
//     startYear: "",
//     startMonth: "",
//     endYear: "",
//     endMonth: "",
//   });
//   const [yearRange, setYearRange] = useState({ startYear: "", endYear: "" });

//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState("No file selected");

//   const [errorCount, setErrorCount] = useState(0);
//   const [bulkErrors, setBulkErrors] = useState([]);

//   useEffect(() => {
//     fetchSubordinates(); // Load all employees on mount
//   }, [fetchSubordinates]);

//   // Frequency change handler resets ranges and errors
//   const handleFrequencyChange = (e) => {
//     const freq = e.target.value;
//     setFrequency(freq);
//     setErrorCount(0);
//     setBulkErrors([]);
//     setDateRange({ startDate: "", endDate: "" });
//     setWeekRange({ startYear: "", startWeek: "", endYear: "", endWeek: "" });
//     setMonthRange({ startYear: "", startMonth: "", endYear: "", endMonth: "" });
//     setYearRange({ startYear: "", endYear: "" });
//   };

//   // Download template handler
//   const handleDownloadTemplate = async () => {
//     if (!employeeId) {
//       toast.error("Please select an employee");
//       return;
//     }

//     let params = { employeeId, frequency };

//     if (frequency === "daily") {
//       if (!dateRange.startDate || !dateRange.endDate) {
//         toast.error("Please select start and end date");
//         return;
//       }
//       params.startDate = dateRange.startDate;
//       params.endDate = dateRange.endDate;
//     } else if (frequency === "weekly") {
//       if (
//         !weekRange.startYear ||
//         !weekRange.startWeek ||
//         !weekRange.endYear ||
//         !weekRange.endWeek
//       ) {
//         toast.error("Please select start and end week/year");
//         return;
//       }
//       Object.assign(params, weekRange);
//     } else if (frequency === "monthly") {
//       if (
//         !monthRange.startYear ||
//         !monthRange.startMonth ||
//         !monthRange.endYear ||
//         !monthRange.endMonth
//       ) {
//         toast.error("Please select start and end month/year");
//         return;
//       }
//       Object.assign(params, monthRange);
//     } else if (frequency === "yearly") {
//       if (!yearRange.startYear || !yearRange.endYear) {
//         toast.error("Please select start and end year");
//         return;
//       }
//       Object.assign(params, yearRange);
//     }

//     try {
//       const res = await generatePastRatingsTemplate(params);
//       const blob = new Blob([res.data], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute(
//         "download",
//         `employee_${employeeId}_past_ratings_template.xlsx`
//       );
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       toast.success("Template downloaded successfully!");
//     } catch (err) {
//       toast.error(
//         err?.response?.data?.message || err.message || "Error downloading template"
//       );
//     }
//   };

//   // Upload handler
//   const handleUpload = async () => {
//     if (!file) {
//       toast.error("Please select an Excel file to upload");
//       return;
//     }

//     setErrorCount(0);
//     setBulkErrors([]);

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const res = await uploadPastRatings(formData);

//       if (res.errorCount && res.errorCount > 0) {
//         setErrorCount(res.errorCount);
//         setBulkErrors(res.errors);
//       }

//       toast.success(
//         `Past ratings uploaded. Inserted: ${res.newCount || 0}, Updated: ${
//           res.updatedCount || 0
//         }`
//       );

//       setFile(null);
//       setFileName("No file selected");
//     } catch (err) {
//       toast.error(
//         err?.response?.data?.message || err.message || "Error uploading file"
//       );
//     }
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       setFileName(selectedFile.name);
//     }
//   };

//   // Month name helper
//   const getMonthName = (monthNumber) => {
//     const months = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//     return months[parseInt(monthNumber, 10) - 1];
//   };

//   return (
//     <div className="p-6 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 rounded-2xl max-w-4xl mx-auto">
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//             Bulk Upload Past Ratings
//           </h2>
//           <p className="mt-1 text-gray-600 dark:text-gray-400">
//             Generate and upload past ratings for a single employee
//           </p>
//         </div>
//         <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
//           <FileSpreadsheet size={28} className="text-white" />
//         </div>
//       </div>

//       {/* Employee Select */}
//       <div className="mb-6">
//         <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
//           Select Employee
//         </label>
//         {loading ? (
//           <p>Loading employees...</p>
//         ) : (
//           <select
//             className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100"
//             value={employeeId}
//             onChange={(e) => setEmployeeId(e.target.value)}
//           >
//             <option value="">-- Select Employee --</option>
//             {employees.map((emp) => (
//               <option key={emp._id} value={emp._id}>
//                 {emp.first_Name} {emp.last_Name} ({emp.employee_Id})
//               </option>
//             ))}
//           </select>
//         )}
//       </div>

//       {/* Frequency Select */}
//       <div className="mb-6">
//         <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
//           Frequency
//         </label>
//         <select
//           className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100"
//           value={frequency}
//           onChange={handleFrequencyChange}
//         >
//           <option value="daily">Daily</option>
//           <option value="weekly">Weekly</option>
//           <option value="monthly">Monthly</option>
//           <option value="yearly">Yearly</option>
//         </select>
//       </div>

//       {/* Date/Week/Month/Year range inputs, same as you already have */}

//       {/* Daily Range */}
//       {frequency === "daily" && (
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <div>
//             <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
//               Start Date
//             </label>
//             <input
//               type="date"
//               className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100"
//               value={dateRange.startDate}
//               onChange={(e) =>
//                 setDateRange({ ...dateRange, startDate: e.target.value })
//               }
//             />
//           </div>
//           <div>
//             <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
//               End Date
//             </label>
//             <input
//               type="date"
//               className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100"
//               value={dateRange.endDate}
//               onChange={(e) =>
//                 setDateRange({ ...dateRange, endDate: e.target.value })
//               }
//             />
//           </div>
//         </div>
//       )}

//       {/* Weekly Range */}
//       {frequency === "weekly" && (
//         <div className="grid grid-cols-4 gap-4 mb-6">
//           {/* Start Year */}
//           <div>
//             <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
//               Start Year
//             </label>
//             <input
//               type="number"
//               className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100"
//               value={weekRange.startYear}
//               onChange={(e) =>
//                 setWeekRange({ ...weekRange, startYear: e.target.value })
//               }
//             />
//           </div>
//           {/* Start Week */}
//           <div>
//             <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
//               Start Week
//             </label>
//             <input
//               type="number"
//               min={1}
//               max={53}
//               className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100"
//               value={weekRange.startWeek}
//               onChange={(e) =>
//                 setWeekRange({ ...weekRange, startWeek: e.target.value })
//               }
//             />
//           </div>
//           {/* End Year */}
//           <div>
//             <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
//               End Year
//             </label>
//             <input
//               type="number"
//               className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100"
//               value={weekRange.endYear}
//               onChange={(e) =>
//                 setWeekRange({ ...weekRange, endYear: e.target.value })
//               }
//             />
//           </div>
//           {/* End Week */}
//           <div>
//             <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
//               End Week
//             </label>
//             <input
//               type="number"
//               min={1}
//               max={53}
//               className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100"
//               value={weekRange.endWeek}
//               onChange={(e) =>
//                 setWeekRange({ ...weekRange, endWeek: e.target.value })
//               }
//             />
//           </div>
//         </div>
//       )}

//       {/* Monthly Range */}
//       {frequency === "monthly" && (
//         <div className="grid grid-cols-4 gap-4 mb-6">
//           {/* Start Year */}
//           <div>
//             <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
//               Start Year
//             </label>
//             <input
//               type="number"
//               className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100"
//               value={monthRange.startYear}
//               onChange={(e) =>
//                 setMonthRange({ ...monthRange, startYear: e.target.value })
//               }
//             />
//           </div>
//           {/* Start Month */}
//           <div>
//             <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
//               Start Month
//             </label>
//             <input
//               type="number"
//               min={1}
//               max={12}
//               className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100"
//               value={monthRange.startMonth}
//               onChange={(e) =>
//                 setMonthRange({ ...monthRange, startMonth: e.target.value })
//               }
//             />
//           </div>
//           {/* End Year */}
//           <div>
//             <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
//               End Year
//             </label>
//             <input
//               type="number"
//               className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100"
//               value={monthRange.endYear}
//               onChange={(e) =>
//                 setMonthRange({ ...monthRange, endYear: e.target.value })
//               }
//             />
//           </div>
//           {/* End Month */}
//           <div>
//             <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
//               End Month
//             </label>
//             <input
//               type="number"
//               min={1}
//               max={12}
//               className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100"
//               value={monthRange.endMonth}
//               onChange={(e) =>
//                 setMonthRange({ ...monthRange, endMonth: e.target.value })
//               }
//             />
//           </div>
//         </div>
//       )}

//       {/* Yearly Range */}
//       {frequency === "yearly" && (
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           {/* Start Year */}
//           <div>
//             <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
//               Start Year
//             </label>
//             <input
//               type="number"
//               className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100"
//               value={yearRange.startYear}
//               onChange={(e) =>
//                 setYearRange({ ...yearRange, startYear: e.target.value })
//               }
//             />
//           </div>
//           {/* End Year */}
//           <div>
//             <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
//               End Year
//             </label>
//             <input
//               type="number"
//               className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100"
//               value={yearRange.endYear}
//               onChange={(e) =>
//                 setYearRange({ ...yearRange, endYear: e.target.value })
//               }
//             />
//           </div>
//         </div>
//       )}

//       {/* Buttons and file upload */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Download */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg h-full">
//           <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800">
//             <div className="flex items-center space-x-2">
//               <Download className="text-blue-600 dark:text-blue-400" size={20} />
//               <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
//                 Download Past Ratings Template
//               </h3>
//             </div>
//           </div>
//           <div className="p-6">
//             <button
//               onClick={handleDownloadTemplate}
//               disabled={
//                 !employeeId ||
//                 (frequency === "daily" && (!dateRange.startDate || !dateRange.endDate)) ||
//                 (frequency === "weekly" &&
//                   (!weekRange.startYear ||
//                     !weekRange.startWeek ||
//                     !weekRange.endYear ||
//                     !weekRange.endWeek)) ||
//                 (frequency === "monthly" &&
//                   (!monthRange.startYear ||
//                     !monthRange.startMonth ||
//                     !monthRange.endYear ||
//                     !monthRange.endMonth)) ||
//                 (frequency === "yearly" && (!yearRange.startYear || !yearRange.endYear))
//               }
//               className={`w-full flex items-center justify-center py-3 px-6 rounded-lg text-white text-lg transition-all
//                 ${
//                   !employeeId ||
//                   (frequency === "daily" && (!dateRange.startDate || !dateRange.endDate)) ||
//                   (frequency === "weekly" &&
//                     (!weekRange.startYear ||
//                       !weekRange.startWeek ||
//                       !weekRange.endYear ||
//                       !weekRange.endWeek)) ||
//                   (frequency === "monthly" &&
//                     (!monthRange.startYear ||
//                       !monthRange.startMonth ||
//                       !monthRange.endYear ||
//                       !monthRange.endMonth)) ||
//                   (frequency === "yearly" && (!yearRange.startYear || !yearRange.endYear))
//                     ? "bg-gray-400 cursor-not-allowed opacity-70"
//                     : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//                 }
//               `}
//             >
//               <Download size={20} className="mr-2" />
//               Download Template
//             </button>
//           </div>
//         </div>

//         {/* Upload */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg h-full flex flex-col">
//           <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-800">
//             <div className="flex items-center space-x-2">
//               <Upload className="text-green-600 dark:text-green-400" size={20} />
//               <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
//                 Upload Filled Template
//               </h3>
//             </div>
//           </div>

//           <div className="p-6 flex flex-col flex-grow">
//             <div className="mb-4 flex-grow flex items-center justify-center">
//               <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center hover:border-blue-500 dark:hover:border-blue-500 transition-all w-full h-full flex flex-col items-center justify-center">
//                 <input
//                   type="file"
//                   id="file-upload"
//                   onChange={handleFileChange}
//                   accept=".xlsx, .xls"
//                   className="hidden"
//                 />
//                 <label
//                   htmlFor="file-upload"
//                   className="cursor-pointer flex flex-col items-center justify-center"
//                 >
//                   <div className="mb-4 h-20 w-20 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
//                     <ArrowUpCircle size={32} />
//                   </div>
//                   <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
//                     {file ? "Change File" : "Choose Excel File"}
//                   </p>
//                   <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
//                     {file ? fileName : "Click to browse your files"}
//                   </p>
//                   <p className="text-xs text-gray-500 dark:text-gray-400">
//                     Supported formats: .xlsx, .xls
//                   </p>
//                 </label>
//               </div>
//             </div>

//             <button
//               onClick={handleUpload}
//               disabled={!file}
//               className={`w-full flex items-center justify-center py-3 px-6 rounded-lg text-white text-lg transition-all
//                 ${
//                   !file
//                     ? "bg-gray-400 cursor-not-allowed opacity-70"
//                     : "bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 dark:from-green-500 dark:to-teal-500 dark:hover:from-green-600 dark:hover:to-teal-600 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//                 }
//               `}
//             >
//               <Upload size={20} className="mr-2" />
//               Upload Ratings
//             </button>
//           </div>
//         </div>
//       </div>

//       {errorCount > 0 && (
//         <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md border-l-4 border-red-500">
//           <h4 className="font-semibold mb-2">
//             Found {errorCount} error{errorCount > 1 ? "s" : ""} in your file:
//           </h4>
//           <ul className="list-disc list-inside space-y-1 max-h-48 overflow-auto">
//             {bulkErrors.map((err, idx) => (
//               <li key={idx}>
//                 Row {err.rowNumber}: {err.errors.join(", ")}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default BulkUploadPast;



// import React, { useState, useEffect, useMemo } from "react";
// import { toast } from "react-hot-toast";
// import useRatingStore from "../../store/useRatingNewStore"; 
// import {
//   FiCalendar as CalendarIcon,
//   FiDownload as Download,
//   FiUpload as Upload,
//   FiChevronDown as ChevronDown,
//   FiArrowUpCircle as ArrowUpCircle,
//   FiClock as Clock,
// } from "react-icons/fi";
// import { FaFileExcel as FileSpreadsheet } from "react-icons/fa";

// function BulkUploadPast() {
//   const {
//     generatePastRatingsTemplate,
//     uploadPastRatings,
//     fetchSubordinates,
//     subordinates: employees,
//     loading,
//     error,
//   } = useRatingStore();

//   // Defaults and state
//   const today = useMemo(() => new Date(), []);
//   const defaultDate = today.toISOString().split("T")[0];
//   const defaultYear = String(today.getFullYear());
//   const defaultMonth = String(today.getMonth() + 1).padStart(2, "0");

//   const [employeeId, setEmployeeId] = useState("");
//   const [frequency, setFrequency] = useState("daily");

//   const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
//   const [weekRange, setWeekRange] = useState({
//     startYear: "",
//     startWeek: "",
//     endYear: "",
//     endWeek: "",
//   });
//   const [monthRange, setMonthRange] = useState({
//     startYear: "",
//     startMonth: "",
//     endYear: "",
//     endMonth: "",
//   });
//   const [yearRange, setYearRange] = useState({ startYear: "", endYear: "" });

//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState("No file selected");

//   const [errorCount, setErrorCount] = useState(0);
//   const [bulkErrors, setBulkErrors] = useState([]);

//   useEffect(() => {
//     fetchSubordinates(); // Load all employees on mount
//   }, [fetchSubordinates]);

//   // Frequency change handler resets ranges and errors
//   const handleFrequencyChange = (e) => {
//     const freq = e.target.value;
//     setFrequency(freq);
//     setErrorCount(0);
//     setBulkErrors([]);
//     setDateRange({ startDate: "", endDate: "" });
//     setWeekRange({ startYear: "", startWeek: "", endYear: "", endWeek: "" });
//     setMonthRange({ startYear: "", startMonth: "", endYear: "", endMonth: "" });
//     setYearRange({ startYear: "", endYear: "" });
//   };

//   // Download template handler
//   const handleDownloadTemplate = async () => {
//     if (!employeeId) {
//       toast.error("Please select an employee");
//       return;
//     }

//     let params = { employeeId, frequency };

//     if (frequency === "daily") {
//       if (!dateRange.startDate || !dateRange.endDate) {
//         toast.error("Please select start and end date");
//         return;
//       }
//       params.startDate = dateRange.startDate;
//       params.endDate = dateRange.endDate;
//     } else if (frequency === "weekly") {
//       if (
//         !weekRange.startYear ||
//         !weekRange.startWeek ||
//         !weekRange.endYear ||
//         !weekRange.endWeek
//       ) {
//         toast.error("Please select start and end week/year");
//         return;
//       }
//       Object.assign(params, weekRange);
//     } else if (frequency === "monthly") {
//       if (
//         !monthRange.startYear ||
//         !monthRange.startMonth ||
//         !monthRange.endYear ||
//         !monthRange.endMonth
//       ) {
//         toast.error("Please select start and end month/year");
//         return;
//       }
//       Object.assign(params, monthRange);
//     } else if (frequency === "yearly") {
//       if (!yearRange.startYear || !yearRange.endYear) {
//         toast.error("Please select start and end year");
//         return;
//       }
//       Object.assign(params, yearRange);
//     }

//     try {
//       const res = await generatePastRatingsTemplate(params);
//       const blob = new Blob([res.data], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute(
//         "download",
//         `employee_${employeeId}_past_ratings_template.xlsx`
//       );
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       toast.success("Template downloaded successfully!");
//     } catch (err) {
//       toast.error(
//         err?.response?.data?.message || err.message || "Error downloading template"
//       );
//     }
//   };

//   // Upload handler
//   const handleUpload = async () => {
//     if (!file) {
//       toast.error("Please select an Excel file to upload");
//       return;
//     }

//     setErrorCount(0);
//     setBulkErrors([]);

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const res = await uploadPastRatings(formData);

//       if (res.errorCount && res.errorCount > 0) {
//         setErrorCount(res.errorCount);
//         setBulkErrors(res.errors);
//       }

//       toast.success(
//         `Past ratings uploaded. Inserted: ${res.newCount || 0}, Updated: ${
//           res.updatedCount || 0
//         }`
//       );

//       setFile(null);
//       setFileName("No file selected");
//     } catch (err) {
//       toast.error(
//         err?.response?.data?.message || err.message || "Error uploading file"
//       );
//     }
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       setFileName(selectedFile.name);
//     }
//   };

//   // Validation helper
//   const isFormValid = () => {
//     if (!employeeId) return false;
    
//     if (frequency === "daily") {
//       return dateRange.startDate && dateRange.endDate;
//     } else if (frequency === "weekly") {
//       return weekRange.startYear && weekRange.startWeek && weekRange.endYear && weekRange.endWeek;
//     } else if (frequency === "monthly") {
//       return monthRange.startYear && monthRange.startMonth && monthRange.endYear && monthRange.endMonth;
//     } else if (frequency === "yearly") {
//       return yearRange.startYear && yearRange.endYear;
//     }
//     return false;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl mb-8 overflow-hidden">
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 sm:p-8">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//               <div>
//                 <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
//                   Bulk Upload Past Ratings
//                 </h1>
//                 <p className="text-blue-100 text-base sm:text-lg">
//                   Generate templates and upload historical rating data for employees
//                 </p>
//               </div>
//               <div className="flex-shrink-0">
//                 <div className="h-16 w-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
//                   <FileSpreadsheet size={32} className="text-white" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Configuration Section */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-8 overflow-hidden">
//           <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
//             <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
//               <CalendarIcon className="text-blue-600 dark:text-blue-400" size={20} />
//               Configuration
//             </h2>
//           </div>
          
//           <div className="p-6 space-y-6">
//             {/* Employee and Frequency Selection */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Employee Select */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
//                   Select Employee *
//                 </label>
//                 {loading ? (
//                   <div className="flex items-center justify-center py-3 px-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
//                     <span className="ml-2 text-gray-600 dark:text-gray-400">Loading employees...</span>
//                   </div>
//                 ) : (
//                   <div className="relative">
//                     <select
//                       className="w-full appearance-none bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 pr-10 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       value={employeeId}
//                       onChange={(e) => setEmployeeId(e.target.value)}
//                     >
//                       <option value="">Choose an employee...</option>
//                       {employees?.map((emp) => (
//                         <option key={emp._id} value={emp._id}>
//                           {emp.first_Name} {emp.last_Name} ({emp.employee_Id})
//                         </option>
//                       ))}
//                     </select>
//                     <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
//                   </div>
//                 )}
//               </div>

//               {/* Frequency Select */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
//                   Rating Frequency *
//                 </label>
//                 <div className="relative">
//                   <select
//                     className="w-full appearance-none bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 pr-10 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     value={frequency}
//                     onChange={handleFrequencyChange}
//                   >
//                     <option value="daily">Daily Ratings</option>
//                     <option value="weekly">Weekly Ratings</option>
//                     <option value="monthly">Monthly Ratings</option>
//                     <option value="yearly">Yearly Ratings</option>
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
//                 </div>
//               </div>
//             </div>

//             {/* Date Range Inputs */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium text-gray-900 dark:text-white">
//                 Select {frequency.charAt(0).toUpperCase() + frequency.slice(1)} Range
//               </h3>

//               {/* Daily Range */}
//               {frequency === "daily" && (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       Start Date
//                     </label>
//                     <input
//                       type="date"
//                       className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       value={dateRange.startDate}
//                       onChange={(e) =>
//                         setDateRange({ ...dateRange, startDate: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       End Date
//                     </label>
//                     <input
//                       type="date"
//                       className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       value={dateRange.endDate}
//                       onChange={(e) =>
//                         setDateRange({ ...dateRange, endDate: e.target.value })
//                       }
//                     />
//                   </div>
//                 </div>
//               )}

//               {/* Weekly Range */}
//               {frequency === "weekly" && (
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       Start Year
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="e.g. 2024"
//                       className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       value={weekRange.startYear}
//                       onChange={(e) =>
//                         setWeekRange({ ...weekRange, startYear: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       Start Week
//                     </label>
//                     <input
//                       type="number"
//                       min={1}
//                       max={53}
//                       placeholder="1-53"
//                       className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       value={weekRange.startWeek}
//                       onChange={(e) =>
//                         setWeekRange({ ...weekRange, startWeek: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       End Year
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="e.g. 2024"
//                       className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       value={weekRange.endYear}
//                       onChange={(e) =>
//                         setWeekRange({ ...weekRange, endYear: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       End Week
//                     </label>
//                     <input
//                       type="number"
//                       min={1}
//                       max={53}
//                       placeholder="1-53"
//                       className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       value={weekRange.endWeek}
//                       onChange={(e) =>
//                         setWeekRange({ ...weekRange, endWeek: e.target.value })
//                       }
//                     />
//                   </div>
//                 </div>
//               )}

//               {/* Monthly Range */}
//               {frequency === "monthly" && (
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       Start Year
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="e.g. 2024"
//                       className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       value={monthRange.startYear}
//                       onChange={(e) =>
//                         setMonthRange({ ...monthRange, startYear: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       Start Month
//                     </label>
//                     <input
//                       type="number"
//                       min={1}
//                       max={12}
//                       placeholder="1-12"
//                       className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       value={monthRange.startMonth}
//                       onChange={(e) =>
//                         setMonthRange({ ...monthRange, startMonth: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       End Year
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="e.g. 2024"
//                       className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       value={monthRange.endYear}
//                       onChange={(e) =>
//                         setMonthRange({ ...monthRange, endYear: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       End Month
//                     </label>
//                     <input
//                       type="number"
//                       min={1}
//                       max={12}
//                       placeholder="1-12"
//                       className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       value={monthRange.endMonth}
//                       onChange={(e) =>
//                         setMonthRange({ ...monthRange, endMonth: e.target.value })
//                       }
//                     />
//                   </div>
//                 </div>
//               )}

//               {/* Yearly Range */}
//               {frequency === "yearly" && (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       Start Year
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="e.g. 2020"
//                       className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       value={yearRange.startYear}
//                       onChange={(e) =>
//                         setYearRange({ ...yearRange, startYear: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       End Year
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="e.g. 2024"
//                       className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       value={yearRange.endYear}
//                       onChange={(e) =>
//                         setYearRange({ ...yearRange, endYear: e.target.value })
//                       }
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Actions Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Download Template */}
//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
//             <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6">
//               <div className="flex items-center gap-3">
//                 <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center">
//                   <Download className="text-white" size={24} />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold text-white">Download Template</h3>
//                   <p className="text-blue-100">Get the Excel template to fill</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="p-6">
//               <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
//                 <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Steps:</h4>
//                 <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-decimal list-inside">
//                   <li>Configure employee and date range above</li>
//                   <li>Click to download the Excel template</li>
//                   <li>Fill in the rating data</li>
//                   <li>Upload the completed file</li>
//                 </ol>
//               </div>
              
//               <button
//                 onClick={handleDownloadTemplate}
//                 disabled={!isFormValid()}
//                 className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl text-lg font-semibold transition-all ${
//                   isFormValid()
//                     ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//                     : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
//                 }`}
//               >
//                 <Download size={20} />
//                 {isFormValid() ? "Download Template" : "Complete Configuration First"}
//               </button>
//             </div>
//           </div>

//           {/* Upload Section */}
//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
//             <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6">
//               <div className="flex items-center gap-3">
//                 <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center">
//                   <Upload className="text-white" size={24} />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold text-white">Upload Data</h3>
//                   <p className="text-green-100">Upload your completed template</p>
//                 </div>
//               </div>
//             </div>

//             <div className="p-6">
//               {/* File Upload Area */}
//               <div className="mb-6">
//                 <input
//                   type="file"
//                   id="file-upload"
//                   onChange={handleFileChange}
//                   accept=".xlsx, .xls"
//                   className="hidden"
//                 />
//                 <label
//                   htmlFor="file-upload"
//                   className={`block border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
//                     file 
//                       ? "border-green-400 bg-green-50 dark:bg-green-900/20" 
//                       : "border-gray-300 dark:border-gray-600 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
//                   }`}
//                 >
//                   <div className="flex flex-col items-center gap-4">
//                     <div className={`h-16 w-16 rounded-full flex items-center justify-center ${
//                       file 
//                         ? "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400" 
//                         : "bg-gray-100 dark:bg-gray-700 text-gray-400"
//                     }`}>
//                       <ArrowUpCircle size={32} />
//                     </div>
//                     <div>
//                       <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
//                         {file ? "File Selected" : "Choose Excel File"}
//                       </p>
//                       <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//                         {file ? fileName : "Click to browse or drag & drop"}
//                       </p>
//                       <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
//                         Supported: .xlsx, .xls
//                       </p>
//                     </div>
//                   </div>
//                 </label>
//               </div>

//               <button
//                 onClick={handleUpload}
//                 disabled={!file}
//                 className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl text-lg font-semibold transition-all ${
//                   file
//                     ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//                     : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
//                 }`}
//               >
//                 <Upload size={20} />
//                 {file ? "Upload Ratings" : "Select File First"}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Error Display */}
//         {errorCount > 0 && (
//           <div className="mt-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl overflow-hidden">
//             <div className="bg-red-100 dark:bg-red-900/40 px-6 py-4 border-b border-red-200 dark:border-red-800">
//               <h4 className="font-semibold text-red-900 dark:text-red-100 flex items-center gap-2">
//                 <span className="h-6 w-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
//                   !
//                 </span>
//                 Found {errorCount} error{errorCount > 1 ? "s" : ""} in your file
//               </h4>
//             </div>
//             <div className="p-6">
//               <div className="max-h-64 overflow-auto">
//                 <ul className="space-y-2">
//                   {bulkErrors.map((err, idx) => (
//                     <li key={idx} className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
//                       <span className="inline-flex items-center justify-center h-6 w-6 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-full text-sm font-medium flex-shrink-0">
//                         {err.rowNumber}
//                       </span>
//                       <span className="text-red-700 dark:text-red-300">
//                         {err.errors.join(", ")}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default BulkUploadPast;


import React, { useState, useEffect, useMemo, useRef } from "react";
import { toast } from "react-hot-toast";
import useRatingStore from "../../store/useRatingNewStore"; 
import {
  FiCalendar as CalendarIcon,
  FiDownload as Download,
  FiUpload as Upload,
  FiChevronDown as ChevronDown,
  FiArrowUpCircle as ArrowUpCircle,
} from "react-icons/fi";
import { FaFileExcel as FileSpreadsheet } from "react-icons/fa";

function BulkUploadPast() {
  const {
    generatePastRatingsTemplate,
    uploadPastRatings,
    fetchSubordinates,
    subordinates: employees,
    loading,
    error,
  } = useRatingStore();

  // Defaults and state
  const today = useMemo(() => new Date(), []);
  const defaultDate = today.toISOString().split("T")[0];
  const defaultYear = String(today.getFullYear());
  const defaultMonth = String(today.getMonth() + 1).padStart(2, "0");

  const [employeeId, setEmployeeId] = useState("");
  const [employeeInput, setEmployeeInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const [frequency, setFrequency] = useState("daily");

  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [weekRange, setWeekRange] = useState({
    startYear: "",
    startWeek: "",
    endYear: "",
    endWeek: "",
  });
  const [monthRange, setMonthRange] = useState({
    startYear: "",
    startMonth: "",
    endYear: "",
    endMonth: "",
  });
  const [yearRange, setYearRange] = useState({ startYear: "", endYear: "" });

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file selected");

  const [errorCount, setErrorCount] = useState(0);
  const [bulkErrors, setBulkErrors] = useState([]);

  const inputRef = useRef(null);

  useEffect(() => {
    fetchSubordinates(); // Load all employees on mount
  }, [fetchSubordinates]);

  // Close dropdown if clicking outside input
  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter employees based on input matching name or ID
  const filteredEmployees = employees?.filter((emp) => {
    const search = employeeInput.toLowerCase();
    return (
      emp.first_Name.toLowerCase().includes(search) ||
      emp.last_Name.toLowerCase().includes(search) ||
      emp.employee_Id.toLowerCase().includes(search)
    );
  }) || [];

  // When user types in employee input
  const handleEmployeeInputChange = (e) => {
    setEmployeeInput(e.target.value);
    setShowDropdown(true);
    setEmployeeId(""); // Clear selection while typing
  };

  // When user selects an employee from dropdown
  const handleSelectEmployee = (emp) => {
    setEmployeeId(emp._id);
    setEmployeeInput(`${emp.first_Name} ${emp.last_Name} (${emp.employee_Id})`);
    setShowDropdown(false);
  };

  // Frequency change handler resets ranges and errors
  const handleFrequencyChange = (e) => {
    const freq = e.target.value;
    setFrequency(freq);
    setErrorCount(0);
    setBulkErrors([]);
    setDateRange({ startDate: "", endDate: "" });
    setWeekRange({ startYear: "", startWeek: "", endYear: "", endWeek: "" });
    setMonthRange({ startYear: "", startMonth: "", endYear: "", endMonth: "" });
    setYearRange({ startYear: "", endYear: "" });
  };

  // Download template handler
  const handleDownloadTemplate = async () => {
    if (!employeeId) {
      toast.error("Please select an employee");
      return;
    }

    let params = { employeeId, frequency };

    if (frequency === "daily") {
      if (!dateRange.startDate || !dateRange.endDate) {
        toast.error("Please select start and end date");
        return;
      }
      params.startDate = dateRange.startDate;
      params.endDate = dateRange.endDate;
    } else if (frequency === "weekly") {
      if (
        !weekRange.startYear ||
        !weekRange.startWeek ||
        !weekRange.endYear ||
        !weekRange.endWeek
      ) {
        toast.error("Please select start and end week/year");
        return;
      }
      Object.assign(params, weekRange);
    } else if (frequency === "monthly") {
      if (
        !monthRange.startYear ||
        !monthRange.startMonth ||
        !monthRange.endYear ||
        !monthRange.endMonth
      ) {
        toast.error("Please select start and end month/year");
        return;
      }
      Object.assign(params, monthRange);
    } else if (frequency === "yearly") {
      if (!yearRange.startYear || !yearRange.endYear) {
        toast.error("Please select start and end year");
        return;
      }
      Object.assign(params, yearRange);
    }

    try {
      const res = await generatePastRatingsTemplate(params);
      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `employee_${employeeId}_past_ratings_template.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Template downloaded successfully!");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err.message || "Error downloading template"
      );
    }
  };

  // Upload handler
  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select an Excel file to upload");
      return;
    }

    setErrorCount(0);
    setBulkErrors([]);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await uploadPastRatings(formData);

      if (res.errorCount && res.errorCount > 0) {
        setErrorCount(res.errorCount);
        setBulkErrors(res.errors);
      }

      toast.success(
        `Past ratings uploaded. Inserted: ${res.newCount || 0}, Updated: ${
          res.updatedCount || 0
        }`
      );

      setFile(null);
      setFileName("No file selected");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err.message || "Error uploading file"
      );
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  // Validation helper
  const isFormValid = () => {
    if (!employeeId) return false;
    
    if (frequency === "daily") {
      return dateRange.startDate && dateRange.endDate;
    } else if (frequency === "weekly") {
      return weekRange.startYear && weekRange.startWeek && weekRange.endYear && weekRange.endWeek;
    } else if (frequency === "monthly") {
      return monthRange.startYear && monthRange.startMonth && monthRange.endYear && monthRange.endMonth;
    } else if (frequency === "yearly") {
      return yearRange.startYear && yearRange.endYear;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Bulk Upload Past Ratings
                </h1>
                <p className="text-blue-100 text-base sm:text-lg">
                  Generate templates and upload historical rating data for employees
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="h-16 w-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <FileSpreadsheet size={32} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-8 overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <CalendarIcon className="text-blue-600 dark:text-blue-400" size={20} />
              Configuration
            </h2>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Employee and Frequency Selection */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Employee Autocomplete Input */}
              <div className="space-y-2 relative" ref={inputRef}>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Select Employee *
                </label>
                {loading ? (
                  <div className="flex items-center justify-center py-3 px-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">Loading employees...</span>
                  </div>
                ) : (
                  <>
                    <input
                      type="text"
                      className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Type employee name or ID..."
                      value={employeeInput}
                      onChange={handleEmployeeInputChange}
                      onFocus={() => setShowDropdown(true)}
                      autoComplete="off"
                    />
                    <ChevronDown
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                      size={20}
                    />
                    {showDropdown && filteredEmployees.length > 0 && (
                      <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 shadow-lg">
                        {filteredEmployees.map((emp) => (
                          <li
                            key={emp._id}
                            onClick={() => handleSelectEmployee(emp)}
                            className="cursor-pointer px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-700"
                          >
                            {emp.first_Name} {emp.last_Name} ({emp.employee_Id})
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </div>

              {/* Frequency Select */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Rating Frequency *
                </label>
                <div className="relative">
                  <select
                    className="w-full appearance-none bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 pr-10 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={frequency}
                    onChange={handleFrequencyChange}
                  >
                    <option value="daily">Daily Ratings</option>
                    <option value="weekly">Weekly Ratings</option>
                    <option value="monthly">Monthly Ratings</option>
                    <option value="yearly">Yearly Ratings</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={20}
                  />
                </div>
              </div>
            </div>

            {/* Date Range Inputs */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Select {frequency.charAt(0).toUpperCase() + frequency.slice(1)} Range
              </h3>

              {/* Daily Range */}
              {frequency === "daily" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={dateRange.startDate}
                      onChange={(e) =>
                        setDateRange({ ...dateRange, startDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={dateRange.endDate}
                      onChange={(e) =>
                        setDateRange({ ...dateRange, endDate: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}

              {/* Weekly Range */}
              {frequency === "weekly" && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Start Year
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 2024"
                      className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={weekRange.startYear}
                      onChange={(e) =>
                        setWeekRange({ ...weekRange, startYear: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Start Week
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={53}
                      placeholder="1-53"
                      className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={weekRange.startWeek}
                      onChange={(e) =>
                        setWeekRange({ ...weekRange, startWeek: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      End Year
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 2024"
                      className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={weekRange.endYear}
                      onChange={(e) =>
                        setWeekRange({ ...weekRange, endYear: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      End Week
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={53}
                      placeholder="1-53"
                      className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={weekRange.endWeek}
                      onChange={(e) =>
                        setWeekRange({ ...weekRange, endWeek: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}

              {/* Monthly Range */}
              {frequency === "monthly" && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Start Year
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 2024"
                      className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={monthRange.startYear}
                      onChange={(e) =>
                        setMonthRange({ ...monthRange, startYear: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Start Month
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      placeholder="1-12"
                      className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={monthRange.startMonth}
                      onChange={(e) =>
                        setMonthRange({ ...monthRange, startMonth: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      End Year
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 2024"
                      className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={monthRange.endYear}
                      onChange={(e) =>
                        setMonthRange({ ...monthRange, endYear: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      End Month
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      placeholder="1-12"
                      className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={monthRange.endMonth}
                      onChange={(e) =>
                        setMonthRange({ ...monthRange, endMonth: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}

              {/* Yearly Range */}
              {frequency === "yearly" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Start Year
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 2020"
                      className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={yearRange.startYear}
                      onChange={(e) =>
                        setYearRange({ ...yearRange, startYear: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      End Year
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 2024"
                      className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={yearRange.endYear}
                      onChange={(e) =>
                        setYearRange({ ...yearRange, endYear: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Download Template */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Download className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Download Template</h3>
                  <p className="text-blue-100">Get the Excel template to fill</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Steps:</h4>
                <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-decimal list-inside">
                  <li>Configure employee and date range above</li>
                  <li>Click to download the Excel template</li>
                  <li>Fill in the rating data</li>
                  <li>Upload the completed file</li>
                </ol>
              </div>
              
              <button
                onClick={handleDownloadTemplate}
                disabled={!isFormValid()}
                className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl text-lg font-semibold transition-all ${
                  isFormValid()
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                }`}
              >
                <Download size={20} />
                {isFormValid() ? "Download Template" : "Complete Configuration First"}
              </button>
            </div>
          </div>

          {/* Upload Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Upload className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Upload Data</h3>
                  <p className="text-green-100">Upload your completed template</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* File Upload Area */}
              <div className="mb-6">
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileChange}
                  accept=".xlsx, .xls"
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className={`block border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                    file 
                      ? "border-green-400 bg-green-50 dark:bg-green-900/20" 
                      : "border-gray-300 dark:border-gray-600 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                  }`}
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className={`h-16 w-16 rounded-full flex items-center justify-center ${
                      file 
                        ? "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400" 
                        : "bg-gray-100 dark:bg-gray-700 text-gray-400"
                    }`}>
                      <ArrowUpCircle size={32} />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {file ? "File Selected" : "Choose Excel File"}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {file ? fileName : "Click to browse or drag & drop"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        Supported: .xlsx, .xls
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              <button
                onClick={handleUpload}
                disabled={!file}
                className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl text-lg font-semibold transition-all ${
                  file
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                }`}
              >
                <Upload size={20} />
                {file ? "Upload Ratings" : "Select File First"}
              </button>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {errorCount > 0 && (
          <div className="mt-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl overflow-hidden">
            <div className="bg-red-100 dark:bg-red-900/40 px-6 py-4 border-b border-red-200 dark:border-red-800">
              <h4 className="font-semibold text-red-900 dark:text-red-100 flex items-center gap-2">
                <span className="h-6 w-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  !
                </span>
                Found {errorCount} error{errorCount > 1 ? "s" : ""} in your file
              </h4>
            </div>
            <div className="p-6">
              <div className="max-h-64 overflow-auto">
                <ul className="space-y-2">
                  {bulkErrors.map((err, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <span className="inline-flex items-center justify-center h-6 w-6 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-full text-sm font-medium flex-shrink-0">
                        {err.rowNumber}
                      </span>
                      <span className="text-red-700 dark:text-red-300">
                        {err.errors.join(", ")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BulkUploadPast;
