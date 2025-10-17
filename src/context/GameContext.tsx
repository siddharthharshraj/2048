import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { GameSettings } from '../types';
import { GAME_CONFIG } from '../config/gameConfig';

interface GameContextType {
  settings: GameSettings;
  updateSettings: (newSettings: Partial<GameSettings>) => void;
}

const defaultSettings: GameSettings = {
  boardSize: 4,
  theme: 'default',
  soundEnabled: true,
  autoSave: true,
};

// Load settings from localStorage
const loadSettings = (): GameSettings => {
  try {
    const savedSettings = localStorage.getItem(GAME_CONFIG.STORAGE_KEYS.SETTINGS);
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      return {
        ...defaultSettings,
        ...parsed,
      };
    }
  } catch (error) {
    console.warn('Failed to load settings from localStorage:', error);
  }
  return defaultSettings;
};

// Save settings to localStorage
const saveSettings = (settings: GameSettings): void => {
  try {
    localStorage.setItem(GAME_CONFIG.STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.warn('Failed to save settings to localStorage:', error);
  }
};

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
  initialSettings?: Partial<GameSettings>;
}

export const GameProvider: React.FC<GameProviderProps> = ({ 
  children, 
  initialSettings = {} 
}) => {
  // Initialize with saved settings from localStorage
  const [settings, setSettings] = useState<GameSettings>(() => {
    const savedSettings = loadSettings();
    return {
      ...savedSettings,
      ...initialSettings,
    };
  });

  const updateSettings = (newSettings: Partial<GameSettings>) => {
    setSettings(prev => {
      const updated = {
        ...prev,
        ...newSettings,
      };
      // Save to localStorage whenever settings change
      saveSettings(updated);
      return updated;
    });
  };

  return (
    <GameContext.Provider value={{ settings, updateSettings }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameSettings = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameSettings must be used within a GameProvider');
  }
  return context;
};
