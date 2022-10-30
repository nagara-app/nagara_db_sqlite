export interface Antonym {
    kanji: string,
    antonyms: string
}

export interface Lookalike {
    kanji: string,
    similar: string
}

export interface Synonym {
    kanji: string,
    synonyms: string
}

export interface Radical {
    radical: string,
    radvar?: string,
    number: number,
    strokes: number,
    names: string,
    meaning: string,
    notes?: string
}

export interface Radvar {
    radvar: string,
    radical: string,
    number: number,
    strokes: number,
    names: string,
    meaning: string,
    notes?: string
}