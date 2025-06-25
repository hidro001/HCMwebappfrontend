// import React, { useState, useEffect, useMemo, useRef } from "react";
// import { toast } from "react-hot-toast";
// import useRatingStore from "../../store/useRatingNewStore";
// import {
//   FiCalendar as CalendarIcon,
//   FiDownload as Download,
//   FiUpload as Upload,
//   FiChevronDown as ChevronDown,
//   FiArrowUpCircle as ArrowUpCircle,
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
//   const [employeeInput, setEmployeeInput] = useState("");
//   const [showDropdown, setShowDropdown] = useState(false);

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

//   const inputRef = useRef(null);

//   useEffect(() => {
//     fetchSubordinates(); // Load all employees on mount
//   }, [fetchSubordinates]);

//   // Close dropdown if clicking outside input
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (inputRef.current && !inputRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Filter employees based on input matching name or ID
//   const filteredEmployees = employees?.filter((emp) => {
//     const search = employeeInput.toLowerCase();
//     return (
//       emp.first_Name.toLowerCase().includes(search) ||
//       emp.last_Name.toLowerCase().includes(search) ||
//       emp.employee_Id.toLowerCase().includes(search)
//     );
//   }) || [];

//   // When user types in employee input
//   const handleEmployeeInputChange = (e) => {
//     setEmployeeInput(e.target.value);
//     setShowDropdown(true);
//     setEmployeeId(""); // Clear selection while typing
//   };

//   // When user selects an employee from dropdown
//   const handleSelectEmployee = (emp) => {
//     setEmployeeId(emp._id);
//     setEmployeeInput(`${emp.first_Name} ${emp.last_Name} (${emp.employee_Id})`);
//     setShowDropdown(false);
//   };

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
//               {/* Employee Autocomplete Input */}
//               <div className="space-y-2 relative" ref={inputRef}>
//                 <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
//                   Select Employee *
//                 </label>
//                 {loading ? (
//                   <div className="flex items-center justify-center py-3 px-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
//                     <span className="ml-2 text-gray-600 dark:text-gray-400">Loading employees...</span>
//                   </div>
//                 ) : (
//                   <>
//                     <input
//                       type="text"
//                       className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       placeholder="Type employee name or ID..."
//                       value={employeeInput}
//                       onChange={handleEmployeeInputChange}
//                       onFocus={() => setShowDropdown(true)}
//                       autoComplete="off"
//                     />
//                     <ChevronDown
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
//                       size={20}
//                     />
//                     {showDropdown && filteredEmployees.length > 0 && (
//                       <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 shadow-lg">
//                         {filteredEmployees.map((emp) => (
//                           <li
//                             key={emp._id}
//                             onClick={() => handleSelectEmployee(emp)}
//                             className="cursor-pointer px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-700"
//                           >
//                             {emp.first_Name} {emp.last_Name} ({emp.employee_Id})
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </>
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
//                     {/* <option value="weekly">Weekly Ratings</option>
//                     <option value="monthly">Monthly Ratings</option>
//                     <option value="yearly">Yearly Ratings</option> */}
//                   </select>
//                   <ChevronDown
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
//                     size={20}
//                   />
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

// import React, { useState, useEffect, useMemo, useRef } from "react";
// import { toast } from "react-hot-toast";
// import { motion, AnimatePresence } from "framer-motion";
// import useRatingStore from "../../store/useRatingNewStore";
// import {
//   FiCalendar as CalendarIcon,
//   FiDownload as Download,
//   FiUpload as Upload,
//   FiChevronDown as ChevronDown,
//   FiArrowUpCircle as ArrowUpCircle,
//   FiCheckCircle,
//   FiAlertCircle,
//   FiUsers,
//   FiClock,
//   FiFileText
// } from "react-icons/fi";
// import {
//   FaFileExcel as FileSpreadsheet,
//   FaCloudUploadAlt,
//   FaCloudDownloadAlt,
//   FaUser,
//   FaCalendarAlt,
//   FaExclamationTriangle,
//   FaCheckCircle as FaCheck
// } from "react-icons/fa";
// import {
//   HiDocumentDownload,
//   HiCloudUpload,
//   HiUserGroup,
//   HiCalendar,
//   HiExclamationCircle,
//   HiCheckCircle
// } from "react-icons/hi";

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
//   const [employeeInput, setEmployeeInput] = useState("");
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);

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
//   const [isUploading, setIsUploading] = useState(false);
//   const [isDownloading, setIsDownloading] = useState(false);

