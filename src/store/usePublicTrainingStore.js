// src/store/usePublicTrainingStore.js
import { create } from "zustand";
import axiosInstance from "../service/axiosInstance";
import { toast } from "react-hot-toast";

const usePublicTrainingStore = create((set) => ({
  companies: [],
  modules: [],
  materials: [],
  loading: false,
  error: null,

  // Fetch all companies
  fetchCompanies: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/training-materials/all-companies");
      set({ companies: res.data.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
      toast.error(`Error fetching companies: ${err.message}`);
    }
  },

  // Fetch modules by company
  fetchModules: async (companyId) => {
    set({ loading: true, error: null });
    try {
      // e.g. /companies/:companyId/modules
      const res = await axiosInstance.get(`/training-materials/companies/${companyId}/modules`);   
      set({ modules: res.data.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
      toast.error(`Error fetching modules: ${err.message}`);
    }
  },

  // Fetch materials by module
  fetchMaterials: async (moduleId) => {
    set({ loading: true, error: null });
    try {
      // e.g. /modules/:moduleId/materials
      const res = await axiosInstance.get(`/training-materials/material/${moduleId}`);   
      set({ materials: res.data.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
      toast.error(`Error fetching materials: ${err.message}`);
    }
  },
}));

export default usePublicTrainingStore;
