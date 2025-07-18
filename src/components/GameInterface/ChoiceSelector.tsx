import { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import type { Choice } from '../../types/game.types';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { useTranslation } from '../../services/TranslationService';

export function ChoiceSelector() {
  const { state, makeChoice } = useGame();
  const [processingChoice, setProcessingChoice] = useState<string | null>(null);
  const t = useTranslation(state.language);

  const handleChoice = async (choice: Choice) => {
    setProcessingChoice(choice.id);
    try {
      await makeChoice(choice);
    } finally {
      setProcessingChoice(null);
    }
  };

  if (state.isDead || !state.gameStarted) return null;

  return (
    <div className="choice-selector">
      <h3>{t('game.whatToDo')}</h3>
      {state.isLoading ? (
        <LoadingSpinner
          message={t('game.loading.scenario')}
          size="medium"
        />
      ) : (
        <div className="choices">
          {state.currentChoices.map((choice: Choice) => (
            <button
              key={choice.id}
              className={`choice-button danger-${choice.dangerLevel} ${
                processingChoice === choice.id ? 'loading' : ''
              }`}
              onClick={() => handleChoice(choice)}
              disabled={state.isLoading || processingChoice !== null}
            >
              {choice.text}
              <span className="danger-indicator">⚠️ {choice.dangerLevel}/5</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}