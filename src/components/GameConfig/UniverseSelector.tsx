import { useGame } from '../../contexts/GameContext';
import type { Universe } from '../../types/game.types';
import { useTranslation } from '../../services/TranslationService';

interface UniverseSelectorProps {
  onNext: () => void;
}

export function UniverseSelector({ onNext }: UniverseSelectorProps) {
  const { state, dispatch } = useGame();
  const t = useTranslation(state.language);

  const universes: { id: Universe; theme: string }[] = [
    { id: 'fantasy', theme: 'fantasy' },
    { id: 'sci-fi', theme: 'sci-fi' },
    { id: 'horror', theme: 'horror' },
    { id: 'mystery', theme: 'mystery' },
  ];

  const handleSelect = (universe: Universe) => {
    dispatch({ type: 'SET_UNIVERSE', payload: universe });
    onNext();
  };

  return (
    <div className="universe-selector">
      <h2>{t('universe.title')}</h2>
      <div className="universe-grid">
        {universes.map((universe) => (
          <button
            key={universe.id}
            className="universe-card"
            onClick={() => handleSelect(universe.id)}
          >
            <h3>{t(`universe.${universe.id}`)}</h3>
            <p>{t(`universe.${universe.id}.description`)}</p>
          </button>
        ))}
      </div>
    </div>
  );
}