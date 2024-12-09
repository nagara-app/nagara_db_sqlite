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
    bra: {id: 1, description: 'Brazilian'}, // Brazilian
    hob: {id: 2, description: 'Hokkaido-ben'}, // Hokkaido-ben
    ksb: {id: 3, description: 'Kansai-ben'}, // Kansai-ben
    ktb: {id: 4, description: 'Kantō-ben'}, // Kantou-ben
    kyb: {id: 5, description: 'Kyoto-ben'}, // Kyoto-ben
    kyu: {id: 6, description: 'Kyūshū-ben'}, // Kyuushuu-ben
    nab: {id: 7, description: 'Nagano-ben'}, // Nagano-ben
    osb: {id: 8, description: 'Ōsaka-ben'}, // Osaka-ben
    rkb: {id: 9, description: 'Ryūkyū-ben'}, // Ryuukyuu-ben
    thb: {id: 10, description: 'Tōhoku-ben'}, // Touhoku-ben
    tsb: {id: 11, description: 'Tosa-ben'}, // Tosa-ben
    tsug: {id: 12, description: 'Tsugaru-ben'}, // Tsugaru-ben
  },
  wordMeaningField: {
    agric: {id: 1, description: 'agriculture'},
    anat: {id: 2, description: 'anatomical'},
    archeol: {id: 3, description: 'archeology'},
    archit: {id: 4, description: 'architecture'},
    art: {id: 5, description: 'art'},
    astron: {id: 6, description: 'astronomy'},
    audvid: {id: 7, description: 'audiovisual'},
    aviat: {id: 8, description: 'aviation'},
    baseb: {id: 9, description: 'baseball'},
    biochem: {id: 10, description: 'biochemistry'},
    biol: {id: 11, description: 'biology'},
    bot: {id: 12, description: 'botany'},
    boxing: {id: 13, description: 'boxing'},
    buddh: {id: 14, description: 'Buddhism'},
    bus: {id: 15, description: 'business'},
    cards: {id: 16, description: 'card games'},
    chem: {id: 17, description: 'chemistry'},
    chmyth: {id: 18, description: 'Chinese mythology'},
    christn: {id: 19, description: 'Christianity'},
    civeng: {id: 20, description: 'civil engineering'},
    cloth: {id: 21, description: 'clothing'},
    comp: {id: 22, description: 'computer'},
    cryst: {id: 23, description: 'crystallography'},
    dent: {id: 24, description: 'dentistry'},
    ecol: {id: 25, description: 'ecology'},
    econ: {id: 26, description: 'economics'},
    elec: {id: 27, description: 'electricity'},
    electr: {id: 28, description: 'electronics'},
    embryo: {id: 29, description: 'embryology'},
    engr: {id: 30, description: 'engineering'},
    ent: {id: 31, description: 'entomology'},
    figskt: {id: 32, description: 'figure skating'},
    film: {id: 33, description: 'film'},
    finc: {id: 34, description: 'finance'},
    fish: {id: 35, description: 'fishing'},
    food: {id: 36, description: 'food'},
    gardn: {id: 37, description: 'gardening'},
    genet: {id: 38, description: 'genetics'},
    geogr: {id: 39, description: 'geography'},
    geol: {id: 40, description: 'geology'},
    geom: {id: 41, description: 'geometry'},
    go: {id: 42, description: 'go (game)'},
    golf: {id: 43, description: 'golf'},
    gramm: {id: 44, description: 'grammar'},
    grmyth: {id: 45, description: 'Greek mythology'},
    hanaf: {id: 46, description: 'Hanafuda (game)'},
    horse: {id: 47, description: 'horse racing'},
    internet: {id: 48, description: 'internet'},
    jpmyth: {id: 49, description: 'Japanese mythology'},
    kabuki: {id: 50, description: 'kabuki'},
    law: {id: 51, description: 'law'},
    ling: {id: 52, description: 'linguistics'},
    logic: {id: 53, description: 'logic'},
    mA: {id: 54, description: 'martial arts'},
    mahj: {id: 55, description: 'mahjong'},
    manga: {id: 56, description: 'manga'},
    math: {id: 57, description: 'mathematics'},
    mech: {id: 58, description: 'mechanical engineering'},
    med: {id: 59, description: 'medicine'},
    met: {id: 60, description: 'meteorology'},
    mil: {id: 61, description: 'military'},
    min: {id: 62, description: 'mineralogy'},
    mining: {id: 63, description: 'mining'},
    motor: {id: 64, description: 'motorsport'},
    music: {id: 65, description: 'music'},
    noh: {id: 66, description: 'noh'},
    ornith: {id: 67, description: 'ornithology'},
    paleo: {id: 68, description: 'paleontology'},
    pathol: {id: 69, description: 'pathology'},
    pharm: {id: 70, description: 'pharmacology'},
    phil: {id: 71, description: 'philosophy'},
    photo: {id: 72, description: 'photography'},
    physics: {id: 73, description: 'physics'},
    physiol: {id: 74, description: 'physiology'},
    politics: {id: 75, description: 'politics'},
    print: {id: 76, description: 'printing'},
    prowres: {id: 77, description: 'professional wrestling'},
    psy: {id: 78, description: 'psychiatry'},
    psyanal: {id: 79, description: 'psychoanalysis'},
    psych: {id: 80, description: 'psychology'},
    rail: {id: 81, description: 'railway'},
    rommyth: {id: 82, description: 'Roman mythology'},
    shinto: {id: 83, description: 'Shinto'},
    shogi: {id: 84, description: 'shogi'},
    ski: {id: 85, description: 'skiing'},
    sports: {id: 86, description: 'sports'},
    stat: {id: 87, description: 'statistics'},
    stockm: {id: 88, description: 'stock market'},
    sumo: {id: 89, description: 'sumo'},
    surg: {id: 90, description: 'surgery'},
    telec: {id: 91, description: 'telecommunications'},
    tradem: {id: 92, description: 'trademark'},
    tv: {id: 93, description: 'television'},
    vet: {id: 94, description: 'veterinary'},
    vidg: {id: 95, description: 'video games'},
    zool: {id: 96, description: 'zoology'},
  },
  wordTranslationType: {
    expl: {id: 1, description: 'explanatory'},
    fig: {id: 2, description: 'figuratively'},
    lit: {id: 3, description: 'literally'},
    tm: {id: 4, description: 'trademark'},
  },
  wordMeaningMisc: {
    mSl: {id: 1, description: 'Manga slang'},
    netSl: {id: 2, description: 'Internet slang'},
    onMim: {id: 3, description: 'Onomatopoeic or mimetic word'},
    abbr: {id: 4, description: 'Abbreviation'},
    arch: {id: 5, description: 'Archaic term'},
    char: {id: 6, description: 'Character'},
    chn: {id: 7, description: "Children's language"},
    col: {id: 8, description: 'Colloquialism'},
    company: {id: 9, description: 'Company'},
    creat: {id: 10, description: 'Creature'},
    dated: {id: 11, description: 'Dated term'},
    dei: {id: 12, description: 'Deity'},
    derog: {id: 13, description: 'Derogatory term'},
    doc: {id: 14, description: 'Document'},
    euph: {id: 15, description: 'Euphemistic term'},
    ev: {id: 16, description: 'Event'},
    fam: {id: 17, description: 'Familiar language'},
    fem: {id: 18, description: 'Female-specific term or language'},
    fict: {id: 19, description: 'Fiction'},
    form: {id: 20, description: 'Formal or literary term'},
    given: {id: 21, description: 'Given name'},
    group: {id: 22, description: 'Group'},
    hist: {id: 23, description: 'Historical term'},
    hon: {id: 24, description: 'Honorific or respectful language (sonkeigo)'},
    hum: {id: 25, description: 'Humble language (kenjougo)'},
    id: {id: 26, description: 'Idiom or idiomatic expression'},
    joc: {id: 27, description: 'Humorous or jocular term'},
    leg: {id: 28, description: 'Legendary term or reference'},
    male: {id: 29, description: 'Male-specific term or language'},
    myth: {id: 30, description: 'Mythology'},
    obj: {id: 31, description: 'Object'},
    obs: {id: 32, description: 'Obsolete term'},
    organization: {id: 33, description: 'Organization name'},
    person: {id: 34, description: 'Person’s name'},
    place: {id: 35, description: 'Place name'},
    poet: {id: 36, description: 'Poetical term'},
    pol: {id: 37, description: 'Polite language (teineigo)'},
    product: {id: 38, description: 'Product name'},
    proverb: {id: 39, description: 'Proverb or proverbial expression'},
    quote: {id: 40, description: 'Quotation'},
    rare: {id: 41, description: 'Rare term'},
    sens: {id: 42, description: 'Sensitive term'},
    serv: {id: 43, description: 'Service'},
    ship: {id: 44, description: 'Ship name'},
    surname: {id: 45, description: 'Surname'},
    sl: {id: 46, description: 'Slang'},
    uk: {id: 47, description: 'Usually written in kana'},
    unclass: {id: 48, description: 'Unclassified name'},
    vulg: {id: 49, description: 'Vulgar expression or word'},
    work: {
      id: 50,
      description: 'Name of a work (art, literature, music, etc.)',
    },
    yoji: {id: 51, description: 'Yojijukugo (four-character idiom)'},
  },
  wordMeaningPos: {
    adjF: {id: 1, description: 'Pre-noun adjective'}, // 'noun or verb acting prenominally
    adjI: {id: 2, description: 'Adjective (い)'}, // adjective (keiyoushi)
    adjIx: {id: 3, description: 'Adjective (よい/いい)'}, // adjective (keiyoushi) - yoi/ii class
    adjKu: {id: 4, description: 'Adjective (く)'}, // "ku" adjective (archaic)
    adjNa: {id: 5, description: 'Adjective (な)'}, // adjectival nouns or quasi-adjectives (keiyodoshi)
    adjNari: {id: 6, description: 'Adjective (なり)'}, // archaic/formal form of na-adjective
    adjNo: {id: 7, description: 'Adjective (の)'}, // nouns which may take the genitive case particle "no"
    adjPn: {id: 8, description: 'Pre-noun adjective'}, // pre-noun adjectival (rentaishi)
    adjShiku: {id: 9, description: 'Adjective (しく)'}, // "shiku" adjective (archaic)
    adjT: {id: 10, description: 'Adjective (たる)'}, // "taru" adjective
    adv: {id: 11, description: 'Adverb'}, // adverb (fukushi)
    advTo: {id: 12, description: 'Adverb taking と particle'}, // adverb taking the "to" particle
    aux: {id: 13, description: 'Auxiliary'}, // auxiliary
    auxAdj: {id: 14, description: 'Auxiliary adjective'}, // auxiliary adjective
    auxV: {id: 15, description: 'Auxiliary verb'}, // auxiliary verb
    conj: {id: 16, description: 'Conjunction'}, // 'conjunction'
    cop: {id: 17, description: 'Copula'}, // copula
    ctr: {id: 18, description: 'Counter'}, // counter
    exp: {id: 19, description: 'Expression'}, // expressions
    int: {id: 20, description: 'Interjection'}, // interjection (kandoushi)
    n: {id: 21, description: 'Noun'}, // noun (common) (futsuumeishi)
    nPref: {id: 22, description: 'Noun (prefix)'}, // noun, used as a prefix
    nSuf: {id: 23, description: 'Noun (suffix)'}, // noun, used as a suffix
    num: {id: 24, description: 'Numeric'}, // numeric
    pn: {id: 25, description: 'Pronoun'}, // pronoun
    pref: {id: 26, description: 'Prefix'}, // prefix
    prt: {id: 27, description: 'Particle'}, // particle
    suf: {id: 28, description: 'Suffix'}, // suffix
    unc: {id: 29, description: 'Unclassified'}, // unclassified
    v1: {id: 30, description: 'Verb (1-dan)'}, // ichidan verb
    v1S: {id: 31, description: 'Verb (1-dan, くれる)'}, // ichidan verb - kureru special class
    v2aS: {id: 32, description: 'Verb (2-dan, う)'}, // nidan verb with "u" ending (archaic)
    v2bK: {id: 33, description: 'Verb (2-dan, ぶ, formal)'}, // nidan verb (upper class) with "bu" ending (archaic)
    v2dS: {id: 34, description: 'Verb (2-dan, づ, informal)'}, // nidan verb (lower class) with "dzu" ending (archaic)
    v2gK: {id: 35, description: 'Verb (2-dan, ぐ, formal)'}, // nidan verb (upper class) with "gu" ending (archaic)
    v2gS: {id: 36, description: 'Verb (2-dan, ぐ, informal)'}, // nidan verb (lower class) with "gu" ending (archaic)
    v2hK: {id: 37, description: 'Verb (2-dan, ふ, formal)'}, // nidan verb (upper class) with "hu/fu" ending (archaic)
    v2hS: {id: 38, description: 'Verb (2-dan, ふ, informal)'}, // nidan verb (lower class) with "hu/fu" ending (archaic)
    v2kK: {id: 39, description: 'Verb (2-dan, く, formal)'}, // nidan verb (upper class) with "ku" ending (archaic)
    v2kS: {id: 40, description: 'Verb (2-dan, く, informal)'}, // nidan verb (lower class) with "ku" ending (archaic)
    v2mS: {id: 41, description: 'Verb (2-dan, む, informal)'}, // nidan verb (lower class) with "mu" ending (archaic)
    v2nS: {id: 42, description: 'Verb (2-dan, ぬ, informal)'}, // nidan verb (lower class) with "nu" ending (archaic)
    v2rK: {id: 43, description: 'Verb (2-dan, る, formal)'}, // nidan verb (upper class) with "ru" ending (archaic)
    v2rS: {id: 44, description: 'Verb (2-dan, る, informal)'}, // nidan verb (lower class) with "ru" ending (archaic)
    v2sS: {id: 45, description: 'Verb (2-dan, す, informal)'}, // nidan verb (lower class) with "su" ending (archaic)
    v2tK: {id: 46, description: 'Verb (2-dan, つ, formal)'}, // nidan verb (upper class) with "tsu" ending (archaic)
    v2tS: {id: 47, description: 'Verb (2-dan, つ, informal)'}, // nidan verb (lower class) with "tsu" ending (archaic)
    v2wS: {id: 48, description: 'Verb (2-dan, う, informal)'}, // nidan verb (lower class) with "u" ending and "we" conjugation (archaic)
    v2yK: {id: 49, description: 'Verb (2-dan, ゆ, formal)'}, // nidan verb (upper class) with "yu" ending (archaic)
    v2yS: {id: 50, description: 'Verb (2-dan, ゆ, informal)'}, // nidan verb (lower class) with "yu" ending (archaic)
    v2zS: {id: 51, description: 'Verb (2-dan, ず, informal)'}, // nidan verb (lower class) with "zu" ending (archaic)
    v4b: {id: 52, description: 'Verb (4-dan, ぶ)'}, // yodan verb with "bu" ending (archaic)
    v4g: {id: 53, description: 'Verb (4-dan, ぐ)'}, // yodan verb with "gu" ending (archaic)
    v4h: {id: 54, description: 'Verb (4-dan, ふ)'}, // yodan verb with "hu/fu" ending (archaic)
    v4k: {id: 55, description: 'Verb (4-dan, く)'}, // yodan verb with "ku" ending (archaic)
    v4m: {id: 56, description: 'Verb (4-dan, む)'}, // yodan verb with "mu" ending (archaic)
    v4r: {id: 58, description: 'Verb (4-dan, る)'}, // yodan verb with "ru" ending (archaic)
    v4s: {id: 59, description: 'Verb (4-dan, す)'}, // yodan verb with "su" ending (archaic)
    v4t: {id: 60, description: 'Verb (4-dan, つ)'}, // yodan verb with "tsu" ending (archaic)
    v5aru: {id: 61, description: 'Verb (5-dan, ある)'}, // godan verb - -aru special class
    v5b: {id: 62, description: 'Verb (5-dan, ぶ)'}, // godan verb with "bu" ending
    v5g: {id: 63, description: 'Verb (5-dan, ぐ)'}, // godan verb with "gu" ending
    v5k: {id: 64, description: 'Verb (5-dan, く)'}, // godan verb with "ku" ending
    v5kS: {id: 65, description: 'Verb (5-dan, 行く)'}, // godan verb - iku/yuku special class
    v5m: {id: 66, description: 'Verb (5-dan, む)'}, // godan verb with "mu" ending
    v5n: {id: 67, description: 'Verb (5-dan, ぬ)'}, // godan verb with "nu" ending
    v5r: {id: 68, description: 'Verb (5-dan, る)'}, // godan verb with "ru" ending
    v5rI: {id: 69, description: 'Verb (5-dan, る irregular)'}, // godan verb with "ru" ending (irregular verb)
    v5s: {id: 70, description: 'Verb (5-dan, す)'}, // godan verb with "su" ending
    v5t: {id: 71, description: 'Verb (5-dan, つ)'}, // godan verb with "tsu" ending
    v5u: {id: 72, description: 'Verb (5-dan, う)'}, // godan verb with "u" ending
    v5uS: {id: 73, description: 'Verb (5-dan, う special)'}, // godan verb with "u" ending (special class)
    vi: {id: 76, description: 'Intransitive verb'}, // intransitive verb
    vk: {id: 77, description: 'Verb (くる)'}, // kuru verb - special class
    vn: {id: 78, description: 'Irregular nu verb'}, // irregular nu verb
    vr: {id: 79, description: 'Irregular ru verb'}, // irregular ru verb, plain form ends with "ri"
    vs: {id: 80, description: 'Suru verb'}, // noun or participle which takes the aux. verb suru
    vsC: {id: 81, description: 'Suru verb (する)'}, // su verb - precursor to the modern suru
    vt: {id: 82, description: 'Transitive verb'}, // transitive verb
    vz: {id: 83, description: 'Ichidan verb (ずる)'}, // ichidan verb - zuru verb (alternative form of -jiru verbs)
    vsI: {id: 84, description: 'Suru verb (included)'}, // suru verb - included
    vsS: {id: 85, description: 'Suru verb (special)'}, // suru verb - special class
  },
  wordFormInfo: {
    iK: {id: 1, description: 'irregular kanji'}, // word containing irregular kanji usage
    io: {id: 2, description: 'irregular okurigana'}, // irregular okurigana usage
    oK: {id: 3, description: 'out-dated kanji'}, // word containing out-dated kanji
    ik: {id: 4, description: 'irregular kana'}, // word containing irregular kana usage
    rK: {id: 5, description: 'rarely used kanji'}, // rarely used kanji form
    ateji: {id: 6, description: 'ateji'}, // ateji (phonetic) reading
    gikun: {id: 7, description: 'gikun'}, // gikun (meaning as reading) or jukujikun (special kanji reading)
    ok: {id: 8, description: 'out-dated kana'}, // out-dated or obsolete kana usage
    rk: {id: 9, description: 'rarely used kana'}, // rarely used kana form
  },
};
