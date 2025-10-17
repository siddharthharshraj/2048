import { useCallback, useRef } from 'react';

/**
 * Custom hook for managing game sound effects
 * Uses Web Audio API for efficient sound playback
 */
export const useSoundEffects = (enabled: boolean = true) => {
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize audio context lazily
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current && enabled) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (error) {
        console.warn('Web Audio API not supported');
      }
    }
    return audioContextRef.current;
  }, [enabled]);

  // Generate tone using Web Audio API
  const playTone = useCallback((frequency: number, duration: number, volume: number = 0.1) => {
    if (!enabled) return;
    
    const audioContext = getAudioContext();
    if (!audioContext) return;

    try {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      console.warn('Sound playback failed:', error);
    }
  }, [enabled, getAudioContext]);

  // Sound effect functions
  const playMoveSound = useCallback(() => {
    playTone(220, 0.1, 0.05); // Low A note, short duration
  }, [playTone]);

  const playMergeSound = useCallback((tileValue: number) => {
    // Higher frequency for higher value tiles
    const frequency = Math.min(440 + (Math.log2(tileValue) * 50), 880);
    playTone(frequency, 0.15, 0.08);
  }, [playTone]);

  const playWinSound = useCallback(() => {
    // Victory fanfare - ascending notes
    const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
    notes.forEach((freq, index) => {
      setTimeout(() => playTone(freq, 0.3, 0.1), index * 100);
    });
  }, [playTone]);

  const playGameOverSound = useCallback(() => {
    // Descending sad trombone effect
    const notes = [220, 196, 174.61, 146.83]; // A3, G3, F3, D3
    notes.forEach((freq, index) => {
      setTimeout(() => playTone(freq, 0.4, 0.08), index * 150);
    });
  }, [playTone]);

  const playNewGameSound = useCallback(() => {
    // Quick ascending chirp
    playTone(330, 0.1, 0.06);
    setTimeout(() => playTone(440, 0.1, 0.06), 50);
  }, [playTone]);

  const playUndoSound = useCallback(() => {
    // Quick descending tone
    playTone(440, 0.08, 0.04);
    setTimeout(() => playTone(330, 0.08, 0.04), 40);
  }, [playTone]);

  const playRedoSound = useCallback(() => {
    // Quick ascending tone
    playTone(330, 0.08, 0.04);
    setTimeout(() => playTone(440, 0.08, 0.04), 40);
  }, [playTone]);

  const playButtonClickSound = useCallback(() => {
    playTone(523.25, 0.05, 0.03); // Quick high C
  }, [playTone]);

  return {
    playMoveSound,
    playMergeSound,
    playWinSound,
    playGameOverSound,
    playNewGameSound,
    playUndoSound,
    playRedoSound,
    playButtonClickSound,
  };
};
