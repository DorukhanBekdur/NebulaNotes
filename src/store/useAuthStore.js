import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  register: (username, email, password) => {
    console.log("Register function called with:", { username, email, password });
    const newUser = { username, email, bio: "This is your profile bio." }; 
    set({ user: newUser, isAuthenticated: true });
  },

  login: (username, password) => {
    console.log("Login function called with:", { username, password });
    set((state) => ({
      user: { ...state.user, username },
      isAuthenticated: true,
    }));
  },
  
  updateBio: (newBio) => {
    set((state) => ({
      user: { ...state.user, bio: newBio },
    }));
  },

  logout: () => {
    console.log("User logged out");
    set({ user: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
