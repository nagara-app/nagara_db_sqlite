import type {WordLanguageSource, WordMeaning} from 'tkdb-helper';

import type {
  JMdictEntr,
  JMdictSensDial,
  JMdictSensField,
  JMdictSensGloss,
  JMdictSensLSrc,
  JMdictSensMisc,
  JMdictSensPos,
} from '../../type/jmdict';

import {toArray, toArrayOrUndefined, toHash} from '../../utils';

export default (
  jmEntry: JMdictEntr,
  kana: string,
  kanji?: string
): WordMeaning[] => {
  const meanings: WordMeaning[] = [];

  const jmSenses = toArray(jmEntry.sense);

  for (const jmSense of jmSenses) {
    const {gloss, pos, field, dial, misc, s_inf, lsource, stagk, stagr} =
      jmSense;

    const restrictedKanaList = toArrayOrUndefined(stagk);
    const restrictedKanjiList = toArrayOrUndefined(stagr);

    // This meaning is restricted, but not for this kana
    const isKanaRestricted =
      restrictedKanaList && !restrictedKanaList.includes(kana);

    // This meaning is restricted, but not for this kanji
    const isKanjiRestricted =
      kanji && restrictedKanjiList && !restrictedKanjiList.includes(kanji);

    // Skip this meaning
    if (isKanaRestricted || isKanjiRestricted) {
      continue;
    }

    const jmGloss = toArray(gloss);
    const jmPartsOfSpeech = toArrayOrUndefined(pos);
    const jmFields = toArrayOrUndefined(field);
    const jmDialects = toArrayOrUndefined(dial);
    const jmMiscs = toArrayOrUndefined(misc);
    const jmSenseInfo = s_inf;
    const jmLsources = toArrayOrUndefined(lsource);

    const id = toHash(jmGloss.join());
    const translations = createTranslations(jmGloss);
    const wordClasses = getWordClasses(jmPartsOfSpeech);
    const fieldCategories = getFieldCategories(jmFields);
    const dialectCategories = getDialectCategories(jmDialects);
    const miscCategories = getMiscCategories(jmMiscs);
    const informations = getInformations(jmSenseInfo);
    const languageSources = getLanguageSources(jmLsources);

    meanings.push({
      id,
      translations,
      wordClasses,
      fieldCategories,
      dialectCategories,
      miscCategories,
      informations,
      languageSources,
    });
  }

  return meanings;
};

const getWordClasses = (
  jmPartsOfSpeech: JMdictSensPos[] | undefined
): string[] | undefined => {
  return jmPartsOfSpeech;
};

const getFieldCategories = (
  jmFields: JMdictSensField[] | undefined
): string[] | undefined => {
  return jmFields;
};

const getDialectCategories = (
  jmDialects: JMdictSensDial[] | undefined
): string[] | undefined => {
  return jmDialects;
};

const getMiscCategories = (
  jmMiscs: JMdictSensMisc[] | undefined
): string[] | undefined => {
  return jmMiscs;
};

const getInformations = (
  jmSenseInfos: string | undefined
): string[] | undefined => {
  return jmSenseInfos?.split(';');
};

const getLanguageSources = (
  jmLsources: JMdictSensLSrc[] | undefined
): WordLanguageSource[] | undefined => {
  const languageSources: WordLanguageSource[] = [];

  if (jmLsources === undefined) return undefined;

  for (const jmLsource of jmLsources) {
    const description = jmLsource.value;
    const language = jmLsource.lang ?? 'eng';
    const waseieigo = jmLsource.ls_wasei !== undefined ? true : undefined;
    const part = jmLsource.ls_type !== undefined ? true : undefined;

    languageSources.push({
      description,
      language,
      waseieigo,
      part,
    });
  }

  if (languageSources.length < 1) return undefined;

  return languageSources;
};

const createTranslations = (
  gloss: Array<string | JMdictSensGloss>
): string[] => {
  const translations: string[] = [];

  for (const entry of gloss) {
    if (typeof entry === 'string') {
      const text = entry;
      translations.push(text);
      continue;
    }

    // TODO iplement gloss type
    // const type = entry.g_type;

    const text = entry.value;
    translations.push(text);

    // const isEnglish = entry.lang === undefined;
    // if (isEnglish) {
    //   translations.push(text);
    // }
  }

  if (translations.length < 1) {
    throw new Error('Translation array can not be empty');
  }

  return translations;
};
