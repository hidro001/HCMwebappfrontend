

// import React, { useState, useEffect } from "react";
// import { toast } from "react-hot-toast";
// import useRatingStore from "../../../store/useRatingNewStore";
// import useDepartmentStore from "../../../store/departmentStore";
// import useDesignationStore from "../../../store/designationStore";
// import { getWeeksInMonth } from "./calendarUtils";
// import { CiUser } from "react-icons/ci";
// import { 
//   MdOutlineDateRange, 
//   MdWorkOutline,
//   MdOutlineAutoGraph,
//   MdOutlineKeyboardArrowRight
// } from "react-icons/md";
// import { 
//   BsCalendar3Week, 
//   BsCalendar2Month, 
//   BsCalendar2Range,
//   BsStars,
//   BsBuilding,
//   BsPerson,
//   BsCalendarDate,
//   BsChevronRight
// } from "react-icons/bs";
// import { FiFilter, FiSearch, FiAward, FiUser } from "react-icons/fi";
// import { HiOutlineSparkles } from "react-icons/hi";

// const FREQUENCIES = [
//   { value: "daily",   label: "Daily",   icon: <MdOutlineDateRange className="text-xl" /> },
//   { value: "weekly",  label: "Weekly",  icon: <BsCalendar3Week className="text-xl" /> },
//   { value: "monthly", label: "Monthly", icon: <BsCalendar2Month className="text-xl" /> },
//   { value: "yearly",  label: "Yearly",  icon: <BsCalendar2Range className="text-xl" /> },
// ];

// const MONTHS = [
//   "January","February","March","April","May","June",
//   "July","August","September","October","November","December",
// ];

// export default function TopPerformerCard() {
//   const { getOrganizationTopPerformer, getDesignationTopPerformer, loading, error } = useRatingStore();
//   const { departments, fetchDepartments } = useDepartmentStore();
//   const { designations, fetchDesignations } = useDesignationStore();

//   useEffect(() => {
//     fetchDepartments();
//     fetchDesignations();
//   }, [fetchDepartments, fetchDesignations]);

//   // Tab: "org" or "desig"
//   const [tab, setTab] = useState("org");
//   // Org-only filters
//   const [department, setDepartment] = useState("");
//   const [designation, setDesignation] = useState("");
//   // Show/hide filters
//   const [showFilters, setShowFilters] = useState(true);

//   // Date filters
//   const [frequency, setFrequency] = useState("daily");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [startYear, setStartYear] = useState("");
//   const [endYear, setEndYear] = useState("");
//   const [startMonth, setStartMonth] = useState("");
//   const [endMonth, setEndMonth] = useState("");
//   const [startWeek, setStartWeek] = useState("");
//   const [endWeek, setEndWeek] = useState("");
//   const [startWeeks, setStartWeeks] = useState([]);
//   const [endWeeks, setEndWeeks] = useState([]);

//   // Results
//   const [orgPerformer, setOrgPerformer] = useState(null);
//   const [desigPerformer, setDesigPerformer] = useState(null);

//   // Reset date fields when frequency changes
//   useEffect(() => {
//     const today = new Date(),
//           iso = today.toISOString().split("T")[0],
//           y = today.getFullYear(),
//           m = today.getMonth() + 1;

//     setStartDate(frequency === "daily" ? iso : "");
//     setEndDate(frequency === "daily" ? iso : "");
//     setStartYear(frequency !== "daily" ? String(y) : "");
//     setEndYear(frequency !== "daily" ? String(y) : "");
//     setStartMonth(
//       frequency === "weekly" || frequency === "monthly"
//         ? String(m).padStart(2, "0")
//         : ""
//     );
//     setEndMonth(
//       frequency === "weekly" || frequency === "monthly"
//         ? String(m).padStart(2, "0")
//         : ""
//     );
//     setStartWeek(""); setEndWeek("");
//     setStartWeeks([]); setEndWeeks([]);
//   }, [frequency]);

//   // Weekly → populate startWeeks
//   useEffect(() => {
//     if (frequency !== "weekly") return;
//     if (startYear && startMonth) {
//       const weeks = getWeeksInMonth(Number(startYear), Number(startMonth) - 1);
//       setStartWeeks(weeks);
//       if (!startWeek && weeks.length) setStartWeek(weeks[0].value);
//     }
//   }, [frequency, startYear, startMonth, startWeek]);

//   // Weekly → populate endWeeks
//   useEffect(() => {
//     if (frequency !== "weekly") return;
//     if (endYear && endMonth) {
//       const weeks = getWeeksInMonth(Number(endYear), Number(endMonth) - 1);
//       setEndWeeks(weeks);
//       if (!endWeek && weeks.length) setEndWeek(weeks[0].value);
//     }
//   }, [frequency, endYear, endMonth, endWeek]);

//   const handleFetch = async () => {
//     const params = { frequency };

//     // Org-only filters
//     if (tab === "org") {
//       if (department) params.department = department;
//       if (designation) params.designation = designation;
//     }

//     // Build date params
//     if (frequency === "daily") {
//       if (!startDate || !endDate) return toast.error("Pick both start and end date");
//       params.startDate = startDate;
//       params.endDate = endDate;
//     } else if (frequency === "weekly") {
//       if (!(startYear && endYear && startMonth && endMonth && startWeek && endWeek)) {
//         return toast.error("Complete your week range");
//       }
//       Object.assign(params, { startYear, endYear, startMonth, endMonth, startWeek, endWeek });
//     } else if (frequency === "monthly") {
//       if (!(startYear && endYear && startMonth && endMonth)) {
//         return toast.error("Pick your month range");
//       }
//       Object.assign(params, { startYear, endYear, startMonth, endMonth });
//     } else if (frequency === "yearly") {
//       if (!(startYear && endYear)) {
//         return toast.error("Pick your year range");
//       }
//       Object.assign(params, { startYear, endYear });
//     }

//     try {
//       const res = tab === "org"
//         ? await getOrganizationTopPerformer(params)
//         : await getDesignationTopPerformer(params);

//       if (res.success && res.data) {
//         if (tab === "org") setOrgPerformer(res.data);
//         else setDesigPerformer(res.data);
//       } else {
//         toast.error(res.message || "No data found");
//       }
//     } catch (err) {
//       toast.error(err.message || "Fetch error");
//     }
//   };

//   // Pick the right performer and build a label for the period
//   const performer = tab === "org" ? orgPerformer : desigPerformer;
//   let periodLabel = "";
//   if (frequency === "daily") periodLabel = startDate;
//   if (frequency === "weekly")
//     periodLabel = `Week ${startWeek} of ${MONTHS[Number(startMonth) - 1]} ${startYear}`;
//   if (frequency === "monthly")
//     periodLabel = `${MONTHS[Number(startMonth) - 1]} ${startYear}`;
//   if (frequency === "yearly")
//     periodLabel = `${startYear}`;

//   return (
//     <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800 mt-6">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800 p-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <FiAward className="text-2xl text-white" />
//             <h2 className="text-xl font-bold text-white">Top Performer</h2>
//           </div>
//           <button 
//             onClick={() => setShowFilters(!showFilters)}
//             className="flex items-center space-x-1 text-white bg-white/20 hover:bg-white/30 rounded-full px-3 py-1 text-sm transition duration-300"
//           >
//             <FiFilter className="text-sm" />
//             <span>Filters</span>
//           </button>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="px-4 pt-4">
//         <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
//           <button
//             onClick={() => setTab("org")}
//             className={`flex-1 flex items-center justify-center py-2 px-4 text-sm font-medium rounded-lg transition-all duration-300 ${
//               tab === "org"
//                 ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
//                 : "text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700/50"
//             }`}
//           >
//             <BsBuilding className="mr-2" />
//             Organization
//           </button>
//           <button
//             onClick={() => setTab("desig")}
//             className={`flex-1 flex items-center justify-center py-2 px-4 text-sm font-medium rounded-lg transition-all duration-300 ${
//               tab === "desig"
//                 ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
//                 : "text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700/50"
//             }`}
//           >
//             <MdWorkOutline className="mr-2" />
//             By Designation
//           </button>
//         </div>
//       </div>

//       {/* Filters panel */}
//       {showFilters && (
//         <div className="p-4 space-y-4">
//           {/* Org-only: Dept & Desig selects */}
//           {tab === "org" && (
//             <div className="grid grid-cols-2 gap-3">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                   <BsBuilding className="text-gray-400" />
//                 </div>
//                 <select
//                   className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
//                   value={department}
//                   onChange={e => setDepartment(e.target.value)}
//                 >
//                   <option value="">All Departments</option>
//                   {departments.map(d => (
//                     <option key={d._id} value={d.department}>
//                       {d.department}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                   <BsPerson className="text-gray-400" />
//                 </div>
//                 <select
//                   className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
//                   value={designation}
//                   onChange={e => setDesignation(e.target.value)}
//                 >
//                   <option value="">All Designations</option>
//                   {designations.map(d => (
//                     <option key={d.id} value={d.designation}>
//                       {d.designation}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           )}

//           {/* Frequency */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Time Period
//             </label>
//             <div className="grid grid-cols-4 gap-2">
//               {FREQUENCIES.map(f => (
//                 <button
//                   key={f.value}
//                   onClick={() => setFrequency(f.value)}
//                   className={`flex flex-col items-center justify-center p-3 rounded-xl border ${
//                     frequency === f.value
//                       ? "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-400"
//                       : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
//                   }`}
//                 >
//                   {f.icon}
//                   <span className="mt-1 text-xs font-medium">{f.label}</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Date inputs by frequency */}
//           <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
//             {frequency === "daily" && (
//               <div className="grid grid-cols-2 gap-3">
//                 <div className="relative">
//                   <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
//                     Daily Date
//                   </label>
//                   <input
//                     type="date"
//                     className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
//                     value={startDate}
//                     onChange={e => setStartDate(e.target.value)}
//                   />
//                 </div>
         
//               </div>
//             )}

//             {frequency === "weekly" && (
//               <div className="space-y-3">
//                 <div className="grid grid-cols-2 gap-3">
//                   <div className="relative">
//                     <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
//                       Year
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="Year"
//                       className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
//                       value={startYear}
//                       onChange={e => setStartYear(e.target.value)}
//                     />
//                   </div>
//                   <div className="relative">
//                     <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
//                       Month
//                     </label>
//                     <select
//                       className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
//                       value={startMonth}
//                       onChange={e => setStartMonth(e.target.value)}
//                     >
//                       <option value="">Select Month</option>
//                       {MONTHS.map((m, i) => (
//                         <option key={m} value={String(i + 1).padStart(2, "0")}>
//                           {m}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//                 <div className="relative">
//                   <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
//                     Week
//                   </label>
//                   <select
//                     className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
//                     value={startWeek}
//                     onChange={e => setStartWeek(e.target.value)}
//                   >
//                     <option value="">Select Week</option>
//                     {startWeeks.map(w => (
//                       <option key={w.value} value={w.value}>
//                         {w.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             )}

//             {frequency === "monthly" && (
//               <div className="grid grid-cols-2 gap-3">
//                 <div className="relative">
//                   <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
//                     Year
//                   </label>
//                   <input
//                     type="number"
//                     placeholder="Year"
//                     className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
//                     value={startYear}
//                     onChange={e => setStartYear(e.target.value)}
//                   />
//                 </div>
//                 <div className="relative">
//                   <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
//                     Month
//                   </label>
//                   <select
//                     className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
//                     value={startMonth}
//                     onChange={e => setStartMonth(e.target.value)}
//                   >
//                     <option value="">Select Month</option>
//                     {MONTHS.map((m, i) => (
//                       <option key={m} value={String(i + 1).padStart(2, "0")}>
//                         {m}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             )}

//             {frequency === "yearly" && (
//               <div className="relative">
//                 <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
//                   Year
//                 </label>
//                 <input
//                   type="number"
//                   placeholder="Year"
//                   className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
//                   value={startYear}
//                   onChange={e => setStartYear(e.target.value)}
//                 />
//               </div>
//             )}
//           </div>

//           <button
//             onClick={handleFetch}
//             className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center space-x-2"
//           >
//             <MdOutlineAutoGraph className="text-lg" />
//             <span>Find Top Performer</span>
//           </button>
//         </div>
//       )}

//       {/* Results */}
//       <div className="p-4">
//         {loading && (
//           <div className="text-center p-8">
//             <div className="w-12 h-12 border-t-2 border-b-2 border-indigo-500 rounded-full animate-spin mx-auto"></div>
//             <p className="mt-3 text-gray-500 dark:text-gray-400">Searching for stars...</p>
//           </div>
//         )}
        
//         {error && (
//           <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-center text-red-600 dark:text-red-400">
//             Error: {error}
//           </div>
//         )}
        
//         { performer && (
//         <div className="bg-indigo-950 text-white rounded-xl shadow-lg overflow-hidden relative">
//           {/* Decorative stars */}
//           <div className="absolute top-3 right-3">
//             {/* <HiOutlineSparkles className="text-yellow-400" /> */}
//           </div>
          
