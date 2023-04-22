import { isKanji } from 'wanakana';
import { Presets, SingleBar } from 'cli-progress';

import type { Options } from 'cli-progress';

import { CONSTANTS } from '../constants';
import { KEYWORDS } from '../keywords';

import { getDate, toArray, toKvgHex } from '../utils';
import { TKDB_Kanji_Part_Type } from './tkdb.model';

import type {
  TKDB_Word,
  TKDB_Word_Meaning,
  TKDB_Keyword_Word_Meaning_Dialect,
  TKDB_Keyword_Word_Meaning_Field,
  TKDB_Word_Meaning_Gloss,
  TKDB_Keyword_Word_Meaning_Misc,
  TKDB_Keyword_Word_Meaning_Pos,
  TKDB_Word_Meaning_Source,
  TKDB_Word_Misc,
  TKDB_Word_Reading,
  TKDB_Kanji,
  TKDB_Kanji_Codepoint,
  TKDB_Kanji_Querycode,
  TKDB_Kanji_Dicref,
  TKDB_Kanji_Misc,
  TKDB_Keyword_Kanji_Grade,
  TKDB_Kanji_Meaning,
  TKDB_Kanji_Reading,
  TKDB_Kanji_Part,
  TKDB,
  TKDB_Radical,
  TKDB_Kanji_Stroke,
} from './tkdb.model';

import type { JMdict, JMdictEntr, JMdictKanji, JMdictRdng, JMdictSens } from '../input/jmdict/jmdict.dto';
import type { JMdictFurigana } from '../input/jmdict_furigana/jmdict_furigana.dto';
import type { JMdictJlpt } from '../input/jmdict_jlpt/jmdict_jlpt.dto';
import type {
  Kanjidic2,
  Kanjidic2Char,
  Kanjidic2CharCpEntr,
  Kanjidic2CharDicNumDicRef,
  Kanjidic2CharMiscVar,
  Kanjidic2CharQcodeEntr,
  Kanjidic2CharRdngMng,
  Kanjidic2CharRdngMngGrpMng,
  Kanjidic2MiscGrade,
} from '../input/kanjidic2/kanjidic2.dto';
import type { TanosKanji } from '../input/tanos_kanji/tanos_kanji.dto';
import type { KanjiumAntonym } from '../input/kanjium_antonym/kanjium_antonym.dto';
import type { KanjiumSynonym } from '../input/kanjium_synonym/kanjium_synonym.dto';
import type { KanjiumLookalike } from '../input/kanjium_lookalike/kanjium_lookalike.dto';
import type { Iso639 } from '../input/iso639/iso639.dto';
import type { Kradfilex } from '../input/kradfilex/kradfilex.dto';
import type { RadkfilexKanjium } from '../input/radkfilex_kanjium/radkfilex_kanjium.dto';
import type { KanjiVG } from '../input/kanjivg/kanjivg.dto';

export class TKDBmapper {
  limiter: number | undefined;

  jmdict: JMdict;
  jmdictFurigana: JMdictFurigana[];
  jmdictJlpt: JMdictJlpt[];

  kanjidic2: Kanjidic2;
  tanosKanji: TanosKanji[];
  kanjiumAntonym: KanjiumAntonym[];
  kanjiumSynonym: KanjiumSynonym[];
  kanjiumLookalike: KanjiumLookalike[];
  kradfilex: Kradfilex[];
  radkfilexKanjium: RadkfilexKanjium[];
  kanjivg: KanjiVG[];

  iso639: Iso639[];

  constructor(
    limiter: number | undefined,
    jmdict: JMdict,
    jmdictFurigana: JMdictFurigana[],
    jmdictJlpt: JMdictJlpt[],
    kanjidic2: Kanjidic2,
    tanosKanji: TanosKanji[],
    kanjiumAntonym: KanjiumAntonym[],
    kanjiumSynonym: KanjiumSynonym[],
    kanjiumLookalike: KanjiumLookalike[],
    kradfilex: Kradfilex[],
    radkfilexKanjium: RadkfilexKanjium[],
    kanjivg: KanjiVG[],
    iso639: Iso639[],
  ) {
    this.limiter = limiter;
    this.jmdict = jmdict;
    this.jmdictFurigana = jmdictFurigana;
    this.jmdictJlpt = jmdictJlpt;
    this.kanjidic2 = kanjidic2;
    this.tanosKanji = tanosKanji;
    this.kanjiumAntonym = kanjiumAntonym;
    this.kanjiumSynonym = kanjiumSynonym;
    this.kanjiumLookalike = kanjiumLookalike;
    this.kradfilex = kradfilex;
    this.radkfilexKanjium = radkfilexKanjium;
    this.kanjivg = kanjivg;
    this.iso639 = iso639;
  }

