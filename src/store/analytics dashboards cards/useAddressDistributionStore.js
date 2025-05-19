import { create } from "zustand";
import axiosInstance from "../../service/axiosInstance"; // Adjust path if needed

const useAddressDistributionStore = create((set) => ({
  data: null,
  loading: false,
  error: null,

  // Action to fetch distribution from the endpoint
  fetchDistribution: async () => {
    set({ loading: true, error: null });
    try {
      // GET /api/v1/address-distribution
      const response = await axiosInstance.get(
        "/analytics-dashboards-cards/address-distribution"
      );
      set({
        data: response.data.data, // { currentCount, permanentCount, currentPct, permanentPct }
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

export default useAddressDistributionStore;