//   const [errorCount, setErrorCount] = useState(0);
//   const [bulkErrors, setBulkErrors] = useState([]);

//   const inputRef = useRef(null);

//   useEffect(() => {
//     fetchSubordinates();
//   }, [fetchSubordinates]);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (inputRef.current && !inputRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const filteredEmployees = employees?.filter((emp) => {
//     const search = employeeInput.toLowerCase();
//     return (
//       emp.first_Name.toLowerCase().includes(search) ||
//       emp.last_Name.toLowerCase().includes(search) ||
//       emp.employee_Id.toLowerCase().includes(search)
//     );
//   }) || [];

//   const handleEmployeeInputChange = (e) => {
//     setEmployeeInput(e.target.value);
//     setShowDropdown(true);
//     setEmployeeId("");
//   };

//   const handleSelectEmployee = (emp) => {
//     setEmployeeId(emp._id);
//     setEmployeeInput(`${emp.first_Name} ${emp.last_Name} (${emp.employee_Id})`);
//     setShowDropdown(false);
//   };

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

//     setIsDownloading(true);
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
//       setCurrentStep(2);
//     } catch (err) {
//       toast.error(
//         err?.response?.data?.message || err.message || "Error downloading template"
//       );
//     } finally {
//       setIsDownloading(false);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       toast.error("Please select an Excel file to upload");
//       return;
//     }

//     setErrorCount(0);
//     setBulkErrors([]);
//     setIsUploading(true);

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const res = await uploadPastRatings(formData);

//       if (res.errorCount && res.errorCount > 0) {
//         setErrorCount(res.errorCount);
//         setBulkErrors(res.errors);
//       } else {
//         setCurrentStep(3);
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
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       setFileName(selectedFile.name);
//     }
//   };

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

//   const steps = [
//     { id: 1, name: "Configure", icon: HiUserGroup, completed: isFormValid() },
//     { id: 2, name: "Download", icon: HiDocumentDownload, completed: currentStep >= 2 },
//     { id: 3, name: "Upload", icon: HiCloudUpload, completed: currentStep >= 3 }
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.4 }
//     }
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, scale: 0.9 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: { duration: 0.3 }
//     },
//     hover: {
//       scale: 1.02,
//       y: -5,
//       boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
//       transition: { duration: 0.2 }
//     }
//   };

//   return (
//     <motion.div
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//       className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 lg:p-8"
//     >
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Header Section */}
//         <motion.div
//           variants={itemVariants}
//           className="text-center space-y-4"
//         >
//           <div className="flex items-center justify-center space-x-3">
//             <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
//               <FileSpreadsheet className="text-blue-600 dark:text-blue-400 text-2xl" />
//             </div>
//             <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
//               Bulk Upload Past Ratings
//             </h1>
//           </div>
//           <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
//             Generate templates and upload historical rating data for employees efficiently
//           </p>
//         </motion.div>

