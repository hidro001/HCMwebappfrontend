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
// Updated fetchTopProductivityStats - purely date-based
fetchTopProductivityStats: async (employeeId, selectedDate = null) => {
  set({ loading: true, error: null });
  try {
    const params = new URLSearchParams();
    const targetDate = selectedDate || dayjs().format("YYYY-MM-DD");
    params.append('date', targetDate);
    
    const res = await axiosInstance.get(
      `/usage-stats/productivity/${employeeId}?${params.toString()}`
    );
    set({ topProductivityStats: res.data.data });
  } catch (err) {
    set({ error: err.message });
    toast.error(err.message);
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

fetchAverageBreakAndWorkHours: async (department, designation) => {
  set({ loading: true, error: null });
  try {
    const res = await axiosInstance.get("/usage-stats/average-break-work", {
      params: { department, designation },
    });
    set({ averageBreakWorkStats: res.data });
  } catch (err) {
    set({ error: err.message });
    toast.error(err.message);
  } finally {
    set({ loading: false });
  }
},
averageBreakWorkStats: null,


// useUsageStatsStore.js (Zustand)
fetchTopLeastProductiveEmployees: async (department, designation) => {
  set({ loading: true, error: null });
  try {
    const res = await axiosInstance.get('/usage-stats/top-least-productive', { params: { department, designation } });
    set({ topLeastProductivity: res.data });
  } catch (err) {
    set({ error: err.message });
    toast.error(err.message);
  } finally {
    set({ loading: false });
  }
},
topLeastProductivity: { topProductive: [], leastProductive: [] },
// src/store/useUsageStatsStore.js
fetchSubordinateMostUsedStats: async (department, designation, limit) => {
  set(() => ({ loading: true }));
  try {
    const response = await axiosInstance.get("/usage-stats/subordinate-most-used", {
      params: { department, designation, limit },
    });
    
    set({
      subordinateMostUsedStats: response.data.data || { topApps: [], topWebsites: [] },
      loading: false,
    });
  } catch (error) {
    set({
      subordinateMostUsedStats: { topApps: [], topWebsites: [] },
      loading: false,
      error: error.message,
    });
    console.error("Fetch subordinate stats error:", error);
    toast.error("Failed to fetch subordinate usage stats");
  }
},
  
  

  // Add these lines in the store:
// Update these methods in your useUsageStatsStore.js



// Updated fetchMostUsedStats - purely date-based
fetchMostUsedStats: async (employeeId, selectedDate = null) => {
  set({ loading: true, error: null });
  try {
    const params = new URLSearchParams();
    const targetDate = selectedDate || dayjs().format("YYYY-MM-DD");
    params.append('date', targetDate);
    
    const res = await axiosInstance.get(
      `/usage-stats/most-used/${employeeId}?${params.toString()}`
    );
    set({ mostUsedStats: res.data.data });
  } catch (err) {
    set({ error: err.message });
    toast.error(err.message);
  } finally {
    set({ loading: false });
  }
},

fetchGraphData: async (employeeId, date) => {
  set({ loading: true, error: null });
  try {
    const res = await axiosInstance.get(`/usage-stats/graph/${employeeId}/${date}`);
    set({ graphData: res.data.data });
  } catch (err) {
    set({ error: err.message });
    toast.error(err.message);
  } finally {
    set({ loading: false });
  }
},
graphData: [],

// Fetch stats for a specific date using date picker filter
fetchStatsForSpecificDate: async (employeeId, date) => {
  set({ loading: true, error: null });
  try {
    const res = await axiosInstance.get(`/usage-stats/date-filter-stats/${employeeId}?date=${date}`);
    set({ specificDateStats: res.data.data });
  } catch (err) {
    set({ error: err.message });
    toast.error(err.message);
  } finally {
    set({ loading: false });
  }
},
specificDateStats: null,

fetchFilteredStats: async (employeeId, startDate, endDate) => {
  set({ loading: true, error: null });
  try {
    const res = await axiosInstance.get(
      `/usage-stats/date-2-filter-stats/${employeeId}?startDate=${startDate}&endDate=${endDate}`
    );
    set({ filteredStats: res.data.data });
  } catch (err) {
    set({ error: err.message });
    toast.error(err.message);
  } finally {
    set({ loading: false });
  }
},
filteredStats: { usageStats: [], attendanceRecords: [] },



  
}));

export default useUsageStatsStore;
