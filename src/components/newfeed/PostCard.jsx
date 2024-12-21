

// // src/components/PostCard.js
// import React, { useState } from "react";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// import { motion } from "framer-motion";

// const PostCard = ({ post }) => {
//   const [liked, setLiked] = useState(false);
//   const [showComments, setShowComments] = useState(false);

//   return (
//     <motion.div
//       whileHover={{ scale: 1.02 }}
//       className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl mb-6 p-6 transition-transform duration-300"
//     >
//       <div className="flex items-center space-x-4">
//         <img src={post.avatar} alt="Avatar" className="w-12 h-12 rounded-full" />
//         <div>
//           <p className="font-semibold text-lg text-gray-800 dark:text-gray-100">{post.user}</p>
//           <p className="text-sm text-gray-500 dark:text-gray-400">{post.time}</p>
//         </div>
//       </div>
//       {post.image && (
//         <img
//           src={post.image}
//           alt="Post"
//           className="w-full rounded-xl mt-4 object-cover"
//         />
//       )}
//       <p className="mt-4 text-gray-700 dark:text-gray-300">{post.text}</p>
//       <div className="flex justify-between items-center mt-4">
//         <div className="flex space-x-6">
//           <button
//             onClick={() => setLiked(!liked)}
//             className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors duration-300"
//           >
//             <FavoriteIcon className={`${liked ? "text-red-500" : ""}`} />
//             <span>{liked ? post.likes + 1 : post.likes}</span>
//           </button>
//           <button
//             onClick={() => setShowComments(!showComments)}
//             className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300"
//           >
//             <ChatBubbleOutlineIcon />
//             <span>{post.comments.length}</span>
//           </button>
//         </div>
//       </div>
//       {showComments && (
//         <motion.div
//           initial={{ height: 0, opacity: 0 }}
//           animate={{ height: "auto", opacity: 1 }}
//           className="mt-4 overflow-hidden"
//         >
//           <h3 className="font-semibold text-gray-800 dark:text-gray-100">Comments</h3>
//           {post.comments.map((comment, index) => (
//             <div key={index} className="mt-3 border-t dark:border-gray-700 pt-3">
//               <p className="text-sm text-gray-700 dark:text-gray-300">
//                 <span className="font-semibold">{comment.user}</span>: {comment.text}
//               </p>
//             </div>
//           ))}
//           <div className="mt-4">
//             <textarea
//               placeholder="Add a comment..."
//               className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-800 dark:text-gray-100"
//             />
//             <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
//               Comment
//             </button>
//           </div>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };

// export default PostCard;

// // src/components/PostCard.js
// import React, { useState, useEffect } from "react";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { motion } from "framer-motion";
// import axiosInstance from "../../service/axiosInstance";
// import useAuthStore from "../../store/store";
// import { Badge } from "@mui/material";

// const PostCard = ({ post, socket }) => {
//   const user = useAuthStore((state) => state);
//   const userId = user._id || user.employeeId; // Initialize userId first
//   const permissions = user.permissions || [];

//   const [liked, setLiked] = useState(post.likes.includes(userId));
//   const [likeCount, setLikeCount] = useState(post.likes.length);
//   const [showComments, setShowComments] = useState(false);
//   const [comments, setComments] = useState(post.comments || []);
//   const [commentText, setCommentText] = useState("");
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [isLiking, setIsLiking] = useState(false);

//   useEffect(() => {
//     // Listen for real-time updates for this specific post
//     const handleNewComment = (newComment) => {
//       if (newComment.postId === post._id) {
//         setComments((prevComments) => [newComment, ...prevComments]);
//       }
//     };

//     const handleUpdatePost = (updatedPost) => {
//       if (updatedPost._id === post._id) {
//         setLikeCount(updatedPost.likes.length);
//         setLiked(updatedPost.likes.includes(userId));
//       }
//     };

//     const handleDeletePost = ({ postId }) => {
//       if (postId === post._id) {
//         // Optionally, handle post deletion here
//         // For example, you might want to remove the post from the parent component
//       }
//     };

