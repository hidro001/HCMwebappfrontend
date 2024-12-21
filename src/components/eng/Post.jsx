// src/components/feed/Post.js
import React, { useState,useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Collapse,
  Badge,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import Comment from './Comment';
import useAuthStore from '../../store/store';
import axiosInstance from '../../service/axiosInstance';
import { motion } from 'framer-motion';
import CreateCommentModal from './CreateCommentModal';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  
  const Post = ({ post }) => {
    const [expanded, setExpanded] = useState(false);
    const [likes, setLikes] = useState(post.likes ? post.likes.length : 0);
    
    const user = useAuthStore((state) => state);
    const userId = user._id || user.employeeId; // Use the correct identifier
  
    const [isLiked, setIsLiked] = useState(post.likes?.includes(userId) || false);
    const [openCommentModal, setOpenCommentModal] = useState(false);
  
    useEffect(() => {
      setLikes(post.likes ? post.likes.length : 0);
      setIsLiked(post.likes?.includes(userId) || false);
    }, [post.likes, userId]);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  
    const handleLike = async () => {
      try {
        await axiosInstance.post(`/posts/${post._id}/like`);
        setIsLiked(!isLiked);
        setLikes(isLiked ? likes - 1 : likes + 1);
      } catch (error) {
        console.error('Error liking post:', error);
        // Optionally, handle error (e.g., show a notification)
      }
    };
  
    const handleDelete = async () => {
      try {
        await axiosInstance.delete(`/posts/${post._id}`);
        // The post will be removed via real-time event
      } catch (error) {
        console.error('Error deleting post:', error);
        // Optionally, handle error (e.g., show a notification)
      }
    };
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-md mx-auto">
          <CardHeader
            avatar={<Avatar src={post.author.userAvatar} alt={post.author.userName} />}
            title={post.author.userName}
            subheader={new Date(post.createdAt).toLocaleString()}
          />
          <CardContent>
            <Typography variant="h6" component="div">
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.description}
            </Typography>
            {post.media && post.media.length > 0 && (
              <div className="mt-4">
                {post.media.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`media-${index}`}
                    className="w-full h-auto rounded-md mb-2"
                  />
                ))}
              </div>
            )}
          </CardContent>
          <CardActions disableSpacing>
            <IconButton onClick={handleLike} aria-label="like">
              <Badge badgeContent={likes} color="secondary">
                <FavoriteIcon color={isLiked ? 'error' : 'inherit'} />
              </Badge>
            </IconButton>
            <IconButton onClick={() => setOpenCommentModal(true)} aria-label="comment">
              <CommentIcon />
            </IconButton>
            {(user.permissions?.includes('deleteAnyPost') || userId === post.author._id || userId === post.author.employeeId) && (
              <IconButton onClick={handleDelete} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            )}
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show comments"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Comment postId={post._id} />
            </CardContent>
          </Collapse>
          <CreateCommentModal
            open={openCommentModal}
            handleClose={() => setOpenCommentModal(false)}
            postId={post._id}
          />
        </Card>
      </motion.div>
    );
  };
  
  export default Post;
