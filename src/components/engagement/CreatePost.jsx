// src/components/engagement/CreatePost.js
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createPost, createPoll, fetchPolls } from '../../service/service';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import usePollStore from '../../store/pollStore';

const CreatePost = () => {
  const navigate = useNavigate();
  const { fetchPolls: fetchPollsFromStore } = usePollStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState([]);
  const [isPoll, setIsPoll] = useState(false);
  const [pollId, setPollId] = useState('');
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch existing polls for selection
  React.useEffect(() => {
    const loadPolls = async () => {
      try {
        const data = await fetchPolls();
        setPolls(data.docs);
      } catch (error) {
        console.error('Error fetching polls:', error);
        toast.error(error.response?.data?.message || 'Failed to fetch polls.');
      }
    };
    loadPolls();
  }, []);

  const onDrop = (acceptedFiles) => {
    // Handle media files (images/videos)
    const mappedFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setMedia((prev) => [...prev, ...mappedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.mov', '.avi'],
    },
  });

  const handleRemoveMedia = (file) => {
    setMedia((prev) => prev.filter((f) => f !== file));
  };

  const handleCreatePoll = async () => {
    // Optional: Create a new poll before associating it with the post
    // Implement as needed
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error('Title and Description are required.');
      return;
    }

    if (isPoll && !pollId) {
      toast.error('Please select a poll.');
      return;
    }

    setLoading(true);
    try {
      // Handle media upload logic here
      // For simplicity, we'll assume media files are uploaded to a service and return URLs
      const mediaUrls = media.map((file) => file.preview); // Replace with actual upload URLs

      const postData = {
        title,
        description,
        media: mediaUrls,
        isPoll,
        pollId: isPoll ? pollId : null,
      };

      const newPost = await createPost(postData);
      toast.success('Post created successfully.');
      navigate('/dashboard/engage-feed');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error(error.response?.data?.message || 'Failed to create post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Create a New Post
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
              multiline
              rows={4}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              {...getRootProps()}
              sx={{
                border: '2px dashed #cccccc',
                padding: 2,
                textAlign: 'center',
                cursor: 'pointer',
                bgcolor: isDragActive ? '#f0f0f0' : 'transparent',
              }}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <Typography>Drop the files here ...</Typography>
              ) : (
                <Typography>Drag 'n' drop some files here, or click to select files</Typography>
              )}
            </Box>
            <Box mt={2} display="flex" flexWrap="wrap" gap={2}>
              {media.map((file, index) => (
                <Box key={index} position="relative">
                  {file.type.startsWith('image') ? (
                    <img src={file.preview} alt="preview" width={100} height={100} style={{ objectFit: 'cover' }} />
                  ) : (
                    <video src={file.preview} width={100} height={100} controls />
                  )}
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => handleRemoveMedia(file)}
                    sx={{ position: 'absolute', top: 0, right: 0 }}
                  >
                    Remove
                  </Button>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isPoll}
                    onChange={(e) => setIsPoll(e.target.checked)}
                  />
                }
                label="Add a Poll"
              />
            </FormGroup>
          </Grid>
          {isPoll && (
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="poll-select-label">Select Poll</InputLabel>
                <Select
                  labelId="poll-select-label"
                  value={pollId}
                  label="Select Poll"
                  onChange={(e) => setPollId(e.target.value)}
                >
                  {polls.map((poll) => (
                    <MenuItem key={poll._id} value={poll._id}>
                      {poll.question}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
              fullWidth
            >
              {loading ? 'Posting...' : 'Post'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </motion.div>
  );
};

export default CreatePost;
