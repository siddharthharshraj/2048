export const GAME_CONFIG = {
  BOARD_SIZES: {
    MIN: 3,
    MAX: 8,
    DEFAULT: 4,
  },
  
  SCORING: {
    BASE_SCORE_MULTIPLIER: 1,
    MERGE_BONUS: 0,
  },
  
  ANIMATIONS: {
    TILE_MOVE_DURATION: 150,
    TILE_APPEAR_DURATION: 200,
    SCORE_UPDATE_DURATION: 100,
  },
  
  STORAGE_KEYS: {
    BEST_SCORE: 'game2048-best-score',
    GAME_STATE: 'game2048-current-game',
    STATISTICS: 'game2048-statistics',
    SETTINGS: 'game2048-settings',
  },
  
  GAME_MODES: {
    CLASSIC: {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional 2048 gameplay',
      winCondition: 2048,
      timeLimit: null,
      allowGameOver: true,
    },
    TIME_ATTACK: {
      id: 'timeAttack',
      name: 'Time Attack',
      description: '2 minutes to get highest score',
      winCondition: null,
      timeLimit: 120000,
      allowGameOver: true,
    },
    ZEN: {
      id: 'zen',
      name: 'Zen Mode',
      description: 'Relaxed play, no game over',
      winCondition: 2048,
      timeLimit: null,
      allowGameOver: false,
    },
    CHALLENGE: {
      id: 'challenge',
      name: 'Challenge',
      description: 'Reach 4096 to win',
      winCondition: 4096,
      timeLimit: null,
      allowGameOver: true,
    },
  },
  
  UI: {
    SIDEBAR_WIDTH: 320,
    HELP_PANEL_WIDTHS: {
      SMALL: 300,
      MEDIUM: 350,
      LARGE: 400,
    },
    BREAKPOINTS: {
      MOBILE: 768,
      TABLET: 1024,
      DESKTOP: 1200,
    },
  },
  
  SOUND: {
    FREQUENCIES: {
      MOVE: 220,
      MERGE_BASE: 440,
      WIN: [261.63, 329.63, 392.00, 523.25],
      GAME_OVER: [220, 196, 174.61, 146.83],
    },
    DURATIONS: {
      MOVE: 0.1,
      MERGE: 0.15,
      WIN: 0.3,
      GAME_OVER: 0.4,
    },
    VOLUMES: {
      MOVE: 0.05,
      MERGE: 0.08,
      WIN: 0.1,
      GAME_OVER: 0.08,
    },
  },
} as const;

export type GameModeConfig = typeof GAME_CONFIG.GAME_MODES[keyof typeof GAME_CONFIG.GAME_MODES];
export const validateBoardSize = (size: number): boolean => {
  return size >= GAME_CONFIG.BOARD_SIZES.MIN && size <= GAME_CONFIG.BOARD_SIZES.MAX;
};

export const getGameModeConfig = (mode: string): GameModeConfig | null => {
  const modeKey = mode.toUpperCase() as keyof typeof GAME_CONFIG.GAME_MODES;
  return GAME_CONFIG.GAME_MODES[modeKey] || null;
};
