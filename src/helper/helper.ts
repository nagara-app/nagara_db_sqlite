import type { Word, WordForm, WordMeaning } from 'src/type/tkdb';

export interface WordRefubrished extends Word {
  formsCategoriesMeanings: FormCategoriesMeanings[];
}

export interface FormCategoriesMeanings {
  form: WordForm;
  categoriesMeanings: CategoriesMeanings[];
}

export interface CategoriesMeanings {
  categories?: string[] | undefined;
  meanings: WordMeaning[];
}

export interface FormMeanings {
  form: WordForm;
  meanings: WordMeaning[];
}

const areCategoriesEqual = (categories1: string[], categories2: string[]): boolean => {
  if (categories1.length !== categories2.length) return false;
  return categories1.every((category, index) => category === categories2[index]);
};

export const sortMeaningsByCategories = (meanings: WordMeaning[]): CategoriesMeanings[] => {
  const categoriesMeanings: CategoriesMeanings[] = [];

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
      categoriesMeanings.push({ categories: currentCategories, meanings: currentMeanings });
      currentCategories = categories;
      currentMeanings = [meaning];
    }
  }

  if (currentCategories !== undefined && currentMeanings.length > 0) {
    categoriesMeanings.push({ categories: currentCategories, meanings: currentMeanings });
  }

  return categoriesMeanings;
};

export const assignMeaningsToForm = (form: WordForm, meanings: WordMeaning[]): FormMeanings => {
  const filteredMeanings = meanings.filter((meaning) => {
    const includesRestriction = meaning.formRestricions?.includes(form.script) ?? true;
    return includesRestriction;
  });

  return {
    form,
    meanings: filteredMeanings,
  };
};

export const createRefubrishedWord = (word: Word): WordRefubrished => {
  const formMeanings = word.forms.map((form) => {
    return assignMeaningsToForm(form, word.meanings);
  });

  const formsCategoriesMeanings: FormCategoriesMeanings[] = formMeanings.map((formMeaning) => {
    const categoriesMeanings = sortMeaningsByCategories(formMeaning.meanings);

    return {
      form: formMeaning.form,
      categoriesMeanings,
    };
  });

  return {
    ...word,
    formsCategoriesMeanings,
  };
};
