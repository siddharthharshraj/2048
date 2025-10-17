import { useState, useCallback, useEffect, useRef } from 'react';
import type { Direction, GameState, GameStatus, GameMode } from '../types';
import { initializeBoard, addRandomTile } from '../utils/boardUtils';
import { moveBoard } from '../utils/moveUtils';
import { checkWin, checkGameOver } from '../utils/gameStatusUtils';
import { useGameHistory } from './useGameHistory';

const BEST_SCORE_KEY = 'game2048-best-score';
const GAME_STATE_KEY = 'game2048-current-game';

interface UseGameLogicReturn {
  gameState: GameState;
  makeMove: (direction: Direction) => void;
  restartGame: () => void;
  isGameWon: boolean;
  isGameOver: boolean;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  setGameMode: (mode: GameMode) => void;
}

export const useGameLogic = (boardSize: number = 4): UseGameLogicReturn => {
  const gameHistory = useGameHistory(10);
  const startTimeRef = useRef<number>(Date.now());
  const lastMoveTimeRef = useRef<number>(Date.now());
  const pausedTimeRef = useRef<number>(0);
  const isPausedRef = useRef<boolean>(false);
  
  const INACTIVITY_TIMEOUT = 5 * 60 * 1000;

  const getCurrentTimeElapsed = useCallback((): number => {
    const now = Date.now();
    const timeSinceLastMove = now - lastMoveTimeRef.current;
    
    if (timeSinceLastMove > INACTIVITY_TIMEOUT && !isPausedRef.current) {
      isPausedRef.current = true;
      pausedTimeRef.current = now;
      return lastMoveTimeRef.current - startTimeRef.current;
    } else if (isPausedRef.current) {
      return lastMoveTimeRef.current - startTimeRef.current;
    } else {
      return now - startTimeRef.current;
    }
  }, [INACTIVITY_TIMEOUT]);

  const loadBestScore = (): number => {
    try {
      const saved = localStorage.getItem(BEST_SCORE_KEY);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  };

  const saveBestScore = (score: number): void => {
    try {
      localStorage.setItem(BEST_SCORE_KEY, score.toString());
    } catch {
    }
  };

  const saveGameState = (state: GameState): void => {
    try {
      localStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));
    } catch {
    }
  };

  const loadGameState = (): GameState | null => {
    try {
      const saved = localStorage.getItem(GAME_STATE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  };

  const createInitialState = (preserveMode?: GameMode): GameState => ({
    board: initializeBoard(boardSize),
    score: 0,
    bestScore: loadBestScore(),
    gameStatus: 'playing' as GameStatus,
    boardSize,
    moveCount: 0,
    timeElapsed: 0,
    mode: preserveMode || 'classic' as GameMode,
  });

  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = loadGameState();
    return saved && saved.boardSize === boardSize ? saved : createInitialState();
  });

  // Update best score when score changes
  useEffect(() => {
    if (gameState.score > gameState.bestScore) {
      const newBestScore = gameState.score;
      setGameState(prev => ({ ...prev, bestScore: newBestScore }));
      saveBestScore(newBestScore);
    }
  }, [gameState.score, gameState.bestScore]);

  // Check game status after board changes
  useEffect(() => {
    if (gameState.gameStatus === 'playing') {
      if (checkWin(gameState.board)) {
        setGameState(prev => ({ ...prev, gameStatus: 'won' }));
      } else if (checkGameOver(gameState.board)) {
        setGameState(prev => ({ ...prev, gameStatus: 'over' }));
      }
    }
  }, [gameState.board, gameState.gameStatus]);

  const makeMove = useCallback((direction: Direction) => {
    if (gameState.gameStatus !== 'playing') {
      return;
    }

    const moveResult = moveBoard(gameState.board, direction);
    
    if (!moveResult.moved) {
      return; // No valid move
    }

    // Update last move time and resume timer if paused
    const now = Date.now();
    lastMoveTimeRef.current = now;
    
    // If timer was paused, adjust start time to account for pause duration
    if (isPausedRef.current) {
      const pauseDuration = now - pausedTimeRef.current;
      startTimeRef.current += pauseDuration;
      isPausedRef.current = false;
    }

    // Save current state to history before making the move
    gameHistory.saveState(gameState);

    // Add a new random tile after a successful move
    const boardWithNewTile = addRandomTile(moveResult.newBoard);
    
    const newState = {
      ...gameState,
      board: boardWithNewTile,
      score: gameState.score + moveResult.scoreGained,
      moveCount: gameState.moveCount + 1,
      timeElapsed: getCurrentTimeElapsed(),
    };

    setGameState(newState);
    saveGameState(newState);
  }, [gameState, gameHistory, saveGameState, getCurrentTimeElapsed]);

  const restartGame = useCallback((preserveMode?: GameMode) => {
    const modeToUse = preserveMode || gameState.mode;
    const newState = createInitialState(modeToUse);
    setGameState(newState);
    gameHistory.clearHistory();
    
    // Reset all timer references
    const now = Date.now();
    startTimeRef.current = now;
    lastMoveTimeRef.current = now;
    pausedTimeRef.current = 0;
    isPausedRef.current = false;
    
    saveGameState(newState);
  }, [boardSize, gameHistory, saveGameState, gameState.mode]);

  const undo = useCallback(() => {
    const previousState = gameHistory.undo();
    if (previousState) {
      // Update last move time and resume timer if paused
      const now = Date.now();
      lastMoveTimeRef.current = now;
      
      if (isPausedRef.current) {
        const pauseDuration = now - pausedTimeRef.current;
        startTimeRef.current += pauseDuration;
        isPausedRef.current = false;
      }
      
      setGameState(previousState);
      saveGameState(previousState);
    }
  }, [gameHistory, saveGameState]);

  const redo = useCallback(() => {
    const nextState = gameHistory.redo();
    if (nextState) {
      // Update last move time and resume timer if paused
      const now = Date.now();
      lastMoveTimeRef.current = now;
      
      if (isPausedRef.current) {
        const pauseDuration = now - pausedTimeRef.current;
        startTimeRef.current += pauseDuration;
        isPausedRef.current = false;
      }
      
      setGameState(nextState);
      saveGameState(nextState);
    }
  }, [gameHistory, saveGameState]);

  const setGameMode = useCallback((mode: GameMode) => {
    const newState = { ...gameState, mode };
    setGameState(newState);
    saveGameState(newState);
  }, [gameState, saveGameState]);

  // Update board size when it changes
  useEffect(() => {
    if (gameState.boardSize !== boardSize) {
      const newState = createInitialState();
      setGameState(newState);
      gameHistory.clearHistory();
      
      // Reset all timer references
      const now = Date.now();
      startTimeRef.current = now;
      lastMoveTimeRef.current = now;
      pausedTimeRef.current = 0;
      isPausedRef.current = false;
    }
  }, [boardSize, gameState.boardSize, gameHistory]);

  // Auto-save game state periodically and handle timer pausing
  useEffect(() => {
    const interval = setInterval(() => {
      if (gameState.gameStatus === 'playing') {
        const currentTimeElapsed = getCurrentTimeElapsed();
        const updatedState = {
          ...gameState,
          timeElapsed: currentTimeElapsed,
        };
        setGameState(updatedState);
        saveGameState(updatedState);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, saveGameState, getCurrentTimeElapsed]);

  return {
    gameState,
    makeMove,
    restartGame,
    undo,
    redo,
    canUndo: gameHistory.canUndo,
    canRedo: gameHistory.canRedo,
    setGameMode,
    isGameWon: gameState.gameStatus === 'won',
    isGameOver: gameState.gameStatus === 'over',
  };
};
