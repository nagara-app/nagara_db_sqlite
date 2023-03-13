// Converts the tanos_kanji.csv file into JSON formated file

import { parse } from 'csv-parse';

import { CONSTANTS } from '../../constants';
import { readFileFromInput, writeFileToInputConverted } from '../../utils';

export default async (): Promise<void> => {
  const file = await readFileFromInput(CONSTANTS.fileNames.tanosKanji);

  console.log('Parsing file …');

  const parsePromise = new Promise<Buffer>((resolve, reject) => {
    parse(file, { columns: true, trim: true, delimiter: CONSTANTS.csvDelimiter }, (err, rows) => {
      if (err !== undefined) {
        reject(err);
      }
      resolve(rows);
    });
  });

  const result = await parsePromise;

  await writeFileToInputConverted(CONSTANTS.fileNames.tanosKanjiConverted, result);
};
