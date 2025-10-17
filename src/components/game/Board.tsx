import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { Board as BoardType } from '../../types';
import { Tile } from './Tile';

interface BoardProps {
  board: BoardType;
  boardSize: number;
}

export const Board: React.FC<BoardProps> = React.memo(({ board, boardSize }) => {
  const gridCells = useMemo(() => {
    const cells = [];
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        cells.push(
          <div
            key={`cell-${row}-${col}`}
            className="grid-cell"
            style={{
              backgroundColor: '#cdc1b4',
              borderRadius: '4px',
            }}
          />
        );
      }
    }
    return cells;
  }, [boardSize]);

  const tiles = useMemo(() => {
    const tileElements = [];
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        const value = board[row][col];
        if (value !== 0) {
          tileElements.push(
            <Tile
              key={`tile-${row}-${col}-${value}`}
              value={value}
              row={row}
              col={col}
              boardSize={boardSize}
            />
          );
        }
      }
    }
    return tileElements;
  }, [board, boardSize]);

  const boardStyle = {
    position: 'relative' as const,
    width: '100%',
    maxWidth: '400px',
    aspectRatio: '1',
    backgroundColor: '#bbada0',
    borderRadius: '8px',
    padding: '8px',
    display: 'grid',
    gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
    gridTemplateRows: `repeat(${boardSize}, 1fr)`,
    gap: '8px',
  };

  return (
    <motion.div
      className="game-board"
      style={boardStyle}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {gridCells}
      {tiles}
    </motion.div>
  );
});
