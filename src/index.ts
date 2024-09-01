import download from './download/download';
import convert from './convert/convert';
import process from './process/process';
import chalk = require('chalk');

const main = async (): Promise<void> => {
  await download();
  await convert();
  await process();

  console.log(chalk.bgGreen('Completed'));
};

void main();
