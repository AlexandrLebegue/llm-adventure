import type { LLMStoryRequest, LLMStoryResponse } from '../types/llm.types';

export class MockStoryService {
  private templates = {
    fantasy: {
      scenarios: [
        "You stand at the entrance of an ancient dragon's lair. The air shimmers with heat, and the ground trembles with each breath from within. Your quest for the Crystal of Eternal Light has led you here.",
        "A mystical forest surrounds you, ancient trees whispering secrets in languages long forgotten. A glowing path diverges ahead, one route leading deeper into darkness, another towards a distant tower.",
        "The village elder's words echo in your mind: 'Only the bravest may enter the Shadow Realm.' Before you stands a portal of swirling darkness, pulsing with malevolent energy."
      ],
      choices: [
        { text: "Enter the dragon's lair boldly", consequence: "The dragon awakens and challenges you to a duel", isFatal: true, dangerLevel: 5 },
        { text: "Search for a secret entrance", consequence: "You find a hidden passage but it's trapped", isFatal: false, dangerLevel: 3 },
        { text: "Retreat and gather allies", consequence: "You return to the village to form a party", isFatal: false, dangerLevel: 1 },
        { text: "Use stealth to sneak inside", consequence: "You successfully infiltrate the lair", isFatal: false, dangerLevel: 4 }
      ]
    },
    'sci-fi': {
      scenarios: [
        "Your spaceship's AI alerts you to an anomaly ahead - a derelict alien vessel drifting in the void. Life support signatures are... impossible. Something is still alive.",
        "The quantum communicator crackles: 'Warning: Temporal paradox detected.' Your ship's chronometer shows impossible readings. You're caught in a time loop.",
        "Mars Colony 7 sends a distress signal: 'They've breached the perimeter. The infection spreads through touch. Do not trust anyone.' Your ship is 2 hours away."
      ],
      choices: [
        { text: "Board the derelict vessel", consequence: "You discover alien technology but trigger a defense system", isFatal: true, dangerLevel: 5 },
        { text: "Scan from a safe distance", consequence: "You gather valuable data without risk", isFatal: false, dangerLevel: 2 },
        { text: "Call for backup", consequence: "Reinforcements arrive but the vessel vanishes", isFatal: false, dangerLevel: 1 },
        { text: "Send a probe first", consequence: "The probe is destroyed but you learn the ship's secrets", isFatal: false, dangerLevel: 3 }
      ]
    },
    horror: {
      scenarios: [
        "The abandoned asylum's doors creak open at your touch. Inside, the walls weep blood, and whispers promise eternal suffering. Your flashlight flickers ominously.",
        "The mirror shows your reflection... but it's moving independently. It smiles with too many teeth and beckons you closer. Behind you, something breathes.",
        "The town's residents warned you not to enter the woods after dark. Now you understand why - the trees have eyes, and the ground pulses like a heartbeat."
      ],
      choices: [
        { text: "Enter the asylum alone", consequence: "You become trapped in a nightmare realm", isFatal: true, dangerLevel: 5 },
        { text: "Call out to see if anyone's there", consequence: "Something answers, but it's not human", isFatal: false, dangerLevel: 4 },
        { text: "Use your phone's flashlight", consequence: "The light reveals terrible truths", isFatal: false, dangerLevel: 3 },
        { text: "Leave immediately", consequence: "You escape but the nightmares follow", isFatal: false, dangerLevel: 2 }
      ]
    },
    mystery: {
      scenarios: [
        "The detective's final case file contains a single word: 'RUN.' His last known location was the abandoned mansion on the hill. The door is ajar, inviting.",
        "The encrypted message decodes to coordinates and a time: midnight tonight. The location is a cemetery. Someone wants to meet you among the dead.",
        "The antique shop owner vanished three days ago. His ledger shows a final sale: 'One cursed object - buyer beware.' The item is still here, waiting."
      ],
      choices: [
        { text: "Enter the mansion immediately", consequence: "You trigger an elaborate trap", isFatal: true, dangerLevel: 4 },
        { text: "Call for backup first", consequence: "Help arrives but the evidence is gone", isFatal: false, dangerLevel: 2 },
        { text: "Observe from outside", consequence: "You notice suspicious activity", isFatal: false, dangerLevel: 3 },
        { text: "Research the mansion's history", consequence: "You uncover crucial information", isFatal: false, dangerLevel: 1 }
      ]
    }
  };

  async generateStory(request: LLMStoryRequest): Promise<LLMStoryResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const universe = request.universe as keyof typeof this.templates;
    const template = this.templates[universe] || this.templates.fantasy;
    
    let scenario: string;
    
    if (request.choiceHistory.length === 0) {
      // Initial scenario
      scenario = template.scenarios[
        Math.floor(Math.random() * template.scenarios.length)
      ].replace('{{character}}', request.characterName);
    } else {
      // Generate coherent continuation based on last choice
      const lastChoice = request.choiceHistory[request.choiceHistory.length - 1];
      scenario = this.generateCoherentScenario(request, lastChoice, template);
    }

    // Create dynamic choices based on current danger level
    let choices = template.choices.map(choice => ({
      ...choice,
      id: Math.random().toString(36).substr(2, 9),
      dangerLevel: Math.min(5, Math.max(1, choice.dangerLevel + Math.floor(Math.random() * 3) - 1))
    }));

