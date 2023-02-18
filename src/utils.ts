import { readFile } from "fs/promises";
import { join } from "path";

import { Constants } from "./constants";

export const toArray = <T>(val: T[] | T | undefined): T[] => val ? Array.isArray(val) ? val : [val] : [];

export const handle = <T>(promise: Promise<T>) =>
    promise
        .then((data) => [undefined, data])
        .catch((error) => Promise.resolve([error, undefined]));

export const readJsonFile = async <T>(fileName: string, fromTmp: boolean): Promise<T> => {
    console.log(`Reading ${fileName} file …`);
    const path = `${Constants.inputDir}/${fromTmp ? Constants.inputTempDir + '/' : ''}${fileName}`
    const fullPath = join(__dirname, '..', path);
    const [fileErr, file] = await handle(readFile(fullPath, 'utf8'));
    if (fileErr) throw (fileErr);
    return JSON.parse(file.trim());
}