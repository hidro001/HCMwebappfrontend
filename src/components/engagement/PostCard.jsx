import React, { useState, useMemo } from "react";
import axiosInstance from "../../service/axiosInstance";
import useAuthStore from "../../store/store";
import useFeedStore from "../../store/feedStore";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DOMPurify from "dompurify";
import CommentDrawer from "./Comment";

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

  const [selectedReaction, setSelectedReaction] = useState(() => {
  const userReaction = post.reactions?.find(r => {
    const reactionUserId = typeof r.user === "object" ? r.user._id : r.user;
    return reactionUserId === userId;
  });
  return userReaction?.type || null;
  });

  const liked = (post.likes || []).some((likeItem) =>
    typeof likeItem === "string" ? likeItem === userId : likeItem._id === userId
  );
  const likeCount = (post.likes || []).length;

  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [loadingLikes, setLoadingLikes] = useState(new Set());

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
      // Same reaction clicked again → remove
      updatedReactions = post.reactions.filter(r => {
        const reactionUserId = typeof r.user === "object" ? r.user._id : r.user;
        return reactionUserId !== userId;
      });
      setSelectedReaction(null);
    } else if (userReaction) {
      // Update to new reaction
      updatedReactions = post.reactions.map(r => {
        const reactionUserId = typeof r.user === "object" ? r.user._id : r.user;
        return reactionUserId === userId ? { ...r, type: reactionType } : r;
      });
      setSelectedReaction(reactionType);
    } else {
      // New reaction
      updatedReactions = [...(post.reactions || []), {
        user: userId,
        type: reactionType,
        _id: `temp-${Date.now()}`
      }];
      setSelectedReaction(reactionType);
    }

    // Optimistic UI update
    useFeedStore.getState().updatePost({ ...post, reactions: updatedReactions });

    // Sync with backend
    const { data: updatedPost } = await axiosInstance.post(`/posts/${post._id}/react`, { reactionType });

    // Replace with fresh data from server
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
    setShowComments(!showComments);
  };

  const getLikeSummary = (likes = [], maxDisplay = 2) => {
  if (!likes.length) return "";

  const displayNames = likes
    .slice(0, maxDisplay)
    .map((u) => `${u.first_Name} ${u.last_Name}`);

  const remainingCount = likes.length - displayNames.length;

  if (remainingCount === 0) {
    return displayNames.join(" and ");
  }

  return `${displayNames.join(", ")} and ${remainingCount} other${remainingCount > 1 ? "s" : ""}`;
};

  const handleLikeComment = async (commentId) => {
    if (loadingLikes.has(commentId)) return;
    setLoadingLikes(prev => new Set(prev).add(commentId));

    try {
      await axiosInstance.post(`/comments/${commentId}/like`);

      const comment = post.comments.find(c => c._id === commentId);
      if (!comment) return;

      const isLiked = comment.reactions.some(r => r.user === userId);

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
        className="max-w-lg mx-auto p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors border border-green-300 dark:border-green-700"
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
        <div className="flex justify-between items-center mt-3 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center">
          <button onClick={handleLike} disabled={isLiking} className="flex items-center space-x-1">
            {liked ? <AiFillHeart className="text-red-500" /> : <AiOutlineHeart />}
            <span>{likeCount}</span>
            </button>
            <span className="text-xs pl-1 truncate max-w-[150px]">{getLikeSummary(post.likes)}</span>
          </div>
          <div className="flex space-x-2">
            {reactionEmojis.map(({ type, emoji }) => {
              const count = (post.reactions || []).filter((r) => r.type === type).length;
              const isActive = selectedReaction === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleReact(type)}
                  disabled={isLiking}
                  aria-pressed={isActive}
                  className={`text-xl ${isActive ? "opacity-100" : "opacity-60"} hover:opacity-100 transition-opacity`}
                  title={type}
                >
                  {emoji} {count > 0 && <span className="text-xs ml-1">{count}</span>}
                </button>
              );
            })}
          </div>

          <button onClick={handleToggleComments} className="flex items-center space-x-1">
            <FaRegComment />
            <span>{post.comments.length}</span>
          </button>
        </div>
      </motion.div>

      {/* Comments Drawer */}
      {showComments && (
        <CommentDrawer
          post={post}
          commentText={commentText}
          setCommentText={setCommentText}
          isAddingComment={isAddingComment}
          onAddComment={handleAddComment}
          onClose={() => setShowComments(false)}
          onLikeComment={handleLikeComment}
          loadingLikes={loadingLikes}
        />
      )}
    </>
  );
};

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostCard;
