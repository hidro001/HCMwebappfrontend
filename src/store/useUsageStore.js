import { create } from 'zustand';
import axiosInstance from "../service/axiosInstance";
import { toast } from "react-hot-toast";

const useUsageStatsStore = create((set) => ({
  stats: [],
  dailyStats: null,
  loading: false,
  error: null,

  fetchStats: async (employeeId) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`/usage-stats/${employeeId}`);
      set({ stats: res.data.data });
    } catch (err) {
      set({ error: err.message });
      toast.error(err.message);
    } finally {
      set({ loading: false });
    }
  },

  fetchDailyStats: async (employeeId, date) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`/usage-stats/${employeeId}/${date}`);
      set({ dailyStats: res.data.data });
      return res.data.data; // <- explicitly return data
    } catch (err) {
      set({ error: err.message });
      toast.error(err.message);
      return null; // <- return null on error
    } finally {
      set({ loading: false });
    }
  },
  

  fetchDeptCategories: async (deptName) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get(`/usage-stats/department/${encodeURIComponent(deptName)}`);
      set({ deptCategories: res.data.data });
    } catch (err) {
      set({ error: err.message });
      toast.error(err.message);
    } finally {
      set({ loading: false });
    }
  },
  deptCategories: { productive: [], unproductive: [], unrated: [] },
  
}));

export default useUsageStatsStore;
