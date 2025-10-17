import type { Board, Direction, MoveResult } from '../types';
import { cloneBoard, boardsEqual } from './boardUtils';

const moveRowLeft = (row: number[]): { newRow: number[]; scoreGained: number } => {
  const filteredRow = row.filter(cell => cell !== 0);
  let scoreGained = 0;
  const newRow: number[] = [];
  
  let i = 0;
  while (i < filteredRow.length) {
    if (i < filteredRow.length - 1 && filteredRow[i] === filteredRow[i + 1]) {
      const mergedValue = filteredRow[i] * 2;
      newRow.push(mergedValue);
      scoreGained += mergedValue;
      i += 2;
    } else {
      newRow.push(filteredRow[i]);
      i += 1;
    }
  }
  
  while (newRow.length < row.length) {
    newRow.push(0);
  }
  
  return { newRow, scoreGained };
};
const moveRowRight = (row: number[]): { newRow: number[]; scoreGained: number } => {
  const reversedRow = [...row].reverse();
  const { newRow: movedRow, scoreGained } = moveRowLeft(reversedRow);
  return { newRow: movedRow.reverse(), scoreGained };
};

const rotateBoard = (board: Board): Board => {
  const size = board.length;
  const rotated: Board = Array(size).fill(null).map(() => Array(size).fill(0));
  
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      rotated[col][size - 1 - row] = board[row][col];
    }
  }
  
  return rotated;
};

const rotateCounterClockwise = (board: Board): Board => {
  const size = board.length;
  const rotated: Board = Array(size).fill(null).map(() => Array(size).fill(0));
  
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      rotated[size - 1 - col][row] = board[row][col];
    }
  }
  
  return rotated;
};

export const moveBoard = (board: Board, direction: Direction): MoveResult => {
  let workingBoard = cloneBoard(board);
  let totalScoreGained = 0;
  
  switch (direction) {
    case 'left':
      for (let row = 0; row < workingBoard.length; row++) {
        const { newRow, scoreGained } = moveRowLeft(workingBoard[row]);
        workingBoard[row] = newRow;
        totalScoreGained += scoreGained;
      }
      break;
      
    case 'right':
      for (let row = 0; row < workingBoard.length; row++) {
        const { newRow, scoreGained } = moveRowRight(workingBoard[row]);
        workingBoard[row] = newRow;
        totalScoreGained += scoreGained;
      }
      break;
      
    case 'up':
      workingBoard = rotateCounterClockwise(workingBoard);
      for (let row = 0; row < workingBoard.length; row++) {
        const { newRow, scoreGained } = moveRowLeft(workingBoard[row]);
        workingBoard[row] = newRow;
        totalScoreGained += scoreGained;
      }
      workingBoard = rotateBoard(workingBoard);
      break;
      
    case 'down':
      workingBoard = rotateBoard(workingBoard);
      for (let row = 0; row < workingBoard.length; row++) {
        const { newRow, scoreGained } = moveRowLeft(workingBoard[row]);
        workingBoard[row] = newRow;
        totalScoreGained += scoreGained;
      }
      workingBoard = rotateCounterClockwise(workingBoard);
      break;
  }
  
  const moved = !boardsEqual(board, workingBoard);
  
  return {
    newBoard: workingBoard,
    scoreGained: totalScoreGained,
    moved
  };
};
