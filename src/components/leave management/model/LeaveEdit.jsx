
// import React, { useState } from "react";
// import BaseModal from "../../common/BaseModal";
// import { FiCheck, FiX } from "react-icons/fi";
// import useLeaveStore from "../../../store/useLeaveStore";
// import ConfirmationDialog from "../../common/ConfirmationDialog";

// const LeaveEdit = ({ isOpen, onClose, selectedLeave }) => {
//   const [modalType, setModalType] = useState(null);
//   const [paidStatus, setPaidStatus] = useState(""); // "Paid" or "Unpaid" for approval
//   const [rejectionReason, setRejectionReason] = useState("");
//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [actionType, setActionType] = useState(null);

//   const { handleLeaveRequest } = useLeaveStore();

//   const handleAction = (type) => {
//     setActionType(type);
//     setConfirmOpen(true);
//   };

//   const onConfirm = async () => {
//     setConfirmOpen(false);
//     if (actionType === "approved") {
//       if (!paidStatus) return; // You may add an error toast here
//       await handleLeaveRequest(selectedLeave._id, "approved", { is_Paid: paidStatus === "Paid" });
//     } else if (actionType === "rejected") {
//       if (!rejectionReason) return; // You may add an error toast here
//       await handleLeaveRequest(selectedLeave._id, "rejected", { reason_For_Reject: rejectionReason });
//     }
//     setModalType(null);
//     onClose();
//   };

//   const onCancel = () => {
//     setConfirmOpen(false);
//   };

//   return (
//     <BaseModal isOpen={isOpen} onClose={onClose} size="md">
//       <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg relative">
//         <button 
//           onClick={onClose} 
//           className="absolute top-4 right-4 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-full hover:bg-gray-400 dark:hover:bg-gray-600"
//         >
//           <FiX />
//         </button>
//         <h2 className="text-xl font-semibold border-b pb-2 mb-4 text-gray-900 dark:text-gray-100">
//           Leave Details {selectedLeave?.employeeName} ({selectedLeave?.employeeID})
//         </h2>

//         <div className="space-y-2 text-sm text-gray-900 dark:text-gray-200">
//           <p><strong>Leave Type:</strong> {selectedLeave?.leave_Type || "N/A"}</p>
//           <p><strong>From:</strong> {new Date(selectedLeave?.leave_From).toLocaleDateString() || "N/A"}</p>
//           <p><strong>To:</strong> {new Date(selectedLeave?.leave_To).toLocaleDateString() || "N/A"}</p>
//           <p><strong>No. of Days:</strong> {selectedLeave?.no_Of_Days || "N/A"}</p>
//           <p><strong>Reason:</strong> {selectedLeave?.reason_For_Leave || "N/A"}</p>
//           <p><strong>Status:</strong> {selectedLeave?.leave_Status || "N/A"}</p>
//         </div>

//         <div className="flex justify-center gap-4 mt-6 border-t border-gray-300 dark:border-gray-700 pt-4">
//           <button 
//             onClick={() => setModalType("reject")} 
//             className="bg-red-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700"
//           >
//             <FiX /> Reject
//           </button>
//           <button 
//             onClick={() => setModalType("approve")} 
//             className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
//           >
//             <FiCheck /> Approve
//           </button>
//         </div>
//       </div>

//       {/* Reject Modal */}
//       {modalType === "reject" && (
//         <BaseModal isOpen={true} onClose={() => setModalType(null)} size="sm">
//           <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
//             <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Reason for Rejection</h3>
//             <textarea 
//               className="w-full p-2 mt-2 border border-gray-500 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200" 
//               placeholder="Enter reason..." 
//               value={rejectionReason} 
//               onChange={(e) => setRejectionReason(e.target.value)}
//             />
//             <div className="mt-4 flex justify-between">
//               <button
//                 onClick={() => setModalType(null)}
//                 className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => handleAction("rejected")}
//                 className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
//               >
//                 Reject
//               </button>
//             </div>
//           </div>
//         </BaseModal>
//       )}

//       {/* Approve Modal */}
//       {modalType === "approve" && (
//         <BaseModal isOpen={true} onClose={() => setModalType(null)} size="sm">
//           <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
//             <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Approval Type</h3>
//             <select 
//               className="w-full p-2 mt-2 border border-gray-500 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200" 
//               value={paidStatus} 
//               onChange={(e) => setPaidStatus(e.target.value)}
//             >
//               <option value="">Select leave payment type</option>
//               <option value="Paid">Paid Leave</option>
//               <option value="Unpaid">Unpaid Leave</option>
//             </select>
//             <div className="mt-4 flex justify-between">
//               <button
//                 onClick={() => setModalType(null)}
//                 className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => handleAction("approved")}
//                 className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//               >
//                 Approve
//               </button>
//             </div>
//           </div>
//         </BaseModal>
//       )}

