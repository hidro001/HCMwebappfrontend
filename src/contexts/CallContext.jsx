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
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const screenShareProducer = useRef(null);
  const sendTransport = useRef();
  const roomIdRef = useRef(null);
  const recvTransports = useRef(new Map());
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [incomingCall, setIncomingCall] = useState(null);
  const [call, setCall] = useState(null);
  const outgoingCall = useRef(null); // 🔹 NEW

  const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_URL;

  useEffect(() => {
    socket.current = io(SOCKET_SERVER_URL, {
      query: { userId: currentUserId },
    });

    socket.current.on("incomingCall", setIncomingCall);

    socket.current.on("new-producer", ({ producerId, userId }) => {
      createRecvTransport(producerId, userId);
    });

    socket.current.on("call-ended", () => {
      localStream?.getTracks().forEach((t) => t.stop());
      setLocalStream(null);
      setRemoteStreams([]);
      setCall(null);
    });

    return () => socket.current.disconnect();
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

  const startScreenShare = async () => {
    if (isScreenSharing || !sendTransport.current) return;

    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });

      const track = displayStream.getVideoTracks()[0];

      // Make sure the user can stop sharing via browser UI
      track.addEventListener("ended", () => stopScreenShare());

      console.log("[share] producing screen track");
      screenShareProducer.current = await sendTransport.current.produce({
        track,
      });

      setIsScreenSharing(true);
    } catch (err) {
      console.error("[share] start failed:", err);
    }
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

  const stopScreenShare = () => {
    if (!isScreenSharing) return;

    try {
      screenShareProducer.current?.close();
      screenShareProducer.current = null;
      setIsScreenSharing(false);
      console.log("[share] stopped");
    } catch (err) {
      console.error("[share] stop failed:", err);
    }
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
                  userId,
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
  const addParticipant = (id) => {
    if (!call) return;
    socket.current.emit("addParticipant", {
      callId: call.roomId,
      newParticipant: id,
    });
  };

  const initiateCall = async ({ callType, participants }) => {
    const callId = `room-${Date.now()}`;
    roomIdRef.current = callId;

    /* 1️⃣ store a transient “dialling” state for the ring‑back UI */
    outgoingCall.current = { callId, callType, participants };

    /* 2️⃣ never send your own id inside participants */
    const others = participants.filter((id) => id !== currentUserId);

    /* 3️⃣ signal the server – must be EXACTLY what server listens for */
    socket.current.emit("initiateCall", {
      callId,
      caller: currentUserId,
      callType, // 'voice' | 'video'
      participants: others,
    });

    /* 4️⃣ start the media plane */
    await joinRoom(callId);
    await createSendTransport();

    /* 5️⃣ show in‑call UI, clear “dialling” flag */
    setCall({
      roomId: callId,
      callType,
      participants: [currentUserId, ...others],
    });
    outgoingCall.current = null;
  };

  const answerCall = async () => {
    if (!incomingCall) return;
    const { roomId } = incomingCall;
    roomIdRef.current = roomId;
    socket.current.emit("answerCall", {
      callId: roomId,
      userId: currentUserId,
    });
    await joinRoom(roomId);
    await createSendTransport();
    setCall(incomingCall);
    setIncomingCall(null);
  };

  // NEW: allow rejecting an incoming call
  const rejectCall = () => {
    if (!incomingCall) return;
    const { roomId } = incomingCall;

    socket.current.emit("rejectCall", {
      callId: roomId,
      userId: currentUserId,
    });
    setIncomingCall(null);
  };

  const leaveCall = () => {
    if (!call) return;
    socket.current.emit("leaveCall", {
      callId: call.roomId,
      userId: currentUserId,
    });
    socket.current.emit("leave-call", { roomId: call.roomId }); // mediasoup cleanup
    setCall(null);
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
        startScreenShare,
        stopScreenShare,
        isScreenSharing,
        addParticipant,
      }}
    >
      {children}
    </CallContext.Provider>
  );
}

export const useCall = () => useContext(CallContext);
