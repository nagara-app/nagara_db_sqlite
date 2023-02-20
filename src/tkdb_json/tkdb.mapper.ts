import { isKanji } from 'wanakana';
import { Presets, SingleBar } from 'cli-progress';

import type { Options } from 'cli-progress';

import { Constants } from '../constants';
import { toArray } from '../utils';

import type {
  TKDB_Word,
  TKDB_Word_Meaning,
  TKDB_Tag_Word_Meaning_Dialect,
  TKDB_Tag_Word_Meaning_Field,
  TKDB_Word_Meaning_Gloss,
  TKDB_Tag_Lang,
  TKDB_Tag_Word_Meaning_Misc,
  TKDB_Tag_Word_Meaning_Pos,
  TKDB_Word_Meaning_Source,
  TKDB_Word_Misc,
  TKDB_Word_Reading,
} from './tkdb.model';
import type { JMdict, JMdictEntr, JMdictKanji, JMdictRdng, JMdictSens } from '../convert_input/jmdict/jmdict.dto';
import type { JMdictFurigana } from '../convert_input/jmdict_furigana/jmdict_furigana.dto';
import type { JMdictJlpt } from '../jmdict_jlpt_json/jmdict_jlpt.dto';

export class TKDBmapper {
  limiter?: number;

  jmdict: JMdict;
  jmdictFurigana: JMdictFurigana[];
  jmdictJlpt: JMdictJlpt[];

  constructor(limiter: number, jmdict: JMdict, jmdictFurigana: JMdictFurigana[], jmdictJlpt: JMdictJlpt[]) {
    this.limiter = limiter;
    this.jmdict = jmdict;
    this.jmdictFurigana = jmdictFurigana;
    this.jmdictJlpt = jmdictJlpt;
  }

  word(): TKDB_Word[] {
    const entries = this.limiter !== undefined ? this.jmdict.entry.slice(0, this.limiter) : this.jmdict.entry;
    const words: TKDB_Word[] = [];

    const progressOptions: Options = {
      hideCursor: true,
      etaBuffer: 10000,
    };

    console.log('Mapping jmdict entries to words…');
    const progressBar = new SingleBar(progressOptions, Presets.shades_classic);
    progressBar.start(entries.length, 0);
    let i = 1;

    for (const entry of entries) {
      progressBar.update(i);
      i++;

      const id = entry.ent_seq;
      const reading = this.wordReading(toArray(entry.k_ele), toArray(entry.r_ele));
      const meaning = this.wordMeaning(toArray(entry.sense));
      const misc = this.wordMisc(entry);

      words.push({
        id,
        reading,
        meaning,
        misc,
      });
    }
    progressBar.stop();

    return words;
  }

  private wordReading(jmKanjis: JMdictKanji[], jmReadings: JMdictRdng[]): TKDB_Word_Reading[] {
    const wordReading: TKDB_Word_Reading[] = [];

    jmReadings.sort((a, b) => {
      const aRest = toArray(a.re_restr);
      const bRest = toArray(b.re_restr);

      return bRest.length - aRest.length;
    });

    jmReadings.forEach((jmdictReading) => {
      const kana = jmdictReading.reb;
      const info = toArray(jmdictReading.re_inf);
      const common = this.isCommonWordReading(jmdictReading.re_pri);

      // When kanji element is present
      if (jmKanjis.length > 0) {
        // When reading has associated kanji
        if (jmdictReading.re_nokanji !== undefined) {
          wordReading.push({
            kana,
            common,
            info,
          });
        }

        // When reading has restrictions
        else if (jmdictReading.re_restr !== undefined) {
          const readingRestrictions = toArray(jmdictReading.re_restr);
          readingRestrictions.forEach((restriction) => {
            const jmdictKanjiFromRest = jmKanjis.find((a) => a.keb === restriction);

            const info = toArray(jmdictKanjiFromRest?.ke_inf);
            const common = this.isCommonWordReading(jmdictKanjiFromRest?.ke_pri);
            const furigana = toArray(
              this.jmdictFurigana.find((a) => a.text === restriction && a.reading === kana)?.furigana,
            );
            const uniqeKanji = this.getUniqueKanjis(jmdictKanjiFromRest?.keb);

            wordReading.push({
              kanji: restriction,
              furigana,
              uniqeKanji,
              kana,
              common,
              info,
            });

            jmKanjis = jmKanjis.filter((a) => a.keb !== restriction);
          });
        }

        // When reading has no associated kanji or restriction
        else {
          jmKanjis.forEach((a) => {
            const info = toArray(a.ke_inf);
            const common = this.isCommonWordReading(a.ke_pri);
            const furigana = toArray(this.jmdictFurigana.find((b) => b.text === a.keb && b.reading === kana)?.furigana);
            const uniqeKanji = this.getUniqueKanjis(a.keb);

            wordReading.push({
              kanji: a.keb,
              furigana,
              uniqeKanji,
              kana,
              common,
              info,
            });
          });
        }
      }

      // When kanji element is not present
      else {
        wordReading.push({
          kana,
          info,
          common,
        });
      }
    });

    return wordReading;
  }

