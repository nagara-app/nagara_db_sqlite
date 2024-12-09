import {setIncludesExactRecordKeys, writeJsonFile} from '../utils';
import {fileManager} from '../process/fileManager';
import createKanjis from '../process/kanji/createKanjis';
import createWords from '../process/word/createWords';
import createRadicals from '../process/radical/createRadicals';

import {KEYWORDS} from '../keywords';
import type {TKDB, Word} from 'tkdb-helper';
import {green} from 'chalk';
import {setManager} from './setManager';

export default async (): Promise<void> => {
  const dateOfCreation = new Date();
  const dateInSeconds = Math.round(dateOfCreation.getTime() / 1000);
  const version = dateInSeconds.toString();

  console.log('Processing files …');

  await fileManager.loadFiles();

  const keywords = KEYWORDS;
  const radicals = createRadicals();
  const kanjis = createKanjis();
  const words: Word[] = createWords();

  const tkdb: TKDB = {
    dateOfCreation,
    version,
    keywords,
    radicals,
    kanjis,
    words,
  };

  compareKeywords();

  await writeJsonFile(tkdb, 'output/tkdb.json');

  console.log(green('All files processed'));
};

const compareKeywords = (): void => {
  setIncludesExactRecordKeys(
    setManager.wordFormInfo,
    KEYWORDS.wordFormInfo,
    'Word Form Info'
  );

  setIncludesExactRecordKeys(
    setManager.wordMeaningPos,
    KEYWORDS.wordMeaningPos,
    'Word Meaning POS'
  );

  setIncludesExactRecordKeys(
    setManager.wordMeaningField,
    KEYWORDS.wordMeaningField,
    'Word Meaning Field'
  );

  setIncludesExactRecordKeys(
    setManager.wordMeaningMisc,
    KEYWORDS.wordMeaningMisc,
    'Word Meaning Misc'
  );

  setIncludesExactRecordKeys(
    setManager.wordMeaningDial,
    KEYWORDS.wordMeaningDial,
    'Word Meaning Dial'
  );

  setIncludesExactRecordKeys(
    setManager.wordTranslationType,
    KEYWORDS.wordTranslationType,
    'Word Translation Type'
  );
};
