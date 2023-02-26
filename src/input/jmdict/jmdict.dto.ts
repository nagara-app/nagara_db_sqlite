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
  | 'unc'
  | 'n'
  | 'exp'
  | 'adj-na'
  | 'adj-no'
  | 'adj-i'
  | 'v5u'
  | 'vt'
  | 'pn'
  | 'adv'
  | 'adv-to'
  | 'vs'
  | 'adj-pn'
  | '∫'
  | 'v1'
  | 'vi'
  | 'v5s'
  | 'v5k'
  | 'v5r'
  | 'v5aru'
  | 'aux-v'
  | 'adj-f'
  | 'conj'
  | 'prt'
  | 'v5m'
  | 'n-suf'
  | 'v5g'
  | 'v5r-i'
  | 'suf'
  | 'adj-t'
  | 'vs-i'
  | 'adj-ix'
  | 'aux'
  | 'cop'
  | 'pref'
  | 'vk'
  | 'aux-adj'
  | 'n-pref'
  | 'ctr'
  | 'num'
  | 'vs-s'
  | 'adj-shiku'
  | 'v5t'
  | 'v5b'
  | 'v5k-s'
  | 'vz'
  | 'v2m-s'
  | 'vs-c'
  | 'v1-s'
  | 'v4r'
  | 'v5n'
  | 'vn'
  | 'adj-ku'
  | 'v-unspec'
  | 'v4m'
  | 'v2r-k'
  | 'v2r-s'
  | 'v5u-s'
  | 'vr'
  | 'v4s'
  | 'adj-nari'
  | 'v2t-k'
  | 'v4h'
  | 'v4g'
  | 'v2h-s'
  | 'v4k'
  | 'v2g-s'
  | 'v2a-s'
  | 'v4b'
  | 'v2y-s'
  | 'v4t'
  | 'v2d-s'
  | 'v2y-k'
  | 'v2k-k'
  | 'v2k-s'
  | 'v2g-k'
  | 'v2b-k'
  | 'v2s-s'
  | 'v2z-s'
  | 'v2t-s'
  | 'v2n-s'
  | 'v2w-s'
  | 'v2h-k';

export type JMdictSensField =
  | 'food'
  | 'baseb'
  | 'fish'
  | 'med'
  | 'hanaf'
  | 'physics'
  | 'MA'
  | 'sumo'
  | 'shogi'
  | 'sports'
  | 'bot'
  | 'Christn'
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
  | 'Buddh'
  | 'Shinto'
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
  | 'on-mim'
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
  | 'net-sl'
  | 'hist'
  | 'sens'
  | 'quote'
  | 'person'
  | 'place'
  | 'yoji'
  | 'poet'
  | 'leg'
  | 'work'
  | 'm-sl'; // ISO 639-2T

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
