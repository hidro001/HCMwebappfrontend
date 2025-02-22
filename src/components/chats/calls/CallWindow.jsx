// src/components/CallWindow.jsx
import React, { useEffect, useState } from "react";
import { useCall } from "../../../contexts/CallContext";
import EmployeeListModal from "./EmployeeListModal";

// Optional: read these from localStorage (or use a user context)
const currentUserId = localStorage.getItem("employeeId") || "EMP0001";
const currentUserName = localStorage.getItem("userName") || "HCM User";

// Helper component to play remote audio
const AudioPlayer = ({ stream }) => {
  const audioRef = React.useRef(null);
  useEffect(() => {
    if (audioRef.current && stream) {
      audioRef.current.srcObject = stream;
    }
  }, [stream]);
  return <audio ref={audioRef} autoPlay playsInline />;
};

const CallWindow = () => {
  const {
    call,
    outgoingCall,
    stream,
    remoteStreams,
    leaveCall,
    addParticipant,
  } = useCall();

  const [audioEnabled, setAudioEnabled] = useState(true);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);

  // Ensure that local audio tracks follow audioEnabled state.
  useEffect(() => {
    if (stream) {
      console.log("Local media stream (audio only) available", stream);
      stream.getAudioTracks().forEach((track) => {
        track.enabled = audioEnabled;
      });
    }
  }, [stream, audioEnabled]);

  // Outgoing call modal: only for voice calls.
  if (outgoingCall && !call) {
    if (outgoingCall.callType === "video") return null;
    const callTypeLabel = "Voice Call";
    return (
      <div style={containerStyle}>
        <div style={loaderCardStyle}>
          <h3 style={{ margin: 0 }}>
            {callTypeLabel}: Calling {outgoingCall.participants.join(", ")}...
          </h3>
          <div style={spinnerStyle}></div>
        </div>
      </div>
    );
  }

  // If no active call, hide.
  if (!call) return null;

  const { participants } = call;
  const callTypeLabel = "Voice Call";
  const remoteUserIds = participants.filter((p) => p !== currentUserId);
  const remoteUserLabel = remoteUserIds.length
    ? `Connected with ${remoteUserIds.join(", ")}`
    : "Waiting for participant...";

  const toggleAudio = () => {
    if (!stream) return;
    stream.getAudioTracks().forEach((track) => {
      track.enabled = !audioEnabled;
    });
    setAudioEnabled(!audioEnabled);
  };

  return (
    <div style={containerStyle}>
      <div style={callCardStyle}>
        {/* TOP SECTION: User Info */}
        <div style={topSectionStyle}>
          <div style={avatarWrapperStyle}>
            <div style={avatarStyle}></div>
          </div>
          <div style={userInfoStyle}>
            <span style={userNameStyle}>
              {currentUserName} ({currentUserId})
            </span>
          </div>
        </div>

        {/* Badge & Participant Info */}
        <div style={callTypeBadgeStyle}>{callTypeLabel}</div>
        <small style={{ marginTop: 5 }}>{remoteUserLabel}</small>

        {/* VOICE CALL CONTENT: Display placeholder */}
        <div style={callContentStyle}>
          <div style={voicePlaceholderStyle}>
            <p style={{ color: "#888" }}>Voice Call Connected</p>
          </div>
        </div>

        {/* Render remote audio players */}
        {remoteStreams.map(({ userId, stream }) => (
          <AudioPlayer key={userId} stream={stream} />
        ))}

        {/* ACTION BUTTONS */}
        <div style={buttonRowStyle}>
          {/* Hang Up */}
          <button style={redButtonStyle} onClick={leaveCall}>
            <span style={phoneIconStyle}>&#x1F5D9;</span>
          </button>
          {/* Open Employee List Modal instead of using prompt */}
          <button
            style={greenButtonStyle}
            onClick={() => setShowEmployeeModal(true)}
          >
            <span style={phoneIconStyle}>&#x260E;</span>
          </button>
          {/* Toggle Audio */}
          <button style={greenButtonStyle} onClick={toggleAudio}>
            {audioEnabled ? (
              <span style={phoneIconStyle}>Mute</span>
            ) : (
              <span style={phoneIconStyle}>Unmute</span>
            )}
          </button>
        </div>
      </div>
      {/* Render the EmployeeListModal if requested */}
      {showEmployeeModal && (
        <EmployeeListModal
          onClose={() => setShowEmployeeModal(false)}
          onSelectEmployee={(employeeId) => {
            // Use your context addParticipant function here.
            addParticipant(employeeId);
          }}
        />
      )}
    </div>
  );
};

/* ---------- STYLES ---------- */
const containerStyle = {
  position: "fixed",
  top: "20px",
  right: "20px",
  zIndex: 2000,
};

const callCardStyle = {
  width: "320px",
  borderRadius: "10px",
  backgroundColor: "#fff",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  fontFamily: "sans-serif",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "hidden",
  paddingBottom: "10px",
};

const loaderCardStyle = {
  width: "260px",
  borderRadius: "10px",
  backgroundColor: "#fff",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  fontFamily: "sans-serif",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px 15px",
};

const spinnerStyle = {
  marginTop: "10px",
  width: "30px",
  height: "30px",
  border: "4px solid #ccc",
  borderTop: "4px solid #6B73FF",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

const topSectionStyle = {
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: "10px 15px",
  background: "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)",
};

const avatarWrapperStyle = {
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  backgroundColor: "#e1e1e1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginRight: "15px",
};

const avatarStyle = {
  width: "40px",
  height: "40px",
  backgroundColor: "#ccc",
  borderRadius: "50%",
};

const userInfoStyle = {
  display: "flex",
  flexDirection: "column",
  color: "#fff",
};

const userNameStyle = {
  fontSize: "14px",
  fontWeight: "bold",
};

const callTypeBadgeStyle = {
  marginTop: "10px",
  padding: "6px 12px",
  borderRadius: "8px",
  backgroundColor: "#b19cff",
  color: "#fff",
  fontSize: "12px",
  textTransform: "uppercase",
};

const callContentStyle = {
  width: "100%",
  padding: "10px",
  textAlign: "center",
};

const voicePlaceholderStyle = {
  width: "100%",
  height: "180px",
  borderRadius: "8px",
  backgroundColor: "#f1f1f1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "10px",
};

const buttonRowStyle = {
  display: "flex",
  justifyContent: "space-around",
  width: "100%",
  paddingTop: "10px",
  borderTop: "1px solid #ccc",
};

const redButtonStyle = {
  backgroundColor: "#e53935",
  border: "none",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  color: "#fff",
  cursor: "pointer",
  fontSize: "18px",
};

const greenButtonStyle = {
  backgroundColor: "#43a047",
  border: "none",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  color: "#fff",
  cursor: "pointer",
  fontSize: "18px",
};

const phoneIconStyle = {
  display: "inline-block",
  fontSize: "20px",
};

export default CallWindow;
