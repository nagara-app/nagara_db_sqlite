import type { Iso6392t } from '../input/iso639/iso639.dto';
import type {
  JMdcitRdngInf,
  JMdictKanjiInf,
  JMdictSensDial,
  JMdictSensField,
  JMdictSensGlossType,
  JMdictSensMisc,
  JMdictSensPos,
} from '../input/jmdict/jmdict.dto';
import type {
  Kanjidic2CharCpType,
  Kanjidic2CharDicNumDicRefType,
  Kanjidic2CharQcodeType,
} from '../input/kanjidic2/kanjidic2.dto';

export interface TKDB {
  version: string;
  dateOfCreation: string;
  words: TKDB_Word[];
  kanji: TKDB_Kanji[];
  radicals: TKDB_Radical[];
  keywords: TKDB_Keyword;
}

//
// Keywords
//

export interface TKDB_Keyword {
  jlpt: Record<TKDB_Keyword_Jlpt, string>;
  lang: Record<TKDB_Keyword_Lang, string>;
  kanjiGrade: Record<TKDB_Keyword_Kanji_Grade, string>;
  kanjiReadingType: Record<TKDB_Keyword_Kanji_Reading_Type, string>;
  kanjiCodepointType: Record<TKDB_Kanji_Codepoint_Type, string>;
  kanjiDicrefType: Record<TKDB_Kanji_Dicref_Type, string>;
  kanjiQuerycodeType: Record<TKDB_Kanji_Querycode_Type, string>;
  wordMeaningDial: Record<TKDB_Keyword_Word_Meaning_Dialect, string>;
  wordMeaningMisc: Record<TKDB_Keyword_Word_Meaning_Misc, string>;
  wordMeaningPos: Record<TKDB_Keyword_Word_Meaning_Pos, string>;
  wordMeaningField: Record<TKDB_Keyword_Word_Meaning_Field, string>;
  wordMeaningGlossType: Record<TKDB_Keyword_Word_Meaning_Gloss_Type, string>;
  wordReadingInfo: Record<TKDB_Keyword_Word_Reading_Info, string>;
}

//
// Word
//

export interface TKDB_Word {
  id: string;
  reading: TKDB_Word_Reading[];
  meaning: TKDB_Word_Meaning[];
  misc: TKDB_Word_Misc;
}

export interface TKDB_Word_Reading {
  kanji?: string;
  furigana?: TKDB_Word_Reading_Furigana[]; // derived from JMdict Furigana
  uniqeKanji?: string[];
  kana: string;
  common: boolean;
  info: TKDB_Keyword_Word_Reading_Info[];
}

export interface TKDB_Word_Reading_Furigana {
  ruby: string;
  rt?: string;
}

export interface TKDB_Word_Meaning {
  gloss: TKDB_Word_Meaning_Gloss[];
  lang: TKDB_Keyword_Lang;
  pos: TKDB_Keyword_Word_Meaning_Pos[];
  field: TKDB_Keyword_Word_Meaning_Field[];
  dialect: TKDB_Keyword_Word_Meaning_Dialect[];
  misc: TKDB_Keyword_Word_Meaning_Misc[];
  source: TKDB_Word_Meaning_Source[];
  info: string[];
  related: string[]; // represents the id of another entry that is related to this meaning
}

export interface TKDB_Word_Meaning_Gloss {
  value: string;
  type?: TKDB_Keyword_Word_Meaning_Gloss_Type | undefined;
}

export interface TKDB_Word_Meaning_Source {
  lang: TKDB_Keyword_Lang;
  wasei: boolean;
  full: boolean;
  value?: string;
}

export interface TKDB_Word_Misc {
  common: boolean;
  jlpt: TKDB_Keyword_Jlpt | undefined; // derived from tanos
}

//
// Kanji
//

export interface TKDB_Kanji {
  literal: string;
  meaning: TKDB_Kanji_Meaning[];
  reading: TKDB_Kanji_Reading;
  part: TKDB_Kanji_Part[];
  misc: TKDB_Kanji_Misc;
}

export interface TKDB_Kanji_Meaning {
  lang: TKDB_Keyword_Lang;
  value: string;
}

export interface TKDB_Kanji_Reading {
  on: string[];
  kun: string[];
  nanori: string[];
}

export interface TKDB_Kanji_Part {
  literal: string;
  type: TKDB_Kanji_Part_Type;
}

export enum TKDB_Kanji_Part_Type {
  KANJI = 'kanji',
  RADICAL = 'radical',
  COMPONENT = 'component',
}

export interface TKDB_Kanji_Misc {
  codepoint: TKDB_Kanji_Codepoint;
  querycode: TKDB_Kanji_Querycode;
  dicref: TKDB_Kanji_Dicref;
  jlpt: TKDB_Keyword_Jlpt | undefined; // derived from tanos
  lookalike: string[]; // derived from kanjium
  antonym: string[]; // derived from kanjium
  synonym: string[]; // derived from kanjium
  variant: string[];
  strokes: number | undefined;
  strokepaths: TKDB_Kanji_Stroke[];
  grade: TKDB_Keyword_Kanji_Grade | undefined;
  frequencyJ: number | undefined;
}

export interface TKDB_Kanji_Stroke {
  path: string;
  x: string;
  y: string;
}

export type TKDB_Kanji_Codepoint_Type = Kanjidic2CharCpType;
export type TKDB_Kanji_Codepoint = {
  [key in Kanjidic2CharCpType]?: string;
};

export type TKDB_Kanji_Querycode_Type = Kanjidic2CharQcodeType;
export type TKDB_Kanji_Querycode = {
  [key in TKDB_Kanji_Querycode_Type]?: string;
};

export type TKDB_Kanji_Dicref_Type = Kanjidic2CharDicNumDicRefType;
export type TKDB_Kanji_Dicref = {
  [key in TKDB_Kanji_Dicref_Type]?: string;
};

export interface TKDB_Radical {
  literal: string;
  hexcode: string; // used for kanjivg
  number: number;
  strokes: number;
  reading: string[];
  meaning: string[];
  variantOf?: string;
}

//
// Keywords
//

export type TKDB_Keyword_Lang = Iso6392t;
export type TKDB_Keyword_Jlpt = 'n1' | 'n2' | 'n3' | 'n4' | 'n5';

export type TKDB_Keyword_Word_Reading_Info = JMdictKanjiInf | JMdcitRdngInf;
export type TKDB_Keyword_Word_Meaning_Gloss_Type = JMdictSensGlossType;
export type TKDB_Keyword_Word_Meaning_Pos = JMdictSensPos;
export type TKDB_Keyword_Word_Meaning_Field = JMdictSensField;
export type TKDB_Keyword_Word_Meaning_Dialect = JMdictSensDial;
export type TKDB_Keyword_Word_Meaning_Misc = JMdictSensMisc;

export enum TKDB_Keyword_Kanji_Part_Type {
  KANJI = 'kanji',
  RADICAL = 'radical',
  COMPONENT = 'component',
}
export enum TKDB_Keyword_Kanji_Reading_Type {
  ON = 'on',
  KUN = 'kun',
  NANORI = 'nanori',
}
export type TKDB_Keyword_Kanji_Grade =
  | 'kyouiku1'
  | 'kyouiku2'
  | 'kyouiku3'
  | 'kyouiku4'
  | 'kyouiku5'
  | 'kyouiku6'
  | 'jouyou'
  | 'jinmeiyou1'
  | 'jinmeiyou2';
