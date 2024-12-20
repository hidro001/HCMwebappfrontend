// src/components/CreatePost.js
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import { createPost } from '../../service/service';
import useEngagementStore from '../../store/engagementStore';

const CreatePost = () => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
  
    const userPermissions = useEngagementStore((state) => state.permissions);
    const canCreatePost = userPermissions.includes('createPost');

    console.log('userPermissions:', userPermissions);
  
    const handleCreatePost = async () => {
      if (!content.trim()) {
        toast.error('Post content cannot be empty.');
        return;
      }
      setLoading(true);
      try {
        await createPost({ content });
        toast.success('Post created successfully.');
        setContent('');
        // Optionally, refresh the feed or emit a Socket.io event
      } catch (error) {
        console.error('Error creating post:', error);
        toast.error(error.message || 'Failed to create post.');
      } finally {
        setLoading(false);
      }
    };
  
    // if (!canCreatePost) return null; // Do not render if user lacks permission
  
    return (
      <Box mb={4}>
        <h1>Hello</h1>
        <Typography variant="h6">Create a New Post</Typography>
        <TextField
          label="What's on your mind?"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreatePost}
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post'}
        </Button>
      </Box>
    );
  };
  
  export default CreatePost;