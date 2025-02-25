import { create } from "zustand";
import axiosInstance from "../service/axiosInstance";
import { toast } from "react-hot-toast";

const useTrainingMaterialStore = create((set, get) => ({
  // Combined state
  companies: [],
  modules: [],
  materials: [],
  loading: false,
  error: null,

  // Helper setters
  setLoading: (val) => set({ loading: val }),
  setError: (val) => set({ error: val }),

  /**
   * =====================
   * COMPANY ACTIONS
   * =====================
   */
  fetchCompanies: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/training-materials/company");
      set({ companies: res.data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(`Error fetching companies: ${error.message}`);
    }
  },

  createCompany: async (companyName) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.post("/training-materials/company", {
        name: companyName,
      });
      toast.success("Company created!");
      set((state) => ({
        companies: [...state.companies, res.data.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(`Error creating company: ${error.message}`);
    }
  },

  updateCompany: async (companyId, newName) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.put(
        `/training-materials/company/${companyId}`,
        { name: newName }
      );
      toast.success("Company updated!");
      set((state) => ({
        companies: state.companies.map((c) =>
          c._id === companyId ? res.data.data : c
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(`Error updating company: ${error.message}`);
    }
  },

  deleteCompany: async (companyId) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/training-materials/company/${companyId}`);
      toast.success("Company deleted!");
      set((state) => ({
        companies: state.companies.filter((c) => c._id !== companyId),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(`Error deleting company: ${error.message}`);
    }
  },

  /**
   * =====================
   * MODULE ACTIONS
   * =====================
   */
  fetchModules: async (companyId) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(
        `/training-materials/module/${companyId}`
      );
      set({ modules: res.data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(`Error fetching modules: ${error.message}`);
    }
  },

  createModule: async (companyId, moduleName) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.post("/training-materials/module", {
        name: moduleName,
        companyId,
      });
      toast.success("Module created!");
      set((state) => ({
        modules: [...state.modules, res.data.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(`Error creating module: ${error.message}`);
    }
  },

  updateModule: async (moduleId, newName) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.put(
        `/training-materials/module/${moduleId}`,
        { name: newName }
      );
      toast.success("Module updated!");
      set((state) => ({
        modules: state.modules.map((m) =>
          m._id === moduleId ? res.data.data : m
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(`Error updating module: ${error.message}`);
    }
  },

  deleteModule: async (moduleId) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/training-materials/module/${moduleId}`);
      toast.success("Module deleted!");
      set((state) => ({
        modules: state.modules.filter((m) => m._id !== moduleId),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(`Error deleting module: ${error.message}`);
    }
  },

  /**
   * =====================
   * MATERIAL ACTIONS
   * =====================
   */
  fetchMaterials: async (moduleId) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(
        `/training-materials/material/${moduleId}`
      );
      set({ materials: res.data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(`Error fetching materials: ${error.message}`);
    }
  },

  createMaterial: async ({ title, type, moduleId, file }) => {
    set({ loading: true, error: null });
    try {
      // We must send multipart/form-data if there's a file
      const formData = new FormData();
      formData.append("title", title);
      formData.append("type", type);
      formData.append("moduleId", moduleId);
      if (file) {
        formData.append("file", file);
      }

      const res = await axiosInstance.post(
        "/training-materials/material",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Material created!");
      set((state) => ({
        materials: [...state.materials, res.data.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(`Error creating material: ${error.message}`);
    }
  },

  updateMaterial: async (materialId, { title, type, file }) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("type", type);
      if (file) {
        formData.append("file", file);
      }

      const res = await axiosInstance.put(
        `/training-materials/material/${materialId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Material updated!");
      set((state) => ({
        materials: state.materials.map((mat) =>
          mat._id === materialId ? res.data.data : mat
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(`Error updating material: ${error.message}`);
    }
  },

  deleteMaterial: async (materialId) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/training-materials/material/${materialId}`);
      toast.success("Material deleted!");
      set((state) => ({
        materials: state.materials.filter((m) => m._id !== materialId),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(`Error deleting material: ${error.message}`);
    }
  },
}));

export default useTrainingMaterialStore;
