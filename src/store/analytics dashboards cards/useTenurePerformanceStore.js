import { create } from 'zustand';
import axiosInstance from '../../service/axiosInstance'; // Adjust path to your setup

const useTenurePerformanceStore = create((set) => ({
  data: null,      // Will be an array of objects: [ { department, tenureRange, averageScore }, ... ]
  loading: false,  // Track loading state
  error: null,     // Track any error message

  fetchTenurePerformance: async () => {
    set({ loading: true, error: null, data: null });
    try {
      // Example: /api/v1/employee-tenure-performance
      const res = await axiosInstance.get('/dashboard-card/employee-tenure-performance');
      // The response should have shape: { success: true, data: [ {department, tenureRange, averageScore}, ... ] }
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

export default useTenurePerformanceStore;
