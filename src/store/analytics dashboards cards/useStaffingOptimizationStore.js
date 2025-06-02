import { create } from "zustand";
import axiosInstance from "../../service/axiosInstance"; // or your axios setup

const useStaffingOptimizationStore = create((set) => ({
  data: null, // { categories, series }
  loading: false,
  error: null,

  fetchStaffingData: async () => {
    set({ loading: true, error: null });
    try {
      // GET /staffing-optimization
      const response = await axiosInstance.get(
        "/analytics-dashboards-cards/staffing-optimization"
      );
      set({
        data: response.data.data, // => { categories, series }
        loading: false,
      });
    } catch (err) {
      set({
        error: err?.response?.data?.message || err.message,
        loading: false,
      });
    }
  },
}));

export default useStaffingOptimizationStore;
