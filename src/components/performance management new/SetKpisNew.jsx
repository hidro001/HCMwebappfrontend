// import React, { useEffect, useState } from "react";

// import {
//   FiTrash2 as Trash2,
//   FiEdit as Edit,
//   FiPlus as Plus,
//   FiChevronDown as ChevronDown,
//   FiChevronRight as ChevronRight,
//   FiSave as Save,
//   FiAlertCircle as AlertCircle,
//   FiRefreshCw as RefreshCw,
//   FiCalendar as Calendar,
//   FiAward as Award,
//   FiTarget as Target,
//   FiTag as Tag,
//   FiFileText as FileText,
// } from "react-icons/fi";

// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-hot-toast";

// // Zustand stores
// import useDesignationStore from "../../store/designationStore";
// import useKpiSetStore from "../../store/useKpiNewStore";

// // Common components
// import FullScreenLoader from "../common/FullScreenLoader";
// import ConfirmationDialog from "../common/ConfirmationDialog";

// function SetKpis() {
//   /* ---------------------------------------------------------------------
//         Zustand stores
//      --------------------------------------------------------------------- */
//   const {
//     designations,
//     loading: designationLoading,
//     fetchDesignations,
//   } = useDesignationStore();
//   const {
//     createKpiSet,
//     getKpiSet,
//     kpiSet,
//     updateKpiSet,
//     deleteKpiSet,
//     loading: kpiLoading,
//     error: kpiError,
//   } = useKpiSetStore();

//   /* ---------------------------------------------------------------------
//         Local UI state
//      --------------------------------------------------------------------- */
//   const [selectedDesignation, setSelectedDesignation] = useState("");
//   const [frequency, setFrequency] = useState("daily");
//   const [version, setVersion] = useState("");

//   // KPI fields
//   const [kpis, setKpis] = useState([]);
//   const [totalMarks, setTotalMarks] = useState(100);
//   const [kpiName, setKpiName] = useState("");
//   const [marks, setMarks] = useState("");
//   const [type, setType] = useState("formal");
//   const [target, setTarget] = useState("");
//   const [category, setCategory] = useState("");
//   const [editIndex, setEditIndex] = useState(null);
//   const [formExpanded, setFormExpanded] = useState(true);
//   const [hoveredRow, setHoveredRow] = useState(null);

//   // “Has the user made any change this session?”
//   const [hasEdited, setHasEdited] = useState(false);

//   // Confirmation dialog
//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [confirmAction, setConfirmAction] = useState(() => null);
//   const [confirmTitle, setConfirmTitle] = useState("");
//   const [confirmMessage, setConfirmMessage] = useState("");

//   /* ---------------------------------------------------------------------
//         Effects
//      --------------------------------------------------------------------- */
//   useEffect(() => {
//     fetchDesignations();
//   }, [fetchDesignations]);

//   useEffect(() => {
//     if (!designationLoading && designations.length > 0) {
//       setSelectedDesignation((prev) => prev || designations[0].designation);
//     }
//   }, [designationLoading, designations]);

//   useEffect(() => {
//     if (!selectedDesignation) return;
//     handleAutoFetchKpiSet();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [selectedDesignation, frequency, version]);

//   useEffect(() => {
//     setTotalMarks(computeMarkSum(kpis));
//   }, [kpis]);

//   /* ---------------------------------------------------------------------
//         Helper functions
//      --------------------------------------------------------------------- */
//   const computeMarkSum = (arr) =>
//     arr.reduce((acc, item) => acc + Number(item.marks), 0);

//   // Fetch KPI‑set for (designation, frequency, version)
//   const handleAutoFetchKpiSet = async () => {
//     try {
//       const data = await getKpiSet({
//         designation: selectedDesignation,
//         frequency,
//         version: version || "",
//       });
//       setKpis(data?.kpis || []);
//       setEditIndex(null);
//       setHasEdited(false);
//     } catch (err) {
//       // If there's no document for this freq, clear the old data
//       if (err.response?.status === 404) {
//         setKpis([]);
//         setEditIndex(null);
//         setHasEdited(false);
//         // IMPORTANT: Clear the old kpiSet in Zustand,
//         // so we won't accidentally reuse the old _id
//         useKpiSetStore.setState({ kpiSet: null });
//       } else {
//         toast.error(err.response?.data?.message || err.message);
//       }
//     }
//   };

//   /* ---------------------------------------------------------------------
//         KPI row operations
//      --------------------------------------------------------------------- */
//   const handleAddOrUpdateKpi = () => {
//     if (!kpiName.trim()) {
//       toast.error("Enter KPI name");
//       return;
//     }
//     if (!marks) {
//       toast.error("Enter KPI marks");
//       return;
//     }

//     const newItem = {
//       kpiName,
//       marks: Number(marks),
//       type,
//       category,
//       ...(type === "formal" ? { target: Number(target) || 0 } : {}),
//     };

//     if (editIndex !== null) {
//       const updated = [...kpis];
//       updated[editIndex] = newItem;

