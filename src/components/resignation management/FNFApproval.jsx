// import React, { useEffect, useState, useMemo } from "react";
// import { FaUpload, FaCheck, FaTimes, FaSearch } from "react-icons/fa";
// import useFNFStore from "../../store/useFNFStore";
// import ConfirmationDialog from "../common/ConfirmationDialog";
// import BaseModal from "../common/BaseModal";
// import { Button } from "@mui/material";
// import { useForm } from "react-hook-form";
// import * as XLSX from "xlsx";
// import toast from "react-hot-toast";

// export default function FNFApproval() {
//   const {
//     pendingFnfs,
//     approvedFnfs,
//     loading,
//     fetchFNFRequests,
//     approveFNF,
//     updateFNF,
//     rejectFNF,
//   } = useFNFStore();

//   // Tab state: either "pending" or "approved"
//   const [activeTab, setActiveTab] = useState("pending");

//   // Modal & form states
//   const [approveOpen, setApproveOpen] = useState(false);
//   const [updateOpen, setUpdateOpen] = useState(false);
//   const [rejectOpen, setRejectOpen] = useState(false);
//   const [selectedFNF, setSelectedFNF] = useState(null);
//   const [rejectComment, setRejectComment] = useState("");

//   // react-hook-form for Approve/Update
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   // -------------------------
//   // PENDING Tab: Search + Pagination
//   // -------------------------
//   const [searchText, setSearchText] = useState("");
//   const [pendingPage, setPendingPage] = useState(1);
//   const [pendingPageSize, setPendingPageSize] = useState(10);

//   const filteredPendingFnfs = useMemo(() => {
//     if (!searchText) return pendingFnfs;
//     const regex = new RegExp(searchText, "i");
//     return pendingFnfs.filter((fnf) => {
//       const firstName = fnf.employee?.first_Name || "";
//       const lastName = fnf.employee?.last_Name || "";
//       const empId = fnf.employee?.employee_Id || "";
//       const fullName = `${firstName} ${lastName}`;
//       return regex.test(fullName) || regex.test(empId);
//     });
//   }, [pendingFnfs, searchText]);

//   const pendingTotalPages = Math.ceil(filteredPendingFnfs.length / pendingPageSize);

//   const pendingPaginated = useMemo(() => {
//     const startIndex = (pendingPage - 1) * pendingPageSize;
//     return filteredPendingFnfs.slice(startIndex, startIndex + pendingPageSize);
//   }, [filteredPendingFnfs, pendingPage, pendingPageSize]);

//   // -------------------------
//   // APPROVED Tab: Search + Pagination
//   // -------------------------
//   const [approvedSearchText, setApprovedSearchText] = useState("");
//   const [approvedPage, setApprovedPage] = useState(1);
//   const [approvedPageSize, setApprovedPageSize] = useState(10);

//   const filteredApprovedFnfs = useMemo(() => {
//     if (!approvedSearchText) return approvedFnfs;
//     const regex = new RegExp(approvedSearchText, "i");
//     return approvedFnfs.filter((fnf) => {
//       const firstName = fnf.employee?.first_Name || "";
//       const lastName = fnf.employee?.last_Name || "";
//       const empId = fnf.employee?.employee_Id || "";
//       const fullName = `${firstName} ${lastName}`;
//       return regex.test(fullName) || regex.test(empId);
//     });
//   }, [approvedFnfs, approvedSearchText]);

//   const approvedTotalPages = Math.ceil(
//     filteredApprovedFnfs.length / approvedPageSize
//   );

//   const approvedPaginated = useMemo(() => {
//     const startIndex = (approvedPage - 1) * approvedPageSize;
//     return filteredApprovedFnfs.slice(startIndex, startIndex + approvedPageSize);
//   }, [filteredApprovedFnfs, approvedPage, approvedPageSize]);

//   // -------------------------
//   // Lifecycle
//   // -------------------------
//   useEffect(() => {
//     fetchFNFRequests();
//   }, [fetchFNFRequests]);

//   // -------------------------
//   // Approve
//   // -------------------------
//   const openApproveModal = (fnf) => {
//     setSelectedFNF(fnf);
//     reset({
//       fnfAmount: fnf.fnfAmount || "",
//       deductions: fnf.deductions || "",
//       netPayable: fnf.netPayable || "",
//       comments: "",
//     });
//     setApproveOpen(true);
//   };

//   const onApproveSubmit = async (data) => {
//     try {
//       await approveFNF(selectedFNF._id, data);
//       toast.success("FNF approved successfully!");
//     } catch (error) {
//       toast.error("Error approving FNF. Please try again.");
//     } finally {
//       setApproveOpen(false);
//       setSelectedFNF(null);
//     }
//   };

//   // -------------------------
//   // Update
//   // -------------------------
//   const openUpdateModal = (fnf) => {
//     setSelectedFNF(fnf);
//     reset({
//       fnfAmount: fnf.fnfAmount || "",
//       deductions: fnf.deductions || "",
//       netPayable: fnf.netPayable || "",
//     });
//     setUpdateOpen(true);
//   };

//   const onUpdateSubmit = async (data) => {
//     try {
//       await updateFNF(selectedFNF._id, data);
//       toast.success("FNF updated successfully!");
//     } catch (error) {
//       toast.error("Error updating FNF. Please try again.");
//     } finally {
//       setUpdateOpen(false);
//       setSelectedFNF(null);
//     }
//   };

//   // -------------------------
//   // Reject
//   // -------------------------
//   const openRejectDialog = (fnf) => {
//     setSelectedFNF(fnf);
//     setRejectComment("");
//     setRejectOpen(true);
//   };

