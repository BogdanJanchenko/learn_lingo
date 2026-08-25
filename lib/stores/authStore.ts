import { create } from 'zustand';
import type { User } from 'firebase/auth';

interface AuthState {
  currentUser: User | null;
  authChecked: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  authChecked: false,
  isAuthenticated: false,
  setUser: (user) =>
    set({
      currentUser: user,
      authChecked: true,
      isAuthenticated: !!user,
    }),
}));