//       if (computeMarkSum(updated) > 100) {
//         toast.error("Total marks cannot exceed 100!");
//         return;
//       }
//       setKpis(updated);
//       setEditIndex(null);
//       toast.success("KPI updated!");
//     } else {
//       const sum = computeMarkSum([...kpis, newItem]);
//       if (sum > 100) {
//         toast.error("Total marks cannot exceed 100!");
//         return;
//       }
//       setKpis([...kpis, newItem]);
//       toast.success("KPI added!");
//     }

//     setKpiName("");
//     setMarks("");
//     setType("formal");
//     setTarget("");
//     setCategory("");
//     setHasEdited(true);
//   };

//   const handleEditKpi = (index) => {
//     const item = kpis[index];
//     setKpiName(item.kpiName);
//     setMarks(item.marks);
//     setType(item.type);
//     setTarget(item.target || "");
//     setCategory(item.category || "");
//     setEditIndex(index);
//     setFormExpanded(true);
//     // user initiated edit — enable the “Update KPI Set” when they’re ready
//     setHasEdited(true);
//   };

//   const handleDeleteKpi = (index) => {
//     setKpis(kpis.filter((_, i) => i !== index));
//     setHasEdited(true);
//     toast.success("KPI removed.");
//   };

//   /* ---------------------------------------------------------------------
//         CRUD with backend
//      --------------------------------------------------------------------- */
//   const handleCreateKpiSet = async () => {
//     if (!selectedDesignation) return toast.error("Select a designation.");
//     if (!frequency) return toast.error("Select a frequency.");
//     const sum = computeMarkSum(kpis);
//     if (sum !== 100) return toast.error("Total KPI marks must equal 100.");

//     const payload = {
//       designation: selectedDesignation,
//       frequency,
//       version: version ? Number(version) : undefined,
//       kpis,
//       totalMarks: sum,
//       createdBy: "adminUser",
//     };

//     try {
//       const result = await createKpiSet(payload);
//       toast.success("KPI Set created!");
//       // Store newly created doc in Zustand, so we have the correct _id
//       useKpiSetStore.setState({ kpiSet: result.data });
//       setKpis(result.data.kpis || []);
//       setHasEdited(false);
//     } catch (err) {
//       toast.error(err.response?.data?.message || err.message);
//     }
//   };

//   const handleUpdateKpiSet = async () => {
//     if (!kpiSet?._id) {
//       toast.error("No KPI set loaded to update (fetch or create first).");
//       return;
//     }

//     const sum = computeMarkSum(kpis);
//     if (sum !== 100) {
//       toast.error("Total KPI marks must equal 100.");
//       return;
//     }

//     const payload = {
//       designation: selectedDesignation,
//       frequency,
//       kpis,
//       totalMarks: sum,
//       // 👇 add `version` ONLY if the input field is not empty
//       ...(version !== "" ? { version: Number(version) } : {}),
//       updatedBy: "adminUser",
//     };

//     try {
//       await updateKpiSet(kpiSet._id, payload);
//       toast.success("KPI Set updated!");
//       // refresh UI with latest data
//       handleAutoFetchKpiSet();
//     } catch (err) {
//       toast.error(err.response?.data?.message || err.message);
//     }
//   };

//   const confirmDeleteKpiSet = async () => {
//     if (!kpiSet?._id) return toast.error("No KPI set to delete.");
//     try {
//       await deleteKpiSet(kpiSet._id);
//       toast.success("KPI Set deleted!");
//       setKpis([]);
//       // Also clear global store so UI sees no doc loaded
//       useKpiSetStore.setState({ kpiSet: null });
//     } catch (err) {
//       toast.error(err.response?.data?.message || err.message);
//     }
//   };

//   const handleDeleteKpiSet = () => {
//     setConfirmTitle("Delete KPI Set?");
//     setConfirmMessage(
//       "Are you sure you want to permanently delete this KPI Set?"
//     );
//     setConfirmAction(() => confirmDeleteKpiSet);
//     setConfirmOpen(true);
//   };

//   const onConfirmDialog = () => {
//     setConfirmOpen(false);
//     confirmAction && confirmAction();
//   };

//   /* ---------------------------------------------------------------------
//         Derived flags for button states
//      --------------------------------------------------------------------- */
//   const isExistingSet = !!kpiSet?._id;
//   const isCreateEnabled = !isExistingSet && totalMarks === 100 && kpis.length > 0;
//   const isUpdateEnabled = isExistingSet && hasEdited && totalMarks === 100;
//   const isDeleteEnabled = isExistingSet;

//   /* ---------------------------------------------------------------------
//         Early loading screen
//      --------------------------------------------------------------------- */
//   if (designationLoading || kpiLoading) return <FullScreenLoader />;

//   /* ---------------------------------------------------------------------
//         Progress bar colours
//      --------------------------------------------------------------------- */
//   const completionStatus =
//     totalMarks === 100
//       ? "complete"
//       : totalMarks > 90
//       ? "almost"
//       : totalMarks > 50
//       ? "halfway"
//       : "incomplete";

