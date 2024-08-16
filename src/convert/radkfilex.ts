// Converts the kradfile and kradfile2 file into JSON formated kradfilex file

import { readFile, writeFile } from 'fs/promises';

import type { Radkfilex } from 'src/type/radkfilex';

export default async (): Promise<void> => {
  const radkfilex: Radkfilex[] = [];
  const file = await readFile('input/download/radkfilex.txt', 'utf8');

  const lines = file.split(/\r?\n/);

  for (const line of lines) {
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
  }

  const json = JSON.stringify(radkfilex, null, 2);

  await writeFile('input/converted/radkfilex.json', json);
};
