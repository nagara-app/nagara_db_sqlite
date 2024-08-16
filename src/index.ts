import chalk from 'chalk';

import download from 'src/download/download';
import convert from 'src/convert/convert';
import process from 'src/process/process';

const main = async (): Promise<void> => {
  await download();
  await convert();
  await process();

  console.log(chalk.bgGreen('Completed'));
};

void main();
