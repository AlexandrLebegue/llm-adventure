import { GameProvider } from './contexts/GameContext';
import { GameConfigWizard } from './components/GameConfig/GameConfigWizard';
import { GameInterface } from './components/GameInterface/GameInterface';
import { useGame } from './contexts/GameContext';
import { useEffect } from 'react';

function AppContent() {
  const { state } = useGame();

  // Apply theme based on selected universe
  useEffect(() => {
    const root = document.documentElement;
    if (state.universe) {
      root.setAttribute('data-theme', state.universe);
    } else {
      root.removeAttribute('data-theme');
    }
  }, [state.universe]);

  return (
    <div className="app">
      {!state.gameStarted ? (
        <GameConfigWizard />
      ) : (
        <GameInterface />
      )}
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;