//           <div className="p-4">
//             {/* Top section with name */}
//             <div className="flex justify-between items-start mb-2">
//               <div>
//                 <h3 className="text-xl font-bold">{performer.employee.first_Name} {performer.employee.last_Name}</h3>
//               </div>
//               <div className="flex items-center">
//                 <span className="text-lg font-bold text-indigo-300">✦ {performer.averageRating.toFixed(1)}</span>
//                 <span className="text-gray-400 text-sm ml-1">/ 100</span>
//               </div>
//             </div>
            
//             {/* Employee and avatar */}
//             <div className="flex items-center mb-3">
//               <div className="relative mr-3">
//                 <div className="w-16 h-16 rounded-full overflow-hidden bg-indigo-900 flex items-center justify-center border-2 border-indigo-800">
//                   {performer.employee.user_Avatar ? (
//                     <img
//                       src={performer.employee.user_Avatar}
//                       alt="avatar"
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <FiUser className="text-2xl text-gray-400" />
//                   )}
//                 </div>
//                 {/* Rating badge */}
//                 <div className="absolute -right-1 -bottom-1 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center border-2 border-indigo-950">
//                   <span className="text-xs font-bold">{performer.averageRating.toFixed(0)}</span>
//                 </div>
//               </div>
              
//               <div>
//                 <div className="text-sm text-gray-300">
//                   <div className="flex items-center">
//                     <BsBuilding className="mr-1 text-xs text-gray-400" />
//                     <span>{performer.employee.designation}</span>
//                   </div>
//                   <div className="flex items-center mt-1">
//                     <BsBuilding className="mr-1 text-xs text-gray-400" />
//                     <span>{performer.employee.department}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Date */}
//             <div className="flex items-center text-xs text-gray-400 mt-1">
//               <BsCalendarDate className="mr-1" />
//               <span>{periodLabel}</span>
//             </div>
            
//             {/* Action button */}
//             <div className="mt-3 pt-3 border-t border-indigo-900 flex justify-end">
//               <button className="flex items-center text-xs text-indigo-300 hover:text-indigo-200 transition">
//                 View Full Profile
//                 <BsChevronRight className="ml-1" />
//               </button>
//             </div>
//           </div>
          
//           {/* Back button */}
    
//         </div>
//       )}
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import { toast } from "react-hot-toast";
// import useRatingStore from "../../../store/useRatingNewStore";
// import useDepartmentStore from "../../../store/departmentStore";
// import useDesignationStore from "../../../store/designationStore";
// import { getWeeksInMonth } from "./calendarUtils";
// import { CiUser } from "react-icons/ci";
// import { 
//   MdOutlineDateRange, 
//   MdWorkOutline,
//   MdOutlineAutoGraph,
//   MdOutlineKeyboardArrowRight
// } from "react-icons/md";
// import { 
//   BsCalendar3Week, 
//   BsCalendar2Month, 
//   BsCalendar2Range,
//   BsStars,
//   BsBuilding,
//   BsPerson,
//   BsCalendarDate,
//   BsChevronRight
// } from "react-icons/bs";
// import { FiFilter, FiSearch, FiAward, FiUser } from "react-icons/fi";
// import { HiOutlineSparkles } from "react-icons/hi";

// const FREQUENCIES = [
//   { value: "daily",   label: "Daily",   icon: <MdOutlineDateRange className="text-xl" /> },
//   { value: "weekly",  label: "Weekly",  icon: <BsCalendar3Week className="text-xl" /> },
//   { value: "monthly", label: "Monthly", icon: <BsCalendar2Month className="text-xl" /> },
//   { value: "yearly",  label: "Yearly",  icon: <BsCalendar2Range className="text-xl" /> },
// ];

// const MONTHS = [
//   "January","February","March","April","May","June",
//   "July","August","September","October","November","December",
// ];

// export default function TopPerformerCard() {
//   const { getOrganizationTopPerformer, loading, error } = useRatingStore();
//   const { departments, fetchDepartments } = useDepartmentStore();
//   const { designations, fetchDesignations } = useDesignationStore();

//   useEffect(() => {
//     fetchDepartments();
//     fetchDesignations();
//   }, [fetchDepartments, fetchDesignations]);

//   // Org filters
//   const [department, setDepartment] = useState("");
//   const [designation, setDesignation] = useState("");
//   // Show/hide filters
//   const [showFilters, setShowFilters] = useState(true);

//   // Date filters
//   const [frequency, setFrequency] = useState("daily");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [startYear, setStartYear] = useState("");
//   const [endYear, setEndYear] = useState("");
//   const [startMonth, setStartMonth] = useState("");
//   const [endMonth, setEndMonth] = useState("");
//   const [startWeek, setStartWeek] = useState("");
//   const [endWeek, setEndWeek] = useState("");
//   const [startWeeks, setStartWeeks] = useState([]);
//   const [endWeeks, setEndWeeks] = useState([]);

//   // Results
//   const [orgPerformer, setOrgPerformer] = useState(null);

//   // Reset date fields when frequency changes
//   useEffect(() => {
//     const today = new Date(),
//           iso = today.toISOString().split("T")[0],
//           y = today.getFullYear(),
//           m = today.getMonth() + 1;

//     setStartDate(frequency === "daily" ? iso : "");
//     setEndDate(frequency === "daily" ? iso : "");
//     setStartYear(frequency !== "daily" ? String(y) : "");
//     setEndYear(frequency !== "daily" ? String(y) : "");
//     setStartMonth(
//       frequency === "weekly" || frequency === "monthly"
//         ? String(m).padStart(2, "0")
//         : ""
//     );
//     setEndMonth(
//       frequency === "weekly" || frequency === "monthly"
//         ? String(m).padStart(2, "0")
//         : ""
//     );
//     setStartWeek(""); setEndWeek("");
//     setStartWeeks([]); setEndWeeks([]);
//   }, [frequency]);

//   // Weekly → populate startWeeks
//   useEffect(() => {
//     if (frequency !== "weekly") return;
//     if (startYear && startMonth) {
//       const weeks = getWeeksInMonth(Number(startYear), Number(startMonth) - 1);
//       setStartWeeks(weeks);
//       if (!startWeek && weeks.length) setStartWeek(weeks[0].value);
//     }
//   }, [frequency, startYear, startMonth, startWeek]);

//   // Weekly → populate endWeeks
//   useEffect(() => {
//     if (frequency !== "weekly") return;
//     if (endYear && endMonth) {
//       const weeks = getWeeksInMonth(Number(endYear), Number(endMonth) - 1);
//       setEndWeeks(weeks);
//       if (!endWeek && weeks.length) setEndWeek(weeks[0].value);
//     }
//   }, [frequency, endYear, endMonth, endWeek]);

//   const handleFetch = async () => {
//     const params = { frequency };

//     // Org filters
//     if (department) params.department = department;
//     if (designation) params.designation = designation;

//     // Build date params
//     if (frequency === "daily") {
//       if (!startDate || !endDate) return toast.error("Pick both start and end date");
//       params.startDate = startDate;
//       params.endDate = endDate;
//     } else if (frequency === "weekly") {
//       if (!(startYear && endYear && startMonth && endMonth && startWeek && endWeek)) {
//         return toast.error("Complete your week range");
//       }
//       Object.assign(params, { startYear, endYear, startMonth, endMonth, startWeek, endWeek });
//     } else if (frequency === "monthly") {
//       if (!(startYear && endYear && startMonth && endMonth)) {
//         return toast.error("Pick your month range");
//       }
//       Object.assign(params, { startYear, endYear, startMonth, endMonth });
//     } else if (frequency === "yearly") {
//       if (!(startYear && endYear)) {
//         return toast.error("Pick your year range");
//       }
//       Object.assign(params, { startYear, endYear });
//     }

//     try {
//       const res = await getOrganizationTopPerformer(params);

//       if (res.success && res.data) {
//         setOrgPerformer(res.data);
//       } else {
//         toast.error(res.message || "No data found");
//       }
//     } catch (err) {
//       toast.error(err.message || "Fetch error");
//     }
//   };

//   // Build a label for the period
//   const performer = orgPerformer;
//   let periodLabel = "";
//   if (frequency === "daily") periodLabel = startDate;
//   if (frequency === "weekly")
//     periodLabel = `Week ${startWeek} of ${MONTHS[Number(startMonth) - 1]} ${startYear}`;
//   if (frequency === "monthly")
//     periodLabel = `${MONTHS[Number(startMonth) - 1]} ${startYear}`;
//   if (frequency === "yearly")
//     periodLabel = `${startYear}`;

//   return (
//     <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800 mt-6">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800 p-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <FiAward className="text-2xl text-white" />
//             <h2 className="text-xl font-bold text-white">Top Performer</h2>
//           </div>
//           <button 
//             onClick={() => setShowFilters(!showFilters)}
//             className="flex items-center space-x-1 text-white bg-white/20 hover:bg-white/30 rounded-full px-3 py-1 text-sm transition duration-300"
//           >
//             <FiFilter className="text-sm" />
//             <span>Filters</span>
//           </button>
//         </div>
//       </div>

//       {/* Filters panel */}
//       {showFilters && (
//         <div className="p-4 space-y-4">
//           {/* Dept & Desig selects */}
//           <div className="grid grid-cols-2 gap-3">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                 <BsBuilding className="text-gray-400" />
//               </div>
//               <select
//                 className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
//                 value={department}
//                 onChange={e => setDepartment(e.target.value)}
//               >
//                 <option value="">All Departments</option>
//                 {departments.map(d => (
//                   <option key={d._id} value={d.department}>
//                     {d.department}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                 <BsPerson className="text-gray-400" />
//               </div>
//               <select
//                 className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
//                 value={designation}
//                 onChange={e => setDesignation(e.target.value)}
//               >
//                 <option value="">All Designations</option>
//                 {designations.map(d => (
//                   <option key={d.id} value={d.designation}>
//                     {d.designation}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Frequency */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Time Period
//             </label>
//             <div className="grid grid-cols-4 gap-2">
//               {FREQUENCIES.map(f => (
//                 <button
//                   key={f.value}
//                   onClick={() => setFrequency(f.value)}
//                   className={`flex flex-col items-center justify-center p-3 rounded-xl border ${
//                     frequency === f.value
//                       ? "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-400"
//                       : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
//                   }`}
//                 >
//                   {f.icon}
//                   <span className="mt-1 text-xs font-medium">{f.label}</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Date inputs by frequency */}
//           <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
//             {frequency === "daily" && (
//               <div className="grid grid-cols-2 gap-3">
//                 <div className="relative">
//                   <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
//                     Daily Date
//                   </label>
//                   <input
//                     type="date"
//                     className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
//                     value={startDate}
//                     onChange={e => setStartDate(e.target.value)}
//                   />
//                 </div>
         
//               </div>
//             )}

//             {frequency === "weekly" && (
//               <div className="space-y-3">
//                 <div className="grid grid-cols-2 gap-3">
//                   <div className="relative">
//                     <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
//                       Year
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="Year"
//                       className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
//                       value={startYear}
//                       onChange={e => setStartYear(e.target.value)}
//                     />
//                   </div>
//                   <div className="relative">
//                     <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
//                       Month
//                     </label>
//                     <select
//                       className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
//                       value={startMonth}
//                       onChange={e => setStartMonth(e.target.value)}
//                     >
//                       <option value="">Select Month</option>
//                       {MONTHS.map((m, i) => (
//                         <option key={m} value={String(i + 1).padStart(2, "0")}>
//                           {m}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//                 <div className="relative">
//                   <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
//                     Week
//                   </label>
//                   <select
//                     className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
//                     value={startWeek}
//                     onChange={e => setStartWeek(e.target.value)}
//                   >
//                     <option value="">Select Week</option>
//                     {startWeeks.map(w => (
//                       <option key={w.value} value={w.value}>
//                         {w.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             )}

//             {frequency === "monthly" && (
//               <div className="grid grid-cols-2 gap-3">
//                 <div className="relative">
//                   <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
//                     Year
//                   </label>
//                   <input
//                     type="number"
//                     placeholder="Year"
//                     className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
//                     value={startYear}
//                     onChange={e => setStartYear(e.target.value)}
//                   />
//                 </div>
//                 <div className="relative">
//                   <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
//                     Month
//                   </label>
//                   <select
//                     className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
//                     value={startMonth}
//                     onChange={e => setStartMonth(e.target.value)}
//                   >
//                     <option value="">Select Month</option>
//                     {MONTHS.map((m, i) => (
//                       <option key={m} value={String(i + 1).padStart(2, "0")}>
//                         {m}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             )}

//             {frequency === "yearly" && (
//               <div className="relative">
//                 <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
//                   Year
//                 </label>
//                 <input
//                   type="number"
//                   placeholder="Year"
//                   className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
//                   value={startYear}
//                   onChange={e => setStartYear(e.target.value)}
//                 />
//               </div>
//             )}
//           </div>

//           <button
//             onClick={handleFetch}
//             className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center space-x-2"
//           >
//             <MdOutlineAutoGraph className="text-lg" />
//             <span>Find Top Performer</span>
//           </button>
//         </div>
//       )}

//       {/* Results */}
//       <div className="p-4">
//         {loading && (
//           <div className="text-center p-8">
//             <div className="w-12 h-12 border-t-2 border-b-2 border-indigo-500 rounded-full animate-spin mx-auto"></div>
//             <p className="mt-3 text-gray-500 dark:text-gray-400">Searching for stars...</p>
//           </div>
//         )}
        
