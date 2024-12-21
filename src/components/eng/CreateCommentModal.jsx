// src/components/modals/CreateCommentModal.js
import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from '../../service/axiosInstance';
import { motion } from 'framer-motion';
import useNotificationStore  from '../../store/notificationStore';

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
  borderRadius: '8px',
};

const CreateCommentModal = ({ open, handleClose, postId }) => {
  const [comment, setComment] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addNotification = useNotificationStore((state) => state.addNotification);

  const handleFileChange = (e) => {
    setAttachments([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('comment', comment);
    attachments.forEach((file) => {
      formData.append('attachments', file);
    });

    try {
      await axiosInstance.post(`/comments/${postId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Optionally, you can fetch the updated comments or rely on real-time updates
      setComment('');
      setAttachments([]);
      handleClose();
      addNotification({
        message: 'Comment added successfully!',
        receivedAt: new Date(),
        isRead: false,
      });
    } catch (err) {
      console.error('Error creating comment:', err);
      setError(err.response?.data?.message || 'Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="create-comment-modal"
      aria-describedby="modal-to-create-comment"
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Box sx={style}>
          <Box className="flex justify-between items-center mb-4">
            <Typography id="create-comment-modal" variant="h6" component="h2">
              Add a Comment
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          {error && (
            <Typography variant="body2" color="error" className="mb-2">
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label="Your Comment"
              variant="outlined"
              fullWidth
              required
              multiline
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <input
              accept="image/*,video/*,application/pdf"
              multiple
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="attachments-upload"
            />
            <label htmlFor="attachments-upload">
              <Button variant="contained" component="span">
                Upload Attachments
              </Button>
              {attachments.length > 0 && (
                <Typography variant="body2" className="ml-2 inline-block">
                  {attachments.length} file(s) selected
                </Typography>
              )}
            </label>
            <Box className="flex justify-end space-x-2">
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                startIcon={loading && <CircularProgress size={20} />}
              >
                {loading ? 'Posting...' : 'Post Comment'}
              </Button>
            </Box>
          </form>
        </Box>
      </motion.div>
    </Modal>
  );
};

export default CreateCommentModal;
