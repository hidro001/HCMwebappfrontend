// src/components/ManagerDashboard.js

import React, { useState, useEffect } from "react";
import { Accordion, Button, Modal } from "react-bootstrap";
import { getAssignedLeavesByStatus, getEmployeeLeavesByStatus } from "./api";
import LeaveRequestTable from "./LeaveRequestTable";
import LeaveTable from "./LeaveTable";
import ApplyLeaveForm from "./ApplyLeaveForm";
import { toast } from "react-toastify";

const ManagerDashboard = () => {
  const [assignedKey, setAssignedKey] = useState("0"); // For Accordion
  const [assignedLeaves, setAssignedLeaves] = useState([]);
  const [myLeaves, setMyLeaves] = useState([]);
  const [myKey, setMyKey] = useState("pending");
  const [assignedStatus, setAssignedStatus] = useState("pending");
  const [showModal, setShowModal] = useState(false);

  const fetchAssignedLeaves = async (status) => {
    try {
      const response = await getAssignedLeavesByStatus(status);
      setAssignedLeaves(response.data);
    } catch (err) {
      console.error("Error fetching assigned leaves:", err);
      toast.error(`Failed to fetch ${status} leaves`);
    }
  };

  const fetchMyLeaves = async (status) => {
    try {
      const response = await getEmployeeLeavesByStatus(status);
      setMyLeaves(response.data);
    } catch (err) {
      console.error("Error fetching my leaves:", err);
      toast.error(`Failed to fetch your ${status} leaves`);
    }
  };

  useEffect(() => {
    fetchAssignedLeaves(assignedStatus);
  }, [assignedStatus]);

  useEffect(() => {
    fetchMyLeaves(myKey);
  }, [myKey]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div className="main">
      <div className="ems-content">
        <div className="container hm-manager-leaves ">
          <h2>Employee Leaves</h2>
          <Button variant="primary" onClick={handleShow} className="mb-3">
            Apply Leave
          </Button>

          {/* Apply Leave Modal */}
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Apply for Leave</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ApplyLeaveForm
                refreshLeaves={() => {
                  fetchMyLeaves(myKey);
                  fetchAssignedLeaves(assignedStatus);
                  handleClose();
                }}
              />
            </Modal.Body>
          </Modal>

          <Accordion defaultActiveKey="0" className="mt-4">
            {/* Employee Leave Requests Section */}
            <Accordion.Item eventKey="0">
              <Accordion.Header>Employee Leave Requests</Accordion.Header>
              <Accordion.Body>
                <div className="mb-3">
                  <Button
                    variant={
                      assignedStatus === "pending" ? "primary" : "secondary"
                    }
                    onClick={() => setAssignedStatus("pending")}
                    className="me-2"
                  >
                    Pending Requests
                  </Button>
                  <Button
                    variant={
                      assignedStatus === "approved" ? "primary" : "secondary"
                    }
                    onClick={() => setAssignedStatus("approved")}
                    className="me-2"
                  >
                    Approved Requests
                  </Button>
                  <Button
                    variant={
                      assignedStatus === "rejected" ? "primary" : "secondary"
                    }
                    onClick={() => setAssignedStatus("rejected")}
                  >
                    Rejected Requests
                  </Button>
                </div>
                <LeaveRequestTable
                  leaves={assignedLeaves}
                  refreshLeaves={() => fetchAssignedLeaves(assignedStatus)}
                />
              </Accordion.Body>
            </Accordion.Item>

            {/* My Leave Management Section */}
            <Accordion.Item eventKey="1" className="mt-4">
              <Accordion.Header>My Leave Management</Accordion.Header>
              <Accordion.Body>
                <div className="mb-3">
                  <Button
                    variant={myKey === "pending" ? "primary" : "secondary"}
                    onClick={() => setMyKey("pending")}
                    className="me-2"
                  >
                    Pending Leaves
                  </Button>
                  <Button
                    variant={myKey === "approved" ? "primary" : "secondary"}
                    onClick={() => setMyKey("approved")}
                    className="me-2"
                  >
                    Approved Leaves
                  </Button>
                  <Button
                    variant={myKey === "rejected" ? "primary" : "secondary"}
                    onClick={() => setMyKey("rejected")}
                  >
                    Rejected Leaves
                  </Button>
                </div>
                <LeaveTable leaves={myLeaves} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
