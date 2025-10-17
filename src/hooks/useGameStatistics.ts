import { useState, useCallback } from 'react';
import type { GameStatistics, GameState } from '../types';

const STATISTICS_KEY = 'game2048-statistics';

/**
 * Custom hook for tracking game statistics and analytics
 * Implements the Observer Pattern for statistics tracking
 */
export const useGameStatistics = () => {
  const [statistics, setStatistics] = useState<GameStatistics>(() => {
    try {
      const saved = localStorage.getItem(STATISTICS_KEY);
      return saved ? JSON.parse(saved) : {
        gamesPlayed: 0,
        gamesWon: 0,
        totalScore: 0,
        bestScore: 0,
        averageScore: 0,
        totalMoves: 0,
        totalTime: 0,
        winRate: 0,
      };
    } catch {
      return {
        gamesPlayed: 0,
        gamesWon: 0,
        totalScore: 0,
        bestScore: 0,
        averageScore: 0,
        totalMoves: 0,
        totalTime: 0,
        winRate: 0,
      };
    }
  });

  const saveStatistics = useCallback((stats: GameStatistics) => {
    try {
      localStorage.setItem(STATISTICS_KEY, JSON.stringify(stats));
    } catch {
      // Silently fail if localStorage is not available
    }
  }, []);

  const updateStatistics = useCallback((gameState: GameState, isGameEnd: boolean = false) => {
    setStatistics(prev => {
      const newStats = { ...prev };

      // Always update real-time stats
      newStats.bestScore = Math.max(prev.bestScore, gameState.score);

      // Only update game completion stats when game ends
      if (isGameEnd) {
        newStats.gamesWon = gameState.gameStatus === 'won' ? prev.gamesWon + 1 : prev.gamesWon;
        newStats.totalScore = prev.totalScore + gameState.score;
        newStats.totalMoves = prev.totalMoves + gameState.moveCount;
        newStats.totalTime = prev.totalTime + gameState.timeElapsed;

        // Calculate derived statistics
        newStats.averageScore = newStats.gamesPlayed > 0 ? newStats.totalScore / newStats.gamesPlayed : 0;
        newStats.winRate = newStats.gamesPlayed > 0 ? (newStats.gamesWon / newStats.gamesPlayed) * 100 : 0;
      }

      saveStatistics(newStats);
      return newStats;
    });
  }, [saveStatistics]);

  const incrementGamesPlayed = useCallback(() => {
    setStatistics(prev => {
      const newStats = {
        ...prev,
        gamesPlayed: prev.gamesPlayed + 1,
      };
      
      // Recalculate derived statistics
      newStats.averageScore = newStats.gamesPlayed > 0 ? newStats.totalScore / newStats.gamesPlayed : 0;
      newStats.winRate = newStats.gamesPlayed > 0 ? (newStats.gamesWon / newStats.gamesPlayed) * 100 : 0;

      saveStatistics(newStats);
      return newStats;
    });
  }, [saveStatistics]);

  const resetStatistics = useCallback(() => {
    const emptyStats: GameStatistics = {
      gamesPlayed: 0,
      gamesWon: 0,
      totalScore: 0,
      bestScore: 0,
      averageScore: 0,
      totalMoves: 0,
      totalTime: 0,
      winRate: 0,
    };
    setStatistics(emptyStats);
    saveStatistics(emptyStats);
  }, [saveStatistics]);

  return {
    statistics,
    updateStatistics,
    incrementGamesPlayed,
    resetStatistics,
  };
};
