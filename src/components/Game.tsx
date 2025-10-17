import React, { useState, useEffect } from 'react';
import { useGameSettings } from '../context/GameContext';
import { useGameLogic } from '../hooks/useGameLogic';
import { useKeyboardInput } from '../hooks/useKeyboardInput';
import { useGameStatistics } from '../hooks/useGameStatistics';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { useTheme } from '../hooks/useTheme';
import { Header } from './Header';
import { Board, Controls } from './game/index';
import { GameOverModal, HelpToggle } from './ui/index';
import { Sidebar, HamburgerMenu, HelpSidebar } from './layout/index';
import type { GameMode } from '../types';

export const Game: React.FC = () => {
  const { settings, updateSettings } = useGameSettings();
  const { 
    gameState, 
    makeMove, 
    restartGame, 
    undo, 
    redo, 
    canUndo, 
    canRedo, 
    setGameMode,
    isGameWon, 
    isGameOver 
  } = useGameLogic(settings.boardSize);
  
  const { statistics, updateStatistics, incrementGamesPlayed, resetStatistics } = useGameStatistics();
  const soundEffects = useSoundEffects(settings.soundEnabled);
  const { colors } = useTheme(settings.theme);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHelpSidebarOpen, setIsHelpSidebarOpen] = useState(false);
  const [hasTrackedInitialGame, setHasTrackedInitialGame] = useState(false);
  // Handler functions with sound effects
  const handleRestart = () => {
    soundEffects.playNewGameSound();
    restartGame();
    incrementGamesPlayed(); // Track new game start immediately
  };

  const handleGameModeChange = (mode: GameMode) => {
    soundEffects.playButtonClickSound();
    setGameMode(mode);
    // Pass the mode directly to restartGame to avoid race condition
    (restartGame as any)(mode);
    incrementGamesPlayed(); // Track new game start immediately
  };

  const handleUndo = () => {
    soundEffects.playUndoSound();
    undo();
  };

  const handleRedo = () => {
    soundEffects.playRedoSound();
    redo();
  };

  const handleMove = (direction: any) => {
    const prevScore = gameState.score;
    makeMove(direction);
    
    // Play sound after move (will be triggered by score change)
    setTimeout(() => {
      if (gameState.score > prevScore) {
        // Calculate merged tile value from score difference
        const scoreDiff = gameState.score - prevScore;
        soundEffects.playMergeSound(scoreDiff);
      } else {
        soundEffects.playMoveSound();
      }
    }, 50);
  };

  // Enhanced keyboard input with undo/redo support
  useKeyboardInput({ 
    onMove: handleMove, 
    enabled: !isGameOver && !isGameWon,
    onUndo: handleUndo,
    onRedo: handleRedo,
  });

  // Track the initial game when app loads
  useEffect(() => {
    if (!hasTrackedInitialGame && gameState.moveCount === 0) {
      incrementGamesPlayed();
      setHasTrackedInitialGame(true);
    }
  }, [hasTrackedInitialGame, gameState.moveCount, incrementGamesPlayed]);

  // Update statistics in real-time (best score tracking)
  useEffect(() => {
    updateStatistics(gameState, false);
  }, [gameState.score, updateStatistics, gameState]);

  // Update statistics when game ends
  useEffect(() => {
    if (isGameOver || isGameWon) {
      updateStatistics(gameState, true);
      // Play appropriate sound effect
      if (isGameWon) {
        soundEffects.playWinSound();
      } else {
        soundEffects.playGameOverSound();
      }
    }
  }, [isGameOver, isGameWon, gameState, updateStatistics, soundEffects]);

  return (
    <>
      <HamburgerMenu 
        isOpen={isSidebarOpen}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        settings={settings}
        onSettingsChange={updateSettings}
        statistics={statistics}
        onResetStats={resetStatistics}
        onGameModeChange={handleGameModeChange}
        currentMode={gameState.mode}
      />

      <div className="main-content" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '30px',
        width: '100%',
        maxWidth: '1200px',
        backgroundColor: colors.gameContainer,
        color: colors.text,
        transition: 'all 0.3s ease',
        flexWrap: 'wrap',
      }}>
        <div className="game-container" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: '320px',
          flex: '0 0 auto',
        }}>
          <Header 
            score={gameState.score}
            bestScore={gameState.bestScore}
            onRestart={handleRestart}
            onUndo={handleUndo}
            onRedo={handleRedo}
            canUndo={canUndo}
            canRedo={canRedo}
            moveCount={gameState.moveCount}
            timeElapsed={gameState.timeElapsed}
            gameMode={gameState.mode}
            themeColors={colors}
          />
          
          <Board 
            board={gameState.board}
            boardSize={gameState.boardSize}
          />
          
          <div style={{
            textAlign: 'center',
            marginTop: '8px',
            marginBottom: '12px',
            fontSize: '11px',
            color: colors.textSecondary || '#8f7a66',
            opacity: 0.7,
            fontStyle: 'italic'
          }}>
            ⏱️ Timer pauses after 5 minutes of inactivity
          </div>
          
          <Controls 
            onMove={handleMove}
            disabled={isGameOver || isGameWon}
          />
          
          <HelpToggle
            onClick={() => setIsHelpSidebarOpen(!isHelpSidebarOpen)}
            isHelpOpen={isHelpSidebarOpen}
          />
        </div>
        
        <GameOverModal
          isVisible={isGameOver || isGameWon}
          isWon={isGameWon}
          score={gameState.score}
          onRestart={handleRestart}
          moveCount={gameState.moveCount}
          timeElapsed={gameState.timeElapsed}
        />

        <HelpSidebar
          isOpen={isHelpSidebarOpen}
          onClose={() => setIsHelpSidebarOpen(false)}
          gameMode={gameState.mode}
          themeColors={colors}
        />
      </div>
    </>
  );
};
