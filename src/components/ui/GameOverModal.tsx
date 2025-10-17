import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GameOverModalProps {
  isVisible: boolean;
  isWon: boolean;
  score: number;
  onRestart: () => void;
  onContinue?: () => void;
  moveCount?: number;
  timeElapsed?: number;
}

export const GameOverModal: React.FC<GameOverModalProps> = React.memo(({ 
  isVisible, 
  isWon, 
  score, 
  onRestart,
  onContinue,
  moveCount = 0,
  timeElapsed = 0
}) => {
  if (!isVisible) return null;

  const overlayStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const modalStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '32px',
    textAlign: 'center' as const,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    maxWidth: '400px',
    width: '90%',
    border: '2px solid #bbada0',
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: isWon ? '#f67c5f' : '#776e65',
    margin: '0 0 16px 0',
  };

  const messageStyle = {
    fontSize: '16px',
    color: '#776e65',
    margin: '0 0 24px 0',
    lineHeight: 1.4,
  };

  const scoreStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#776e65',
    margin: '0 0 24px 0',
  };

  const buttonStyle = {
    backgroundColor: '#8f7a66',
    color: '#f9f6f2',
    border: 'none',
    borderRadius: '4px',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textTransform: 'uppercase' as const,
    margin: '0 8px',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          style={overlayStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            style={modalStyle}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h2 style={titleStyle}>
              {isWon ? '🎉 You Win!' : '😔 Game Over'}
            </h2>
            
            <p style={messageStyle}>
              {isWon 
                ? 'Congratulations! You reached 2048!' 
                : 'No more moves available. Better luck next time!'
              }
            </p>
            
            <div style={{ marginBottom: '24px' }}>
              <p style={scoreStyle}>
                Final Score: {score.toLocaleString()}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '16px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#776e65' }}>{moveCount}</div>
                  <div style={{ fontSize: '12px', color: '#8f7a66' }}>Moves</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#776e65' }}>
                    {Math.floor(timeElapsed / 60000)}:{String(Math.floor((timeElapsed % 60000) / 1000)).padStart(2, '0')}
                  </div>
                  <div style={{ fontSize: '12px', color: '#8f7a66' }}>Time</div>
                </div>
              </div>
            </div>
            
            <div>
              <motion.button
                style={buttonStyle}
                onClick={onRestart}
                whileHover={{ backgroundColor: '#9f8a76' }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
              >
                Try Again
              </motion.button>
              
              {isWon && onContinue && (
                <motion.button
                  style={{ 
                    ...buttonStyle, 
                    backgroundColor: '#f67c5f',
                    marginLeft: '12px'
                  }}
                  onClick={onContinue}
                  whileHover={{ backgroundColor: '#f68563' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                >
                  Continue
                </motion.button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
