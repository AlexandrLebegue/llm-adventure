import { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { LanguageSelector } from './LanguageSelector';
import { UniverseSelector } from './UniverseSelector';
import { CharacterSetup } from './CharacterSetup';
import { AdventureTypeSelector } from './AdventureTypeSelector';
import { AboutSection } from './AboutSection';
import { useTranslation } from '../../services/TranslationService';

export function GameConfigWizard() {
  const { state, startGame } = useGame();
  const [currentStep, setCurrentStep] = useState(0);
  const [showAbout, setShowAbout] = useState(false);
  const t = useTranslation(state.language);

  const handleStartGame = async () => {
    await startGame();
  };

  const handleShowAbout = () => {
    setShowAbout(true);
  };

  const handleBackFromAbout = () => {
    setShowAbout(false);
  };

  const steps = [
    <LanguageSelector key="language" onNext={() => setCurrentStep(1)} />,
    <UniverseSelector key="universe" onNext={() => setCurrentStep(2)} />,
    <CharacterSetup key="character" onNext={() => setCurrentStep(3)} />,
    <AdventureTypeSelector key="adventure" onNext={handleStartGame} />,
  ];

  if (showAbout) {
    return (
      <div className="game-config-wizard">
        <AboutSection onBack={handleBackFromAbout} />
      </div>
    );
  }

  return (
    <div className="game-config-wizard">
      <h1>{t('game.title')}</h1>
      <div className="config-step">
        {steps[currentStep]}
      </div>
      {currentStep === 0 && (
        <div className="wizard-footer">
          <button onClick={handleShowAbout} className="about-button">
            {t('about.title')}
          </button>
        </div>
      )}
    </div>
  );
}