
// // src/components/EmployeeDashboard.js

// import React, { useState, useEffect } from "react";
// import { Button, Modal } from "react-bootstrap";
// import { getEmployeeLeavesByStatus } from "./api";
// import ApplyLeaveForm from "./ApplyLeaveForm";
// import LeaveTable from "./LeaveTable";

// const LeaveEmployeeDashboard = () => {
//   const [leaves, setLeaves] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [activeKey, setActiveKey] = useState("pending");

//   const fetchLeaves = async (status) => {
//     try {
//       const response = await getEmployeeLeavesByStatus(status);
//       setLeaves(response.data);
//     } catch (err) {
//       console.error("Error fetching leaves:", err);
//     }
//   };

//   useEffect(() => {
//     fetchLeaves(activeKey);
//   }, [activeKey]);

//   const handleClose = () => setShowModal(false);
//   const handleShow = () => setShowModal(true);

//   return (
//     <div className="main">
//       <div className="ems-content">
//         <div className="container mt-5">
//           <h2>Employee Dashboard</h2>
//           <Button variant="primary" onClick={handleShow}>
//             Apply Leave
//           </Button>

//           {/* Apply Leave Modal */}
//           <Modal show={showModal} onHide={handleClose}>
//             <Modal.Header closeButton>
//               <Modal.Title>Apply for Leave</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <ApplyLeaveForm
//                 refreshLeaves={() => {
//                   fetchLeaves(activeKey);
//                   handleClose();
//                 }}
//               />
//             </Modal.Body>
//           </Modal>

//           <div className="mt-4">
//             <Button
//               variant={activeKey === "pending" ? "primary" : "secondary"}
//               onClick={() => setActiveKey("pending")}
//               className="me-2"
//             >
//               Pending Leaves
//             </Button>
//             <Button
//               variant={activeKey === "approved" ? "primary" : "secondary"}
//               onClick={() => setActiveKey("approved")}
//               className="me-2"
//             >
//               Approved Leaves
//             </Button>
//             <Button
//               variant={activeKey === "rejected" ? "primary" : "secondary"}
//               onClick={() => setActiveKey("rejected")}
//             >
//               Rejected Leaves
//             </Button>
//           </div>

//           <div className="mt-4">
//             {leaves.length === 0 ? (
//               <p>No leave requests found.</p>
//             ) : (
//               <LeaveTable leaves={leaves} />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeaveEmployeeDashboard;

// LeaveEmployeeDashboard.js
import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { getEmployeeLeavesByStatus } from "./api";
import ApplyLeaveForm from "./ApplyLeaveForm";
import LeaveTable from "./LeaveTable";
import { toast } from "react-toastify";

const LeaveEmployeeDashboard = () => {
  const [leaves, setLeaves] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeKey, setActiveKey] = useState("pending");
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  const fetchLeaves = async (status) => {
    setIsLoading(true);
    try {
      const response = await getEmployeeLeavesByStatus(status);
      setLeaves(response.data);
    } catch (err) {
      console.error("Error fetching leaves:", err);
      toast.error("Failed to fetch leaves.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves(activeKey);
  }, [activeKey]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div className="main">
      <div className="ems-content">
        <div className="container p-5 hm-mng-levaeemp">
          <h2>Employee Dashboard</h2>
          <Button variant="primary" onClick={handleShow}>
            Apply Leave
          </Button>

          {/* Apply Leave Modal */}
          <Modal show={showModal} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Apply for Leave</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ApplyLeaveForm
                refreshLeaves={() => {
                  fetchLeaves(activeKey);
                  handleClose();
                }}
              />
            </Modal.Body>
          </Modal>

          <div className="mt-4">
            <Button
              variant={activeKey === "pending" ? "primary" : "secondary"}
              onClick={() => setActiveKey("pending")}
              className="me-2"
            >
              Pending Leaves
            </Button>
            <Button
              variant={activeKey === "approved" ? "primary" : "secondary"}
              onClick={() => setActiveKey("approved")}
              className="me-2"
            >
              Approved Leaves
            </Button>
            <Button
              variant={activeKey === "rejected" ? "primary" : "secondary"}
              onClick={() => setActiveKey("rejected")}
            >
              Rejected Leaves
            </Button>
          </div>

          <div className="mt-4">
            {isLoading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "200px" }}
              >
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : leaves.length === 0 ? (
              <p>No leave requests found.</p>
            ) : (
              <LeaveTable leaves={leaves} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveEmployeeDashboard;