//         {/* Progress Steps */}
//         <motion.div
//           variants={itemVariants}
//           className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
//         >
//           <div className="flex items-center justify-between">
//             {steps.map((step, index) => (
//               <div key={step.id} className="flex items-center">
//                 <div className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
//                   step.completed
//                     ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
//                     : currentStep === step.id
//                     ? "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
//                     : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
//                 }`}>
//                   <step.icon className="text-lg" />
//                   <span className="font-medium">{step.name}</span>
//                   {step.completed && <HiCheckCircle className="text-lg" />}
//                 </div>
//                 {index < steps.length - 1 && (
//                   <div className="w-12 h-px bg-gray-300 dark:bg-gray-600 mx-4" />
//                 )}
//               </div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Configuration Section */}
//         <motion.div
//           variants={itemVariants}
//           className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
//         >
//           <div className="bg-blue-50 dark:bg-blue-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
//             <div className="flex items-center space-x-3">
//               <HiUserGroup className="text-blue-600 dark:text-blue-400 text-2xl" />
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//                   Step 1: Configuration
//                 </h2>
//                 <p className="text-gray-600 dark:text-gray-400">
//                   Select employee and configure the rating parameters
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="p-6 space-y-6">
//             {/* Employee and Frequency Selection */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Employee Autocomplete Input */}
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.1 }}
//                 className="space-y-2 relative"
//                 ref={inputRef}
//               >
//                 <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
//                   <div className="p-1.5 bg-blue-100 dark:bg-blue-900/20 rounded-md">
//                     <FaUser className="text-blue-600 dark:text-blue-400 text-sm" />
//                   </div>
//                   <span>Select Employee</span>
//                   <span className="text-red-500">*</span>
//                 </label>
//                 {loading ? (
//                   <div className="flex items-center justify-center py-4 px-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-300 dark:border-gray-600">
//                     <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
//                     <span className="ml-3 text-gray-600 dark:text-gray-400">Loading employees...</span>
//                   </div>
//                 ) : (
//                   <>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                         placeholder="Type employee name or ID..."
//                         value={employeeInput}
//                         onChange={handleEmployeeInputChange}
//                         onFocus={() => setShowDropdown(true)}
//                         autoComplete="off"
//                       />
//                       <ChevronDown
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
//                         size={20}
//                       />
//                     </div>
//                     <AnimatePresence>
//                       {showDropdown && filteredEmployees.length > 0 && (
//                         <motion.div
//                           initial={{ opacity: 0, y: -10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0, y: -10 }}
//                           transition={{ duration: 0.2 }}
//                           className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-xl"
//                         >
//                           {filteredEmployees.map((emp) => (
//                             <motion.div
//                               key={emp._id}
//                               whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
//                               onClick={() => handleSelectEmployee(emp)}
//                               className="cursor-pointer px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
//                             >
//                               <div className="flex items-center space-x-3">
//                                 <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
//                                   <FaUser className="text-blue-600 dark:text-blue-400 text-sm" />
//                                 </div>
//                                 <div>
//                                   <p className="font-medium text-gray-900 dark:text-white">
//                                     {emp.first_Name} {emp.last_Name}
//                                   </p>
//                                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                                     ID: {emp.employee_Id}
//                                   </p>
//                                 </div>
//                               </div>
//                             </motion.div>
//                           ))}
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </>
//                 )}
//               </motion.div>

//               {/* Frequency Select */}
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="space-y-2"
//               >
//                 <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
//                   <div className="p-1.5 bg-green-100 dark:bg-green-900/20 rounded-md">
//                     <FiClock className="text-green-600 dark:text-green-400 text-sm" />
//                   </div>
//                   <span>Rating Frequency</span>
//                   <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <select
//                     className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 appearance-none"
//                     value={frequency}
//                     onChange={handleFrequencyChange}
//                   >
//                     <option value="daily">Daily Ratings</option>
//                     {/* <option value="weekly">Weekly Ratings</option>
//                     <option value="monthly">Monthly Ratings</option>
//                     <option value="yearly">Yearly Ratings</option> */}
//                   </select>
//                   <ChevronDown
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
//                     size={20}
//                   />
//                 </div>
//               </motion.div>
//             </div>

//             {/* Date Range Inputs */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//               className="space-y-4"
//             >
//               <div className="flex items-center space-x-2">
//                 <HiCalendar className="text-purple-600 dark:text-purple-400 text-xl" />
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                   Select {frequency.charAt(0).toUpperCase() + frequency.slice(1)} Range
//                 </h3>
//               </div>

