import React, { useState, useEffect, useMemo } from "react";
import axiosInstance from "../../../service/axiosInstance";
import useAuthStore from "../../../store/store";
import useFeedStore from "../../../store/feedStore";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DOMPurify from "dompurify";
import { FaArrowUp } from "react-icons/fa";


const reactionEmojis = [
  { type: "good", emoji: "👍" },
  { type: "love", emoji: "❤️" },
  { type: "laugh", emoji: "😂" },
  { type: "surprised", emoji: "😮" },
  { type: "sad", emoji: "😢" },
  { type: "angry", emoji: "😡" },
];

const PostCard = ({ post }) => {
  const user = useAuthStore((state) => state);
  const userId = user._id;
  const permissions = user.permissionRole || [];
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(() => {
  const userReaction = post.reactions?.find(r => {
    const reactionUserId = typeof r.user === "object" ? r.user._id : r.user;
    return reactionUserId === userId;
  });
  return userReaction?.type || null;
  });
console.log(post.likes, 'df')
  const liked = (post.likes || []).some((likeItem) =>
    typeof likeItem === "string" ? likeItem === userId : likeItem._id === userId
  );
  const likeCount = (post.likes || []).length;

  const [showComments, setShowComments] = useState(false);
  const [showLike, setShowLike] = useState(false);
  const [showReact, setShowReact] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [loadingLikes, setLoadingLikes] = useState(new Set());


  useEffect(() => {
  const handleClickOutside = (e) => {
    if (!e.target.closest(".emoji-picker")) {
      setShowEmojiPicker(false);
    }
  };
  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
}, []);

  const handleLike = async () => {
    setIsLiking(true);
    try {
      let updatedLikes;
      if (liked) {
        updatedLikes = post.likes.filter((likeObj) => likeObj._id !== userId);
      } else {
        updatedLikes = [...post.likes, { _id: userId }];
      }

      useFeedStore.getState().updatePost({
        ...post,
        likes: updatedLikes,
      });

      const { data: updatedPost } = await axiosInstance.post(`/posts/${post._id}/like`);
      useFeedStore.getState().updatePost(updatedPost);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to like/unlike post.");
    } finally {
      setIsLiking(false);
    }
  };

  const handleReact = async (reactionType) => {
  if (isLiking) return;
  setIsLiking(true);

  try {
    const userReaction = post.reactions?.find(r => {
      const reactionUserId = typeof r.user === "object" ? r.user._id : r.user;
      return reactionUserId === userId;
    });

    let updatedReactions;

    if (userReaction && userReaction.type === reactionType) {
      updatedReactions = post.reactions.filter(r => {
        const reactionUserId = typeof r.user === "object" ? r.user._id : r.user;
        return reactionUserId !== userId;
      });
      setSelectedReaction(null);
    } else if (userReaction) {
      updatedReactions = post.reactions.map(r => {
        const reactionUserId = typeof r.user === "object" ? r.user._id : r.user;
        return reactionUserId === userId ? { ...r, type: reactionType } : r;
      });
      setSelectedReaction(reactionType);
    } else {
      updatedReactions = [...(post.reactions || []), {
        user: userId,
        type: reactionType,
        _id: `temp-${Date.now()}`
      }];
      setSelectedReaction(reactionType);
    }
    useFeedStore.getState().updatePost({ ...post, reactions: updatedReactions });

    const { data: updatedPost } = await axiosInstance.post(`/posts/${post._id}/react`, { reactionType });
    useFeedStore.getState().updatePost(updatedPost);
  } catch (error) {
    toast.error("Failed to react to post.");
    console.error(error);
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
      toast.error(error.response?.data?.message || "Failed to delete post.");
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
    if (isAddingComment) return;
    setIsAddingComment(true);
    try {
      const { data } = await axiosInstance.post(`/comments/${post._id}`, {
        comment: commentText,
      });
      const newComment = data.comment;

      if (newComment && newComment.commenter) {
        useFeedStore.getState().addComment(post._id, newComment);
        toast.success("Comment added successfully!");
      }
      setCommentText("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add comment.");
    } finally {
      setIsAddingComment(false);
    }
  };

  const handleToggleComments = () => {
    setShowReact(false)
    setShowLike(false);
    setShowComments(!showComments);
    
  };

  const handleToggleLikes = () => {
    setShowComments(false);
    setShowReact(false)
    setShowLike(!showLike);
  };
  const handleToggleReacts = () => {
      setShowComments(false);
      setShowLike(false);
      setShowReact(!showReact)
  };

  const getLikeSummary = (likes = []) => {
    if (!likes.length) return "";

    const firstUser = likes[0];
    const remainingCount = likes.length - 1;

    const firstName = firstUser ? `${firstUser.first_Name} ${firstUser.last_Name}` : "";

    if (remainingCount === 0) {
      return firstName;
    }

    return `${firstName} and ${remainingCount} other${remainingCount > 1 ? "s" : ""}`;
  };

  const handleLikeComment = async (commentId) => {
    if (loadingLikes.has(commentId)) return;
    setLoadingLikes(prev => new Set(prev).add(commentId));

    try {
      await axiosInstance.post(`/comments/${commentId}/like`);

      const comment = post.comments.find(c => c._id === commentId);
      if (!comment) return;

      const isLiked = comment.reactions.some((r) => {
        const reactionUserId = typeof r.user === 'object' ? r.user._id : r.user;
        return reactionUserId === userId;
      });
      const updatedReactions = isLiked
        ? comment.reactions.filter(r => r.user !== userId)
        : [...comment.reactions, { user: userId, type: "like", _id: `temp-${Date.now()}` }];

      useFeedStore.getState().updateComment(post._id, {
        ...comment,
        reactions: updatedReactions,
      });
    } catch (error) {
      toast.error("Failed to like comment. Please try again.");
    } finally {
      setLoadingLikes(prev => {
        const newSet = new Set(prev);
        newSet.delete(commentId);
        return newSet;
      });
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      await axiosInstance.delete(`/comments/${commentId}`);
      useFeedStore.getState().deleteComment(post._id, commentId);
      toast.success("Comment deleted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete comment.");
    }
  };

  const getMediaType = (url) => {
    if (typeof url !== "string") return "unknown";
    const extension = url.split("?")[0].split(".").pop().toLowerCase();
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "avif"];
    const videoExtensions = ["mp4", "webm", "ogg", "mov", "avi", "wmv"];
    if (imageExtensions.includes(extension)) return "image";
    if (videoExtensions.includes(extension)) return "video";
    return "unknown";
  };

  const canDeletePost =
    permissions.includes("deleteAnyPost") ||
    userId === post.author?._id ||
    userId === post.author?.employee_Id;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-md mx-auto p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors "
      >
        {/* Header */}
        <div className="flex items-center space-x-3 mb-2">
          <img
            src={post.author?.user_Avatar || "https://via.placeholder.com/150"}
            alt="Avatar"
            className="w-9 h-9 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="font-medium text-sm text-gray-900 dark:text-gray-100">
              {post.author?.first_Name} {post.author?.last_Name} ({post.author?.employee_Id})
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {post.author?.designation} •{" "}
              {new Date(post.createdAt).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
          {canDeletePost && (
            <button onClick={handleDeletePost} disabled={isDeleting} className="p-1 rounded-full">
              {isDeleting ? (
                <span className="loader h-4 w-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <MdDelete className="w-4 h-4 text-red-600" />
              )}
            </button>
          )}
        </div>

        {/* Title and Description */}
        <h2
          className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-1"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.title) }}
        />
        <p
          className="text-sm text-gray-700 dark:text-gray-300"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.description) }}
        />

        {/* Media */}
        {Array.isArray(post.media) && post.media.length > 0 && (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {post.media.map((url, idx) => {
              const mediaType = getMediaType(url);
              if (mediaType === "image") {
                return <img key={idx} src={url} className="rounded w-full max-h-40 object-cover" />;
              } else if (mediaType === "video") {
                return <video key={idx} src={url} controls className="rounded w-full max-h-32" />;
              } else {
                return <p key={idx} className="text-xs text-red-500">Unsupported media</p>;
              }
            })}
          </div>
        )}

        {/* Likes & Reactions */}
        <div>
          <div className="flex justify-start items-center mt-3 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center">
            <button onClick={handleLike} disabled={isLiking} className="flex items-center space-x-1">
              {liked ? <AiFillHeart className="text-red-500" /> : <AiOutlineHeart />}
              <span>{likeCount}</span>
              </button>
            </div>
            <div className="relative emoji-picker mx-3">
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker((prev) => !prev)}
                  className=" hover:opacity-100 transition-opacity"
                  title="React"
                >
                  😊
                </button>
                <span onClick={handleToggleReacts} className="text-sm ml-1 text-gray-500 dark:text-gray-300 cursor-pointer">
                  {post.reactions?.length || 0}
                </span>

                {showEmojiPicker && (
                  <div className="absolute z-10 mt-2 left-0 bg-white dark:bg-gray-700 shadow-lg rounded-md p-2 flex space-x-2">
                    {reactionEmojis.map(({ type, emoji }) => (
                      <button
                        key={type}
                        onClick={() => {
                          handleReact(type);
                          setShowEmojiPicker(false);
                        }}
                        className="text-xl hover:scale-110 transition-transform"
                        title={type}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            <button onClick={handleToggleComments} className="flex items-center space-x-1 mx-1">
              <FaRegComment />
              <span>{post.comments.length}</span>
            </button>
          </div>
           <span onClick={handleToggleLikes} className="text-xs pl-1 truncate max-w-[150px] cursor-pointer">Like by {getLikeSummary(post.likes)}...</span>
        </div>
      </motion.div>

      {/* Comments Drawer */}
     {showComments && (
          <div className="mt-4 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
            <p className="font-semibold text-gray-700 dark:text-gray-300">
              Comments 
            </p>

        {/* Existing Comments */}
        <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
          {(!post.comments || post.comments.length === 0) && (
            <p className="text-sm text-gray-500 dark:text-gray-400">No comments yet.</p>
          )}
          {post.comments?.map((comment) => {
            const isLiked = comment.reactions.some((r) => r.user === userId);
            const likeCount = comment.reactions.filter((r) => r.type === "like").length;
            const isLoading = loadingLikes.has(comment._id);

            return (
              <div
                key={comment._id}
                className="flex items-start justify-between text-sm text-gray-700 dark:text-gray-200"
              >
                <div className="flex items-start gap-2">
                  <img
                    src={comment.commenter?.user_Avatar}
                    alt="User"
                    className="h-8 w-8 rounded-full object-cover border"
                  />
                  <div>
                    <p className="font-bold">
                      {comment.commenter?.first_Name} {comment.commenter?.last_Name}
                    </p>
                    <p>{typeof comment.comment === "string" ? comment.comment : JSON.stringify(comment.comment)}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleLikeComment(comment._id)}
                  disabled={isLoading}
                  className={`flex items-center gap-1 text-xs ${
                    isLiked ? "text-red-500" : "text-gray-500 dark:text-gray-400"
                  } ${isLoading && "opacity-50 cursor-not-allowed"}`}
                >
                  {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                  {likeCount > 0 && <span>{likeCount}</span>}
                </button>
              </div>
            );
          })}
        </div>

        {/* Add Comment Form */}
        <form onSubmit={handleAddComment} className="flex items-center gap-2 mt-2">
          <img
            src={user.userAvatar || "https://ems11.s3.amazonaws.com/logo-HM+(1).png"}
            alt="Avatar"
            className="h-8 w-8 rounded-full object-cover border"
          />
          <textarea
            rows={1}
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1 p-2 rounded dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm resize-none"
            required
          />
          <button
            type="submit"
            disabled={isAddingComment}
            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            {isAddingComment ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <FaArrowUp />
            )}
          </button>
        </form>
       </div>
      )}
      {showLike && (
        <div className="mt-4 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
          <p>Likes...</p>
          {post.likes.length > 0 && post.likes.map((like) =>(
            <div className="flex items-center">
            <img
                    src={like?.user_Avatar}
                    alt="User"
                    className="h-7 w-7 rounded-full object-cover mr-2 border"
                  />
                  <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {like.first_Name} {like.last_Name}
            </p> <p className="text-xs">{like.designation}</p></div>
            </div>
          ))}
        </div>
      )}
      {showReact && (
        <div className="mt-4 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
          <p>Reaction...</p>
          {post.reactions.length > 0 && post.reactions.map((reaction) =>(
           <div className="flex justify-between">
            <div className="flex items-center">
            <img
                src={reaction?.user.user_Avatar}
                alt="User"
                className="h-7 w-7 rounded-full object-cover mr-2 border"
            />
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {reaction.user.first_Name} {reaction.user.last_Name}
              </p> 
              <p className="text-xs">{reaction.user.designation}</p></div>
              
            </div>
            <div className=" border rounded-full bg-slate-500  text-white text-sm flex items-center justify-center w-8 h-8">
                {reactionEmojis.find((e) => e.type === reaction.type)?.emoji || "❓"}
             </div>
             </div>
          ))}
        </div>
      )}
    </>
  );
};

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostCard;
