import type { TKDB_Tag_Lang } from './tkdb_json/tkdb.model';

export const Constants = {
  inputDir: 'input',
  inputConvertedDir: 'converted',
  outputDir: 'output',
  fileNames: {
    jmdict: 'JMdict.gz',
    jmdictConverted: 'jmdict.json',
    jmdictFurigana: 'JmdictFurigana.json',
    tkdbJson: 'tkdb.json',
    jmdictJlpt: 'jmdict_jlpt.json',
    tkdbJmdictJlpt: 'tkdb_jmdict_jlpt.json',
    tanosVocab: 'tanos_vocab.csv',
    tanosVocabConverted: 'tanos_vocab.json',
    kanjidic2: 'kanjidic2.xml.gz',
    kanjidic2Converted: 'kanjidic2.json',
  },
  commonTags: ['news1', 'ichi1', 'spec1', 'spec2', 'gai1'],
  langCodeEnglish: 'eng' as TKDB_Tag_Lang,
  jmdictXrefSeparator: '・',
  csvDelimiter: ',',
  tanosDelimiter: ',',
  tanosVocabSuruSuffix: '・する',
};
