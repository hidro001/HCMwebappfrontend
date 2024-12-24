// src/utils/socket.js
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_BASE_URL, {
  auth: {
    token: localStorage.getItem('accessToken'), // Pass token if authentication is required
  },
});

socket.on('connect', () => {
  console.log('Connected to Socket.io server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from Socket.io server');
});

export default socket;
