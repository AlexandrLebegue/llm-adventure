import { useGame } from '../../contexts/GameContext';
import { useTranslation } from '../../services/TranslationService';

interface AboutSectionProps {
  onBack: () => void;
}

export function AboutSection({ onBack }: AboutSectionProps) {
  const { state } = useGame();
  const t = useTranslation(state.language);

  return (
    <div className="about-section">
      <div className="about-header">
        <h2>{t('about.title')}</h2>
        <button onClick={onBack} className="back-button">
          {t('common.back')}
        </button>
      </div>
      
      <div className="about-content">
        <div className="about-game">
          <h3>{t('about.gameTitle')}</h3>
          <p className="about-description">
            {t('about.description')}
          </p>
        </div>

        <div className="about-features">
          <h4>{t('about.features.title')}</h4>
          <ul className="features-list">
            <li>
              <span className="feature-icon">🌍</span>
              {t('about.features.multiverse')}
            </li>
            <li>
              <span className="feature-icon">🌐</span>
              {t('about.features.multilingual')}
            </li>
            <li>
              <span className="feature-icon">🤖</span>
              {t('about.features.dynamic')}
            </li>
            <li>
              <span className="feature-icon">⚡</span>
              {t('about.features.choices')}
            </li>
          </ul>
        </div>

        <div className="about-how-to-play">
          <h4>{t('about.howToPlay.title')}</h4>
          <ol className="steps-list">
            <li>
              <span className="step-number">1</span>
              {t('about.howToPlay.step1')}
            </li>
            <li>
              <span className="step-number">2</span>
              {t('about.howToPlay.step2')}
            </li>
            <li>
              <span className="step-number">3</span>
              {t('about.howToPlay.step3')}
            </li>
            <li>
              <span className="step-number">4</span>
              {t('about.howToPlay.step4')}
            </li>
          </ol>
        </div>

        <div className="about-footer">
          <p className="version">{t('about.version')}</p>
        </div>
      </div>
    </div>
  );
}