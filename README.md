# 🎮 Interactive Adventure Game

A web-based interactive fiction game that simulates "choose your own adventure" books using a chatbot interface with dynamic theming based on selected universe.

## Features

- **4 Different Universes**: Fantasy, Sci-Fi, Horror, and Mystery
- **Dynamic Theming**: Each universe has its own visual theme
- **Interactive Storytelling**: LLM-powered scenarios and choices
- **Death Mechanics**: After 3+ choices, some choices can be fatal
- **Single Session**: No persistent storage - game resets on page refresh

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd adventure-game
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Game Flow

1. **Configuration Phase**:
   - Choose your universe (Fantasy, Sci-Fi, Horror, Mystery)
   - Enter your character name
   - Select adventure type (Quest, Exploration, Survival, Mystery)

2. **Gameplay**:
   - Read the scenario presented by the game
   - Choose from available options (max 5 choices)
   - After 3 choices, some options may lead to death
   - Game ends when you die or complete the adventure

## Technology Stack

- **Frontend**: React with TypeScript
- **Styling**: CSS Modules with CSS Variables for dynamic theming
- **State Management**: React Context + useReducer
- **Build Tool**: Vite
- **LLM Integration**: OpenRouter API (mock implementation included)

## Project Structure

```
adventure-game/
├── src/
│   ├── components/
│   │   ├── GameConfig/
│   │   │   ├── GameConfigWizard.tsx
│   │   │   ├── UniverseSelector.tsx
│   │   │   ├── CharacterSetup.tsx
│   │   │   └── AdventureTypeSelector.tsx
│   │   └── GameInterface/
│   │       ├── GameInterface.tsx
│   │       ├── ChatWindow.tsx
│   │       ├── ChoiceSelector.tsx
│   │       └── GameStatus.tsx
│   ├── contexts/
│   │   └── GameContext.tsx
│   ├── types/
│   │   └── game.types.ts
│   ├── styles/
│   │   └── globals.css
│   └── App.tsx
├── public/
├── index.html
├── package.json
└── vite.config.ts
```

## Customization

### Adding New Universes
1. Add the universe type to `src/types/game.types.ts`
2. Create a new CSS theme in `src/styles/globals.css`
3. Update the universe selector in `UniverseSelector.tsx`

### Integrating Real LLM
1. Replace the mock choices in `ChoiceSelector.tsx` with actual API calls
2. Update the `useLLM` hook to use OpenRouter or your preferred LLM service
3. Add your API key to environment variables

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Features
- Game state is managed through the GameContext
- New actions can be added to the GameAction type
- Components automatically re-render when state changes

## License

MIT License
