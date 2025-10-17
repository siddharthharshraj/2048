import { describe, it, expect } from 'vitest';
import { moveBoard } from '../utils/moveUtils';

describe('moveUtils', () => {
  describe('moveBoard', () => {
    describe('left movement', () => {
      it('should move tiles left', () => {
        const board = [
          [0, 2, 0, 4],
          [0, 0, 8, 0],
          [2, 0, 0, 2],
          [0, 0, 0, 0]
        ];
        
        const result = moveBoard(board, 'left');
        
        expect(result.newBoard).toEqual([
          [2, 4, 0, 0],
          [8, 0, 0, 0],
          [4, 0, 0, 0], // 2 + 2 = 4
          [0, 0, 0, 0]
        ]);
        expect(result.scoreGained).toBe(4);
        expect(result.moved).toBe(true);
      });

      it('should merge adjacent tiles', () => {
        const board = [
          [2, 2, 4, 4],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ];
        
        const result = moveBoard(board, 'left');
        
        expect(result.newBoard).toEqual([
          [4, 8, 0, 0], // 2+2=4, 4+4=8
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ]);
        expect(result.scoreGained).toBe(12); // 4 + 8
        expect(result.moved).toBe(true);
      });

      it('should not merge already merged tiles in same move', () => {
        const board = [
          [2, 2, 2, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ];
        
        const result = moveBoard(board, 'left');
        
        expect(result.newBoard).toEqual([
          [4, 2, 0, 0], // First two 2s merge, third 2 stays separate
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ]);
        expect(result.scoreGained).toBe(4);
      });

      it('should return moved=false when no movement possible', () => {
        const board = [
          [2, 4, 8, 16],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ];
        
        const result = moveBoard(board, 'left');
        
        expect(result.moved).toBe(false);
        expect(result.scoreGained).toBe(0);
      });
    });

    describe('right movement', () => {
      it('should move tiles right', () => {
        const board = [
          [2, 0, 4, 0],
          [0, 8, 0, 0],
          [2, 0, 0, 2],
          [0, 0, 0, 0]
        ];
        
        const result = moveBoard(board, 'right');
        
        expect(result.newBoard).toEqual([
          [0, 0, 2, 4],
          [0, 0, 0, 8],
          [0, 0, 0, 4], // 2 + 2 = 4
          [0, 0, 0, 0]
        ]);
        expect(result.scoreGained).toBe(4);
        expect(result.moved).toBe(true);
      });
    });

    describe('up movement', () => {
      it('should move tiles up', () => {
        const board = [
          [0, 0, 2, 0],
          [2, 8, 0, 0],
          [0, 0, 4, 2],
          [4, 0, 0, 2]
        ];
        
        const result = moveBoard(board, 'up');
        
        expect(result.newBoard).toEqual([
          [2, 8, 2, 4], // 2+2=4 for last column
          [4, 0, 4, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ]);
        expect(result.scoreGained).toBe(4);
        expect(result.moved).toBe(true);
      });
    });

    describe('down movement', () => {
      it('should move tiles down', () => {
        const board = [
          [2, 0, 2, 2],
          [0, 8, 0, 0],
          [0, 0, 4, 0],
          [4, 0, 0, 2]
        ];
        
        const result = moveBoard(board, 'down');
        
        expect(result.newBoard).toEqual([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [2, 0, 2, 0],
          [4, 8, 4, 4] // 2+2=4 for last column
        ]);
        expect(result.scoreGained).toBe(4);
        expect(result.moved).toBe(true);
      });
    });

    describe('edge cases', () => {
      it('should handle empty board', () => {
        const board = [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ];
        
        const result = moveBoard(board, 'left');
        
        expect(result.moved).toBe(false);
        expect(result.scoreGained).toBe(0);
      });

      it('should handle single tile', () => {
        const board = [
          [2, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ];
        
        const result = moveBoard(board, 'right');
        
        expect(result.newBoard).toEqual([
          [0, 0, 0, 2],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ]);
        expect(result.moved).toBe(true);
      });
    });
  });
});
