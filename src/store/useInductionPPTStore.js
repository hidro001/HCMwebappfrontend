// src/store/useInductionPPTStore.js
import {create} from "zustand";
import axiosInstance from "../service/axiosInstance";
import { toast } from "react-hot-toast";

const useInductionPPTStore = create((set) => ({
  pptList: [],
  loading: false,
  error: null,

  // Fetch all induction PPTs from the backend
  fetchPPTs: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/induction-ppt");
      set({ pptList: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error("Failed to fetch induction PPTs");
    }
  },

  // Create a new induction PPT
  createPPT: async (pptData) => {
    set({ loading: true });
    try {
      // Build FormData including pptName, department, pptFile, and coverImage (if provided)
      const formData = new FormData();
      Object.keys(pptData).forEach((key) => {
        if (pptData[key] !== null && pptData[key] !== undefined) {
          formData.append(key, pptData[key]);
        }
      });

      const response = await axiosInstance.post("/induction-ppt", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set((state) => ({
        pptList: [response.data, ...state.pptList],
        loading: false,
      }));
      toast.success("PPT uploaded successfully!");
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error("Failed to upload PPT");
    }
  },

  // Delete an induction PPT by id
  deletePPT: async (id) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/induction-ppt/${id}`);
      set((state) => ({
        pptList: state.pptList.filter((ppt) => ppt._id !== id),
        loading: false,
      }));
      toast.success("PPT deleted successfully!");
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error("Failed to delete PPT");
    }
  },
}));

export default useInductionPPTStore;
