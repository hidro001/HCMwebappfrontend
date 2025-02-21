import { create } from 'zustand';
import axiosInstance from '../../service/axiosInstance'; // or your axios setup

const useVerificationStatsStore = create((set) => ({
  data: null, // => [ { department, backgroundCleared, backgroundPending, policeCleared, policePending }, ...]
  loading: false,
  error: null,

  fetchVerificationStats: async () => {
    set({ loading: true, error: null, data: null });
    try {
      const res = await axiosInstance.get('/dashboard-card/verification-department-stats');
      set({
        data: res.data.data, 
        loading: false,
      });
    } catch (err) {
      set({
        error: err?.response?.data?.message || err.message,
        loading: false,
        data: null,
      });
    }
  },
}));

export default useVerificationStatsStore;
