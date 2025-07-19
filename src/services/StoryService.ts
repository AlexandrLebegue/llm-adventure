import { LLMService } from './LLMService';
import { MockStoryService } from './MockStoryService';
import type { LLMStoryRequest, LLMStoryResponse } from '../types/llm.types';

export class StoryService {
  private llmService: LLMService;
  private mockService: MockStoryService;
  private useMock: boolean;

  constructor() {
    this.llmService = new LLMService();
    this.mockService = new MockStoryService();
    
    const forceMock = false;
    const llmConfigured = this.llmService.isConfigured();
    
    // Priority: explicit VITE_USE_MOCK=true forces mock, otherwise use LLM if configured
    this.useMock = forceMock || !llmConfigured;
    
    console.log('🎮 StoryService Initialization:', {
      forceMock,
      llmConfigured,
      useMock: this.useMock,
      selectedService: this.useMock ? 'MOCK' : 'LLM'
    });
    
    if (this.useMock) {
      console.log('📝 Using Mock Story Service');
    } else {
      console.log('🤖 Using LLM Story Service');
    }
  }

  async generateStory(request: LLMStoryRequest): Promise<LLMStoryResponse> {
    if (this.useMock) {
      console.log('📝 Using mock story service for generation');
      return this.mockService.generateStory(request);
    }

    try {
      console.log('🤖 Using LLM service for story generation', {
        universe: request.universe,
        character: request.characterName,
        adventureType: request.adventureType,
        dangerLevel: request.dangerLevel
      });
      
      const response = await this.llmService.generateStoryContent(request);
      console.log('✅ LLM story generation successful');
      return response;
    } catch (error) {
      console.error('❌ LLM service failed, falling back to mock:', error);
      console.log('📝 Switching to mock service for this request');
      return this.mockService.generateStory(request);
    }
  }

  async generateInitialStory(
    universe: string,
    characterName: string,
    adventureType: string,
    language: string
  ): Promise<LLMStoryResponse> {
    const request: LLMStoryRequest = {
      universe,
      characterName,
      adventureType,
      choiceHistory: [],
      dangerLevel: 1,
      storyProgression: 0,
      language
    };

    return this.generateStory(request);
  }

  async generateNextStory(
    universe: string,
    characterName: string,
    adventureType: string,
    choiceHistory: any[],
    currentScenario: string,
    dangerLevel: number,
    storyProgression: number,
    language: string
  ): Promise<LLMStoryResponse> {
    const request: LLMStoryRequest = {
      universe,
      characterName,
      adventureType,
      choiceHistory,
      currentScenario,
      dangerLevel,
      storyProgression,
      language
    };

    return this.generateStory(request);
  }

  isUsingMock(): boolean {
    return this.useMock;
  }

  isConfigured(): boolean {
    return this.llmService.isConfigured();
  }

  getServiceStatus(): { service: 'LLM' | 'MOCK'; configured: boolean; reason?: string } {
    const configured = this.llmService.isConfigured();
    const forceMock = false;
    
    if (forceMock) {
      return { service: 'MOCK', configured, reason: 'VITE_USE_MOCK=true' };
    }
    
    if (!configured) {
      return { service: 'MOCK', configured, reason: 'LLM not configured (missing API key)' };
    }
    
    return { service: 'LLM', configured };
  }
}

export const storyService = new StoryService();