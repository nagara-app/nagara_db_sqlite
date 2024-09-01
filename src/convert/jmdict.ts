import {parseStringPromise} from 'xml2js';
import type {ParserOptions} from 'xml2js';

import {readFile, writeFile} from 'fs/promises';
import {toCamelcaseFromKebabcase} from './utils';

export default async (): Promise<void> => {
  const file = await readFile('input/download/jmdict.xml', 'utf8');

  const lines = file.split(/\r?\n/);

  let cleanedFile = '';

  for (const line of lines) {
    // This is necessary for xml2js to work in strict mode removes leading & and trailing ; in a value like &n;
    const cleanedLine = line.replace(/&([^;]+);/g, '$1');
    cleanedFile += cleanedLine;
    cleanedFile += '\n';
  }

  const parserOptions: ParserOptions = {
    explicitRoot: false, // skip root note
    explicitArray: false, // only create array if more than one child node
    mergeAttrs: true, // merge attributes and child elements as properties of the parent
    charkey: 'value', // replacing default tag name '_' with 'value'
    normalizeTags: true, // lower case tag names
    attrNameProcessors: [
      nameToLowerCase, // lower case attribute names
      renameAttrName, // rename attributes
    ],
    valueProcessors: [
      nameFromKebabToCamelCase, // convert to camelCase so it can be reused as a tag key for json
    ],
  };

  const parsedFile = await parseStringPromise(cleanedFile, parserOptions);

  const convertedFile = JSON.stringify(parsedFile, null, 2);
  await writeFile('input/converted/jmdict.json', convertedFile);
};

const nameFromKebabToCamelCase = (value: string, name: string): string => {
  switch (name) {
    case 'pos':
    case 'field':
    case 'misc':
      return toCamelcaseFromKebabcase(value);
    default:
      return value;
  }
};

const renameAttrName = (name: string): string => {
  switch (name) {
    case 'xml:lang':
      name = 'lang';
      break;
    default:
      break;
  }
  return name;
};

const nameToLowerCase = (name: string): string => {
  return name.toLowerCase();
};
