import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/user";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;
  setUser: (user: User) => void;
  setHasHydrated: (state: boolean) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      _hasHydrated: false,

      setUser: (user: User) =>
        set({
          user,
          isAuthenticated: true,
        }),

      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state });
      },
      clearIsAuthenticated: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
