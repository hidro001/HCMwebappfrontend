import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import poshService from '../service/poshService';
import axiosInstance from '../service/axiosInstance'; 


/**
 * Transform the server's POSH Act object into the shape we need in the UI
 * (like "reporterId", "reporterName", "incidentDate", etc.).
 */
const transformPoshAct = (act) => {
  return {
    // The server has _id for the doc. Let’s rename to 'id' for UI usage.
    id: act._id,
    reporterId: act?.reporter?.employee_Id || 'N/A',
    reporterName: `${act?.reporter?.first_Name || ''} ${act?.reporter?.last_Name || ''}`.trim(),
    accusedId: act?.accused?.employee_Id || 'N/A',
    accusedName: `${act?.accused?.first_Name || ''} ${act?.accused?.last_Name || ''}`.trim(),
    incidentDate: act.dateOfIncident,
    status: act.status,
    // For IssueDetailsModal
    type: act.type,
    description: act.description,
    attachments: act.attachments || [],
    comments: act.comments || [],
  };
};

export const usePoshStore = create((set, get) => ({
  poshActs: [],
  employees: [],   // <-- add this
  loading: false,
  
  // Fetch all POSH Acts from server:
  fetchPoshActs: async () => {
    try {
      set({ loading: true });
      const data = await poshService.fetchAllPoshActs();
      // Transform each act
      const transformed = data.map(transformPoshAct);
      set({ poshActs: transformed, loading: false });
    } catch (err) {
      console.error('Error fetching all POSH Acts:', err);
      set({ loading: false });
      toast.error(err.response?.data?.msg || 'Failed to load POSH Acts');
    }
  },

  fetchAllUserPoshActs: async () => {
    try {
      set({ loading: true });
      const data = await poshService.fetchAllUserPoshActs();
      // Transform each act
      const transformed = data.map(transformPoshAct);
      set({ poshActs: transformed, loading: false });
    } catch (err) {
      console.error('Error fetching all POSH Acts:', err);
      set({ loading: false });
      toast.error(err.response?.data?.msg || 'Failed to load POSH Acts');
    }
  },

  // Fetch single POSH Act details (for "View Details" / comments):
  fetchPoshActDetails: async (id) => {
    try {
      const data = await poshService.fetchPoshActById(id);
      // Transform the server data
      const updated = transformPoshAct(data);
      // Update the poshActs array with this updated item
      const currentActs = get().poshActs;
      const newActs = currentActs.map((act) => (act.id === id ? updated : act));
      set({ poshActs: newActs });
      return updated; // so the caller can set local state if desired
    } catch (err) {
      console.error('Error fetching POSH Act details:', err);
      toast.error(err.response?.data?.msg || 'Failed to load POSH Act details');
      throw err;
    }
  },

  // Update Status
  updatePoshActStatus: async (id, newStatus) => {
    try {
      const updatedServerAct = await poshService.updateStatus(id, newStatus);
      const updated = transformPoshAct(updatedServerAct);
      // Replace in local store
      set((state) => ({
        poshActs: state.poshActs.map((act) => (act.id === id ? updated : act)),
      }));
      toast.success('Status updated successfully');
    } catch (err) {
      console.error('Error updating status:', err);
      toast.error(err.response?.data?.msg || 'Failed to update status');
    }
  },

  // Add Comment
  addPoshActComment: async (id, message) => {
    try {
      const updatedServerAct = await poshService.addComment(id, message);
      const updated = transformPoshAct(updatedServerAct);
      // Replace in local store
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

  createPoshAct: async (formData) => {
    try {
      const newPoshAct = await poshService.createPoshAct(formData);
      const transformed = transformPoshAct(newPoshAct);

      // Prepend it to the store’s poshActs
      set((state) => ({ poshActs: [transformed, ...state.poshActs] }));
      toast.success('POSH Act filed successfully!');
      return transformed;
    } catch (err) {
      console.error('Error creating POSH Act:', err);
      toast.error(err.response?.data?.msg || 'Failed to create POSH Act');
      throw err;
    }
  },

  // UPDATE
  updatePoshAct: async (id, formData) => {
    try {
      const updatedPoshAct = await poshService.updatePoshAct(id, formData);
      const transformed = transformPoshAct(updatedPoshAct);

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

  fetchAllEmployees: async () => {
    try {
      set({ loading: true });
      const response = await axiosInstance.get('/user/all-user');
      // Suppose server returns `response.data.data` as an array of employees
      set({ employees: response.data.data, loading: false });
    } catch (err) {
      console.error('Error fetching employees:', err);
      toast.error(err.response?.data?.msg || 'Failed to load employee list');
      set({ loading: false });
    }
  },

  // Delete POSH Act
  deletePoshAct: async (id) => {
    try {
      await poshService.deletePoshAct(id);
      // remove from local store
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
