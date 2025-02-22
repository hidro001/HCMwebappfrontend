// // src/ContextApi/CallContext.jsx
// import { createContext, useContext, useState, useEffect, useRef } from "react";
// import io from "socket.io-client";

// import { toast } from "react-hot-toast";

// const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_URL;

// const CallContext = createContext();

// // Use your TURN server configuration here.
// const ICE_SERVERS = [
//   {
//     urls: "turn:razorinfotech.com:3478",
//     username: "myUser",
//     credential: "myPassword",
//   },
// ];

// // Utility: Generate a unique call ID (same format as your server)
// const generateUniqueCallId = () => {
//   return "call_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
// };

// export const CallProvider = ({ children }) => {
//   const [call, setCall] = useState(null);
//   const [incomingCall, setIncomingCall] = useState(null);
//   const [outgoingCall, setOutgoingCall] = useState(null);
//   const [stream, setStream] = useState(null);
//   const [remoteStreams, setRemoteStreams] = useState([]);
//   const localStreamRef = useRef(null);
//   const peersRef = useRef({});
//   const socketRef = useRef();
//   const currentUser = localStorage.getItem("employeeId") || "EMP0001";

//   useEffect(() => {
//     socketRef.current = io(SOCKET_SERVER_URL, {
//       query: { userId: currentUser },
//       transports: ["websocket", "polling"],
//       reconnectionAttempts: 5,
//       timeout: 10000,
//     });

//     socketRef.current.on("incomingCall", handleIncomingCall);
//     socketRef.current.on("participantJoined", handleParticipantJoined);
//     socketRef.current.on("participantLeft", handleParticipantLeft);
//     socketRef.current.on("callRejected", handleCallRejected);
//     socketRef.current.on("endCall", handleEndCall);

//     // WebRTC signaling
//     socketRef.current.on("offer", handleOffer);
//     socketRef.current.on("answer", handleAnswer);
//     socketRef.current.on("candidate", handleCandidate);

//     return () => {
//       socketRef.current.disconnect();
//     };
//   }, [currentUser]);

//   const handleIncomingCall = (data) => {
//     console.log("Incoming call:", data);
//     setOutgoingCall(null);
//     setIncomingCall(data);
//   };

//   const handleParticipantJoined = (data) => {
//     console.log("Participant joined:", data);
//     if (outgoingCall && outgoingCall.callId === data.callId) {
//       setOutgoingCall(null);
//       toast(`User ${data.userId} answered the call.`);
//     }
//   };

//   const handleParticipantLeft = (data) => {
//     console.log("Participant left:", data);
//     if (peersRef.current[data.userId]) {
//       peersRef.current[data.userId].peer.close();
//       delete peersRef.current[data.userId];
//     }
//     setRemoteStreams((prev) => prev.filter((s) => s.userId !== data.userId));

//     if (call && call.callId === data.callId) {
//       toast(`User ${data.userId} ended the call.`);
//       cleanupCall();
//     }
//   };

//   const handleCallRejected = (data) => {
//     console.log(`Call ${data.callId} was rejected by ${data.userId}`);
//     toast(`Call was rejected by ${data.userId}`);
//     cleanupCall();
//   };

//   const handleEndCall = (data) => {
//     console.log("Received endCall event:", data);
//     toast("Call ended.");
//     cleanupCall();
//   };

//   const handleOffer = async (data) => {
//     console.log("Offer received from:", data.userId);
//     if (!peersRef.current[data.userId]) {
//       await createPeerConnection(data.callId, data.userId);
//     }
//     const { peer } = peersRef.current[data.userId];
//     try {
//       await peer.setRemoteDescription({ type: "offer", sdp: data.sdp });
//       const answer = await peer.createAnswer();
//       await peer.setLocalDescription(answer);
//       socketRef.current.emit("answer", {
//         callId: data.callId,
//         userId: currentUser,
//         sdp: answer.sdp,
//       });
//     } catch (err) {
//       console.error("Error handling offer:", err);
//     }
//   };

