import { TKDBmapper } from './tkdb.mapper';
import { Constants } from '../constants';
import { readJsonFileFromInput, readJsonFileFromInputConverted, toArray, writeFileToOutput } from '../utils';

import type { TKDB_Kanji } from './tkdb.model';
import type { JMdictFurigana } from '../input/jmdict_furigana/jmdict_furigana.dto';
import type { JMdict } from '../input/jmdict/jmdict.dto';
import type { JMdictJlpt } from '../input/jmdict_jlpt/jmdict_jlpt.dto';
import type { Kanjidic2 } from '../input/kanjidic2/kanjidic2.dto';
import type { TanosKanji } from '../input/tanos_kanji/tanos_kanji.dto';
import type { KanjiumAntonym } from '../input/kanjium_antonym/kanjium_antonym.dto';
import type { KanjiumSynonym } from '../input/kanjium_synonym/kanjium_synonym.dto';
import type { KanjiumLookalike } from '../input/kanjium_lookalike/kanjium_lookalike.dto';
import type { Iso639 } from '../input/iso639/iso639.dto';
import type { Kradfilex } from '../input/kradfilex/kradfilex.dto';
import type { RadkfilexKanjium } from '../input/radkfilex_kanjium/radkfilex_kanjium.dto';

const main = async (): Promise<void> => {
  const limiter = process.argv[2] !== undefined ? parseInt(process.argv[2]) : undefined;

  const jmdictJson: JMdict = await readJsonFileFromInputConverted(Constants.fileNames.jmdictConverted);
  const jmdictFuriganaJson: JMdictFurigana[] = await readJsonFileFromInput(Constants.fileNames.jmdictFurigana);
  const tkdbJmdictJlptJson: JMdictJlpt[] = await readJsonFileFromInput(Constants.fileNames.tkdbJmdictJlpt);
  const kanjidic2: Kanjidic2 = await readJsonFileFromInputConverted(Constants.fileNames.kanjidic2Converted);
  const tanosKanji: TanosKanji[] = await readJsonFileFromInputConverted(Constants.fileNames.tanosKanjiConverted);
  const kanjiumAntonym: KanjiumAntonym[] = await readJsonFileFromInput(Constants.fileNames.kanjiumAntonym);
  const kanjiumSynonym: KanjiumSynonym[] = await readJsonFileFromInput(Constants.fileNames.kanjiumSynonym);
  const kanjiumLookalike: KanjiumLookalike[] = await readJsonFileFromInput(Constants.fileNames.kanjiumLookalike);
  const kradfilex: Kradfilex[] = await readJsonFileFromInputConverted(Constants.fileNames.kradfilexConverted);
  const radkfilexKanjium: RadkfilexKanjium[] = await readJsonFileFromInputConverted(
    Constants.fileNames.radkfilexKanjium,
  );
  const iso639: Iso639[] = await readJsonFileFromInputConverted(Constants.fileNames.iso639Converted);

  const mapper = new TKDBmapper(
    limiter,
    jmdictJson,
    jmdictFuriganaJson,
    tkdbJmdictJlptJson,
    kanjidic2,
    tanosKanji,
    kanjiumAntonym,
    kanjiumSynonym,
    kanjiumLookalike,
    kradfilex,
    radkfilexKanjium,
    iso639,
  );

  const kanji: TKDB_Kanji[] = mapper.kanji();

  await writeFileToOutput(Constants.fileNames.tkdbJson, kanji);

  const uniqueInfs: string[] = [];
  kanjidic2.character.forEach((a) => {
    const meaning = toArray(a.misc);
    meaning.forEach((b) => {
      const inf = toArray(b.variant);
      inf.forEach((c) => {
        if (!uniqueInfs.includes(c.var_type)) {
          uniqueInfs.push(c.var_type);
        }
        /*
        const mean = toArray(c.reading);
        mean.forEach((d) => {
          if (!uniqueInfs.includes(d.r_type)) {
            uniqueInfs.push(d.r_type);
          }
        });
        */
      });
    });
  });

  console.log(uniqueInfs);
};

void main();
