// Converts the kradfile and kradfile2 file into JSON formated kradfilex file

import {readFile, writeFile} from 'fs/promises';
import {Kradfilex} from '../type/kradfilex';

export default async (): Promise<void> => {
  const kradfilex: Kradfilex[] = [];
  const file1 = await readFile('input/download/kradfile.txt', 'utf8');
  const file2 = await readFile('input/download/kradfile2.txt', 'utf8');

  const file = file1 + file2;

  const lines = file.split(/\r?\n/);

  for (const line of lines) {
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
  }

  const json = JSON.stringify(kradfilex, null, 2);

  await writeFile('input/converted/kradfilex.json', json);
};
