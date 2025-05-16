import { create } from "zustand";
import axiosInstance from "../../service/axiosInstance"; // Adjust path to your custom axios setup

const useTrainingNeedsStore = create((set) => ({
  data: null, // will hold the training needs data from the API
  loading: false, // track loading state
  error: null, // track errors

  // An action to fetch data from the backend
  fetchTrainingNeeds: async () => {
    set({ loading: true, error: null });
    try {
      // The route is /training-needs (assuming your baseURL is /api/v1)
      const response = await axiosInstance.get(
        "/analytics-dashboards-cards/training-needs"
      );
      set({
        data: response.data.data, // e.g., { upToDatePct, needsRefreshPct, ... }
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

export default useTrainingNeedsStore;
