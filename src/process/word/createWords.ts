import { Presets, SingleBar } from 'cli-progress';
import type { Options } from 'cli-progress';

import createForms from './createForms';
import createMeanings from './createMeanings';

import type { Word } from 'src/type/tkdb';
import { fileManager } from 'src/process/fileManager';

export default (): Word[] => {
  const jmdict = fileManager.getJMdict();
  const jmEntries = jmdict.entry;

  const words: Word[] = [];

  const progressBarOptions: Options = {
    hideCursor: true,
    format: '{bar} {percentage}% | {value}/{total} words',
  };
  const bar = new SingleBar(progressBarOptions, Presets.shades_classic);
  bar.start(jmEntries.length, 0);

  for (const jmEntry of jmEntries) {
    const id = jmEntry.ent_seq;
    const forms = createForms(jmEntry);
    const meanings = createMeanings(jmEntry);

    words.push({
      id,
      forms,
      meanings,
    });

    bar.increment();
  }

  bar.stop();
  return words;
};
