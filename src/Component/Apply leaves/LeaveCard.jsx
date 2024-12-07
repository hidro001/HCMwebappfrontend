// src/components/LeaveCard.js

import React from "react";
import { Card } from "react-bootstrap";

const LeaveCard = ({ leave }) => {
  return (
    <Card className="m-2" style={{ width: "300px" }}>
      <Card.Body>
        <Card.Title>{leave.leave_Type}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {new Date(leave.leave_From).toLocaleDateString()} -{" "}
          {new Date(leave.leave_To).toLocaleDateString()}
        </Card.Subtitle>
        <Card.Text>
          <strong>No. of Days:</strong> {leave.no_Of_Days}
          <br />
          <strong>Reason:</strong> {leave.reason_For_Leave}
          <br />
          <strong>Status:</strong> {leave.leave_Status}
          <br />
          {leave.leave_Status === "approved" && leave.approved_By && (
            <>
              <strong>Approved By:</strong> {leave.approved_By.first_Name}{" "}
              {leave.approved_By.last_Name}
            </>
            
          )}
          {leave.leave_Status === "rejected" && leave.rejected_By && (
            <>
              <strong>Rejected By:</strong> {leave.rejected_By.first_Name}{" "}
              {leave.rejected_By.last_Name}
              <br />
              <strong>Reason for Rejection:</strong> {leave.reason_For_Reject}
            </>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default LeaveCard;

