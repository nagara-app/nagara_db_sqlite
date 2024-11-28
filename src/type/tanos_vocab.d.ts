export interface TanosVocab {
  id: string | undefined;
  jlpt: JLPT;
  kana: string;
  kanji?: string | undefined;
}

export type JLPT = 1 | 2 | 3 | 4 | 5;
