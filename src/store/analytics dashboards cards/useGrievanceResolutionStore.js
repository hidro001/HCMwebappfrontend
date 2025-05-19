import { create } from "zustand";
import axiosInstance from "../../service/axiosInstance"; // or your setup

const useGrievanceResolutionStore = create((set, get) => ({
  // Store state
  data: null,
  loading: false,
  error: null,

  period: "monthly", // "monthly" or "weekly"
  year: new Date().getFullYear(),
  month: null, // Only relevant if weekly

  setPeriod: (period) => set({ period }),
  setYear: (year) => set({ year }),
  setMonth: (month) => set({ month }),

  fetchGrievanceData: async () => {
    set({ loading: true, error: null, data: null });
    try {
      const { period, year, month } = get(); // get current state from the store

      let url = `/analytics-dashboards-cards/grievance-resolution?period=${period}&year=${year}`;
      if (period === "weekly" && month) {
        url += `&month=${month}`;
      }

      const response = await axiosInstance.get(url);

      // The shape depends on period
      //  - monthly => { monthlyAverages: [...] }
      //  - weekly  => { results: [...] }

      set({ data: response.data.data, loading: false });
    } catch (err) {
      set({
        error: err?.response?.data?.message || err.message,
        loading: false,
        data: null,
      });
    }
  },
}));

export default useGrievanceResolutionStore;
