import jmdict from './jmdict/jmdict.converter';
import tanosVocab from './tanos_vocab/tanos_vocab.converter';

const main = async () => {
    await jmdict();
    await tanosVocab();
}
main();