// src/stores/useFNFStore.js
import { create } from "zustand";
import axiosInstance from "../service/axiosInstance";
import { toast } from "react-toastify";

const useFNFStore = create((set, get) => ({
  // State
  pendingFnfs: [],
  approvedFnfs: [],
  loading: false,
  message: "",

  // Fetch all FNF requests
  fetchFNFRequests: async () => {
    set({ loading: true, message: "" });
    try {
      const response = await axiosInstance.get("/fnf");
      set({
        pendingFnfs: response.data?.pendingFnfs || [],
        approvedFnfs: response.data?.approvedFnfs || [],
      });
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Error fetching FNF requests.";
      toast.error(errorMsg);
      set({ message: errorMsg });
    } finally {
      set({ loading: false });
    }
  },

  // Approve an FNF request with provided values
  approveFNF: async (fnfId, { fnfAmount, deductions, netPayable, comments }) => {
    try {
      const response = await axiosInstance.post(
        `/fnf/${fnfId}/approve`,
        { fnfAmount, deductions, netPayable, comments }
      );
      toast.success(response.data?.message || "FNF approved successfully.");
      // Remove the approved FNF from pending and add/update it in approvedFnfs
      set((state) => ({
        pendingFnfs: state.pendingFnfs.filter((item) => item._id !== fnfId),
        approvedFnfs: [response.data?.fnf, ...state.approvedFnfs],
      }));
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Error approving FNF.";
      toast.error(errorMsg);
    }
  },

  // Update an existing FNF request
  updateFNF: async (fnfId, { fnfAmount, deductions, netPayable }) => {
    try {
      const response = await axiosInstance.put(
        `/fnf/${fnfId}/update`,
        { fnfAmount, deductions, netPayable }
      );
      toast.success(response.data?.message || "FNF updated successfully.");
      // Re-fetch all FNF requests to update the UI
      await get().fetchFNFRequests();
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Error updating FNF.";
      toast.error(errorMsg);
    }
  },

  // Reject an FNF request with a comment
  rejectFNF: async (fnfId, comments) => {
    try {
      const response = await axiosInstance.post(
        `/fnf/${fnfId}/reject`,
        { comments }
      );
      toast.success(response.data?.message || "FNF rejected successfully.");
      // Remove the rejected FNF from pending
      set((state) => ({
        pendingFnfs: state.pendingFnfs.filter((item) => item._id !== fnfId),
      }));
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Error rejecting FNF.";
      toast.error(errorMsg);
    }
  },
}));

export default useFNFStore;