//         {error && (
//           <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-center text-red-600 dark:text-red-400">
//             Error: {error}
//           </div>
//         )}
        
//         { performer && (
//         <div className="bg-indigo-950 text-white rounded-xl shadow-lg overflow-hidden relative">
//           {/* Decorative stars */}
//           <div className="absolute top-3 right-3">
//             {/* <HiOutlineSparkles className="text-yellow-400" /> */}
//           </div>
          
//           <div className="p-4">
//             {/* Top section with name */}
//             <div className="flex justify-between items-start mb-2">
//               <div>
//                 <h3 className="text-xl font-bold">{performer.employee.first_Name} {performer.employee.last_Name}</h3>
//               </div>
//               <div className="flex items-center">
//                 <span className="text-lg font-bold text-indigo-300">✦ {performer.averageRating.toFixed(1)}</span>
//                 <span className="text-gray-400 text-sm ml-1">/ 100</span>
//               </div>
//             </div>
            
//             {/* Employee and avatar */}
//             <div className="flex items-center mb-3">
//               <div className="relative mr-3">
//                 <div className="w-16 h-16 rounded-full overflow-hidden bg-indigo-900 flex items-center justify-center border-2 border-indigo-800">
//                   {performer.employee.user_Avatar ? (
//                     <img
//                       src={performer.employee.user_Avatar}
//                       alt="avatar"
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <FiUser className="text-2xl text-gray-400" />
//                   )}
//                 </div>
//                 {/* Rating badge */}
//                 <div className="absolute -right-1 -bottom-1 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center border-2 border-indigo-950">
//                   <span className="text-xs font-bold">{performer.averageRating.toFixed(0)}</span>
//                 </div>
//               </div>
              
//               <div>
//                 <div className="text-sm text-gray-300">
//                   <div className="flex items-center">
//                     <BsBuilding className="mr-1 text-xs text-gray-400" />
//                     <span>{performer.employee.designation}</span>
//                   </div>
//                   <div className="flex items-center mt-1">
//                     <BsBuilding className="mr-1 text-xs text-gray-400" />
//                     <span>{performer.employee.department}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Date */}
//             <div className="flex items-center text-xs text-gray-400 mt-1">
//               <BsCalendarDate className="mr-1" />
//               <span>{periodLabel}</span>
//             </div>
            
//             {/* Action button */}
//             <div className="mt-3 pt-3 border-t border-indigo-900 flex justify-end">
//               <button className="flex items-center text-xs text-indigo-300 hover:text-indigo-200 transition">
//                 View Full Profile
//                 <BsChevronRight className="ml-1" />
//               </button>
//             </div>
//           </div>
          
//           {/* Back button */}
    
//         </div>
//       )}
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import { toast } from "react-hot-toast";
// import useRatingStore from "../../../store/useRatingNewStore";
// import useDepartmentStore from "../../../store/departmentStore";
// import useDesignationStore from "../../../store/designationStore";
// import { getWeeksInMonth } from "./calendarUtils";

// import {
//   MdOutlineDateRange,
//   MdOutlineAutoGraph,
// } from "react-icons/md";
// import {
//   BsCalendar3Week,
//   BsCalendar2Month,
//   BsCalendar2Range,
//   BsBuilding,
//   BsPerson,
//   BsCalendarDate,
//   BsChevronRight,
// } from "react-icons/bs";
// import { FiFilter, FiUser, FiAward } from "react-icons/fi";

// const FREQUENCIES = [
//   { value: "daily", label: "Daily", icon: <MdOutlineDateRange className="text-xl" /> },
//   { value: "weekly", label: "Weekly", icon: <BsCalendar3Week className="text-xl" /> },
//   { value: "monthly", label: "Monthly", icon: <BsCalendar2Month className="text-xl" /> },
//   { value: "yearly", label: "Yearly", icon: <BsCalendar2Range className="text-xl" /> },
// ];

// const MONTHS = [
//   "January","February","March","April","May","June",
//   "July","August","September","October","November","December",
// ];

// export default function TopPerformerCard() {
//   const { getOrganizationTopPerformer, loading, error } = useRatingStore();
//   const { departments, fetchDepartments } = useDepartmentStore();
//   const { designations, fetchDesignations } = useDesignationStore();

//   // load filters
//   useEffect(() => {
//     fetchDepartments();
//     fetchDesignations();
//   }, [fetchDepartments, fetchDesignations]);

//   // org filters
//   const [department, setDepartment] = useState("");
//   const [designation, setDesignation] = useState("");
//   const [showFilters, setShowFilters] = useState(true);

//   // date filters
//   const [frequency, setFrequency] = useState("daily");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [startYear, setStartYear] = useState("");
//   const [endYear, setEndYear] = useState("");
//   const [startMonth, setStartMonth] = useState("");
//   const [endMonth, setEndMonth] = useState("");
//   const [startWeek, setStartWeek] = useState("");
//   const [endWeek, setEndWeek] = useState("");
//   const [startWeeks, setStartWeeks] = useState([]);
//   const [endWeeks, setEndWeeks] = useState([]);

//   // result
//   const [orgPerformer, setOrgPerformer] = useState(null);

//   // reset date fields on frequency change
//   useEffect(() => {
//     const now = new Date();
//     const iso = now.toISOString().slice(0, 10);
//     const y = now.getFullYear();
//     const m = String(now.getMonth() + 1).padStart(2, "0");

//     setStartDate(frequency === "daily" ? iso : "");
//     setEndDate(frequency === "daily" ? iso : "");
//     setStartYear(frequency !== "daily" ? String(y) : "");
//     setEndYear(frequency !== "daily" ? String(y) : "");
//     setStartMonth(
//       frequency === "weekly" || frequency === "monthly" ? m : ""
//     );
//     setEndMonth(
//       frequency === "weekly" || frequency === "monthly" ? m : ""
//     );
//     setStartWeek("");
//     setEndWeek("");
//     setStartWeeks([]);
//     setEndWeeks([]);
//   }, [frequency]);

//   // weekly → startWeeks
//   useEffect(() => {
//     if (frequency !== "weekly") return;
//     if (startYear && startMonth) {
//       const w = getWeeksInMonth(+startYear, +startMonth - 1);
//       setStartWeeks(w);
//       if (!startWeek && w.length) setStartWeek(w[0].value);
//     }
//   }, [frequency, startYear, startMonth, startWeek]);

//   // weekly → endWeeks
//   useEffect(() => {
//     if (frequency !== "weekly") return;
//     if (endYear && endMonth) {
//       const w = getWeeksInMonth(+endYear, +endMonth - 1);
//       setEndWeeks(w);
//       if (!endWeek && w.length) setEndWeek(w[0].value);
//     }
//   }, [frequency, endYear, endMonth, endWeek]);

//   // fetch top performer
//   const handleFetch = async () => {
//     const params = { frequency };
//     if (department) params.department = department;
//     if (designation) params.designation = designation;

//     if (frequency === "daily") {
//       if (!startDate || !endDate)
//         return toast.error("Pick both start and end date");
//       params.startDate = startDate;
//       params.endDate = endDate;
//     } else if (frequency === "weekly") {
//       if (
//         !(
//           startYear &&
//           endYear &&
//           startMonth &&
//           endMonth &&
//           startWeek &&
//           endWeek
//         )
//       )
//         return toast.error("Complete your week range");
//       Object.assign(params, {
//         startYear,
//         endYear,
//         startMonth,
//         endMonth,
//         startWeek,
//         endWeek,
//       });
//     } else if (frequency === "monthly") {
//       if (!(startYear && endYear && startMonth && endMonth))
//         return toast.error("Pick your month range");
//       Object.assign(params, { startYear, endYear, startMonth, endMonth });
//     } else if (frequency === "yearly") {
//       if (!(startYear && endYear))
//         return toast.error("Pick your year range");
//       Object.assign(params, { startYear, endYear });
//     }

//     try {
//       const res = await getOrganizationTopPerformer(params);
//       if (res.success && res.data) {
//         setOrgPerformer(res.data);
//       } else {
//         toast.error(res.message || "No data found");
//       }
//     } catch (err) {
//       toast.error(err.message || "Fetch error");
//     }
//   };

//   // human-friendly period label
//   let periodLabel = "";
//   if (frequency === "daily") periodLabel = startDate;
//   if (frequency === "weekly")
//     periodLabel = `Week ${startWeek} of ${
//       MONTHS[+startMonth - 1]
//     } ${startYear}`;
//   if (frequency === "monthly")
//     periodLabel = `${MONTHS[+startMonth - 1]} ${startYear}`;
//   if (frequency === "yearly") periodLabel = `${startYear}`;

//   return (
//     <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 mt-6 overflow-hidden">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 flex items-center justify-between">
//         <div className="flex items-center space-x-2">
//           <FiAward className="text-2xl text-white" />
//           <h2 className="text-xl font-bold text-white">Top Performer</h2>
//         </div>
//         <button
//           onClick={() => setShowFilters((f) => !f)}
//           className="flex items-center space-x-1 text-white bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition"
//         >
//           <FiFilter className="text-sm" />
//           <span className="text-sm">Filters</span>
//         </button>
//       </div>

//       {/* Filters */}
//       {showFilters && (
//         <div className="p-4 space-y-4">
//           {/* Dept & Desig */}
//           <div className="grid grid-cols-2 gap-3">
//             <div className="relative">
//               <BsBuilding className="absolute left-3 top-3 text-gray-400" />
//               <select
//                 className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border rounded-lg text-sm focus:ring-indigo-500"
//                 value={department}
//                 onChange={(e) => setDepartment(e.target.value)}
//               >
//                 <option value="">All Departments</option>
//                 {departments.map((d) => (
//                   <option key={d._id} value={d.department}>
//                     {d.department}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="relative">
//               <BsPerson className="absolute left-3 top-3 text-gray-400" />
//               <select
//                 className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border rounded-lg text-sm focus:ring-indigo-500"
//                 value={designation}
//                 onChange={(e) => setDesignation(e.target.value)}
//               >
//                 <option value="">All Designations</option>
//                 {designations.map((d) => (
//                   <option key={d.id} value={d.designation}>
//                     {d.designation}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Frequency */}
//           <div>
//             <label className="block text-sm font-medium mb-2">
//               Time Period
//             </label>
//             <div className="grid grid-cols-4 gap-2">
//               {FREQUENCIES.map((f) => (
//                 <button
//                   key={f.value}
//                   onClick={() => setFrequency(f.value)}
//                   className={`flex flex-col items-center p-3 rounded-xl border transition ${
//                     frequency === f.value
//                       ? "bg-indigo-50 text-indigo-700 border-indigo-300"
//                       : "border-gray-200 hover:bg-gray-50"
//                   }`}
//                 >
//                   {f.icon}
//                   <span className="mt-1 text-xs font-medium">{f.label}</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Date Inputs */}
//           <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border">
//             {frequency === "daily" && (
//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="block text-xs mb-1">Start Date</label>
//                   <input
//                     type="date"
//                     className="w-full p-2 bg-white dark:bg-gray-700 border rounded-lg text-sm"
//                     value={startDate}
//                     onChange={(e) => setStartDate(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs mb-1">End Date</label>
//                   <input
//                     type="date"
//                     className="w-full p-2 bg-white dark:bg-gray-700 border rounded-lg text-sm"
//                     value={endDate}
//                     onChange={(e) => setEndDate(e.target.value)}
//                   />
//                 </div>
//               </div>
//             )}
//             {frequency === "weekly" && (
//               <div className="space-y-3">
//                 {/* Start */}
//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <label className="block text-xs mb-1">Year</label>
//                     <input
//                       type="number"
//                       className="w-full p-2 bg-white dark:bg-gray-700 border rounded-lg text-sm"
//                       value={startYear}
//                       onChange={(e) => setStartYear(e.target.value)}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs mb-1">Month</label>
//                     <select
//                       className="w-full p-2 bg-white dark:bg-gray-700 border rounded-lg text-sm"
//                       value={startMonth}
//                       onChange={(e) => setStartMonth(e.target.value)}
//                     >
//                       <option value="">Month</option>
//                       {MONTHS.map((m, i) => (
//                         <option
//                           key={m}
//                           value={String(i + 1).padStart(2, "0")}
//                         >
//                           {m}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-xs mb-1">Week</label>
//                   <select
//                     className="w-full p-2 bg-white dark:bg-gray-700 border rounded-lg text-sm"
//                     value={startWeek}
//                     onChange={(e) => setStartWeek(e.target.value)}
//                   >
//                     <option value="">Week</option>
//                     {startWeeks.map((w) => (
//                       <option key={w.value} value={w.value}>
//                         {w.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* End */}
//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <label className="block text-xs mb-1">Year</label>
//                     <input
//                       type="number"
//                       className="w-full p-2 bg-white dark:bg-gray-700 border rounded-lg text-sm"
//                       value={endYear}
//                       onChange={(e) => setEndYear(e.target.value)}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs mb-1">Month</label>
//                     <select
//                       className="w-full p-2 bg-white dark:bg-gray-700 border rounded-lg text-sm"
//                       value={endMonth}
//                       onChange={(e) => setEndMonth(e.target.value)}
//                     >
//                       <option value="">Month</option>
//                       {MONTHS.map((m, i) => (
//                         <option
//                           key={m}
//                           value={String(i + 1).padStart(2, "0")}
//                         >
//                           {m}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-xs mb-1">Week</label>
//                   <select
//                     className="w-full p-2 bg-white dark:bg-gray-700 border rounded-lg text-sm"
//                     value={endWeek}
//                     onChange={(e) => setEndWeek(e.target.value)}
//                   >
//                     <option value="">Week</option>
//                     {endWeeks.map((w) => (
//                       <option key={w.value} value={w.value}>
//                         {w.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             )}
//             {frequency === "monthly" && (
//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="block text-xs mb-1">Start Year</label>
//                   <input
//                     type="number"
//                     className="w-full p-2 bg-white dark:bg-gray-700 border rounded-lg text-sm"
//                     value={startYear}
//                     onChange={(e) => setStartYear(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs mb-1">Start Month</label>
//                   <select
//                     className="w-full p-2 bg-white dark:bg-gray-700 border rounded-lg text-sm"
//                     value={startMonth}
//                     onChange={(e) => setStartMonth(e.target.value)}
//                   >
//                     <option value="">Month</option>
//                     {MONTHS.map((m, i) => (
//                       <option
//                         key={m}
//                         value={String(i + 1).padStart(2, "0")}
//                       >
//                         {m}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             )}
//             {frequency === "yearly" && (
//               <div>
//                 <label className="block text-xs mb-1">Start Year</label>
//                 <input
//                   type="number"
//                   className="w-full p-2 bg-white dark:bg-gray-700 border rounded-lg text-sm"
//                   value={startYear}
//                   onChange={(e) => setStartYear(e.target.value)}
//                 />
//               </div>
//             )}
//           </div>

