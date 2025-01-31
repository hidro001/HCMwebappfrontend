
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";
import axiosInstance from "../../service/axiosInstance";
import useAuthStore from "../../store/store"; // Corrected import path
import useFeedStore from "../../store/feedStore";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { Badge, CircularProgress, IconButton, Button, TextField, Grid } from "@mui/material";

const PostCard = ({ post }) => {
  const user = useAuthStore((state) => state);
  const userId = user._id || user.employeeId;
  const permissions = user.permissionRole || [];

  // Determine if the current user has liked the post
  const liked = (post.likes || []).includes(userId);
  const likeCount = (post.likes || []).length;

  const [showComments, setShowComments] = React.useState(false);
  const [commentText, setCommentText] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isLiking, setIsLiking] = React.useState(false);
  const [isAddingComment, setIsAddingComment] = React.useState(false);

  const handleLike = async () => {
    setIsLiking(true);
    try {
      await axiosInstance.post(`/posts/${post._id}/like`);
      // Optimistic UI update by toggling like state
      useFeedStore.getState().updatePost({
        ...post,
        likes: liked
          ? post.likes.filter((id) => id !== userId)
          : [...post.likes, userId],
      });
    } catch (error) {
      console.error("Error liking post:", error);
      toast.error(
        error.response?.data?.message || "Failed to like post. Please try again."
      );
    } finally {
      setIsLiking(false);
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    setIsDeleting(true);
    try {
      await axiosInstance.delete(`/posts/${post._id}`);
      toast.success("Post deleted successfully!");
      useFeedStore.getState().deletePost(post._id);
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error(
        error.response?.data?.message || "Failed to delete post. Please try again."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }
    setIsAddingComment(true);
    try {
      const response = await axiosInstance.post(`/comments/${post._id}`, {
        comment: commentText,
      });
      const newComment = response.data.comment;

      if (newComment && newComment.commenter) {
        useFeedStore.getState().addComment(post._id, newComment);
        toast.success("Comment added successfully!");
      }

      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error(
        error.response?.data?.message || "Failed to add comment. Please try again."
      );
    } finally {
      setIsAddingComment(false);
    }
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const handleLikeComment = async (commentId) => {
    try {
      await axiosInstance.post(`/comments/${commentId}/like`);
      // Optimistic UI update by toggling like state in the store
      const comment = post.comments.find((c) => c._id === commentId);
      if (comment) {
        const isLiked = comment.reactions.includes(userId);
        const updatedReactions = isLiked
          ? comment.reactions.filter((id) => id !== userId)
          : [...comment.reactions, userId];
        useFeedStore.getState().updateComment(post._id, {
          ...comment,
          reactions: updatedReactions,
        });
      }
    } catch (error) {
      console.error("Error liking comment:", error);
      toast.error(
        error.response?.data?.message || "Failed to like comment. Please try again."
      );
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;
    try {
      await axiosInstance.delete(`/comments/${commentId}`);
      useFeedStore.getState().deleteComment(post._id, commentId);
      toast.success("Comment deleted successfully!");
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error(
        error.response?.data?.message || "Failed to delete comment. Please try again."
      );
    }
  };

  // Utility function to determine media type with added validations
  const getMediaType = (url) => {
    if (typeof url !== 'string') return 'unknown'; // Check if url is a string
    const urlWithoutParams = url.split('?')[0]; // Remove query parameters
    const extension = urlWithoutParams.split('.').pop().toLowerCase(); // Extract extension

    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "avif"];
    const videoExtensions = ["mp4", "webm", "ogg", "mov", "avi", "wmv"];

    if (imageExtensions.includes(extension)) {
      return "image";
    } else if (videoExtensions.includes(extension)) {
      return "video";
    } else {
      return "unknown";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl mb-2 p-4 transition-colors duration-300 "
    >
      {/* Post Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
        <img
          src={post.author?.user_Avatar || "https://via.placeholder.com/150"}
          alt="Avatar"
          className="w-12 h-12 rounded-full object-cover"
          loading="lazy"
        />
        <div className="mt-2 sm:mt-0">
          <p className="font-semibold text-lg text-gray-800 dark:text-gray-100">
            {post.author?.first_Name || "Unknown"} {post.author?.last_Name || "User"} (
            {post.author?.employee_Id || "N/A"})
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isNaN(new Date(post.createdAt)) ? "Date not available" : new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
        {(permissions.includes("deleteAnyPost") ||
          userId === post.author?._id ||
          userId === post.author?.employee_Id) && (
          <IconButton
            onClick={handleDeletePost}
            disabled={isDeleting}
            className="ml-auto text-red-500 hover:text-red-700 transition-colors duration-300 mt-2 sm:mt-0"
            title="Delete Post"
          >
            {isDeleting ? <CircularProgress size={24} /> : <DeleteIcon />}
          </IconButton>
        )}
      </div>

      <div className="mt-4">
        {/* Post Title */}
        <p className="text-gray-700 dark:text-gray-300 text-lg font-bold">
          {post.title}
        </p>
        
        {/* Post Description */}
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {post.description}
        </p>
        
        {/* Media Section */}
        {Array.isArray(post.media) && post.media.length > 0 && (
          <div className="mt-4 space-y-4">
            <Grid 
              container 
              spacing={2} 
              justifyContent="center" 
              alignItems="center"
            >
              {post.media.map((url, index) => {
                // Skip undefined or null URLs
                if (!url) {
                  console.warn(`Post ${post._id} has an undefined or null media URL at index ${index}.`);
                  return null;
                }

                const mediaType = getMediaType(url);
                return (
                  <Grid 
                    item 
                    xs={12} 
                    sm={6} 
                    key={index} 
                    display="flex" 
                    justifyContent="center"
                  >
                    {mediaType === "image" ? (
                      <img
                        src={url}
                        alt={`media-${index}`}
                        className="max-w-full h-64 object-cover rounded-md"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/150"; // Fallback image
                        }}
                      />
                    ) : mediaType === "video" ? (
                      <video
                        src={url}
                        controls
                        className="max-w-full h-40 object-contain rounded-md"
                        preload="metadata"
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <p className="text-red-500">Unsupported media format.</p>
                    )}
                  </Grid>
                );
              })}
            </Grid>
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-6">
          <button
            onClick={handleLike}
            disabled={isLiking}
            className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors duration-300"
          >
            <FavoriteIcon className={`${liked ? "text-red-500" : ""}`} />
            <span>{likeCount}</span>
            {isLiking && <CircularProgress size={16} className="ml-2" />}
          </button>
          <button
            onClick={handleToggleComments}
            className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300"
          >
            <ChatBubbleOutlineIcon />
            <span>{post.comments.length}</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100">
            Comments
          </h3>
          <form onSubmit={handleAddComment} className="mt-2 flex flex-col">
            <TextField
              placeholder="Add a comment..."
              variant="outlined"
              multiline
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="mt-2"
              disabled={isAddingComment}
            >
              {isAddingComment ? "Adding..." : "Comment"}
            </Button>
          </form>

          {/* Comments List */}
          <div className="mt-4 space-y-3">
            {post.comments.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                No comments yet.
              </p>
            ) : (
              post.comments.map((comment) => (
                <div
                  key={comment._id}
                  className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2"
                >
                  <img
                    src={
                      comment.commenter?.user_Avatar ||
                      "https://via.placeholder.com/150"
                    }
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800 dark:text-gray-100">
                        {comment.commenter?.first_Name || "Unknown"}{" "}
                        {comment.commenter?.last_Name || "User"} (
                        {comment.commenter?.employee_Id || "N/A"})
                      </span>
                      {(permissions.includes("deleteAnyComment") ||
                        userId === comment.commenter?._id ||
                        userId === comment.commenter?.employee_Id) && (
                        <IconButton
                          onClick={() => handleDeleteComment(comment._id)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-300"
                          title="Delete Comment"
                          size="small"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      )}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">
                      {typeof comment.comment === 'string' ? comment.comment : JSON.stringify(comment.comment)}
                    </p>
                    {/* Optional: Render attachments if present */}
                    {comment.attachments && comment.attachments.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Attachments:</p>
                        <ul className="list-disc list-inside">
                          {comment.attachments.map((attachment, idx) => (
                            <li key={idx}>
                              <a href={attachment.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                {attachment.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {isNaN(new Date(comment.createdAt)) ? "Date not available" : new Date(comment.createdAt).toLocaleString()}
                    </p>
                    <div className="flex items-center mt-1">
                      <Button
                        onClick={() => handleLikeComment(comment._id)}
                        startIcon={
                          <FavoriteIcon
                            className={`text-sm ${
                              (comment.reactions || []).includes(userId)
                                ? "text-red-500"
                                : ""
                            }`}
                          />
                        }
                        size="small"
                      >
                        {comment.reactions.length}
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    media: PropTypes.arrayOf(PropTypes.string), // Ensure media is an array of strings
    likes: PropTypes.arrayOf(
      PropTypes.shape({
        $oid: PropTypes.string,
      })
    ).isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        post: PropTypes.string.isRequired,
        commenter: PropTypes.shape({
          _id: PropTypes.string.isRequired,
          first_Name: PropTypes.string.isRequired,
          last_Name: PropTypes.string.isRequired,
          employee_Id: PropTypes.string.isRequired,
          user_Avatar: PropTypes.string,
        }),
        comment: PropTypes.string.isRequired,
        attachments: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
          })
        ),
        reactions: PropTypes.arrayOf(PropTypes.string).isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
      })
    ).isRequired,
    author: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      first_Name: PropTypes.string.isRequired,
      last_Name: PropTypes.string.isRequired,
      employee_Id: PropTypes.string.isRequired,
      user_Avatar: PropTypes.string,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostCard;

