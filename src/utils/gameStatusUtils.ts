import type { Board, Direction } from '../types';
import { getEmptyPositions } from './boardUtils';
import { moveBoard } from './moveUtils';

/**
 * Checks if the board contains the winning tile (2048 or higher)
 */
export const checkWin = (board: Board): boolean => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] >= 2048) {
        return true;
      }
    }
  }
  return false;
};

/**
 * Checks if any moves are possible on the board
 */
export const canMove = (board: Board): boolean => {
  // If there are empty positions, moves are possible
  if (getEmptyPositions(board).length > 0) {
    return true;
  }
  
  // Check if any adjacent tiles can be merged
  const size = board.length;
  
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const currentValue = board[row][col];
      
      // Check right neighbor
      if (col < size - 1 && board[row][col + 1] === currentValue) {
        return true;
      }
      
      // Check bottom neighbor
      if (row < size - 1 && board[row + 1][col] === currentValue) {
        return true;
      }
    }
  }
  
  return false;
};

/**
 * Checks if the game is over (no possible moves)
 */
export const checkGameOver = (board: Board): boolean => {
  return !canMove(board);
};

/**
 * Checks if a move in the given direction is possible
 */
export const canMoveInDirection = (board: Board, direction: Direction): boolean => {
  const result = moveBoard(board, direction);
  return result.moved;
};

/**
 * Gets the highest tile value on the board
 */
export const getHighestTile = (board: Board): number => {
  let highest = 0;
  
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] > highest) {
        highest = board[row][col];
      }
    }
  }
  
  return highest;
};
