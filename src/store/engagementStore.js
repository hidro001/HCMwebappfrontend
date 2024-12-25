
import {create} from "zustand";

const useEngagementStore = create((set) => ({
  permissions: [],

  setPermissions: (newPermissions) => set({ permissions: newPermissions }),

  resetPermissions: () => set({ permissions: [] }),
}));

export default useEngagementStore;
