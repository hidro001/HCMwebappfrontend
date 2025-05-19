import { create } from "zustand";
import axiosInstance from "../service/axiosInstance";

const useDesignationStore = create((set) => ({
  designations: [],
  loading: false,
  error: null,

  fetchDesignations: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/designation/get");
      set({ 
        designations: response.data.data || [], 
        loading: false,
        error: null
      });
    } catch (err) {
      set({ loading: false, error: err.message });
    }
  },
}));

export default useDesignationStore;
