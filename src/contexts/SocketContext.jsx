// src/context/SocketContext.js
import  { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import useAuthStore from '../store/store'; // Adjust the path as needed

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const user = useAuthStore((state) => state);
  const token = localStorage.getItem('accessToken'); // Assuming JWT is stored here

  useEffect(() => {
    if (token) {
      const newSocket = io(import.meta.env.REACT_APP_SOCKET_URL || 'https://apiv2.humanmaximizer.com', {
        auth: {
          token,
        },
        transports: ['websocket'], // Optional: Specify transports
      });

      setSocket(newSocket);

      newSocket.on('connect', () => {
        console.log('Connected to Socket.io server:', newSocket.id);
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from Socket.io server');
      });

      // Handle connection errors
      newSocket.on('connect_error', (err) => {
        console.error('Connection Error:', err.message);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [token]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
