import {Presets, SingleBar, type Options} from 'cli-progress';
import {JLPT, Kanji, KanjiComposition, KanjiStroke, Radical} from 'tkdb-helper';
import {fileManager} from '../fileManager';
import {toArray, toArrayOrUndefined} from '../../utils';
import {
  Kanjidic2,
  Kanjidic2CharRdngMngGrpMng,
  Kanjidic2CharRdngMngGrpRdng,
  Kanjidic2MiscGrade,
} from '../../type/kanjidic2';
import {KVG, KVGKanjiGroup} from '../../type/kanjivg';
import {Kradfilex} from '../../type/kradfilex';

export default (): Kanji[] => {
  const kanjidic2 = fileManager.getKanjidic2();
  const kd2Entries = kanjidic2.character;
  const kanjis: Kanji[] = [];

  const progressBarOptions: Options = {
    hideCursor: true,
    format: '{bar} {percentage}% | {value}/{total} kanji',
  };
  const bar = new SingleBar(progressBarOptions, Presets.shades_classic);
  bar.start(kd2Entries.length, 0);

  for (const kd2El of kd2Entries) {
    const kd2Readings = toArrayOrUndefined(
      kd2El.reading_meaning?.rmgroup?.reading
    );
    const kd2Nanoris = toArrayOrUndefined(kd2El.reading_meaning?.nanori);
    const kd2Meanings = toArrayOrUndefined(
      kd2El.reading_meaning?.rmgroup?.meaning
    );
    const kd2Strokecount = toArray(kd2El.misc.stroke_count);
    const kd2Frequency = kd2El.misc.freq;
    const kd2Grade = kd2El.misc.grade;

    const literal = kd2El.literal;
    const id = kanjiToHex(literal);
    const {on, kun, kunOku, nanori} = createReadings(kd2Readings, kd2Nanoris);
    const meanings = createMeanings(kd2Meanings);
    const strokecount = getStrokecount(kd2Strokecount);
    const frequency = getFrequency(kd2Frequency);
    const grade = getGrade(kd2Grade);
    const jlpt = getJLPT(literal);
    const antonyms = getAntonyms(literal);
    const lookalikes = getLookalikes(literal);
    const synonyms = getSynonyms(literal);
    const frequency2 = getFrequency2(literal);
    const radicals = getRadicals(literal);
    const composition = getComposition(literal);
    const strokes = getStrokes(literal);

    kanjis.push({
      id,
      literal,
      strokecount,
      on,
      kun,
      kunOku,
      nanori,
      meanings,
      frequency,
      frequency2,
      grade,
      jlpt,
      antonyms,
      lookalikes,
      synonyms,
      radicals,
      composition,
      strokes,
    });

    bar.increment();
  }

  bar.stop();

  return kanjis;
};

const createReadings = (
  kd2Readings?: Kanjidic2CharRdngMngGrpRdng[],
  kd2Nanoris?: string[]
): {
  on: string[] | undefined;
  kun: string[] | undefined;
  kunOku: string[] | undefined;
  nanori: string[] | undefined;
} => {
  const on =
    kd2Readings?.filter(r => r.r_type === 'ja_on').map(r => r.value) ??
    undefined;
  const kunOku =
    kd2Readings?.filter(r => r.r_type === 'ja_kun').map(r => r.value) ??
    undefined;
  const kunWithPotentialDuplicates = kunOku?.map(k => {
    let cleaned = k.replace('-', ''); // remove any hyphens
    cleaned = cleaned.split('.')[0] ?? ''; // remove okurigana

    return cleaned;
  });

  const kun = [...new Set(kunWithPotentialDuplicates)];
  const nanori = kd2Nanoris ?? undefined;

  return {
    on,
    kun,
    kunOku,
    nanori,
  };
};

const createMeanings = (
  kd2Meanings?: Array<string | Kanjidic2CharRdngMngGrpMng>
): string[] | undefined => {
  if (kd2Meanings === undefined) {
    return undefined;
  }

  const meanings: string[] = [];

  for (const kd2Meaning of kd2Meanings) {
    if (typeof kd2Meaning === 'string') {
      meanings.push(kd2Meaning);
    }
  }

  if (meanings.length < 1) {
    return undefined;
  }

  return meanings;
};

const getStrokecount = (kd2Strokecount: string[]): number => {
  const strokecountString = kd2Strokecount[0];
  if (strokecountString === undefined)
    throw new Error('Kanji stroke count array is empty');
  const strokecount = parseInt(strokecountString);
  return strokecount;
};

const getFrequency = (kd2Frequency: string | undefined): number | undefined => {
  if (kd2Frequency === undefined) return undefined;

  const frequency = parseInt(kd2Frequency);
  return frequency;
};

const getGrade = (
  kd2Grade: Kanjidic2MiscGrade | undefined
): number | undefined => {
  if (kd2Grade === undefined) return undefined;
  const grade = parseInt(kd2Grade);
  return grade;
};

const getJLPT = (literal: string): JLPT | undefined => {
  const tanosKanjis = fileManager.getTanosKanjis();

  const match = tanosKanjis.find(kanji => kanji.kanji === literal);

  if (match === undefined) {
    return;
  }

  return match.jlpt;
};

const getAntonyms = (literal: string): string[] | undefined => {
  const kanjiumAntonyms = fileManager.getKanjiumAntonyms();

  const match = kanjiumAntonyms.find(kanji => kanji.kanji === literal);

  if (match === undefined) {
    return undefined;
  }

  const antonyms = match.antonyms.split(',');
  return antonyms;
};