  private isCommonWordReading(pri: string | string[] | undefined): boolean {
    if (pri === undefined) {
      return false;
    } else {
      const priArr = toArray(pri);
      return priArr.some((pri) => Constants.commonTags.includes(pri));
    }
  }

  private wordMeaning(jmSenses: JMdictSens[]): TKDB_Word_Meaning[] {
    const wordMeaning: TKDB_Word_Meaning[] = [];

    jmSenses.forEach((jmSense) => {
      const gloss: TKDB_Word_Meaning_Gloss[] = this.wordMeaningGloss(jmSense);
      const lang: TKDB_Tag_Lang = this.wordMeaningLang(jmSense);
      const pos: TKDB_Tag_Word_Meaning_Pos[] = toArray(jmSense.pos);
      const field: TKDB_Tag_Word_Meaning_Field[] = toArray(jmSense.field);
      const dialect: TKDB_Tag_Word_Meaning_Dialect[] = toArray(jmSense.dial);
      const misc: TKDB_Tag_Word_Meaning_Misc[] = toArray(jmSense.misc);
      const source: TKDB_Word_Meaning_Source[] = this.wordMeaningSource(jmSense);
      const info: string[] = toArray(jmSense.s_inf);
      const related: string[] = this.wordMeaningRelated(jmSense);

      wordMeaning.push({
        gloss,
        lang,
        pos,
        field,
        dialect,
        info,
        misc,
        source,
        related,
      });
    });

    return wordMeaning;
  }

  private wordMeaningGloss(jmSense: JMdictSens): TKDB_Word_Meaning_Gloss[] {
    const wordMeaningGloss: TKDB_Word_Meaning_Gloss[] = [];
    const jmdictSensGloss = toArray(jmSense.gloss);

    jmdictSensGloss.forEach((gloss) => {
      if (typeof gloss === 'string') {
        wordMeaningGloss.push({
          value: gloss,
        });
      } else {
        wordMeaningGloss.push({
          value: gloss.value,
          type: gloss.g_type,
        });
      }
    });
    return wordMeaningGloss;
  }

  private wordMeaningLang(jmSense: JMdictSens): TKDB_Tag_Lang {
    const jmdictSensGlossFirst = toArray(jmSense.gloss)[0];
    if (typeof jmdictSensGlossFirst === 'string') {
      // If type is string, gloss entry can be considered english without other properties
      return Constants.langCodeEnglish;
    } else {
      return jmdictSensGlossFirst?.lang ?? Constants.langCodeEnglish;
    }
  }

  private wordMeaningSource(jmSense: JMdictSens): TKDB_Word_Meaning_Source[] {
    const wordMeaningSource: TKDB_Word_Meaning_Source[] = [];

    const jmSenseLSrc = toArray(jmSense.lsource);

    jmSenseLSrc.forEach((lsrc) => {
      wordMeaningSource.push({
        lang: lsrc.lang,
        wasei: lsrc.ls_wasei !== undefined,
        full: lsrc.ls_type !== undefined,
        text: lsrc.value,
      });
    });

    return wordMeaningSource;
  }

