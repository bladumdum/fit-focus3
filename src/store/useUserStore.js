import create from "zustand";

// useUserStore — simple auth/profile store using Zustand
// State:
//  - user: object | null
//  - token: string | null (initial from localStorage)
//  - isAuthenticated: boolean
// Actions:
//  - login(userData, token)
//  - logout()
//  - updateUser(newUserData)

const STORAGE_KEY = "token";

const getInitialToken = () => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    return null;
  }
};

const initialToken = getInitialToken();

const useUserStore = create((set, get) => ({
  user: null,
  token: initialToken,
  isAuthenticated: !!initialToken,

  // login: save token, set user and mark authenticated
  login: (userData, token) => {
    try {
      if (token) localStorage.setItem(STORAGE_KEY, token);
    } catch (e) {}
    set({ user: userData || null, token: token || null, isAuthenticated: true });
  },

  // logout: clear token and reset user
  logout: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    set({ user: null, token: null, isAuthenticated: false });
  },

  // updateUser: shallow-merge new fields into existing user object
  updateUser: (newUserData) => {
    set((state) => ({ user: { ...(state.user || {}), ...(newUserData || {}) } }));
  },
}));

export default useUserStore;
