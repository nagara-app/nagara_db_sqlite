import { blue } from "chalk";

import jmdict from './jmdict/jmdict.converter';
import kanjidic2 from './kanjidic2/kanjidic2.converter';
import tanosVocab from './tanos_vocab/tanos_vocab.converter';

const main = async () => {

    console.log(blue('Converting files from input …'));

    await jmdict();
    await kanjidic2();
    await tanosVocab();
}
main();