//           <button
//             onClick={handleFetch}
//             disabled={loading}
//             className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium flex items-center justify-center space-x-2 hover:from-indigo-700 hover:to-purple-700 transition"
//           >
//             <MdOutlineAutoGraph className="text-lg" />
//             <span>Find Top Performer</span>
//           </button>
//         </div>
//       )}

//       {/* Results */}
//       <div className="p-4">
//         {loading && (
//           <div className="text-center py-8">
//             <div className="w-12 h-12 border-t-2 border-b-2 border-indigo-500 rounded-full animate-spin mx-auto" />
//             <p className="mt-3 text-gray-500">Searching for stars…</p>
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center">
//             Error: {error}
//           </div>
//         )}

//         {orgPerformer && !loading && (
//           <div className="bg-indigo-950 text-white rounded-xl shadow-lg overflow-hidden relative">
//             <div className="p-4">
//               {/* Name & Score */}
//               <div className="flex justify-between items-start mb-2">
//                 <h3 className="text-xl font-bold">
//                   {orgPerformer.employee.first_Name}{" "}
//                   {orgPerformer.employee.last_Name}
//                 </h3>
//                 <div className="flex items-center">
//                   <span className="text-lg font-bold text-indigo-300">
//                     ✦ {orgPerformer.averageRating.toFixed(1)}%
//                   </span>
//                 </div>
//               </div>

//               {/* Avatar & Details */}
//               <div className="flex items-center mb-3">
//                 <div className="relative mr-3">
//                   <div className="w-16 h-16 rounded-full overflow-hidden bg-indigo-900 flex items-center justify-center border-2 border-indigo-800">
//                     {orgPerformer.employee.user_Avatar ? (
//                       <img
//                         src={orgPerformer.employee.user_Avatar}
//                         alt="avatar"
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <FiUser className="text-2xl text-gray-400" />
//                     )}
//                   </div>
//                   <div className="absolute -right-1 -bottom-1 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center border-2 border-indigo-950">
//                     <span className="text-xs font-bold">
//                       {orgPerformer.averageRating.toFixed(0)}%
//                     </span>
//                   </div>
//                 </div>
//                 <div className="text-sm text-gray-300">
//                   <div className="flex items-center">
//                     <BsBuilding className="mr-1 text-xs" />
//                     {orgPerformer.employee.department}
//                   </div>
//                   <div className="flex items-center mt-1">
//                     <BsPerson className="mr-1 text-xs" />
//                     {orgPerformer.employee.designation}
//                   </div>
//                 </div>
//               </div>

//               {/* Period */}
//               <div className="flex items-center text-xs text-gray-400">
//                 <BsCalendarDate className="mr-1" />
//                 <span>{periodLabel}</span>
//               </div>

//               {/* Action */}
//               <div className="mt-3 pt-3 border-t border-indigo-900 text-right">
//                 <button className="flex items-center text-xs text-indigo-300 hover:text-indigo-200 transition">
//                   View Full Profile
//                   <BsChevronRight className="ml-1" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// import React, { useState, useEffect } from "react";
// import { toast } from "react-hot-toast";
// import useRatingStore from "../../../store/useRatingNewStore";
// import useDepartmentStore from "../../../store/departmentStore";
// import useDesignationStore from "../../../store/designationStore";
// import { getWeeksInMonth } from "./calendarUtils";

// import {
//   MdOutlineDateRange,
//   MdOutlineAutoGraph,
// } from "react-icons/md";
// import {
//   BsCalendar3Week,
//   BsCalendar2Month,
//   BsCalendar2Range,
//   BsBuilding,
//   BsPerson,
//   BsCalendarDate,
//   BsChevronRight,
// } from "react-icons/bs";
// import { FiFilter, FiUser, FiAward } from "react-icons/fi";

// const FREQUENCIES = [
//   { value: "daily", label: "Daily", icon: <MdOutlineDateRange className="text-xl" /> },
//   { value: "weekly", label: "Weekly", icon: <BsCalendar3Week className="text-xl" /> },
//   { value: "monthly", label: "Monthly", icon: <BsCalendar2Month className="text-xl" /> },
//   { value: "yearly", label: "Yearly", icon: <BsCalendar2Range className="text-xl" /> },
// ];

// const MONTHS = [
//   "January","February","March","April","May","June",
//   "July","August","September","October","November","December",
// ];

// export default function TopPerformerCard() {
//   const { getOrganizationTopPerformer, loading, error } = useRatingStore();
//   const { departments, fetchDepartments } = useDepartmentStore();
//   const { designations, fetchDesignations } = useDesignationStore();

//   // load filters
//   useEffect(() => {
//     fetchDepartments();
//     fetchDesignations();
//   }, [fetchDepartments, fetchDesignations]);

//   // org filters
//   const [department, setDepartment] = useState("");
//   const [designation, setDesignation] = useState("");
//   const [showFilters, setShowFilters] = useState(true);

//   // date filters
//   const [frequency, setFrequency] = useState("daily");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [startYear, setStartYear] = useState("");
//   const [endYear, setEndYear] = useState("");
//   const [startMonth, setStartMonth] = useState("");
//   const [endMonth, setEndMonth] = useState("");
//   const [startWeek, setStartWeek] = useState("");
//   const [endWeek, setEndWeek] = useState("");
//   const [startWeeks, setStartWeeks] = useState([]);
//   const [endWeeks, setEndWeeks] = useState([]);

//   // result
//   const [orgPerformer, setOrgPerformer] = useState(null);

//   // reset date fields on frequency change
//   useEffect(() => {
//     const now = new Date();
//     const iso = now.toISOString().slice(0, 10);
//     const y = now.getFullYear();
//     const m = String(now.getMonth() + 1).padStart(2, "0");

//     setStartDate(frequency === "daily" ? iso : "");
//     setEndDate(frequency === "daily" ? iso : "");
//     setStartYear(frequency !== "daily" ? String(y) : "");
//     setEndYear(frequency !== "daily" ? String(y) : "");
//     setStartMonth(
//       frequency === "weekly" || frequency === "monthly" ? m : ""
//     );
//     setEndMonth(
//       frequency === "weekly" || frequency === "monthly" ? m : ""
//     );
//     setStartWeek("");
//     setEndWeek("");
//     setStartWeeks([]);
//     setEndWeeks([]);
//   }, [frequency]);

//   // weekly → startWeeks
//   useEffect(() => {
//     if (frequency !== "weekly") return;
//     if (startYear && startMonth) {
//       const w = getWeeksInMonth(+startYear, +startMonth - 1);
//       setStartWeeks(w);
//       if (!startWeek && w.length) setStartWeek(w[0].value);
//     }
//   }, [frequency, startYear, startMonth, startWeek]);

//   // weekly → endWeeks
//   useEffect(() => {
//     if (frequency !== "weekly") return;
//     if (endYear && endMonth) {
//       const w = getWeeksInMonth(+endYear, +endMonth - 1);
//       setEndWeeks(w);
//       if (!endWeek && w.length) setEndWeek(w[0].value);
//     }
//   }, [frequency, endYear, endMonth, endWeek]);

//   // fetch top performer
//   const handleFetch = async () => {
//     const params = { frequency };
//     if (department) params.department = department;
//     if (designation) params.designation = designation;

//     if (frequency === "daily") {
//       if (!startDate || !endDate)
//         return toast.error("Pick both start and end date");
//       params.startDate = startDate;
//       params.endDate = endDate;
//     } else if (frequency === "weekly") {
//       if (
//         !(
//           startYear &&
//           endYear &&
//           startMonth &&
//           endMonth &&
//           startWeek &&
//           endWeek
//         )
//       )
//         return toast.error("Complete your week range");
//       Object.assign(params, {
//         startYear,
//         endYear,
//         startMonth,
//         endMonth,
//         startWeek,
//         endWeek,
//       });
//     } else if (frequency === "monthly") {
//       if (!(startYear && endYear && startMonth && endMonth))
//         return toast.error("Pick your month range");
//       Object.assign(params, { startYear, endYear, startMonth, endMonth });
//     } else if (frequency === "yearly") {
//       if (!(startYear && endYear))
//         return toast.error("Pick your year range");
//       Object.assign(params, { startYear, endYear });
//     }

//     try {
//       const res = await getOrganizationTopPerformer(params);
//       if (res.success && res.data) {
//         setOrgPerformer(res.data);
//       } else {
//         toast.error(res.message || "No data found");
//       }
//     } catch (err) {
//       toast.error(err.message || "Fetch error");
//     }
//   };

//   // human-friendly period label
//   let periodLabel = "";
//   if (frequency === "daily") periodLabel = startDate;
//   if (frequency === "weekly")
//     periodLabel = `Week ${startWeek} of ${
//       MONTHS[+startMonth - 1]
//     } ${startYear}`;
//   if (frequency === "monthly")
//     periodLabel = `${MONTHS[+startMonth - 1]} ${startYear}`;
//   if (frequency === "yearly") periodLabel = `${startYear}`;

//   return (
//     <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 mt-6 overflow-hidden">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 flex items-center justify-between">
//         <div className="flex items-center space-x-2">
//           <FiAward className="text-2xl text-white" />
//           <h2 className="text-xl font-bold text-white">Top Performer</h2>
//         </div>
//         <button
//           onClick={() => setShowFilters((f) => !f)}
//           className="flex items-center space-x-1 text-white bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition"
//         >
//           <FiFilter className="text-sm" />
//           <span className="text-sm">Filters</span>
//         </button>
//       </div>

