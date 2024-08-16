import { join } from 'path';
import { CONSTANTS } from '../constants';
import { readFile, writeFile } from 'fs/promises';
import type { TKDB } from '../tkdb_json/tkdb.model';
import { main as mapper } from './tkdb_csv.mapper';

const parseJSONFile = async (): Promise<TKDB> => {
  try {
    console.log(`Reading ${CONSTANTS.fileNames.tkdbJson} file from input …`);
    const path = `${CONSTANTS.outputDir}/${CONSTANTS.fileNames.tkdbJson}`;
    const fullPath = join(__dirname, '..', '..', path);
    const file = await readFile(fullPath, 'utf8');
    return JSON.parse(file.trim());
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const arrayToCSV = <T extends Record<string, any>>(data: T[]): string => {
  if (data.length === 0) {
    return '';
  }
  const csv = data.map((row) => Object.values(row));
  const header = Object.keys(data[0] as Record<string, any>);
  csv.unshift(header);
  return csv.join('\n');
};

const writeCSVFile = async (data: any, fileName: string): Promise<void> => {
  const csv = arrayToCSV(data);
  try {
    const path = `${CONSTANTS.outputDir}/csv/${fileName}`;
    const fullPath = join(__dirname, '..', '..', path);
    await writeFile(fullPath, csv, 'utf8');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const main = async (): Promise<void> => {
  const json = await parseJSONFile();
  const csvMap = mapper(json);

  const csvFileNames = CONSTANTS.csvFileNames;
  await Promise.all([
    writeCSVFile(csvMap.jlpts, csvFileNames.jlpt),
    writeCSVFile(csvMap.langs, csvFileNames.lang),
    writeCSVFile(csvMap.kanji_grades, csvFileNames.kanji_grade),
    writeCSVFile(csvMap.kanjis, csvFileNames.kanji),
    writeCSVFile(csvMap.kanji_meanings, csvFileNames.kanji_meaning),
    writeCSVFile(csvMap.kanji_kuns, csvFileNames.kanji_kun),
    writeCSVFile(csvMap.kanji_ons, csvFileNames.kanji_on),
    writeCSVFile(csvMap.kanji_strokes, csvFileNames.kanji_stroke),
    writeCSVFile(csvMap.word_kanji_info_types, csvFileNames.word_kanji_info_type),
    writeCSVFile(csvMap.word_kana_info_types, csvFileNames.word_kana_info_type),
    writeCSVFile(csvMap.words, csvFileNames.word),
    writeCSVFile(csvMap.word_kanjis, csvFileNames.word_kanji),
    writeCSVFile(csvMap.word_kanji_literals, csvFileNames.word_kanji_literal),
    writeCSVFile(csvMap.word_reading_furiganas, csvFileNames.word_reading_furigana),
    writeCSVFile(csvMap.word_kanji_infos, csvFileNames.word_kanji_info),
    writeCSVFile(csvMap.word_kanas, csvFileNames.word_kana),
    writeCSVFile(csvMap.word_kana_infos, csvFileNames.word_kana_info),
    writeCSVFile(csvMap.word_reading_restrictions, csvFileNames.word_reading_restriction),
    writeCSVFile(csvMap.word_reading_frequency, csvFileNames.word_reading_frequency),
    writeCSVFile(csvMap.word_reading_jlpt, csvFileNames.word_reading_jlpt),
    writeCSVFile(csvMap.word_meanings, csvFileNames.word_meaning),
    writeCSVFile(csvMap.word_translation_info_types, csvFileNames.word_translation_info_type),
    writeCSVFile(csvMap.word_translations, csvFileNames.word_translation),
    writeCSVFile(csvMap.word_meaning_dial, csvFileNames.word_meaning_dial),
    writeCSVFile(csvMap.word_meaning_field, csvFileNames.word_meaning_field),
    writeCSVFile(csvMap.word_meaning_misc, csvFileNames.word_meaning_misc),
    writeCSVFile(csvMap.word_meaning_pos, csvFileNames.word_meaning_pos),
    writeCSVFile(csvMap.word_meaning_dial_type, csvFileNames.word_meaning_dial_type),
    writeCSVFile(csvMap.word_meaning_field_type, csvFileNames.word_meaning_field_type),
    writeCSVFile(csvMap.word_meaning_misc_type, csvFileNames.word_meaning_misc_type),
    writeCSVFile(csvMap.word_meaning_pos_type, csvFileNames.word_meaning_pos_type),
    writeCSVFile(csvMap.word_meaning_lsources, csvFileNames.word_meaning_lsource),
    writeCSVFile(csvMap.word_meaning_kanarestr, csvFileNames.word_meaning_kanarestriction),
    writeCSVFile(csvMap.word_meaning_kanjirestr, csvFileNames.word_meaning_kanjirestriction),
    writeCSVFile(csvMap.word_meaning_xref, csvFileNames.word_meaning_xref),
    writeCSVFile(csvMap.word_meaning_inf, csvFileNames.word_meaning_inf),
    writeCSVFile(csvMap.search_kanji, csvFileNames.search_kanji),
    writeCSVFile(csvMap.search_word, csvFileNames.search_word),
  ]);
};

void main();
