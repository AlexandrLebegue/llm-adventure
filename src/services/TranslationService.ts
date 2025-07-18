import type { Language } from '../types/game.types';

interface Translations {
  [key: string]: {
    [language in Language]: string;
  };
}

const translations: Translations = {
  // Language Selector
  'language.title': {
    en: 'Select Your Language',
    fr: 'Sélectionnez votre langue',
    es: 'Selecciona tu idioma',
    de: 'Wählen Sie Ihre Sprache',
    it: 'Seleziona la tua lingua',
    pt: 'Selecione seu idioma',
    ru: 'Выберите ваш язык',
    ja: '言語を選択してください',
    ko: '언어를 선택하세요',
    zh: '选择您的语言'
  },
  'language.description': {
    en: 'Choose the language for your adventure story:',
    fr: 'Choisissez la langue de votre histoire d\'aventure :',
    es: 'Elige el idioma para tu historia de aventura:',
    de: 'Wählen Sie die Sprache für Ihre Abenteuergeschichte:',
    it: 'Scegli la lingua per la tua storia di avventura:',
    pt: 'Escolha o idioma para sua história de aventura:',
    ru: 'Выберите язык для вашей приключенческой истории:',
    ja: 'アドベンチャーストーリーの言語を選択してください：',
    ko: '모험 이야기의 언어를 선택하세요:',
    zh: '选择您的冒险故事语言：'
  },
  'common.continue': {
    en: 'Continue',
    fr: 'Continuer',
    es: 'Continuar',
    de: 'Weiter',
    it: 'Continua',
    pt: 'Continuar',
    ru: 'Продолжить',
    ja: '続ける',
    ko: '계속',
    zh: '继续'
  },
  // Main Title
  'game.title': {
    en: 'Choose Your Adventure',
    fr: 'Choisissez votre aventure',
    es: 'Elige tu aventura',
    de: 'Wählen Sie Ihr Abenteuer',
    it: 'Scegli la tua avventura',
    pt: 'Escolha sua aventura',
    ru: 'Выберите ваше приключение',
    ja: 'あなたの冒険を選んでください',
    ko: '당신의 모험을 선택하세요',
    zh: '选择您的冒险'
  },
  // Universe Selector
  'universe.title': {
    en: 'Choose Your Universe',
    fr: 'Choisissez votre univers',
    es: 'Elige tu universo',
    de: 'Wählen Sie Ihr Universum',
    it: 'Scegli il tuo universo',
    pt: 'Escolha seu universo',
    ru: 'Выберите ваш мир',
    ja: 'あなたの世界を選んでください',
    ko: '당신의 세계를 선택하세요',
    zh: '选择您的世界'
  },
  'universe.fantasy': {
    en: 'Fantasy',
    fr: 'Fantastique',
    es: 'Fantasía',
    de: 'Fantasy',
    it: 'Fantasy',
    pt: 'Fantasia',
    ru: 'Фэнтези',
    ja: 'ファンタジー',
    ko: '판타지',
    zh: '奇幻'
  },
  'universe.fantasy.description': {
    en: 'Magical realms and mythical creatures',
    fr: 'Royaumes magiques et créatures mythiques',
    es: 'Reinos mágicos y criaturas míticas',
    de: 'Magische Reiche und mythische Kreaturen',
    it: 'Regni magici e creature mitiche',
    pt: 'Reinos mágicos e criaturas míticas',
    ru: 'Магические миры и мифические существа',
    ja: '魔法の世界と神話の生き物',
    ko: '마법의 영역과 신화적 생물',
    zh: '魔法王国和神话生物'
  },
  'universe.sci-fi': {
    en: 'Sci-Fi',
    fr: 'Science-Fiction',
    es: 'Ciencia Ficción',
    de: 'Science-Fiction',
    it: 'Fantascienza',
    pt: 'Ficção Científica',
    ru: 'Научная фантастика',
    ja: 'SF',
    ko: 'SF',
    zh: '科幻'
  },
  'universe.sci-fi.description': {
    en: 'Futuristic worlds and advanced technology',
    fr: 'Mondes futuristes et technologie avancée',
    es: 'Mundos futuristas y tecnología avanzada',
    de: 'Futuristische Welten und fortschrittliche Technologie',
    it: 'Mondi futuristici e tecnologia avanzata',
    pt: 'Mundos futuristas e tecnologia avançada',
    ru: 'Футуристические миры и передовые технологии',
    ja: '未来的な世界と先進技術',
    ko: '미래적 세계와 첨단 기술',
    zh: '未来世界和先进技术'
  },
  'universe.horror': {
    en: 'Horror',
    fr: 'Horreur',
    es: 'Terror',
    de: 'Horror',
    it: 'Horror',
    pt: 'Terror',
    ru: 'Ужасы',
    ja: 'ホラー',
    ko: '호러',
    zh: '恐怖'
  },
  'universe.horror.description': {
    en: 'Dark and terrifying encounters',
    fr: 'Rencontres sombres et terrifiantes',
    es: 'Encuentros oscuros y aterradores',
    de: 'Dunkle und erschreckende Begegnungen',
    it: 'Incontri oscuri e terrificanti',
    pt: 'Encontros sombrios e aterrorizantes',
    ru: 'Темные и ужасающие встречи',
    ja: '暗く恐ろしい出会い',
    ko: '어둡고 무서운 만남',
    zh: '黑暗恐怖的遭遇'
  },
  'universe.mystery': {
    en: 'Mystery',
    fr: 'Mystère',
    es: 'Misterio',
    de: 'Mystery',
    it: 'Mistero',
    pt: 'Mistério',
    ru: 'Детектив',
    ja: 'ミステリー',
    ko: '미스터리',
    zh: '悬疑'
  },
  'universe.mystery.description': {
    en: 'Detective stories and puzzling cases',
    fr: 'Histoires de détective et affaires mystérieuses',
    es: 'Historias de detectives y casos desconcertantes',
    de: 'Detektivgeschichten und rätselhafte Fälle',
    it: 'Storie di detective e casi misteriosi',
    pt: 'Histórias de detetive e casos intrigantes',
    ru: 'Детективные истории и загадочные дела',
    ja: '探偵小説と謎めいた事件',
    ko: '탐정 이야기와 수수께끼 사건',
    zh: '侦探故事和神秘案件'
  },
  // Character Setup
  'character.title': {
    en: 'Character Setup',
    fr: 'Configuration du personnage',
    es: 'Configuración del personaje',
    de: 'Charaktererstellung',
    it: 'Configurazione del personaggio',
    pt: 'Configuração do personagem',
    ru: 'Настройка персонажа',
    ja: 'キャラクター設定',
    ko: '캐릭터 설정',
    zh: '角色设置'
  },
  'character.name': {
    en: 'Character Name:',
    fr: 'Nom du personnage :',
    es: 'Nombre del personaje:',
    de: 'Charaktername:',
    it: 'Nome del personaggio:',
    pt: 'Nome do personagem:',
    ru: 'Имя персонажа:',
    ja: 'キャラクター名：',
    ko: '캐릭터 이름:',
    zh: '角色姓名：'
  },
  'character.placeholder': {
    en: 'Enter your character name',
    fr: 'Entrez le nom de votre personnage',
    es: 'Ingresa el nombre de tu personaje',
    de: 'Geben Sie Ihren Charakternamen ein',
    it: 'Inserisci il nome del tuo personaggio',
    pt: 'Digite o nome do seu personagem',
    ru: 'Введите имя вашего персонажа',
    ja: 'キャラクター名を入力してください',
    ko: '캐릭터 이름을 입력하세요',
    zh: '输入您的角色姓名'
  },
  // Adventure Type
  'adventure.title': {
    en: 'Choose Your Adventure Type',
    fr: 'Choisissez votre type d\'aventure',
    es: 'Elige tu tipo de aventura',
    de: 'Wählen Sie Ihren Abenteuertyp',
    it: 'Scegli il tuo tipo di avventura',
    pt: 'Escolha seu tipo de aventura',
    ru: 'Выберите тип приключения',
    ja: '冒険のタイプを選んでください',
    ko: '모험 유형을 선택하세요',
    zh: '选择您的冒险类型'
  },
  'adventure.quest': {
    en: 'Quest',
    fr: 'Quête',
    es: 'Misión',
    de: 'Quest',
    it: 'Missione',
    pt: 'Missão',
    ru: 'Квест',
    ja: 'クエスト',
    ko: '퀘스트',
    zh: '任务'
  },
  'adventure.exploration': {
    en: 'Exploration',
    fr: 'Exploration',
    es: 'Exploración',
    de: 'Erkundung',
    it: 'Esplorazione',
    pt: 'Exploração',
    ru: 'Исследование',
    ja: '探検',
    ko: '탐험',
    zh: '探索'
  },
  'adventure.survival': {
    en: 'Survival',
    fr: 'Survie',
    es: 'Supervivencia',
    de: 'Überleben',
    it: 'Sopravvivenza',
    pt: 'Sobrevivência',
    ru: 'Выживание',
    ja: 'サバイバル',
    ko: '생존',
    zh: '生存'
  },
  'adventure.mystery': {
    en: 'Mystery',
    fr: 'Mystère',
    es: 'Misterio',
    de: 'Mystery',
    it: 'Mistero',
    pt: 'Mistério',
    ru: 'Детектив',
    ja: 'ミステリー',
    ko: '미스터리',
    zh: '悬疑'
  },
  'common.startGame': {
    en: 'Start Game',
    fr: 'Commencer le jeu',
    es: 'Comenzar juego',
    de: 'Spiel starten',
    it: 'Inizia gioco',
    pt: 'Iniciar jogo',
    ru: 'Начать игру',
    ja: 'ゲーム開始',
    ko: '게임 시작',
    zh: '开始游戏'
  },
  // Game Interface
  'game.whatToDo': {
    en: 'What do you do?',
    fr: 'Que faites-vous ?',
    es: '¿Qué haces?',
    de: 'Was machst du?',
    it: 'Cosa fai?',
    pt: 'O que você faz?',
    ru: 'Что вы делаете?',
    ja: 'どうしますか？',
    ko: '무엇을 하시겠습니까?',
    zh: '你要做什么？'
  },
  'game.loading.scenario': {
    en: 'Generating next scenario...',
    fr: 'Génération du prochain scénario...',
    es: 'Generando el siguiente escenario...',
    de: 'Nächstes Szenario wird generiert...',
    it: 'Generazione del prossimo scenario...',
    pt: 'Gerando próximo cenário...',
    ru: 'Генерация следующего сценария...',
    ja: '次のシナリオを生成中...',
    ko: '다음 시나리오 생성 중...',
    zh: '正在生成下一个场景...'
  },
  'game.loading.choices': {
    en: 'Loading choices...',
    fr: 'Chargement des choix...',
    es: 'Cargando opciones...',
    de: 'Optionen werden geladen...',
    it: 'Caricamento delle scelte...',
    pt: 'Carregando opções...',
    ru: 'Загрузка вариантов...',
    ja: '選択肢を読み込み中...',
    ko: '선택지 로딩 중...',
    zh: '正在加载选择...'
  },
  // Death Screen
  'death.title': {
    en: 'Game Over',
    fr: 'Fin de partie',
    es: 'Fin del juego',
    de: 'Spiel beendet',
    it: 'Fine del gioco',
    pt: 'Fim de jogo',
    ru: 'Игра окончена',
    ja: 'ゲームオーバー',
    ko: '게임 오버',
    zh: '游戏结束'
  },
  'death.message': {
    en: 'Your adventure has come to an end.',
    fr: 'Votre aventure s\'est terminée.',
    es: 'Tu aventura ha llegado a su fin.',
    de: 'Ihr Abenteuer ist zu Ende.',
    it: 'La tua avventura è giunta al termine.',
    pt: 'Sua aventura chegou ao fim.',
    ru: 'Ваше приключение подошло к концу.',
    ja: 'あなたの冒険は終わりました。',
    ko: '당신의 모험이 끝났습니다.',
    zh: '您的冒险已经结束。'
  },
  'death.playAgain': {
    en: 'Play Again',
    fr: 'Rejouer',
    es: 'Jugar de nuevo',
    de: 'Nochmal spielen',
    it: 'Gioca di nuovo',
    pt: 'Jogar novamente',
    ru: 'Играть снова',
    ja: 'もう一度プレイ',
    ko: '다시 플레이',
    zh: '再次游戏'
  },
  // About Section
  'about.title': {
    en: 'About',
    fr: 'À propos',
    es: 'Acerca de',
    de: 'Über',
    it: 'Informazioni',
    pt: 'Sobre',
    ru: 'О программе',
    ja: 'について',
    ko: '정보',
    zh: '关于'
  },
  'about.gameTitle': {
    en: 'Choose Your Adventure',
    fr: 'Choisissez votre aventure',
    es: 'Elige tu aventura',
    de: 'Wählen Sie Ihr Abenteuer',
    it: 'Scegli la tua avventura',
    pt: 'Escolha sua aventura',
    ru: 'Выберите ваше приключение',
    ja: 'あなたの冒険を選んでください',
    ko: '당신의 모험을 선택하세요',
    zh: '选择您的冒险'
  },
  'about.description': {
    en: 'An interactive text-based adventure game where your choices shape the story. Explore different universes, create unique characters, and embark on thrilling adventures.',
    fr: 'Un jeu d\'aventure textuel interactif où vos choix façonnent l\'histoire. Explorez différents univers, créez des personnages uniques et embarquez dans des aventures palpitantes.',
    es: 'Un juego de aventura interactivo basado en texto donde tus decisiones dan forma a la historia. Explora diferentes universos, crea personajes únicos y embárcate en aventuras emocionantes.',
    de: 'Ein interaktives textbasiertes Abenteuerspiel, bei dem Ihre Entscheidungen die Geschichte prägen. Erkunden Sie verschiedene Universen, erstellen Sie einzigartige Charaktere und begeben Sie sich auf aufregende Abenteuer.',
    it: 'Un gioco di avventura interattivo basato su testo dove le tue scelte plasmano la storia. Esplora diversi universi, crea personaggi unici e intraprendi avventure emozionanti.',
    pt: 'Um jogo de aventura interativo baseado em texto onde suas escolhas moldam a história. Explore diferentes universos, crie personagens únicos e embarque em aventuras emocionantes.',
    ru: 'Интерактивная текстовая приключенческая игра, где ваши выборы формируют историю. Исследуйте разные миры, создавайте уникальных персонажей и отправляйтесь в захватывающие приключения.',
    ja: 'あなたの選択が物語を形作るインタラクティブなテキストベースのアドベンチャーゲーム。さまざまな世界を探索し、ユニークなキャラクターを作成し、スリリングな冒険に出かけましょう。',
    ko: '당신의 선택이 이야기를 만들어가는 인터랙티브 텍스트 기반 어드벤처 게임입니다. 다양한 세계를 탐험하고, 독특한 캐릭터를 만들고, 스릴 넘치는 모험을 떠나보세요.',
    zh: '一个互动的基于文本的冒险游戏，您的选择塑造故事。探索不同的世界，创造独特的角色，踏上激动人心的冒险之旅。'
  },
  'about.features.title': {
    en: 'Features',
    fr: 'Fonctionnalités',
    es: 'Características',
    de: 'Funktionen',
    it: 'Caratteristiche',
    pt: 'Recursos',
    ru: 'Особенности',
    ja: '機能',
    ko: '기능',
    zh: '特色'
  },
  'about.features.multiverse': {
    en: 'Multiple Universes: Fantasy, Sci-Fi, Horror, and Mystery',
    fr: 'Univers multiples : Fantastique, Science-Fiction, Horreur et Mystère',
    es: 'Múltiples Universos: Fantasía, Ciencia Ficción, Terror y Misterio',
    de: 'Mehrere Universen: Fantasy, Science-Fiction, Horror und Mystery',
    it: 'Universi multipli: Fantasy, Fantascienza, Horror e Mistero',
    pt: 'Múltiplos Universos: Fantasia, Ficção Científica, Terror e Mistério',
    ru: 'Множественные миры: Фэнтези, Научная фантастика, Ужасы и Детектив',
    ja: '複数の世界：ファンタジー、SF、ホラー、ミステリー',
    ko: '다중 세계: 판타지, SF, 호러, 미스터리',
    zh: '多重世界：奇幻、科幻、恐怖和悬疑'
  },
  'about.features.multilingual': {
    en: 'Multilingual Support: 10 languages available',
    fr: 'Support multilingue : 10 langues disponibles',
    es: 'Soporte multiidioma: 10 idiomas disponibles',
    de: 'Mehrsprachige Unterstützung: 10 Sprachen verfügbar',
    it: 'Supporto multilingue: 10 lingue disponibili',
    pt: 'Suporte multilíngue: 10 idiomas disponíveis',
    ru: 'Многоязычная поддержка: доступно 10 языков',
    ja: '多言語サポート：10言語対応',
    ko: '다국어 지원: 10개 언어 지원',
    zh: '多语言支持：支持10种语言'
  },
  'about.features.dynamic': {
    en: 'Dynamic Storytelling: AI-powered narrative generation',
    fr: 'Narration dynamique : Génération narrative alimentée par l\'IA',
    es: 'Narrativa dinámica: Generación narrativa impulsada por IA',
    de: 'Dynamisches Storytelling: KI-gestützte Narrativgenerierung',
    it: 'Narrazione dinamica: Generazione narrativa alimentata dall\'IA',
    pt: 'Narrativa dinâmica: Geração narrativa alimentada por IA',
    ru: 'Динамическое повествование: генерация сюжета с помощью ИИ',
    ja: 'ダイナミックストーリーテリング：AI駆動のナラティブ生成',
    ko: '동적 스토리텔링: AI 기반 내러티브 생성',
    zh: '动态叙事：AI驱动的叙事生成'
  },
  'about.features.choices': {
    en: 'Meaningful Choices: Every decision impacts your story',
    fr: 'Choix significatifs : Chaque décision impacte votre histoire',
    es: 'Decisiones significativas: Cada decisión impacta tu historia',
    de: 'Bedeutungsvolle Entscheidungen: Jede Entscheidung beeinflusst Ihre Geschichte',
    it: 'Scelte significative: Ogni decisione influenza la tua storia',
    pt: 'Escolhas significativas: Cada decisão impacta sua história',
    ru: 'Значимые выборы: каждое решение влияет на вашу историю',
    ja: '意味のある選択：すべての決定があなたの物語に影響します',
    ko: '의미 있는 선택: 모든 결정이 당신의 이야기에 영향을 미칩니다',
    zh: '有意义的选择：每个决定都会影响您的故事'
  },
  'about.howToPlay.title': {
    en: 'How to Play',
    fr: 'Comment jouer',
    es: 'Cómo jugar',
    de: 'Wie man spielt',
    it: 'Come giocare',
    pt: 'Como jogar',
    ru: 'Как играть',
    ja: '遊び方',
    ko: '게임 방법',
    zh: '如何游戏'
  },
  'about.howToPlay.step1': {
    en: '1. Choose your preferred language',
    fr: '1. Choisissez votre langue préférée',
    es: '1. Elige tu idioma preferido',
    de: '1. Wählen Sie Ihre bevorzugte Sprache',
    it: '1. Scegli la tua lingua preferita',
    pt: '1. Escolha seu idioma preferido',
    ru: '1. Выберите предпочитаемый язык',
    ja: '1. 好みの言語を選択してください',
    ko: '1. 선호하는 언어를 선택하세요',
    zh: '1. 选择您的首选语言'
  },
  'about.howToPlay.step2': {
    en: '2. Select a universe that appeals to you',
    fr: '2. Sélectionnez un univers qui vous plaît',
    es: '2. Selecciona un universo que te atraiga',
    de: '2. Wählen Sie ein Universum, das Sie anspricht',
    it: '2. Seleziona un universo che ti attrae',
    pt: '2. Selecione um universo que lhe agrade',
    ru: '2. Выберите мир, который вам нравится',
    ja: '2. 魅力的な世界を選択してください',
    ko: '2. 마음에 드는 세계를 선택하세요',
    zh: '2. 选择一个吸引您的世界'
  },
  'about.howToPlay.step3': {
    en: '3. Create your character with a unique name',
    fr: '3. Créez votre personnage avec un nom unique',
    es: '3. Crea tu personaje con un nombre único',
    de: '3. Erstellen Sie Ihren Charakter mit einem einzigartigen Namen',
    it: '3. Crea il tuo personaggio con un nome unico',
    pt: '3. Crie seu personagem com um nome único',
    ru: '3. Создайте своего персонажа с уникальным именем',
    ja: '3. ユニークな名前でキャラクターを作成してください',
    ko: '3. 독특한 이름으로 캐릭터를 만드세요',
    zh: '3. 用独特的名字创造您的角色'
  },
  'about.howToPlay.step4': {
    en: '4. Choose your adventure type and begin your journey',
    fr: '4. Choisissez votre type d\'aventure et commencez votre voyage',
    es: '4. Elige tu tipo de aventura y comienza tu viaje',
    de: '4. Wählen Sie Ihren Abenteuertyp und beginnen Sie Ihre Reise',
    it: '4. Scegli il tuo tipo di avventura e inizia il tuo viaggio',
    pt: '4. Escolha seu tipo de aventura e comece sua jornada',
    ru: '4. Выберите тип приключения и начните свое путешествие',
    ja: '4. 冒険のタイプを選択して旅を始めてください',
    ko: '4. 모험 유형을 선택하고 여행을 시작하세요',
    zh: '4. 选择您的冒险类型并开始您的旅程'
  },
  'about.version': {
    en: 'Version 1.0.0',
    fr: 'Version 1.0.0',
    es: 'Versión 1.0.0',
    de: 'Version 1.0.0',
    it: 'Versione 1.0.0',
    pt: 'Versão 1.0.0',
    ru: 'Версия 1.0.0',
    ja: 'バージョン 1.0.0',
    ko: '버전 1.0.0',
    zh: '版本 1.0.0'
  },
  'common.back': {
    en: 'Back',
    fr: 'Retour',
    es: 'Atrás',
    de: 'Zurück',
    it: 'Indietro',
    pt: 'Voltar',
    ru: 'Назад',
    ja: '戻る',
    ko: '뒤로',
    zh: '返回'
  }
};

export class TranslationService {
  static translate(key: string, language: Language): string {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation key "${key}" not found`);
      return key;
    }
    
    return translation[language] || translation.en || key;
  }
  
  static getLanguageName(language: Language): string {
    const languageNames: Record<Language, string> = {
      en: 'English',
      fr: 'Français',
      es: 'Español',
      de: 'Deutsch',
      it: 'Italiano',
      pt: 'Português',
      ru: 'Русский',
      ja: '日本語',
      ko: '한국어',
      zh: '中文'
    };
    
    return languageNames[language] || language;
  }
}

// Hook for easy use in components
export function useTranslation(language: Language) {
  return (key: string) => TranslationService.translate(key, language);
}