import axios from 'axios';
import type { LLMStoryRequest, LLMStoryResponse, LLMError } from '../types/llm.types';

export class LLMService {
  private readonly apiKey: string;
  private readonly baseURL: string;
  private readonly model: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    this.baseURL = import.meta.env.VITE_OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';
    this.model = import.meta.env.VITE_VISION_MODEL || 'openai/gpt-3.5-turbo';
    
    console.log('🔧 LLMService Configuration:', {
      hasApiKey: !!this.apiKey,
      apiKeyLength: this.apiKey?.length || 0,
      baseURL: this.baseURL,
      model: this.model,
      useMockEnv: import.meta.env.VITE_USE_MOCK
    });
    
    if (!this.apiKey && import.meta.env.VITE_USE_MOCK !== 'true') {
      console.warn('⚠️ Warning: VITE_OPENROUTER_API_KEY not found in environment variables');
    }
  }

  async generateStoryContent(request: LLMStoryRequest): Promise<LLMStoryResponse> {
    console.log('🚀 Starting LLM API request:', {
      model: this.model,
      baseURL: this.baseURL,
      universe: request.universe,
      character: request.characterName
    });

    try {
      const prompt = this.buildStoryPrompt(request);
      
      const requestPayload = {
        model: this.model,
        messages: [
          {
            role: 'system',
            content: `You are a master storyteller creating immersive "choose your own adventure" experiences.
            Generate compelling scenarios with meaningful choices that fit the specified universe and adventure type.
            Always provide 3-4 choices with varying risk levels. Some choices should be potentially fatal based on narrative logic.
            Return valid JSON only.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 800,
        temperature: 0.7,
        response_format: { type: "json_object" }
      };

      console.log('📤 Sending request to OpenRouter API...');
      
      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        requestPayload,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.origin,
            'X-Title': 'Adventure Game'
          },
          timeout: 30000 // 30 second timeout
        }
      );

      console.log('📥 Received response from OpenRouter API:', {
        status: response.status,
        hasChoices: !!response.data?.choices,
        choicesLength: response.data?.choices?.length || 0
      });

      if (!response.data?.choices?.[0]?.message?.content) {
        throw new Error('Invalid response structure from LLM API');
      }

      const content = JSON.parse(response.data.choices[0].message.content);
      const validatedResponse = this.validateResponse(content);
      
      console.log('✅ LLM response validated successfully');
      return validatedResponse;
      
    } catch (error) {
      console.error('❌ Error generating story content:', error);
      
      if (axios.isAxiosError(error)) {
        console.error('🌐 Axios error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          message: error.message
        });
      }
      
      throw this.handleError(error);
    }
  }

  private buildStoryPrompt(request: LLMStoryRequest): string {
    const languageInstructions = this.getLanguageInstructions(request.language);
    
    // Build detailed story context for coherence
    let storyContext = '';
    
    if (request.choiceHistory.length === 0) {
      // Initial story generation
      storyContext = `This is the beginning of ${request.characterName}'s adventure in the ${request.universe} universe.
      Create an engaging opening scenario that sets up the ${request.adventureType} adventure.`;
    } else {
      // Continuation - build narrative flow
      const lastChoice = request.choiceHistory[request.choiceHistory.length - 1];
      
      // Create a narrative summary of previous choices
      const choiceNarrative = request.choiceHistory.map((choice, index) => {
        const consequence = choice.consequence || 'The outcome unfolds...';
        return `${index + 1}. ${request.characterName} chose: "${choice.text}" → ${consequence}`;
      }).join('\n');
      
      storyContext = `STORY CONTINUATION:
      
      Current Scenario: ${request.currentScenario || 'The adventure continues...'}
      
      Previous Story Events:
      ${choiceNarrative}
      
      Last Action: ${request.characterName} just chose "${lastChoice.text}"
      Expected Outcome: ${lastChoice.consequence || 'The consequences of this choice now unfold...'}
      
      CRITICAL: The new scenario MUST logically follow from the last choice "${lastChoice.text}" and its consequence "${lastChoice.consequence || 'the expected outcome'}".
      Show the immediate results of this action and then present the next situation that naturally emerges from it.`;
    }

    return JSON.stringify({
      context: {
        universe: request.universe,
        characterName: request.characterName,
        adventureType: request.adventureType,
        dangerLevel: request.dangerLevel,
        storyProgression: request.storyProgression,
        language: request.language,
        storyContext: storyContext
      },
      instructions: `You are creating a ${request.universe} adventure story for ${request.characterName}.
      
      ${storyContext}
      
      COHERENCE REQUIREMENTS:
      1. If this is a continuation, the new scenario MUST directly result from the last choice made
      2. Reference the consequence of the previous action in the new scenario
      3. Maintain logical cause-and-effect relationships
      4. Keep the character's situation and location consistent unless the choice specifically changed them
      5. Build upon established story elements rather than introducing completely unrelated scenarios
      
      SCENARIO REQUIREMENTS:
      - Create a vivid, immersive scene that fits the ${request.universe} universe
      - Show the immediate aftermath of the previous choice (if any)
      - Present a new challenge or situation that naturally emerges
      - Maintain appropriate tension for danger level ${request.dangerLevel}
      
      CHOICE REQUIREMENTS:
      - Provide 3-4 meaningful choices with varying risk levels (1-5)
      - Include at least one potentially fatal choice (marked isFatal: true)
      - Each choice should have clear, logical consequences
      - Choices should feel natural given the current situation
      - Vary the danger levels to give players strategic options
      
      ${languageInstructions}`,
      responseFormat: {
        scenario: "string - detailed description of the current situation, showing results of previous choice and presenting new challenge",
        choices: [{
          id: "string - unique identifier",
          text: "string - clear action the character can take",
          consequence: "string - what will happen if this choice is made",
          isFatal: "boolean - true if this choice leads to character death",
          dangerLevel: "number - risk level from 1 (safe) to 5 (extremely dangerous)"
        }],
        atmosphere: "string - mood and atmosphere description",
        nextDangerLevel: "number - updated danger level 1-5 based on story progression"
      }
    }, null, 2);
  }

  private getLanguageInstructions(language: string): string {
    const languageMap: Record<string, string> = {
      'en': 'Write all content ONLY in English.',
      'fr': 'Écrivez tout le contenu en français. ET SEULEMENT EN FRANCAIS',
      'es': '!!! Escribe todo el contenido en español. justo en español !!!',
      'de': 'Schreiben Sie alle Inhalte auf Deutsch. NUR AUF DEUTSCH.',
      'it': 'Scrivi tutto il contenuto in italiano.',
      'pt': 'Escreva todo o conteúdo em português.',
      'ru': 'Напишите весь контент на русском языке.',
      'ja': 'すべてのコンテンツを日本語で書いてください。',
      'ko': '모든 내용을 한국어로 작성하세요.',
      'zh': '请用中文写所有内容。'
    };

    return languageMap[language] || 'Write all content in English.';
  }

  private validateResponse(content: any): LLMStoryResponse {
    if (!content.scenario || !content.choices || !Array.isArray(content.choices)) {
      throw new Error('Invalid response format from LLM');
    }

    return {
      scenario: content.scenario,
      choices: content.choices.map((choice: any) => ({
        id: choice.id || Math.random().toString(36).substr(2, 9),
        text: choice.text,
        consequence: choice.consequence || '',
        isFatal: Boolean(choice.isFatal),
        dangerLevel: Math.max(1, Math.min(5, choice.dangerLevel || 1))
      })),
      atmosphere: content.atmosphere || 'Mysterious',
      nextDangerLevel: Math.max(1, Math.min(5, content.nextDangerLevel || 1))
    };
  }

  private handleError(error: any): LLMError {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return {
          message: 'Invalid API key',
          type: 'API_ERROR',
          retryable: false
        };
      }
      if (error.response && error.response.status >= 500) {
        return {
          message: 'Server error',
          type: 'API_ERROR',
          retryable: true
        };
      }
      if (!error.response) {
        return {
          message: 'Network error',
          type: 'NETWORK_ERROR',
          retryable: true
        };
      }
    }
    
    return {
      message: error.message || 'Unknown error',
      type: 'VALIDATION_ERROR',
      retryable: false
    };
  }

  isConfigured(): boolean {
    const isConfigured = Boolean(this.apiKey && this.apiKey.length > 0);
    console.log('🔍 LLMService.isConfigured():', {
      hasApiKey: !!this.apiKey,
      apiKeyValid: isConfigured,
      forceMock: import.meta.env.VITE_USE_MOCK === 'true'
    });
    return isConfigured;
  }
}