//       {/* Filters */}
//       {showFilters && (
//         <div className="p-4 space-y-4">
//           {/* Dept & Desig */}
//           <div className="grid grid-cols-2 gap-3">
//             <div className="relative">
//               <BsBuilding className="absolute left-3 top-3 text-gray-400" />
//               <select
//                 className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border rounded-lg text-sm focus:ring-indigo-500"
//                 value={department}
//                 onChange={(e) => setDepartment(e.target.value)}
//               >
//                 <option value="">All Departments</option>
//                 {departments.map((d) => (
//                   <option key={d._id} value={d.department}>
//                     {d.department}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="relative">
//               <BsPerson className="absolute left-3 top-3 text-gray-400" />
//               <select
//                 className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border rounded-lg text-sm focus:ring-indigo-500"
//                 value={designation}
//                 onChange={(e) => setDesignation(e.target.value)}
//               >
//                 <option value="">All Designations</option>
//                 {designations.map((d) => (
//                   <option key={d.id} value={d.designation}>
//                     {d.designation}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Frequency */}
//           <div>
//             <label className="block text-sm font-medium mb-2">
//               Time Period
//             </label>
//             <div className="grid grid-cols-4 gap-2">
//               {FREQUENCIES.map((f) => (
//                 <button
//                   key={f.value}
//                   onClick={() => setFrequency(f.value)}
//                   className={`flex flex-col items-center p-3 rounded-xl border transition ${
//                     frequency === f.value
//                       ? "bg-indigo-50 text-indigo-700 border-indigo-300"
//                       : "border-gray-200 hover:bg-gray-50"
//                   }`}
//                 >
//                   {f.icon}
//                   <span className="mt-1 text-xs font-medium">{f.label}</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Date Inputs */}
//           <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border">
//             {frequency === "daily" && (
//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="block text-xs mb-1">Start Date</label>
//                   <input
//                     type="date"
//                     className="w-full p-2 bg-white dark:bg-gray-700 border rounded-lg text-sm"
//                     value={startDate}
//                     onChange={(e) => setStartDate(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs mb-1">End Date</label>
//                   <input
//                     type="date"
//                     className="w-full p-2 bg-white dark:bg-gray-700 border rounded-lg text-sm"
//                     value={endDate}
//                     onChange={(e) => setEndDate(e.target.value)}
//                   />
//                 </div>
//               </div>
//             )}
//             {frequency === "weekly" && (
//               <div className="space-y-3">
//                 {/* Start */}
//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <label className="block text-xs mb-1">Year</label>
//                     <input
//                       type="number"
//                       className="w-full p-2 bg-white dark:bg-gray-700 border rounded-lg text-sm"
//                       value={startYear}
//                       onChange={(e) => setStartYear(e.target.value)}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs mb-1">Month</label>
//                     <select
//                       className="w-full p-2 bg-white dark:bg-gray-700 border rounded-lg text-sm"
//                       value={startMonth}
//                       onChange={(e) => setStartMonth(e.target.value)}
//                     >
//                       <option value="">Month</option>
//                       {MONTHS.map((m, i) => (
//                         <option
//                           key={m}
//                           value={String(i + 1).padStart(2, "0")}
//                         >
//                           {m}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-xs mb-1">Week</label>
//                   <select
//                     className="w-full p-2 bg-white dark:bg-gray-700 border rounded-lg text-sm"
//                     value={startWeek}
//                     onChange={(e) => setStartWeek(e.target.value)}
//                   >
//                     <option value="">Week</option>
//                     {startWeeks.map((w) => (
//                       <option key={w.value} value={w.value}>
//                         {w.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* End */}
//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <label className="block text-xs mb-1">Year</label>
//                     <input
//                       type="number"
//                       className="w-full p-2 bg-white dark:bg-gray-700 border rounded-lg text-sm"
//                       value={endYear}
//                       onChange={(e) => setEndYear(e.target.value)}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs mb-1">Month</label>
//                     <select
//                       className="w-full p-2 bg-white dark:bg-gray-700 border rounded-lg text-sm"
//                       value={endMonth}
//                       onChange={(e) => setEndMonth(e.target.value)}
//                     >
//                       <option value="">Month</option>
//                       {MONTHS.map((m, i) => (
//                         <option
//                           key={m}
//                           value={String(i + 1).padStart(2, "0")}
//                         >
//                           {m}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-xs mb-1">Week</label>
//                   <select
//                     className="w-full p-2 bg-white dark:bg-gray-700 border rounded-lg text-sm"
//                     value={endWeek}
//                     onChange={(e) => setEndWeek(e.target.value)}
//                   >
//                     <option value="">Week</option>
//                     {endWeeks.map((w) => (
//                       <option key={w.value} value={w.value}>
//                         {w.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             )}
//             {frequency === "monthly" && (
//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="block text-xs mb-1">Start Year</label>
//                   <input
//                     type="number"
//                     className="w-full p-2 bg-white dark:bg-gray-700 border rounded-lg text-sm"
//                     value={startYear}
//                     onChange={(e) => setStartYear(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs mb-1">Start Month</label>
//                   <select
//                     className="w-full p-2 bg-white dark:bg-gray-700 border rounded-lg text-sm"
//                     value={startMonth}
//                     onChange={(e) => setStartMonth(e.target.value)}
//                   >
//                     <option value="">Month</option>
//                     {MONTHS.map((m, i) => (
//                       <option
//                         key={m}
//                         value={String(i + 1).padStart(2, "0")}
//                       >
//                         {m}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             )}
//             {frequency === "yearly" && (
//               <div>
//                 <label className="block text-xs mb-1">Start Year</label>
//                 <input
//                   type="number"
//                   className="w-full p-2 bg-white dark:bg-gray-700 border rounded-lg text-sm"
//                   value={startYear}
//                   onChange={(e) => setStartYear(e.target.value)}
//                 />
//               </div>
//             )}
//           </div>

//           <button
//             onClick={handleFetch}
//             disabled={loading}
//             className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium flex items-center justify-center space-x-2 hover:from-indigo-700 hover:to-purple-700 transition"
//           >
//             <MdOutlineAutoGraph className="text-lg" />
//             <span>Find Top Performer</span>
//           </button>
//         </div>
//       )}

//       {/* Results */}
//       <div className="p-4">
//         {loading && (
//           <div className="text-center py-8">
//             <div className="w-12 h-12 border-t-2 border-b-2 border-indigo-500 rounded-full animate-spin mx-auto" />
//             <p className="mt-3 text-gray-500">Searching for stars…</p>
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center">
//             Error: {error}
//           </div>
//         )}

//         {orgPerformer && !loading && (
//           <div className="bg-indigo-950 text-white rounded-xl shadow-lg overflow-hidden relative">
//             <div className="p-4">
//               {/* Name & Score */}
//               <div className="flex justify-between items-start mb-2">
//                 <h3 className="text-xl font-bold">
//                   {orgPerformer.employee.first_Name}{" "}
//                   {orgPerformer.employee.last_Name}
//                 </h3>
//                 <div className="flex items-center">
//                   <span className="text-lg font-bold text-indigo-300">
//                     ✦ {orgPerformer.averagePercent}%
//                   </span>
//                 </div>
//               </div>

//               {/* Avatar & Details */}
//               <div className="flex items-center mb-3">
//                 <div className="relative mr-3">
//                   <div className="w-16 h-16 rounded-full overflow-hidden bg-indigo-900 flex items-center justify-center border-2 border-indigo-800">
//                     {orgPerformer.employee.user_Avatar ? (
//                       <img
//                         src={orgPerformer.employee.user_Avatar}
//                         alt="avatar"
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <FiUser className="text-2xl text-gray-400" />
//                     )}
//                   </div>
//                   <div className="absolute -right-1 -bottom-1 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center border-2 border-indigo-950">
//                     <span className="text-xs font-bold">
//                       {orgPerformer.averagePercent}%
//                     </span>
//                   </div>
//                 </div>
//                 <div className="text-sm text-gray-300">
//                   <div className="flex items-center">
//                     <BsBuilding className="mr-1 text-xs" />
//                     {orgPerformer.employee.department}
//                   </div>
//                   <div className="flex items-center mt-1">
//                     <BsPerson className="mr-1 text-xs" />
//                     {orgPerformer.employee.designation}
//                   </div>
//                 </div>
//               </div>

//               {/* Period */}
//               <div className="flex items-center text-xs text-gray-400">
//                 <BsCalendarDate className="mr-1" />
//                 <span>{periodLabel}</span>
//               </div>

//               {/* Action */}
//               <div className="mt-3 pt-3 border-t border-indigo-900 text-right">
//                 <button className="flex items-center text-xs text-indigo-300 hover:text-indigo-200 transition">
//                   View Full Profile
//                   <BsChevronRight className="ml-1" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// import React, { useState, useEffect } from "react";
// import { toast } from "react-hot-toast";
// import useRatingStore from "../../../store/useRatingNewStore";
// import useDepartmentStore from "../../../store/departmentStore";
// import useDesignationStore from "../../../store/designationStore";
// import { getWeeksInMonth } from "./calendarUtils";

// import {
//   MdOutlineDateRange,
//   MdOutlineAutoGraph,
// } from "react-icons/md";
// import {
//   BsCalendar3Week,
//   BsCalendar2Month,
//   BsCalendar2Range,
//   BsBuilding,
//   BsPerson,
//   BsCalendarDate,
//   BsChevronRight,
// } from "react-icons/bs";
// import { FiFilter, FiUser, FiAward } from "react-icons/fi";

// const FREQUENCIES = [
//   { value: "daily", label: "Daily", icon: <MdOutlineDateRange className="text-lg" /> },
//   { value: "weekly", label: "Weekly", icon: <BsCalendar3Week className="text-lg" /> },
//   { value: "monthly", label: "Monthly", icon: <BsCalendar2Month className="text-lg" /> },
//   { value: "yearly", label: "Yearly", icon: <BsCalendar2Range className="text-lg" /> },
// ];

// const MONTHS = [
//   "January","February","March","April","May","June",
//   "July","August","September","October","November","December",
// ];

// export default function TopPerformerCard() {
//   const { getOrganizationTopPerformer, loading, error } = useRatingStore();
//   const { departments, fetchDepartments } = useDepartmentStore();
//   const { designations, fetchDesignations } = useDesignationStore();

//   // Load filters
//   useEffect(() => {
//     fetchDepartments();
//     fetchDesignations();
//   }, [fetchDepartments, fetchDesignations]);

//   // Org filters
//   const [department, setDepartment] = useState("");
//   const [designation, setDesignation] = useState("");
//   const [showFilters, setShowFilters] = useState(true);

//   // Date filters
//   const [frequency, setFrequency] = useState("daily");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [startYear, setStartYear] = useState("");
//   const [endYear, setEndYear] = useState("");
//   const [startMonth, setStartMonth] = useState("");
//   const [endMonth, setEndMonth] = useState("");
//   const [startWeek, setStartWeek] = useState("");
//   const [endWeek, setEndWeek] = useState("");
//   const [startWeeks, setStartWeeks] = useState([]);
//   const [endWeeks, setEndWeeks] = useState([]);

//   // Result
//   const [orgPerformer, setOrgPerformer] = useState(null);

//   // Reset date fields on frequency change
//   useEffect(() => {
//     const now = new Date();
//     const iso = now.toISOString().slice(0, 10);
//     const y = now.getFullYear();
//     const m = String(now.getMonth() + 1).padStart(2, "0");

//     setStartDate(frequency === "daily" ? iso : "");
//     setEndDate(frequency === "daily" ? iso : "");
//     setStartYear(frequency !== "daily" ? String(y) : "");
//     setEndYear(frequency !== "daily" ? String(y) : "");
//     setStartMonth(
//       frequency === "weekly" || frequency === "monthly" ? m : ""
//     );
//     setEndMonth(
//       frequency === "weekly" || frequency === "monthly" ? m : ""
//     );
//     setStartWeek("");
//     setEndWeek("");
//     setStartWeeks([]);
//     setEndWeeks([]);
//   }, [frequency]);

//   // Weekly → startWeeks
//   useEffect(() => {
//     if (frequency !== "weekly") return;
//     if (startYear && startMonth) {
//       const w = getWeeksInMonth(+startYear, +startMonth - 1);
//       setStartWeeks(w);
//       if (!startWeek && w.length) setStartWeek(w[0].value);
//     }
//   }, [frequency, startYear, startMonth, startWeek]);

//   // Weekly → endWeeks
//   useEffect(() => {
//     if (frequency !== "weekly") return;
//     if (endYear && endMonth) {
//       const w = getWeeksInMonth(+endYear, +endMonth - 1);
//       setEndWeeks(w);
//       if (!endWeek && w.length) setEndWeek(w[0].value);
//     }
//   }, [frequency, endYear, endMonth, endWeek]);

//   // Fetch top performer
//   const handleFetch = async () => {
//     const params = { frequency };
//     if (department) params.department = department;
//     if (designation) params.designation = designation;

//     if (frequency === "daily") {
//       if (!startDate || !endDate)
//         return toast.error("Pick both start and end date");
//       params.startDate = startDate;
//       params.endDate = endDate;
//     } else if (frequency === "weekly") {
//       if (
//         !(
//           startYear &&
//           endYear &&
//           startMonth &&
//           endMonth &&
//           startWeek &&
//           endWeek
//         )
//       )
//         return toast.error("Complete your week range");
//       Object.assign(params, {
//         startYear,
//         endYear,
//         startMonth,
//         endMonth,
//         startWeek,
//         endWeek,
//       });
//     } else if (frequency === "monthly") {
//       if (!(startYear && endYear && startMonth && endMonth))
//         return toast.error("Pick your month range");
//       Object.assign(params, { startYear, endYear, startMonth, endMonth });
//     } else if (frequency === "yearly") {
//       if (!(startYear && endYear))
//         return toast.error("Pick your year range");
//       Object.assign(params, { startYear, endYear });
//     }

//     try {
//       const res = await getOrganizationTopPerformer(params);
//       if (res.success && res.data) {
//         setOrgPerformer(res.data);
//       } else {
//         toast.error(res.message || "No data found");
//       }
//     } catch (err) {
//       toast.error(err.message || "Fetch error");
//     }
//   };

//   // Human-friendly period label
//   let periodLabel = "";
//   if (frequency === "daily") periodLabel = startDate;
//   if (frequency === "weekly")
//     periodLabel = `Week ${startWeek} of ${
//       MONTHS[+startMonth - 1]
//     } ${startYear}`;
//   if (frequency === "monthly")
//     periodLabel = `${MONTHS[+startMonth - 1]} ${startYear}`;
//   if (frequency === "yearly") periodLabel = `${startYear}`;

//   return (
//     <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 mt-6 overflow-hidden">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 p-5 flex items-center justify-between">
//         <div className="flex items-center space-x-3">
//           <div className="p-2 bg-white bg-opacity-20 rounded-lg">
//             <FiAward className="text-xl text-white" />
//           </div>
//           <h2 className="text-xl font-bold text-white">Top Performer</h2>
//         </div>
//         <button
//           onClick={() => setShowFilters((f) => !f)}
//           className="flex items-center space-x-2 text-white bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all duration-200"
//         >
//           <FiFilter className="text-sm" />
//           <span className="text-sm font-medium">Filters</span>
//         </button>
//       </div>

