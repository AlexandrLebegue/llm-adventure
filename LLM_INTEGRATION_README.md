# 🤖 LLM Integration for Adventure Game

## Overview
This document describes the successful integration of Large Language Model (LLM) capabilities into the adventure game, enabling dynamic story generation and choice creation.

## Architecture

### 🏗️ Service Layer
```
src/services/
├── LLMService.ts          # Core OpenRouter API integration
├── MockStoryService.ts    # Fallback mock system for development
└── StoryService.ts        # Unified service combining LLM and mock
```

### 🔧 Key Components

#### 1. LLMService.ts
- **Purpose**: Direct integration with OpenRouter API
- **Features**:
  - Configurable model selection
  - Structured JSON response handling
  - Error handling with retry logic
  - API key validation

#### 2. MockStoryService.ts
- **Purpose**: Fallback system for development and testing
- **Features**:
  - Pre-written scenarios for each universe (fantasy, sci-fi, horror, mystery)
  - Dynamic choice generation with varying danger levels
  - Simulated API delays for realistic testing

#### 3. StoryService.ts
- **Purpose**: Unified interface that automatically switches between LLM and mock
- **Features**:
  - Automatic fallback to mock when LLM fails
  - Environment-based configuration
  - Consistent API interface

## Configuration

### Environment Variables (.env)
```bash
# OpenRouter Configuration
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
VITE_OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
VITE_VISION_MODEL=openai/gpt-3.5-turbo
VITE_ANALYSIS_MODEL=openai/gpt-3.5-turbo
VITE_USE_MOCK=false
```

### Setup Instructions
1. **Get OpenRouter API Key**: Sign up at https://openrouter.ai/
2. **Update .env file**: Replace `your_openrouter_api_key_here` with your actual API key
3. **Choose model**: Update `VITE_VISION_MODEL` if you want to use a different model
4. **Development mode**: Set `VITE_USE_MOCK=true` to use mock service only

## Integration Points

### 🎮 GameContext Updates
- Added async functions: `startGame()`, `makeChoice()`
- Enhanced state management with loading states
- Integrated story service calls

### 🎯 Component Updates

#### GameConfigWizard
- Updated to use async `startGame()` function
- Proper error handling for story generation

#### ChoiceSelector
- Dynamic choice loading from LLM/mock service
- Real-time choice generation based on story context
- Fallback choices when service fails

#### GameInterface
- Loading states during story generation
- Seamless integration with new async flow

## Features

### 🎨 Dynamic Story Generation
- **Context-aware**: Stories adapt to previous choices and character setup
- **Universe-specific**: Content matches selected universe (fantasy, sci-fi, etc.)
- **Progressive difficulty**: Danger levels increase with story progression

### ⚡ Choice System
- **Dynamic choices**: 3-4 choices generated per scenario
- **Risk assessment**: Each choice has a danger level (1-5)
- **Fatal consequences**: Some choices can lead to character death
- **Visual indicators**: Danger levels displayed with warning icons

### 🛡️ Error Handling
- **Graceful degradation**: Automatic fallback to mock service
- **Retry logic**: Network errors trigger retry attempts
- **User feedback**: Loading states and error messages

## Testing

### Mock System Testing
```bash
# Enable mock mode
VITE_USE_MOCK=true npm run dev
```

### LLM Integration Testing
```bash
# Ensure API key is set
VITE_USE_MOCK=false npm run dev
```

## API Usage

### Story Generation Request
```typescript
interface LLMStoryRequest {
  universe: string;
  characterName: string;
  adventureType: string;
  choiceHistory: Choice[];
  currentScenario?: string;
  dangerLevel: number;
  storyProgression: number;
}
```

### Story Generation Response
```typescript
interface LLMStoryResponse {
  scenario: string;
  choices: Choice[];
  atmosphere: string;
  nextDangerLevel: number;
}
```

## Performance

### Optimization Features
- **Response caching**: Prevents duplicate API calls
- **Timeout handling**: 30-second timeout for API requests
- **Token optimization**: Efficient prompt engineering
- **Fallback system**: Instant mock responses when needed

## Monitoring

### Debug Information
- Service type indicator (LLM vs Mock)
- API response times
- Error logging with context
- Choice generation metrics

## Future Enhancements

### Planned Features
- **Character memory**: Persistent character traits and history
- **Branching narratives**: Complex story trees with multiple endings
- **Custom universes**: User-defined story settings
- **Multiplayer support**: Shared adventures with multiple players

### Technical Improvements
- **Response streaming**: Real-time story generation
- **Advanced caching**: Redis-based story caching
- **Analytics**: Player choice analytics and story optimization
- **A/B testing**: Different prompt strategies

## Troubleshooting

### Common Issues

#### API Key Issues
- **Symptom**: "Invalid API key" error
- **Solution**: Verify API key in .env file and OpenRouter account

#### Network Errors
- **Symptom**: "Network error" messages
- **Solution**: Check internet connection and OpenRouter service status

#### Mock Mode Stuck
- **Symptom**: Always using mock stories
- **Solution**: Set `VITE_USE_MOCK=false` and restart dev server

#### Slow Response Times
- **Symptom**: Long loading times
- **Solution**: Check OpenRouter model status or switch to faster model

## Support

For issues with the LLM integration:
1. Check the browser console for error messages
2. Verify environment variables are correctly set
3. Test with mock mode first (`VITE_USE_MOCK=true`)
4. Check OpenRouter API status and usage limits

## Dependencies

### Added Packages
- `axios`: HTTP client for API requests
- Enhanced TypeScript types for LLM integration

### Development Dependencies
- No additional dev dependencies required
- Uses existing Vite/React setup

---

**Status**: ✅ LLM Integration Complete
**Last Updated**: January 18, 2025
**Version**: 1.0.0