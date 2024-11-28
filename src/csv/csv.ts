import {Kanji, Keywords, Radical, Word, TKDB} from 'tkdb-helper';
import {readJsonFile, writeCSVFile} from '../utils';
import chalk = require('chalk');

export default async (): Promise<void> => {
  const tkdb = await readJsonFile<TKDB>('output/tkdb.json');

  const keywords = tkdb.keywords;
  const radicals = tkdb.radicals;
  const kanjis = tkdb.kanjis;
  const words = tkdb.words;

  await createKeywords(keywords);
  await createRadical(radicals);
  await createKanji(kanjis, radicals);
  await createWords(words);

  console.log(chalk.green('All CSV files are created'));
};

const createKeywords = async (keywords: Keywords) => {
  const jlptCsv: string[][] = [];
  jlptCsv.push(['id', 'descr']);

  const gradeCsv: string[][] = [];
  gradeCsv.push(['id', 'grade']);

  const jlpt = keywords.jlpt;
  const grade = keywords.kanjiGrade;

  for (const key in jlpt) {
    const description = jlpt[key];
    jlptCsv.push([key, description]);
  }

  for (const key in grade) {
    const description = grade[key];
    gradeCsv.push([key, description]);
  }

  await writeCSVFile(jlptCsv, 'output/csv/jlpt.csv');
  await writeCSVFile(gradeCsv, 'output/csv/grade.csv');
};

const getRadicalId = (literal: string, radicals: Radical[]): string => {
  const id = radicals.find(radical => radical.literal === literal)?.id;

  if (id === undefined) {
    throw new Error(`Radical with literal ${literal} was not found`);
  }

  return id;
};

const createRadical = async (radicals: Radical[]) => {
  const radicalCsv: string[][] = [];
  radicalCsv.push([
    'id',
    'literal',
    'number',
    'keyword',
    'mnemonic',
    'strokecount_id',
    'variant_of_id',
  ]);

  const radicalMeaningCsv: string[][] = [];
  radicalMeaningCsv.push(['radical_id', 'position', 'meaning']);

  const radicalReadingCsv: string[][] = [];
  radicalReadingCsv.push(['radical_id', 'position', 'reading']);

  for (const radical of radicals) {
    const {id, literal} = radical;
    const keyword = radical.keyword ?? '';
    const mnemonic = radical.mnemonic ?? '';
    const number = String(radical.number ?? '');
    const strokecountId = String(radical.strokecount ?? '');
    const variantOfId = radical.variantOf
      ? getRadicalId(radical.variantOf, radicals)
      : '';

    radicalCsv.push([
      id,
      literal,
      number,
      keyword,
      mnemonic,
      strokecountId,
      variantOfId,
    ]);

    const meanings = radical.meanings ?? [];
    const readings = radical.readings ?? [];

    let meaningIndex = 0;
    for (const meaning of meanings) {
      const position = String(meaningIndex);
      radicalMeaningCsv.push([id, position, meaning]);
      meaningIndex++;
    }

    let readingIndex = 0;
    for (const reading of readings) {
      const position = String(readingIndex);
      radicalReadingCsv.push([id, position, reading]);
      readingIndex++;
    }
  }

  await writeCSVFile(radicalCsv, 'output/csv/radical.csv');
  await writeCSVFile(radicalReadingCsv, 'output/csv/radical_reading.csv');
  await writeCSVFile(radicalMeaningCsv, 'output/csv/radical_meaning.csv');
};

const getKanjiId = (literal: string, kanjis: Kanji[]): string => {
  const id = kanjis.find(kanji => kanji.literal === literal)?.id;

  if (id === undefined) {
    throw new Error(`Kanji with literal ${literal} was not found`);
  }

  return id;
};

