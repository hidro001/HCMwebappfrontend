// src/components/modals/CreatePostModal.js
import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from '../../service/axiosInstance';
import { motion } from 'framer-motion';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const CreatePostModal = ({ open, handleClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);

  const handleFileChange = (e) => {
    setMediaFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    mediaFiles.forEach((file) => {
      formData.append('mediaFiles', file);
    });

    try {
      await axiosInstance.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Reset form
      setTitle('');
      setDescription('');
      setMediaFiles([]);
      handleClose();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="create-post-modal"
      aria-describedby="modal-to-create-post"
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Box sx={style}>
          <Box className="flex justify-between items-center mb-4">
            <Typography id="create-post-modal" variant="h6" component="h2">
              Create New Post
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
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
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Post
            </Button>
          </form>
        </Box>
      </motion.div>
    </Modal>
  );
};

export default CreatePostModal;
