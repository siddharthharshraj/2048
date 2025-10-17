import { useState, useCallback } from 'react';
import type { GameState, GameHistory } from '../types';

/**
 * Custom hook for managing game history with undo/redo functionality
 * Implements the Command Pattern for state management
 */
export const useGameHistory = (maxHistorySize: number = 10) => {
  const [history, setHistory] = useState<GameHistory>({
    states: [],
    currentIndex: -1,
    maxSize: maxHistorySize,
  });

  const saveState = useCallback((state: GameState) => {
    setHistory(prev => {
      // Remove any future states if we're not at the end
      const newStates = prev.states.slice(0, prev.currentIndex + 1);
      
      // Add the new state
      newStates.push({ ...state });
      
      // Limit history size
      if (newStates.length > maxHistorySize) {
        newStates.shift();
      }
      
      return {
        ...prev,
        states: newStates,
        currentIndex: newStates.length - 1,
      };
    });
  }, [maxHistorySize]);

  const undo = useCallback((): GameState | null => {
    if (history.currentIndex > 0) {
      const newIndex = history.currentIndex - 1;
      setHistory(prev => ({ ...prev, currentIndex: newIndex }));
      return history.states[newIndex];
    }
    return null;
  }, [history]);

  const redo = useCallback((): GameState | null => {
    if (history.currentIndex < history.states.length - 1) {
      const newIndex = history.currentIndex + 1;
      setHistory(prev => ({ ...prev, currentIndex: newIndex }));
      return history.states[newIndex];
    }
    return null;
  }, [history]);

  const clearHistory = useCallback(() => {
    setHistory({
      states: [],
      currentIndex: -1,
      maxSize: maxHistorySize,
    });
  }, [maxHistorySize]);

  return {
    saveState,
    undo,
    redo,
    clearHistory,
    canUndo: history.currentIndex > 0,
    canRedo: history.currentIndex < history.states.length - 1,
    historySize: history.states.length,
  };
};
