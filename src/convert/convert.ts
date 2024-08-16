import chalk from 'chalk';

import jmdict from './jmdict';
import kanjidic2 from './kanjidic2';
import kanjivg from './kanjivg';
import wordfreq from './wordfreq_ck';
import kradfilex from './kradfilex';
import radkfilex from './radkfilex';

export default async (): Promise<void> => {
  const convertPromises = [jmdict(), kanjidic2(), radkfilex(), kradfilex(), wordfreq(), kanjivg()];

  console.log('Converting files … ');

  await Promise.all(convertPromises);

  console.log(chalk.green('All files converted'));
};
