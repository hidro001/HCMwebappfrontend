import { create } from 'zustand';
import axiosInstance from '../../service/axiosInstance'; // Adjust path as needed

const useNationalityMaritalStore = create((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchNationalityMarital: async () => {
    set({ loading: true, error: null });
    try {
      // Make request to your Express route: /demographics/nationality-marital
      const response = await axiosInstance.get('/dashboard-card/nationality-marital');
      set({ data: response.data.data, loading: false });
    } catch (err) {
      set({
        error: err?.response?.data?.message || err.message,
        loading: false,
      });
    }
  },
}));

export default useNationalityMaritalStore;
