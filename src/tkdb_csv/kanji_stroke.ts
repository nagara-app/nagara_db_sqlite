import type { TKDB } from '../tkdb_json/tkdb.model';

interface TKDBCSV_Kanji_Stroke {
  kanji_id: string;
  position: number;
  path: string;
  x: string;
  y: string;
}

export const main = (data: TKDB): TKDBCSV_Kanji_Stroke[] => {
  const json: TKDBCSV_Kanji_Stroke[] = [];

  for (const kanji of data.kanji) {
    let position = 0;
    for (const stroke of kanji.misc.strokes) {
      json.push({
        kanji_id: kanji.literal,
        position,
        path: `"${stroke.path}"`,
        x: stroke.x,
        y: stroke.y,
      });

      ++position;
    }
  }

  return json;
};
