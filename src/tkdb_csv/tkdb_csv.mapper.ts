import type { TKDB } from '../tkdb_json/tkdb.model';
import { CONSTANTS } from '../constants';
import { toHiragana } from 'wanakana';

interface CSV {
  jlpts: JLPT[];
  langs: Lang[];
  kanjis: Kanji[];
  kanji_meanings: Kanji_Meaning[];
  kanji_kuns: Kanji_Kun[];
  kanji_ons: Kanji_On[];
  kanji_grades: Kanji_Grade[];
  kanji_strokes: Kanji_Stroke[];
  word_kanji_info_types: Word_Kanji_Info_Type[];
  word_kana_info_types: Word_Kana_Info_Type[];
  words: Word[];
  word_kanjis: Word_Kanji[];
  word_kanji_infos: Word_Kanji_Info[];
  word_kanji_literals: Word_Kanji_Literal[];
  word_reading_furiganas: Word_Reading_Furigana[];
  word_kanas: Word_Kana[];
  word_kana_infos: Word_Kana_Info[];
  word_reading_restrictions: Word_Reading_Restriction[];
  word_reading_frequency: Word_Reading_Frequency[];
  word_reading_jlpt: Word_Reading_JLPT[];
  word_meanings: Word_Meaning[];
  word_meaning_field_type: Word_Meaning_Field_Type[];
  word_meaning_field: Word_Meaning_Field[];
  word_meaning_dial_type: Word_Meaning_Dial_Type[];
  word_meaning_dial: Word_Meaning_Dial[];
  word_meaning_pos_type: Word_Meaning_Pos_Type[];
  word_meaning_pos: Word_Meaning_Pos[];
  word_meaning_misc_type: Word_Meaning_Misc_Type[];
  word_meaning_misc: Word_Meaning_Misc[];
  word_translation_info_types: Word_Translation_Info_Type[];
  word_translations: Word_Translation[];
  word_meaning_lsources: Word_Meaning_LSource[];
  word_meaning_kanjirestr: Word_Meaning_KanjiRestriction[];
  word_meaning_kanarestr: Word_Meaning_KanaRestriction[];
  word_meaning_xref: Word_Meaning_XRef[];
  word_meaning_inf: Word_Meaning_Inf[];
  search_kanji: Search_Kanji[];
  search_word: Search_Word[];
}

interface Lang {
  id: string;
  descr: string;
}

interface JLPT {
  id: string;
  descr: string;
}

interface Word_Meaning_Field_Type {
  id: string;
  descr: string;
}

interface Word_Meaning_Dial_Type {
  id: string;
  descr: string;
}

interface Word_Meaning_Pos_Type {
  id: string;
  descr: string;
}

interface Word_Meaning_Misc_Type {
  id: string;
  descr: string;
}

interface Word_Translation_Info_Type {
  id: string;
  descr: string;
}

interface Kanji {
  knj: string;
  stcnt: number | undefined;
  jlpt: string | undefined;
  grd: string | undefined;
  freq: number | undefined;
  occr: number | undefined;
  cmn: boolean | undefined;
}

interface Kanji_Meaning {
  knj: string;
  mng: number;
  txt: string;
}

interface Kanji_Kun {
  knj: string;
  kun: number;
  txt: string;
}

interface Kanji_On {
  knj: string;
  on: number;
  txt: string;
}

interface Kanji_Stroke {
  knj: string;
  seq: number;
  pth: string;
  x: string;
  y: string;
}

interface Kanji_Grade {
  id: string;
  descr: string;
}

interface Word_Kana_Info_Type {
  id: string;
  descr: string;
}

interface Word_Kanji_Info_Type {
  id: string;
  descr: string;
}

interface Word {
  id: number;
  freq: number | undefined;
  jlpt: string | undefined;
  common: boolean | undefined;
}

interface Word_Kanji {
  wrd: number;
  knj: number;
  txt: string;
}

interface Word_Kanji_Info {
  wrd: number;
  knj: number;
  type: string;
}

interface Word_Kanji_Literal {
  wrd: number;
  knj: number;
  seq: number;
  ltrl: string;
}

interface Word_Reading_Furigana {
  wrd: number;
  knj: number;
  kna: number;
  txt: string;
}