  private wordMeaningRelated(jmSense: JMdictSens): string[] {
    /**
     * Examples:
     * - `"kanji・kana・senseIndex"` - refers to the word with specific reading and specific sense,
     * - `"kanjiOrKana・senseIndex"` - refers to a word with specific sense
     * - `"kanji・kana"` - refers to a word with specific reading and any sense
     * - `"kanjiOrKana"` - refers to a word with any sense
     */

    const related: string[] = [];
    const jmSenseXRefs = toArray(jmSense.xref);

    jmSenseXRefs.forEach((jmSenseXRef) => {
      const xrefItems = jmSenseXRef.split(Constants.jmdictXrefSeparator);

      // "kanjiOrKana" format
      if (xrefItems.length === 1) {
        const entry = this.getJmdictEntryByKanjiOrKana(xrefItems[0] ?? '');
        if (entry?.ent_seq !== undefined) related.push(entry?.ent_seq);
      } else if (xrefItems.length === 2) {
        const senseIndex = parseInt(xrefItems[1] ?? '');

        // "kanji・kana" format
        if (isNaN(senseIndex)) {
          const entry = this.getJmdictEntryByKanjiAndKana(xrefItems[0] ?? '', xrefItems[1] ?? '');
          if (entry?.ent_seq !== undefined) {
            related.push(entry?.ent_seq);
          }
        }

        // "kanjiOrKana・senseIndex"
        else {
          const entry = this.getJmdictEntryByKanjiOrKana(xrefItems[0] ?? '');
          if (entry?.ent_seq !== undefined) related.push(entry?.ent_seq);
        }
      }

      // "kanji・kana・senseIndex" format
      else if (xrefItems.length === 3) {
        const entry = this.getJmdictEntryByKanjiAndKana(xrefItems[0] ?? '', xrefItems[1] ?? '');
        if (entry?.ent_seq !== undefined) {
          related.push(entry?.ent_seq);
        }
      }
    });

    return related;
  }

  private getJmdictEntryByKanjiOrKana(kanjiOrKana: string): JMdictEntr | undefined {
    const entry = this.jmdict.entry.find((a) => {
      const jmdictKanjis = toArray(a.k_ele);
      const jmdictKanji = jmdictKanjis.find((b) => b.keb === kanjiOrKana);

      const jmdictReadings = toArray(a.r_ele);
      const jmdictReading = jmdictReadings.find((b) => b.reb === kanjiOrKana);

      // When kanji found, return true
      if (jmdictKanji !== undefined) {
        return true;
      }
      // When kanji not found, check if reading has a match
      else {
        if (jmdictReading !== undefined) {
          // When a kanji elements are available, the reading should have "no kanji" property
          if (a.k_ele !== undefined) {
            return jmdictReading.re_nokanji;
          } else {
            return true;
          }
        } else {
          return false;
        }
      }
    });
    return entry;
  }

  private getJmdictEntryByKanjiAndKana(kanji: string, kana: string): JMdictEntr | undefined {
    const entry = this.jmdict.entry.find((a) => {
      const jmdictKanjis = toArray(a.k_ele);
      const jmdcitKanji = jmdictKanjis.find((b) => b.keb === kanji);

      const jmdictReadings = toArray(a.r_ele);
      const jmdictReading = jmdictReadings.find((b) => b.reb === kana);

      return jmdcitKanji !== undefined && jmdictReading !== undefined;
    });
    return entry;
  }

  private wordMisc(jmEntry: JMdictEntr): TKDB_Word_Misc {
    const common = this.isCommonWord(jmEntry);
    const jlpt = this.jmdictJlpt.find((a) => a.sequence === jmEntry.ent_seq)?.tanosVocab.jlpt;

    return {
      common,
      jlpt,
    };
  }

  private getUniqueKanjis(kanjiReading?: string): string[] {
    const uniqeKanji: string[] = [];

    if (kanjiReading !== undefined) {
      kanjiReading.split('').forEach((char) => {
        if (!uniqeKanji.includes(char) && isKanji(char)) uniqeKanji.push(char);
      });
    }

    return uniqeKanji;
  }

  private isCommonWord(jmEntry: JMdictEntr): boolean {
    const jmKanjis = toArray(jmEntry.k_ele);
    const jmReadings = toArray(jmEntry.r_ele);

    let common = jmKanjis.some((a) => this.isCommonWordReading(a.ke_pri));
    common = !common ? jmReadings.some((a) => this.isCommonWordReading(a.re_pri)) : false;

    return common;
  }
}