//     socket.on("newComment", handleNewComment);
//     socket.on("updatePost", handleUpdatePost);
//     socket.on("deletePost", handleDeletePost);

//     return () => {
//       socket.off("newComment", handleNewComment);
//       socket.off("updatePost", handleUpdatePost);
//       socket.off("deletePost", handleDeletePost);
//     };
//   }, [socket, post._id, userId]);

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
//       // Emit real-time update
//       socket.emit("likePost", { postId: post._id, userId });
//     } catch (error) {
//       console.error("Error liking post:", error);
//       // Optionally, revert UI changes or notify the user
//     } finally {
//       setIsLiking(false);
//     }
//   };

//   const handleDeletePost = async () => {
//     if (!window.confirm("Are you sure you want to delete this post?")) return;
//     setIsDeleting(true);
//     try {
//       await axiosInstance.delete(`/posts/${post._id}`);
//       // Emit real-time deletion
//       socket.emit("deletePost", { postId: post._id });
//       // Optionally, remove the post from the UI (handled by real-time event)
//     } catch (error) {
//       console.error("Error deleting post:", error);
//       // Optionally, notify the user
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
//       setCommentText("");
//       // The new comment will be added via real-time event
//       // Emit real-time event for new comment
//       socket.emit("newComment", response.data.comment);
//     } catch (error) {
//       console.error("Error adding comment:", error);
//       // Optionally, notify the user
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
//       setComments(response.data.docs || []);
//     } catch (error) {
//       console.error("Error fetching comments:", error);
//       // Optionally, notify the user
//     }
//   };

//   const handleLikeComment = async (commentId) => {
//     try {
//       await axiosInstance.post(`/comments/${commentId}/like`);
//       // Optimistic UI update
//       setComments((prevComments) =>
//         prevComments.map((comment) => {
//           if (comment._id === commentId) {
//             const isLiked = comment.reactions.includes(userId);
//             if (isLiked) {
//               return {
//                 ...comment,
//                 reactions: comment.reactions.filter((id) => id !== userId),
//               };
//             } else {
//               return {
//                 ...comment,
//                 reactions: [...comment.reactions, userId],
//               };
//             }
//           }
//           return comment;
//         })
//       );
//       // Emit real-time update
//       socket.emit("likeComment", { commentId, userId });
//     } catch (error) {
//       console.error("Error liking comment:", error);
//       // Optionally, revert UI changes or notify the user
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     if (!window.confirm("Are you sure you want to delete this comment?")) return;
//     try {
//       await axiosInstance.delete(`/comments/${commentId}`);
//       setComments((prevComments) => prevComments.filter((c) => c._id !== commentId));
//       // Emit real-time deletion
//       socket.emit("deleteComment", { commentId });
//     } catch (error) {
//       console.error("Error deleting comment:", error);
//       // Optionally, notify the user
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
//           src={post.author.userAvatar || "https://via.placeholder.com/150"}
//           alt="Avatar"
//           className="w-12 h-12 rounded-full"
//         />
//         <div>
//           <p className="font-semibold text-lg text-gray-800 dark:text-gray-100">
//             {post.author.userName}
//           </p>
//           <p className="text-sm text-gray-500 dark:text-gray-400">
//             {new Date(post.createdAt).toLocaleString()}
//           </p>
//         </div>
//         {(permissions.includes("deleteAnyPost") ||
//           userId === post.author._id ||
//           userId === post.author.employeeId) && (
//           <button
//             onClick={handleDeletePost}
//             disabled={isDeleting}
//             className="ml-auto text-red-500 hover:text-red-700 transition-colors duration-300"
//             title="Delete Post"
//           >
//             <DeleteIcon />
//           </button>
//         )}
//       </div>

