import {Presets, SingleBar} from 'cli-progress';
import type {Options} from 'cli-progress';

import {fileManager} from '../../process/fileManager';
import createForms from './createForms';
import createMeanings from './createMeanings';

import type {JLPT, Word, WordForm} from '../../type/tkdb';

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

    const common = forms.some(form => form.common) ? true : undefined;
    const jlpt = extractJLPT(forms);
    const frequency = extractFrequency(forms);

    words.push({
      id,
      common,
      jlpt,
      frequency,
      forms,
      meanings,
    });

    bar.increment();
  }

  bar.stop();
  return words;
};

const extractJLPT = (forms: WordForm[]): JLPT | undefined => {
  const formsWithJLPT = forms.filter(form => form.jlpt !== undefined);

  if (formsWithJLPT[0] === undefined) {
    return undefined;
  }

  const formWithLowestJLPT = formsWithJLPT.reduce((prev, curr) => {
    if (prev.jlpt === undefined) return curr;
    if (curr.jlpt === undefined) return prev;

    const prevNumber = parseInt(prev.jlpt.substring(1), 10);
    const currNumber = parseInt(curr.jlpt.substring(1), 10);

    return currNumber > prevNumber ? curr : prev;
  });

  const jlpt = formWithLowestJLPT.jlpt;
  return jlpt;
};

const extractFrequency = (forms: WordForm[]): number | undefined => {
  const formsWithFrequency = forms.filter(form => form.frequency !== undefined);

  if (formsWithFrequency[0] === undefined) {
    return undefined;
  }

  const formWithMinFrequency = formsWithFrequency.reduce((prev, curr) => {
    if (prev.frequency === undefined) return curr;
    if (curr.frequency === undefined) return prev;

    return curr.frequency < prev.frequency ? curr : prev;
  });

  const frequency = formWithMinFrequency.frequency;
  return frequency;
};
