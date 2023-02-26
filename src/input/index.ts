import { blue } from 'chalk';

import iso639 from './iso639/iso639.converter';
import radkfilex from './radkfilex/radkfilex.converter';
import kradfilex from './kradfilex/kradfilex.converter';
import tanosKanji from './tanos_kanji/tanos_kanji.converter';
import tanosVocab from './tanos_vocab/tanos_vocab.converter';
import kanjidic2 from './kanjidic2/kanjidic2.converter';
import jmdictJlpt from './jmdict_jlpt/jmdict_jlpt.creator';
import jmdict from './jmdict/jmdict.converter';
import radkfilexKanjium from './radkfilex_kanjium/radkfilex_kanjium.converter';

const main = async (): Promise<void> => {
  console.log(blue('Converting files from input …'));

  await iso639();
  await radkfilex();
  await kradfilex();
  await radkfilexKanjium();
  await kanjidic2();
  await jmdict();
  await tanosVocab();
  await tanosKanji();
  await jmdictJlpt();
};
void main();
