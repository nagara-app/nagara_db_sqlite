// Converts the JMdict.gz file into JSON formated file

import { ParserOptions, parseStringPromise } from 'xml2js';

import { Constants } from '../../constants';
import { handle, readFileFromInput, unzipFile, writeFileToInputConverted } from '../../utils';

export default async () => {

    function renameAttrName(name: string) {
        switch (name) {
            case 'xml:lang':
                name = 'lang'
                break;
            default:
                break;
        }
        return name;
    }

    function nameToLowerCase(name: string): string {
        return name.toLowerCase();
    }

    function renameValue(value: string): string {
        return value.replace(/^&|;$/gi, '');
    }

    const parserOptions: ParserOptions = {
        strict: false,
        explicitRoot: false, // skip root note
        explicitArray: false, // only create array if more than one child node
        mergeAttrs: true, // merge attributes and child elements as properties of the parent
        charkey: 'value', // replacing default tag name '_' with 'value'
        normalizeTags: true, // lower case tag names
        attrNameProcessors: [
            nameToLowerCase, // lower case attribute names
            renameAttrName, // rename attributes
        ],
        valueProcessors: [renameValue], // rename values that start with '&' and end with ';' symbols
    }

    const zippedFile = await readFileFromInput(Constants.fileNames.jmdict);
    const file = await unzipFile(zippedFile);

    console.log('Parsing file …')
    const [resultErr, result] = await handle(parseStringPromise(file, parserOptions));
    if (resultErr) throw (resultErr);

    await writeFileToInputConverted(Constants.fileNames.jmdictConverted, result);
}
