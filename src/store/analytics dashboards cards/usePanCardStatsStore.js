// src/store/usePanCardStatsStore.js
import { create } from "zustand";
import axiosInstance from "../../service/axiosInstance"; // Adjust the path

const usePanCardStatsStore = create((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchPanCardStats: async () => {
    set({ loading: true, error: null });
    try {
      // Calls GET /api/v1/pan-card-stats
      const response = await axiosInstance.get(
        "/analytics-dashboards-cards/pan-card-stats"
      );
      set({ data: response.data.data, loading: false });
    } catch (err) {
      set({
        error: err?.response?.data?.message || err.message,
        loading: false,
      });
    }
  },
}));

export default usePanCardStatsStore;
