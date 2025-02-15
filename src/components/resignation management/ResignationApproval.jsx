// import React from 'react';
// import { FaUpload, FaCheck, FaTimes, FaSearch } from 'react-icons/fa';

// export default function ResignationApproval() {
//   return (
//     <div className="p-4">
//       {/* Header: Title & Import Button */}
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
//           Resignation Approvals
//         </h1>
//         <button className="px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors inline-flex items-center space-x-1">
//           <FaUpload className="w-4 h-4" />
//           <span>Import</span>
//         </button>
//       </div>

//       {/* Filters Section */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 md:space-x-4 mb-4">
//         {/* Left controls: Show entries */}
//         <div className="flex items-center space-x-2">
//           <label htmlFor="showEntries" className="text-gray-700 dark:text-gray-200">
//             Show
//           </label>
//           <select
//             id="showEntries"
//             className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 
//                        text-gray-700 dark:text-gray-200 rounded px-2 py-1"
//           >
//             <option>10</option>
//             <option>25</option>
//             <option>50</option>
//           </select>
//         </div>

//         {/* Right controls: Date, Department, Status filters, and Search */}
//         <div className="flex flex-wrap items-center space-x-2">
//           <select className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 
//                              text-gray-700 dark:text-gray-200 rounded px-2 py-1">
//             <option>JAN 2025</option>
//           </select>
//           <select className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 
//                              text-gray-700 dark:text-gray-200 rounded px-2 py-1">
//             <option>Department</option>
//             <option>IT</option>
//             <option>Marketing</option>
//           </select>
//           <select className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 
//                              text-gray-700 dark:text-gray-200 rounded px-2 py-1">
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
//               className="pl-8 pr-2 py-1 border border-gray-300 dark:border-gray-600 
//                          rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 
//                          focus:outline-none"
//             />
//           </div>
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
//                 <span className="inline-block px-2 py-1 text-sm rounded bg-yellow-100 
//                                 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100">
//                   Pending
//                 </span>
//               </td>
//               <td className="py-3 px-4 space-x-2">
//                 <button className="inline-flex items-center text-green-600 dark:text-green-400 
//                                    hover:underline space-x-1">
//                   <FaCheck className="w-4 h-4" />
//                   <span>Approve</span>
//                 </button>
//                 <button className="inline-flex items-center text-red-600 dark:text-red-400 
//                                    hover:underline space-x-1">
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
//                 <span className="inline-block px-2 py-1 text-sm rounded bg-red-100 
//                                 text-red-800 dark:bg-red-600 dark:text-red-100">
//                   Reject
//                 </span>
//               </td>
//               <td className="py-3 px-4 space-x-2">
//                 <button className="inline-flex items-center text-green-600 dark:text-green-400 
//                                    hover:underline space-x-1">
//                   <FaCheck className="w-4 h-4" />
//                   <span>Approve</span>
//                 </button>
//                 <button className="inline-flex items-center text-red-600 dark:text-red-400 
//                                    hover:underline space-x-1">
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
//                 <span className="inline-block px-2 py-1 text-sm rounded bg-green-100 
//                                 text-green-800 dark:bg-green-600 dark:text-green-100">
//                   Approve
//                 </span>
//               </td>
//               <td className="py-3 px-4 space-x-2">
//                 <button className="inline-flex items-center text-green-600 dark:text-green-400 
//                                    hover:underline space-x-1">
//                   <FaCheck className="w-4 h-4" />
//                   <span>Approve</span>
//                 </button>
//                 <button className="inline-flex items-center text-red-600 dark:text-red-400 
//                                    hover:underline space-x-1">
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
//           <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 
//                              dark:text-gray-200 rounded">
//             1
//           </button>
//           <button className="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 
//                              dark:text-gray-200 rounded">
//             2
//           </button>
//           <button className="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 
//                              dark:text-gray-200 rounded">
//             3
//           </button>
//           <button className="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 
//                              dark:text-gray-200 rounded">
//             4
//           </button>
//           <button className="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 
//                              dark:text-gray-200 rounded">
//             5
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// src/components/ResignationApproval.jsx


