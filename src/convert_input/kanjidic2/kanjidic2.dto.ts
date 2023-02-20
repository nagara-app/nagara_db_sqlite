// Documentation
// http://www.edrdg.org/kanjidic/kanjidic2_dtdh.html

export interface Kanjidic2 {
  header: Kanjidic2Head;
  character: Kanjidic2Char[];
}

export interface Kanjidic2Head {
  file_version: string;
  database_version: string;
  date_of_creation: string;
}

export interface Kanjidic2Char {
  literal: string;
  codepoint: Kanjidic2CharCp;
  radical: Kanjidic2CharRad;
  misc: Kanjidic2CharMisc;
  dic_number?: Kanjidic2CharDicNum;
  query_code?: Kanjidic2CharQcode;
  reading_meaning?: Kanjidic2CharRdngMng;
}

export interface Kanjidic2CharCp {
  cp_value: Kanjidic2CharCpEntr[];
}

export interface Kanjidic2CharCpEntr {
  value: string;
  cp_type: string;
}

export interface Kanjidic2CharRad {
  rad_value: Kanjidic2CharRadVal | Kanjidic2CharRadVal[];
}

export interface Kanjidic2CharRadVal {
  value: string;
  rad_type: string;
}

export interface Kanjidic2CharMisc {
  grade?: string;
  stroke_count: string | string[];
  variant?: Kanjidic2CharMiscVar | Kanjidic2CharMiscVar[];
  freq?: string;
  rad_name?: string | string[];
  jlpt?: string;
}

export interface Kanjidic2CharMiscVar {
  value: string;
  var_type: string;
}

export interface Kanjidic2CharDicNum {
  dic_ref: Kanjidic2CharDicNumDicRef | Kanjidic2CharDicNumDicRef[];
}

export interface Kanjidic2CharDicNumDicRef {
  value: string;
  dr_type: string;
  m_vol?: string;
  m_page?: string;
}

export interface Kanjidic2CharQcode {
  q_code: Kanjidic2CharQcodeEntr | Kanjidic2CharQcodeEntr[];
}

export interface Kanjidic2CharQcodeEntr {
  value: string;
  qc_type: string;
  skip_misclass?: string;
}

export interface Kanjidic2CharRdngMng {
  rmgroup?: Kanjidic2CharRdngMngGrp;
  nanori?: string | string[];
}

export interface Kanjidic2CharRdngMngGrp {
  reading?: Kanjidic2CharRdngMngGrpRdng | Kanjidic2CharRdngMngGrpRdng[];
  meaning?: Array<string | Kanjidic2CharRdngMngGrpMng>;
}

export interface Kanjidic2CharRdngMngGrpRdng {
  value: string;
  r_type: string;
}

export interface Kanjidic2CharRdngMngGrpMng {
  value: string;
  m_lang: string;
}
