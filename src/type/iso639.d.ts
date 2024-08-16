// https://www.loc.gov/standards/iso639-2/php/code_list.php

export interface Iso639 {
  iso6392t: Iso6392t;
  iso6392b: Iso6392b;
  iso6391: Iso6391;
  englishName: string;
  frenchName: string;
}

export type Iso6391 = string;
export type Iso6392t = string;
export type Iso6392b = string;
