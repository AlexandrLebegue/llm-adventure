export interface LLMStoryRequest {
  universe: string;
  characterName: string;
  adventureType: string;
  choiceHistory: Array<{
    text: string;
    consequence?: string;
    isFatal: boolean;
    dangerLevel: number;
  }>;
  currentScenario?: string;
  dangerLevel: number;
  storyProgression: number;
  language: string;
}

export interface LLMStoryResponse {
  scenario: string;
  choices: Array<{
    id: string;
    text: string;
    consequence?: string;
    isFatal: boolean;
    dangerLevel: number;
  }>;
  atmosphere: string;
  nextDangerLevel: number;
}

export interface LLMError {
  message: string;
  type: 'API_ERROR' | 'NETWORK_ERROR' | 'VALIDATION_ERROR';
  retryable: boolean;
}

export interface MockStoryTemplate {
  scenarios: string[];
  choices: Array<{
    text: string;
    consequence?: string;
    isFatal: boolean;
    dangerLevel: number;
  }>;
  atmosphere: string;
}