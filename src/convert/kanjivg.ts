import {parseStringPromise} from 'xml2js';
import type {ParserOptions} from 'xml2js';

import {readFile, writeFile} from 'fs/promises';

export default async (): Promise<void> => {
  const file = await readFile('input/download/kanjivg.xml', 'utf8');

  const parserOptions: ParserOptions = {
    explicitRoot: false,
    explicitArray: false,
    mergeAttrs: true,
    attrNameProcessors: [removeKvgPrefix, removeXmlnsPrefix],
    attrValueProcessors: [removeKvgPrefix],
  };

  const parsedFile = await parseStringPromise(file, parserOptions);

  const convertedFile = JSON.stringify(parsedFile, null, 2);
  await writeFile('input/converted/kanjivg.json', convertedFile);
};

const removeXmlnsPrefix = (name: string): string => {
  return name.replace('xmlns:', '');
};

const removeKvgPrefix = (name: string): string => {
  return name.replace('kvg:', '');
};
