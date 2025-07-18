import { useGame } from '../../contexts/GameContext';
import type { StoryEntry } from '../../types/game.types';
import { LoadingSpinner } from '../common/LoadingSpinner';

export function StoryHistory() {
  const { state } = useGame();

  const formatTimestamp = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderStoryEntry = (entry: StoryEntry, index: number) => {
    return (
      <div key={entry.id} className="story-entry">
        <div className="story-header">
          <span className="story-number">#{entry.storyProgression + 1}</span>
          <span className="story-timestamp">{formatTimestamp(entry.timestamp)}</span>
        </div>
        
        {entry.choice && (
          <div className="choice-made">
            <span className="choice-label">Choice:</span>
            <span className="choice-text">{entry.choice.text}</span>
          </div>
        )}
        
        <div className="scenario-text">
          {entry.scenario}
        </div>
        
        {index < state.storyHistory.length - 1 && (
          <div className="story-divider"></div>
        )}
      </div>
    );
  };

  if (state.storyHistory.length === 0) {
    return (
      <div className="story-history empty">
        <div className="empty-message">
          <p>Your adventure story will appear here as you play...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="story-history">
      <div className="story-history-header">
        <h3>Adventure History</h3>
        <span className="story-count">{state.storyHistory.length} entries</span>
      </div>
      
      <div className="story-entries">
        {state.storyHistory.map((entry, index) => renderStoryEntry(entry, index))}
        
        {state.isLoading && (
          <div className="story-entry loading-entry">
            <LoadingSpinner
              message="Adding to your adventure history..."
              size="small"
            />
          </div>
        )}
      </div>
    </div>
  );
}