// src/components/Feed.js
import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostCard from './PostCard';
import PostCreateBox from './PostCreateBox';
import { fetchPosts } from '../../service/postService';
import socket from '../../utils/socket';
import { motion } from 'framer-motion';

const Feednew = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true); // For pagination, if needed

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    getPosts();

    // Listen for real-time events
    socket.on("newPost", (post) => {
      setPosts((prevPosts) => [post, ...prevPosts]);
    });

    socket.on("updatePost", (updatedPost) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === updatedPost._id ? updatedPost : post))
      );
    });

    socket.on("deletePost", ({ postId }) => {
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    });

    return () => {
      socket.off("newPost");
      socket.off("updatePost");
      socket.off("deletePost");
    };
  }, []);

  const fetchMorePosts = async () => {
    // Implement pagination if your API supports it
    // For example, keep track of current page and fetch the next page
    // If no more posts, setHasMore(false)
    // Here, we assume all posts are loaded
    setHasMore(false);
  };

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-full">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="flex justify-center">
        <div className="w-full max-w-lg">
          <PostCreateBox />
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchMorePosts}
            hasMore={hasMore}
            loader={
              <h4 className="text-center text-gray-500 dark:text-gray-400">Loading...</h4>
            }
            endMessage={
              <p className="text-center text-gray-500 dark:text-gray-400">
                <b>No more posts</b>
              </p>
            }
          >
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </motion.div>
  );
};

export default Feednew;
