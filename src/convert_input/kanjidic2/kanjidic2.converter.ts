// Converts the kanjidic2.xml.gz file into JSON formated file

import { parseStringPromise } from 'xml2js';

import type { ParserOptions } from 'xml2js';

import { readFileFromInput, unzipFile, writeFileToInputConverted } from '../../utils';
import { Constants } from '../../constants';

export default async (): Promise<void> => {
  function nameToLowerCase(name: string): string {
    return name.toLowerCase();
  }

  const parserOptions: ParserOptions = {
    strict: false,
    mergeAttrs: true,
    normalizeTags: true,
    charkey: 'value',
    explicitRoot: false,
    explicitArray: false,
    attrNameProcessors: [nameToLowerCase],
  };

  const zippedFile = await readFileFromInput(Constants.fileNames.kanjidic2);
  const file = await unzipFile(zippedFile);

  console.log('Parsing file …');
  const result = await parseStringPromise(file, parserOptions);

  await writeFileToInputConverted(Constants.fileNames.kanjidic2Converted, result);
};
