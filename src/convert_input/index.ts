import { blue } from "chalk";

import jmdict from './jmdict/jmdict.converter';
import tanosVocab from './tanos_vocab/tanos_vocab.converter';

const main = async () => {

    console.log(blue('Converting files from input …'));

    await jmdict();
    await tanosVocab();
}
main();