//   const handleAnswer = async (data) => {
//     console.log("Answer received from:", data.userId);
//     const pcObject = peersRef.current[data.userId];
//     if (!pcObject) return;
//     try {
//       await pcObject.peer.setRemoteDescription({
//         type: "answer",
//         sdp: data.sdp,
//       });
//     } catch (err) {
//       console.error("Error setting remote description:", err);
//     }
//   };

//   const handleCandidate = async (data) => {
//     console.log("Candidate received from:", data.userId);
//     const pcObject = peersRef.current[data.userId];
//     if (!pcObject) return;
//     try {
//       await pcObject.peer.addIceCandidate(new RTCIceCandidate(data.candidate));
//     } catch (err) {
//       console.error("Error adding ICE candidate:", err);
//     }
//   };

//   const createPeerConnection = async (callId, remoteUserId) => {
//     console.log("Creating PeerConnection for:", remoteUserId);
//     const peer = new RTCPeerConnection({ iceServers: ICE_SERVERS });
//     if (localStreamRef.current) {
//       localStreamRef.current.getTracks().forEach((track) => {
//         peer.addTrack(track, localStreamRef.current);
//       });
//     }
//     peer.onicecandidate = (evt) => {
//       if (evt.candidate) {
//         socketRef.current.emit("candidate", {
//           callId,
//           userId: currentUser,
//           candidate: evt.candidate,
//         });
//       }
//     };
//     peer.onnegotiationneeded = async () => {
//       if (peer.signalingState !== "stable") return;
//       try {
//         const offer = await peer.createOffer();
//         await peer.setLocalDescription(offer);
//         socketRef.current.emit("offer", {
//           callId,
//           userId: currentUser,
//           sdp: offer.sdp,
//         });
//       } catch (err) {
//         console.error("Error in renegotiation:", err);
//       }
//     };
//     peer.oniceconnectionstatechange = () => {
//       console.log(`ICE state for ${remoteUserId}:`, peer.iceConnectionState);
//       if (
//         peer.iceConnectionState === "failed" ||
//         peer.iceConnectionState === "disconnected"
//       ) {
//         console.warn(
//           `Peer connection to ${remoteUserId} is ${peer.iceConnectionState}`
//         );
//       }
//     };
//     peer.ontrack = (event) => {
//       const [remoteStream] = event.streams;
//       console.log("Received remote track from:", remoteUserId);
//       setRemoteStreams((prev) => {
//         const existing = prev.find((s) => s.userId === remoteUserId);
//         if (existing) {
//           return prev.map((s) =>
//             s.userId === remoteUserId ? { ...s, stream: remoteStream } : s
//           );
//         } else {
//           return [...prev, { userId: remoteUserId, stream: remoteStream }];
//         }
//       });
//     };
//     peersRef.current[remoteUserId] = { peer };
//     return peersRef.current[remoteUserId];
//   };

//   // Updated getLocalMedia with HD constraints for video calls.
//   const getLocalMedia = async (constraints) => {
//     try {
//       const mediaStream = await navigator.mediaDevices.getUserMedia(
//         constraints
//       );
//       setStream(mediaStream);
//       localStreamRef.current = mediaStream;
//     } catch (err) {
//       console.error("Error accessing media devices:", err);
//       throw err;
//     }
//   };

//   // When initiating a call, generate a callId immediately.
//   const initiateCall = async ({ callType, participants }) => {
//     try {
//       const callId = generateUniqueCallId();
//       setOutgoingCall({
//         callType,
//         participants,
//         caller: currentUser,
//         callId,
//       });

//       const constraints =
//         callType === "video"
//           ? {
//               video: {
//                 width: { ideal: 1280 },
//                 height: { ideal: 720 },
//                 frameRate: { ideal: 30 },
//               },
//               audio: {
//                 sampleRate: 48000,
//                 channelCount: 2,
//                 echoCancellation: true,
//                 noiseSuppression: true,
//               },
//             }
//           : {
//               video: false,
//               audio: {
//                 sampleRate: 48000,
//                 channelCount: 2,
//                 echoCancellation: true,
//                 noiseSuppression: true,
//               },
//             };

