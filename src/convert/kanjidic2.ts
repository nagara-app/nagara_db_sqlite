import { parseStringPromise } from 'xml2js';
import type { ParserOptions } from 'xml2js';

import { readFile, writeFile } from 'fs/promises';
import { toCamelcaseFromSnakecase } from './utils';

export default async (): Promise<void> => {
  const file = await readFile('input/download/kanjidic2.xml', 'utf8');

  // This is necessary for xml2js to work in strict mode
  const removeDoctypeRegex = /<!DOCTYPE kanjidic2 \[[\s\S]*?\]>/g;
  const cleanedFile = file.replace(removeDoctypeRegex, '');

  const parserOptions: ParserOptions = {
    mergeAttrs: true,
    normalizeTags: true,
    charkey: 'value',
    explicitRoot: false,
    explicitArray: false,
    attrNameProcessors: [nameToLowerCase],
    attrValueProcessors: [nameFromSnakeToCamelCase],
  };

  const parsedFile = await parseStringPromise(cleanedFile, parserOptions);

  const convertedFile = JSON.stringify(parsedFile, null, 2);
  await writeFile('input/converted/kanjidic2.json', convertedFile);
};

const nameToLowerCase = (name: string): string => {
  return name.toLowerCase();
};

function nameFromSnakeToCamelCase(value: string, name: string): string {
  // Convert to camelCase so it can be reused as a key for json
  switch (name) {
    case 'QC_TYPE':
    case 'DR_TYPE':
      return toCamelcaseFromSnakecase(value);
    default:
      return value;
  }
}
