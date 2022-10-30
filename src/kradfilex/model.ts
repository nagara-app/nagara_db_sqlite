// Documentation
// https://www.edrdg.org/krad/kradinf.html

export interface KRadFileX {
    entries: KRadFileXEntry[];
}

export interface KRadFileXEntry {
    literal: string;
    parts: string[]
}