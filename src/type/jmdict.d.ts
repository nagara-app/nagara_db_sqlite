// Documentation
// https://www.edrdg.org/jmdict/jmdict_dtd_h.html

export interface JMdict {
  entry: JMdictEntr[];
}

export interface JMdictEntr {
  ent_seq: string;
  k_ele?: JMdictKanji | JMdictKanji[];
  r_ele: JMdictRdng | JMdictRdng[];
  sense: JMdictSens | JMdictSens[];
}

export interface JMdictKanji {
  keb: string;
  ke_inf?: JMdictKanjiInf | JMdictKanjiInf[];
  ke_pri?: string | string[];
}

export interface JMdictRdng {
  reb: string;
  re_nokanji?: string;
  re_restr?: string | string[];
  re_inf?: JMdictRdngInf | JMdictRdngInf[];
  re_pri?: string | string[];
}

export interface JMdictSens {
  pos?: JMdictSensPos | JMdictSensPos[];
  field?: JMdictSensField | JMdictSensField[];
  misc?: JMdictSensMisc | JMdictSensMisc[];
  lsource?: JMdictSensLSrc | JMdictSensLSrc[];
  dial?: JMdictSensDial | JMdictSensDial[];
  gloss: string | JMdictSensGloss | Array<string | JMdictSensGloss>;

  /**
   * These elements, if present, indicate that the sense is restricted to the lexeme represented by the keb.
   */
  stagk?: string | string[];

  /**
   * These elements, if present, indicate that the sense is restricted to the lexeme represented by the reb.
   */
  stagr?: string | string[];

  /**
   * This element is used to indicate another entry which is an antonym of the current entry/sense.
   * The content of this element must exactly match that of a keb or reb element in another entry.
   */
  ant?: string | string[];

  /**
   * This element is used to indicate a cross-reference to another entry with a similar or related meaning or sense.
   * This element is typically a keb or reb element in another entry.
   * In some cases a keb will be followed by a reb and/or a sense number to provide a precise target for the cross-reference.
   * Where this happens, a JIS "centre-dot" (0x2126) is placed between the components of the cross-reference.
   */
  xref?: string | string[];

  /**
   * The sense-information elements provided for additional information to be recorded about a sense.
   * Typical usage would be to indicate such things as level of currency of a sense, the regional variations, etc.
   */
  s_inf?: string;
}

/**
 * This element records the information about the source language(s) of a loan-word/gairaigo.
 * If the source language is other than English, the language is indicated by the xml:lang attribute.
 * The element value (if any) is the source word or phrase.
 */
export interface JMdictSensLSrc {
  value: string;

  /**
   * The xml:lang attribute defines the language(s) from which a loanword is drawn.
   * It will be coded using the three-letter language code from the ISO 639-2 standard.
   * When absent, the value "eng" (i.e. English) is the default value.
   * The bibliographic (B) codes are used.
   */
  lang?: JMdictSensLSourceLang;

  /**
   * The ls_type attribute indicates whether the lsource element fully or partially describes the source word or phrase of the loanword.
   * If absent, it will have the implied value of "full".
   * Otherwise it will contain "part".
   */
  ls_type?: 'part';

  /**
   * The ls_wasei attribute indicates that the Japanese word has been constructed from words in the source language,
   * and not from an actual phrase in that language.
   * Most commonly used to indicate "waseieigo".
   */
  ls_wasei?: 'y';
}

export interface JMdictSensGloss {
  value: string;
  lang?: JMdictSensGlossLang;
  g_type: JMdictSensGlossType | undefined;
}

export type JMdictKanjiInf = 'ateji' | 'rK' | 'io' | 'ik' | 'iK' | 'oK';

export type JMdictRdngInf = 'ok' | 'ik' | 'gikun';

export type JMdictSensGlossLang =
  | 'dut'
  | 'ger'
  | 'rus'
  | 'spa'
  | 'hun'
  | 'swe'
  | 'fre'
  | 'slv';

export type JMdictSensGlossType = 'expl' | 'lit' | 'tm' | 'fig';

/**
 * For words specifically associated with regional dialects in Japanese, the entity code for that dialect, e.g. ksb for Kansaiben.
 */
export type JMdictSensDial =
  | 'ksb'
  | 'tsb'
  | 'kyb'
  | 'ktb'
  | 'thb'
  | 'kyu'
  | 'osb'
  | 'bra'
  | 'hob'
  | 'rkb'
  | 'tsug'
  | 'nab';

/**
 * Part-of-speech information about the entry/sense.
 * Should use appropriate entity codes.
 * In general where there are multiple senses in an entry, the part-of-speech of an earlier sense will apply to later senses unless there is a new part-of-speech indicated.
 */
