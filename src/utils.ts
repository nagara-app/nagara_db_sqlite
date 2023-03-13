import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { green } from 'chalk';

import { CONSTANTS } from './constants';
import { gunzip } from 'zlib';

export const toArray = <T>(val: T[] | T | undefined): T[] =>
  val !== undefined ? (Array.isArray(val) ? val : [val]) : [];

export const unzipFile = async (zippedFile: Buffer): Promise<Buffer> => {
  const promise = new Promise<Buffer>((resolve, reject) => {
    gunzip(zippedFile, (err, data) => {
      if (err !== null) {
        reject(err);
      }
      resolve(data);
    });
  });

  console.log(`Unzipping file …`);
  return await promise;
};

export const readFileFromInput = async (fileName: string): Promise<Buffer> => {
  console.log(`Reading ${fileName} file from input …`);
  const path = `${CONSTANTS.inputDir}/${fileName}`;
  const fullPath = join(__dirname, '..', path);
  const file = await readFile(fullPath);
  return file;
};

export const readJsonFileFromInput = async <T>(fileName: string): Promise<T> => {
  console.log(`Reading ${fileName} file from input …`);
  const path = `${CONSTANTS.inputDir}/${fileName}`;
  const fullPath = join(__dirname, '..', path);
  const file = await readFile(fullPath, 'utf8');
  return JSON.parse(file.trim());
};

export const readJsonFileFromInputConverted = async <T>(fileName: string): Promise<T> => {
  console.log(`Reading ${fileName} file from input converted …`);
  const path = `${CONSTANTS.inputDir}/${CONSTANTS.inputConvertedDir}/${fileName}`;
  const fullPath = join(__dirname, '..', path);
  const file = await readFile(fullPath, 'utf8');
  return JSON.parse(file.trim());
};

export const writeFileToInputConverted = async (fileName: string, fileContent: any): Promise<void> => {
  console.log(`Writing ${fileName} file to converted input …`);
  const path = `${CONSTANTS.inputDir}/${CONSTANTS.inputConvertedDir}/${fileName}`;
  const fullPath = join(__dirname, '..', path);
  await writeFile(fullPath, JSON.stringify(fileContent, null, 2))
    .then(() => {
      console.log(green(`Finished writing ${fileName} file to converted input`));
    })
    .catch((err) => {
      throw err;
    });
};

export const writeFileToOutput = async (fileName: string, fileContent: any): Promise<void> => {
  console.log(`Writing ${fileName} file to output …`);
  const path = `${CONSTANTS.outputDir}/${fileName}`;
  const fullPath = join(__dirname, '..', path);
  await writeFile(fullPath, JSON.stringify(fileContent, null, 2))
    .then(() => {
      console.log(green(`Finished writing ${fileName} file to output`));
    })
    .catch((err) => {
      throw err;
    });
};

export const toCamelcaseFromSnakecase = (text: string): string => {
  return text.toLowerCase().replace(/(_\w)/g, (m) => m.toUpperCase().substring(1));
};

export const toCamelcaseFromKebabcase = (text: string): string => {
  return (
    text.charAt(0).toLowerCase() +
    text.slice(1).replace(/-./g, (x) => {
      if (x[1] !== undefined) {
        return x[1].toUpperCase();
      } else {
        return '';
      }
    })
  );
};

// Transforms a string to hexadecimal string

export const getDate = (): string => {
  const d = new Date();
  let month = (d.getMonth() + 1).toString();
  let day = '' + d.getDate().toString();
  const year = d.getFullYear().toString();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

const toHex = (text: string): string => {
  let hex;
  let result = '';

  for (let i = 0; i < text.length; i++) {
    hex = text.charCodeAt(i).toString(16);
    result += ('000' + hex).slice(-4);
  }

  return result;
};

export const toKvgHex = (text: string): string => {
  return toHex(text).padStart(CONSTANTS.kvgPadLenght, CONSTANTS.kvgPadFill);
};
