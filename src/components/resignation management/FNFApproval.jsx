// import React, { useEffect, useState, useMemo } from "react";
// import { FaUpload, FaCheck, FaTimes, FaSearch } from "react-icons/fa";
// import useFNFStore from "../../store/useFNFStore";
// import ConfirmationDialog from "../common/ConfirmationDialog"; // your custom dialog
// import BaseModal from "../common/BaseModal"; // if needed for forms
// import { Button } from "@mui/material";
// import { useForm } from "react-hook-form";
// import * as XLSX from "xlsx";

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

//   // Local UI state for modals
//   const [approveOpen, setApproveOpen] = useState(false);
//   const [updateOpen, setUpdateOpen] = useState(false);
//   const [rejectOpen, setRejectOpen] = useState(false);
//   const [selectedFNF, setSelectedFNF] = useState(null);

//   // react-hook-form for approve/update
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   // For the reject dialog, simply store the comment
//   const [rejectComment, setRejectComment] = useState("");

//   // Pagination state for pending FNF requests
//   const [pendingPage, setPendingPage] = useState(1);
//   const [pendingPageSize, setPendingPageSize] = useState(10);

//   // Search state
//   const [searchText, setSearchText] = useState("");

//   // Fetch FNF requests on mount
//   useEffect(() => {
//     fetchFNFRequests();
//   }, [fetchFNFRequests]);

//   // --- Approval Handlers ---
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
//     await approveFNF(selectedFNF._id, data);
//     setApproveOpen(false);
//     setSelectedFNF(null);
//   };

//   // --- Update Handlers ---
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
//     await updateFNF(selectedFNF._id, data);
//     setUpdateOpen(false);
//     setSelectedFNF(null);
//   };

//   // --- Reject Handlers ---
//   const openRejectDialog = (fnf) => {
//     setSelectedFNF(fnf);
//     setRejectComment("");
//     setRejectOpen(true);
//   };

//   const confirmReject = async () => {
//     if (!rejectComment.trim()) return;
//     await rejectFNF(selectedFNF._id, rejectComment);
//     setRejectOpen(false);
//     setSelectedFNF(null);
//   };

//   // --- Filtering ---
//   // Filter pendingFnfs based on searchText (by employee name or employee ID) - case-insensitive.
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

//   // --- Pagination Logic ---
//   const pendingTotalPages = Math.ceil(filteredPendingFnfs.length / pendingPageSize);
//   const pendingPaginated = useMemo(() => {
//     const startIndex = (pendingPage - 1) * pendingPageSize;
//     return filteredPendingFnfs.slice(startIndex, startIndex + pendingPageSize);
//   }, [filteredPendingFnfs, pendingPage, pendingPageSize]);

//   // --- Row Renderer ---
//   const renderRow = (fnf, index) => {
//     return (
//       <tr
//         key={fnf._id}
//         className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
//       >
//         <td className="py-3 px-4">{index + 1}</td>
//         <td className="py-3 px-4">
//           {fnf.employee
//             ? `${fnf.employee.first_Name || "N/A"} ${fnf.employee.last_Name || "N/A"}`
//             : "N/A"}
//         </td>
//         <td className="py-3 px-4">{fnf.employee?.employee_Id || "N/A"}</td>
//         <td className="py-3 px-4">
//           {fnf.resignation?.resignationDate
//             ? new Date(fnf.resignation.resignationDate).toLocaleDateString()
//             : "N/A"}
//         </td>
//         <td className="py-3 px-4">
//           {fnf.resignation?.lastWorkingDay
//             ? new Date(fnf.resignation.lastWorkingDay).toLocaleDateString()
//             : "N/A"}
//         </td>
//         <td className="py-3 px-4">
//           {fnf.requestedAt ? new Date(fnf.requestedAt).toLocaleString() : "N/A"}
//         </td>
//         <td className="py-3 px-4">
//           {fnf.createdAt ? new Date(fnf.createdAt).toLocaleString() : "N/A"}
//         </td>
//         <td className="py-3 px-4">
//           <span
//             className={`inline-block px-2 py-1 text-sm rounded ${
//               fnf.status === "Pending"
//                 ? "bg-yellow-100 text-yellow-800"
//                 : fnf.status === "Approved"
//                 ? "bg-green-100 text-green-800"
//                 : "bg-red-100 text-red-800"
//             }`}
//           >
//             {fnf.status}
//           </span>
//         </td>
//         <td className="py-3 px-4 space-x-2">
//           {fnf.status === "Pending" && (
//             <>
//               <button
//                 onClick={() => openApproveModal(fnf)}
//                 className="inline-flex items-center text-green-600 dark:text-green-400 hover:underline space-x-1"
//               >
//                 <FaCheck className="w-4 h-4" />
//                 <span>Approve</span>
//               </button>
//               <button
//                 onClick={() => openRejectDialog(fnf)}
//                 className="inline-flex items-center text-red-600 dark:text-red-400 hover:underline space-x-1"
//               >
//                 <FaTimes className="w-4 h-4" />
//                 <span>Reject</span>
//               </button>
//             </>
//           )}
//           {fnf.status === "Approved" && (
//             <button
//               onClick={() => openUpdateModal(fnf)}
//               className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline space-x-1"
//             >
//               <FaCheck className="w-4 h-4" />
//               <span>Update</span>
//             </button>
//           )}
//         </td>
//       </tr>
//     );
//   };

