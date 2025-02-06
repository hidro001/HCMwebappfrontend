// src/store/companyStore.js
import {create} from 'zustand';
import axiosInstance from '../service/axiosInstance';
import { toast } from 'react-hot-toast';

const useCompanyStore = create((set, get) => ({
  companies: [],
  loading: false,
  // Hold the company object currently being edited (or null)
  editingCompany: null,

  fetchCompanies: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get('/superadmin/info/getCompanyInfo');
      if (response.data.success) {
        // Format the addresses array if missing
        const formatted = response.data.data.map((info) => ({
          ...info,
          addresses: info.addresses || [],
        }));
        set({ companies: formatted });
      } else {
        toast.error('Failed to fetch company information.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error fetching company information.');
    } finally {
      set({ loading: false });
    }
  },

  saveCompany: async (formData) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post(
        '/superadmin/info/saveCompanyInfo',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      if (response.data.success) {
        toast.success('Company information saved successfully!');
        await get().fetchCompanies();
      } else {
        toast.error(response.data.message || 'Failed to save company information.');
      }
    } catch (error) {
      console.error('Error saving company information:', error.message || error);
      toast.error(
        error.response?.data?.message ||
          'An error occurred while saving company information.'
      );
    } finally {
      set({ loading: false });
    }
  },

  updateCompany: async (id, formData) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.put(
        `/superadmin/info/editCompanyInfo/${id}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      if (response.data.success) {
        toast.success('Company information updated successfully!');
        await get().fetchCompanies();
      } else {
        toast.error(response.data.message || 'Failed to update company information.');
      }
    } catch (error) {
      console.error('Error updating company information:', error.message || error);
      toast.error(
        error.response?.data?.message ||
          'An error occurred while updating company information.'
      );
    } finally {
      set({ loading: false, editingCompany: null });
    }
  },

  deleteCompany: async (id) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.delete(
        `/superadmin/info/deleteCompanyInfo/${id}`
      );
      if (response.data.success) {
        toast.success('Company information deleted successfully!');
        await get().fetchCompanies();
      } else {
        toast.error('Failed to delete company information.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error deleting company information.');
    } finally {
      set({ loading: false });
    }
  },

  // Set (or clear) the company that is being edited.
  setEditingCompany: (company) => set({ editingCompany: company }),
  clearEditingCompany: () => set({ editingCompany: null }),
}));

export default useCompanyStore;
