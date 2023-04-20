export interface KanjiVG {
  kanjiHexcode: string;
  strokes: KanjiVGStroke[];
}

export interface KanjiVGStroke {
  path: string;
  x: string;
  y: string;
}
