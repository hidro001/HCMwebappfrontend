

import { useState } from "react";
import BaseModal from "../../common/BaseModal";
import { FiCheck, FiX } from "react-icons/fi";

const LeaveEdit = ({ isOpen, onClose, selectedLeave }) => {
  const [modalType, setModalType] = useState(null);
  const [leaveType, setLeaveType] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

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

        {/* Leave Details */}
        <div className="space-y-2 text-sm text-gray-900 dark:text-gray-200">
          <p><strong>Employee ID:</strong> {selectedLeave?.employeeID || "N/A"}</p>
          <p><strong>Employee Name:</strong> {selectedLeave?.employeeName || "N/A"}</p>
          <p><strong>Leave Type:</strong> {selectedLeave?.leaveType || "N/A"}</p>
          <p><strong>Paid Leave Balance:</strong> {selectedLeave?.leaveBalance || "N/A"}</p>
          <p><strong>Leave Category:</strong> {selectedLeave?.leaveCategory || "N/A"}</p>
          <p><strong>From:</strong> {selectedLeave?.fromDate || "N/A"}</p>
          <p><strong>To:</strong> {selectedLeave?.toDate || "N/A"}</p>
          <p><strong>No. of Days:</strong> {selectedLeave?.days || "N/A"}</p>
          <p><strong>Reason:</strong> {selectedLeave?.reason || "N/A"}</p>
          <p><strong>Status:</strong> {selectedLeave?.status || "N/A"}</p>
          <p><strong>Processed By:</strong> {selectedLeave?.processedBy || "N/A"}</p>
        </div>

        {/* Action Buttons */}
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
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
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
              value={leaveType} 
              onChange={(e) => setLeaveType(e.target.value)}
            >
              <option value="">Select leave type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
            </select>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setModalType(null)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
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

