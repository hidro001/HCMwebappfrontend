// import { useState, useEffect } from "react";
// import service from "../../services/Service";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from "sweetalert2";

// const ManagerLeaveRequests = () => {
//   const [leaveRequests, setLeaveRequests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchLeaveRequests = async () => {
//     try {
//       const response = await service.getManagerLeaveRequests();
//       setLeaveRequests(response.data.data);
//       setLoading(false);
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Failed to fetch leave requests.",
//         { position: "top-center" }
//       );
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLeaveRequests();
//   }, []);

//   const handleAction = (id, action) => {
//     if (action === "approved") {
//       Swal.fire({
//         title: "Are you sure?",
//         text: "Do you want to approve this leave request?",
//         icon: "question",
//         showCancelButton: true,
//         confirmButtonText: "Yes, approve it!",
//       }).then(async (result) => {
//         if (result.isConfirmed) {
//           try {
//             await service.handleLeaveRequest(id, { leave_Action: "approved" });
//             toast.success("Leave request approved successfully.", {
//               position: "top-center",
//             });
//             fetchLeaveRequests(); // Refresh the list
//           } catch (error) {
//             toast.error(
//               error.response?.data?.message ||
//                 "Failed to approve leave request.",
//               { position: "top-center" }
//             );
//           }
//         }
//       });
//     } else if (action === "rejected") {
//       Swal.fire({
//         title: "Reject Leave Request",
//         input: "textarea",
//         inputLabel: "Reason for rejection",
//         inputPlaceholder: "Enter your reason here...",
//         inputAttributes: {
//           "aria-label": "Type your reason here",
//         },
//         showCancelButton: true,
//         confirmButtonText: "Reject",
//       }).then(async (result) => {
//         if (result.isConfirmed && result.value.trim() !== "") {
//           try {
//             await service.handleLeaveRequest(id, {
//               leave_Action: "rejected",
//               reason_For_Reject: result.value,
//             });
//             toast.success("Leave request rejected successfully.", {
//               position: "top-center",
//             });
//             fetchLeaveRequests(); // Refresh the list
//           } catch (error) {
//             toast.error(
//               error.response?.data?.message ||
//                 "Failed to reject leave request.",
//               { position: "top-center" }
//             );
//           }
//         } else if (result.isConfirmed) {
//           toast.error("Rejection reason is required.", {
//             position: "top-center",
//           });
//         }
//       });
//     }
//   };

//   return (
//     <div className="main">
//       <ToastContainer />
//       <section className="ems-content">
//         <div className="container">
//           <div className="all-employee">
//             <div className="all-head">
//               <h4>Manage Leave Requests</h4>
//             </div>
//             <div className="row mt-4">
//               <div className="col-lg-12">
//                 {loading ? (
//                   <p>Loading...</p>
//                 ) : leaveRequests.length === 0 ? (
//                   <p>No pending leave requests.</p>
//                 ) : (
//                   <div className="leave-requests">
//                     <table className="table table-bordered">
//                       <thead>
//                         <tr>
//                           <th>Employee Name</th>
//                           <th>Employee ID</th>
//                           <th>Leave Type</th>
//                           <th>From</th>
//                           <th>To</th>
//                           <th>No. of Days</th>
//                           <th>Reason</th>
//                           <th>Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {leaveRequests.map((leave) => (
//                           <tr key={leave._id}>
//                             <td>{leave.full_Name}</td>
//                             <td>{leave.employee_Id}</td>
//                             <td>{leave.leave_Type}</td>
//                             <td>
//                               {new Date(leave.leave_From).toLocaleDateString()}
//                             </td>
//                             <td>
//                               {new Date(leave.leave_To).toLocaleDateString()}
//                             </td>
//                             <td>{leave.no_Of_Days}</td>
//                             <td>{leave.reason_For_Leave}</td>
//                             <td>
//                               <button
//                                 className="btn btn-success btn-sm mx-1"
//                                 onClick={() =>
//                                   handleAction(leave._id, "approved")
//                                 }
//                               >
//                                 Approve
//                               </button>
//                               <button
//                                 className="btn btn-danger btn-sm mx-1"
//                                 onClick={() =>
//                                   handleAction(leave._id, "rejected")
//                                 }
//                               >
//                                 Reject
//                               </button>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 )}
//               </div>
//               {/* Optional: Additional Manager Features */}
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ManagerLeaveRequests;

