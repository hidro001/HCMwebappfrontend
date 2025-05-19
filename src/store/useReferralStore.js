import { create } from 'zustand';
import axiosInstance from '../service/axiosInstance'; // or your path

const useReferralStore = create((set, get) => ({
  referrals: [],
  loading: false,
  error: null,

  // 1) FETCH ALL REFERRALS (GET /referrals)
  fetchAllReferrals: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.get('recruitment/referrals');
      // response.data.data should be the array of referrals
      set({
        referrals: response.data.data, // shaped similarly to your DUMMY_REFERRALS
        loading: false,
      });
    } catch (err) {
      console.error('Error fetching referrals:', err);
      set({
        loading: false,
        error: err?.response?.data?.message || 'Error fetching referrals',
      });
    }
  },

  // 2) UPDATE REFERRAL STATUS (PUT /referrals/:referralId/status)
  updateReferralStatus: async (referralId, newStatus, feedback) => {
    try {
      set({ loading: true });
      const payload = { status: newStatus, feedback };
      const response = await axiosInstance.put(
        `recruitment/referrals/${referralId}/status`,
        payload
      );
      const updatedData = response.data.data; // e.g. { id, designation, status, etc. }

      // After updating on the server, update local state
      set((state) => {
        const updatedList = state.referrals.map((r) =>
          r.id === updatedData.id ? updatedData : r
        );
        return { referrals: updatedList, loading: false };
      });

      return updatedData;
    } catch (err) {
      console.error('Error updating referral status:', err);
      set({ loading: false });
      throw err;
    }
  },

  
}));

export default useReferralStore;
