// src/contexts/CallContext.jsx
import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { toast } from "react-toastify";

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_URL;

const CallContext = createContext();

// Replace with your actual TURN server configuration.
const ICE_SERVERS = [
  {
    urls: "turn:razorinfotech.com:3478",
    username: "myUser",
    credential: "myPassword",
  },
];

const generateUniqueCallId = () => {
  return "call_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
};

export const CallProvider = ({ children }) => {
  const [call, setCall] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const [outgoingCall, setOutgoingCall] = useState(null);
  const [stream, setStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const localStreamRef = useRef(null);
  const peersRef = useRef({});
  const socketRef = useRef();
  const currentUser = localStorage.getItem("employeeId") || "EMP0001";

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { userId: currentUser },
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
      timeout: 10000,
    });

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
      socketRef.current.disconnect();
    };
  }, [currentUser]);

  const handleIncomingCall = (data) => {
    console.log("Incoming call:", data);
    setOutgoingCall(null);
    setIncomingCall(data);
  };

  const handleParticipantJoined = (data) => {
    console.log("Participant joined:", data);
    if (outgoingCall && outgoingCall.callId === data.callId) {
      setOutgoingCall(null);
      toast.info(`User ${data.userId} answered the call.`);
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
      toast.warn(`User ${data.userId} ended the call.`);
      cleanupCall();
    }
  };

  const handleCallRejected = (data) => {
    console.log(`Call ${data.callId} was rejected by ${data.userId}`);
    toast.error(`Call was rejected by ${data.userId}`);
    cleanupCall();
  };

  const handleEndCall = (data) => {
    console.log("Received endCall event:", data);
    toast.info("Call ended.");
    cleanupCall();
  };

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
        userId: currentUser,
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

  const createPeerConnection = async (callId, remoteUserId) => {
    console.log("Creating PeerConnection for:", remoteUserId);
    const peer = new RTCPeerConnection({ iceServers: ICE_SERVERS });
    if (localStreamRef.current) {
      // Use addTransceiver for each track to maintain consistent SDP m-line order.
      localStreamRef.current.getTracks().forEach((track) => {
        peer.addTransceiver(track, { direction: "sendrecv" });
      });
    }
    peer.onicecandidate = (evt) => {
      if (evt.candidate) {
        socketRef.current.emit("candidate", {
          callId,
          userId: currentUser,
          candidate: evt.candidate,
        });
      }
    };
    peer.onnegotiationneeded = async () => {
      // Only renegotiate if the signaling state is stable.
      if (peer.signalingState !== "stable") return;
      try {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        socketRef.current.emit("offer", {
          callId,
          userId: currentUser,
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
        console.warn(`Peer connection to ${remoteUserId} is ${peer.iceConnectionState}`);
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

  // Updated getLocalMedia: fallback to audio only if video access fails.
  const getLocalMedia = async (constraints) => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      localStreamRef.current = mediaStream;
    } catch (err) {
      console.error("Error accessing media devices:", err);
      // If video was requested, fallback to audio-only.
      if (constraints.video) {
        try {
          const fallbackConstraints = { video: false, audio: constraints.audio };
          const mediaStream = await navigator.mediaDevices.getUserMedia(fallbackConstraints);
          setStream(mediaStream);
          localStreamRef.current = mediaStream;
          toast.error("Video device not accessible. Switching to audio only.");
        } catch (err2) {
          console.error("Error accessing audio devices:", err2);
          toast.error("Error accessing media devices.");
          throw err2;
        }
      } else {
        toast.error("Error accessing media devices.");
        throw err;
      }
    }
  };

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
      socketRef.current.emit("initiateCall", {
        caller: currentUser,
        callType,
        participants,
        callId,
      });

      setCall({
        callId,
        callType,
        participants: [currentUser, ...participants],
      });

      // For each participant, create a peer connection and send an offer.
      for (let remoteUserId of participants) {
        const { peer } = await createPeerConnection(callId, remoteUserId);
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        socketRef.current.emit("offer", {
          callId,
          userId: currentUser,
          sdp: offer.sdp,
        });
      }
    } catch (err) {
      console.error("Error initiating call:", err);
      setOutgoingCall(null);
    }
  };

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
      socketRef.current.emit("answerCall", { callId, userId: currentUser });
      setCall({ callId, callType, participants });
      setIncomingCall(null);
      for (let pId of participants) {
        if (pId !== currentUser) {
          await createPeerConnection(callId, pId);
        }
      }
    } catch (err) {
      console.error("Error answering call:", err);
    }
  };

  const rejectCall = () => {
    if (!incomingCall) return;
    socketRef.current.emit("rejectCall", {
      callId: incomingCall.callId,
      userId: currentUser,
    });
    setIncomingCall(null);
  };

  const addParticipant = (newParticipant) => {
    if (!call) return;
    socketRef.current.emit("addParticipant", {
      callId: call.callId,
      newParticipant,
    });
    setCall((prev) =>
      prev ? { ...prev, participants: [...prev.participants, newParticipant] } : null
    );
  };

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
        toast.info("Call cancelled.");
      }
    }
    cleanupCall();
  };

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



