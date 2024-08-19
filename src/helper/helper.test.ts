import type { WordForm, WordMeaning } from 'src/type/tkdb';
import type { FormMeanings } from './helper';
import { assignMeaningsToForm, sortMeaningsByCategories } from './helper';

test('Sorting meanings by category', () => {
  const meanings: WordMeaning[] = [
    {
      translations: ['tree', 'maple'],
      informations: ['a tree so green'],
      fieldCategories: ['nature'],
      wordClasses: ['Noun'],
      miscCategories: ['food'],
    },
    {
      translations: ['oak'],
      fieldCategories: ['nature'],
      wordClasses: ['Noun'],
      miscCategories: ['food'],
    },
    {
      translations: ['trii'],
      dialectCategories: ['Hakata-ben'],
      fieldCategories: ['nature'],
      wordClasses: ['Noun'],
      miscCategories: ['food'],
      languageSources: [{ language: 'eng', description: 'Imported' }],
    },
  ];

  const expected = [
    {
      categories: ['Noun', 'nature', 'food'],
      meanings: [{ translations: ['tree', 'maple'], informations: ['a tree so green'] }, { translations: ['oak'] }],
    },
    {
      categories: ['Noun', 'Hakata-ben', 'nature', 'food'],
      meanings: [{ translations: ['trii'], languageSources: [{ language: 'eng', description: 'Imported' }] }],
    },
  ];

  const result = sortMeaningsByCategories(meanings);

  expect(result).toEqual(expected);
});

describe('Assign meanings to form', () => {
  test('Assign meanings to form without restriction', () => {
    const form: WordForm = {
      script: 'りんご',
    };
    const meanings: WordMeaning[] = [
      { translations: ['Apple'] },
      { translations: ['Apfel'], formRestricions: ['林檎'] },
    ];

    const expected: FormMeanings = { form: { script: 'りんご' }, meanings: [{ translations: ['Apple'] }] };

    const result = assignMeaningsToForm(form, meanings);

    expect(result).toEqual(expected);
  });

  test('Assign meanings to form with restriction', () => {
    const form: WordForm = {
      script: '林檎',
    };
    const meanings: WordMeaning[] = [
      { translations: ['Apple'] },
      { translations: ['Apfel'], formRestricions: ['林檎'] },
    ];

    const expected: FormMeanings = {
      form: { script: '林檎' },
      meanings: [{ translations: ['Apple'] }, { translations: ['Apfel'], formRestricions: ['林檎'] }],
    };

    const result = assignMeaningsToForm(form, meanings);

    expect(result).toEqual(expected);
  });
});