  //
  // Init
  //

  init(): TKDB {
    const version = CONSTANTS.version;
    const dateOfCreation = getDate();
    const radicals = this.radicals();
    const kanji = this.kanji();
    const words = this.words();
    const keywords = KEYWORDS;

    this.iso639.forEach((lang) => {
      keywords.lang[lang.iso6392t] = lang.englishName;
    });

    return {
      version,
      dateOfCreation,
      keywords,
      radicals,
      kanji,
      words,
    };
  }

  //
  // Radical mappings
  //

  private radicals(): TKDB_Radical[] {
    const radicals: TKDB_Radical[] = [];

    for (const radkfilexKanjiumEntry of this.radkfilexKanjium) {
      if (radkfilexKanjiumEntry.radical !== undefined) {
        radicals.push(radkfilexKanjiumEntry.radical);
      }
    }

    return radicals;
  }

  //
  // Kanji mappings
  //

  private kanji(): TKDB_Kanji[] {
    const kanji: TKDB_Kanji[] = [];
    const charaters =
      this.limiter !== undefined ? this.kanjidic2.character.slice(0, this.limiter) : this.kanjidic2.character;

    const progressOptions: Options = {
      hideCursor: true,
      etaBuffer: 10000,
    };

    console.log('Mapping kanjidic2 entries to kanji …');
    const progressBar = new SingleBar(progressOptions, Presets.shades_classic);
    progressBar.start(charaters.length, 0);
    let i = 1;

    for (const character of charaters) {
      progressBar.update(i);
      i++;

      const literal = character.literal;
      const reading = this.kanjiReading(character.reading_meaning);
      const meaning = this.kanjiMeaning(toArray(character.reading_meaning?.rmgroup?.meaning));
      const part = this.kanjiPart(literal);
      const misc = this.kanjiMisc(character);

      kanji.push({
        literal,
        reading,
        meaning,
        part,
        misc,
      });
    }
    progressBar.stop();

    return kanji;
  }

  private kanjiMeaning(kd2Meanings: Array<string | Kanjidic2CharRdngMngGrpMng>): TKDB_Kanji_Meaning[] {
    const meaning: TKDB_Kanji_Meaning[] = [];
    kd2Meanings.forEach((kd2Meaning) => {
      if (typeof kd2Meaning === 'string') {
        meaning.push({
          lang: CONSTANTS.langCodeEnglish,
          value: kd2Meaning,
        });
      } else {
        meaning.push({
          lang: this.iso639.find((a) => a.iso6391 === kd2Meaning.m_lang)?.iso6392t ?? '',
          value: kd2Meaning.value,
        });
      }
    });

    return meaning;
  }

  private kanjiReading(kd2ReadingMeaning: Kanjidic2CharRdngMng | undefined): TKDB_Kanji_Reading {
    const reading: TKDB_Kanji_Reading = {
      kun: [],
      on: [],
      nanori: [],
    };

    if (kd2ReadingMeaning !== undefined) {
      toArray(kd2ReadingMeaning.nanori).forEach((kd2Nanori) => {
        reading.nanori.push(kd2Nanori);
      });

      toArray(kd2ReadingMeaning.rmgroup?.reading).forEach((kd2Reading) => {
        switch (kd2Reading.r_type) {
          case 'ja_kun':
            reading.kun.push(kd2Reading.value);
            break;
          case 'ja_on':
            reading.on.push(kd2Reading.value);
            break;
          default:
            break;
        }
      });
    }

    return reading;
  }

