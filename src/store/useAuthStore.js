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

    user: null,
    isAuthenticated: false,
    login: (username, email, password) => {

      const userData = { username, email };
      set({ user: userData, isAuthenticated: true });
    },
    logout: () => set({ user: null, isAuthenticated: false }),

  logout: () => set({user: null, isAuthenticated: false }),
}));

export default useAuthStore;
