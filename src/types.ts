declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export type CategoryId = 'life' | 'play' | 'emotion' | 'explore';

export interface Category {
  id: CategoryId;
  title: string;
  chineseTitle: string;
  description: string;
  icon: string;
  color: string;
}

export interface BabyMaterial {
  level: 'L1' | 'L2' | 'L3' | 'L4';
  title: string;
  english: string;
  chinese: string;
  phonetic?: string;
  imagePrompt: string;
  audioText: string;
}

export interface ParentGuide {
  pronunciation: {
    points: string[];
  };
  tips: {
    intro: string;
    repeat: string;
    expand: string;
  };
  activities: {
    title: string;
    instruction: string;
    expansion: string;
  };
  scenarios: string[];
  resources: {
    song: string;
    book: string;
    craft?: string;
  };
}

export interface TrinityCardData {
  id: string;
  title: string;
  chineseTitle: string;
  icon: string;
  partA: BabyMaterial; // Core Word (L1)
  partB: BabyMaterial; // Action/Attribute (L2)
  partC: BabyMaterial; // Context/Sentence (L3/L4)
}

export interface SubSceneData {
  id: string;
  title: string;
  chineseTitle: string;
  icon: string;
  color: string;
  topSentences: {
    english: string;
    chinese: string;
    audioText: string;
  }[];
  coreTrinityCards: string[]; // IDs of LearningItems to be displayed as Trinity Cards
  bottomCategories: {
    label: string;
    tag: string;
  }[];
}

export interface LearningItem {
  id: string;
  categoryId: CategoryId;
  subCategory: string;
  title: string;
  chineseTitle: string;
  icon: string;
  tags: string[];
  babyMaterials: BabyMaterial[];
  parentGuide: ParentGuide;
}

export interface QuickScene {
  id: string;
  title: string;
  chineseTitle: string;
  icon: string;
  tags: string[];
  description: string;
  color: string;
}

export interface ListeningContent {
  id: string;
  type: 'rhyme' | 'story';
  title: string;
  chineseTitle: string;
  coverImage: string;
  audioText: string;
  content: string;
  chineseContent?: string;
  coreSentence?: string;
  keywords?: string[];
  interactionTips: string[];
}
