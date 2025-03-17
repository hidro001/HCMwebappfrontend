// src/store/usePolicyStore.js
import {create} from "zustand";
import axiosInstance from "../service/axiosInstance";
import { toast } from "react-hot-toast";

const usePolicyStore = create((set, get) => ({
  policies: [],
  loading: false,
  error: null,

  // Fetch all policies from the backend
  fetchPolicies: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/policy-new");
      set({ policies: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error("Failed to fetch policies.");
    }
  },

  // Create a new policy via the backend API
  createPolicy: async (policyData) => {
    set({ loading: true });
    try {
      // Build a FormData object to handle text fields and file uploads
      const formData = new FormData();
      Object.keys(policyData).forEach((key) => {
        if (policyData[key] !== null && policyData[key] !== undefined) {
          formData.append(key, policyData[key]);
        }
      });
      
      const response = await axiosInstance.post("/policy-new", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      // Prepend the new policy to the list
      set((state) => ({
        policies: [response.data, ...state.policies],
        loading: false,
      }));
      toast.success("Policy created successfully!");
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error("Failed to create policy.");
    }
  },
   // New: Delete a policy
   deletePolicy: async (id) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.delete(`/policy-new/${id}`);
      set((state) => ({
        policies: state.policies.filter((policy) => policy._id !== id),
        loading: false,
      }));
      toast.success("Policy deleted successfully!");
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error("Failed to delete policy.");
    }
  },

   // Update existing policy
   updatePolicy: async (id, updatedData) => {
    set({ loading: true });
    try {
      const formData = new FormData();
      Object.keys(updatedData).forEach((key) => {
        if (updatedData[key] !== undefined && updatedData[key] !== null) {
          formData.append(key, updatedData[key]);
        }
      });
      const response = await axiosInstance.put(`/policy-new/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      set((state) => ({
        policies: state.policies.map((p) =>
          p._id === id ? response.data : p
        ),
        loading: false,
      }));
      toast.success("Policy updated successfully!");
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error("Failed to update policy.");
    }
  },

}));

export default usePolicyStore;
