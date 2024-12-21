// src/components/engagement/Comments.js
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Avatar,
} from '@mui/material';
import { toast } from 'react-toastify';
import { fetchComments, createComment } from '../../service/service';
import useAuthStore from '../../store/store';
import { motion } from 'framer-motion';

const Comments = ({ postId }) => {
  const { userName, userAvatar, employeeId } = useAuthStore();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadComments();
    // eslint-disable-next-line
  }, []);

  const loadComments = async () => {
    setLoading(true);
    try {
      const data = await fetchComments(postId, 1, 10);
      setComments(data.docs);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch comments.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      toast.error('Comment cannot be empty.');
      return;
    }
    setLoading(true);
    try {
      const commentData = { comment: newComment };
      const createdComment = await createComment(postId, commentData);
      setComments((prev) => [createdComment, ...prev]);
      setNewComment('');
      toast.success('Comment added successfully.');
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error(error.response?.data?.message || 'Failed to add comment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt={2}>
      <Typography variant="subtitle1" gutterBottom>
        Comments:
      </Typography>
      {/* Add Comment */}
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar src={userAvatar} alt={userName} />
        <TextField
          label="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          variant="outlined"
          fullWidth
          size="small"
        />
        <Button variant="contained" color="primary" onClick={handleAddComment} disabled={loading}>
          {loading ? 'Posting...' : 'Post'}
        </Button>
      </Box>

      {/* Comments List */}
      <List>
        {comments.map((comment) => (
          <motion.div
            key={comment._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ListItem alignItems="flex-start">
              <Avatar src={comment.commenter.userAvatar} alt={`${comment.commenter.first_Name} ${comment.commenter.last_Name}`} />
              <ListItemText
                primary={`${comment.commenter.first_Name} ${comment.commenter.last_Name}`}
                secondary={comment.comment}
                sx={{ ml: 2 }}
              />
            </ListItem>
          </motion.div>
        ))}
      </List>
    </Box>
  );
};

export default Comments;
