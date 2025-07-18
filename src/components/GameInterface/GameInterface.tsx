import { GameStatus } from './GameStatus';
import { ChatWindow } from './ChatWindow';
import { ChoiceSelector } from './ChoiceSelector';
import { StoryHistory } from './StoryHistory';
import { useGame } from '../../contexts/GameContext';

export function GameInterface() {
  const { state } = useGame();

  if (!state.gameStarted) {
    return null;
  }

  return (
    <div className="game-interface">
      <div className="game-main">
        <GameStatus />
        <ChatWindow />
        <ChoiceSelector />
      </div>
      <div className="game-sidebar">
        <StoryHistory />
      </div>
    </div>
  );
}