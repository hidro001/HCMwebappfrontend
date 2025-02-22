import React, { useEffect, useState } from "react";
import { useCall } from "../../../contexts/CallContext";
import EmployeeListModal from "./EmployeeListModal";

// Optional: read these from localStorage (or use a user context)
const currentUserId = localStorage.getItem("employeeId");
const currentUserName = localStorage.getItem("userName");

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
  const { call, outgoingCall, stream, remoteStreams, leaveCall, addParticipant } = useCall();
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);

  // Update local audio tracks based on audioEnabled state
  useEffect(() => {
    if (stream) {
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
      <div className="fixed top-5 right-5 z-[2000]">
        <div className="w-64 rounded-xl bg-white shadow-lg flex flex-col items-center py-5 px-4">
          <h3 className="text-center text-sm">
            {callTypeLabel}: Calling {outgoingCall.participants.join(", ")}...
          </h3>
          <div className="mt-2 w-8 h-8 border-4 border-gray-300 border-t-[#6B73FF] rounded-full animate-spin"></div>
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
    <div className="fixed top-5 right-5 z-[2000]">
      <div className="w-80 rounded-xl bg-white shadow-lg flex flex-col items-center overflow-hidden pb-2">
        {/* Top Section: User Info */}
        <div className="flex items-center w-full py-2 px-4 bg-gradient-to-br from-[#6B73FF] to-[#000DFF]">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex justify-center items-center mr-4">
            <div className="w-10 h-10 rounded-full bg-gray-400"></div>
          </div>
          <div className="flex flex-col text-white">
            <span className="text-sm font-bold">
              {currentUserName} ({currentUserId})
            </span>
          </div>
        </div>

        {/* Badge & Participant Info */}
        <div className="mt-2 py-1 px-3 rounded-lg bg-[#b19cff] text-white text-xs uppercase">
          {callTypeLabel}
        </div>
        <small className="mt-1 text-gray-600">{remoteUserLabel}</small>

        {/* Call Content: Voice Call Placeholder */}
        <div className="w-full p-3 text-center">
          <div className="w-full h-44 rounded-lg bg-gray-100 flex items-center justify-center mt-3">
            <p className="text-gray-500">Voice Call Connected</p>
          </div>
        </div>

        {/* Render remote audio players */}
        {remoteStreams.map(({ userId, stream }) => (
          <AudioPlayer key={userId} stream={stream} />
        ))}

        {/* Action Buttons */}
        <div className="flex justify-around w-full pt-2 border-t border-gray-300">
          {/* Hang Up */}
          <button
            onClick={leaveCall}
            aria-label="Hang Up"
            className="bg-red-600 rounded-full w-12 h-12 text-white flex items-center justify-center hover:bg-red-700 transition"
          >
            <span className="text-xl">&#x1F5D9;</span>
          </button>
          {/* Open Employee List Modal */}
          <button
            onClick={() => setShowEmployeeModal(true)}
            aria-label="Add Participant"
            className="bg-green-600 rounded-full w-12 h-12 text-white flex items-center justify-center hover:bg-green-700 transition"
          >
            <span className="text-xl">&#x260E;</span>
          </button>
          {/* Toggle Audio */}
          <button
            onClick={toggleAudio}
            aria-label="Toggle Audio"
            className="bg-green-600 rounded-full w-12 h-12 text-white flex items-center justify-center hover:bg-green-700 transition"
          >
            <span className="text-xl">
              {audioEnabled ? "Mute" : "Unmute"}
            </span>
          </button>
        </div>
      </div>
      {/* Employee List Modal */}
      {showEmployeeModal && (
        <EmployeeListModal
          onClose={() => setShowEmployeeModal(false)}
          onSelectEmployee={(employeeId) => {
            addParticipant(employeeId);
          }}
        />
      )}
    </div>
  );
};

export default CallWindow;
