import { create } from 'zustand';
import axiosInstance from "../service/axiosInstance";
import { toast } from "react-hot-toast";

const useUsageStatsStore = create((set) => ({
  stats: [],
  dailyStats: null,
  loading: false,
  error: null,
  timeline: [],
  activityTrend: [],

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
  fetchTopProductivityStats: async (employeeId, filterType) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(
        `/usage-stats/productivity/${employeeId}?filter=${filterType}`
      );
      set({ topProductivityStats: res.data.data });
    } catch (err) {
      set({ error: err.message });
      toast.error(err.message);
    } finally {
      set({ loading: false });
    }
  },
  topProductivityStats: null,
  
  

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

  fetchTimeline: async (employeeId, date) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`/usage-stats/timeline/${employeeId}/${date}`);
      set({ timeline: res.data.data });
    } catch (err) {
      set({ error: err.message });
      toast.error("Failed to fetch timeline");
    } finally {
      set({ loading: false });
    }
  },
  fetchActivityTrend: async (employeeId, date) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(
        `/usage-stats/trend/${employeeId}`
      );
      set({ activityTrend: res.data.data || [] });
    } catch (err) {
      set({ error: err.message });
      toast.error(err.message);
    } finally {
      set({ loading: false });
    }
  },
  fetchSubordinateProductivity: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get('/usage-stats/subordinate-productivity', { params: filters });
      set({ subordinateProductivity: res.data });
      return res.data;
    } catch (err) {
      set({ error: err.message });
      toast.error(err.message);
      return { topProductive: [], leastProductive: [] };
    } finally {
      set({ loading: false });
    }
  },
  subordinateProductivity: { topProductive: [], leastProductive: [] },

  // 1. Zustand Store (useUsageStatsStore.js)

fetchOrgMostUsedStats: async (department, designation, limit = 5) => {
  set({ loading: true, error: null });
  try {
    const res = await axiosInstance.get('/usage-stats/org-most-used', {
      params: { department, designation, limit },
    });
    set({ orgMostUsedStats: res.data.data });
  } catch (err) {
    set({ error: err.message });
    toast.error(err.message);
  } finally {
    set({ loading: false });
  }
},
orgMostUsedStats: { topApps: [], topWebsites: [] },

  
  

  // Add these lines in the store:
fetchMostUsedStats: async (employeeId, filterType) => {
  set({ loading: true, error: null });
  try {
    const res = await axiosInstance.get(
      `/usage-stats/most-used/${employeeId}?filter=${filterType}`
    );
    set({ mostUsedStats: res.data.data });
  } catch (err) {
    set({ error: err.message });
    toast.error(err.message);
  } finally {
    set({ loading: false });
  }
},
mostUsedStats: null,


  
}));

export default useUsageStatsStore;