import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Table,
  Button,
  Modal,
  Form,
  Spinner,
} from "react-bootstrap";
import service from "../../services/Service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const ManagerDashboard = () => {
  const [key, setKey] = useState("pending");
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal state for applying leave
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Form state for applying leave
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState("");
  const [reason, setReason] = useState("");

  // Fetch leave requests based on status
  const fetchLeaveRequests = async (status) => {
    setLoading(true);
    try {
      const response = await service.getManagerLeaveRequestsByStatus(status);
      setLeaveRequests(response.data.data);
      setLoading(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          `Failed to fetch ${status} leave requests.`,
        { position: "top-center" }
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveRequests(key);
  }, [key]);

  // Calculate number of days
  useEffect(() => {
    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      const diffTime = to - from;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Inclusive
      setNumberOfDays(diffDays > 0 ? diffDays : 0);
    } else {
      setNumberOfDays("");
    }
  }, [fromDate, toDate]);

  // Handle approve
  const handleApprove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this leave request?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, approve it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await service.handleLeaveRequest(id, { leave_Action: "approved" });
          toast.success("Leave request approved successfully.", {
            position: "top-center",
          });
          fetchLeaveRequests(key); // Refresh
        } catch (error) {
          toast.error(
            error.response?.data?.message || "Failed to approve leave request.",
            { position: "top-center" }
          );
        }
      }
    });
  };

  // Handle reject
  const handleReject = (id) => {
    Swal.fire({
      title: "Reject Leave Request",
      input: "textarea",
      inputLabel: "Reason for rejection",
      inputPlaceholder: "Enter your reason here...",
      inputAttributes: {
        "aria-label": "Type your reason here",
      },
      showCancelButton: true,
      confirmButtonText: "Reject",
    }).then(async (result) => {
      if (result.isConfirmed && result.value.trim() !== "") {
        try {
          await service.handleLeaveRequest(id, {
            leave_Action: "rejected",
            reason_For_Reject: result.value,
          });
          toast.success("Leave request rejected successfully.", {
            position: "top-center",
          });
          fetchLeaveRequests(key); // Refresh
        } catch (error) {
          toast.error(
            error.response?.data?.message || "Failed to reject leave request.",
            { position: "top-center" }
          );
        }
      } else if (result.isConfirmed) {
        toast.error("Rejection reason is required.", {
          position: "top-center",
        });
      }
    });
  };

  // Handle apply leave submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to apply for leave?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, apply!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const leaveData = {
            leave_Type: leaveType,
            leave_From: fromDate,
            leave_To: toDate,
            no_Of_Days: numberOfDays,
            reason_For_Leave: reason,
          };
          await service.postLeave(leaveData);
          toast.success("Leave Request Submitted Successfully!", {
            position: "top-center",
          });
          // Reset form
          setLeaveType("");
          setFromDate("");
          setToDate("");
          setNumberOfDays("");
          setReason("");
          handleClose();
        } catch (error) {
          toast.error(
            error.response?.data?.message || "Failed to submit leave request.",
            { position: "top-center" }
          );
        }
      }
    });
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2>Manager Dashboard</h2>
      <Button variant="primary" className="mb-3" onClick={handleShow}>
        Apply for Leave
      </Button>

      <Tabs
        id="manager-dashboard-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="pending" title="Pending Leaves">
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <LeaveTable
              leaveRequests={leaveRequests}
              handleApprove={handleApprove}
              handleReject={handleReject}
            />
          )}
        </Tab>
        <Tab eventKey="approved" title="Approved Leaves">
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <LeaveTable leaveRequests={leaveRequests} showActions={false} />
          )}
        </Tab>
        <Tab eventKey="rejected" title="Rejected Leaves">
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <LeaveTable leaveRequests={leaveRequests} showActions={false} />
          )}
        </Tab>
        <Tab eventKey="my-leaves" title="My Leave Requests">
          <ManagerOwnLeaveRequests />
        </Tab>
      </Tabs>

      {/* Apply Leave Modal */}
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Apply for Leave</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="leaveType" className="mb-3">
              <Form.Label>Leave Type</Form.Label>
              <Form.Control
                as="select"
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                required
              >
                <option value="">--Select Leave Type--</option>
                <option>Casual Leave</option>
                <option>Paid Leave</option>
                <option>Comp. off</option>
                <option>Sick Leave</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="fromDate" className="mb-3">
              <Form.Label>From</Form.Label>
              <Form.Control
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </Form.Group>

            <Form.Group controlId="toDate" className="mb-3">
              <Form.Label>To</Form.Label>
              <Form.Control
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                min={fromDate || new Date().toISOString().split("T")[0]}
                required
              />
            </Form.Group>

            <Form.Group controlId="numberOfDays" className="mb-3">
              <Form.Label>No. of Days</Form.Label>
              <Form.Control type="number" value={numberOfDays} readOnly />
            </Form.Group>

            <Form.Group controlId="reason" className="mb-3">
              <Form.Label>Reason for Leave</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Submit Leave
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