import React, { useEffect, useState } from "react";
import { FaUpload, FaCheck, FaTimes, FaSearch } from "react-icons/fa";
import { Button } from "@mui/material";
import useResignationStore from "../../store/managerResignationStore";
import ConfirmationDialog from "../common/ConfirmationDialog"; // your custom confirmation dialog
import BaseModal from "../common/BaseModal"; // a simple modal component
import { toast } from "react-toastify";

export default function ResignationApproval() {
  const {
    managerPending,
    managerHistory,
    fetchManagerPendingResignations,
    fetchManagerHistory,
    approveResignation,
    rejectResignation,
    loading,
  } = useResignationStore();

  // Local UI state
  const [activeTab, setActiveTab] = useState("pending"); // "pending" or "history"
  const [selectedResignationId, setSelectedResignationId] = useState(null);

  // Approve confirmation dialog state
  const [approveModalOpen, setApproveModalOpen] = useState(false);

  // Reject dialog state
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectComment, setRejectComment] = useState("");

  useEffect(() => {
    // Fetch both pending and history on mount
    fetchManagerPendingResignations();
    fetchManagerHistory();
  }, [fetchManagerPendingResignations, fetchManagerHistory]);

  // --- Approval Handlers ---
  const handleApproveClick = (id) => {
    setSelectedResignationId(id);
    setApproveModalOpen(true);
  };

  const handleConfirmApprove = async () => {
    await approveResignation(selectedResignationId);
    setApproveModalOpen(false);
    setSelectedResignationId(null);
  };

  // --- Rejection Handlers ---
  const handleRejectClick = (id) => {
    setSelectedResignationId(id);
    setRejectModalOpen(true);
  };

  const handleConfirmReject = async () => {
    if (!rejectComment.trim()) {
      toast.error("Please provide rejection comments.");
      return;
    }
    await rejectResignation(selectedResignationId, rejectComment);
    setRejectModalOpen(false);
    setSelectedResignationId(null);
    setRejectComment("");
  };

  // Render a table row for a resignation (shared by both tabs)
  const renderRow = (resignation, index) => {
    const {
      _id,
      employee,
      resignationDate,
      lastWorkingDay,
      createdAt,
      status,
    } = resignation;
    return (
      <tr key={_id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
        <td className="py-3 px-4">{index + 1}</td>
        <td className="py-3 px-4">
          {employee
            ? `${employee.first_Name || "N/A"} ${employee.last_Name || "N/A"}`
            : "N/A"}
        </td>
        <td className="py-3 px-4">{employee?.employee_Id || "N/A"}</td>
        <td className="py-3 px-4">
          {resignationDate ? new Date(resignationDate).toLocaleDateString() : "N/A"}
        </td>
        <td className="py-3 px-4">
          {lastWorkingDay ? new Date(lastWorkingDay).toLocaleDateString() : "N/A"}
        </td>
        <td className="py-3 px-4">
          {createdAt ? new Date(createdAt).toLocaleString() : "N/A"}
        </td>
        <td className="py-3 px-4">
          <span
            className={`inline-block px-2 py-1 text-sm rounded ${
              status === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : status === "Approved"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {status}
          </span>
        </td>
        <td className="py-3 px-4 space-x-2">
          {status === "Pending" && (
            <>
              <button
                onClick={() => handleApproveClick(_id)}
                className="inline-flex items-center text-green-600 hover:underline space-x-1"
              >
                <FaCheck className="w-4 h-4" />
                <span>Approve</span>
              </button>
              <button
                onClick={() => handleRejectClick(_id)}
                className="inline-flex items-center text-red-600 hover:underline space-x-1"
              >
                <FaTimes className="w-4 h-4" />
                <span>Reject</span>
              </button>
            </>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div className="p-4">
      {/* Header: Title & Import Button */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Resignation Approvals
        </h1>
        <button className="px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors inline-flex items-center space-x-1">
          <FaUpload className="w-4 h-4" />
          <span>Import</span>
        </button>
      </div>

      {/* (Optional) Filters Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        {/* You can include your filters here if needed */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <FaSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-8 pr-2 py-1 border rounded bg-white dark:bg-gray-800 text-gray-700"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-4 border-b border-gray-200 dark:border-gray-600">
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "pending" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          Pending Approvals
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "history" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          All Resignation History
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto border border-gray-200 dark:border-gray-600 rounded">
        {loading ? (
          <div className="p-4 text-center">Loading...</div>
        ) : activeTab === "pending" ? (
          <table className="min-w-full text-left">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="py-3 px-4">S.L</th>
                <th className="py-3 px-4">Employee Name</th>
                <th className="py-3 px-4">Employee ID</th>
                <th className="py-3 px-4">Resignation Date</th>
                <th className="py-3 px-4">Last Working Day</th>
                <th className="py-3 px-4">Created At</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-200">
              {managerPending && managerPending.length > 0 ? (
                managerPending.map((resignation, index) =>
                  renderRow(resignation, index)
                )
              ) : (
                <tr>
                  <td className="py-3 px-4" colSpan="8">
                    No pending resignations.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <table className="min-w-full text-left">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="py-3 px-4">S.L</th>
                <th className="py-3 px-4">Employee Name</th>
                <th className="py-3 px-4">Employee ID</th>
                <th className="py-3 px-4">Resignation Date</th>
                <th className="py-3 px-4">Last Working Day</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Responded At</th>
                <th className="py-3 px-4">Comments</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-200">
              {managerHistory && managerHistory.length > 0 ? (
                managerHistory.map((resignation, index) => {
                  // For history, we assume that the approver info is stored inside each resignation.
                  // Adjust according to your API response.
                  const approver =
                    resignation.approvers?.find(
                      (a) =>
                        a.manager?._id === localStorage.getItem("userId")
                    ) || {};
                  return (
                    <tr
                      key={resignation._id}
                      className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">
                        {resignation.employee
                          ? `${resignation.employee.first_Name || "N/A"} ${
                              resignation.employee.last_Name || "N/A"
                            }`
                          : "N/A"}
                      </td>
                      <td className="py-3 px-4">
                        {resignation.employee?.employee_Id || "N/A"}
                      </td>
                      <td className="py-3 px-4">
                        {resignation.resignationDate
                          ? new Date(resignation.resignationDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="py-3 px-4">
                        {resignation.lastWorkingDay
                          ? new Date(resignation.lastWorkingDay).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-1 text-sm rounded ${
                            resignation.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : resignation.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {resignation.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {approver?.respondedAt
                          ? new Date(approver.respondedAt).toLocaleString()
                          : "N/A"}
                      </td>
                      <td className="py-3 px-4">
                        {approver?.comments || "N/A"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="py-3 px-4" colSpan="8">
                    No resignation history.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination & Footer (if needed) */}
      {/* ... Add your pagination controls here ... */}

      {/* Confirmation Dialog for Approve */}
      <ConfirmationDialog
        open={approveModalOpen}
        title="Approve Resignation"
        message="Are you sure you want to approve this resignation?"
        onConfirm={handleConfirmApprove}
        onCancel={() => setApproveModalOpen(false)}
        confirmText="Yes, Approve"
        cancelText="Cancel"
      />

      {/* Rejection Dialog using a BaseModal */}
      {rejectModalOpen && (
        <BaseModal isOpen={rejectModalOpen} onClose={() => setRejectModalOpen(false)}>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-11/12 md:w-1/3">
            <h3 className="text-lg font-bold mb-3">Reject Resignation</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Please provide rejection comments:
            </p>
            <textarea
              value={rejectComment}
              onChange={(e) => setRejectComment(e.target.value)}
              className="w-full border p-2 mb-4"
              placeholder="Enter your comments here..."
            />
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setRejectModalOpen(false)}
                variant="outlined"
                color="secondary"
                className="w-1/3"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmReject}
                variant="contained"
                color="primary"
                className="w-1/3"
              >
                Reject
              </Button>
            </div>
          </div>
        </BaseModal>
      )}
    </div>
  );
}