//               {/* Daily Range */}
//               {frequency === "daily" && (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       Start Date
//                     </label>
//                     <input
//                       type="date"
//                       className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
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
//                       className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
//                       value={dateRange.endDate}
//                       onChange={(e) =>
//                         setDateRange({ ...dateRange, endDate: e.target.value })
//                       }
//                     />
//                   </div>
//                 </div>
//               )}

//               {/* Other frequency ranges remain the same but with updated styling */}
//               {frequency === "weekly" && (
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       Start Year
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="e.g. 2024"
//                       className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
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
//                       className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
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
//                       className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
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
//                       className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
//                       value={weekRange.endWeek}
//                       onChange={(e) =>
//                         setWeekRange({ ...weekRange, endWeek: e.target.value })
//                       }
//                     />
//                   </div>
//                 </div>
//               )}

//               {frequency === "monthly" && (
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       Start Year
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="e.g. 2024"
//                       className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
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
//                       className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
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
//                       className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
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
//                       className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
//                       value={monthRange.endMonth}
//                       onChange={(e) =>
//                         setMonthRange({ ...monthRange, endMonth: e.target.value })
//                       }
//                     />
//                   </div>
//                 </div>
//               )}

//               {frequency === "yearly" && (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       Start Year
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="e.g. 2020"
//                       className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
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
//                       className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
//                       value={yearRange.endYear}
//                       onChange={(e) =>
//                         setYearRange({ ...yearRange, endYear: e.target.value })
//                       }
//                     />
//                   </div>
//                 </div>
//               )}
//             </motion.div>
//           </div>
//         </motion.div>

//         {/* Actions Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Download Template */}
//           <motion.div
//             variants={cardVariants}
//             initial="hidden"
//             animate="visible"
//             whileHover="hover"
//             className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
//           >
//             <div className="bg-blue-50 dark:bg-blue-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
//               <div className="flex items-center space-x-3">
//                 <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
//                   <HiDocumentDownload className="text-blue-600 dark:text-blue-400 text-xl" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900 dark:text-white">
//                     Step 2: Download Template
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-400">
//                     Get the Excel template to fill with ratings
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="p-6">
//               <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-200 dark:border-blue-800">
//                 <div className="flex items-start space-x-3">
//                   <FiFileText className="text-blue-600 dark:text-blue-400 text-lg mt-0.5" />
//                   <div>
//                     <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Instructions:</h4>
//                     <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-decimal list-inside">
//                       <li>Complete the configuration above</li>
//                       <li>Download the Excel template</li>
//                       <li>Fill in the rating data carefully</li>
//                       <li>Upload the completed file</li>
//                     </ol>
//                   </div>
//                 </div>
//               </div>

//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={handleDownloadTemplate}
//                 disabled={!isFormValid() || isDownloading}
//                 className={`w-full flex items-center justify-center space-x-3 py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-200 ${
//                   isFormValid() && !isDownloading
//                     ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
//                     : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
//                 }`}
//               >
//                 {isDownloading ? (
//                   <>
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     <span>Downloading...</span>
//                   </>
//                 ) : (
//                   <>
//                     <HiDocumentDownload size={20} />
//                     <span>{isFormValid() ? "Download Template" : "Complete Configuration First"}</span>
//                   </>
//                 )}
//               </motion.button>
//             </div>
//           </motion.div>

