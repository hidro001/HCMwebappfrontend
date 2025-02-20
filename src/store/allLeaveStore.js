import {create} from "zustand";
import axiosInstance from "../service/axiosInstance";
import { toast } from "react-hot-toast";

const allLeaveStore = create((set) => ({
  leaves: [],
  isLoading: false,

  /**
   * Fetch leaves from the API.
   * If status is "all" then no query parameter is added.
   */
  fetchLeaves: async (status = "approved") => {
    set({ isLoading: true });
    try {
      const queryParam = status && status !== "all" ? `?status=${status}` : "";
      const response = await axiosInstance.get(`/leave/subordinates/leaves${queryParam}`);
      // Depending on your API response structure, it might be in response.data.leaves or response.data
      const fetchedLeaves = response.data.leaves || response.data;
      set({ leaves: fetchedLeaves || [] });
    } catch (error) {
      console.error(`Error fetching ${status} leaves:`, error);
      toast.error(`Failed to fetch ${status} leaves`);
      set({ leaves: [] });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default allLeaveStore;
