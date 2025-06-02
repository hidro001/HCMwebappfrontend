import { create } from "zustand";
import axiosInstance from "../../service/axiosInstance"; // or your axios

const useAbsenteeismStore = create((set) => ({
  data: null, // [ { department, totalLeaves }, ... ]
  loading: false,
  error: null,

  fetchAbsenteeism: async (month = null) => {
    set({ loading: true, error: null, data: null });
    try {
      let url = "/analytics-dashboards-cards/absenteeism-department"; // aggregator route
      if (month) {
        url += `?month=${month}`;
      }
      const res = await axiosInstance.get(url);
      set({
        data: res.data.data, // => [ { department, totalLeaves }, ... ]
        loading: false,
      });
    } catch (err) {
      set({
        error: err?.response?.data?.message || err.message,
        loading: false,
        data: null,
      });
    }
  },
}));

export default useAbsenteeismStore;
