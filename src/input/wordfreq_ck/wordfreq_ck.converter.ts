// Converts the wordfreq_ck file into JSON formated wordfreq_ck file

import { codeToString, convert } from 'encoding-japanese';

import { CONSTANTS } from '../../constants';
import { readFileFromInput, writeFileToInputConverted } from '../../utils';

import type { WordfreqCk } from './wordfreq_ck.dto';

export default async (): Promise<void> => {
  const file = await readFileFromInput(CONSTANTS.fileNames.wordfreqCk);

  console.log('Parsing file …');

  const convertedFile = convert(file, {
    to: 'UNICODE',
    from: 'EUCJP',
  });

  const encodedFile = codeToString(convertedFile);

  const wordfreqCk: WordfreqCk[] = [];

  encodedFile.split(/\r?\n/).forEach((line: string) => {
    if (!line.startsWith('#')) {
      const a = line.split('\t');

      const word = a[0];
      const pos = a[1];

      if (word !== undefined && pos !== undefined)
        wordfreqCk.push({
          word,
          pos: +pos,
        });
    }
  });

  await writeFileToInputConverted(CONSTANTS.fileNames.wordFreqCkConverted, wordfreqCk);
};
