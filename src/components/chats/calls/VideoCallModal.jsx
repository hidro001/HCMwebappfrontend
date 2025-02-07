// src/components/VideoCallModal.jsx
import React, { useEffect, useRef, useState } from "react";
import { useCall } from "../../../contexts/CallContext";
import {
  FaPhoneSlash,
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaPlus,
} from "react-icons/fa";
import EmployeeListModal from "./EmployeeListModal"; // import the EmployeeListModal

/**
 * A separate child component for each remote participant's video.
 * This avoids hooking issues in a .map() loop.
 */
const RemoteVideoTile = ({ userId, remoteStream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && remoteStream) {
      videoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <div style={videoTileStyle}>
      <video ref={videoRef} autoPlay playsInline style={videoElementStyle} />
      <p style={videoLabelStyle}>{userId}</p>
    </div>
  );
};

const VideoCallModal = () => {
  const { call, stream, remoteStreams, leaveCall, addParticipant } = useCall();

  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  // Local state to control the display of the employee list modal
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);

  const localVideoRef = useRef(null);

  useEffect(() => {
    if (localVideoRef.current && stream) {
      // Clone the video tracks into a new MediaStream for local preview.
      const videoTracks = stream.getVideoTracks();
      if (videoTracks.length > 0) {
        const clonedStream = new MediaStream(videoTracks);
        localVideoRef.current.srcObject = clonedStream;
      } else {
        // If there is no video track, attach the whole stream (for audio-only cases)
        localVideoRef.current.srcObject = stream;
      }
    }
  }, [stream]);

  // Only show if there's an active call of type "video"
  if (!call || call.callType !== "video") return null;

  const toggleAudio = () => {
    if (!stream) return;
    stream.getAudioTracks().forEach((track) => {
      track.enabled = !audioEnabled;
    });
    setAudioEnabled(!audioEnabled);
  };

  const toggleVideo = () => {
    if (!stream) return;
    stream.getVideoTracks().forEach((track) => {
      track.enabled = !videoEnabled;
    });
    setVideoEnabled(!videoEnabled);
  };

  // Instead of using a prompt, show the employee modal
  const handleAddParticipant = () => {
    setShowEmployeeModal(true);
  };

  // When an employee is selected, add the participant and close the modal.
  const onSelectEmployee = (employeeId) => {
    addParticipant(employeeId);
    setShowEmployeeModal(false);
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {/* GRID OF VIDEOS */}
        <div style={videoGridStyle}>
          {/* Local Video */}
          <div style={videoTileStyle}>
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              style={videoElementStyle}
            />
            <p style={videoLabelStyle}>You</p>
          </div>

          {/* Remote Videos */}
          {remoteStreams.map(({ userId, stream: remoteStream }) => (
            <RemoteVideoTile
              key={userId}
              userId={userId}
              remoteStream={remoteStream}
            />
          ))}
        </div>

        {/* CALL CONTROLS */}
        <div style={controlsStyle}>
          {/* Hang Up */}
          <button onClick={leaveCall} style={controlButtonStyle}>
            <FaPhoneSlash size={18} />
          </button>

          {/* Toggle Audio */}
          <button onClick={toggleAudio} style={controlButtonStyle}>
            {audioEnabled ? (
              <FaMicrophone size={18} />
            ) : (
              <FaMicrophoneSlash size={18} />
            )}
          </button>

          {/* Toggle Video */}
          <button onClick={toggleVideo} style={controlButtonStyle}>
            {videoEnabled ? <FaVideo size={18} /> : <FaVideoSlash size={18} />}
          </button>

          {/* Add Participant */}
          <button onClick={handleAddParticipant} style={controlButtonStyle}>
            <FaPlus size={18} />
          </button>
        </div>

        {/* Conditionally render the EmployeeListModal */}
        {showEmployeeModal && (
          <EmployeeListModal
            onClose={() => setShowEmployeeModal(false)}
            onSelectEmployee={onSelectEmployee}
          />
        )}
      </div>
    </div>
  );
};

/* --- Styles --- */
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.8)",
  zIndex: 9999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modalStyle = {
  width: "90%",
  height: "80%",
  backgroundColor: "#000",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  position: "relative",
};

const videoGridStyle = {
  flex: 1,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: "10px",
  padding: "20px",
  alignItems: "center",
  justifyItems: "center",
  overflowY: "auto",
};

const videoTileStyle = {
  position: "relative",
  width: "100%",
  backgroundColor: "#333",
  borderRadius: "4px",
  overflow: "hidden",
};

const videoElementStyle = {
  width: "100%",
  height: "auto",
  backgroundColor: "#000",
};

const videoLabelStyle = {
  position: "absolute",
  bottom: "5px",
  left: "5px",
  color: "#fff",
  fontSize: "0.8rem",
  textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
};

const controlsStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "15px",
  padding: "10px",
  backgroundColor: "rgba(0,0,0,0.3)",
};

const controlButtonStyle = {
  backgroundColor: "#222",
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  outline: "none",
};

export default VideoCallModal;
