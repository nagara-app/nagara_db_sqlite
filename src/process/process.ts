import chalk from 'chalk';

import { writeJsonFile } from 'src/utils';
import { fileManager } from 'src/process/fileManager';
import createKanjis from 'src/process/kanji/createKanjis';
import createWords from 'src/process/word/createWords';
import createRadicals from 'src/process/radical/createRadicals';

import { KEYWORDS } from 'src/keywords';
import type { TKDB } from 'src/type/tkdb';

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
