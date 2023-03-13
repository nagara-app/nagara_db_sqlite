// Creates the jmdict_jlpt.json file based on TanosVocab and JMdict

import {
  readJsonFileFromInput,
  readJsonFileFromInputConverted,
  toKvgHex,
  writeFileToInputConverted,
} from '../../utils';
import { CONSTANTS } from '../../constants';
import { Presets, SingleBar } from 'cli-progress';

import type { Options } from 'cli-progress';

import type { KanjiumRadical } from '../kanjium_radicals/kanjium_radicals.dto';
import type { KanjiumRadvars } from '../kanjium_radvars/kanjium_radvars.dto';
import type { Radkfilex } from '../radkfilex/radkfilex.dto';
import type { RadkfilexKanjium } from './radkfilex_kanjium.dto';

export default async (): Promise<void> => {
  // Read required files
  const radkfilexEntries: Radkfilex[] = await readJsonFileFromInputConverted(CONSTANTS.fileNames.radkfilexConverted);
  const kanjiumRadicalEntries: KanjiumRadical[] = await readJsonFileFromInput(CONSTANTS.fileNames.kanjiumRadical);
  const kanjiumRadicalVariantEntries: KanjiumRadvars[] = await readJsonFileFromInput(
    CONSTANTS.fileNames.kanjiumRadicalVariant,
  );

  // Add kanjium radical variants that are available in radkfilex but missing in kanjium
  missingRadkfilexVariantsInKanjium.forEach((entry) => {
    const kanjiumRadical = kanjiumRadicalEntries.find(
      (kanjiumEntry) => kanjiumEntry.radical === entry.variantOfKanjiumRadical,
    );
    if (kanjiumRadical !== undefined) {
      kanjiumRadicalVariantEntries.push({
        radical: kanjiumRadical.radical,
        names: kanjiumRadical.names,
        notes: kanjiumRadical.notes,
        number: kanjiumRadical.number,
        meaning: kanjiumRadical.meaning,
        strokes: entry.strokecount,
        radvar: entry.radkfilexRadical,
      });
    }
  });

  const radkfilexKanjium: RadkfilexKanjium[] = [];

  const progressOptions: Options = {
    hideCursor: true,
    etaBuffer: 100,
  };
  const progressBar = new SingleBar(progressOptions, Presets.shades_classic);
  progressBar.start(radkfilexEntries.length, 0);
  let i = 1;

  // Loop through radkfilex entries to assign wether a radical from kanjium, a kanji or a component
  for (const radkfilexEntry of radkfilexEntries) {
    progressBar.update(i);
    i++;

    const radkfilexRadical = radkfilexEntry.radical;

    const kanjiumRadicalFromMap = radkfilexKanjiumMap.find(
      (a) => a.radkfilexRadical === radkfilexRadical,
    )?.kanjiumRadical;

    // Find kanjium radical matches
    const kanjiumRadicalMatch = kanjiumRadicalEntries.find(
      (entry) => entry.radical === radkfilexRadical || entry.radical === kanjiumRadicalFromMap,
    );

    // Find kanjium radical variant matches
    const kanjiumRadicalVariantMatch = kanjiumRadicalVariantEntries.find(
      (entry) => entry.radvar === radkfilexRadical || entry.radvar === kanjiumRadicalFromMap,
    );

    // Find kanji matches
    const kanjiMatch = kanjisInRadkfilex.find((kanji) => kanji === radkfilexRadical);

    // Find component matches
    const componentMatch = componentsInRadkfilex.find((component) => component === radkfilexRadical);

    // Assign when match
    if (kanjiumRadicalMatch !== undefined) {
      radkfilexKanjium.push({
        radkfilexRadical,
        radical: {
          literal: kanjiumRadicalMatch.radical,
          hexcode: toKvgHex(kanjiumRadicalMatch.radical),
          number: kanjiumRadicalMatch.number,
          reading: kanjiumRadicalMatch.names.split(CONSTANTS.kanjiumRadicalNamesDelimiter),
          meaning: kanjiumRadicalMatch.meaning.split(CONSTANTS.kanjiumRadicalMeaningDelimiter),
          strokes: kanjiumRadicalMatch.strokes,
        },
        match: true,
      });
    } else if (kanjiumRadicalVariantMatch !== undefined) {
      radkfilexKanjium.push({
        radkfilexRadical,
        radical: {
          literal: kanjiumRadicalVariantMatch.radvar,
          hexcode: toKvgHex(kanjiumRadicalVariantMatch.radvar),
          number: kanjiumRadicalVariantMatch.number,
          reading: kanjiumRadicalVariantMatch.names.split(CONSTANTS.kanjiumRadicalNamesDelimiter),
          meaning: kanjiumRadicalVariantMatch.meaning.split(CONSTANTS.kanjiumRadicalMeaningDelimiter),
          strokes: kanjiumRadicalVariantMatch.strokes,
          variantOf: kanjiumRadicalVariantMatch.radical,
        },
        match: true,
      });
    } else if (kanjiMatch !== undefined) {
      radkfilexKanjium.push({
        radkfilexRadical,
        kanji: kanjiMatch,
        match: true,
      });
    } else if (componentMatch !== undefined) {
      radkfilexKanjium.push({
        radkfilexRadical,
        component: componentMatch,
        match: true,
      });
    } else {
      radkfilexKanjium.push({
        radkfilexRadical,
        match: false,
      });
    }
  }

  progressBar.stop();

  await writeFileToInputConverted(CONSTANTS.fileNames.radkfilexKanjium, radkfilexKanjium);
};

