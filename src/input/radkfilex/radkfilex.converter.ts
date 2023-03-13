// Converts the radkfilex file into JSON formated file

import { codeToString, convert } from 'encoding-japanese';

import { CONSTANTS } from '../../constants';
import { readFileFromInput, writeFileToInputConverted } from '../../utils';

import type { Radkfilex } from './radkfilex.dto';

export default async (): Promise<void> => {
  const file = await readFileFromInput(CONSTANTS.fileNames.radkfilex);

  console.log('Parsing file …');

  const convertedFile = convert(file, {
    to: 'UNICODE',
    from: 'EUCJP',
  });

  const encodedFile = codeToString(convertedFile);

  const radkfilex: Radkfilex[] = [];

  encodedFile.split(/\r?\n/).forEach((line: string) => {
    if (!line.startsWith('#')) {
      if (line.startsWith('$')) {
        const a = line.split(' ');

        const radical = a[1];
        const strokecount = a[2];
        const code = a[3];

        if (radical !== undefined && strokecount !== undefined) {
          radkfilex.push({
            radical,
            strokecount,
            kanji: [],
            code,
          });
        }
      } else {
        const a = line.split('');
        const lastEntry = radkfilex.at(-1);
        if (lastEntry !== undefined) {
          lastEntry.kanji = a;
        }
      }
    }
  });

  await writeFileToInputConverted(CONSTANTS.fileNames.radkfilexConverted, radkfilex);
};