  private kanjiPart(literal: string): TKDB_Kanji_Part[] {
    const parts: TKDB_Kanji_Part[] = [];
    const kradfilexEntry = this.kradfilex.find((a) => a.kanji === literal);

    if (kradfilexEntry !== undefined) {
      kradfilexEntry.radicals.forEach((kradfilexRadical) => {
        const radkfileKanjiumEntry = this.radkfilexKanjium.find((a) => a.radkfilexRadical === kradfilexRadical);
        if (radkfileKanjiumEntry !== undefined) {
          if (radkfileKanjiumEntry.radical !== undefined) {
            parts.push({
              literal: radkfileKanjiumEntry.radical.literal,
              type: TKDB_Kanji_Part_Type.RADICAL,
            });
          } else if (radkfileKanjiumEntry.kanji !== undefined) {
            parts.push({
              literal: radkfileKanjiumEntry.kanji,
              type: TKDB_Kanji_Part_Type.KANJI,
            });
          } else if (radkfileKanjiumEntry.component !== undefined) {
            parts.push({
              literal: radkfileKanjiumEntry.component,
              type: TKDB_Kanji_Part_Type.COMPONENT,
            });
          }
        }
      });
    }

    return parts;
  }

  private kanjiMisc(kd2character: Kanjidic2Char): TKDB_Kanji_Misc {
    const codepoint = this.kanjiCodepoint(kd2character.codepoint.cp_value);
    const querycode = this.kanjiQuerycode(toArray(kd2character.query_code?.q_code));
    const dicref = this.kanjiDicref(toArray(kd2character.dic_number?.dic_ref));

    const kd2FirstStrokecount = toArray(kd2character.misc.stroke_count)[0];
    const strokecount = kd2FirstStrokecount !== undefined ? parseInt(kd2FirstStrokecount) : undefined;

    const kd2Frequency = kd2character.misc.freq;
    const frequencyJ = kd2Frequency !== undefined ? parseInt(kd2Frequency) : undefined;

    const grade = kd2character.misc.grade !== undefined ? this.kanjiGrade(kd2character.misc.grade) : undefined;
    const jlpt = this.tanosKanji.find((a) => a.kanji === kd2character.literal)?.jlpt;

    const antonym =
      this.kanjiumAntonym.find((a) => a.kanji === kd2character.literal)?.antonyms?.split(CONSTANTS.kanjiumDelimiter) ??
      [];

    const synonym =
      this.kanjiumSynonym.find((a) => a.kanji === kd2character.literal)?.synonyms?.split(CONSTANTS.kanjiumDelimiter) ??
      [];

    const lookalike =
      this.kanjiumLookalike.find((a) => a.kanji === kd2character.literal)?.similar?.split(CONSTANTS.kanjiumDelimiter) ??
      [];

    const kd2Variant = kd2character.misc.variant;
    const variant = kd2Variant !== undefined ? this.kanjiVariant(toArray(kd2Variant)) : [];

    const hexcode = toKvgHex(kd2character.literal);
    const strokes = this.kanjiStrokes(hexcode);

    const misc: TKDB_Kanji_Misc = {
      jlpt,
      strokecount,
      codepoint,
      querycode,
      dicref,
      antonym,
      synonym,
      lookalike,
      strokes,
      grade,
      frequencyJ,
      variant,
    };

    return misc;
  }

  private kanjiVariant(kd2Variants: Kanjidic2CharMiscVar[]): string[] {
    const variants: string[] = [];

    kd2Variants.forEach((kd2Variant) => {
      switch (kd2Variant.var_type) {
        case 'jis208':
        case 'jis212':
        case 'jis213':
        case 'ucs': {
          const variant = this.kanjidic2.character.find((a) =>
            a.codepoint.cp_value.some((b) => b.cp_type === kd2Variant.var_type && b.value === kd2Variant.value),
          )?.literal;

          if (variant !== undefined) {
            variants.push(variant);
          }
          break;
        }
      }
    });

    return variants;
  }

  private kanjiStrokes(hexcode: string): TKDB_Kanji_Stroke[] {
    const strokes: TKDB_Kanji_Stroke[] = [];

    const kanjivgEntry = this.kanjivg.find((a) => a.kanjiHexcode === hexcode);

    if (kanjivgEntry !== undefined) {
      kanjivgEntry.strokes.forEach((kanjivgStroke) => {
        strokes.push({
          path: kanjivgStroke.path,
          x: kanjivgStroke.x,
          y: kanjivgStroke.y,
        });
      });
    }

    return strokes;
  }

