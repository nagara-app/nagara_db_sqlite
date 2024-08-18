import type { WordMeaning } from 'src/type/tkdb';
import { sortMeaningsByCategories } from './shared';

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
