import { create } from 'zustand';
import axiosInstance from '../service/axiosInstance'; // or wherever your axiosInstance is

const useVacancyStore = create((set) => ({
  vacancies: [],
  loading: false,
  error: null,

  // Fetch all vacancies (GET /jobs)
  fetchAllVacancies: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/recruitment/jobs');
      // response.data.data should be the array of jobs
      set({ vacancies: response.data.data, loading: false });
    } catch (err) {
      console.error('Error fetching vacancies:', err);
      set({
        error: err?.response?.data?.message || 'Error fetching jobs',
        loading: false,
      });
    }
  },

  // Get single vacancy details (GET /jobs/:id)
  // You can call this in a modal if you need a fresh fetch,
  // or just use the data from the list if it's already there.
  fetchVacancyById: async (id) => {
    try {
      const response = await axiosInstance.get(`/recruitment/jobs/${id}`);
      return response.data.data; // return the job object
    } catch (err) {
      console.error('Error fetching job by ID:', err);
      throw err;
    }
  },

  // Update a vacancy (PUT /jobs/:id)
  updateVacancy: async (id, payload) => {
    try {
      set({ loading: true });
      const response = await axiosInstance.put(`/recruitment/jobs/${id}`, payload);
      const updatedJob = response.data.data;

      // Update local list in store (so UI refreshes automatically)
      set((state) => {
        const updatedList = state.vacancies.map((v) =>
          v._id === id ? updatedJob : v
        );
        return { vacancies: updatedList, loading: false };
      });

      return updatedJob;
    } catch (err) {
      console.error('Error updating vacancy:', err);
      set({ loading: false });
      throw err;
    }
  },

  // Delete a vacancy (DELETE /jobs/:id)
  deleteVacancy: async (id) => {
    try {
      set({ loading: true });
      await axiosInstance.delete(`/recruitment/jobs/${id}`);
      set((state) => {
        const filtered = state.vacancies.filter((v) => v._id !== id);
        return { vacancies: filtered, loading: false };
      });
    } catch (err) {
      console.error('Error deleting vacancy:', err);
      set({ loading: false });
      throw err;
    }
  },



  createReferral: async (payload) => {
    try {
      // payload should be FormData if you are uploading a resume
      // or standard JSON if not uploading files
      set({ loading: true, error: null });
  
      const response = await axiosInstance.post(
        'recruitment/referrals',
        payload,
        {
          headers: {
            'Content-Type': payload instanceof FormData ? 'multipart/form-data' : 'application/json',
          },
        }
      );
  
      set({ loading: false });
      return response.data;
    } catch (err) {
      console.error('Error creating referral:', err);
      set({
        error: err?.response?.data?.message || 'Error creating referral',
        loading: false,
      });
      throw err;
    }
  },
  

}));

export default useVacancyStore;
