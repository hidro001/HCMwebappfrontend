import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useMemo,
} from "react";
import io from "socket.io-client";
import { toast } from "react-hot-toast";

// Where your server is hosted:
const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_URL_CALL;

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

export function CallProvider({ children }) {
  // ----------------------------------------------------------------
  // 1) Store user info & socket. We'll connect/disconnect manually.
  // ----------------------------------------------------------------
  const [currentUser, setCurrentUser] = useState(null);
  const socketRef = useRef(null);

  // ----------------------------------------------------------------
  // 2) All the usual call states
  // ----------------------------------------------------------------
  const [call, setCall] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const [outgoingCall, setOutgoingCall] = useState(null);
  const [stream, setStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);

  // RTC references
  const localStreamRef = useRef(null);
  const peersRef = useRef({});

  // ----------------------------------------------------------------
  // 3) Provide a function to connect the socket (when user logs in)
  // ----------------------------------------------------------------
  const connectCallSocket = (userId) => {
    if (!userId) {
      console.error("No userId provided for call socket connection.");
      return;
    }
    // Store current user in state
    setCurrentUser(userId);

    // If already connected, do nothing
    if (socketRef.current) {
      console.warn("Call socket is already connected or connecting.");
      return;
    }

    // Create new socket connection
    const newSocket = io(`${SOCKET_SERVER_URL}`, {
      query: { userId },
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
      timeout: 10000,
    });

    // Attach all your event listeners
    newSocket.on("connect", () => {
      console.log("[CALL] Socket connected:", newSocket.id);
    });
    newSocket.on("incomingCall", handleIncomingCall);
    newSocket.on("participantJoined", handleParticipantJoined);
    newSocket.on("participantLeft", handleParticipantLeft);
    newSocket.on("callRejected", handleCallRejected);
    newSocket.on("endCall", handleEndCall);

    // WebRTC signaling
    newSocket.on("offer", handleOffer);
    newSocket.on("answer", handleAnswer);
    newSocket.on("candidate", handleCandidate);

    newSocket.on("disconnect", () => {
      console.log("[CALL] Socket disconnected:", newSocket.id);
      // optional cleanup here
    });

    socketRef.current = newSocket;
  };

  // ----------------------------------------------------------------
  // 4) Provide a function to disconnect the socket (on logout)
  // ----------------------------------------------------------------
  const disconnectCallSocket = () => {
    if (socketRef.current) {
      // Clean up any ongoing calls
      cleanupCall();

      // Actually disconnect the socket
      socketRef.current.disconnect();
      socketRef.current = null;
      setCurrentUser(null);
      console.log("[CALL] Socket disconnected (logout).");
    }
  };

  // ----------------------------------------------------------------
  // 5) All the same event handlers as before...
  // ----------------------------------------------------------------
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
          userId: currentUser,
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
        console.warn(`Peer to ${remoteUserId} is ${peer.iceConnectionState}`);
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
        }
        return [...prev, { userId: remoteUserId, stream: remoteStream }];
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
    if (!socketRef.current || !currentUser) {
      console.warn("Cannot initiate call, socket not connected or no user.");
      return;
    }

    try {
      const callId = generateUniqueCallId();
      setOutgoingCall({ callType, participants, caller: currentUser, callId });

      const constraints =
        callType === "video"
          ? {
              video: { width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 30 } },
              audio: { echoCancellation: true, noiseSuppression: true },
            }
          : {
              video: false,
              audio: { echoCancellation: true, noiseSuppression: true },
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
          userId: currentUser,
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
    if (!incomingCall || !socketRef.current || !currentUser) return;
    const { callId, callType, participants } = incomingCall;

    try {
      const constraints =
        callType === "video"
          ? {
              video: { width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 30 } },
              audio: { echoCancellation: true, noiseSuppression: true },
            }
          : {
              video: false,
              audio: { echoCancellation: true, noiseSuppression: true },
            };

      await getLocalMedia(constraints);

      socketRef.current.emit("answerCall", {
        callId,
        userId: currentUser,
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
    if (!incomingCall || !socketRef.current || !currentUser) return;
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
    if (!call || !socketRef.current) return;
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
    if (!socketRef.current || (!call && !outgoingCall)) return;

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

  // ----------------------------------------------------------------
  // 6) Provide context value
  // ----------------------------------------------------------------
  const value = useMemo(
    () => ({
      // Connection management
      connectCallSocket,
      disconnectCallSocket,

      // States
      currentUser,
      call,
      incomingCall,
      outgoingCall,
      stream,
      remoteStreams,

      // Actions
      initiateCall,
      answerCall,
      rejectCall,
      addParticipant,
      leaveCall,
    }),
    [
      currentUser,
      call,
      incomingCall,
      outgoingCall,
      stream,
      remoteStreams,
      connectCallSocket,
      disconnectCallSocket,
      initiateCall,
      answerCall,
      rejectCall,
      addParticipant,
      leaveCall,
    ]
  );

  return <CallContext.Provider value={value}>{children}</CallContext.Provider>;
}

export function useCall() {
  return useContext(CallContext);
}
