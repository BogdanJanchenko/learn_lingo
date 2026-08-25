'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/lib/stores/themeStore';

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const themeName = useThemeStore((state) => state.themeName);
  const setRandomTheme = useThemeStore((state) => state.setRandomTheme);

  useEffect(() => {
    setRandomTheme();
  }, [setRandomTheme]);

  useEffect(() => {
    if (!themeName) return;

    const root = document.documentElement;

    root.style.setProperty('--main', `var(--${themeName}-main)`);
    root.style.setProperty('--button', `var(--${themeName}-button)`);
    root.style.setProperty('--laptop', `var(--${themeName}-laptop)`);
  }, [themeName]);

  return children;
};
