import { create } from "zustand";
import axiosInstance from "../service/axiosInstance";
import { toast } from "react-toastify";

const useGreetStore = create((set, get) => ({
  greet: { birthdays: [], anniversaries: [] },  // initialize as object with arrays
  isLoading: false,
  error: null,
 
  fetchGreet: async () => {
    try {
      set({ isLoading: true, error: null });

      const response = await axiosInstance.get("/feed/greeting");
    
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

  refreshGreet: () => {
    set({ greet: { birthdays: [], anniversaries: [] } });
    get().fetchGreet();
  },
}));


export default useGreetStore;
