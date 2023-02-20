import type { TanosVocab } from '../tanos_vocab/tanos_vocab.dto';

export interface JMdictJlpt {
  tanosVocab: TanosVocab;
  sequence: string;
  match: JMdictJlptMatch;
}

export enum JMdictJlptMatch {
  kanjiKana = 'kanjiKana',
  kanaMeaning = 'kanaMeaning',
  unmatched = 'unmatched',
  unkonwn = 'unkown',
  manual = 'manual',
}
