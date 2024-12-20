// src/components/PostItem.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
} from '@mui/material';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { editPost, deletePost } from '../../service/service';
import useEngagementStore from '../../store/engagementStore';
import CommentItem from './CommentItem';
import CreateComment from './CreateComment';

const PostItem = ({ post }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [comments, setComments] = useState(post.comments || []);

  const userPermissions = useEngagementStore((state) => state.permissions);
  const canEditPost = userPermissions.includes('editPost') || userPermissions.includes('moderatePost');
  const canDeletePost = userPermissions.includes('deletePost') || userPermissions.includes('moderatePost');
  const canAddComment = userPermissions.includes('addComment');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditedContent(post.content);
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    if (!editedContent.trim()) {
      toast.error('Post content cannot be empty.');
      return;
    }
    try {
      const updatedPost = await editPost(post._id, { content: editedContent });
      toast.success('Post updated successfully.');
      setIsEditing(false);
      // Optionally, update the post state if needed
    } catch (error) {
      console.error('Error editing post:', error);
      toast.error(error.message || 'Failed to edit post.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await deletePost(post._id);
      toast.success('Post deleted successfully.');
      // Optionally, remove the post from the feed
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error(error.message || 'Failed to delete post.');
    }
  };

  return (
    <Box width="100%" p={2} border="1px solid #ccc" borderRadius="8px" mb={2}>
      {/* Post Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1">
          {post.author.first_Name} {post.author.last_Name}
        </Typography>
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
      {isEditing ? (
        <>
          <TextField
            multiline
            rows={3}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Box display="flex" justifyContent="flex-end" gap={1}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Save />}
              onClick={handleSaveEdit}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<Cancel />}
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
          </Box>
        </>
      ) : (
        <Typography variant="body1">{post.content}</Typography>
      )}

      {/* Comments Section */}
      <Box mt={2}>
        <Typography variant="subtitle2">Comments:</Typography>
        {comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} />
        ))}
        {/* Create Comment */}
        {canAddComment && <CreateComment postId={post._id} setComments={setComments} />}
      </Box>
    </Box>
  );
};

export default PostItem;
