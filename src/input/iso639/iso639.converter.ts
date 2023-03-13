// Converts the ISO-639-2_utf-8.txt file into JSON formated file

import { parse } from 'csv-parse';

import { CONSTANTS } from '../../constants';
import { readFileFromInput, writeFileToInputConverted } from '../../utils';

export default async (): Promise<void> => {
  const file = await readFileFromInput(CONSTANTS.fileNames.iso639);

  console.log('Parsing file …');

  const parsePromise = new Promise<Buffer>((resolve, reject) => {
    parse(
      file.toString().trim(),
      {
        columns: CONSTANTS.iso639Headers,
        delimiter: CONSTANTS.iso639Delimiter,
      },
      (err, rows) => {
        if (err !== undefined) {
          reject(err);
        }
        resolve(rows);
      },
    );
  });

  const result = await parsePromise;

  await writeFileToInputConverted(CONSTANTS.fileNames.iso639Converted, result);
};
