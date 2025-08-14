import React, { useState, useEffect, useMemo } from "react";
import axiosInstance from "../../../service/axiosInstance";
import useAuthStore from "../../../store/store";
import useFeedStore from "../../../store/feedStore";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import DOMPurify from "dompurify";
import { FaArrowUp } from "react-icons/fa";
import PostCreateBox from "../CreateBox/PostCreateBox";
import useEmployeeStore from "../../../store/useEmployeeStore";
import MediaCarousel from "./MediaCarousel";

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

  const { selectedEmployee, loadingSelectedEmployee, error, loadEmployeeById } = useEmployeeStore();

  const userId = user._id;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
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
  const [showLike, setShowLike] = useState(false);
  const [showReact, setShowReact] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [editPostId, setEditPostId] = useState('');
  const [openPostModal, setOpenPostModal] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [loadingLikes, setLoadingLikes] = useState(new Set());

  useEffect(() => {
    loadEmployeeById(userId)
  }, [userId, loadEmployeeById])

  const permissions = selectedEmployee?.engagement_permission?.permissions || [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".emoji-picker")) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  function linkify(text) {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlPattern, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color:blue; text-decoration:underline;">${url}</a>`;
    });
  }


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

  const handleEditPost = async () => {
    setEditPostId(post._id);
    setOpenPostModal(true)
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

  //   const getMediaType = (url) => {
  //   if (/\.(jpeg|jpg|png|gif|webp|svg)$/i.test(url)) return "image";
  //   if (/\.(mp4|webm|ogg|mov)$/i.test(url)) return "video";
  //   return "unknown";
  // };


  useEffect(() => {
    const scrollableDiv = document.getElementById("scrollableDiv");
    const isModalOpen = showComments || showLike || showReact;

    if (scrollableDiv) {
      scrollableDiv.style.overflow = isModalOpen ? "hidden" : "auto";
    }

    return () => {
      if (scrollableDiv) {
        scrollableDiv.style.overflow = "auto";
      }
    };
  }, [showComments, showLike, showReact]);



  const canDeletePost =
    permissions.includes("deleteAnyPost") ||
    userId === post.author?._id ||
    userId === post.author?.employee_Id;

  const canEditPost =
    permissions.includes("editAnyPost") ||
    userId === post.author?._id ||
    userId === post.author?.employee_Id;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full mx-auto p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors "
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
          {canEditPost && (
            <button onClick={handleEditPost} className="p-1 rounded-full">
              {isDeleting ? (
                <span className="loader h-4 w-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <MdEdit className="w-4 h-4 text-green-600" />
              )}
            </button>
          )}
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
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(linkify(post.description)),
          }}

        />

        {/* Media */}
        {/* {Array.isArray(post.media) && post.media.length > 0 && (
          <div className="mt-3 grid w-max 
                              grid-cols-1 sm:grid-cols-2
                              gap-2
                              mx-auto               
                              place-items-center">    
            {post.media.map((url, idx) => {
              const mediaType = getMediaType(url);

              if (mediaType === 'image') {
                return (
                  <img
                    key={idx}
                    src={url}
                    className="rounded max-h-40 object-cover"
                    alt=""
                  />
                );
              }

              if (mediaType === 'video') {
                return (
                  <video
                    key={idx}
                    src={url}
                    controls
                    className="rounded max-h-32"
                  />
                );
              }

              return (
                <p key={idx} className="text-xs text-red-500">
                  Unsupported media
                </p>
              );
            })}
          </div>
        )} */}

        {/* {Array.isArray(post.media) && post.media.length > 0 && (
  <div className="mt-3">
    <Slider
      dots={true}
      infinite={false}
      speed={500}
      slidesToShow={1}
      slidesToScroll={1}
      className="w-full max-w-md mx-auto"
    >
      {post.media.map((url, idx) => {
        const mediaType = getMediaType(url);

        if (mediaType === "image") {
          return (
            <div key={idx} className="p-2">
              <img
                src={url}
                alt=""
                className="rounded max-h-64 w-full object-contain"
              />
            </div>
          );
        }

        if (mediaType === "video") {
          return (
            <div key={idx} className="p-2">
              <video
                src={url}
                controls
                className="rounded max-h-64 w-full object-contain"
              />
            </div>
          );
        }

        return (
          <div key={idx} className="p-2 text-red-500 text-sm">
            Unsupported media type
          </div>
        );
      })}
    </Slider>
  </div>
)} */}
        {Array.isArray(post.media) && post.media.length > 0 && (
          <MediaCarousel media={post.media} />
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


      {(showComments || showLike || showReact) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[3vh]"
        >
          <motion.div
            initial={{ y: "100%", opacity: 0, boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)" }}
            animate={{ y: 0, opacity: 1, boxShadow: "0px -10px 30px rgba(0, 0, 0, 0.3)" }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full md:w-[400px] h-[58vh] flex flex-col bg-gray-50 dark:bg-gray-900 rounded-t-lg md:rounded-lg border-2 border-slate-200 dark:border-gray-400" >

            <div className="flex justify-between px-3 py-2 border-b-2 border-slate-300 drak:border-gray-400 h-fit overflow-y-auto">
              <p className="font-semibold  text-gray-700 dark:text-gray-300">
                {showComments ? 'Comments...' : showLike ? '' : ''}
              </p>
              <button
                onClick={() => {
                  setShowComments(false);
                  setShowLike(false);
                  setShowReact(false);
                }}
                className="text-black dark:text-gray-400 font-semibold hover:text-gray-500 dark:hover:text-white"
              >
                ✕
              </button>
            </div>
            {/* Comments Drawer */}
            {showComments && (
              <div className="relative h-[50vh] flex flex-col justify-between px-3 py-2">

                {/* Existing Comments */}
                <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-1">
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
                          className={`flex flex-col items-center  text-s ${isLiked ? "text-red-500" : "text-gray-500 dark:text-gray-400"
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
                <form onSubmit={handleAddComment} className=" mt-2 flex items-center  bg-gray-50 dark:bg-gray-800 dark:border-gray-600 border border-slate-200 p-1 rounded-xl gap-2">
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
              <div className="m-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                {/* Header */}
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-t-xl">
                  <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                    Likes ({post.likes.length})
                  </h3>
                </div>

                {/* Content */}
                <div className="max-h-[60vh] overflow-y-auto">
                  {post.likes.length > 0 ? (
                    <div className="p-2">
                      {post.likes.map((like, index) => (
                        <div
                          key={like._id || like}
                          className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'
                            } hover:bg-blue-50 dark:hover:bg-blue-900/20`}
                        >
                          <div className="flex-shrink-0">
                            <img
                              src={like?.user_Avatar || "https://ems11.s3.amazonaws.com/logo-HM+(1).png"}
                              alt="User"
                              className="h-10 w-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                            />
                          </div>
                          <div className="ml-3 flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                              {like.first_Name} {like.last_Name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {like.designation}
                            </p>
                          </div>
                          <div className="flex-shrink-0 ml-2">
                            <div className="w-6 h-6 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                              <span className="text-xs">❤️</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                        <span className="text-2xl">👍</span>
                      </div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                        No likes yet
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        Be the first to like this post!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {showReact && (
              <div className="m-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                {/* Header */}
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-t-xl">
                  <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                    Reactions ({post.reactions.length})
                  </h3>
                </div>

                {/* Content */}
                <div className="max-h-[60vh] overflow-y-auto">
                  {post.reactions.length > 0 ? (
                    <div className="p-2">
                      {post.reactions.map((reaction, index) => (
                        <div
                          key={reaction._id || `${reaction.user._id}-${reaction.type}`}
                          className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'
                            } hover:bg-blue-50 dark:hover:bg-blue-900/20`}
                        >
                          <div className="flex-shrink-0">
                            <img
                              src={reaction?.user.user_Avatar || "https://ems11.s3.amazonaws.com/logo-HM+(1).png"}
                              alt="User"
                              className="h-10 w-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                            />
                          </div>
                          <div className="ml-3 flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                              {reaction.user.first_Name} {reaction.user.last_Name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {reaction.user.designation}
                            </p>
                          </div>
                          <div className="flex-shrink-0 ml-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-sm">
                              <span className="text-sm">
                                {reactionEmojis.find((e) => e.type === reaction.type)?.emoji || "❓"}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                        <span className="text-2xl">😊</span>
                      </div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                        No reactions yet
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        Be the first to react to this post!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

          </motion.div>
        </motion.div>
      )}
      {openPostModal && (
        <PostCreateBox
          isOpen={true}
          editPostId={editPostId}
          onSuccess={() => {
            useFeedStore.getState().clearFeedById();
            setEditPostId("");
            setOpenPostModal(false);
          }}
          onClose={() => {
            useFeedStore.getState().clearFeedById();
            setEditPostId("");
            setOpenPostModal(false)
          }}
        />
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #3b82f6, #8b5cf6);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #2563eb, #7c3aed);
        }
      `}</style>
    </>
  );
};

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostCard;