//       <ConfirmationDialog
//         open={confirmOpen}
//         title="Confirm Action"
//         message={`Are you sure you want to ${actionType} this leave request?`}
//         onConfirm={onConfirm}
//         onCancel={onCancel}
//         confirmText="Yes"
//         cancelText="No"
//       />
//     </BaseModal>
//   );
// };

// export default LeaveEdit;



import React, { useState } from "react";
import BaseModal from "../../common/BaseModal";
import { FiCheck, FiX } from "react-icons/fi";
import useLeaveStore from "../../../store/useLeaveStore";

const LeaveEdit = ({ isOpen, onClose, selectedLeave }) => {
  const [modalType, setModalType] = useState(null);
  const [paidStatus, setPaidStatus] = useState(""); // "Paid" or "Unpaid" for approval
  const [rejectionReason, setRejectionReason] = useState("");

  const { handleLeaveRequest } = useLeaveStore();

  // Directly handle approval
  const handleApprove = async () => {
    if (!paidStatus) return; // Optionally, you could show an error message here.
    await handleLeaveRequest(selectedLeave._id, "approved", { is_Paid: paidStatus === "Paid" });
    setModalType(null);
    onClose();
  };

  // Directly handle rejection
  const handleReject = async () => {
    if (!rejectionReason) return; // Optionally, you could show an error message here.
    await handleLeaveRequest(selectedLeave._id, "rejected", { reason_For_Reject: rejectionReason });
    setModalType(null);
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} size="md">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-full hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          <FiX />
        </button>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4 text-gray-900 dark:text-gray-100">
          Leave Details {selectedLeave?.employeeName} ({selectedLeave?.employeeID})
        </h2>

        <div className="space-y-2 text-sm text-gray-900 dark:text-gray-200">
          <p><strong>Leave Type:</strong> {selectedLeave?.leave_Type || "N/A"}</p>
          <p>
            <strong>From:</strong>{" "}
            {selectedLeave?.leave_From ? new Date(selectedLeave.leave_From).toLocaleDateString() : "N/A"}
          </p>
          <p>
            <strong>To:</strong>{" "}
            {selectedLeave?.leave_To ? new Date(selectedLeave.leave_To).toLocaleDateString() : "N/A"}
          </p>
          <p><strong>No. of Days:</strong> {selectedLeave?.no_Of_Days || "N/A"}</p>
          <p><strong>Reason:</strong> {selectedLeave?.reason_For_Leave || "N/A"}</p>
          <p><strong>Status:</strong> {selectedLeave?.leave_Status || "N/A"}</p>
        </div>

        <div className="flex justify-center gap-4 mt-6 border-t border-gray-300 dark:border-gray-700 pt-4">
          <button 
            onClick={() => setModalType("reject")} 
            className="bg-red-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700"
          >
            <FiX /> Reject
          </button>
          <button 
            onClick={() => setModalType("approve")} 
            className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
          >
            <FiCheck /> Approve
          </button>
        </div>
      </div>

      {/* Reject Modal */}
      {modalType === "reject" && (
        <BaseModal isOpen={true} onClose={() => setModalType(null)} size="sm">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Reason for Rejection</h3>
            <textarea 
              className="w-full p-2 mt-2 border border-gray-500 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200" 
              placeholder="Enter reason..." 
              value={rejectionReason} 
              onChange={(e) => setRejectionReason(e.target.value)}
            />
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setModalType(null)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          </div>
        </BaseModal>
      )}

      {/* Approve Modal */}
      {modalType === "approve" && (
        <BaseModal isOpen={true} onClose={() => setModalType(null)} size="sm">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Approval Type</h3>
            <select 
              className="w-full p-2 mt-2 border border-gray-500 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200" 
              value={paidStatus} 
              onChange={(e) => setPaidStatus(e.target.value)}
            >
              <option value="">Select leave payment type</option>
              <option value="Paid">Paid Leave</option>
              <option value="Unpaid">Unpaid Leave</option>
            </select>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setModalType(null)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Approve
              </button>
            </div>
          </div>
        </BaseModal>
      )}
    </BaseModal>
  );
};

export default LeaveEdit;
