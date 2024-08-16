// Documentation
// https://kanjivg.tagaini.net/svg-format.html

export interface KVG {
  kvg: string;
  kanji: KVGKanji[];
}

export interface KVGKanji {
  id: string;
  g: KVGKanjiGroup;
}

export interface KVGKanjiGroup {
  id: string;
  element: string;
  g?: KVGKanjiGroup | KVGKanjiGroup[];
  path?: KVGKanjiPath | KVGKanjiPath[];
  part?: string;
  variant?: string;
  radical?: string;
}

export interface KVGKanjiPath {
  id: string;
  d: string;
  type?: string;
}
