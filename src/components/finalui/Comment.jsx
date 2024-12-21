// src/components/Comment.js
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Badge,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { likeComment, deleteComment, fetchComments } from "../../service/postService";
import useAuthStore from '../../store/store';
import { motion } from 'framer-motion';
import useEngagementStore from '../../store/engagementStore'; // Assuming similar to useAuthStore

const Comment = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((state) => state);
  const permissions = useEngagementStore((state) => state.permissions);
  const userId = user._id || user.employeeId; // Ensure user ID is correctly retrieved

  useEffect(() => {
    const getComments = async () => {
      try {
        const data = await fetchComments(postId);
        setComments(data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setLoading(false);
      }
    };

    getComments();

    // Optionally, listen for real-time comment events

  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      await likeComment(commentId);
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                reactions: comment.reactions?.includes(userId)
                  ? comment.reactions.filter((r) => r.user !== userId)
                  : [...(comment.reactions || []), { user: userId, type: 'like' }],
              }
            : comment
        )
      );
    } catch (error) {
      console.error('Error liking comment:', error);
      // Optionally, handle error
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments((prevComments) => prevComments.filter((c) => c._id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
      // Optionally, handle error
    }
  };

  if (loading) {
    return <Typography>Loading comments...</Typography>;
  }

  return (
    <Box className="space-y-2">
      {comments.map((comment) => {
        const isLiked = comment.reactions?.some((r) => r.user === userId) || false;
        const likeCount = comment.reactions?.length || 0;
        return (
          <motion.div
            key={comment._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box className="flex items-start space-x-2">
              <Avatar src={comment.commenter?.userAvatar} alt={comment.commenter?.userName} />
              <Box className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex-1">
                <Typography variant="subtitle2">{comment.commenter?.userName || 'Anonymous'}</Typography>
                <Typography variant="body2">{comment.comment}</Typography>
                {comment.attachments && comment.attachments.length > 0 && (
                  <div className="mt-2">
                    {comment.attachments.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`attachment-${index}`}
                        className="w-20 h-auto rounded-md mr-2"
                      />
                    ))}
                  </div>
                )}
                <Box className="flex items-center mt-1">
                  <IconButton
                    size="small"
                    onClick={() => handleLike(comment._id)}
                  >
                    <Badge badgeContent={likeCount} color="secondary">
                      <FavoriteIcon color={isLiked ? 'error' : 'inherit'} fontSize="small" />
                    </Badge>
                  </IconButton>
                  {(permissions.includes('deleteAnyComment') || userId === comment.commenter?._id) && (
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(comment._id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              </Box>
            </Box>
          </motion.div>
        );
      })}
    </Box>
  );
};

export default Comment;
