// Converts the kanjidic2.xml.gz file into JSON formated file

import { ParserOptions, parseStringPromise } from 'xml2js';

import { handle, readFileFromInput, unzipFile, writeFileToInputConverted } from '../../utils';
import { Constants } from '../../constants';

export default async () => {

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
    }

    const zippedFile = await readFileFromInput(Constants.fileNames.kanjidic2);
    const file = await unzipFile(zippedFile);

    console.log("Parsing file …")
    const [resultErr, result] = await handle(parseStringPromise(file, parserOptions));
    if (resultErr) throw (resultErr);

    await writeFileToInputConverted(Constants.fileNames.kanjidic2Converted, result);
}