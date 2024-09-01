import {isKanji} from 'wanakana';
import {
  JMdictEntr,
  JMdictKanji,
  JMdictKanjiInf,
  JMdictRdng,
  JMdictRdngInf,
  JMdictSens,
} from '../../type/jmdict';
import {JLPT, WordForm, WordFurigana} from '../../type/tkdb';
import {toArray, toArrayOrUndefined} from '../../utils';
import {fileManager} from '../fileManager';

export default (jmEntry: JMdictEntr): WordForm[] => {
  const formPairs = createFormPairs(jmEntry);
  const sortedFormPairs = sortForms(formPairs, jmEntry);
  return sortedFormPairs;
};

/**
 * Create valid word forms based on jmdict kanji and reading element pairs considering their restrictions.
 */
export const createFormPairs = (jmEntry: JMdictEntr): WordForm[] => {
  const forms: WordForm[] = [];

  const jmId = jmEntry.ent_seq;
  let jmReles = toArray(jmEntry.r_ele);
  const missingJmReles = createMissingReles(jmEntry);

  if (missingJmReles !== undefined) {
    jmReles = jmReles.concat(missingJmReles);
  }

  const jmKeles = toArrayOrUndefined(jmEntry.k_ele);

  for (const jmRele of jmReles) {
    const kana = jmRele.reb;
    const restrictions = toArrayOrUndefined(jmRele.re_restr);
    const hasNoKanji = jmRele.re_nokanji !== undefined;

    if (hasNoKanji) {
      // Case where reading has no kanji as a combination
      const form = populateForms({script: kana}, jmId, jmRele);
      forms.push(form);
    } else if (restrictions !== undefined) {
      // Case where reading is only combinable with specific kanjis
      for (const restriction of restrictions) {
        const jmKele = jmKeles?.find(jmKele => jmKele.keb === restriction);

        if (jmKele === undefined) {
          throw new Error('Reading restriction not available in Kanji element');
        }

        const form = populateForms(
          {script: restriction, reading: kana},
          jmId,
          jmRele,
          jmKele
        );
        forms.push(form);
      }
    } else if (jmKeles !== undefined) {
      // Case where all kanji and readings should be combinable
      for (const jmKele of jmKeles) {
        const kanji = jmKele.keb;

        const form = populateForms(
          {script: kanji, reading: kana},
          jmId,
          jmRele,
          jmKele
        );
        forms.push(form);
      }
    } else {
      // Case where there are no kanji and all readings should be a form
      const form = populateForms({script: kana}, jmId, jmRele);
      forms.push(form);
    }
  }

  return forms;
};

export const createMissingReles = (
  jmEntry: JMdictEntr
): JMdictRdng[] | undefined => {
  const jmReles = toArray(jmEntry.r_ele);
  const jmSenses = toArray(jmEntry.sense);

  // only create additional forms, if the word is written in kana ususually
  if (!wordHasSenseUsuallyWrittenInKana(jmSenses)) {
    return;
  }

  const missingReles: JMdictRdng[] = [];
  const jmRelesKanjiReadings = jmReles.filter(
    jmRele => jmRele.re_nokanji === undefined
  );

  for (const jmRelesKanjiReading of jmRelesKanjiReadings) {
    const missingRele: JMdictRdng = {
      reb: jmRelesKanjiReading.reb,
      re_nokanji: '',
      ...(jmRelesKanjiReading.re_pri !== undefined && {
        re_pri: jmRelesKanjiReading.re_pri,
      }),
    };

    missingReles.push(missingRele);
  }

  return missingReles;
};

const populateForms = (
  form: WordForm,
  id: string,
  jmRele: JMdictRdng,
  jmKele?: JMdictKanji
): WordForm => {
  const jmKeb = jmKele?.keb;

  const jmKeInfo: JMdictKanjiInf[] | undefined = toArrayOrUndefined(
    jmKele?.ke_inf
  );
  const jmReInfo: JMdictRdngInf[] | undefined = toArrayOrUndefined(
    jmRele?.re_inf
  );
  const jmInfo = [...(jmKeInfo ?? []), ...(jmReInfo ?? [])];

  const jmKePriorities = toArrayOrUndefined(jmKele?.ke_pri);
  const jmRePriorities = toArrayOrUndefined(jmRele?.re_pri);
  const jmPriorities = [...(jmKePriorities ?? []), ...(jmRePriorities ?? [])];

  const common: boolean | undefined = isCommon(jmPriorities);
  const frequency: number | undefined = getFrequency(jmPriorities);

  const outdatedKanji = jmInfo.includes('oK') ? true : undefined;
  const irregularKanji = jmInfo.includes('iK') ? true : undefined;
  const rarelyUsedKanji = jmInfo.includes('rK') ? true : undefined;
  const ateji = jmInfo.includes('ateji') ? true : undefined;
  const irregularOkurigana = jmInfo.includes('io') ? true : undefined;
  const outdatedReading = jmInfo.includes('ok') ? true : undefined;
  const irregularReading = jmInfo.includes('ik') ? true : undefined;
  const falseReading = jmInfo.includes('gikun') ? true : undefined;

  const jlpt = getJlpt(form, id);
  const furigana = getFurigana(form);
  const kanjis = extractKanji(jmKeb);

  const populatedForm = {
    ...form,
    common,
    frequency,
    outdatedKanji,
    irregularKanji,
    rarelyUsedKanji,
    ateji,
    irregularOkurigana,
    outdatedReading,
    irregularReading,
    falseReading,
    jlpt,
    kanjis,
    furigana,
  };

  return populatedForm;
};