//       await getLocalMedia(constraints);
//       socketRef.current.emit("initiateCall", {
//         caller: currentUser,
//         callType,
//         participants,
//         callId,
//       });

//       // Immediately set call state with callId.
//       setCall({
//         callId,
//         callType,
//         participants: [currentUser, ...participants],
//       });

//       // For each participant, create a peer connection and send an offer.
//       for (let remoteUserId of participants) {
//         const { peer } = await createPeerConnection(callId, remoteUserId);
//         const offer = await peer.createOffer();
//         await peer.setLocalDescription(offer);
//         socketRef.current.emit("offer", {
//           callId,
//           userId: currentUser,
//           sdp: offer.sdp,
//         });
//       }
//     } catch (err) {
//       console.error("Error initiating call:", err);
//       setOutgoingCall(null);
//     }
//   };

//   // When answering a call, use HD constraints.
//   const answerCall = async () => {
//     if (!incomingCall) return;
//     const { callId, callType, participants } = incomingCall;
//     try {
//       const constraints =
//         callType === "video"
//           ? {
//               video: {
//                 width: { ideal: 1280 },
//                 height: { ideal: 720 },
//                 frameRate: { ideal: 30 },
//               },
//               audio: {
//                 sampleRate: 48000,
//                 channelCount: 2,
//                 echoCancellation: true,
//                 noiseSuppression: true,
//               },
//             }
//           : {
//               video: false,
//               audio: {
//                 sampleRate: 48000,
//                 channelCount: 2,
//                 echoCancellation: true,
//                 noiseSuppression: true,
//               },
//             };

//       await getLocalMedia(constraints);
//       socketRef.current.emit("answerCall", { callId, userId: currentUser });
//       setCall({ callId, callType, participants });
//       setIncomingCall(null);
//       participants.forEach(async (pId) => {
//         if (pId !== currentUser) {
//           await createPeerConnection(callId, pId);
//         }
//       });
//     } catch (err) {
//       console.error("Error answering call:", err);
//     }
//   };

//   const rejectCall = () => {
//     if (!incomingCall) return;
//     socketRef.current.emit("rejectCall", {
//       callId: incomingCall.callId,
//       userId: currentUser,
//     });
//     setIncomingCall(null);
//   };

//   const addParticipant = (newParticipant) => {
//     if (!call) return;
//     socketRef.current.emit("addParticipant", {
//       callId: call.callId,
//       newParticipant,
//     });
//     setCall((prev) =>
//       prev
//         ? { ...prev, participants: [...prev.participants, newParticipant] }
//         : null
//     );
//   };

//   // Updated leaveCall now handles cancellation for an outgoing call.
//   const leaveCall = () => {
//     if (!call && !outgoingCall) return;
//     if (call) {
//       socketRef.current.emit("leaveCall", {
//         callId: call.callId,
//         userId: currentUser,
//       });
//     } else if (outgoingCall) {
//       if (outgoingCall.callId) {
//         socketRef.current.emit("cancelCall", {
//           callId: outgoingCall.callId,
//           userId: currentUser,
//         });
//       } else {
//         console.warn("Call cancelled before callId was set.");
//         toast("Call cancelled.");
//       }
//     }
//     cleanupCall();
//   };

//   const cleanupCall = () => {
//     Object.values(peersRef.current).forEach(({ peer }) => peer.close());
//     peersRef.current = {};
//     if (localStreamRef.current) {
//       localStreamRef.current.getTracks().forEach((track) => track.stop());
//       localStreamRef.current = null;
//     }
//     setStream(null);
//     setCall(null);
//     setIncomingCall(null);
//     setOutgoingCall(null);
//     setRemoteStreams([]);
//   };

//   return (
//     <CallContext.Provider
//       value={{
//         call,
//         incomingCall,
//         outgoingCall,
//         stream,
//         remoteStreams,
//         initiateCall,
//         answerCall,
//         rejectCall,
//         addParticipant,
//         leaveCall,
//         socket: socketRef.current,
//         peersRef,
//       }}
//     >
//       {children}
//     </CallContext.Provider>
//   );
// };

