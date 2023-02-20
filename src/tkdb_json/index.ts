import { TKDBmapper } from './tkdb.mapper';
import { Constants } from '../constants';
import { readJsonFileFromInput, readJsonFileFromInputConverted, toArray, writeFileToOutput } from '../utils';

import type { TKDB_Kanji } from './tkdb.model';
import type { JMdictFurigana } from '../convert_input/jmdict_furigana/jmdict_furigana.dto';
import type { JMdict } from '../convert_input/jmdict/jmdict.dto';
import type { JMdictJlpt } from '../jmdict_jlpt_json/jmdict_jlpt.dto';
import type { Kanjidic2 } from '../convert_input/kanjidic2/kanjidic2.dto';
import type { TanosKanji } from '../convert_input/tanos_kanji/tanos_kanji.dto';

const main = async (): Promise<void> => {
  const limiter = process.argv[2] !== undefined ? parseInt(process.argv[2]) : undefined;

  const jmdictJson: JMdict = await readJsonFileFromInputConverted(Constants.fileNames.jmdictConverted);
  const jmdictFuriganaJson: JMdictFurigana[] = await readJsonFileFromInput(Constants.fileNames.jmdictFurigana);
  const tkdbJmdictJlptJson: JMdictJlpt[] = await readJsonFileFromInput(Constants.fileNames.tkdbJmdictJlpt);
  const kanjidic2: Kanjidic2 = await readJsonFileFromInputConverted(Constants.fileNames.kanjidic2Converted);
  const tanosKanji: TanosKanji[] = await readJsonFileFromInputConverted(Constants.fileNames.tanosKanjiConverted);

  const mapper = new TKDBmapper(limiter, jmdictJson, jmdictFuriganaJson, tkdbJmdictJlptJson, kanjidic2, tanosKanji);

  const words: TKDB_Kanji[] = mapper.kanji();

  await writeFileToOutput(Constants.fileNames.tkdbJson, words);

  const uniqueInfs: string[] = [];
  kanjidic2.character.forEach((a) => {
    const meaning = toArray(a.dic_number);
    meaning.forEach((b) => {
      const inf = toArray(b.dic_ref);
      inf.forEach((c) => {
        if (c.dr_type !== undefined) {
          if (!uniqueInfs.includes(c.dr_type)) {
            uniqueInfs.push(c.dr_type);
          }
        }
      });
    });
  });

  console.log(uniqueInfs);
};

void main();
