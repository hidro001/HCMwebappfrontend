
// // src/components/PostCard.js
// import React from "react";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { motion } from "framer-motion";
// import axiosInstance from "../../service/axiosInstance";
// import useAuthStore from "../../store/store"; // Corrected import path
// import useFeedStore from "../../store/feedStore";
// import { toast } from "react-toastify";
// import PropTypes from "prop-types";
// import { Badge, CircularProgress, IconButton, Button, TextField } from "@mui/material";

// const PostCard = ({ post }) => {
//   const user = useAuthStore((state) => state);
//   const userId = user._id || user.employeeId;
//   const permissions = user.permissionRole || [];

//   // Determine if the current user has liked the post
//   const liked = (post.likes || []).includes(userId);
//   const likeCount = (post.likes || []).length;

//   const [showComments, setShowComments] = React.useState(false);
//   const [commentText, setCommentText] = React.useState("");
//   const [isDeleting, setIsDeleting] = React.useState(false);
//   const [isLiking, setIsLiking] = React.useState(false);
//   const [isAddingComment, setIsAddingComment] = React.useState(false);

//   const handleLike = async () => {
//     setIsLiking(true);
//     try {
//       await axiosInstance.post(`/posts/${post._id}/like`);
//       // Optimistic UI update by toggling like state
//       useFeedStore.getState().updatePost({
//         ...post,
//         likes: liked
//           ? post.likes.filter((id) => id !== userId)
//           : [...post.likes, userId],
//       });
//       // Optionally, Socket.io will handle the actual update
//     } catch (error) {
//       console.error("Error liking post:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to like post. Please try again."
//       );
//     } finally {
//       setIsLiking(false);
//     }
//   };

