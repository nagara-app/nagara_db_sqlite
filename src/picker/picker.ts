import {TKDB} from 'tkdb-helper';
import {readJsonFile, writeJsonFile} from '../utils';

export default async (): Promise<void> => {
  const tkdb = await readJsonFile<TKDB>('output/tkdb.json');

  const radicals = tkdb.radicals;
  const kanjis = tkdb.kanjis;
  const words = tkdb.words;

  const wordsChunkSize = 100_000;

  await writeJsonFile(radicals, 'output/tkdb_radicals.json');
  await writeJsonFile(kanjis, 'output/tkdb_kanji.json');
  await writeJsonFile(words, 'output/tkdb_words.json');

  // Write words to multiple files
  const wordChunks = Math.ceil(words.length / wordsChunkSize);

  for (let i = 0; i < wordChunks; i++) {
    const chunk = words.slice(i * wordsChunkSize, (i + 1) * wordsChunkSize);
    await writeJsonFile(chunk, `output/tkdb_words_${i + 1}.json`);
  }
};
