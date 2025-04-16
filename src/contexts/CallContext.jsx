

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
  // ----------------------------
  // 1) Current user ID
  // ----------------------------
  const [currentUser, setCurrentUser] = useState(null);

  // ----------------------------
  // 2) Call states
  // ----------------------------
  const [call, setCall] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const [outgoingCall, setOutgoingCall] = useState(null);

  // ----------------------------
  // 3) Local camera/mic stream
  // ----------------------------
  const [stream, setStream] = useState(null);

  /**
   * Store remote streams as an array:
   *   [
   *     { userId, stream, type: "camera" | "screen" },
   *     ...
   *   ]
   */
  const [remoteStreams, setRemoteStreams] = useState([]);

  // ----------------------------
  // 4) Refs
  // ----------------------------
  const localStreamRef = useRef(null);
  const peersRef = useRef({});
  const socketRef = useRef();

  // ----------------------------
  // On mount, load currentUser from storage
  // ----------------------------
  useEffect(() => {
    const storedEmployeeId = localStorage.getItem("employeeId");
    if (storedEmployeeId) {
      setCurrentUser(storedEmployeeId);
    } else {
      // Optional fallback
      setCurrentUser("EMP0001");
    }
  }, []);

  // ----------------------------
  // Once we have currentUser, connect to Socket.io
  // ----------------------------
  useEffect(() => {
    if (!currentUser) return; // don't connect until we have an ID

    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { userId: currentUser },
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
      timeout: 10000,
    });

    // Attach event listeners
    socketRef.current.on("incomingCall", handleIncomingCall);
    socketRef.current.on("participantJoined", handleParticipantJoined);
    socketRef.current.on("participantLeft", handleParticipantLeft);
    socketRef.current.on("callRejected", handleCallRejected);
    socketRef.current.on("endCall", handleEndCall);

    // WebRTC signaling events
    socketRef.current.on("offer", handleOffer);
    socketRef.current.on("answer", handleAnswer);
    socketRef.current.on("candidate", handleCandidate);

    return () => {
      socketRef.current.disconnect();
    };
  }, [currentUser]);

  // ----------------------------
  // Event Handlers
  // ----------------------------
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
    // Remove all streams from that user
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

  // ----------------------------
  // WebRTC Signaling Handlers
  // ----------------------------
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

  // ----------------------------
  // Create PeerConnection
  // ----------------------------
  const createPeerConnection = async (callId, remoteUserId) => {
    console.log("Creating PeerConnection for:", remoteUserId);
    const peer = new RTCPeerConnection({ iceServers: ICE_SERVERS });

    // If we have local camera/mic stream, add them
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => {
        peer.addTrack(track, localStreamRef.current);
      });
    }

    // ICE candidate => emit to server
    peer.onicecandidate = (evt) => {
      if (evt.candidate) {
        socketRef.current.emit("candidate", {
          callId,
          userId: currentUser,
          candidate: evt.candidate,
        });
      }
    };

    // Negotiation
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

    // Optional: track ICE state changes
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

    // ontrack: handle multiple streams (camera + screen)
    peer.ontrack = (event) => {
      const [remoteStream] = event.streams;
      const track = event.track;
      console.log(
        "Received remote track from:",
        remoteUserId,
        "label:",
        track.label
      );

      // Distinguish "camera" vs "screen"
      let trackType = "camera";
      const label = track.label.toLowerCase();
      if (
        label.includes("screen") ||
        label.includes("display") ||
        label.includes("window")
      ) {
        trackType = "screen";
      }

      // Update or add the remote stream in state
      setRemoteStreams((prev) => {
        // See if we already have an entry for (remoteUserId, trackType)
        const existingIndex = prev.findIndex(
          (item) => item.userId === remoteUserId && item.type === trackType
        );
        if (existingIndex >= 0) {
          // Update existing
          const updated = [...prev];
          updated[existingIndex] = {
            userId: remoteUserId,
            stream: remoteStream,
            type: trackType,
          };
          return updated;
        } else {
          // Add new entry
          return [
            ...prev,
            { userId: remoteUserId, stream: remoteStream, type: trackType },
          ];
        }
      });
    };

    peersRef.current[remoteUserId] = { peer };
    return peersRef.current[remoteUserId];
  };

  // ----------------------------
  // Get Local Camera/Mic
  // ----------------------------
  const getLocalMedia = async (constraints) => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      localStreamRef.current = mediaStream;
    } catch (err) {
      console.error("Error accessing media devices:", err);
      throw err;
    }
  };

  // ----------------------------
  // Initiate Call
  // ----------------------------
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

      // Acquire local camera/mic
      await getLocalMedia(constraints);

      // Notify server
      socketRef.current.emit("initiateCall", {
        caller: currentUser,
        callType,
        participants,
        callId,
      });

      // Update call state
      setCall({
        callId,
        callType,
        participants: [currentUser, ...participants],
      });

      // Create PeerConnections & send offers
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

  // ----------------------------
  // Answer Call
  // ----------------------------
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

      // Notify server
      socketRef.current.emit("answerCall", {
        callId,
        userId: currentUser,
      });

      // Update state
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

  // ----------------------------
  // Reject Call
  // ----------------------------
  const rejectCall = () => {
    if (!incomingCall) return;
    socketRef.current.emit("rejectCall", {
      callId: incomingCall.callId,
      userId: currentUser,
    });
    setIncomingCall(null);
  };

  // ----------------------------
  // Add Participant
  // ----------------------------
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

  // ----------------------------
  // Leave / Cancel Call
  // ----------------------------
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

  // ----------------------------
  // Cleanup Call
  // ----------------------------
  const cleanupCall = () => {
    // Close all peer connections
    Object.values(peersRef.current).forEach(({ peer }) => peer.close());
    peersRef.current = {};

    // Stop local tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }

    // Reset states
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
        // now an array: [ { userId, stream, type: "camera"|"screen" }, ... ]
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
