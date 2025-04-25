import React, { useEffect, useRef, useState } from "react";
import { useCall } from "../../../contexts/CallContext";
import {
  FaPhoneSlash,
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaPlus,
  FaDesktop,
} from "react-icons/fa";
import EmployeeListModal from "./EmployeeListModal";

const VideoCallModal = () => {
  const {
    call,
    stream,
    remoteStreams,    // Array of { userId, stream, type: "camera"|"screen" }
    leaveCall,
    addParticipant,
    peersRef,
  } = useCall();

  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);

  // Track whether we're currently sharing screen
  const [isSharingScreen, setIsSharingScreen] = useState(false);

  // For the "Add Participant" modal
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);

  // Local video preview
  const localVideoRef = useRef(null);

  // Ref to store our screen MediaStream (for cleanup)
  const screenStreamRef = useRef(null);

  // Attach local camera stream to localVideoRef
  useEffect(() => {
    if (localVideoRef.current && stream) {
      const videoTracks = stream.getVideoTracks();
      if (videoTracks.length > 0) {
        const clonedStream = new MediaStream(videoTracks);
        localVideoRef.current.srcObject = clonedStream;
      } else {
        localVideoRef.current.srcObject = stream;
      }
    }
  }, [stream]);

  // --- NEW: If call ends => automatically stop screen share
  useEffect(() => {
    if (!call) {
      // If there's no active call, ensure we are not sharing screen
      stopScreenShare();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [call]);

  // Only show if there's an active call of type "video"
  if (!call || call.callType !== "video") return null;

  // -------------------------
  // Toggle local audio
  // -------------------------
  const toggleAudio = () => {
    if (!stream) return;
    stream.getAudioTracks().forEach((track) => {
      track.enabled = !audioEnabled;
    });
    setAudioEnabled(!audioEnabled);
  };

  // -------------------------
  // Toggle local video
  // -------------------------
  const toggleVideo = () => {
    if (!stream) return;
    stream.getVideoTracks().forEach((track) => {
      track.enabled = !videoEnabled;
    });
    setVideoEnabled(!videoEnabled);
  };

  // -------------------------
  // Screen Share Logic
  // -------------------------
  async function handleScreenShare() {
    if (isSharingScreen) {
      stopScreenShare();
      return;
    }
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      screenStreamRef.current = screenStream;
      const screenTrack = screenStream.getVideoTracks()[0];

      // Add to each peer
      Object.values(peersRef.current).forEach(({ peer }) => {
        peer.addTrack(screenTrack, screenStream);
      });

      // If user stops sharing from browser UI
      screenTrack.onended = () => {
        stopScreenShare();
      };

      setIsSharingScreen(true);
    } catch (err) {
      console.error("Error screen-sharing:", err);
    }
  }

  function stopScreenShare() {
    if (screenStreamRef.current) {
      // Stop the local screen track(s)
      screenStreamRef.current.getTracks().forEach((track) => track.stop());
    }

    // Remove the screen track from each PeerConnection
    Object.values(peersRef.current).forEach(({ peer }) => {
      const senders = peer.getSenders();
      const screenSender = senders.find(
        (sender) =>
          sender.track &&
          sender.track.kind === "video" &&
          sender.track.label.toLowerCase().includes("screen")
      );
      if (screenSender) {
        peer.removeTrack(screenSender);
      }
    });

    screenStreamRef.current = null;
    setIsSharingScreen(false);
  }

  // -------------------------
  // Add participant flow
  // -------------------------
  const handleAddParticipant = () => setShowEmployeeModal(true);

  const onSelectEmployee = (employeeId) => {
    addParticipant(employeeId);
    setShowEmployeeModal(false);
  };

  // -------------------------
  // Group remote streams (camera + screen)
  // -------------------------
  const groupedStreams = remoteStreams.reduce((acc, item) => {
    const { userId } = item;
    if (!acc[userId]) acc[userId] = [];
    acc[userId].push(item);
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-80">
      <div className="relative w-[90%] max-w-[1200px] h-[80%] max-h-[700px] bg-black rounded-lg overflow-hidden">
        {/* REMOTE VIDEOS: group by userId */}
        <div className="w-full h-full grid grid-cols-2 md:grid-cols-3 gap-2 p-2 overflow-auto">
          {Object.keys(groupedStreams).map((uid) => {
            const userStreams = groupedStreams[uid];
            return (
              <div key={uid} className="flex flex-col gap-2">
                {userStreams.map(({ stream: remoteStream, type }, idx) => (
                  <video
                    key={`${uid}_${type}_${idx}`}
                    ref={(ref) => {
                      if (ref) ref.srcObject = remoteStream;
                    }}
                    autoPlay
                    playsInline
                    className="w-full h-40 object-cover bg-black rounded"
                  />
                ))}
                <div className="text-xs text-white">Remote User: {uid}</div>
              </div>
            );
          })}
        </div>

        {/* Local Video Thumbnail (bottom-right) */}
        <div className="absolute bottom-5 right-5 w-[150px] h-[100px] bg-gray-800 border-2 border-white rounded-md overflow-hidden">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover bg-black"
          />
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-5 left-0 w-full flex justify-center gap-6">
          {/* Hang Up */}
          <button
            onClick={leaveCall}
            className="w-12 h-12 bg-red-800 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition"
          >
            <FaPhoneSlash size={18} />
          </button>

          {/* Audio Mute/Unmute */}
          <button
            onClick={toggleAudio}
            className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition"
          >
            {audioEnabled ? <FaMicrophone size={18} /> : <FaMicrophoneSlash size={18} />}
          </button>

          {/* Video Toggle */}
          <button
            onClick={toggleVideo}
            className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition"
          >
            {videoEnabled ? <FaVideo size={18} /> : <FaVideoSlash size={18} />}
          </button>

          {/* Add Participant */}
          <button
            onClick={handleAddParticipant}
            className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition"
          >
            <FaPlus size={18} />
          </button>

          {/* Screen Share */}
          <button
            onClick={handleScreenShare}
            className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition"
          >
            <FaDesktop size={18} />
          </button>
        </div>

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

export default VideoCallModal;
