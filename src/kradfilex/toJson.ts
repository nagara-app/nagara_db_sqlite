import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import { convert, codeToString } from 'encoding-japanese';

import { KRadFileX } from './model'

const inputFilePath1 = join(__dirname, '..', '..', 'input/kradfile');
const inputFilePath2 = join(__dirname, '..', '..', 'input/kradfile2');
const outputFilePath = join(__dirname, '..', '..', 'output/kradfilex.json');

const file1 = readFileSync(inputFilePath1);
const file2 = readFileSync(inputFilePath2);

const file = Buffer.concat([file1, file2]);

const convertedFile = convert(file, {
    to: 'UNICODE',
    from: 'EUCJP'
});

const encodedFile = codeToString(convertedFile);

const jsonFile: KRadFileX = {
    entries: []
}

encodedFile.split(/\r?\n/).forEach((line: string) => {

    if (line.startsWith("#")) return;
    const a = line.split(" : ");

    if (a.length < 2) return;
    const literal = a[0];
    const parts = a[1].split(" ");

    jsonFile.entries.push({
        literal: literal,
        parts: parts
    });
});

writeFileSync(outputFilePath, JSON.stringify(jsonFile, null, 2));