//       {/* Post Content */}
//       <div className="mt-4">
//         <p className="text-gray-700 dark:text-gray-300">{post.title}</p>
//         <p className="mt-2 text-gray-600 dark:text-gray-400">{post.description}</p>
//         {post.media && post.media.length > 0 && (
//           <div className="mt-4">
//             {post.media.map((url, index) => (
//               <img
//                 key={index}
//                 src={url}
//                 alt={`media-${index}`}
//                 className="w-full rounded-md mb-2"
//               />
//             ))}
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
//           <h3 className="font-semibold text-gray-800 dark:text-gray-100">Comments</h3>
//           <form onSubmit={handleAddComment} className="mt-2 flex flex-col">
//             <textarea
//               placeholder="Add a comment..."
//               className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-800 dark:text-gray-100"
//               value={commentText}
//               onChange={(e) => setCommentText(e.target.value)}
//               required
//               rows={3}
//             />
//             <button
//               type="submit"
//               className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
//             >
//               Comment
//             </button>
//           </form>

//           {/* Comments List */}
//           <div className="mt-4 space-y-3">
//             {comments.length === 0 ? (
//               <p className="text-gray-500 dark:text-gray-400">No comments yet.</p>
//             ) : (
//               comments.map((comment) => (
//                 <div key={comment._id} className="flex items-start space-x-2">
//                   <img
//                     src={comment.commenter.userAvatar || "https://via.placeholder.com/150"}
//                     alt="Avatar"
//                     className="w-8 h-8 rounded-full"
//                   />
//                   <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex-1">
//                     <div className="flex justify-between">
//                       <span className="font-semibold text-gray-800 dark:text-gray-100">
//                         {comment.commenter.userName || "Anonymous"}
//                       </span>
//                       {(permissions.includes("deleteAnyComment") ||
//                         userId === comment.commenter._id) && (
//                         <button
//                           onClick={() => handleDeleteComment(comment._id)}
//                           className="text-red-500 hover:text-red-700 transition-colors duration-300"
//                           title="Delete Comment"
//                         >
//                           <DeleteIcon fontSize="small" />
//                         </button>
//                       )}
//                     </div>
//                     <p className="text-gray-700 dark:text-gray-300">{comment.comment}</p>
//                     <div className="flex items-center mt-1">
//                       <button
//                         onClick={() => handleLikeComment(comment._id)}
//                         className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors duration-300"
//                       >
//                         <FavoriteIcon
//                           className={`text-sm ${
//                             comment.reactions.includes(userId) ? "text-red-500" : ""
//                           }`}
//                         />
//                         <span className="text-sm">{comment.reactions.length}</span>
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

// export default PostCard;

// // src/components/PostCard.js
// import React, { useState, useEffect } from "react";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { motion } from "framer-motion";
// import axiosInstance from "../../service/axiosInstance";
// import useAuthStore from "../../store/store";
// import { Badge } from "@mui/material";

// const PostCard = ({ post, socket }) => {
//   const user = useAuthStore((state) => state);
//   const userId = user._id || user.employeeId; // Initialize userId first
//   const permissions = user.permissions || [];

//   const [liked, setLiked] = useState(post.likes.includes(userId));
//   const [likeCount, setLikeCount] = useState(post.likes.length);
//   const [showComments, setShowComments] = useState(false);
//   const [comments, setComments] = useState(post.comments || []);
//   const [commentText, setCommentText] = useState("");
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [isLiking, setIsLiking] = useState(false);

//   useEffect(() => {
//     // Listen for real-time updates for this specific post
//     const handleNewComment = (newComment) => {
//       if (newComment.postId === post._id) {
//         setComments((prevComments) => [newComment, ...prevComments]);
//       }
//     };

//     const handleUpdatePost = (updatedPost) => {
//       if (updatedPost._id === post._id) {
//         setLikeCount(updatedPost.likes.length);
//         setLiked(updatedPost.likes.includes(userId));
//       }
//     };

//     const handleDeletePost = ({ postId }) => {
//       if (postId === post._id) {
//         // Optionally, handle post deletion here
//         // For example, you might want to remove the post from the parent component
//       }
//     };

//     socket.on("newComment", handleNewComment);
//     socket.on("updatePost", handleUpdatePost);
//     socket.on("deletePost", handleDeletePost);

