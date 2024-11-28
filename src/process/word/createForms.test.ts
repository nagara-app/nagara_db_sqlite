import {JMdictKanji, JMdictRdng, JMdictSens} from '../../type/jmdict';
import {
  createFormCombinations,
  createMissingKanaForms,
  extractKanji,
  extractNfxx,
  getFrequency,
  hasSenseWithKanaForm,
  isCommon,
  sortByKanjiAndKana,
} from './createForms';

describe('Create missing kana only forms', () => {
  test('Includes kana only form', () => {
    const forms = [
      {kana: 'なに', kanji: '何'},
      {kana: 'なに', kanji: '何に'},
      {kana: 'なん'},
    ];
    const result = createMissingKanaForms(forms);
    expect(result).toBeUndefined;
  });

  test('Includes only forms with kanji', () => {
    const forms = [
      {kana: 'なに', kanji: '何'},
      {kana: 'なに', kanji: '何に'},
      {kana: 'なん', kanji: '何'},
    ];
    const result = createMissingKanaForms(forms);
    const expected = [{kana: 'なに'}, {kana: 'なん'}];
    expect(result).toEqual(expected);
  });
});

describe('Form creater is creating all possible forms', () => {
  test('Without kanji', () => {
    const jmReles: JMdictRdng[] = [{reb: 'なに'}, {reb: 'なん'}];
    const jmKeles = undefined;
    const result = createFormCombinations(jmReles, jmKeles);
    const expected = [{kana: 'なに'}, {kana: 'なん'}];

    expect(result).toEqual(expected);
  });

  test('With kanji', () => {
    const jmReles: JMdictRdng[] = [
      {
        reb: 'あそこ',
      },
      {
        reb: 'あすこ',
      },
      {
        reb: 'かしこ',
      },
      {
        reb: 'あしこ',
      },
      {
        reb: 'あこ',
      },
    ];
    const jmKeles: JMdictKanji[] = [
      {
        keb: '彼処',
      },
      {
        keb: '彼所',
      },
    ];
    const result = createFormCombinations(jmReles, jmKeles);
    const expected = [
      {kana: 'あそこ', kanji: '彼処'},
      {kana: 'あそこ', kanji: '彼所'},
      {kana: 'あすこ', kanji: '彼処'},
      {kana: 'あすこ', kanji: '彼所'},
      {kana: 'かしこ', kanji: '彼処'},
      {kana: 'かしこ', kanji: '彼所'},
      {kana: 'あしこ', kanji: '彼処'},
      {kana: 'あしこ', kanji: '彼所'},
      {kana: 'あこ', kanji: '彼処'},
      {kana: 'あこ', kanji: '彼所'},
    ];

    expect(result).toEqual(expected);
  });

  test('With kanji', () => {
    const jmReles: JMdictRdng[] = [{reb: 'なに'}, {reb: 'なん'}];
    const jmKeles: JMdictKanji[] = [{keb: '何'}];
    const result = createFormCombinations(jmReles, jmKeles);
    const expected = [
      {kana: 'なに', kanji: '何'},
      {kana: 'なん', kanji: '何'},
    ];

    expect(result).toEqual(expected);
  });

  test('With kanji restrictions', () => {
    const jmReles: JMdictRdng[] = [
      {reb: 'なに'},
      {reb: 'なん', re_restr: ['何']},
    ];
    const jmKeles: JMdictKanji[] = [{keb: '何'}, {keb: '何に'}];
    const result = createFormCombinations(jmReles, jmKeles);
    const expected = [
      {kana: 'なに', kanji: '何'},
      {kana: 'なに', kanji: '何に'},
      {kana: 'なん', kanji: '何'},
    ];

    expect(result).toEqual(expected);
  });

  test('With no kanji', () => {
    const jmReles: JMdictRdng[] = [
      {reb: 'なに'},
      {reb: 'なん', re_nokanji: ''},
    ];
    const jmKeles: JMdictKanji[] = [{keb: '何'}, {keb: '何に'}];
    const result = createFormCombinations(jmReles, jmKeles);
    const expected = [
      {kana: 'なに', kanji: '何'},
      {kana: 'なに', kanji: '何に'},
      {kana: 'なん'},
    ];

    expect(result).toEqual(expected);
  });
});

describe('Has sense with kana form is returning correct value', () => {
  test('Has sense usually written in kana', () => {
    const jmSenses: JMdictSens[] = [
      {gloss: 'what', misc: ['uk']},
      {gloss: 'who'},
    ];
    const result = hasSenseWithKanaForm(jmSenses);
    expect(result).toBeTruthy();
  });

  test('Has no sense usually written in kana', () => {
    const jmSenses: JMdictSens[] = [{gloss: 'what'}, {gloss: 'who'}];
    const result = hasSenseWithKanaForm(jmSenses);
    expect(result).toBeFalsy();
  });
});

test('if kanji extracter is returning correct kanjis', () => {
  const testString = '日本語の漢字を抽出する。';
  const kanjis = extractKanji(testString);

  expect(kanjis).toStrictEqual(['日', '本', '語', '漢', '字', '抽', '出']);
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

describe('Sort same kanji first while keeping original kana order', () => {
  test('With kanji', () => {
    const result = [
      {kana: 'あそこ', kanji: '彼処'},
      {kana: 'あそこ', kanji: '彼所'},
      {kana: 'あすこ', kanji: '彼処'},
      {kana: 'あすこ', kanji: '彼所'},
      {kana: 'かしこ', kanji: '彼処'},
      {kana: 'かしこ', kanji: '彼所'},
      {kana: 'あしこ', kanji: '彼処'},
      {kana: 'あしこ', kanji: '彼所'},
      {kana: 'あこ', kanji: '彼処'},
      {kana: 'あこ', kanji: '彼所'},
    ].sort(sortByKanjiAndKana);

    const expected = [
      {kana: 'あそこ', kanji: '彼処'},
      {kana: 'あすこ', kanji: '彼処'},
      {kana: 'かしこ', kanji: '彼処'},
      {kana: 'あしこ', kanji: '彼処'},
      {kana: 'あこ', kanji: '彼処'},
      {kana: 'あそこ', kanji: '彼所'},
      {kana: 'あすこ', kanji: '彼所'},
      {kana: 'かしこ', kanji: '彼所'},
      {kana: 'あしこ', kanji: '彼所'},
      {kana: 'あこ', kanji: '彼所'},
    ];

    expect(result).toEqual(expected);
  });
});
