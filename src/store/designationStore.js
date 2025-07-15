import { create } from "zustand";
import axiosInstance from "../service/axiosInstance";

const useDesignationStore = create((set) => ({
  designations: [],
  desNotice: 0,
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
  fetchDesNoticePeriod: async (designation) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/designation/${designation}`);
      console.log(response , 'afds')
      set({ 
        desNotice: response.data.data[0].notice_period || 0, 
        loading: false,
        error: null
      });
    } catch (err) {
      set({ loading: false, error: err.message });
    }
  },
}));

export default useDesignationStore;