//   const confirmReject = async () => {
//     if (!rejectComment.trim()) {
//       toast.error("Please provide rejection comments.");
//       return;
//     }
//     try {
//       await rejectFNF(selectedFNF._id, rejectComment);
//       toast.success("FNF rejected successfully!");
//     } catch (error) {
//       toast.error("Error rejecting FNF. Please try again.");
//     } finally {
//       setRejectOpen(false);
//       setSelectedFNF(null);
//     }
//   };

//   // -------------------------
//   // Export to Excel (pending or approved)
//   // -------------------------
//   const exportPendingToExcel = () => {
//     const exportData = filteredPendingFnfs.map((fnf, index) => ({
//       "S.L": index + 1,
//       "Employee Name": fnf.employee
//         ? `${fnf.employee.first_Name} ${fnf.employee.last_Name}`
//         : "N/A",
//       "Employee ID": fnf.employee?.employee_Id || "N/A",
//       "Resignation Date": fnf.resignation?.resignationDate
//         ? new Date(fnf.resignation.resignationDate).toLocaleDateString()
//         : "N/A",
//       "Last Working Day": fnf.resignation?.lastWorkingDay
//         ? new Date(fnf.resignation.lastWorkingDay).toLocaleDateString()
//         : "N/A",
//       "Requested At": fnf.requestedAt
//         ? new Date(fnf.requestedAt).toLocaleString()
//         : "N/A",
//       "Created At": fnf.createdAt
//         ? new Date(fnf.createdAt).toLocaleString()
//         : "N/A",
//       Status: fnf.status,
//     }));
//     const worksheet = XLSX.utils.json_to_sheet(exportData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Pending FNF");
//     XLSX.writeFile(workbook, "PendingFNF.xlsx");
//   };

//   const exportApprovedToExcel = () => {
//     const exportData = filteredApprovedFnfs.map((fnf, index) => ({
//       "S.L": index + 1,
//       "Employee Name": fnf.employee
//         ? `${fnf.employee.first_Name} ${fnf.employee.last_Name}`
//         : "N/A",
//       "Employee ID": fnf.employee?.employee_Id || "N/A",
//       "Resignation Date": fnf.resignation?.resignationDate
//         ? new Date(fnf.resignation.resignationDate).toLocaleDateString()
//         : "N/A",
//       "Last Working Day": fnf.resignation?.lastWorkingDay
//         ? new Date(fnf.resignation.lastWorkingDay).toLocaleDateString()
//         : "N/A",
//       "Requested At": fnf.requestedAt
//         ? new Date(fnf.requestedAt).toLocaleString()
//         : "N/A",
//       "Processed By": fnf.processedBy
//         ? `${fnf.processedBy.first_Name} ${fnf.processedBy.last_Name} (${fnf.processedBy.employee_Id})`
//         : "N/A",
//       "Processed At": fnf.processedAt
//         ? new Date(fnf.processedAt).toLocaleString()
//         : "N/A",
//       "FNF Amount": fnf.fnfAmount || 0,
//       "Deductions": fnf.deductions || 0,
//       "Net Payable": fnf.netPayable || 0,
//     }));
//     const worksheet = XLSX.utils.json_to_sheet(exportData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Approved FNF");
//     XLSX.writeFile(workbook, "ApprovedFNF.xlsx");
//   };

//   // -------------------------
//   // Table Rows
//   // -------------------------
//   const renderPendingRow = (fnf, index) => (
//     <tr
//       key={fnf._id}
//       className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
//     >
//       <td className="py-3 px-4">{index + 1}</td>
//       <td className="py-3 px-4">
//         {fnf.employee
//           ? `${fnf.employee.first_Name || "N/A"} ${
//               fnf.employee.last_Name || "N/A"
//             }`
//           : "N/A"}
//       </td>
//       <td className="py-3 px-4">{fnf.employee?.employee_Id || "N/A"}</td>
//       <td className="py-3 px-4">
//         {fnf.resignation?.resignationDate
//           ? new Date(fnf.resignation.resignationDate).toLocaleDateString()
//           : "N/A"}
//       </td>
//       <td className="py-3 px-4">
//         {fnf.resignation?.lastWorkingDay
//           ? new Date(fnf.resignation.lastWorkingDay).toLocaleDateString()
//           : "N/A"}
//       </td>
//       <td className="py-3 px-4">
//         {fnf.requestedAt ? new Date(fnf.requestedAt).toLocaleString() : "N/A"}
//       </td>
//       <td className="py-3 px-4">
//         {fnf.createdAt ? new Date(fnf.createdAt).toLocaleString() : "N/A"}
//       </td>
//       <td className="py-3 px-4">
//         <span
//           className={`inline-block px-2 py-1 text-sm rounded ${
//             fnf.status === "Pending"
//               ? "bg-yellow-100 text-yellow-800"
//               : fnf.status === "Approved"
//               ? "bg-green-100 text-green-800"
//               : "bg-red-100 text-red-800"
//           }`}
//         >
//           {fnf.status}
//         </span>
//       </td>
//       <td className="py-3 px-4 space-x-2">
//         {fnf.status === "Pending" && (
//           <>
//             <button
//               onClick={() => openApproveModal(fnf)}
//               className="inline-flex items-center text-green-600 dark:text-green-400 hover:underline space-x-1"
//             >
//               <FaCheck className="w-4 h-4" />
//               <span>Approve</span>
//             </button>
//             <button
//               onClick={() => openRejectDialog(fnf)}
//               className="inline-flex items-center text-red-600 dark:text-red-400 hover:underline space-x-1"
//             >
//               <FaTimes className="w-4 h-4" />
//               <span>Reject</span>
//             </button>
//           </>
//         )}
//       </td>
//     </tr>
//   );

