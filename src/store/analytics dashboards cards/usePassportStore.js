// src/store/usePassportStore.js
import { create } from 'zustand';
import axiosInstance from '../../service/axiosInstance'; // Adjust path

const usePassportStore = create((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchPassportValidity: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/dashboard-card/passport-validity');
      set({ data: response.data.data, loading: false });
    } catch (err) {
      set({
        error: err?.response?.data?.message || err.message,
        loading: false,
      });
    }
  },
}));

export default usePassportStore;
