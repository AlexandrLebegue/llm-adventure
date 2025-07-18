import { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { useTranslation } from '../../services/TranslationService';

interface CharacterSetupProps {
  onNext: () => void;
}

export function CharacterSetup({ onNext }: CharacterSetupProps) {
  const { state, dispatch } = useGame();
  const [characterName, setCharacterName] = useState('');
  const t = useTranslation(state.language);

  const handleCharacterName = (name: string) => {
    setCharacterName(name);
    dispatch({ type: 'SET_CHARACTER_NAME', payload: name });
  };

  const handleNext = () => {
    if (characterName.trim()) {
      onNext();
    }
  };

  return (
    <div className="character-setup">
      <h2>{t('character.title')}</h2>
      <div className="character-form">
        <label htmlFor="characterName">{t('character.name')}</label>
        <input
          type="text"
          id="characterName"
          placeholder={t('character.placeholder')}
          value={characterName}
          onChange={(e) => handleCharacterName(e.target.value)}
        />
        <button type="button" onClick={handleNext} disabled={!characterName.trim()}>
          {t('common.continue')}
        </button>
      </div>
    </div>
  );
}