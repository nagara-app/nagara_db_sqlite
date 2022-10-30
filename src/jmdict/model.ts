// Documentation
// https://www.edrdg.org/jmdict/jmdict_dtd_h.html

export interface JMDict {
    entry: Entr[];
}

interface Entr {
    ent_seq: string;
    k_ele?: Kanji | Kanji[];
    r_ele: Rdng | Rdng[];
    sense: Sens | Sens[];
}

interface Kanji {
    keb: string;
    ke_inf?: string | string[];
    ke_pri?: string | string[];
}

interface Rdng {
    reb: string;
    re_nokanji?: string;
    re_rest?: string | string[];
    re_inf?: string | string[];
    re_pri?: string | string[];
}

interface Sens {
    stagk?: string | string[];
    stagr?: string | string[];
    ant?: string | string[];
    xref?: string | string[];
    pos?: string | string[];
    field?: string | string[];
    misc?: string | string[];
    lsource?: LSrc | LSrc[];
    dial?: string | string[];
    gloss?: string | Gloss | Array<string | Gloss>;
    s_inf?: string;
}

interface LSrc {
    value: string;
    lang: string;
    ls_type?: string;
    ls_wasei?: string;
}

interface Gloss {
    value: string;
    lang?: string;
    g_type?: string;
}