//     return () => {
//       socket.off("newComment", handleNewComment);
//       socket.off("updatePost", handleUpdatePost);
//       socket.off("deletePost", handleDeletePost);
//     };
//   }, [socket, post._id, userId]);

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
//       // Emit real-time update
//       socket.emit("likePost", { postId: post._id, userId });
//     } catch (error) {
//       console.error("Error liking post:", error);
//       // Optionally, revert UI changes or notify the user
//     } finally {
//       setIsLiking(false);
//     }
//   };

//   const handleDeletePost = async () => {
//     if (!window.confirm("Are you sure you want to delete this post?")) return;
//     setIsDeleting(true);
//     try {
//       await axiosInstance.delete(`/posts/${post._id}`);
//       // Emit real-time deletion
//       socket.emit("deletePost", { postId: post._id });
//       // Optionally, remove the post from the UI (handled by real-time event)
//     } catch (error) {
//       console.error("Error deleting post:", error);
//       // Optionally, notify the user
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
//       setCommentText("");
//       // The new comment will be added via real-time event
//       // Emit real-time event for new comment
//       socket.emit("newComment", response.data.comment);
//     } catch (error) {
//       console.error("Error adding comment:", error);
//       // Optionally, notify the user
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
//       setComments(response.data.docs || []);
//     } catch (error) {
//       console.error("Error fetching comments:", error);
//       // Optionally, notify the user
//     }
//   };

//   const handleLikeComment = async (commentId) => {
//     try {
//       await axiosInstance.post(`/comments/${commentId}/like`);
//       // Optimistic UI update
//       setComments((prevComments) =>
//         prevComments.map((comment) => {
//           if (comment._id === commentId) {
//             const isLiked = comment.reactions.includes(userId);
//             if (isLiked) {
//               return {
//                 ...comment,
//                 reactions: comment.reactions.filter((id) => id !== userId),
//               };
//             } else {
//               return {
//                 ...comment,
//                 reactions: [...comment.reactions, userId],
//               };
//             }
//           }
//           return comment;
//         })
//       );
//       // Emit real-time update
//       socket.emit("likeComment", { commentId, userId });
//     } catch (error) {
//       console.error("Error liking comment:", error);
//       // Optionally, revert UI changes or notify the user
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     if (!window.confirm("Are you sure you want to delete this comment?")) return;
//     try {
//       await axiosInstance.delete(`/comments/${commentId}`);
//       setComments((prevComments) => prevComments.filter((c) => c._id !== commentId));
//       // Emit real-time deletion
//       socket.emit("deleteComment", { commentId });
//     } catch (error) {
//       console.error("Error deleting comment:", error);
//       // Optionally, notify the user
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
//           src={post.author.user_Avatar || "https://via.placeholder.com/150"}
//           alt="Avatar"
//           className="w-12 h-12 rounded-full"
//         />
//         <div>
//           <p className="font-semibold text-lg text-gray-800 dark:text-gray-100">
//             {post.author.first_Name} {post.author.last_Name} ({post.author.employee_Id})
//           </p>
//           <p className="text-sm text-gray-500 dark:text-gray-400">
//             {new Date(post.createdAt).toLocaleString()}
//           </p>
//         </div>
//         {(permissions.includes("deleteAnyPost") ||
//           userId === post.author._id ||
//           userId === post.author.employeeId) && (
//           <button
//             onClick={handleDeletePost}
//             disabled={isDeleting}
//             className="ml-auto text-red-500 hover:text-red-700 transition-colors duration-300"
//             title="Delete Post"
//           >
//             <DeleteIcon />
//           </button>
//         )}
//       </div>

//       {/* Post Content */}
//       <div className="mt-4">
//         <p className="text-gray-700 dark:text-gray-300 text-lg font-bold">{post.title}</p>
//         <p className="mt-2 text-gray-600 dark:text-gray-400">{post.description}</p>
//         {post.media && post.media.length > 0 && (
//           <div className="mt-4">
//             {post.media.map((url, index) => (
//               <img
//                 key={index}
//                 src={url}
//                 alt={`media-${index}`}
//                 className="w-full rounded-md mb-2"
//                 loading="lazy" // Optional: for lazy loading
//               />
//             ))}
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
//           <h3 className="font-semibold text-gray-800 dark:text-gray-100">Comments</h3>
//           <form onSubmit={handleAddComment} className="mt-2 flex flex-col">
//             <textarea
//               placeholder="Add a comment..."
//               className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-800 dark:text-gray-100"
//               value={commentText}
//               onChange={(e) => setCommentText(e.target.value)}
//               required
//               rows={3}
//             />
//             <button
//               type="submit"
//               className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
//             >
//               Comment
//             </button>
//           </form>