const createKanji = async (kanjis: Kanji[], radicals: Radical[]) => {
  const strokecounts = new Set<number>();

  const kanjiCsv: string[][] = [];
  kanjiCsv.push([
    'id',
    'literal',
    'frequency',
    'keyword',
    'mnemonic',
    'strokecount_id',
    'jlpt_id',
    'grade_id',
  ]);

  const kanjiMeaningCsv: string[][] = [];
  kanjiMeaningCsv.push(['kanji_id', 'position', 'meaning']);

  const kanjiKunCsv: string[][] = [];
  kanjiKunCsv.push(['kanji_id', 'position', 'kun']);

  const kanjiOnCsv: string[][] = [];
  kanjiOnCsv.push(['kanji_id', 'position', 'on']);

  const kanjiNanoriCsv: string[][] = [];
  kanjiNanoriCsv.push(['kanji_id', 'position', 'nanori']);

  const kanjiAntonymCsv: string[][] = [];
  kanjiAntonymCsv.push(['kanji_id', 'antonym_id']);

  const kanjiLookalikeCsv: string[][] = [];
  kanjiLookalikeCsv.push(['kanji_id', 'looklike_id']);

  const kanjiSynonymCsv: string[][] = [];
  kanjiSynonymCsv.push(['kanji_id', 'synonym_id']);

  const kanjiStrokeCsv: string[][] = [];
  kanjiStrokeCsv.push(['kanji_id', 'position', 'stroke', 'start_y', 'start_x']);

  const kanjiCompositionCsv: string[][] = [];
  kanjiCompositionCsv.push([
    'parent_kanji_id',
    'position',
    'child_kanji_id',
    'child_radical_id',
  ]);

  for (const kanji of kanjis) {
    const {id, literal} = kanji;

    const frequency = String(kanji.frequency ?? '');
    const keyword = kanji.keyword ?? '';
    const mnemonic = kanji.mnemonic ?? '';
    const strokecountId = String(kanji.strokecount ?? '');
    const gradeId = String(kanji.grade ?? '');
    const jlptId = String(kanji.jlpt ?? '');

    const meanings = kanji.meanings ?? [];
    const kuns = kanji.kun ?? [];
    const ons = kanji.on ?? [];
    const nanoris = kanji.nanori ?? [];
    const antonyms = kanji.antonyms ?? [];
    const lookalikes = kanji.lookalikes ?? [];
    const synonyms = kanji.synonyms ?? [];
    const strokes = kanji.strokes ?? [];
    const compositions = kanji.composition ?? [];

    let meaningIndex = 0;
    for (const meaning of meanings) {
      const position = String(meaningIndex);
      kanjiMeaningCsv.push([id, position, meaning]);
      meaningIndex++;
    }

    let kunIndex = 0;
    for (const kun of kuns) {
      const position = String(kunIndex);
      kanjiKunCsv.push([id, position, kun]);
      kunIndex++;
    }

    let onIndex = 0;
    for (const on of ons) {
      const position = String(onIndex);
      kanjiOnCsv.push([id, position, on]);
      onIndex++;
    }

    let nanoriIndex = 0;
    for (const nanori of nanoris) {
      const position = String(nanoriIndex);
      kanjiNanoriCsv.push([id, position, nanori]);
      nanoriIndex++;
    }

    for (const antonym of antonyms) {
      const antonymId = getKanjiId(antonym, kanjis);
      kanjiAntonymCsv.push([id, antonymId]);
    }

    for (const lookalike of lookalikes) {
      const lookalikeId = getKanjiId(lookalike, kanjis);
      kanjiLookalikeCsv.push([id, lookalikeId]);
    }

    for (const synonym of synonyms) {
      const synonymId = getKanjiId(synonym, kanjis);
      kanjiSynonymCsv.push([id, synonymId]);
    }

    let strokeIndex = 0;
    for (const stroke of strokes) {
      const position = String(strokeIndex);
      kanjiStrokeCsv.push([id, position, stroke.path, stroke.y, stroke.x]);
      strokeIndex++;
    }

    let compositionIndex = 0;

    for (const composition of compositions) {
      const position = String(compositionIndex);
      const type = composition.type;

      const compositionKanjiId =
        type === 'kanji' ? getKanjiId(composition.element, kanjis) : '';

      const compositionRadicalId =
        type === 'radical' ? getRadicalId(composition.element, radicals) : '';

      kanjiCompositionCsv.push([
        id,
        position,
        compositionKanjiId,
        compositionRadicalId,
      ]);
      compositionIndex++;
    }

    strokecounts.add(kanji.strokecount);

    kanjiCsv.push([
      id,
      literal,
      frequency,
      keyword,
      mnemonic,
      strokecountId,
      jlptId,
      gradeId,
    ]);
  }

  const strokecountCsv: string[][] = [];
  strokecountCsv.push(['id', 'count']);

  const sortedStrokecounts = [...strokecounts].sort((a, b) => a - b);
  for (const sortedStrokecount of sortedStrokecounts) {
    const strokecount = String(sortedStrokecount);
    strokecountCsv.push([strokecount, strokecount]);
  }

  await writeCSVFile(kanjiCsv, 'output/csv/kanji.csv');
  await writeCSVFile(kanjiMeaningCsv, 'output/csv/kanji_meaning.csv');
  await writeCSVFile(kanjiKunCsv, 'output/csv/kanji_kun.csv');
  await writeCSVFile(kanjiOnCsv, 'output/csv/kanji_on.csv');
  await writeCSVFile(kanjiNanoriCsv, 'output/csv/kanji_nanori.csv');
  await writeCSVFile(kanjiAntonymCsv, 'output/csv/kanji_antonym.csv');
  await writeCSVFile(kanjiLookalikeCsv, 'output/csv/kanji_lookalike.csv');
  await writeCSVFile(kanjiSynonymCsv, 'output/csv/kanji_synonym.csv');
  await writeCSVFile(kanjiStrokeCsv, 'output/csv/kanji_stroke.csv');
  await writeCSVFile(kanjiCompositionCsv, 'output/csv/kanji_composition.csv');
  await writeCSVFile(strokecountCsv, 'output/csv/strokecount.csv');
};

const createWords = async (words: Word[]) => {
  const wordCSV: string[][] = [];
  wordCSV.push(['id', 'jlpt_id']);

  const wordFormCSV: string[][] = [];
  wordFormCSV.push([
    'word_id',
    'form',
    'kanji',
    'kana',
    'position',
    'common',
    'frequency',
    'jlpt_id',
  ]);

  const wordFuriganaCSV: string[][] = [];
  wordFuriganaCSV.push(['word_id', 'form_id', 'furigana']);

  for (const word of words) {
    const {id, jlpt, forms} = word;
    const wordId = id.toString();
    const jlptId = String(jlpt ?? '');

    wordCSV.push([wordId, jlptId]);
    wordFuriganaCSV.push;

    let formPosition = 0;
    for (const form of forms) {
      const {kanji, kana, common, frequency, jlpt, id, furigana} = form;

      wordFormCSV.push([
        wordId,
        id,
        kanji ?? '',
        kana,
        formPosition.toString(),
        common?.toString() ?? '',
        frequency?.toString() ?? '',
        jlpt?.toString() ?? '',
      ]);

      if (furigana) {
        wordFuriganaCSV.push([wordId, id, JSON.stringify(furigana)]);
      }

      ++formPosition;
    }
  }

  await writeCSVFile(wordCSV, 'output/csv/word.csv');
  await writeCSVFile(wordFormCSV, 'output/csv/word_form.csv');
  await writeCSVFile(wordFuriganaCSV, 'output/csv/word_furigana.csv');
};
