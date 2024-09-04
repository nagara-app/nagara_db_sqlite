import {Presets, SingleBar} from 'cli-progress';
import {fileManager} from '../fileManager';

import type {Options} from 'cli-progress';
import {Radical} from 'tkdb-helper';

export default (): Radical[] => {
  const tkdbRadicals = fileManager.getTKDBradicals();
  const radicals: Radical[] = [];

  const progressBarOptions: Options = {
    hideCursor: true,
    format: '{bar} {percentage}% | {value}/{total} radical',
  };
  const bar = new SingleBar(progressBarOptions, Presets.shades_classic);
  bar.start(tkdbRadicals.length, 0);

  for (const tkdbRadical of tkdbRadicals) {
    // Remove kradical from output
    radicals.push({...tkdbRadical, kradical: undefined});
    bar.increment();
  }

  bar.stop();

  return radicals;
};
