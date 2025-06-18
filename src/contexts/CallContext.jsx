import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import io from "socket.io-client";
import { Device } from "mediasoup-client";

const CallContext = createContext();

export function CallProvider({ children, currentUserId }) {
  const socket = useRef();
  const device = useRef();
  const sendTransport = useRef();
  const screenProducer = useRef(null); // <—
  const screenStream = useRef(null); // <—
  const roomIdRef = useRef(null);
  const recvTransports = useRef(new Map());
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [incomingCall, setIncomingCall] = useState(null);
  const [call, setCall] = useState(null);
  const [screenShareActive, setScreenShareActive] = useState(false); // ← NEW

  const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_URL;

  // --------------------------------------------------
  //  SCREEN‑SHARING HELPERS
  // --------------------------------------------------
  const startScreenShare = async () => {
    if (screenProducer.current || !sendTransport.current) return;

    try {
      /* 1️⃣ Get the screen as a MediaStream */
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      screenStream.current = stream;

      /* 2️⃣ Produce its first (and only) video track */
      const track = stream.getVideoTracks()[0];
      screenProducer.current = await sendTransport.current.produce({ track });
      setScreenShareActive(true);

      /* 3️⃣ If the user clicks “Stop sharing…” in the browser UI */
      track.onended = stopScreenShare;
    } catch (err) {
      console.error("[screen] start failed:", err);
    }
  };

  const stopScreenShare = () => {
    if (!screenProducer.current) return;

    try {
      screenProducer.current.close();
    } catch (_) {}
    screenProducer.current = null;
    setScreenShareActive(false);

    screenStream.current?.getTracks().forEach((t) => t.stop());
    screenStream.current = null;
  };

  const cleanUpMedia = () => {
    /* 1️⃣ Stop every local track */
    localStream?.getTracks().forEach((t) => t.stop());

    /* 2️⃣ Close the send transport */
    if (sendTransport.current) {
      try {
        sendTransport.current.close();
      } catch (_) {}
      sendTransport.current = null;
    }

    /* 3️⃣ Close every recv transport */
    recvTransports.current.forEach((t) => {
      try {
        t.close();
      } catch (_) {}
    });
    recvTransports.current.clear();

    /* 4️⃣ Dispose the Mediasoup Device */
    device.current = null;

    /* 5️⃣ Flush React state */
    setLocalStream(null);
    setRemoteStreams([]);
    setCall(null);

    setIncomingCall(null);
    stopScreenShare();
  };

  useEffect(() => {
    socket.current = io(SOCKET_SERVER_URL, {
      query: { userId: currentUserId },
    });

    socket.current.on("incomingCall", setIncomingCall);

    socket.current.on("new-producer", ({ producerId, userId }) => {
      createRecvTransport(producerId, userId);
    });

    socket.current.on("endCall", cleanUpMedia);

    return () => {
      socket.current.disconnect();
      cleanUpMedia();
    };
  }, [currentUserId]);

  const getLocalStream = async () => {
    if (localStream) return localStream;
    const s = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setLocalStream(s);
    return s;
  };

  // CallProvider.jsx

  const addParticipant = (participantId) => {
    if (!call) return; // nothing to do if we are not in a call

    /* 1️⃣  Tell the signalling server to invite the new user */
    socket.current.emit("addParticipant", {
      callId: call.roomId,
      inviter: currentUserId,
      newParticipant: participantId,
    });

    /* 2️⃣  Optimistically update our local UI state */
    setCall((prev) => ({
      ...prev,
      participants: [
        ...new Set([...(prev?.participants || []), participantId]),
      ],
    }));
  };

  const joinRoom = (roomId) =>
    new Promise((res, rej) => {
      socket.current.emit(
        "join-call-room",
        { roomId },
        async ({ rtpCapabilities }) => {
          try {
            const d = new Device();
            console.log("[join] creating device");
            await d.load({ routerRtpCapabilities: rtpCapabilities });
            console.log("[join] device loaded");
            device.current = d;
            console.log("[join] device loaded", device.current);

            socket.current.emit("get-producers", { roomId }, (list) => {
              list.forEach((p) => createRecvTransport(p.producerId, p.userId));
            });
            res();
          } catch (err) {
            rej(err);
          }
        }
      );
    });

  const createSendTransport = async () => {
    const roomId = roomIdRef.current;
    if (!roomId || !device.current) return;

    const stream = await getLocalStream();

    socket.current.emit(
      "create-transport",
      { roomId, direction: "send" },
      async (params) => {
        const transport = device.current.createSendTransport({
          id: params.id,
          iceParameters: params.iceParameters,
          iceCandidates: params.iceCandidates,
          dtlsParameters: params.dtlsParameters,
          iceServers: params.iceServers,
        });
        sendTransport.current = transport;

        transport.on("connect", ({ dtlsParameters }, cb, eb) => {
          socket.current.emit(
            "connect-transport",
            { roomId, transportId: transport.id, dtlsParameters },
            (res) => {
              if (res.error) {
                console.error("[send] connect errored", res.error);
                eb(res.error);
              } else {
                console.log("[send] DTLS connected");
                cb();
              }
            }
          );
        });

        transport.on("produce", ({ kind, rtpParameters }, cb, eb) => {
          console.log("[send] PRODUCE", kind);
          socket.current.emit(
            "produce",
            { roomId, transportId: transport.id, kind, rtpParameters },
            (res) => {
              if (res.error) {
                console.error("[send] produce errored", res.error);
                eb(res.error);
              } else {
                console.log("[send] produced id", res.producerId);
                cb({ id: res.producerId });
              }
            }
          );
        });

        for (const track of stream.getTracks()) {
          console.log("[send] calling transport.produce for", track.kind);
          await transport.produce({ track });
        }
      }
    );
  };

  const createRecvTransport = (producerId, userId) => {
    const roomId = roomIdRef.current;
    console.log(
      "[recv] creating transport for",
      producerId,
      userId,
      "in room",
      roomId
    );

    if (!roomId || !device.current || recvTransports.current.has(producerId)) {
      console.warn(
        "[recv] skipping recv-transport; already have one or missing room/device"
      );
      return;
    }

    // 1) Ask server to create a recv transport
    socket.current.emit(
      "create-transport",
      { roomId, direction: "recv" },
      async (params) => {
        // 2) Create the recv Transport
        const transport = device.current.createRecvTransport({
          id: params.id,
          iceParameters: params.iceParameters,
          iceCandidates: params.iceCandidates,
          dtlsParameters: params.dtlsParameters,
          iceServers: params.iceServers,
        });
        recvTransports.current.set(producerId, transport);
        console.log(`[recv ${producerId}] transport created`, transport.id);

        // 3) Handle the DTLS connect event
        transport.on("connect", ({ dtlsParameters }, callback, errback) => {
          console.log(`[recv ${producerId}] DTLS connect`, dtlsParameters);
          socket.current.emit(
            "connect-transport",
            { roomId, transportId: transport.id, dtlsParameters },
            (res) => {
              if (res.error) {
                console.error(
                  `[recv ${producerId}] dtls connect error`,
                  res.error
                );
                return errback(res.error);
              }
              console.log(`[recv ${producerId}] DTLS connected`);
              callback();
            }
          );
        });

        // 4) Ask server to consume the producer
        console.log(`[recv ${producerId}] sending consume request`);
        socket.current.emit(
          "consume",
          {
            roomId,
            transportId: transport.id,
            producerId,
            rtpCapabilities: device.current.rtpCapabilities,
          },
          async (data) => {
            if (data.error) {
              console.error(`[recv ${producerId}] consume error`, data.error);
              return;
            }
            console.log(`[recv ${producerId}] consume response`, data);

            try {
              // 5) Actually create the consumer (this will trigger 'connect')
              const consumer = await transport.consume({
                id: data.consumerId,
                producerId: data.producerId,
                kind: data.kind,
                rtpParameters: data.rtpParameters,
              });
              console.log(`[recv ${producerId}] consumer created`, consumer.id);

              // 6) Tell server to resume sending us RTP
              socket.current.emit(
                "resume",
                { roomId, consumerId: data.consumerId },
                (res) => {
                  if (res.error) {
                    console.error(
                      `[recv ${producerId}] resume error`,
                      res.error
                    );
                  } else {
                    console.log(`[recv ${producerId}] resume OK`);
                  }
                }
              );

              setRemoteStreams((old) => [
                ...old,
                {
                  consumerId: consumer.id,
                  kind: data.kind,
                  stream: new MediaStream([consumer.track]),
                },
              ]);
              console.log(`[recv ${producerId}] added remote stream`);
            } catch (err) {
              console.error(`[recv ${producerId}] consume failed`, err);
              socket.current.emit("consume-error", {
                roomId,
                producerId,
                error: err.message,
              });
            }
          }
        );
      }
    );
  };
  console.log("remoteStreams", remoteStreams);

  // 5) high-level call controls
  // somewhere in your CallProvider:

  // const initiateCall = async ({ callType, participants }) => {
  //   const roomId = `room-${Date.now()}`;
  //   roomIdRef.current = roomId;
  //   socket.current.emit("initiate-call", { roomId, callType, participants });
  //   await joinRoom(roomId);
  //   await createSendTransport();
  //   setCall({ roomId, callType, participants });
  // };

  const initiateCall = async ({ callType, participants }) => {
    /* 1️⃣ Build a unique call / room id */
    const callId = `room-${Date.now()}`;
    roomIdRef.current = callId;

    /* 2️⃣ Remove the caller if it was accidentally included */
    const sanitizedParticipants = participants.filter(
      (id) => id !== currentUserId
    );

    /* 3️⃣ Notify the server – must match server‑side listener */
    socket.current.emit("initiateCall", {
      callId, // ← the id the server stores and forwards
      caller: currentUserId, // ← so the callee knows who is ringing
      callType, // 'audio' | 'video'
      participants: sanitizedParticipants,
    });

    /* 4️⃣ Locally join the mediasoup room and start publishing */
    await joinRoom(callId);
    await createSendTransport();

    /* 5️⃣ Reflect the call in UI state */
    setCall({ roomId: callId, callType, participants: sanitizedParticipants });
  };

  const answerCall = async () => {
    if (!incomingCall) return;

    const { callId } = incomingCall;
    roomIdRef.current = callId;

    socket.current.emit("answerCall", {
      callId,
      userId: currentUserId,
    });

    await joinRoom(callId);
    await createSendTransport();
    setCall(incomingCall);
    setIncomingCall(null);
  };

  // CallProvider.jsx  (add inside the component, above the return)

  const rejectCall = () => {
    if (!incomingCall) return;

    socket.current.emit("rejectCall", {
      callId: incomingCall.callId,
      userId: currentUserId,
    });
    setIncomingCall(null);
  };

  const leaveCall = () => {
    if (!call) return;

    /* Logical call shutdown (summaries, timers, etc.) */
    socket.current.emit("leaveCall", {
      callId: call.roomId,
      userId: currentUserId,
    });

    /* Mediasoup clean‑up */
    socket.current.emit("leave-call", { roomId: call.roomId });

    cleanUpMedia();
  };

  return (
    <CallContext.Provider
      value={{
        localStream,
        remoteStreams,
        incomingCall,
        call,
        initiateCall,
        answerCall,
        leaveCall,
        addParticipant,
        startScreenShare,
        stopScreenShare,
        isScreenSharing: screenShareActive,
      }}
    >
      {children}
    </CallContext.Provider>
  );
}

export const useCall = () => useContext(CallContext);
