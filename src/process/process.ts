import {writeJsonFile} from '../utils';
import {fileManager} from '../process/fileManager';
import createKanjis from '../process/kanji/createKanjis';
import createWords from '../process/word/createWords';
import createRadicals from '../process/radical/createRadicals';

import {KEYWORDS} from '../keywords';
import type {TKDB} from '../type/tkdb';
import chalk = require('chalk');

export default async (): Promise<void> => {
  const dateOfCreation = new Date();
  const dateInSeconds = Math.round(dateOfCreation.getTime() / 1000);
  const version = dateInSeconds.toString();

  console.log('Processing files …');

  await fileManager.loadFiles();

  const keywords = KEYWORDS;
  const radicals = createRadicals();
  const kanjis = createKanjis();
  const words = createWords();

  const tkdb: TKDB = {
    dateOfCreation,
    version,
    keywords,
    radicals,
    kanjis,
    words,
  };

  await writeJsonFile(tkdb, 'output/tkdb.json');

  console.log(chalk.green('All files processed'));
};
