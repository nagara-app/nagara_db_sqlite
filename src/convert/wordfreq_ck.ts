import { readFile, writeFile } from 'fs/promises';

import type { Wordfreq } from 'src/type/wordfreq_ck';

export default async (): Promise<void> => {
  const wordfreqCk: Wordfreq[] = [];
  const file = await readFile('input/download/wordfreq_ck.txt', 'utf8');

  const lines = file.split(/\r?\n/);

  for (const line of lines) {
    if (line.startsWith('#')) continue;

    const values = line.split('\t');

    const word = values[0];
    const pos = values[1];

    if (word === undefined || pos === undefined) continue;

    wordfreqCk.push({ word, pos: +pos });
  }

  const json = JSON.stringify(wordfreqCk, null, 2);

  await writeFile('input/converted/wordfreq_ck.json', json);
};