  private kanjiCodepoint(kd2Codepoint: Kanjidic2CharCpEntr[]): TKDB_Kanji_Codepoint {
    const codepoint: TKDB_Kanji_Codepoint = {};

    kd2Codepoint.forEach((a) => {
      codepoint[a.cp_type] = a.value;
    });

    return codepoint;
  }

  private kanjiQuerycode(kd2Querycode: Kanjidic2CharQcodeEntr[]): TKDB_Kanji_Querycode {
    const querycode: TKDB_Kanji_Querycode = {};

    kd2Querycode
      .filter((a) => a.skip_misclass === undefined)
      .forEach((a) => {
        querycode[a.qc_type] = a.value;
      });

    return querycode;
  }

  private kanjiDicref(kd2Dicref: Kanjidic2CharDicNumDicRef[]): TKDB_Kanji_Dicref {
    const dicref: TKDB_Kanji_Dicref = {};

    kd2Dicref.forEach((a) => {
      if (a.dr_type === 'moro' && a.m_vol !== undefined && a.m_page !== undefined) {
        dicref[a.dr_type] = `${a.value}:${a.m_vol}:${a.m_page}`;
      } else {
        dicref[a.dr_type] = a.value;
      }
    });

    return dicref;
  }

  private kanjiGrade(kd2Grade: Kanjidic2MiscGrade): TKDB_Keyword_Kanji_Grade {
    switch (kd2Grade) {
      case '1':
        return 'kyouiku1';
      case '2':
        return 'kyouiku2';
      case '3':
        return 'kyouiku3';
      case '4':
        return 'kyouiku4';
      case '5':
        return 'kyouiku5';
      case '6':
        return 'kyouiku6';
      case '8':
        return 'jouyou';
      case '9':
        return 'jinmeiyou1';
      case '10':
        return 'jinmeiyou2';
    }
  }

  //
  // Word mappings
  //

  private words(): TKDB_Word[] {
    const words: TKDB_Word[] = [];
    const entries = this.limiter !== undefined ? this.jmdict.entry.slice(0, this.limiter) : this.jmdict.entry;

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
      return priArr.some((pri) => CONSTANTS.commonKeywords.includes(pri));
    }
  }

  private wordMeaning(jmSenses: JMdictSens[]): TKDB_Word_Meaning[] {
    const wordMeaning: TKDB_Word_Meaning[] = [];

    jmSenses.forEach((jmSense) => {
      const gloss: TKDB_Word_Meaning_Gloss[] = this.wordMeaningGloss(jmSense);
      const lang: string = this.wordMeaningLang(jmSense);
      const pos: TKDB_Keyword_Word_Meaning_Pos[] = toArray(jmSense.pos);
      const field: TKDB_Keyword_Word_Meaning_Field[] = toArray(jmSense.field);
      const dialect: TKDB_Keyword_Word_Meaning_Dialect[] = toArray(jmSense.dial);
      const misc: TKDB_Keyword_Word_Meaning_Misc[] = toArray(jmSense.misc);
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

  private wordMeaningLang(jmSense: JMdictSens): string {
    const jmdictSensGlossFirst = toArray(jmSense.gloss)[0];
    if (typeof jmdictSensGlossFirst === 'string') {
      // If type is string, gloss entry can be considered english without other properties
      return CONSTANTS.langCodeEnglish;
    } else {
      if (jmdictSensGlossFirst?.lang !== undefined) {
        return this.iso639.find((a) => a.iso6392t === jmdictSensGlossFirst.lang)?.iso6392t ?? '';
      } else {
        return CONSTANTS.langCodeEnglish;
      }
    }
  }

  private wordMeaningSource(jmSense: JMdictSens): TKDB_Word_Meaning_Source[] {
    const wordMeaningSource: TKDB_Word_Meaning_Source[] = [];

    const jmSenseLSrc = toArray(jmSense.lsource);

    jmSenseLSrc.forEach((lsrc) => {
      const lang =
        lsrc.lang === undefined
          ? CONSTANTS.langCodeEnglish
          : this.iso639.find((a) => a.iso6392t === lsrc.lang)?.iso6392t ?? '';

      wordMeaningSource.push({
        lang,
        wasei: lsrc.ls_wasei !== undefined,
        full: lsrc.ls_type !== undefined,
        value: lsrc.value,
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
      const xrefItems = jmSenseXRef.split(CONSTANTS.jmdictXrefSeparator);

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