//   const renderApprovedRow = (fnf, index) => (
//     <tr
//       key={fnf._id}
//       className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
//     >
//       <td className="py-3 px-4">{index + 1}</td>
//       <td className="py-3 px-4">
//         {fnf.employee
//           ? `${fnf.employee.first_Name || "N/A"} ${
//               fnf.employee.last_Name || "N/A"
//             }`
//           : "N/A"}
//       </td>
//       <td className="py-3 px-4">{fnf.employee?.employee_Id || "N/A"}</td>
//       <td className="py-3 px-4">
//         {fnf.resignation?.resignationDate
//           ? new Date(fnf.resignation.resignationDate).toLocaleDateString()
//           : "N/A"}
//       </td>
//       <td className="py-3 px-4">
//         {fnf.resignation?.lastWorkingDay
//           ? new Date(fnf.resignation.lastWorkingDay).toLocaleDateString()
//           : "N/A"}
//       </td>
//       <td className="py-3 px-4">
//         {fnf.requestedAt ? new Date(fnf.requestedAt).toLocaleString() : "N/A"}
//       </td>
//       <td className="py-3 px-4">
//         {fnf.processedBy
//           ? `${fnf.processedBy.first_Name || "N/A"} ${
//               fnf.processedBy.last_Name || "N/A"
//             } (${fnf.processedBy.employee_Id || "N/A"})`
//           : "N/A"}
//       </td>
//       <td className="py-3 px-4">
//         {fnf.processedAt ? new Date(fnf.processedAt).toLocaleString() : "N/A"}
//       </td>
//       <td className="py-3 px-4">{fnf.fnfAmount?.toFixed(2) || "0.00"}</td>
//       <td className="py-3 px-4">{fnf.deductions?.toFixed(2) || "0.00"}</td>
//       <td className="py-3 px-4">{fnf.netPayable?.toFixed(2) || "0.00"}</td>
//       <td className="py-3 px-4">
//         {/* Update Button */}
//         <button
//           onClick={() => openUpdateModal(fnf)}
//           className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline space-x-1"
//         >
//           <FaCheck className="w-4 h-4" />
//           <span>Update</span>
//         </button>
//       </td>
//     </tr>
//   );

//   // -------------------------
//   // Render
//   // -------------------------
//   if (loading) {
//     return (
//       <div className="p-4 text-center">
//         <p className="text-sm">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 space-y-4">
//       <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
//         FNF Approvals
//       </h1>

//       {/* Tabs */}
//       <div className="flex space-x-4 border-b border-gray-300 dark:border-gray-600">
//         <button
//           className={`py-2 px-4 ${
//             activeTab === "pending"
//               ? "text-blue-600 border-b-2 border-blue-600"
//               : "text-gray-600 dark:text-gray-300"
//           }`}
//           onClick={() => setActiveTab("pending")}
//         >
//           Pending ({pendingFnfs.length})
//         </button>
//         <button
//           className={`py-2 px-4 ${
//             activeTab === "approved"
//               ? "text-blue-600 border-b-2 border-blue-600"
//               : "text-gray-600 dark:text-gray-300"
//           }`}
//           onClick={() => setActiveTab("approved")}
//         >
//           Approved ({approvedFnfs.length})
//         </button>
//       </div>

//       {/* Pending Content */}
//       {activeTab === "pending" && (
//         <>
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 md:space-x-4">
//             {/* Show entries (page size) */}
//             <div className="flex items-center space-x-2">
//               <label
//                 htmlFor="showEntriesFNF"
//                 className="text-gray-700 dark:text-gray-200"
//               >
//                 Show
//               </label>
//               <select
//                 id="showEntriesFNF"
//                 value={pendingPageSize}
//                 onChange={(e) => {
//                   setPendingPageSize(Number(e.target.value));
//                   setPendingPage(1);
//                 }}
//                 className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded px-2 py-1"
//               >
//                 <option value={10}>10</option>
//                 <option value={25}>25</option>
//                 <option value={50}>50</option>
//               </select>
//             </div>

//             {/* Search */}
//             <div className="flex flex-wrap items-center space-x-2">
//               <div className="relative">
//                 <FaSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
//                 <input
//                   type="text"
//                   placeholder="Search by Name or Emp ID"
//                   value={searchText}
//                   onChange={(e) => {
//                     setSearchText(e.target.value);
//                     setPendingPage(1);
//                   }}
//                   className="pl-8 pr-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none"
//                 />
//               </div>
//             </div>

//             {/* Export Button */}
//             <button
//               onClick={exportPendingToExcel}
//               className="px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors inline-flex items-center space-x-1"
//             >
//               <FaUpload className="w-4 h-4" />
//               <span>Export Pending</span>
//             </button>
//           </div>

//           {/* Table Container */}
//           <div className="overflow-x-auto border border-gray-200 dark:border-gray-600 rounded mt-2">
//             <table className="min-w-full text-left">
//               <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
//                 <tr>
//                   <th className="py-3 px-4 font-semibold">S.L</th>
//                   <th className="py-3 px-4 font-semibold">Employee Name</th>
//                   <th className="py-3 px-4 font-semibold">Employee ID</th>
//                   <th className="py-3 px-4 font-semibold">Resignation Date</th>
//                   <th className="py-3 px-4 font-semibold">Last Working Day</th>
//                   <th className="py-3 px-4 font-semibold">Requested At</th>
//                   <th className="py-3 px-4 font-semibold">Created At</th>
//                   <th className="py-3 px-4 font-semibold">Status</th>
//                   <th className="py-3 px-4 font-semibold">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="text-gray-700 dark:text-gray-200">
//                 {pendingPaginated.length === 0 ? (
//                   <tr>
//                     <td className="py-3 px-4" colSpan="9">
//                       No pending FNF requests.
//                     </td>
//                   </tr>
//                 ) : (
//                   pendingPaginated.map((fnf, idx) =>
//                     renderPendingRow(fnf, (pendingPage - 1) * pendingPageSize + idx)
//                   )
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination Footer */}
//           <div className="flex flex-col md:flex-row justify-between items-center mt-4">
//             <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 md:mb-0">
//               Showing {(pendingPage - 1) * pendingPageSize + 1} to{" "}
//               {Math.min(pendingPage * pendingPageSize, filteredPendingFnfs.length)}{" "}
//               of {filteredPendingFnfs.length} entries
//             </p>
//             <div className="flex space-x-2">
//               {Array.from({ length: pendingTotalPages }, (_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setPendingPage(i + 1)}
//                   className={`px-3 py-1 rounded border transition-colors ${
//                     pendingPage === i + 1
//                       ? "bg-blue-600 text-white border-blue-600"
//                       : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
//                   }`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </>
//       )}

