import { readJsonFile, writeJsonFile } from 'src/utils';

import type { TKDB } from 'src/type/tkdb';

export default async (): Promise<void> => {
  const tkdb = await readJsonFile<TKDB>('output/tkdb.json');

  const radicals = tkdb.radicals;
  const kanjis = tkdb.kanjis;
  const words = tkdb.words;

  await writeJsonFile(radicals, 'output/tkdb_radicals.json');
  await writeJsonFile(kanjis, 'output/tkdb_kanji.json');
  await writeJsonFile(words, 'output/tkdb_words.json');
};
