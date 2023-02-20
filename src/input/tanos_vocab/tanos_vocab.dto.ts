import type { TKDB_Tag_JLPT } from '../../tkdb_json/tkdb.model';

export interface TanosVocab {
  jlpt: TKDB_Tag_JLPT;
  kanji: string;
  kana: string;
  english: string;
}
