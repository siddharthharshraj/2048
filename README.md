# 2048 - Exponent Energy

2048 game developed by siddharth for exponent energy assignment

## Installation

### Prerequisites
- Node.js v18.0+ 
- npm v9.0+

### Setup
```bash
# Clone the repository
git clone https://github.com/siddharthharshraj/2048.git
cd 2048

# Install dependencies
npm install

# Start development server
npm run dev
```

The game will be available at `http://localhost:5173`

## Running the Game

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run test suite
```

### Production
```bash
npm run build        # Creates optimized build in /dist
npm run preview      # Test production build locally
```

## Gameplay Instructions

### Objective
Combine numbered tiles to reach the **2048** tile and achieve the highest score possible.

### Controls

#### Desktop
- **Arrow Keys** or **WASD**: Move tiles in any direction
- **Ctrl+Z**: Undo last move
- **Ctrl+Y**: Redo move
- **R**: Restart game
- **H**: Toggle help panel

#### Mobile
- **Swipe**: Move tiles in any direction (up, down, left, right)
- **Tap**: Interact with buttons and menus

### Game Rules
1. **Movement**: All tiles slide in the chosen direction
2. **Merging**: When two tiles with the same number touch, they merge into one
3. **New Tiles**: A new tile (2 or 4) appears after each move
4. **Win Condition**: Reach the 2048 tile
5. **Lose Condition**: No more moves possible (board full with no merges)

### Game Modes
- **Classic**: Traditional 2048 gameplay
- **Time Attack**: Race against the clock
- **Zen Mode**: Relaxed gameplay without pressure  
- **Challenge**: Advanced difficulty with obstacles

### Features
- **Undo/Redo**: Unlimited move history
- **Statistics**: Track games played, won, best score, and win rate
- **Themes**: Multiple visual themes (Default, Dark, Neon, Minimal)
- **Sound Effects**: Audio feedback for moves and achievements
- **Auto-Save**: Game state automatically preserved

## Implementation Details

### Architecture
The game follows clean architecture principles with clear separation of concerns:

```
src/
├── components/          # React components
│   ├── game/           # Game-specific components
│   ├── layout/         # Layout components  
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
├── utils/              # Pure utility functions
├── context/            # React Context providers
├── types/              # TypeScript definitions
└── styles/             # Global styles
```

### Key Technologies
- **React 19**: Modern UI framework with hooks and context
- **TypeScript**: Type-safe development with strict mode
- **Vite**: Fast build tool and development server
- **Framer Motion**: Smooth animations and transitions
- **Vitest**: Modern testing framework

### Core Components
- **Game.tsx**: Main game orchestrator
- **Board.tsx**: Game board with tile rendering
- **useGameLogic.ts**: Core game logic and state management
- **useGameHistory.ts**: Undo/redo functionality
- **useGameStatistics.ts**: Statistics tracking and analytics

### Game Logic
The game implements several key algorithms:
- **Move Processing**: Handles tile sliding and merging
- **Board State**: Manages 4x4 grid with efficient updates
- **Score Calculation**: Tracks points from tile merges
- **Win/Lose Detection**: Checks game end conditions
- **Random Tile Generation**: Adds new tiles (90% chance of 2, 10% chance of 4)

### Performance Optimizations
- **React.memo**: Prevents unnecessary component re-renders
- **useCallback**: Stable function references
- **useMemo**: Expensive computation caching
- **Efficient State Updates**: Minimizes re-renders with proper state structure

### Testing
Comprehensive test suite covering:
- Game logic and rules validation
- Board manipulation utilities  
- Move processing algorithms
- Win/lose condition detection
- Edge cases and error handling

Run tests with: `npm test`

## Browser Support
- Chrome 90+
- Firefox 88+  
- Safari 14+
- Edge 90+


## Author
**Siddharth Harsh Raj**  
Built for Exponent Energy