//   const progressColors = {
//     complete: "bg-emerald-500 dark:bg-emerald-400",
//     almost: "bg-yellow-500 dark:bg-yellow-400",
//     halfway: "bg-blue-500 dark:bg-blue-400",
//     incomplete: "bg-red-500 dark:bg-red-400",
//   };

//   /* ---------------------------------------------------------------------
//         JSX
//      --------------------------------------------------------------------- */
//   return (
//     <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
//       {/* ============================================================== */}
//       {/*  Header */}
//       {/* ============================================================== */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
//           KPI Manager
//         </h1>
//       </div>

//       {/* ============================================================== */}
//       {/*  Confirmation dialog */}
//       {/* ============================================================== */}
//       <ConfirmationDialog
//         open={confirmOpen}
//         title={confirmTitle}
//         message={confirmMessage}
//         onConfirm={onConfirmDialog}
//         onCancel={() => setConfirmOpen(false)}
//         confirmText="Delete"
//         cancelText="Cancel"
//       />

//       {/* ============================================================== */}
//       {/*  KPI‑set selector card  */}
//       {/* ============================================================== */}
//       <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
//         <div className="p-6 border-b border-gray-100 dark:border-gray-700">
//           <h2 className="text-xl font-semibold flex items-center">
//             <FileText className="mr-2 h-5 w-5 text-indigo-500 dark:text-indigo-400" />
//             KPI Set Configuration
//           </h2>
//         </div>

//         {/* -------- selector inputs -------- */}
//         <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Designation */}
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Designation
//             </label>
//             <div className="relative">
//               <select
//                 className="block w-full pl-3 pr-10 py-3 rounded-lg border-0 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
//                 value={selectedDesignation}
//                 onChange={(e) => setSelectedDesignation(e.target.value)}
//               >
//                 <option value="">--Select--</option>
//                 {designations.map((d) => (
//                   <option key={d.id} value={d.designation}>
//                     {d.designation}
//                   </option>
//                 ))}
//               </select>
//               <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                 <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
//               </div>
//             </div>
//           </div>

//           {/* Frequency */}
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               <span className="flex items-center">
//                 <Calendar className="mr-1 h-4 w-4" />
//                 Frequency
//               </span>
//             </label>
//             <div className="relative">
//               <select
//                 className="block w-full pl-3 pr-10 py-3 rounded-lg border-0 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
//                 value={frequency}
//                 onChange={(e) => setFrequency(e.target.value)}
//               >
//                 <option value="daily">Daily</option>
//                 <option value="weekly">Weekly</option>
//                 <option value="monthly">Monthly</option>
//                 <option value="yearly">Yearly</option>
//               </select>
//               <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                 <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
//               </div>
//             </div>
//           </div>

//           {/* Version */}
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Version (optional)
//             </label>
//             <input
//               type="number"
//               className="block w-full px-3 py-3 rounded-lg border-0 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
//               value={version}
//               onChange={(e) => setVersion(e.target.value)}
//               placeholder="e.g. 2"
//             />
//           </div>
//         </div>

//         {/* -------- refresh button -------- */}
//         <div className="px-6 pb-6">
//           <button
//             onClick={handleAutoFetchKpiSet}
//             className="flex items-center px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-lg"
//           >
//             <RefreshCw className="h-4 w-4 mr-2" />
//             Refresh
//           </button>
//         </div>
//       </div>

//       {/* ============================================================== */}
//       {/*  KPI entry form  */}
//       {/* ============================================================== */}
//       <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
//         <div
//           className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center cursor-pointer"
//           onClick={() => setFormExpanded(!formExpanded)}
//         >
//           <h2 className="text-xl font-semibold flex items-center">
//             <Plus className="mr-2 h-5 w-5 text-green-500" />
//             {editIndex !== null ? "Edit KPI" : "Add New KPI"}
//           </h2>
//           {formExpanded ? (
//             <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
//           ) : (
//             <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400" />
//           )}
//         </div>

//         <AnimatePresence>
//           {formExpanded && (
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="overflow-hidden"
//             >
//               <div className="p-6 space-y-6">
//                 {/* ---------------- inputs grid ---------------- */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                   {/* KPI Name */}
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       KPI Name
//                     </label>
//                     <input
//                       className="block w-full px-3 py-3 rounded-lg border-0 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
//                       value={kpiName}
//                       onChange={(e) => setKpiName(e.target.value)}
//                       placeholder="e.g. Daily Sales"
//                     />
//                   </div>

//                   {/* Marks */}
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       <span className="flex items-center">
//                         <Award className="mr-1 h-4 w-4" />
//                         Marks
//                       </span>
//                     </label>
//                     <input
//                       type="number"
//                       className="block w-full px-3 py-3 rounded-lg border-0 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
//                       value={marks}
//                       onChange={(e) => setMarks(e.target.value)}
//                       placeholder="e.g. 50"
//                     />
//                   </div>

