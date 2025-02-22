// src/components/CallModal.jsx
import React from "react";
import { useCall } from "../../../contexts/CallContext";

const CallModal = () => {
  const { incomingCall, answerCall, rejectCall } = useCall();

  if (!incomingCall) return null;

  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <h3>Incoming {incomingCall.callType} call</h3>
        <p>Caller: {incomingCall.caller}</p>
        <div style={buttonContainerStyle}>
          <button onClick={answerCall} style={answerButtonStyle}>
            Answer
          </button>
          <button onClick={rejectCall} style={rejectButtonStyle}>
            Reject
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
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
};

const buttonContainerStyle = {
  marginTop: "20px",
  display: "flex",
  justifyContent: "space-around",
};

const answerButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "green",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const rejectButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "red",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default CallModal;