//       {/* Approved Content */}
//       {activeTab === "approved" && (
//         <>
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 md:space-x-4">
//             {/* Show entries (page size) */}
//             <div className="flex items-center space-x-2">
//               <label
//                 htmlFor="approvedPageSize"
//                 className="text-gray-700 dark:text-gray-200"
//               >
//                 Show
//               </label>
//               <select
//                 id="approvedPageSize"
//                 value={approvedPageSize}
//                 onChange={(e) => {
//                   setApprovedPageSize(Number(e.target.value));
//                   setApprovedPage(1);
//                 }}
//                 className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded px-2 py-1"
//               >
//                 <option value={10}>10</option>
//                 <option value={25}>25</option>
//                 <option value={50}>50</option>
//               </select>
//             </div>

//             {/* Search */}
//             <div className="flex flex-wrap items-center space-x-2">
//               <div className="relative">
//                 <FaSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
//                 <input
//                   type="text"
//                   placeholder="Search by Name or Emp ID"
//                   value={approvedSearchText}
//                   onChange={(e) => {
//                     setApprovedSearchText(e.target.value);
//                     setApprovedPage(1);
//                   }}
//                   className="pl-8 pr-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none"
//                 />
//               </div>
//             </div>

//             {/* Export Button */}
//             <button
//               onClick={exportApprovedToExcel}
//               className="px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors inline-flex items-center space-x-1"
//             >
//               <FaUpload className="w-4 h-4" />
//               <span>Export Approved</span>
//             </button>
//           </div>

//           {/* Approved Table */}
//           <div className="overflow-x-auto border border-gray-200 dark:border-gray-600 rounded mt-2">
//             <table className="min-w-full text-left">
//               <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
//                 <tr>
//                   <th className="py-3 px-4 font-semibold">S.L</th>
//                   <th className="py-3 px-4 font-semibold">Employee Name</th>
//                   <th className="py-3 px-4 font-semibold">Employee ID</th>
//                   <th className="py-3 px-4 font-semibold">Resignation Date</th>
//                   <th className="py-3 px-4 font-semibold">Last Working Day</th>
//                   <th className="py-3 px-4 font-semibold">Requested At</th>
//                   <th className="py-3 px-4 font-semibold">Processed By</th>
//                   <th className="py-3 px-4 font-semibold">Processed At</th>
//                   <th className="py-3 px-4 font-semibold">FNF Amount (₹)</th>
//                   <th className="py-3 px-4 font-semibold">Deductions (₹)</th>
//                   <th className="py-3 px-4 font-semibold">Net Payable (₹)</th>
//                   <th className="py-3 px-4 font-semibold">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="text-gray-700 dark:text-gray-200">
//                 {approvedPaginated.length === 0 ? (
//                   <tr>
//                     <td className="py-3 px-4" colSpan="12">
//                       No approved FNF requests.
//                     </td>
//                   </tr>
//                 ) : (
//                   approvedPaginated.map((fnf, idx) =>
//                     renderApprovedRow(fnf, (approvedPage - 1) * approvedPageSize + idx)
//                   )
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination Footer */}
//           <div className="flex flex-col md:flex-row justify-between items-center mt-4">
//             <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 md:mb-0">
//               Showing {(approvedPage - 1) * approvedPageSize + 1} to{" "}
//               {Math.min(
//                 approvedPage * approvedPageSize,
//                 filteredApprovedFnfs.length
//               )}{" "}
//               of {filteredApprovedFnfs.length} entries
//             </p>
//             <div className="flex space-x-2">
//               {Array.from({ length: approvedTotalPages }, (_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setApprovedPage(i + 1)}
//                   className={`px-3 py-1 rounded border transition-colors ${
//                     approvedPage === i + 1
//                       ? "bg-blue-600 text-white border-blue-600"
//                       : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
//                   }`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </>
//       )}

//       {/* Approve Modal */}
//       {approveOpen && (
//         <BaseModal isOpen={approveOpen} onClose={() => setApproveOpen(false)}>
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-11/12 md:w-1/3">
//             <h3 className="text-lg font-bold mb-3">Approve FNF</h3>
//             <form onSubmit={handleSubmit(onApproveSubmit)}>
//               <input
//                 type="number"
//                 step="0.01"
//                 placeholder="FNF Amount (₹)"
//                 {...register("fnfAmount", { required: "Required", min: 0 })}
//                 className="w-full border p-2 mb-2 bg-bg-secondary"
//               />
//               {errors.fnfAmount && (
//                 <p className="text-red-600">{errors.fnfAmount.message}</p>
//               )}

//               <input
//                 type="number"
//                 step="0.01"
//                 placeholder="Deductions (₹)"
//                 {...register("deductions", { required: "Required", min: 0 })}
//                 className="w-full border p-2 mb-2 bg-bg-secondary"
//               />
//               {errors.deductions && (
//                 <p className="text-red-600">{errors.deductions.message}</p>
//               )}

//               <input
//                 type="number"
//                 step="0.01"
//                 placeholder="Net Payable (₹)"
//                 {...register("netPayable", { required: "Required", min: 0 })}
//                 className="w-full border p-2 mb-2 bg-bg-secondary"
//               />
//               {errors.netPayable && (
//                 <p className="text-red-600">{errors.netPayable.message}</p>
//               )}

