// src/context/SocketContext.js
import  { createContext, useContext, useEffect, useState } from 'react';
import useAuthStore from '../store/store'; // Adjust the path as needed
import { getsocket } from '../service/socketService';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const user = useAuthStore((state) => state);

  useEffect(() => {
    if (token) {
      const newSocket = getsocket();
      console.log(`Socket instance: ${newSocket}`);

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
    <SocketContext.Provider value={{ socket, user }}>
      {children}
    </SocketContext.Provider>
  );
};
