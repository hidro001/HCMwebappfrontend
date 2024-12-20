// src/components/CommentItem.js
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
import { editComment, deleteComment } from '../../service/service';
import useEngagementStore from '../../store/engagementStore';

const CommentItem = ({ comment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment);

  const userPermissions = useEngagementStore((state) => state.permissions);
  const canEditComment = userPermissions.includes('editComment') || userPermissions.includes('moderateComment');
  const canDeleteComment = userPermissions.includes('deleteComment') || userPermissions.includes('moderateComment');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditedComment(comment.comment);
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    if (!editedComment.trim()) {
      toast.error('Comment cannot be empty.');
      return;
    }
    try {
      const updatedComment = await editComment(comment._id, { comment: editedComment });
      toast.success('Comment updated successfully.');
      setIsEditing(false);
      // Optionally, update the comment state if needed
    } catch (error) {
      console.error('Error editing comment:', error);
      toast.error(error.message || 'Failed to edit comment.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    try {
      await deleteComment(comment._id);
      toast.success('Comment deleted successfully.');
      // Optionally, remove the comment from the state
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error(error.message || 'Failed to delete comment.');
    }
  };

  return (
    <Box pl={4} mt={1} mb={1}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle2">
          {comment.commenter.first_Name} {comment.commenter.last_Name}
        </Typography>
        {(canEditComment || canDeleteComment) && (
          <Box>
            {canEditComment && (
              <IconButton aria-label="edit" onClick={handleEdit}>
                <Edit fontSize="small" />
              </IconButton>
            )}
            {canDeleteComment && (
              <IconButton aria-label="delete" onClick={handleDelete}>
                <Delete fontSize="small" />
              </IconButton>
            )}
          </Box>
        )}
      </Box>
      {isEditing ? (
        <>
          <TextField
            multiline
            rows={2}
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
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
        <Typography variant="body2">{comment.comment}</Typography>
      )}
    </Box>
  );
};

export default CommentItem;
