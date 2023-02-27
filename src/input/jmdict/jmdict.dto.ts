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
  re_inf?: JMdcitRdngInf | JMdcitRdngInf[];
  re_pri?: string | string[];
}

export interface JMdictSens {
  stagk?: string | string[];
  stagr?: string | string[];
  ant?: string | string[];
  xref?: string | string[];
  pos?: JMdictSensPos | JMdictSensPos[];
  field?: JMdictSensField | JMdictSensField[];
  misc?: JMdictSensMisc | JMdictSensMisc[];
  lsource?: JMdictSensLSrc | JMdictSensLSrc[];
  dial?: JMdictSensDial | JMdictSensDial[];
  gloss?: string | JMdictSensGloss | Array<string | JMdictSensGloss>;
  s_inf?: string;
}

export interface JMdictSensLSrc {
  value: string;
  lang?: JMdictSensLSourceLang;
  ls_type?: 'part';
  ls_wasei?: 'y';
}

export interface JMdictSensGloss {
  value: string;
  lang?: JMdictSensGlossLang;
  g_type: JMdictSensGlossType | undefined;
}

export type JMdictKanjiInf = 'ateji' | 'rK' | 'io' | 'ik' | 'iK' | 'oK';

export type JMdcitRdngInf = 'ok' | 'ik' | 'gikun';

export type JMdictSensGlossLang = 'dut' | 'ger' | 'rus' | 'spa' | 'hun' | 'swe' | 'fre' | 'slv';

export type JMdictSensGlossType = 'expl' | 'lit' | 'tm' | 'fig';

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

export type JMdictSensField =
  | 'food'
  | 'baseb'
  | 'fish'
  | 'med'
  | 'hanaf'
  | 'physics'
  | 'ma'
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
