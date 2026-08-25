import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { themeNames, type ThemeName } from '@/styles/themes';

interface ThemeState {
  themeName: ThemeName | null;
  setRandomTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      themeName: null,

      setRandomTheme: () => {
        // Уже есть тема — ничего не делаем
        if (get().themeName) return;

        const random = themeNames[Math.floor(Math.random() * themeNames.length)];

        set({ themeName: random });
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);
