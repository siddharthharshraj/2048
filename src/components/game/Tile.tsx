import React from 'react';
import { motion } from 'framer-motion';

interface TileProps {
  value: number;
  row: number;
  col: number;
  boardSize: number;
  isNew?: boolean;
  isMerged?: boolean;
}

const getTileColor = (value: number): { bg: string; text: string } => {
  const colors: Record<number, { bg: string; text: string }> = {
    2: { bg: '#eee4da', text: '#776e65' },
    4: { bg: '#ede0c8', text: '#776e65' },
    8: { bg: '#f2b179', text: '#f9f6f2' },
    16: { bg: '#f59563', text: '#f9f6f2' },
    32: { bg: '#f67c5f', text: '#f9f6f2' },
    64: { bg: '#f65e3b', text: '#f9f6f2' },
    128: { bg: '#edcf72', text: '#f9f6f2' },
    256: { bg: '#edcc61', text: '#f9f6f2' },
    512: { bg: '#edc850', text: '#f9f6f2' },
    1024: { bg: '#edc53f', text: '#f9f6f2' },
    2048: { bg: '#edc22e', text: '#f9f6f2' },
  };

  return colors[value] || { bg: '#3c3a32', text: '#f9f6f2' };
};

const getFontSize = (value: number, boardSize: number): string => {
  const baseSize = boardSize <= 4 ? 32 : 24;
  
  if (value >= 1000) return `${baseSize * 0.7}px`;
  if (value >= 100) return `${baseSize * 0.8}px`;
  return `${baseSize}px`;
};

export const Tile: React.FC<TileProps> = React.memo(({ 
  value, 
  row, 
  col, 
  boardSize,
  isNew = false,
  isMerged = false 
}) => {
  if (value === 0) return null;

  const { bg, text } = getTileColor(value);
  const fontSize = getFontSize(value, boardSize);
  
  const tileSize = `calc((100% - ${(boardSize + 1) * 8}px) / ${boardSize})`;
  const position = {
    left: `calc(${col} * (${tileSize} + 8px) + 8px)`,
    top: `calc(${row} * (${tileSize} + 8px) + 8px)`,
  };

  return (
    <motion.div
      className="tile"
      style={{
        position: 'absolute',
        width: tileSize,
        height: tileSize,
        backgroundColor: bg,
        color: text,
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize,
        fontWeight: 'bold',
        userSelect: 'none',
        ...position,
      }}
      initial={isNew ? { scale: 0 } : false}
      animate={{ 
        scale: isMerged ? [1, 1.1, 1] : 1,
        x: 0,
        y: 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: isNew ? 0.2 : 0.15,
      }}
      layout
    >
      {value}
    </motion.div>
  );
});
