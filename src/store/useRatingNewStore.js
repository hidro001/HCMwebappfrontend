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

    // 6) GET team advanced ratings
    getTeamRatingsAdvanced: async (params) => {
      /**
       * params = {
       *   frequency?: 'daily' | 'weekly' | 'monthly' | 'yearly',
       *   startDate?: 'YYYY-MM-DD',
       *   endDate?: 'YYYY-MM-DD',
       *   startYear?: '2024',
       *   endYear?: '2025',
       *   startMonth?: '01',
       *   endMonth?: '12',
       *   startWeek?: '1',
       *   endWeek?: '8',
       *   ...
       * }
       */
      try {
        set({ loading: true, error: null });
        // Build query
        const queryParams = new URLSearchParams(params).toString();
        const res = await axiosInstance.get(`/ratings/team-advanced?${queryParams}`);
  
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
    /**
     * params = {
     *   frequency?: 'daily' | 'weekly' | 'monthly' | 'yearly',
     *   startDate?: 'YYYY-MM-DD',
     *   endDate?: 'YYYY-MM-DD',
     *   startYear?: '2025',
     *   endYear?: '2025',
     *   startMonth?: '01',
     *   endMonth?: '12',
     *   startWeek?: '1',
     *   endWeek?: '8',
     *   ...
     * }
     */
    try {
      set({ loading: true, error: null });
      const queryParams = new URLSearchParams(params).toString();

      // example: /ratings/employee-advanced/67610bfe4afcd581b8c7abde?frequency=daily&startDate=...
      const res = await axiosInstance.get(`/ratings/employee-advanced/${employeeId}?${queryParams}`);

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
      /**
       * params might look like:
       * {
       *   frequency: 'daily' | 'weekly' | 'monthly' | 'yearly',
       *   startDate: 'YYYY-MM-DD', endDate: ...,
       *   startYear, endYear,
       *   startMonth, endMonth,
       *   startWeek, endWeek,
       *   ...
       * }
       */
      try {
        set({ loading: true, error: null });
  
        const queryParams = new URLSearchParams(params).toString();
        // for example => GET /ratings/my-advanced?frequency=weekly&startYear=2025&...
  
        const res = await axiosInstance.get(`/ratings/my-advanced?${queryParams}`);
  
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

    // In store/useRatingStore.js (inside createZustand):
// getOrgRatingsAdvanced: async (params) => {
//   /**
//    * params can include:
//    * {
//    *   department?: 'IT' | 'HR' | ...,
//    *   designation?: 'Manager' | 'Full Stack Web Developer' | ...,
//    *   frequency?: 'daily' | 'weekly' | 'monthly' | 'yearly',
//    *   startDate, endDate,
//    *   startYear, endYear,
//    *   startMonth, endMonth,
//    *   startWeek, endWeek,
//    * }
//    */
//   try {
//     set({ loading: true, error: null });

//     const queryParams = new URLSearchParams(params).toString();
//     // e.g. /ratings/org-advanced?department=IT&designation=Manager&frequency=monthly&...

//     const res = await axiosInstance.get(`/ratings/org-advanced?${queryParams}`);

//     set({ loading: false, error: null });
//     return res.data; // expecting { success: true, data: [ { employee, filteredRatings, ... }, ... ] }
//   } catch (err) {
//     set({
//       loading: false,
//       error: err.response?.data?.message || err.message,
//     });
//     throw err;
//   }
// },

getOrgRatingsAdvanced: async (params) => {
  /**
   * params might include:
   * {
   *   frequency,
   *   department,
   *   designation,
   *   startDate, endDate, // for daily
   *   startYear, endYear, // for weekly/monthly/yearly
   *   startMonth, endMonth,
   *   startWeek, endWeek,
   *   ...
   * }
   */
  try {
    set({ loading: true, error: null });
    const queryParams = new URLSearchParams(params).toString();
    // e.g. GET /ratings/org-advanced?frequency=weekly&department=IT&startYear=2025&endYear=2025...
    const res = await axiosInstance.get(`/ratings/organization-advanced?${queryParams}`);
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

}));

export default useRatingStore;
