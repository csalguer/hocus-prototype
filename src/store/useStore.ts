import { create } from 'zustand';
import { User, LanguageLevel } from '../types';

interface Store {
  user: User | null;
  currentLevel: LanguageLevel;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setCurrentLevel: (level: LanguageLevel) => void;
  setIsAuthenticated: (value: boolean) => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  currentLevel: 'A1',
  isAuthenticated: false,
  setUser: (user) => set({ user }),
  setCurrentLevel: (level) => set({ currentLevel: level }),
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
}));
