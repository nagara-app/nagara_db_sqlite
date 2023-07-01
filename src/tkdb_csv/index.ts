import { join } from 'path';
import { CONSTANTS } from '../constants';
import { readFile, writeFile } from 'fs/promises';
import type { TKDB } from '../tkdb_json/tkdb.model';
import { main as createKanjiStroke } from './kanji_stroke';
import { main as createKanji } from './kanji';

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

const writeCSV = async (fileName: string, data: string): Promise<void> => {
  try {
    const path = `${CONSTANTS.outputDir}/${fileName}`;
    const fullPath = join(__dirname, '..', '..', path);
    await writeFile(fullPath, data, 'utf8');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const main = async (): Promise<void> => {
  const tkdb = await parseJSONFile();

  // kanji
  const kanjiJson = createKanji(tkdb);
  const kanjiCsv = arrayToCSV(kanjiJson);
  await writeCSV(CONSTANTS.csvFileNames.kanji, kanjiCsv);

  // kanji_stroke
  const strokeOrderJson = createKanjiStroke(tkdb);
  const strokeOrderCsv = arrayToCSV(strokeOrderJson);
  await writeCSV(CONSTANTS.csvFileNames.kanjiStroke, strokeOrderCsv);
};

void main();