//       {/* Filters */}
//       {showFilters && (
//         <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
//           {/* Department & Designation */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Department
//               </label>
//               <div className="relative">
//                 <BsBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
//                 <select
//                   className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
//                   value={department}
//                   onChange={(e) => setDepartment(e.target.value)}
//                 >
//                   <option value="">All Departments</option>
//                   {departments && departments.map((d) => (
//                     <option key={d._id} value={d.department}>
//                       {d.department}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Designation
//               </label>
//               <div className="relative">
//                 <BsPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
//                 <select
//                   className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
//                   value={designation}
//                   onChange={(e) => setDesignation(e.target.value)}
//                 >
//                   <option value="">All Designations</option>
//                   {designations && designations.map((d) => (
//                     <option key={d.id} value={d.designation}>
//                       {d.designation}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Frequency */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
//               Time Period
//             </label>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//               {FREQUENCIES.map((f) => (
//                 <button
//                   key={f.value}
//                   onClick={() => setFrequency(f.value)}
//                   className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 ${
//                     frequency === f.value
//                       ? "bg-indigo-50 dark:bg-indigo-900 dark:bg-opacity-30 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-600"
//                       : "border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
//                   }`}
//                 >
//                   <div className="mb-2">{f.icon}</div>
//                   <span className="text-xs font-medium">{f.label}</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Date Inputs */}
//           <div className="bg-white dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
//             {frequency === "daily" && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Start Date</label>
//                   <input
//                     type="date"
//                     className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
//                     value={startDate}
//                     onChange={(e) => setStartDate(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">End Date</label>
//                   <input
//                     type="date"
//                     className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
//                     value={endDate}
//                     onChange={(e) => setEndDate(e.target.value)}
//                   />
//                 </div>
//               </div>
//             )}
            
//             {frequency === "weekly" && (
//               <div className="space-y-4">
//                 <div className="border-b border-gray-200 dark:border-gray-600 pb-4">
//                   <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Start Period</h4>
//                   <div className="grid grid-cols-2 gap-3 mb-3">
//                     <div>
//                       <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Year</label>
//                       <input
//                         type="number"
//                         placeholder="2024"
//                         className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
//                         value={startYear}
//                         onChange={(e) => setStartYear(e.target.value)}
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Month</label>
//                       <select
//                         className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
//                         value={startMonth}
//                         onChange={(e) => setStartMonth(e.target.value)}
//                       >
//                         <option value="">Select Month</option>
//                         {MONTHS.map((m, i) => (
//                           <option
//                             key={m}
//                             value={String(i + 1).padStart(2, "0")}
//                           >
//                             {m}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Week</label>
//                     <select
//                       className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
//                       value={startWeek}
//                       onChange={(e) => setStartWeek(e.target.value)}
//                     >
//                       <option value="">Select Week</option>
//                       {startWeeks && startWeeks.map((w) => (
//                         <option key={w.value} value={w.value}>
//                           {w.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div>
//                   <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">End Period</h4>
//                   <div className="grid grid-cols-2 gap-3 mb-3">
//                     <div>
//                       <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Year</label>
//                       <input
//                         type="number"
//                         placeholder="2024"
//                         className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
//                         value={endYear}
//                         onChange={(e) => setEndYear(e.target.value)}
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Month</label>
//                       <select
//                         className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
//                         value={endMonth}
//                         onChange={(e) => setEndMonth(e.target.value)}
//                       >
//                         <option value="">Select Month</option>
//                         {MONTHS.map((m, i) => (
//                           <option
//                             key={m}
//                             value={String(i + 1).padStart(2, "0")}
//                           >
//                             {m}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Week</label>
//                     <select
//                       className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
//                       value={endWeek}
//                       onChange={(e) => setEndWeek(e.target.value)}
//                     >
//                       <option value="">Select Week</option>
//                       {endWeeks && endWeeks.map((w) => (
//                         <option key={w.value} value={w.value}>
//                           {w.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             )}
            
//             {frequency === "monthly" && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Start Year</label>
//                   <input
//                     type="number"
//                     placeholder="2024"
//                     className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
//                     value={startYear}
//                     onChange={(e) => setStartYear(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Start Month</label>
//                   <select
//                     className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
//                     value={startMonth}
//                     onChange={(e) => setStartMonth(e.target.value)}
//                   >
//                     <option value="">Select Month</option>
//                     {MONTHS.map((m, i) => (
//                       <option
//                         key={m}
//                         value={String(i + 1).padStart(2, "0")}
//                       >
//                         {m}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             )}
            
//             {frequency === "yearly" && (
//               <div className="max-w-sm">
//                 <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Start Year</label>
//                 <input
//                   type="number"
//                   placeholder="2024"
//                   className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
//                   value={startYear}
//                   onChange={(e) => setStartYear(e.target.value)}
//                 />
//               </div>
//             )}
//           </div>

//           <button
//             onClick={handleFetch}
//             disabled={loading}
//             className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white rounded-xl font-semibold flex items-center justify-center space-x-3 hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-600 dark:hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
//           >
//             <MdOutlineAutoGraph className="text-xl" />
//             <span>{loading ? "Searching..." : "Find Top Performer"}</span>
//           </button>
//         </div>
//       )}

//       {/* Results */}
//       <div className="p-6">
//         {/* Loading State */}
//         {loading && (
//           <div className="text-center py-12">
//             <div className="relative w-16 h-16 mx-auto mb-4">
//               <div className="w-16 h-16 border-4 border-indigo-200 dark:border-indigo-800 rounded-full animate-spin border-t-indigo-600 dark:border-t-indigo-400"></div>
//             </div>
//             <p className="text-gray-600 dark:text-gray-400 font-medium">Searching for top performers...</p>
//             <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">This may take a moment</p>
//           </div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="bg-red-50 dark:bg-red-900 dark:bg-opacity-20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-xl text-center">
//             <div className="flex items-center justify-center mb-2">
//               <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//               </svg>
//               <span className="font-semibold">Error</span>
//             </div>
//             <p>{error}</p>
//           </div>
//         )}

//         {/* Success State */}
//         {orgPerformer && !loading && (
//           <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 dark:from-indigo-950 dark:via-indigo-900 dark:to-purple-950 text-white rounded-2xl shadow-2xl overflow-hidden relative">
//             {/* Background decoration */}
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white via-opacity-5 to-transparent transform -skew-y-1"></div>
//             <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400 from-opacity-20 to-transparent rounded-full blur-2xl"></div>
            
//             <div className="relative p-6">
//               {/* Header with badge */}
//               <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center space-x-3">
//                   <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg">
//                     <FiAward className="text-xl text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-2xl font-bold text-white">
//                       {orgPerformer.employee.first_Name} {orgPerformer.employee.last_Name}
//                     </h3>
//                     <p className="text-indigo-200 text-sm">Top Performer</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg">
//                     <span className="text-lg font-bold mr-1">✦</span>
//                     <span className="text-xl font-bold">{orgPerformer.averagePercent}%</span>
//                   </div>
//                   {orgPerformer.category && (
//                     <p className="text-xs text-indigo-300 mt-1">{orgPerformer.category}</p>
//                   )}
//                 </div>
//               </div>

//               {/* Employee Details */}
//               <div className="flex items-start space-x-4 mb-6">
//                 <div className="relative flex-shrink-0">
//                   <div className="w-20 h-20 rounded-2xl overflow-hidden bg-indigo-800 dark:bg-indigo-900 flex items-center justify-center border-3 border-indigo-600 dark:border-indigo-700 shadow-lg">
//                     {orgPerformer.employee.user_Avatar ? (
//                       <img
//                         src={orgPerformer.employee.user_Avatar}
//                         alt="Employee Avatar"
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <FiUser className="text-3xl text-indigo-300" />
//                     )}
//                   </div>
//                   <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center border-2 border-indigo-900 shadow-lg">
//                     <span className="text-xs font-bold">{orgPerformer.averagePercent}%</span>
//                   </div>
//                 </div>
                
//                 <div className="flex-1 space-y-3">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     <div className="flex items-center space-x-3 bg-white bg-opacity-10 rounded-lg p-3">
//                       <div className="p-2 bg-indigo-600 dark:bg-indigo-700 rounded-lg">
//                         <BsBuilding className="text-sm text-white" />
//                       </div>
//                       <div>
//                         <p className="text-xs text-indigo-200">Department</p>
//                         <p className="text-sm font-semibold text-white">{orgPerformer.employee.department}</p>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center space-x-3 bg-white bg-opacity-10 rounded-lg p-3">
//                       <div className="p-2 bg-purple-600 dark:bg-purple-700 rounded-lg">
//                         <BsPerson className="text-sm text-white" />
//                       </div>
//                       <div>
//                         <p className="text-xs text-indigo-200">Designation</p>
//                         <p className="text-sm font-semibold text-white">{orgPerformer.employee.designation}</p>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center space-x-3 bg-white bg-opacity-10 rounded-lg p-3">
//                     <div className="p-2 bg-emerald-600 dark:bg-emerald-700 rounded-lg">
//                       <BsCalendarDate className="text-sm text-white" />
//                     </div>
//                     <div>
//                       <p className="text-xs text-indigo-200">Performance Period</p>
//                       <p className="text-sm font-semibold text-white">{periodLabel}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Stats */}
//               <div className="grid grid-cols-2 gap-4 mb-6">
//                 <div className="bg-white bg-opacity-10 rounded-xl p-4 text-center">
//                   <div className="text-2xl font-bold text-white mb-1">{orgPerformer.ratingCount}</div>
//                   <div className="text-xs text-indigo-200">Total Ratings</div>
//                 </div>
//                 <div className="bg-white bg-opacity-10 rounded-xl p-4 text-center">
//                   <div className="text-2xl font-bold text-white mb-1">{orgPerformer.averagePercent}%</div>
//                   <div className="text-xs text-indigo-200">Average Score</div>
//                 </div>
//               </div>

//               {/* Action Button */}
//               <div className="flex items-center justify-between pt-4 border-t border-indigo-700 dark:border-indigo-800">
//                 <div className="text-xs text-indigo-300">
//                   Employee ID: {orgPerformer.employee.employee_Id || 'N/A'}
//                 </div>
//                 <button className="flex items-center space-x-2 text-sm bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105">
//                   <span>View Full Profile</span>
//                   <BsChevronRight className="text-xs" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Empty State */}
//         {!orgPerformer && !loading && !error && (
//           <div className="text-center py-12">
//             <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
//               <FiAward className="text-2xl text-gray-400 dark:text-gray-600" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No Data Yet</h3>
//             <p className="text-gray-500 dark:text-gray-400 text-sm">Select your filters and click "Find Top Performer" to see results.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




// import React, { useState, useEffect } from "react";
// import { toast } from "react-hot-toast";
// import useRatingStore from "../../../store/useRatingNewStore";
// import useDepartmentStore from "../../../store/departmentStore";
// import useDesignationStore from "../../../store/designationStore";
// import { getWeeksInMonth } from "./calendarUtils";

// import {
//   MdOutlineDateRange,
//   MdOutlineAutoGraph,
// } from "react-icons/md";
// import {
//   BsCalendar3Week,
//   BsCalendar2Month,
//   BsCalendar2Range,
//   BsBuilding,
//   BsPerson,
//   BsCalendarDate,
//   BsChevronRight,
// } from "react-icons/bs";
// import { FiFilter, FiUser, FiAward } from "react-icons/fi";

// const FREQUENCIES = [
//   { value: "daily", label: "Daily", icon: <MdOutlineDateRange className="text-lg" /> },
//   { value: "weekly", label: "Weekly", icon: <BsCalendar3Week className="text-lg" /> },
//   { value: "monthly", label: "Monthly", icon: <BsCalendar2Month className="text-lg" /> },
//   { value: "yearly", label: "Yearly", icon: <BsCalendar2Range className="text-lg" /> },
// ];

// const MONTHS = [
//   "January","February","March","April","May","June",
//   "July","August","September","October","November","December",
// ];

// export default function TopPerformerCard() {
//   const { getOrganizationTopPerformer, loading, error } = useRatingStore();
//   const { departments, fetchDepartments } = useDepartmentStore();
//   const { designations, fetchDesignations } = useDesignationStore();

//   // Load filters
//   useEffect(() => {
//     fetchDepartments();
//     fetchDesignations();
//   }, [fetchDepartments, fetchDesignations]);

//   // Org filters
//   const [department, setDepartment] = useState("");
//   const [designation, setDesignation] = useState("");
//   const [showFilters, setShowFilters] = useState(true);

//   // Date filters
//   const [frequency, setFrequency] = useState("daily");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [startYear, setStartYear] = useState("");
//   const [endYear, setEndYear] = useState("");
//   const [startMonth, setStartMonth] = useState("");
//   const [endMonth, setEndMonth] = useState("");
//   const [startWeek, setStartWeek] = useState("");
//   const [endWeek, setEndWeek] = useState("");
//   const [startWeeks, setStartWeeks] = useState([]);
//   const [endWeeks, setEndWeeks] = useState([]);

