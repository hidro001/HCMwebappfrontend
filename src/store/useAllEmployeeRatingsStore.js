// useAllEmployeeRatingsStore.js

import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "../service/axiosInstance"; 
// ^ Adjust import path to wherever your configured Axios instance lives

export const useAllEmployeeRatingsStore = create((set, get) => ({
  ratings: [],            // List of all detailed ratings
  overallAverage: 0,      // Overall average rating (if you want to store it)
  pagination: {
    totalRatings: 0,
    totalPages: 0,
    currentPage: 1,
  },
  loading: false,
  error: null,

  // For filters/search:
  filters: {
    employeeId: "",
    department: "",
    ratedBy: "",
    minAverage: "",
    maxAverage: "",
  },

  // You can also store data for a single employee’s set of ratings if desired
  singleEmployeeRatings: [],
  singleEmployee: null,

  // ---------------------
  //  Fetch All Ratings
  // ---------------------
  fetchAllEmployeeRatings: async (page = 1) => {
    const { filters } = get();
    set({ loading: true, error: null });

    try {
      // Build query string from filters
      let query = `?page=${page}&limit=20`;

      if (filters.employeeId) query += `&employeeId=${filters.employeeId}`;
      if (filters.department)
        query += `&department=${encodeURIComponent(filters.department)}`;
      if (filters.ratedBy) query += `&ratedBy=${filters.ratedBy}`;
      if (filters.minAverage) query += `&minAverage=${filters.minAverage}`;
      if (filters.maxAverage) query += `&maxAverage=${filters.maxAverage}`;

      const response = await axiosInstance.get(`/kpi/ratings/all${query}`);
      const { data, overallAverage, pagination } = response.data;
      set({
        ratings: data || [],
        overallAverage: overallAverage || 0,
        pagination: pagination || { totalRatings: 0, totalPages: 0, currentPage: page },
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching all employee ratings:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch employee ratings.");
      set({ loading: false, error: error });
    }
  },

  // ---------------------
  //  Set Filters
  // ---------------------
  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },

  // ---------------------
  //  Reset Filters
  // ---------------------
  resetFilters: () => {
    set({
      filters: {
        employeeId: "",
        department: "",
        ratedBy: "",
        minAverage: "",
        maxAverage: "",
      },
    });
  },

  // -----------------------------
  //  (Optional) Fetch Single Employee Ratings
  // -----------------------------
  fetchEmployeeRatings: async (employeeId) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/kpi/ratings/employee/${employeeId}`);
      const { data, overallAverage } = response.data;
      set({
        singleEmployeeRatings: data || [],
        overallAverage: overallAverage || 0,
        singleEmployee: data?.[0]?.ratedTo || null,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching single employee ratings:", error);
      toast.error(
        error?.response?.data?.message || "Failed to fetch employee ratings. Try again."
      );
      set({ loading: false, error });
    }
  },

  // ---------------------
  //  Handle Page Change
  // ---------------------
  handlePageChange: async (pageNumber) => {
    const { fetchAllEmployeeRatings } = get();
    set((state) => ({
      pagination: {
        ...state.pagination,
        currentPage: pageNumber,
      },
    }));
    await fetchAllEmployeeRatings(pageNumber);
  },
}));
