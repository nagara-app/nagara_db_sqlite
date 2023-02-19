import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { green } from "chalk";

import { Constants } from "./constants";

export const toArray = <T>(val: T[] | T | undefined): T[] => val ? Array.isArray(val) ? val : [val] : [];

export const handle = <T>(promise: Promise<T>) =>
    promise
        .then((data) => [undefined, data])
        .catch((error) => Promise.resolve([error, undefined]));

export const readFileFromInput = async (fileName: string): Promise<Buffer> => {
    console.log(`Reading ${fileName} file from input …`);
    const path = `${Constants.inputDir}/${fileName}`
    const fullPath = join(__dirname, '..', path);
    const [fileErr, file] = await handle(readFile(fullPath));
    if (fileErr) throw (fileErr);
    return file;
}

export const readJsonFileFromInput = async <T>(fileName: string): Promise<T> => {
    console.log(`Reading ${fileName} file from input …`);
    const path = `${Constants.inputDir}/${fileName}`
    const fullPath = join(__dirname, '..', path);
    const [fileErr, file] = await handle(readFile(fullPath, 'utf8'));
    if (fileErr) throw (fileErr);
    return JSON.parse(file.trim());
}

export const readJsonFileFromInputConverted = async <T>(fileName: string): Promise<T> => {
    console.log(`Reading ${fileName} file from input converted …`);
    const path = `${Constants.inputDir}/${Constants.inputConvertedDir}/${fileName}`
    const fullPath = join(__dirname, '..', path);
    const [fileErr, file] = await handle(readFile(fullPath, 'utf8'));
    if (fileErr) throw (fileErr);
    return JSON.parse(file.trim());
}

export const writeFileToOutput = async (fileName: string, fileContent: any) => {
    console.log(`Writing ${fileName} file to output …`);
    const path = `${Constants.outputDir}/${fileName}`;
    const fullPath = join(__dirname, '..', path);
    await writeFile(fullPath, JSON.stringify(fileContent, null, 2)).then(() => {
        console.log(green(`Finished writing ${fileName} file to output`));
    }).catch(err => {
        throw (err);
    });
}

export const writeFileToInputConverted = async (fileName: string, fileContent: any) => {
    console.log(`Writing ${fileName} file to converted input …`);
    const path = `${Constants.inputDir}/${Constants.inputConvertedDir}/${fileName}`;
    const fullPath = join(__dirname, '..', path);
    await writeFile(fullPath, JSON.stringify(fileContent, null, 2)).then(() => {
        console.log(green(`Finished writing ${fileName} file to converted input`));
    }).catch(err => {
        throw (err);
    });
}