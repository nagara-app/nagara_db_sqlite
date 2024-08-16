import { createMissingReles, extractKanji, extractNfxx, getFrequency, isCommon } from 'src/process/word/createForms';
import type { JMdictEntr, JMdictRdng } from 'src/type/jmdict';

test('if kanji extracter is returning correct kanjis', () => {
  const testString = '日本語の漢字を抽出する。';
  const kanjis = extractKanji(testString);

  expect(kanjis).toStrictEqual(['日', '本', '語', '漢', '字', '抽', '出']);
});

describe('create correct missing JMdict reading elements', () => {
  test('do not create reading elements, if the sense is not usually written in kana', () => {
    const jmEntry: JMdictEntr = {
      ent_seq: '1104550',
      k_ele: {
        keb: '麦酒',
      },
      r_ele: [
        {
          reb: 'ばくしゅ',
        },
      ],
      sense: {},
    };

    const missingReles = createMissingReles(jmEntry);

    expect(missingReles).toBeUndefined();
  });

  test('create missing reading elements, if the sense is usually written in kana', () => {
    const jmEntry: JMdictEntr = {
      ent_seq: '1104550',
      k_ele: {
        keb: '麦酒',
      },
      r_ele: [
        {
          reb: 'ばくしゅ',
        },
        {
          reb: 'ビール',
          re_inf: 'gikun',
        },
        {
          reb: 'ビア',
          re_nokanji: '',
        },
      ],
      sense: {
        misc: 'uk',
      },
    };

    const expected: JMdictRdng[] = [
      { reb: 'ばくしゅ', re_nokanji: '' },
      { reb: 'ビール', re_nokanji: '' },
    ];

    const missingReles = createMissingReles(jmEntry);

    expect(missingReles).toEqual(expected);
  });
});

describe('common validator returns correct boolean', () => {
  test('array with nfxx value in middle position', () => {
    const priorities = ['spec1', 'nf01', 'news2'];
    const frequency = isCommon(priorities);
    expect(frequency).toBe(true);
  });

  test('array without nfxx value', () => {
    const priorities = ['spec2', 'news2'];
    const frequency = isCommon(priorities);
    expect(frequency).toBeUndefined();
  });

  test('undefined priority', () => {
    const priorities = undefined;
    const frequency = isCommon(priorities);
    expect(frequency).toBeUndefined();
  });
});

describe('frequency getter returns correct number', () => {
  test('array with nfxx value in middle position', () => {
    const priorities = ['spec1', 'nf01', 'news2'];
    const frequency = getFrequency(priorities);
    expect(frequency).toBe(1);
  });

  test('array without nfxx value', () => {
    const priorities = ['spec1', 'news2'];
    const frequency = getFrequency(priorities);
    expect(frequency).toBeUndefined();
  });

  test('undefined priority', () => {
    const priorities = undefined;
    const frequency = getFrequency(priorities);
    expect(frequency).toBeUndefined();
  });
});

describe('nfxx extractor returns correct number', () => {
  test('value with zero in first digit', () => {
    const nfxx = extractNfxx('nf01');
    expect(nfxx).toBe(1);
  });

  test('value without zero in first digit', () => {
    const nfxx = extractNfxx('nf23');
    expect(nfxx).toBe(23);
  });

  test('value that should throw an error', () => {
    expect(() => extractNfxx('n23f')).toThrow();
  });
});
