import type { Theme } from '../types';

export interface ThemeColors {
  background: string;
  gameContainer: string;
  text: string;
  textSecondary: string;
  boardBackground: string;
  tileBackground: string;
  tileEmpty: string;
  button: string;
  buttonText: string;
  buttonHover: string;
  score: string;
  scoreText: string;
  modal: string;
  modalOverlay: string;
}

export const themes: Record<Theme, ThemeColors> = {
  default: {
    background: '#faf8ef',
    gameContainer: '#faf8ef',
    text: '#776e65',
    textSecondary: '#8f7a66',
    boardBackground: '#bbada0',
    tileBackground: '#cdc1b4',
    tileEmpty: 'rgba(238, 228, 218, 0.35)',
    button: '#8f7a66',
    buttonText: '#f9f6f2',
    buttonHover: '#9f8a76',
    score: '#bbada0',
    scoreText: '#eee4da',
    modal: '#f9f6f2',
    modalOverlay: 'rgba(255, 255, 255, 0.8)',
  },
  dark: {
    background: '#2d3748',
    gameContainer: '#2d3748',
    text: '#e2e8f0',
    textSecondary: '#a0aec0',
    boardBackground: '#4a5568',
    tileBackground: '#718096',
    tileEmpty: 'rgba(113, 128, 150, 0.35)',
    button: '#4299e1',
    buttonText: '#ffffff',
    buttonHover: '#3182ce',
    score: '#4a5568',
    scoreText: '#e2e8f0',
    modal: '#1a202c',
    modalOverlay: 'rgba(0, 0, 0, 0.8)',
  },
  neon: {
    background: '#1a202c',
    gameContainer: '#1a202c',
    text: '#00ff88',
    textSecondary: '#00ccff',
    boardBackground: '#2d3748',
    tileBackground: '#4a5568',
    tileEmpty: 'rgba(0, 255, 136, 0.1)',
    button: '#ff0080',
    buttonText: '#ffffff',
    buttonHover: '#cc0066',
    score: '#2d3748',
    scoreText: '#00ff88',
    modal: '#2d3748',
    modalOverlay: 'rgba(0, 0, 0, 0.9)',
  },
  minimal: {
    background: '#ffffff',
    gameContainer: '#ffffff',
    text: '#333333',
    textSecondary: '#666666',
    boardBackground: '#f0f0f0',
    tileBackground: '#e0e0e0',
    tileEmpty: 'rgba(224, 224, 224, 0.5)',
    button: '#333333',
    buttonText: '#ffffff',
    buttonHover: '#555555',
    score: '#f0f0f0',
    scoreText: '#333333',
    modal: '#ffffff',
    modalOverlay: 'rgba(0, 0, 0, 0.5)',
  },
};

export const getTileColor = (value: number, theme: Theme): { background: string; color: string } => {
  const baseColors = themes[theme];
  
  if (value === 0) {
    return {
      background: baseColors.tileEmpty,
      color: 'transparent',
    };
  }

  // Generate colors based on tile value
  const colorMap: Record<number, { background: string; color: string }> = {
    2: { background: '#eee4da', color: '#776e65' },
    4: { background: '#ede0c8', color: '#776e65' },
    8: { background: '#f2b179', color: '#f9f6f2' },
    16: { background: '#f59563', color: '#f9f6f2' },
    32: { background: '#f67c5f', color: '#f9f6f2' },
    64: { background: '#f65e3b', color: '#f9f6f2' },
    128: { background: '#edcf72', color: '#f9f6f2' },
    256: { background: '#edcc61', color: '#f9f6f2' },
    512: { background: '#edc850', color: '#f9f6f2' },
    1024: { background: '#edc53f', color: '#f9f6f2' },
    2048: { background: '#edc22e', color: '#f9f6f2' },
  };

  // For values higher than 2048, use a golden color
  if (value > 2048) {
    return { background: '#3c3a32', color: '#f9f6f2' };
  }

  return colorMap[value] || { background: baseColors.tileBackground, color: baseColors.text };
};

export const applyThemeToBody = (theme: Theme): void => {
  const themeColors = themes[theme];
  document.body.style.backgroundColor = themeColors.background;
  document.body.style.color = themeColors.text;
};
