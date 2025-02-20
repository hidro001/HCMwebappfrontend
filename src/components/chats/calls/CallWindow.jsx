// src/components/CallWindow.jsx
import React, { useEffect, useState, useRef } from "react";
import { useCall } from "../../../contexts/CallContext";
import EmployeeListModal from "./EmployeeListModal";

const currentUserId = localStorage.getItem("employeeId") || "EMP0001";
const currentUserName = localStorage.getItem("userName") || "HCM User";

function AudioPlayer({ stream }) {
  const audioRef = useRef(null);
  useEffect(() => {
    if (audioRef.current && stream) {
      audioRef.current.srcObject = stream;
    }
  }, [stream]);
  return <audio ref={audioRef} autoPlay playsInline />;
}

export default function CallWindow() {
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

  // Manage local audio tracks
  useEffect(() => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => {
        track.enabled = audioEnabled;
      });
    }
  }, [stream, audioEnabled]);

  // Outgoing call spinner (voice calls only)
  if (outgoingCall && !call) {
    if (outgoingCall.callType === "video") return null;
    return (
      <div className="fixed top-5 right-5 z-50 w-full max-w-xs bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col items-center">
        <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200 text-sm">
          Voice Call: Calling {outgoingCall.participants.join(", ")}...
        </h3>
        <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  // If no active call, hide
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
    <div className="fixed top-5 right-5 z-50 w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-3 flex items-center space-x-3">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
        <div className="text-white">
          <p className="font-semibold text-sm">
            {currentUserName} ({currentUserId})
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center p-3">
        <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full uppercase">
          {callTypeLabel}
        </span>
        <small className="mt-2 text-gray-600 dark:text-gray-300">
          {remoteUserLabel}
        </small>

        <div className="w-full h-32 mt-3 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-300">
            Voice Call Connected
          </p>
        </div>

        {/* Remote Audio Players */}
        {remoteStreams.map(({ userId, stream }) => (
          <AudioPlayer key={userId} stream={stream} />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-around items-center border-t border-gray-200 dark:border-gray-700 p-2">
        {/* Hang Up */}
        <button
          onClick={leaveCall}
          className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg"
        >
          &#x1F5D9;
        </button>

        {/* Add Participant */}
        <button
          onClick={() => setShowEmployeeModal(true)}
          className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg"
        >
          &#x260E;
        </button>

        {/* Toggle Audio */}
        <button
          onClick={toggleAudio}
          className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm"
        >
          {audioEnabled ? "Mute" : "Unmute"}
        </button>
      </div>

      {/* EmployeeListModal */}
      {showEmployeeModal && (
        <EmployeeListModal
          onClose={() => setShowEmployeeModal(false)}
          onSelectEmployee={(employeeId) => addParticipant(employeeId)}
        />
      )}
    </div>
  );
}
