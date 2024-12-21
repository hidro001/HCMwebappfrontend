// src/store/pollStore.js
import { create } from 'zustand';
import axiosInstance from '../service/axiosInstance';
import { toast } from 'react-toastify';

const usePollStore = create((set) => ({
  polls: [],
  loading: false,
  error: null,

  fetchPolls: async (page = 1, limit = 10) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/polls?page=${page}&limit=${limit}`);
      set((state) => ({
        polls: page === 1 ? response.data.docs : [...state.polls, ...response.data.docs],
        loading: false,
      }));
    } catch (error) {
      console.error("Error fetching polls:", error);
      set({ error: error.message, loading: false });
      toast.error(error.response?.data?.message || 'Failed to fetch polls.');
    }
  },

  addPoll: (poll) => set((state) => ({
    polls: [poll, ...state.polls],
  })),

  updatePoll: (updatedPoll) => set((state) => ({
    polls: state.polls.map((poll) => poll._id === updatedPoll._id ? updatedPoll : poll),
  })),
}));

export default usePollStore;
