import type {
  JMdcitRdngInf,
  JMdictKanjiInf,
  JMdictSensDial,
  JMdictSensField,
  JMdictSensGlossLang,
  JMdictSensGlossType,
  JMdictSensLSourceLang,
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
  // radicals: TKDB_Radical[];
  tags: {
    lang: TKDB_Tag_Lang[];
    wordMeaningDial: TKDB_Tag_Word_Meaning_Dialect[];
    wordMeaningMisc: TKDB_Tag_Word_Meaning_Misc[];
    wordMeaningPos: TKDB_Tag_Word_Meaning_Pos[];
    wordMeaningField: TKDB_Tag_Word_Meaning_Field[];
    wordMeaningGlossType: TKDB_Tag_Word_Meaning_Gloss_Type[];
    wordReadingInfo: TKDB_Tag_Word_Reading_Info[];
  };
}

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
  info: TKDB_Tag_Word_Reading_Info[];
}

export interface TKDB_Word_Reading_Furigana {
  ruby: string;
  rt?: string;
}

export interface TKDB_Word_Meaning {
  gloss: TKDB_Word_Meaning_Gloss[];
  lang: TKDB_Tag_Lang;
  pos: TKDB_Tag_Word_Meaning_Pos[];
  field: TKDB_Tag_Word_Meaning_Field[];
  dialect: TKDB_Tag_Word_Meaning_Dialect[];
  misc: TKDB_Tag_Word_Meaning_Misc[];
  source: TKDB_Word_Meaning_Source[];
  info: string[];
  related: string[]; // represents the id of another entry that is related to this meaning
}

export interface TKDB_Word_Meaning_Gloss {
  value: string;
  type?: TKDB_Tag_Word_Meaning_Gloss_Type | undefined;
}

export interface TKDB_Word_Meaning_Source {
  lang: string;
  wasei: boolean;
  full: boolean;
  text?: string;
}

export interface TKDB_Word_Misc {
  common: boolean;
  jlpt: TKDB_Tag_Jlpt | undefined; // derived from tanos
}

export interface TKDB_Kanji {
  literal: string;
  misc: TKDB_Kanji_Misc;
}

export interface TKDB_Kanji_Misc {
  codepoint: TKDB_Kanji_Codepoint;
  querycode: TKDB_Kanji_Querycode;
  dicref: TKDB_Kanji_Dicref;
  jlpt: TKDB_Tag_Jlpt | undefined; // derived from tanos
  lookalike: string[]; // derived from kanjium
  antonym: string[]; // derived from kanjium
  synonym: string[]; // derived from kanjium
  strokecount: number | undefined;
  grade: TKDB_Tag_Kanji_Grade | undefined;
  frequency: number | undefined;
}

export type TKDB_Kanji_Codepoint = {
  [key in Kanjidic2CharCpType]?: string;
};

export type TKDB_Kanji_Querycode = {
  [key in Kanjidic2CharQcodeType]?: string;
};

export type TKDB_Kanji_Dicref = {
  [key in Kanjidic2CharDicNumDicRefType]?: string;
};

// export interface TKDB_Radical {}

export type TKDB_Tag_Kanji_Grade =
  | 'kyouiku1'
  | 'kyouiku2'
  | 'kyouiku3'
  | 'kyouiku4'
  | 'kyouiku5'
  | 'kyouiku6'
  | 'jouyou'
  | 'jinmeiyou1'
  | 'jinmeiyou2';
export type TKDB_Tag_Jlpt = 'n1' | 'n2' | 'n3' | 'n4' | 'n5';
export type TKDB_Tag_Lang = JMdictSensGlossLang | JMdictSensLSourceLang;
export type TKDB_Tag_Word_Reading_Info = JMdictKanjiInf | JMdcitRdngInf;
export type TKDB_Tag_Word_Meaning_Gloss_Type = JMdictSensGlossType;
export type TKDB_Tag_Word_Meaning_Pos = JMdictSensPos;
export type TKDB_Tag_Word_Meaning_Field = JMdictSensField;
export type TKDB_Tag_Word_Meaning_Dialect = JMdictSensDial;
export type TKDB_Tag_Word_Meaning_Misc = JMdictSensMisc;
