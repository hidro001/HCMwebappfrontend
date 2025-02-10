import io from "socket.io-client";
import { toast } from "react-hot-toast";

let socket;

export const initSocket = (serverUrl, employeeId) => {
  socket = io(serverUrl, {
    transports: ["websocket", "polling"],
    reconnectionAttempts: 5,
    timeout: 10000,
  });

  socket.on("connect", () => {
    if (employeeId) {
      socket.emit("joinRoom", {
        sender: employeeId,
        receiver: employeeId,
      });
    }
  });

  socket.on("connect_error", (err) => {
    console.error("Connection Error:", err);
    toast.error("Unable to connect to chat server.");
  });

  socket.on("disconnect", (reason) => {
    if (reason === "io server disconnect") {
      socket.connect();
    }
  });

  return socket;
};

export const joinRoom = (socket, sender, receiver) => {
  if (socket) {
    socket.emit("joinRoom", { sender, receiver });
  }
};

export const sendPrivateMessage = (socket, msgData) => {
  if (socket) {
    socket.emit("privateMessage", msgData);
  }
};

export const sendFileMessage = (socket, fileData) => {
  if (socket) {
    socket.emit("sendFile", fileData);
  }
};

export const subscribeToMessages = (socket, selectedUserIdRef, employeeIdRef, setMessages) => {
  if (!socket) return;
  
  socket.on("receiveMessage", (data) => {
    const isRelevant =
      (data.sender === selectedUserIdRef.current &&
        data.receiver === employeeIdRef.current) ||
      (data.sender === employeeIdRef.current &&
        data.receiver === selectedUserIdRef.current);
    if (!isRelevant) return;

    // For file messages from the current user, update the “uploading” message
    if (data.type === "file" && data.sender === employeeIdRef.current) {
      setMessages((prev) =>
        prev.map((msg) => {
          if (
            msg.type === "file" &&
            msg.fileName === data.fileName &&
            msg.uploading &&
            msg.sender === data.sender
          ) {
            return {
              ...msg,
              fileUrl: data.fileUrl,
              uploading: false,
              time: new Date(data.time).toLocaleTimeString(),
            };
          }
          return msg;
        })
      );
    } else {
      // Normal text message or file from the other user
      setMessages((prev) => [
        ...prev,
        {
          sender: data.sender,
          type: data.type || "text",
          message: data.message || "",
          fileUrl: data.fileUrl || "",
          fileName: data.fileName || "",
          fileType: data.fileType || "",
          time: new Date(data.time).toLocaleTimeString(),
        },
      ]);
    }
  });

  socket.on("error", (data) => {
    console.error("Server Error:", data.message);
    toast.error(data.message);
  });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};
