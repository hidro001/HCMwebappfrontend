import { create } from "zustand";
import axiosInstance from "../../service/axiosInstance"; // your axios setup

const useDepartmentIssueStatsStore = create((set) => ({
  data: null, // e.g. [ { department, pendingCount, inProgressCount, resolvedCount}, ...]
  loading: false,
  error: null,

  fetchDepartmentStats: async (month = null) => {
    set({ loading: true, error: null, data: null });
    try {
      let url = "/analytics-dashboards-cards/department-issue-stats";
      if (month) {
        url += `?month=${month}`;
      }
      const res = await axiosInstance.get(url);
      set({
        data: res.data.data,
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

export default useDepartmentIssueStatsStore;
