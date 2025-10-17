import { describe, it, expect } from 'vitest';
import { 
  checkWin, 
  canMove, 
  checkGameOver, 
  canMoveInDirection,
  getHighestTile 
} from '../utils/gameStatusUtils';

describe('gameStatusUtils', () => {
  describe('checkWin', () => {
    it('should return true when 2048 tile exists', () => {
      const board = [
        [2, 4, 8, 16],
        [32, 64, 128, 256],
        [512, 1024, 2048, 0],
        [0, 0, 0, 0]
      ];
      
      expect(checkWin(board)).toBe(true);
    });

    it('should return false when no 2048 tile exists', () => {
      const board = [
        [2, 4, 8, 16],
        [32, 64, 128, 256],
        [512, 1024, 0, 0],
        [0, 0, 0, 0]
      ];
      
      expect(checkWin(board)).toBe(false);
    });

    it('should return true for tiles higher than 2048', () => {
      const board = [
        [4096, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      
      expect(checkWin(board)).toBe(true);
    });
  });

  describe('canMove', () => {
    it('should return true when empty positions exist', () => {
      const board = [
        [2, 4, 8, 16],
        [32, 64, 128, 0],
        [512, 1024, 0, 0],
        [0, 0, 0, 0]
      ];
      
      expect(canMove(board)).toBe(true);
    });

    it('should return true when adjacent tiles can merge horizontally', () => {
      const board = [
        [2, 2, 8, 16],
        [32, 64, 128, 256],
        [512, 1024, 4, 8],
        [16, 32, 64, 128]
      ];
      
      expect(canMove(board)).toBe(true);
    });

    it('should return true when adjacent tiles can merge vertically', () => {
      const board = [
        [2, 4, 8, 16],
        [2, 64, 128, 256],
        [512, 1024, 4, 8],
        [16, 32, 64, 128]
      ];
      
      expect(canMove(board)).toBe(true);
    });

    it('should return false when no moves possible', () => {
      const board = [
        [2, 4, 8, 16],
        [32, 64, 128, 256],
        [512, 1024, 4, 8],
        [16, 32, 64, 128]
      ];
      
      expect(canMove(board)).toBe(false);
    });

    it('should return true for empty board', () => {
      const board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      
      expect(canMove(board)).toBe(true);
    });
  });

  describe('checkGameOver', () => {
    it('should return true when no moves possible', () => {
      const board = [
        [2, 4, 8, 16],
        [32, 64, 128, 256],
        [512, 1024, 4, 8],
        [16, 32, 64, 128]
      ];
      
      expect(checkGameOver(board)).toBe(true);
    });

    it('should return false when moves are possible', () => {
      const board = [
        [2, 4, 8, 16],
        [32, 64, 128, 0],
        [512, 1024, 4, 8],
        [16, 32, 64, 128]
      ];
      
      expect(checkGameOver(board)).toBe(false);
    });
  });

  describe('canMoveInDirection', () => {
    it('should return true when movement in direction is possible', () => {
      const board = [
        [0, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      
      expect(canMoveInDirection(board, 'left')).toBe(true);
      expect(canMoveInDirection(board, 'right')).toBe(true);
      expect(canMoveInDirection(board, 'up')).toBe(false);
      expect(canMoveInDirection(board, 'down')).toBe(true);
    });

    it('should return false when no movement possible in direction', () => {
      const board = [
        [2, 4, 8, 16],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      
      expect(canMoveInDirection(board, 'left')).toBe(false);
    });
  });

  describe('getHighestTile', () => {
    it('should return highest tile value', () => {
      const board = [
        [2, 4, 8, 16],
        [32, 64, 128, 256],
        [512, 1024, 2048, 0],
        [0, 0, 0, 0]
      ];
      
      expect(getHighestTile(board)).toBe(2048);
    });

    it('should return 0 for empty board', () => {
      const board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      
      expect(getHighestTile(board)).toBe(0);
    });

    it('should handle single tile', () => {
      const board = [
        [64, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      
      expect(getHighestTile(board)).toBe(64);
    });
  });
});