//   // Result
//   const [orgPerformer, setOrgPerformer] = useState(null);

//   // Reset date fields on frequency change
//   useEffect(() => {
//     const now = new Date();
//     const iso = now.toISOString().slice(0, 10);
//     const y = now.getFullYear();
//     const m = String(now.getMonth() + 1).padStart(2, "0");

//     setStartDate(frequency === "daily" ? iso : "");
//     setEndDate(frequency === "daily" ? iso : "");
//     setStartYear(frequency !== "daily" ? String(y) : "");
//     setEndYear(frequency !== "daily" ? String(y) : "");
//     setStartMonth(
//       frequency === "weekly" || frequency === "monthly" ? m : ""
//     );
//     setEndMonth(
//       frequency === "weekly" || frequency === "monthly" ? m : ""
//     );
//     setStartWeek("");
//     setEndWeek("");
//     setStartWeeks([]);
//     setEndWeeks([]);
//   }, [frequency]);

//   // Weekly → startWeeks
//   useEffect(() => {
//     if (frequency !== "weekly") return;
//     if (startYear && startMonth) {
//       const w = getWeeksInMonth(+startYear, +startMonth - 1);
//       setStartWeeks(w);
//       if (!startWeek && w.length) setStartWeek(w[0].value);
//     }
//   }, [frequency, startYear, startMonth, startWeek]);

//   // Weekly → endWeeks
//   useEffect(() => {
//     if (frequency !== "weekly") return;
//     if (endYear && endMonth) {
//       const w = getWeeksInMonth(+endYear, +endMonth - 1);
//       setEndWeeks(w);
//       if (!endWeek && w.length) setEndWeek(w[0].value);
//     }
//   }, [frequency, endYear, endMonth, endWeek]);

//   // Fetch top performer
//   const handleFetch = async () => {
//     const params = { frequency };
//     if (department) params.department = department;
//     if (designation) params.designation = designation;

//     if (frequency === "daily") {
//       if (!startDate || !endDate)
//         return toast.error("Pick both start and end date");
//       params.startDate = startDate;
//       params.endDate = endDate;
//     } else if (frequency === "weekly") {
//       if (
//         !(
//           startYear &&
//           endYear &&
//           startMonth &&
//           endMonth &&
//           startWeek &&
//           endWeek
//         )
//       )
//         return toast.error("Complete your week range");
//       Object.assign(params, {
//         startYear,
//         endYear,
//         startMonth,
//         endMonth,
//         startWeek,
//         endWeek,
//       });
//     } else if (frequency === "monthly") {
//       if (!(startYear && endYear && startMonth && endMonth))
//         return toast.error("Pick your month range");
//       Object.assign(params, { startYear, endYear, startMonth, endMonth });
//     } else if (frequency === "yearly") {
//       if (!(startYear && endYear))
//         return toast.error("Pick your year range");
//       Object.assign(params, { startYear, endYear });
//     }

//     try {
//       const res = await getOrganizationTopPerformer(params);
//       if (res.success && res.data) {
//         setOrgPerformer(res.data);
//       } else {
//         toast.error(res.message || "No data found");
//       }
//     } catch (err) {
//       toast.error(err.message || "Fetch error");
//     }
//   };

//   // Human-friendly period label
//   let periodLabel = "";
//   if (frequency === "daily") periodLabel = startDate;
//   if (frequency === "weekly")
//     periodLabel = `Week ${startWeek} of ${
//       MONTHS[+startMonth - 1]
//     } ${startYear}`;
//   if (frequency === "monthly")
//     periodLabel = `${MONTHS[+startMonth - 1]} ${startYear}`;
//   if (frequency === "yearly") periodLabel = `${startYear}`;

//   return (
//     <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 mt-6 overflow-hidden">
//       {/* Header */}
//       <div className="bg-indigo-600 dark:bg-indigo-700 p-5 flex items-center justify-between">
//         <div className="flex items-center space-x-3">
//           <div className="p-2 bg-white bg-opacity-20 rounded-lg">
//             <FiAward className="text-xl text-white" />
//           </div>
//           <h2 className="text-xl font-bold text-white">Top Performer</h2>
//         </div>
//         <button
//           onClick={() => setShowFilters((f) => !f)}
//           className="flex items-center space-x-2 text-white bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all duration-200"
//         >
//           <FiFilter className="text-sm" />
//           <span className="text-sm font-medium">Filters</span>
//         </button>
//       </div>

//       {/* Filters */}
//       {showFilters && (
//         <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
//           {/* Department & Designation */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Department
//               </label>
//               <div className="relative">
//                 <BsBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
//                 <select
//                   className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
//                   value={department}
//                   onChange={(e) => setDepartment(e.target.value)}
//                 >
//                   <option value="">All Departments</option>
//                   {departments && departments.map((d) => (
//                     <option key={d._id} value={d.department}>
//                       {d.department}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Designation
//               </label>
//               <div className="relative">
//                 <BsPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
//                 <select
//                   className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
//                   value={designation}
//                   onChange={(e) => setDesignation(e.target.value)}
//                 >
//                   <option value="">All Designations</option>
//                   {designations && designations.map((d) => (
//                     <option key={d.id} value={d.designation}>
//                       {d.designation}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Frequency */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
//               Time Period
//             </label>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//               {FREQUENCIES.map((f) => (
//                 <button
//                   key={f.value}
//                   onClick={() => setFrequency(f.value)}
//                   className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 ${
//                     frequency === f.value
//                       ? "bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300 border-indigo-400 dark:border-indigo-500"
//                       : "border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
//                   }`}
//                 >
//                   <div className="mb-2">{f.icon}</div>
//                   <span className="text-xs font-medium">{f.label}</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Date Inputs */}
//           <div className="bg-white dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
//             {frequency === "daily" && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Start Date</label>
//                   <input
//                     type="date"
//                     className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
//                     value={startDate}
//                     onChange={(e) => setStartDate(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">End Date</label>
//                   <input
//                     type="date"
//                     className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
//                     value={endDate}
//                     onChange={(e) => setEndDate(e.target.value)}
//                   />
//                 </div>
//               </div>
//             )}
            
//             {frequency === "weekly" && (
//               <div className="space-y-4">
//                 <div className="border-b border-gray-200 dark:border-gray-600 pb-4">
//                   <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Start Period</h4>
//                   <div className="grid grid-cols-2 gap-3 mb-3">
//                     <div>
//                       <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Year</label>
//                       <input
//                         type="number"
//                         placeholder="2024"
//                         className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
//                         value={startYear}
//                         onChange={(e) => setStartYear(e.target.value)}
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Month</label>
//                       <select
//                         className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
//                         value={startMonth}
//                         onChange={(e) => setStartMonth(e.target.value)}
//                       >
//                         <option value="">Select Month</option>
//                         {MONTHS.map((m, i) => (
//                           <option
//                             key={m}
//                             value={String(i + 1).padStart(2, "0")}
//                           >
//                             {m}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Week</label>
//                     <select
//                       className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
//                       value={startWeek}
//                       onChange={(e) => setStartWeek(e.target.value)}
//                     >
//                       <option value="">Select Week</option>
//                       {startWeeks && startWeeks.map((w) => (
//                         <option key={w.value} value={w.value}>
//                           {w.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div>
//                   <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">End Period</h4>
//                   <div className="grid grid-cols-2 gap-3 mb-3">
//                     <div>
//                       <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Year</label>
//                       <input
//                         type="number"
//                         placeholder="2024"
//                         className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
//                         value={endYear}
//                         onChange={(e) => setEndYear(e.target.value)}
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Month</label>
//                       <select
//                         className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
//                         value={endMonth}
//                         onChange={(e) => setEndMonth(e.target.value)}
//                       >
//                         <option value="">Select Month</option>
//                         {MONTHS.map((m, i) => (
//                           <option
//                             key={m}
//                             value={String(i + 1).padStart(2, "0")}
//                           >
//                             {m}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Week</label>
//                     <select
//                       className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
//                       value={endWeek}
//                       onChange={(e) => setEndWeek(e.target.value)}
//                     >
//                       <option value="">Select Week</option>
//                       {endWeeks && endWeeks.map((w) => (
//                         <option key={w.value} value={w.value}>
//                           {w.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             )}
            
//             {frequency === "monthly" && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Start Year</label>
//                   <input
//                     type="number"
//                     placeholder="2024"
//                     className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
//                     value={startYear}
//                     onChange={(e) => setStartYear(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Start Month</label>
//                   <select
//                     className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
//                     value={startMonth}
//                     onChange={(e) => setStartMonth(e.target.value)}
//                   >
//                     <option value="">Select Month</option>
//                     {MONTHS.map((m, i) => (
//                       <option
//                         key={m}
//                         value={String(i + 1).padStart(2, "0")}
//                       >
//                         {m}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             )}
            
//             {frequency === "yearly" && (
//               <div className="max-w-sm">
//                 <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Start Year</label>
//                 <input
//                   type="number"
//                   placeholder="2024"
//                   className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
//                   value={startYear}
//                   onChange={(e) => setStartYear(e.target.value)}
//                 />
//               </div>
//             )}
//           </div>

//           <button
//             onClick={handleFetch}
//             disabled={loading}
//             className="w-full py-4 bg-indigo-600 dark:bg-indigo-500 text-white rounded-xl font-semibold flex items-center justify-center space-x-3 hover:bg-indigo-700 dark:hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
//           >
//             <MdOutlineAutoGraph className="text-xl" />
//             <span>{loading ? "Searching..." : "Find Top Performer"}</span>
//           </button>
//         </div>
//       )}

//       {/* Results */}
//       <div className="p-6">
//         {/* Loading State */}
//         {loading && (
//           <div className="text-center py-12">
//             <div className="relative w-16 h-16 mx-auto mb-4">
//               <div className="w-16 h-16 border-4 border-indigo-200 dark:border-indigo-800 rounded-full animate-spin border-t-indigo-600 dark:border-t-indigo-400"></div>
//             </div>
//             <p className="text-gray-600 dark:text-gray-400 font-medium">Searching for top performers...</p>
//             <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">This may take a moment</p>
//           </div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="bg-red-50 dark:bg-red-900 dark:bg-opacity-20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-xl text-center">
//             <div className="flex items-center justify-center mb-2">
//               <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//               </svg>
//               <span className="font-semibold">Error</span>
//             </div>
//             <p>{error}</p>
//           </div>
//         )}

//         {/* Success State */}
//         {orgPerformer && !loading && (
//           <div className="bg-indigo-800 dark:bg-indigo-900 text-white rounded-2xl shadow-xl overflow-hidden">
//             <div className="p-6">
//               {/* Header */}
//               <div className="flex items-start justify-between mb-6">
//                 <div className="flex items-center space-x-4">
//                   <div className="p-3 bg-orange-500 rounded-full">
//                     <FiAward className="text-xl text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-2xl font-bold text-white leading-tight">
//                       {orgPerformer.employee.first_Name} {orgPerformer.employee.last_Name}
//                     </h3>
//                     <p className="text-indigo-200 text-sm mt-1">Top Performer</p>
//                   </div>
//                 </div>
//                 <div className="text-right flex-shrink-0">
//                   <div className="inline-flex items-center bg-orange-500 text-white px-4 py-2 rounded-full">
//                     <span className="text-lg font-bold mr-1">✦</span>
//                     <span className="text-xl font-bold">{orgPerformer.averagePercent}%</span>
//                   </div>
//                   {orgPerformer.category && (
//                     <p className="text-xs text-indigo-300 mt-2">{orgPerformer.category}</p>
//                   )}
//                 </div>
//               </div>

//               {/* Employee Avatar and Basic Info */}
//               <div className="flex items-center space-x-4 mb-6">
//                 <div className="relative flex-shrink-0">
//                   <div className="w-20 h-20 rounded-2xl overflow-hidden bg-indigo-700 flex items-center justify-center border-2 border-indigo-600">
//                     {orgPerformer.employee.user_Avatar ? (
//                       <img
//                         src={orgPerformer.employee.user_Avatar}
//                         alt="Employee Avatar"
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <FiUser className="text-3xl text-indigo-300" />
//                     )}
//                   </div>
//                   <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center border-2 border-indigo-800">
//                     <span className="text-xs font-bold">{orgPerformer.averagePercent}%</span>
//                   </div>
//                 </div>
                
