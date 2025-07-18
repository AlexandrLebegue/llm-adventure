
import { useGame } from '../../contexts/GameContext';
import type { AdventureType } from '../../types/game.types';
import { useTranslation } from '../../services/TranslationService';

interface AdventureTypeSelectorProps {
  onNext: () => void;
}

export function AdventureTypeSelector({ onNext }: AdventureTypeSelectorProps) {
  const { state, dispatch } = useGame();
  const t = useTranslation(state.language);

  const adventureTypes: AdventureType[] = ['quest', 'exploration', 'survival', 'mystery'];

  const handleSelect = (type: AdventureType) => {
    dispatch({ type: 'SET_ADVENTURE_TYPE', payload: type });
    onNext();
  };

  return (
    <div className="adventure-type-selector">
      <h2>{t('adventure.title')}</h2>
      <div className="adventure-grid">
        {adventureTypes.map((type) => (
          <button
            key={type}
            className="adventure-card"
            onClick={() => handleSelect(type)}
          >
            <h3>{t(`adventure.${type}`)}</h3>
          </button>
        ))}
      </div>
      <div className="start-game-container">
        <button className="start-game-button" onClick={onNext}>
          {t('common.startGame')}
        </button>
      </div>
    </div>
  );
}