    // Apply language translation if not English
    if (request.language !== 'en') {
      scenario = this.translateText(scenario, request.language);
      choices = choices.map(choice => ({
        ...choice,
        text: this.translateText(choice.text, request.language),
        consequence: choice.consequence ? this.translateText(choice.consequence, request.language) : choice.consequence
      }));
    }

    // Adjust danger level based on story progression
    let nextDangerLevel = request.dangerLevel;
    if (request.storyProgression > 5) {
      nextDangerLevel = Math.min(5, nextDangerLevel + 1);
    }

    const atmosphere = request.language !== 'en'
      ? this.translateText(`A tense ${request.universe} atmosphere`, request.language)
      : `A tense ${request.universe} atmosphere`;

    return {
      scenario,
      choices,
      atmosphere,
      nextDangerLevel
    };
  }

  private generateCoherentScenario(request: LLMStoryRequest, lastChoice: any, template: any): string {
    const characterName = request.characterName;
    const consequence = lastChoice.consequence || 'The outcome unfolds...';
    
    // Create scenario that follows from the last choice
    const continuationTemplates = {
      fantasy: [
        `Following your decision to "${lastChoice.text}", ${consequence}. ${characterName} now finds themselves in a new predicament. The ancient magic in the air grows stronger, and a new challenge emerges from the shadows.`,
        `After choosing to "${lastChoice.text}", the consequences become clear: ${consequence}. ${characterName} must now face what comes next as the adventure takes an unexpected turn.`,
        `Your choice to "${lastChoice.text}" has led to this: ${consequence}. Now ${characterName} stands before a new trial, the mystical forces of this realm presenting fresh dangers.`
      ],
      'sci-fi': [
        `The decision to "${lastChoice.text}" resulted in: ${consequence}. ${characterName}'s situation has evolved, and the ship's sensors detect new anomalies requiring immediate attention.`,
        `After choosing to "${lastChoice.text}", the outcome was: ${consequence}. Now ${characterName} faces the next phase of this space-faring adventure as new challenges emerge.`,
        `Your choice to "${lastChoice.text}" brought about: ${consequence}. The cosmic forces at play have shifted, presenting ${characterName} with a new dilemma.`
      ],
      horror: [
        `The choice to "${lastChoice.text}" has unleashed: ${consequence}. ${characterName} realizes the true horror is just beginning as darker forces stir in response.`,
        `After deciding to "${lastChoice.text}", the terrifying result was: ${consequence}. Now ${characterName} must confront an even more sinister presence.`,
        `Your decision to "${lastChoice.text}" led to: ${consequence}. The nightmare deepens as ${characterName} discovers the true extent of the evil lurking here.`
      ],
      mystery: [
        `The choice to "${lastChoice.text}" revealed: ${consequence}. ${characterName} pieces together more of the puzzle, but new mysteries emerge from the shadows.`,
        `After choosing to "${lastChoice.text}", the investigation took a turn: ${consequence}. Now ${characterName} must follow the trail to its next revelation.`,
        `Your decision to "${lastChoice.text}" uncovered: ${consequence}. The mystery deepens as ${characterName} realizes there are more secrets to unravel.`
      ]
    };

    const universe = request.universe as keyof typeof continuationTemplates;
    const templates = continuationTemplates[universe] || continuationTemplates.fantasy;
    
    return templates[Math.floor(Math.random() * templates.length)];
  }

  private translateText(text: string, language: string): string {
    // Simple mock translation - in a real app, you'd use a translation service
    const translations: Record<string, Record<string, string>> = {
      'fr': {
        'Enter the dragon\'s lair boldly': 'Entrez audacieusement dans le repaire du dragon',
        'Search for a secret entrance': 'Cherchez une entrée secrète',
        'Retreat and gather allies': 'Retraite et rassemblez des alliés',
        'Use stealth to sneak inside': 'Utilisez la furtivité pour vous faufiler à l\'intérieur',
        'A tense fantasy atmosphere': 'Une atmosphère fantastique tendue',
        'A tense sci-fi atmosphere': 'Une atmosphère de science-fiction tendue',
        'A tense horror atmosphere': 'Une atmosphère d\'horreur tendue',
        'A tense mystery atmosphere': 'Une atmosphère de mystère tendue'
      },
      'es': {
        'Enter the dragon\'s lair boldly': 'Entra audazmente en la guarida del dragón',
        'Search for a secret entrance': 'Busca una entrada secreta',
        'Retreat and gather allies': 'Retírate y reúne aliados',
        'Use stealth to sneak inside': 'Usa sigilo para colarte dentro',
        'A tense fantasy atmosphere': 'Una atmósfera de fantasía tensa',
        'A tense sci-fi atmosphere': 'Una atmósfera de ciencia ficción tensa',
        'A tense horror atmosphere': 'Una atmósfera de terror tensa',
        'A tense mystery atmosphere': 'Una atmósfera de misterio tensa'
      }
    };

    const languageTranslations = translations[language];
    if (languageTranslations && languageTranslations[text]) {
      return languageTranslations[text];
    }

    // If no translation found, add a language prefix to indicate the language
    const prefixes: Record<string, string> = {
      'fr': '[FR] ',
      'es': '[ES] ',
      'de': '[DE] ',
      'it': '[IT] ',
      'pt': '[PT] ',
      'ru': '[RU] ',
      'ja': '[JA] ',
      'ko': '[KO] ',
      'zh': '[ZH] '
    };

    return (prefixes[language] || '') + text;
  }
}