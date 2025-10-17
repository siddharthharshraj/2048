import { describe, it, expect } from 'vitest';
import { 
  createEmptyBoard, 
  getEmptyPositions, 
  addRandomTile, 
  initializeBoard,
  cloneBoard,
  boardsEqual 
} from '../utils/boardUtils';

describe('boardUtils', () => {
  describe('createEmptyBoard', () => {
    it('should create a 4x4 empty board', () => {
      const board = createEmptyBoard(4);
      expect(board).toHaveLength(4);
      expect(board[0]).toHaveLength(4);
      expect(board.every(row => row.every(cell => cell === 0))).toBe(true);
    });

    it('should create boards of different sizes', () => {
      const board3x3 = createEmptyBoard(3);
      const board5x5 = createEmptyBoard(5);
      
      expect(board3x3).toHaveLength(3);
      expect(board3x3[0]).toHaveLength(3);
      expect(board5x5).toHaveLength(5);
      expect(board5x5[0]).toHaveLength(5);
    });
  });

  describe('getEmptyPositions', () => {
    it('should return all positions for empty board', () => {
      const board = createEmptyBoard(2);
      const emptyPositions = getEmptyPositions(board);
      
      expect(emptyPositions).toHaveLength(4);
      expect(emptyPositions).toContainEqual({ row: 0, col: 0 });
      expect(emptyPositions).toContainEqual({ row: 0, col: 1 });
      expect(emptyPositions).toContainEqual({ row: 1, col: 0 });
      expect(emptyPositions).toContainEqual({ row: 1, col: 1 });
    });

    it('should return correct positions for partially filled board', () => {
      const board = [
        [2, 0],
        [0, 4]
      ];
      const emptyPositions = getEmptyPositions(board);
      
      expect(emptyPositions).toHaveLength(2);
      expect(emptyPositions).toContainEqual({ row: 0, col: 1 });
      expect(emptyPositions).toContainEqual({ row: 1, col: 0 });
    });

    it('should return empty array for full board', () => {
      const board = [
        [2, 4],
        [8, 16]
      ];
      const emptyPositions = getEmptyPositions(board);
      
      expect(emptyPositions).toHaveLength(0);
    });
  });

  describe('addRandomTile', () => {
    it('should add a tile to empty board', () => {
      const board = createEmptyBoard(2);
      const newBoard = addRandomTile(board);
      
      const filledCells = newBoard.flat().filter(cell => cell !== 0);
      expect(filledCells).toHaveLength(1);
      expect([2, 4]).toContain(filledCells[0]);
    });

    it('should not modify original board', () => {
      const board = createEmptyBoard(2);
      const originalBoard = cloneBoard(board);
      addRandomTile(board);
      
      expect(boardsEqual(board, originalBoard)).toBe(true);
    });

    it('should return same board if no empty positions', () => {
      const board = [
        [2, 4],
        [8, 16]
      ];
      const newBoard = addRandomTile(board);
      
      expect(boardsEqual(board, newBoard)).toBe(true);
    });
  });

  describe('initializeBoard', () => {
    it('should create board with exactly 2 tiles', () => {
      const board = initializeBoard(4);
      const filledCells = board.flat().filter(cell => cell !== 0);
      
      expect(filledCells).toHaveLength(2);
      filledCells.forEach(cell => {
        expect([2, 4]).toContain(cell);
      });
    });
  });

  describe('cloneBoard', () => {
    it('should create deep copy of board', () => {
      const board = [
        [2, 4],
        [8, 16]
      ];
      const cloned = cloneBoard(board);
      
      expect(boardsEqual(board, cloned)).toBe(true);
      
      // Modify original
      board[0][0] = 32;
      expect(cloned[0][0]).toBe(2); // Should not be affected
    });
  });

  describe('boardsEqual', () => {
    it('should return true for identical boards', () => {
      const board1 = [[2, 4], [8, 16]];
      const board2 = [[2, 4], [8, 16]];
      
      expect(boardsEqual(board1, board2)).toBe(true);
    });

    it('should return false for different boards', () => {
      const board1 = [[2, 4], [8, 16]];
      const board2 = [[2, 4], [8, 32]];
      
      expect(boardsEqual(board1, board2)).toBe(false);
    });

    it('should return false for different sizes', () => {
      const board1 = [[2, 4]];
      const board2 = [[2, 4], [8, 16]];
      
      expect(boardsEqual(board1, board2)).toBe(false);
    });
  });
});
