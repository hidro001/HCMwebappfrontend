// src/store/postStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axiosInstance from '../service/axiosInstance';
import { toast } from 'react-toastify';

const usePostStore = create(
  persist(
    (set, get) => ({
      posts: [],
      loading: false,
      error: null,

      fetchPosts: async (page = 1, limit = 10) => {
        set({ loading: true });
        try {
          const response = await axiosInstance.get(`/posts?page=${page}&limit=${limit}`);
          set((state) => ({
            posts: page === 1 ? response.data.docs : [...state.posts, ...response.data.docs],
            loading: false,
          }));
        } catch (error) {
          console.error("Error fetching posts:", error);
          set({ error: error.message, loading: false });
          toast.error(error.response?.data?.message || 'Failed to fetch posts.');
        }
      },

      addPost: (post) => set((state) => ({
        posts: [post, ...state.posts],
      })),

      updatePost: (updatedPost) => set((state) => ({
        posts: state.posts.map((post) => post._id === updatedPost._id ? updatedPost : post),
      })),

      deletePost: (postId) => set((state) => ({
        posts: state.posts.filter((post) => post._id !== postId),
      })),
    }),
    {
      name: "post-storage", // unique name
    }
  )
);

export default usePostStore;
