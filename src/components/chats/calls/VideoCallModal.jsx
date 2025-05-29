import React, { useEffect, useRef, useState, Fragment } from 'react';
import { useCall } from '../../../contexts/CallContext';
import {
  FaPhoneSlash,
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaPlus,
  FaDesktop,
} from 'react-icons/fa';
import EmployeeListModal from './EmployeeListModal';

const VideoCallModal = () => {
  const { call, localStream, remoteStreams, leaveCall, addParticipant } = useCall();
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const localVideoRef = useRef(null);
  const screenStreamRef = useRef(null);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (!call) stopScreenShare();
  }, [call]);

  const toggleAudio = () => {
    if (!localStream) return;
    localStream.getAudioTracks().forEach(t => (t.enabled = !audioEnabled));
    setAudioEnabled(e => !e);
  };
  const toggleVideo = () => {
    if (!localStream) return;
    localStream.getVideoTracks().forEach(t => (t.enabled = !videoEnabled));
    setVideoEnabled(v => !v);
  };
  const handleScreenShare = async () => {
    if (isSharingScreen) return stopScreenShare();
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      screenStreamRef.current = screenStream;
      setIsSharingScreen(true);
      screenStream.getVideoTracks()[0].onended = stopScreenShare;
    } catch (err) {
      console.error('Screen sharing failed:', err);
    }
  };
  const stopScreenShare = () => {
    screenStreamRef.current?.getTracks().forEach(t => t.stop());
    screenStreamRef.current = null;
    setIsSharingScreen(false);
  };
  const handleAddParticipant = () => setShowEmployeeModal(true);
  const onSelectEmployee = id => {
    addParticipant(id);
    setShowEmployeeModal(false);
  };

  if (!call || call.callType !== 'video') return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-80">
      <div className="relative w-[90%] max-w-[1200px] h-[80%] max-h-[700px] bg-black rounded-lg overflow-hidden">
        {/* remote streams grid */}
        <div className="w-full h-full grid grid-cols-2 md:grid-cols-3 gap-2 p-2 overflow-auto">
          {remoteStreams.map(({ consumerId, kind, stream }) => {
            // compound key to guarantee uniqueness
            const key = `${consumerId}-${kind}`;

            // a small helper to attach the MediaStream and call play()
            const refCb = el => {
              if (!el || el.srcObject === stream) return;
              el.srcObject = stream;
              if (kind === 'video') el.play().catch(() => {});
            };

            return (
              <Fragment key={key}>
                {kind === 'video' ? (
                  <video
                    muted
                    autoPlay
                    playsInline
                    ref={refCb}
                    className="w-full h-40 object-cover bg-black rounded"
                  />
                ) : (
                  <audio
                    autoPlay
                    ref={refCb}
                  />
                )}
              </Fragment>
            );
          })}
        </div>

        {/* local preview */}
        <div className="absolute bottom-5 right-5 w-[150px] h-[100px] bg-gray-800 border-2 border-white rounded-md overflow-hidden">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover bg-black"
          />
        </div>

        {/* controls */}
        <div className="absolute bottom-5 left-0 w-full flex justify-center gap-6">
          <button onClick={leaveCall} className="w-12 h-12 bg-red-800 …"><FaPhoneSlash size={18} /></button>
          <button onClick={toggleAudio} className="w-12 h-12 bg-gray-800 …">
            {audioEnabled ? <FaMicrophone size={18} /> : <FaMicrophoneSlash size={18} />}
          </button>
          <button onClick={toggleVideo} className="w-12 h-12 bg-gray-800 …">
            {videoEnabled ? <FaVideo size={18} /> : <FaVideoSlash size={18} />}
          </button>
          <button onClick={handleAddParticipant} className="w-12 h-12 bg-gray-800 …"><FaPlus size={18} /></button>
          <button onClick={handleScreenShare} className="w-12 h-12 bg-gray-800 …"><FaDesktop size={18} /></button>
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
