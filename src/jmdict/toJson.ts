import { gunzipSync } from 'zlib';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import { ParserOptions, parseStringPromise } from 'xml2js';

const inputFilePath = join(__dirname, '..', '..', 'input/JMdict.gz');
const outputFilePath = join(__dirname, '..', '..', 'output/jmdict.json');

function renameAttrName(name: string) {
    switch (name) {
        case 'xml:lang':
            name = 'lang'
            break;
        default:
            break;
    }
    return name;
}

function nameToLowerCase(name: string): string {
    return name.toLowerCase();
}

function renameValue(value: string): string {
    return value.replace(/^&|;$/gi, '');
}

const parserOptions: ParserOptions = {
    strict: false,
    mergeAttrs: true,
    normalizeTags: true,
    charkey: 'value',
    explicitRoot: false,
    explicitArray: false,
    attrNameProcessors: [nameToLowerCase, renameAttrName],
    valueProcessors: [renameValue],
}

const file = readFileSync(inputFilePath);
const unzippedFile = gunzipSync(file);

parseStringPromise(unzippedFile, parserOptions).then(result => {
    writeFileSync(outputFilePath, JSON.stringify(result, null, 2));
}).catch(err => {
    throw err;
});