// src/components/engagement/PostFeed.js
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  CircularProgress,
} from '@mui/material';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import usePostStore from '../../store/postStore';
import PostItem from './PostItem';
import { useInView } from 'react-intersection-observer';

const PostFeed = () => {
  const { posts, fetchPosts, loading } = usePostStore();
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  useEffect(() => {
    fetchPosts(page, 10);
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    if (inView && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [inView, loading]);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Feed
      </Typography>
      <List>
        {posts.map((post) => (
          <ListItem key={post._id} disableGutters>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{ width: '100%' }}
            >
              <PostItem post={post} />
            </motion.div>
          </ListItem>
        ))}
      </List>
      {loading && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}
      <div ref={ref}></div>
    </Box>
  );
};

export default PostFeed;
