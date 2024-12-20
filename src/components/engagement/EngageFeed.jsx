// src/components/EngageFeed.js
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  CircularProgress,
} from '@mui/material';
import { toast } from 'react-toastify';
import { fetchPosts } from '../../service/service';
import PostItem from './PostItem';
import useEngagementStore from '../../store/engagementStore';

const EngageFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const userPermissions = useEngagementStore((state) => state.permissions);
  const canAddComment = userPermissions.includes('addComment');

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line
  }, [page]);

  const loadPosts = async () => {
    try {
      const data = await fetchPosts(page, 10);
      if (data.docs.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...data.docs]);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error(error.message || 'Failed to fetch posts.');
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      >= document.documentElement.offsetHeight - 50
      && hasMore
      && !loading
    ) {
      setPage((prev) => prev + 1);
      setLoading(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line
  }, [hasMore, loading]);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Engagement Feed
      </Typography>
      <List>
        {posts.map((post) => (
          <ListItem key={post._id} disableGutters>
            <PostItem post={post} />
          </ListItem>
        ))}
      </List>
      {loading && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}
      {!hasMore && (
        <Typography align="center" mt={2}>
          No more posts to display.
        </Typography>
      )}
    </Box>
  );
};

export default EngageFeed;
