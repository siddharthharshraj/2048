export type Board = number[][];

export type Direction = 'up' | 'down' | 'left' | 'right';

export type GameStatus = 'playing' | 'won' | 'over';

export type GameMode = 'classic' | 'timeAttack' | 'zen' | 'challenge';

export type Theme = 'default' | 'dark' | 'neon' | 'minimal';

export interface GameState {
  board: Board;
  score: number;
  bestScore: number;
  gameStatus: GameStatus;
  boardSize: number;
  moveCount: number;
  timeElapsed: number;
  mode: GameMode;
}

export interface GameHistory {
  states: GameState[];
  currentIndex: number;
  maxSize: number;
}

export interface MoveResult {
  newBoard: Board;
  scoreGained: number;
  moved: boolean;
}

export interface GameSettings {
  boardSize: number;
  theme: Theme;
  soundEnabled: boolean;
  autoSave: boolean;
}

export interface Position {
  row: number;
  col: number;
}

export interface TileData {
  value: number;
  position: Position;
  id: string;
  isNew?: boolean;
  isMerged?: boolean;
}

export interface GameStatistics {
  gamesPlayed: number;
  gamesWon: number;
  totalScore: number;
  bestScore: number;
  averageScore: number;
  totalMoves: number;
  totalTime: number;
  winRate: number;
}

export interface LeaderboardEntry {
  score: number;
  mode: GameMode;
  date: string;
  moves: number;
  time: number;
}
