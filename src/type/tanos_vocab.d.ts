export interface TanosVocab {
  id: string | undefined;
  jlpt: JLPT;
  kana: string;
  kanji?: string | undefined;
}

export type JLPT = 'n1' | 'n2' | 'n3' | 'n4' | 'n5';
