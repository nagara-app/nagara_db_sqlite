import { gunzip } from 'zlib';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import { ParserOptions, parseStringPromise } from 'xml2js';

const inputFilePath = join(__dirname, '..', '..', 'input/kanjidic2.xml.gz');
const outputFilePath = join(__dirname, '..', '..', 'output/kanjidic2.json');

function nameToLowerCase(name: string): string {
    return name.toLowerCase();
}

const parserOptions: ParserOptions = {
    strict: false,
    mergeAttrs: true,
    normalizeTags: true,
    charkey: 'value',
    explicitRoot: false,
    explicitArray: false,
    attrNameProcessors: [nameToLowerCase],
}

const file = readFileSync(inputFilePath);

gunzip(file, (err, data) => {

    if (err) {
        throw err;
    }

    parseStringPromise(data, parserOptions).then(result => {
        writeFileSync(outputFilePath, JSON.stringify(result, null, 2));
    }).catch(err => {
        throw err;
    });
});