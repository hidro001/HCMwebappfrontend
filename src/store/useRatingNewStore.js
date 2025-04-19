// store/useRatingStore.js

import { create } from "zustand";
import axiosInstance from "../service/axiosInstance";

// Create an axios instance (or import from a shared service)

const useRatingStore = create((set, get) => ({
  subordinates: [],
  kpiSet: null,
  loading: false,
  error: null,

  // ========================
  // 1) Fetch Subordinates
  // ========================
  fetchSubordinates: async () => {
    try {
      set({ loading: true, error: null });
      const res = await axiosInstance.get("/admin/subordinates");
      set({
        loading: false,
        subordinates: res.data.data || [],
        error: null,
      });
    } catch (err) {
      set({
        loading: false,
        error:
          err.response?.data?.message ||
          err.message ||
          "Error fetching subordinates",
      });
    }
  },

  // ========================
  // 2) Fetch KPI Set by designation & frequency
  //    (to get the version + KPI details)
  // ========================
  fetchKpiSet: async (designation, frequency) => {
    try {
      set({ loading: true, error: null });
      const query = `designation=${designation}&frequency=${frequency}`;
      const res = await axiosInstance.get(`/kpi-new?${query}`);
      set({
        loading: false,
        kpiSet: res.data.data,
        error: null,
      });
      return res.data.data; // so the component can use it
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || err.message,
      });
      throw err;
    }
  },

  // ========================
  // 3) Create a Rating (one by one)
  // ========================
  createRating: async (payload) => {
    try {
      set({ loading: true, error: null });
      const res = await axiosInstance.post("/ratings/create", payload);
      set({ loading: false, error: null });
      return res.data;
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || err.message,
      });
      throw err;
    }
  },

  // ========================
  // 4) Generate Bulk Template
  // ========================
  generateBulkTemplate: async (params) => {
    // params = { frequency, date, year, month, week, designation(optional) }
    try {
      set({ loading: true, error: null });
      const queryParams = new URLSearchParams(params).toString();
      const res = await axiosInstance.get(`/ratings/template?${queryParams}`, {
        responseType: "arraybuffer",
        // to handle binary data for Excel
      });
      set({ loading: false, error: null });
      return res; // the response with Excel data
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || err.message,
      });
      throw err;
    }
  },

  // ========================
  // 5) Upload Bulk Ratings
  // ========================
  uploadBulkRatings: async (formData) => {
    try {
      set({ loading: true, error: null });
      const res = await axiosInstance.post("/ratings/bulk-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set({ loading: false, error: null });
      return res.data;
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || err.message,
      });
      throw err;
    }
  },
}));

export default useRatingStore;
