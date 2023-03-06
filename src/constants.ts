export const Constants = {
  version: '0.0.0',
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
    tanosKanji: 'tanos_kanji.csv',
    tanosKanjiConverted: 'tanos_kanji.json',
    kanjidic2: 'kanjidic2.xml.gz',
    kanjidic2Converted: 'kanjidic2.json',
    kanjiumAntonym: 'kanjium_antonyms.json',
    kanjiumSynonym: 'kanjium_synonyms.json',
    kanjiumLookalike: 'kanjium_lookalikes.json',
    kanjiumRadical: 'kanjium_radicals.json',
    kanjiumRadicalVariant: 'kanjium_radvars.json',
    radkfilex: 'radkfilex',
    radkfilexConverted: 'radkxfilex.json',
    kradfile: 'kradfile',
    kradfile2: 'kradfile2',
    kradfilexConverted: 'kradfilex.json',
    radkfilexKanjium: 'radkfilex_kanjium.json',
    iso639: 'ISO-639-2_utf-8.txt',
    iso639Converted: 'iso639.json',
  },
  commonTags: ['news1', 'ichi1', 'spec1', 'spec2', 'gai1'],
  langCodeEnglish: 'eng',
  jmdictXrefSeparator: '・',
  csvDelimiter: ',',
  tanosDelimiter: ',',
  tanosVocabSuruSuffix: '・する',
  kanjiumDelimiter: ',',
  kanjiumRadicalMeaningDelimiter: ',',
  kanjiumRadicalNamesDelimiter: '・',
  iso639Delimiter: '|',
  iso639Headers: ['iso6392t', 'iso6392b', 'iso6391', 'englishName', 'frenchName'],
  kvgPadFill: '0',
  kvgPadLenght: 5,
};
