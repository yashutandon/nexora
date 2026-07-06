import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "PRO" | "ADMIN";
  image?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  
  // Actions
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

/**
 * Global Auth Store using Zustand.
 * Persisted in localStorage so the user stays logged in across refreshes.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,

      login: (user, token) => set({ user, token, isLoggedIn: true }),
      
      logout: () => {
        // Also clear any other tokens/cookies if needed
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth_token");
        }
        set({ user: null, token: null, isLoggedIn: false });
      },

      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
    }),
    {
      name: "auth-storage", // name of the item in the storage (must be unique)
      // Only persist these specific fields (optional)
      // partialize: (state) => ({ user: state.user, token: state.token }), 
    }
  )
);