interface Word_Kana {
  wrd: number;
  kna: number;
  txt: string;
}

interface Word_Kana_Info {
  wrd: number;
  kna: number;
  type: string;
}

interface Word_Reading_Restriction {
  wrd: number;
  kna: number;
  knj: number | undefined;
  seq: number;
}

interface Word_Reading_Frequency {
  wrd: number;
  knj: number;
  kna: number;
}

interface Word_Reading_JLPT {
  wrd: number;
  knj: number | undefined;
  kna: number;
  jlpt: string;
}

interface Word_Meaning {
  wrd: number;
  mng: number;
}

interface Word_Translation {
  wrd: number;
  mng: number;
  trnsl: number;
  lang: string;
  txt: string;
  inf: string | undefined;
}

interface Word_Meaning_Field {
  wrd: number;
  mng: number;
  seq: number;
  field: string;
}

interface Word_Meaning_Pos {
  wrd: number;
  mng: number;
  seq: number;
  pos: string;
}

interface Word_Meaning_Misc {
  wrd: number;
  mng: number;
  seq: number;
  misc: string;
}

interface Word_Meaning_Dial {
  wrd: number;
  mng: number;
  seq: number;
  dial: string;
}

interface Word_Meaning_Inf {
  wrd: number;
  mng: number;
  inf: number;
  txt: string;
}

interface Word_Meaning_LSource {
  wrd: number;
  mng: number;
  seq: number;
  lang: string;
  txt: string | undefined;
  part: boolean;
  wasei: boolean;
}

interface Word_Meaning_KanjiRestriction {
  wrd: number;
  mng: number;
  knj: number;
}

interface Word_Meaning_KanaRestriction {
  wrd: number;
  mng: number;
  kna: number;
}

interface Word_Meaning_XRef {
  wrd: number;
  mng: number;
  xref: number;
  xwrd: number;
  kna: number | undefined;
  knj: number | undefined;
}

interface Search_Kanji {
  knj: string;
  eng1: string;
  eng2: string;
  jpn: string;
}

interface Search_Word {
  wrd: number;
  eng1: string;
  eng2: string;
  eng3: string;
  eng4: string;
  jpn: string;
}

class WordReadingLookup {
  private data: Record<string, number> = {};

  set(word: number, reading: string, value: number): void {
    this.data[`${word}-${reading}`] = value;
  }

  get(word: number, reading: string): number | undefined {
    return this.data[`${word}-${reading}`];
  }
}

