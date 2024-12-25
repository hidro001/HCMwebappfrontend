
// src/store/feedStore.js
import { create } from "zustand";
import axiosInstance from "../service/axiosInstance";
import { toast } from "react-toastify";

const useFeedStore = create((set, get) => ({
  feed: [],
  page: 1,
  pages: 1,
  isLoading: false,
  hasMore: true,
  error: null,

  fetchFeed: async (currentPage = 1) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axiosInstance.get("/feed", {
        params: { page: currentPage, limit: 20 },
      });

      if (Array.isArray(response.data.feed)) {
        set((state) => ({
          feed: currentPage === 1 ? response.data.feed : [...state.feed, ...response.data.feed],
          page: response.data.page,
          pages: response.data.pages,
          hasMore: currentPage < response.data.pages,
        }));
      } else {
        console.warn("Feed data is not an array:", response.data.feed);
        set({ error: "Invalid feed data received." });
      }
    } catch (error) {
      console.error("Error fetching feed:", error);
      set({ error: "Failed to load feed. Please try again." });
      toast.error("Failed to load feed. Please try again.");
    } finally {
      set({ isLoading: false });
    }
  },

  refreshFeed: () => {
    set({ feed: [], page: 1, pages: 1, hasMore: true });
    get().fetchFeed(1);
  },

  // Post Methods
  addPost: (post) =>
    set((state) => ({
      feed: [post, ...state.feed],
    })),

  updatePost: (updatedPost) =>
    set((state) => ({
      feed: state.feed.map((post) => (post._id === updatedPost._id ? { ...updatedPost } : post)),
    })),

  deletePost: (postId) =>
    set((state) => ({
      feed: state.feed.filter((post) => post._id !== postId),
    })),

  // Poll Methods
  addPoll: (poll) =>
    set((state) => ({
      feed: [poll, ...state.feed],
    })),

  updatePoll: (updatedPoll) =>
    set((state) => ({
      feed: state.feed.map((poll) => (poll._id === updatedPoll._id ? { ...updatedPoll } : poll)),
    })),

  deletePoll: (pollId) =>
    set((state) => ({
      feed: state.feed.filter((poll) => poll._id !== pollId),
    })),

  // Comment Methods
  addComment: (postId, comment) =>
    set((state) => ({
      feed: state.feed.map((post) =>
        post._id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      ),
    })),

  updateComment: (postId, updatedComment) =>
    set((state) => ({
      feed: state.feed.map((post) =>
        post._id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment._id === updatedComment._id ? { ...updatedComment } : comment
              ),
            }
          : post
      ),
    })),

  deleteComment: (postId, commentId) =>
    set((state) => ({
      feed: state.feed.map((post) =>
        post._id === postId
          ? {
              ...post,
              comments: post.comments.filter((comment) => comment._id !== commentId),
            }
          : post
      ),
    })),

  // **New Methods for Socket.io Events**

  // For updating likes on a post
  updatePostLikes: (postId, likes) =>
    set((state) => ({
      feed: state.feed.map((post) =>
        post._id === postId
          ? { ...post, likes: likes }
          : post
      ),
    })),

  // For adding a comment to a post
  addCommentToPost: (postId, comment) =>
    set((state) => ({
      feed: state.feed.map((post) =>
        post._id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      ),
    })),

  // For updating a comment in a post
  updateCommentInPost: (postId, updatedComment) =>
    set((state) => ({
      feed: state.feed.map((post) =>
        post._id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment._id === updatedComment._id ? { ...updatedComment } : comment
              ),
            }
          : post
      ),
    })),

  // For deleting a comment from a post
  deleteCommentFromPost: (postId, commentId) =>
    set((state) => ({
      feed: state.feed.map((post) =>
        post._id === postId
          ? {
              ...post,
              comments: post.comments.filter((comment) => comment._id !== commentId),
            }
          : post
      ),
    })),

  // **New Method for Updating Poll Votes**
  updatePollVotes: (pollId, userId, optionId) =>
    set((state) => ({
      feed: state.feed.map((poll) => {
        if (poll._id === pollId) {
          // Check if the user has already voted
          const existingVoteIndex = poll.votes.findIndex(
            (vote) => vote.user === userId
          );

          let updatedVotes = [...poll.votes];
          if (existingVoteIndex !== -1) {
            // User has already voted; update their vote
            const existingVote = updatedVotes[existingVoteIndex];
            // Decrement the previous option's vote count
            const previousOption = poll.options.find(
              (opt) => opt._id === existingVote.option
            );
            if (previousOption) {
              previousOption.votes -= 1;
            }
            // Update the vote
            updatedVotes[existingVoteIndex] = { ...existingVote, option: optionId };
          } else {
            // User is voting for the first time
            updatedVotes.push({ user: userId, option: optionId });
          }

          // Increment the new option's vote count
          const newOption = poll.options.find((opt) => opt._id === optionId);
          if (newOption) {
            newOption.votes += 1;
          }

          return { ...poll, votes: updatedVotes };
        }
        return poll;
      }),
    })),
}));

export default useFeedStore;

