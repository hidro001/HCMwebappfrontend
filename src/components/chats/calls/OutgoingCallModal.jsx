// src/components/OutgoingCallModal.jsx
import React from "react";
import { useCall } from "../../../contexts/CallContext";

const OutgoingCallModal = () => {
  const { outgoingCall, leaveCall } = useCall();

  // Show only if we have an outgoing call that hasn't been answered
  if (!outgoingCall || !outgoingCall.callId) return null;

  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <h3>Calling {outgoingCall.participants.join(", ")}</h3>
        <p>Call Type: {outgoingCall.callType.toUpperCase()}</p>
        <div style={buttonContainerStyle}>
          <button onClick={leaveCall} style={cancelButtonStyle}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2000, // Above other modals
};

const modalStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
  minWidth: "300px",
};

const buttonContainerStyle = {
  marginTop: "20px",
  display: "flex",
  justifyContent: "center",
};

const cancelButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "red",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default OutgoingCallModal;
 