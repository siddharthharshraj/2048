import React from 'react';
import { motion } from 'framer-motion';
import type { Direction } from '../../types';

interface ControlsProps {
  onMove: (direction: Direction) => void;
  disabled?: boolean;
}

export const Controls: React.FC<ControlsProps> = React.memo(({ onMove, disabled = false }) => {
  const buttonStyle = {
    backgroundColor: disabled ? '#cdc1b4' : '#8f7a66',
    color: disabled ? '#9e9691' : '#f9f6f2',
    border: 'none',
    borderRadius: '4px',
    padding: '12px 16px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: disabled ? 'not-allowed' : 'pointer',
    minWidth: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const ControlButton: React.FC<{ 
    direction: Direction; 
    children: React.ReactNode;
    style?: React.CSSProperties;
  }> = ({ direction, children, style = {} }) => (
    <motion.button
      onClick={() => !disabled && onMove(direction)}
      style={{ ...buttonStyle, ...style }}
      whileHover={disabled ? {} : { backgroundColor: '#9f8a76' }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      transition={{ duration: 0.1 }}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );

  return (
    <div className="game-controls" style={{ marginTop: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <p style={{ 
          color: '#776e65', 
          fontSize: '14px', 
          margin: 0,
          fontWeight: '500'
        }}>
          Use arrow keys or buttons to move tiles
        </p>
      </div>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '8px',
        maxWidth: '200px',
        margin: '0 auto'
      }}>
        {/* Empty cell */}
        <div></div>
        
        {/* Up button */}
        <ControlButton direction="up">
          ↑
        </ControlButton>
        
        {/* Empty cell */}
        <div></div>
        
        {/* Left button */}
        <ControlButton direction="left">
          ←
        </ControlButton>
        
        {/* Empty cell for spacing */}
        <div></div>
        
        {/* Right button */}
        <ControlButton direction="right">
          →
        </ControlButton>
        
        {/* Empty cell */}
        <div></div>
        
        {/* Down button */}
        <ControlButton direction="down">
          ↓
        </ControlButton>
        
        {/* Empty cell */}
        <div></div>
      </div>
      
      <div style={{ 
        textAlign: 'center', 
        marginTop: '16px',
        fontSize: '12px',
        color: '#9e9691'
      }}>
        <p style={{ margin: 0 }}>
          You can also use WASD keys
        </p>
      </div>
    </div>
  );
});
