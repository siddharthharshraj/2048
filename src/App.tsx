import { GameProvider } from './context/GameContext';
import { Game } from './components/Game';
import './styles/index.css';

function App() {
  return (
    <GameProvider>
      <div className="app">
        <Game />
      </div>
    </GameProvider>
  );
}

export default App;
