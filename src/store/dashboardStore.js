// src/store/dashboardStore.js
import { create } from "zustand";
import axiosInstance from "../service/axiosInstance"; // or wherever your axios wrapper is

const useDashboardStore = create((set, get) => ({
  preferences: [], // holds the user's chosen chart IDs
  loadingPreferences: false,

  // Fetch preferences from backend
  fetchPreferences: async () => {
    set({ loadingPreferences: true });
    try {
      const response = await axiosInstance.get("/dashboard/preferences");
      set({
        preferences: response.data?.preferences || [],
        loadingPreferences: false,
      });
    } catch (err) {
      console.error("Error fetching preferences:", err);
      set({ loadingPreferences: false });
    }
  },

  // Update preferences in backend
  updatePreferences: async (newPreferences) => {
    try {
      const response = await axiosInstance.post("/dashboard/preferences", {
        preferences: newPreferences,
      });
      set({ preferences: response.data?.preferences || [] });
    } catch (err) {
      console.error("Error updating preferences:", err);
    }
  },
}));

export default useDashboardStore;
