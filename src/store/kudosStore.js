// src/store/kudosStore.js
import { create } from 'zustand';
import axiosInstance from '../service/axiosInstance';
import { toast } from 'react-toastify';

const useKudosStore = create((set) => ({
  kudos: [],
  loading: false,
  error: null,

  fetchKudos: async (page = 1, limit = 10) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/kudos?page=${page}&limit=${limit}`);
      set((state) => ({
        kudos: page === 1 ? response.data.docs : [...state.kudos, ...response.data.docs],
        loading: false,
      }));
    } catch (error) {
      console.error("Error fetching kudos:", error);
      set({ error: error.message, loading: false });
      toast.error(error.response?.data?.message || 'Failed to fetch kudos.');
    }
  },

  addKudos: (kudos) => set((state) => ({
    kudos: [kudos, ...state.kudos],
  })),
}));

export default useKudosStore;
