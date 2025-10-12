import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("us_token") || null,
  setAuth: ({ user, token }) => {
    if (token) localStorage.setItem("us_token", token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem("us_token");
    set({ user: null, token: null });
  },
}));
