


import { create } from "zustand";
import axiosInstance from "../service/axiosInstance";

const useKpiSetStore = create((set, get) => ({
  kpiSet: null,
  kpiSets: [],
  loading: false,
  error: null,

  // CREATE
  createKpiSet: async (payload) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.post("/kpi-new/create", payload);
      set({ loading: false, error: null });
      return res.data;
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || err.message });
      throw err;
    }
  },

  // GET single KPI set by (designation, frequency, version)
  getKpiSet: async ({ designation, frequency, version }) => {
    set({ loading: true, error: null });
    try {
      const query = `designation=${designation}&frequency=${frequency}${version ? `&version=${version}` : ""}`;
      const res = await axiosInstance.get(`/kpi-new?${query}`);
      set({ kpiSet: res.data.data, loading: false, error: null });
      return res.data.data;
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || err.message });
      throw err;
    }
  },

  // GET all KPI sets
  getAllKpiSets: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/kpi-new/all");
      set({ kpiSets: res.data.data, loading: false, error: null });
      return res.data.data;
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || err.message });
      throw err;
    }
  },

  // UPDATE
  updateKpiSet: async (id, payload) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.put(`/kpi-new/update/${id}`, payload);
      set({ loading: false, error: null });
      return res.data.data;
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || err.message });
      throw err;
    }
  },

  // DELETE (permanent)
  deleteKpiSet: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/kpi-new/delete/${id}`);
      set({ loading: false, error: null });
      return true;
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || err.message });
      throw err;
    }
  }
}));

export default useKpiSetStore;
