import type { TKDB } from '../tkdb_json/tkdb.model';

interface TKDBCSV_Kanji {
  id: string;
  meanings: string | undefined;
  readings_on: string | undefined;
  readings_kun: string | undefined;
  frequency: number | undefined;
  strokecount: number | undefined;
  jlpt_id: string | undefined;
  grade_id: string | undefined;
}

export const main = (data: TKDB): TKDBCSV_Kanji[] => {
  const json: TKDBCSV_Kanji[] = [];

  for (const kanji of data.kanji) {
    let meanings = kanji.meaning
      .filter((m: { lang: string }) => m.lang === 'eng')
      .map((m: { value: string }) => m.value)
      .join(';');

    if (meanings !== '') {
      meanings = `"${meanings.replaceAll('"', '""')}"`;
    }

    json.push({
      id: kanji.literal,
      meanings,
      readings_on: kanji.reading.on.join(';'),
      readings_kun: kanji.reading.kun.join(';'),
      frequency: kanji.misc.frequencyK,
      strokecount: kanji.misc.strokecount,
      jlpt_id: kanji.misc.jlpt,
      grade_id: kanji.misc.grade,
    });
  }

  return json;
};
