import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import { convert, codeToString } from 'encoding-japanese';

import { TanosKanji } from './model'

const inputFileN1Path = join(__dirname, '..', '..', 'input/n1.txt');
const inputFileN2Path = join(__dirname, '..', '..', 'input/n2.txt');
const inputFileN3Path = join(__dirname, '..', '..', 'input/n3.txt');
const inputFileN4Path = join(__dirname, '..', '..', 'input/n4.txt');
const inputFileN5Path = join(__dirname, '..', '..', 'input/n5.txt');

const outputFilePath = join(__dirname, '..', '..', 'output/tanosKanji.json');

const fileN1 = readFileSync(inputFileN1Path);
const fileN2 = readFileSync(inputFileN2Path);
const fileN3 = readFileSync(inputFileN3Path);
const fileN4 = readFileSync(inputFileN4Path);
const fileN5 = readFileSync(inputFileN5Path);

const convertedFileN1 = convert(fileN1, {
    to: 'UNICODE',
});

const convertedFileN2 = convert(fileN2, {
    to: 'UNICODE',
});

const convertedFileN3 = convert(fileN3, {
    to: 'UNICODE',
});

const convertedFileN4 = convert(fileN4, {
    to: 'UNICODE',
});

const convertedFileN5 = convert(fileN5, {
    to: 'UNICODE',
});


const encodedFileN1 = codeToString(convertedFileN1);
const encodedFileN2 = codeToString(convertedFileN2);
const encodedFileN3 = codeToString(convertedFileN3);
const encodedFileN4 = codeToString(convertedFileN4);
const encodedFileN5 = codeToString(convertedFileN5);


const jsonFile: TanosKanji[] = [];

encodedFileN1.split(/\n/).forEach((line: string) => {
    jsonFile.push(
        {
            kanji: line,
            level: '1',
        }
    );
});

encodedFileN2.split(/\n/).forEach((line: string) => {
    jsonFile.push(
        {
            kanji: line,
            level: '2',
        }
    );
});

encodedFileN3.split(/\n/).forEach((line: string) => {
    jsonFile.push(
        {
            kanji: line,
            level: '3',
        }
    );
});

encodedFileN4.split(/\n/).forEach((line: string) => {
    jsonFile.push(
        {
            kanji: line,
            level: '4',
        }
    );
});

encodedFileN5.split(/\n/).forEach((line: string) => {
    jsonFile.push(
        {
            kanji: line,
            level: '5',
        }
    );
});

writeFileSync(outputFilePath, JSON.stringify(jsonFile, null, 2));