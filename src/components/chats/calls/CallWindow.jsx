import  { useEffect, useState, useRef } from 'react';
import { useCall } from '../../../contexts/CallContext';
import EmployeeListModal from './EmployeeListModal';

const currentUserId = localStorage.getItem('employeeId');
const currentUserName = localStorage.getItem('userName');

const AudioPlayer = ({ stream }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && stream) ref.current.srcObject = stream;
  }, [stream]);
  return <audio ref={ref} autoPlay playsInline />;
};

const CallWindow = () => {
  const { call, outgoingCall, stream, remoteStreams, leaveCall, addParticipant } = useCall();
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);

  useEffect(() => {
    if (stream) stream.getAudioTracks().forEach(track => track.enabled = audioEnabled);
  }, [stream, audioEnabled]);

  if (outgoingCall && !call) {
    if (outgoingCall.callType === 'video') return null;
    return (
      <div className="fixed top-5 right-5 z-[2000]">
        <div className="w-64 rounded-xl bg-white shadow-lg flex flex-col items-center py-5 px-4">
          <h3 className="text-center text-sm">
            Voice Call: Calling {outgoingCall.participants.join(', ')}...
          </h3>
          <div className="mt-2 w-8 h-8 border-4 border-gray-300 border-t-[#6B73FF] rounded-full animate-spin" />
        </div>
      </div>
    );
  }
  if (!call) return null;

  const participants = call.participants || [];
  const callTypeLabel = call.callType === 'video' ? 'Video Call' : 'Voice Call';
  const remoteUserIds = participants.filter(p => p !== currentUserId);
  const remoteUserLabel = remoteUserIds.length
    ? `Connected with ${remoteUserIds.join(', ')}`
    : 'Waiting for participant...';

  const toggleAudio = () => {
    if (!stream) return;
    stream.getAudioTracks().forEach(track => track.enabled = !audioEnabled);
    setAudioEnabled(!audioEnabled);
  };

  return (
    <div className="fixed top-5 right-5 z-[2000]">
      <div className="w-80 rounded-xl bg-white shadow-lg flex flex-col items-center overflow-hidden pb-2">
        <div className="flex items-center w-full py-2 px-4 bg-gradient-to-br from-[#6B73FF] to-[#000DFF]">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex justify-center items-center mr-4">
            <div className="w-10 h-10 rounded-full bg-gray-400" />
          </div>
          <div className="flex flex-col text-white">
            <span className="text-sm font-bold">
              {currentUserName} ({currentUserId})
            </span>
          </div>
        </div>
        <div className="mt-2 py-1 px-3 rounded-lg bg-[#b19cff] text-white text-xs uppercase">
          {callTypeLabel}
        </div>
        <small className="mt-1 text-gray-600">{remoteUserLabel}</small>
        <div className="w-full p-3 text-center">
          <div className="w-full h-44 rounded-lg bg-gray-100 flex items-center justify-center mt-3">
            <p className="text-gray-500">Voice Call Connected</p>
          </div>
        </div>
        {remoteStreams.map(({ userId, stream }) => (
          <AudioPlayer key={userId} stream={stream} />
        ))}
        <div className="flex justify-around w-full pt-2 border-t border-gray-300">
          <button
            onClick={leaveCall}
            className="bg-red-600 rounded-full w-12 h-12 text-white flex items-center justify-center hover:bg-red-700 transition"
          >
            ❌
          </button>
          <button
            onClick={() => setShowEmployeeModal(true)}
            className="bg-green-600 rounded-full w-12 h-12 text-white flex items-center justify-center hover:bg-green-700 transition"
          >
            ➕
          </button>
          <button
            onClick={toggleAudio}
            className="bg-green-600 rounded-full w-12 h-12 text-white flex items-center justify-center hover:bg-green-700 transition"
          >
            {audioEnabled ? 'Mute' : 'Unmute'}
          </button>
        </div>
      </div>
      {showEmployeeModal && (
        <EmployeeListModal
          onClose={() => setShowEmployeeModal(false)}
          onSelectEmployee={id => { addParticipant(id); }}
        />
      )}
    </div>
  );
};
export default CallWindow;