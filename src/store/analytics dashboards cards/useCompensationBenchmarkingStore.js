import { create } from 'zustand';
import axiosInstance from '../../service/axiosInstance'; // adjust path if needed

const useCompensationBenchmarkingStore = create((set) => ({
  data: null,
  loading: false,
  error: null,

  // Fetch data from the server
  fetchCompensationData: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get('/dashboard-card/compensation-benchmarking');
      // The response should have shape: { labels, joiningSalary, currentSalary }
      set({ data: res.data.data, loading: false });
    } catch (err) {
      set({
        error: err?.response?.data?.message || err.message,
        loading: false,
      });
    }
  },
}));

export default useCompensationBenchmarkingStore;
