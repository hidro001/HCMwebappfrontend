// import React from 'react';
// import { FaUpload, FaCheck, FaTimes, FaSearch } from 'react-icons/fa';

// export default function FNFApproval() {
//   return (
//     <div className="p-4 space-y-4">
//       {/* Title and "Import" button */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
//           FNF Approvals
//         </h1>
//        <button className="px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors inline-flex items-center space-x-1">
//                 <FaUpload className="w-4 h-4" />
//                 <span>Import</span>
//               </button>
//       </div>

//       {/* Header Section (Filters) */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 md:space-x-4">
        
//         {/* Left controls: Show entries */}
//         <div className="flex items-center space-x-2">
//           <label htmlFor="showEntriesFNF" className="text-gray-700 dark:text-gray-200">
//             Show
//           </label>
//           <select
//             id="showEntriesFNF"
//             className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded px-2 py-1"
//           >
//             <option>10</option>
//             <option>25</option>
//             <option>50</option>
//           </select>
//         </div>

//         {/* Right controls: Month, Department, Status, Search & Import */}
//         <div className="flex flex-wrap items-center space-x-2">
//           <select className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded px-2 py-1">
//             <option>JAN 2025</option>
//           </select>
//           <select className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded px-2 py-1">
//             <option>Department</option>
//             <option>IT</option>
//             <option>Marketing</option>
//           </select>
//           <select className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded px-2 py-1">
//             <option>Status</option>
//             <option>Pending</option>
//             <option>Reject</option>
//             <option>Approve</option>
//           </select>

//           {/* Search Input */}
//           <div className="relative">
//             <FaSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="pl-8 pr-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none"
//             />
//           </div>

//           {/* Import Button (if needed) */}
//           {/* <button className="bg-blue-600 text-white rounded px-3 py-1 hover:bg-blue-700 inline-flex items-center space-x-1">
//             <FaUpload className="w-4 h-4" />
//             <span>Import</span>
//           </button> */}
//         </div>
//       </div>

//       {/* Table Container */}
//       <div className="overflow-x-auto border border-gray-200 dark:border-gray-600 rounded">
//         <table className="min-w-full text-left">
//           <thead>
//             <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
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
//             {/* Example row 1 */}
//             <tr className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
//               <td className="py-3 px-4">1</td>
//               <td className="py-3 px-4">UI/UX Designer</td>
//               <td className="py-3 px-4">IT</td>
//               <td className="py-3 px-4">3 LPA</td>
//               <td className="py-3 px-4">Riya Mishra (R0023)</td>
//               <td className="py-3 px-4">25 Jan 2025</td>
//               <td className="py-3 px-4">25 Jan 2025</td>
//               <td className="py-3 px-4">
//                 <span className="inline-block px-2 py-1 text-sm rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100">
//                   Pending
//                 </span>
//               </td>
//               <td className="py-3 px-4 space-x-2">
//                 <button className="inline-flex items-center text-green-600 dark:text-green-400 hover:underline space-x-1">
//                   <FaCheck className="w-4 h-4" />
//                   <span>Approve</span>
//                 </button>
//                 <button className="inline-flex items-center text-red-600 dark:text-red-400 hover:underline space-x-1">
//                   <FaTimes className="w-4 h-4" />
//                   <span>Reject</span>
//                 </button>
//               </td>
//             </tr>

//             {/* Example row 2 */}
//             <tr className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
//               <td className="py-3 px-4">2</td>
//               <td className="py-3 px-4">UI/UX Designer</td>
//               <td className="py-3 px-4">Marketing</td>
//               <td className="py-3 px-4">3 LPA</td>
//               <td className="py-3 px-4">Riya Mishra (R0023)</td>
//               <td className="py-3 px-4">25 Jan 2025</td>
//               <td className="py-3 px-4">25 Jan 2025</td>
//               <td className="py-3 px-4">
//                 <span className="inline-block px-2 py-1 text-sm rounded bg-red-100 text-red-800 dark:bg-red-600 dark:text-red-100">
//                   Reject
//                 </span>
//               </td>
//               <td className="py-3 px-4 space-x-2">
//                 <button className="inline-flex items-center text-green-600 dark:text-green-400 hover:underline space-x-1">
//                   <FaCheck className="w-4 h-4" />
//                   <span>Approve</span>
//                 </button>
//                 <button className="inline-flex items-center text-red-600 dark:text-red-400 hover:underline space-x-1">
//                   <FaTimes className="w-4 h-4" />
//                   <span>Reject</span>
//                 </button>
//               </td>
//             </tr>

