
import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import axiosInstance from '../service/axiosInstance'; // Adjust the path as needed

/**
 * Transform the server's POSH Act object into the shape needed in the UI.
 * (Renames "_id" to "id", formats names, etc.)
 */
const transformPoshAct = (act) => ({
  id: act._id,
  reporterId: act?.reporter?.employee_Id || 'N/A',
  reporterName: `${act?.reporter?.first_Name || ''} ${act?.reporter?.last_Name || ''}`.trim(),
  accusedId: act?.accused?.employee_Id || 'N/A',
  accusedName: `${act?.accused?.first_Name || ''} ${act?.accused?.last_Name || ''}`.trim(),
  incidentDate: act.dateOfIncident,
  status: act.status,
  type: act.type,
  description: act.description,
  attachments: act.attachments || [],
  comments: act.comments || [],
});

export const usePoshStore = create((set, get) => ({
  poshActs: [],
  employees: [],
  loading: false,

  // Fetch all POSH Acts
  fetchPoshActs: async () => {
    try {
      set({ loading: true });
      const response = await axiosInstance.get('/posh/all');
      // Assume the server returns an array of POSH Acts
      const transformed = response.data.map(transformPoshAct);
      set({ poshActs: transformed, loading: false });
    } catch (err) {
      console.error('Error fetching all POSH Acts:', err);
      set({ loading: false });
      toast.error(err.response?.data?.msg || 'Failed to load POSH Acts');
    }
  },

  // Fetch all user-specific POSH Acts
  fetchAllUserPoshActs: async () => {
    try {
      set({ loading: true });
      const response = await axiosInstance.get('/posh/user');
      const transformed = response.data.map(transformPoshAct);
      set({ poshActs: transformed, loading: false });
    } catch (err) {
      console.error('Error fetching user POSH Acts:', err);
      set({ loading: false });
      toast.error(err.response?.data?.msg || 'Failed to load POSH Acts');
    }
  },

  // Fetch a single POSH Act's details (e.g. for "View Details" or comments)
  fetchPoshActDetails: async (id) => {
    try {
      const response = await axiosInstance.get(`/posh/${id}`);
      const updated = transformPoshAct(response.data);
      // Update the POSH Act in the local store
      const currentActs = get().poshActs;
      const newActs = currentActs.map((act) => (act.id === id ? updated : act));
      set({ poshActs: newActs });
      return updated; // Return for local state updates if needed
    } catch (err) {
      console.error('Error fetching POSH Act details:', err);
      toast.error(err.response?.data?.msg || 'Failed to load POSH Act details');
      throw err;
    }
  },

  // Update the status of a POSH Act
  updatePoshActStatus: async (id, newStatus) => {
    try {
      const response = await axiosInstance.put(`/posh/${id}/status`, { status: newStatus });
      const updated = transformPoshAct(response.data);
      // Update the store with the updated POSH Act
      set((state) => ({
        poshActs: state.poshActs.map((act) => (act.id === id ? updated : act)),
      }));
      toast.success('Status updated successfully');
    } catch (err) {
      console.error('Error updating status:', err);
      toast.error(err.response?.data?.msg || 'Failed to update status');
    }
  },

  // Add a comment to a POSH Act
  addPoshActComment: async (id, message) => {
    try {
      const response = await axiosInstance.post(`/posh/${id}/comments`, { message });
      const updated = transformPoshAct(response.data);
      // Update the local store with the new comment
      set((state) => ({
        poshActs: state.poshActs.map((act) => (act.id === id ? updated : act)),
      }));
      toast.success('Comment added successfully');
      return updated;
    } catch (err) {
      console.error('Error adding comment:', err);
      toast.error(err.response?.data?.msg || 'Failed to add comment');
      throw err;
    }
  },

  // Create a new POSH Act
  createPoshAct: async (formData) => {
    try {
      const response = await axiosInstance.post('/posh', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const transformed = transformPoshAct(response.data);
      // Prepend the new POSH Act to the existing list
      set((state) => ({ poshActs: [transformed, ...state.poshActs] }));
      toast.success('POSH Act filed successfully!');
      return transformed;
    } catch (err) {
      console.error('Error creating POSH Act:', err);
      toast.error(err.response?.data?.msg || 'Failed to create POSH Act');
      throw err;
    }
  },

  // Update an existing POSH Act
  updatePoshAct: async (id, formData) => {
    try {
      const response = await axiosInstance.put(`/posh/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const transformed = transformPoshAct(response.data);
      // Update the modified POSH Act in the store
      set((state) => ({
        poshActs: state.poshActs.map((act) => (act.id === id ? transformed : act)),
      }));
      toast.success('POSH Act updated successfully!');
      return transformed;
    } catch (err) {
      console.error('Error updating POSH Act:', err);
      toast.error(err.response?.data?.msg || 'Failed to update POSH Act');
      throw err;
    }
  },

  // Fetch all employees (for example, to populate a dropdown)
  fetchAllEmployees: async () => {
    try {
      set({ loading: true });
      const response = await axiosInstance.get('/user/get-all');
      // Assuming the server returns the employees array in response.data.data
      set({ employees: response.data.data, loading: false });
    } catch (err) {
      console.error('Error fetching employees:', err);
      toast.error(err.response?.data?.msg || 'Failed to load employee list');
      set({ loading: false });
    }
  },

  // Delete a POSH Act
  deletePoshAct: async (id) => {
    try {
      await axiosInstance.delete(`/posh/${id}`);
      // Remove the deleted act from the local store
      set((state) => ({
        poshActs: state.poshActs.filter((act) => act.id !== id),
      }));
      toast.success('POSH Act deleted successfully');
    } catch (err) {
      console.error('Error deleting POSH Act:', err);
      toast.error(err.response?.data?.msg || 'Failed to delete POSH Act');
      throw err;
    }
  },
}));