//                   {/* Type */}
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       Type
//                     </label>
//                     <div className="relative">
//                       <select
//                         className="block w-full pl-3 pr-10 py-3 rounded-lg border-0 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
//                         value={type}
//                         onChange={(e) => setType(e.target.value)}
//                       >
//                         <option value="formal">Formal</option>
//                         <option value="informal">Informal</option>
//                       </select>
//                       <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                         <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Target (formal only) */}
//                   {type === "formal" && (
//                     <div className="space-y-2">
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                         <span className="flex items-center">
//                           <Target className="mr-1 h-4 w-4" />
//                           Target
//                         </span>
//                       </label>
//                       <input
//                         type="number"
//                         className="block w-full px-3 py-3 rounded-lg border-0 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
//                         value={target}
//                         onChange={(e) => setTarget(e.target.value)}
//                         placeholder="e.g. 5"
//                       />
//                     </div>
//                   )}

//                   {/* Category (always) */}
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       <span className="flex items-center">
//                         <Tag className="mr-1 h-4 w-4" />
//                         Category
//                       </span>
//                     </label>
//                     <input
//                       className="block w-full px-3 py-3 rounded-lg border-0 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
//                       value={category}
//                       onChange={(e) => setCategory(e.target.value)}
//                       placeholder="e.g. Compliance"
//                     />
//                   </div>
//                 </div>

//                 {/* -------- Add / Update row button -------- */}
//                 <div className="flex justify-end">
//                   <button
//                     onClick={handleAddOrUpdateKpi}
//                     className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
//                       editIndex !== null
//                         ? "bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700"
//                         : "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
//                     }`}
//                   >
//                     {editIndex !== null ? (
//                       <>
//                         <Save className="h-4 w-4" />
//                         Update KPI
//                       </>
//                     ) : (
//                       <>
//                         <Plus className="h-4 w-4" />
//                         Add KPI
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* ============================================================== */}
//       {/*  Allocation & top‑level buttons  */}
//       {/* ============================================================== */}
//       <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* ----- allocation card ----- */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
//           <div className="p-6 flex flex-col">
//             <h3 className="text-lg font-medium mb-4">Total Allocation</h3>

//             <div className="flex justify-between items-center mb-2">
//               <span className="text-gray-600 dark:text-gray-400">
//                 Allocated Marks:
//               </span>
//               <span
//                 className={`text-lg font-semibold ${
//                   totalMarks === 100
//                     ? "text-green-500 dark:text-green-400"
//                     : totalMarks > 90
//                     ? "text-yellow-500 dark:text-yellow-400"
//                     : "text-red-500 dark:text-red-400"
//                 }`}
//               >
//                 {totalMarks}/100
//               </span>
//             </div>

//             <div className="mt-4">
//               <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full">
//                 <div
//                   className={`h-full rounded-full ${progressColors[completionStatus]}`}
//                   style={{ width: `${Math.min(totalMarks, 100)}%` }}
//                 />
//               </div>

//               <div className="mt-2 text-sm">
//                 {totalMarks === 100 ? (
//                   <span className="text-green-500 dark:text-green-400 flex items-center">
//                     &#10003; Perfect allocation
//                   </span>
//                 ) : totalMarks > 100 ? (
//                   <span className="text-red-500 dark:text-red-400 flex items-center">
//                     <AlertCircle className="h-4 w-4 mr-1" />
//                     Over‑allocated by {totalMarks - 100}
//                   </span>
//                 ) : (
//                   <span className="text-yellow-500 dark:text-yellow-400 flex items-center">
//                     <AlertCircle className="h-4 w-4 mr-1" />
//                     Under‑allocated by {100 - totalMarks}
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* ----- create / update / delete buttons ----- */}
//             <div className="mt-6 space-y-2">
//               <button
//                 onClick={handleCreateKpiSet}
//                 disabled={!isCreateEnabled}
//                 className={`w-full flex justify-center items-center py-2 px-4 rounded-lg text-white transition-colors ${
//                   isCreateEnabled
//                     ? "bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700"
//                     : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
//                 }`}
//               >
//                 <Save className="h-4 w-4 mr-2" />
//                 Create KPI Set
//               </button>

//               <button
//                 onClick={handleUpdateKpiSet}
//                 disabled={!isUpdateEnabled}
//                 className={`w-full flex justify-center items-center py-2 px-4 rounded-lg text-white transition-colors ${
//                   isUpdateEnabled
//                     ? "bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700"
//                     : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
//                 }`}
//               >
//                 <RefreshCw className="h-4 w-4 mr-2" />
//                 Update KPI Set
//               </button>

//               <button
//                 onClick={handleDeleteKpiSet}
//                 disabled={!isDeleteEnabled}
//                 className={`w-full flex justify-center items-center py-2 px-4 rounded-lg text-white transition-colors ${
//                   isDeleteEnabled
//                     ? "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
//                     : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
//                 }`}
//               >
//                 <Trash2 className="h-4 w-4 mr-2" />
//                 Delete KPI Set
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ============================================================== */}
//         {/*  KPI list table  */}
//         {/* ============================================================== */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg md:col-span-2">
//           <div className="p-6 border-b border-gray-100 dark:border-gray-700">
//             <h2 className="text-xl font-semibold flex items-center">
//               <FileText className="mr-2 h-5 w-5 text-indigo-500 dark:text-indigo-400" />
//               KPI List
//             </h2>
//           </div>

