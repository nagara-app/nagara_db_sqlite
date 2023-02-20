import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { green } from 'chalk';

import { Constants } from './constants';
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
  const path = `${Constants.inputDir}/${fileName}`;
  const fullPath = join(__dirname, '..', path);
  return await readFile(fullPath);
};

export const readJsonFileFromInput = async <T>(fileName: string): Promise<T> => {
  console.log(`Reading ${fileName} file from input …`);
  const path = `${Constants.inputDir}/${fileName}`;
  const fullPath = join(__dirname, '..', path);
  const file = await readFile(fullPath, 'utf8');
  return JSON.parse(file.trim());
};

export const readJsonFileFromInputConverted = async <T>(fileName: string): Promise<T> => {
  console.log(`Reading ${fileName} file from input converted …`);
  const path = `${Constants.inputDir}/${Constants.inputConvertedDir}/${fileName}`;
  const fullPath = join(__dirname, '..', path);
  const file = await readFile(fullPath, 'utf8');
  return JSON.parse(file.trim());
};

export const writeFileToInputConverted = async (fileName: string, fileContent: any): Promise<void> => {
  console.log(`Writing ${fileName} file to converted input …`);
  const path = `${Constants.inputDir}/${Constants.inputConvertedDir}/${fileName}`;
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
  const path = `${Constants.outputDir}/${fileName}`;
  const fullPath = join(__dirname, '..', path);
  await writeFile(fullPath, JSON.stringify(fileContent, null, 2))
    .then(() => {
      console.log(green(`Finished writing ${fileName} file to output`));
    })
    .catch((err) => {
      throw err;
    });
};