export type JMdictSensPos =
  | 'int'
  | 'unc'
  | 'n'
  | 'exp'
  | 'adjNa'
  | 'adjNo'
  | 'adjI'
  | 'v5u'
  | 'vt'
  | 'pn'
  | 'adv'
  | 'advTo'
  | 'vs'
  | 'adjPn'
  | 'v1'
  | 'vi'
  | 'v5s'
  | 'v5k'
  | 'v5r'
  | 'v5aru'
  | 'auxV'
  | 'adjF'
  | 'conj'
  | 'prt'
  | 'v5m'
  | 'nSuf'
  | 'v5g'
  | 'v5rI'
  | 'suf'
  | 'adjT'
  | 'vsI'
  | 'adjIx'
  | 'aux'
  | 'cop'
  | 'pref'
  | 'vk'
  | 'auxAdj'
  | 'nPref'
  | 'ctr'
  | 'num'
  | 'vsS'
  | 'adjShiku'
  | 'v5t'
  | 'v5b'
  | 'v5kS'
  | 'vz'
  | 'v2mS'
  | 'vsC'
  | 'v1S'
  | 'v4r'
  | 'v5n'
  | 'vn'
  | 'adjKu'
  | 'vUnspec'
  | 'v4m'
  | 'v2rK'
  | 'v2rS'
  | 'v5uS'
  | 'vr'
  | 'v4s'
  | 'adjNari'
  | 'v2tK'
  | 'v4h'
  | 'v4g'
  | 'v2hS'
  | 'v4k'
  | 'v2gS'
  | 'v2aS'
  | 'v4b'
  | 'v2yS'
  | 'v4t'
  | 'v2dS'
  | 'v2yK'
  | 'v2kK'
  | 'v2kS'
  | 'v2gK'
  | 'v2bK'
  | 'v2sS'
  | 'v2zS'
  | 'v2tS'
  | 'v2nS'
  | 'v2wS'
  | 'v2hK';

/**
 * Information about the field of application of the entry/sense.
 * When absent, general application is implied.
 * Entity coding for specific fields of application.
 */
export type JMdictSensField =
  | 'food'
  | 'baseb'
  | 'fish'
  | 'med'
  | 'hanaf'
  | 'physics'
  | 'mA'
  | 'sumo'
  | 'shogi'
  | 'sports'
  | 'bot'
  | 'christn'
  | 'comp'
  | 'golf'
  | 'chem'
  | 'music'
  | 'ling'
  | 'math'
  | 'astron'
  | 'photo'
  | 'logic'
  | 'finc'
  | 'electr'
  | 'gramm'
  | 'aviat'
  | 'grmyth'
  | 'phil'
  | 'cards'
  | 'print'
  | 'econ'
  | 'geol'
  | 'vidg'
  | 'bus'
  | 'tradem'
  | 'pharm'
  | 'biol'
  | 'elec'
  | 'cloth'
  | 'mahj'
  | 'mil'
  | 'genet'
  | 'archeol'
  | 'anat'
  | 'archit'
  | 'law'
  | 'rail'
  | 'zool'
  | 'stat'
  | 'buddh'
  | 'shinto'
  | 'art'
  | 'telec'
  | 'met'
  | 'geom'
  | 'physiol'
  | 'go'
  | 'engr'
  | 'geogr'
  | 'psych'
  | 'biochem'
  | 'horse'
  | 'ent'
  | 'kabuki'
  | 'pathol'
  | 'cryst'
  | 'gardn'
  | 'psy'
  | 'agric'
  | 'paleo'
  | 'ornith'
  | 'audvid'
  | 'mech'
  | 'ecol'
  | 'dent'
  | 'politics';

/**
 * This element is used for other relevant information about the entry/sense.
 * As with part-of-speech, information will usually	apply to several senses.
 */
export type JMdictSensMisc =
  | 'abbr'
  | 'id'
  | 'obs'
  | 'uk'
  | 'col'
  | 'euph'
  | 'onMim'
  | 'arch'
  | 'hon'
  | 'fem'
  | 'chn'
  | 'sl'
  | 'fam'
  | 'male'
  | 'vulg'
  | 'derog'
  | 'pol'
  | 'joc'
  | 'hum'
  | 'rare'
  | 'form'
  | 'dated'
  | 'proverb'
  | 'netSl'
  | 'hist'
  | 'sens'
  | 'quote'
  | 'person'
  | 'place'
  | 'yoji'
  | 'poet'
  | 'leg'
  | 'work'
  | 'mSl'; // ISO 639-2T

export type JMdictSensLSourceLang =
  | 'por'
  | 'spa'
  | 'kor'
  | 'chi'
  | 'ger'
  | 'fre'
  | 'eng'
  | 'ain'
  | 'lat'
  | 'swa'
  | 'grc'
  | 'ita'
  | 'rus'
  | 'dut'
  | 'afr'
  | 'gre'
  | 'per'
  | 'ara'
  | 'haw'
  | 'epo'
  | 'swe'
  | 'heb'
  | 'san'
  | 'ind'
  | 'est'
  | 'mon'
  | 'fin'
  | 'may'
  | 'tur'
  | 'hin'
  | 'dan'
  | 'nor'
  | 'ukr'
  | 'pol'
  | 'tha'
  | 'tgl'
  | 'rum'
  | 'mol'
  | 'bul'
  | 'khm'
  | 'tib'
  | 'vie'
  | 'arn'
  | 'tah'
  | 'hun'
  | 'alg'
  | 'bur'
  | 'yid'
  | 'bnt'
  | 'fil'
  | 'urd'
  | 'som'
  | 'mnc'
  | 'bre'
  | 'kur'
  | 'chn'
  | 'mal'
  | 'amh'
  | 'tam'
  | 'mao'
  | 'glg'
  | 'cze'
  | 'slv'
  | 'geo'
  | 'ice'
  | 'slo'
  | 'scr'
  | undefined; // ISO 639-2T
