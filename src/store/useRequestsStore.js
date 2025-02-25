// store/useRequestsStore.js

import { create } from "zustand";
import axiosInstance from "../service/axiosInstance";
import { toast } from "react-hot-toast";

export const useRequestsStore = create((set, get) => ({
  requests: [],
  loading: false,

  fetchRequests: async () => {
    try {
      set({ loading: true });
      const employeeId = localStorage.getItem("employeeId");
      if (!employeeId) {
        toast.error("Employee ID not found. Please log in again.");
        set({ loading: false });
        return;
      }

      const response = await axiosInstance.get(
        "/superadmin/companysettings/my-requests"
      );
      if (response.data.success) {
        set({ requests: response.data.data });
      } else {
        toast.error(response.data.message || "Failed to fetch requests");
      }
    } catch (error) {
      toast.error("An error occurred while fetching requests");
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  submitRequest: async (formData) => {
    try {
      set({ loading: true });
      const response = await axiosInstance.post(
        "/superadmin/companysettings/submit-request",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Request submitted successfully!");
        // Refresh the request list
        get().fetchRequests();
        return true;
      } else {
        toast.error(response.data.message || "Failed to submit request");
        return false;
      }
    } catch (error) {
      toast.error("An error occurred while submitting the request");
      console.error(error);
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));
