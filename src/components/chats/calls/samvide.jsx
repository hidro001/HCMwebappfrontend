// // src/components/VideoCallModal.jsx
// import React, { useEffect, useRef, useState } from "react";
// import { useCall } from "../../../contexts/CallContext";
// import {
//   FaPhoneSlash,
//   FaMicrophone,
//   FaMicrophoneSlash,
//   FaVideo,
//   FaVideoSlash,
//   FaPlus,
// } from "react-icons/fa";
// import EmployeeListModal from "./EmployeeListModal";

// // Child component for each remote participant's video.
// function RemoteVideoTile({ userId, remoteStream }) {
//   const videoRef = useRef(null);
//   useEffect(() => {
//     if (videoRef.current && remoteStream) {
//       videoRef.current.srcObject = remoteStream;
//     }
//   }, [remoteStream]);

//   return (
//     <div className="relative bg-gray-800 rounded overflow-hidden">
//       <video
//         ref={videoRef}
//         autoPlay
//         playsInline
//         className="w-full h-auto object-cover"
//       />
//       <p className="absolute bottom-2 left-2 text-white text-xs shadow-lg">
//         {userId}
//       </p>
//     </div>
//   );
// }

// export default function VideoCallModal() {
//   const { call, stream, remoteStreams, leaveCall, addParticipant } = useCall();
//   const [audioEnabled, setAudioEnabled] = useState(true);
//   const [videoEnabled, setVideoEnabled] = useState(true);
//   const [showEmployeeModal, setShowEmployeeModal] = useState(false);
//   const localVideoRef = useRef(null);

//   useEffect(() => {
//     if (localVideoRef.current && stream) {
//       // Clone the video tracks for local preview.
//       const videoTracks = stream.getVideoTracks();
//       if (videoTracks.length > 0) {
//         const clonedStream = new MediaStream(videoTracks);
//         localVideoRef.current.srcObject = clonedStream;
//       } else {
//         localVideoRef.current.srcObject = stream;
//       }
//     }
//   }, [stream]);

//   // Only show if there's an active call of type "video"
//   if (!call || call.callType !== "video") return null;

//   const toggleAudio = (e) => {
//     e.preventDefault();
//     if (!stream) return;
//     stream.getAudioTracks().forEach((track) => {
//       track.enabled = !audioEnabled;
//     });
//     setAudioEnabled(!audioEnabled);
//   };

//   const toggleVideo = (e) => {
//     e.preventDefault();
//     if (!stream) return;
//     stream.getVideoTracks().forEach((track) => {
//       track.enabled = !videoEnabled;
//     });
//     setVideoEnabled(!videoEnabled);
//   };

//   const handleAddParticipant = (e) => {
//     e.preventDefault();
//     setShowEmployeeModal(true);
//   };

//   const onSelectEmployee = (employeeId) => {
//     addParticipant(employeeId);
//     setShowEmployeeModal(false);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-5xl h-[80vh] bg-black dark:bg-gray-900 rounded-lg flex flex-col overflow-hidden relative">
//         {/* Video Grid */}
//         <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 overflow-y-auto">
//           {/* Local Video */}
//           <div className="relative bg-gray-800 rounded overflow-hidden">
//             <video
//               ref={localVideoRef}
//               autoPlay
//               muted
//               playsInline
//               className="w-full h-auto object-cover"
//             />
//             <p className="absolute bottom-2 left-2 text-white text-xs shadow-lg">
//               You
//             </p>
//           </div>
//           {/* Remote Videos */}
//           {remoteStreams.map(({ userId, stream: remoteStream }) => (
//             <RemoteVideoTile
//               key={userId}
//               userId={userId}
//               remoteStream={remoteStream}
//             />
//           ))}
//         </div>
//         {/* Call Controls */}
//         <div className="flex justify-center gap-4 p-4 bg-black bg-opacity-50">
//           {/* Hang Up */}
//           <button
//             type="button"
//             onClick={(e) => {
//               e.preventDefault();
//               leaveCall();
//             }}
//             className="bg-gray-900 text-white rounded-full w-12 h-12 flex items-center justify-center focus:outline-none"
//           >
//             <FaPhoneSlash size={18} />
//           </button>
//           {/* Toggle Audio */}
//           <button
//             type="button"
//             onClick={toggleAudio}
//             className="bg-gray-900 text-white rounded-full w-12 h-12 flex items-center justify-center focus:outline-none"
//           >
//             {audioEnabled ? (
//               <FaMicrophone size={18} />
//             ) : (
//               <FaMicrophoneSlash size={18} />
//             )}
//           </button>
//           {/* Toggle Video */}
//           <button
//             type="button"
//             onClick={toggleVideo}
//             className="bg-gray-900 text-white rounded-full w-12 h-12 flex items-center justify-center focus:outline-none"
//           >
//             {videoEnabled ? <FaVideo size={18} /> : <FaVideoSlash size={18} />}
//           </button>
//           {/* Add Participant */}
//           <button
//             type="button"
//             onClick={handleAddParticipant}
//             className="bg-gray-900 text-white rounded-full w-12 h-12 flex items-center justify-center focus:outline-none"
//           >
//             <FaPlus size={18} />
//           </button>
//         </div>
//         {/* Employee List Modal */}
//         {showEmployeeModal && (
//           <EmployeeListModal
//             onClose={() => setShowEmployeeModal(false)}
//             onSelectEmployee={onSelectEmployee}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