export const main = (data: TKDB): CSV => {
  const csvMap: CSV = {
    jlpts: [],
    langs: [],
    kanjis: [],
    kanji_meanings: [],
    kanji_kuns: [],
    kanji_ons: [],
    kanji_grades: [],
    kanji_strokes: [],
    word_kanji_info_types: [],
    word_kana_info_types: [],
    words: [],
    word_kanjis: [],
    word_kanji_literals: [],
    word_reading_furiganas: [],
    word_kanji_infos: [],
    word_kanas: [],
    word_kana_infos: [],
    word_reading_restrictions: [],
    word_reading_frequency: [],
    word_reading_jlpt: [],
    word_meanings: [],
    word_translation_info_types: [],
    word_translations: [],
    word_meaning_dial: [],
    word_meaning_field: [],
    word_meaning_misc: [],
    word_meaning_pos: [],
    word_meaning_dial_type: [],
    word_meaning_field_type: [],
    word_meaning_misc_type: [],
    word_meaning_pos_type: [],
    word_meaning_lsources: [],
    word_meaning_kanarestr: [],
    word_meaning_kanjirestr: [],
    word_meaning_xref: [],
    word_meaning_inf: [],
    search_kanji: [],
    search_word: [],
  };

  const wordKanjiLookup = new WordReadingLookup();
  const wordKanaLookup = new WordReadingLookup();

  const getUniqueArray = <T>(arr: T[]): T[] => {
    const seenValues = new Set();
    const uniqueArray = [];

    for (const value of arr) {
      const strValue = JSON.stringify(value);
      if (!seenValues.has(strValue)) {
        seenValues.add(strValue);
        uniqueArray.push(value);
      }
    }

    return uniqueArray;
  };

  const prepareQuotes = (txt: string | undefined): string => {
    if (txt !== undefined) {
      return `"${txt.replaceAll('"', '""')}"`;
    } else {
      return '';
    }
  };

  //
  // Keyword tables
  //

  // jlpt
  const jlpt: Record<string, string> = data.keywords.jlpt;
  for (const key in jlpt) {
    const descr = prepareQuotes(jlpt[key]);
    if (descr !== undefined)
      csvMap.jlpts.push({
        id: key,
        descr,
      });
  }

  // lang
  const lang: Record<string, string> = data.keywords.lang;
  for (const key in lang) {
    const descr = prepareQuotes(lang[key]);
    if (descr !== undefined)
      csvMap.langs.push({
        id: key,
        descr,
      });
  }

  // word_meaning_dial_type
  const wordMeaningDialTypes: Record<string, string> = data.keywords.wordMeaningDial;
  for (const key in wordMeaningDialTypes) {
    const descr = prepareQuotes(wordMeaningDialTypes[key]);
    if (descr !== undefined)
      csvMap.word_meaning_dial_type.push({
        id: key,
        descr,
      });
  }

  // word_meaning_misc_type
  const wordMeaningMiscTypes: Record<string, string> = data.keywords.wordMeaningMisc;
  for (const key in wordMeaningMiscTypes) {
    const descr = prepareQuotes(wordMeaningMiscTypes[key]);
    if (descr !== undefined)
      csvMap.word_meaning_misc_type.push({
        id: key,
        descr,
      });
  }

  // word_meaning_pos_type
  const wordMeaningPosTypes: Record<string, string> = data.keywords.wordMeaningPos;
  for (const key in wordMeaningPosTypes) {
    const descr = prepareQuotes(wordMeaningPosTypes[key]);
    if (descr !== undefined)
      csvMap.word_meaning_pos_type.push({
        id: key,
        descr,
      });
  }

  // word_meaning_field_type
  const wordMeaningFieldTypes: Record<string, string> = data.keywords.wordMeaningField;
  for (const key in wordMeaningFieldTypes) {
    const descr = prepareQuotes(wordMeaningFieldTypes[key]);
    if (descr !== undefined)
      csvMap.word_meaning_field_type.push({
        id: key,
        descr,
      });
  }

  // word_translation_info_type
  const wordTranslationInfoTypes: Record<string, string> = data.keywords.wordMeaningGlossType;
  for (const key in wordTranslationInfoTypes) {
    const descr = wordTranslationInfoTypes[key];
    if (descr !== undefined)
      csvMap.word_translation_info_types.push({
        id: key,
        descr,
      });
  }

  // word_kana_info_type
  const wordKanaInfo: Record<string, string> = data.keywords.wordKanaInfo;
  for (const key in wordKanaInfo) {
    const descr = wordKanaInfo[key];
    if (descr !== undefined)
      csvMap.word_kana_info_types.push({
        id: key,
        descr,
      });
  }

  // word_kanji_info_type
  const wordKanjiInfo: Record<string, string> = data.keywords.wordKanjiInfo;
  for (const key in wordKanjiInfo) {
    const descr = wordKanjiInfo[key];
    if (descr !== undefined)
      csvMap.word_kanji_info_types.push({
        id: key,
        descr,
      });
  }

  // kanji_grades
  const kanjiGrades: Record<string, string> = data.keywords.kanjiGrade;
  for (const key in kanjiGrades) {
    const descr = kanjiGrades[key];
    if (descr !== undefined)
      csvMap.kanji_grades.push({
        id: key,
        descr,
      });
  }

  //
  // Kanji tables
  //

  for (const kanji of data.kanji) {
    // kanji
    let meanings = kanji.meaning
      .filter((m: { lang: string }) => m.lang === 'eng')
      .map((m: { value: string }) => m.value)
      .join(';');

    meanings = prepareQuotes(meanings);
    const getNumberInRange = (inputNumber: number): number => (inputNumber >= 500 ? Math.floor(inputNumber / 500) : 0);

    const cmn = kanji.misc.grade !== undefined;
    const freq = kanji.misc.frequencyK !== undefined ? getNumberInRange(kanji.misc.frequencyK) : undefined;

    csvMap.kanjis.push({
      knj: kanji.literal,
      stcnt: kanji.misc.strokecount,
      jlpt: kanji.misc.jlpt,
      grd: kanji.misc.grade,
      freq,
      occr: kanji.misc.frequencyK,
      cmn,
    });

    // knj_mng
    let mngPos = 1;
    for (const mng of kanji.meaning) {
      if (mng.lang === 'eng') {
        csvMap.kanji_meanings.push({
          knj: kanji.literal,
          mng: mngPos,
          txt: prepareQuotes(mng.value),
        });
      }
      mngPos++;
    }

    // knj_kun
    let kunPos = 1;
    for (const kun of kanji.reading.kun) {
      csvMap.kanji_kuns.push({
        knj: kanji.literal,
        kun: kunPos,
        txt: kun,
      });
      kunPos++;
    }

    // knj_on
    let onPos = 1;

    for (const on of kanji.reading.on) {
      csvMap.kanji_ons.push({
        knj: kanji.literal,
        on: onPos,
        txt: on,
      });
      onPos++;
    }

    // knj_strk
    let kanjiStrokePosition = 1;
    for (const stroke of kanji.misc.strokes) {
      csvMap.kanji_strokes.push({
        knj: kanji.literal,
        seq: kanjiStrokePosition,
        pth: `"${stroke.path}"`,
        x: stroke.x,
        y: stroke.y,
      });

      ++kanjiStrokePosition;
    }

    // srch_knj
    const eng = kanji.meaning.filter((a) => a.lang === 'eng').map((a) => a.value);
    const eng1 = eng[0];
    const eng2 = eng.splice(1).join(' ');

    const jpnKun = kanji.reading.kun;
    const jpnOnHiragana = kanji.reading.on.map((a) => toHiragana(a));
    const jpnOn = kanji.reading.on;
    const jpnCombined = jpnKun.concat(jpnOnHiragana).concat(jpnOn);
    jpnCombined.unshift(kanji.literal);
    const jpn = jpnCombined.join(' ').replaceAll(/[-.]/g, '');

    csvMap.search_kanji.push({
      knj: kanji.literal,
      eng1: prepareQuotes(eng1),
      eng2: prepareQuotes(eng2),
      jpn: prepareQuotes(jpn),
    });
  }

  //
  // Word tables
  //

  for (const word of data.words) {
    // word
    const wordId = +word.id;
    const freq = word.misc.freq;
    const common = word.misc.common;
    const jlpt = word.misc.jlpt;

    csvMap.words.push({
      id: wordId,
      freq,
      common,
      jlpt,
    });

    const wordKanjiVerifier: string[] = [];
    const wordKanaVerifier: string[] = [];

    let kanjiPos = 1;
    let kanaPos = 1;
    for (const reading of word.reading) {
      // word_kanji
      const kanjiTxt = reading.kanji;
      if (kanjiTxt !== undefined && !wordKanjiVerifier.includes(kanjiTxt)) {
        wordKanjiVerifier.push(kanjiTxt);

        const entry: Word_Kanji = {
          wrd: wordId,
          knj: kanjiPos,
          txt: kanjiTxt,
        };
        csvMap.word_kanjis.push(entry);
        wordKanjiLookup.set(wordId, kanjiTxt, kanjiPos);

        // word_kanji_literal
        const literals = reading.kanjiLiteral ?? [];
        for (const literal of literals) {
          const isPartOfKanji = csvMap.kanjis.some((a) => a.knj === literal);
          const seq = literals.indexOf(literal) + 1;
          if (isPartOfKanji)
            csvMap.word_kanji_literals.push({
              wrd: wordId,
              knj: kanjiPos,
              seq,
              ltrl: literal,
            });
        }

        // word_kanji_info
        const kanjiInfos = reading.kanjiInfo ?? [];
        for (const kanjiInfo of kanjiInfos) {
          csvMap.word_kanji_infos.push({
            wrd: wordId,
            knj: kanjiPos,
            type: kanjiInfo,
          });
        }

        ++kanjiPos;
      }

      // word_kana
      const kanaTxt = reading.kana;
      if (!wordKanaVerifier.includes(kanaTxt)) {
        wordKanaVerifier.push(kanaTxt);

        const entry: Word_Kana = {
          wrd: wordId,
          kna: kanaPos,
          txt: kanaTxt,
        };
        csvMap.word_kanas.push(entry);
        wordKanaLookup.set(wordId, kanaTxt, kanaPos);

        // word_kana_info
        const kanaInfos = reading.kanaInfo;
        for (const kanaInfo of kanaInfos) {
          csvMap.word_kana_infos.push({
            wrd: wordId,
            kna: kanaPos,
            type: kanaInfo,
          });
        }

        ++kanaPos;
      }
    }

    // srch_wrd
    const eng = word.meaning.filter((a) => a.lang === 'eng');

    function getFirstWord(str: string): string {
      // Use a regular expression to match the first word
      const match = str.match(/(\w+)(?:\s*\([^)]*\))?/);

      // If a match is found, return the first capturing group (the first word)
      if (match?.[1] != null) {
        return match[1];
      }

      // If no match is found, return an empty string or handle it as needed
      return '';
    }

    const engFirst = eng[0]?.gloss[0]?.value;
    const eng1 = engFirst !== undefined ? getFirstWord(engFirst) : '';
    const eng2 = engFirst?.replace(eng1, '');
    const eng3 = eng[0]?.gloss
      .map((a) => a.value)
      .splice(1)
      .join(' ');
    const eng4 = eng
      .splice(1)
      .flatMap((a) => a.gloss)
      .map((a) => a.value)
      .join(' ');

    const jpnKna = Array.from(new Set(word.reading.flatMap((a) => a.kana)));
    const jpnKnj = word.reading.flatMap((a) => a.kanji ?? '').filter((a) => a !== '');
    const jpn = jpnKna.concat(jpnKnj).join(' ');

    csvMap.search_word.push({
      wrd: +word.id,
      eng1: prepareQuotes(eng1),
      eng2: prepareQuotes(eng2),
      eng3: prepareQuotes(eng3),
      eng4: prepareQuotes(eng4),
      jpn: prepareQuotes(jpn),
    });
  }

  for (const word of data.words) {
    const wordId = +word.id;

    // word_reading_restriction
    let wordReadingRestrSeq = 1;

    word.reading.forEach((a) => {
      const kna = wordKanaLookup.get(wordId, a.kana);
      const knj = a.kanji === undefined ? undefined : wordKanjiLookup.get(wordId, a.kanji);

      if (kna === undefined) return;

      csvMap.word_reading_restrictions.push({
        wrd: wordId,
        kna,
        knj,
        seq: wordReadingRestrSeq,
      });

      ++wordReadingRestrSeq;
    });

    for (const reading of word.reading) {
      const kanji = reading.kanji !== undefined ? wordKanjiLookup.get(wordId, reading.kanji) : undefined;
      const kana = wordKanaLookup.get(wordId, reading.kana);

      // word_reading_freq
      if (reading.common !== undefined) {
        if (kanji !== undefined && kana !== undefined) {
          csvMap.word_reading_frequency.push({
            wrd: wordId,
            knj: kanji,
            kna: kana,
          });
        }
      }

      // word_reading_furigana
      if (reading.furigana !== undefined && reading.furigana.length > 0) {
        if (kanji !== undefined && kana !== undefined) {
          const furiganaJson = reading.furigana.map((kanjiFurigana) => ({
            r: kanjiFurigana.ruby,
            ...(kanjiFurigana.rt !== undefined ? { rt: kanjiFurigana.rt } : {}),
          }));

          csvMap.word_reading_furiganas.push({
            wrd: wordId,
            knj: kanji,
            kna: kana,
            txt: prepareQuotes(JSON.stringify(furiganaJson)),
          });
        }
      }

      // word_reading_jlpt
      if (reading.jlpt !== undefined) {
        if (kana !== undefined) {
          csvMap.word_reading_jlpt.push({
            wrd: wordId,
            knj: kanji,
            kna: kana,
            jlpt: reading.jlpt,
          });
        }
      }
    }

    // word_meaning
    let meaningPos = 1;
    for (const meaning of word.meaning) {
      if (meaning.lang === CONSTANTS.langCodeEnglish) {
        csvMap.word_meanings.push({
          wrd: wordId,
          mng: meaningPos,
        });

        // word_meaning_lsource
        let lsrcPos = 1;
        for (const lsrc of meaning.source) {
          csvMap.word_meaning_lsources.push({
            wrd: wordId,
            mng: meaningPos,
            seq: lsrcPos,
            lang: lsrc.lang,
            txt: prepareQuotes(lsrc.value),
            part: lsrc.full,
            wasei: lsrc.wasei,
          });

          ++lsrcPos;
        }

        // word_meaning_inf
        let infPos = 1;
        for (const info of meaning.info) {
          csvMap.word_meaning_inf.push({
            wrd: wordId,
            mng: meaningPos,
            inf: infPos,
            txt: prepareQuotes(info),
          });
          infPos++;
        }

        // word_meaning_field
        let fieldPos = 1;
        for (const field of meaning.field) {
          csvMap.word_meaning_field.push({
            wrd: wordId,
            mng: meaningPos,
            seq: fieldPos,
            field,
          });
          fieldPos++;
        }

        // word_meaning_dial
        let dialPos = 1;
        for (const dial of meaning.dialect) {
          csvMap.word_meaning_dial.push({
            wrd: wordId,
            mng: meaningPos,
            seq: dialPos,
            dial,
          });
          dialPos++;
        }

        // word_meaning_misc
        let miscPos = 1;
        for (const misc of meaning.misc) {
          csvMap.word_meaning_misc.push({
            wrd: wordId,
            mng: meaningPos,
            seq: miscPos,
            misc,
          });
          miscPos++;
        }

        // word_meaning_pos
        let posPos = 1;
        for (const pos of meaning.pos) {
          csvMap.word_meaning_pos.push({
            wrd: wordId,
            mng: meaningPos,
            seq: posPos,
            pos,
          });
          posPos++;
        }

        // word_meaning_translation
        let translationsPos = 1;
        for (const gloss of meaning.gloss) {
          csvMap.word_translations.push({
            wrd: wordId,
            mng: meaningPos,
            trnsl: translationsPos,
            lang: CONSTANTS.langCodeEnglish,
            txt: prepareQuotes(gloss.value),
            inf: gloss.type,
          });

          ++translationsPos;
        }

        // word_meaning_knjrestr
        for (const knjrestr of meaning.kanjiRestr) {
          const knj = wordKanjiLookup.get(wordId, knjrestr);
          if (knj !== undefined)
            csvMap.word_meaning_kanjirestr.push({
              wrd: wordId,
              mng: meaningPos,
              knj,
            });
        }

        // word_meaning_knarestr
        for (const knarestr of meaning.kanaRestr) {
          const kna = wordKanaLookup.get(wordId, knarestr);
          if (kna !== undefined)
            csvMap.word_meaning_kanarestr.push({
              wrd: wordId,
              mng: meaningPos,
              kna,
            });
        }

        // word_meaning_xref
        let xrefPos = 1;
        for (const rel of meaning.related) {
          const xwrd = +rel.id;
          const xref = xrefPos;
          const wrd = wordId;
          const mng = meaningPos;

          switch (rel.type) {
            case 'kanji': {
              const knj = wordKanjiLookup.get(xwrd, rel.kanji);
              if (knj === undefined) {
                console.log('a');
              }
              csvMap.word_meaning_xref.push({
                wrd,
                mng,
                xwrd,
                xref,
                knj,
                kna: undefined,
              });
              break;
            }
            case 'kana': {
              const kna = wordKanaLookup.get(xwrd, rel.kana);
              csvMap.word_meaning_xref.push({
                wrd,
                mng,
                xwrd,
                xref,
                knj: undefined,
                kna,
              });
              break;
            }
            case 'both': {
              const knj = wordKanjiLookup.get(xwrd, rel.kanji);
              const kna = wordKanaLookup.get(xwrd, rel.kana);
              csvMap.word_meaning_xref.push({
                wrd,
                mng,
                xwrd,
                xref,
                knj,
                kna,
              });
              break;
            }
          }
        }
        ++xrefPos;
      }

      ++meaningPos;
    }
  }
  csvMap.word_meaning_xref = getUniqueArray(csvMap.word_meaning_xref);
  return csvMap;
};
