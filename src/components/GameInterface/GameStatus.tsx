import { useGame } from '../../contexts/GameContext';

export function GameStatus() {
  const { state } = useGame();

  return (
    <div className="game-status">
      <h2>Game Status</h2>
      <div className="status-info">
        <p>Character: {state.characterName}</p>
        <p>Adventure Type: {state.adventureType}</p>
        <p>Current Danger Level: {state.dangerLevel}</p>
        <p>Progress: {state.storyProgression}</p>
      </div>
    </div>
  );
}