// Converts the kradfile and kradfile2 file into JSON formated kradfilex file

import { codeToString, convert } from 'encoding-japanese';

import { Constants } from '../../constants';
import { readFileFromInput, writeFileToInputConverted } from '../../utils';

import type { Kradfilex } from './kradfilex.dto';

export default async (): Promise<void> => {
  const file1 = await readFileFromInput(Constants.fileNames.kradfile);
  const file2 = await readFileFromInput(Constants.fileNames.kradfile2);

  const file = Buffer.concat([file1, file2]);

  console.log('Parsing file …');

  const convertedFile = convert(file, {
    to: 'UNICODE',
    from: 'EUCJP',
  });

  const encodedFile = codeToString(convertedFile);

  const kradfilex: Kradfilex[] = [];

  encodedFile.split(/\r?\n/).forEach((line: string) => {
    if (!line.startsWith('#')) {
      const a = line.split(' : ');

      const kanji = a[0];
      const radical = a[1];

      if (kanji !== undefined && radical !== undefined) {
        const radicals = radical.split(' ');
        kradfilex.push({
          kanji,
          radicals,
        });
      }
    }
  });

  await writeFileToInputConverted(Constants.fileNames.kradfilexConverted, kradfilex);
};