export const isCommon = (priorities?: string[]): boolean | undefined => {
  if (priorities === undefined) {
    return undefined;
  }

  for (const priority of priorities) {
    if (priority.startsWith('nf')) {
      return true;
    } else if (priority === 'spec1') {
      return true;
    } else if (priority === 'ichi1') {
      return true;
    }
  }
  return undefined;
};

const getJlpt = (wordForm: WordForm, id: string): JLPT | undefined => {
  const form = wordForm.script;
  const reading = wordForm.reading;

  const tanosVocabs = fileManager.getTanosVocabs();

  const match = tanosVocabs.find(vocab => {
    const jlptForm = vocab.kanji ?? vocab.kana;
    const jlptReading = vocab.kanji !== undefined ? vocab.kana : undefined;
    const jlptId = vocab.id;

    const readingMatches = jlptReading === reading;
    const idMatches = jlptId === id;
    const formMatches = jlptForm === form;

    return readingMatches && idMatches && formMatches;
  });

  if (match === undefined) {
    return;
  }

  return match.jlpt;
};

const getFurigana = (wordForm: WordForm): WordFurigana[] | undefined => {
  const form = wordForm.script;
  const reading = wordForm.reading;

  if (reading === undefined) {
    return undefined;
  }

  const jmdictFurigana = fileManager.getJmdictFurigana();

  const match = jmdictFurigana.find(entry => {
    return entry.text === form && entry.reading === reading;
  });

  if (match === undefined) {
    return undefined;
  }

  const furigana: WordFurigana[] = [];

  for (const f of match.furigana) {
    const ruby = f.ruby;
    const rt = f.rt;

    furigana.push({ruby, rt});
  }

  return furigana;
};

export const extractKanji = (
  input: string | undefined
): string[] | undefined => {
  if (input === undefined) {
    return undefined;
  }

  const characters = Array.from(input);

  const kanjiArray = characters.filter(isKanji);

  if (kanjiArray.length < 1) {
    return;
  }

  return kanjiArray;
};

export const getFrequency = (priorities?: string[]): number | undefined => {
  if (priorities === undefined) {
    return undefined;
  }

  // TODO: what about words that only have ICHI1 for example?
  for (const priority of priorities) {
    if (priority.startsWith('nf')) {
      return extractNfxx(priority);
    }
  }

  return undefined;
};

export const extractNfxx = (priority: string): number => {
  // Check if the input starts with "nf" and has at least 4 characters (e.g., "nf00")
  if (priority.startsWith('nf') && priority.length >= 4) {
    // Extract the substring from the 3rd to the 4th character (inclusive)
    const numberPart = priority.substring(2, 4);
    // Convert the extracted substring to a number
    const result = parseInt(numberPart, 10);
    // Return the resulting number
    return result;
  } else {
    // If the priority is invalid, throw an error
    throw new Error(
      "Invalid priority format. Expected format is 'nfXX' where XX are two digits."
    );
  }
};

/**
 * Returns true if a word has at least once sense that is usually written in kana but is kanji form
 */
const wordHasSenseUsuallyWrittenInKana = (jmSenses: JMdictSens[]): boolean => {
  return jmSenses.some(jmSense => {
    const jmMiscs = toArrayOrUndefined(jmSense.misc);
    if (jmMiscs?.includes('uk') === true) {
      return true;
    } else {
      return false;
    }
  });
};

/**
 * Sorts the word forms by order in jmdict kanji and reading elements.
 */
const sortForms = (forms: WordForm[], jmEntry: JMdictEntr): WordForm[] => {
  const jmKeles = toArrayOrUndefined(jmEntry.k_ele);
  const jmReles = toArray(jmEntry.r_ele);
  const jmSenses = toArray(jmEntry.sense);

  const kanjiReadings = jmKeles?.map(k => k.keb);
  const kanaReadings = jmReles.map(r => r.reb);

  const wordWrittenInKana = wordHasSenseUsuallyWrittenInKana(jmSenses);

  const order: string[] = [];

  if (kanjiReadings === undefined) {
    order.push(...kanaReadings);
  } else if (wordWrittenInKana) {
    order.push(...kanaReadings, ...kanjiReadings);
  } else {
    order.push(...kanjiReadings, ...kanaReadings);
  }

  const compareForms = (a: WordForm, b: WordForm): number => {
    const formIndexA = order.indexOf(a.script);
    const formIndexB = order.indexOf(b.script);

    // Compare form values based on the order array
    if (formIndexA !== formIndexB) {
      return formIndexA - formIndexB;
    }

    // If form values are the same, compare reading values if they exist
    if (a.reading !== undefined && b.reading !== undefined) {
      return order.indexOf(a.reading) - order.indexOf(b.reading);
    }

    // If only one of the readings exists, the one with reading should come first
    if (a.reading !== undefined) return -1;
    if (b.reading !== undefined) return 1;

    // If neither have a reading, they are considered equal
    return 0;
  };

  return forms.sort(compareForms);
};
