// Converts the tanos_vocab.csv file into JSON formated file

import { blue, green } from 'chalk';
import { parse } from 'csv-parse';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

import { Constants } from '../../constants';
import { handle } from '../../utils';

export default async () => {
    const log = console.log;

    log(blue(`Starting ${Constants.fileNames.tanosVocabConverted} convert`));

    const filePath = join(__dirname, '..', '..', '..', `${Constants.inputDir}/${Constants.fileNames.tanosVocab}`);
    const convertedFilePath = join(__dirname, '..', '..', '..', `${Constants.inputDir}/${Constants.inputTempDir}/${Constants.fileNames.tanosVocabConverted}`);

    log("Reading file");
    const [fileErr, file] = await handle(readFile(filePath));
    if (fileErr) throw (fileErr);

    log("Parsing file");
    parse(file, { columns: true, trim: true, delimiter: Constants.csvDelimiter }, async (err, rows) => {
        if (err) throw err;

        log("Writing file");
        await writeFile(
            convertedFilePath,
            JSON.stringify(rows, null, 2),
        ).catch((err) => {
            throw (err);
        });
        
        log(green('Finish'));
    });
}