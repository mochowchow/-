import { CATEGORIES, CORE_ITEMS, SUB_SCENES } from '../constants';

export interface LocalSentence {
  chinese: string;
  english: string;
  audioText: string;
}

// Flatten all available sentences from the app's constants
const buildLibrary = (): LocalSentence[] => {
  const library: LocalSentence[] = [];
  const seen = new Set<string>();

  const add = (chinese: string, english: string, audioText?: string) => {
    const key = `${chinese}|${english}`;
    if (!seen.has(key)) {
      library.push({ chinese, english, audioText: audioText || english });
      seen.has(key);
      seen.add(key);
    }
  };

  // From CORE_ITEMS
  CORE_ITEMS.forEach(item => {
    item.babyMaterials.forEach(material => {
      add(material.chinese, material.english, material.audioText);
    });
  });

  // From SUB_SCENES
  SUB_SCENES.forEach(scene => {
    scene.topSentences.forEach(sentence => {
      add(sentence.chinese, sentence.english, sentence.audioText);
    });
  });

  return library;
};

export const LOCAL_SENTENCE_LIBRARY = buildLibrary();

/**
 * Simple string similarity check
 * Returns a score between 0 and 1
 */
export const calculateSimilarity = (str1: string, str2: string): number => {
  const s1 = str1.toLowerCase().replace(/[^\u4e00-\u9fa5a-z0-9]/g, '');
  const s2 = str2.toLowerCase().replace(/[^\u4e00-\u9fa5a-z0-9]/g, '');

  if (s1 === s2) return 1.0;
  if (s1.includes(s2) || s2.includes(s1)) {
    const longer = Math.max(s1.length, s2.length);
    const shorter = Math.min(s1.length, s2.length);
    return shorter / longer;
  }

  // Very basic overlap check
  let overlap = 0;
  const chars1 = new Set(s1.split(''));
  const chars2 = s2.split('');
  chars2.forEach(c => {
    if (chars1.has(c)) overlap++;
  });

  return overlap / Math.max(s1.length, s2.length);
};

/**
 * Find the best match in the local library
 */
export const findLocalMatch = (text: string, threshold: number = 0.85): LocalSentence | null => {
  let bestMatch: LocalSentence | null = null;
  let highestScore = 0;

  for (const item of LOCAL_SENTENCE_LIBRARY) {
    const score = calculateSimilarity(text, item.chinese);
    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
    if (highestScore === 1.0) break;
  }

  return highestScore >= threshold ? bestMatch : null;
};

/**
 * Get related suggestions from the local library
 */
export const getLocalSuggestions = (text: string, count: number = 3): LocalSentence[] => {
  // Simple logic: find sentences that share keywords or are in the same general context
  // For now, let's just return a few random ones that aren't the current one, 
  // or ideally ones that are "related" by some simple tag matching if we had tags.
  
  // Real implementation would be smarter, but let's start with something functional
  const shuffled = [...LOCAL_SENTENCE_LIBRARY].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