interface MissingVariantsinKanjium {
  radkfilexRadical: string;
  strokecount: number;
  variantOfKanjiumRadical: string;
}

const missingRadkfilexVariantsInKanjium: MissingVariantsinKanjium[] = [
  {
    radkfilexRadical: '品',
    strokecount: 12,
    variantOfKanjiumRadical: '口',
  },
  {
    radkfilexRadical: '無',
    strokecount: 12,
    variantOfKanjiumRadical: '无',
  },
  {
    radkfilexRadical: '尤',
    strokecount: 4,
    variantOfKanjiumRadical: '尢',
  },
];

interface RadkfilexKanjiumMap {
  radkfilexRadical: string;
  kanjiumRadical: string;
}

// Radkfilex radicals that don't match with kanjium radicals
const radkfilexKanjiumMap: RadkfilexKanjiumMap[] = [
  {
    radkfilexRadical: '｜',
    kanjiumRadical: '丨',
  },
  {
    radkfilexRadical: 'ノ',
    kanjiumRadical: '丿',
  },
  {
    radkfilexRadical: '化',
    kanjiumRadical: '亻',
  },
  {
    radkfilexRadical: '个',
    kanjiumRadical: '𠆢',
  },
  {
    radkfilexRadical: 'ハ',
    kanjiumRadical: '八',
  },
  {
    radkfilexRadical: '并',
    kanjiumRadical: '䒑',
  },
  {
    radkfilexRadical: '刈',
    kanjiumRadical: '刂',
  },
  {
    radkfilexRadical: '込',
    kanjiumRadical: '辶',
  },
  {
    radkfilexRadical: '尚',
    kanjiumRadical: '⺌',
  },
  {
    radkfilexRadical: '已',
    kanjiumRadical: '巳',
  },
  {
    radkfilexRadical: 'ヨ',
    kanjiumRadical: '彐',
  },
  {
    radkfilexRadical: '忙',
    kanjiumRadical: '忄',
  },
  {
    radkfilexRadical: '扎',
    kanjiumRadical: '扌',
  },
  {
    radkfilexRadical: '汁',
    kanjiumRadical: '氵',
  },
  {
    radkfilexRadical: '犯',
    kanjiumRadical: '犭',
  },
  {
    radkfilexRadical: '艾',
    kanjiumRadical: '艹',
  },
  {
    radkfilexRadical: '邦',
    kanjiumRadical: '⻏',
  },
  {
    radkfilexRadical: '阡',
    kanjiumRadical: '⻖',
  },
  {
    radkfilexRadical: '亡', // Looks correcter: 亡
    kanjiumRadical: '匸',
  },
  {
    radkfilexRadical: '杰',
    kanjiumRadical: '灬',
  },
  {
    radkfilexRadical: '礼',
    kanjiumRadical: '礻',
  },
  {
    radkfilexRadical: '疔',
    kanjiumRadical: '疒',
  },
  {
    radkfilexRadical: '禹',
    kanjiumRadical: '禸',
  },
  {
    radkfilexRadical: '初',
    kanjiumRadical: '衤',
  },
  {
    radkfilexRadical: '買',
    kanjiumRadical: '罒',
  },
  {
    radkfilexRadical: '黒',
    kanjiumRadical: '黑',
  },
];

const kanjisInRadkfilex = [
  '九',
  '乃',
  '也',
  '及',
  '久',
  '元',
  '井',
  '勿',
  '五',
  '屯',
  '巴',
  '世',
  '巨',
  '冊',
  '奄',
  '岡',
  '免',
  '滴',
];

const componentsInRadkfilex = ['マ', '乞', 'ユ'];
