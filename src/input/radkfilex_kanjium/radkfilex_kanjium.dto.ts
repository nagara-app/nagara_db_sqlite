import type { TKDB_Radical } from '../../tkdb_json/tkdb.model';

export interface RadkfilexKanjium {
  radkfilexRadical: string;
  radical?: TKDB_Radical;
  kanji?: string;
  component?: string;
  match: boolean;
}
