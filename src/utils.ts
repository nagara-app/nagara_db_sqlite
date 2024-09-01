import {readFile, writeFile} from 'fs/promises';

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