//           {/* Upload Section */}
//           <motion.div
//             variants={cardVariants}
//             initial="hidden"
//             animate="visible"
//             whileHover="hover"
//             className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
//           >
//             <div className="bg-green-50 dark:bg-green-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
//               <div className="flex items-center space-x-3">
//                 <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl">
//                   <HiCloudUpload className="text-green-600 dark:text-green-400 text-xl" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900 dark:text-white">
//                     Step 3: Upload Data
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-400">
//                     Upload your completed template
//                   </p>
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
//                 <motion.label
//                   whileHover={{ scale: 1.01 }}
//                   htmlFor="file-upload"
//                   className={`block border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
//                     file
//                       ? "border-green-400 bg-green-50 dark:bg-green-900/20 dark:border-green-500"
//                       : "border-gray-300 dark:border-gray-600 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
//                   }`}
//                 >
//                   <div className="flex flex-col items-center space-y-4">
//                     <div className={`p-4 rounded-full transition-colors duration-200 ${
//                       file
//                         ? "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400"
//                         : "bg-gray-100 dark:bg-gray-700 text-gray-400"
//                     }`}>
//                       <ArrowUpCircle size={32} />
//                     </div>
//                     <div>
//                       <p className="text-lg font-semibold text-gray-900 dark:text-white">
//                         {file ? "File Selected" : "Choose Excel File"}
//                       </p>
//                       <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//                         {file ? fileName : "Click to browse or drag & drop"}
//                       </p>
//                       <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
//                         Supported formats: .xlsx, .xls
//                       </p>
//                     </div>
//                   </div>
//                 </motion.label>
//               </div>

//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={handleUpload}
//                 disabled={!file || isUploading}
//                 className={`w-full flex items-center justify-center space-x-3 py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-200 ${
//                   file && !isUploading
//                     ? "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl"
//                     : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
//                 }`}
//               >
//                 {isUploading ? (
//                   <>
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     <span>Uploading...</span>
//                   </>
//                 ) : (
//                   <>
//                     <HiCloudUpload size={20} />
//                     <span>{file ? "Upload Ratings" : "Select File First"}</span>
//                   </>
//                 )}
//               </motion.button>
//             </div>
//           </motion.div>
//         </div>

//         {/* Error Display */}
//         <AnimatePresence>
//           {errorCount > 0 && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl overflow-hidden"
//             >
//               <div className="bg-red-100 dark:bg-red-900/40 px-6 py-4 border-b border-red-200 dark:border-red-800">
//                 <div className="flex items-center space-x-3">
//                   <div className="p-2 bg-red-500 text-white rounded-full">
//                     <HiExclamationCircle className="text-lg" />
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-red-900 dark:text-red-100">
//                       Upload Errors Found
//                     </h4>
//                     <p className="text-sm text-red-700 dark:text-red-300">
//                       Found {errorCount} error{errorCount > 1 ? "s" : ""} in your file that need to be fixed
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <div className="max-h-64 overflow-auto space-y-3">
//                   {bulkErrors.map((err, idx) => (
//                     <motion.div
//                       key={idx}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: idx * 0.05 }}
//                       className="flex items-start space-x-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-red-200 dark:border-red-700"
//                     >
//                       <div className="flex-shrink-0 w-8 h-8 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center text-sm font-medium">
//                         {err.rowNumber}
//                       </div>
//                       <div>
//                         <p className="font-medium text-red-900 dark:text-red-100">
//                           Row {err.rowNumber}
//                         </p>
//                         <p className="text-sm text-red-700 dark:text-red-300">
//                           {err.errors.join(", ")}
//                         </p>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Success Message */}
//         <AnimatePresence>
//           {currentStep >= 3 && errorCount === 0 && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6"
//             >
//               <div className="flex items-center space-x-3">
//                 <div className="p-2 bg-green-500 text-white rounded-full">
//                   <FaCheck className="text-lg" />
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-green-900 dark:text-green-100">
//                     Upload Completed Successfully!
//                   </h4>
//                   <p className="text-sm text-green-700 dark:text-green-300">
//                     All rating data has been processed and uploaded to the system.
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </motion.div>
//   );
// }

// export default BulkUploadPast;

