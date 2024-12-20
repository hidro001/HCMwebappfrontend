// src/components/CreateComment.js
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
} from '@mui/material';
import { toast } from 'react-toastify';
import { createComment, fetchComments } from '../../service/service';
import useEngagementStore from '../../store/engagementStore';

const CreateComment = ({ postId, setComments }) => {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const userPermissions = useEngagementStore((state) => state.permissions);
  const canAddComment = userPermissions.includes('addComment');

  const handleCreateComment = async () => {
    if (!comment.trim()) {
      toast.error('Comment cannot be empty.');
      return;
    }
    setLoading(true);
    try {
      const newComment = await createComment(postId, { comment });
      toast.success('Comment added successfully.');
      setComment('');
      // Fetch updated comments
      const updatedComments = await fetchComments(postId, 1, 10);
      setComments(updatedComments.docs);
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error(error.message || 'Failed to add comment.');
    } finally {
      setLoading(false);
    }
  };

  if (!canAddComment) return null; // Do not render if user lacks permission

  return (
    <Box mt={2}>
      <TextField
        label="Add a comment"
        multiline
        rows={2}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateComment}
        disabled={loading}
        sx={{ mt: 1 }}
      >
        {loading ? 'Posting...' : 'Post Comment'}
      </Button>
    </Box>
  );
};

export default CreateComment;
