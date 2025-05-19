// src/store/useJobStore.js
import { create } from 'zustand';
import axiosInstance from '../service/axiosInstance';

const useJobStore = create((set) => ({
  loading: false,
  error: null,
  successMessage: null,

  // Action to create a job
  createJob: async (formData) => {
    try {
      set({ loading: true, error: null, successMessage: null });

      // POST to your backend

    const response = await axiosInstance.post('/recruitment/jobs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      set({
        loading: false,
        successMessage: 'Job created successfully!',
        error: null,
      });

      return response.data;
    } catch (err) {
      console.error('Error creating job:', err);
      set({
        loading: false,
        error:
          err?.response?.data?.message ||
          'An error occurred while creating the job',
        successMessage: null,
      });
      throw err; // re-throw so the component can also handle it if needed
    }
  },
}));

export default useJobStore;