//   const handleDeletePost = async () => {
//     if (!window.confirm("Are you sure you want to delete this post?")) return;
//     setIsDeleting(true);
//     try {
//       await axiosInstance.delete(`/posts/${post._id}`);
//       toast.success("Post deleted successfully!");
//       useFeedStore.getState().deletePost(post._id);
//     } catch (error) {
//       console.error("Error deleting post:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to delete post. Please try again."
//       );
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   const handleAddComment = async (e) => {
//     e.preventDefault();
//     if (!commentText.trim()) {
//       toast.error("Comment cannot be empty.");
//       return;
//     }
//     setIsAddingComment(true);
//     try {
//       const response = await axiosInstance.post(`/comments/${post._id}`, {
//         comment: commentText,
//       });
//       const newComment = response.data.comment;

//       if (newComment && newComment.commenter) {
//         // Update the feed store; Socket.io will handle real-time updates across clients
//         useFeedStore.getState().addComment(post._id, newComment);
//         toast.success("Comment added successfully!");
//       }
//       //  else {
//       //   console.warn("Commenter information is missing in the response.");
//       //   useFeedStore.getState().addComment(post._id, {
//       //     ...newComment,
//       //     reactions: newComment.reactions || [],
//       //     commenter: {
//       //       user_Avatar: "https://via.placeholder.com/150",
//       //       first_Name: "Unknown",
//       //       last_Name: "User",
//       //       employee_Id: "N/A",
//       //       _id: "unknown",
//       //     },
//       //   });
//       //   toast.warn("Comment added, but commenter information is missing.");
//       // }

//       setCommentText("");
//     } catch (error) {
//       console.error("Error adding comment:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to add comment. Please try again."
//       );
//     } finally {
//       setIsAddingComment(false);
//     }
//   };

//   const handleToggleComments = () => {
//     setShowComments(!showComments);
//   };

//   const handleLikeComment = async (commentId) => {
//     try {
//       await axiosInstance.post(`/comments/${commentId}/like`);
//       // Optimistic UI update by toggling like state in the store
//       const comment = post.comments.find((c) => c._id === commentId);
//       if (comment) {
//         const isLiked = comment.reactions.includes(userId);
//         const updatedReactions = isLiked
//           ? comment.reactions.filter((id) => id !== userId)
//           : [...comment.reactions, userId];
//         useFeedStore.getState().updateComment(post._id, {
//           ...comment,
//           reactions: updatedReactions,
//         });
//       }
//     } catch (error) {
//       console.error("Error liking comment:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to like comment. Please try again."
//       );
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     if (!window.confirm("Are you sure you want to delete this comment?"))
//       return;
//     try {
//       await axiosInstance.delete(`/comments/${commentId}`);
//       useFeedStore.getState().deleteComment(post._id, commentId);
//       toast.success("Comment deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting comment:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to delete comment. Please try again."
//       );
//     }
//   };

//   // Utility function to determine media type
//   const getMediaType = (url) => {
//     const extension = url.split(".").pop().toLowerCase();
//     const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "avif"];
//     const videoExtensions = ["mp4", "webm", "ogg", "mov", "avi", "wmv"];
//     if (imageExtensions.includes(extension)) {
//       return "image";
//     } else if (videoExtensions.includes(extension)) {
//       return "video";
//     } else {
//       return "unknown";
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl mb-6 p-6 transition-colors duration-300"
//     >
//       {/* Post Header */}
//       <div className="flex items-center space-x-4">
//         <img
//           src={post.author?.user_Avatar || "https://via.placeholder.com/150"}
//           alt="Avatar"
//           className="w-12 h-12 rounded-full"
//         />
//         <div>
//           <p className="font-semibold text-lg text-gray-800 dark:text-gray-100">
//             {post.author?.first_Name || "Unknown"} {post.author?.last_Name || "User"} (
//             {post.author?.employee_Id || "N/A"})
//           </p>
//           <p className="text-sm text-gray-500 dark:text-gray-400">
//             {isNaN(new Date(post.createdAt)) ? "Date not available" : new Date(post.createdAt).toLocaleString()}
//           </p>
//         </div>
//         {(permissions.includes("deleteAnyPost") ||
//           userId === post.author?._id ||
//           userId === post.author?.employee_Id) && (
//           <IconButton
//             onClick={handleDeletePost}
//             disabled={isDeleting}
//             className="ml-auto text-red-500 hover:text-red-700 transition-colors duration-300"
//             title="Delete Post"
//           >
//             {isDeleting ? <CircularProgress size={24} /> : <DeleteIcon />}
//           </IconButton>
//         )}
//       </div>

//       {/* Post Content */}
//       <div className="mt-4">
//         <p className="text-gray-700 dark:text-gray-300 text-lg font-bold">
//           {post.title}
//         </p>
//         <p className="mt-2 text-gray-600 dark:text-gray-400">
//           {post.description}
//         </p>
//         {post.media && post.media.length > 0 && (
//           <div className="mt-4 space-y-4">
//             {post.media.map((url, index) => {
//               const mediaType = getMediaType(url);
//               if (mediaType === "image") {
//                 return (
//                   <img
//                     key={index}
//                     src={url}
//                     alt={`media-${index}`}
//                     className="max-w-full h-auto rounded-md mb-2"
//                     loading="lazy"
//                   />
//                 );
//               } else if (mediaType === "video") {
//                 return (
//                   <video
//                     key={index}
//                     src={url}
//                     controls
//                     className="max-w-full h-auto rounded-md mb-2"
//                   >
//                     Your browser does not support the video tag.
//                   </video>
//                 );
//               } else {
//                 return (
//                   <p key={index} className="text-red-500">
//                     Unsupported media format.
//                   </p>
//                 );
//               }
//             })}
//           </div>
//         )}
//       </div>

//       {/* Post Actions */}
//       <div className="flex justify-between items-center mt-4">
//         <div className="flex space-x-6">
//           <button
//             onClick={handleLike}
//             disabled={isLiking}
//             className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors duration-300"
//           >
//             <FavoriteIcon className={`${liked ? "text-red-500" : ""}`} />
//             <span>{likeCount}</span>
//             {isLiking && <CircularProgress size={16} className="ml-2" />}
//           </button>
//           <button
//             onClick={handleToggleComments}
//             className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300"
//           >
//             <ChatBubbleOutlineIcon />
//             <span>{post.comments.length}</span>
//           </button>
//         </div>
//       </div>

//       {/* Comments Section */}
//       {showComments && (
//         <div className="mt-4">
//           <h3 className="font-semibold text-gray-800 dark:text-gray-100">
//             Comments
//           </h3>
//           <form onSubmit={handleAddComment} className="mt-2 flex flex-col">
//             <TextField
//               placeholder="Add a comment..."
//               variant="outlined"
//               multiline
//               rows={3}
//               value={commentText}
//               onChange={(e) => setCommentText(e.target.value)}
//               required
//             />
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               className="mt-2"
//               disabled={isAddingComment}
//             >
//               {isAddingComment ? "Adding..." : "Comment"}
//             </Button>
//           </form>

//           {/* Comments List */}
//           <div className="mt-4 space-y-3">
//             {post.comments.length === 0 ? (
//               <p className="text-gray-500 dark:text-gray-400">
//                 No comments yet.
//               </p>
//             ) : (
//               post.comments.map((comment) => (
//                 <div
//                   key={comment._id}
//                   className="flex items-start space-x-2"
//                 >
//                   <img
//                     src={
//                       comment.commenter?.user_Avatar ||
//                       "https://via.placeholder.com/150"
//                     }
//                     alt="Avatar"
//                     className="w-8 h-8 rounded-full"
//                   />
//                   <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex-1">
//                     <div className="flex justify-between">
//                       <span className="font-semibold text-gray-800 dark:text-gray-100">
//                         {comment.commenter?.first_Name || "Unknown"}{" "}
//                         {comment.commenter?.last_Name || "User"} (
//                         {comment.commenter?.employee_Id || "N/A"})
//                       </span>
//                       {(permissions.includes("deleteAnyComment") ||
//                         userId === comment.commenter?._id ||
//                         userId === comment.commenter?.employee_Id) && (
//                         <IconButton
//                           onClick={() => handleDeleteComment(comment._id)}
//                           className="text-red-500 hover:text-red-700 transition-colors duration-300"
//                           title="Delete Comment"
//                           size="small"
//                         >
//                           <DeleteIcon fontSize="small" />
//                         </IconButton>
//                       )}
//                     </div>
//                     <p className="text-gray-700 dark:text-gray-300">
//                       {typeof comment.comment === 'string' ? comment.comment : JSON.stringify(comment.comment)}
//                     </p>
//                     {/* Optional: Render attachments if present */}
//                     {comment.attachments && comment.attachments.length > 0 && (
//                       <div className="mt-2">
//                         <p className="text-sm text-gray-600 dark:text-gray-400">Attachments:</p>
//                         <ul className="list-disc list-inside">
//                           {comment.attachments.map((attachment, idx) => (
//                             <li key={idx}>
//                               <a href={attachment.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
//                                 {attachment.name}
//                               </a>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                       {isNaN(new Date(comment.createdAt)) ? "Date not available" : new Date(comment.createdAt).toLocaleString()}
//                     </p>
//                     <div className="flex items-center mt-1">
//                       <Button
//                         onClick={() => handleLikeComment(comment._id)}
//                         startIcon={
//                           <FavoriteIcon
//                             className={`text-sm ${
//                               (comment.reactions || []).includes(userId)
//                                 ? "text-red-500"
//                                 : ""
//                             }`}
//                           />
//                         }
//                         size="small"
//                       >
//                         {comment.reactions.length}
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// PostCard.propTypes = {
//   post: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     media: PropTypes.arrayOf(PropTypes.string),
//     likes: PropTypes.arrayOf(PropTypes.string).isRequired,
//     comments: PropTypes.arrayOf(
//       PropTypes.shape({
//         _id: PropTypes.string.isRequired,
//         comment: PropTypes.oneOfType([
//           PropTypes.string,
//           PropTypes.shape({
//             text: PropTypes.string,
//             // Add other fields if necessary
//           }),
//         ]).isRequired,
//         commenter: PropTypes.shape({
//           _id: PropTypes.string.isRequired,
//           first_Name: PropTypes.string.isRequired,
//           last_Name: PropTypes.string.isRequired,
//           employee_Id: PropTypes.string.isRequired,
//           user_Avatar: PropTypes.string,
//         }),
//         reactions: PropTypes.arrayOf(PropTypes.string).isRequired,
//         createdAt: PropTypes.string.isRequired,
//         attachments: PropTypes.arrayOf(
//           PropTypes.shape({
//             url: PropTypes.string.isRequired,
//             name: PropTypes.string.isRequired,
//           })
//         ),
//       })
//     ),
//     author: PropTypes.shape({
//       _id: PropTypes.string.isRequired,
//       first_Name: PropTypes.string.isRequired,
//       last_Name: PropTypes.string.isRequired,
//       employee_Id: PropTypes.string.isRequired,
//       user_Avatar: PropTypes.string,
//     }).isRequired,
//     createdAt: PropTypes.string.isRequired,
//     type: PropTypes.string.isRequired, // Ensure 'type' is included
//   }).isRequired,
// };

// export default PostCard;
// src/components/PostCard.js

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
      // Optionally, Socket.io will handle the actual update
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
        // Update the feed store; Socket.io will handle real-time updates across clients
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

  // Utility function to determine media type
  const getMediaType = (url) => {
    const extension = url.split(".").pop().toLowerCase();
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
      className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl mb-6 p-6 transition-colors duration-300 "
    >
      {/* Post Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
        <img
          src={post.author?.user_Avatar || "https://via.placeholder.com/150"}
          alt="Avatar"
          className="w-12 h-12 rounded-full object-cover"
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

      {/* Post Content */}
      {/* <div className="mt-4">
        <p className="text-gray-700 dark:text-gray-300 text-lg font-bold border border-red-700">
          {post.title}
        </p>
        <p className="mt-2 text-gray-600 dark:text-gray-400 border border-red-700">
          {post.description}
        </p>
        {post.media && post.media.length > 0 && (
          <div className="mt-4 space-y-4 border border-blue-700 items-center">
            <Grid container  className="border border-green-700 w-auto items-center m-auto">
              {post.media.map((url, index) => {
                const mediaType = getMediaType(url);
                return (
                  <Grid item xs={12} sm={6} key={index} className=" w-auto m-auto items-center">
                    {mediaType === "image" ? (
                      <img
                        src={url}
                        alt={`media-${index}`}
                        className=" h-64 object-cover rounded-md   m-auto items-center"
                      />
                    ) : mediaType === "video" ? (
                      <video
                        src={url}
                        controls
                        className="w-full h-64 object-cover rounded-md"
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
      </div> */}

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
  {post.media && post.media.length > 0 && (
    <div className="mt-4 space-y-4">
      {/* Material-UI Grid Container */}
      <Grid 
        container 
        spacing={2} 
        justifyContent="center" // Centers items horizontally
        alignItems="center"     // Centers items vertically
      >
        {post.media.map((url, index) => {
          const mediaType = getMediaType(url);
          return (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              key={index} 
              display="flex" 
              justifyContent="center" // Centers content within the Grid item
            >
              {/* Conditional Rendering for Image or Video */}
              {mediaType === "image" ? (
                <img
                  src={url}
                  alt={`media-${index}`}
                  className="max-w-full h-64 object-cover rounded-md" // Ensures responsiveness and uniform height
                />
              ) : mediaType === "video" ? (
                <video
                  src={url}
                  controls
                  className="max-w-full h-40 object-contain rounded-md " // Ensures responsiveness and uniform height
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
    media: PropTypes.arrayOf(PropTypes.string),
    likes: PropTypes.arrayOf(PropTypes.string).isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        comment: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({
            text: PropTypes.string,
            // Add other fields if necessary
          }),
        ]).isRequired,
        commenter: PropTypes.shape({
          _id: PropTypes.string.isRequired,
          first_Name: PropTypes.string.isRequired,
          last_Name: PropTypes.string.isRequired,
          employee_Id: PropTypes.string.isRequired,
          user_Avatar: PropTypes.string,
        }),
        reactions: PropTypes.arrayOf(PropTypes.string).isRequired,
        createdAt: PropTypes.string.isRequired,
        attachments: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
          })
        ),
      })
    ),
    author: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      first_Name: PropTypes.string.isRequired,
      last_Name: PropTypes.string.isRequired,
      employee_Id: PropTypes.string.isRequired,
      user_Avatar: PropTypes.string,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired, // Ensure 'type' is included
  }).isRequired,
};

export default PostCard;