// LeaveTable Component
const LeaveTable = ({
  leaveRequests,
  handleApprove,
  handleReject,
  showActions = true,
}) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Employee Name</th>
          <th>Employee ID</th>
          <th>Leave Type</th>
          <th>From</th>
          <th>To</th>
          <th>No. of Days</th>
          <th>Reason</th>
          {showActions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {leaveRequests.length === 0 ? (
          <tr>
            <td colSpan={showActions ? 8 : 7} className="text-center">
              No leave requests found.
            </td>
          </tr>
        ) : (
          leaveRequests.map((leave) => (
            <tr key={leave._id}>
              <td>
                {leave.employee_Id.first_Name} {leave.employee_Id.last_Name}
              </td>
              <td>{leave.employee_Id.employee_Id}</td>
              <td>{leave.leave_Type}</td>
              <td>{new Date(leave.leave_From).toLocaleDateString()}</td>
              <td>{new Date(leave.leave_To).toLocaleDateString()}</td>
              <td>{leave.no_Of_Days}</td>
              <td>{leave.reason_For_Leave}</td>
              {showActions && (
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    className="me-2"
                    onClick={() => handleApprove(leave._id)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleReject(leave._id)}
                  >
                    Reject
                  </Button>
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

// ManagerOwnLeaveRequests Component
const ManagerOwnLeaveRequests = () => {
  const [key, setKey] = useState("pending");
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLeaveRequests = async (status) => {
    setLoading(true);
    try {
      const response = await service.getManagerLeaveRequestsByStatus(status);
      setLeaveRequests(response.data.data);
      setLoading(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          `Failed to fetch ${status} leave requests.`,
        { position: "top-center" }
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveRequests(key);
  }, [key]);

  return (
    <Tabs
      id="manager-own-leave-tabs"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="pending" title="Pending Leaves">
        {loading ? (
          <Spinner animation="border" />
        ) : (
          <LeaveTable leaveRequests={leaveRequests} showActions={false} />
        )}
      </Tab>
      <Tab eventKey="approved" title="Approved Leaves">
        {loading ? (
          <Spinner animation="border" />
        ) : (
          <LeaveTable leaveRequests={leaveRequests} showActions={false} />
        )}
      </Tab>
      <Tab eventKey="rejected" title="Rejected Leaves">
        {loading ? (
          <Spinner animation="border" />
        ) : (
          <LeaveTable leaveRequests={leaveRequests} showActions={false} />
        )}
      </Tab>
    </Tabs>
  );
};

// Reusable LeaveTable Component can be moved to a separate file if preferred

export default ManagerDashboard;

