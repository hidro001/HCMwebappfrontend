// store/useRatingStore.js

import { create } from "zustand";
import axiosInstance from "../service/axiosInstance";


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
      const res = await axiosInstance.get("/subordinates"); //fetch employee
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
      const res = await axiosInstance.get(`/kpis?${query}`);
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

  // 6) GET team advanced ratings
  getTeamRatingsAdvanced: async (params) => {
    try {
      set({ loading: true, error: null });
      // Build query
      const queryParams = new URLSearchParams(params).toString();
      const res = await axiosInstance.get(
        `/ratings/team-advanced?${queryParams}`
      );

      set({ loading: false, error: null });
      return res.data; // { success: true, data: [...] }
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || err.message,
      });
      throw err;
    }
  },

  // Get advanced ratings for a SINGLE employee with date-range filters.
  getEmployeeRatingsAdvanced: async (employeeId, params) => {
    try {
      set({ loading: true, error: null });
      const queryParams = new URLSearchParams(params).toString();

      // example: /ratings/employee-advanced/67610bfe4afcd581b8c7abde?frequency=daily&startDate=...
      const res = await axiosInstance.get(
        `/ratings/employee-advanced/${employeeId}?${queryParams}`
      );

      set({ loading: false, error: null });
      return res.data; // { success: true, data: { employee, filteredRatings, averageRating, ... } }
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || err.message,
      });
      throw err;
    }
  },

  // 7) new function for "my" advanced ratings
  getMyRatingsAdvanced: async (params) => {
    try {
      set({ loading: true, error: null });

      const queryParams = new URLSearchParams(params).toString();
      // for example => GET /ratings/my-advanced?frequency=weekly&startYear=2025&...

      const res = await axiosInstance.get(
        `/ratings/my-advanced?${queryParams}`
      );

      set({ loading: false, error: null });
      return res.data; // expecting { success, data: { employee, filteredRatings, averageRating, ratingCount } }
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || err.message,
      });
      throw err;
    }
  },

  getOrgRatingsAdvanced: async (params) => {
    try {
      set({ loading: true, error: null });
      const queryParams = new URLSearchParams(params).toString();
      // e.g. GET /ratings/org-advanced?frequency=weekly&department=IT&startYear=2025&endYear=2025...
      const res = await axiosInstance.get(
        `/ratings/organization-advanced?${queryParams}`
      );
      set({ loading: false, error: null });
      return res.data; // { success: true, data: [...] }
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || err.message,
      });
      throw err;
    }
  },


  getOrganizationTopPerformer: async (params) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.get("/ratings/top-performer", {
        params,
      });
      set({ loading: false });
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      set({ loading: false, error: message });
      return { success: false, message };
    }
  },


  getDesignationTopPerformer: async (params) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.get(
        "/ratings/top-performer/by-designation",
        { params }
      );
      set({ loading: false });
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      set({ loading: false, error: message });
      return { success: false, message };
    }
  },


    generatePastRatingsTemplate: async (params) => {
    try {
      set({ loading: true, error: null });
      const queryParams = new URLSearchParams(params).toString();
      const res = await axiosInstance.get(`/ratings/past-template?${queryParams}`, {
        responseType: "arraybuffer", // important for Excel binary data
      });
      set({ loading: false, error: null });
      return res; // caller handles blob
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || err.message || "Failed to generate past ratings template",
      });
      throw err;
    }
  },

    uploadPastRatings: async (formData) => {
    try {
      set({ loading: true, error: null });
      const res = await axiosInstance.post("/ratings/bulk-upload-past", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set({ loading: false, error: null });
      return res.data;
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || err.message || "Failed to upload past ratings",
      });
      throw err;
    }
  },

}));

export default useRatingStore;
