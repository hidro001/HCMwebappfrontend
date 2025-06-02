// src/store/useDisciplinaryAnalysisStore.js
import { create } from "zustand";
import axiosInstance from "../../service/axiosInstance"; // Adjust path to your custom axios

const useDisciplinaryAnalysisStore = create((set) => ({
  data: null, // Will hold { year, categories, series }
  loading: false, // Show loading states
  error: null, // Track errors

  // Action to fetch data from /disciplinary-analysis
  fetchDisciplinaryAnalysis: async (selectedYear) => {
    set({ loading: true, error: null });
    try {
      let endpoint = "/analytics-dashboards-cards/disciplinary-analysis";
      // if user selected a year, append ?year=YYYY
      if (selectedYear) {
        endpoint += `?year=${selectedYear}`;
      }
      const response = await axiosInstance.get(endpoint);
      set({
        data: response.data.data, // { year, categories, series }
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

export default useDisciplinaryAnalysisStore;