const getLookalikes = (literal: string): string[] | undefined => {
  const kanjiumLookalikes = fileManager.getKanjiumLookalikes();

  const match = kanjiumLookalikes.find(kanji => kanji.kanji === literal);

  if (match === undefined) {
    return undefined;
  }

  const lookalikes = match.similar.split(',');
  return lookalikes;
};

const getSynonyms = (literal: string): string[] | undefined => {
  const kanjiumSynonyms = fileManager.getKanjiumSynonyms();

  const match = kanjiumSynonyms.find(kanji => kanji.kanji === literal);

  if (match === undefined) {
    return undefined;
  }

  const synonyms = match.synonyms.split(',');
  return synonyms;
};

const getFrequency2 = (literal: string): number | undefined => {
  const kanjiumSynonyms = fileManager.getKanjiumFrequencies();

  const match = kanjiumSynonyms.find(kanji => kanji.kanji === literal);

  if (match === undefined) {
    return undefined;
  }

  const frequency2 = match.frequency;
  return frequency2;
};

const getRadicals = (literal: string): string[] | undefined => {
  const kradfilex: Kradfilex[] = fileManager.getKradfilex();
  const tkdbRadicals = fileManager.getTKDBradicals();

  const match = kradfilex.find(kanji => kanji.kanji === literal);

  if (match === undefined) {
    return undefined;
  }

  // Remove empty strings from the radicals array
  const filteredRadicals = match.radicals.filter(radical => radical !== '');

  // Return undefined if no non-empty radicals are found
  if (filteredRadicals.length === 0) {
    return undefined;
  }

  const radicals = filteredRadicals.map(kradical => {
    const tkdbRadical = tkdbRadicals.find(
      tkdbRadical => tkdbRadical.kradical === kradical
    );

    if (tkdbRadical === undefined) {
      throw new Error(
        `kradical ${kradical} of literal ${literal} does not exist in TKDB radical`
      );
    }

    return tkdbRadical.radical;
  });

  return radicals;
};

const getStrokes = (literal: string): KanjiStroke[] | undefined => {
  const kanjivg: KVG = fileManager.getKanjivg();

  const hexLiteral = kanjiToHex(literal);

  const match = kanjivg.kanji.find(kanji => kanji.id === `kanji_${hexLiteral}`);

  if (match === undefined) {
    return undefined;
  }

  const strokes: KanjiStroke[] = [];

  const processGroups = (groups: KVGKanjiGroup[]): void => {
    for (const group of groups) {
      const subGroups = toArrayOrUndefined(group.g);

      if (subGroups !== undefined) {
        processGroups(subGroups);
      }

      const paths = toArrayOrUndefined(group.path);

      if (paths !== undefined) {
        for (const path of paths) {
          const strokePath = path.d;
          const {x, y} = extractXYfromPath(strokePath);

          strokes.push({
            path: strokePath,
            y,
            x,
          });
        }
      }
    }
  };

  const parentGroups = [match.g];
  processGroups(parentGroups);

  return strokes;
};

export const extractXYfromPath = (path: string): {x: string; y: string} => {
  // Regular expression to match the pattern, case-insensitive
  const regex = /M\s*([\d.]+)\s*,\s*([\d.]+)\s*c/i;
  const match = path.match(regex);

  if (
    match !== null &&
    match.length > 2 &&
    match[1] !== undefined &&
    match[2] !== undefined
  ) {
    return {x: match[1], y: match[2]};
  }

  // Return null if the pattern doesn't match
  throw new Error(`Could not extract x and y positions from ${path}`);
};

export const kanjiToHex = (kanji: string): string => {
  // Ensure the input is valid for characters outside the BMP
  const codePoint = kanji.codePointAt(0);

  if (codePoint === undefined) {
    throw new Error('Invalid character input.');
  }

  const hexString = codePoint.toString(16).toLowerCase();

  // Ensure the result is a five-digit string
  return hexString.padStart(5, '0');
};

const getComposition = (literal: string): KanjiComposition[] | undefined => {
  const kanjivg: KVG = fileManager.getKanjivg();
  const kanjidic2: Kanjidic2 = fileManager.getKanjidic2();
  const tkdbRadicals: Radical[] = fileManager.getTKDBradicals();

  const hexLiteral = kanjiToHex(literal);

  const match = kanjivg.kanji.find(kanji => kanji.id === `kanji_${hexLiteral}`);

  if (match === undefined || match.g.g === undefined) {
    return undefined;
  }

  const groups = toArray(match.g.g);

  const getSubcomp = (
    groups: KVGKanjiGroup[] | undefined
  ): KanjiComposition[] | undefined => {
    if (groups === undefined) {
      return undefined;
    }

    const composition: KanjiComposition[] = [];

    for (const group of groups) {
      const element = group.element;

      const isRadical =
        tkdbRadicals.find(radical => radical.radical === element) !== undefined
          ? true
          : undefined;

      if (isRadical) {
        composition.push({
          element,
          isRadical,
        });
        continue;
      }

      const isKanji =
        kanjidic2.character.find(kanji => kanji.literal === element) !==
        undefined
          ? true
          : undefined;
      const subgroup = toArrayOrUndefined(group.g);

      const subComp = getSubcomp(subgroup);

      composition.push({
        element,
        isKanji,
        composition: subComp,
      });
    }
    return composition;
  };

  const composition = getSubcomp(groups);

  return composition;
};
