export interface Radicalx {
    number: number,
    _literal?: string,
    literal: string,
    stroke_count: number,
    variant: RadicalxVariant[],
    meaning: string[],
    reading: string[],
    notes?: string,
}

export interface RadicalxVariant {
    _literal?: string,
    literal: string,
    stroke_count: number
}