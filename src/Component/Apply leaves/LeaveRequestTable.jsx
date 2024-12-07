// src/components/ApplyLeaves/LeaveRequestTable.jsx

import React from "react";
import { toast } from "react-toastify";
import { handleLeaveRequest } from "./api";
import Swal from "sweetalert2";

const LeaveRequestTable = ({ leaves, refreshLeaves }) => {
  /**
   * Handles the approval or rejection of a leave request.
   * @param {string} leaveId - The ID of the leave request.
   * @param {string} action - The action to perform ("approved" or "rejected").
   */
  const handleAction = async (leaveId, action) => {
    try {
      // Show confirmation dialog before proceeding
      const confirmResult = await Swal.fire({
        title: `Are you sure you want to ${action} this leave request?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: `Yes, ${action} it!`,
        cancelButtonText: "Cancel",
      });

      if (!confirmResult.isConfirmed) {
        // User canceled the action
        return;
      }

      let reason_For_Reject;

      if (action === "rejected") {
        // Prompt for reason if rejecting
        const { value: reason } = await Swal.fire({
          title: "Reason for Rejection",
          input: "textarea",
          inputLabel: "Enter reason for rejection:",
          inputPlaceholder: "Type your reason here...",
          inputAttributes: {
            "aria-label": "Type your reason here",
          },
          showCancelButton: true,
          confirmButtonText: "Submit",
          cancelButtonText: "Cancel",
          inputValidator: (value) => {
            if (!value) {
              return "Rejection reason is required!";
            }
          },
        });

        if (reason === undefined) {
          // User canceled the action
          return;
        }

        reason_For_Reject = reason;
      }

      // Call the API to handle the leave request
      await handleLeaveRequest(leaveId, { action, reason_For_Reject });

      // Show success toast
      toast.success(`Leave request ${action} successfully`);

      // Refresh the leave data
      refreshLeaves();
    } catch (err) {
      console.error("Error handling leave request:", err);
      toast.error(
        err.response?.data?.message || "Failed to handle leave request"
      );
    }
  };

  return (
    <table className="table table-striped table-bordered table-hover">
      <thead className="">
        <tr>
          <th>Emp ID</th>
          <th>Name</th>
         
          <th>Leave Type</th>
          <th>Leave Category</th> {/* New Column */}
          <th>From</th>
          <th>To</th>
          <th>No. of Days</th>
          <th>Reason </th>
          <th>Status</th>
          <th>Processed By</th>
          <th>Reason For Reject</th>
          <th>Actions</th>
         
        </tr>
      </thead>
      <tbody>
        {leaves.length === 0 ? (
          <tr>
            <td colSpan="14" className="text-center">
              No leave requests found.
            </td>
          </tr>
        ) : (
          leaves.map((leave) => (
            <tr key={leave._id}>
              {/* Employee ID */}
              <td>
                {leave.employee && leave.employee.employee_Id
                  ? leave.employee.employee_Id
                  : "N/A"}
              </td>
              {/* Employee Name */}
              <td>
                {leave.employee
                  ? `${leave.employee.first_Name} ${leave.employee.last_Name}`
                  : "N/A"}
              </td>
             
              {/* Leave Type */}
              <td>{leave.leave_Type || "N/A"}</td>
              {/* Leave Category */}
              <td>{leave.leave_Category || "N/A"}</td> {/* Leave Category */}
              {/* From Date */}
              <td>
                {leave.leave_From
                  ? new Date(leave.leave_From).toLocaleDateString()
                  : "N/A"}
              </td>
              {/* To Date */}
              <td>
                {leave.leave_To
                  ? new Date(leave.leave_To).toLocaleDateString()
                  : "N/A"}
              </td>
              {/* Number of Days */}
              <td>
                {leave.no_Of_Days !== undefined ? leave.no_Of_Days : "N/A"}
              </td>
              {/* Reason for Leave */}
              <td>{leave.reason_For_Leave || "N/A"}</td>
              {/* Status */}
              <td>
                <span
                  className={`badge ${
                    leave.leave_Status === "approved"
                      ? "bg-success"
                      : leave.leave_Status === "rejected"
                      ? "bg-danger"
                      : "bg-warning text-dark"
                  }`}
                >
                  {leave.leave_Status.charAt(0).toUpperCase() +
                    leave.leave_Status.slice(1)}
                </span>
              </td>
              {/* Processed By */}
              <td>
                {leave.leave_Status === "approved" && leave.approved_By
                  ? `Approved by ${leave.approved_By.first_Name} ${leave.approved_By.last_Name}`
                  : leave.leave_Status === "rejected" && leave.rejected_By
                  ? `Rejected by ${leave.rejected_By.first_Name} ${leave.rejected_By.last_Name}`
                  : "N/A"}
              </td>
              {/* Reason for Rejection */}
              <td>{leave.reason_For_Reject || "N/A"}</td>
              {/* Actions */}
              <td>
                {leave.leave_Status === "pending" && (
                  <>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleAction(leave._id, "approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleAction(leave._id, "rejected")}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default LeaveRequestTable;
