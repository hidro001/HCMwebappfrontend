import io from 'socket.io-client';
import { toast } from 'react-hot-toast';
import useAuthStore from '../store/store';

let connectedsocket;

const server_url = import.meta.env.VITE_SOCKET_URL;

let socket = null;

export const initSocket = (employeeId , token) => {
  console.log("🔧 SocketService - initSocket called:", { employeeId, hasToken: !!token, server_url });
  
  if (socket && socket.connected) {
    console.log("🔧 SocketService - Returning existing connected socket");
    return socket;
  }

  if (socket) {
    console.log("🔧 SocketService - Disconnecting existing socket");
    socket.disconnect();
    socket = null;
  }
  
  console.log("🔧 SocketService - Creating new socket connection");
  socket = io(server_url, {
    transports: ['websocket', 'polling'],
    reconnectionAttempts: 5,
    timeout: 10000,
    auth: {
      token: token,
    },
    query: { userId: employeeId }
  });

  socket.on('connect_error', (err) => {
    console.log("🔧 SocketService - Connection error:", err);
    toast.error('Unable to connect to chat server.');
  });

  socket.on('disconnect', (reason) => {
    if (reason === 'io server disconnect') {
      socket.connect();
    }
  });

  connectedsocket = socket

  return socket;

};



export const getsocket = () => connectedsocket;

export const joinRoom = (socket, sender, receiver) => {
  if (socket) {
    socket.emit('joinRoom', { sender, receiver });
  }
};

export const sendPrivateMessage = (socket, msgData) => {
  if (socket) {
    socket.emit('privateMessage', msgData);
  }
};

export const sendFileMessage = (socket, fileData) => {
  if (socket) {
    socket.emit('sendFile', fileData);
  }
};

export const subscribeToMessages = (
  socket,
  selectedUserIdRef,
  employeeIdRef,
  setMessages,
  updateUnread
) => {
  if (!socket) return;

  socket.on('receiveMessage', (data) => {
    const isRelevant =
      (data.sender === selectedUserIdRef.current &&
        data.receiver === employeeIdRef.current) ||
      (data.sender === employeeIdRef.current &&
        data.receiver === selectedUserIdRef.current);

    if (isRelevant) {
      if (data.type === 'file' && data.sender === employeeIdRef.current) {
        setMessages((prev) =>
          prev.map((msg) => {
            if (
              msg.type === 'file' &&
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
        const newMsg = {
          sender: data.sender,
          type: data.type || 'text',
          message: data.message || '',
          fileUrl: data.fileUrl || '',
          fileName: data.fileName || '',
          fileType: data.fileType || '',
          time: new Date(data.time).toLocaleTimeString(),
        };
        setMessages((prev) => {
          const alreadyExists = prev.some(
            (msg) =>
              msg.sender === newMsg.sender &&
              msg.type === newMsg.type &&
              msg.message === newMsg.message &&
              msg.fileName === newMsg.fileName &&
              msg.time === newMsg.time
          );
          if (alreadyExists) return prev;
          return [...prev, newMsg];
        });
      }
    } else {
      if (data.receiver === employeeIdRef.current && updateUnread) {
        updateUnread(data.sender);
      }
    }
  });

  socket.on('error', (data) => {
    toast.error(data.message);
  });
};


export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    connectedsocket = null;
  }
};

