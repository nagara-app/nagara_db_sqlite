import type { WordMeaning } from 'src/type/tkdb';

export interface MeaningsByCategories {
  categories: string[];
  meanings: WordMeaning[];
}

const areCategoriesEqual = (categories1: string[], categories2: string[]): boolean => {
  if (categories1.length !== categories2.length) return false;
  return categories1.every((category, index) => category === categories2[index]);
};

export const sortMeaningsByCategories = (meanings: WordMeaning[]): MeaningsByCategories[] => {
  const meaningsByCategories: MeaningsByCategories[] = [];

  let currentCategories: string[] | undefined;
  let currentMeanings: WordMeaning[] = [];

  for (const meaning of meanings) {
    const categories = [
      ...(meaning.wordClasses ?? []),
      ...(meaning.dialectCategories ?? []),
      ...(meaning.fieldCategories ?? []),
      ...(meaning.miscCategories ?? []),
    ];

    const meaningEntry: WordMeaning = {};
    if (meaning.translations !== undefined) {
      meaningEntry.translations = meaning.translations;
    }
    if (meaning.informations !== undefined) {
      meaningEntry.informations = meaning.informations;
    }
    if (meaning.languageSources !== undefined) {
      meaningEntry.languageSources = meaning.languageSources;
    }

    if (currentCategories === undefined) {
      currentCategories = categories;
      currentMeanings = [meaningEntry];
    } else if (areCategoriesEqual(currentCategories, categories)) {
      currentMeanings.push(meaningEntry);
    } else {
      meaningsByCategories.push({ categories: currentCategories, meanings: currentMeanings });
      currentCategories = categories;
      currentMeanings = [meaningEntry];
    }
  }

  if (currentCategories !== undefined && currentMeanings.length > 0) {
    meaningsByCategories.push({ categories: currentCategories, meanings: currentMeanings });
  }

  return meaningsByCategories;
};
