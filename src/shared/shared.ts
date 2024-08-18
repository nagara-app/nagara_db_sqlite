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

    delete meaning.wordClasses;
    delete meaning.dialectCategories;
    delete meaning.fieldCategories;
    delete meaning.miscCategories;

    if (currentCategories === undefined) {
      currentCategories = categories;
      currentMeanings = [meaning];
    } else if (areCategoriesEqual(currentCategories, categories)) {
      currentMeanings.push(meaning);
    } else {
      meaningsByCategories.push({ categories: currentCategories, meanings: currentMeanings });
      currentCategories = categories;
      currentMeanings = [meaning];
    }
  }

  if (currentCategories !== undefined && currentMeanings.length > 0) {
    meaningsByCategories.push({ categories: currentCategories, meanings: currentMeanings });
  }

  return meaningsByCategories;
};