//               <textarea
//                 placeholder="Comments (Optional)"
//                 {...register("comments")}
//                 className="w-full border p-2 mb-4"
//               />

//               <div className="flex justify-center gap-4">
//                 <Button
//                   onClick={() => setApproveOpen(false)}
//                   variant="outlined"
//                   color="secondary"
//                   className="w-1/3"
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   className="w-1/3"
//                 >
//                   Approve
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </BaseModal>
//       )}

//       {/* Update Modal */}
//       {updateOpen && (
//         <BaseModal isOpen={updateOpen} onClose={() => setUpdateOpen(false)}>
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-11/12 md:w-1/3">
//             <h3 className="text-lg font-bold mb-3">Update FNF</h3>
//             <form onSubmit={handleSubmit(onUpdateSubmit)} className="bg-bg-secondary">
//               <input
//                 type="number"
//                 step="0.01"
//                 placeholder="FNF Amount (₹)"
//                 {...register("fnfAmount", { required: "Required", min: 0 })}
//                 className="w-full border p-2 mb-2 bg-bg-secondary"
//               />
//               {errors.fnfAmount && (
//                 <p className="text-red-600">{errors.fnfAmount.message}</p>
//               )}

//               <input
//                 type="number"
//                 step="0.01"
//                 placeholder="Deductions (₹)"
//                 {...register("deductions", { required: "Required", min: 0 })}
//                 className="w-full border p-2 mb-2 bg-bg-secondary"
//               />
//               {errors.deductions && (
//                 <p className="text-red-600">{errors.deductions.message}</p>
//               )}

//               <input
//                 type="number"
//                 step="0.01"
//                 placeholder="Net Payable (₹)"
//                 {...register("netPayable", { required: "Required", min: 0 })}
//                 className="w-full border p-2 mb-2 bg-bg-secondary"
//               />
//               {errors.netPayable && (
//                 <p className="text-red-600">{errors.netPayable.message}</p>
//               )}

//               <div className="flex justify-center gap-4 mt-4">
//                 <Button
//                   onClick={() => setUpdateOpen(false)}
//                   variant="outlined"
//                   color="secondary"
//                   className="w-1/3"
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   className="w-1/3"
//                 >
//                   Update
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </BaseModal>
//       )}

//       {/* Reject Confirmation Dialog */}
//       {rejectOpen && (
//         <ConfirmationDialog
//           open={rejectOpen}
//           title="Reject FNF"
//           message={
//             <div>
//               <p>Please provide rejection comments:</p>
//               <textarea
//                 value={rejectComment}
//                 onChange={(e) => setRejectComment(e.target.value)}
//                 className="w-full border p-2 mt-2"
//                 placeholder="Enter your comments here..."
//               />
//             </div>
//           }
//           onConfirm={confirmReject}
//           onCancel={() => setRejectOpen(false)}
//           confirmText="Reject"
//           cancelText="Cancel"
//         />
//       )}
//     </div>
//   );
// }



import React, { useEffect, useState, useMemo } from "react";
import { FaUpload, FaCheck, FaTimes, FaSearch, FaEdit, FaFileExport } from "react-icons/fa";
import useFNFStore from "../../store/useFNFStore";
import ConfirmationDialog from "../common/ConfirmationDialog";
import BaseModal from "../common/BaseModal";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";

