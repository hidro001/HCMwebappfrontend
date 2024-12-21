// src/components/PostCreateBox.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Box, TextField, Button, Typography } from '@mui/material';
import  createPost  from "../../utils/socket";
// import socket from "../services/socket"; // To emit real-time events if necessary

const PostCreateBox = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setMediaFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    mediaFiles.forEach((file) => {
      formData.append('mediaFiles', file);
    });

    try {
      await createPost(formData);
      // Reset form
      setTitle('');
      setDescription('');
      setMediaFiles([]);
      // Optionally, emit a socket event or rely on real-time updates
      // socket.emit('createPost', newPostData);
    } catch (err) {
      console.error('Error creating post:', err);
      setError(err.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 mb-6 transition-colors duration-300"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          required
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          accept="image/*,video/*"
          multiple
          type="file"
          onChange={handleFileChange}
        />
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? 'Posting...' : 'Post'}
        </Button>
      </form>
    </motion.div>
  );
};

export default PostCreateBox;
