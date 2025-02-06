// src/store/useRatingStore.js
import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "../service/axiosInstance"; 

export const useRatingStore = create((set, get) => ({
  // =========================
  // 1) Subordinates
  // =========================
  subordinates: [],
  loadingSubordinates: false,

  fetchSubordinates: async () => {
    set({ loadingSubordinates: true });
    try {
      const managerId = localStorage.getItem("mongo_id");
      if (!managerId) {
        toast.error("Manager ID not found in localStorage.");
        set({ loadingSubordinates: false });
        return;
      }

      const response = await axiosInstance.get(`/kpi/subordinates/${managerId}`);
      set({ subordinates: response.data.data || [] });
    } catch (error) {
      console.error("Error fetching subordinates:", error);
      toast.error("Failed to fetch subordinates.");
    } finally {
      set({ loadingSubordinates: false });
    }
  },

  // =========================
  // 2) KPIs
  // =========================
  kpis: [],
  loadingKpis: false,

  fetchKpis: async (designation) => {
    set({ loadingKpis: true });
    try {
      const response = await axiosInstance.get(
        `/kpi/kpisbyname?designation=${designation}`
      );
      set({ kpis: response.data.data || [] });
    } catch (error) {
      console.error("Error fetching KPIs:", error);
      toast.error("Failed to fetch KPIs.");
    } finally {
      set({ loadingKpis: false });
    }
  },

  // =========================
  // 3) Submit Ratings
  // =========================
  submitRatings: async ({ ratedTo, ratings, comments, month, year, onSuccess }) => {
    // payload structure:
    // {
    //   ratedTo: String,
    //   ratings: [ { kpi: kpiId, score: number }, ...],
    //   comments: String,
    //   month: Number,
    //   year: Number
    // }
    try {
      if (!ratedTo) {
        toast.error("No subordinate selected.");
        return;
      }
      if (!month || !year) {
        toast.error("Please select both month and year.");
        return;
      }
      if (!ratings || !ratings.length) {
        toast.error("Please provide at least one KPI rating.");
        return;
      }

      await axiosInstance.post("/kpi/ratings", {
        ratedTo,
        ratings,
        comments,
        month,
        year,
      });

      toast.success("Ratings submitted successfully.");
      if (typeof onSuccess === "function") onSuccess();
    } catch (error) {
      console.error("Error submitting ratings:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to submit ratings.";
      toast.error(errorMessage);
    }
  },

  // =========================
  // 4) Subordinate Ratings
  // =========================
  subordinateRatings: [],
  loadingSubordinateRatings: false,

  fetchSubordinateRatings: async () => {
    set({ loadingSubordinateRatings: true });
    try {
      const response = await axiosInstance.get("/kpi/ratings/subordinates");
      set({ subordinateRatings: response.data.data || [] });
    } catch (error) {
      console.error("Error fetching ratings:", error);
      toast.error("Failed to fetch ratings.");
    } finally {
      set({ loadingSubordinateRatings: false });
    }
  },

  // =========================
  // 5) Single Employee Ratings
  // =========================
  employeeRatings: [],
  overallAverage: 0,
  loadingEmployeeRatings: false,

  fetchEmployeeRatings: async (employeeId) => {
    set({ loadingEmployeeRatings: true });
    try {
      const response = await axiosInstance.get(`/kpi/ratings/employee/${employeeId}`);
      const data = response.data.data || [];
      const overallAvg = response.data.overallAverage || 0;

      set({
        employeeRatings: data,
        overallAverage: overallAvg,
      });
    } catch (error) {
      console.error("Error fetching employee ratings:", error);
      if (error.response && error.response.status === 404) {
        toast.error("Employee not found or no ratings available.");
      } else {
        toast.error("Failed to fetch employee ratings.");
      }
    } finally {
      set({ loadingEmployeeRatings: false });
    }
  },
}));
