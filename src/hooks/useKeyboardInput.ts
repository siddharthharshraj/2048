import { useEffect, useCallback } from 'react';
import type { Direction } from '../types';

interface UseKeyboardInputProps {
  onMove: (direction: Direction) => void;
  enabled: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
}

export const useKeyboardInput = ({ onMove, enabled = true, onUndo, onRedo }: UseKeyboardInputProps): void => {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;

    // Handle undo/redo shortcuts
    if ((event.ctrlKey || event.metaKey) && event.key === 'z' && !event.shiftKey) {
      event.preventDefault();
      onUndo?.();
      return;
    }
    
    if ((event.ctrlKey || event.metaKey) && (event.key === 'y' || (event.key === 'z' && event.shiftKey))) {
      event.preventDefault();
      onRedo?.();
      return;
    }

    // Prevent default behavior for arrow keys to avoid page scrolling
    const keyToDirection: Record<string, Direction> = {
      'ArrowUp': 'up',
      'ArrowDown': 'down',
      'ArrowLeft': 'left',
      'ArrowRight': 'right',
      'w': 'up',
      'W': 'up',
      's': 'down',
      'S': 'down',
      'a': 'left',
      'A': 'left',
      'd': 'right',
      'D': 'right',
    };

    const direction = keyToDirection[event.key];
    
    if (direction) {
      event.preventDefault();
      onMove(direction);
    }
  }, [onMove, enabled, onUndo, onRedo]);

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener('keydown', handleKeyPress);
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress, enabled]);
};
