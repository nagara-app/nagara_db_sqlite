// Converts the tanos_vocab.csv file into JSON formated file

import { parse } from 'csv-parse';

import { Constants } from '../../constants';
import { readFileFromInput, writeFileToInputConverted } from '../../utils';

export default async () => {

    const file = await readFileFromInput(Constants.fileNames.tanosVocab);

    console.log("Parsing file …");
    parse(file, { columns: true, trim: true, delimiter: Constants.csvDelimiter }, async (err, rows) => {
        if (err) throw err;

        await writeFileToInputConverted(Constants.fileNames.tanosVocabConverted, rows);
    });
}