// src/services/socket.js
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import useEngagementStore from '../store/engagementStore';

const socket = io(import.meta.env.VITE_API_BASE_URL, {
  auth: {
    token: localStorage.getItem('accessToken'),
  },
});

// Handle connection errors
socket.on('connect_error', (err) => {
  console.error('Socket connection error:', err.message);
  toast.error('Real-time updates are unavailable.');
});

// Listen for real-time events
socket.on('newPost', (post) => {
  // Optionally, update the EngageFeed component
  toast.info('A new post has been added.');
  // Implement state update or refetch as needed
});

socket.on('newComment', (comment) => {
  // Optionally, update the EngageFeed component
  toast.info('A new comment has been added.');
  // Implement state update or refetch as needed
});

// Export the socket instance
export default socket;
