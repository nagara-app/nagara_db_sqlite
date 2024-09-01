import {toArray, toArrayOrUndefined} from '../../utils';
import {createFormPairs} from '../../process/word/createForms';

import type {
  JMdictEntr,
  JMdictSens,
  JMdictSensDial,
  JMdictSensField,
  JMdictSensGloss,
  JMdictSensLSrc,
  JMdictSensMisc,
  JMdictSensPos,
} from '../../type/jmdict';
import type {WordLanguageSource, WordMeaning} from '../../type/tkdb';

export default (jmEntry: JMdictEntr): WordMeaning[] => {
  const meanings: WordMeaning[] = [];

  const jmSenses = toArray(jmEntry.sense);

  for (const jmSense of jmSenses) {
    const jmGloss = toArrayOrUndefined(jmSense.gloss);
    const jmPartsOfSpeech = toArrayOrUndefined(jmSense.pos);
    const jmFields = toArrayOrUndefined(jmSense.field);
    const jmDialects = toArrayOrUndefined(jmSense.dial);
    const jmMiscs = toArrayOrUndefined(jmSense.misc);
    const jmSenseInfo = jmSense.s_inf;
    const jmLsources = toArrayOrUndefined(jmSense.lsource);

    const translations = createTranslations(jmGloss);

    // Skip sense if there is no translation
    if (translations === undefined) {
      continue;
    }

    const wordClasses = getWordClasses(jmPartsOfSpeech);
    const fieldCategories = getFieldCategories(jmFields);
    const dialectCategories = getDialectCategories(jmDialects);
    const miscCategories = getMiscCategories(jmMiscs);
    const informations = getInformations(jmSenseInfo);
    const formRestricions = getFormRestrictions(jmEntry, jmSense);
    const languageSources = getLanguageSources(jmLsources);

    meanings.push({
      translations,
      wordClasses,
      fieldCategories,
      dialectCategories,
      miscCategories,
      informations,
      formRestricions,
      languageSources,
    });
  }

  return meanings;
};

const getWordClasses = (
  jmPartsOfSpeech: JMdictSensPos[] | undefined
): string[] | undefined => {
  if (jmPartsOfSpeech === undefined) {
    return undefined;
  }
  return jmPartsOfSpeech;
};

const getFieldCategories = (
  jmFields: JMdictSensField[] | undefined
): string[] | undefined => {
  if (jmFields === undefined) {
    return undefined;
  }
  return jmFields;
};

const getDialectCategories = (
  jmDialects: JMdictSensDial[] | undefined
): string[] | undefined => {
  if (jmDialects === undefined) {
    return undefined;
  }
  return jmDialects;
};

const getMiscCategories = (
  jmMiscs: JMdictSensMisc[] | undefined
): string[] | undefined => {
  if (jmMiscs === undefined) {
    return undefined;
  }
  return jmMiscs;
};

const getInformations = (
  jmSenseInfos: string | undefined
): string[] | undefined => {
  return jmSenseInfos?.split(';');
};

const getFormRestrictions = (
  jmEntry: JMdictEntr,
  jmSense: JMdictSens
): string[] | undefined => {
  const formRestrictions: string[] = [];

  const wordForms = createFormPairs(jmEntry);

  const jmSenseKanaRestrictions = toArrayOrUndefined(jmSense.stagr);
  const jmSenseKanjiRestrictions = toArrayOrUndefined(jmSense.stagk);

  const jmMiscs = toArrayOrUndefined(jmSense.misc);
  const senseUsuallyWrittenInKana = jmMiscs?.includes('uk') === true;

  // if the sense is usually written in kanji, then add the kana reading as a restriction
  if (jmSenseKanjiRestrictions !== undefined && senseUsuallyWrittenInKana) {
    for (const restriction of jmSenseKanjiRestrictions) {
      const form = wordForms.find(wordForm => wordForm.script === restriction);
      const formReading = form?.reading;

      if (formReading === undefined) {
        throw new Error('The reading of the kanji form is not found');
      }

      // // proofs that there are kanji restriction that are usually written in kana
      // console.log('match');

      formRestrictions.push(formReading);
    }
  }

  if (jmSenseKanjiRestrictions !== undefined) {
    for (const restriction of jmSenseKanjiRestrictions) {
      formRestrictions.push(restriction);
    }
  }

  if (jmSenseKanaRestrictions !== undefined) {
    for (const restriction of jmSenseKanaRestrictions) {
      formRestrictions.push(restriction);
    }
  }

  if (formRestrictions.length < 1) return undefined;

  return formRestrictions;
};

const getLanguageSources = (
  jmLsources: JMdictSensLSrc[] | undefined
): WordLanguageSource[] | undefined => {
  const languageSources: WordLanguageSource[] = [];

  if (jmLsources === undefined) {
    return undefined;
  }

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

  if (languageSources.length < 1) {
    return undefined;
  }

  return languageSources;
};

const createTranslations = (
  gloss: Array<string | JMdictSensGloss> | undefined
): string[] | undefined => {
  if (gloss === undefined) {
    return undefined;
  }

  const translations: string[] = [];

  for (const glossE of gloss) {
    if (typeof glossE === 'string') {
      const text = glossE;
      translations.push(text);
    }

    // else {
    //   const text = glossE.value;
    //   const type = glossE.g_type;
    //   const isNotEnglish = glossE.lang !== undefined;

    //   if (isNotEnglish) {
    //     continue;
    //   }

    //   translations.push({
    //     text,
    //     type,
    //   });
    // }
  }

  if (translations.length < 1) return undefined;

  return translations;
};
