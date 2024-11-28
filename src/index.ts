import download from './download/download';
import convert from './convert/convert';
import process from './process/process';
import csv from './csv/csv';
import chalk = require('chalk');

const main = async (): Promise<void> => {
  await download();
  await convert();
  await process();
  await csv();

  console.log(chalk.bgGreen('Completed'));
};

void main();
