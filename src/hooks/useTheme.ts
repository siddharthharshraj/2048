import { useEffect } from 'react';
import type { Theme } from '../types';
import { themes, applyThemeToBody } from '../utils/themeUtils';

/**
 * Custom hook for managing theme state and applying theme colors
 */
export const useTheme = (currentTheme: Theme) => {
  const themeColors = themes[currentTheme];

  // Apply theme to body when theme changes
  useEffect(() => {
    applyThemeToBody(currentTheme);
  }, [currentTheme]);

  return {
    colors: themeColors,
    theme: currentTheme,
  };
};
