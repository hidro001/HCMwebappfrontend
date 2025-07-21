import { create } from "zustand";
import axiosInstance from "../service/axiosInstance";
import { toast } from "react-toastify";

const useGreetStore = create((set, get) => ({
  greet: { birthdays: [], anniversaries: [] },
  isLoading: false,
  error: null,
  upComingGreet: { birthdays: [], anniversaries: [] },
  isUpComingLoading: false,
  comingError: null,
 
  fetchGreet: async () => {
    try {
      set({ isLoading: true, error: null });

      const response = await axiosInstance.get("/greet/today");
    
      if (response.data && Array.isArray(response.data.birthdays) && Array.isArray(response.data.anniversaries)) {
        set({ greet: response.data });
       
      } else {
        set({ error: "Invalid greet data received." });
      }
    } catch (error) {
      set({ error: "Failed to load greetings. Please try again." });
      toast.error("Failed to load greetings. Please try again.");
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUpComingGreet: async () => {
    try {
      set({ isUpComingLoading: true, comingError: null });

      const response = await axiosInstance.get("/greet/upComing");
    
      if (response.data && Array.isArray(response.data.birthdays) && Array.isArray(response.data.anniversaries)) {
        set({ upComingGreet: response.data });
       
      } else {
        set({ comingError: "Invalid greet data received." });
      }
    } catch (error) {
      set({ comingError: "Failed to load greetings. Please try again." });
      toast.error("Failed to load greetings. Please try again.");
    } finally {
      set({ isUpComingLoading: false });
    }
  },

  refreshGreet: () => {
    set({ greet: { birthdays: [], anniversaries: [] } });
    get().fetchGreet();
  },
   
  refreshUpComingGreet: () => {
    set({ upComingGreet: { birthdays: [], anniversaries: [] } });
    get().fetchUpComingGreet();
  },
}));


export default useGreetStore;