//           {/* -------- table / empty state -------- */}
//           <div className="overflow-x-auto">
//             {kpis.length === 0 ? (
//               <div className="p-12 flex flex-col items-center text-gray-500 dark:text-gray-400">
//                 <svg
//                   className="h-16 w-16 mb-4 opacity-30"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={1}
//                     d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//                   />
//                 </svg>
//                 <p className="text-lg font-medium">No KPIs Added Yet</p>
//                 <p className="mt-1 text-sm text-center">
//                   Add your first KPI using the form above.
//                   <br />
//                   Remember the total marks must be exactly 100.
//                 </p>
//               </div>
//             ) : (
//               <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                 <thead className="bg-gray-50 dark:bg-gray-900/50">
//                   <tr>
//                     {["KPI Name", "Type", "Marks", "Target", "Category", ""].map(
//                       (h) => (
//                         <th
//                           key={h}
//                           className={`${
//                             h ? "text-left" : "text-right"
//                           } px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase`}
//                         >
//                           {h || "Actions"}
//                         </th>
//                       )
//                     )}
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                   {kpis.map((kpi, index) => (
//                     <motion.tr
//                       key={index}
//                       className={`${
//                         hoveredRow === index
//                           ? "bg-gray-50 dark:bg-gray-700/50"
//                           : ""
//                       } transition-colors`}
//                       onMouseEnter={() => setHoveredRow(index)}
//                       onMouseLeave={() => setHoveredRow(null)}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.3, delay: index * 0.05 }}
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         {kpi.kpiName}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm">
//                         <span
//                           className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                             kpi.type === "formal"
//                               ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
//                               : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
//                           }`}
//                         >
//                           {kpi.type}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         {kpi.marks}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm">
//                         {kpi.target || "-"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm">
//                         {kpi.category ? (
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
//                             {kpi.category}
//                           </span>
//                         ) : (
//                           "-"
//                         )}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
//                         <div className="flex items-center justify-end space-x-3">
//                           <button
//                             onClick={() => handleEditKpi(index)}
//                             className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
//                           >
//                             <Edit className="h-4 w-4" />
//                           </button>
//                           <button
//                             onClick={() => handleDeleteKpi(index)}
//                             className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ============================================================== */}
//       {/*  Error banner  */}
//       {/* ============================================================== */}
//       {kpiError && (
//         <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
//           <div className="flex items-center">
//             <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" />
//             <p className="text-red-700 dark:text-red-400 font-medium">
//               {kpiError}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SetKpis;



import React, { useEffect, useState } from "react";
import {
  FiTrash2 as Trash2,
  FiEdit as Edit,
  FiPlus as Plus,
  FiChevronDown as ChevronDown,
  FiChevronRight as ChevronRight,
  FiSave as Save,
  FiAlertCircle as AlertCircle,
  FiRefreshCw as RefreshCw,
  FiCalendar as Calendar,
  FiAward as Award,
  FiTarget as Target,
  FiTag as Tag,
  FiFileText as FileText,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

// Zustand stores
import useDesignationStore from "../../store/designationStore";
import useKpiSetStore from "../../store/useKpiNewStore";

// Common components
import FullScreenLoader from "../common/FullScreenLoader";
import ConfirmationDialog from "../common/ConfirmationDialog";

function SetKpis() {
  /* ---------------------------------------------------------------------
        Zustand stores
     --------------------------------------------------------------------- */
  const {
    designations,
    loading: designationLoading,
    fetchDesignations,
  } = useDesignationStore();
  const {
    createKpiSet,
    getKpiSet,
    kpiSet,
    updateKpiSet,
    deleteKpiSet,
    loading: kpiLoading,
    error: kpiError,
  } = useKpiSetStore();

  /* ---------------------------------------------------------------------
        Local UI state
     --------------------------------------------------------------------- */
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [version, setVersion] = useState("");

  // KPI fields
  const [kpis, setKpis] = useState([]);
  const [totalMarks, setTotalMarks] = useState(100);
  const [kpiName, setKpiName] = useState("");
  const [marks, setMarks] = useState("");
  const [type, setType] = useState("quantitative"); // changed default from "formal" to "quantitative"
  const [target, setTarget] = useState("");
  const [category, setCategory] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [formExpanded, setFormExpanded] = useState(true);
  const [hoveredRow, setHoveredRow] = useState(null);

  // “Has the user made any change this session?”
  const [hasEdited, setHasEdited] = useState(false);

  // Confirmation dialog
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(() => null);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");

  /* ---------------------------------------------------------------------
        Effects
     --------------------------------------------------------------------- */
  useEffect(() => {
    fetchDesignations();
  }, [fetchDesignations]);

  useEffect(() => {
    if (!designationLoading && designations.length > 0) {
      setSelectedDesignation((prev) => prev || designations[0].designation);
    }
  }, [designationLoading, designations]);

  useEffect(() => {
    if (!selectedDesignation) return;
    handleAutoFetchKpiSet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDesignation, frequency, version]);

  useEffect(() => {
    setTotalMarks(computeMarkSum(kpis));
  }, [kpis]);

  /* ---------------------------------------------------------------------
        Helper functions
     --------------------------------------------------------------------- */
  const computeMarkSum = (arr) =>
    arr.reduce((acc, item) => acc + Number(item.marks), 0);

  // Fetch KPI‑set for (designation, frequency, version)
  const handleAutoFetchKpiSet = async () => {
    try {
      const data = await getKpiSet({
        designation: selectedDesignation,
        frequency,
        version: version || "",
      });
      setKpis(data?.kpis || []);
      setEditIndex(null);
      setHasEdited(false);
    } catch (err) {
      // If there's no document for this freq, clear the old data
      if (err.response?.status === 404) {
        setKpis([]);
        setEditIndex(null);
        setHasEdited(false);
        // Clear the old kpiSet in Zustand
        useKpiSetStore.setState({ kpiSet: null });
      } else {
        toast.error(err.response?.data?.message || err.message);
      }
    }
  };

  /* ---------------------------------------------------------------------
        KPI row operations
     --------------------------------------------------------------------- */
  const handleAddOrUpdateKpi = () => {
    if (!kpiName.trim()) {
      toast.error("Enter KPI name");
      return;
    }
    if (!marks) {
      toast.error("Enter KPI marks");
      return;
    }

    const newItem = {
      kpiName,
      marks: Number(marks),
      type,
      category,
      ...(type === "quantitative" ? { target: Number(target) || 0 } : {}),
    };

    if (editIndex !== null) {
      const updated = [...kpis];
      updated[editIndex] = newItem;

      if (computeMarkSum(updated) > 100) {
        toast.error("Total marks cannot exceed 100!");
        return;
      }
      setKpis(updated);
      setEditIndex(null);
      toast.success("KPI updated!");
    } else {
      const sum = computeMarkSum([...kpis, newItem]);
      if (sum > 100) {
        toast.error("Total marks cannot exceed 100!");
        return;
      }
      setKpis([...kpis, newItem]);
      toast.success("KPI added!");
    }

    setKpiName("");
    setMarks("");
    setType("quantitative");
    setTarget("");
    setCategory("");
    setHasEdited(true);
  };

  const handleEditKpi = (index) => {
    const item = kpis[index];
    setKpiName(item.kpiName);
    setMarks(item.marks);
    setType(item.type);
    setTarget(item.target || "");
    setCategory(item.category || "");
    setEditIndex(index);
    setFormExpanded(true);
    setHasEdited(true);
  };

  const handleDeleteKpi = (index) => {
    setKpis(kpis.filter((_, i) => i !== index));
    setHasEdited(true);
    toast.success("KPI removed.");
  };

  /* ---------------------------------------------------------------------
        CRUD with backend
     --------------------------------------------------------------------- */
  const handleCreateKpiSet = async () => {
    if (!selectedDesignation) return toast.error("Select a designation.");
    if (!frequency) return toast.error("Select a frequency.");
    const sum = computeMarkSum(kpis);
    if (sum !== 100) return toast.error("Total KPI marks must equal 100.");

    const payload = {
      designation: selectedDesignation,
      frequency,
      version: version ? Number(version) : undefined,
      kpis,
      totalMarks: sum,
      createdBy: "adminUser",
    };

    try {
      const result = await createKpiSet(payload);
      toast.success("KPI Set created!");
      // Store newly created doc in Zustand, so we have the correct _id
      useKpiSetStore.setState({ kpiSet: result.data });
      setKpis(result.data.kpis || []);
      setHasEdited(false);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const handleUpdateKpiSet = async () => {
    if (!kpiSet?._id) {
      toast.error("No KPI set loaded to update (fetch or create first).");
      return;
    }

    const sum = computeMarkSum(kpis);
    if (sum !== 100) {
      toast.error("Total KPI marks must equal 100.");
      return;
    }

    const payload = {
      designation: selectedDesignation,
      frequency,
      kpis,
      totalMarks: sum,
      // add `version` ONLY if the input field is not empty
      ...(version !== "" ? { version: Number(version) } : {}),
      updatedBy: "adminUser",
    };

    try {
      await updateKpiSet(kpiSet._id, payload);
      toast.success("KPI Set updated!");
      // refresh UI with latest data
      handleAutoFetchKpiSet();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const confirmDeleteKpiSet = async () => {
    if (!kpiSet?._id) return toast.error("No KPI set to delete.");
    try {
      await deleteKpiSet(kpiSet._id);
      toast.success("KPI Set deleted!");
      setKpis([]);
      useKpiSetStore.setState({ kpiSet: null });
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const handleDeleteKpiSet = () => {
    setConfirmTitle("Delete KPI Set?");
    setConfirmMessage("Are you sure you want to permanently delete this KPI Set?");
    setConfirmAction(() => confirmDeleteKpiSet);
    setConfirmOpen(true);
  };

  const onConfirmDialog = () => {
    setConfirmOpen(false);
    confirmAction && confirmAction();
  };

  /* ---------------------------------------------------------------------
        Derived flags for button states
     --------------------------------------------------------------------- */
  const isExistingSet = !!kpiSet?._id;
  const isCreateEnabled = !isExistingSet && totalMarks === 100 && kpis.length > 0;
  const isUpdateEnabled = isExistingSet && hasEdited && totalMarks === 100;
  const isDeleteEnabled = isExistingSet;

  /* ---------------------------------------------------------------------
        Early loading screen
     --------------------------------------------------------------------- */
  if (designationLoading || kpiLoading) return <FullScreenLoader />;

  /* ---------------------------------------------------------------------
        Progress bar colours
     --------------------------------------------------------------------- */
  const completionStatus =
    totalMarks === 100
      ? "complete"
      : totalMarks > 90
      ? "almost"
      : totalMarks > 50
      ? "halfway"
      : "incomplete";

  const progressColors = {
    complete: "bg-emerald-500 dark:bg-emerald-400",
    almost: "bg-yellow-500 dark:bg-yellow-400",
    halfway: "bg-blue-500 dark:bg-blue-400",
    incomplete: "bg-red-500 dark:bg-red-400",
  };

  /* ---------------------------------------------------------------------
        JSX
     --------------------------------------------------------------------- */
  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* ============================================================== */}
      {/*  Header */}
      {/* ============================================================== */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          KPI Manager
        </h1>
      </div>

      {/* ============================================================== */}
      {/*  Confirmation dialog */}
      {/* ============================================================== */}
      <ConfirmationDialog
        open={confirmOpen}
        title={confirmTitle}
        message={confirmMessage}
        onConfirm={onConfirmDialog}
        onCancel={() => setConfirmOpen(false)}
        confirmText="Delete"
        cancelText="Cancel"
      />

      {/* ============================================================== */}
      {/*  KPI‑set selector card  */}
      {/* ============================================================== */}
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold flex items-center">
            <FileText className="mr-2 h-5 w-5 text-indigo-500 dark:text-indigo-400" />
            KPI Set Configuration
          </h2>
        </div>

        {/* -------- selector inputs -------- */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Designation */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Designation
            </label>
            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-3 rounded-lg border-0 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                value={selectedDesignation}
                onChange={(e) => setSelectedDesignation(e.target.value)}
              >
                <option value="">--Select--</option>
                {designations.map((d) => (
                  <option key={d.id} value={d.designation}>
                    {d.designation}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
          </div>

          {/* Frequency */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              <span className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                Frequency
              </span>
            </label>
            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-3 rounded-lg border-0 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
          </div>

          {/* Version */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Version (optional)
            </label>
            <input
              type="number"
              className="block w-full px-3 py-3 rounded-lg border-0 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              placeholder="e.g. 2"
            />
          </div>
        </div>

        {/* -------- refresh button -------- */}
        <div className="px-6 pb-6">
          <button
            onClick={handleAutoFetchKpiSet}
            className="flex items-center px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-lg"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/*  KPI entry form  */}
      {/* ============================================================== */}
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div
          className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center cursor-pointer"
          onClick={() => setFormExpanded(!formExpanded)}
        >
          <h2 className="text-xl font-semibold flex items-center">
            <Plus className="mr-2 h-5 w-5 text-green-500" />
            {editIndex !== null ? "Edit KPI" : "Add New KPI"}
          </h2>
          {formExpanded ? (
            <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          )}
        </div>

        <AnimatePresence>
          {formExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-6 space-y-6">
                {/* ---------------- inputs grid ---------------- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* KPI Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      KPI Name
                    </label>
                    <input
                      className="block w-full px-3 py-3 rounded-lg border-0 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                      value={kpiName}
                      onChange={(e) => setKpiName(e.target.value)}
                      placeholder="e.g. Daily Sales"
                    />
                  </div>

                  {/* Marks */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      <span className="flex items-center">
                        <Award className="mr-1 h-4 w-4" />
                        Marks
                      </span>
                    </label>
                    <input
                      type="number"
                      className="block w-full px-3 py-3 rounded-lg border-0 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                      value={marks}
                      onChange={(e) => setMarks(e.target.value)}
                      placeholder="e.g. 50"
                    />
                  </div>

                  {/* Type */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Type
                    </label>
                    <div className="relative">
                      <select
                        className="block w-full pl-3 pr-10 py-3 rounded-lg border-0 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                      >
                        <option value="quantitative">Quantitative</option>
                        <option value="qualitative">Qualitative</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Target (quantitative only) */}
                  {type === "quantitative" && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        <span className="flex items-center">
                          <Target className="mr-1 h-4 w-4" />
                          Target
                        </span>
                      </label>
                      <input
                        type="number"
                        className="block w-full px-3 py-3 rounded-lg border-0 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        placeholder="e.g. 5"
                      />
                    </div>
                  )}

                  {/* Category (always) */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      <span className="flex items-center">
                        <Tag className="mr-1 h-4 w-4" />
                        Category
                      </span>
                    </label>
                    <input
                      className="block w-full px-3 py-3 rounded-lg border-0 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="e.g. Compliance"
                    />
                  </div>
                </div>

                {/* -------- Add / Update row button -------- */}
                <div className="flex justify-end">
                  <button
                    onClick={handleAddOrUpdateKpi}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
                      editIndex !== null
                        ? "bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700"
                        : "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                    }`}
                  >
                    {editIndex !== null ? (
                      <>
                        <Save className="h-4 w-4" />
                        Update KPI
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        Add KPI
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ============================================================== */}
      {/*  Allocation & top‑level buttons  */}
      {/* ============================================================== */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ----- allocation card ----- */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <div className="p-6 flex flex-col">
            <h3 className="text-lg font-medium mb-4">Total Allocation</h3>

            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 dark:text-gray-400">
                Allocated Marks:
              </span>
              <span
                className={`text-lg font-semibold ${
                  totalMarks === 100
                    ? "text-green-500 dark:text-green-400"
                    : totalMarks > 90
                    ? "text-yellow-500 dark:text-yellow-400"
                    : "text-red-500 dark:text-red-400"
                }`}
              >
                {totalMarks}/100
              </span>
            </div>

            <div className="mt-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full">
                <div
                  className={`h-full rounded-full ${progressColors[completionStatus]}`}
                  style={{ width: `${Math.min(totalMarks, 100)}%` }}
                />
              </div>

              <div className="mt-2 text-sm">
                {totalMarks === 100 ? (
                  <span className="text-green-500 dark:text-green-400 flex items-center">
                    &#10003; Perfect allocation
                  </span>
                ) : totalMarks > 100 ? (
                  <span className="text-red-500 dark:text-red-400 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Over‑allocated by {totalMarks - 100}
                  </span>
                ) : (
                  <span className="text-yellow-500 dark:text-yellow-400 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Under‑allocated by {100 - totalMarks}
                  </span>
                )}
              </div>
            </div>

            {/* ----- create / update / delete buttons ----- */}
            <div className="mt-6 space-y-2">
              <button
                onClick={handleCreateKpiSet}
                disabled={!isCreateEnabled}
                className={`w-full flex justify-center items-center py-2 px-4 rounded-lg text-white transition-colors ${
                  isCreateEnabled
                    ? "bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700"
                    : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                }`}
              >
                <Save className="h-4 w-4 mr-2" />
                Create KPI Set
              </button>

              <button
                onClick={handleUpdateKpiSet}
                disabled={!isUpdateEnabled}
                className={`w-full flex justify-center items-center py-2 px-4 rounded-lg text-white transition-colors ${
                  isUpdateEnabled
                    ? "bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700"
                    : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                }`}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Update KPI Set
              </button>

              <button
                onClick={handleDeleteKpiSet}
                disabled={!isDeleteEnabled}
                className={`w-full flex justify-center items-center py-2 px-4 rounded-lg text-white transition-colors ${
                  isDeleteEnabled
                    ? "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                    : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                }`}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete KPI Set
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/*  KPI list table  */}
        {/* ============================================================== */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg md:col-span-2">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold flex items-center">
              <FileText className="mr-2 h-5 w-5 text-indigo-500 dark:text-indigo-400" />
              KPI List
            </h2>
          </div>

          {/* -------- table / empty state -------- */}
          <div className="overflow-x-auto">
            {kpis.length === 0 ? (
              <div className="p-12 flex flex-col items-center text-gray-500 dark:text-gray-400">
                <svg
                  className="h-16 w-16 mb-4 opacity-30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <p className="text-lg font-medium">No KPIs Added Yet</p>
                <p className="mt-1 text-sm text-center">
                  Add your first KPI using the form above.
                  <br />
                  Remember the total marks must be exactly 100.
                </p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                  <tr>
                    {["KPI Name", "Type", "Marks", "Target", "Category", ""].map(
                      (h) => (
                        <th
                          key={h}
                          className={`${
                            h ? "text-left" : "text-right"
                          } px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase`}
                        >
                          {h || "Actions"}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {kpis.map((kpi, index) => (
                    <motion.tr
                      key={index}
                      className={`${
                        hoveredRow === index
                          ? "bg-gray-50 dark:bg-gray-700/50"
                          : ""
                      } transition-colors`}
                      onMouseEnter={() => setHoveredRow(index)}
                      onMouseLeave={() => setHoveredRow(null)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {kpi.kpiName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            kpi.type === "quantitative"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                              : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                          }`}
                        >
                          {kpi.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {kpi.marks}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {kpi.target ?? "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {kpi.category ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                            {kpi.category}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                        <div className="flex items-center justify-end space-x-3">
                          <button
                            onClick={() => handleEditKpi(index)}
                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteKpi(index)}
                            className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/*  Error banner  */}
      {/* ============================================================== */}
      {kpiError && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" />
            <p className="text-red-700 dark:text-red-400 font-medium">
              {kpiError}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SetKpis;
