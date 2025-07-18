
import { useGame } from '../../contexts/GameContext';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { DeathScreen } from './DeathScreen';

export function ChatWindow() {
  const { state } = useGame();

  return (
    <div className="chat-window">
      <div className="chat-messages">
        {state.isDead ? (
          <DeathScreen />
        ) : state.isLoading && !state.currentScenario ? (
          <LoadingSpinner
            message="Starting your adventure..."
            size="large"
          />
        ) : state.currentScenario ? (
          <div className="message scenario">
            <p>{state.currentScenario}</p>
          </div>
        ) : (
          <div className="message placeholder">
            <p>Your adventure will begin here...</p>
          </div>
        )}
        
        {!state.isDead && state.isLoading && state.currentScenario && (
          <div className="message loading-message">
            <LoadingSpinner
              message="Generating next part of your story..."
              size="small"
            />
          </div>
        )}
      </div>
    </div>
  );
}