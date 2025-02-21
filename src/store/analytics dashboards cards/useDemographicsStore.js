import { create } from 'zustand';
import axiosInstance from '../../service/axiosInstance'; // Update the path as needed

const useDemographicsStore = create((set) => ({
  demographicsData: null,
  loading: false,
  error: null,

  // Action to fetch demographic data from the backend
  fetchDemographics: async () => {
    set({ loading: true, error: null });
    try {
      // Make an API call using your custom axiosInstance
      const response = await axiosInstance.get('/dashboard-card/demographics');
      // The API response should have shape { success: true, data: {...} }
      set({
        demographicsData: response.data.data,
        loading: false,
      });
    } catch (err) {
      // Handle error gracefully
      set({
        error: err?.response?.data?.message || err.message,
        loading: false,
      });
    }
  },
}));

export default useDemographicsStore;