export default function FNFApproval() {
  const {
    pendingFnfs,
    approvedFnfs,
    loading,
    fetchFNFRequests,
    approveFNF,
    updateFNF,
    rejectFNF,
  } = useFNFStore();

  // Tab state: either "pending" or "approved"
  const [activeTab, setActiveTab] = useState("pending");

  // Modal & form states
  const [approveOpen, setApproveOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [selectedFNF, setSelectedFNF] = useState(null);
  const [rejectComment, setRejectComment] = useState("");

  // react-hook-form for Approve/Update
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // -------------------------
  // PENDING Tab: Search + Pagination
  // -------------------------
  const [searchText, setSearchText] = useState("");
  const [pendingPage, setPendingPage] = useState(1);
  const [pendingPageSize, setPendingPageSize] = useState(10);

  const filteredPendingFnfs = useMemo(() => {
    if (!searchText) return pendingFnfs;
    const regex = new RegExp(searchText, "i");
    return pendingFnfs.filter((fnf) => {
      const firstName = fnf.employee?.first_Name || "";
      const lastName = fnf.employee?.last_Name || "";
      const empId = fnf.employee?.employee_Id || "";
      const fullName = `${firstName} ${lastName}`;
      return regex.test(fullName) || regex.test(empId);
    });
  }, [pendingFnfs, searchText]);

  const pendingTotalPages = Math.ceil(filteredPendingFnfs.length / pendingPageSize);

  const pendingPaginated = useMemo(() => {
    const startIndex = (pendingPage - 1) * pendingPageSize;
    return filteredPendingFnfs.slice(startIndex, startIndex + pendingPageSize);
  }, [filteredPendingFnfs, pendingPage, pendingPageSize]);

  // -------------------------
  // APPROVED Tab: Search + Pagination
  // -------------------------
  const [approvedSearchText, setApprovedSearchText] = useState("");
  const [approvedPage, setApprovedPage] = useState(1);
  const [approvedPageSize, setApprovedPageSize] = useState(10);

  const filteredApprovedFnfs = useMemo(() => {
    if (!approvedSearchText) return approvedFnfs;
    const regex = new RegExp(approvedSearchText, "i");
    return approvedFnfs.filter((fnf) => {
      const firstName = fnf.employee?.first_Name || "";
      const lastName = fnf.employee?.last_Name || "";
      const empId = fnf.employee?.employee_Id || "";
      const fullName = `${firstName} ${lastName}`;
      return regex.test(fullName) || regex.test(empId);
    });
  }, [approvedFnfs, approvedSearchText]);

  const approvedTotalPages = Math.ceil(
    filteredApprovedFnfs.length / approvedPageSize
  );

  const approvedPaginated = useMemo(() => {
    const startIndex = (approvedPage - 1) * approvedPageSize;
    return filteredApprovedFnfs.slice(startIndex, startIndex + approvedPageSize);
  }, [filteredApprovedFnfs, approvedPage, approvedPageSize]);

  // -------------------------
  // Lifecycle
  // -------------------------
  useEffect(() => {
    fetchFNFRequests();
  }, [fetchFNFRequests]);

  // -------------------------
  // Approve
  // -------------------------
  const openApproveModal = (fnf) => {
    setSelectedFNF(fnf);
    reset({
      fnfAmount: fnf.fnfAmount || "",
      deductions: fnf.deductions || "",
      netPayable: fnf.netPayable || "",
      comments: "",
    });
    setApproveOpen(true);
  };

  const onApproveSubmit = async (data) => {
    try {
      await approveFNF(selectedFNF._id, data);
      toast.success("FNF approved successfully!");
    } catch (error) {
      toast.error("Error approving FNF. Please try again.");
    } finally {
      setApproveOpen(false);
      setSelectedFNF(null);
    }
  };

  // -------------------------
  // Update
  // -------------------------
  const openUpdateModal = (fnf) => {
    setSelectedFNF(fnf);
    reset({
      fnfAmount: fnf.fnfAmount || "",
      deductions: fnf.deductions || "",
      netPayable: fnf.netPayable || "",
    });
    setUpdateOpen(true);
  };

  const onUpdateSubmit = async (data) => {
    try {
      await updateFNF(selectedFNF._id, data);
      toast.success("FNF updated successfully!");
    } catch (error) {
      toast.error("Error updating FNF. Please try again.");
    } finally {
      setUpdateOpen(false);
      setSelectedFNF(null);
    }
  };

  // -------------------------
  // Reject
  // -------------------------
  const openRejectDialog = (fnf) => {
    setSelectedFNF(fnf);
    setRejectComment("");
    setRejectOpen(true);
  };

  const confirmReject = async () => {
    if (!rejectComment.trim()) {
      toast.error("Please provide rejection comments.");
      return;
    }
    try {
      await rejectFNF(selectedFNF._id, rejectComment);
      toast.success("FNF rejected successfully!");
    } catch (error) {
      toast.error("Error rejecting FNF. Please try again.");
    } finally {
      setRejectOpen(false);
      setSelectedFNF(null);
    }
  };

  // -------------------------
  // Export to Excel (pending or approved)
  // -------------------------
  const exportPendingToExcel = () => {
    const exportData = filteredPendingFnfs.map((fnf, index) => ({
      "S.L": index + 1,
      "Employee Name": fnf.employee
        ? `${fnf.employee.first_Name} ${fnf.employee.last_Name}`
        : "N/A",
      "Employee ID": fnf.employee?.employee_Id || "N/A",
      "Resignation Date": fnf.resignation?.resignationDate
        ? new Date(fnf.resignation.resignationDate).toLocaleDateString()
        : "N/A",
      "Last Working Day": fnf.resignation?.lastWorkingDay
        ? new Date(fnf.resignation.lastWorkingDay).toLocaleDateString()
        : "N/A",
      "Requested At": fnf.requestedAt
        ? new Date(fnf.requestedAt).toLocaleString()
        : "N/A",
      "Created At": fnf.createdAt
        ? new Date(fnf.createdAt).toLocaleString()
        : "N/A",
      Status: fnf.status,
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pending FNF");
    XLSX.writeFile(workbook, "PendingFNF.xlsx");
  };

  const exportApprovedToExcel = () => {
    const exportData = filteredApprovedFnfs.map((fnf, index) => ({
      "S.L": index + 1,
      "Employee Name": fnf.employee
        ? `${fnf.employee.first_Name} ${fnf.employee.last_Name}`
        : "N/A",
      "Employee ID": fnf.employee?.employee_Id || "N/A",
      "Resignation Date": fnf.resignation?.resignationDate
        ? new Date(fnf.resignation.resignationDate).toLocaleDateString()
        : "N/A",
      "Last Working Day": fnf.resignation?.lastWorkingDay
        ? new Date(fnf.resignation.lastWorkingDay).toLocaleDateString()
        : "N/A",
      "Requested At": fnf.requestedAt
        ? new Date(fnf.requestedAt).toLocaleString()
        : "N/A",
      "Processed By": fnf.processedBy
        ? `${fnf.processedBy.first_Name} ${fnf.processedBy.last_Name} (${fnf.processedBy.employee_Id})`
        : "N/A",
      "Processed At": fnf.processedAt
        ? new Date(fnf.processedAt).toLocaleString()
        : "N/A",
      "FNF Amount": fnf.fnfAmount || 0,
      "Deductions": fnf.deductions || 0,
      "Net Payable": fnf.netPayable || 0,
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Approved FNF");
    XLSX.writeFile(workbook, "ApprovedFNF.xlsx");
  };

  // -------------------------
  // Table Rows
  // -------------------------
  const renderPendingRow = (fnf, index) => (
    <tr
      key={fnf._id}
      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-gray-800 dark:hover:to-gray-750 transition-all duration-200"
    >
      <td className="py-4 px-6 text-sm font-medium text-gray-900 dark:text-gray-100">{index + 1}</td>
      <td className="py-4 px-6">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {fnf.employee
              ? `${fnf.employee.first_Name || "N/A"} ${fnf.employee.last_Name || "N/A"}`
              : "N/A"}
          </span>
        </div>
      </td>
      <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400 font-mono">
        {fnf.employee?.employee_Id || "N/A"}
      </td>
      <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
        {fnf.resignation?.resignationDate
          ? new Date(fnf.resignation.resignationDate).toLocaleDateString()
          : "N/A"}
      </td>
      <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
        {fnf.resignation?.lastWorkingDay
          ? new Date(fnf.resignation.lastWorkingDay).toLocaleDateString()
          : "N/A"}
      </td>
      <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
        {fnf.requestedAt ? new Date(fnf.requestedAt).toLocaleString() : "N/A"}
      </td>
      <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
        {fnf.createdAt ? new Date(fnf.createdAt).toLocaleString() : "N/A"}
      </td>
      <td className="py-4 px-6">
        <span
          className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
            fnf.status === "Pending"
              ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
              : fnf.status === "Approved"
              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          <div className={`w-1.5 h-1.5 rounded-full mr-2 ${
            fnf.status === "FNF Requested" ? "bg-amber-400" : fnf.status === "Approved" ? "bg-emerald-400" : "bg-red-400"
          }`}></div>
          {fnf.status}
        </span>
      </td>
      <td className="py-4 px-6">
        {fnf.status === "FNF Requested" && (
          <div className="flex items-center space-x-3">
            <button
              onClick={() => openApproveModal(fnf)}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <FaCheck className="w-3 h-3 mr-1" />
              Approve
            </button>
            <button
              onClick={() => openRejectDialog(fnf)}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <FaTimes className="w-3 h-3 mr-1" />
              Reject
            </button>
          </div>
        )}
      </td>
    </tr>
  );

  const renderApprovedRow = (fnf, index) => (
    <tr
      key={fnf._id}
      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-gray-800 dark:hover:to-gray-750 transition-all duration-200"
    >
      <td className="py-4 px-6 text-sm font-medium text-gray-900 dark:text-gray-100">{index + 1}</td>
      <td className="py-4 px-6">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {fnf.employee
              ? `${fnf.employee.first_Name || "N/A"} ${fnf.employee.last_Name || "N/A"}`
              : "N/A"}
          </span>
        </div>
      </td>
      <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400 font-mono">
        {fnf.employee?.employee_Id || "N/A"}
      </td>
      <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
        {fnf.resignation?.resignationDate
          ? new Date(fnf.resignation.resignationDate).toLocaleDateString()
          : "N/A"}
      </td>
      <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
        {fnf.resignation?.lastWorkingDay
          ? new Date(fnf.resignation.lastWorkingDay).toLocaleDateString()
          : "N/A"}
      </td>
      <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
        {fnf.requestedAt ? new Date(fnf.requestedAt).toLocaleString() : "N/A"}
      </td>
      <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
        {fnf.processedBy
          ? `${fnf.processedBy.first_Name || "N/A"} ${
              fnf.processedBy.last_Name || "N/A"
            } (${fnf.processedBy.employee_Id || "N/A"})`
          : "N/A"}
      </td>
      <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
        {fnf.processedAt ? new Date(fnf.processedAt).toLocaleString() : "N/A"}
      </td>
      <td className="py-4 px-6 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
        ₹{fnf.fnfAmount?.toFixed(2) || "0.00"}
      </td>
      <td className="py-4 px-6 text-sm font-semibold text-red-600 dark:text-red-400">
        ₹{fnf.deductions?.toFixed(2) || "0.00"}
      </td>
      <td className="py-4 px-6 text-sm font-bold text-blue-600 dark:text-blue-400">
        ₹{fnf.netPayable?.toFixed(2) || "0.00"}
      </td>
      <td className="py-4 px-6">
        <button
          onClick={() => openUpdateModal(fnf)}
          className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <FaEdit className="w-3 h-3 mr-1" />
          Update
        </button>
      </td>
    </tr>
  );

  // -------------------------
  // Render
  // -------------------------
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Loading FNF requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-4"></div>
          FNF Approvals
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Manage Full & Final settlement requests</p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="flex space-x-1 p-1">
          <button
            className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeTab === "pending"
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("pending")}
          >
            Pending Requests
            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
              activeTab === "pending" 
                ? "bg-white/20 text-white" 
                : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
            }`}>
              {pendingFnfs.length}
            </span>
          </button>
          <button
            className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeTab === "approved"
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("approved")}
          >
            Approved Requests
            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
              activeTab === "approved" 
                ? "bg-white/20 text-white" 
                : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
            }`}>
              {approvedFnfs.length}
            </span>
          </button>
        </div>

        {/* Pending Content */}
        {activeTab === "pending" && (
          <div className="p-6">
            {/* Controls */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 mb-6">
              {/* Show entries */}
              <div className="flex items-center space-x-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Show
                </label>
                <select
                  value={pendingPageSize}
                  onChange={(e) => {
                    setPendingPageSize(Number(e.target.value));
                    setPendingPage(1);
                  }}
                  className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-sm text-gray-600 dark:text-gray-400">entries</span>
              </div>

              {/* Search and Export */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by name or employee ID..."
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                      setPendingPage(1);
                    }}
                    className="pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-80"
                  />
                </div>
                <button
                  onClick={exportPendingToExcel}
                  className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <FaFileExport className="w-4 h-4 mr-2" />
                  Export to Excel
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
                    <tr>
                      {["S.L", "Employee Name", "Employee ID", "Resignation Date", "Last Working Day", "Requested At", "Created At", "Status", "Actions"].map((header) => (
                        <th key={header} className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                    {pendingPaginated.length === 0 ? (
                      <tr>
                        <td className="px-6 py-12 text-center text-gray-500 dark:text-gray-400" colSpan="9">
                          <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                              <FaSearch className="w-6 h-6 text-gray-400" />
                            </div>
                            <p className="text-lg font-medium">No pending requests found</p>
                            <p className="text-sm">Try adjusting your search criteria</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      pendingPaginated.map((fnf, idx) =>
                        renderPendingRow(fnf, (pendingPage - 1) * pendingPageSize + idx)
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {pendingTotalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {(pendingPage - 1) * pendingPageSize + 1} to{" "}
                  {Math.min(pendingPage * pendingPageSize, filteredPendingFnfs.length)}{" "}
                  of {filteredPendingFnfs.length} entries
                </p>
                <div className="flex space-x-1">
                  {Array.from({ length: pendingTotalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setPendingPage(i + 1)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        pendingPage === i + 1
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                          : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Approved Content */}
        {activeTab === "approved" && (
          <div className="p-6">
            {/* Controls */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 mb-6">
              {/* Show entries */}
              <div className="flex items-center space-x-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Show
                </label>
                <select
                  value={approvedPageSize}
                  onChange={(e) => {
                    setApprovedPageSize(Number(e.target.value));
                    setApprovedPage(1);
                  }}
                  className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-sm text-gray-600 dark:text-gray-400">entries</span>
              </div>

              {/* Search and Export */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by name or employee ID..."
                    value={approvedSearchText}
                    onChange={(e) => {
                      setApprovedSearchText(e.target.value);
                      setApprovedPage(1);
                    }}
                    className="pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-80"
                  />
                </div>
                <button
                  onClick={exportApprovedToExcel}
                  className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <FaFileExport className="w-4 h-4 mr-2" />
                  Export to Excel
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
                    <tr>
                      {["S.L", "Employee Name", "Employee ID", "Resignation Date", "Last Working Day", "Requested At", "Processed By", "Processed At", "FNF Amount (₹)", "Deductions (₹)", "Net Payable (₹)", "Action"].map((header) => (
                        <th key={header} className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                    {approvedPaginated.length === 0 ? (
                      <tr>
                        <td className="px-6 py-12 text-center text-gray-500 dark:text-gray-400" colSpan="12">
                          <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                              <FaCheck className="w-6 h-6 text-gray-400" />
                            </div>
                            <p className="text-lg font-medium">No approved requests found</p>
                            <p className="text-sm">Try adjusting your search criteria</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      approvedPaginated.map((fnf, idx) =>
                        renderApprovedRow(fnf, (approvedPage - 1) * approvedPageSize + idx)
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {approvedTotalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {(approvedPage - 1) * approvedPageSize + 1} to{" "}
                  {Math.min(approvedPage * approvedPageSize, filteredApprovedFnfs.length)}{" "}
                  of {filteredApprovedFnfs.length} entries
                </p>
                <div className="flex space-x-1">
                  {Array.from({ length: approvedTotalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setApprovedPage(i + 1)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        approvedPage === i + 1
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                          : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Approve Modal */}
      {approveOpen && (
        <BaseModal isOpen={approveOpen} onClose={() => setApproveOpen(false)}>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl  shadow-2xl w-full max-w-md mx-auto border">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Approve FNF</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Enter the final settlement details</p>
            </div>
            
            <form onSubmit={handleSubmit(onApproveSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  FNF Amount (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("fnfAmount", { required: "FNF Amount is required", min: 0 })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                {errors.fnfAmount && (
                  <p className="text-red-500 text-sm mt-1">{errors.fnfAmount.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Deductions (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("deductions", { required: "Deductions amount is required", min: 0 })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                {errors.deductions && (
                  <p className="text-red-500 text-sm mt-1">{errors.deductions.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Net Payable (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("netPayable", { required: "Net payable amount is required", min: 0 })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                {errors.netPayable && (
                  <p className="text-red-500 text-sm mt-1">{errors.netPayable.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Comments (Optional)
                </label>
                <textarea
                  placeholder="Add any additional comments..."
                  rows="3"
                  {...register("comments")}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <Button
                  onClick={() => setApproveOpen(false)}
                  variant="outlined"
                  className="flex-1 py-3 text-gray-600 border-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                >
                  Approve FNF
                </Button>
              </div>
            </form>
          </div>
        </BaseModal>
      )}

      {/* Update Modal */}
      {updateOpen && (
        <BaseModal isOpen={updateOpen} onClose={() => setUpdateOpen(false)}>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEdit className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Update FNF</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Modify the settlement details</p>
            </div>
            
            <form onSubmit={handleSubmit(onUpdateSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  FNF Amount (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("fnfAmount", { required: "FNF Amount is required", min: 0 })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.fnfAmount && (
                  <p className="text-red-500 text-sm mt-1">{errors.fnfAmount.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Deductions (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("deductions", { required: "Deductions amount is required", min: 0 })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.deductions && (
                  <p className="text-red-500 text-sm mt-1">{errors.deductions.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Net Payable (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("netPayable", { required: "Net payable amount is required", min: 0 })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.netPayable && (
                  <p className="text-red-500 text-sm mt-1">{errors.netPayable.message}</p>
                )}
              </div>

              <div className="flex space-x-4 pt-4">
                <Button
                  onClick={() => setUpdateOpen(false)}
                  variant="outlined"
                  className="flex-1 py-3 text-gray-600 border-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                >
                  Update FNF
                </Button>
              </div>
            </form>
          </div>
        </BaseModal>
      )}

      {/* Reject Confirmation Dialog */}
      {rejectOpen && (
        <ConfirmationDialog
          open={rejectOpen}
          title="Reject FNF Request"
          message={
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Please provide rejection comments for this FNF request:
              </p>
              <textarea
                value={rejectComment}
                onChange={(e) => setRejectComment(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                placeholder="Enter rejection reason..."
                rows="4"
              />
            </div>
          }
          onConfirm={confirmReject}
          onCancel={() => setRejectOpen(false)}
          confirmText="Reject Request"
          cancelText="Cancel"
        />
      )}
    </div>
  );
}