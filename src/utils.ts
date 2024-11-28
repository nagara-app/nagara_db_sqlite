import {readFile, writeFile} from 'fs/promises';
import {toRomaji, isRomaji} from 'wanakana';
import {xxh32} from '@node-rs/xxhash';

export const toStrictRomaji = (input = ''): string => {
  const romaji = toRomaji(input);
  return isRomaji(romaji) ? romaji : '';
};

export const toHash = (input: string): string => {
  const hash = xxh32(input).toString(16);
  return hash;
};

export const toArray = <T>(input: T[] | T): T[] => {
  if (Array.isArray(input)) {
    return input;
  } else {
    return [input];
  }
};

export const toArrayOrUndefined = <T>(
  input: T[] | T | undefined
): T[] | undefined => {
  if (Array.isArray(input)) {
    return input;
  } else if (input !== undefined) {
    return [input] as T[];
  } else {
    return undefined;
  }
};

export const readJsonFile = async <T>(filePath: string): Promise<T> => {
  const fileContent = await readFile(filePath, 'utf8');
  return JSON.parse(fileContent) as T;
};

export const writeJsonFile = async (
  value: unknown,
  path: string
): Promise<void> => {
  const data = JSON.stringify(value, null, 2);
  await writeFile(path, data);
};

export const writeCSVFile = async (
  value: string[][],
  path: string
): Promise<void> => {
  const escapeCsvValue = (val: string): string => {
    if (val.includes(',') || val.includes('\n') || val.includes('"')) {
      // Escape quotes by doubling them and wrap the value in quotes
      return `"${val.replace(/"/g, '""')}"`;
    }
    return val;
  };

  const csvRows = value.map(row => row.map(escapeCsvValue).join(','));
  const csvString = csvRows.join('\n');

  await writeFile(path, csvString);
};
