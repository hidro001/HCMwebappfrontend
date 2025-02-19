// src/store/useDisciplinaryStore.js
import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "../service/axiosInstance"; 

const useDisciplinaryStore = create((set, get) => ({
  users: [],
  disciplinaryActions: [],
  loading: false,
  error: null,

  // 1. Fetch all users
  fetchAllUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/disciplinary-actions/all-users");
      set({ users: response.data.data || [], loading: false });
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch users");
      set({ error, loading: false });
    }
  },

  // 2. Create a new disciplinary action
  createDisciplinaryAction: async (payload, onSuccess) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post("/disciplinary-actions", payload);
      toast.success(response.data.message || "Created successfully");
      set({ loading: false });
      // If needed, refresh the disciplinary actions list
      get().fetchAllDisciplinaryActions();
      // Or call onSuccess to close modal, reset form, etc.
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error creating disciplinary action:", error);
      toast.error(
        error?.response?.data?.message || "Failed to create disciplinary action"
      );
      set({ error, loading: false });
    }
  },

  // 3. Fetch all disciplinary actions
  fetchAllDisciplinaryActions: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/disciplinary-actions");
      set({ disciplinaryActions: response.data.data || [], loading: false });
    } catch (error) {
      console.error("Error fetching disciplinary actions:", error);
      toast.error(
        error?.response?.data?.message || "Failed to fetch disciplinary actions"
      );
      set({ error, loading: false });
    }
  },

  // 4. Update a disciplinary action
  updateDisciplinaryAction: async (id, payload, onSuccess) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.put(`/disciplinary-actions/${id}`, payload);
      toast.success(response.data.message || "Updated successfully");
      // Refresh the disciplinary actions after update
      get().fetchAllDisciplinaryActions();
      set({ loading: false });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error updating disciplinary action:", error);
      toast.error(
        error?.response?.data?.message || "Failed to update disciplinary action"
      );
      set({ error, loading: false });
    }
  },

  // 5. Delete a disciplinary action
  deleteDisciplinaryAction: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.delete(`/disciplinary-actions/${id}`);
      toast.success(response.data.message || "Deleted successfully");
      // Refresh the list
      get().fetchAllDisciplinaryActions();
      set({ loading: false });
    } catch (error) {
      console.error("Error deleting disciplinary action:", error);
      toast.error(
        error?.response?.data?.message || "Failed to delete disciplinary action"
      );
      set({ error, loading: false });
    }
  },
}));

export default useDisciplinaryStore;