//   // --- Export Functionality ---
//   const exportToExcel = () => {
//     // Prepare data for export
//     const exportData = pendingFnfs.map((fnf, index) => ({
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
//       "Status": fnf.status,
//     }));

//     // Create a new workbook and worksheet
//     const worksheet = XLSX.utils.json_to_sheet(exportData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "FNF Approvals");

//     // Trigger the download
//     XLSX.writeFile(workbook, "FNF_Approvals.xlsx");
//   };

//   return (
//     <div className="p-4 space-y-4">
//       {/* Title and Export Button */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
//           FNF Approvals
//         </h1>
//         <button
//           onClick={exportToExcel}
//           className="px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors inline-flex items-center space-x-1"
//         >
//           <FaUpload className="w-4 h-4" />
//           <span>Export</span>
//         </button>
//       </div>

//       {/* Filters Section */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 md:space-x-4">
//         <div className="flex items-center space-x-2">
//           <label
//             htmlFor="showEntriesFNF"
//             className="text-gray-700 dark:text-gray-200"
//           >
//             Show
//           </label>
//           <select
//             id="showEntriesFNF"
//             value={pendingPageSize}
//             onChange={(e) => {
//               setPendingPageSize(Number(e.target.value));
//               setPendingPage(1);
//             }}
//             className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded px-2 py-1"
//           >
//             <option value={10}>10</option>
//             <option value={25}>25</option>
//             <option value={50}>50</option>
//           </select>
//         </div>
//         <div className="flex flex-wrap items-center space-x-2">
//           <div className="relative">
//             <FaSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
//             <input
//               type="text"
//               placeholder="Search by Name or Emp ID"
//               value={searchText}
//               onChange={(e) => {
//                 setSearchText(e.target.value);
//                 setPendingPage(1);
//               }}
//               className="pl-8 pr-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Table Container */}
//       <div className="overflow-x-auto border border-gray-200 dark:border-gray-600 rounded">
//         <table className="min-w-full text-left">
//           <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
//             <tr>
//               <th className="py-3 px-4 font-semibold">S.L</th>
//               <th className="py-3 px-4 font-semibold">Employee Name</th>
//               <th className="py-3 px-4 font-semibold">Employee ID</th>
//               <th className="py-3 px-4 font-semibold">Resignation Date</th>
//               <th className="py-3 px-4 font-semibold">Last Working Day</th>
//               <th className="py-3 px-4 font-semibold">Responded At</th>
//               <th className="py-3 px-4 font-semibold">Created At</th>
//               <th className="py-3 px-4 font-semibold">Status</th>
//               <th className="py-3 px-4 font-semibold">Action</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-700 dark:text-gray-200">
//             {pendingPaginated.length === 0 ? (
//               <tr>
//                 <td className="py-3 px-4" colSpan="9">
//                   No pending FNF requests.
//                 </td>
//               </tr>
//             ) : (
//               pendingPaginated.map((fnf, idx) =>
//                 renderRow(fnf, (pendingPage - 1) * pendingPageSize + idx)
//               )
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Footer */}
//       <div className="flex flex-col md:flex-row justify-between items-center mt-4">
//         <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 md:mb-0">
//           Showing {(pendingPage - 1) * pendingPageSize + 1} to{" "}
//           {Math.min(pendingPage * pendingPageSize, filteredPendingFnfs.length)} of{" "}
//           {filteredPendingFnfs.length} entries
//         </p>
//         <div className="flex space-x-2">
//           {Array.from({ length: pendingTotalPages }, (_, i) => (
//             <button
//               key={i}
//               onClick={() => setPendingPage(i + 1)}
//               className={`px-3 py-1 rounded border transition-colors ${
//                 pendingPage === i + 1
//                   ? "bg-blue-600 text-white border-blue-600"
//                   : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       </div>

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
//                 className="w-full border p-2 mb-2"
//               />
//               {errors.fnfAmount && (
//                 <p className="text-red-600">{errors.fnfAmount.message}</p>
//               )}
//               <input
//                 type="number"
//                 step="0.01"
//                 placeholder="Deductions (₹)"
//                 {...register("deductions", { required: "Required", min: 0 })}
//                 className="w-full border p-2 mb-2"
//               />
//               {errors.deductions && (
//                 <p className="text-red-600">{errors.deductions.message}</p>
//               )}
//               <input
//                 type="number"
//                 step="0.01"
//                 placeholder="Net Payable (₹)"
//                 {...register("netPayable", { required: "Required", min: 0 })}
//                 className="w-full border p-2 mb-2"
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
//                 <Button type="submit" variant="contained" color="primary" className="w-1/3">
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
//             <form onSubmit={handleSubmit(onUpdateSubmit)}>
//               <input
//                 type="number"
//                 step="0.01"
//                 placeholder="FNF Amount (₹)"
//                 {...register("fnfAmount", { required: "Required", min: 0 })}
//                 className="w-full border p-2 mb-2"
//               />
//               {errors.fnfAmount && (
//                 <p className="text-red-600">{errors.fnfAmount.message}</p>
//               )}
//               <input
//                 type="number"
//                 step="0.01"
//                 placeholder="Deductions (₹)"
//                 {...register("deductions", { required: "Required", min: 0 })}
//                 className="w-full border p-2 mb-2"
//               />
//               {errors.deductions && (
//                 <p className="text-red-600">{errors.deductions.message}</p>
//               )}
//               <input
//                 type="number"
//                 step="0.01"
//                 placeholder="Net Payable (₹)"
//                 {...register("netPayable", { required: "Required", min: 0 })}
//                 className="w-full border p-2 mb-2"
//               />
//               {errors.netPayable && (
//                 <p className="text-red-600">{errors.netPayable.message}</p>
//               )}
//               <div className="flex justify-center gap-4">
//                 <Button
//                   onClick={() => setUpdateOpen(false)}
//                   variant="outlined"
//                   color="secondary"
//                   className="w-1/3"
//                 >
//                   Cancel
//                 </Button>
//                 <Button type="submit" variant="contained" color="primary" className="w-1/3">
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
import { FaUpload, FaCheck, FaTimes, FaSearch } from "react-icons/fa";
import useFNFStore from "../../store/useFNFStore";
import ConfirmationDialog from "../common/ConfirmationDialog";
import BaseModal from "../common/BaseModal";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import * as XLSX from "xlsx";

