import type {Keywords} from 'tkdb-helper';

export const KEYWORDS: Keywords = {
  jlpt: {
    1: 'JLPT N1',
    2: 'JLPT N2',
    3: 'JLPT N3',
    4: 'JLPT N4',
    5: 'JLPT N5',
  },
  kanjiGrade: {
    1: 'Kyouiku 1st grade',
    2: 'Kyouiku 2nd grade',
    3: 'Kyouiku 3rd grade',
    4: 'Kyouiku 4th grade',
    5: 'Kyouiku 5th grade',
    6: 'Kyouiku 6th grade',
    8: 'Jouyou',
    9: 'Jinmeiyou 1',
    10: 'Jinmeiyou 2',
  },
  wordMeaningDial: {
    bra: 'Brazilian', // Brazilian
    hob: 'Hokkaido-ben', // Hokkaido-ben
    ksb: 'Kansai-ben', // Kansai-ben
    ktb: 'Kantō-ben', // Kantou-ben
    kyb: 'Kyoto-ben', // Kyoto-ben
    kyu: 'Kyūshū-ben', // Kyuushuu-ben
    nab: 'Nagano-ben', // Nagano-ben
    osb: 'Ōsaka-ben', // Osaka-ben
    rkb: 'Ryūkyū-ben', // Ryuukyuu-ben
    thb: 'Tōhoku-ben', // Touhoku-ben
    tsb: 'Tosa-ben', // Tosa-ben
    tsug: 'Tsugaru-ben', // Tsugaru-ben
  },
  wordMeaningField: {
    agric: 'agriculture',
    anat: 'anatomical',
    archeol: 'archeology',
    archit: 'architecture',
    art: 'art',
    astron: 'astronomy',
    audvid: 'audiovisual',
    aviat: 'aviation',
    baseb: 'baseball',
    biochem: 'biochemistry',
    biol: 'biology',
    bot: 'botany',
    buddh: 'Buddhism',
    bus: 'business',
    cards: 'card games',
    chem: 'chemistry',
    christn: 'Christianity',
    cloth: 'clothing',
    comp: 'computer',
    cryst: 'crystallography',
    dent: 'dentistry',
    ecol: 'ecology',
    econ: 'economics',
    elec: 'electricity',
    electr: 'electronics',
    engr: 'engineering',
    ent: 'entomology',
    finc: 'finance',
    fish: 'fishing',
    food: 'food',
    gardn: 'gardening',
    genet: 'genetics',
    geogr: 'geography',
    geol: 'geology',
    geom: 'geometry',
    go: 'go (game)',
    golf: 'golf',
    gramm: 'grammar',
    grmyth: 'Greek mythology',
    hanaf: 'hanafuda (game)',
    horse: 'horse racing',
    kabuki: 'kabuki',
    law: 'law',
    ling: 'linguistics',
    logic: 'logic',
    mA: 'martial arts',
    mahj: 'mahjong',
    math: 'mathematics',
    mech: 'mechanical engineering',
    med: 'medicine',
    met: 'meteorology',
    mil: 'military',
    music: 'music',
    ornith: 'ornithology',
    paleo: 'paleontology',
    pathol: 'pathology',
    pharm: 'pharmacology',
    phil: 'philosophy',
    photo: 'photography',
    physics: 'physics',
    physiol: 'physiology',
    politics: 'politics',
    print: 'printing',
    psy: 'psychiatry',
    psych: 'psychology',
    rail: 'railway',
    shinto: 'Shinto',
    shogi: 'shogi',
    sports: 'sports',
    stat: 'statistics',
    sumo: 'sumo',
    telec: 'telecommunications',
    tradem: 'trademark',
    vidg: 'video games',
    zool: 'zoology',
  },
  wordMeaningGlossType: {
    expl: 'Explanatory',
    fig: 'Figuratively',
    lit: 'Literal',
    tm: 'Literally',
  },
  wordMeaningMisc: {
    mSl: 'manga slang',
    netSl: 'internet slang',
    onMim: 'onomatopoeic', // , onomatopoeic or mimetic word
    abbr: 'abbreviation',
    arch: 'archaic',
    chn: "children's language",
    col: 'colloquialism',
    dated: 'dated', // dated term
    derog: 'derogatory',
    euph: 'euphemistic',
    fam: 'familiar language',
    fem: 'female', // female term or language
    form: 'formal', // formal or literary term
    hist: 'historical', // historical term
    hon: 'honorific', // honorific or respectful (sonkeigo) language
    hum: 'humble', // humble (kenjougo) language
    id: 'idiom', // idiomatic expression
    joc: 'humorous', // jocular, humorous term
    leg: 'legend',
    male: 'male', // male term or language
    obs: 'obsolute', // obsolete term
    person: 'person name', // name of a particular person
    place: 'place name',
    poet: 'poetical',
    pol: 'polite', // polite (teineigo) language
    proverb: 'proverb',
    quote: 'quotation',
    rare: 'rare',
    sens: 'sensitive',
    sl: 'slang',
    uk: 'usually written in kana', // word usually written using kana alone
    vulg: 'vulgar', // vulgar expression or word
    work: 'work', // work of art, literature, music, etc. name
    yoji: 'yojijukugo',
  },
  wordMeaningPos: {
    adjF: 'Pre-noun adjective', // 'noun or verb acting prenominally
    adjI: 'Adjective (い)', // adjective (keiyoushi)
    adjIx: 'Adjective (よい/いい)', // adjective (keiyoushi) - yoi/ii class // no entry
    adjKu: 'Adjective (く)', // "ku" adjective (archaic)
    adjNa: 'Adjective (な)', // adjectival nouns or quasi-adjectives (keiyodoshi)
    adjNari: 'Adjective (なり)', // archaic/formal form of na-adjective
    adjNo: 'Adjective (の)', // nouns which may take the genitive case particle "no"
    adjPn: 'Pre-noun adjective', // pre-noun adjectival (rentaishi)
    adjShiku: 'Adjective (しく)', // "shiku" adjective (archaic)
    adjT: 'Adjective (たる)', // "taru" adjective // ignored
    adv: 'Adverb', // adverb (fukushi)
    advTo: 'Adverb taking と particle', // adverb taking the "to" particle // ignored
    aux: 'Auxiliary', // auxiliary
    auxAdj: 'Auxiliary adjective', // auxiliary adjective
    auxV: 'Auxiliary verb', // auxiliary verb
    conj: 'Conjunction', // 'conjunction'
    cop: 'Copula', // copula // only one entry
    ctr: 'Counter', // counter
    exp: 'Expression', // expressions
    int: 'Interjection', // interjection (kandoushi)
    n: 'Noun', // noun (common) (futsuumeishi)
    nPref: 'Noun (prefix)', // noun, used as a prefix
    nSuf: 'Noun (suffix)', // noun, used as a suffix
    num: 'Numeric', // numeric
    pn: 'Pronoun', // pronoun
    pref: 'Prefix', // prefix
    prt: 'Particle', // particle
    suf: 'Suffix', // suffix
    unc: 'Unclassified', // unclassified // no entry
    v1: 'Verb (1-dan)', // ichidan verb
    v1S: 'Verb (1-dan, くれる)', // ichidan verb - kureru special class // no entry
    v2aS: 'Verb (2-dan, う)', // nidan verb with "u" ending (archaic)
    v2bK: 'Verb (2-dan, ぶ, formal)', // nidan verb (upper class) with "bu" ending (archaic)
    v2dS: 'Verb (2-dan, づ, informal)', // nidan verb (lower class) with "dzu" ending (archaic)
    v2gK: 'Verb (2-dan, ぐ, formal)', // nidan verb (upper class) with "gu" ending (archaic)
    v2gS: 'Verb (2-dan, ぐ, informal)', // nidan verb (lower class) with "gu" ending (archaic)
    v2hK: 'Verb (2-dan, ふ, formal)', // nidan verb (upper class) with "hu/fu" ending (archaic)
    v2hS: 'Verb (2-dan, ふ, informal)', // nidan verb (lower class) with "hu/fu" ending (archaic)
    v2kK: 'Verb (2-dan, く, formal)', // nidan verb (upper class) with "ku" ending (archaic)
    v2kS: 'Verb (2-dan, く, informal)', // nidan verb (lower class) with "ku" ending (archaic)
    v2mS: 'Verb (2-dan, む, informal)', // nidan verb (lower class) with "mu" ending (archaic)
    v2nS: 'Verb (2-dan, ぬ, informal)', // nidan verb (lower class) with "nu" ending (archaic)
    v2rK: 'Verb (2-dan, る, formal)', // nidan verb (upper class) with "ru" ending (archaic)
    v2rS: 'Verb (2-dan, る, informal)', // nidan verb (lower class) with "ru" ending (archaic)
    v2sS: 'Verb (2-dan, す, informal)', // nidan verb (lower class) with "su" ending (archaic)
    v2tK: 'Verb (2-dan, つ, formal)', // nidan verb (upper class) with "tsu" ending (archaic)
    v2tS: 'Verb (2-dan, つ, informal)', // nidan verb (lower class) with "tsu" ending (archaic)
    v2wS: 'Verb (2-dan, う, informal)', // nidan verb (lower class) with "u" ending and "we" conjugation (archaic)
    v2yK: 'Verb (2-dan, ゆ, formal)', // nidan verb (upper class) with "yu" ending (archaic)
    v2yS: 'Verb (2-dan, ゆ, informal)', // nidan verb (lower class) with "yu" ending (archaic)
    v2zS: 'Verb (2-dan, ず, informal)', // nidan verb (lower class) with "zu" ending (archaic)
    v4b: 'Verb (4-dan, ぶ)', // yodan verb with "bu" ending (archaic)
    v4g: 'Verb (4-dan, ぐ)', // yodan verb with "gu" ending (archaic)
    v4h: 'Verb (4-dan, ふ)', // yodan verb with "hu/fu" ending (archaic)
    v4k: 'Verb (4-dan, く)', // yodan verb with "ku" ending (archaic)
    v4m: 'Verb (4-dan, む)', // yodan verb with "mu" ending (archaic)
    v4r: 'Verb (4-dan, る)', // yodan verb with "ru" ending (archaic)
    v4s: 'Verb (4-dan, す)', // yodan verb with "su" ending (archaic)
    v4t: 'Verb (4-dan, つ)', // yodan verb with "tsu" ending (archaic)
    v5aru: 'Verb (5-dan, ある)', // godan verb - -aru special class
    v5b: 'Verb (5-dan, ぶ)', // godan verb with "bu" ending
    v5g: 'Verb (5-dan, ぐ)', // godan verb with "gu" ending
    v5k: 'Verb (5-dan, く)', // godan verb with "ku" ending
    v5kS: 'Verb (5-dan, いく/ゆく)', // godan verb - Iku/Yuku special class
    v5m: 'Verb (5-dan, む)', // godan verb with "mu" ending
    v5n: 'Verb (5-dan, ぬ)', // godan verb with "nu" ending
    v5r: 'Verb (5-dan, る)', // godan verb with "ru" ending
    v5rI: 'Verb (5-dan, る, irregular)', // godan verb with "ru" ending (irregular verb)
    v5s: 'Verb (5-dan, す)', // godan verb with "su" ending
    v5t: 'Verb (5-dan, つ)', // godan verb with "tsu" ending
    v5u: 'Verb (5-dan, う)', // godan verb with "u" ending
    v5uS: 'Verb (5-dan, う)', // godan verb with "u" ending (special class)
    vi: 'intransitive', // intransitive verb
    vk: 'Verb (くる, irregular)', // kuru verb - special class
    vn: 'Verb (ぬ, irregular)', // irregular nu verb
    vr: 'Verb (る, irregular)', // irregular ru verb, plain form ends with -ri
    vs: 'Verb (する)', // noun or participle which takes the aux. verb suru
    vsC: 'Verb (す)', // su verb - precursor to the modern suru
    vsI: 'Verb (する, irregular)', // suru verb - irregular
    vsS: 'Verb (する)', // suru verb - special class
    vt: 'Transitive', // transitive verb
    vUnspec: 'Verb (unspecified)', // verb unspecified
    vz: 'Verb (ずる)', // ichidan verb - zuru verb (alternative form of -jiru verbs)
  },
  wordKanjiInfo: {
    iK: 'irregular kanji', // word containing irregular kanji usage
    io: 'irregular okurigana', // irregular okurigana usage
    oK: 'out-dated kanji', // word containing out-dated kanji
    ik: 'irregular kana', // word containing irregular kana usage
    ateji: 'ateji', // ateji (phonetic) reading
    rK: 'rare form', // rarely-used kanji form
    // sK: 'search-only kanji form
  },
  wordKanaInfo: {
    gikun: 'gikun', // gikun (meaning as reading) or jukujikun (special kanji reading)
    ok: 'out-dated kana', // out-dated or obsolete kana usage
    ik: 'irregular kana', // 'word containing irregular kana usage
    // sk: 'search-only kana form',
  },
};
