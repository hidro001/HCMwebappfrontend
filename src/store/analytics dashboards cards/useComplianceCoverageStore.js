import { create } from "zustand";
import axiosInstance from "../../service/axiosInstance"; // Adjust path if needed

const useComplianceCoverageStore = create((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchCoverage: async () => {
    set({ loading: true, error: null });
    try {
      // This calls /api/v1/compliance-coverage
      const response = await axiosInstance.get(
        "/analytics-dashboards-cards/compliance-coverage"
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

export default useComplianceCoverageStore;
