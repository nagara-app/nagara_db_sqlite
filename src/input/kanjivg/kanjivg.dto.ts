export interface KanjiVG {
  literal: string;
  hexcode: string;
  strokes: KanjiVGStroke[];
  compGroup: KanjiVGComponents[];
}

export interface KanjiVGStroke {
  path: string;
  x: string;
  y: string;
}

export interface KanjiVGComponents {
  el: string;
  comp?: KanjiVGComponents[];
}
