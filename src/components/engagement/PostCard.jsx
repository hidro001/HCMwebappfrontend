
// // src/components/PostCard.js
// import React, { useState, useEffect } from "react";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { motion } from "framer-motion";
// import axiosInstance from "../../service/axiosInstance";
// import useAuthStore from "../../store/store";
// import { Badge, CircularProgress, IconButton, Button } from "@mui/material";
// import PollCard from "./PollCard"; // Ensure you have this component
// import PropTypes from "prop-types";
// import { toast } from "react-toastify";

// const PostCard = ({ post }) => {
//   const user = useAuthStore((state) => state);
//   const userId = user._id || user.employeeId;
//   const permissions = user.permissions || [];

//   const [liked, setLiked] = useState((post.likes || []).includes(userId));
//   const [likeCount, setLikeCount] = useState((post.likes || []).length);
//   const [showComments, setShowComments] = useState(false);
//   const [comments, setComments] = useState(post.comments || []);
//   const [commentText, setCommentText] = useState("");
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [isLiking, setIsLiking] = useState(false);

//   const handleLike = async () => {
//     setIsLiking(true);
//     try {
//       await axiosInstance.post(`/posts/${post._id}/like`);
//       // Optimistic UI update
//       if (liked) {
//         setLikeCount(likeCount - 1);
//       } else {
//         setLikeCount(likeCount + 1);
//       }
//       setLiked(!liked);
//       // Emit real-time update if needed
//       // socket.emit("likePost", { postId: post._id, userId });
//     } catch (error) {
//       console.error("Error liking post:", error);
//       toast.error(
//         error.response?.data?.message ||
//           "Failed to like post. Please try again."
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
//       // Optionally, remove the post from the UI (handled by real-time event or parent)
//       // e.g., by calling a prop function to refresh the feed
//     } catch (error) {
//       console.error("Error deleting post:", error);
//       toast.error(
//         error.response?.data?.message ||
//           "Failed to delete post. Please try again."
//       );
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   const handleAddComment = async (e) => {
//     e.preventDefault();
//     if (!commentText.trim()) return;
//     try {
//       const response = await axiosInstance.post(`/comments/${post._id}`, {
//         comment: commentText,
//       });

     

//       // Ensure that the response contains the 'commenter' field
//       if (response.data.comment && response.data.comment.commenter) {
//         setComments([...comments, response.data.comment]);
//         toast.success("Comment added successfully!");
//       } else {
//         console.warn("Commenter information is missing in the response.");
//         toast.warn("Comment added, but commenter information is missing.");
//         // Optionally, set a default commenter or handle accordingly
//         setComments([
//           ...comments,
//           {
//             ...response.data.comment,
//             reactions: response.data.comment.reactions || [],
//             commenter: {
//               user_Avatar: "https://via.placeholder.com/150",
//               first_Name: "Unknown",
//               last_Name: "User",
//               employee_Id: "N/A",
//               _id: "unknown",
//             },
//           },
//         ]);
//       }

//       // Refresh comments to ensure data consistency
//       await fetchComments();

//       // Emit real-time event for new comment if needed
//       // socket.emit("newComment", response.data.comment);
//     } catch (error) {
//       console.error("Error adding comment:", error);
//       toast.error(
//         error.response?.data?.message ||
//           "Failed to add comment. Please try again."
//       );
//     }
//   };

//   const handleToggleComments = () => {
//     setShowComments(!showComments);
//     if (!showComments && comments.length === 0) {
//       // Fetch comments if not already fetched
//       fetchComments();
//     }
//   };

//   const fetchComments = async () => {
//     try {
//       const response = await axiosInstance.get(`/comments/${post._id}`);
//       // Ensure that each comment has a 'reactions' array and 'commenter' object
//       const fetchedComments = response.data.docs.map((comment) => ({
//         ...comment,
//         reactions: comment.reactions || [],
//         commenter: comment.commenter || {
//           user_Avatar: "https://via.placeholder.com/150",
//           first_Name: "Unknown",
//           last_Name: "User",
//           employee_Id: "N/A",
//           _id: "unknown",
//         },
//       }));
//       setComments(fetchedComments);
//     } catch (error) {
//       console.error("Error fetching comments:", error);
//       toast.error("Failed to load comments. Please try again.");
//     }
//   };

//   const handleLikeComment = async (commentId) => {
//     try {
//       await axiosInstance.post(`/comments/${commentId}/like`);
//       // Optimistic UI update
//       setComments((prevComments) =>
//         prevComments.map((comment) => {
//           if (comment._id === commentId) {
//             const isLiked = (comment.reactions || []).includes(userId);
//             if (isLiked) {
//               return {
//                 ...comment,
//                 reactions: comment.reactions.filter((id) => id !== userId),
//               };
//             } else {
//               return {
//                 ...comment,
//                 reactions: [...(comment.reactions || []), userId],
//               };
//             }
//           }
//           return comment;
//         })
//       );
//       // Emit real-time update if needed
//       // socket.emit("likeComment", { commentId, userId });
//     } catch (error) {
//       console.error("Error liking comment:", error);
//       toast.error(
//         error.response?.data?.message ||
//           "Failed to like comment. Please try again."
//       );
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     if (!window.confirm("Are you sure you want to delete this comment?"))
//       return;
//     try {
//       await axiosInstance.delete(`/comments/${commentId}`);
//       setComments((prevComments) =>
//         prevComments.filter((c) => c._id !== commentId)
//       );
//       toast.success("Comment deleted successfully!");
//       // Emit real-time deletion if needed
//       // socket.emit("deleteComment", { commentId });
//     } catch (error) {
//       console.error("Error deleting comment:", error);
//       toast.error(
//         error.response?.data?.message ||
//           "Failed to delete comment. Please try again."
//       );
//     }
//   };

//   // Utility function to determine media type
//   const getMediaType = (url) => {
//     const extension = url.split(".").pop().toLowerCase();
//     const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg","avif"];
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
//             {post.author?.first_Name} {post.author?.last_Name} (
//             {post.author?.employee_Id})
//           </p>
//           <p className="text-sm text-gray-500 dark:text-gray-400">
//             {new Date(post.createdAt).toLocaleString()}
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
//             <DeleteIcon />
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
//             <span>{comments.length}</span>
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
//             <textarea
//               placeholder="Add a comment..."
//               className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-800 dark:text-gray-100"
//               value={commentText}
//               onChange={(e) => setCommentText(e.target.value)}
//               required
//               rows={3}
//             />
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               className="mt-2"
//             >
//               Comment
//             </Button>
//           </form>

//           {/* Comments List */}
//           <div className="mt-4 space-y-3">
//             {comments.length === 0 ? (
//               <p className="text-gray-500 dark:text-gray-400">
//                 No comments yet.
//               </p>
//             ) : (
//               comments.map((comment) => (
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
//                         {comment.commenter?.first_Name}{" "}
//                         {comment.commenter?.last_Name} (
//                         {comment.commenter?.employee_Id})
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
//                       {comment.comment}
//                     </p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                       {new Date(comment.createdAt).toLocaleString()}
//                     </p>
//                     <div className="flex items-center mt-1">
//                       <button
//                         onClick={() => handleLikeComment(comment._id)}
//                         className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors duration-300"
//                       >
//                         <FavoriteIcon
//                           className={`text-sm ${
//                             (comment.reactions || []).includes(userId)
//                               ? "text-red-500"
//                               : ""
//                           }`}
//                         />
//                         <span className="text-sm">
//                           {(comment.reactions || []).length}
//                         </span>
//                       </button>
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
//         comment: PropTypes.string.isRequired,
//         commenter: PropTypes.shape({
//           _id: PropTypes.string.isRequired,
//           first_Name: PropTypes.string.isRequired,
//           last_Name: PropTypes.string.isRequired,
//           employee_Id: PropTypes.string.isRequired,
//           user_Avatar: PropTypes.string,
//         }),
//         reactions: PropTypes.arrayOf(PropTypes.string).isRequired,
//         createdAt: PropTypes.string.isRequired,
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
//   }).isRequired,
// };

// PostCard.defaultProps = {
//   post: {
//     comments: [],
//     likes: [],
//     author: {
//       user_Avatar: "https://via.placeholder.com/150",
//       first_Name: "Unknown",
//       last_Name: "User",
//       employee_Id: "N/A",
//     },
//   },
// };

// export default PostCard;

// src/components/PostCard.js
import React, { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";
import axiosInstance from "../../service/axiosInstance";
import useAuthStore from "../../store/store";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { Badge, CircularProgress, IconButton, Button } from "@mui/material";

// Import Socket Context (If Emitting)
import { useSocket } from '../../contexts/SocketContext'; // Adjust the path

const PostCard = ({ post }) => {
  const socket = useSocket();
  const user = useAuthStore((state) => state);
  const userId = user._id || user.employeeId;
  const permissions = user.permissions || [];

  const [liked, setLiked] = useState((post.likes || []).includes(userId));
  const [likeCount, setLikeCount] = useState((post.likes || []).length);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    setIsLiking(true);
    try {
      await axiosInstance.post(`/posts/${post._id}/like`);
      // Optimistic UI update
      if (liked) {
        setLikeCount(likeCount - 1);
      } else {
        setLikeCount(likeCount + 1);
      }
      setLiked(!liked);
      // Emit real-time event if needed
      // socket.emit("likePost", { postId: post._id, userId });
    } catch (error) {
      console.error("Error liking post:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to like post. Please try again."
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
      // Optionally, remove the post from the UI (handled by real-time event or parent)
      // e.g., by calling a prop function to refresh the feed
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to delete post. Please try again."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const response = await axiosInstance.post(`/comments/${post._id}`, {
        comment: commentText,
      });
      console.log("Added Comment:", response.data.comment); // Debugging line

      // Ensure that the response contains the 'commenter' field
      if (response.data.comment && response.data.comment.commenter) {
        setComments([...comments, response.data.comment]);
        toast.success("Comment added successfully!");
      } else {
        console.warn("Commenter information is missing in the response.");
        toast.warn("Comment added, but commenter information is missing.");
        // Optionally, set a default commenter or handle accordingly
        setComments([
          ...comments,
          {
            ...response.data.comment,
            reactions: response.data.comment.reactions || [],
            commenter: {
              user_Avatar: "https://via.placeholder.com/150",
              first_Name: "Unknown",
              last_Name: "User",
              employee_Id: "N/A",
              _id: "unknown",
            },
          },
        ]);
      }

      // Refresh comments to ensure data consistency
      await fetchComments();

      // Emit real-time event for new comment if needed
      // socket.emit("newComment", response.data.comment);
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error(
        error.response?.data?.message || "Failed to add comment. Please try again."
      );
    }
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
    if (!showComments && comments.length === 0) {
      // Fetch comments if not already fetched
      fetchComments();
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(`/comments/${post._id}`);
      const fetchedComments = response.data.docs.map((comment) => ({
        ...comment,
        reactions: comment.reactions || [],
        commenter: comment.commenter || {
          user_Avatar: "https://via.placeholder.com/150",
          first_Name: "Unknown",
          last_Name: "User",
          employee_Id: "N/A",
          _id: "unknown",
        },
      }));
      console.log("Fetched Comments:", fetchedComments); // Debugging line
      setComments(fetchedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("Failed to load comments. Please try again.");
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      await axiosInstance.post(`/comments/${commentId}/like`);
      // Optimistic UI update
      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment._id === commentId) {
            const isLiked = (comment.reactions || []).includes(userId);
            if (isLiked) {
              return {
                ...comment,
                reactions: comment.reactions.filter((id) => id !== userId),
              };
            } else {
              return {
                ...comment,
                reactions: [...(comment.reactions || []), userId],
              };
            }
          }
          return comment;
        })
      );
      // Emit real-time update if needed
      // socket.emit("likeComment", { commentId, userId });
    } catch (error) {
      console.error("Error liking comment:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to like comment. Please try again."
      );
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;
    try {
      await axiosInstance.delete(`/comments/${commentId}`);
      setComments((prevComments) =>
        prevComments.filter((c) => c._id !== commentId)
      );
      toast.success("Comment deleted successfully!");
      // Emit real-time deletion if needed
      // socket.emit("deleteComment", { commentId });
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to delete comment. Please try again."
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

  // Optionally, handle real-time updates to this specific post
  // For example, if a new comment is added elsewhere, update comments
  useEffect(() => {
    if (!socket) return;

    const handleNewComment = (comment) => {
      if (comment.postId === post._id) {
        setComments((prevComments) => [...prevComments, comment]);
        toast.info('A new comment has been added to this post.');
      }
    };

    socket.on('newComment', handleNewComment);

    return () => {
      socket.off('newComment', handleNewComment);
    };
  }, [socket, post._id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl mb-6 p-6 transition-colors duration-300"
    >
      {/* Post Header */}
      <div className="flex items-center space-x-4">
        <img
          src={post.author?.user_Avatar || "https://via.placeholder.com/150"}
          alt="Avatar"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="font-semibold text-lg text-gray-800 dark:text-gray-100">
            {post.author?.first_Name} {post.author?.last_Name} (
            {post.author?.employee_Id})
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
        {(permissions.includes("deleteAnyPost") ||
          userId === post.author?._id ||
          userId === post.author?.employee_Id) && (
          <IconButton
            onClick={handleDeletePost}
            disabled={isDeleting}
            className="ml-auto text-red-500 hover:text-red-700 transition-colors duration-300"
            title="Delete Post"
          >
            <DeleteIcon />
          </IconButton>
        )}
      </div>

      {/* Post Content */}
      <div className="mt-4">
        <p className="text-gray-700 dark:text-gray-300 text-lg font-bold">
          {post.title}
        </p>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {post.description}
        </p>
        {post.media && post.media.length > 0 && (
          <div className="mt-4 space-y-4">
            {post.media.map((url, index) => {
              const mediaType = getMediaType(url);
              if (mediaType === "image") {
                return (
                  <img
                    key={index}
                    src={url}
                    alt={`media-${index}`}
                    className="max-w-full h-auto rounded-md mb-2"
                    loading="lazy"
                  />
                );
              } else if (mediaType === "video") {
                return (
                  <video
                    key={index}
                    src={url}
                    controls
                    className="max-w-full h-auto rounded-md mb-2"
                  >
                    Your browser does not support the video tag.
                  </video>
                );
              } else {
                return (
                  <p key={index} className="text-red-500">
                    Unsupported media format.
                  </p>
                );
              }
            })}
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
            <span>{comments.length}</span>
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
            <textarea
              placeholder="Add a comment..."
              className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-800 dark:text-gray-100"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
              rows={3}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="mt-2"
            >
              Comment
            </Button>
          </form>

          {/* Comments List */}
          <div className="mt-4 space-y-3">
            {comments.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                No comments yet.
              </p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment._id}
                  className="flex items-start space-x-2"
                >
                  <img
                    src={
                      comment.commenter?.user_Avatar ||
                      "https://via.placeholder.com/150"
                    }
                    alt="Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex-1">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-800 dark:text-gray-100">
                        {comment.commenter?.first_Name}{" "}
                        {comment.commenter?.last_Name} (
                        {comment.commenter?.employee_Id})
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
                    <p className="text-gray-700 dark:text-gray-300">
                      {typeof comment.comment === 'string' ? comment.comment : JSON.stringify(comment.comment)}
                      {/* Adjust based on actual structure */}
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
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                    <div className="flex items-center mt-1">
                      <button
                        onClick={() => handleLikeComment(comment._id)}
                        className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors duration-300"
                      >
                        <FavoriteIcon
                          className={`text-sm ${
                            (comment.reactions || []).includes(userId)
                              ? "text-red-500"
                              : ""
                          }`}
                        />
                        <span className="text-sm">
                          {(comment.reactions || []).length}
                        </span>
                      </button>
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
            // Define the shape based on actual structure
            text: PropTypes.string,
            // Add other fields if necessary
          })
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
        // Add other fields if necessary
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
  }).isRequired,
};

PostCard.defaultProps = {
  post: {
    comments: [],
    likes: [],
    author: {
      user_Avatar: "https://via.placeholder.com/150",
      first_Name: "Unknown",
      last_Name: "User",
      employee_Id: "N/A",
    },
  },
};

export default PostCard;

