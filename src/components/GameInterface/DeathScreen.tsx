import { useGame } from '../../contexts/GameContext';
import { useTranslation } from '../../services/TranslationService';

export function DeathScreen() {
  const { state, resetGame } = useGame();
  const t = useTranslation(state.language);

  if (!state.isDead) {
    return null;
  }

  const handlePlayAgain = () => {
    resetGame();
  };

  return (
    <div className="death-screen">
      <div className="death-content">
        <div className="death-icon">💀</div>
        <h2 className="death-title">{t('death.title')}</h2>
        <p className="death-message">{t('death.message')}</p>
        {state.deathMessage && (
          <div className="death-details">
            <p>{state.deathMessage}</p>
          </div>
        )}
        <button 
          className="play-again-button"
          onClick={handlePlayAgain}
        >
          {t('death.playAgain')}
        </button>
      </div>
    </div>
  );
}