// export const useCall = () => useContext(CallContext);

// export default CallProvider;

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import io from "socket.io-client";
import { toast } from "react-hot-toast";

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_URL;

// Use your TURN server configuration here.
const ICE_SERVERS = [
  {
    urls: "turn:razorinfotech.com:3478",
    username: "myUser",
    credential: "myPassword",
  },
];

// Utility: Generate a unique call ID (same format as your server)
const generateUniqueCallId = () => {
  return "call_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
};

const CallContext = createContext();

export const CallProvider = ({ children }) => {
  // --------------------------------------
  // 1) Store the user/employee ID in state
  //    rather than reading localStorage directly.
  // --------------------------------------
  const [currentUser, setCurrentUser] = useState(null);

  // --------------------------------------
  // Additional call-related states
  // --------------------------------------
  const [call, setCall] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const [outgoingCall, setOutgoingCall] = useState(null);
  const [stream, setStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);

  // Refs
  const localStreamRef = useRef(null);
  const peersRef = useRef({});
  const socketRef = useRef();

  // --------------------------------------
  // 2) On mount, read localStorage (or use
  //    your Auth logic) to populate currentUser.
  // --------------------------------------
  useEffect(() => {
    const storedEmployeeId = localStorage.getItem("employeeId");
    if (storedEmployeeId) {
      setCurrentUser(storedEmployeeId);
    } else {
      // Optionally provide a fallback or wait for the user to log in
      setCurrentUser("EMP0001");
    }
  }, []);

  // --------------------------------------
  // 3) Once we have currentUser, connect socket and attach listeners
  // --------------------------------------
  useEffect(() => {
    if (!currentUser) return; // don't connect until we have an ID

    // Connect socket with the correct user ID
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { userId: currentUser },
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
      timeout: 10000,
    });

    // Attach all the socket event listeners
    socketRef.current.on("incomingCall", handleIncomingCall);
    socketRef.current.on("participantJoined", handleParticipantJoined);
    socketRef.current.on("participantLeft", handleParticipantLeft);
    socketRef.current.on("callRejected", handleCallRejected);
    socketRef.current.on("endCall", handleEndCall);

    // WebRTC signaling
    socketRef.current.on("offer", handleOffer);
    socketRef.current.on("answer", handleAnswer);
    socketRef.current.on("candidate", handleCandidate);

    return () => {
      // Clean up socket on unmount or if user ID changes
      socketRef.current.disconnect();
    };
  }, [currentUser]);

  // -----------------------
  // Event Handlers
  // -----------------------
  const handleIncomingCall = (data) => {
    console.log("Incoming call:", data);
    setOutgoingCall(null);
    setIncomingCall(data);
  };

  const handleParticipantJoined = (data) => {
    console.log("Participant joined:", data);
    if (outgoingCall && outgoingCall.callId === data.callId) {
      setOutgoingCall(null);
      toast(`User ${data.userId} answered the call.`);
    }
  };

  const handleParticipantLeft = (data) => {
    console.log("Participant left:", data);
    if (peersRef.current[data.userId]) {
      peersRef.current[data.userId].peer.close();
      delete peersRef.current[data.userId];
    }
    setRemoteStreams((prev) => prev.filter((s) => s.userId !== data.userId));
    if (call && call.callId === data.callId) {
      toast(`User ${data.userId} ended the call.`);
      cleanupCall();
    }
  };

  const handleCallRejected = (data) => {
    console.log(`Call ${data.callId} was rejected by ${data.userId}`);
    toast(`Call was rejected by ${data.userId}`);
    cleanupCall();
  };

  const handleEndCall = (data) => {
    console.log("Received endCall event:", data);
    toast("Call ended.");
    cleanupCall();
  };

  // -----------------------
  // WebRTC Signaling Handlers
  // -----------------------
  const handleOffer = async (data) => {
    console.log("Offer received from:", data.userId);
    if (!peersRef.current[data.userId]) {
      await createPeerConnection(data.callId, data.userId);
    }
    const { peer } = peersRef.current[data.userId];
    try {
      await peer.setRemoteDescription({ type: "offer", sdp: data.sdp });
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);
      socketRef.current.emit("answer", {
        callId: data.callId,
        userId: currentUser, // <--- use state variable
        sdp: answer.sdp,
      });
    } catch (err) {
      console.error("Error handling offer:", err);
    }
  };

  const handleAnswer = async (data) => {
    console.log("Answer received from:", data.userId);
    const pcObject = peersRef.current[data.userId];
    if (!pcObject) return;
    try {
      await pcObject.peer.setRemoteDescription({
        type: "answer",
        sdp: data.sdp,
      });
    } catch (err) {
      console.error("Error setting remote description:", err);
    }
  };

  const handleCandidate = async (data) => {
    console.log("Candidate received from:", data.userId);
    const pcObject = peersRef.current[data.userId];
    if (!pcObject) return;
    try {
      await pcObject.peer.addIceCandidate(new RTCIceCandidate(data.candidate));
    } catch (err) {
      console.error("Error adding ICE candidate:", err);
    }
  };

  // -----------------------
  // Create PeerConnection
  // -----------------------
  const createPeerConnection = async (callId, remoteUserId) => {
    console.log("Creating PeerConnection for:", remoteUserId);
    const peer = new RTCPeerConnection({ iceServers: ICE_SERVERS });
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => {
        peer.addTrack(track, localStreamRef.current);
      });
    }
    peer.onicecandidate = (evt) => {
      if (evt.candidate) {
        socketRef.current.emit("candidate", {
          callId,
          userId: currentUser, // <--- use state variable
          candidate: evt.candidate,
        });
      }
    };
    peer.onnegotiationneeded = async () => {
      if (peer.signalingState !== "stable") return;
      try {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        socketRef.current.emit("offer", {
          callId,
          userId: currentUser, // <--- use state variable
          sdp: offer.sdp,
        });
      } catch (err) {
        console.error("Error in renegotiation:", err);
      }
    };
    peer.oniceconnectionstatechange = () => {
      console.log(`ICE state for ${remoteUserId}:`, peer.iceConnectionState);
      if (
        peer.iceConnectionState === "failed" ||
        peer.iceConnectionState === "disconnected"
      ) {
        console.warn(
          `Peer connection to ${remoteUserId} is ${peer.iceConnectionState}`
        );
      }
    };
    peer.ontrack = (event) => {
      const [remoteStream] = event.streams;
      console.log("Received remote track from:", remoteUserId);
      setRemoteStreams((prev) => {
        const existing = prev.find((s) => s.userId === remoteUserId);
        if (existing) {
          return prev.map((s) =>
            s.userId === remoteUserId ? { ...s, stream: remoteStream } : s
          );
        } else {
          return [...prev, { userId: remoteUserId, stream: remoteStream }];
        }
      });
    };
    peersRef.current[remoteUserId] = { peer };
    return peersRef.current[remoteUserId];
  };

  // -----------------------
  // Get Local Media
  // -----------------------
  const getLocalMedia = async (constraints) => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia(
        constraints
      );
      setStream(mediaStream);
      localStreamRef.current = mediaStream;
    } catch (err) {
      console.error("Error accessing media devices:", err);
      throw err;
    }
  };

  // -----------------------
  // Initiate Call
  // -----------------------
  const initiateCall = async ({ callType, participants }) => {
    try {
      const callId = generateUniqueCallId();
      setOutgoingCall({
        callType,
        participants,
        caller: currentUser,
        callId,
      });

      const constraints =
        callType === "video"
          ? {
              video: {
                width: { ideal: 1280 },
                height: { ideal: 720 },
                frameRate: { ideal: 30 },
              },
              audio: {
                sampleRate: 48000,
                channelCount: 2,
                echoCancellation: true,
                noiseSuppression: true,
              },
            }
          : {
              video: false,
              audio: {
                sampleRate: 48000,
                channelCount: 2,
                echoCancellation: true,
                noiseSuppression: true,
              },
            };

      await getLocalMedia(constraints);

      // Inform server we're initiating a call
      socketRef.current.emit("initiateCall", {
        caller: currentUser,
        callType,
        participants,
        callId,
      });

      // Immediately set call state
      setCall({
        callId,
        callType,
        participants: [currentUser, ...participants],
      });

      // Create PeerConnections/offers for each participant
      for (let remoteUserId of participants) {
        const { peer } = await createPeerConnection(callId, remoteUserId);
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        socketRef.current.emit("offer", {
          callId,
          userId: currentUser, // <--- use state variable
          sdp: offer.sdp,
        });
      }
    } catch (err) {
      console.error("Error initiating call:", err);
      setOutgoingCall(null);
    }
  };

  // -----------------------
  // Answer Call
  // -----------------------
  const answerCall = async () => {
    if (!incomingCall) return;
    const { callId, callType, participants } = incomingCall;
    try {
      const constraints =
        callType === "video"
          ? {
              video: {
                width: { ideal: 1280 },
                height: { ideal: 720 },
                frameRate: { ideal: 30 },
              },
              audio: {
                sampleRate: 48000,
                channelCount: 2,
                echoCancellation: true,
                noiseSuppression: true,
              },
            }
          : {
              video: false,
              audio: {
                sampleRate: 48000,
                channelCount: 2,
                echoCancellation: true,
                noiseSuppression: true,
              },
            };

      await getLocalMedia(constraints);

      socketRef.current.emit("answerCall", {
        callId,
        userId: currentUser, // <--- use state variable
      });

      setCall({ callId, callType, participants });
      setIncomingCall(null);

      // Create PeerConnections for each participant
      participants.forEach(async (pId) => {
        if (pId !== currentUser) {
          await createPeerConnection(callId, pId);
        }
      });
    } catch (err) {
      console.error("Error answering call:", err);
    }
  };

  // -----------------------
  // Reject Call
  // -----------------------
  const rejectCall = () => {
    if (!incomingCall) return;
    socketRef.current.emit("rejectCall", {
      callId: incomingCall.callId,
      userId: currentUser,
    });
    setIncomingCall(null);
  };

  // -----------------------
  // Add Participant
  // -----------------------
  const addParticipant = (newParticipant) => {
    if (!call) return;
    socketRef.current.emit("addParticipant", {
      callId: call.callId,
      newParticipant,
    });
    setCall((prev) =>
      prev
        ? { ...prev, participants: [...prev.participants, newParticipant] }
        : null
    );
  };

  // -----------------------
  // Leave / Cancel Call
  // -----------------------
  const leaveCall = () => {
    if (!call && !outgoingCall) return;

    if (call) {
      socketRef.current.emit("leaveCall", {
        callId: call.callId,
        userId: currentUser,
      });
    } else if (outgoingCall) {
      if (outgoingCall.callId) {
        socketRef.current.emit("cancelCall", {
          callId: outgoingCall.callId,
          userId: currentUser,
        });
      } else {
        console.warn("Call cancelled before callId was set.");
        toast("Call cancelled.");
      }
    }
    cleanupCall();
  };

  // -----------------------
  // Cleanup Call
  // -----------------------
  const cleanupCall = () => {
    Object.values(peersRef.current).forEach(({ peer }) => peer.close());
    peersRef.current = {};

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }
    setStream(null);
    setCall(null);
    setIncomingCall(null);
    setOutgoingCall(null);
    setRemoteStreams([]);
  };

  return (
    <CallContext.Provider
      value={{
        call,
        incomingCall,
        outgoingCall,
        stream,
        remoteStreams,
        initiateCall,
        answerCall,
        rejectCall,
        addParticipant,
        leaveCall,
        socket: socketRef.current,
        peersRef,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};

export const useCall = () => useContext(CallContext);

export default CallProvider;
