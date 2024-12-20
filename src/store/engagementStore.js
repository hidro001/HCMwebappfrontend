// src/store/engagementStore.js
import { create } from 'zustand';

const useEngagementStore = create((set) => ({
  permissions: ['view', 'addComment'], // Default permissions
  setPermissions: (newPermissions) => set({ permissions: newPermissions }),
  addPermission: (permission) =>
    set((state) => ({
      permissions: [...state.permissions, permission],
    })),
  removePermission: (permission) =>
    set((state) => ({
      permissions: state.permissions.filter((perm) => perm !== permission),
    })),
  resetPermissions: () => set({ permissions: ['view', 'addComment'] }),
}));

export default useEngagementStore;
