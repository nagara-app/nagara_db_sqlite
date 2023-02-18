import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import { convert, codeToString } from 'encoding-japanese';

import { RadKFileX, RadKFileXEntry } from './model'

const inputFilePath = join(__dirname, '..', '..', 'input/radkfilex');
const outputFilePath = join(__dirname, '..', '..', 'output/radkfilex.json');

const file = readFileSync(inputFilePath);

const convertedFile = convert(file, {
    to: 'UNICODE',
    from: 'EUCJP'
});

const encodedFile = codeToString(convertedFile);

const jsonFile: RadKFileX = {
    entries: []
}

encodedFile.split(/\r?\n/).forEach((line: string) => {
    if (line.startsWith("#")) {
        return;
    } else if (line.startsWith("$")) {
        const a = line.split(" ");
        const entry: RadKFileXEntry = {
            radical: a[1],
            stroke_count: a[2],
            kanji: []
        }

        if (a[3]) entry.code = a[3];

        jsonFile.entries.push(entry);
    } else {
        const a = jsonFile.entries.at(-1);
        if (a) a.kanji = a.kanji.concat(line.split(""));
    }
})

writeFileSync(outputFilePath, JSON.stringify(jsonFile, null, 2));