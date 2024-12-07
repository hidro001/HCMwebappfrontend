import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const EmployeeLeaveHistory = () => {
  const [leaves, setLeaves] = useState([]);
  const [statusFilter, setStatusFilter] = useState("approved");
  const [isLoading, setIsLoading] = useState(false);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("accessToken");
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  };

  const fetchLeaves = async (status) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://apiv2.humanmaximizer.com/api/v1/leave/subordinates/leaves?status=${status}`,
        getAuthHeaders()
      );
      console.log("Leaves Data:", response.data);
      const fetchedLeaves = response.data.leaves || response.data;
      setLeaves(fetchedLeaves || []);
    } catch (err) {
      console.error(`Error fetching ${status} leaves:`, err);
      toast.error(`Failed to fetch ${status} leaves`);
      setLeaves([]); // Ensure leaves is an array even on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves(statusFilter);
  }, [statusFilter]);

  return (
    <div className="main">
      <div className="ems-content p-5">
        <div className="container hm-leave-history">
          <h2>
            {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)} Leave
            Requests
          </h2>
          <div className="mb-3">
            <Button
              variant={statusFilter === "approved" ? "primary" : "secondary"}
              onClick={() => setStatusFilter("approved")}
              className="me-2"
            >
              Approved Leaves
            </Button>
            <Button
              variant={statusFilter === "rejected" ? "primary" : "secondary"}
              onClick={() => setStatusFilter("rejected")}
              className="me-2"
            >
              Rejected Leaves
            </Button>
            <Button
              variant={statusFilter === "pending" ? "primary" : "secondary"}
              onClick={() => setStatusFilter("pending")}
            >
              Pending Leaves
            </Button>
          </div>
          {isLoading ? (
            <p>Loading...</p>
          ) : Array.isArray(leaves) && leaves.length > 0 ? (
            <Table bordered hover responsive>
              <thead className="table-dark">
                <tr>
                  <th>Employee ID</th>
                  <th>Employee</th>
                  <th>Immediate Manager</th>
                  <th>Leave Type</th>
                  <th>Leave Category</th>
                  <th>From</th>
                  <th>To</th>
                  <th>No. of Days</th>
                  <th>Reason for Leave</th>
                  {statusFilter === "rejected" && <th>Reason for Rejection</th>}
                  <th>Processed By</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave._id}>
                    <td>{leave.employee?.employee_Id || "N/A"}</td>
                    <td>
                      {leave.employee
                        ? `${leave.employee.first_Name} ${leave.employee.last_Name}`
                        : "N/A"}
                    </td>
                    <td>
                      {Array.isArray(leave.employee?.assigned_to) &&
                      leave.employee.assigned_to.length > 0
                        ? leave.employee.assigned_to
                            .map(
                              (manager) =>
                                `${manager.first_Name} ${manager.last_Name}`
                            )
                            .join(", ")
                        : "No Managers Assigned"}
                    </td>
                    <td>{leave.leave_Type || "N/A"}</td>
                    <td>{leave.leave_Category || "N/A"}</td>
                    <td>
                      {leave.leave_From
                        ? new Date(leave.leave_From).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>
                      {leave.leave_To
                        ? new Date(leave.leave_To).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>
                      {leave.no_Of_Days !== undefined
                        ? leave.no_Of_Days
                        : "N/A"}
                    </td>
                    <td>{leave.reason_For_Leave || "N/A"}</td>
                    {statusFilter === "rejected" && (
                      <td>{leave.reason_For_Reject || "N/A"}</td>
                    )}
                    <td>
                      {leave.leave_Status === "approved" && leave.approved_By
                        ? `Approved by ${leave.approved_By.first_Name} ${leave.approved_By.last_Name}`
                        : leave.leave_Status === "rejected" && leave.rejected_By
                        ? `Rejected by ${leave.rejected_By.first_Name} ${leave.rejected_By.last_Name}`
                        : "Pending"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No {statusFilter} leave requests found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeLeaveHistory;
