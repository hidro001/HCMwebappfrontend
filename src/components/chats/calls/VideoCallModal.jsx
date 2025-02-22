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
import EmployeeListModal from "./EmployeeListModal";

const VideoCallModal = () => {
  const { call, stream, remoteStreams, leaveCall, addParticipant } = useCall();

  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);

  // Refs for attaching media streams to <video> elements
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  // Attach local stream (camera/mic) to localVideoRef
  useEffect(() => {
    if (localVideoRef.current && stream) {
      const videoTracks = stream.getVideoTracks();
      if (videoTracks.length > 0) {
        // For local preview, clone just the video tracks if available
        const clonedStream = new MediaStream(videoTracks);
        localVideoRef.current.srcObject = clonedStream;
      } else {
        // If no video tracks (audio-only), attach the entire stream
        localVideoRef.current.srcObject = stream;
      }
    }
  }, [stream]);

  // Attach the first remote stream to remoteVideoRef
  useEffect(() => {
    if (remoteVideoRef.current && remoteStreams.length > 0) {
      remoteVideoRef.current.srcObject = remoteStreams[0].stream;
    } else if (remoteVideoRef.current) {
      // Clear if no remote streams
      remoteVideoRef.current.srcObject = null;
    }
  }, [remoteStreams]);

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

  const handleAddParticipant = () => {
    setShowEmployeeModal(true);
  };

  const onSelectEmployee = (employeeId) => {
    addParticipant(employeeId);
    setShowEmployeeModal(false);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-80">
      {/* Main Container */}
      <div className="relative w-[90%] max-w-[1200px] h-[80%] max-h-[700px] bg-black rounded-lg overflow-hidden">
        
        {/* Main Remote Video */}
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover bg-black"
        />

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

        {/* Call Controls (bottom-center) */}
        <div className="absolute bottom-5 left-0 w-full flex justify-center gap-6">
          {/* Hang Up */}
          <button
            onClick={leaveCall}
            className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition"
          >
            <FaPhoneSlash size={18} />
          </button>

          {/* Mute/Unmute Audio */}
          <button
            onClick={toggleAudio}
            className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition"
          >
            {audioEnabled ? <FaMicrophone size={18} /> : <FaMicrophoneSlash size={18} />}
          </button>

          {/* Toggle Video */}
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
        </div>

        {/* Add Participant Modal */}
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
