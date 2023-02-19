import { TKDBmapper } from "./tkdb.mapper";

import { Constants } from "../constants";
import { readJsonFileFromInput, readJsonFileFromInputConverted, writeFileToOutput } from "../utils";

import type { TKDB_Word } from "./tkdb.model";
import type { JMdictFurigana } from "../convert_input/jmdict_furigana/jmdict_furigana.dto";
import type { JMdict } from "../convert_input/jmdict/jmdict.dto";
import type { JMdictJlpt } from "../jmdict_jlpt_json/jmdict_jlpt.dto";

const main = async () => {
    const limiter = parseInt(process.argv[2] ?? '');

    const jmdictJson: JMdict = await readJsonFileFromInputConverted(Constants.fileNames.jmdictConverted);
    const jmdictFuriganaJson: JMdictFurigana[] = await readJsonFileFromInput(Constants.fileNames.jmdictFurigana);
    const tkdbJmdictJlptJson: JMdictJlpt[] = await readJsonFileFromInput(Constants.fileNames.tkdbJmdictJlpt);

    const mapper = new TKDBmapper(limiter, jmdictJson, jmdictFuriganaJson, tkdbJmdictJlptJson);

    const words: TKDB_Word[] = mapper.word();

    await writeFileToOutput(Constants.fileNames.tkdbJson, words);

    /*
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
    */
}

main();