//           {/* Comments List */}
//           <div className="mt-4 space-y-3">
//             {comments.length === 0 ? (
//               <p className="text-gray-500 dark:text-gray-400">No comments yet.</p>
//             ) : (
//               comments.map((comment) => (
//                 <div key={comment._id} className="flex items-start space-x-2">
//                   <img
//                     src={comment.commenter.user_Avatar || "https://via.placeholder.com/150"}
//                     alt="Avatar"
//                     className="w-8 h-8 rounded-full"
//                   />
//                   <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex-1">
//                     <div className="flex justify-between">
//                       <span className="font-semibold text-gray-800 dark:text-gray-100">
//                         {comment.commenter.first_Name} {comment.commenter.last_Name} ({comment.commenter.employee_Id})
//                       </span>
//                       {(permissions.includes("deleteAnyComment") ||
//                         userId === comment.commenter._id ||
//                         userId === comment.commenter.employee_Id) && (
//                         <button
//                           onClick={() => handleDeleteComment(comment._id)}
//                           className="text-red-500 hover:text-red-700 transition-colors duration-300"
//                           title="Delete Comment"
//                         >
//                           <DeleteIcon fontSize="small" />
//                         </button>
//                       )}
//                     </div>
//                     <p className="text-gray-700 dark:text-gray-300">{comment.comment}</p>
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
//                             comment.reactions.includes(userId) ? "text-red-500" : ""
//                           }`}
//                         />
//                         <span className="text-sm">{comment.reactions.length}</span>
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

// export default PostCard;