import React, { useState, useEffect, useMemo, useRef } from "react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import useRatingStore from "../../store/useRatingNewStore";
import {
  FiCalendar as CalendarIcon,
  FiDownload as Download,
  FiUpload as Upload,
  FiChevronDown as ChevronDown,
  FiArrowUpCircle as ArrowUpCircle,
  FiCheckCircle,
  FiAlertCircle,
  FiUsers,
  FiClock,
  FiFileText,
} from "react-icons/fi";
import {
  FaFileExcel as FileSpreadsheet,
  FaCloudUploadAlt,
  FaCloudDownloadAlt,
  FaUser,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaCheckCircle as FaCheck,
} from "react-icons/fa";
import {
  HiDocumentDownload,
  HiCloudUpload,
  HiUserGroup,
  HiCalendar,
  HiExclamationCircle,
  HiCheckCircle,
} from "react-icons/hi";

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
  const [currentStep, setCurrentStep] = useState(1);

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
  const [isUploading, setIsUploading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const [errorCount, setErrorCount] = useState(0);
  const [bulkErrors, setBulkErrors] = useState([]);

  const inputRef = useRef(null);

  useEffect(() => {
    fetchSubordinates();
  }, [fetchSubordinates]);

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

  const filteredEmployees =
    employees?.filter((emp) => {
      const search = employeeInput.toLowerCase();
      return (
        emp.first_Name.toLowerCase().includes(search) ||
        emp.last_Name.toLowerCase().includes(search) ||
        emp.employee_Id.toLowerCase().includes(search)
      );
    }) || [];

  const handleEmployeeInputChange = (e) => {
    setEmployeeInput(e.target.value);
    setShowDropdown(true);
    setEmployeeId("");
  };

  const handleSelectEmployee = (emp) => {
    setEmployeeId(emp._id);
    setEmployeeInput(`${emp.first_Name} ${emp.last_Name} (${emp.employee_Id})`);
    setShowDropdown(false);
  };

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

    setIsDownloading(true);
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
      setCurrentStep(2);
    } catch (err) {
      // err.response.data is now always a Blob
      let msg = "Error downloading template";
      if (err.response?.data instanceof Blob) {
        try {
          const text = await err.response.data.text();
          const json = JSON.parse(text);
          msg = json.message || msg;
        } catch {
          /* ignore parse errors */
        }
      } else if (err.message) {
        msg = err.message;
      }
      toast.error(msg);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select an Excel file to upload");
      return;
    }

    setErrorCount(0);
    setBulkErrors([]);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await uploadPastRatings(formData);

      if (res.errorCount && res.errorCount > 0) {
        setErrorCount(res.errorCount);
        setBulkErrors(res.errors);
      } else {
        setCurrentStep(3);
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
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const isFormValid = () => {
    if (!employeeId) return false;

    if (frequency === "daily") {
      return dateRange.startDate && dateRange.endDate;
    } else if (frequency === "weekly") {
      return (
        weekRange.startYear &&
        weekRange.startWeek &&
        weekRange.endYear &&
        weekRange.endWeek
      );
    } else if (frequency === "monthly") {
      return (
        monthRange.startYear &&
        monthRange.startMonth &&
        monthRange.endYear &&
        monthRange.endMonth
      );
    } else if (frequency === "yearly") {
      return yearRange.startYear && yearRange.endYear;
    }
    return false;
  };

  const steps = [
    { id: 1, name: "Configure", icon: HiUserGroup, completed: isFormValid() },
    { id: 2, name: "Upload", icon: HiCloudUpload, completed: currentStep >= 3 },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    hover: {
      scale: 1.02,
      y: -5,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 lg:p-8"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
              <FileSpreadsheet className="text-blue-600 dark:text-blue-400 text-2xl" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Bulk Upload Past Ratings
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Generate templates and upload historical rating data for employees
            efficiently
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between max-w-md mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                    step.completed
                      ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                      : currentStep === step.id
                      ? "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  <step.icon className="text-lg" />
                  <span className="font-medium">{step.name}</span>
                  {step.completed && <HiCheckCircle className="text-lg" />}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-12 h-px bg-gray-300 dark:bg-gray-600 mx-4" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Configuration Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="bg-blue-50 dark:bg-blue-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <HiUserGroup className="text-blue-600 dark:text-blue-400 text-2xl" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Configuration & Template
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Configure parameters and download Excel template
                  </p>
                </div>
              </div>

              {/* Compact Download Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadTemplate}
                disabled={!isFormValid() || isDownloading}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  isFormValid() && !isDownloading
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
                    : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                }`}
              >
                {isDownloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="hidden sm:inline">Downloading...</span>
                  </>
                ) : (
                  <>
                    <HiDocumentDownload className="text-lg" />
                    <span className="hidden sm:inline">Download Template</span>
                    <span className="sm:hidden">Download</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Employee and Frequency Selection */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Employee Autocomplete Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-2 relative"
                ref={inputRef}
              >
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <div className="p-1.5 bg-blue-100 dark:bg-blue-900/20 rounded-md">
                    <FaUser className="text-blue-600 dark:text-blue-400 text-sm" />
                  </div>
                  <span>Select Employee</span>
                  <span className="text-red-500">*</span>
                </label>
                {loading ? (
                  <div className="flex items-center justify-center py-4 px-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-300 dark:border-gray-600">
                    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <span className="ml-3 text-gray-600 dark:text-gray-400">
                      Loading employees...
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                    </div>
                    <AnimatePresence>
                      {showDropdown && filteredEmployees.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-xl"
                        >
                          {filteredEmployees.map((emp) => (
                            <motion.div
                              key={emp._id}
                              whileHover={{
                                backgroundColor: "rgba(59, 130, 246, 0.1)",
                              }}
                              onClick={() => handleSelectEmployee(emp)}
                              className="cursor-pointer px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                                  <FaUser className="text-blue-600 dark:text-blue-400 text-sm" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900 dark:text-white">
                                    {emp.first_Name} {emp.last_Name}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    ID: {emp.employee_Id}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Designation: {emp.designation}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Department: {emp.department}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </motion.div>

              {/* Frequency Select */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <div className="p-1.5 bg-green-100 dark:bg-green-900/20 rounded-md">
                    <FiClock className="text-green-600 dark:text-green-400 text-sm" />
                  </div>
                  <span>Rating Frequency</span>
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 appearance-none"
                    value={frequency}
                    onChange={handleFrequencyChange}
                  >
                    <option value="daily">Daily Ratings</option>
                    {/* <option value="weekly">Weekly Ratings</option>
                    <option value="monthly">Monthly Ratings</option>
                    <option value="yearly">Yearly Ratings</option> */}
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={20}
                  />
                </div>
              </motion.div>
            </div>

            {/* Date Range Inputs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2">
                <HiCalendar className="text-purple-600 dark:text-purple-400 text-xl" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Select{" "}
                  {frequency.charAt(0).toUpperCase() + frequency.slice(1)} Range
                </h3>
              </div>

              {/* Daily Range */}
              {frequency === "daily" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      value={dateRange.startDate}
                      onChange={(e) =>
                        setDateRange({
                          ...dateRange,
                          startDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      value={dateRange.endDate}
                      onChange={(e) =>
                        setDateRange({ ...dateRange, endDate: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}

              {/* Other frequency ranges remain the same but with updated styling */}
              {frequency === "weekly" && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Start Year
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 2024"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      value={weekRange.startYear}
                      onChange={(e) =>
                        setWeekRange({
                          ...weekRange,
                          startYear: e.target.value,
                        })
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
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      value={weekRange.startWeek}
                      onChange={(e) =>
                        setWeekRange({
                          ...weekRange,
                          startWeek: e.target.value,
                        })
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
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
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
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      value={weekRange.endWeek}
                      onChange={(e) =>
                        setWeekRange({ ...weekRange, endWeek: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}

              {frequency === "monthly" && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Start Year
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 2024"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      value={monthRange.startYear}
                      onChange={(e) =>
                        setMonthRange({
                          ...monthRange,
                          startYear: e.target.value,
                        })
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
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      value={monthRange.startMonth}
                      onChange={(e) =>
                        setMonthRange({
                          ...monthRange,
                          startMonth: e.target.value,
                        })
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
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      value={monthRange.endYear}
                      onChange={(e) =>
                        setMonthRange({
                          ...monthRange,
                          endYear: e.target.value,
                        })
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
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      value={monthRange.endMonth}
                      onChange={(e) =>
                        setMonthRange({
                          ...monthRange,
                          endMonth: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              )}

              {frequency === "yearly" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Start Year
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 2020"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      value={yearRange.startYear}
                      onChange={(e) =>
                        setYearRange({
                          ...yearRange,
                          startYear: e.target.value,
                        })
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
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      value={yearRange.endYear}
                      onChange={(e) =>
                        setYearRange({ ...yearRange, endYear: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}
            </motion.div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-200 dark:border-blue-800"
            >
              <div className="flex items-start space-x-3">
                <FiFileText className="text-blue-600 dark:text-blue-400 text-lg mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                    Next Steps:
                  </h4>
                  <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-decimal list-inside">
                    <li>Complete the configuration above</li>
                    <li>Click "Download Template" to get the Excel file</li>
                    <li>Fill in the rating data carefully</li>
                    <li>Upload the completed file below</li>
                  </ol>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="bg-green-50 dark:bg-green-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl">
                <HiCloudUpload className="text-green-600 dark:text-green-400 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Upload Completed Template
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Upload your Excel file with rating data
                </p>
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
              <motion.label
                whileHover={{ scale: 1.01 }}
                htmlFor="file-upload"
                className={`block border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                  file
                    ? "border-green-400 bg-green-50 dark:bg-green-900/20 dark:border-green-500"
                    : "border-gray-300 dark:border-gray-600 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                }`}
              >
                <div className="flex flex-col items-center space-y-4">
                  <div
                    className={`p-4 rounded-full transition-colors duration-200 ${
                      file
                        ? "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-400"
                    }`}
                  >
                    <ArrowUpCircle size={32} />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {file ? "File Selected" : "Choose Excel File"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {file ? fileName : "Click to browse or drag & drop"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      Supported formats: .xlsx, .xls
                    </p>
                  </div>
                </div>
              </motion.label>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleUpload}
              disabled={!file || isUploading}
              className={`w-full flex items-center justify-center space-x-3 py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-200 ${
                file && !isUploading
                  ? "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              }`}
            >
              {isUploading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <HiCloudUpload size={20} />
                  <span>{file ? "Upload Ratings" : "Select File First"}</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Error Display */}
        <AnimatePresence>
          {errorCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl overflow-hidden"
            >
              <div className="bg-red-100 dark:bg-red-900/40 px-6 py-4 border-b border-red-200 dark:border-red-800">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-500 text-white rounded-full">
                    <HiExclamationCircle className="text-lg" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-900 dark:text-red-100">
                      Upload Errors Found
                    </h4>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      Found {errorCount} error{errorCount > 1 ? "s" : ""} in
                      your file that need to be fixed
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="max-h-64 overflow-auto space-y-3">
                  {bulkErrors.map((err, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start space-x-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-red-200 dark:border-red-700"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center text-sm font-medium">
                        {err.rowNumber}
                      </div>
                      <div>
                        <p className="font-medium text-red-900 dark:text-red-100">
                          Row {err.rowNumber}
                        </p>
                        <p className="text-sm text-red-700 dark:text-red-300">
                          {err.errors.join(", ")}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Message */}
        <AnimatePresence>
          {currentStep >= 3 && errorCount === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500 text-white rounded-full">
                  <FaCheck className="text-lg" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-900 dark:text-green-100">
                    Upload Completed Successfully!
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    All rating data has been processed and uploaded to the
                    system.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default BulkUploadPast;
