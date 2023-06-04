import { TKDBmapper } from './tkdb.mapper';
import { CONSTANTS } from '../constants';
import { readJsonFileFromInput, readJsonFileFromInputConverted, writeFileToOutput } from '../utils';

import type { TKDB } from './tkdb.model';
import type { JMdictFurigana } from '../input/jmdict_furigana/jmdict_furigana.dto';
import type { JMdict } from '../input/jmdict/jmdict.dto';
import type { JMdictJlpt } from '../input/jmdict_jlpt/jmdict_jlpt.dto';
import type { Kanjidic2 } from '../input/kanjidic2/kanjidic2.dto';
import type { TanosKanji } from '../input/tanos_kanji/tanos_kanji.dto';
import type { KanjiumAntonym } from '../input/kanjium_antonym/kanjium_antonym.dto';
import type { KanjiumSynonym } from '../input/kanjium_synonym/kanjium_synonym.dto';
import type { KanjiumLookalike } from '../input/kanjium_lookalike/kanjium_lookalike.dto';
import type { KanjiumFrequency } from '../input/kanjium_frequency/kanjium_frequency.dto';
import type { Iso639 } from '../input/iso639/iso639.dto';
import type { Kradfilex } from '../input/kradfilex/kradfilex.dto';
import type { RadkfilexKanjium } from '../input/radkfilex_kanjium/radkfilex_kanjium.dto';
import type { KanjiVG } from '../input/kanjivg/kanjivg.dto';

const main = async (): Promise<void> => {
  const limiter = process.argv[2] !== undefined ? parseInt(process.argv[2]) : undefined;

  const jmdictJson: JMdict = await readJsonFileFromInputConverted(CONSTANTS.fileNames.jmdictConverted);
  const jmdictFuriganaJson: JMdictFurigana[] = await readJsonFileFromInput(CONSTANTS.fileNames.jmdictFurigana);
  const tkdbJmdictJlptJson: JMdictJlpt[] = await readJsonFileFromInput(CONSTANTS.fileNames.tkdbJmdictJlpt);
  const kanjidic2: Kanjidic2 = await readJsonFileFromInputConverted(CONSTANTS.fileNames.kanjidic2Converted);
  const tanosKanji: TanosKanji[] = await readJsonFileFromInputConverted(CONSTANTS.fileNames.tanosKanjiConverted);
  const kanjiumAntonym: KanjiumAntonym[] = await readJsonFileFromInput(CONSTANTS.fileNames.kanjiumAntonym);
  const kanjiumSynonym: KanjiumSynonym[] = await readJsonFileFromInput(CONSTANTS.fileNames.kanjiumSynonym);
  const kanjiumLookalike: KanjiumLookalike[] = await readJsonFileFromInput(CONSTANTS.fileNames.kanjiumLookalike);
  const kanjiumFrequency: KanjiumFrequency[] = await readJsonFileFromInput(CONSTANTS.fileNames.kanjiumFrequency);
  const kradfilex: Kradfilex[] = await readJsonFileFromInputConverted(CONSTANTS.fileNames.kradfilexConverted);
  const radkfilexKanjium: RadkfilexKanjium[] = await readJsonFileFromInputConverted(
    CONSTANTS.fileNames.radkfilexKanjium,
  );
  const kanjivg: KanjiVG[] = await readJsonFileFromInputConverted(CONSTANTS.fileNames.kanjivgConverted);
  const iso639: Iso639[] = await readJsonFileFromInputConverted(CONSTANTS.fileNames.iso639Converted);

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
    kanjiumFrequency,
    kradfilex,
    radkfilexKanjium,
    kanjivg,
    iso639,
  );

  const tkdb: TKDB = mapper.init();

  await writeFileToOutput(CONSTANTS.fileNames.tkdbJson, tkdb);
};

void main();