// src/components/PostCard.js
import React, { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";
import axiosInstance from "../../service/axiosInstance";
import useAuthStore from "../../store/store";
import { Badge } from "@mui/material";

const PostCard = ({ post, socket }) => {
  const user = useAuthStore((state) => state);
  const userId = user._id || user.employeeId; // Initialize userId first
  const permissions = user.permissions || [];

  const [liked, setLiked] = useState(post.likes.includes(userId));
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    // Listen for real-time updates for this specific post
    const handleNewComment = (newComment) => {
      if (newComment.postId === post._id) {
        setComments((prevComments) => [newComment, ...prevComments]);
      }
    };

    const handleUpdatePost = (updatedPost) => {
      if (updatedPost._id === post._id) {
        setLikeCount(updatedPost.likes.length);
        setLiked(updatedPost.likes.includes(userId));
      }
    };

    const handleDeletePost = ({ postId }) => {
      if (postId === post._id) {
        // Optionally, handle post deletion here
        // For example, you might want to remove the post from the parent component
      }
    };

    socket.on("newComment", handleNewComment);
    socket.on("updatePost", handleUpdatePost);
    socket.on("deletePost", handleDeletePost);

    return () => {
      socket.off("newComment", handleNewComment);
      socket.off("updatePost", handleUpdatePost);
      socket.off("deletePost", handleDeletePost);
    };
  }, [socket, post._id, userId]);

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
      // Emit real-time update
      socket.emit("likePost", { postId: post._id, userId });
    } catch (error) {
      console.error("Error liking post:", error);
      // Optionally, revert UI changes or notify the user
    } finally {
      setIsLiking(false);
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    setIsDeleting(true);
    try {
      await axiosInstance.delete(`/posts/${post._id}`);
      // Emit real-time deletion
      socket.emit("deletePost", { postId: post._id });
      // Optionally, remove the post from the UI (handled by real-time event)
    } catch (error) {
      console.error("Error deleting post:", error);
      // Optionally, notify the user
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
      setCommentText("");
      // The new comment will be added via real-time event
      // Emit real-time event for new comment
      socket.emit("newComment", response.data.comment);
    } catch (error) {
      console.error("Error adding comment:", error);
      // Optionally, notify the user
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
      setComments(response.data.docs || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
      // Optionally, notify the user
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      await axiosInstance.post(`/comments/${commentId}/like`);
      // Optimistic UI update
      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment._id === commentId) {
            const isLiked = comment.reactions.includes(userId);
            if (isLiked) {
              return {
                ...comment,
                reactions: comment.reactions.filter((id) => id !== userId),
              };
            } else {
              return {
                ...comment,
                reactions: [...comment.reactions, userId],
              };
            }
          }
          return comment;
        })
      );
      // Emit real-time update
      socket.emit("likeComment", { commentId, userId });
    } catch (error) {
      console.error("Error liking comment:", error);
      // Optionally, revert UI changes or notify the user
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      await axiosInstance.delete(`/comments/${commentId}`);
      setComments((prevComments) => prevComments.filter((c) => c._id !== commentId));
      // Emit real-time deletion
      socket.emit("deleteComment", { commentId });
    } catch (error) {
      console.error("Error deleting comment:", error);
      // Optionally, notify the user
    }
  };

  // Utility function to determine media type
  const getMediaType = (url) => {
    const extension = url.split(".").pop().toLowerCase();
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
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
      className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl mb-6 p-6 transition-colors duration-300"
    >
      {/* Post Header */}
      <div className="flex items-center space-x-4">
        <img
          src={post.author.user_Avatar || "https://via.placeholder.com/150"}
          alt="Avatar"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="font-semibold text-lg text-gray-800 dark:text-gray-100">
            {post.author.first_Name} {post.author.last_Name} ({post.author.employee_Id})
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
        {(permissions.includes("deleteAnyPost") ||
          userId === post.author._id ||
          userId === post.author.employeeId) && (
          <button
            onClick={handleDeletePost}
            disabled={isDeleting}
            className="ml-auto text-red-500 hover:text-red-700 transition-colors duration-300"
            title="Delete Post"
          >
            <DeleteIcon />
          </button>
        )}
      </div>

      {/* Post Content */}
      <div className="mt-4">
        <p className="text-gray-700 dark:text-gray-300 text-lg font-bold">{post.title}</p>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{post.description}</p>
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
                // Optionally, generate a thumbnail URL if available
                // const thumbnailUrl = url.replace(/video\/upload/, "video/upload/q_auto,f_auto,c_fill,w_300,h_200");
                return (
                  <video
                    key={index}
                    src={url}
                    controls
                    // poster={thumbnailUrl} // Uncomment if you have a thumbnail
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
          <h3 className="font-semibold text-gray-800 dark:text-gray-100">Comments</h3>
          <form onSubmit={handleAddComment} className="mt-2 flex flex-col">
            <textarea
              placeholder="Add a comment..."
              className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-800 dark:text-gray-100"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
              rows={3}
            />
            <button
              type="submit"
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Comment
            </button>
          </form>

          {/* Comments List */}
          <div className="mt-4 space-y-3">
            {comments.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No comments yet.</p>
            ) : (
              comments.map((comment) => (
                <div key={comment._id} className="flex items-start space-x-2">
                  <img
                    src={comment.commenter.user_Avatar || "https://via.placeholder.com/150"}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex-1">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-800 dark:text-gray-100">
                        {comment.commenter.first_Name} {comment.commenter.last_Name} ({comment.commenter.employee_Id})
                      </span>
                      {(permissions.includes("deleteAnyComment") ||
                        userId === comment.commenter._id ||
                        userId === comment.commenter.employee_Id) && (
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-300"
                          title="Delete Comment"
                        >
                          <DeleteIcon fontSize="small" />
                        </button>
                      )}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{comment.comment}</p>
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
                            comment.reactions.includes(userId) ? "text-red-500" : ""
                          }`}
                        />
                        <span className="text-sm">{comment.reactions.length}</span>
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

export default PostCard;

