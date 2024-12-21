// src/components/feed/Feed.js
import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import Post from './Post';
import axiosInstance from '../../service/axiosInstance';
import useAuthStore from '../../store/store';
import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_BASE_URL); // Ensure CORS is configured on the backend

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    fetchPosts();

    // Listen for real-time events
    socket.on('newPost', (post) => {
      setPosts((prevPosts) => [post, ...prevPosts]);
    });

    socket.on('updatePost', (updatedPost) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === updatedPost._id ? updatedPost : post))
      );
    });

    socket.on('deletePost', ({ postId }) => {
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    });

    return () => {
      socket.off('newPost');
      socket.off('updatePost');
      socket.off('deletePost');
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axiosInstance.get('/posts');
      setPosts(response.data.docs); // Assuming pagination structure
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-full">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="flex flex-col space-y-4 p-4">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </Box>
  );
};

export default Feed;
