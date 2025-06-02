// src/store/useAadhaarCardStore.js
import { create } from "zustand";
import axiosInstance from "../../service/axiosInstance"; // Adjust path if needed

const useAadhaarCardStore = create((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchAadhaarStats: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(
        "/analytics-dashboards-cards/aadhaar-card-stats"
      );
      set({ data: res.data.data, loading: false });
    } catch (err) {
      set({
        error: err?.response?.data?.message || err.message,
        loading: false,
      });
    }
  },
}));

export default useAadhaarCardStore;
