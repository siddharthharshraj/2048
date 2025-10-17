import type { Board, Position } from '../types';

export const createEmptyBoard = (size: number): Board => {
  return Array(size).fill(null).map(() => Array(size).fill(0));
};

export const getEmptyPositions = (board: Board): Position[] => {
  const emptyPositions: Position[] = [];
  
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === 0) {
        emptyPositions.push({ row, col });
      }
    }
  }
  
  return emptyPositions;
};

export const addRandomTile = (board: Board): Board => {
  const emptyPositions = getEmptyPositions(board);
  
  if (emptyPositions.length === 0) {
    return board;
  }
  
  const newBoard = board.map(row => [...row]);
  const randomIndex = Math.floor(Math.random() * emptyPositions.length);
  const position = emptyPositions[randomIndex];
  
  if (position && newBoard[position.row] && newBoard[position.row]?.[position.col] !== undefined) {
    newBoard[position.row]![position.col] = Math.random() < 0.9 ? 2 : 4;
  }
  
  return newBoard;
};

export const initializeBoard = (size: number): Board => {
  let board = createEmptyBoard(size);
  board = addRandomTile(board);
  board = addRandomTile(board);
  return board;
};

export const cloneBoard = (board: Board): Board => {
  return board.map(row => [...row]);
};

export const boardsEqual = (board1: Board, board2: Board): boolean => {
  if (board1.length !== board2.length) return false;
  
  for (let row = 0; row < board1.length; row++) {
    if (board1[row].length !== board2[row].length) return false;
    
    for (let col = 0; col < board1[row].length; col++) {
      if (board1[row][col] !== board2[row][col]) return false;
    }
  }
  
  return true;
};
