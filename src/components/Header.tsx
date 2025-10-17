import React from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
  score: number;
  bestScore: number;
  onRestart: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  moveCount?: number;
  timeElapsed?: number;
  gameMode?: import('../types').GameMode;
  themeColors?: import('../utils/themeUtils').ThemeColors;
}

export const Header: React.FC<HeaderProps> = React.memo(({ 
  score, 
  bestScore, 
  onRestart, 
  onUndo, 
  onRedo, 
  canUndo = false, 
  canRedo = false, 
  moveCount = 0, 
  timeElapsed = 0, 
  gameMode = 'classic',
  themeColors
}) => {
  const formatGameMode = (mode: string) => {
    switch (mode) {
      case 'timeAttack': return 'Time Attack';
      case 'zen': return 'Zen Mode';
      case 'challenge': return 'Challenge';
      default: return 'Classic';
    }
  };
  return (
    <div className="game-header" style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'flex-start',
      marginBottom: '20px',
      flexWrap: 'wrap',
      gap: '16px',
      width: '100%'
    }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: 'bold', 
            color: themeColors?.text || '#776e65',
            margin: 0,
            lineHeight: 1
          }}>
            2048
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              color: themeColors?.textSecondary || '#8f7a66', 
              fontSize: '14px',
              fontWeight: '500'
            }}>
              by
            </span>
            <a 
              href="https://siddharth-dev.tech" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: '#776e65', 
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600',
                borderBottom: '1px solid transparent',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#8f7a66';
                e.currentTarget.style.borderBottomColor = '#8f7a66';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#776e65';
                e.currentTarget.style.borderBottomColor = 'transparent';
              }}
            >
              Siddharth
            </a>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <p style={{ 
              color: '#776e65', 
              margin: 0,
              fontSize: '14px'
            }}>
              Join the tiles, get to 2048!
            </p>
            <span style={{
              backgroundColor: '#8f7a66',
              color: '#f9f6f2',
              fontSize: '10px',
              padding: '2px 6px',
              borderRadius: '3px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}>
              {formatGameMode(gameMode)}
            </span>
          </div>
          <a 
            href="mailto:contact@siddharth-dev.tech"
            style={{ 
              color: '#8f7a66', 
              textDecoration: 'none',
              fontSize: '12px',
              padding: '2px 6px',
              backgroundColor: '#f2f2f2',
              borderRadius: '3px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e8e8e8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f2f2f2';
            }}
          >
            📧 contact@siddharth-dev.tech
          </a>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{
            backgroundColor: themeColors?.score || '#bbada0',
            padding: '6px 12px',
            borderRadius: '4px',
            textAlign: 'center',
            minWidth: '60px'
          }}>
            <div style={{ fontSize: '10px', color: themeColors?.scoreText || '#eee4da', fontWeight: 'bold' }}>MOVES</div>
            <div style={{ fontSize: '16px', color: themeColors?.scoreText || 'white', fontWeight: 'bold' }}>{moveCount}</div>
          </div>
          
          <div style={{
            backgroundColor: themeColors?.score || '#bbada0',
            padding: '6px 12px',
            borderRadius: '4px',
            textAlign: 'center',
            minWidth: '60px'
          }}>
            <div style={{ fontSize: '10px', color: themeColors?.scoreText || '#eee4da', fontWeight: 'bold' }}>TIME</div>
            <div style={{ fontSize: '16px', color: themeColors?.scoreText || 'white', fontWeight: 'bold' }}>
              {Math.floor(timeElapsed / 60000)}:{String(Math.floor((timeElapsed % 60000) / 1000)).padStart(2, '0')}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <div className="score-container" style={{
            backgroundColor: themeColors?.score || '#bbada0',
            padding: '8px 16px',
            borderRadius: '4px',
            textAlign: 'center',
            minWidth: '80px'
          }}>
            <div style={{ 
              fontSize: '12px', 
              color: themeColors?.scoreText || '#eee4da', 
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}>
              Score
            </div>
            <motion.div 
              style={{ 
                fontSize: '20px', 
                color: themeColors?.scoreText || 'white', 
                fontWeight: 'bold' 
              }}
              key={score}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.1 }}
            >
              {score.toLocaleString()}
            </motion.div>
          </div>
          
          <div className="best-score-container" style={{
            backgroundColor: themeColors?.score || '#bbada0',
            padding: '8px 16px',
            borderRadius: '4px',
            textAlign: 'center',
            minWidth: '80px'
          }}>
            <div style={{ 
              fontSize: '12px', 
              color: themeColors?.scoreText || '#eee4da', 
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}>
              Best
            </div>
            <motion.div 
              style={{ 
                fontSize: '20px', 
                color: themeColors?.scoreText || 'white', 
                fontWeight: 'bold' 
              }}
              key={bestScore}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.1 }}
            >
              {bestScore.toLocaleString()}
            </motion.div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {onUndo && (
            <motion.button
              onClick={onUndo}
              disabled={!canUndo}
              style={{
                backgroundColor: canUndo ? (themeColors?.button || '#8f7a66') : '#ccc',
                color: themeColors?.buttonText || '#f9f6f2',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 12px',
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: canUndo ? 'pointer' : 'not-allowed',
                textTransform: 'uppercase',
              }}
              whileHover={canUndo ? { backgroundColor: themeColors?.buttonHover || '#9f8a76' } : {}}
              whileTap={canUndo ? { scale: 0.95 } : {}}
              transition={{ duration: 0.1 }}
            >
              ↶ Undo
            </motion.button>
          )}
          
          {onRedo && (
            <motion.button
              onClick={onRedo}
              disabled={!canRedo}
              style={{
                backgroundColor: canRedo ? '#8f7a66' : '#ccc',
                color: '#f9f6f2',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 12px',
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: canRedo ? 'pointer' : 'not-allowed',
                textTransform: 'uppercase',
              }}
              whileHover={canRedo ? { backgroundColor: '#9f8a76' } : {}}
              whileTap={canRedo ? { scale: 0.95 } : {}}
              transition={{ duration: 0.1 }}
            >
              ↷ Redo
            </motion.button>
          )}
          
          <motion.button
            className="restart-button"
            onClick={onRestart}
            style={{
              backgroundColor: '#8f7a66',
              color: '#f9f6f2',
              border: 'none',
              borderRadius: '4px',
              padding: '12px 20px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
            whileHover={{ backgroundColor: '#9f8a76' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
          >
            New Game
          </motion.button>
        </div>
      </div>
    </div>
  );
});