//             {/* Example row 3 */}
//             <tr className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
//               <td className="py-3 px-4">3</td>
//               <td className="py-3 px-4">UI/UX Designer</td>
//               <td className="py-3 px-4">Marketing</td>
//               <td className="py-3 px-4">3 LPA</td>
//               <td className="py-3 px-4">Riya Mishra (R0023)</td>
//               <td className="py-3 px-4">25 Jan 2025</td>
//               <td className="py-3 px-4">25 Jan 2025</td>
//               <td className="py-3 px-4">
//                 <span className="inline-block px-2 py-1 text-sm rounded bg-green-100 text-green-800 dark:bg-green-600 dark:text-green-100">
//                   Approve
//                 </span>
//               </td>
//               <td className="py-3 px-4 space-x-2">
//                 <button className="inline-flex items-center text-green-600 dark:text-green-400 hover:underline space-x-1">
//                   <FaCheck className="w-4 h-4" />
//                   <span>Approve</span>
//                 </button>
//                 <button className="inline-flex items-center text-red-600 dark:text-red-400 hover:underline space-x-1">
//                   <FaTimes className="w-4 h-4" />
//                   <span>Reject</span>
//                 </button>
//               </td>
//             </tr>
//             {/* ... add more rows as needed ... */}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination & Footer */}
//       <div className="flex flex-col md:flex-row justify-between items-center mt-4">
//         <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 md:mb-0">
//           Showing 1 to 10 of 10 entries
//         </p>
//         <div className="flex space-x-2">
//           <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded">
//             1
//           </button>
//           <button className="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded">
//             2
//           </button>
//           <button className="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded">
//             3
//           </button>
//           <button className="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded">
//             4
//           </button>
//           <button className="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded">
//             5
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/components/FNFApproval.jsx
import React, { useEffect, useState } from "react";
import { FaUpload, FaCheck, FaTimes, FaSearch } from "react-icons/fa";
import useFNFStore from "../../store/useFNFStore";
import ConfirmationDialog from "../common/ConfirmationDialog"; // your custom dialog
import BaseModal from "../common/BaseModal"; // if needed for forms
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";

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

  // Local UI state for modals
  const [approveOpen, setApproveOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [selectedFNF, setSelectedFNF] = useState(null);

  // react-hook-form for approve/update
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // For the reject dialog, simply store the comment
  const [rejectComment, setRejectComment] = useState("");

  useEffect(() => {
    fetchFNFRequests();
  }, [fetchFNFRequests]);

  // Handlers for Approve
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
    await approveFNF(selectedFNF._id, data);
    setApproveOpen(false);
    setSelectedFNF(null);
  };

  // Handler for Update
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
    await updateFNF(selectedFNF._id, data);
    setUpdateOpen(false);
    setSelectedFNF(null);
  };

  // Handler for Reject
  const openRejectDialog = (fnf) => {
    setSelectedFNF(fnf);
    setRejectComment("");
    setRejectOpen(true);
  };

  const confirmReject = async () => {
    if (!rejectComment.trim()) return;
    await rejectFNF(selectedFNF._id, rejectComment);
    setRejectOpen(false);
    setSelectedFNF(null);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Title and Import button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          FNF Approvals
        </h1>
        <button className="px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors inline-flex items-center space-x-1">
          <FaUpload className="w-4 h-4" />
          <span>Import</span>
        </button>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 md:space-x-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="showEntriesFNF" className="text-gray-700 dark:text-gray-200">
            Show
          </label>
          <select
            id="showEntriesFNF"
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded px-2 py-1"
          >
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>
        <div className="flex flex-wrap items-center space-x-2">
          <select className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded px-2 py-1">
            <option>JAN 2025</option>
          </select>
          <select className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded px-2 py-1">
            <option>Department</option>
            <option>IT</option>
            <option>Marketing</option>
          </select>
          <select className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded px-2 py-1">
            <option>Status</option>
            <option>Pending</option>
            <option>Reject</option>
            <option>Approve</option>
          </select>
          <div className="relative">
            <FaSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-8 pr-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto border border-gray-200 dark:border-gray-600 rounded">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
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
            {/** Here you can map through your FNF requests.
             * For demonstration, we assume pendingFnfs contains the data for the pending table.
             */}
            {pendingFnfs.length === 0 ? (
              <tr>
                <td className="py-3 px-4" colSpan="9">
                  No pending FNF requests.
                </td>
              </tr>
            ) : (
              pendingFnfs.map((fnf, idx) => (
                <tr
                  key={fnf._id}
                  className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="py-3 px-4">{idx + 1}</td>
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
                    {fnf.requestedAt
                      ? new Date(fnf.requestedAt).toLocaleString()
                      : "N/A"}
                  </td>
                  <td className="py-3 px-4">
                    {fnf.createdAt
                      ? new Date(fnf.createdAt).toLocaleString()
                      : "N/A"}
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination & Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 md:mb-0">
          Showing 1 to 10 of 10 entries
        </p>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded"
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      {/** Approve Modal */}
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
              {errors.fnfAmount && <p className="text-red-600">{errors.fnfAmount.message}</p>}
              <input
                type="number"
                step="0.01"
                placeholder="Deductions (₹)"
                {...register("deductions", { required: "Required", min: 0 })}
                className="w-full border p-2 mb-2"
              />
              {errors.deductions && <p className="text-red-600">{errors.deductions.message}</p>}
              <input
                type="number"
                step="0.01"
                placeholder="Net Payable (₹)"
                {...register("netPayable", { required: "Required", min: 0 })}
                className="w-full border p-2 mb-2"
              />
              {errors.netPayable && <p className="text-red-600">{errors.netPayable.message}</p>}
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
                <Button type="submit" variant="contained" color="primary" className="w-1/3">
                  Approve
                </Button>
              </div>
            </form>
          </div>
        </BaseModal>
      )}

      {/** Update Modal */}
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
              {errors.fnfAmount && <p className="text-red-600">{errors.fnfAmount.message}</p>}
              <input
                type="number"
                step="0.01"
                placeholder="Deductions (₹)"
                {...register("deductions", { required: "Required", min: 0 })}
                className="w-full border p-2 mb-2"
              />
              {errors.deductions && <p className="text-red-600">{errors.deductions.message}</p>}
              <input
                type="number"
                step="0.01"
                placeholder="Net Payable (₹)"
                {...register("netPayable", { required: "Required", min: 0 })}
                className="w-full border p-2 mb-2"
              />
              {errors.netPayable && <p className="text-red-600">{errors.netPayable.message}</p>}
              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => setUpdateOpen(false)}
                  variant="outlined"
                  color="secondary"
                  className="w-1/3"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary" className="w-1/3">
                  Update
                </Button>
              </div>
            </form>
          </div>
        </BaseModal>
      )}

      {/** Reject Confirmation Dialog */}
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
