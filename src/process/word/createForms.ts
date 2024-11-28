import {JLPT, WordForm, WordFurigana} from 'tkdb-helper';
import {
  JMdictEntr,
  JMdictKanji,
  JMdictRdng,
  JMdictSens,
} from '../../type/jmdict';
import {toArray, toArrayOrUndefined, toHash} from '../../utils';
import {isKanji} from 'wanakana';
import {fileManager} from '../fileManager';
import {toRomaji} from 'wanakana';
import createMeanings from './createMeanings';

interface Form {
  kana: string;
  kanji?: string;
}

export default (jmEntry: JMdictEntr): WordForm[] => {
  const {r_ele, sense, k_ele, ent_seq} = jmEntry;
  const jmId = ent_seq;
  const jmReles = toArray(r_ele);
  const jmKeles = toArrayOrUndefined(k_ele);
  const jmSenses = toArray(sense);

  let formCombinations = createFormCombinations(jmReles, jmKeles);
  formCombinations.sort(sortByKanjiAndKana);

  // Confirm if the form combinations need a only kana form
  const entryNeedsKanaOnlyForm = hasSenseWithKanaForm(jmSenses);

  // If yes, add missing forms
  if (entryNeedsKanaOnlyForm) {
    const missingKanaForms = createMissingKanaForms(formCombinations);
    // Missing Kana forms should come first
    formCombinations = [...missingKanaForms, ...formCombinations];
  }

  const forms: WordForm[] = [];
  // Loop through all form combinations and populate word forms
  for (const formCombination of formCombinations) {
    const {kana, kanji} = formCombination;

    const jmRele = jmReles.find(r => r.reb === kana);
    const jmKele = jmKeles?.find(k => k.keb === kanji);

    // jmRele can not be undefined
    if (jmRele === undefined) {
      throw new Error(`jmRele not fount for ${jmId} ${kana}`);
    }

    const jmKeInfo = toArrayOrUndefined(jmKele?.ke_inf);
    const jmReInfo = toArrayOrUndefined(jmRele?.re_inf);
    const jmInfo = [...(jmKeInfo ?? []), ...(jmReInfo ?? [])];

    const jmRePriorities = toArrayOrUndefined(jmRele?.re_pri);
    const jmKePriorities = toArrayOrUndefined(jmKele?.ke_pri);
    const jmPriorities = [...(jmKePriorities ?? []), ...(jmRePriorities ?? [])];

    const wordId = +jmId;
    const id = toHash(kanji + kana);

    const outdated =
      jmInfo.includes('oK') || jmInfo.includes('ok') ? true : undefined;

    const infos = jmInfo;

    const romaji = toRomaji(kana);

    const common = isCommon(jmPriorities);
    const frequency = getFrequency(jmPriorities);

    const jlpt = getJlpt(formCombination, jmId);
    const furigana = getFurigana(formCombination);
    const characters = extractKanji(kanji);

    const meanings = createMeanings(jmEntry, kana, kanji);

    forms.push({
      wordId,
      id,
      kana,
      kanji,
      romaji,
      common,
      frequency,
      jlpt,
      furigana,
      characters,
      outdated,
      infos,
      meanings,
    });
  }

  // Sort forms
  forms.sort(sortOutdatedForms);

  return forms;
};

export const createFormCombinations = (
  jmReles: JMdictRdng[],
  jmKeles: JMdictKanji[] | undefined
): Form[] => {
  const forms = new Map<string, Form>();

  for (const jmRele of jmReles) {
    const kana = jmRele.reb;
    const readingHasNoKanji = jmRele.re_nokanji !== undefined ? true : false;
    const readingRestrictions = toArrayOrUndefined(jmRele.re_restr);

    // There are only kana forms
    if (!jmKeles) {
      forms.set(kana, {kana});
      continue;
    }

    // There are also kanji forms, but this particular reading has no kanji
    if (readingHasNoKanji) {
      forms.set(kana, {kana});
      continue;
    }

    // There are also kanji forms, but there exists restrictions
    if (readingRestrictions) {
      for (const restriction of readingRestrictions) {
        const kanji = restriction;
        forms.set(kanji + kana, {kana, kanji});
      }
      continue;
    }

    // Each kanji form can be combined
    for (const jmKele of jmKeles) {
      const kanji = jmKele.keb;
      forms.set(kanji + kana, {kana, kanji});
    }
  }

  return Array.from(forms.values());
};

export const hasSenseWithKanaForm = (jmSenses: JMdictSens[]): boolean => {
  return jmSenses.some(jmSense => {
    const jmMiscs = toArrayOrUndefined(jmSense.misc);
    return jmMiscs?.includes('uk');
  });
};

export const createMissingKanaForms = (forms: Form[]): Form[] => {
  const missingKanaForms = new Map<string, Form>();
  // If it already has a kana form, we can skip
  const hasOnlyKanaForm = forms.some(form => !form.kanji);
  if (!hasOnlyKanaForm) {
    for (const form of forms) {
      const key = form.kana; // Use `kana` as the unique identifier
      if (!missingKanaForms.has(key)) {
        missingKanaForms.set(key, {kana: form.kana});
      }
    }
  }

  return Array.from(missingKanaForms.values());
};

const getJlpt = (form: Form, id: string): JLPT | undefined => {
  const {kana, kanji} = form;

  const tanosVocabMap = fileManager.getTanosVocabMap();

  const lookupKey = [id, kanji, kana].join(':');
  const match = tanosVocabMap.get(lookupKey);

  return match?.jlpt;
};

const getFurigana = (form: Form): WordFurigana[] | undefined => {
  const {kana, kanji} = form;

  // Fugiana must have a kanji
  if (kanji === undefined) return undefined;

  const jmdictFuriganaMap = fileManager.getJmdictFuriganaMap();
  const match = jmdictFuriganaMap.get(`${kanji}:${kana}`);

  if (match === undefined) return undefined;

  const furigana: WordFurigana[] = [];

  for (const f of match.furigana) {
    const ruby = f.ruby;
    const rt = f.rt;

    furigana.push({ruby, rt});
  }

  return furigana.length > 0 ? furigana : undefined;
};

export const extractKanji = (
  input: string | undefined
): string[] | undefined => {
  if (input === undefined) return undefined;

  const characters = Array.from(input);

  const kanjiArray = characters.filter(isKanji);

  if (kanjiArray.length < 1) return;

  return kanjiArray;
};

export const isCommon = (priorities?: string[]): boolean | undefined => {
  if (priorities === undefined) return undefined;

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

export const getFrequency = (priorities?: string[]): number | undefined => {
  if (priorities === undefined) return undefined;

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

// Sort outdated forms to the end
const sortOutdatedForms = (a: WordForm, b: WordForm): number => {
  const aOutdated = a.outdated;
  const bOutdated = b.outdated;
  if (aOutdated && !bOutdated) return 1; // Move `a` to the end
  if (!aOutdated && bOutdated) return -1; // Move `b` to the end
  return 0; // No change
};

// Sort by kanji and then kana
export const sortByKanjiAndKana = (a: Form, b: Form): number => {
  // Step 1: Sort by kanji, moving undefined kanji to the end
  if (a.kanji !== b.kanji) {
    if (a.kanji === undefined) return 1;
    if (b.kanji === undefined) return -1;
    return a.kanji > b.kanji ? 1 : -1;
  }

  // Step 2: If kanji are the same, keep the original order of kana
  return 0;
};