//                 <div className="flex-1 min-w-0">
//                   <div className="text-sm text-indigo-100">
//                     <div className="mb-2">
//                       <span className="text-xs text-indigo-300">Employee ID:</span>
//                       <span className="ml-2 font-medium">{orgPerformer.employee.employee_Id || 'N/A'}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Department and Designation */}
//               <div className="grid grid-cols-1 gap-4 mb-6">
//                 <div className="flex items-center space-x-3 bg-indigo-700 dark:bg-indigo-800 rounded-lg p-4">
//                   <div className="p-2 bg-indigo-600 rounded-lg">
//                     <BsBuilding className="text-sm text-white" />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-xs text-indigo-200">Department</p>
//                     <p className="text-sm font-semibold text-white truncate">{orgPerformer.employee.department}</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center space-x-3 bg-indigo-700 dark:bg-indigo-800 rounded-lg p-4">
//                   <div className="p-2 bg-purple-600 rounded-lg">
//                     <BsPerson className="text-sm text-white" />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-xs text-indigo-200">Designation</p>
//                     <p className="text-sm font-semibold text-white truncate">{orgPerformer.employee.designation}</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center space-x-3 bg-indigo-700 dark:bg-indigo-800 rounded-lg p-4">
//                   <div className="p-2 bg-emerald-600 rounded-lg">
//                     <BsCalendarDate className="text-sm text-white" />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-xs text-indigo-200">Performance Period</p>
//                     <p className="text-sm font-semibold text-white truncate">{periodLabel}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Stats */}
//               <div className="grid grid-cols-2 gap-4 mb-6">
//                 <div className="bg-indigo-700 dark:bg-indigo-800 rounded-xl p-4 text-center">
//                   <div className="text-2xl font-bold text-white mb-1">{orgPerformer.ratingCount}</div>
//                   <div className="text-xs text-indigo-200">Total Ratings</div>
//                 </div>
//                 <div className="bg-indigo-700 dark:bg-indigo-800 rounded-xl p-4 text-center">
//                   <div className="text-2xl font-bold text-white mb-1">{orgPerformer.averagePercent}%</div>
//                   <div className="text-xs text-indigo-200">Average Score</div>
//                 </div>
//               </div>

           
//             </div>
//           </div>
//         )}

//         {/* Empty State */}
//         {!orgPerformer && !loading && !error && (
//           <div className="text-center py-12">
//             <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
//               <FiAward className="text-2xl text-gray-400 dark:text-gray-600" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No Data Yet</h3>
//             <p className="text-gray-500 dark:text-gray-400 text-sm">Select your filters and click "Find Top Performer" to see results.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import useRatingStore from "../../../store/useRatingNewStore";
import useDepartmentStore from "../../../store/departmentStore";
import useDesignationStore from "../../../store/designationStore";
import { getWeeksInMonth } from "./calendarUtils";
import UserProfileModal from "./UserProfileModal";

import {
  MdOutlineDateRange,
  MdOutlineAutoGraph,
} from "react-icons/md";
import {
  BsCalendar3Week,
  BsCalendar2Month,
  BsCalendar2Range,
  BsBuilding,
  BsPerson,
  BsCalendarDate,
  BsChevronRight,
} from "react-icons/bs";
import { FiFilter, FiUser, FiAward } from "react-icons/fi";

const FREQUENCIES = [
  { value: "daily", label: "Daily", icon: <MdOutlineDateRange className="text-lg" /> },
  // { value: "weekly", label: "Weekly", icon: <BsCalendar3Week className="text-lg" /> },
  { value: "monthly", label: "Monthly", icon: <BsCalendar2Month className="text-lg" /> },
  { value: "yearly", label: "Yearly", icon: <BsCalendar2Range className="text-lg" /> },
];

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

export default function TopPerformerCard() {
  const { getOrganizationTopPerformer, loading, error } = useRatingStore();
  const { departments, fetchDepartments } = useDepartmentStore();
  const { designations, fetchDesignations } = useDesignationStore();

  // Load filters
  useEffect(() => {
    fetchDepartments();
    fetchDesignations();
  }, [fetchDepartments, fetchDesignations]);

  // Org filters
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [showFilters, setShowFilters] = useState(true);

  // Date filters (removed end date/week fields - will use start values for both)
  const [frequency, setFrequency] = useState("daily");
  const [startDate, setStartDate] = useState("");
  const [startYear, setStartYear] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [startWeek, setStartWeek] = useState("");
  const [startWeeks, setStartWeeks] = useState([]);

  // Result
  const [orgPerformer, setOrgPerformer] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Reset date fields on frequency change
  useEffect(() => {
    const now = new Date();
    const iso = now.toISOString().slice(0, 10);
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");

    setStartDate(frequency === "daily" ? iso : "");
    setStartYear(frequency !== "daily" ? String(y) : "");
    setStartMonth(
      frequency === "weekly" || frequency === "monthly" ? m : ""
    );
    setStartWeek("");
    setStartWeeks([]);
  }, [frequency]);

  // Weekly → startWeeks
  useEffect(() => {
    if (frequency !== "weekly") return;
    if (startYear && startMonth) {
      const w = getWeeksInMonth(+startYear, +startMonth - 1);
      setStartWeeks(w);
      if (!startWeek && w.length) setStartWeek(w[0].value);
    }
  }, [frequency, startYear, startMonth, startWeek]);

  // Fetch top performer
  const handleFetch = async () => {
    const params = { frequency };
    if (department) params.department = department;
    if (designation) params.designation = designation;

    if (frequency === "daily") {
      if (!startDate)
        return toast.error("Please select a date");
      // Use same date for both start and end
      params.startDate = startDate;
      params.endDate = startDate;
    } else if (frequency === "weekly") {
      if (!(startYear && startMonth && startWeek))
        return toast.error("Please complete your week selection");
      // Use same week for both start and end
      Object.assign(params, {
        startYear,
        endYear: startYear,
        startMonth,
        endMonth: startMonth,
        startWeek,
        endWeek: startWeek,
      });
    } else if (frequency === "monthly") {
      if (!(startYear && startMonth))
        return toast.error("Please select year and month");
      // Use same month for both start and end
      Object.assign(params, { 
        startYear, 
        endYear: startYear, 
        startMonth, 
        endMonth: startMonth 
      });
    } else if (frequency === "yearly") {
      if (!startYear)
        return toast.error("Please select a year");
      // Use same year for both start and end
      Object.assign(params, { 
        startYear, 
        endYear: startYear 
      });
    }

    try {
      const res = await getOrganizationTopPerformer(params);
      if (res.success && res.data) {
        setOrgPerformer(res.data);
      } else {
        toast.error(res.message || "No data found");
      }
    } catch (err) {
      toast.error(err.message || "Fetch error");
    }
  };

  // Human-friendly period label
  let periodLabel = "";
  if (frequency === "daily") periodLabel = startDate;
  if (frequency === "weekly")
    periodLabel = `Week ${startWeek} of ${
      MONTHS[+startMonth - 1]
    } ${startYear}`;
  if (frequency === "monthly")
    periodLabel = `${MONTHS[+startMonth - 1]} ${startYear}`;
  if (frequency === "yearly") periodLabel = `${startYear}`;

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 mt-6 overflow-hidden">
      {/* Header */}
      <div className="bg-indigo-600 dark:bg-indigo-700 p-5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white bg-opacity-20 rounded-lg">
            <FiAward className="text-xl text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Top Performer</h2>
        </div>
        <button
          onClick={() => setShowFilters((f) => !f)}
          className="flex items-center space-x-2 text-white bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all duration-200"
        >
          <FiFilter className="text-sm" />
          <span className="text-sm font-medium">Filters</span>
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          {/* Department & Designation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Department
              </label>
              <div className="relative">
                <BsBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <select
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="">All Departments</option>
                  {departments && departments.map((d) => (
                    <option key={d._id} value={d.department}>
                      {d.department}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Designation
              </label>
              <div className="relative">
                <BsPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <select
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                >
                  <option value="">All Designations</option>
                  {designations && designations.map((d) => (
                    <option key={d.id} value={d.designation}>
                      {d.designation}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Time Period
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {FREQUENCIES.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFrequency(f.value)}
                  className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 ${
                    frequency === f.value
                      ? "bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300 border-indigo-400 dark:border-indigo-500"
                      : "border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <div className="mb-2">{f.icon}</div>
                  <span className="text-xs font-medium">{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date Inputs */}
          <div className="bg-white dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
            {frequency === "daily" && (
              <div className="max-w-sm">
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Select Date</label>
                <input
                  type="date"
                  className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
            )}
            
            {frequency === "weekly" && (
              <div className="max-w-md">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Select Week</h4>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Year</label>
                    <input
                      type="number"
                      placeholder="2024"
                      className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                      value={startYear}
                      onChange={(e) => setStartYear(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Month</label>
                    <select
                      className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                      value={startMonth}
                      onChange={(e) => setStartMonth(e.target.value)}
                    >
                      <option value="">Select Month</option>
                      {MONTHS.map((m, i) => (
                        <option
                          key={m}
                          value={String(i + 1).padStart(2, "0")}
                        >
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Week</label>
                  <select
                    className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                    value={startWeek}
                    onChange={(e) => setStartWeek(e.target.value)}
                  >
                    <option value="">Select Week</option>
                    {startWeeks && startWeeks.map((w) => (
                      <option key={w.value} value={w.value}>
                        {w.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            
            {frequency === "monthly" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Year</label>
                  <input
                    type="number"
                    placeholder="2024"
                    className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                    value={startYear}
                    onChange={(e) => setStartYear(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Month</label>
                  <select
                    className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                    value={startMonth}
                    onChange={(e) => setStartMonth(e.target.value)}
                  >
                    <option value="">Select Month</option>
                    {MONTHS.map((m, i) => (
                      <option
                        key={m}
                        value={String(i + 1).padStart(2, "0")}
                      >
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            
            {frequency === "yearly" && (
              <div className="max-w-sm">
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Year</label>
                <input
                  type="number"
                  placeholder="2024"
                  className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                />
              </div>
            )}
          </div>

          <button
            onClick={handleFetch}
            disabled={loading}
            className="w-full py-4 bg-indigo-600 dark:bg-indigo-500 text-white rounded-xl font-semibold flex items-center justify-center space-x-3 hover:bg-indigo-700 dark:hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <MdOutlineAutoGraph className="text-xl" />
            <span>{loading ? "Searching..." : "Find Top Performer"}</span>
          </button>
        </div>
      )}

      <div className="p-6">
        {loading && (
          <div className="text-center py-12">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="w-16 h-16 border-4 border-indigo-200 dark:border-indigo-800 rounded-full animate-spin border-t-indigo-600 dark:border-t-indigo-400"></div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Searching for top performers...</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">This may take a moment</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900 dark:bg-opacity-20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-xl text-center">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Error</span>
            </div>
            <p>{error}</p>
          </div>
        )}
        {orgPerformer && !loading && (
          <div className="bg-gray-500 dark:bg-gray-900 text-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-orange-500 rounded-full">
                    <FiAward className="text-xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white leading-tight">
                      {orgPerformer.employee.first_Name} {orgPerformer.employee.last_Name}
                    </h3>
                    <p className="text-indigo-200 text-sm mt-1">Top Performer</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="inline-flex items-center bg-orange-500 text-white px-4 py-2 rounded-full">
                    <span className="text-lg font-bold mr-1">✦</span>
                    <span className="text-xl font-bold">{orgPerformer.averagePercent}%</span>
                  </div>
                  {orgPerformer.category && (
                    <p className="text-xs text-indigo-300 mt-2">{orgPerformer.category}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-indigo-700 flex items-center justify-center border-2 border-indigo-600">
                    {orgPerformer.employee.user_Avatar ? (
                      <img
                        src={orgPerformer.employee.user_Avatar}
                        alt="Employee Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FiUser className="text-3xl text-indigo-300" />
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center border-2 border-indigo-800">
                    <span className="text-xs font-bold">{orgPerformer.averagePercent}%</span>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-indigo-100">
                    <div className="mb-2">
                      <span className="text-xs text-indigo-300">Employee ID:</span>
                      <span className="ml-2 font-medium">{orgPerformer.employee.employee_Id || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="flex items-center space-x-3 bg-indigo-700 dark:bg-indigo-800 rounded-lg p-4">
                  <div className="p-2 bg-indigo-600 rounded-lg">
                    <BsBuilding className="text-sm text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-indigo-200">Department</p>
                    <p className="text-sm font-semibold text-white truncate">{orgPerformer.employee.department}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 bg-indigo-700 dark:bg-indigo-800 rounded-lg p-4">
                  <div className="p-2 bg-purple-600 rounded-lg">
                    <BsPerson className="text-sm text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-indigo-200">Designation</p>
                    <p className="text-sm font-semibold text-white truncate">{orgPerformer.employee.designation}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 bg-indigo-700 dark:bg-indigo-800 rounded-lg p-4">
                  <div className="p-2 bg-emerald-600 rounded-lg">
                    <BsCalendarDate className="text-sm text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-indigo-200">Performance Period</p>
                    <p className="text-sm font-semibold text-white truncate">{periodLabel}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-indigo-700 dark:bg-indigo-800 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">{orgPerformer.ratingCount}</div>
                  <div className="text-xs text-indigo-200">Total Ratings</div>
                </div>
                <div className="bg-indigo-700 dark:bg-indigo-800 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">{orgPerformer.averagePercent}%</div>
                  <div className="text-xs text-indigo-200">Average Score</div>
                </div>
              </div>
              <div className="pt-4 border-t border-indigo-600">
                <button 
                  onClick={() => setIsProfileModalOpen(true)}
                  className="w-full flex items-center justify-center space-x-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg transition-all duration-200"
                >
                  <span>View Full Profile</span>
                  <BsChevronRight className="text-xs" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!orgPerformer && !loading && !error && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiAward className="text-2xl text-gray-400 dark:text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No Data Yet</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Select your filters and click "Find Top Performer" to see results.</p>
          </div>
        )}
      </div>
      
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={orgPerformer?.employee}
        performanceData={orgPerformer}
      />
    </div>
  );
}