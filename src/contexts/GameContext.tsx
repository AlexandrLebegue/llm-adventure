import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Universe, AdventureType, Choice, StoryEntry, Language } from '../types/game.types';
import { storyService } from '../services/StoryService';

interface GameState {
  // Configuration
  universe: Universe | null;
  characterName: string;
  adventureType: AdventureType | null;
  language: Language;
  
  // Game Progress
  currentScenario: string;
  currentChoices: Choice[]; // Available choices for current scenario
  choiceHistory: Choice[]; // History of choices made
  choiceCount: number;
  isDead: boolean;
  deathMessage: string;
  isLoading: boolean;
  dangerLevel: number;
  storyProgression: number;
  
  // Story History
  storyHistory: StoryEntry[];
  
  // UI State
  gameStarted: boolean;
}

type GameAction =
  | { type: 'SET_UNIVERSE'; payload: Universe }
  | { type: 'SET_CHARACTER_NAME'; payload: string }
  | { type: 'SET_ADVENTURE_TYPE'; payload: AdventureType }
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'START_GAME' }
  | { type: 'SET_SCENARIO_AND_CHOICES'; payload: { scenario: string; choices: Choice[] } }
  | { type: 'ADD_CHOICE'; payload: Choice }
  | { type: 'SET_DEATH'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'ADD_STORY_ENTRY'; payload: StoryEntry }
  | { type: 'RESET_GAME' };

const initialState: GameState = {
  universe: null,
  characterName: '',
  adventureType: null,
  language: 'en',
  currentScenario: '',
  currentChoices: [],
  choiceHistory: [],
  choiceCount: 0,
  isDead: false,
  deathMessage: '',
  isLoading: false,
  dangerLevel: 1,
  storyProgression: 0,
  storyHistory: [],
  gameStarted: false,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_UNIVERSE':
      return { ...state, universe: action.payload };
    case 'SET_CHARACTER_NAME':
      return { ...state, characterName: action.payload };
    case 'SET_ADVENTURE_TYPE':
      return { ...state, adventureType: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'START_GAME':
      return {
        ...state,
        gameStarted: true,
        isLoading: true,
      };
    case 'SET_SCENARIO_AND_CHOICES':
      return {
        ...state,
        currentScenario: action.payload.scenario,
        currentChoices: action.payload.choices,
        isLoading: false
      };
    case 'ADD_CHOICE':
      const newChoiceHistory = [...state.choiceHistory, action.payload];
      const newChoiceCount = state.choiceCount + 1;
      const newStoryProgression = state.storyProgression + 1;
      
      return {
        ...state,
        choiceHistory: newChoiceHistory,
        choiceCount: newChoiceCount,
        storyProgression: newStoryProgression,
      };
    case 'SET_DEATH':
      return {
        ...state,
        isDead: true,
        deathMessage: action.payload,
        isLoading: false,
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'ADD_STORY_ENTRY':
      return {
        ...state,
        storyHistory: [...state.storyHistory, action.payload],
      };
    case 'RESET_GAME':
      return initialState;
    default:
      return state;
  }
}

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  startGame: () => Promise<void>;
  makeChoice: (choice: Choice) => Promise<void>;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const startGame = useCallback(async () => {
    if (!state.universe || !state.characterName || !state.adventureType) {
      console.error('Cannot start game: missing configuration');
      return;
    }

    dispatch({ type: 'START_GAME' });
    
    try {
      const response = await storyService.generateInitialStory(
        state.universe,
        state.characterName,
        state.adventureType,
        state.language
      );
      
      dispatch({
        type: 'SET_SCENARIO_AND_CHOICES',
        payload: {
          scenario: response.scenario,
          choices: response.choices
        }
      });
      
      // Add initial story entry to history
      const storyEntry: StoryEntry = {
        id: `story-${Date.now()}`,
        scenario: response.scenario,
        timestamp: new Date(),
        storyProgression: 0,
      };
      dispatch({ type: 'ADD_STORY_ENTRY', payload: storyEntry });
    } catch (error) {
      console.error('Failed to start game:', error);
      const fallbackScenario = 'Your adventure begins...';
      const fallbackChoices = [
        {
          id: '1',
          text: 'Continue exploring',
          isFatal: false,
          dangerLevel: 2,
        },
        {
          id: '2',
          text: 'Return to safety',
          isFatal: false,
          dangerLevel: 1,
        },
      ];
      
      dispatch({
        type: 'SET_SCENARIO_AND_CHOICES',
        payload: {
          scenario: fallbackScenario,
          choices: fallbackChoices
        }
      });
      
      // Add fallback story entry to history
      const storyEntry: StoryEntry = {
        id: `story-${Date.now()}`,
        scenario: fallbackScenario,
        timestamp: new Date(),
        storyProgression: 0,
      };
      dispatch({ type: 'ADD_STORY_ENTRY', payload: storyEntry });
    }
  }, [state.universe, state.characterName, state.adventureType, state.language]);

  const makeChoice = useCallback(async (choice: Choice) => {
    dispatch({ type: 'ADD_CHOICE', payload: choice });
    
    if (choice.isFatal) {
      dispatch({ type: 'SET_DEATH', payload: choice.consequence || 'You have perished.' });
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const response = await storyService.generateNextStory(
        state.universe!,
        state.characterName,
        state.adventureType!,
        [...state.choiceHistory, choice],
        state.currentScenario,
        choice.dangerLevel,
        state.storyProgression + 1,
        state.language
      );
      
      dispatch({
        type: 'SET_SCENARIO_AND_CHOICES',
        payload: {
          scenario: response.scenario,
          choices: response.choices
        }
      });
      
      // Add new story entry to history
      const storyEntry: StoryEntry = {
        id: `story-${Date.now()}`,
        scenario: response.scenario,
        choice: choice,
        timestamp: new Date(),
        storyProgression: state.storyProgression + 1,
      };
      dispatch({ type: 'ADD_STORY_ENTRY', payload: storyEntry });
    } catch (error) {
      console.error('Failed to generate next story:', error);
      const fallbackScenario = 'The story continues...';
      const fallbackChoices = [
        {
          id: '1',
          text: 'Continue exploring',
          isFatal: false,
          dangerLevel: 2,
        },
        {
          id: '2',
          text: 'Return to safety',
          isFatal: false,
          dangerLevel: 1,
        },
      ];
      
      dispatch({
        type: 'SET_SCENARIO_AND_CHOICES',
        payload: {
          scenario: fallbackScenario,
          choices: fallbackChoices
        }
      });
      
      // Add fallback story entry to history
      const storyEntry: StoryEntry = {
        id: `story-${Date.now()}`,
        scenario: fallbackScenario,
        choice: choice,
        timestamp: new Date(),
        storyProgression: state.storyProgression + 1,
      };
      dispatch({ type: 'ADD_STORY_ENTRY', payload: storyEntry });
    }
  }, [state.universe, state.characterName, state.adventureType, state.choiceHistory, state.currentScenario, state.storyProgression, state.language]);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  return (
    <GameContext.Provider value={{ state, dispatch, startGame, makeChoice, resetGame }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}