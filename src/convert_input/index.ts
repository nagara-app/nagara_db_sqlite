import { blue } from 'chalk';

import jmdict from './jmdict/jmdict.converter';
import kanjidic2 from './kanjidic2/kanjidic2.converter';
import tanosVocab from './tanos_vocab/tanos_vocab.converter';
import tanosKanji from './tanos_kanji/tanos_kanji.converter';

const main = async (): Promise<void> => {
  console.log(blue('Converting files from input …'));

  await tanosVocab();
  await tanosKanji();
  await jmdict();
  await kanjidic2();
};
void main();
