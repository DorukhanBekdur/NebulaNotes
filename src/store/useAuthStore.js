import { create } from "zustand";

const useAuthStore = create((set) => ({
  isAuthenticated: false,

  login: (username, password) => {
    if (username && password) {
      set({ isAuthenticated: true });
    }
  },

  register: (username, password) => {
    if (username && password) {
      set({ isAuthenticated: true });
    }
  },

  logout: () => set({ isAuthenticated: false }),
}));

export default useAuthStore;
