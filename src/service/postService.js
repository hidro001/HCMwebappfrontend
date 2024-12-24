// src/services/postService.js
import axiosInstance from './axiosInstance';

// Fetch all posts
export const fetchPosts = async () => {
  const response = await axiosInstance.get('/posts');
  return response.data.docs; // Assuming the API returns { docs: [...] }
};

// Like a post
export const likePost = async (postId) => {
  await axiosInstance.post(`/posts/${postId}/like`);
};

// Delete a post
export const deletePost = async (postId) => {
  await axiosInstance.delete(`/posts/${postId}`);
};

// Create a new post
export const createPost = async (formData) => {
  await axiosInstance.post('/posts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};


// Fetch comments for a post
export const fetchComments = async (postId) => {
  const response = await axiosInstance.get(`/comments/${postId}`);
  return response.data.docs; // Assuming the API returns { docs: [...] }
};

// Like a comment
export const likeComment = async (commentId) => {
  await axiosInstance.post(`/comments/${commentId}/like`);
};

// Delete a comment
export const deleteComment = async (commentId) => {
  await axiosInstance.delete(`/comments/${commentId}`);
};

// Create a new comment
export const createComment = async (postId, formData) => {
  await axiosInstance.post(`/comments/${postId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
