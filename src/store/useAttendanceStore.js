
import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "../service/axiosInstance"; // Adjust the path as needed

const useAttendanceStore = create((set, get) => ({
  // ---- State ----
  subordinates: [],
  departments: [],
  stats: null,
  loading: false,
  error: null,
  subordinateStats: null, // new piece of state
  todayPunches: [],

  // ---- Actions ----

  // Fetch subordinates for a given userId
  fetchSubordinates: async (userId) => {
    set({ loading: true, error: null });
    try {
      if (!userId) throw new Error("User ID is not available.");

      const response = await axiosInstance.get("/admin/subordinates", {
        params: { userId },
      });
      const data = response.data;

      if (data.success) {
        set({ subordinates: data.data });
      } else {
        throw new Error(data.message || "Failed to fetch subordinates.");
      }
    } catch (err) {
      console.error("Error fetching subordinates:", err);
      toast.error(err.message);
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  // Fetch all users (or subordinates, based on your existing logic)
  fetchAllUser: async () => {
    set({ loading: true, error: null });
    try {
      // If a userId is needed, you can add it as a parameter and pass it here.
      const response = await axiosInstance.get("/superadmin/employees");
      const data = response.data;

      if (data.success) {
        set({ subordinates: data.data });
      } else {
        throw new Error(data.message || "Failed to fetch subordinates.");
      }
    } catch (err) {
      console.error("Error fetching subordinates:", err);
      toast.error(err.message);
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  // Fetch all departments
  fetchDepartments: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/superadmin/departments");
      const data = response.data;

      if (data.success) {
        set({ departments: data.data });
      } else {
        throw new Error(data.message || "Failed to fetch departments.");
      }
    } catch (err) {
      console.error("Error fetching departments:", err);
      toast.error(err.message);
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  // Fetch stats
  fetchStats: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/admin/stats");
      const data = response.data;

      if (data.success) {
        // The stats object may include various fields like numberOfEmployeesOnLeaveToday, etc.
        set({ stats: data });
      } else {
        throw new Error(data.message || "Failed to fetch stats.");
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
      toast.error(err.message);
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchSubordinateStats: async () => {
    set({ loading: true, error: null });
    try {
      // Call your new endpoint
      const response = await axiosInstance.get("/admin/attendance-dashboard/getSubordinateStats");
      if (response.data.success) {
        // Save just the "data" object from the response
        // which has totalSubordinates, presentCount, lateCount, onLeaveCount, etc.
        set({ subordinateStats: response.data.data });
      } else {
        throw new Error(response.data.message || "Failed to fetch subordinate stats.");
      }
    } catch (err) {
      console.error("Error fetching subordinate stats:", err);
      toast.error(err.message);
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  // ---- ADD: new action to fetch today's punch in/out times ----
  fetchTodaysPunchTimes: async () => {
    set({ loading: true, error: null });
    try {
      // Assuming your new endpoint is "/api/attendance/today"
      const response = await axiosInstance.get("/employee/today");
      const data = response.data;

      if (data.success) {
        // Save the returned array under `todayPunches`
        set({ todayPunches: data.data });
      } else {
        throw new Error(data.message || "Failed to fetch today's punch times.");
      }
    } catch (err) {
      console.error("Error fetching today's punch times:", err);
      toast.error(err.message);
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  
}));

export default useAttendanceStore;
