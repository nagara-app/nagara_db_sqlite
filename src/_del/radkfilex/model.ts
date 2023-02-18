// Documentation
// https://www.edrdg.org/krad/kradinf.html

export interface RadKFileX {
    entries: RadKFileXEntry[];
}

export interface RadKFileXEntry {
    radical: string;
    stroke_count: string;
    code?: string;
    kanji: string[]
}