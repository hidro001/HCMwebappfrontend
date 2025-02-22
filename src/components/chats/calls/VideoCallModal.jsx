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
import EmployeeListModal from "./EmployeeListModal";

export default function VideoCallModal() {
  const { call, stream, remoteStreams, leaveCall, addParticipant } = useCall();
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const localVideoRef = useRef(null);
  const mainVideoRef = useRef(null);

  // Set up the local video preview.
  useEffect(() => {
    if (localVideoRef.current && stream) {
      const videoTracks = stream.getVideoTracks();
      localVideoRef.current.srcObject =
        videoTracks.length > 0 ? new MediaStream(videoTracks) : stream;
    }
  }, [stream]);

  // Set up the main video feed to show the first remote stream.
  useEffect(() => {
    if (mainVideoRef.current) {
      if (remoteStreams.length > 0) {
        mainVideoRef.current.srcObject = remoteStreams[0].stream;
      } else {
        mainVideoRef.current.srcObject = null;
      }
    }
  }, [remoteStreams]);

  const toggleAudio = (e) => {
    e.preventDefault();
    if (!stream) return;
    stream.getAudioTracks().forEach((track) => {
      track.enabled = !audioEnabled;
    });
    setAudioEnabled((prev) => !prev);
  };

  const toggleVideo = (e) => {
    e.preventDefault();
    if (!stream) return;
    stream.getVideoTracks().forEach((track) => {
      track.enabled = !videoEnabled;
    });
    setVideoEnabled((prev) => !prev);
  };

  const handleAddParticipant = (e) => {
    e.preventDefault();
    setShowEmployeeModal(true);
  };

  const onSelectEmployee = (employeeId) => {
    addParticipant(employeeId);
    setShowEmployeeModal(false);
  };

  // Only render if there's an active call of type "video"
  const showModal = call && call.callType === "video";
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl mx-auto bg-black rounded-lg overflow-hidden">
        {/* Main Video Feed */}
        <div className="relative w-full h-96 bg-gray-900 flex items-center justify-center">
          {remoteStreams.length > 0 ? (
            <video
              ref={mainVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-xl">
              Waiting for remote stream...
            </div>
          )}
          {/* Small Floating Video (Bottom Right) */}
          <div className="absolute bottom-4 right-4 w-24 h-24 bg-gray-800 border-2 border-white rounded-lg overflow-hidden">
            {stream ? (
              <video
                ref={localVideoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src="https://placehold.co/100x100?text=User"
                alt="Participant"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Call Controls */}
        <div className="flex justify-center space-x-6 bg-black p-4">
          {/* End Call Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              leaveCall();
            }}
            className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:bg-red-600 focus:outline-none"
          >
            <FaPhoneSlash size={20} />
          </button>

          {/* Toggle Audio Button */}
          <button
            type="button"
            onClick={toggleAudio}
            className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:bg-blue-600 focus:outline-none"
          >
            {audioEnabled ? (
              <FaMicrophone size={20} />
            ) : (
              <FaMicrophoneSlash size={20} />
            )}
          </button>

          {/* Toggle Video Button */}
          <button
            type="button"
            onClick={toggleVideo}
            className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:bg-blue-600 focus:outline-none"
          >
            {videoEnabled ? <FaVideo size={20} /> : <FaVideoSlash size={20} />}
          </button>

          {/* Add Participant Button */}
          <button
            type="button"
            onClick={handleAddParticipant}
            className="bg-gray-900 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:bg-gray-700 focus:outline-none"
          >
            <FaPlus size={20} />
          </button>
        </div>

        {/* Employee List Modal */}
        {showEmployeeModal && (
          <EmployeeListModal
            onClose={() => setShowEmployeeModal(false)}
            onSelectEmployee={onSelectEmployee}
          />
        )}
      </div>
    </div>
  );
}


