// // src/components/CallWindow.jsx
// import React, { useEffect, useState, useRef } from "react";
// import { useCall } from "../../../contexts/CallContext";
// import EmployeeListModal from "./EmployeeListModal";

// const currentUserId = localStorage.getItem("employeeId") || "EMP0001";
// const currentUserName = localStorage.getItem("userName") || "HCM User";

// function AudioPlayer({ stream }) {
//   const audioRef = useRef(null);
//   useEffect(() => {
//     if (audioRef.current && stream) {
//       audioRef.current.srcObject = stream;
//     }
//   }, [stream]);
//   return <audio ref={audioRef} autoPlay playsInline />;
// }

// export default function CallWindow() {
//   const {
//     call,
//     outgoingCall,
//     stream,
//     remoteStreams,
//     leaveCall,
//     addParticipant,
//   } = useCall();

//   const [audioEnabled, setAudioEnabled] = useState(true);
//   const [showEmployeeModal, setShowEmployeeModal] = useState(false);

//   // Manage local audio tracks
//   useEffect(() => {
//     if (stream) {
//       stream.getAudioTracks().forEach((track) => {
//         track.enabled = audioEnabled;
//       });
//     }
//   }, [stream, audioEnabled]);

//   // Outgoing call spinner (voice calls only)
//   if (outgoingCall && !call) {
//     if (outgoingCall.callType === "video") return null;
//     return (
//       <div className="fixed top-5 right-5 z-50 w-full max-w-xs bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col items-center">
//         <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200 text-sm">
//           Voice Call: Calling {outgoingCall.participants.join(", ")}...
//         </h3>
//         <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
//       </div>
//     );
//   }

//   // If no active call, hide
//   if (!call) return null;

//   const { participants } = call;
//   const callTypeLabel = "Voice Call";
//   const remoteUserIds = participants.filter((p) => p !== currentUserId);
//   const remoteUserLabel = remoteUserIds.length
//     ? `Connected with ${remoteUserIds.join(", ")}`
//     : "Waiting for participant...";

//   const toggleAudio = () => {
//     if (!stream) return;
//     stream.getAudioTracks().forEach((track) => {
//       track.enabled = !audioEnabled;
//     });
//     setAudioEnabled(!audioEnabled);
//   };

//   return (
//     <div className="fixed top-5 right-5 z-50 w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-3 flex items-center space-x-3">
//         <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
//         <div className="text-white">
//           <p className="font-semibold text-sm">
//             {currentUserName} ({currentUserId})
//           </p>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="flex flex-col items-center p-3">
//         <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full uppercase">
//           {callTypeLabel}
//         </span>
//         <small className="mt-2 text-gray-600 dark:text-gray-300">
//           {remoteUserLabel}
//         </small>

//         <div className="w-full h-32 mt-3 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
//           <p className="text-gray-500 dark:text-gray-300">
//             Voice Call Connected
//           </p>
//         </div>

//         {/* Remote Audio Players */}
//         {remoteStreams.map(({ userId, stream }) => (
//           <AudioPlayer key={userId} stream={stream} />
//         ))}
//       </div>

//       {/* Action Buttons */}
//       <div className="flex justify-around items-center border-t border-gray-200 dark:border-gray-700 p-2">
//         {/* Hang Up */}
//         <button
//           onClick={leaveCall}
//           className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg"
//         >
//           &#x1F5D9;
//         </button>

//         {/* Add Participant */}
//         <button
//           onClick={() => setShowEmployeeModal(true)}
//           className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg"
//         >
//           &#x260E;
//         </button>

//         {/* Toggle Audio */}
//         <button
//           onClick={toggleAudio}
//           className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm"
//         >
//           {audioEnabled ? "Mute" : "Unmute"}
//         </button>
//       </div>

//       {/* EmployeeListModal */}
//       {showEmployeeModal && (
//         <EmployeeListModal
//           onClose={() => setShowEmployeeModal(false)}
//           onSelectEmployee={(employeeId) => addParticipant(employeeId)}
//         />
//       )}
//     </div>
//   );
// }



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