// 1) Import react-hot-toast
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

  const [approveOpen, setApproveOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [selectedFNF, setSelectedFNF] = useState(null);

  const [rejectComment, setRejectComment] = useState("");

  const [pendingPage, setPendingPage] = useState(1);
  const [pendingPageSize, setPendingPageSize] = useState(10);

  const [searchText, setSearchText] = useState("");

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch FNF requests on mount
  useEffect(() => {
    fetchFNFRequests();
  }, [fetchFNFRequests]);

  // ------------------- Approval Handlers -------------------
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

  // ------------------- Update Handlers -------------------
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

  // ------------------- Reject Handlers -------------------
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

  // ------------------- Filtering Logic -------------------
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

  // ------------------- Pagination Logic -------------------
  const pendingTotalPages = Math.ceil(
    filteredPendingFnfs.length / pendingPageSize
  );

  const pendingPaginated = useMemo(() => {
    const startIndex = (pendingPage - 1) * pendingPageSize;
    return filteredPendingFnfs.slice(startIndex, startIndex + pendingPageSize);
  }, [filteredPendingFnfs, pendingPage, pendingPageSize]);

  // ------------------- Row Renderer -------------------
  const renderRow = (fnf, index) => (
    <tr
      key={fnf._id}
      className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
    >
      <td className="py-3 px-4">{index + 1}</td>
      <td className="py-3 px-4">
        {fnf.employee
          ? `${fnf.employee.first_Name || "N/A"} ${
              fnf.employee.last_Name || "N/A"
            }`
          : "N/A"}
      </td>
      <td className="py-3 px-4">{fnf.employee?.employee_Id || "N/A"}</td>
      <td className="py-3 px-4">
        {fnf.resignation?.resignationDate
          ? new Date(fnf.resignation.resignationDate).toLocaleDateString()
          : "N/A"}
      </td>
      <td className="py-3 px-4">
        {fnf.resignation?.lastWorkingDay
          ? new Date(fnf.resignation.lastWorkingDay).toLocaleDateString()
          : "N/A"}
      </td>
      <td className="py-3 px-4">
        {fnf.requestedAt ? new Date(fnf.requestedAt).toLocaleString() : "N/A"}
      </td>
      <td className="py-3 px-4">
        {fnf.createdAt ? new Date(fnf.createdAt).toLocaleString() : "N/A"}
      </td>
      <td className="py-3 px-4">
        <span
          className={`inline-block px-2 py-1 text-sm rounded ${
            fnf.status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : fnf.status === "Approved"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {fnf.status}
        </span>
      </td>
      <td className="py-3 px-4 space-x-2">
        {fnf.status === "Pending" && (
          <>
            <button
              onClick={() => openApproveModal(fnf)}
              className="inline-flex items-center text-green-600 dark:text-green-400 hover:underline space-x-1"
            >
              <FaCheck className="w-4 h-4" />
              <span>Approve</span>
            </button>
            <button
              onClick={() => openRejectDialog(fnf)}
              className="inline-flex items-center text-red-600 dark:text-red-400 hover:underline space-x-1"
            >
              <FaTimes className="w-4 h-4" />
              <span>Reject</span>
            </button>
          </>
        )}
        {fnf.status === "Approved" && (
          <button
            onClick={() => openUpdateModal(fnf)}
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline space-x-1"
          >
            <FaCheck className="w-4 h-4" />
            <span>Update</span>
          </button>
        )}
      </td>
    </tr>
  );

  // ------------------- Export Functionality -------------------
  const exportToExcel = () => {
    const exportData = pendingFnfs.map((fnf, index) => ({
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
    XLSX.utils.book_append_sheet(workbook, worksheet, "FNF Approvals");

    XLSX.writeFile(workbook, "FNF_Approvals.xlsx");
  };

  // ------------------- Render -------------------
  return (
    <div className="p-4 space-y-4">
  

      {/* Title and Export Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          FNF Approvals
        </h1>
        <button
          onClick={exportToExcel}
          className="px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors inline-flex items-center space-x-1"
        >
          <FaUpload className="w-4 h-4" />
          <span>Export</span>
        </button>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 md:space-x-4">
        <div className="flex items-center space-x-2">
          <label
            htmlFor="showEntriesFNF"
            className="text-gray-700 dark:text-gray-200"
          >
            Show
          </label>
          <select
            id="showEntriesFNF"
            value={pendingPageSize}
            onChange={(e) => {
              setPendingPageSize(Number(e.target.value));
              setPendingPage(1);
            }}
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded px-2 py-1"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="flex flex-wrap items-center space-x-2">
          <div className="relative">
            <FaSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
            <input
              type="text"
              placeholder="Search by Name or Emp ID"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setPendingPage(1);
              }}
              className="pl-8 pr-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto border border-gray-200 dark:border-gray-600 rounded">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="py-3 px-4 font-semibold">S.L</th>
              <th className="py-3 px-4 font-semibold">Employee Name</th>
              <th className="py-3 px-4 font-semibold">Employee ID</th>
              <th className="py-3 px-4 font-semibold">Resignation Date</th>
              <th className="py-3 px-4 font-semibold">Last Working Day</th>
              <th className="py-3 px-4 font-semibold">Responded At</th>
              <th className="py-3 px-4 font-semibold">Created At</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-200">
            {pendingPaginated.length === 0 ? (
              <tr>
                <td className="py-3 px-4" colSpan="9">
                  No pending FNF requests.
                </td>
              </tr>
            ) : (
              pendingPaginated.map((fnf, idx) =>
                renderRow(fnf, (pendingPage - 1) * pendingPageSize + idx)
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 md:mb-0">
          Showing {(pendingPage - 1) * pendingPageSize + 1} to{" "}
          {Math.min(pendingPage * pendingPageSize, filteredPendingFnfs.length)} of{" "}
          {filteredPendingFnfs.length} entries
        </p>
        <div className="flex space-x-2">
          {Array.from({ length: pendingTotalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPendingPage(i + 1)}
              className={`px-3 py-1 rounded border transition-colors ${
                pendingPage === i + 1
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Approve Modal */}
      {approveOpen && (
        <BaseModal isOpen={approveOpen} onClose={() => setApproveOpen(false)}>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-11/12 md:w-1/3">
            <h3 className="text-lg font-bold mb-3">Approve FNF</h3>
            <form onSubmit={handleSubmit(onApproveSubmit)}>
              <input
                type="number"
                step="0.01"
                placeholder="FNF Amount (₹)"
                {...register("fnfAmount", { required: "Required", min: 0 })}
                className="w-full border p-2 mb-2"
              />
              {errors.fnfAmount && (
                <p className="text-red-600">{errors.fnfAmount.message}</p>
              )}
              <input
                type="number"
                step="0.01"
                placeholder="Deductions (₹)"
                {...register("deductions", { required: "Required", min: 0 })}
                className="w-full border p-2 mb-2"
              />
              {errors.deductions && (
                <p className="text-red-600">{errors.deductions.message}</p>
              )}
              <input
                type="number"
                step="0.01"
                placeholder="Net Payable (₹)"
                {...register("netPayable", { required: "Required", min: 0 })}
                className="w-full border p-2 mb-2"
              />
              {errors.netPayable && (
                <p className="text-red-600">{errors.netPayable.message}</p>
              )}
              <textarea
                placeholder="Comments (Optional)"
                {...register("comments")}
                className="w-full border p-2 mb-4"
              />
              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => setApproveOpen(false)}
                  variant="outlined"
                  color="secondary"
                  className="w-1/3"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="w-1/3"
                >
                  Approve
                </Button>
              </div>
            </form>
          </div>
        </BaseModal>
      )}

      {/* Update Modal */}
      {updateOpen && (
        <BaseModal isOpen={updateOpen} onClose={() => setUpdateOpen(false)}>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-11/12 md:w-1/3">
            <h3 className="text-lg font-bold mb-3">Update FNF</h3>
            <form onSubmit={handleSubmit(onUpdateSubmit)}>
              <input
                type="number"
                step="0.01"
                placeholder="FNF Amount (₹)"
                {...register("fnfAmount", { required: "Required", min: 0 })}
                className="w-full border p-2 mb-2"
              />
              {errors.fnfAmount && (
                <p className="text-red-600">{errors.fnfAmount.message}</p>
              )}
              <input
                type="number"
                step="0.01"
                placeholder="Deductions (₹)"
                {...register("deductions", { required: "Required", min: 0 })}
                className="w-full border p-2 mb-2"
              />
              {errors.deductions && (
                <p className="text-red-600">{errors.deductions.message}</p>
              )}
              <input
                type="number"
                step="0.01"
                placeholder="Net Payable (₹)"
                {...register("netPayable", { required: "Required", min: 0 })}
                className="w-full border p-2 mb-2"
              />
              {errors.netPayable && (
                <p className="text-red-600">{errors.netPayable.message}</p>
              )}
              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => setUpdateOpen(false)}
                  variant="outlined"
                  color="secondary"
                  className="w-1/3"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="w-1/3"
                >
                  Update
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
          title="Reject FNF"
          message={
            <div>
              <p>Please provide rejection comments:</p>
              <textarea
                value={rejectComment}
                onChange={(e) => setRejectComment(e.target.value)}
                className="w-full border p-2 mt-2"
                placeholder="Enter your comments here..."
              />
            </div>
          }
          onConfirm={confirmReject}
          onCancel={() => setRejectOpen(false)}
          confirmText="Reject"
          cancelText="Cancel"
        />
      )}
    </div>
  );
}
