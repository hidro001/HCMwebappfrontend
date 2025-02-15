// src/stores/useResignationStore.js
import { create } from "zustand";
import axiosInstance from "../service/axiosInstance";
import { toast } from "react-toastify";

const useResignationStore = create((set, get) => ({
  // Common state for all resignation types
  loading: false,
  error: null,

  // Manager-specific state
  managerPending: [],
  managerHistory: [],

  // ---------------------------
  // Manager Methods
  // ---------------------------
  fetchManagerPendingResignations: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/resignation/pending");
      set({ managerPending: response.data?.resignations || [], loading: false });
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Error fetching pending resignations.";
      toast.error(errMsg);
      set({ loading: false, error: errMsg });
    }
  },

  fetchManagerHistory: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/resignation/history/manager");
      set({ managerHistory: response.data?.resignations || [], loading: false });
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Error fetching resignation history.";
      toast.error(errMsg);
      set({ loading: false, error: errMsg });
    }
  },

  approveResignation: async (id) => {
    try {
      const response = await axiosInstance.post(`/resignation/${id}/approve`);
      toast.success(response.data?.message || "Resignation approved successfully.");
      // Remove the approved resignation from pending list
      const updatedPending = get().managerPending.filter(
        (r) => r._id !== id
      );
      set({ managerPending: updatedPending });
      // Refresh history
      get().fetchManagerHistory();
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Error approving resignation.";
      toast.error(errMsg);
      throw error;
    }
  },

  rejectResignation: async (id, comments) => {
    try {
      const response = await axiosInstance.post(`/resignation/${id}/reject`, {
        comments,
      });
      toast.success(response.data?.message || "Resignation rejected successfully.");
      // Remove the rejected resignation from pending list
      const updatedPending = get().managerPending.filter(
        (r) => r._id !== id
      );
      set({ managerPending: updatedPending });
      // Refresh history
      get().fetchManagerHistory();
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Error rejecting resignation.";
      toast.error(errMsg);
      throw error;
    }
  },
}));

export default useResignationStore;
