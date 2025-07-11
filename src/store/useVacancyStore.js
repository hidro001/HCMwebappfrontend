import { create } from 'zustand';
import axiosInstance from '../service/axiosInstance'; // or wherever your axiosInstance is

const useVacancyStore = create((set) => ({
  vacancies: [],
  loading: false,
  error: null,
  successJobUpdateMessage: null,
  errorJobUpdateMessage: null,

  fetchAllVacancies: async (approvalStatus = '') => {
    set({ loading: true, error: null });
    let response;
    try {
      if(approvalStatus.length >0){
        response = await axiosInstance.get(`/recruitment/jobs?approvalStatus=${approvalStatus}`);
      }else{
       response = await axiosInstance.get('/recruitment/jobs');

      }
      set({ vacancies: response.data.data, loading: false });
    } catch (err) {
      console.error('Error fetching vacancies:', err);
      set({
        error: err?.response?.data?.message || 'Error fetching jobs',
        loading: false,
      });
    }
  },
  fetchVacancyById: async (id) => {
    try {
      const response = await axiosInstance.get(`/recruitment/jobs/${id}`);
      return response.data.data; // return the job object
    } catch (err) {
      console.error('Error fetching job by ID:', err);
      throw err;
    }
  },

  updateVacancy: async (id, payload) => {
    try {
      set({ loading: true, successJobUpdateMessage: null, errorJobUpdateMessage: null, });
      const response = await axiosInstance.put(`/recruitment/jobs/${id}`, payload);
      const updatedJob = response.data.data;

      set((state) => {
        const updatedList = state.vacancies.map((v) =>
          v._id === id ? updatedJob : v
        );
        return { vacancies: updatedList, loading: false, successJobUpdateMessage : response.data.message , errorJobUpdateMessage:  null };
      });

      return updatedJob;
    } catch (err) {
      console.error('Error updating vacancy:', err);
      set({ loading: false, errorJobUpdateMessage: err?.response?.data?.message ||
          'An error occurred while creating the job', successJobUpdateMessage : null});
      throw err;
    }
  },

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
