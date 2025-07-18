import { useGame } from '../../contexts/GameContext';
import type { Language, LanguageOption } from '../../types/game.types';
import { useTranslation } from '../../services/TranslationService';

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
];

interface LanguageSelectorProps {
  onNext: () => void;
}

export function LanguageSelector({ onNext }: LanguageSelectorProps) {
  const { state, dispatch } = useGame();
  const t = useTranslation(state.language);

  const handleLanguageSelect = (language: Language) => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  };

  const handleNext = () => {
    if (state.language) {
      onNext();
    }
  };

  return (
    <div className="language-selector">
      <h2>{t('language.title')}</h2>
      <p>{t('language.description')}</p>
      
      <div className="language-grid">
        {LANGUAGE_OPTIONS.map((option) => (
          <button
            key={option.code}
            className={`language-option ${state.language === option.code ? 'selected' : ''}`}
            onClick={() => handleLanguageSelect(option.code)}
          >
            <div className="language-name">{option.name}</div>
            <div className="language-native">{option.nativeName}</div>
          </button>
        ))}
      </div>

      {state.language && (
        <div className="next-button-container">
          <button className="next-button" onClick={handleNext}>
            {t('common.continue')}
          </button>
        </div>
      )}
    </div>
  );
}