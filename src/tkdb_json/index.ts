import { writeFile } from "fs/promises";
import { join } from "path";
import { TKDBmapper } from "./tkdb.mapper";

import { Constants } from "../constants";
import { readJsonFile, toArray } from "../utils";

import type { TKDB_Word } from "./tkdb.model";
import type { JMdictFurigana } from "../prepare_input/jmdict_furigana/jmdict_furigana.dto";
import type { JMdict } from "../prepare_input/jmdict/jmdict.dto";
import type { JMdictJlpt } from "../jmdict_jlpt_json/jmdict_jlpt.dto";

const main = async () => {
    const limiter = parseInt(process.argv[2] ?? '');

    const outputFilePath = join(__dirname, '..', '..', `${Constants.outputDir}/${Constants.fileNames.tkdbJson}`);

    const jmdictJson: JMdict = await readJsonFile(Constants.fileNames.jmdictConverted, true);
    const jmdictFuriganaJson: JMdictFurigana[] = await readJsonFile(Constants.fileNames.jmdictFurigana, false);
    const tkdbJmdictJlptJson: JMdictJlpt[] = await readJsonFile(Constants.fileNames.tkdbJmdictJlpt, false)

    const mapper = new TKDBmapper(limiter, jmdictJson, jmdictFuriganaJson, tkdbJmdictJlptJson);

    const words: TKDB_Word[] = mapper.word();

    await writeFile(outputFilePath, JSON.stringify(words, null, 2));

    const uniqueInfs: string[] = [];
    jmdictJson.entry.forEach(a => {
        const meaning = toArray(a.sense);
        meaning.forEach(b => {
            const inf = toArray(b.s_inf);
            inf.forEach(c => {
                if (c) {
                    if (!uniqueInfs.includes(c)) {
                        uniqueInfs.push(c);
                    }
                }
            });
        });
    });

    console.log(uniqueInfs);
}

main();