export type Universe = 'fantasy' | 'sci-fi' | 'horror' | 'mystery';
export type AdventureType = 'quest' | 'exploration' | 'survival' | 'mystery';
export type Language = 'en' | 'fr' | 'es' | 'de' | 'it' | 'pt' | 'ru' | 'ja' | 'ko' | 'zh';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
}

export interface Choice {
  id: string;
  text: string;
  consequence?: string;
  isFatal: boolean;
  dangerLevel: number;
}

export interface StoryEntry {
  id: string;
  scenario: string;
  choice?: Choice;
  timestamp: Date;
  storyProgression: number;
}

export interface GameState {
  // Configuration
  universe: Universe | null;
  characterName: string;
  adventureType: AdventureType | null;
  language: Language;
  
  // Game Progress
  currentScenario: string;
  choiceHistory: Choice[];
  isDead: boolean;
  isLoading: boolean;
  deathMessage: string;
  
  // Narrative Context
  dangerLevel: number;
  storyProgression: number;
  
  // UI State
  gameStarted: boolean;
}

export interface LLMRequest {
  universe: Universe;
  characterName: string;
  adventureType: AdventureType;
  choiceHistory: Choice[];
  currentScenario: string;
  dangerLevel: number;
  language: Language;
}

export interface LLMResponse {
  scenario: string;
  choices: Choice[];
  atmosphere: string;
  nextDangerLevel: number;
}

export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    danger: string;
    success: string;
  };
  fonts: {
    primary: string;
    secondary: string;
  };
  borders: {
    radius: string;
    style: string;
  };
}