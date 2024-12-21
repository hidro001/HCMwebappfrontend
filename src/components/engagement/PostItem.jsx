// src/components/engagement/PostItem.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Paper,
  Grid,
} from '@mui/material';
import { Edit, Delete, Favorite, FavoriteBorder, ChatBubbleOutline } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { editPost, deletePost, addReaction, removeReaction } from '../../service/service';
import useEngagementStore from '../../store/engagementStore';
import Reactions from './Reactions';
import Comments from './Comments';
import Kudos from './Kudos';
import Poll from './Polls';
import { motion } from 'framer-motion';

const PostItem = ({ post }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.description);
  const [loading, setLoading] = useState(false);
  const userPermissions = useEngagementStore((state) => state.permissions);

  const canEditPost = userPermissions.includes('editPost') || userPermissions.includes('moderatePost');
  const canDeletePost = userPermissions.includes('deletePost') || userPermissions.includes('moderatePost');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditedContent(post.description);
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    if (!editedContent.trim()) {
      toast.error('Description cannot be empty.');
      return;
    }
    setLoading(true);
    try {
      const updatedPost = await editPost(post._id, { description: editedContent });
      toast.success('Post updated successfully.');
      setIsEditing(false);
      // The updated post will be handled via Socket.io
    } catch (error) {
      console.error('Error editing post:', error);
      toast.error(error.response?.data?.message || 'Failed to edit post.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    setLoading(true);
    try {
      await deletePost(post._id);
      toast.success('Post deleted successfully.');
      // The deleted post will be handled via Socket.io
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error(error.response?.data?.message || 'Failed to delete post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Box display="flex" alignItems="center">
          <Avatar src={post.author.userAvatar} alt={post.author.userName} />
          <Box ml={2}>
            <Typography variant="subtitle1">{post.author.userName}</Typography>
            <Typography variant="caption">{new Date(post.createdAt).toLocaleString()}</Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          {(canEditPost || canDeletePost) && (
            <Box>
              {canEditPost && (
                <IconButton aria-label="edit" onClick={handleEdit}>
                  <Edit />
                </IconButton>
              )}
              {canDeletePost && (
                <IconButton aria-label="delete" onClick={handleDelete}>
                  <Delete />
                </IconButton>
              )}
            </Box>
          )}
        </Box>

        {/* Post Content */}
        <Box mt={2}>
          {isEditing ? (
            <>
              <TextField
                multiline
                rows={3}
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                variant="outlined"
                fullWidth
              />
              <Box mt={1} display="flex" gap={1}>
                <Button variant="contained" color="primary" onClick={handleSaveEdit} disabled={loading}>
                  Save
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              </Box>
            </>
          ) : (
            <Typography variant="body1">{post.description}</Typography>
          )}
        </Box>

        {/* Media */}
        {post.media && post.media.length > 0 && (
          <Box mt={2}>
            <Grid container spacing={2}>
              {post.media.map((mediaItem, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  {mediaItem.type.startsWith('image') ? (
                    <img src={mediaItem.url} alt={`media-${index}`} width="100%" style={{ borderRadius: '8px' }} />
                  ) : (
                    <video src={mediaItem.url} width="100%" controls style={{ borderRadius: '8px' }} />
                  )}
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Poll */}
        {post.isPoll && post.poll && (
          <Box mt={2}>
            <Poll poll={post.poll} />
          </Box>
        )}

        {/* Reactions, Kudos, Comments */}
        <Box mt={2}>
          <Reactions targetType="Post" targetId={post._id} />
          <Kudos targetType="Post" targetId={post._id} />
          <Comments postId={post._id} />
        </Box>
      </Paper>
    </motion.div>
  );
};

export default PostItem;
