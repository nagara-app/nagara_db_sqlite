// Documentation
// http://www.edrdg.org/kanjidic/kanjidic2_dtdh.html

export interface Kanjidic2 {
    header: Header;
    character: Character[];
}

interface Header {
    file_version: string;
    database_version: string;
    date_of_creation: string;
}

interface Character {
    literal: string;
    codepoint: Codepoint;
    radical: Radical;
    misc: Misc;
    dic_number?: DicNumber;
    query_code?: QueryCode;
    reading_meaning?: ReadingMeaning;
}

interface Codepoint {
    cp_value: CodepointValue[];
}

interface CodepointValue {
    value: string;
    cp_type: string;
}

interface Radical {
    rad_value: RadicalValue | RadicalValue[];
}

interface RadicalValue {
    value: string;
    rad_type: string;
}

interface Misc {
    grade?: string;
    stroke_count: string | string[];
    variant?: Variant | Variant[];
    freq?: string;
    rad_name?: string | string[];
    jlpt?: string;
}

interface Variant {
    value: string;
    var_type: string;
}

interface DicNumber {
    dic_ref: DicRef | DicRef[];
}

interface DicRef {
    value: string;
    dr_type: string;
    m_vol?: string;
    m_page?: string;
}

interface QueryCode {
    q_code: QCode | QCode[]
}

interface QCode {
    value: string;
    qc_type: string;
    skip_misclass?: string;
}

interface ReadingMeaning {
    rmgroup?: RMGroup;
    nanori?: string | string[];
}

interface RMGroup {
    reading?: Reading | Reading[];
    meaning?: Array<string | Meaning>
}

interface Reading {
    value: string;
    r_type: string;
}

interface Meaning {
    value: string;
    m_lang: string;
}
